(this["webpackJsonpmonday-integration-quickstart-app"]=this["webpackJsonpmonday-integration-quickstart-app"]||[]).push([[0],{119:function(e,t,n){"use strict";n.r(t);var a=n(0),r=n.n(a),c=n(14),o=n.n(c),s=(n(51),n(18)),i=n(3),u=n.n(i),l=n(13),d=n(8),f=n(6),p=n(5),b=(n(53),n(44)),m=n.n(b),v=(n(68),n(16)),g=n.n(v),A="https://2db0-2a10-800b-3039-0-3459-b209-19bd-7a57.eu.ngrok.io";function E(e){return h.apply(this,arguments)}function h(){return(h=Object(f.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=y(t),console.log("addBoardRestriction -> filteredRestriction",n),e.next=4,g.a.post("".concat(A,"/restriction/board"),n);case 4:return a=e.sent,e.abrupt("return",a.data);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function O(e){return j.apply(this,arguments)}function j(){return(j=Object(f.a)(u.a.mark((function e(t){var n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,g.a.get("".concat(A,"/restriction/account/").concat(t));case 2:return n=e.sent,e.abrupt("return",n.data);case 4:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function x(e,t){return w.apply(this,arguments)}function w(){return(w=Object(f.a)(u.a.mark((function e(t,n){var a,r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.account=n,a=y(t),console.log("editRestriction -> filteredRestriction",a),console.log("editRestriction -> restriction",t),e.next=6,g.a.put("".concat(A,"/restriction/board"),a);case 6:return r=e.sent,console.log("editRestriction -> edited",r),e.abrupt("return",r);case 9:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function C(e){return N.apply(this,arguments)}function N(){return(N=Object(f.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n=t._id,e.next=3,g.a.delete("".concat(A,"/restriction/board/").concat(n));case 3:return a=e.sent,console.log("deleteRestriction -> deleted",a),e.abrupt("return",a);case 6:case"end":return e.stop()}}),e)})))).apply(this,arguments)}function y(e){var t={accountId:e.accountId||e.account,boardId:Number(e.board.value),columnIds:e.columns.map((function(e){return e.value})),_id:e._id};return console.log("filterRestriction -> filteredRestriction",t),t}var k=n(9),R=n.n(k),B=n(12);function D(e){e.monday;var t=e.boardsForDropdown,n=e.addNewRestriction,c=e.getBoardColumns,o=Object(a.useState)(),s=Object(p.a)(o,2),i=s[0],l=s[1],b=Object(a.useState)(!1),m=Object(p.a)(b,2),v=m[0],g=(m[1],Object(a.useState)({board:{value:null,label:null},columns:[]})),A=Object(p.a)(g,2),E=A[0],h=A[1];Object(a.useEffect)((function(){O()}),[E.board]);var O=function(){var e=Object(f.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(E);case 2:t=e.sent,l(t);case 4:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),j=function(e,t){h(e?Object(d.a)(Object(d.a)({},E),{},{board:t}):Object(d.a)(Object(d.a)({},E),{},{columns:t}))},x=Object(a.useMemo)((function(){if(i)return i.map((function(e){return{label:e.title,value:e.id}}))}),[i]);return r.a.createElement("div",{className:"create-restriction"},r.a.createElement(B.a,{className:"restriction-select",options:t,onChange:function(e){return j(!0,e)},value:E.board}),r.a.createElement(B.a,{className:"restriction-select",onChange:function(e){return j(!1,e)},options:x,isClearable:!0,isMulti:!0}),r.a.createElement("div",{className:"button-div"},r.a.createElement(R.a,{size:R.a.sizes.LARGE,loading:v,onClick:function(e){n(E)}},"Create")))}var I=n(11),S=n(2);function T(e){var t=e.currentNav,n=e.setCurrentNav,a=Object(S.f)();return r.a.createElement("nav",{className:"navbar"},r.a.createElement(I.b,{className:"nav-link ".concat("create"===t?"current-nav":""),to:"/create",onClick:function(e){n("create"),a("/create")}},"Create"),r.a.createElement(I.b,{className:"nav-link ".concat("existing"===t?"current-nav":""),to:"/",onClick:function(e){n("existing"),a("/")}},"Existing"))}var J=n(19);function W(e){var t=e.i,n=e.restriction,c=e.getBoardColumns,o=e.editRestriction,s=e.deleteRestriction,i=e.boardsForDropdown,l=e.onSetRestriction,d=e.isLoading,b=Object(a.useState)([]),m=Object(p.a)(b,2),v=m[0],g=m[1];Object(a.useEffect)((function(){console.log("change"),n&&A()}),[n]);var A=function(){var e=Object(f.a)(u.a.mark((function e(){var t;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,c(n);case 2:t=e.sent,g(t),console.log("getColumns -> columns",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return n?r.a.createElement("div",{className:"restriction",key:t},r.a.createElement(B.a,{className:"restriction-select",options:i,onChange:function(e){return l(t,e,!0)},value:n.board}),r.a.createElement(B.a,{className:"restriction-select",onChange:function(e){return l(t,e,!1)},options:v,value:n.columns,isClearable:!0,isMulti:!0}),r.a.createElement("div",{className:"button-div"},r.a.createElement(R.a,{loading:null===d||void 0===d?void 0:d.edit,onClick:function(e){o(t,n)}},"Update"),r.a.createElement(R.a,{loading:null===d||void 0===d?void 0:d.delete,kind:R.a.kinds.TERTIARY,color:R.a.colors.NEGATIVE,className:"add-button",onClick:function(e){s(t)}},"Delete"))):r.a.createElement("div",null,"loading.. LOADER!.")}function q(e){var t=e.getBoardColumns,n=e.account,c=e.getRestrictionLabels,o=e.boardsForDropdown,s=e.restrictions,i=e.setRestrictions,b=Object(a.useState)([]),m=Object(p.a)(b,2),v=m[0],g=m[1];Object(a.useEffect)((function(){n&&j()}),[n]),Object(a.useEffect)((function(){v.length||g(Array.from(s,(function(e){return{edit:!1,delete:!1}})))}),[s]);var A=function(e,t,n){var a=v;a[e]=Object(d.a)(Object(d.a)({},a),{},Object(J.a)({},t,n)),g(a)},E=function(){var e=Object(f.a)(u.a.mark((function e(t,a){var r;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(t,"edit",!0),e.next=3,x(a,n);case 3:r=e.sent.data,s[t]=r,i(s),A(t,"edit",!1);case 7:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}(),h=function(e,t,n){if(n){var a=s;a[e]={board:t,columns:[]},i(Object(l.a)(a))}else{var r=s;r[e]=Object(d.a)(Object(d.a)({},s[e]),{},{columns:t}),i(Object(l.a)(r))}},j=function(){var e=Object(f.a)(u.a.mark((function e(){var t,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,O(n);case 2:return t=e.sent,e.next=5,Promise.all(t);case 5:return t=e.sent,e.next=8,c(t);case 8:a=e.sent,i(a);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),w=function(){var e=Object(f.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(t,"delete",!0),n=s[t],e.next=4,C(n);case 4:e.sent,a=s.filter((function(e){return e._id!==n._id})),A(t,"delete",!1),i(Object(l.a)(a));case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}();return r.a.createElement("div",{className:"existing-restrictions"},null===s||void 0===s?void 0:s.map((function(e,n){return r.a.createElement(W,{key:n,i:n,restriction:e,getBoardColumns:t,editRestriction:E,deleteRestriction:w,boardsForDropdown:o,onSetRestriction:h,isLoading:v[n]})})))}var M=n(45),Q=n.n(M);function z(e){e.isEnterprise;return r.a.createElement("div",{className:"footer"},r.a.createElement("a",{href:"https://www.eswlab.com/",className:"logo",target:"_blank",rel:"noopener noreferrer"},r.a.createElement("img",{className:"esl-logo-img",src:Q.a,alt:"logo"})),r.a.createElement("span",{className:"contact-us-p"},"Contact us:"," ",r.a.createElement("a",{href:"mailto:appsupport@eswlab.com"},"appsupport@eswlab.com")))}var H=m()();function Y(){var e=Object(a.useState)([]),t=Object(p.a)(e,2),n=t[0],c=t[1];console.log("App -> boards",n);var o=Object(a.useState)(),i=Object(p.a)(o,2),b=i[0],m=i[1],v=Object(a.useState)("existing"),g=Object(p.a)(v,2),A=g[0],h=g[1],O=Object(a.useState)([]),j=Object(p.a)(O,2),x=j[0],w=j[1];console.log("App -> existingRestrictions",x),Object(a.useEffect)((function(){k(),console.log("\u05d0\u05d4\u05d5\u05d1 \u05d0\u05ea \u05d4\u05de\u05dc\u05d0\u05db\u05d4")}),[]),Object(a.useEffect)((function(){var e=null===n||void 0===n?void 0:n.filter((function(e){return!x.find((function(t){return Number(t.board.value)===Number(e.id)}))}));console.log("useEffect -> filteredBoards",e.length),console.log("useEffect -> existingRestrictions",x.length),console.log("useEffect -> boards",n.length),c(e)}),[x]);var C=function(){var e=Object(f.a)(u.a.mark((function e(t){var n,a;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t.columns.map((function(e){return e.value})),n=Object(d.a)({accountId:b},t),e.next=4,E(n);case 4:return a=e.sent,e.next=7,y(Object(l.a)(a));case 7:e.sent;case 8:case"end":return e.stop()}}),e)})));return function(t){return e.apply(this,arguments)}}(),N=function(){var e=Object(f.a)(u.a.mark((function e(t){var n,a,r,c,o;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(e.prev=0,n=t.board,console.log("getBoardColumns -> board",n),!(null===n||void 0===n?void 0:n.value)){e.next=13;break}return a="query{\n          boards(ids:".concat(n.value,"){\n            columns{\n              id\n              type\n              title\n            }\n          }\n        }"),e.next=7,H.api(a);case 7:return r=e.sent,c=r.data.boards[0].columns,o=c.filter((function(e){return"Name"!==e.title})).map((function(e){return{value:e.id,label:e.title}})),e.abrupt("return",o);case 13:e.next=18;break;case 15:e.prev=15,e.t0=e.catch(0),console.log("getBoardColumns -> err",e.t0);case 18:case"end":return e.stop()}}),e,null,[[0,15]])})));return function(t){return e.apply(this,arguments)}}(),y=function(){var e=Object(f.a)(u.a.mark((function e(t){var n,a,r,c,o,i,l,d;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:e.prev=0,n=[],a=Object(s.a)(t),e.prev=3,a.s();case 5:if((r=a.n()).done){e.next=17;break}return c=r.value,o="query{\n          boards(ids:".concat(c.boardId||c.board.value,"){\n            name\n            columns(ids:").concat(JSON.stringify(c.columnIds),"){\n              id\n              type\n              title\n            }\n          }\n        }"),e.next=10,H.api(o);case 10:i=e.sent,console.log("getRestrictionLabels -> res",i),l=i.data.boards[0].name,d=i.data.boards[0].columns.map((function(e){return{value:e.id,label:e.title}})),n.push({board:{value:Number(c.boardId),label:l},columns:d,_id:c._id});case 15:e.next=5;break;case 17:e.next=22;break;case 19:e.prev=19,e.t0=e.catch(3),a.e(e.t0);case 22:return e.prev=22,a.f(),e.finish(22);case 25:return e.abrupt("return",n);case 28:e.prev=28,e.t1=e.catch(0),console.log("getRestrictionLabels -> error",e.t1);case 31:case"end":return e.stop()}}),e,null,[[0,28],[3,19,22,25]])})));return function(t){return e.apply(this,arguments)}}(),k=function(){var e=Object(f.a)(u.a.mark((function e(){var t,n;return u.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return"query{\n      account{\n        id\n      }\n      boards{\n        name\n        id\n      }\n    }",e.next=3,H.api("query{\n      account{\n        id\n      }\n      boards{\n        name\n        id\n      }\n    }");case 3:t=e.sent,m(Number(t.data.account.id)),n=t.data.boards,c(n);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),R=Object(a.useMemo)((function(){if(null===n||void 0===n?void 0:n.length)return n.map((function(e){return{label:e.name,value:e.id}}))}),[n]);return r.a.createElement("div",{className:"App"},r.a.createElement(I.a,null,r.a.createElement(T,{currentNav:A,setCurrentNav:h}),r.a.createElement(S.c,null,r.a.createElement(S.a,{path:"/create",element:r.a.createElement(D,{boardsForDropdown:R,boards:n,monday:H,addNewRestriction:C,getBoardColumns:N})}),r.a.createElement(S.a,{path:"/",element:r.a.createElement(q,{boardsForDropdown:R,getBoardColumns:N,getRestrictionLabels:y,account:b,restrictions:x,setRestrictions:w})})),r.a.createElement(z,null)))}Boolean("localhost"===window.location.hostname||"[::1]"===window.location.hostname||window.location.hostname.match(/^127(?:\.(?:25[0-5]|2[0-4][0-9]|[01]?[0-9][0-9]?)){3}$/));o.a.render(r.a.createElement(Y,null),document.getElementById("root")),"serviceWorker"in navigator&&navigator.serviceWorker.ready.then((function(e){e.unregister()})).catch((function(e){console.error(e.message)}))},45:function(e,t){e.exports="data:image/png;base64,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"},46:function(e,t,n){e.exports=n(119)},51:function(e,t,n){},53:function(e,t,n){}},[[46,1,2]]]);
//# sourceMappingURL=main.208c1aa4.chunk.js.map