(window.webpackJsonp=window.webpackJsonp||[]).push([[13],{141:function(e,n,t){"use strict";t.r(n),t.d(n,"frontMatter",(function(){return i})),t.d(n,"rightToc",(function(){return c})),t.d(n,"default",(function(){return u}));var r=t(1),o=t(9),a=(t(0),t(288)),i={title:"Using Entity Constructors"},c=[],l={rightToc:c},p="wrapper";function u(e){var n=e.components,t=Object(o.a)(e,["components"]);return Object(a.b)(p,Object(r.a)({},l,t,{components:n,mdxType:"MDXLayout"}),Object(a.b)("p",null,"Internally, ",Object(a.b)("inlineCode",{parentName:"p"},"MikroORM")," never calls entity constructor, so you are free to use it as you wish.\nThe constructor will be called only when you instantiate the class yourself via ",Object(a.b)("inlineCode",{parentName:"p"},"new")," operator,\nso it is a handy place to require your data when creating new entity."),Object(a.b)("p",null,"For example following ",Object(a.b)("inlineCode",{parentName:"p"},"Book")," entity definition will always require to set ",Object(a.b)("inlineCode",{parentName:"p"},"title")," and ",Object(a.b)("inlineCode",{parentName:"p"},"author"),",\nbut ",Object(a.b)("inlineCode",{parentName:"p"},"publisher")," will be optional:"),Object(a.b)("pre",null,Object(a.b)("code",Object(r.a)({parentName:"pre"},{className:"language-typescript"}),"@Entity()\nexport class Book implements IdEntity<Book> {\n\n  @PrimaryKey()\n  id!: number;\n\n  @Property()\n  title!: string;\n\n  @ManyToOne()\n  author!: Author;\n\n  @ManyToOne()\n  publisher?: Publisher;\n\n  @ManyToMany({ entity: () => BookTag, inversedBy: 'books' })\n  tags = new Collection<BookTag>(this);\n\n  constructor(title: string, author: Author) {\n    this.title = title;\n    this.author = author;\n  }\n\n}\n")))}u.isMDXComponent=!0},288:function(e,n,t){"use strict";t.d(n,"a",(function(){return c})),t.d(n,"b",(function(){return s}));var r=t(0),o=t.n(r),a=o.a.createContext({}),i=function(e){var n=o.a.useContext(a),t=n;return e&&(t="function"==typeof e?e(n):Object.assign({},n,e)),t},c=function(e){var n=i(e.components);return o.a.createElement(a.Provider,{value:n},e.children)};var l="mdxType",p={inlineCode:"code",wrapper:function(e){var n=e.children;return o.a.createElement(o.a.Fragment,{},n)}},u=Object(r.forwardRef)((function(e,n){var t=e.components,r=e.mdxType,a=e.originalType,c=e.parentName,l=function(e,n){var t={};for(var r in e)Object.prototype.hasOwnProperty.call(e,r)&&-1===n.indexOf(r)&&(t[r]=e[r]);return t}(e,["components","mdxType","originalType","parentName"]),u=i(t),s=r,y=u[c+"."+s]||u[s]||p[s]||a;return t?o.a.createElement(y,Object.assign({},{ref:n},l,{components:t})):o.a.createElement(y,Object.assign({},{ref:n},l))}));function s(e,n){var t=arguments,r=n&&n.mdxType;if("string"==typeof e||r){var a=t.length,i=new Array(a);i[0]=u;var c={};for(var p in n)hasOwnProperty.call(n,p)&&(c[p]=n[p]);c.originalType=e,c[l]="string"==typeof e?e:r,i[1]=c;for(var s=2;s<a;s++)i[s]=t[s];return o.a.createElement.apply(null,i)}return o.a.createElement.apply(null,t)}u.displayName="MDXCreateElement"}}]);