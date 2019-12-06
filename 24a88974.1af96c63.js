(window.webpackJsonp=window.webpackJsonp||[]).push([[21],{153:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return r})),n.d(t,"rightToc",(function(){return s})),n.d(t,"default",(function(){return p}));var a=n(1),i=n(9),o=(n(0),n(288)),r={title:"Unit of Work and Transactions",sidebar_label:"Unit of Work"},s=[{value:"Persisting Managed Entities",id:"persisting-managed-entities",children:[]},{value:"How MikroORM Detects Changes",id:"how-mikroorm-detects-changes",children:[]},{value:"Implicit Transactions",id:"implicit-transactions",children:[{value:"Beware: Auto-flushing and Transactions",id:"beware-auto-flushing-and-transactions",children:[]}]}],c={rightToc:s},l="wrapper";function p(e){var t=e.components,n=Object(i.a)(e,["components"]);return Object(o.b)(l,Object(a.a)({},c,n,{components:t,mdxType:"MDXLayout"}),Object(o.b)("p",null,"MikroORM uses the Identity Map pattern to track objects. Whenever you fetch an object from\nthe database, MikroORM will keep a reference to this object inside its ",Object(o.b)("inlineCode",{parentName:"p"},"UnitOfWork"),". "),Object(o.b)("p",null,"This allows MikroORM room for optimizations. If you call the EntityManager and ask for an\nentity with a specific ID twice, it will return the same instance:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const authorRepository = orm.em.getRepository(Author);\nconst jon1 = await authorRepository.findOne(1);\nconst jon2 = await authorRepository.findOne(1);\n\n// identity map in action\nconsole.log(jon1 === jon2); // true\n")),Object(o.b)("p",null,"Only one SELECT query will be fired against the database here. In the second ",Object(o.b)("inlineCode",{parentName:"p"},"findOne()"),"\ncall MikroORM will check the identity map first and will skip the database round trip as\nit will find the entity already loaded."),Object(o.b)("p",null,"The identity map being indexed by primary keys only allows shortcuts when you ask for objects\nby primary key. When you query by other properties, you will still get the same reference,\nbut two separate database calls will be made:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const authorRepository = orm.em.getRepository(Author);\nconst jon1 = await authorRepository.findOne({ name: 'Jon Snow' });\nconst jon2 = await authorRepository.findOne({ name: 'Jon Snow' });\n\n// identity map in action\nconsole.log(jon1 === jon2); // true\n")),Object(o.b)("p",null,"MikroORM only knows objects by id, so a query for different criteria has to go to the database,\neven if it was executed just before. But instead of creating a second ",Object(o.b)("inlineCode",{parentName:"p"},"Author")," object MikroORM\nfirst gets the primary key from the row and checks if it already has an object inside the\n",Object(o.b)("inlineCode",{parentName:"p"},"UnitOfWork")," with that primary key. "),Object(o.b)("h2",{id:"persisting-managed-entities"},"Persisting Managed Entities"),Object(o.b)("p",null,"The identity map has a second use-case. When you call ",Object(o.b)("inlineCode",{parentName:"p"},"em.flush()"),", MikroORM will\nask the identity map for all objects that are currently managed. This means you don't have to\ncall ",Object(o.b)("inlineCode",{parentName:"p"},"em.persistLater()")," over and over again to pass known objects to the\n",Object(o.b)("inlineCode",{parentName:"p"},"EntityManager"),". This is a NO-OP for known entities, but leads to much code written that is\nconfusing to other developers."),Object(o.b)("p",null,"The following code WILL update your database with the changes made to the ",Object(o.b)("inlineCode",{parentName:"p"},"Author")," object,\neven if you did not call ",Object(o.b)("inlineCode",{parentName:"p"},"em.persistLater()"),":"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const authorRepository = orm.em.getRepository(Author);\nconst jon = await authorRepository.findOne(1);\njon.email = 'foo@bar.com';\nawait authorRepository.flush(); // calling orm.em.flush() has same effect\n")),Object(o.b)("h2",{id:"how-mikroorm-detects-changes"},"How MikroORM Detects Changes"),Object(o.b)("p",null,'MikroORM is a data-mapper that tries to achieve persistence-ignorance (PI). This means you\nmap JS objects into a relational database that do not necessarily know about the database at\nall. A natural question would now be, "how does MikroORM even detect objects have changed?".'),Object(o.b)("p",null,"For this MikroORM keeps a second map inside the ",Object(o.b)("inlineCode",{parentName:"p"},"UnitOfWork"),". Whenever you fetch an object\nfrom the database MikroORM will keep a copy of all the properties and associations inside\nthe ",Object(o.b)("inlineCode",{parentName:"p"},"UnitOfWork"),". "),Object(o.b)("p",null,"Now whenever you call ",Object(o.b)("inlineCode",{parentName:"p"},"em.flush()")," MikroORM will iterate over all entities you\npreviously marked for persisting via ",Object(o.b)("inlineCode",{parentName:"p"},"em.persistLater()"),". For each object it will\ncompare the original property and association values with the values that are currently set\non the object. If changes are detected then the object is queued for a UPDATE operation.\nOnly the fields that actually changed are updated."),Object(o.b)("h2",{id:"implicit-transactions"},"Implicit Transactions"),Object(o.b)("p",null,"First and most important implication of having Unit of Work is that it allows handling\ntransactions automatically. "),Object(o.b)("p",null,"When you call ",Object(o.b)("inlineCode",{parentName:"p"},"em.flush()"),", all computed changes are queried inside a database\ntransaction (if supported by given driver). This means that you can control the boundaries\nof transactions simply by calling ",Object(o.b)("inlineCode",{parentName:"p"},"em.persistLater()")," and once all your changes\nare ready, simply calling ",Object(o.b)("inlineCode",{parentName:"p"},"flush()")," will run them inside a transaction. "),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"You can also control the transaction boundaries manually via ",Object(o.b)("inlineCode",{parentName:"p"},"em.transactional(cb)"),".")),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const user = await em.findOne(User, 1);\nuser.email = 'foo@bar.com';\nconst car = new Car();\nuser.cars.add(car);\n\n// thanks to bi-directional cascading we only need to persist user entity\n// flushing will create a transaction, insert new car and update user with new email\nawait em.persistAndFlush(user);\n")),Object(o.b)("p",null,"You can find more information about transactions in ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"/docs/transactions"}),"Transactions and concurrency"),"\npage."),Object(o.b)("h3",{id:"beware-auto-flushing-and-transactions"},"Beware: Auto-flushing and Transactions"),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"Since MikroORM v3, default value for ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush")," is ",Object(o.b)("inlineCode",{parentName:"p"},"false"),". That means you need to call\n",Object(o.b)("inlineCode",{parentName:"p"},"em.flush()")," yourself to persist changes into database. You can still change this via ORM's\noptions to ease the transition but generally it is not recommended. ")),Object(o.b)("p",null,"Originally there was only ",Object(o.b)("inlineCode",{parentName:"p"},"em.persist(entity, flush = true)")," method, that was\nautomatically flushing changes to database, if not given second ",Object(o.b)("inlineCode",{parentName:"p"},"false")," parameter. This\nbehaviour can be now changed via ",Object(o.b)("inlineCode",{parentName:"p"},"autoFlush")," option when initializing the ORM:"),Object(o.b)("pre",null,Object(o.b)("code",Object(a.a)({parentName:"pre"},{className:"language-typescript"}),"const orm = await MikroORM.init({\n  autoFlush: false, // defaults to false in v3, was true in v2\n  // ...\n});\norm.em.persist(new Entity()); // no auto-flushing now\nawait orm.em.flush();\nawait orm.em.persist(new Entity(), true); // you can still use second parameter to auto-flush\n")),Object(o.b)("p",null,"When using driver that supports transactions (all SQL drivers), you should either keep auto-flushing\ndisabled, or use ",Object(o.b)("inlineCode",{parentName:"p"},"persistLater()")," method instead, as otherwise each ",Object(o.b)("inlineCode",{parentName:"p"},"persist()")," call will immediately\ncreate new transaction to run the query."),Object(o.b)("blockquote",null,Object(o.b)("p",{parentName:"blockquote"},"This part of documentation is highly inspired by ",Object(o.b)("a",Object(a.a)({parentName:"p"},{href:"https://www.doctrine-project.org/projects/doctrine-orm/en/2.6/reference/unitofwork.html"}),"doctrine internals docs"),"\nas the behaviour here is pretty much the same.")))}p.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return s})),n.d(t,"b",(function(){return u}));var a=n(0),i=n.n(a),o=i.a.createContext({}),r=function(e){var t=i.a.useContext(o),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},s=function(e){var t=r(e.components);return i.a.createElement(o.Provider,{value:t},e.children)};var c="mdxType",l={inlineCode:"code",wrapper:function(e){var t=e.children;return i.a.createElement(i.a.Fragment,{},t)}},p=Object(a.forwardRef)((function(e,t){var n=e.components,a=e.mdxType,o=e.originalType,s=e.parentName,c=function(e,t){var n={};for(var a in e)Object.prototype.hasOwnProperty.call(e,a)&&-1===t.indexOf(a)&&(n[a]=e[a]);return n}(e,["components","mdxType","originalType","parentName"]),p=r(n),u=a,b=p[s+"."+u]||p[u]||l[u]||o;return n?i.a.createElement(b,Object.assign({},{ref:t},c,{components:n})):i.a.createElement(b,Object.assign({},{ref:t},c))}));function u(e,t){var n=arguments,a=t&&t.mdxType;if("string"==typeof e||a){var o=n.length,r=new Array(o);r[0]=p;var s={};for(var l in t)hasOwnProperty.call(t,l)&&(s[l]=t[l]);s.originalType=e,s[c]="string"==typeof e?e:a,r[1]=s;for(var u=2;u<o;u++)r[u]=n[u];return i.a.createElement.apply(null,r)}return i.a.createElement.apply(null,n)}p.displayName="MDXCreateElement"}}]);