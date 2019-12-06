(window.webpackJsonp=window.webpackJsonp||[]).push([[101],{233:function(e,n,a){"use strict";a.r(n),a.d(n,"frontMatter",(function(){return i})),a.d(n,"rightToc",(function(){return s})),a.d(n,"default",(function(){return p}));var o=a(1),t=a(9),r=(a(0),a(288)),i={title:"Cascading persist, merge and remove",sidebar_label:"Cascading"},s=[{value:"Cascade persist",id:"cascade-persist",children:[]},{value:"Cascade merge",id:"cascade-merge",children:[]},{value:"Cascade remove",id:"cascade-remove",children:[]},{value:"Orphan removal",id:"orphan-removal",children:[]}],c={rightToc:s},l="wrapper";function p(e){var n=e.components,a=Object(t.a)(e,["components"]);return Object(r.b)(l,Object(o.a)({},c,a,{components:n,mdxType:"MDXLayout"}),Object(r.b)("p",null,"When persisting or removing entity, all your references are by default cascade persisted.\nThis means that by persisting any entity, ORM will automatically persist all of its\nassociations. "),Object(r.b)("p",null,"You can control this behaviour via ",Object(r.b)("inlineCode",{parentName:"p"},"cascade")," attribute of ",Object(r.b)("inlineCode",{parentName:"p"},"@ManyToOne"),", ",Object(r.b)("inlineCode",{parentName:"p"},"@ManyToMany"),",\n",Object(r.b)("inlineCode",{parentName:"p"},"@OneToMany")," and ",Object(r.b)("inlineCode",{parentName:"p"},"@OneToOne")," fields."),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"New entities without primary key will be always persisted, regardless of ",Object(r.b)("inlineCode",{parentName:"p"},"cascade")," value. ")),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"// cascade persist & merge is default value\n@OneToMany({ entity: () => Book, mappedBy: 'author' })\nbooks = new Collection<Book>(this);\n\n// same as previous definition\n@OneToMany({ entity: () => Book, mappedBy: 'author', cascade: [Cascade.PERSIST, Cascade.MERGE] })\nbooks = new Collection<Book>(this);\n\n// only cascade remove\n@OneToMany({ entity: () => Book, mappedBy: 'author', cascade: [Cascade.REMOVE] })\nbooks = new Collection<Book>(this);\n\n// cascade persist and remove (but not merge)\n@OneToMany({ entity: () => Book, mappedBy: 'author', cascade: [Cascade.PERSIST, Cascade.REMOVE] })\nbooks = new Collection<Book>(this);\n\n// no cascade\n@OneToMany({ entity: () => Book, mappedBy: 'author', cascade: [] })\nbooks = new Collection<Book>(this);\n\n// cascade all (persist, merge and remove)\n@OneToMany({ entity: () => Book, mappedBy: 'author', cascade: [Cascade.ALL] })\nbooks = new Collection<Book>(this);\n\n// same as previous definition\n@OneToMany({ entity: () => Book, mappedBy: 'author', cascade: [Cascade.PERSIST, Cascade.MERGE, Cascade.REMOVE] })\nbooks = new Collection<Book>(this);\n")),Object(r.b)("h2",{id:"cascade-persist"},"Cascade persist"),Object(r.b)("p",null,"Here is example of how cascade persist works:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"const book = await orm.em.findOne(Book, 'id', ['author', 'tags']);\nbook.author.name = 'Foo Bar';\nbook.tags[0].name = 'new name 1';\nbook.tags[1].name = 'new name 2';\nawait orm.em.persistAndFlush(book); // all book tags and author will be persisted too\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"When cascade persisting collections, keep in mind only fully initialized collections\nwill be cascade persisted.")),Object(r.b)("h2",{id:"cascade-merge"},"Cascade merge"),Object(r.b)("p",null,"When you want to merge entity and all its associations, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"Cascade.MERGE"),". This\ncomes handy when you want to clear identity map (e.g. when importing large number of entities),\nbut you also have to keep your parent entities managed (because otherwise they would be considered\nas new entities and insert-persisted, which would fail with non-unique identifier)."),Object(r.b)("p",null,"In following example, without having ",Object(r.b)("inlineCode",{parentName:"p"},"Author.favouriteBook")," set to cascade merge, you would\nget an error because it would be cascade-inserted with already taken ID. "),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"const a1 = new Author(...);\na1.favouriteBook = new Book('the best', ...);\nawait orm.em.persistAndFlush(a1); // cascade persists favourite book as well\n\nfor (let i = 1; i < 1000; i++) {\n  const book = new Book('...', a1);\n  orm.em.persistLater(book);\n  \n  // persist every 100 records\n  if (i % 100 === 0) {\n    await orm.em.flush();\n    orm.em.clear(); // this makes both a1 and his favourite book detached\n    orm.em.merge(a1); // so we need to merge them to prevent cascade-inserts\n    \n    // without cascade merge, you would need to manually merge all his associations\n    orm.em.merge(a1.favouriteBook); // not needed with Cascade.MERGE\n  }\n}\n\nawait orm.em.flush();\n")),Object(r.b)("h2",{id:"cascade-remove"},"Cascade remove"),Object(r.b)("p",null,"Cascade remove works same way as cascade persist, just for removing entities. Following\nexample assumes that ",Object(r.b)("inlineCode",{parentName:"p"},"Book.publisher")," is set to ",Object(r.b)("inlineCode",{parentName:"p"},"Cascade.REMOVE"),":"),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},"Note that cascade remove for collections can be inefficient as it will fire 1 query\nfor each entity in collection.")),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"await orm.em.removeEntity(book); // this will also remove book.publisher\n")),Object(r.b)("p",null,"Keep in mind that cascade remove ",Object(r.b)("strong",{parentName:"p"},"can be dangerous")," when used on ",Object(r.b)("inlineCode",{parentName:"p"},"@ManyToOne")," fields,\nas cascade removed entity can stay referenced in another entities that were not removed."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"const publisher = new Publisher(...);\n// all books with same publisher\nbook1.publisher = book2.publisher = book3.publisher = publisher;\nawait orm.em.removeEntity(book1); // this will remove book1 and its publisher\n\n// but we still have reference to removed publisher here\nconsole.log(book2.publisher, book3.publisher);\n")),Object(r.b)("h2",{id:"orphan-removal"},"Orphan removal"),Object(r.b)("p",null,"In addition to ",Object(r.b)("inlineCode",{parentName:"p"},"Cascade.REMOVE"),", there is also additional and more aggressive remove\ncascading mode which can be specified using the ",Object(r.b)("inlineCode",{parentName:"p"},"orphanRemoval")," flag of the ",Object(r.b)("inlineCode",{parentName:"p"},"@OneToOne"),"\nand ",Object(r.b)("inlineCode",{parentName:"p"},"@OneToMany")," properties:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"export class Author {\n  @OneToMany({ entity: () => Book, mappedBy: 'author', orphanRemoval: true })\n  books = new Collection<Book>(this);\n}\n")),Object(r.b)("blockquote",null,Object(r.b)("p",{parentName:"blockquote"},Object(r.b)("inlineCode",{parentName:"p"},"orphanRemoval")," flag behaves just like ",Object(r.b)("inlineCode",{parentName:"p"},"Cascade.REMOVE")," for remove operation, so specifying\nboth is redundant.")),Object(r.b)("p",null,"With simple ",Object(r.b)("inlineCode",{parentName:"p"},"Cascade.REMOVE"),", you wound need to remove the ",Object(r.b)("inlineCode",{parentName:"p"},"Author")," entity to cascade\nthe operation down to all loaded ",Object(r.b)("inlineCode",{parentName:"p"},"Book"),"s. By enabling orphan removal on the collection,\n",Object(r.b)("inlineCode",{parentName:"p"},"Book"),"s will be also removed when they get disconnected from the collection (either via\n",Object(r.b)("inlineCode",{parentName:"p"},"remove()"),", or by replacing collection items via ",Object(r.b)("inlineCode",{parentName:"p"},"set()"),"):"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"await author.books.set([book1, book2]); // replace whole collection\nawait author.books.remove(book1); // remove book from collection\nawait orm.em.persistAndFlush(author); // book1 will be removed, as well as all original items (before we called `set()`)\n")),Object(r.b)("p",null,"In this example, no ",Object(r.b)("inlineCode",{parentName:"p"},"Book")," would be removed with simple ",Object(r.b)("inlineCode",{parentName:"p"},"Cascade.REMOVE")," as no remove operation\nwas executed. "))}p.isMDXComponent=!0},288:function(e,n,a){"use strict";a.d(n,"a",(function(){return s})),a.d(n,"b",(function(){return b}));var o=a(0),t=a.n(o),r=t.a.createContext({}),i=function(e){var n=t.a.useContext(r),a=n;return e&&(a="function"==typeof e?e(n):Object.assign({},n,e)),a},s=function(e){var n=i(e.components);return t.a.createElement(r.Provider,{value:n},e.children)};var c="mdxType",l={inlineCode:"code",wrapper:function(e){var n=e.children;return t.a.createElement(t.a.Fragment,{},n)}},p=Object(o.forwardRef)((function(e,n){var a=e.components,o=e.mdxType,r=e.originalType,s=e.parentName,c=function(e,n){var a={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===n.indexOf(o)&&(a[o]=e[o]);return a}(e,["components","mdxType","originalType","parentName"]),p=i(a),b=o,d=p[s+"."+b]||p[b]||l[b]||r;return a?t.a.createElement(d,Object.assign({},{ref:n},c,{components:a})):t.a.createElement(d,Object.assign({},{ref:n},c))}));function b(e,n){var a=arguments,o=n&&n.mdxType;if("string"==typeof e||o){var r=a.length,i=new Array(r);i[0]=p;var s={};for(var l in n)hasOwnProperty.call(n,l)&&(s[l]=n[l]);s.originalType=e,s[c]="string"==typeof e?e:o,i[1]=s;for(var b=2;b<r;b++)i[b]=a[b];return t.a.createElement.apply(null,i)}return t.a.createElement.apply(null,a)}p.displayName="MDXCreateElement"}}]);