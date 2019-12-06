(window.webpackJsonp=window.webpackJsonp||[]).push([[76],{208:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"rightToc",(function(){return p})),n.d(t,"default",(function(){return c}));var a=n(1),o=n(9),r=(n(0),n(288)),i={title:"EntityHelper and Decorated Entities",sidebar_label:"Updating Entity Values"},p=[{value:"Updating Entity Values with <code>entity.assign()</code>",id:"updating-entity-values-with-entityassign",children:[]},{value:"<code>WrappedEntity</code> and <code>wrap()</code> helper",id:"wrappedentity-and-wrap-helper",children:[]}],l={rightToc:p},s="wrapper";function c(e){var t=e.components,n=Object(o.a)(e,["components"]);return Object(r.b)(s,Object(a.a)({},l,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("h2",{id:"updating-entity-values-with-entityassign"},"Updating Entity Values with ",Object(r.b)("inlineCode",{parentName:"h2"},"entity.assign()")),Object(r.b)("p",null,"When you want to update entity based on user input, you will usually have just plain\nstring ids of entity relations as user input. Normally you would need to use\n",Object(r.b)("inlineCode",{parentName:"p"},"em.getReference()")," to create references from each id first, and then\nuse those references to update entity relations:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const jon = new Author('Jon Snow', 'snow@wall.st');\nconst book = new Book('Book', jon);\nbook.author = orm.em.getReference<Author>(Author, '...id...');\n")),Object(r.b)("p",null,"Same result can be easily achieved with ",Object(r.b)("inlineCode",{parentName:"p"},"entity.assign()"),":"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"import { wrap } from 'mikro-orm';\n\nwrap(book).assign({ \n  title: 'Better Book 1', \n  author: '...id...',\n});\nconsole.log(book.title); // 'Better Book 1'\nconsole.log(book.author); // instance of Author with id: '...id...'\nconsole.log(book.author.id); // '...id...'\n")),Object(r.b)("p",null,"By default, ",Object(r.b)("inlineCode",{parentName:"p"},"entity.assign(data)")," behaves same way as ",Object(r.b)("inlineCode",{parentName:"p"},"Object.assign(entity, data)"),",\ne.g. it does not merge things recursively. To enable deep merging of object properties,\nuse second parameter to enable ",Object(r.b)("inlineCode",{parentName:"p"},"mergeObjects")," flag:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"import { wrap } from 'mikro-orm';\n\nbook.meta = { foo: 1, bar: 2 };\n\nwrap(book).assign({ meta: { foo: 3 } }, { mergeObjects: true });\nconsole.log(book.meta); // { foo: 3, bar: 2 }\n\nwrap(book).assign({ meta: { foo: 4 } });\nconsole.log(book.meta); // { foo: 4 }\n")),Object(r.b)("h2",{id:"wrappedentity-and-wrap-helper"},Object(r.b)("inlineCode",{parentName:"h2"},"WrappedEntity")," and ",Object(r.b)("inlineCode",{parentName:"h2"},"wrap()")," helper"),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"IWrappedEntity")," is interface that defines helper methods as well as some internal\nproperties provided by the ORM:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"interface IWrappedEntity<T, PK extends keyof T> {\n  isInitialized(): boolean;\n  populated(populated?: boolean): void;\n  init(populated?: boolean, lockMode?: LockMode): Promise<this>;\n  toObject(ignoreFields?: string[]): Dictionary;\n  toJSON(...args: any[]): Dictionary;\n  assign(data: any, options?: AssignOptions | boolean): this;\n  __uuid: string;\n  __meta: EntityMetadata;\n  __em: EntityManager;\n  __initialized?: boolean;\n  __populated: boolean;\n  __lazyInitialized: boolean;\n  __primaryKey: T[PK] & Primary<T>;\n  __serializedPrimaryKey: string & keyof T;\n}\n")),Object(r.b)("p",null,"Users can choose whether they are fine with polluting the entity interface with\nthose additional methods and properties, or they want to keep the interface clean\nand use the ",Object(r.b)("inlineCode",{parentName:"p"},"wrap(entity)")," helper method instead to access them. "),Object(r.b)("p",null,"To keep all methods available on the entity, you can use interface merging with\n",Object(r.b)("inlineCode",{parentName:"p"},"WrappedEntity<T, PK>")," that both extends ",Object(r.b)("inlineCode",{parentName:"p"},"AnyEntity<T, PK>")," and defines all those methods."),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class Book { ... }\nexport interface Book extends WrappedEntity<Book, 'id'> { }\n")),Object(r.b)("p",null,"Then you can work with those methods directly:"),Object(r.b)("pre",null,Object(r.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"book.meta = { foo: 1, bar: 2 };\nbook.assign({ meta: { foo: 3 } }, { mergeObjects: true });\nconsole.log(book.meta); // { foo: 3, bar: 2 }\n")))}c.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return p})),n.d(t,"b",(function(){return d}));var a=n(0),o=n.n(a),r=o.a.createContext({}),i=function(e){var t=o.a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},p=function(e){var t=i(e.components);return o.a.createElement(r.Provider,{value:t},e.children)};var l="mdxType",s={inlineCode:"code",wrapper:function(e){var t=e.children;return o.a.createElement(o.a.Fragment,{},t)}},c=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,r=e.originalType,p=e.parentName,l=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}(e,["components","mdxType","originalType","parentName"]),c=i(n),d=a,b=c[p+"."+d]||c[d]||s[d]||r;return n?o.a.createElement(b,Object.assign({},{ref:t},l,{components:n})):o.a.createElement(b,Object.assign({},{ref:t},l))}));function d(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var r=n.length,i=new Array(r);i[0]=c;var p={};for(var s in t)hasOwnProperty.call(t,s)&&(p[s]=t[s]);p.originalType=e,p[l]="string"==typeof e?e:a,i[1]=p;for(var d=2;d<r;d++)i[d]=n[d];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,n)}c.displayName="MDXCreateElement"}}]);