(this["webpackJsonpdocker-react"]=this["webpackJsonpdocker-react"]||[]).push([[0],{14:function(e,t,n){},15:function(e,t,n){},18:function(e,t,n){"use strict";n.r(t);var a=n(1),c=n.n(a),r=n(4),s=n.n(r),o=(n(14),n.p,n(15),n(3)),i=n.n(o),d=n(5),l=n(6),h=n(7),u=n(9),j=n(8),b=n(0),p=function(e){Object(u.a)(n,e);var t=Object(j.a)(n);function n(e){var a;return Object(l.a)(this,n),(a=t.call(this,e)).headerData=["date","topic","data"],a.state={data:null},a}return Object(h.a)(n,[{key:"componentDidMount",value:function(){var e=Object(d.a)(i.a.mark((function e(){var t,n,a;return i.a.wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return t={method:"GET",headers:{"Content-Type":"application/json"}},console.log("get data from backend"),e.next=4,fetch("http://localhost:8080/kafka/data",t);case 4:return n=e.sent,console.log("response: ",n),e.next=8,n.json();case 8:a=e.sent,console.log("data: ",a),this.setState({data:a});case 11:case"end":return e.stop()}}),e,this)})));return function(){return e.apply(this,arguments)}}()},{key:"render",value:function(){return Object(b.jsx)("header",{className:"main-header visible",children:Object(b.jsx)("div",{children:Object(b.jsxs)("table",{className:"tabel",border:"2",children:[Object(b.jsx)("thead",{className:"theads",onClick:this.sort,children:Object(b.jsx)("tr",{children:this.headerData.map((function(e,t){return Object(b.jsx)("th",{children:e},t)}))})}),Object(b.jsx)("tbody",{children:this.state.data&&this.state.data.map((function(e,t){return console.log("row: ",e),Object(b.jsx)("tr",{children:Object.getOwnPropertyNames(e).map((function(t){return Object(b.jsx)("td",{children:e[t]})}))},t)}))})]})})})}}]),n}(a.Component);var f=function(){return Object(b.jsx)("div",{className:"App",children:Object(b.jsx)("div",{className:"App-header",children:Object(b.jsx)(p,{})})})},O=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,19)).then((function(t){var n=t.getCLS,a=t.getFID,c=t.getFCP,r=t.getLCP,s=t.getTTFB;n(e),a(e),c(e),r(e),s(e)}))};s.a.render(Object(b.jsx)(c.a.StrictMode,{children:Object(b.jsx)(f,{})}),document.getElementById("root")),O()}},[[18,1,2]]]);
//# sourceMappingURL=main.27511b7a.chunk.js.map