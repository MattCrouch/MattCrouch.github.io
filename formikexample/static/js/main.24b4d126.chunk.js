(window["webpackJsonpformik-tutorial"]=window["webpackJsonpformik-tutorial"]||[]).push([[0],{18:function(e,a,n){e.exports=n(38)},24:function(e,a,n){},35:function(e,a,n){},36:function(e,a,n){},37:function(e,a,n){},38:function(e,a,n){"use strict";n.r(a);var t=n(0),r=n.n(t),o=n(13),l=n.n(o),i=(n(23),n(24),n(9)),c=n.n(i),m=n(14),s=n(3),u=n(6),d=n.n(u);n(35);var v=function(e){var a=e.field,n=e.form,t=e.options;return r.a.createElement("fieldset",{className:"answer-group"},r.a.createElement("legend",null,"Answer"),r.a.createElement("div",{className:d()({"validation-group":!0,error:!!n.errors[a.name]&&n.touched[a.name]})},t.map((function(e){var n=e.label,t=e.value;return r.a.createElement(r.a.Fragment,{key:t},r.a.createElement("input",Object.assign({},a,{id:"answer-".concat(t),name:a.name,type:"radio",value:t})),r.a.createElement("label",{htmlFor:"answer-".concat(t)},n))})),!!n.errors[a.name]&&n.touched[a.name]&&r.a.createElement("div",{className:"error-message"},n.errors[a.name])))},w=(n(36),[{label:"Answer A",value:"a"},{label:"Answer B",value:"b"},{label:"Answer C",value:"c"},{label:"Answer D",value:"d"}]);var p=function(e){var a=e.errors,n=e.isSubmitting,t=e.touched;return r.a.createElement(s.b,{className:"vote"},r.a.createElement("div",{className:"input-group"},r.a.createElement("label",{htmlFor:"name"},"Name"),r.a.createElement("div",{className:d()({"validation-group":!0,error:!!a.name&&t.name})},r.a.createElement(s.a,{autoComplete:"name",id:"name",name:"name",type:"text"}),!!a.name&&t.name&&r.a.createElement("div",{className:"error-message"},a.name))),r.a.createElement(s.a,{component:v,options:w,name:"answer"}),r.a.createElement("input",{disabled:n,type:"submit",value:"Vote now"}))};var E=function(e){var a=e.options,n=function(){var e=Object(m.a)(c.a.mark((function e(a,n){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t=n.setSubmitting,console.log("submitting..."),e.next=4,new Promise((function(e){return setTimeout(e,1e3)}));case 4:t(!1),console.log(a);case 6:case"end":return e.stop()}}),e)})));return function(a,n){return e.apply(this,arguments)}}();return r.a.createElement(s.c,{initialValues:{name:"",answer:""},onSubmit:n,render:function(e){return r.a.createElement(p,Object.assign({},e,{options:a}))},validate:function(e){var a={};return""===e.name&&(a.name="Name is required"),""===e.answer&&(a.answer="Answer is required"),a}})};n(37);var f=function(){return r.a.createElement(r.a.Fragment,null,r.a.createElement("header",null,r.a.createElement("div",{className:"container"},r.a.createElement("h1",null,"Submit your answer"))),r.a.createElement("div",{className:"container"},r.a.createElement("section",{className:"vote-container"},r.a.createElement(E,null))))};Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));l.a.render(r.a.createElement(f,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()}))}},[[18,1,2]]]);
//# sourceMappingURL=main.24b4d126.chunk.js.map