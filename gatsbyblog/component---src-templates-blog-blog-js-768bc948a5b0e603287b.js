(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{139:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),i=a(151),c=a.n(i),u=a(143),l=a(150),o=(a(163),function(e){var t=e.title,a=e.date;return r.a.createElement("div",{className:"post-header"},r.a.createElement(u.a,null,r.a.createElement("h1",{className:"post-header__title"},t),r.a.createElement("div",{className:"post-header__date"},a)))});a.d(t,"Blog",function(){return s}),a.d(t,"pageQuery",function(){return d});var s=function(e){var t=e.data.markdownRemark,a=t.frontmatter,n=t.html;return r.a.createElement(l.a,null,r.a.createElement(c.a,{title:a.title,meta:[{name:"keywords",content:a.tags.join(",")}]}),r.a.createElement(o,{date:a.date,title:a.title}),r.a.createElement(u.a,null,r.a.createElement("div",{className:"blog-post-content",dangerouslySetInnerHTML:{__html:n}})))},d="3293681788";t.default=s},142:function(e,t,a){"use strict";a.r(t),a.d(t,"graphql",function(){return p}),a.d(t,"StaticQueryContext",function(){return m}),a.d(t,"StaticQuery",function(){return f});var n=a(0),r=a.n(n),i=a(4),c=a.n(i),u=a(141),l=a.n(u);a.d(t,"Link",function(){return l.a}),a.d(t,"withPrefix",function(){return u.withPrefix}),a.d(t,"navigate",function(){return u.navigate}),a.d(t,"push",function(){return u.push}),a.d(t,"replace",function(){return u.replace}),a.d(t,"navigateTo",function(){return u.navigateTo});var o=a(144),s=a.n(o);a.d(t,"PageRenderer",function(){return s.a});var d=a(34);a.d(t,"parsePath",function(){return d.a});var m=r.a.createContext({}),f=function(e){return r.a.createElement(m.Consumer,null,function(t){return e.data||t[e.query]&&t[e.query].data?(e.render||e.children)(e.data?e.data.data:t[e.query].data):r.a.createElement("div",null,"Loading (StaticQuery)")})};function p(){throw new Error("It appears like Gatsby is misconfigured. Gatsby related `graphql` calls are supposed to only be evaluated at compile time, and then compiled away,. Unfortunately, something went wrong and the query was left in the compiled code.\n\n.Unless your site has a complex or custom babel/Gatsby configuration this is likely a bug in Gatsby.")}f.propTypes={data:c.a.object,query:c.a.string.isRequired,render:c.a.func,children:c.a.func}},143:function(e,t,a){"use strict";var n=a(0),r=a.n(n);a(145);t.a=function(e){var t=e.children;return r.a.createElement("div",{className:"container"},t)}},144:function(e,t,a){var n;e.exports=(n=a(147))&&n.default||n},145:function(e,t,a){},146:function(e){e.exports={data:{site:{siteMetadata:{title:"Gatsby Blog 🎉"}}}}},147:function(e,t,a){"use strict";a.r(t);a(35);var n=a(0),r=a.n(n),i=a(4),c=a.n(i),u=a(49),l=a(2),o=function(e){var t=e.location,a=l.default.getResourcesForPathnameSync(t.pathname);return r.a.createElement(u.a,Object.assign({location:t,pageResources:a},a.json))};o.propTypes={location:c.a.shape({pathname:c.a.string.isRequired}).isRequired},t.default=o},148:function(e,t,a){},149:function(e,t,a){},150:function(e,t,a){"use strict";var n=a(146),r=a(0),i=a.n(r),c=a(4),u=a.n(c),l=a(151),o=a.n(l),s=a(142),d=a(143),m=(a(148),function(e){var t=e.siteTitle;return i.a.createElement("header",{className:"header"},i.a.createElement(d.a,null,i.a.createElement("h1",{className:"header__title"},i.a.createElement(s.Link,{className:"header__link",to:"/"},t))))}),f=(a(149),function(e){var t=e.children;return i.a.createElement(s.StaticQuery,{query:"755544856",render:function(e){return i.a.createElement(i.a.Fragment,null,i.a.createElement(o.a,{defaultTitle:e.site.siteMetadata.title,titleTemplate:"%s | "+e.site.siteMetadata.title,meta:[{name:"description",content:"Sample"},{name:"keywords",content:"sample, something"}]},i.a.createElement("html",{lang:"en"})),i.a.createElement(m,{siteTitle:e.site.siteMetadata.title}),t)},data:n})});f.propTypes={children:u.a.node.isRequired};t.a=f},163:function(e,t,a){}}]);
//# sourceMappingURL=component---src-templates-blog-blog-js-768bc948a5b0e603287b.js.map