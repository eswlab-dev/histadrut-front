(this["webpackJsonpmonday-integration-quickstart-app"]=this["webpackJsonpmonday-integration-quickstart-app"]||[]).push([[7],{141:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return h}));var n=t(2),o=t.n(n),l=t(22),r=t(6),c=t(5),s=t(0),i=t.n(s),u=t(100),d=t.n(u),b=(t(19),t(104)),v=t(24),m=t.n(v),p=t(30),f=t.n(p);function h(e){var a,t,n,u=e.monday,v=e.boardsForDropdown,p=e.addNewRestriction,h=e.getBoardColumns,O=e.validateNewRestriction,j=e.slug;console.log("slug",j);var g=Object(s.useState)(),k=Object(c.a)(g,2),E=k[0],w=k[1],C=Object(s.useState)({board:!1,column:!1,button:!1}),N=Object(c.a)(C,2),y=N[0],x=N[1],L=Object(s.useState)({board:{value:null,label:"Choose a board to restrict"},columns:[]}),R=Object(c.a)(L,2),S=R[0],q=R[1];Object(s.useEffect)((function(){null!==S.board.value&&z()}),[S.board]);var z=function(){var e=Object(r.a)(o.a.mark((function e(){var a,t;return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return x(Object(l.a)(Object(l.a)({},y),{},{column:!0})),e.next=3,h(S);case 3:(null===(a=e.sent)||void 0===a?void 0:a.length)||(f.a.fire({title:"Oops!",html:'<p>It looks like you dont have any columns in <a href="https://'.concat(j,".monday.com/boards/").concat(S.board.value,'" target="_blank">').concat(null===S||void 0===S||null===(t=S.board)||void 0===t?void 0:t.label,"</a>!</p> <p> Please choose a different board, or add columns on that board.</p>"),icon:"error"}),D()),x(Object(l.a)(Object(l.a)({},y),{},{column:!1})),w(a);case 7:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),B=function(){var e=Object(r.a)(o.a.mark((function e(){return o.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!O(S)){e.next=9;break}return x(Object(l.a)(Object(l.a)({},y),{},{button:!0})),e.next=4,p(S);case 4:x(Object(l.a)(Object(l.a)({},y),{},{button:!1})),D(),u.execute("notice",{message:"congrats! New restriction was created at ".concat(S.board.label,"!"),type:"success",timeout:1e4}),e.next=10;break;case 9:console.log("not valid");case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),D=function(){q({board:{value:null,label:"Choose a board to restrict"},columns:[]})},J=function(e,a){q(e?Object(l.a)(Object(l.a)({},S),{},{board:a}):Object(l.a)(Object(l.a)({},S),{},{columns:a}))};return i.a.createElement("div",{className:"create-restriction"},i.a.createElement("div",{className:"selects"},i.a.createElement("label",{className:"restriction-label"},"Board",y.board?i.a.createElement("div",{className:"small-loader"},i.a.createElement(m.a,null)):i.a.createElement(b.a,{isLoading:y.board,placeholder:"Choose board to restrict",className:"restriction-select",options:v,onChange:function(e){return J(!0,e)},value:S.board})),i.a.createElement("label",{className:"restriction-label",title:(null===E||void 0===E?void 0:E.length)?"":"Please choose a board first!"},"Columns",i.a.createElement(b.a,{placeholder:"Choose column to restrict",className:"restriction-select",onChange:function(e){return J(!1,e)},options:E,isDisabled:!(null===E||void 0===E?void 0:E.length),value:null===S||void 0===S?void 0:S.columns,isClearable:!0,isMulti:!0,isLoading:y.column}))),i.a.createElement("div",{className:"button-div"},i.a.createElement(d.a,{size:d.a.sizes.LARGE,loading:y.button,onClick:function(e){B(S)},disabled:!(null===S||void 0===S||null===(a=S.board)||void 0===a?void 0:a.label)||!(null===S||void 0===S||null===(t=S.board)||void 0===t?void 0:t.value)||!(null===S||void 0===S||null===(n=S.columns)||void 0===n?void 0:n.length)},"Create")))}}}]);
//# sourceMappingURL=7.26fd0de0.chunk.js.map