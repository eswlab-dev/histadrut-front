(this["webpackJsonpmonday-integration-quickstart-app"]=this["webpackJsonpmonday-integration-quickstart-app"]||[]).push([[6],{144:function(e,t,n){"use strict";n.r(t);var a=n(22),o=n(21),r=n(2),c=n.n(r),i=n(6),s=n(0),l=n.n(s),u=n(27),d=n(5),m=n(100),v=n.n(m),b=n(24),f=n.n(b),p=n(104);function g(e){var t=e.i,n=e.restriction,o=e.getBoardColumns,r=e.editRestriction,m=e.deleteRestriction,b=e.boardsForDropdown,g=e.onSetRestriction,h=Object(s.useState)([]),E=Object(d.a)(h,2),j=E[0],O=E[1],k=Object(s.useState)({edit:!1,delete:!1,board:!1,columns:!1}),w=Object(d.a)(k,2),N=w[0],y=w[1];Object(s.useEffect)((function(){n&&R()}),[n]);var R=function(){var e=Object(i.a)(c.a.mark((function e(){var t;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,o(n);case 2:t=e.sent,O(t),console.log("getColumns -> columns",t);case 5:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),x=function(e,t){y(Object(a.a)(Object(a.a)({},N),{},Object(u.a)({},e,t)))};return n?l.a.createElement("div",{className:"restriction",key:t},l.a.createElement("label",{className:"restriction-label"},"Board",l.a.createElement(p.a,{className:"restriction-select",options:b,placeholder:"Please choose a board",onChange:function(e){g(t,e,!0,x)},value:n.board,isLoading:null===N||void 0===N?void 0:N.board})),l.a.createElement("label",{className:"restriction-label"},"Columns",l.a.createElement(p.a,{className:"restriction-select",placeholder:"Please choose mandatory columns",onChange:function(e){g(t,e,!1,x)},options:j,value:null===n||void 0===n?void 0:n.columns,isLoading:(null===N||void 0===N?void 0:N.columns)||!(null===j||void 0===j?void 0:j.length),isDisabled:!(null===j||void 0===j?void 0:j.length),isClearable:!0,isMulti:!0})),l.a.createElement("div",{className:"button-div"},l.a.createElement(v.a,{loading:null===N||void 0===N?void 0:N.edit,onClick:function(e){r(t,n,x)}},"Update"),l.a.createElement(v.a,{loading:null===N||void 0===N?void 0:N.delete,kind:v.a.kinds.TERTIARY,color:v.a.colors.NEGATIVE,className:"add-button",onClick:function(e){m(t,x)}},"Delete"))):l.a.createElement("div",{className:"loader-div"},l.a.createElement("div",{className:"loader"},l.a.createElement(f.a,null)))}var h=n(19);function E(e){var t=e.getBoardColumns,n=e.account,r=e.boardsForDropdown,u=e.restrictions,d=e.setRestrictions,m=e.validateNewRestriction,v=e.getRestrictions,b=e.monday;Object(s.useEffect)((function(){n&&v()}),[n]);var f=function(){var e=Object(i.a)(c.a.mark((function e(t,a,o){var r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(o("edit",!0),!m(a)){e.next=9;break}return e.next=4,h.c(a,n);case 4:r=e.sent.data,u[t]=r,d(u),e.next=10;break;case 9:b.execute("notice",{message:"Please choose columns to restrict by!",type:"error",timeout:1e4});case 10:o("edit",!1);case 11:case"end":return e.stop()}}),e)})));return function(t,n,a){return e.apply(this,arguments)}}(),p=function(e,t,n,r){if(n){r("board",!0);var c=u;c[e]={board:t,columns:[]},d(Object(o.a)(c)),r("board",!1)}else{r("columns",!0);var i=u;i[e]=Object(a.a)(Object(a.a)({},u[e]),{},{columns:t}),d(Object(o.a)(i)),r("columns",!1)}},E=function(){var e=Object(i.a)(c.a.mark((function e(t,n){var a,r;return c.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return n("delete",!0),a=u[t],e.next=4,h.b(a);case 4:e.sent,r=u.filter((function(e){return e._id!==a._id})),n("delete",!1),d(Object(o.a)(r));case 8:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}();return l.a.createElement("div",{className:"existing-restrictions"},null===u||void 0===u?void 0:u.map((function(e,n){return l.a.createElement(g,{key:n,i:n,restriction:e,getBoardColumns:t,editRestriction:f,deleteRestriction:E,boardsForDropdown:r,onSetRestriction:p})})))}n.d(t,"default",(function(){return E}))}}]);
//# sourceMappingURL=6.7546c6b7.chunk.js.map