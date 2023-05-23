/*! For license information please see chunk.101.e270f98687d8b59aecd1.js.LICENSE.txt */
(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[101],{6319:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{Exception:()=>o,PrintVisitor:()=>E,Visitor:()=>d,WhitespaceControl:()=>v,parse:()=>N,parseWithoutProcessing:()=>P,parser:()=>y,print:()=>b})
var n={}
r.r(n),r.d(n,{SourceLocation:()=>T,id:()=>A,prepareBlock:()=>L,prepareMustache:()=>x,preparePartialBlock:()=>I,preparePath:()=>S,prepareProgram:()=>R,prepareRawBlock:()=>C,stripComment:()=>k,stripFlags:()=>D})
var i=["description","fileName","lineNumber","endLineNumber","message","name","number","stack"]
function a(e,t){var r,n,o,s,u=t&&t.loc
u&&(r=u.start.line,n=u.end.line,o=u.start.column,s=u.end.column,e+=" - "+r+":"+o)
for(var l=Error.prototype.constructor.call(this,e),c=0;c<i.length;c++)this[i[c]]=l[i[c]]
Error.captureStackTrace&&Error.captureStackTrace(this,a)
try{u&&(this.lineNumber=r,this.endLineNumber=n,Object.defineProperty?(Object.defineProperty(this,"column",{value:o,enumerable:!0}),Object.defineProperty(this,"endColumn",{value:s,enumerable:!0})):(this.column=o,this.endColumn=s))}catch(e){}}a.prototype=new Error
const o=a
function s(){this.parents=[]}function u(e){this.acceptRequired(e,"path"),this.acceptArray(e.params),this.acceptKey(e,"hash")}function l(e){u.call(this,e),this.acceptKey(e,"program"),this.acceptKey(e,"inverse")}function c(e){this.acceptRequired(e,"name"),this.acceptArray(e.params),this.acceptKey(e,"hash")}s.prototype={constructor:s,mutating:!1,acceptKey:function(e,t){var r=this.accept(e[t])
if(this.mutating){if(r&&!s.prototype[r.type])throw new o('Unexpected node type "'+r.type+'" found when accepting '+t+" on "+e.type)
e[t]=r}},acceptRequired:function(e,t){if(this.acceptKey(e,t),!e[t])throw new o(e.type+" requires "+t)},acceptArray:function(e){for(var t=0,r=e.length;t<r;t++)this.acceptKey(e,t),e[t]||(e.splice(t,1),t--,r--)},accept:function(e){if(e){if(!this[e.type])throw new o("Unknown type: "+e.type,e)
this.current&&this.parents.unshift(this.current),this.current=e
var t=this[e.type](e)
return this.current=this.parents.shift(),!this.mutating||t?t:!1!==t?e:void 0}},Program:function(e){this.acceptArray(e.body)},MustacheStatement:u,Decorator:u,BlockStatement:l,DecoratorBlock:l,PartialStatement:c,PartialBlockStatement:function(e){c.call(this,e),this.acceptKey(e,"program")},ContentStatement:function(){},CommentStatement:function(){},SubExpression:u,PathExpression:function(){},StringLiteral:function(){},NumberLiteral:function(){},BooleanLiteral:function(){},UndefinedLiteral:function(){},NullLiteral:function(){},Hash:function(e){this.acceptArray(e.pairs)},HashPair:function(e){this.acceptRequired(e,"value")}}
const d=s
function h(e){void 0===e&&(e={}),this.options=e}function f(e,t,r){void 0===t&&(t=e.length)
var n=e[t-1],i=e[t-2]
return n?"ContentStatement"===n.type?(i||!r?/\r?\n\s*?$/:/(^|\r?\n)\s*?$/).test(n.original):void 0:r}function p(e,t,r){void 0===t&&(t=-1)
var n=e[t+1],i=e[t+2]
return n?"ContentStatement"===n.type?(i||!r?/^\s*?\r?\n/:/^\s*?(\r?\n|$)/).test(n.original):void 0:r}function g(e,t,r){var n=e[null==t?0:t+1]
if(n&&"ContentStatement"===n.type&&(r||!n.rightStripped)){var i=n.value
n.value=n.value.replace(r?/^\s+/:/^[ \t]*\r?\n?/,""),n.rightStripped=n.value!==i}}function m(e,t,r){var n=e[null==t?e.length-1:t-1]
if(n&&"ContentStatement"===n.type&&(r||!n.leftStripped)){var i=n.value
return n.value=n.value.replace(r?/\s+$/:/[ \t]+$/,""),n.leftStripped=n.value!==i,n.leftStripped}}h.prototype=new d,h.prototype.Program=function(e){var t=!this.options.ignoreStandalone,r=!this.isRootSeen
this.isRootSeen=!0
for(var n=e.body,i=0,a=n.length;i<a;i++){var o=n[i],s=this.accept(o)
if(s){var u=f(n,i,r),l=p(n,i,r),c=s.openStandalone&&u,d=s.closeStandalone&&l,h=s.inlineStandalone&&u&&l
s.close&&g(n,i,!0),s.open&&m(n,i,!0),t&&h&&(g(n,i),m(n,i)&&"PartialStatement"===o.type&&(o.indent=/([ \t]+$)/.exec(n[i-1].original)[1])),t&&c&&(g((o.program||o.inverse).body),m(n,i)),t&&d&&(g(n,i),m((o.inverse||o.program).body))}}return e},h.prototype.BlockStatement=h.prototype.DecoratorBlock=h.prototype.PartialBlockStatement=function(e){this.accept(e.program),this.accept(e.inverse)
var t=e.program||e.inverse,r=e.program&&e.inverse,n=r,i=r
if(r&&r.chained)for(n=r.body[0].program;i.chained;)i=i.body[i.body.length-1].program
var a={open:e.openStrip.open,close:e.closeStrip.close,openStandalone:p(t.body),closeStandalone:f((n||t).body)}
if(e.openStrip.close&&g(t.body,null,!0),r){var o=e.inverseStrip
o.open&&m(t.body,null,!0),o.close&&g(n.body,null,!0),e.closeStrip.open&&m(i.body,null,!0),!this.options.ignoreStandalone&&f(t.body)&&p(n.body)&&(m(t.body),g(n.body))}else e.closeStrip.open&&m(t.body,null,!0)
return a},h.prototype.Decorator=h.prototype.MustacheStatement=function(e){return e.strip},h.prototype.PartialStatement=h.prototype.CommentStatement=function(e){var t=e.strip||{}
return{inlineStandalone:!0,open:t.open,close:t.close}}
const v=h,y=function(){var e=function(e,t,r,n){for(r=r||{},n=e.length;n--;r[e[n]]=t);return r},t=[2,45],r=[1,20],n=[5,14,15,19,29,34,39,44,47,48,52,56,60],i=[1,35],a=[1,38],o=[1,30],s=[1,31],u=[1,32],l=[1,33],c=[1,34],d=[1,37],h=[14,15,19,29,34,39,44,47,48,52,56,60],f=[14,15,19,29,34,44,47,48,52,56,60],p=[15,18],g=[14,15,19,29,34,47,48,52,56,60],m=[33,64,71,79,80,81,82,83,84],v=[23,33,55,64,67,71,74,79,80,81,82,83,84],y=[1,51],b=[1,53],E=[23,33,55,64,67,71,74,79,80,81,82,83,84,86],w=[2,44],_=[55,64,71,79,80,81,82,83,84],T=[1,60],A=[1,61],D=[1,68],k=[33,64,71,74,79,80,81,82,83,84],S=[23,64,71,79,80,81,82,83,84],x=[1,78],C=[64,67,71,79,80,81,82,83,84],L=[33,74],R=[23,33,55,67,71,74],I=[1,109],O=[1,121],F=[71,76],P={trace:function(){},yy:{},symbols_:{error:2,root:3,program:4,EOF:5,program_repetition0:6,statement:7,mustache:8,block:9,rawBlock:10,partial:11,partialBlock:12,content:13,COMMENT:14,CONTENT:15,openRawBlock:16,rawBlock_repetition0:17,END_RAW_BLOCK:18,OPEN_RAW_BLOCK:19,helperName:20,openRawBlock_repetition0:21,openRawBlock_option0:22,CLOSE_RAW_BLOCK:23,openBlock:24,block_option0:25,closeBlock:26,openInverse:27,block_option1:28,OPEN_BLOCK:29,openBlock_repetition0:30,openBlock_option0:31,openBlock_option1:32,CLOSE:33,OPEN_INVERSE:34,openInverse_repetition0:35,openInverse_option0:36,openInverse_option1:37,openInverseChain:38,OPEN_INVERSE_CHAIN:39,openInverseChain_repetition0:40,openInverseChain_option0:41,openInverseChain_option1:42,inverseAndProgram:43,INVERSE:44,inverseChain:45,inverseChain_option0:46,OPEN_ENDBLOCK:47,OPEN:48,expr:49,mustache_repetition0:50,mustache_option0:51,OPEN_UNESCAPED:52,mustache_repetition1:53,mustache_option1:54,CLOSE_UNESCAPED:55,OPEN_PARTIAL:56,partial_repetition0:57,partial_option0:58,openPartialBlock:59,OPEN_PARTIAL_BLOCK:60,openPartialBlock_repetition0:61,openPartialBlock_option0:62,sexpr:63,OPEN_SEXPR:64,sexpr_repetition0:65,sexpr_option0:66,CLOSE_SEXPR:67,hash:68,hash_repetition_plus0:69,hashSegment:70,ID:71,EQUALS:72,blockParams:73,OPEN_BLOCK_PARAMS:74,blockParams_repetition_plus0:75,CLOSE_BLOCK_PARAMS:76,path:77,dataName:78,STRING:79,NUMBER:80,BOOLEAN:81,UNDEFINED:82,NULL:83,DATA:84,pathSegments:85,SEP:86,$accept:0,$end:1},terminals_:{2:"error",5:"EOF",14:"COMMENT",15:"CONTENT",18:"END_RAW_BLOCK",19:"OPEN_RAW_BLOCK",23:"CLOSE_RAW_BLOCK",29:"OPEN_BLOCK",33:"CLOSE",34:"OPEN_INVERSE",39:"OPEN_INVERSE_CHAIN",44:"INVERSE",47:"OPEN_ENDBLOCK",48:"OPEN",52:"OPEN_UNESCAPED",55:"CLOSE_UNESCAPED",56:"OPEN_PARTIAL",60:"OPEN_PARTIAL_BLOCK",64:"OPEN_SEXPR",67:"CLOSE_SEXPR",71:"ID",72:"EQUALS",74:"OPEN_BLOCK_PARAMS",76:"CLOSE_BLOCK_PARAMS",79:"STRING",80:"NUMBER",81:"BOOLEAN",82:"UNDEFINED",83:"NULL",84:"DATA",86:"SEP"},productions_:[0,[3,2],[4,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[7,1],[13,1],[10,3],[16,5],[9,4],[9,4],[24,6],[27,6],[38,6],[43,2],[45,3],[45,1],[26,3],[8,5],[8,5],[11,5],[12,3],[59,5],[49,1],[49,1],[63,5],[68,1],[70,3],[73,3],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[20,1],[78,2],[77,3],[77,1],[85,3],[85,1],[6,0],[6,2],[17,0],[17,2],[21,0],[21,2],[22,0],[22,1],[25,0],[25,1],[28,0],[28,1],[30,0],[30,2],[31,0],[31,1],[32,0],[32,1],[35,0],[35,2],[36,0],[36,1],[37,0],[37,1],[40,0],[40,2],[41,0],[41,1],[42,0],[42,1],[46,0],[46,1],[50,0],[50,2],[51,0],[51,1],[53,0],[53,2],[54,0],[54,1],[57,0],[57,2],[58,0],[58,1],[61,0],[61,2],[62,0],[62,1],[65,0],[65,2],[66,0],[66,1],[69,1],[69,2],[75,1],[75,2]],performAction:function(e,t,r,n,i,a,o){var s=a.length-1
switch(i){case 1:return a[s-1]
case 2:this.$=n.prepareProgram(a[s])
break
case 3:case 4:case 5:case 6:case 7:case 8:case 20:case 27:case 28:case 33:case 34:this.$=a[s]
break
case 9:this.$={type:"CommentStatement",value:n.stripComment(a[s]),strip:n.stripFlags(a[s],a[s]),loc:n.locInfo(this._$)}
break
case 10:this.$={type:"ContentStatement",original:a[s],value:a[s],loc:n.locInfo(this._$)}
break
case 11:this.$=n.prepareRawBlock(a[s-2],a[s-1],a[s],this._$)
break
case 12:this.$={path:a[s-3],params:a[s-2],hash:a[s-1]}
break
case 13:this.$=n.prepareBlock(a[s-3],a[s-2],a[s-1],a[s],!1,this._$)
break
case 14:this.$=n.prepareBlock(a[s-3],a[s-2],a[s-1],a[s],!0,this._$)
break
case 15:this.$={open:a[s-5],path:a[s-4],params:a[s-3],hash:a[s-2],blockParams:a[s-1],strip:n.stripFlags(a[s-5],a[s])}
break
case 16:case 17:this.$={path:a[s-4],params:a[s-3],hash:a[s-2],blockParams:a[s-1],strip:n.stripFlags(a[s-5],a[s])}
break
case 18:this.$={strip:n.stripFlags(a[s-1],a[s-1]),program:a[s]}
break
case 19:var u=n.prepareBlock(a[s-2],a[s-1],a[s],a[s],!1,this._$),l=n.prepareProgram([u],a[s-1].loc)
l.chained=!0,this.$={strip:a[s-2].strip,program:l,chain:!0}
break
case 21:this.$={path:a[s-1],strip:n.stripFlags(a[s-2],a[s])}
break
case 22:case 23:this.$=n.prepareMustache(a[s-3],a[s-2],a[s-1],a[s-4],n.stripFlags(a[s-4],a[s]),this._$)
break
case 24:this.$={type:"PartialStatement",name:a[s-3],params:a[s-2],hash:a[s-1],indent:"",strip:n.stripFlags(a[s-4],a[s]),loc:n.locInfo(this._$)}
break
case 25:this.$=n.preparePartialBlock(a[s-2],a[s-1],a[s],this._$)
break
case 26:this.$={path:a[s-3],params:a[s-2],hash:a[s-1],strip:n.stripFlags(a[s-4],a[s])}
break
case 29:this.$={type:"SubExpression",path:a[s-3],params:a[s-2],hash:a[s-1],loc:n.locInfo(this._$)}
break
case 30:this.$={type:"Hash",pairs:a[s],loc:n.locInfo(this._$)}
break
case 31:this.$={type:"HashPair",key:n.id(a[s-2]),value:a[s],loc:n.locInfo(this._$)}
break
case 32:this.$=n.id(a[s-1])
break
case 35:this.$={type:"StringLiteral",value:a[s],original:a[s],loc:n.locInfo(this._$)}
break
case 36:this.$={type:"NumberLiteral",value:Number(a[s]),original:Number(a[s]),loc:n.locInfo(this._$)}
break
case 37:this.$={type:"BooleanLiteral",value:"true"===a[s],original:"true"===a[s],loc:n.locInfo(this._$)}
break
case 38:this.$={type:"UndefinedLiteral",original:void 0,value:void 0,loc:n.locInfo(this._$)}
break
case 39:this.$={type:"NullLiteral",original:null,value:null,loc:n.locInfo(this._$)}
break
case 40:this.$=n.preparePath(!0,!1,a[s],this._$)
break
case 41:this.$=n.preparePath(!1,a[s-2],a[s],this._$)
break
case 42:this.$=n.preparePath(!1,!1,a[s],this._$)
break
case 43:a[s-2].push({part:n.id(a[s]),original:a[s],separator:a[s-1]}),this.$=a[s-2]
break
case 44:this.$=[{part:n.id(a[s]),original:a[s]}]
break
case 45:case 47:case 49:case 57:case 63:case 69:case 77:case 81:case 85:case 89:case 93:this.$=[]
break
case 46:case 48:case 50:case 58:case 64:case 70:case 78:case 82:case 86:case 90:case 94:case 98:case 100:a[s-1].push(a[s])
break
case 97:case 99:this.$=[a[s]]}},table:[e([5,14,15,19,29,34,48,52,56,60],t,{3:1,4:2,6:3}),{1:[3]},{5:[1,4]},e([5,39,44,47],[2,2],{7:5,8:6,9:7,10:8,11:9,12:10,13:11,24:15,27:16,16:17,59:19,14:[1,12],15:r,19:[1,23],29:[1,21],34:[1,22],48:[1,13],52:[1,14],56:[1,18],60:[1,24]}),{1:[2,1]},e(n,[2,46]),e(n,[2,3]),e(n,[2,4]),e(n,[2,5]),e(n,[2,6]),e(n,[2,7]),e(n,[2,8]),e(n,[2,9]),{20:26,49:25,63:27,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{20:26,49:39,63:27,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(h,t,{6:3,4:40}),e(f,t,{6:3,4:41}),e(p,[2,47],{17:42}),{20:26,49:43,63:27,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(g,t,{6:3,4:44}),e([5,14,15,18,19,29,34,39,44,47,48,52,56,60],[2,10]),{20:45,63:46,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{20:47,63:46,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{20:48,63:46,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{20:26,49:49,63:27,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(m,[2,77],{50:50}),e(v,[2,27]),e(v,[2,28],{86:y}),e(v,[2,33]),e(v,[2,34]),e(v,[2,35]),e(v,[2,36]),e(v,[2,37]),e(v,[2,38]),e(v,[2,39]),{20:26,49:52,63:27,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(v,[2,42],{86:b}),{71:a,85:54},e(E,w),e(_,[2,81],{53:55}),{25:56,38:58,39:T,43:59,44:A,45:57,47:[2,53]},{28:62,43:63,44:A,47:[2,55]},{13:65,15:r,18:[1,64]},e(m,[2,85],{57:66}),{26:67,47:D},e(k,[2,57],{30:69}),{86:y},e(k,[2,63],{35:70}),e(S,[2,49],{21:71}),e(m,[2,89],{61:72}),{20:26,33:[2,79],49:74,51:73,63:27,64:i,68:75,69:76,70:77,71:x,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{71:a,85:79},e(C,[2,93],{65:80}),{71:[1,81]},e(v,[2,40],{86:b}),{20:26,49:83,54:82,55:[2,83],63:27,64:i,68:84,69:76,70:77,71:x,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{26:85,47:D},{47:[2,54]},e(h,t,{6:3,4:86}),{47:[2,20]},{20:87,63:46,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(g,t,{6:3,4:88}),{26:89,47:D},{47:[2,56]},e(n,[2,11]),e(p,[2,48]),{20:26,33:[2,87],49:91,58:90,63:27,64:i,68:92,69:76,70:77,71:x,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(n,[2,25]),{20:93,63:46,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(L,[2,59],{20:26,63:27,77:28,78:29,85:36,69:76,70:77,31:94,49:95,68:96,64:i,71:x,79:o,80:s,81:u,82:l,83:c,84:d}),e(L,[2,65],{20:26,63:27,77:28,78:29,85:36,69:76,70:77,36:97,49:98,68:99,64:i,71:x,79:o,80:s,81:u,82:l,83:c,84:d}),{20:26,22:100,23:[2,51],49:101,63:27,64:i,68:102,69:76,70:77,71:x,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{20:26,33:[2,91],49:104,62:103,63:27,64:i,68:105,69:76,70:77,71:x,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{33:[1,106]},e(m,[2,78]),{33:[2,80]},e([23,33,55,67,74],[2,30],{70:107,71:[1,108]}),e(R,[2,97]),e(E,w,{72:I}),e(v,[2,41],{86:b}),{20:26,49:111,63:27,64:i,66:110,67:[2,95],68:112,69:76,70:77,71:x,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},e(E,[2,43]),{55:[1,113]},e(_,[2,82]),{55:[2,84]},e(n,[2,13]),{38:58,39:T,43:59,44:A,45:115,46:114,47:[2,75]},e(k,[2,69],{40:116}),{47:[2,18]},e(n,[2,14]),{33:[1,117]},e(m,[2,86]),{33:[2,88]},{33:[1,118]},{32:119,33:[2,61],73:120,74:O},e(k,[2,58]),e(L,[2,60]),{33:[2,67],37:122,73:123,74:O},e(k,[2,64]),e(L,[2,66]),{23:[1,124]},e(S,[2,50]),{23:[2,52]},{33:[1,125]},e(m,[2,90]),{33:[2,92]},e(n,[2,22]),e(R,[2,98]),{72:I},{20:26,49:126,63:27,64:i,71:a,77:28,78:29,79:o,80:s,81:u,82:l,83:c,84:d,85:36},{67:[1,127]},e(C,[2,94]),{67:[2,96]},e(n,[2,23]),{47:[2,19]},{47:[2,76]},e(L,[2,71],{20:26,63:27,77:28,78:29,85:36,69:76,70:77,41:128,49:129,68:130,64:i,71:x,79:o,80:s,81:u,82:l,83:c,84:d}),e(n,[2,24]),e(n,[2,21]),{33:[1,131]},{33:[2,62]},{71:[1,133],75:132},{33:[1,134]},{33:[2,68]},e(p,[2,12]),e(g,[2,26]),e(R,[2,31]),e(E,[2,29]),{33:[2,73],42:135,73:136,74:O},e(k,[2,70]),e(L,[2,72]),e(h,[2,15]),{71:[1,138],76:[1,137]},e(F,[2,99]),e(f,[2,16]),{33:[1,139]},{33:[2,74]},{33:[2,32]},e(F,[2,100]),e(h,[2,17])],defaultActions:{4:[2,1],57:[2,54],59:[2,20],63:[2,56],75:[2,80],84:[2,84],88:[2,18],92:[2,88],102:[2,52],105:[2,92],112:[2,96],114:[2,19],115:[2,76],120:[2,62],123:[2,68],136:[2,74],137:[2,32]},parseError:function(e,t){if(!t.recoverable){var r=new Error(e)
throw r.hash=t,r}this.trace(e)},parse:function(e){var t=[0],r=[null],n=[],i=this.table,a="",o=0,s=0,u=0,l=n.slice.call(arguments,1),c=Object.create(this.lexer),d={yy:{}}
for(var h in this.yy)Object.prototype.hasOwnProperty.call(this.yy,h)&&(d.yy[h]=this.yy[h])
c.setInput(e,d.yy),d.yy.lexer=c,d.yy.parser=this,void 0===c.yylloc&&(c.yylloc={})
var f=c.yylloc
n.push(f)
var p,g=c.options&&c.options.ranges
"function"==typeof d.yy.parseError?this.parseError=d.yy.parseError:this.parseError=Object.getPrototypeOf(this).parseError
for(var m,v,y,b,E,w,_,T,A,D={};;){if(y=t[t.length-1],this.defaultActions[y]?b=this.defaultActions[y]:(null==m&&(p=void 0,"number"!=typeof(p=c.lex()||1)&&(p=this.symbols_[p]||p),m=p),b=i[y]&&i[y][m]),void 0===b||!b.length||!b[0]){var k
for(w in A=[],i[y])this.terminals_[w]&&w>2&&A.push("'"+this.terminals_[w]+"'")
k=c.showPosition?"Parse error on line "+(o+1)+":\n"+c.showPosition()+"\nExpecting "+A.join(", ")+", got '"+(this.terminals_[m]||m)+"'":"Parse error on line "+(o+1)+": Unexpected "+(1==m?"end of input":"'"+(this.terminals_[m]||m)+"'"),this.parseError(k,{text:c.match,token:this.terminals_[m]||m,line:c.yylineno,loc:f,expected:A})}if(b[0]instanceof Array&&b.length>1)throw new Error("Parse Error: multiple actions possible at state: "+y+", token: "+m)
switch(b[0]){case 1:t.push(m),r.push(c.yytext),n.push(c.yylloc),t.push(b[1]),m=null,v?(m=v,v=null):(s=c.yyleng,a=c.yytext,o=c.yylineno,f=c.yylloc,u>0&&u--)
break
case 2:if(_=this.productions_[b[1]][1],D.$=r[r.length-_],D._$={first_line:n[n.length-(_||1)].first_line,last_line:n[n.length-1].last_line,first_column:n[n.length-(_||1)].first_column,last_column:n[n.length-1].last_column},g&&(D._$.range=[n[n.length-(_||1)].range[0],n[n.length-1].range[1]]),void 0!==(E=this.performAction.apply(D,[a,s,o,d.yy,b[1],r,n].concat(l))))return E
_&&(t=t.slice(0,-1*_*2),r=r.slice(0,-1*_),n=n.slice(0,-1*_)),t.push(this.productions_[b[1]][0]),r.push(D.$),n.push(D._$),T=i[t[t.length-2]][t[t.length-1]],t.push(T)
break
case 3:return!0}}return!0}},N={EOF:1,parseError:function(e,t){if(!this.yy.parser)throw new Error(e)
this.yy.parser.parseError(e,t)},setInput:function(e,t){return this.yy=t||this.yy||{},this._input=e,this._more=this._backtrack=this.done=!1,this.yylineno=this.yyleng=0,this.yytext=this.matched=this.match="",this.conditionStack=["INITIAL"],this.yylloc={first_line:1,first_column:0,last_line:1,last_column:0},this.options.ranges&&(this.yylloc.range=[0,0]),this.offset=0,this},input:function(){var e=this._input[0]
return this.yytext+=e,this.yyleng++,this.offset++,this.match+=e,this.matched+=e,e.match(/(?:\r\n?|\n).*/g)?(this.yylineno++,this.yylloc.last_line++):this.yylloc.last_column++,this.options.ranges&&this.yylloc.range[1]++,this._input=this._input.slice(1),e},unput:function(e){var t=e.length,r=e.split(/(?:\r\n?|\n)/g)
this._input=e+this._input,this.yytext=this.yytext.substr(0,this.yytext.length-t),this.offset-=t
var n=this.match.split(/(?:\r\n?|\n)/g)
this.match=this.match.substr(0,this.match.length-1),this.matched=this.matched.substr(0,this.matched.length-1),r.length-1&&(this.yylineno-=r.length-1)
var i=this.yylloc.range
return this.yylloc={first_line:this.yylloc.first_line,last_line:this.yylineno+1,first_column:this.yylloc.first_column,last_column:r?(r.length===n.length?this.yylloc.first_column:0)+n[n.length-r.length].length-r[0].length:this.yylloc.first_column-t},this.options.ranges&&(this.yylloc.range=[i[0],i[0]+this.yyleng-t]),this.yyleng=this.yytext.length,this},more:function(){return this._more=!0,this},reject:function(){return this.options.backtrack_lexer?(this._backtrack=!0,this):this.parseError("Lexical error on line "+(this.yylineno+1)+". You can only invoke reject() in the lexer when the lexer is of the backtracking persuasion (options.backtrack_lexer = true).\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},less:function(e){this.unput(this.match.slice(e))},pastInput:function(){var e=this.matched.substr(0,this.matched.length-this.match.length)
return(e.length>20?"...":"")+e.substr(-20).replace(/\n/g,"")},upcomingInput:function(){var e=this.match
return e.length<20&&(e+=this._input.substr(0,20-e.length)),(e.substr(0,20)+(e.length>20?"...":"")).replace(/\n/g,"")},showPosition:function(){var e=this.pastInput(),t=new Array(e.length+1).join("-")
return e+this.upcomingInput()+"\n"+t+"^"},test_match:function(e,t){var r,n,i
if(this.options.backtrack_lexer&&(i={yylineno:this.yylineno,yylloc:{first_line:this.yylloc.first_line,last_line:this.last_line,first_column:this.yylloc.first_column,last_column:this.yylloc.last_column},yytext:this.yytext,match:this.match,matches:this.matches,matched:this.matched,yyleng:this.yyleng,offset:this.offset,_more:this._more,_input:this._input,yy:this.yy,conditionStack:this.conditionStack.slice(0),done:this.done},this.options.ranges&&(i.yylloc.range=this.yylloc.range.slice(0))),(n=e[0].match(/(?:\r\n?|\n).*/g))&&(this.yylineno+=n.length),this.yylloc={first_line:this.yylloc.last_line,last_line:this.yylineno+1,first_column:this.yylloc.last_column,last_column:n?n[n.length-1].length-n[n.length-1].match(/\r?\n?/)[0].length:this.yylloc.last_column+e[0].length},this.yytext+=e[0],this.match+=e[0],this.matches=e,this.yyleng=this.yytext.length,this.options.ranges&&(this.yylloc.range=[this.offset,this.offset+=this.yyleng]),this._more=!1,this._backtrack=!1,this._input=this._input.slice(e[0].length),this.matched+=e[0],r=this.performAction.call(this,this.yy,this,t,this.conditionStack[this.conditionStack.length-1]),this.done&&this._input&&(this.done=!1),r)return r
if(this._backtrack){for(var a in i)this[a]=i[a]
return!1}return!1},next:function(){if(this.done)return this.EOF
var e,t,r,n
this._input||(this.done=!0),this._more||(this.yytext="",this.match="")
for(var i=this._currentRules(),a=0;a<i.length;a++)if((r=this._input.match(this.rules[i[a]]))&&(!t||r[0].length>t[0].length)){if(t=r,n=a,this.options.backtrack_lexer){if(!1!==(e=this.test_match(r,i[a])))return e
if(this._backtrack){t=!1
continue}return!1}if(!this.options.flex)break}return t?!1!==(e=this.test_match(t,i[n]))&&e:""===this._input?this.EOF:this.parseError("Lexical error on line "+(this.yylineno+1)+". Unrecognized text.\n"+this.showPosition(),{text:"",token:null,line:this.yylineno})},lex:function(){return this.next()||this.lex()},begin:function(e){this.conditionStack.push(e)},popState:function(){return this.conditionStack.length-1>0?this.conditionStack.pop():this.conditionStack[0]},_currentRules:function(){return this.conditionStack.length&&this.conditionStack[this.conditionStack.length-1]?this.conditions[this.conditionStack[this.conditionStack.length-1]].rules:this.conditions.INITIAL.rules},topState:function(e){return(e=this.conditionStack.length-1-Math.abs(e||0))>=0?this.conditionStack[e]:"INITIAL"},pushState:function(e){this.begin(e)},stateStackSize:function(){return this.conditionStack.length},options:{},performAction:function(e,t,r,n){function i(e,r){return t.yytext=t.yytext.substring(e,t.yyleng-r+e)}switch(r){case 0:if("\\\\"===t.yytext.slice(-2)?(i(0,1),this.begin("mu")):"\\"===t.yytext.slice(-1)?(i(0,1),this.begin("emu")):this.begin("mu"),t.yytext)return 15
break
case 1:case 5:return 15
case 2:return this.popState(),15
case 3:return this.begin("raw"),15
case 4:return this.popState(),"raw"===this.conditionStack[this.conditionStack.length-1]?15:(i(5,9),18)
case 6:case 22:return this.popState(),14
case 7:return 64
case 8:return 67
case 9:return 19
case 10:return this.popState(),this.begin("raw"),23
case 11:return 56
case 12:return 60
case 13:return 29
case 14:return 47
case 15:case 16:return this.popState(),44
case 17:return 34
case 18:return 39
case 19:return 52
case 20:case 23:return 48
case 21:this.unput(t.yytext),this.popState(),this.begin("com")
break
case 24:return 72
case 25:case 26:case 41:return 71
case 27:return 86
case 28:break
case 29:return this.popState(),55
case 30:return this.popState(),33
case 31:return t.yytext=i(1,2).replace(/\\"/g,'"'),79
case 32:return t.yytext=i(1,2).replace(/\\'/g,"'"),79
case 33:return 84
case 34:case 35:return 81
case 36:return 82
case 37:return 83
case 38:return 80
case 39:return 74
case 40:return 76
case 42:return t.yytext=t.yytext.replace(/\\([\\\]])/g,"$1"),71
case 43:return"INVALID"
case 44:return 5}},rules:[/^(?:[^\x00]*?(?=(\{\{)))/,/^(?:[^\x00]+)/,/^(?:[^\x00]{2,}?(?=(\{\{|\\\{\{|\\\\\{\{|$)))/,/^(?:\{\{\{\{(?=[^/]))/,/^(?:\{\{\{\{\/[^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=[=}\s\/.])\}\}\}\})/,/^(?:[^\x00]+?(?=(\{\{\{\{)))/,/^(?:[\s\S]*?--(~)?\}\})/,/^(?:\()/,/^(?:\))/,/^(?:\{\{\{\{)/,/^(?:\}\}\}\})/,/^(?:\{\{(~)?>)/,/^(?:\{\{(~)?#>)/,/^(?:\{\{(~)?#\*?)/,/^(?:\{\{(~)?\/)/,/^(?:\{\{(~)?\^\s*(~)?\}\})/,/^(?:\{\{(~)?\s*else\s*(~)?\}\})/,/^(?:\{\{(~)?\^)/,/^(?:\{\{(~)?\s*else\b)/,/^(?:\{\{(~)?\{)/,/^(?:\{\{(~)?&)/,/^(?:\{\{(~)?!--)/,/^(?:\{\{(~)?![\s\S]*?\}\})/,/^(?:\{\{(~)?\*?)/,/^(?:=)/,/^(?:\.\.)/,/^(?:\.(?=([=~}\s\/.)|])))/,/^(?:[\/.])/,/^(?:\s+)/,/^(?:\}(~)?\}\})/,/^(?:(~)?\}\})/,/^(?:"(\\["]|[^"])*")/,/^(?:'(\\[']|[^'])*')/,/^(?:@)/,/^(?:true(?=([~}\s)])))/,/^(?:false(?=([~}\s)])))/,/^(?:undefined(?=([~}\s)])))/,/^(?:null(?=([~}\s)])))/,/^(?:-?[0-9]+(?:\.[0-9]+)?(?=([~}\s)])))/,/^(?:as\s+\|)/,/^(?:\|)/,/^(?:([^\s!"#%-,\.\/;->@\[-\^`\{-~]+(?=([=~}\s\/.)|]))))/,/^(?:\[(\\\]|[^\]])*\])/,/^(?:.)/,/^(?:$)/],conditions:{mu:{rules:[7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,33,34,35,36,37,38,39,40,41,42,43,44],inclusive:!1},emu:{rules:[2],inclusive:!1},com:{rules:[6],inclusive:!1},raw:{rules:[3,4,5],inclusive:!1},INITIAL:{rules:[0,1,44],inclusive:!0}}}
function M(){this.yy={}}return P.lexer=N,M.prototype=P,P.Parser=M,new M}()
function b(e){return(new E).accept(e)}function E(){this.padding=0}E.prototype=new d,E.prototype.pad=function(e){for(var t="",r=0,n=this.padding;r<n;r++)t+="  "
return t+(e+"\n")},E.prototype.Program=function(e){var t,r,n="",i=e.body
if(e.blockParams){var a="BLOCK PARAMS: ["
for(t=0,r=e.blockParams.length;t<r;t++)a+=" "+e.blockParams[t]
a+=" ]",n+=this.pad(a)}for(t=0,r=i.length;t<r;t++)n+=this.accept(i[t])
return this.padding--,n},E.prototype.MustacheStatement=function(e){return this.pad("{{ "+this.SubExpression(e)+" }}")},E.prototype.Decorator=function(e){return this.pad("{{ DIRECTIVE "+this.SubExpression(e)+" }}")},E.prototype.BlockStatement=E.prototype.DecoratorBlock=function(e){var t=""
return t+=this.pad(("DecoratorBlock"===e.type?"DIRECTIVE ":"")+"BLOCK:"),this.padding++,t+=this.pad(this.SubExpression(e)),e.program&&(t+=this.pad("PROGRAM:"),this.padding++,t+=this.accept(e.program),this.padding--),e.inverse&&(e.program&&this.padding++,t+=this.pad("{{^}}"),this.padding++,t+=this.accept(e.inverse),this.padding--,e.program&&this.padding--),this.padding--,t},E.prototype.PartialStatement=function(e){var t="PARTIAL:"+e.name.original
return e.params[0]&&(t+=" "+this.accept(e.params[0])),e.hash&&(t+=" "+this.accept(e.hash)),this.pad("{{> "+t+" }}")},E.prototype.PartialBlockStatement=function(e){var t="PARTIAL BLOCK:"+e.name.original
return e.params[0]&&(t+=" "+this.accept(e.params[0])),e.hash&&(t+=" "+this.accept(e.hash)),t+=" "+this.pad("PROGRAM:"),this.padding++,t+=this.accept(e.program),this.padding--,this.pad("{{> "+t+" }}")},E.prototype.ContentStatement=function(e){return this.pad("CONTENT[ '"+e.value+"' ]")},E.prototype.CommentStatement=function(e){return this.pad("{{! '"+e.value+"' }}")},E.prototype.SubExpression=function(e){for(var t,r=e.params,n=[],i=0,a=r.length;i<a;i++)n.push(this.accept(r[i]))
return r="["+n.join(", ")+"]",t=e.hash?" "+this.accept(e.hash):"",this.accept(e.path)+" "+r+t},E.prototype.PathExpression=function(e){var t=function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length
var n=Array(e),i=0
for(t=0;t<r;t++)for(var a=arguments[t],o=0,s=a.length;o<s;o++,i++)n[i]=a[o]
return n}(["string"==typeof e.head?e.head:"["+this.accept(e.head)+"]"],e.tail).join("/")
return(e.data?"@":"")+"PATH:"+t},E.prototype.StringLiteral=function(e){return'"'+e.value+'"'},E.prototype.NumberLiteral=function(e){return"NUMBER{"+e.value+"}"},E.prototype.BooleanLiteral=function(e){return"BOOLEAN{"+e.value+"}"},E.prototype.UndefinedLiteral=function(){return"UNDEFINED"},E.prototype.NullLiteral=function(){return"NULL"},E.prototype.Hash=function(e){for(var t=e.pairs,r=[],n=0,i=t.length;n<i;n++)r.push(this.accept(t[n]))
return"HASH{"+r.join(", ")+"}"},E.prototype.HashPair=function(e){return e.key+"="+this.accept(e.value)}
var w=function(){for(var e=0,t=0,r=arguments.length;t<r;t++)e+=arguments[t].length
var n=Array(e),i=0
for(t=0;t<r;t++)for(var a=arguments[t],o=0,s=a.length;o<s;o++,i++)n[i]=a[o]
return n}
function _(e,t){if(t=t.path?t.path.original:t,e.path.original!==t){var r={loc:e.path.loc}
throw new o(e.path.original+" doesn't match "+t,r)}}function T(e,t){this.source=e,this.start={line:t.first_line,column:t.first_column},this.end={line:t.last_line,column:t.last_column}}function A(e){return/^\[.*\]$/.test(e)?e.substring(1,e.length-1):e}function D(e,t){return{open:"~"===e.charAt(2),close:"~"===t.charAt(t.length-3)}}function k(e){return e.replace(/^\{\{~?!-?-?/,"").replace(/-?-?~?\}\}$/,"")}function S(e,t,r,n){var i
n=this.locInfo(n),i=e?"@":t?t.original+".":""
for(var a=[],s=0,u=0,l=r.length;u<l;u++){var c=r[u].part,d=r[u].original!==c
if(i+=(r[u].separator||"")+c,d||".."!==c&&"."!==c&&"this"!==c)a.push(c)
else{if(a.length>0)throw new o("Invalid path: "+i,{loc:n})
".."===c&&s++}}var h=t||a.shift()
return{type:"PathExpression",data:e,depth:s,head:h,tail:a,parts:w([h],a),original:i,loc:n}}function x(e,t,r,n,i,a){var o=n.charAt(3)||n.charAt(2),s="{"!==o&&"&"!==o
return{type:/\*/.test(n)?"Decorator":"MustacheStatement",path:e,params:t,hash:r,escaped:s,strip:i,loc:this.locInfo(a)}}function C(e,t,r,n){_(e,r)
var i={type:"Program",body:t,strip:{},loc:n=this.locInfo(n)}
return{type:"BlockStatement",path:e.path,params:e.params,hash:e.hash,program:i,openStrip:{},inverseStrip:{},closeStrip:{},loc:n}}function L(e,t,r,n,i,a){n&&n.path&&_(e,n)
var s,u,l=/\*/.test(e.open)
if(t.blockParams=e.blockParams,r){if(l)throw new o("Unexpected inverse block on decorator",r)
r.chain&&(r.program.body[0].closeStrip=n.strip),u=r.strip,s=r.program}return i&&(i=s,s=t,t=i),{type:l?"DecoratorBlock":"BlockStatement",path:e.path,params:e.params,hash:e.hash,program:t,inverse:s,openStrip:e.strip,inverseStrip:u,closeStrip:n&&n.strip,loc:this.locInfo(a)}}function R(e,t){if(!t&&e.length){var r=e[0].loc,n=e[e.length-1].loc
r&&n&&(t={source:r.source,start:{line:r.start.line,column:r.start.column},end:{line:n.end.line,column:n.end.column}})}return{type:"Program",body:e,strip:{},loc:t}}function I(e,t,r,n){return _(e,r),{type:"PartialBlockStatement",name:e.path,params:e.params,hash:e.hash,program:t,openStrip:e.strip,closeStrip:r&&r.strip,loc:this.locInfo(n)}}var O={}
for(var F in n)Object.prototype.hasOwnProperty.call(n,F)&&(O[F]=n[F])
function P(e,t){return"Program"===e.type?e:(y.yy=O,y.yy.locInfo=function(e){return new T(t&&t.srcName,e)},y.parse(e))}function N(e,t){var r=P(e,t)
return new v(t).accept(r)}},7544:e=>{e.exports={trueFunc:function(){return!0},falseFunc:function(){return!1}}},5756:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>s})
var n=new Blob([new Uint8Array([255,227,24,196,0,0,0,3,72,1,64,0,0,4,132,16,31,227,192,225,76,255,67,12,255,221,27,255,228,97,73,63,255,195,131,69,192,232,223,255,255,207,102,239,255,255,255,101,158,206,70,20,59,255,254,95,70,149,66,4,16,128,0,2,2,32,240,138,255,36,106,183,255,227,24,196,59,11,34,62,80,49,135,40,0,253,29,191,209,200,141,71,7,255,252,152,74,15,130,33,185,6,63,255,252,195,70,203,86,53,15,255,255,247,103,76,121,64,32,47,255,34,227,194,209,138,76,65,77,69,51,46,57,55,170,170,170,170,170,170,170,170,170,170,255,227,24,196,73,13,153,210,100,81,135,56,0,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170,170])],{type:"audio/mpeg"}),i=new Blob([new Uint8Array([0,0,0,28,102,116,121,112,105,115,111,109,0,0,2,0,105,115,111,109,105,115,111,50,109,112,52,49,0,0,0,8,102,114,101,101,0,0,2,239,109,100,97,116,33,16,5,32,164,27,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,167,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,33,16,5,32,164,27,255,192,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,55,167,128,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,112,0,0,2,194,109,111,111,118,0,0,0,108,109,118,104,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,232,0,0,0,47,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,3,0,0,1,236,116,114,97,107,0,0,0,92,116,107,104,100,0,0,0,3,0,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,47,0,0,0,0,0,0,0,0,0,0,0,1,1,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,36,101,100,116,115,0,0,0,28,101,108,115,116,0,0,0,0,0,0,0,1,0,0,0,47,0,0,0,0,0,1,0,0,0,0,1,100,109,100,105,97,0,0,0,32,109,100,104,100,0,0,0,0,0,0,0,0,0,0,0,0,0,0,172,68,0,0,8,0,85,196,0,0,0,0,0,45,104,100,108,114,0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0,0,0,1,15,109,105,110,102,0,0,0,16,115,109,104,100,0,0,0,0,0,0,0,0,0,0,0,36,100,105,110,102,0,0,0,28,100,114,101,102,0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1,0,0,0,211,115,116,98,108,0,0,0,103,115,116,115,100,0,0,0,0,0,0,0,1,0,0,0,87,109,112,52,97,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,2,0,16,0,0,0,0,172,68,0,0,0,0,0,51,101,115,100,115,0,0,0,0,3,128,128,128,34,0,2,0,4,128,128,128,20,64,21,0,0,0,0,1,244,0,0,1,243,249,5,128,128,128,2,18,16,6,128,128,128,1,2,0,0,0,24,115,116,116,115,0,0,0,0,0,0,0,1,0,0,0,2,0,0,4,0,0,0,0,28,115,116,115,99,0,0,0,0,0,0,0,1,0,0,0,1,0,0,0,2,0,0,0,1,0,0,0,28,115,116,115,122,0,0,0,0,0,0,0,0,0,0,0,2,0,0,1,115,0,0,1,116,0,0,0,20,115,116,99,111,0,0,0,0,0,0,0,1,0,0,0,44,0,0,0,98,117,100,116,97,0,0,0,90,109,101,116,97,0,0,0,0,0,0,0,33,104,100,108,114,0,0,0,0,0,0,0,0,109,100,105,114,97,112,112,108,0,0,0,0,0,0,0,0,0,0,0,0,45,105,108,115,116,0,0,0,37,169,116,111,111,0,0,0,29,100,97,116,97,0,0,0,1,0,0,0,0,76,97,118,102,53,54,46,52,48,46,49,48,49])],{type:"video/mp4"})
function a(e){return Object.assign({muted:!1,timeout:250,inline:!1},e)}function o(e,t){var r=e.muted,n=e.timeout,i=e.inline,a=t(),o=a.element,s=a.source,u=void 0,l=void 0,c=void 0
return o.muted=r,!0===r&&o.setAttribute("muted","muted"),!0===i&&o.setAttribute("playsinline","playsinline"),o.src=s,new Promise((function(e){u=o.play(),l=setTimeout((function(){c(!1,new Error("Timeout "+n+" ms has been reached"))}),n),c=function(t){var r=arguments.length>1&&void 0!==arguments[1]?arguments[1]:null
o.remove(),o.srcObject=null,clearTimeout(l),e({result:t,error:r})},void 0!==u?u.then((function(){return c(!0)})).catch((function(e){return c(!1,e)})):c(!0)}))}const s={audio:function(e){return o(e=a(e),(function(){return{element:document.createElement("audio"),source:URL.createObjectURL(n)}}))},video:function(e){return o(e=a(e),(function(){return{element:document.createElement("video"),source:URL.createObjectURL(i)}}))}}},2993:function(e){var t
t=function(){return function(){var e={686:function(e,t,r){"use strict"
r.d(t,{default:function(){return E}})
var n=r(279),i=r.n(n),a=r(370),o=r.n(a),s=r(817),u=r.n(s)
function l(e){try{return document.execCommand(e)}catch(e){return!1}}var c=function(e){var t=u()(e)
return l("cut"),t},d=function(e,t){var r=function(e){var t="rtl"===document.documentElement.getAttribute("dir"),r=document.createElement("textarea")
r.style.fontSize="12pt",r.style.border="0",r.style.padding="0",r.style.margin="0",r.style.position="absolute",r.style[t?"right":"left"]="-9999px"
var n=window.pageYOffset||document.documentElement.scrollTop
return r.style.top="".concat(n,"px"),r.setAttribute("readonly",""),r.value=e,r}(e)
t.container.appendChild(r)
var n=u()(r)
return l("copy"),r.remove(),n},h=function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{container:document.body},r=""
return"string"==typeof e?r=d(e,t):e instanceof HTMLInputElement&&!["text","search","url","tel","password"].includes(null==e?void 0:e.type)?r=d(e.value,t):(r=u()(e),l("copy")),r}
function f(e){return f="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},f(e)}function p(e){return p="function"==typeof Symbol&&"symbol"==typeof Symbol.iterator?function(e){return typeof e}:function(e){return e&&"function"==typeof Symbol&&e.constructor===Symbol&&e!==Symbol.prototype?"symbol":typeof e},p(e)}function g(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}function m(e,t){return m=Object.setPrototypeOf||function(e,t){return e.__proto__=t,e},m(e,t)}function v(e){return v=Object.setPrototypeOf?Object.getPrototypeOf:function(e){return e.__proto__||Object.getPrototypeOf(e)},v(e)}function y(e,t){var r="data-clipboard-".concat(e)
if(t.hasAttribute(r))return t.getAttribute(r)}var b=function(e){!function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function")
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,writable:!0,configurable:!0}}),t&&m(e,t)}(u,e)
var t,r,n,i,a,s=(i=u,a=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Date.prototype.toString.call(Reflect.construct(Date,[],(function(){}))),!0}catch(e){return!1}}(),function(){var e,t=v(i)
if(a){var r=v(this).constructor
e=Reflect.construct(t,arguments,r)}else e=t.apply(this,arguments)
return function(e,t){return!t||"object"!==p(t)&&"function"!=typeof t?function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(e):t}(this,e)})
function u(e,t){var r
return function(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}(this,u),(r=s.call(this)).resolveOptions(t),r.listenClick(e),r}return t=u,r=[{key:"resolveOptions",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
this.action="function"==typeof e.action?e.action:this.defaultAction,this.target="function"==typeof e.target?e.target:this.defaultTarget,this.text="function"==typeof e.text?e.text:this.defaultText,this.container="object"===p(e.container)?e.container:document.body}},{key:"listenClick",value:function(e){var t=this
this.listener=o()(e,"click",(function(e){return t.onClick(e)}))}},{key:"onClick",value:function(e){var t=e.delegateTarget||e.currentTarget,r=this.action(t)||"copy",n=function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{},t=e.action,r=void 0===t?"copy":t,n=e.container,i=e.target,a=e.text
if("copy"!==r&&"cut"!==r)throw new Error('Invalid "action" value, use either "copy" or "cut"')
if(void 0!==i){if(!i||"object"!==f(i)||1!==i.nodeType)throw new Error('Invalid "target" value, use a valid Element')
if("copy"===r&&i.hasAttribute("disabled"))throw new Error('Invalid "target" attribute. Please use "readonly" instead of "disabled" attribute')
if("cut"===r&&(i.hasAttribute("readonly")||i.hasAttribute("disabled")))throw new Error('Invalid "target" attribute. You can\'t cut text from elements with "readonly" or "disabled" attributes')}return a?h(a,{container:n}):i?"cut"===r?c(i):h(i,{container:n}):void 0}({action:r,container:this.container,target:this.target(t),text:this.text(t)})
this.emit(n?"success":"error",{action:r,text:n,trigger:t,clearSelection:function(){t&&t.focus(),window.getSelection().removeAllRanges()}})}},{key:"defaultAction",value:function(e){return y("action",e)}},{key:"defaultTarget",value:function(e){var t=y("target",e)
if(t)return document.querySelector(t)}},{key:"defaultText",value:function(e){return y("text",e)}},{key:"destroy",value:function(){this.listener.destroy()}}],n=[{key:"copy",value:function(e){var t=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{container:document.body}
return h(e,t)}},{key:"cut",value:function(e){return c(e)}},{key:"isSupported",value:function(){var e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:["copy","cut"],t="string"==typeof e?[e]:e,r=!!document.queryCommandSupported
return t.forEach((function(e){r=r&&!!document.queryCommandSupported(e)})),r}}],r&&g(t.prototype,r),n&&g(t,n),u}(i()),E=b},828:function(e){if("undefined"!=typeof Element&&!Element.prototype.matches){var t=Element.prototype
t.matches=t.matchesSelector||t.mozMatchesSelector||t.msMatchesSelector||t.oMatchesSelector||t.webkitMatchesSelector}e.exports=function(e,t){for(;e&&9!==e.nodeType;){if("function"==typeof e.matches&&e.matches(t))return e
e=e.parentNode}}},438:function(e,t,r){var n=r(828)
function i(e,t,r,n,i){var o=a.apply(this,arguments)
return e.addEventListener(r,o,i),{destroy:function(){e.removeEventListener(r,o,i)}}}function a(e,t,r,i){return function(r){r.delegateTarget=n(r.target,t),r.delegateTarget&&i.call(e,r)}}e.exports=function(e,t,r,n,a){return"function"==typeof e.addEventListener?i.apply(null,arguments):"function"==typeof r?i.bind(null,document).apply(null,arguments):("string"==typeof e&&(e=document.querySelectorAll(e)),Array.prototype.map.call(e,(function(e){return i(e,t,r,n,a)})))}},879:function(e,t){t.node=function(e){return void 0!==e&&e instanceof HTMLElement&&1===e.nodeType},t.nodeList=function(e){var r=Object.prototype.toString.call(e)
return void 0!==e&&("[object NodeList]"===r||"[object HTMLCollection]"===r)&&"length"in e&&(0===e.length||t.node(e[0]))},t.string=function(e){return"string"==typeof e||e instanceof String},t.fn=function(e){return"[object Function]"===Object.prototype.toString.call(e)}},370:function(e,t,r){var n=r(879),i=r(438)
e.exports=function(e,t,r){if(!e&&!t&&!r)throw new Error("Missing required arguments")
if(!n.string(t))throw new TypeError("Second argument must be a String")
if(!n.fn(r))throw new TypeError("Third argument must be a Function")
if(n.node(e))return function(e,t,r){return e.addEventListener(t,r),{destroy:function(){e.removeEventListener(t,r)}}}(e,t,r)
if(n.nodeList(e))return function(e,t,r){return Array.prototype.forEach.call(e,(function(e){e.addEventListener(t,r)})),{destroy:function(){Array.prototype.forEach.call(e,(function(e){e.removeEventListener(t,r)}))}}}(e,t,r)
if(n.string(e))return function(e,t,r){return i(document.body,e,t,r)}(e,t,r)
throw new TypeError("First argument must be a String, HTMLElement, HTMLCollection, or NodeList")}},817:function(e){e.exports=function(e){var t
if("SELECT"===e.nodeName)e.focus(),t=e.value
else if("INPUT"===e.nodeName||"TEXTAREA"===e.nodeName){var r=e.hasAttribute("readonly")
r||e.setAttribute("readonly",""),e.select(),e.setSelectionRange(0,e.value.length),r||e.removeAttribute("readonly"),t=e.value}else{e.hasAttribute("contenteditable")&&e.focus()
var n=window.getSelection(),i=document.createRange()
i.selectNodeContents(e),n.removeAllRanges(),n.addRange(i),t=n.toString()}return t}},279:function(e){function t(){}t.prototype={on:function(e,t,r){var n=this.e||(this.e={})
return(n[e]||(n[e]=[])).push({fn:t,ctx:r}),this},once:function(e,t,r){var n=this
function i(){n.off(e,i),t.apply(r,arguments)}return i._=t,this.on(e,i,r)},emit:function(e){for(var t=[].slice.call(arguments,1),r=((this.e||(this.e={}))[e]||[]).slice(),n=0,i=r.length;n<i;n++)r[n].fn.apply(r[n].ctx,t)
return this},off:function(e,t){var r=this.e||(this.e={}),n=r[e],i=[]
if(n&&t)for(var a=0,o=n.length;a<o;a++)n[a].fn!==t&&n[a].fn._!==t&&i.push(n[a])
return i.length?r[e]=i:delete r[e],this}},e.exports=t,e.exports.TinyEmitter=t}},t={}
function r(n){if(t[n])return t[n].exports
var i=t[n]={exports:{}}
return e[n](i,i.exports,r),i.exports}return r.n=function(e){var t=e&&e.__esModule?function(){return e.default}:function(){return e}
return r.d(t,{a:t}),t},r.d=function(e,t){for(var n in t)r.o(t,n)&&!r.o(e,n)&&Object.defineProperty(e,n,{enumerable:!0,get:t[n]})},r.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},r(686)}().default},e.exports=t()},8221:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.attributeRules=void 0
var i=n(r(7544)),a=/[-[\]{}()*+?.,\\^$|#\s]/g
function o(e){return e.replace(a,"\\$&")}var s=new Set(["accept","accept-charset","align","alink","axis","bgcolor","charset","checked","clear","codetype","color","compact","declare","defer","dir","direction","disabled","enctype","face","frame","hreflang","http-equiv","lang","language","link","media","method","multiple","nohref","noresize","noshade","nowrap","readonly","rel","rev","rules","scope","scrolling","selected","shape","target","text","type","valign","valuetype","vlink"])
function u(e,t){return"boolean"==typeof e.ignoreCase?e.ignoreCase:"quirks"===e.ignoreCase?!!t.quirksMode:!t.xmlMode&&s.has(e.name)}t.attributeRules={equals:function(e,t,r){var n=r.adapter,i=t.name,a=t.value
return u(t,r)?(a=a.toLowerCase(),function(t){var r=n.getAttributeValue(t,i)
return null!=r&&r.length===a.length&&r.toLowerCase()===a&&e(t)}):function(t){return n.getAttributeValue(t,i)===a&&e(t)}},hyphen:function(e,t,r){var n=r.adapter,i=t.name,a=t.value,o=a.length
return u(t,r)?(a=a.toLowerCase(),function(t){var r=n.getAttributeValue(t,i)
return null!=r&&(r.length===o||"-"===r.charAt(o))&&r.substr(0,o).toLowerCase()===a&&e(t)}):function(t){var r=n.getAttributeValue(t,i)
return null!=r&&(r.length===o||"-"===r.charAt(o))&&r.substr(0,o)===a&&e(t)}},element:function(e,t,r){var n=r.adapter,a=t.name,s=t.value
if(/\s/.test(s))return i.default.falseFunc
var l=new RegExp("(?:^|\\s)".concat(o(s),"(?:$|\\s)"),u(t,r)?"i":"")
return function(t){var r=n.getAttributeValue(t,a)
return null!=r&&r.length>=s.length&&l.test(r)&&e(t)}},exists:function(e,t,r){var n=t.name,i=r.adapter
return function(t){return i.hasAttrib(t,n)&&e(t)}},start:function(e,t,r){var n=r.adapter,a=t.name,o=t.value,s=o.length
return 0===s?i.default.falseFunc:u(t,r)?(o=o.toLowerCase(),function(t){var r=n.getAttributeValue(t,a)
return null!=r&&r.length>=s&&r.substr(0,s).toLowerCase()===o&&e(t)}):function(t){var r
return!!(null===(r=n.getAttributeValue(t,a))||void 0===r?void 0:r.startsWith(o))&&e(t)}},end:function(e,t,r){var n=r.adapter,a=t.name,o=t.value,s=-o.length
return 0===s?i.default.falseFunc:u(t,r)?(o=o.toLowerCase(),function(t){var r
return(null===(r=n.getAttributeValue(t,a))||void 0===r?void 0:r.substr(s).toLowerCase())===o&&e(t)}):function(t){var r
return!!(null===(r=n.getAttributeValue(t,a))||void 0===r?void 0:r.endsWith(o))&&e(t)}},any:function(e,t,r){var n=r.adapter,a=t.name,s=t.value
if(""===s)return i.default.falseFunc
if(u(t,r)){var l=new RegExp(o(s),"i")
return function(t){var r=n.getAttributeValue(t,a)
return null!=r&&r.length>=s.length&&l.test(r)&&e(t)}}return function(t){var r
return!!(null===(r=n.getAttributeValue(t,a))||void 0===r?void 0:r.includes(s))&&e(t)}},not:function(e,t,r){var n=r.adapter,i=t.name,a=t.value
return""===a?function(t){return!!n.getAttributeValue(t,i)&&e(t)}:u(t,r)?(a=a.toLowerCase(),function(t){var r=n.getAttributeValue(t,i)
return(null==r||r.length!==a.length||r.toLowerCase()!==a)&&e(t)}):function(t){return n.getAttributeValue(t,i)!==a&&e(t)}}}},3999:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var i=Object.getOwnPropertyDescriptor(t,r)
i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r)
return i(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.compileToken=t.compileUnsafe=t.compile=void 0
var s=r(8938),u=o(r(7544)),l=a(r(1766)),c=r(7849),d=r(457)
function h(e,t,r){return v("string"==typeof e?(0,s.parse)(e):e,t,r)}function f(e){return e.type===s.SelectorType.Pseudo&&("scope"===e.name||Array.isArray(e.data)&&e.data.some((function(e){return e.some(f)})))}t.compile=function(e,t,r){var n=h(e,t,r)
return(0,d.ensureIsTag)(n,t.adapter)},t.compileUnsafe=h
var p={type:s.SelectorType.Descendant},g={type:"_flexibleDescendant"},m={type:s.SelectorType.Pseudo,name:"scope",data:null}
function v(e,t,r){var n
e.forEach(l.default),r=null!==(n=t.context)&&void 0!==n?n:r
var i=Array.isArray(r),a=r&&(Array.isArray(r)?r:[r])
if(!1!==t.relativeSelector)!function(e,t,r){for(var n=t.adapter,i=!!(null==r?void 0:r.every((function(e){var t=n.isTag(e)&&n.getParent(e)
return e===d.PLACEHOLDER_ELEMENT||t&&n.isTag(t)}))),a=0,o=e;a<o.length;a++){var u=o[a]
if(u.length>0&&(0,l.isTraversal)(u[0])&&u[0].type!==s.SelectorType.Descendant);else{if(!i||u.some(f))continue
u.unshift(p)}u.unshift(m)}}(e,t,a)
else if(e.some((function(e){return e.length>0&&(0,l.isTraversal)(e[0])})))throw new Error("Relative selectors are not allowed when the `relativeSelector` option is disabled")
var o=!1,h=e.map((function(e){if(e.length>=2){var r=e[0],n=e[1]
r.type!==s.SelectorType.Pseudo||"scope"!==r.name||(i&&n.type===s.SelectorType.Descendant?e[1]=g:n.type!==s.SelectorType.Adjacent&&n.type!==s.SelectorType.Sibling||(o=!0))}return function(e,t,r){var n
return e.reduce((function(e,n){return e===u.default.falseFunc?u.default.falseFunc:(0,c.compileGeneralSelector)(e,n,t,r,v)}),null!==(n=t.rootFunc)&&void 0!==n?n:u.default.trueFunc)}(e,t,a)})).reduce(y,u.default.falseFunc)
return h.shouldTestNextSiblings=o,h}function y(e,t){return t===u.default.falseFunc||e===u.default.trueFunc?e:e===u.default.falseFunc||t===u.default.trueFunc?t:function(r){return e(r)||t(r)}}t.compileToken=v},7849:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.compileGeneralSelector=void 0
var n=r(8221),i=r(8896),a=r(8938)
function o(e,t){var r=t.getParent(e)
return r&&t.isTag(r)?r:null}t.compileGeneralSelector=function(e,t,r,s,u){var l=r.adapter,c=r.equals
switch(t.type){case a.SelectorType.PseudoElement:throw new Error("Pseudo-elements are not supported by css-select")
case a.SelectorType.ColumnCombinator:throw new Error("Column combinators are not yet supported by css-select")
case a.SelectorType.Attribute:if(null!=t.namespace)throw new Error("Namespaced attributes are not yet supported by css-select")
return r.xmlMode&&!r.lowerCaseAttributeNames||(t.name=t.name.toLowerCase()),n.attributeRules[t.action](e,t,r)
case a.SelectorType.Pseudo:return(0,i.compilePseudoSelector)(e,t,r,s,u)
case a.SelectorType.Tag:if(null!=t.namespace)throw new Error("Namespaced tag names are not yet supported by css-select")
var d=t.name
return r.xmlMode&&!r.lowerCaseTags||(d=d.toLowerCase()),function(t){return l.getName(t)===d&&e(t)}
case a.SelectorType.Descendant:if(!1===r.cacheResults||"undefined"==typeof WeakSet)return function(t){for(var r=t;r=o(r,l);)if(e(r))return!0
return!1}
var h=new WeakSet
return function(t){for(var r=t;r=o(r,l);)if(!h.has(r)){if(l.isTag(r)&&e(r))return!0
h.add(r)}return!1}
case"_flexibleDescendant":return function(t){var r=t
do{if(e(r))return!0}while(r=o(r,l))
return!1}
case a.SelectorType.Parent:return function(t){return l.getChildren(t).some((function(t){return l.isTag(t)&&e(t)}))}
case a.SelectorType.Child:return function(t){var r=l.getParent(t)
return null!=r&&l.isTag(r)&&e(r)}
case a.SelectorType.Sibling:return function(t){for(var r=l.getSiblings(t),n=0;n<r.length;n++){var i=r[n]
if(c(t,i))break
if(l.isTag(i)&&e(i))return!0}return!1}
case a.SelectorType.Adjacent:return l.prevElementSibling?function(t){var r=l.prevElementSibling(t)
return null!=r&&e(r)}:function(t){for(var r,n=l.getSiblings(t),i=0;i<n.length;i++){var a=n[i]
if(c(t,a))break
l.isTag(a)&&(r=a)}return!!r&&e(r)}
case a.SelectorType.Universal:if(null!=t.namespace&&"*"!==t.namespace)throw new Error("Namespaced universal selectors are not yet supported by css-select")
return e}}},7133:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var i=Object.getOwnPropertyDescriptor(t,r)
i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r)
return i(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.aliases=t.pseudos=t.filters=t.is=t.selectOne=t.selectAll=t.prepareContext=t._compileToken=t._compileUnsafe=t.compile=void 0
var s=a(r(5511)),u=o(r(7544)),l=r(3999),c=r(457),d=function(e,t){return e===t},h={adapter:s,equals:d}
function f(e){var t,r,n,i,a=null!=e?e:h
return null!==(t=a.adapter)&&void 0!==t||(a.adapter=s),null!==(r=a.equals)&&void 0!==r||(a.equals=null!==(i=null===(n=a.adapter)||void 0===n?void 0:n.equals)&&void 0!==i?i:d),a}function p(e){return function(t,r,n){var i=f(r)
return e(t,i,n)}}function g(e){return function(t,r,n){var i=f(n)
"function"!=typeof t&&(t=(0,l.compileUnsafe)(t,i,r))
var a=m(r,i.adapter,t.shouldTestNextSiblings)
return e(t,a,i)}}function m(e,t,r){return void 0===r&&(r=!1),r&&(e=function(e,t){for(var r=Array.isArray(e)?e.slice(0):[e],n=r.length,i=0;i<n;i++){var a=(0,c.getNextSiblings)(r[i],t)
r.push.apply(r,a)}return r}(e,t)),Array.isArray(e)?t.removeSubsets(e):t.getChildren(e)}t.compile=p(l.compile),t._compileUnsafe=p(l.compileUnsafe),t._compileToken=p(l.compileToken),t.prepareContext=m,t.selectAll=g((function(e,t,r){return e!==u.default.falseFunc&&t&&0!==t.length?r.adapter.findAll(e,t):[]})),t.selectOne=g((function(e,t,r){return e!==u.default.falseFunc&&t&&0!==t.length?r.adapter.findOne(e,t):null})),t.is=function(e,t,r){var n=f(r)
return("function"==typeof t?t:(0,l.compile)(t,n))(e)},t.default=t.selectAll
var v=r(8896)
Object.defineProperty(t,"filters",{enumerable:!0,get:function(){return v.filters}}),Object.defineProperty(t,"pseudos",{enumerable:!0,get:function(){return v.pseudos}}),Object.defineProperty(t,"aliases",{enumerable:!0,get:function(){return v.aliases}})},4473:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.aliases=void 0,t.aliases={"any-link":":is(a, area, link)[href]",link:":any-link:not(:visited)",disabled:":is(\n        :is(button, input, select, textarea, optgroup, option)[disabled],\n        optgroup[disabled] > option,\n        fieldset[disabled]:not(fieldset[disabled] legend:first-of-type *)\n    )",enabled:":not(:disabled)",checked:":is(:is(input[type=radio], input[type=checkbox])[checked], option:selected)",required:":is(input, select, textarea)[required]",optional:":is(input, select, textarea):not([required])",selected:"option:is([selected], select:not([multiple]):not(:has(> option[selected])) > :first-of-type)",checkbox:"[type=checkbox]",file:"[type=file]",password:"[type=password]",radio:"[type=radio]",reset:"[type=reset]",image:"[type=image]",submit:"[type=submit]",parent:":not(:empty)",header:":is(h1, h2, h3, h4, h5, h6)",button:":is(button, input[type=button])",input:":is(input, textarea, select, button)",text:"input:is(:not([type!='']), [type=text])"}},6636:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.filters=void 0
var i=n(r(1316)),a=n(r(7544))
function o(e,t){return function(r){var n=t.getParent(r)
return null!=n&&t.isTag(n)&&e(r)}}function s(e){return function(t,r,n){var i=n.adapter[e]
return"function"!=typeof i?a.default.falseFunc:function(e){return i(e)&&t(e)}}}t.filters={contains:function(e,t,r){var n=r.adapter
return function(r){return e(r)&&n.getText(r).includes(t)}},icontains:function(e,t,r){var n=r.adapter,i=t.toLowerCase()
return function(t){return e(t)&&n.getText(t).toLowerCase().includes(i)}},"nth-child":function(e,t,r){var n=r.adapter,s=r.equals,u=(0,i.default)(t)
return u===a.default.falseFunc?a.default.falseFunc:u===a.default.trueFunc?o(e,n):function(t){for(var r=n.getSiblings(t),i=0,a=0;a<r.length&&!s(t,r[a]);a++)n.isTag(r[a])&&i++
return u(i)&&e(t)}},"nth-last-child":function(e,t,r){var n=r.adapter,s=r.equals,u=(0,i.default)(t)
return u===a.default.falseFunc?a.default.falseFunc:u===a.default.trueFunc?o(e,n):function(t){for(var r=n.getSiblings(t),i=0,a=r.length-1;a>=0&&!s(t,r[a]);a--)n.isTag(r[a])&&i++
return u(i)&&e(t)}},"nth-of-type":function(e,t,r){var n=r.adapter,s=r.equals,u=(0,i.default)(t)
return u===a.default.falseFunc?a.default.falseFunc:u===a.default.trueFunc?o(e,n):function(t){for(var r=n.getSiblings(t),i=0,a=0;a<r.length;a++){var o=r[a]
if(s(t,o))break
n.isTag(o)&&n.getName(o)===n.getName(t)&&i++}return u(i)&&e(t)}},"nth-last-of-type":function(e,t,r){var n=r.adapter,s=r.equals,u=(0,i.default)(t)
return u===a.default.falseFunc?a.default.falseFunc:u===a.default.trueFunc?o(e,n):function(t){for(var r=n.getSiblings(t),i=0,a=r.length-1;a>=0;a--){var o=r[a]
if(s(t,o))break
n.isTag(o)&&n.getName(o)===n.getName(t)&&i++}return u(i)&&e(t)}},root:function(e,t,r){var n=r.adapter
return function(t){var r=n.getParent(t)
return(null==r||!n.isTag(r))&&e(t)}},scope:function(e,r,n,i){var a=n.equals
return i&&0!==i.length?1===i.length?function(t){return a(i[0],t)&&e(t)}:function(t){return i.includes(t)&&e(t)}:t.filters.root(e,r,n)},hover:s("isHovered"),visited:s("isVisited"),active:s("isActive")}},8896:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.compilePseudoSelector=t.aliases=t.pseudos=t.filters=void 0
var n=r(8938),i=r(6636)
Object.defineProperty(t,"filters",{enumerable:!0,get:function(){return i.filters}})
var a=r(7191)
Object.defineProperty(t,"pseudos",{enumerable:!0,get:function(){return a.pseudos}})
var o=r(4473)
Object.defineProperty(t,"aliases",{enumerable:!0,get:function(){return o.aliases}})
var s=r(457)
t.compilePseudoSelector=function(e,t,r,u,l){var c,d=t.name,h=t.data
if(Array.isArray(h)){if(!(d in s.subselects))throw new Error("Unknown pseudo-class :".concat(d,"(").concat(h,")"))
return s.subselects[d](e,h,r,u,l)}var f=null===(c=r.pseudos)||void 0===c?void 0:c[d],p="string"==typeof f?f:o.aliases[d]
if("string"==typeof p){if(null!=h)throw new Error("Pseudo ".concat(d," doesn't have any arguments"))
var g=(0,n.parse)(p)
return s.subselects.is(e,g,r,u,l)}if("function"==typeof f)return(0,a.verifyPseudoArgs)(f,d,h,1),function(t){return f(t,h)&&e(t)}
if(d in i.filters)return i.filters[d](e,h,r,u)
if(d in a.pseudos){var m=a.pseudos[d]
return(0,a.verifyPseudoArgs)(m,d,h,2),function(t){return m(t,r,h)&&e(t)}}throw new Error("Unknown pseudo-class :".concat(d))}},7191:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.verifyPseudoArgs=t.pseudos=void 0,t.pseudos={empty:function(e,t){var r=t.adapter
return!r.getChildren(e).some((function(e){return r.isTag(e)||""!==r.getText(e)}))},"first-child":function(e,t){var r=t.adapter,n=t.equals
if(r.prevElementSibling)return null==r.prevElementSibling(e)
var i=r.getSiblings(e).find((function(e){return r.isTag(e)}))
return null!=i&&n(e,i)},"last-child":function(e,t){for(var r=t.adapter,n=t.equals,i=r.getSiblings(e),a=i.length-1;a>=0;a--){if(n(e,i[a]))return!0
if(r.isTag(i[a]))break}return!1},"first-of-type":function(e,t){for(var r=t.adapter,n=t.equals,i=r.getSiblings(e),a=r.getName(e),o=0;o<i.length;o++){var s=i[o]
if(n(e,s))return!0
if(r.isTag(s)&&r.getName(s)===a)break}return!1},"last-of-type":function(e,t){for(var r=t.adapter,n=t.equals,i=r.getSiblings(e),a=r.getName(e),o=i.length-1;o>=0;o--){var s=i[o]
if(n(e,s))return!0
if(r.isTag(s)&&r.getName(s)===a)break}return!1},"only-of-type":function(e,t){var r=t.adapter,n=t.equals,i=r.getName(e)
return r.getSiblings(e).every((function(t){return n(e,t)||!r.isTag(t)||r.getName(t)!==i}))},"only-child":function(e,t){var r=t.adapter,n=t.equals
return r.getSiblings(e).every((function(t){return n(e,t)||!r.isTag(t)}))}},t.verifyPseudoArgs=function(e,t,r,n){if(null===r){if(e.length>n)throw new Error("Pseudo-class :".concat(t," requires an argument"))}else if(e.length===n)throw new Error("Pseudo-class :".concat(t," doesn't have any arguments"))}},457:function(e,t,r){"use strict"
var n=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,i=0,a=t.length;i<a;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i])
return e.concat(n||Array.prototype.slice.call(t))},i=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.subselects=t.getNextSiblings=t.ensureIsTag=t.PLACEHOLDER_ELEMENT=void 0
var a=i(r(7544)),o=r(1766)
function s(e,t){return e===a.default.falseFunc?a.default.falseFunc:function(r){return t.isTag(r)&&e(r)}}function u(e,t){var r=t.getSiblings(e)
if(r.length<=1)return[]
var n=r.indexOf(e)
return n<0||n===r.length-1?[]:r.slice(n+1).filter(t.isTag)}function l(e){return{xmlMode:!!e.xmlMode,lowerCaseAttributeNames:!!e.lowerCaseAttributeNames,lowerCaseTags:!!e.lowerCaseTags,quirksMode:!!e.quirksMode,cacheResults:!!e.cacheResults,pseudos:e.pseudos,adapter:e.adapter,equals:e.equals}}t.PLACEHOLDER_ELEMENT={},t.ensureIsTag=s,t.getNextSiblings=u
var c=function(e,t,r,n,i){var o=i(t,l(r),n)
return o===a.default.trueFunc?e:o===a.default.falseFunc?a.default.falseFunc:function(t){return o(t)&&e(t)}}
t.subselects={is:c,matches:c,where:c,not:function(e,t,r,n,i){var o=i(t,l(r),n)
return o===a.default.falseFunc?e:o===a.default.trueFunc?a.default.falseFunc:function(t){return!o(t)&&e(t)}},has:function(e,r,i,c,d){var h=i.adapter,f=l(i)
f.relativeSelector=!0
var p=r.some((function(e){return e.some(o.isTraversal)}))?[t.PLACEHOLDER_ELEMENT]:void 0,g=d(r,f,p)
if(g===a.default.falseFunc)return a.default.falseFunc
var m=s(g,h)
if(p&&g!==a.default.trueFunc){var v=g.shouldTestNextSiblings,y=void 0!==v&&v
return function(t){if(!e(t))return!1
p[0]=t
var r=h.getChildren(t),i=y?n(n([],r,!0),u(t,h),!0):r
return h.existsOne(m,i)}}return function(t){return e(t)&&h.existsOne(m,h.getChildren(t))}}}},1766:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.isTraversal=void 0
var n=r(8938),i=new Map([[n.SelectorType.Universal,50],[n.SelectorType.Tag,30],[n.SelectorType.Attribute,1],[n.SelectorType.Pseudo,0]])
t.isTraversal=function(e){return!i.has(e.type)}
var a=new Map([[n.AttributeAction.Exists,10],[n.AttributeAction.Equals,8],[n.AttributeAction.Not,7],[n.AttributeAction.Start,6],[n.AttributeAction.End,6],[n.AttributeAction.Any,5]])
function o(e){var t,r,s=null!==(t=i.get(e.type))&&void 0!==t?t:-1
return e.type===n.SelectorType.Attribute?(s=null!==(r=a.get(e.action))&&void 0!==r?r:4,e.action===n.AttributeAction.Equals&&"id"===e.name&&(s=9),e.ignoreCase&&(s>>=1)):e.type===n.SelectorType.Pseudo&&(e.data?"has"===e.name||"contains"===e.name?s=0:Array.isArray(e.data)?(s=Math.min.apply(Math,e.data.map((function(e){return Math.min.apply(Math,e.map(o))}))))<0&&(s=0):s=2:s=3),s}t.default=function(e){for(var t=e.map(o),r=1;r<e.length;r++){var n=t[r]
if(!(n<0))for(var i=r-1;i>=0&&n<t[i];i--){var a=e[i+1]
e[i+1]=e[i],e[i]=a,t[i+1]=t[i],t[i]=n}}}},8938:(e,t,r)=>{"use strict"
var n
r.r(t),r.d(t,{AttributeAction:()=>a,IgnoreCaseMode:()=>i,SelectorType:()=>n,isTraversal:()=>c,parse:()=>m,stringify:()=>T}),function(e){e.Attribute="attribute",e.Pseudo="pseudo",e.PseudoElement="pseudo-element",e.Tag="tag",e.Universal="universal",e.Adjacent="adjacent",e.Child="child",e.Descendant="descendant",e.Parent="parent",e.Sibling="sibling",e.ColumnCombinator="column-combinator"}(n||(n={}))
const i={Unknown:null,QuirksMode:"quirks",IgnoreCase:!0,CaseSensitive:!1}
var a
!function(e){e.Any="any",e.Element="element",e.End="end",e.Equals="equals",e.Exists="exists",e.Hyphen="hyphen",e.Not="not",e.Start="start"}(a||(a={}))
const o=/^[^\\#]?(?:\\(?:[\da-f]{1,6}\s?|.)|[\w\-\u00b0-\uFFFF])+/,s=/\\([\da-f]{1,6}\s?|(\s)|.)/gi,u=new Map([[126,a.Element],[94,a.Start],[36,a.End],[42,a.Any],[33,a.Not],[124,a.Hyphen]]),l=new Set(["has","not","matches","is","where","host","host-context"])
function c(e){switch(e.type){case n.Adjacent:case n.Child:case n.Descendant:case n.Parent:case n.Sibling:case n.ColumnCombinator:return!0
default:return!1}}const d=new Set(["contains","icontains"])
function h(e,t,r){const n=parseInt(t,16)-65536
return n!=n||r?t:n<0?String.fromCharCode(n+65536):String.fromCharCode(n>>10|55296,1023&n|56320)}function f(e){return e.replace(s,h)}function p(e){return 39===e||34===e}function g(e){return 32===e||9===e||10===e||12===e||13===e}function m(e){const t=[],r=v(t,`${e}`,0)
if(r<e.length)throw new Error(`Unmatched selector: ${e.slice(r)}`)
return t}function v(e,t,r){let i=[]
function s(e){const n=t.slice(r+e).match(o)
if(!n)throw new Error(`Expected name, found ${t.slice(r)}`)
const[i]=n
return r+=e+i.length,f(i)}function h(e){for(r+=e;r<t.length&&g(t.charCodeAt(r));)r++}function m(){const e=r+=1
let n=1
for(;n>0&&r<t.length;r++)40!==t.charCodeAt(r)||y(r)?41!==t.charCodeAt(r)||y(r)||n--:n++
if(n)throw new Error("Parenthesis not matched")
return f(t.slice(e,r-1))}function y(e){let r=0
for(;92===t.charCodeAt(--e);)r++
return 1==(1&r)}function b(){if(i.length>0&&c(i[i.length-1]))throw new Error("Did not expect successive traversals.")}function E(e){i.length>0&&i[i.length-1].type===n.Descendant?i[i.length-1].type=e:(b(),i.push({type:e}))}function w(e,t){i.push({type:n.Attribute,name:e,action:t,value:s(1),namespace:null,ignoreCase:"quirks"})}function _(){if(i.length&&i[i.length-1].type===n.Descendant&&i.pop(),0===i.length)throw new Error("Empty sub-selector")
e.push(i)}if(h(0),t.length===r)return r
e:for(;r<t.length;){const e=t.charCodeAt(r)
switch(e){case 32:case 9:case 10:case 12:case 13:0!==i.length&&i[0].type===n.Descendant||(b(),i.push({type:n.Descendant})),h(1)
break
case 62:E(n.Child),h(1)
break
case 60:E(n.Parent),h(1)
break
case 126:E(n.Sibling),h(1)
break
case 43:E(n.Adjacent),h(1)
break
case 46:w("class",a.Element)
break
case 35:w("id",a.Equals)
break
case 91:{let e
h(1)
let o=null
124===t.charCodeAt(r)?e=s(1):t.startsWith("*|",r)?(o="*",e=s(2)):(e=s(0),124===t.charCodeAt(r)&&61!==t.charCodeAt(r+1)&&(o=e,e=s(1))),h(0)
let l=a.Exists
const c=u.get(t.charCodeAt(r))
if(c){if(l=c,61!==t.charCodeAt(r+1))throw new Error("Expected `=`")
h(2)}else 61===t.charCodeAt(r)&&(l=a.Equals,h(1))
let d="",m=null
if("exists"!==l){if(p(t.charCodeAt(r))){const e=t.charCodeAt(r)
let n=r+1
for(;n<t.length&&(t.charCodeAt(n)!==e||y(n));)n+=1
if(t.charCodeAt(n)!==e)throw new Error("Attribute value didn't end")
d=f(t.slice(r+1,n)),r=n+1}else{const e=r
for(;r<t.length&&(!g(t.charCodeAt(r))&&93!==t.charCodeAt(r)||y(r));)r+=1
d=f(t.slice(e,r))}h(0)
const e=32|t.charCodeAt(r)
115===e?(m=!1,h(1)):105===e&&(m=!0,h(1))}if(93!==t.charCodeAt(r))throw new Error("Attribute selector didn't terminate")
r+=1
const v={type:n.Attribute,name:e,action:l,value:d,namespace:o,ignoreCase:m}
i.push(v)
break}case 58:{if(58===t.charCodeAt(r+1)){i.push({type:n.PseudoElement,name:s(2).toLowerCase(),data:40===t.charCodeAt(r)?m():null})
continue}const e=s(1).toLowerCase()
let a=null
if(40===t.charCodeAt(r))if(l.has(e)){if(p(t.charCodeAt(r+1)))throw new Error(`Pseudo-selector ${e} cannot be quoted`)
if(a=[],r=v(a,t,r+1),41!==t.charCodeAt(r))throw new Error(`Missing closing parenthesis in :${e} (${t})`)
r+=1}else{if(a=m(),d.has(e)){const e=a.charCodeAt(0)
e===a.charCodeAt(a.length-1)&&p(e)&&(a=a.slice(1,-1))}a=f(a)}i.push({type:n.Pseudo,name:e,data:a})
break}case 44:_(),i=[],h(1)
break
default:{if(t.startsWith("/*",r)){const e=t.indexOf("*/",r+2)
if(e<0)throw new Error("Comment was not terminated")
r=e+2,0===i.length&&h(0)
break}let a,u=null
if(42===e)r+=1,a="*"
else if(124===e){if(a="",124===t.charCodeAt(r+1)){E(n.ColumnCombinator),h(2)
break}}else{if(!o.test(t.slice(r)))break e
a=s(0)}124===t.charCodeAt(r)&&124!==t.charCodeAt(r+1)&&(u=a,42===t.charCodeAt(r+1)?(a="*",r+=2):a=s(1)),i.push("*"===a?{type:n.Universal,namespace:u}:{type:n.Tag,name:a,namespace:u})}}}return _(),r}const y=["\\",'"'],b=[...y,"(",")"],E=new Set(y.map((e=>e.charCodeAt(0)))),w=new Set(b.map((e=>e.charCodeAt(0)))),_=new Set([...b,"~","^","$","*","+","!","|",":","[","]"," ","."].map((e=>e.charCodeAt(0))))
function T(e){return e.map((e=>e.map(A).join(""))).join(", ")}function A(e,t,r){switch(e.type){case n.Child:return 0===t?"> ":" > "
case n.Parent:return 0===t?"< ":" < "
case n.Sibling:return 0===t?"~ ":" ~ "
case n.Adjacent:return 0===t?"+ ":" + "
case n.Descendant:return" "
case n.ColumnCombinator:return 0===t?"|| ":" || "
case n.Universal:return"*"===e.namespace&&t+1<r.length&&"name"in r[t+1]?"":`${k(e.namespace)}*`
case n.Tag:return D(e)
case n.PseudoElement:return`::${S(e.name,_)}${null===e.data?"":`(${S(e.data,w)})`}`
case n.Pseudo:return`:${S(e.name,_)}${null===e.data?"":`(${"string"==typeof e.data?S(e.data,w):T(e.data)})`}`
case n.Attribute:{if("id"===e.name&&e.action===a.Equals&&"quirks"===e.ignoreCase&&!e.namespace)return`#${S(e.value,_)}`
if("class"===e.name&&e.action===a.Element&&"quirks"===e.ignoreCase&&!e.namespace)return`.${S(e.value,_)}`
const t=D(e)
return e.action===a.Exists?`[${t}]`:`[${t}${function(e){switch(e){case a.Equals:return""
case a.Element:return"~"
case a.Start:return"^"
case a.End:return"$"
case a.Any:return"*"
case a.Not:return"!"
case a.Hyphen:return"|"
case a.Exists:throw new Error("Shouldn't be here")}}(e.action)}="${S(e.value,E)}"${null===e.ignoreCase?"":e.ignoreCase?" i":" s"}]`}}}function D(e){return`${k(e.namespace)}${S(e.name,_)}`}function k(e){return null!==e?`${"*"===e?"*":S(e,_)}|`:""}function S(e,t){let r=0,n=""
for(let i=0;i<e.length;i++)t.has(e.charCodeAt(i))&&(n+=`${e.slice(r,i)}\\${e.charAt(i)}`,r=i+1)
return n.length>0?n+e.slice(r):e}},2810:e=>{var t=1e3,r=60*t,n=60*r,i=24*n
function a(e,t,r,n){var i=t>=1.5*r
return Math.round(e/r)+" "+n+(i?"s":"")}e.exports=function(e,o){o=o||{}
var s,u,l=typeof e
if("string"===l&&e.length>0)return function(e){if(!((e=String(e)).length>100)){var a=/^(-?(?:\d+)?\.?\d+) *(milliseconds?|msecs?|ms|seconds?|secs?|s|minutes?|mins?|m|hours?|hrs?|h|days?|d|weeks?|w|years?|yrs?|y)?$/i.exec(e)
if(a){var o=parseFloat(a[1])
switch((a[2]||"ms").toLowerCase()){case"years":case"year":case"yrs":case"yr":case"y":return 315576e5*o
case"weeks":case"week":case"w":return 6048e5*o
case"days":case"day":case"d":return o*i
case"hours":case"hour":case"hrs":case"hr":case"h":return o*n
case"minutes":case"minute":case"mins":case"min":case"m":return o*r
case"seconds":case"second":case"secs":case"sec":case"s":return o*t
case"milliseconds":case"millisecond":case"msecs":case"msec":case"ms":return o
default:return}}}}(e)
if("number"===l&&isFinite(e))return o.long?(s=e,(u=Math.abs(s))>=i?a(s,u,i,"day"):u>=n?a(s,u,n,"hour"):u>=r?a(s,u,r,"minute"):u>=t?a(s,u,t,"second"):s+" ms"):function(e){var a=Math.abs(e)
return a>=i?Math.round(e/i)+"d":a>=n?Math.round(e/n)+"h":a>=r?Math.round(e/r)+"m":a>=t?Math.round(e/t)+"s":e+"ms"}(e)
throw new Error("val is not a non-empty string or a valid number. val="+JSON.stringify(e))}},9796:(e,t,r)=>{t.formatArgs=function(t){if(t[0]=(this.useColors?"%c":"")+this.namespace+(this.useColors?" %c":" ")+t[0]+(this.useColors?"%c ":" ")+"+"+e.exports.humanize(this.diff),!this.useColors)return
const r="color: "+this.color
t.splice(1,0,r,"color: inherit")
let n=0,i=0
t[0].replace(/%[a-zA-Z%]/g,(e=>{"%%"!==e&&(n++,"%c"===e&&(i=n))})),t.splice(i,0,r)},t.save=function(e){try{e?t.storage.setItem("debug",e):t.storage.removeItem("debug")}catch(e){}},t.load=function(){let e
try{e=t.storage.getItem("debug")}catch(e){}return!e&&"undefined"!=typeof process&&"env"in process&&(e=process.env.DEBUG),e},t.useColors=function(){return!("undefined"==typeof window||!window.process||"renderer"!==window.process.type&&!window.process.__nwjs)||("undefined"==typeof navigator||!navigator.userAgent||!navigator.userAgent.toLowerCase().match(/(edge|trident)\/(\d+)/))&&("undefined"!=typeof document&&document.documentElement&&document.documentElement.style&&document.documentElement.style.WebkitAppearance||"undefined"!=typeof window&&window.console&&(window.console.firebug||window.console.exception&&window.console.table)||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/firefox\/(\d+)/)&&parseInt(RegExp.$1,10)>=31||"undefined"!=typeof navigator&&navigator.userAgent&&navigator.userAgent.toLowerCase().match(/applewebkit\/(\d+)/))},t.storage=function(){try{return localStorage}catch(e){}}(),t.destroy=(()=>{let e=!1
return()=>{e||(e=!0,console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`."))}})(),t.colors=["#0000CC","#0000FF","#0033CC","#0033FF","#0066CC","#0066FF","#0099CC","#0099FF","#00CC00","#00CC33","#00CC66","#00CC99","#00CCCC","#00CCFF","#3300CC","#3300FF","#3333CC","#3333FF","#3366CC","#3366FF","#3399CC","#3399FF","#33CC00","#33CC33","#33CC66","#33CC99","#33CCCC","#33CCFF","#6600CC","#6600FF","#6633CC","#6633FF","#66CC00","#66CC33","#9900CC","#9900FF","#9933CC","#9933FF","#99CC00","#99CC33","#CC0000","#CC0033","#CC0066","#CC0099","#CC00CC","#CC00FF","#CC3300","#CC3333","#CC3366","#CC3399","#CC33CC","#CC33FF","#CC6600","#CC6633","#CC9900","#CC9933","#CCCC00","#CCCC33","#FF0000","#FF0033","#FF0066","#FF0099","#FF00CC","#FF00FF","#FF3300","#FF3333","#FF3366","#FF3399","#FF33CC","#FF33FF","#FF6600","#FF6633","#FF9900","#FF9933","#FFCC00","#FFCC33"],t.log=console.debug||console.log||(()=>{}),e.exports=r(4701)(t)
const{formatters:n}=e.exports
n.j=function(e){try{return JSON.stringify(e)}catch(e){return"[UnexpectedJSONParseError]: "+e.message}}},4701:(e,t,r)=>{e.exports=function(e){function t(e){let r,i,a,o=null
function s(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i]
if(!s.enabled)return
const a=s,o=Number(new Date),u=o-(r||o)
a.diff=u,a.prev=r,a.curr=o,r=o,n[0]=t.coerce(n[0]),"string"!=typeof n[0]&&n.unshift("%O")
let l=0
n[0]=n[0].replace(/%([a-zA-Z%])/g,((e,r)=>{if("%%"===e)return"%"
l++
const i=t.formatters[r]
if("function"==typeof i){const t=n[l]
e=i.call(a,t),n.splice(l,1),l--}return e})),t.formatArgs.call(a,n),(a.log||t.log).apply(a,n)}return s.namespace=e,s.useColors=t.useColors(),s.color=t.selectColor(e),s.extend=n,s.destroy=t.destroy,Object.defineProperty(s,"enabled",{enumerable:!0,configurable:!1,get:()=>null!==o?o:(i!==t.namespaces&&(i=t.namespaces,a=t.enabled(e)),a),set:e=>{o=e}}),"function"==typeof t.init&&t.init(s),s}function n(e,r){const n=t(this.namespace+(void 0===r?":":r)+e)
return n.log=this.log,n}function i(e){return e.toString().substring(2,e.toString().length-2).replace(/\.\*\?$/,"*")}return t.debug=t,t.default=t,t.coerce=function(e){return e instanceof Error?e.stack||e.message:e},t.disable=function(){const e=[...t.names.map(i),...t.skips.map(i).map((e=>"-"+e))].join(",")
return t.enable(""),e},t.enable=function(e){let r
t.save(e),t.namespaces=e,t.names=[],t.skips=[]
const n=("string"==typeof e?e:"").split(/[\s,]+/),i=n.length
for(r=0;r<i;r++)n[r]&&("-"===(e=n[r].replace(/\*/g,".*?"))[0]?t.skips.push(new RegExp("^"+e.substr(1)+"$")):t.names.push(new RegExp("^"+e+"$")))},t.enabled=function(e){if("*"===e[e.length-1])return!0
let r,n
for(r=0,n=t.skips.length;r<n;r++)if(t.skips[r].test(e))return!1
for(r=0,n=t.names.length;r<n;r++)if(t.names[r].test(e))return!0
return!1},t.humanize=r(2810),t.destroy=function(){console.warn("Instance method `debug.destroy()` is deprecated and no longer does anything. It will be removed in the next major version of `debug`.")},Object.keys(e).forEach((r=>{t[r]=e[r]})),t.names=[],t.skips=[],t.formatters={},t.selectColor=function(e){let r=0
for(let t=0;t<e.length;t++)r=(r<<5)-r+e.charCodeAt(t),r|=0
return t.colors[Math.abs(r)%t.colors.length]},t.enable(t.load()),t}},3117:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.attributeNames=t.elementNames=void 0,t.elementNames=new Map(["altGlyph","altGlyphDef","altGlyphItem","animateColor","animateMotion","animateTransform","clipPath","feBlend","feColorMatrix","feComponentTransfer","feComposite","feConvolveMatrix","feDiffuseLighting","feDisplacementMap","feDistantLight","feDropShadow","feFlood","feFuncA","feFuncB","feFuncG","feFuncR","feGaussianBlur","feImage","feMerge","feMergeNode","feMorphology","feOffset","fePointLight","feSpecularLighting","feSpotLight","feTile","feTurbulence","foreignObject","glyphRef","linearGradient","radialGradient","textPath"].map((function(e){return[e.toLowerCase(),e]}))),t.attributeNames=new Map(["definitionURL","attributeName","attributeType","baseFrequency","baseProfile","calcMode","clipPathUnits","diffuseConstant","edgeMode","filterUnits","glyphRef","gradientTransform","gradientUnits","kernelMatrix","kernelUnitLength","keyPoints","keySplines","keyTimes","lengthAdjust","limitingConeAngle","markerHeight","markerUnits","markerWidth","maskContentUnits","maskUnits","numOctaves","pathLength","patternContentUnits","patternTransform","patternUnits","pointsAtX","pointsAtY","pointsAtZ","preserveAlpha","preserveAspectRatio","primitiveUnits","refX","refY","repeatCount","repeatDur","requiredExtensions","requiredFeatures","specularConstant","specularExponent","spreadMethod","startOffset","stdDeviation","stitchTiles","surfaceScale","systemLanguage","tableValues","targetX","targetY","textLength","viewBox","viewTarget","xChannelSelector","yChannelSelector","zoomAndPan"].map((function(e){return[e.toLowerCase(),e]})))},1671:function(e,t,r){"use strict"
var n=this&&this.__assign||function(){return n=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
return e},n.apply(this,arguments)},i=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var i=Object.getOwnPropertyDescriptor(t,r)
i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),a=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),o=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&i(t,e,r)
return a(t,e),t}
Object.defineProperty(t,"__esModule",{value:!0}),t.render=void 0
var s=o(r(7304)),u=r(1437),l=r(3117),c=new Set(["style","script","xmp","iframe","noembed","noframes","plaintext","noscript"])
function d(e){return e.replace(/"/g,"&quot;")}var h=new Set(["area","base","basefont","br","col","command","embed","frame","hr","img","input","isindex","keygen","link","meta","param","source","track","wbr"])
function f(e,t){void 0===t&&(t={})
for(var r=("length"in e?e:[e]),n="",i=0;i<r.length;i++)n+=p(r[i],t)
return n}function p(e,t){switch(e.type){case s.Root:return f(e.children,t)
case s.Doctype:case s.Directive:return"<".concat(e.data,">")
case s.Comment:return"\x3c!--".concat(e.data,"--\x3e")
case s.CDATA:return function(e){return"<![CDATA[".concat(e.children[0].data,"]]>")}(e)
case s.Script:case s.Style:case s.Tag:return function(e,t){var r
"foreign"===t.xmlMode&&(e.name=null!==(r=l.elementNames.get(e.name))&&void 0!==r?r:e.name,e.parent&&g.has(e.parent.name)&&(t=n(n({},t),{xmlMode:!1}))),!t.xmlMode&&m.has(e.name)&&(t=n(n({},t),{xmlMode:"foreign"}))
var i="<".concat(e.name),a=function(e,t){var r
if(e){var n=!1===(null!==(r=t.encodeEntities)&&void 0!==r?r:t.decodeEntities)?d:t.xmlMode||"utf8"!==t.encodeEntities?u.encodeXML:u.escapeAttribute
return Object.keys(e).map((function(r){var i,a,o=null!==(i=e[r])&&void 0!==i?i:""
return"foreign"===t.xmlMode&&(r=null!==(a=l.attributeNames.get(r))&&void 0!==a?a:r),t.emptyAttrs||t.xmlMode||""!==o?"".concat(r,'="').concat(n(o),'"'):r})).join(" ")}}(e.attribs,t)
return a&&(i+=" ".concat(a)),0===e.children.length&&(t.xmlMode?!1!==t.selfClosingTags:t.selfClosingTags&&h.has(e.name))?(t.xmlMode||(i+=" "),i+="/>"):(i+=">",e.children.length>0&&(i+=f(e.children,t)),!t.xmlMode&&h.has(e.name)||(i+="</".concat(e.name,">"))),i}(e,t)
case s.Text:return function(e,t){var r,n=e.data||""
return!1===(null!==(r=t.encodeEntities)&&void 0!==r?r:t.decodeEntities)||!t.xmlMode&&e.parent&&c.has(e.parent.name)||(n=t.xmlMode||"utf8"!==t.encodeEntities?(0,u.encodeXML)(n):(0,u.escapeText)(n)),n}(e,t)}}t.render=f,t.default=f
var g=new Set(["mi","mo","mn","ms","mtext","annotation-xml","foreignObject","desc","title"]),m=new Set(["svg","math"])},9344:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var i=Object.getOwnPropertyDescriptor(t,r)
i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__setModuleDefault||(Object.create?function(e,t){Object.defineProperty(e,"default",{enumerable:!0,value:t})}:function(e,t){e.default=t}),a=this&&this.__importStar||function(e){if(e&&e.__esModule)return e
var t={}
if(null!=e)for(var r in e)"default"!==r&&Object.prototype.hasOwnProperty.call(e,r)&&n(t,e,r)
return i(t,e),t},o=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.decodeXML=t.decodeHTMLStrict=t.decodeHTMLAttribute=t.decodeHTML=t.determineBranch=t.EntityDecoder=t.DecodingMode=t.BinTrieFlags=t.fromCodePoint=t.replaceCodePoint=t.decodeCodePoint=t.xmlDecodeTree=t.htmlDecodeTree=void 0
var s=o(r(6507))
t.htmlDecodeTree=s.default
var u=o(r(6041))
t.xmlDecodeTree=u.default
var l=a(r(3314))
t.decodeCodePoint=l.default
var c,d,h,f,p=r(3314)
function g(e){return e>=c.ZERO&&e<=c.NINE}Object.defineProperty(t,"replaceCodePoint",{enumerable:!0,get:function(){return p.replaceCodePoint}}),Object.defineProperty(t,"fromCodePoint",{enumerable:!0,get:function(){return p.fromCodePoint}}),function(e){e[e.NUM=35]="NUM",e[e.SEMI=59]="SEMI",e[e.EQUALS=61]="EQUALS",e[e.ZERO=48]="ZERO",e[e.NINE=57]="NINE",e[e.LOWER_A=97]="LOWER_A",e[e.LOWER_F=102]="LOWER_F",e[e.LOWER_X=120]="LOWER_X",e[e.LOWER_Z=122]="LOWER_Z",e[e.UPPER_A=65]="UPPER_A",e[e.UPPER_F=70]="UPPER_F",e[e.UPPER_Z=90]="UPPER_Z"}(c||(c={})),function(e){e[e.VALUE_LENGTH=49152]="VALUE_LENGTH",e[e.BRANCH_LENGTH=16256]="BRANCH_LENGTH",e[e.JUMP_TABLE=127]="JUMP_TABLE"}(d=t.BinTrieFlags||(t.BinTrieFlags={})),function(e){e[e.EntityStart=0]="EntityStart",e[e.NumericStart=1]="NumericStart",e[e.NumericDecimal=2]="NumericDecimal",e[e.NumericHex=3]="NumericHex",e[e.NamedEntity=4]="NamedEntity"}(h||(h={})),function(e){e[e.Legacy=0]="Legacy",e[e.Strict=1]="Strict",e[e.Attribute=2]="Attribute"}(f=t.DecodingMode||(t.DecodingMode={}))
var m=function(){function e(e,t,r){this.decodeTree=e,this.emitCodePoint=t,this.errors=r,this.state=h.EntityStart,this.consumed=1,this.result=0,this.treeIndex=0,this.excess=1,this.decodeMode=f.Strict}return e.prototype.startEntity=function(e){this.decodeMode=e,this.state=h.EntityStart,this.result=0,this.treeIndex=0,this.excess=1,this.consumed=1},e.prototype.write=function(e,t){switch(this.state){case h.EntityStart:return e.charCodeAt(t)===c.NUM?(this.state=h.NumericStart,this.consumed+=1,this.stateNumericStart(e,t+1)):(this.state=h.NamedEntity,this.stateNamedEntity(e,t))
case h.NumericStart:return this.stateNumericStart(e,t)
case h.NumericDecimal:return this.stateNumericDecimal(e,t)
case h.NumericHex:return this.stateNumericHex(e,t)
case h.NamedEntity:return this.stateNamedEntity(e,t)}},e.prototype.stateNumericStart=function(e,t){return t>=e.length?-1:(32|e.charCodeAt(t))===c.LOWER_X?(this.state=h.NumericHex,this.consumed+=1,this.stateNumericHex(e,t+1)):(this.state=h.NumericDecimal,this.stateNumericDecimal(e,t))},e.prototype.addToNumericResult=function(e,t,r,n){if(t!==r){var i=r-t
this.result=this.result*Math.pow(n,i)+parseInt(e.substr(t,i),n),this.consumed+=i}},e.prototype.stateNumericHex=function(e,t){for(var r,n=t;t<e.length;){var i=e.charCodeAt(t)
if(!(g(i)||(r=i,r>=c.UPPER_A&&r<=c.UPPER_F||r>=c.LOWER_A&&r<=c.LOWER_F)))return this.addToNumericResult(e,n,t,16),this.emitNumericEntity(i,3)
t+=1}return this.addToNumericResult(e,n,t,16),-1},e.prototype.stateNumericDecimal=function(e,t){for(var r=t;t<e.length;){var n=e.charCodeAt(t)
if(!g(n))return this.addToNumericResult(e,r,t,10),this.emitNumericEntity(n,2)
t+=1}return this.addToNumericResult(e,r,t,10),-1},e.prototype.emitNumericEntity=function(e,t){var r
if(this.consumed<=t)return null===(r=this.errors)||void 0===r||r.absenceOfDigitsInNumericCharacterReference(this.consumed),0
if(e===c.SEMI)this.consumed+=1
else if(this.decodeMode===f.Strict)return 0
return this.emitCodePoint((0,l.replaceCodePoint)(this.result),this.consumed),this.errors&&(e!==c.SEMI&&this.errors.missingSemicolonAfterCharacterReference(),this.errors.validateNumericCharacterReference(this.result)),this.consumed},e.prototype.stateNamedEntity=function(e,t){for(var r=this.decodeTree,n=r[this.treeIndex],i=(n&d.VALUE_LENGTH)>>14;t<e.length;t++,this.excess++){var a=e.charCodeAt(t)
if(this.treeIndex=y(r,n,this.treeIndex+Math.max(1,i),a),this.treeIndex<0)return 0===this.result||this.decodeMode===f.Attribute&&(0===i||(o=a)===c.EQUALS||function(e){return e>=c.UPPER_A&&e<=c.UPPER_Z||e>=c.LOWER_A&&e<=c.LOWER_Z||g(e)}(o))?0:this.emitNotTerminatedNamedEntity()
if(0!=(i=((n=r[this.treeIndex])&d.VALUE_LENGTH)>>14)){if(a===c.SEMI)return this.emitNamedEntityData(this.treeIndex,i,this.consumed+this.excess)
this.decodeMode!==f.Strict&&(this.result=this.treeIndex,this.consumed+=this.excess,this.excess=0)}}var o
return-1},e.prototype.emitNotTerminatedNamedEntity=function(){var e,t=this.result,r=(this.decodeTree[t]&d.VALUE_LENGTH)>>14
return this.emitNamedEntityData(t,r,this.consumed),null===(e=this.errors)||void 0===e||e.missingSemicolonAfterCharacterReference(),this.consumed},e.prototype.emitNamedEntityData=function(e,t,r){var n=this.decodeTree
return this.emitCodePoint(1===t?n[e]&~d.VALUE_LENGTH:n[e+1],r),3===t&&this.emitCodePoint(n[e+2],r),r},e.prototype.end=function(){var e
switch(this.state){case h.NamedEntity:return 0===this.result||this.decodeMode===f.Attribute&&this.result!==this.treeIndex?0:this.emitNotTerminatedNamedEntity()
case h.NumericDecimal:return this.emitNumericEntity(0,2)
case h.NumericHex:return this.emitNumericEntity(0,3)
case h.NumericStart:return null===(e=this.errors)||void 0===e||e.absenceOfDigitsInNumericCharacterReference(this.consumed),0
case h.EntityStart:return 0}},e}()
function v(e){var t="",r=new m(e,(function(e){return t+=(0,l.fromCodePoint)(e)}))
return function(e,n){for(var i=0,a=0;(a=e.indexOf("&",a))>=0;){t+=e.slice(i,a),r.startEntity(n)
var o=r.write(e,a+1)
if(o<0){i=a+r.end()
break}i=a+o,a=0===o?i+1:i}var s=t+e.slice(i)
return t="",s}}function y(e,t,r,n){var i=(t&d.BRANCH_LENGTH)>>7,a=t&d.JUMP_TABLE
if(0===i)return 0!==a&&n===a?r:-1
if(a){var o=n-a
return o<0||o>=i?-1:e[r+o]-1}for(var s=r,u=s+i-1;s<=u;){var l=s+u>>>1,c=e[l]
if(c<n)s=l+1
else{if(!(c>n))return e[l+i]
u=l-1}}return-1}t.EntityDecoder=m,t.determineBranch=y
var b=v(s.default),E=v(u.default)
t.decodeHTML=function(e,t){return void 0===t&&(t=f.Legacy),b(e,t)},t.decodeHTMLAttribute=function(e){return b(e,f.Attribute)},t.decodeHTMLStrict=function(e){return b(e,f.Strict)},t.decodeXML=function(e){return E(e,f.Strict)}},3314:(e,t)=>{"use strict"
var r
Object.defineProperty(t,"__esModule",{value:!0}),t.replaceCodePoint=t.fromCodePoint=void 0
var n=new Map([[0,65533],[128,8364],[130,8218],[131,402],[132,8222],[133,8230],[134,8224],[135,8225],[136,710],[137,8240],[138,352],[139,8249],[140,338],[142,381],[145,8216],[146,8217],[147,8220],[148,8221],[149,8226],[150,8211],[151,8212],[152,732],[153,8482],[154,353],[155,8250],[156,339],[158,382],[159,376]])
function i(e){var t
return e>=55296&&e<=57343||e>1114111?65533:null!==(t=n.get(e))&&void 0!==t?t:e}t.fromCodePoint=null!==(r=String.fromCodePoint)&&void 0!==r?r:function(e){var t=""
return e>65535&&(e-=65536,t+=String.fromCharCode(e>>>10&1023|55296),e=56320|1023&e),t+String.fromCharCode(e)},t.replaceCodePoint=i,t.default=function(e){return(0,t.fromCodePoint)(i(e))}},3169:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.encodeNonAsciiHTML=t.encodeHTML=void 0
var i=n(r(7751)),a=r(6013),o=/[\t\n!-,./:-@[-`\f{-}$\x80-\uFFFF]/g
function s(e,t){for(var r,n="",o=0;null!==(r=e.exec(t));){var s=r.index
n+=t.substring(o,s)
var u=t.charCodeAt(s),l=i.default.get(u)
if("object"==typeof l){if(s+1<t.length){var c=t.charCodeAt(s+1),d="number"==typeof l.n?l.n===c?l.o:void 0:l.n.get(c)
if(void 0!==d){n+=d,o=e.lastIndex+=1
continue}}l=l.v}if(void 0!==l)n+=l,o=s+1
else{var h=(0,a.getCodePoint)(t,s)
n+="&#x".concat(h.toString(16),";"),o=e.lastIndex+=Number(h!==u)}}return n+t.substr(o)}t.encodeHTML=function(e){return s(o,e)},t.encodeNonAsciiHTML=function(e){return s(a.xmlReplacer,e)}},6013:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.escapeText=t.escapeAttribute=t.escapeUTF8=t.escape=t.encodeXML=t.getCodePoint=t.xmlReplacer=void 0,t.xmlReplacer=/["&'<>$\x80-\uFFFF]/g
var r=new Map([[34,"&quot;"],[38,"&amp;"],[39,"&apos;"],[60,"&lt;"],[62,"&gt;"]])
function n(e){for(var n,i="",a=0;null!==(n=t.xmlReplacer.exec(e));){var o=n.index,s=e.charCodeAt(o),u=r.get(s)
void 0!==u?(i+=e.substring(a,o)+u,a=o+1):(i+="".concat(e.substring(a,o),"&#x").concat((0,t.getCodePoint)(e,o).toString(16),";"),a=t.xmlReplacer.lastIndex+=Number(55296==(64512&s)))}return i+e.substr(a)}function i(e,t){return function(r){for(var n,i=0,a="";n=e.exec(r);)i!==n.index&&(a+=r.substring(i,n.index)),a+=t.get(n[0].charCodeAt(0)),i=n.index+1
return a+r.substring(i)}}t.getCodePoint=null!=String.prototype.codePointAt?function(e,t){return e.codePointAt(t)}:function(e,t){return 55296==(64512&e.charCodeAt(t))?1024*(e.charCodeAt(t)-55296)+e.charCodeAt(t+1)-56320+65536:e.charCodeAt(t)},t.encodeXML=n,t.escape=n,t.escapeUTF8=i(/[&<>'"]/g,r),t.escapeAttribute=i(/["&\u00A0]/g,new Map([[34,"&quot;"],[38,"&amp;"],[160,"&nbsp;"]])),t.escapeText=i(/[&<>\u00A0]/g,new Map([[38,"&amp;"],[60,"&lt;"],[62,"&gt;"],[160,"&nbsp;"]]))},6507:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=new Uint16Array('ᵁ<Õıʊҝջאٵ۞ޢߖࠏ੊ઑඡ๭༉༦჊ረዡᐕᒝᓃᓟᔥ\0\0\0\0\0\0ᕫᛍᦍᰒᷝ὾⁠↰⊍⏀⏻⑂⠤⤒ⴈ⹈⿎〖㊺㘹㞬㣾㨨㩱㫠㬮ࠀEMabcfglmnoprstu\\bfms¦³¹ÈÏlig耻Æ䃆P耻&䀦cute耻Á䃁reve;䄂Āiyx}rc耻Â䃂;䐐r;쀀𝔄rave耻À䃀pha;䎑acr;䄀d;橓Āgp¡on;䄄f;쀀𝔸plyFunction;恡ing耻Å䃅Ācs¾Ãr;쀀𝒜ign;扔ilde耻Ã䃃ml耻Ä䃄ЀaceforsuåûþėĜĢħĪĀcrêòkslash;或Ŷöø;櫧ed;挆y;䐑ƀcrtąċĔause;戵noullis;愬a;䎒r;쀀𝔅pf;쀀𝔹eve;䋘còēmpeq;扎܀HOacdefhilorsuōőŖƀƞƢƵƷƺǜȕɳɸɾcy;䐧PY耻©䂩ƀcpyŝŢźute;䄆Ā;iŧŨ拒talDifferentialD;慅leys;愭ȀaeioƉƎƔƘron;䄌dil耻Ç䃇rc;䄈nint;戰ot;䄊ĀdnƧƭilla;䂸terDot;䂷òſi;䎧rcleȀDMPTǇǋǑǖot;抙inus;抖lus;投imes;抗oĀcsǢǸkwiseContourIntegral;戲eCurlyĀDQȃȏoubleQuote;思uote;怙ȀlnpuȞȨɇɕonĀ;eȥȦ户;橴ƀgitȯȶȺruent;扡nt;戯ourIntegral;戮ĀfrɌɎ;愂oduct;成nterClockwiseContourIntegral;戳oss;樯cr;쀀𝒞pĀ;Cʄʅ拓ap;才րDJSZacefiosʠʬʰʴʸˋ˗ˡ˦̳ҍĀ;oŹʥtrahd;椑cy;䐂cy;䐅cy;䐏ƀgrsʿ˄ˇger;怡r;憡hv;櫤Āayː˕ron;䄎;䐔lĀ;t˝˞戇a;䎔r;쀀𝔇Āaf˫̧Ācm˰̢riticalȀADGT̖̜̀̆cute;䂴oŴ̋̍;䋙bleAcute;䋝rave;䁠ilde;䋜ond;拄ferentialD;慆Ѱ̽\0\0\0͔͂\0Ѕf;쀀𝔻ƀ;DE͈͉͍䂨ot;惜qual;扐blèCDLRUVͣͲ΂ϏϢϸontourIntegraìȹoɴ͹\0\0ͻ»͉nArrow;懓Āeo·ΤftƀARTΐΖΡrrow;懐ightArrow;懔eåˊngĀLRΫτeftĀARγιrrow;柸ightArrow;柺ightArrow;柹ightĀATϘϞrrow;懒ee;抨pɁϩ\0\0ϯrrow;懑ownArrow;懕erticalBar;戥ǹABLRTaВЪаўѿͼrrowƀ;BUНОТ憓ar;椓pArrow;懵reve;䌑eft˒к\0ц\0ѐightVector;楐eeVector;楞ectorĀ;Bљњ憽ar;楖ightǔѧ\0ѱeeVector;楟ectorĀ;BѺѻ懁ar;楗eeĀ;A҆҇护rrow;憧ĀctҒҗr;쀀𝒟rok;䄐ࠀNTacdfglmopqstuxҽӀӄӋӞӢӧӮӵԡԯԶՒ՝ՠեG;䅊H耻Ð䃐cute耻É䃉ƀaiyӒӗӜron;䄚rc耻Ê䃊;䐭ot;䄖r;쀀𝔈rave耻È䃈ement;戈ĀapӺӾcr;䄒tyɓԆ\0\0ԒmallSquare;旻erySmallSquare;斫ĀgpԦԪon;䄘f;쀀𝔼silon;䎕uĀaiԼՉlĀ;TՂՃ橵ilde;扂librium;懌Āci՗՚r;愰m;橳a;䎗ml耻Ë䃋Āipժկsts;戃onentialE;慇ʀcfiosօֈ֍ֲ׌y;䐤r;쀀𝔉lledɓ֗\0\0֣mallSquare;旼erySmallSquare;斪Ͱֺ\0ֿ\0\0ׄf;쀀𝔽All;戀riertrf;愱cò׋؀JTabcdfgorstר׬ׯ׺؀ؒؖ؛؝أ٬ٲcy;䐃耻>䀾mmaĀ;d׷׸䎓;䏜reve;䄞ƀeiy؇،ؐdil;䄢rc;䄜;䐓ot;䄠r;쀀𝔊;拙pf;쀀𝔾eater̀EFGLSTصلَٖٛ٦qualĀ;Lؾؿ扥ess;招ullEqual;执reater;檢ess;扷lantEqual;橾ilde;扳cr;쀀𝒢;扫ЀAacfiosuڅڋږڛڞڪھۊRDcy;䐪Āctڐڔek;䋇;䁞irc;䄤r;愌lbertSpace;愋ǰگ\0ڲf;愍izontalLine;攀Āctۃۅòکrok;䄦mpńېۘownHumðįqual;扏܀EJOacdfgmnostuۺ۾܃܇܎ܚܞܡܨ݄ݸދޏޕcy;䐕lig;䄲cy;䐁cute耻Í䃍Āiyܓܘrc耻Î䃎;䐘ot;䄰r;愑rave耻Ì䃌ƀ;apܠܯܿĀcgܴܷr;䄪inaryI;慈lieóϝǴ݉\0ݢĀ;eݍݎ戬Āgrݓݘral;戫section;拂isibleĀCTݬݲomma;恣imes;恢ƀgptݿރވon;䄮f;쀀𝕀a;䎙cr;愐ilde;䄨ǫޚ\0ޞcy;䐆l耻Ï䃏ʀcfosuެ޷޼߂ߐĀiyޱ޵rc;䄴;䐙r;쀀𝔍pf;쀀𝕁ǣ߇\0ߌr;쀀𝒥rcy;䐈kcy;䐄΀HJacfosߤߨ߽߬߱ࠂࠈcy;䐥cy;䐌ppa;䎚Āey߶߻dil;䄶;䐚r;쀀𝔎pf;쀀𝕂cr;쀀𝒦րJTaceflmostࠥࠩࠬࡐࡣ঳সে্਷ੇcy;䐉耻<䀼ʀcmnpr࠷࠼ࡁࡄࡍute;䄹bda;䎛g;柪lacetrf;愒r;憞ƀaeyࡗ࡜ࡡron;䄽dil;䄻;䐛Āfsࡨ॰tԀACDFRTUVarࡾࢩࢱࣦ࣠ࣼयज़ΐ४Ānrࢃ࢏gleBracket;柨rowƀ;BR࢙࢚࢞憐ar;懤ightArrow;懆eiling;挈oǵࢷ\0ࣃbleBracket;柦nǔࣈ\0࣒eeVector;楡ectorĀ;Bࣛࣜ懃ar;楙loor;挊ightĀAV࣯ࣵrrow;憔ector;楎Āerँगeƀ;AVउऊऐ抣rrow;憤ector;楚iangleƀ;BEतथऩ抲ar;槏qual;抴pƀDTVषूौownVector;楑eeVector;楠ectorĀ;Bॖॗ憿ar;楘ectorĀ;B॥०憼ar;楒ightáΜs̀EFGLSTॾঋকঝঢভqualGreater;拚ullEqual;扦reater;扶ess;檡lantEqual;橽ilde;扲r;쀀𝔏Ā;eঽা拘ftarrow;懚idot;䄿ƀnpw৔ਖਛgȀLRlr৞৷ਂਐeftĀAR০৬rrow;柵ightArrow;柷ightArrow;柶eftĀarγਊightáοightáϊf;쀀𝕃erĀLRਢਬeftArrow;憙ightArrow;憘ƀchtਾੀੂòࡌ;憰rok;䅁;扪Ѐacefiosuਗ਼੝੠੷੼અઋ઎p;椅y;䐜Ādl੥੯iumSpace;恟lintrf;愳r;쀀𝔐nusPlus;戓pf;쀀𝕄cò੶;䎜ҀJacefostuણધભીଔଙඑ඗ඞcy;䐊cute;䅃ƀaey઴હાron;䅇dil;䅅;䐝ƀgswે૰଎ativeƀMTV૓૟૨ediumSpace;怋hiĀcn૦૘ë૙eryThiî૙tedĀGL૸ଆreaterGreateòٳessLesóੈLine;䀊r;쀀𝔑ȀBnptଢନଷ଺reak;恠BreakingSpace;䂠f;愕ڀ;CDEGHLNPRSTV୕ୖ୪୼஡௫ఄ౞಄ದ೘ൡඅ櫬Āou୛୤ngruent;扢pCap;扭oubleVerticalBar;戦ƀlqxஃஊ஛ement;戉ualĀ;Tஒஓ扠ilde;쀀≂̸ists;戄reater΀;EFGLSTஶஷ஽௉௓௘௥扯qual;扱ullEqual;쀀≧̸reater;쀀≫̸ess;批lantEqual;쀀⩾̸ilde;扵umpń௲௽ownHump;쀀≎̸qual;쀀≏̸eĀfsఊధtTriangleƀ;BEచఛడ拪ar;쀀⧏̸qual;括s̀;EGLSTవశ఼ౄోౘ扮qual;扰reater;扸ess;쀀≪̸lantEqual;쀀⩽̸ilde;扴estedĀGL౨౹reaterGreater;쀀⪢̸essLess;쀀⪡̸recedesƀ;ESಒಓಛ技qual;쀀⪯̸lantEqual;拠ĀeiಫಹverseElement;戌ghtTriangleƀ;BEೋೌ೒拫ar;쀀⧐̸qual;拭ĀquೝഌuareSuĀbp೨೹setĀ;E೰ೳ쀀⊏̸qual;拢ersetĀ;Eഃആ쀀⊐̸qual;拣ƀbcpഓതൎsetĀ;Eഛഞ쀀⊂⃒qual;抈ceedsȀ;ESTലള഻െ抁qual;쀀⪰̸lantEqual;拡ilde;쀀≿̸ersetĀ;E൘൛쀀⊃⃒qual;抉ildeȀ;EFT൮൯൵ൿ扁qual;扄ullEqual;扇ilde;扉erticalBar;戤cr;쀀𝒩ilde耻Ñ䃑;䎝܀Eacdfgmoprstuvලෂ෉෕ෛ෠෧෼ขภยา฿ไlig;䅒cute耻Ó䃓Āiy෎ීrc耻Ô䃔;䐞blac;䅐r;쀀𝔒rave耻Ò䃒ƀaei෮ෲ෶cr;䅌ga;䎩cron;䎟pf;쀀𝕆enCurlyĀDQฎบoubleQuote;怜uote;怘;橔Āclวฬr;쀀𝒪ash耻Ø䃘iŬื฼de耻Õ䃕es;樷ml耻Ö䃖erĀBP๋๠Āar๐๓r;怾acĀek๚๜;揞et;掴arenthesis;揜Ҁacfhilors๿ງຊຏຒດຝະ໼rtialD;戂y;䐟r;쀀𝔓i;䎦;䎠usMinus;䂱Āipຢອncareplanåڝf;愙Ȁ;eio຺ູ໠໤檻cedesȀ;EST່້໏໚扺qual;檯lantEqual;扼ilde;找me;怳Ādp໩໮uct;戏ortionĀ;aȥ໹l;戝Āci༁༆r;쀀𝒫;䎨ȀUfos༑༖༛༟OT耻"䀢r;쀀𝔔pf;愚cr;쀀𝒬؀BEacefhiorsu༾གྷཇའཱིྦྷྪྭ႖ႩႴႾarr;椐G耻®䂮ƀcnrཎནབute;䅔g;柫rĀ;tཛྷཝ憠l;椖ƀaeyཧཬཱron;䅘dil;䅖;䐠Ā;vླྀཹ愜erseĀEUྂྙĀlq྇ྎement;戋uilibrium;懋pEquilibrium;楯r»ཹo;䎡ghtЀACDFTUVa࿁࿫࿳ဢဨၛႇϘĀnr࿆࿒gleBracket;柩rowƀ;BL࿜࿝࿡憒ar;懥eftArrow;懄eiling;按oǵ࿹\0စbleBracket;柧nǔည\0နeeVector;楝ectorĀ;Bဝသ懂ar;楕loor;挋Āerိ၃eƀ;AVဵံြ抢rrow;憦ector;楛iangleƀ;BEၐၑၕ抳ar;槐qual;抵pƀDTVၣၮၸownVector;楏eeVector;楜ectorĀ;Bႂႃ憾ar;楔ectorĀ;B႑႒懀ar;楓Āpuႛ႞f;愝ndImplies;楰ightarrow;懛ĀchႹႼr;愛;憱leDelayed;槴ڀHOacfhimoqstuფჱჷჽᄙᄞᅑᅖᅡᅧᆵᆻᆿĀCcჩხHcy;䐩y;䐨FTcy;䐬cute;䅚ʀ;aeiyᄈᄉᄎᄓᄗ檼ron;䅠dil;䅞rc;䅜;䐡r;쀀𝔖ortȀDLRUᄪᄴᄾᅉownArrow»ОeftArrow»࢚ightArrow»࿝pArrow;憑gma;䎣allCircle;战pf;쀀𝕊ɲᅭ\0\0ᅰt;戚areȀ;ISUᅻᅼᆉᆯ斡ntersection;抓uĀbpᆏᆞsetĀ;Eᆗᆘ抏qual;抑ersetĀ;Eᆨᆩ抐qual;抒nion;抔cr;쀀𝒮ar;拆ȀbcmpᇈᇛሉላĀ;sᇍᇎ拐etĀ;Eᇍᇕqual;抆ĀchᇠህeedsȀ;ESTᇭᇮᇴᇿ扻qual;檰lantEqual;扽ilde;承Tháྌ;我ƀ;esሒሓሣ拑rsetĀ;Eሜም抃qual;抇et»ሓրHRSacfhiorsሾቄ቉ቕ቞ቱቶኟዂወዑORN耻Þ䃞ADE;愢ĀHc቎ቒcy;䐋y;䐦Ābuቚቜ;䀉;䎤ƀaeyብቪቯron;䅤dil;䅢;䐢r;쀀𝔗Āeiቻ኉ǲኀ\0ኇefore;戴a;䎘Ācn኎ኘkSpace;쀀  Space;怉ldeȀ;EFTካኬኲኼ戼qual;扃ullEqual;扅ilde;扈pf;쀀𝕋ipleDot;惛Āctዖዛr;쀀𝒯rok;䅦ૡዷጎጚጦ\0ጬጱ\0\0\0\0\0ጸጽ፷ᎅ\0᏿ᐄᐊᐐĀcrዻጁute耻Ú䃚rĀ;oጇገ憟cir;楉rǣጓ\0጖y;䐎ve;䅬Āiyጞጣrc耻Û䃛;䐣blac;䅰r;쀀𝔘rave耻Ù䃙acr;䅪Ādiፁ፩erĀBPፈ፝Āarፍፐr;䁟acĀekፗፙ;揟et;掵arenthesis;揝onĀ;P፰፱拃lus;抎Āgp፻፿on;䅲f;쀀𝕌ЀADETadps᎕ᎮᎸᏄϨᏒᏗᏳrrowƀ;BDᅐᎠᎤar;椒ownArrow;懅ownArrow;憕quilibrium;楮eeĀ;AᏋᏌ报rrow;憥ownáϳerĀLRᏞᏨeftArrow;憖ightArrow;憗iĀ;lᏹᏺ䏒on;䎥ing;䅮cr;쀀𝒰ilde;䅨ml耻Ü䃜ҀDbcdefosvᐧᐬᐰᐳᐾᒅᒊᒐᒖash;披ar;櫫y;䐒ashĀ;lᐻᐼ抩;櫦Āerᑃᑅ;拁ƀbtyᑌᑐᑺar;怖Ā;iᑏᑕcalȀBLSTᑡᑥᑪᑴar;戣ine;䁼eparator;杘ilde;所ThinSpace;怊r;쀀𝔙pf;쀀𝕍cr;쀀𝒱dash;抪ʀcefosᒧᒬᒱᒶᒼirc;䅴dge;拀r;쀀𝔚pf;쀀𝕎cr;쀀𝒲Ȁfiosᓋᓐᓒᓘr;쀀𝔛;䎞pf;쀀𝕏cr;쀀𝒳ҀAIUacfosuᓱᓵᓹᓽᔄᔏᔔᔚᔠcy;䐯cy;䐇cy;䐮cute耻Ý䃝Āiyᔉᔍrc;䅶;䐫r;쀀𝔜pf;쀀𝕐cr;쀀𝒴ml;䅸ЀHacdefosᔵᔹᔿᕋᕏᕝᕠᕤcy;䐖cute;䅹Āayᕄᕉron;䅽;䐗ot;䅻ǲᕔ\0ᕛoWidtè૙a;䎖r;愨pf;愤cr;쀀𝒵௡ᖃᖊᖐ\0ᖰᖶᖿ\0\0\0\0ᗆᗛᗫᙟ᙭\0ᚕ᚛ᚲᚹ\0ᚾcute耻á䃡reve;䄃̀;Ediuyᖜᖝᖡᖣᖨᖭ戾;쀀∾̳;房rc耻â䃢te肻´̆;䐰lig耻æ䃦Ā;r²ᖺ;쀀𝔞rave耻à䃠ĀepᗊᗖĀfpᗏᗔsym;愵èᗓha;䎱ĀapᗟcĀclᗤᗧr;䄁g;樿ɤᗰ\0\0ᘊʀ;adsvᗺᗻᗿᘁᘇ戧nd;橕;橜lope;橘;橚΀;elmrszᘘᘙᘛᘞᘿᙏᙙ戠;榤e»ᘙsdĀ;aᘥᘦ戡ѡᘰᘲᘴᘶᘸᘺᘼᘾ;榨;榩;榪;榫;榬;榭;榮;榯tĀ;vᙅᙆ戟bĀ;dᙌᙍ抾;榝Āptᙔᙗh;戢»¹arr;捼Āgpᙣᙧon;䄅f;쀀𝕒΀;Eaeiop዁ᙻᙽᚂᚄᚇᚊ;橰cir;橯;扊d;手s;䀧roxĀ;e዁ᚒñᚃing耻å䃥ƀctyᚡᚦᚨr;쀀𝒶;䀪mpĀ;e዁ᚯñʈilde耻ã䃣ml耻ä䃤Āciᛂᛈoninôɲnt;樑ࠀNabcdefiklnoprsu᛭ᛱᜰ᜼ᝃᝈ᝸᝽០៦ᠹᡐᜍ᤽᥈ᥰot;櫭Ācrᛶ᜞kȀcepsᜀᜅᜍᜓong;扌psilon;䏶rime;怵imĀ;e᜚᜛戽q;拍Ŷᜢᜦee;抽edĀ;gᜬᜭ挅e»ᜭrkĀ;t፜᜷brk;掶Āoyᜁᝁ;䐱quo;怞ʀcmprtᝓ᝛ᝡᝤᝨausĀ;eĊĉptyv;榰séᜌnoõēƀahwᝯ᝱ᝳ;䎲;愶een;扬r;쀀𝔟g΀costuvwឍឝឳេ៕៛៞ƀaiuបពរðݠrc;旯p»፱ƀdptឤឨឭot;樀lus;樁imes;樂ɱឹ\0\0ើcup;樆ar;昅riangleĀdu៍្own;施p;斳plus;樄eåᑄåᒭarow;植ƀako៭ᠦᠵĀcn៲ᠣkƀlst៺֫᠂ozenge;槫riangleȀ;dlr᠒᠓᠘᠝斴own;斾eft;旂ight;斸k;搣Ʊᠫ\0ᠳƲᠯ\0ᠱ;斒;斑4;斓ck;斈ĀeoᠾᡍĀ;qᡃᡆ쀀=⃥uiv;쀀≡⃥t;挐Ȁptwxᡙᡞᡧᡬf;쀀𝕓Ā;tᏋᡣom»Ꮜtie;拈؀DHUVbdhmptuvᢅᢖᢪᢻᣗᣛᣬ᣿ᤅᤊᤐᤡȀLRlrᢎᢐᢒᢔ;敗;敔;敖;敓ʀ;DUduᢡᢢᢤᢦᢨ敐;敦;敩;敤;敧ȀLRlrᢳᢵᢷᢹ;敝;敚;敜;教΀;HLRhlrᣊᣋᣍᣏᣑᣓᣕ救;敬;散;敠;敫;敢;敟ox;槉ȀLRlrᣤᣦᣨᣪ;敕;敒;攐;攌ʀ;DUduڽ᣷᣹᣻᣽;敥;敨;攬;攴inus;抟lus;択imes;抠ȀLRlrᤙᤛᤝ᤟;敛;敘;攘;攔΀;HLRhlrᤰᤱᤳᤵᤷ᤻᤹攂;敪;敡;敞;攼;攤;攜Āevģ᥂bar耻¦䂦Ȁceioᥑᥖᥚᥠr;쀀𝒷mi;恏mĀ;e᜚᜜lƀ;bhᥨᥩᥫ䁜;槅sub;柈Ŭᥴ᥾lĀ;e᥹᥺怢t»᥺pƀ;Eeįᦅᦇ;檮Ā;qۜۛೡᦧ\0᧨ᨑᨕᨲ\0ᨷᩐ\0\0᪴\0\0᫁\0\0ᬡᬮ᭍᭒\0᯽\0ᰌƀcpr᦭ᦲ᧝ute;䄇̀;abcdsᦿᧀᧄ᧊᧕᧙戩nd;橄rcup;橉Āau᧏᧒p;橋p;橇ot;橀;쀀∩︀Āeo᧢᧥t;恁îړȀaeiu᧰᧻ᨁᨅǰ᧵\0᧸s;橍on;䄍dil耻ç䃧rc;䄉psĀ;sᨌᨍ橌m;橐ot;䄋ƀdmnᨛᨠᨦil肻¸ƭptyv;榲t脀¢;eᨭᨮ䂢räƲr;쀀𝔠ƀceiᨽᩀᩍy;䑇ckĀ;mᩇᩈ朓ark»ᩈ;䏇r΀;Ecefms᩟᩠ᩢᩫ᪤᪪᪮旋;槃ƀ;elᩩᩪᩭ䋆q;扗eɡᩴ\0\0᪈rrowĀlr᩼᪁eft;憺ight;憻ʀRSacd᪒᪔᪖᪚᪟»ཇ;擈st;抛irc;抚ash;抝nint;樐id;櫯cir;槂ubsĀ;u᪻᪼晣it»᪼ˬ᫇᫔᫺\0ᬊonĀ;eᫍᫎ䀺Ā;qÇÆɭ᫙\0\0᫢aĀ;t᫞᫟䀬;䁀ƀ;fl᫨᫩᫫戁îᅠeĀmx᫱᫶ent»᫩eóɍǧ᫾\0ᬇĀ;dኻᬂot;橭nôɆƀfryᬐᬔᬗ;쀀𝕔oäɔ脀©;sŕᬝr;愗Āaoᬥᬩrr;憵ss;朗Ācuᬲᬷr;쀀𝒸Ābpᬼ᭄Ā;eᭁᭂ櫏;櫑Ā;eᭉᭊ櫐;櫒dot;拯΀delprvw᭠᭬᭷ᮂᮬᯔ᯹arrĀlr᭨᭪;椸;椵ɰ᭲\0\0᭵r;拞c;拟arrĀ;p᭿ᮀ憶;椽̀;bcdosᮏᮐᮖᮡᮥᮨ截rcap;橈Āauᮛᮞp;橆p;橊ot;抍r;橅;쀀∪︀Ȁalrv᮵ᮿᯞᯣrrĀ;mᮼᮽ憷;椼yƀevwᯇᯔᯘqɰᯎ\0\0ᯒreã᭳uã᭵ee;拎edge;拏en耻¤䂤earrowĀlrᯮ᯳eft»ᮀight»ᮽeäᯝĀciᰁᰇoninôǷnt;戱lcty;挭ঀAHabcdefhijlorstuwz᰸᰻᰿ᱝᱩᱵᲊᲞᲬᲷ᳻᳿ᴍᵻᶑᶫᶻ᷆᷍rò΁ar;楥Ȁglrs᱈ᱍ᱒᱔ger;怠eth;愸òᄳhĀ;vᱚᱛ怐»ऊūᱡᱧarow;椏aã̕Āayᱮᱳron;䄏;䐴ƀ;ao̲ᱼᲄĀgrʿᲁr;懊tseq;橷ƀglmᲑᲔᲘ耻°䂰ta;䎴ptyv;榱ĀirᲣᲨsht;楿;쀀𝔡arĀlrᲳᲵ»ࣜ»သʀaegsv᳂͸᳖᳜᳠mƀ;oș᳊᳔ndĀ;ș᳑uit;晦amma;䏝in;拲ƀ;io᳧᳨᳸䃷de脀÷;o᳧ᳰntimes;拇nø᳷cy;䑒cɯᴆ\0\0ᴊrn;挞op;挍ʀlptuwᴘᴝᴢᵉᵕlar;䀤f;쀀𝕕ʀ;emps̋ᴭᴷᴽᵂqĀ;d͒ᴳot;扑inus;戸lus;戔quare;抡blebarwedgåúnƀadhᄮᵝᵧownarrowóᲃarpoonĀlrᵲᵶefôᲴighôᲶŢᵿᶅkaro÷གɯᶊ\0\0ᶎrn;挟op;挌ƀcotᶘᶣᶦĀryᶝᶡ;쀀𝒹;䑕l;槶rok;䄑Ādrᶰᶴot;拱iĀ;fᶺ᠖斿Āah᷀᷃ròЩaòྦangle;榦Āci᷒ᷕy;䑟grarr;柿ऀDacdefglmnopqrstuxḁḉḙḸոḼṉṡṾấắẽỡἪἷὄ὎὚ĀDoḆᴴoôᲉĀcsḎḔute耻é䃩ter;橮ȀaioyḢḧḱḶron;䄛rĀ;cḭḮ扖耻ê䃪lon;払;䑍ot;䄗ĀDrṁṅot;扒;쀀𝔢ƀ;rsṐṑṗ檚ave耻è䃨Ā;dṜṝ檖ot;檘Ȁ;ilsṪṫṲṴ檙nters;揧;愓Ā;dṹṺ檕ot;檗ƀapsẅẉẗcr;䄓tyƀ;svẒẓẕ戅et»ẓpĀ1;ẝẤĳạả;怄;怅怃ĀgsẪẬ;䅋p;怂ĀgpẴẸon;䄙f;쀀𝕖ƀalsỄỎỒrĀ;sỊị拕l;槣us;橱iƀ;lvỚớở䎵on»ớ;䏵ȀcsuvỪỳἋἣĀioữḱrc»Ḯɩỹ\0\0ỻíՈantĀglἂἆtr»ṝess»Ṻƀaeiἒ἖Ἒls;䀽st;扟vĀ;DȵἠD;橸parsl;槥ĀDaἯἳot;打rr;楱ƀcdiἾὁỸr;愯oô͒ĀahὉὋ;䎷耻ð䃰Āmrὓὗl耻ë䃫o;悬ƀcipὡὤὧl;䀡sôծĀeoὬὴctatioîՙnentialåչৡᾒ\0ᾞ\0ᾡᾧ\0\0ῆῌ\0ΐ\0ῦῪ \0 ⁚llingdotseñṄy;䑄male;晀ƀilrᾭᾳ῁lig;耀ﬃɩᾹ\0\0᾽g;耀ﬀig;耀ﬄ;쀀𝔣lig;耀ﬁlig;쀀fjƀaltῙ῜ῡt;晭ig;耀ﬂns;斱of;䆒ǰ΅\0ῳf;쀀𝕗ĀakֿῷĀ;vῼ´拔;櫙artint;樍Āao‌⁕Ācs‑⁒α‚‰‸⁅⁈\0⁐β•‥‧‪‬\0‮耻½䂽;慓耻¼䂼;慕;慙;慛Ƴ‴\0‶;慔;慖ʴ‾⁁\0\0⁃耻¾䂾;慗;慜5;慘ƶ⁌\0⁎;慚;慝8;慞l;恄wn;挢cr;쀀𝒻ࢀEabcdefgijlnorstv₂₉₟₥₰₴⃰⃵⃺⃿℃ℒℸ̗ℾ⅒↞Ā;lٍ₇;檌ƀcmpₐₕ₝ute;䇵maĀ;dₜ᳚䎳;檆reve;䄟Āiy₪₮rc;䄝;䐳ot;䄡Ȁ;lqsؾق₽⃉ƀ;qsؾٌ⃄lanô٥Ȁ;cdl٥⃒⃥⃕c;檩otĀ;o⃜⃝檀Ā;l⃢⃣檂;檄Ā;e⃪⃭쀀⋛︀s;檔r;쀀𝔤Ā;gٳ؛mel;愷cy;䑓Ȁ;Eajٚℌℎℐ;檒;檥;檤ȀEaesℛℝ℩ℴ;扩pĀ;p℣ℤ檊rox»ℤĀ;q℮ℯ檈Ā;q℮ℛim;拧pf;쀀𝕘Āci⅃ⅆr;愊mƀ;el٫ⅎ⅐;檎;檐茀>;cdlqr׮ⅠⅪⅮⅳⅹĀciⅥⅧ;檧r;橺ot;拗Par;榕uest;橼ʀadelsↄⅪ←ٖ↛ǰ↉\0↎proø₞r;楸qĀlqؿ↖lesó₈ií٫Āen↣↭rtneqq;쀀≩︀Å↪ԀAabcefkosy⇄⇇⇱⇵⇺∘∝∯≨≽ròΠȀilmr⇐⇔⇗⇛rsðᒄf»․ilôکĀdr⇠⇤cy;䑊ƀ;cwࣴ⇫⇯ir;楈;憭ar;意irc;䄥ƀalr∁∎∓rtsĀ;u∉∊晥it»∊lip;怦con;抹r;쀀𝔥sĀew∣∩arow;椥arow;椦ʀamopr∺∾≃≞≣rr;懿tht;戻kĀlr≉≓eftarrow;憩ightarrow;憪f;쀀𝕙bar;怕ƀclt≯≴≸r;쀀𝒽asè⇴rok;䄧Ābp⊂⊇ull;恃hen»ᱛૡ⊣\0⊪\0⊸⋅⋎\0⋕⋳\0\0⋸⌢⍧⍢⍿\0⎆⎪⎴cute耻í䃭ƀ;iyݱ⊰⊵rc耻î䃮;䐸Ācx⊼⊿y;䐵cl耻¡䂡ĀfrΟ⋉;쀀𝔦rave耻ì䃬Ȁ;inoܾ⋝⋩⋮Āin⋢⋦nt;樌t;戭fin;槜ta;愩lig;䄳ƀaop⋾⌚⌝ƀcgt⌅⌈⌗r;䄫ƀelpܟ⌏⌓inåގarôܠh;䄱f;抷ed;䆵ʀ;cfotӴ⌬⌱⌽⍁are;愅inĀ;t⌸⌹戞ie;槝doô⌙ʀ;celpݗ⍌⍐⍛⍡al;抺Āgr⍕⍙eróᕣã⍍arhk;樗rod;樼Ȁcgpt⍯⍲⍶⍻y;䑑on;䄯f;쀀𝕚a;䎹uest耻¿䂿Āci⎊⎏r;쀀𝒾nʀ;EdsvӴ⎛⎝⎡ӳ;拹ot;拵Ā;v⎦⎧拴;拳Ā;iݷ⎮lde;䄩ǫ⎸\0⎼cy;䑖l耻ï䃯̀cfmosu⏌⏗⏜⏡⏧⏵Āiy⏑⏕rc;䄵;䐹r;쀀𝔧ath;䈷pf;쀀𝕛ǣ⏬\0⏱r;쀀𝒿rcy;䑘kcy;䑔Ѐacfghjos␋␖␢␧␭␱␵␻ppaĀ;v␓␔䎺;䏰Āey␛␠dil;䄷;䐺r;쀀𝔨reen;䄸cy;䑅cy;䑜pf;쀀𝕜cr;쀀𝓀஀ABEHabcdefghjlmnoprstuv⑰⒁⒆⒍⒑┎┽╚▀♎♞♥♹♽⚚⚲⛘❝❨➋⟀⠁⠒ƀart⑷⑺⑼rò৆òΕail;椛arr;椎Ā;gঔ⒋;檋ar;楢ॣ⒥\0⒪\0⒱\0\0\0\0\0⒵Ⓔ\0ⓆⓈⓍ\0⓹ute;䄺mptyv;榴raîࡌbda;䎻gƀ;dlࢎⓁⓃ;榑åࢎ;檅uo耻«䂫rЀ;bfhlpst࢙ⓞⓦⓩ⓫⓮⓱⓵Ā;f࢝ⓣs;椟s;椝ë≒p;憫l;椹im;楳l;憢ƀ;ae⓿─┄檫il;椙Ā;s┉┊檭;쀀⪭︀ƀabr┕┙┝rr;椌rk;杲Āak┢┬cĀek┨┪;䁻;䁛Āes┱┳;榋lĀdu┹┻;榏;榍Ȁaeuy╆╋╖╘ron;䄾Ādi═╔il;䄼ìࢰâ┩;䐻Ȁcqrs╣╦╭╽a;椶uoĀ;rนᝆĀdu╲╷har;楧shar;楋h;憲ʀ;fgqs▋▌উ◳◿扤tʀahlrt▘▤▷◂◨rrowĀ;t࢙□aé⓶arpoonĀdu▯▴own»њp»०eftarrows;懇ightƀahs◍◖◞rrowĀ;sࣴࢧarpoonó྘quigarro÷⇰hreetimes;拋ƀ;qs▋ও◺lanôবʀ;cdgsব☊☍☝☨c;檨otĀ;o☔☕橿Ā;r☚☛檁;檃Ā;e☢☥쀀⋚︀s;檓ʀadegs☳☹☽♉♋pproøⓆot;拖qĀgq♃♅ôউgtò⒌ôছiíলƀilr♕࣡♚sht;楼;쀀𝔩Ā;Eজ♣;檑š♩♶rĀdu▲♮Ā;l॥♳;楪lk;斄cy;䑙ʀ;achtੈ⚈⚋⚑⚖rò◁orneòᴈard;楫ri;旺Āio⚟⚤dot;䅀ustĀ;a⚬⚭掰che»⚭ȀEaes⚻⚽⛉⛔;扨pĀ;p⛃⛄檉rox»⛄Ā;q⛎⛏檇Ā;q⛎⚻im;拦Ѐabnoptwz⛩⛴⛷✚✯❁❇❐Ānr⛮⛱g;柬r;懽rëࣁgƀlmr⛿✍✔eftĀar০✇ightá৲apsto;柼ightá৽parrowĀlr✥✩efô⓭ight;憬ƀafl✶✹✽r;榅;쀀𝕝us;樭imes;樴š❋❏st;戗áፎƀ;ef❗❘᠀旊nge»❘arĀ;l❤❥䀨t;榓ʀachmt❳❶❼➅➇ròࢨorneòᶌarĀ;d྘➃;業;怎ri;抿̀achiqt➘➝ੀ➢➮➻quo;怹r;쀀𝓁mƀ;egল➪➬;檍;檏Ābu┪➳oĀ;rฟ➹;怚rok;䅂萀<;cdhilqrࠫ⟒☹⟜⟠⟥⟪⟰Āci⟗⟙;檦r;橹reå◲mes;拉arr;楶uest;橻ĀPi⟵⟹ar;榖ƀ;ef⠀भ᠛旃rĀdu⠇⠍shar;楊har;楦Āen⠗⠡rtneqq;쀀≨︀Å⠞܀Dacdefhilnopsu⡀⡅⢂⢎⢓⢠⢥⢨⣚⣢⣤ઃ⣳⤂Dot;戺Ȁclpr⡎⡒⡣⡽r耻¯䂯Āet⡗⡙;時Ā;e⡞⡟朠se»⡟Ā;sျ⡨toȀ;dluျ⡳⡷⡻owîҌefôएðᏑker;斮Āoy⢇⢌mma;権;䐼ash;怔asuredangle»ᘦr;쀀𝔪o;愧ƀcdn⢯⢴⣉ro耻µ䂵Ȁ;acdᑤ⢽⣀⣄sôᚧir;櫰ot肻·Ƶusƀ;bd⣒ᤃ⣓戒Ā;uᴼ⣘;横ţ⣞⣡p;櫛ò−ðઁĀdp⣩⣮els;抧f;쀀𝕞Āct⣸⣽r;쀀𝓂pos»ᖝƀ;lm⤉⤊⤍䎼timap;抸ఀGLRVabcdefghijlmoprstuvw⥂⥓⥾⦉⦘⧚⧩⨕⨚⩘⩝⪃⪕⪤⪨⬄⬇⭄⭿⮮ⰴⱧⱼ⳩Āgt⥇⥋;쀀⋙̸Ā;v⥐௏쀀≫⃒ƀelt⥚⥲⥶ftĀar⥡⥧rrow;懍ightarrow;懎;쀀⋘̸Ā;v⥻ే쀀≪⃒ightarrow;懏ĀDd⦎⦓ash;抯ash;抮ʀbcnpt⦣⦧⦬⦱⧌la»˞ute;䅄g;쀀∠⃒ʀ;Eiop඄⦼⧀⧅⧈;쀀⩰̸d;쀀≋̸s;䅉roø඄urĀ;a⧓⧔普lĀ;s⧓ସǳ⧟\0⧣p肻 ଷmpĀ;e௹ఀʀaeouy⧴⧾⨃⨐⨓ǰ⧹\0⧻;橃on;䅈dil;䅆ngĀ;dൾ⨊ot;쀀⩭̸p;橂;䐽ash;怓΀;Aadqsxஒ⨩⨭⨻⩁⩅⩐rr;懗rĀhr⨳⨶k;椤Ā;oᏲᏰot;쀀≐̸uiöୣĀei⩊⩎ar;椨í஘istĀ;s஠டr;쀀𝔫ȀEest௅⩦⩹⩼ƀ;qs஼⩭௡ƀ;qs஼௅⩴lanô௢ií௪Ā;rஶ⪁»ஷƀAap⪊⪍⪑rò⥱rr;憮ar;櫲ƀ;svྍ⪜ྌĀ;d⪡⪢拼;拺cy;䑚΀AEadest⪷⪺⪾⫂⫅⫶⫹rò⥦;쀀≦̸rr;憚r;急Ȁ;fqs఻⫎⫣⫯tĀar⫔⫙rro÷⫁ightarro÷⪐ƀ;qs఻⪺⫪lanôౕĀ;sౕ⫴»శiíౝĀ;rవ⫾iĀ;eచథiäඐĀpt⬌⬑f;쀀𝕟膀¬;in⬙⬚⬶䂬nȀ;Edvஉ⬤⬨⬮;쀀⋹̸ot;쀀⋵̸ǡஉ⬳⬵;拷;拶iĀ;vಸ⬼ǡಸ⭁⭃;拾;拽ƀaor⭋⭣⭩rȀ;ast୻⭕⭚⭟lleì୻l;쀀⫽⃥;쀀∂̸lint;樔ƀ;ceಒ⭰⭳uåಥĀ;cಘ⭸Ā;eಒ⭽ñಘȀAait⮈⮋⮝⮧rò⦈rrƀ;cw⮔⮕⮙憛;쀀⤳̸;쀀↝̸ghtarrow»⮕riĀ;eೋೖ΀chimpqu⮽⯍⯙⬄୸⯤⯯Ȁ;cerല⯆ഷ⯉uå൅;쀀𝓃ortɭ⬅\0\0⯖ará⭖mĀ;e൮⯟Ā;q൴൳suĀbp⯫⯭å೸åഋƀbcp⯶ⰑⰙȀ;Ees⯿ⰀഢⰄ抄;쀀⫅̸etĀ;eഛⰋqĀ;qണⰀcĀ;eലⰗñസȀ;EesⰢⰣൟⰧ抅;쀀⫆̸etĀ;e൘ⰮqĀ;qൠⰣȀgilrⰽⰿⱅⱇìௗlde耻ñ䃱çృiangleĀlrⱒⱜeftĀ;eచⱚñదightĀ;eೋⱥñ೗Ā;mⱬⱭ䎽ƀ;esⱴⱵⱹ䀣ro;愖p;怇ҀDHadgilrsⲏⲔⲙⲞⲣⲰⲶⳓⳣash;抭arr;椄p;쀀≍⃒ash;抬ĀetⲨⲬ;쀀≥⃒;쀀>⃒nfin;槞ƀAetⲽⳁⳅrr;椂;쀀≤⃒Ā;rⳊⳍ쀀<⃒ie;쀀⊴⃒ĀAtⳘⳜrr;椃rie;쀀⊵⃒im;쀀∼⃒ƀAan⳰⳴ⴂrr;懖rĀhr⳺⳽k;椣Ā;oᏧᏥear;椧ቓ᪕\0\0\0\0\0\0\0\0\0\0\0\0\0ⴭ\0ⴸⵈⵠⵥ⵲ⶄᬇ\0\0ⶍⶫ\0ⷈⷎ\0ⷜ⸙⸫⸾⹃Ācsⴱ᪗ute耻ó䃳ĀiyⴼⵅrĀ;c᪞ⵂ耻ô䃴;䐾ʀabios᪠ⵒⵗǈⵚlac;䅑v;樸old;榼lig;䅓Ācr⵩⵭ir;榿;쀀𝔬ͯ⵹\0\0⵼\0ⶂn;䋛ave耻ò䃲;槁Ābmⶈ෴ar;榵Ȁacitⶕ⶘ⶥⶨrò᪀Āir⶝ⶠr;榾oss;榻nå๒;槀ƀaeiⶱⶵⶹcr;䅍ga;䏉ƀcdnⷀⷅǍron;䎿;榶pf;쀀𝕠ƀaelⷔ⷗ǒr;榷rp;榹΀;adiosvⷪⷫⷮ⸈⸍⸐⸖戨rò᪆Ȁ;efmⷷⷸ⸂⸅橝rĀ;oⷾⷿ愴f»ⷿ耻ª䂪耻º䂺gof;抶r;橖lope;橗;橛ƀclo⸟⸡⸧ò⸁ash耻ø䃸l;折iŬⸯ⸴de耻õ䃵esĀ;aǛ⸺s;樶ml耻ö䃶bar;挽ૡ⹞\0⹽\0⺀⺝\0⺢⺹\0\0⻋ຜ\0⼓\0\0⼫⾼\0⿈rȀ;astЃ⹧⹲຅脀¶;l⹭⹮䂶leìЃɩ⹸\0\0⹻m;櫳;櫽y;䐿rʀcimpt⺋⺏⺓ᡥ⺗nt;䀥od;䀮il;怰enk;怱r;쀀𝔭ƀimo⺨⺰⺴Ā;v⺭⺮䏆;䏕maô੶ne;明ƀ;tv⺿⻀⻈䏀chfork»´;䏖Āau⻏⻟nĀck⻕⻝kĀ;h⇴⻛;愎ö⇴sҀ;abcdemst⻳⻴ᤈ⻹⻽⼄⼆⼊⼎䀫cir;樣ir;樢Āouᵀ⼂;樥;橲n肻±ຝim;樦wo;樧ƀipu⼙⼠⼥ntint;樕f;쀀𝕡nd耻£䂣Ԁ;Eaceinosu່⼿⽁⽄⽇⾁⾉⾒⽾⾶;檳p;檷uå໙Ā;c໎⽌̀;acens່⽙⽟⽦⽨⽾pproø⽃urlyeñ໙ñ໎ƀaes⽯⽶⽺pprox;檹qq;檵im;拨iíໟmeĀ;s⾈ຮ怲ƀEas⽸⾐⽺ð⽵ƀdfp໬⾙⾯ƀals⾠⾥⾪lar;挮ine;挒urf;挓Ā;t໻⾴ï໻rel;抰Āci⿀⿅r;쀀𝓅;䏈ncsp;怈̀fiopsu⿚⋢⿟⿥⿫⿱r;쀀𝔮pf;쀀𝕢rime;恗cr;쀀𝓆ƀaeo⿸〉〓tĀei⿾々rnionóڰnt;樖stĀ;e【】䀿ñἙô༔઀ABHabcdefhilmnoprstux぀けさすムㄎㄫㅇㅢㅲㆎ㈆㈕㈤㈩㉘㉮㉲㊐㊰㊷ƀartぇおがròႳòϝail;検aròᱥar;楤΀cdenqrtとふへみわゔヌĀeuねぱ;쀀∽̱te;䅕iãᅮmptyv;榳gȀ;del࿑らるろ;榒;榥å࿑uo耻»䂻rր;abcfhlpstw࿜ガクシスゼゾダッデナp;極Ā;f࿠ゴs;椠;椳s;椞ë≝ð✮l;楅im;楴l;憣;憝Āaiパフil;椚oĀ;nホボ戶aló༞ƀabrョリヮrò៥rk;杳ĀakンヽcĀekヹ・;䁽;䁝Āes㄂㄄;榌lĀduㄊㄌ;榎;榐Ȁaeuyㄗㄜㄧㄩron;䅙Ādiㄡㄥil;䅗ì࿲âヺ;䑀Ȁclqsㄴㄷㄽㅄa;椷dhar;楩uoĀ;rȎȍh;憳ƀacgㅎㅟངlȀ;ipsླྀㅘㅛႜnåႻarôྩt;断ƀilrㅩဣㅮsht;楽;쀀𝔯ĀaoㅷㆆrĀduㅽㅿ»ѻĀ;l႑ㆄ;楬Ā;vㆋㆌ䏁;䏱ƀgns㆕ㇹㇼht̀ahlrstㆤㆰ㇂㇘㇤㇮rrowĀ;t࿜ㆭaéトarpoonĀduㆻㆿowîㅾp»႒eftĀah㇊㇐rrowó࿪arpoonóՑightarrows;應quigarro÷ニhreetimes;拌g;䋚ingdotseñἲƀahm㈍㈐㈓rò࿪aòՑ;怏oustĀ;a㈞㈟掱che»㈟mid;櫮Ȁabpt㈲㈽㉀㉒Ānr㈷㈺g;柭r;懾rëဃƀafl㉇㉊㉎r;榆;쀀𝕣us;樮imes;樵Āap㉝㉧rĀ;g㉣㉤䀩t;榔olint;樒arò㇣Ȁachq㉻㊀Ⴜ㊅quo;怺r;쀀𝓇Ābu・㊊oĀ;rȔȓƀhir㊗㊛㊠reåㇸmes;拊iȀ;efl㊪ၙᠡ㊫方tri;槎luhar;楨;愞ൡ㋕㋛㋟㌬㌸㍱\0㍺㎤\0\0㏬㏰\0㐨㑈㑚㒭㒱㓊㓱\0㘖\0\0㘳cute;䅛quï➺Ԁ;Eaceinpsyᇭ㋳㋵㋿㌂㌋㌏㌟㌦㌩;檴ǰ㋺\0㋼;檸on;䅡uåᇾĀ;dᇳ㌇il;䅟rc;䅝ƀEas㌖㌘㌛;檶p;檺im;择olint;樓iíሄ;䑁otƀ;be㌴ᵇ㌵担;橦΀Aacmstx㍆㍊㍗㍛㍞㍣㍭rr;懘rĀhr㍐㍒ë∨Ā;oਸ਼਴t耻§䂧i;䀻war;椩mĀin㍩ðnuóñt;朶rĀ;o㍶⁕쀀𝔰Ȁacoy㎂㎆㎑㎠rp;景Āhy㎋㎏cy;䑉;䑈rtɭ㎙\0\0㎜iäᑤaraì⹯耻­䂭Āgm㎨㎴maƀ;fv㎱㎲㎲䏃;䏂Ѐ;deglnprካ㏅㏉㏎㏖㏞㏡㏦ot;橪Ā;q኱ኰĀ;E㏓㏔檞;檠Ā;E㏛㏜檝;檟e;扆lus;樤arr;楲aròᄽȀaeit㏸㐈㐏㐗Āls㏽㐄lsetmé㍪hp;樳parsl;槤Ādlᑣ㐔e;挣Ā;e㐜㐝檪Ā;s㐢㐣檬;쀀⪬︀ƀflp㐮㐳㑂tcy;䑌Ā;b㐸㐹䀯Ā;a㐾㐿槄r;挿f;쀀𝕤aĀdr㑍ЂesĀ;u㑔㑕晠it»㑕ƀcsu㑠㑹㒟Āau㑥㑯pĀ;sᆈ㑫;쀀⊓︀pĀ;sᆴ㑵;쀀⊔︀uĀbp㑿㒏ƀ;esᆗᆜ㒆etĀ;eᆗ㒍ñᆝƀ;esᆨᆭ㒖etĀ;eᆨ㒝ñᆮƀ;afᅻ㒦ְrť㒫ֱ»ᅼaròᅈȀcemt㒹㒾㓂㓅r;쀀𝓈tmîñiì㐕aræᆾĀar㓎㓕rĀ;f㓔ឿ昆Āan㓚㓭ightĀep㓣㓪psiloîỠhé⺯s»⡒ʀbcmnp㓻㕞ሉ㖋㖎Ҁ;Edemnprs㔎㔏㔑㔕㔞㔣㔬㔱㔶抂;櫅ot;檽Ā;dᇚ㔚ot;櫃ult;櫁ĀEe㔨㔪;櫋;把lus;檿arr;楹ƀeiu㔽㕒㕕tƀ;en㔎㕅㕋qĀ;qᇚ㔏eqĀ;q㔫㔨m;櫇Ābp㕚㕜;櫕;櫓c̀;acensᇭ㕬㕲㕹㕻㌦pproø㋺urlyeñᇾñᇳƀaes㖂㖈㌛pproø㌚qñ㌗g;晪ڀ123;Edehlmnps㖩㖬㖯ሜ㖲㖴㗀㗉㗕㗚㗟㗨㗭耻¹䂹耻²䂲耻³䂳;櫆Āos㖹㖼t;檾ub;櫘Ā;dሢ㗅ot;櫄sĀou㗏㗒l;柉b;櫗arr;楻ult;櫂ĀEe㗤㗦;櫌;抋lus;櫀ƀeiu㗴㘉㘌tƀ;enሜ㗼㘂qĀ;qሢ㖲eqĀ;q㗧㗤m;櫈Ābp㘑㘓;櫔;櫖ƀAan㘜㘠㘭rr;懙rĀhr㘦㘨ë∮Ā;oਫ਩war;椪lig耻ß䃟௡㙑㙝㙠ዎ㙳㙹\0㙾㛂\0\0\0\0\0㛛㜃\0㜉㝬\0\0\0㞇ɲ㙖\0\0㙛get;挖;䏄rë๟ƀaey㙦㙫㙰ron;䅥dil;䅣;䑂lrec;挕r;쀀𝔱Ȁeiko㚆㚝㚵㚼ǲ㚋\0㚑eĀ4fኄኁaƀ;sv㚘㚙㚛䎸ym;䏑Ācn㚢㚲kĀas㚨㚮pproø዁im»ኬsðኞĀas㚺㚮ð዁rn耻þ䃾Ǭ̟㛆⋧es膀×;bd㛏㛐㛘䃗Ā;aᤏ㛕r;樱;樰ƀeps㛡㛣㜀á⩍Ȁ;bcf҆㛬㛰㛴ot;挶ir;櫱Ā;o㛹㛼쀀𝕥rk;櫚á㍢rime;怴ƀaip㜏㜒㝤dåቈ΀adempst㜡㝍㝀㝑㝗㝜㝟ngleʀ;dlqr㜰㜱㜶㝀㝂斵own»ᶻeftĀ;e⠀㜾ñम;扜ightĀ;e㊪㝋ñၚot;旬inus;樺lus;樹b;槍ime;樻ezium;揢ƀcht㝲㝽㞁Āry㝷㝻;쀀𝓉;䑆cy;䑛rok;䅧Āio㞋㞎xô᝷headĀlr㞗㞠eftarro÷ࡏightarrow»ཝऀAHabcdfghlmoprstuw㟐㟓㟗㟤㟰㟼㠎㠜㠣㠴㡑㡝㡫㢩㣌㣒㣪㣶ròϭar;楣Ācr㟜㟢ute耻ú䃺òᅐrǣ㟪\0㟭y;䑞ve;䅭Āiy㟵㟺rc耻û䃻;䑃ƀabh㠃㠆㠋ròᎭlac;䅱aòᏃĀir㠓㠘sht;楾;쀀𝔲rave耻ù䃹š㠧㠱rĀlr㠬㠮»ॗ»ႃlk;斀Āct㠹㡍ɯ㠿\0\0㡊rnĀ;e㡅㡆挜r»㡆op;挏ri;旸Āal㡖㡚cr;䅫肻¨͉Āgp㡢㡦on;䅳f;쀀𝕦̀adhlsuᅋ㡸㡽፲㢑㢠ownáᎳarpoonĀlr㢈㢌efô㠭ighô㠯iƀ;hl㢙㢚㢜䏅»ᏺon»㢚parrows;懈ƀcit㢰㣄㣈ɯ㢶\0\0㣁rnĀ;e㢼㢽挝r»㢽op;挎ng;䅯ri;旹cr;쀀𝓊ƀdir㣙㣝㣢ot;拰lde;䅩iĀ;f㜰㣨»᠓Āam㣯㣲rò㢨l耻ü䃼angle;榧ހABDacdeflnoprsz㤜㤟㤩㤭㦵㦸㦽㧟㧤㧨㧳㧹㧽㨁㨠ròϷarĀ;v㤦㤧櫨;櫩asèϡĀnr㤲㤷grt;榜΀eknprst㓣㥆㥋㥒㥝㥤㦖appá␕othinçẖƀhir㓫⻈㥙opô⾵Ā;hᎷ㥢ïㆍĀiu㥩㥭gmá㎳Ābp㥲㦄setneqĀ;q㥽㦀쀀⊊︀;쀀⫋︀setneqĀ;q㦏㦒쀀⊋︀;쀀⫌︀Āhr㦛㦟etá㚜iangleĀlr㦪㦯eft»थight»ၑy;䐲ash»ံƀelr㧄㧒㧗ƀ;beⷪ㧋㧏ar;抻q;扚lip;拮Ābt㧜ᑨaòᑩr;쀀𝔳tré㦮suĀbp㧯㧱»ജ»൙pf;쀀𝕧roð໻tré㦴Ācu㨆㨋r;쀀𝓋Ābp㨐㨘nĀEe㦀㨖»㥾nĀEe㦒㨞»㦐igzag;榚΀cefoprs㨶㨻㩖㩛㩔㩡㩪irc;䅵Ādi㩀㩑Ābg㩅㩉ar;機eĀ;qᗺ㩏;扙erp;愘r;쀀𝔴pf;쀀𝕨Ā;eᑹ㩦atèᑹcr;쀀𝓌ૣណ㪇\0㪋\0㪐㪛\0\0㪝㪨㪫㪯\0\0㫃㫎\0㫘ៜ៟tré៑r;쀀𝔵ĀAa㪔㪗ròσrò৶;䎾ĀAa㪡㪤ròθrò৫að✓is;拻ƀdptឤ㪵㪾Āfl㪺ឩ;쀀𝕩imåឲĀAa㫇㫊ròώròਁĀcq㫒ីr;쀀𝓍Āpt៖㫜ré។Ѐacefiosu㫰㫽㬈㬌㬑㬕㬛㬡cĀuy㫶㫻te耻ý䃽;䑏Āiy㬂㬆rc;䅷;䑋n耻¥䂥r;쀀𝔶cy;䑗pf;쀀𝕪cr;쀀𝓎Ācm㬦㬩y;䑎l耻ÿ䃿Ԁacdefhiosw㭂㭈㭔㭘㭤㭩㭭㭴㭺㮀cute;䅺Āay㭍㭒ron;䅾;䐷ot;䅼Āet㭝㭡træᕟa;䎶r;쀀𝔷cy;䐶grarr;懝pf;쀀𝕫cr;쀀𝓏Ājn㮅㮇;怍j;怌'.split("").map((function(e){return e.charCodeAt(0)})))},6041:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=new Uint16Array("Ȁaglq\tɭ\0\0p;䀦os;䀧t;䀾t;䀼uot;䀢".split("").map((function(e){return e.charCodeAt(0)})))},7751:(e,t)=>{"use strict"
function r(e){for(var t=1;t<e.length;t++)e[t][0]+=e[t-1][0]+1
return e}Object.defineProperty(t,"__esModule",{value:!0}),t.default=new Map(r([[9,"&Tab;"],[0,"&NewLine;"],[22,"&excl;"],[0,"&quot;"],[0,"&num;"],[0,"&dollar;"],[0,"&percnt;"],[0,"&amp;"],[0,"&apos;"],[0,"&lpar;"],[0,"&rpar;"],[0,"&ast;"],[0,"&plus;"],[0,"&comma;"],[1,"&period;"],[0,"&sol;"],[10,"&colon;"],[0,"&semi;"],[0,{v:"&lt;",n:8402,o:"&nvlt;"}],[0,{v:"&equals;",n:8421,o:"&bne;"}],[0,{v:"&gt;",n:8402,o:"&nvgt;"}],[0,"&quest;"],[0,"&commat;"],[26,"&lbrack;"],[0,"&bsol;"],[0,"&rbrack;"],[0,"&Hat;"],[0,"&lowbar;"],[0,"&DiacriticalGrave;"],[5,{n:106,o:"&fjlig;"}],[20,"&lbrace;"],[0,"&verbar;"],[0,"&rbrace;"],[34,"&nbsp;"],[0,"&iexcl;"],[0,"&cent;"],[0,"&pound;"],[0,"&curren;"],[0,"&yen;"],[0,"&brvbar;"],[0,"&sect;"],[0,"&die;"],[0,"&copy;"],[0,"&ordf;"],[0,"&laquo;"],[0,"&not;"],[0,"&shy;"],[0,"&circledR;"],[0,"&macr;"],[0,"&deg;"],[0,"&PlusMinus;"],[0,"&sup2;"],[0,"&sup3;"],[0,"&acute;"],[0,"&micro;"],[0,"&para;"],[0,"&centerdot;"],[0,"&cedil;"],[0,"&sup1;"],[0,"&ordm;"],[0,"&raquo;"],[0,"&frac14;"],[0,"&frac12;"],[0,"&frac34;"],[0,"&iquest;"],[0,"&Agrave;"],[0,"&Aacute;"],[0,"&Acirc;"],[0,"&Atilde;"],[0,"&Auml;"],[0,"&angst;"],[0,"&AElig;"],[0,"&Ccedil;"],[0,"&Egrave;"],[0,"&Eacute;"],[0,"&Ecirc;"],[0,"&Euml;"],[0,"&Igrave;"],[0,"&Iacute;"],[0,"&Icirc;"],[0,"&Iuml;"],[0,"&ETH;"],[0,"&Ntilde;"],[0,"&Ograve;"],[0,"&Oacute;"],[0,"&Ocirc;"],[0,"&Otilde;"],[0,"&Ouml;"],[0,"&times;"],[0,"&Oslash;"],[0,"&Ugrave;"],[0,"&Uacute;"],[0,"&Ucirc;"],[0,"&Uuml;"],[0,"&Yacute;"],[0,"&THORN;"],[0,"&szlig;"],[0,"&agrave;"],[0,"&aacute;"],[0,"&acirc;"],[0,"&atilde;"],[0,"&auml;"],[0,"&aring;"],[0,"&aelig;"],[0,"&ccedil;"],[0,"&egrave;"],[0,"&eacute;"],[0,"&ecirc;"],[0,"&euml;"],[0,"&igrave;"],[0,"&iacute;"],[0,"&icirc;"],[0,"&iuml;"],[0,"&eth;"],[0,"&ntilde;"],[0,"&ograve;"],[0,"&oacute;"],[0,"&ocirc;"],[0,"&otilde;"],[0,"&ouml;"],[0,"&div;"],[0,"&oslash;"],[0,"&ugrave;"],[0,"&uacute;"],[0,"&ucirc;"],[0,"&uuml;"],[0,"&yacute;"],[0,"&thorn;"],[0,"&yuml;"],[0,"&Amacr;"],[0,"&amacr;"],[0,"&Abreve;"],[0,"&abreve;"],[0,"&Aogon;"],[0,"&aogon;"],[0,"&Cacute;"],[0,"&cacute;"],[0,"&Ccirc;"],[0,"&ccirc;"],[0,"&Cdot;"],[0,"&cdot;"],[0,"&Ccaron;"],[0,"&ccaron;"],[0,"&Dcaron;"],[0,"&dcaron;"],[0,"&Dstrok;"],[0,"&dstrok;"],[0,"&Emacr;"],[0,"&emacr;"],[2,"&Edot;"],[0,"&edot;"],[0,"&Eogon;"],[0,"&eogon;"],[0,"&Ecaron;"],[0,"&ecaron;"],[0,"&Gcirc;"],[0,"&gcirc;"],[0,"&Gbreve;"],[0,"&gbreve;"],[0,"&Gdot;"],[0,"&gdot;"],[0,"&Gcedil;"],[1,"&Hcirc;"],[0,"&hcirc;"],[0,"&Hstrok;"],[0,"&hstrok;"],[0,"&Itilde;"],[0,"&itilde;"],[0,"&Imacr;"],[0,"&imacr;"],[2,"&Iogon;"],[0,"&iogon;"],[0,"&Idot;"],[0,"&imath;"],[0,"&IJlig;"],[0,"&ijlig;"],[0,"&Jcirc;"],[0,"&jcirc;"],[0,"&Kcedil;"],[0,"&kcedil;"],[0,"&kgreen;"],[0,"&Lacute;"],[0,"&lacute;"],[0,"&Lcedil;"],[0,"&lcedil;"],[0,"&Lcaron;"],[0,"&lcaron;"],[0,"&Lmidot;"],[0,"&lmidot;"],[0,"&Lstrok;"],[0,"&lstrok;"],[0,"&Nacute;"],[0,"&nacute;"],[0,"&Ncedil;"],[0,"&ncedil;"],[0,"&Ncaron;"],[0,"&ncaron;"],[0,"&napos;"],[0,"&ENG;"],[0,"&eng;"],[0,"&Omacr;"],[0,"&omacr;"],[2,"&Odblac;"],[0,"&odblac;"],[0,"&OElig;"],[0,"&oelig;"],[0,"&Racute;"],[0,"&racute;"],[0,"&Rcedil;"],[0,"&rcedil;"],[0,"&Rcaron;"],[0,"&rcaron;"],[0,"&Sacute;"],[0,"&sacute;"],[0,"&Scirc;"],[0,"&scirc;"],[0,"&Scedil;"],[0,"&scedil;"],[0,"&Scaron;"],[0,"&scaron;"],[0,"&Tcedil;"],[0,"&tcedil;"],[0,"&Tcaron;"],[0,"&tcaron;"],[0,"&Tstrok;"],[0,"&tstrok;"],[0,"&Utilde;"],[0,"&utilde;"],[0,"&Umacr;"],[0,"&umacr;"],[0,"&Ubreve;"],[0,"&ubreve;"],[0,"&Uring;"],[0,"&uring;"],[0,"&Udblac;"],[0,"&udblac;"],[0,"&Uogon;"],[0,"&uogon;"],[0,"&Wcirc;"],[0,"&wcirc;"],[0,"&Ycirc;"],[0,"&ycirc;"],[0,"&Yuml;"],[0,"&Zacute;"],[0,"&zacute;"],[0,"&Zdot;"],[0,"&zdot;"],[0,"&Zcaron;"],[0,"&zcaron;"],[19,"&fnof;"],[34,"&imped;"],[63,"&gacute;"],[65,"&jmath;"],[142,"&circ;"],[0,"&caron;"],[16,"&breve;"],[0,"&DiacriticalDot;"],[0,"&ring;"],[0,"&ogon;"],[0,"&DiacriticalTilde;"],[0,"&dblac;"],[51,"&DownBreve;"],[127,"&Alpha;"],[0,"&Beta;"],[0,"&Gamma;"],[0,"&Delta;"],[0,"&Epsilon;"],[0,"&Zeta;"],[0,"&Eta;"],[0,"&Theta;"],[0,"&Iota;"],[0,"&Kappa;"],[0,"&Lambda;"],[0,"&Mu;"],[0,"&Nu;"],[0,"&Xi;"],[0,"&Omicron;"],[0,"&Pi;"],[0,"&Rho;"],[1,"&Sigma;"],[0,"&Tau;"],[0,"&Upsilon;"],[0,"&Phi;"],[0,"&Chi;"],[0,"&Psi;"],[0,"&ohm;"],[7,"&alpha;"],[0,"&beta;"],[0,"&gamma;"],[0,"&delta;"],[0,"&epsi;"],[0,"&zeta;"],[0,"&eta;"],[0,"&theta;"],[0,"&iota;"],[0,"&kappa;"],[0,"&lambda;"],[0,"&mu;"],[0,"&nu;"],[0,"&xi;"],[0,"&omicron;"],[0,"&pi;"],[0,"&rho;"],[0,"&sigmaf;"],[0,"&sigma;"],[0,"&tau;"],[0,"&upsi;"],[0,"&phi;"],[0,"&chi;"],[0,"&psi;"],[0,"&omega;"],[7,"&thetasym;"],[0,"&Upsi;"],[2,"&phiv;"],[0,"&piv;"],[5,"&Gammad;"],[0,"&digamma;"],[18,"&kappav;"],[0,"&rhov;"],[3,"&epsiv;"],[0,"&backepsilon;"],[10,"&IOcy;"],[0,"&DJcy;"],[0,"&GJcy;"],[0,"&Jukcy;"],[0,"&DScy;"],[0,"&Iukcy;"],[0,"&YIcy;"],[0,"&Jsercy;"],[0,"&LJcy;"],[0,"&NJcy;"],[0,"&TSHcy;"],[0,"&KJcy;"],[1,"&Ubrcy;"],[0,"&DZcy;"],[0,"&Acy;"],[0,"&Bcy;"],[0,"&Vcy;"],[0,"&Gcy;"],[0,"&Dcy;"],[0,"&IEcy;"],[0,"&ZHcy;"],[0,"&Zcy;"],[0,"&Icy;"],[0,"&Jcy;"],[0,"&Kcy;"],[0,"&Lcy;"],[0,"&Mcy;"],[0,"&Ncy;"],[0,"&Ocy;"],[0,"&Pcy;"],[0,"&Rcy;"],[0,"&Scy;"],[0,"&Tcy;"],[0,"&Ucy;"],[0,"&Fcy;"],[0,"&KHcy;"],[0,"&TScy;"],[0,"&CHcy;"],[0,"&SHcy;"],[0,"&SHCHcy;"],[0,"&HARDcy;"],[0,"&Ycy;"],[0,"&SOFTcy;"],[0,"&Ecy;"],[0,"&YUcy;"],[0,"&YAcy;"],[0,"&acy;"],[0,"&bcy;"],[0,"&vcy;"],[0,"&gcy;"],[0,"&dcy;"],[0,"&iecy;"],[0,"&zhcy;"],[0,"&zcy;"],[0,"&icy;"],[0,"&jcy;"],[0,"&kcy;"],[0,"&lcy;"],[0,"&mcy;"],[0,"&ncy;"],[0,"&ocy;"],[0,"&pcy;"],[0,"&rcy;"],[0,"&scy;"],[0,"&tcy;"],[0,"&ucy;"],[0,"&fcy;"],[0,"&khcy;"],[0,"&tscy;"],[0,"&chcy;"],[0,"&shcy;"],[0,"&shchcy;"],[0,"&hardcy;"],[0,"&ycy;"],[0,"&softcy;"],[0,"&ecy;"],[0,"&yucy;"],[0,"&yacy;"],[1,"&iocy;"],[0,"&djcy;"],[0,"&gjcy;"],[0,"&jukcy;"],[0,"&dscy;"],[0,"&iukcy;"],[0,"&yicy;"],[0,"&jsercy;"],[0,"&ljcy;"],[0,"&njcy;"],[0,"&tshcy;"],[0,"&kjcy;"],[1,"&ubrcy;"],[0,"&dzcy;"],[7074,"&ensp;"],[0,"&emsp;"],[0,"&emsp13;"],[0,"&emsp14;"],[1,"&numsp;"],[0,"&puncsp;"],[0,"&ThinSpace;"],[0,"&hairsp;"],[0,"&NegativeMediumSpace;"],[0,"&zwnj;"],[0,"&zwj;"],[0,"&lrm;"],[0,"&rlm;"],[0,"&dash;"],[2,"&ndash;"],[0,"&mdash;"],[0,"&horbar;"],[0,"&Verbar;"],[1,"&lsquo;"],[0,"&CloseCurlyQuote;"],[0,"&lsquor;"],[1,"&ldquo;"],[0,"&CloseCurlyDoubleQuote;"],[0,"&bdquo;"],[1,"&dagger;"],[0,"&Dagger;"],[0,"&bull;"],[2,"&nldr;"],[0,"&hellip;"],[9,"&permil;"],[0,"&pertenk;"],[0,"&prime;"],[0,"&Prime;"],[0,"&tprime;"],[0,"&backprime;"],[3,"&lsaquo;"],[0,"&rsaquo;"],[3,"&oline;"],[2,"&caret;"],[1,"&hybull;"],[0,"&frasl;"],[10,"&bsemi;"],[7,"&qprime;"],[7,{v:"&MediumSpace;",n:8202,o:"&ThickSpace;"}],[0,"&NoBreak;"],[0,"&af;"],[0,"&InvisibleTimes;"],[0,"&ic;"],[72,"&euro;"],[46,"&tdot;"],[0,"&DotDot;"],[37,"&complexes;"],[2,"&incare;"],[4,"&gscr;"],[0,"&hamilt;"],[0,"&Hfr;"],[0,"&Hopf;"],[0,"&planckh;"],[0,"&hbar;"],[0,"&imagline;"],[0,"&Ifr;"],[0,"&lagran;"],[0,"&ell;"],[1,"&naturals;"],[0,"&numero;"],[0,"&copysr;"],[0,"&weierp;"],[0,"&Popf;"],[0,"&Qopf;"],[0,"&realine;"],[0,"&real;"],[0,"&reals;"],[0,"&rx;"],[3,"&trade;"],[1,"&integers;"],[2,"&mho;"],[0,"&zeetrf;"],[0,"&iiota;"],[2,"&bernou;"],[0,"&Cayleys;"],[1,"&escr;"],[0,"&Escr;"],[0,"&Fouriertrf;"],[1,"&Mellintrf;"],[0,"&order;"],[0,"&alefsym;"],[0,"&beth;"],[0,"&gimel;"],[0,"&daleth;"],[12,"&CapitalDifferentialD;"],[0,"&dd;"],[0,"&ee;"],[0,"&ii;"],[10,"&frac13;"],[0,"&frac23;"],[0,"&frac15;"],[0,"&frac25;"],[0,"&frac35;"],[0,"&frac45;"],[0,"&frac16;"],[0,"&frac56;"],[0,"&frac18;"],[0,"&frac38;"],[0,"&frac58;"],[0,"&frac78;"],[49,"&larr;"],[0,"&ShortUpArrow;"],[0,"&rarr;"],[0,"&darr;"],[0,"&harr;"],[0,"&updownarrow;"],[0,"&nwarr;"],[0,"&nearr;"],[0,"&LowerRightArrow;"],[0,"&LowerLeftArrow;"],[0,"&nlarr;"],[0,"&nrarr;"],[1,{v:"&rarrw;",n:824,o:"&nrarrw;"}],[0,"&Larr;"],[0,"&Uarr;"],[0,"&Rarr;"],[0,"&Darr;"],[0,"&larrtl;"],[0,"&rarrtl;"],[0,"&LeftTeeArrow;"],[0,"&mapstoup;"],[0,"&map;"],[0,"&DownTeeArrow;"],[1,"&hookleftarrow;"],[0,"&hookrightarrow;"],[0,"&larrlp;"],[0,"&looparrowright;"],[0,"&harrw;"],[0,"&nharr;"],[1,"&lsh;"],[0,"&rsh;"],[0,"&ldsh;"],[0,"&rdsh;"],[1,"&crarr;"],[0,"&cularr;"],[0,"&curarr;"],[2,"&circlearrowleft;"],[0,"&circlearrowright;"],[0,"&leftharpoonup;"],[0,"&DownLeftVector;"],[0,"&RightUpVector;"],[0,"&LeftUpVector;"],[0,"&rharu;"],[0,"&DownRightVector;"],[0,"&dharr;"],[0,"&dharl;"],[0,"&RightArrowLeftArrow;"],[0,"&udarr;"],[0,"&LeftArrowRightArrow;"],[0,"&leftleftarrows;"],[0,"&upuparrows;"],[0,"&rightrightarrows;"],[0,"&ddarr;"],[0,"&leftrightharpoons;"],[0,"&Equilibrium;"],[0,"&nlArr;"],[0,"&nhArr;"],[0,"&nrArr;"],[0,"&DoubleLeftArrow;"],[0,"&DoubleUpArrow;"],[0,"&DoubleRightArrow;"],[0,"&dArr;"],[0,"&DoubleLeftRightArrow;"],[0,"&DoubleUpDownArrow;"],[0,"&nwArr;"],[0,"&neArr;"],[0,"&seArr;"],[0,"&swArr;"],[0,"&lAarr;"],[0,"&rAarr;"],[1,"&zigrarr;"],[6,"&larrb;"],[0,"&rarrb;"],[15,"&DownArrowUpArrow;"],[7,"&loarr;"],[0,"&roarr;"],[0,"&hoarr;"],[0,"&forall;"],[0,"&comp;"],[0,{v:"&part;",n:824,o:"&npart;"}],[0,"&exist;"],[0,"&nexist;"],[0,"&empty;"],[1,"&Del;"],[0,"&Element;"],[0,"&NotElement;"],[1,"&ni;"],[0,"&notni;"],[2,"&prod;"],[0,"&coprod;"],[0,"&sum;"],[0,"&minus;"],[0,"&MinusPlus;"],[0,"&dotplus;"],[1,"&Backslash;"],[0,"&lowast;"],[0,"&compfn;"],[1,"&radic;"],[2,"&prop;"],[0,"&infin;"],[0,"&angrt;"],[0,{v:"&ang;",n:8402,o:"&nang;"}],[0,"&angmsd;"],[0,"&angsph;"],[0,"&mid;"],[0,"&nmid;"],[0,"&DoubleVerticalBar;"],[0,"&NotDoubleVerticalBar;"],[0,"&and;"],[0,"&or;"],[0,{v:"&cap;",n:65024,o:"&caps;"}],[0,{v:"&cup;",n:65024,o:"&cups;"}],[0,"&int;"],[0,"&Int;"],[0,"&iiint;"],[0,"&conint;"],[0,"&Conint;"],[0,"&Cconint;"],[0,"&cwint;"],[0,"&ClockwiseContourIntegral;"],[0,"&awconint;"],[0,"&there4;"],[0,"&becaus;"],[0,"&ratio;"],[0,"&Colon;"],[0,"&dotminus;"],[1,"&mDDot;"],[0,"&homtht;"],[0,{v:"&sim;",n:8402,o:"&nvsim;"}],[0,{v:"&backsim;",n:817,o:"&race;"}],[0,{v:"&ac;",n:819,o:"&acE;"}],[0,"&acd;"],[0,"&VerticalTilde;"],[0,"&NotTilde;"],[0,{v:"&eqsim;",n:824,o:"&nesim;"}],[0,"&sime;"],[0,"&NotTildeEqual;"],[0,"&cong;"],[0,"&simne;"],[0,"&ncong;"],[0,"&ap;"],[0,"&nap;"],[0,"&ape;"],[0,{v:"&apid;",n:824,o:"&napid;"}],[0,"&backcong;"],[0,{v:"&asympeq;",n:8402,o:"&nvap;"}],[0,{v:"&bump;",n:824,o:"&nbump;"}],[0,{v:"&bumpe;",n:824,o:"&nbumpe;"}],[0,{v:"&doteq;",n:824,o:"&nedot;"}],[0,"&doteqdot;"],[0,"&efDot;"],[0,"&erDot;"],[0,"&Assign;"],[0,"&ecolon;"],[0,"&ecir;"],[0,"&circeq;"],[1,"&wedgeq;"],[0,"&veeeq;"],[1,"&triangleq;"],[2,"&equest;"],[0,"&ne;"],[0,{v:"&Congruent;",n:8421,o:"&bnequiv;"}],[0,"&nequiv;"],[1,{v:"&le;",n:8402,o:"&nvle;"}],[0,{v:"&ge;",n:8402,o:"&nvge;"}],[0,{v:"&lE;",n:824,o:"&nlE;"}],[0,{v:"&gE;",n:824,o:"&ngE;"}],[0,{v:"&lnE;",n:65024,o:"&lvertneqq;"}],[0,{v:"&gnE;",n:65024,o:"&gvertneqq;"}],[0,{v:"&ll;",n:new Map(r([[824,"&nLtv;"],[7577,"&nLt;"]]))}],[0,{v:"&gg;",n:new Map(r([[824,"&nGtv;"],[7577,"&nGt;"]]))}],[0,"&between;"],[0,"&NotCupCap;"],[0,"&nless;"],[0,"&ngt;"],[0,"&nle;"],[0,"&nge;"],[0,"&lesssim;"],[0,"&GreaterTilde;"],[0,"&nlsim;"],[0,"&ngsim;"],[0,"&LessGreater;"],[0,"&gl;"],[0,"&NotLessGreater;"],[0,"&NotGreaterLess;"],[0,"&pr;"],[0,"&sc;"],[0,"&prcue;"],[0,"&sccue;"],[0,"&PrecedesTilde;"],[0,{v:"&scsim;",n:824,o:"&NotSucceedsTilde;"}],[0,"&NotPrecedes;"],[0,"&NotSucceeds;"],[0,{v:"&sub;",n:8402,o:"&NotSubset;"}],[0,{v:"&sup;",n:8402,o:"&NotSuperset;"}],[0,"&nsub;"],[0,"&nsup;"],[0,"&sube;"],[0,"&supe;"],[0,"&NotSubsetEqual;"],[0,"&NotSupersetEqual;"],[0,{v:"&subne;",n:65024,o:"&varsubsetneq;"}],[0,{v:"&supne;",n:65024,o:"&varsupsetneq;"}],[1,"&cupdot;"],[0,"&UnionPlus;"],[0,{v:"&sqsub;",n:824,o:"&NotSquareSubset;"}],[0,{v:"&sqsup;",n:824,o:"&NotSquareSuperset;"}],[0,"&sqsube;"],[0,"&sqsupe;"],[0,{v:"&sqcap;",n:65024,o:"&sqcaps;"}],[0,{v:"&sqcup;",n:65024,o:"&sqcups;"}],[0,"&CirclePlus;"],[0,"&CircleMinus;"],[0,"&CircleTimes;"],[0,"&osol;"],[0,"&CircleDot;"],[0,"&circledcirc;"],[0,"&circledast;"],[1,"&circleddash;"],[0,"&boxplus;"],[0,"&boxminus;"],[0,"&boxtimes;"],[0,"&dotsquare;"],[0,"&RightTee;"],[0,"&dashv;"],[0,"&DownTee;"],[0,"&bot;"],[1,"&models;"],[0,"&DoubleRightTee;"],[0,"&Vdash;"],[0,"&Vvdash;"],[0,"&VDash;"],[0,"&nvdash;"],[0,"&nvDash;"],[0,"&nVdash;"],[0,"&nVDash;"],[0,"&prurel;"],[1,"&LeftTriangle;"],[0,"&RightTriangle;"],[0,{v:"&LeftTriangleEqual;",n:8402,o:"&nvltrie;"}],[0,{v:"&RightTriangleEqual;",n:8402,o:"&nvrtrie;"}],[0,"&origof;"],[0,"&imof;"],[0,"&multimap;"],[0,"&hercon;"],[0,"&intcal;"],[0,"&veebar;"],[1,"&barvee;"],[0,"&angrtvb;"],[0,"&lrtri;"],[0,"&bigwedge;"],[0,"&bigvee;"],[0,"&bigcap;"],[0,"&bigcup;"],[0,"&diam;"],[0,"&sdot;"],[0,"&sstarf;"],[0,"&divideontimes;"],[0,"&bowtie;"],[0,"&ltimes;"],[0,"&rtimes;"],[0,"&leftthreetimes;"],[0,"&rightthreetimes;"],[0,"&backsimeq;"],[0,"&curlyvee;"],[0,"&curlywedge;"],[0,"&Sub;"],[0,"&Sup;"],[0,"&Cap;"],[0,"&Cup;"],[0,"&fork;"],[0,"&epar;"],[0,"&lessdot;"],[0,"&gtdot;"],[0,{v:"&Ll;",n:824,o:"&nLl;"}],[0,{v:"&Gg;",n:824,o:"&nGg;"}],[0,{v:"&leg;",n:65024,o:"&lesg;"}],[0,{v:"&gel;",n:65024,o:"&gesl;"}],[2,"&cuepr;"],[0,"&cuesc;"],[0,"&NotPrecedesSlantEqual;"],[0,"&NotSucceedsSlantEqual;"],[0,"&NotSquareSubsetEqual;"],[0,"&NotSquareSupersetEqual;"],[2,"&lnsim;"],[0,"&gnsim;"],[0,"&precnsim;"],[0,"&scnsim;"],[0,"&nltri;"],[0,"&NotRightTriangle;"],[0,"&nltrie;"],[0,"&NotRightTriangleEqual;"],[0,"&vellip;"],[0,"&ctdot;"],[0,"&utdot;"],[0,"&dtdot;"],[0,"&disin;"],[0,"&isinsv;"],[0,"&isins;"],[0,{v:"&isindot;",n:824,o:"&notindot;"}],[0,"&notinvc;"],[0,"&notinvb;"],[1,{v:"&isinE;",n:824,o:"&notinE;"}],[0,"&nisd;"],[0,"&xnis;"],[0,"&nis;"],[0,"&notnivc;"],[0,"&notnivb;"],[6,"&barwed;"],[0,"&Barwed;"],[1,"&lceil;"],[0,"&rceil;"],[0,"&LeftFloor;"],[0,"&rfloor;"],[0,"&drcrop;"],[0,"&dlcrop;"],[0,"&urcrop;"],[0,"&ulcrop;"],[0,"&bnot;"],[1,"&profline;"],[0,"&profsurf;"],[1,"&telrec;"],[0,"&target;"],[5,"&ulcorn;"],[0,"&urcorn;"],[0,"&dlcorn;"],[0,"&drcorn;"],[2,"&frown;"],[0,"&smile;"],[9,"&cylcty;"],[0,"&profalar;"],[7,"&topbot;"],[6,"&ovbar;"],[1,"&solbar;"],[60,"&angzarr;"],[51,"&lmoustache;"],[0,"&rmoustache;"],[2,"&OverBracket;"],[0,"&bbrk;"],[0,"&bbrktbrk;"],[37,"&OverParenthesis;"],[0,"&UnderParenthesis;"],[0,"&OverBrace;"],[0,"&UnderBrace;"],[2,"&trpezium;"],[4,"&elinters;"],[59,"&blank;"],[164,"&circledS;"],[55,"&boxh;"],[1,"&boxv;"],[9,"&boxdr;"],[3,"&boxdl;"],[3,"&boxur;"],[3,"&boxul;"],[3,"&boxvr;"],[7,"&boxvl;"],[7,"&boxhd;"],[7,"&boxhu;"],[7,"&boxvh;"],[19,"&boxH;"],[0,"&boxV;"],[0,"&boxdR;"],[0,"&boxDr;"],[0,"&boxDR;"],[0,"&boxdL;"],[0,"&boxDl;"],[0,"&boxDL;"],[0,"&boxuR;"],[0,"&boxUr;"],[0,"&boxUR;"],[0,"&boxuL;"],[0,"&boxUl;"],[0,"&boxUL;"],[0,"&boxvR;"],[0,"&boxVr;"],[0,"&boxVR;"],[0,"&boxvL;"],[0,"&boxVl;"],[0,"&boxVL;"],[0,"&boxHd;"],[0,"&boxhD;"],[0,"&boxHD;"],[0,"&boxHu;"],[0,"&boxhU;"],[0,"&boxHU;"],[0,"&boxvH;"],[0,"&boxVh;"],[0,"&boxVH;"],[19,"&uhblk;"],[3,"&lhblk;"],[3,"&block;"],[8,"&blk14;"],[0,"&blk12;"],[0,"&blk34;"],[13,"&square;"],[8,"&blacksquare;"],[0,"&EmptyVerySmallSquare;"],[1,"&rect;"],[0,"&marker;"],[2,"&fltns;"],[1,"&bigtriangleup;"],[0,"&blacktriangle;"],[0,"&triangle;"],[2,"&blacktriangleright;"],[0,"&rtri;"],[3,"&bigtriangledown;"],[0,"&blacktriangledown;"],[0,"&dtri;"],[2,"&blacktriangleleft;"],[0,"&ltri;"],[6,"&loz;"],[0,"&cir;"],[32,"&tridot;"],[2,"&bigcirc;"],[8,"&ultri;"],[0,"&urtri;"],[0,"&lltri;"],[0,"&EmptySmallSquare;"],[0,"&FilledSmallSquare;"],[8,"&bigstar;"],[0,"&star;"],[7,"&phone;"],[49,"&female;"],[1,"&male;"],[29,"&spades;"],[2,"&clubs;"],[1,"&hearts;"],[0,"&diamondsuit;"],[3,"&sung;"],[2,"&flat;"],[0,"&natural;"],[0,"&sharp;"],[163,"&check;"],[3,"&cross;"],[8,"&malt;"],[21,"&sext;"],[33,"&VerticalSeparator;"],[25,"&lbbrk;"],[0,"&rbbrk;"],[84,"&bsolhsub;"],[0,"&suphsol;"],[28,"&LeftDoubleBracket;"],[0,"&RightDoubleBracket;"],[0,"&lang;"],[0,"&rang;"],[0,"&Lang;"],[0,"&Rang;"],[0,"&loang;"],[0,"&roang;"],[7,"&longleftarrow;"],[0,"&longrightarrow;"],[0,"&longleftrightarrow;"],[0,"&DoubleLongLeftArrow;"],[0,"&DoubleLongRightArrow;"],[0,"&DoubleLongLeftRightArrow;"],[1,"&longmapsto;"],[2,"&dzigrarr;"],[258,"&nvlArr;"],[0,"&nvrArr;"],[0,"&nvHarr;"],[0,"&Map;"],[6,"&lbarr;"],[0,"&bkarow;"],[0,"&lBarr;"],[0,"&dbkarow;"],[0,"&drbkarow;"],[0,"&DDotrahd;"],[0,"&UpArrowBar;"],[0,"&DownArrowBar;"],[2,"&Rarrtl;"],[2,"&latail;"],[0,"&ratail;"],[0,"&lAtail;"],[0,"&rAtail;"],[0,"&larrfs;"],[0,"&rarrfs;"],[0,"&larrbfs;"],[0,"&rarrbfs;"],[2,"&nwarhk;"],[0,"&nearhk;"],[0,"&hksearow;"],[0,"&hkswarow;"],[0,"&nwnear;"],[0,"&nesear;"],[0,"&seswar;"],[0,"&swnwar;"],[8,{v:"&rarrc;",n:824,o:"&nrarrc;"}],[1,"&cudarrr;"],[0,"&ldca;"],[0,"&rdca;"],[0,"&cudarrl;"],[0,"&larrpl;"],[2,"&curarrm;"],[0,"&cularrp;"],[7,"&rarrpl;"],[2,"&harrcir;"],[0,"&Uarrocir;"],[0,"&lurdshar;"],[0,"&ldrushar;"],[2,"&LeftRightVector;"],[0,"&RightUpDownVector;"],[0,"&DownLeftRightVector;"],[0,"&LeftUpDownVector;"],[0,"&LeftVectorBar;"],[0,"&RightVectorBar;"],[0,"&RightUpVectorBar;"],[0,"&RightDownVectorBar;"],[0,"&DownLeftVectorBar;"],[0,"&DownRightVectorBar;"],[0,"&LeftUpVectorBar;"],[0,"&LeftDownVectorBar;"],[0,"&LeftTeeVector;"],[0,"&RightTeeVector;"],[0,"&RightUpTeeVector;"],[0,"&RightDownTeeVector;"],[0,"&DownLeftTeeVector;"],[0,"&DownRightTeeVector;"],[0,"&LeftUpTeeVector;"],[0,"&LeftDownTeeVector;"],[0,"&lHar;"],[0,"&uHar;"],[0,"&rHar;"],[0,"&dHar;"],[0,"&luruhar;"],[0,"&ldrdhar;"],[0,"&ruluhar;"],[0,"&rdldhar;"],[0,"&lharul;"],[0,"&llhard;"],[0,"&rharul;"],[0,"&lrhard;"],[0,"&udhar;"],[0,"&duhar;"],[0,"&RoundImplies;"],[0,"&erarr;"],[0,"&simrarr;"],[0,"&larrsim;"],[0,"&rarrsim;"],[0,"&rarrap;"],[0,"&ltlarr;"],[1,"&gtrarr;"],[0,"&subrarr;"],[1,"&suplarr;"],[0,"&lfisht;"],[0,"&rfisht;"],[0,"&ufisht;"],[0,"&dfisht;"],[5,"&lopar;"],[0,"&ropar;"],[4,"&lbrke;"],[0,"&rbrke;"],[0,"&lbrkslu;"],[0,"&rbrksld;"],[0,"&lbrksld;"],[0,"&rbrkslu;"],[0,"&langd;"],[0,"&rangd;"],[0,"&lparlt;"],[0,"&rpargt;"],[0,"&gtlPar;"],[0,"&ltrPar;"],[3,"&vzigzag;"],[1,"&vangrt;"],[0,"&angrtvbd;"],[6,"&ange;"],[0,"&range;"],[0,"&dwangle;"],[0,"&uwangle;"],[0,"&angmsdaa;"],[0,"&angmsdab;"],[0,"&angmsdac;"],[0,"&angmsdad;"],[0,"&angmsdae;"],[0,"&angmsdaf;"],[0,"&angmsdag;"],[0,"&angmsdah;"],[0,"&bemptyv;"],[0,"&demptyv;"],[0,"&cemptyv;"],[0,"&raemptyv;"],[0,"&laemptyv;"],[0,"&ohbar;"],[0,"&omid;"],[0,"&opar;"],[1,"&operp;"],[1,"&olcross;"],[0,"&odsold;"],[1,"&olcir;"],[0,"&ofcir;"],[0,"&olt;"],[0,"&ogt;"],[0,"&cirscir;"],[0,"&cirE;"],[0,"&solb;"],[0,"&bsolb;"],[3,"&boxbox;"],[3,"&trisb;"],[0,"&rtriltri;"],[0,{v:"&LeftTriangleBar;",n:824,o:"&NotLeftTriangleBar;"}],[0,{v:"&RightTriangleBar;",n:824,o:"&NotRightTriangleBar;"}],[11,"&iinfin;"],[0,"&infintie;"],[0,"&nvinfin;"],[4,"&eparsl;"],[0,"&smeparsl;"],[0,"&eqvparsl;"],[5,"&blacklozenge;"],[8,"&RuleDelayed;"],[1,"&dsol;"],[9,"&bigodot;"],[0,"&bigoplus;"],[0,"&bigotimes;"],[1,"&biguplus;"],[1,"&bigsqcup;"],[5,"&iiiint;"],[0,"&fpartint;"],[2,"&cirfnint;"],[0,"&awint;"],[0,"&rppolint;"],[0,"&scpolint;"],[0,"&npolint;"],[0,"&pointint;"],[0,"&quatint;"],[0,"&intlarhk;"],[10,"&pluscir;"],[0,"&plusacir;"],[0,"&simplus;"],[0,"&plusdu;"],[0,"&plussim;"],[0,"&plustwo;"],[1,"&mcomma;"],[0,"&minusdu;"],[2,"&loplus;"],[0,"&roplus;"],[0,"&Cross;"],[0,"&timesd;"],[0,"&timesbar;"],[1,"&smashp;"],[0,"&lotimes;"],[0,"&rotimes;"],[0,"&otimesas;"],[0,"&Otimes;"],[0,"&odiv;"],[0,"&triplus;"],[0,"&triminus;"],[0,"&tritime;"],[0,"&intprod;"],[2,"&amalg;"],[0,"&capdot;"],[1,"&ncup;"],[0,"&ncap;"],[0,"&capand;"],[0,"&cupor;"],[0,"&cupcap;"],[0,"&capcup;"],[0,"&cupbrcap;"],[0,"&capbrcup;"],[0,"&cupcup;"],[0,"&capcap;"],[0,"&ccups;"],[0,"&ccaps;"],[2,"&ccupssm;"],[2,"&And;"],[0,"&Or;"],[0,"&andand;"],[0,"&oror;"],[0,"&orslope;"],[0,"&andslope;"],[1,"&andv;"],[0,"&orv;"],[0,"&andd;"],[0,"&ord;"],[1,"&wedbar;"],[6,"&sdote;"],[3,"&simdot;"],[2,{v:"&congdot;",n:824,o:"&ncongdot;"}],[0,"&easter;"],[0,"&apacir;"],[0,{v:"&apE;",n:824,o:"&napE;"}],[0,"&eplus;"],[0,"&pluse;"],[0,"&Esim;"],[0,"&Colone;"],[0,"&Equal;"],[1,"&ddotseq;"],[0,"&equivDD;"],[0,"&ltcir;"],[0,"&gtcir;"],[0,"&ltquest;"],[0,"&gtquest;"],[0,{v:"&leqslant;",n:824,o:"&nleqslant;"}],[0,{v:"&geqslant;",n:824,o:"&ngeqslant;"}],[0,"&lesdot;"],[0,"&gesdot;"],[0,"&lesdoto;"],[0,"&gesdoto;"],[0,"&lesdotor;"],[0,"&gesdotol;"],[0,"&lap;"],[0,"&gap;"],[0,"&lne;"],[0,"&gne;"],[0,"&lnap;"],[0,"&gnap;"],[0,"&lEg;"],[0,"&gEl;"],[0,"&lsime;"],[0,"&gsime;"],[0,"&lsimg;"],[0,"&gsiml;"],[0,"&lgE;"],[0,"&glE;"],[0,"&lesges;"],[0,"&gesles;"],[0,"&els;"],[0,"&egs;"],[0,"&elsdot;"],[0,"&egsdot;"],[0,"&el;"],[0,"&eg;"],[2,"&siml;"],[0,"&simg;"],[0,"&simlE;"],[0,"&simgE;"],[0,{v:"&LessLess;",n:824,o:"&NotNestedLessLess;"}],[0,{v:"&GreaterGreater;",n:824,o:"&NotNestedGreaterGreater;"}],[1,"&glj;"],[0,"&gla;"],[0,"&ltcc;"],[0,"&gtcc;"],[0,"&lescc;"],[0,"&gescc;"],[0,"&smt;"],[0,"&lat;"],[0,{v:"&smte;",n:65024,o:"&smtes;"}],[0,{v:"&late;",n:65024,o:"&lates;"}],[0,"&bumpE;"],[0,{v:"&PrecedesEqual;",n:824,o:"&NotPrecedesEqual;"}],[0,{v:"&sce;",n:824,o:"&NotSucceedsEqual;"}],[2,"&prE;"],[0,"&scE;"],[0,"&precneqq;"],[0,"&scnE;"],[0,"&prap;"],[0,"&scap;"],[0,"&precnapprox;"],[0,"&scnap;"],[0,"&Pr;"],[0,"&Sc;"],[0,"&subdot;"],[0,"&supdot;"],[0,"&subplus;"],[0,"&supplus;"],[0,"&submult;"],[0,"&supmult;"],[0,"&subedot;"],[0,"&supedot;"],[0,{v:"&subE;",n:824,o:"&nsubE;"}],[0,{v:"&supE;",n:824,o:"&nsupE;"}],[0,"&subsim;"],[0,"&supsim;"],[2,{v:"&subnE;",n:65024,o:"&varsubsetneqq;"}],[0,{v:"&supnE;",n:65024,o:"&varsupsetneqq;"}],[2,"&csub;"],[0,"&csup;"],[0,"&csube;"],[0,"&csupe;"],[0,"&subsup;"],[0,"&supsub;"],[0,"&subsub;"],[0,"&supsup;"],[0,"&suphsub;"],[0,"&supdsub;"],[0,"&forkv;"],[0,"&topfork;"],[0,"&mlcp;"],[8,"&Dashv;"],[1,"&Vdashl;"],[0,"&Barv;"],[0,"&vBar;"],[0,"&vBarv;"],[1,"&Vbar;"],[0,"&Not;"],[0,"&bNot;"],[0,"&rnmid;"],[0,"&cirmid;"],[0,"&midcir;"],[0,"&topcir;"],[0,"&nhpar;"],[0,"&parsim;"],[9,{v:"&parsl;",n:8421,o:"&nparsl;"}],[44343,{n:new Map(r([[56476,"&Ascr;"],[1,"&Cscr;"],[0,"&Dscr;"],[2,"&Gscr;"],[2,"&Jscr;"],[0,"&Kscr;"],[2,"&Nscr;"],[0,"&Oscr;"],[0,"&Pscr;"],[0,"&Qscr;"],[1,"&Sscr;"],[0,"&Tscr;"],[0,"&Uscr;"],[0,"&Vscr;"],[0,"&Wscr;"],[0,"&Xscr;"],[0,"&Yscr;"],[0,"&Zscr;"],[0,"&ascr;"],[0,"&bscr;"],[0,"&cscr;"],[0,"&dscr;"],[1,"&fscr;"],[1,"&hscr;"],[0,"&iscr;"],[0,"&jscr;"],[0,"&kscr;"],[0,"&lscr;"],[0,"&mscr;"],[0,"&nscr;"],[1,"&pscr;"],[0,"&qscr;"],[0,"&rscr;"],[0,"&sscr;"],[0,"&tscr;"],[0,"&uscr;"],[0,"&vscr;"],[0,"&wscr;"],[0,"&xscr;"],[0,"&yscr;"],[0,"&zscr;"],[52,"&Afr;"],[0,"&Bfr;"],[1,"&Dfr;"],[0,"&Efr;"],[0,"&Ffr;"],[0,"&Gfr;"],[2,"&Jfr;"],[0,"&Kfr;"],[0,"&Lfr;"],[0,"&Mfr;"],[0,"&Nfr;"],[0,"&Ofr;"],[0,"&Pfr;"],[0,"&Qfr;"],[1,"&Sfr;"],[0,"&Tfr;"],[0,"&Ufr;"],[0,"&Vfr;"],[0,"&Wfr;"],[0,"&Xfr;"],[0,"&Yfr;"],[1,"&afr;"],[0,"&bfr;"],[0,"&cfr;"],[0,"&dfr;"],[0,"&efr;"],[0,"&ffr;"],[0,"&gfr;"],[0,"&hfr;"],[0,"&ifr;"],[0,"&jfr;"],[0,"&kfr;"],[0,"&lfr;"],[0,"&mfr;"],[0,"&nfr;"],[0,"&ofr;"],[0,"&pfr;"],[0,"&qfr;"],[0,"&rfr;"],[0,"&sfr;"],[0,"&tfr;"],[0,"&ufr;"],[0,"&vfr;"],[0,"&wfr;"],[0,"&xfr;"],[0,"&yfr;"],[0,"&zfr;"],[0,"&Aopf;"],[0,"&Bopf;"],[1,"&Dopf;"],[0,"&Eopf;"],[0,"&Fopf;"],[0,"&Gopf;"],[1,"&Iopf;"],[0,"&Jopf;"],[0,"&Kopf;"],[0,"&Lopf;"],[0,"&Mopf;"],[1,"&Oopf;"],[3,"&Sopf;"],[0,"&Topf;"],[0,"&Uopf;"],[0,"&Vopf;"],[0,"&Wopf;"],[0,"&Xopf;"],[0,"&Yopf;"],[1,"&aopf;"],[0,"&bopf;"],[0,"&copf;"],[0,"&dopf;"],[0,"&eopf;"],[0,"&fopf;"],[0,"&gopf;"],[0,"&hopf;"],[0,"&iopf;"],[0,"&jopf;"],[0,"&kopf;"],[0,"&lopf;"],[0,"&mopf;"],[0,"&nopf;"],[0,"&oopf;"],[0,"&popf;"],[0,"&qopf;"],[0,"&ropf;"],[0,"&sopf;"],[0,"&topf;"],[0,"&uopf;"],[0,"&vopf;"],[0,"&wopf;"],[0,"&xopf;"],[0,"&yopf;"],[0,"&zopf;"]]))}],[8906,"&fflig;"],[0,"&filig;"],[0,"&fllig;"],[0,"&ffilig;"],[0,"&ffllig;"]]))},1437:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.decodeXMLStrict=t.decodeHTML5Strict=t.decodeHTML4Strict=t.decodeHTML5=t.decodeHTML4=t.decodeHTMLAttribute=t.decodeHTMLStrict=t.decodeHTML=t.decodeXML=t.DecodingMode=t.EntityDecoder=t.encodeHTML5=t.encodeHTML4=t.encodeNonAsciiHTML=t.encodeHTML=t.escapeText=t.escapeAttribute=t.escapeUTF8=t.escape=t.encodeXML=t.encode=t.decodeStrict=t.decode=t.EncodingMode=t.EntityLevel=void 0
var n,i,a=r(9344),o=r(3169),s=r(6013)
function u(e,t){if(void 0===t&&(t=n.XML),("number"==typeof t?t:t.level)===n.HTML){var r="object"==typeof t?t.mode:void 0
return(0,a.decodeHTML)(e,r)}return(0,a.decodeXML)(e)}!function(e){e[e.XML=0]="XML",e[e.HTML=1]="HTML"}(n=t.EntityLevel||(t.EntityLevel={})),function(e){e[e.UTF8=0]="UTF8",e[e.ASCII=1]="ASCII",e[e.Extensive=2]="Extensive",e[e.Attribute=3]="Attribute",e[e.Text=4]="Text"}(i=t.EncodingMode||(t.EncodingMode={})),t.decode=u,t.decodeStrict=function(e,t){var r
void 0===t&&(t=n.XML)
var i="number"==typeof t?{level:t}:t
return null!==(r=i.mode)&&void 0!==r||(i.mode=a.DecodingMode.Strict),u(e,i)},t.encode=function(e,t){void 0===t&&(t=n.XML)
var r="number"==typeof t?{level:t}:t
return r.mode===i.UTF8?(0,s.escapeUTF8)(e):r.mode===i.Attribute?(0,s.escapeAttribute)(e):r.mode===i.Text?(0,s.escapeText)(e):r.level===n.HTML?r.mode===i.ASCII?(0,o.encodeNonAsciiHTML)(e):(0,o.encodeHTML)(e):(0,s.encodeXML)(e)}
var l=r(6013)
Object.defineProperty(t,"encodeXML",{enumerable:!0,get:function(){return l.encodeXML}}),Object.defineProperty(t,"escape",{enumerable:!0,get:function(){return l.escape}}),Object.defineProperty(t,"escapeUTF8",{enumerable:!0,get:function(){return l.escapeUTF8}}),Object.defineProperty(t,"escapeAttribute",{enumerable:!0,get:function(){return l.escapeAttribute}}),Object.defineProperty(t,"escapeText",{enumerable:!0,get:function(){return l.escapeText}})
var c=r(3169)
Object.defineProperty(t,"encodeHTML",{enumerable:!0,get:function(){return c.encodeHTML}}),Object.defineProperty(t,"encodeNonAsciiHTML",{enumerable:!0,get:function(){return c.encodeNonAsciiHTML}}),Object.defineProperty(t,"encodeHTML4",{enumerable:!0,get:function(){return c.encodeHTML}}),Object.defineProperty(t,"encodeHTML5",{enumerable:!0,get:function(){return c.encodeHTML}})
var d=r(9344)
Object.defineProperty(t,"EntityDecoder",{enumerable:!0,get:function(){return d.EntityDecoder}}),Object.defineProperty(t,"DecodingMode",{enumerable:!0,get:function(){return d.DecodingMode}}),Object.defineProperty(t,"decodeXML",{enumerable:!0,get:function(){return d.decodeXML}}),Object.defineProperty(t,"decodeHTML",{enumerable:!0,get:function(){return d.decodeHTML}}),Object.defineProperty(t,"decodeHTMLStrict",{enumerable:!0,get:function(){return d.decodeHTMLStrict}}),Object.defineProperty(t,"decodeHTMLAttribute",{enumerable:!0,get:function(){return d.decodeHTMLAttribute}}),Object.defineProperty(t,"decodeHTML4",{enumerable:!0,get:function(){return d.decodeHTML}}),Object.defineProperty(t,"decodeHTML5",{enumerable:!0,get:function(){return d.decodeHTML}}),Object.defineProperty(t,"decodeHTML4Strict",{enumerable:!0,get:function(){return d.decodeHTMLStrict}}),Object.defineProperty(t,"decodeHTML5Strict",{enumerable:!0,get:function(){return d.decodeHTMLStrict}}),Object.defineProperty(t,"decodeXMLStrict",{enumerable:!0,get:function(){return d.decodeXML}})},7304:(e,t)=>{"use strict"
var r
Object.defineProperty(t,"__esModule",{value:!0}),t.Doctype=t.CDATA=t.Tag=t.Style=t.Script=t.Comment=t.Directive=t.Text=t.Root=t.isTag=t.ElementType=void 0,function(e){e.Root="root",e.Text="text",e.Directive="directive",e.Comment="comment",e.Script="script",e.Style="style",e.Tag="tag",e.CDATA="cdata",e.Doctype="doctype"}(r=t.ElementType||(t.ElementType={})),t.isTag=function(e){return e.type===r.Tag||e.type===r.Script||e.type===r.Style},t.Root=r.Root,t.Text=r.Text,t.Directive=r.Directive,t.Comment=r.Comment,t.Script=r.Script,t.Style=r.Style,t.Tag=r.Tag,t.CDATA=r.CDATA,t.Doctype=r.Doctype},1363:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var i=Object.getOwnPropertyDescriptor(t,r)
i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)}
Object.defineProperty(t,"__esModule",{value:!0}),t.DomHandler=void 0
var a=r(7304),o=r(5653)
i(r(5653),t)
var s={withStartIndices:!1,withEndIndices:!1,xmlMode:!1},u=function(){function e(e,t,r){this.dom=[],this.root=new o.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null,"function"==typeof t&&(r=t,t=s),"object"==typeof e&&(t=e,e=void 0),this.callback=null!=e?e:null,this.options=null!=t?t:s,this.elementCB=null!=r?r:null}return e.prototype.onparserinit=function(e){this.parser=e},e.prototype.onreset=function(){this.dom=[],this.root=new o.Document(this.dom),this.done=!1,this.tagStack=[this.root],this.lastNode=null,this.parser=null},e.prototype.onend=function(){this.done||(this.done=!0,this.parser=null,this.handleCallback(null))},e.prototype.onerror=function(e){this.handleCallback(e)},e.prototype.onclosetag=function(){this.lastNode=null
var e=this.tagStack.pop()
this.options.withEndIndices&&(e.endIndex=this.parser.endIndex),this.elementCB&&this.elementCB(e)},e.prototype.onopentag=function(e,t){var r=this.options.xmlMode?a.ElementType.Tag:void 0,n=new o.Element(e,t,void 0,r)
this.addNode(n),this.tagStack.push(n)},e.prototype.ontext=function(e){var t=this.lastNode
if(t&&t.type===a.ElementType.Text)t.data+=e,this.options.withEndIndices&&(t.endIndex=this.parser.endIndex)
else{var r=new o.Text(e)
this.addNode(r),this.lastNode=r}},e.prototype.oncomment=function(e){if(this.lastNode&&this.lastNode.type===a.ElementType.Comment)this.lastNode.data+=e
else{var t=new o.Comment(e)
this.addNode(t),this.lastNode=t}},e.prototype.oncommentend=function(){this.lastNode=null},e.prototype.oncdatastart=function(){var e=new o.Text(""),t=new o.CDATA([e])
this.addNode(t),e.parent=t,this.lastNode=e},e.prototype.oncdataend=function(){this.lastNode=null},e.prototype.onprocessinginstruction=function(e,t){var r=new o.ProcessingInstruction(e,t)
this.addNode(r)},e.prototype.handleCallback=function(e){if("function"==typeof this.callback)this.callback(e,this.dom)
else if(e)throw e},e.prototype.addNode=function(e){var t=this.tagStack[this.tagStack.length-1],r=t.children[t.children.length-1]
this.options.withStartIndices&&(e.startIndex=this.parser.startIndex),this.options.withEndIndices&&(e.endIndex=this.parser.endIndex),t.children.push(e),r&&(e.prev=r,r.next=e),e.parent=t,this.lastNode=null},e}()
t.DomHandler=u,t.default=u},5653:function(e,t,r){"use strict"
var n,i=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null")
function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=this&&this.__assign||function(){return a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
return e},a.apply(this,arguments)}
Object.defineProperty(t,"__esModule",{value:!0}),t.cloneNode=t.hasChildren=t.isDocument=t.isDirective=t.isComment=t.isText=t.isCDATA=t.isTag=t.Element=t.Document=t.CDATA=t.NodeWithChildren=t.ProcessingInstruction=t.Comment=t.Text=t.DataNode=t.Node=void 0
var o=r(7304),s=function(){function e(){this.parent=null,this.prev=null,this.next=null,this.startIndex=null,this.endIndex=null}return Object.defineProperty(e.prototype,"parentNode",{get:function(){return this.parent},set:function(e){this.parent=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"previousSibling",{get:function(){return this.prev},set:function(e){this.prev=e},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"nextSibling",{get:function(){return this.next},set:function(e){this.next=e},enumerable:!1,configurable:!0}),e.prototype.cloneNode=function(e){return void 0===e&&(e=!1),_(this,e)},e}()
t.Node=s
var u=function(e){function t(t){var r=e.call(this)||this
return r.data=t,r}return i(t,e),Object.defineProperty(t.prototype,"nodeValue",{get:function(){return this.data},set:function(e){this.data=e},enumerable:!1,configurable:!0}),t}(s)
t.DataNode=u
var l=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this
return t.type=o.ElementType.Text,t}return i(t,e),Object.defineProperty(t.prototype,"nodeType",{get:function(){return 3},enumerable:!1,configurable:!0}),t}(u)
t.Text=l
var c=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this
return t.type=o.ElementType.Comment,t}return i(t,e),Object.defineProperty(t.prototype,"nodeType",{get:function(){return 8},enumerable:!1,configurable:!0}),t}(u)
t.Comment=c
var d=function(e){function t(t,r){var n=e.call(this,r)||this
return n.name=t,n.type=o.ElementType.Directive,n}return i(t,e),Object.defineProperty(t.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),t}(u)
t.ProcessingInstruction=d
var h=function(e){function t(t){var r=e.call(this)||this
return r.children=t,r}return i(t,e),Object.defineProperty(t.prototype,"firstChild",{get:function(){var e
return null!==(e=this.children[0])&&void 0!==e?e:null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lastChild",{get:function(){return this.children.length>0?this.children[this.children.length-1]:null},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"childNodes",{get:function(){return this.children},set:function(e){this.children=e},enumerable:!1,configurable:!0}),t}(s)
t.NodeWithChildren=h
var f=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this
return t.type=o.ElementType.CDATA,t}return i(t,e),Object.defineProperty(t.prototype,"nodeType",{get:function(){return 4},enumerable:!1,configurable:!0}),t}(h)
t.CDATA=f
var p=function(e){function t(){var t=null!==e&&e.apply(this,arguments)||this
return t.type=o.ElementType.Root,t}return i(t,e),Object.defineProperty(t.prototype,"nodeType",{get:function(){return 9},enumerable:!1,configurable:!0}),t}(h)
t.Document=p
var g=function(e){function t(t,r,n,i){void 0===n&&(n=[]),void 0===i&&(i="script"===t?o.ElementType.Script:"style"===t?o.ElementType.Style:o.ElementType.Tag)
var a=e.call(this,n)||this
return a.name=t,a.attribs=r,a.type=i,a}return i(t,e),Object.defineProperty(t.prototype,"nodeType",{get:function(){return 1},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"tagName",{get:function(){return this.name},set:function(e){this.name=e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"attributes",{get:function(){var e=this
return Object.keys(this.attribs).map((function(t){var r,n
return{name:t,value:e.attribs[t],namespace:null===(r=e["x-attribsNamespace"])||void 0===r?void 0:r[t],prefix:null===(n=e["x-attribsPrefix"])||void 0===n?void 0:n[t]}}))},enumerable:!1,configurable:!0}),t}(h)
function m(e){return(0,o.isTag)(e)}function v(e){return e.type===o.ElementType.CDATA}function y(e){return e.type===o.ElementType.Text}function b(e){return e.type===o.ElementType.Comment}function E(e){return e.type===o.ElementType.Directive}function w(e){return e.type===o.ElementType.Root}function _(e,t){var r
if(void 0===t&&(t=!1),y(e))r=new l(e.data)
else if(b(e))r=new c(e.data)
else if(m(e)){var n=t?T(e.children):[],i=new g(e.name,a({},e.attribs),n)
n.forEach((function(e){return e.parent=i})),null!=e.namespace&&(i.namespace=e.namespace),e["x-attribsNamespace"]&&(i["x-attribsNamespace"]=a({},e["x-attribsNamespace"])),e["x-attribsPrefix"]&&(i["x-attribsPrefix"]=a({},e["x-attribsPrefix"])),r=i}else if(v(e)){n=t?T(e.children):[]
var o=new f(n)
n.forEach((function(e){return e.parent=o})),r=o}else if(w(e)){n=t?T(e.children):[]
var s=new p(n)
n.forEach((function(e){return e.parent=s})),e["x-mode"]&&(s["x-mode"]=e["x-mode"]),r=s}else{if(!E(e))throw new Error("Not implemented yet: ".concat(e.type))
var u=new d(e.name,e.data)
null!=e["x-name"]&&(u["x-name"]=e["x-name"],u["x-publicId"]=e["x-publicId"],u["x-systemId"]=e["x-systemId"]),r=u}return r.startIndex=e.startIndex,r.endIndex=e.endIndex,null!=e.sourceCodeLocation&&(r.sourceCodeLocation=e.sourceCodeLocation),r}function T(e){for(var t=e.map((function(e){return _(e,!0)})),r=1;r<t.length;r++)t[r].prev=t[r-1],t[r-1].next=t[r]
return t}t.Element=g,t.isTag=m,t.isCDATA=v,t.isText=y,t.isComment=b,t.isDirective=E,t.isDocument=w,t.hasChildren=function(e){return Object.prototype.hasOwnProperty.call(e,"children")},t.cloneNode=_},3625:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getFeed=void 0
var n=r(3633),i=r(7344)
t.getFeed=function(e){var t=u(d,e)
return t?"feed"===t.name?function(e){var t,r=e.children,n={type:"atom",items:(0,i.getElementsByTagName)("entry",r).map((function(e){var t,r=e.children,n={media:s(r)}
c(n,"id","id",r),c(n,"title","title",r)
var i=null===(t=u("link",r))||void 0===t?void 0:t.attribs.href
i&&(n.link=i)
var a=l("summary",r)||l("content",r)
a&&(n.description=a)
var o=l("updated",r)
return o&&(n.pubDate=new Date(o)),n}))}
c(n,"id","id",r),c(n,"title","title",r)
var a=null===(t=u("link",r))||void 0===t?void 0:t.attribs.href
a&&(n.link=a),c(n,"description","subtitle",r)
var o=l("updated",r)
return o&&(n.updated=new Date(o)),c(n,"author","email",r,!0),n}(t):function(e){var t,r,n=null!==(r=null===(t=u("channel",e.children))||void 0===t?void 0:t.children)&&void 0!==r?r:[],a={type:e.name.substr(0,3),id:"",items:(0,i.getElementsByTagName)("item",e.children).map((function(e){var t=e.children,r={media:s(t)}
c(r,"id","guid",t),c(r,"title","title",t),c(r,"link","link",t),c(r,"description","description",t)
var n=l("pubDate",t)||l("dc:date",t)
return n&&(r.pubDate=new Date(n)),r}))}
c(a,"title","title",n),c(a,"link","link",n),c(a,"description","description",n)
var o=l("lastBuildDate",n)
return o&&(a.updated=new Date(o)),c(a,"author","managingEditor",n,!0),a}(t):null}
var a=["url","type","lang"],o=["fileSize","bitrate","framerate","samplingrate","channels","duration","height","width"]
function s(e){return(0,i.getElementsByTagName)("media:content",e).map((function(e){for(var t=e.attribs,r={medium:t.medium,isDefault:!!t.isDefault},n=0,i=a;n<i.length;n++)t[l=i[n]]&&(r[l]=t[l])
for(var s=0,u=o;s<u.length;s++){var l
t[l=u[s]]&&(r[l]=parseInt(t[l],10))}return t.expression&&(r.expression=t.expression),r}))}function u(e,t){return(0,i.getElementsByTagName)(e,t,!0,1)[0]}function l(e,t,r){return void 0===r&&(r=!1),(0,n.textContent)((0,i.getElementsByTagName)(e,t,r,1)).trim()}function c(e,t,r,n,i){void 0===i&&(i=!1)
var a=l(r,n,i)
a&&(e[t]=a)}function d(e){return"rss"===e||"feed"===e||"rdf:RDF"===e}},3757:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.uniqueSort=t.compareDocumentPosition=t.DocumentPosition=t.removeSubsets=void 0
var n,i=r(1363)
function a(e,t){var r=[],a=[]
if(e===t)return 0
for(var o=(0,i.hasChildren)(e)?e:e.parent;o;)r.unshift(o),o=o.parent
for(o=(0,i.hasChildren)(t)?t:t.parent;o;)a.unshift(o),o=o.parent
for(var s=Math.min(r.length,a.length),u=0;u<s&&r[u]===a[u];)u++
if(0===u)return n.DISCONNECTED
var l=r[u-1],c=l.children,d=r[u],h=a[u]
return c.indexOf(d)>c.indexOf(h)?l===t?n.FOLLOWING|n.CONTAINED_BY:n.FOLLOWING:l===e?n.PRECEDING|n.CONTAINS:n.PRECEDING}t.removeSubsets=function(e){for(var t=e.length;--t>=0;){var r=e[t]
if(t>0&&e.lastIndexOf(r,t-1)>=0)e.splice(t,1)
else for(var n=r.parent;n;n=n.parent)if(e.includes(n)){e.splice(t,1)
break}}return e},function(e){e[e.DISCONNECTED=1]="DISCONNECTED",e[e.PRECEDING=2]="PRECEDING",e[e.FOLLOWING=4]="FOLLOWING",e[e.CONTAINS=8]="CONTAINS",e[e.CONTAINED_BY=16]="CONTAINED_BY"}(n=t.DocumentPosition||(t.DocumentPosition={})),t.compareDocumentPosition=a,t.uniqueSort=function(e){return(e=e.filter((function(e,t,r){return!r.includes(e,t+1)}))).sort((function(e,t){var r=a(e,t)
return r&n.PRECEDING?-1:r&n.FOLLOWING?1:0})),e}},5511:function(e,t,r){"use strict"
var n=this&&this.__createBinding||(Object.create?function(e,t,r,n){void 0===n&&(n=r)
var i=Object.getOwnPropertyDescriptor(t,r)
i&&!("get"in i?!t.__esModule:i.writable||i.configurable)||(i={enumerable:!0,get:function(){return t[r]}}),Object.defineProperty(e,n,i)}:function(e,t,r,n){void 0===n&&(n=r),e[n]=t[r]}),i=this&&this.__exportStar||function(e,t){for(var r in e)"default"===r||Object.prototype.hasOwnProperty.call(t,r)||n(t,e,r)}
Object.defineProperty(t,"__esModule",{value:!0}),t.hasChildren=t.isDocument=t.isComment=t.isText=t.isCDATA=t.isTag=void 0,i(r(3633),t),i(r(6530),t),i(r(1833),t),i(r(7062),t),i(r(7344),t),i(r(3757),t),i(r(3625),t)
var a=r(1363)
Object.defineProperty(t,"isTag",{enumerable:!0,get:function(){return a.isTag}}),Object.defineProperty(t,"isCDATA",{enumerable:!0,get:function(){return a.isCDATA}}),Object.defineProperty(t,"isText",{enumerable:!0,get:function(){return a.isText}}),Object.defineProperty(t,"isComment",{enumerable:!0,get:function(){return a.isComment}}),Object.defineProperty(t,"isDocument",{enumerable:!0,get:function(){return a.isDocument}}),Object.defineProperty(t,"hasChildren",{enumerable:!0,get:function(){return a.hasChildren}})},7344:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.getElementsByTagType=t.getElementsByTagName=t.getElementById=t.getElements=t.testElement=void 0
var n=r(1363),i=r(7062),a={tag_name:function(e){return"function"==typeof e?function(t){return(0,n.isTag)(t)&&e(t.name)}:"*"===e?n.isTag:function(t){return(0,n.isTag)(t)&&t.name===e}},tag_type:function(e){return"function"==typeof e?function(t){return e(t.type)}:function(t){return t.type===e}},tag_contains:function(e){return"function"==typeof e?function(t){return(0,n.isText)(t)&&e(t.data)}:function(t){return(0,n.isText)(t)&&t.data===e}}}
function o(e,t){return"function"==typeof t?function(r){return(0,n.isTag)(r)&&t(r.attribs[e])}:function(r){return(0,n.isTag)(r)&&r.attribs[e]===t}}function s(e,t){return function(r){return e(r)||t(r)}}function u(e){var t=Object.keys(e).map((function(t){var r=e[t]
return Object.prototype.hasOwnProperty.call(a,t)?a[t](r):o(t,r)}))
return 0===t.length?null:t.reduce(s)}t.testElement=function(e,t){var r=u(e)
return!r||r(t)},t.getElements=function(e,t,r,n){void 0===n&&(n=1/0)
var a=u(e)
return a?(0,i.filter)(a,t,r,n):[]},t.getElementById=function(e,t,r){return void 0===r&&(r=!0),Array.isArray(t)||(t=[t]),(0,i.findOne)(o("id",e),t,r)},t.getElementsByTagName=function(e,t,r,n){return void 0===r&&(r=!0),void 0===n&&(n=1/0),(0,i.filter)(a.tag_name(e),t,r,n)},t.getElementsByTagType=function(e,t,r,n){return void 0===r&&(r=!0),void 0===n&&(n=1/0),(0,i.filter)(a.tag_type(e),t,r,n)}},1833:(e,t)=>{"use strict"
function r(e){if(e.prev&&(e.prev.next=e.next),e.next&&(e.next.prev=e.prev),e.parent){var t=e.parent.children,r=t.lastIndexOf(e)
r>=0&&t.splice(r,1)}e.next=null,e.prev=null,e.parent=null}Object.defineProperty(t,"__esModule",{value:!0}),t.prepend=t.prependChild=t.append=t.appendChild=t.replaceElement=t.removeElement=void 0,t.removeElement=r,t.replaceElement=function(e,t){var r=t.prev=e.prev
r&&(r.next=t)
var n=t.next=e.next
n&&(n.prev=t)
var i=t.parent=e.parent
if(i){var a=i.children
a[a.lastIndexOf(e)]=t,e.parent=null}},t.appendChild=function(e,t){if(r(t),t.next=null,t.parent=e,e.children.push(t)>1){var n=e.children[e.children.length-2]
n.next=t,t.prev=n}else t.prev=null},t.append=function(e,t){r(t)
var n=e.parent,i=e.next
if(t.next=i,t.prev=e,e.next=t,t.parent=n,i){if(i.prev=t,n){var a=n.children
a.splice(a.lastIndexOf(i),0,t)}}else n&&n.children.push(t)},t.prependChild=function(e,t){if(r(t),t.parent=e,t.prev=null,1!==e.children.unshift(t)){var n=e.children[1]
n.prev=t,t.next=n}else t.next=null},t.prepend=function(e,t){r(t)
var n=e.parent
if(n){var i=n.children
i.splice(i.indexOf(e),0,t)}e.prev&&(e.prev.next=t),t.parent=n,t.prev=e.prev,t.next=e,e.prev=t}},7062:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.findAll=t.existsOne=t.findOne=t.findOneChild=t.find=t.filter=void 0
var n=r(1363)
function i(e,t,r,i){for(var a=[],o=[t],s=[0];;)if(s[0]>=o[0].length){if(1===s.length)return a
o.shift(),s.shift()}else{var u=o[0][s[0]++]
if(e(u)&&(a.push(u),--i<=0))return a
r&&(0,n.hasChildren)(u)&&u.children.length>0&&(s.unshift(0),o.unshift(u.children))}}t.filter=function(e,t,r,n){return void 0===r&&(r=!0),void 0===n&&(n=1/0),i(e,Array.isArray(t)?t:[t],r,n)},t.find=i,t.findOneChild=function(e,t){return t.find(e)},t.findOne=function e(t,r,i){void 0===i&&(i=!0)
for(var a=null,o=0;o<r.length&&!a;o++){var s=r[o];(0,n.isTag)(s)&&(t(s)?a=s:i&&s.children.length>0&&(a=e(t,s.children,!0)))}return a},t.existsOne=function e(t,r){return r.some((function(r){return(0,n.isTag)(r)&&(t(r)||e(t,r.children))}))},t.findAll=function(e,t){for(var r=[],i=[t],a=[0];;)if(a[0]>=i[0].length){if(1===i.length)return r
i.shift(),a.shift()}else{var o=i[0][a[0]++];(0,n.isTag)(o)&&(e(o)&&r.push(o),o.children.length>0&&(a.unshift(0),i.unshift(o.children)))}}},3633:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.innerText=t.textContent=t.getText=t.getInnerHTML=t.getOuterHTML=void 0
var i=r(1363),a=n(r(1671)),o=r(7304)
function s(e,t){return(0,a.default)(e,t)}t.getOuterHTML=s,t.getInnerHTML=function(e,t){return(0,i.hasChildren)(e)?e.children.map((function(e){return s(e,t)})).join(""):""},t.getText=function e(t){return Array.isArray(t)?t.map(e).join(""):(0,i.isTag)(t)?"br"===t.name?"\n":e(t.children):(0,i.isCDATA)(t)?e(t.children):(0,i.isText)(t)?t.data:""},t.textContent=function e(t){return Array.isArray(t)?t.map(e).join(""):(0,i.hasChildren)(t)&&!(0,i.isComment)(t)?e(t.children):(0,i.isText)(t)?t.data:""},t.innerText=function e(t){return Array.isArray(t)?t.map(e).join(""):(0,i.hasChildren)(t)&&(t.type===o.ElementType.Tag||(0,i.isCDATA)(t))?e(t.children):(0,i.isText)(t)?t.data:""}},6530:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.prevElementSibling=t.nextElementSibling=t.getName=t.hasAttrib=t.getAttributeValue=t.getSiblings=t.getParent=t.getChildren=void 0
var n=r(1363)
function i(e){return(0,n.hasChildren)(e)?e.children:[]}function a(e){return e.parent||null}t.getChildren=i,t.getParent=a,t.getSiblings=function(e){var t=a(e)
if(null!=t)return i(t)
for(var r=[e],n=e.prev,o=e.next;null!=n;)r.unshift(n),n=n.prev
for(;null!=o;)r.push(o),o=o.next
return r},t.getAttributeValue=function(e,t){var r
return null===(r=e.attribs)||void 0===r?void 0:r[t]},t.hasAttrib=function(e,t){return null!=e.attribs&&Object.prototype.hasOwnProperty.call(e.attribs,t)&&null!=e.attribs[t]},t.getName=function(e){return e.name},t.nextElementSibling=function(e){for(var t=e.next;null!==t&&!(0,n.isTag)(t);)t=t.next
return t},t.prevElementSibling=function(e){for(var t=e.prev;null!==t&&!(0,n.isTag)(t);)t=t.prev
return t}},8575:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{default:()=>u,modifier:()=>c})
var n=r(1292),i=r(4927),a=r(9341)
function o(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}class s{constructor(e){this.owner=e,o(this,"capabilities",(0,i.capabilities)("3.22"))}createModifier(e,t){return{instance:new e(this.owner,t),element:null}}installModifier(e,t,r){const n=function(e,t){const r=e
return r.element=t,r}(e,t)
n.instance.modify(t,r.positional,r.named)}updateModifier(e,t){e.instance.modify(e.element,t.positional,t.named)}destroyModifier(e){let{instance:t}=e;(0,a.destroy)(t)}}class u{constructor(e,t){(0,n.setOwner)(this,e)}modify(e,t,r){}}(0,i.setModifierManager)((e=>new s(e)),u)
const l=new class{constructor(){o(this,"capabilities",(0,i.capabilities)("3.22"))}createModifier(e){return{element:null,instance:e}}installModifier(e,t,r){const n=function(e,t){const r=e
return r.element=t,r}(e,t),{positional:i,named:a}=r,o=e.instance(t,i,a)
"function"==typeof o&&(n.teardown=o)}updateModifier(e,t){"function"==typeof e.teardown&&e.teardown()
const r=e.instance(e.element,t.positional,t.named)
"function"==typeof r&&(e.teardown=r)}destroyModifier(e){"function"==typeof e.teardown&&e.teardown()}}
function c(e){return(0,i.setModifierManager)((()=>l),e)}},39:function(e,t,r){var n
e=r.nmd(e),function(i){var a=(e&&e.exports,"object"==typeof global&&global)
a.global!==a&&a.window
var o=/[\uD800-\uDBFF][\uDC00-\uDFFF]/g,s=/[\x01-\x7F]/g,u=/[\x01-\t\x0B\f\x0E-\x1F\x7F\x81\x8D\x8F\x90\x9D\xA0-\uFFFF]/g,l=/<\u20D2|=\u20E5|>\u20D2|\u205F\u200A|\u219D\u0338|\u2202\u0338|\u2220\u20D2|\u2229\uFE00|\u222A\uFE00|\u223C\u20D2|\u223D\u0331|\u223E\u0333|\u2242\u0338|\u224B\u0338|\u224D\u20D2|\u224E\u0338|\u224F\u0338|\u2250\u0338|\u2261\u20E5|\u2264\u20D2|\u2265\u20D2|\u2266\u0338|\u2267\u0338|\u2268\uFE00|\u2269\uFE00|\u226A\u0338|\u226A\u20D2|\u226B\u0338|\u226B\u20D2|\u227F\u0338|\u2282\u20D2|\u2283\u20D2|\u228A\uFE00|\u228B\uFE00|\u228F\u0338|\u2290\u0338|\u2293\uFE00|\u2294\uFE00|\u22B4\u20D2|\u22B5\u20D2|\u22D8\u0338|\u22D9\u0338|\u22DA\uFE00|\u22DB\uFE00|\u22F5\u0338|\u22F9\u0338|\u2933\u0338|\u29CF\u0338|\u29D0\u0338|\u2A6D\u0338|\u2A70\u0338|\u2A7D\u0338|\u2A7E\u0338|\u2AA1\u0338|\u2AA2\u0338|\u2AAC\uFE00|\u2AAD\uFE00|\u2AAF\u0338|\u2AB0\u0338|\u2AC5\u0338|\u2AC6\u0338|\u2ACB\uFE00|\u2ACC\uFE00|\u2AFD\u20E5|[\xA0-\u0113\u0116-\u0122\u0124-\u012B\u012E-\u014D\u0150-\u017E\u0192\u01B5\u01F5\u0237\u02C6\u02C7\u02D8-\u02DD\u0311\u0391-\u03A1\u03A3-\u03A9\u03B1-\u03C9\u03D1\u03D2\u03D5\u03D6\u03DC\u03DD\u03F0\u03F1\u03F5\u03F6\u0401-\u040C\u040E-\u044F\u0451-\u045C\u045E\u045F\u2002-\u2005\u2007-\u2010\u2013-\u2016\u2018-\u201A\u201C-\u201E\u2020-\u2022\u2025\u2026\u2030-\u2035\u2039\u203A\u203E\u2041\u2043\u2044\u204F\u2057\u205F-\u2063\u20AC\u20DB\u20DC\u2102\u2105\u210A-\u2113\u2115-\u211E\u2122\u2124\u2127-\u2129\u212C\u212D\u212F-\u2131\u2133-\u2138\u2145-\u2148\u2153-\u215E\u2190-\u219B\u219D-\u21A7\u21A9-\u21AE\u21B0-\u21B3\u21B5-\u21B7\u21BA-\u21DB\u21DD\u21E4\u21E5\u21F5\u21FD-\u2205\u2207-\u2209\u220B\u220C\u220F-\u2214\u2216-\u2218\u221A\u221D-\u2238\u223A-\u2257\u2259\u225A\u225C\u225F-\u2262\u2264-\u228B\u228D-\u229B\u229D-\u22A5\u22A7-\u22B0\u22B2-\u22BB\u22BD-\u22DB\u22DE-\u22E3\u22E6-\u22F7\u22F9-\u22FE\u2305\u2306\u2308-\u2310\u2312\u2313\u2315\u2316\u231C-\u231F\u2322\u2323\u232D\u232E\u2336\u233D\u233F\u237C\u23B0\u23B1\u23B4-\u23B6\u23DC-\u23DF\u23E2\u23E7\u2423\u24C8\u2500\u2502\u250C\u2510\u2514\u2518\u251C\u2524\u252C\u2534\u253C\u2550-\u256C\u2580\u2584\u2588\u2591-\u2593\u25A1\u25AA\u25AB\u25AD\u25AE\u25B1\u25B3-\u25B5\u25B8\u25B9\u25BD-\u25BF\u25C2\u25C3\u25CA\u25CB\u25EC\u25EF\u25F8-\u25FC\u2605\u2606\u260E\u2640\u2642\u2660\u2663\u2665\u2666\u266A\u266D-\u266F\u2713\u2717\u2720\u2736\u2758\u2772\u2773\u27C8\u27C9\u27E6-\u27ED\u27F5-\u27FA\u27FC\u27FF\u2902-\u2905\u290C-\u2913\u2916\u2919-\u2920\u2923-\u292A\u2933\u2935-\u2939\u293C\u293D\u2945\u2948-\u294B\u294E-\u2976\u2978\u2979\u297B-\u297F\u2985\u2986\u298B-\u2996\u299A\u299C\u299D\u29A4-\u29B7\u29B9\u29BB\u29BC\u29BE-\u29C5\u29C9\u29CD-\u29D0\u29DC-\u29DE\u29E3-\u29E5\u29EB\u29F4\u29F6\u2A00-\u2A02\u2A04\u2A06\u2A0C\u2A0D\u2A10-\u2A17\u2A22-\u2A27\u2A29\u2A2A\u2A2D-\u2A31\u2A33-\u2A3C\u2A3F\u2A40\u2A42-\u2A4D\u2A50\u2A53-\u2A58\u2A5A-\u2A5D\u2A5F\u2A66\u2A6A\u2A6D-\u2A75\u2A77-\u2A9A\u2A9D-\u2AA2\u2AA4-\u2AB0\u2AB3-\u2AC8\u2ACB\u2ACC\u2ACF-\u2ADB\u2AE4\u2AE6-\u2AE9\u2AEB-\u2AF3\u2AFD\uFB00-\uFB04]|\uD835[\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDCCF\uDD04\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDD6B]/g,c={"­":"shy","‌":"zwnj","‍":"zwj","‎":"lrm","⁣":"ic","⁢":"it","⁡":"af","‏":"rlm","​":"ZeroWidthSpace","⁠":"NoBreak","̑":"DownBreve","⃛":"tdot","⃜":"DotDot","\t":"Tab","\n":"NewLine"," ":"puncsp"," ":"MediumSpace"," ":"thinsp"," ":"hairsp"," ":"emsp13"," ":"ensp"," ":"emsp14"," ":"emsp"," ":"numsp"," ":"nbsp","  ":"ThickSpace","‾":"oline",_:"lowbar","‐":"dash","–":"ndash","—":"mdash","―":"horbar",",":"comma",";":"semi","⁏":"bsemi",":":"colon","⩴":"Colone","!":"excl","¡":"iexcl","?":"quest","¿":"iquest",".":"period","‥":"nldr","…":"mldr","·":"middot","'":"apos","‘":"lsquo","’":"rsquo","‚":"sbquo","‹":"lsaquo","›":"rsaquo",'"':"quot","“":"ldquo","”":"rdquo","„":"bdquo","«":"laquo","»":"raquo","(":"lpar",")":"rpar","[":"lsqb","]":"rsqb","{":"lcub","}":"rcub","⌈":"lceil","⌉":"rceil","⌊":"lfloor","⌋":"rfloor","⦅":"lopar","⦆":"ropar","⦋":"lbrke","⦌":"rbrke","⦍":"lbrkslu","⦎":"rbrksld","⦏":"lbrksld","⦐":"rbrkslu","⦑":"langd","⦒":"rangd","⦓":"lparlt","⦔":"rpargt","⦕":"gtlPar","⦖":"ltrPar","⟦":"lobrk","⟧":"robrk","⟨":"lang","⟩":"rang","⟪":"Lang","⟫":"Rang","⟬":"loang","⟭":"roang","❲":"lbbrk","❳":"rbbrk","‖":"Vert","§":"sect","¶":"para","@":"commat","*":"ast","/":"sol",undefined:null,"&":"amp","#":"num","%":"percnt","‰":"permil","‱":"pertenk","†":"dagger","‡":"Dagger","•":"bull","⁃":"hybull","′":"prime","″":"Prime","‴":"tprime","⁗":"qprime","‵":"bprime","⁁":"caret","`":"grave","´":"acute","˜":"tilde","^":"Hat","¯":"macr","˘":"breve","˙":"dot","¨":"die","˚":"ring","˝":"dblac","¸":"cedil","˛":"ogon","ˆ":"circ","ˇ":"caron","°":"deg","©":"copy","®":"reg","℗":"copysr","℘":"wp","℞":"rx","℧":"mho","℩":"iiota","←":"larr","↚":"nlarr","→":"rarr","↛":"nrarr","↑":"uarr","↓":"darr","↔":"harr","↮":"nharr","↕":"varr","↖":"nwarr","↗":"nearr","↘":"searr","↙":"swarr","↝":"rarrw","↝̸":"nrarrw","↞":"Larr","↟":"Uarr","↠":"Rarr","↡":"Darr","↢":"larrtl","↣":"rarrtl","↤":"mapstoleft","↥":"mapstoup","↦":"map","↧":"mapstodown","↩":"larrhk","↪":"rarrhk","↫":"larrlp","↬":"rarrlp","↭":"harrw","↰":"lsh","↱":"rsh","↲":"ldsh","↳":"rdsh","↵":"crarr","↶":"cularr","↷":"curarr","↺":"olarr","↻":"orarr","↼":"lharu","↽":"lhard","↾":"uharr","↿":"uharl","⇀":"rharu","⇁":"rhard","⇂":"dharr","⇃":"dharl","⇄":"rlarr","⇅":"udarr","⇆":"lrarr","⇇":"llarr","⇈":"uuarr","⇉":"rrarr","⇊":"ddarr","⇋":"lrhar","⇌":"rlhar","⇐":"lArr","⇍":"nlArr","⇑":"uArr","⇒":"rArr","⇏":"nrArr","⇓":"dArr","⇔":"iff","⇎":"nhArr","⇕":"vArr","⇖":"nwArr","⇗":"neArr","⇘":"seArr","⇙":"swArr","⇚":"lAarr","⇛":"rAarr","⇝":"zigrarr","⇤":"larrb","⇥":"rarrb","⇵":"duarr","⇽":"loarr","⇾":"roarr","⇿":"hoarr","∀":"forall","∁":"comp","∂":"part","∂̸":"npart","∃":"exist","∄":"nexist","∅":"empty","∇":"Del","∈":"in","∉":"notin","∋":"ni","∌":"notni","϶":"bepsi","∏":"prod","∐":"coprod","∑":"sum","+":"plus","±":"pm","÷":"div","×":"times","<":"lt","≮":"nlt","<⃒":"nvlt","=":"equals","≠":"ne","=⃥":"bne","⩵":"Equal",">":"gt","≯":"ngt",">⃒":"nvgt","¬":"not","|":"vert","¦":"brvbar","−":"minus","∓":"mp","∔":"plusdo","⁄":"frasl","∖":"setmn","∗":"lowast","∘":"compfn","√":"Sqrt","∝":"prop","∞":"infin","∟":"angrt","∠":"ang","∠⃒":"nang","∡":"angmsd","∢":"angsph","∣":"mid","∤":"nmid","∥":"par","∦":"npar","∧":"and","∨":"or","∩":"cap","∩︀":"caps","∪":"cup","∪︀":"cups","∫":"int","∬":"Int","∭":"tint","⨌":"qint","∮":"oint","∯":"Conint","∰":"Cconint","∱":"cwint","∲":"cwconint","∳":"awconint","∴":"there4","∵":"becaus","∶":"ratio","∷":"Colon","∸":"minusd","∺":"mDDot","∻":"homtht","∼":"sim","≁":"nsim","∼⃒":"nvsim","∽":"bsim","∽̱":"race","∾":"ac","∾̳":"acE","∿":"acd","≀":"wr","≂":"esim","≂̸":"nesim","≃":"sime","≄":"nsime","≅":"cong","≇":"ncong","≆":"simne","≈":"ap","≉":"nap","≊":"ape","≋":"apid","≋̸":"napid","≌":"bcong","≍":"CupCap","≭":"NotCupCap","≍⃒":"nvap","≎":"bump","≎̸":"nbump","≏":"bumpe","≏̸":"nbumpe","≐":"doteq","≐̸":"nedot","≑":"eDot","≒":"efDot","≓":"erDot","≔":"colone","≕":"ecolon","≖":"ecir","≗":"cire","≙":"wedgeq","≚":"veeeq","≜":"trie","≟":"equest","≡":"equiv","≢":"nequiv","≡⃥":"bnequiv","≤":"le","≰":"nle","≤⃒":"nvle","≥":"ge","≱":"nge","≥⃒":"nvge","≦":"lE","≦̸":"nlE","≧":"gE","≧̸":"ngE","≨︀":"lvnE","≨":"lnE","≩":"gnE","≩︀":"gvnE","≪":"ll","≪̸":"nLtv","≪⃒":"nLt","≫":"gg","≫̸":"nGtv","≫⃒":"nGt","≬":"twixt","≲":"lsim","≴":"nlsim","≳":"gsim","≵":"ngsim","≶":"lg","≸":"ntlg","≷":"gl","≹":"ntgl","≺":"pr","⊀":"npr","≻":"sc","⊁":"nsc","≼":"prcue","⋠":"nprcue","≽":"sccue","⋡":"nsccue","≾":"prsim","≿":"scsim","≿̸":"NotSucceedsTilde","⊂":"sub","⊄":"nsub","⊂⃒":"vnsub","⊃":"sup","⊅":"nsup","⊃⃒":"vnsup","⊆":"sube","⊈":"nsube","⊇":"supe","⊉":"nsupe","⊊︀":"vsubne","⊊":"subne","⊋︀":"vsupne","⊋":"supne","⊍":"cupdot","⊎":"uplus","⊏":"sqsub","⊏̸":"NotSquareSubset","⊐":"sqsup","⊐̸":"NotSquareSuperset","⊑":"sqsube","⋢":"nsqsube","⊒":"sqsupe","⋣":"nsqsupe","⊓":"sqcap","⊓︀":"sqcaps","⊔":"sqcup","⊔︀":"sqcups","⊕":"oplus","⊖":"ominus","⊗":"otimes","⊘":"osol","⊙":"odot","⊚":"ocir","⊛":"oast","⊝":"odash","⊞":"plusb","⊟":"minusb","⊠":"timesb","⊡":"sdotb","⊢":"vdash","⊬":"nvdash","⊣":"dashv","⊤":"top","⊥":"bot","⊧":"models","⊨":"vDash","⊭":"nvDash","⊩":"Vdash","⊮":"nVdash","⊪":"Vvdash","⊫":"VDash","⊯":"nVDash","⊰":"prurel","⊲":"vltri","⋪":"nltri","⊳":"vrtri","⋫":"nrtri","⊴":"ltrie","⋬":"nltrie","⊴⃒":"nvltrie","⊵":"rtrie","⋭":"nrtrie","⊵⃒":"nvrtrie","⊶":"origof","⊷":"imof","⊸":"mumap","⊹":"hercon","⊺":"intcal","⊻":"veebar","⊽":"barvee","⊾":"angrtvb","⊿":"lrtri","⋀":"Wedge","⋁":"Vee","⋂":"xcap","⋃":"xcup","⋄":"diam","⋅":"sdot","⋆":"Star","⋇":"divonx","⋈":"bowtie","⋉":"ltimes","⋊":"rtimes","⋋":"lthree","⋌":"rthree","⋍":"bsime","⋎":"cuvee","⋏":"cuwed","⋐":"Sub","⋑":"Sup","⋒":"Cap","⋓":"Cup","⋔":"fork","⋕":"epar","⋖":"ltdot","⋗":"gtdot","⋘":"Ll","⋘̸":"nLl","⋙":"Gg","⋙̸":"nGg","⋚︀":"lesg","⋚":"leg","⋛":"gel","⋛︀":"gesl","⋞":"cuepr","⋟":"cuesc","⋦":"lnsim","⋧":"gnsim","⋨":"prnsim","⋩":"scnsim","⋮":"vellip","⋯":"ctdot","⋰":"utdot","⋱":"dtdot","⋲":"disin","⋳":"isinsv","⋴":"isins","⋵":"isindot","⋵̸":"notindot","⋶":"notinvc","⋷":"notinvb","⋹":"isinE","⋹̸":"notinE","⋺":"nisd","⋻":"xnis","⋼":"nis","⋽":"notnivc","⋾":"notnivb","⌅":"barwed","⌆":"Barwed","⌌":"drcrop","⌍":"dlcrop","⌎":"urcrop","⌏":"ulcrop","⌐":"bnot","⌒":"profline","⌓":"profsurf","⌕":"telrec","⌖":"target","⌜":"ulcorn","⌝":"urcorn","⌞":"dlcorn","⌟":"drcorn","⌢":"frown","⌣":"smile","⌭":"cylcty","⌮":"profalar","⌶":"topbot","⌽":"ovbar","⌿":"solbar","⍼":"angzarr","⎰":"lmoust","⎱":"rmoust","⎴":"tbrk","⎵":"bbrk","⎶":"bbrktbrk","⏜":"OverParenthesis","⏝":"UnderParenthesis","⏞":"OverBrace","⏟":"UnderBrace","⏢":"trpezium","⏧":"elinters","␣":"blank","─":"boxh","│":"boxv","┌":"boxdr","┐":"boxdl","└":"boxur","┘":"boxul","├":"boxvr","┤":"boxvl","┬":"boxhd","┴":"boxhu","┼":"boxvh","═":"boxH","║":"boxV","╒":"boxdR","╓":"boxDr","╔":"boxDR","╕":"boxdL","╖":"boxDl","╗":"boxDL","╘":"boxuR","╙":"boxUr","╚":"boxUR","╛":"boxuL","╜":"boxUl","╝":"boxUL","╞":"boxvR","╟":"boxVr","╠":"boxVR","╡":"boxvL","╢":"boxVl","╣":"boxVL","╤":"boxHd","╥":"boxhD","╦":"boxHD","╧":"boxHu","╨":"boxhU","╩":"boxHU","╪":"boxvH","╫":"boxVh","╬":"boxVH","▀":"uhblk","▄":"lhblk","█":"block","░":"blk14","▒":"blk12","▓":"blk34","□":"squ","▪":"squf","▫":"EmptyVerySmallSquare","▭":"rect","▮":"marker","▱":"fltns","△":"xutri","▴":"utrif","▵":"utri","▸":"rtrif","▹":"rtri","▽":"xdtri","▾":"dtrif","▿":"dtri","◂":"ltrif","◃":"ltri","◊":"loz","○":"cir","◬":"tridot","◯":"xcirc","◸":"ultri","◹":"urtri","◺":"lltri","◻":"EmptySmallSquare","◼":"FilledSmallSquare","★":"starf","☆":"star","☎":"phone","♀":"female","♂":"male","♠":"spades","♣":"clubs","♥":"hearts","♦":"diams","♪":"sung","✓":"check","✗":"cross","✠":"malt","✶":"sext","❘":"VerticalSeparator","⟈":"bsolhsub","⟉":"suphsol","⟵":"xlarr","⟶":"xrarr","⟷":"xharr","⟸":"xlArr","⟹":"xrArr","⟺":"xhArr","⟼":"xmap","⟿":"dzigrarr","⤂":"nvlArr","⤃":"nvrArr","⤄":"nvHarr","⤅":"Map","⤌":"lbarr","⤍":"rbarr","⤎":"lBarr","⤏":"rBarr","⤐":"RBarr","⤑":"DDotrahd","⤒":"UpArrowBar","⤓":"DownArrowBar","⤖":"Rarrtl","⤙":"latail","⤚":"ratail","⤛":"lAtail","⤜":"rAtail","⤝":"larrfs","⤞":"rarrfs","⤟":"larrbfs","⤠":"rarrbfs","⤣":"nwarhk","⤤":"nearhk","⤥":"searhk","⤦":"swarhk","⤧":"nwnear","⤨":"toea","⤩":"tosa","⤪":"swnwar","⤳":"rarrc","⤳̸":"nrarrc","⤵":"cudarrr","⤶":"ldca","⤷":"rdca","⤸":"cudarrl","⤹":"larrpl","⤼":"curarrm","⤽":"cularrp","⥅":"rarrpl","⥈":"harrcir","⥉":"Uarrocir","⥊":"lurdshar","⥋":"ldrushar","⥎":"LeftRightVector","⥏":"RightUpDownVector","⥐":"DownLeftRightVector","⥑":"LeftUpDownVector","⥒":"LeftVectorBar","⥓":"RightVectorBar","⥔":"RightUpVectorBar","⥕":"RightDownVectorBar","⥖":"DownLeftVectorBar","⥗":"DownRightVectorBar","⥘":"LeftUpVectorBar","⥙":"LeftDownVectorBar","⥚":"LeftTeeVector","⥛":"RightTeeVector","⥜":"RightUpTeeVector","⥝":"RightDownTeeVector","⥞":"DownLeftTeeVector","⥟":"DownRightTeeVector","⥠":"LeftUpTeeVector","⥡":"LeftDownTeeVector","⥢":"lHar","⥣":"uHar","⥤":"rHar","⥥":"dHar","⥦":"luruhar","⥧":"ldrdhar","⥨":"ruluhar","⥩":"rdldhar","⥪":"lharul","⥫":"llhard","⥬":"rharul","⥭":"lrhard","⥮":"udhar","⥯":"duhar","⥰":"RoundImplies","⥱":"erarr","⥲":"simrarr","⥳":"larrsim","⥴":"rarrsim","⥵":"rarrap","⥶":"ltlarr","⥸":"gtrarr","⥹":"subrarr","⥻":"suplarr","⥼":"lfisht","⥽":"rfisht","⥾":"ufisht","⥿":"dfisht","⦚":"vzigzag","⦜":"vangrt","⦝":"angrtvbd","⦤":"ange","⦥":"range","⦦":"dwangle","⦧":"uwangle","⦨":"angmsdaa","⦩":"angmsdab","⦪":"angmsdac","⦫":"angmsdad","⦬":"angmsdae","⦭":"angmsdaf","⦮":"angmsdag","⦯":"angmsdah","⦰":"bemptyv","⦱":"demptyv","⦲":"cemptyv","⦳":"raemptyv","⦴":"laemptyv","⦵":"ohbar","⦶":"omid","⦷":"opar","⦹":"operp","⦻":"olcross","⦼":"odsold","⦾":"olcir","⦿":"ofcir","⧀":"olt","⧁":"ogt","⧂":"cirscir","⧃":"cirE","⧄":"solb","⧅":"bsolb","⧉":"boxbox","⧍":"trisb","⧎":"rtriltri","⧏":"LeftTriangleBar","⧏̸":"NotLeftTriangleBar","⧐":"RightTriangleBar","⧐̸":"NotRightTriangleBar","⧜":"iinfin","⧝":"infintie","⧞":"nvinfin","⧣":"eparsl","⧤":"smeparsl","⧥":"eqvparsl","⧫":"lozf","⧴":"RuleDelayed","⧶":"dsol","⨀":"xodot","⨁":"xoplus","⨂":"xotime","⨄":"xuplus","⨆":"xsqcup","⨍":"fpartint","⨐":"cirfnint","⨑":"awint","⨒":"rppolint","⨓":"scpolint","⨔":"npolint","⨕":"pointint","⨖":"quatint","⨗":"intlarhk","⨢":"pluscir","⨣":"plusacir","⨤":"simplus","⨥":"plusdu","⨦":"plussim","⨧":"plustwo","⨩":"mcomma","⨪":"minusdu","⨭":"loplus","⨮":"roplus","⨯":"Cross","⨰":"timesd","⨱":"timesbar","⨳":"smashp","⨴":"lotimes","⨵":"rotimes","⨶":"otimesas","⨷":"Otimes","⨸":"odiv","⨹":"triplus","⨺":"triminus","⨻":"tritime","⨼":"iprod","⨿":"amalg","⩀":"capdot","⩂":"ncup","⩃":"ncap","⩄":"capand","⩅":"cupor","⩆":"cupcap","⩇":"capcup","⩈":"cupbrcap","⩉":"capbrcup","⩊":"cupcup","⩋":"capcap","⩌":"ccups","⩍":"ccaps","⩐":"ccupssm","⩓":"And","⩔":"Or","⩕":"andand","⩖":"oror","⩗":"orslope","⩘":"andslope","⩚":"andv","⩛":"orv","⩜":"andd","⩝":"ord","⩟":"wedbar","⩦":"sdote","⩪":"simdot","⩭":"congdot","⩭̸":"ncongdot","⩮":"easter","⩯":"apacir","⩰":"apE","⩰̸":"napE","⩱":"eplus","⩲":"pluse","⩳":"Esim","⩷":"eDDot","⩸":"equivDD","⩹":"ltcir","⩺":"gtcir","⩻":"ltquest","⩼":"gtquest","⩽":"les","⩽̸":"nles","⩾":"ges","⩾̸":"nges","⩿":"lesdot","⪀":"gesdot","⪁":"lesdoto","⪂":"gesdoto","⪃":"lesdotor","⪄":"gesdotol","⪅":"lap","⪆":"gap","⪇":"lne","⪈":"gne","⪉":"lnap","⪊":"gnap","⪋":"lEg","⪌":"gEl","⪍":"lsime","⪎":"gsime","⪏":"lsimg","⪐":"gsiml","⪑":"lgE","⪒":"glE","⪓":"lesges","⪔":"gesles","⪕":"els","⪖":"egs","⪗":"elsdot","⪘":"egsdot","⪙":"el","⪚":"eg","⪝":"siml","⪞":"simg","⪟":"simlE","⪠":"simgE","⪡":"LessLess","⪡̸":"NotNestedLessLess","⪢":"GreaterGreater","⪢̸":"NotNestedGreaterGreater","⪤":"glj","⪥":"gla","⪦":"ltcc","⪧":"gtcc","⪨":"lescc","⪩":"gescc","⪪":"smt","⪫":"lat","⪬":"smte","⪬︀":"smtes","⪭":"late","⪭︀":"lates","⪮":"bumpE","⪯":"pre","⪯̸":"npre","⪰":"sce","⪰̸":"nsce","⪳":"prE","⪴":"scE","⪵":"prnE","⪶":"scnE","⪷":"prap","⪸":"scap","⪹":"prnap","⪺":"scnap","⪻":"Pr","⪼":"Sc","⪽":"subdot","⪾":"supdot","⪿":"subplus","⫀":"supplus","⫁":"submult","⫂":"supmult","⫃":"subedot","⫄":"supedot","⫅":"subE","⫅̸":"nsubE","⫆":"supE","⫆̸":"nsupE","⫇":"subsim","⫈":"supsim","⫋︀":"vsubnE","⫋":"subnE","⫌︀":"vsupnE","⫌":"supnE","⫏":"csub","⫐":"csup","⫑":"csube","⫒":"csupe","⫓":"subsup","⫔":"supsub","⫕":"subsub","⫖":"supsup","⫗":"suphsub","⫘":"supdsub","⫙":"forkv","⫚":"topfork","⫛":"mlcp","⫤":"Dashv","⫦":"Vdashl","⫧":"Barv","⫨":"vBar","⫩":"vBarv","⫫":"Vbar","⫬":"Not","⫭":"bNot","⫮":"rnmid","⫯":"cirmid","⫰":"midcir","⫱":"topcir","⫲":"nhpar","⫳":"parsim","⫽":"parsl","⫽⃥":"nparsl","♭":"flat","♮":"natur","♯":"sharp","¤":"curren","¢":"cent",$:"dollar","£":"pound","¥":"yen","€":"euro","¹":"sup1","½":"half","⅓":"frac13","¼":"frac14","⅕":"frac15","⅙":"frac16","⅛":"frac18","²":"sup2","⅔":"frac23","⅖":"frac25","³":"sup3","¾":"frac34","⅗":"frac35","⅜":"frac38","⅘":"frac45","⅚":"frac56","⅝":"frac58","⅞":"frac78","𝒶":"ascr","𝕒":"aopf","𝔞":"afr","𝔸":"Aopf","𝔄":"Afr","𝒜":"Ascr","ª":"ordf","á":"aacute","Á":"Aacute","à":"agrave","À":"Agrave","ă":"abreve","Ă":"Abreve","â":"acirc","Â":"Acirc","å":"aring","Å":"angst","ä":"auml","Ä":"Auml","ã":"atilde","Ã":"Atilde","ą":"aogon","Ą":"Aogon","ā":"amacr","Ā":"Amacr","æ":"aelig","Æ":"AElig","𝒷":"bscr","𝕓":"bopf","𝔟":"bfr","𝔹":"Bopf","ℬ":"Bscr","𝔅":"Bfr","𝔠":"cfr","𝒸":"cscr","𝕔":"copf","ℭ":"Cfr","𝒞":"Cscr","ℂ":"Copf","ć":"cacute","Ć":"Cacute","ĉ":"ccirc","Ĉ":"Ccirc","č":"ccaron","Č":"Ccaron","ċ":"cdot","Ċ":"Cdot","ç":"ccedil","Ç":"Ccedil","℅":"incare","𝔡":"dfr","ⅆ":"dd","𝕕":"dopf","𝒹":"dscr","𝒟":"Dscr","𝔇":"Dfr","ⅅ":"DD","𝔻":"Dopf","ď":"dcaron","Ď":"Dcaron","đ":"dstrok","Đ":"Dstrok","ð":"eth","Ð":"ETH","ⅇ":"ee","ℯ":"escr","𝔢":"efr","𝕖":"eopf","ℰ":"Escr","𝔈":"Efr","𝔼":"Eopf","é":"eacute","É":"Eacute","è":"egrave","È":"Egrave","ê":"ecirc","Ê":"Ecirc","ě":"ecaron","Ě":"Ecaron","ë":"euml","Ë":"Euml","ė":"edot","Ė":"Edot","ę":"eogon","Ę":"Eogon","ē":"emacr","Ē":"Emacr","𝔣":"ffr","𝕗":"fopf","𝒻":"fscr","𝔉":"Ffr","𝔽":"Fopf","ℱ":"Fscr","ﬀ":"fflig","ﬃ":"ffilig","ﬄ":"ffllig","ﬁ":"filig",fj:"fjlig","ﬂ":"fllig","ƒ":"fnof","ℊ":"gscr","𝕘":"gopf","𝔤":"gfr","𝒢":"Gscr","𝔾":"Gopf","𝔊":"Gfr","ǵ":"gacute","ğ":"gbreve","Ğ":"Gbreve","ĝ":"gcirc","Ĝ":"Gcirc","ġ":"gdot","Ġ":"Gdot","Ģ":"Gcedil","𝔥":"hfr","ℎ":"planckh","𝒽":"hscr","𝕙":"hopf","ℋ":"Hscr","ℌ":"Hfr","ℍ":"Hopf","ĥ":"hcirc","Ĥ":"Hcirc","ℏ":"hbar","ħ":"hstrok","Ħ":"Hstrok","𝕚":"iopf","𝔦":"ifr","𝒾":"iscr","ⅈ":"ii","𝕀":"Iopf","ℐ":"Iscr","ℑ":"Im","í":"iacute","Í":"Iacute","ì":"igrave","Ì":"Igrave","î":"icirc","Î":"Icirc","ï":"iuml","Ï":"Iuml","ĩ":"itilde","Ĩ":"Itilde","İ":"Idot","į":"iogon","Į":"Iogon","ī":"imacr","Ī":"Imacr","ĳ":"ijlig","Ĳ":"IJlig","ı":"imath","𝒿":"jscr","𝕛":"jopf","𝔧":"jfr","𝒥":"Jscr","𝔍":"Jfr","𝕁":"Jopf","ĵ":"jcirc","Ĵ":"Jcirc","ȷ":"jmath","𝕜":"kopf","𝓀":"kscr","𝔨":"kfr","𝒦":"Kscr","𝕂":"Kopf","𝔎":"Kfr","ķ":"kcedil","Ķ":"Kcedil","𝔩":"lfr","𝓁":"lscr","ℓ":"ell","𝕝":"lopf","ℒ":"Lscr","𝔏":"Lfr","𝕃":"Lopf","ĺ":"lacute","Ĺ":"Lacute","ľ":"lcaron","Ľ":"Lcaron","ļ":"lcedil","Ļ":"Lcedil","ł":"lstrok","Ł":"Lstrok","ŀ":"lmidot","Ŀ":"Lmidot","𝔪":"mfr","𝕞":"mopf","𝓂":"mscr","𝔐":"Mfr","𝕄":"Mopf","ℳ":"Mscr","𝔫":"nfr","𝕟":"nopf","𝓃":"nscr","ℕ":"Nopf","𝒩":"Nscr","𝔑":"Nfr","ń":"nacute","Ń":"Nacute","ň":"ncaron","Ň":"Ncaron","ñ":"ntilde","Ñ":"Ntilde","ņ":"ncedil","Ņ":"Ncedil","№":"numero","ŋ":"eng","Ŋ":"ENG","𝕠":"oopf","𝔬":"ofr","ℴ":"oscr","𝒪":"Oscr","𝔒":"Ofr","𝕆":"Oopf","º":"ordm","ó":"oacute","Ó":"Oacute","ò":"ograve","Ò":"Ograve","ô":"ocirc","Ô":"Ocirc","ö":"ouml","Ö":"Ouml","ő":"odblac","Ő":"Odblac","õ":"otilde","Õ":"Otilde","ø":"oslash","Ø":"Oslash","ō":"omacr","Ō":"Omacr","œ":"oelig","Œ":"OElig","𝔭":"pfr","𝓅":"pscr","𝕡":"popf","ℙ":"Popf","𝔓":"Pfr","𝒫":"Pscr","𝕢":"qopf","𝔮":"qfr","𝓆":"qscr","𝒬":"Qscr","𝔔":"Qfr","ℚ":"Qopf","ĸ":"kgreen","𝔯":"rfr","𝕣":"ropf","𝓇":"rscr","ℛ":"Rscr","ℜ":"Re","ℝ":"Ropf","ŕ":"racute","Ŕ":"Racute","ř":"rcaron","Ř":"Rcaron","ŗ":"rcedil","Ŗ":"Rcedil","𝕤":"sopf","𝓈":"sscr","𝔰":"sfr","𝕊":"Sopf","𝔖":"Sfr","𝒮":"Sscr","Ⓢ":"oS","ś":"sacute","Ś":"Sacute","ŝ":"scirc","Ŝ":"Scirc","š":"scaron","Š":"Scaron","ş":"scedil","Ş":"Scedil","ß":"szlig","𝔱":"tfr","𝓉":"tscr","𝕥":"topf","𝒯":"Tscr","𝔗":"Tfr","𝕋":"Topf","ť":"tcaron","Ť":"Tcaron","ţ":"tcedil","Ţ":"Tcedil","™":"trade","ŧ":"tstrok","Ŧ":"Tstrok","𝓊":"uscr","𝕦":"uopf","𝔲":"ufr","𝕌":"Uopf","𝔘":"Ufr","𝒰":"Uscr","ú":"uacute","Ú":"Uacute","ù":"ugrave","Ù":"Ugrave","ŭ":"ubreve","Ŭ":"Ubreve","û":"ucirc","Û":"Ucirc","ů":"uring","Ů":"Uring","ü":"uuml","Ü":"Uuml","ű":"udblac","Ű":"Udblac","ũ":"utilde","Ũ":"Utilde","ų":"uogon","Ų":"Uogon","ū":"umacr","Ū":"Umacr","𝔳":"vfr","𝕧":"vopf","𝓋":"vscr","𝔙":"Vfr","𝕍":"Vopf","𝒱":"Vscr","𝕨":"wopf","𝓌":"wscr","𝔴":"wfr","𝒲":"Wscr","𝕎":"Wopf","𝔚":"Wfr","ŵ":"wcirc","Ŵ":"Wcirc","𝔵":"xfr","𝓍":"xscr","𝕩":"xopf","𝕏":"Xopf","𝔛":"Xfr","𝒳":"Xscr","𝔶":"yfr","𝓎":"yscr","𝕪":"yopf","𝒴":"Yscr","𝔜":"Yfr","𝕐":"Yopf","ý":"yacute","Ý":"Yacute","ŷ":"ycirc","Ŷ":"Ycirc","ÿ":"yuml","Ÿ":"Yuml","𝓏":"zscr","𝔷":"zfr","𝕫":"zopf","ℨ":"Zfr","ℤ":"Zopf","𝒵":"Zscr","ź":"zacute","Ź":"Zacute","ž":"zcaron","Ž":"Zcaron","ż":"zdot","Ż":"Zdot","Ƶ":"imped","þ":"thorn","Þ":"THORN","ŉ":"napos","α":"alpha","Α":"Alpha","β":"beta","Β":"Beta","γ":"gamma","Γ":"Gamma","δ":"delta","Δ":"Delta","ε":"epsi","ϵ":"epsiv","Ε":"Epsilon","ϝ":"gammad","Ϝ":"Gammad","ζ":"zeta","Ζ":"Zeta","η":"eta","Η":"Eta","θ":"theta","ϑ":"thetav","Θ":"Theta","ι":"iota","Ι":"Iota","κ":"kappa","ϰ":"kappav","Κ":"Kappa","λ":"lambda","Λ":"Lambda","μ":"mu","µ":"micro","Μ":"Mu","ν":"nu","Ν":"Nu","ξ":"xi","Ξ":"Xi","ο":"omicron","Ο":"Omicron","π":"pi","ϖ":"piv","Π":"Pi","ρ":"rho","ϱ":"rhov","Ρ":"Rho","σ":"sigma","Σ":"Sigma","ς":"sigmaf","τ":"tau","Τ":"Tau","υ":"upsi","Υ":"Upsilon","ϒ":"Upsi","φ":"phi","ϕ":"phiv","Φ":"Phi","χ":"chi","Χ":"Chi","ψ":"psi","Ψ":"Psi","ω":"omega","Ω":"ohm","а":"acy","А":"Acy","б":"bcy","Б":"Bcy","в":"vcy","В":"Vcy","г":"gcy","Г":"Gcy","ѓ":"gjcy","Ѓ":"GJcy","д":"dcy","Д":"Dcy","ђ":"djcy","Ђ":"DJcy","е":"iecy","Е":"IEcy","ё":"iocy","Ё":"IOcy","є":"jukcy","Є":"Jukcy","ж":"zhcy","Ж":"ZHcy","з":"zcy","З":"Zcy","ѕ":"dscy","Ѕ":"DScy","и":"icy","И":"Icy","і":"iukcy","І":"Iukcy","ї":"yicy","Ї":"YIcy","й":"jcy","Й":"Jcy","ј":"jsercy","Ј":"Jsercy","к":"kcy","К":"Kcy","ќ":"kjcy","Ќ":"KJcy","л":"lcy","Л":"Lcy","љ":"ljcy","Љ":"LJcy","м":"mcy","М":"Mcy","н":"ncy","Н":"Ncy","њ":"njcy","Њ":"NJcy","о":"ocy","О":"Ocy","п":"pcy","П":"Pcy","р":"rcy","Р":"Rcy","с":"scy","С":"Scy","т":"tcy","Т":"Tcy","ћ":"tshcy","Ћ":"TSHcy","у":"ucy","У":"Ucy","ў":"ubrcy","Ў":"Ubrcy","ф":"fcy","Ф":"Fcy","х":"khcy","Х":"KHcy","ц":"tscy","Ц":"TScy","ч":"chcy","Ч":"CHcy","џ":"dzcy","Џ":"DZcy","ш":"shcy","Ш":"SHcy","щ":"shchcy","Щ":"SHCHcy","ъ":"hardcy","Ъ":"HARDcy","ы":"ycy","Ы":"Ycy","ь":"softcy","Ь":"SOFTcy","э":"ecy","Э":"Ecy","ю":"yucy","Ю":"YUcy","я":"yacy","Я":"YAcy","ℵ":"aleph","ℶ":"beth","ℷ":"gimel","ℸ":"daleth"},d=/["&'<>`]/g,h={'"':"&quot;","&":"&amp;","'":"&#x27;","<":"&lt;",">":"&gt;","`":"&#x60;"},f=/&#(?:[xX][^a-fA-F0-9]|[^0-9xX])/,p=/[\0-\x08\x0B\x0E-\x1F\x7F-\x9F\uFDD0-\uFDEF\uFFFE\uFFFF]|[\uD83F\uD87F\uD8BF\uD8FF\uD93F\uD97F\uD9BF\uD9FF\uDA3F\uDA7F\uDABF\uDAFF\uDB3F\uDB7F\uDBBF\uDBFF][\uDFFE\uDFFF]|[\uD800-\uDBFF](?![\uDC00-\uDFFF])|(?:[^\uD800-\uDBFF]|^)[\uDC00-\uDFFF]/,g=/&(CounterClockwiseContourIntegral|DoubleLongLeftRightArrow|ClockwiseContourIntegral|NotNestedGreaterGreater|NotSquareSupersetEqual|DiacriticalDoubleAcute|NotRightTriangleEqual|NotSucceedsSlantEqual|NotPrecedesSlantEqual|CloseCurlyDoubleQuote|NegativeVeryThinSpace|DoubleContourIntegral|FilledVerySmallSquare|CapitalDifferentialD|OpenCurlyDoubleQuote|EmptyVerySmallSquare|NestedGreaterGreater|DoubleLongRightArrow|NotLeftTriangleEqual|NotGreaterSlantEqual|ReverseUpEquilibrium|DoubleLeftRightArrow|NotSquareSubsetEqual|NotDoubleVerticalBar|RightArrowLeftArrow|NotGreaterFullEqual|NotRightTriangleBar|SquareSupersetEqual|DownLeftRightVector|DoubleLongLeftArrow|leftrightsquigarrow|LeftArrowRightArrow|NegativeMediumSpace|blacktriangleright|RightDownVectorBar|PrecedesSlantEqual|RightDoubleBracket|SucceedsSlantEqual|NotLeftTriangleBar|RightTriangleEqual|SquareIntersection|RightDownTeeVector|ReverseEquilibrium|NegativeThickSpace|longleftrightarrow|Longleftrightarrow|LongLeftRightArrow|DownRightTeeVector|DownRightVectorBar|GreaterSlantEqual|SquareSubsetEqual|LeftDownVectorBar|LeftDoubleBracket|VerticalSeparator|rightleftharpoons|NotGreaterGreater|NotSquareSuperset|blacktriangleleft|blacktriangledown|NegativeThinSpace|LeftDownTeeVector|NotLessSlantEqual|leftrightharpoons|DoubleUpDownArrow|DoubleVerticalBar|LeftTriangleEqual|FilledSmallSquare|twoheadrightarrow|NotNestedLessLess|DownLeftTeeVector|DownLeftVectorBar|RightAngleBracket|NotTildeFullEqual|NotReverseElement|RightUpDownVector|DiacriticalTilde|NotSucceedsTilde|circlearrowright|NotPrecedesEqual|rightharpoondown|DoubleRightArrow|NotSucceedsEqual|NonBreakingSpace|NotRightTriangle|LessEqualGreater|RightUpTeeVector|LeftAngleBracket|GreaterFullEqual|DownArrowUpArrow|RightUpVectorBar|twoheadleftarrow|GreaterEqualLess|downharpoonright|RightTriangleBar|ntrianglerighteq|NotSupersetEqual|LeftUpDownVector|DiacriticalAcute|rightrightarrows|vartriangleright|UpArrowDownArrow|DiacriticalGrave|UnderParenthesis|EmptySmallSquare|LeftUpVectorBar|leftrightarrows|DownRightVector|downharpoonleft|trianglerighteq|ShortRightArrow|OverParenthesis|DoubleLeftArrow|DoubleDownArrow|NotSquareSubset|bigtriangledown|ntrianglelefteq|UpperRightArrow|curvearrowright|vartriangleleft|NotLeftTriangle|nleftrightarrow|LowerRightArrow|NotHumpDownHump|NotGreaterTilde|rightthreetimes|LeftUpTeeVector|NotGreaterEqual|straightepsilon|LeftTriangleBar|rightsquigarrow|ContourIntegral|rightleftarrows|CloseCurlyQuote|RightDownVector|LeftRightVector|nLeftrightarrow|leftharpoondown|circlearrowleft|SquareSuperset|OpenCurlyQuote|hookrightarrow|HorizontalLine|DiacriticalDot|NotLessGreater|ntriangleright|DoubleRightTee|InvisibleComma|InvisibleTimes|LowerLeftArrow|DownLeftVector|NotSubsetEqual|curvearrowleft|trianglelefteq|NotVerticalBar|TildeFullEqual|downdownarrows|NotGreaterLess|RightTeeVector|ZeroWidthSpace|looparrowright|LongRightArrow|doublebarwedge|ShortLeftArrow|ShortDownArrow|RightVectorBar|GreaterGreater|ReverseElement|rightharpoonup|LessSlantEqual|leftthreetimes|upharpoonright|rightarrowtail|LeftDownVector|Longrightarrow|NestedLessLess|UpperLeftArrow|nshortparallel|leftleftarrows|leftrightarrow|Leftrightarrow|LeftRightArrow|longrightarrow|upharpoonleft|RightArrowBar|ApplyFunction|LeftTeeVector|leftarrowtail|NotEqualTilde|varsubsetneqq|varsupsetneqq|RightTeeArrow|SucceedsEqual|SucceedsTilde|LeftVectorBar|SupersetEqual|hookleftarrow|DifferentialD|VerticalTilde|VeryThinSpace|blacktriangle|bigtriangleup|LessFullEqual|divideontimes|leftharpoonup|UpEquilibrium|ntriangleleft|RightTriangle|measuredangle|shortparallel|longleftarrow|Longleftarrow|LongLeftArrow|DoubleLeftTee|Poincareplane|PrecedesEqual|triangleright|DoubleUpArrow|RightUpVector|fallingdotseq|looparrowleft|PrecedesTilde|NotTildeEqual|NotTildeTilde|smallsetminus|Proportional|triangleleft|triangledown|UnderBracket|NotHumpEqual|exponentiale|ExponentialE|NotLessTilde|HilbertSpace|RightCeiling|blacklozenge|varsupsetneq|HumpDownHump|GreaterEqual|VerticalLine|LeftTeeArrow|NotLessEqual|DownTeeArrow|LeftTriangle|varsubsetneq|Intersection|NotCongruent|DownArrowBar|LeftUpVector|LeftArrowBar|risingdotseq|GreaterTilde|RoundImplies|SquareSubset|ShortUpArrow|NotSuperset|quaternions|precnapprox|backepsilon|preccurlyeq|OverBracket|blacksquare|MediumSpace|VerticalBar|circledcirc|circleddash|CircleMinus|CircleTimes|LessGreater|curlyeqprec|curlyeqsucc|diamondsuit|UpDownArrow|Updownarrow|RuleDelayed|Rrightarrow|updownarrow|RightVector|nRightarrow|nrightarrow|eqslantless|LeftCeiling|Equilibrium|SmallCircle|expectation|NotSucceeds|thickapprox|GreaterLess|SquareUnion|NotPrecedes|NotLessLess|straightphi|succnapprox|succcurlyeq|SubsetEqual|sqsupseteq|Proportion|Laplacetrf|ImaginaryI|supsetneqq|NotGreater|gtreqqless|NotElement|ThickSpace|TildeEqual|TildeTilde|Fouriertrf|rmoustache|EqualTilde|eqslantgtr|UnderBrace|LeftVector|UpArrowBar|nLeftarrow|nsubseteqq|subsetneqq|nsupseteqq|nleftarrow|succapprox|lessapprox|UpTeeArrow|upuparrows|curlywedge|lesseqqgtr|varepsilon|varnothing|RightFloor|complement|CirclePlus|sqsubseteq|Lleftarrow|circledast|RightArrow|Rightarrow|rightarrow|lmoustache|Bernoullis|precapprox|mapstoleft|mapstodown|longmapsto|dotsquare|downarrow|DoubleDot|nsubseteq|supsetneq|leftarrow|nsupseteq|subsetneq|ThinSpace|ngeqslant|subseteqq|HumpEqual|NotSubset|triangleq|NotCupCap|lesseqgtr|heartsuit|TripleDot|Leftarrow|Coproduct|Congruent|varpropto|complexes|gvertneqq|LeftArrow|LessTilde|supseteqq|MinusPlus|CircleDot|nleqslant|NotExists|gtreqless|nparallel|UnionPlus|LeftFloor|checkmark|CenterDot|centerdot|Mellintrf|gtrapprox|bigotimes|OverBrace|spadesuit|therefore|pitchfork|rationals|PlusMinus|Backslash|Therefore|DownBreve|backsimeq|backprime|DownArrow|nshortmid|Downarrow|lvertneqq|eqvparsl|imagline|imagpart|infintie|integers|Integral|intercal|LessLess|Uarrocir|intlarhk|sqsupset|angmsdaf|sqsubset|llcorner|vartheta|cupbrcap|lnapprox|Superset|SuchThat|succnsim|succneqq|angmsdag|biguplus|curlyvee|trpezium|Succeeds|NotTilde|bigwedge|angmsdah|angrtvbd|triminus|cwconint|fpartint|lrcorner|smeparsl|subseteq|urcorner|lurdshar|laemptyv|DDotrahd|approxeq|ldrushar|awconint|mapstoup|backcong|shortmid|triangle|geqslant|gesdotol|timesbar|circledR|circledS|setminus|multimap|naturals|scpolint|ncongdot|RightTee|boxminus|gnapprox|boxtimes|andslope|thicksim|angmsdaa|varsigma|cirfnint|rtriltri|angmsdab|rppolint|angmsdac|barwedge|drbkarow|clubsuit|thetasym|bsolhsub|capbrcup|dzigrarr|doteqdot|DotEqual|dotminus|UnderBar|NotEqual|realpart|otimesas|ulcorner|hksearow|hkswarow|parallel|PartialD|elinters|emptyset|plusacir|bbrktbrk|angmsdad|pointint|bigoplus|angmsdae|Precedes|bigsqcup|varkappa|notindot|supseteq|precneqq|precnsim|profalar|profline|profsurf|leqslant|lesdotor|raemptyv|subplus|notnivb|notnivc|subrarr|zigrarr|vzigzag|submult|subedot|Element|between|cirscir|larrbfs|larrsim|lotimes|lbrksld|lbrkslu|lozenge|ldrdhar|dbkarow|bigcirc|epsilon|simrarr|simplus|ltquest|Epsilon|luruhar|gtquest|maltese|npolint|eqcolon|npreceq|bigodot|ddagger|gtrless|bnequiv|harrcir|ddotseq|equivDD|backsim|demptyv|nsqsube|nsqsupe|Upsilon|nsubset|upsilon|minusdu|nsucceq|swarrow|nsupset|coloneq|searrow|boxplus|napprox|natural|asympeq|alefsym|congdot|nearrow|bigstar|diamond|supplus|tritime|LeftTee|nvinfin|triplus|NewLine|nvltrie|nvrtrie|nwarrow|nexists|Diamond|ruluhar|Implies|supmult|angzarr|suplarr|suphsub|questeq|because|digamma|Because|olcross|bemptyv|omicron|Omicron|rotimes|NoBreak|intprod|angrtvb|orderof|uwangle|suphsol|lesdoto|orslope|DownTee|realine|cudarrl|rdldhar|OverBar|supedot|lessdot|supdsub|topfork|succsim|rbrkslu|rbrksld|pertenk|cudarrr|isindot|planckh|lessgtr|pluscir|gesdoto|plussim|plustwo|lesssim|cularrp|rarrsim|Cayleys|notinva|notinvb|notinvc|UpArrow|Uparrow|uparrow|NotLess|dwangle|precsim|Product|curarrm|Cconint|dotplus|rarrbfs|ccupssm|Cedilla|cemptyv|notniva|quatint|frac35|frac38|frac45|frac56|frac58|frac78|tridot|xoplus|gacute|gammad|Gammad|lfisht|lfloor|bigcup|sqsupe|gbreve|Gbreve|lharul|sqsube|sqcups|Gcedil|apacir|llhard|lmidot|Lmidot|lmoust|andand|sqcaps|approx|Abreve|spades|circeq|tprime|divide|topcir|Assign|topbot|gesdot|divonx|xuplus|timesd|gesles|atilde|solbar|SOFTcy|loplus|timesb|lowast|lowbar|dlcorn|dlcrop|softcy|dollar|lparlt|thksim|lrhard|Atilde|lsaquo|smashp|bigvee|thinsp|wreath|bkarow|lsquor|lstrok|Lstrok|lthree|ltimes|ltlarr|DotDot|simdot|ltrPar|weierp|xsqcup|angmsd|sigmav|sigmaf|zeetrf|Zcaron|zcaron|mapsto|vsupne|thetav|cirmid|marker|mcomma|Zacute|vsubnE|there4|gtlPar|vsubne|bottom|gtrarr|SHCHcy|shchcy|midast|midcir|middot|minusb|minusd|gtrdot|bowtie|sfrown|mnplus|models|colone|seswar|Colone|mstpos|searhk|gtrsim|nacute|Nacute|boxbox|telrec|hairsp|Tcedil|nbumpe|scnsim|ncaron|Ncaron|ncedil|Ncedil|hamilt|Scedil|nearhk|hardcy|HARDcy|tcedil|Tcaron|commat|nequiv|nesear|tcaron|target|hearts|nexist|varrho|scedil|Scaron|scaron|hellip|Sacute|sacute|hercon|swnwar|compfn|rtimes|rthree|rsquor|rsaquo|zacute|wedgeq|homtht|barvee|barwed|Barwed|rpargt|horbar|conint|swarhk|roplus|nltrie|hslash|hstrok|Hstrok|rmoust|Conint|bprime|hybull|hyphen|iacute|Iacute|supsup|supsub|supsim|varphi|coprod|brvbar|agrave|Supset|supset|igrave|Igrave|notinE|Agrave|iiiint|iinfin|copysr|wedbar|Verbar|vangrt|becaus|incare|verbar|inodot|bullet|drcorn|intcal|drcrop|cularr|vellip|Utilde|bumpeq|cupcap|dstrok|Dstrok|CupCap|cupcup|cupdot|eacute|Eacute|supdot|iquest|easter|ecaron|Ecaron|ecolon|isinsv|utilde|itilde|Itilde|curarr|succeq|Bumpeq|cacute|ulcrop|nparsl|Cacute|nprcue|egrave|Egrave|nrarrc|nrarrw|subsup|subsub|nrtrie|jsercy|nsccue|Jsercy|kappav|kcedil|Kcedil|subsim|ulcorn|nsimeq|egsdot|veebar|kgreen|capand|elsdot|Subset|subset|curren|aacute|lacute|Lacute|emptyv|ntilde|Ntilde|lagran|lambda|Lambda|capcap|Ugrave|langle|subdot|emsp13|numero|emsp14|nvdash|nvDash|nVdash|nVDash|ugrave|ufisht|nvHarr|larrfs|nvlArr|larrhk|larrlp|larrpl|nvrArr|Udblac|nwarhk|larrtl|nwnear|oacute|Oacute|latail|lAtail|sstarf|lbrace|odblac|Odblac|lbrack|udblac|odsold|eparsl|lcaron|Lcaron|ograve|Ograve|lcedil|Lcedil|Aacute|ssmile|ssetmn|squarf|ldquor|capcup|ominus|cylcty|rharul|eqcirc|dagger|rfloor|rfisht|Dagger|daleth|equals|origof|capdot|equest|dcaron|Dcaron|rdquor|oslash|Oslash|otilde|Otilde|otimes|Otimes|urcrop|Ubreve|ubreve|Yacute|Uacute|uacute|Rcedil|rcedil|urcorn|parsim|Rcaron|Vdashl|rcaron|Tstrok|percnt|period|permil|Exists|yacute|rbrack|rbrace|phmmat|ccaron|Ccaron|planck|ccedil|plankv|tstrok|female|plusdo|plusdu|ffilig|plusmn|ffllig|Ccedil|rAtail|dfisht|bernou|ratail|Rarrtl|rarrtl|angsph|rarrpl|rarrlp|rarrhk|xwedge|xotime|forall|ForAll|Vvdash|vsupnE|preceq|bigcap|frac12|frac13|frac14|primes|rarrfs|prnsim|frac15|Square|frac16|square|lesdot|frac18|frac23|propto|prurel|rarrap|rangle|puncsp|frac25|Racute|qprime|racute|lesges|frac34|abreve|AElig|eqsim|utdot|setmn|urtri|Equal|Uring|seArr|uring|searr|dashv|Dashv|mumap|nabla|iogon|Iogon|sdote|sdotb|scsim|napid|napos|equiv|natur|Acirc|dblac|erarr|nbump|iprod|erDot|ucirc|awint|esdot|angrt|ncong|isinE|scnap|Scirc|scirc|ndash|isins|Ubrcy|nearr|neArr|isinv|nedot|ubrcy|acute|Ycirc|iukcy|Iukcy|xutri|nesim|caret|jcirc|Jcirc|caron|twixt|ddarr|sccue|exist|jmath|sbquo|ngeqq|angst|ccaps|lceil|ngsim|UpTee|delta|Delta|rtrif|nharr|nhArr|nhpar|rtrie|jukcy|Jukcy|kappa|rsquo|Kappa|nlarr|nlArr|TSHcy|rrarr|aogon|Aogon|fflig|xrarr|tshcy|ccirc|nleqq|filig|upsih|nless|dharl|nlsim|fjlig|ropar|nltri|dharr|robrk|roarr|fllig|fltns|roang|rnmid|subnE|subne|lAarr|trisb|Ccirc|acirc|ccups|blank|VDash|forkv|Vdash|langd|cedil|blk12|blk14|laquo|strns|diams|notin|vDash|larrb|blk34|block|disin|uplus|vdash|vBarv|aelig|starf|Wedge|check|xrArr|lates|lbarr|lBarr|notni|lbbrk|bcong|frasl|lbrke|frown|vrtri|vprop|vnsup|gamma|Gamma|wedge|xodot|bdquo|srarr|doteq|ldquo|boxdl|boxdL|gcirc|Gcirc|boxDl|boxDL|boxdr|boxdR|boxDr|TRADE|trade|rlhar|boxDR|vnsub|npart|vltri|rlarr|boxhd|boxhD|nprec|gescc|nrarr|nrArr|boxHd|boxHD|boxhu|boxhU|nrtri|boxHu|clubs|boxHU|times|colon|Colon|gimel|xlArr|Tilde|nsime|tilde|nsmid|nspar|THORN|thorn|xlarr|nsube|nsubE|thkap|xhArr|comma|nsucc|boxul|boxuL|nsupe|nsupE|gneqq|gnsim|boxUl|boxUL|grave|boxur|boxuR|boxUr|boxUR|lescc|angle|bepsi|boxvh|varpi|boxvH|numsp|Theta|gsime|gsiml|theta|boxVh|boxVH|boxvl|gtcir|gtdot|boxvL|boxVl|boxVL|crarr|cross|Cross|nvsim|boxvr|nwarr|nwArr|sqsup|dtdot|Uogon|lhard|lharu|dtrif|ocirc|Ocirc|lhblk|duarr|odash|sqsub|Hacek|sqcup|llarr|duhar|oelig|OElig|ofcir|boxvR|uogon|lltri|boxVr|csube|uuarr|ohbar|csupe|ctdot|olarr|olcir|harrw|oline|sqcap|omacr|Omacr|omega|Omega|boxVR|aleph|lneqq|lnsim|loang|loarr|rharu|lobrk|hcirc|operp|oplus|rhard|Hcirc|orarr|Union|order|ecirc|Ecirc|cuepr|szlig|cuesc|breve|reals|eDDot|Breve|hoarr|lopar|utrif|rdquo|Umacr|umacr|efDot|swArr|ultri|alpha|rceil|ovbar|swarr|Wcirc|wcirc|smtes|smile|bsemi|lrarr|aring|parsl|lrhar|bsime|uhblk|lrtri|cupor|Aring|uharr|uharl|slarr|rbrke|bsolb|lsime|rbbrk|RBarr|lsimg|phone|rBarr|rbarr|icirc|lsquo|Icirc|emacr|Emacr|ratio|simne|plusb|simlE|simgE|simeq|pluse|ltcir|ltdot|empty|xharr|xdtri|iexcl|Alpha|ltrie|rarrw|pound|ltrif|xcirc|bumpe|prcue|bumpE|asymp|amacr|cuvee|Sigma|sigma|iiint|udhar|iiota|ijlig|IJlig|supnE|imacr|Imacr|prime|Prime|image|prnap|eogon|Eogon|rarrc|mdash|mDDot|cuwed|imath|supne|imped|Amacr|udarr|prsim|micro|rarrb|cwint|raquo|infin|eplus|range|rangd|Ucirc|radic|minus|amalg|veeeq|rAarr|epsiv|ycirc|quest|sharp|quot|zwnj|Qscr|race|qscr|Qopf|qopf|qint|rang|Rang|Zscr|zscr|Zopf|zopf|rarr|rArr|Rarr|Pscr|pscr|prop|prod|prnE|prec|ZHcy|zhcy|prap|Zeta|zeta|Popf|popf|Zdot|plus|zdot|Yuml|yuml|phiv|YUcy|yucy|Yscr|yscr|perp|Yopf|yopf|part|para|YIcy|Ouml|rcub|yicy|YAcy|rdca|ouml|osol|Oscr|rdsh|yacy|real|oscr|xvee|andd|rect|andv|Xscr|oror|ordm|ordf|xscr|ange|aopf|Aopf|rHar|Xopf|opar|Oopf|xopf|xnis|rhov|oopf|omid|xmap|oint|apid|apos|ogon|ascr|Ascr|odot|odiv|xcup|xcap|ocir|oast|nvlt|nvle|nvgt|nvge|nvap|Wscr|wscr|auml|ntlg|ntgl|nsup|nsub|nsim|Nscr|nscr|nsce|Wopf|ring|npre|wopf|npar|Auml|Barv|bbrk|Nopf|nopf|nmid|nLtv|beta|ropf|Ropf|Beta|beth|nles|rpar|nleq|bnot|bNot|nldr|NJcy|rscr|Rscr|Vscr|vscr|rsqb|njcy|bopf|nisd|Bopf|rtri|Vopf|nGtv|ngtr|vopf|boxh|boxH|boxv|nges|ngeq|boxV|bscr|scap|Bscr|bsim|Vert|vert|bsol|bull|bump|caps|cdot|ncup|scnE|ncap|nbsp|napE|Cdot|cent|sdot|Vbar|nang|vBar|chcy|Mscr|mscr|sect|semi|CHcy|Mopf|mopf|sext|circ|cire|mldr|mlcp|cirE|comp|shcy|SHcy|vArr|varr|cong|copf|Copf|copy|COPY|malt|male|macr|lvnE|cscr|ltri|sime|ltcc|simg|Cscr|siml|csub|Uuml|lsqb|lsim|uuml|csup|Lscr|lscr|utri|smid|lpar|cups|smte|lozf|darr|Lopf|Uscr|solb|lopf|sopf|Sopf|lneq|uscr|spar|dArr|lnap|Darr|dash|Sqrt|LJcy|ljcy|lHar|dHar|Upsi|upsi|diam|lesg|djcy|DJcy|leqq|dopf|Dopf|dscr|Dscr|dscy|ldsh|ldca|squf|DScy|sscr|Sscr|dsol|lcub|late|star|Star|Uopf|Larr|lArr|larr|uopf|dtri|dzcy|sube|subE|Lang|lang|Kscr|kscr|Kopf|kopf|KJcy|kjcy|KHcy|khcy|DZcy|ecir|edot|eDot|Jscr|jscr|succ|Jopf|jopf|Edot|uHar|emsp|ensp|Iuml|iuml|eopf|isin|Iscr|iscr|Eopf|epar|sung|epsi|escr|sup1|sup2|sup3|Iota|iota|supe|supE|Iopf|iopf|IOcy|iocy|Escr|esim|Esim|imof|Uarr|QUOT|uArr|uarr|euml|IEcy|iecy|Idot|Euml|euro|excl|Hscr|hscr|Hopf|hopf|TScy|tscy|Tscr|hbar|tscr|flat|tbrk|fnof|hArr|harr|half|fopf|Fopf|tdot|gvnE|fork|trie|gtcc|fscr|Fscr|gdot|gsim|Gscr|gscr|Gopf|gopf|gneq|Gdot|tosa|gnap|Topf|topf|geqq|toea|GJcy|gjcy|tint|gesl|mid|Sfr|ggg|top|ges|gla|glE|glj|geq|gne|gEl|gel|gnE|Gcy|gcy|gap|Tfr|tfr|Tcy|tcy|Hat|Tau|Ffr|tau|Tab|hfr|Hfr|ffr|Fcy|fcy|icy|Icy|iff|ETH|eth|ifr|Ifr|Eta|eta|int|Int|Sup|sup|ucy|Ucy|Sum|sum|jcy|ENG|ufr|Ufr|eng|Jcy|jfr|els|ell|egs|Efr|efr|Jfr|uml|kcy|Kcy|Ecy|ecy|kfr|Kfr|lap|Sub|sub|lat|lcy|Lcy|leg|Dot|dot|lEg|leq|les|squ|div|die|lfr|Lfr|lgE|Dfr|dfr|Del|deg|Dcy|dcy|lne|lnE|sol|loz|smt|Cup|lrm|cup|lsh|Lsh|sim|shy|map|Map|mcy|Mcy|mfr|Mfr|mho|gfr|Gfr|sfr|cir|Chi|chi|nap|Cfr|vcy|Vcy|cfr|Scy|scy|ncy|Ncy|vee|Vee|Cap|cap|nfr|scE|sce|Nfr|nge|ngE|nGg|vfr|Vfr|ngt|bot|nGt|nis|niv|Rsh|rsh|nle|nlE|bne|Bfr|bfr|nLl|nlt|nLt|Bcy|bcy|not|Not|rlm|wfr|Wfr|npr|nsc|num|ocy|ast|Ocy|ofr|xfr|Xfr|Ofr|ogt|ohm|apE|olt|Rho|ape|rho|Rfr|rfr|ord|REG|ang|reg|orv|And|and|AMP|Rcy|amp|Afr|ycy|Ycy|yen|yfr|Yfr|rcy|par|pcy|Pcy|pfr|Pfr|phi|Phi|afr|Acy|acy|zcy|Zcy|piv|acE|acd|zfr|Zfr|pre|prE|psi|Psi|qfr|Qfr|zwj|Or|ge|Gg|gt|gg|el|oS|lt|Lt|LT|Re|lg|gl|eg|ne|Im|it|le|DD|wp|wr|nu|Nu|dd|lE|Sc|sc|pi|Pi|ee|af|ll|Ll|rx|gE|xi|pm|Xi|ic|pr|Pr|in|ni|mp|mu|ac|Mu|or|ap|Gt|GT|ii);|&(Aacute|Agrave|Atilde|Ccedil|Eacute|Egrave|Iacute|Igrave|Ntilde|Oacute|Ograve|Oslash|Otilde|Uacute|Ugrave|Yacute|aacute|agrave|atilde|brvbar|ccedil|curren|divide|eacute|egrave|frac12|frac14|frac34|iacute|igrave|iquest|middot|ntilde|oacute|ograve|oslash|otilde|plusmn|uacute|ugrave|yacute|AElig|Acirc|Aring|Ecirc|Icirc|Ocirc|THORN|Ucirc|acirc|acute|aelig|aring|cedil|ecirc|icirc|iexcl|laquo|micro|ocirc|pound|raquo|szlig|thorn|times|ucirc|Auml|COPY|Euml|Iuml|Ouml|QUOT|Uuml|auml|cent|copy|euml|iuml|macr|nbsp|ordf|ordm|ouml|para|quot|sect|sup1|sup2|sup3|uuml|yuml|AMP|ETH|REG|amp|deg|eth|not|reg|shy|uml|yen|GT|LT|gt|lt)(?!;)([=a-zA-Z0-9]?)|&#([0-9]+)(;?)|&#[xX]([a-fA-F0-9]+)(;?)|&([0-9a-zA-Z]+)/g,m={aacute:"á",Aacute:"Á",abreve:"ă",Abreve:"Ă",ac:"∾",acd:"∿",acE:"∾̳",acirc:"â",Acirc:"Â",acute:"´",acy:"а",Acy:"А",aelig:"æ",AElig:"Æ",af:"⁡",afr:"𝔞",Afr:"𝔄",agrave:"à",Agrave:"À",alefsym:"ℵ",aleph:"ℵ",alpha:"α",Alpha:"Α",amacr:"ā",Amacr:"Ā",amalg:"⨿",amp:"&",AMP:"&",and:"∧",And:"⩓",andand:"⩕",andd:"⩜",andslope:"⩘",andv:"⩚",ang:"∠",ange:"⦤",angle:"∠",angmsd:"∡",angmsdaa:"⦨",angmsdab:"⦩",angmsdac:"⦪",angmsdad:"⦫",angmsdae:"⦬",angmsdaf:"⦭",angmsdag:"⦮",angmsdah:"⦯",angrt:"∟",angrtvb:"⊾",angrtvbd:"⦝",angsph:"∢",angst:"Å",angzarr:"⍼",aogon:"ą",Aogon:"Ą",aopf:"𝕒",Aopf:"𝔸",ap:"≈",apacir:"⩯",ape:"≊",apE:"⩰",apid:"≋",apos:"'",ApplyFunction:"⁡",approx:"≈",approxeq:"≊",aring:"å",Aring:"Å",ascr:"𝒶",Ascr:"𝒜",Assign:"≔",ast:"*",asymp:"≈",asympeq:"≍",atilde:"ã",Atilde:"Ã",auml:"ä",Auml:"Ä",awconint:"∳",awint:"⨑",backcong:"≌",backepsilon:"϶",backprime:"‵",backsim:"∽",backsimeq:"⋍",Backslash:"∖",Barv:"⫧",barvee:"⊽",barwed:"⌅",Barwed:"⌆",barwedge:"⌅",bbrk:"⎵",bbrktbrk:"⎶",bcong:"≌",bcy:"б",Bcy:"Б",bdquo:"„",becaus:"∵",because:"∵",Because:"∵",bemptyv:"⦰",bepsi:"϶",bernou:"ℬ",Bernoullis:"ℬ",beta:"β",Beta:"Β",beth:"ℶ",between:"≬",bfr:"𝔟",Bfr:"𝔅",bigcap:"⋂",bigcirc:"◯",bigcup:"⋃",bigodot:"⨀",bigoplus:"⨁",bigotimes:"⨂",bigsqcup:"⨆",bigstar:"★",bigtriangledown:"▽",bigtriangleup:"△",biguplus:"⨄",bigvee:"⋁",bigwedge:"⋀",bkarow:"⤍",blacklozenge:"⧫",blacksquare:"▪",blacktriangle:"▴",blacktriangledown:"▾",blacktriangleleft:"◂",blacktriangleright:"▸",blank:"␣",blk12:"▒",blk14:"░",blk34:"▓",block:"█",bne:"=⃥",bnequiv:"≡⃥",bnot:"⌐",bNot:"⫭",bopf:"𝕓",Bopf:"𝔹",bot:"⊥",bottom:"⊥",bowtie:"⋈",boxbox:"⧉",boxdl:"┐",boxdL:"╕",boxDl:"╖",boxDL:"╗",boxdr:"┌",boxdR:"╒",boxDr:"╓",boxDR:"╔",boxh:"─",boxH:"═",boxhd:"┬",boxhD:"╥",boxHd:"╤",boxHD:"╦",boxhu:"┴",boxhU:"╨",boxHu:"╧",boxHU:"╩",boxminus:"⊟",boxplus:"⊞",boxtimes:"⊠",boxul:"┘",boxuL:"╛",boxUl:"╜",boxUL:"╝",boxur:"└",boxuR:"╘",boxUr:"╙",boxUR:"╚",boxv:"│",boxV:"║",boxvh:"┼",boxvH:"╪",boxVh:"╫",boxVH:"╬",boxvl:"┤",boxvL:"╡",boxVl:"╢",boxVL:"╣",boxvr:"├",boxvR:"╞",boxVr:"╟",boxVR:"╠",bprime:"‵",breve:"˘",Breve:"˘",brvbar:"¦",bscr:"𝒷",Bscr:"ℬ",bsemi:"⁏",bsim:"∽",bsime:"⋍",bsol:"\\",bsolb:"⧅",bsolhsub:"⟈",bull:"•",bullet:"•",bump:"≎",bumpe:"≏",bumpE:"⪮",bumpeq:"≏",Bumpeq:"≎",cacute:"ć",Cacute:"Ć",cap:"∩",Cap:"⋒",capand:"⩄",capbrcup:"⩉",capcap:"⩋",capcup:"⩇",capdot:"⩀",CapitalDifferentialD:"ⅅ",caps:"∩︀",caret:"⁁",caron:"ˇ",Cayleys:"ℭ",ccaps:"⩍",ccaron:"č",Ccaron:"Č",ccedil:"ç",Ccedil:"Ç",ccirc:"ĉ",Ccirc:"Ĉ",Cconint:"∰",ccups:"⩌",ccupssm:"⩐",cdot:"ċ",Cdot:"Ċ",cedil:"¸",Cedilla:"¸",cemptyv:"⦲",cent:"¢",centerdot:"·",CenterDot:"·",cfr:"𝔠",Cfr:"ℭ",chcy:"ч",CHcy:"Ч",check:"✓",checkmark:"✓",chi:"χ",Chi:"Χ",cir:"○",circ:"ˆ",circeq:"≗",circlearrowleft:"↺",circlearrowright:"↻",circledast:"⊛",circledcirc:"⊚",circleddash:"⊝",CircleDot:"⊙",circledR:"®",circledS:"Ⓢ",CircleMinus:"⊖",CirclePlus:"⊕",CircleTimes:"⊗",cire:"≗",cirE:"⧃",cirfnint:"⨐",cirmid:"⫯",cirscir:"⧂",ClockwiseContourIntegral:"∲",CloseCurlyDoubleQuote:"”",CloseCurlyQuote:"’",clubs:"♣",clubsuit:"♣",colon:":",Colon:"∷",colone:"≔",Colone:"⩴",coloneq:"≔",comma:",",commat:"@",comp:"∁",compfn:"∘",complement:"∁",complexes:"ℂ",cong:"≅",congdot:"⩭",Congruent:"≡",conint:"∮",Conint:"∯",ContourIntegral:"∮",copf:"𝕔",Copf:"ℂ",coprod:"∐",Coproduct:"∐",copy:"©",COPY:"©",copysr:"℗",CounterClockwiseContourIntegral:"∳",crarr:"↵",cross:"✗",Cross:"⨯",cscr:"𝒸",Cscr:"𝒞",csub:"⫏",csube:"⫑",csup:"⫐",csupe:"⫒",ctdot:"⋯",cudarrl:"⤸",cudarrr:"⤵",cuepr:"⋞",cuesc:"⋟",cularr:"↶",cularrp:"⤽",cup:"∪",Cup:"⋓",cupbrcap:"⩈",cupcap:"⩆",CupCap:"≍",cupcup:"⩊",cupdot:"⊍",cupor:"⩅",cups:"∪︀",curarr:"↷",curarrm:"⤼",curlyeqprec:"⋞",curlyeqsucc:"⋟",curlyvee:"⋎",curlywedge:"⋏",curren:"¤",curvearrowleft:"↶",curvearrowright:"↷",cuvee:"⋎",cuwed:"⋏",cwconint:"∲",cwint:"∱",cylcty:"⌭",dagger:"†",Dagger:"‡",daleth:"ℸ",darr:"↓",dArr:"⇓",Darr:"↡",dash:"‐",dashv:"⊣",Dashv:"⫤",dbkarow:"⤏",dblac:"˝",dcaron:"ď",Dcaron:"Ď",dcy:"д",Dcy:"Д",dd:"ⅆ",DD:"ⅅ",ddagger:"‡",ddarr:"⇊",DDotrahd:"⤑",ddotseq:"⩷",deg:"°",Del:"∇",delta:"δ",Delta:"Δ",demptyv:"⦱",dfisht:"⥿",dfr:"𝔡",Dfr:"𝔇",dHar:"⥥",dharl:"⇃",dharr:"⇂",DiacriticalAcute:"´",DiacriticalDot:"˙",DiacriticalDoubleAcute:"˝",DiacriticalGrave:"`",DiacriticalTilde:"˜",diam:"⋄",diamond:"⋄",Diamond:"⋄",diamondsuit:"♦",diams:"♦",die:"¨",DifferentialD:"ⅆ",digamma:"ϝ",disin:"⋲",div:"÷",divide:"÷",divideontimes:"⋇",divonx:"⋇",djcy:"ђ",DJcy:"Ђ",dlcorn:"⌞",dlcrop:"⌍",dollar:"$",dopf:"𝕕",Dopf:"𝔻",dot:"˙",Dot:"¨",DotDot:"⃜",doteq:"≐",doteqdot:"≑",DotEqual:"≐",dotminus:"∸",dotplus:"∔",dotsquare:"⊡",doublebarwedge:"⌆",DoubleContourIntegral:"∯",DoubleDot:"¨",DoubleDownArrow:"⇓",DoubleLeftArrow:"⇐",DoubleLeftRightArrow:"⇔",DoubleLeftTee:"⫤",DoubleLongLeftArrow:"⟸",DoubleLongLeftRightArrow:"⟺",DoubleLongRightArrow:"⟹",DoubleRightArrow:"⇒",DoubleRightTee:"⊨",DoubleUpArrow:"⇑",DoubleUpDownArrow:"⇕",DoubleVerticalBar:"∥",downarrow:"↓",Downarrow:"⇓",DownArrow:"↓",DownArrowBar:"⤓",DownArrowUpArrow:"⇵",DownBreve:"̑",downdownarrows:"⇊",downharpoonleft:"⇃",downharpoonright:"⇂",DownLeftRightVector:"⥐",DownLeftTeeVector:"⥞",DownLeftVector:"↽",DownLeftVectorBar:"⥖",DownRightTeeVector:"⥟",DownRightVector:"⇁",DownRightVectorBar:"⥗",DownTee:"⊤",DownTeeArrow:"↧",drbkarow:"⤐",drcorn:"⌟",drcrop:"⌌",dscr:"𝒹",Dscr:"𝒟",dscy:"ѕ",DScy:"Ѕ",dsol:"⧶",dstrok:"đ",Dstrok:"Đ",dtdot:"⋱",dtri:"▿",dtrif:"▾",duarr:"⇵",duhar:"⥯",dwangle:"⦦",dzcy:"џ",DZcy:"Џ",dzigrarr:"⟿",eacute:"é",Eacute:"É",easter:"⩮",ecaron:"ě",Ecaron:"Ě",ecir:"≖",ecirc:"ê",Ecirc:"Ê",ecolon:"≕",ecy:"э",Ecy:"Э",eDDot:"⩷",edot:"ė",eDot:"≑",Edot:"Ė",ee:"ⅇ",efDot:"≒",efr:"𝔢",Efr:"𝔈",eg:"⪚",egrave:"è",Egrave:"È",egs:"⪖",egsdot:"⪘",el:"⪙",Element:"∈",elinters:"⏧",ell:"ℓ",els:"⪕",elsdot:"⪗",emacr:"ē",Emacr:"Ē",empty:"∅",emptyset:"∅",EmptySmallSquare:"◻",emptyv:"∅",EmptyVerySmallSquare:"▫",emsp:" ",emsp13:" ",emsp14:" ",eng:"ŋ",ENG:"Ŋ",ensp:" ",eogon:"ę",Eogon:"Ę",eopf:"𝕖",Eopf:"𝔼",epar:"⋕",eparsl:"⧣",eplus:"⩱",epsi:"ε",epsilon:"ε",Epsilon:"Ε",epsiv:"ϵ",eqcirc:"≖",eqcolon:"≕",eqsim:"≂",eqslantgtr:"⪖",eqslantless:"⪕",Equal:"⩵",equals:"=",EqualTilde:"≂",equest:"≟",Equilibrium:"⇌",equiv:"≡",equivDD:"⩸",eqvparsl:"⧥",erarr:"⥱",erDot:"≓",escr:"ℯ",Escr:"ℰ",esdot:"≐",esim:"≂",Esim:"⩳",eta:"η",Eta:"Η",eth:"ð",ETH:"Ð",euml:"ë",Euml:"Ë",euro:"€",excl:"!",exist:"∃",Exists:"∃",expectation:"ℰ",exponentiale:"ⅇ",ExponentialE:"ⅇ",fallingdotseq:"≒",fcy:"ф",Fcy:"Ф",female:"♀",ffilig:"ﬃ",fflig:"ﬀ",ffllig:"ﬄ",ffr:"𝔣",Ffr:"𝔉",filig:"ﬁ",FilledSmallSquare:"◼",FilledVerySmallSquare:"▪",fjlig:"fj",flat:"♭",fllig:"ﬂ",fltns:"▱",fnof:"ƒ",fopf:"𝕗",Fopf:"𝔽",forall:"∀",ForAll:"∀",fork:"⋔",forkv:"⫙",Fouriertrf:"ℱ",fpartint:"⨍",frac12:"½",frac13:"⅓",frac14:"¼",frac15:"⅕",frac16:"⅙",frac18:"⅛",frac23:"⅔",frac25:"⅖",frac34:"¾",frac35:"⅗",frac38:"⅜",frac45:"⅘",frac56:"⅚",frac58:"⅝",frac78:"⅞",frasl:"⁄",frown:"⌢",fscr:"𝒻",Fscr:"ℱ",gacute:"ǵ",gamma:"γ",Gamma:"Γ",gammad:"ϝ",Gammad:"Ϝ",gap:"⪆",gbreve:"ğ",Gbreve:"Ğ",Gcedil:"Ģ",gcirc:"ĝ",Gcirc:"Ĝ",gcy:"г",Gcy:"Г",gdot:"ġ",Gdot:"Ġ",ge:"≥",gE:"≧",gel:"⋛",gEl:"⪌",geq:"≥",geqq:"≧",geqslant:"⩾",ges:"⩾",gescc:"⪩",gesdot:"⪀",gesdoto:"⪂",gesdotol:"⪄",gesl:"⋛︀",gesles:"⪔",gfr:"𝔤",Gfr:"𝔊",gg:"≫",Gg:"⋙",ggg:"⋙",gimel:"ℷ",gjcy:"ѓ",GJcy:"Ѓ",gl:"≷",gla:"⪥",glE:"⪒",glj:"⪤",gnap:"⪊",gnapprox:"⪊",gne:"⪈",gnE:"≩",gneq:"⪈",gneqq:"≩",gnsim:"⋧",gopf:"𝕘",Gopf:"𝔾",grave:"`",GreaterEqual:"≥",GreaterEqualLess:"⋛",GreaterFullEqual:"≧",GreaterGreater:"⪢",GreaterLess:"≷",GreaterSlantEqual:"⩾",GreaterTilde:"≳",gscr:"ℊ",Gscr:"𝒢",gsim:"≳",gsime:"⪎",gsiml:"⪐",gt:">",Gt:"≫",GT:">",gtcc:"⪧",gtcir:"⩺",gtdot:"⋗",gtlPar:"⦕",gtquest:"⩼",gtrapprox:"⪆",gtrarr:"⥸",gtrdot:"⋗",gtreqless:"⋛",gtreqqless:"⪌",gtrless:"≷",gtrsim:"≳",gvertneqq:"≩︀",gvnE:"≩︀",Hacek:"ˇ",hairsp:" ",half:"½",hamilt:"ℋ",hardcy:"ъ",HARDcy:"Ъ",harr:"↔",hArr:"⇔",harrcir:"⥈",harrw:"↭",Hat:"^",hbar:"ℏ",hcirc:"ĥ",Hcirc:"Ĥ",hearts:"♥",heartsuit:"♥",hellip:"…",hercon:"⊹",hfr:"𝔥",Hfr:"ℌ",HilbertSpace:"ℋ",hksearow:"⤥",hkswarow:"⤦",hoarr:"⇿",homtht:"∻",hookleftarrow:"↩",hookrightarrow:"↪",hopf:"𝕙",Hopf:"ℍ",horbar:"―",HorizontalLine:"─",hscr:"𝒽",Hscr:"ℋ",hslash:"ℏ",hstrok:"ħ",Hstrok:"Ħ",HumpDownHump:"≎",HumpEqual:"≏",hybull:"⁃",hyphen:"‐",iacute:"í",Iacute:"Í",ic:"⁣",icirc:"î",Icirc:"Î",icy:"и",Icy:"И",Idot:"İ",iecy:"е",IEcy:"Е",iexcl:"¡",iff:"⇔",ifr:"𝔦",Ifr:"ℑ",igrave:"ì",Igrave:"Ì",ii:"ⅈ",iiiint:"⨌",iiint:"∭",iinfin:"⧜",iiota:"℩",ijlig:"ĳ",IJlig:"Ĳ",Im:"ℑ",imacr:"ī",Imacr:"Ī",image:"ℑ",ImaginaryI:"ⅈ",imagline:"ℐ",imagpart:"ℑ",imath:"ı",imof:"⊷",imped:"Ƶ",Implies:"⇒",in:"∈",incare:"℅",infin:"∞",infintie:"⧝",inodot:"ı",int:"∫",Int:"∬",intcal:"⊺",integers:"ℤ",Integral:"∫",intercal:"⊺",Intersection:"⋂",intlarhk:"⨗",intprod:"⨼",InvisibleComma:"⁣",InvisibleTimes:"⁢",iocy:"ё",IOcy:"Ё",iogon:"į",Iogon:"Į",iopf:"𝕚",Iopf:"𝕀",iota:"ι",Iota:"Ι",iprod:"⨼",iquest:"¿",iscr:"𝒾",Iscr:"ℐ",isin:"∈",isindot:"⋵",isinE:"⋹",isins:"⋴",isinsv:"⋳",isinv:"∈",it:"⁢",itilde:"ĩ",Itilde:"Ĩ",iukcy:"і",Iukcy:"І",iuml:"ï",Iuml:"Ï",jcirc:"ĵ",Jcirc:"Ĵ",jcy:"й",Jcy:"Й",jfr:"𝔧",Jfr:"𝔍",jmath:"ȷ",jopf:"𝕛",Jopf:"𝕁",jscr:"𝒿",Jscr:"𝒥",jsercy:"ј",Jsercy:"Ј",jukcy:"є",Jukcy:"Є",kappa:"κ",Kappa:"Κ",kappav:"ϰ",kcedil:"ķ",Kcedil:"Ķ",kcy:"к",Kcy:"К",kfr:"𝔨",Kfr:"𝔎",kgreen:"ĸ",khcy:"х",KHcy:"Х",kjcy:"ќ",KJcy:"Ќ",kopf:"𝕜",Kopf:"𝕂",kscr:"𝓀",Kscr:"𝒦",lAarr:"⇚",lacute:"ĺ",Lacute:"Ĺ",laemptyv:"⦴",lagran:"ℒ",lambda:"λ",Lambda:"Λ",lang:"⟨",Lang:"⟪",langd:"⦑",langle:"⟨",lap:"⪅",Laplacetrf:"ℒ",laquo:"«",larr:"←",lArr:"⇐",Larr:"↞",larrb:"⇤",larrbfs:"⤟",larrfs:"⤝",larrhk:"↩",larrlp:"↫",larrpl:"⤹",larrsim:"⥳",larrtl:"↢",lat:"⪫",latail:"⤙",lAtail:"⤛",late:"⪭",lates:"⪭︀",lbarr:"⤌",lBarr:"⤎",lbbrk:"❲",lbrace:"{",lbrack:"[",lbrke:"⦋",lbrksld:"⦏",lbrkslu:"⦍",lcaron:"ľ",Lcaron:"Ľ",lcedil:"ļ",Lcedil:"Ļ",lceil:"⌈",lcub:"{",lcy:"л",Lcy:"Л",ldca:"⤶",ldquo:"“",ldquor:"„",ldrdhar:"⥧",ldrushar:"⥋",ldsh:"↲",le:"≤",lE:"≦",LeftAngleBracket:"⟨",leftarrow:"←",Leftarrow:"⇐",LeftArrow:"←",LeftArrowBar:"⇤",LeftArrowRightArrow:"⇆",leftarrowtail:"↢",LeftCeiling:"⌈",LeftDoubleBracket:"⟦",LeftDownTeeVector:"⥡",LeftDownVector:"⇃",LeftDownVectorBar:"⥙",LeftFloor:"⌊",leftharpoondown:"↽",leftharpoonup:"↼",leftleftarrows:"⇇",leftrightarrow:"↔",Leftrightarrow:"⇔",LeftRightArrow:"↔",leftrightarrows:"⇆",leftrightharpoons:"⇋",leftrightsquigarrow:"↭",LeftRightVector:"⥎",LeftTee:"⊣",LeftTeeArrow:"↤",LeftTeeVector:"⥚",leftthreetimes:"⋋",LeftTriangle:"⊲",LeftTriangleBar:"⧏",LeftTriangleEqual:"⊴",LeftUpDownVector:"⥑",LeftUpTeeVector:"⥠",LeftUpVector:"↿",LeftUpVectorBar:"⥘",LeftVector:"↼",LeftVectorBar:"⥒",leg:"⋚",lEg:"⪋",leq:"≤",leqq:"≦",leqslant:"⩽",les:"⩽",lescc:"⪨",lesdot:"⩿",lesdoto:"⪁",lesdotor:"⪃",lesg:"⋚︀",lesges:"⪓",lessapprox:"⪅",lessdot:"⋖",lesseqgtr:"⋚",lesseqqgtr:"⪋",LessEqualGreater:"⋚",LessFullEqual:"≦",LessGreater:"≶",lessgtr:"≶",LessLess:"⪡",lesssim:"≲",LessSlantEqual:"⩽",LessTilde:"≲",lfisht:"⥼",lfloor:"⌊",lfr:"𝔩",Lfr:"𝔏",lg:"≶",lgE:"⪑",lHar:"⥢",lhard:"↽",lharu:"↼",lharul:"⥪",lhblk:"▄",ljcy:"љ",LJcy:"Љ",ll:"≪",Ll:"⋘",llarr:"⇇",llcorner:"⌞",Lleftarrow:"⇚",llhard:"⥫",lltri:"◺",lmidot:"ŀ",Lmidot:"Ŀ",lmoust:"⎰",lmoustache:"⎰",lnap:"⪉",lnapprox:"⪉",lne:"⪇",lnE:"≨",lneq:"⪇",lneqq:"≨",lnsim:"⋦",loang:"⟬",loarr:"⇽",lobrk:"⟦",longleftarrow:"⟵",Longleftarrow:"⟸",LongLeftArrow:"⟵",longleftrightarrow:"⟷",Longleftrightarrow:"⟺",LongLeftRightArrow:"⟷",longmapsto:"⟼",longrightarrow:"⟶",Longrightarrow:"⟹",LongRightArrow:"⟶",looparrowleft:"↫",looparrowright:"↬",lopar:"⦅",lopf:"𝕝",Lopf:"𝕃",loplus:"⨭",lotimes:"⨴",lowast:"∗",lowbar:"_",LowerLeftArrow:"↙",LowerRightArrow:"↘",loz:"◊",lozenge:"◊",lozf:"⧫",lpar:"(",lparlt:"⦓",lrarr:"⇆",lrcorner:"⌟",lrhar:"⇋",lrhard:"⥭",lrm:"‎",lrtri:"⊿",lsaquo:"‹",lscr:"𝓁",Lscr:"ℒ",lsh:"↰",Lsh:"↰",lsim:"≲",lsime:"⪍",lsimg:"⪏",lsqb:"[",lsquo:"‘",lsquor:"‚",lstrok:"ł",Lstrok:"Ł",lt:"<",Lt:"≪",LT:"<",ltcc:"⪦",ltcir:"⩹",ltdot:"⋖",lthree:"⋋",ltimes:"⋉",ltlarr:"⥶",ltquest:"⩻",ltri:"◃",ltrie:"⊴",ltrif:"◂",ltrPar:"⦖",lurdshar:"⥊",luruhar:"⥦",lvertneqq:"≨︀",lvnE:"≨︀",macr:"¯",male:"♂",malt:"✠",maltese:"✠",map:"↦",Map:"⤅",mapsto:"↦",mapstodown:"↧",mapstoleft:"↤",mapstoup:"↥",marker:"▮",mcomma:"⨩",mcy:"м",Mcy:"М",mdash:"—",mDDot:"∺",measuredangle:"∡",MediumSpace:" ",Mellintrf:"ℳ",mfr:"𝔪",Mfr:"𝔐",mho:"℧",micro:"µ",mid:"∣",midast:"*",midcir:"⫰",middot:"·",minus:"−",minusb:"⊟",minusd:"∸",minusdu:"⨪",MinusPlus:"∓",mlcp:"⫛",mldr:"…",mnplus:"∓",models:"⊧",mopf:"𝕞",Mopf:"𝕄",mp:"∓",mscr:"𝓂",Mscr:"ℳ",mstpos:"∾",mu:"μ",Mu:"Μ",multimap:"⊸",mumap:"⊸",nabla:"∇",nacute:"ń",Nacute:"Ń",nang:"∠⃒",nap:"≉",napE:"⩰̸",napid:"≋̸",napos:"ŉ",napprox:"≉",natur:"♮",natural:"♮",naturals:"ℕ",nbsp:" ",nbump:"≎̸",nbumpe:"≏̸",ncap:"⩃",ncaron:"ň",Ncaron:"Ň",ncedil:"ņ",Ncedil:"Ņ",ncong:"≇",ncongdot:"⩭̸",ncup:"⩂",ncy:"н",Ncy:"Н",ndash:"–",ne:"≠",nearhk:"⤤",nearr:"↗",neArr:"⇗",nearrow:"↗",nedot:"≐̸",NegativeMediumSpace:"​",NegativeThickSpace:"​",NegativeThinSpace:"​",NegativeVeryThinSpace:"​",nequiv:"≢",nesear:"⤨",nesim:"≂̸",NestedGreaterGreater:"≫",NestedLessLess:"≪",NewLine:"\n",nexist:"∄",nexists:"∄",nfr:"𝔫",Nfr:"𝔑",nge:"≱",ngE:"≧̸",ngeq:"≱",ngeqq:"≧̸",ngeqslant:"⩾̸",nges:"⩾̸",nGg:"⋙̸",ngsim:"≵",ngt:"≯",nGt:"≫⃒",ngtr:"≯",nGtv:"≫̸",nharr:"↮",nhArr:"⇎",nhpar:"⫲",ni:"∋",nis:"⋼",nisd:"⋺",niv:"∋",njcy:"њ",NJcy:"Њ",nlarr:"↚",nlArr:"⇍",nldr:"‥",nle:"≰",nlE:"≦̸",nleftarrow:"↚",nLeftarrow:"⇍",nleftrightarrow:"↮",nLeftrightarrow:"⇎",nleq:"≰",nleqq:"≦̸",nleqslant:"⩽̸",nles:"⩽̸",nless:"≮",nLl:"⋘̸",nlsim:"≴",nlt:"≮",nLt:"≪⃒",nltri:"⋪",nltrie:"⋬",nLtv:"≪̸",nmid:"∤",NoBreak:"⁠",NonBreakingSpace:" ",nopf:"𝕟",Nopf:"ℕ",not:"¬",Not:"⫬",NotCongruent:"≢",NotCupCap:"≭",NotDoubleVerticalBar:"∦",NotElement:"∉",NotEqual:"≠",NotEqualTilde:"≂̸",NotExists:"∄",NotGreater:"≯",NotGreaterEqual:"≱",NotGreaterFullEqual:"≧̸",NotGreaterGreater:"≫̸",NotGreaterLess:"≹",NotGreaterSlantEqual:"⩾̸",NotGreaterTilde:"≵",NotHumpDownHump:"≎̸",NotHumpEqual:"≏̸",notin:"∉",notindot:"⋵̸",notinE:"⋹̸",notinva:"∉",notinvb:"⋷",notinvc:"⋶",NotLeftTriangle:"⋪",NotLeftTriangleBar:"⧏̸",NotLeftTriangleEqual:"⋬",NotLess:"≮",NotLessEqual:"≰",NotLessGreater:"≸",NotLessLess:"≪̸",NotLessSlantEqual:"⩽̸",NotLessTilde:"≴",NotNestedGreaterGreater:"⪢̸",NotNestedLessLess:"⪡̸",notni:"∌",notniva:"∌",notnivb:"⋾",notnivc:"⋽",NotPrecedes:"⊀",NotPrecedesEqual:"⪯̸",NotPrecedesSlantEqual:"⋠",NotReverseElement:"∌",NotRightTriangle:"⋫",NotRightTriangleBar:"⧐̸",NotRightTriangleEqual:"⋭",NotSquareSubset:"⊏̸",NotSquareSubsetEqual:"⋢",NotSquareSuperset:"⊐̸",NotSquareSupersetEqual:"⋣",NotSubset:"⊂⃒",NotSubsetEqual:"⊈",NotSucceeds:"⊁",NotSucceedsEqual:"⪰̸",NotSucceedsSlantEqual:"⋡",NotSucceedsTilde:"≿̸",NotSuperset:"⊃⃒",NotSupersetEqual:"⊉",NotTilde:"≁",NotTildeEqual:"≄",NotTildeFullEqual:"≇",NotTildeTilde:"≉",NotVerticalBar:"∤",npar:"∦",nparallel:"∦",nparsl:"⫽⃥",npart:"∂̸",npolint:"⨔",npr:"⊀",nprcue:"⋠",npre:"⪯̸",nprec:"⊀",npreceq:"⪯̸",nrarr:"↛",nrArr:"⇏",nrarrc:"⤳̸",nrarrw:"↝̸",nrightarrow:"↛",nRightarrow:"⇏",nrtri:"⋫",nrtrie:"⋭",nsc:"⊁",nsccue:"⋡",nsce:"⪰̸",nscr:"𝓃",Nscr:"𝒩",nshortmid:"∤",nshortparallel:"∦",nsim:"≁",nsime:"≄",nsimeq:"≄",nsmid:"∤",nspar:"∦",nsqsube:"⋢",nsqsupe:"⋣",nsub:"⊄",nsube:"⊈",nsubE:"⫅̸",nsubset:"⊂⃒",nsubseteq:"⊈",nsubseteqq:"⫅̸",nsucc:"⊁",nsucceq:"⪰̸",nsup:"⊅",nsupe:"⊉",nsupE:"⫆̸",nsupset:"⊃⃒",nsupseteq:"⊉",nsupseteqq:"⫆̸",ntgl:"≹",ntilde:"ñ",Ntilde:"Ñ",ntlg:"≸",ntriangleleft:"⋪",ntrianglelefteq:"⋬",ntriangleright:"⋫",ntrianglerighteq:"⋭",nu:"ν",Nu:"Ν",num:"#",numero:"№",numsp:" ",nvap:"≍⃒",nvdash:"⊬",nvDash:"⊭",nVdash:"⊮",nVDash:"⊯",nvge:"≥⃒",nvgt:">⃒",nvHarr:"⤄",nvinfin:"⧞",nvlArr:"⤂",nvle:"≤⃒",nvlt:"<⃒",nvltrie:"⊴⃒",nvrArr:"⤃",nvrtrie:"⊵⃒",nvsim:"∼⃒",nwarhk:"⤣",nwarr:"↖",nwArr:"⇖",nwarrow:"↖",nwnear:"⤧",oacute:"ó",Oacute:"Ó",oast:"⊛",ocir:"⊚",ocirc:"ô",Ocirc:"Ô",ocy:"о",Ocy:"О",odash:"⊝",odblac:"ő",Odblac:"Ő",odiv:"⨸",odot:"⊙",odsold:"⦼",oelig:"œ",OElig:"Œ",ofcir:"⦿",ofr:"𝔬",Ofr:"𝔒",ogon:"˛",ograve:"ò",Ograve:"Ò",ogt:"⧁",ohbar:"⦵",ohm:"Ω",oint:"∮",olarr:"↺",olcir:"⦾",olcross:"⦻",oline:"‾",olt:"⧀",omacr:"ō",Omacr:"Ō",omega:"ω",Omega:"Ω",omicron:"ο",Omicron:"Ο",omid:"⦶",ominus:"⊖",oopf:"𝕠",Oopf:"𝕆",opar:"⦷",OpenCurlyDoubleQuote:"“",OpenCurlyQuote:"‘",operp:"⦹",oplus:"⊕",or:"∨",Or:"⩔",orarr:"↻",ord:"⩝",order:"ℴ",orderof:"ℴ",ordf:"ª",ordm:"º",origof:"⊶",oror:"⩖",orslope:"⩗",orv:"⩛",oS:"Ⓢ",oscr:"ℴ",Oscr:"𝒪",oslash:"ø",Oslash:"Ø",osol:"⊘",otilde:"õ",Otilde:"Õ",otimes:"⊗",Otimes:"⨷",otimesas:"⨶",ouml:"ö",Ouml:"Ö",ovbar:"⌽",OverBar:"‾",OverBrace:"⏞",OverBracket:"⎴",OverParenthesis:"⏜",par:"∥",para:"¶",parallel:"∥",parsim:"⫳",parsl:"⫽",part:"∂",PartialD:"∂",pcy:"п",Pcy:"П",percnt:"%",period:".",permil:"‰",perp:"⊥",pertenk:"‱",pfr:"𝔭",Pfr:"𝔓",phi:"φ",Phi:"Φ",phiv:"ϕ",phmmat:"ℳ",phone:"☎",pi:"π",Pi:"Π",pitchfork:"⋔",piv:"ϖ",planck:"ℏ",planckh:"ℎ",plankv:"ℏ",plus:"+",plusacir:"⨣",plusb:"⊞",pluscir:"⨢",plusdo:"∔",plusdu:"⨥",pluse:"⩲",PlusMinus:"±",plusmn:"±",plussim:"⨦",plustwo:"⨧",pm:"±",Poincareplane:"ℌ",pointint:"⨕",popf:"𝕡",Popf:"ℙ",pound:"£",pr:"≺",Pr:"⪻",prap:"⪷",prcue:"≼",pre:"⪯",prE:"⪳",prec:"≺",precapprox:"⪷",preccurlyeq:"≼",Precedes:"≺",PrecedesEqual:"⪯",PrecedesSlantEqual:"≼",PrecedesTilde:"≾",preceq:"⪯",precnapprox:"⪹",precneqq:"⪵",precnsim:"⋨",precsim:"≾",prime:"′",Prime:"″",primes:"ℙ",prnap:"⪹",prnE:"⪵",prnsim:"⋨",prod:"∏",Product:"∏",profalar:"⌮",profline:"⌒",profsurf:"⌓",prop:"∝",Proportion:"∷",Proportional:"∝",propto:"∝",prsim:"≾",prurel:"⊰",pscr:"𝓅",Pscr:"𝒫",psi:"ψ",Psi:"Ψ",puncsp:" ",qfr:"𝔮",Qfr:"𝔔",qint:"⨌",qopf:"𝕢",Qopf:"ℚ",qprime:"⁗",qscr:"𝓆",Qscr:"𝒬",quaternions:"ℍ",quatint:"⨖",quest:"?",questeq:"≟",quot:'"',QUOT:'"',rAarr:"⇛",race:"∽̱",racute:"ŕ",Racute:"Ŕ",radic:"√",raemptyv:"⦳",rang:"⟩",Rang:"⟫",rangd:"⦒",range:"⦥",rangle:"⟩",raquo:"»",rarr:"→",rArr:"⇒",Rarr:"↠",rarrap:"⥵",rarrb:"⇥",rarrbfs:"⤠",rarrc:"⤳",rarrfs:"⤞",rarrhk:"↪",rarrlp:"↬",rarrpl:"⥅",rarrsim:"⥴",rarrtl:"↣",Rarrtl:"⤖",rarrw:"↝",ratail:"⤚",rAtail:"⤜",ratio:"∶",rationals:"ℚ",rbarr:"⤍",rBarr:"⤏",RBarr:"⤐",rbbrk:"❳",rbrace:"}",rbrack:"]",rbrke:"⦌",rbrksld:"⦎",rbrkslu:"⦐",rcaron:"ř",Rcaron:"Ř",rcedil:"ŗ",Rcedil:"Ŗ",rceil:"⌉",rcub:"}",rcy:"р",Rcy:"Р",rdca:"⤷",rdldhar:"⥩",rdquo:"”",rdquor:"”",rdsh:"↳",Re:"ℜ",real:"ℜ",realine:"ℛ",realpart:"ℜ",reals:"ℝ",rect:"▭",reg:"®",REG:"®",ReverseElement:"∋",ReverseEquilibrium:"⇋",ReverseUpEquilibrium:"⥯",rfisht:"⥽",rfloor:"⌋",rfr:"𝔯",Rfr:"ℜ",rHar:"⥤",rhard:"⇁",rharu:"⇀",rharul:"⥬",rho:"ρ",Rho:"Ρ",rhov:"ϱ",RightAngleBracket:"⟩",rightarrow:"→",Rightarrow:"⇒",RightArrow:"→",RightArrowBar:"⇥",RightArrowLeftArrow:"⇄",rightarrowtail:"↣",RightCeiling:"⌉",RightDoubleBracket:"⟧",RightDownTeeVector:"⥝",RightDownVector:"⇂",RightDownVectorBar:"⥕",RightFloor:"⌋",rightharpoondown:"⇁",rightharpoonup:"⇀",rightleftarrows:"⇄",rightleftharpoons:"⇌",rightrightarrows:"⇉",rightsquigarrow:"↝",RightTee:"⊢",RightTeeArrow:"↦",RightTeeVector:"⥛",rightthreetimes:"⋌",RightTriangle:"⊳",RightTriangleBar:"⧐",RightTriangleEqual:"⊵",RightUpDownVector:"⥏",RightUpTeeVector:"⥜",RightUpVector:"↾",RightUpVectorBar:"⥔",RightVector:"⇀",RightVectorBar:"⥓",ring:"˚",risingdotseq:"≓",rlarr:"⇄",rlhar:"⇌",rlm:"‏",rmoust:"⎱",rmoustache:"⎱",rnmid:"⫮",roang:"⟭",roarr:"⇾",robrk:"⟧",ropar:"⦆",ropf:"𝕣",Ropf:"ℝ",roplus:"⨮",rotimes:"⨵",RoundImplies:"⥰",rpar:")",rpargt:"⦔",rppolint:"⨒",rrarr:"⇉",Rrightarrow:"⇛",rsaquo:"›",rscr:"𝓇",Rscr:"ℛ",rsh:"↱",Rsh:"↱",rsqb:"]",rsquo:"’",rsquor:"’",rthree:"⋌",rtimes:"⋊",rtri:"▹",rtrie:"⊵",rtrif:"▸",rtriltri:"⧎",RuleDelayed:"⧴",ruluhar:"⥨",rx:"℞",sacute:"ś",Sacute:"Ś",sbquo:"‚",sc:"≻",Sc:"⪼",scap:"⪸",scaron:"š",Scaron:"Š",sccue:"≽",sce:"⪰",scE:"⪴",scedil:"ş",Scedil:"Ş",scirc:"ŝ",Scirc:"Ŝ",scnap:"⪺",scnE:"⪶",scnsim:"⋩",scpolint:"⨓",scsim:"≿",scy:"с",Scy:"С",sdot:"⋅",sdotb:"⊡",sdote:"⩦",searhk:"⤥",searr:"↘",seArr:"⇘",searrow:"↘",sect:"§",semi:";",seswar:"⤩",setminus:"∖",setmn:"∖",sext:"✶",sfr:"𝔰",Sfr:"𝔖",sfrown:"⌢",sharp:"♯",shchcy:"щ",SHCHcy:"Щ",shcy:"ш",SHcy:"Ш",ShortDownArrow:"↓",ShortLeftArrow:"←",shortmid:"∣",shortparallel:"∥",ShortRightArrow:"→",ShortUpArrow:"↑",shy:"­",sigma:"σ",Sigma:"Σ",sigmaf:"ς",sigmav:"ς",sim:"∼",simdot:"⩪",sime:"≃",simeq:"≃",simg:"⪞",simgE:"⪠",siml:"⪝",simlE:"⪟",simne:"≆",simplus:"⨤",simrarr:"⥲",slarr:"←",SmallCircle:"∘",smallsetminus:"∖",smashp:"⨳",smeparsl:"⧤",smid:"∣",smile:"⌣",smt:"⪪",smte:"⪬",smtes:"⪬︀",softcy:"ь",SOFTcy:"Ь",sol:"/",solb:"⧄",solbar:"⌿",sopf:"𝕤",Sopf:"𝕊",spades:"♠",spadesuit:"♠",spar:"∥",sqcap:"⊓",sqcaps:"⊓︀",sqcup:"⊔",sqcups:"⊔︀",Sqrt:"√",sqsub:"⊏",sqsube:"⊑",sqsubset:"⊏",sqsubseteq:"⊑",sqsup:"⊐",sqsupe:"⊒",sqsupset:"⊐",sqsupseteq:"⊒",squ:"□",square:"□",Square:"□",SquareIntersection:"⊓",SquareSubset:"⊏",SquareSubsetEqual:"⊑",SquareSuperset:"⊐",SquareSupersetEqual:"⊒",SquareUnion:"⊔",squarf:"▪",squf:"▪",srarr:"→",sscr:"𝓈",Sscr:"𝒮",ssetmn:"∖",ssmile:"⌣",sstarf:"⋆",star:"☆",Star:"⋆",starf:"★",straightepsilon:"ϵ",straightphi:"ϕ",strns:"¯",sub:"⊂",Sub:"⋐",subdot:"⪽",sube:"⊆",subE:"⫅",subedot:"⫃",submult:"⫁",subne:"⊊",subnE:"⫋",subplus:"⪿",subrarr:"⥹",subset:"⊂",Subset:"⋐",subseteq:"⊆",subseteqq:"⫅",SubsetEqual:"⊆",subsetneq:"⊊",subsetneqq:"⫋",subsim:"⫇",subsub:"⫕",subsup:"⫓",succ:"≻",succapprox:"⪸",succcurlyeq:"≽",Succeeds:"≻",SucceedsEqual:"⪰",SucceedsSlantEqual:"≽",SucceedsTilde:"≿",succeq:"⪰",succnapprox:"⪺",succneqq:"⪶",succnsim:"⋩",succsim:"≿",SuchThat:"∋",sum:"∑",Sum:"∑",sung:"♪",sup:"⊃",Sup:"⋑",sup1:"¹",sup2:"²",sup3:"³",supdot:"⪾",supdsub:"⫘",supe:"⊇",supE:"⫆",supedot:"⫄",Superset:"⊃",SupersetEqual:"⊇",suphsol:"⟉",suphsub:"⫗",suplarr:"⥻",supmult:"⫂",supne:"⊋",supnE:"⫌",supplus:"⫀",supset:"⊃",Supset:"⋑",supseteq:"⊇",supseteqq:"⫆",supsetneq:"⊋",supsetneqq:"⫌",supsim:"⫈",supsub:"⫔",supsup:"⫖",swarhk:"⤦",swarr:"↙",swArr:"⇙",swarrow:"↙",swnwar:"⤪",szlig:"ß",Tab:"\t",target:"⌖",tau:"τ",Tau:"Τ",tbrk:"⎴",tcaron:"ť",Tcaron:"Ť",tcedil:"ţ",Tcedil:"Ţ",tcy:"т",Tcy:"Т",tdot:"⃛",telrec:"⌕",tfr:"𝔱",Tfr:"𝔗",there4:"∴",therefore:"∴",Therefore:"∴",theta:"θ",Theta:"Θ",thetasym:"ϑ",thetav:"ϑ",thickapprox:"≈",thicksim:"∼",ThickSpace:"  ",thinsp:" ",ThinSpace:" ",thkap:"≈",thksim:"∼",thorn:"þ",THORN:"Þ",tilde:"˜",Tilde:"∼",TildeEqual:"≃",TildeFullEqual:"≅",TildeTilde:"≈",times:"×",timesb:"⊠",timesbar:"⨱",timesd:"⨰",tint:"∭",toea:"⤨",top:"⊤",topbot:"⌶",topcir:"⫱",topf:"𝕥",Topf:"𝕋",topfork:"⫚",tosa:"⤩",tprime:"‴",trade:"™",TRADE:"™",triangle:"▵",triangledown:"▿",triangleleft:"◃",trianglelefteq:"⊴",triangleq:"≜",triangleright:"▹",trianglerighteq:"⊵",tridot:"◬",trie:"≜",triminus:"⨺",TripleDot:"⃛",triplus:"⨹",trisb:"⧍",tritime:"⨻",trpezium:"⏢",tscr:"𝓉",Tscr:"𝒯",tscy:"ц",TScy:"Ц",tshcy:"ћ",TSHcy:"Ћ",tstrok:"ŧ",Tstrok:"Ŧ",twixt:"≬",twoheadleftarrow:"↞",twoheadrightarrow:"↠",uacute:"ú",Uacute:"Ú",uarr:"↑",uArr:"⇑",Uarr:"↟",Uarrocir:"⥉",ubrcy:"ў",Ubrcy:"Ў",ubreve:"ŭ",Ubreve:"Ŭ",ucirc:"û",Ucirc:"Û",ucy:"у",Ucy:"У",udarr:"⇅",udblac:"ű",Udblac:"Ű",udhar:"⥮",ufisht:"⥾",ufr:"𝔲",Ufr:"𝔘",ugrave:"ù",Ugrave:"Ù",uHar:"⥣",uharl:"↿",uharr:"↾",uhblk:"▀",ulcorn:"⌜",ulcorner:"⌜",ulcrop:"⌏",ultri:"◸",umacr:"ū",Umacr:"Ū",uml:"¨",UnderBar:"_",UnderBrace:"⏟",UnderBracket:"⎵",UnderParenthesis:"⏝",Union:"⋃",UnionPlus:"⊎",uogon:"ų",Uogon:"Ų",uopf:"𝕦",Uopf:"𝕌",uparrow:"↑",Uparrow:"⇑",UpArrow:"↑",UpArrowBar:"⤒",UpArrowDownArrow:"⇅",updownarrow:"↕",Updownarrow:"⇕",UpDownArrow:"↕",UpEquilibrium:"⥮",upharpoonleft:"↿",upharpoonright:"↾",uplus:"⊎",UpperLeftArrow:"↖",UpperRightArrow:"↗",upsi:"υ",Upsi:"ϒ",upsih:"ϒ",upsilon:"υ",Upsilon:"Υ",UpTee:"⊥",UpTeeArrow:"↥",upuparrows:"⇈",urcorn:"⌝",urcorner:"⌝",urcrop:"⌎",uring:"ů",Uring:"Ů",urtri:"◹",uscr:"𝓊",Uscr:"𝒰",utdot:"⋰",utilde:"ũ",Utilde:"Ũ",utri:"▵",utrif:"▴",uuarr:"⇈",uuml:"ü",Uuml:"Ü",uwangle:"⦧",vangrt:"⦜",varepsilon:"ϵ",varkappa:"ϰ",varnothing:"∅",varphi:"ϕ",varpi:"ϖ",varpropto:"∝",varr:"↕",vArr:"⇕",varrho:"ϱ",varsigma:"ς",varsubsetneq:"⊊︀",varsubsetneqq:"⫋︀",varsupsetneq:"⊋︀",varsupsetneqq:"⫌︀",vartheta:"ϑ",vartriangleleft:"⊲",vartriangleright:"⊳",vBar:"⫨",Vbar:"⫫",vBarv:"⫩",vcy:"в",Vcy:"В",vdash:"⊢",vDash:"⊨",Vdash:"⊩",VDash:"⊫",Vdashl:"⫦",vee:"∨",Vee:"⋁",veebar:"⊻",veeeq:"≚",vellip:"⋮",verbar:"|",Verbar:"‖",vert:"|",Vert:"‖",VerticalBar:"∣",VerticalLine:"|",VerticalSeparator:"❘",VerticalTilde:"≀",VeryThinSpace:" ",vfr:"𝔳",Vfr:"𝔙",vltri:"⊲",vnsub:"⊂⃒",vnsup:"⊃⃒",vopf:"𝕧",Vopf:"𝕍",vprop:"∝",vrtri:"⊳",vscr:"𝓋",Vscr:"𝒱",vsubne:"⊊︀",vsubnE:"⫋︀",vsupne:"⊋︀",vsupnE:"⫌︀",Vvdash:"⊪",vzigzag:"⦚",wcirc:"ŵ",Wcirc:"Ŵ",wedbar:"⩟",wedge:"∧",Wedge:"⋀",wedgeq:"≙",weierp:"℘",wfr:"𝔴",Wfr:"𝔚",wopf:"𝕨",Wopf:"𝕎",wp:"℘",wr:"≀",wreath:"≀",wscr:"𝓌",Wscr:"𝒲",xcap:"⋂",xcirc:"◯",xcup:"⋃",xdtri:"▽",xfr:"𝔵",Xfr:"𝔛",xharr:"⟷",xhArr:"⟺",xi:"ξ",Xi:"Ξ",xlarr:"⟵",xlArr:"⟸",xmap:"⟼",xnis:"⋻",xodot:"⨀",xopf:"𝕩",Xopf:"𝕏",xoplus:"⨁",xotime:"⨂",xrarr:"⟶",xrArr:"⟹",xscr:"𝓍",Xscr:"𝒳",xsqcup:"⨆",xuplus:"⨄",xutri:"△",xvee:"⋁",xwedge:"⋀",yacute:"ý",Yacute:"Ý",yacy:"я",YAcy:"Я",ycirc:"ŷ",Ycirc:"Ŷ",ycy:"ы",Ycy:"Ы",yen:"¥",yfr:"𝔶",Yfr:"𝔜",yicy:"ї",YIcy:"Ї",yopf:"𝕪",Yopf:"𝕐",yscr:"𝓎",Yscr:"𝒴",yucy:"ю",YUcy:"Ю",yuml:"ÿ",Yuml:"Ÿ",zacute:"ź",Zacute:"Ź",zcaron:"ž",Zcaron:"Ž",zcy:"з",Zcy:"З",zdot:"ż",Zdot:"Ż",zeetrf:"ℨ",ZeroWidthSpace:"​",zeta:"ζ",Zeta:"Ζ",zfr:"𝔷",Zfr:"ℨ",zhcy:"ж",ZHcy:"Ж",zigrarr:"⇝",zopf:"𝕫",Zopf:"ℤ",zscr:"𝓏",Zscr:"𝒵",zwj:"‍",zwnj:"‌"},v={aacute:"á",Aacute:"Á",acirc:"â",Acirc:"Â",acute:"´",aelig:"æ",AElig:"Æ",agrave:"à",Agrave:"À",amp:"&",AMP:"&",aring:"å",Aring:"Å",atilde:"ã",Atilde:"Ã",auml:"ä",Auml:"Ä",brvbar:"¦",ccedil:"ç",Ccedil:"Ç",cedil:"¸",cent:"¢",copy:"©",COPY:"©",curren:"¤",deg:"°",divide:"÷",eacute:"é",Eacute:"É",ecirc:"ê",Ecirc:"Ê",egrave:"è",Egrave:"È",eth:"ð",ETH:"Ð",euml:"ë",Euml:"Ë",frac12:"½",frac14:"¼",frac34:"¾",gt:">",GT:">",iacute:"í",Iacute:"Í",icirc:"î",Icirc:"Î",iexcl:"¡",igrave:"ì",Igrave:"Ì",iquest:"¿",iuml:"ï",Iuml:"Ï",laquo:"«",lt:"<",LT:"<",macr:"¯",micro:"µ",middot:"·",nbsp:" ",not:"¬",ntilde:"ñ",Ntilde:"Ñ",oacute:"ó",Oacute:"Ó",ocirc:"ô",Ocirc:"Ô",ograve:"ò",Ograve:"Ò",ordf:"ª",ordm:"º",oslash:"ø",Oslash:"Ø",otilde:"õ",Otilde:"Õ",ouml:"ö",Ouml:"Ö",para:"¶",plusmn:"±",pound:"£",quot:'"',QUOT:'"',raquo:"»",reg:"®",REG:"®",sect:"§",shy:"­",sup1:"¹",sup2:"²",sup3:"³",szlig:"ß",thorn:"þ",THORN:"Þ",times:"×",uacute:"ú",Uacute:"Ú",ucirc:"û",Ucirc:"Û",ugrave:"ù",Ugrave:"Ù",uml:"¨",uuml:"ü",Uuml:"Ü",yacute:"ý",Yacute:"Ý",yen:"¥",yuml:"ÿ"},y={0:"�",128:"€",130:"‚",131:"ƒ",132:"„",133:"…",134:"†",135:"‡",136:"ˆ",137:"‰",138:"Š",139:"‹",140:"Œ",142:"Ž",145:"‘",146:"’",147:"“",148:"”",149:"•",150:"–",151:"—",152:"˜",153:"™",154:"š",155:"›",156:"œ",158:"ž",159:"Ÿ"},b=[1,2,3,4,5,6,7,8,11,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,127,128,129,130,131,132,133,134,135,136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,64976,64977,64978,64979,64980,64981,64982,64983,64984,64985,64986,64987,64988,64989,64990,64991,64992,64993,64994,64995,64996,64997,64998,64999,65e3,65001,65002,65003,65004,65005,65006,65007,65534,65535,131070,131071,196606,196607,262142,262143,327678,327679,393214,393215,458750,458751,524286,524287,589822,589823,655358,655359,720894,720895,786430,786431,851966,851967,917502,917503,983038,983039,1048574,1048575,1114110,1114111],E=String.fromCharCode,w={}.hasOwnProperty,_=function(e,t){return w.call(e,t)},T=function(e,t){if(!e)return t
var r,n={}
for(r in t)n[r]=_(e,r)?e[r]:t[r]
return n},A=function(e,t){var r=""
return e>=55296&&e<=57343||e>1114111?(t&&S("character reference outside the permissible Unicode range"),"�"):_(y,e)?(t&&S("disallowed character reference"),y[e]):(t&&function(e,t){for(var r=-1,n=e.length;++r<n;)if(e[r]==t)return!0
return!1}(b,e)&&S("disallowed character reference"),e>65535&&(r+=E((e-=65536)>>>10&1023|55296),e=56320|1023&e),r+=E(e))},D=function(e){return"&#x"+e.toString(16).toUpperCase()+";"},k=function(e){return"&#"+e+";"},S=function(e){throw Error("Parse error: "+e)},x=function(e,t){(t=T(t,x.options)).strict&&p.test(e)&&S("forbidden code point")
var r=t.encodeEverything,n=t.useNamedReferences,i=t.allowUnsafeSymbols,a=t.decimal?k:D,h=function(e){return a(e.charCodeAt(0))}
return r?(e=e.replace(s,(function(e){return n&&_(c,e)?"&"+c[e]+";":h(e)})),n&&(e=e.replace(/&gt;\u20D2/g,"&nvgt;").replace(/&lt;\u20D2/g,"&nvlt;").replace(/&#x66;&#x6A;/g,"&fjlig;")),n&&(e=e.replace(l,(function(e){return"&"+c[e]+";"})))):n?(i||(e=e.replace(d,(function(e){return"&"+c[e]+";"}))),e=(e=e.replace(/&gt;\u20D2/g,"&nvgt;").replace(/&lt;\u20D2/g,"&nvlt;")).replace(l,(function(e){return"&"+c[e]+";"}))):i||(e=e.replace(d,h)),e.replace(o,(function(e){var t=e.charCodeAt(0),r=e.charCodeAt(1)
return a(1024*(t-55296)+r-56320+65536)})).replace(u,h)}
x.options={allowUnsafeSymbols:!1,encodeEverything:!1,strict:!1,useNamedReferences:!1,decimal:!1}
var C=function(e,t){var r=(t=T(t,C.options)).strict
return r&&f.test(e)&&S("malformed character reference"),e.replace(g,(function(e,n,i,a,o,s,u,l,c){var d,h,f,p,g,y
return n?m[g=n]:i?(g=i,(y=a)&&t.isAttributeValue?(r&&"="==y&&S("`&` did not start a character reference"),e):(r&&S("named character reference was not terminated by a semicolon"),v[g]+(y||""))):o?(f=o,h=s,r&&!h&&S("character reference was not terminated by a semicolon"),d=parseInt(f,10),A(d,r)):u?(p=u,h=l,r&&!h&&S("character reference was not terminated by a semicolon"),d=parseInt(p,16),A(d,r)):(r&&S("named character reference was not terminated by a semicolon"),e)}))}
C.options={isAttributeValue:!1,strict:!1}
var L={version:"1.2.0",encode:x,decode:C,escape:function(e){return e.replace(d,(function(e){return h[e]}))},unescape:C}
void 0===(n=function(){return L}.call(t,r,t,e))||(e.exports=n)}()},420:e=>{!function t(r){e.exports=function(){"use strict"
function e(e,t){var r=Object.keys(e)
if(Object.getOwnPropertySymbols){var n=Object.getOwnPropertySymbols(e)
t&&(n=n.filter((function(t){return Object.getOwnPropertyDescriptor(e,t).enumerable}))),r.push.apply(r,n)}return r}function n(t){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{}
r%2?e(Object(n),!0).forEach((function(e){o(t,e,n[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):e(Object(n)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(n,e))}))}return t}function i(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,g(n.key),n)}}function a(e,t,r){return t&&i(e.prototype,t),r&&i(e,r),Object.defineProperty(e,"prototype",{writable:!1}),e}function o(e,t,r){return(t=g(t))in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}function s(){return s=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},s.apply(this,arguments)}function u(e,t){e.prototype=Object.create(t.prototype),e.prototype.constructor=e,c(e,t)}function l(e){return l=Object.setPrototypeOf?Object.getPrototypeOf.bind():function(e){return e.__proto__||Object.getPrototypeOf(e)},l(e)}function c(e,t){return c=Object.setPrototypeOf?Object.setPrototypeOf.bind():function(e,t){return e.__proto__=t,e},c(e,t)}function d(e,t,r){return d=function(){if("undefined"==typeof Reflect||!Reflect.construct)return!1
if(Reflect.construct.sham)return!1
if("function"==typeof Proxy)return!0
try{return Boolean.prototype.valueOf.call(Reflect.construct(Boolean,[],(function(){}))),!0}catch(e){return!1}}()?Reflect.construct.bind():function(e,t,r){var n=[null]
n.push.apply(n,t)
var i=new(Function.bind.apply(e,n))
return r&&c(i,r.prototype),i},d.apply(null,arguments)}function h(e){var t="function"==typeof Map?new Map:void 0
return h=function(e){if(null===e||(r=e,-1===Function.toString.call(r).indexOf("[native code]")))return e
var r
if("function"!=typeof e)throw new TypeError("Super expression must either be null or a function")
if(void 0!==t){if(t.has(e))return t.get(e)
t.set(e,n)}function n(){return d(e,arguments,l(this).constructor)}return n.prototype=Object.create(e.prototype,{constructor:{value:n,enumerable:!1,writable:!0,configurable:!0}}),c(n,e)},h(e)}function f(e,t){(null==t||t>e.length)&&(t=e.length)
for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r]
return n}function p(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(r)return(r=r.call(e)).next.bind(r)
if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return f(e,t)
var r=Object.prototype.toString.call(e).slice(8,-1)
return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?f(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r)
var n=0
return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function g(e){var t=function(e,t){if("object"!=typeof e||null===e)return e
var r=e[Symbol.toPrimitive]
if(void 0!==r){var n=r.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(e)
return"symbol"==typeof t?t:String(t)}var m={exports:{}}
!function(e,t){var r,n,i,a,o
r=/^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/,n=/^(?=([^\/?#]*))\1([^]*)$/,i=/(?:\/|^)\.(?=\/)/g,a=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,o={buildAbsoluteURL:function(e,t,r){if(r=r||{},e=e.trim(),!(t=t.trim())){if(!r.alwaysNormalize)return e
var i=o.parseURL(e)
if(!i)throw new Error("Error trying to parse base URL.")
return i.path=o.normalizePath(i.path),o.buildURLFromParts(i)}var a=o.parseURL(t)
if(!a)throw new Error("Error trying to parse relative URL.")
if(a.scheme)return r.alwaysNormalize?(a.path=o.normalizePath(a.path),o.buildURLFromParts(a)):t
var s=o.parseURL(e)
if(!s)throw new Error("Error trying to parse base URL.")
if(!s.netLoc&&s.path&&"/"!==s.path[0]){var u=n.exec(s.path)
s.netLoc=u[1],s.path=u[2]}s.netLoc&&!s.path&&(s.path="/")
var l={scheme:s.scheme,netLoc:a.netLoc,path:null,params:a.params,query:a.query,fragment:a.fragment}
if(!a.netLoc&&(l.netLoc=s.netLoc,"/"!==a.path[0]))if(a.path){var c=s.path,d=c.substring(0,c.lastIndexOf("/")+1)+a.path
l.path=o.normalizePath(d)}else l.path=s.path,a.params||(l.params=s.params,a.query||(l.query=s.query))
return null===l.path&&(l.path=r.alwaysNormalize?o.normalizePath(a.path):a.path),o.buildURLFromParts(l)},parseURL:function(e){var t=r.exec(e)
return t?{scheme:t[1]||"",netLoc:t[2]||"",path:t[3]||"",params:t[4]||"",query:t[5]||"",fragment:t[6]||""}:null},normalizePath:function(e){for(e=e.split("").reverse().join("").replace(i,"");e.length!==(e=e.replace(a,"")).length;);return e.split("").reverse().join("")},buildURLFromParts:function(e){return e.scheme+e.netLoc+e.path+e.params+e.query+e.fragment}},e.exports=o}(m)
var v=m.exports,y=Number.isFinite||function(e){return"number"==typeof e&&isFinite(e)},b=function(e){return e.MEDIA_ATTACHING="hlsMediaAttaching",e.MEDIA_ATTACHED="hlsMediaAttached",e.MEDIA_DETACHING="hlsMediaDetaching",e.MEDIA_DETACHED="hlsMediaDetached",e.BUFFER_RESET="hlsBufferReset",e.BUFFER_CODECS="hlsBufferCodecs",e.BUFFER_CREATED="hlsBufferCreated",e.BUFFER_APPENDING="hlsBufferAppending",e.BUFFER_APPENDED="hlsBufferAppended",e.BUFFER_EOS="hlsBufferEos",e.BUFFER_FLUSHING="hlsBufferFlushing",e.BUFFER_FLUSHED="hlsBufferFlushed",e.MANIFEST_LOADING="hlsManifestLoading",e.MANIFEST_LOADED="hlsManifestLoaded",e.MANIFEST_PARSED="hlsManifestParsed",e.LEVEL_SWITCHING="hlsLevelSwitching",e.LEVEL_SWITCHED="hlsLevelSwitched",e.LEVEL_LOADING="hlsLevelLoading",e.LEVEL_LOADED="hlsLevelLoaded",e.LEVEL_UPDATED="hlsLevelUpdated",e.LEVEL_PTS_UPDATED="hlsLevelPtsUpdated",e.LEVELS_UPDATED="hlsLevelsUpdated",e.AUDIO_TRACKS_UPDATED="hlsAudioTracksUpdated",e.AUDIO_TRACK_SWITCHING="hlsAudioTrackSwitching",e.AUDIO_TRACK_SWITCHED="hlsAudioTrackSwitched",e.AUDIO_TRACK_LOADING="hlsAudioTrackLoading",e.AUDIO_TRACK_LOADED="hlsAudioTrackLoaded",e.SUBTITLE_TRACKS_UPDATED="hlsSubtitleTracksUpdated",e.SUBTITLE_TRACKS_CLEARED="hlsSubtitleTracksCleared",e.SUBTITLE_TRACK_SWITCH="hlsSubtitleTrackSwitch",e.SUBTITLE_TRACK_LOADING="hlsSubtitleTrackLoading",e.SUBTITLE_TRACK_LOADED="hlsSubtitleTrackLoaded",e.SUBTITLE_FRAG_PROCESSED="hlsSubtitleFragProcessed",e.CUES_PARSED="hlsCuesParsed",e.NON_NATIVE_TEXT_TRACKS_FOUND="hlsNonNativeTextTracksFound",e.INIT_PTS_FOUND="hlsInitPtsFound",e.FRAG_LOADING="hlsFragLoading",e.FRAG_LOAD_EMERGENCY_ABORTED="hlsFragLoadEmergencyAborted",e.FRAG_LOADED="hlsFragLoaded",e.FRAG_DECRYPTED="hlsFragDecrypted",e.FRAG_PARSING_INIT_SEGMENT="hlsFragParsingInitSegment",e.FRAG_PARSING_USERDATA="hlsFragParsingUserdata",e.FRAG_PARSING_METADATA="hlsFragParsingMetadata",e.FRAG_PARSED="hlsFragParsed",e.FRAG_BUFFERED="hlsFragBuffered",e.FRAG_CHANGED="hlsFragChanged",e.FPS_DROP="hlsFpsDrop",e.FPS_DROP_LEVEL_CAPPING="hlsFpsDropLevelCapping",e.ERROR="hlsError",e.DESTROYING="hlsDestroying",e.KEY_LOADING="hlsKeyLoading",e.KEY_LOADED="hlsKeyLoaded",e.LIVE_BACK_BUFFER_REACHED="hlsLiveBackBufferReached",e.BACK_BUFFER_REACHED="hlsBackBufferReached",e}({}),E=function(e){return e.NETWORK_ERROR="networkError",e.MEDIA_ERROR="mediaError",e.KEY_SYSTEM_ERROR="keySystemError",e.MUX_ERROR="muxError",e.OTHER_ERROR="otherError",e}({}),w=function(e){return e.KEY_SYSTEM_NO_KEYS="keySystemNoKeys",e.KEY_SYSTEM_NO_ACCESS="keySystemNoAccess",e.KEY_SYSTEM_NO_SESSION="keySystemNoSession",e.KEY_SYSTEM_NO_CONFIGURED_LICENSE="keySystemNoConfiguredLicense",e.KEY_SYSTEM_LICENSE_REQUEST_FAILED="keySystemLicenseRequestFailed",e.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED="keySystemServerCertificateRequestFailed",e.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED="keySystemServerCertificateUpdateFailed",e.KEY_SYSTEM_SESSION_UPDATE_FAILED="keySystemSessionUpdateFailed",e.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED="keySystemStatusOutputRestricted",e.KEY_SYSTEM_STATUS_INTERNAL_ERROR="keySystemStatusInternalError",e.MANIFEST_LOAD_ERROR="manifestLoadError",e.MANIFEST_LOAD_TIMEOUT="manifestLoadTimeOut",e.MANIFEST_PARSING_ERROR="manifestParsingError",e.MANIFEST_INCOMPATIBLE_CODECS_ERROR="manifestIncompatibleCodecsError",e.LEVEL_EMPTY_ERROR="levelEmptyError",e.LEVEL_LOAD_ERROR="levelLoadError",e.LEVEL_LOAD_TIMEOUT="levelLoadTimeOut",e.LEVEL_PARSING_ERROR="levelParsingError",e.LEVEL_SWITCH_ERROR="levelSwitchError",e.AUDIO_TRACK_LOAD_ERROR="audioTrackLoadError",e.AUDIO_TRACK_LOAD_TIMEOUT="audioTrackLoadTimeOut",e.SUBTITLE_LOAD_ERROR="subtitleTrackLoadError",e.SUBTITLE_TRACK_LOAD_TIMEOUT="subtitleTrackLoadTimeOut",e.FRAG_LOAD_ERROR="fragLoadError",e.FRAG_LOAD_TIMEOUT="fragLoadTimeOut",e.FRAG_DECRYPT_ERROR="fragDecryptError",e.FRAG_PARSING_ERROR="fragParsingError",e.FRAG_GAP="fragGap",e.REMUX_ALLOC_ERROR="remuxAllocError",e.KEY_LOAD_ERROR="keyLoadError",e.KEY_LOAD_TIMEOUT="keyLoadTimeOut",e.BUFFER_ADD_CODEC_ERROR="bufferAddCodecError",e.BUFFER_INCOMPATIBLE_CODECS_ERROR="bufferIncompatibleCodecsError",e.BUFFER_APPEND_ERROR="bufferAppendError",e.BUFFER_APPENDING_ERROR="bufferAppendingError",e.BUFFER_STALLED_ERROR="bufferStalledError",e.BUFFER_FULL_ERROR="bufferFullError",e.BUFFER_SEEK_OVER_HOLE="bufferSeekOverHole",e.BUFFER_NUDGE_ON_STALL="bufferNudgeOnStall",e.INTERNAL_EXCEPTION="internalException",e.INTERNAL_ABORTED="aborted",e.UNKNOWN="unknown",e}({}),_=function(){},T={trace:_,debug:_,log:_,warn:_,info:_,error:_},A=T
function D(e,t){if(self.console&&!0===e||"object"==typeof e){(function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]
r.forEach((function(t){A[t]=e[t]?e[t].bind(e):function(e){var t=self.console[e]
return t?t.bind(self.console,"["+e+"] >"):_}(t)}))})(e,"debug","log","info","warn","error")
try{A.log('Debug logs enabled for "'+t+'" in hls.js version 1.4.3')}catch(e){A=T}}else A=T}var k=A,S=/^(\d+)x(\d+)$/,x=/(.+?)=(".*?"|.*?)(?:,|$)/g,C=function(){function e(t){for(var r in"string"==typeof t&&(t=e.parseAttrList(t)),t)t.hasOwnProperty(r)&&("X-"===r.substring(0,2)&&(this.clientAttrs=this.clientAttrs||[],this.clientAttrs.push(r)),this[r]=t[r])}var t=e.prototype
return t.decimalInteger=function(e){var t=parseInt(this[e],10)
return t>Number.MAX_SAFE_INTEGER?1/0:t},t.hexadecimalInteger=function(e){if(this[e]){var t=(this[e]||"0x").slice(2)
t=(1&t.length?"0":"")+t
for(var r=new Uint8Array(t.length/2),n=0;n<t.length/2;n++)r[n]=parseInt(t.slice(2*n,2*n+2),16)
return r}return null},t.hexadecimalIntegerAsNumber=function(e){var t=parseInt(this[e],16)
return t>Number.MAX_SAFE_INTEGER?1/0:t},t.decimalFloatingPoint=function(e){return parseFloat(this[e])},t.optionalFloat=function(e,t){var r=this[e]
return r?parseFloat(r):t},t.enumeratedString=function(e){return this[e]},t.bool=function(e){return"YES"===this[e]},t.decimalResolution=function(e){var t=S.exec(this[e])
if(null!==t)return{width:parseInt(t[1],10),height:parseInt(t[2],10)}},e.parseAttrList=function(e){var t,r={}
for(x.lastIndex=0;null!==(t=x.exec(e));){var n=t[2]
0===n.indexOf('"')&&n.lastIndexOf('"')===n.length-1&&(n=n.slice(1,-1)),r[t[1].trim()]=n}return r},e}()
function L(e){return"SCTE35-OUT"===e||"SCTE35-IN"===e}var R=function(){function e(e,t){if(this.attr=void 0,this._startDate=void 0,this._endDate=void 0,this._badValueForSameId=void 0,t){var r=t.attr
for(var n in r)if(Object.prototype.hasOwnProperty.call(e,n)&&e[n]!==r[n]){k.warn('DATERANGE tag attribute: "'+n+'" does not match for tags with ID: "'+e.ID+'"'),this._badValueForSameId=n
break}e=s(new C({}),r,e)}if(this.attr=e,this._startDate=new Date(e["START-DATE"]),"END-DATE"in this.attr){var i=new Date(this.attr["END-DATE"])
y(i.getTime())&&(this._endDate=i)}}return a(e,[{key:"id",get:function(){return this.attr.ID}},{key:"class",get:function(){return this.attr.CLASS}},{key:"startDate",get:function(){return this._startDate}},{key:"endDate",get:function(){if(this._endDate)return this._endDate
var e=this.duration
return null!==e?new Date(this._startDate.getTime()+1e3*e):null}},{key:"duration",get:function(){if("DURATION"in this.attr){var e=this.attr.decimalFloatingPoint("DURATION")
if(y(e))return e}else if(this._endDate)return(this._endDate.getTime()-this._startDate.getTime())/1e3
return null}},{key:"plannedDuration",get:function(){return"PLANNED-DURATION"in this.attr?this.attr.decimalFloatingPoint("PLANNED-DURATION"):null}},{key:"endOnNext",get:function(){return this.attr.bool("END-ON-NEXT")}},{key:"isValid",get:function(){return!!this.id&&!this._badValueForSameId&&y(this.startDate.getTime())&&(null===this.duration||this.duration>=0)&&(!this.endOnNext||!!this.class)}}]),e}(),I=function(){this.aborted=!1,this.loaded=0,this.retry=0,this.total=0,this.chunkCount=0,this.bwEstimate=0,this.loading={start:0,first:0,end:0},this.parsing={start:0,end:0},this.buffering={start:0,first:0,end:0}},O="audio",F="video",P="audiovideo",N=function(){function e(e){var t
this._byteRange=null,this._url=null,this.baseurl=void 0,this.relurl=void 0,this.elementaryStreams=((t={})[O]=null,t[F]=null,t[P]=null,t),this.baseurl=e}return e.prototype.setByteRange=function(e,t){var r=e.split("@",2),n=[]
1===r.length?n[0]=t?t.byteRangeEndOffset:0:n[0]=parseInt(r[1]),n[1]=parseInt(r[0])+n[0],this._byteRange=n},a(e,[{key:"byteRange",get:function(){return this._byteRange?this._byteRange:[]}},{key:"byteRangeStartOffset",get:function(){return this.byteRange[0]}},{key:"byteRangeEndOffset",get:function(){return this.byteRange[1]}},{key:"url",get:function(){return!this._url&&this.baseurl&&this.relurl&&(this._url=v.buildAbsoluteURL(this.baseurl,this.relurl,{alwaysNormalize:!0})),this._url||""},set:function(e){this._url=e}}]),e}(),M=function(e){function t(t,r){var n
return(n=e.call(this,r)||this)._decryptdata=null,n.rawProgramDateTime=null,n.programDateTime=null,n.tagList=[],n.duration=0,n.sn=0,n.levelkeys=void 0,n.type=void 0,n.loader=null,n.keyLoader=null,n.level=-1,n.cc=0,n.startPTS=void 0,n.endPTS=void 0,n.startDTS=void 0,n.endDTS=void 0,n.start=0,n.deltaPTS=void 0,n.maxStartPTS=void 0,n.minEndPTS=void 0,n.stats=new I,n.urlId=0,n.data=void 0,n.bitrateTest=!1,n.title=null,n.initSegment=null,n.endList=void 0,n.gap=void 0,n.type=t,n}u(t,e)
var r=t.prototype
return r.setKeyFormat=function(e){if(this.levelkeys){var t=this.levelkeys[e]
t&&!this._decryptdata&&(this._decryptdata=t.getDecryptData(this.sn))}},r.abortRequests=function(){var e,t
null==(e=this.loader)||e.abort(),null==(t=this.keyLoader)||t.abort()},r.setElementaryStreamInfo=function(e,t,r,n,i,a){void 0===a&&(a=!1)
var o=this.elementaryStreams,s=o[e]
s?(s.startPTS=Math.min(s.startPTS,t),s.endPTS=Math.max(s.endPTS,r),s.startDTS=Math.min(s.startDTS,n),s.endDTS=Math.max(s.endDTS,i)):o[e]={startPTS:t,endPTS:r,startDTS:n,endDTS:i,partial:a}},r.clearElementaryStreamInfo=function(){var e=this.elementaryStreams
e[O]=null,e[F]=null,e[P]=null},a(t,[{key:"decryptdata",get:function(){if(!this.levelkeys&&!this._decryptdata)return null
if(!this._decryptdata&&this.levelkeys&&!this.levelkeys.NONE){var e=this.levelkeys.identity
if(e)this._decryptdata=e.getDecryptData(this.sn)
else{var t=Object.keys(this.levelkeys)
if(1===t.length)return this._decryptdata=this.levelkeys[t[0]].getDecryptData(this.sn)}}return this._decryptdata}},{key:"end",get:function(){return this.start+this.duration}},{key:"endProgramDateTime",get:function(){if(null===this.programDateTime)return null
if(!y(this.programDateTime))return null
var e=y(this.duration)?this.duration:0
return this.programDateTime+1e3*e}},{key:"encrypted",get:function(){var e
if(null!=(e=this._decryptdata)&&e.encrypted)return!0
if(this.levelkeys){var t=Object.keys(this.levelkeys),r=t.length
if(r>1||1===r&&this.levelkeys[t[0]].encrypted)return!0}return!1}}]),t}(N),B=function(e){function t(t,r,n,i,a){var o;(o=e.call(this,n)||this).fragOffset=0,o.duration=0,o.gap=!1,o.independent=!1,o.relurl=void 0,o.fragment=void 0,o.index=void 0,o.stats=new I,o.duration=t.decimalFloatingPoint("DURATION"),o.gap=t.bool("GAP"),o.independent=t.bool("INDEPENDENT"),o.relurl=t.enumeratedString("URI"),o.fragment=r,o.index=i
var s=t.enumeratedString("BYTERANGE")
return s&&o.setByteRange(s,a),a&&(o.fragOffset=a.fragOffset+a.duration),o}return u(t,e),a(t,[{key:"start",get:function(){return this.fragment.start+this.fragOffset}},{key:"end",get:function(){return this.start+this.duration}},{key:"loaded",get:function(){var e=this.elementaryStreams
return!!(e.audio||e.video||e.audiovideo)}}]),t}(N),U=function(){function e(e){this.PTSKnown=!1,this.alignedSliding=!1,this.averagetargetduration=void 0,this.endCC=0,this.endSN=0,this.fragments=void 0,this.fragmentHint=void 0,this.partList=null,this.dateRanges=void 0,this.live=!0,this.ageHeader=0,this.advancedDateTime=void 0,this.updated=!0,this.advanced=!0,this.availabilityDelay=void 0,this.misses=0,this.startCC=0,this.startSN=0,this.startTimeOffset=null,this.targetduration=0,this.totalduration=0,this.type=null,this.url=void 0,this.m3u8="",this.version=null,this.canBlockReload=!1,this.canSkipUntil=0,this.canSkipDateRanges=!1,this.skippedSegments=0,this.recentlyRemovedDateranges=void 0,this.partHoldBack=0,this.holdBack=0,this.partTarget=0,this.preloadHint=void 0,this.renditionReports=void 0,this.tuneInGoal=0,this.deltaUpdateFailed=void 0,this.driftStartTime=0,this.driftEndTime=0,this.driftStart=0,this.driftEnd=0,this.encryptedFragments=void 0,this.playlistParsingError=null,this.variableList=null,this.hasVariableRefs=!1,this.fragments=[],this.encryptedFragments=[],this.dateRanges={},this.url=e}return e.prototype.reloaded=function(e){if(!e)return this.advanced=!0,void(this.updated=!0)
var t=this.lastPartSn-e.lastPartSn,r=this.lastPartIndex-e.lastPartIndex
this.updated=this.endSN!==e.endSN||!!r||!!t,this.advanced=this.endSN>e.endSN||t>0||0===t&&r>0,this.updated||this.advanced?this.misses=Math.floor(.6*e.misses):this.misses=e.misses+1,this.availabilityDelay=e.availabilityDelay},a(e,[{key:"hasProgramDateTime",get:function(){return!!this.fragments.length&&y(this.fragments[this.fragments.length-1].programDateTime)}},{key:"levelTargetDuration",get:function(){return this.averagetargetduration||this.targetduration||10}},{key:"drift",get:function(){var e=this.driftEndTime-this.driftStartTime
return e>0?1e3*(this.driftEnd-this.driftStart)/e:1}},{key:"edge",get:function(){return this.partEnd||this.fragmentEnd}},{key:"partEnd",get:function(){var e
return null!=(e=this.partList)&&e.length?this.partList[this.partList.length-1].end:this.fragmentEnd}},{key:"fragmentEnd",get:function(){var e
return null!=(e=this.fragments)&&e.length?this.fragments[this.fragments.length-1].end:0}},{key:"age",get:function(){return this.advancedDateTime?Math.max(Date.now()-this.advancedDateTime,0)/1e3:0}},{key:"lastPartIndex",get:function(){var e
return null!=(e=this.partList)&&e.length?this.partList[this.partList.length-1].index:-1}},{key:"lastPartSn",get:function(){var e
return null!=(e=this.partList)&&e.length?this.partList[this.partList.length-1].fragment.sn:this.endSN}}]),e}()
function q(e){return Uint8Array.from(atob(e),(function(e){return e.charCodeAt(0)}))}function j(e){return Uint8Array.from(unescape(encodeURIComponent(e)),(function(e){return e.charCodeAt(0)}))}var G={CLEARKEY:"org.w3.clearkey",FAIRPLAY:"com.apple.fps",PLAYREADY:"com.microsoft.playready",WIDEVINE:"com.widevine.alpha"},H="org.w3.clearkey",V="com.apple.streamingkeydelivery",z="com.microsoft.playready",K="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
function W(e){switch(e){case V:return G.FAIRPLAY
case z:return G.PLAYREADY
case K:return G.WIDEVINE
case H:return G.CLEARKEY}}var $="edef8ba979d64acea3c827dcd51d21ed"
function Y(e){switch(e){case G.FAIRPLAY:return V
case G.PLAYREADY:return z
case G.WIDEVINE:return K
case G.CLEARKEY:return H}}function Q(e){var t=e.drmSystems,r=e.widevineLicenseUrl,n=t?[G.FAIRPLAY,G.WIDEVINE,G.PLAYREADY,G.CLEARKEY].filter((function(e){return!!t[e]})):[]
return!n[G.WIDEVINE]&&r&&n.push(G.WIDEVINE),n}var X="undefined"!=typeof self&&self.navigator&&self.navigator.requestMediaKeySystemAccess?self.navigator.requestMediaKeySystemAccess.bind(self.navigator):null
function Z(e,t,r){return Uint8Array.prototype.slice?e.slice(t,r):new Uint8Array(Array.prototype.slice.call(e,t,r))}var J,ee=function(e,t){return t+10<=e.length&&73===e[t]&&68===e[t+1]&&51===e[t+2]&&e[t+3]<255&&e[t+4]<255&&e[t+6]<128&&e[t+7]<128&&e[t+8]<128&&e[t+9]<128},te=function(e,t){return t+10<=e.length&&51===e[t]&&68===e[t+1]&&73===e[t+2]&&e[t+3]<255&&e[t+4]<255&&e[t+6]<128&&e[t+7]<128&&e[t+8]<128&&e[t+9]<128},re=function(e,t){for(var r=t,n=0;ee(e,t);)n+=10,n+=ne(e,t+6),te(e,t+10)&&(n+=10),t+=n
if(n>0)return e.subarray(r,r+n)},ne=function(e,t){var r=0
return r=(127&e[t])<<21,r|=(127&e[t+1])<<14,(r|=(127&e[t+2])<<7)|127&e[t+3]},ie=function(e,t){return ee(e,t)&&ne(e,t+6)+10<=e.length-t},ae=function(e){return e&&"PRIV"===e.key&&"com.apple.streaming.transportStreamTimestamp"===e.info},oe=function(e){var t=String.fromCharCode(e[0],e[1],e[2],e[3]),r=ne(e,4)
return{type:t,size:r,data:e.subarray(10,10+r)}},se=function(e){for(var t=0,r=[];ee(e,t);){for(var n=ne(e,t+6),i=(t+=10)+n;t+8<i;){var a=oe(e.subarray(t)),o=ue(a)
o&&r.push(o),t+=a.size+10}te(e,t)&&(t+=10)}return r},ue=function(e){return"PRIV"===e.type?le(e):"W"===e.type[0]?de(e):ce(e)},le=function(e){if(!(e.size<2)){var t=fe(e.data,!0),r=new Uint8Array(e.data.subarray(t.length+1))
return{key:e.type,info:t,data:r.buffer}}},ce=function(e){if(!(e.size<2)){if("TXXX"===e.type){var t=1,r=fe(e.data.subarray(t),!0)
t+=r.length+1
var n=fe(e.data.subarray(t))
return{key:e.type,info:r,data:n}}var i=fe(e.data.subarray(1))
return{key:e.type,data:i}}},de=function(e){if("WXXX"===e.type){if(e.size<2)return
var t=1,r=fe(e.data.subarray(t),!0)
t+=r.length+1
var n=fe(e.data.subarray(t))
return{key:e.type,info:r,data:n}}var i=fe(e.data)
return{key:e.type,data:i}},he=function(e){if(8===e.data.byteLength){var t=new Uint8Array(e.data),r=1&t[3],n=(t[4]<<23)+(t[5]<<15)+(t[6]<<7)+t[7]
return n/=45,r&&(n+=47721858.84),Math.round(n)}},fe=function(e,t){void 0===t&&(t=!1)
var r=(J||void 0===self.TextDecoder||(J=new self.TextDecoder("utf-8")),J)
if(r){var n=r.decode(e)
if(t){var i=n.indexOf("\0")
return-1!==i?n.substring(0,i):n}return n.replace(/\0/g,"")}for(var a,o,s,u=e.length,l="",c=0;c<u;){if(0===(a=e[c++])&&t)return l
if(0!==a&&3!==a)switch(a>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:l+=String.fromCharCode(a)
break
case 12:case 13:o=e[c++],l+=String.fromCharCode((31&a)<<6|63&o)
break
case 14:o=e[c++],s=e[c++],l+=String.fromCharCode((15&a)<<12|(63&o)<<6|(63&s)<<0)}}return l}
var pe=function(e){for(var t="",r=0;r<e.length;r++){var n=e[r].toString(16)
n.length<2&&(n="0"+n),t+=n}return t},ge=Math.pow(2,32)-1,me=[].push,ve={video:1,audio:2,id3:3,text:4}
function ye(e){return String.fromCharCode.apply(null,e)}function be(e,t){var r=e[t]<<8|e[t+1]
return r<0?65536+r:r}function Ee(e,t){var r=we(e,t)
return r<0?4294967296+r:r}function we(e,t){return e[t]<<24|e[t+1]<<16|e[t+2]<<8|e[t+3]}function _e(e,t,r){e[t]=r>>24,e[t+1]=r>>16&255,e[t+2]=r>>8&255,e[t+3]=255&r}function Te(e,t){var r=[]
if(!t.length)return r
for(var n=e.byteLength,i=0;i<n;){var a=Ee(e,i),o=a>1?i+a:n
if(ye(e.subarray(i+4,i+8))===t[0])if(1===t.length)r.push(e.subarray(i+8,o))
else{var s=Te(e.subarray(i+8,o),t.slice(1))
s.length&&me.apply(r,s)}i=o}return r}function Ae(e){var t=[],r=e[0],n=8,i=Ee(e,n)
n+=4,n+=0===r?8:16,n+=2
var a=e.length+0,o=be(e,n)
n+=2
for(var s=0;s<o;s++){var u=n,l=Ee(e,u)
u+=4
var c=2147483647&l
if(1==(2147483648&l)>>>31)return k.warn("SIDX has hierarchical references (not supported)"),null
var d=Ee(e,u)
u+=4,t.push({referenceSize:c,subsegmentDuration:d,info:{duration:d/i,start:a,end:a+c-1}}),a+=c,n=u+=4}return{earliestPresentationTime:0,timescale:i,version:r,referencesCount:o,references:t}}function De(e){for(var t=[],r=Te(e,["moov","trak"]),n=0;n<r.length;n++){var i=r[n],a=Te(i,["tkhd"])[0]
if(a){var o=a[0],s=0===o?12:20,u=Ee(a,s),l=Te(i,["mdia","mdhd"])[0]
if(l){var c=Ee(l,s=0===(o=l[0])?12:20),d=Te(i,["mdia","hdlr"])[0]
if(d){var h=ye(d.subarray(8,12)),f={soun:O,vide:F}[h]
if(f){var p=Te(i,["mdia","minf","stbl","stsd"])[0],g=void 0
p&&(g=ye(p.subarray(12,16))),t[u]={timescale:c,type:f},t[f]={timescale:c,id:u,codec:g}}}}}}return Te(e,["moov","mvex","trex"]).forEach((function(e){var r=Ee(e,4),n=t[r]
n&&(n.default={duration:Ee(e,12),flags:Ee(e,20)})})),t}function ke(e){var t=Te(e,["schm"])[0]
if(t){var r=ye(t.subarray(4,8))
if("cbcs"===r||"cenc"===r)return Te(e,["schi","tenc"])[0]}return k.error("[eme] missing 'schm' box"),null}function Se(e){var t=Ee(e,0),r=8
1&t&&(r+=4),4&t&&(r+=4)
for(var n=0,i=Ee(e,4),a=0;a<i;a++)256&t&&(n+=Ee(e,r),r+=4),512&t&&(r+=4),1024&t&&(r+=4),2048&t&&(r+=4)
return n}function xe(e,t){var r=new Uint8Array(e.length+t.length)
return r.set(e),r.set(t,e.length),r}function Ce(e,t){var r=[],n=t.samples,i=t.timescale,a=t.id,o=!1
return Te(n,["moof"]).map((function(s){var u=s.byteOffset-8
Te(s,["traf"]).map((function(s){var l=Te(s,["tfdt"]).map((function(e){var t=e[0],r=Ee(e,4)
return 1===t&&(r*=Math.pow(2,32),r+=Ee(e,8)),r/i}))[0]
return void 0!==l&&(e=l),Te(s,["tfhd"]).map((function(l){var c=Ee(l,4),d=16777215&Ee(l,0),h=0,f=0!=(16&d),p=0,g=0!=(32&d),m=8
c===a&&(0!=(1&d)&&(m+=8),0!=(2&d)&&(m+=4),0!=(8&d)&&(h=Ee(l,m),m+=4),f&&(p=Ee(l,m),m+=4),g&&(m+=4),"video"===t.type&&(o=function(e){if(!e)return!1
var t=e.indexOf("."),r=t<0?e:e.substring(0,t)
return"hvc1"===r||"hev1"===r||"dvh1"===r||"dvhe"===r}(t.codec)),Te(s,["trun"]).map((function(a){var s=a[0],l=16777215&Ee(a,0),c=0!=(1&l),d=0,f=0!=(4&l),g=0!=(256&l),m=0,v=0!=(512&l),y=0,b=0!=(1024&l),E=0!=(2048&l),w=0,_=Ee(a,4),T=8
c&&(d=Ee(a,T),T+=4),f&&(T+=4)
for(var A=d+u,D=0;D<_;D++){if(g?(m=Ee(a,T),T+=4):m=h,v?(y=Ee(a,T),T+=4):y=p,b&&(T+=4),E&&(w=0===s?Ee(a,T):we(a,T),T+=4),t.type===F)for(var k=0;k<y;){var S=Ee(n,A)
Le(o,n[A+=4])&&Re(n.subarray(A,A+S),o?2:1,e+w/i,r),A+=S,k+=S+4}e+=m/i}})))}))}))})),r}function Le(e,t){if(e){var r=t>>1&63
return 39===r||40===r}return 6==(31&t)}function Re(e,t,r,n){var i=Ie(e),a=0
a+=t
for(var o=0,s=0,u=!1,l=0;a<i.length;){o=0
do{if(a>=i.length)break
o+=l=i[a++]}while(255===l)
s=0
do{if(a>=i.length)break
s+=l=i[a++]}while(255===l)
var c=i.length-a
if(!u&&4===o&&a<i.length){if(u=!0,181===i[a++]){var d=be(i,a)
if(a+=2,49===d){var h=Ee(i,a)
if(a+=4,1195456820===h){var f=i[a++]
if(3===f){var p=i[a++],g=64&p,m=g?2+3*(31&p):0,v=new Uint8Array(m)
if(g){v[0]=p
for(var y=1;y<m;y++)v[y]=i[a++]}n.push({type:f,payloadType:o,pts:r,bytes:v})}}}}}else if(5===o&&s<c){if(u=!0,s>16){for(var b=[],E=0;E<16;E++){var w=i[a++].toString(16)
b.push(1==w.length?"0"+w:w),3!==E&&5!==E&&7!==E&&9!==E||b.push("-")}for(var _=s-16,T=new Uint8Array(_),A=0;A<_;A++)T[A]=i[a++]
n.push({payloadType:o,pts:r,uuid:b.join(""),userData:fe(T),userDataBytes:T})}}else if(s<c)a+=s
else if(s>c)break}}function Ie(e){for(var t=e.byteLength,r=[],n=1;n<t-2;)0===e[n]&&0===e[n+1]&&3===e[n+2]?(r.push(n+2),n+=2):n++
if(0===r.length)return e
var i=t-r.length,a=new Uint8Array(i),o=0
for(n=0;n<i;o++,n++)o===r[0]&&(o++,r.shift()),a[n]=e[o]
return a}var Oe={},Fe=function(){function e(e,t,r,n,i){void 0===n&&(n=[1]),void 0===i&&(i=null),this.uri=void 0,this.method=void 0,this.keyFormat=void 0,this.keyFormatVersions=void 0,this.encrypted=void 0,this.isCommonEncryption=void 0,this.iv=null,this.key=null,this.keyId=null,this.pssh=null,this.method=e,this.uri=t,this.keyFormat=r,this.keyFormatVersions=n,this.iv=i,this.encrypted=!!e&&"NONE"!==e,this.isCommonEncryption=this.encrypted&&"AES-128"!==e}e.clearKeyUriToKeyIdMap=function(){Oe={}}
var t=e.prototype
return t.isSupported=function(){if(this.method){if("AES-128"===this.method||"NONE"===this.method)return!0
if("identity"===this.keyFormat)return"SAMPLE-AES"===this.method
switch(this.keyFormat){case V:case K:case z:case H:return-1!==["ISO-23001-7","SAMPLE-AES","SAMPLE-AES-CENC","SAMPLE-AES-CTR"].indexOf(this.method)}}return!1},t.getDecryptData=function(t){if(!this.encrypted||!this.uri)return null
if("AES-128"===this.method&&this.uri&&!this.iv){"number"!=typeof t&&("AES-128"!==this.method||this.iv||k.warn('missing IV for initialization segment with method="'+this.method+'" - compliance issue'),t=0)
var r=function(e){for(var t=new Uint8Array(16),r=12;r<16;r++)t[r]=e>>8*(15-r)&255
return t}(t)
return new e(this.method,this.uri,"identity",this.keyFormatVersions,r)}var n=function(e){var t,r,n=e.split(":"),i=null
if("data"===n[0]&&2===n.length){var a=n[1].split(";"),o=a[a.length-1].split(",")
if(2===o.length){var s="base64"===o[0],u=o[1]
s?(a.splice(-1,1),i=q(u)):(t=j(u).subarray(0,16),(r=new Uint8Array(16)).set(t,16-t.length),i=r)}}return i}(this.uri)
if(n)switch(this.keyFormat){case K:this.pssh=n,n.length>=22&&(this.keyId=n.subarray(n.length-22,n.length-6))
break
case z:var i=new Uint8Array([154,4,240,121,152,64,66,134,171,146,230,91,224,136,95,149])
this.pssh=function(e,t,r){if(16!==e.byteLength)throw new RangeError("Invalid system id")
var n,i,a
if(t){n=1,i=new Uint8Array(16*t.length)
for(var o=0;o<t.length;o++){var s=t[o]
if(16!==s.byteLength)throw new RangeError("Invalid key")
i.set(s,16*o)}}else n=0,i=new Uint8Array
n>0?(a=new Uint8Array(4),t.length>0&&new DataView(a.buffer).setUint32(0,t.length,!1)):a=new Uint8Array
var u=new Uint8Array(4)
return r&&r.byteLength>0&&new DataView(u.buffer).setUint32(0,r.byteLength,!1),function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]
for(var i=r.length,a=8,o=i;o--;)a+=r[o].byteLength
var s=new Uint8Array(a)
for(s[0]=a>>24&255,s[1]=a>>16&255,s[2]=a>>8&255,s[3]=255&a,s.set(e,4),o=0,a=8;o<i;o++)s.set(r[o],a),a+=r[o].byteLength
return s}([112,115,115,104],new Uint8Array([n,0,0,0]),e,a,i,u,r||new Uint8Array)}(i,null,n)
var a=new Uint16Array(n.buffer,n.byteOffset,n.byteLength/2),o=String.fromCharCode.apply(null,Array.from(a)),s=o.substring(o.indexOf("<"),o.length),u=(new DOMParser).parseFromString(s,"text/xml").getElementsByTagName("KID")[0]
if(u){var l=u.childNodes[0]?u.childNodes[0].nodeValue:u.getAttribute("VALUE")
if(l){var c=q(l).subarray(0,16);(function(e){var t=function(e,t,r){var n=e[t]
e[t]=e[r],e[r]=n}
t(e,0,3),t(e,1,2),t(e,4,5),t(e,6,7)})(c),this.keyId=c}}break
default:var d=n.subarray(0,16)
if(16!==d.length){var h=new Uint8Array(16)
h.set(d,16-d.length),d=h}this.keyId=d}if(!this.keyId||16!==this.keyId.byteLength){var f=Oe[this.uri]
if(!f){var p=Object.keys(Oe).length%Number.MAX_SAFE_INTEGER
f=new Uint8Array(16),new DataView(f.buffer,12,4).setUint32(0,p),Oe[this.uri]=f}this.keyId=f}return this},e}(),Pe=/\{\$([a-zA-Z0-9-_]+)\}/g
function Ne(e){return Pe.test(e)}function Me(e,t,r){if(null!==e.variableList||e.hasVariableRefs)for(var n=r.length;n--;){var i=r[n],a=t[i]
a&&(t[i]=Be(e,a))}}function Be(e,t){if(null!==e.variableList||e.hasVariableRefs){var r=e.variableList
return t.replace(Pe,(function(t){var n=t.substring(2,t.length-1),i=null==r?void 0:r[n]
return void 0===i?(e.playlistParsingError||(e.playlistParsingError=new Error('Missing preceding EXT-X-DEFINE tag for Variable Reference: "'+n+'"')),t):i}))}return t}function Ue(e,t,r){var n,i,a=e.variableList
if(a||(e.variableList=a={}),"QUERYPARAM"in t){n=t.QUERYPARAM
try{var o=new self.URL(r).searchParams
if(!o.has(n))throw new Error('"'+n+'" does not match any query parameter in URI: "'+r+'"')
i=o.get(n)}catch(t){e.playlistParsingError||(e.playlistParsingError=new Error("EXT-X-DEFINE QUERYPARAM: "+t.message))}}else n=t.NAME,i=t.VALUE
n in a?e.playlistParsingError||(e.playlistParsingError=new Error('EXT-X-DEFINE duplicate Variable Name declarations: "'+n+'"')):a[n]=i||""}function qe(e,t,r){var n=t.IMPORT
if(r&&n in r){var i=e.variableList
i||(e.variableList=i={}),i[n]=r[n]}else e.playlistParsingError||(e.playlistParsingError=new Error('EXT-X-DEFINE IMPORT attribute not found in Multivariant Playlist: "'+n+'"'))}function je(){if("undefined"!=typeof self)return self.MediaSource||self.WebKitMediaSource}var Ge={audio:{a3ds:!0,"ac-3":!0,"ac-4":!0,alac:!0,alaw:!0,dra1:!0,"dts+":!0,"dts-":!0,dtsc:!0,dtse:!0,dtsh:!0,"ec-3":!0,enca:!0,g719:!0,g726:!0,m4ae:!0,mha1:!0,mha2:!0,mhm1:!0,mhm2:!0,mlpa:!0,mp4a:!0,"raw ":!0,Opus:!0,opus:!0,samr:!0,sawb:!0,sawp:!0,sevc:!0,sqcp:!0,ssmv:!0,twos:!0,ulaw:!0},video:{avc1:!0,avc2:!0,avc3:!0,avc4:!0,avcp:!0,av01:!0,drac:!0,dva1:!0,dvav:!0,dvh1:!0,dvhe:!0,encv:!0,hev1:!0,hvc1:!0,mjp2:!0,mp4v:!0,mvc1:!0,mvc2:!0,mvc3:!0,mvc4:!0,resv:!0,rv60:!0,s263:!0,svc1:!0,svc2:!0,"vc-1":!0,vp08:!0,vp09:!0},text:{stpp:!0,wvtt:!0}},He=je()
function Ve(e,t){var r
return null!=(r=null==He?void 0:He.isTypeSupported((t||"video")+'/mp4;codecs="'+e+'"'))&&r}var ze=/#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g,Ke=/#EXT-X-MEDIA:(.*)/g,We=/^#EXT(?:INF|-X-TARGETDURATION):/m,$e=new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,/(?!#) *(\S[\S ]*)/.source,/#EXT-X-BYTERANGE:*(.+)/.source,/#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,/#.*/.source].join("|"),"g"),Ye=new RegExp([/#(EXTM3U)/.source,/#EXT-X-(DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source,/#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source,/#EXT-X-(DISCONTINUITY|ENDLIST|GAP)/.source,/(#)([^:]*):(.*)/.source,/(#)(.*)(?:.*)\r?\n?/.source].join("|")),Qe=function(){function e(){}return e.findGroup=function(e,t){for(var r=0;r<e.length;r++){var n=e[r]
if(n.id===t)return n}},e.convertAVC1ToAVCOTI=function(e){var t=e.split(".")
if(t.length>2){var r=t.shift()+"."
return(r+=parseInt(t.shift()).toString(16))+("000"+parseInt(t.shift()).toString(16)).slice(-4)}return e},e.resolve=function(e,t){return v.buildAbsoluteURL(t,e,{alwaysNormalize:!0})},e.isMediaPlaylist=function(e){return We.test(e)},e.parseMasterPlaylist=function(t,r){var n,i={contentSteering:null,levels:[],playlistParsingError:null,sessionData:null,sessionKeys:null,startTimeOffset:null,variableList:null,hasVariableRefs:Ne(t)},a=[]
for(ze.lastIndex=0;null!=(n=ze.exec(t));)if(n[1]){var o,s=new C(n[1])
Me(i,s,["CODECS","SUPPLEMENTAL-CODECS","ALLOWED-CPC","PATHWAY-ID","STABLE-VARIANT-ID","AUDIO","VIDEO","SUBTITLES","CLOSED-CAPTIONS","NAME"])
var u=Be(i,n[2]),l={attrs:s,bitrate:s.decimalInteger("AVERAGE-BANDWIDTH")||s.decimalInteger("BANDWIDTH"),name:s.NAME,url:e.resolve(u,r)},c=s.decimalResolution("RESOLUTION")
c&&(l.width=c.width,l.height=c.height),Je((s.CODECS||"").split(/[ ,]+/).filter((function(e){return e})),l),l.videoCodec&&-1!==l.videoCodec.indexOf("avc1")&&(l.videoCodec=e.convertAVC1ToAVCOTI(l.videoCodec)),null!=(o=l.unknownCodecs)&&o.length||a.push(l),i.levels.push(l)}else if(n[3]){var d=n[3],h=n[4]
switch(d){case"SESSION-DATA":var f=new C(h)
Me(i,f,["DATA-ID","LANGUAGE","VALUE","URI"])
var p=f["DATA-ID"]
p&&(null===i.sessionData&&(i.sessionData={}),i.sessionData[p]=f)
break
case"SESSION-KEY":var g=Xe(h,r,i)
g.encrypted&&g.isSupported()?(null===i.sessionKeys&&(i.sessionKeys=[]),i.sessionKeys.push(g)):k.warn('[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "'+h+'"')
break
case"DEFINE":var m=new C(h)
Me(i,m,["NAME","VALUE","QUERYPARAM"]),Ue(i,m,r)
break
case"CONTENT-STEERING":var v=new C(h)
Me(i,v,["SERVER-URI","PATHWAY-ID"]),i.contentSteering={uri:e.resolve(v["SERVER-URI"],r),pathwayId:v["PATHWAY-ID"]||"."}
break
case"START":i.startTimeOffset=Ze(h)}}var y=a.length>0&&a.length<i.levels.length
return i.levels=y?a:i.levels,0===i.levels.length&&(i.playlistParsingError=new Error("no levels found in manifest")),i},e.parseMasterPlaylistMedia=function(t,r,n){var i,a={},o=n.levels,s={AUDIO:o.map((function(e){return{id:e.attrs.AUDIO,audioCodec:e.audioCodec}})),SUBTITLES:o.map((function(e){return{id:e.attrs.SUBTITLES,textCodec:e.textCodec}})),"CLOSED-CAPTIONS":[]},u=0
for(Ke.lastIndex=0;null!==(i=Ke.exec(t));){var l=new C(i[1]),c=l.TYPE
if(c){var d=s[c],h=a[c]||[]
a[c]=h,Me(n,l,["URI","GROUP-ID","LANGUAGE","ASSOC-LANGUAGE","STABLE-RENDITION-ID","NAME","INSTREAM-ID","CHARACTERISTICS","CHANNELS"])
var f={attrs:l,bitrate:0,id:u++,groupId:l["GROUP-ID"]||"",instreamId:l["INSTREAM-ID"],name:l.NAME||l.LANGUAGE||"",type:c,default:l.bool("DEFAULT"),autoselect:l.bool("AUTOSELECT"),forced:l.bool("FORCED"),lang:l.LANGUAGE,url:l.URI?e.resolve(l.URI,r):""}
if(null!=d&&d.length){var p=e.findGroup(d,f.groupId)||d[0]
et(f,p,"audioCodec"),et(f,p,"textCodec")}h.push(f)}}return a},e.parseLevelPlaylist=function(e,t,r,n,i,a){var o,u,l,c=new U(t),d=c.fragments,h=null,f=0,p=0,g=0,m=0,v=null,b=new M(n,t),E=-1,w=!1
for($e.lastIndex=0,c.m3u8=e,c.hasVariableRefs=Ne(e);null!==(o=$e.exec(e));){w&&(w=!1,(b=new M(n,t)).start=g,b.sn=f,b.cc=m,b.level=r,h&&(b.initSegment=h,b.rawProgramDateTime=h.rawProgramDateTime,h.rawProgramDateTime=null))
var _=o[1]
if(_){b.duration=parseFloat(_)
var T=(" "+o[2]).slice(1)
b.title=T||null,b.tagList.push(T?["INF",_,T]:["INF",_])}else if(o[3]){if(y(b.duration)){b.start=g,l&&nt(b,l,c),b.sn=f,b.level=r,b.cc=m,b.urlId=i,d.push(b)
var A=(" "+o[3]).slice(1)
b.relurl=Be(c,A),tt(b,v),v=b,g+=b.duration,f++,p=0,w=!0}}else if(o[4]){var D=(" "+o[4]).slice(1)
v?b.setByteRange(D,v):b.setByteRange(D)}else if(o[5])b.rawProgramDateTime=(" "+o[5]).slice(1),b.tagList.push(["PROGRAM-DATE-TIME",b.rawProgramDateTime]),-1===E&&(E=d.length)
else{if(!(o=o[0].match(Ye))){k.warn("No matches on slow regex match for level playlist!")
continue}for(u=1;u<o.length&&void 0===o[u];u++);var S=(" "+o[u]).slice(1),x=(" "+o[u+1]).slice(1),L=o[u+2]?(" "+o[u+2]).slice(1):""
switch(S){case"PLAYLIST-TYPE":c.type=x.toUpperCase()
break
case"MEDIA-SEQUENCE":f=c.startSN=parseInt(x)
break
case"SKIP":var I=new C(x)
Me(c,I,["RECENTLY-REMOVED-DATERANGES"])
var O=I.decimalInteger("SKIPPED-SEGMENTS")
if(y(O)){c.skippedSegments=O
for(var F=O;F--;)d.unshift(null)
f+=O}var P=I.enumeratedString("RECENTLY-REMOVED-DATERANGES")
P&&(c.recentlyRemovedDateranges=P.split("\t"))
break
case"TARGETDURATION":c.targetduration=Math.max(parseInt(x),1)
break
case"VERSION":c.version=parseInt(x)
break
case"EXTM3U":break
case"ENDLIST":c.live=!1
break
case"#":(x||L)&&b.tagList.push(L?[x,L]:[x])
break
case"DISCONTINUITY":m++,b.tagList.push(["DIS"])
break
case"GAP":b.gap=!0,b.tagList.push([S])
break
case"BITRATE":b.tagList.push([S,x])
break
case"DATERANGE":var N=new C(x)
Me(c,N,["ID","CLASS","START-DATE","END-DATE","SCTE35-CMD","SCTE35-OUT","SCTE35-IN"]),Me(c,N,N.clientAttrs)
var q=new R(N,c.dateRanges[N.ID])
q.isValid||c.skippedSegments?c.dateRanges[q.id]=q:k.warn('Ignoring invalid DATERANGE tag: "'+x+'"'),b.tagList.push(["EXT-X-DATERANGE",x])
break
case"DEFINE":var j=new C(x)
Me(c,j,["NAME","VALUE","IMPORT","QUERYPARAM"]),"IMPORT"in j?qe(c,j,a):Ue(c,j,t)
break
case"DISCONTINUITY-SEQUENCE":m=parseInt(x)
break
case"KEY":var G=Xe(x,t,c)
if(G.isSupported()){if("NONE"===G.method){l=void 0
break}l||(l={}),l[G.keyFormat]&&(l=s({},l)),l[G.keyFormat]=G}else k.warn('[Keys] Ignoring invalid EXT-X-KEY tag: "'+x+'"')
break
case"START":c.startTimeOffset=Ze(x)
break
case"MAP":var H=new C(x)
if(Me(c,H,["BYTERANGE","URI"]),b.duration){var V=new M(n,t)
rt(V,H,r,l),h=V,b.initSegment=h,h.rawProgramDateTime&&!b.rawProgramDateTime&&(b.rawProgramDateTime=h.rawProgramDateTime)}else rt(b,H,r,l),h=b,w=!0
break
case"SERVER-CONTROL":var z=new C(x)
c.canBlockReload=z.bool("CAN-BLOCK-RELOAD"),c.canSkipUntil=z.optionalFloat("CAN-SKIP-UNTIL",0),c.canSkipDateRanges=c.canSkipUntil>0&&z.bool("CAN-SKIP-DATERANGES"),c.partHoldBack=z.optionalFloat("PART-HOLD-BACK",0),c.holdBack=z.optionalFloat("HOLD-BACK",0)
break
case"PART-INF":var K=new C(x)
c.partTarget=K.decimalFloatingPoint("PART-TARGET")
break
case"PART":var W=c.partList
W||(W=c.partList=[])
var $=p>0?W[W.length-1]:void 0,Y=p++,Q=new C(x)
Me(c,Q,["BYTERANGE","URI"])
var X=new B(Q,b,t,Y,$)
W.push(X),b.duration+=X.duration
break
case"PRELOAD-HINT":var Z=new C(x)
Me(c,Z,["URI"]),c.preloadHint=Z
break
case"RENDITION-REPORT":var J=new C(x)
Me(c,J,["URI"]),c.renditionReports=c.renditionReports||[],c.renditionReports.push(J)
break
default:k.warn("line parsed but not handled: "+o)}}}v&&!v.relurl?(d.pop(),g-=v.duration,c.partList&&(c.fragmentHint=v)):c.partList&&(tt(b,v),b.cc=m,c.fragmentHint=b,l&&nt(b,l,c))
var ee=d.length,te=d[0],re=d[ee-1]
if((g+=c.skippedSegments*c.targetduration)>0&&ee&&re){c.averagetargetduration=g/ee
var ne=re.sn
c.endSN="initSegment"!==ne?ne:0,c.live||(re.endList=!0),te&&(c.startCC=te.cc)}else c.endSN=0,c.startCC=0
return c.fragmentHint&&(g+=c.fragmentHint.duration),c.totalduration=g,c.endCC=m,E>0&&function(e,t){for(var r=e[t],n=t;n--;){var i=e[n]
if(!i)return
i.programDateTime=r.programDateTime-1e3*i.duration,r=i}}(d,E),c},e}()
function Xe(e,t,r){var n,i,a=new C(e)
Me(r,a,["KEYFORMAT","KEYFORMATVERSIONS","URI","IV","URI"])
var o=null!=(n=a.METHOD)?n:"",s=a.URI,u=a.hexadecimalInteger("IV"),l=a.KEYFORMATVERSIONS,c=null!=(i=a.KEYFORMAT)?i:"identity"
s&&a.IV&&!u&&k.error("Invalid IV: "+a.IV)
var d=s?Qe.resolve(s,t):"",h=(l||"1").split("/").map(Number).filter(Number.isFinite)
return new Fe(o,d,c,h,u)}function Ze(e){var t=new C(e).decimalFloatingPoint("TIME-OFFSET")
return y(t)?t:null}function Je(e,t){["video","audio","text"].forEach((function(r){var n=e.filter((function(e){return function(e,t){var r=Ge[t]
return!!r&&!0===r[e.slice(0,4)]}(e,r)}))
if(n.length){var i=n.filter((function(e){return 0===e.lastIndexOf("avc1",0)||0===e.lastIndexOf("mp4a",0)}))
t[r+"Codec"]=i.length>0?i[0]:n[0],e=e.filter((function(e){return-1===n.indexOf(e)}))}})),t.unknownCodecs=e}function et(e,t,r){var n=t[r]
n&&(e[r]=n)}function tt(e,t){e.rawProgramDateTime?e.programDateTime=Date.parse(e.rawProgramDateTime):null!=t&&t.programDateTime&&(e.programDateTime=t.endProgramDateTime),y(e.programDateTime)||(e.programDateTime=null,e.rawProgramDateTime=null)}function rt(e,t,r,n){e.relurl=t.URI,t.BYTERANGE&&e.setByteRange(t.BYTERANGE),e.level=r,e.sn="initSegment",n&&(e.levelkeys=n),e.initSegment=null}function nt(e,t,r){e.levelkeys=t
var n=r.encryptedFragments
n.length&&n[n.length-1].levelkeys===t||!Object.keys(t).some((function(e){return t[e].isCommonEncryption}))||n.push(e)}var it="manifest",at="level",ot="audioTrack",st="subtitleTrack",ut="main",lt="audio",ct="subtitle"
function dt(e){switch(e.type){case ot:return lt
case st:return ct
default:return ut}}function ht(e,t){var r=e.url
return void 0!==r&&0!==r.indexOf("data:")||(r=t.url),r}var ft=function(){function e(e){this.hls=void 0,this.loaders=Object.create(null),this.variableList=null,this.hls=e,this.registerListeners()}var t=e.prototype
return t.startLoad=function(e){},t.stopLoad=function(){this.destroyInternalLoaders()},t.registerListeners=function(){var e=this.hls
e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.LEVEL_LOADING,this.onLevelLoading,this),e.on(b.AUDIO_TRACK_LOADING,this.onAudioTrackLoading,this),e.on(b.SUBTITLE_TRACK_LOADING,this.onSubtitleTrackLoading,this)},t.unregisterListeners=function(){var e=this.hls
e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.LEVEL_LOADING,this.onLevelLoading,this),e.off(b.AUDIO_TRACK_LOADING,this.onAudioTrackLoading,this),e.off(b.SUBTITLE_TRACK_LOADING,this.onSubtitleTrackLoading,this)},t.createInternalLoader=function(e){var t=this.hls.config,r=t.pLoader,n=t.loader,i=new(r||n)(t)
return this.loaders[e.type]=i,i},t.getInternalLoader=function(e){return this.loaders[e.type]},t.resetInternalLoader=function(e){this.loaders[e]&&delete this.loaders[e]},t.destroyInternalLoaders=function(){for(var e in this.loaders){var t=this.loaders[e]
t&&t.destroy(),this.resetInternalLoader(e)}},t.destroy=function(){this.variableList=null,this.unregisterListeners(),this.destroyInternalLoaders()},t.onManifestLoading=function(e,t){var r=t.url
this.variableList=null,this.load({id:null,level:0,responseType:"text",type:it,url:r,deliveryDirectives:null})},t.onLevelLoading=function(e,t){var r=t.id,n=t.level,i=t.url,a=t.deliveryDirectives
this.load({id:r,level:n,responseType:"text",type:at,url:i,deliveryDirectives:a})},t.onAudioTrackLoading=function(e,t){var r=t.id,n=t.groupId,i=t.url,a=t.deliveryDirectives
this.load({id:r,groupId:n,level:null,responseType:"text",type:ot,url:i,deliveryDirectives:a})},t.onSubtitleTrackLoading=function(e,t){var r=t.id,n=t.groupId,i=t.url,a=t.deliveryDirectives
this.load({id:r,groupId:n,level:null,responseType:"text",type:st,url:i,deliveryDirectives:a})},t.load=function(e){var t,r,n,i=this,a=this.hls.config,o=this.getInternalLoader(e)
if(o){var u=o.context
if(u&&u.url===e.url)return void k.trace("[playlist-loader]: playlist request ongoing")
k.log("[playlist-loader]: aborting previous loader for type: "+e.type),o.abort()}if(r=e.type===it?a.manifestLoadPolicy.default:s({},a.playlistLoadPolicy.default,{timeoutRetry:null,errorRetry:null}),o=this.createInternalLoader(e),null!=(t=e.deliveryDirectives)&&t.part&&(e.type===at&&null!==e.level?n=this.hls.levels[e.level].details:e.type===ot&&null!==e.id?n=this.hls.audioTracks[e.id].details:e.type===st&&null!==e.id&&(n=this.hls.subtitleTracks[e.id].details),n)){var l=n.partTarget,c=n.targetduration
if(l&&c){var d=1e3*Math.max(3*l,.8*c)
r=s({},r,{maxTimeToFirstByteMs:Math.min(d,r.maxTimeToFirstByteMs),maxLoadTimeMs:Math.min(d,r.maxTimeToFirstByteMs)})}}var h=r.errorRetry||r.timeoutRetry||{},f={loadPolicy:r,timeout:r.maxLoadTimeMs,maxRetry:h.maxNumRetry||0,retryDelay:h.retryDelayMs||0,maxRetryDelay:h.maxRetryDelayMs||0},p={onSuccess:function(e,t,r,n){var a=i.getInternalLoader(r)
i.resetInternalLoader(r.type)
var o=e.data
0===o.indexOf("#EXTM3U")?(t.parsing.start=performance.now(),Qe.isMediaPlaylist(o)?i.handleTrackOrLevelPlaylist(e,t,r,n||null,a):i.handleMasterPlaylist(e,t,r,n)):i.handleManifestParsingError(e,r,new Error("no EXTM3U delimiter"),n||null,t)},onError:function(e,t,r,n){i.handleNetworkError(t,r,!1,e,n)},onTimeout:function(e,t,r){i.handleNetworkError(t,r,!0,void 0,e)}}
o.load(e,f,p)},t.handleMasterPlaylist=function(e,t,r,n){var i=this.hls,a=e.data,o=ht(e,r),s=Qe.parseMasterPlaylist(a,o)
if(s.playlistParsingError)this.handleManifestParsingError(e,r,s.playlistParsingError,n,t)
else{var u=s.contentSteering,l=s.levels,c=s.sessionData,d=s.sessionKeys,h=s.startTimeOffset,f=s.variableList
this.variableList=f
var p=Qe.parseMasterPlaylistMedia(a,o,s),g=p.AUDIO,m=void 0===g?[]:g,v=p.SUBTITLES,y=p["CLOSED-CAPTIONS"]
m.length&&(m.some((function(e){return!e.url}))||!l[0].audioCodec||l[0].attrs.AUDIO||(k.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"),m.unshift({type:"main",name:"main",groupId:"main",default:!1,autoselect:!1,forced:!1,id:-1,attrs:new C({}),bitrate:0,url:""}))),i.trigger(b.MANIFEST_LOADED,{levels:l,audioTracks:m,subtitles:v,captions:y,contentSteering:u,url:o,stats:t,networkDetails:n,sessionData:c,sessionKeys:d,startTimeOffset:h,variableList:f})}},t.handleTrackOrLevelPlaylist=function(e,t,r,n,i){var a=this.hls,o=r.id,s=r.level,u=r.type,l=ht(e,r),c=y(o)?o:0,d=y(s)?s:c,h=dt(r),f=Qe.parseLevelPlaylist(e.data,l,d,h,c,this.variableList)
if(u===it){var p={attrs:new C({}),bitrate:0,details:f,name:"",url:l}
a.trigger(b.MANIFEST_LOADED,{levels:[p],audioTracks:[],url:l,stats:t,networkDetails:n,sessionData:null,sessionKeys:null,contentSteering:null,startTimeOffset:null,variableList:null})}t.parsing.end=performance.now(),r.levelDetails=f,this.handlePlaylistLoaded(f,e,t,r,n,i)},t.handleManifestParsingError=function(e,t,r,n,i){this.hls.trigger(b.ERROR,{type:E.NETWORK_ERROR,details:w.MANIFEST_PARSING_ERROR,fatal:t.type===it,url:e.url,err:r,error:r,reason:r.message,response:e,context:t,networkDetails:n,stats:i})},t.handleNetworkError=function(e,t,r,i,a){void 0===r&&(r=!1)
var o="A network "+(r?"timeout":"error"+(i?" (status "+i.code+")":""))+" occurred while loading "+e.type
e.type===at?o+=": "+e.level+" id: "+e.id:e.type!==ot&&e.type!==st||(o+=" id: "+e.id+' group-id: "'+e.groupId+'"')
var s=new Error(o)
k.warn("[playlist-loader]: "+o)
var u=w.UNKNOWN,l=!1,c=this.getInternalLoader(e)
switch(e.type){case it:u=r?w.MANIFEST_LOAD_TIMEOUT:w.MANIFEST_LOAD_ERROR,l=!0
break
case at:u=r?w.LEVEL_LOAD_TIMEOUT:w.LEVEL_LOAD_ERROR,l=!1
break
case ot:u=r?w.AUDIO_TRACK_LOAD_TIMEOUT:w.AUDIO_TRACK_LOAD_ERROR,l=!1
break
case st:u=r?w.SUBTITLE_TRACK_LOAD_TIMEOUT:w.SUBTITLE_LOAD_ERROR,l=!1}c&&this.resetInternalLoader(e.type)
var d={type:E.NETWORK_ERROR,details:u,fatal:l,url:e.url,loader:c,context:e,error:s,networkDetails:t,stats:a}
if(i){var h=(null==t?void 0:t.url)||e.url
d.response=n({url:h,data:void 0},i)}this.hls.trigger(b.ERROR,d)},t.handlePlaylistLoaded=function(e,t,r,n,i,a){var o=this.hls,s=n.type,u=n.level,l=n.id,c=n.groupId,d=n.deliveryDirectives,h=ht(t,n),f=dt(n),p="number"==typeof n.level&&f===ut?u:void 0
if(e.fragments.length){e.targetduration||(e.playlistParsingError=new Error("Missing Target Duration"))
var g=e.playlistParsingError
if(g)o.trigger(b.ERROR,{type:E.NETWORK_ERROR,details:w.LEVEL_PARSING_ERROR,fatal:!1,url:h,error:g,reason:g.message,response:t,context:n,level:p,parent:f,networkDetails:i,stats:r})
else switch(e.live&&a&&(a.getCacheAge&&(e.ageHeader=a.getCacheAge()||0),a.getCacheAge&&!isNaN(e.ageHeader)||(e.ageHeader=0)),s){case it:case at:o.trigger(b.LEVEL_LOADED,{details:e,level:p||0,id:l||0,stats:r,networkDetails:i,deliveryDirectives:d})
break
case ot:o.trigger(b.AUDIO_TRACK_LOADED,{details:e,id:l||0,groupId:c||"",stats:r,networkDetails:i,deliveryDirectives:d})
break
case st:o.trigger(b.SUBTITLE_TRACK_LOADED,{details:e,id:l||0,groupId:c||"",stats:r,networkDetails:i,deliveryDirectives:d})}}else{var m=new Error("No Segments found in Playlist")
o.trigger(b.ERROR,{type:E.NETWORK_ERROR,details:w.LEVEL_EMPTY_ERROR,fatal:!1,url:h,error:m,reason:m.message,response:t,context:n,level:p,parent:f,networkDetails:i,stats:r})}},e}()
function pt(e,t){var r
try{r=new Event("addtrack")}catch(e){(r=document.createEvent("Event")).initEvent("addtrack",!1,!1)}r.track=e,t.dispatchEvent(r)}function gt(e,t){var r=e.mode
if("disabled"===r&&(e.mode="hidden"),e.cues&&!e.cues.getCueById(t.id))try{if(e.addCue(t),!e.cues.getCueById(t.id))throw new Error("addCue is failed for: "+t)}catch(r){k.debug("[texttrack-utils]: "+r)
var n=new self.TextTrackCue(t.startTime,t.endTime,t.text)
n.id=t.id,e.addCue(n)}"disabled"===r&&(e.mode=r)}function mt(e){var t=e.mode
if("disabled"===t&&(e.mode="hidden"),e.cues)for(var r=e.cues.length;r--;)e.removeCue(e.cues[r])
"disabled"===t&&(e.mode=t)}function vt(e,t,r,n){var i=e.mode
if("disabled"===i&&(e.mode="hidden"),e.cues&&e.cues.length>0)for(var a=function(e,t,r){var n=[],i=function(e,t){if(t<e[0].startTime)return 0
var r=e.length-1
if(t>e[r].endTime)return-1
for(var n=0,i=r;n<=i;){var a=Math.floor((i+n)/2)
if(t<e[a].startTime)i=a-1
else{if(!(t>e[a].startTime&&n<r))return a
n=a+1}}return e[n].startTime-t<t-e[i].startTime?n:i}(e,t)
if(i>-1)for(var a=i,o=e.length;a<o;a++){var s=e[a]
if(s.startTime>=t&&s.endTime<=r)n.push(s)
else if(s.startTime>r)return n}return n}(e.cues,t,r),o=0;o<a.length;o++)n&&!n(a[o])||e.removeCue(a[o])
"disabled"===i&&(e.mode=i)}var yt="org.id3",bt="https://aomedia.org/emsg/ID3"
function Et(){if("undefined"!=typeof self)return self.WebKitDataCue||self.VTTCue||self.TextTrackCue}var wt=function(){var e=Et()
try{new e(0,Number.POSITIVE_INFINITY,"")}catch(e){return Number.MAX_VALUE}return Number.POSITIVE_INFINITY}()
function _t(e,t){return e.getTime()/1e3-t}var Tt=function(){function e(e){this.hls=void 0,this.id3Track=null,this.media=null,this.dateRangeCuesAppended={},this.hls=e,this._registerListeners()}var t=e.prototype
return t.destroy=function(){this._unregisterListeners(),this.id3Track=null,this.media=null,this.dateRangeCuesAppended={},this.hls=null},t._registerListeners=function(){var e=this.hls
e.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.FRAG_PARSING_METADATA,this.onFragParsingMetadata,this),e.on(b.BUFFER_FLUSHING,this.onBufferFlushing,this),e.on(b.LEVEL_UPDATED,this.onLevelUpdated,this)},t._unregisterListeners=function(){var e=this.hls
e.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.FRAG_PARSING_METADATA,this.onFragParsingMetadata,this),e.off(b.BUFFER_FLUSHING,this.onBufferFlushing,this),e.off(b.LEVEL_UPDATED,this.onLevelUpdated,this)},t.onMediaAttached=function(e,t){this.media=t.media},t.onMediaDetaching=function(){this.id3Track&&(mt(this.id3Track),this.id3Track=null,this.media=null,this.dateRangeCuesAppended={})},t.onManifestLoading=function(){this.dateRangeCuesAppended={}},t.createTrack=function(e){var t=this.getID3Track(e.textTracks)
return t.mode="hidden",t},t.getID3Track=function(e){if(this.media){for(var t=0;t<e.length;t++){var r=e[t]
if("metadata"===r.kind&&"id3"===r.label)return pt(r,this.media),r}return this.media.addTextTrack("metadata","id3")}},t.onFragParsingMetadata=function(e,t){if(this.media){var r=this.hls.config,n=r.enableEmsgMetadataCues,i=r.enableID3MetadataCues
if(n||i){var a=t.samples
this.id3Track||(this.id3Track=this.createTrack(this.media))
for(var o=Et(),s=0;s<a.length;s++){var u=a[s].type
if((u!==bt||n)&&i){var l=se(a[s].data)
if(l){var c=a[s].pts,d=c+a[s].duration
d>wt&&(d=wt),d-c<=0&&(d=c+.25)
for(var h=0;h<l.length;h++){var f=l[h]
if(!ae(f)){this.updateId3CueEnds(c)
var p=new o(c,d,"")
p.value=f,u&&(p.type=u),this.id3Track.addCue(p)}}}}}}}},t.updateId3CueEnds=function(e){var t,r=null==(t=this.id3Track)?void 0:t.cues
if(r)for(var n=r.length;n--;){var i=r[n]
i.startTime<e&&i.endTime===wt&&(i.endTime=e)}},t.onBufferFlushing=function(e,t){var r=t.startOffset,n=t.endOffset,i=t.type,a=this.id3Track,o=this.hls
if(o){var s=o.config,u=s.enableEmsgMetadataCues,l=s.enableID3MetadataCues
a&&(u||l)&&vt(a,r,n,"audio"===i?function(e){return e.type===yt&&l}:"video"===i?function(e){return e.type===bt&&u}:function(e){return e.type===yt&&l||e.type===bt&&u})}},t.onLevelUpdated=function(e,t){var r=this,n=t.details
if(this.media&&n.hasProgramDateTime&&this.hls.config.enableDateRangeMetadataCues){var i=this.dateRangeCuesAppended,a=this.id3Track,o=n.dateRanges,s=Object.keys(o)
if(a)for(var u=Object.keys(i).filter((function(e){return!s.includes(e)})),l=function(){var e=u[c]
Object.keys(i[e].cues).forEach((function(t){a.removeCue(i[e].cues[t])})),delete i[e]},c=u.length;c--;)l()
var d=n.fragments[n.fragments.length-1]
if(0!==s.length&&y(null==d?void 0:d.programDateTime)){this.id3Track||(this.id3Track=this.createTrack(this.media))
for(var h=d.programDateTime/1e3-d.start,f=Et(),p=function(){var e,t,n=s[g],a=o[n],u=i[n],l=(null==u?void 0:u.cues)||{},c=(null==u?void 0:u.durationKnown)||!1,d=_t(a.startDate,h),p=wt,m=a.endDate
if(m)p=_t(m,h),c=!0
else if(a.endOnNext&&!c){var v=s.reduce((function(e,t){var r=o[t]
return r.class===a.class&&r.id!==t&&r.startDate>a.startDate&&e.push(r),e}),[]).sort((function(e,t){return e.startDate.getTime()-t.startDate.getTime()}))[0]
v&&(p=_t(v.startDate,h),c=!0)}for(var y=Object.keys(a.attr),b=0;b<y.length;b++){var E=y[b]
if("ID"!==(t=E)&&"CLASS"!==t&&"START-DATE"!==t&&"DURATION"!==t&&"END-DATE"!==t&&"END-ON-NEXT"!==t){var w=l[E]
if(w)c&&!u.durationKnown&&(w.endTime=p)
else{var _=a.attr[E]
w=new f(d,p,""),L(E)&&(e=_,_=Uint8Array.from(e.replace(/^0x/,"").replace(/([\da-fA-F]{2}) ?/g,"0x$1 ").replace(/ +$/,"").split(" ")).buffer),w.value={key:E,data:_},w.type="com.apple.quicktime.HLS",w.id=n,r.id3Track.addCue(w),l[E]=w}}}i[n]={cues:l,dateRange:a,durationKnown:c}},g=0;g<s.length;g++)p()}}},e}(),At=function(){function e(e){var t=this
this.hls=void 0,this.config=void 0,this.media=null,this.levelDetails=null,this.currentTime=0,this.stallCount=0,this._latency=null,this.timeupdateHandler=function(){return t.timeupdate()},this.hls=e,this.config=e.config,this.registerListeners()}var t=e.prototype
return t.destroy=function(){this.unregisterListeners(),this.onMediaDetaching(),this.levelDetails=null,this.hls=this.timeupdateHandler=null},t.registerListeners=function(){this.hls.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),this.hls.on(b.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.on(b.LEVEL_UPDATED,this.onLevelUpdated,this),this.hls.on(b.ERROR,this.onError,this)},t.unregisterListeners=function(){this.hls.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),this.hls.off(b.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.off(b.LEVEL_UPDATED,this.onLevelUpdated,this),this.hls.off(b.ERROR,this.onError,this)},t.onMediaAttached=function(e,t){this.media=t.media,this.media.addEventListener("timeupdate",this.timeupdateHandler)},t.onMediaDetaching=function(){this.media&&(this.media.removeEventListener("timeupdate",this.timeupdateHandler),this.media=null)},t.onManifestLoading=function(){this.levelDetails=null,this._latency=null,this.stallCount=0},t.onLevelUpdated=function(e,t){var r=t.details
this.levelDetails=r,r.advanced&&this.timeupdate(),!r.live&&this.media&&this.media.removeEventListener("timeupdate",this.timeupdateHandler)},t.onError=function(e,t){var r
t.details===w.BUFFER_STALLED_ERROR&&(this.stallCount++,null!=(r=this.levelDetails)&&r.live&&k.warn("[playback-rate-controller]: Stall detected, adjusting target latency"))},t.timeupdate=function(){var e=this.media,t=this.levelDetails
if(e&&t){this.currentTime=e.currentTime
var r=this.computeLatency()
if(null!==r){this._latency=r
var n=this.config,i=n.lowLatencyMode,a=n.maxLiveSyncPlaybackRate
if(i&&1!==a){var o=this.targetLatency
if(null!==o){var s=r-o,u=s<Math.min(this.maxLatency,o+t.targetduration)
if(t.live&&u&&s>.05&&this.forwardBufferLength>1){var l=Math.min(2,Math.max(1,a)),c=Math.round(2/(1+Math.exp(-.75*s-this.edgeStalled))*20)/20
e.playbackRate=Math.min(l,Math.max(1,c))}else 1!==e.playbackRate&&0!==e.playbackRate&&(e.playbackRate=1)}}}}},t.estimateLiveEdge=function(){var e=this.levelDetails
return null===e?null:e.edge+e.age},t.computeLatency=function(){var e=this.estimateLiveEdge()
return null===e?null:e-this.currentTime},a(e,[{key:"latency",get:function(){return this._latency||0}},{key:"maxLatency",get:function(){var e=this.config,t=this.levelDetails
return void 0!==e.liveMaxLatencyDuration?e.liveMaxLatencyDuration:t?e.liveMaxLatencyDurationCount*t.targetduration:0}},{key:"targetLatency",get:function(){var e=this.levelDetails
if(null===e)return null
var t=e.holdBack,r=e.partHoldBack,n=e.targetduration,i=this.config,a=i.liveSyncDuration,o=i.liveSyncDurationCount,s=i.lowLatencyMode,u=this.hls.userConfig,l=s&&r||t;(u.liveSyncDuration||u.liveSyncDurationCount||0===l)&&(l=void 0!==a?a:o*n)
var c=n
return l+Math.min(1*this.stallCount,c)}},{key:"liveSyncPosition",get:function(){var e=this.estimateLiveEdge(),t=this.targetLatency,r=this.levelDetails
if(null===e||null===t||null===r)return null
var n=r.edge,i=e-t-this.edgeStalled,a=n-r.totalduration,o=n-(this.config.lowLatencyMode&&r.partTarget||r.targetduration)
return Math.min(Math.max(a,i),o)}},{key:"drift",get:function(){var e=this.levelDetails
return null===e?1:e.drift}},{key:"edgeStalled",get:function(){var e=this.levelDetails
if(null===e)return 0
var t=3*(this.config.lowLatencyMode&&e.partTarget||e.targetduration)
return Math.max(e.age-t,0)}},{key:"forwardBufferLength",get:function(){var e=this.media,t=this.levelDetails
if(!e||!t)return 0
var r=e.buffered.length
return(r?e.buffered.end(r-1):t.edge)-this.currentTime}}]),e}(),Dt=["NONE","TYPE-0","TYPE-1",null],kt=function(){function e(e,t,r){this.msn=void 0,this.part=void 0,this.skip=void 0,this.msn=e,this.part=t,this.skip=r}return e.prototype.addDirectives=function(e){var t=new self.URL(e)
return void 0!==this.msn&&t.searchParams.set("_HLS_msn",this.msn.toString()),void 0!==this.part&&t.searchParams.set("_HLS_part",this.part.toString()),this.skip&&t.searchParams.set("_HLS_skip",this.skip),t.href},e}(),St=function(){function e(e){this._attrs=void 0,this.audioCodec=void 0,this.bitrate=void 0,this.codecSet=void 0,this.height=void 0,this.id=void 0,this.name=void 0,this.videoCodec=void 0,this.width=void 0,this.unknownCodecs=void 0,this.audioGroupIds=void 0,this.details=void 0,this.fragmentError=0,this.loadError=0,this.loaded=void 0,this.realBitrate=0,this.textGroupIds=void 0,this.url=void 0,this._urlId=0,this.url=[e.url],this._attrs=[e.attrs],this.bitrate=e.bitrate,e.details&&(this.details=e.details),this.id=e.id||0,this.name=e.name,this.width=e.width||0,this.height=e.height||0,this.audioCodec=e.audioCodec,this.videoCodec=e.videoCodec,this.unknownCodecs=e.unknownCodecs,this.codecSet=[e.videoCodec,e.audioCodec].filter((function(e){return e})).join(",").replace(/\.[^.,]+/g,"")}return e.prototype.addFallback=function(e){this.url.push(e.url),this._attrs.push(e.attrs)},a(e,[{key:"maxBitrate",get:function(){return Math.max(this.realBitrate,this.bitrate)}},{key:"attrs",get:function(){return this._attrs[this._urlId]}},{key:"pathwayId",get:function(){return this.attrs["PATHWAY-ID"]||"."}},{key:"uri",get:function(){return this.url[this._urlId]||""}},{key:"urlId",get:function(){return this._urlId},set:function(e){var t=e%this.url.length
this._urlId!==t&&(this.fragmentError=0,this.loadError=0,this.details=void 0,this._urlId=t)}},{key:"audioGroupId",get:function(){var e
return null==(e=this.audioGroupIds)?void 0:e[this.urlId]}},{key:"textGroupId",get:function(){var e
return null==(e=this.textGroupIds)?void 0:e[this.urlId]}}]),e}()
function xt(e,t){var r=t.startPTS
if(y(r)){var n,i=0
t.sn>e.sn?(i=r-e.start,n=e):(i=e.start-r,n=t),n.duration!==i&&(n.duration=i)}else t.sn>e.sn?e.cc===t.cc&&e.minEndPTS?t.start=e.start+(e.minEndPTS-e.start):t.start=e.start+e.duration:t.start=Math.max(e.start-t.duration,0)}function Ct(e,t,r,n,i,a){n-r<=0&&(k.warn("Fragment should have a positive duration",t),n=r+t.duration,a=i+t.duration)
var o=r,s=n,u=t.startPTS,l=t.endPTS
if(y(u)){var c=Math.abs(u-r)
y(t.deltaPTS)?t.deltaPTS=Math.max(c,t.deltaPTS):t.deltaPTS=c,o=Math.max(r,u),r=Math.min(r,u),i=Math.min(i,t.startDTS),s=Math.min(n,l),n=Math.max(n,l),a=Math.max(a,t.endDTS)}var d=r-t.start
0!==t.start&&(t.start=r),t.duration=n-t.start,t.startPTS=r,t.maxStartPTS=o,t.startDTS=i,t.endPTS=n,t.minEndPTS=s,t.endDTS=a
var h,f=t.sn
if(!e||f<e.startSN||f>e.endSN)return 0
var p=f-e.startSN,g=e.fragments
for(g[p]=t,h=p;h>0;h--)xt(g[h],g[h-1])
for(h=p;h<g.length-1;h++)xt(g[h],g[h+1])
return e.fragmentHint&&xt(g[g.length-1],e.fragmentHint),e.PTSKnown=e.alignedSliding=!0,d}function Lt(e,t){for(var r=null,n=e.fragments,i=n.length-1;i>=0;i--){var a=n[i].initSegment
if(a){r=a
break}}e.fragmentHint&&delete e.fragmentHint.endPTS
var o,u,l,c,d,h=0
if(function(e,t,r){for(var n=t.skippedSegments,i=Math.max(e.startSN,t.startSN)-t.startSN,a=(e.fragmentHint?1:0)+(n?t.endSN:Math.min(e.endSN,t.endSN))-t.startSN,o=t.startSN-e.startSN,s=t.fragmentHint?t.fragments.concat(t.fragmentHint):t.fragments,u=e.fragmentHint?e.fragments.concat(e.fragmentHint):e.fragments,l=i;l<=a;l++){var c=u[o+l],d=s[l]
n&&!d&&l<n&&(d=t.fragments[l]=c),c&&d&&r(c,d)}}(e,t,(function(e,n){e.relurl&&(h=e.cc-n.cc),y(e.startPTS)&&y(e.endPTS)&&(n.start=n.startPTS=e.startPTS,n.startDTS=e.startDTS,n.maxStartPTS=e.maxStartPTS,n.endPTS=e.endPTS,n.endDTS=e.endDTS,n.minEndPTS=e.minEndPTS,n.duration=e.endPTS-e.startPTS,n.duration&&(o=n),t.PTSKnown=t.alignedSliding=!0),n.elementaryStreams=e.elementaryStreams,n.loader=e.loader,n.stats=e.stats,n.urlId=e.urlId,e.initSegment&&(n.initSegment=e.initSegment,r=e.initSegment)})),r&&(t.fragmentHint?t.fragments.concat(t.fragmentHint):t.fragments).forEach((function(e){var t
e.initSegment&&e.initSegment.relurl!==(null==(t=r)?void 0:t.relurl)||(e.initSegment=r)})),t.skippedSegments)if(t.deltaUpdateFailed=t.fragments.some((function(e){return!e})),t.deltaUpdateFailed){k.warn("[level-helper] Previous playlist missing segments skipped in delta playlist")
for(var f=t.skippedSegments;f--;)t.fragments.shift()
t.startSN=t.fragments[0].sn,t.startCC=t.fragments[0].cc}else t.canSkipDateRanges&&(t.dateRanges=(u=e.dateRanges,l=t.dateRanges,c=t.recentlyRemovedDateranges,d=s({},u),c&&c.forEach((function(e){delete d[e]})),Object.keys(l).forEach((function(e){var t=new R(l[e].attr,d[e])
t.isValid?d[e]=t:k.warn('Ignoring invalid Playlist Delta Update DATERANGE tag: "'+JSON.stringify(l[e].attr)+'"')})),d))
var p=t.fragments
if(h){k.warn("discontinuity sliding from playlist, take drift into account")
for(var g=0;g<p.length;g++)p[g].cc+=h}t.skippedSegments&&(t.startCC=t.fragments[0].cc),function(e,t,r){if(e&&t)for(var n=0,i=0,a=e.length;i<=a;i++){var o=e[i],s=t[i+n]
o&&s&&o.index===s.index&&o.fragment.sn===s.fragment.sn?r(o,s):n--}}(e.partList,t.partList,(function(e,t){t.elementaryStreams=e.elementaryStreams,t.stats=e.stats})),o?Ct(t,o,o.startPTS,o.endPTS,o.startDTS,o.endDTS):Rt(e,t),p.length&&(t.totalduration=t.edge-p[0].start),t.driftStartTime=e.driftStartTime,t.driftStart=e.driftStart
var m=t.advancedDateTime
if(t.advanced&&m){var v=t.edge
t.driftStart||(t.driftStartTime=m,t.driftStart=v),t.driftEndTime=m,t.driftEnd=v}else t.driftEndTime=e.driftEndTime,t.driftEnd=e.driftEnd,t.advancedDateTime=e.advancedDateTime}function Rt(e,t){var r=t.startSN+t.skippedSegments-e.startSN,n=e.fragments
r<0||r>=n.length||It(t,n[r].start)}function It(e,t){if(t){for(var r=e.fragments,n=e.skippedSegments;n<r.length;n++)r[n].start+=t
e.fragmentHint&&(e.fragmentHint.start+=t)}}function Ot(e,t,r){var n
return null!=e&&e.details?Ft(null==(n=e.details)?void 0:n.partList,t,r):null}function Ft(e,t,r){if(e)for(var n=e.length;n--;){var i=e[n]
if(i.index===r&&i.fragment.sn===t)return i}return null}function Pt(e){switch(e.details){case w.FRAG_LOAD_TIMEOUT:case w.KEY_LOAD_TIMEOUT:case w.LEVEL_LOAD_TIMEOUT:case w.MANIFEST_LOAD_TIMEOUT:return!0}return!1}function Nt(e,t){var r=Pt(t)
return e.default[(r?"timeout":"error")+"Retry"]}function Mt(e,t){var r="linear"===e.backoff?1:Math.pow(2,t)
return Math.min(r*e.retryDelayMs,e.maxRetryDelayMs)}function Bt(e){return n(n({},e),{errorRetry:null,timeoutRetry:null})}function Ut(e,t,r,n){return!!e&&t<e.maxNumRetry&&(function(e){return 0===e&&!1===navigator.onLine||!!e&&(e<400||e>499)}(n)||!!r)}var qt=function(e,t){for(var r=0,n=e.length-1,i=null,a=null;r<=n;){var o=t(a=e[i=(r+n)/2|0])
if(o>0)r=i+1
else{if(!(o<0))return a
n=i-1}}return null}
function jt(e,t,r,n){void 0===r&&(r=0),void 0===n&&(n=0)
var i=null
if(e?i=t[e.sn-t[0].sn+1]||null:0===r&&0===t[0].start&&(i=t[0]),i&&0===Gt(r,n,i))return i
var a=qt(t,Gt.bind(null,r,n))
return!a||a===e&&i?i:a}function Gt(e,t,r){if(void 0===e&&(e=0),void 0===t&&(t=0),r.start<=e&&r.start+r.duration>e)return 0
var n=Math.min(t,r.duration+(r.deltaPTS?r.deltaPTS:0))
return r.start+r.duration-n<=e?1:r.start-n>e&&r.start?-1:0}function Ht(e,t,r){var n=1e3*Math.min(t,r.duration+(r.deltaPTS?r.deltaPTS:0))
return(r.endProgramDateTime||0)-n>e}var Vt,zt=function(){function e(e){this.hls=void 0,this.playlistError=0,this.penalizedRenditions={},this.log=void 0,this.warn=void 0,this.error=void 0,this.hls=e,this.log=k.log.bind(k,"[info]:"),this.warn=k.warn.bind(k,"[warning]:"),this.error=k.error.bind(k,"[error]:"),this.registerListeners()}var t=e.prototype
return t.registerListeners=function(){var e=this.hls
e.on(b.ERROR,this.onError,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this)},t.unregisterListeners=function(){var e=this.hls
e&&(e.off(b.ERROR,this.onError,this),e.off(b.ERROR,this.onErrorOut,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this))},t.destroy=function(){this.unregisterListeners(),this.hls=null,this.penalizedRenditions={}},t.startLoad=function(e){this.playlistError=0},t.stopLoad=function(){},t.getVariantLevelIndex=function(e){return(null==e?void 0:e.type)===ut?e.level:this.hls.loadLevel},t.onManifestLoading=function(){this.playlistError=0,this.penalizedRenditions={}},t.onError=function(e,t){var r
if(!t.fatal){var n=this.hls,i=t.context
switch(t.details){case w.FRAG_LOAD_ERROR:case w.FRAG_LOAD_TIMEOUT:case w.KEY_LOAD_ERROR:case w.KEY_LOAD_TIMEOUT:return void(t.errorAction=this.getFragRetryOrSwitchAction(t))
case w.FRAG_GAP:case w.FRAG_PARSING_ERROR:case w.FRAG_DECRYPT_ERROR:return t.errorAction=this.getFragRetryOrSwitchAction(t),void(t.errorAction.action=2)
case w.LEVEL_EMPTY_ERROR:case w.LEVEL_PARSING_ERROR:var a,o,s=t.parent===ut?t.level:n.loadLevel
return void(t.details===w.LEVEL_EMPTY_ERROR&&null!=(a=t.context)&&null!=(o=a.levelDetails)&&o.live?t.errorAction=this.getPlaylistRetryOrSwitchAction(t,s):(t.levelRetry=!1,t.errorAction=this.getLevelSwitchAction(t,s)))
case w.LEVEL_LOAD_ERROR:case w.LEVEL_LOAD_TIMEOUT:return void("number"==typeof(null==i?void 0:i.level)&&(t.errorAction=this.getPlaylistRetryOrSwitchAction(t,i.level)))
case w.AUDIO_TRACK_LOAD_ERROR:case w.AUDIO_TRACK_LOAD_TIMEOUT:case w.SUBTITLE_LOAD_ERROR:case w.SUBTITLE_TRACK_LOAD_TIMEOUT:if(i){var u=n.levels[n.loadLevel]
if(u&&(i.type===ot&&i.groupId===u.audioGroupId||i.type===st&&i.groupId===u.textGroupId))return t.errorAction=this.getPlaylistRetryOrSwitchAction(t,n.loadLevel),t.errorAction.action=2,void(t.errorAction.flags=1)}return
case w.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:var l=n.levels[n.loadLevel],c=null==l?void 0:l.attrs["HDCP-LEVEL"]
return void(c&&(t.errorAction={action:2,flags:2,hdcpLevel:c}))
case w.BUFFER_ADD_CODEC_ERROR:case w.REMUX_ALLOC_ERROR:return void(t.errorAction=this.getLevelSwitchAction(t,null!=(r=t.level)?r:n.loadLevel))
case w.INTERNAL_EXCEPTION:case w.BUFFER_APPENDING_ERROR:case w.BUFFER_APPEND_ERROR:case w.BUFFER_FULL_ERROR:case w.LEVEL_SWITCH_ERROR:case w.BUFFER_STALLED_ERROR:case w.BUFFER_SEEK_OVER_HOLE:case w.BUFFER_NUDGE_ON_STALL:return void(t.errorAction={action:0,flags:0})}if(t.type===E.KEY_SYSTEM_ERROR){var d=this.getVariantLevelIndex(t.frag)
return t.levelRetry=!1,void(t.errorAction=this.getLevelSwitchAction(t,d))}}},t.getPlaylistRetryOrSwitchAction=function(e,t){var r,n=Nt(this.hls.config.playlistLoadPolicy,e),i=this.playlistError++,a=null==(r=e.response)?void 0:r.code
if(Ut(n,i,Pt(e),a))return{action:5,flags:0,retryConfig:n,retryCount:i}
var o=this.getLevelSwitchAction(e,t)
return n&&(o.retryConfig=n,o.retryCount=i),o},t.getFragRetryOrSwitchAction=function(e){var t=this.hls,r=this.getVariantLevelIndex(e.frag),n=t.levels[r],i=t.config,a=i.fragLoadPolicy,o=i.keyLoadPolicy,s=Nt(e.details.startsWith("key")?o:a,e),u=t.levels.reduce((function(e,t){return e+t.fragmentError}),0)
if(n){var l
e.details!==w.FRAG_GAP&&n.fragmentError++
var c=null==(l=e.response)?void 0:l.code
if(Ut(s,u,Pt(e),c))return{action:5,flags:0,retryConfig:s,retryCount:u}}var d=this.getLevelSwitchAction(e,r)
return s&&(d.retryConfig=s,d.retryCount=u),d},t.getLevelSwitchAction=function(e,t){var r=this.hls
null==t&&(t=r.loadLevel)
var n=this.hls.levels[t]
if(n&&(n.loadError++,r.autoLevelEnabled)){for(var i,a,o=-1,s=r.levels,u=null==(i=e.frag)?void 0:i.type,l=null!=(a=e.context)?a:{},c=l.type,d=l.groupId,h=s.length;h--;){var f=(h+r.loadLevel)%s.length
if(f!==r.loadLevel&&0===s[f].loadError){var p=s[f]
if(e.details===w.FRAG_GAP&&e.frag){var g=s[f].details
if(g){var m=jt(e.frag,g.fragments,e.frag.start)
if(null!=m&&m.gap)continue}}else{if(c===ot&&d===p.audioGroupId||c===st&&d===p.textGroupId)continue
if(u===lt&&n.audioGroupId===p.audioGroupId||u===ct&&n.textGroupId===p.textGroupId)continue}o=f
break}}if(o>-1&&r.loadLevel!==o)return e.levelRetry=!0,{action:2,flags:0,nextAutoLevel:o}}return{action:2,flags:1}},t.onErrorOut=function(e,t){var r
switch(null==(r=t.errorAction)?void 0:r.action){case 0:break
case 2:this.sendAlternateToPenaltyBox(t),t.errorAction.resolved||t.details===w.FRAG_GAP||(t.fatal=!0)}t.fatal&&this.hls.stopLoad()},t.sendAlternateToPenaltyBox=function(e){var t=this.hls,r=e.errorAction
if(r){var n=r.flags,i=r.hdcpLevel,a=r.nextAutoLevel
switch(n){case 0:this.switchLevel(e,a)
break
case 1:r.resolved||(r.resolved=this.redundantFailover(e))
break
case 2:i&&(t.maxHdcpLevel=Dt[Dt.indexOf(i)-1],r.resolved=!0),this.warn('Restricting playback to HDCP-LEVEL of "'+t.maxHdcpLevel+'" or lower')}r.resolved||this.switchLevel(e,a)}},t.switchLevel=function(e,t){void 0!==t&&e.errorAction&&(this.warn("switching to level "+t+" after "+e.details),this.hls.nextAutoLevel=t,e.errorAction.resolved=!0,this.hls.nextLoadLevel=this.hls.nextAutoLevel)},t.redundantFailover=function(e){var t=this,r=this.hls,n=this.penalizedRenditions,i=e.parent===ut?e.level:r.loadLevel,a=r.levels[i],o=a.url.length,s=e.frag?e.frag.urlId:a.urlId
a.urlId!==s||e.frag&&!a.details||this.penalizeRendition(a,e)
for(var u=function(){var u=(s+l)%o,c=n[u]
if(!c||function(e,t,r){if(performance.now()-e.lastErrorPerfMs>3e5)return!0
var n=e.details
if(t.details===w.FRAG_GAP&&n&&t.frag){var i=t.frag.start,a=jt(null,n.fragments,i)
if(a&&!a.gap)return!0}if(r&&e.errors.length<r.errors.length){var o=e.errors[e.errors.length-1]
if(n&&o.frag&&t.frag&&Math.abs(o.frag.start-t.frag.start)>3*n.targetduration)return!0}return!1}(c,e,n[s]))return t.warn("Switching to Redundant Stream "+(u+1)+"/"+o+': "'+a.url[u]+'" after '+e.details),t.playlistError=0,r.levels.forEach((function(e){e.urlId=u})),r.nextLoadLevel=i,{v:!0}},l=1;l<o;l++){var c=u()
if("object"==typeof c)return c.v}return!1},t.penalizeRendition=function(e,t){var r=this.penalizedRenditions,n=r[e.urlId]||{lastErrorPerfMs:0,errors:[],details:void 0}
n.lastErrorPerfMs=performance.now(),n.errors.push(t),n.details=e.details,r[e.urlId]=n},e}(),Kt=function(){function e(e,t){this.hls=void 0,this.timer=-1,this.requestScheduled=-1,this.canLoad=!1,this.log=void 0,this.warn=void 0,this.log=k.log.bind(k,t+":"),this.warn=k.warn.bind(k,t+":"),this.hls=e}var t=e.prototype
return t.destroy=function(){this.clearTimer(),this.hls=this.log=this.warn=null},t.clearTimer=function(){clearTimeout(this.timer),this.timer=-1},t.startLoad=function(){this.canLoad=!0,this.requestScheduled=-1,this.loadPlaylist()},t.stopLoad=function(){this.canLoad=!1,this.clearTimer()},t.switchParams=function(e,t){var r=null==t?void 0:t.renditionReports
if(r){for(var n=-1,i=0;i<r.length;i++){var a=r[i],o=void 0
try{o=new self.URL(a.URI,t.url).href}catch(e){k.warn("Could not construct new URL for Rendition Report: "+e),o=a.URI||""}if(o===e){n=i
break}o===e.substring(0,o.length)&&(n=i)}if(-1!==n){var s=r[n],u=parseInt(s["LAST-MSN"])||(null==t?void 0:t.lastPartSn),l=parseInt(s["LAST-PART"])||(null==t?void 0:t.lastPartIndex)
if(this.hls.config.lowLatencyMode){var c=Math.min(t.age-t.partTarget,t.targetduration)
l>=0&&c>t.partTarget&&(l+=1)}return new kt(u,l>=0?l:void 0,"")}}},t.loadPlaylist=function(e){-1===this.requestScheduled&&(this.requestScheduled=self.performance.now())},t.shouldLoadPlaylist=function(e){return this.canLoad&&!!e&&!!e.url&&(!e.details||e.details.live)},t.shouldReloadPlaylist=function(e){return-1===this.timer&&-1===this.requestScheduled&&this.shouldLoadPlaylist(e)},t.playlistLoaded=function(e,t,r){var n=this,i=t.details,a=t.stats,o=self.performance.now(),s=a.loading.first?Math.max(0,o-a.loading.first):0
if(i.advancedDateTime=Date.now()-s,i.live||null!=r&&r.live){if(i.reloaded(r),r&&this.log("live playlist "+e+" "+(i.advanced?"REFRESHED "+i.lastPartSn+"-"+i.lastPartIndex:"MISSED")),r&&i.fragments.length>0&&Lt(r,i),!this.canLoad||!i.live)return
var u,l=void 0,c=void 0
if(i.canBlockReload&&i.endSN&&i.advanced){var d=this.hls.config.lowLatencyMode,h=i.lastPartSn,f=i.endSN,p=i.lastPartIndex,g=h===f;-1!==p?(l=g?f+1:h,c=g?d?0:p:p+1):l=f+1
var m=i.age,v=m+i.ageHeader,y=Math.min(v-i.partTarget,1.5*i.targetduration)
if(y>0){if(r&&y>r.tuneInGoal)this.warn("CDN Tune-in goal increased from: "+r.tuneInGoal+" to: "+y+" with playlist age: "+i.age),y=0
else{var b=Math.floor(y/i.targetduration)
l+=b,void 0!==c&&(c+=Math.round(y%i.targetduration/i.partTarget)),this.log("CDN Tune-in age: "+i.ageHeader+"s last advanced "+m.toFixed(2)+"s goal: "+y+" skip sn "+b+" to part "+c)}i.tuneInGoal=y}if(u=this.getDeliveryDirectives(i,t.deliveryDirectives,l,c),d||!g)return void this.loadPlaylist(u)}else i.canBlockReload&&(u=this.getDeliveryDirectives(i,t.deliveryDirectives,l,c))
var E=this.hls.mainForwardBufferInfo,w=E?E.end-E.len:0,_=function(e,t){void 0===t&&(t=1/0)
var r=1e3*e.targetduration
if(e.updated){var n=e.fragments
if(n.length&&4*r>t){var i=1e3*n[n.length-1].duration
i<r&&(r=i)}}else r/=2
return Math.round(r)}(i,1e3*(i.edge-w))
i.updated&&o>this.requestScheduled+_&&(this.requestScheduled=a.loading.start),void 0!==l&&i.canBlockReload?this.requestScheduled=a.loading.first+_-(1e3*i.partTarget||1e3):-1===this.requestScheduled||this.requestScheduled+_<o?this.requestScheduled=o:this.requestScheduled-o<=0&&(this.requestScheduled+=_)
var T=this.requestScheduled-o
T=Math.max(0,T),this.log("reload live playlist "+e+" in "+Math.round(T)+" ms"),this.timer=self.setTimeout((function(){return n.loadPlaylist(u)}),T)}else this.clearTimer()},t.getDeliveryDirectives=function(e,t,r,n){var i=function(e,t){var r=e.canSkipUntil,n=e.canSkipDateRanges,i=e.endSN
return r&&(void 0!==t?t-i:0)<r?n?"v2":"YES":""}(e,r)
return null!=t&&t.skip&&e.deltaUpdateFailed&&(r=t.msn,n=t.part,i=""),new kt(r,n,i)},t.checkRetry=function(e){var t=this,r=e.details,n=Pt(e),i=e.errorAction,a=i||{},o=a.action,s=a.retryCount,u=void 0===s?0:s,l=a.retryConfig,c=!!i&&!!l&&(5===o||!i.resolved&&2===o)
if(c){var d
if(this.requestScheduled=-1,n&&null!=(d=e.context)&&d.deliveryDirectives)this.warn("Retrying playlist loading "+(u+1)+"/"+l.maxNumRetry+' after "'+r+'" without delivery-directives'),this.loadPlaylist()
else{var h=Mt(l,u)
this.timer=self.setTimeout((function(){return t.loadPlaylist()}),h),this.warn("Retrying playlist loading "+(u+1)+"/"+l.maxNumRetry+' after "'+r+'" in '+h+"ms")}e.levelRetry=!0,i.resolved=!0}return c},e}(),Wt=function(e){function t(t,r){var n
return(n=e.call(this,t,"[level-controller]")||this)._levels=[],n._firstLevel=-1,n._startLevel=void 0,n.currentLevel=null,n.currentLevelIndex=-1,n.manualLevelIndex=-1,n.steering=void 0,n.onParsedComplete=void 0,n.steering=r,n._registerListeners(),n}u(t,e)
var r=t.prototype
return r._registerListeners=function(){var e=this.hls
e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.MANIFEST_LOADED,this.onManifestLoaded,this),e.on(b.LEVEL_LOADED,this.onLevelLoaded,this),e.on(b.LEVELS_UPDATED,this.onLevelsUpdated,this),e.on(b.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),e.on(b.FRAG_LOADED,this.onFragLoaded,this),e.on(b.ERROR,this.onError,this)},r._unregisterListeners=function(){var e=this.hls
e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.MANIFEST_LOADED,this.onManifestLoaded,this),e.off(b.LEVEL_LOADED,this.onLevelLoaded,this),e.off(b.LEVELS_UPDATED,this.onLevelsUpdated,this),e.off(b.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),e.off(b.FRAG_LOADED,this.onFragLoaded,this),e.off(b.ERROR,this.onError,this)},r.destroy=function(){this._unregisterListeners(),this.steering=null,this.resetLevels(),e.prototype.destroy.call(this)},r.startLoad=function(){this._levels.forEach((function(e){e.loadError=0,e.fragmentError=0})),e.prototype.startLoad.call(this)},r.resetLevels=function(){this._startLevel=void 0,this.manualLevelIndex=-1,this.currentLevelIndex=-1,this.currentLevel=null,this._levels=[]},r.onManifestLoading=function(e,t){this.resetLevels()},r.onManifestLoaded=function(e,t){var r,n=[],i={}
t.levels.forEach((function(e){var t,a=e.attrs;-1!==(null==(t=e.audioCodec)?void 0:t.indexOf("mp4a.40.34"))&&(Vt||(Vt=/chrome|firefox/i.test(navigator.userAgent)),Vt&&(e.audioCodec=void 0))
var o=a.AUDIO,s=a.CODECS,u=a["FRAME-RATE"],l=a["PATHWAY-ID"],c=a.RESOLUTION,d=a.SUBTITLES,h=(l||".")+"-"+e.bitrate+"-"+c+"-"+u+"-"+s;(r=i[h])?r.addFallback(e):(r=new St(e),i[h]=r,n.push(r)),$t(r,"audio",o),$t(r,"text",d)})),this.filterAndSortMediaOptions(n,t)},r.filterAndSortMediaOptions=function(e,t){var r=this,n=[],i=[],a=!1,o=!1,s=!1,u=e.filter((function(e){var t=e.audioCodec,r=e.videoCodec,n=e.width,i=e.height,u=e.unknownCodecs
return a||(a=!(!n||!i)),o||(o=!!r),s||(s=!!t),!(null!=u&&u.length)&&(!t||Ve(t,"audio"))&&(!r||Ve(r,"video"))}))
if((a||o)&&s&&(u=u.filter((function(e){var t=e.videoCodec,r=e.width,n=e.height
return!!t||!(!r||!n)}))),0!==u.length){t.audioTracks&&Yt(n=t.audioTracks.filter((function(e){return!e.audioCodec||Ve(e.audioCodec,"audio")}))),t.subtitles&&Yt(i=t.subtitles)
var l=u.slice(0)
u.sort((function(e,t){return e.attrs["HDCP-LEVEL"]!==t.attrs["HDCP-LEVEL"]?(e.attrs["HDCP-LEVEL"]||"")>(t.attrs["HDCP-LEVEL"]||"")?1:-1:e.bitrate!==t.bitrate?e.bitrate-t.bitrate:e.attrs["FRAME-RATE"]!==t.attrs["FRAME-RATE"]?e.attrs.decimalFloatingPoint("FRAME-RATE")-t.attrs.decimalFloatingPoint("FRAME-RATE"):e.attrs.SCORE!==t.attrs.SCORE?e.attrs.decimalFloatingPoint("SCORE")-t.attrs.decimalFloatingPoint("SCORE"):a&&e.height!==t.height?e.height-t.height:0}))
var c=l[0]
if(this.steering&&(u=this.steering.filterParsedLevels(u)).length!==l.length)for(var d=0;d<l.length;d++)if(l[d].pathwayId===u[0].pathwayId){c=l[d]
break}this._levels=u
for(var h=0;h<u.length;h++)if(u[h]===c){this._firstLevel=h,this.log("manifest loaded, "+u.length+" level(s) found, first bitrate: "+c.bitrate)
break}var f=s&&!o,p={levels:u,audioTracks:n,subtitleTracks:i,sessionData:t.sessionData,sessionKeys:t.sessionKeys,firstLevel:this._firstLevel,stats:t.stats,audio:s,video:o,altAudio:!f&&n.some((function(e){return!!e.url}))}
this.hls.trigger(b.MANIFEST_PARSED,p),(this.hls.config.autoStartLoad||this.hls.forceStartLoad)&&this.hls.startLoad(this.hls.config.startPosition)}else Promise.resolve().then((function(){if(r.hls){var e=new Error("no level with compatible codecs found in manifest")
r.hls.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.MANIFEST_INCOMPATIBLE_CODECS_ERROR,fatal:!0,url:t.url,error:e,reason:e.message})}}))},r.onError=function(e,t){!t.fatal&&t.context&&t.context.type===at&&t.context.level===this.level&&this.checkRetry(t)},r.onFragLoaded=function(e,t){var r=t.frag
if(void 0!==r&&r.type===ut){var n=this._levels[r.level]
void 0!==n&&(n.loadError=0)}},r.onLevelLoaded=function(e,t){var r,n,i=t.level,a=t.details,o=this._levels[i]
if(!o)return this.warn("Invalid level index "+i),void(null!=(n=t.deliveryDirectives)&&n.skip&&(a.deltaUpdateFailed=!0))
i===this.currentLevelIndex?(0===o.fragmentError&&(o.loadError=0),this.playlistLoaded(i,t,o.details)):null!=(r=t.deliveryDirectives)&&r.skip&&(a.deltaUpdateFailed=!0)},r.onAudioTrackSwitched=function(e,t){var r=this.currentLevel
if(r){var n=this.hls.audioTracks[t.id].groupId
if(r.audioGroupIds&&r.audioGroupId!==n){for(var i=-1,a=0;a<r.audioGroupIds.length;a++)if(r.audioGroupIds[a]===n){i=a
break}-1!==i&&i!==r.urlId&&(r.urlId=i,this.canLoad&&this.startLoad())}}},r.loadPlaylist=function(t){e.prototype.loadPlaylist.call(this)
var r=this.currentLevelIndex,n=this.currentLevel
if(n&&this.shouldLoadPlaylist(n)){var i=n.urlId,a=n.uri
if(t)try{a=t.addDirectives(a)}catch(e){this.warn("Could not construct new URL with HLS Delivery Directives: "+e)}var o=n.attrs["PATHWAY-ID"]
this.log("Loading level index "+r+(void 0!==(null==t?void 0:t.msn)?" at sn "+t.msn+" part "+t.part:"")+" with"+(o?" Pathway "+o:"")+" URI "+(i+1)+"/"+n.url.length+" "+a),this.clearTimer(),this.hls.trigger(b.LEVEL_LOADING,{url:a,level:r,id:i,deliveryDirectives:t||null})}},r.removeLevel=function(e,t){var r=this,n=function(e,r){return r!==t},i=this._levels.filter((function(i,a){return a!==e||(i.url.length>1&&void 0!==t?(i.url=i.url.filter(n),i.audioGroupIds&&(i.audioGroupIds=i.audioGroupIds.filter(n)),i.textGroupIds&&(i.textGroupIds=i.textGroupIds.filter(n)),i.urlId=0,!0):(r.steering&&r.steering.removeLevel(i),!1))}))
this.hls.trigger(b.LEVELS_UPDATED,{levels:i})},r.onLevelsUpdated=function(e,t){var r=t.levels
r.forEach((function(e,t){var r=e.details
null!=r&&r.fragments&&r.fragments.forEach((function(e){e.level=t}))})),this._levels=r},a(t,[{key:"levels",get:function(){return 0===this._levels.length?null:this._levels}},{key:"level",get:function(){return this.currentLevelIndex},set:function(e){var t=this._levels
if(0!==t.length){if(e<0||e>=t.length){var r=new Error("invalid level idx"),n=e<0
if(this.hls.trigger(b.ERROR,{type:E.OTHER_ERROR,details:w.LEVEL_SWITCH_ERROR,level:e,fatal:n,error:r,reason:r.message}),n)return
e=Math.min(e,t.length-1)}var i=this.currentLevelIndex,a=this.currentLevel,o=a?a.attrs["PATHWAY-ID"]:void 0,u=t[e],l=u.attrs["PATHWAY-ID"]
if(this.currentLevelIndex=e,this.currentLevel=u,i!==e||!u.details||!a||o!==l){this.log("Switching to level "+e+(l?" with Pathway "+l:"")+" from level "+i+(o?" with Pathway "+o:""))
var c=s({},u,{level:e,maxBitrate:u.maxBitrate,attrs:u.attrs,uri:u.uri,urlId:u.urlId})
delete c._attrs,delete c._urlId,this.hls.trigger(b.LEVEL_SWITCHING,c)
var d=u.details
if(!d||d.live){var h=this.switchParams(u.uri,null==a?void 0:a.details)
this.loadPlaylist(h)}}}}},{key:"manualLevel",get:function(){return this.manualLevelIndex},set:function(e){this.manualLevelIndex=e,void 0===this._startLevel&&(this._startLevel=e),-1!==e&&(this.level=e)}},{key:"firstLevel",get:function(){return this._firstLevel},set:function(e){this._firstLevel=e}},{key:"startLevel",get:function(){if(void 0===this._startLevel){var e=this.hls.config.startLevel
return void 0!==e?e:this._firstLevel}return this._startLevel},set:function(e){this._startLevel=e}},{key:"nextLoadLevel",get:function(){return-1!==this.manualLevelIndex?this.manualLevelIndex:this.hls.nextAutoLevel},set:function(e){this.level=e,-1===this.manualLevelIndex&&(this.hls.nextAutoLevel=e)}}]),t}(Kt)
function $t(e,t,r){r&&("audio"===t?(e.audioGroupIds||(e.audioGroupIds=[]),e.audioGroupIds[e.url.length-1]=r):"text"===t&&(e.textGroupIds||(e.textGroupIds=[]),e.textGroupIds[e.url.length-1]=r))}function Yt(e){var t={}
e.forEach((function(e){var r=e.groupId||""
e.id=t[r]=t[r]||0,t[r]++}))}var Qt="NOT_LOADED",Xt="APPENDING",Zt="PARTIAL",Jt="OK",er=function(){function e(e){this.activePartLists=Object.create(null),this.endListFragments=Object.create(null),this.fragments=Object.create(null),this.timeRanges=Object.create(null),this.bufferPadding=.2,this.hls=void 0,this.hasGaps=!1,this.hls=e,this._registerListeners()}var t=e.prototype
return t._registerListeners=function(){var e=this.hls
e.on(b.BUFFER_APPENDED,this.onBufferAppended,this),e.on(b.FRAG_BUFFERED,this.onFragBuffered,this),e.on(b.FRAG_LOADED,this.onFragLoaded,this)},t._unregisterListeners=function(){var e=this.hls
e.off(b.BUFFER_APPENDED,this.onBufferAppended,this),e.off(b.FRAG_BUFFERED,this.onFragBuffered,this),e.off(b.FRAG_LOADED,this.onFragLoaded,this)},t.destroy=function(){this._unregisterListeners(),this.fragments=this.activePartLists=this.endListFragments=this.timeRanges=null},t.getAppendedFrag=function(e,t){var r=this.activePartLists[t]
if(r)for(var n=r.length;n--;){var i=r[n]
if(!i)break
var a=i.end
if(i.start<=e&&null!==a&&e<=a)return i}return this.getBufferedFrag(e,t)},t.getBufferedFrag=function(e,t){for(var r=this.fragments,n=Object.keys(r),i=n.length;i--;){var a=r[n[i]]
if((null==a?void 0:a.body.type)===t&&a.buffered){var o=a.body
if(o.start<=e&&e<=o.end)return o}}return null},t.detectEvictedFragments=function(e,t,r,n){var i=this
this.timeRanges&&(this.timeRanges[e]=t)
var a=(null==n?void 0:n.fragment.sn)||-1
Object.keys(this.fragments).forEach((function(n){var o=i.fragments[n]
if(o&&!(a>=o.body.sn))if(o.buffered||o.loaded){var s=o.range[e]
s&&s.time.some((function(e){var r=!i.isTimeBuffered(e.startPTS,e.endPTS,t)
return r&&i.removeFragment(o.body),r}))}else o.body.type===r&&i.removeFragment(o.body)}))},t.detectPartialFragments=function(e){var t=this,r=this.timeRanges,n=e.frag,i=e.part
if(r&&"initSegment"!==n.sn){var a=rr(n),o=this.fragments[a]
if(o){var s=!n.relurl
Object.keys(r).forEach((function(e){var a=n.elementaryStreams[e]
if(a){var u=r[e],l=s||!0===a.partial
o.range[e]=t.getBufferedTimes(n,i,l,u)}})),o.loaded=null,Object.keys(o.range).length?(o.buffered=!0,o.body.endList&&(this.endListFragments[o.body.type]=o),tr(o)||this.removeParts(n.sn-1,n.type)):this.removeFragment(o.body)}}},t.removeParts=function(e,t){var r=this.activePartLists[t]
r&&(this.activePartLists[t]=r.filter((function(t){return t.fragment.sn>=e})))},t.fragBuffered=function(e,t){var r=rr(e),n=this.fragments[r]
!n&&t&&(n=this.fragments[r]={body:e,appendedPTS:null,loaded:null,buffered:!1,range:Object.create(null)},e.gap&&(this.hasGaps=!0)),n&&(n.loaded=null,n.buffered=!0)},t.getBufferedTimes=function(e,t,r,n){for(var i={time:[],partial:r},a=e.start,o=e.end,s=e.minEndPTS||o,u=e.maxStartPTS||a,l=0;l<n.length;l++){var c=n.start(l)-this.bufferPadding,d=n.end(l)+this.bufferPadding
if(u>=c&&s<=d){i.time.push({startPTS:Math.max(a,n.start(l)),endPTS:Math.min(o,n.end(l))})
break}if(a<d&&o>c)i.partial=!0,i.time.push({startPTS:Math.max(a,n.start(l)),endPTS:Math.min(o,n.end(l))})
else if(o<=c)break}return i},t.getPartialFragment=function(e){var t,r,n,i=null,a=0,o=this.bufferPadding,s=this.fragments
return Object.keys(s).forEach((function(u){var l=s[u]
l&&tr(l)&&(r=l.body.start-o,n=l.body.end+o,e>=r&&e<=n&&(t=Math.min(e-r,n-e),a<=t&&(i=l.body,a=t)))})),i},t.isEndListAppended=function(e){var t=this.endListFragments[e]
return void 0!==t&&(t.buffered||tr(t))},t.getState=function(e){var t=rr(e),r=this.fragments[t]
return r?r.buffered?tr(r)?Zt:Jt:Xt:Qt},t.isTimeBuffered=function(e,t,r){for(var n,i,a=0;a<r.length;a++){if(n=r.start(a)-this.bufferPadding,i=r.end(a)+this.bufferPadding,e>=n&&t<=i)return!0
if(t<=n)return!1}return!1},t.onFragLoaded=function(e,t){var r=t.frag,n=t.part
if("initSegment"!==r.sn&&!r.bitrateTest){var i=n?null:t,a=rr(r)
this.fragments[a]={body:r,appendedPTS:null,loaded:i,buffered:!1,range:Object.create(null)}}},t.onBufferAppended=function(e,t){var r=this,n=t.frag,i=t.part,a=t.timeRanges
if("initSegment"!==n.sn){var o=n.type
if(i){var s=this.activePartLists[o]
s||(this.activePartLists[o]=s=[]),s.push(i)}this.timeRanges=a,Object.keys(a).forEach((function(e){var t=a[e]
r.detectEvictedFragments(e,t,o,i)}))}},t.onFragBuffered=function(e,t){this.detectPartialFragments(t)},t.hasFragment=function(e){var t=rr(e)
return!!this.fragments[t]},t.hasParts=function(e){var t
return!(null==(t=this.activePartLists[e])||!t.length)},t.removeFragmentsInRange=function(e,t,r,n,i){var a=this
n&&!this.hasGaps||Object.keys(this.fragments).forEach((function(o){var s=a.fragments[o]
if(s){var u=s.body
u.type!==r||n&&!u.gap||u.start<t&&u.end>e&&(s.buffered||i)&&a.removeFragment(u)}}))},t.removeFragment=function(e){var t=rr(e)
e.stats.loaded=0,e.clearElementaryStreamInfo()
var r=this.activePartLists[e.type]
if(r){var n=e.sn
this.activePartLists[e.type]=r.filter((function(e){return e.fragment.sn!==n}))}delete this.fragments[t],e.endList&&delete this.endListFragments[e.type]},t.removeAllFragments=function(){this.fragments=Object.create(null),this.endListFragments=Object.create(null),this.activePartLists=Object.create(null),this.hasGaps=!1},e}()
function tr(e){var t,r,n
return e.buffered&&(e.body.gap||(null==(t=e.range.video)?void 0:t.partial)||(null==(r=e.range.audio)?void 0:r.partial)||(null==(n=e.range.audiovideo)?void 0:n.partial))}function rr(e){return e.type+"_"+e.level+"_"+e.urlId+"_"+e.sn}var nr=Math.pow(2,17),ir=function(){function e(e){this.config=void 0,this.loader=null,this.partLoadTimeout=-1,this.config=e}var t=e.prototype
return t.destroy=function(){this.loader&&(this.loader.destroy(),this.loader=null)},t.abort=function(){this.loader&&this.loader.abort()},t.load=function(e,t){var r=this,i=e.url
if(!i)return Promise.reject(new sr({type:E.NETWORK_ERROR,details:w.FRAG_LOAD_ERROR,fatal:!1,frag:e,error:new Error("Fragment does not have a "+(i?"part list":"url")),networkDetails:null}))
this.abort()
var a=this.config,o=a.fLoader,s=a.loader
return new Promise((function(u,l){if(r.loader&&r.loader.destroy(),e.gap)l(or(e))
else{var c=r.loader=e.loader=o?new o(a):new s(a),d=ar(e),h=Bt(a.fragLoadPolicy.default),f={loadPolicy:h,timeout:h.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0,highWaterMark:"initSegment"===e.sn?1/0:nr}
e.stats=c.stats,c.load(d,f,{onSuccess:function(t,n,i,a){r.resetLoader(e,c)
var o=t.data
i.resetIV&&e.decryptdata&&(e.decryptdata.iv=new Uint8Array(o.slice(0,16)),o=o.slice(16)),u({frag:e,part:null,payload:o,networkDetails:a})},onError:function(t,a,o,s){r.resetLoader(e,c),l(new sr({type:E.NETWORK_ERROR,details:w.FRAG_LOAD_ERROR,fatal:!1,frag:e,response:n({url:i,data:void 0},t),error:new Error("HTTP Error "+t.code+" "+t.text),networkDetails:o,stats:s}))},onAbort:function(t,n,i){r.resetLoader(e,c),l(new sr({type:E.NETWORK_ERROR,details:w.INTERNAL_ABORTED,fatal:!1,frag:e,error:new Error("Aborted"),networkDetails:i,stats:t}))},onTimeout:function(t,n,i){r.resetLoader(e,c),l(new sr({type:E.NETWORK_ERROR,details:w.FRAG_LOAD_TIMEOUT,fatal:!1,frag:e,error:new Error("Timeout after "+f.timeout+"ms"),networkDetails:i,stats:t}))},onProgress:function(r,n,i,a){t&&t({frag:e,part:null,payload:i,networkDetails:a})}})}}))},t.loadPart=function(e,t,r){var i=this
this.abort()
var a=this.config,o=a.fLoader,s=a.loader
return new Promise((function(u,l){if(i.loader&&i.loader.destroy(),e.gap||t.gap)l(or(e,t))
else{var c=i.loader=e.loader=o?new o(a):new s(a),d=ar(e,t),h=Bt(a.fragLoadPolicy.default),f={loadPolicy:h,timeout:h.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0,highWaterMark:nr}
t.stats=c.stats,c.load(d,f,{onSuccess:function(n,a,o,s){i.resetLoader(e,c),i.updateStatsFromPart(e,t)
var l={frag:e,part:t,payload:n.data,networkDetails:s}
r(l),u(l)},onError:function(r,a,o,s){i.resetLoader(e,c),l(new sr({type:E.NETWORK_ERROR,details:w.FRAG_LOAD_ERROR,fatal:!1,frag:e,part:t,response:n({url:d.url,data:void 0},r),error:new Error("HTTP Error "+r.code+" "+r.text),networkDetails:o,stats:s}))},onAbort:function(r,n,a){e.stats.aborted=t.stats.aborted,i.resetLoader(e,c),l(new sr({type:E.NETWORK_ERROR,details:w.INTERNAL_ABORTED,fatal:!1,frag:e,part:t,error:new Error("Aborted"),networkDetails:a,stats:r}))},onTimeout:function(r,n,a){i.resetLoader(e,c),l(new sr({type:E.NETWORK_ERROR,details:w.FRAG_LOAD_TIMEOUT,fatal:!1,frag:e,part:t,error:new Error("Timeout after "+f.timeout+"ms"),networkDetails:a,stats:r}))}})}}))},t.updateStatsFromPart=function(e,t){var r=e.stats,n=t.stats,i=n.total
if(r.loaded+=n.loaded,i){var a=Math.round(e.duration/t.duration),o=Math.min(Math.round(r.loaded/i),a),s=(a-o)*Math.round(r.loaded/o)
r.total=r.loaded+s}else r.total=Math.max(r.loaded,r.total)
var u=r.loading,l=n.loading
u.start?u.first+=l.first-l.start:(u.start=l.start,u.first=l.first),u.end=l.end},t.resetLoader=function(e,t){e.loader=null,this.loader===t&&(self.clearTimeout(this.partLoadTimeout),this.loader=null),t.destroy()},e}()
function ar(e,t){void 0===t&&(t=null)
var r=t||e,n={frag:e,part:t,responseType:"arraybuffer",url:r.url,headers:{},rangeStart:0,rangeEnd:0},i=r.byteRangeStartOffset,a=r.byteRangeEndOffset
if(y(i)&&y(a)){var o,s=i,u=a
if("initSegment"===e.sn&&"AES-128"===(null==(o=e.decryptdata)?void 0:o.method)){var l=a-i
l%16&&(u=a+(16-l%16)),0!==i&&(n.resetIV=!0,s=i-16)}n.rangeStart=s,n.rangeEnd=u}return n}function or(e,t){var r=new Error("GAP "+(e.gap?"tag":"attribute")+" found"),n={type:E.MEDIA_ERROR,details:w.FRAG_GAP,fatal:!1,frag:e,error:r,networkDetails:null}
return t&&(n.part=t),(t||e).stats.aborted=!0,new sr(n)}var sr=function(e){function t(t){var r
return(r=e.call(this,t.error.message)||this).data=void 0,r.data=t,r}return u(t,e),t}(h(Error)),ur=function(){function e(e){this.config=void 0,this.keyUriToKeyInfo={},this.emeController=null,this.config=e}var t=e.prototype
return t.abort=function(e){for(var t in this.keyUriToKeyInfo){var r=this.keyUriToKeyInfo[t].loader
if(r){if(e&&e!==r.context.frag.type)return
r.abort()}}},t.detach=function(){for(var e in this.keyUriToKeyInfo){var t=this.keyUriToKeyInfo[e];(t.mediaKeySessionContext||t.decryptdata.isCommonEncryption)&&delete this.keyUriToKeyInfo[e]}},t.destroy=function(){for(var e in this.detach(),this.keyUriToKeyInfo){var t=this.keyUriToKeyInfo[e].loader
t&&t.destroy()}this.keyUriToKeyInfo={}},t.createKeyLoadError=function(e,t,r,n,i){return void 0===t&&(t=w.KEY_LOAD_ERROR),new sr({type:E.NETWORK_ERROR,details:t,fatal:!1,frag:e,response:i,error:r,networkDetails:n})},t.loadClear=function(e,t){var r=this
if(this.emeController&&this.config.emeEnabled)for(var n=e.sn,i=e.cc,a=function(){var e=t[o]
if(i<=e.cc&&("initSegment"===n||"initSegment"===e.sn||n<e.sn))return r.emeController.selectKeySystemFormat(e).then((function(t){e.setKeyFormat(t)})),"break"},o=0;o<t.length&&"break"!==a();o++);},t.load=function(e){var t=this
return!e.decryptdata&&e.encrypted&&this.emeController?this.emeController.selectKeySystemFormat(e).then((function(r){return t.loadInternal(e,r)})):this.loadInternal(e)},t.loadInternal=function(e,t){var r,n
t&&e.setKeyFormat(t)
var i=e.decryptdata
if(!i){var a=new Error(t?"Expected frag.decryptdata to be defined after setting format "+t:"Missing decryption data on fragment in onKeyLoading")
return Promise.reject(this.createKeyLoadError(e,w.KEY_LOAD_ERROR,a))}var o=i.uri
if(!o)return Promise.reject(this.createKeyLoadError(e,w.KEY_LOAD_ERROR,new Error('Invalid key URI: "'+o+'"')))
var s,u=this.keyUriToKeyInfo[o]
if(null!=(r=u)&&r.decryptdata.key)return i.key=u.decryptdata.key,Promise.resolve({frag:e,keyInfo:u})
if(null!=(n=u)&&n.keyLoadPromise)switch(null==(s=u.mediaKeySessionContext)?void 0:s.keyStatus){case void 0:case"status-pending":case"usable":case"usable-in-future":return u.keyLoadPromise.then((function(t){return i.key=t.keyInfo.decryptdata.key,{frag:e,keyInfo:u}}))}switch(u=this.keyUriToKeyInfo[o]={decryptdata:i,keyLoadPromise:null,loader:null,mediaKeySessionContext:null},i.method){case"ISO-23001-7":case"SAMPLE-AES":case"SAMPLE-AES-CENC":case"SAMPLE-AES-CTR":return"identity"===i.keyFormat?this.loadKeyHTTP(u,e):this.loadKeyEME(u,e)
case"AES-128":return this.loadKeyHTTP(u,e)
default:return Promise.reject(this.createKeyLoadError(e,w.KEY_LOAD_ERROR,new Error('Key supplied with unsupported METHOD: "'+i.method+'"')))}},t.loadKeyEME=function(e,t){var r={frag:t,keyInfo:e}
if(this.emeController&&this.config.emeEnabled){var n=this.emeController.loadKey(r)
if(n)return(e.keyLoadPromise=n.then((function(t){return e.mediaKeySessionContext=t,r}))).catch((function(t){throw e.keyLoadPromise=null,t}))}return Promise.resolve(r)},t.loadKeyHTTP=function(e,t){var r=this,i=this.config,a=new(0,i.loader)(i)
return t.keyLoader=e.loader=a,e.keyLoadPromise=new Promise((function(o,s){var u={keyInfo:e,frag:t,responseType:"arraybuffer",url:e.decryptdata.uri},l=i.keyLoadPolicy.default,c={loadPolicy:l,timeout:l.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0},d={onSuccess:function(e,t,n,i){var a=n.frag,u=n.keyInfo,l=n.url
if(!a.decryptdata||u!==r.keyUriToKeyInfo[l])return s(r.createKeyLoadError(a,w.KEY_LOAD_ERROR,new Error("after key load, decryptdata unset or changed"),i))
u.decryptdata.key=a.decryptdata.key=new Uint8Array(e.data),a.keyLoader=null,u.loader=null,o({frag:a,keyInfo:u})},onError:function(e,i,a,o){r.resetLoader(i),s(r.createKeyLoadError(t,w.KEY_LOAD_ERROR,new Error("HTTP Error "+e.code+" loading key "+e.text),a,n({url:u.url,data:void 0},e)))},onTimeout:function(e,n,i){r.resetLoader(n),s(r.createKeyLoadError(t,w.KEY_LOAD_TIMEOUT,new Error("key loading timed out"),i))},onAbort:function(e,n,i){r.resetLoader(n),s(r.createKeyLoadError(t,w.INTERNAL_ABORTED,new Error("key loading aborted"),i))}}
a.load(u,c,d)}))},t.resetLoader=function(e){var t=e.frag,r=e.keyInfo,n=e.url,i=r.loader
t.keyLoader===i&&(t.keyLoader=null,r.loader=null),delete this.keyUriToKeyInfo[n],i&&i.destroy()},e}(),lr=function(){function e(){this._boundTick=void 0,this._tickTimer=null,this._tickInterval=null,this._tickCallCount=0,this._boundTick=this.tick.bind(this)}var t=e.prototype
return t.destroy=function(){this.onHandlerDestroying(),this.onHandlerDestroyed()},t.onHandlerDestroying=function(){this.clearNextTick(),this.clearInterval()},t.onHandlerDestroyed=function(){},t.hasInterval=function(){return!!this._tickInterval},t.hasNextTick=function(){return!!this._tickTimer},t.setInterval=function(e){return!this._tickInterval&&(this._tickCallCount=0,this._tickInterval=self.setInterval(this._boundTick,e),!0)},t.clearInterval=function(){return!!this._tickInterval&&(self.clearInterval(this._tickInterval),this._tickInterval=null,!0)},t.clearNextTick=function(){return!!this._tickTimer&&(self.clearTimeout(this._tickTimer),this._tickTimer=null,!0)},t.tick=function(){this._tickCallCount++,1===this._tickCallCount&&(this.doTick(),this._tickCallCount>1&&this.tickImmediate(),this._tickCallCount=0)},t.tickImmediate=function(){this.clearNextTick(),this._tickTimer=self.setTimeout(this._boundTick,0)},t.doTick=function(){},e}(),cr={length:0,start:function(){return 0},end:function(){return 0}},dr=function(){function e(){}return e.isBuffered=function(t,r){try{if(t)for(var n=e.getBuffered(t),i=0;i<n.length;i++)if(r>=n.start(i)&&r<=n.end(i))return!0}catch(e){}return!1},e.bufferInfo=function(t,r,n){try{if(t){var i,a=e.getBuffered(t),o=[]
for(i=0;i<a.length;i++)o.push({start:a.start(i),end:a.end(i)})
return this.bufferedInfo(o,r,n)}}catch(e){}return{len:0,start:r,end:r,nextStart:void 0}},e.bufferedInfo=function(e,t,r){t=Math.max(0,t),e.sort((function(e,t){return e.start-t.start||t.end-e.end}))
var n=[]
if(r)for(var i=0;i<e.length;i++){var a=n.length
if(a){var o=n[a-1].end
e[i].start-o<r?e[i].end>o&&(n[a-1].end=e[i].end):n.push(e[i])}else n.push(e[i])}else n=e
for(var s,u=0,l=t,c=t,d=0;d<n.length;d++){var h=n[d].start,f=n[d].end
if(t+r>=h&&t<f)l=h,u=(c=f)-t
else if(t+r<h){s=h
break}}return{len:u,start:l||0,end:c||0,nextStart:s}},e.getBuffered=function(e){try{return e.buffered}catch(e){return k.log("failed to get media.buffered",e),cr}},e}(),hr=function(e,t,r,n,i,a){void 0===n&&(n=0),void 0===i&&(i=-1),void 0===a&&(a=!1),this.level=void 0,this.sn=void 0,this.part=void 0,this.id=void 0,this.size=void 0,this.partial=void 0,this.transmuxing={start:0,executeStart:0,executeEnd:0,end:0},this.buffering={audio:{start:0,executeStart:0,executeEnd:0,end:0},video:{start:0,executeStart:0,executeEnd:0,end:0},audiovideo:{start:0,executeStart:0,executeEnd:0,end:0}},this.level=e,this.sn=t,this.id=r,this.size=n,this.part=i,this.partial=a}
function fr(e,t){for(var r=null,n=0,i=e.length;n<i;n++){var a=e[n]
if(a&&a.cc===t){r=a
break}}return r}function pr(e,t){if(e){var r=e.start+t
e.start=e.startPTS=r,e.endPTS=r+e.duration}}function gr(e,t){for(var r=t.fragments,n=0,i=r.length;n<i;n++)pr(r[n],e)
t.fragmentHint&&pr(t.fragmentHint,e),t.alignedSliding=!0}function mr(e,t){if(e.hasProgramDateTime&&t.hasProgramDateTime){var r=e.fragments,n=t.fragments
if(r.length&&n.length){var i=n[Math.round(n.length/2)-1],a=fr(r,i.cc)||r[Math.round(r.length/2)-1],o=i.programDateTime,s=a.programDateTime
null!==o&&null!==s&&gr((s-o)/1e3-(a.start-i.start),e)}}}var vr=function(){function e(e,t){this.subtle=void 0,this.aesIV=void 0,this.subtle=e,this.aesIV=t}return e.prototype.decrypt=function(e,t){return this.subtle.decrypt({name:"AES-CBC",iv:this.aesIV},t,e)},e}(),yr=function(){function e(e,t){this.subtle=void 0,this.key=void 0,this.subtle=e,this.key=t}return e.prototype.expandKey=function(){return this.subtle.importKey("raw",this.key,{name:"AES-CBC"},!1,["encrypt","decrypt"])},e}(),br=function(){function e(){this.rcon=[0,1,2,4,8,16,32,64,128,27,54],this.subMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.invSubMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.sBox=new Uint32Array(256),this.invSBox=new Uint32Array(256),this.key=new Uint32Array(0),this.ksRows=0,this.keySize=0,this.keySchedule=void 0,this.invKeySchedule=void 0,this.initTable()}var t=e.prototype
return t.uint8ArrayToUint32Array_=function(e){for(var t=new DataView(e),r=new Uint32Array(4),n=0;n<4;n++)r[n]=t.getUint32(4*n)
return r},t.initTable=function(){var e=this.sBox,t=this.invSBox,r=this.subMix,n=r[0],i=r[1],a=r[2],o=r[3],s=this.invSubMix,u=s[0],l=s[1],c=s[2],d=s[3],h=new Uint32Array(256),f=0,p=0,g=0
for(g=0;g<256;g++)h[g]=g<128?g<<1:g<<1^283
for(g=0;g<256;g++){var m=p^p<<1^p<<2^p<<3^p<<4
m=m>>>8^255&m^99,e[f]=m,t[m]=f
var v=h[f],y=h[v],b=h[y],E=257*h[m]^16843008*m
n[f]=E<<24|E>>>8,i[f]=E<<16|E>>>16,a[f]=E<<8|E>>>24,o[f]=E,E=16843009*b^65537*y^257*v^16843008*f,u[m]=E<<24|E>>>8,l[m]=E<<16|E>>>16,c[m]=E<<8|E>>>24,d[m]=E,f?(f=v^h[h[h[b^v]]],p^=h[h[p]]):f=p=1}},t.expandKey=function(e){for(var t=this.uint8ArrayToUint32Array_(e),r=!0,n=0;n<t.length&&r;)r=t[n]===this.key[n],n++
if(!r){this.key=t
var i=this.keySize=t.length
if(4!==i&&6!==i&&8!==i)throw new Error("Invalid aes key size="+i)
var a,o,s,u,l=this.ksRows=4*(i+6+1),c=this.keySchedule=new Uint32Array(l),d=this.invKeySchedule=new Uint32Array(l),h=this.sBox,f=this.rcon,p=this.invSubMix,g=p[0],m=p[1],v=p[2],y=p[3]
for(a=0;a<l;a++)a<i?s=c[a]=t[a]:(u=s,a%i==0?(u=h[(u=u<<8|u>>>24)>>>24]<<24|h[u>>>16&255]<<16|h[u>>>8&255]<<8|h[255&u],u^=f[a/i|0]<<24):i>6&&a%i==4&&(u=h[u>>>24]<<24|h[u>>>16&255]<<16|h[u>>>8&255]<<8|h[255&u]),c[a]=s=(c[a-i]^u)>>>0)
for(o=0;o<l;o++)a=l-o,u=3&o?c[a]:c[a-4],d[o]=o<4||a<=4?u:g[h[u>>>24]]^m[h[u>>>16&255]]^v[h[u>>>8&255]]^y[h[255&u]],d[o]=d[o]>>>0}},t.networkToHostOrderSwap=function(e){return e<<24|(65280&e)<<8|(16711680&e)>>8|e>>>24},t.decrypt=function(e,t,r){for(var n,i,a,o,s,u,l,c,d,h,f,p,g,m,v=this.keySize+6,y=this.invKeySchedule,b=this.invSBox,E=this.invSubMix,w=E[0],_=E[1],T=E[2],A=E[3],D=this.uint8ArrayToUint32Array_(r),k=D[0],S=D[1],x=D[2],C=D[3],L=new Int32Array(e),R=new Int32Array(L.length),I=this.networkToHostOrderSwap;t<L.length;){for(d=I(L[t]),h=I(L[t+1]),f=I(L[t+2]),p=I(L[t+3]),s=d^y[0],u=p^y[1],l=f^y[2],c=h^y[3],g=4,m=1;m<v;m++)n=w[s>>>24]^_[u>>16&255]^T[l>>8&255]^A[255&c]^y[g],i=w[u>>>24]^_[l>>16&255]^T[c>>8&255]^A[255&s]^y[g+1],a=w[l>>>24]^_[c>>16&255]^T[s>>8&255]^A[255&u]^y[g+2],o=w[c>>>24]^_[s>>16&255]^T[u>>8&255]^A[255&l]^y[g+3],s=n,u=i,l=a,c=o,g+=4
n=b[s>>>24]<<24^b[u>>16&255]<<16^b[l>>8&255]<<8^b[255&c]^y[g],i=b[u>>>24]<<24^b[l>>16&255]<<16^b[c>>8&255]<<8^b[255&s]^y[g+1],a=b[l>>>24]<<24^b[c>>16&255]<<16^b[s>>8&255]<<8^b[255&u]^y[g+2],o=b[c>>>24]<<24^b[s>>16&255]<<16^b[u>>8&255]<<8^b[255&l]^y[g+3],R[t]=I(n^k),R[t+1]=I(o^S),R[t+2]=I(a^x),R[t+3]=I(i^C),k=d,S=h,x=f,C=p,t+=4}return R.buffer},e}(),Er=function(){function e(e,t){var r=(void 0===t?{}:t).removePKCS7Padding,n=void 0===r||r
if(this.logEnabled=!0,this.removePKCS7Padding=void 0,this.subtle=null,this.softwareDecrypter=null,this.key=null,this.fastAesKey=null,this.remainderData=null,this.currentIV=null,this.currentResult=null,this.useSoftware=void 0,this.useSoftware=e.enableSoftwareAES,this.removePKCS7Padding=n,n)try{var i=self.crypto
i&&(this.subtle=i.subtle||i.webkitSubtle)}catch(e){}null===this.subtle&&(this.useSoftware=!0)}var t=e.prototype
return t.destroy=function(){this.subtle=null,this.softwareDecrypter=null,this.key=null,this.fastAesKey=null,this.remainderData=null,this.currentIV=null,this.currentResult=null},t.isSync=function(){return this.useSoftware},t.flush=function(){var e=this.currentResult,t=this.remainderData
if(!e||t)return this.reset(),null
var r,n,i,a=new Uint8Array(e)
return this.reset(),this.removePKCS7Padding?(i=(n=(r=a).byteLength)&&new DataView(r.buffer).getUint8(n-1))?Z(r,0,n-i):r:a},t.reset=function(){this.currentResult=null,this.currentIV=null,this.remainderData=null,this.softwareDecrypter&&(this.softwareDecrypter=null)},t.decrypt=function(e,t,r){var n=this
return this.useSoftware?new Promise((function(i,a){n.softwareDecrypt(new Uint8Array(e),t,r)
var o=n.flush()
o?i(o.buffer):a(new Error("[softwareDecrypt] Failed to decrypt data"))})):this.webCryptoDecrypt(new Uint8Array(e),t,r)},t.softwareDecrypt=function(e,t,r){var n=this.currentIV,i=this.currentResult,a=this.remainderData
this.logOnce("JS AES decrypt"),a&&(e=xe(a,e),this.remainderData=null)
var o=this.getValidChunk(e)
if(!o.length)return null
n&&(r=n)
var s=this.softwareDecrypter
s||(s=this.softwareDecrypter=new br),s.expandKey(t)
var u=i
return this.currentResult=s.decrypt(o.buffer,0,r),this.currentIV=Z(o,-16).buffer,u||null},t.webCryptoDecrypt=function(e,t,r){var n=this,i=this.subtle
return this.key===t&&this.fastAesKey||(this.key=t,this.fastAesKey=new yr(i,t)),this.fastAesKey.expandKey().then((function(t){return i?(n.logOnce("WebCrypto AES decrypt"),new vr(i,new Uint8Array(r)).decrypt(e.buffer,t)):Promise.reject(new Error("web crypto not initialized"))})).catch((function(i){return k.warn("[decrypter]: WebCrypto Error, disable WebCrypto API, "+i.name+": "+i.message),n.onWebCryptoError(e,t,r)}))},t.onWebCryptoError=function(e,t,r){this.useSoftware=!0,this.logEnabled=!0,this.softwareDecrypt(e,t,r)
var n=this.flush()
if(n)return n.buffer
throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data")},t.getValidChunk=function(e){var t=e,r=e.length-e.length%16
return r!==e.length&&(t=Z(e,0,r),this.remainderData=Z(e,r)),t},t.logOnce=function(e){this.logEnabled&&(k.log("[decrypter]: "+e),this.logEnabled=!1)},e}(),wr="STOPPED",_r="IDLE",Tr="KEY_LOADING",Ar="FRAG_LOADING",Dr="FRAG_LOADING_WAITING_RETRY",kr="WAITING_TRACK",Sr="PARSING",xr="PARSED",Cr="ENDED",Lr="ERROR",Rr="WAITING_INIT_PTS",Ir="WAITING_LEVEL",Or=function(e){function t(t,r,n,i,a){var o
return(o=e.call(this)||this).hls=void 0,o.fragPrevious=null,o.fragCurrent=null,o.fragmentTracker=void 0,o.transmuxer=null,o._state=wr,o.playlistType=void 0,o.media=null,o.mediaBuffer=null,o.config=void 0,o.bitrateTest=!1,o.lastCurrentTime=0,o.nextLoadPosition=0,o.startPosition=0,o.startTimeOffset=null,o.loadedmetadata=!1,o.retryDate=0,o.levels=null,o.fragmentLoader=void 0,o.keyLoader=void 0,o.levelLastLoaded=null,o.startFragRequested=!1,o.decrypter=void 0,o.initPTS=[],o.onvseeking=null,o.onvended=null,o.logPrefix="",o.log=void 0,o.warn=void 0,o.playlistType=a,o.logPrefix=i,o.log=k.log.bind(k,i+":"),o.warn=k.warn.bind(k,i+":"),o.hls=t,o.fragmentLoader=new ir(t.config),o.keyLoader=n,o.fragmentTracker=r,o.config=t.config,o.decrypter=new Er(t.config),t.on(b.MANIFEST_LOADED,o.onManifestLoaded,function(e){if(void 0===e)throw new ReferenceError("this hasn't been initialised - super() hasn't been called")
return e}(o)),o}u(t,e)
var r=t.prototype
return r.doTick=function(){this.onTickEnd()},r.onTickEnd=function(){},r.startLoad=function(e){},r.stopLoad=function(){this.fragmentLoader.abort(),this.keyLoader.abort(this.playlistType)
var e=this.fragCurrent
null!=e&&e.loader&&(e.abortRequests(),this.fragmentTracker.removeFragment(e)),this.resetTransmuxer(),this.fragCurrent=null,this.fragPrevious=null,this.clearInterval(),this.clearNextTick(),this.state=wr},r._streamEnded=function(e,t){if(t.live||e.nextStart||!e.end||!this.media)return!1
var r=t.partList
if(null!=r&&r.length){var n=r[r.length-1]
return dr.isBuffered(this.media,n.start+n.duration/2)}var i=t.fragments[t.fragments.length-1].type
return this.fragmentTracker.isEndListAppended(i)},r.getLevelDetails=function(){var e
if(this.levels&&null!==this.levelLastLoaded)return null==(e=this.levels[this.levelLastLoaded])?void 0:e.details},r.onMediaAttached=function(e,t){var r=this.media=this.mediaBuffer=t.media
this.onvseeking=this.onMediaSeeking.bind(this),this.onvended=this.onMediaEnded.bind(this),r.addEventListener("seeking",this.onvseeking),r.addEventListener("ended",this.onvended)
var n=this.config
this.levels&&n.autoStartLoad&&this.state===wr&&this.startLoad(n.startPosition)},r.onMediaDetaching=function(){var e=this.media
null!=e&&e.ended&&(this.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0),e&&this.onvseeking&&this.onvended&&(e.removeEventListener("seeking",this.onvseeking),e.removeEventListener("ended",this.onvended),this.onvseeking=this.onvended=null),this.keyLoader&&this.keyLoader.detach(),this.media=this.mediaBuffer=null,this.loadedmetadata=!1,this.fragmentTracker.removeAllFragments(),this.stopLoad()},r.onMediaSeeking=function(){var e=this.config,t=this.fragCurrent,r=this.media,n=this.mediaBuffer,i=this.state,a=r?r.currentTime:0,o=dr.bufferInfo(n||r,a,e.maxBufferHole)
if(this.log("media seeking to "+(y(a)?a.toFixed(3):a)+", state: "+i),this.state===Cr)this.resetLoadingState()
else if(t){var s=e.maxFragLookUpTolerance,u=t.start-s,l=t.start+t.duration+s
if(!o.len||l<o.start||u>o.end){var c=a>l;(a<u||c)&&(c&&t.loader&&(this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),t.abortRequests(),this.resetLoadingState()),this.fragPrevious=null)}}r&&(this.fragmentTracker.removeFragmentsInRange(a,1/0,this.playlistType,!0),this.lastCurrentTime=a),this.loadedmetadata||o.len||(this.nextLoadPosition=this.startPosition=a),this.tickImmediate()},r.onMediaEnded=function(){this.startPosition=this.lastCurrentTime=0},r.onManifestLoaded=function(e,t){this.startTimeOffset=t.startTimeOffset,this.initPTS=[]},r.onHandlerDestroying=function(){this.stopLoad(),e.prototype.onHandlerDestroying.call(this)},r.onHandlerDestroyed=function(){this.state=wr,this.fragmentLoader&&this.fragmentLoader.destroy(),this.keyLoader&&this.keyLoader.destroy(),this.decrypter&&this.decrypter.destroy(),this.hls=this.log=this.warn=this.decrypter=this.keyLoader=this.fragmentLoader=this.fragmentTracker=null,e.prototype.onHandlerDestroyed.call(this)},r.loadFragment=function(e,t,r){this._loadFragForPlayback(e,t,r)},r._loadFragForPlayback=function(e,t,r){var n=this
this._doFragLoad(e,t,r,(function(t){if(n.fragContextChanged(e))return n.warn("Fragment "+e.sn+(t.part?" p: "+t.part.index:"")+" of level "+e.level+" was dropped during download."),void n.fragmentTracker.removeFragment(e)
e.stats.chunkCount++,n._handleFragmentLoadProgress(t)})).then((function(t){if(t){var r=n.state
n.fragContextChanged(e)?(r===Ar||!n.fragCurrent&&r===Sr)&&(n.fragmentTracker.removeFragment(e),n.state=_r):("payload"in t&&(n.log("Loaded fragment "+e.sn+" of level "+e.level),n.hls.trigger(b.FRAG_LOADED,t)),n._handleFragmentLoadComplete(t))}})).catch((function(t){n.state!==wr&&n.state!==Lr&&(n.warn(t),n.resetFragmentLoading(e))}))},r.clearTrackerIfNeeded=function(e){var t,r=this.fragmentTracker
if(r.getState(e)===Xt){var n=e.type,i=this.getFwdBufferInfo(this.mediaBuffer,n),a=Math.max(e.duration,i?i.len:this.config.maxBufferLength)
this.reduceMaxBufferLength(a)&&r.removeFragment(e)}else 0===(null==(t=this.mediaBuffer)?void 0:t.buffered.length)?r.removeAllFragments():r.hasParts(e.type)&&(r.detectPartialFragments({frag:e,part:null,stats:e.stats,id:e.type}),r.getState(e)===Zt&&r.removeFragment(e))},r.flushMainBuffer=function(e,t,r){if(void 0===r&&(r=null),e-t){var n={startOffset:e,endOffset:t,type:r}
this.hls.trigger(b.BUFFER_FLUSHING,n)}},r._loadInitSegment=function(e,t){var r=this
this._doFragLoad(e,t).then((function(t){if(!t||r.fragContextChanged(e)||!r.levels)throw new Error("init load aborted")
return t})).then((function(t){var n=r.hls,i=t.payload,a=e.decryptdata
if(i&&i.byteLength>0&&a&&a.key&&a.iv&&"AES-128"===a.method){var o=self.performance.now()
return r.decrypter.decrypt(new Uint8Array(i),a.key.buffer,a.iv.buffer).catch((function(t){throw n.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_DECRYPT_ERROR,fatal:!1,error:t,reason:t.message,frag:e}),t})).then((function(r){var i=self.performance.now()
return n.trigger(b.FRAG_DECRYPTED,{frag:e,payload:r,stats:{tstart:o,tdecrypt:i}}),t.payload=r,t}))}return t})).then((function(n){var i=r.fragCurrent,a=r.hls
if(!r.levels)throw new Error("init load aborted, missing levels")
var o=e.stats
r.state=_r,t.fragmentError=0,e.data=new Uint8Array(n.payload),o.parsing.start=o.buffering.start=self.performance.now(),o.parsing.end=o.buffering.end=self.performance.now(),n.frag===i&&a.trigger(b.FRAG_BUFFERED,{stats:o,frag:i,part:null,id:e.type}),r.tick()})).catch((function(t){r.state!==wr&&r.state!==Lr&&(r.warn(t),r.resetFragmentLoading(e))}))},r.fragContextChanged=function(e){var t=this.fragCurrent
return!e||!t||e.level!==t.level||e.sn!==t.sn||e.urlId!==t.urlId},r.fragBufferedComplete=function(e,t){var r,n,i,a,o=this.mediaBuffer?this.mediaBuffer:this.media
this.log("Buffered "+e.type+" sn: "+e.sn+(t?" part: "+t.index:"")+" of "+(this.playlistType===ut?"level":"track")+" "+e.level+" (frag:["+(null!=(r=e.startPTS)?r:NaN).toFixed(3)+"-"+(null!=(n=e.endPTS)?n:NaN).toFixed(3)+"] > buffer:"+(o?function(e){for(var t="",r=e.length,n=0;n<r;n++)t+="["+e.start(n).toFixed(3)+"-"+e.end(n).toFixed(3)+"]"
return t}(dr.getBuffered(o)):"(detached)")+")"),this.state=_r,o&&(!this.loadedmetadata&&e.type==ut&&o.buffered.length&&(null==(i=this.fragCurrent)?void 0:i.sn)===(null==(a=this.fragPrevious)?void 0:a.sn)&&(this.loadedmetadata=!0,this.seekToStartPos()),this.tick())},r.seekToStartPos=function(){},r._handleFragmentLoadComplete=function(e){var t=this.transmuxer
if(t){var r=e.frag,n=e.part,i=e.partsLoaded,a=!i||0===i.length||i.some((function(e){return!e})),o=new hr(r.level,r.sn,r.stats.chunkCount+1,0,n?n.index:-1,!a)
t.flush(o)}},r._handleFragmentLoadProgress=function(e){},r._doFragLoad=function(e,t,r,n){var i,a=this
void 0===r&&(r=null)
var o=null==t?void 0:t.details
if(!this.levels||!o)throw new Error("frag load aborted, missing level"+(o?"":" detail")+"s")
var s=null
if(!e.encrypted||null!=(i=e.decryptdata)&&i.key?!e.encrypted&&o.encryptedFragments.length&&this.keyLoader.loadClear(e,o.encryptedFragments):(this.log("Loading key for "+e.sn+" of ["+o.startSN+"-"+o.endSN+"], "+("[stream-controller]"===this.logPrefix?"level":"track")+" "+e.level),this.state=Tr,this.fragCurrent=e,s=this.keyLoader.load(e).then((function(e){if(!a.fragContextChanged(e.frag))return a.hls.trigger(b.KEY_LOADED,e),a.state===Tr&&(a.state=_r),e})),this.hls.trigger(b.KEY_LOADING,{frag:e}),null===this.fragCurrent&&(s=Promise.reject(new Error("frag load aborted, context changed in KEY_LOADING")))),r=Math.max(e.start,r||0),this.config.lowLatencyMode&&"initSegment"!==e.sn){var u=o.partList
if(u&&n){r>e.end&&o.fragmentHint&&(e=o.fragmentHint)
var l=this.getNextPart(u,e,r)
if(l>-1){var c,d=u[l]
return this.log("Loading part sn: "+e.sn+" p: "+d.index+" cc: "+e.cc+" of playlist ["+o.startSN+"-"+o.endSN+"] parts [0-"+l+"-"+(u.length-1)+"] "+("[stream-controller]"===this.logPrefix?"level":"track")+": "+e.level+", target: "+parseFloat(r.toFixed(3))),this.nextLoadPosition=d.start+d.duration,this.state=Ar,c=s?s.then((function(r){return!r||a.fragContextChanged(r.frag)?null:a.doFragPartsLoad(e,d,t,n)})).catch((function(e){return a.handleFragLoadError(e)})):this.doFragPartsLoad(e,d,t,n).catch((function(e){return a.handleFragLoadError(e)})),this.hls.trigger(b.FRAG_LOADING,{frag:e,part:d,targetBufferTime:r}),null===this.fragCurrent?Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts")):c}if(!e.url||this.loadedEndOfParts(u,r))return Promise.resolve(null)}}this.log("Loading fragment "+e.sn+" cc: "+e.cc+" "+(o?"of ["+o.startSN+"-"+o.endSN+"] ":"")+("[stream-controller]"===this.logPrefix?"level":"track")+": "+e.level+", target: "+parseFloat(r.toFixed(3))),y(e.sn)&&!this.bitrateTest&&(this.nextLoadPosition=e.start+e.duration),this.state=Ar
var h,f=this.config.progressive
return h=f&&s?s.then((function(t){return!t||a.fragContextChanged(null==t?void 0:t.frag)?null:a.fragmentLoader.load(e,n)})).catch((function(e){return a.handleFragLoadError(e)})):Promise.all([this.fragmentLoader.load(e,f?n:void 0),s]).then((function(e){var t=e[0]
return!f&&t&&n&&n(t),t})).catch((function(e){return a.handleFragLoadError(e)})),this.hls.trigger(b.FRAG_LOADING,{frag:e,targetBufferTime:r}),null===this.fragCurrent?Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING")):h},r.doFragPartsLoad=function(e,t,r,n){var i=this
return new Promise((function(a,o){var s,u=[],l=null==(s=r.details)?void 0:s.partList
!function t(s){i.fragmentLoader.loadPart(e,s,n).then((function(n){u[s.index]=n
var o=n.part
i.hls.trigger(b.FRAG_LOADED,n)
var c=Ot(r,e.sn,s.index+1)||Ft(l,e.sn,s.index+1)
if(!c)return a({frag:e,part:o,partsLoaded:u})
t(c)})).catch(o)}(t)}))},r.handleFragLoadError=function(e){if("data"in e){var t=e.data
e.data&&t.details===w.INTERNAL_ABORTED?this.handleFragLoadAborted(t.frag,t.part):this.hls.trigger(b.ERROR,t)}else this.hls.trigger(b.ERROR,{type:E.OTHER_ERROR,details:w.INTERNAL_EXCEPTION,err:e,error:e,fatal:!0})
return null},r._handleTransmuxerFlush=function(e){var t=this.getCurrentContext(e)
if(t&&this.state===Sr){var r=t.frag,n=t.part,i=t.level,a=self.performance.now()
r.stats.parsing.end=a,n&&(n.stats.parsing.end=a),this.updateLevelTiming(r,n,i,e.partial)}else this.fragCurrent||this.state===wr||this.state===Lr||(this.state=_r)},r.getCurrentContext=function(e){var t=this.levels,r=this.fragCurrent,n=e.level,i=e.sn,a=e.part
if(null==t||!t[n])return this.warn("Levels object was unset while buffering fragment "+i+" of level "+n+". The current chunk will not be buffered."),null
var o=t[n],s=a>-1?Ot(o,i,a):null,u=s?s.fragment:function(e,t,r){if(null==e||!e.details)return null
var n=e.details,i=n.fragments[t-n.startSN]
return i||((i=n.fragmentHint)&&i.sn===t?i:t<n.startSN&&r&&r.sn===t?r:null)}(o,i,r)
return u?(r&&r!==u&&(u.stats=r.stats),{frag:u,part:s,level:o}):null},r.bufferFragmentData=function(e,t,r,n){var i
if(e&&this.state===Sr){var a=e.data1,o=e.data2,s=a
if(a&&o&&(s=xe(a,o)),null!=(i=s)&&i.length){var u={type:e.type,frag:t,part:r,chunkMeta:n,parent:t.type,data:s}
this.hls.trigger(b.BUFFER_APPENDING,u),e.dropped&&e.independent&&!r&&this.flushBufferGap(t)}}},r.flushBufferGap=function(e){var t=this.media
if(t)if(dr.isBuffered(t,t.currentTime)){var r=t.currentTime,n=dr.bufferInfo(t,r,0),i=e.duration,a=Math.min(2*this.config.maxFragLookUpTolerance,.25*i),o=Math.max(Math.min(e.start-a,n.end-a),r+a)
e.start-o>a&&this.flushMainBuffer(o,e.start)}else this.flushMainBuffer(0,e.start)},r.getFwdBufferInfo=function(e,t){var r=this.getLoadPosition()
return y(r)?this.getFwdBufferInfoAtPos(e,r,t):null},r.getFwdBufferInfoAtPos=function(e,t,r){var n=this.config.maxBufferHole,i=dr.bufferInfo(e,t,n)
if(0===i.len&&void 0!==i.nextStart){var a=this.fragmentTracker.getBufferedFrag(t,r)
if(a&&i.nextStart<a.end)return dr.bufferInfo(e,t,Math.max(i.nextStart,n))}return i},r.getMaxBufferLength=function(e){var t,r=this.config
return t=e?Math.max(8*r.maxBufferSize/e,r.maxBufferLength):r.maxBufferLength,Math.min(t,r.maxMaxBufferLength)},r.reduceMaxBufferLength=function(e){var t=this.config,r=e||t.maxBufferLength
return t.maxMaxBufferLength>=r&&(t.maxMaxBufferLength/=2,this.warn("Reduce max buffer length to "+t.maxMaxBufferLength+"s"),!0)},r.getAppendedFrag=function(e,t){var r=this.fragmentTracker.getAppendedFrag(e,ut)
return r&&"fragment"in r?r.fragment:r},r.getNextFragment=function(e,t){var r=t.fragments,n=r.length
if(!n)return null
var i,a=this.config,o=r[0].start
if(t.live){var s=a.initialLiveManifestSize
if(n<s)return this.warn("Not enough fragments to start playback (have: "+n+", need: "+s+")"),null
t.PTSKnown||this.startFragRequested||-1!==this.startPosition||(i=this.getInitialLiveFragment(t,r),this.startPosition=i?this.hls.liveSyncPosition||i.start:e)}else e<=o&&(i=r[0])
if(!i){var u=a.lowLatencyMode?t.partEnd:t.fragmentEnd
i=this.getFragmentAtPosition(e,u,t)}return this.mapToInitFragWhenRequired(i)},r.isLoopLoading=function(e,t){var r=this.fragmentTracker.getState(e)
return(r===Jt||r===Zt&&!!e.gap)&&this.nextLoadPosition>t},r.getNextFragmentLoopLoading=function(e,t,r,n,i){var a=e.gap,o=this.getNextFragment(this.nextLoadPosition,t)
if(null===o)return o
if(e=o,a&&e&&!e.gap&&r.nextStart){var s=this.getFwdBufferInfoAtPos(this.mediaBuffer?this.mediaBuffer:this.media,r.nextStart,n)
if(null!==s&&r.len+s.len>=i)return this.log('buffer full after gaps in "'+n+'" playlist starting at sn: '+e.sn),null}return e},r.mapToInitFragWhenRequired=function(e){return null==e||!e.initSegment||null!=e&&e.initSegment.data||this.bitrateTest?e:e.initSegment},r.getNextPart=function(e,t,r){for(var n=-1,i=!1,a=!0,o=0,s=e.length;o<s;o++){var u=e[o]
if(a=a&&!u.independent,n>-1&&r<u.start)break
var l=u.loaded
l?n=-1:(i||u.independent||a)&&u.fragment===t&&(n=o),i=l}return n},r.loadedEndOfParts=function(e,t){var r=e[e.length-1]
return r&&t>r.start&&r.loaded},r.getInitialLiveFragment=function(e,t){var r=this.fragPrevious,n=null
if(r){if(e.hasProgramDateTime&&(this.log("Live playlist, switching playlist, load frag with same PDT: "+r.programDateTime),n=function(e,t,r){if(null===t||!Array.isArray(e)||!e.length||!y(t))return null
if(t<(e[0].programDateTime||0))return null
if(t>=(e[e.length-1].endProgramDateTime||0))return null
r=r||0
for(var n=0;n<e.length;++n){var i=e[n]
if(Ht(t,r,i))return i}return null}(t,r.endProgramDateTime,this.config.maxFragLookUpTolerance)),!n){var i=r.sn+1
if(i>=e.startSN&&i<=e.endSN){var a=t[i-e.startSN]
r.cc===a.cc&&(n=a,this.log("Live playlist, switching playlist, load frag with next SN: "+n.sn))}n||(n=function(e,t){return qt(e,(function(e){return e.cc<t?1:e.cc>t?-1:0}))}(t,r.cc))&&this.log("Live playlist, switching playlist, load frag with same CC: "+n.sn)}}else{var o=this.hls.liveSyncPosition
null!==o&&(n=this.getFragmentAtPosition(o,this.bitrateTest?e.fragmentEnd:e.edge,e))}return n},r.getFragmentAtPosition=function(e,t,r){var n,i=this.config,a=this.fragPrevious,o=r.fragments,s=r.endSN,u=r.fragmentHint,l=i.maxFragLookUpTolerance,c=r.partList,d=!!(i.lowLatencyMode&&null!=c&&c.length&&u)
if(d&&u&&!this.bitrateTest&&(o=o.concat(u),s=u.sn),n=e<t?jt(a,o,e,e>t-l?0:l):o[o.length-1]){var h=n.sn-r.startSN,f=this.fragmentTracker.getState(n)
if((f===Jt||f===Zt&&n.gap)&&(a=n),a&&n.sn===a.sn&&(!d||c[0].fragment.sn>n.sn)&&a&&n.level===a.level){var p=o[h+1]
n=n.sn<s&&this.fragmentTracker.getState(p)!==Jt?p:null}}return n},r.synchronizeToLiveEdge=function(e){var t=this.config,r=this.media
if(r){var n=this.hls.liveSyncPosition,i=r.currentTime,a=e.fragments[0].start,o=e.edge,s=i>=a-t.maxFragLookUpTolerance&&i<=o
if(null!==n&&r.duration>n&&(i<n||!s)){var u=void 0!==t.liveMaxLatencyDuration?t.liveMaxLatencyDuration:t.liveMaxLatencyDurationCount*e.targetduration;(!s&&r.readyState<4||i<o-u)&&(this.loadedmetadata||(this.nextLoadPosition=n),r.readyState&&(this.warn("Playback: "+i.toFixed(3)+" is located too far from the end of live sliding playlist: "+o+", reset currentTime to : "+n.toFixed(3)),r.currentTime=n))}}},r.alignPlaylists=function(e,t){var r=this.levels,n=this.levelLastLoaded,i=this.fragPrevious,a=null!==n?r[n]:null,o=e.fragments.length
if(!o)return this.warn("No fragments in live playlist"),0
var s=e.fragments[0].start,u=!t,l=e.alignedSliding&&y(s)
if(u||!l&&!s){(function(e,t,r){t&&(function(e,t,r){if(function(e,t,r){return!(!t.details||!(r.endCC>r.startCC||e&&e.cc<r.startCC))}(e,r,t)){var n=function(e,t,r){var n=e.fragments,i=t.fragments
if(i.length&&n.length){var a=fr(n,i[0].cc)
if(a&&(!a||a.startPTS))return a
k.log("No frag in previous level to align on")}else k.log("No fragments to align")}(r.details,t)
n&&y(n.start)&&(k.log("Adjusting PTS using last level due to CC increase within current level "+t.url),gr(n.start,t))}}(e,r,t),!r.alignedSliding&&t.details&&function(e,t){if(t.fragments.length&&e.hasProgramDateTime&&t.hasProgramDateTime){var r=t.fragments[0].programDateTime,n=e.fragments[0].programDateTime,i=(n-r)/1e3+t.fragments[0].start
i&&y(i)&&(k.log("Adjusting PTS using programDateTime delta "+(n-r)+"ms, sliding:"+i.toFixed(3)+" "+e.url+" "),gr(i,e))}}(r,t.details),r.alignedSliding||!t.details||r.skippedSegments||Rt(t.details,r))})(i,a,e)
var c=e.fragments[0].start
return this.log("Live playlist sliding: "+c.toFixed(2)+" start-sn: "+(t?t.startSN:"na")+"->"+e.startSN+" prev-sn: "+(i?i.sn:"na")+" fragments: "+o),c}return s},r.waitForCdnTuneIn=function(e){return e.live&&e.canBlockReload&&e.partTarget&&e.tuneInGoal>Math.max(e.partHoldBack,3*e.partTarget)},r.setStartPosition=function(e,t){var r=this.startPosition
if(r<t&&(r=-1),-1===r||-1===this.lastCurrentTime){var n=null!==this.startTimeOffset,i=n?this.startTimeOffset:e.startTimeOffset
null!==i&&y(i)?(r=t+i,i<0&&(r+=e.totalduration),r=Math.min(Math.max(t,r),t+e.totalduration),this.log("Start time offset "+i+" found in "+(n?"multivariant":"media")+" playlist, adjust startPosition to "+r),this.startPosition=r):e.live?r=this.hls.liveSyncPosition||t:this.startPosition=r=0,this.lastCurrentTime=r}this.nextLoadPosition=r},r.getLoadPosition=function(){var e=this.media,t=0
return this.loadedmetadata&&e?t=e.currentTime:this.nextLoadPosition&&(t=this.nextLoadPosition),t},r.handleFragLoadAborted=function(e,t){this.transmuxer&&"initSegment"!==e.sn&&e.stats.aborted&&(this.warn("Fragment "+e.sn+(t?" part "+t.index:"")+" of level "+e.level+" was aborted"),this.resetFragmentLoading(e))},r.resetFragmentLoading=function(e){this.fragCurrent&&(this.fragContextChanged(e)||this.state===Dr)||(this.state=_r)},r.onFragmentOrKeyLoadError=function(e,t){if(t.chunkMeta&&!t.frag){var r=this.getCurrentContext(t.chunkMeta)
r&&(t.frag=r.frag)}var n=t.frag
if(n&&n.type===e&&this.levels)if(this.fragContextChanged(n)){var i
this.warn("Frag load error must match current frag to retry "+n.url+" > "+(null==(i=this.fragCurrent)?void 0:i.url))}else{var a=t.details===w.FRAG_GAP
a&&this.fragmentTracker.fragBuffered(n,!0)
var o=t.errorAction,s=o||{},u=s.action,l=s.retryCount,c=void 0===l?0:l,d=s.retryConfig
if(o&&5===u&&d){this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition)
var h=Mt(d,c)
this.warn("Fragment "+n.sn+" of "+e+" "+n.level+" errored with "+t.details+", retrying loading "+(c+1)+"/"+d.maxNumRetry+" in "+h+"ms"),o.resolved=!0,this.retryDate=self.performance.now()+h,this.state=Dr}else d&&o?(this.resetFragmentErrors(e),c<d.maxNumRetry?a||(o.resolved=!0):k.warn(t.details+" reached or exceeded max retry ("+c+")")):this.state=Lr
this.tickImmediate()}},r.reduceLengthAndFlushBuffer=function(e){if(this.state===Sr||this.state===xr){var t=e.parent,r=this.getFwdBufferInfo(this.mediaBuffer,t),n=r&&r.len>.5
n&&this.reduceMaxBufferLength(r.len)
var i=!n
return i&&this.warn("Buffer full error while media.currentTime is not buffered, flush "+t+" buffer"),e.frag&&(this.fragmentTracker.removeFragment(e.frag),this.nextLoadPosition=e.frag.start),this.resetLoadingState(),i}return!1},r.resetFragmentErrors=function(e){e===lt&&(this.fragCurrent=null),this.loadedmetadata||(this.startFragRequested=!1),this.state!==wr&&(this.state=_r)},r.afterBufferFlushed=function(e,t,r){if(e){var n=dr.getBuffered(e)
this.fragmentTracker.detectEvictedFragments(t,n,r),this.state===Cr&&this.resetLoadingState()}},r.resetLoadingState=function(){this.log("Reset loading state"),this.fragCurrent=null,this.fragPrevious=null,this.state=_r},r.resetStartWhenNotLoaded=function(e){if(!this.loadedmetadata){this.startFragRequested=!1
var t=this.levels?this.levels[e].details:null
null!=t&&t.live?(this.startPosition=-1,this.setStartPosition(t,0),this.resetLoadingState()):this.nextLoadPosition=this.startPosition}},r.resetWhenMissingContext=function(e){this.warn("The loading context changed while buffering fragment "+e.sn+" of level "+e.level+". This chunk will not be buffered."),this.removeUnbufferedFrags(),this.resetStartWhenNotLoaded(e.level),this.resetLoadingState()},r.removeUnbufferedFrags=function(e){void 0===e&&(e=0),this.fragmentTracker.removeFragmentsInRange(e,1/0,this.playlistType,!1,!0)},r.updateLevelTiming=function(e,t,r,n){var i,a=this,o=r.details
if(o){if(Object.keys(e.elementaryStreams).reduce((function(t,i){var s=e.elementaryStreams[i]
if(s){var u=s.endPTS-s.startPTS
if(u<=0)return a.warn("Could not parse fragment "+e.sn+" "+i+" duration reliably ("+u+")"),t||!1
var l=n?0:Ct(o,e,s.startPTS,s.endPTS,s.startDTS,s.endDTS)
return a.hls.trigger(b.LEVEL_PTS_UPDATED,{details:o,level:r,drift:l,type:i,frag:e,start:s.startPTS,end:s.endPTS}),!0}return t}),!1))r.fragmentError=0
else if(null===(null==(i=this.transmuxer)?void 0:i.error)){var s=new Error("Found no media in fragment "+e.sn+" of level "+r.id+" resetting transmuxer to fallback to playlist timing")
if(this.warn(s.message),this.hls.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,fatal:!1,error:s,frag:e,reason:"Found no media in msn "+e.sn+' of level "'+r.url+'"'}),!this.hls)return
this.resetTransmuxer()}this.state=xr,this.hls.trigger(b.FRAG_PARSED,{frag:e,part:t})}else this.warn("level.details undefined")},r.resetTransmuxer=function(){this.transmuxer&&(this.transmuxer.destroy(),this.transmuxer=null)},r.recoverWorkerError=function(e){"demuxerWorker"===e.event&&(this.resetTransmuxer(),this.resetLoadingState())},a(t,[{key:"state",get:function(){return this._state},set:function(e){var t=this._state
t!==e&&(this._state=e,this.log(t+"->"+e))}}]),t}(lr)
function Fr(){return self.SourceBuffer||self.WebKitSourceBuffer}function Pr(e,t){return void 0===e&&(e=""),void 0===t&&(t=9e4),{type:e,id:-1,pid:-1,inputTimeScale:t,sequenceNumber:-1,samples:[],dropped:0}}var Nr=function(){function e(){this._audioTrack=void 0,this._id3Track=void 0,this.frameIndex=0,this.cachedData=null,this.basePTS=null,this.initPTS=null,this.lastPTS=null}var t=e.prototype
return t.resetInitSegment=function(e,t,r,n){this._id3Track={type:"id3",id:3,pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],dropped:0}},t.resetTimeStamp=function(e){this.initPTS=e,this.resetContiguity()},t.resetContiguity=function(){this.basePTS=null,this.lastPTS=null,this.frameIndex=0},t.canParse=function(e,t){return!1},t.appendFrame=function(e,t,r){},t.demux=function(e,t){this.cachedData&&(e=xe(this.cachedData,e),this.cachedData=null)
var r,n=re(e,0),i=n?n.length:0,a=this._audioTrack,o=this._id3Track,s=n?function(e){for(var t=se(e),r=0;r<t.length;r++){var n=t[r]
if(ae(n))return he(n)}}(n):void 0,u=e.length
for((null===this.basePTS||0===this.frameIndex&&y(s))&&(this.basePTS=Mr(s,t,this.initPTS),this.lastPTS=this.basePTS),null===this.lastPTS&&(this.lastPTS=this.basePTS),n&&n.length>0&&o.samples.push({pts:this.lastPTS,dts:this.lastPTS,data:n,type:yt,duration:Number.POSITIVE_INFINITY});i<u;){if(this.canParse(e,i)){var l=this.appendFrame(a,e,i)
l?(this.frameIndex++,this.lastPTS=l.sample.pts,r=i+=l.length):i=u}else ie(e,i)?(n=re(e,i),o.samples.push({pts:this.lastPTS,dts:this.lastPTS,data:n,type:yt,duration:Number.POSITIVE_INFINITY}),r=i+=n.length):i++
if(i===u&&r!==u){var c=Z(e,r)
this.cachedData?this.cachedData=xe(this.cachedData,c):this.cachedData=c}}return{audioTrack:a,videoTrack:Pr(),id3Track:o,textTrack:Pr()}},t.demuxSampleAes=function(e,t,r){return Promise.reject(new Error("["+this+"] This demuxer does not support Sample-AES decryption"))},t.flush=function(e){var t=this.cachedData
return t&&(this.cachedData=null,this.demux(t,0)),{audioTrack:this._audioTrack,videoTrack:Pr(),id3Track:this._id3Track,textTrack:Pr()}},t.destroy=function(){},e}(),Mr=function(e,t,r){return y(e)?90*e:9e4*t+(r?9e4*r.baseTime/r.timescale:0)}
function Br(e,t){return 255===e[t]&&240==(246&e[t+1])}function Ur(e,t){return 1&e[t+1]?7:9}function qr(e,t){return(3&e[t+3])<<11|e[t+4]<<3|(224&e[t+5])>>>5}function jr(e,t){return t+1<e.length&&Br(e,t)}function Gr(e,t){if(jr(e,t)){var r=Ur(e,t)
if(t+r>=e.length)return!1
var n=qr(e,t)
if(n<=r)return!1
var i=t+n
return i===e.length||jr(e,i)}return!1}function Hr(e,t,r,n,i){if(!e.samplerate){var a=function(e,t,r,n){var i,a,o,s,u=navigator.userAgent.toLowerCase(),l=n,c=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350]
i=1+((192&t[r+2])>>>6)
var d=(60&t[r+2])>>>2
if(!(d>c.length-1))return o=(1&t[r+2])<<2,o|=(192&t[r+3])>>>6,k.log("manifest codec:"+n+", ADTS type:"+i+", samplingIndex:"+d),/firefox/i.test(u)?d>=6?(i=5,s=new Array(4),a=d-3):(i=2,s=new Array(2),a=d):-1!==u.indexOf("android")?(i=2,s=new Array(2),a=d):(i=5,s=new Array(4),n&&(-1!==n.indexOf("mp4a.40.29")||-1!==n.indexOf("mp4a.40.5"))||!n&&d>=6?a=d-3:((n&&-1!==n.indexOf("mp4a.40.2")&&(d>=6&&1===o||/vivaldi/i.test(u))||!n&&1===o)&&(i=2,s=new Array(2)),a=d)),s[0]=i<<3,s[0]|=(14&d)>>1,s[1]|=(1&d)<<7,s[1]|=o<<3,5===i&&(s[1]|=(14&a)>>1,s[2]=(1&a)<<7,s[2]|=8,s[3]=0),{config:s,samplerate:c[d],channelCount:o,codec:"mp4a.40."+i,manifestCodec:l}
e.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,fatal:!0,reason:"invalid ADTS sampling index:"+d})}(t,r,n,i)
if(!a)return
e.config=a.config,e.samplerate=a.samplerate,e.channelCount=a.channelCount,e.codec=a.codec,e.manifestCodec=a.manifestCodec,k.log("parsed codec:"+e.codec+", rate:"+a.samplerate+", channels:"+a.channelCount)}}function Vr(e){return 9216e4/e}function zr(e,t,r,n,i){var a,o=n+i*Vr(e.samplerate),s=function(e,t){var r=Ur(e,t)
if(t+r<=e.length){var n=qr(e,t)-r
if(n>0)return{headerLength:r,frameLength:n}}}(t,r)
if(s){var u=s.frameLength,l=s.headerLength,c=l+u,d=Math.max(0,r+c-t.length)
d?(a=new Uint8Array(c-l)).set(t.subarray(r+l,t.length),0):a=t.subarray(r+l,r+c)
var h={unit:a,pts:o}
return d||e.samples.push(h),{sample:h,length:c,missing:d}}var f=t.length-r
return(a=new Uint8Array(f)).set(t.subarray(r,t.length),0),{sample:{unit:a,pts:o},length:f,missing:-1}}var Kr=function(e){function t(t,r){var n
return(n=e.call(this)||this).observer=void 0,n.config=void 0,n.observer=t,n.config=r,n}u(t,e)
var r=t.prototype
return r.resetInitSegment=function(t,r,n,i){e.prototype.resetInitSegment.call(this,t,r,n,i),this._audioTrack={container:"audio/adts",type:"audio",id:2,pid:-1,sequenceNumber:0,segmentCodec:"aac",samples:[],manifestCodec:r,duration:i,inputTimeScale:9e4,dropped:0}},t.probe=function(e){if(!e)return!1
for(var t=(re(e,0)||[]).length,r=e.length;t<r;t++)if(Gr(e,t))return k.log("ADTS sync word found !"),!0
return!1},r.canParse=function(e,t){return function(e,t){return function(e,t){return t+5<e.length}(e,t)&&Br(e,t)&&qr(e,t)<=e.length-t}(e,t)},r.appendFrame=function(e,t,r){Hr(e,this.observer,t,r,e.manifestCodec)
var n=zr(e,t,r,this.basePTS,this.frameIndex)
if(n&&0===n.missing)return n},t}(Nr),Wr=/\/emsg[-/]ID3/i,$r=function(){function e(e,t){this.remainderData=null,this.timeOffset=0,this.config=void 0,this.videoTrack=void 0,this.audioTrack=void 0,this.id3Track=void 0,this.txtTrack=void 0,this.config=t}var t=e.prototype
return t.resetTimeStamp=function(){},t.resetInitSegment=function(e,t,r,n){var i=this.videoTrack=Pr("video",1),a=this.audioTrack=Pr("audio",1),o=this.txtTrack=Pr("text",1)
if(this.id3Track=Pr("id3",1),this.timeOffset=0,null!=e&&e.byteLength){var s=De(e)
if(s.video){var u=s.video,l=u.id,c=u.timescale,d=u.codec
i.id=l,i.timescale=o.timescale=c,i.codec=d}if(s.audio){var h=s.audio,f=h.id,p=h.timescale,g=h.codec
a.id=f,a.timescale=p,a.codec=g}o.id=ve.text,i.sampleDuration=0,i.duration=a.duration=n}},t.resetContiguity=function(){this.remainderData=null},e.probe=function(e){return Te(e=e.length>16384?e.subarray(0,16384):e,["moof"]).length>0},t.demux=function(e,t){this.timeOffset=t
var r=e,n=this.videoTrack,i=this.txtTrack
if(this.config.progressive){this.remainderData&&(r=xe(this.remainderData,e))
var a=function(e){var t={valid:null,remainder:null},r=Te(e,["moof"])
if(!r)return t
if(r.length<2)return t.remainder=e,t
var n=r[r.length-1]
return t.valid=Z(e,0,n.byteOffset-8),t.remainder=Z(e,n.byteOffset-8),t}(r)
this.remainderData=a.remainder,n.samples=a.valid||new Uint8Array}else n.samples=r
var o=this.extractID3Track(n,t)
return i.samples=Ce(t,n),{videoTrack:n,audioTrack:this.audioTrack,id3Track:o,textTrack:this.txtTrack}},t.flush=function(){var e=this.timeOffset,t=this.videoTrack,r=this.txtTrack
t.samples=this.remainderData||new Uint8Array,this.remainderData=null
var n=this.extractID3Track(t,this.timeOffset)
return r.samples=Ce(e,t),{videoTrack:t,audioTrack:Pr(),id3Track:n,textTrack:Pr()}},t.extractID3Track=function(e,t){var r=this.id3Track
if(e.samples.length){var n=Te(e.samples,["emsg"])
n&&n.forEach((function(e){var n=function(e){var t=e[0],r="",n="",i=0,a=0,o=0,s=0,u=0,l=0
if(0===t){for(;"\0"!==ye(e.subarray(l,l+1));)r+=ye(e.subarray(l,l+1)),l+=1
for(r+=ye(e.subarray(l,l+1)),l+=1;"\0"!==ye(e.subarray(l,l+1));)n+=ye(e.subarray(l,l+1)),l+=1
n+=ye(e.subarray(l,l+1)),l+=1,i=Ee(e,12),a=Ee(e,16),s=Ee(e,20),u=Ee(e,24),l=28}else if(1===t){i=Ee(e,l+=4)
var c=Ee(e,l+=4),d=Ee(e,l+=4)
for(l+=4,o=Math.pow(2,32)*c+d,Number.isSafeInteger(o)||(o=Number.MAX_SAFE_INTEGER,k.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")),s=Ee(e,l),u=Ee(e,l+=4),l+=4;"\0"!==ye(e.subarray(l,l+1));)r+=ye(e.subarray(l,l+1)),l+=1
for(r+=ye(e.subarray(l,l+1)),l+=1;"\0"!==ye(e.subarray(l,l+1));)n+=ye(e.subarray(l,l+1)),l+=1
n+=ye(e.subarray(l,l+1)),l+=1}return{schemeIdUri:r,value:n,timeScale:i,presentationTime:o,presentationTimeDelta:a,eventDuration:s,id:u,payload:e.subarray(l,e.byteLength)}}(e)
if(Wr.test(n.schemeIdUri)){var i=y(n.presentationTime)?n.presentationTime/n.timeScale:t+n.presentationTimeDelta/n.timeScale,a=4294967295===n.eventDuration?Number.POSITIVE_INFINITY:n.eventDuration/n.timeScale
a<=.001&&(a=Number.POSITIVE_INFINITY)
var o=n.payload
r.samples.push({data:o,len:o.byteLength,dts:i,pts:i,type:bt,duration:a})}}))}return r},t.demuxSampleAes=function(e,t,r){return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"))},t.destroy=function(){},e}(),Yr=null,Qr=[32,64,96,128,160,192,224,256,288,320,352,384,416,448,32,48,56,64,80,96,112,128,160,192,224,256,320,384,32,40,48,56,64,80,96,112,128,160,192,224,256,320,32,48,56,64,80,96,112,128,144,160,176,192,224,256,8,16,24,32,40,48,56,64,80,96,112,128,144,160],Xr=[44100,48e3,32e3,22050,24e3,16e3,11025,12e3,8e3],Zr=[[0,72,144,12],[0,0,0,0],[0,72,144,12],[0,144,144,12]],Jr=[0,1,1,4]
function en(e,t,r,n,i){if(!(r+24>t.length)){var a=tn(t,r)
if(a&&r+a.frameLength<=t.length){var o=n+i*(9e4*a.samplesPerFrame/a.sampleRate),s={unit:t.subarray(r,r+a.frameLength),pts:o,dts:o}
return e.config=[],e.channelCount=a.channelCount,e.samplerate=a.sampleRate,e.samples.push(s),{sample:s,length:a.frameLength,missing:0}}}}function tn(e,t){var r=e[t+1]>>3&3,n=e[t+1]>>1&3,i=e[t+2]>>4&15,a=e[t+2]>>2&3
if(1!==r&&0!==i&&15!==i&&3!==a){var o=e[t+2]>>1&1,s=e[t+3]>>6,u=1e3*Qr[14*(3===r?3-n:3===n?3:4)+i-1],l=Xr[3*(3===r?0:2===r?1:2)+a],c=3===s?1:2,d=Zr[r][n],h=Jr[n],f=8*d*h,p=Math.floor(d*u/l+o)*h
if(null===Yr){var g=(navigator.userAgent||"").match(/Chrome\/(\d+)/i)
Yr=g?parseInt(g[1]):0}return!!Yr&&Yr<=87&&2===n&&u>=224e3&&0===s&&(e[t+3]=128|e[t+3]),{sampleRate:l,channelCount:c,frameLength:p,samplesPerFrame:f}}}function rn(e,t){return 255===e[t]&&224==(224&e[t+1])&&0!=(6&e[t+1])}function nn(e,t){return t+1<e.length&&rn(e,t)}function an(e,t){if(t+1<e.length&&rn(e,t)){var r=tn(e,t),n=4
null!=r&&r.frameLength&&(n=r.frameLength)
var i=t+n
return i===e.length||nn(e,i)}return!1}var on=function(){function e(e){this.data=void 0,this.bytesAvailable=void 0,this.word=void 0,this.bitsAvailable=void 0,this.data=e,this.bytesAvailable=e.byteLength,this.word=0,this.bitsAvailable=0}var t=e.prototype
return t.loadWord=function(){var e=this.data,t=this.bytesAvailable,r=e.byteLength-t,n=new Uint8Array(4),i=Math.min(4,t)
if(0===i)throw new Error("no bytes available")
n.set(e.subarray(r,r+i)),this.word=new DataView(n.buffer).getUint32(0),this.bitsAvailable=8*i,this.bytesAvailable-=i},t.skipBits=function(e){var t
e=Math.min(e,8*this.bytesAvailable+this.bitsAvailable),this.bitsAvailable>e?(this.word<<=e,this.bitsAvailable-=e):(e-=this.bitsAvailable,e-=(t=e>>3)<<3,this.bytesAvailable-=t,this.loadWord(),this.word<<=e,this.bitsAvailable-=e)},t.readBits=function(e){var t=Math.min(this.bitsAvailable,e),r=this.word>>>32-t
if(e>32&&k.error("Cannot read more than 32 bits at a time"),this.bitsAvailable-=t,this.bitsAvailable>0)this.word<<=t
else{if(!(this.bytesAvailable>0))throw new Error("no bits available")
this.loadWord()}return(t=e-t)>0&&this.bitsAvailable?r<<t|this.readBits(t):r},t.skipLZ=function(){var e
for(e=0;e<this.bitsAvailable;++e)if(0!=(this.word&2147483648>>>e))return this.word<<=e,this.bitsAvailable-=e,e
return this.loadWord(),e+this.skipLZ()},t.skipUEG=function(){this.skipBits(1+this.skipLZ())},t.skipEG=function(){this.skipBits(1+this.skipLZ())},t.readUEG=function(){var e=this.skipLZ()
return this.readBits(e+1)-1},t.readEG=function(){var e=this.readUEG()
return 1&e?1+e>>>1:-1*(e>>>1)},t.readBoolean=function(){return 1===this.readBits(1)},t.readUByte=function(){return this.readBits(8)},t.readUShort=function(){return this.readBits(16)},t.readUInt=function(){return this.readBits(32)},t.skipScalingList=function(e){for(var t=8,r=8,n=0;n<e;n++)0!==r&&(r=(t+this.readEG()+256)%256),t=0===r?t:r},t.readSPS=function(){var e,t,r,n=0,i=0,a=0,o=0,s=this.readUByte.bind(this),u=this.readBits.bind(this),l=this.readUEG.bind(this),c=this.readBoolean.bind(this),d=this.skipBits.bind(this),h=this.skipEG.bind(this),f=this.skipUEG.bind(this),p=this.skipScalingList.bind(this)
s()
var g=s()
if(u(5),d(3),s(),f(),100===g||110===g||122===g||244===g||44===g||83===g||86===g||118===g||128===g){var m=l()
if(3===m&&d(1),f(),f(),d(1),c())for(t=3!==m?8:12,r=0;r<t;r++)c()&&p(r<6?16:64)}f()
var v=l()
if(0===v)l()
else if(1===v)for(d(1),h(),h(),e=l(),r=0;r<e;r++)h()
f(),d(1)
var y=l(),b=l(),E=u(1)
0===E&&d(1),d(1),c()&&(n=l(),i=l(),a=l(),o=l())
var w=[1,1]
if(c()&&c())switch(s()){case 1:w=[1,1]
break
case 2:w=[12,11]
break
case 3:w=[10,11]
break
case 4:w=[16,11]
break
case 5:w=[40,33]
break
case 6:w=[24,11]
break
case 7:w=[20,11]
break
case 8:w=[32,11]
break
case 9:w=[80,33]
break
case 10:w=[18,11]
break
case 11:w=[15,11]
break
case 12:w=[64,33]
break
case 13:w=[160,99]
break
case 14:w=[4,3]
break
case 15:w=[3,2]
break
case 16:w=[2,1]
break
case 255:w=[s()<<8|s(),s()<<8|s()]}return{width:Math.ceil(16*(y+1)-2*n-2*i),height:(2-E)*(b+1)*16-(E?2:4)*(a+o),pixelRatio:w}},t.readSliceType=function(){return this.readUByte(),this.readUEG(),this.readUEG()},e}(),sn=function(){function e(e,t,r){this.keyData=void 0,this.decrypter=void 0,this.keyData=r,this.decrypter=new Er(t,{removePKCS7Padding:!1})}var t=e.prototype
return t.decryptBuffer=function(e){return this.decrypter.decrypt(e,this.keyData.key.buffer,this.keyData.iv.buffer)},t.decryptAacSample=function(e,t,r){var n=this,i=e[t].unit
if(!(i.length<=16)){var a=i.subarray(16,i.length-i.length%16),o=a.buffer.slice(a.byteOffset,a.byteOffset+a.length)
this.decryptBuffer(o).then((function(a){var o=new Uint8Array(a)
i.set(o,16),n.decrypter.isSync()||n.decryptAacSamples(e,t+1,r)}))}},t.decryptAacSamples=function(e,t,r){for(;;t++){if(t>=e.length)return void r()
if(!(e[t].unit.length<32||(this.decryptAacSample(e,t,r),this.decrypter.isSync())))return}},t.getAvcEncryptedData=function(e){for(var t=16*Math.floor((e.length-48)/160)+16,r=new Int8Array(t),n=0,i=32;i<e.length-16;i+=160,n+=16)r.set(e.subarray(i,i+16),n)
return r},t.getAvcDecryptedUnit=function(e,t){for(var r=new Uint8Array(t),n=0,i=32;i<e.length-16;i+=160,n+=16)e.set(r.subarray(n,n+16),i)
return e},t.decryptAvcSample=function(e,t,r,n,i){var a=this,o=Ie(i.data),s=this.getAvcEncryptedData(o)
this.decryptBuffer(s.buffer).then((function(s){i.data=a.getAvcDecryptedUnit(o,s),a.decrypter.isSync()||a.decryptAvcSamples(e,t,r+1,n)}))},t.decryptAvcSamples=function(e,t,r,n){if(e instanceof Uint8Array)throw new Error("Cannot decrypt samples of type Uint8Array")
for(;;t++,r=0){if(t>=e.length)return void n()
for(var i=e[t].units;!(r>=i.length);r++){var a=i[r]
if(!(a.data.length<=48||1!==a.type&&5!==a.type||(this.decryptAvcSample(e,t,r,n,a),this.decrypter.isSync())))return}}},e}(),un=188,ln=function(){function e(e,t,r){this.observer=void 0,this.config=void 0,this.typeSupported=void 0,this.sampleAes=null,this.pmtParsed=!1,this.audioCodec=void 0,this.videoCodec=void 0,this._duration=0,this._pmtId=-1,this._avcTrack=void 0,this._audioTrack=void 0,this._id3Track=void 0,this._txtTrack=void 0,this.aacOverFlow=null,this.avcSample=null,this.remainderData=null,this.observer=e,this.config=t,this.typeSupported=r}e.probe=function(t){var r=e.syncOffset(t)
return r>0&&k.warn("MPEG2-TS detected but first sync word found @ offset "+r),-1!==r},e.syncOffset=function(e){for(var t=e.length,r=Math.min(940,e.length-un)+1,n=0;n<r;){for(var i=!1,a=n;a<t&&71===e[a];a+=un)if(i||0!==dn(e,a)||(i=!0),i&&a+un>r)return n
n++}return-1},e.createTrack=function(e,t){return{container:"video"===e||"audio"===e?"video/mp2t":void 0,type:e,id:ve[e],pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],dropped:0,duration:"audio"===e?t:void 0}}
var t=e.prototype
return t.resetInitSegment=function(t,r,n,i){this.pmtParsed=!1,this._pmtId=-1,this._avcTrack=e.createTrack("video"),this._audioTrack=e.createTrack("audio",i),this._id3Track=e.createTrack("id3"),this._txtTrack=e.createTrack("text"),this._audioTrack.segmentCodec="aac",this.aacOverFlow=null,this.avcSample=null,this.remainderData=null,this.audioCodec=r,this.videoCodec=n,this._duration=i},t.resetTimeStamp=function(){},t.resetContiguity=function(){var e=this._audioTrack,t=this._avcTrack,r=this._id3Track
e&&(e.pesData=null),t&&(t.pesData=null),r&&(r.pesData=null),this.aacOverFlow=null,this.avcSample=null,this.remainderData=null},t.demux=function(t,r,n,i){var a
void 0===n&&(n=!1),void 0===i&&(i=!1),n||(this.sampleAes=null)
var o=this._avcTrack,s=this._audioTrack,u=this._id3Track,l=this._txtTrack,c=o.pid,d=o.pesData,h=s.pid,f=u.pid,p=s.pesData,g=u.pesData,m=null,v=this.pmtParsed,y=this._pmtId,_=t.length
if(this.remainderData&&(_=(t=xe(this.remainderData,t)).length,this.remainderData=null),_<un&&!i)return this.remainderData=t,{audioTrack:s,videoTrack:o,id3Track:u,textTrack:l}
var T=Math.max(0,e.syncOffset(t));(_-=(_-T)%un)<t.byteLength&&!i&&(this.remainderData=new Uint8Array(t.buffer,_,t.buffer.byteLength-_))
for(var A=0,D=T;D<_;D+=un)if(71===t[D]){var S=!!(64&t[D+1]),x=dn(t,D),C=void 0
if((48&t[D+3])>>4>1){if((C=D+5+t[D+4])===D+un)continue}else C=D+4
switch(x){case c:S&&(d&&(a=pn(d))&&this.parseAVCPES(o,l,a,!1),d={data:[],size:0}),d&&(d.data.push(t.subarray(C,D+un)),d.size+=D+un-C)
break
case h:if(S){if(p&&(a=pn(p)))switch(s.segmentCodec){case"aac":this.parseAACPES(s,a)
break
case"mp3":this.parseMPEGPES(s,a)}p={data:[],size:0}}p&&(p.data.push(t.subarray(C,D+un)),p.size+=D+un-C)
break
case f:S&&(g&&(a=pn(g))&&this.parseID3PES(u,a),g={data:[],size:0}),g&&(g.data.push(t.subarray(C,D+un)),g.size+=D+un-C)
break
case 0:S&&(C+=t[C]+1),y=this._pmtId=hn(t,C)
break
case y:S&&(C+=t[C]+1)
var L=fn(t,C,this.typeSupported,n);(c=L.avc)>0&&(o.pid=c),(h=L.audio)>0&&(s.pid=h,s.segmentCodec=L.segmentCodec),(f=L.id3)>0&&(u.pid=f),null===m||v||(k.warn("MPEG-TS PMT found at "+D+" after unknown PID '"+m+"'. Backtracking to sync byte @"+T+" to parse all TS packets."),m=null,D=T-188),v=this.pmtParsed=!0
break
case 17:case 8191:break
default:m=x}}else A++
if(A>0){var R=new Error("Found "+A+" TS packet/s that do not start with 0x47")
this.observer.emit(b.ERROR,b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,fatal:!1,error:R,reason:R.message})}o.pesData=d,s.pesData=p,u.pesData=g
var I={audioTrack:s,videoTrack:o,id3Track:u,textTrack:l}
return i&&this.extractRemainingSamples(I),I},t.flush=function(){var e,t=this.remainderData
return this.remainderData=null,e=t?this.demux(t,-1,!1,!0):{videoTrack:this._avcTrack,audioTrack:this._audioTrack,id3Track:this._id3Track,textTrack:this._txtTrack},this.extractRemainingSamples(e),this.sampleAes?this.decrypt(e,this.sampleAes):e},t.extractRemainingSamples=function(e){var t,r=e.audioTrack,n=e.videoTrack,i=e.id3Track,a=e.textTrack,o=n.pesData,s=r.pesData,u=i.pesData
if(o&&(t=pn(o))?(this.parseAVCPES(n,a,t,!0),n.pesData=null):n.pesData=o,s&&(t=pn(s))){switch(r.segmentCodec){case"aac":this.parseAACPES(r,t)
break
case"mp3":this.parseMPEGPES(r,t)}r.pesData=null}else null!=s&&s.size&&k.log("last AAC PES packet truncated,might overlap between fragments"),r.pesData=s
u&&(t=pn(u))?(this.parseID3PES(i,t),i.pesData=null):i.pesData=u},t.demuxSampleAes=function(e,t,r){var n=this.demux(e,r,!0,!this.config.progressive),i=this.sampleAes=new sn(this.observer,this.config,t)
return this.decrypt(n,i)},t.decrypt=function(e,t){return new Promise((function(r){var n=e.audioTrack,i=e.videoTrack
n.samples&&"aac"===n.segmentCodec?t.decryptAacSamples(n.samples,0,(function(){i.samples?t.decryptAvcSamples(i.samples,0,0,(function(){r(e)})):r(e)})):i.samples&&t.decryptAvcSamples(i.samples,0,0,(function(){r(e)}))}))},t.destroy=function(){this._duration=0},t.parseAVCPES=function(e,t,r,n){var i,a=this,o=this.parseAVCNALu(e,r.data),s=this.avcSample,u=!1
r.data=null,s&&o.length&&!e.audFound&&(gn(s,e),s=this.avcSample=cn(!1,r.pts,r.dts,"")),o.forEach((function(n){switch(n.type){case 1:i=!0,s||(s=a.avcSample=cn(!0,r.pts,r.dts,"")),s.frame=!0
var o=n.data
if(u&&o.length>4){var l=new on(o).readSliceType()
2!==l&&4!==l&&7!==l&&9!==l||(s.key=!0)}break
case 5:i=!0,s||(s=a.avcSample=cn(!0,r.pts,r.dts,"")),s.key=!0,s.frame=!0
break
case 6:i=!0,Re(n.data,1,r.pts,t.samples)
break
case 7:if(i=!0,u=!0,!e.sps){var c=n.data,d=new on(c).readSPS()
e.width=d.width,e.height=d.height,e.pixelRatio=d.pixelRatio,e.sps=[c],e.duration=a._duration
for(var h=c.subarray(1,4),f="avc1.",p=0;p<3;p++){var g=h[p].toString(16)
g.length<2&&(g="0"+g),f+=g}e.codec=f}break
case 8:i=!0,e.pps||(e.pps=[n.data])
break
case 9:i=!1,e.audFound=!0,s&&gn(s,e),s=a.avcSample=cn(!1,r.pts,r.dts,"")
break
case 12:i=!0
break
default:i=!1,s&&(s.debug+="unknown NAL "+n.type+" ")}s&&i&&s.units.push(n)})),n&&s&&(gn(s,e),this.avcSample=null)},t.getLastNalUnit=function(e){var t,r,n=this.avcSample
if(n&&0!==n.units.length||(n=e[e.length-1]),null!=(t=n)&&t.units){var i=n.units
r=i[i.length-1]}return r},t.parseAVCNALu=function(e,t){var r,n,i=t.byteLength,a=e.naluState||0,o=a,s=[],u=0,l=-1,c=0
for(-1===a&&(l=0,c=31&t[0],a=0,u=1);u<i;)if(r=t[u++],a)if(1!==a)if(r)if(1===r){if(l>=0){var d={data:t.subarray(l,u-a-1),type:c}
s.push(d)}else{var h=this.getLastNalUnit(e.samples)
if(h&&(o&&u<=4-o&&h.state&&(h.data=h.data.subarray(0,h.data.byteLength-o)),(n=u-a-1)>0)){var f=new Uint8Array(h.data.byteLength+n)
f.set(h.data,0),f.set(t.subarray(0,n),h.data.byteLength),h.data=f,h.state=0}}u<i?(l=u,c=31&t[u],a=0):a=-1}else a=0
else a=3
else a=r?0:2
else a=r?0:1
if(l>=0&&a>=0){var p={data:t.subarray(l,i),type:c,state:a}
s.push(p)}if(0===s.length){var g=this.getLastNalUnit(e.samples)
if(g){var m=new Uint8Array(g.data.byteLength+t.byteLength)
m.set(g.data,0),m.set(t,g.data.byteLength),g.data=m}}return e.naluState=a,s},t.parseAACPES=function(e,t){var r,n,i,a=0,o=this.aacOverFlow,s=t.data
if(o){this.aacOverFlow=null
var u=o.missing,l=o.sample.unit.byteLength
if(-1===u){var c=new Uint8Array(l+s.byteLength)
c.set(o.sample.unit,0),c.set(s,l),s=c}else{var d=l-u
o.sample.unit.set(s.subarray(0,u),d),e.samples.push(o.sample),a=o.missing}}for(r=a,n=s.length;r<n-1&&!jr(s,r);r++);if(r!==a){var h,f=r<n-1
h=f?"AAC PES did not start with ADTS header,offset:"+r:"No ADTS header found in AAC PES"
var p=new Error(h)
if(k.warn("parsing error: "+h),this.observer.emit(b.ERROR,b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,fatal:!1,levelRetry:f,error:p,reason:h}),!f)return}if(Hr(e,this.observer,s,r,this.audioCodec),void 0!==t.pts)i=t.pts
else{if(!o)return void k.warn("[tsdemuxer]: AAC PES unknown PTS")
var g=Vr(e.samplerate)
i=o.sample.pts+g}for(var m,v=0;r<n;){if(r+=(m=zr(e,s,r,i,v)).length,m.missing){this.aacOverFlow=m
break}for(v++;r<n-1&&!jr(s,r);r++);}},t.parseMPEGPES=function(e,t){var r=t.data,n=r.length,i=0,a=0,o=t.pts
if(void 0!==o)for(;a<n;)if(nn(r,a)){var s=en(e,r,a,o,i)
if(!s)break
a+=s.length,i++}else a++
else k.warn("[tsdemuxer]: MPEG PES unknown PTS")},t.parseID3PES=function(e,t){if(void 0!==t.pts){var r=s({},t,{type:this._avcTrack?bt:yt,duration:Number.POSITIVE_INFINITY})
e.samples.push(r)}else k.warn("[tsdemuxer]: ID3 PES unknown PTS")},e}()
function cn(e,t,r,n){return{key:e,frame:!1,pts:t,dts:r,units:[],debug:n,length:0}}function dn(e,t){return((31&e[t+1])<<8)+e[t+2]}function hn(e,t){return(31&e[t+10])<<8|e[t+11]}function fn(e,t,r,n){var i={audio:-1,avc:-1,id3:-1,segmentCodec:"aac"},a=t+3+((15&e[t+1])<<8|e[t+2])-4
for(t+=12+((15&e[t+10])<<8|e[t+11]);t<a;){var o=dn(e,t)
switch(e[t]){case 207:if(!n){k.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream")
break}case 15:-1===i.audio&&(i.audio=o)
break
case 21:-1===i.id3&&(i.id3=o)
break
case 219:if(!n){k.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream")
break}case 27:-1===i.avc&&(i.avc=o)
break
case 3:case 4:!0!==r.mpeg&&!0!==r.mp3?k.log("MPEG audio found, not supported in this browser"):-1===i.audio&&(i.audio=o,i.segmentCodec="mp3")
break
case 36:k.warn("Unsupported HEVC stream type found")}t+=5+((15&e[t+3])<<8|e[t+4])}return i}function pn(e){var t,r,n,i,a,o=0,s=e.data
if(!e||0===e.size)return null
for(;s[0].length<19&&s.length>1;){var u=new Uint8Array(s[0].length+s[1].length)
u.set(s[0]),u.set(s[1],s[0].length),s[0]=u,s.splice(1,1)}if(1===((t=s[0])[0]<<16)+(t[1]<<8)+t[2]){if((r=(t[4]<<8)+t[5])&&r>e.size-6)return null
var l=t[7]
192&l&&(i=536870912*(14&t[9])+4194304*(255&t[10])+16384*(254&t[11])+128*(255&t[12])+(254&t[13])/2,64&l?i-(a=536870912*(14&t[14])+4194304*(255&t[15])+16384*(254&t[16])+128*(255&t[17])+(254&t[18])/2)>54e5&&(k.warn(Math.round((i-a)/9e4)+"s delta between PTS and DTS, align them"),i=a):a=i)
var c=(n=t[8])+9
if(e.size<=c)return null
e.size-=c
for(var d=new Uint8Array(e.size),h=0,f=s.length;h<f;h++){var p=(t=s[h]).byteLength
if(c){if(c>p){c-=p
continue}t=t.subarray(c),p-=c,c=0}d.set(t,o),o+=p}return r&&(r-=n+3),{data:d,pts:i,dts:a,len:r}}return null}function gn(e,t){if(e.units.length&&e.frame){if(void 0===e.pts){var r=t.samples,n=r.length
if(!n)return void t.dropped++
var i=r[n-1]
e.pts=i.pts,e.dts=i.dts}t.samples.push(e)}e.debug.length&&k.log(e.pts+"/"+e.dts+":"+e.debug)}var mn=function(e){function t(){return e.apply(this,arguments)||this}u(t,e)
var r=t.prototype
return r.resetInitSegment=function(t,r,n,i){e.prototype.resetInitSegment.call(this,t,r,n,i),this._audioTrack={container:"audio/mpeg",type:"audio",id:2,pid:-1,sequenceNumber:0,segmentCodec:"mp3",samples:[],manifestCodec:r,duration:i,inputTimeScale:9e4,dropped:0}},t.probe=function(e){if(!e)return!1
for(var t=(re(e,0)||[]).length,r=e.length;t<r;t++)if(an(e,t))return k.log("MPEG Audio sync word found !"),!0
return!1},r.canParse=function(e,t){return function(e,t){return rn(e,t)&&4<=e.length-t}(e,t)},r.appendFrame=function(e,t,r){if(null!==this.basePTS)return en(e,t,r,this.basePTS,this.frameIndex)},t}(Nr),vn=function(){function e(){}return e.getSilentFrame=function(e,t){if("mp4a.40.2"===e){if(1===t)return new Uint8Array([0,200,0,128,35,128])
if(2===t)return new Uint8Array([33,0,73,144,2,25,0,35,128])
if(3===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,142])
if(4===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,128,44,128,8,2,56])
if(5===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,56])
if(6===t)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,0,178,0,32,8,224])}else{if(1===t)return new Uint8Array([1,64,34,128,163,78,230,128,186,8,0,0,0,28,6,241,193,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])
if(2===t)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])
if(3===t)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])}},e}(),yn=Math.pow(2,32)-1,bn=function(){function e(){}return e.init=function(){var t
for(t in e.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],".mp3":[],mvex:[],mvhd:[],pasp:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[]},e.types)e.types.hasOwnProperty(t)&&(e.types[t]=[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)])
var r=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),n=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0])
e.HDLR_TYPES={video:r,audio:n}
var i=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),a=new Uint8Array([0,0,0,0,0,0,0,0])
e.STTS=e.STSC=e.STCO=a,e.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),e.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0]),e.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),e.STSD=new Uint8Array([0,0,0,0,0,0,0,1])
var o=new Uint8Array([105,115,111,109]),s=new Uint8Array([97,118,99,49]),u=new Uint8Array([0,0,0,1])
e.FTYP=e.box(e.types.ftyp,o,u,o,s),e.DINF=e.box(e.types.dinf,e.box(e.types.dref,i))},e.box=function(e){for(var t=8,r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i]
for(var a=n.length,o=a;a--;)t+=n[a].byteLength
var s=new Uint8Array(t)
for(s[0]=t>>24&255,s[1]=t>>16&255,s[2]=t>>8&255,s[3]=255&t,s.set(e,4),a=0,t=8;a<o;a++)s.set(n[a],t),t+=n[a].byteLength
return s},e.hdlr=function(t){return e.box(e.types.hdlr,e.HDLR_TYPES[t])},e.mdat=function(t){return e.box(e.types.mdat,t)},e.mdhd=function(t,r){r*=t
var n=Math.floor(r/(yn+1)),i=Math.floor(r%(yn+1))
return e.box(e.types.mdhd,new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,t>>24&255,t>>16&255,t>>8&255,255&t,n>>24,n>>16&255,n>>8&255,255&n,i>>24,i>>16&255,i>>8&255,255&i,85,196,0,0]))},e.mdia=function(t){return e.box(e.types.mdia,e.mdhd(t.timescale,t.duration),e.hdlr(t.type),e.minf(t))},e.mfhd=function(t){return e.box(e.types.mfhd,new Uint8Array([0,0,0,0,t>>24,t>>16&255,t>>8&255,255&t]))},e.minf=function(t){return"audio"===t.type?e.box(e.types.minf,e.box(e.types.smhd,e.SMHD),e.DINF,e.stbl(t)):e.box(e.types.minf,e.box(e.types.vmhd,e.VMHD),e.DINF,e.stbl(t))},e.moof=function(t,r,n){return e.box(e.types.moof,e.mfhd(t),e.traf(n,r))},e.moov=function(t){for(var r=t.length,n=[];r--;)n[r]=e.trak(t[r])
return e.box.apply(null,[e.types.moov,e.mvhd(t[0].timescale,t[0].duration)].concat(n).concat(e.mvex(t)))},e.mvex=function(t){for(var r=t.length,n=[];r--;)n[r]=e.trex(t[r])
return e.box.apply(null,[e.types.mvex].concat(n))},e.mvhd=function(t,r){r*=t
var n=Math.floor(r/(yn+1)),i=Math.floor(r%(yn+1)),a=new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,t>>24&255,t>>16&255,t>>8&255,255&t,n>>24,n>>16&255,n>>8&255,255&n,i>>24,i>>16&255,i>>8&255,255&i,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255])
return e.box(e.types.mvhd,a)},e.sdtp=function(t){var r,n,i=t.samples||[],a=new Uint8Array(4+i.length)
for(r=0;r<i.length;r++)n=i[r].flags,a[r+4]=n.dependsOn<<4|n.isDependedOn<<2|n.hasRedundancy
return e.box(e.types.sdtp,a)},e.stbl=function(t){return e.box(e.types.stbl,e.stsd(t),e.box(e.types.stts,e.STTS),e.box(e.types.stsc,e.STSC),e.box(e.types.stsz,e.STSZ),e.box(e.types.stco,e.STCO))},e.avc1=function(t){var r,n,i,a=[],o=[]
for(r=0;r<t.sps.length;r++)i=(n=t.sps[r]).byteLength,a.push(i>>>8&255),a.push(255&i),a=a.concat(Array.prototype.slice.call(n))
for(r=0;r<t.pps.length;r++)i=(n=t.pps[r]).byteLength,o.push(i>>>8&255),o.push(255&i),o=o.concat(Array.prototype.slice.call(n))
var s=e.box(e.types.avcC,new Uint8Array([1,a[3],a[4],a[5],255,224|t.sps.length].concat(a).concat([t.pps.length]).concat(o))),u=t.width,l=t.height,c=t.pixelRatio[0],d=t.pixelRatio[1]
return e.box(e.types.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,u>>8&255,255&u,l>>8&255,255&l,0,72,0,0,0,72,0,0,0,0,0,0,0,1,18,100,97,105,108,121,109,111,116,105,111,110,47,104,108,115,46,106,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),s,e.box(e.types.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])),e.box(e.types.pasp,new Uint8Array([c>>24,c>>16&255,c>>8&255,255&c,d>>24,d>>16&255,d>>8&255,255&d])))},e.esds=function(e){var t=e.config.length
return new Uint8Array([0,0,0,0,3,23+t,0,1,0,4,15+t,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([t]).concat(e.config).concat([6,1,2]))},e.mp4a=function(t){var r=t.samplerate
return e.box(e.types.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t.channelCount,0,16,0,0,0,0,r>>8&255,255&r,0,0]),e.box(e.types.esds,e.esds(t)))},e.mp3=function(t){var r=t.samplerate
return e.box(e.types[".mp3"],new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t.channelCount,0,16,0,0,0,0,r>>8&255,255&r,0,0]))},e.stsd=function(t){return"audio"===t.type?"mp3"===t.segmentCodec&&"mp3"===t.codec?e.box(e.types.stsd,e.STSD,e.mp3(t)):e.box(e.types.stsd,e.STSD,e.mp4a(t)):e.box(e.types.stsd,e.STSD,e.avc1(t))},e.tkhd=function(t){var r=t.id,n=t.duration*t.timescale,i=t.width,a=t.height,o=Math.floor(n/(yn+1)),s=Math.floor(n%(yn+1))
return e.box(e.types.tkhd,new Uint8Array([1,0,0,7,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,r>>24&255,r>>16&255,r>>8&255,255&r,0,0,0,0,o>>24,o>>16&255,o>>8&255,255&o,s>>24,s>>16&255,s>>8&255,255&s,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,i>>8&255,255&i,0,0,a>>8&255,255&a,0,0]))},e.traf=function(t,r){var n=e.sdtp(t),i=t.id,a=Math.floor(r/(yn+1)),o=Math.floor(r%(yn+1))
return e.box(e.types.traf,e.box(e.types.tfhd,new Uint8Array([0,0,0,0,i>>24,i>>16&255,i>>8&255,255&i])),e.box(e.types.tfdt,new Uint8Array([1,0,0,0,a>>24,a>>16&255,a>>8&255,255&a,o>>24,o>>16&255,o>>8&255,255&o])),e.trun(t,n.length+16+20+8+16+8+8),n)},e.trak=function(t){return t.duration=t.duration||4294967295,e.box(e.types.trak,e.tkhd(t),e.mdia(t))},e.trex=function(t){var r=t.id
return e.box(e.types.trex,new Uint8Array([0,0,0,0,r>>24,r>>16&255,r>>8&255,255&r,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]))},e.trun=function(t,r){var n,i,a,o,s,u,l=t.samples||[],c=l.length,d=12+16*c,h=new Uint8Array(d)
for(r+=8+d,h.set(["video"===t.type?1:0,0,15,1,c>>>24&255,c>>>16&255,c>>>8&255,255&c,r>>>24&255,r>>>16&255,r>>>8&255,255&r],0),n=0;n<c;n++)a=(i=l[n]).duration,o=i.size,s=i.flags,u=i.cts,h.set([a>>>24&255,a>>>16&255,a>>>8&255,255&a,o>>>24&255,o>>>16&255,o>>>8&255,255&o,s.isLeading<<2|s.dependsOn,s.isDependedOn<<6|s.hasRedundancy<<4|s.paddingValue<<1|s.isNonSync,61440&s.degradPrio,15&s.degradPrio,u>>>24&255,u>>>16&255,u>>>8&255,255&u],12+16*n)
return e.box(e.types.trun,h)},e.initSegment=function(t){e.types||e.init()
var r=e.moov(t),n=new Uint8Array(e.FTYP.byteLength+r.byteLength)
return n.set(e.FTYP),n.set(r,e.FTYP.byteLength),n},e}()
bn.types=void 0,bn.HDLR_TYPES=void 0,bn.STTS=void 0,bn.STSC=void 0,bn.STCO=void 0,bn.STSZ=void 0,bn.VMHD=void 0,bn.SMHD=void 0,bn.STSD=void 0,bn.FTYP=void 0,bn.DINF=void 0
function En(e,t,r,n){void 0===r&&(r=1),void 0===n&&(n=!1)
var i=e*t*r
return n?Math.round(i):i}function wn(e,t){return void 0===t&&(t=!1),En(e,1e3,1/9e4,t)}var _n=null,Tn=null,An=function(){function e(e,t,r,n){if(this.observer=void 0,this.config=void 0,this.typeSupported=void 0,this.ISGenerated=!1,this._initPTS=null,this._initDTS=null,this.nextAvcDts=null,this.nextAudioPts=null,this.videoSampleDuration=null,this.isAudioContiguous=!1,this.isVideoContiguous=!1,this.observer=e,this.config=t,this.typeSupported=r,this.ISGenerated=!1,null===_n){var i=(navigator.userAgent||"").match(/Chrome\/(\d+)/i)
_n=i?parseInt(i[1]):0}if(null===Tn){var a=navigator.userAgent.match(/Safari\/(\d+)/i)
Tn=a?parseInt(a[1]):0}}var t=e.prototype
return t.destroy=function(){},t.resetTimeStamp=function(e){k.log("[mp4-remuxer]: initPTS & initDTS reset"),this._initPTS=this._initDTS=e},t.resetNextTimestamp=function(){k.log("[mp4-remuxer]: reset next timestamp"),this.isVideoContiguous=!1,this.isAudioContiguous=!1},t.resetInitSegment=function(){k.log("[mp4-remuxer]: ISGenerated flag reset"),this.ISGenerated=!1},t.getVideoStartPts=function(e){var t=!1,r=e.reduce((function(e,r){var n=r.pts-e
return n<-4294967296?(t=!0,Dn(e,r.pts)):n>0?e:r.pts}),e[0].pts)
return t&&k.debug("PTS rollover detected"),r},t.remux=function(e,t,r,n,i,a,o,s){var u,l,c,d,h,f,p=i,g=i,m=e.pid>-1,v=t.pid>-1,y=t.samples.length,b=e.samples.length>0,E=o&&y>0||y>1
if((!m||b)&&(!v||E)||this.ISGenerated||o){this.ISGenerated||(c=this.generateIS(e,t,i,a))
var w,_=this.isVideoContiguous,T=-1
if(E&&(T=function(e){for(var t=0;t<e.length;t++)if(e[t].key)return t
return-1}(t.samples),!_&&this.config.forceKeyFrameOnDiscontinuity))if(f=!0,T>0){k.warn("[mp4-remuxer]: Dropped "+T+" out of "+y+" video samples due to a missing keyframe")
var A=this.getVideoStartPts(t.samples)
t.samples=t.samples.slice(T),t.dropped+=T,w=g+=(t.samples[0].pts-A)/t.inputTimeScale}else-1===T&&(k.warn("[mp4-remuxer]: No keyframe found out of "+y+" video samples"),f=!1)
if(this.ISGenerated){if(b&&E){var D=this.getVideoStartPts(t.samples),S=(Dn(e.samples[0].pts,D)-D)/t.inputTimeScale
p+=Math.max(0,S),g+=Math.max(0,-S)}if(b){if(e.samplerate||(k.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"),c=this.generateIS(e,t,i,a)),l=this.remuxAudio(e,p,this.isAudioContiguous,a,v||E||s===lt?g:void 0),E){var x=l?l.endPTS-l.startPTS:0
t.inputTimeScale||(k.warn("[mp4-remuxer]: regenerate InitSegment as video detected"),c=this.generateIS(e,t,i,a)),u=this.remuxVideo(t,g,_,x)}}else E&&(u=this.remuxVideo(t,g,_,0))
u&&(u.firstKeyFrame=T,u.independent=-1!==T,u.firstKeyFramePTS=w)}}return this.ISGenerated&&this._initPTS&&this._initDTS&&(r.samples.length&&(h=kn(r,i,this._initPTS,this._initDTS)),n.samples.length&&(d=Sn(n,i,this._initPTS))),{audio:l,video:u,initSegment:c,independent:f,text:d,id3:h}},t.generateIS=function(e,t,r,n){var i,a,o,s=e.samples,u=t.samples,l=this.typeSupported,c={},d=this._initPTS,h=!d||n,f="audio/mp4"
if(h&&(i=a=1/0),e.config&&s.length&&(e.timescale=e.samplerate,"mp3"===e.segmentCodec&&(l.mpeg?(f="audio/mpeg",e.codec=""):l.mp3&&(e.codec="mp3")),c.audio={id:"audio",container:f,codec:e.codec,initSegment:"mp3"===e.segmentCodec&&l.mpeg?new Uint8Array(0):bn.initSegment([e]),metadata:{channelCount:e.channelCount}},h&&(o=e.inputTimeScale,d&&o===d.timescale?h=!1:i=a=s[0].pts-Math.round(o*r))),t.sps&&t.pps&&u.length&&(t.timescale=t.inputTimeScale,c.video={id:"main",container:"video/mp4",codec:t.codec,initSegment:bn.initSegment([t]),metadata:{width:t.width,height:t.height}},h))if(o=t.inputTimeScale,d&&o===d.timescale)h=!1
else{var p=this.getVideoStartPts(u),g=Math.round(o*r)
a=Math.min(a,Dn(u[0].dts,p)-g),i=Math.min(i,p-g)}if(Object.keys(c).length)return this.ISGenerated=!0,h?(this._initPTS={baseTime:i,timescale:o},this._initDTS={baseTime:a,timescale:o}):i=o=void 0,{tracks:c,initPTS:i,timescale:o}},t.remuxVideo=function(e,t,r,n){var i,a,o=e.inputTimeScale,u=e.samples,l=[],c=u.length,d=this._initPTS,h=this.nextAvcDts,f=8,p=this.videoSampleDuration,g=Number.POSITIVE_INFINITY,m=Number.NEGATIVE_INFINITY,v=!1
r&&null!==h||(h=t*o-(u[0].pts-Dn(u[0].dts,u[0].pts)))
for(var y=d.baseTime*o/d.timescale,_=0;_<c;_++){var T=u[_]
T.pts=Dn(T.pts-y,h),T.dts=Dn(T.dts-y,h),T.dts<u[_>0?_-1:_].dts&&(v=!0)}v&&u.sort((function(e,t){var r=e.dts-t.dts,n=e.pts-t.pts
return r||n})),i=u[0].dts
var A=u[u.length-1].dts-i,D=A?Math.round(A/(c-1)):p||e.inputTimeScale/30
if(r){var S=i-h,x=S>D,C=S<-1
if((x||C)&&(x?k.warn("AVC: "+wn(S,!0)+" ms ("+S+"dts) hole between fragments detected, filling it"):k.warn("AVC: "+wn(-S,!0)+" ms ("+S+"dts) overlapping between fragments detected"),!C||h>u[0].pts)){i=h
var L=u[0].pts-S
u[0].dts=i,u[0].pts=L,k.log("Video: First PTS/DTS adjusted: "+wn(L,!0)+"/"+wn(i,!0)+", delta: "+wn(S,!0)+" ms")}}i=Math.max(0,i)
for(var R=0,I=0,O=0;O<c;O++){for(var F=u[O],P=F.units,N=P.length,M=0,B=0;B<N;B++)M+=P[B].data.length
I+=M,R+=N,F.length=M,F.dts=Math.max(F.dts,i),g=Math.min(F.pts,g),m=Math.max(F.pts,m)}a=u[c-1].dts
var U,q=I+4*R+8
try{U=new Uint8Array(q)}catch(e){return void this.observer.emit(b.ERROR,b.ERROR,{type:E.MUX_ERROR,details:w.REMUX_ALLOC_ERROR,fatal:!1,error:e,bytes:q,reason:"fail allocating video mdat "+q})}var j=new DataView(U.buffer)
j.setUint32(0,q),U.set(bn.types.mdat,4)
for(var G=!1,H=Number.POSITIVE_INFINITY,V=Number.POSITIVE_INFINITY,z=Number.NEGATIVE_INFINITY,K=Number.NEGATIVE_INFINITY,W=0;W<c;W++){for(var $=u[W],Y=$.units,Q=0,X=0,Z=Y.length;X<Z;X++){var J=Y[X],ee=J.data,te=J.data.byteLength
j.setUint32(f,te),f+=4,U.set(ee,f),f+=te,Q+=4+te}var re=void 0
if(W<c-1)p=u[W+1].dts-$.dts,re=u[W+1].pts-$.pts
else{var ne=this.config,ie=W>0?$.dts-u[W-1].dts:D
if(re=W>0?$.pts-u[W-1].pts:D,ne.stretchShortVideoTrack&&null!==this.nextAudioPts){var ae=Math.floor(ne.maxBufferHole*o),oe=(n?g+n*o:this.nextAudioPts)-$.pts
oe>ae?((p=oe-ie)<0?p=ie:G=!0,k.log("[mp4-remuxer]: It is approximately "+oe/90+" ms to the next segment; using duration "+p/90+" ms for the last video frame.")):p=ie}else p=ie}var se=Math.round($.pts-$.dts)
H=Math.min(H,p),z=Math.max(z,p),V=Math.min(V,re),K=Math.max(K,re),l.push(new Cn($.key,p,Q,se))}if(l.length)if(_n){if(_n<70){var ue=l[0].flags
ue.dependsOn=2,ue.isNonSync=0}}else if(Tn&&K-V<z-H&&D/z<.025&&0===l[0].cts){k.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.")
for(var le=i,ce=0,de=l.length;ce<de;ce++){var he=le+l[ce].duration,fe=le+l[ce].cts
if(ce<de-1){var pe=he+l[ce+1].cts
l[ce].duration=pe-fe}else l[ce].duration=ce?l[ce-1].duration:D
l[ce].cts=0,le=he}}p=G||!p?D:p,this.nextAvcDts=h=a+p,this.videoSampleDuration=p,this.isVideoContiguous=!0
var ge={data1:bn.moof(e.sequenceNumber++,i,s({},e,{samples:l})),data2:U,startPTS:g/o,endPTS:(m+p)/o,startDTS:i/o,endDTS:h/o,type:"video",hasAudio:!1,hasVideo:!0,nb:l.length,dropped:e.dropped}
return e.samples=[],e.dropped=0,ge},t.remuxAudio=function(e,t,r,n,i){var a=e.inputTimeScale,o=a/(e.samplerate?e.samplerate:a),u="aac"===e.segmentCodec?1024:1152,l=u*o,c=this._initPTS,d="mp3"===e.segmentCodec&&this.typeSupported.mpeg,h=[],f=void 0!==i,p=e.samples,g=d?0:8,m=this.nextAudioPts||-1,v=t*a,y=c.baseTime*a/c.timescale
if(this.isAudioContiguous=r=r||p.length&&m>0&&(n&&Math.abs(v-m)<9e3||Math.abs(Dn(p[0].pts-y,v)-m)<20*l),p.forEach((function(e){e.pts=Dn(e.pts-y,v)})),!r||m<0){if(p=p.filter((function(e){return e.pts>=0})),!p.length)return
m=0===i?0:n&&!f?Math.max(0,v):p[0].pts}if("aac"===e.segmentCodec)for(var _=this.config.maxAudioFramesDrift,T=0,A=m;T<p.length;T++){var D=p[T],S=D.pts,x=S-A,C=Math.abs(1e3*x/a)
if(x<=-_*l&&f)0===T&&(k.warn("Audio frame @ "+(S/a).toFixed(3)+"s overlaps nextAudioPts by "+Math.round(1e3*x/a)+" ms."),this.nextAudioPts=m=A=S)
else if(x>=_*l&&C<1e4&&f){var L=Math.round(x/l);(A=S-L*l)<0&&(L--,A+=l),0===T&&(this.nextAudioPts=m=A),k.warn("[mp4-remuxer]: Injecting "+L+" audio frame @ "+(A/a).toFixed(3)+"s due to "+Math.round(1e3*x/a)+" ms gap.")
for(var R=0;R<L;R++){var I=Math.max(A,0),O=vn.getSilentFrame(e.manifestCodec||e.codec,e.channelCount)
O||(k.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."),O=D.unit.subarray()),p.splice(T,0,{unit:O,pts:I}),A+=l,T++}}D.pts=A,A+=l}for(var F,P=null,N=null,M=0,B=p.length;B--;)M+=p[B].unit.byteLength
for(var U=0,q=p.length;U<q;U++){var j=p[U],G=j.unit,H=j.pts
if(null!==N)h[U-1].duration=Math.round((H-N)/o)
else{if(r&&"aac"===e.segmentCodec&&(H=m),P=H,!(M>0))return
M+=g
try{F=new Uint8Array(M)}catch(e){return void this.observer.emit(b.ERROR,b.ERROR,{type:E.MUX_ERROR,details:w.REMUX_ALLOC_ERROR,fatal:!1,error:e,bytes:M,reason:"fail allocating audio mdat "+M})}d||(new DataView(F.buffer).setUint32(0,M),F.set(bn.types.mdat,4))}F.set(G,g)
var V=G.byteLength
g+=V,h.push(new Cn(!0,u,V,0)),N=H}var z=h.length
if(z){var K=h[h.length-1]
this.nextAudioPts=m=N+o*K.duration
var W=d?new Uint8Array(0):bn.moof(e.sequenceNumber++,P/o,s({},e,{samples:h}))
e.samples=[]
var $=P/a,Y=m/a,Q={data1:W,data2:F,startPTS:$,endPTS:Y,startDTS:$,endDTS:Y,type:"audio",hasAudio:!0,hasVideo:!1,nb:z}
return this.isAudioContiguous=!0,Q}},t.remuxEmptyAudio=function(e,t,r,n){var i=e.inputTimeScale,a=i/(e.samplerate?e.samplerate:i),o=this.nextAudioPts,s=this._initDTS,u=9e4*s.baseTime/s.timescale,l=(null!==o?o:n.startDTS*i)+u,c=n.endDTS*i+u,d=1024*a,h=Math.ceil((c-l)/d),f=vn.getSilentFrame(e.manifestCodec||e.codec,e.channelCount)
if(k.warn("[mp4-remuxer]: remux empty Audio"),f){for(var p=[],g=0;g<h;g++){var m=l+g*d
p.push({unit:f,pts:m,dts:m})}return e.samples=p,this.remuxAudio(e,t,r,!1)}k.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec")},e}()
function Dn(e,t){var r
if(null===t)return e
for(r=t<e?-8589934592:8589934592;Math.abs(e-t)>4294967296;)e+=r
return e}function kn(e,t,r,n){var i=e.samples.length
if(i){for(var a=e.inputTimeScale,o=0;o<i;o++){var s=e.samples[o]
s.pts=Dn(s.pts-9e4*r.baseTime/r.timescale,t*a)/a,s.dts=Dn(s.dts-9e4*n.baseTime/n.timescale,t*a)/a}var u=e.samples
return e.samples=[],{samples:u}}}function Sn(e,t,r){var n=e.samples.length
if(n){for(var i=e.inputTimeScale,a=0;a<n;a++){var o=e.samples[a]
o.pts=Dn(o.pts-9e4*r.baseTime/r.timescale,t*i)/i}e.samples.sort((function(e,t){return e.pts-t.pts}))
var s=e.samples
return e.samples=[],{samples:s}}}var xn,Cn=function(e,t,r,n){this.size=void 0,this.duration=void 0,this.cts=void 0,this.flags=void 0,this.duration=t,this.size=r,this.cts=n,this.flags=new Ln(e)},Ln=function(e){this.isLeading=0,this.isDependedOn=0,this.hasRedundancy=0,this.degradPrio=0,this.dependsOn=1,this.isNonSync=1,this.dependsOn=e?2:1,this.isNonSync=e?0:1},Rn=function(){function e(){this.emitInitSegment=!1,this.audioCodec=void 0,this.videoCodec=void 0,this.initData=void 0,this.initPTS=null,this.initTracks=void 0,this.lastEndTime=null}var t=e.prototype
return t.destroy=function(){},t.resetTimeStamp=function(e){this.initPTS=e,this.lastEndTime=null},t.resetNextTimestamp=function(){this.lastEndTime=null},t.resetInitSegment=function(e,t,r,n){this.audioCodec=t,this.videoCodec=r,this.generateInitSegment(function(e,t){if(!e||!t)return e
var r=t.keyId
return r&&t.isCommonEncryption&&Te(e,["moov","trak"]).forEach((function(e){var t=Te(e,["mdia","minf","stbl","stsd"])[0].subarray(8),n=Te(t,["enca"]),i=n.length>0
i||(n=Te(t,["encv"])),n.forEach((function(e){Te(i?e.subarray(28):e.subarray(78),["sinf"]).forEach((function(e){var t=ke(e)
if(t){var n=t.subarray(8,24)
n.some((function(e){return 0!==e}))||(k.log("[eme] Patching keyId in 'enc"+(i?"a":"v")+">sinf>>tenc' box: "+pe(n)+" -> "+pe(r)),t.set(r,8))}}))}))})),e}(e,n)),this.emitInitSegment=!0},t.generateInitSegment=function(e){var t=this.audioCodec,r=this.videoCodec
if(null==e||!e.byteLength)return this.initTracks=void 0,void(this.initData=void 0)
var n=this.initData=De(e)
t||(t=In(n.audio,O)),r||(r=In(n.video,F))
var i={}
n.audio&&n.video?i.audiovideo={container:"video/mp4",codec:t+","+r,initSegment:e,id:"main"}:n.audio?i.audio={container:"audio/mp4",codec:t,initSegment:e,id:"audio"}:n.video?i.video={container:"video/mp4",codec:r,initSegment:e,id:"main"}:k.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."),this.initTracks=i},t.remux=function(e,t,r,n,i,a){var o,s,u=this.initPTS,l=this.lastEndTime,c={audio:void 0,video:void 0,text:n,id3:r,initSegment:void 0}
y(l)||(l=this.lastEndTime=i||0)
var d=t.samples
if(null==d||!d.length)return c
var h={initPTS:void 0,timescale:1},f=this.initData
if(null!=(o=f)&&o.length||(this.generateInitSegment(d),f=this.initData),null==(s=f)||!s.length)return k.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."),c
this.emitInitSegment&&(h.tracks=this.initTracks,this.emitInitSegment=!1)
var p=function(e,t){for(var r=0,n=0,i=0,a=Te(e,["moof","traf"]),o=0;o<a.length;o++){var s=a[o],u=Te(s,["tfhd"])[0],l=t[Ee(u,4)]
if(l){var c=l.default,d=Ee(u,0)|(null==c?void 0:c.flags),h=null==c?void 0:c.duration
8&d&&(h=Ee(u,2&d?12:8))
for(var f=l.timescale||9e4,p=Te(s,["trun"]),g=0;g<p.length;g++)!(r=Se(p[g]))&&h&&(r=h*Ee(p[g],4)),l.type===F?n+=r/f:l.type===O&&(i+=r/f)}}if(0===n&&0===i){for(var m=0,v=Te(e,["sidx"]),y=0;y<v.length;y++){var b=Ae(v[y])
null!=b&&b.references&&(m+=b.references.reduce((function(e,t){return e+t.info.duration||0}),0))}return m}return n||i}(d,f),g=function(e,t){return Te(t,["moof","traf"]).reduce((function(t,r){var n=Te(r,["tfdt"])[0],i=n[0],a=Te(r,["tfhd"]).reduce((function(t,r){var a=Ee(r,4),o=e[a]
if(o){var s=Ee(n,4)
if(1===i){if(s===ge)return k.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time"),t
s*=ge+1,s+=Ee(n,8)}var u=s/(o.timescale||9e4)
if(isFinite(u)&&(null===t||u<t))return u}return t}),null)
return null!==a&&isFinite(a)&&(null===t||a<t)?a:t}),null)}(f,d),m=null===g?i:g;(function(e,t,r,n){if(null===e)return!0
var i=Math.max(n,1),a=t-e.baseTime/e.timescale
return Math.abs(a-r)>i}(u,m,i,p)||h.timescale!==u.timescale&&a)&&(h.initPTS=m-i,u&&1===u.timescale&&k.warn("Adjusting initPTS by "+(h.initPTS-u.baseTime)),this.initPTS=u={baseTime:h.initPTS,timescale:1})
var v=e?m-u.baseTime/u.timescale:l,b=v+p;(function(e,t,r){Te(t,["moof","traf"]).forEach((function(t){Te(t,["tfhd"]).forEach((function(n){var i=Ee(n,4),a=e[i]
if(a){var o=a.timescale||9e4
Te(t,["tfdt"]).forEach((function(e){var t=e[0],n=Ee(e,4)
if(0===t)n-=r*o,_e(e,4,n=Math.max(n,0))
else{n*=Math.pow(2,32),n+=Ee(e,8),n-=r*o,n=Math.max(n,0)
var i=Math.floor(n/(ge+1)),a=Math.floor(n%(ge+1))
_e(e,4,i),_e(e,8,a)}}))}}))}))})(f,d,u.baseTime/u.timescale),p>0?this.lastEndTime=b:(k.warn("Duration parsed from mp4 should be greater than zero"),this.resetNextTimestamp())
var E=!!f.audio,w=!!f.video,_=""
E&&(_+="audio"),w&&(_+="video")
var T={data1:d,startPTS:v,startDTS:v,endPTS:b,endDTS:b,type:_,hasAudio:E,hasVideo:w,nb:1,dropped:0}
return c.audio="audio"===T.type?T:void 0,c.video="audio"!==T.type?T:void 0,c.initSegment=h,c.id3=kn(r,i,u,u),n.samples.length&&(c.text=Sn(n,i,u)),c},e}()
function In(e,t){var r=null==e?void 0:e.codec
return r&&r.length>4?r:"hvc1"===r||"hev1"===r?"hvc1.1.6.L120.90":"av01"===r?"av01.0.04M.08":"avc1"===r||t===F?"avc1.42e01e":"mp4a.40.5"}try{xn=self.performance.now.bind(self.performance)}catch(e){k.debug("Unable to use Performance API on this environment"),xn="undefined"!=typeof self&&self.Date.now}var On=[{demux:$r,remux:Rn},{demux:ln,remux:An},{demux:Kr,remux:An},{demux:mn,remux:An}],Fn=function(){function e(e,t,r,n,i){this.async=!1,this.observer=void 0,this.typeSupported=void 0,this.config=void 0,this.vendor=void 0,this.id=void 0,this.demuxer=void 0,this.remuxer=void 0,this.decrypter=void 0,this.probe=void 0,this.decryptionPromise=null,this.transmuxConfig=void 0,this.currentTransmuxState=void 0,this.observer=e,this.typeSupported=t,this.config=r,this.vendor=n,this.id=i}var t=e.prototype
return t.configure=function(e){this.transmuxConfig=e,this.decrypter&&this.decrypter.reset()},t.push=function(e,t,r,n){var i=this,a=r.transmuxing
a.executeStart=xn()
var o=new Uint8Array(e),s=this.currentTransmuxState,u=this.transmuxConfig
n&&(this.currentTransmuxState=n)
var l=n||s,c=l.contiguous,d=l.discontinuity,h=l.trackSwitch,f=l.accurateTimeOffset,p=l.timeOffset,g=l.initSegmentChange,m=u.audioCodec,v=u.videoCodec,y=u.defaultInitPts,_=u.duration,T=u.initSegmentData,A=function(e,t){var r=null
return e.byteLength>0&&null!=t&&null!=t.key&&null!==t.iv&&null!=t.method&&(r=t),r}(o,t)
if(A&&"AES-128"===A.method){var D=this.getDecrypter()
if(!D.isSync())return this.decryptionPromise=D.webCryptoDecrypt(o,A.key.buffer,A.iv.buffer).then((function(e){var t=i.push(e,null,r)
return i.decryptionPromise=null,t})),this.decryptionPromise
var S=D.softwareDecrypt(o,A.key.buffer,A.iv.buffer)
if(r.part>-1&&(S=D.flush()),!S)return a.executeEnd=xn(),Pn(r)
o=new Uint8Array(S)}var x=this.needsProbing(d,h)
if(x){var C=this.configureTransmuxer(o)
if(C)return k.warn("[transmuxer] "+C.message),this.observer.emit(b.ERROR,b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,fatal:!1,error:C,reason:C.message}),a.executeEnd=xn(),Pn(r)}(d||h||g||x)&&this.resetInitSegment(T,m,v,_,t),(d||g||x)&&this.resetInitialTimestamp(y),c||this.resetContiguity()
var L=this.transmux(o,A,p,f,r),R=this.currentTransmuxState
return R.contiguous=!0,R.discontinuity=!1,R.trackSwitch=!1,a.executeEnd=xn(),L},t.flush=function(e){var t=this,r=e.transmuxing
r.executeStart=xn()
var n=this.decrypter,i=this.currentTransmuxState,a=this.decryptionPromise
if(a)return a.then((function(){return t.flush(e)}))
var o=[],s=i.timeOffset
if(n){var u=n.flush()
u&&o.push(this.push(u,null,e))}var l=this.demuxer,c=this.remuxer
if(!l||!c)return r.executeEnd=xn(),[Pn(e)]
var d=l.flush(s)
return Nn(d)?d.then((function(r){return t.flushRemux(o,r,e),o})):(this.flushRemux(o,d,e),o)},t.flushRemux=function(e,t,r){var n=t.audioTrack,i=t.videoTrack,a=t.id3Track,o=t.textTrack,s=this.currentTransmuxState,u=s.accurateTimeOffset,l=s.timeOffset
k.log("[transmuxer.ts]: Flushed fragment "+r.sn+(r.part>-1?" p: "+r.part:"")+" of level "+r.level)
var c=this.remuxer.remux(n,i,a,o,l,u,!0,this.id)
e.push({remuxResult:c,chunkMeta:r}),r.transmuxing.executeEnd=xn()},t.resetInitialTimestamp=function(e){var t=this.demuxer,r=this.remuxer
t&&r&&(t.resetTimeStamp(e),r.resetTimeStamp(e))},t.resetContiguity=function(){var e=this.demuxer,t=this.remuxer
e&&t&&(e.resetContiguity(),t.resetNextTimestamp())},t.resetInitSegment=function(e,t,r,n,i){var a=this.demuxer,o=this.remuxer
a&&o&&(a.resetInitSegment(e,t,r,n),o.resetInitSegment(e,t,r,i))},t.destroy=function(){this.demuxer&&(this.demuxer.destroy(),this.demuxer=void 0),this.remuxer&&(this.remuxer.destroy(),this.remuxer=void 0)},t.transmux=function(e,t,r,n,i){return t&&"SAMPLE-AES"===t.method?this.transmuxSampleAes(e,t,r,n,i):this.transmuxUnencrypted(e,r,n,i)},t.transmuxUnencrypted=function(e,t,r,n){var i=this.demuxer.demux(e,t,!1,!this.config.progressive),a=i.audioTrack,o=i.videoTrack,s=i.id3Track,u=i.textTrack
return{remuxResult:this.remuxer.remux(a,o,s,u,t,r,!1,this.id),chunkMeta:n}},t.transmuxSampleAes=function(e,t,r,n,i){var a=this
return this.demuxer.demuxSampleAes(e,t,r).then((function(e){return{remuxResult:a.remuxer.remux(e.audioTrack,e.videoTrack,e.id3Track,e.textTrack,r,n,!1,a.id),chunkMeta:i}}))},t.configureTransmuxer=function(e){for(var t,r=this.config,n=this.observer,i=this.typeSupported,a=this.vendor,o=0,s=On.length;o<s;o++)if(On[o].demux.probe(e)){t=On[o]
break}if(!t)return new Error("Failed to find demuxer by probing fragment data")
var u=this.demuxer,l=this.remuxer,c=t.remux,d=t.demux
l&&l instanceof c||(this.remuxer=new c(n,r,i,a)),u&&u instanceof d||(this.demuxer=new d(n,r,i),this.probe=d.probe)},t.needsProbing=function(e,t){return!this.demuxer||!this.remuxer||e||t},t.getDecrypter=function(){var e=this.decrypter
return e||(e=this.decrypter=new Er(this.config)),e},e}(),Pn=function(e){return{remuxResult:{},chunkMeta:e}}
function Nn(e){return"then"in e&&e.then instanceof Function}var Mn=function(e,t,r,n,i){this.audioCodec=void 0,this.videoCodec=void 0,this.initSegmentData=void 0,this.duration=void 0,this.defaultInitPts=void 0,this.audioCodec=e,this.videoCodec=t,this.initSegmentData=r,this.duration=n,this.defaultInitPts=i||null},Bn=function(e,t,r,n,i,a){this.discontinuity=void 0,this.contiguous=void 0,this.accurateTimeOffset=void 0,this.trackSwitch=void 0,this.timeOffset=void 0,this.initSegmentChange=void 0,this.discontinuity=e,this.contiguous=t,this.accurateTimeOffset=r,this.trackSwitch=n,this.timeOffset=i,this.initSegmentChange=a},Un={exports:{}}
!function(e){var t=Object.prototype.hasOwnProperty,r="~"
function n(){}function i(e,t,r){this.fn=e,this.context=t,this.once=r||!1}function a(e,t,n,a,o){if("function"!=typeof n)throw new TypeError("The listener must be a function")
var s=new i(n,a||e,o),u=r?r+t:t
return e._events[u]?e._events[u].fn?e._events[u]=[e._events[u],s]:e._events[u].push(s):(e._events[u]=s,e._eventsCount++),e}function o(e,t){0==--e._eventsCount?e._events=new n:delete e._events[t]}function s(){this._events=new n,this._eventsCount=0}Object.create&&(n.prototype=Object.create(null),(new n).__proto__||(r=!1)),s.prototype.eventNames=function(){var e,n,i=[]
if(0===this._eventsCount)return i
for(n in e=this._events)t.call(e,n)&&i.push(r?n.slice(1):n)
return Object.getOwnPropertySymbols?i.concat(Object.getOwnPropertySymbols(e)):i},s.prototype.listeners=function(e){var t=r?r+e:e,n=this._events[t]
if(!n)return[]
if(n.fn)return[n.fn]
for(var i=0,a=n.length,o=new Array(a);i<a;i++)o[i]=n[i].fn
return o},s.prototype.listenerCount=function(e){var t=r?r+e:e,n=this._events[t]
return n?n.fn?1:n.length:0},s.prototype.emit=function(e,t,n,i,a,o){var s=r?r+e:e
if(!this._events[s])return!1
var u,l,c=this._events[s],d=arguments.length
if(c.fn){switch(c.once&&this.removeListener(e,c.fn,void 0,!0),d){case 1:return c.fn.call(c.context),!0
case 2:return c.fn.call(c.context,t),!0
case 3:return c.fn.call(c.context,t,n),!0
case 4:return c.fn.call(c.context,t,n,i),!0
case 5:return c.fn.call(c.context,t,n,i,a),!0
case 6:return c.fn.call(c.context,t,n,i,a,o),!0}for(l=1,u=new Array(d-1);l<d;l++)u[l-1]=arguments[l]
c.fn.apply(c.context,u)}else{var h,f=c.length
for(l=0;l<f;l++)switch(c[l].once&&this.removeListener(e,c[l].fn,void 0,!0),d){case 1:c[l].fn.call(c[l].context)
break
case 2:c[l].fn.call(c[l].context,t)
break
case 3:c[l].fn.call(c[l].context,t,n)
break
case 4:c[l].fn.call(c[l].context,t,n,i)
break
default:if(!u)for(h=1,u=new Array(d-1);h<d;h++)u[h-1]=arguments[h]
c[l].fn.apply(c[l].context,u)}}return!0},s.prototype.on=function(e,t,r){return a(this,e,t,r,!1)},s.prototype.once=function(e,t,r){return a(this,e,t,r,!0)},s.prototype.removeListener=function(e,t,n,i){var a=r?r+e:e
if(!this._events[a])return this
if(!t)return o(this,a),this
var s=this._events[a]
if(s.fn)s.fn!==t||i&&!s.once||n&&s.context!==n||o(this,a)
else{for(var u=0,l=[],c=s.length;u<c;u++)(s[u].fn!==t||i&&!s[u].once||n&&s[u].context!==n)&&l.push(s[u])
l.length?this._events[a]=1===l.length?l[0]:l:o(this,a)}return this},s.prototype.removeAllListeners=function(e){var t
return e?(t=r?r+e:e,this._events[t]&&o(this,t)):(this._events=new n,this._eventsCount=0),this},s.prototype.off=s.prototype.removeListener,s.prototype.addListener=s.prototype.on,s.prefixed=r,s.EventEmitter=s,e.exports=s}(Un)
var qn=function(e){return e&&e.__esModule&&Object.prototype.hasOwnProperty.call(e,"default")?e.default:e}(Un.exports)
function jn(e,t){if(!((r=t.remuxResult).audio||r.video||r.text||r.id3||r.initSegment))return!1
var r,n=[],i=t.remuxResult,a=i.audio,o=i.video
return a&&Gn(n,a),o&&Gn(n,o),e.postMessage({event:"transmuxComplete",data:t},n),!0}function Gn(e,t){t.data1&&e.push(t.data1.buffer),t.data2&&e.push(t.data2.buffer)}function Hn(e,t,r){t.reduce((function(t,r){return jn(e,r)||t}),!1)||e.postMessage({event:"transmuxComplete",data:t[0]}),e.postMessage({event:"flush",data:r})}void 0!==r&&r&&function(e){var t=new qn,r=function(t,r){e.postMessage({event:t,data:r})}
t.on(b.FRAG_DECRYPTED,r),t.on(b.ERROR,r),e.addEventListener("message",(function(n){var i=n.data
switch(i.cmd){case"init":var a=JSON.parse(i.config)
e.transmuxer=new Fn(t,i.typeSupported,a,i.vendor,i.id),D(a.debug,i.id),function(){var e=function(e){k[e]=function(t){r("workerLog",{logType:e,message:t})}}
for(var t in k)e(t)}(),r("init",null)
break
case"configure":e.transmuxer.configure(i.config)
break
case"demux":var o=e.transmuxer.push(i.data,i.decryptdata,i.chunkMeta,i.state)
Nn(o)?(e.transmuxer.async=!0,o.then((function(t){jn(e,t)})).catch((function(e){r(b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,chunkMeta:i.chunkMeta,fatal:!1,error:e,err:e,reason:"transmuxer-worker push error"})}))):(e.transmuxer.async=!1,jn(e,o))
break
case"flush":var s=i.chunkMeta,u=e.transmuxer.flush(s)
Nn(u)||e.transmuxer.async?(Nn(u)||(u=Promise.resolve(u)),u.then((function(t){Hn(e,t,s)})).catch((function(e){r(b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,chunkMeta:i.chunkMeta,fatal:!1,error:e,err:e,reason:"transmuxer-worker flush error"})}))):Hn(e,u,s)}}))}(self)
var Vn=je()||{isTypeSupported:function(){return!1}},zn=function(){function e(e,r,n,i){var a=this
this.error=null,this.hls=void 0,this.id=void 0,this.observer=void 0,this.frag=null,this.part=null,this.useWorker=void 0,this.workerContext=null,this.onwmsg=void 0,this.transmuxer=null,this.onTransmuxComplete=void 0,this.onFlush=void 0
var o=e.config
this.hls=e,this.id=r,this.useWorker=!!o.enableWorker,this.onTransmuxComplete=n,this.onFlush=i
var s=function(e,t){(t=t||{}).frag=a.frag,t.id=a.id,e===b.ERROR&&(a.error=t.error),a.hls.trigger(e,t)}
this.observer=new qn,this.observer.on(b.FRAG_DECRYPTED,s),this.observer.on(b.ERROR,s)
var u,l,c,d,h={mp4:Vn.isTypeSupported("video/mp4"),mpeg:Vn.isTypeSupported("audio/mpeg"),mp3:Vn.isTypeSupported('audio/mp4; codecs="mp3"')},f=navigator.vendor
if(this.useWorker&&"undefined"!=typeof Worker&&(o.workerPath,1))try{o.workerPath?(k.log("loading Web Worker "+o.workerPath+' for "'+r+'"'),this.workerContext=(c=o.workerPath,d=new self.URL(c,self.location.href).href,{worker:new self.Worker(d),scriptURL:d})):(k.log('injecting Web Worker for "'+r+'"'),this.workerContext=(u=new self.Blob(["var exports={};var module={exports:exports};function define(f){f()};define.amd=true;("+t.toString()+")(true);"],{type:"text/javascript"}),l=self.URL.createObjectURL(u),{worker:new self.Worker(l),objectURL:l})),this.onwmsg=function(e){return a.onWorkerMessage(e)}
var p=this.workerContext.worker
p.addEventListener("message",this.onwmsg),p.onerror=function(e){var t=new Error(e.message+"  ("+e.filename+":"+e.lineno+")")
o.enableWorker=!1,k.warn('Error in "'+r+'" Web Worker, fallback to inline'),a.hls.trigger(b.ERROR,{type:E.OTHER_ERROR,details:w.INTERNAL_EXCEPTION,fatal:!1,event:"demuxerWorker",error:t})},p.postMessage({cmd:"init",typeSupported:h,vendor:f,id:r,config:JSON.stringify(o)})}catch(e){k.warn('Error setting up "'+r+'" Web Worker, fallback to inline',e),this.resetWorker(),this.error=null,this.transmuxer=new Fn(this.observer,h,o,f,r)}else this.transmuxer=new Fn(this.observer,h,o,f,r)}var r=e.prototype
return r.resetWorker=function(){if(this.workerContext){var e=this.workerContext,t=e.worker,r=e.objectURL
r&&self.URL.revokeObjectURL(r),t.removeEventListener("message",this.onwmsg),t.onerror=null,t.terminate(),this.workerContext=null}},r.destroy=function(){if(this.workerContext)this.resetWorker(),this.onwmsg=void 0
else{var e=this.transmuxer
e&&(e.destroy(),this.transmuxer=null)}var t=this.observer
t&&t.removeAllListeners(),this.frag=null,this.observer=null,this.hls=null},r.push=function(e,t,r,n,i,a,o,s,u,l){var c,d,h=this
u.transmuxing.start=self.performance.now()
var f=this.transmuxer,p=a?a.start:i.start,g=i.decryptdata,m=this.frag,v=!(m&&i.cc===m.cc),y=!(m&&u.level===m.level),b=m?u.sn-m.sn:-1,E=this.part?u.part-this.part.index:-1,w=0===b&&u.id>1&&u.id===(null==m?void 0:m.stats.chunkCount),_=!y&&(1===b||0===b&&(1===E||w&&E<=0)),T=self.performance.now();(y||b||0===i.stats.parsing.start)&&(i.stats.parsing.start=T),!a||!E&&_||(a.stats.parsing.start=T)
var A=!(m&&(null==(c=i.initSegment)?void 0:c.url)===(null==(d=m.initSegment)?void 0:d.url)),D=new Bn(v,_,s,y,p,A)
if(!_||v||A){k.log("[transmuxer-interface, "+i.type+"]: Starting new transmux session for sn: "+u.sn+" p: "+u.part+" level: "+u.level+" id: "+u.id+"\n        discontinuity: "+v+"\n        trackSwitch: "+y+"\n        contiguous: "+_+"\n        accurateTimeOffset: "+s+"\n        timeOffset: "+p+"\n        initSegmentChange: "+A)
var S=new Mn(r,n,t,o,l)
this.configureTransmuxer(S)}if(this.frag=i,this.part=a,this.workerContext)this.workerContext.worker.postMessage({cmd:"demux",data:e,decryptdata:g,chunkMeta:u,state:D},e instanceof ArrayBuffer?[e]:[])
else if(f){var x=f.push(e,g,u,D)
Nn(x)?(f.async=!0,x.then((function(e){h.handleTransmuxComplete(e)})).catch((function(e){h.transmuxerError(e,u,"transmuxer-interface push error")}))):(f.async=!1,this.handleTransmuxComplete(x))}},r.flush=function(e){var t=this
e.transmuxing.start=self.performance.now()
var r=this.transmuxer
if(this.workerContext)this.workerContext.worker.postMessage({cmd:"flush",chunkMeta:e})
else if(r){var n=r.flush(e)
Nn(n)||r.async?(Nn(n)||(n=Promise.resolve(n)),n.then((function(r){t.handleFlushResult(r,e)})).catch((function(r){t.transmuxerError(r,e,"transmuxer-interface flush error")}))):this.handleFlushResult(n,e)}},r.transmuxerError=function(e,t,r){this.hls&&(this.error=e,this.hls.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_PARSING_ERROR,chunkMeta:t,fatal:!1,error:e,err:e,reason:r}))},r.handleFlushResult=function(e,t){var r=this
e.forEach((function(e){r.handleTransmuxComplete(e)})),this.onFlush(t)},r.onWorkerMessage=function(e){var t=e.data,r=this.hls
switch(t.event){case"init":var n,i=null==(n=this.workerContext)?void 0:n.objectURL
i&&self.URL.revokeObjectURL(i)
break
case"transmuxComplete":this.handleTransmuxComplete(t.data)
break
case"flush":this.onFlush(t.data)
break
case"workerLog":k[t.data.logType]&&k[t.data.logType](t.data.message)
break
default:t.data=t.data||{},t.data.frag=this.frag,t.data.id=this.id,r.trigger(t.event,t.data)}},r.configureTransmuxer=function(e){var t=this.transmuxer
this.workerContext?this.workerContext.worker.postMessage({cmd:"configure",config:e}):t&&t.configure(e)},r.handleTransmuxComplete=function(e){e.chunkMeta.transmuxing.end=self.performance.now(),this.onTransmuxComplete(e)},e}(),Kn=function(){function e(e,t,r,n){this.config=void 0,this.media=null,this.fragmentTracker=void 0,this.hls=void 0,this.nudgeRetry=0,this.stallReported=!1,this.stalled=null,this.moved=!1,this.seeking=!1,this.config=e,this.media=t,this.fragmentTracker=r,this.hls=n}var t=e.prototype
return t.destroy=function(){this.media=null,this.hls=this.fragmentTracker=null},t.poll=function(e,t){var r=this.config,n=this.media,i=this.stalled
if(null!==n){var a=n.currentTime,o=n.seeking,s=this.seeking&&!o,u=!this.seeking&&o
if(this.seeking=o,a===e){if(u||s)this.stalled=null
else if(!(n.paused&&!o||n.ended||0===n.playbackRate)&&dr.getBuffered(n).length){var l=dr.bufferInfo(n,a,0),c=l.len>0,d=l.nextStart||0
if(c||d){if(o){var h=l.len>2,f=!d||t&&t.start<=a||d-a>2&&!this.fragmentTracker.getPartialFragment(a)
if(h||f)return
this.moved=!1}if(!this.moved&&null!==this.stalled){var p,g=Math.max(d,l.start||0)-a,m=this.hls.levels?this.hls.levels[this.hls.currentLevel]:null,v=(null==m||null==(p=m.details)?void 0:p.live)?2*m.details.targetduration:2,y=this.fragmentTracker.getPartialFragment(a)
if(g>0&&(g<=v||y))return void this._trySkipBufferHole(y)}var b=self.performance.now()
if(null!==i){var E=b-i
if(o||!(E>=250)||(this._reportStall(l),this.media)){var w=dr.bufferInfo(n,a,r.maxBufferHole)
this._tryFixBufferStall(w,E)}}else this.stalled=b}}}else if(this.moved=!0,null!==i){if(this.stallReported){var _=self.performance.now()-i
k.warn("playback not stuck anymore @"+a+", after "+Math.round(_)+"ms"),this.stallReported=!1}this.stalled=null,this.nudgeRetry=0}}},t._tryFixBufferStall=function(e,t){var r=this.config,n=this.fragmentTracker,i=this.media
if(null!==i){var a=i.currentTime,o=n.getPartialFragment(a)
if(o&&(this._trySkipBufferHole(o)||!this.media))return;(e.len>r.maxBufferHole||e.nextStart&&e.nextStart-a<r.maxBufferHole)&&t>1e3*r.highBufferWatchdogPeriod&&(k.warn("Trying to nudge playhead over buffer-hole"),this.stalled=null,this._tryNudgeBuffer())}},t._reportStall=function(e){var t=this.hls,r=this.media
if(!this.stallReported&&r){this.stallReported=!0
var n=new Error("Playback stalling at @"+r.currentTime+" due to low buffer ("+JSON.stringify(e)+")")
k.warn(n.message),t.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.BUFFER_STALLED_ERROR,fatal:!1,error:n,buffer:e.len})}},t._trySkipBufferHole=function(e){var t=this.config,r=this.hls,n=this.media
if(null===n)return 0
var i=n.currentTime,a=dr.bufferInfo(n,i,0),o=i<a.start?a.start:a.nextStart
if(o){var s=a.len<=t.maxBufferHole,u=a.len>0&&a.len<1&&n.readyState<3,l=o-i
if(l>0&&(s||u)){if(l>t.maxBufferHole){var c=this.fragmentTracker,d=!1
if(0===i){var h=c.getAppendedFrag(0,ut)
h&&o<h.end&&(d=!0)}if(!d){var f=e||c.getAppendedFrag(i,ut)
if(f){for(var p=!1,g=f.end;g<o;){var m=c.getPartialFragment(g)
if(!m){p=!0
break}g+=m.duration}if(p)return 0}}}var v=Math.max(o+.05,i+.1)
if(k.warn("skipping hole, adjusting currentTime from "+i+" to "+v),this.moved=!0,this.stalled=null,n.currentTime=v,e&&!e.gap){var y=new Error("fragment loaded with buffer holes, seeking from "+i+" to "+v)
r.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.BUFFER_SEEK_OVER_HOLE,fatal:!1,error:y,reason:y.message,frag:e})}return v}}return 0},t._tryNudgeBuffer=function(){var e=this.config,t=this.hls,r=this.media,n=this.nudgeRetry
if(null!==r){var i=r.currentTime
if(this.nudgeRetry++,n<e.nudgeMaxRetry){var a=i+(n+1)*e.nudgeOffset,o=new Error("Nudging 'currentTime' from "+i+" to "+a)
k.warn(o.message),r.currentTime=a,t.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.BUFFER_NUDGE_ON_STALL,error:o,fatal:!1})}else{var s=new Error("Playhead still not moving while enough data buffered @"+i+" after "+e.nudgeMaxRetry+" nudges")
k.error(s.message),t.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.BUFFER_STALLED_ERROR,error:s,fatal:!0})}}},e}(),Wn=function(e){function t(t,r,n){var i
return(i=e.call(this,t,r,n,"[stream-controller]",ut)||this).audioCodecSwap=!1,i.gapController=null,i.level=-1,i._forceStartLoad=!1,i.altAudio=!1,i.audioOnly=!1,i.fragPlaying=null,i.onvplaying=null,i.onvseeked=null,i.fragLastKbps=0,i.couldBacktrack=!1,i.backtrackFragment=null,i.audioCodecSwitch=!1,i.videoBuffer=null,i._registerListeners(),i}u(t,e)
var r=t.prototype
return r._registerListeners=function(){var e=this.hls
e.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.MANIFEST_PARSED,this.onManifestParsed,this),e.on(b.LEVEL_LOADING,this.onLevelLoading,this),e.on(b.LEVEL_LOADED,this.onLevelLoaded,this),e.on(b.FRAG_LOAD_EMERGENCY_ABORTED,this.onFragLoadEmergencyAborted,this),e.on(b.ERROR,this.onError,this),e.on(b.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),e.on(b.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),e.on(b.BUFFER_CREATED,this.onBufferCreated,this),e.on(b.BUFFER_FLUSHED,this.onBufferFlushed,this),e.on(b.LEVELS_UPDATED,this.onLevelsUpdated,this),e.on(b.FRAG_BUFFERED,this.onFragBuffered,this)},r._unregisterListeners=function(){var e=this.hls
e.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.MANIFEST_PARSED,this.onManifestParsed,this),e.off(b.LEVEL_LOADED,this.onLevelLoaded,this),e.off(b.FRAG_LOAD_EMERGENCY_ABORTED,this.onFragLoadEmergencyAborted,this),e.off(b.ERROR,this.onError,this),e.off(b.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),e.off(b.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),e.off(b.BUFFER_CREATED,this.onBufferCreated,this),e.off(b.BUFFER_FLUSHED,this.onBufferFlushed,this),e.off(b.LEVELS_UPDATED,this.onLevelsUpdated,this),e.off(b.FRAG_BUFFERED,this.onFragBuffered,this)},r.onHandlerDestroying=function(){this._unregisterListeners(),this.onMediaDetaching()},r.startLoad=function(e){if(this.levels){var t=this.lastCurrentTime,r=this.hls
if(this.stopLoad(),this.setInterval(100),this.level=-1,!this.startFragRequested){var n=r.startLevel;-1===n&&(r.config.testBandwidth&&this.levels.length>1?(n=0,this.bitrateTest=!0):n=r.nextAutoLevel),this.level=r.nextLoadLevel=n,this.loadedmetadata=!1}t>0&&-1===e&&(this.log("Override startPosition with lastCurrentTime @"+t.toFixed(3)),e=t),this.state=_r,this.nextLoadPosition=this.startPosition=this.lastCurrentTime=e,this.tick()}else this._forceStartLoad=!0,this.state=wr},r.stopLoad=function(){this._forceStartLoad=!1,e.prototype.stopLoad.call(this)},r.doTick=function(){switch(this.state){case Ir:var e,t=this.levels,r=this.level,n=null==t||null==(e=t[r])?void 0:e.details
if(n&&(!n.live||this.levelLastLoaded===this.level)){if(this.waitForCdnTuneIn(n))break
this.state=_r
break}break
case Dr:var i,a=self.performance.now(),o=this.retryDate;(!o||a>=o||null!=(i=this.media)&&i.seeking)&&(this.resetStartWhenNotLoaded(this.level),this.state=_r)}this.state===_r&&this.doTickIdle(),this.onTickEnd()},r.onTickEnd=function(){e.prototype.onTickEnd.call(this),this.checkBuffer(),this.checkFragmentChanged()},r.doTickIdle=function(){var e=this.hls,t=this.levelLastLoaded,r=this.levels,n=this.media,i=e.config,a=e.nextLoadLevel
if(null!==t&&(n||!this.startFragRequested&&i.startFragPrefetch)&&(!this.altAudio||!this.audioOnly)&&null!=r&&r[a]){var o=r[a],s=this.getMainFwdBufferInfo()
if(null!==s){var u=this.getLevelDetails()
if(u&&this._streamEnded(s,u)){var l={}
return this.altAudio&&(l.type="video"),this.hls.trigger(b.BUFFER_EOS,l),void(this.state=Cr)}e.loadLevel!==a&&-1===e.manualLevel&&this.log("Adapting to level "+a+" from level "+this.level),this.level=e.nextLoadLevel=a
var c=o.details
if(!c||this.state===Ir||c.live&&this.levelLastLoaded!==a)return this.level=a,void(this.state=Ir)
var d=s.len,h=this.getMaxBufferLength(o.maxBitrate)
if(!(d>=h)){this.backtrackFragment&&this.backtrackFragment.start>s.end&&(this.backtrackFragment=null)
var f=this.backtrackFragment?this.backtrackFragment.start:s.end,p=this.getNextFragment(f,c)
if(this.couldBacktrack&&!this.fragPrevious&&p&&"initSegment"!==p.sn&&this.fragmentTracker.getState(p)!==Jt){var g,m=(null!=(g=this.backtrackFragment)?g:p).sn-c.startSN,v=c.fragments[m-1]
v&&p.cc===v.cc&&(p=v,this.fragmentTracker.removeFragment(v))}else this.backtrackFragment&&s.len&&(this.backtrackFragment=null)
if(p&&this.isLoopLoading(p,f)){if(!p.gap){var y=this.audioOnly&&!this.altAudio?O:F,E=(y===F?this.videoBuffer:this.mediaBuffer)||this.media
E&&this.afterBufferFlushed(E,y,ut)}p=this.getNextFragmentLoopLoading(p,c,s,ut,h)}p&&(!p.initSegment||p.initSegment.data||this.bitrateTest||(p=p.initSegment),this.loadFragment(p,o,f))}}}},r.loadFragment=function(t,r,n){var i=this.fragmentTracker.getState(t)
this.fragCurrent=t,i===Qt||i===Zt?"initSegment"===t.sn?this._loadInitSegment(t,r):this.bitrateTest?(this.log("Fragment "+t.sn+" of level "+t.level+" is being downloaded to test bitrate and will not be buffered"),this._loadBitrateTestFrag(t,r)):(this.startFragRequested=!0,e.prototype.loadFragment.call(this,t,r,n)):this.clearTrackerIfNeeded(t)},r.getBufferedFrag=function(e){return this.fragmentTracker.getBufferedFrag(e,ut)},r.followingBufferedFrag=function(e){return e?this.getBufferedFrag(e.end+.5):null},r.immediateLevelSwitch=function(){this.abortCurrentFrag(),this.flushMainBuffer(0,Number.POSITIVE_INFINITY)},r.nextLevelSwitch=function(){var e=this.levels,t=this.media
if(null!=t&&t.readyState){var r,n=this.getAppendedFrag(t.currentTime)
n&&n.start>1&&this.flushMainBuffer(0,n.start-1)
var i=this.getLevelDetails()
if(null!=i&&i.live){var a=this.getMainFwdBufferInfo()
if(!a||a.len<2*i.targetduration)return}if(!t.paused&&e){var o=e[this.hls.nextLoadLevel],s=this.fragLastKbps
r=s&&this.fragCurrent?this.fragCurrent.duration*o.maxBitrate/(1e3*s)+1:0}else r=0
var u=this.getBufferedFrag(t.currentTime+r)
if(u){var l=this.followingBufferedFrag(u)
if(l){this.abortCurrentFrag()
var c=l.maxStartPTS?l.maxStartPTS:l.start,d=l.duration,h=Math.max(u.end,c+Math.min(Math.max(d-this.config.maxFragLookUpTolerance,.5*d),.75*d))
this.flushMainBuffer(h,Number.POSITIVE_INFINITY)}}}},r.abortCurrentFrag=function(){var e=this.fragCurrent
switch(this.fragCurrent=null,this.backtrackFragment=null,e&&(e.abortRequests(),this.fragmentTracker.removeFragment(e)),this.state){case Tr:case Ar:case Dr:case Sr:case xr:this.state=_r}this.nextLoadPosition=this.getLoadPosition()},r.flushMainBuffer=function(t,r){e.prototype.flushMainBuffer.call(this,t,r,this.altAudio?"video":null)},r.onMediaAttached=function(t,r){e.prototype.onMediaAttached.call(this,t,r)
var n=r.media
this.onvplaying=this.onMediaPlaying.bind(this),this.onvseeked=this.onMediaSeeked.bind(this),n.addEventListener("playing",this.onvplaying),n.addEventListener("seeked",this.onvseeked),this.gapController=new Kn(this.config,n,this.fragmentTracker,this.hls)},r.onMediaDetaching=function(){var t=this.media
t&&this.onvplaying&&this.onvseeked&&(t.removeEventListener("playing",this.onvplaying),t.removeEventListener("seeked",this.onvseeked),this.onvplaying=this.onvseeked=null,this.videoBuffer=null),this.fragPlaying=null,this.gapController&&(this.gapController.destroy(),this.gapController=null),e.prototype.onMediaDetaching.call(this)},r.onMediaPlaying=function(){this.tick()},r.onMediaSeeked=function(){var e=this.media,t=e?e.currentTime:null
y(t)&&this.log("Media seeked to "+t.toFixed(3))
var r=this.getMainFwdBufferInfo()
null!==r&&0!==r.len?this.tick():this.warn('Main forward buffer length on "seeked" event '+(r?r.len:"empty")+")")},r.onManifestLoading=function(){this.log("Trigger BUFFER_RESET"),this.hls.trigger(b.BUFFER_RESET,void 0),this.fragmentTracker.removeAllFragments(),this.couldBacktrack=!1,this.startPosition=this.lastCurrentTime=0,this.levels=this.fragPlaying=this.backtrackFragment=null,this.altAudio=this.audioOnly=!1},r.onManifestParsed=function(e,t){var r,n,i,a=!1,o=!1
t.levels.forEach((function(e){(r=e.audioCodec)&&(-1!==r.indexOf("mp4a.40.2")&&(a=!0),-1!==r.indexOf("mp4a.40.5")&&(o=!0))})),this.audioCodecSwitch=a&&o&&!("function"==typeof(null==(i=Fr())||null==(n=i.prototype)?void 0:n.changeType)),this.audioCodecSwitch&&this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),this.levels=t.levels,this.startFragRequested=!1},r.onLevelLoading=function(e,t){var r=this.levels
if(r&&this.state===_r){var n=r[t.level];(!n.details||n.details.live&&this.levelLastLoaded!==t.level||this.waitForCdnTuneIn(n.details))&&(this.state=Ir)}},r.onLevelLoaded=function(e,t){var r,n=this.levels,i=t.level,a=t.details,o=a.totalduration
if(n){this.log("Level "+i+" loaded ["+a.startSN+","+a.endSN+"]"+(a.lastPartSn?"[part-"+a.lastPartSn+"-"+a.lastPartIndex+"]":"")+", cc ["+a.startCC+", "+a.endCC+"] duration:"+o)
var s=n[i],u=this.fragCurrent
!u||this.state!==Ar&&this.state!==Dr||u.level===t.level&&u.urlId===s.urlId||!u.loader||this.abortCurrentFrag()
var l=0
if(a.live||null!=(r=s.details)&&r.live){if(a.fragments[0]||(a.deltaUpdateFailed=!0),a.deltaUpdateFailed)return
l=this.alignPlaylists(a,s.details)}if(s.details=a,this.levelLastLoaded=i,this.hls.trigger(b.LEVEL_UPDATED,{details:a,level:i}),this.state===Ir){if(this.waitForCdnTuneIn(a))return
this.state=_r}this.startFragRequested?a.live&&this.synchronizeToLiveEdge(a):this.setStartPosition(a,l),this.tick()}else this.warn("Levels were reset while loading level "+i)},r._handleFragmentLoadProgress=function(e){var t,r=e.frag,n=e.part,i=e.payload,a=this.levels
if(a){var o=a[r.level],s=o.details
if(!s)return this.warn("Dropping fragment "+r.sn+" of level "+r.level+" after level details were reset"),void this.fragmentTracker.removeFragment(r)
var u=o.videoCodec,l=s.PTSKnown||!s.live,c=null==(t=r.initSegment)?void 0:t.data,d=this._getAudioCodec(o),h=this.transmuxer=this.transmuxer||new zn(this.hls,ut,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this)),f=n?n.index:-1,p=-1!==f,g=new hr(r.level,r.sn,r.stats.chunkCount,i.byteLength,f,p),m=this.initPTS[r.cc]
h.push(i,c,d,u,r,n,s.totalduration,l,g,m)}else this.warn("Levels were reset while fragment load was in progress. Fragment "+r.sn+" of level "+r.level+" will not be buffered")},r.onAudioTrackSwitching=function(e,t){var r=this.altAudio
if(!t.url){if(this.mediaBuffer!==this.media){this.log("Switching on main audio, use media.buffered to schedule main fragment loading"),this.mediaBuffer=this.media
var n=this.fragCurrent
n&&(this.log("Switching to main audio track, cancel main fragment load"),n.abortRequests(),this.fragmentTracker.removeFragment(n)),this.resetTransmuxer(),this.resetLoadingState()}else this.audioOnly&&this.resetTransmuxer()
var i=this.hls
r&&(i.trigger(b.BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:null}),this.fragmentTracker.removeAllFragments()),i.trigger(b.AUDIO_TRACK_SWITCHED,t)}},r.onAudioTrackSwitched=function(e,t){var r=t.id,n=!!this.hls.audioTracks[r].url
if(n){var i=this.videoBuffer
i&&this.mediaBuffer!==i&&(this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"),this.mediaBuffer=i)}this.altAudio=n,this.tick()},r.onBufferCreated=function(e,t){var r,n,i=t.tracks,a=!1
for(var o in i){var s=i[o]
if("main"===s.id){if(n=o,r=s,"video"===o){var u=i[o]
u&&(this.videoBuffer=u.buffer)}}else a=!0}a&&r?(this.log("Alternate track found, use "+n+".buffered to schedule main fragment loading"),this.mediaBuffer=r.buffer):this.mediaBuffer=this.media},r.onFragBuffered=function(e,t){var r=t.frag,n=t.part
if(!r||r.type===ut){if(this.fragContextChanged(r))return this.warn("Fragment "+r.sn+(n?" p: "+n.index:"")+" of level "+r.level+" finished buffering, but was aborted. state: "+this.state),void(this.state===xr&&(this.state=_r))
var i=n?n.stats:r.stats
this.fragLastKbps=Math.round(8*i.total/(i.buffering.end-i.loading.first)),"initSegment"!==r.sn&&(this.fragPrevious=r),this.fragBufferedComplete(r,n)}},r.onError=function(e,t){var r
if(t.fatal)this.state=Lr
else switch(t.details){case w.FRAG_GAP:case w.FRAG_PARSING_ERROR:case w.FRAG_DECRYPT_ERROR:case w.FRAG_LOAD_ERROR:case w.FRAG_LOAD_TIMEOUT:case w.KEY_LOAD_ERROR:case w.KEY_LOAD_TIMEOUT:this.onFragmentOrKeyLoadError(ut,t)
break
case w.LEVEL_LOAD_ERROR:case w.LEVEL_LOAD_TIMEOUT:case w.LEVEL_PARSING_ERROR:t.levelRetry||this.state!==Ir||(null==(r=t.context)?void 0:r.type)!==at||(this.state=_r)
break
case w.BUFFER_FULL_ERROR:if(!t.parent||"main"!==t.parent)return
this.reduceLengthAndFlushBuffer(t)&&this.flushMainBuffer(0,Number.POSITIVE_INFINITY)
break
case w.INTERNAL_EXCEPTION:this.recoverWorkerError(t)}},r.checkBuffer=function(){var e=this.media,t=this.gapController
if(e&&t&&e.readyState){if(this.loadedmetadata||!dr.getBuffered(e).length){var r=this.state!==_r?this.fragCurrent:null
t.poll(this.lastCurrentTime,r)}this.lastCurrentTime=e.currentTime}},r.onFragLoadEmergencyAborted=function(){this.state=_r,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.tickImmediate()},r.onBufferFlushed=function(e,t){var r=t.type
if(r!==O||this.audioOnly&&!this.altAudio){var n=(r===F?this.videoBuffer:this.mediaBuffer)||this.media
this.afterBufferFlushed(n,r,ut)}},r.onLevelsUpdated=function(e,t){this.levels=t.levels},r.swapAudioCodec=function(){this.audioCodecSwap=!this.audioCodecSwap},r.seekToStartPos=function(){var e=this.media
if(e){var t=e.currentTime,r=this.startPosition
if(r>=0&&t<r){if(e.seeking)return void this.log("could not seek to "+r+", already seeking at "+t)
var n=dr.getBuffered(e),i=(n.length?n.start(0):0)-r
i>0&&(i<this.config.maxBufferHole||i<this.config.maxFragLookUpTolerance)&&(this.log("adjusting start position by "+i+" to match buffer start"),r+=i,this.startPosition=r),this.log("seek to target start position "+r+" from current time "+t),e.currentTime=r}}},r._getAudioCodec=function(e){var t=this.config.defaultAudioCodec||e.audioCodec
return this.audioCodecSwap&&t&&(this.log("Swapping audio codec"),t=-1!==t.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),t},r._loadBitrateTestFrag=function(e,t){var r=this
e.bitrateTest=!0,this._doFragLoad(e,t).then((function(n){var i=r.hls
if(n&&!r.fragContextChanged(e)){t.fragmentError=0,r.state=_r,r.startFragRequested=!1,r.bitrateTest=!1
var a=e.stats
a.parsing.start=a.parsing.end=a.buffering.start=a.buffering.end=self.performance.now(),i.trigger(b.FRAG_LOADED,n),e.bitrateTest=!1}}))},r._handleTransmuxComplete=function(e){var t,r="main",n=this.hls,i=e.remuxResult,a=e.chunkMeta,o=this.getCurrentContext(a)
if(o){var s=o.frag,u=o.part,l=o.level,c=i.video,d=i.text,h=i.id3,f=i.initSegment,p=l.details,g=this.altAudio?void 0:i.audio
if(this.fragContextChanged(s))this.fragmentTracker.removeFragment(s)
else{if(this.state=Sr,f){if(null!=f&&f.tracks){var m=s.initSegment||s
this._bufferInitSegment(l,f.tracks,m,a),n.trigger(b.FRAG_PARSING_INIT_SEGMENT,{frag:m,id:r,tracks:f.tracks})}var v=f.initPTS,E=f.timescale
y(v)&&(this.initPTS[s.cc]={baseTime:v,timescale:E},n.trigger(b.INIT_PTS_FOUND,{frag:s,id:r,initPTS:v,timescale:E}))}if(c&&!1!==i.independent){if(p){var w=c.startPTS,_=c.endPTS,T=c.startDTS,A=c.endDTS
if(u)u.elementaryStreams[c.type]={startPTS:w,endPTS:_,startDTS:T,endDTS:A}
else if(c.firstKeyFrame&&c.independent&&1===a.id&&(this.couldBacktrack=!0),c.dropped&&c.independent){var D=this.getMainFwdBufferInfo()
if((D?D.end:this.getLoadPosition())+this.config.maxBufferHole<(c.firstKeyFramePTS?c.firstKeyFramePTS:w)-this.config.maxBufferHole)return void this.backtrack(s)
s.setElementaryStreamInfo(c.type,s.start,_,s.start,A,!0)}s.setElementaryStreamInfo(c.type,w,_,T,A),this.backtrackFragment&&(this.backtrackFragment=s),this.bufferFragmentData(c,s,u,a)}}else if(!1===i.independent)return void this.backtrack(s)
if(g){var k=g.startPTS,S=g.endPTS,x=g.startDTS,C=g.endDTS
u&&(u.elementaryStreams[O]={startPTS:k,endPTS:S,startDTS:x,endDTS:C}),s.setElementaryStreamInfo(O,k,S,x,C),this.bufferFragmentData(g,s,u,a)}if(p&&null!=h&&null!=(t=h.samples)&&t.length){var L={id:r,frag:s,details:p,samples:h.samples}
n.trigger(b.FRAG_PARSING_METADATA,L)}if(p&&d){var R={id:r,frag:s,details:p,samples:d.samples}
n.trigger(b.FRAG_PARSING_USERDATA,R)}}}else this.resetWhenMissingContext(a)},r._bufferInitSegment=function(e,t,r,n){var i=this
if(this.state===Sr){this.audioOnly=!!t.audio&&!t.video,this.altAudio&&!this.audioOnly&&delete t.audio
var a=t.audio,o=t.video,s=t.audiovideo
if(a){var u=e.audioCodec,l=navigator.userAgent.toLowerCase()
this.audioCodecSwitch&&(u&&(u=-1!==u.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),1!==a.metadata.channelCount&&-1===l.indexOf("firefox")&&(u="mp4a.40.5")),-1!==l.indexOf("android")&&"audio/mpeg"!==a.container&&(u="mp4a.40.2",this.log("Android: force audio codec to "+u)),e.audioCodec&&e.audioCodec!==u&&this.log('Swapping manifest audio codec "'+e.audioCodec+'" for "'+u+'"'),a.levelCodec=u,a.id="main",this.log("Init audio buffer, container:"+a.container+", codecs[selected/level/parsed]=["+(u||"")+"/"+(e.audioCodec||"")+"/"+a.codec+"]")}o&&(o.levelCodec=e.videoCodec,o.id="main",this.log("Init video buffer, container:"+o.container+", codecs[level/parsed]=["+(e.videoCodec||"")+"/"+o.codec+"]")),s&&this.log("Init audiovideo buffer, container:"+s.container+", codecs[level/parsed]=["+(e.attrs.CODECS||"")+"/"+s.codec+"]"),this.hls.trigger(b.BUFFER_CODECS,t),Object.keys(t).forEach((function(e){var a=t[e].initSegment
null!=a&&a.byteLength&&i.hls.trigger(b.BUFFER_APPENDING,{type:e,data:a,frag:r,part:null,chunkMeta:n,parent:r.type})})),this.tick()}},r.getMainFwdBufferInfo=function(){return this.getFwdBufferInfo(this.mediaBuffer?this.mediaBuffer:this.media,ut)},r.backtrack=function(e){this.couldBacktrack=!0,this.backtrackFragment=e,this.resetTransmuxer(),this.flushBufferGap(e),this.fragmentTracker.removeFragment(e),this.fragPrevious=null,this.nextLoadPosition=e.start,this.state=_r},r.checkFragmentChanged=function(){var e=this.media,t=null
if(e&&e.readyState>1&&!1===e.seeking){var r=e.currentTime
if(dr.isBuffered(e,r)?t=this.getAppendedFrag(r):dr.isBuffered(e,r+.1)&&(t=this.getAppendedFrag(r+.1)),t){this.backtrackFragment=null
var n=this.fragPlaying,i=t.level
n&&t.sn===n.sn&&n.level===i&&t.urlId===n.urlId||(this.fragPlaying=t,this.hls.trigger(b.FRAG_CHANGED,{frag:t}),n&&n.level===i||this.hls.trigger(b.LEVEL_SWITCHED,{level:i}))}}},a(t,[{key:"nextLevel",get:function(){var e=this.nextBufferedFrag
return e?e.level:-1}},{key:"currentFrag",get:function(){var e=this.media
return e?this.fragPlaying||this.getAppendedFrag(e.currentTime):null}},{key:"currentProgramDateTime",get:function(){var e=this.media
if(e){var t=e.currentTime,r=this.currentFrag
if(r&&y(t)&&y(r.programDateTime)){var n=r.programDateTime+1e3*(t-r.start)
return new Date(n)}}return null}},{key:"currentLevel",get:function(){var e=this.currentFrag
return e?e.level:-1}},{key:"nextBufferedFrag",get:function(){var e=this.currentFrag
return e?this.followingBufferedFrag(e):null}},{key:"forceStartLoad",get:function(){return this._forceStartLoad}}]),t}(Or),$n=function(){function e(e,t,r){void 0===t&&(t=0),void 0===r&&(r=0),this.halfLife=void 0,this.alpha_=void 0,this.estimate_=void 0,this.totalWeight_=void 0,this.halfLife=e,this.alpha_=e?Math.exp(Math.log(.5)/e):0,this.estimate_=t,this.totalWeight_=r}var t=e.prototype
return t.sample=function(e,t){var r=Math.pow(this.alpha_,e)
this.estimate_=t*(1-r)+r*this.estimate_,this.totalWeight_+=e},t.getTotalWeight=function(){return this.totalWeight_},t.getEstimate=function(){if(this.alpha_){var e=1-Math.pow(this.alpha_,this.totalWeight_)
if(e)return this.estimate_/e}return this.estimate_},e}(),Yn=function(){function e(e,t,r,n){void 0===n&&(n=100),this.defaultEstimate_=void 0,this.minWeight_=void 0,this.minDelayMs_=void 0,this.slow_=void 0,this.fast_=void 0,this.defaultTTFB_=void 0,this.ttfb_=void 0,this.defaultEstimate_=r,this.minWeight_=.001,this.minDelayMs_=50,this.slow_=new $n(e),this.fast_=new $n(t),this.defaultTTFB_=n,this.ttfb_=new $n(e)}var t=e.prototype
return t.update=function(e,t){var r=this.slow_,n=this.fast_,i=this.ttfb_
r.halfLife!==e&&(this.slow_=new $n(e,r.getEstimate(),r.getTotalWeight())),n.halfLife!==t&&(this.fast_=new $n(t,n.getEstimate(),n.getTotalWeight())),i.halfLife!==e&&(this.ttfb_=new $n(e,i.getEstimate(),i.getTotalWeight()))},t.sample=function(e,t){var r=(e=Math.max(e,this.minDelayMs_))/1e3,n=8*t/r
this.fast_.sample(r,n),this.slow_.sample(r,n)},t.sampleTTFB=function(e){var t=e/1e3,r=Math.sqrt(2)*Math.exp(-Math.pow(t,2)/2)
this.ttfb_.sample(r,Math.max(e,5))},t.canEstimate=function(){return this.fast_.getTotalWeight()>=this.minWeight_},t.getEstimate=function(){return this.canEstimate()?Math.min(this.fast_.getEstimate(),this.slow_.getEstimate()):this.defaultEstimate_},t.getEstimateTTFB=function(){return this.ttfb_.getTotalWeight()>=this.minWeight_?this.ttfb_.getEstimate():this.defaultTTFB_},t.destroy=function(){},e}(),Qn=function(){function e(e){this.hls=void 0,this.lastLevelLoadSec=0,this.lastLoadedFragLevel=0,this._nextAutoLevel=-1,this.timer=-1,this.onCheck=this._abandonRulesCheck.bind(this),this.fragCurrent=null,this.partCurrent=null,this.bitrateTestDelay=0,this.bwEstimator=void 0,this.hls=e
var t=e.config
this.bwEstimator=new Yn(t.abrEwmaSlowVoD,t.abrEwmaFastVoD,t.abrEwmaDefaultEstimate),this.registerListeners()}var t=e.prototype
return t.registerListeners=function(){var e=this.hls
e.on(b.FRAG_LOADING,this.onFragLoading,this),e.on(b.FRAG_LOADED,this.onFragLoaded,this),e.on(b.FRAG_BUFFERED,this.onFragBuffered,this),e.on(b.LEVEL_SWITCHING,this.onLevelSwitching,this),e.on(b.LEVEL_LOADED,this.onLevelLoaded,this)},t.unregisterListeners=function(){var e=this.hls
e.off(b.FRAG_LOADING,this.onFragLoading,this),e.off(b.FRAG_LOADED,this.onFragLoaded,this),e.off(b.FRAG_BUFFERED,this.onFragBuffered,this),e.off(b.LEVEL_SWITCHING,this.onLevelSwitching,this),e.off(b.LEVEL_LOADED,this.onLevelLoaded,this)},t.destroy=function(){this.unregisterListeners(),this.clearTimer(),this.hls=this.onCheck=null,this.fragCurrent=this.partCurrent=null},t.onFragLoading=function(e,t){var r,n=t.frag
this.ignoreFragment(n)||(this.fragCurrent=n,this.partCurrent=null!=(r=t.part)?r:null,this.clearTimer(),this.timer=self.setInterval(this.onCheck,100))},t.onLevelSwitching=function(e,t){this.clearTimer()},t.getTimeToLoadFrag=function(e,t,r,n){return e+r/t+(n?this.lastLevelLoadSec:0)},t.onLevelLoaded=function(e,t){var r=this.hls.config,n=t.stats,i=n.total,a=n.bwEstimate
y(i)&&y(a)&&(this.lastLevelLoadSec=8*i/a),t.details.live?this.bwEstimator.update(r.abrEwmaSlowLive,r.abrEwmaFastLive):this.bwEstimator.update(r.abrEwmaSlowVoD,r.abrEwmaFastVoD)},t._abandonRulesCheck=function(){var e=this.fragCurrent,t=this.partCurrent,r=this.hls,n=r.autoLevelEnabled,i=r.media
if(e&&i){var a=performance.now(),o=t?t.stats:e.stats,s=t?t.duration:e.duration,u=a-o.loading.start
if(o.aborted||o.loaded&&o.loaded===o.total||0===e.level)return this.clearTimer(),void(this._nextAutoLevel=-1)
if(n&&!i.paused&&i.playbackRate&&i.readyState){var l=r.mainForwardBufferInfo
if(null!==l){var c=this.bwEstimator.getEstimateTTFB(),d=Math.abs(i.playbackRate)
if(!(u<=Math.max(c,s/(2*d)*1e3))){var h=l.len/d
if(!(h>=2*s/d)){var f=o.loading.first?o.loading.first-o.loading.start:-1,p=o.loaded&&f>-1,g=this.bwEstimator.getEstimate(),m=r.levels,v=r.minAutoLevel,E=m[e.level],w=o.total||Math.max(o.loaded,Math.round(s*E.maxBitrate/8)),_=u-f
_<1&&p&&(_=Math.min(u,8*o.loaded/g))
var T=p?1e3*o.loaded/_:0,A=T?(w-o.loaded)/T:8*w/g+c/1e3
if(!(A<=h)){var D,S=T?8*T:g,x=Number.POSITIVE_INFINITY
for(D=e.level-1;D>v;D--){var C=m[D].maxBitrate
if((x=this.getTimeToLoadFrag(c/1e3,S,s*C,!m[D].details))<h)break}x>=A||x>10*s||(r.nextLoadLevel=D,p?this.bwEstimator.sample(u-Math.min(c,f),o.loaded):this.bwEstimator.sampleTTFB(u),this.clearTimer(),k.warn("[abr] Fragment "+e.sn+(t?" part "+t.index:"")+" of level "+e.level+" is loading too slowly;\n      Time to underbuffer: "+h.toFixed(3)+" s\n      Estimated load time for current fragment: "+A.toFixed(3)+" s\n      Estimated load time for down switch fragment: "+x.toFixed(3)+" s\n      TTFB estimate: "+f+"\n      Current BW estimate: "+(y(g)?(g/1024).toFixed(3):"Unknown")+" Kb/s\n      New BW estimate: "+(this.bwEstimator.getEstimate()/1024).toFixed(3)+" Kb/s\n      Aborting and switching to level "+D),e.loader&&(this.fragCurrent=this.partCurrent=null,e.abortRequests()),r.trigger(b.FRAG_LOAD_EMERGENCY_ABORTED,{frag:e,part:t,stats:o}))}}}}}}},t.onFragLoaded=function(e,t){var r=t.frag,n=t.part,i=n?n.stats:r.stats
if(r.type===ut&&this.bwEstimator.sampleTTFB(i.loading.first-i.loading.start),!this.ignoreFragment(r)){if(this.clearTimer(),this.lastLoadedFragLevel=r.level,this._nextAutoLevel=-1,this.hls.config.abrMaxWithRealBitrate){var a=n?n.duration:r.duration,o=this.hls.levels[r.level],s=(o.loaded?o.loaded.bytes:0)+i.loaded,u=(o.loaded?o.loaded.duration:0)+a
o.loaded={bytes:s,duration:u},o.realBitrate=Math.round(8*s/u)}if(r.bitrateTest){var l={stats:i,frag:r,part:n,id:r.type}
this.onFragBuffered(b.FRAG_BUFFERED,l),r.bitrateTest=!1}}},t.onFragBuffered=function(e,t){var r=t.frag,n=t.part,i=null!=n&&n.stats.loaded?n.stats:r.stats
if(!i.aborted&&!this.ignoreFragment(r)){var a=i.parsing.end-i.loading.start-Math.min(i.loading.first-i.loading.start,this.bwEstimator.getEstimateTTFB())
this.bwEstimator.sample(a,i.loaded),i.bwEstimate=this.bwEstimator.getEstimate(),r.bitrateTest?this.bitrateTestDelay=a/1e3:this.bitrateTestDelay=0}},t.ignoreFragment=function(e){return e.type!==ut||"initSegment"===e.sn},t.clearTimer=function(){self.clearInterval(this.timer)},t.getNextABRAutoLevel=function(){var e=this.fragCurrent,t=this.partCurrent,r=this.hls,n=r.maxAutoLevel,i=r.config,a=r.minAutoLevel,o=r.media,s=t?t.duration:e?e.duration:0,u=o&&0!==o.playbackRate?Math.abs(o.playbackRate):1,l=this.bwEstimator?this.bwEstimator.getEstimate():i.abrEwmaDefaultEstimate,c=r.mainForwardBufferInfo,d=(c?c.len:0)/u,h=this.findBestLevel(l,a,n,d,i.abrBandWidthFactor,i.abrBandWidthUpFactor)
if(h>=0)return h
k.trace("[abr] "+(d?"rebuffering expected":"buffer is empty")+", finding optimal quality level")
var f=s?Math.min(s,i.maxStarvationDelay):i.maxStarvationDelay,p=i.abrBandWidthFactor,g=i.abrBandWidthUpFactor
if(!d){var m=this.bitrateTestDelay
m&&(f=(s?Math.min(s,i.maxLoadingDelay):i.maxLoadingDelay)-m,k.trace("[abr] bitrate test took "+Math.round(1e3*m)+"ms, set first fragment max fetchDuration to "+Math.round(1e3*f)+" ms"),p=g=1)}return h=this.findBestLevel(l,a,n,d+f,p,g),Math.max(h,0)},t.findBestLevel=function(e,t,r,n,i,a){for(var o,s=this.fragCurrent,u=this.partCurrent,l=this.lastLoadedFragLevel,c=this.hls.levels,d=c[l],h=!(null==d||null==(o=d.details)||!o.live),f=null==d?void 0:d.codecSet,p=u?u.duration:s?s.duration:0,g=this.bwEstimator.getEstimateTTFB()/1e3,m=t,v=-1,b=r;b>=t;b--){var E=c[b]
if(!E||f&&E.codecSet!==f)E&&(m=Math.min(b,m),v=Math.max(b,v))
else{-1!==v&&k.trace("[abr] Skipped level(s) "+m+"-"+v+' with CODECS:"'+c[v].attrs.CODECS+'"; not compatible with "'+d.attrs.CODECS+'"')
var w,_=E.details,T=(u?null==_?void 0:_.partTarget:null==_?void 0:_.averagetargetduration)||p
w=b<=l?i*e:a*e
var A=c[b].maxBitrate,D=this.getTimeToLoadFrag(g,w,A*T,void 0===_)
if(k.trace("[abr] level:"+b+" adjustedbw-bitrate:"+Math.round(w-A)+" avgDuration:"+T.toFixed(1)+" maxFetchDuration:"+n.toFixed(1)+" fetchDuration:"+D.toFixed(1)),w>A&&(0===D||!y(D)||h&&!this.bitrateTestDelay||D<n))return b}}return-1},a(e,[{key:"nextAutoLevel",get:function(){var e=this._nextAutoLevel,t=this.bwEstimator
if(-1!==e&&!t.canEstimate())return e
var r=this.getNextABRAutoLevel()
if(-1!==e){var n=this.hls.levels
if(n.length>Math.max(e,r)&&n[e].loadError<=n[r].loadError)return e}return-1!==e&&(r=Math.min(e,r)),r},set:function(e){this._nextAutoLevel=e}}]),e}(),Xn=function(){function e(){this.chunks=[],this.dataLength=0}var t=e.prototype
return t.push=function(e){this.chunks.push(e),this.dataLength+=e.length},t.flush=function(){var e,t=this.chunks,r=this.dataLength
return t.length?(e=1===t.length?t[0]:function(e,t){for(var r=new Uint8Array(t),n=0,i=0;i<e.length;i++){var a=e[i]
r.set(a,n),n+=a.length}return r}(t,r),this.reset(),e):new Uint8Array(0)},t.reset=function(){this.chunks.length=0,this.dataLength=0},e}(),Zn=function(e){function t(t,r,n){var i
return(i=e.call(this,t,r,n,"[audio-stream-controller]",lt)||this).videoBuffer=null,i.videoTrackCC=-1,i.waitingVideoCC=-1,i.bufferedTrack=null,i.switchingTrack=null,i.trackId=-1,i.waitingData=null,i.mainDetails=null,i.bufferFlushed=!1,i.cachedTrackLoadedData=null,i._registerListeners(),i}u(t,e)
var r=t.prototype
return r.onHandlerDestroying=function(){this._unregisterListeners(),this.mainDetails=null,this.bufferedTrack=null,this.switchingTrack=null},r._registerListeners=function(){var e=this.hls
e.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.LEVEL_LOADED,this.onLevelLoaded,this),e.on(b.AUDIO_TRACKS_UPDATED,this.onAudioTracksUpdated,this),e.on(b.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),e.on(b.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),e.on(b.ERROR,this.onError,this),e.on(b.BUFFER_RESET,this.onBufferReset,this),e.on(b.BUFFER_CREATED,this.onBufferCreated,this),e.on(b.BUFFER_FLUSHED,this.onBufferFlushed,this),e.on(b.INIT_PTS_FOUND,this.onInitPtsFound,this),e.on(b.FRAG_BUFFERED,this.onFragBuffered,this)},r._unregisterListeners=function(){var e=this.hls
e.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.LEVEL_LOADED,this.onLevelLoaded,this),e.off(b.AUDIO_TRACKS_UPDATED,this.onAudioTracksUpdated,this),e.off(b.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),e.off(b.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),e.off(b.ERROR,this.onError,this),e.off(b.BUFFER_RESET,this.onBufferReset,this),e.off(b.BUFFER_CREATED,this.onBufferCreated,this),e.off(b.BUFFER_FLUSHED,this.onBufferFlushed,this),e.off(b.INIT_PTS_FOUND,this.onInitPtsFound,this),e.off(b.FRAG_BUFFERED,this.onFragBuffered,this)},r.onInitPtsFound=function(e,t){var r=t.frag,n=t.id,i=t.initPTS,a=t.timescale
if("main"===n){var o=r.cc
this.initPTS[r.cc]={baseTime:i,timescale:a},this.log("InitPTS for cc: "+o+" found from main: "+i),this.videoTrackCC=o,this.state===Rr&&this.tick()}},r.startLoad=function(e){if(!this.levels)return this.startPosition=e,void(this.state=wr)
var t=this.lastCurrentTime
this.stopLoad(),this.setInterval(100),t>0&&-1===e?(this.log("Override startPosition with lastCurrentTime @"+t.toFixed(3)),e=t,this.state=_r):(this.loadedmetadata=!1,this.state=kr),this.nextLoadPosition=this.startPosition=this.lastCurrentTime=e,this.tick()},r.doTick=function(){switch(this.state){case _r:this.doTickIdle()
break
case kr:var t,r=this.levels,n=this.trackId,i=null==r||null==(t=r[n])?void 0:t.details
if(i){if(this.waitForCdnTuneIn(i))break
this.state=Rr}break
case Dr:var a,o=performance.now(),s=this.retryDate;(!s||o>=s||null!=(a=this.media)&&a.seeking)&&(this.log("RetryDate reached, switch back to IDLE state"),this.resetStartWhenNotLoaded(this.trackId),this.state=_r)
break
case Rr:var u=this.waitingData
if(u){var l=u.frag,c=u.part,d=u.cache,h=u.complete
if(void 0!==this.initPTS[l.cc]){this.waitingData=null,this.waitingVideoCC=-1,this.state=Ar
var f={frag:l,part:c,payload:d.flush(),networkDetails:null}
this._handleFragmentLoadProgress(f),h&&e.prototype._handleFragmentLoadComplete.call(this,f)}else if(this.videoTrackCC!==this.waitingVideoCC)this.log("Waiting fragment cc ("+l.cc+") cancelled because video is at cc "+this.videoTrackCC),this.clearWaitingFragment()
else{var p=this.getLoadPosition(),g=dr.bufferInfo(this.mediaBuffer,p,this.config.maxBufferHole)
Gt(g.end,this.config.maxFragLookUpTolerance,l)<0&&(this.log("Waiting fragment cc ("+l.cc+") @ "+l.start+" cancelled because another fragment at "+g.end+" is needed"),this.clearWaitingFragment())}}else this.state=_r}this.onTickEnd()},r.clearWaitingFragment=function(){var e=this.waitingData
e&&(this.fragmentTracker.removeFragment(e.frag),this.waitingData=null,this.waitingVideoCC=-1,this.state=_r)},r.resetLoadingState=function(){this.clearWaitingFragment(),e.prototype.resetLoadingState.call(this)},r.onTickEnd=function(){var e=this.media
null!=e&&e.readyState&&(this.lastCurrentTime=e.currentTime)},r.doTickIdle=function(){var e=this.hls,t=this.levels,r=this.media,n=this.trackId,i=e.config
if(null!=t&&t[n]&&(r||!this.startFragRequested&&i.startFragPrefetch)){var a=t[n],o=a.details
if(!o||o.live&&this.levelLastLoaded!==n||this.waitForCdnTuneIn(o))this.state=kr
else{var s=this.mediaBuffer?this.mediaBuffer:this.media
this.bufferFlushed&&s&&(this.bufferFlushed=!1,this.afterBufferFlushed(s,O,lt))
var u=this.getFwdBufferInfo(s,lt)
if(null!==u){var l=this.bufferedTrack,c=this.switchingTrack
if(!c&&this._streamEnded(u,o))return e.trigger(b.BUFFER_EOS,{type:"audio"}),void(this.state=Cr)
var d=this.getFwdBufferInfo(this.videoBuffer?this.videoBuffer:this.media,ut),h=u.len,f=this.getMaxBufferLength(null==d?void 0:d.len)
if(!(h>=f)||c){var p=o.fragments[0].start,g=u.end
if(c&&r){var m=this.getLoadPosition()
l&&c.attrs!==l.attrs&&(g=m),o.PTSKnown&&m<p&&(u.end>p||u.nextStart)&&(this.log("Alt audio track ahead of main track, seek to start of alt audio track"),r.currentTime=p+.05)}var v=this.getNextFragment(g,o),y=!1
if(v&&this.isLoopLoading(v,g)&&(y=!!v.gap,v=this.getNextFragmentLoopLoading(v,o,u,ut,f)),v){var E=d&&v.start>d.end+o.targetduration
if(E||(null==d||!d.len)&&u.len){var w=this.getAppendedFrag(v.start,ut)
if(null===w)return
if(y||(y=!!w.gap||!!E&&0===d.len),E&&!y||y&&u.nextStart&&u.nextStart<w.end)return}this.loadFragment(v,a,g)}else this.bufferFlushed=!0}}}}},r.getMaxBufferLength=function(t){var r=e.prototype.getMaxBufferLength.call(this)
return t?Math.min(Math.max(r,t),this.config.maxMaxBufferLength):r},r.onMediaDetaching=function(){this.videoBuffer=null,e.prototype.onMediaDetaching.call(this)},r.onAudioTracksUpdated=function(e,t){var r=t.audioTracks
this.resetTransmuxer(),this.levels=r.map((function(e){return new St(e)}))},r.onAudioTrackSwitching=function(e,t){var r=!!t.url
this.trackId=t.id
var n=this.fragCurrent
n&&(n.abortRequests(),this.removeUnbufferedFrags(n.start)),this.resetLoadingState(),r?this.setInterval(100):this.resetTransmuxer(),r?(this.switchingTrack=t,this.state=_r):(this.switchingTrack=null,this.bufferedTrack=t,this.state=wr),this.tick()},r.onManifestLoading=function(){this.fragmentTracker.removeAllFragments(),this.startPosition=this.lastCurrentTime=0,this.bufferFlushed=!1,this.levels=this.mainDetails=this.waitingData=this.bufferedTrack=this.cachedTrackLoadedData=this.switchingTrack=null,this.startFragRequested=!1,this.trackId=this.videoTrackCC=this.waitingVideoCC=-1},r.onLevelLoaded=function(e,t){this.mainDetails=t.details,null!==this.cachedTrackLoadedData&&(this.hls.trigger(b.AUDIO_TRACK_LOADED,this.cachedTrackLoadedData),this.cachedTrackLoadedData=null)},r.onAudioTrackLoaded=function(e,t){var r
if(null!=this.mainDetails){var n=this.levels,i=t.details,a=t.id
if(n){this.log("Track "+a+" loaded ["+i.startSN+","+i.endSN+"]"+(i.lastPartSn?"[part-"+i.lastPartSn+"-"+i.lastPartIndex+"]":"")+",duration:"+i.totalduration)
var o=n[a],s=0
if(i.live||null!=(r=o.details)&&r.live){var u=this.mainDetails
if(i.fragments[0]||(i.deltaUpdateFailed=!0),i.deltaUpdateFailed||!u)return
!o.details&&i.hasProgramDateTime&&u.hasProgramDateTime?(mr(i,u),s=i.fragments[0].start):s=this.alignPlaylists(i,o.details)}o.details=i,this.levelLastLoaded=a,this.startFragRequested||!this.mainDetails&&i.live||this.setStartPosition(o.details,s),this.state!==kr||this.waitForCdnTuneIn(i)||(this.state=_r),this.tick()}else this.warn("Audio tracks were reset while loading level "+a)}else this.cachedTrackLoadedData=t},r._handleFragmentLoadProgress=function(e){var t,r=e.frag,n=e.part,i=e.payload,a=this.config,o=this.trackId,s=this.levels
if(s){var u=s[o]
if(u){var l=u.details
if(!l)return this.warn("Audio track details undefined on fragment load progress"),void this.removeUnbufferedFrags(r.start)
var c=a.defaultAudioCodec||u.audioCodec||"mp4a.40.2",d=this.transmuxer
d||(d=this.transmuxer=new zn(this.hls,lt,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this)))
var h=this.initPTS[r.cc],f=null==(t=r.initSegment)?void 0:t.data
if(void 0!==h){var p=n?n.index:-1,g=-1!==p,m=new hr(r.level,r.sn,r.stats.chunkCount,i.byteLength,p,g)
d.push(i,f,c,"",r,n,l.totalduration,!1,m,h)}else this.log("Unknown video PTS for cc "+r.cc+", waiting for video PTS before demuxing audio frag "+r.sn+" of ["+l.startSN+" ,"+l.endSN+"],track "+o),(this.waitingData=this.waitingData||{frag:r,part:n,cache:new Xn,complete:!1}).cache.push(new Uint8Array(i)),this.waitingVideoCC=this.videoTrackCC,this.state=Rr}else this.warn("Audio track is undefined on fragment load progress")}else this.warn("Audio tracks were reset while fragment load was in progress. Fragment "+r.sn+" of level "+r.level+" will not be buffered")},r._handleFragmentLoadComplete=function(t){this.waitingData?this.waitingData.complete=!0:e.prototype._handleFragmentLoadComplete.call(this,t)},r.onBufferReset=function(){this.mediaBuffer=this.videoBuffer=null,this.loadedmetadata=!1},r.onBufferCreated=function(e,t){var r=t.tracks.audio
r&&(this.mediaBuffer=r.buffer||null),t.tracks.video&&(this.videoBuffer=t.tracks.video.buffer||null)},r.onFragBuffered=function(e,t){var r,i=t.frag,a=t.part
if(i.type===lt)if(this.fragContextChanged(i))this.warn("Fragment "+i.sn+(a?" p: "+a.index:"")+" of level "+i.level+" finished buffering, but was aborted. state: "+this.state+", audioSwitch: "+(this.switchingTrack?this.switchingTrack.name:"false"))
else{if("initSegment"!==i.sn){this.fragPrevious=i
var o=this.switchingTrack
o&&(this.bufferedTrack=o,this.switchingTrack=null,this.hls.trigger(b.AUDIO_TRACK_SWITCHED,n({},o)))}this.fragBufferedComplete(i,a)}else this.loadedmetadata||i.type!==ut||null!=(r=this.videoBuffer||this.media)&&r.buffered.length&&(this.loadedmetadata=!0)},r.onError=function(t,r){var n
if(r.fatal)this.state=Lr
else switch(r.details){case w.FRAG_GAP:case w.FRAG_PARSING_ERROR:case w.FRAG_DECRYPT_ERROR:case w.FRAG_LOAD_ERROR:case w.FRAG_LOAD_TIMEOUT:case w.KEY_LOAD_ERROR:case w.KEY_LOAD_TIMEOUT:this.onFragmentOrKeyLoadError(lt,r)
break
case w.AUDIO_TRACK_LOAD_ERROR:case w.AUDIO_TRACK_LOAD_TIMEOUT:case w.LEVEL_PARSING_ERROR:r.levelRetry||this.state!==kr||(null==(n=r.context)?void 0:n.type)!==ot||(this.state=_r)
break
case w.BUFFER_FULL_ERROR:if(!r.parent||"audio"!==r.parent)return
this.reduceLengthAndFlushBuffer(r)&&(this.bufferedTrack=null,e.prototype.flushMainBuffer.call(this,0,Number.POSITIVE_INFINITY,"audio"))
break
case w.INTERNAL_EXCEPTION:this.recoverWorkerError(r)}},r.onBufferFlushed=function(e,t){t.type===O&&(this.bufferFlushed=!0,this.state===Cr&&(this.state=_r))},r._handleTransmuxComplete=function(e){var t,r="audio",n=this.hls,i=e.remuxResult,a=e.chunkMeta,o=this.getCurrentContext(a)
if(o){var u=o.frag,l=o.part,c=o.level.details,d=i.audio,h=i.text,f=i.id3,p=i.initSegment
if(!this.fragContextChanged(u)&&c){if(this.state=Sr,this.switchingTrack&&d&&this.completeAudioSwitch(this.switchingTrack),null!=p&&p.tracks){var g=u.initSegment||u
this._bufferInitSegment(p.tracks,g,a),n.trigger(b.FRAG_PARSING_INIT_SEGMENT,{frag:g,id:r,tracks:p.tracks})}if(d){var m=d.startPTS,v=d.endPTS,y=d.startDTS,E=d.endDTS
l&&(l.elementaryStreams[O]={startPTS:m,endPTS:v,startDTS:y,endDTS:E}),u.setElementaryStreamInfo(O,m,v,y,E),this.bufferFragmentData(d,u,l,a)}if(null!=f&&null!=(t=f.samples)&&t.length){var w=s({id:r,frag:u,details:c},f)
n.trigger(b.FRAG_PARSING_METADATA,w)}if(h){var _=s({id:r,frag:u,details:c},h)
n.trigger(b.FRAG_PARSING_USERDATA,_)}}else this.fragmentTracker.removeFragment(u)}else this.resetWhenMissingContext(a)},r._bufferInitSegment=function(e,t,r){if(this.state===Sr){e.video&&delete e.video
var n=e.audio
if(n){n.levelCodec=n.codec,n.id="audio",this.log("Init audio buffer, container:"+n.container+", codecs[parsed]=["+n.codec+"]"),this.hls.trigger(b.BUFFER_CODECS,e)
var i=n.initSegment
if(null!=i&&i.byteLength){var a={type:"audio",frag:t,part:null,chunkMeta:r,parent:t.type,data:i}
this.hls.trigger(b.BUFFER_APPENDING,a)}this.tick()}}},r.loadFragment=function(t,r,n){var i,a=this.fragmentTracker.getState(t)
this.fragCurrent=t,this.switchingTrack||a===Qt||a===Zt?"initSegment"===t.sn?this._loadInitSegment(t,r):null!=(i=r.details)&&i.live&&!this.initPTS[t.cc]?(this.log("Waiting for video PTS in continuity counter "+t.cc+" of live stream before loading audio fragment "+t.sn+" of level "+this.trackId),this.state=Rr):(this.startFragRequested=!0,e.prototype.loadFragment.call(this,t,r,n)):this.clearTrackerIfNeeded(t)},r.completeAudioSwitch=function(t){var r=this.hls,i=this.media,a=this.bufferedTrack,o=null==a?void 0:a.attrs,s=t.attrs
i&&o&&(o.CHANNELS!==s.CHANNELS||o.NAME!==s.NAME||o.LANGUAGE!==s.LANGUAGE)&&(this.log("Switching audio track : flushing all audio"),e.prototype.flushMainBuffer.call(this,0,Number.POSITIVE_INFINITY,"audio")),this.bufferedTrack=t,this.switchingTrack=null,r.trigger(b.AUDIO_TRACK_SWITCHED,n({},t))},t}(Or),Jn=function(e){function t(t){var r
return(r=e.call(this,t,"[audio-track-controller]")||this).tracks=[],r.groupId=null,r.tracksInGroup=[],r.trackId=-1,r.currentTrack=null,r.selectDefaultTrack=!0,r.registerListeners(),r}u(t,e)
var r=t.prototype
return r.registerListeners=function(){var e=this.hls
e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.MANIFEST_PARSED,this.onManifestParsed,this),e.on(b.LEVEL_LOADING,this.onLevelLoading,this),e.on(b.LEVEL_SWITCHING,this.onLevelSwitching,this),e.on(b.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),e.on(b.ERROR,this.onError,this)},r.unregisterListeners=function(){var e=this.hls
e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.MANIFEST_PARSED,this.onManifestParsed,this),e.off(b.LEVEL_LOADING,this.onLevelLoading,this),e.off(b.LEVEL_SWITCHING,this.onLevelSwitching,this),e.off(b.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),e.off(b.ERROR,this.onError,this)},r.destroy=function(){this.unregisterListeners(),this.tracks.length=0,this.tracksInGroup.length=0,this.currentTrack=null,e.prototype.destroy.call(this)},r.onManifestLoading=function(){this.tracks=[],this.groupId=null,this.tracksInGroup=[],this.trackId=-1,this.currentTrack=null,this.selectDefaultTrack=!0},r.onManifestParsed=function(e,t){this.tracks=t.audioTracks||[]},r.onAudioTrackLoaded=function(e,t){var r=t.id,n=t.groupId,i=t.details,a=this.tracksInGroup[r]
if(a&&a.groupId===n){var o=a.details
a.details=t.details,this.log("audio-track "+r+' "'+a.name+'" lang:'+a.lang+" group:"+n+" loaded ["+i.startSN+"-"+i.endSN+"]"),r===this.trackId&&this.playlistLoaded(r,t,o)}else this.warn("Track with id:"+r+" and group:"+n+" not found in active group "+a.groupId)},r.onLevelLoading=function(e,t){this.switchLevel(t.level)},r.onLevelSwitching=function(e,t){this.switchLevel(t.level)},r.switchLevel=function(e){var t=this.hls.levels[e]
if(null!=t&&t.audioGroupIds){var r=t.audioGroupIds[t.urlId]
if(this.groupId!==r){this.groupId=r||null
var n=this.tracks.filter((function(e){return!r||e.groupId===r}))
this.selectDefaultTrack&&!n.some((function(e){return e.default}))&&(this.selectDefaultTrack=!1),this.tracksInGroup=n
var i={audioTracks:n}
this.log("Updating audio tracks, "+n.length+" track(s) found in group:"+r),this.hls.trigger(b.AUDIO_TRACKS_UPDATED,i),this.selectInitialTrack()}else this.shouldReloadPlaylist(this.currentTrack)&&this.setAudioTrack(this.trackId)}},r.onError=function(e,t){!t.fatal&&t.context&&t.context.type===ot&&t.context.id===this.trackId&&t.context.groupId===this.groupId&&(this.requestScheduled=-1,this.checkRetry(t))},r.setAudioTrack=function(e){var t=this.tracksInGroup
if(e<0||e>=t.length)this.warn("Invalid id passed to audio-track controller")
else{this.clearTimer()
var r=this.currentTrack
t[this.trackId]
var i=t[e],a=i.groupId,o=i.name
if(this.log("Switching to audio-track "+e+' "'+o+'" lang:'+i.lang+" group:"+a),this.trackId=e,this.currentTrack=i,this.selectDefaultTrack=!1,this.hls.trigger(b.AUDIO_TRACK_SWITCHING,n({},i)),!i.details||i.details.live){var s=this.switchParams(i.url,null==r?void 0:r.details)
this.loadPlaylist(s)}}},r.selectInitialTrack=function(){var e=this.tracksInGroup,t=this.findTrackId(this.currentTrack)|this.findTrackId(null)
if(-1!==t)this.setAudioTrack(t)
else{var r=new Error("No track found for running audio group-ID: "+this.groupId+" track count: "+e.length)
this.warn(r.message),this.hls.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.AUDIO_TRACK_LOAD_ERROR,fatal:!0,error:r})}},r.findTrackId=function(e){for(var t=this.tracksInGroup,r=0;r<t.length;r++){var n=t[r]
if(!this.selectDefaultTrack||n.default){if(!e||void 0!==e.attrs["STABLE-RENDITION-ID"]&&e.attrs["STABLE-RENDITION-ID"]===n.attrs["STABLE-RENDITION-ID"])return n.id
if(e.name===n.name&&e.lang===n.lang)return n.id}}return-1},r.loadPlaylist=function(t){e.prototype.loadPlaylist.call(this)
var r=this.tracksInGroup[this.trackId]
if(this.shouldLoadPlaylist(r)){var n=r.id,i=r.groupId,a=r.url
if(t)try{a=t.addDirectives(a)}catch(e){this.warn("Could not construct new URL with HLS Delivery Directives: "+e)}this.log("loading audio-track playlist "+n+' "'+r.name+'" lang:'+r.lang+" group:"+i),this.clearTimer(),this.hls.trigger(b.AUDIO_TRACK_LOADING,{url:a,id:n,groupId:i,deliveryDirectives:t||null})}},a(t,[{key:"audioTracks",get:function(){return this.tracksInGroup}},{key:"audioTrack",get:function(){return this.trackId},set:function(e){this.selectDefaultTrack=!1,this.setAudioTrack(e)}}]),t}(Kt)
function ei(e,t){if(e.length!==t.length)return!1
for(var r=0;r<e.length;r++)if(!ti(e[r].attrs,t[r].attrs))return!1
return!0}function ti(e,t){var r=e["STABLE-RENDITION-ID"]
return r?r===t["STABLE-RENDITION-ID"]:!["LANGUAGE","NAME","CHARACTERISTICS","AUTOSELECT","DEFAULT","FORCED"].some((function(r){return e[r]!==t[r]}))}var ri=function(e){function t(t,r,n){var i
return(i=e.call(this,t,r,n,"[subtitle-stream-controller]",ct)||this).levels=[],i.currentTrackId=-1,i.tracksBuffered=[],i.mainDetails=null,i._registerListeners(),i}u(t,e)
var r=t.prototype
return r.onHandlerDestroying=function(){this._unregisterListeners(),this.mainDetails=null},r._registerListeners=function(){var e=this.hls
e.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.LEVEL_LOADED,this.onLevelLoaded,this),e.on(b.ERROR,this.onError,this),e.on(b.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),e.on(b.SUBTITLE_TRACK_SWITCH,this.onSubtitleTrackSwitch,this),e.on(b.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),e.on(b.SUBTITLE_FRAG_PROCESSED,this.onSubtitleFragProcessed,this),e.on(b.BUFFER_FLUSHING,this.onBufferFlushing,this),e.on(b.FRAG_BUFFERED,this.onFragBuffered,this)},r._unregisterListeners=function(){var e=this.hls
e.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.LEVEL_LOADED,this.onLevelLoaded,this),e.off(b.ERROR,this.onError,this),e.off(b.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),e.off(b.SUBTITLE_TRACK_SWITCH,this.onSubtitleTrackSwitch,this),e.off(b.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),e.off(b.SUBTITLE_FRAG_PROCESSED,this.onSubtitleFragProcessed,this),e.off(b.BUFFER_FLUSHING,this.onBufferFlushing,this),e.off(b.FRAG_BUFFERED,this.onFragBuffered,this)},r.startLoad=function(e){this.stopLoad(),this.state=_r,this.setInterval(500),this.nextLoadPosition=this.startPosition=this.lastCurrentTime=e,this.tick()},r.onManifestLoading=function(){this.mainDetails=null,this.fragmentTracker.removeAllFragments()},r.onMediaDetaching=function(){this.tracksBuffered=[],e.prototype.onMediaDetaching.call(this)},r.onLevelLoaded=function(e,t){this.mainDetails=t.details},r.onSubtitleFragProcessed=function(e,t){var r=t.frag,n=t.success
if(this.fragPrevious=r,this.state=_r,n){var i=this.tracksBuffered[this.currentTrackId]
if(i){for(var a,o=r.start,s=0;s<i.length;s++)if(o>=i[s].start&&o<=i[s].end){a=i[s]
break}var u=r.start+r.duration
a?a.end=u:(a={start:o,end:u},i.push(a)),this.fragmentTracker.fragBuffered(r)}}},r.onBufferFlushing=function(e,t){var r=t.startOffset,n=t.endOffset
if(0===r&&n!==Number.POSITIVE_INFINITY){var i=this.currentTrackId,a=this.levels
if(!a.length||!a[i]||!a[i].details)return
var o=n-a[i].details.targetduration
if(o<=0)return
t.endOffsetSubtitles=Math.max(0,o),this.tracksBuffered.forEach((function(e){for(var t=0;t<e.length;)if(e[t].end<=o)e.shift()
else{if(!(e[t].start<o))break
e[t].start=o,t++}})),this.fragmentTracker.removeFragmentsInRange(r,o,ct)}},r.onFragBuffered=function(e,t){var r
this.loadedmetadata||t.frag.type!==ut||null!=(r=this.media)&&r.buffered.length&&(this.loadedmetadata=!0)},r.onError=function(e,t){var r=t.frag;(null==r?void 0:r.type)===ct&&(this.fragCurrent&&this.fragCurrent.abortRequests(),this.state!==wr&&(this.state=_r))},r.onSubtitleTracksUpdated=function(e,t){var r=this,n=t.subtitleTracks
ei(this.levels,n)?this.levels=n.map((function(e){return new St(e)})):(this.tracksBuffered=[],this.levels=n.map((function(e){var t=new St(e)
return r.tracksBuffered[t.id]=[],t})),this.fragmentTracker.removeFragmentsInRange(0,Number.POSITIVE_INFINITY,ct),this.fragPrevious=null,this.mediaBuffer=null)},r.onSubtitleTrackSwitch=function(e,t){if(this.currentTrackId=t.id,this.levels.length&&-1!==this.currentTrackId){var r=this.levels[this.currentTrackId]
null!=r&&r.details?this.mediaBuffer=this.mediaBufferTimeRanges:this.mediaBuffer=null,r&&this.setInterval(500)}else this.clearInterval()},r.onSubtitleTrackLoaded=function(e,t){var r,n=t.details,i=t.id,a=this.currentTrackId,o=this.levels
if(o.length){var s=o[a]
if(!(i>=o.length||i!==a)&&s){this.mediaBuffer=this.mediaBufferTimeRanges
var u=0
if(n.live||null!=(r=s.details)&&r.live){var l=this.mainDetails
if(n.deltaUpdateFailed||!l)return
var c=l.fragments[0]
s.details?0===(u=this.alignPlaylists(n,s.details))&&c&&It(n,u=c.start):n.hasProgramDateTime&&l.hasProgramDateTime?(mr(n,l),u=n.fragments[0].start):c&&It(n,u=c.start)}s.details=n,this.levelLastLoaded=i,this.startFragRequested||!this.mainDetails&&n.live||this.setStartPosition(s.details,u),this.tick(),n.live&&!this.fragCurrent&&this.media&&this.state===_r&&(jt(null,n.fragments,this.media.currentTime,0)||(this.warn("Subtitle playlist not aligned with playback"),s.details=void 0))}}},r._handleFragmentLoadComplete=function(e){var t=this,r=e.frag,n=e.payload,i=r.decryptdata,a=this.hls
if(!this.fragContextChanged(r)&&n&&n.byteLength>0&&i&&i.key&&i.iv&&"AES-128"===i.method){var o=performance.now()
this.decrypter.decrypt(new Uint8Array(n),i.key.buffer,i.iv.buffer).catch((function(e){throw a.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.FRAG_DECRYPT_ERROR,fatal:!1,error:e,reason:e.message,frag:r}),e})).then((function(e){var t=performance.now()
a.trigger(b.FRAG_DECRYPTED,{frag:r,payload:e,stats:{tstart:o,tdecrypt:t}})})).catch((function(e){t.warn(e.name+": "+e.message),t.state=_r}))}},r.doTick=function(){if(this.media){if(this.state===_r){var e=this.currentTrackId,t=this.levels,r=t[e]
if(!t.length||!r||!r.details)return
var n=r.details,i=n.targetduration,a=this.config,o=this.getLoadPosition(),s=dr.bufferedInfo(this.tracksBuffered[this.currentTrackId]||[],o-i,a.maxBufferHole),u=s.end,l=s.len,c=this.getFwdBufferInfo(this.media,ut)
if(l>this.getMaxBufferLength(null==c?void 0:c.len)+i)return
var d=n.fragments,h=d.length,f=n.edge,p=null,g=this.fragPrevious
if(u<f){var m=a.maxFragLookUpTolerance
!(p=jt(g,d,Math.max(d[0].start,u),m))&&g&&g.start<d[0].start&&(p=d[0])}else p=d[h-1]
if(!p)return
p=this.mapToInitFragWhenRequired(p),this.fragmentTracker.getState(p)===Qt&&this.loadFragment(p,r,u)}}else this.state=_r},r.getMaxBufferLength=function(t){var r=e.prototype.getMaxBufferLength.call(this)
return t?Math.max(r,t):r},r.loadFragment=function(t,r,n){this.fragCurrent=t,"initSegment"===t.sn?this._loadInitSegment(t,r):(this.startFragRequested=!0,e.prototype.loadFragment.call(this,t,r,n))},a(t,[{key:"mediaBufferTimeRanges",get:function(){return new ni(this.tracksBuffered[this.currentTrackId]||[])}}]),t}(Or),ni=function(e){this.buffered=void 0
var t=function(t,r,n){if((r>>>=0)>n-1)throw new DOMException("Failed to execute '"+t+"' on 'TimeRanges': The index provided ("+r+") is greater than the maximum bound ("+n+")")
return e[r][t]}
this.buffered={get length(){return e.length},end:function(r){return t("end",r,e.length)},start:function(r){return t("start",r,e.length)}}},ii=function(e){function t(t){var r
return(r=e.call(this,t,"[subtitle-track-controller]")||this).media=null,r.tracks=[],r.groupId=null,r.tracksInGroup=[],r.trackId=-1,r.selectDefaultTrack=!0,r.queuedDefaultTrack=-1,r.trackChangeListener=function(){return r.onTextTracksChanged()},r.asyncPollTrackChange=function(){return r.pollTrackChange(0)},r.useTextTrackPolling=!1,r.subtitlePollingInterval=-1,r._subtitleDisplay=!0,r.registerListeners(),r}u(t,e)
var r=t.prototype
return r.destroy=function(){this.unregisterListeners(),this.tracks.length=0,this.tracksInGroup.length=0,this.trackChangeListener=this.asyncPollTrackChange=null,e.prototype.destroy.call(this)},r.registerListeners=function(){var e=this.hls
e.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.MANIFEST_PARSED,this.onManifestParsed,this),e.on(b.LEVEL_LOADING,this.onLevelLoading,this),e.on(b.LEVEL_SWITCHING,this.onLevelSwitching,this),e.on(b.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),e.on(b.ERROR,this.onError,this)},r.unregisterListeners=function(){var e=this.hls
e.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.MANIFEST_PARSED,this.onManifestParsed,this),e.off(b.LEVEL_LOADING,this.onLevelLoading,this),e.off(b.LEVEL_SWITCHING,this.onLevelSwitching,this),e.off(b.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),e.off(b.ERROR,this.onError,this)},r.onMediaAttached=function(e,t){this.media=t.media,this.media&&(this.queuedDefaultTrack>-1&&(this.subtitleTrack=this.queuedDefaultTrack,this.queuedDefaultTrack=-1),this.useTextTrackPolling=!(this.media.textTracks&&"onchange"in this.media.textTracks),this.useTextTrackPolling?this.pollTrackChange(500):this.media.textTracks.addEventListener("change",this.asyncPollTrackChange))},r.pollTrackChange=function(e){self.clearInterval(this.subtitlePollingInterval),this.subtitlePollingInterval=self.setInterval(this.trackChangeListener,e)},r.onMediaDetaching=function(){this.media&&(self.clearInterval(this.subtitlePollingInterval),this.useTextTrackPolling||this.media.textTracks.removeEventListener("change",this.asyncPollTrackChange),this.trackId>-1&&(this.queuedDefaultTrack=this.trackId),ai(this.media.textTracks).forEach((function(e){mt(e)})),this.subtitleTrack=-1,this.media=null)},r.onManifestLoading=function(){this.tracks=[],this.groupId=null,this.tracksInGroup=[],this.trackId=-1,this.selectDefaultTrack=!0},r.onManifestParsed=function(e,t){this.tracks=t.subtitleTracks},r.onSubtitleTrackLoaded=function(e,t){var r=t.id,n=t.details,i=this.trackId,a=this.tracksInGroup[i]
if(a){var o=a.details
a.details=t.details,this.log("subtitle track "+r+" loaded ["+n.startSN+"-"+n.endSN+"]"),r===this.trackId&&this.playlistLoaded(r,t,o)}else this.warn("Invalid subtitle track id "+r)},r.onLevelLoading=function(e,t){this.switchLevel(t.level)},r.onLevelSwitching=function(e,t){this.switchLevel(t.level)},r.switchLevel=function(e){var t=this.hls.levels[e]
if(null!=t&&t.textGroupIds){var r=t.textGroupIds[t.urlId],n=this.tracksInGroup?this.tracksInGroup[this.trackId]:void 0
if(this.groupId!==r){var i=this.tracks.filter((function(e){return!r||e.groupId===r}))
this.tracksInGroup=i
var a=this.findTrackId(null==n?void 0:n.name)||this.findTrackId()
this.groupId=r||null
var o={subtitleTracks:i}
this.log("Updating subtitle tracks, "+i.length+' track(s) found in "'+r+'" group-id'),this.hls.trigger(b.SUBTITLE_TRACKS_UPDATED,o),-1!==a&&this.setSubtitleTrack(a,n)}else this.shouldReloadPlaylist(n)&&this.setSubtitleTrack(this.trackId,n)}},r.findTrackId=function(e){for(var t=this.tracksInGroup,r=0;r<t.length;r++){var n=t[r]
if((!this.selectDefaultTrack||n.default)&&(!e||e===n.name))return n.id}return-1},r.onError=function(e,t){!t.fatal&&t.context&&t.context.type===st&&t.context.id===this.trackId&&t.context.groupId===this.groupId&&this.checkRetry(t)},r.loadPlaylist=function(t){e.prototype.loadPlaylist.call(this)
var r=this.tracksInGroup[this.trackId]
if(this.shouldLoadPlaylist(r)){var n=r.id,i=r.groupId,a=r.url
if(t)try{a=t.addDirectives(a)}catch(e){this.warn("Could not construct new URL with HLS Delivery Directives: "+e)}this.log("Loading subtitle playlist for id "+n),this.hls.trigger(b.SUBTITLE_TRACK_LOADING,{url:a,id:n,groupId:i,deliveryDirectives:t||null})}},r.toggleTrackModes=function(e){var t=this,r=this.media,n=this.trackId
if(r){var i=ai(r.textTracks),a=i.filter((function(e){return e.groupId===t.groupId}))
if(-1===e)[].slice.call(i).forEach((function(e){e.mode="disabled"}))
else{var o=a[n]
o&&(o.mode="disabled")}var s=a[e]
s&&(s.mode=this.subtitleDisplay?"showing":"hidden")}},r.setSubtitleTrack=function(e,t){var r,n=this.tracksInGroup
if(this.media){if(this.trackId!==e&&this.toggleTrackModes(e),!(this.trackId===e&&(-1===e||null!=(r=n[e])&&r.details)||e<-1||e>=n.length)){this.clearTimer()
var i=n[e]
if(this.log("Switching to subtitle-track "+e+(i?' "'+i.name+'" lang:'+i.lang+" group:"+i.groupId:"")),this.trackId=e,i){var a=i.id,o=i.groupId,s=void 0===o?"":o,u=i.name,l=i.type,c=i.url
this.hls.trigger(b.SUBTITLE_TRACK_SWITCH,{id:a,groupId:s,name:u,type:l,url:c})
var d=this.switchParams(i.url,null==t?void 0:t.details)
this.loadPlaylist(d)}else this.hls.trigger(b.SUBTITLE_TRACK_SWITCH,{id:e})}}else this.queuedDefaultTrack=e},r.onTextTracksChanged=function(){if(this.useTextTrackPolling||self.clearInterval(this.subtitlePollingInterval),this.media&&this.hls.config.renderTextTracksNatively){for(var e=-1,t=ai(this.media.textTracks),r=0;r<t.length;r++)if("hidden"===t[r].mode)e=r
else if("showing"===t[r].mode){e=r
break}this.subtitleTrack!==e&&(this.subtitleTrack=e)}},a(t,[{key:"subtitleDisplay",get:function(){return this._subtitleDisplay},set:function(e){this._subtitleDisplay=e,this.trackId>-1&&this.toggleTrackModes(this.trackId)}},{key:"subtitleTracks",get:function(){return this.tracksInGroup}},{key:"subtitleTrack",get:function(){return this.trackId},set:function(e){this.selectDefaultTrack=!1
var t=this.tracksInGroup?this.tracksInGroup[this.trackId]:void 0
this.setSubtitleTrack(e,t)}}]),t}(Kt)
function ai(e){for(var t=[],r=0;r<e.length;r++){var n=e[r]
"subtitles"!==n.kind&&"captions"!==n.kind||!n.label||t.push(e[r])}return t}var oi=function(){function e(e){this.buffers=void 0,this.queues={video:[],audio:[],audiovideo:[]},this.buffers=e}var t=e.prototype
return t.append=function(e,t){var r=this.queues[t]
r.push(e),1===r.length&&this.buffers[t]&&this.executeNext(t)},t.insertAbort=function(e,t){this.queues[t].unshift(e),this.executeNext(t)},t.appendBlocker=function(e){var t,r=new Promise((function(e){t=e})),n={execute:t,onStart:function(){},onComplete:function(){},onError:function(){}}
return this.append(n,e),r},t.executeNext=function(e){var t=this.buffers,r=this.queues,n=t[e],i=r[e]
if(i.length){var a=i[0]
try{a.execute()}catch(t){k.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"),a.onError(t),null!=n&&n.updating||(i.shift(),this.executeNext(e))}}},t.shiftAndExecuteNext=function(e){this.queues[e].shift(),this.executeNext(e)},t.current=function(e){return this.queues[e][0]},e}(),si=je(),ui=/([ha]vc.)(?:\.[^.,]+)+/,li=function(){function e(e){var t=this
this.details=null,this._objectUrl=null,this.operationQueue=void 0,this.listeners=void 0,this.hls=void 0,this.bufferCodecEventsExpected=0,this._bufferCodecEventsTotal=0,this.media=null,this.mediaSource=null,this.lastMpegAudioChunk=null,this.appendError=0,this.tracks={},this.pendingTracks={},this.sourceBuffer=void 0,this._onMediaSourceOpen=function(){var e=t.media,r=t.mediaSource
k.log("[buffer-controller]: Media source opened"),e&&(e.removeEventListener("emptied",t._onMediaEmptied),t.updateMediaElementDuration(),t.hls.trigger(b.MEDIA_ATTACHED,{media:e})),r&&r.removeEventListener("sourceopen",t._onMediaSourceOpen),t.checkPendingTracks()},this._onMediaSourceClose=function(){k.log("[buffer-controller]: Media source closed")},this._onMediaSourceEnded=function(){k.log("[buffer-controller]: Media source ended")},this._onMediaEmptied=function(){var e=t.media,r=t._objectUrl
e&&e.src!==r&&k.error("Media element src was set while attaching MediaSource ("+r+" > "+e.src+")")},this.hls=e,this._initSourceBuffer(),this.registerListeners()}var t=e.prototype
return t.hasSourceTypes=function(){return this.getSourceBufferTypes().length>0||Object.keys(this.pendingTracks).length>0},t.destroy=function(){this.unregisterListeners(),this.details=null,this.lastMpegAudioChunk=null},t.registerListeners=function(){var e=this.hls
e.on(b.MEDIA_ATTACHING,this.onMediaAttaching,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.MANIFEST_PARSED,this.onManifestParsed,this),e.on(b.BUFFER_RESET,this.onBufferReset,this),e.on(b.BUFFER_APPENDING,this.onBufferAppending,this),e.on(b.BUFFER_CODECS,this.onBufferCodecs,this),e.on(b.BUFFER_EOS,this.onBufferEos,this),e.on(b.BUFFER_FLUSHING,this.onBufferFlushing,this),e.on(b.LEVEL_UPDATED,this.onLevelUpdated,this),e.on(b.FRAG_PARSED,this.onFragParsed,this),e.on(b.FRAG_CHANGED,this.onFragChanged,this)},t.unregisterListeners=function(){var e=this.hls
e.off(b.MEDIA_ATTACHING,this.onMediaAttaching,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.MANIFEST_PARSED,this.onManifestParsed,this),e.off(b.BUFFER_RESET,this.onBufferReset,this),e.off(b.BUFFER_APPENDING,this.onBufferAppending,this),e.off(b.BUFFER_CODECS,this.onBufferCodecs,this),e.off(b.BUFFER_EOS,this.onBufferEos,this),e.off(b.BUFFER_FLUSHING,this.onBufferFlushing,this),e.off(b.LEVEL_UPDATED,this.onLevelUpdated,this),e.off(b.FRAG_PARSED,this.onFragParsed,this),e.off(b.FRAG_CHANGED,this.onFragChanged,this)},t._initSourceBuffer=function(){this.sourceBuffer={},this.operationQueue=new oi(this.sourceBuffer),this.listeners={audio:[],video:[],audiovideo:[]},this.lastMpegAudioChunk=null},t.onManifestLoading=function(){this.bufferCodecEventsExpected=this._bufferCodecEventsTotal=0,this.details=null},t.onManifestParsed=function(e,t){var r=2;(t.audio&&!t.video||!t.altAudio)&&(r=1),this.bufferCodecEventsExpected=this._bufferCodecEventsTotal=r,k.log(this.bufferCodecEventsExpected+" bufferCodec event(s) expected")},t.onMediaAttaching=function(e,t){var r=this.media=t.media
if(r&&si){var n=this.mediaSource=new si
n.addEventListener("sourceopen",this._onMediaSourceOpen),n.addEventListener("sourceended",this._onMediaSourceEnded),n.addEventListener("sourceclose",this._onMediaSourceClose),r.src=self.URL.createObjectURL(n),this._objectUrl=r.src,r.addEventListener("emptied",this._onMediaEmptied)}},t.onMediaDetaching=function(){var e=this.media,t=this.mediaSource,r=this._objectUrl
if(t){if(k.log("[buffer-controller]: media source detaching"),"open"===t.readyState)try{t.endOfStream()}catch(e){k.warn("[buffer-controller]: onMediaDetaching: "+e.message+" while calling endOfStream")}this.onBufferReset(),t.removeEventListener("sourceopen",this._onMediaSourceOpen),t.removeEventListener("sourceended",this._onMediaSourceEnded),t.removeEventListener("sourceclose",this._onMediaSourceClose),e&&(e.removeEventListener("emptied",this._onMediaEmptied),r&&self.URL.revokeObjectURL(r),e.src===r?(e.removeAttribute("src"),e.load()):k.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")),this.mediaSource=null,this.media=null,this._objectUrl=null,this.bufferCodecEventsExpected=this._bufferCodecEventsTotal,this.pendingTracks={},this.tracks={}}this.hls.trigger(b.MEDIA_DETACHED,void 0)},t.onBufferReset=function(){var e=this
this.getSourceBufferTypes().forEach((function(t){var r=e.sourceBuffer[t]
try{r&&(e.removeBufferListeners(t),e.mediaSource&&e.mediaSource.removeSourceBuffer(r),e.sourceBuffer[t]=void 0)}catch(e){k.warn("[buffer-controller]: Failed to reset the "+t+" buffer",e)}})),this._initSourceBuffer()},t.onBufferCodecs=function(e,t){var r=this,n=this.getSourceBufferTypes().length
Object.keys(t).forEach((function(e){if(n){var i=r.tracks[e]
if(i&&"function"==typeof i.buffer.changeType){var a=t[e],o=a.id,s=a.codec,u=a.levelCodec,l=a.container,c=a.metadata,d=(i.levelCodec||i.codec).replace(ui,"$1"),h=(u||s).replace(ui,"$1")
if(d!==h){var f=l+";codecs="+(u||s)
r.appendChangeType(e,f),k.log("[buffer-controller]: switching codec "+d+" to "+h),r.tracks[e]={buffer:i.buffer,codec:s,container:l,levelCodec:u,metadata:c,id:o}}}}else r.pendingTracks[e]=t[e]})),n||(this.bufferCodecEventsExpected=Math.max(this.bufferCodecEventsExpected-1,0),this.mediaSource&&"open"===this.mediaSource.readyState&&this.checkPendingTracks())},t.appendChangeType=function(e,t){var r=this,n=this.operationQueue,i={execute:function(){var i=r.sourceBuffer[e]
i&&(k.log("[buffer-controller]: changing "+e+" sourceBuffer type to "+t),i.changeType(t)),n.shiftAndExecuteNext(e)},onStart:function(){},onComplete:function(){},onError:function(t){k.warn("[buffer-controller]: Failed to change "+e+" SourceBuffer type",t)}}
n.append(i,e)},t.onBufferAppending=function(e,t){var r=this,n=this.hls,i=this.operationQueue,a=this.tracks,o=t.data,s=t.type,u=t.frag,l=t.part,c=t.chunkMeta,d=c.buffering[s],h=self.performance.now()
d.start=h
var f=u.stats.buffering,p=l?l.stats.buffering:null
0===f.start&&(f.start=h),p&&0===p.start&&(p.start=h)
var g=a.audio,m=!1
"audio"===s&&"audio/mpeg"===(null==g?void 0:g.container)&&(m=!this.lastMpegAudioChunk||1===c.id||this.lastMpegAudioChunk.sn!==c.sn,this.lastMpegAudioChunk=c)
var v=u.start,y={execute:function(){if(d.executeStart=self.performance.now(),m){var e=r.sourceBuffer[s]
if(e){var t=v-e.timestampOffset
Math.abs(t)>=.1&&(k.log("[buffer-controller]: Updating audio SourceBuffer timestampOffset to "+v+" (delta: "+t+") sn: "+u.sn+")"),e.timestampOffset=v)}}r.appendExecutor(o,s)},onStart:function(){},onComplete:function(){var e=self.performance.now()
d.executeEnd=d.end=e,0===f.first&&(f.first=e),p&&0===p.first&&(p.first=e)
var t=r.sourceBuffer,n={}
for(var i in t)n[i]=dr.getBuffered(t[i])
r.appendError=0,r.hls.trigger(b.BUFFER_APPENDED,{type:s,frag:u,part:l,chunkMeta:c,parent:u.type,timeRanges:n})},onError:function(e){k.error("[buffer-controller]: Error encountered while trying to append to the "+s+" SourceBuffer",e)
var t={type:E.MEDIA_ERROR,parent:u.type,details:w.BUFFER_APPEND_ERROR,frag:u,part:l,chunkMeta:c,error:e,err:e,fatal:!1}
e.code===DOMException.QUOTA_EXCEEDED_ERR?t.details=w.BUFFER_FULL_ERROR:(r.appendError++,t.details=w.BUFFER_APPEND_ERROR,r.appendError>n.config.appendErrorMaxRetry&&(k.error("[buffer-controller]: Failed "+n.config.appendErrorMaxRetry+" times to append segment in sourceBuffer"),t.fatal=!0)),n.trigger(b.ERROR,t)}}
i.append(y,s)},t.onBufferFlushing=function(e,t){var r=this,n=this.operationQueue,i=function(e){return{execute:r.removeExecutor.bind(r,e,t.startOffset,t.endOffset),onStart:function(){},onComplete:function(){r.hls.trigger(b.BUFFER_FLUSHED,{type:e})},onError:function(t){k.warn("[buffer-controller]: Failed to remove from "+e+" SourceBuffer",t)}}}
t.type?n.append(i(t.type),t.type):this.getSourceBufferTypes().forEach((function(e){n.append(i(e),e)}))},t.onFragParsed=function(e,t){var r=this,n=t.frag,i=t.part,a=[],o=i?i.elementaryStreams:n.elementaryStreams
o[P]?a.push("audiovideo"):(o[O]&&a.push("audio"),o[F]&&a.push("video")),0===a.length&&k.warn("Fragments must have at least one ElementaryStreamType set. type: "+n.type+" level: "+n.level+" sn: "+n.sn),this.blockBuffers((function(){var e=self.performance.now()
n.stats.buffering.end=e,i&&(i.stats.buffering.end=e)
var t=i?i.stats:n.stats
r.hls.trigger(b.FRAG_BUFFERED,{frag:n,part:i,stats:t,id:n.type})}),a)},t.onFragChanged=function(e,t){this.flushBackBuffer()},t.onBufferEos=function(e,t){var r=this
this.getSourceBufferTypes().reduce((function(e,n){var i=r.sourceBuffer[n]
return!i||t.type&&t.type!==n||(i.ending=!0,i.ended||(i.ended=!0,k.log("[buffer-controller]: "+n+" sourceBuffer now EOS"))),e&&!(i&&!i.ended)}),!0)&&(k.log("[buffer-controller]: Queueing mediaSource.endOfStream()"),this.blockBuffers((function(){r.getSourceBufferTypes().forEach((function(e){var t=r.sourceBuffer[e]
t&&(t.ending=!1)}))
var e=r.mediaSource
e&&"open"===e.readyState?(k.log("[buffer-controller]: Calling mediaSource.endOfStream()"),e.endOfStream()):e&&k.info("[buffer-controller]: Could not call mediaSource.endOfStream(). mediaSource.readyState: "+e.readyState)})))},t.onLevelUpdated=function(e,t){var r=t.details
r.fragments.length&&(this.details=r,this.getSourceBufferTypes().length?this.blockBuffers(this.updateMediaElementDuration.bind(this)):this.updateMediaElementDuration())},t.flushBackBuffer=function(){var e=this.hls,t=this.details,r=this.media,n=this.sourceBuffer
if(r&&null!==t){var i=this.getSourceBufferTypes()
if(i.length){var a=t.live&&null!==e.config.liveBackBufferLength?e.config.liveBackBufferLength:e.config.backBufferLength
if(y(a)&&!(a<0)){var o=r.currentTime,s=t.levelTargetDuration,u=Math.max(a,s),l=Math.floor(o/s)*s-u
i.forEach((function(r){var i=n[r]
if(i){var a=dr.getBuffered(i)
if(a.length>0&&l>a.start(0)){if(e.trigger(b.BACK_BUFFER_REACHED,{bufferEnd:l}),t.live)e.trigger(b.LIVE_BACK_BUFFER_REACHED,{bufferEnd:l})
else if(i.ended&&a.end(a.length-1)-o<2*s)return void k.info("[buffer-controller]: Cannot flush "+r+" back buffer while SourceBuffer is in ended state")
e.trigger(b.BUFFER_FLUSHING,{startOffset:0,endOffset:l,type:r})}}}))}}}},t.updateMediaElementDuration=function(){if(this.details&&this.media&&this.mediaSource&&"open"===this.mediaSource.readyState){var e=this.details,t=this.hls,r=this.media,n=this.mediaSource,i=e.fragments[0].start+e.totalduration,a=r.duration,o=y(n.duration)?n.duration:0
e.live&&t.config.liveDurationInfinity?(k.log("[buffer-controller]: Media Source duration is set to Infinity"),n.duration=1/0,this.updateSeekableRange(e)):(i>o&&i>a||!y(a))&&(k.log("[buffer-controller]: Updating Media Source duration to "+i.toFixed(3)),n.duration=i)}},t.updateSeekableRange=function(e){var t=this.mediaSource,r=e.fragments
if(r.length&&e.live&&null!=t&&t.setLiveSeekableRange){var n=Math.max(0,r[0].start),i=Math.max(n,n+e.totalduration)
t.setLiveSeekableRange(n,i)}},t.checkPendingTracks=function(){var e=this.bufferCodecEventsExpected,t=this.operationQueue,r=this.pendingTracks,n=Object.keys(r).length
if(n&&!e||2===n){this.createSourceBuffers(r),this.pendingTracks={}
var i=this.getSourceBufferTypes()
if(i.length)this.hls.trigger(b.BUFFER_CREATED,{tracks:this.tracks}),i.forEach((function(e){t.executeNext(e)}))
else{var a=new Error("could not create source buffer for media codec(s)")
this.hls.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.BUFFER_INCOMPATIBLE_CODECS_ERROR,fatal:!0,error:a,reason:a.message})}}},t.createSourceBuffers=function(e){var t=this.sourceBuffer,r=this.mediaSource
if(!r)throw Error("createSourceBuffers called when mediaSource was null")
for(var n in e)if(!t[n]){var i=e[n]
if(!i)throw Error("source buffer exists for track "+n+", however track does not")
var a=i.levelCodec||i.codec,o=i.container+";codecs="+a
k.log("[buffer-controller]: creating sourceBuffer("+o+")")
try{var s=t[n]=r.addSourceBuffer(o),u=n
this.addBufferListener(u,"updatestart",this._onSBUpdateStart),this.addBufferListener(u,"updateend",this._onSBUpdateEnd),this.addBufferListener(u,"error",this._onSBUpdateError),this.tracks[n]={buffer:s,codec:a,container:i.container,levelCodec:i.levelCodec,metadata:i.metadata,id:i.id}}catch(e){k.error("[buffer-controller]: error while trying to add sourceBuffer: "+e.message),this.hls.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.BUFFER_ADD_CODEC_ERROR,fatal:!1,error:e,mimeType:o})}}},t._onSBUpdateStart=function(e){this.operationQueue.current(e).onStart()},t._onSBUpdateEnd=function(e){var t=this.operationQueue
t.current(e).onComplete(),t.shiftAndExecuteNext(e)},t._onSBUpdateError=function(e,t){var r=new Error(e+" SourceBuffer error")
k.error("[buffer-controller]: "+r,t),this.hls.trigger(b.ERROR,{type:E.MEDIA_ERROR,details:w.BUFFER_APPENDING_ERROR,error:r,fatal:!1})
var n=this.operationQueue.current(e)
n&&n.onError(t)},t.removeExecutor=function(e,t,r){var n=this.media,i=this.mediaSource,a=this.operationQueue,o=this.sourceBuffer[e]
if(!n||!i||!o)return k.warn("[buffer-controller]: Attempting to remove from the "+e+" SourceBuffer, but it does not exist"),void a.shiftAndExecuteNext(e)
var s=y(n.duration)?n.duration:1/0,u=y(i.duration)?i.duration:1/0,l=Math.max(0,t),c=Math.min(r,s,u)
c>l&&!o.ending?(o.ended=!1,k.log("[buffer-controller]: Removing ["+l+","+c+"] from the "+e+" SourceBuffer"),o.remove(l,c)):a.shiftAndExecuteNext(e)},t.appendExecutor=function(e,t){var r=this.operationQueue,n=this.sourceBuffer[t]
if(!n)return k.warn("[buffer-controller]: Attempting to append to the "+t+" SourceBuffer, but it does not exist"),void r.shiftAndExecuteNext(t)
n.ended=!1,n.appendBuffer(e)},t.blockBuffers=function(e,t){var r=this
if(void 0===t&&(t=this.getSourceBufferTypes()),!t.length)return k.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"),void Promise.resolve().then(e)
var n=this.operationQueue,i=t.map((function(e){return n.appendBlocker(e)}))
Promise.all(i).then((function(){e(),t.forEach((function(e){var t=r.sourceBuffer[e]
null!=t&&t.updating||n.shiftAndExecuteNext(e)}))}))},t.getSourceBufferTypes=function(){return Object.keys(this.sourceBuffer)},t.addBufferListener=function(e,t,r){var n=this.sourceBuffer[e]
if(n){var i=r.bind(this,e)
this.listeners[e].push({event:t,listener:i}),n.addEventListener(t,i)}},t.removeBufferListeners=function(e){var t=this.sourceBuffer[e]
t&&this.listeners[e].forEach((function(e){t.removeEventListener(e.event,e.listener)}))},e}(),ci={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,128:174,129:176,130:189,131:191,132:8482,133:162,134:163,135:9834,136:224,137:32,138:232,139:226,140:234,141:238,142:244,143:251,144:193,145:201,146:211,147:218,148:220,149:252,150:8216,151:161,152:42,153:8217,154:9473,155:169,156:8480,157:8226,158:8220,159:8221,160:192,161:194,162:199,163:200,164:202,165:203,166:235,167:206,168:207,169:239,170:212,171:217,172:249,173:219,174:171,175:187,176:195,177:227,178:205,179:204,180:236,181:210,182:242,183:213,184:245,185:123,186:125,187:92,188:94,189:95,190:124,191:8764,192:196,193:228,194:214,195:246,196:223,197:165,198:164,199:9475,200:197,201:229,202:216,203:248,204:9487,205:9491,206:9495,207:9499},di=function(e){var t=e
return ci.hasOwnProperty(e)&&(t=ci[e]),String.fromCharCode(t)},hi=15,fi=100,pi={17:1,18:3,21:5,22:7,23:9,16:11,19:12,20:14},gi={17:2,18:4,21:6,22:8,23:10,19:13,20:15},mi={25:1,26:3,29:5,30:7,31:9,24:11,27:12,28:14},vi={25:2,26:4,29:6,30:8,31:10,27:13,28:15},yi=["white","green","blue","cyan","red","yellow","magenta","black","transparent"],bi=function(){function e(){this.time=null,this.verboseLevel=0}return e.prototype.log=function(e,t){if(this.verboseLevel>=e){var r="function"==typeof t?t():t
k.log(this.time+" ["+e+"] "+r)}},e}(),Ei=function(e){for(var t=[],r=0;r<e.length;r++)t.push(e[r].toString(16))
return t},wi=function(){function e(e,t,r,n,i){this.foreground=void 0,this.underline=void 0,this.italics=void 0,this.background=void 0,this.flash=void 0,this.foreground=e||"white",this.underline=t||!1,this.italics=r||!1,this.background=n||"black",this.flash=i||!1}var t=e.prototype
return t.reset=function(){this.foreground="white",this.underline=!1,this.italics=!1,this.background="black",this.flash=!1},t.setStyles=function(e){for(var t=["foreground","underline","italics","background","flash"],r=0;r<t.length;r++){var n=t[r]
e.hasOwnProperty(n)&&(this[n]=e[n])}},t.isDefault=function(){return"white"===this.foreground&&!this.underline&&!this.italics&&"black"===this.background&&!this.flash},t.equals=function(e){return this.foreground===e.foreground&&this.underline===e.underline&&this.italics===e.italics&&this.background===e.background&&this.flash===e.flash},t.copy=function(e){this.foreground=e.foreground,this.underline=e.underline,this.italics=e.italics,this.background=e.background,this.flash=e.flash},t.toString=function(){return"color="+this.foreground+", underline="+this.underline+", italics="+this.italics+", background="+this.background+", flash="+this.flash},e}(),_i=function(){function e(e,t,r,n,i,a){this.uchar=void 0,this.penState=void 0,this.uchar=e||" ",this.penState=new wi(t,r,n,i,a)}var t=e.prototype
return t.reset=function(){this.uchar=" ",this.penState.reset()},t.setChar=function(e,t){this.uchar=e,this.penState.copy(t)},t.setPenState=function(e){this.penState.copy(e)},t.equals=function(e){return this.uchar===e.uchar&&this.penState.equals(e.penState)},t.copy=function(e){this.uchar=e.uchar,this.penState.copy(e.penState)},t.isEmpty=function(){return" "===this.uchar&&this.penState.isDefault()},e}(),Ti=function(){function e(e){this.chars=void 0,this.pos=void 0,this.currPenState=void 0,this.cueStartTime=void 0,this.logger=void 0,this.chars=[]
for(var t=0;t<fi;t++)this.chars.push(new _i)
this.logger=e,this.pos=0,this.currPenState=new wi}var t=e.prototype
return t.equals=function(e){for(var t=!0,r=0;r<fi;r++)if(!this.chars[r].equals(e.chars[r])){t=!1
break}return t},t.copy=function(e){for(var t=0;t<fi;t++)this.chars[t].copy(e.chars[t])},t.isEmpty=function(){for(var e=!0,t=0;t<fi;t++)if(!this.chars[t].isEmpty()){e=!1
break}return e},t.setCursor=function(e){this.pos!==e&&(this.pos=e),this.pos<0?(this.logger.log(3,"Negative cursor position "+this.pos),this.pos=0):this.pos>fi&&(this.logger.log(3,"Too large cursor position "+this.pos),this.pos=fi)},t.moveCursor=function(e){var t=this.pos+e
if(e>1)for(var r=this.pos+1;r<t+1;r++)this.chars[r].setPenState(this.currPenState)
this.setCursor(t)},t.backSpace=function(){this.moveCursor(-1),this.chars[this.pos].setChar(" ",this.currPenState)},t.insertChar=function(e){var t=this
e>=144&&this.backSpace()
var r=di(e)
this.pos>=fi?this.logger.log(0,(function(){return"Cannot insert "+e.toString(16)+" ("+r+") at position "+t.pos+". Skipping it!"})):(this.chars[this.pos].setChar(r,this.currPenState),this.moveCursor(1))},t.clearFromPos=function(e){var t
for(t=e;t<fi;t++)this.chars[t].reset()},t.clear=function(){this.clearFromPos(0),this.pos=0,this.currPenState.reset()},t.clearToEndOfRow=function(){this.clearFromPos(this.pos)},t.getTextString=function(){for(var e=[],t=!0,r=0;r<fi;r++){var n=this.chars[r].uchar
" "!==n&&(t=!1),e.push(n)}return t?"":e.join("")},t.setPenStyles=function(e){this.currPenState.setStyles(e),this.chars[this.pos].setPenState(this.currPenState)},e}(),Ai=function(){function e(e){this.rows=void 0,this.currRow=void 0,this.nrRollUpRows=void 0,this.lastOutputScreen=void 0,this.logger=void 0,this.rows=[]
for(var t=0;t<hi;t++)this.rows.push(new Ti(e))
this.logger=e,this.currRow=14,this.nrRollUpRows=null,this.lastOutputScreen=null,this.reset()}var t=e.prototype
return t.reset=function(){for(var e=0;e<hi;e++)this.rows[e].clear()
this.currRow=14},t.equals=function(e){for(var t=!0,r=0;r<hi;r++)if(!this.rows[r].equals(e.rows[r])){t=!1
break}return t},t.copy=function(e){for(var t=0;t<hi;t++)this.rows[t].copy(e.rows[t])},t.isEmpty=function(){for(var e=!0,t=0;t<hi;t++)if(!this.rows[t].isEmpty()){e=!1
break}return e},t.backSpace=function(){this.rows[this.currRow].backSpace()},t.clearToEndOfRow=function(){this.rows[this.currRow].clearToEndOfRow()},t.insertChar=function(e){this.rows[this.currRow].insertChar(e)},t.setPen=function(e){this.rows[this.currRow].setPenStyles(e)},t.moveCursor=function(e){this.rows[this.currRow].moveCursor(e)},t.setCursor=function(e){this.logger.log(2,"setCursor: "+e),this.rows[this.currRow].setCursor(e)},t.setPAC=function(e){this.logger.log(2,(function(){return"pacData = "+JSON.stringify(e)}))
var t=e.row-1
if(this.nrRollUpRows&&t<this.nrRollUpRows-1&&(t=this.nrRollUpRows-1),this.nrRollUpRows&&this.currRow!==t){for(var r=0;r<hi;r++)this.rows[r].clear()
var n=this.currRow+1-this.nrRollUpRows,i=this.lastOutputScreen
if(i){var a=i.rows[n].cueStartTime,o=this.logger.time
if(a&&null!==o&&a<o)for(var s=0;s<this.nrRollUpRows;s++)this.rows[t-this.nrRollUpRows+s+1].copy(i.rows[n+s])}}this.currRow=t
var u=this.rows[this.currRow]
if(null!==e.indent){var l=e.indent,c=Math.max(l-1,0)
u.setCursor(e.indent),e.color=u.chars[c].penState.foreground}var d={foreground:e.color,underline:e.underline,italics:e.italics,background:"black",flash:!1}
this.setPen(d)},t.setBkgData=function(e){this.logger.log(2,(function(){return"bkgData = "+JSON.stringify(e)})),this.backSpace(),this.setPen(e),this.insertChar(32)},t.setRollUpRows=function(e){this.nrRollUpRows=e},t.rollUp=function(){var e=this
if(null!==this.nrRollUpRows){this.logger.log(1,(function(){return e.getDisplayText()}))
var t=this.currRow+1-this.nrRollUpRows,r=this.rows.splice(t,1)[0]
r.clear(),this.rows.splice(this.currRow,0,r),this.logger.log(2,"Rolling up")}else this.logger.log(3,"roll_up but nrRollUpRows not set yet")},t.getDisplayText=function(e){e=e||!1
for(var t=[],r="",n=-1,i=0;i<hi;i++){var a=this.rows[i].getTextString()
a&&(n=i+1,e?t.push("Row "+n+": '"+a+"'"):t.push(a.trim()))}return t.length>0&&(r=e?"["+t.join(" | ")+"]":t.join("\n")),r},t.getTextAndFormat=function(){return this.rows},e}(),Di=function(){function e(e,t,r){this.chNr=void 0,this.outputFilter=void 0,this.mode=void 0,this.verbose=void 0,this.displayedMemory=void 0,this.nonDisplayedMemory=void 0,this.lastOutputScreen=void 0,this.currRollUpRow=void 0,this.writeScreen=void 0,this.cueStartTime=void 0,this.logger=void 0,this.chNr=e,this.outputFilter=t,this.mode=null,this.verbose=0,this.displayedMemory=new Ai(r),this.nonDisplayedMemory=new Ai(r),this.lastOutputScreen=new Ai(r),this.currRollUpRow=this.displayedMemory.rows[14],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null,this.logger=r}var t=e.prototype
return t.reset=function(){this.mode=null,this.displayedMemory.reset(),this.nonDisplayedMemory.reset(),this.lastOutputScreen.reset(),this.outputFilter.reset(),this.currRollUpRow=this.displayedMemory.rows[14],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null},t.getHandler=function(){return this.outputFilter},t.setHandler=function(e){this.outputFilter=e},t.setPAC=function(e){this.writeScreen.setPAC(e)},t.setBkgData=function(e){this.writeScreen.setBkgData(e)},t.setMode=function(e){e!==this.mode&&(this.mode=e,this.logger.log(2,(function(){return"MODE="+e})),"MODE_POP-ON"===this.mode?this.writeScreen=this.nonDisplayedMemory:(this.writeScreen=this.displayedMemory,this.writeScreen.reset()),"MODE_ROLL-UP"!==this.mode&&(this.displayedMemory.nrRollUpRows=null,this.nonDisplayedMemory.nrRollUpRows=null),this.mode=e)},t.insertChars=function(e){for(var t=this,r=0;r<e.length;r++)this.writeScreen.insertChar(e[r])
var n=this.writeScreen===this.displayedMemory?"DISP":"NON_DISP"
this.logger.log(2,(function(){return n+": "+t.writeScreen.getDisplayText(!0)})),"MODE_PAINT-ON"!==this.mode&&"MODE_ROLL-UP"!==this.mode||(this.logger.log(1,(function(){return"DISPLAYED: "+t.displayedMemory.getDisplayText(!0)})),this.outputDataUpdate())},t.ccRCL=function(){this.logger.log(2,"RCL - Resume Caption Loading"),this.setMode("MODE_POP-ON")},t.ccBS=function(){this.logger.log(2,"BS - BackSpace"),"MODE_TEXT"!==this.mode&&(this.writeScreen.backSpace(),this.writeScreen===this.displayedMemory&&this.outputDataUpdate())},t.ccAOF=function(){},t.ccAON=function(){},t.ccDER=function(){this.logger.log(2,"DER- Delete to End of Row"),this.writeScreen.clearToEndOfRow(),this.outputDataUpdate()},t.ccRU=function(e){this.logger.log(2,"RU("+e+") - Roll Up"),this.writeScreen=this.displayedMemory,this.setMode("MODE_ROLL-UP"),this.writeScreen.setRollUpRows(e)},t.ccFON=function(){this.logger.log(2,"FON - Flash On"),this.writeScreen.setPen({flash:!0})},t.ccRDC=function(){this.logger.log(2,"RDC - Resume Direct Captioning"),this.setMode("MODE_PAINT-ON")},t.ccTR=function(){this.logger.log(2,"TR"),this.setMode("MODE_TEXT")},t.ccRTD=function(){this.logger.log(2,"RTD"),this.setMode("MODE_TEXT")},t.ccEDM=function(){this.logger.log(2,"EDM - Erase Displayed Memory"),this.displayedMemory.reset(),this.outputDataUpdate(!0)},t.ccCR=function(){this.logger.log(2,"CR - Carriage Return"),this.writeScreen.rollUp(),this.outputDataUpdate(!0)},t.ccENM=function(){this.logger.log(2,"ENM - Erase Non-displayed Memory"),this.nonDisplayedMemory.reset()},t.ccEOC=function(){var e=this
if(this.logger.log(2,"EOC - End Of Caption"),"MODE_POP-ON"===this.mode){var t=this.displayedMemory
this.displayedMemory=this.nonDisplayedMemory,this.nonDisplayedMemory=t,this.writeScreen=this.nonDisplayedMemory,this.logger.log(1,(function(){return"DISP: "+e.displayedMemory.getDisplayText()}))}this.outputDataUpdate(!0)},t.ccTO=function(e){this.logger.log(2,"TO("+e+") - Tab Offset"),this.writeScreen.moveCursor(e)},t.ccMIDROW=function(e){var t={flash:!1}
if(t.underline=e%2==1,t.italics=e>=46,t.italics)t.foreground="white"
else{var r=Math.floor(e/2)-16
t.foreground=["white","green","blue","cyan","red","yellow","magenta"][r]}this.logger.log(2,"MIDROW: "+JSON.stringify(t)),this.writeScreen.setPen(t)},t.outputDataUpdate=function(e){void 0===e&&(e=!1)
var t=this.logger.time
null!==t&&this.outputFilter&&(null!==this.cueStartTime||this.displayedMemory.isEmpty()?this.displayedMemory.equals(this.lastOutputScreen)||(this.outputFilter.newCue(this.cueStartTime,t,this.lastOutputScreen),e&&this.outputFilter.dispatchCue&&this.outputFilter.dispatchCue(),this.cueStartTime=this.displayedMemory.isEmpty()?null:t):this.cueStartTime=t,this.lastOutputScreen.copy(this.displayedMemory))},t.cueSplitAtTime=function(e){this.outputFilter&&(this.displayedMemory.isEmpty()||(this.outputFilter.newCue&&this.outputFilter.newCue(this.cueStartTime,e,this.displayedMemory),this.cueStartTime=e))},e}(),ki=function(){function e(e,t,r){this.channels=void 0,this.currentChannel=0,this.cmdHistory=void 0,this.logger=void 0
var n=new bi
this.channels=[null,new Di(e,t,n),new Di(e+1,r,n)],this.cmdHistory={a:null,b:null},this.logger=n}var t=e.prototype
return t.getHandler=function(e){return this.channels[e].getHandler()},t.setHandler=function(e,t){this.channels[e].setHandler(t)},t.addData=function(e,t){var r,n,i,a=!1
this.logger.time=e
for(var o=0;o<t.length;o+=2)if(n=127&t[o],i=127&t[o+1],0!==n||0!==i){if(this.logger.log(3,"["+Ei([t[o],t[o+1]])+"] -> ("+Ei([n,i])+")"),(r=this.parseCmd(n,i))||(r=this.parseMidrow(n,i)),r||(r=this.parsePAC(n,i)),r||(r=this.parseBackgroundAttributes(n,i)),!r&&(a=this.parseChars(n,i))){var s=this.currentChannel
s&&s>0?this.channels[s].insertChars(a):this.logger.log(2,"No channel found yet. TEXT-MODE?")}r||a||this.logger.log(2,"Couldn't parse cleaned data "+Ei([n,i])+" orig: "+Ei([t[o],t[o+1]]))}},t.parseCmd=function(e,t){var r=this.cmdHistory
if(!((20===e||28===e||21===e||29===e)&&t>=32&&t<=47||(23===e||31===e)&&t>=33&&t<=35))return!1
if(xi(e,t,r))return Si(null,null,r),this.logger.log(3,"Repeated command ("+Ei([e,t])+") is dropped"),!0
var n=20===e||21===e||23===e?1:2,i=this.channels[n]
return 20===e||21===e||28===e||29===e?32===t?i.ccRCL():33===t?i.ccBS():34===t?i.ccAOF():35===t?i.ccAON():36===t?i.ccDER():37===t?i.ccRU(2):38===t?i.ccRU(3):39===t?i.ccRU(4):40===t?i.ccFON():41===t?i.ccRDC():42===t?i.ccTR():43===t?i.ccRTD():44===t?i.ccEDM():45===t?i.ccCR():46===t?i.ccENM():47===t&&i.ccEOC():i.ccTO(t-32),Si(e,t,r),this.currentChannel=n,!0},t.parseMidrow=function(e,t){var r=0
if((17===e||25===e)&&t>=32&&t<=47){if((r=17===e?1:2)!==this.currentChannel)return this.logger.log(0,"Mismatch channel in midrow parsing"),!1
var n=this.channels[r]
return!!n&&(n.ccMIDROW(t),this.logger.log(3,"MIDROW ("+Ei([e,t])+")"),!0)}return!1},t.parsePAC=function(e,t){var r,n=this.cmdHistory
if(!((e>=17&&e<=23||e>=25&&e<=31)&&t>=64&&t<=127||(16===e||24===e)&&t>=64&&t<=95))return!1
if(xi(e,t,n))return Si(null,null,n),!0
var i=e<=23?1:2
r=t>=64&&t<=95?1===i?pi[e]:mi[e]:1===i?gi[e]:vi[e]
var a=this.channels[i]
return!!a&&(a.setPAC(this.interpretPAC(r,t)),Si(e,t,n),this.currentChannel=i,!0)},t.interpretPAC=function(e,t){var r,n={color:null,italics:!1,indent:null,underline:!1,row:e}
return r=t>95?t-96:t-64,n.underline=1==(1&r),r<=13?n.color=["white","green","blue","cyan","red","yellow","magenta","white"][Math.floor(r/2)]:r<=15?(n.italics=!0,n.color="white"):n.indent=4*Math.floor((r-16)/2),n},t.parseChars=function(e,t){var r,n,i=null,a=null
if(e>=25?(r=2,a=e-8):(r=1,a=e),a>=17&&a<=19?(n=17===a?t+80:18===a?t+112:t+144,this.logger.log(2,"Special char '"+di(n)+"' in channel "+r),i=[n]):e>=32&&e<=127&&(i=0===t?[e]:[e,t]),i){var o=Ei(i)
this.logger.log(3,"Char codes =  "+o.join(",")),Si(e,t,this.cmdHistory)}return i},t.parseBackgroundAttributes=function(e,t){var r
if(!((16===e||24===e)&&t>=32&&t<=47||(23===e||31===e)&&t>=45&&t<=47))return!1
var n={}
16===e||24===e?(r=Math.floor((t-32)/2),n.background=yi[r],t%2==1&&(n.background=n.background+"_semi")):45===t?n.background="transparent":(n.foreground="black",47===t&&(n.underline=!0))
var i=e<=23?1:2
return this.channels[i].setBkgData(n),Si(e,t,this.cmdHistory),!0},t.reset=function(){for(var e=0;e<Object.keys(this.channels).length;e++){var t=this.channels[e]
t&&t.reset()}this.cmdHistory={a:null,b:null}},t.cueSplitAtTime=function(e){for(var t=0;t<this.channels.length;t++){var r=this.channels[t]
r&&r.cueSplitAtTime(e)}},e}()
function Si(e,t,r){r.a=e,r.b=t}function xi(e,t,r){return r.a===e&&r.b===t}var Ci=function(){function e(e,t){this.timelineController=void 0,this.cueRanges=[],this.trackName=void 0,this.startTime=null,this.endTime=null,this.screen=null,this.timelineController=e,this.trackName=t}var t=e.prototype
return t.dispatchCue=function(){null!==this.startTime&&(this.timelineController.addCues(this.trackName,this.startTime,this.endTime,this.screen,this.cueRanges),this.startTime=null)},t.newCue=function(e,t,r){(null===this.startTime||this.startTime>e)&&(this.startTime=e),this.endTime=t,this.screen=r,this.timelineController.createCaptionsTrack(this.trackName)},t.reset=function(){this.cueRanges=[],this.startTime=null},e}(),Li=function(){if("undefined"!=typeof self&&self.VTTCue)return self.VTTCue
var e=["","lr","rl"],t=["start","middle","end","left","right"]
function r(e,t){if("string"!=typeof t)return!1
if(!Array.isArray(e))return!1
var r=t.toLowerCase()
return!!~e.indexOf(r)&&r}function n(e){return r(t,e)}function i(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]
for(var i=1;i<arguments.length;i++){var a=arguments[i]
for(var o in a)e[o]=a[o]}return e}function a(t,a,o){var s=this,u={enumerable:!0}
s.hasBeenReset=!1
var l="",c=!1,d=t,h=a,f=o,p=null,g="",m=!0,v="auto",y="start",b=50,E="middle",w=50,_="middle"
Object.defineProperty(s,"id",i({},u,{get:function(){return l},set:function(e){l=""+e}})),Object.defineProperty(s,"pauseOnExit",i({},u,{get:function(){return c},set:function(e){c=!!e}})),Object.defineProperty(s,"startTime",i({},u,{get:function(){return d},set:function(e){if("number"!=typeof e)throw new TypeError("Start time must be set to a number.")
d=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"endTime",i({},u,{get:function(){return h},set:function(e){if("number"!=typeof e)throw new TypeError("End time must be set to a number.")
h=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"text",i({},u,{get:function(){return f},set:function(e){f=""+e,this.hasBeenReset=!0}})),Object.defineProperty(s,"region",i({},u,{get:function(){return p},set:function(e){p=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"vertical",i({},u,{get:function(){return g},set:function(t){var n=function(t){return r(e,t)}(t)
if(!1===n)throw new SyntaxError("An invalid or illegal string was specified.")
g=n,this.hasBeenReset=!0}})),Object.defineProperty(s,"snapToLines",i({},u,{get:function(){return m},set:function(e){m=!!e,this.hasBeenReset=!0}})),Object.defineProperty(s,"line",i({},u,{get:function(){return v},set:function(e){if("number"!=typeof e&&"auto"!==e)throw new SyntaxError("An invalid number or illegal string was specified.")
v=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"lineAlign",i({},u,{get:function(){return y},set:function(e){var t=n(e)
if(!t)throw new SyntaxError("An invalid or illegal string was specified.")
y=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"position",i({},u,{get:function(){return b},set:function(e){if(e<0||e>100)throw new Error("Position must be between 0 and 100.")
b=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"positionAlign",i({},u,{get:function(){return E},set:function(e){var t=n(e)
if(!t)throw new SyntaxError("An invalid or illegal string was specified.")
E=t,this.hasBeenReset=!0}})),Object.defineProperty(s,"size",i({},u,{get:function(){return w},set:function(e){if(e<0||e>100)throw new Error("Size must be between 0 and 100.")
w=e,this.hasBeenReset=!0}})),Object.defineProperty(s,"align",i({},u,{get:function(){return _},set:function(e){var t=n(e)
if(!t)throw new SyntaxError("An invalid or illegal string was specified.")
_=t,this.hasBeenReset=!0}})),s.displayState=void 0}return a.prototype.getCueAsHTML=function(){return self.WebVTT.convertCueToDOMTree(self,this.text)},a}(),Ri=function(){function e(){}return e.prototype.decode=function(e,t){if(!e)return""
if("string"!=typeof e)throw new Error("Error - expected string data.")
return decodeURIComponent(encodeURIComponent(e))},e}()
function Ii(e){function t(e,t,r,n){return 3600*(0|e)+60*(0|t)+(0|r)+parseFloat(n||0)}var r=e.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/)
return r?parseFloat(r[2])>59?t(r[2],r[3],0,r[4]):t(r[1],r[2],r[3],r[4]):null}var Oi=function(){function e(){this.values=Object.create(null)}var t=e.prototype
return t.set=function(e,t){this.get(e)||""===t||(this.values[e]=t)},t.get=function(e,t,r){return r?this.has(e)?this.values[e]:t[r]:this.has(e)?this.values[e]:t},t.has=function(e){return e in this.values},t.alt=function(e,t,r){for(var n=0;n<r.length;++n)if(t===r[n]){this.set(e,t)
break}},t.integer=function(e,t){/^-?\d+$/.test(t)&&this.set(e,parseInt(t,10))},t.percent=function(e,t){if(/^([\d]{1,3})(\.[\d]*)?%$/.test(t)){var r=parseFloat(t)
if(r>=0&&r<=100)return this.set(e,r),!0}return!1},e}()
function Fi(e,t,r,n){var i=n?e.split(n):[e]
for(var a in i)if("string"==typeof i[a]){var o=i[a].split(r)
2===o.length&&t(o[0],o[1])}}var Pi=new Li(0,0,""),Ni="middle"===Pi.align?"middle":"center"
function Mi(e,t,r){var n=e
function i(){var t=Ii(e)
if(null===t)throw new Error("Malformed timestamp: "+n)
return e=e.replace(/^[^\sa-zA-Z-]+/,""),t}function a(){e=e.replace(/^\s+/,"")}if(a(),t.startTime=i(),a(),"--\x3e"!==e.slice(0,3))throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): "+n)
e=e.slice(3),a(),t.endTime=i(),a(),function(e,t){var n=new Oi
Fi(e,(function(e,t){var i
switch(e){case"region":for(var a=r.length-1;a>=0;a--)if(r[a].id===t){n.set(e,r[a].region)
break}break
case"vertical":n.alt(e,t,["rl","lr"])
break
case"line":i=t.split(","),n.integer(e,i[0]),n.percent(e,i[0])&&n.set("snapToLines",!1),n.alt(e,i[0],["auto"]),2===i.length&&n.alt("lineAlign",i[1],["start",Ni,"end"])
break
case"position":i=t.split(","),n.percent(e,i[0]),2===i.length&&n.alt("positionAlign",i[1],["start",Ni,"end","line-left","line-right","auto"])
break
case"size":n.percent(e,t)
break
case"align":n.alt(e,t,["start",Ni,"end","left","right"])}}),/:/,/\s/),t.region=n.get("region",null),t.vertical=n.get("vertical","")
var i=n.get("line","auto")
"auto"===i&&-1===Pi.line&&(i=-1),t.line=i,t.lineAlign=n.get("lineAlign","start"),t.snapToLines=n.get("snapToLines",!0),t.size=n.get("size",100),t.align=n.get("align",Ni)
var a=n.get("position","auto")
"auto"===a&&50===Pi.position&&(a="start"===t.align||"left"===t.align?0:"end"===t.align||"right"===t.align?100:50),t.position=a}(e,t)}function Bi(e){return e.replace(/<br(?: \/)?>/gi,"\n")}var Ui=function(){function e(){this.state="INITIAL",this.buffer="",this.decoder=new Ri,this.regionList=[],this.cue=null,this.oncue=void 0,this.onparsingerror=void 0,this.onflush=void 0}var t=e.prototype
return t.parse=function(e){var t=this
function r(){var e=t.buffer,r=0
for(e=Bi(e);r<e.length&&"\r"!==e[r]&&"\n"!==e[r];)++r
var n=e.slice(0,r)
return"\r"===e[r]&&++r,"\n"===e[r]&&++r,t.buffer=e.slice(r),n}e&&(t.buffer+=t.decoder.decode(e,{stream:!0}))
try{var n=""
if("INITIAL"===t.state){if(!/\r\n|\n/.test(t.buffer))return this
var i=(n=r()).match(/^(ï»¿)?WEBVTT([ \t].*)?$/)
if(null==i||!i[0])throw new Error("Malformed WebVTT signature.")
t.state="HEADER"}for(var a=!1;t.buffer;){if(!/\r\n|\n/.test(t.buffer))return this
switch(a?a=!1:n=r(),t.state){case"HEADER":/:/.test(n)?Fi(n,(function(e,t){}),/:/):n||(t.state="ID")
continue
case"NOTE":n||(t.state="ID")
continue
case"ID":if(/^NOTE($|[ \t])/.test(n)){t.state="NOTE"
break}if(!n)continue
if(t.cue=new Li(0,0,""),t.state="CUE",-1===n.indexOf("--\x3e")){t.cue.id=n
continue}case"CUE":if(!t.cue){t.state="BADCUE"
continue}try{Mi(n,t.cue,t.regionList)}catch(e){t.cue=null,t.state="BADCUE"
continue}t.state="CUETEXT"
continue
case"CUETEXT":var o=-1!==n.indexOf("--\x3e")
if(!n||o&&(a=!0)){t.oncue&&t.cue&&t.oncue(t.cue),t.cue=null,t.state="ID"
continue}if(null===t.cue)continue
t.cue.text&&(t.cue.text+="\n"),t.cue.text+=n
continue
case"BADCUE":n||(t.state="ID")}}}catch(e){"CUETEXT"===t.state&&t.cue&&t.oncue&&t.oncue(t.cue),t.cue=null,t.state="INITIAL"===t.state?"BADWEBVTT":"BADCUE"}return this},t.flush=function(){var e=this
try{if((e.cue||"HEADER"===e.state)&&(e.buffer+="\n\n",e.parse()),"INITIAL"===e.state||"BADWEBVTT"===e.state)throw new Error("Malformed WebVTT signature.")}catch(t){e.onparsingerror&&e.onparsingerror(t)}return e.onflush&&e.onflush(),this},e}(),qi=/\r\n|\n\r|\n|\r/g,ji=function(e,t,r){return void 0===r&&(r=0),e.slice(r,r+t.length)===t},Gi=function(e){for(var t=5381,r=e.length;r;)t=33*t^e.charCodeAt(--r)
return(t>>>0).toString()}
function Hi(e,t,r){return Gi(e.toString())+Gi(t.toString())+Gi(r)}var Vi="stpp.ttml.im1t",zi=/^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,Ki=/^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/,Wi={left:"start",center:"center",right:"end",start:"start",end:"end"}
function $i(e,t,r,n){var i,a,o,u=Te(new Uint8Array(e),["mdat"])
if(0!==u.length){var l=u.map((function(e){return fe(e)})),c=(i=t.baseTime,1,void 0===(a=t.timescale)&&(a=1),void 0===o&&(o=!1),En(i,1,1/a,o))
try{l.forEach((function(e){return r(function(e,t){var r=(new DOMParser).parseFromString(e,"text/xml").getElementsByTagName("tt")[0]
if(!r)throw new Error("Invalid ttml")
var n={frameRate:30,subFrameRate:1,frameRateMultiplier:0,tickRate:0},i=Object.keys(n).reduce((function(e,t){return e[t]=r.getAttribute("ttp:"+t)||n[t],e}),{}),a="preserve"!==r.getAttribute("xml:space"),o=Qi(Yi(r,"styling","style")),u=Qi(Yi(r,"layout","region")),l=Yi(r,"body","[begin]")
return[].map.call(l,(function(e){var r=Xi(e,a)
if(!r||!e.hasAttribute("begin"))return null
var n=ea(e.getAttribute("begin"),i),l=ea(e.getAttribute("dur"),i),c=ea(e.getAttribute("end"),i)
if(null===n)throw Ji(e)
if(null===c){if(null===l)throw Ji(e)
c=n+l}var d=new Li(n-t,c-t,r)
d.id=Hi(d.startTime,d.endTime,d.text)
var h=function(e,t,r){var n="http://www.w3.org/ns/ttml#styling",i=null,a=null!=e&&e.hasAttribute("style")?e.getAttribute("style"):null
return a&&r.hasOwnProperty(a)&&(i=r[a]),["displayAlign","textAlign","color","backgroundColor","fontSize","fontFamily"].reduce((function(r,a){var o=Zi(t,n,a)||Zi(e,n,a)||Zi(i,n,a)
return o&&(r[a]=o),r}),{})}(u[e.getAttribute("region")],o[e.getAttribute("style")],o),f=h.textAlign
if(f){var p=Wi[f]
p&&(d.lineAlign=p),d.align=f}return s(d,h),d})).filter((function(e){return null!==e}))}(e,c))}))}catch(e){n(e)}}else n(new Error("Could not parse IMSC1 mdat"))}function Yi(e,t,r){var n=e.getElementsByTagName(t)[0]
return n?[].slice.call(n.querySelectorAll(r)):[]}function Qi(e){return e.reduce((function(e,t){var r=t.getAttribute("xml:id")
return r&&(e[r]=t),e}),{})}function Xi(e,t){return[].slice.call(e.childNodes).reduce((function(e,r,n){var i
return"br"===r.nodeName&&n?e+"\n":null!=(i=r.childNodes)&&i.length?Xi(r,t):t?e+r.textContent.trim().replace(/\s+/g," "):e+r.textContent}),"")}function Zi(e,t,r){return e&&e.hasAttributeNS(t,r)?e.getAttributeNS(t,r):null}function Ji(e){return new Error("Could not parse ttml timestamp "+e)}function ea(e,t){if(!e)return null
var r=Ii(e)
return null===r&&(zi.test(e)?r=function(e,t){var r=zi.exec(e),n=(0|r[4])+(0|r[5])/t.subFrameRate
return 3600*(0|r[1])+60*(0|r[2])+(0|r[3])+n/t.frameRate}(e,t):Ki.test(e)&&(r=function(e,t){var r=Ki.exec(e),n=Number(r[1])
switch(r[2]){case"h":return 3600*n
case"m":return 60*n
case"ms":return 1e3*n
case"f":return n/t.frameRate
case"t":return n/t.tickRate}return n}(e,t))),r}var ta=function(){function e(e){if(this.hls=void 0,this.media=null,this.config=void 0,this.enabled=!0,this.Cues=void 0,this.textTracks=[],this.tracks=[],this.initPTS=[],this.unparsedVttFrags=[],this.captionsTracks={},this.nonNativeCaptionsTracks={},this.cea608Parser1=void 0,this.cea608Parser2=void 0,this.lastSn=-1,this.lastPartIndex=-1,this.prevCC=-1,this.vttCCs={ccOffset:0,presentationOffset:0,0:{start:0,prevCC:-1,new:!0}},this.captionsProperties=void 0,this.hls=e,this.config=e.config,this.Cues=e.config.cueHandler,this.captionsProperties={textTrack1:{label:this.config.captionsTextTrack1Label,languageCode:this.config.captionsTextTrack1LanguageCode},textTrack2:{label:this.config.captionsTextTrack2Label,languageCode:this.config.captionsTextTrack2LanguageCode},textTrack3:{label:this.config.captionsTextTrack3Label,languageCode:this.config.captionsTextTrack3LanguageCode},textTrack4:{label:this.config.captionsTextTrack4Label,languageCode:this.config.captionsTextTrack4LanguageCode}},this.config.enableCEA708Captions){var t=new Ci(this,"textTrack1"),r=new Ci(this,"textTrack2"),n=new Ci(this,"textTrack3"),i=new Ci(this,"textTrack4")
this.cea608Parser1=new ki(1,t,r),this.cea608Parser2=new ki(3,n,i)}e.on(b.MEDIA_ATTACHING,this.onMediaAttaching,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.MANIFEST_LOADED,this.onManifestLoaded,this),e.on(b.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),e.on(b.FRAG_LOADING,this.onFragLoading,this),e.on(b.FRAG_LOADED,this.onFragLoaded,this),e.on(b.FRAG_PARSING_USERDATA,this.onFragParsingUserdata,this),e.on(b.FRAG_DECRYPTED,this.onFragDecrypted,this),e.on(b.INIT_PTS_FOUND,this.onInitPtsFound,this),e.on(b.SUBTITLE_TRACKS_CLEARED,this.onSubtitleTracksCleared,this),e.on(b.BUFFER_FLUSHING,this.onBufferFlushing,this)}var t=e.prototype
return t.destroy=function(){var e=this.hls
e.off(b.MEDIA_ATTACHING,this.onMediaAttaching,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this),e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.MANIFEST_LOADED,this.onManifestLoaded,this),e.off(b.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),e.off(b.FRAG_LOADING,this.onFragLoading,this),e.off(b.FRAG_LOADED,this.onFragLoaded,this),e.off(b.FRAG_PARSING_USERDATA,this.onFragParsingUserdata,this),e.off(b.FRAG_DECRYPTED,this.onFragDecrypted,this),e.off(b.INIT_PTS_FOUND,this.onInitPtsFound,this),e.off(b.SUBTITLE_TRACKS_CLEARED,this.onSubtitleTracksCleared,this),e.off(b.BUFFER_FLUSHING,this.onBufferFlushing,this),this.hls=this.config=this.cea608Parser1=this.cea608Parser2=null},t.addCues=function(e,t,r,n,i){for(var a=!1,o=i.length;o--;){var s=i[o],u=(l=s[0],c=s[1],d=t,h=r,Math.min(c,h)-Math.max(l,d))
if(u>=0&&(s[0]=Math.min(s[0],t),s[1]=Math.max(s[1],r),a=!0,u/(r-t)>.5))return}var l,c,d,h
if(a||i.push([t,r]),this.config.renderTextTracksNatively){var f=this.captionsTracks[e]
this.Cues.newCue(f,t,r,n)}else{var p=this.Cues.newCue(null,t,r,n)
this.hls.trigger(b.CUES_PARSED,{type:"captions",cues:p,track:e})}},t.onInitPtsFound=function(e,t){var r=this,n=t.frag,i=t.id,a=t.initPTS,o=t.timescale,s=this.unparsedVttFrags
"main"===i&&(this.initPTS[n.cc]={baseTime:a,timescale:o}),s.length&&(this.unparsedVttFrags=[],s.forEach((function(e){r.onFragLoaded(b.FRAG_LOADED,e)})))},t.getExistingTrack=function(e){var t=this.media
if(t)for(var r=0;r<t.textTracks.length;r++){var n=t.textTracks[r]
if(n[e])return n}return null},t.createCaptionsTrack=function(e){this.config.renderTextTracksNatively?this.createNativeTrack(e):this.createNonNativeTrack(e)},t.createNativeTrack=function(e){if(!this.captionsTracks[e]){var t=this.captionsProperties,r=this.captionsTracks,n=this.media,i=t[e],a=i.label,o=i.languageCode,s=this.getExistingTrack(e)
if(s)r[e]=s,mt(r[e]),pt(r[e],n)
else{var u=this.createTextTrack("captions",a,o)
u&&(u[e]=!0,r[e]=u)}}},t.createNonNativeTrack=function(e){if(!this.nonNativeCaptionsTracks[e]){var t=this.captionsProperties[e]
if(t){var r={_id:e,label:t.label,kind:"captions",default:!!t.media&&!!t.media.default,closedCaptions:t.media}
this.nonNativeCaptionsTracks[e]=r,this.hls.trigger(b.NON_NATIVE_TEXT_TRACKS_FOUND,{tracks:[r]})}}},t.createTextTrack=function(e,t,r){var n=this.media
if(n)return n.addTextTrack(e,t,r)},t.onMediaAttaching=function(e,t){this.media=t.media,this._cleanTracks()},t.onMediaDetaching=function(){var e=this.captionsTracks
Object.keys(e).forEach((function(t){mt(e[t]),delete e[t]})),this.nonNativeCaptionsTracks={}},t.onManifestLoading=function(){this.lastSn=-1,this.lastPartIndex=-1,this.prevCC=-1,this.vttCCs={ccOffset:0,presentationOffset:0,0:{start:0,prevCC:-1,new:!0}},this._cleanTracks(),this.tracks=[],this.captionsTracks={},this.nonNativeCaptionsTracks={},this.textTracks=[],this.unparsedVttFrags=this.unparsedVttFrags||[],this.initPTS=[],this.cea608Parser1&&this.cea608Parser2&&(this.cea608Parser1.reset(),this.cea608Parser2.reset())},t._cleanTracks=function(){var e=this.media
if(e){var t=e.textTracks
if(t)for(var r=0;r<t.length;r++)mt(t[r])}},t.onSubtitleTracksUpdated=function(e,t){var r=this,n=t.subtitleTracks||[],i=n.some((function(e){return e.textCodec===Vi}))
if(this.config.enableWebVTT||i&&this.config.enableIMSC1){if(ei(this.tracks,n))return void(this.tracks=n)
if(this.textTracks=[],this.tracks=n,this.config.renderTextTracksNatively){var a=this.media?this.media.textTracks:null
this.tracks.forEach((function(e,t){var n
if(a&&t<a.length){for(var i=null,o=0;o<a.length;o++)if(ra(a[o],e)){i=a[o]
break}i&&(n=i)}if(n)mt(n)
else{var s=r._captionsOrSubtitlesFromCharacteristics(e);(n=r.createTextTrack(s,e.name,e.lang))&&(n.mode="disabled")}n&&(n.groupId=e.groupId,r.textTracks.push(n))}))}else if(this.tracks.length){var o=this.tracks.map((function(e){return{label:e.name,kind:e.type.toLowerCase(),default:e.default,subtitleTrack:e}}))
this.hls.trigger(b.NON_NATIVE_TEXT_TRACKS_FOUND,{tracks:o})}}},t._captionsOrSubtitlesFromCharacteristics=function(e){if(e.attrs.CHARACTERISTICS){var t=/transcribes-spoken-dialog/gi.test(e.attrs.CHARACTERISTICS),r=/describes-music-and-sound/gi.test(e.attrs.CHARACTERISTICS)
if(t&&r)return"captions"}return"subtitles"},t.onManifestLoaded=function(e,t){var r=this
this.config.enableCEA708Captions&&t.captions&&t.captions.forEach((function(e){var t=/(?:CC|SERVICE)([1-4])/.exec(e.instreamId)
if(t){var n="textTrack"+t[1],i=r.captionsProperties[n]
i&&(i.label=e.name,e.lang&&(i.languageCode=e.lang),i.media=e)}}))},t.closedCaptionsForLevel=function(e){var t=this.hls.levels[e.level]
return null==t?void 0:t.attrs["CLOSED-CAPTIONS"]},t.onFragLoading=function(e,t){var r=this.cea608Parser1,n=this.cea608Parser2,i=this.lastSn,a=this.lastPartIndex
if(this.enabled&&r&&n&&t.frag.type===ut){var o,s,u=t.frag.sn,l=null!=(o=null==t||null==(s=t.part)?void 0:s.index)?o:-1
u===i+1||u===i&&l===a+1||(r.reset(),n.reset()),this.lastSn=u,this.lastPartIndex=l}},t.onFragLoaded=function(e,t){var r=t.frag,n=t.payload,i=this.initPTS,a=this.unparsedVttFrags
if(r.type===ct)if(n.byteLength){if(!i[r.cc])return a.push(t),void(i.length&&this.hls.trigger(b.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:r,error:new Error("Missing initial subtitle PTS")}))
var o=r.decryptdata,s="stats"in t
if(null==o||!o.encrypted||s){var u=this.tracks[r.level],l=this.vttCCs
l[r.cc]||(l[r.cc]={start:r.start,prevCC:this.prevCC,new:!0},this.prevCC=r.cc),u&&u.textCodec===Vi?this._parseIMSC1(r,n):this._parseVTTs(r,n,l)}}else this.hls.trigger(b.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:r,error:new Error("Empty subtitle payload")})},t._parseIMSC1=function(e,t){var r=this,n=this.hls
$i(t,this.initPTS[e.cc],(function(t){r._appendCues(t,e.level),n.trigger(b.SUBTITLE_FRAG_PROCESSED,{success:!0,frag:e})}),(function(t){k.log("Failed to parse IMSC1: "+t),n.trigger(b.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:e,error:t})}))},t._parseVTTs=function(e,t,r){var n,i=this,a=this.hls;(function(e,t,r,n,i,a,o){var s,u,l,c=new Ui,d=fe(new Uint8Array(e)).trim().replace(qi,"\n").split("\n"),h=[],f=(u=t.baseTime,void 0===(l=t.timescale)&&(l=1),En(u,9e4,1/l)),p="00:00.000",g=0,m=0,v=!0
c.oncue=function(e){var t=r[n],a=r.ccOffset,o=(g-f)/9e4
null!=t&&t.new&&(void 0!==m?a=r.ccOffset=t.start:function(e,t,r){var n=e[t],i=e[n.prevCC]
if(!i||!i.new&&n.new)return e.ccOffset=e.presentationOffset=n.start,void(n.new=!1)
for(;null!=(a=i)&&a.new;){var a
e.ccOffset+=n.start-i.start,n.new=!1,i=e[(n=i).prevCC]}e.presentationOffset=r}(r,n,o)),o&&(a=o-r.presentationOffset)
var s=e.endTime-e.startTime,u=Dn(9e4*(e.startTime+a-m),9e4*i)/9e4
e.startTime=Math.max(u,0),e.endTime=Math.max(u+s,0)
var l=e.text.trim()
e.text=decodeURIComponent(encodeURIComponent(l)),e.id||(e.id=Hi(e.startTime,e.endTime,l)),e.endTime>0&&h.push(e)},c.onparsingerror=function(e){s=e},c.onflush=function(){s?o(s):a(h)},d.forEach((function(e){if(v){if(ji(e,"X-TIMESTAMP-MAP=")){v=!1,e.slice(16).split(",").forEach((function(e){ji(e,"LOCAL:")?p=e.slice(6):ji(e,"MPEGTS:")&&(g=parseInt(e.slice(7)))}))
try{m=function(e){var t=parseInt(e.slice(-3)),r=parseInt(e.slice(-6,-4)),n=parseInt(e.slice(-9,-7)),i=e.length>9?parseInt(e.substring(0,e.indexOf(":"))):0
if(!(y(t)&&y(r)&&y(n)&&y(i)))throw Error("Malformed X-TIMESTAMP-MAP: Local:"+e)
return t+=1e3*r,(t+=6e4*n)+36e5*i}(p)/1e3}catch(e){s=e}return}""===e&&(v=!1)}c.parse(e+"\n")})),c.flush()})(null!=(n=e.initSegment)&&n.data?xe(e.initSegment.data,new Uint8Array(t)):t,this.initPTS[e.cc],r,e.cc,e.start,(function(t){i._appendCues(t,e.level),a.trigger(b.SUBTITLE_FRAG_PROCESSED,{success:!0,frag:e})}),(function(r){i._fallbackToIMSC1(e,t),k.log("Failed to parse VTT cue: "+r),a.trigger(b.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:e,error:r})}))},t._fallbackToIMSC1=function(e,t){var r=this,n=this.tracks[e.level]
n.textCodec||$i(t,this.initPTS[e.cc],(function(){n.textCodec=Vi,r._parseIMSC1(e,t)}),(function(){n.textCodec="wvtt"}))},t._appendCues=function(e,t){var r=this.hls
if(this.config.renderTextTracksNatively){var n=this.textTracks[t]
if(!n||"disabled"===n.mode)return
e.forEach((function(e){return gt(n,e)}))}else{var i=this.tracks[t]
if(!i)return
var a=i.default?"default":"subtitles"+t
r.trigger(b.CUES_PARSED,{type:"subtitles",cues:e,track:a})}},t.onFragDecrypted=function(e,t){var r=t.frag
if(r.type===ct){if(!this.initPTS[r.cc])return void this.unparsedVttFrags.push(t)
this.onFragLoaded(b.FRAG_LOADED,t)}},t.onSubtitleTracksCleared=function(){this.tracks=[],this.captionsTracks={}},t.onFragParsingUserdata=function(e,t){var r=this.cea608Parser1,n=this.cea608Parser2
if(this.enabled&&r&&n){var i=t.frag,a=t.samples
if(i.type!==ut||"NONE"!==this.closedCaptionsForLevel(i))for(var o=0;o<a.length;o++){var s=a[o].bytes
if(s){var u=this.extractCea608Data(s)
r.addData(a[o].pts,u[0]),n.addData(a[o].pts,u[1])}}}},t.onBufferFlushing=function(e,t){var r=t.startOffset,n=t.endOffset,i=t.endOffsetSubtitles,a=t.type,o=this.media
if(o&&!(o.currentTime<n)){if(!a||"video"===a){var s=this.captionsTracks
Object.keys(s).forEach((function(e){return vt(s[e],r,n)}))}if(this.config.renderTextTracksNatively&&0===r&&void 0!==i){var u=this.textTracks
Object.keys(u).forEach((function(e){return vt(u[e],r,i)}))}}},t.extractCea608Data=function(e){for(var t=[[],[]],r=31&e[0],n=2,i=0;i<r;i++){var a=e[n++],o=127&e[n++],s=127&e[n++]
if((0!==o||0!==s)&&0!=(4&a)){var u=3&a
0!==u&&1!==u||(t[u].push(o),t[u].push(s))}}return t},e}()
function ra(e,t){return!!e&&e.label===t.name&&!(e.textTrack1||e.textTrack2)}var na=function(){function e(e){this.hls=void 0,this.autoLevelCapping=void 0,this.firstLevel=void 0,this.media=void 0,this.restrictedLevels=void 0,this.timer=void 0,this.clientRect=void 0,this.streamController=void 0,this.hls=e,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.firstLevel=-1,this.media=null,this.restrictedLevels=[],this.timer=void 0,this.clientRect=null,this.registerListeners()}var t=e.prototype
return t.setStreamController=function(e){this.streamController=e},t.destroy=function(){this.unregisterListener(),this.hls.config.capLevelToPlayerSize&&this.stopCapping(),this.media=null,this.clientRect=null,this.hls=this.streamController=null},t.registerListeners=function(){var e=this.hls
e.on(b.FPS_DROP_LEVEL_CAPPING,this.onFpsDropLevelCapping,this),e.on(b.MEDIA_ATTACHING,this.onMediaAttaching,this),e.on(b.MANIFEST_PARSED,this.onManifestParsed,this),e.on(b.BUFFER_CODECS,this.onBufferCodecs,this),e.on(b.MEDIA_DETACHING,this.onMediaDetaching,this)},t.unregisterListener=function(){var e=this.hls
e.off(b.FPS_DROP_LEVEL_CAPPING,this.onFpsDropLevelCapping,this),e.off(b.MEDIA_ATTACHING,this.onMediaAttaching,this),e.off(b.MANIFEST_PARSED,this.onManifestParsed,this),e.off(b.BUFFER_CODECS,this.onBufferCodecs,this),e.off(b.MEDIA_DETACHING,this.onMediaDetaching,this)},t.onFpsDropLevelCapping=function(e,t){var r=this.hls.levels[t.droppedLevel]
this.isLevelAllowed(r)&&this.restrictedLevels.push({bitrate:r.bitrate,height:r.height,width:r.width})},t.onMediaAttaching=function(e,t){this.media=t.media instanceof HTMLVideoElement?t.media:null,this.clientRect=null},t.onManifestParsed=function(e,t){var r=this.hls
this.restrictedLevels=[],this.firstLevel=t.firstLevel,r.config.capLevelToPlayerSize&&t.video&&this.startCapping()},t.onBufferCodecs=function(e,t){this.hls.config.capLevelToPlayerSize&&t.video&&this.startCapping()},t.onMediaDetaching=function(){this.stopCapping()},t.detectPlayerSize=function(){if(this.media&&this.mediaHeight>0&&this.mediaWidth>0){var e=this.hls.levels
if(e.length){var t=this.hls
t.autoLevelCapping=this.getMaxLevel(e.length-1),t.autoLevelCapping>this.autoLevelCapping&&this.streamController&&this.streamController.nextLevelSwitch(),this.autoLevelCapping=t.autoLevelCapping}}},t.getMaxLevel=function(t){var r=this,n=this.hls.levels
if(!n.length)return-1
var i=n.filter((function(e,n){return r.isLevelAllowed(e)&&n<=t}))
return this.clientRect=null,e.getMaxLevelByMediaSize(i,this.mediaWidth,this.mediaHeight)},t.startCapping=function(){this.timer||(this.autoLevelCapping=Number.POSITIVE_INFINITY,this.hls.firstLevel=this.getMaxLevel(this.firstLevel),self.clearInterval(this.timer),this.timer=self.setInterval(this.detectPlayerSize.bind(this),1e3),this.detectPlayerSize())},t.stopCapping=function(){this.restrictedLevels=[],this.firstLevel=-1,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.timer&&(self.clearInterval(this.timer),this.timer=void 0)},t.getDimensions=function(){if(this.clientRect)return this.clientRect
var e=this.media,t={width:0,height:0}
if(e){var r=e.getBoundingClientRect()
t.width=r.width,t.height=r.height,t.width||t.height||(t.width=r.right-r.left||e.width||0,t.height=r.bottom-r.top||e.height||0)}return this.clientRect=t,t},t.isLevelAllowed=function(e){return!this.restrictedLevels.some((function(t){return e.bitrate===t.bitrate&&e.width===t.width&&e.height===t.height}))},e.getMaxLevelByMediaSize=function(e,t,r){if(null==e||!e.length)return-1
for(var n=e.length-1,i=0;i<e.length;i+=1){var a=e[i]
if((a.width>=t||a.height>=r)&&(o=a,!(s=e[i+1])||o.width!==s.width||o.height!==s.height)){n=i
break}}var o,s
return n},a(e,[{key:"mediaWidth",get:function(){return this.getDimensions().width*this.contentScaleFactor}},{key:"mediaHeight",get:function(){return this.getDimensions().height*this.contentScaleFactor}},{key:"contentScaleFactor",get:function(){var e=1
if(!this.hls.config.ignoreDevicePixelRatio)try{e=self.devicePixelRatio}catch(e){}return e}}]),e}(),ia=function(){function e(e){this.hls=void 0,this.isVideoPlaybackQualityAvailable=!1,this.timer=void 0,this.media=null,this.lastTime=void 0,this.lastDroppedFrames=0,this.lastDecodedFrames=0,this.streamController=void 0,this.hls=e,this.registerListeners()}var t=e.prototype
return t.setStreamController=function(e){this.streamController=e},t.registerListeners=function(){this.hls.on(b.MEDIA_ATTACHING,this.onMediaAttaching,this)},t.unregisterListeners=function(){this.hls.off(b.MEDIA_ATTACHING,this.onMediaAttaching,this)},t.destroy=function(){this.timer&&clearInterval(this.timer),this.unregisterListeners(),this.isVideoPlaybackQualityAvailable=!1,this.media=null},t.onMediaAttaching=function(e,t){var r=this.hls.config
if(r.capLevelOnFPSDrop){var n=t.media instanceof self.HTMLVideoElement?t.media:null
this.media=n,n&&"function"==typeof n.getVideoPlaybackQuality&&(this.isVideoPlaybackQualityAvailable=!0),self.clearInterval(this.timer),this.timer=self.setInterval(this.checkFPSInterval.bind(this),r.fpsDroppedMonitoringPeriod)}},t.checkFPS=function(e,t,r){var n=performance.now()
if(t){if(this.lastTime){var i=n-this.lastTime,a=r-this.lastDroppedFrames,o=t-this.lastDecodedFrames,s=1e3*a/i,u=this.hls
if(u.trigger(b.FPS_DROP,{currentDropped:a,currentDecoded:o,totalDroppedFrames:r}),s>0&&a>u.config.fpsDroppedMonitoringThreshold*o){var l=u.currentLevel
k.warn("drop FPS ratio greater than max allowed value for currentLevel: "+l),l>0&&(-1===u.autoLevelCapping||u.autoLevelCapping>=l)&&(l-=1,u.trigger(b.FPS_DROP_LEVEL_CAPPING,{level:l,droppedLevel:u.currentLevel}),u.autoLevelCapping=l,this.streamController.nextLevelSwitch())}}this.lastTime=n,this.lastDroppedFrames=r,this.lastDecodedFrames=t}},t.checkFPSInterval=function(){var e=this.media
if(e)if(this.isVideoPlaybackQualityAvailable){var t=e.getVideoPlaybackQuality()
this.checkFPS(e,t.totalVideoFrames,t.droppedVideoFrames)}else this.checkFPS(e,e.webkitDecodedFrameCount,e.webkitDroppedFrameCount)},e}(),aa="[eme]",oa=function(){function e(t){this.hls=void 0,this.config=void 0,this.media=null,this.keyFormatPromise=null,this.keySystemAccessPromises={},this._requestLicenseFailureCount=0,this.mediaKeySessions=[],this.keyIdToKeySessionPromise={},this.setMediaKeysQueue=e.CDMCleanupPromise?[e.CDMCleanupPromise]:[],this.onMediaEncrypted=this._onMediaEncrypted.bind(this),this.onWaitingForKey=this._onWaitingForKey.bind(this),this.debug=k.debug.bind(k,aa),this.log=k.log.bind(k,aa),this.warn=k.warn.bind(k,aa),this.error=k.error.bind(k,aa),this.hls=t,this.config=t.config,this.registerListeners()}var t=e.prototype
return t.destroy=function(){this.unregisterListeners(),this.onMediaDetached()
var e=this.config
e.requestMediaKeySystemAccessFunc=null,e.licenseXhrSetup=e.licenseResponseCallback=void 0,e.drmSystems=e.drmSystemOptions={},this.hls=this.onMediaEncrypted=this.onWaitingForKey=this.keyIdToKeySessionPromise=null,this.config=null},t.registerListeners=function(){this.hls.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.on(b.MEDIA_DETACHED,this.onMediaDetached,this),this.hls.on(b.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.on(b.MANIFEST_LOADED,this.onManifestLoaded,this)},t.unregisterListeners=function(){this.hls.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.off(b.MEDIA_DETACHED,this.onMediaDetached,this),this.hls.off(b.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.off(b.MANIFEST_LOADED,this.onManifestLoaded,this)},t.getLicenseServerUrl=function(e){var t=this.config,r=t.drmSystems,n=t.widevineLicenseUrl,i=r[e]
if(i)return i.licenseUrl
if(e===G.WIDEVINE&&n)return n
throw new Error('no license server URL configured for key-system "'+e+'"')},t.getServerCertificateUrl=function(e){var t=this.config.drmSystems[e]
if(t)return t.serverCertificateUrl
this.log('No Server Certificate in config.drmSystems["'+e+'"]')},t.attemptKeySystemAccess=function(e){var t=this,r=this.hls.levels,n=function(e,t,r){return!!e&&r.indexOf(e)===t},i=r.map((function(e){return e.audioCodec})).filter(n),a=r.map((function(e){return e.videoCodec})).filter(n)
return i.length+a.length===0&&a.push("avc1.42e01e"),new Promise((function(r,n){!function e(o){var s=o.shift()
t.getMediaKeysPromise(s,i,a).then((function(e){return r({keySystem:s,mediaKeys:e})})).catch((function(t){o.length?e(o):n(t instanceof sa?t:new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_NO_ACCESS,error:t,fatal:!0},t.message))}))}(e)}))},t.requestMediaKeySystemAccess=function(e,t){var r=this.config.requestMediaKeySystemAccessFunc
if("function"!=typeof r){var n="Configured requestMediaKeySystemAccess is not a function "+r
return null===X&&"http:"===self.location.protocol&&(n="navigator.requestMediaKeySystemAccess is not available over insecure protocol "+location.protocol),Promise.reject(new Error(n))}return r(e,t)},t.getMediaKeysPromise=function(e,t,r){var n=this,i=function(e,t,r,n){var i
switch(e){case G.FAIRPLAY:i=["cenc","sinf"]
break
case G.WIDEVINE:case G.PLAYREADY:i=["cenc"]
break
case G.CLEARKEY:i=["cenc","keyids"]
break
default:throw new Error("Unknown key-system: "+e)}return function(e,t,r,n){return[{initDataTypes:e,persistentState:n.persistentState||"not-allowed",distinctiveIdentifier:n.distinctiveIdentifier||"not-allowed",sessionTypes:n.sessionTypes||[n.sessionType||"temporary"],audioCapabilities:t.map((function(e){return{contentType:'audio/mp4; codecs="'+e+'"',robustness:n.audioRobustness||"",encryptionScheme:n.audioEncryptionScheme||null}})),videoCapabilities:r.map((function(e){return{contentType:'video/mp4; codecs="'+e+'"',robustness:n.videoRobustness||"",encryptionScheme:n.videoEncryptionScheme||null}}))}]}(i,t,r,n)}(e,t,r,this.config.drmSystemOptions),a=this.keySystemAccessPromises[e],o=null==a?void 0:a.keySystemAccess
if(!o){this.log('Requesting encrypted media "'+e+'" key-system access with config: '+JSON.stringify(i)),o=this.requestMediaKeySystemAccess(e,i)
var s=this.keySystemAccessPromises[e]={keySystemAccess:o}
return o.catch((function(t){n.log('Failed to obtain access to key-system "'+e+'": '+t)})),o.then((function(t){n.log('Access for key-system "'+t.keySystem+'" obtained')
var r=n.fetchServerCertificate(e)
return n.log('Create media-keys for "'+e+'"'),s.mediaKeys=t.createMediaKeys().then((function(t){return n.log('Media-keys created for "'+e+'"'),r.then((function(r){return r?n.setMediaKeysServerCertificate(t,e,r):t}))})),s.mediaKeys.catch((function(t){n.error('Failed to create media-keys for "'+e+'"}: '+t)})),s.mediaKeys}))}return o.then((function(){return a.mediaKeys}))},t.createMediaKeySessionContext=function(e){var t=e.decryptdata,r=e.keySystem,n=e.mediaKeys
this.log('Creating key-system session "'+r+'" keyId: '+pe(t.keyId||[]))
var i=n.createSession(),a={decryptdata:t,keySystem:r,mediaKeys:n,mediaKeysSession:i,keyStatus:"status-pending"}
return this.mediaKeySessions.push(a),a},t.renewKeySession=function(e){var t=e.decryptdata
if(t.pssh){var r=this.createMediaKeySessionContext(e),n=this.getKeyIdString(t)
this.keyIdToKeySessionPromise[n]=this.generateRequestWithPreferredKeySession(r,"cenc",t.pssh,"expired")}else this.warn("Could not renew expired session. Missing pssh initData.")
this.removeSession(e)},t.getKeyIdString=function(e){if(!e)throw new Error("Could not read keyId of undefined decryptdata")
if(null===e.keyId)throw new Error("keyId is null")
return pe(e.keyId)},t.updateKeySession=function(e,t){var r,n=e.mediaKeysSession
return this.log('Updating key-session "'+n.sessionId+'" for keyID '+pe((null==(r=e.decryptdata)?void 0:r.keyId)||[])+"\n      } (data length: "+(t?t.byteLength:t)+")"),n.update(t)},t.selectKeySystemFormat=function(e){var t=Object.keys(e.levelkeys||{})
return this.keyFormatPromise||(this.log("Selecting key-system from fragment (sn: "+e.sn+" "+e.type+": "+e.level+") key formats "+t.join(", ")),this.keyFormatPromise=this.getKeyFormatPromise(t)),this.keyFormatPromise},t.getKeyFormatPromise=function(e){var t=this
return new Promise((function(r,n){var i=Q(t.config),a=e.map(W).filter((function(e){return!!e&&-1!==i.indexOf(e)}))
return t.getKeySystemSelectionPromise(a).then((function(e){var t=e.keySystem,i=Y(t)
i?r(i):n(new Error('Unable to find format for key-system "'+t+'"'))})).catch(n)}))},t.loadKey=function(e){var t=this,r=e.keyInfo.decryptdata,n=this.getKeyIdString(r),i="(keyId: "+n+' format: "'+r.keyFormat+'" method: '+r.method+" uri: "+r.uri+")"
this.log("Starting session for key "+i)
var a=this.keyIdToKeySessionPromise[n]
return a||(a=this.keyIdToKeySessionPromise[n]=this.getKeySystemForKeyPromise(r).then((function(n){var a=n.keySystem,o=n.mediaKeys
return t.throwIfDestroyed(),t.log("Handle encrypted media sn: "+e.frag.sn+" "+e.frag.type+": "+e.frag.level+" using key "+i),t.attemptSetMediaKeys(a,o).then((function(){t.throwIfDestroyed()
var e=t.createMediaKeySessionContext({keySystem:a,mediaKeys:o,decryptdata:r})
return t.generateRequestWithPreferredKeySession(e,"cenc",r.pssh,"playlist-key")}))}))).catch((function(e){return t.handleError(e)})),a},t.throwIfDestroyed=function(e){if(!this.hls)throw new Error("invalid state")},t.handleError=function(e){this.hls&&(this.error(e.message),e instanceof sa?this.hls.trigger(b.ERROR,e.data):this.hls.trigger(b.ERROR,{type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_NO_KEYS,error:e,fatal:!0}))},t.getKeySystemForKeyPromise=function(e){var t=this.getKeyIdString(e),r=this.keyIdToKeySessionPromise[t]
if(!r){var n=W(e.keyFormat),i=n?[n]:Q(this.config)
return this.attemptKeySystemAccess(i)}return r},t.getKeySystemSelectionPromise=function(e){if(e.length||(e=Q(this.config)),0===e.length)throw new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_NO_CONFIGURED_LICENSE,fatal:!0},"Missing key-system license configuration options "+JSON.stringify({drmSystems:this.config.drmSystems}))
return this.attemptKeySystemAccess(e)},t._onMediaEncrypted=function(e){var t=this,r=e.initDataType,n=e.initData
if(this.debug('"'+e.type+'" event: init data type: "'+r+'"'),null!==n){var i,a
if("sinf"===r&&this.config.drmSystems[G.FAIRPLAY]){var o=ye(new Uint8Array(n))
try{var s=q(JSON.parse(o).sinf),u=ke(new Uint8Array(s))
if(!u)return
i=u.subarray(8,24),a=G.FAIRPLAY}catch(e){return void this.warn('Failed to parse sinf "encrypted" event message initData')}}else{var l=function(e){if(!(e instanceof ArrayBuffer)||e.byteLength<32)return null
var t={version:0,systemId:"",kids:null,data:null},r=new DataView(e),n=r.getUint32(0)
if(e.byteLength!==n&&n>44)return null
if(1886614376!==r.getUint32(4))return null
if(t.version=r.getUint32(8)>>>24,t.version>1)return null
t.systemId=pe(new Uint8Array(e,12,16))
var i=r.getUint32(28)
if(0===t.version){if(n-32<i)return null
t.data=new Uint8Array(e,32,i)}else if(1===t.version){t.kids=[]
for(var a=0;a<i;a++)t.kids.push(new Uint8Array(e,32+16*a,16))}return t}(n)
if(null===l)return
0===l.version&&l.systemId===$&&l.data&&(i=l.data.subarray(8,24)),a=function(e){if(e===$)return G.WIDEVINE}(l.systemId)}if(a&&i){for(var c=pe(i),d=this.keyIdToKeySessionPromise,h=this.mediaKeySessions,f=d[c],p=function(){var e=h[g],a=e.decryptdata
if(a.pssh||!a.keyId)return"continue"
var o=pe(a.keyId)
return c===o||-1!==a.uri.replace(/-/g,"").indexOf(c)?(f=d[o],delete d[o],a.pssh=new Uint8Array(n),a.keyId=i,f=d[c]=f.then((function(){return t.generateRequestWithPreferredKeySession(e,r,n,"encrypted-event-key-match")})),"break"):void 0},g=0;g<h.length;g++){var m=p()
if("continue"!==m&&"break"===m)break}f||(f=d[c]=this.getKeySystemSelectionPromise([a]).then((function(e){var a,o=e.keySystem,s=e.mediaKeys
t.throwIfDestroyed()
var u=new Fe("ISO-23001-7",c,null!=(a=Y(o))?a:"")
return u.pssh=new Uint8Array(n),u.keyId=i,t.attemptSetMediaKeys(o,s).then((function(){t.throwIfDestroyed()
var e=t.createMediaKeySessionContext({decryptdata:u,keySystem:o,mediaKeys:s})
return t.generateRequestWithPreferredKeySession(e,r,n,"encrypted-event-no-match")}))}))),f.catch((function(e){return t.handleError(e)}))}}},t._onWaitingForKey=function(e){this.log('"'+e.type+'" event')},t.attemptSetMediaKeys=function(e,t){var r=this,n=this.setMediaKeysQueue.slice()
this.log('Setting media-keys for "'+e+'"')
var i=Promise.all(n).then((function(){if(!r.media)throw new Error("Attempted to set mediaKeys without media element attached")
return r.media.setMediaKeys(t)}))
return this.setMediaKeysQueue.push(i),i.then((function(){r.log('Media-keys set for "'+e+'"'),n.push(i),r.setMediaKeysQueue=r.setMediaKeysQueue.filter((function(e){return-1===n.indexOf(e)}))}))},t.generateRequestWithPreferredKeySession=function(e,t,r,n){var i,a,o=this,s=null==(i=this.config.drmSystems)||null==(a=i[e.keySystem])?void 0:a.generateRequest
if(s)try{var u=s.call(this.hls,t,r,e)
if(!u)throw new Error("Invalid response from configured generateRequest filter")
t=u.initDataType,r=e.decryptdata.pssh=u.initData?new Uint8Array(u.initData):null}catch(e){var l
if(this.warn(e.message),null!=(l=this.hls)&&l.config.debug)throw e}if(null===r)return this.log('Skipping key-session request for "'+n+'" (no initData)'),Promise.resolve(e)
var c=this.getKeyIdString(e.decryptdata)
this.log('Generating key-session request for "'+n+'": '+c+" (init data type: "+t+" length: "+(r?r.byteLength:null)+")")
var d=new qn
e.mediaKeysSession.onmessage=function(t){var r=e.mediaKeysSession
if(r){var n=t.messageType,i=t.message
o.log('"'+n+'" message event for session "'+r.sessionId+'" message size: '+i.byteLength),"license-request"===n||"license-renewal"===n?o.renewLicense(e,i).catch((function(e){o.handleError(e),d.emit("error",e)})):"license-release"===n?e.keySystem===G.FAIRPLAY&&(o.updateKeySession(e,j("acknowledged")),o.removeSession(e)):o.warn('unhandled media key message type "'+n+'"')}else d.emit("error",new Error("invalid state"))},e.mediaKeysSession.onkeystatuseschange=function(t){if(e.mediaKeysSession){o.onKeyStatusChange(e)
var r=e.keyStatus
d.emit("keyStatus",r),"expired"===r&&(o.warn(e.keySystem+" expired for key "+c),o.renewKeySession(e))}else d.emit("error",new Error("invalid state"))}
var h=new Promise((function(e,t){d.on("error",t),d.on("keyStatus",(function(r){r.startsWith("usable")?e():"output-restricted"===r?t(new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED,fatal:!1},"HDCP level output restricted")):"internal-error"===r?t(new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_STATUS_INTERNAL_ERROR,fatal:!0},'key status changed to "'+r+'"')):"expired"===r?t(new Error("key expired while generating request")):o.warn('unhandled key status change "'+r+'"')}))}))
return e.mediaKeysSession.generateRequest(t,r).then((function(){var t
o.log('Request generated for key-session "'+(null==(t=e.mediaKeysSession)?void 0:t.sessionId)+'" keyId: '+c)})).catch((function(e){throw new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_NO_SESSION,error:e,fatal:!1},"Error generating key-session request: "+e)})).then((function(){return h})).catch((function(t){throw d.removeAllListeners(),o.removeSession(e),t})).then((function(){return d.removeAllListeners(),e}))},t.onKeyStatusChange=function(e){var t=this
e.mediaKeysSession.keyStatuses.forEach((function(r,n){t.log('key status change "'+r+'" for keyStatuses keyId: '+pe("buffer"in n?new Uint8Array(n.buffer,n.byteOffset,n.byteLength):new Uint8Array(n))+" session keyId: "+pe(new Uint8Array(e.decryptdata.keyId||[]))+" uri: "+e.decryptdata.uri),e.keyStatus=r}))},t.fetchServerCertificate=function(e){var t=this.config,r=new(0,t.loader)(t),i=this.getServerCertificateUrl(e)
return i?(this.log('Fetching serverCertificate for "'+e+'"'),new Promise((function(a,o){var s={responseType:"arraybuffer",url:i},u=t.certLoadPolicy.default,l={loadPolicy:u,timeout:u.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0},c={onSuccess:function(e,t,r,n){a(e.data)},onError:function(t,r,a,u){o(new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,fatal:!0,networkDetails:a,response:n({url:s.url,data:void 0},t)},'"'+e+'" certificate request failed ('+i+"). Status: "+t.code+" ("+t.text+")"))},onTimeout:function(t,r,n){o(new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,fatal:!0,networkDetails:n,response:{url:s.url,data:void 0}},'"'+e+'" certificate request timed out ('+i+")"))},onAbort:function(e,t,r){o(new Error("aborted"))}}
r.load(s,l,c)}))):Promise.resolve()},t.setMediaKeysServerCertificate=function(e,t,r){var n=this
return new Promise((function(i,a){e.setServerCertificate(r).then((function(a){n.log("setServerCertificate "+(a?"success":"not supported by CDM")+" ("+(null==r?void 0:r.byteLength)+') on "'+t+'"'),i(e)})).catch((function(e){a(new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED,error:e,fatal:!0},e.message))}))}))},t.renewLicense=function(e,t){var r=this
return this.requestLicense(e,new Uint8Array(t)).then((function(t){return r.updateKeySession(e,new Uint8Array(t)).catch((function(e){throw new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_SESSION_UPDATE_FAILED,error:e,fatal:!0},e.message)}))}))},t.setupLicenseXHR=function(e,t,r,n){var i=this,a=this.config.licenseXhrSetup
return a?Promise.resolve().then((function(){if(!r.decryptdata)throw new Error("Key removed")
return a.call(i.hls,e,t,r,n)})).catch((function(o){if(!r.decryptdata)throw o
return e.open("POST",t,!0),a.call(i.hls,e,t,r,n)})).then((function(r){return e.readyState||e.open("POST",t,!0),{xhr:e,licenseChallenge:r||n}})):(e.open("POST",t,!0),Promise.resolve({xhr:e,licenseChallenge:n}))},t.requestLicense=function(e,t){var r=this,n=this.config.keyLoadPolicy.default
return new Promise((function(i,a){var o=r.getLicenseServerUrl(e.keySystem)
r.log("Sending license request to URL: "+o)
var s=new XMLHttpRequest
s.responseType="arraybuffer",s.onreadystatechange=function(){if(!r.hls||!e.mediaKeysSession)return a(new Error("invalid state"))
if(4===s.readyState)if(200===s.status){r._requestLicenseFailureCount=0
var u=s.response
r.log("License received "+(u instanceof ArrayBuffer?u.byteLength:u))
var l=r.config.licenseResponseCallback
if(l)try{u=l.call(r.hls,s,o,e)}catch(e){r.error(e)}i(u)}else{var c=n.errorRetry,d=c?c.maxNumRetry:0
if(r._requestLicenseFailureCount++,r._requestLicenseFailureCount>d||s.status>=400&&s.status<500)a(new sa({type:E.KEY_SYSTEM_ERROR,details:w.KEY_SYSTEM_LICENSE_REQUEST_FAILED,fatal:!0,networkDetails:s,response:{url:o,data:void 0,code:s.status,text:s.statusText}},"License Request XHR failed ("+o+"). Status: "+s.status+" ("+s.statusText+")"))
else{var h=d-r._requestLicenseFailureCount+1
r.warn("Retrying license request, "+h+" attempts left"),r.requestLicense(e,t).then(i,a)}}},e.licenseXhr&&e.licenseXhr.readyState!==XMLHttpRequest.DONE&&e.licenseXhr.abort(),e.licenseXhr=s,r.setupLicenseXHR(s,o,e,t).then((function(e){var t=e.xhr,r=e.licenseChallenge
t.send(r)}))}))},t.onMediaAttached=function(e,t){if(this.config.emeEnabled){var r=t.media
this.media=r,r.addEventListener("encrypted",this.onMediaEncrypted),r.addEventListener("waitingforkey",this.onWaitingForKey)}},t.onMediaDetached=function(){var t=this,r=this.media,n=this.mediaKeySessions
r&&(r.removeEventListener("encrypted",this.onMediaEncrypted),r.removeEventListener("waitingforkey",this.onWaitingForKey),this.media=null),this._requestLicenseFailureCount=0,this.setMediaKeysQueue=[],this.mediaKeySessions=[],this.keyIdToKeySessionPromise={},Fe.clearKeyUriToKeyIdMap()
var i=n.length
e.CDMCleanupPromise=Promise.all(n.map((function(e){return t.removeSession(e)})).concat(null==r?void 0:r.setMediaKeys(null).catch((function(e){t.log("Could not clear media keys: "+e+". media.src: "+(null==r?void 0:r.src))})))).then((function(){i&&(t.log("finished closing key sessions and clearing media keys"),n.length=0)})).catch((function(e){t.log("Could not close sessions and clear media keys: "+e+". media.src: "+(null==r?void 0:r.src))}))},t.onManifestLoading=function(){this.keyFormatPromise=null},t.onManifestLoaded=function(e,t){var r=t.sessionKeys
if(r&&this.config.emeEnabled&&!this.keyFormatPromise){var n=r.reduce((function(e,t){return-1===e.indexOf(t.keyFormat)&&e.push(t.keyFormat),e}),[])
this.log("Selecting key-system from session-keys "+n.join(", ")),this.keyFormatPromise=this.getKeyFormatPromise(n)}},t.removeSession=function(e){var t=this,r=e.mediaKeysSession,n=e.licenseXhr
if(r){this.log("Remove licenses and keys and close session "+r.sessionId),r.onmessage=null,r.onkeystatuseschange=null,n&&n.readyState!==XMLHttpRequest.DONE&&n.abort(),e.mediaKeysSession=e.decryptdata=e.licenseXhr=void 0
var i=this.mediaKeySessions.indexOf(e)
return i>-1&&this.mediaKeySessions.splice(i,1),r.remove().catch((function(e){t.log("Could not remove session: "+e)})).then((function(){return r.close()})).catch((function(e){t.log("Could not close session: "+e)}))}},e}()
oa.CDMCleanupPromise=void 0
var sa=function(e){function t(t,r){var n
return(n=e.call(this,r)||this).data=void 0,t.error||(t.error=new Error(r)),n.data=t,t.err=t.error,n}return u(t,e),t}(h(Error)),ua="a",la="av",ca=function(){function e(t){var r=this
this.hls=void 0,this.config=void 0,this.media=void 0,this.sid=void 0,this.cid=void 0,this.useHeaders=!1,this.initialized=!1,this.starved=!1,this.buffering=!0,this.audioBuffer=void 0,this.videoBuffer=void 0,this.onWaiting=function(){r.initialized&&(r.starved=!0),r.buffering=!0},this.onPlaying=function(){r.initialized||(r.initialized=!0),r.buffering=!1},this.applyPlaylistData=function(e){try{r.apply(e,{ot:"m",su:!r.initialized})}catch(e){k.warn("Could not generate manifest CMCD data.",e)}},this.applyFragmentData=function(e){try{var t=e.frag,n=r.hls.levels[t.level],i=r.getObjectType(t),a={d:1e3*t.duration,ot:i}
"v"!==i&&i!==ua&&i!=la||(a.br=n.bitrate/1e3,a.tb=r.getTopBandwidth(i)/1e3,a.bl=r.getBufferLength(i)),r.apply(e,a)}catch(e){k.warn("Could not generate segment CMCD data.",e)}},this.hls=t
var n=this.config=t.config,i=n.cmcd
null!=i&&(n.pLoader=this.createPlaylistLoader(),n.fLoader=this.createFragmentLoader(),this.sid=i.sessionId||e.uuid(),this.cid=i.contentId,this.useHeaders=!0===i.useHeaders,this.registerListeners())}var t=e.prototype
return t.registerListeners=function(){var e=this.hls
e.on(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.on(b.MEDIA_DETACHED,this.onMediaDetached,this),e.on(b.BUFFER_CREATED,this.onBufferCreated,this)},t.unregisterListeners=function(){var e=this.hls
e.off(b.MEDIA_ATTACHED,this.onMediaAttached,this),e.off(b.MEDIA_DETACHED,this.onMediaDetached,this),e.off(b.BUFFER_CREATED,this.onBufferCreated,this)},t.destroy=function(){this.unregisterListeners(),this.onMediaDetached(),this.hls=this.config=this.audioBuffer=this.videoBuffer=null},t.onMediaAttached=function(e,t){this.media=t.media,this.media.addEventListener("waiting",this.onWaiting),this.media.addEventListener("playing",this.onPlaying)},t.onMediaDetached=function(){this.media&&(this.media.removeEventListener("waiting",this.onWaiting),this.media.removeEventListener("playing",this.onPlaying),this.media=null)},t.onBufferCreated=function(e,t){var r,n
this.audioBuffer=null==(r=t.tracks.audio)?void 0:r.buffer,this.videoBuffer=null==(n=t.tracks.video)?void 0:n.buffer},t.createData=function(){var e
return{v:1,sf:"h",sid:this.sid,cid:this.cid,pr:null==(e=this.media)?void 0:e.playbackRate,mtp:this.hls.bandwidthEstimate/1e3}},t.apply=function(t,r){void 0===r&&(r={}),s(r,this.createData())
var n="i"===r.ot||"v"===r.ot||r.ot===la
if(this.starved&&n&&(r.bs=!0,r.su=!0,this.starved=!1),null==r.su&&(r.su=this.buffering),this.useHeaders){var i=e.toHeaders(r)
if(!Object.keys(i).length)return
t.headers||(t.headers={}),s(t.headers,i)}else{var a=e.toQuery(r)
if(!a)return
t.url=e.appendQueryToUri(t.url,a)}},t.getObjectType=function(e){var t=e.type
return"subtitle"===t?"tt":"initSegment"===e.sn?"i":"audio"===t?ua:"main"===t?this.hls.audioTracks.length?"v":la:void 0},t.getTopBandwidth=function(e){var t,r=0,n=this.hls
if(e===ua)t=n.audioTracks
else{var i=n.maxAutoLevel,a=i>-1?i+1:n.levels.length
t=n.levels.slice(0,a)}for(var o,s=p(t);!(o=s()).done;){var u=o.value
u.bitrate>r&&(r=u.bitrate)}return r>0?r:NaN},t.getBufferLength=function(e){var t=this.hls.media,r=e===ua?this.audioBuffer:this.videoBuffer
return r&&t?1e3*dr.bufferInfo(r,t.currentTime,this.config.maxBufferHole).len:NaN},t.createPlaylistLoader=function(){var e=this.config.pLoader,t=this.applyPlaylistData,r=e||this.config.loader
return function(){function e(e){this.loader=void 0,this.loader=new r(e)}var n=e.prototype
return n.destroy=function(){this.loader.destroy()},n.abort=function(){this.loader.abort()},n.load=function(e,r,n){t(e),this.loader.load(e,r,n)},a(e,[{key:"stats",get:function(){return this.loader.stats}},{key:"context",get:function(){return this.loader.context}}]),e}()},t.createFragmentLoader=function(){var e=this.config.fLoader,t=this.applyFragmentData,r=e||this.config.loader
return function(){function e(e){this.loader=void 0,this.loader=new r(e)}var n=e.prototype
return n.destroy=function(){this.loader.destroy()},n.abort=function(){this.loader.abort()},n.load=function(e,r,n){t(e),this.loader.load(e,r,n)},a(e,[{key:"stats",get:function(){return this.loader.stats}},{key:"context",get:function(){return this.loader.context}}]),e}()},e.uuid=function(){var e=URL.createObjectURL(new Blob),t=e.toString()
return URL.revokeObjectURL(e),t.slice(t.lastIndexOf("/")+1)},e.serialize=function(e){for(var t,r=[],n=function(e){return!Number.isNaN(e)&&null!=e&&""!==e&&!1!==e},i=function(e){return Math.round(e)},a=function(e){return 100*i(e/100)},o={br:i,d:i,bl:a,dl:a,mtp:a,nor:function(e){return encodeURIComponent(e)},rtp:a,tb:i},s=p(Object.keys(e||{}).sort());!(t=s()).done;){var u=t.value,l=e[u]
if(n(l)&&!("v"===u&&1===l||"pr"==u&&1===l)){var c=o[u]
c&&(l=c(l))
var d,h=typeof l
d="ot"===u||"sf"===u||"st"===u?u+"="+l:"boolean"===h?u:"number"===h?u+"="+l:u+"="+JSON.stringify(l),r.push(d)}}return r.join(",")},e.toHeaders=function(t){for(var r={},n=["Object","Request","Session","Status"],i=[{},{},{},{}],a={br:0,d:0,ot:0,tb:0,bl:1,dl:1,mtp:1,nor:1,nrr:1,su:1,cid:2,pr:2,sf:2,sid:2,st:2,v:2,bs:3,rtp:3},o=0,s=Object.keys(t);o<s.length;o++){var u=s[o]
i[null!=a[u]?a[u]:1][u]=t[u]}for(var l=0;l<i.length;l++){var c=e.serialize(i[l])
c&&(r["CMCD-"+n[l]]=c)}return r},e.toQuery=function(t){return"CMCD="+encodeURIComponent(e.serialize(t))},e.appendQueryToUri=function(e,t){if(!t)return e
var r=e.includes("?")?"&":"?"
return""+e+r+t},e}(),da=function(){function e(e){this.hls=void 0,this.log=void 0,this.loader=null,this.uri=null,this.pathwayId=".",this.pathwayPriority=null,this.timeToLoad=300,this.reloadTimer=-1,this.updated=0,this.started=!1,this.enabled=!0,this.levels=null,this.audioTracks=null,this.subtitleTracks=null,this.penalizedPathways={},this.hls=e,this.log=k.log.bind(k,"[content-steering]:"),this.registerListeners()}var t=e.prototype
return t.registerListeners=function(){var e=this.hls
e.on(b.MANIFEST_LOADING,this.onManifestLoading,this),e.on(b.MANIFEST_LOADED,this.onManifestLoaded,this),e.on(b.MANIFEST_PARSED,this.onManifestParsed,this),e.on(b.ERROR,this.onError,this)},t.unregisterListeners=function(){var e=this.hls
e&&(e.off(b.MANIFEST_LOADING,this.onManifestLoading,this),e.off(b.MANIFEST_LOADED,this.onManifestLoaded,this),e.off(b.MANIFEST_PARSED,this.onManifestParsed,this),e.off(b.ERROR,this.onError,this))},t.startLoad=function(){if(this.started=!0,self.clearTimeout(this.reloadTimer),this.enabled&&this.uri)if(this.updated){var e=Math.max(1e3*this.timeToLoad-(performance.now()-this.updated),0)
this.scheduleRefresh(this.uri,e)}else this.loadSteeringManifest(this.uri)},t.stopLoad=function(){this.started=!1,this.loader&&(this.loader.destroy(),this.loader=null),self.clearTimeout(this.reloadTimer)},t.destroy=function(){this.unregisterListeners(),this.stopLoad(),this.hls=null,this.levels=this.audioTracks=this.subtitleTracks=null},t.removeLevel=function(e){var t=this.levels
t&&(this.levels=t.filter((function(t){return t!==e})))},t.onManifestLoading=function(){this.stopLoad(),this.enabled=!0,this.timeToLoad=300,this.updated=0,this.uri=null,this.pathwayId=".",this.levels=this.audioTracks=this.subtitleTracks=null},t.onManifestLoaded=function(e,t){var r=t.contentSteering
null!==r&&(this.pathwayId=r.pathwayId,this.uri=r.uri,this.started&&this.startLoad())},t.onManifestParsed=function(e,t){this.audioTracks=t.audioTracks,this.subtitleTracks=t.subtitleTracks},t.onError=function(e,t){var r=t.errorAction
if(2===(null==r?void 0:r.action)&&1===r.flags){var n=this.pathwayPriority,i=this.pathwayId
this.penalizedPathways[i]||(this.penalizedPathways[i]=performance.now()),!n&&this.levels&&(n=this.levels.reduce((function(e,t){return-1===e.indexOf(t.pathwayId)&&e.push(t.pathwayId),e}),[])),n&&n.length>1&&(this.updatePathwayPriority(n),r.resolved=this.pathwayId!==i)}},t.filterParsedLevels=function(e){this.levels=e
var t=this.getLevelsForPathway(this.pathwayId)
if(0===t.length){var r=e[0].pathwayId
this.log("No levels found in Pathway "+this.pathwayId+'. Setting initial Pathway to "'+r+'"'),t=this.getLevelsForPathway(r),this.pathwayId=r}return t.length!==e.length?(this.log("Found "+t.length+"/"+e.length+' levels in Pathway "'+this.pathwayId+'"'),t):e},t.getLevelsForPathway=function(e){return null===this.levels?[]:this.levels.filter((function(t){return e===t.pathwayId}))},t.updatePathwayPriority=function(e){var t
this.pathwayPriority=e
var r=this.penalizedPathways,n=performance.now()
Object.keys(r).forEach((function(e){n-r[e]>3e5&&delete r[e]}))
for(var i=0;i<e.length;i++){var a=e[i]
if(!r[a]){if(a===this.pathwayId)return
var o=this.hls.nextLoadLevel,s=this.hls.levels[o]
if((t=this.getLevelsForPathway(a)).length>0){this.log('Setting Pathway to "'+a+'"'),this.pathwayId=a,this.hls.trigger(b.LEVELS_UPDATED,{levels:t})
var u=this.hls.levels[o]
s&&u&&this.levels&&(u.attrs["STABLE-VARIANT-ID"]!==s.attrs["STABLE-VARIANT-ID"]&&u.bitrate!==s.bitrate&&this.log("Unstable Pathways change from bitrate "+s.bitrate+" to "+u.bitrate),this.hls.nextLoadLevel=o)
break}}}},t.clonePathways=function(e){var t=this,r=this.levels
if(r){var n={},i={}
e.forEach((function(e){var a=e.ID,o=e["BASE-ID"],u=e["URI-REPLACEMENT"]
if(!r.some((function(e){return e.pathwayId===a}))){var l=t.getLevelsForPathway(o).map((function(e){var t=s({},e)
t.details=void 0,t.url=fa(e.uri,e.attrs["STABLE-VARIANT-ID"],"PER-VARIANT-URIS",u)
var r=new C(e.attrs)
r["PATHWAY-ID"]=a
var o=r.AUDIO&&r.AUDIO+"_clone_"+a,l=r.SUBTITLES&&r.SUBTITLES+"_clone_"+a
o&&(n[r.AUDIO]=o,r.AUDIO=o),l&&(i[r.SUBTITLES]=l,r.SUBTITLES=l),t.attrs=r
var c=new St(t)
return $t(c,"audio",o),$t(c,"text",l),c}))
r.push.apply(r,l),ha(t.audioTracks,n,u,a),ha(t.subtitleTracks,i,u,a)}}))}},t.loadSteeringManifest=function(e){var t,r=this,n=this.hls.config,i=n.loader
this.loader&&this.loader.destroy(),this.loader=new i(n)
try{t=new self.URL(e)}catch(t){return this.enabled=!1,void this.log("Failed to parse Steering Manifest URI: "+e)}if("data:"!==t.protocol){var a=0|(this.hls.bandwidthEstimate||n.abrEwmaDefaultEstimate)
t.searchParams.set("_HLS_pathway",this.pathwayId),t.searchParams.set("_HLS_throughput",""+a)}var o={responseType:"json",url:t.href},s=n.steeringManifestLoadPolicy.default,u=s.errorRetry||s.timeoutRetry||{},l={loadPolicy:s,timeout:s.maxLoadTimeMs,maxRetry:u.maxNumRetry||0,retryDelay:u.retryDelayMs||0,maxRetryDelay:u.maxRetryDelayMs||0},c={onSuccess:function(e,n,i,a){r.log('Loaded steering manifest: "'+t+'"')
var o=e.data
if(1===o.VERSION){r.updated=performance.now(),r.timeToLoad=o.TTL
var s=o["RELOAD-URI"],u=o["PATHWAY-CLONES"],l=o["PATHWAY-PRIORITY"]
if(s)try{r.uri=new self.URL(s,t).href}catch(e){return r.enabled=!1,void r.log("Failed to parse Steering Manifest RELOAD-URI: "+s)}r.scheduleRefresh(r.uri||i.url),u&&r.clonePathways(u),l&&r.updatePathwayPriority(l)}else r.log("Steering VERSION "+o.VERSION+" not supported!")},onError:function(e,t,n,i){if(r.log("Error loading steering manifest: "+e.code+" "+e.text+" ("+t.url+")"),r.stopLoad(),410===e.code)return r.enabled=!1,void r.log("Steering manifest "+t.url+" no longer available")
var a=1e3*r.timeToLoad
if(429!==e.code)r.scheduleRefresh(r.uri||t.url,a)
else{var o=r.loader
if("function"==typeof(null==o?void 0:o.getResponseHeader)){var s=o.getResponseHeader("Retry-After")
s&&(a=1e3*parseFloat(s))}r.log("Steering manifest "+t.url+" rate limited")}},onTimeout:function(e,t,n){r.log("Timeout loading steering manifest ("+t.url+")"),r.scheduleRefresh(r.uri||t.url)}}
this.log("Requesting steering manifest: "+t),this.loader.load(o,l,c)},t.scheduleRefresh=function(e,t){var r=this
void 0===t&&(t=1e3*this.timeToLoad),self.clearTimeout(this.reloadTimer),this.reloadTimer=self.setTimeout((function(){r.loadSteeringManifest(e)}),t)},e}()
function ha(e,t,r,n){e&&Object.keys(t).forEach((function(i){var a=e.filter((function(e){return e.groupId===i})).map((function(e){var a=s({},e)
return a.details=void 0,a.attrs=new C(a.attrs),a.url=a.attrs.URI=fa(e.url,e.attrs["STABLE-RENDITION-ID"],"PER-RENDITION-URIS",r),a.groupId=a.attrs["GROUP-ID"]=t[i],a.attrs["PATHWAY-ID"]=n,a}))
e.push.apply(e,a)}))}function fa(e,t,r,n){var i,a=n.HOST,o=n.PARAMS,s=n[r]
t&&(i=null==s?void 0:s[t])&&(e=i)
var u=new self.URL(e)
return a&&!i&&(u.host=a),o&&Object.keys(o).sort().forEach((function(e){e&&u.searchParams.set(e,o[e])})),u.href}var pa=/^age:\s*[\d.]+\s*$/im,ga=function(){function e(e){this.xhrSetup=void 0,this.requestTimeout=void 0,this.retryTimeout=void 0,this.retryDelay=void 0,this.config=null,this.callbacks=null,this.context=void 0,this.loader=null,this.stats=void 0,this.xhrSetup=e&&e.xhrSetup||null,this.stats=new I,this.retryDelay=0}var t=e.prototype
return t.destroy=function(){this.callbacks=null,this.abortInternal(),this.loader=null,this.config=null},t.abortInternal=function(){var e=this.loader
self.clearTimeout(this.requestTimeout),self.clearTimeout(this.retryTimeout),e&&(e.onreadystatechange=null,e.onprogress=null,4!==e.readyState&&(this.stats.aborted=!0,e.abort()))},t.abort=function(){var e
this.abortInternal(),null!=(e=this.callbacks)&&e.onAbort&&this.callbacks.onAbort(this.stats,this.context,this.loader)},t.load=function(e,t,r){if(this.stats.loading.start)throw new Error("Loader can only be used once.")
this.stats.loading.start=self.performance.now(),this.context=e,this.config=t,this.callbacks=r,this.loadInternal()},t.loadInternal=function(){var e=this,t=this.config,r=this.context
if(t){var n=this.loader=new self.XMLHttpRequest,i=this.stats
i.loading.first=0,i.loaded=0
var a=this.xhrSetup
a?Promise.resolve().then((function(){if(!e.stats.aborted)return a(n,r.url)})).catch((function(e){return n.open("GET",r.url,!0),a(n,r.url)})).then((function(){e.stats.aborted||e.openAndSendXhr(n,r,t)})).catch((function(t){e.callbacks.onError({code:n.status,text:t.message},r,n,i)})):this.openAndSendXhr(n,r,t)}},t.openAndSendXhr=function(e,t,r){e.readyState||e.open("GET",t.url,!0)
var n=this.context.headers,i=r.loadPolicy,a=i.maxTimeToFirstByteMs,o=i.maxLoadTimeMs
if(n)for(var s in n)e.setRequestHeader(s,n[s])
t.rangeEnd&&e.setRequestHeader("Range","bytes="+t.rangeStart+"-"+(t.rangeEnd-1)),e.onreadystatechange=this.readystatechange.bind(this),e.onprogress=this.loadprogress.bind(this),e.responseType=t.responseType,self.clearTimeout(this.requestTimeout),r.timeout=a&&y(a)?a:o,this.requestTimeout=self.setTimeout(this.loadtimeout.bind(this),r.timeout),e.send()},t.readystatechange=function(){var e=this.context,t=this.loader,r=this.stats
if(e&&t){var n=t.readyState,i=this.config
if(!r.aborted&&n>=2&&(0===r.loading.first&&(r.loading.first=Math.max(self.performance.now(),r.loading.start),i.timeout!==i.loadPolicy.maxLoadTimeMs&&(self.clearTimeout(this.requestTimeout),i.timeout=i.loadPolicy.maxLoadTimeMs,this.requestTimeout=self.setTimeout(this.loadtimeout.bind(this),i.loadPolicy.maxLoadTimeMs-(r.loading.first-r.loading.start)))),4===n)){self.clearTimeout(this.requestTimeout),t.onreadystatechange=null,t.onprogress=null
var a=t.status,o="text"!==t.responseType
if(a>=200&&a<300&&(o&&t.response||null!==t.responseText)){r.loading.end=Math.max(self.performance.now(),r.loading.first)
var s=o?t.response:t.responseText,u="arraybuffer"===t.responseType?s.byteLength:s.length
if(r.loaded=r.total=u,r.bwEstimate=8e3*r.total/(r.loading.end-r.loading.first),!this.callbacks)return
var l=this.callbacks.onProgress
if(l&&l(r,e,s,t),!this.callbacks)return
var c={url:t.responseURL,data:s,code:a}
this.callbacks.onSuccess(c,r,e,t)}else{var d=i.loadPolicy.errorRetry
Ut(d,r.retry,!1,a)?this.retry(d):(k.error(a+" while loading "+e.url),this.callbacks.onError({code:a,text:t.statusText},e,t,r))}}}},t.loadtimeout=function(){var e,t=null==(e=this.config)?void 0:e.loadPolicy.timeoutRetry
if(Ut(t,this.stats.retry,!0))this.retry(t)
else{k.warn("timeout while loading "+this.context.url)
var r=this.callbacks
r&&(this.abortInternal(),r.onTimeout(this.stats,this.context,this.loader))}},t.retry=function(e){var t=this.context,r=this.stats
this.retryDelay=Mt(e,r.retry),r.retry++,k.warn((status?"HTTP Status "+status:"Timeout")+" while loading "+t.url+", retrying "+r.retry+"/"+e.maxNumRetry+" in "+this.retryDelay+"ms"),this.abortInternal(),this.loader=null,self.clearTimeout(this.retryTimeout),this.retryTimeout=self.setTimeout(this.loadInternal.bind(this),this.retryDelay)},t.loadprogress=function(e){var t=this.stats
t.loaded=e.loaded,e.lengthComputable&&(t.total=e.total)},t.getCacheAge=function(){var e=null
if(this.loader&&pa.test(this.loader.getAllResponseHeaders())){var t=this.loader.getResponseHeader("age")
e=t?parseFloat(t):null}return e},t.getResponseHeader=function(e){return this.loader&&new RegExp("^"+e+":\\s*[\\d.]+\\s*$","im").test(this.loader.getAllResponseHeaders())?this.loader.getResponseHeader(e):null},e}(),ma=/(\d+)-(\d+)\/(\d+)/,va=function(){function e(e){this.fetchSetup=void 0,this.requestTimeout=void 0,this.request=void 0,this.response=void 0,this.controller=void 0,this.context=void 0,this.config=null,this.callbacks=null,this.stats=void 0,this.loader=null,this.fetchSetup=e.fetchSetup||ya,this.controller=new self.AbortController,this.stats=new I}var t=e.prototype
return t.destroy=function(){this.loader=this.callbacks=null,this.abortInternal()},t.abortInternal=function(){var e=this.response
null!=e&&e.ok||(this.stats.aborted=!0,this.controller.abort())},t.abort=function(){var e
this.abortInternal(),null!=(e=this.callbacks)&&e.onAbort&&this.callbacks.onAbort(this.stats,this.context,this.response)},t.load=function(e,t,r){var n=this,i=this.stats
if(i.loading.start)throw new Error("Loader can only be used once.")
i.loading.start=self.performance.now()
var a=function(e,t){var r={method:"GET",mode:"cors",credentials:"same-origin",signal:t,headers:new self.Headers(s({},e.headers))}
return e.rangeEnd&&r.headers.set("Range","bytes="+e.rangeStart+"-"+String(e.rangeEnd-1)),r}(e,this.controller.signal),o=r.onProgress,u="arraybuffer"===e.responseType,l=u?"byteLength":"length",c=t.loadPolicy,d=c.maxTimeToFirstByteMs,h=c.maxLoadTimeMs
this.context=e,this.config=t,this.callbacks=r,this.request=this.fetchSetup(e,a),self.clearTimeout(this.requestTimeout),t.timeout=d&&y(d)?d:h,this.requestTimeout=self.setTimeout((function(){n.abortInternal(),r.onTimeout(i,e,n.response)}),t.timeout),self.fetch(this.request).then((function(a){n.response=n.loader=a
var s=Math.max(self.performance.now(),i.loading.start)
if(self.clearTimeout(n.requestTimeout),t.timeout=h,n.requestTimeout=self.setTimeout((function(){n.abortInternal(),r.onTimeout(i,e,n.response)}),h-(s-i.loading.start)),!a.ok){var l=a.status,c=a.statusText
throw new ba(c||"fetch, bad network response",l,a)}return i.loading.first=s,i.total=function(e){var t=e.get("Content-Range")
if(t){var r=function(e){var t=ma.exec(e)
if(t)return parseInt(t[2])-parseInt(t[1])+1}(t)
if(y(r))return r}var n=e.get("Content-Length")
if(n)return parseInt(n)}(a.headers)||i.total,o&&y(t.highWaterMark)?n.loadProgressively(a,i,e,t.highWaterMark,o):u?a.arrayBuffer():"json"===e.responseType?a.json():a.text()})).then((function(a){var s=n.response
self.clearTimeout(n.requestTimeout),i.loading.end=Math.max(self.performance.now(),i.loading.first)
var u=a[l]
u&&(i.loaded=i.total=u)
var c={url:s.url,data:a,code:s.status}
o&&!y(t.highWaterMark)&&o(i,e,a,s),r.onSuccess(c,i,e,s)})).catch((function(t){if(self.clearTimeout(n.requestTimeout),!i.aborted){var a=t&&t.code||0,o=t?t.message:null
r.onError({code:a,text:o},e,t?t.details:null,i)}}))},t.getCacheAge=function(){var e=null
if(this.response){var t=this.response.headers.get("age")
e=t?parseFloat(t):null}return e},t.getResponseHeader=function(e){return this.response?this.response.headers.get(e):null},t.loadProgressively=function(e,t,r,n,i){void 0===n&&(n=0)
var a=new Xn,o=e.body.getReader()
return function s(){return o.read().then((function(o){if(o.done)return a.dataLength&&i(t,r,a.flush(),e),Promise.resolve(new ArrayBuffer(0))
var u=o.value,l=u.length
return t.loaded+=l,l<n||a.dataLength?(a.push(u),a.dataLength>=n&&i(t,r,a.flush(),e)):i(t,r,u,e),s()})).catch((function(){return Promise.reject()}))}()},e}()
function ya(e,t){return new self.Request(e.url,t)}var ba=function(e){function t(t,r,n){var i
return(i=e.call(this,t)||this).code=void 0,i.details=void 0,i.code=r,i.details=n,i}return u(t,e),t}(h(Error)),Ea=/\s/,wa=n(n({autoStartLoad:!0,startPosition:-1,defaultAudioCodec:void 0,debug:!1,capLevelOnFPSDrop:!1,capLevelToPlayerSize:!1,ignoreDevicePixelRatio:!1,initialLiveManifestSize:1,maxBufferLength:30,backBufferLength:1/0,maxBufferSize:6e7,maxBufferHole:.1,highBufferWatchdogPeriod:2,nudgeOffset:.1,nudgeMaxRetry:3,maxFragLookUpTolerance:.25,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,liveSyncDuration:void 0,liveMaxLatencyDuration:void 0,maxLiveSyncPlaybackRate:1,liveDurationInfinity:!1,liveBackBufferLength:null,maxMaxBufferLength:600,enableWorker:!0,workerPath:null,enableSoftwareAES:!0,startLevel:void 0,startFragPrefetch:!1,fpsDroppedMonitoringPeriod:5e3,fpsDroppedMonitoringThreshold:.2,appendErrorMaxRetry:3,loader:ga,fLoader:void 0,pLoader:void 0,xhrSetup:void 0,licenseXhrSetup:void 0,licenseResponseCallback:void 0,abrController:Qn,bufferController:li,capLevelController:na,errorController:zt,fpsController:ia,stretchShortVideoTrack:!1,maxAudioFramesDrift:1,forceKeyFrameOnDiscontinuity:!0,abrEwmaFastLive:3,abrEwmaSlowLive:9,abrEwmaFastVoD:3,abrEwmaSlowVoD:9,abrEwmaDefaultEstimate:5e5,abrBandWidthFactor:.95,abrBandWidthUpFactor:.7,abrMaxWithRealBitrate:!1,maxStarvationDelay:4,maxLoadingDelay:4,minAutoBitrate:0,emeEnabled:!1,widevineLicenseUrl:void 0,drmSystems:{},drmSystemOptions:{},requestMediaKeySystemAccessFunc:X,testBandwidth:!0,progressive:!1,lowLatencyMode:!0,cmcd:void 0,enableDateRangeMetadataCues:!0,enableEmsgMetadataCues:!0,enableID3MetadataCues:!0,certLoadPolicy:{default:{maxTimeToFirstByteMs:8e3,maxLoadTimeMs:2e4,timeoutRetry:null,errorRetry:null}},keyLoadPolicy:{default:{maxTimeToFirstByteMs:8e3,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:2e4,backoff:"linear"},errorRetry:{maxNumRetry:8,retryDelayMs:1e3,maxRetryDelayMs:2e4,backoff:"linear"}}},manifestLoadPolicy:{default:{maxTimeToFirstByteMs:1/0,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},playlistLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:2,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},fragLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:12e4,timeoutRetry:{maxNumRetry:4,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:6,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},steeringManifestLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,manifestLoadingMaxRetryTimeout:64e3,levelLoadingTimeOut:1e4,levelLoadingMaxRetry:4,levelLoadingRetryDelay:1e3,levelLoadingMaxRetryTimeout:64e3,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:6,fragLoadingRetryDelay:1e3,fragLoadingMaxRetryTimeout:64e3},{cueHandler:{newCue:function(e,t,r,n){for(var i,a,o,s,u,l=[],c=self.VTTCue||self.TextTrackCue,d=0;d<n.rows.length;d++)if(o=!0,s=0,u="",!(i=n.rows[d]).isEmpty()){for(var h,f=0;f<i.chars.length;f++)Ea.test(i.chars[f].uchar)&&o?s++:(u+=i.chars[f].uchar,o=!1)
i.cueStartTime=t,t===r&&(r+=1e-4),s>=16?s--:s++
var p=Bi(u.trim()),g=Hi(t,r,p)
null!=e&&null!=(h=e.cues)&&h.getCueById(g)||((a=new c(t,r,p)).id=g,a.line=d+1,a.align="left",a.position=10+Math.min(80,10*Math.floor(8*s/32)),l.push(a))}return e&&l.length&&(l.sort((function(e,t){return"auto"===e.line||"auto"===t.line?0:e.line>8&&t.line>8?t.line-e.line:e.line-t.line})),l.forEach((function(t){return gt(e,t)}))),l}},enableWebVTT:!0,enableIMSC1:!0,enableCEA708Captions:!0,captionsTextTrack1Label:"English",captionsTextTrack1LanguageCode:"en",captionsTextTrack2Label:"Spanish",captionsTextTrack2LanguageCode:"es",captionsTextTrack3Label:"Unknown CC",captionsTextTrack3LanguageCode:"",captionsTextTrack4Label:"Unknown CC",captionsTextTrack4LanguageCode:"",renderTextTracksNatively:!0}),{},{subtitleStreamController:ri,subtitleTrackController:ii,timelineController:ta,audioStreamController:Zn,audioTrackController:Jn,emeController:oa,cmcdController:ca,contentSteeringController:da})
function _a(e){return e&&"object"==typeof e?Array.isArray(e)?e.map(_a):Object.keys(e).reduce((function(t,r){return t[r]=_a(e[r]),t}),{}):e}var Ta=function(){function e(t){void 0===t&&(t={}),this.config=void 0,this.userConfig=void 0,this.coreComponents=void 0,this.networkControllers=void 0,this._emitter=new qn,this._autoLevelCapping=void 0,this._maxHdcpLevel=null,this.abrController=void 0,this.bufferController=void 0,this.capLevelController=void 0,this.latencyController=void 0,this.levelController=void 0,this.streamController=void 0,this.audioTrackController=void 0,this.subtitleTrackController=void 0,this.emeController=void 0,this.cmcdController=void 0,this._media=null,this.url=null,D(t.debug||!1,"Hls instance")
var r=this.config=function(e,t){if((t.liveSyncDurationCount||t.liveMaxLatencyDurationCount)&&(t.liveSyncDuration||t.liveMaxLatencyDuration))throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration")
if(void 0!==t.liveMaxLatencyDurationCount&&(void 0===t.liveSyncDurationCount||t.liveMaxLatencyDurationCount<=t.liveSyncDurationCount))throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"')
if(void 0!==t.liveMaxLatencyDuration&&(void 0===t.liveSyncDuration||t.liveMaxLatencyDuration<=t.liveSyncDuration))throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"')
var r=_a(e),i=["TimeOut","MaxRetry","RetryDelay","MaxRetryTimeout"]
return["manifest","level","frag"].forEach((function(e){var n=("level"===e?"playlist":e)+"LoadPolicy",a=void 0===t[n],o=[]
i.forEach((function(i){var s=e+"Loading"+i,u=t[s]
if(void 0!==u&&a){o.push(s)
var l=r[n].default
switch(t[n]={default:l},i){case"TimeOut":l.maxLoadTimeMs=u,l.maxTimeToFirstByteMs=u
break
case"MaxRetry":l.errorRetry.maxNumRetry=u,l.timeoutRetry.maxNumRetry=u
break
case"RetryDelay":l.errorRetry.retryDelayMs=u,l.timeoutRetry.retryDelayMs=u
break
case"MaxRetryTimeout":l.errorRetry.maxRetryDelayMs=u,l.timeoutRetry.maxRetryDelayMs=u}}})),o.length&&k.warn('hls.js config: "'+o.join('", "')+'" setting(s) are deprecated, use "'+n+'": '+JSON.stringify(t[n]))})),n(n({},r),t)}(e.DefaultConfig,t)
this.userConfig=t,this._autoLevelCapping=-1,r.progressive&&function(e){var t=e.loader
t!==va&&t!==ga?(k.log("[config]: Custom loader detected, cannot enable progressive streaming"),e.progressive=!1):function(){if(self.fetch&&self.AbortController&&self.ReadableStream&&self.Request)try{return new self.ReadableStream({}),!0}catch(e){}return!1}()&&(e.loader=va,e.progressive=!0,e.enableSoftwareAES=!0,k.log("[config]: Progressive streaming enabled, using FetchLoader"))}(r)
var i=r.abrController,a=r.bufferController,o=r.capLevelController,s=r.errorController,u=r.fpsController,l=new s(this),c=this.abrController=new i(this),d=this.bufferController=new a(this),h=this.capLevelController=new o(this),f=new u(this),p=new ft(this),g=new Tt(this),m=r.contentSteeringController,v=m?new m(this):null,y=this.levelController=new Wt(this,v),E=new er(this),w=new ur(this.config),_=this.streamController=new Wn(this,E,w)
h.setStreamController(_),f.setStreamController(_)
var T=[p,y,_]
v&&T.splice(1,0,v),this.networkControllers=T
var A=[c,d,h,f,g,E]
this.audioTrackController=this.createController(r.audioTrackController,T)
var S=r.audioStreamController
S&&T.push(new S(this,E,w)),this.subtitleTrackController=this.createController(r.subtitleTrackController,T)
var x=r.subtitleStreamController
x&&T.push(new x(this,E,w)),this.createController(r.timelineController,A),w.emeController=this.emeController=this.createController(r.emeController,A),this.cmcdController=this.createController(r.cmcdController,A),this.latencyController=this.createController(At,A),this.coreComponents=A,T.push(l)
var C=l.onErrorOut
"function"==typeof C&&this.on(b.ERROR,C,l)}e.isSupported=function(){return function(){var e=je()
if(!e)return!1
var t=Fr(),r=e&&"function"==typeof e.isTypeSupported&&e.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),n=!t||t.prototype&&"function"==typeof t.prototype.appendBuffer&&"function"==typeof t.prototype.remove
return!!r&&!!n}()}
var t=e.prototype
return t.createController=function(e,t){if(e){var r=new e(this)
return t&&t.push(r),r}return null},t.on=function(e,t,r){void 0===r&&(r=this),this._emitter.on(e,t,r)},t.once=function(e,t,r){void 0===r&&(r=this),this._emitter.once(e,t,r)},t.removeAllListeners=function(e){this._emitter.removeAllListeners(e)},t.off=function(e,t,r,n){void 0===r&&(r=this),this._emitter.off(e,t,r,n)},t.listeners=function(e){return this._emitter.listeners(e)},t.emit=function(e,t,r){return this._emitter.emit(e,t,r)},t.trigger=function(e,t){if(this.config.debug)return this.emit(e,e,t)
try{return this.emit(e,e,t)}catch(t){k.error("An internal error happened while handling event "+e+'. Error message: "'+t.message+'". Here is a stacktrace:',t),this.trigger(b.ERROR,{type:E.OTHER_ERROR,details:w.INTERNAL_EXCEPTION,fatal:!1,event:e,error:t})}return!1},t.listenerCount=function(e){return this._emitter.listenerCount(e)},t.destroy=function(){k.log("destroy"),this.trigger(b.DESTROYING,void 0),this.detachMedia(),this.removeAllListeners(),this._autoLevelCapping=-1,this.url=null,this.networkControllers.forEach((function(e){return e.destroy()})),this.networkControllers.length=0,this.coreComponents.forEach((function(e){return e.destroy()})),this.coreComponents.length=0
var e=this.config
e.xhrSetup=e.fetchSetup=void 0,this.userConfig=null},t.attachMedia=function(e){k.log("attachMedia"),this._media=e,this.trigger(b.MEDIA_ATTACHING,{media:e})},t.detachMedia=function(){k.log("detachMedia"),this.trigger(b.MEDIA_DETACHING,void 0),this._media=null},t.loadSource=function(e){this.stopLoad()
var t=this.media,r=this.url,n=this.url=v.buildAbsoluteURL(self.location.href,e,{alwaysNormalize:!0})
k.log("loadSource:"+n),t&&r&&(r!==n||this.bufferController.hasSourceTypes())&&(this.detachMedia(),this.attachMedia(t)),this.trigger(b.MANIFEST_LOADING,{url:e})},t.startLoad=function(e){void 0===e&&(e=-1),k.log("startLoad("+e+")"),this.networkControllers.forEach((function(t){t.startLoad(e)}))},t.stopLoad=function(){k.log("stopLoad"),this.networkControllers.forEach((function(e){e.stopLoad()}))},t.swapAudioCodec=function(){k.log("swapAudioCodec"),this.streamController.swapAudioCodec()},t.recoverMediaError=function(){k.log("recoverMediaError")
var e=this._media
this.detachMedia(),e&&this.attachMedia(e)},t.removeLevel=function(e,t){void 0===t&&(t=0),this.levelController.removeLevel(e,t)},a(e,[{key:"levels",get:function(){return this.levelController.levels||[]}},{key:"currentLevel",get:function(){return this.streamController.currentLevel},set:function(e){k.log("set currentLevel:"+e),this.loadLevel=e,this.abrController.clearTimer(),this.streamController.immediateLevelSwitch()}},{key:"nextLevel",get:function(){return this.streamController.nextLevel},set:function(e){k.log("set nextLevel:"+e),this.levelController.manualLevel=e,this.streamController.nextLevelSwitch()}},{key:"loadLevel",get:function(){return this.levelController.level},set:function(e){k.log("set loadLevel:"+e),this.levelController.manualLevel=e}},{key:"nextLoadLevel",get:function(){return this.levelController.nextLoadLevel},set:function(e){this.levelController.nextLoadLevel=e}},{key:"firstLevel",get:function(){return Math.max(this.levelController.firstLevel,this.minAutoLevel)},set:function(e){k.log("set firstLevel:"+e),this.levelController.firstLevel=e}},{key:"startLevel",get:function(){return this.levelController.startLevel},set:function(e){k.log("set startLevel:"+e),-1!==e&&(e=Math.max(e,this.minAutoLevel)),this.levelController.startLevel=e}},{key:"capLevelToPlayerSize",get:function(){return this.config.capLevelToPlayerSize},set:function(e){var t=!!e
t!==this.config.capLevelToPlayerSize&&(t?this.capLevelController.startCapping():(this.capLevelController.stopCapping(),this.autoLevelCapping=-1,this.streamController.nextLevelSwitch()),this.config.capLevelToPlayerSize=t)}},{key:"autoLevelCapping",get:function(){return this._autoLevelCapping},set:function(e){this._autoLevelCapping!==e&&(k.log("set autoLevelCapping:"+e),this._autoLevelCapping=e)}},{key:"bandwidthEstimate",get:function(){var e=this.abrController.bwEstimator
return e?e.getEstimate():NaN}},{key:"ttfbEstimate",get:function(){var e=this.abrController.bwEstimator
return e?e.getEstimateTTFB():NaN}},{key:"maxHdcpLevel",get:function(){return this._maxHdcpLevel},set:function(e){Dt.indexOf(e)>-1&&(this._maxHdcpLevel=e)}},{key:"autoLevelEnabled",get:function(){return-1===this.levelController.manualLevel}},{key:"manualLevel",get:function(){return this.levelController.manualLevel}},{key:"minAutoLevel",get:function(){var e=this.levels,t=this.config.minAutoBitrate
if(!e)return 0
for(var r=e.length,n=0;n<r;n++)if(e[n].maxBitrate>=t)return n
return 0}},{key:"maxAutoLevel",get:function(){var e,t=this.levels,r=this.autoLevelCapping,n=this.maxHdcpLevel
if(e=-1===r&&t&&t.length?t.length-1:r,n)for(var i=e;i--;){var a=t[i].attrs["HDCP-LEVEL"]
if(a&&a<=n)return i}return e}},{key:"nextAutoLevel",get:function(){return Math.min(Math.max(this.abrController.nextAutoLevel,this.minAutoLevel),this.maxAutoLevel)},set:function(e){this.abrController.nextAutoLevel=Math.max(this.minAutoLevel,e)}},{key:"playingDate",get:function(){return this.streamController.currentProgramDateTime}},{key:"mainForwardBufferInfo",get:function(){return this.streamController.getMainFwdBufferInfo()}},{key:"audioTracks",get:function(){var e=this.audioTrackController
return e?e.audioTracks:[]}},{key:"audioTrack",get:function(){var e=this.audioTrackController
return e?e.audioTrack:-1},set:function(e){var t=this.audioTrackController
t&&(t.audioTrack=e)}},{key:"subtitleTracks",get:function(){var e=this.subtitleTrackController
return e?e.subtitleTracks:[]}},{key:"subtitleTrack",get:function(){var e=this.subtitleTrackController
return e?e.subtitleTrack:-1},set:function(e){var t=this.subtitleTrackController
t&&(t.subtitleTrack=e)}},{key:"media",get:function(){return this._media}},{key:"subtitleDisplay",get:function(){var e=this.subtitleTrackController
return!!e&&e.subtitleDisplay},set:function(e){var t=this.subtitleTrackController
t&&(t.subtitleDisplay=e)}},{key:"lowLatencyMode",get:function(){return this.config.lowLatencyMode},set:function(e){this.config.lowLatencyMode=e}},{key:"liveSyncPosition",get:function(){return this.latencyController.liveSyncPosition}},{key:"latency",get:function(){return this.latencyController.latency}},{key:"maxLatency",get:function(){return this.latencyController.maxLatency}},{key:"targetLatency",get:function(){return this.latencyController.targetLatency}},{key:"drift",get:function(){return this.latencyController.drift}},{key:"forceStartLoad",get:function(){return this.streamController.forceStartLoad}}],[{key:"version",get:function(){return"1.4.3"}},{key:"Events",get:function(){return b}},{key:"ErrorTypes",get:function(){return E}},{key:"ErrorDetails",get:function(){return w}},{key:"DefaultConfig",get:function(){return e.defaultConfig?e.defaultConfig:wa},set:function(t){e.defaultConfig=t}}]),e}()
return Ta.defaultConfig=void 0,Ta}()}(!1)},7765:(e,t)=>{var r
!function(){"use strict"
var n=function(){this.init()}
n.prototype={init:function(){var e=this||i
return e._counter=1e3,e._html5AudioPool=[],e.html5PoolSize=10,e._codecs={},e._howls=[],e._muted=!1,e._volume=1,e._canPlayEvent="canplaythrough",e._navigator="undefined"!=typeof window&&window.navigator?window.navigator:null,e.masterGain=null,e.noAudio=!1,e.usingWebAudio=!0,e.autoSuspend=!0,e.ctx=null,e.autoUnlock=!0,e._setup(),e},volume:function(e){var t=this||i
if(e=parseFloat(e),t.ctx||h(),void 0!==e&&e>=0&&e<=1){if(t._volume=e,t._muted)return t
t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e,i.ctx.currentTime)
for(var r=0;r<t._howls.length;r++)if(!t._howls[r]._webAudio)for(var n=t._howls[r]._getSoundIds(),a=0;a<n.length;a++){var o=t._howls[r]._soundById(n[a])
o&&o._node&&(o._node.volume=o._volume*e)}return t}return t._volume},mute:function(e){var t=this||i
t.ctx||h(),t._muted=e,t.usingWebAudio&&t.masterGain.gain.setValueAtTime(e?0:t._volume,i.ctx.currentTime)
for(var r=0;r<t._howls.length;r++)if(!t._howls[r]._webAudio)for(var n=t._howls[r]._getSoundIds(),a=0;a<n.length;a++){var o=t._howls[r]._soundById(n[a])
o&&o._node&&(o._node.muted=!!e||o._muted)}return t},stop:function(){for(var e=this||i,t=0;t<e._howls.length;t++)e._howls[t].stop()
return e},unload:function(){for(var e=this||i,t=e._howls.length-1;t>=0;t--)e._howls[t].unload()
return e.usingWebAudio&&e.ctx&&void 0!==e.ctx.close&&(e.ctx.close(),e.ctx=null,h()),e},codecs:function(e){return(this||i)._codecs[e.replace(/^x-/,"")]},_setup:function(){var e=this||i
if(e.state=e.ctx&&e.ctx.state||"suspended",e._autoSuspend(),!e.usingWebAudio)if("undefined"!=typeof Audio)try{void 0===(new Audio).oncanplaythrough&&(e._canPlayEvent="canplay")}catch(t){e.noAudio=!0}else e.noAudio=!0
try{(new Audio).muted&&(e.noAudio=!0)}catch(e){}return e.noAudio||e._setupCodecs(),e},_setupCodecs:function(){var e=this||i,t=null
try{t="undefined"!=typeof Audio?new Audio:null}catch(t){return e}if(!t||"function"!=typeof t.canPlayType)return e
var r=t.canPlayType("audio/mpeg;").replace(/^no$/,""),n=e._navigator?e._navigator.userAgent:"",a=n.match(/OPR\/([0-6].)/g),o=a&&parseInt(a[0].split("/")[1],10)<33,s=-1!==n.indexOf("Safari")&&-1===n.indexOf("Chrome"),u=n.match(/Version\/(.*?) /),l=s&&u&&parseInt(u[1],10)<15
return e._codecs={mp3:!(o||!r&&!t.canPlayType("audio/mp3;").replace(/^no$/,"")),mpeg:!!r,opus:!!t.canPlayType('audio/ogg; codecs="opus"').replace(/^no$/,""),ogg:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),oga:!!t.canPlayType('audio/ogg; codecs="vorbis"').replace(/^no$/,""),wav:!!(t.canPlayType('audio/wav; codecs="1"')||t.canPlayType("audio/wav")).replace(/^no$/,""),aac:!!t.canPlayType("audio/aac;").replace(/^no$/,""),caf:!!t.canPlayType("audio/x-caf;").replace(/^no$/,""),m4a:!!(t.canPlayType("audio/x-m4a;")||t.canPlayType("audio/m4a;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),m4b:!!(t.canPlayType("audio/x-m4b;")||t.canPlayType("audio/m4b;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),mp4:!!(t.canPlayType("audio/x-mp4;")||t.canPlayType("audio/mp4;")||t.canPlayType("audio/aac;")).replace(/^no$/,""),weba:!(l||!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),webm:!(l||!t.canPlayType('audio/webm; codecs="vorbis"').replace(/^no$/,"")),dolby:!!t.canPlayType('audio/mp4; codecs="ec-3"').replace(/^no$/,""),flac:!!(t.canPlayType("audio/x-flac;")||t.canPlayType("audio/flac;")).replace(/^no$/,"")},e},_unlockAudio:function(){var e=this||i
if(!e._audioUnlocked&&e.ctx){e._audioUnlocked=!1,e.autoUnlock=!1,e._mobileUnloaded||44100===e.ctx.sampleRate||(e._mobileUnloaded=!0,e.unload()),e._scratchBuffer=e.ctx.createBuffer(1,1,22050)
var t=function(r){for(;e._html5AudioPool.length<e.html5PoolSize;)try{var n=new Audio
n._unlocked=!0,e._releaseHtml5Audio(n)}catch(r){e.noAudio=!0
break}for(var i=0;i<e._howls.length;i++)if(!e._howls[i]._webAudio)for(var a=e._howls[i]._getSoundIds(),o=0;o<a.length;o++){var s=e._howls[i]._soundById(a[o])
s&&s._node&&!s._node._unlocked&&(s._node._unlocked=!0,s._node.load())}e._autoResume()
var u=e.ctx.createBufferSource()
u.buffer=e._scratchBuffer,u.connect(e.ctx.destination),void 0===u.start?u.noteOn(0):u.start(0),"function"==typeof e.ctx.resume&&e.ctx.resume(),u.onended=function(){u.disconnect(0),e._audioUnlocked=!0,document.removeEventListener("touchstart",t,!0),document.removeEventListener("touchend",t,!0),document.removeEventListener("click",t,!0),document.removeEventListener("keydown",t,!0)
for(var r=0;r<e._howls.length;r++)e._howls[r]._emit("unlock")}}
return document.addEventListener("touchstart",t,!0),document.addEventListener("touchend",t,!0),document.addEventListener("click",t,!0),document.addEventListener("keydown",t,!0),e}},_obtainHtml5Audio:function(){var e=this||i
if(e._html5AudioPool.length)return e._html5AudioPool.pop()
var t=(new Audio).play()
return t&&"undefined"!=typeof Promise&&(t instanceof Promise||"function"==typeof t.then)&&t.catch((function(){console.warn("HTML5 Audio pool exhausted, returning potentially locked audio object.")})),new Audio},_releaseHtml5Audio:function(e){var t=this||i
return e._unlocked&&t._html5AudioPool.push(e),t},_autoSuspend:function(){var e=this
if(e.autoSuspend&&e.ctx&&void 0!==e.ctx.suspend&&i.usingWebAudio){for(var t=0;t<e._howls.length;t++)if(e._howls[t]._webAudio)for(var r=0;r<e._howls[t]._sounds.length;r++)if(!e._howls[t]._sounds[r]._paused)return e
return e._suspendTimer&&clearTimeout(e._suspendTimer),e._suspendTimer=setTimeout((function(){if(e.autoSuspend){e._suspendTimer=null,e.state="suspending"
var t=function(){e.state="suspended",e._resumeAfterSuspend&&(delete e._resumeAfterSuspend,e._autoResume())}
e.ctx.suspend().then(t,t)}}),3e4),e}},_autoResume:function(){var e=this
if(e.ctx&&void 0!==e.ctx.resume&&i.usingWebAudio)return"running"===e.state&&"interrupted"!==e.ctx.state&&e._suspendTimer?(clearTimeout(e._suspendTimer),e._suspendTimer=null):"suspended"===e.state||"running"===e.state&&"interrupted"===e.ctx.state?(e.ctx.resume().then((function(){e.state="running"
for(var t=0;t<e._howls.length;t++)e._howls[t]._emit("resume")})),e._suspendTimer&&(clearTimeout(e._suspendTimer),e._suspendTimer=null)):"suspending"===e.state&&(e._resumeAfterSuspend=!0),e}}
var i=new n,a=function(e){e.src&&0!==e.src.length?this.init(e):console.error("An array of source files must be passed with any new Howl.")}
a.prototype={init:function(e){var t=this
return i.ctx||h(),t._autoplay=e.autoplay||!1,t._format="string"!=typeof e.format?e.format:[e.format],t._html5=e.html5||!1,t._muted=e.mute||!1,t._loop=e.loop||!1,t._pool=e.pool||5,t._preload="boolean"!=typeof e.preload&&"metadata"!==e.preload||e.preload,t._rate=e.rate||1,t._sprite=e.sprite||{},t._src="string"!=typeof e.src?e.src:[e.src],t._volume=void 0!==e.volume?e.volume:1,t._xhr={method:e.xhr&&e.xhr.method?e.xhr.method:"GET",headers:e.xhr&&e.xhr.headers?e.xhr.headers:null,withCredentials:!(!e.xhr||!e.xhr.withCredentials)&&e.xhr.withCredentials},t._duration=0,t._state="unloaded",t._sounds=[],t._endTimers={},t._queue=[],t._playLock=!1,t._onend=e.onend?[{fn:e.onend}]:[],t._onfade=e.onfade?[{fn:e.onfade}]:[],t._onload=e.onload?[{fn:e.onload}]:[],t._onloaderror=e.onloaderror?[{fn:e.onloaderror}]:[],t._onplayerror=e.onplayerror?[{fn:e.onplayerror}]:[],t._onpause=e.onpause?[{fn:e.onpause}]:[],t._onplay=e.onplay?[{fn:e.onplay}]:[],t._onstop=e.onstop?[{fn:e.onstop}]:[],t._onmute=e.onmute?[{fn:e.onmute}]:[],t._onvolume=e.onvolume?[{fn:e.onvolume}]:[],t._onrate=e.onrate?[{fn:e.onrate}]:[],t._onseek=e.onseek?[{fn:e.onseek}]:[],t._onunlock=e.onunlock?[{fn:e.onunlock}]:[],t._onresume=[],t._webAudio=i.usingWebAudio&&!t._html5,void 0!==i.ctx&&i.ctx&&i.autoUnlock&&i._unlockAudio(),i._howls.push(t),t._autoplay&&t._queue.push({event:"play",action:function(){t.play()}}),t._preload&&"none"!==t._preload&&t.load(),t},load:function(){var e=this,t=null
if(i.noAudio)e._emit("loaderror",null,"No audio support.")
else{"string"==typeof e._src&&(e._src=[e._src])
for(var r=0;r<e._src.length;r++){var n,a
if(e._format&&e._format[r])n=e._format[r]
else{if("string"!=typeof(a=e._src[r])){e._emit("loaderror",null,"Non-string found in selected audio sources - ignoring.")
continue}(n=/^data:audio\/([^;,]+);/i.exec(a))||(n=/\.([^.]+)$/.exec(a.split("?",1)[0])),n&&(n=n[1].toLowerCase())}if(n||console.warn('No file extension was found. Consider using the "format" property or specify an extension.'),n&&i.codecs(n)){t=e._src[r]
break}}if(t)return e._src=t,e._state="loading","https:"===window.location.protocol&&"http:"===t.slice(0,5)&&(e._html5=!0,e._webAudio=!1),new o(e),e._webAudio&&u(e),e
e._emit("loaderror",null,"No codec support for selected audio sources.")}},play:function(e,t){var r=this,n=null
if("number"==typeof e)n=e,e=null
else{if("string"==typeof e&&"loaded"===r._state&&!r._sprite[e])return null
if(void 0===e&&(e="__default",!r._playLock)){for(var a=0,o=0;o<r._sounds.length;o++)r._sounds[o]._paused&&!r._sounds[o]._ended&&(a++,n=r._sounds[o]._id)
1===a?e=null:n=null}}var s=n?r._soundById(n):r._inactiveSound()
if(!s)return null
if(n&&!e&&(e=s._sprite||"__default"),"loaded"!==r._state){s._sprite=e,s._ended=!1
var u=s._id
return r._queue.push({event:"play",action:function(){r.play(u)}}),u}if(n&&!s._paused)return t||r._loadQueue("play"),s._id
r._webAudio&&i._autoResume()
var l=Math.max(0,s._seek>0?s._seek:r._sprite[e][0]/1e3),c=Math.max(0,(r._sprite[e][0]+r._sprite[e][1])/1e3-l),d=1e3*c/Math.abs(s._rate),h=r._sprite[e][0]/1e3,f=(r._sprite[e][0]+r._sprite[e][1])/1e3
s._sprite=e,s._ended=!1
var p=function(){s._paused=!1,s._seek=l,s._start=h,s._stop=f,s._loop=!(!s._loop&&!r._sprite[e][2])}
if(!(l>=f)){var g=s._node
if(r._webAudio){var m=function(){r._playLock=!1,p(),r._refreshBuffer(s)
var e=s._muted||r._muted?0:s._volume
g.gain.setValueAtTime(e,i.ctx.currentTime),s._playStart=i.ctx.currentTime,void 0===g.bufferSource.start?s._loop?g.bufferSource.noteGrainOn(0,l,86400):g.bufferSource.noteGrainOn(0,l,c):s._loop?g.bufferSource.start(0,l,86400):g.bufferSource.start(0,l,c),d!==1/0&&(r._endTimers[s._id]=setTimeout(r._ended.bind(r,s),d)),t||setTimeout((function(){r._emit("play",s._id),r._loadQueue()}),0)}
"running"===i.state&&"interrupted"!==i.ctx.state?m():(r._playLock=!0,r.once("resume",m),r._clearTimer(s._id))}else{var v=function(){g.currentTime=l,g.muted=s._muted||r._muted||i._muted||g.muted,g.volume=s._volume*i.volume(),g.playbackRate=s._rate
try{var n=g.play()
if(n&&"undefined"!=typeof Promise&&(n instanceof Promise||"function"==typeof n.then)?(r._playLock=!0,p(),n.then((function(){r._playLock=!1,g._unlocked=!0,t?r._loadQueue():r._emit("play",s._id)})).catch((function(){r._playLock=!1,r._emit("playerror",s._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction."),s._ended=!0,s._paused=!0}))):t||(r._playLock=!1,p(),r._emit("play",s._id)),g.playbackRate=s._rate,g.paused)return void r._emit("playerror",s._id,"Playback was unable to start. This is most commonly an issue on mobile devices and Chrome where playback was not within a user interaction.")
"__default"!==e||s._loop?r._endTimers[s._id]=setTimeout(r._ended.bind(r,s),d):(r._endTimers[s._id]=function(){r._ended(s),g.removeEventListener("ended",r._endTimers[s._id],!1)},g.addEventListener("ended",r._endTimers[s._id],!1))}catch(e){r._emit("playerror",s._id,e)}}
"data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA"===g.src&&(g.src=r._src,g.load())
var y=window&&window.ejecta||!g.readyState&&i._navigator.isCocoonJS
if(g.readyState>=3||y)v()
else{r._playLock=!0,r._state="loading"
var b=function(){r._state="loaded",v(),g.removeEventListener(i._canPlayEvent,b,!1)}
g.addEventListener(i._canPlayEvent,b,!1),r._clearTimer(s._id)}}return s._id}r._ended(s)},pause:function(e){var t=this
if("loaded"!==t._state||t._playLock)return t._queue.push({event:"pause",action:function(){t.pause(e)}}),t
for(var r=t._getSoundIds(e),n=0;n<r.length;n++){t._clearTimer(r[n])
var i=t._soundById(r[n])
if(i&&!i._paused&&(i._seek=t.seek(r[n]),i._rateSeek=0,i._paused=!0,t._stopFade(r[n]),i._node))if(t._webAudio){if(!i._node.bufferSource)continue
void 0===i._node.bufferSource.stop?i._node.bufferSource.noteOff(0):i._node.bufferSource.stop(0),t._cleanBuffer(i._node)}else isNaN(i._node.duration)&&i._node.duration!==1/0||i._node.pause()
arguments[1]||t._emit("pause",i?i._id:null)}return t},stop:function(e,t){var r=this
if("loaded"!==r._state||r._playLock)return r._queue.push({event:"stop",action:function(){r.stop(e)}}),r
for(var n=r._getSoundIds(e),i=0;i<n.length;i++){r._clearTimer(n[i])
var a=r._soundById(n[i])
a&&(a._seek=a._start||0,a._rateSeek=0,a._paused=!0,a._ended=!0,r._stopFade(n[i]),a._node&&(r._webAudio?a._node.bufferSource&&(void 0===a._node.bufferSource.stop?a._node.bufferSource.noteOff(0):a._node.bufferSource.stop(0),r._cleanBuffer(a._node)):isNaN(a._node.duration)&&a._node.duration!==1/0||(a._node.currentTime=a._start||0,a._node.pause(),a._node.duration===1/0&&r._clearSound(a._node))),t||r._emit("stop",a._id))}return r},mute:function(e,t){var r=this
if("loaded"!==r._state||r._playLock)return r._queue.push({event:"mute",action:function(){r.mute(e,t)}}),r
if(void 0===t){if("boolean"!=typeof e)return r._muted
r._muted=e}for(var n=r._getSoundIds(t),a=0;a<n.length;a++){var o=r._soundById(n[a])
o&&(o._muted=e,o._interval&&r._stopFade(o._id),r._webAudio&&o._node?o._node.gain.setValueAtTime(e?0:o._volume,i.ctx.currentTime):o._node&&(o._node.muted=!!i._muted||e),r._emit("mute",o._id))}return r},volume:function(){var e,t,r,n=this,a=arguments
if(0===a.length)return n._volume
if(1===a.length||2===a.length&&void 0===a[1]?n._getSoundIds().indexOf(a[0])>=0?t=parseInt(a[0],10):e=parseFloat(a[0]):a.length>=2&&(e=parseFloat(a[0]),t=parseInt(a[1],10)),!(void 0!==e&&e>=0&&e<=1))return(r=t?n._soundById(t):n._sounds[0])?r._volume:0
if("loaded"!==n._state||n._playLock)return n._queue.push({event:"volume",action:function(){n.volume.apply(n,a)}}),n
void 0===t&&(n._volume=e),t=n._getSoundIds(t)
for(var o=0;o<t.length;o++)(r=n._soundById(t[o]))&&(r._volume=e,a[2]||n._stopFade(t[o]),n._webAudio&&r._node&&!r._muted?r._node.gain.setValueAtTime(e,i.ctx.currentTime):r._node&&!r._muted&&(r._node.volume=e*i.volume()),n._emit("volume",r._id))
return n},fade:function(e,t,r,n){var a=this
if("loaded"!==a._state||a._playLock)return a._queue.push({event:"fade",action:function(){a.fade(e,t,r,n)}}),a
e=Math.min(Math.max(0,parseFloat(e)),1),t=Math.min(Math.max(0,parseFloat(t)),1),r=parseFloat(r),a.volume(e,n)
for(var o=a._getSoundIds(n),s=0;s<o.length;s++){var u=a._soundById(o[s])
if(u){if(n||a._stopFade(o[s]),a._webAudio&&!u._muted){var l=i.ctx.currentTime,c=l+r/1e3
u._volume=e,u._node.gain.setValueAtTime(e,l),u._node.gain.linearRampToValueAtTime(t,c)}a._startFadeInterval(u,e,t,r,o[s],void 0===n)}}return a},_startFadeInterval:function(e,t,r,n,i,a){var o=this,s=t,u=r-t,l=Math.abs(u/.01),c=Math.max(4,l>0?n/l:n),d=Date.now()
e._fadeTo=r,e._interval=setInterval((function(){var i=(Date.now()-d)/n
d=Date.now(),s+=u*i,s=Math.round(100*s)/100,s=u<0?Math.max(r,s):Math.min(r,s),o._webAudio?e._volume=s:o.volume(s,e._id,!0),a&&(o._volume=s),(r<t&&s<=r||r>t&&s>=r)&&(clearInterval(e._interval),e._interval=null,e._fadeTo=null,o.volume(r,e._id),o._emit("fade",e._id))}),c)},_stopFade:function(e){var t=this,r=t._soundById(e)
return r&&r._interval&&(t._webAudio&&r._node.gain.cancelScheduledValues(i.ctx.currentTime),clearInterval(r._interval),r._interval=null,t.volume(r._fadeTo,e),r._fadeTo=null,t._emit("fade",e)),t},loop:function(){var e,t,r,n=this,i=arguments
if(0===i.length)return n._loop
if(1===i.length){if("boolean"!=typeof i[0])return!!(r=n._soundById(parseInt(i[0],10)))&&r._loop
e=i[0],n._loop=e}else 2===i.length&&(e=i[0],t=parseInt(i[1],10))
for(var a=n._getSoundIds(t),o=0;o<a.length;o++)(r=n._soundById(a[o]))&&(r._loop=e,n._webAudio&&r._node&&r._node.bufferSource&&(r._node.bufferSource.loop=e,e&&(r._node.bufferSource.loopStart=r._start||0,r._node.bufferSource.loopEnd=r._stop,n.playing(a[o])&&(n.pause(a[o],!0),n.play(a[o],!0)))))
return n},rate:function(){var e,t,r,n=this,a=arguments
if(0===a.length?t=n._sounds[0]._id:1===a.length?n._getSoundIds().indexOf(a[0])>=0?t=parseInt(a[0],10):e=parseFloat(a[0]):2===a.length&&(e=parseFloat(a[0]),t=parseInt(a[1],10)),"number"!=typeof e)return(r=n._soundById(t))?r._rate:n._rate
if("loaded"!==n._state||n._playLock)return n._queue.push({event:"rate",action:function(){n.rate.apply(n,a)}}),n
void 0===t&&(n._rate=e),t=n._getSoundIds(t)
for(var o=0;o<t.length;o++)if(r=n._soundById(t[o])){n.playing(t[o])&&(r._rateSeek=n.seek(t[o]),r._playStart=n._webAudio?i.ctx.currentTime:r._playStart),r._rate=e,n._webAudio&&r._node&&r._node.bufferSource?r._node.bufferSource.playbackRate.setValueAtTime(e,i.ctx.currentTime):r._node&&(r._node.playbackRate=e)
var s=n.seek(t[o]),u=1e3*((n._sprite[r._sprite][0]+n._sprite[r._sprite][1])/1e3-s)/Math.abs(r._rate)
!n._endTimers[t[o]]&&r._paused||(n._clearTimer(t[o]),n._endTimers[t[o]]=setTimeout(n._ended.bind(n,r),u)),n._emit("rate",r._id)}return n},seek:function(){var e,t,r=this,n=arguments
if(0===n.length?r._sounds.length&&(t=r._sounds[0]._id):1===n.length?r._getSoundIds().indexOf(n[0])>=0?t=parseInt(n[0],10):r._sounds.length&&(t=r._sounds[0]._id,e=parseFloat(n[0])):2===n.length&&(e=parseFloat(n[0]),t=parseInt(n[1],10)),void 0===t)return 0
if("number"==typeof e&&("loaded"!==r._state||r._playLock))return r._queue.push({event:"seek",action:function(){r.seek.apply(r,n)}}),r
var a=r._soundById(t)
if(a){if(!("number"==typeof e&&e>=0)){if(r._webAudio){var o=r.playing(t)?i.ctx.currentTime-a._playStart:0,s=a._rateSeek?a._rateSeek-a._seek:0
return a._seek+(s+o*Math.abs(a._rate))}return a._node.currentTime}var u=r.playing(t)
u&&r.pause(t,!0),a._seek=e,a._ended=!1,r._clearTimer(t),r._webAudio||!a._node||isNaN(a._node.duration)||(a._node.currentTime=e)
var l=function(){u&&r.play(t,!0),r._emit("seek",t)}
if(u&&!r._webAudio){var c=function(){r._playLock?setTimeout(c,0):l()}
setTimeout(c,0)}else l()}return r},playing:function(e){var t=this
if("number"==typeof e){var r=t._soundById(e)
return!!r&&!r._paused}for(var n=0;n<t._sounds.length;n++)if(!t._sounds[n]._paused)return!0
return!1},duration:function(e){var t=this,r=t._duration,n=t._soundById(e)
return n&&(r=t._sprite[n._sprite][1]/1e3),r},state:function(){return this._state},unload:function(){for(var e=this,t=e._sounds,r=0;r<t.length;r++)t[r]._paused||e.stop(t[r]._id),e._webAudio||(e._clearSound(t[r]._node),t[r]._node.removeEventListener("error",t[r]._errorFn,!1),t[r]._node.removeEventListener(i._canPlayEvent,t[r]._loadFn,!1),t[r]._node.removeEventListener("ended",t[r]._endFn,!1),i._releaseHtml5Audio(t[r]._node)),delete t[r]._node,e._clearTimer(t[r]._id)
var n=i._howls.indexOf(e)
n>=0&&i._howls.splice(n,1)
var a=!0
for(r=0;r<i._howls.length;r++)if(i._howls[r]._src===e._src||e._src.indexOf(i._howls[r]._src)>=0){a=!1
break}return s&&a&&delete s[e._src],i.noAudio=!1,e._state="unloaded",e._sounds=[],e=null,null},on:function(e,t,r,n){var i=this["_on"+e]
return"function"==typeof t&&i.push(n?{id:r,fn:t,once:n}:{id:r,fn:t}),this},off:function(e,t,r){var n=this,i=n["_on"+e],a=0
if("number"==typeof t&&(r=t,t=null),t||r)for(a=0;a<i.length;a++){var o=r===i[a].id
if(t===i[a].fn&&o||!t&&o){i.splice(a,1)
break}}else if(e)n["_on"+e]=[]
else{var s=Object.keys(n)
for(a=0;a<s.length;a++)0===s[a].indexOf("_on")&&Array.isArray(n[s[a]])&&(n[s[a]]=[])}return n},once:function(e,t,r){return this.on(e,t,r,1),this},_emit:function(e,t,r){for(var n=this,i=n["_on"+e],a=i.length-1;a>=0;a--)i[a].id&&i[a].id!==t&&"load"!==e||(setTimeout(function(e){e.call(this,t,r)}.bind(n,i[a].fn),0),i[a].once&&n.off(e,i[a].fn,i[a].id))
return n._loadQueue(e),n},_loadQueue:function(e){var t=this
if(t._queue.length>0){var r=t._queue[0]
r.event===e&&(t._queue.shift(),t._loadQueue()),e||r.action()}return t},_ended:function(e){var t=this,r=e._sprite
if(!t._webAudio&&e._node&&!e._node.paused&&!e._node.ended&&e._node.currentTime<e._stop)return setTimeout(t._ended.bind(t,e),100),t
var n=!(!e._loop&&!t._sprite[r][2])
if(t._emit("end",e._id),!t._webAudio&&n&&t.stop(e._id,!0).play(e._id),t._webAudio&&n){t._emit("play",e._id),e._seek=e._start||0,e._rateSeek=0,e._playStart=i.ctx.currentTime
var a=1e3*(e._stop-e._start)/Math.abs(e._rate)
t._endTimers[e._id]=setTimeout(t._ended.bind(t,e),a)}return t._webAudio&&!n&&(e._paused=!0,e._ended=!0,e._seek=e._start||0,e._rateSeek=0,t._clearTimer(e._id),t._cleanBuffer(e._node),i._autoSuspend()),t._webAudio||n||t.stop(e._id,!0),t},_clearTimer:function(e){var t=this
if(t._endTimers[e]){if("function"!=typeof t._endTimers[e])clearTimeout(t._endTimers[e])
else{var r=t._soundById(e)
r&&r._node&&r._node.removeEventListener("ended",t._endTimers[e],!1)}delete t._endTimers[e]}return t},_soundById:function(e){for(var t=this,r=0;r<t._sounds.length;r++)if(e===t._sounds[r]._id)return t._sounds[r]
return null},_inactiveSound:function(){var e=this
e._drain()
for(var t=0;t<e._sounds.length;t++)if(e._sounds[t]._ended)return e._sounds[t].reset()
return new o(e)},_drain:function(){var e=this,t=e._pool,r=0,n=0
if(!(e._sounds.length<t)){for(n=0;n<e._sounds.length;n++)e._sounds[n]._ended&&r++
for(n=e._sounds.length-1;n>=0;n--){if(r<=t)return
e._sounds[n]._ended&&(e._webAudio&&e._sounds[n]._node&&e._sounds[n]._node.disconnect(0),e._sounds.splice(n,1),r--)}}},_getSoundIds:function(e){if(void 0===e){for(var t=[],r=0;r<this._sounds.length;r++)t.push(this._sounds[r]._id)
return t}return[e]},_refreshBuffer:function(e){return e._node.bufferSource=i.ctx.createBufferSource(),e._node.bufferSource.buffer=s[this._src],e._panner?e._node.bufferSource.connect(e._panner):e._node.bufferSource.connect(e._node),e._node.bufferSource.loop=e._loop,e._loop&&(e._node.bufferSource.loopStart=e._start||0,e._node.bufferSource.loopEnd=e._stop||0),e._node.bufferSource.playbackRate.setValueAtTime(e._rate,i.ctx.currentTime),this},_cleanBuffer:function(e){var t=i._navigator&&i._navigator.vendor.indexOf("Apple")>=0
if(i._scratchBuffer&&e.bufferSource&&(e.bufferSource.onended=null,e.bufferSource.disconnect(0),t))try{e.bufferSource.buffer=i._scratchBuffer}catch(e){}return e.bufferSource=null,this},_clearSound:function(e){/MSIE |Trident\//.test(i._navigator&&i._navigator.userAgent)||(e.src="data:audio/wav;base64,UklGRigAAABXQVZFZm10IBIAAAABAAEARKwAAIhYAQACABAAAABkYXRhAgAAAAEA")}}
var o=function(e){this._parent=e,this.init()}
o.prototype={init:function(){var e=this,t=e._parent
return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++i._counter,t._sounds.push(e),e.create(),e},create:function(){var e=this,t=e._parent,r=i._muted||e._muted||e._parent._muted?0:e._volume
return t._webAudio?(e._node=void 0===i.ctx.createGain?i.ctx.createGainNode():i.ctx.createGain(),e._node.gain.setValueAtTime(r,i.ctx.currentTime),e._node.paused=!0,e._node.connect(i.masterGain)):i.noAudio||(e._node=i._obtainHtml5Audio(),e._errorFn=e._errorListener.bind(e),e._node.addEventListener("error",e._errorFn,!1),e._loadFn=e._loadListener.bind(e),e._node.addEventListener(i._canPlayEvent,e._loadFn,!1),e._endFn=e._endListener.bind(e),e._node.addEventListener("ended",e._endFn,!1),e._node.src=t._src,e._node.preload=!0===t._preload?"auto":t._preload,e._node.volume=r*i.volume(),e._node.load()),e},reset:function(){var e=this,t=e._parent
return e._muted=t._muted,e._loop=t._loop,e._volume=t._volume,e._rate=t._rate,e._seek=0,e._rateSeek=0,e._paused=!0,e._ended=!0,e._sprite="__default",e._id=++i._counter,e},_errorListener:function(){var e=this
e._parent._emit("loaderror",e._id,e._node.error?e._node.error.code:0),e._node.removeEventListener("error",e._errorFn,!1)},_loadListener:function(){var e=this,t=e._parent
t._duration=Math.ceil(10*e._node.duration)/10,0===Object.keys(t._sprite).length&&(t._sprite={__default:[0,1e3*t._duration]}),"loaded"!==t._state&&(t._state="loaded",t._emit("load"),t._loadQueue()),e._node.removeEventListener(i._canPlayEvent,e._loadFn,!1)},_endListener:function(){var e=this,t=e._parent
t._duration===1/0&&(t._duration=Math.ceil(10*e._node.duration)/10,t._sprite.__default[1]===1/0&&(t._sprite.__default[1]=1e3*t._duration),t._ended(e)),e._node.removeEventListener("ended",e._endFn,!1)}}
var s={},u=function(e){var t=e._src
if(s[t])return e._duration=s[t].duration,void d(e)
if(/^data:[^;]+;base64,/.test(t)){for(var r=atob(t.split(",")[1]),n=new Uint8Array(r.length),i=0;i<r.length;++i)n[i]=r.charCodeAt(i)
c(n.buffer,e)}else{var a=new XMLHttpRequest
a.open(e._xhr.method,t,!0),a.withCredentials=e._xhr.withCredentials,a.responseType="arraybuffer",e._xhr.headers&&Object.keys(e._xhr.headers).forEach((function(t){a.setRequestHeader(t,e._xhr.headers[t])})),a.onload=function(){var t=(a.status+"")[0]
"0"===t||"2"===t||"3"===t?c(a.response,e):e._emit("loaderror",null,"Failed loading audio file with status: "+a.status+".")},a.onerror=function(){e._webAudio&&(e._html5=!0,e._webAudio=!1,e._sounds=[],delete s[t],e.load())},l(a)}},l=function(e){try{e.send()}catch(t){e.onerror()}},c=function(e,t){var r=function(){t._emit("loaderror",null,"Decoding audio data failed.")},n=function(e){e&&t._sounds.length>0?(s[t._src]=e,d(t,e)):r()}
"undefined"!=typeof Promise&&1===i.ctx.decodeAudioData.length?i.ctx.decodeAudioData(e).then(n).catch(r):i.ctx.decodeAudioData(e,n,r)},d=function(e,t){t&&!e._duration&&(e._duration=t.duration),0===Object.keys(e._sprite).length&&(e._sprite={__default:[0,1e3*e._duration]}),"loaded"!==e._state&&(e._state="loaded",e._emit("load"),e._loadQueue())},h=function(){if(i.usingWebAudio){try{"undefined"!=typeof AudioContext?i.ctx=new AudioContext:"undefined"!=typeof webkitAudioContext?i.ctx=new webkitAudioContext:i.usingWebAudio=!1}catch(e){i.usingWebAudio=!1}i.ctx||(i.usingWebAudio=!1)
var e=/iP(hone|od|ad)/.test(i._navigator&&i._navigator.platform),t=i._navigator&&i._navigator.appVersion.match(/OS (\d+)_(\d+)_?(\d+)?/),r=t?parseInt(t[1],10):null
if(e&&r&&r<9){var n=/safari/.test(i._navigator&&i._navigator.userAgent.toLowerCase())
i._navigator&&!n&&(i.usingWebAudio=!1)}i.usingWebAudio&&(i.masterGain=void 0===i.ctx.createGain?i.ctx.createGainNode():i.ctx.createGain(),i.masterGain.gain.setValueAtTime(i._muted?0:i._volume,i.ctx.currentTime),i.masterGain.connect(i.ctx.destination)),i._setup()}}
void 0===(r=function(){return{Howler:i,Howl:a}}.apply(t,[]))||(e.exports=r),t.Howler=i,t.Howl=a,"undefined"!=typeof global?(global.HowlerGlobal=n,global.Howler=i,global.Howl=a,global.Sound=o):"undefined"!=typeof window&&(window.HowlerGlobal=n,window.Howler=i,window.Howl=a,window.Sound=o)}(),function(){"use strict"
var e
HowlerGlobal.prototype._pos=[0,0,0],HowlerGlobal.prototype._orientation=[0,0,-1,0,1,0],HowlerGlobal.prototype.stereo=function(e){var t=this
if(!t.ctx||!t.ctx.listener)return t
for(var r=t._howls.length-1;r>=0;r--)t._howls[r].stereo(e)
return t},HowlerGlobal.prototype.pos=function(e,t,r){var n=this
return n.ctx&&n.ctx.listener?(t="number"!=typeof t?n._pos[1]:t,r="number"!=typeof r?n._pos[2]:r,"number"!=typeof e?n._pos:(n._pos=[e,t,r],void 0!==n.ctx.listener.positionX?(n.ctx.listener.positionX.setTargetAtTime(n._pos[0],Howler.ctx.currentTime,.1),n.ctx.listener.positionY.setTargetAtTime(n._pos[1],Howler.ctx.currentTime,.1),n.ctx.listener.positionZ.setTargetAtTime(n._pos[2],Howler.ctx.currentTime,.1)):n.ctx.listener.setPosition(n._pos[0],n._pos[1],n._pos[2]),n)):n},HowlerGlobal.prototype.orientation=function(e,t,r,n,i,a){var o=this
if(!o.ctx||!o.ctx.listener)return o
var s=o._orientation
return t="number"!=typeof t?s[1]:t,r="number"!=typeof r?s[2]:r,n="number"!=typeof n?s[3]:n,i="number"!=typeof i?s[4]:i,a="number"!=typeof a?s[5]:a,"number"!=typeof e?s:(o._orientation=[e,t,r,n,i,a],void 0!==o.ctx.listener.forwardX?(o.ctx.listener.forwardX.setTargetAtTime(e,Howler.ctx.currentTime,.1),o.ctx.listener.forwardY.setTargetAtTime(t,Howler.ctx.currentTime,.1),o.ctx.listener.forwardZ.setTargetAtTime(r,Howler.ctx.currentTime,.1),o.ctx.listener.upX.setTargetAtTime(n,Howler.ctx.currentTime,.1),o.ctx.listener.upY.setTargetAtTime(i,Howler.ctx.currentTime,.1),o.ctx.listener.upZ.setTargetAtTime(a,Howler.ctx.currentTime,.1)):o.ctx.listener.setOrientation(e,t,r,n,i,a),o)},Howl.prototype.init=(e=Howl.prototype.init,function(t){var r=this
return r._orientation=t.orientation||[1,0,0],r._stereo=t.stereo||null,r._pos=t.pos||null,r._pannerAttr={coneInnerAngle:void 0!==t.coneInnerAngle?t.coneInnerAngle:360,coneOuterAngle:void 0!==t.coneOuterAngle?t.coneOuterAngle:360,coneOuterGain:void 0!==t.coneOuterGain?t.coneOuterGain:0,distanceModel:void 0!==t.distanceModel?t.distanceModel:"inverse",maxDistance:void 0!==t.maxDistance?t.maxDistance:1e4,panningModel:void 0!==t.panningModel?t.panningModel:"HRTF",refDistance:void 0!==t.refDistance?t.refDistance:1,rolloffFactor:void 0!==t.rolloffFactor?t.rolloffFactor:1},r._onstereo=t.onstereo?[{fn:t.onstereo}]:[],r._onpos=t.onpos?[{fn:t.onpos}]:[],r._onorientation=t.onorientation?[{fn:t.onorientation}]:[],e.call(this,t)}),Howl.prototype.stereo=function(e,r){var n=this
if(!n._webAudio)return n
if("loaded"!==n._state)return n._queue.push({event:"stereo",action:function(){n.stereo(e,r)}}),n
var i=void 0===Howler.ctx.createStereoPanner?"spatial":"stereo"
if(void 0===r){if("number"!=typeof e)return n._stereo
n._stereo=e,n._pos=[e,0,0]}for(var a=n._getSoundIds(r),o=0;o<a.length;o++){var s=n._soundById(a[o])
if(s){if("number"!=typeof e)return s._stereo
s._stereo=e,s._pos=[e,0,0],s._node&&(s._pannerAttr.panningModel="equalpower",s._panner&&s._panner.pan||t(s,i),"spatial"===i?void 0!==s._panner.positionX?(s._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),s._panner.positionY.setValueAtTime(0,Howler.ctx.currentTime),s._panner.positionZ.setValueAtTime(0,Howler.ctx.currentTime)):s._panner.setPosition(e,0,0):s._panner.pan.setValueAtTime(e,Howler.ctx.currentTime)),n._emit("stereo",s._id)}}return n},Howl.prototype.pos=function(e,r,n,i){var a=this
if(!a._webAudio)return a
if("loaded"!==a._state)return a._queue.push({event:"pos",action:function(){a.pos(e,r,n,i)}}),a
if(r="number"!=typeof r?0:r,n="number"!=typeof n?-.5:n,void 0===i){if("number"!=typeof e)return a._pos
a._pos=[e,r,n]}for(var o=a._getSoundIds(i),s=0;s<o.length;s++){var u=a._soundById(o[s])
if(u){if("number"!=typeof e)return u._pos
u._pos=[e,r,n],u._node&&(u._panner&&!u._panner.pan||t(u,"spatial"),void 0!==u._panner.positionX?(u._panner.positionX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.positionY.setValueAtTime(r,Howler.ctx.currentTime),u._panner.positionZ.setValueAtTime(n,Howler.ctx.currentTime)):u._panner.setPosition(e,r,n)),a._emit("pos",u._id)}}return a},Howl.prototype.orientation=function(e,r,n,i){var a=this
if(!a._webAudio)return a
if("loaded"!==a._state)return a._queue.push({event:"orientation",action:function(){a.orientation(e,r,n,i)}}),a
if(r="number"!=typeof r?a._orientation[1]:r,n="number"!=typeof n?a._orientation[2]:n,void 0===i){if("number"!=typeof e)return a._orientation
a._orientation=[e,r,n]}for(var o=a._getSoundIds(i),s=0;s<o.length;s++){var u=a._soundById(o[s])
if(u){if("number"!=typeof e)return u._orientation
u._orientation=[e,r,n],u._node&&(u._panner||(u._pos||(u._pos=a._pos||[0,0,-.5]),t(u,"spatial")),void 0!==u._panner.orientationX?(u._panner.orientationX.setValueAtTime(e,Howler.ctx.currentTime),u._panner.orientationY.setValueAtTime(r,Howler.ctx.currentTime),u._panner.orientationZ.setValueAtTime(n,Howler.ctx.currentTime)):u._panner.setOrientation(e,r,n)),a._emit("orientation",u._id)}}return a},Howl.prototype.pannerAttr=function(){var e,r,n,i=this,a=arguments
if(!i._webAudio)return i
if(0===a.length)return i._pannerAttr
if(1===a.length){if("object"!=typeof a[0])return(n=i._soundById(parseInt(a[0],10)))?n._pannerAttr:i._pannerAttr
e=a[0],void 0===r&&(e.pannerAttr||(e.pannerAttr={coneInnerAngle:e.coneInnerAngle,coneOuterAngle:e.coneOuterAngle,coneOuterGain:e.coneOuterGain,distanceModel:e.distanceModel,maxDistance:e.maxDistance,refDistance:e.refDistance,rolloffFactor:e.rolloffFactor,panningModel:e.panningModel}),i._pannerAttr={coneInnerAngle:void 0!==e.pannerAttr.coneInnerAngle?e.pannerAttr.coneInnerAngle:i._coneInnerAngle,coneOuterAngle:void 0!==e.pannerAttr.coneOuterAngle?e.pannerAttr.coneOuterAngle:i._coneOuterAngle,coneOuterGain:void 0!==e.pannerAttr.coneOuterGain?e.pannerAttr.coneOuterGain:i._coneOuterGain,distanceModel:void 0!==e.pannerAttr.distanceModel?e.pannerAttr.distanceModel:i._distanceModel,maxDistance:void 0!==e.pannerAttr.maxDistance?e.pannerAttr.maxDistance:i._maxDistance,refDistance:void 0!==e.pannerAttr.refDistance?e.pannerAttr.refDistance:i._refDistance,rolloffFactor:void 0!==e.pannerAttr.rolloffFactor?e.pannerAttr.rolloffFactor:i._rolloffFactor,panningModel:void 0!==e.pannerAttr.panningModel?e.pannerAttr.panningModel:i._panningModel})}else 2===a.length&&(e=a[0],r=parseInt(a[1],10))
for(var o=i._getSoundIds(r),s=0;s<o.length;s++)if(n=i._soundById(o[s])){var u=n._pannerAttr
u={coneInnerAngle:void 0!==e.coneInnerAngle?e.coneInnerAngle:u.coneInnerAngle,coneOuterAngle:void 0!==e.coneOuterAngle?e.coneOuterAngle:u.coneOuterAngle,coneOuterGain:void 0!==e.coneOuterGain?e.coneOuterGain:u.coneOuterGain,distanceModel:void 0!==e.distanceModel?e.distanceModel:u.distanceModel,maxDistance:void 0!==e.maxDistance?e.maxDistance:u.maxDistance,refDistance:void 0!==e.refDistance?e.refDistance:u.refDistance,rolloffFactor:void 0!==e.rolloffFactor?e.rolloffFactor:u.rolloffFactor,panningModel:void 0!==e.panningModel?e.panningModel:u.panningModel}
var l=n._panner
l?(l.coneInnerAngle=u.coneInnerAngle,l.coneOuterAngle=u.coneOuterAngle,l.coneOuterGain=u.coneOuterGain,l.distanceModel=u.distanceModel,l.maxDistance=u.maxDistance,l.refDistance=u.refDistance,l.rolloffFactor=u.rolloffFactor,l.panningModel=u.panningModel):(n._pos||(n._pos=i._pos||[0,0,-.5]),t(n,"spatial"))}return i},Sound.prototype.init=function(e){return function(){var t=this,r=t._parent
t._orientation=r._orientation,t._stereo=r._stereo,t._pos=r._pos,t._pannerAttr=r._pannerAttr,e.call(this),t._stereo?r.stereo(t._stereo):t._pos&&r.pos(t._pos[0],t._pos[1],t._pos[2],t._id)}}(Sound.prototype.init),Sound.prototype.reset=function(e){return function(){var t=this,r=t._parent
return t._orientation=r._orientation,t._stereo=r._stereo,t._pos=r._pos,t._pannerAttr=r._pannerAttr,t._stereo?r.stereo(t._stereo):t._pos?r.pos(t._pos[0],t._pos[1],t._pos[2],t._id):t._panner&&(t._panner.disconnect(0),t._panner=void 0,r._refreshBuffer(t)),e.call(this)}}(Sound.prototype.reset)
var t=function(e,t){"spatial"===(t=t||"spatial")?(e._panner=Howler.ctx.createPanner(),e._panner.coneInnerAngle=e._pannerAttr.coneInnerAngle,e._panner.coneOuterAngle=e._pannerAttr.coneOuterAngle,e._panner.coneOuterGain=e._pannerAttr.coneOuterGain,e._panner.distanceModel=e._pannerAttr.distanceModel,e._panner.maxDistance=e._pannerAttr.maxDistance,e._panner.refDistance=e._pannerAttr.refDistance,e._panner.rolloffFactor=e._pannerAttr.rolloffFactor,e._panner.panningModel=e._pannerAttr.panningModel,void 0!==e._panner.positionX?(e._panner.positionX.setValueAtTime(e._pos[0],Howler.ctx.currentTime),e._panner.positionY.setValueAtTime(e._pos[1],Howler.ctx.currentTime),e._panner.positionZ.setValueAtTime(e._pos[2],Howler.ctx.currentTime)):e._panner.setPosition(e._pos[0],e._pos[1],e._pos[2]),void 0!==e._panner.orientationX?(e._panner.orientationX.setValueAtTime(e._orientation[0],Howler.ctx.currentTime),e._panner.orientationY.setValueAtTime(e._orientation[1],Howler.ctx.currentTime),e._panner.orientationZ.setValueAtTime(e._orientation[2],Howler.ctx.currentTime)):e._panner.setOrientation(e._orientation[0],e._orientation[1],e._orientation[2])):(e._panner=Howler.ctx.createStereoPanner(),e._panner.pan.setValueAtTime(e._stereo,Howler.ctx.currentTime)),e._panner.connect(e._node),e._paused||e._parent.pause(e._id,!0).play(e._id,!0)}}()},9484:e=>{var t={}.toString
e.exports=Array.isArray||function(e){return"[object Array]"==t.call(e)}},6662:function(e){e.exports=function(){"use strict"
function e(e){return null===e?"null":typeof e}function t(e){return!!e&&"object"==typeof e}function r(e){if(void 0===e)return""
if(null===e)return"Object"
if("object"==typeof e&&!e.constructor)return"Object"
var t=/function ([^(]*)/.exec(e.constructor.toString())
return t&&t.length>1?t[1]:""}function n(e,t,r){return"null"===e||"undefined"===e?e:("string"!==e&&"stringifiable"!==e||(r='"'+r.replace(/"/g,'\\"')+'"'),"function"===e?t.toString().replace(/[\r\n]/g,"").replace(/\{.*\}/,"")+"{…}":r)}function i(i){var a=""
return t(i)?(a=r(i),Array.isArray(i)&&(a+="["+i.length+"]")):a=n(e(i),i,i),a}function a(e){return"json-formatter-"+e}function o(e,t,r){var n=document.createElement(e)
return t&&n.classList.add(a(t)),void 0!==r&&(r instanceof Node?n.appendChild(r):n.appendChild(document.createTextNode(String(r)))),n}!function(e){if(e&&"undefined"!=typeof window){var t=document.createElement("style")
t.setAttribute("media","screen"),t.innerHTML=e,document.head.appendChild(t)}}('.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-row,\n.json-formatter-row a,\n.json-formatter-row a:hover {\n  color: black;\n  text-decoration: none;\n}\n.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-row .json-formatter-string,\n.json-formatter-row .json-formatter-stringifiable {\n  color: green;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-row .json-formatter-number {\n  color: blue;\n}\n.json-formatter-row .json-formatter-boolean {\n  color: red;\n}\n.json-formatter-row .json-formatter-null {\n  color: #855A00;\n}\n.json-formatter-row .json-formatter-undefined {\n  color: #ca0b69;\n}\n.json-formatter-row .json-formatter-function {\n  color: #FF20ED;\n}\n.json-formatter-row .json-formatter-date {\n  background-color: rgba(0, 0, 0, 0.05);\n}\n.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: blue;\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-bracket {\n  color: blue;\n}\n.json-formatter-row .json-formatter-key {\n  color: #00008B;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "►";\n}\n.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n.json-formatter-dark.json-formatter-row {\n  font-family: monospace;\n}\n.json-formatter-dark.json-formatter-row,\n.json-formatter-dark.json-formatter-row a,\n.json-formatter-dark.json-formatter-row a:hover {\n  color: white;\n  text-decoration: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-row {\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty {\n  opacity: 0.5;\n  margin-left: 1rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty:after {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-object:after {\n  content: "No properties";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-children.json-formatter-empty.json-formatter-array:after {\n  content: "[]";\n}\n.json-formatter-dark.json-formatter-row .json-formatter-string,\n.json-formatter-dark.json-formatter-row .json-formatter-stringifiable {\n  color: #31F031;\n  white-space: pre;\n  word-wrap: break-word;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-number {\n  color: #66C2FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-boolean {\n  color: #EC4242;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-null {\n  color: #EEC97D;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-undefined {\n  color: #ef8fbe;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-function {\n  color: #FD48CB;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-date {\n  background-color: rgba(255, 255, 255, 0.05);\n}\n.json-formatter-dark.json-formatter-row .json-formatter-url {\n  text-decoration: underline;\n  color: #027BFF;\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-bracket {\n  color: #9494FF;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-key {\n  color: #23A0DB;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler-link {\n  cursor: pointer;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler {\n  line-height: 1.2rem;\n  font-size: 0.7rem;\n  vertical-align: middle;\n  opacity: 0.6;\n  cursor: pointer;\n  padding-right: 0.2rem;\n}\n.json-formatter-dark.json-formatter-row .json-formatter-toggler:after {\n  display: inline-block;\n  transition: transform 100ms ease-in;\n  content: "►";\n}\n.json-formatter-dark.json-formatter-row > a > .json-formatter-preview-text {\n  opacity: 0;\n  transition: opacity 0.15s ease-in;\n  font-style: italic;\n}\n.json-formatter-dark.json-formatter-row:hover > a > .json-formatter-preview-text {\n  opacity: 0.6;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-toggler-link .json-formatter-toggler:after {\n  transform: rotate(90deg);\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > .json-formatter-children:after {\n  display: inline-block;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open > a > .json-formatter-preview-text {\n  display: none;\n}\n.json-formatter-dark.json-formatter-row.json-formatter-open.json-formatter-empty:after {\n  display: block;\n}\n')
var s=/(^\d{1,4}[\.|\\/|-]\d{1,2}[\.|\\/|-]\d{1,4})(\s*(?:0?[1-9]:[0-5]|1(?=[012])\d:[0-5])\d\s*[ap]m)?$/,u=/\d{2}:\d{2}:\d{2} GMT-\d{4}/,l=/\d{4}-\d{2}-\d{2}T\d{2}:\d{2}:\d{2}.\d{3}Z/,c=window.requestAnimationFrame||function(e){return e(),0},d={hoverPreviewEnabled:!1,hoverPreviewArrayCount:100,hoverPreviewFieldCount:5,animateOpen:!0,animateClose:!0,theme:null,useToJSON:!0,sortPropertiesBy:null}
return function(){function h(e,t,r,n){void 0===t&&(t=1),void 0===r&&(r=d),this.json=e,this.open=t,this.config=r,this.key=n,this._isOpen=null,void 0===this.config.hoverPreviewEnabled&&(this.config.hoverPreviewEnabled=d.hoverPreviewEnabled),void 0===this.config.hoverPreviewArrayCount&&(this.config.hoverPreviewArrayCount=d.hoverPreviewArrayCount),void 0===this.config.hoverPreviewFieldCount&&(this.config.hoverPreviewFieldCount=d.hoverPreviewFieldCount),void 0===this.config.useToJSON&&(this.config.useToJSON=d.useToJSON),""===this.key&&(this.key='""')}return Object.defineProperty(h.prototype,"isOpen",{get:function(){return null!==this._isOpen?this._isOpen:this.open>0},set:function(e){this._isOpen=e},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"isDate",{get:function(){return this.json instanceof Date||"string"===this.type&&(s.test(this.json)||l.test(this.json)||u.test(this.json))},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"isUrl",{get:function(){return"string"===this.type&&0===this.json.indexOf("http")},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"isArray",{get:function(){return Array.isArray(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"isObject",{get:function(){return t(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"isEmptyObject",{get:function(){return!this.keys.length&&!this.isArray},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"isEmpty",{get:function(){return this.isEmptyObject||this.keys&&!this.keys.length&&this.isArray},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"useToJSON",{get:function(){return this.config.useToJSON&&"stringifiable"===this.type},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"hasKey",{get:function(){return void 0!==this.key},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"constructorName",{get:function(){return r(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"type",{get:function(){return this.config.useToJSON&&this.json&&this.json.toJSON?"stringifiable":e(this.json)},enumerable:!0,configurable:!0}),Object.defineProperty(h.prototype,"keys",{get:function(){if(this.isObject){var e=Object.keys(this.json)
return!this.isArray&&this.config.sortPropertiesBy?e.sort(this.config.sortPropertiesBy):e}return[]},enumerable:!0,configurable:!0}),h.prototype.toggleOpen=function(){this.isOpen=!this.isOpen,this.element&&(this.isOpen?this.appendChildren(this.config.animateOpen):this.removeChildren(this.config.animateClose),this.element.classList.toggle(a("open")))},h.prototype.openAtDepth=function(e){void 0===e&&(e=1),e<0||(this.open=e,this.isOpen=0!==e,this.element&&(this.removeChildren(!1),0===e?this.element.classList.remove(a("open")):(this.appendChildren(this.config.animateOpen),this.element.classList.add(a("open")))))},h.prototype.getInlinepreview=function(){var e=this
if(this.isArray)return this.json.length>this.config.hoverPreviewArrayCount?"Array["+this.json.length+"]":"["+this.json.map(i).join(", ")+"]"
var t=this.keys,r=t.slice(0,this.config.hoverPreviewFieldCount).map((function(t){return t+":"+i(e.json[t])})),n=t.length>=this.config.hoverPreviewFieldCount?"…":""
return"{"+r.join(", ")+n+"}"},h.prototype.render=function(){this.element=o("div","row")
var e=this.isObject?o("a","toggler-link"):o("span")
if(this.isObject&&!this.useToJSON&&e.appendChild(o("span","toggler")),this.hasKey&&e.appendChild(o("span","key",this.key+":")),this.isObject&&!this.useToJSON){var t=o("span","value"),r=o("span"),i=o("span","constructor-name",this.constructorName)
if(r.appendChild(i),this.isArray){var s=o("span")
s.appendChild(o("span","bracket","[")),s.appendChild(o("span","number",this.json.length)),s.appendChild(o("span","bracket","]")),r.appendChild(s)}t.appendChild(r),e.appendChild(t)}else{(t=this.isUrl?o("a"):o("span")).classList.add(a(this.type)),this.isDate&&t.classList.add(a("date")),this.isUrl&&(t.classList.add(a("url")),t.setAttribute("href",this.json))
var u=n(this.type,this.json,this.useToJSON?this.json.toJSON():this.json)
t.appendChild(document.createTextNode(u)),e.appendChild(t)}if(this.isObject&&this.config.hoverPreviewEnabled){var l=o("span","preview-text")
l.appendChild(document.createTextNode(this.getInlinepreview())),e.appendChild(l)}var c=o("div","children")
return this.isObject&&c.classList.add(a("object")),this.isArray&&c.classList.add(a("array")),this.isEmpty&&c.classList.add(a("empty")),this.config&&this.config.theme&&this.element.classList.add(a(this.config.theme)),this.isOpen&&this.element.classList.add(a("open")),this.element.appendChild(e),this.element.appendChild(c),this.isObject&&this.isOpen&&this.appendChildren(),this.isObject&&!this.useToJSON&&e.addEventListener("click",this.toggleOpen.bind(this)),this.element},h.prototype.appendChildren=function(e){var t=this
void 0===e&&(e=!1)
var r=this.element.querySelector("div."+a("children"))
if(r&&!this.isEmpty)if(e){var n=0,i=function(){var e=t.keys[n],a=new h(t.json[e],t.open-1,t.config,e)
r.appendChild(a.render()),(n+=1)<t.keys.length&&(n>10?i():c(i))}
c(i)}else this.keys.forEach((function(e){var n=new h(t.json[e],t.open-1,t.config,e)
r.appendChild(n.render())}))},h.prototype.removeChildren=function(e){void 0===e&&(e=!1)
var t=this.element.querySelector("div."+a("children"))
if(e){var r=0,n=function(){t&&t.children.length&&(t.removeChild(t.children[0]),(r+=1)>10?n():c(n))}
c(n)}else t&&(t.innerHTML="")},h}()}()},9789:(e,t,r)=>{"use strict"
var n=r(9484),i=r(8156)
function a(e,t){if(!(this instanceof a))return"number"==typeof t?new a(e).fromIndex(t):new a(e,t)
this.str=e||"",this.lineToIndex=function(e){for(var t=e.split("\n"),r=new Array(t.length),n=0,i=0,a=t.length;i<a;i++)r[i]=n,n+=t[i].length+1
return r}(this.str),t=t||{},this.origin=void 0===t.origin?1:t.origin}Array.prototype.slice,e.exports=a,a.prototype.fromIndex=function(e){if(e<0||e>=this.str.length||isNaN(e))return null
var t=function(e,t){if(e>=t[t.length-1])return t.length-1
for(var r,n=0,i=t.length-2;n<i;)if(e<t[r=n+(i-n>>1)])i=r-1
else{if(!(e>=t[r+1])){n=r
break}n=r+1}return n}(e,this.lineToIndex)
return{line:t+this.origin,col:e-this.lineToIndex[t]+this.origin}},a.prototype.toIndex=function(e,t){if(void 0===t)return n(e)&&e.length>=2?this.toIndex(e[0],e[1]):i(e)&&"line"in e&&("col"in e||"column"in e)?this.toIndex(e.line,"col"in e?e.col:e.column):-1
if(isNaN(e)||isNaN(t))return-1
if(e-=this.origin,t-=this.origin,e>=0&&t>=0&&e<this.lineToIndex.length){var r=this.lineToIndex[e]
if(t<(e===this.lineToIndex.length-1?this.str.length:this.lineToIndex[e+1])-r)return r+t}return-1}},8156:(e,t,r)=>{"use strict"
var n=r(9484)
e.exports=function(e){return null!=e&&"object"==typeof e&&!1===n(e)}},2077:function(e,t,r){var n
e=r.nmd(e),function(){var i,a="Expected a function",o="__lodash_hash_undefined__",s="__lodash_placeholder__",u=32,l=128,c=1/0,d=9007199254740991,h=NaN,f=4294967295,p=[["ary",l],["bind",1],["bindKey",2],["curry",8],["curryRight",16],["flip",512],["partial",u],["partialRight",64],["rearg",256]],g="[object Arguments]",m="[object Array]",v="[object Boolean]",y="[object Date]",b="[object Error]",E="[object Function]",w="[object GeneratorFunction]",_="[object Map]",T="[object Number]",A="[object Object]",D="[object Promise]",k="[object RegExp]",S="[object Set]",x="[object String]",C="[object Symbol]",L="[object WeakMap]",R="[object ArrayBuffer]",I="[object DataView]",O="[object Float32Array]",F="[object Float64Array]",P="[object Int8Array]",N="[object Int16Array]",M="[object Int32Array]",B="[object Uint8Array]",U="[object Uint8ClampedArray]",q="[object Uint16Array]",j="[object Uint32Array]",G=/\b__p \+= '';/g,H=/\b(__p \+=) '' \+/g,V=/(__e\(.*?\)|\b__t\)) \+\n'';/g,z=/&(?:amp|lt|gt|quot|#39);/g,K=/[&<>"']/g,W=RegExp(z.source),$=RegExp(K.source),Y=/<%-([\s\S]+?)%>/g,Q=/<%([\s\S]+?)%>/g,X=/<%=([\s\S]+?)%>/g,Z=/\.|\[(?:[^[\]]*|(["'])(?:(?!\1)[^\\]|\\.)*?\1)\]/,J=/^\w*$/,ee=/[^.[\]]+|\[(?:(-?\d+(?:\.\d+)?)|(["'])((?:(?!\2)[^\\]|\\.)*?)\2)\]|(?=(?:\.|\[\])(?:\.|\[\]|$))/g,te=/[\\^$.*+?()[\]{}|]/g,re=RegExp(te.source),ne=/^\s+/,ie=/\s/,ae=/\{(?:\n\/\* \[wrapped with .+\] \*\/)?\n?/,oe=/\{\n\/\* \[wrapped with (.+)\] \*/,se=/,? & /,ue=/[^\x00-\x2f\x3a-\x40\x5b-\x60\x7b-\x7f]+/g,le=/[()=,{}\[\]\/\s]/,ce=/\\(\\)?/g,de=/\$\{([^\\}]*(?:\\.[^\\}]*)*)\}/g,he=/\w*$/,fe=/^[-+]0x[0-9a-f]+$/i,pe=/^0b[01]+$/i,ge=/^\[object .+?Constructor\]$/,me=/^0o[0-7]+$/i,ve=/^(?:0|[1-9]\d*)$/,ye=/[\xc0-\xd6\xd8-\xf6\xf8-\xff\u0100-\u017f]/g,be=/($^)/,Ee=/['\n\r\u2028\u2029\\]/g,we="\\ud800-\\udfff",_e="\\u0300-\\u036f\\ufe20-\\ufe2f\\u20d0-\\u20ff",Te="\\u2700-\\u27bf",Ae="a-z\\xdf-\\xf6\\xf8-\\xff",De="A-Z\\xc0-\\xd6\\xd8-\\xde",ke="\\ufe0e\\ufe0f",Se="\\xac\\xb1\\xd7\\xf7\\x00-\\x2f\\x3a-\\x40\\x5b-\\x60\\x7b-\\xbf\\u2000-\\u206f \\t\\x0b\\f\\xa0\\ufeff\\n\\r\\u2028\\u2029\\u1680\\u180e\\u2000\\u2001\\u2002\\u2003\\u2004\\u2005\\u2006\\u2007\\u2008\\u2009\\u200a\\u202f\\u205f\\u3000",xe="["+we+"]",Ce="["+Se+"]",Le="["+_e+"]",Re="\\d+",Ie="["+Te+"]",Oe="["+Ae+"]",Fe="[^"+we+Se+Re+Te+Ae+De+"]",Pe="\\ud83c[\\udffb-\\udfff]",Ne="[^"+we+"]",Me="(?:\\ud83c[\\udde6-\\uddff]){2}",Be="[\\ud800-\\udbff][\\udc00-\\udfff]",Ue="["+De+"]",qe="\\u200d",je="(?:"+Oe+"|"+Fe+")",Ge="(?:"+Ue+"|"+Fe+")",He="(?:['’](?:d|ll|m|re|s|t|ve))?",Ve="(?:['’](?:D|LL|M|RE|S|T|VE))?",ze="(?:"+Le+"|"+Pe+")?",Ke="["+ke+"]?",We=Ke+ze+"(?:"+qe+"(?:"+[Ne,Me,Be].join("|")+")"+Ke+ze+")*",$e="(?:"+[Ie,Me,Be].join("|")+")"+We,Ye="(?:"+[Ne+Le+"?",Le,Me,Be,xe].join("|")+")",Qe=RegExp("['’]","g"),Xe=RegExp(Le,"g"),Ze=RegExp(Pe+"(?="+Pe+")|"+Ye+We,"g"),Je=RegExp([Ue+"?"+Oe+"+"+He+"(?="+[Ce,Ue,"$"].join("|")+")",Ge+"+"+Ve+"(?="+[Ce,Ue+je,"$"].join("|")+")",Ue+"?"+je+"+"+He,Ue+"+"+Ve,"\\d*(?:1ST|2ND|3RD|(?![123])\\dTH)(?=\\b|[a-z_])","\\d*(?:1st|2nd|3rd|(?![123])\\dth)(?=\\b|[A-Z_])",Re,$e].join("|"),"g"),et=RegExp("["+qe+we+_e+ke+"]"),tt=/[a-z][A-Z]|[A-Z]{2}[a-z]|[0-9][a-zA-Z]|[a-zA-Z][0-9]|[^a-zA-Z0-9 ]/,rt=["Array","Buffer","DataView","Date","Error","Float32Array","Float64Array","Function","Int8Array","Int16Array","Int32Array","Map","Math","Object","Promise","RegExp","Set","String","Symbol","TypeError","Uint8Array","Uint8ClampedArray","Uint16Array","Uint32Array","WeakMap","_","clearTimeout","isFinite","parseInt","setTimeout"],nt=-1,it={}
it[O]=it[F]=it[P]=it[N]=it[M]=it[B]=it[U]=it[q]=it[j]=!0,it[g]=it[m]=it[R]=it[v]=it[I]=it[y]=it[b]=it[E]=it[_]=it[T]=it[A]=it[k]=it[S]=it[x]=it[L]=!1
var at={}
at[g]=at[m]=at[R]=at[I]=at[v]=at[y]=at[O]=at[F]=at[P]=at[N]=at[M]=at[_]=at[T]=at[A]=at[k]=at[S]=at[x]=at[C]=at[B]=at[U]=at[q]=at[j]=!0,at[b]=at[E]=at[L]=!1
var ot={"\\":"\\","'":"'","\n":"n","\r":"r","\u2028":"u2028","\u2029":"u2029"},st=parseFloat,ut=parseInt,lt="object"==typeof global&&global&&global.Object===Object&&global,ct="object"==typeof self&&self&&self.Object===Object&&self,dt=lt||ct||Function("return this")(),ht=t&&!t.nodeType&&t,ft=ht&&e&&!e.nodeType&&e,pt=ft&&ft.exports===ht,gt=pt&&lt.process,mt=function(){try{return ft&&ft.require&&ft.require("util").types||gt&&gt.binding&&gt.binding("util")}catch(e){}}(),vt=mt&&mt.isArrayBuffer,yt=mt&&mt.isDate,bt=mt&&mt.isMap,Et=mt&&mt.isRegExp,wt=mt&&mt.isSet,_t=mt&&mt.isTypedArray
function Tt(e,t,r){switch(r.length){case 0:return e.call(t)
case 1:return e.call(t,r[0])
case 2:return e.call(t,r[0],r[1])
case 3:return e.call(t,r[0],r[1],r[2])}return e.apply(t,r)}function At(e,t,r,n){for(var i=-1,a=null==e?0:e.length;++i<a;){var o=e[i]
t(n,o,r(o),e)}return n}function Dt(e,t){for(var r=-1,n=null==e?0:e.length;++r<n&&!1!==t(e[r],r,e););return e}function kt(e,t){for(var r=null==e?0:e.length;r--&&!1!==t(e[r],r,e););return e}function St(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(!t(e[r],r,e))return!1
return!0}function xt(e,t){for(var r=-1,n=null==e?0:e.length,i=0,a=[];++r<n;){var o=e[r]
t(o,r,e)&&(a[i++]=o)}return a}function Ct(e,t){return!(null==e||!e.length)&&Ut(e,t,0)>-1}function Lt(e,t,r){for(var n=-1,i=null==e?0:e.length;++n<i;)if(r(t,e[n]))return!0
return!1}function Rt(e,t){for(var r=-1,n=null==e?0:e.length,i=Array(n);++r<n;)i[r]=t(e[r],r,e)
return i}function It(e,t){for(var r=-1,n=t.length,i=e.length;++r<n;)e[i+r]=t[r]
return e}function Ot(e,t,r,n){var i=-1,a=null==e?0:e.length
for(n&&a&&(r=e[++i]);++i<a;)r=t(r,e[i],i,e)
return r}function Ft(e,t,r,n){var i=null==e?0:e.length
for(n&&i&&(r=e[--i]);i--;)r=t(r,e[i],i,e)
return r}function Pt(e,t){for(var r=-1,n=null==e?0:e.length;++r<n;)if(t(e[r],r,e))return!0
return!1}var Nt=Ht("length")
function Mt(e,t,r){var n
return r(e,(function(e,r,i){if(t(e,r,i))return n=r,!1})),n}function Bt(e,t,r,n){for(var i=e.length,a=r+(n?1:-1);n?a--:++a<i;)if(t(e[a],a,e))return a
return-1}function Ut(e,t,r){return t==t?function(e,t,r){for(var n=r-1,i=e.length;++n<i;)if(e[n]===t)return n
return-1}(e,t,r):Bt(e,jt,r)}function qt(e,t,r,n){for(var i=r-1,a=e.length;++i<a;)if(n(e[i],t))return i
return-1}function jt(e){return e!=e}function Gt(e,t){var r=null==e?0:e.length
return r?Kt(e,t)/r:h}function Ht(e){return function(t){return null==t?i:t[e]}}function Vt(e){return function(t){return null==e?i:e[t]}}function zt(e,t,r,n,i){return i(e,(function(e,i,a){r=n?(n=!1,e):t(r,e,i,a)})),r}function Kt(e,t){for(var r,n=-1,a=e.length;++n<a;){var o=t(e[n])
o!==i&&(r=r===i?o:r+o)}return r}function Wt(e,t){for(var r=-1,n=Array(e);++r<e;)n[r]=t(r)
return n}function $t(e){return e?e.slice(0,cr(e)+1).replace(ne,""):e}function Yt(e){return function(t){return e(t)}}function Qt(e,t){return Rt(t,(function(t){return e[t]}))}function Xt(e,t){return e.has(t)}function Zt(e,t){for(var r=-1,n=e.length;++r<n&&Ut(t,e[r],0)>-1;);return r}function Jt(e,t){for(var r=e.length;r--&&Ut(t,e[r],0)>-1;);return r}var er=Vt({"À":"A","Á":"A","Â":"A","Ã":"A","Ä":"A","Å":"A","à":"a","á":"a","â":"a","ã":"a","ä":"a","å":"a","Ç":"C","ç":"c","Ð":"D","ð":"d","È":"E","É":"E","Ê":"E","Ë":"E","è":"e","é":"e","ê":"e","ë":"e","Ì":"I","Í":"I","Î":"I","Ï":"I","ì":"i","í":"i","î":"i","ï":"i","Ñ":"N","ñ":"n","Ò":"O","Ó":"O","Ô":"O","Õ":"O","Ö":"O","Ø":"O","ò":"o","ó":"o","ô":"o","õ":"o","ö":"o","ø":"o","Ù":"U","Ú":"U","Û":"U","Ü":"U","ù":"u","ú":"u","û":"u","ü":"u","Ý":"Y","ý":"y","ÿ":"y","Æ":"Ae","æ":"ae","Þ":"Th","þ":"th","ß":"ss","Ā":"A","Ă":"A","Ą":"A","ā":"a","ă":"a","ą":"a","Ć":"C","Ĉ":"C","Ċ":"C","Č":"C","ć":"c","ĉ":"c","ċ":"c","č":"c","Ď":"D","Đ":"D","ď":"d","đ":"d","Ē":"E","Ĕ":"E","Ė":"E","Ę":"E","Ě":"E","ē":"e","ĕ":"e","ė":"e","ę":"e","ě":"e","Ĝ":"G","Ğ":"G","Ġ":"G","Ģ":"G","ĝ":"g","ğ":"g","ġ":"g","ģ":"g","Ĥ":"H","Ħ":"H","ĥ":"h","ħ":"h","Ĩ":"I","Ī":"I","Ĭ":"I","Į":"I","İ":"I","ĩ":"i","ī":"i","ĭ":"i","į":"i","ı":"i","Ĵ":"J","ĵ":"j","Ķ":"K","ķ":"k","ĸ":"k","Ĺ":"L","Ļ":"L","Ľ":"L","Ŀ":"L","Ł":"L","ĺ":"l","ļ":"l","ľ":"l","ŀ":"l","ł":"l","Ń":"N","Ņ":"N","Ň":"N","Ŋ":"N","ń":"n","ņ":"n","ň":"n","ŋ":"n","Ō":"O","Ŏ":"O","Ő":"O","ō":"o","ŏ":"o","ő":"o","Ŕ":"R","Ŗ":"R","Ř":"R","ŕ":"r","ŗ":"r","ř":"r","Ś":"S","Ŝ":"S","Ş":"S","Š":"S","ś":"s","ŝ":"s","ş":"s","š":"s","Ţ":"T","Ť":"T","Ŧ":"T","ţ":"t","ť":"t","ŧ":"t","Ũ":"U","Ū":"U","Ŭ":"U","Ů":"U","Ű":"U","Ų":"U","ũ":"u","ū":"u","ŭ":"u","ů":"u","ű":"u","ų":"u","Ŵ":"W","ŵ":"w","Ŷ":"Y","ŷ":"y","Ÿ":"Y","Ź":"Z","Ż":"Z","Ž":"Z","ź":"z","ż":"z","ž":"z","Ĳ":"IJ","ĳ":"ij","Œ":"Oe","œ":"oe","ŉ":"'n","ſ":"s"}),tr=Vt({"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"})
function rr(e){return"\\"+ot[e]}function nr(e){return et.test(e)}function ir(e){var t=-1,r=Array(e.size)
return e.forEach((function(e,n){r[++t]=[n,e]})),r}function ar(e,t){return function(r){return e(t(r))}}function or(e,t){for(var r=-1,n=e.length,i=0,a=[];++r<n;){var o=e[r]
o!==t&&o!==s||(e[r]=s,a[i++]=r)}return a}function sr(e){var t=-1,r=Array(e.size)
return e.forEach((function(e){r[++t]=e})),r}function ur(e){return nr(e)?function(e){for(var t=Ze.lastIndex=0;Ze.test(e);)++t
return t}(e):Nt(e)}function lr(e){return nr(e)?function(e){return e.match(Ze)||[]}(e):function(e){return e.split("")}(e)}function cr(e){for(var t=e.length;t--&&ie.test(e.charAt(t)););return t}var dr=Vt({"&amp;":"&","&lt;":"<","&gt;":">","&quot;":'"',"&#39;":"'"}),hr=function e(t){var r,n=(t=null==t?dt:hr.defaults(dt.Object(),t,hr.pick(dt,rt))).Array,ie=t.Date,we=t.Error,_e=t.Function,Te=t.Math,Ae=t.Object,De=t.RegExp,ke=t.String,Se=t.TypeError,xe=n.prototype,Ce=_e.prototype,Le=Ae.prototype,Re=t["__core-js_shared__"],Ie=Ce.toString,Oe=Le.hasOwnProperty,Fe=0,Pe=(r=/[^.]+$/.exec(Re&&Re.keys&&Re.keys.IE_PROTO||""))?"Symbol(src)_1."+r:"",Ne=Le.toString,Me=Ie.call(Ae),Be=dt._,Ue=De("^"+Ie.call(Oe).replace(te,"\\$&").replace(/hasOwnProperty|(function).*?(?=\\\()| for .+?(?=\\\])/g,"$1.*?")+"$"),qe=pt?t.Buffer:i,je=t.Symbol,Ge=t.Uint8Array,He=qe?qe.allocUnsafe:i,Ve=ar(Ae.getPrototypeOf,Ae),ze=Ae.create,Ke=Le.propertyIsEnumerable,We=xe.splice,$e=je?je.isConcatSpreadable:i,Ye=je?je.iterator:i,Ze=je?je.toStringTag:i,et=function(){try{var e=sa(Ae,"defineProperty")
return e({},"",{}),e}catch(e){}}(),ot=t.clearTimeout!==dt.clearTimeout&&t.clearTimeout,lt=ie&&ie.now!==dt.Date.now&&ie.now,ct=t.setTimeout!==dt.setTimeout&&t.setTimeout,ht=Te.ceil,ft=Te.floor,gt=Ae.getOwnPropertySymbols,mt=qe?qe.isBuffer:i,Nt=t.isFinite,Vt=xe.join,fr=ar(Ae.keys,Ae),pr=Te.max,gr=Te.min,mr=ie.now,vr=t.parseInt,yr=Te.random,br=xe.reverse,Er=sa(t,"DataView"),wr=sa(t,"Map"),_r=sa(t,"Promise"),Tr=sa(t,"Set"),Ar=sa(t,"WeakMap"),Dr=sa(Ae,"create"),kr=Ar&&new Ar,Sr={},xr=Pa(Er),Cr=Pa(wr),Lr=Pa(_r),Rr=Pa(Tr),Ir=Pa(Ar),Or=je?je.prototype:i,Fr=Or?Or.valueOf:i,Pr=Or?Or.toString:i
function Nr(e){if(Jo(e)&&!Go(e)&&!(e instanceof qr)){if(e instanceof Ur)return e
if(Oe.call(e,"__wrapped__"))return Na(e)}return new Ur(e)}var Mr=function(){function e(){}return function(t){if(!Zo(t))return{}
if(ze)return ze(t)
e.prototype=t
var r=new e
return e.prototype=i,r}}()
function Br(){}function Ur(e,t){this.__wrapped__=e,this.__actions__=[],this.__chain__=!!t,this.__index__=0,this.__values__=i}function qr(e){this.__wrapped__=e,this.__actions__=[],this.__dir__=1,this.__filtered__=!1,this.__iteratees__=[],this.__takeCount__=f,this.__views__=[]}function jr(e){var t=-1,r=null==e?0:e.length
for(this.clear();++t<r;){var n=e[t]
this.set(n[0],n[1])}}function Gr(e){var t=-1,r=null==e?0:e.length
for(this.clear();++t<r;){var n=e[t]
this.set(n[0],n[1])}}function Hr(e){var t=-1,r=null==e?0:e.length
for(this.clear();++t<r;){var n=e[t]
this.set(n[0],n[1])}}function Vr(e){var t=-1,r=null==e?0:e.length
for(this.__data__=new Hr;++t<r;)this.add(e[t])}function zr(e){var t=this.__data__=new Gr(e)
this.size=t.size}function Kr(e,t){var r=Go(e),n=!r&&jo(e),i=!r&&!n&&Ko(e),a=!r&&!n&&!i&&ss(e),o=r||n||i||a,s=o?Wt(e.length,ke):[],u=s.length
for(var l in e)!t&&!Oe.call(e,l)||o&&("length"==l||i&&("offset"==l||"parent"==l)||a&&("buffer"==l||"byteLength"==l||"byteOffset"==l)||pa(l,u))||s.push(l)
return s}function Wr(e){var t=e.length
return t?e[Vn(0,t-1)]:i}function $r(e,t){return La(Di(e),nn(t,0,e.length))}function Yr(e){return La(Di(e))}function Qr(e,t,r){(r!==i&&!Bo(e[t],r)||r===i&&!(t in e))&&tn(e,t,r)}function Xr(e,t,r){var n=e[t]
Oe.call(e,t)&&Bo(n,r)&&(r!==i||t in e)||tn(e,t,r)}function Zr(e,t){for(var r=e.length;r--;)if(Bo(e[r][0],t))return r
return-1}function Jr(e,t,r,n){return ln(e,(function(e,i,a){t(n,e,r(e),a)})),n}function en(e,t){return e&&ki(t,Cs(t),e)}function tn(e,t,r){"__proto__"==t&&et?et(e,t,{configurable:!0,enumerable:!0,value:r,writable:!0}):e[t]=r}function rn(e,t){for(var r=-1,a=t.length,o=n(a),s=null==e;++r<a;)o[r]=s?i:As(e,t[r])
return o}function nn(e,t,r){return e==e&&(r!==i&&(e=e<=r?e:r),t!==i&&(e=e>=t?e:t)),e}function an(e,t,r,n,a,o){var s,u=1&t,l=2&t,c=4&t
if(r&&(s=a?r(e,n,a,o):r(e)),s!==i)return s
if(!Zo(e))return e
var d=Go(e)
if(d){if(s=function(e){var t=e.length,r=new e.constructor(t)
return t&&"string"==typeof e[0]&&Oe.call(e,"index")&&(r.index=e.index,r.input=e.input),r}(e),!u)return Di(e,s)}else{var h=ca(e),f=h==E||h==w
if(Ko(e))return bi(e,u)
if(h==A||h==g||f&&!a){if(s=l||f?{}:ha(e),!u)return l?function(e,t){return ki(e,la(e),t)}(e,function(e,t){return e&&ki(t,Ls(t),e)}(s,e)):function(e,t){return ki(e,ua(e),t)}(e,en(s,e))}else{if(!at[h])return a?e:{}
s=function(e,t,r){var n,i=e.constructor
switch(t){case R:return Ei(e)
case v:case y:return new i(+e)
case I:return function(e,t){var r=t?Ei(e.buffer):e.buffer
return new e.constructor(r,e.byteOffset,e.byteLength)}(e,r)
case O:case F:case P:case N:case M:case B:case U:case q:case j:return wi(e,r)
case _:return new i
case T:case x:return new i(e)
case k:return function(e){var t=new e.constructor(e.source,he.exec(e))
return t.lastIndex=e.lastIndex,t}(e)
case S:return new i
case C:return n=e,Fr?Ae(Fr.call(n)):{}}}(e,h,u)}}o||(o=new zr)
var p=o.get(e)
if(p)return p
o.set(e,s),is(e)?e.forEach((function(n){s.add(an(n,t,r,n,e,o))})):es(e)&&e.forEach((function(n,i){s.set(i,an(n,t,r,i,e,o))}))
var m=d?i:(c?l?ea:Ji:l?Ls:Cs)(e)
return Dt(m||e,(function(n,i){m&&(n=e[i=n]),Xr(s,i,an(n,t,r,i,e,o))})),s}function on(e,t,r){var n=r.length
if(null==e)return!n
for(e=Ae(e);n--;){var a=r[n],o=t[a],s=e[a]
if(s===i&&!(a in e)||!o(s))return!1}return!0}function sn(e,t,r){if("function"!=typeof e)throw new Se(a)
return ka((function(){e.apply(i,r)}),t)}function un(e,t,r,n){var i=-1,a=Ct,o=!0,s=e.length,u=[],l=t.length
if(!s)return u
r&&(t=Rt(t,Yt(r))),n?(a=Lt,o=!1):t.length>=200&&(a=Xt,o=!1,t=new Vr(t))
e:for(;++i<s;){var c=e[i],d=null==r?c:r(c)
if(c=n||0!==c?c:0,o&&d==d){for(var h=l;h--;)if(t[h]===d)continue e
u.push(c)}else a(t,d,n)||u.push(c)}return u}Nr.templateSettings={escape:Y,evaluate:Q,interpolate:X,variable:"",imports:{_:Nr}},Nr.prototype=Br.prototype,Nr.prototype.constructor=Nr,Ur.prototype=Mr(Br.prototype),Ur.prototype.constructor=Ur,qr.prototype=Mr(Br.prototype),qr.prototype.constructor=qr,jr.prototype.clear=function(){this.__data__=Dr?Dr(null):{},this.size=0},jr.prototype.delete=function(e){var t=this.has(e)&&delete this.__data__[e]
return this.size-=t?1:0,t},jr.prototype.get=function(e){var t=this.__data__
if(Dr){var r=t[e]
return r===o?i:r}return Oe.call(t,e)?t[e]:i},jr.prototype.has=function(e){var t=this.__data__
return Dr?t[e]!==i:Oe.call(t,e)},jr.prototype.set=function(e,t){var r=this.__data__
return this.size+=this.has(e)?0:1,r[e]=Dr&&t===i?o:t,this},Gr.prototype.clear=function(){this.__data__=[],this.size=0},Gr.prototype.delete=function(e){var t=this.__data__,r=Zr(t,e)
return!(r<0||(r==t.length-1?t.pop():We.call(t,r,1),--this.size,0))},Gr.prototype.get=function(e){var t=this.__data__,r=Zr(t,e)
return r<0?i:t[r][1]},Gr.prototype.has=function(e){return Zr(this.__data__,e)>-1},Gr.prototype.set=function(e,t){var r=this.__data__,n=Zr(r,e)
return n<0?(++this.size,r.push([e,t])):r[n][1]=t,this},Hr.prototype.clear=function(){this.size=0,this.__data__={hash:new jr,map:new(wr||Gr),string:new jr}},Hr.prototype.delete=function(e){var t=aa(this,e).delete(e)
return this.size-=t?1:0,t},Hr.prototype.get=function(e){return aa(this,e).get(e)},Hr.prototype.has=function(e){return aa(this,e).has(e)},Hr.prototype.set=function(e,t){var r=aa(this,e),n=r.size
return r.set(e,t),this.size+=r.size==n?0:1,this},Vr.prototype.add=Vr.prototype.push=function(e){return this.__data__.set(e,o),this},Vr.prototype.has=function(e){return this.__data__.has(e)},zr.prototype.clear=function(){this.__data__=new Gr,this.size=0},zr.prototype.delete=function(e){var t=this.__data__,r=t.delete(e)
return this.size=t.size,r},zr.prototype.get=function(e){return this.__data__.get(e)},zr.prototype.has=function(e){return this.__data__.has(e)},zr.prototype.set=function(e,t){var r=this.__data__
if(r instanceof Gr){var n=r.__data__
if(!wr||n.length<199)return n.push([e,t]),this.size=++r.size,this
r=this.__data__=new Hr(n)}return r.set(e,t),this.size=r.size,this}
var ln=Ci(vn),cn=Ci(yn,!0)
function dn(e,t){var r=!0
return ln(e,(function(e,n,i){return r=!!t(e,n,i)})),r}function hn(e,t,r){for(var n=-1,a=e.length;++n<a;){var o=e[n],s=t(o)
if(null!=s&&(u===i?s==s&&!os(s):r(s,u)))var u=s,l=o}return l}function fn(e,t){var r=[]
return ln(e,(function(e,n,i){t(e,n,i)&&r.push(e)})),r}function pn(e,t,r,n,i){var a=-1,o=e.length
for(r||(r=fa),i||(i=[]);++a<o;){var s=e[a]
t>0&&r(s)?t>1?pn(s,t-1,r,n,i):It(i,s):n||(i[i.length]=s)}return i}var gn=Li(),mn=Li(!0)
function vn(e,t){return e&&gn(e,t,Cs)}function yn(e,t){return e&&mn(e,t,Cs)}function bn(e,t){return xt(t,(function(t){return Yo(e[t])}))}function En(e,t){for(var r=0,n=(t=gi(t,e)).length;null!=e&&r<n;)e=e[Fa(t[r++])]
return r&&r==n?e:i}function wn(e,t,r){var n=t(e)
return Go(e)?n:It(n,r(e))}function _n(e){return null==e?e===i?"[object Undefined]":"[object Null]":Ze&&Ze in Ae(e)?function(e){var t=Oe.call(e,Ze),r=e[Ze]
try{e[Ze]=i
var n=!0}catch(e){}var a=Ne.call(e)
return n&&(t?e[Ze]=r:delete e[Ze]),a}(e):function(e){return Ne.call(e)}(e)}function Tn(e,t){return e>t}function An(e,t){return null!=e&&Oe.call(e,t)}function Dn(e,t){return null!=e&&t in Ae(e)}function kn(e,t,r){for(var a=r?Lt:Ct,o=e[0].length,s=e.length,u=s,l=n(s),c=1/0,d=[];u--;){var h=e[u]
u&&t&&(h=Rt(h,Yt(t))),c=gr(h.length,c),l[u]=!r&&(t||o>=120&&h.length>=120)?new Vr(u&&h):i}h=e[0]
var f=-1,p=l[0]
e:for(;++f<o&&d.length<c;){var g=h[f],m=t?t(g):g
if(g=r||0!==g?g:0,!(p?Xt(p,m):a(d,m,r))){for(u=s;--u;){var v=l[u]
if(!(v?Xt(v,m):a(e[u],m,r)))continue e}p&&p.push(m),d.push(g)}}return d}function Sn(e,t,r){var n=null==(e=Ta(e,t=gi(t,e)))?e:e[Fa(Wa(t))]
return null==n?i:Tt(n,e,r)}function xn(e){return Jo(e)&&_n(e)==g}function Cn(e,t,r,n,a){return e===t||(null==e||null==t||!Jo(e)&&!Jo(t)?e!=e&&t!=t:function(e,t,r,n,a,o){var s=Go(e),u=Go(t),l=s?m:ca(e),c=u?m:ca(t),d=(l=l==g?A:l)==A,h=(c=c==g?A:c)==A,f=l==c
if(f&&Ko(e)){if(!Ko(t))return!1
s=!0,d=!1}if(f&&!d)return o||(o=new zr),s||ss(e)?Xi(e,t,r,n,a,o):function(e,t,r,n,i,a,o){switch(r){case I:if(e.byteLength!=t.byteLength||e.byteOffset!=t.byteOffset)return!1
e=e.buffer,t=t.buffer
case R:return!(e.byteLength!=t.byteLength||!a(new Ge(e),new Ge(t)))
case v:case y:case T:return Bo(+e,+t)
case b:return e.name==t.name&&e.message==t.message
case k:case x:return e==t+""
case _:var s=ir
case S:var u=1&n
if(s||(s=sr),e.size!=t.size&&!u)return!1
var l=o.get(e)
if(l)return l==t
n|=2,o.set(e,t)
var c=Xi(s(e),s(t),n,i,a,o)
return o.delete(e),c
case C:if(Fr)return Fr.call(e)==Fr.call(t)}return!1}(e,t,l,r,n,a,o)
if(!(1&r)){var p=d&&Oe.call(e,"__wrapped__"),E=h&&Oe.call(t,"__wrapped__")
if(p||E){var w=p?e.value():e,D=E?t.value():t
return o||(o=new zr),a(w,D,r,n,o)}}return!!f&&(o||(o=new zr),function(e,t,r,n,a,o){var s=1&r,u=Ji(e),l=u.length
if(l!=Ji(t).length&&!s)return!1
for(var c=l;c--;){var d=u[c]
if(!(s?d in t:Oe.call(t,d)))return!1}var h=o.get(e),f=o.get(t)
if(h&&f)return h==t&&f==e
var p=!0
o.set(e,t),o.set(t,e)
for(var g=s;++c<l;){var m=e[d=u[c]],v=t[d]
if(n)var y=s?n(v,m,d,t,e,o):n(m,v,d,e,t,o)
if(!(y===i?m===v||a(m,v,r,n,o):y)){p=!1
break}g||(g="constructor"==d)}if(p&&!g){var b=e.constructor,E=t.constructor
b==E||!("constructor"in e)||!("constructor"in t)||"function"==typeof b&&b instanceof b&&"function"==typeof E&&E instanceof E||(p=!1)}return o.delete(e),o.delete(t),p}(e,t,r,n,a,o))}(e,t,r,n,Cn,a))}function Ln(e,t,r,n){var a=r.length,o=a,s=!n
if(null==e)return!o
for(e=Ae(e);a--;){var u=r[a]
if(s&&u[2]?u[1]!==e[u[0]]:!(u[0]in e))return!1}for(;++a<o;){var l=(u=r[a])[0],c=e[l],d=u[1]
if(s&&u[2]){if(c===i&&!(l in e))return!1}else{var h=new zr
if(n)var f=n(c,d,l,e,t,h)
if(!(f===i?Cn(d,c,3,n,h):f))return!1}}return!0}function Rn(e){return!(!Zo(e)||(t=e,Pe&&Pe in t))&&(Yo(e)?Ue:ge).test(Pa(e))
var t}function In(e){return"function"==typeof e?e:null==e?tu:"object"==typeof e?Go(e)?Mn(e[0],e[1]):Nn(e):cu(e)}function On(e){if(!ba(e))return fr(e)
var t=[]
for(var r in Ae(e))Oe.call(e,r)&&"constructor"!=r&&t.push(r)
return t}function Fn(e,t){return e<t}function Pn(e,t){var r=-1,i=Vo(e)?n(e.length):[]
return ln(e,(function(e,n,a){i[++r]=t(e,n,a)})),i}function Nn(e){var t=oa(e)
return 1==t.length&&t[0][2]?wa(t[0][0],t[0][1]):function(r){return r===e||Ln(r,e,t)}}function Mn(e,t){return ma(e)&&Ea(t)?wa(Fa(e),t):function(r){var n=As(r,e)
return n===i&&n===t?Ds(r,e):Cn(t,n,3)}}function Bn(e,t,r,n,a){e!==t&&gn(t,(function(o,s){if(a||(a=new zr),Zo(o))!function(e,t,r,n,a,o,s){var u=Aa(e,r),l=Aa(t,r),c=s.get(l)
if(c)Qr(e,r,c)
else{var d=o?o(u,l,r+"",e,t,s):i,h=d===i
if(h){var f=Go(l),p=!f&&Ko(l),g=!f&&!p&&ss(l)
d=l,f||p||g?Go(u)?d=u:zo(u)?d=Di(u):p?(h=!1,d=bi(l,!0)):g?(h=!1,d=wi(l,!0)):d=[]:rs(l)||jo(l)?(d=u,jo(u)?d=gs(u):Zo(u)&&!Yo(u)||(d=ha(l))):h=!1}h&&(s.set(l,d),a(d,l,n,o,s),s.delete(l)),Qr(e,r,d)}}(e,t,s,r,Bn,n,a)
else{var u=n?n(Aa(e,s),o,s+"",e,t,a):i
u===i&&(u=o),Qr(e,s,u)}}),Ls)}function Un(e,t){var r=e.length
if(r)return pa(t+=t<0?r:0,r)?e[t]:i}function qn(e,t,r){t=t.length?Rt(t,(function(e){return Go(e)?function(t){return En(t,1===e.length?e[0]:e)}:e})):[tu]
var n=-1
t=Rt(t,Yt(ia()))
var i=Pn(e,(function(e,r,i){var a=Rt(t,(function(t){return t(e)}))
return{criteria:a,index:++n,value:e}}))
return function(e,t){var n=e.length
for(e.sort((function(e,t){return function(e,t,r){for(var n=-1,i=e.criteria,a=t.criteria,o=i.length,s=r.length;++n<o;){var u=_i(i[n],a[n])
if(u)return n>=s?u:u*("desc"==r[n]?-1:1)}return e.index-t.index}(e,t,r)}));n--;)e[n]=e[n].value
return e}(i)}function jn(e,t,r){for(var n=-1,i=t.length,a={};++n<i;){var o=t[n],s=En(e,o)
r(s,o)&&Yn(a,gi(o,e),s)}return a}function Gn(e,t,r,n){var i=n?qt:Ut,a=-1,o=t.length,s=e
for(e===t&&(t=Di(t)),r&&(s=Rt(e,Yt(r)));++a<o;)for(var u=0,l=t[a],c=r?r(l):l;(u=i(s,c,u,n))>-1;)s!==e&&We.call(s,u,1),We.call(e,u,1)
return e}function Hn(e,t){for(var r=e?t.length:0,n=r-1;r--;){var i=t[r]
if(r==n||i!==a){var a=i
pa(i)?We.call(e,i,1):si(e,i)}}return e}function Vn(e,t){return e+ft(yr()*(t-e+1))}function zn(e,t){var r=""
if(!e||t<1||t>d)return r
do{t%2&&(r+=e),(t=ft(t/2))&&(e+=e)}while(t)
return r}function Kn(e,t){return Sa(_a(e,t,tu),e+"")}function Wn(e){return Wr(Bs(e))}function $n(e,t){var r=Bs(e)
return La(r,nn(t,0,r.length))}function Yn(e,t,r,n){if(!Zo(e))return e
for(var a=-1,o=(t=gi(t,e)).length,s=o-1,u=e;null!=u&&++a<o;){var l=Fa(t[a]),c=r
if("__proto__"===l||"constructor"===l||"prototype"===l)return e
if(a!=s){var d=u[l];(c=n?n(d,l,u):i)===i&&(c=Zo(d)?d:pa(t[a+1])?[]:{})}Xr(u,l,c),u=u[l]}return e}var Qn=kr?function(e,t){return kr.set(e,t),e}:tu,Xn=et?function(e,t){return et(e,"toString",{configurable:!0,enumerable:!1,value:Zs(t),writable:!0})}:tu
function Zn(e){return La(Bs(e))}function Jn(e,t,r){var i=-1,a=e.length
t<0&&(t=-t>a?0:a+t),(r=r>a?a:r)<0&&(r+=a),a=t>r?0:r-t>>>0,t>>>=0
for(var o=n(a);++i<a;)o[i]=e[i+t]
return o}function ei(e,t){var r
return ln(e,(function(e,n,i){return!(r=t(e,n,i))})),!!r}function ti(e,t,r){var n=0,i=null==e?n:e.length
if("number"==typeof t&&t==t&&i<=2147483647){for(;n<i;){var a=n+i>>>1,o=e[a]
null!==o&&!os(o)&&(r?o<=t:o<t)?n=a+1:i=a}return i}return ri(e,t,tu,r)}function ri(e,t,r,n){var a=0,o=null==e?0:e.length
if(0===o)return 0
for(var s=(t=r(t))!=t,u=null===t,l=os(t),c=t===i;a<o;){var d=ft((a+o)/2),h=r(e[d]),f=h!==i,p=null===h,g=h==h,m=os(h)
if(s)var v=n||g
else v=c?g&&(n||f):u?g&&f&&(n||!p):l?g&&f&&!p&&(n||!m):!p&&!m&&(n?h<=t:h<t)
v?a=d+1:o=d}return gr(o,4294967294)}function ni(e,t){for(var r=-1,n=e.length,i=0,a=[];++r<n;){var o=e[r],s=t?t(o):o
if(!r||!Bo(s,u)){var u=s
a[i++]=0===o?0:o}}return a}function ii(e){return"number"==typeof e?e:os(e)?h:+e}function ai(e){if("string"==typeof e)return e
if(Go(e))return Rt(e,ai)+""
if(os(e))return Pr?Pr.call(e):""
var t=e+""
return"0"==t&&1/e==-1/0?"-0":t}function oi(e,t,r){var n=-1,i=Ct,a=e.length,o=!0,s=[],u=s
if(r)o=!1,i=Lt
else if(a>=200){var l=t?null:zi(e)
if(l)return sr(l)
o=!1,i=Xt,u=new Vr}else u=t?[]:s
e:for(;++n<a;){var c=e[n],d=t?t(c):c
if(c=r||0!==c?c:0,o&&d==d){for(var h=u.length;h--;)if(u[h]===d)continue e
t&&u.push(d),s.push(c)}else i(u,d,r)||(u!==s&&u.push(d),s.push(c))}return s}function si(e,t){return null==(e=Ta(e,t=gi(t,e)))||delete e[Fa(Wa(t))]}function ui(e,t,r,n){return Yn(e,t,r(En(e,t)),n)}function li(e,t,r,n){for(var i=e.length,a=n?i:-1;(n?a--:++a<i)&&t(e[a],a,e););return r?Jn(e,n?0:a,n?a+1:i):Jn(e,n?a+1:0,n?i:a)}function ci(e,t){var r=e
return r instanceof qr&&(r=r.value()),Ot(t,(function(e,t){return t.func.apply(t.thisArg,It([e],t.args))}),r)}function di(e,t,r){var i=e.length
if(i<2)return i?oi(e[0]):[]
for(var a=-1,o=n(i);++a<i;)for(var s=e[a],u=-1;++u<i;)u!=a&&(o[a]=un(o[a]||s,e[u],t,r))
return oi(pn(o,1),t,r)}function hi(e,t,r){for(var n=-1,a=e.length,o=t.length,s={};++n<a;){var u=n<o?t[n]:i
r(s,e[n],u)}return s}function fi(e){return zo(e)?e:[]}function pi(e){return"function"==typeof e?e:tu}function gi(e,t){return Go(e)?e:ma(e,t)?[e]:Oa(ms(e))}var mi=Kn
function vi(e,t,r){var n=e.length
return r=r===i?n:r,!t&&r>=n?e:Jn(e,t,r)}var yi=ot||function(e){return dt.clearTimeout(e)}
function bi(e,t){if(t)return e.slice()
var r=e.length,n=He?He(r):new e.constructor(r)
return e.copy(n),n}function Ei(e){var t=new e.constructor(e.byteLength)
return new Ge(t).set(new Ge(e)),t}function wi(e,t){var r=t?Ei(e.buffer):e.buffer
return new e.constructor(r,e.byteOffset,e.length)}function _i(e,t){if(e!==t){var r=e!==i,n=null===e,a=e==e,o=os(e),s=t!==i,u=null===t,l=t==t,c=os(t)
if(!u&&!c&&!o&&e>t||o&&s&&l&&!u&&!c||n&&s&&l||!r&&l||!a)return 1
if(!n&&!o&&!c&&e<t||c&&r&&a&&!n&&!o||u&&r&&a||!s&&a||!l)return-1}return 0}function Ti(e,t,r,i){for(var a=-1,o=e.length,s=r.length,u=-1,l=t.length,c=pr(o-s,0),d=n(l+c),h=!i;++u<l;)d[u]=t[u]
for(;++a<s;)(h||a<o)&&(d[r[a]]=e[a])
for(;c--;)d[u++]=e[a++]
return d}function Ai(e,t,r,i){for(var a=-1,o=e.length,s=-1,u=r.length,l=-1,c=t.length,d=pr(o-u,0),h=n(d+c),f=!i;++a<d;)h[a]=e[a]
for(var p=a;++l<c;)h[p+l]=t[l]
for(;++s<u;)(f||a<o)&&(h[p+r[s]]=e[a++])
return h}function Di(e,t){var r=-1,i=e.length
for(t||(t=n(i));++r<i;)t[r]=e[r]
return t}function ki(e,t,r,n){var a=!r
r||(r={})
for(var o=-1,s=t.length;++o<s;){var u=t[o],l=n?n(r[u],e[u],u,r,e):i
l===i&&(l=e[u]),a?tn(r,u,l):Xr(r,u,l)}return r}function Si(e,t){return function(r,n){var i=Go(r)?At:Jr,a=t?t():{}
return i(r,e,ia(n,2),a)}}function xi(e){return Kn((function(t,r){var n=-1,a=r.length,o=a>1?r[a-1]:i,s=a>2?r[2]:i
for(o=e.length>3&&"function"==typeof o?(a--,o):i,s&&ga(r[0],r[1],s)&&(o=a<3?i:o,a=1),t=Ae(t);++n<a;){var u=r[n]
u&&e(t,u,n,o)}return t}))}function Ci(e,t){return function(r,n){if(null==r)return r
if(!Vo(r))return e(r,n)
for(var i=r.length,a=t?i:-1,o=Ae(r);(t?a--:++a<i)&&!1!==n(o[a],a,o););return r}}function Li(e){return function(t,r,n){for(var i=-1,a=Ae(t),o=n(t),s=o.length;s--;){var u=o[e?s:++i]
if(!1===r(a[u],u,a))break}return t}}function Ri(e){return function(t){var r=nr(t=ms(t))?lr(t):i,n=r?r[0]:t.charAt(0),a=r?vi(r,1).join(""):t.slice(1)
return n[e]()+a}}function Ii(e){return function(t){return Ot(Ys(js(t).replace(Qe,"")),e,"")}}function Oi(e){return function(){var t=arguments
switch(t.length){case 0:return new e
case 1:return new e(t[0])
case 2:return new e(t[0],t[1])
case 3:return new e(t[0],t[1],t[2])
case 4:return new e(t[0],t[1],t[2],t[3])
case 5:return new e(t[0],t[1],t[2],t[3],t[4])
case 6:return new e(t[0],t[1],t[2],t[3],t[4],t[5])
case 7:return new e(t[0],t[1],t[2],t[3],t[4],t[5],t[6])}var r=Mr(e.prototype),n=e.apply(r,t)
return Zo(n)?n:r}}function Fi(e){return function(t,r,n){var a=Ae(t)
if(!Vo(t)){var o=ia(r,3)
t=Cs(t),r=function(e){return o(a[e],e,a)}}var s=e(t,r,n)
return s>-1?a[o?t[s]:s]:i}}function Pi(e){return Zi((function(t){var r=t.length,n=r,o=Ur.prototype.thru
for(e&&t.reverse();n--;){var s=t[n]
if("function"!=typeof s)throw new Se(a)
if(o&&!u&&"wrapper"==ra(s))var u=new Ur([],!0)}for(n=u?n:r;++n<r;){var l=ra(s=t[n]),c="wrapper"==l?ta(s):i
u=c&&va(c[0])&&424==c[1]&&!c[4].length&&1==c[9]?u[ra(c[0])].apply(u,c[3]):1==s.length&&va(s)?u[l]():u.thru(s)}return function(){var e=arguments,n=e[0]
if(u&&1==e.length&&Go(n))return u.plant(n).value()
for(var i=0,a=r?t[i].apply(this,e):n;++i<r;)a=t[i].call(this,a)
return a}}))}function Ni(e,t,r,a,o,s,u,c,d,h){var f=t&l,p=1&t,g=2&t,m=24&t,v=512&t,y=g?i:Oi(e)
return function l(){for(var b=arguments.length,E=n(b),w=b;w--;)E[w]=arguments[w]
if(m)var _=na(l),T=function(e,t){for(var r=e.length,n=0;r--;)e[r]===t&&++n
return n}(E,_)
if(a&&(E=Ti(E,a,o,m)),s&&(E=Ai(E,s,u,m)),b-=T,m&&b<h){var A=or(E,_)
return Hi(e,t,Ni,l.placeholder,r,E,A,c,d,h-b)}var D=p?r:this,k=g?D[e]:e
return b=E.length,c?E=function(e,t){for(var r=e.length,n=gr(t.length,r),a=Di(e);n--;){var o=t[n]
e[n]=pa(o,r)?a[o]:i}return e}(E,c):v&&b>1&&E.reverse(),f&&d<b&&(E.length=d),this&&this!==dt&&this instanceof l&&(k=y||Oi(k)),k.apply(D,E)}}function Mi(e,t){return function(r,n){return function(e,t,r,n){return vn(e,(function(e,i,a){t(n,r(e),i,a)})),n}(r,e,t(n),{})}}function Bi(e,t){return function(r,n){var a
if(r===i&&n===i)return t
if(r!==i&&(a=r),n!==i){if(a===i)return n
"string"==typeof r||"string"==typeof n?(r=ai(r),n=ai(n)):(r=ii(r),n=ii(n)),a=e(r,n)}return a}}function Ui(e){return Zi((function(t){return t=Rt(t,Yt(ia())),Kn((function(r){var n=this
return e(t,(function(e){return Tt(e,n,r)}))}))}))}function qi(e,t){var r=(t=t===i?" ":ai(t)).length
if(r<2)return r?zn(t,e):t
var n=zn(t,ht(e/ur(t)))
return nr(t)?vi(lr(n),0,e).join(""):n.slice(0,e)}function ji(e){return function(t,r,a){return a&&"number"!=typeof a&&ga(t,r,a)&&(r=a=i),t=ds(t),r===i?(r=t,t=0):r=ds(r),function(e,t,r,i){for(var a=-1,o=pr(ht((t-e)/(r||1)),0),s=n(o);o--;)s[i?o:++a]=e,e+=r
return s}(t,r,a=a===i?t<r?1:-1:ds(a),e)}}function Gi(e){return function(t,r){return"string"==typeof t&&"string"==typeof r||(t=ps(t),r=ps(r)),e(t,r)}}function Hi(e,t,r,n,a,o,s,l,c,d){var h=8&t
t|=h?u:64,4&(t&=~(h?64:u))||(t&=-4)
var f=[e,t,a,h?o:i,h?s:i,h?i:o,h?i:s,l,c,d],p=r.apply(i,f)
return va(e)&&Da(p,f),p.placeholder=n,xa(p,e,t)}function Vi(e){var t=Te[e]
return function(e,r){if(e=ps(e),(r=null==r?0:gr(hs(r),292))&&Nt(e)){var n=(ms(e)+"e").split("e")
return+((n=(ms(t(n[0]+"e"+(+n[1]+r)))+"e").split("e"))[0]+"e"+(+n[1]-r))}return t(e)}}var zi=Tr&&1/sr(new Tr([,-0]))[1]==c?function(e){return new Tr(e)}:ou
function Ki(e){return function(t){var r=ca(t)
return r==_?ir(t):r==S?function(e){var t=-1,r=Array(e.size)
return e.forEach((function(e){r[++t]=[e,e]})),r}(t):function(e,t){return Rt(t,(function(t){return[t,e[t]]}))}(t,e(t))}}function Wi(e,t,r,o,c,d,h,f){var p=2&t
if(!p&&"function"!=typeof e)throw new Se(a)
var g=o?o.length:0
if(g||(t&=-97,o=c=i),h=h===i?h:pr(hs(h),0),f=f===i?f:hs(f),g-=c?c.length:0,64&t){var m=o,v=c
o=c=i}var y=p?i:ta(e),b=[e,t,r,o,c,m,v,d,h,f]
if(y&&function(e,t){var r=e[1],n=t[1],i=r|n,a=i<131,o=n==l&&8==r||n==l&&256==r&&e[7].length<=t[8]||384==n&&t[7].length<=t[8]&&8==r
if(!a&&!o)return e
1&n&&(e[2]=t[2],i|=1&r?0:4)
var u=t[3]
if(u){var c=e[3]
e[3]=c?Ti(c,u,t[4]):u,e[4]=c?or(e[3],s):t[4]}(u=t[5])&&(c=e[5],e[5]=c?Ai(c,u,t[6]):u,e[6]=c?or(e[5],s):t[6]),(u=t[7])&&(e[7]=u),n&l&&(e[8]=null==e[8]?t[8]:gr(e[8],t[8])),null==e[9]&&(e[9]=t[9]),e[0]=t[0],e[1]=i}(b,y),e=b[0],t=b[1],r=b[2],o=b[3],c=b[4],!(f=b[9]=b[9]===i?p?0:e.length:pr(b[9]-g,0))&&24&t&&(t&=-25),t&&1!=t)E=8==t||16==t?function(e,t,r){var a=Oi(e)
return function o(){for(var s=arguments.length,u=n(s),l=s,c=na(o);l--;)u[l]=arguments[l]
var d=s<3&&u[0]!==c&&u[s-1]!==c?[]:or(u,c)
return(s-=d.length)<r?Hi(e,t,Ni,o.placeholder,i,u,d,i,i,r-s):Tt(this&&this!==dt&&this instanceof o?a:e,this,u)}}(e,t,f):t!=u&&33!=t||c.length?Ni.apply(i,b):function(e,t,r,i){var a=1&t,o=Oi(e)
return function t(){for(var s=-1,u=arguments.length,l=-1,c=i.length,d=n(c+u),h=this&&this!==dt&&this instanceof t?o:e;++l<c;)d[l]=i[l]
for(;u--;)d[l++]=arguments[++s]
return Tt(h,a?r:this,d)}}(e,t,r,o)
else var E=function(e,t,r){var n=1&t,i=Oi(e)
return function t(){return(this&&this!==dt&&this instanceof t?i:e).apply(n?r:this,arguments)}}(e,t,r)
return xa((y?Qn:Da)(E,b),e,t)}function $i(e,t,r,n){return e===i||Bo(e,Le[r])&&!Oe.call(n,r)?t:e}function Yi(e,t,r,n,a,o){return Zo(e)&&Zo(t)&&(o.set(t,e),Bn(e,t,i,Yi,o),o.delete(t)),e}function Qi(e){return rs(e)?i:e}function Xi(e,t,r,n,a,o){var s=1&r,u=e.length,l=t.length
if(u!=l&&!(s&&l>u))return!1
var c=o.get(e),d=o.get(t)
if(c&&d)return c==t&&d==e
var h=-1,f=!0,p=2&r?new Vr:i
for(o.set(e,t),o.set(t,e);++h<u;){var g=e[h],m=t[h]
if(n)var v=s?n(m,g,h,t,e,o):n(g,m,h,e,t,o)
if(v!==i){if(v)continue
f=!1
break}if(p){if(!Pt(t,(function(e,t){if(!Xt(p,t)&&(g===e||a(g,e,r,n,o)))return p.push(t)}))){f=!1
break}}else if(g!==m&&!a(g,m,r,n,o)){f=!1
break}}return o.delete(e),o.delete(t),f}function Zi(e){return Sa(_a(e,i,Ga),e+"")}function Ji(e){return wn(e,Cs,ua)}function ea(e){return wn(e,Ls,la)}var ta=kr?function(e){return kr.get(e)}:ou
function ra(e){for(var t=e.name+"",r=Sr[t],n=Oe.call(Sr,t)?r.length:0;n--;){var i=r[n],a=i.func
if(null==a||a==e)return i.name}return t}function na(e){return(Oe.call(Nr,"placeholder")?Nr:e).placeholder}function ia(){var e=Nr.iteratee||ru
return e=e===ru?In:e,arguments.length?e(arguments[0],arguments[1]):e}function aa(e,t){var r,n,i=e.__data__
return("string"==(n=typeof(r=t))||"number"==n||"symbol"==n||"boolean"==n?"__proto__"!==r:null===r)?i["string"==typeof t?"string":"hash"]:i.map}function oa(e){for(var t=Cs(e),r=t.length;r--;){var n=t[r],i=e[n]
t[r]=[n,i,Ea(i)]}return t}function sa(e,t){var r=function(e,t){return null==e?i:e[t]}(e,t)
return Rn(r)?r:i}var ua=gt?function(e){return null==e?[]:(e=Ae(e),xt(gt(e),(function(t){return Ke.call(e,t)})))}:fu,la=gt?function(e){for(var t=[];e;)It(t,ua(e)),e=Ve(e)
return t}:fu,ca=_n
function da(e,t,r){for(var n=-1,i=(t=gi(t,e)).length,a=!1;++n<i;){var o=Fa(t[n])
if(!(a=null!=e&&r(e,o)))break
e=e[o]}return a||++n!=i?a:!!(i=null==e?0:e.length)&&Xo(i)&&pa(o,i)&&(Go(e)||jo(e))}function ha(e){return"function"!=typeof e.constructor||ba(e)?{}:Mr(Ve(e))}function fa(e){return Go(e)||jo(e)||!!($e&&e&&e[$e])}function pa(e,t){var r=typeof e
return!!(t=null==t?d:t)&&("number"==r||"symbol"!=r&&ve.test(e))&&e>-1&&e%1==0&&e<t}function ga(e,t,r){if(!Zo(r))return!1
var n=typeof t
return!!("number"==n?Vo(r)&&pa(t,r.length):"string"==n&&t in r)&&Bo(r[t],e)}function ma(e,t){if(Go(e))return!1
var r=typeof e
return!("number"!=r&&"symbol"!=r&&"boolean"!=r&&null!=e&&!os(e))||J.test(e)||!Z.test(e)||null!=t&&e in Ae(t)}function va(e){var t=ra(e),r=Nr[t]
if("function"!=typeof r||!(t in qr.prototype))return!1
if(e===r)return!0
var n=ta(r)
return!!n&&e===n[0]}(Er&&ca(new Er(new ArrayBuffer(1)))!=I||wr&&ca(new wr)!=_||_r&&ca(_r.resolve())!=D||Tr&&ca(new Tr)!=S||Ar&&ca(new Ar)!=L)&&(ca=function(e){var t=_n(e),r=t==A?e.constructor:i,n=r?Pa(r):""
if(n)switch(n){case xr:return I
case Cr:return _
case Lr:return D
case Rr:return S
case Ir:return L}return t})
var ya=Re?Yo:pu
function ba(e){var t=e&&e.constructor
return e===("function"==typeof t&&t.prototype||Le)}function Ea(e){return e==e&&!Zo(e)}function wa(e,t){return function(r){return null!=r&&r[e]===t&&(t!==i||e in Ae(r))}}function _a(e,t,r){return t=pr(t===i?e.length-1:t,0),function(){for(var i=arguments,a=-1,o=pr(i.length-t,0),s=n(o);++a<o;)s[a]=i[t+a]
a=-1
for(var u=n(t+1);++a<t;)u[a]=i[a]
return u[t]=r(s),Tt(e,this,u)}}function Ta(e,t){return t.length<2?e:En(e,Jn(t,0,-1))}function Aa(e,t){if(("constructor"!==t||"function"!=typeof e[t])&&"__proto__"!=t)return e[t]}var Da=Ca(Qn),ka=ct||function(e,t){return dt.setTimeout(e,t)},Sa=Ca(Xn)
function xa(e,t,r){var n=t+""
return Sa(e,function(e,t){var r=t.length
if(!r)return e
var n=r-1
return t[n]=(r>1?"& ":"")+t[n],t=t.join(r>2?", ":" "),e.replace(ae,"{\n/* [wrapped with "+t+"] */\n")}(n,function(e,t){return Dt(p,(function(r){var n="_."+r[0]
t&r[1]&&!Ct(e,n)&&e.push(n)})),e.sort()}(function(e){var t=e.match(oe)
return t?t[1].split(se):[]}(n),r)))}function Ca(e){var t=0,r=0
return function(){var n=mr(),a=16-(n-r)
if(r=n,a>0){if(++t>=800)return arguments[0]}else t=0
return e.apply(i,arguments)}}function La(e,t){var r=-1,n=e.length,a=n-1
for(t=t===i?n:t;++r<t;){var o=Vn(r,a),s=e[o]
e[o]=e[r],e[r]=s}return e.length=t,e}var Ra,Ia,Oa=(Ra=Io((function(e){var t=[]
return 46===e.charCodeAt(0)&&t.push(""),e.replace(ee,(function(e,r,n,i){t.push(n?i.replace(ce,"$1"):r||e)})),t}),(function(e){return 500===Ia.size&&Ia.clear(),e})),Ia=Ra.cache,Ra)
function Fa(e){if("string"==typeof e||os(e))return e
var t=e+""
return"0"==t&&1/e==-1/0?"-0":t}function Pa(e){if(null!=e){try{return Ie.call(e)}catch(e){}try{return e+""}catch(e){}}return""}function Na(e){if(e instanceof qr)return e.clone()
var t=new Ur(e.__wrapped__,e.__chain__)
return t.__actions__=Di(e.__actions__),t.__index__=e.__index__,t.__values__=e.__values__,t}var Ma=Kn((function(e,t){return zo(e)?un(e,pn(t,1,zo,!0)):[]})),Ba=Kn((function(e,t){var r=Wa(t)
return zo(r)&&(r=i),zo(e)?un(e,pn(t,1,zo,!0),ia(r,2)):[]})),Ua=Kn((function(e,t){var r=Wa(t)
return zo(r)&&(r=i),zo(e)?un(e,pn(t,1,zo,!0),i,r):[]}))
function qa(e,t,r){var n=null==e?0:e.length
if(!n)return-1
var i=null==r?0:hs(r)
return i<0&&(i=pr(n+i,0)),Bt(e,ia(t,3),i)}function ja(e,t,r){var n=null==e?0:e.length
if(!n)return-1
var a=n-1
return r!==i&&(a=hs(r),a=r<0?pr(n+a,0):gr(a,n-1)),Bt(e,ia(t,3),a,!0)}function Ga(e){return null!=e&&e.length?pn(e,1):[]}function Ha(e){return e&&e.length?e[0]:i}var Va=Kn((function(e){var t=Rt(e,fi)
return t.length&&t[0]===e[0]?kn(t):[]})),za=Kn((function(e){var t=Wa(e),r=Rt(e,fi)
return t===Wa(r)?t=i:r.pop(),r.length&&r[0]===e[0]?kn(r,ia(t,2)):[]})),Ka=Kn((function(e){var t=Wa(e),r=Rt(e,fi)
return(t="function"==typeof t?t:i)&&r.pop(),r.length&&r[0]===e[0]?kn(r,i,t):[]}))
function Wa(e){var t=null==e?0:e.length
return t?e[t-1]:i}var $a=Kn(Ya)
function Ya(e,t){return e&&e.length&&t&&t.length?Gn(e,t):e}var Qa=Zi((function(e,t){var r=null==e?0:e.length,n=rn(e,t)
return Hn(e,Rt(t,(function(e){return pa(e,r)?+e:e})).sort(_i)),n}))
function Xa(e){return null==e?e:br.call(e)}var Za=Kn((function(e){return oi(pn(e,1,zo,!0))})),Ja=Kn((function(e){var t=Wa(e)
return zo(t)&&(t=i),oi(pn(e,1,zo,!0),ia(t,2))})),eo=Kn((function(e){var t=Wa(e)
return t="function"==typeof t?t:i,oi(pn(e,1,zo,!0),i,t)}))
function to(e){if(!e||!e.length)return[]
var t=0
return e=xt(e,(function(e){if(zo(e))return t=pr(e.length,t),!0})),Wt(t,(function(t){return Rt(e,Ht(t))}))}function ro(e,t){if(!e||!e.length)return[]
var r=to(e)
return null==t?r:Rt(r,(function(e){return Tt(t,i,e)}))}var no=Kn((function(e,t){return zo(e)?un(e,t):[]})),io=Kn((function(e){return di(xt(e,zo))})),ao=Kn((function(e){var t=Wa(e)
return zo(t)&&(t=i),di(xt(e,zo),ia(t,2))})),oo=Kn((function(e){var t=Wa(e)
return t="function"==typeof t?t:i,di(xt(e,zo),i,t)})),so=Kn(to),uo=Kn((function(e){var t=e.length,r=t>1?e[t-1]:i
return r="function"==typeof r?(e.pop(),r):i,ro(e,r)}))
function lo(e){var t=Nr(e)
return t.__chain__=!0,t}function co(e,t){return t(e)}var ho=Zi((function(e){var t=e.length,r=t?e[0]:0,n=this.__wrapped__,a=function(t){return rn(t,e)}
return!(t>1||this.__actions__.length)&&n instanceof qr&&pa(r)?((n=n.slice(r,+r+(t?1:0))).__actions__.push({func:co,args:[a],thisArg:i}),new Ur(n,this.__chain__).thru((function(e){return t&&!e.length&&e.push(i),e}))):this.thru(a)})),fo=Si((function(e,t,r){Oe.call(e,r)?++e[r]:tn(e,r,1)})),po=Fi(qa),go=Fi(ja)
function mo(e,t){return(Go(e)?Dt:ln)(e,ia(t,3))}function vo(e,t){return(Go(e)?kt:cn)(e,ia(t,3))}var yo=Si((function(e,t,r){Oe.call(e,r)?e[r].push(t):tn(e,r,[t])})),bo=Kn((function(e,t,r){var i=-1,a="function"==typeof t,o=Vo(e)?n(e.length):[]
return ln(e,(function(e){o[++i]=a?Tt(t,e,r):Sn(e,t,r)})),o})),Eo=Si((function(e,t,r){tn(e,r,t)}))
function wo(e,t){return(Go(e)?Rt:Pn)(e,ia(t,3))}var _o=Si((function(e,t,r){e[r?0:1].push(t)}),(function(){return[[],[]]})),To=Kn((function(e,t){if(null==e)return[]
var r=t.length
return r>1&&ga(e,t[0],t[1])?t=[]:r>2&&ga(t[0],t[1],t[2])&&(t=[t[0]]),qn(e,pn(t,1),[])})),Ao=lt||function(){return dt.Date.now()}
function Do(e,t,r){return t=r?i:t,t=e&&null==t?e.length:t,Wi(e,l,i,i,i,i,t)}function ko(e,t){var r
if("function"!=typeof t)throw new Se(a)
return e=hs(e),function(){return--e>0&&(r=t.apply(this,arguments)),e<=1&&(t=i),r}}var So=Kn((function(e,t,r){var n=1
if(r.length){var i=or(r,na(So))
n|=u}return Wi(e,n,t,r,i)})),xo=Kn((function(e,t,r){var n=3
if(r.length){var i=or(r,na(xo))
n|=u}return Wi(t,n,e,r,i)}))
function Co(e,t,r){var n,o,s,u,l,c,d=0,h=!1,f=!1,p=!0
if("function"!=typeof e)throw new Se(a)
function g(t){var r=n,a=o
return n=o=i,d=t,u=e.apply(a,r)}function m(e){var r=e-c
return c===i||r>=t||r<0||f&&e-d>=s}function v(){var e=Ao()
if(m(e))return y(e)
l=ka(v,function(e){var r=t-(e-c)
return f?gr(r,s-(e-d)):r}(e))}function y(e){return l=i,p&&n?g(e):(n=o=i,u)}function b(){var e=Ao(),r=m(e)
if(n=arguments,o=this,c=e,r){if(l===i)return function(e){return d=e,l=ka(v,t),h?g(e):u}(c)
if(f)return yi(l),l=ka(v,t),g(c)}return l===i&&(l=ka(v,t)),u}return t=ps(t)||0,Zo(r)&&(h=!!r.leading,s=(f="maxWait"in r)?pr(ps(r.maxWait)||0,t):s,p="trailing"in r?!!r.trailing:p),b.cancel=function(){l!==i&&yi(l),d=0,n=c=o=l=i},b.flush=function(){return l===i?u:y(Ao())},b}var Lo=Kn((function(e,t){return sn(e,1,t)})),Ro=Kn((function(e,t,r){return sn(e,ps(t)||0,r)}))
function Io(e,t){if("function"!=typeof e||null!=t&&"function"!=typeof t)throw new Se(a)
var r=function(){var n=arguments,i=t?t.apply(this,n):n[0],a=r.cache
if(a.has(i))return a.get(i)
var o=e.apply(this,n)
return r.cache=a.set(i,o)||a,o}
return r.cache=new(Io.Cache||Hr),r}function Oo(e){if("function"!=typeof e)throw new Se(a)
return function(){var t=arguments
switch(t.length){case 0:return!e.call(this)
case 1:return!e.call(this,t[0])
case 2:return!e.call(this,t[0],t[1])
case 3:return!e.call(this,t[0],t[1],t[2])}return!e.apply(this,t)}}Io.Cache=Hr
var Fo=mi((function(e,t){var r=(t=1==t.length&&Go(t[0])?Rt(t[0],Yt(ia())):Rt(pn(t,1),Yt(ia()))).length
return Kn((function(n){for(var i=-1,a=gr(n.length,r);++i<a;)n[i]=t[i].call(this,n[i])
return Tt(e,this,n)}))})),Po=Kn((function(e,t){var r=or(t,na(Po))
return Wi(e,u,i,t,r)})),No=Kn((function(e,t){var r=or(t,na(No))
return Wi(e,64,i,t,r)})),Mo=Zi((function(e,t){return Wi(e,256,i,i,i,t)}))
function Bo(e,t){return e===t||e!=e&&t!=t}var Uo=Gi(Tn),qo=Gi((function(e,t){return e>=t})),jo=xn(function(){return arguments}())?xn:function(e){return Jo(e)&&Oe.call(e,"callee")&&!Ke.call(e,"callee")},Go=n.isArray,Ho=vt?Yt(vt):function(e){return Jo(e)&&_n(e)==R}
function Vo(e){return null!=e&&Xo(e.length)&&!Yo(e)}function zo(e){return Jo(e)&&Vo(e)}var Ko=mt||pu,Wo=yt?Yt(yt):function(e){return Jo(e)&&_n(e)==y}
function $o(e){if(!Jo(e))return!1
var t=_n(e)
return t==b||"[object DOMException]"==t||"string"==typeof e.message&&"string"==typeof e.name&&!rs(e)}function Yo(e){if(!Zo(e))return!1
var t=_n(e)
return t==E||t==w||"[object AsyncFunction]"==t||"[object Proxy]"==t}function Qo(e){return"number"==typeof e&&e==hs(e)}function Xo(e){return"number"==typeof e&&e>-1&&e%1==0&&e<=d}function Zo(e){var t=typeof e
return null!=e&&("object"==t||"function"==t)}function Jo(e){return null!=e&&"object"==typeof e}var es=bt?Yt(bt):function(e){return Jo(e)&&ca(e)==_}
function ts(e){return"number"==typeof e||Jo(e)&&_n(e)==T}function rs(e){if(!Jo(e)||_n(e)!=A)return!1
var t=Ve(e)
if(null===t)return!0
var r=Oe.call(t,"constructor")&&t.constructor
return"function"==typeof r&&r instanceof r&&Ie.call(r)==Me}var ns=Et?Yt(Et):function(e){return Jo(e)&&_n(e)==k},is=wt?Yt(wt):function(e){return Jo(e)&&ca(e)==S}
function as(e){return"string"==typeof e||!Go(e)&&Jo(e)&&_n(e)==x}function os(e){return"symbol"==typeof e||Jo(e)&&_n(e)==C}var ss=_t?Yt(_t):function(e){return Jo(e)&&Xo(e.length)&&!!it[_n(e)]},us=Gi(Fn),ls=Gi((function(e,t){return e<=t}))
function cs(e){if(!e)return[]
if(Vo(e))return as(e)?lr(e):Di(e)
if(Ye&&e[Ye])return function(e){for(var t,r=[];!(t=e.next()).done;)r.push(t.value)
return r}(e[Ye]())
var t=ca(e)
return(t==_?ir:t==S?sr:Bs)(e)}function ds(e){return e?(e=ps(e))===c||e===-1/0?17976931348623157e292*(e<0?-1:1):e==e?e:0:0===e?e:0}function hs(e){var t=ds(e),r=t%1
return t==t?r?t-r:t:0}function fs(e){return e?nn(hs(e),0,f):0}function ps(e){if("number"==typeof e)return e
if(os(e))return h
if(Zo(e)){var t="function"==typeof e.valueOf?e.valueOf():e
e=Zo(t)?t+"":t}if("string"!=typeof e)return 0===e?e:+e
e=$t(e)
var r=pe.test(e)
return r||me.test(e)?ut(e.slice(2),r?2:8):fe.test(e)?h:+e}function gs(e){return ki(e,Ls(e))}function ms(e){return null==e?"":ai(e)}var vs=xi((function(e,t){if(ba(t)||Vo(t))ki(t,Cs(t),e)
else for(var r in t)Oe.call(t,r)&&Xr(e,r,t[r])})),ys=xi((function(e,t){ki(t,Ls(t),e)})),bs=xi((function(e,t,r,n){ki(t,Ls(t),e,n)})),Es=xi((function(e,t,r,n){ki(t,Cs(t),e,n)})),ws=Zi(rn),_s=Kn((function(e,t){e=Ae(e)
var r=-1,n=t.length,a=n>2?t[2]:i
for(a&&ga(t[0],t[1],a)&&(n=1);++r<n;)for(var o=t[r],s=Ls(o),u=-1,l=s.length;++u<l;){var c=s[u],d=e[c];(d===i||Bo(d,Le[c])&&!Oe.call(e,c))&&(e[c]=o[c])}return e})),Ts=Kn((function(e){return e.push(i,Yi),Tt(Is,i,e)}))
function As(e,t,r){var n=null==e?i:En(e,t)
return n===i?r:n}function Ds(e,t){return null!=e&&da(e,t,Dn)}var ks=Mi((function(e,t,r){null!=t&&"function"!=typeof t.toString&&(t=Ne.call(t)),e[t]=r}),Zs(tu)),Ss=Mi((function(e,t,r){null!=t&&"function"!=typeof t.toString&&(t=Ne.call(t)),Oe.call(e,t)?e[t].push(r):e[t]=[r]}),ia),xs=Kn(Sn)
function Cs(e){return Vo(e)?Kr(e):On(e)}function Ls(e){return Vo(e)?Kr(e,!0):function(e){if(!Zo(e))return function(e){var t=[]
if(null!=e)for(var r in Ae(e))t.push(r)
return t}(e)
var t=ba(e),r=[]
for(var n in e)("constructor"!=n||!t&&Oe.call(e,n))&&r.push(n)
return r}(e)}var Rs=xi((function(e,t,r){Bn(e,t,r)})),Is=xi((function(e,t,r,n){Bn(e,t,r,n)})),Os=Zi((function(e,t){var r={}
if(null==e)return r
var n=!1
t=Rt(t,(function(t){return t=gi(t,e),n||(n=t.length>1),t})),ki(e,ea(e),r),n&&(r=an(r,7,Qi))
for(var i=t.length;i--;)si(r,t[i])
return r})),Fs=Zi((function(e,t){return null==e?{}:function(e,t){return jn(e,t,(function(t,r){return Ds(e,r)}))}(e,t)}))
function Ps(e,t){if(null==e)return{}
var r=Rt(ea(e),(function(e){return[e]}))
return t=ia(t),jn(e,r,(function(e,r){return t(e,r[0])}))}var Ns=Ki(Cs),Ms=Ki(Ls)
function Bs(e){return null==e?[]:Qt(e,Cs(e))}var Us=Ii((function(e,t,r){return t=t.toLowerCase(),e+(r?qs(t):t)}))
function qs(e){return $s(ms(e).toLowerCase())}function js(e){return(e=ms(e))&&e.replace(ye,er).replace(Xe,"")}var Gs=Ii((function(e,t,r){return e+(r?"-":"")+t.toLowerCase()})),Hs=Ii((function(e,t,r){return e+(r?" ":"")+t.toLowerCase()})),Vs=Ri("toLowerCase"),zs=Ii((function(e,t,r){return e+(r?"_":"")+t.toLowerCase()})),Ks=Ii((function(e,t,r){return e+(r?" ":"")+$s(t)})),Ws=Ii((function(e,t,r){return e+(r?" ":"")+t.toUpperCase()})),$s=Ri("toUpperCase")
function Ys(e,t,r){return e=ms(e),(t=r?i:t)===i?function(e){return tt.test(e)}(e)?function(e){return e.match(Je)||[]}(e):function(e){return e.match(ue)||[]}(e):e.match(t)||[]}var Qs=Kn((function(e,t){try{return Tt(e,i,t)}catch(e){return $o(e)?e:new we(e)}})),Xs=Zi((function(e,t){return Dt(t,(function(t){t=Fa(t),tn(e,t,So(e[t],e))})),e}))
function Zs(e){return function(){return e}}var Js=Pi(),eu=Pi(!0)
function tu(e){return e}function ru(e){return In("function"==typeof e?e:an(e,1))}var nu=Kn((function(e,t){return function(r){return Sn(r,e,t)}})),iu=Kn((function(e,t){return function(r){return Sn(e,r,t)}}))
function au(e,t,r){var n=Cs(t),i=bn(t,n)
null!=r||Zo(t)&&(i.length||!n.length)||(r=t,t=e,e=this,i=bn(t,Cs(t)))
var a=!(Zo(r)&&"chain"in r&&!r.chain),o=Yo(e)
return Dt(i,(function(r){var n=t[r]
e[r]=n,o&&(e.prototype[r]=function(){var t=this.__chain__
if(a||t){var r=e(this.__wrapped__)
return(r.__actions__=Di(this.__actions__)).push({func:n,args:arguments,thisArg:e}),r.__chain__=t,r}return n.apply(e,It([this.value()],arguments))})})),e}function ou(){}var su=Ui(Rt),uu=Ui(St),lu=Ui(Pt)
function cu(e){return ma(e)?Ht(Fa(e)):function(e){return function(t){return En(t,e)}}(e)}var du=ji(),hu=ji(!0)
function fu(){return[]}function pu(){return!1}var gu,mu=Bi((function(e,t){return e+t}),0),vu=Vi("ceil"),yu=Bi((function(e,t){return e/t}),1),bu=Vi("floor"),Eu=Bi((function(e,t){return e*t}),1),wu=Vi("round"),_u=Bi((function(e,t){return e-t}),0)
return Nr.after=function(e,t){if("function"!=typeof t)throw new Se(a)
return e=hs(e),function(){if(--e<1)return t.apply(this,arguments)}},Nr.ary=Do,Nr.assign=vs,Nr.assignIn=ys,Nr.assignInWith=bs,Nr.assignWith=Es,Nr.at=ws,Nr.before=ko,Nr.bind=So,Nr.bindAll=Xs,Nr.bindKey=xo,Nr.castArray=function(){if(!arguments.length)return[]
var e=arguments[0]
return Go(e)?e:[e]},Nr.chain=lo,Nr.chunk=function(e,t,r){t=(r?ga(e,t,r):t===i)?1:pr(hs(t),0)
var a=null==e?0:e.length
if(!a||t<1)return[]
for(var o=0,s=0,u=n(ht(a/t));o<a;)u[s++]=Jn(e,o,o+=t)
return u},Nr.compact=function(e){for(var t=-1,r=null==e?0:e.length,n=0,i=[];++t<r;){var a=e[t]
a&&(i[n++]=a)}return i},Nr.concat=function(){var e=arguments.length
if(!e)return[]
for(var t=n(e-1),r=arguments[0],i=e;i--;)t[i-1]=arguments[i]
return It(Go(r)?Di(r):[r],pn(t,1))},Nr.cond=function(e){var t=null==e?0:e.length,r=ia()
return e=t?Rt(e,(function(e){if("function"!=typeof e[1])throw new Se(a)
return[r(e[0]),e[1]]})):[],Kn((function(r){for(var n=-1;++n<t;){var i=e[n]
if(Tt(i[0],this,r))return Tt(i[1],this,r)}}))},Nr.conforms=function(e){return function(e){var t=Cs(e)
return function(r){return on(r,e,t)}}(an(e,1))},Nr.constant=Zs,Nr.countBy=fo,Nr.create=function(e,t){var r=Mr(e)
return null==t?r:en(r,t)},Nr.curry=function e(t,r,n){var a=Wi(t,8,i,i,i,i,i,r=n?i:r)
return a.placeholder=e.placeholder,a},Nr.curryRight=function e(t,r,n){var a=Wi(t,16,i,i,i,i,i,r=n?i:r)
return a.placeholder=e.placeholder,a},Nr.debounce=Co,Nr.defaults=_s,Nr.defaultsDeep=Ts,Nr.defer=Lo,Nr.delay=Ro,Nr.difference=Ma,Nr.differenceBy=Ba,Nr.differenceWith=Ua,Nr.drop=function(e,t,r){var n=null==e?0:e.length
return n?Jn(e,(t=r||t===i?1:hs(t))<0?0:t,n):[]},Nr.dropRight=function(e,t,r){var n=null==e?0:e.length
return n?Jn(e,0,(t=n-(t=r||t===i?1:hs(t)))<0?0:t):[]},Nr.dropRightWhile=function(e,t){return e&&e.length?li(e,ia(t,3),!0,!0):[]},Nr.dropWhile=function(e,t){return e&&e.length?li(e,ia(t,3),!0):[]},Nr.fill=function(e,t,r,n){var a=null==e?0:e.length
return a?(r&&"number"!=typeof r&&ga(e,t,r)&&(r=0,n=a),function(e,t,r,n){var a=e.length
for((r=hs(r))<0&&(r=-r>a?0:a+r),(n=n===i||n>a?a:hs(n))<0&&(n+=a),n=r>n?0:fs(n);r<n;)e[r++]=t
return e}(e,t,r,n)):[]},Nr.filter=function(e,t){return(Go(e)?xt:fn)(e,ia(t,3))},Nr.flatMap=function(e,t){return pn(wo(e,t),1)},Nr.flatMapDeep=function(e,t){return pn(wo(e,t),c)},Nr.flatMapDepth=function(e,t,r){return r=r===i?1:hs(r),pn(wo(e,t),r)},Nr.flatten=Ga,Nr.flattenDeep=function(e){return null!=e&&e.length?pn(e,c):[]},Nr.flattenDepth=function(e,t){return null!=e&&e.length?pn(e,t=t===i?1:hs(t)):[]},Nr.flip=function(e){return Wi(e,512)},Nr.flow=Js,Nr.flowRight=eu,Nr.fromPairs=function(e){for(var t=-1,r=null==e?0:e.length,n={};++t<r;){var i=e[t]
n[i[0]]=i[1]}return n},Nr.functions=function(e){return null==e?[]:bn(e,Cs(e))},Nr.functionsIn=function(e){return null==e?[]:bn(e,Ls(e))},Nr.groupBy=yo,Nr.initial=function(e){return null!=e&&e.length?Jn(e,0,-1):[]},Nr.intersection=Va,Nr.intersectionBy=za,Nr.intersectionWith=Ka,Nr.invert=ks,Nr.invertBy=Ss,Nr.invokeMap=bo,Nr.iteratee=ru,Nr.keyBy=Eo,Nr.keys=Cs,Nr.keysIn=Ls,Nr.map=wo,Nr.mapKeys=function(e,t){var r={}
return t=ia(t,3),vn(e,(function(e,n,i){tn(r,t(e,n,i),e)})),r},Nr.mapValues=function(e,t){var r={}
return t=ia(t,3),vn(e,(function(e,n,i){tn(r,n,t(e,n,i))})),r},Nr.matches=function(e){return Nn(an(e,1))},Nr.matchesProperty=function(e,t){return Mn(e,an(t,1))},Nr.memoize=Io,Nr.merge=Rs,Nr.mergeWith=Is,Nr.method=nu,Nr.methodOf=iu,Nr.mixin=au,Nr.negate=Oo,Nr.nthArg=function(e){return e=hs(e),Kn((function(t){return Un(t,e)}))},Nr.omit=Os,Nr.omitBy=function(e,t){return Ps(e,Oo(ia(t)))},Nr.once=function(e){return ko(2,e)},Nr.orderBy=function(e,t,r,n){return null==e?[]:(Go(t)||(t=null==t?[]:[t]),Go(r=n?i:r)||(r=null==r?[]:[r]),qn(e,t,r))},Nr.over=su,Nr.overArgs=Fo,Nr.overEvery=uu,Nr.overSome=lu,Nr.partial=Po,Nr.partialRight=No,Nr.partition=_o,Nr.pick=Fs,Nr.pickBy=Ps,Nr.property=cu,Nr.propertyOf=function(e){return function(t){return null==e?i:En(e,t)}},Nr.pull=$a,Nr.pullAll=Ya,Nr.pullAllBy=function(e,t,r){return e&&e.length&&t&&t.length?Gn(e,t,ia(r,2)):e},Nr.pullAllWith=function(e,t,r){return e&&e.length&&t&&t.length?Gn(e,t,i,r):e},Nr.pullAt=Qa,Nr.range=du,Nr.rangeRight=hu,Nr.rearg=Mo,Nr.reject=function(e,t){return(Go(e)?xt:fn)(e,Oo(ia(t,3)))},Nr.remove=function(e,t){var r=[]
if(!e||!e.length)return r
var n=-1,i=[],a=e.length
for(t=ia(t,3);++n<a;){var o=e[n]
t(o,n,e)&&(r.push(o),i.push(n))}return Hn(e,i),r},Nr.rest=function(e,t){if("function"!=typeof e)throw new Se(a)
return Kn(e,t=t===i?t:hs(t))},Nr.reverse=Xa,Nr.sampleSize=function(e,t,r){return t=(r?ga(e,t,r):t===i)?1:hs(t),(Go(e)?$r:$n)(e,t)},Nr.set=function(e,t,r){return null==e?e:Yn(e,t,r)},Nr.setWith=function(e,t,r,n){return n="function"==typeof n?n:i,null==e?e:Yn(e,t,r,n)},Nr.shuffle=function(e){return(Go(e)?Yr:Zn)(e)},Nr.slice=function(e,t,r){var n=null==e?0:e.length
return n?(r&&"number"!=typeof r&&ga(e,t,r)?(t=0,r=n):(t=null==t?0:hs(t),r=r===i?n:hs(r)),Jn(e,t,r)):[]},Nr.sortBy=To,Nr.sortedUniq=function(e){return e&&e.length?ni(e):[]},Nr.sortedUniqBy=function(e,t){return e&&e.length?ni(e,ia(t,2)):[]},Nr.split=function(e,t,r){return r&&"number"!=typeof r&&ga(e,t,r)&&(t=r=i),(r=r===i?f:r>>>0)?(e=ms(e))&&("string"==typeof t||null!=t&&!ns(t))&&!(t=ai(t))&&nr(e)?vi(lr(e),0,r):e.split(t,r):[]},Nr.spread=function(e,t){if("function"!=typeof e)throw new Se(a)
return t=null==t?0:pr(hs(t),0),Kn((function(r){var n=r[t],i=vi(r,0,t)
return n&&It(i,n),Tt(e,this,i)}))},Nr.tail=function(e){var t=null==e?0:e.length
return t?Jn(e,1,t):[]},Nr.take=function(e,t,r){return e&&e.length?Jn(e,0,(t=r||t===i?1:hs(t))<0?0:t):[]},Nr.takeRight=function(e,t,r){var n=null==e?0:e.length
return n?Jn(e,(t=n-(t=r||t===i?1:hs(t)))<0?0:t,n):[]},Nr.takeRightWhile=function(e,t){return e&&e.length?li(e,ia(t,3),!1,!0):[]},Nr.takeWhile=function(e,t){return e&&e.length?li(e,ia(t,3)):[]},Nr.tap=function(e,t){return t(e),e},Nr.throttle=function(e,t,r){var n=!0,i=!0
if("function"!=typeof e)throw new Se(a)
return Zo(r)&&(n="leading"in r?!!r.leading:n,i="trailing"in r?!!r.trailing:i),Co(e,t,{leading:n,maxWait:t,trailing:i})},Nr.thru=co,Nr.toArray=cs,Nr.toPairs=Ns,Nr.toPairsIn=Ms,Nr.toPath=function(e){return Go(e)?Rt(e,Fa):os(e)?[e]:Di(Oa(ms(e)))},Nr.toPlainObject=gs,Nr.transform=function(e,t,r){var n=Go(e),i=n||Ko(e)||ss(e)
if(t=ia(t,4),null==r){var a=e&&e.constructor
r=i?n?new a:[]:Zo(e)&&Yo(a)?Mr(Ve(e)):{}}return(i?Dt:vn)(e,(function(e,n,i){return t(r,e,n,i)})),r},Nr.unary=function(e){return Do(e,1)},Nr.union=Za,Nr.unionBy=Ja,Nr.unionWith=eo,Nr.uniq=function(e){return e&&e.length?oi(e):[]},Nr.uniqBy=function(e,t){return e&&e.length?oi(e,ia(t,2)):[]},Nr.uniqWith=function(e,t){return t="function"==typeof t?t:i,e&&e.length?oi(e,i,t):[]},Nr.unset=function(e,t){return null==e||si(e,t)},Nr.unzip=to,Nr.unzipWith=ro,Nr.update=function(e,t,r){return null==e?e:ui(e,t,pi(r))},Nr.updateWith=function(e,t,r,n){return n="function"==typeof n?n:i,null==e?e:ui(e,t,pi(r),n)},Nr.values=Bs,Nr.valuesIn=function(e){return null==e?[]:Qt(e,Ls(e))},Nr.without=no,Nr.words=Ys,Nr.wrap=function(e,t){return Po(pi(t),e)},Nr.xor=io,Nr.xorBy=ao,Nr.xorWith=oo,Nr.zip=so,Nr.zipObject=function(e,t){return hi(e||[],t||[],Xr)},Nr.zipObjectDeep=function(e,t){return hi(e||[],t||[],Yn)},Nr.zipWith=uo,Nr.entries=Ns,Nr.entriesIn=Ms,Nr.extend=ys,Nr.extendWith=bs,au(Nr,Nr),Nr.add=mu,Nr.attempt=Qs,Nr.camelCase=Us,Nr.capitalize=qs,Nr.ceil=vu,Nr.clamp=function(e,t,r){return r===i&&(r=t,t=i),r!==i&&(r=(r=ps(r))==r?r:0),t!==i&&(t=(t=ps(t))==t?t:0),nn(ps(e),t,r)},Nr.clone=function(e){return an(e,4)},Nr.cloneDeep=function(e){return an(e,5)},Nr.cloneDeepWith=function(e,t){return an(e,5,t="function"==typeof t?t:i)},Nr.cloneWith=function(e,t){return an(e,4,t="function"==typeof t?t:i)},Nr.conformsTo=function(e,t){return null==t||on(e,t,Cs(t))},Nr.deburr=js,Nr.defaultTo=function(e,t){return null==e||e!=e?t:e},Nr.divide=yu,Nr.endsWith=function(e,t,r){e=ms(e),t=ai(t)
var n=e.length,a=r=r===i?n:nn(hs(r),0,n)
return(r-=t.length)>=0&&e.slice(r,a)==t},Nr.eq=Bo,Nr.escape=function(e){return(e=ms(e))&&$.test(e)?e.replace(K,tr):e},Nr.escapeRegExp=function(e){return(e=ms(e))&&re.test(e)?e.replace(te,"\\$&"):e},Nr.every=function(e,t,r){var n=Go(e)?St:dn
return r&&ga(e,t,r)&&(t=i),n(e,ia(t,3))},Nr.find=po,Nr.findIndex=qa,Nr.findKey=function(e,t){return Mt(e,ia(t,3),vn)},Nr.findLast=go,Nr.findLastIndex=ja,Nr.findLastKey=function(e,t){return Mt(e,ia(t,3),yn)},Nr.floor=bu,Nr.forEach=mo,Nr.forEachRight=vo,Nr.forIn=function(e,t){return null==e?e:gn(e,ia(t,3),Ls)},Nr.forInRight=function(e,t){return null==e?e:mn(e,ia(t,3),Ls)},Nr.forOwn=function(e,t){return e&&vn(e,ia(t,3))},Nr.forOwnRight=function(e,t){return e&&yn(e,ia(t,3))},Nr.get=As,Nr.gt=Uo,Nr.gte=qo,Nr.has=function(e,t){return null!=e&&da(e,t,An)},Nr.hasIn=Ds,Nr.head=Ha,Nr.identity=tu,Nr.includes=function(e,t,r,n){e=Vo(e)?e:Bs(e),r=r&&!n?hs(r):0
var i=e.length
return r<0&&(r=pr(i+r,0)),as(e)?r<=i&&e.indexOf(t,r)>-1:!!i&&Ut(e,t,r)>-1},Nr.indexOf=function(e,t,r){var n=null==e?0:e.length
if(!n)return-1
var i=null==r?0:hs(r)
return i<0&&(i=pr(n+i,0)),Ut(e,t,i)},Nr.inRange=function(e,t,r){return t=ds(t),r===i?(r=t,t=0):r=ds(r),function(e,t,r){return e>=gr(t,r)&&e<pr(t,r)}(e=ps(e),t,r)},Nr.invoke=xs,Nr.isArguments=jo,Nr.isArray=Go,Nr.isArrayBuffer=Ho,Nr.isArrayLike=Vo,Nr.isArrayLikeObject=zo,Nr.isBoolean=function(e){return!0===e||!1===e||Jo(e)&&_n(e)==v},Nr.isBuffer=Ko,Nr.isDate=Wo,Nr.isElement=function(e){return Jo(e)&&1===e.nodeType&&!rs(e)},Nr.isEmpty=function(e){if(null==e)return!0
if(Vo(e)&&(Go(e)||"string"==typeof e||"function"==typeof e.splice||Ko(e)||ss(e)||jo(e)))return!e.length
var t=ca(e)
if(t==_||t==S)return!e.size
if(ba(e))return!On(e).length
for(var r in e)if(Oe.call(e,r))return!1
return!0},Nr.isEqual=function(e,t){return Cn(e,t)},Nr.isEqualWith=function(e,t,r){var n=(r="function"==typeof r?r:i)?r(e,t):i
return n===i?Cn(e,t,i,r):!!n},Nr.isError=$o,Nr.isFinite=function(e){return"number"==typeof e&&Nt(e)},Nr.isFunction=Yo,Nr.isInteger=Qo,Nr.isLength=Xo,Nr.isMap=es,Nr.isMatch=function(e,t){return e===t||Ln(e,t,oa(t))},Nr.isMatchWith=function(e,t,r){return r="function"==typeof r?r:i,Ln(e,t,oa(t),r)},Nr.isNaN=function(e){return ts(e)&&e!=+e},Nr.isNative=function(e){if(ya(e))throw new we("Unsupported core-js use. Try https://npms.io/search?q=ponyfill.")
return Rn(e)},Nr.isNil=function(e){return null==e},Nr.isNull=function(e){return null===e},Nr.isNumber=ts,Nr.isObject=Zo,Nr.isObjectLike=Jo,Nr.isPlainObject=rs,Nr.isRegExp=ns,Nr.isSafeInteger=function(e){return Qo(e)&&e>=-9007199254740991&&e<=d},Nr.isSet=is,Nr.isString=as,Nr.isSymbol=os,Nr.isTypedArray=ss,Nr.isUndefined=function(e){return e===i},Nr.isWeakMap=function(e){return Jo(e)&&ca(e)==L},Nr.isWeakSet=function(e){return Jo(e)&&"[object WeakSet]"==_n(e)},Nr.join=function(e,t){return null==e?"":Vt.call(e,t)},Nr.kebabCase=Gs,Nr.last=Wa,Nr.lastIndexOf=function(e,t,r){var n=null==e?0:e.length
if(!n)return-1
var a=n
return r!==i&&(a=(a=hs(r))<0?pr(n+a,0):gr(a,n-1)),t==t?function(e,t,r){for(var n=r+1;n--;)if(e[n]===t)return n
return n}(e,t,a):Bt(e,jt,a,!0)},Nr.lowerCase=Hs,Nr.lowerFirst=Vs,Nr.lt=us,Nr.lte=ls,Nr.max=function(e){return e&&e.length?hn(e,tu,Tn):i},Nr.maxBy=function(e,t){return e&&e.length?hn(e,ia(t,2),Tn):i},Nr.mean=function(e){return Gt(e,tu)},Nr.meanBy=function(e,t){return Gt(e,ia(t,2))},Nr.min=function(e){return e&&e.length?hn(e,tu,Fn):i},Nr.minBy=function(e,t){return e&&e.length?hn(e,ia(t,2),Fn):i},Nr.stubArray=fu,Nr.stubFalse=pu,Nr.stubObject=function(){return{}},Nr.stubString=function(){return""},Nr.stubTrue=function(){return!0},Nr.multiply=Eu,Nr.nth=function(e,t){return e&&e.length?Un(e,hs(t)):i},Nr.noConflict=function(){return dt._===this&&(dt._=Be),this},Nr.noop=ou,Nr.now=Ao,Nr.pad=function(e,t,r){e=ms(e)
var n=(t=hs(t))?ur(e):0
if(!t||n>=t)return e
var i=(t-n)/2
return qi(ft(i),r)+e+qi(ht(i),r)},Nr.padEnd=function(e,t,r){e=ms(e)
var n=(t=hs(t))?ur(e):0
return t&&n<t?e+qi(t-n,r):e},Nr.padStart=function(e,t,r){e=ms(e)
var n=(t=hs(t))?ur(e):0
return t&&n<t?qi(t-n,r)+e:e},Nr.parseInt=function(e,t,r){return r||null==t?t=0:t&&(t=+t),vr(ms(e).replace(ne,""),t||0)},Nr.random=function(e,t,r){if(r&&"boolean"!=typeof r&&ga(e,t,r)&&(t=r=i),r===i&&("boolean"==typeof t?(r=t,t=i):"boolean"==typeof e&&(r=e,e=i)),e===i&&t===i?(e=0,t=1):(e=ds(e),t===i?(t=e,e=0):t=ds(t)),e>t){var n=e
e=t,t=n}if(r||e%1||t%1){var a=yr()
return gr(e+a*(t-e+st("1e-"+((a+"").length-1))),t)}return Vn(e,t)},Nr.reduce=function(e,t,r){var n=Go(e)?Ot:zt,i=arguments.length<3
return n(e,ia(t,4),r,i,ln)},Nr.reduceRight=function(e,t,r){var n=Go(e)?Ft:zt,i=arguments.length<3
return n(e,ia(t,4),r,i,cn)},Nr.repeat=function(e,t,r){return t=(r?ga(e,t,r):t===i)?1:hs(t),zn(ms(e),t)},Nr.replace=function(){var e=arguments,t=ms(e[0])
return e.length<3?t:t.replace(e[1],e[2])},Nr.result=function(e,t,r){var n=-1,a=(t=gi(t,e)).length
for(a||(a=1,e=i);++n<a;){var o=null==e?i:e[Fa(t[n])]
o===i&&(n=a,o=r),e=Yo(o)?o.call(e):o}return e},Nr.round=wu,Nr.runInContext=e,Nr.sample=function(e){return(Go(e)?Wr:Wn)(e)},Nr.size=function(e){if(null==e)return 0
if(Vo(e))return as(e)?ur(e):e.length
var t=ca(e)
return t==_||t==S?e.size:On(e).length},Nr.snakeCase=zs,Nr.some=function(e,t,r){var n=Go(e)?Pt:ei
return r&&ga(e,t,r)&&(t=i),n(e,ia(t,3))},Nr.sortedIndex=function(e,t){return ti(e,t)},Nr.sortedIndexBy=function(e,t,r){return ri(e,t,ia(r,2))},Nr.sortedIndexOf=function(e,t){var r=null==e?0:e.length
if(r){var n=ti(e,t)
if(n<r&&Bo(e[n],t))return n}return-1},Nr.sortedLastIndex=function(e,t){return ti(e,t,!0)},Nr.sortedLastIndexBy=function(e,t,r){return ri(e,t,ia(r,2),!0)},Nr.sortedLastIndexOf=function(e,t){if(null!=e&&e.length){var r=ti(e,t,!0)-1
if(Bo(e[r],t))return r}return-1},Nr.startCase=Ks,Nr.startsWith=function(e,t,r){return e=ms(e),r=null==r?0:nn(hs(r),0,e.length),t=ai(t),e.slice(r,r+t.length)==t},Nr.subtract=_u,Nr.sum=function(e){return e&&e.length?Kt(e,tu):0},Nr.sumBy=function(e,t){return e&&e.length?Kt(e,ia(t,2)):0},Nr.template=function(e,t,r){var n=Nr.templateSettings
r&&ga(e,t,r)&&(t=i),e=ms(e),t=bs({},t,n,$i)
var a,o,s=bs({},t.imports,n.imports,$i),u=Cs(s),l=Qt(s,u),c=0,d=t.interpolate||be,h="__p += '",f=De((t.escape||be).source+"|"+d.source+"|"+(d===X?de:be).source+"|"+(t.evaluate||be).source+"|$","g"),p="//# sourceURL="+(Oe.call(t,"sourceURL")?(t.sourceURL+"").replace(/\s/g," "):"lodash.templateSources["+ ++nt+"]")+"\n"
e.replace(f,(function(t,r,n,i,s,u){return n||(n=i),h+=e.slice(c,u).replace(Ee,rr),r&&(a=!0,h+="' +\n__e("+r+") +\n'"),s&&(o=!0,h+="';\n"+s+";\n__p += '"),n&&(h+="' +\n((__t = ("+n+")) == null ? '' : __t) +\n'"),c=u+t.length,t})),h+="';\n"
var g=Oe.call(t,"variable")&&t.variable
if(g){if(le.test(g))throw new we("Invalid `variable` option passed into `_.template`")}else h="with (obj) {\n"+h+"\n}\n"
h=(o?h.replace(G,""):h).replace(H,"$1").replace(V,"$1;"),h="function("+(g||"obj")+") {\n"+(g?"":"obj || (obj = {});\n")+"var __t, __p = ''"+(a?", __e = _.escape":"")+(o?", __j = Array.prototype.join;\nfunction print() { __p += __j.call(arguments, '') }\n":";\n")+h+"return __p\n}"
var m=Qs((function(){return _e(u,p+"return "+h).apply(i,l)}))
if(m.source=h,$o(m))throw m
return m},Nr.times=function(e,t){if((e=hs(e))<1||e>d)return[]
var r=f,n=gr(e,f)
t=ia(t),e-=f
for(var i=Wt(n,t);++r<e;)t(r)
return i},Nr.toFinite=ds,Nr.toInteger=hs,Nr.toLength=fs,Nr.toLower=function(e){return ms(e).toLowerCase()},Nr.toNumber=ps,Nr.toSafeInteger=function(e){return e?nn(hs(e),-9007199254740991,d):0===e?e:0},Nr.toString=ms,Nr.toUpper=function(e){return ms(e).toUpperCase()},Nr.trim=function(e,t,r){if((e=ms(e))&&(r||t===i))return $t(e)
if(!e||!(t=ai(t)))return e
var n=lr(e),a=lr(t)
return vi(n,Zt(n,a),Jt(n,a)+1).join("")},Nr.trimEnd=function(e,t,r){if((e=ms(e))&&(r||t===i))return e.slice(0,cr(e)+1)
if(!e||!(t=ai(t)))return e
var n=lr(e)
return vi(n,0,Jt(n,lr(t))+1).join("")},Nr.trimStart=function(e,t,r){if((e=ms(e))&&(r||t===i))return e.replace(ne,"")
if(!e||!(t=ai(t)))return e
var n=lr(e)
return vi(n,Zt(n,lr(t))).join("")},Nr.truncate=function(e,t){var r=30,n="..."
if(Zo(t)){var a="separator"in t?t.separator:a
r="length"in t?hs(t.length):r,n="omission"in t?ai(t.omission):n}var o=(e=ms(e)).length
if(nr(e)){var s=lr(e)
o=s.length}if(r>=o)return e
var u=r-ur(n)
if(u<1)return n
var l=s?vi(s,0,u).join(""):e.slice(0,u)
if(a===i)return l+n
if(s&&(u+=l.length-u),ns(a)){if(e.slice(u).search(a)){var c,d=l
for(a.global||(a=De(a.source,ms(he.exec(a))+"g")),a.lastIndex=0;c=a.exec(d);)var h=c.index
l=l.slice(0,h===i?u:h)}}else if(e.indexOf(ai(a),u)!=u){var f=l.lastIndexOf(a)
f>-1&&(l=l.slice(0,f))}return l+n},Nr.unescape=function(e){return(e=ms(e))&&W.test(e)?e.replace(z,dr):e},Nr.uniqueId=function(e){var t=++Fe
return ms(e)+t},Nr.upperCase=Ws,Nr.upperFirst=$s,Nr.each=mo,Nr.eachRight=vo,Nr.first=Ha,au(Nr,(gu={},vn(Nr,(function(e,t){Oe.call(Nr.prototype,t)||(gu[t]=e)})),gu),{chain:!1}),Nr.VERSION="4.17.21",Dt(["bind","bindKey","curry","curryRight","partial","partialRight"],(function(e){Nr[e].placeholder=Nr})),Dt(["drop","take"],(function(e,t){qr.prototype[e]=function(r){r=r===i?1:pr(hs(r),0)
var n=this.__filtered__&&!t?new qr(this):this.clone()
return n.__filtered__?n.__takeCount__=gr(r,n.__takeCount__):n.__views__.push({size:gr(r,f),type:e+(n.__dir__<0?"Right":"")}),n},qr.prototype[e+"Right"]=function(t){return this.reverse()[e](t).reverse()}})),Dt(["filter","map","takeWhile"],(function(e,t){var r=t+1,n=1==r||3==r
qr.prototype[e]=function(e){var t=this.clone()
return t.__iteratees__.push({iteratee:ia(e,3),type:r}),t.__filtered__=t.__filtered__||n,t}})),Dt(["head","last"],(function(e,t){var r="take"+(t?"Right":"")
qr.prototype[e]=function(){return this[r](1).value()[0]}})),Dt(["initial","tail"],(function(e,t){var r="drop"+(t?"":"Right")
qr.prototype[e]=function(){return this.__filtered__?new qr(this):this[r](1)}})),qr.prototype.compact=function(){return this.filter(tu)},qr.prototype.find=function(e){return this.filter(e).head()},qr.prototype.findLast=function(e){return this.reverse().find(e)},qr.prototype.invokeMap=Kn((function(e,t){return"function"==typeof e?new qr(this):this.map((function(r){return Sn(r,e,t)}))})),qr.prototype.reject=function(e){return this.filter(Oo(ia(e)))},qr.prototype.slice=function(e,t){e=hs(e)
var r=this
return r.__filtered__&&(e>0||t<0)?new qr(r):(e<0?r=r.takeRight(-e):e&&(r=r.drop(e)),t!==i&&(r=(t=hs(t))<0?r.dropRight(-t):r.take(t-e)),r)},qr.prototype.takeRightWhile=function(e){return this.reverse().takeWhile(e).reverse()},qr.prototype.toArray=function(){return this.take(f)},vn(qr.prototype,(function(e,t){var r=/^(?:filter|find|map|reject)|While$/.test(t),n=/^(?:head|last)$/.test(t),a=Nr[n?"take"+("last"==t?"Right":""):t],o=n||/^find/.test(t)
a&&(Nr.prototype[t]=function(){var t=this.__wrapped__,s=n?[1]:arguments,u=t instanceof qr,l=s[0],c=u||Go(t),d=function(e){var t=a.apply(Nr,It([e],s))
return n&&h?t[0]:t}
c&&r&&"function"==typeof l&&1!=l.length&&(u=c=!1)
var h=this.__chain__,f=!!this.__actions__.length,p=o&&!h,g=u&&!f
if(!o&&c){t=g?t:new qr(this)
var m=e.apply(t,s)
return m.__actions__.push({func:co,args:[d],thisArg:i}),new Ur(m,h)}return p&&g?e.apply(this,s):(m=this.thru(d),p?n?m.value()[0]:m.value():m)})})),Dt(["pop","push","shift","sort","splice","unshift"],(function(e){var t=xe[e],r=/^(?:push|sort|unshift)$/.test(e)?"tap":"thru",n=/^(?:pop|shift)$/.test(e)
Nr.prototype[e]=function(){var e=arguments
if(n&&!this.__chain__){var i=this.value()
return t.apply(Go(i)?i:[],e)}return this[r]((function(r){return t.apply(Go(r)?r:[],e)}))}})),vn(qr.prototype,(function(e,t){var r=Nr[t]
if(r){var n=r.name+""
Oe.call(Sr,n)||(Sr[n]=[]),Sr[n].push({name:t,func:r})}})),Sr[Ni(i,2).name]=[{name:"wrapper",func:i}],qr.prototype.clone=function(){var e=new qr(this.__wrapped__)
return e.__actions__=Di(this.__actions__),e.__dir__=this.__dir__,e.__filtered__=this.__filtered__,e.__iteratees__=Di(this.__iteratees__),e.__takeCount__=this.__takeCount__,e.__views__=Di(this.__views__),e},qr.prototype.reverse=function(){if(this.__filtered__){var e=new qr(this)
e.__dir__=-1,e.__filtered__=!0}else(e=this.clone()).__dir__*=-1
return e},qr.prototype.value=function(){var e=this.__wrapped__.value(),t=this.__dir__,r=Go(e),n=t<0,i=r?e.length:0,a=function(e,t,r){for(var n=-1,i=r.length;++n<i;){var a=r[n],o=a.size
switch(a.type){case"drop":e+=o
break
case"dropRight":t-=o
break
case"take":t=gr(t,e+o)
break
case"takeRight":e=pr(e,t-o)}}return{start:e,end:t}}(0,i,this.__views__),o=a.start,s=a.end,u=s-o,l=n?s:o-1,c=this.__iteratees__,d=c.length,h=0,f=gr(u,this.__takeCount__)
if(!r||!n&&i==u&&f==u)return ci(e,this.__actions__)
var p=[]
e:for(;u--&&h<f;){for(var g=-1,m=e[l+=t];++g<d;){var v=c[g],y=v.iteratee,b=v.type,E=y(m)
if(2==b)m=E
else if(!E){if(1==b)continue e
break e}}p[h++]=m}return p},Nr.prototype.at=ho,Nr.prototype.chain=function(){return lo(this)},Nr.prototype.commit=function(){return new Ur(this.value(),this.__chain__)},Nr.prototype.next=function(){this.__values__===i&&(this.__values__=cs(this.value()))
var e=this.__index__>=this.__values__.length
return{done:e,value:e?i:this.__values__[this.__index__++]}},Nr.prototype.plant=function(e){for(var t,r=this;r instanceof Br;){var n=Na(r)
n.__index__=0,n.__values__=i,t?a.__wrapped__=n:t=n
var a=n
r=r.__wrapped__}return a.__wrapped__=e,t},Nr.prototype.reverse=function(){var e=this.__wrapped__
if(e instanceof qr){var t=e
return this.__actions__.length&&(t=new qr(this)),(t=t.reverse()).__actions__.push({func:co,args:[Xa],thisArg:i}),new Ur(t,this.__chain__)}return this.thru(Xa)},Nr.prototype.toJSON=Nr.prototype.valueOf=Nr.prototype.value=function(){return ci(this.__wrapped__,this.__actions__)},Nr.prototype.first=Nr.prototype.head,Ye&&(Nr.prototype[Ye]=function(){return this}),Nr}()
dt._=hr,(n=function(){return hr}.call(t,r,t,e))===i||(e.exports=n)}.call(this)},347:(e,t,r)=>{var n,i
!function(){var a,o,s,u,l,c,d,h,f,p,g,m,v,y,b,E,w,_,T,A,D,k,S,x,C,L,R,I,O,F=function(e){var t=new F.Builder
return t.pipeline.add(F.trimmer,F.stopWordFilter,F.stemmer),t.searchPipeline.add(F.stemmer),e.call(t,t),t.build()}
F.version="2.3.9",F.utils={},F.utils.warn=function(e){return function(t){e.console&&console.warn&&console.warn(t)}}(this),F.utils.asString=function(e){return null==e?"":e.toString()},F.utils.clone=function(e){if(null==e)return e
for(var t=Object.create(null),r=Object.keys(e),n=0;n<r.length;n++){var i=r[n],a=e[i]
if(Array.isArray(a))t[i]=a.slice()
else{if("string"!=typeof a&&"number"!=typeof a&&"boolean"!=typeof a)throw new TypeError("clone is not deep and does not support nested objects")
t[i]=a}}return t},F.FieldRef=function(e,t,r){this.docRef=e,this.fieldName=t,this._stringValue=r},F.FieldRef.joiner="/",F.FieldRef.fromString=function(e){var t=e.indexOf(F.FieldRef.joiner)
if(-1===t)throw"malformed field ref string"
var r=e.slice(0,t),n=e.slice(t+1)
return new F.FieldRef(n,r,e)},F.FieldRef.prototype.toString=function(){return null==this._stringValue&&(this._stringValue=this.fieldName+F.FieldRef.joiner+this.docRef),this._stringValue},F.Set=function(e){if(this.elements=Object.create(null),e){this.length=e.length
for(var t=0;t<this.length;t++)this.elements[e[t]]=!0}else this.length=0},F.Set.complete={intersect:function(e){return e},union:function(){return this},contains:function(){return!0}},F.Set.empty={intersect:function(){return this},union:function(e){return e},contains:function(){return!1}},F.Set.prototype.contains=function(e){return!!this.elements[e]},F.Set.prototype.intersect=function(e){var t,r,n,i=[]
if(e===F.Set.complete)return this
if(e===F.Set.empty)return e
this.length<e.length?(t=this,r=e):(t=e,r=this),n=Object.keys(t.elements)
for(var a=0;a<n.length;a++){var o=n[a]
o in r.elements&&i.push(o)}return new F.Set(i)},F.Set.prototype.union=function(e){return e===F.Set.complete?F.Set.complete:e===F.Set.empty?this:new F.Set(Object.keys(this.elements).concat(Object.keys(e.elements)))},F.idf=function(e,t){var r=0
for(var n in e)"_index"!=n&&(r+=Object.keys(e[n]).length)
var i=(t-r+.5)/(r+.5)
return Math.log(1+Math.abs(i))},F.Token=function(e,t){this.str=e||"",this.metadata=t||{}},F.Token.prototype.toString=function(){return this.str},F.Token.prototype.update=function(e){return this.str=e(this.str,this.metadata),this},F.Token.prototype.clone=function(e){return e=e||function(e){return e},new F.Token(e(this.str,this.metadata),this.metadata)},F.tokenizer=function(e,t){if(null==e||null==e)return[]
if(Array.isArray(e))return e.map((function(e){return new F.Token(F.utils.asString(e).toLowerCase(),F.utils.clone(t))}))
for(var r=e.toString().toLowerCase(),n=r.length,i=[],a=0,o=0;a<=n;a++){var s=a-o
if(r.charAt(a).match(F.tokenizer.separator)||a==n){if(s>0){var u=F.utils.clone(t)||{}
u.position=[o,s],u.index=i.length,i.push(new F.Token(r.slice(o,a),u))}o=a+1}}return i},F.tokenizer.separator=/[\s\-]+/,F.Pipeline=function(){this._stack=[]},F.Pipeline.registeredFunctions=Object.create(null),F.Pipeline.registerFunction=function(e,t){t in this.registeredFunctions&&F.utils.warn("Overwriting existing registered function: "+t),e.label=t,F.Pipeline.registeredFunctions[e.label]=e},F.Pipeline.warnIfFunctionNotRegistered=function(e){e.label&&e.label in this.registeredFunctions||F.utils.warn("Function is not registered with pipeline. This may cause problems when serialising the index.\n",e)},F.Pipeline.load=function(e){var t=new F.Pipeline
return e.forEach((function(e){var r=F.Pipeline.registeredFunctions[e]
if(!r)throw new Error("Cannot load unregistered function: "+e)
t.add(r)})),t},F.Pipeline.prototype.add=function(){Array.prototype.slice.call(arguments).forEach((function(e){F.Pipeline.warnIfFunctionNotRegistered(e),this._stack.push(e)}),this)},F.Pipeline.prototype.after=function(e,t){F.Pipeline.warnIfFunctionNotRegistered(t)
var r=this._stack.indexOf(e)
if(-1==r)throw new Error("Cannot find existingFn")
r+=1,this._stack.splice(r,0,t)},F.Pipeline.prototype.before=function(e,t){F.Pipeline.warnIfFunctionNotRegistered(t)
var r=this._stack.indexOf(e)
if(-1==r)throw new Error("Cannot find existingFn")
this._stack.splice(r,0,t)},F.Pipeline.prototype.remove=function(e){var t=this._stack.indexOf(e);-1!=t&&this._stack.splice(t,1)},F.Pipeline.prototype.run=function(e){for(var t=this._stack.length,r=0;r<t;r++){for(var n=this._stack[r],i=[],a=0;a<e.length;a++){var o=n(e[a],a,e)
if(null!=o&&""!==o)if(Array.isArray(o))for(var s=0;s<o.length;s++)i.push(o[s])
else i.push(o)}e=i}return e},F.Pipeline.prototype.runString=function(e,t){var r=new F.Token(e,t)
return this.run([r]).map((function(e){return e.toString()}))},F.Pipeline.prototype.reset=function(){this._stack=[]},F.Pipeline.prototype.toJSON=function(){return this._stack.map((function(e){return F.Pipeline.warnIfFunctionNotRegistered(e),e.label}))},F.Vector=function(e){this._magnitude=0,this.elements=e||[]},F.Vector.prototype.positionForIndex=function(e){if(0==this.elements.length)return 0
for(var t=0,r=this.elements.length/2,n=r-t,i=Math.floor(n/2),a=this.elements[2*i];n>1&&(a<e&&(t=i),a>e&&(r=i),a!=e);)n=r-t,i=t+Math.floor(n/2),a=this.elements[2*i]
return a==e||a>e?2*i:a<e?2*(i+1):void 0},F.Vector.prototype.insert=function(e,t){this.upsert(e,t,(function(){throw"duplicate index"}))},F.Vector.prototype.upsert=function(e,t,r){this._magnitude=0
var n=this.positionForIndex(e)
this.elements[n]==e?this.elements[n+1]=r(this.elements[n+1],t):this.elements.splice(n,0,e,t)},F.Vector.prototype.magnitude=function(){if(this._magnitude)return this._magnitude
for(var e=0,t=this.elements.length,r=1;r<t;r+=2){var n=this.elements[r]
e+=n*n}return this._magnitude=Math.sqrt(e)},F.Vector.prototype.dot=function(e){for(var t=0,r=this.elements,n=e.elements,i=r.length,a=n.length,o=0,s=0,u=0,l=0;u<i&&l<a;)(o=r[u])<(s=n[l])?u+=2:o>s?l+=2:o==s&&(t+=r[u+1]*n[l+1],u+=2,l+=2)
return t},F.Vector.prototype.similarity=function(e){return this.dot(e)/this.magnitude()||0},F.Vector.prototype.toArray=function(){for(var e=new Array(this.elements.length/2),t=1,r=0;t<this.elements.length;t+=2,r++)e[r]=this.elements[t]
return e},F.Vector.prototype.toJSON=function(){return this.elements},F.stemmer=(a={ational:"ate",tional:"tion",enci:"ence",anci:"ance",izer:"ize",bli:"ble",alli:"al",entli:"ent",eli:"e",ousli:"ous",ization:"ize",ation:"ate",ator:"ate",alism:"al",iveness:"ive",fulness:"ful",ousness:"ous",aliti:"al",iviti:"ive",biliti:"ble",logi:"log"},o={icate:"ic",ative:"",alize:"al",iciti:"ic",ical:"ic",ful:"",ness:""},c="^("+(u="[^aeiou][^aeiouy]*")+")?"+(l=(s="[aeiouy]")+"[aeiou]*")+u+"("+l+")?$",d="^("+u+")?"+l+u+l+u,h="^("+u+")?"+s,f=new RegExp("^("+u+")?"+l+u),p=new RegExp(d),g=new RegExp(c),m=new RegExp(h),v=/^(.+?)(ss|i)es$/,y=/^(.+?)([^s])s$/,b=/^(.+?)eed$/,E=/^(.+?)(ed|ing)$/,w=/.$/,_=/(at|bl|iz)$/,T=new RegExp("([^aeiouylsz])\\1$"),A=new RegExp("^"+u+s+"[^aeiouwxy]$"),D=/^(.+?[^aeiou])y$/,k=/^(.+?)(ational|tional|enci|anci|izer|bli|alli|entli|eli|ousli|ization|ation|ator|alism|iveness|fulness|ousness|aliti|iviti|biliti|logi)$/,S=/^(.+?)(icate|ative|alize|iciti|ical|ful|ness)$/,x=/^(.+?)(al|ance|ence|er|ic|able|ible|ant|ement|ment|ent|ou|ism|ate|iti|ous|ive|ize)$/,C=/^(.+?)(s|t)(ion)$/,L=/^(.+?)e$/,R=/ll$/,I=new RegExp("^"+u+s+"[^aeiouwxy]$"),O=function(e){var t,r,n,i,s,u,l
if(e.length<3)return e
if("y"==(n=e.substr(0,1))&&(e=n.toUpperCase()+e.substr(1)),s=y,(i=v).test(e)?e=e.replace(i,"$1$2"):s.test(e)&&(e=e.replace(s,"$1$2")),s=E,(i=b).test(e)){var c=i.exec(e);(i=f).test(c[1])&&(i=w,e=e.replace(i,""))}else s.test(e)&&(t=(c=s.exec(e))[1],(s=m).test(t)&&(u=T,l=A,(s=_).test(e=t)?e+="e":u.test(e)?(i=w,e=e.replace(i,"")):l.test(e)&&(e+="e")))
return(i=D).test(e)&&(e=(t=(c=i.exec(e))[1])+"i"),(i=k).test(e)&&(t=(c=i.exec(e))[1],r=c[2],(i=f).test(t)&&(e=t+a[r])),(i=S).test(e)&&(t=(c=i.exec(e))[1],r=c[2],(i=f).test(t)&&(e=t+o[r])),s=C,(i=x).test(e)?(t=(c=i.exec(e))[1],(i=p).test(t)&&(e=t)):s.test(e)&&(t=(c=s.exec(e))[1]+c[2],(s=p).test(t)&&(e=t)),(i=L).test(e)&&(t=(c=i.exec(e))[1],s=g,u=I,((i=p).test(t)||s.test(t)&&!u.test(t))&&(e=t)),s=p,(i=R).test(e)&&s.test(e)&&(i=w,e=e.replace(i,"")),"y"==n&&(e=n.toLowerCase()+e.substr(1)),e},function(e){return e.update(O)}),F.Pipeline.registerFunction(F.stemmer,"stemmer"),F.generateStopWordFilter=function(e){var t=e.reduce((function(e,t){return e[t]=t,e}),{})
return function(e){if(e&&t[e.toString()]!==e.toString())return e}},F.stopWordFilter=F.generateStopWordFilter(["a","able","about","across","after","all","almost","also","am","among","an","and","any","are","as","at","be","because","been","but","by","can","cannot","could","dear","did","do","does","either","else","ever","every","for","from","get","got","had","has","have","he","her","hers","him","his","how","however","i","if","in","into","is","it","its","just","least","let","like","likely","may","me","might","most","must","my","neither","no","nor","not","of","off","often","on","only","or","other","our","own","rather","said","say","says","she","should","since","so","some","than","that","the","their","them","then","there","these","they","this","tis","to","too","twas","us","wants","was","we","were","what","when","where","which","while","who","whom","why","will","with","would","yet","you","your"]),F.Pipeline.registerFunction(F.stopWordFilter,"stopWordFilter"),F.trimmer=function(e){return e.update((function(e){return e.replace(/^\W+/,"").replace(/\W+$/,"")}))},F.Pipeline.registerFunction(F.trimmer,"trimmer"),F.TokenSet=function(){this.final=!1,this.edges={},this.id=F.TokenSet._nextId,F.TokenSet._nextId+=1},F.TokenSet._nextId=1,F.TokenSet.fromArray=function(e){for(var t=new F.TokenSet.Builder,r=0,n=e.length;r<n;r++)t.insert(e[r])
return t.finish(),t.root},F.TokenSet.fromClause=function(e){return"editDistance"in e?F.TokenSet.fromFuzzyString(e.term,e.editDistance):F.TokenSet.fromString(e.term)},F.TokenSet.fromFuzzyString=function(e,t){for(var r=new F.TokenSet,n=[{node:r,editsRemaining:t,str:e}];n.length;){var i=n.pop()
if(i.str.length>0){var a,o=i.str.charAt(0)
o in i.node.edges?a=i.node.edges[o]:(a=new F.TokenSet,i.node.edges[o]=a),1==i.str.length&&(a.final=!0),n.push({node:a,editsRemaining:i.editsRemaining,str:i.str.slice(1)})}if(0!=i.editsRemaining){if("*"in i.node.edges)var s=i.node.edges["*"]
else s=new F.TokenSet,i.node.edges["*"]=s
if(0==i.str.length&&(s.final=!0),n.push({node:s,editsRemaining:i.editsRemaining-1,str:i.str}),i.str.length>1&&n.push({node:i.node,editsRemaining:i.editsRemaining-1,str:i.str.slice(1)}),1==i.str.length&&(i.node.final=!0),i.str.length>=1){if("*"in i.node.edges)var u=i.node.edges["*"]
else u=new F.TokenSet,i.node.edges["*"]=u
1==i.str.length&&(u.final=!0),n.push({node:u,editsRemaining:i.editsRemaining-1,str:i.str.slice(1)})}if(i.str.length>1){var l,c=i.str.charAt(0),d=i.str.charAt(1)
d in i.node.edges?l=i.node.edges[d]:(l=new F.TokenSet,i.node.edges[d]=l),1==i.str.length&&(l.final=!0),n.push({node:l,editsRemaining:i.editsRemaining-1,str:c+i.str.slice(2)})}}}return r},F.TokenSet.fromString=function(e){for(var t=new F.TokenSet,r=t,n=0,i=e.length;n<i;n++){var a=e[n],o=n==i-1
if("*"==a)t.edges[a]=t,t.final=o
else{var s=new F.TokenSet
s.final=o,t.edges[a]=s,t=s}}return r},F.TokenSet.prototype.toArray=function(){for(var e=[],t=[{prefix:"",node:this}];t.length;){var r=t.pop(),n=Object.keys(r.node.edges),i=n.length
r.node.final&&(r.prefix.charAt(0),e.push(r.prefix))
for(var a=0;a<i;a++){var o=n[a]
t.push({prefix:r.prefix.concat(o),node:r.node.edges[o]})}}return e},F.TokenSet.prototype.toString=function(){if(this._str)return this._str
for(var e=this.final?"1":"0",t=Object.keys(this.edges).sort(),r=t.length,n=0;n<r;n++){var i=t[n]
e=e+i+this.edges[i].id}return e},F.TokenSet.prototype.intersect=function(e){for(var t=new F.TokenSet,r=void 0,n=[{qNode:e,output:t,node:this}];n.length;){r=n.pop()
for(var i=Object.keys(r.qNode.edges),a=i.length,o=Object.keys(r.node.edges),s=o.length,u=0;u<a;u++)for(var l=i[u],c=0;c<s;c++){var d=o[c]
if(d==l||"*"==l){var h=r.node.edges[d],f=r.qNode.edges[l],p=h.final&&f.final,g=void 0
d in r.output.edges?(g=r.output.edges[d]).final=g.final||p:((g=new F.TokenSet).final=p,r.output.edges[d]=g),n.push({qNode:f,output:g,node:h})}}}return t},F.TokenSet.Builder=function(){this.previousWord="",this.root=new F.TokenSet,this.uncheckedNodes=[],this.minimizedNodes={}},F.TokenSet.Builder.prototype.insert=function(e){var t,r=0
if(e<this.previousWord)throw new Error("Out of order word insertion")
for(var n=0;n<e.length&&n<this.previousWord.length&&e[n]==this.previousWord[n];n++)r++
for(this.minimize(r),t=0==this.uncheckedNodes.length?this.root:this.uncheckedNodes[this.uncheckedNodes.length-1].child,n=r;n<e.length;n++){var i=new F.TokenSet,a=e[n]
t.edges[a]=i,this.uncheckedNodes.push({parent:t,char:a,child:i}),t=i}t.final=!0,this.previousWord=e},F.TokenSet.Builder.prototype.finish=function(){this.minimize(0)},F.TokenSet.Builder.prototype.minimize=function(e){for(var t=this.uncheckedNodes.length-1;t>=e;t--){var r=this.uncheckedNodes[t],n=r.child.toString()
n in this.minimizedNodes?r.parent.edges[r.char]=this.minimizedNodes[n]:(r.child._str=n,this.minimizedNodes[n]=r.child),this.uncheckedNodes.pop()}},F.Index=function(e){this.invertedIndex=e.invertedIndex,this.fieldVectors=e.fieldVectors,this.tokenSet=e.tokenSet,this.fields=e.fields,this.pipeline=e.pipeline},F.Index.prototype.search=function(e){return this.query((function(t){new F.QueryParser(e,t).parse()}))},F.Index.prototype.query=function(e){for(var t=new F.Query(this.fields),r=Object.create(null),n=Object.create(null),i=Object.create(null),a=Object.create(null),o=Object.create(null),s=0;s<this.fields.length;s++)n[this.fields[s]]=new F.Vector
for(e.call(t,t),s=0;s<t.clauses.length;s++){var u,l=t.clauses[s],c=F.Set.empty
u=l.usePipeline?this.pipeline.runString(l.term,{fields:l.fields}):[l.term]
for(var d=0;d<u.length;d++){var h=u[d]
l.term=h
var f=F.TokenSet.fromClause(l),p=this.tokenSet.intersect(f).toArray()
if(0===p.length&&l.presence===F.Query.presence.REQUIRED){for(var g=0;g<l.fields.length;g++)a[R=l.fields[g]]=F.Set.empty
break}for(var m=0;m<p.length;m++){var v=p[m],y=this.invertedIndex[v],b=y._index
for(g=0;g<l.fields.length;g++){var E=y[R=l.fields[g]],w=Object.keys(E),_=v+"/"+R,T=new F.Set(w)
if(l.presence==F.Query.presence.REQUIRED&&(c=c.union(T),void 0===a[R]&&(a[R]=F.Set.complete)),l.presence!=F.Query.presence.PROHIBITED){if(n[R].upsert(b,l.boost,(function(e,t){return e+t})),!i[_]){for(var A=0;A<w.length;A++){var D,k=w[A],S=new F.FieldRef(k,R),x=E[k]
void 0===(D=r[S])?r[S]=new F.MatchData(v,R,x):D.add(v,R,x)}i[_]=!0}}else void 0===o[R]&&(o[R]=F.Set.empty),o[R]=o[R].union(T)}}}if(l.presence===F.Query.presence.REQUIRED)for(g=0;g<l.fields.length;g++)a[R=l.fields[g]]=a[R].intersect(c)}var C=F.Set.complete,L=F.Set.empty
for(s=0;s<this.fields.length;s++){var R
a[R=this.fields[s]]&&(C=C.intersect(a[R])),o[R]&&(L=L.union(o[R]))}var I=Object.keys(r),O=[],P=Object.create(null)
if(t.isNegated())for(I=Object.keys(this.fieldVectors),s=0;s<I.length;s++){S=I[s]
var N=F.FieldRef.fromString(S)
r[S]=new F.MatchData}for(s=0;s<I.length;s++){var M=(N=F.FieldRef.fromString(I[s])).docRef
if(C.contains(M)&&!L.contains(M)){var B,U=this.fieldVectors[N],q=n[N.fieldName].similarity(U)
if(void 0!==(B=P[M]))B.score+=q,B.matchData.combine(r[N])
else{var j={ref:M,score:q,matchData:r[N]}
P[M]=j,O.push(j)}}}return O.sort((function(e,t){return t.score-e.score}))},F.Index.prototype.toJSON=function(){var e=Object.keys(this.invertedIndex).sort().map((function(e){return[e,this.invertedIndex[e]]}),this),t=Object.keys(this.fieldVectors).map((function(e){return[e,this.fieldVectors[e].toJSON()]}),this)
return{version:F.version,fields:this.fields,fieldVectors:t,invertedIndex:e,pipeline:this.pipeline.toJSON()}},F.Index.load=function(e){var t={},r={},n=e.fieldVectors,i=Object.create(null),a=e.invertedIndex,o=new F.TokenSet.Builder,s=F.Pipeline.load(e.pipeline)
e.version!=F.version&&F.utils.warn("Version mismatch when loading serialised index. Current version of lunr '"+F.version+"' does not match serialized index '"+e.version+"'")
for(var u=0;u<n.length;u++){var l=(d=n[u])[0],c=d[1]
r[l]=new F.Vector(c)}for(u=0;u<a.length;u++){var d,h=(d=a[u])[0],f=d[1]
o.insert(h),i[h]=f}return o.finish(),t.fields=e.fields,t.fieldVectors=r,t.invertedIndex=i,t.tokenSet=o.root,t.pipeline=s,new F.Index(t)},F.Builder=function(){this._ref="id",this._fields=Object.create(null),this._documents=Object.create(null),this.invertedIndex=Object.create(null),this.fieldTermFrequencies={},this.fieldLengths={},this.tokenizer=F.tokenizer,this.pipeline=new F.Pipeline,this.searchPipeline=new F.Pipeline,this.documentCount=0,this._b=.75,this._k1=1.2,this.termIndex=0,this.metadataWhitelist=[]},F.Builder.prototype.ref=function(e){this._ref=e},F.Builder.prototype.field=function(e,t){if(/\//.test(e))throw new RangeError("Field '"+e+"' contains illegal character '/'")
this._fields[e]=t||{}},F.Builder.prototype.b=function(e){this._b=e<0?0:e>1?1:e},F.Builder.prototype.k1=function(e){this._k1=e},F.Builder.prototype.add=function(e,t){var r=e[this._ref],n=Object.keys(this._fields)
this._documents[r]=t||{},this.documentCount+=1
for(var i=0;i<n.length;i++){var a=n[i],o=this._fields[a].extractor,s=o?o(e):e[a],u=this.tokenizer(s,{fields:[a]}),l=this.pipeline.run(u),c=new F.FieldRef(r,a),d=Object.create(null)
this.fieldTermFrequencies[c]=d,this.fieldLengths[c]=0,this.fieldLengths[c]+=l.length
for(var h=0;h<l.length;h++){var f=l[h]
if(null==d[f]&&(d[f]=0),d[f]+=1,null==this.invertedIndex[f]){var p=Object.create(null)
p._index=this.termIndex,this.termIndex+=1
for(var g=0;g<n.length;g++)p[n[g]]=Object.create(null)
this.invertedIndex[f]=p}null==this.invertedIndex[f][a][r]&&(this.invertedIndex[f][a][r]=Object.create(null))
for(var m=0;m<this.metadataWhitelist.length;m++){var v=this.metadataWhitelist[m],y=f.metadata[v]
null==this.invertedIndex[f][a][r][v]&&(this.invertedIndex[f][a][r][v]=[]),this.invertedIndex[f][a][r][v].push(y)}}}},F.Builder.prototype.calculateAverageFieldLengths=function(){for(var e=Object.keys(this.fieldLengths),t=e.length,r={},n={},i=0;i<t;i++){var a=F.FieldRef.fromString(e[i]),o=a.fieldName
n[o]||(n[o]=0),n[o]+=1,r[o]||(r[o]=0),r[o]+=this.fieldLengths[a]}var s=Object.keys(this._fields)
for(i=0;i<s.length;i++){var u=s[i]
r[u]=r[u]/n[u]}this.averageFieldLength=r},F.Builder.prototype.createFieldVectors=function(){for(var e={},t=Object.keys(this.fieldTermFrequencies),r=t.length,n=Object.create(null),i=0;i<r;i++){for(var a=F.FieldRef.fromString(t[i]),o=a.fieldName,s=this.fieldLengths[a],u=new F.Vector,l=this.fieldTermFrequencies[a],c=Object.keys(l),d=c.length,h=this._fields[o].boost||1,f=this._documents[a.docRef].boost||1,p=0;p<d;p++){var g,m,v,y=c[p],b=l[y],E=this.invertedIndex[y]._index
void 0===n[y]?(g=F.idf(this.invertedIndex[y],this.documentCount),n[y]=g):g=n[y],m=g*((this._k1+1)*b)/(this._k1*(1-this._b+this._b*(s/this.averageFieldLength[o]))+b),m*=h,m*=f,v=Math.round(1e3*m)/1e3,u.insert(E,v)}e[a]=u}this.fieldVectors=e},F.Builder.prototype.createTokenSet=function(){this.tokenSet=F.TokenSet.fromArray(Object.keys(this.invertedIndex).sort())},F.Builder.prototype.build=function(){return this.calculateAverageFieldLengths(),this.createFieldVectors(),this.createTokenSet(),new F.Index({invertedIndex:this.invertedIndex,fieldVectors:this.fieldVectors,tokenSet:this.tokenSet,fields:Object.keys(this._fields),pipeline:this.searchPipeline})},F.Builder.prototype.use=function(e){var t=Array.prototype.slice.call(arguments,1)
t.unshift(this),e.apply(this,t)},F.MatchData=function(e,t,r){for(var n=Object.create(null),i=Object.keys(r||{}),a=0;a<i.length;a++){var o=i[a]
n[o]=r[o].slice()}this.metadata=Object.create(null),void 0!==e&&(this.metadata[e]=Object.create(null),this.metadata[e][t]=n)},F.MatchData.prototype.combine=function(e){for(var t=Object.keys(e.metadata),r=0;r<t.length;r++){var n=t[r],i=Object.keys(e.metadata[n])
null==this.metadata[n]&&(this.metadata[n]=Object.create(null))
for(var a=0;a<i.length;a++){var o=i[a],s=Object.keys(e.metadata[n][o])
null==this.metadata[n][o]&&(this.metadata[n][o]=Object.create(null))
for(var u=0;u<s.length;u++){var l=s[u]
null==this.metadata[n][o][l]?this.metadata[n][o][l]=e.metadata[n][o][l]:this.metadata[n][o][l]=this.metadata[n][o][l].concat(e.metadata[n][o][l])}}}},F.MatchData.prototype.add=function(e,t,r){if(!(e in this.metadata))return this.metadata[e]=Object.create(null),void(this.metadata[e][t]=r)
if(t in this.metadata[e])for(var n=Object.keys(r),i=0;i<n.length;i++){var a=n[i]
a in this.metadata[e][t]?this.metadata[e][t][a]=this.metadata[e][t][a].concat(r[a]):this.metadata[e][t][a]=r[a]}else this.metadata[e][t]=r},F.Query=function(e){this.clauses=[],this.allFields=e},F.Query.wildcard=new String("*"),F.Query.wildcard.NONE=0,F.Query.wildcard.LEADING=1,F.Query.wildcard.TRAILING=2,F.Query.presence={OPTIONAL:1,REQUIRED:2,PROHIBITED:3},F.Query.prototype.clause=function(e){return"fields"in e||(e.fields=this.allFields),"boost"in e||(e.boost=1),"usePipeline"in e||(e.usePipeline=!0),"wildcard"in e||(e.wildcard=F.Query.wildcard.NONE),e.wildcard&F.Query.wildcard.LEADING&&e.term.charAt(0)!=F.Query.wildcard&&(e.term="*"+e.term),e.wildcard&F.Query.wildcard.TRAILING&&e.term.slice(-1)!=F.Query.wildcard&&(e.term=e.term+"*"),"presence"in e||(e.presence=F.Query.presence.OPTIONAL),this.clauses.push(e),this},F.Query.prototype.isNegated=function(){for(var e=0;e<this.clauses.length;e++)if(this.clauses[e].presence!=F.Query.presence.PROHIBITED)return!1
return!0},F.Query.prototype.term=function(e,t){if(Array.isArray(e))return e.forEach((function(e){this.term(e,F.utils.clone(t))}),this),this
var r=t||{}
return r.term=e.toString(),this.clause(r),this},F.QueryParseError=function(e,t,r){this.name="QueryParseError",this.message=e,this.start=t,this.end=r},F.QueryParseError.prototype=new Error,F.QueryLexer=function(e){this.lexemes=[],this.str=e,this.length=e.length,this.pos=0,this.start=0,this.escapeCharPositions=[]},F.QueryLexer.prototype.run=function(){for(var e=F.QueryLexer.lexText;e;)e=e(this)},F.QueryLexer.prototype.sliceString=function(){for(var e=[],t=this.start,r=this.pos,n=0;n<this.escapeCharPositions.length;n++)r=this.escapeCharPositions[n],e.push(this.str.slice(t,r)),t=r+1
return e.push(this.str.slice(t,this.pos)),this.escapeCharPositions.length=0,e.join("")},F.QueryLexer.prototype.emit=function(e){this.lexemes.push({type:e,str:this.sliceString(),start:this.start,end:this.pos}),this.start=this.pos},F.QueryLexer.prototype.escapeCharacter=function(){this.escapeCharPositions.push(this.pos-1),this.pos+=1},F.QueryLexer.prototype.next=function(){if(this.pos>=this.length)return F.QueryLexer.EOS
var e=this.str.charAt(this.pos)
return this.pos+=1,e},F.QueryLexer.prototype.width=function(){return this.pos-this.start},F.QueryLexer.prototype.ignore=function(){this.start==this.pos&&(this.pos+=1),this.start=this.pos},F.QueryLexer.prototype.backup=function(){this.pos-=1},F.QueryLexer.prototype.acceptDigitRun=function(){var e,t
do{t=(e=this.next()).charCodeAt(0)}while(t>47&&t<58)
e!=F.QueryLexer.EOS&&this.backup()},F.QueryLexer.prototype.more=function(){return this.pos<this.length},F.QueryLexer.EOS="EOS",F.QueryLexer.FIELD="FIELD",F.QueryLexer.TERM="TERM",F.QueryLexer.EDIT_DISTANCE="EDIT_DISTANCE",F.QueryLexer.BOOST="BOOST",F.QueryLexer.PRESENCE="PRESENCE",F.QueryLexer.lexField=function(e){return e.backup(),e.emit(F.QueryLexer.FIELD),e.ignore(),F.QueryLexer.lexText},F.QueryLexer.lexTerm=function(e){if(e.width()>1&&(e.backup(),e.emit(F.QueryLexer.TERM)),e.ignore(),e.more())return F.QueryLexer.lexText},F.QueryLexer.lexEditDistance=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(F.QueryLexer.EDIT_DISTANCE),F.QueryLexer.lexText},F.QueryLexer.lexBoost=function(e){return e.ignore(),e.acceptDigitRun(),e.emit(F.QueryLexer.BOOST),F.QueryLexer.lexText},F.QueryLexer.lexEOS=function(e){e.width()>0&&e.emit(F.QueryLexer.TERM)},F.QueryLexer.termSeparator=F.tokenizer.separator,F.QueryLexer.lexText=function(e){for(;;){var t=e.next()
if(t==F.QueryLexer.EOS)return F.QueryLexer.lexEOS
if(92!=t.charCodeAt(0)){if(":"==t)return F.QueryLexer.lexField
if("~"==t)return e.backup(),e.width()>0&&e.emit(F.QueryLexer.TERM),F.QueryLexer.lexEditDistance
if("^"==t)return e.backup(),e.width()>0&&e.emit(F.QueryLexer.TERM),F.QueryLexer.lexBoost
if("+"==t&&1===e.width())return e.emit(F.QueryLexer.PRESENCE),F.QueryLexer.lexText
if("-"==t&&1===e.width())return e.emit(F.QueryLexer.PRESENCE),F.QueryLexer.lexText
if(t.match(F.QueryLexer.termSeparator))return F.QueryLexer.lexTerm}else e.escapeCharacter()}},F.QueryParser=function(e,t){this.lexer=new F.QueryLexer(e),this.query=t,this.currentClause={},this.lexemeIdx=0},F.QueryParser.prototype.parse=function(){this.lexer.run(),this.lexemes=this.lexer.lexemes
for(var e=F.QueryParser.parseClause;e;)e=e(this)
return this.query},F.QueryParser.prototype.peekLexeme=function(){return this.lexemes[this.lexemeIdx]},F.QueryParser.prototype.consumeLexeme=function(){var e=this.peekLexeme()
return this.lexemeIdx+=1,e},F.QueryParser.prototype.nextClause=function(){var e=this.currentClause
this.query.clause(e),this.currentClause={}},F.QueryParser.parseClause=function(e){var t=e.peekLexeme()
if(null!=t)switch(t.type){case F.QueryLexer.PRESENCE:return F.QueryParser.parsePresence
case F.QueryLexer.FIELD:return F.QueryParser.parseField
case F.QueryLexer.TERM:return F.QueryParser.parseTerm
default:var r="expected either a field or a term, found "+t.type
throw t.str.length>=1&&(r+=" with value '"+t.str+"'"),new F.QueryParseError(r,t.start,t.end)}},F.QueryParser.parsePresence=function(e){var t=e.consumeLexeme()
if(null!=t){switch(t.str){case"-":e.currentClause.presence=F.Query.presence.PROHIBITED
break
case"+":e.currentClause.presence=F.Query.presence.REQUIRED
break
default:var r="unrecognised presence operator'"+t.str+"'"
throw new F.QueryParseError(r,t.start,t.end)}var n=e.peekLexeme()
if(null==n)throw r="expecting term or field, found nothing",new F.QueryParseError(r,t.start,t.end)
switch(n.type){case F.QueryLexer.FIELD:return F.QueryParser.parseField
case F.QueryLexer.TERM:return F.QueryParser.parseTerm
default:throw r="expecting term or field, found '"+n.type+"'",new F.QueryParseError(r,n.start,n.end)}}},F.QueryParser.parseField=function(e){var t=e.consumeLexeme()
if(null!=t){if(-1==e.query.allFields.indexOf(t.str)){var r=e.query.allFields.map((function(e){return"'"+e+"'"})).join(", "),n="unrecognised field '"+t.str+"', possible fields: "+r
throw new F.QueryParseError(n,t.start,t.end)}e.currentClause.fields=[t.str]
var i=e.peekLexeme()
if(null==i)throw n="expecting term, found nothing",new F.QueryParseError(n,t.start,t.end)
if(i.type===F.QueryLexer.TERM)return F.QueryParser.parseTerm
throw n="expecting term, found '"+i.type+"'",new F.QueryParseError(n,i.start,i.end)}},F.QueryParser.parseTerm=function(e){var t=e.consumeLexeme()
if(null!=t){e.currentClause.term=t.str.toLowerCase(),-1!=t.str.indexOf("*")&&(e.currentClause.usePipeline=!1)
var r=e.peekLexeme()
if(null!=r)switch(r.type){case F.QueryLexer.TERM:return e.nextClause(),F.QueryParser.parseTerm
case F.QueryLexer.FIELD:return e.nextClause(),F.QueryParser.parseField
case F.QueryLexer.EDIT_DISTANCE:return F.QueryParser.parseEditDistance
case F.QueryLexer.BOOST:return F.QueryParser.parseBoost
case F.QueryLexer.PRESENCE:return e.nextClause(),F.QueryParser.parsePresence
default:var n="Unexpected lexeme type '"+r.type+"'"
throw new F.QueryParseError(n,r.start,r.end)}else e.nextClause()}},F.QueryParser.parseEditDistance=function(e){var t=e.consumeLexeme()
if(null!=t){var r=parseInt(t.str,10)
if(isNaN(r)){var n="edit distance must be numeric"
throw new F.QueryParseError(n,t.start,t.end)}e.currentClause.editDistance=r
var i=e.peekLexeme()
if(null!=i)switch(i.type){case F.QueryLexer.TERM:return e.nextClause(),F.QueryParser.parseTerm
case F.QueryLexer.FIELD:return e.nextClause(),F.QueryParser.parseField
case F.QueryLexer.EDIT_DISTANCE:return F.QueryParser.parseEditDistance
case F.QueryLexer.BOOST:return F.QueryParser.parseBoost
case F.QueryLexer.PRESENCE:return e.nextClause(),F.QueryParser.parsePresence
default:throw n="Unexpected lexeme type '"+i.type+"'",new F.QueryParseError(n,i.start,i.end)}else e.nextClause()}},F.QueryParser.parseBoost=function(e){var t=e.consumeLexeme()
if(null!=t){var r=parseInt(t.str,10)
if(isNaN(r)){var n="boost must be numeric"
throw new F.QueryParseError(n,t.start,t.end)}e.currentClause.boost=r
var i=e.peekLexeme()
if(null!=i)switch(i.type){case F.QueryLexer.TERM:return e.nextClause(),F.QueryParser.parseTerm
case F.QueryLexer.FIELD:return e.nextClause(),F.QueryParser.parseField
case F.QueryLexer.EDIT_DISTANCE:return F.QueryParser.parseEditDistance
case F.QueryLexer.BOOST:return F.QueryParser.parseBoost
case F.QueryLexer.PRESENCE:return e.nextClause(),F.QueryParser.parsePresence
default:throw n="Unexpected lexeme type '"+i.type+"'",new F.QueryParseError(n,i.start,i.end)}else e.nextClause()}},void 0===(i="function"==typeof(n=function(){return F})?n.call(t,r,t,e):n)||(e.exports=i)}()},7016:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=function(e){return e[e.length-1]}},6906:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.NodeType=t.TextNode=t.Node=t.valid=t.CommentNode=t.HTMLElement=t.parse=void 0
var i=n(r(8893))
t.CommentNode=i.default
var a=n(r(9191))
t.HTMLElement=a.default
var o=n(r(6222))
t.Node=o.default
var s=n(r(8623))
t.TextNode=s.default
var u=n(r(5166))
t.NodeType=u.default
var l=n(r(4074)),c=n(r(9083))
function d(e,t){return void 0===t&&(t={}),(0,l.default)(e,t)}t.valid=c.default,t.default=d,t.parse=d,d.parse=l.default,d.HTMLElement=a.default,d.CommentNode=i.default,d.valid=c.default,d.Node=o.default,d.TextNode=s.default,d.NodeType=u.default},4952:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0})
var i=n(r(5166))
function a(e){return e&&e.nodeType===i.default.ELEMENT_NODE}function o(e,t){return a(e)?e.getAttribute(t):void 0}function s(e){return e&&e.childNodes}function u(e){return e?e.parentNode:null}t.default={isTag:a,getAttributeValue:o,getName:function(e){return(e&&e.rawTagName||"").toLowerCase()},getChildren:s,getParent:u,getText:function(e){return e.text},removeSubsets:function(e){for(var t,r,n,i=e.length;--i>-1;){for(t=r=e[i],e[i]=null,n=!0;r;){if(e.indexOf(r)>-1){n=!1,e.splice(i,1)
break}r=u(r)}n&&(e[i]=t)}return e},existsOne:function e(t,r){return r.some((function(r){return!!a(r)&&(t(r)||e(t,s(r)))}))},getSiblings:function(e){var t=u(e)
return t?s(t):[]},hasAttrib:function(e,t){return void 0!==o(e,t)},findOne:function e(t,r){for(var n=null,i=0,a=null==r?void 0:r.length;i<a&&!n;i++){var o=r[i]
if(t(o))n=o
else{var u=s(o)
u&&u.length>0&&(n=e(t,u))}}return n},findAll:function e(t,r){for(var n=[],i=0,o=r.length;i<o;i++)if(a(r[i])){t(r[i])&&n.push(r[i])
var u=s(r[i])
u&&(n=n.concat(e(t,u)))}return n}}},8893:function(e,t,r){"use strict"
var n,i=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null")
function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0})
var o=a(r(6222)),s=a(r(5166)),u=function(e){function t(t,r,n){var i=e.call(this,r,n)||this
return i.rawText=t,i.nodeType=s.default.COMMENT_NODE,i}return i(t,e),t.prototype.clone=function(){return new t(this.rawText,null)},Object.defineProperty(t.prototype,"text",{get:function(){return this.rawText},enumerable:!1,configurable:!0}),t.prototype.toString=function(){return"\x3c!--".concat(this.rawText,"--\x3e")},t}(o.default)
t.default=u},9191:function(e,t,r){"use strict"
var n,i=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null")
function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=this&&this.__assign||function(){return a=Object.assign||function(e){for(var t,r=1,n=arguments.length;r<n;r++)for(var i in t=arguments[r])Object.prototype.hasOwnProperty.call(t,i)&&(e[i]=t[i])
return e},a.apply(this,arguments)},o=this&&this.__spreadArray||function(e,t,r){if(r||2===arguments.length)for(var n,i=0,a=t.length;i<a;i++)!n&&i in t||(n||(n=Array.prototype.slice.call(t,0,i)),n[i]=t[i])
return e.concat(n||Array.prototype.slice.call(t))},s=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.parse=t.base_parse=void 0
var u=r(7133),l=s(r(39)),c=s(r(7016)),d=s(r(4952)),h=s(r(817)),f=s(r(8893)),p=s(r(6222)),g=s(r(8623)),m=s(r(5166))
function v(e){return JSON.parse(JSON.stringify(l.default.decode(e)))}var y=new Set
!function(){for(var e=[],t=0;t<arguments.length;t++)e[t]=arguments[t]
for(var r=function(e){for(var t=0;t<e.length;t++){var r=e[t]
y.add(r),y.add(r.toUpperCase())}},n=0,i=e;n<i.length;n++)r(i[n])}(["h1","h2","h3","h4","h5","h6","header","hgroup"],["details","dialog","dd","div","dt"],["fieldset","figcaption","figure","footer","form"],["table","td","tr"],["address","article","aside","blockquote","br","hr","li","main","nav","ol","p","pre","section","ul"])
var b=function(){function e(e,t){void 0===e&&(e=[]),void 0===t&&(t=function(){return null}),this._set=new Set(e),this._afterUpdate=t}return e.prototype._validate=function(e){if(/\s/.test(e))throw new Error("DOMException in DOMTokenList.add: The token '".concat(e,"' contains HTML space characters, which are not valid in tokens."))},e.prototype.add=function(e){this._validate(e),this._set.add(e),this._afterUpdate(this)},e.prototype.replace=function(e,t){this._validate(t),this._set.delete(e),this._set.add(t),this._afterUpdate(this)},e.prototype.remove=function(e){this._set.delete(e)&&this._afterUpdate(this)},e.prototype.toggle=function(e){this._validate(e),this._set.has(e)?this._set.delete(e):this._set.add(e),this._afterUpdate(this)},e.prototype.contains=function(e){return this._set.has(e)},Object.defineProperty(e.prototype,"length",{get:function(){return this._set.size},enumerable:!1,configurable:!0}),e.prototype.values=function(){return this._set.values()},Object.defineProperty(e.prototype,"value",{get:function(){return Array.from(this._set.values())},enumerable:!1,configurable:!0}),e.prototype.toString=function(){return Array.from(this._set.values()).join(" ")},e}(),E=function(e){function t(t,r,n,i,a,o,s){void 0===n&&(n=""),void 0===o&&(o=new h.default),void 0===s&&(s={})
var u=e.call(this,i,a)||this
if(u.rawAttrs=n,u.voidTag=o,u.nodeType=m.default.ELEMENT_NODE,u.rawTagName=t,u.rawAttrs=n||"",u.id=r.id||"",u.childNodes=[],u._parseOptions=s,u.classList=new b(r.class?r.class.split(/\s+/):[],(function(e){return u.setAttribute("class",e.toString())})),r.id&&(n||(u.rawAttrs='id="'.concat(r.id,'"'))),r.class&&!n){var l='class="'.concat(u.classList.toString(),'"')
u.rawAttrs?u.rawAttrs+=" ".concat(l):u.rawAttrs=l}return u}return i(t,e),t.prototype.quoteAttribute=function(e){return null==e?"null":JSON.stringify(e.replace(/"/g,"&quot;"))},t.prototype.removeChild=function(e){return this.childNodes=this.childNodes.filter((function(t){return t!==e})),this},t.prototype.exchangeChild=function(e,t){var r=this.childNodes
return this.childNodes=r.map((function(r){return r===e?t:r})),this},Object.defineProperty(t.prototype,"tagName",{get:function(){return this.rawTagName?this.rawTagName.toUpperCase():this.rawTagName},set:function(e){this.rawTagName=e.toLowerCase()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"localName",{get:function(){return this.rawTagName.toLowerCase()},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isVoidElement",{get:function(){return this.voidTag.isVoidElement(this.localName)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rawText",{get:function(){return this.childNodes.reduce((function(e,t){return e+t.rawText}),"")},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"textContent",{get:function(){return v(this.rawText)},set:function(e){var t=[new g.default(e,this)]
this.childNodes=t},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"text",{get:function(){return v(this.rawText)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"structuredText",{get:function(){var e=[],t=[e]
return function r(n){if(n.nodeType===m.default.ELEMENT_NODE)y.has(n.rawTagName)?(e.length>0&&t.push(e=[]),n.childNodes.forEach(r),e.length>0&&t.push(e=[])):n.childNodes.forEach(r)
else if(n.nodeType===m.default.TEXT_NODE)if(n.isWhitespace)e.prependWhitespace=!0
else{var i=n.trimmedText
e.prependWhitespace&&(i=" ".concat(i),e.prependWhitespace=!1),e.push(i)}}(this),t.map((function(e){return e.join("").replace(/\s{2,}/g," ")})).join("\n").replace(/\s+$/,"")},enumerable:!1,configurable:!0}),t.prototype.toString=function(){var e=this.rawTagName
if(e){var t=this.rawAttrs?" ".concat(this.rawAttrs):""
return this.voidTag.formatNode(e,t,this.innerHTML)}return this.innerHTML},Object.defineProperty(t.prototype,"innerHTML",{get:function(){return this.childNodes.map((function(e){return e.toString()})).join("")},set:function(e){var t=x(e,this._parseOptions),r=t.childNodes.length?t.childNodes:[new g.default(e,this)]
C(r,this),C(this.childNodes,null),this.childNodes=r},enumerable:!1,configurable:!0}),t.prototype.set_content=function(e,t){if(void 0===t&&(t={}),e instanceof p.default)e=[e]
else if("string"==typeof e){var r=x(e,t=a(a({},this._parseOptions),t))
e=r.childNodes.length?r.childNodes:[new g.default(r.innerHTML,this)]}return C(this.childNodes,null),C(e,this),this.childNodes=e,this},t.prototype.replaceWith=function(){for(var e=this,t=[],r=0;r<arguments.length;r++)t[r]=arguments[r]
var n=this.parentNode,i=t.map((function(t){if(t instanceof p.default)return[t]
if("string"==typeof t){var r=x(t,e._parseOptions)
return r.childNodes.length?r.childNodes:[new g.default(t,e)]}return[]})).flat(),a=n.childNodes.findIndex((function(t){return t===e}))
return C([this],null),n.childNodes=o(o(o([],n.childNodes.slice(0,a),!0),C(i,n),!0),n.childNodes.slice(a+1),!0),this},Object.defineProperty(t.prototype,"outerHTML",{get:function(){return this.toString()},enumerable:!1,configurable:!0}),t.prototype.trimRight=function(e){for(var t=0;t<this.childNodes.length;t++){var r=this.childNodes[t]
if(r.nodeType===m.default.ELEMENT_NODE)r.trimRight(e)
else{var n=r.rawText.search(e)
n>-1&&(r.rawText=r.rawText.substr(0,n),this.childNodes.length=t+1)}}return this},Object.defineProperty(t.prototype,"structure",{get:function(){var e=[],t=0
function r(r){e.push("  ".repeat(t)+r)}return function e(n){var i=n.id?"#".concat(n.id):"",a=n.classList.length?".".concat(n.classList.value.join(".")):""
r("".concat(n.rawTagName).concat(i).concat(a)),t++,n.childNodes.forEach((function(t){t.nodeType===m.default.ELEMENT_NODE?e(t):t.nodeType===m.default.TEXT_NODE&&(t.isWhitespace||r("#text"))})),t--}(this),e.join("\n")},enumerable:!1,configurable:!0}),t.prototype.removeWhitespace=function(){var e=this,t=0
return this.childNodes.forEach((function(r){if(r.nodeType===m.default.TEXT_NODE){if(r.isWhitespace)return
r.rawText=r.trimmedRawText}else r.nodeType===m.default.ELEMENT_NODE&&r.removeWhitespace()
e.childNodes[t++]=r})),this.childNodes.length=t,this},t.prototype.querySelectorAll=function(e){return(0,u.selectAll)(e,this,{xmlMode:!0,adapter:d.default})},t.prototype.querySelector=function(e){return(0,u.selectOne)(e,this,{xmlMode:!0,adapter:d.default})},t.prototype.getElementsByTagName=function(e){for(var t=e.toUpperCase(),r=[],n=[],i=this,a=0;void 0!==a;){var o=void 0
do{o=i.childNodes[a++]}while(a<i.childNodes.length&&void 0===o)
void 0!==o?o.nodeType===m.default.ELEMENT_NODE&&("*"!==e&&o.tagName!==t||r.push(o),o.childNodes.length>0&&(n.push(a),i=o,a=0)):(i=i.parentNode,a=n.pop())}return r},t.prototype.getElementById=function(e){for(var t=[],r=this,n=0;void 0!==n;){var i=void 0
do{i=r.childNodes[n++]}while(n<r.childNodes.length&&void 0===i)
if(void 0!==i){if(i.nodeType===m.default.ELEMENT_NODE){if(i.id===e)return i
i.childNodes.length>0&&(t.push(n),r=i,n=0)}}else r=r.parentNode,n=t.pop()}return null},t.prototype.closest=function(e){var t=new Map,r=this,n=null
function i(e,r){for(var n=null,a=0,o=r.length;a<o&&!n;a++){var s=r[a]
if(e(s))n=s
else{var u=t.get(s)
u&&(n=i(e,[u]))}}return n}for(;r;)t.set(r,n),n=r,r=r.parentNode
for(r=this;r;){var o=(0,u.selectOne)(e,r,{xmlMode:!0,adapter:a(a({},d.default),{getChildren:function(e){var r=t.get(e)
return r&&[r]},getSiblings:function(e){return[e]},findOne:i,findAll:function(){return[]}})})
if(o)return o
r=r.parentNode}return null},t.prototype.appendChild=function(e){return e.remove(),this.childNodes.push(e),e.parentNode=this,e},Object.defineProperty(t.prototype,"firstChild",{get:function(){return this.childNodes[0]},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"lastChild",{get:function(){return(0,c.default)(this.childNodes)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"attrs",{get:function(){if(this._attrs)return this._attrs
this._attrs={}
var e=this.rawAttributes
for(var t in e){var r=e[t]||""
this._attrs[t.toLowerCase()]=v(r)}return this._attrs},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"attributes",{get:function(){var e={},t=this.rawAttributes
for(var r in t){var n=t[r]||""
e[r]=v(n)}return e},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"rawAttributes",{get:function(){if(this._rawAttrs)return this._rawAttrs
var e={}
if(this.rawAttrs)for(var t=/([a-zA-Z()[\]#@$.?:][a-zA-Z0-9-_:()[\]#]*)(?:\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+))?/g,r=void 0;r=t.exec(this.rawAttrs);){var n=r[1],i=r[2]||null
!i||"'"!==i[0]&&'"'!==i[0]||(i=i.slice(1,i.length-1)),e[n]=e[n]||i}return this._rawAttrs=e,e},enumerable:!1,configurable:!0}),t.prototype.removeAttribute=function(e){var t=this.rawAttributes
return delete t[e],this._attrs&&delete this._attrs[e],this.rawAttrs=Object.keys(t).map((function(e){var r=JSON.stringify(t[e])
return void 0===r||"null"===r?e:"".concat(e,"=").concat(r)})).join(" "),"id"===e&&(this.id=""),this},t.prototype.hasAttribute=function(e){return e.toLowerCase()in this.attrs},t.prototype.getAttribute=function(e){return this.attrs[e.toLowerCase()]},t.prototype.setAttribute=function(e,t){var r=this
if(arguments.length<2)throw new Error("Failed to execute 'setAttribute' on 'Element'")
var n=e.toLowerCase(),i=this.rawAttributes
for(var a in i)if(a.toLowerCase()===n){e=a
break}return i[e]=String(t),this._attrs&&(this._attrs[n]=v(i[e])),this.rawAttrs=Object.keys(i).map((function(e){var t=r.quoteAttribute(i[e])
return"null"===t||'""'===t?e:"".concat(e,"=").concat(t)})).join(" "),"id"===e&&(this.id=t),this},t.prototype.setAttributes=function(e){var t=this
return this._attrs&&delete this._attrs,this._rawAttrs&&delete this._rawAttrs,this.rawAttrs=Object.keys(e).map((function(r){var n=e[r]
return"null"===n||'""'===n?r:"".concat(r,"=").concat(t.quoteAttribute(String(n)))})).join(" "),this},t.prototype.insertAdjacentHTML=function(e,t){var r,n,i,a=this
if(arguments.length<2)throw new Error("2 arguments required")
var s=x(t,this._parseOptions)
if("afterend"===e){var u=this.parentNode.childNodes.findIndex((function(e){return e===a}))
C(s.childNodes,this.parentNode),(r=this.parentNode.childNodes).splice.apply(r,o([u+1,0],s.childNodes,!1))}else if("afterbegin"===e)C(s.childNodes,this),(n=this.childNodes).unshift.apply(n,s.childNodes)
else if("beforeend"===e)s.childNodes.forEach((function(e){a.appendChild(e)}))
else{if("beforebegin"!==e)throw new Error("The value provided ('".concat(e,"') is not one of 'beforebegin', 'afterbegin', 'beforeend', or 'afterend'"))
u=this.parentNode.childNodes.findIndex((function(e){return e===a})),C(s.childNodes,this.parentNode),(i=this.parentNode.childNodes).splice.apply(i,o([u,0],s.childNodes,!1))}return this},Object.defineProperty(t.prototype,"nextSibling",{get:function(){if(this.parentNode){for(var e=this.parentNode.childNodes,t=0;t<e.length;)if(this===e[t++])return e[t]||null
return null}},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"nextElementSibling",{get:function(){if(this.parentNode){for(var e=this.parentNode.childNodes,r=0,n=!1;r<e.length;){var i=e[r++]
if(n){if(i instanceof t)return i||null}else this===i&&(n=!0)}return null}},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"previousSibling",{get:function(){if(this.parentNode){for(var e=this.parentNode.childNodes,t=e.length;t>0;)if(this===e[--t])return e[t-1]||null
return null}},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"previousElementSibling",{get:function(){if(this.parentNode){for(var e=this.parentNode.childNodes,r=e.length,n=!1;r>0;){var i=e[--r]
if(n){if(i instanceof t)return i||null}else this===i&&(n=!0)}return null}},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"classNames",{get:function(){return this.classList.toString()},enumerable:!1,configurable:!0}),t.prototype.clone=function(){return x(this.toString(),this._parseOptions).firstChild},t}(p.default)
t.default=E
var w=/<!--[\s\S]*?-->|<(\/?)([a-zA-Z][-.:0-9_a-zA-Z]*)((?:\s+[^>]*?(?:(?:'[^']*')|(?:"[^"]*"))?)*)\s*(\/?)>/g,_=/(?:^|\s)(id|class)\s*=\s*((?:'[^']*')|(?:"[^"]*")|\S+)/gi,T={area:!0,AREA:!0,base:!0,BASE:!0,br:!0,BR:!0,col:!0,COL:!0,hr:!0,HR:!0,img:!0,IMG:!0,input:!0,INPUT:!0,link:!0,LINK:!0,meta:!0,META:!0,source:!0,SOURCE:!0,embed:!0,EMBED:!0,param:!0,PARAM:!0,track:!0,TRACK:!0,wbr:!0,WBR:!0},A={li:{li:!0,LI:!0},LI:{li:!0,LI:!0},p:{p:!0,div:!0,P:!0,DIV:!0},P:{p:!0,div:!0,P:!0,DIV:!0},b:{div:!0,DIV:!0},B:{div:!0,DIV:!0},td:{td:!0,th:!0,TD:!0,TH:!0},TD:{td:!0,th:!0,TD:!0,TH:!0},th:{td:!0,th:!0,TD:!0,TH:!0},TH:{td:!0,th:!0,TD:!0,TH:!0},h1:{h1:!0,H1:!0},H1:{h1:!0,H1:!0},h2:{h2:!0,H2:!0},H2:{h2:!0,H2:!0},h3:{h3:!0,H3:!0},H3:{h3:!0,H3:!0},h4:{h4:!0,H4:!0},H4:{h4:!0,H4:!0},h5:{h5:!0,H5:!0},H5:{h5:!0,H5:!0},h6:{h6:!0,H6:!0},H6:{h6:!0,H6:!0}},D={li:{ul:!0,ol:!0,UL:!0,OL:!0},LI:{ul:!0,ol:!0,UL:!0,OL:!0},a:{div:!0,DIV:!0},A:{div:!0,DIV:!0},b:{div:!0,DIV:!0},B:{div:!0,DIV:!0},i:{div:!0,DIV:!0},I:{div:!0,DIV:!0},p:{div:!0,DIV:!0},P:{div:!0,DIV:!0},td:{tr:!0,table:!0,TR:!0,TABLE:!0},TD:{tr:!0,table:!0,TR:!0,TABLE:!0},th:{tr:!0,table:!0,TR:!0,TABLE:!0},TH:{tr:!0,table:!0,TR:!0,TABLE:!0}},k="documentfragmentcontainer"
function S(e,t){var r,n
void 0===t&&(t={})
var i=new h.default(null===(r=null==t?void 0:t.voidTag)||void 0===r?void 0:r.closingSlash,null===(n=null==t?void 0:t.voidTag)||void 0===n?void 0:n.tags),a=t.blockTextElements||{script:!0,noscript:!0,style:!0,pre:!0},o=Object.keys(a),s=o.map((function(e){return new RegExp("^".concat(e,"$"),"i")})),u=o.filter((function(e){return a[e]})).map((function(e){return new RegExp("^".concat(e,"$"),"i")}))
function l(e){return u.some((function(t){return t.test(e)}))}function d(e){return s.some((function(t){return t.test(e)}))}var p,m=function(e,t){return[e-I,t-I]},v=new E(null,{},"",null,[0,e.length],i,t),y=v,b=[v],S=-1,x=void 0
e="<".concat(k,">").concat(e,"</").concat(k,">")
for(var C=t.lowerCaseTagName,L=t.fixNestedATags,R=e.length-(k.length+2),I=k.length+2;p=w.exec(e);){var O=p[0],F=p[1],P=p[2],N=p[3],M=p[4],B=O.length,U=w.lastIndex-B,q=w.lastIndex
if(S>-1&&S+B<q){var j=e.substring(S,U)
y.appendChild(new g.default(j,y,m(S,U)))}if(S=w.lastIndex,P!==k)if("!"!==O[1]){if(C&&(P=P.toLowerCase()),!F){for(var G={},H=void 0;H=_.exec(N);){var V=H[1],z=H[2],K="'"===z[0]||'"'===z[0]
G[V.toLowerCase()]=K?z.slice(1,z.length-1):z}var W=y.rawTagName
!M&&A[W]&&A[W][P]&&(b.pop(),y=(0,c.default)(b)),!L||"a"!==P&&"A"!==P||(void 0!==x&&(b.splice(x),y=(0,c.default)(b)),x=b.length)
var $=w.lastIndex,Y=$-B
if(y=y.appendChild(new E(P,G,N.slice(1),null,m(Y,$),i,t)),b.push(y),d(P)){var Q="</".concat(P,">"),X=C?e.toLocaleLowerCase().indexOf(Q,w.lastIndex):e.indexOf(Q,w.lastIndex),Z=-1===X?R:X
l(P)&&(j=e.substring($,Z)).length>0&&/\S/.test(j)&&y.appendChild(new g.default(j,y,m($,Z))),-1===X?S=w.lastIndex=e.length+1:(S=w.lastIndex=X+Q.length,F="/")}}if(F||M||T[P])for(;;){if(null==x||"a"!==P&&"A"!==P||(x=void 0),y.rawTagName===P){y.range[1]=m(-1,Math.max(S,q))[1],b.pop(),y=(0,c.default)(b)
break}if(W=y.tagName,!D[W]||!D[W][P])break
b.pop(),y=(0,c.default)(b)}}else t.comment&&(j=e.substring(U+4,q-3),y.appendChild(new f.default(j,y,m(U,q))))}return b}function x(e,t){void 0===t&&(t={})
for(var r=S(e,t),n=r[0],i=function(){var e=r.pop(),n=(0,c.default)(r)
e.parentNode&&e.parentNode.parentNode&&(e.parentNode===n&&e.tagName===n.tagName?!0!==t.parseNoneClosedTags&&(n.removeChild(e),e.childNodes.forEach((function(e){n.parentNode.appendChild(e)})),r.pop()):!0!==t.parseNoneClosedTags&&(n.removeChild(e),e.childNodes.forEach((function(e){n.appendChild(e)}))))};r.length>1;)i()
return n}function C(e,t){return e.map((function(e){return e.parentNode=t,e}))}t.base_parse=S,t.parse=x},6222:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n=r(39),i=function(){function e(e,t){void 0===e&&(e=null),this.parentNode=e,this.childNodes=[],Object.defineProperty(this,"range",{enumerable:!1,writable:!0,configurable:!0,value:null!=t?t:[-1,-1]})}return e.prototype.remove=function(){var e=this
if(this.parentNode){var t=this.parentNode.childNodes
this.parentNode.childNodes=t.filter((function(t){return e!==t})),this.parentNode=null}return this},Object.defineProperty(e.prototype,"innerText",{get:function(){return this.rawText},enumerable:!1,configurable:!0}),Object.defineProperty(e.prototype,"textContent",{get:function(){return(0,n.decode)(this.rawText)},set:function(e){this.rawText=(0,n.encode)(e)},enumerable:!1,configurable:!0}),e}()
t.default=i},8623:function(e,t,r){"use strict"
var n,i=this&&this.__extends||(n=function(e,t){return n=Object.setPrototypeOf||{__proto__:[]}instanceof Array&&function(e,t){e.__proto__=t}||function(e,t){for(var r in t)Object.prototype.hasOwnProperty.call(t,r)&&(e[r]=t[r])},n(e,t)},function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Class extends value "+String(t)+" is not a constructor or null")
function r(){this.constructor=e}n(e,t),e.prototype=null===t?Object.create(t):(r.prototype=t.prototype,new r)}),a=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0})
var o=r(39),s=a(r(6222)),u=a(r(5166)),l=function(e){function t(t,r,n){var i=e.call(this,r,n)||this
return i.nodeType=u.default.TEXT_NODE,i._rawText=t,i}return i(t,e),t.prototype.clone=function(){return new t(this._rawText,null)},Object.defineProperty(t.prototype,"rawText",{get:function(){return this._rawText},set:function(e){this._rawText=e,this._trimmedRawText=void 0,this._trimmedText=void 0},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"trimmedRawText",{get:function(){return void 0!==this._trimmedRawText||(this._trimmedRawText=c(this.rawText)),this._trimmedRawText},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"trimmedText",{get:function(){return void 0!==this._trimmedText||(this._trimmedText=c(this.text)),this._trimmedText},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"text",{get:function(){return(0,o.decode)(this.rawText)},enumerable:!1,configurable:!0}),Object.defineProperty(t.prototype,"isWhitespace",{get:function(){return/^(\s|&nbsp;)*$/.test(this.rawText)},enumerable:!1,configurable:!0}),t.prototype.toString=function(){return this.rawText},t}(s.default)
function c(e){for(var t,r,n=0;n>=0&&n<e.length;)/\S/.test(e[n])&&(void 0===t?(t=n,n=e.length):(r=n,n=void 0)),void 0===t?n++:n--
void 0===t&&(t=0),void 0===r&&(r=e.length-1)
var i=t>0&&/[^\S\r\n]/.test(e[t-1]),a=r<e.length-1&&/[^\S\r\n]/.test(e[r+1])
return(i?" ":"")+e.slice(t,r+1)+(a?" ":"")}t.default=l},5166:(e,t)=>{"use strict"
var r
Object.defineProperty(t,"__esModule",{value:!0}),function(e){e[e.ELEMENT_NODE=1]="ELEMENT_NODE",e[e.TEXT_NODE=3]="TEXT_NODE",e[e.COMMENT_NODE=8]="COMMENT_NODE"}(r||(r={})),t.default=r},4074:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0
var n=r(9191)
Object.defineProperty(t,"default",{enumerable:!0,get:function(){return n.parse}})},9083:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var n=r(9191)
t.default=function(e,t){void 0===t&&(t={})
var r=(0,n.base_parse)(e,t)
return Boolean(1===r.length)}},817:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0})
var r=function(){function e(e,t){void 0===e&&(e=!1),this.addClosingSlash=e,Array.isArray(t)?this.voidTags=t.reduce((function(e,t){return e.add(t.toLowerCase())}),new Set):this.voidTags=["area","base","br","col","embed","hr","img","input","link","meta","param","source","track","wbr"].reduce((function(e,t){return e.add(t)}),new Set)}return e.prototype.formatNode=function(e,t,r){var n=this.addClosingSlash,i=n&&t&&!t.endsWith(" ")?" ":"",a=n?"".concat(i,"/"):""
return this.isVoidElement(e.toLowerCase())?"<".concat(e).concat(t).concat(a,">"):"<".concat(e).concat(t,">").concat(r,"</").concat(e,">")},e.prototype.isVoidElement=function(e){return this.voidTags.has(e)},e}()
t.default=r},1289:function(e,t,r){"use strict"
var n=this&&this.__importDefault||function(e){return e&&e.__esModule?e:{default:e}}
Object.defineProperty(t,"__esModule",{value:!0}),t.generate=t.compile=void 0
var i=n(r(7544))
t.compile=function(e){var t=e[0],r=e[1]-1
if(r<0&&t<=0)return i.default.falseFunc
if(-1===t)return function(e){return e<=r}
if(0===t)return function(e){return e===r}
if(1===t)return r<0?i.default.trueFunc:function(e){return e>=r}
var n=Math.abs(t),a=(r%n+n)%n
return t>1?function(e){return e>=r&&e%n===a}:function(e){return e<=r&&e%n===a}},t.generate=function(e){var t=e[0],r=e[1]-1,n=0
if(t<0){var i=-t,a=(r%i+i)%i
return function(){var e=a+i*n++
return e>r?null:e}}return 0===t?r<0?function(){return null}:function(){return 0==n++?r:null}:(r<0&&(r+=t*Math.ceil(-r/t)),function(){return t*n+++r})}},1316:(e,t,r)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.sequence=t.generate=t.compile=t.parse=void 0
var n=r(9922)
Object.defineProperty(t,"parse",{enumerable:!0,get:function(){return n.parse}})
var i=r(1289)
Object.defineProperty(t,"compile",{enumerable:!0,get:function(){return i.compile}}),Object.defineProperty(t,"generate",{enumerable:!0,get:function(){return i.generate}}),t.default=function(e){return(0,i.compile)((0,n.parse)(e))},t.sequence=function(e){return(0,i.generate)((0,n.parse)(e))}},9922:(e,t)=>{"use strict"
Object.defineProperty(t,"__esModule",{value:!0}),t.parse=void 0
var r=new Set([9,10,12,13,32]),n="0".charCodeAt(0),i="9".charCodeAt(0)
t.parse=function(e){if("even"===(e=e.trim().toLowerCase()))return[2,0]
if("odd"===e)return[2,1]
var t=0,a=0,o=u(),s=l()
if(t<e.length&&"n"===e.charAt(t)&&(t++,a=o*(null!=s?s:1),c(),t<e.length?(o=u(),c(),s=l()):o=s=0),null===s||t<e.length)throw new Error("n-th rule couldn't be parsed ('".concat(e,"')"))
return[a,o*s]
function u(){return"-"===e.charAt(t)?(t++,-1):("+"===e.charAt(t)&&t++,1)}function l(){for(var r=t,a=0;t<e.length&&e.charCodeAt(t)>=n&&e.charCodeAt(t)<=i;)a=10*a+(e.charCodeAt(t)-n),t++
return t===r?null:a}function c(){for(;t<e.length&&r.has(e.charCodeAt(t));)t++}}},9428:(e,t,r)=>{"use strict"
var n=r(2134)
function i(){}function a(){}a.resetWarningCache=i,e.exports=function(){function e(e,t,r,i,a,o){if(o!==n){var s=new Error("Calling PropTypes validators directly is not supported by the `prop-types` package. Use PropTypes.checkPropTypes() to call them. Read more at http://fb.me/use-check-prop-types")
throw s.name="Invariant Violation",s}}function t(){return e}e.isRequired=e
var r={array:e,bigint:e,bool:e,func:e,number:e,object:e,string:e,symbol:e,any:e,arrayOf:t,element:e,elementType:e,instanceOf:t,node:e,objectOf:t,oneOf:t,oneOfType:t,shape:t,exact:t,checkPropTypes:a,resetWarningCache:i}
return r.PropTypes=r,r}},6526:(e,t,r)=>{e.exports=r(9428)()},2134:e=>{"use strict"
e.exports="SECRET_DO_NOT_PASS_THIS_OR_YOU_WILL_BE_FIRED"},2158:function(e,t){var r,n
r=function(){"use strict"
var e=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}()
function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}var r=void 0
void 0===r&&(r={modules:[]})
var n=null
function i(e){var t=e.getBoundingClientRect(),r={}
for(var n in t)r[n]=t[n]
try{if(e.ownerDocument!==document){var a=e.ownerDocument.defaultView.frameElement
if(a){var o=i(a)
r.top+=o.top,r.bottom+=o.top,r.left+=o.left,r.right+=o.left}}}catch(e){}return r}function a(e){var t=(getComputedStyle(e)||{}).position,r=[]
if("fixed"===t)return[e]
for(var n=e;(n=n.parentNode)&&n&&1===n.nodeType;){var i=void 0
try{i=getComputedStyle(n)}catch(e){}if(null==i)return r.push(n),r
var a=i,o=a.overflow,s=a.overflowX,u=a.overflowY;/(auto|scroll|overlay)/.test(o+u+s)&&("absolute"!==t||["relative","absolute","fixed"].indexOf(i.position)>=0)&&r.push(n)}return r.push(e.ownerDocument.body),e.ownerDocument!==document&&r.push(e.ownerDocument.defaultView),r}var o,s=(o=0,function(){return++o}),u={},l=function(){var e=n
e&&document.body.contains(e)||((e=document.createElement("div")).setAttribute("data-tether-id",s()),g(e.style,{top:0,left:0,position:"absolute"}),document.body.appendChild(e),n=e)
var t=e.getAttribute("data-tether-id")
return void 0===u[t]&&(u[t]=i(e),T((function(){delete u[t]}))),u[t]}
function c(){n&&document.body.removeChild(n),n=null}function d(e){var t=void 0
e===document?(t=document,e=document.documentElement):t=e.ownerDocument
var r=t.documentElement,n=i(e),a=l()
return n.top-=a.top,n.left-=a.left,void 0===n.width&&(n.width=document.body.scrollWidth-n.left-n.right),void 0===n.height&&(n.height=document.body.scrollHeight-n.top-n.bottom),n.top=n.top-r.clientTop,n.left=n.left-r.clientLeft,n.right=t.body.clientWidth-n.width-n.left,n.bottom=t.body.clientHeight-n.height-n.top,n}function h(e){return e.offsetParent||document.documentElement}var f=null
function p(){if(f)return f
var e=document.createElement("div")
e.style.width="100%",e.style.height="200px"
var t=document.createElement("div")
g(t.style,{position:"absolute",top:0,left:0,pointerEvents:"none",visibility:"hidden",width:"200px",height:"150px",overflow:"hidden"}),t.appendChild(e),document.body.appendChild(t)
var r=e.offsetWidth
t.style.overflow="scroll"
var n=e.offsetWidth
r===n&&(n=t.clientWidth),document.body.removeChild(t)
var i=r-n
return f={width:i,height:i}}function g(){var e=arguments.length<=0||void 0===arguments[0]?{}:arguments[0],t=[]
return Array.prototype.push.apply(t,arguments),t.slice(1).forEach((function(t){if(t)for(var r in t)({}).hasOwnProperty.call(t,r)&&(e[r]=t[r])})),e}function m(e,t){if(void 0!==e.classList)t.split(" ").forEach((function(t){t.trim()&&e.classList.remove(t)}))
else{var r=new RegExp("(^| )"+t.split(" ").join("|")+"( |$)","gi"),n=b(e).replace(r," ")
E(e,n)}}function v(e,t){if(void 0!==e.classList)t.split(" ").forEach((function(t){t.trim()&&e.classList.add(t)}))
else{m(e,t)
var r=b(e)+" "+t
E(e,r)}}function y(e,t){if(void 0!==e.classList)return e.classList.contains(t)
var r=b(e)
return new RegExp("(^| )"+t+"( |$)","gi").test(r)}function b(e){return e.className instanceof e.ownerDocument.defaultView.SVGAnimatedString?e.className.baseVal:e.className}function E(e,t){e.setAttribute("class",t)}function w(e,t,r){r.forEach((function(r){-1===t.indexOf(r)&&y(e,r)&&m(e,r)})),t.forEach((function(t){y(e,t)||v(e,t)}))}var _=[],T=function(e){_.push(e)},A=function(){for(var e=void 0;e=_.pop();)e()},D=function(){function r(){t(this,r)}return e(r,[{key:"on",value:function(e,t,r){var n=!(arguments.length<=3||void 0===arguments[3])&&arguments[3]
void 0===this.bindings&&(this.bindings={}),void 0===this.bindings[e]&&(this.bindings[e]=[]),this.bindings[e].push({handler:t,ctx:r,once:n})}},{key:"once",value:function(e,t,r){this.on(e,t,r,!0)}},{key:"off",value:function(e,t){if(void 0!==this.bindings&&void 0!==this.bindings[e])if(void 0===t)delete this.bindings[e]
else for(var r=0;r<this.bindings[e].length;)this.bindings[e][r].handler===t?this.bindings[e].splice(r,1):++r}},{key:"trigger",value:function(e){if(void 0!==this.bindings&&this.bindings[e]){for(var t=0,r=arguments.length,n=Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i]
for(;t<this.bindings[e].length;){var a=this.bindings[e][t],o=a.handler,s=a.ctx,u=a.once,l=s
void 0===l&&(l=this),o.apply(l,n),u?this.bindings[e].splice(t,1):++t}}}}]),r}()
r.Utils={getActualBoundingClientRect:i,getScrollParents:a,getBounds:d,getOffsetParent:h,extend:g,addClass:v,removeClass:m,hasClass:y,updateClasses:w,defer:T,flush:A,uniqueId:s,Evented:D,getScrollBarSize:p,removeUtilElements:c}
var k=function(e,t){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,a=void 0
try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,a=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw a}}return r}(e,t)
throw new TypeError("Invalid attempt to destructure non-iterable instance")},S=(e=function(){function e(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,n.key,n)}}return function(t,r,n){return r&&e(t.prototype,r),n&&e(t,n),t}}(),function(e,t,r){for(var n=!0;n;){var i=e,a=t,o=r
n=!1,null===i&&(i=Function.prototype)
var s=Object.getOwnPropertyDescriptor(i,a)
if(void 0!==s){if("value"in s)return s.value
var u=s.get
if(void 0===u)return
return u.call(o)}var l=Object.getPrototypeOf(i)
if(null===l)return
e=l,t=a,r=o,n=!0,s=l=void 0}})
function t(e,t){if(!(e instanceof t))throw new TypeError("Cannot call a class as a function")}if(void 0===r)throw new Error("You must include the utils.js file before tether.js")
var a=($=r.Utils).getScrollParents,h=(d=$.getBounds,$.getOffsetParent),v=(g=$.extend,$.addClass),m=$.removeClass,p=(w=$.updateClasses,T=$.defer,A=$.flush,$.getScrollBarSize),c=$.removeUtilElements
function x(e,t){var r=arguments.length<=2||void 0===arguments[2]?1:arguments[2]
return e+r>=t&&t>=e-r}var C,L,R,I,O=function(){if("undefined"==typeof document)return""
for(var e=document.createElement("div"),t=["transform","WebkitTransform","OTransform","MozTransform","msTransform"],r=0;r<t.length;++r){var n=t[r]
if(void 0!==e.style[n])return n}}(),F=[],P=function(){F.forEach((function(e){e.position(!1)})),A()}
function N(){return"object"==typeof performance&&"function"==typeof performance.now?performance.now():+new Date}C=null,L=null,R=null,I=function e(){if(void 0!==L&&L>16)return L=Math.min(L-16,250),void(R=setTimeout(e,250))
void 0!==C&&N()-C<10||(null!=R&&(clearTimeout(R),R=null),C=N(),P(),L=N()-C)},"undefined"!=typeof window&&void 0!==window.addEventListener&&["resize","scroll","touchmove"].forEach((function(e){window.addEventListener(e,I)}))
var M={center:"center",left:"right",right:"left"},B={middle:"middle",top:"bottom",bottom:"top"},U={top:0,left:0,middle:"50%",center:"50%",bottom:"100%",right:"100%"},q=function(e){var t=e.left,r=e.top
return void 0!==U[e.left]&&(t=U[e.left]),void 0!==U[e.top]&&(r=U[e.top]),{left:t,top:r}}
function j(){for(var e={top:0,left:0},t=arguments.length,r=Array(t),n=0;n<t;n++)r[n]=arguments[n]
return r.forEach((function(t){var r=t.top,n=t.left
"string"==typeof r&&(r=parseFloat(r,10)),"string"==typeof n&&(n=parseFloat(n,10)),e.top+=r,e.left+=n})),e}function G(e,t){return"string"==typeof e.left&&-1!==e.left.indexOf("%")&&(e.left=parseFloat(e.left,10)/100*t.width),"string"==typeof e.top&&-1!==e.top.indexOf("%")&&(e.top=parseFloat(e.top,10)/100*t.height),e}var H=function(e){var t=e.split(" "),r=k(t,2)
return{top:r[0],left:r[1]}},V=H,z=function(n){function i(e){var n=this
t(this,i),S(Object.getPrototypeOf(i.prototype),"constructor",this).call(this),this.position=this.position.bind(this),F.push(this),this.history=[],this.setOptions(e,!1),r.modules.forEach((function(e){void 0!==e.initialize&&e.initialize.call(n)})),this.position()}return function(e,t){if("function"!=typeof t&&null!==t)throw new TypeError("Super expression must either be null or a function, not "+typeof t)
e.prototype=Object.create(t&&t.prototype,{constructor:{value:e,enumerable:!1,writable:!0,configurable:!0}}),t&&(Object.setPrototypeOf?Object.setPrototypeOf(e,t):e.__proto__=t)}(i,n),e(i,[{key:"getClass",value:function(){var e=arguments.length<=0||void 0===arguments[0]?"":arguments[0],t=this.options.classes
return void 0!==t&&t[e]?this.options.classes[e]:this.options.classPrefix?this.options.classPrefix+"-"+e:e}},{key:"setOptions",value:function(e){var t=this,r=arguments.length<=1||void 0===arguments[1]||arguments[1]
this.options=g({offset:"0 0",targetOffset:"0 0",targetAttachment:"auto auto",classPrefix:"tether"},e)
var n=this.options,i=n.element,o=n.target,s=n.targetModifier
if(this.element=i,this.target=o,this.targetModifier=s,"viewport"===this.target?(this.target=document.body,this.targetModifier="visible"):"scroll-handle"===this.target&&(this.target=document.body,this.targetModifier="scroll-handle"),["element","target"].forEach((function(e){if(void 0===t[e])throw new Error("Tether Error: Both element and target must be defined")
void 0!==t[e].jquery?t[e]=t[e][0]:"string"==typeof t[e]&&(t[e]=document.querySelector(t[e]))})),v(this.element,this.getClass("element")),!1!==this.options.addTargetClasses&&v(this.target,this.getClass("target")),!this.options.attachment)throw new Error("Tether Error: You must provide an attachment")
this.targetAttachment=V(this.options.targetAttachment),this.attachment=V(this.options.attachment),this.offset=H(this.options.offset),this.targetOffset=H(this.options.targetOffset),void 0!==this.scrollParents&&this.disable(),"scroll-handle"===this.targetModifier?this.scrollParents=[this.target]:this.scrollParents=a(this.target),!1!==this.options.enabled&&this.enable(r)}},{key:"getTargetBounds",value:function(){if(void 0===this.targetModifier)return d(this.target)
if("visible"===this.targetModifier)return this.target===document.body?{top:pageYOffset,left:pageXOffset,height:innerHeight,width:innerWidth}:((a={height:(e=d(this.target)).height,width:e.width,top:e.top,left:e.left}).height=Math.min(a.height,e.height-(pageYOffset-e.top)),a.height=Math.min(a.height,e.height-(e.top+e.height-(pageYOffset+innerHeight))),a.height=Math.min(innerHeight,a.height),a.height-=2,a.width=Math.min(a.width,e.width-(pageXOffset-e.left)),a.width=Math.min(a.width,e.width-(e.left+e.width-(pageXOffset+innerWidth))),a.width=Math.min(innerWidth,a.width),a.width-=2,a.top<pageYOffset&&(a.top=pageYOffset),a.left<pageXOffset&&(a.left=pageXOffset),a)
if("scroll-handle"===this.targetModifier){var e=void 0,t=this.target
t===document.body?(t=document.documentElement,e={left:pageXOffset,top:pageYOffset,height:innerHeight,width:innerWidth}):e=d(t)
var r=getComputedStyle(t),n=0;(t.scrollWidth>t.clientWidth||[r.overflow,r.overflowX].indexOf("scroll")>=0||this.target!==document.body)&&(n=15)
var i=e.height-parseFloat(r.borderTopWidth)-parseFloat(r.borderBottomWidth)-n,a={width:15,height:.975*i*(i/t.scrollHeight),left:e.left+e.width-parseFloat(r.borderLeftWidth)-15},o=0
i<408&&this.target===document.body&&(o=-11e-5*Math.pow(i,2)-.00727*i+22.58),this.target!==document.body&&(a.height=Math.max(a.height,24))
var s=this.target.scrollTop/(t.scrollHeight-i)
return a.top=s*(i-a.height-o)+e.top+parseFloat(r.borderTopWidth),this.target===document.body&&(a.height=Math.max(a.height,24)),a}}},{key:"clearCache",value:function(){this._cache={}}},{key:"cache",value:function(e,t){return void 0===this._cache&&(this._cache={}),void 0===this._cache[e]&&(this._cache[e]=t.call(this)),this._cache[e]}},{key:"enable",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]||arguments[0]
!1!==this.options.addTargetClasses&&v(this.target,this.getClass("enabled")),v(this.element,this.getClass("enabled")),this.enabled=!0,this.scrollParents.forEach((function(t){t!==e.target.ownerDocument&&t.addEventListener("scroll",e.position)})),t&&this.position()}},{key:"disable",value:function(){var e=this
m(this.target,this.getClass("enabled")),m(this.element,this.getClass("enabled")),this.enabled=!1,void 0!==this.scrollParents&&this.scrollParents.forEach((function(t){t.removeEventListener("scroll",e.position)}))}},{key:"destroy",value:function(){var e=this
this.disable(),F.forEach((function(t,r){t===e&&F.splice(r,1)})),0===F.length&&c()}},{key:"updateAttachClasses",value:function(e,t){var r=this
e=e||this.attachment,t=t||this.targetAttachment,void 0!==this._addAttachClasses&&this._addAttachClasses.length&&this._addAttachClasses.splice(0,this._addAttachClasses.length),void 0===this._addAttachClasses&&(this._addAttachClasses=[])
var n=this._addAttachClasses
e.top&&n.push(this.getClass("element-attached")+"-"+e.top),e.left&&n.push(this.getClass("element-attached")+"-"+e.left),t.top&&n.push(this.getClass("target-attached")+"-"+t.top),t.left&&n.push(this.getClass("target-attached")+"-"+t.left)
var i=[];["left","top","bottom","right","middle","center"].forEach((function(e){i.push(r.getClass("element-attached")+"-"+e),i.push(r.getClass("target-attached")+"-"+e)})),T((function(){void 0!==r._addAttachClasses&&(w(r.element,r._addAttachClasses,i),!1!==r.options.addTargetClasses&&w(r.target,r._addAttachClasses,i),delete r._addAttachClasses)}))}},{key:"position",value:function(){var e=this,t=arguments.length<=0||void 0===arguments[0]||arguments[0]
if(this.enabled){this.clearCache()
var n=function(e,t){var r=e.left,n=e.top
return"auto"===r&&(r=M[t.left]),"auto"===n&&(n=B[t.top]),{left:r,top:n}}(this.targetAttachment,this.attachment)
this.updateAttachClasses(this.attachment,n)
var i=this.cache("element-bounds",(function(){return d(e.element)})),a=i.width,o=i.height
if(0===a&&0===o&&void 0!==this.lastSize){var s=this.lastSize
a=s.width,o=s.height}else this.lastSize={width:a,height:o}
var u=this.cache("target-bounds",(function(){return e.getTargetBounds()})),l=u,c=G(q(this.attachment),{width:a,height:o}),f=G(q(n),l),g=G(this.offset,{width:a,height:o}),m=G(this.targetOffset,l)
c=j(c,g),f=j(f,m)
for(var v=u.left+f.left-c.left,y=u.top+f.top-c.top,b=0;b<r.modules.length;++b){var E=r.modules[b].position.call(this,{left:v,top:y,targetAttachment:n,targetPos:u,elementPos:i,offset:c,targetOffset:f,manualOffset:g,manualTargetOffset:m,scrollbarSize:D,attachment:this.attachment})
if(!1===E)return!1
void 0!==E&&"object"==typeof E&&(y=E.top,v=E.left)}var w={page:{top:y,left:v},viewport:{top:y-pageYOffset,bottom:pageYOffset-y-o+innerHeight,left:v-pageXOffset,right:pageXOffset-v-a+innerWidth}},_=this.target.ownerDocument,T=_.defaultView,D=void 0
return T.innerHeight>_.documentElement.clientHeight&&(D=this.cache("scrollbar-size",p),w.viewport.bottom-=D.height),T.innerWidth>_.documentElement.clientWidth&&(D=this.cache("scrollbar-size",p),w.viewport.right-=D.width),-1!==["","static"].indexOf(_.body.style.position)&&-1!==["","static"].indexOf(_.body.parentElement.style.position)||(w.page.bottom=_.body.scrollHeight-y-o,w.page.right=_.body.scrollWidth-v-a),void 0!==this.options.optimizations&&!1!==this.options.optimizations.moveElement&&void 0===this.targetModifier&&function(){var t=e.cache("target-offsetparent",(function(){return h(e.target)})),r=e.cache("target-offsetparent-bounds",(function(){return d(t)})),n=getComputedStyle(t),i=r,a={}
if(["Top","Left","Bottom","Right"].forEach((function(e){a[e.toLowerCase()]=parseFloat(n["border"+e+"Width"])})),r.right=_.body.scrollWidth-r.left-i.width+a.right,r.bottom=_.body.scrollHeight-r.top-i.height+a.bottom,w.page.top>=r.top+a.top&&w.page.bottom>=r.bottom&&w.page.left>=r.left+a.left&&w.page.right>=r.right){var o=t.scrollTop,s=t.scrollLeft
w.offset={top:w.page.top-r.top+o-a.top,left:w.page.left-r.left+s-a.left}}}(),this.move(w),this.history.unshift(w),this.history.length>3&&this.history.pop(),t&&A(),!0}}},{key:"move",value:function(e){var t,r,n=this
if(void 0!==this.element.parentNode){var i={}
for(var a in e)for(var o in i[a]={},e[a]){for(var s=!1,u=0;u<this.history.length;++u){var l=this.history[u]
if(void 0!==l[a]&&!x(l[a][o],e[a][o])){s=!0
break}}s||(i[a][o]=!0)}var c={top:"",left:"",right:"",bottom:""},d=function(e,t){if(!1!==(void 0!==n.options.optimizations?n.options.optimizations.gpu:null)){var r=void 0,i=void 0
e.top?(c.top=0,r=t.top):(c.bottom=0,r=-t.bottom),e.left?(c.left=0,i=t.left):(c.right=0,i=-t.right),"number"==typeof window.devicePixelRatio&&devicePixelRatio%1==0&&(i=Math.round(i*devicePixelRatio)/devicePixelRatio,r=Math.round(r*devicePixelRatio)/devicePixelRatio),c[O]="translateX("+i+"px) translateY("+r+"px)","msTransform"!==O&&(c[O]+=" translateZ(0)")}else e.top?c.top=t.top+"px":c.bottom=t.bottom+"px",e.left?c.left=t.left+"px":c.right=t.right+"px"},f=!1
if((i.page.top||i.page.bottom)&&(i.page.left||i.page.right)?(c.position="absolute",d(i.page,e.page)):(i.viewport.top||i.viewport.bottom)&&(i.viewport.left||i.viewport.right)?(c.position="fixed",d(i.viewport,e.viewport)):void 0!==i.offset&&i.offset.top&&i.offset.left?function(){c.position="absolute"
var t=n.cache("target-offsetparent",(function(){return h(n.target)}))
h(n.element)!==t&&T((function(){n.element.parentNode.removeChild(n.element),t.appendChild(n.element)})),d(i.offset,e.offset),f=!0}():(c.position="absolute",d({top:!0,left:!0},e.page)),!f)if(this.options.bodyElement)this.element.parentNode!==this.options.bodyElement&&this.options.bodyElement.appendChild(this.element)
else{for(var p=!0,m=this.element.parentNode;m&&1===m.nodeType&&"BODY"!==m.tagName&&(void 0,((r=(t=m).ownerDocument).fullscreenElement||r.webkitFullscreenElement||r.mozFullScreenElement||r.msFullscreenElement)!==t);){if("static"!==getComputedStyle(m).position){p=!1
break}m=m.parentNode}p||(this.element.parentNode.removeChild(this.element),this.element.ownerDocument.body.appendChild(this.element))}var v={},y=!1
for(var o in c){var b=c[o]
this.element.style[o]!==b&&(y=!0,v[o]=b)}y&&T((function(){g(n.element.style,v),n.trigger("repositioned")}))}}}]),i}(D)
z.modules=[],r.position=P
var K=g(z,r)
k=function(e,t){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,a=void 0
try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,a=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw a}}return r}(e,t)
throw new TypeError("Invalid attempt to destructure non-iterable instance")},d=($=r.Utils).getBounds
var g=$.extend,W=(w=$.updateClasses,T=$.defer,["left","top","right","bottom"])
r.modules.push({position:function(e){var t=this,r=e.top,n=e.left,i=e.targetAttachment
if(!this.options.constraints)return!0
var a=this.cache("element-bounds",(function(){return d(t.element)})),o=a.height,s=a.width
if(0===s&&0===o&&void 0!==this.lastSize){var u=this.lastSize
s=u.width,o=u.height}var l=this.cache("target-bounds",(function(){return t.getTargetBounds()})),c=l.height,h=l.width,f=[this.getClass("pinned"),this.getClass("out-of-bounds")]
this.options.constraints.forEach((function(e){var t=e.outOfBoundsClass,r=e.pinnedClass
t&&f.push(t),r&&f.push(r)})),f.forEach((function(e){["left","top","right","bottom"].forEach((function(t){f.push(e+"-"+t)}))}))
var p=[],m=g({},i),v=g({},this.attachment)
return this.options.constraints.forEach((function(e){var a=e.to,u=e.attachment,l=e.pin
void 0===u&&(u="")
var f=void 0,g=void 0
if(u.indexOf(" ")>=0){var y=u.split(" "),b=k(y,2)
g=b[0],f=b[1]}else f=g=u
var E=function(e,t){return"scrollParent"===t?t=e.scrollParents[0]:"window"===t&&(t=[pageXOffset,pageYOffset,innerWidth+pageXOffset,innerHeight+pageYOffset]),t===document&&(t=t.documentElement),void 0!==t.nodeType&&function(){var e=t,r=d(t),n=r,i=getComputedStyle(t)
if(t=[n.left,n.top,r.width+n.left,r.height+n.top],e.ownerDocument!==document){var a=e.ownerDocument.defaultView
t[0]+=a.pageXOffset,t[1]+=a.pageYOffset,t[2]+=a.pageXOffset,t[3]+=a.pageYOffset}W.forEach((function(e,r){"Top"===(e=e[0].toUpperCase()+e.substr(1))||"Left"===e?t[r]+=parseFloat(i["border"+e+"Width"]):t[r]-=parseFloat(i["border"+e+"Width"])}))}(),t}(t,a)
"target"!==g&&"both"!==g||(r<E[1]&&"top"===m.top&&(r+=c,m.top="bottom"),r+o>E[3]&&"bottom"===m.top&&(r-=c,m.top="top")),"together"===g&&("top"===m.top&&("bottom"===v.top&&r<E[1]?(r+=c,m.top="bottom",r+=o,v.top="top"):"top"===v.top&&r+o>E[3]&&r-(o-c)>=E[1]&&(r-=o-c,m.top="bottom",v.top="bottom")),"bottom"===m.top&&("top"===v.top&&r+o>E[3]?(r-=c,m.top="top",r-=o,v.top="bottom"):"bottom"===v.top&&r<E[1]&&r+(2*o-c)<=E[3]&&(r+=o-c,m.top="top",v.top="top")),"middle"===m.top&&(r+o>E[3]&&"top"===v.top?(r-=o,v.top="bottom"):r<E[1]&&"bottom"===v.top&&(r+=o,v.top="top"))),"target"!==f&&"both"!==f||(n<E[0]&&"left"===m.left&&(n+=h,m.left="right"),n+s>E[2]&&"right"===m.left&&(n-=h,m.left="left")),"together"===f&&(n<E[0]&&"left"===m.left?"right"===v.left?(n+=h,m.left="right",n+=s,v.left="left"):"left"===v.left&&(n+=h,m.left="right",n-=s,v.left="right"):n+s>E[2]&&"right"===m.left?"left"===v.left?(n-=h,m.left="left",n-=s,v.left="right"):"right"===v.left&&(n-=h,m.left="left",n+=s,v.left="left"):"center"===m.left&&(n+s>E[2]&&"left"===v.left?(n-=s,v.left="right"):n<E[0]&&"right"===v.left&&(n+=s,v.left="left"))),"element"!==g&&"both"!==g||(r<E[1]&&"bottom"===v.top&&(r+=o,v.top="top"),r+o>E[3]&&"top"===v.top&&(r-=o,v.top="bottom")),"element"!==f&&"both"!==f||(n<E[0]&&("right"===v.left?(n+=s,v.left="left"):"center"===v.left&&(n+=s/2,v.left="left")),n+s>E[2]&&("left"===v.left?(n-=s,v.left="right"):"center"===v.left&&(n-=s/2,v.left="right"))),"string"==typeof l?l=l.split(",").map((function(e){return e.trim()})):!0===l&&(l=["top","left","right","bottom"]),l=l||[]
var w,_,T=[],A=[]
r<E[1]&&(l.indexOf("top")>=0?(r=E[1],T.push("top")):A.push("top")),r+o>E[3]&&(l.indexOf("bottom")>=0?(r=E[3]-o,T.push("bottom")):A.push("bottom")),n<E[0]&&(l.indexOf("left")>=0?(n=E[0],T.push("left")):A.push("left")),n+s>E[2]&&(l.indexOf("right")>=0?(n=E[2]-s,T.push("right")):A.push("right")),T.length&&(w=void 0!==t.options.pinnedClass?t.options.pinnedClass:t.getClass("pinned"),p.push(w),T.forEach((function(e){p.push(w+"-"+e)}))),A.length&&(_=void 0!==t.options.outOfBoundsClass?t.options.outOfBoundsClass:t.getClass("out-of-bounds"),p.push(_),A.forEach((function(e){p.push(_+"-"+e)}))),(T.indexOf("left")>=0||T.indexOf("right")>=0)&&(v.left=m.left=!1),(T.indexOf("top")>=0||T.indexOf("bottom")>=0)&&(v.top=m.top=!1),m.top===i.top&&m.left===i.left&&v.top===t.attachment.top&&v.left===t.attachment.left||(t.updateAttachClasses(v,m),t.trigger("update",{attachment:v,targetAttachment:m}))})),T((function(){!1!==t.options.addTargetClasses&&w(t.target,p,f),w(t.element,p,f)})),{top:r,left:n}}})
var $,d=($=r.Utils).getBounds,w=$.updateClasses
return T=$.defer,r.modules.push({position:function(e){var t=this,r=e.top,n=e.left,i=this.cache("element-bounds",(function(){return d(t.element)})),a=i.height,o=i.width,s=this.getTargetBounds(),u=r+a,l=n+o,c=[]
r<=s.bottom&&u>=s.top&&["left","right"].forEach((function(e){var t=s[e]
t!==n&&t!==l||c.push(e)})),n<=s.right&&l>=s.left&&["top","bottom"].forEach((function(e){var t=s[e]
t!==r&&t!==u||c.push(e)}))
var h=[],f=[]
return h.push(this.getClass("abutted")),["left","top","right","bottom"].forEach((function(e){h.push(t.getClass("abutted")+"-"+e)})),c.length&&f.push(this.getClass("abutted")),c.forEach((function(e){f.push(t.getClass("abutted")+"-"+e)})),T((function(){!1!==t.options.addTargetClasses&&w(t.target,f,h),w(t.element,f,h)})),!0}}),k=function(e,t){if(Array.isArray(e))return e
if(Symbol.iterator in Object(e))return function(e,t){var r=[],n=!0,i=!1,a=void 0
try{for(var o,s=e[Symbol.iterator]();!(n=(o=s.next()).done)&&(r.push(o.value),!t||r.length!==t);n=!0);}catch(e){i=!0,a=e}finally{try{!n&&s.return&&s.return()}finally{if(i)throw a}}return r}(e,t)
throw new TypeError("Invalid attempt to destructure non-iterable instance")},r.modules.push({position:function(e){var t=e.top,r=e.left
if(this.options.shift){var n=this.options.shift
"function"==typeof this.options.shift&&(n=this.options.shift.call(this,{top:t,left:r}))
var i=void 0,a=void 0
if("string"==typeof n){(n=n.split(" "))[1]=n[1]||n[0]
var o=k(n,2)
i=o[0],a=o[1],i=parseFloat(i,10),a=parseFloat(a,10)}else i=n.top,a=n.left
return{top:t+=i,left:r+=a}}}}),K},void 0===(n=r.apply(t,[]))||(e.exports=n)},2173:(e,t,r)=>{"use strict"
r.r(t),r.d(t,{cached:()=>b,dedupeTracked:()=>E,localCopy:()=>v,trackedReset:()=>y})
var n,i,a=r(3353),o=r(7219),s=r(5521),u=r(6173)
function l(e,t,r){return t in e?Object.defineProperty(e,t,{value:r,enumerable:!0,configurable:!0,writable:!0}):e[t]=r,e}let c=(n=class{constructor(){var e
l(this,"prevRemote",void 0),l(this,"peek",void 0),(e=i)&&Object.defineProperty(this,"value",{enumerable:e.enumerable,configurable:e.configurable,writable:e.writable,value:e.initializer?e.initializer.call(this):void 0})}},d=n.prototype,h="value",f=[s.tracked],p={configurable:!0,enumerable:!0,writable:!0,initializer:null},g={},Object.keys(p).forEach((function(e){g[e]=p[e]})),g.enumerable=!!g.enumerable,g.configurable=!!g.configurable,("value"in g||g.initializer)&&(g.writable=!0),void 0===(g=f.slice().reverse().reduce((function(e,t){return t(d,h,e)||e}),g)).initializer&&(Object.defineProperty(d,h,g),g=null),i=g,n)
var d,h,f,p,g
function m(e,t,r){let n=t.get(e)
return void 0===n&&(n=new c,t.set(e,n),n.value=n.peek="function"==typeof r?r.call(e):r),n}function v(e,t){(0,a.assert)(`@localCopy() must be given a memo path as its first argument, received \`${String(e)}\``,"string"==typeof e)
let r=new WeakMap
return()=>{let n=t=>(0,o.get)(t,e)
return{get(){let e=m(this,r,t),{prevRemote:i}=e,a=n(this)
return i!==a&&(e.value=e.prevRemote=a),e.value},set(e){if(!r.has(this)){let i=m(this,r,t)
return i.prevRemote=n(this),void(i.value=e)}m(this,r,t).value=e}}}}function y(e){(0,a.assert)(`@trackedReset() must be given a memo path, a memo function, or config object with a memo path or function as its first argument, received \`${String(e)}\``,"string"==typeof e||"function"==typeof e||"object"==typeof e&&null!==e&&void 0!==e.memo)
let t=new WeakMap
return(r,n,i)=>{let a,s,u=i.initializer??(()=>{})
"object"==typeof e?(a=e.memo,s=e.update??u):(a=e,s=u)
let l="function"==typeof a?(e,t)=>a.call(e,e,n,t):e=>(0,o.get)(e,a)
return{get(){let e=m(this,t,u),{prevRemote:r}=e,i=l(this,r)
return i!==r&&(e.prevRemote=i,e.value=e.peek=s.call(this,this,n,e.peek)),e.value},set(e){m(this,t,u).value=e}}}}function b(e,t,r){(0,a.assert)("@cached can only be used on getters",r&&r.get)
let{get:n,set:i}=r,o=new WeakMap
return{get(){let e=o.get(this)
return void 0===e&&(e=(0,u.createCache)(n.bind(this)),o.set(this,e)),(0,u.getValue)(e)},set:i}}function E(){let e
const t=function(t,r,n){let{initializer:i}=n,{get:a,set:o}=(0,s.tracked)(t,r,n),u=new WeakMap
return{get(){if(!u.has(this)){let e=i?.call(this)
u.set(this,e),o.call(this,e)}return a.call(this)},set(t){u.has(this)&&e(t,u.get(this))||(u.set(this,t),o.call(this,t))}}}
return 3===arguments.length?(e=(e,t)=>e===t,t(...arguments)):1===arguments.length&&"function"==typeof arguments[0]?(e=arguments[0],t):void(0,a.assert)(`@dedupeTracked() can either be invoked without arguments or with one comparator function, received \`${String(arguments)}\``,!1)}},1895:function(e,t,r){var n
!function(i,a){"use strict"
var o="function",s="undefined",u="object",l="string",c="major",d="model",h="name",f="type",p="vendor",g="version",m="architecture",v="console",y="mobile",b="tablet",E="smarttv",w="wearable",_="embedded",T="Amazon",A="Apple",D="ASUS",k="BlackBerry",S="Browser",x="Chrome",C="Firefox",L="Google",R="Huawei",I="LG",O="Microsoft",F="Motorola",P="Opera",N="Samsung",M="Sharp",B="Sony",U="Xiaomi",q="Zebra",j="Facebook",G="Chromium OS",H="Mac OS",V=function(e){for(var t={},r=0;r<e.length;r++)t[e[r].toUpperCase()]=e[r]
return t},z=function(e,t){return typeof e===l&&-1!==K(t).indexOf(K(e))},K=function(e){return e.toLowerCase()},W=function(e,t){if(typeof e===l)return e=e.replace(/^\s\s*/,""),typeof t===s?e:e.substring(0,350)},$=function(e,t){for(var r,n,i,s,l,c,d=0;d<t.length&&!l;){var h=t[d],f=t[d+1]
for(r=n=0;r<h.length&&!l&&h[r];)if(l=h[r++].exec(e))for(i=0;i<f.length;i++)c=l[++n],typeof(s=f[i])===u&&s.length>0?2===s.length?typeof s[1]==o?this[s[0]]=s[1].call(this,c):this[s[0]]=s[1]:3===s.length?typeof s[1]!==o||s[1].exec&&s[1].test?this[s[0]]=c?c.replace(s[1],s[2]):a:this[s[0]]=c?s[1].call(this,c,s[2]):a:4===s.length&&(this[s[0]]=c?s[3].call(this,c.replace(s[1],s[2])):a):this[s]=c||a
d+=2}},Y=function(e,t){for(var r in t)if(typeof t[r]===u&&t[r].length>0){for(var n=0;n<t[r].length;n++)if(z(t[r][n],e))return"?"===r?a:r}else if(z(t[r],e))return"?"===r?a:r
return e},Q={ME:"4.90","NT 3.11":"NT3.51","NT 4.0":"NT4.0",2e3:"NT 5.0",XP:["NT 5.1","NT 5.2"],Vista:"NT 6.0",7:"NT 6.1",8:"NT 6.2",8.1:"NT 6.3",10:["NT 6.4","NT 10.0"],RT:"ARM"},X={browser:[[/\b(?:crmo|crios)\/([\w\.]+)/i],[g,[h,"Chrome"]],[/edg(?:e|ios|a)?\/([\w\.]+)/i],[g,[h,"Edge"]],[/(opera mini)\/([-\w\.]+)/i,/(opera [mobiletab]{3,6})\b.+version\/([-\w\.]+)/i,/(opera)(?:.+version\/|[\/ ]+)([\w\.]+)/i],[h,g],[/opios[\/ ]+([\w\.]+)/i],[g,[h,P+" Mini"]],[/\bopr\/([\w\.]+)/i],[g,[h,P]],[/(kindle)\/([\w\.]+)/i,/(lunascape|maxthon|netfront|jasmine|blazer)[\/ ]?([\w\.]*)/i,/(avant |iemobile|slim)(?:browser)?[\/ ]?([\w\.]*)/i,/(ba?idubrowser)[\/ ]?([\w\.]+)/i,/(?:ms|\()(ie) ([\w\.]+)/i,/(flock|rockmelt|midori|epiphany|silk|skyfire|bolt|iron|vivaldi|iridium|phantomjs|bowser|quark|qupzilla|falkon|rekonq|puffin|brave|whale(?!.+naver)|qqbrowserlite|qq|duckduckgo)\/([-\w\.]+)/i,/(heytap|ovi)browser\/([\d\.]+)/i,/(weibo)__([\d\.]+)/i],[h,g],[/(?:\buc? ?browser|(?:juc.+)ucweb)[\/ ]?([\w\.]+)/i],[g,[h,"UC"+S]],[/microm.+\bqbcore\/([\w\.]+)/i,/\bqbcore\/([\w\.]+).+microm/i],[g,[h,"WeChat(Win) Desktop"]],[/micromessenger\/([\w\.]+)/i],[g,[h,"WeChat"]],[/konqueror\/([\w\.]+)/i],[g,[h,"Konqueror"]],[/trident.+rv[: ]([\w\.]{1,9})\b.+like gecko/i],[g,[h,"IE"]],[/ya(?:search)?browser\/([\w\.]+)/i],[g,[h,"Yandex"]],[/(avast|avg)\/([\w\.]+)/i],[[h,/(.+)/,"$1 Secure "+S],g],[/\bfocus\/([\w\.]+)/i],[g,[h,C+" Focus"]],[/\bopt\/([\w\.]+)/i],[g,[h,P+" Touch"]],[/coc_coc\w+\/([\w\.]+)/i],[g,[h,"Coc Coc"]],[/dolfin\/([\w\.]+)/i],[g,[h,"Dolphin"]],[/coast\/([\w\.]+)/i],[g,[h,P+" Coast"]],[/miuibrowser\/([\w\.]+)/i],[g,[h,"MIUI "+S]],[/fxios\/([-\w\.]+)/i],[g,[h,C]],[/\bqihu|(qi?ho?o?|360)browser/i],[[h,"360 "+S]],[/(oculus|samsung|sailfish|huawei)browser\/([\w\.]+)/i],[[h,/(.+)/,"$1 "+S],g],[/(comodo_dragon)\/([\w\.]+)/i],[[h,/_/g," "],g],[/(electron)\/([\w\.]+) safari/i,/(tesla)(?: qtcarbrowser|\/(20\d\d\.[-\w\.]+))/i,/m?(qqbrowser|baiduboxapp|2345Explorer)[\/ ]?([\w\.]+)/i],[h,g],[/(metasr)[\/ ]?([\w\.]+)/i,/(lbbrowser)/i,/\[(linkedin)app\]/i],[h],[/((?:fban\/fbios|fb_iab\/fb4a)(?!.+fbav)|;fbav\/([\w\.]+);)/i],[[h,j],g],[/(kakao(?:talk|story))[\/ ]([\w\.]+)/i,/(naver)\(.*?(\d+\.[\w\.]+).*\)/i,/safari (line)\/([\w\.]+)/i,/\b(line)\/([\w\.]+)\/iab/i,/(chromium|instagram)[\/ ]([-\w\.]+)/i],[h,g],[/\bgsa\/([\w\.]+) .*safari\//i],[g,[h,"GSA"]],[/musical_ly(?:.+app_?version\/|_)([\w\.]+)/i],[g,[h,"TikTok"]],[/headlesschrome(?:\/([\w\.]+)| )/i],[g,[h,x+" Headless"]],[/ wv\).+(chrome)\/([\w\.]+)/i],[[h,x+" WebView"],g],[/droid.+ version\/([\w\.]+)\b.+(?:mobile safari|safari)/i],[g,[h,"Android "+S]],[/(chrome|omniweb|arora|[tizenoka]{5} ?browser)\/v?([\w\.]+)/i],[h,g],[/version\/([\w\.\,]+) .*mobile\/\w+ (safari)/i],[g,[h,"Mobile Safari"]],[/version\/([\w(\.|\,)]+) .*(mobile ?safari|safari)/i],[g,h],[/webkit.+?(mobile ?safari|safari)(\/[\w\.]+)/i],[h,[g,Y,{"1.0":"/8",1.2:"/1",1.3:"/3","2.0":"/412","2.0.2":"/416","2.0.3":"/417","2.0.4":"/419","?":"/"}]],[/(webkit|khtml)\/([\w\.]+)/i],[h,g],[/(navigator|netscape\d?)\/([-\w\.]+)/i],[[h,"Netscape"],g],[/mobile vr; rv:([\w\.]+)\).+firefox/i],[g,[h,C+" Reality"]],[/ekiohf.+(flow)\/([\w\.]+)/i,/(swiftfox)/i,/(icedragon|iceweasel|camino|chimera|fennec|maemo browser|minimo|conkeror|klar)[\/ ]?([\w\.\+]+)/i,/(seamonkey|k-meleon|icecat|iceape|firebird|phoenix|palemoon|basilisk|waterfox)\/([-\w\.]+)$/i,/(firefox)\/([\w\.]+)/i,/(mozilla)\/([\w\.]+) .+rv\:.+gecko\/\d+/i,/(polaris|lynx|dillo|icab|doris|amaya|w3m|netsurf|sleipnir|obigo|mosaic|(?:go|ice|up)[\. ]?browser)[-\/ ]?v?([\w\.]+)/i,/(links) \(([\w\.]+)/i,/panasonic;(viera)/i],[h,g],[/(cobalt)\/([\w\.]+)/i],[h,[g,/master.|lts./,""]]],cpu:[[/(?:(amd|x(?:(?:86|64)[-_])?|wow|win)64)[;\)]/i],[[m,"amd64"]],[/(ia32(?=;))/i],[[m,K]],[/((?:i[346]|x)86)[;\)]/i],[[m,"ia32"]],[/\b(aarch64|arm(v?8e?l?|_?64))\b/i],[[m,"arm64"]],[/\b(arm(?:v[67])?ht?n?[fl]p?)\b/i],[[m,"armhf"]],[/windows (ce|mobile); ppc;/i],[[m,"arm"]],[/((?:ppc|powerpc)(?:64)?)(?: mac|;|\))/i],[[m,/ower/,"",K]],[/(sun4\w)[;\)]/i],[[m,"sparc"]],[/((?:avr32|ia64(?=;))|68k(?=\))|\barm(?=v(?:[1-7]|[5-7]1)l?|;|eabi)|(?=atmel )avr|(?:irix|mips|sparc)(?:64)?\b|pa-risc)/i],[[m,K]]],device:[[/\b(sch-i[89]0\d|shw-m380s|sm-[ptx]\w{2,4}|gt-[pn]\d{2,4}|sgh-t8[56]9|nexus 10)/i],[d,[p,N],[f,b]],[/\b((?:s[cgp]h|gt|sm)-\w+|sc[g-]?[\d]+a?|galaxy nexus)/i,/samsung[- ]([-\w]+)/i,/sec-(sgh\w+)/i],[d,[p,N],[f,y]],[/(?:\/|\()(ip(?:hone|od)[\w, ]*)(?:\/|;)/i],[d,[p,A],[f,y]],[/\((ipad);[-\w\),; ]+apple/i,/applecoremedia\/[\w\.]+ \((ipad)/i,/\b(ipad)\d\d?,\d\d?[;\]].+ios/i],[d,[p,A],[f,b]],[/(macintosh);/i],[d,[p,A]],[/\b(sh-?[altvz]?\d\d[a-ekm]?)/i],[d,[p,M],[f,y]],[/\b((?:ag[rs][23]?|bah2?|sht?|btv)-a?[lw]\d{2})\b(?!.+d\/s)/i],[d,[p,R],[f,b]],[/(?:huawei|honor)([-\w ]+)[;\)]/i,/\b(nexus 6p|\w{2,4}e?-[atu]?[ln][\dx][012359c][adn]?)\b(?!.+d\/s)/i],[d,[p,R],[f,y]],[/\b(poco[\w ]+)(?: bui|\))/i,/\b; (\w+) build\/hm\1/i,/\b(hm[-_ ]?note?[_ ]?(?:\d\w)?) bui/i,/\b(redmi[\-_ ]?(?:note|k)?[\w_ ]+)(?: bui|\))/i,/\b(mi[-_ ]?(?:a\d|one|one[_ ]plus|note lte|max|cc)?[_ ]?(?:\d?\w?)[_ ]?(?:plus|se|lite)?)(?: bui|\))/i],[[d,/_/g," "],[p,U],[f,y]],[/\b(mi[-_ ]?(?:pad)(?:[\w_ ]+))(?: bui|\))/i],[[d,/_/g," "],[p,U],[f,b]],[/; (\w+) bui.+ oppo/i,/\b(cph[12]\d{3}|p(?:af|c[al]|d\w|e[ar])[mt]\d0|x9007|a101op)\b/i],[d,[p,"OPPO"],[f,y]],[/vivo (\w+)(?: bui|\))/i,/\b(v[12]\d{3}\w?[at])(?: bui|;)/i],[d,[p,"Vivo"],[f,y]],[/\b(rmx[12]\d{3})(?: bui|;|\))/i],[d,[p,"Realme"],[f,y]],[/\b(milestone|droid(?:[2-4x]| (?:bionic|x2|pro|razr))?:?( 4g)?)\b[\w ]+build\//i,/\bmot(?:orola)?[- ](\w*)/i,/((?:moto[\w\(\) ]+|xt\d{3,4}|nexus 6)(?= bui|\)))/i],[d,[p,F],[f,y]],[/\b(mz60\d|xoom[2 ]{0,2}) build\//i],[d,[p,F],[f,b]],[/((?=lg)?[vl]k\-?\d{3}) bui| 3\.[-\w; ]{10}lg?-([06cv9]{3,4})/i],[d,[p,I],[f,b]],[/(lm(?:-?f100[nv]?|-[\w\.]+)(?= bui|\))|nexus [45])/i,/\blg[-e;\/ ]+((?!browser|netcast|android tv)\w+)/i,/\blg-?([\d\w]+) bui/i],[d,[p,I],[f,y]],[/(ideatab[-\w ]+)/i,/lenovo ?(s[56]000[-\w]+|tab(?:[\w ]+)|yt[-\d\w]{6}|tb[-\d\w]{6})/i],[d,[p,"Lenovo"],[f,b]],[/(?:maemo|nokia).*(n900|lumia \d+)/i,/nokia[-_ ]?([-\w\.]*)/i],[[d,/_/g," "],[p,"Nokia"],[f,y]],[/(pixel c)\b/i],[d,[p,L],[f,b]],[/droid.+; (pixel[\daxl ]{0,6})(?: bui|\))/i],[d,[p,L],[f,y]],[/droid.+ (a?\d[0-2]{2}so|[c-g]\d{4}|so[-gl]\w+|xq-a\w[4-7][12])(?= bui|\).+chrome\/(?![1-6]{0,1}\d\.))/i],[d,[p,B],[f,y]],[/sony tablet [ps]/i,/\b(?:sony)?sgp\w+(?: bui|\))/i],[[d,"Xperia Tablet"],[p,B],[f,b]],[/ (kb2005|in20[12]5|be20[12][59])\b/i,/(?:one)?(?:plus)? (a\d0\d\d)(?: b|\))/i],[d,[p,"OnePlus"],[f,y]],[/(alexa)webm/i,/(kf[a-z]{2}wi|aeo[c-r]{2})( bui|\))/i,/(kf[a-z]+)( bui|\)).+silk\//i],[d,[p,T],[f,b]],[/((?:sd|kf)[0349hijorstuw]+)( bui|\)).+silk\//i],[[d,/(.+)/g,"Fire Phone $1"],[p,T],[f,y]],[/(playbook);[-\w\),; ]+(rim)/i],[d,p,[f,b]],[/\b((?:bb[a-f]|st[hv])100-\d)/i,/\(bb10; (\w+)/i],[d,[p,k],[f,y]],[/(?:\b|asus_)(transfo[prime ]{4,10} \w+|eeepc|slider \w+|nexus 7|padfone|p00[cj])/i],[d,[p,D],[f,b]],[/ (z[bes]6[027][012][km][ls]|zenfone \d\w?)\b/i],[d,[p,D],[f,y]],[/(nexus 9)/i],[d,[p,"HTC"],[f,b]],[/(htc)[-;_ ]{1,2}([\w ]+(?=\)| bui)|\w+)/i,/(zte)[- ]([\w ]+?)(?: bui|\/|\))/i,/(alcatel|geeksphone|nexian|panasonic(?!(?:;|\.))|sony(?!-bra))[-_ ]?([-\w]*)/i],[p,[d,/_/g," "],[f,y]],[/droid.+; ([ab][1-7]-?[0178a]\d\d?)/i],[d,[p,"Acer"],[f,b]],[/droid.+; (m[1-5] note) bui/i,/\bmz-([-\w]{2,})/i],[d,[p,"Meizu"],[f,y]],[/(blackberry|benq|palm(?=\-)|sonyericsson|acer|asus|dell|meizu|motorola|polytron)[-_ ]?([-\w]*)/i,/(hp) ([\w ]+\w)/i,/(asus)-?(\w+)/i,/(microsoft); (lumia[\w ]+)/i,/(lenovo)[-_ ]?([-\w]+)/i,/(jolla)/i,/(oppo) ?([\w ]+) bui/i],[p,d,[f,y]],[/(kobo)\s(ereader|touch)/i,/(archos) (gamepad2?)/i,/(hp).+(touchpad(?!.+tablet)|tablet)/i,/(kindle)\/([\w\.]+)/i,/(nook)[\w ]+build\/(\w+)/i,/(dell) (strea[kpr\d ]*[\dko])/i,/(le[- ]+pan)[- ]+(\w{1,9}) bui/i,/(trinity)[- ]*(t\d{3}) bui/i,/(gigaset)[- ]+(q\w{1,9}) bui/i,/(vodafone) ([\w ]+)(?:\)| bui)/i],[p,d,[f,b]],[/(surface duo)/i],[d,[p,O],[f,b]],[/droid [\d\.]+; (fp\du?)(?: b|\))/i],[d,[p,"Fairphone"],[f,y]],[/(u304aa)/i],[d,[p,"AT&T"],[f,y]],[/\bsie-(\w*)/i],[d,[p,"Siemens"],[f,y]],[/\b(rct\w+) b/i],[d,[p,"RCA"],[f,b]],[/\b(venue[\d ]{2,7}) b/i],[d,[p,"Dell"],[f,b]],[/\b(q(?:mv|ta)\w+) b/i],[d,[p,"Verizon"],[f,b]],[/\b(?:barnes[& ]+noble |bn[rt])([\w\+ ]*) b/i],[d,[p,"Barnes & Noble"],[f,b]],[/\b(tm\d{3}\w+) b/i],[d,[p,"NuVision"],[f,b]],[/\b(k88) b/i],[d,[p,"ZTE"],[f,b]],[/\b(nx\d{3}j) b/i],[d,[p,"ZTE"],[f,y]],[/\b(gen\d{3}) b.+49h/i],[d,[p,"Swiss"],[f,y]],[/\b(zur\d{3}) b/i],[d,[p,"Swiss"],[f,b]],[/\b((zeki)?tb.*\b) b/i],[d,[p,"Zeki"],[f,b]],[/\b([yr]\d{2}) b/i,/\b(dragon[- ]+touch |dt)(\w{5}) b/i],[[p,"Dragon Touch"],d,[f,b]],[/\b(ns-?\w{0,9}) b/i],[d,[p,"Insignia"],[f,b]],[/\b((nxa|next)-?\w{0,9}) b/i],[d,[p,"NextBook"],[f,b]],[/\b(xtreme\_)?(v(1[045]|2[015]|[3469]0|7[05])) b/i],[[p,"Voice"],d,[f,y]],[/\b(lvtel\-)?(v1[12]) b/i],[[p,"LvTel"],d,[f,y]],[/\b(ph-1) /i],[d,[p,"Essential"],[f,y]],[/\b(v(100md|700na|7011|917g).*\b) b/i],[d,[p,"Envizen"],[f,b]],[/\b(trio[-\w\. ]+) b/i],[d,[p,"MachSpeed"],[f,b]],[/\btu_(1491) b/i],[d,[p,"Rotor"],[f,b]],[/(shield[\w ]+) b/i],[d,[p,"Nvidia"],[f,b]],[/(sprint) (\w+)/i],[p,d,[f,y]],[/(kin\.[onetw]{3})/i],[[d,/\./g," "],[p,O],[f,y]],[/droid.+; (cc6666?|et5[16]|mc[239][23]x?|vc8[03]x?)\)/i],[d,[p,q],[f,b]],[/droid.+; (ec30|ps20|tc[2-8]\d[kx])\)/i],[d,[p,q],[f,y]],[/smart-tv.+(samsung)/i],[p,[f,E]],[/hbbtv.+maple;(\d+)/i],[[d,/^/,"SmartTV"],[p,N],[f,E]],[/(nux; netcast.+smarttv|lg (netcast\.tv-201\d|android tv))/i],[[p,I],[f,E]],[/(apple) ?tv/i],[p,[d,A+" TV"],[f,E]],[/crkey/i],[[d,x+"cast"],[p,L],[f,E]],[/droid.+aft(\w)( bui|\))/i],[d,[p,T],[f,E]],[/\(dtv[\);].+(aquos)/i,/(aquos-tv[\w ]+)\)/i],[d,[p,M],[f,E]],[/(bravia[\w ]+)( bui|\))/i],[d,[p,B],[f,E]],[/(mitv-\w{5}) bui/i],[d,[p,U],[f,E]],[/Hbbtv.*(technisat) (.*);/i],[p,d,[f,E]],[/\b(roku)[\dx]*[\)\/]((?:dvp-)?[\d\.]*)/i,/hbbtv\/\d+\.\d+\.\d+ +\([\w\+ ]*; *([\w\d][^;]*);([^;]*)/i],[[p,W],[d,W],[f,E]],[/\b(android tv|smart[- ]?tv|opera tv|tv; rv:)\b/i],[[f,E]],[/(ouya)/i,/(nintendo) ([wids3utch]+)/i],[p,d,[f,v]],[/droid.+; (shield) bui/i],[d,[p,"Nvidia"],[f,v]],[/(playstation [345portablevi]+)/i],[d,[p,B],[f,v]],[/\b(xbox(?: one)?(?!; xbox))[\); ]/i],[d,[p,O],[f,v]],[/((pebble))app/i],[p,d,[f,w]],[/(watch)(?: ?os[,\/]|\d,\d\/)[\d\.]+/i],[d,[p,A],[f,w]],[/droid.+; (glass) \d/i],[d,[p,L],[f,w]],[/droid.+; (wt63?0{2,3})\)/i],[d,[p,q],[f,w]],[/(quest( 2| pro)?)/i],[d,[p,j],[f,w]],[/(tesla)(?: qtcarbrowser|\/[-\w\.]+)/i],[p,[f,_]],[/(aeobc)\b/i],[d,[p,T],[f,_]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+? mobile safari/i],[d,[f,y]],[/droid .+?; ([^;]+?)(?: bui|\) applew).+?(?! mobile) safari/i],[d,[f,b]],[/\b((tablet|tab)[;\/]|focus\/\d(?!.+mobile))/i],[[f,b]],[/(phone|mobile(?:[;\/]| [ \w\/\.]*safari)|pda(?=.+windows ce))/i],[[f,y]],[/(android[-\w\. ]{0,9});.+buil/i],[d,[p,"Generic"]]],engine:[[/windows.+ edge\/([\w\.]+)/i],[g,[h,"EdgeHTML"]],[/webkit\/537\.36.+chrome\/(?!27)([\w\.]+)/i],[g,[h,"Blink"]],[/(presto)\/([\w\.]+)/i,/(webkit|trident|netfront|netsurf|amaya|lynx|w3m|goanna)\/([\w\.]+)/i,/ekioh(flow)\/([\w\.]+)/i,/(khtml|tasman|links)[\/ ]\(?([\w\.]+)/i,/(icab)[\/ ]([23]\.[\d\.]+)/i,/\b(libweb)/i],[h,g],[/rv\:([\w\.]{1,9})\b.+(gecko)/i],[g,h]],os:[[/microsoft (windows) (vista|xp)/i],[h,g],[/(windows) nt 6\.2; (arm)/i,/(windows (?:phone(?: os)?|mobile))[\/ ]?([\d\.\w ]*)/i,/(windows)[\/ ]?([ntce\d\. ]+\w)(?!.+xbox)/i],[h,[g,Y,Q]],[/(win(?=3|9|n)|win 9x )([nt\d\.]+)/i],[[h,"Windows"],[g,Y,Q]],[/ip[honead]{2,4}\b(?:.*os ([\w]+) like mac|; opera)/i,/ios;fbsv\/([\d\.]+)/i,/cfnetwork\/.+darwin/i],[[g,/_/g,"."],[h,"iOS"]],[/(mac os x) ?([\w\. ]*)/i,/(macintosh|mac_powerpc\b)(?!.+haiku)/i],[[h,H],[g,/_/g,"."]],[/droid ([\w\.]+)\b.+(android[- ]x86|harmonyos)/i],[g,h],[/(android|webos|qnx|bada|rim tablet os|maemo|meego|sailfish)[-\/ ]?([\w\.]*)/i,/(blackberry)\w*\/([\w\.]*)/i,/(tizen|kaios)[\/ ]([\w\.]+)/i,/\((series40);/i],[h,g],[/\(bb(10);/i],[g,[h,k]],[/(?:symbian ?os|symbos|s60(?=;)|series60)[-\/ ]?([\w\.]*)/i],[g,[h,"Symbian"]],[/mozilla\/[\d\.]+ \((?:mobile|tablet|tv|mobile; [\w ]+); rv:.+ gecko\/([\w\.]+)/i],[g,[h,C+" OS"]],[/web0s;.+rt(tv)/i,/\b(?:hp)?wos(?:browser)?\/([\w\.]+)/i],[g,[h,"webOS"]],[/watch(?: ?os[,\/]|\d,\d\/)([\d\.]+)/i],[g,[h,"watchOS"]],[/crkey\/([\d\.]+)/i],[g,[h,x+"cast"]],[/(cros) [\w]+(?:\)| ([\w\.]+)\b)/i],[[h,G],g],[/panasonic;(viera)/i,/(netrange)mmh/i,/(nettv)\/(\d+\.[\w\.]+)/i,/(nintendo|playstation) ([wids345portablevuch]+)/i,/(xbox); +xbox ([^\);]+)/i,/\b(joli|palm)\b ?(?:os)?\/?([\w\.]*)/i,/(mint)[\/\(\) ]?(\w*)/i,/(mageia|vectorlinux)[; ]/i,/([kxln]?ubuntu|debian|suse|opensuse|gentoo|arch(?= linux)|slackware|fedora|mandriva|centos|pclinuxos|red ?hat|zenwalk|linpus|raspbian|plan 9|minix|risc os|contiki|deepin|manjaro|elementary os|sabayon|linspire)(?: gnu\/linux)?(?: enterprise)?(?:[- ]linux)?(?:-gnu)?[-\/ ]?(?!chrom|package)([-\w\.]*)/i,/(hurd|linux) ?([\w\.]*)/i,/(gnu) ?([\w\.]*)/i,/\b([-frentopcghs]{0,5}bsd|dragonfly)[\/ ]?(?!amd|[ix346]{1,2}86)([\w\.]*)/i,/(haiku) (\w+)/i],[h,g],[/(sunos) ?([\w\.\d]*)/i],[[h,"Solaris"],g],[/((?:open)?solaris)[-\/ ]?([\w\.]*)/i,/(aix) ((\d)(?=\.|\)| )[\w\.])*/i,/\b(beos|os\/2|amigaos|morphos|openvms|fuchsia|hp-ux|serenityos)/i,/(unix) ?([\w\.]*)/i],[h,g]]},Z=function(e,t){if(typeof e===u&&(t=e,e=a),!(this instanceof Z))return new Z(e,t).getResult()
var r=typeof i!==s&&i.navigator?i.navigator:a,n=e||(r&&r.userAgent?r.userAgent:""),v=r&&r.userAgentData?r.userAgentData:a,E=t?function(e,t){var r={}
for(var n in e)t[n]&&t[n].length%2==0?r[n]=t[n].concat(e[n]):r[n]=e[n]
return r}(X,t):X,w=r&&r.userAgent==n
return this.getBrowser=function(){var e,t={}
return t[h]=a,t[g]=a,$.call(t,n,E.browser),t[c]=typeof(e=t[g])===l?e.replace(/[^\d\.]/g,"").split(".")[0]:a,w&&r&&r.brave&&typeof r.brave.isBrave==o&&(t[h]="Brave"),t},this.getCPU=function(){var e={}
return e[m]=a,$.call(e,n,E.cpu),e},this.getDevice=function(){var e={}
return e[p]=a,e[d]=a,e[f]=a,$.call(e,n,E.device),w&&!e[f]&&v&&v.mobile&&(e[f]=y),w&&"Macintosh"==e[d]&&r&&typeof r.standalone!==s&&r.maxTouchPoints&&r.maxTouchPoints>2&&(e[d]="iPad",e[f]=b),e},this.getEngine=function(){var e={}
return e[h]=a,e[g]=a,$.call(e,n,E.engine),e},this.getOS=function(){var e={}
return e[h]=a,e[g]=a,$.call(e,n,E.os),w&&!e[h]&&v&&"Unknown"!=v.platform&&(e[h]=v.platform.replace(/chrome os/i,G).replace(/macos/i,H)),e},this.getResult=function(){return{ua:this.getUA(),browser:this.getBrowser(),engine:this.getEngine(),os:this.getOS(),device:this.getDevice(),cpu:this.getCPU()}},this.getUA=function(){return n},this.setUA=function(e){return n=typeof e===l&&e.length>350?W(e,350):e,this},this.setUA(n),this}
Z.VERSION="0.7.35",Z.BROWSER=V([h,g,c]),Z.CPU=V([m]),Z.DEVICE=V([d,p,f,v,y,E,b,w,_]),Z.ENGINE=Z.OS=V([h,g]),typeof t!==s?(e.exports&&(t=e.exports=Z),t.UAParser=Z):r.amdO?(n=function(){return Z}.call(t,r,t,e))===a||(e.exports=n):typeof i!==s&&(i.UAParser=Z)
var J=typeof i!==s&&(i.jQuery||i.Zepto)
if(J&&!J.ua){var ee=new Z
J.ua=ee.getResult(),J.ua.get=function(){return ee.getUA()},J.ua.set=function(e){ee.setUA(e)
var t=ee.getResult()
for(var r in t)J.ua[r]=t[r]}}}("object"==typeof window?window:this)},2404:e=>{function t(e){return e instanceof Map?e.clear=e.delete=e.set=function(){throw new Error("map is read-only")}:e instanceof Set&&(e.add=e.clear=e.delete=function(){throw new Error("set is read-only")}),Object.freeze(e),Object.getOwnPropertyNames(e).forEach((r=>{const n=e[r],i=typeof n
"object"!==i&&"function"!==i||Object.isFrozen(n)||t(n)})),e}class r{constructor(e){void 0===e.data&&(e.data={}),this.data=e.data,this.isMatchIgnored=!1}ignoreMatch(){this.isMatchIgnored=!0}}function n(e){return e.replace(/&/g,"&amp;").replace(/</g,"&lt;").replace(/>/g,"&gt;").replace(/"/g,"&quot;").replace(/'/g,"&#x27;")}function i(e){const t=Object.create(null)
for(const a in e)t[a]=e[a]
for(var r=arguments.length,n=new Array(r>1?r-1:0),i=1;i<r;i++)n[i-1]=arguments[i]
return n.forEach((function(e){for(const r in e)t[r]=e[r]})),t}const a=e=>!!e.scope
class o{constructor(e,t){this.buffer="",this.classPrefix=t.classPrefix,e.walk(this)}addText(e){this.buffer+=n(e)}openNode(e){if(!a(e))return
const t=((e,t)=>{let{prefix:r}=t
if(e.startsWith("language:"))return e.replace("language:","language-")
if(e.includes(".")){const t=e.split(".")
return[`${r}${t.shift()}`,...t.map(((e,t)=>`${e}${"_".repeat(t+1)}`))].join(" ")}return`${r}${e}`})(e.scope,{prefix:this.classPrefix})
this.span(t)}closeNode(e){a(e)&&(this.buffer+="</span>")}value(){return this.buffer}span(e){this.buffer+=`<span class="${e}">`}}const s=function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const t={children:[]}
return Object.assign(t,e),t}
class u{constructor(){this.rootNode=s(),this.stack=[this.rootNode]}get top(){return this.stack[this.stack.length-1]}get root(){return this.rootNode}add(e){this.top.children.push(e)}openNode(e){const t=s({scope:e})
this.add(t),this.stack.push(t)}closeNode(){if(this.stack.length>1)return this.stack.pop()}closeAllNodes(){for(;this.closeNode(););}toJSON(){return JSON.stringify(this.rootNode,null,4)}walk(e){return this.constructor._walk(e,this.rootNode)}static _walk(e,t){return"string"==typeof t?e.addText(t):t.children&&(e.openNode(t),t.children.forEach((t=>this._walk(e,t))),e.closeNode(t)),e}static _collapse(e){"string"!=typeof e&&e.children&&(e.children.every((e=>"string"==typeof e))?e.children=[e.children.join("")]:e.children.forEach((e=>{u._collapse(e)})))}}class l extends u{constructor(e){super(),this.options=e}addText(e){""!==e&&this.add(e)}startScope(e){this.openNode(e)}endScope(){this.closeNode()}__addSublanguage(e,t){const r=e.root
t&&(r.scope=`language:${t}`),this.add(r)}toHTML(){return new o(this,this.options).value()}finalize(){return this.closeAllNodes(),!0}}function c(e){return e?"string"==typeof e?e:e.source:null}function d(e){return p("(?=",e,")")}function h(e){return p("(?:",e,")*")}function f(e){return p("(?:",e,")?")}function p(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
return t.map((e=>c(e))).join("")}function g(){for(var e=arguments.length,t=new Array(e),r=0;r<e;r++)t[r]=arguments[r]
const n=function(e){const t=e[e.length-1]
return"object"==typeof t&&t.constructor===Object?(e.splice(e.length-1,1),t):{}}(t)
return"("+(n.capture?"":"?:")+t.map((e=>c(e))).join("|")+")"}function m(e){return new RegExp(e.toString()+"|").exec("").length-1}const v=/\[(?:[^\\\]]|\\.)*\]|\(\??|\\([1-9][0-9]*)|\\./
function y(e,t){let{joinWith:r}=t,n=0
return e.map((e=>{n+=1
const t=n
let r=c(e),i=""
for(;r.length>0;){const e=v.exec(r)
if(!e){i+=r
break}i+=r.substring(0,e.index),r=r.substring(e.index+e[0].length),"\\"===e[0][0]&&e[1]?i+="\\"+String(Number(e[1])+t):(i+=e[0],"("===e[0]&&n++)}return i})).map((e=>`(${e})`)).join(r)}const b="[a-zA-Z]\\w*",E="[a-zA-Z_]\\w*",w="\\b\\d+(\\.\\d+)?",_="(-?)(\\b0[xX][a-fA-F0-9]+|(\\b\\d+(\\.\\d*)?|\\.\\d+)([eE][-+]?\\d+)?)",T="\\b(0b[01]+)",A={begin:"\\\\[\\s\\S]",relevance:0},D={scope:"string",begin:"'",end:"'",illegal:"\\n",contains:[A]},k={scope:"string",begin:'"',end:'"',illegal:"\\n",contains:[A]},S=function(e,t){const r=i({scope:"comment",begin:e,end:t,contains:[]},arguments.length>2&&void 0!==arguments[2]?arguments[2]:{})
r.contains.push({scope:"doctag",begin:"[ ]*(?=(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):)",end:/(TODO|FIXME|NOTE|BUG|OPTIMIZE|HACK|XXX):/,excludeBegin:!0,relevance:0})
const n=g("I","a","is","so","us","to","at","if","in","it","on",/[A-Za-z]+['](d|ve|re|ll|t|s|n)/,/[A-Za-z]+[-][a-z]+/,/[A-Za-z][a-z]{2,}/)
return r.contains.push({begin:p(/[ ]+/,"(",n,/[.]?[:]?([.][ ]|[ ])/,"){3}")}),r},x=S("//","$"),C=S("/\\*","\\*/"),L=S("#","$"),R={scope:"number",begin:w,relevance:0},I={scope:"number",begin:_,relevance:0},O={scope:"number",begin:T,relevance:0},F={begin:/(?=\/[^/\n]*\/)/,contains:[{scope:"regexp",begin:/\//,end:/\/[gimuy]*/,illegal:/\n/,contains:[A,{begin:/\[/,end:/\]/,relevance:0,contains:[A]}]}]},P={scope:"title",begin:b,relevance:0},N={scope:"title",begin:E,relevance:0},M={begin:"\\.\\s*"+E,relevance:0}
var B=Object.freeze({__proto__:null,MATCH_NOTHING_RE:/\b\B/,IDENT_RE:b,UNDERSCORE_IDENT_RE:E,NUMBER_RE:w,C_NUMBER_RE:_,BINARY_NUMBER_RE:T,RE_STARTERS_RE:"!|!=|!==|%|%=|&|&&|&=|\\*|\\*=|\\+|\\+=|,|-|-=|/=|/|:|;|<<|<<=|<=|<|===|==|=|>>>=|>>=|>=|>>>|>>|>|\\?|\\[|\\{|\\(|\\^|\\^=|\\||\\|=|\\|\\||~",SHEBANG:function(){let e=arguments.length>0&&void 0!==arguments[0]?arguments[0]:{}
const t=/^#![ ]*\//
return e.binary&&(e.begin=p(t,/.*\b/,e.binary,/\b.*/)),i({scope:"meta",begin:t,end:/$/,relevance:0,"on:begin":(e,t)=>{0!==e.index&&t.ignoreMatch()}},e)},BACKSLASH_ESCAPE:A,APOS_STRING_MODE:D,QUOTE_STRING_MODE:k,PHRASAL_WORDS_MODE:{begin:/\b(a|an|the|are|I'm|isn't|don't|doesn't|won't|but|just|should|pretty|simply|enough|gonna|going|wtf|so|such|will|you|your|they|like|more)\b/},COMMENT:S,C_LINE_COMMENT_MODE:x,C_BLOCK_COMMENT_MODE:C,HASH_COMMENT_MODE:L,NUMBER_MODE:R,C_NUMBER_MODE:I,BINARY_NUMBER_MODE:O,REGEXP_MODE:F,TITLE_MODE:P,UNDERSCORE_TITLE_MODE:N,METHOD_GUARD:M,END_SAME_AS_BEGIN:function(e){return Object.assign(e,{"on:begin":(e,t)=>{t.data._beginMatch=e[1]},"on:end":(e,t)=>{t.data._beginMatch!==e[1]&&t.ignoreMatch()}})}})
function U(e,t){"."===e.input[e.index-1]&&t.ignoreMatch()}function q(e,t){void 0!==e.className&&(e.scope=e.className,delete e.className)}function j(e,t){t&&e.beginKeywords&&(e.begin="\\b("+e.beginKeywords.split(" ").join("|")+")(?!\\.)(?=\\b|\\s)",e.__beforeBegin=U,e.keywords=e.keywords||e.beginKeywords,delete e.beginKeywords,void 0===e.relevance&&(e.relevance=0))}function G(e,t){Array.isArray(e.illegal)&&(e.illegal=g(...e.illegal))}function H(e,t){if(e.match){if(e.begin||e.end)throw new Error("begin & end are not supported with match")
e.begin=e.match,delete e.match}}function V(e,t){void 0===e.relevance&&(e.relevance=1)}const z=(e,t)=>{if(!e.beforeMatch)return
if(e.starts)throw new Error("beforeMatch cannot be used with starts")
const r=Object.assign({},e)
Object.keys(e).forEach((t=>{delete e[t]})),e.keywords=r.keywords,e.begin=p(r.beforeMatch,d(r.begin)),e.starts={relevance:0,contains:[Object.assign(r,{endsParent:!0})]},e.relevance=0,delete r.beforeMatch},K=["of","and","for","in","not","or","if","then","parent","list","value"],W="keyword"
function $(e,t){let r=arguments.length>2&&void 0!==arguments[2]?arguments[2]:W
const n=Object.create(null)
return"string"==typeof e?i(r,e.split(" ")):Array.isArray(e)?i(r,e):Object.keys(e).forEach((function(r){Object.assign(n,$(e[r],t,r))})),n
function i(e,r){t&&(r=r.map((e=>e.toLowerCase()))),r.forEach((function(t){const r=t.split("|")
n[r[0]]=[e,Y(r[0],r[1])]}))}}function Y(e,t){return t?Number(t):function(e){return K.includes(e.toLowerCase())}(e)?0:1}const Q={},X=e=>{console.error(e)},Z=function(e){for(var t=arguments.length,r=new Array(t>1?t-1:0),n=1;n<t;n++)r[n-1]=arguments[n]
console.log(`WARN: ${e}`,...r)},J=(e,t)=>{Q[`${e}/${t}`]||(console.log(`Deprecated as of ${e}. ${t}`),Q[`${e}/${t}`]=!0)},ee=new Error
function te(e,t,r){let{key:n}=r,i=0
const a=e[n],o={},s={}
for(let u=1;u<=t.length;u++)s[u+i]=a[u],o[u+i]=!0,i+=m(t[u-1])
e[n]=s,e[n]._emit=o,e[n]._multi=!0}function re(e){!function(e){e.scope&&"object"==typeof e.scope&&null!==e.scope&&(e.beginScope=e.scope,delete e.scope)}(e),"string"==typeof e.beginScope&&(e.beginScope={_wrap:e.beginScope}),"string"==typeof e.endScope&&(e.endScope={_wrap:e.endScope}),function(e){if(Array.isArray(e.begin)){if(e.skip||e.excludeBegin||e.returnBegin)throw X("skip, excludeBegin, returnBegin not compatible with beginScope: {}"),ee
if("object"!=typeof e.beginScope||null===e.beginScope)throw X("beginScope must be object"),ee
te(e,e.begin,{key:"beginScope"}),e.begin=y(e.begin,{joinWith:""})}}(e),function(e){if(Array.isArray(e.end)){if(e.skip||e.excludeEnd||e.returnEnd)throw X("skip, excludeEnd, returnEnd not compatible with endScope: {}"),ee
if("object"!=typeof e.endScope||null===e.endScope)throw X("endScope must be object"),ee
te(e,e.end,{key:"endScope"}),e.end=y(e.end,{joinWith:""})}}(e)}function ne(e){function t(t,r){return new RegExp(c(t),"m"+(e.case_insensitive?"i":"")+(e.unicodeRegex?"u":"")+(r?"g":""))}class r{constructor(){this.matchIndexes={},this.regexes=[],this.matchAt=1,this.position=0}addRule(e,t){t.position=this.position++,this.matchIndexes[this.matchAt]=t,this.regexes.push([t,e]),this.matchAt+=m(e)+1}compile(){0===this.regexes.length&&(this.exec=()=>null)
const e=this.regexes.map((e=>e[1]))
this.matcherRe=t(y(e,{joinWith:"|"}),!0),this.lastIndex=0}exec(e){this.matcherRe.lastIndex=this.lastIndex
const t=this.matcherRe.exec(e)
if(!t)return null
const r=t.findIndex(((e,t)=>t>0&&void 0!==e)),n=this.matchIndexes[r]
return t.splice(0,r),Object.assign(t,n)}}class n{constructor(){this.rules=[],this.multiRegexes=[],this.count=0,this.lastIndex=0,this.regexIndex=0}getMatcher(e){if(this.multiRegexes[e])return this.multiRegexes[e]
const t=new r
return this.rules.slice(e).forEach((e=>{let[r,n]=e
return t.addRule(r,n)})),t.compile(),this.multiRegexes[e]=t,t}resumingScanAtSamePosition(){return 0!==this.regexIndex}considerAll(){this.regexIndex=0}addRule(e,t){this.rules.push([e,t]),"begin"===t.type&&this.count++}exec(e){const t=this.getMatcher(this.regexIndex)
t.lastIndex=this.lastIndex
let r=t.exec(e)
if(this.resumingScanAtSamePosition())if(r&&r.index===this.lastIndex);else{const t=this.getMatcher(0)
t.lastIndex=this.lastIndex+1,r=t.exec(e)}return r&&(this.regexIndex+=r.position+1,this.regexIndex===this.count&&this.considerAll()),r}}if(e.compilerExtensions||(e.compilerExtensions=[]),e.contains&&e.contains.includes("self"))throw new Error("ERR: contains `self` is not supported at the top-level of a language.  See documentation.")
return e.classNameAliases=i(e.classNameAliases||{}),function r(a,o){const s=a
if(a.isCompiled)return s;[q,H,re,z].forEach((e=>e(a,o))),e.compilerExtensions.forEach((e=>e(a,o))),a.__beforeBegin=null,[j,G,V].forEach((e=>e(a,o))),a.isCompiled=!0
let u=null
return"object"==typeof a.keywords&&a.keywords.$pattern&&(a.keywords=Object.assign({},a.keywords),u=a.keywords.$pattern,delete a.keywords.$pattern),u=u||/\w+/,a.keywords&&(a.keywords=$(a.keywords,e.case_insensitive)),s.keywordPatternRe=t(u,!0),o&&(a.begin||(a.begin=/\B|\b/),s.beginRe=t(s.begin),a.end||a.endsWithParent||(a.end=/\B|\b/),a.end&&(s.endRe=t(s.end)),s.terminatorEnd=c(s.end)||"",a.endsWithParent&&o.terminatorEnd&&(s.terminatorEnd+=(a.end?"|":"")+o.terminatorEnd)),a.illegal&&(s.illegalRe=t(a.illegal)),a.contains||(a.contains=[]),a.contains=[].concat(...a.contains.map((function(e){return function(e){return e.variants&&!e.cachedVariants&&(e.cachedVariants=e.variants.map((function(t){return i(e,{variants:null},t)}))),e.cachedVariants?e.cachedVariants:ie(e)?i(e,{starts:e.starts?i(e.starts):null}):Object.isFrozen(e)?i(e):e}("self"===e?a:e)}))),a.contains.forEach((function(e){r(e,s)})),a.starts&&r(a.starts,o),s.matcher=function(e){const t=new n
return e.contains.forEach((e=>t.addRule(e.begin,{rule:e,type:"begin"}))),e.terminatorEnd&&t.addRule(e.terminatorEnd,{type:"end"}),e.illegal&&t.addRule(e.illegal,{type:"illegal"}),t}(s),s}(e)}function ie(e){return!!e&&(e.endsWithParent||ie(e.starts))}class ae extends Error{constructor(e,t){super(e),this.name="HTMLInjectionError",this.html=t}}const oe=n,se=i,ue=Symbol("nomatch"),le=function(e){const n=Object.create(null),i=Object.create(null),a=[]
let o=!0
const s="Could not find the language '{}', did you forget to load/include a language module?",u={disableAutodetect:!0,name:"Plain text",contains:[]}
let c={ignoreUnescapedHTML:!1,throwUnescapedHTML:!1,noHighlightRe:/^(no-?highlight)$/i,languageDetectRe:/\blang(?:uage)?-([\w-]+)\b/i,classPrefix:"hljs-",cssSelector:"pre code",languages:null,__emitter:l}
function m(e){return c.noHighlightRe.test(e)}function v(e,t,r){let n="",i=""
"object"==typeof t?(n=e,r=t.ignoreIllegals,i=t.language):(J("10.7.0","highlight(lang, code, ...args) has been deprecated."),J("10.7.0","Please use highlight(code, options) instead.\nhttps://github.com/highlightjs/highlight.js/issues/2277"),i=e,n=t),void 0===r&&(r=!0)
const a={code:n,language:i}
k("before:highlight",a)
const o=a.result?a.result:y(a.language,a.code,r)
return o.code=a.code,k("after:highlight",o),o}function y(e,t,i,a){const u=Object.create(null)
function l(){if(!D.keywords)return void S.addText(x)
let e=0
D.keywordPatternRe.lastIndex=0
let t=D.keywordPatternRe.exec(x),r=""
for(;t;){r+=x.substring(e,t.index)
const i=w.case_insensitive?t[0].toLowerCase():t[0],a=(n=i,D.keywords[n])
if(a){const[e,n]=a
if(S.addText(r),r="",u[i]=(u[i]||0)+1,u[i]<=7&&(C+=n),e.startsWith("_"))r+=t[0]
else{const r=w.classNameAliases[e]||e
h(t[0],r)}}else r+=t[0]
e=D.keywordPatternRe.lastIndex,t=D.keywordPatternRe.exec(x)}var n
r+=x.substring(e),S.addText(r)}function d(){null!=D.subLanguage?function(){if(""===x)return
let e=null
if("string"==typeof D.subLanguage){if(!n[D.subLanguage])return void S.addText(x)
e=y(D.subLanguage,x,!0,k[D.subLanguage]),k[D.subLanguage]=e._top}else e=b(x,D.subLanguage.length?D.subLanguage:null)
D.relevance>0&&(C+=e.relevance),S.__addSublanguage(e._emitter,e.language)}():l(),x=""}function h(e,t){""!==e&&(S.startScope(t),S.addText(e),S.endScope())}function f(e,t){let r=1
const n=t.length-1
for(;r<=n;){if(!e._emit[r]){r++
continue}const n=w.classNameAliases[e[r]]||e[r],i=t[r]
n?h(i,n):(x=i,l(),x=""),r++}}function p(e,t){return e.scope&&"string"==typeof e.scope&&S.openNode(w.classNameAliases[e.scope]||e.scope),e.beginScope&&(e.beginScope._wrap?(h(x,w.classNameAliases[e.beginScope._wrap]||e.beginScope._wrap),x=""):e.beginScope._multi&&(f(e.beginScope,t),x="")),D=Object.create(e,{parent:{value:D}}),D}function g(e,t,n){let i=function(e,t){const r=e&&e.exec(t)
return r&&0===r.index}(e.endRe,n)
if(i){if(e["on:end"]){const n=new r(e)
e["on:end"](t,n),n.isMatchIgnored&&(i=!1)}if(i){for(;e.endsParent&&e.parent;)e=e.parent
return e}}if(e.endsWithParent)return g(e.parent,t,n)}function m(e){return 0===D.matcher.regexIndex?(x+=e[0],1):(I=!0,0)}let v={}
function E(n,a){const s=a&&a[0]
if(x+=n,null==s)return d(),0
if("begin"===v.type&&"end"===a.type&&v.index===a.index&&""===s){if(x+=t.slice(a.index,a.index+1),!o){const t=new Error(`0 width match regex (${e})`)
throw t.languageName=e,t.badRule=v.rule,t}return 1}if(v=a,"begin"===a.type)return function(e){const t=e[0],n=e.rule,i=new r(n),a=[n.__beforeBegin,n["on:begin"]]
for(const r of a)if(r&&(r(e,i),i.isMatchIgnored))return m(t)
return n.skip?x+=t:(n.excludeBegin&&(x+=t),d(),n.returnBegin||n.excludeBegin||(x=t)),p(n,e),n.returnBegin?0:t.length}(a)
if("illegal"===a.type&&!i){const e=new Error('Illegal lexeme "'+s+'" for mode "'+(D.scope||"<unnamed>")+'"')
throw e.mode=D,e}if("end"===a.type){const e=function(e){const r=e[0],n=t.substring(e.index),i=g(D,e,n)
if(!i)return ue
const a=D
D.endScope&&D.endScope._wrap?(d(),h(r,D.endScope._wrap)):D.endScope&&D.endScope._multi?(d(),f(D.endScope,e)):a.skip?x+=r:(a.returnEnd||a.excludeEnd||(x+=r),d(),a.excludeEnd&&(x=r))
do{D.scope&&S.closeNode(),D.skip||D.subLanguage||(C+=D.relevance),D=D.parent}while(D!==i.parent)
return i.starts&&p(i.starts,e),a.returnEnd?0:r.length}(a)
if(e!==ue)return e}if("illegal"===a.type&&""===s)return 1
if(R>1e5&&R>3*a.index)throw new Error("potential infinite loop, way more iterations than matches")
return x+=s,s.length}const w=T(e)
if(!w)throw X(s.replace("{}",e)),new Error('Unknown language: "'+e+'"')
const _=ne(w)
let A="",D=a||_
const k={},S=new c.__emitter(c)
!function(){const e=[]
for(let t=D;t!==w;t=t.parent)t.scope&&e.unshift(t.scope)
e.forEach((e=>S.openNode(e)))}()
let x="",C=0,L=0,R=0,I=!1
try{if(w.__emitTokens)w.__emitTokens(t,S)
else{for(D.matcher.considerAll();;){R++,I?I=!1:D.matcher.considerAll(),D.matcher.lastIndex=L
const e=D.matcher.exec(t)
if(!e)break
const r=E(t.substring(L,e.index),e)
L=e.index+r}E(t.substring(L))}return S.finalize(),A=S.toHTML(),{language:e,value:A,relevance:C,illegal:!1,_emitter:S,_top:D}}catch(r){if(r.message&&r.message.includes("Illegal"))return{language:e,value:oe(t),illegal:!0,relevance:0,_illegalBy:{message:r.message,index:L,context:t.slice(L-100,L+100),mode:r.mode,resultSoFar:A},_emitter:S}
if(o)return{language:e,value:oe(t),illegal:!1,relevance:0,errorRaised:r,_emitter:S,_top:D}
throw r}}function b(e,t){t=t||c.languages||Object.keys(n)
const r=function(e){const t={value:oe(e),illegal:!1,relevance:0,_top:u,_emitter:new c.__emitter(c)}
return t._emitter.addText(e),t}(e),i=t.filter(T).filter(D).map((t=>y(t,e,!1)))
i.unshift(r)
const a=i.sort(((e,t)=>{if(e.relevance!==t.relevance)return t.relevance-e.relevance
if(e.language&&t.language){if(T(e.language).supersetOf===t.language)return 1
if(T(t.language).supersetOf===e.language)return-1}return 0})),[o,s]=a,l=o
return l.secondBest=s,l}function E(e){let t=null
const r=function(e){let t=e.className+" "
t+=e.parentNode?e.parentNode.className:""
const r=c.languageDetectRe.exec(t)
if(r){const t=T(r[1])
return t||(Z(s.replace("{}",r[1])),Z("Falling back to no-highlight mode for this block.",e)),t?r[1]:"no-highlight"}return t.split(/\s+/).find((e=>m(e)||T(e)))}(e)
if(m(r))return
if(k("before:highlightElement",{el:e,language:r}),e.children.length>0&&(c.ignoreUnescapedHTML||(console.warn("One of your code blocks includes unescaped HTML. This is a potentially serious security risk."),console.warn("https://github.com/highlightjs/highlight.js/wiki/security"),console.warn("The element with unescaped HTML:"),console.warn(e)),c.throwUnescapedHTML))throw new ae("One of your code blocks includes unescaped HTML.",e.innerHTML)
t=e
const n=t.textContent,a=r?v(n,{language:r,ignoreIllegals:!0}):b(n)
e.innerHTML=a.value,function(e,t,r){const n=t&&i[t]||r
e.classList.add("hljs"),e.classList.add(`language-${n}`)}(e,r,a.language),e.result={language:a.language,re:a.relevance,relevance:a.relevance},a.secondBest&&(e.secondBest={language:a.secondBest.language,relevance:a.secondBest.relevance}),k("after:highlightElement",{el:e,result:a,text:n})}let w=!1
function _(){"loading"!==document.readyState?document.querySelectorAll(c.cssSelector).forEach(E):w=!0}function T(e){return e=(e||"").toLowerCase(),n[e]||n[i[e]]}function A(e,t){let{languageName:r}=t
"string"==typeof e&&(e=[e]),e.forEach((e=>{i[e.toLowerCase()]=r}))}function D(e){const t=T(e)
return t&&!t.disableAutodetect}function k(e,t){const r=e
a.forEach((function(e){e[r]&&e[r](t)}))}"undefined"!=typeof window&&window.addEventListener&&window.addEventListener("DOMContentLoaded",(function(){w&&_()}),!1),Object.assign(e,{highlight:v,highlightAuto:b,highlightAll:_,highlightElement:E,highlightBlock:function(e){return J("10.7.0","highlightBlock will be removed entirely in v12.0"),J("10.7.0","Please use highlightElement now."),E(e)},configure:function(e){c=se(c,e)},initHighlighting:()=>{_(),J("10.6.0","initHighlighting() deprecated.  Use highlightAll() now.")},initHighlightingOnLoad:function(){_(),J("10.6.0","initHighlightingOnLoad() deprecated.  Use highlightAll() now.")},registerLanguage:function(t,r){let i=null
try{i=r(e)}catch(e){if(X("Language definition for '{}' could not be registered.".replace("{}",t)),!o)throw e
X(e),i=u}i.name||(i.name=t),n[t]=i,i.rawDefinition=r.bind(null,e),i.aliases&&A(i.aliases,{languageName:t})},unregisterLanguage:function(e){delete n[e]
for(const t of Object.keys(i))i[t]===e&&delete i[t]},listLanguages:function(){return Object.keys(n)},getLanguage:T,registerAliases:A,autoDetection:D,inherit:se,addPlugin:function(e){!function(e){e["before:highlightBlock"]&&!e["before:highlightElement"]&&(e["before:highlightElement"]=t=>{e["before:highlightBlock"](Object.assign({block:t.el},t))}),e["after:highlightBlock"]&&!e["after:highlightElement"]&&(e["after:highlightElement"]=t=>{e["after:highlightBlock"](Object.assign({block:t.el},t))})}(e),a.push(e)},removePlugin:function(e){const t=a.indexOf(e);-1!==t&&a.splice(t,1)}}),e.debugMode=function(){o=!1},e.safeMode=function(){o=!0},e.versionString="11.8.0",e.regex={concat:p,lookahead:d,either:g,optional:f,anyNumberOfTimes:h}
for(const r in B)"object"==typeof B[r]&&t(B[r])
return Object.assign(e,B),e},ce=le({})
ce.newInstance=()=>le({}),e.exports=ce,ce.HighlightJS=ce,ce.default=ce},1367:e=>{const t=["a","abbr","address","article","aside","audio","b","blockquote","body","button","canvas","caption","cite","code","dd","del","details","dfn","div","dl","dt","em","fieldset","figcaption","figure","footer","form","h1","h2","h3","h4","h5","h6","header","hgroup","html","i","iframe","img","input","ins","kbd","label","legend","li","main","mark","menu","nav","object","ol","p","q","quote","samp","section","span","strong","summary","sup","table","tbody","td","textarea","tfoot","th","thead","time","tr","ul","var","video"],r=["any-hover","any-pointer","aspect-ratio","color","color-gamut","color-index","device-aspect-ratio","device-height","device-width","display-mode","forced-colors","grid","height","hover","inverted-colors","monochrome","orientation","overflow-block","overflow-inline","pointer","prefers-color-scheme","prefers-contrast","prefers-reduced-motion","prefers-reduced-transparency","resolution","scan","scripting","update","width","min-width","max-width","min-height","max-height"],n=["active","any-link","blank","checked","current","default","defined","dir","disabled","drop","empty","enabled","first","first-child","first-of-type","fullscreen","future","focus","focus-visible","focus-within","has","host","host-context","hover","indeterminate","in-range","invalid","is","lang","last-child","last-of-type","left","link","local-link","not","nth-child","nth-col","nth-last-child","nth-last-col","nth-last-of-type","nth-of-type","only-child","only-of-type","optional","out-of-range","past","placeholder-shown","read-only","read-write","required","right","root","scope","target","target-within","user-invalid","valid","visited","where"],i=["after","backdrop","before","cue","cue-region","first-letter","first-line","grammar-error","marker","part","placeholder","selection","slotted","spelling-error"],a=["align-content","align-items","align-self","all","animation","animation-delay","animation-direction","animation-duration","animation-fill-mode","animation-iteration-count","animation-name","animation-play-state","animation-timing-function","backface-visibility","background","background-attachment","background-blend-mode","background-clip","background-color","background-image","background-origin","background-position","background-repeat","background-size","block-size","border","border-block","border-block-color","border-block-end","border-block-end-color","border-block-end-style","border-block-end-width","border-block-start","border-block-start-color","border-block-start-style","border-block-start-width","border-block-style","border-block-width","border-bottom","border-bottom-color","border-bottom-left-radius","border-bottom-right-radius","border-bottom-style","border-bottom-width","border-collapse","border-color","border-image","border-image-outset","border-image-repeat","border-image-slice","border-image-source","border-image-width","border-inline","border-inline-color","border-inline-end","border-inline-end-color","border-inline-end-style","border-inline-end-width","border-inline-start","border-inline-start-color","border-inline-start-style","border-inline-start-width","border-inline-style","border-inline-width","border-left","border-left-color","border-left-style","border-left-width","border-radius","border-right","border-right-color","border-right-style","border-right-width","border-spacing","border-style","border-top","border-top-color","border-top-left-radius","border-top-right-radius","border-top-style","border-top-width","border-width","bottom","box-decoration-break","box-shadow","box-sizing","break-after","break-before","break-inside","caption-side","caret-color","clear","clip","clip-path","clip-rule","color","column-count","column-fill","column-gap","column-rule","column-rule-color","column-rule-style","column-rule-width","column-span","column-width","columns","contain","content","content-visibility","counter-increment","counter-reset","cue","cue-after","cue-before","cursor","direction","display","empty-cells","filter","flex","flex-basis","flex-direction","flex-flow","flex-grow","flex-shrink","flex-wrap","float","flow","font","font-display","font-family","font-feature-settings","font-kerning","font-language-override","font-size","font-size-adjust","font-smoothing","font-stretch","font-style","font-synthesis","font-variant","font-variant-caps","font-variant-east-asian","font-variant-ligatures","font-variant-numeric","font-variant-position","font-variation-settings","font-weight","gap","glyph-orientation-vertical","grid","grid-area","grid-auto-columns","grid-auto-flow","grid-auto-rows","grid-column","grid-column-end","grid-column-start","grid-gap","grid-row","grid-row-end","grid-row-start","grid-template","grid-template-areas","grid-template-columns","grid-template-rows","hanging-punctuation","height","hyphens","icon","image-orientation","image-rendering","image-resolution","ime-mode","inline-size","isolation","justify-content","left","letter-spacing","line-break","line-height","list-style","list-style-image","list-style-position","list-style-type","margin","margin-block","margin-block-end","margin-block-start","margin-bottom","margin-inline","margin-inline-end","margin-inline-start","margin-left","margin-right","margin-top","marks","mask","mask-border","mask-border-mode","mask-border-outset","mask-border-repeat","mask-border-slice","mask-border-source","mask-border-width","mask-clip","mask-composite","mask-image","mask-mode","mask-origin","mask-position","mask-repeat","mask-size","mask-type","max-block-size","max-height","max-inline-size","max-width","min-block-size","min-height","min-inline-size","min-width","mix-blend-mode","nav-down","nav-index","nav-left","nav-right","nav-up","none","normal","object-fit","object-position","opacity","order","orphans","outline","outline-color","outline-offset","outline-style","outline-width","overflow","overflow-wrap","overflow-x","overflow-y","padding","padding-block","padding-block-end","padding-block-start","padding-bottom","padding-inline","padding-inline-end","padding-inline-start","padding-left","padding-right","padding-top","page-break-after","page-break-before","page-break-inside","pause","pause-after","pause-before","perspective","perspective-origin","pointer-events","position","quotes","resize","rest","rest-after","rest-before","right","row-gap","scroll-margin","scroll-margin-block","scroll-margin-block-end","scroll-margin-block-start","scroll-margin-bottom","scroll-margin-inline","scroll-margin-inline-end","scroll-margin-inline-start","scroll-margin-left","scroll-margin-right","scroll-margin-top","scroll-padding","scroll-padding-block","scroll-padding-block-end","scroll-padding-block-start","scroll-padding-bottom","scroll-padding-inline","scroll-padding-inline-end","scroll-padding-inline-start","scroll-padding-left","scroll-padding-right","scroll-padding-top","scroll-snap-align","scroll-snap-stop","scroll-snap-type","scrollbar-color","scrollbar-gutter","scrollbar-width","shape-image-threshold","shape-margin","shape-outside","speak","speak-as","src","tab-size","table-layout","text-align","text-align-all","text-align-last","text-combine-upright","text-decoration","text-decoration-color","text-decoration-line","text-decoration-style","text-emphasis","text-emphasis-color","text-emphasis-position","text-emphasis-style","text-indent","text-justify","text-orientation","text-overflow","text-rendering","text-shadow","text-transform","text-underline-position","top","transform","transform-box","transform-origin","transform-style","transition","transition-delay","transition-duration","transition-property","transition-timing-function","unicode-bidi","vertical-align","visibility","voice-balance","voice-duration","voice-family","voice-pitch","voice-range","voice-rate","voice-stress","voice-volume","white-space","widows","width","will-change","word-break","word-spacing","word-wrap","writing-mode","z-index"].reverse()
e.exports=function(e){const o=e.regex,s=(e=>({IMPORTANT:{scope:"meta",begin:"!important"},BLOCK_COMMENT:e.C_BLOCK_COMMENT_MODE,HEXCOLOR:{scope:"number",begin:/#(([0-9a-fA-F]{3,4})|(([0-9a-fA-F]{2}){3,4}))\b/},FUNCTION_DISPATCH:{className:"built_in",begin:/[\w-]+(?=\()/},ATTRIBUTE_SELECTOR_MODE:{scope:"selector-attr",begin:/\[/,end:/\]/,illegal:"$",contains:[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]},CSS_NUMBER_MODE:{scope:"number",begin:e.NUMBER_RE+"(%|em|ex|ch|rem|vw|vh|vmin|vmax|cm|mm|in|pt|pc|px|deg|grad|rad|turn|s|ms|Hz|kHz|dpi|dpcm|dppx)?",relevance:0},CSS_VARIABLE:{className:"attr",begin:/--[A-Za-z][A-Za-z0-9_-]*/}}))(e),u=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE]
return{name:"CSS",case_insensitive:!0,illegal:/[=|'\$]/,keywords:{keyframePosition:"from to"},classNameAliases:{keyframePosition:"selector-tag"},contains:[s.BLOCK_COMMENT,{begin:/-(webkit|moz|ms|o)-(?=[a-z])/},s.CSS_NUMBER_MODE,{className:"selector-id",begin:/#[A-Za-z0-9_-]+/,relevance:0},{className:"selector-class",begin:"\\.[a-zA-Z-][a-zA-Z0-9_-]*",relevance:0},s.ATTRIBUTE_SELECTOR_MODE,{className:"selector-pseudo",variants:[{begin:":("+n.join("|")+")"},{begin:":(:)?("+i.join("|")+")"}]},s.CSS_VARIABLE,{className:"attribute",begin:"\\b("+a.join("|")+")\\b"},{begin:/:/,end:/[;}{]/,contains:[s.BLOCK_COMMENT,s.HEXCOLOR,s.IMPORTANT,s.CSS_NUMBER_MODE,...u,{begin:/(url|data-uri)\(/,end:/\)/,relevance:0,keywords:{built_in:"url data-uri"},contains:[...u,{className:"string",begin:/[^)]/,endsWithParent:!0,excludeEnd:!0}]},s.FUNCTION_DISPATCH]},{begin:o.lookahead(/@/),end:"[{;]",relevance:0,illegal:/:/,contains:[{className:"keyword",begin:/@-?\w[\w]*(-\w+)*/},{begin:/\s/,endsWithParent:!0,excludeEnd:!0,relevance:0,keywords:{$pattern:/[a-z-]+/,keyword:"and or not only",attribute:r.join(" ")},contains:[{begin:/[a-z-]+(?=:)/,className:"attribute"},...u,s.CSS_NUMBER_MODE]}]},{className:"selector-tag",begin:"\\b("+t.join("|")+")\\b"}]}}},365:e=>{e.exports=function(e){const t=e.regex
return{name:"Diff",aliases:["patch"],contains:[{className:"meta",relevance:10,match:t.either(/^@@ +-\d+,\d+ +\+\d+,\d+ +@@/,/^\*\*\* +\d+,\d+ +\*\*\*\*$/,/^--- +\d+,\d+ +----$/)},{className:"comment",variants:[{begin:t.either(/Index: /,/^index/,/={3,}/,/^-{3}/,/^\*{3} /,/^\+{3}/,/^diff --git/),end:/$/},{match:/^\*{15}$/}]},{className:"addition",begin:/^\+/,end:/$/},{className:"deletion",begin:/^-/,end:/$/},{className:"addition",begin:/^!/,end:/$/}]}}},370:e=>{e.exports=function(e){const t=e.regex,r={$pattern:/[\w.\/]+/,built_in:["action","bindattr","collection","component","concat","debugger","each","each-in","get","hash","if","in","input","link-to","loc","log","lookup","mut","outlet","partial","query-params","render","template","textarea","unbound","unless","view","with","yield"]},n=/\[\]|\[[^\]]+\]/,i=/[^\s!"#%&'()*+,.\/;<=>@\[\\\]^`{|}~]+/,a=t.either(/""|"[^"]+"/,/''|'[^']+'/,n,i),o=t.concat(t.optional(/\.|\.\/|\//),a,t.anyNumberOfTimes(t.concat(/(\.|\/)/,a))),s=t.concat("(",n,"|",i,")(?==)"),u={begin:o},l=e.inherit(u,{keywords:{$pattern:/[\w.\/]+/,literal:["true","false","undefined","null"]}}),c={begin:/\(/,end:/\)/},d={className:"attr",begin:s,relevance:0,starts:{begin:/=/,end:/=/,starts:{contains:[e.NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,l,c]}}},h={contains:[e.NUMBER_MODE,e.QUOTE_STRING_MODE,e.APOS_STRING_MODE,{begin:/as\s+\|/,keywords:{keyword:"as"},end:/\|/,contains:[{begin:/\w+/}]},d,l,c],returnEnd:!0},f=e.inherit(u,{className:"name",keywords:r,starts:e.inherit(h,{end:/\)/})})
c.contains=[f]
const p=e.inherit(u,{keywords:r,className:"name",starts:e.inherit(h,{end:/\}\}/})}),g=e.inherit(u,{keywords:r,className:"name"}),m=e.inherit(u,{className:"name",keywords:r,starts:e.inherit(h,{end:/\}\}/})})
return{name:"Handlebars",aliases:["hbs","html.hbs","html.handlebars","htmlbars"],case_insensitive:!0,subLanguage:"xml",contains:[{begin:/\\\{\{/,skip:!0},{begin:/\\\\(?=\{\{)/,skip:!0},e.COMMENT(/\{\{!--/,/--\}\}/),e.COMMENT(/\{\{!/,/\}\}/),{className:"template-tag",begin:/\{\{\{\{(?!\/)/,end:/\}\}\}\}/,contains:[p],starts:{end:/\{\{\{\{\//,returnEnd:!0,subLanguage:"xml"}},{className:"template-tag",begin:/\{\{\{\{\//,end:/\}\}\}\}/,contains:[g]},{className:"template-tag",begin:/\{\{#/,end:/\}\}/,contains:[p]},{className:"template-tag",begin:/\{\{(?=else\}\})/,end:/\}\}/,keywords:"else"},{className:"template-tag",begin:/\{\{(?=else if)/,end:/\}\}/,keywords:"else if"},{className:"template-tag",begin:/\{\{\//,end:/\}\}/,contains:[g]},{className:"template-variable",begin:/\{\{\{/,end:/\}\}\}/,contains:[m]},{className:"template-variable",begin:/\{\{/,end:/\}\}/,contains:[m]}]}}},979:e=>{const t="[A-Za-z$_][0-9A-Za-z$_]*",r=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],n=["true","false","null","undefined","NaN","Infinity"],i=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],a=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],o=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],s=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],u=[].concat(o,i,a)
e.exports=function(e){const l=e.regex,c=t,d={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{const r=e[0].length+e.index,n=e.input[r]
if("<"===n||","===n)return void t.ignoreMatch()
let i
">"===n&&(((e,t)=>{let{after:r}=t
const n="</"+e[0].slice(1)
return-1!==e.input.indexOf(n,r)})(e,{after:r})||t.ignoreMatch())
const a=e.input.substring(r);((i=a.match(/^\s*=/))||(i=a.match(/^\s+extends\s+/))&&0===i.index)&&t.ignoreMatch()}},h={$pattern:t,keyword:r,literal:n,built_in:u,"variable.language":s},f="[0-9](_?[0-9])*",p=`\\.(${f})`,g="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${g})((${p})|\\.)?|(${p}))[eE][+-]?(${f})\\b`},{begin:`\\b(${g})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},v={className:"subst",begin:"\\$\\{",end:"\\}",keywords:h,contains:[]},y={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,v],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,v],subLanguage:"css"}},E={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,v],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,v]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:c+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,b,E,w,{match:/\$\d+/},m]
v.contains=T.concat({begin:/\{/,end:/\}/,keywords:h,contains:["self"].concat(T)})
const A=[].concat(_,v.contains),D=A.concat([{begin:/\(/,end:/\)/,keywords:h,contains:["self"].concat(A)}]),k={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:h,contains:D},S={variants:[{match:[/class/,/\s+/,c,/\s+/,/extends/,/\s+/,l.concat(c,"(",l.concat(/\./,c),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,c],scope:{1:"keyword",3:"title.class"}}]},x={relevance:0,match:l.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...i,...a]}},C={variants:[{match:[/function/,/\s+/,c,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[k],illegal:/%/},L={match:l.concat(/\b/,(R=[...o,"super","import"],l.concat("(?!",R.join("|"),")")),c,l.lookahead(/\(/)),className:"title.function",relevance:0}
var R
const I={begin:l.concat(/\./,l.lookahead(l.concat(c,/(?![0-9A-Za-z$_(])/))),end:c,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},O={match:[/get|set/,/\s+/,c,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},k]},F="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",P={match:[/const|var|let/,/\s+/,c,/\s*/,/=\s*/,/(async\s*)?/,l.lookahead(F)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[k]}
return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:h,exports:{PARAMS_CONTAINS:D,CLASS_REFERENCE:x},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,b,E,w,_,{match:/\$\d+/},m,x,{className:"attr",begin:c+l.lookahead(":"),relevance:0},P,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:F,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:h,contains:D}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:d.begin,"on:begin":d.isTrulyOpeningTag,end:d.end}],subLanguage:"xml",contains:[{begin:d.begin,end:d.end,skip:!0,contains:["self"]}]}]},C,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[k,e.inherit(e.TITLE_MODE,{begin:c,className:"title.function"})]},{match:/\.\.\./,relevance:0},I,{match:"\\$"+c,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[k]},L,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},S,O,{match:/\$[(.]/}]}}},7366:e=>{e.exports=function(e){const t=["true","false","null"],r={scope:"literal",beginKeywords:t.join(" ")}
return{name:"JSON",keywords:{literal:t},contains:[{className:"attr",begin:/"(\\.|[^\\"\r\n])*"(?=\s*:)/,relevance:1.01},{match:/[{}[\],:]/,className:"punctuation",relevance:0},e.QUOTE_STRING_MODE,r,e.C_NUMBER_MODE,e.C_LINE_COMMENT_MODE,e.C_BLOCK_COMMENT_MODE],illegal:"\\S"}}},8591:e=>{e.exports=function(e){return{name:"Shell Session",aliases:["console","shellsession"],contains:[{className:"meta.prompt",begin:/^\s{0,3}[/~\w\d[\]()@-]*[>%$#][ ]?/,starts:{end:/[^\\](?=\s*$)/,subLanguage:"bash"}}]}}},636:e=>{const t="[A-Za-z$_][0-9A-Za-z$_]*",r=["as","in","of","if","for","while","finally","var","new","function","do","return","void","else","break","catch","instanceof","with","throw","case","default","try","switch","continue","typeof","delete","let","yield","const","class","debugger","async","await","static","import","from","export","extends"],n=["true","false","null","undefined","NaN","Infinity"],i=["Object","Function","Boolean","Symbol","Math","Date","Number","BigInt","String","RegExp","Array","Float32Array","Float64Array","Int8Array","Uint8Array","Uint8ClampedArray","Int16Array","Int32Array","Uint16Array","Uint32Array","BigInt64Array","BigUint64Array","Set","Map","WeakSet","WeakMap","ArrayBuffer","SharedArrayBuffer","Atomics","DataView","JSON","Promise","Generator","GeneratorFunction","AsyncFunction","Reflect","Proxy","Intl","WebAssembly"],a=["Error","EvalError","InternalError","RangeError","ReferenceError","SyntaxError","TypeError","URIError"],o=["setInterval","setTimeout","clearInterval","clearTimeout","require","exports","eval","isFinite","isNaN","parseFloat","parseInt","decodeURI","decodeURIComponent","encodeURI","encodeURIComponent","escape","unescape"],s=["arguments","this","super","console","window","document","localStorage","sessionStorage","module","global"],u=[].concat(o,i,a)
function l(e){const l=e.regex,c=t,d={begin:/<[A-Za-z0-9\\._:-]+/,end:/\/[A-Za-z0-9\\._:-]+>|\/>/,isTrulyOpeningTag:(e,t)=>{const r=e[0].length+e.index,n=e.input[r]
if("<"===n||","===n)return void t.ignoreMatch()
let i
">"===n&&(((e,t)=>{let{after:r}=t
const n="</"+e[0].slice(1)
return-1!==e.input.indexOf(n,r)})(e,{after:r})||t.ignoreMatch())
const a=e.input.substring(r);((i=a.match(/^\s*=/))||(i=a.match(/^\s+extends\s+/))&&0===i.index)&&t.ignoreMatch()}},h={$pattern:t,keyword:r,literal:n,built_in:u,"variable.language":s},f="[0-9](_?[0-9])*",p=`\\.(${f})`,g="0|[1-9](_?[0-9])*|0[0-7]*[89][0-9]*",m={className:"number",variants:[{begin:`(\\b(${g})((${p})|\\.)?|(${p}))[eE][+-]?(${f})\\b`},{begin:`\\b(${g})\\b((${p})\\b|\\.)?|(${p})\\b`},{begin:"\\b(0|[1-9](_?[0-9])*)n\\b"},{begin:"\\b0[xX][0-9a-fA-F](_?[0-9a-fA-F])*n?\\b"},{begin:"\\b0[bB][0-1](_?[0-1])*n?\\b"},{begin:"\\b0[oO][0-7](_?[0-7])*n?\\b"},{begin:"\\b0[0-7]+n?\\b"}],relevance:0},v={className:"subst",begin:"\\$\\{",end:"\\}",keywords:h,contains:[]},y={begin:"html`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,v],subLanguage:"xml"}},b={begin:"css`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,v],subLanguage:"css"}},E={begin:"gql`",end:"",starts:{end:"`",returnEnd:!1,contains:[e.BACKSLASH_ESCAPE,v],subLanguage:"graphql"}},w={className:"string",begin:"`",end:"`",contains:[e.BACKSLASH_ESCAPE,v]},_={className:"comment",variants:[e.COMMENT(/\/\*\*(?!\/)/,"\\*/",{relevance:0,contains:[{begin:"(?=@[A-Za-z]+)",relevance:0,contains:[{className:"doctag",begin:"@[A-Za-z]+"},{className:"type",begin:"\\{",end:"\\}",excludeEnd:!0,excludeBegin:!0,relevance:0},{className:"variable",begin:c+"(?=\\s*(-)|$)",endsParent:!0,relevance:0},{begin:/(?=[^\n])\s/,relevance:0}]}]}),e.C_BLOCK_COMMENT_MODE,e.C_LINE_COMMENT_MODE]},T=[e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,b,E,w,{match:/\$\d+/},m]
v.contains=T.concat({begin:/\{/,end:/\}/,keywords:h,contains:["self"].concat(T)})
const A=[].concat(_,v.contains),D=A.concat([{begin:/\(/,end:/\)/,keywords:h,contains:["self"].concat(A)}]),k={className:"params",begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:h,contains:D},S={variants:[{match:[/class/,/\s+/,c,/\s+/,/extends/,/\s+/,l.concat(c,"(",l.concat(/\./,c),")*")],scope:{1:"keyword",3:"title.class",5:"keyword",7:"title.class.inherited"}},{match:[/class/,/\s+/,c],scope:{1:"keyword",3:"title.class"}}]},x={relevance:0,match:l.either(/\bJSON/,/\b[A-Z][a-z]+([A-Z][a-z]*|\d)*/,/\b[A-Z]{2,}([A-Z][a-z]+|\d)+([A-Z][a-z]*)*/,/\b[A-Z]{2,}[a-z]+([A-Z][a-z]+|\d)*([A-Z][a-z]*)*/),className:"title.class",keywords:{_:[...i,...a]}},C={variants:[{match:[/function/,/\s+/,c,/(?=\s*\()/]},{match:[/function/,/\s*(?=\()/]}],className:{1:"keyword",3:"title.function"},label:"func.def",contains:[k],illegal:/%/},L={match:l.concat(/\b/,(R=[...o,"super","import"],l.concat("(?!",R.join("|"),")")),c,l.lookahead(/\(/)),className:"title.function",relevance:0}
var R
const I={begin:l.concat(/\./,l.lookahead(l.concat(c,/(?![0-9A-Za-z$_(])/))),end:c,excludeBegin:!0,keywords:"prototype",className:"property",relevance:0},O={match:[/get|set/,/\s+/,c,/(?=\()/],className:{1:"keyword",3:"title.function"},contains:[{begin:/\(\)/},k]},F="(\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)|"+e.UNDERSCORE_IDENT_RE+")\\s*=>",P={match:[/const|var|let/,/\s+/,c,/\s*/,/=\s*/,/(async\s*)?/,l.lookahead(F)],keywords:"async",className:{1:"keyword",3:"title.function"},contains:[k]}
return{name:"JavaScript",aliases:["js","jsx","mjs","cjs"],keywords:h,exports:{PARAMS_CONTAINS:D,CLASS_REFERENCE:x},illegal:/#(?![$_A-z])/,contains:[e.SHEBANG({label:"shebang",binary:"node",relevance:5}),{label:"use_strict",className:"meta",relevance:10,begin:/^\s*['"]use (strict|asm)['"]/},e.APOS_STRING_MODE,e.QUOTE_STRING_MODE,y,b,E,w,_,{match:/\$\d+/},m,x,{className:"attr",begin:c+l.lookahead(":"),relevance:0},P,{begin:"("+e.RE_STARTERS_RE+"|\\b(case|return|throw)\\b)\\s*",keywords:"return throw case",relevance:0,contains:[_,e.REGEXP_MODE,{className:"function",begin:F,returnBegin:!0,end:"\\s*=>",contains:[{className:"params",variants:[{begin:e.UNDERSCORE_IDENT_RE,relevance:0},{className:null,begin:/\(\s*\)/,skip:!0},{begin:/\(/,end:/\)/,excludeBegin:!0,excludeEnd:!0,keywords:h,contains:D}]}]},{begin:/,/,relevance:0},{match:/\s+/,relevance:0},{variants:[{begin:"<>",end:"</>"},{match:/<[A-Za-z0-9\\._:-]+\s*\/>/},{begin:d.begin,"on:begin":d.isTrulyOpeningTag,end:d.end}],subLanguage:"xml",contains:[{begin:d.begin,end:d.end,skip:!0,contains:["self"]}]}]},C,{beginKeywords:"while if switch catch for"},{begin:"\\b(?!function)"+e.UNDERSCORE_IDENT_RE+"\\([^()]*(\\([^()]*(\\([^()]*\\)[^()]*)*\\)[^()]*)*\\)\\s*\\{",returnBegin:!0,label:"func.def",contains:[k,e.inherit(e.TITLE_MODE,{begin:c,className:"title.function"})]},{match:/\.\.\./,relevance:0},I,{match:"\\$"+c,relevance:0},{match:[/\bconstructor(?=\s*\()/],className:{1:"title.function"},contains:[k]},L,{relevance:0,match:/\b[A-Z][A-Z_0-9]+\b/,className:"variable.constant"},S,O,{match:/\$[(.]/}]}}e.exports=function(e){const i=l(e),a=t,o=["any","void","number","boolean","string","object","never","symbol","bigint","unknown"],c={beginKeywords:"namespace",end:/\{/,excludeEnd:!0,contains:[i.exports.CLASS_REFERENCE]},d={beginKeywords:"interface",end:/\{/,excludeEnd:!0,keywords:{keyword:"interface extends",built_in:o},contains:[i.exports.CLASS_REFERENCE]},h={$pattern:t,keyword:r.concat(["type","namespace","interface","public","private","protected","implements","declare","abstract","readonly","enum","override"]),literal:n,built_in:u.concat(o),"variable.language":s},f={className:"meta",begin:"@"+a},p=(e,t,r)=>{const n=e.contains.findIndex((e=>e.label===t))
if(-1===n)throw new Error("can not find mode to replace")
e.contains.splice(n,1,r)}
return Object.assign(i.keywords,h),i.exports.PARAMS_CONTAINS.push(f),i.contains=i.contains.concat([f,c,d]),p(i,"shebang",e.SHEBANG()),p(i,"use_strict",{className:"meta",relevance:10,begin:/^\s*['"]use strict['"]/}),i.contains.find((e=>"func.def"===e.label)).relevance=0,Object.assign(i,{name:"TypeScript",aliases:["ts","tsx","mts","cts"]}),i}},7181:e=>{e.exports=function(e){const t=e.regex,r=t.concat(/[\p{L}_]/u,t.optional(/[\p{L}0-9_.-]*:/u),/[\p{L}0-9_.-]*/u),n={className:"symbol",begin:/&[a-z]+;|&#[0-9]+;|&#x[a-f0-9]+;/},i={begin:/\s/,contains:[{className:"keyword",begin:/#?[a-z_][a-z1-9_-]+/,illegal:/\n/}]},a=e.inherit(i,{begin:/\(/,end:/\)/}),o=e.inherit(e.APOS_STRING_MODE,{className:"string"}),s=e.inherit(e.QUOTE_STRING_MODE,{className:"string"}),u={endsWithParent:!0,illegal:/</,relevance:0,contains:[{className:"attr",begin:/[\p{L}0-9._:-]+/u,relevance:0},{begin:/=\s*/,relevance:0,contains:[{className:"string",endsParent:!0,variants:[{begin:/"/,end:/"/,contains:[n]},{begin:/'/,end:/'/,contains:[n]},{begin:/[^\s"'=<>`]+/}]}]}]}
return{name:"HTML, XML",aliases:["html","xhtml","rss","atom","xjb","xsd","xsl","plist","wsf","svg"],case_insensitive:!0,unicodeRegex:!0,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,relevance:10,contains:[i,s,o,a,{begin:/\[/,end:/\]/,contains:[{className:"meta",begin:/<![a-z]/,end:/>/,contains:[i,a,s,o]}]}]},e.COMMENT(/<!--/,/-->/,{relevance:10}),{begin:/<!\[CDATA\[/,end:/\]\]>/,relevance:10},n,{className:"meta",end:/\?>/,variants:[{begin:/<\?xml/,relevance:10,contains:[s]},{begin:/<\?[a-z][a-z0-9]+/}]},{className:"tag",begin:/<style(?=\s|>)/,end:/>/,keywords:{name:"style"},contains:[u],starts:{end:/<\/style>/,returnEnd:!0,subLanguage:["css","xml"]}},{className:"tag",begin:/<script(?=\s|>)/,end:/>/,keywords:{name:"script"},contains:[u],starts:{end:/<\/script>/,returnEnd:!0,subLanguage:["javascript","handlebars","xml"]}},{className:"tag",begin:/<>|<\/>/},{className:"tag",begin:t.concat(/</,t.lookahead(t.concat(r,t.either(/\/>/,/>/,/\s/)))),end:/\/?>/,contains:[{className:"name",begin:r,relevance:0,starts:u}]},{className:"tag",begin:t.concat(/<\//,t.lookahead(t.concat(r,/>/))),contains:[{className:"name",begin:r,relevance:0},{begin:/>/,relevance:0,endsParent:!0}]}]}}},970:(e,t)=>{"use strict"
function r(e,t){for(var r=0;r<t.length;r++){var n=t[r]
n.enumerable=n.enumerable||!1,n.configurable=!0,"value"in n&&(n.writable=!0),Object.defineProperty(e,"symbol"==typeof(i=function(e,t){if("object"!=typeof e||null===e)return e
var r=e[Symbol.toPrimitive]
if(void 0!==r){var n=r.call(e,"string")
if("object"!=typeof n)return n
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(e)}(n.key))?i:String(i),n)}var i}function n(){return n=Object.assign?Object.assign.bind():function(e){for(var t=1;t<arguments.length;t++){var r=arguments[t]
for(var n in r)Object.prototype.hasOwnProperty.call(r,n)&&(e[n]=r[n])}return e},n.apply(this,arguments)}function i(e,t){(null==t||t>e.length)&&(t=e.length)
for(var r=0,n=new Array(t);r<t;r++)n[r]=e[r]
return n}function a(e,t){var r="undefined"!=typeof Symbol&&e[Symbol.iterator]||e["@@iterator"]
if(r)return(r=r.call(e)).next.bind(r)
if(Array.isArray(e)||(r=function(e,t){if(e){if("string"==typeof e)return i(e,t)
var r=Object.prototype.toString.call(e).slice(8,-1)
return"Object"===r&&e.constructor&&(r=e.constructor.name),"Map"===r||"Set"===r?Array.from(e):"Arguments"===r||/^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(r)?i(e,t):void 0}}(e))||t&&e&&"number"==typeof e.length){r&&(e=r)
var n=0
return function(){return n>=e.length?{done:!0}:{done:!1,value:e[n++]}}}throw new TypeError("Invalid attempt to iterate non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.")}function o(){return{async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}}t.defaults={async:!1,baseUrl:null,breaks:!1,extensions:null,gfm:!0,headerIds:!0,headerPrefix:"",highlight:null,hooks:null,langPrefix:"language-",mangle:!0,pedantic:!1,renderer:null,sanitize:!1,sanitizer:null,silent:!1,smartypants:!1,tokenizer:null,walkTokens:null,xhtml:!1}
var s=/[&<>"']/,u=new RegExp(s.source,"g"),l=/[<>"']|&(?!(#\d{1,7}|#[Xx][a-fA-F0-9]{1,6}|\w+);)/,c=new RegExp(l.source,"g"),d={"&":"&amp;","<":"&lt;",">":"&gt;",'"':"&quot;","'":"&#39;"},h=function(e){return d[e]}
function f(e,t){if(t){if(s.test(e))return e.replace(u,h)}else if(l.test(e))return e.replace(c,h)
return e}var p=/&(#(?:\d+)|(?:#x[0-9A-Fa-f]+)|(?:\w+));?/gi
function g(e){return e.replace(p,(function(e,t){return"colon"===(t=t.toLowerCase())?":":"#"===t.charAt(0)?"x"===t.charAt(1)?String.fromCharCode(parseInt(t.substring(2),16)):String.fromCharCode(+t.substring(1)):""}))}var m=/(^|[^\[])\^/g
function v(e,t){e="string"==typeof e?e:e.source,t=t||""
var r={replace:function(t,n){return n=(n=n.source||n).replace(m,"$1"),e=e.replace(t,n),r},getRegex:function(){return new RegExp(e,t)}}
return r}var y=/[^\w:]/g,b=/^$|^[a-z][a-z0-9+.-]*:|^[?#]/i
function E(e,t,r){if(e){var n
try{n=decodeURIComponent(g(r)).replace(y,"").toLowerCase()}catch(e){return null}if(0===n.indexOf("javascript:")||0===n.indexOf("vbscript:")||0===n.indexOf("data:"))return null}t&&!b.test(r)&&(r=function(e,t){w[" "+e]||(_.test(e)?w[" "+e]=e+"/":w[" "+e]=S(e,"/",!0))
var r=-1===(e=w[" "+e]).indexOf(":")
return"//"===t.substring(0,2)?r?t:e.replace(T,"$1")+t:"/"===t.charAt(0)?r?t:e.replace(A,"$1")+t:e+t}(t,r))
try{r=encodeURI(r).replace(/%25/g,"%")}catch(e){return null}return r}var w={},_=/^[^:]+:\/*[^/]*$/,T=/^([^:]+:)[\s\S]*$/,A=/^([^:]+:\/*[^/]*)[\s\S]*$/,D={exec:function(){}}
function k(e,t){var r=e.replace(/\|/g,(function(e,t,r){for(var n=!1,i=t;--i>=0&&"\\"===r[i];)n=!n
return n?"|":" |"})).split(/ \|/),n=0
if(r[0].trim()||r.shift(),r.length>0&&!r[r.length-1].trim()&&r.pop(),r.length>t)r.splice(t)
else for(;r.length<t;)r.push("")
for(;n<r.length;n++)r[n]=r[n].trim().replace(/\\\|/g,"|")
return r}function S(e,t,r){var n=e.length
if(0===n)return""
for(var i=0;i<n;){var a=e.charAt(n-i-1)
if(a!==t||r){if(a===t||!r)break
i++}else i++}return e.slice(0,n-i)}function x(e,t){if(t<1)return""
for(var r="";t>1;)1&t&&(r+=e),t>>=1,e+=e
return r+e}function C(e,t,r,n){var i=t.href,a=t.title?f(t.title):null,o=e[1].replace(/\\([\[\]])/g,"$1")
if("!"!==e[0].charAt(0)){n.state.inLink=!0
var s={type:"link",raw:r,href:i,title:a,text:o,tokens:n.inlineTokens(o)}
return n.state.inLink=!1,s}return{type:"image",raw:r,href:i,title:a,text:f(o)}}var L=function(){function e(e){this.options=e||t.defaults}var r=e.prototype
return r.space=function(e){var t=this.rules.block.newline.exec(e)
if(t&&t[0].length>0)return{type:"space",raw:t[0]}},r.code=function(e){var t=this.rules.block.code.exec(e)
if(t){var r=t[0].replace(/^ {1,4}/gm,"")
return{type:"code",raw:t[0],codeBlockStyle:"indented",text:this.options.pedantic?r:S(r,"\n")}}},r.fences=function(e){var t=this.rules.block.fences.exec(e)
if(t){var r=t[0],n=function(e,t){var r=e.match(/^(\s+)(?:```)/)
if(null===r)return t
var n=r[1]
return t.split("\n").map((function(e){var t=e.match(/^\s+/)
return null===t?e:t[0].length>=n.length?e.slice(n.length):e})).join("\n")}(r,t[3]||"")
return{type:"code",raw:r,lang:t[2]?t[2].trim().replace(this.rules.inline._escapes,"$1"):t[2],text:n}}},r.heading=function(e){var t=this.rules.block.heading.exec(e)
if(t){var r=t[2].trim()
if(/#$/.test(r)){var n=S(r,"#")
this.options.pedantic?r=n.trim():n&&!/ $/.test(n)||(r=n.trim())}return{type:"heading",raw:t[0],depth:t[1].length,text:r,tokens:this.lexer.inline(r)}}},r.hr=function(e){var t=this.rules.block.hr.exec(e)
if(t)return{type:"hr",raw:t[0]}},r.blockquote=function(e){var t=this.rules.block.blockquote.exec(e)
if(t){var r=t[0].replace(/^ *>[ \t]?/gm,""),n=this.lexer.state.top
this.lexer.state.top=!0
var i=this.lexer.blockTokens(r)
return this.lexer.state.top=n,{type:"blockquote",raw:t[0],tokens:i,text:r}}},r.list=function(e){var t=this.rules.block.list.exec(e)
if(t){var r,n,i,a,o,s,u,l,c,d,h,f,p=t[1].trim(),g=p.length>1,m={type:"list",raw:"",ordered:g,start:g?+p.slice(0,-1):"",loose:!1,items:[]}
p=g?"\\d{1,9}\\"+p.slice(-1):"\\"+p,this.options.pedantic&&(p=g?p:"[*+-]")
for(var v=new RegExp("^( {0,3}"+p+")((?:[\t ][^\\n]*)?(?:\\n|$))");e&&(f=!1,t=v.exec(e))&&!this.rules.block.hr.test(e);){if(r=t[0],e=e.substring(r.length),l=t[2].split("\n",1)[0].replace(/^\t+/,(function(e){return" ".repeat(3*e.length)})),c=e.split("\n",1)[0],this.options.pedantic?(a=2,h=l.trimLeft()):(a=(a=t[2].search(/[^ ]/))>4?1:a,h=l.slice(a),a+=t[1].length),s=!1,!l&&/^ *$/.test(c)&&(r+=c+"\n",e=e.substring(c.length+1),f=!0),!f)for(var y=new RegExp("^ {0,"+Math.min(3,a-1)+"}(?:[*+-]|\\d{1,9}[.)])((?:[ \t][^\\n]*)?(?:\\n|$))"),b=new RegExp("^ {0,"+Math.min(3,a-1)+"}((?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$)"),E=new RegExp("^ {0,"+Math.min(3,a-1)+"}(?:```|~~~)"),w=new RegExp("^ {0,"+Math.min(3,a-1)+"}#");e&&(c=d=e.split("\n",1)[0],this.options.pedantic&&(c=c.replace(/^ {1,4}(?=( {4})*[^ ])/g,"  ")),!E.test(c))&&!w.test(c)&&!y.test(c)&&!b.test(e);){if(c.search(/[^ ]/)>=a||!c.trim())h+="\n"+c.slice(a)
else{if(s)break
if(l.search(/[^ ]/)>=4)break
if(E.test(l))break
if(w.test(l))break
if(b.test(l))break
h+="\n"+c}s||c.trim()||(s=!0),r+=d+"\n",e=e.substring(d.length+1),l=c.slice(a)}m.loose||(u?m.loose=!0:/\n *\n *$/.test(r)&&(u=!0)),this.options.gfm&&(n=/^\[[ xX]\] /.exec(h))&&(i="[ ] "!==n[0],h=h.replace(/^\[[ xX]\] +/,"")),m.items.push({type:"list_item",raw:r,task:!!n,checked:i,loose:!1,text:h}),m.raw+=r}m.items[m.items.length-1].raw=r.trimRight(),m.items[m.items.length-1].text=h.trimRight(),m.raw=m.raw.trimRight()
var _=m.items.length
for(o=0;o<_;o++)if(this.lexer.state.top=!1,m.items[o].tokens=this.lexer.blockTokens(m.items[o].text,[]),!m.loose){var T=m.items[o].tokens.filter((function(e){return"space"===e.type})),A=T.length>0&&T.some((function(e){return/\n.*\n/.test(e.raw)}))
m.loose=A}if(m.loose)for(o=0;o<_;o++)m.items[o].loose=!0
return m}},r.html=function(e){var t=this.rules.block.html.exec(e)
if(t){var r={type:"html",raw:t[0],pre:!this.options.sanitizer&&("pre"===t[1]||"script"===t[1]||"style"===t[1]),text:t[0]}
if(this.options.sanitize){var n=this.options.sanitizer?this.options.sanitizer(t[0]):f(t[0])
r.type="paragraph",r.text=n,r.tokens=this.lexer.inline(n)}return r}},r.def=function(e){var t=this.rules.block.def.exec(e)
if(t){var r=t[1].toLowerCase().replace(/\s+/g," "),n=t[2]?t[2].replace(/^<(.*)>$/,"$1").replace(this.rules.inline._escapes,"$1"):"",i=t[3]?t[3].substring(1,t[3].length-1).replace(this.rules.inline._escapes,"$1"):t[3]
return{type:"def",tag:r,raw:t[0],href:n,title:i}}},r.table=function(e){var t=this.rules.block.table.exec(e)
if(t){var r={type:"table",header:k(t[1]).map((function(e){return{text:e}})),align:t[2].replace(/^ *|\| *$/g,"").split(/ *\| */),rows:t[3]&&t[3].trim()?t[3].replace(/\n[ \t]*$/,"").split("\n"):[]}
if(r.header.length===r.align.length){r.raw=t[0]
var n,i,a,o,s=r.align.length
for(n=0;n<s;n++)/^ *-+: *$/.test(r.align[n])?r.align[n]="right":/^ *:-+: *$/.test(r.align[n])?r.align[n]="center":/^ *:-+ *$/.test(r.align[n])?r.align[n]="left":r.align[n]=null
for(s=r.rows.length,n=0;n<s;n++)r.rows[n]=k(r.rows[n],r.header.length).map((function(e){return{text:e}}))
for(s=r.header.length,i=0;i<s;i++)r.header[i].tokens=this.lexer.inline(r.header[i].text)
for(s=r.rows.length,i=0;i<s;i++)for(o=r.rows[i],a=0;a<o.length;a++)o[a].tokens=this.lexer.inline(o[a].text)
return r}}},r.lheading=function(e){var t=this.rules.block.lheading.exec(e)
if(t)return{type:"heading",raw:t[0],depth:"="===t[2].charAt(0)?1:2,text:t[1],tokens:this.lexer.inline(t[1])}},r.paragraph=function(e){var t=this.rules.block.paragraph.exec(e)
if(t){var r="\n"===t[1].charAt(t[1].length-1)?t[1].slice(0,-1):t[1]
return{type:"paragraph",raw:t[0],text:r,tokens:this.lexer.inline(r)}}},r.text=function(e){var t=this.rules.block.text.exec(e)
if(t)return{type:"text",raw:t[0],text:t[0],tokens:this.lexer.inline(t[0])}},r.escape=function(e){var t=this.rules.inline.escape.exec(e)
if(t)return{type:"escape",raw:t[0],text:f(t[1])}},r.tag=function(e){var t=this.rules.inline.tag.exec(e)
if(t)return!this.lexer.state.inLink&&/^<a /i.test(t[0])?this.lexer.state.inLink=!0:this.lexer.state.inLink&&/^<\/a>/i.test(t[0])&&(this.lexer.state.inLink=!1),!this.lexer.state.inRawBlock&&/^<(pre|code|kbd|script)(\s|>)/i.test(t[0])?this.lexer.state.inRawBlock=!0:this.lexer.state.inRawBlock&&/^<\/(pre|code|kbd|script)(\s|>)/i.test(t[0])&&(this.lexer.state.inRawBlock=!1),{type:this.options.sanitize?"text":"html",raw:t[0],inLink:this.lexer.state.inLink,inRawBlock:this.lexer.state.inRawBlock,text:this.options.sanitize?this.options.sanitizer?this.options.sanitizer(t[0]):f(t[0]):t[0]}},r.link=function(e){var t=this.rules.inline.link.exec(e)
if(t){var r=t[2].trim()
if(!this.options.pedantic&&/^</.test(r)){if(!/>$/.test(r))return
var n=S(r.slice(0,-1),"\\")
if((r.length-n.length)%2==0)return}else{var i=function(e,t){if(-1===e.indexOf(t[1]))return-1
for(var r=e.length,n=0,i=0;i<r;i++)if("\\"===e[i])i++
else if(e[i]===t[0])n++
else if(e[i]===t[1]&&--n<0)return i
return-1}(t[2],"()")
if(i>-1){var a=(0===t[0].indexOf("!")?5:4)+t[1].length+i
t[2]=t[2].substring(0,i),t[0]=t[0].substring(0,a).trim(),t[3]=""}}var o=t[2],s=""
if(this.options.pedantic){var u=/^([^'"]*[^\s])\s+(['"])(.*)\2/.exec(o)
u&&(o=u[1],s=u[3])}else s=t[3]?t[3].slice(1,-1):""
return o=o.trim(),/^</.test(o)&&(o=this.options.pedantic&&!/>$/.test(r)?o.slice(1):o.slice(1,-1)),C(t,{href:o?o.replace(this.rules.inline._escapes,"$1"):o,title:s?s.replace(this.rules.inline._escapes,"$1"):s},t[0],this.lexer)}},r.reflink=function(e,t){var r
if((r=this.rules.inline.reflink.exec(e))||(r=this.rules.inline.nolink.exec(e))){var n=(r[2]||r[1]).replace(/\s+/g," ")
if(!(n=t[n.toLowerCase()])){var i=r[0].charAt(0)
return{type:"text",raw:i,text:i}}return C(r,n,r[0],this.lexer)}},r.emStrong=function(e,t,r){void 0===r&&(r="")
var n=this.rules.inline.emStrong.lDelim.exec(e)
if(n&&(!n[3]||!r.match(/(?:[0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u0870-\u0887\u0889-\u088E\u08A0-\u08C9\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C5D\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u1711\u171F-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4C\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7CA\uA7D0\uA7D1\uA7D3\uA7D5-\uA7D9\uA7F2-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDD70-\uDD7A\uDD7C-\uDD8A\uDD8C-\uDD92\uDD94\uDD95\uDD97-\uDDA1\uDDA3-\uDDB1\uDDB3-\uDDB9\uDDBB\uDDBC\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67\uDF80-\uDF85\uDF87-\uDFB0\uDFB2-\uDFBA]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDF70-\uDF81\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC71\uDC72\uDC75\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B\uDF40-\uDF46]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEB0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|\uD80B[\uDF90-\uDFF0]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDE70-\uDEBE\uDEC0-\uDEC9\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82B[\uDFF0-\uDFF3\uDFF5-\uDFFB\uDFFD\uDFFE]|\uD82C[\uDC00-\uDD22\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD837[\uDF00-\uDF1E]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDE90-\uDEAD\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD839[\uDFE0-\uDFE6\uDFE8-\uDFEB\uDFED\uDFEE\uDFF0-\uDFFE]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDF\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF38\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])/))){var i=n[1]||n[2]||""
if(!i||i&&(""===r||this.rules.inline.punctuation.exec(r))){var a,o,s=n[0].length-1,u=s,l=0,c="*"===n[0][0]?this.rules.inline.emStrong.rDelimAst:this.rules.inline.emStrong.rDelimUnd
for(c.lastIndex=0,t=t.slice(-1*e.length+s);null!=(n=c.exec(t));)if(a=n[1]||n[2]||n[3]||n[4]||n[5]||n[6])if(o=a.length,n[3]||n[4])u+=o
else if(!((n[5]||n[6])&&s%3)||(s+o)%3){if(!((u-=o)>0)){o=Math.min(o,o+u+l)
var d=e.slice(0,s+n.index+(n[0].length-a.length)+o)
if(Math.min(s,o)%2){var h=d.slice(1,-1)
return{type:"em",raw:d,text:h,tokens:this.lexer.inlineTokens(h)}}var f=d.slice(2,-2)
return{type:"strong",raw:d,text:f,tokens:this.lexer.inlineTokens(f)}}}else l+=o}}},r.codespan=function(e){var t=this.rules.inline.code.exec(e)
if(t){var r=t[2].replace(/\n/g," "),n=/[^ ]/.test(r),i=/^ /.test(r)&&/ $/.test(r)
return n&&i&&(r=r.substring(1,r.length-1)),r=f(r,!0),{type:"codespan",raw:t[0],text:r}}},r.br=function(e){var t=this.rules.inline.br.exec(e)
if(t)return{type:"br",raw:t[0]}},r.del=function(e){var t=this.rules.inline.del.exec(e)
if(t)return{type:"del",raw:t[0],text:t[2],tokens:this.lexer.inlineTokens(t[2])}},r.autolink=function(e,t){var r,n,i=this.rules.inline.autolink.exec(e)
if(i)return n="@"===i[2]?"mailto:"+(r=f(this.options.mangle?t(i[1]):i[1])):r=f(i[1]),{type:"link",raw:i[0],text:r,href:n,tokens:[{type:"text",raw:r,text:r}]}},r.url=function(e,t){var r
if(r=this.rules.inline.url.exec(e)){var n,i
if("@"===r[2])i="mailto:"+(n=f(this.options.mangle?t(r[0]):r[0]))
else{var a
do{a=r[0],r[0]=this.rules.inline._backpedal.exec(r[0])[0]}while(a!==r[0])
n=f(r[0]),i="www."===r[1]?"http://"+r[0]:r[0]}return{type:"link",raw:r[0],text:n,href:i,tokens:[{type:"text",raw:n,text:n}]}}},r.inlineText=function(e,t){var r,n=this.rules.inline.text.exec(e)
if(n)return r=this.lexer.state.inRawBlock?this.options.sanitize?this.options.sanitizer?this.options.sanitizer(n[0]):f(n[0]):n[0]:f(this.options.smartypants?t(n[0]):n[0]),{type:"text",raw:n[0],text:r}},e}(),R={newline:/^(?: *(?:\n|$))+/,code:/^( {4}[^\n]+(?:\n(?: *(?:\n|$))*)?)+/,fences:/^ {0,3}(`{3,}(?=[^`\n]*(?:\n|$))|~{3,})([^\n]*)(?:\n|$)(?:|([\s\S]*?)(?:\n|$))(?: {0,3}\1[~`]* *(?=\n|$)|$)/,hr:/^ {0,3}((?:-[\t ]*){3,}|(?:_[ \t]*){3,}|(?:\*[ \t]*){3,})(?:\n+|$)/,heading:/^ {0,3}(#{1,6})(?=\s|$)(.*)(?:\n+|$)/,blockquote:/^( {0,3}> ?(paragraph|[^\n]*)(?:\n|$))+/,list:/^( {0,3}bull)([ \t][^\n]+?)?(?:\n|$)/,html:"^ {0,3}(?:<(script|pre|style|textarea)[\\s>][\\s\\S]*?(?:</\\1>[^\\n]*\\n+|$)|comment[^\\n]*(\\n+|$)|<\\?[\\s\\S]*?(?:\\?>\\n*|$)|<![A-Z][\\s\\S]*?(?:>\\n*|$)|<!\\[CDATA\\[[\\s\\S]*?(?:\\]\\]>\\n*|$)|</?(tag)(?: +|\\n|/?>)[\\s\\S]*?(?:(?:\\n *)+\\n|$)|<(?!script|pre|style|textarea)([a-z][\\w-]*)(?:attribute)*? */?>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$)|</(?!script|pre|style|textarea)[a-z][\\w-]*\\s*>(?=[ \\t]*(?:\\n|$))[\\s\\S]*?(?:(?:\\n *)+\\n|$))",def:/^ {0,3}\[(label)\]: *(?:\n *)?([^<\s][^\s]*|<.*?>)(?:(?: +(?:\n *)?| *\n *)(title))? *(?:\n+|$)/,table:D,lheading:/^((?:.|\n(?!\n))+?)\n {0,3}(=+|-+) *(?:\n+|$)/,_paragraph:/^([^\n]+(?:\n(?!hr|heading|lheading|blockquote|fences|list|html|table| +\n)[^\n]+)*)/,text:/^[^\n]+/,_label:/(?!\s*\])(?:\\.|[^\[\]\\])+/,_title:/(?:"(?:\\"?|[^"\\])*"|'[^'\n]*(?:\n[^'\n]+)*\n?'|\([^()]*\))/}
R.def=v(R.def).replace("label",R._label).replace("title",R._title).getRegex(),R.bullet=/(?:[*+-]|\d{1,9}[.)])/,R.listItemStart=v(/^( *)(bull) */).replace("bull",R.bullet).getRegex(),R.list=v(R.list).replace(/bull/g,R.bullet).replace("hr","\\n+(?=\\1?(?:(?:- *){3,}|(?:_ *){3,}|(?:\\* *){3,})(?:\\n+|$))").replace("def","\\n+(?="+R.def.source+")").getRegex(),R._tag="address|article|aside|base|basefont|blockquote|body|caption|center|col|colgroup|dd|details|dialog|dir|div|dl|dt|fieldset|figcaption|figure|footer|form|frame|frameset|h[1-6]|head|header|hr|html|iframe|legend|li|link|main|menu|menuitem|meta|nav|noframes|ol|optgroup|option|p|param|section|source|summary|table|tbody|td|tfoot|th|thead|title|tr|track|ul",R._comment=/<!--(?!-?>)[\s\S]*?(?:-->|$)/,R.html=v(R.html,"i").replace("comment",R._comment).replace("tag",R._tag).replace("attribute",/ +[a-zA-Z:_][\w.:-]*(?: *= *"[^"\n]*"| *= *'[^'\n]*'| *= *[^\s"'=<>`]+)?/).getRegex(),R.paragraph=v(R._paragraph).replace("hr",R.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("|table","").replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",R._tag).getRegex(),R.blockquote=v(R.blockquote).replace("paragraph",R.paragraph).getRegex(),R.normal=n({},R),R.gfm=n({},R.normal,{table:"^ *([^\\n ].*\\|.*)\\n {0,3}(?:\\| *)?(:?-+:? *(?:\\| *:?-+:? *)*)(?:\\| *)?(?:\\n((?:(?! *\\n|hr|heading|blockquote|code|fences|list|html).*(?:\\n|$))*)\\n*|$)"}),R.gfm.table=v(R.gfm.table).replace("hr",R.hr).replace("heading"," {0,3}#{1,6} ").replace("blockquote"," {0,3}>").replace("code"," {4}[^\\n]").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",R._tag).getRegex(),R.gfm.paragraph=v(R._paragraph).replace("hr",R.hr).replace("heading"," {0,3}#{1,6} ").replace("|lheading","").replace("table",R.gfm.table).replace("blockquote"," {0,3}>").replace("fences"," {0,3}(?:`{3,}(?=[^`\\n]*\\n)|~{3,})[^\\n]*\\n").replace("list"," {0,3}(?:[*+-]|1[.)]) ").replace("html","</?(?:tag)(?: +|\\n|/?>)|<(?:script|pre|style|textarea|!--)").replace("tag",R._tag).getRegex(),R.pedantic=n({},R.normal,{html:v("^ *(?:comment *(?:\\n|\\s*$)|<(tag)[\\s\\S]+?</\\1> *(?:\\n{2,}|\\s*$)|<tag(?:\"[^\"]*\"|'[^']*'|\\s[^'\"/>\\s]*)*?/?> *(?:\\n{2,}|\\s*$))").replace("comment",R._comment).replace(/tag/g,"(?!(?:a|em|strong|small|s|cite|q|dfn|abbr|data|time|code|var|samp|kbd|sub|sup|i|b|u|mark|ruby|rt|rp|bdi|bdo|span|br|wbr|ins|del|img)\\b)\\w+(?!:|[^\\w\\s@]*@)\\b").getRegex(),def:/^ *\[([^\]]+)\]: *<?([^\s>]+)>?(?: +(["(][^\n]+[")]))? *(?:\n+|$)/,heading:/^(#{1,6})(.*)(?:\n+|$)/,fences:D,lheading:/^(.+?)\n {0,3}(=+|-+) *(?:\n+|$)/,paragraph:v(R.normal._paragraph).replace("hr",R.hr).replace("heading"," *#{1,6} *[^\n]").replace("lheading",R.lheading).replace("blockquote"," {0,3}>").replace("|fences","").replace("|list","").replace("|html","").getRegex()})
var I={escape:/^\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/,autolink:/^<(scheme:[^\s\x00-\x1f<>]*|email)>/,url:D,tag:"^comment|^</[a-zA-Z][\\w:-]*\\s*>|^<[a-zA-Z][\\w-]*(?:attribute)*?\\s*/?>|^<\\?[\\s\\S]*?\\?>|^<![a-zA-Z]+\\s[\\s\\S]*?>|^<!\\[CDATA\\[[\\s\\S]*?\\]\\]>",link:/^!?\[(label)\]\(\s*(href)(?:\s+(title))?\s*\)/,reflink:/^!?\[(label)\]\[(ref)\]/,nolink:/^!?\[(ref)\](?:\[\])?/,reflinkSearch:"reflink|nolink(?!\\()",emStrong:{lDelim:/^(?:\*+(?:([punct_])|[^\s*]))|^_+(?:([punct*])|([^\s_]))/,rDelimAst:/^(?:[^_*\\]|\\.)*?\_\_(?:[^_*\\]|\\.)*?\*(?:[^_*\\]|\\.)*?(?=\_\_)|(?:[^*\\]|\\.)+(?=[^*])|[punct_](\*+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\*+)(?=[punct_\s]|$)|[punct_\s](\*+)(?=[^punct*_\s])|[\s](\*+)(?=[punct_])|[punct_](\*+)(?=[punct_])|(?:[^punct*_\s\\]|\\.)(\*+)(?=[^punct*_\s])/,rDelimUnd:/^(?:[^_*\\]|\\.)*?\*\*(?:[^_*\\]|\\.)*?\_(?:[^_*\\]|\\.)*?(?=\*\*)|(?:[^_\\]|\\.)+(?=[^_])|[punct*](\_+)(?=[\s]|$)|(?:[^punct*_\s\\]|\\.)(\_+)(?=[punct*\s]|$)|[punct*\s](\_+)(?=[^punct*_\s])|[\s](\_+)(?=[punct*])|[punct*](\_+)(?=[punct*])/},code:/^(`+)([^`]|[^`][\s\S]*?[^`])\1(?!`)/,br:/^( {2,}|\\)\n(?!\s*$)/,del:D,text:/^(`+|[^`])(?:(?= {2,}\n)|[\s\S]*?(?:(?=[\\<!\[`*_]|\b_|$)|[^ ](?= {2,}\n)))/,punctuation:/^([\spunctuation])/}
function O(e){return e.replace(/---/g,"—").replace(/--/g,"–").replace(/(^|[-\u2014/(\[{"\s])'/g,"$1‘").replace(/'/g,"’").replace(/(^|[-\u2014/(\[{\u2018\s])"/g,"$1“").replace(/"/g,"”").replace(/\.{3}/g,"…")}function F(e){var t,r,n="",i=e.length
for(t=0;t<i;t++)r=e.charCodeAt(t),Math.random()>.5&&(r="x"+r.toString(16)),n+="&#"+r+";"
return n}I._punctuation="!\"#$%&'()+\\-.,/:;<=>?@\\[\\]`^{|}~",I.punctuation=v(I.punctuation).replace(/punctuation/g,I._punctuation).getRegex(),I.blockSkip=/\[[^\]]*?\]\([^\)]*?\)|`[^`]*?`|<[^>]*?>/g,I.escapedEmSt=/(?:^|[^\\])(?:\\\\)*\\[*_]/g,I._comment=v(R._comment).replace("(?:--\x3e|$)","--\x3e").getRegex(),I.emStrong.lDelim=v(I.emStrong.lDelim).replace(/punct/g,I._punctuation).getRegex(),I.emStrong.rDelimAst=v(I.emStrong.rDelimAst,"g").replace(/punct/g,I._punctuation).getRegex(),I.emStrong.rDelimUnd=v(I.emStrong.rDelimUnd,"g").replace(/punct/g,I._punctuation).getRegex(),I._escapes=/\\([!"#$%&'()*+,\-./:;<=>?@\[\]\\^_`{|}~])/g,I._scheme=/[a-zA-Z][a-zA-Z0-9+.-]{1,31}/,I._email=/[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+(@)[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)+(?![-_])/,I.autolink=v(I.autolink).replace("scheme",I._scheme).replace("email",I._email).getRegex(),I._attribute=/\s+[a-zA-Z:_][\w.:-]*(?:\s*=\s*"[^"]*"|\s*=\s*'[^']*'|\s*=\s*[^\s"'=<>`]+)?/,I.tag=v(I.tag).replace("comment",I._comment).replace("attribute",I._attribute).getRegex(),I._label=/(?:\[(?:\\.|[^\[\]\\])*\]|\\.|`[^`]*`|[^\[\]\\`])*?/,I._href=/<(?:\\.|[^\n<>\\])+>|[^\s\x00-\x1f]*/,I._title=/"(?:\\"?|[^"\\])*"|'(?:\\'?|[^'\\])*'|\((?:\\\)?|[^)\\])*\)/,I.link=v(I.link).replace("label",I._label).replace("href",I._href).replace("title",I._title).getRegex(),I.reflink=v(I.reflink).replace("label",I._label).replace("ref",R._label).getRegex(),I.nolink=v(I.nolink).replace("ref",R._label).getRegex(),I.reflinkSearch=v(I.reflinkSearch,"g").replace("reflink",I.reflink).replace("nolink",I.nolink).getRegex(),I.normal=n({},I),I.pedantic=n({},I.normal,{strong:{start:/^__|\*\*/,middle:/^__(?=\S)([\s\S]*?\S)__(?!_)|^\*\*(?=\S)([\s\S]*?\S)\*\*(?!\*)/,endAst:/\*\*(?!\*)/g,endUnd:/__(?!_)/g},em:{start:/^_|\*/,middle:/^()\*(?=\S)([\s\S]*?\S)\*(?!\*)|^_(?=\S)([\s\S]*?\S)_(?!_)/,endAst:/\*(?!\*)/g,endUnd:/_(?!_)/g},link:v(/^!?\[(label)\]\((.*?)\)/).replace("label",I._label).getRegex(),reflink:v(/^!?\[(label)\]\s*\[([^\]]*)\]/).replace("label",I._label).getRegex()}),I.gfm=n({},I.normal,{escape:v(I.escape).replace("])","~|])").getRegex(),_extended_email:/[A-Za-z0-9._+-]+(@)[a-zA-Z0-9-_]+(?:\.[a-zA-Z0-9-_]*[a-zA-Z0-9])+(?![-_])/,url:/^((?:ftp|https?):\/\/|www\.)(?:[a-zA-Z0-9\-]+\.?)+[^\s<]*|^email/,_backpedal:/(?:[^?!.,:;*_'"~()&]+|\([^)]*\)|&(?![a-zA-Z0-9]+;$)|[?!.,:;*_'"~)]+(?!$))+/,del:/^(~~?)(?=[^\s~])([\s\S]*?[^\s~])\1(?=[^~]|$)/,text:/^([`~]+|[^`~])(?:(?= {2,}\n)|(?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)|[\s\S]*?(?:(?=[\\<!\[`*~_]|\b_|https?:\/\/|ftp:\/\/|www\.|$)|[^ ](?= {2,}\n)|[^a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-](?=[a-zA-Z0-9.!#$%&'*+\/=?_`{\|}~-]+@)))/}),I.gfm.url=v(I.gfm.url,"i").replace("email",I.gfm._extended_email).getRegex(),I.breaks=n({},I.gfm,{br:v(I.br).replace("{2,}","*").getRegex(),text:v(I.gfm.text).replace("\\b_","\\b_| {2,}\\n").replace(/\{2,\}/g,"*").getRegex()})
var P=function(){function e(e){this.tokens=[],this.tokens.links=Object.create(null),this.options=e||t.defaults,this.options.tokenizer=this.options.tokenizer||new L,this.tokenizer=this.options.tokenizer,this.tokenizer.options=this.options,this.tokenizer.lexer=this,this.inlineQueue=[],this.state={inLink:!1,inRawBlock:!1,top:!0}
var r={block:R.normal,inline:I.normal}
this.options.pedantic?(r.block=R.pedantic,r.inline=I.pedantic):this.options.gfm&&(r.block=R.gfm,this.options.breaks?r.inline=I.breaks:r.inline=I.gfm),this.tokenizer.rules=r}e.lex=function(t,r){return new e(r).lex(t)},e.lexInline=function(t,r){return new e(r).inlineTokens(t)}
var n,i,a=e.prototype
return a.lex=function(e){var t
for(e=e.replace(/\r\n|\r/g,"\n"),this.blockTokens(e,this.tokens);t=this.inlineQueue.shift();)this.inlineTokens(t.src,t.tokens)
return this.tokens},a.blockTokens=function(e,t){var r,n,i,a,o=this
for(void 0===t&&(t=[]),e=this.options.pedantic?e.replace(/\t/g,"    ").replace(/^ +$/gm,""):e.replace(/^( *)(\t+)/gm,(function(e,t,r){return t+"    ".repeat(r.length)}));e;)if(!(this.options.extensions&&this.options.extensions.block&&this.options.extensions.block.some((function(n){return!!(r=n.call({lexer:o},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)}))))if(r=this.tokenizer.space(e))e=e.substring(r.raw.length),1===r.raw.length&&t.length>0?t[t.length-1].raw+="\n":t.push(r)
else if(r=this.tokenizer.code(e))e=e.substring(r.raw.length),!(n=t[t.length-1])||"paragraph"!==n.type&&"text"!==n.type?t.push(r):(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue[this.inlineQueue.length-1].src=n.text)
else if(r=this.tokenizer.fences(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.heading(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.hr(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.blockquote(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.list(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.html(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.def(e))e=e.substring(r.raw.length),!(n=t[t.length-1])||"paragraph"!==n.type&&"text"!==n.type?this.tokens.links[r.tag]||(this.tokens.links[r.tag]={href:r.href,title:r.title}):(n.raw+="\n"+r.raw,n.text+="\n"+r.raw,this.inlineQueue[this.inlineQueue.length-1].src=n.text)
else if(r=this.tokenizer.table(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.lheading(e))e=e.substring(r.raw.length),t.push(r)
else if(i=e,this.options.extensions&&this.options.extensions.startBlock&&function(){var t=1/0,r=e.slice(1),n=void 0
o.options.extensions.startBlock.forEach((function(e){"number"==typeof(n=e.call({lexer:this},r))&&n>=0&&(t=Math.min(t,n))})),t<1/0&&t>=0&&(i=e.substring(0,t+1))}(),this.state.top&&(r=this.tokenizer.paragraph(i)))n=t[t.length-1],a&&"paragraph"===n.type?(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(r),a=i.length!==e.length,e=e.substring(r.raw.length)
else if(r=this.tokenizer.text(e))e=e.substring(r.raw.length),(n=t[t.length-1])&&"text"===n.type?(n.raw+="\n"+r.raw,n.text+="\n"+r.text,this.inlineQueue.pop(),this.inlineQueue[this.inlineQueue.length-1].src=n.text):t.push(r)
else if(e){var s="Infinite loop on byte: "+e.charCodeAt(0)
if(this.options.silent){console.error(s)
break}throw new Error(s)}return this.state.top=!0,t},a.inline=function(e,t){return void 0===t&&(t=[]),this.inlineQueue.push({src:e,tokens:t}),t},a.inlineTokens=function(e,t){var r,n,i,a=this
void 0===t&&(t=[])
var o,s,u,l=e
if(this.tokens.links){var c=Object.keys(this.tokens.links)
if(c.length>0)for(;null!=(o=this.tokenizer.rules.inline.reflinkSearch.exec(l));)c.includes(o[0].slice(o[0].lastIndexOf("[")+1,-1))&&(l=l.slice(0,o.index)+"["+x("a",o[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.reflinkSearch.lastIndex))}for(;null!=(o=this.tokenizer.rules.inline.blockSkip.exec(l));)l=l.slice(0,o.index)+"["+x("a",o[0].length-2)+"]"+l.slice(this.tokenizer.rules.inline.blockSkip.lastIndex)
for(;null!=(o=this.tokenizer.rules.inline.escapedEmSt.exec(l));)l=l.slice(0,o.index+o[0].length-2)+"++"+l.slice(this.tokenizer.rules.inline.escapedEmSt.lastIndex),this.tokenizer.rules.inline.escapedEmSt.lastIndex--
for(;e;)if(s||(u=""),s=!1,!(this.options.extensions&&this.options.extensions.inline&&this.options.extensions.inline.some((function(n){return!!(r=n.call({lexer:a},e,t))&&(e=e.substring(r.raw.length),t.push(r),!0)}))))if(r=this.tokenizer.escape(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.tag(e))e=e.substring(r.raw.length),(n=t[t.length-1])&&"text"===r.type&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r)
else if(r=this.tokenizer.link(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.reflink(e,this.tokens.links))e=e.substring(r.raw.length),(n=t[t.length-1])&&"text"===r.type&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r)
else if(r=this.tokenizer.emStrong(e,l,u))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.codespan(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.br(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.del(e))e=e.substring(r.raw.length),t.push(r)
else if(r=this.tokenizer.autolink(e,F))e=e.substring(r.raw.length),t.push(r)
else if(this.state.inLink||!(r=this.tokenizer.url(e,F))){if(i=e,this.options.extensions&&this.options.extensions.startInline&&function(){var t=1/0,r=e.slice(1),n=void 0
a.options.extensions.startInline.forEach((function(e){"number"==typeof(n=e.call({lexer:this},r))&&n>=0&&(t=Math.min(t,n))})),t<1/0&&t>=0&&(i=e.substring(0,t+1))}(),r=this.tokenizer.inlineText(i,O))e=e.substring(r.raw.length),"_"!==r.raw.slice(-1)&&(u=r.raw.slice(-1)),s=!0,(n=t[t.length-1])&&"text"===n.type?(n.raw+=r.raw,n.text+=r.text):t.push(r)
else if(e){var d="Infinite loop on byte: "+e.charCodeAt(0)
if(this.options.silent){console.error(d)
break}throw new Error(d)}}else e=e.substring(r.raw.length),t.push(r)
return t},n=e,(i=[{key:"rules",get:function(){return{block:R,inline:I}}}])&&r(n,i),Object.defineProperty(n,"prototype",{writable:!1}),e}(),N=function(){function e(e){this.options=e||t.defaults}var r=e.prototype
return r.code=function(e,t,r){var n=(t||"").match(/\S*/)[0]
if(this.options.highlight){var i=this.options.highlight(e,n)
null!=i&&i!==e&&(r=!0,e=i)}return e=e.replace(/\n$/,"")+"\n",n?'<pre><code class="'+this.options.langPrefix+f(n)+'">'+(r?e:f(e,!0))+"</code></pre>\n":"<pre><code>"+(r?e:f(e,!0))+"</code></pre>\n"},r.blockquote=function(e){return"<blockquote>\n"+e+"</blockquote>\n"},r.html=function(e){return e},r.heading=function(e,t,r,n){return this.options.headerIds?"<h"+t+' id="'+(this.options.headerPrefix+n.slug(r))+'">'+e+"</h"+t+">\n":"<h"+t+">"+e+"</h"+t+">\n"},r.hr=function(){return this.options.xhtml?"<hr/>\n":"<hr>\n"},r.list=function(e,t,r){var n=t?"ol":"ul"
return"<"+n+(t&&1!==r?' start="'+r+'"':"")+">\n"+e+"</"+n+">\n"},r.listitem=function(e){return"<li>"+e+"</li>\n"},r.checkbox=function(e){return"<input "+(e?'checked="" ':"")+'disabled="" type="checkbox"'+(this.options.xhtml?" /":"")+"> "},r.paragraph=function(e){return"<p>"+e+"</p>\n"},r.table=function(e,t){return t&&(t="<tbody>"+t+"</tbody>"),"<table>\n<thead>\n"+e+"</thead>\n"+t+"</table>\n"},r.tablerow=function(e){return"<tr>\n"+e+"</tr>\n"},r.tablecell=function(e,t){var r=t.header?"th":"td"
return(t.align?"<"+r+' align="'+t.align+'">':"<"+r+">")+e+"</"+r+">\n"},r.strong=function(e){return"<strong>"+e+"</strong>"},r.em=function(e){return"<em>"+e+"</em>"},r.codespan=function(e){return"<code>"+e+"</code>"},r.br=function(){return this.options.xhtml?"<br/>":"<br>"},r.del=function(e){return"<del>"+e+"</del>"},r.link=function(e,t,r){if(null===(e=E(this.options.sanitize,this.options.baseUrl,e)))return r
var n='<a href="'+e+'"'
return t&&(n+=' title="'+t+'"'),n+">"+r+"</a>"},r.image=function(e,t,r){if(null===(e=E(this.options.sanitize,this.options.baseUrl,e)))return r
var n='<img src="'+e+'" alt="'+r+'"'
return t&&(n+=' title="'+t+'"'),n+(this.options.xhtml?"/>":">")},r.text=function(e){return e},e}(),M=function(){function e(){}var t=e.prototype
return t.strong=function(e){return e},t.em=function(e){return e},t.codespan=function(e){return e},t.del=function(e){return e},t.html=function(e){return e},t.text=function(e){return e},t.link=function(e,t,r){return""+r},t.image=function(e,t,r){return""+r},t.br=function(){return""},e}(),B=function(){function e(){this.seen={}}var t=e.prototype
return t.serialize=function(e){return e.toLowerCase().trim().replace(/<[!\/a-z].*?>/gi,"").replace(/[\u2000-\u206F\u2E00-\u2E7F\\'!"#$%&()*+,./:;<=>?@[\]^`{|}~]/g,"").replace(/\s/g,"-")},t.getNextSafeSlug=function(e,t){var r=e,n=0
if(this.seen.hasOwnProperty(r)){n=this.seen[e]
do{r=e+"-"+ ++n}while(this.seen.hasOwnProperty(r))}return t||(this.seen[e]=n,this.seen[r]=0),r},t.slug=function(e,t){void 0===t&&(t={})
var r=this.serialize(e)
return this.getNextSafeSlug(r,t.dryrun)},e}(),U=function(){function e(e){this.options=e||t.defaults,this.options.renderer=this.options.renderer||new N,this.renderer=this.options.renderer,this.renderer.options=this.options,this.textRenderer=new M,this.slugger=new B}e.parse=function(t,r){return new e(r).parse(t)},e.parseInline=function(t,r){return new e(r).parseInline(t)}
var r=e.prototype
return r.parse=function(e,t){void 0===t&&(t=!0)
var r,n,i,a,o,s,u,l,c,d,h,f,p,m,v,y,b,E,w,_="",T=e.length
for(r=0;r<T;r++)if(d=e[r],!(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[d.type])||!1===(w=this.options.extensions.renderers[d.type].call({parser:this},d))&&["space","hr","heading","code","table","blockquote","list","html","paragraph","text"].includes(d.type))switch(d.type){case"space":continue
case"hr":_+=this.renderer.hr()
continue
case"heading":_+=this.renderer.heading(this.parseInline(d.tokens),d.depth,g(this.parseInline(d.tokens,this.textRenderer)),this.slugger)
continue
case"code":_+=this.renderer.code(d.text,d.lang,d.escaped)
continue
case"table":for(l="",u="",a=d.header.length,n=0;n<a;n++)u+=this.renderer.tablecell(this.parseInline(d.header[n].tokens),{header:!0,align:d.align[n]})
for(l+=this.renderer.tablerow(u),c="",a=d.rows.length,n=0;n<a;n++){for(u="",o=(s=d.rows[n]).length,i=0;i<o;i++)u+=this.renderer.tablecell(this.parseInline(s[i].tokens),{header:!1,align:d.align[i]})
c+=this.renderer.tablerow(u)}_+=this.renderer.table(l,c)
continue
case"blockquote":c=this.parse(d.tokens),_+=this.renderer.blockquote(c)
continue
case"list":for(h=d.ordered,f=d.start,p=d.loose,a=d.items.length,c="",n=0;n<a;n++)y=(v=d.items[n]).checked,b=v.task,m="",v.task&&(E=this.renderer.checkbox(y),p?v.tokens.length>0&&"paragraph"===v.tokens[0].type?(v.tokens[0].text=E+" "+v.tokens[0].text,v.tokens[0].tokens&&v.tokens[0].tokens.length>0&&"text"===v.tokens[0].tokens[0].type&&(v.tokens[0].tokens[0].text=E+" "+v.tokens[0].tokens[0].text)):v.tokens.unshift({type:"text",text:E}):m+=E),m+=this.parse(v.tokens,p),c+=this.renderer.listitem(m,b,y)
_+=this.renderer.list(c,h,f)
continue
case"html":_+=this.renderer.html(d.text)
continue
case"paragraph":_+=this.renderer.paragraph(this.parseInline(d.tokens))
continue
case"text":for(c=d.tokens?this.parseInline(d.tokens):d.text;r+1<T&&"text"===e[r+1].type;)c+="\n"+((d=e[++r]).tokens?this.parseInline(d.tokens):d.text)
_+=t?this.renderer.paragraph(c):c
continue
default:var A='Token with "'+d.type+'" type was not found.'
if(this.options.silent)return void console.error(A)
throw new Error(A)}else _+=w||""
return _},r.parseInline=function(e,t){t=t||this.renderer
var r,n,i,a="",o=e.length
for(r=0;r<o;r++)if(n=e[r],!(this.options.extensions&&this.options.extensions.renderers&&this.options.extensions.renderers[n.type])||!1===(i=this.options.extensions.renderers[n.type].call({parser:this},n))&&["escape","html","link","image","strong","em","codespan","br","del","text"].includes(n.type))switch(n.type){case"escape":case"text":a+=t.text(n.text)
break
case"html":a+=t.html(n.text)
break
case"link":a+=t.link(n.href,n.title,this.parseInline(n.tokens,t))
break
case"image":a+=t.image(n.href,n.title,n.text)
break
case"strong":a+=t.strong(this.parseInline(n.tokens,t))
break
case"em":a+=t.em(this.parseInline(n.tokens,t))
break
case"codespan":a+=t.codespan(n.text)
break
case"br":a+=t.br()
break
case"del":a+=t.del(this.parseInline(n.tokens,t))
break
default:var s='Token with "'+n.type+'" type was not found.'
if(this.options.silent)return void console.error(s)
throw new Error(s)}else a+=i||""
return a},e}(),q=function(){function e(e){this.options=e||t.defaults}var r=e.prototype
return r.preprocess=function(e){return e},r.postprocess=function(e){return e},e}()
function j(e,t){return function(r,i,a){"function"==typeof i&&(a=i,i=null)
var o=n({},i),s=function(e,t,r){return function(n){if(n.message+="\nPlease report this to https://github.com/markedjs/marked.",e){var i="<p>An error occurred:</p><pre>"+f(n.message+"",!0)+"</pre>"
return t?Promise.resolve(i):r?void r(null,i):i}if(t)return Promise.reject(n)
if(!r)throw n
r(n)}}((i=n({},G.defaults,o)).silent,i.async,a)
if(null==r)return s(new Error("marked(): input parameter is undefined or null"))
if("string"!=typeof r)return s(new Error("marked(): input parameter is of type "+Object.prototype.toString.call(r)+", string expected"))
if(function(e){e&&e.sanitize&&!e.silent&&console.warn("marked(): sanitize and sanitizer parameters are deprecated since version 0.7.0, should not be used and will be removed in the future. Read more here: https://marked.js.org/#/USING_ADVANCED.md#options")}(i),i.hooks&&(i.hooks.options=i),a){var u,l=i.highlight
try{i.hooks&&(r=i.hooks.preprocess(r)),u=e(r,i)}catch(e){return s(e)}var c=function(e){var r
if(!e)try{i.walkTokens&&G.walkTokens(u,i.walkTokens),r=t(u,i),i.hooks&&(r=i.hooks.postprocess(r))}catch(t){e=t}return i.highlight=l,e?s(e):a(null,r)}
if(!l||l.length<3)return c()
if(delete i.highlight,!u.length)return c()
var d=0
return G.walkTokens(u,(function(e){"code"===e.type&&(d++,setTimeout((function(){l(e.text,e.lang,(function(t,r){if(t)return c(t)
null!=r&&r!==e.text&&(e.text=r,e.escaped=!0),0==--d&&c()}))}),0))})),void(0===d&&c())}if(i.async)return Promise.resolve(i.hooks?i.hooks.preprocess(r):r).then((function(t){return e(t,i)})).then((function(e){return i.walkTokens?Promise.all(G.walkTokens(e,i.walkTokens)).then((function(){return e})):e})).then((function(e){return t(e,i)})).then((function(e){return i.hooks?i.hooks.postprocess(e):e})).catch(s)
try{i.hooks&&(r=i.hooks.preprocess(r))
var h=e(r,i)
i.walkTokens&&G.walkTokens(h,i.walkTokens)
var p=t(h,i)
return i.hooks&&(p=i.hooks.postprocess(p)),p}catch(e){return s(e)}}}function G(e,t,r){return j(P.lex,U.parse)(e,t,r)}q.passThroughHooks=new Set(["preprocess","postprocess"]),G.options=G.setOptions=function(e){var r
return G.defaults=n({},G.defaults,e),r=G.defaults,t.defaults=r,G},G.getDefaults=o,G.defaults=t.defaults,G.use=function(){for(var e=G.defaults.extensions||{renderers:{},childTokens:{}},t=arguments.length,r=new Array(t),i=0;i<t;i++)r[i]=arguments[i]
r.forEach((function(t){var r=n({},t)
if(r.async=G.defaults.async||r.async||!1,t.extensions&&(t.extensions.forEach((function(t){if(!t.name)throw new Error("extension name required")
if(t.renderer){var r=e.renderers[t.name]
e.renderers[t.name]=r?function(){for(var e=arguments.length,n=new Array(e),i=0;i<e;i++)n[i]=arguments[i]
var a=t.renderer.apply(this,n)
return!1===a&&(a=r.apply(this,n)),a}:t.renderer}if(t.tokenizer){if(!t.level||"block"!==t.level&&"inline"!==t.level)throw new Error("extension level must be 'block' or 'inline'")
e[t.level]?e[t.level].unshift(t.tokenizer):e[t.level]=[t.tokenizer],t.start&&("block"===t.level?e.startBlock?e.startBlock.push(t.start):e.startBlock=[t.start]:"inline"===t.level&&(e.startInline?e.startInline.push(t.start):e.startInline=[t.start]))}t.childTokens&&(e.childTokens[t.name]=t.childTokens)})),r.extensions=e),t.renderer&&function(){var e=G.defaults.renderer||new N,n=function(r){var n=e[r]
e[r]=function(){for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o]
var s=t.renderer[r].apply(e,a)
return!1===s&&(s=n.apply(e,a)),s}}
for(var i in t.renderer)n(i)
r.renderer=e}(),t.tokenizer&&function(){var e=G.defaults.tokenizer||new L,n=function(r){var n=e[r]
e[r]=function(){for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o]
var s=t.tokenizer[r].apply(e,a)
return!1===s&&(s=n.apply(e,a)),s}}
for(var i in t.tokenizer)n(i)
r.tokenizer=e}(),t.hooks&&function(){var e=G.defaults.hooks||new q,n=function(r){var n=e[r]
q.passThroughHooks.has(r)?e[r]=function(i){if(G.defaults.async)return Promise.resolve(t.hooks[r].call(e,i)).then((function(t){return n.call(e,t)}))
var a=t.hooks[r].call(e,i)
return n.call(e,a)}:e[r]=function(){for(var i=arguments.length,a=new Array(i),o=0;o<i;o++)a[o]=arguments[o]
var s=t.hooks[r].apply(e,a)
return!1===s&&(s=n.apply(e,a)),s}}
for(var i in t.hooks)n(i)
r.hooks=e}(),t.walkTokens){var i=G.defaults.walkTokens
r.walkTokens=function(e){var r=[]
return r.push(t.walkTokens.call(this,e)),i&&(r=r.concat(i.call(this,e))),r}}G.setOptions(r)}))},G.walkTokens=function(e,t){for(var r,n=[],i=function(){var e=r.value
switch(n=n.concat(t.call(G,e)),e.type){case"table":for(var i,o=a(e.header);!(i=o()).done;){var s=i.value
n=n.concat(G.walkTokens(s.tokens,t))}for(var u,l=a(e.rows);!(u=l()).done;)for(var c,d=a(u.value);!(c=d()).done;){var h=c.value
n=n.concat(G.walkTokens(h.tokens,t))}break
case"list":n=n.concat(G.walkTokens(e.items,t))
break
default:G.defaults.extensions&&G.defaults.extensions.childTokens&&G.defaults.extensions.childTokens[e.type]?G.defaults.extensions.childTokens[e.type].forEach((function(r){n=n.concat(G.walkTokens(e[r],t))})):e.tokens&&(n=n.concat(G.walkTokens(e.tokens,t)))}},o=a(e);!(r=o()).done;)i()
return n},G.parseInline=j(P.lexInline,U.parseInline),G.Parser=U,G.parser=U.parse,G.Renderer=N,G.TextRenderer=M,G.Lexer=P,G.lexer=P.lex,G.Tokenizer=L,G.Slugger=B,G.Hooks=q,G.parse=G
var H=G.options,V=G.setOptions,z=G.use,K=G.walkTokens,W=G.parseInline,$=G,Y=U.parse,Q=P.lex
t.Hooks=q,t.Lexer=P,t.Parser=U,t.Renderer=N,t.Slugger=B,t.TextRenderer=M,t.Tokenizer=L,t.getDefaults=o,t.lexer=Q,t.marked=G,t.options=H,t.parse=$,t.parseInline=W,t.parser=Y,t.setOptions=V,t.use=z,t.walkTokens=K}}])
