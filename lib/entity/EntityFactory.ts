import { Utils } from '../utils';
import { AnyEntity, EntityData, EntityMetadata, EntityName, Primary } from '../typings';
import { UnitOfWork } from '../unit-of-work';
import { ReferenceType } from './enums';
import { EntityManager } from '..';

export const SCALAR_TYPES = ['string', 'number', 'boolean', 'Date'];

export class EntityFactory {

  private readonly driver = this.em.getDriver();
  private readonly config = this.em.config;
  private readonly metadata = this.em.getMetadata();
  private readonly hydrator = this.config.getHydrator(this, this.em);

  constructor(private readonly unitOfWork: UnitOfWork,
              private readonly em: EntityManager) { }

  create<T extends AnyEntity<T>>(entityName: EntityName<T>, data: EntityData<T>, initialized = true, newEntity = false): T {
    if (Utils.isEntity<T>(data)) {
      return data;
    }

    entityName = Utils.className(entityName);
    const meta = this.metadata.get(entityName);
    this.denormalizePrimaryKey(data, meta);
    const entity = this.createEntity(data, meta);

    if (initialized && !Utils.isEntity(data)) {
      this.hydrator.hydrate(entity, meta, data, newEntity);
    }

    if (initialized) {
      delete entity.__initialized;
    } else {
      entity.__initialized = initialized;
    }

    this.runHooks(entity, meta);

    return entity;
  }

  createReference<T extends AnyEntity<T>>(entityName: EntityName<T>, id: Primary<T>): T {
    entityName = Utils.className(entityName);
    const meta = this.metadata.get(entityName);

    if (this.unitOfWork.getById(entityName, id)) {
      return this.unitOfWork.getById<T>(entityName, id);
    }

    return this.create<T>(entityName, { [meta.primaryKey]: id } as EntityData<T>, false);
  }

  private createEntity<T extends AnyEntity<T>>(data: EntityData<T>, meta: EntityMetadata<T>): T {
    const Entity = this.metadata.get<T>(meta.name).class;

    if (!data[meta.primaryKey]) {
      const params = this.extractConstructorParams<T>(meta, data);
      meta.constructorParams.forEach(prop => delete data[prop]);

      // creates new instance via constructor as this is the new entity
      return new Entity(...params);
    }

    if (this.unitOfWork.getById<T>(meta.name, data[meta.primaryKey])) {
      return this.unitOfWork.getById<T>(meta.name, data[meta.primaryKey]);
    }

    // creates new entity instance, bypassing constructor call as its already persisted entity
    const entity = Object.create(Entity.prototype);

    meta.primaryKeys.forEach(pk => {
      const prop = meta.properties[pk];

      if (prop.reference === ReferenceType.SCALAR) {
        entity[meta.primaryKey] = data[meta.primaryKey];
      } else {
        entity[meta.primaryKey] = this.createReference(prop.type, data[meta.primaryKey]);
      }
    });

    return entity;
  }

  /**
   * denormalize PK to value required by driver (e.g. ObjectId)
   */
  private denormalizePrimaryKey<T extends AnyEntity<T>>(data: EntityData<T>, meta: EntityMetadata<T>): void {
    const platform = this.driver.getPlatform();
    const pk = platform.getSerializedPrimaryKeyField(meta.primaryKey);

    if (data[pk] || data[meta.primaryKey]) {
      const id = platform.denormalizePrimaryKey(data[pk] || data[meta.primaryKey]);
      delete data[pk];
      data[meta.primaryKey as keyof T] = id as Primary<T> & T[keyof T];
    }
  }

  /**
   * returns parameters for entity constructor, creating references from plain ids
   */
  private extractConstructorParams<T extends AnyEntity<T>>(meta: EntityMetadata<T>, data: EntityData<T>): T[keyof T][] {
    return meta.constructorParams.map(k => {
      if (meta.properties[k] && [ReferenceType.MANY_TO_ONE, ReferenceType.ONE_TO_ONE].includes(meta.properties[k].reference) && data[k]) {
        const entity = this.unitOfWork.getById(meta.properties[k].type, data[k]) as T[keyof T];

        if (entity) {
          return entity;
        }

        if (Utils.isEntity<T>(data[k])) {
          return data[k];
        }

        return this.createReference(meta.properties[k].type, data[k]);
      }

      return data[k];
    });
  }

  private runHooks<T extends AnyEntity<T>>(entity: T, meta: EntityMetadata<T>): void {
    if (meta.hooks && meta.hooks.onInit && meta.hooks.onInit.length > 0) {
      meta.hooks.onInit.forEach(hook => (entity[hook] as unknown as () => void)());
    }
  }

}
