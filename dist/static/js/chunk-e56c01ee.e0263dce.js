(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-e56c01ee"],{"1c64":function(t,e,a){},"1cc6":function(t,e,a){"use strict";var n=a("1c64"),i=a.n(n);i.a},"1d49":function(t,e,a){"use strict";a.r(e);var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"app-container"},[a("el-row",{staticClass:"filter-container",attrs:{gutter:10}},[a("el-col",{attrs:{sm:5}},[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",size:"small"},on:{click:t.handleCreate}},[t._v("\n        添加banner\n      ")])],1)],1),t._v(" "),a("div",{staticClass:"table-container"},[a("el-table",{directives:[{name:"loading",rawName:"v-loading",value:t.listLoading,expression:"listLoading"}],staticStyle:{"font-size":"14px"},attrs:{data:t.list,border:"",fit:"","highlight-current-row":"",size:"mini"}},[a("el-table-column",{attrs:{label:"banner名称",width:"210"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",{staticClass:"link-type",on:{click:function(e){return t.handleUpdate(n)}}},[t._v(t._s(n.name))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"发布时间",width:"160"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("span",[t._v(t._s(n.created_at))])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"状态",width:"100"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("el-tag",{attrs:{type:1==n.status?"":"danger",size:"small"}},[a("span",[t._v(t._s(1==n.status?"上架中":"已下架"))])])]}}])}),t._v(" "),a("el-table-column",{attrs:{label:"操作",fixed:"right","min-width":"260","class-name":"small-padding fixed-width"},scopedSlots:t._u([{key:"default",fn:function(e){var n=e.row;return[a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{type:"primary",size:"mini"},on:{click:function(e){return t.handleUpdate(n)}}},[t._v("\n            编辑\n          ")]),t._v(" "),1==n.status?a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"warning"},on:{click:function(e){return t.handleChangeStatus(n,2)}}},[t._v("\n            禁用\n          ")]):a("el-button",{directives:[{name:"waves",rawName:"v-waves"}],attrs:{size:"mini",type:"success"},on:{click:function(e){return t.handleChangeStatus(n,1)}}},[t._v("\n            启用\n          ")])]}}])})],1)],1),t._v(" "),a("el-dialog",{attrs:{title:"编辑banner",width:"700px",visible:t.dialogFormVisible},on:{"update:visible":function(e){t.dialogFormVisible=e}}},[a("el-form",{ref:"dataForm",staticStyle:{width:"550px","margin-left":"50px"},attrs:{model:t.temp,"label-position":"left","label-width":"120px"}},[a("el-form-item",{attrs:{label:"banner名称"}},[a("el-input",{attrs:{placeholder:"请填写banner名称"},model:{value:t.temp.name,callback:function(e){t.$set(t.temp,"name",e)},expression:"temp.name"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"banner图"}},[a("el-upload",{staticClass:"avatar-uploader",attrs:{action:t.uploadUrl,"show-file-list":!1,"on-success":t.handleUploadSuccess,"before-upload":t.beforeUpload},model:{value:t.temp.thumb,callback:function(e){t.$set(t.temp,"thumb",e)},expression:"temp.thumb"}},[t.temp.thumb?a("img",{staticClass:"avatar",attrs:{src:t.temp.thumb}}):a("i",{staticClass:"el-icon-plus avatar-uploader-icon"})])],1),t._v(" "),a("el-form-item",{attrs:{label:"url"}},[a("el-input",{attrs:{placeholder:"请填写url"},model:{value:t.temp.url,callback:function(e){t.$set(t.temp,"url",e)},expression:"temp.url"}})],1),t._v(" "),a("el-form-item",{attrs:{label:"状态"}},[a("div",[a("el-radio",{attrs:{label:"1",border:"",size:"medium"},model:{value:t.temp.status,callback:function(e){t.$set(t.temp,"status",e)},expression:"temp.status"}},[t._v("启用")]),t._v(" "),a("el-radio",{attrs:{label:"2",border:"",size:"medium"},model:{value:t.temp.status,callback:function(e){t.$set(t.temp,"status",e)},expression:"temp.status"}},[t._v("禁用")])],1)])],1),t._v(" "),a("div",{staticClass:"dialog-footer",attrs:{slot:"footer",align:"center"},slot:"footer"},[a("el-button",{on:{click:function(e){t.dialogFormVisible=!1}}},[t._v("\n        取消\n      ")]),t._v(" "),a("el-button",{attrs:{type:"primary"},on:{click:function(e){return t.updateData()}}},[t._v("\n        确认\n      ")])],1)],1),t._v(" "),a("pagination",{directives:[{name:"show",rawName:"v-show",value:t.total>0,expression:"total>0"}],attrs:{total:t.total,page:t.listQuery.page,limit:t.listQuery.limit},on:{"update:page":function(e){return t.$set(t.listQuery,"page",e)},"update:limit":function(e){return t.$set(t.listQuery,"limit",e)},pagination:t.getList}})],1)},i=[],r=a("b775"),o="/banner";function s(t){return Object(r["a"])({url:o+"/index",method:"get",params:t})}function l(t){return Object(r["a"])({url:o+"/edit",method:"post",data:t})}function u(t){return Object(r["a"])({url:o+"/create",method:"post",data:t})}function c(t){return Object(r["a"])({url:o+"/change-status",method:"post",data:t})}var d=a("6724"),p=a("333d"),f={components:{Pagination:p["a"]},directives:{waves:d["a"]},data:function(){return{list:[],total:0,listLoading:!0,listQuery:{page:1,limit:10,sort:"-id"},dialogFormVisible:!1,temp:{},uploadUrl:"https://www.5aizhuanqian.com/admin/system/upload"}},created:function(){this.getList()},methods:{handleUploadSuccess:function(t){this.temp.thumb=t.data.preview_url},beforeUpload:function(){},handleCreate:function(){this.resetTemp(),this.dialogStatus="create",this.dialogFormVisible=!0,this.$nextTick(function(){})},handleUpdate:function(t){this.temp=Object.assign({},t),this.temp.status=1===this.temp.status?"1":"2",this.dialogStatus="update",this.dialogFormVisible=!0,this.$nextTick(function(){})},updateData:function(){var t=this;this.$refs["dataForm"].validate(function(e){e&&(t.temp.id>0?l(t.temp).then(function(e){t.getList(),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"修改banner信息成功",type:"success",duration:2e3})}):u(t.temp).then(function(e){t.getList(),t.dialogFormVisible=!1,t.$notify({title:"成功",message:"新建banner成功",type:"success",duration:2e3})}))})},handlePreview:function(t){this.previewImageUrl=t,this.previewVisible=!0},resetTemp:function(){this.temp={id:0,status:"1"}},getList:function(){var t=this;this.listLoading=!0,s(this.listQuery).then(function(e){t.list=e.data.list,t.total=e.data.total,t.listLoading=!1})},handleChangeStatus:function(t,e){var a=this,n=1===e?"banner启用成功":"banner禁用成功";c({id:t.id,status:e}).then(function(t){a.$notify({title:"成功",message:n,type:"success",duration:2e3}),a.getList()})}}},m=f,h=(a("bd25"),a("2877")),v=Object(h["a"])(m,n,i,!1,null,null,null);e["default"]=v.exports},"333d":function(t,e,a){"use strict";var n=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"pagination-container",class:{hidden:t.hidden}},[a("el-pagination",t._b({attrs:{background:t.background,"current-page":t.currentPage,"page-size":t.pageSize,layout:t.layout,"page-sizes":t.pageSizes,total:t.total},on:{"update:currentPage":function(e){t.currentPage=e},"update:current-page":function(e){t.currentPage=e},"update:pageSize":function(e){t.pageSize=e},"update:page-size":function(e){t.pageSize=e},"size-change":t.handleSizeChange,"current-change":t.handleCurrentChange}},"el-pagination",t.$attrs,!1))],1)},i=[];a("c5f6");Math.easeInOutQuad=function(t,e,a,n){return t/=n/2,t<1?a/2*t*t+e:(t--,-a/2*(t*(t-2)-1)+e)};var r=function(){return window.requestAnimationFrame||window.webkitRequestAnimationFrame||window.mozRequestAnimationFrame||function(t){window.setTimeout(t,1e3/60)}}();function o(t){document.documentElement.scrollTop=t,document.body.parentNode.scrollTop=t,document.body.scrollTop=t}function s(){return document.documentElement.scrollTop||document.body.parentNode.scrollTop||document.body.scrollTop}function l(t,e,a){var n=s(),i=t-n,l=20,u=0;e="undefined"===typeof e?500:e;var c=function t(){u+=l;var s=Math.easeInOutQuad(u,n,i,e);o(s),u<e?r(t):a&&"function"===typeof a&&a()};c()}var u={name:"Pagination",props:{total:{required:!0,type:Number},page:{type:Number,default:1},limit:{type:Number,default:20},pageSizes:{type:Array,default:function(){return[10,20,30,50]}},layout:{type:String,default:"total, sizes, prev, pager, next, jumper"},background:{type:Boolean,default:!0},autoScroll:{type:Boolean,default:!0},hidden:{type:Boolean,default:!1}},computed:{currentPage:{get:function(){return this.page},set:function(t){this.$emit("update:page",t)}},pageSize:{get:function(){return this.limit},set:function(t){this.$emit("update:limit",t)}}},methods:{handleSizeChange:function(t){this.$emit("pagination",{page:this.currentPage,limit:t}),this.autoScroll&&l(0,800)},handleCurrentChange:function(t){this.$emit("pagination",{page:t,limit:this.pageSize}),this.autoScroll&&l(0,800)}}},c=u,d=(a("1cc6"),a("2877")),p=Object(d["a"])(c,n,i,!1,null,"f3b72548",null);e["a"]=p.exports},"4a61":function(t,e,a){},"5dbc":function(t,e,a){var n=a("d3f4"),i=a("8b97").set;t.exports=function(t,e,a){var r,o=e.constructor;return o!==a&&"function"==typeof o&&(r=o.prototype)!==a.prototype&&n(r)&&i&&i(t,r),t}},6724:function(t,e,a){"use strict";a("8d41");var n="@@wavesContext";function i(t,e){function a(a){var n=Object.assign({},e.value),i=Object.assign({ele:t,type:"hit",color:"rgba(0, 0, 0, 0.15)"},n),r=i.ele;if(r){r.style.position="relative",r.style.overflow="hidden";var o=r.getBoundingClientRect(),s=r.querySelector(".waves-ripple");switch(s?s.className="waves-ripple":(s=document.createElement("span"),s.className="waves-ripple",s.style.height=s.style.width=Math.max(o.width,o.height)+"px",r.appendChild(s)),i.type){case"center":s.style.top=o.height/2-s.offsetHeight/2+"px",s.style.left=o.width/2-s.offsetWidth/2+"px";break;default:s.style.top=(a.pageY-o.top-s.offsetHeight/2-document.documentElement.scrollTop||document.body.scrollTop)+"px",s.style.left=(a.pageX-o.left-s.offsetWidth/2-document.documentElement.scrollLeft||document.body.scrollLeft)+"px"}return s.style.backgroundColor=i.color,s.className="waves-ripple z-active",!1}}return t[n]?t[n].removeHandle=a:t[n]={removeHandle:a},a}var r={bind:function(t,e){t.addEventListener("click",i(t,e),!1)},update:function(t,e){t.removeEventListener("click",t[n].removeHandle,!1),t.addEventListener("click",i(t,e),!1)},unbind:function(t){t.removeEventListener("click",t[n].removeHandle,!1),t[n]=null,delete t[n]}},o=function(t){t.directive("waves",r)};window.Vue&&(window.waves=r,Vue.use(o)),r.install=o;e["a"]=r},"8b97":function(t,e,a){var n=a("d3f4"),i=a("cb7c"),r=function(t,e){if(i(t),!n(e)&&null!==e)throw TypeError(e+": can't set as prototype!")};t.exports={set:Object.setPrototypeOf||("__proto__"in{}?function(t,e,n){try{n=a("9b43")(Function.call,a("11e9").f(Object.prototype,"__proto__").set,2),n(t,[]),e=!(t instanceof Array)}catch(i){e=!0}return function(t,a){return r(t,a),e?t.__proto__=a:n(t,a),t}}({},!1):void 0),check:r}},"8d41":function(t,e,a){},aa77:function(t,e,a){var n=a("5ca1"),i=a("be13"),r=a("79e5"),o=a("fdef"),s="["+o+"]",l="​",u=RegExp("^"+s+s+"*"),c=RegExp(s+s+"*$"),d=function(t,e,a){var i={},s=r(function(){return!!o[t]()||l[t]()!=l}),u=i[t]=s?e(p):o[t];a&&(i[a]=u),n(n.P+n.F*s,"String",i)},p=d.trim=function(t,e){return t=String(i(t)),1&e&&(t=t.replace(u,"")),2&e&&(t=t.replace(c,"")),t};t.exports=d},bd25:function(t,e,a){"use strict";var n=a("4a61"),i=a.n(n);i.a},c5f6:function(t,e,a){"use strict";var n=a("7726"),i=a("69a8"),r=a("2d95"),o=a("5dbc"),s=a("6a99"),l=a("79e5"),u=a("9093").f,c=a("11e9").f,d=a("86cc").f,p=a("aa77").trim,f="Number",m=n[f],h=m,v=m.prototype,g=r(a("2aeb")(v))==f,b="trim"in String.prototype,w=function(t){var e=s(t,!1);if("string"==typeof e&&e.length>2){e=b?e.trim():p(e,3);var a,n,i,r=e.charCodeAt(0);if(43===r||45===r){if(a=e.charCodeAt(2),88===a||120===a)return NaN}else if(48===r){switch(e.charCodeAt(1)){case 66:case 98:n=2,i=49;break;case 79:case 111:n=8,i=55;break;default:return+e}for(var o,l=e.slice(2),u=0,c=l.length;u<c;u++)if(o=l.charCodeAt(u),o<48||o>i)return NaN;return parseInt(l,n)}}return+e};if(!m(" 0o1")||!m("0b1")||m("+0x1")){m=function(t){var e=arguments.length<1?0:t,a=this;return a instanceof m&&(g?l(function(){v.valueOf.call(a)}):r(a)!=f)?o(new h(w(e)),a,m):w(e)};for(var y,_=a("9e1e")?u(h):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),S=0;_.length>S;S++)i(h,y=_[S])&&!i(m,y)&&d(m,y,c(h,y));m.prototype=v,v.constructor=m,a("2aba")(n,f,m)}},fdef:function(t,e){t.exports="\t\n\v\f\r   ᠎             　\u2028\u2029\ufeff"}}]);