(window.webpackJsonp=window.webpackJsonp||[]).push([[11],{139:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return c}));var i=n(1),a=n(9),o=(n(0),n(288)),r={title:"Working with Entity Manager",sidebar_label:"Entity Manager"},s=[{value:"Persist and flush",id:"persist-and-flush",children:[]},{value:"Persisting and cascading",id:"persisting-and-cascading",children:[{value:"Auto flushing",id:"auto-flushing",children:[]}]},{value:"Fetching entities with EntityManager",id:"fetching-entities-with-entitymanager",children:[{value:"Fetching partial entities",id:"fetching-partial-entities",children:[]}]},{value:"Type of fetched entities",id:"type-of-fetched-entities",children:[]},{value:"Entity repositories",id:"entity-repositories",children:[]},{value:"EntityManager API",id:"entitymanager-api",children:[]}],l={rightToc:s},b="wrapper";function c(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(o.b)(b,Object(i.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("h2",{id:"persist-and-flush"},"Persist and flush"),Object(o.b)("p",null,"There are 2 methods we should first describe to understand how persisting works in MikroORM:\n",Object(o.b)("inlineCode",{parentName:"p"},"em.persist()")," and ",Object(o.b)("inlineCode",{parentName:"p"},"em.flush()"),"."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"em.persist(entity, flush?: boolean)")," is used to mark new entities for future persisting.\nIt will make the entity managed by given ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager")," and once ",Object(o.b)("inlineCode",{parentName:"p"},"flush")," will be called, it\nwill be written to the database. Second boolean parameter can be used to invoke ",Object(o.b)("inlineCode",{parentName:"p"},"flush"),"\nimmediately. Its default value is configurable via ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush")," option."),Object(o.b)("p",null,"To understand ",Object(o.b)("inlineCode",{parentName:"p"},"flush"),", lets first define what managed entity is: An entity is managed if\nit\u2019s fetched from the database (via ",Object(o.b)("inlineCode",{parentName:"p"},"em.find()"),", ",Object(o.b)("inlineCode",{parentName:"p"},"em.findOne()")," or via other managed entity)\nor registered as new through ",Object(o.b)("inlineCode",{parentName:"p"},"em.persist()"),"."),Object(o.b)("p",null,Object(o.b)("inlineCode",{parentName:"p"},"em.flush()")," will go through all managed entities, compute appropriate change sets and\nperform according database queries. As an entity loaded from database becomes managed\nautomatically, you do not have to call persist on those, and flush is enough to update\nthem."),Object(o.b)("h2",{id:"persisting-and-cascading"},"Persisting and cascading"),Object(o.b)("p",null,"To save entity state to database, you need to persist it. Persist takes care or deciding\nwhether to use ",Object(o.b)("inlineCode",{parentName:"p"},"insert")," or ",Object(o.b)("inlineCode",{parentName:"p"},"update")," and computes appropriate change-set. Entity references\nthat are not persisted yet (does not have identifier) will be cascade persisted automatically. "),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"// use constructors in your entities for required parameters\nconst author = new Author('Jon Snow', 'snow@wall.st');\nauthor.born = new Date();\n\nconst publisher = new Publisher('7K publisher');\n\nconst book1 = new Book('My Life on The Wall, part 1', author);\nbook1.publisher = publisher;\nconst book2 = new Book('My Life on The Wall, part 2', author);\nbook2.publisher = publisher;\nconst book3 = new Book('My Life on The Wall, part 3', author);\nbook3.publisher = publisher;\n\n// just persist books, author and publisher will be automatically cascade persisted\nawait orm.em.persistAndFlush([book1, book2, book3]);\n\n// or one by one\norm.em.persistLater(book1);\norm.em.persistLater(book2);\norm.em.persistLater(book3); \nawait orm.em.flush(); // flush everything to database at once\n")),Object(o.b)("h3",{id:"auto-flushing"},"Auto flushing"),Object(o.b)("p",null,"By default, ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager.persist()")," will ",Object(o.b)("strong",{parentName:"p"},"flush your changes automatically"),". You can use\nits second parameter to disable auto-flushing, and use ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager.flush()")," manually. "),Object(o.b)("p",null,"You can also disable this feature globally via ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush")," option when initializing the ORM:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const orm = await MikroORM.init({\n  autoFlush: false,\n  // ...\n});\nawait orm.em.persist(new Entity()); // no auto-flushing now\nawait orm.em.flush();\nawait orm.em.persist(new Entity(), true); // you can still use second parameter to auto-flush\n")),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Default value of ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush")," is currently set to ",Object(o.b)("inlineCode",{parentName:"p"},"true"),", which will change in upcoming major\nrelease. Users are encouraged to either set ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush")," to ",Object(o.b)("inlineCode",{parentName:"p"},"false")," or use ",Object(o.b)("inlineCode",{parentName:"p"},"em.persistLater()"),"\n(equal to ",Object(o.b)("inlineCode",{parentName:"p"},"em.persist(entity, false)"),") and ",Object(o.b)("inlineCode",{parentName:"p"},"em.persistAndFlush()")," methods instead. ")),Object(o.b)("h2",{id:"fetching-entities-with-entitymanager"},"Fetching entities with EntityManager"),Object(o.b)("p",null,"To fetch entities from database you can use ",Object(o.b)("inlineCode",{parentName:"p"},"find()")," and ",Object(o.b)("inlineCode",{parentName:"p"},"findOne()")," of ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager"),": "),Object(o.b)("p",null,"Example:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, '...id...');\nconst books = await orm.em.find(Book, {});\n\nfor (const author of authors) {\n  console.log(author.name); // Jon Snow\n\n  for (const book of author.books) {\n    console.log(book.title); // initialized\n    console.log(book.author.isInitialized()); // true\n    console.log(book.author.id);\n    console.log(book.author.name); // Jon Snow\n    console.log(book.publisher); // just reference\n    console.log(book.publisher.isInitialized()); // false\n    console.log(book.publisher.id);\n    console.log(book.publisher.name); // undefined\n  }\n}\n")),Object(o.b)("h3",{id:"fetching-partial-entities"},"Fetching partial entities"),Object(o.b)("p",null,"When fetching single entity, you can choose to select only parts of an entity via ",Object(o.b)("inlineCode",{parentName:"p"},"options.fields"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const author = await orm.em.findOne(Author, '...', { fields: ['name', 'born'] });\nconsole.log(author.id); // PK is always selected\nconsole.log(author.name); // Jon Snow\nconsole.log(author.email); // undefined\n")),Object(o.b)("h2",{id:"type-of-fetched-entities"},"Type of fetched entities"),Object(o.b)("p",null,"Both ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager.find")," and ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager.findOne()")," methods have generic return types.\nAll of following examples are equal and will let typescript correctly infer the entity type:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"const author1 = await orm.em.findOne<Author>(Author.name, '...id...');\nconst author2 = await orm.em.findOne<Author>('Author', '...id...');\nconst author3 = await orm.em.findOne(Author, '...id...');\n")),Object(o.b)("p",null,"As the last one is the least verbose, it should be preferred. "),Object(o.b)("h2",{id:"entity-repositories"},"Entity repositories"),Object(o.b)("p",null,"Although you can use ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager")," directly, much more convenient way is to use\n",Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"https://mikro-orm.io/repositories/"}),Object(o.b)("inlineCode",{parentName:"a"},"EntityRepository")," instead"),". You can register\nyour repositories in dependency injection container like ",Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"http://inversify.io/"}),"InversifyJS"),"\nso you do not need to get them from ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager")," each time."),Object(o.b)("p",null,"For more examples, take a look at\n",Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mongo.test.ts"}),Object(o.b)("inlineCode",{parentName:"a"},"tests/EntityManager.mongo.test.ts")),"\nor ",Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"https://github.com/mikro-orm/mikro-orm/blob/master/tests/EntityManager.mongo.test.ts"}),Object(o.b)("inlineCode",{parentName:"a"},"tests/EntityManager.mysql.test.ts")),"."),Object(o.b)("h2",{id:"entitymanager-api"},"EntityManager API"),Object(o.b)("h4",{id:"getrepositoryt-extends-ientityentityname-string--entityclasst-entityrepositoryt"},Object(o.b)("inlineCode",{parentName:"h4"},"getRepository<T extends IEntity>(entityName: string | EntityClass<T>): EntityRepository<T>")),Object(o.b)("p",null,"Returns ",Object(o.b)("inlineCode",{parentName:"p"},"EntityRepository")," for given entity, respects ",Object(o.b)("inlineCode",{parentName:"p"},"customRepository")," option of ",Object(o.b)("inlineCode",{parentName:"p"},"@Entity"),"\nand ",Object(o.b)("inlineCode",{parentName:"p"},"entityRepository")," option of ",Object(o.b)("inlineCode",{parentName:"p"},"MikroORM.init()"),"."),Object(o.b)("h4",{id:"findt-extends-ientityentityname-string--entityclasst-where-filterqueryt-options-findoptions-promiset"},Object(o.b)("inlineCode",{parentName:"h4"},"find<T extends IEntity>(entityName: string | EntityClass<T>, where?: FilterQuery<T>, options?: FindOptions): Promise<T[]>")),Object(o.b)("p",null,"Returns array of entities found for given condition. You can specify ",Object(o.b)("inlineCode",{parentName:"p"},"FindOptions")," to request\npopulation of referenced entities or control the pagination:"),Object(o.b)("pre",null,Object(o.b)("code",Object(i.a)({parentName:"pre"},{className:"language-typescript"}),"export interface FindOptions {\n  populate?: string[];\n  orderBy?: { [k: string]: QueryOrder };\n  limit?: number;\n  offset?: number;\n}\n")),Object(o.b)("hr",null),Object(o.b)("h4",{id:"findt-extends-ientityentityname-string--entityclasst-where-filterqueryt-populate-string-orderby--k-string-queryorder--limit-number-offset-number-promiset"},Object(o.b)("inlineCode",{parentName:"h4"},"find<T extends IEntity>(entityName: string | EntityClass<T>, where?: FilterQuery<T>, populate?: string[], orderBy?: { [k: string]: QueryOrder }, limit?: number, offset?: number): Promise<T[]>")),Object(o.b)("p",null,"Same as previous ",Object(o.b)("inlineCode",{parentName:"p"},"find")," method, just with dedicated parameters for ",Object(o.b)("inlineCode",{parentName:"p"},"populate"),", ",Object(o.b)("inlineCode",{parentName:"p"},"orderBy"),", ",Object(o.b)("inlineCode",{parentName:"p"},"limit"),"\nand ",Object(o.b)("inlineCode",{parentName:"p"},"offset"),"."),Object(o.b)("hr",null),Object(o.b)("h4",{id:"findonet-extends-ientityentityname-string--entityclasst-where-filterqueryt--string-populate-string-promiset--null"},Object(o.b)("inlineCode",{parentName:"h4"},"findOne<T extends IEntity>(entityName: string | EntityClass<T>, where: FilterQuery<T> | string, populate?: string[]): Promise<T | null>")),Object(o.b)("p",null,"Finds an entity by given ",Object(o.b)("inlineCode",{parentName:"p"},"where")," condition. You can use primary key as ",Object(o.b)("inlineCode",{parentName:"p"},"where")," value, then\nif the entity is already managed, no database call will be made. "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"merget-extends-ientityentityname-string--entityclasst-data-entitydatat-t"},Object(o.b)("inlineCode",{parentName:"h4"},"merge<T extends IEntity>(entityName: string | EntityClass<T>, data: EntityData<T>): T")),Object(o.b)("p",null,"Adds given entity to current Identity Map. After merging, entity becomes managed.\nThis is useful when you want to work with cached entities. "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"mapt-extends-ientityentityname-string--entityclasst-data-entitydatat-t"},Object(o.b)("inlineCode",{parentName:"h4"},"map<T extends IEntity>(entityName: string | EntityClass<T>, data: EntityData<T>): T")),Object(o.b)("p",null,"Maps raw DB result to entity, adding it to current Identity Map. Equivalent to\n",Object(o.b)("inlineCode",{parentName:"p"},"IDatabaseDriver.mapResult()")," followed by ",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager.merge()"),"."),Object(o.b)("hr",null),Object(o.b)("h4",{id:"getreferencet-extends-ientityentityname-string--entityclasst-id-string-t"},Object(o.b)("inlineCode",{parentName:"h4"},"getReference<T extends IEntity>(entityName: string | EntityClass<T>, id: string): T")),Object(o.b)("p",null,"Gets a reference to the entity identified by the given type and identifier without actually\nloading it, if the entity is not yet loaded."),Object(o.b)("hr",null),Object(o.b)("h4",{id:"countentityname-string--entityclasst-where-any-promisenumber"},Object(o.b)("inlineCode",{parentName:"h4"},"count(entityName: string | EntityClass<T>, where: any): Promise<number>")),Object(o.b)("p",null,"Gets count of entities matching the ",Object(o.b)("inlineCode",{parentName:"p"},"where")," condition. "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"persistentity-ientity--ientity-flush-boolean-promisevoid"},Object(o.b)("inlineCode",{parentName:"h4"},"persist(entity: IEntity | IEntity[], flush?: boolean): Promise<void>")),Object(o.b)("p",null,"Tells the EntityManager to make an instance managed and persistent. The entity will be\nentered into the database at or before transaction commit or as a result of the flush\noperation. You can control immediate flushing via ",Object(o.b)("inlineCode",{parentName:"p"},"flush")," parameter and via ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush"),"\nconfiguration option. "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"persistandflushentity-ientity--ientity-promisevoid"},Object(o.b)("inlineCode",{parentName:"h4"},"persistAndFlush(entity: IEntity | IEntity[]): Promise<void>")),Object(o.b)("p",null,"Shortcut for ",Object(o.b)("inlineCode",{parentName:"p"},"persist")," & ",Object(o.b)("inlineCode",{parentName:"p"},"flush"),"."),Object(o.b)("hr",null),Object(o.b)("h4",{id:"persistlaterentity-ientity--ientity-void"},Object(o.b)("inlineCode",{parentName:"h4"},"persistLater(entity: IEntity | IEntity[]): void")),Object(o.b)("p",null,"Shortcut for just ",Object(o.b)("inlineCode",{parentName:"p"},"persist"),", without flushing. "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"flush-promisevoid"},Object(o.b)("inlineCode",{parentName:"h4"},"flush(): Promise<void>")),Object(o.b)("p",null,"Flushes all changes to objects that have been queued up to now to the database."),Object(o.b)("hr",null),Object(o.b)("h4",{id:"removeentityname-string--entityclasst-where-ientity--any-flush-boolean-promisenumber"},Object(o.b)("inlineCode",{parentName:"h4"},"remove(entityName: string | EntityClass<T>, where: IEntity | any, flush?: boolean): Promise<number>")),Object(o.b)("p",null,"When provided entity instance as ",Object(o.b)("inlineCode",{parentName:"p"},"where")," value, then it calls ",Object(o.b)("inlineCode",{parentName:"p"},"removeEntity(entity, flush)"),",\notherwise it fires delete query with given ",Object(o.b)("inlineCode",{parentName:"p"},"where")," condition. "),Object(o.b)("p",null,"This method fires ",Object(o.b)("inlineCode",{parentName:"p"},"beforeDelete")," and ",Object(o.b)("inlineCode",{parentName:"p"},"afterDelete")," hooks only if you provide entity instance.  "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"removeentityentity-ientity-flush-boolean-promisenumber"},Object(o.b)("inlineCode",{parentName:"h4"},"removeEntity(entity: IEntity, flush?: boolean): Promise<number>")),Object(o.b)("p",null,"Removes an entity instance. A removed entity will be removed from the database at or before\ntransaction commit or as a result of the flush operation. You can control immediate flushing\nvia ",Object(o.b)("inlineCode",{parentName:"p"},"flush")," parameter and via ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush")," configuration option."),Object(o.b)("p",null,"This method fires ",Object(o.b)("inlineCode",{parentName:"p"},"beforeDelete")," and ",Object(o.b)("inlineCode",{parentName:"p"},"afterDelete")," hooks.  "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"removeandflushentity-ientity-promisevoid"},Object(o.b)("inlineCode",{parentName:"h4"},"removeAndFlush(entity: IEntity): Promise<void>")),Object(o.b)("p",null,"Shortcut for ",Object(o.b)("inlineCode",{parentName:"p"},"removeEntity")," & ",Object(o.b)("inlineCode",{parentName:"p"},"flush"),"."),Object(o.b)("hr",null),Object(o.b)("h4",{id:"removelaterentity-ientity-void"},Object(o.b)("inlineCode",{parentName:"h4"},"removeLater(entity: IEntity): void")),Object(o.b)("p",null,"Shortcut for ",Object(o.b)("inlineCode",{parentName:"p"},"removeEntity")," without flushing. "),Object(o.b)("hr",null),Object(o.b)("h4",{id:"clear-void"},Object(o.b)("inlineCode",{parentName:"h4"},"clear(): void")),Object(o.b)("p",null,"Clears the EntityManager. All entities that are currently managed by this EntityManager\nbecome detached."),Object(o.b)("hr",null),Object(o.b)("h4",{id:"canpopulateentityname-string--entityclasst-property-string-boolean"},Object(o.b)("inlineCode",{parentName:"h4"},"canPopulate(entityName: string | EntityClass<T>, property: string): boolean")),Object(o.b)("p",null,"Returns whether given entity has given property which can be populated (is reference or\ncollection)."),Object(o.b)("hr",null),Object(o.b)("p",null,Object(o.b)("a",Object(i.a)({parentName:"p"},{href:"/docs/v2/index#table-of-contents"}),"\u2190"," Back to table of contents")))}c.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return p}));var i=n(0),a=n.n(i),o=a.a.createContext({}),r=function(e){var t=a.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},s=function(e){var t=r(e.components);return a.a.createElement(o.Provider,{value:t},e.children)};var l="mdxType",b={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},c=Object(i.forwardRef)((function(e,t){var n=e.components,i=e.mdxType,o=e.originalType,s=e.parentName,l=function(e,t){var n={};for(var i in e)Object.prototype.hasOwnProperty.call(e,i)&&-1===t.indexOf(i)&&(n[i]=e[i]);return n}(e,["components","mdxType","originalType","parentName"]),c=r(n),p=i,d=c[s+"."+p]||c[p]||b[p]||o;return n?a.a.createElement(d,Object.assign({},{ref:t},l,{components:n})):a.a.createElement(d,Object.assign({},{ref:t},l))}));function p(e,t){var n=arguments,i=t&&t.mdxType;if("string"==typeof e||i){var o=n.length,r=new Array(o);r[0]=c;var s={};for(var b in t)hasOwnProperty.call(t,b)&&(s[b]=t[b]);s.originalType=e,s[l]="string"==typeof e?e:i,r[1]=s;for(var p=2;p<o;p++)r[p]=n[p];return a.a.createElement.apply(null,r)}return a.a.createElement.apply(null,n)}c.displayName="MDXCreateElement"}}]);