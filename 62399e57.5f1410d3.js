(window.webpackJsonp=window.webpackJsonp||[]).push([[60],{192:function(e,t,n){"use strict";n.r(t),n.d(t,"frontMatter",(function(){return i})),n.d(t,"rightToc",(function(){return l})),n.d(t,"default",(function(){return u}));var o=n(1),a=n(9),r=(n(0),n(288)),i={title:"Identity Map and Request Context"},l=[{value:"Forking Entity Manager",id:"forking-entity-manager",children:[]},{value:'<a name="request-context"></a> RequestContext helper for DI containers',id:"a-namerequest-contexta-requestcontext-helper-for-di-containers",children:[]},{value:"Why is Request Context needed?",id:"why-is-request-context-needed",children:[{value:"Problem 1 - growing memory footprint",id:"problem-1---growing-memory-footprint",children:[]},{value:"Problem 2 - unstable response of API endpoints",id:"problem-2---unstable-response-of-api-endpoints",children:[]}]}],s={rightToc:l},c="wrapper";function u(e){var t=e.components,n=Object(a.a)(e,["components"]);return Object(r.b)(c,Object(o.a)({},s,n,{components:t,mdxType:"MDXLayout"}),Object(r.b)("p",null,Object(r.b)("inlineCode",{parentName:"p"},"MikroORM")," uses identity map in background so you will always get the same instance of\none entity."),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"const authorRepository = orm.em.getRepository(Author);\nconst jon = await authorRepository.findOne({ name: 'Jon Snow' }, ['books']);\nconst authors = await authorRepository.findAll(['books']);\n\n// identity map in action\nconsole.log(jon === authors[0]); // true\n")),Object(r.b)("p",null,"If you want to clear this identity map cache, you can do so via ",Object(r.b)("inlineCode",{parentName:"p"},"em.clear()")," method:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"orm.em.clear();\n")),Object(r.b)("p",null,"You should always keep unique identity map per each request. This basically means that you need\nto clone entity manager and use the clone in request context. There are two ways to achieve this:"),Object(r.b)("h2",{id:"forking-entity-manager"},"Forking Entity Manager"),Object(r.b)("p",null,"With ",Object(r.b)("inlineCode",{parentName:"p"},"fork()")," method you can simply get clean entity manager with its own context and identity map:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"const em = orm.em.fork();\n")),Object(r.b)("h2",{id:"a-namerequest-contexta-requestcontext-helper-for-di-containers"},Object(r.b)("a",{name:"request-context"})," RequestContext helper for DI containers"),Object(r.b)("p",null,"If you use dependency injection container like ",Object(r.b)("inlineCode",{parentName:"p"},"inversify")," or the one in ",Object(r.b)("inlineCode",{parentName:"p"},"nestjs")," framework, it\ncan be hard to achieve this, because you usually want to access your repositories via DI container,\nbut it will always provide you with the same instance, rather than new one for each request. "),Object(r.b)("p",null,"To solve this, you can use ",Object(r.b)("inlineCode",{parentName:"p"},"RequestContext")," helper, that will use ",Object(r.b)("inlineCode",{parentName:"p"},"node"),"'s Domain API in the\nbackground to isolate the request context. MikroORM will always use request specific (forked)\nentity manager if available, so all you need to do is to create new request context preferably\nas a middleware:"),Object(r.b)("pre",null,Object(r.b)("code",Object(o.a)({parentName:"pre"},{className:"language-typescript"}),"app.use((req, res, next) => {\n  RequestContext.create(orm.em, next);\n});\n")),Object(r.b)("p",null,"You should register this middleware as the last one just before request handlers and before\nany of your custom middleware that is using the ORM. There might be issues when you register\nit before request processing middleware like ",Object(r.b)("inlineCode",{parentName:"p"},"queryParser")," or ",Object(r.b)("inlineCode",{parentName:"p"},"bodyParser"),", so definitely\nregister the context after them. "),Object(r.b)("h2",{id:"why-is-request-context-needed"},"Why is Request Context needed?"),Object(r.b)("p",null,"Imagine you will use single Identity Map throughout your application. It will be shared across\nall request handlers, that can possibly run in parallel. "),Object(r.b)("h3",{id:"problem-1---growing-memory-footprint"},"Problem 1 - growing memory footprint"),Object(r.b)("p",null,"As there would be only one shared Identity Map, you can't just clear it after your request ends.\nThere can be another request working with it so clearing the Identity Map from one request could\nbreak other requests running in parallel. This will result in growing memory footprint, as every\nentity that became managed at some point in time would be kept in the Identity Map. "),Object(r.b)("h3",{id:"problem-2---unstable-response-of-api-endpoints"},"Problem 2 - unstable response of API endpoints"),Object(r.b)("p",null,"Every entity has ",Object(r.b)("inlineCode",{parentName:"p"},"toJSON()")," method, that automatically converts it to serialized form. If you\nhave only one shared Identity Map, following situation may occur:"),Object(r.b)("p",null,"Let's say there are 2 endpoints"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"GET /book/:id")," that returns just the book, without populating anything"),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"GET /book-with-author/:id")," that returns the book and its author populated")),Object(r.b)("p",null,"Now when someone requests same book via both of those endpoints, you could end up with both\nreturning the same output:"),Object(r.b)("ol",null,Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"GET /book/1")," returns ",Object(r.b)("inlineCode",{parentName:"li"},"Book")," without populating its property ",Object(r.b)("inlineCode",{parentName:"li"},"author")," property"),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"GET /book-with-author/1")," returns ",Object(r.b)("inlineCode",{parentName:"li"},"Book"),", this time with ",Object(r.b)("inlineCode",{parentName:"li"},"author")," populated"),Object(r.b)("li",{parentName:"ol"},Object(r.b)("inlineCode",{parentName:"li"},"GET /book/1")," returns ",Object(r.b)("inlineCode",{parentName:"li"},"Book"),", but this time also with ",Object(r.b)("inlineCode",{parentName:"li"},"author")," populated")),Object(r.b)("p",null,"This happens because the information about entity association being populated is stored in\nthe Identity Map. "))}u.isMDXComponent=!0},288:function(e,t,n){"use strict";n.d(t,"a",(function(){return l})),n.d(t,"b",(function(){return p}));var o=n(0),a=n.n(o),r=a.a.createContext({}),i=function(e){var t=a.a.useContext(r),n=t;return e&&(n="function"==typeof e?e(t):Object.assign({},t,e)),n},l=function(e){var t=i(e.components);return a.a.createElement(r.Provider,{value:t},e.children)};var s="mdxType",c={inlineCode:"code",wrapper:function(e){var t=e.children;return a.a.createElement(a.a.Fragment,{},t)}},u=Object(o.forwardRef)((function(e,t){var n=e.components,o=e.mdxType,r=e.originalType,l=e.parentName,s=function(e,t){var n={};for(var o in e)Object.prototype.hasOwnProperty.call(e,o)&&-1===t.indexOf(o)&&(n[o]=e[o]);return n}(e,["components","mdxType","originalType","parentName"]),u=i(n),p=o,b=u[l+"."+p]||u[p]||c[p]||r;return n?a.a.createElement(b,Object.assign({},{ref:t},s,{components:n})):a.a.createElement(b,Object.assign({},{ref:t},s))}));function p(e,t){var n=arguments,o=t&&t.mdxType;if("string"==typeof e||o){var r=n.length,i=new Array(r);i[0]=u;var l={};for(var c in t)hasOwnProperty.call(t,c)&&(l[c]=t[c]);l.originalType=e,l[s]="string"==typeof e?e:o,i[1]=l;for(var p=2;p<r;p++)i[p]=n[p];return a.a.createElement.apply(null,i)}return a.a.createElement.apply(null,n)}u.displayName="MDXCreateElement"}}]);