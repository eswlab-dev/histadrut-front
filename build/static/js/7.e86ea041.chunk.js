(this["webpackJsonpmonday-integration-quickstart-app"]=this["webpackJsonpmonday-integration-quickstart-app"]||[]).push([[7],{141:function(e,a,t){"use strict";t.r(a),t.d(a,"default",(function(){return h}));var o=t(2),n=t.n(o),l=t(23),r=t(6),c=t(5),s=t(0),i=t.n(s),u=t(100),d=t.n(u),b=(t(19),t(104)),m=t(24),p=t.n(m),v=t(21),g=t.n(v);function h(e){var a,t,o,u=e.monday,m=e.boardsForDropdown,v=e.addNewRestriction,h=e.getBoardColumnsAndGroups,f=e.validateNewRestriction,O=e.slug;console.log("slug",O);var j=Object(s.useState)(),C=Object(c.a)(j,2),E=C[0],N=C[1],k=Object(s.useState)(),w=Object(c.a)(k,2),y=w[0],x=w[1],S=Object(s.useState)({board:!1,column:!1,group:!1,button:!1}),G=Object(c.a)(S,2),L=G[0],A=G[1],D=Object(s.useState)({board:{value:null,label:"Choose a board to restrict"},group:{value:null,label:"Choose a group to restrict"},columns:[]}),R=Object(c.a)(D,2),q=R[0],z=R[1];Object(s.useEffect)((function(){null!==q.board.value&&B()}),[q.board]);var B=function(){var e=Object(r.a)(n.a.mark((function e(){var a,t,o,r;return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return A(Object(l.a)(Object(l.a)({},L),{},{column:!0,group:!0})),e.next=3,h(q);case 3:a=e.sent,t=a.columns,o=a.groups,console.log("onSetColumnsAndGroups ->  columns, groups",t,o),(null===t||void 0===t?void 0:t.length)||(g.a.fire({title:"Oops!",html:'<p>It looks like you dont have any columns in <a href="https://'.concat(O,".monday.com/boards/").concat(q.board.value,'" target="_blank">').concat(null===q||void 0===q||null===(r=q.board)||void 0===r?void 0:r.label,"</a>!</p> <p> Please choose a different board, or add columns on that board.</p>"),icon:"error"}),P()),A(Object(l.a)(Object(l.a)({},L),{},{column:!1})),N(t),x(o);case 11:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),J=function(){var e=Object(r.a)(n.a.mark((function e(){return n.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!f(q,!0)){e.next=9;break}return A(Object(l.a)(Object(l.a)({},L),{},{button:!0})),e.next=4,v(q);case 4:A(Object(l.a)(Object(l.a)({},L),{},{button:!1})),P(),u.execute("notice",{message:"congrats! New restriction was created at ".concat(q.board.label,"!"),type:"success",timeout:1e4}),e.next=10;break;case 9:console.log("not valid");case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),P=function(){z({board:{value:null,label:"Choose a board to restrict"},group:{value:null,label:"Choose a group to restrict"},columns:[]})},F=function(e,a){"board"===e?z(Object(l.a)(Object(l.a)({},q),{},{board:a})):"group"===e?z(Object(l.a)(Object(l.a)({},q),{},{group:a})):"column"===e&&z(Object(l.a)(Object(l.a)({},q),{},{columns:a}))};return i.a.createElement("div",{className:"create-restriction"},i.a.createElement("div",{className:"selects"},i.a.createElement("label",{className:"restriction-label"},"Board",L.board?i.a.createElement("div",{className:"small-loader"},i.a.createElement(p.a,null)):i.a.createElement(b.a,{isLoading:L.board,placeholder:"Choose board to restrict",className:"restriction-select",options:m,onChange:function(e){return F("board",e)},value:q.board})),i.a.createElement("label",{className:"restriction-label"},"Groups",i.a.createElement(b.a,{isLoading:L.group,placeholder:"Choose board to restrict",className:"restriction-select",isDisabled:!(null===y||void 0===y?void 0:y.length),options:y,onChange:function(e){return F("group",e)},value:q.group})),i.a.createElement("label",{className:"restriction-label",title:(null===E||void 0===E?void 0:E.length)?"":"Please choose a board first!"},"Columns",i.a.createElement(b.a,{placeholder:"Choose column to restrict",className:"restriction-select",onChange:function(e){return F("column",e)},options:E,isDisabled:!(null===E||void 0===E?void 0:E.length),value:null===q||void 0===q?void 0:q.columns,isClearable:!0,isMulti:!0,isLoading:L.column}))),i.a.createElement("div",{className:"button-div"},i.a.createElement(d.a,{size:d.a.sizes.LARGE,loading:L.button,onClick:function(e){J(q)},disabled:!(null===q||void 0===q||null===(a=q.board)||void 0===a?void 0:a.label)||!(null===q||void 0===q||null===(t=q.board)||void 0===t?void 0:t.value)||!(null===q||void 0===q||null===(o=q.columns)||void 0===o?void 0:o.length)},"Create")))}}}]);
//# sourceMappingURL=7.e86ea041.chunk.js.map