"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[584],{4584:(t,e,s)=>{s.r(e),s.d(e,{default:()=>Wr})
var i,r,n,a,o,l={}
function h(t,e){var s=Object.keys(t)
if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t)
e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function d(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{}
e%2?h(Object(s),!0).forEach((function(e){c(t,e,s[e])})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):h(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function c(t,e,s){return(e=function(t){var e=function(t,e){if("object"!=typeof t||null===t)return t
var s=t[Symbol.toPrimitive]
if(void 0!==s){var i=s.call(t,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t)
return"symbol"==typeof e?e:String(e)}(e))in t?Object.defineProperty(t,e,{value:s,enumerable:!0,configurable:!0,writable:!0}):t[e]=s,t}function u(){return u=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]
for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t},u.apply(this,arguments)}i=/^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/,r=/^(?=([^\/?#]*))\1([^]*)$/,n=/(?:\/|^)\.(?=\/)/g,a=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,o={buildAbsoluteURL:function(t,e,s){if(s=s||{},t=t.trim(),!(e=e.trim())){if(!s.alwaysNormalize)return t
var i=o.parseURL(t)
if(!i)throw new Error("Error trying to parse base URL.")
return i.path=o.normalizePath(i.path),o.buildURLFromParts(i)}var n=o.parseURL(e)
if(!n)throw new Error("Error trying to parse relative URL.")
if(n.scheme)return s.alwaysNormalize?(n.path=o.normalizePath(n.path),o.buildURLFromParts(n)):e
var a=o.parseURL(t)
if(!a)throw new Error("Error trying to parse base URL.")
if(!a.netLoc&&a.path&&"/"!==a.path[0]){var l=r.exec(a.path)
a.netLoc=l[1],a.path=l[2]}a.netLoc&&!a.path&&(a.path="/")
var h={scheme:a.scheme,netLoc:n.netLoc,path:null,params:n.params,query:n.query,fragment:n.fragment}
if(!n.netLoc&&(h.netLoc=a.netLoc,"/"!==n.path[0]))if(n.path){var d=a.path,c=d.substring(0,d.lastIndexOf("/")+1)+n.path
h.path=o.normalizePath(c)}else h.path=a.path,n.params||(h.params=a.params,n.query||(h.query=a.query))
return null===h.path&&(h.path=s.alwaysNormalize?o.normalizePath(n.path):n.path),o.buildURLFromParts(h)},parseURL:function(t){var e=i.exec(t)
return e?{scheme:e[1]||"",netLoc:e[2]||"",path:e[3]||"",params:e[4]||"",query:e[5]||"",fragment:e[6]||""}:null},normalizePath:function(t){for(t=t.split("").reverse().join("").replace(n,"");t.length!==(t=t.replace(a,"")).length;);return t.split("").reverse().join("")},buildURLFromParts:function(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}},{get exports(){return l},set exports(t){l=t}}.exports=o
const f=Number.isFinite||function(t){return"number"==typeof t&&isFinite(t)}
let g=function(t){return t.MEDIA_ATTACHING="hlsMediaAttaching",t.MEDIA_ATTACHED="hlsMediaAttached",t.MEDIA_DETACHING="hlsMediaDetaching",t.MEDIA_DETACHED="hlsMediaDetached",t.BUFFER_RESET="hlsBufferReset",t.BUFFER_CODECS="hlsBufferCodecs",t.BUFFER_CREATED="hlsBufferCreated",t.BUFFER_APPENDING="hlsBufferAppending",t.BUFFER_APPENDED="hlsBufferAppended",t.BUFFER_EOS="hlsBufferEos",t.BUFFER_FLUSHING="hlsBufferFlushing",t.BUFFER_FLUSHED="hlsBufferFlushed",t.MANIFEST_LOADING="hlsManifestLoading",t.MANIFEST_LOADED="hlsManifestLoaded",t.MANIFEST_PARSED="hlsManifestParsed",t.LEVEL_SWITCHING="hlsLevelSwitching",t.LEVEL_SWITCHED="hlsLevelSwitched",t.LEVEL_LOADING="hlsLevelLoading",t.LEVEL_LOADED="hlsLevelLoaded",t.LEVEL_UPDATED="hlsLevelUpdated",t.LEVEL_PTS_UPDATED="hlsLevelPtsUpdated",t.LEVELS_UPDATED="hlsLevelsUpdated",t.AUDIO_TRACKS_UPDATED="hlsAudioTracksUpdated",t.AUDIO_TRACK_SWITCHING="hlsAudioTrackSwitching",t.AUDIO_TRACK_SWITCHED="hlsAudioTrackSwitched",t.AUDIO_TRACK_LOADING="hlsAudioTrackLoading",t.AUDIO_TRACK_LOADED="hlsAudioTrackLoaded",t.SUBTITLE_TRACKS_UPDATED="hlsSubtitleTracksUpdated",t.SUBTITLE_TRACKS_CLEARED="hlsSubtitleTracksCleared",t.SUBTITLE_TRACK_SWITCH="hlsSubtitleTrackSwitch",t.SUBTITLE_TRACK_LOADING="hlsSubtitleTrackLoading",t.SUBTITLE_TRACK_LOADED="hlsSubtitleTrackLoaded",t.SUBTITLE_FRAG_PROCESSED="hlsSubtitleFragProcessed",t.CUES_PARSED="hlsCuesParsed",t.NON_NATIVE_TEXT_TRACKS_FOUND="hlsNonNativeTextTracksFound",t.INIT_PTS_FOUND="hlsInitPtsFound",t.FRAG_LOADING="hlsFragLoading",t.FRAG_LOAD_EMERGENCY_ABORTED="hlsFragLoadEmergencyAborted",t.FRAG_LOADED="hlsFragLoaded",t.FRAG_DECRYPTED="hlsFragDecrypted",t.FRAG_PARSING_INIT_SEGMENT="hlsFragParsingInitSegment",t.FRAG_PARSING_USERDATA="hlsFragParsingUserdata",t.FRAG_PARSING_METADATA="hlsFragParsingMetadata",t.FRAG_PARSED="hlsFragParsed",t.FRAG_BUFFERED="hlsFragBuffered",t.FRAG_CHANGED="hlsFragChanged",t.FPS_DROP="hlsFpsDrop",t.FPS_DROP_LEVEL_CAPPING="hlsFpsDropLevelCapping",t.ERROR="hlsError",t.DESTROYING="hlsDestroying",t.KEY_LOADING="hlsKeyLoading",t.KEY_LOADED="hlsKeyLoaded",t.LIVE_BACK_BUFFER_REACHED="hlsLiveBackBufferReached",t.BACK_BUFFER_REACHED="hlsBackBufferReached",t}({}),m=function(t){return t.NETWORK_ERROR="networkError",t.MEDIA_ERROR="mediaError",t.KEY_SYSTEM_ERROR="keySystemError",t.MUX_ERROR="muxError",t.OTHER_ERROR="otherError",t}({}),p=function(t){return t.KEY_SYSTEM_NO_KEYS="keySystemNoKeys",t.KEY_SYSTEM_NO_ACCESS="keySystemNoAccess",t.KEY_SYSTEM_NO_SESSION="keySystemNoSession",t.KEY_SYSTEM_NO_CONFIGURED_LICENSE="keySystemNoConfiguredLicense",t.KEY_SYSTEM_LICENSE_REQUEST_FAILED="keySystemLicenseRequestFailed",t.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED="keySystemServerCertificateRequestFailed",t.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED="keySystemServerCertificateUpdateFailed",t.KEY_SYSTEM_SESSION_UPDATE_FAILED="keySystemSessionUpdateFailed",t.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED="keySystemStatusOutputRestricted",t.KEY_SYSTEM_STATUS_INTERNAL_ERROR="keySystemStatusInternalError",t.MANIFEST_LOAD_ERROR="manifestLoadError",t.MANIFEST_LOAD_TIMEOUT="manifestLoadTimeOut",t.MANIFEST_PARSING_ERROR="manifestParsingError",t.MANIFEST_INCOMPATIBLE_CODECS_ERROR="manifestIncompatibleCodecsError",t.LEVEL_EMPTY_ERROR="levelEmptyError",t.LEVEL_LOAD_ERROR="levelLoadError",t.LEVEL_LOAD_TIMEOUT="levelLoadTimeOut",t.LEVEL_PARSING_ERROR="levelParsingError",t.LEVEL_SWITCH_ERROR="levelSwitchError",t.AUDIO_TRACK_LOAD_ERROR="audioTrackLoadError",t.AUDIO_TRACK_LOAD_TIMEOUT="audioTrackLoadTimeOut",t.SUBTITLE_LOAD_ERROR="subtitleTrackLoadError",t.SUBTITLE_TRACK_LOAD_TIMEOUT="subtitleTrackLoadTimeOut",t.FRAG_LOAD_ERROR="fragLoadError",t.FRAG_LOAD_TIMEOUT="fragLoadTimeOut",t.FRAG_DECRYPT_ERROR="fragDecryptError",t.FRAG_PARSING_ERROR="fragParsingError",t.FRAG_GAP="fragGap",t.REMUX_ALLOC_ERROR="remuxAllocError",t.KEY_LOAD_ERROR="keyLoadError",t.KEY_LOAD_TIMEOUT="keyLoadTimeOut",t.BUFFER_ADD_CODEC_ERROR="bufferAddCodecError",t.BUFFER_INCOMPATIBLE_CODECS_ERROR="bufferIncompatibleCodecsError",t.BUFFER_APPEND_ERROR="bufferAppendError",t.BUFFER_APPENDING_ERROR="bufferAppendingError",t.BUFFER_STALLED_ERROR="bufferStalledError",t.BUFFER_FULL_ERROR="bufferFullError",t.BUFFER_SEEK_OVER_HOLE="bufferSeekOverHole",t.BUFFER_NUDGE_ON_STALL="bufferNudgeOnStall",t.INTERNAL_EXCEPTION="internalException",t.INTERNAL_ABORTED="aborted",t.UNKNOWN="unknown",t}({})
const y=function(){},T={trace:y,debug:y,log:y,warn:y,info:y,error:y}
let E=T
const v=E,S=/^(\d+)x(\d+)$/,L=/(.+?)=(".*?"|.*?)(?:,|$)/g
class A{constructor(t){"string"==typeof t&&(t=A.parseAttrList(t))
for(const e in t)t.hasOwnProperty(e)&&("X-"===e.substring(0,2)&&(this.clientAttrs=this.clientAttrs||[],this.clientAttrs.push(e)),this[e]=t[e])}decimalInteger(t){const e=parseInt(this[t],10)
return e>Number.MAX_SAFE_INTEGER?1/0:e}hexadecimalInteger(t){if(this[t]){let e=(this[t]||"0x").slice(2)
e=(1&e.length?"0":"")+e
const s=new Uint8Array(e.length/2)
for(let t=0;t<e.length/2;t++)s[t]=parseInt(e.slice(2*t,2*t+2),16)
return s}return null}hexadecimalIntegerAsNumber(t){const e=parseInt(this[t],16)
return e>Number.MAX_SAFE_INTEGER?1/0:e}decimalFloatingPoint(t){return parseFloat(this[t])}optionalFloat(t,e){const s=this[t]
return s?parseFloat(s):e}enumeratedString(t){return this[t]}bool(t){return"YES"===this[t]}decimalResolution(t){const e=S.exec(this[t])
if(null!==e)return{width:parseInt(e[1],10),height:parseInt(e[2],10)}}static parseAttrList(t){let e
const s={}
for(L.lastIndex=0;null!==(e=L.exec(t));){let t=e[2]
0===t.indexOf('"')&&t.lastIndexOf('"')===t.length-1&&(t=t.slice(1,-1)),s[e[1].trim()]=t}return s}}function R(t){return"SCTE35-OUT"===t||"SCTE35-IN"===t}class b{constructor(t,e){if(this.attr=void 0,this._startDate=void 0,this._endDate=void 0,this._badValueForSameId=void 0,e){const s=e.attr
for(const e in s)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e]!==s[e]){v.warn(`DATERANGE tag attribute: "${e}" does not match for tags with ID: "${t.ID}"`),this._badValueForSameId=e
break}t=u(new A({}),s,t)}if(this.attr=t,this._startDate=new Date(t["START-DATE"]),"END-DATE"in this.attr){const t=new Date(this.attr["END-DATE"])
f(t.getTime())&&(this._endDate=t)}}get id(){return this.attr.ID}get class(){return this.attr.CLASS}get startDate(){return this._startDate}get endDate(){if(this._endDate)return this._endDate
const t=this.duration
return null!==t?new Date(this._startDate.getTime()+1e3*t):null}get duration(){if("DURATION"in this.attr){const t=this.attr.decimalFloatingPoint("DURATION")
if(f(t))return t}else if(this._endDate)return(this._endDate.getTime()-this._startDate.getTime())/1e3
return null}get plannedDuration(){return"PLANNED-DURATION"in this.attr?this.attr.decimalFloatingPoint("PLANNED-DURATION"):null}get endOnNext(){return this.attr.bool("END-ON-NEXT")}get isValid(){return!!this.id&&!this._badValueForSameId&&f(this.startDate.getTime())&&(null===this.duration||this.duration>=0)&&(!this.endOnNext||!!this.class)}}class I{constructor(){this.aborted=!1,this.loaded=0,this.retry=0,this.total=0,this.chunkCount=0,this.bwEstimate=0,this.loading={start:0,first:0,end:0},this.parsing={start:0,end:0},this.buffering={start:0,first:0,end:0}}}var D={AUDIO:"audio",VIDEO:"video",AUDIOVIDEO:"audiovideo"}
class k{constructor(t){this._byteRange=null,this._url=null,this.baseurl=void 0,this.relurl=void 0,this.elementaryStreams={[D.AUDIO]:null,[D.VIDEO]:null,[D.AUDIOVIDEO]:null},this.baseurl=t}setByteRange(t,e){const s=t.split("@",2),i=[]
1===s.length?i[0]=e?e.byteRangeEndOffset:0:i[0]=parseInt(s[1]),i[1]=parseInt(s[0])+i[0],this._byteRange=i}get byteRange(){return this._byteRange?this._byteRange:[]}get byteRangeStartOffset(){return this.byteRange[0]}get byteRangeEndOffset(){return this.byteRange[1]}get url(){return!this._url&&this.baseurl&&this.relurl&&(this._url=l.buildAbsoluteURL(this.baseurl,this.relurl,{alwaysNormalize:!0})),this._url||""}set url(t){this._url=t}}class w extends k{constructor(t,e){super(e),this._decryptdata=null,this.rawProgramDateTime=null,this.programDateTime=null,this.tagList=[],this.duration=0,this.sn=0,this.levelkeys=void 0,this.type=void 0,this.loader=null,this.keyLoader=null,this.level=-1,this.cc=0,this.startPTS=void 0,this.endPTS=void 0,this.startDTS=void 0,this.endDTS=void 0,this.start=0,this.deltaPTS=void 0,this.maxStartPTS=void 0,this.minEndPTS=void 0,this.stats=new I,this.urlId=0,this.data=void 0,this.bitrateTest=!1,this.title=null,this.initSegment=null,this.endList=void 0,this.gap=void 0,this.type=t}get decryptdata(){const{levelkeys:t}=this
if(!t&&!this._decryptdata)return null
if(!this._decryptdata&&this.levelkeys&&!this.levelkeys.NONE){const t=this.levelkeys.identity
if(t)this._decryptdata=t.getDecryptData(this.sn)
else{const t=Object.keys(this.levelkeys)
if(1===t.length)return this._decryptdata=this.levelkeys[t[0]].getDecryptData(this.sn)}}return this._decryptdata}get end(){return this.start+this.duration}get endProgramDateTime(){if(null===this.programDateTime)return null
if(!f(this.programDateTime))return null
const t=f(this.duration)?this.duration:0
return this.programDateTime+1e3*t}get encrypted(){var t
if(null!=(t=this._decryptdata)&&t.encrypted)return!0
if(this.levelkeys){const t=Object.keys(this.levelkeys),e=t.length
if(e>1||1===e&&this.levelkeys[t[0]].encrypted)return!0}return!1}setKeyFormat(t){if(this.levelkeys){const e=this.levelkeys[t]
e&&!this._decryptdata&&(this._decryptdata=e.getDecryptData(this.sn))}}abortRequests(){var t,e
null==(t=this.loader)||t.abort(),null==(e=this.keyLoader)||e.abort()}setElementaryStreamInfo(t,e,s,i,r,n=!1){const{elementaryStreams:a}=this,o=a[t]
o?(o.startPTS=Math.min(o.startPTS,e),o.endPTS=Math.max(o.endPTS,s),o.startDTS=Math.min(o.startDTS,i),o.endDTS=Math.max(o.endDTS,r)):a[t]={startPTS:e,endPTS:s,startDTS:i,endDTS:r,partial:n}}clearElementaryStreamInfo(){const{elementaryStreams:t}=this
t[D.AUDIO]=null,t[D.VIDEO]=null,t[D.AUDIOVIDEO]=null}}class C extends k{constructor(t,e,s,i,r){super(s),this.fragOffset=0,this.duration=0,this.gap=!1,this.independent=!1,this.relurl=void 0,this.fragment=void 0,this.index=void 0,this.stats=new I,this.duration=t.decimalFloatingPoint("DURATION"),this.gap=t.bool("GAP"),this.independent=t.bool("INDEPENDENT"),this.relurl=t.enumeratedString("URI"),this.fragment=e,this.index=i
const n=t.enumeratedString("BYTERANGE")
n&&this.setByteRange(n,r),r&&(this.fragOffset=r.fragOffset+r.duration)}get start(){return this.fragment.start+this.fragOffset}get end(){return this.start+this.duration}get loaded(){const{elementaryStreams:t}=this
return!!(t.audio||t.video||t.audiovideo)}}class _{constructor(t){this.PTSKnown=!1,this.alignedSliding=!1,this.averagetargetduration=void 0,this.endCC=0,this.endSN=0,this.fragments=void 0,this.fragmentHint=void 0,this.partList=null,this.dateRanges=void 0,this.live=!0,this.ageHeader=0,this.advancedDateTime=void 0,this.updated=!0,this.advanced=!0,this.availabilityDelay=void 0,this.misses=0,this.startCC=0,this.startSN=0,this.startTimeOffset=null,this.targetduration=0,this.totalduration=0,this.type=null,this.url=void 0,this.m3u8="",this.version=null,this.canBlockReload=!1,this.canSkipUntil=0,this.canSkipDateRanges=!1,this.skippedSegments=0,this.recentlyRemovedDateranges=void 0,this.partHoldBack=0,this.holdBack=0,this.partTarget=0,this.preloadHint=void 0,this.renditionReports=void 0,this.tuneInGoal=0,this.deltaUpdateFailed=void 0,this.driftStartTime=0,this.driftEndTime=0,this.driftStart=0,this.driftEnd=0,this.encryptedFragments=void 0,this.playlistParsingError=null,this.variableList=null,this.hasVariableRefs=!1,this.fragments=[],this.encryptedFragments=[],this.dateRanges={},this.url=t}reloaded(t){if(!t)return this.advanced=!0,void(this.updated=!0)
const e=this.lastPartSn-t.lastPartSn,s=this.lastPartIndex-t.lastPartIndex
this.updated=this.endSN!==t.endSN||!!s||!!e,this.advanced=this.endSN>t.endSN||e>0||0===e&&s>0,this.updated||this.advanced?this.misses=Math.floor(.6*t.misses):this.misses=t.misses+1,this.availabilityDelay=t.availabilityDelay}get hasProgramDateTime(){return!!this.fragments.length&&f(this.fragments[this.fragments.length-1].programDateTime)}get levelTargetDuration(){return this.averagetargetduration||this.targetduration||10}get drift(){const t=this.driftEndTime-this.driftStartTime
return t>0?1e3*(this.driftEnd-this.driftStart)/t:1}get edge(){return this.partEnd||this.fragmentEnd}get partEnd(){var t
return null!=(t=this.partList)&&t.length?this.partList[this.partList.length-1].end:this.fragmentEnd}get fragmentEnd(){var t
return null!=(t=this.fragments)&&t.length?this.fragments[this.fragments.length-1].end:0}get age(){return this.advancedDateTime?Math.max(Date.now()-this.advancedDateTime,0)/1e3:0}get lastPartIndex(){var t
return null!=(t=this.partList)&&t.length?this.partList[this.partList.length-1].index:-1}get lastPartSn(){var t
return null!=(t=this.partList)&&t.length?this.partList[this.partList.length-1].fragment.sn:this.endSN}}function P(t){return Uint8Array.from(atob(t),(t=>t.charCodeAt(0)))}function x(t){return Uint8Array.from(unescape(encodeURIComponent(t)),(t=>t.charCodeAt(0)))}var F={CLEARKEY:"org.w3.clearkey",FAIRPLAY:"com.apple.fps",PLAYREADY:"com.microsoft.playready",WIDEVINE:"com.widevine.alpha"},O="org.w3.clearkey",M="com.apple.streamingkeydelivery",N="com.microsoft.playready",U="urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"
function B(t){switch(t){case M:return F.FAIRPLAY
case N:return F.PLAYREADY
case U:return F.WIDEVINE
case O:return F.CLEARKEY}}var $="edef8ba979d64acea3c827dcd51d21ed"
function G(t){switch(t){case F.FAIRPLAY:return M
case F.PLAYREADY:return N
case F.WIDEVINE:return U
case F.CLEARKEY:return O}}function K(t){const{drmSystems:e,widevineLicenseUrl:s}=t,i=e?[F.FAIRPLAY,F.WIDEVINE,F.PLAYREADY,F.CLEARKEY].filter((t=>!!e[t])):[]
return!i[F.WIDEVINE]&&s&&i.push(F.WIDEVINE),i}const H="undefined"!=typeof self&&self.navigator&&self.navigator.requestMediaKeySystemAccess?self.navigator.requestMediaKeySystemAccess.bind(self.navigator):null
function V(t,e,s){return Uint8Array.prototype.slice?t.slice(e,s):new Uint8Array(Array.prototype.slice.call(t,e,s))}const Y=(t,e)=>e+10<=t.length&&73===t[e]&&68===t[e+1]&&51===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128,W=(t,e)=>e+10<=t.length&&51===t[e]&&68===t[e+1]&&73===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128,q=(t,e)=>{const s=e
let i=0
for(;Y(t,e);)i+=10,i+=j(t,e+6),W(t,e+10)&&(i+=10),e+=i
if(i>0)return t.subarray(s,s+i)},j=(t,e)=>{let s=0
return s=(127&t[e])<<21,s|=(127&t[e+1])<<14,s|=(127&t[e+2])<<7,s|=127&t[e+3],s},X=(t,e)=>Y(t,e)&&j(t,e+6)+10<=t.length-e,z=t=>t&&"PRIV"===t.key&&"com.apple.streaming.transportStreamTimestamp"===t.info,Q=t=>{const e=String.fromCharCode(t[0],t[1],t[2],t[3]),s=j(t,4)
return{type:e,size:s,data:t.subarray(10,10+s)}},J=t=>{let e=0
const s=[]
for(;Y(t,e);){const i=j(t,e+6)
e+=10
const r=e+i
for(;e+8<r;){const i=Q(t.subarray(e)),r=Z(i)
r&&s.push(r),e+=i.size+10}W(t,e)&&(e+=10)}return s},Z=t=>"PRIV"===t.type?tt(t):"W"===t.type[0]?st(t):et(t),tt=t=>{if(t.size<2)return
const e=rt(t.data,!0),s=new Uint8Array(t.data.subarray(e.length+1))
return{key:t.type,info:e,data:s.buffer}},et=t=>{if(t.size<2)return
if("TXXX"===t.type){let e=1
const s=rt(t.data.subarray(e),!0)
e+=s.length+1
const i=rt(t.data.subarray(e))
return{key:t.type,info:s,data:i}}const e=rt(t.data.subarray(1))
return{key:t.type,data:e}},st=t=>{if("WXXX"===t.type){if(t.size<2)return
let e=1
const s=rt(t.data.subarray(e),!0)
e+=s.length+1
const i=rt(t.data.subarray(e))
return{key:t.type,info:s,data:i}}const e=rt(t.data)
return{key:t.type,data:e}},it=t=>{if(8===t.data.byteLength){const e=new Uint8Array(t.data),s=1&e[3]
let i=(e[4]<<23)+(e[5]<<15)+(e[6]<<7)+e[7]
return i/=45,s&&(i+=47721858.84),Math.round(i)}},rt=(t,e=!1)=>{const s=(nt||void 0===self.TextDecoder||(nt=new self.TextDecoder("utf-8")),nt)
if(s){const i=s.decode(t)
if(e){const t=i.indexOf("\0")
return-1!==t?i.substring(0,t):i}return i.replace(/\0/g,"")}const i=t.length
let r,n,a,o="",l=0
for(;l<i;){if(r=t[l++],0===r&&e)return o
if(0!==r&&3!==r)switch(r>>4){case 0:case 1:case 2:case 3:case 4:case 5:case 6:case 7:o+=String.fromCharCode(r)
break
case 12:case 13:n=t[l++],o+=String.fromCharCode((31&r)<<6|63&n)
break
case 14:n=t[l++],a=t[l++],o+=String.fromCharCode((15&r)<<12|(63&n)<<6|(63&a)<<0)}}return o}
let nt
const at=function(t){let e=""
for(let s=0;s<t.length;s++){let i=t[s].toString(16)
i.length<2&&(i="0"+i),e+=i}return e},ot=Math.pow(2,32)-1,lt=[].push,ht={video:1,audio:2,id3:3,text:4}
function dt(t){return String.fromCharCode.apply(null,t)}function ct(t,e){const s=t[e]<<8|t[e+1]
return s<0?65536+s:s}function ut(t,e){const s=ft(t,e)
return s<0?4294967296+s:s}function ft(t,e){return t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3]}function gt(t,e,s){t[e]=s>>24,t[e+1]=s>>16&255,t[e+2]=s>>8&255,t[e+3]=255&s}function mt(t,e){const s=[]
if(!e.length)return s
const i=t.byteLength
for(let r=0;r<i;){const n=ut(t,r),a=n>1?r+n:i
if(dt(t.subarray(r+4,r+8))===e[0])if(1===e.length)s.push(t.subarray(r+8,a))
else{const i=mt(t.subarray(r+8,a),e.slice(1))
i.length&&lt.apply(s,i)}r=a}return s}function pt(t){const e=[],s=t[0]
let i=8
const r=ut(t,i)
i+=4,i+=0===s?8:16,i+=2
let n=t.length+0
const a=ct(t,i)
i+=2
for(let o=0;o<a;o++){let s=i
const a=ut(t,s)
s+=4
const o=2147483647&a
if(1==(2147483648&a)>>>31)return v.warn("SIDX has hierarchical references (not supported)"),null
const l=ut(t,s)
s+=4,e.push({referenceSize:o,subsegmentDuration:l,info:{duration:l/r,start:n,end:n+o-1}}),n+=o,s+=4,i=s}return{earliestPresentationTime:0,timescale:r,version:s,referencesCount:a,references:e}}function yt(t){const e=[],s=mt(t,["moov","trak"])
for(let i=0;i<s.length;i++){const t=s[i],r=mt(t,["tkhd"])[0]
if(r){let s=r[0],i=0===s?12:20
const n=ut(r,i),a=mt(t,["mdia","mdhd"])[0]
if(a){s=a[0],i=0===s?12:20
const r=ut(a,i),o=mt(t,["mdia","hdlr"])[0]
if(o){const s=dt(o.subarray(8,12)),i={soun:D.AUDIO,vide:D.VIDEO}[s]
if(i){const s=mt(t,["mdia","minf","stbl","stsd"])[0]
let a
s&&(a=dt(s.subarray(12,16))),e[n]={timescale:r,type:i},e[i]={timescale:r,id:n,codec:a}}}}}}return mt(t,["moov","mvex","trex"]).forEach((t=>{const s=ut(t,4),i=e[s]
i&&(i.default={duration:ut(t,12),flags:ut(t,20)})})),e}function Tt(t){const e=mt(t,["schm"])[0]
if(e){const s=dt(e.subarray(4,8))
if("cbcs"===s||"cenc"===s)return mt(t,["schi","tenc"])[0]}return v.error("[eme] missing 'schm' box"),null}function Et(t){const e=ut(t,0)
let s=8
1&e&&(s+=4),4&e&&(s+=4)
let i=0
const r=ut(t,4)
for(let n=0;n<r;n++)256&e&&(i+=ut(t,s),s+=4),512&e&&(s+=4),1024&e&&(s+=4),2048&e&&(s+=4)
return i}function vt(t,e){const s=new Uint8Array(t.length+e.length)
return s.set(t),s.set(e,t.length),s}function St(t,e){const s=[],i=e.samples,r=e.timescale,n=e.id
let a=!1
return mt(i,["moof"]).map((o=>{const l=o.byteOffset-8
mt(o,["traf"]).map((o=>{const h=mt(o,["tfdt"]).map((t=>{const e=t[0]
let s=ut(t,4)
return 1===e&&(s*=Math.pow(2,32),s+=ut(t,8)),s/r}))[0]
return void 0!==h&&(t=h),mt(o,["tfhd"]).map((h=>{const d=ut(h,4),c=16777215&ut(h,0)
let u=0
const f=0!=(16&c)
let g=0
const m=0!=(32&c)
let p=8
d===n&&(0!=(1&c)&&(p+=8),0!=(2&c)&&(p+=4),0!=(8&c)&&(u=ut(h,p),p+=4),f&&(g=ut(h,p),p+=4),m&&(p+=4),"video"===e.type&&(a=function(t){if(!t)return!1
const e=t.indexOf("."),s=e<0?t:t.substring(0,e)
return"hvc1"===s||"hev1"===s||"dvh1"===s||"dvhe"===s}(e.codec)),mt(o,["trun"]).map((n=>{const o=n[0],h=16777215&ut(n,0),d=0!=(1&h)
let c=0
const f=0!=(4&h),m=0!=(256&h)
let p=0
const y=0!=(512&h)
let T=0
const E=0!=(1024&h),v=0!=(2048&h)
let S=0
const L=ut(n,4)
let A=8
d&&(c=ut(n,A),A+=4),f&&(A+=4)
let R=c+l
for(let l=0;l<L;l++){if(m?(p=ut(n,A),A+=4):p=u,y?(T=ut(n,A),A+=4):T=g,E&&(A+=4),v&&(S=0===o?ut(n,A):ft(n,A),A+=4),e.type===D.VIDEO){let e=0
for(;e<T;){const n=ut(i,R)
R+=4,Lt(a,i[R])&&At(i.subarray(R,R+n),a?2:1,t+S/r,s),R+=n,e+=n+4}}t+=p/r}})))}))}))})),s}function Lt(t,e){if(t){const t=e>>1&63
return 39===t||40===t}return 6==(31&e)}function At(t,e,s,i){const r=Rt(t)
let n=0
n+=e
let a=0,o=0,l=!1,h=0
for(;n<r.length;){a=0
do{if(n>=r.length)break
h=r[n++],a+=h}while(255===h)
o=0
do{if(n>=r.length)break
h=r[n++],o+=h}while(255===h)
const t=r.length-n
if(!l&&4===a&&n<r.length){if(l=!0,181===r[n++]){const t=ct(r,n)
if(n+=2,49===t){const t=ut(r,n)
if(n+=4,1195456820===t){const t=r[n++]
if(3===t){const e=r[n++],o=64&e,l=o?2+3*(31&e):0,h=new Uint8Array(l)
if(o){h[0]=e
for(let t=1;t<l;t++)h[t]=r[n++]}i.push({type:t,payloadType:a,pts:s,bytes:h})}}}}}else if(5===a&&o<t){if(l=!0,o>16){const t=[]
for(let s=0;s<16;s++){const e=r[n++].toString(16)
t.push(1==e.length?"0"+e:e),3!==s&&5!==s&&7!==s&&9!==s||t.push("-")}const e=o-16,l=new Uint8Array(e)
for(let s=0;s<e;s++)l[s]=r[n++]
i.push({payloadType:a,pts:s,uuid:t.join(""),userData:rt(l),userDataBytes:l})}}else if(o<t)n+=o
else if(o>t)break}}function Rt(t){const e=t.byteLength,s=[]
let i=1
for(;i<e-2;)0===t[i]&&0===t[i+1]&&3===t[i+2]?(s.push(i+2),i+=2):i++
if(0===s.length)return t
const r=e-s.length,n=new Uint8Array(r)
let a=0
for(i=0;i<r;a++,i++)a===s[0]&&(a++,s.shift()),n[i]=t[a]
return n}let bt={}
class It{static clearKeyUriToKeyIdMap(){bt={}}constructor(t,e,s,i=[1],r=null){this.uri=void 0,this.method=void 0,this.keyFormat=void 0,this.keyFormatVersions=void 0,this.encrypted=void 0,this.isCommonEncryption=void 0,this.iv=null,this.key=null,this.keyId=null,this.pssh=null,this.method=t,this.uri=e,this.keyFormat=s,this.keyFormatVersions=i,this.iv=r,this.encrypted=!!t&&"NONE"!==t,this.isCommonEncryption=this.encrypted&&"AES-128"!==t}isSupported(){if(this.method){if("AES-128"===this.method||"NONE"===this.method)return!0
if("identity"===this.keyFormat)return"SAMPLE-AES"===this.method
switch(this.keyFormat){case M:case U:case N:case O:return-1!==["ISO-23001-7","SAMPLE-AES","SAMPLE-AES-CENC","SAMPLE-AES-CTR"].indexOf(this.method)}}return!1}getDecryptData(t){if(!this.encrypted||!this.uri)return null
if("AES-128"===this.method&&this.uri&&!this.iv){"number"!=typeof t&&("AES-128"!==this.method||this.iv||v.warn(`missing IV for initialization segment with method="${this.method}" - compliance issue`),t=0)
const e=function(t){const e=new Uint8Array(16)
for(let s=12;s<16;s++)e[s]=t>>8*(15-s)&255
return e}(t)
return new It(this.method,this.uri,"identity",this.keyFormatVersions,e)}const e=function(t){const e=t.split(":")
let s=null
if("data"===e[0]&&2===e.length){const t=e[1].split(";"),i=t[t.length-1].split(",")
if(2===i.length){const e="base64"===i[0],r=i[1]
e?(t.splice(-1,1),s=P(r)):s=function(t){const e=x(t).subarray(0,16),s=new Uint8Array(16)
return s.set(e,16-e.length),s}(r)}}return s}(this.uri)
if(e)switch(this.keyFormat){case U:this.pssh=e,e.length>=22&&(this.keyId=e.subarray(e.length-22,e.length-6))
break
case N:{const t=new Uint8Array([154,4,240,121,152,64,66,134,171,146,230,91,224,136,95,149])
this.pssh=function(t,e,s){if(16!==t.byteLength)throw new RangeError("Invalid system id")
let i,r,n
i=0,r=new Uint8Array,i>0?(n=new Uint8Array(4),e.length>0&&new DataView(n.buffer).setUint32(0,e.length,!1)):n=new Uint8Array
const a=new Uint8Array(4)
return s&&s.byteLength>0&&new DataView(a.buffer).setUint32(0,s.byteLength,!1),function(t,...e){const s=e.length
let i=8,r=s
for(;r--;)i+=e[r].byteLength
const n=new Uint8Array(i)
for(n[0]=i>>24&255,n[1]=i>>16&255,n[2]=i>>8&255,n[3]=255&i,n.set(t,4),r=0,i=8;r<s;r++)n.set(e[r],i),i+=e[r].byteLength
return n}([112,115,115,104],new Uint8Array([i,0,0,0]),t,n,r,a,s||new Uint8Array)}(t,null,e)
const s=new Uint16Array(e.buffer,e.byteOffset,e.byteLength/2),i=String.fromCharCode.apply(null,Array.from(s)),r=i.substring(i.indexOf("<"),i.length),n=(new DOMParser).parseFromString(r,"text/xml").getElementsByTagName("KID")[0]
if(n){const t=n.childNodes[0]?n.childNodes[0].nodeValue:n.getAttribute("VALUE")
if(t){const e=P(t).subarray(0,16)
!function(t){const e=function(t,e,s){const i=t[e]
t[e]=t[s],t[s]=i}
e(t,0,3),e(t,1,2),e(t,4,5),e(t,6,7)}(e),this.keyId=e}}break}default:{let t=e.subarray(0,16)
if(16!==t.length){const e=new Uint8Array(16)
e.set(t,16-t.length),t=e}this.keyId=t
break}}if(!this.keyId||16!==this.keyId.byteLength){let t=bt[this.uri]
if(!t){const e=Object.keys(bt).length%Number.MAX_SAFE_INTEGER
t=new Uint8Array(16),new DataView(t.buffer,12,4).setUint32(0,e),bt[this.uri]=t}this.keyId=t}return this}}const Dt=/\{\$([a-zA-Z0-9-_]+)\}/g
function kt(t){return Dt.test(t)}function wt(t,e,s){if(null!==t.variableList||t.hasVariableRefs)for(let i=s.length;i--;){const r=s[i],n=e[r]
n&&(e[r]=Ct(t,n))}}function Ct(t,e){if(null!==t.variableList||t.hasVariableRefs){const s=t.variableList
return e.replace(Dt,(e=>{const i=e.substring(2,e.length-1),r=null==s?void 0:s[i]
return void 0===r?(t.playlistParsingError||(t.playlistParsingError=new Error(`Missing preceding EXT-X-DEFINE tag for Variable Reference: "${i}"`)),e):r}))}return e}function _t(t,e,s){let i,r,n=t.variableList
if(n||(t.variableList=n={}),"QUERYPARAM"in e){i=e.QUERYPARAM
try{const t=new self.URL(s).searchParams
if(!t.has(i))throw new Error(`"${i}" does not match any query parameter in URI: "${s}"`)
r=t.get(i)}catch(e){t.playlistParsingError||(t.playlistParsingError=new Error(`EXT-X-DEFINE QUERYPARAM: ${e.message}`))}}else i=e.NAME,r=e.VALUE
i in n?t.playlistParsingError||(t.playlistParsingError=new Error(`EXT-X-DEFINE duplicate Variable Name declarations: "${i}"`)):n[i]=r||""}function Pt(t,e,s){const i=e.IMPORT
if(s&&i in s){let e=t.variableList
e||(t.variableList=e={}),e[i]=s[i]}else t.playlistParsingError||(t.playlistParsingError=new Error(`EXT-X-DEFINE IMPORT attribute not found in Multivariant Playlist: "${i}"`))}const xt={audio:{a3ds:!0,"ac-3":!0,"ac-4":!0,alac:!0,alaw:!0,dra1:!0,"dts+":!0,"dts-":!0,dtsc:!0,dtse:!0,dtsh:!0,"ec-3":!0,enca:!0,g719:!0,g726:!0,m4ae:!0,mha1:!0,mha2:!0,mhm1:!0,mhm2:!0,mlpa:!0,mp4a:!0,"raw ":!0,Opus:!0,opus:!0,samr:!0,sawb:!0,sawp:!0,sevc:!0,sqcp:!0,ssmv:!0,twos:!0,ulaw:!0},video:{avc1:!0,avc2:!0,avc3:!0,avc4:!0,avcp:!0,av01:!0,drac:!0,dva1:!0,dvav:!0,dvh1:!0,dvhe:!0,encv:!0,hev1:!0,hvc1:!0,mjp2:!0,mp4v:!0,mvc1:!0,mvc2:!0,mvc3:!0,mvc4:!0,resv:!0,rv60:!0,s263:!0,svc1:!0,svc2:!0,"vc-1":!0,vp08:!0,vp09:!0},text:{stpp:!0,wvtt:!0}}
function Ft(t,e){return MediaSource.isTypeSupported(`${e||"video"}/mp4;codecs="${t}"`)}const Ot=/#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g,Mt=/#EXT-X-MEDIA:(.*)/g,Nt=/^#EXT(?:INF|-X-TARGETDURATION):/m,Ut=new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,/(?!#) *(\S[\S ]*)/.source,/#EXT-X-BYTERANGE:*(.+)/.source,/#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,/#.*/.source].join("|"),"g"),Bt=new RegExp([/#(EXTM3U)/.source,/#EXT-X-(DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source,/#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source,/#EXT-X-(DISCONTINUITY|ENDLIST|GAP)/.source,/(#)([^:]*):(.*)/.source,/(#)(.*)(?:.*)\r?\n?/.source].join("|"))
class $t{static findGroup(t,e){for(let s=0;s<t.length;s++){const i=t[s]
if(i.id===e)return i}}static convertAVC1ToAVCOTI(t){const e=t.split(".")
if(e.length>2){let t=e.shift()+"."
return t+=parseInt(e.shift()).toString(16),t+=("000"+parseInt(e.shift()).toString(16)).slice(-4),t}return t}static resolve(t,e){return l.buildAbsoluteURL(e,t,{alwaysNormalize:!0})}static isMediaPlaylist(t){return Nt.test(t)}static parseMasterPlaylist(t,e){const s={contentSteering:null,levels:[],playlistParsingError:null,sessionData:null,sessionKeys:null,startTimeOffset:null,variableList:null,hasVariableRefs:kt(t)},i=[]
let r
for(Ot.lastIndex=0;null!=(r=Ot.exec(t));)if(r[1]){var n
const t=new A(r[1])
wt(s,t,["CODECS","SUPPLEMENTAL-CODECS","ALLOWED-CPC","PATHWAY-ID","STABLE-VARIANT-ID","AUDIO","VIDEO","SUBTITLES","CLOSED-CAPTIONS","NAME"])
const a=Ct(s,r[2]),o={attrs:t,bitrate:t.decimalInteger("AVERAGE-BANDWIDTH")||t.decimalInteger("BANDWIDTH"),name:t.NAME,url:$t.resolve(a,e)},l=t.decimalResolution("RESOLUTION")
l&&(o.width=l.width,o.height=l.height),Ht((t.CODECS||"").split(/[ ,]+/).filter((t=>t)),o),o.videoCodec&&-1!==o.videoCodec.indexOf("avc1")&&(o.videoCodec=$t.convertAVC1ToAVCOTI(o.videoCodec)),null!=(n=o.unknownCodecs)&&n.length||i.push(o),s.levels.push(o)}else if(r[3]){const t=r[3],i=r[4]
switch(t){case"SESSION-DATA":{const t=new A(i)
wt(s,t,["DATA-ID","LANGUAGE","VALUE","URI"])
const e=t["DATA-ID"]
e&&(null===s.sessionData&&(s.sessionData={}),s.sessionData[e]=t)
break}case"SESSION-KEY":{const t=Gt(i,e,s)
t.encrypted&&t.isSupported()?(null===s.sessionKeys&&(s.sessionKeys=[]),s.sessionKeys.push(t)):v.warn(`[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "${i}"`)
break}case"DEFINE":{const t=new A(i)
wt(s,t,["NAME","VALUE","QUERYPARAM"]),_t(s,t,e)}break
case"CONTENT-STEERING":{const t=new A(i)
wt(s,t,["SERVER-URI","PATHWAY-ID"]),s.contentSteering={uri:$t.resolve(t["SERVER-URI"],e),pathwayId:t["PATHWAY-ID"]||"."}
break}case"START":s.startTimeOffset=Kt(i)}}const a=i.length>0&&i.length<s.levels.length
return s.levels=a?i:s.levels,0===s.levels.length&&(s.playlistParsingError=new Error("no levels found in manifest")),s}static parseMasterPlaylistMedia(t,e,s){let i
const r={},n=s.levels,a={AUDIO:n.map((t=>({id:t.attrs.AUDIO,audioCodec:t.audioCodec}))),SUBTITLES:n.map((t=>({id:t.attrs.SUBTITLES,textCodec:t.textCodec}))),"CLOSED-CAPTIONS":[]}
let o=0
for(Mt.lastIndex=0;null!==(i=Mt.exec(t));){const t=new A(i[1]),n=t.TYPE
if(n){const i=a[n],l=r[n]||[]
r[n]=l,wt(s,t,["URI","GROUP-ID","LANGUAGE","ASSOC-LANGUAGE","STABLE-RENDITION-ID","NAME","INSTREAM-ID","CHARACTERISTICS","CHANNELS"])
const h={attrs:t,bitrate:0,id:o++,groupId:t["GROUP-ID"]||"",instreamId:t["INSTREAM-ID"],name:t.NAME||t.LANGUAGE||"",type:n,default:t.bool("DEFAULT"),autoselect:t.bool("AUTOSELECT"),forced:t.bool("FORCED"),lang:t.LANGUAGE,url:t.URI?$t.resolve(t.URI,e):""}
if(null!=i&&i.length){const t=$t.findGroup(i,h.groupId)||i[0]
Vt(h,t,"audioCodec"),Vt(h,t,"textCodec")}l.push(h)}}return r}static parseLevelPlaylist(t,e,s,i,r,n){const a=new _(e),o=a.fragments
let l,h,d,c=null,g=0,m=0,p=0,y=0,T=null,E=new w(i,e),S=-1,L=!1
for(Ut.lastIndex=0,a.m3u8=t,a.hasVariableRefs=kt(t);null!==(l=Ut.exec(t));){L&&(L=!1,E=new w(i,e),E.start=p,E.sn=g,E.cc=y,E.level=s,c&&(E.initSegment=c,E.rawProgramDateTime=c.rawProgramDateTime,c.rawProgramDateTime=null))
const t=l[1]
if(t){E.duration=parseFloat(t)
const e=(" "+l[2]).slice(1)
E.title=e||null,E.tagList.push(e?["INF",t,e]:["INF",t])}else if(l[3]){if(f(E.duration)){E.start=p,d&&qt(E,d,a),E.sn=g,E.level=s,E.cc=y,E.urlId=r,o.push(E)
const t=(" "+l[3]).slice(1)
E.relurl=Ct(a,t),Yt(E,T),T=E,p+=E.duration,g++,m=0,L=!0}}else if(l[4]){const t=(" "+l[4]).slice(1)
T?E.setByteRange(t,T):E.setByteRange(t)}else if(l[5])E.rawProgramDateTime=(" "+l[5]).slice(1),E.tagList.push(["PROGRAM-DATE-TIME",E.rawProgramDateTime]),-1===S&&(S=o.length)
else{if(l=l[0].match(Bt),!l){v.warn("No matches on slow regex match for level playlist!")
continue}for(h=1;h<l.length&&void 0===l[h];h++);const t=(" "+l[h]).slice(1),r=(" "+l[h+1]).slice(1),p=l[h+2]?(" "+l[h+2]).slice(1):""
switch(t){case"PLAYLIST-TYPE":a.type=r.toUpperCase()
break
case"MEDIA-SEQUENCE":g=a.startSN=parseInt(r)
break
case"SKIP":{const t=new A(r)
wt(a,t,["RECENTLY-REMOVED-DATERANGES"])
const e=t.decimalInteger("SKIPPED-SEGMENTS")
if(f(e)){a.skippedSegments=e
for(let t=e;t--;)o.unshift(null)
g+=e}const s=t.enumeratedString("RECENTLY-REMOVED-DATERANGES")
s&&(a.recentlyRemovedDateranges=s.split("\t"))
break}case"TARGETDURATION":a.targetduration=Math.max(parseInt(r),1)
break
case"VERSION":a.version=parseInt(r)
break
case"EXTM3U":break
case"ENDLIST":a.live=!1
break
case"#":(r||p)&&E.tagList.push(p?[r,p]:[r])
break
case"DISCONTINUITY":y++,E.tagList.push(["DIS"])
break
case"GAP":E.gap=!0,E.tagList.push([t])
break
case"BITRATE":E.tagList.push([t,r])
break
case"DATERANGE":{const t=new A(r)
wt(a,t,["ID","CLASS","START-DATE","END-DATE","SCTE35-CMD","SCTE35-OUT","SCTE35-IN"]),wt(a,t,t.clientAttrs)
const e=new b(t,a.dateRanges[t.ID])
e.isValid||a.skippedSegments?a.dateRanges[e.id]=e:v.warn(`Ignoring invalid DATERANGE tag: "${r}"`),E.tagList.push(["EXT-X-DATERANGE",r])
break}case"DEFINE":{const t=new A(r)
wt(a,t,["NAME","VALUE","IMPORT","QUERYPARAM"]),"IMPORT"in t?Pt(a,t,n):_t(a,t,e)}break
case"DISCONTINUITY-SEQUENCE":y=parseInt(r)
break
case"KEY":{const t=Gt(r,e,a)
if(t.isSupported()){if("NONE"===t.method){d=void 0
break}d||(d={}),d[t.keyFormat]&&(d=u({},d)),d[t.keyFormat]=t}else v.warn(`[Keys] Ignoring invalid EXT-X-KEY tag: "${r}"`)
break}case"START":a.startTimeOffset=Kt(r)
break
case"MAP":{const t=new A(r)
if(wt(a,t,["BYTERANGE","URI"]),E.duration){const r=new w(i,e)
Wt(r,t,s,d),c=r,E.initSegment=c,c.rawProgramDateTime&&!E.rawProgramDateTime&&(E.rawProgramDateTime=c.rawProgramDateTime)}else Wt(E,t,s,d),c=E,L=!0
break}case"SERVER-CONTROL":{const t=new A(r)
a.canBlockReload=t.bool("CAN-BLOCK-RELOAD"),a.canSkipUntil=t.optionalFloat("CAN-SKIP-UNTIL",0),a.canSkipDateRanges=a.canSkipUntil>0&&t.bool("CAN-SKIP-DATERANGES"),a.partHoldBack=t.optionalFloat("PART-HOLD-BACK",0),a.holdBack=t.optionalFloat("HOLD-BACK",0)
break}case"PART-INF":{const t=new A(r)
a.partTarget=t.decimalFloatingPoint("PART-TARGET")
break}case"PART":{let t=a.partList
t||(t=a.partList=[])
const s=m>0?t[t.length-1]:void 0,i=m++,n=new A(r)
wt(a,n,["BYTERANGE","URI"])
const o=new C(n,E,e,i,s)
t.push(o),E.duration+=o.duration
break}case"PRELOAD-HINT":{const t=new A(r)
wt(a,t,["URI"]),a.preloadHint=t
break}case"RENDITION-REPORT":{const t=new A(r)
wt(a,t,["URI"]),a.renditionReports=a.renditionReports||[],a.renditionReports.push(t)
break}default:v.warn(`line parsed but not handled: ${l}`)}}}T&&!T.relurl?(o.pop(),p-=T.duration,a.partList&&(a.fragmentHint=T)):a.partList&&(Yt(E,T),E.cc=y,a.fragmentHint=E,d&&qt(E,d,a))
const R=o.length,I=o[0],D=o[R-1]
if(p+=a.skippedSegments*a.targetduration,p>0&&R&&D){a.averagetargetduration=p/R
const t=D.sn
a.endSN="initSegment"!==t?t:0,a.live||(D.endList=!0),I&&(a.startCC=I.cc)}else a.endSN=0,a.startCC=0
return a.fragmentHint&&(p+=a.fragmentHint.duration),a.totalduration=p,a.endCC=y,S>0&&function(t,e){let s=t[e]
for(let i=e;i--;){const e=t[i]
if(!e)return
e.programDateTime=s.programDateTime-1e3*e.duration,s=e}}(o,S),a}}function Gt(t,e,s){var i,r
const n=new A(t)
wt(s,n,["KEYFORMAT","KEYFORMATVERSIONS","URI","IV","URI"])
const a=null!=(i=n.METHOD)?i:"",o=n.URI,l=n.hexadecimalInteger("IV"),h=n.KEYFORMATVERSIONS,d=null!=(r=n.KEYFORMAT)?r:"identity"
o&&n.IV&&!l&&v.error(`Invalid IV: ${n.IV}`)
const c=o?$t.resolve(o,e):"",u=(h||"1").split("/").map(Number).filter(Number.isFinite)
return new It(a,c,d,u,l)}function Kt(t){const e=new A(t).decimalFloatingPoint("TIME-OFFSET")
return f(e)?e:null}function Ht(t,e){["video","audio","text"].forEach((s=>{const i=t.filter((t=>function(t,e){const s=xt[e]
return!!s&&!0===s[t.slice(0,4)]}(t,s)))
if(i.length){const r=i.filter((t=>0===t.lastIndexOf("avc1",0)||0===t.lastIndexOf("mp4a",0)))
e[`${s}Codec`]=r.length>0?r[0]:i[0],t=t.filter((t=>-1===i.indexOf(t)))}})),e.unknownCodecs=t}function Vt(t,e,s){const i=e[s]
i&&(t[s]=i)}function Yt(t,e){t.rawProgramDateTime?t.programDateTime=Date.parse(t.rawProgramDateTime):null!=e&&e.programDateTime&&(t.programDateTime=e.endProgramDateTime),f(t.programDateTime)||(t.programDateTime=null,t.rawProgramDateTime=null)}function Wt(t,e,s,i){t.relurl=e.URI,e.BYTERANGE&&t.setByteRange(e.BYTERANGE),t.level=s,t.sn="initSegment",i&&(t.levelkeys=i),t.initSegment=null}function qt(t,e,s){t.levelkeys=e
const{encryptedFragments:i}=s
i.length&&i[i.length-1].levelkeys===e||!Object.keys(e).some((t=>e[t].isCommonEncryption))||i.push(t)}var jt={MANIFEST:"manifest",LEVEL:"level",AUDIO_TRACK:"audioTrack",SUBTITLE_TRACK:"subtitleTrack"},Xt={MAIN:"main",AUDIO:"audio",SUBTITLE:"subtitle"}
function zt(t){const{type:e}=t
switch(e){case jt.AUDIO_TRACK:return Xt.AUDIO
case jt.SUBTITLE_TRACK:return Xt.SUBTITLE
default:return Xt.MAIN}}function Qt(t,e){let s=t.url
return void 0!==s&&0!==s.indexOf("data:")||(s=e.url),s}class Jt{constructor(t){this.hls=void 0,this.loaders=Object.create(null),this.variableList=null,this.hls=t,this.registerListeners()}startLoad(t){}stopLoad(){this.destroyInternalLoaders()}registerListeners(){const{hls:t}=this
t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.LEVEL_LOADING,this.onLevelLoading,this),t.on(g.AUDIO_TRACK_LOADING,this.onAudioTrackLoading,this),t.on(g.SUBTITLE_TRACK_LOADING,this.onSubtitleTrackLoading,this)}unregisterListeners(){const{hls:t}=this
t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.LEVEL_LOADING,this.onLevelLoading,this),t.off(g.AUDIO_TRACK_LOADING,this.onAudioTrackLoading,this),t.off(g.SUBTITLE_TRACK_LOADING,this.onSubtitleTrackLoading,this)}createInternalLoader(t){const e=this.hls.config,s=e.pLoader,i=e.loader,r=new(s||i)(e)
return this.loaders[t.type]=r,r}getInternalLoader(t){return this.loaders[t.type]}resetInternalLoader(t){this.loaders[t]&&delete this.loaders[t]}destroyInternalLoaders(){for(const t in this.loaders){const e=this.loaders[t]
e&&e.destroy(),this.resetInternalLoader(t)}}destroy(){this.variableList=null,this.unregisterListeners(),this.destroyInternalLoaders()}onManifestLoading(t,e){const{url:s}=e
this.variableList=null,this.load({id:null,level:0,responseType:"text",type:jt.MANIFEST,url:s,deliveryDirectives:null})}onLevelLoading(t,e){const{id:s,level:i,url:r,deliveryDirectives:n}=e
this.load({id:s,level:i,responseType:"text",type:jt.LEVEL,url:r,deliveryDirectives:n})}onAudioTrackLoading(t,e){const{id:s,groupId:i,url:r,deliveryDirectives:n}=e
this.load({id:s,groupId:i,level:null,responseType:"text",type:jt.AUDIO_TRACK,url:r,deliveryDirectives:n})}onSubtitleTrackLoading(t,e){const{id:s,groupId:i,url:r,deliveryDirectives:n}=e
this.load({id:s,groupId:i,level:null,responseType:"text",type:jt.SUBTITLE_TRACK,url:r,deliveryDirectives:n})}load(t){var e
const s=this.hls.config
let i,r=this.getInternalLoader(t)
if(r){const e=r.context
if(e&&e.url===t.url)return void v.trace("[playlist-loader]: playlist request ongoing")
v.log(`[playlist-loader]: aborting previous loader for type: ${t.type}`),r.abort()}if(i=t.type===jt.MANIFEST?s.manifestLoadPolicy.default:u({},s.playlistLoadPolicy.default,{timeoutRetry:null,errorRetry:null}),r=this.createInternalLoader(t),null!=(e=t.deliveryDirectives)&&e.part){let e
if(t.type===jt.LEVEL&&null!==t.level?e=this.hls.levels[t.level].details:t.type===jt.AUDIO_TRACK&&null!==t.id?e=this.hls.audioTracks[t.id].details:t.type===jt.SUBTITLE_TRACK&&null!==t.id&&(e=this.hls.subtitleTracks[t.id].details),e){const t=e.partTarget,s=e.targetduration
if(t&&s){const e=1e3*Math.max(3*t,.8*s)
i=u({},i,{maxTimeToFirstByteMs:Math.min(e,i.maxTimeToFirstByteMs),maxLoadTimeMs:Math.min(e,i.maxTimeToFirstByteMs)})}}}const n=i.errorRetry||i.timeoutRetry||{},a={loadPolicy:i,timeout:i.maxLoadTimeMs,maxRetry:n.maxNumRetry||0,retryDelay:n.retryDelayMs||0,maxRetryDelay:n.maxRetryDelayMs||0},o={onSuccess:(t,e,s,i)=>{const r=this.getInternalLoader(s)
this.resetInternalLoader(s.type)
const n=t.data
0===n.indexOf("#EXTM3U")?(e.parsing.start=performance.now(),$t.isMediaPlaylist(n)?this.handleTrackOrLevelPlaylist(t,e,s,i||null,r):this.handleMasterPlaylist(t,e,s,i)):this.handleManifestParsingError(t,s,new Error("no EXTM3U delimiter"),i||null,e)},onError:(t,e,s,i)=>{this.handleNetworkError(e,s,!1,t,i)},onTimeout:(t,e,s)=>{this.handleNetworkError(e,s,!0,void 0,t)}}
r.load(t,a,o)}handleMasterPlaylist(t,e,s,i){const r=this.hls,n=t.data,a=Qt(t,s),o=$t.parseMasterPlaylist(n,a)
if(o.playlistParsingError)return void this.handleManifestParsingError(t,s,o.playlistParsingError,i,e)
const{contentSteering:l,levels:h,sessionData:d,sessionKeys:c,startTimeOffset:u,variableList:f}=o
this.variableList=f
const{AUDIO:m=[],SUBTITLES:p,"CLOSED-CAPTIONS":y}=$t.parseMasterPlaylistMedia(n,a,o)
m.length&&(m.some((t=>!t.url))||!h[0].audioCodec||h[0].attrs.AUDIO||(v.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"),m.unshift({type:"main",name:"main",groupId:"main",default:!1,autoselect:!1,forced:!1,id:-1,attrs:new A({}),bitrate:0,url:""}))),r.trigger(g.MANIFEST_LOADED,{levels:h,audioTracks:m,subtitles:p,captions:y,contentSteering:l,url:a,stats:e,networkDetails:i,sessionData:d,sessionKeys:c,startTimeOffset:u,variableList:f})}handleTrackOrLevelPlaylist(t,e,s,i,r){const n=this.hls,{id:a,level:o,type:l}=s,h=Qt(t,s),d=f(a)?a:0,c=f(o)?o:d,u=zt(s),m=$t.parseLevelPlaylist(t.data,h,c,u,d,this.variableList)
if(l===jt.MANIFEST){const t={attrs:new A({}),bitrate:0,details:m,name:"",url:h}
n.trigger(g.MANIFEST_LOADED,{levels:[t],audioTracks:[],url:h,stats:e,networkDetails:i,sessionData:null,sessionKeys:null,contentSteering:null,startTimeOffset:null,variableList:null})}e.parsing.end=performance.now(),s.levelDetails=m,this.handlePlaylistLoaded(m,t,e,s,i,r)}handleManifestParsingError(t,e,s,i,r){this.hls.trigger(g.ERROR,{type:m.NETWORK_ERROR,details:p.MANIFEST_PARSING_ERROR,fatal:e.type===jt.MANIFEST,url:t.url,err:s,error:s,reason:s.message,response:t,context:e,networkDetails:i,stats:r})}handleNetworkError(t,e,s=!1,i,r){let n=`A network ${s?"timeout":"error"+(i?" (status "+i.code+")":"")} occurred while loading ${t.type}`
t.type===jt.LEVEL?n+=`: ${t.level} id: ${t.id}`:t.type!==jt.AUDIO_TRACK&&t.type!==jt.SUBTITLE_TRACK||(n+=` id: ${t.id} group-id: "${t.groupId}"`)
const a=new Error(n)
v.warn(`[playlist-loader]: ${n}`)
let o=p.UNKNOWN,l=!1
const h=this.getInternalLoader(t)
switch(t.type){case jt.MANIFEST:o=s?p.MANIFEST_LOAD_TIMEOUT:p.MANIFEST_LOAD_ERROR,l=!0
break
case jt.LEVEL:o=s?p.LEVEL_LOAD_TIMEOUT:p.LEVEL_LOAD_ERROR,l=!1
break
case jt.AUDIO_TRACK:o=s?p.AUDIO_TRACK_LOAD_TIMEOUT:p.AUDIO_TRACK_LOAD_ERROR,l=!1
break
case jt.SUBTITLE_TRACK:o=s?p.SUBTITLE_TRACK_LOAD_TIMEOUT:p.SUBTITLE_LOAD_ERROR,l=!1}h&&this.resetInternalLoader(t.type)
const c={type:m.NETWORK_ERROR,details:o,fatal:l,url:t.url,loader:h,context:t,error:a,networkDetails:e,stats:r}
if(i){const s=(null==e?void 0:e.url)||t.url
c.response=d({url:s,data:void 0},i)}this.hls.trigger(g.ERROR,c)}handlePlaylistLoaded(t,e,s,i,r,n){const a=this.hls,{type:o,level:l,id:h,groupId:d,deliveryDirectives:c}=i,u=Qt(e,i),f=zt(i),y="number"==typeof i.level&&f===Xt.MAIN?l:void 0
if(!t.fragments.length){const t=new Error("No Segments found in Playlist")
return void a.trigger(g.ERROR,{type:m.NETWORK_ERROR,details:p.LEVEL_EMPTY_ERROR,fatal:!1,url:u,error:t,reason:t.message,response:e,context:i,level:y,parent:f,networkDetails:r,stats:s})}t.targetduration||(t.playlistParsingError=new Error("Missing Target Duration"))
const T=t.playlistParsingError
if(T)a.trigger(g.ERROR,{type:m.NETWORK_ERROR,details:p.LEVEL_PARSING_ERROR,fatal:!1,url:u,error:T,reason:T.message,response:e,context:i,level:y,parent:f,networkDetails:r,stats:s})
else switch(t.live&&n&&(n.getCacheAge&&(t.ageHeader=n.getCacheAge()||0),n.getCacheAge&&!isNaN(t.ageHeader)||(t.ageHeader=0)),o){case jt.MANIFEST:case jt.LEVEL:a.trigger(g.LEVEL_LOADED,{details:t,level:y||0,id:h||0,stats:s,networkDetails:r,deliveryDirectives:c})
break
case jt.AUDIO_TRACK:a.trigger(g.AUDIO_TRACK_LOADED,{details:t,id:h||0,groupId:d||"",stats:s,networkDetails:r,deliveryDirectives:c})
break
case jt.SUBTITLE_TRACK:a.trigger(g.SUBTITLE_TRACK_LOADED,{details:t,id:h||0,groupId:d||"",stats:s,networkDetails:r,deliveryDirectives:c})}}}function Zt(t,e){let s
try{s=new Event("addtrack")}catch(t){s=document.createEvent("Event"),s.initEvent("addtrack",!1,!1)}s.track=t,e.dispatchEvent(s)}function te(t,e){const s=t.mode
if("disabled"===s&&(t.mode="hidden"),t.cues&&!t.cues.getCueById(e.id))try{if(t.addCue(e),!t.cues.getCueById(e.id))throw new Error(`addCue is failed for: ${e}`)}catch(s){v.debug(`[texttrack-utils]: ${s}`)
const i=new self.TextTrackCue(e.startTime,e.endTime,e.text)
i.id=e.id,t.addCue(i)}"disabled"===s&&(t.mode=s)}function ee(t){const e=t.mode
if("disabled"===e&&(t.mode="hidden"),t.cues)for(let s=t.cues.length;s--;)t.removeCue(t.cues[s])
"disabled"===e&&(t.mode=e)}function se(t,e,s,i){const r=t.mode
if("disabled"===r&&(t.mode="hidden"),t.cues&&t.cues.length>0){const r=function(t,e,s){const i=[],r=function(t,e){if(e<t[0].startTime)return 0
const s=t.length-1
if(e>t[s].endTime)return-1
let i=0,r=s
for(;i<=r;){const n=Math.floor((r+i)/2)
if(e<t[n].startTime)r=n-1
else{if(!(e>t[n].startTime&&i<s))return n
i=n+1}}return t[i].startTime-e<e-t[r].startTime?i:r}(t,e)
if(r>-1)for(let n=r,a=t.length;n<a;n++){const r=t[n]
if(r.startTime>=e&&r.endTime<=s)i.push(r)
else if(r.startTime>s)return i}return i}(t.cues,e,s)
for(let e=0;e<r.length;e++)i&&!i(r[e])||t.removeCue(r[e])}"disabled"===r&&(t.mode=r)}var ie="org.id3",re="https://aomedia.org/emsg/ID3"
function ne(){if("undefined"!=typeof self)return self.WebKitDataCue||self.VTTCue||self.TextTrackCue}const ae=(()=>{const t=ne()
try{new t(0,Number.POSITIVE_INFINITY,"")}catch(t){return Number.MAX_VALUE}return Number.POSITIVE_INFINITY})()
function oe(t,e){return t.getTime()/1e3-e}class le{constructor(t){this.hls=void 0,this.id3Track=null,this.media=null,this.dateRangeCuesAppended={},this.hls=t,this._registerListeners()}destroy(){this._unregisterListeners(),this.id3Track=null,this.media=null,this.dateRangeCuesAppended={},this.hls=null}_registerListeners(){const{hls:t}=this
t.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.FRAG_PARSING_METADATA,this.onFragParsingMetadata,this),t.on(g.BUFFER_FLUSHING,this.onBufferFlushing,this),t.on(g.LEVEL_UPDATED,this.onLevelUpdated,this)}_unregisterListeners(){const{hls:t}=this
t.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.FRAG_PARSING_METADATA,this.onFragParsingMetadata,this),t.off(g.BUFFER_FLUSHING,this.onBufferFlushing,this),t.off(g.LEVEL_UPDATED,this.onLevelUpdated,this)}onMediaAttached(t,e){this.media=e.media}onMediaDetaching(){this.id3Track&&(ee(this.id3Track),this.id3Track=null,this.media=null,this.dateRangeCuesAppended={})}onManifestLoading(){this.dateRangeCuesAppended={}}createTrack(t){const e=this.getID3Track(t.textTracks)
return e.mode="hidden",e}getID3Track(t){if(this.media){for(let e=0;e<t.length;e++){const s=t[e]
if("metadata"===s.kind&&"id3"===s.label)return Zt(s,this.media),s}return this.media.addTextTrack("metadata","id3")}}onFragParsingMetadata(t,e){if(!this.media)return
const{hls:{config:{enableEmsgMetadataCues:s,enableID3MetadataCues:i}}}=this
if(!s&&!i)return
const{samples:r}=e
this.id3Track||(this.id3Track=this.createTrack(this.media))
const n=ne()
for(let a=0;a<r.length;a++){const t=r[a].type
if(t===re&&!s||!i)continue
const e=J(r[a].data)
if(e){const s=r[a].pts
let i=s+r[a].duration
i>ae&&(i=ae),i-s<=0&&(i=s+.25)
for(let r=0;r<e.length;r++){const a=e[r]
if(!z(a)){this.updateId3CueEnds(s)
const e=new n(s,i,"")
e.value=a,t&&(e.type=t),this.id3Track.addCue(e)}}}}}updateId3CueEnds(t){var e
const s=null==(e=this.id3Track)?void 0:e.cues
if(s)for(let i=s.length;i--;){const e=s[i]
e.startTime<t&&e.endTime===ae&&(e.endTime=t)}}onBufferFlushing(t,{startOffset:e,endOffset:s,type:i}){const{id3Track:r,hls:n}=this
if(!n)return
const{config:{enableEmsgMetadataCues:a,enableID3MetadataCues:o}}=n
if(r&&(a||o)){let t
t="audio"===i?t=>t.type===ie&&o:"video"===i?t=>t.type===re&&a:t=>t.type===ie&&o||t.type===re&&a,se(r,e,s,t)}}onLevelUpdated(t,{details:e}){if(!this.media||!e.hasProgramDateTime||!this.hls.config.enableDateRangeMetadataCues)return
const{dateRangeCuesAppended:s,id3Track:i}=this,{dateRanges:r}=e,n=Object.keys(r)
if(i){const t=Object.keys(s).filter((t=>!n.includes(t)))
for(let e=t.length;e--;){const r=t[e]
Object.keys(s[r].cues).forEach((t=>{i.removeCue(s[r].cues[t])})),delete s[r]}}const a=e.fragments[e.fragments.length-1]
if(0===n.length||!f(null==a?void 0:a.programDateTime))return
this.id3Track||(this.id3Track=this.createTrack(this.media))
const o=a.programDateTime/1e3-a.start,l=ne()
for(let c=0;c<n.length;c++){const t=n[c],e=r[t],i=s[t],a=(null==i?void 0:i.cues)||{}
let u=(null==i?void 0:i.durationKnown)||!1
const f=oe(e.startDate,o)
let g=ae
const m=e.endDate
if(m)g=oe(m,o),u=!0
else if(e.endOnNext&&!u){const t=n.reduce(((t,s)=>{const i=r[s]
return i.class===e.class&&i.id!==s&&i.startDate>e.startDate&&t.push(i),t}),[]).sort(((t,e)=>t.startDate.getTime()-e.startDate.getTime()))[0]
t&&(g=oe(t.startDate,o),u=!0)}const p=Object.keys(e.attr)
for(let s=0;s<p.length;s++){const r=p[s]
if("ID"===(d=r)||"CLASS"===d||"START-DATE"===d||"DURATION"===d||"END-DATE"===d||"END-ON-NEXT"===d)continue
let n=a[r]
if(n)u&&!i.durationKnown&&(n.endTime=g)
else{let s=e.attr[r]
n=new l(f,g,""),R(r)&&(h=s,s=Uint8Array.from(h.replace(/^0x/,"").replace(/([\da-fA-F]{2}) ?/g,"0x$1 ").replace(/ +$/,"").split(" ")).buffer),n.value={key:r,data:s},n.type="com.apple.quicktime.HLS",n.id=t,this.id3Track.addCue(n),a[r]=n}}s[t]={cues:a,dateRange:e,durationKnown:u}}var h,d}}class he{constructor(t){this.hls=void 0,this.config=void 0,this.media=null,this.levelDetails=null,this.currentTime=0,this.stallCount=0,this._latency=null,this.timeupdateHandler=()=>this.timeupdate(),this.hls=t,this.config=t.config,this.registerListeners()}get latency(){return this._latency||0}get maxLatency(){const{config:t,levelDetails:e}=this
return void 0!==t.liveMaxLatencyDuration?t.liveMaxLatencyDuration:e?t.liveMaxLatencyDurationCount*e.targetduration:0}get targetLatency(){const{levelDetails:t}=this
if(null===t)return null
const{holdBack:e,partHoldBack:s,targetduration:i}=t,{liveSyncDuration:r,liveSyncDurationCount:n,lowLatencyMode:a}=this.config,o=this.hls.userConfig
let l=a&&s||e;(o.liveSyncDuration||o.liveSyncDurationCount||0===l)&&(l=void 0!==r?r:n*i)
const h=i
return l+Math.min(1*this.stallCount,h)}get liveSyncPosition(){const t=this.estimateLiveEdge(),e=this.targetLatency,s=this.levelDetails
if(null===t||null===e||null===s)return null
const i=s.edge,r=t-e-this.edgeStalled,n=i-s.totalduration,a=i-(this.config.lowLatencyMode&&s.partTarget||s.targetduration)
return Math.min(Math.max(n,r),a)}get drift(){const{levelDetails:t}=this
return null===t?1:t.drift}get edgeStalled(){const{levelDetails:t}=this
if(null===t)return 0
const e=3*(this.config.lowLatencyMode&&t.partTarget||t.targetduration)
return Math.max(t.age-e,0)}get forwardBufferLength(){const{media:t,levelDetails:e}=this
if(!t||!e)return 0
const s=t.buffered.length
return(s?t.buffered.end(s-1):e.edge)-this.currentTime}destroy(){this.unregisterListeners(),this.onMediaDetaching(),this.levelDetails=null,this.hls=this.timeupdateHandler=null}registerListeners(){this.hls.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),this.hls.on(g.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.on(g.LEVEL_UPDATED,this.onLevelUpdated,this),this.hls.on(g.ERROR,this.onError,this)}unregisterListeners(){this.hls.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),this.hls.off(g.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.off(g.LEVEL_UPDATED,this.onLevelUpdated,this),this.hls.off(g.ERROR,this.onError,this)}onMediaAttached(t,e){this.media=e.media,this.media.addEventListener("timeupdate",this.timeupdateHandler)}onMediaDetaching(){this.media&&(this.media.removeEventListener("timeupdate",this.timeupdateHandler),this.media=null)}onManifestLoading(){this.levelDetails=null,this._latency=null,this.stallCount=0}onLevelUpdated(t,{details:e}){this.levelDetails=e,e.advanced&&this.timeupdate(),!e.live&&this.media&&this.media.removeEventListener("timeupdate",this.timeupdateHandler)}onError(t,e){var s
e.details===p.BUFFER_STALLED_ERROR&&(this.stallCount++,null!=(s=this.levelDetails)&&s.live&&v.warn("[playback-rate-controller]: Stall detected, adjusting target latency"))}timeupdate(){const{media:t,levelDetails:e}=this
if(!t||!e)return
this.currentTime=t.currentTime
const s=this.computeLatency()
if(null===s)return
this._latency=s
const{lowLatencyMode:i,maxLiveSyncPlaybackRate:r}=this.config
if(!i||1===r)return
const n=this.targetLatency
if(null===n)return
const a=s-n,o=a<Math.min(this.maxLatency,n+e.targetduration)
if(e.live&&o&&a>.05&&this.forwardBufferLength>1){const e=Math.min(2,Math.max(1,r)),s=Math.round(2/(1+Math.exp(-.75*a-this.edgeStalled))*20)/20
t.playbackRate=Math.min(e,Math.max(1,s))}else 1!==t.playbackRate&&0!==t.playbackRate&&(t.playbackRate=1)}estimateLiveEdge(){const{levelDetails:t}=this
return null===t?null:t.edge+t.age}computeLatency(){const t=this.estimateLiveEdge()
return null===t?null:t-this.currentTime}}const de=["NONE","TYPE-0","TYPE-1",null]
class ce{constructor(t,e,s){this.msn=void 0,this.part=void 0,this.skip=void 0,this.msn=t,this.part=e,this.skip=s}addDirectives(t){const e=new self.URL(t)
return void 0!==this.msn&&e.searchParams.set("_HLS_msn",this.msn.toString()),void 0!==this.part&&e.searchParams.set("_HLS_part",this.part.toString()),this.skip&&e.searchParams.set("_HLS_skip",this.skip),e.href}}class ue{constructor(t){this._attrs=void 0,this.audioCodec=void 0,this.bitrate=void 0,this.codecSet=void 0,this.height=void 0,this.id=void 0,this.name=void 0,this.videoCodec=void 0,this.width=void 0,this.unknownCodecs=void 0,this.audioGroupIds=void 0,this.details=void 0,this.fragmentError=0,this.loadError=0,this.loaded=void 0,this.realBitrate=0,this.textGroupIds=void 0,this.url=void 0,this._urlId=0,this.url=[t.url],this._attrs=[t.attrs],this.bitrate=t.bitrate,t.details&&(this.details=t.details),this.id=t.id||0,this.name=t.name,this.width=t.width||0,this.height=t.height||0,this.audioCodec=t.audioCodec,this.videoCodec=t.videoCodec,this.unknownCodecs=t.unknownCodecs,this.codecSet=[t.videoCodec,t.audioCodec].filter((t=>t)).join(",").replace(/\.[^.,]+/g,"")}get maxBitrate(){return Math.max(this.realBitrate,this.bitrate)}get attrs(){return this._attrs[this._urlId]}get pathwayId(){return this.attrs["PATHWAY-ID"]||"."}get uri(){return this.url[this._urlId]||""}get urlId(){return this._urlId}set urlId(t){const e=t%this.url.length
this._urlId!==e&&(this.fragmentError=0,this.loadError=0,this.details=void 0,this._urlId=e)}get audioGroupId(){var t
return null==(t=this.audioGroupIds)?void 0:t[this.urlId]}get textGroupId(){var t
return null==(t=this.textGroupIds)?void 0:t[this.urlId]}addFallback(t){this.url.push(t.url),this._attrs.push(t.attrs)}}function fe(t,e){const s=e.startPTS
if(f(s)){let i,r=0
e.sn>t.sn?(r=s-t.start,i=t):(r=t.start-s,i=e),i.duration!==r&&(i.duration=r)}else e.sn>t.sn?t.cc===e.cc&&t.minEndPTS?e.start=t.start+(t.minEndPTS-t.start):e.start=t.start+t.duration:e.start=Math.max(t.start-e.duration,0)}function ge(t,e,s,i,r,n){i-s<=0&&(v.warn("Fragment should have a positive duration",e),i=s+e.duration,n=r+e.duration)
let a=s,o=i
const l=e.startPTS,h=e.endPTS
if(f(l)){const t=Math.abs(l-s)
f(e.deltaPTS)?e.deltaPTS=Math.max(t,e.deltaPTS):e.deltaPTS=t,a=Math.max(s,l),s=Math.min(s,l),r=Math.min(r,e.startDTS),o=Math.min(i,h),i=Math.max(i,h),n=Math.max(n,e.endDTS)}const d=s-e.start
0!==e.start&&(e.start=s),e.duration=i-e.start,e.startPTS=s,e.maxStartPTS=a,e.startDTS=r,e.endPTS=i,e.minEndPTS=o,e.endDTS=n
const c=e.sn
if(!t||c<t.startSN||c>t.endSN)return 0
let u
const g=c-t.startSN,m=t.fragments
for(m[g]=e,u=g;u>0;u--)fe(m[u],m[u-1])
for(u=g;u<m.length-1;u++)fe(m[u],m[u+1])
return t.fragmentHint&&fe(m[m.length-1],t.fragmentHint),t.PTSKnown=t.alignedSliding=!0,d}function me(t,e){const s=e.startSN+e.skippedSegments-t.startSN,i=t.fragments
s<0||s>=i.length||pe(e,i[s].start)}function pe(t,e){if(e){const s=t.fragments
for(let i=t.skippedSegments;i<s.length;i++)s[i].start+=e
t.fragmentHint&&(t.fragmentHint.start+=e)}}function ye(t,e,s){var i
return null!=t&&t.details?Te(null==(i=t.details)?void 0:i.partList,e,s):null}function Te(t,e,s){if(t)for(let i=t.length;i--;){const r=t[i]
if(r.index===s&&r.fragment.sn===e)return r}return null}function Ee(t){switch(t.details){case p.FRAG_LOAD_TIMEOUT:case p.KEY_LOAD_TIMEOUT:case p.LEVEL_LOAD_TIMEOUT:case p.MANIFEST_LOAD_TIMEOUT:return!0}return!1}function ve(t,e){const s=Ee(e)
return t.default[(s?"timeout":"error")+"Retry"]}function Se(t,e){const s="linear"===t.backoff?1:Math.pow(2,e)
return Math.min(s*t.retryDelayMs,t.maxRetryDelayMs)}function Le(t){return d(d({},t),{errorRetry:null,timeoutRetry:null})}function Ae(t,e,s,i){return!!t&&e<t.maxNumRetry&&(function(t){return 0===t&&!1===navigator.onLine||!!t&&(t<400||t>499)}(i)||!!s)}const Re={search:function(t,e){let s=0,i=t.length-1,r=null,n=null
for(;s<=i;){r=(s+i)/2|0,n=t[r]
const a=e(n)
if(a>0)s=r+1
else{if(!(a<0))return n
i=r-1}}return null}}
function be(t,e,s=0,i=0){let r=null
if(t?r=e[t.sn-e[0].sn+1]||null:0===s&&0===e[0].start&&(r=e[0]),r&&0===Ie(s,i,r))return r
const n=Re.search(e,Ie.bind(null,s,i))
return!n||n===t&&r?r:n}function Ie(t=0,e=0,s){if(s.start<=t&&s.start+s.duration>t)return 0
const i=Math.min(e,s.duration+(s.deltaPTS?s.deltaPTS:0))
return s.start+s.duration-i<=t?1:s.start-i>t&&s.start?-1:0}function De(t,e,s){const i=1e3*Math.min(e,s.duration+(s.deltaPTS?s.deltaPTS:0))
return(s.endProgramDateTime||0)-i>t}function ke(t,e,s){if(performance.now()-t.lastErrorPerfMs>3e5)return!0
const i=t.details
if(e.details===p.FRAG_GAP&&i&&e.frag){const t=e.frag.start,s=be(null,i.fragments,t)
if(s&&!s.gap)return!0}if(s&&t.errors.length<s.errors.length){const s=t.errors[t.errors.length-1]
if(i&&s.frag&&e.frag&&Math.abs(s.frag.start-e.frag.start)>3*i.targetduration)return!0}return!1}class we{constructor(t,e){this.hls=void 0,this.timer=-1,this.requestScheduled=-1,this.canLoad=!1,this.log=void 0,this.warn=void 0,this.log=v.log.bind(v,`${e}:`),this.warn=v.warn.bind(v,`${e}:`),this.hls=t}destroy(){this.clearTimer(),this.hls=this.log=this.warn=null}clearTimer(){clearTimeout(this.timer),this.timer=-1}startLoad(){this.canLoad=!0,this.requestScheduled=-1,this.loadPlaylist()}stopLoad(){this.canLoad=!1,this.clearTimer()}switchParams(t,e){const s=null==e?void 0:e.renditionReports
if(s){let i=-1
for(let r=0;r<s.length;r++){const n=s[r]
let a
try{a=new self.URL(n.URI,e.url).href}catch(t){v.warn(`Could not construct new URL for Rendition Report: ${t}`),a=n.URI||""}if(a===t){i=r
break}a===t.substring(0,a.length)&&(i=r)}if(-1!==i){const t=s[i],r=parseInt(t["LAST-MSN"])||(null==e?void 0:e.lastPartSn)
let n=parseInt(t["LAST-PART"])||(null==e?void 0:e.lastPartIndex)
if(this.hls.config.lowLatencyMode){const t=Math.min(e.age-e.partTarget,e.targetduration)
n>=0&&t>e.partTarget&&(n+=1)}return new ce(r,n>=0?n:void 0,"")}}}loadPlaylist(t){-1===this.requestScheduled&&(this.requestScheduled=self.performance.now())}shouldLoadPlaylist(t){return this.canLoad&&!!t&&!!t.url&&(!t.details||t.details.live)}shouldReloadPlaylist(t){return-1===this.timer&&-1===this.requestScheduled&&this.shouldLoadPlaylist(t)}playlistLoaded(t,e,s){const{details:i,stats:r}=e,n=self.performance.now(),a=r.loading.first?Math.max(0,n-r.loading.first):0
if(i.advancedDateTime=Date.now()-a,i.live||null!=s&&s.live){if(i.reloaded(s),s&&this.log(`live playlist ${t} ${i.advanced?"REFRESHED "+i.lastPartSn+"-"+i.lastPartIndex:"MISSED"}`),s&&i.fragments.length>0&&function(t,e){let s=null
const i=t.fragments
for(let l=i.length-1;l>=0;l--){const t=i[l].initSegment
if(t){s=t
break}}t.fragmentHint&&delete t.fragmentHint.endPTS
let r,n=0
if(function(t,e,s){const i=e.skippedSegments,r=Math.max(t.startSN,e.startSN)-e.startSN,n=(t.fragmentHint?1:0)+(i?e.endSN:Math.min(t.endSN,e.endSN))-e.startSN,a=e.startSN-t.startSN,o=e.fragmentHint?e.fragments.concat(e.fragmentHint):e.fragments,l=t.fragmentHint?t.fragments.concat(t.fragmentHint):t.fragments
for(let h=r;h<=n;h++){const t=l[a+h]
let r=o[h]
i&&!r&&h<i&&(r=e.fragments[h]=t),t&&r&&s(t,r)}}(t,e,((t,i)=>{t.relurl&&(n=t.cc-i.cc),f(t.startPTS)&&f(t.endPTS)&&(i.start=i.startPTS=t.startPTS,i.startDTS=t.startDTS,i.maxStartPTS=t.maxStartPTS,i.endPTS=t.endPTS,i.endDTS=t.endDTS,i.minEndPTS=t.minEndPTS,i.duration=t.endPTS-t.startPTS,i.duration&&(r=i),e.PTSKnown=e.alignedSliding=!0),i.elementaryStreams=t.elementaryStreams,i.loader=t.loader,i.stats=t.stats,i.urlId=t.urlId,t.initSegment&&(i.initSegment=t.initSegment,s=t.initSegment)})),s&&(e.fragmentHint?e.fragments.concat(e.fragmentHint):e.fragments).forEach((t=>{var e
t.initSegment&&t.initSegment.relurl!==(null==(e=s)?void 0:e.relurl)||(t.initSegment=s)})),e.skippedSegments)if(e.deltaUpdateFailed=e.fragments.some((t=>!t)),e.deltaUpdateFailed){v.warn("[level-helper] Previous playlist missing segments skipped in delta playlist")
for(let t=e.skippedSegments;t--;)e.fragments.shift()
e.startSN=e.fragments[0].sn,e.startCC=e.fragments[0].cc}else e.canSkipDateRanges&&(e.dateRanges=function(t,e,s){const i=u({},t)
return s&&s.forEach((t=>{delete i[t]})),Object.keys(e).forEach((t=>{const s=new b(e[t].attr,i[t])
s.isValid?i[t]=s:v.warn(`Ignoring invalid Playlist Delta Update DATERANGE tag: "${JSON.stringify(e[t].attr)}"`)})),i}(t.dateRanges,e.dateRanges,e.recentlyRemovedDateranges))
const a=e.fragments
if(n){v.warn("discontinuity sliding from playlist, take drift into account")
for(let t=0;t<a.length;t++)a[t].cc+=n}e.skippedSegments&&(e.startCC=e.fragments[0].cc),function(t,e,s){if(t&&e){let i=0
for(let r=0,n=t.length;r<=n;r++){const n=t[r],a=e[r+i]
n&&a&&n.index===a.index&&n.fragment.sn===a.fragment.sn?s(n,a):i--}}}(t.partList,e.partList,((t,e)=>{e.elementaryStreams=t.elementaryStreams,e.stats=t.stats})),r?ge(e,r,r.startPTS,r.endPTS,r.startDTS,r.endDTS):me(t,e),a.length&&(e.totalduration=e.edge-a[0].start),e.driftStartTime=t.driftStartTime,e.driftStart=t.driftStart
const o=e.advancedDateTime
if(e.advanced&&o){const t=e.edge
e.driftStart||(e.driftStartTime=o,e.driftStart=t),e.driftEndTime=o,e.driftEnd=t}else e.driftEndTime=t.driftEndTime,e.driftEnd=t.driftEnd,e.advancedDateTime=t.advancedDateTime}(s,i),!this.canLoad||!i.live)return
let a,o,l
if(i.canBlockReload&&i.endSN&&i.advanced){const t=this.hls.config.lowLatencyMode,r=i.lastPartSn,n=i.endSN,h=i.lastPartIndex,d=r===n;-1!==h?(o=d?n+1:r,l=d?t?0:h:h+1):o=n+1
const c=i.age,u=c+i.ageHeader
let f=Math.min(u-i.partTarget,1.5*i.targetduration)
if(f>0){if(s&&f>s.tuneInGoal)this.warn(`CDN Tune-in goal increased from: ${s.tuneInGoal} to: ${f} with playlist age: ${i.age}`),f=0
else{const t=Math.floor(f/i.targetduration)
o+=t,void 0!==l&&(l+=Math.round(f%i.targetduration/i.partTarget)),this.log(`CDN Tune-in age: ${i.ageHeader}s last advanced ${c.toFixed(2)}s goal: ${f} skip sn ${t} to part ${l}`)}i.tuneInGoal=f}if(a=this.getDeliveryDirectives(i,e.deliveryDirectives,o,l),t||!d)return void this.loadPlaylist(a)}else i.canBlockReload&&(a=this.getDeliveryDirectives(i,e.deliveryDirectives,o,l))
const h=this.hls.mainForwardBufferInfo,d=h?h.end-h.len:0,c=function(t,e=1/0){let s=1e3*t.targetduration
if(t.updated){const i=t.fragments,r=4
if(i.length&&s*r>e){const t=1e3*i[i.length-1].duration
t<s&&(s=t)}}else s/=2
return Math.round(s)}(i,1e3*(i.edge-d))
i.updated&&n>this.requestScheduled+c&&(this.requestScheduled=r.loading.start),void 0!==o&&i.canBlockReload?this.requestScheduled=r.loading.first+c-(1e3*i.partTarget||1e3):-1===this.requestScheduled||this.requestScheduled+c<n?this.requestScheduled=n:this.requestScheduled-n<=0&&(this.requestScheduled+=c)
let g=this.requestScheduled-n
g=Math.max(0,g),this.log(`reload live playlist ${t} in ${Math.round(g)} ms`),this.timer=self.setTimeout((()=>this.loadPlaylist(a)),g)}else this.clearTimer()}getDeliveryDirectives(t,e,s,i){let r=function(t,e){const{canSkipUntil:s,canSkipDateRanges:i,endSN:r}=t
return s&&(void 0!==e?e-r:0)<s?i?"v2":"YES":""}(t,s)
return null!=e&&e.skip&&t.deltaUpdateFailed&&(s=e.msn,i=e.part,r=""),new ce(s,i,r)}checkRetry(t){const e=t.details,s=Ee(t),i=t.errorAction,{action:r,retryCount:n=0,retryConfig:a}=i||{},o=5===r&&!!i&&!!a
if(o){var l
if(this.requestScheduled=-1,s&&null!=(l=t.context)&&l.deliveryDirectives)this.warn(`Retrying playlist loading ${n+1}/${a.maxNumRetry} after "${e}" without delivery-directives`),this.loadPlaylist()
else{const t=Se(a,n)
this.timer=self.setTimeout((()=>this.loadPlaylist()),t),this.warn(`Retrying playlist loading ${n+1}/${a.maxNumRetry} after "${e}" in ${t}ms`)}t.levelRetry=!0,i.resolved=!0}return o}}let Ce
class _e extends we{constructor(t,e){super(t,"[level-controller]"),this._levels=[],this._firstLevel=-1,this._startLevel=void 0,this.currentLevel=null,this.currentLevelIndex=-1,this.manualLevelIndex=-1,this.steering=void 0,this.onParsedComplete=void 0,this.steering=e,this._registerListeners()}_registerListeners(){const{hls:t}=this
t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.MANIFEST_LOADED,this.onManifestLoaded,this),t.on(g.LEVEL_LOADED,this.onLevelLoaded,this),t.on(g.LEVELS_UPDATED,this.onLevelsUpdated,this),t.on(g.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),t.on(g.FRAG_LOADED,this.onFragLoaded,this),t.on(g.ERROR,this.onError,this)}_unregisterListeners(){const{hls:t}=this
t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.MANIFEST_LOADED,this.onManifestLoaded,this),t.off(g.LEVEL_LOADED,this.onLevelLoaded,this),t.off(g.LEVELS_UPDATED,this.onLevelsUpdated,this),t.off(g.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),t.off(g.FRAG_LOADED,this.onFragLoaded,this),t.off(g.ERROR,this.onError,this)}destroy(){this._unregisterListeners(),this.steering=null,this.resetLevels(),super.destroy()}startLoad(){this._levels.forEach((t=>{t.loadError=0,t.fragmentError=0})),super.startLoad()}resetLevels(){this._startLevel=void 0,this.manualLevelIndex=-1,this.currentLevelIndex=-1,this.currentLevel=null,this._levels=[]}onManifestLoading(t,e){this.resetLevels()}onManifestLoaded(t,e){const s=[],i={}
let r
e.levels.forEach((t=>{var e
const n=t.attrs;-1!==(null==(e=t.audioCodec)?void 0:e.indexOf("mp4a.40.34"))&&(Ce||(Ce=/chrome|firefox/i.test(navigator.userAgent)),Ce&&(t.audioCodec=void 0))
const{AUDIO:a,CODECS:o,"FRAME-RATE":l,"PATHWAY-ID":h,RESOLUTION:d,SUBTITLES:c}=n,u=`${h||"."}-${t.bitrate}-${d}-${l}-${o}`
r=i[u],r?r.addFallback(t):(r=new ue(t),i[u]=r,s.push(r)),Pe(r,"audio",a),Pe(r,"text",c)})),this.filterAndSortMediaOptions(s,e)}filterAndSortMediaOptions(t,e){let s=[],i=[],r=!1,n=!1,a=!1,o=t.filter((({audioCodec:t,videoCodec:e,width:s,height:i,unknownCodecs:o})=>(r||(r=!(!s||!i)),n||(n=!!e),a||(a=!!t),!(null!=o&&o.length)&&(!t||Ft(t,"audio"))&&(!e||Ft(e,"video")))))
if((r||n)&&a&&(o=o.filter((({videoCodec:t,width:e,height:s})=>!!t||!(!e||!s)))),0===o.length)return void Promise.resolve().then((()=>{if(this.hls){const t=new Error("no level with compatible codecs found in manifest")
this.hls.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.MANIFEST_INCOMPATIBLE_CODECS_ERROR,fatal:!0,url:e.url,error:t,reason:t.message})}}))
e.audioTracks&&(s=e.audioTracks.filter((t=>!t.audioCodec||Ft(t.audioCodec,"audio"))),xe(s)),e.subtitles&&(i=e.subtitles,xe(i))
const l=o.slice(0)
o.sort(((t,e)=>t.attrs["HDCP-LEVEL"]!==e.attrs["HDCP-LEVEL"]?(t.attrs["HDCP-LEVEL"]||"")>(e.attrs["HDCP-LEVEL"]||"")?1:-1:t.bitrate!==e.bitrate?t.bitrate-e.bitrate:t.attrs["FRAME-RATE"]!==e.attrs["FRAME-RATE"]?t.attrs.decimalFloatingPoint("FRAME-RATE")-e.attrs.decimalFloatingPoint("FRAME-RATE"):t.attrs.SCORE!==e.attrs.SCORE?t.attrs.decimalFloatingPoint("SCORE")-e.attrs.decimalFloatingPoint("SCORE"):r&&t.height!==e.height?t.height-e.height:0))
let h=l[0]
if(this.steering&&(o=this.steering.filterParsedLevels(o),o.length!==l.length))for(let u=0;u<l.length;u++)if(l[u].pathwayId===o[0].pathwayId){h=l[u]
break}this._levels=o
for(let u=0;u<o.length;u++)if(o[u]===h){this._firstLevel=u,this.log(`manifest loaded, ${o.length} level(s) found, first bitrate: ${h.bitrate}`)
break}const d=a&&!n,c={levels:o,audioTracks:s,subtitleTracks:i,sessionData:e.sessionData,sessionKeys:e.sessionKeys,firstLevel:this._firstLevel,stats:e.stats,audio:a,video:n,altAudio:!d&&s.some((t=>!!t.url))}
this.hls.trigger(g.MANIFEST_PARSED,c),(this.hls.config.autoStartLoad||this.hls.forceStartLoad)&&this.hls.startLoad(this.hls.config.startPosition)}get levels(){return 0===this._levels.length?null:this._levels}get level(){return this.currentLevelIndex}set level(t){const e=this._levels
if(0===e.length)return
if(t<0||t>=e.length){const s=new Error("invalid level idx"),i=t<0
if(this.hls.trigger(g.ERROR,{type:m.OTHER_ERROR,details:p.LEVEL_SWITCH_ERROR,level:t,fatal:i,error:s,reason:s.message}),i)return
t=Math.min(t,e.length-1)}const s=this.currentLevelIndex,i=this.currentLevel,r=i?i.attrs["PATHWAY-ID"]:void 0,n=e[t],a=n.attrs["PATHWAY-ID"]
if(this.currentLevelIndex=t,this.currentLevel=n,s===t&&n.details&&i&&r===a)return
this.log(`Switching to level ${t}${a?" with Pathway "+a:""} from level ${s}${r?" with Pathway "+r:""}`)
const o=u({},n,{level:t,maxBitrate:n.maxBitrate,attrs:n.attrs,uri:n.uri,urlId:n.urlId})
delete o._attrs,delete o._urlId,this.hls.trigger(g.LEVEL_SWITCHING,o)
const l=n.details
if(!l||l.live){const t=this.switchParams(n.uri,null==i?void 0:i.details)
this.loadPlaylist(t)}}get manualLevel(){return this.manualLevelIndex}set manualLevel(t){this.manualLevelIndex=t,void 0===this._startLevel&&(this._startLevel=t),-1!==t&&(this.level=t)}get firstLevel(){return this._firstLevel}set firstLevel(t){this._firstLevel=t}get startLevel(){if(void 0===this._startLevel){const t=this.hls.config.startLevel
return void 0!==t?t:this._firstLevel}return this._startLevel}set startLevel(t){this._startLevel=t}onError(t,e){!e.fatal&&e.context&&e.context.type===jt.LEVEL&&e.context.level===this.level&&this.checkRetry(e)}onFragLoaded(t,{frag:e}){if(void 0!==e&&e.type===Xt.MAIN){const t=this._levels[e.level]
void 0!==t&&(t.loadError=0)}}onLevelLoaded(t,e){var s
const{level:i,details:r}=e,n=this._levels[i]
var a
if(!n)return this.warn(`Invalid level index ${i}`),void(null!=(a=e.deliveryDirectives)&&a.skip&&(r.deltaUpdateFailed=!0))
i===this.currentLevelIndex?(0===n.fragmentError&&(n.loadError=0),this.playlistLoaded(i,e,n.details)):null!=(s=e.deliveryDirectives)&&s.skip&&(r.deltaUpdateFailed=!0)}onAudioTrackSwitched(t,e){const s=this.currentLevel
if(!s)return
const i=this.hls.audioTracks[e.id].groupId
if(s.audioGroupIds&&s.audioGroupId!==i){let t=-1
for(let e=0;e<s.audioGroupIds.length;e++)if(s.audioGroupIds[e]===i){t=e
break}-1!==t&&t!==s.urlId&&(s.urlId=t,this.canLoad&&this.startLoad())}}loadPlaylist(t){super.loadPlaylist()
const e=this.currentLevelIndex,s=this.currentLevel
if(s&&this.shouldLoadPlaylist(s)){const i=s.urlId
let r=s.uri
if(t)try{r=t.addDirectives(r)}catch(t){this.warn(`Could not construct new URL with HLS Delivery Directives: ${t}`)}const n=s.attrs["PATHWAY-ID"]
this.log(`Loading level index ${e}${void 0!==(null==t?void 0:t.msn)?" at sn "+t.msn+" part "+t.part:""} with${n?" Pathway "+n:""} URI ${i+1}/${s.url.length} ${r}`),this.clearTimer(),this.hls.trigger(g.LEVEL_LOADING,{url:r,level:e,id:i,deliveryDirectives:t||null})}}get nextLoadLevel(){return-1!==this.manualLevelIndex?this.manualLevelIndex:this.hls.nextAutoLevel}set nextLoadLevel(t){this.level=t,-1===this.manualLevelIndex&&(this.hls.nextAutoLevel=t)}removeLevel(t,e){const s=(t,s)=>s!==e,i=this._levels.filter(((i,r)=>r!==t||(i.url.length>1&&void 0!==e?(i.url=i.url.filter(s),i.audioGroupIds&&(i.audioGroupIds=i.audioGroupIds.filter(s)),i.textGroupIds&&(i.textGroupIds=i.textGroupIds.filter(s)),i.urlId=0,!0):(this.steering&&this.steering.removeLevel(i),!1))))
this.hls.trigger(g.LEVELS_UPDATED,{levels:i})}onLevelsUpdated(t,{levels:e}){e.forEach(((t,e)=>{const{details:s}=t
null!=s&&s.fragments&&s.fragments.forEach((t=>{t.level=e}))})),this._levels=e}}function Pe(t,e,s){s&&("audio"===e?(t.audioGroupIds||(t.audioGroupIds=[]),t.audioGroupIds[t.url.length-1]=s):"text"===e&&(t.textGroupIds||(t.textGroupIds=[]),t.textGroupIds[t.url.length-1]=s))}function xe(t){const e={}
t.forEach((t=>{const s=t.groupId||""
t.id=e[s]=e[s]||0,e[s]++}))}var Fe="NOT_LOADED",Oe="APPENDING",Me="PARTIAL",Ne="OK"
class Ue{constructor(t){this.mainFragEntity=null,this.activeParts=null,this.endListFragments=Object.create(null),this.fragments=Object.create(null),this.timeRanges=Object.create(null),this.bufferPadding=.2,this.hls=void 0,this.hasGaps=!1,this.hls=t,this._registerListeners()}_registerListeners(){const{hls:t}=this
t.on(g.BUFFER_APPENDED,this.onBufferAppended,this),t.on(g.FRAG_BUFFERED,this.onFragBuffered,this),t.on(g.FRAG_LOADED,this.onFragLoaded,this)}_unregisterListeners(){const{hls:t}=this
t.off(g.BUFFER_APPENDED,this.onBufferAppended,this),t.off(g.FRAG_BUFFERED,this.onFragBuffered,this),t.off(g.FRAG_LOADED,this.onFragLoaded,this)}destroy(){this._unregisterListeners(),this.fragments=this.endListFragments=this.timeRanges=this.mainFragEntity=this.activeParts=null}getAppendedFrag(t,e){if(e===Xt.MAIN){const{mainFragEntity:e,activeParts:s}=this
if(e)if(e&&s)for(let i=s.length;i--;){const r=s[i],n=r?r.end:e.appendedPTS
if(r.start<=t&&null!==n&&t<=n)return i>9&&(this.activeParts=s.slice(i-9)),r}else if(e.body.start<=t&&null!==e.appendedPTS&&t<=e.appendedPTS)return e.body}return this.getBufferedFrag(t,e)}getBufferedFrag(t,e){const{fragments:s}=this,i=Object.keys(s)
for(let r=i.length;r--;){const n=s[i[r]]
if((null==n?void 0:n.body.type)===e&&n.buffered){const e=n.body
if(e.start<=t&&t<=e.end)return e}}return null}detectEvictedFragments(t,e,s){this.timeRanges&&(this.timeRanges[t]=e),Object.keys(this.fragments).forEach((i=>{const r=this.fragments[i]
if(!r)return
if(!r.buffered&&!r.loaded)return void(r.body.type===s&&this.removeFragment(r.body))
const n=r.range[t]
n&&n.time.some((t=>{const s=!this.isTimeBuffered(t.startPTS,t.endPTS,e)
return s&&this.removeFragment(r.body),s}))}))}detectPartialFragments(t){const e=this.timeRanges,{frag:s,part:i}=t
if(!e||"initSegment"===s.sn)return
const r=$e(s),n=this.fragments[r]
n&&(Object.keys(e).forEach((t=>{const r=s.elementaryStreams[t]
if(!r)return
const a=e[t],o=null!==i||!0===r.partial
n.range[t]=this.getBufferedTimes(s,i,o,a)})),n.loaded=null,Object.keys(n.range).length?(n.buffered=!0,n.body.endList&&(this.endListFragments[n.body.type]=n)):this.removeFragment(n.body))}fragBuffered(t,e){const s=$e(t)
let i=this.fragments[s]
!i&&e&&(i=this.fragments[s]={body:t,appendedPTS:null,loaded:null,buffered:!1,range:Object.create(null)},t.gap&&(this.hasGaps=!0)),i&&(i.loaded=null,i.buffered=!0)}getBufferedTimes(t,e,s,i){const r={time:[],partial:s},n=e?e.start:t.start,a=e?e.end:t.end,o=t.minEndPTS||a,l=t.maxStartPTS||n
for(let h=0;h<i.length;h++){const t=i.start(h)-this.bufferPadding,e=i.end(h)+this.bufferPadding
if(l>=t&&o<=e){r.time.push({startPTS:Math.max(n,i.start(h)),endPTS:Math.min(a,i.end(h))})
break}if(n<e&&a>t)r.partial=!0,r.time.push({startPTS:Math.max(n,i.start(h)),endPTS:Math.min(a,i.end(h))})
else if(a<=t)break}return r}getPartialFragment(t){let e,s,i,r=null,n=0
const{bufferPadding:a,fragments:o}=this
return Object.keys(o).forEach((l=>{const h=o[l]
h&&Be(h)&&(s=h.body.start-a,i=h.body.end+a,t>=s&&t<=i&&(e=Math.min(t-s,i-t),n<=e&&(r=h.body,n=e)))})),r}isEndListAppended(t){const e=this.endListFragments[t]
return void 0!==e&&(e.buffered||Be(e))}getState(t){const e=$e(t),s=this.fragments[e]
return s?s.buffered?Be(s)?Me:Ne:Oe:Fe}isTimeBuffered(t,e,s){let i,r
for(let n=0;n<s.length;n++){if(i=s.start(n)-this.bufferPadding,r=s.end(n)+this.bufferPadding,t>=i&&e<=r)return!0
if(e<=i)return!1}return!1}onFragLoaded(t,e){const{frag:s,part:i}=e
if("initSegment"===s.sn||s.bitrateTest||i)return
const r=$e(s)
this.fragments[r]={body:s,appendedPTS:null,loaded:e,buffered:!1,range:Object.create(null)}}onBufferAppended(t,e){const{frag:s,part:i,timeRanges:r}=e
let n=this.mainFragEntity
if(s.type===Xt.MAIN){const t=n?n.body:null
if(t!==s){n&&t&&t.sn!==s.sn&&(n.buffered=!0,this.fragments[$e(t)]=n)
const e=$e(s)
n=this.mainFragEntity=this.fragments[e]||{body:s,appendedPTS:null,loaded:null,buffered:!1,range:Object.create(null)}}if(i){let t=this.activeParts
t||(this.activeParts=t=[]),t.push(i)}else this.activeParts=null}this.timeRanges=r,Object.keys(r).forEach((t=>{const e=r[t]
if(this.detectEvictedFragments(t,e),!i&&n){const i=s.elementaryStreams[t]
if(!i)return
for(let t=0;t<e.length;t++){const s=e.end(t)
s<=i.endPTS&&s>i.startPTS?n.appendedPTS=Math.max(s,n.appendedPTS||0):n.appendedPTS=i.endPTS}}}))}onFragBuffered(t,e){this.detectPartialFragments(e)}hasFragment(t){const e=$e(t)
return!!this.fragments[e]}removeFragmentsInRange(t,e,s,i,r){i&&!this.hasGaps||Object.keys(this.fragments).forEach((n=>{const a=this.fragments[n]
if(!a)return
const o=a.body
o.type!==s||i&&!o.gap||o.start<e&&o.end>t&&(a.buffered||r)&&this.removeFragment(o)}))}removeFragment(t){const e=$e(t)
t.stats.loaded=0,t.clearElementaryStreamInfo(),this.mainFragEntity===this.fragments[e]&&(this.mainFragEntity=null),delete this.fragments[e],t.endList&&delete this.endListFragments[t.type]}removeAllFragments(){this.fragments=Object.create(null),this.endListFragments=Object.create(null),this.mainFragEntity=null,this.activeParts=null,this.hasGaps=!1}}function Be(t){var e,s
return t.buffered&&(t.body.gap||(null==(e=t.range.video)?void 0:e.partial)||(null==(s=t.range.audio)?void 0:s.partial))}function $e(t){return`${t.type}_${t.level}_${t.urlId}_${t.sn}`}const Ge=Math.pow(2,17)
class Ke{constructor(t){this.config=void 0,this.loader=null,this.partLoadTimeout=-1,this.config=t}destroy(){this.loader&&(this.loader.destroy(),this.loader=null)}abort(){this.loader&&this.loader.abort()}load(t,e){const s=t.url
if(!s)return Promise.reject(new Ye({type:m.NETWORK_ERROR,details:p.FRAG_LOAD_ERROR,fatal:!1,frag:t,error:new Error("Fragment does not have a "+(s?"part list":"url")),networkDetails:null}))
this.abort()
const i=this.config,r=i.fLoader,n=i.loader
return new Promise(((a,o)=>{if(this.loader&&this.loader.destroy(),t.gap)return void o(Ve(t))
const l=this.loader=t.loader=r?new r(i):new n(i),h=He(t),c=Le(i.fragLoadPolicy.default),u={loadPolicy:c,timeout:c.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0,highWaterMark:"initSegment"===t.sn?1/0:Ge}
t.stats=l.stats,l.load(h,u,{onSuccess:(e,s,i,r)=>{this.resetLoader(t,l)
let n=e.data
i.resetIV&&t.decryptdata&&(t.decryptdata.iv=new Uint8Array(n.slice(0,16)),n=n.slice(16)),a({frag:t,part:null,payload:n,networkDetails:r})},onError:(e,i,r,n)=>{this.resetLoader(t,l),o(new Ye({type:m.NETWORK_ERROR,details:p.FRAG_LOAD_ERROR,fatal:!1,frag:t,response:d({url:s,data:void 0},e),error:new Error(`HTTP Error ${e.code} ${e.text}`),networkDetails:r,stats:n}))},onAbort:(e,s,i)=>{this.resetLoader(t,l),o(new Ye({type:m.NETWORK_ERROR,details:p.INTERNAL_ABORTED,fatal:!1,frag:t,error:new Error("Aborted"),networkDetails:i,stats:e}))},onTimeout:(e,s,i)=>{this.resetLoader(t,l),o(new Ye({type:m.NETWORK_ERROR,details:p.FRAG_LOAD_TIMEOUT,fatal:!1,frag:t,error:new Error(`Timeout after ${u.timeout}ms`),networkDetails:i,stats:e}))},onProgress:(s,i,r,n)=>{e&&e({frag:t,part:null,payload:r,networkDetails:n})}})}))}loadPart(t,e,s){this.abort()
const i=this.config,r=i.fLoader,n=i.loader
return new Promise(((a,o)=>{if(this.loader&&this.loader.destroy(),t.gap||e.gap)return void o(Ve(t,e))
const l=this.loader=t.loader=r?new r(i):new n(i),h=He(t,e),c=Le(i.fragLoadPolicy.default),u={loadPolicy:c,timeout:c.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0,highWaterMark:Ge}
e.stats=l.stats,l.load(h,u,{onSuccess:(i,r,n,o)=>{this.resetLoader(t,l),this.updateStatsFromPart(t,e)
const h={frag:t,part:e,payload:i.data,networkDetails:o}
s(h),a(h)},onError:(s,i,r,n)=>{this.resetLoader(t,l),o(new Ye({type:m.NETWORK_ERROR,details:p.FRAG_LOAD_ERROR,fatal:!1,frag:t,part:e,response:d({url:h.url,data:void 0},s),error:new Error(`HTTP Error ${s.code} ${s.text}`),networkDetails:r,stats:n}))},onAbort:(s,i,r)=>{t.stats.aborted=e.stats.aborted,this.resetLoader(t,l),o(new Ye({type:m.NETWORK_ERROR,details:p.INTERNAL_ABORTED,fatal:!1,frag:t,part:e,error:new Error("Aborted"),networkDetails:r,stats:s}))},onTimeout:(s,i,r)=>{this.resetLoader(t,l),o(new Ye({type:m.NETWORK_ERROR,details:p.FRAG_LOAD_TIMEOUT,fatal:!1,frag:t,part:e,error:new Error(`Timeout after ${u.timeout}ms`),networkDetails:r,stats:s}))}})}))}updateStatsFromPart(t,e){const s=t.stats,i=e.stats,r=i.total
if(s.loaded+=i.loaded,r){const i=Math.round(t.duration/e.duration),n=Math.min(Math.round(s.loaded/r),i),a=(i-n)*Math.round(s.loaded/n)
s.total=s.loaded+a}else s.total=Math.max(s.loaded,s.total)
const n=s.loading,a=i.loading
n.start?n.first+=a.first-a.start:(n.start=a.start,n.first=a.first),n.end=a.end}resetLoader(t,e){t.loader=null,this.loader===e&&(self.clearTimeout(this.partLoadTimeout),this.loader=null),e.destroy()}}function He(t,e=null){const s=e||t,i={frag:t,part:e,responseType:"arraybuffer",url:s.url,headers:{},rangeStart:0,rangeEnd:0},r=s.byteRangeStartOffset,n=s.byteRangeEndOffset
if(f(r)&&f(n)){var a
let e=r,s=n
if("initSegment"===t.sn&&"AES-128"===(null==(a=t.decryptdata)?void 0:a.method)){const t=n-r
t%16&&(s=n+(16-t%16)),0!==r&&(i.resetIV=!0,e=r-16)}i.rangeStart=e,i.rangeEnd=s}return i}function Ve(t,e){const s=new Error(`GAP ${t.gap?"tag":"attribute"} found`),i={type:m.MEDIA_ERROR,details:p.FRAG_GAP,fatal:!1,frag:t,error:s,networkDetails:null}
return e&&(i.part=e),(e||t).stats.aborted=!0,new Ye(i)}class Ye extends Error{constructor(t){super(t.error.message),this.data=void 0,this.data=t}}class We{constructor(t){this.config=void 0,this.keyUriToKeyInfo={},this.emeController=null,this.config=t}abort(){for(const t in this.keyUriToKeyInfo){const e=this.keyUriToKeyInfo[t].loader
e&&e.abort()}}detach(){for(const t in this.keyUriToKeyInfo){const e=this.keyUriToKeyInfo[t];(e.mediaKeySessionContext||e.decryptdata.isCommonEncryption)&&delete this.keyUriToKeyInfo[t]}}destroy(){this.detach()
for(const t in this.keyUriToKeyInfo){const e=this.keyUriToKeyInfo[t].loader
e&&e.destroy()}this.keyUriToKeyInfo={}}createKeyLoadError(t,e=p.KEY_LOAD_ERROR,s,i,r){return new Ye({type:m.NETWORK_ERROR,details:e,fatal:!1,frag:t,response:r,error:s,networkDetails:i})}loadClear(t,e){if(this.emeController&&this.config.emeEnabled){const{sn:s,cc:i}=t
for(let t=0;t<e.length;t++){const r=e[t]
if(i<=r.cc&&("initSegment"===s||"initSegment"===r.sn||s<r.sn)){this.emeController.selectKeySystemFormat(r).then((t=>{r.setKeyFormat(t)}))
break}}}}load(t){return!t.decryptdata&&t.encrypted&&this.emeController?this.emeController.selectKeySystemFormat(t).then((e=>this.loadInternal(t,e))):this.loadInternal(t)}loadInternal(t,e){var s,i
e&&t.setKeyFormat(e)
const r=t.decryptdata
if(!r){const s=new Error(e?`Expected frag.decryptdata to be defined after setting format ${e}`:"Missing decryption data on fragment in onKeyLoading")
return Promise.reject(this.createKeyLoadError(t,p.KEY_LOAD_ERROR,s))}const n=r.uri
if(!n)return Promise.reject(this.createKeyLoadError(t,p.KEY_LOAD_ERROR,new Error(`Invalid key URI: "${n}"`)))
let a=this.keyUriToKeyInfo[n]
if(null!=(s=a)&&s.decryptdata.key)return r.key=a.decryptdata.key,Promise.resolve({frag:t,keyInfo:a})
var o
if(null!=(i=a)&&i.keyLoadPromise)switch(null==(o=a.mediaKeySessionContext)?void 0:o.keyStatus){case void 0:case"status-pending":case"usable":case"usable-in-future":return a.keyLoadPromise.then((e=>(r.key=e.keyInfo.decryptdata.key,{frag:t,keyInfo:a})))}switch(a=this.keyUriToKeyInfo[n]={decryptdata:r,keyLoadPromise:null,loader:null,mediaKeySessionContext:null},r.method){case"ISO-23001-7":case"SAMPLE-AES":case"SAMPLE-AES-CENC":case"SAMPLE-AES-CTR":return"identity"===r.keyFormat?this.loadKeyHTTP(a,t):this.loadKeyEME(a,t)
case"AES-128":return this.loadKeyHTTP(a,t)
default:return Promise.reject(this.createKeyLoadError(t,p.KEY_LOAD_ERROR,new Error(`Key supplied with unsupported METHOD: "${r.method}"`)))}}loadKeyEME(t,e){const s={frag:e,keyInfo:t}
if(this.emeController&&this.config.emeEnabled){const e=this.emeController.loadKey(s)
if(e)return(t.keyLoadPromise=e.then((e=>(t.mediaKeySessionContext=e,s)))).catch((e=>{throw t.keyLoadPromise=null,e}))}return Promise.resolve(s)}loadKeyHTTP(t,e){const s=this.config,i=new(0,s.loader)(s)
return e.keyLoader=t.loader=i,t.keyLoadPromise=new Promise(((r,n)=>{const a={keyInfo:t,frag:e,responseType:"arraybuffer",url:t.decryptdata.uri},o=s.keyLoadPolicy.default,l={loadPolicy:o,timeout:o.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0},h={onSuccess:(t,e,s,i)=>{const{frag:a,keyInfo:o,url:l}=s
if(!a.decryptdata||o!==this.keyUriToKeyInfo[l])return n(this.createKeyLoadError(a,p.KEY_LOAD_ERROR,new Error("after key load, decryptdata unset or changed"),i))
o.decryptdata.key=a.decryptdata.key=new Uint8Array(t.data),a.keyLoader=null,o.loader=null,r({frag:a,keyInfo:o})},onError:(t,s,i,r)=>{this.resetLoader(s),n(this.createKeyLoadError(e,p.KEY_LOAD_ERROR,new Error(`HTTP Error ${t.code} loading key ${t.text}`),i,d({url:a.url,data:void 0},t)))},onTimeout:(t,s,i)=>{this.resetLoader(s),n(this.createKeyLoadError(e,p.KEY_LOAD_TIMEOUT,new Error("key loading timed out"),i))},onAbort:(t,s,i)=>{this.resetLoader(s),n(this.createKeyLoadError(e,p.INTERNAL_ABORTED,new Error("key loading aborted"),i))}}
i.load(a,l,h)}))}resetLoader(t){const{frag:e,keyInfo:s,url:i}=t,r=s.loader
e.keyLoader===r&&(e.keyLoader=null,s.loader=null),delete this.keyUriToKeyInfo[i],r&&r.destroy()}}class qe{constructor(){this._boundTick=void 0,this._tickTimer=null,this._tickInterval=null,this._tickCallCount=0,this._boundTick=this.tick.bind(this)}destroy(){this.onHandlerDestroying(),this.onHandlerDestroyed()}onHandlerDestroying(){this.clearNextTick(),this.clearInterval()}onHandlerDestroyed(){}hasInterval(){return!!this._tickInterval}hasNextTick(){return!!this._tickTimer}setInterval(t){return!this._tickInterval&&(this._tickCallCount=0,this._tickInterval=self.setInterval(this._boundTick,t),!0)}clearInterval(){return!!this._tickInterval&&(self.clearInterval(this._tickInterval),this._tickInterval=null,!0)}clearNextTick(){return!!this._tickTimer&&(self.clearTimeout(this._tickTimer),this._tickTimer=null,!0)}tick(){this._tickCallCount++,1===this._tickCallCount&&(this.doTick(),this._tickCallCount>1&&this.tickImmediate(),this._tickCallCount=0)}tickImmediate(){this.clearNextTick(),this._tickTimer=self.setTimeout(this._boundTick,0)}doTick(){}}const je={length:0,start:()=>0,end:()=>0}
class Xe{static isBuffered(t,e){try{if(t){const s=Xe.getBuffered(t)
for(let t=0;t<s.length;t++)if(e>=s.start(t)&&e<=s.end(t))return!0}}catch(t){}return!1}static bufferInfo(t,e,s){try{if(t){const i=Xe.getBuffered(t),r=[]
let n
for(n=0;n<i.length;n++)r.push({start:i.start(n),end:i.end(n)})
return this.bufferedInfo(r,e,s)}}catch(t){}return{len:0,start:e,end:e,nextStart:void 0}}static bufferedInfo(t,e,s){e=Math.max(0,e),t.sort((function(t,e){return t.start-e.start||e.end-t.end}))
let i=[]
if(s)for(let l=0;l<t.length;l++){const e=i.length
if(e){const r=i[e-1].end
t[l].start-r<s?t[l].end>r&&(i[e-1].end=t[l].end):i.push(t[l])}else i.push(t[l])}else i=t
let r,n=0,a=e,o=e
for(let l=0;l<i.length;l++){const t=i[l].start,h=i[l].end
if(e+s>=t&&e<h)a=t,o=h,n=o-e
else if(e+s<t){r=t
break}}return{len:n,start:a||0,end:o||0,nextStart:r}}static getBuffered(t){try{return t.buffered}catch(t){return v.log("failed to get media.buffered",t),je}}}class ze{constructor(t,e,s,i=0,r=-1,n=!1){this.level=void 0,this.sn=void 0,this.part=void 0,this.id=void 0,this.size=void 0,this.partial=void 0,this.transmuxing={start:0,executeStart:0,executeEnd:0,end:0},this.buffering={audio:{start:0,executeStart:0,executeEnd:0,end:0},video:{start:0,executeStart:0,executeEnd:0,end:0},audiovideo:{start:0,executeStart:0,executeEnd:0,end:0}},this.level=t,this.sn=e,this.id=s,this.size=i,this.part=r,this.partial=n}}function Qe(t,e){let s=null
for(let i=0,r=t.length;i<r;i++){const r=t[i]
if(r&&r.cc===e){s=r
break}}return s}function Je(t,e){if(t){const s=t.start+e
t.start=t.startPTS=s,t.endPTS=s+t.duration}}function Ze(t,e){const s=e.fragments
for(let i=0,r=s.length;i<r;i++)Je(s[i],t)
e.fragmentHint&&Je(e.fragmentHint,t),e.alignedSliding=!0}function ts(t,e){if(!t.hasProgramDateTime||!e.hasProgramDateTime)return
const s=t.fragments,i=e.fragments
if(!s.length||!i.length)return
const r=i[Math.round(i.length/2)-1],n=Qe(s,r.cc)||s[Math.round(s.length/2)-1],a=r.programDateTime,o=n.programDateTime
null!==a&&null!==o&&Ze((o-a)/1e3-(n.start-r.start),t)}class es{constructor(t,e){this.subtle=void 0,this.aesIV=void 0,this.subtle=t,this.aesIV=e}decrypt(t,e){return this.subtle.decrypt({name:"AES-CBC",iv:this.aesIV},e,t)}}class ss{constructor(t,e){this.subtle=void 0,this.key=void 0,this.subtle=t,this.key=e}expandKey(){return this.subtle.importKey("raw",this.key,{name:"AES-CBC"},!1,["encrypt","decrypt"])}}class is{constructor(){this.rcon=[0,1,2,4,8,16,32,64,128,27,54],this.subMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.invSubMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.sBox=new Uint32Array(256),this.invSBox=new Uint32Array(256),this.key=new Uint32Array(0),this.ksRows=0,this.keySize=0,this.keySchedule=void 0,this.invKeySchedule=void 0,this.initTable()}uint8ArrayToUint32Array_(t){const e=new DataView(t),s=new Uint32Array(4)
for(let i=0;i<4;i++)s[i]=e.getUint32(4*i)
return s}initTable(){const t=this.sBox,e=this.invSBox,s=this.subMix,i=s[0],r=s[1],n=s[2],a=s[3],o=this.invSubMix,l=o[0],h=o[1],d=o[2],c=o[3],u=new Uint32Array(256)
let f=0,g=0,m=0
for(m=0;m<256;m++)u[m]=m<128?m<<1:m<<1^283
for(m=0;m<256;m++){let s=g^g<<1^g<<2^g<<3^g<<4
s=s>>>8^255&s^99,t[f]=s,e[s]=f
const o=u[f],m=u[o],p=u[m]
let y=257*u[s]^16843008*s
i[f]=y<<24|y>>>8,r[f]=y<<16|y>>>16,n[f]=y<<8|y>>>24,a[f]=y,y=16843009*p^65537*m^257*o^16843008*f,l[s]=y<<24|y>>>8,h[s]=y<<16|y>>>16,d[s]=y<<8|y>>>24,c[s]=y,f?(f=o^u[u[u[p^o]]],g^=u[u[g]]):f=g=1}}expandKey(t){const e=this.uint8ArrayToUint32Array_(t)
let s=!0,i=0
for(;i<e.length&&s;)s=e[i]===this.key[i],i++
if(s)return
this.key=e
const r=this.keySize=e.length
if(4!==r&&6!==r&&8!==r)throw new Error("Invalid aes key size="+r)
const n=this.ksRows=4*(r+6+1)
let a,o
const l=this.keySchedule=new Uint32Array(n),h=this.invKeySchedule=new Uint32Array(n),d=this.sBox,c=this.rcon,u=this.invSubMix,f=u[0],g=u[1],m=u[2],p=u[3]
let y,T
for(a=0;a<n;a++)a<r?y=l[a]=e[a]:(T=y,a%r==0?(T=T<<8|T>>>24,T=d[T>>>24]<<24|d[T>>>16&255]<<16|d[T>>>8&255]<<8|d[255&T],T^=c[a/r|0]<<24):r>6&&a%r==4&&(T=d[T>>>24]<<24|d[T>>>16&255]<<16|d[T>>>8&255]<<8|d[255&T]),l[a]=y=(l[a-r]^T)>>>0)
for(o=0;o<n;o++)a=n-o,T=3&o?l[a]:l[a-4],h[o]=o<4||a<=4?T:f[d[T>>>24]]^g[d[T>>>16&255]]^m[d[T>>>8&255]]^p[d[255&T]],h[o]=h[o]>>>0}networkToHostOrderSwap(t){return t<<24|(65280&t)<<8|(16711680&t)>>8|t>>>24}decrypt(t,e,s){const i=this.keySize+6,r=this.invKeySchedule,n=this.invSBox,a=this.invSubMix,o=a[0],l=a[1],h=a[2],d=a[3],c=this.uint8ArrayToUint32Array_(s)
let u=c[0],f=c[1],g=c[2],m=c[3]
const p=new Int32Array(t),y=new Int32Array(p.length)
let T,E,v,S,L,A,R,b,I,D,k,w,C,_
const P=this.networkToHostOrderSwap
for(;e<p.length;){for(I=P(p[e]),D=P(p[e+1]),k=P(p[e+2]),w=P(p[e+3]),L=I^r[0],A=w^r[1],R=k^r[2],b=D^r[3],C=4,_=1;_<i;_++)T=o[L>>>24]^l[A>>16&255]^h[R>>8&255]^d[255&b]^r[C],E=o[A>>>24]^l[R>>16&255]^h[b>>8&255]^d[255&L]^r[C+1],v=o[R>>>24]^l[b>>16&255]^h[L>>8&255]^d[255&A]^r[C+2],S=o[b>>>24]^l[L>>16&255]^h[A>>8&255]^d[255&R]^r[C+3],L=T,A=E,R=v,b=S,C+=4
T=n[L>>>24]<<24^n[A>>16&255]<<16^n[R>>8&255]<<8^n[255&b]^r[C],E=n[A>>>24]<<24^n[R>>16&255]<<16^n[b>>8&255]<<8^n[255&L]^r[C+1],v=n[R>>>24]<<24^n[b>>16&255]<<16^n[L>>8&255]<<8^n[255&A]^r[C+2],S=n[b>>>24]<<24^n[L>>16&255]<<16^n[A>>8&255]<<8^n[255&R]^r[C+3],y[e]=P(T^u),y[e+1]=P(S^f),y[e+2]=P(v^g),y[e+3]=P(E^m),u=I,f=D,g=k,m=w,e+=4}return y.buffer}}class rs{constructor(t,{removePKCS7Padding:e=!0}={}){if(this.logEnabled=!0,this.removePKCS7Padding=void 0,this.subtle=null,this.softwareDecrypter=null,this.key=null,this.fastAesKey=null,this.remainderData=null,this.currentIV=null,this.currentResult=null,this.useSoftware=void 0,this.useSoftware=t.enableSoftwareAES,this.removePKCS7Padding=e,e)try{const t=self.crypto
t&&(this.subtle=t.subtle||t.webkitSubtle)}catch(t){}null===this.subtle&&(this.useSoftware=!0)}destroy(){this.subtle=null,this.softwareDecrypter=null,this.key=null,this.fastAesKey=null,this.remainderData=null,this.currentIV=null,this.currentResult=null}isSync(){return this.useSoftware}flush(){const{currentResult:t,remainderData:e}=this
if(!t||e)return this.reset(),null
const s=new Uint8Array(t)
return this.reset(),this.removePKCS7Padding?function(t){const e=t.byteLength,s=e&&new DataView(t.buffer).getUint8(e-1)
return s?V(t,0,e-s):t}(s):s}reset(){this.currentResult=null,this.currentIV=null,this.remainderData=null,this.softwareDecrypter&&(this.softwareDecrypter=null)}decrypt(t,e,s){return this.useSoftware?new Promise(((i,r)=>{this.softwareDecrypt(new Uint8Array(t),e,s)
const n=this.flush()
n?i(n.buffer):r(new Error("[softwareDecrypt] Failed to decrypt data"))})):this.webCryptoDecrypt(new Uint8Array(t),e,s)}softwareDecrypt(t,e,s){const{currentIV:i,currentResult:r,remainderData:n}=this
this.logOnce("JS AES decrypt"),n&&(t=vt(n,t),this.remainderData=null)
const a=this.getValidChunk(t)
if(!a.length)return null
i&&(s=i)
let o=this.softwareDecrypter
o||(o=this.softwareDecrypter=new is),o.expandKey(e)
const l=r
return this.currentResult=o.decrypt(a.buffer,0,s),this.currentIV=V(a,-16).buffer,l||null}webCryptoDecrypt(t,e,s){const i=this.subtle
return this.key===e&&this.fastAesKey||(this.key=e,this.fastAesKey=new ss(i,e)),this.fastAesKey.expandKey().then((e=>i?(this.logOnce("WebCrypto AES decrypt"),new es(i,new Uint8Array(s)).decrypt(t.buffer,e)):Promise.reject(new Error("web crypto not initialized")))).catch((i=>(v.warn(`[decrypter]: WebCrypto Error, disable WebCrypto API, ${i.name}: ${i.message}`),this.onWebCryptoError(t,e,s))))}onWebCryptoError(t,e,s){this.useSoftware=!0,this.logEnabled=!0,this.softwareDecrypt(t,e,s)
const i=this.flush()
if(i)return i.buffer
throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data")}getValidChunk(t){let e=t
const s=t.length-t.length%16
return s!==t.length&&(e=V(t,0,s),this.remainderData=V(t,s)),e}logOnce(t){this.logEnabled&&(v.log(`[decrypter]: ${t}`),this.logEnabled=!1)}}const ns="STOPPED",as="IDLE",os="KEY_LOADING",ls="FRAG_LOADING",hs="FRAG_LOADING_WAITING_RETRY",ds="WAITING_TRACK",cs="PARSING",us="PARSED",fs="ENDED",gs="ERROR",ms="WAITING_INIT_PTS",ps="WAITING_LEVEL"
class ys extends qe{constructor(t,e,s,i,r){super(),this.hls=void 0,this.fragPrevious=null,this.fragCurrent=null,this.fragmentTracker=void 0,this.transmuxer=null,this._state=ns,this.playlistType=void 0,this.media=null,this.mediaBuffer=null,this.config=void 0,this.bitrateTest=!1,this.lastCurrentTime=0,this.nextLoadPosition=0,this.startPosition=0,this.startTimeOffset=null,this.loadedmetadata=!1,this.retryDate=0,this.levels=null,this.fragmentLoader=void 0,this.keyLoader=void 0,this.levelLastLoaded=null,this.startFragRequested=!1,this.decrypter=void 0,this.initPTS=[],this.onvseeking=null,this.onvended=null,this.logPrefix="",this.log=void 0,this.warn=void 0,this.playlistType=r,this.logPrefix=i,this.log=v.log.bind(v,`${i}:`),this.warn=v.warn.bind(v,`${i}:`),this.hls=t,this.fragmentLoader=new Ke(t.config),this.keyLoader=s,this.fragmentTracker=e,this.config=t.config,this.decrypter=new rs(t.config),t.on(g.MANIFEST_LOADED,this.onManifestLoaded,this)}doTick(){this.onTickEnd()}onTickEnd(){}startLoad(t){}stopLoad(){this.fragmentLoader.abort(),this.keyLoader.abort()
const t=this.fragCurrent
null!=t&&t.loader&&(t.abortRequests(),this.fragmentTracker.removeFragment(t)),this.resetTransmuxer(),this.fragCurrent=null,this.fragPrevious=null,this.clearInterval(),this.clearNextTick(),this.state=ns}_streamEnded(t,e){if(e.live||t.nextStart||!t.end||!this.media)return!1
const s=e.partList
if(null!=s&&s.length){const t=s[s.length-1]
return Xe.isBuffered(this.media,t.start+t.duration/2)}const i=e.fragments[e.fragments.length-1].type
return this.fragmentTracker.isEndListAppended(i)}getLevelDetails(){var t
if(this.levels&&null!==this.levelLastLoaded)return null==(t=this.levels[this.levelLastLoaded])?void 0:t.details}onMediaAttached(t,e){const s=this.media=this.mediaBuffer=e.media
this.onvseeking=this.onMediaSeeking.bind(this),this.onvended=this.onMediaEnded.bind(this),s.addEventListener("seeking",this.onvseeking),s.addEventListener("ended",this.onvended)
const i=this.config
this.levels&&i.autoStartLoad&&this.state===ns&&this.startLoad(i.startPosition)}onMediaDetaching(){const t=this.media
null!=t&&t.ended&&(this.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0),t&&this.onvseeking&&this.onvended&&(t.removeEventListener("seeking",this.onvseeking),t.removeEventListener("ended",this.onvended),this.onvseeking=this.onvended=null),this.keyLoader&&this.keyLoader.detach(),this.media=this.mediaBuffer=null,this.loadedmetadata=!1,this.fragmentTracker.removeAllFragments(),this.stopLoad()}onMediaSeeking(){const{config:t,fragCurrent:e,media:s,mediaBuffer:i,state:r}=this,n=s?s.currentTime:0,a=Xe.bufferInfo(i||s,n,t.maxBufferHole)
if(this.log(`media seeking to ${f(n)?n.toFixed(3):n}, state: ${r}`),this.state===fs)this.resetLoadingState()
else if(e){const s=t.maxFragLookUpTolerance,i=e.start-s,r=e.start+e.duration+s
if(!a.len||r<a.start||i>a.end){const t=n>r;(n<i||t)&&(t&&e.loader&&(this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),e.abortRequests()),this.resetLoadingState())}}s&&(this.fragmentTracker.removeFragmentsInRange(n,1/0,this.playlistType,!0),this.lastCurrentTime=n),this.loadedmetadata||a.len||(this.nextLoadPosition=this.startPosition=n),this.tickImmediate()}onMediaEnded(){this.startPosition=this.lastCurrentTime=0}onManifestLoaded(t,e){this.startTimeOffset=e.startTimeOffset,this.initPTS=[]}onHandlerDestroying(){this.stopLoad(),super.onHandlerDestroying()}onHandlerDestroyed(){this.state=ns,this.fragmentLoader&&this.fragmentLoader.destroy(),this.keyLoader&&this.keyLoader.destroy(),this.decrypter&&this.decrypter.destroy(),this.hls=this.log=this.warn=this.decrypter=this.keyLoader=this.fragmentLoader=this.fragmentTracker=null,super.onHandlerDestroyed()}loadFragment(t,e,s){this._loadFragForPlayback(t,e,s)}_loadFragForPlayback(t,e,s){this._doFragLoad(t,e,s,(e=>{if(this.fragContextChanged(t))return this.warn(`Fragment ${t.sn}${e.part?" p: "+e.part.index:""} of level ${t.level} was dropped during download.`),void this.fragmentTracker.removeFragment(t)
t.stats.chunkCount++,this._handleFragmentLoadProgress(e)})).then((e=>{if(!e)return
const s=this.state
this.fragContextChanged(t)?(s===ls||!this.fragCurrent&&s===cs)&&(this.fragmentTracker.removeFragment(t),this.state=as):("payload"in e&&(this.log(`Loaded fragment ${t.sn} of level ${t.level}`),this.hls.trigger(g.FRAG_LOADED,e)),this._handleFragmentLoadComplete(e))})).catch((e=>{this.state!==ns&&this.state!==gs&&(this.warn(e),this.resetFragmentLoading(t))}))}clearTrackerIfNeeded(t){var e
if(this.fragmentTracker.getState(t)===Oe){const e=t.type,s=this.getFwdBufferInfo(this.mediaBuffer,e),i=Math.max(t.duration,s?s.len:this.config.maxBufferLength)
this.reduceMaxBufferLength(i)&&this.fragmentTracker.removeFragment(t)}else 0===(null==(e=this.mediaBuffer)?void 0:e.buffered.length)&&this.fragmentTracker.removeAllFragments()}flushMainBuffer(t,e,s=null){if(!(t-e))return
const i={startOffset:t,endOffset:e,type:s}
this.hls.trigger(g.BUFFER_FLUSHING,i)}_loadInitSegment(t,e){this._doFragLoad(t,e).then((e=>{if(!e||this.fragContextChanged(t)||!this.levels)throw new Error("init load aborted")
return e})).then((e=>{const{hls:s}=this,{payload:i}=e,r=t.decryptdata
if(i&&i.byteLength>0&&r&&r.key&&r.iv&&"AES-128"===r.method){const n=self.performance.now()
return this.decrypter.decrypt(new Uint8Array(i),r.key.buffer,r.iv.buffer).catch((e=>{throw s.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_DECRYPT_ERROR,fatal:!1,error:e,reason:e.message,frag:t}),e})).then((i=>{const r=self.performance.now()
return s.trigger(g.FRAG_DECRYPTED,{frag:t,payload:i,stats:{tstart:n,tdecrypt:r}}),e.payload=i,e}))}return e})).then((s=>{const{fragCurrent:i,hls:r,levels:n}=this
if(!n)throw new Error("init load aborted, missing levels")
const a=t.stats
this.state=as,e.fragmentError=0,t.data=new Uint8Array(s.payload),a.parsing.start=a.buffering.start=self.performance.now(),a.parsing.end=a.buffering.end=self.performance.now(),s.frag===i&&r.trigger(g.FRAG_BUFFERED,{stats:a,frag:i,part:null,id:t.type}),this.tick()})).catch((e=>{this.state!==ns&&this.state!==gs&&(this.warn(e),this.resetFragmentLoading(t))}))}fragContextChanged(t){const{fragCurrent:e}=this
return!t||!e||t.level!==e.level||t.sn!==e.sn||t.urlId!==e.urlId}fragBufferedComplete(t,e){var s,i,r,n
const a=this.mediaBuffer?this.mediaBuffer:this.media
this.log(`Buffered ${t.type} sn: ${t.sn}${e?" part: "+e.index:""} of ${"[stream-controller]"===this.logPrefix?"level":"track"} ${t.level} (frag:[${(null!=(s=t.startPTS)?s:NaN).toFixed(3)}-${(null!=(i=t.endPTS)?i:NaN).toFixed(3)}] > buffer:${a?function(t){let e=""
const s=t.length
for(let i=0;i<s;i++)e+=`[${t.start(i).toFixed(3)}-${t.end(i).toFixed(3)}]`
return e}(Xe.getBuffered(a)):"(detached)"})`),this.state=as,a&&(!this.loadedmetadata&&t.type==Xt.MAIN&&a.buffered.length&&(null==(r=this.fragCurrent)?void 0:r.sn)===(null==(n=this.fragPrevious)?void 0:n.sn)&&(this.loadedmetadata=!0,this.seekToStartPos()),this.tick())}seekToStartPos(){}_handleFragmentLoadComplete(t){const{transmuxer:e}=this
if(!e)return
const{frag:s,part:i,partsLoaded:r}=t,n=!r||0===r.length||r.some((t=>!t)),a=new ze(s.level,s.sn,s.stats.chunkCount+1,0,i?i.index:-1,!n)
e.flush(a)}_handleFragmentLoadProgress(t){}_doFragLoad(t,e,s=null,i){var r
const n=null==e?void 0:e.details
if(!this.levels||!n)throw new Error(`frag load aborted, missing level${n?"":" detail"}s`)
let a=null
if(!t.encrypted||null!=(r=t.decryptdata)&&r.key?!t.encrypted&&n.encryptedFragments.length&&this.keyLoader.loadClear(t,n.encryptedFragments):(this.log(`Loading key for ${t.sn} of [${n.startSN}-${n.endSN}], ${"[stream-controller]"===this.logPrefix?"level":"track"} ${t.level}`),this.state=os,this.fragCurrent=t,a=this.keyLoader.load(t).then((t=>{if(!this.fragContextChanged(t.frag))return this.hls.trigger(g.KEY_LOADED,t),this.state===os&&(this.state=as),t})),this.hls.trigger(g.KEY_LOADING,{frag:t}),null===this.fragCurrent&&(a=Promise.reject(new Error("frag load aborted, context changed in KEY_LOADING")))),s=Math.max(t.start,s||0),this.config.lowLatencyMode){const r=n.partList
if(r&&i){s>t.end&&n.fragmentHint&&(t=n.fragmentHint)
const o=this.getNextPart(r,t,s)
if(o>-1){const l=r[o]
let h
return this.log(`Loading part sn: ${t.sn} p: ${l.index} cc: ${t.cc} of playlist [${n.startSN}-${n.endSN}] parts [0-${o}-${r.length-1}] ${"[stream-controller]"===this.logPrefix?"level":"track"}: ${t.level}, target: ${parseFloat(s.toFixed(3))}`),this.nextLoadPosition=l.start+l.duration,this.state=ls,h=a?a.then((s=>!s||this.fragContextChanged(s.frag)?null:this.doFragPartsLoad(t,l,e,i))).catch((t=>this.handleFragLoadError(t))):this.doFragPartsLoad(t,l,e,i).catch((t=>this.handleFragLoadError(t))),this.hls.trigger(g.FRAG_LOADING,{frag:t,part:l,targetBufferTime:s}),null===this.fragCurrent?Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts")):h}if(!t.url||this.loadedEndOfParts(r,s))return Promise.resolve(null)}}this.log(`Loading fragment ${t.sn} cc: ${t.cc} ${n?"of ["+n.startSN+"-"+n.endSN+"] ":""}${"[stream-controller]"===this.logPrefix?"level":"track"}: ${t.level}, target: ${parseFloat(s.toFixed(3))}`),f(t.sn)&&!this.bitrateTest&&(this.nextLoadPosition=t.start+t.duration),this.state=ls
const o=this.config.progressive
let l
return l=o&&a?a.then((e=>!e||this.fragContextChanged(null==e?void 0:e.frag)?null:this.fragmentLoader.load(t,i))).catch((t=>this.handleFragLoadError(t))):Promise.all([this.fragmentLoader.load(t,o?i:void 0),a]).then((([t])=>(!o&&t&&i&&i(t),t))).catch((t=>this.handleFragLoadError(t))),this.hls.trigger(g.FRAG_LOADING,{frag:t,targetBufferTime:s}),null===this.fragCurrent?Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING")):l}doFragPartsLoad(t,e,s,i){return new Promise(((r,n)=>{var a
const o=[],l=null==(a=s.details)?void 0:a.partList,h=e=>{this.fragmentLoader.loadPart(t,e,i).then((i=>{o[e.index]=i
const n=i.part
this.hls.trigger(g.FRAG_LOADED,i)
const a=ye(s,t.sn,e.index+1)||Te(l,t.sn,e.index+1)
if(!a)return r({frag:t,part:n,partsLoaded:o})
h(a)})).catch(n)}
h(e)}))}handleFragLoadError(t){if("data"in t){const e=t.data
t.data&&e.details===p.INTERNAL_ABORTED?this.handleFragLoadAborted(e.frag,e.part):this.hls.trigger(g.ERROR,e)}else this.hls.trigger(g.ERROR,{type:m.OTHER_ERROR,details:p.INTERNAL_EXCEPTION,err:t,error:t,fatal:!0})
return null}_handleTransmuxerFlush(t){const e=this.getCurrentContext(t)
if(!e||this.state!==cs)return void(this.fragCurrent||this.state===ns||this.state===gs||(this.state=as))
const{frag:s,part:i,level:r}=e,n=self.performance.now()
s.stats.parsing.end=n,i&&(i.stats.parsing.end=n),this.updateLevelTiming(s,i,r,t.partial)}getCurrentContext(t){const{levels:e,fragCurrent:s}=this,{level:i,sn:r,part:n}=t
if(null==e||!e[i])return this.warn(`Levels object was unset while buffering fragment ${r} of level ${i}. The current chunk will not be buffered.`),null
const a=e[i],o=n>-1?ye(a,r,n):null,l=o?o.fragment:function(t,e,s){if(null==t||!t.details)return null
const i=t.details
let r=i.fragments[e-i.startSN]
return r||(r=i.fragmentHint,r&&r.sn===e?r:e<i.startSN&&s&&s.sn===e?s:null)}(a,r,s)
return l?(s&&s!==l&&(l.stats=s.stats),{frag:l,part:o,level:a}):null}bufferFragmentData(t,e,s,i){var r
if(!t||this.state!==cs)return
const{data1:n,data2:a}=t
let o=n
if(n&&a&&(o=vt(n,a)),null==(r=o)||!r.length)return
const l={type:t.type,frag:e,part:s,chunkMeta:i,parent:e.type,data:o}
this.hls.trigger(g.BUFFER_APPENDING,l),t.dropped&&t.independent&&!s&&this.flushBufferGap(e)}flushBufferGap(t){const e=this.media
if(!e)return
if(!Xe.isBuffered(e,e.currentTime))return void this.flushMainBuffer(0,t.start)
const s=e.currentTime,i=Xe.bufferInfo(e,s,0),r=t.duration,n=Math.min(2*this.config.maxFragLookUpTolerance,.25*r),a=Math.max(Math.min(t.start-n,i.end-n),s+n)
t.start-a>n&&this.flushMainBuffer(a,t.start)}getFwdBufferInfo(t,e){const s=this.getLoadPosition()
return f(s)?this.getFwdBufferInfoAtPos(t,s,e):null}getFwdBufferInfoAtPos(t,e,s){const{config:{maxBufferHole:i}}=this,r=Xe.bufferInfo(t,e,i)
if(0===r.len&&void 0!==r.nextStart){const n=this.fragmentTracker.getBufferedFrag(e,s)
if(n&&r.nextStart<n.end)return Xe.bufferInfo(t,e,Math.max(r.nextStart,i))}return r}getMaxBufferLength(t){const{config:e}=this
let s
return s=t?Math.max(8*e.maxBufferSize/t,e.maxBufferLength):e.maxBufferLength,Math.min(s,e.maxMaxBufferLength)}reduceMaxBufferLength(t){const e=this.config,s=t||e.maxBufferLength
return e.maxMaxBufferLength>=s&&(e.maxMaxBufferLength/=2,this.warn(`Reduce max buffer length to ${e.maxMaxBufferLength}s`),!0)}getNextFragment(t,e){const s=e.fragments,i=s.length
if(!i)return null
const{config:r}=this,n=s[0].start
let a
if(e.live){const n=r.initialLiveManifestSize
if(i<n)return this.warn(`Not enough fragments to start playback (have: ${i}, need: ${n})`),null
e.PTSKnown||this.startFragRequested||-1!==this.startPosition||(a=this.getInitialLiveFragment(e,s),this.startPosition=a?this.hls.liveSyncPosition||a.start:t)}else t<=n&&(a=s[0])
if(!a){const s=r.lowLatencyMode?e.partEnd:e.fragmentEnd
a=this.getFragmentAtPosition(t,s,e)}return this.mapToInitFragWhenRequired(a)}isLoopLoading(t,e){const s=this.fragmentTracker.getState(t)
return(s===Ne||s===Me&&!!t.gap)&&this.nextLoadPosition>e}getNextFragmentLoopLoading(t,e,s,i,r){const n=t.gap,a=this.getNextFragment(this.nextLoadPosition,e)
if(null===a)return a
if(t=a,n&&t&&!t.gap&&s.nextStart){const e=this.getFwdBufferInfoAtPos(this.mediaBuffer?this.mediaBuffer:this.media,s.nextStart,i)
if(null!==e&&s.len+e.len>=r)return this.log(`buffer full after gaps in "${i}" playlist starting at sn: ${t.sn}`),null}return t}mapToInitFragWhenRequired(t){return null==t||!t.initSegment||null!=t&&t.initSegment.data||this.bitrateTest?t:t.initSegment}getNextPart(t,e,s){let i=-1,r=!1,n=!0
for(let a=0,o=t.length;a<o;a++){const o=t[a]
if(n=n&&!o.independent,i>-1&&s<o.start)break
const l=o.loaded
l?i=-1:(r||o.independent||n)&&o.fragment===e&&(i=a),r=l}return i}loadedEndOfParts(t,e){const s=t[t.length-1]
return s&&e>s.start&&s.loaded}getInitialLiveFragment(t,e){const s=this.fragPrevious
let i=null
if(s){if(t.hasProgramDateTime&&(this.log(`Live playlist, switching playlist, load frag with same PDT: ${s.programDateTime}`),i=function(t,e,s){if(null===e||!Array.isArray(t)||!t.length||!f(e))return null
if(e<(t[0].programDateTime||0))return null
if(e>=(t[t.length-1].endProgramDateTime||0))return null
s=s||0
for(let i=0;i<t.length;++i){const r=t[i]
if(De(e,s,r))return r}return null}(e,s.endProgramDateTime,this.config.maxFragLookUpTolerance)),!i){const r=s.sn+1
if(r>=t.startSN&&r<=t.endSN){const n=e[r-t.startSN]
s.cc===n.cc&&(i=n,this.log(`Live playlist, switching playlist, load frag with next SN: ${i.sn}`))}i||(i=function(t,e){return Re.search(t,(t=>t.cc<e?1:t.cc>e?-1:0))}(e,s.cc),i&&this.log(`Live playlist, switching playlist, load frag with same CC: ${i.sn}`))}}else{const e=this.hls.liveSyncPosition
null!==e&&(i=this.getFragmentAtPosition(e,this.bitrateTest?t.fragmentEnd:t.edge,t))}return i}getFragmentAtPosition(t,e,s){const{config:i}=this
let{fragPrevious:r}=this,{fragments:n,endSN:a}=s
const{fragmentHint:o}=s,l=i.maxFragLookUpTolerance,h=!!(i.lowLatencyMode&&s.partList&&o)
let d
if(h&&o&&!this.bitrateTest&&(n=n.concat(o),a=o.sn),d=t<e?be(r,n,t,t>e-l?0:l):n[n.length-1],d){const t=d.sn-s.startSN,e=this.fragmentTracker.getState(d)
if((e===Ne||e===Me&&d.gap)&&(r=d),r&&d.sn===r.sn&&!h&&r&&d.level===r.level){const e=n[t+1]
d=d.sn<a&&this.fragmentTracker.getState(e)!==Ne?e:null}}return d}synchronizeToLiveEdge(t){const{config:e,media:s}=this
if(!s)return
const i=this.hls.liveSyncPosition,r=s.currentTime,n=t.fragments[0].start,a=t.edge,o=r>=n-e.maxFragLookUpTolerance&&r<=a
if(null!==i&&s.duration>i&&(r<i||!o)){const n=void 0!==e.liveMaxLatencyDuration?e.liveMaxLatencyDuration:e.liveMaxLatencyDurationCount*t.targetduration;(!o&&s.readyState<4||r<a-n)&&(this.loadedmetadata||(this.nextLoadPosition=i),s.readyState&&(this.warn(`Playback: ${r.toFixed(3)} is located too far from the end of live sliding playlist: ${a}, reset currentTime to : ${i.toFixed(3)}`),s.currentTime=i))}}alignPlaylists(t,e){const{levels:s,levelLastLoaded:i,fragPrevious:r}=this,n=null!==i?s[i]:null,a=t.fragments.length
if(!a)return this.warn("No fragments in live playlist"),0
const o=t.fragments[0].start,l=!e,h=t.alignedSliding&&f(o)
if(l||!h&&!o){!function(t,e,s){e&&(function(t,e,s){if(function(t,e,s){return!(!e.details||!(s.endCC>s.startCC||t&&t.cc<s.startCC))}(t,s,e)){const t=function(t,e,s=0){const i=t.fragments,r=e.fragments
if(!r.length||!i.length)return void v.log("No fragments to align")
const n=Qe(i,r[0].cc)
if(n&&(!n||n.startPTS))return n
v.log("No frag in previous level to align on")}(s.details,e)
t&&f(t.start)&&(v.log(`Adjusting PTS using last level due to CC increase within current level ${e.url}`),Ze(t.start,e))}}(t,s,e),!s.alignedSliding&&e.details&&function(t,e){if(!e.fragments.length||!t.hasProgramDateTime||!e.hasProgramDateTime)return
const s=e.fragments[0].programDateTime,i=t.fragments[0].programDateTime,r=(i-s)/1e3+e.fragments[0].start
r&&f(r)&&(v.log(`Adjusting PTS using programDateTime delta ${i-s}ms, sliding:${r.toFixed(3)} ${t.url} `),Ze(r,t))}(s,e.details),s.alignedSliding||!e.details||s.skippedSegments||me(e.details,s))}(r,n,t)
const s=t.fragments[0].start
return this.log(`Live playlist sliding: ${s.toFixed(2)} start-sn: ${e?e.startSN:"na"}->${t.startSN} prev-sn: ${r?r.sn:"na"} fragments: ${a}`),s}return o}waitForCdnTuneIn(t){return t.live&&t.canBlockReload&&t.partTarget&&t.tuneInGoal>Math.max(t.partHoldBack,3*t.partTarget)}setStartPosition(t,e){let s=this.startPosition
if(s<e&&(s=-1),-1===s||-1===this.lastCurrentTime){const i=null!==this.startTimeOffset,r=i?this.startTimeOffset:t.startTimeOffset
null!==r&&f(r)?(s=e+r,r<0&&(s+=t.totalduration),s=Math.min(Math.max(e,s),e+t.totalduration),this.log(`Start time offset ${r} found in ${i?"multivariant":"media"} playlist, adjust startPosition to ${s}`),this.startPosition=s):t.live?s=this.hls.liveSyncPosition||e:this.startPosition=s=0,this.lastCurrentTime=s}this.nextLoadPosition=s}getLoadPosition(){const{media:t}=this
let e=0
return this.loadedmetadata&&t?e=t.currentTime:this.nextLoadPosition&&(e=this.nextLoadPosition),e}handleFragLoadAborted(t,e){this.transmuxer&&"initSegment"!==t.sn&&t.stats.aborted&&(this.warn(`Fragment ${t.sn}${e?" part"+e.index:""} of level ${t.level} was aborted`),this.resetFragmentLoading(t))}resetFragmentLoading(t){this.fragCurrent&&(this.fragContextChanged(t)||this.state===hs)||(this.state=as)}onFragmentOrKeyLoadError(t,e){if(e.chunkMeta&&!e.frag){const t=this.getCurrentContext(e.chunkMeta)
t&&(e.frag=t.frag)}const s=e.frag
if(!s||s.type!==t||!this.levels)return
var i
if(this.fragContextChanged(s))return void this.warn(`Frag load error must match current frag to retry ${s.url} > ${null==(i=this.fragCurrent)?void 0:i.url}`)
const r=e.details===p.FRAG_GAP
r&&this.fragmentTracker.fragBuffered(s,!0)
const n=e.errorAction,{action:a,retryCount:o=0,retryConfig:l}=n||{}
if(n&&5===a&&l){this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition)
const i=Se(l,o)
this.warn(`Fragment ${s.sn} of ${t} ${s.level} errored with ${e.details}, retrying loading ${o+1}/${l.maxNumRetry} in ${i}ms`),n.resolved=!0,this.retryDate=self.performance.now()+i,this.state=hs}else l&&n?(this.resetFragmentErrors(t),o<l.maxNumRetry?r||(n.resolved=!0):v.warn(`${e.details} reached or exceeded max retry (${o})`)):this.state=gs
this.tickImmediate()}reduceLengthAndFlushBuffer(t){if(this.state===cs||this.state===us){const e=t.parent,s=this.getFwdBufferInfo(this.mediaBuffer,e),i=s&&s.len>.5
i&&this.reduceMaxBufferLength(s.len)
const r=!i
return r&&this.warn(`Buffer full error while media.currentTime is not buffered, flush ${e} buffer`),t.frag&&(this.fragmentTracker.removeFragment(t.frag),this.nextLoadPosition=t.frag.start),this.resetLoadingState(),r}return!1}resetFragmentErrors(t){t===Xt.AUDIO&&(this.fragCurrent=null),this.loadedmetadata||(this.startFragRequested=!1),this.state!==ns&&(this.state=as)}afterBufferFlushed(t,e,s){if(!t)return
const i=Xe.getBuffered(t)
this.fragmentTracker.detectEvictedFragments(e,i,s),this.state===fs&&this.resetLoadingState()}resetLoadingState(){this.log("Reset loading state"),this.fragCurrent=null,this.fragPrevious=null,this.state=as}resetStartWhenNotLoaded(t){if(!this.loadedmetadata){this.startFragRequested=!1
const e=this.levels?this.levels[t].details:null
null!=e&&e.live?(this.startPosition=-1,this.setStartPosition(e,0),this.resetLoadingState()):this.nextLoadPosition=this.startPosition}}resetWhenMissingContext(t){this.warn(`The loading context changed while buffering fragment ${t.sn} of level ${t.level}. This chunk will not be buffered.`),this.removeUnbufferedFrags(),this.resetStartWhenNotLoaded(t.level),this.resetLoadingState()}removeUnbufferedFrags(t=0){this.fragmentTracker.removeFragmentsInRange(t,1/0,this.playlistType,!1,!0)}updateLevelTiming(t,e,s,i){var r
const n=s.details
if(n){if(Object.keys(t.elementaryStreams).reduce(((e,r)=>{const a=t.elementaryStreams[r]
if(a){const o=a.endPTS-a.startPTS
if(o<=0)return this.warn(`Could not parse fragment ${t.sn} ${r} duration reliably (${o})`),e||!1
const l=i?0:ge(n,t,a.startPTS,a.endPTS,a.startDTS,a.endDTS)
return this.hls.trigger(g.LEVEL_PTS_UPDATED,{details:n,level:s,drift:l,type:r,frag:t,start:a.startPTS,end:a.endPTS}),!0}return e}),!1))s.fragmentError=0
else if(null===(null==(r=this.transmuxer)?void 0:r.error)){const e=new Error(`Found no media in fragment ${t.sn} of level ${s.id} resetting transmuxer to fallback to playlist timing`)
if(this.warn(e.message),this.hls.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_PARSING_ERROR,fatal:!1,error:e,frag:t,reason:`Found no media in msn ${t.sn} of level "${s.url}"`}),!this.hls)return
this.resetTransmuxer()}this.state=us,this.hls.trigger(g.FRAG_PARSED,{frag:t,part:e})}else this.warn("level.details undefined")}resetTransmuxer(){this.transmuxer&&(this.transmuxer.destroy(),this.transmuxer=null)}recoverWorkerError(t){"demuxerWorker"===t.event&&(this.resetTransmuxer(),this.resetLoadingState())}set state(t){const e=this._state
e!==t&&(this._state=t,this.log(`${e}->${t}`))}get state(){return this._state}}function Ts(){if("undefined"!=typeof self)return self.MediaSource||self.WebKitMediaSource}function Es(){return self.SourceBuffer||self.WebKitSourceBuffer}function vs(t="",e=9e4){return{type:t,id:-1,pid:-1,inputTimeScale:e,sequenceNumber:-1,samples:[],dropped:0}}class Ss{constructor(){this._audioTrack=void 0,this._id3Track=void 0,this.frameIndex=0,this.cachedData=null,this.basePTS=null,this.initPTS=null,this.lastPTS=null}resetInitSegment(t,e,s,i){this._id3Track={type:"id3",id:3,pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],dropped:0}}resetTimeStamp(t){this.initPTS=t,this.resetContiguity()}resetContiguity(){this.basePTS=null,this.lastPTS=null,this.frameIndex=0}canParse(t,e){return!1}appendFrame(t,e,s){}demux(t,e){this.cachedData&&(t=vt(this.cachedData,t),this.cachedData=null)
let s,i=q(t,0),r=i?i.length:0
const n=this._audioTrack,a=this._id3Track,o=i?(t=>{const e=J(t)
for(let s=0;s<e.length;s++){const t=e[s]
if(z(t))return it(t)}})(i):void 0,l=t.length
for((null===this.basePTS||0===this.frameIndex&&f(o))&&(this.basePTS=Ls(o,e,this.initPTS),this.lastPTS=this.basePTS),null===this.lastPTS&&(this.lastPTS=this.basePTS),i&&i.length>0&&a.samples.push({pts:this.lastPTS,dts:this.lastPTS,data:i,type:ie,duration:Number.POSITIVE_INFINITY});r<l;){if(this.canParse(t,r)){const e=this.appendFrame(n,t,r)
e?(this.frameIndex++,this.lastPTS=e.sample.pts,r+=e.length,s=r):r=l}else X(t,r)?(i=q(t,r),a.samples.push({pts:this.lastPTS,dts:this.lastPTS,data:i,type:ie,duration:Number.POSITIVE_INFINITY}),r+=i.length,s=r):r++
if(r===l&&s!==l){const e=V(t,s)
this.cachedData?this.cachedData=vt(this.cachedData,e):this.cachedData=e}}return{audioTrack:n,videoTrack:vs(),id3Track:a,textTrack:vs()}}demuxSampleAes(t,e,s){return Promise.reject(new Error(`[${this}] This demuxer does not support Sample-AES decryption`))}flush(t){const e=this.cachedData
return e&&(this.cachedData=null,this.demux(e,0)),{audioTrack:this._audioTrack,videoTrack:vs(),id3Track:this._id3Track,textTrack:vs()}}destroy(){}}const Ls=(t,e,s)=>f(t)?90*t:9e4*e+(s?9e4*s.baseTime/s.timescale:0)
function As(t,e){return 255===t[e]&&240==(246&t[e+1])}function Rs(t,e){return 1&t[e+1]?7:9}function bs(t,e){return(3&t[e+3])<<11|t[e+4]<<3|(224&t[e+5])>>>5}function Is(t,e){return e+1<t.length&&As(t,e)}function Ds(t,e){if(Is(t,e)){const s=Rs(t,e)
if(e+s>=t.length)return!1
const i=bs(t,e)
if(i<=s)return!1
const r=e+i
return r===t.length||Is(t,r)}return!1}function ks(t,e,s,i,r){if(!t.samplerate){const n=function(t,e,s,i){let r,n,a,o
const l=navigator.userAgent.toLowerCase(),h=i,d=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350]
r=1+((192&e[s+2])>>>6)
const c=(60&e[s+2])>>>2
if(!(c>d.length-1))return a=(1&e[s+2])<<2,a|=(192&e[s+3])>>>6,v.log(`manifest codec:${i}, ADTS type:${r}, samplingIndex:${c}`),/firefox/i.test(l)?c>=6?(r=5,o=new Array(4),n=c-3):(r=2,o=new Array(2),n=c):-1!==l.indexOf("android")?(r=2,o=new Array(2),n=c):(r=5,o=new Array(4),i&&(-1!==i.indexOf("mp4a.40.29")||-1!==i.indexOf("mp4a.40.5"))||!i&&c>=6?n=c-3:((i&&-1!==i.indexOf("mp4a.40.2")&&(c>=6&&1===a||/vivaldi/i.test(l))||!i&&1===a)&&(r=2,o=new Array(2)),n=c)),o[0]=r<<3,o[0]|=(14&c)>>1,o[1]|=(1&c)<<7,o[1]|=a<<3,5===r&&(o[1]|=(14&n)>>1,o[2]=(1&n)<<7,o[2]|=8,o[3]=0),{config:o,samplerate:d[c],channelCount:a,codec:"mp4a.40."+r,manifestCodec:h}
t.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_PARSING_ERROR,fatal:!0,reason:`invalid ADTS sampling index:${c}`})}(e,s,i,r)
if(!n)return
t.config=n.config,t.samplerate=n.samplerate,t.channelCount=n.channelCount,t.codec=n.codec,t.manifestCodec=n.manifestCodec,v.log(`parsed codec:${t.codec}, rate:${n.samplerate}, channels:${n.channelCount}`)}}function ws(t){return 9216e4/t}function Cs(t,e,s,i,r){const n=i+r*ws(t.samplerate),a=function(t,e){const s=Rs(t,e)
if(e+s<=t.length){const i=bs(t,e)-s
if(i>0)return{headerLength:s,frameLength:i}}}(e,s)
let o
if(a){const{frameLength:i,headerLength:r}=a,l=r+i,h=Math.max(0,s+l-e.length)
h?(o=new Uint8Array(l-r),o.set(e.subarray(s+r,e.length),0)):o=e.subarray(s+r,s+l)
const d={unit:o,pts:n}
return h||t.samples.push(d),{sample:d,length:l,missing:h}}const l=e.length-s
return o=new Uint8Array(l),o.set(e.subarray(s,e.length),0),{sample:{unit:o,pts:n},length:l,missing:-1}}const _s=/\/emsg[-/]ID3/i
let Ps=null
const xs=[32,64,96,128,160,192,224,256,288,320,352,384,416,448,32,48,56,64,80,96,112,128,160,192,224,256,320,384,32,40,48,56,64,80,96,112,128,160,192,224,256,320,32,48,56,64,80,96,112,128,144,160,176,192,224,256,8,16,24,32,40,48,56,64,80,96,112,128,144,160],Fs=[44100,48e3,32e3,22050,24e3,16e3,11025,12e3,8e3],Os=[[0,72,144,12],[0,0,0,0],[0,72,144,12],[0,144,144,12]],Ms=[0,1,1,4]
function Ns(t,e,s,i,r){if(s+24>e.length)return
const n=Us(e,s)
if(n&&s+n.frameLength<=e.length){const a=i+r*(9e4*n.samplesPerFrame/n.sampleRate),o={unit:e.subarray(s,s+n.frameLength),pts:a,dts:a}
return t.config=[],t.channelCount=n.channelCount,t.samplerate=n.sampleRate,t.samples.push(o),{sample:o,length:n.frameLength,missing:0}}}function Us(t,e){const s=t[e+1]>>3&3,i=t[e+1]>>1&3,r=t[e+2]>>4&15,n=t[e+2]>>2&3
if(1!==s&&0!==r&&15!==r&&3!==n){const a=t[e+2]>>1&1,o=t[e+3]>>6,l=1e3*xs[14*(3===s?3-i:3===i?3:4)+r-1],h=Fs[3*(3===s?0:2===s?1:2)+n],d=3===o?1:2,c=Os[s][i],u=Ms[i],f=8*c*u,g=Math.floor(c*l/h+a)*u
if(null===Ps){const t=(navigator.userAgent||"").match(/Chrome\/(\d+)/i)
Ps=t?parseInt(t[1]):0}return!!Ps&&Ps<=87&&2===i&&l>=224e3&&0===o&&(t[e+3]=128|t[e+3]),{sampleRate:h,channelCount:d,frameLength:g,samplesPerFrame:f}}}function Bs(t,e){return 255===t[e]&&224==(224&t[e+1])&&0!=(6&t[e+1])}function $s(t,e){return e+1<t.length&&Bs(t,e)}function Gs(t,e){if(e+1<t.length&&Bs(t,e)){const s=4,i=Us(t,e)
let r=s
null!=i&&i.frameLength&&(r=i.frameLength)
const n=e+r
return n===t.length||$s(t,n)}return!1}class Ks{constructor(t){this.data=void 0,this.bytesAvailable=void 0,this.word=void 0,this.bitsAvailable=void 0,this.data=t,this.bytesAvailable=t.byteLength,this.word=0,this.bitsAvailable=0}loadWord(){const t=this.data,e=this.bytesAvailable,s=t.byteLength-e,i=new Uint8Array(4),r=Math.min(4,e)
if(0===r)throw new Error("no bytes available")
i.set(t.subarray(s,s+r)),this.word=new DataView(i.buffer).getUint32(0),this.bitsAvailable=8*r,this.bytesAvailable-=r}skipBits(t){let e
t=Math.min(t,8*this.bytesAvailable+this.bitsAvailable),this.bitsAvailable>t?(this.word<<=t,this.bitsAvailable-=t):(e=(t-=this.bitsAvailable)>>3,t-=e<<3,this.bytesAvailable-=e,this.loadWord(),this.word<<=t,this.bitsAvailable-=t)}readBits(t){let e=Math.min(this.bitsAvailable,t)
const s=this.word>>>32-e
if(t>32&&v.error("Cannot read more than 32 bits at a time"),this.bitsAvailable-=e,this.bitsAvailable>0)this.word<<=e
else{if(!(this.bytesAvailable>0))throw new Error("no bits available")
this.loadWord()}return e=t-e,e>0&&this.bitsAvailable?s<<e|this.readBits(e):s}skipLZ(){let t
for(t=0;t<this.bitsAvailable;++t)if(0!=(this.word&2147483648>>>t))return this.word<<=t,this.bitsAvailable-=t,t
return this.loadWord(),t+this.skipLZ()}skipUEG(){this.skipBits(1+this.skipLZ())}skipEG(){this.skipBits(1+this.skipLZ())}readUEG(){const t=this.skipLZ()
return this.readBits(t+1)-1}readEG(){const t=this.readUEG()
return 1&t?1+t>>>1:-1*(t>>>1)}readBoolean(){return 1===this.readBits(1)}readUByte(){return this.readBits(8)}readUShort(){return this.readBits(16)}readUInt(){return this.readBits(32)}skipScalingList(t){let e,s=8,i=8
for(let r=0;r<t;r++)0!==i&&(e=this.readEG(),i=(s+e+256)%256),s=0===i?s:i}readSPS(){let t,e,s,i=0,r=0,n=0,a=0
const o=this.readUByte.bind(this),l=this.readBits.bind(this),h=this.readUEG.bind(this),d=this.readBoolean.bind(this),c=this.skipBits.bind(this),u=this.skipEG.bind(this),f=this.skipUEG.bind(this),g=this.skipScalingList.bind(this)
o()
const m=o()
if(l(5),c(3),o(),f(),100===m||110===m||122===m||244===m||44===m||83===m||86===m||118===m||128===m){const t=h()
if(3===t&&c(1),f(),f(),c(1),d())for(e=3!==t?8:12,s=0;s<e;s++)d()&&g(s<6?16:64)}f()
const p=h()
if(0===p)h()
else if(1===p)for(c(1),u(),u(),t=h(),s=0;s<t;s++)u()
f(),c(1)
const y=h(),T=h(),E=l(1)
0===E&&c(1),c(1),d()&&(i=h(),r=h(),n=h(),a=h())
let v=[1,1]
if(d()&&d())switch(o()){case 1:v=[1,1]
break
case 2:v=[12,11]
break
case 3:v=[10,11]
break
case 4:v=[16,11]
break
case 5:v=[40,33]
break
case 6:v=[24,11]
break
case 7:v=[20,11]
break
case 8:v=[32,11]
break
case 9:v=[80,33]
break
case 10:v=[18,11]
break
case 11:v=[15,11]
break
case 12:v=[64,33]
break
case 13:v=[160,99]
break
case 14:v=[4,3]
break
case 15:v=[3,2]
break
case 16:v=[2,1]
break
case 255:v=[o()<<8|o(),o()<<8|o()]}return{width:Math.ceil(16*(y+1)-2*i-2*r),height:(2-E)*(T+1)*16-(E?2:4)*(n+a),pixelRatio:v}}readSliceType(){return this.readUByte(),this.readUEG(),this.readUEG()}}class Hs{constructor(t,e,s){this.keyData=void 0,this.decrypter=void 0,this.keyData=s,this.decrypter=new rs(e,{removePKCS7Padding:!1})}decryptBuffer(t){return this.decrypter.decrypt(t,this.keyData.key.buffer,this.keyData.iv.buffer)}decryptAacSample(t,e,s){const i=t[e].unit
if(i.length<=16)return
const r=i.subarray(16,i.length-i.length%16),n=r.buffer.slice(r.byteOffset,r.byteOffset+r.length)
this.decryptBuffer(n).then((r=>{const n=new Uint8Array(r)
i.set(n,16),this.decrypter.isSync()||this.decryptAacSamples(t,e+1,s)}))}decryptAacSamples(t,e,s){for(;;e++){if(e>=t.length)return void s()
if(!(t[e].unit.length<32||(this.decryptAacSample(t,e,s),this.decrypter.isSync())))return}}getAvcEncryptedData(t){const e=16*Math.floor((t.length-48)/160)+16,s=new Int8Array(e)
let i=0
for(let r=32;r<t.length-16;r+=160,i+=16)s.set(t.subarray(r,r+16),i)
return s}getAvcDecryptedUnit(t,e){const s=new Uint8Array(e)
let i=0
for(let r=32;r<t.length-16;r+=160,i+=16)t.set(s.subarray(i,i+16),r)
return t}decryptAvcSample(t,e,s,i,r){const n=Rt(r.data),a=this.getAvcEncryptedData(n)
this.decryptBuffer(a.buffer).then((a=>{r.data=this.getAvcDecryptedUnit(n,a),this.decrypter.isSync()||this.decryptAvcSamples(t,e,s+1,i)}))}decryptAvcSamples(t,e,s,i){if(t instanceof Uint8Array)throw new Error("Cannot decrypt samples of type Uint8Array")
for(;;e++,s=0){if(e>=t.length)return void i()
const r=t[e].units
for(;!(s>=r.length);s++){const n=r[s]
if(!(n.data.length<=48||1!==n.type&&5!==n.type||(this.decryptAvcSample(t,e,s,i,n),this.decrypter.isSync())))return}}}}const Vs=188
class Ys{constructor(t,e,s){this.observer=void 0,this.config=void 0,this.typeSupported=void 0,this.sampleAes=null,this.pmtParsed=!1,this.audioCodec=void 0,this.videoCodec=void 0,this._duration=0,this._pmtId=-1,this._avcTrack=void 0,this._audioTrack=void 0,this._id3Track=void 0,this._txtTrack=void 0,this.aacOverFlow=null,this.avcSample=null,this.remainderData=null,this.observer=t,this.config=e,this.typeSupported=s}static probe(t){const e=Ys.syncOffset(t)
return e>0&&v.warn(`MPEG2-TS detected but first sync word found @ offset ${e}`),-1!==e}static syncOffset(t){const e=t.length,s=Math.min(940,t.length-Vs)+1
let i=0
for(;i<s;){let r=!1
for(let n=i;n<e&&71===t[n];n+=Vs)if(r||0!==qs(t,n)||(r=!0),r&&n+Vs>s)return i
i++}return-1}static createTrack(t,e){return{container:"video"===t||"audio"===t?"video/mp2t":void 0,type:t,id:ht[t],pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],dropped:0,duration:"audio"===t?e:void 0}}resetInitSegment(t,e,s,i){this.pmtParsed=!1,this._pmtId=-1,this._avcTrack=Ys.createTrack("video"),this._audioTrack=Ys.createTrack("audio",i),this._id3Track=Ys.createTrack("id3"),this._txtTrack=Ys.createTrack("text"),this._audioTrack.segmentCodec="aac",this.aacOverFlow=null,this.avcSample=null,this.remainderData=null,this.audioCodec=e,this.videoCodec=s,this._duration=i}resetTimeStamp(){}resetContiguity(){const{_audioTrack:t,_avcTrack:e,_id3Track:s}=this
t&&(t.pesData=null),e&&(e.pesData=null),s&&(s.pesData=null),this.aacOverFlow=null,this.avcSample=null,this.remainderData=null}demux(t,e,s=!1,i=!1){let r
s||(this.sampleAes=null)
const n=this._avcTrack,a=this._audioTrack,o=this._id3Track,l=this._txtTrack
let h=n.pid,d=n.pesData,c=a.pid,u=o.pid,f=a.pesData,y=o.pesData,T=null,E=this.pmtParsed,S=this._pmtId,L=t.length
if(this.remainderData&&(L=(t=vt(this.remainderData,t)).length,this.remainderData=null),L<Vs&&!i)return this.remainderData=t,{audioTrack:a,videoTrack:n,id3Track:o,textTrack:l}
const A=Math.max(0,Ys.syncOffset(t))
L-=(L-A)%Vs,L<t.byteLength&&!i&&(this.remainderData=new Uint8Array(t.buffer,L,t.buffer.byteLength-L))
let R=0
for(let g=A;g<L;g+=Vs)if(71===t[g]){const e=!!(64&t[g+1]),i=qs(t,g)
let m
if((48&t[g+3])>>4>1){if(m=g+5+t[g+4],m===g+Vs)continue}else m=g+4
switch(i){case h:e&&(d&&(r=zs(d))&&this.parseAVCPES(n,l,r,!1),d={data:[],size:0}),d&&(d.data.push(t.subarray(m,g+Vs)),d.size+=g+Vs-m)
break
case c:if(e){if(f&&(r=zs(f)))switch(a.segmentCodec){case"aac":this.parseAACPES(a,r)
break
case"mp3":this.parseMPEGPES(a,r)}f={data:[],size:0}}f&&(f.data.push(t.subarray(m,g+Vs)),f.size+=g+Vs-m)
break
case u:e&&(y&&(r=zs(y))&&this.parseID3PES(o,r),y={data:[],size:0}),y&&(y.data.push(t.subarray(m,g+Vs)),y.size+=g+Vs-m)
break
case 0:e&&(m+=t[m]+1),S=this._pmtId=js(t,m)
break
case S:{e&&(m+=t[m]+1)
const i=Xs(t,m,this.typeSupported,s)
h=i.avc,h>0&&(n.pid=h),c=i.audio,c>0&&(a.pid=c,a.segmentCodec=i.segmentCodec),u=i.id3,u>0&&(o.pid=u),null===T||E||(v.warn(`MPEG-TS PMT found at ${g} after unknown PID '${T}'. Backtracking to sync byte @${A} to parse all TS packets.`),T=null,g=A-188),E=this.pmtParsed=!0
break}case 17:case 8191:break
default:T=i}}else R++
if(R>0){const t=new Error(`Found ${R} TS packet/s that do not start with 0x47`)
this.observer.emit(g.ERROR,g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_PARSING_ERROR,fatal:!1,error:t,reason:t.message})}n.pesData=d,a.pesData=f,o.pesData=y
const b={audioTrack:a,videoTrack:n,id3Track:o,textTrack:l}
return i&&this.extractRemainingSamples(b),b}flush(){const{remainderData:t}=this
let e
return this.remainderData=null,e=t?this.demux(t,-1,!1,!0):{videoTrack:this._avcTrack,audioTrack:this._audioTrack,id3Track:this._id3Track,textTrack:this._txtTrack},this.extractRemainingSamples(e),this.sampleAes?this.decrypt(e,this.sampleAes):e}extractRemainingSamples(t){const{audioTrack:e,videoTrack:s,id3Track:i,textTrack:r}=t,n=s.pesData,a=e.pesData,o=i.pesData
let l
if(n&&(l=zs(n))?(this.parseAVCPES(s,r,l,!0),s.pesData=null):s.pesData=n,a&&(l=zs(a))){switch(e.segmentCodec){case"aac":this.parseAACPES(e,l)
break
case"mp3":this.parseMPEGPES(e,l)}e.pesData=null}else null!=a&&a.size&&v.log("last AAC PES packet truncated,might overlap between fragments"),e.pesData=a
o&&(l=zs(o))?(this.parseID3PES(i,l),i.pesData=null):i.pesData=o}demuxSampleAes(t,e,s){const i=this.demux(t,s,!0,!this.config.progressive),r=this.sampleAes=new Hs(this.observer,this.config,e)
return this.decrypt(i,r)}decrypt(t,e){return new Promise((s=>{const{audioTrack:i,videoTrack:r}=t
i.samples&&"aac"===i.segmentCodec?e.decryptAacSamples(i.samples,0,(()=>{r.samples?e.decryptAvcSamples(r.samples,0,0,(()=>{s(t)})):s(t)})):r.samples&&e.decryptAvcSamples(r.samples,0,0,(()=>{s(t)}))}))}destroy(){this._duration=0}parseAVCPES(t,e,s,i){const r=this.parseAVCNALu(t,s.data)
let n,a=this.avcSample,o=!1
s.data=null,a&&r.length&&!t.audFound&&(Qs(a,t),a=this.avcSample=Ws(!1,s.pts,s.dts,"")),r.forEach((i=>{switch(i.type){case 1:{n=!0,a||(a=this.avcSample=Ws(!0,s.pts,s.dts,"")),a.frame=!0
const t=i.data
if(o&&t.length>4){const e=new Ks(t).readSliceType()
2!==e&&4!==e&&7!==e&&9!==e||(a.key=!0)}break}case 5:n=!0,a||(a=this.avcSample=Ws(!0,s.pts,s.dts,"")),a.key=!0,a.frame=!0
break
case 6:n=!0,At(i.data,1,s.pts,e.samples)
break
case 7:if(n=!0,o=!0,!t.sps){const e=i.data,s=new Ks(e).readSPS()
t.width=s.width,t.height=s.height,t.pixelRatio=s.pixelRatio,t.sps=[e],t.duration=this._duration
const r=e.subarray(1,4)
let n="avc1."
for(let t=0;t<3;t++){let e=r[t].toString(16)
e.length<2&&(e="0"+e),n+=e}t.codec=n}break
case 8:n=!0,t.pps||(t.pps=[i.data])
break
case 9:n=!1,t.audFound=!0,a&&Qs(a,t),a=this.avcSample=Ws(!1,s.pts,s.dts,"")
break
case 12:n=!0
break
default:n=!1,a&&(a.debug+="unknown NAL "+i.type+" ")}a&&n&&a.units.push(i)})),i&&a&&(Qs(a,t),this.avcSample=null)}getLastNalUnit(t){var e
let s,i=this.avcSample
if(i&&0!==i.units.length||(i=t[t.length-1]),null!=(e=i)&&e.units){const t=i.units
s=t[t.length-1]}return s}parseAVCNALu(t,e){const s=e.byteLength
let i=t.naluState||0
const r=i,n=[]
let a,o,l,h=0,d=-1,c=0
for(-1===i&&(d=0,c=31&e[0],i=0,h=1);h<s;)if(a=e[h++],i)if(1!==i)if(a)if(1===a){if(d>=0){const t={data:e.subarray(d,h-i-1),type:c}
n.push(t)}else{const s=this.getLastNalUnit(t.samples)
if(s&&(r&&h<=4-r&&s.state&&(s.data=s.data.subarray(0,s.data.byteLength-r)),o=h-i-1,o>0)){const t=new Uint8Array(s.data.byteLength+o)
t.set(s.data,0),t.set(e.subarray(0,o),s.data.byteLength),s.data=t,s.state=0}}h<s?(l=31&e[h],d=h,c=l,i=0):i=-1}else i=0
else i=3
else i=a?0:2
else i=a?0:1
if(d>=0&&i>=0){const t={data:e.subarray(d,s),type:c,state:i}
n.push(t)}if(0===n.length){const s=this.getLastNalUnit(t.samples)
if(s){const t=new Uint8Array(s.data.byteLength+e.byteLength)
t.set(s.data,0),t.set(e,s.data.byteLength),s.data=t}}return t.naluState=i,n}parseAACPES(t,e){let s=0
const i=this.aacOverFlow
let r,n,a,o=e.data
if(i){this.aacOverFlow=null
const e=i.missing,r=i.sample.unit.byteLength
if(-1===e){const t=new Uint8Array(r+o.byteLength)
t.set(i.sample.unit,0),t.set(o,r),o=t}else{const n=r-e
i.sample.unit.set(o.subarray(0,e),n),t.samples.push(i.sample),s=i.missing}}for(r=s,n=o.length;r<n-1&&!Is(o,r);r++);if(r!==s){let t
const e=r<n-1
t=e?`AAC PES did not start with ADTS header,offset:${r}`:"No ADTS header found in AAC PES"
const s=new Error(t)
if(v.warn(`parsing error: ${t}`),this.observer.emit(g.ERROR,g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_PARSING_ERROR,fatal:!1,levelRetry:e,error:s,reason:t}),!e)return}if(ks(t,this.observer,o,r,this.audioCodec),void 0!==e.pts)a=e.pts
else{if(!i)return void v.warn("[tsdemuxer]: AAC PES unknown PTS")
{const e=ws(t.samplerate)
a=i.sample.pts+e}}let l,h=0
for(;r<n;){if(l=Cs(t,o,r,a,h),r+=l.length,l.missing){this.aacOverFlow=l
break}for(h++;r<n-1&&!Is(o,r);r++);}}parseMPEGPES(t,e){const s=e.data,i=s.length
let r=0,n=0
const a=e.pts
if(void 0!==a)for(;n<i;)if($s(s,n)){const e=Ns(t,s,n,a,r)
if(!e)break
n+=e.length,r++}else n++
else v.warn("[tsdemuxer]: MPEG PES unknown PTS")}parseID3PES(t,e){if(void 0===e.pts)return void v.warn("[tsdemuxer]: ID3 PES unknown PTS")
const s=u({},e,{type:this._avcTrack?re:ie,duration:Number.POSITIVE_INFINITY})
t.samples.push(s)}}function Ws(t,e,s,i){return{key:t,frame:!1,pts:e,dts:s,units:[],debug:i,length:0}}function qs(t,e){return((31&t[e+1])<<8)+t[e+2]}function js(t,e){return(31&t[e+10])<<8|t[e+11]}function Xs(t,e,s,i){const r={audio:-1,avc:-1,id3:-1,segmentCodec:"aac"},n=e+3+((15&t[e+1])<<8|t[e+2])-4
for(e+=12+((15&t[e+10])<<8|t[e+11]);e<n;){const n=qs(t,e)
switch(t[e]){case 207:if(!i){v.log("ADTS AAC with AES-128-CBC frame encryption found in unencrypted stream")
break}case 15:-1===r.audio&&(r.audio=n)
break
case 21:-1===r.id3&&(r.id3=n)
break
case 219:if(!i){v.log("H.264 with AES-128-CBC slice encryption found in unencrypted stream")
break}case 27:-1===r.avc&&(r.avc=n)
break
case 3:case 4:!0!==s.mpeg&&!0!==s.mp3?v.log("MPEG audio found, not supported in this browser"):-1===r.audio&&(r.audio=n,r.segmentCodec="mp3")
break
case 36:v.warn("Unsupported HEVC stream type found")}e+=5+((15&t[e+3])<<8|t[e+4])}return r}function zs(t){let e,s,i,r,n,a=0
const o=t.data
if(!t||0===t.size)return null
for(;o[0].length<19&&o.length>1;){const t=new Uint8Array(o[0].length+o[1].length)
t.set(o[0]),t.set(o[1],o[0].length),o[0]=t,o.splice(1,1)}if(e=o[0],1===(e[0]<<16)+(e[1]<<8)+e[2]){if(s=(e[4]<<8)+e[5],s&&s>t.size-6)return null
const l=e[7]
192&l&&(r=536870912*(14&e[9])+4194304*(255&e[10])+16384*(254&e[11])+128*(255&e[12])+(254&e[13])/2,64&l?(n=536870912*(14&e[14])+4194304*(255&e[15])+16384*(254&e[16])+128*(255&e[17])+(254&e[18])/2,r-n>54e5&&(v.warn(`${Math.round((r-n)/9e4)}s delta between PTS and DTS, align them`),r=n)):n=r),i=e[8]
let h=i+9
if(t.size<=h)return null
t.size-=h
const d=new Uint8Array(t.size)
for(let t=0,s=o.length;t<s;t++){e=o[t]
let s=e.byteLength
if(h){if(h>s){h-=s
continue}e=e.subarray(h),s-=h,h=0}d.set(e,a),a+=s}return s&&(s-=i+3),{data:d,pts:r,dts:n,len:s}}return null}function Qs(t,e){if(t.units.length&&t.frame){if(void 0===t.pts){const s=e.samples,i=s.length
if(!i)return void e.dropped++
{const e=s[i-1]
t.pts=e.pts,t.dts=e.dts}}e.samples.push(t)}t.debug.length&&v.log(t.pts+"/"+t.dts+":"+t.debug)}class Js{static getSilentFrame(t,e){if("mp4a.40.2"===t){if(1===e)return new Uint8Array([0,200,0,128,35,128])
if(2===e)return new Uint8Array([33,0,73,144,2,25,0,35,128])
if(3===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,142])
if(4===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,128,44,128,8,2,56])
if(5===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,56])
if(6===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,0,178,0,32,8,224])}else{if(1===e)return new Uint8Array([1,64,34,128,163,78,230,128,186,8,0,0,0,28,6,241,193,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])
if(2===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])
if(3===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])}}}const Zs=Math.pow(2,32)-1
class ti{static init(){let t
for(t in ti.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],".mp3":[],mvex:[],mvhd:[],pasp:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[]},ti.types)ti.types.hasOwnProperty(t)&&(ti.types[t]=[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)])
const e=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),s=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0])
ti.HDLR_TYPES={video:e,audio:s}
const i=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),r=new Uint8Array([0,0,0,0,0,0,0,0])
ti.STTS=ti.STSC=ti.STCO=r,ti.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),ti.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0]),ti.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),ti.STSD=new Uint8Array([0,0,0,0,0,0,0,1])
const n=new Uint8Array([105,115,111,109]),a=new Uint8Array([97,118,99,49]),o=new Uint8Array([0,0,0,1])
ti.FTYP=ti.box(ti.types.ftyp,n,o,n,a),ti.DINF=ti.box(ti.types.dinf,ti.box(ti.types.dref,i))}static box(t,...e){let s=8,i=e.length
const r=i
for(;i--;)s+=e[i].byteLength
const n=new Uint8Array(s)
for(n[0]=s>>24&255,n[1]=s>>16&255,n[2]=s>>8&255,n[3]=255&s,n.set(t,4),i=0,s=8;i<r;i++)n.set(e[i],s),s+=e[i].byteLength
return n}static hdlr(t){return ti.box(ti.types.hdlr,ti.HDLR_TYPES[t])}static mdat(t){return ti.box(ti.types.mdat,t)}static mdhd(t,e){e*=t
const s=Math.floor(e/(Zs+1)),i=Math.floor(e%(Zs+1))
return ti.box(ti.types.mdhd,new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,t>>24&255,t>>16&255,t>>8&255,255&t,s>>24,s>>16&255,s>>8&255,255&s,i>>24,i>>16&255,i>>8&255,255&i,85,196,0,0]))}static mdia(t){return ti.box(ti.types.mdia,ti.mdhd(t.timescale,t.duration),ti.hdlr(t.type),ti.minf(t))}static mfhd(t){return ti.box(ti.types.mfhd,new Uint8Array([0,0,0,0,t>>24,t>>16&255,t>>8&255,255&t]))}static minf(t){return"audio"===t.type?ti.box(ti.types.minf,ti.box(ti.types.smhd,ti.SMHD),ti.DINF,ti.stbl(t)):ti.box(ti.types.minf,ti.box(ti.types.vmhd,ti.VMHD),ti.DINF,ti.stbl(t))}static moof(t,e,s){return ti.box(ti.types.moof,ti.mfhd(t),ti.traf(s,e))}static moov(t){let e=t.length
const s=[]
for(;e--;)s[e]=ti.trak(t[e])
return ti.box.apply(null,[ti.types.moov,ti.mvhd(t[0].timescale,t[0].duration)].concat(s).concat(ti.mvex(t)))}static mvex(t){let e=t.length
const s=[]
for(;e--;)s[e]=ti.trex(t[e])
return ti.box.apply(null,[ti.types.mvex,...s])}static mvhd(t,e){e*=t
const s=Math.floor(e/(Zs+1)),i=Math.floor(e%(Zs+1)),r=new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,t>>24&255,t>>16&255,t>>8&255,255&t,s>>24,s>>16&255,s>>8&255,255&s,i>>24,i>>16&255,i>>8&255,255&i,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255])
return ti.box(ti.types.mvhd,r)}static sdtp(t){const e=t.samples||[],s=new Uint8Array(4+e.length)
let i,r
for(i=0;i<e.length;i++)r=e[i].flags,s[i+4]=r.dependsOn<<4|r.isDependedOn<<2|r.hasRedundancy
return ti.box(ti.types.sdtp,s)}static stbl(t){return ti.box(ti.types.stbl,ti.stsd(t),ti.box(ti.types.stts,ti.STTS),ti.box(ti.types.stsc,ti.STSC),ti.box(ti.types.stsz,ti.STSZ),ti.box(ti.types.stco,ti.STCO))}static avc1(t){let e,s,i,r=[],n=[]
for(e=0;e<t.sps.length;e++)s=t.sps[e],i=s.byteLength,r.push(i>>>8&255),r.push(255&i),r=r.concat(Array.prototype.slice.call(s))
for(e=0;e<t.pps.length;e++)s=t.pps[e],i=s.byteLength,n.push(i>>>8&255),n.push(255&i),n=n.concat(Array.prototype.slice.call(s))
const a=ti.box(ti.types.avcC,new Uint8Array([1,r[3],r[4],r[5],255,224|t.sps.length].concat(r).concat([t.pps.length]).concat(n))),o=t.width,l=t.height,h=t.pixelRatio[0],d=t.pixelRatio[1]
return ti.box(ti.types.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,o>>8&255,255&o,l>>8&255,255&l,0,72,0,0,0,72,0,0,0,0,0,0,0,1,18,100,97,105,108,121,109,111,116,105,111,110,47,104,108,115,46,106,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),a,ti.box(ti.types.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])),ti.box(ti.types.pasp,new Uint8Array([h>>24,h>>16&255,h>>8&255,255&h,d>>24,d>>16&255,d>>8&255,255&d])))}static esds(t){const e=t.config.length
return new Uint8Array([0,0,0,0,3,23+e,0,1,0,4,15+e,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([e]).concat(t.config).concat([6,1,2]))}static mp4a(t){const e=t.samplerate
return ti.box(ti.types.mp4a,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t.channelCount,0,16,0,0,0,0,e>>8&255,255&e,0,0]),ti.box(ti.types.esds,ti.esds(t)))}static mp3(t){const e=t.samplerate
return ti.box(ti.types[".mp3"],new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t.channelCount,0,16,0,0,0,0,e>>8&255,255&e,0,0]))}static stsd(t){return"audio"===t.type?"mp3"===t.segmentCodec&&"mp3"===t.codec?ti.box(ti.types.stsd,ti.STSD,ti.mp3(t)):ti.box(ti.types.stsd,ti.STSD,ti.mp4a(t)):ti.box(ti.types.stsd,ti.STSD,ti.avc1(t))}static tkhd(t){const e=t.id,s=t.duration*t.timescale,i=t.width,r=t.height,n=Math.floor(s/(Zs+1)),a=Math.floor(s%(Zs+1))
return ti.box(ti.types.tkhd,new Uint8Array([1,0,0,7,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,e>>24&255,e>>16&255,e>>8&255,255&e,0,0,0,0,n>>24,n>>16&255,n>>8&255,255&n,a>>24,a>>16&255,a>>8&255,255&a,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,i>>8&255,255&i,0,0,r>>8&255,255&r,0,0]))}static traf(t,e){const s=ti.sdtp(t),i=t.id,r=Math.floor(e/(Zs+1)),n=Math.floor(e%(Zs+1))
return ti.box(ti.types.traf,ti.box(ti.types.tfhd,new Uint8Array([0,0,0,0,i>>24,i>>16&255,i>>8&255,255&i])),ti.box(ti.types.tfdt,new Uint8Array([1,0,0,0,r>>24,r>>16&255,r>>8&255,255&r,n>>24,n>>16&255,n>>8&255,255&n])),ti.trun(t,s.length+16+20+8+16+8+8),s)}static trak(t){return t.duration=t.duration||4294967295,ti.box(ti.types.trak,ti.tkhd(t),ti.mdia(t))}static trex(t){const e=t.id
return ti.box(ti.types.trex,new Uint8Array([0,0,0,0,e>>24,e>>16&255,e>>8&255,255&e,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]))}static trun(t,e){const s=t.samples||[],i=s.length,r=12+16*i,n=new Uint8Array(r)
let a,o,l,h,d,c
for(e+=8+r,n.set(["video"===t.type?1:0,0,15,1,i>>>24&255,i>>>16&255,i>>>8&255,255&i,e>>>24&255,e>>>16&255,e>>>8&255,255&e],0),a=0;a<i;a++)o=s[a],l=o.duration,h=o.size,d=o.flags,c=o.cts,n.set([l>>>24&255,l>>>16&255,l>>>8&255,255&l,h>>>24&255,h>>>16&255,h>>>8&255,255&h,d.isLeading<<2|d.dependsOn,d.isDependedOn<<6|d.hasRedundancy<<4|d.paddingValue<<1|d.isNonSync,61440&d.degradPrio,15&d.degradPrio,c>>>24&255,c>>>16&255,c>>>8&255,255&c],12+16*a)
return ti.box(ti.types.trun,n)}static initSegment(t){ti.types||ti.init()
const e=ti.moov(t),s=new Uint8Array(ti.FTYP.byteLength+e.byteLength)
return s.set(ti.FTYP),s.set(e,ti.FTYP.byteLength),s}}ti.types=void 0,ti.HDLR_TYPES=void 0,ti.STTS=void 0,ti.STSC=void 0,ti.STCO=void 0,ti.STSZ=void 0,ti.VMHD=void 0,ti.SMHD=void 0,ti.STSD=void 0,ti.FTYP=void 0,ti.DINF=void 0
const ei=9e4
function si(t,e,s=1,i=!1){const r=t*e*s
return i?Math.round(r):r}function ii(t,e=!1){return si(t,1e3,1/ei,e)}let ri,ni=null,ai=null
class oi{constructor(t,e,s,i=""){if(this.observer=void 0,this.config=void 0,this.typeSupported=void 0,this.ISGenerated=!1,this._initPTS=null,this._initDTS=null,this.nextAvcDts=null,this.nextAudioPts=null,this.videoSampleDuration=null,this.isAudioContiguous=!1,this.isVideoContiguous=!1,this.observer=t,this.config=e,this.typeSupported=s,this.ISGenerated=!1,null===ni){const t=(navigator.userAgent||"").match(/Chrome\/(\d+)/i)
ni=t?parseInt(t[1]):0}if(null===ai){const t=navigator.userAgent.match(/Safari\/(\d+)/i)
ai=t?parseInt(t[1]):0}}destroy(){}resetTimeStamp(t){v.log("[mp4-remuxer]: initPTS & initDTS reset"),this._initPTS=this._initDTS=t}resetNextTimestamp(){v.log("[mp4-remuxer]: reset next timestamp"),this.isVideoContiguous=!1,this.isAudioContiguous=!1}resetInitSegment(){v.log("[mp4-remuxer]: ISGenerated flag reset"),this.ISGenerated=!1}getVideoStartPts(t){let e=!1
const s=t.reduce(((t,s)=>{const i=s.pts-t
return i<-4294967296?(e=!0,li(t,s.pts)):i>0?t:s.pts}),t[0].pts)
return e&&v.debug("PTS rollover detected"),s}remux(t,e,s,i,r,n,a,o){let l,h,d,c,u,f,g=r,m=r
const p=t.pid>-1,y=e.pid>-1,T=e.samples.length,E=t.samples.length>0,S=a&&T>0||T>1
if((!p||E)&&(!y||S)||this.ISGenerated||a){this.ISGenerated||(d=this.generateIS(t,e,r,n))
const s=this.isVideoContiguous
let i,a=-1
if(S&&(a=function(t){for(let e=0;e<t.length;e++)if(t[e].key)return e
return-1}(e.samples),!s&&this.config.forceKeyFrameOnDiscontinuity))if(f=!0,a>0){v.warn(`[mp4-remuxer]: Dropped ${a} out of ${T} video samples due to a missing keyframe`)
const t=this.getVideoStartPts(e.samples)
e.samples=e.samples.slice(a),e.dropped+=a,m+=(e.samples[0].pts-t)/e.inputTimeScale,i=m}else-1===a&&(v.warn(`[mp4-remuxer]: No keyframe found out of ${T} video samples`),f=!1)
if(this.ISGenerated){if(E&&S){const s=this.getVideoStartPts(e.samples),i=(li(t.samples[0].pts,s)-s)/e.inputTimeScale
g+=Math.max(0,i),m+=Math.max(0,-i)}if(E){if(t.samplerate||(v.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"),d=this.generateIS(t,e,r,n)),h=this.remuxAudio(t,g,this.isAudioContiguous,n,y||S||o===Xt.AUDIO?m:void 0),S){const i=h?h.endPTS-h.startPTS:0
e.inputTimeScale||(v.warn("[mp4-remuxer]: regenerate InitSegment as video detected"),d=this.generateIS(t,e,r,n)),l=this.remuxVideo(e,m,s,i)}}else S&&(l=this.remuxVideo(e,m,s,0))
l&&(l.firstKeyFrame=a,l.independent=-1!==a,l.firstKeyFramePTS=i)}}return this.ISGenerated&&this._initPTS&&this._initDTS&&(s.samples.length&&(u=hi(s,r,this._initPTS,this._initDTS)),i.samples.length&&(c=di(i,r,this._initPTS))),{audio:h,video:l,initSegment:d,independent:f,text:c,id3:u}}generateIS(t,e,s,i){const r=t.samples,n=e.samples,a=this.typeSupported,o={},l=this._initPTS
let h,d,c,u=!l||i,f="audio/mp4"
if(u&&(h=d=1/0),t.config&&r.length&&(t.timescale=t.samplerate,"mp3"===t.segmentCodec&&(a.mpeg?(f="audio/mpeg",t.codec=""):a.mp3&&(t.codec="mp3")),o.audio={id:"audio",container:f,codec:t.codec,initSegment:"mp3"===t.segmentCodec&&a.mpeg?new Uint8Array(0):ti.initSegment([t]),metadata:{channelCount:t.channelCount}},u&&(c=t.inputTimeScale,l&&c===l.timescale?u=!1:h=d=r[0].pts-Math.round(c*s))),e.sps&&e.pps&&n.length&&(e.timescale=e.inputTimeScale,o.video={id:"main",container:"video/mp4",codec:e.codec,initSegment:ti.initSegment([e]),metadata:{width:e.width,height:e.height}},u))if(c=e.inputTimeScale,l&&c===l.timescale)u=!1
else{const t=this.getVideoStartPts(n),e=Math.round(c*s)
d=Math.min(d,li(n[0].dts,t)-e),h=Math.min(h,t-e)}if(Object.keys(o).length)return this.ISGenerated=!0,u?(this._initPTS={baseTime:h,timescale:c},this._initDTS={baseTime:d,timescale:c}):h=c=void 0,{tracks:o,initPTS:h,timescale:c}}remuxVideo(t,e,s,i){const r=t.inputTimeScale,n=t.samples,a=[],o=n.length,l=this._initPTS
let h,d,c=this.nextAvcDts,f=8,y=this.videoSampleDuration,T=Number.POSITIVE_INFINITY,E=Number.NEGATIVE_INFINITY,S=!1
s&&null!==c||(c=e*r-(n[0].pts-li(n[0].dts,n[0].pts)))
const L=l.baseTime*r/l.timescale
for(let u=0;u<o;u++){const t=n[u]
t.pts=li(t.pts-L,c),t.dts=li(t.dts-L,c),t.dts<n[u>0?u-1:u].dts&&(S=!0)}S&&n.sort((function(t,e){const s=t.dts-e.dts,i=t.pts-e.pts
return s||i})),h=n[0].dts,d=n[n.length-1].dts
const A=d-h,R=A?Math.round(A/(o-1)):y||t.inputTimeScale/30
if(s){const t=h-c,e=t>R,s=t<-1
if((e||s)&&(e?v.warn(`AVC: ${ii(t,!0)} ms (${t}dts) hole between fragments detected, filling it`):v.warn(`AVC: ${ii(-t,!0)} ms (${t}dts) overlapping between fragments detected`),!s||c>n[0].pts)){h=c
const e=n[0].pts-t
n[0].dts=h,n[0].pts=e,v.log(`Video: First PTS/DTS adjusted: ${ii(e,!0)}/${ii(h,!0)}, delta: ${ii(t,!0)} ms`)}}h=Math.max(0,h)
let b=0,I=0
for(let u=0;u<o;u++){const t=n[u],e=t.units,s=e.length
let i=0
for(let r=0;r<s;r++)i+=e[r].data.length
I+=i,b+=s,t.length=i,t.dts=Math.max(t.dts,h),T=Math.min(t.pts,T),E=Math.max(t.pts,E)}d=n[o-1].dts
const D=I+4*b+8
let k
try{k=new Uint8Array(D)}catch(t){return void this.observer.emit(g.ERROR,g.ERROR,{type:m.MUX_ERROR,details:p.REMUX_ALLOC_ERROR,fatal:!1,error:t,bytes:D,reason:`fail allocating video mdat ${D}`})}const w=new DataView(k.buffer)
w.setUint32(0,D),k.set(ti.types.mdat,4)
let C=!1,_=Number.POSITIVE_INFINITY,P=Number.POSITIVE_INFINITY,x=Number.NEGATIVE_INFINITY,F=Number.NEGATIVE_INFINITY
for(let u=0;u<o;u++){const t=n[u],e=t.units
let s,l=0
for(let i=0,r=e.length;i<r;i++){const t=e[i],s=t.data,r=t.data.byteLength
w.setUint32(f,r),f+=4,k.set(s,f),f+=r,l+=4+r}if(u<o-1)y=n[u+1].dts-t.dts,s=n[u+1].pts-t.pts
else{const e=this.config,a=u>0?t.dts-n[u-1].dts:R
if(s=u>0?t.pts-n[u-1].pts:R,e.stretchShortVideoTrack&&null!==this.nextAudioPts){const s=Math.floor(e.maxBufferHole*r),n=(i?T+i*r:this.nextAudioPts)-t.pts
n>s?(y=n-a,y<0?y=a:C=!0,v.log(`[mp4-remuxer]: It is approximately ${n/90} ms to the next segment; using duration ${y/90} ms for the last video frame.`)):y=a}else y=a}const h=Math.round(t.pts-t.dts)
_=Math.min(_,y),x=Math.max(x,y),P=Math.min(P,s),F=Math.max(F,s),a.push(new ci(t.key,y,l,h))}if(a.length)if(ni){if(ni<70){const t=a[0].flags
t.dependsOn=2,t.isNonSync=0}}else if(ai&&F-P<x-_&&R/x<.025&&0===a[0].cts){v.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.")
let t=h
for(let e=0,s=a.length;e<s;e++){const i=t+a[e].duration,r=t+a[e].cts
if(e<s-1){const t=i+a[e+1].cts
a[e].duration=t-r}else a[e].duration=e?a[e-1].duration:R
a[e].cts=0,t=i}}y=C||!y?R:y,this.nextAvcDts=c=d+y,this.videoSampleDuration=y,this.isVideoContiguous=!0
const O={data1:ti.moof(t.sequenceNumber++,h,u({},t,{samples:a})),data2:k,startPTS:T/r,endPTS:(E+y)/r,startDTS:h/r,endDTS:c/r,type:"video",hasAudio:!1,hasVideo:!0,nb:a.length,dropped:t.dropped}
return t.samples=[],t.dropped=0,O}remuxAudio(t,e,s,i,r){const n=t.inputTimeScale,a=n/(t.samplerate?t.samplerate:n),o="aac"===t.segmentCodec?1024:1152,l=o*a,h=this._initPTS,d="mp3"===t.segmentCodec&&this.typeSupported.mpeg,c=[],f=void 0!==r
let y=t.samples,T=d?0:8,E=this.nextAudioPts||-1
const S=e*n,L=h.baseTime*n/h.timescale
if(this.isAudioContiguous=s=s||y.length&&E>0&&(i&&Math.abs(S-E)<9e3||Math.abs(li(y[0].pts-L,S)-E)<20*l),y.forEach((function(t){t.pts=li(t.pts-L,S)})),!s||E<0){if(y=y.filter((t=>t.pts>=0)),!y.length)return
E=0===r?0:i&&!f?Math.max(0,S):y[0].pts}if("aac"===t.segmentCodec){const e=this.config.maxAudioFramesDrift
for(let s=0,i=E;s<y.length;s++){const r=y[s],a=r.pts,o=a-i,h=Math.abs(1e3*o/n)
if(o<=-e*l&&f)0===s&&(v.warn(`Audio frame @ ${(a/n).toFixed(3)}s overlaps nextAudioPts by ${Math.round(1e3*o/n)} ms.`),this.nextAudioPts=E=i=a)
else if(o>=e*l&&h<1e4&&f){let e=Math.round(o/l)
i=a-e*l,i<0&&(e--,i+=l),0===s&&(this.nextAudioPts=E=i),v.warn(`[mp4-remuxer]: Injecting ${e} audio frame @ ${(i/n).toFixed(3)}s due to ${Math.round(1e3*o/n)} ms gap.`)
for(let n=0;n<e;n++){const e=Math.max(i,0)
let n=Js.getSilentFrame(t.manifestCodec||t.codec,t.channelCount)
n||(v.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."),n=r.unit.subarray()),y.splice(s,0,{unit:n,pts:e}),i+=l,s++}}r.pts=i,i+=l}}let A,R=null,b=null,I=0,D=y.length
for(;D--;)I+=y[D].unit.byteLength
for(let u=0,v=y.length;u<v;u++){const e=y[u],i=e.unit
let r=e.pts
if(null!==b)c[u-1].duration=Math.round((r-b)/a)
else{if(s&&"aac"===t.segmentCodec&&(r=E),R=r,!(I>0))return
I+=T
try{A=new Uint8Array(I)}catch(t){return void this.observer.emit(g.ERROR,g.ERROR,{type:m.MUX_ERROR,details:p.REMUX_ALLOC_ERROR,fatal:!1,error:t,bytes:I,reason:`fail allocating audio mdat ${I}`})}d||(new DataView(A.buffer).setUint32(0,I),A.set(ti.types.mdat,4))}A.set(i,T)
const n=i.byteLength
T+=n,c.push(new ci(!0,o,n,0)),b=r}const k=c.length
if(!k)return
const w=c[c.length-1]
this.nextAudioPts=E=b+a*w.duration
const C=d?new Uint8Array(0):ti.moof(t.sequenceNumber++,R/a,u({},t,{samples:c}))
t.samples=[]
const _=R/n,P=E/n,x={data1:C,data2:A,startPTS:_,endPTS:P,startDTS:_,endDTS:P,type:"audio",hasAudio:!0,hasVideo:!1,nb:k}
return this.isAudioContiguous=!0,x}remuxEmptyAudio(t,e,s,i){const r=t.inputTimeScale,n=r/(t.samplerate?t.samplerate:r),a=this.nextAudioPts,o=this._initDTS,l=9e4*o.baseTime/o.timescale,h=(null!==a?a:i.startDTS*r)+l,d=i.endDTS*r+l,c=1024*n,u=Math.ceil((d-h)/c),f=Js.getSilentFrame(t.manifestCodec||t.codec,t.channelCount)
if(v.warn("[mp4-remuxer]: remux empty Audio"),!f)return void v.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec")
const g=[]
for(let m=0;m<u;m++){const t=h+m*c
g.push({unit:f,pts:t,dts:t})}return t.samples=g,this.remuxAudio(t,e,s,!1)}}function li(t,e){let s
if(null===e)return t
for(s=e<t?-8589934592:8589934592;Math.abs(t-e)>4294967296;)t+=s
return t}function hi(t,e,s,i){const r=t.samples.length
if(!r)return
const n=t.inputTimeScale
for(let o=0;o<r;o++){const r=t.samples[o]
r.pts=li(r.pts-9e4*s.baseTime/s.timescale,e*n)/n,r.dts=li(r.dts-9e4*i.baseTime/i.timescale,e*n)/n}const a=t.samples
return t.samples=[],{samples:a}}function di(t,e,s){const i=t.samples.length
if(!i)return
const r=t.inputTimeScale
for(let a=0;a<i;a++){const i=t.samples[a]
i.pts=li(i.pts-9e4*s.baseTime/s.timescale,e*r)/r}t.samples.sort(((t,e)=>t.pts-e.pts))
const n=t.samples
return t.samples=[],{samples:n}}class ci{constructor(t,e,s,i){this.size=void 0,this.duration=void 0,this.cts=void 0,this.flags=void 0,this.duration=e,this.size=s,this.cts=i,this.flags=new ui(t)}}class ui{constructor(t){this.isLeading=0,this.isDependedOn=0,this.hasRedundancy=0,this.degradPrio=0,this.dependsOn=1,this.isNonSync=1,this.dependsOn=t?2:1,this.isNonSync=t?0:1}}function fi(t,e){const s=null==t?void 0:t.codec
return s&&s.length>4?s:"hvc1"===s||"hev1"===s?"hvc1.1.c.L120.90":"av01"===s?"av01.0.04M.08":"avc1"===s||e===D.VIDEO?"avc1.42e01e":"mp4a.40.5"}try{ri=self.performance.now.bind(self.performance)}catch(t){v.debug("Unable to use Performance API on this environment"),ri="undefined"!=typeof self&&self.Date.now}const gi=[{demux:class{constructor(t,e){this.remainderData=null,this.timeOffset=0,this.config=void 0,this.videoTrack=void 0,this.audioTrack=void 0,this.id3Track=void 0,this.txtTrack=void 0,this.config=e}resetTimeStamp(){}resetInitSegment(t,e,s,i){const r=this.videoTrack=vs("video",1),n=this.audioTrack=vs("audio",1),a=this.txtTrack=vs("text",1)
if(this.id3Track=vs("id3",1),this.timeOffset=0,null==t||!t.byteLength)return
const o=yt(t)
if(o.video){const{id:t,timescale:e,codec:s}=o.video
r.id=t,r.timescale=a.timescale=e,r.codec=s}if(o.audio){const{id:t,timescale:e,codec:s}=o.audio
n.id=t,n.timescale=e,n.codec=s}a.id=ht.text,r.sampleDuration=0,r.duration=n.duration=i}resetContiguity(){}static probe(t){return mt(t=t.length>16384?t.subarray(0,16384):t,["moof"]).length>0}demux(t,e){this.timeOffset=e
let s=t
const i=this.videoTrack,r=this.txtTrack
if(this.config.progressive){this.remainderData&&(s=vt(this.remainderData,t))
const e=function(t){const e={valid:null,remainder:null},s=mt(t,["moof"])
if(!s)return e
if(s.length<2)return e.remainder=t,e
const i=s[s.length-1]
return e.valid=V(t,0,i.byteOffset-8),e.remainder=V(t,i.byteOffset-8),e}(s)
this.remainderData=e.remainder,i.samples=e.valid||new Uint8Array}else i.samples=s
const n=this.extractID3Track(i,e)
return r.samples=St(e,i),{videoTrack:i,audioTrack:this.audioTrack,id3Track:n,textTrack:this.txtTrack}}flush(){const t=this.timeOffset,e=this.videoTrack,s=this.txtTrack
e.samples=this.remainderData||new Uint8Array,this.remainderData=null
const i=this.extractID3Track(e,this.timeOffset)
return s.samples=St(t,e),{videoTrack:e,audioTrack:vs(),id3Track:i,textTrack:vs()}}extractID3Track(t,e){const s=this.id3Track
if(t.samples.length){const i=mt(t.samples,["emsg"])
i&&i.forEach((t=>{const i=function(t){const e=t[0]
let s="",i="",r=0,n=0,a=0,o=0,l=0,h=0
if(0===e){for(;"\0"!==dt(t.subarray(h,h+1));)s+=dt(t.subarray(h,h+1)),h+=1
for(s+=dt(t.subarray(h,h+1)),h+=1;"\0"!==dt(t.subarray(h,h+1));)i+=dt(t.subarray(h,h+1)),h+=1
i+=dt(t.subarray(h,h+1)),h+=1,r=ut(t,12),n=ut(t,16),o=ut(t,20),l=ut(t,24),h=28}else if(1===e){h+=4,r=ut(t,h),h+=4
const e=ut(t,h)
h+=4
const n=ut(t,h)
for(h+=4,a=2**32*e+n,Number.isSafeInteger(a)||(a=Number.MAX_SAFE_INTEGER,v.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")),o=ut(t,h),h+=4,l=ut(t,h),h+=4;"\0"!==dt(t.subarray(h,h+1));)s+=dt(t.subarray(h,h+1)),h+=1
for(s+=dt(t.subarray(h,h+1)),h+=1;"\0"!==dt(t.subarray(h,h+1));)i+=dt(t.subarray(h,h+1)),h+=1
i+=dt(t.subarray(h,h+1)),h+=1}return{schemeIdUri:s,value:i,timeScale:r,presentationTime:a,presentationTimeDelta:n,eventDuration:o,id:l,payload:t.subarray(h,t.byteLength)}}(t)
if(_s.test(i.schemeIdUri)){const t=f(i.presentationTime)?i.presentationTime/i.timeScale:e+i.presentationTimeDelta/i.timeScale
let r=4294967295===i.eventDuration?Number.POSITIVE_INFINITY:i.eventDuration/i.timeScale
r<=.001&&(r=Number.POSITIVE_INFINITY)
const n=i.payload
s.samples.push({data:n,len:n.byteLength,dts:t,pts:t,type:re,duration:r})}}))}return s}demuxSampleAes(t,e,s){return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"))}destroy(){}},remux:class{constructor(){this.emitInitSegment=!1,this.audioCodec=void 0,this.videoCodec=void 0,this.initData=void 0,this.initPTS=null,this.initTracks=void 0,this.lastEndTime=null}destroy(){}resetTimeStamp(t){this.initPTS=t,this.lastEndTime=null}resetNextTimestamp(){this.lastEndTime=null}resetInitSegment(t,e,s,i){this.audioCodec=e,this.videoCodec=s,this.generateInitSegment(function(t,e){if(!t||!e)return t
const s=e.keyId
return s&&e.isCommonEncryption&&mt(t,["moov","trak"]).forEach((t=>{const e=mt(t,["mdia","minf","stbl","stsd"])[0].subarray(8)
let i=mt(e,["enca"])
const r=i.length>0
r||(i=mt(e,["encv"])),i.forEach((t=>{mt(r?t.subarray(28):t.subarray(78),["sinf"]).forEach((t=>{const e=Tt(t)
if(e){const t=e.subarray(8,24)
t.some((t=>0!==t))||(v.log(`[eme] Patching keyId in 'enc${r?"a":"v"}>sinf>>tenc' box: ${at(t)} -> ${at(s)}`),e.set(s,8))}}))}))})),t}(t,i)),this.emitInitSegment=!0}generateInitSegment(t){let{audioCodec:e,videoCodec:s}=this
if(null==t||!t.byteLength)return this.initTracks=void 0,void(this.initData=void 0)
const i=this.initData=yt(t)
e||(e=fi(i.audio,D.AUDIO)),s||(s=fi(i.video,D.VIDEO))
const r={}
i.audio&&i.video?r.audiovideo={container:"video/mp4",codec:e+","+s,initSegment:t,id:"main"}:i.audio?r.audio={container:"audio/mp4",codec:e,initSegment:t,id:"audio"}:i.video?r.video={container:"video/mp4",codec:s,initSegment:t,id:"main"}:v.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."),this.initTracks=r}remux(t,e,s,i,r,n){var a,o
let{initPTS:l,lastEndTime:h}=this
const d={audio:void 0,video:void 0,text:i,id3:s,initSegment:void 0}
f(h)||(h=this.lastEndTime=r||0)
const c=e.samples
if(null==c||!c.length)return d
const u={initPTS:void 0,timescale:1}
let g=this.initData
if(null!=(a=g)&&a.length||(this.generateInitSegment(c),g=this.initData),null==(o=g)||!o.length)return v.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."),d
this.emitInitSegment&&(u.tracks=this.initTracks,this.emitInitSegment=!1)
const m=function(t,e){return mt(e,["moof","traf"]).reduce(((e,s)=>{const i=mt(s,["tfdt"])[0],r=i[0],n=mt(s,["tfhd"]).reduce(((e,s)=>{const n=ut(s,4),a=t[n]
if(a){let t=ut(i,4)
if(1===r){if(t===ot)return v.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time"),e
t*=ot+1,t+=ut(i,8)}const s=t/(a.timescale||9e4)
if(isFinite(s)&&(null===e||s<e))return s}return e}),null)
return null!==n&&isFinite(n)&&(null===e||n<e)?n:e}),null)}(g,c),p=null===m?r:m;(function(t,e,s){if(null===t)return!0
const i=e-t.baseTime/t.timescale
return i<0&&Math.abs(i-s)>1}(l,p,r)||u.timescale!==l.timescale&&n)&&(u.initPTS=p-r,this.initPTS=l={baseTime:u.initPTS,timescale:1})
const y=function(t,e){let s=0,i=0,r=0
const n=mt(t,["moof","traf"])
for(let a=0;a<n.length;a++){const t=n[a],o=mt(t,["tfhd"])[0],l=e[ut(o,4)]
if(!l)continue
const h=l.default,d=ut(o,0)|(null==h?void 0:h.flags)
let c=null==h?void 0:h.duration
8&d&&(c=ut(o,2&d?12:8))
const u=l.timescale||9e4,f=mt(t,["trun"])
for(let e=0;e<f.length;e++)s=Et(f[e]),!s&&c&&(s=c*ut(f[e],4)),l.type===D.VIDEO?i+=s/u:l.type===D.AUDIO&&(r+=s/u)}if(0===i&&0===r){let e=0
const s=mt(t,["sidx"])
for(let t=0;t<s.length;t++){const i=pt(s[t])
null!=i&&i.references&&(e+=i.references.reduce(((t,e)=>t+e.info.duration||0),0))}return e}return i||r}(c,g),T=t?p-l.baseTime/l.timescale:h,E=T+y
!function(t,e,s){mt(e,["moof","traf"]).forEach((e=>{mt(e,["tfhd"]).forEach((i=>{const r=ut(i,4),n=t[r]
if(!n)return
const a=n.timescale||9e4
mt(e,["tfdt"]).forEach((t=>{const e=t[0]
let i=ut(t,4)
if(0===e)i-=s*a,i=Math.max(i,0),gt(t,4,i)
else{i*=Math.pow(2,32),i+=ut(t,8),i-=s*a,i=Math.max(i,0)
const e=Math.floor(i/(ot+1)),r=Math.floor(i%(ot+1))
gt(t,4,e),gt(t,8,r)}}))}))}))}(g,c,l.baseTime/l.timescale),y>0?this.lastEndTime=E:(v.warn("Duration parsed from mp4 should be greater than zero"),this.resetNextTimestamp())
const S=!!g.audio,L=!!g.video
let A=""
S&&(A+="audio"),L&&(A+="video")
const R={data1:c,startPTS:T,startDTS:T,endPTS:E,endDTS:E,type:A,hasAudio:S,hasVideo:L,nb:1,dropped:0}
return d.audio="audio"===R.type?R:void 0,d.video="audio"!==R.type?R:void 0,d.initSegment=u,d.id3=hi(s,r,l,l),i.samples.length&&(d.text=di(i,r,l)),d}}},{demux:Ys,remux:oi},{demux:class extends Ss{constructor(t,e){super(),this.observer=void 0,this.config=void 0,this.observer=t,this.config=e}resetInitSegment(t,e,s,i){super.resetInitSegment(t,e,s,i),this._audioTrack={container:"audio/adts",type:"audio",id:2,pid:-1,sequenceNumber:0,segmentCodec:"aac",samples:[],manifestCodec:e,duration:i,inputTimeScale:9e4,dropped:0}}static probe(t){if(!t)return!1
let e=(q(t,0)||[]).length
for(let s=t.length;e<s;e++)if(Ds(t,e))return v.log("ADTS sync word found !"),!0
return!1}canParse(t,e){return function(t,e){return function(t,e){return e+5<t.length}(t,e)&&As(t,e)&&bs(t,e)<=t.length-e}(t,e)}appendFrame(t,e,s){ks(t,this.observer,e,s,t.manifestCodec)
const i=Cs(t,e,s,this.basePTS,this.frameIndex)
if(i&&0===i.missing)return i}},remux:oi},{demux:class extends Ss{resetInitSegment(t,e,s,i){super.resetInitSegment(t,e,s,i),this._audioTrack={container:"audio/mpeg",type:"audio",id:2,pid:-1,sequenceNumber:0,segmentCodec:"mp3",samples:[],manifestCodec:e,duration:i,inputTimeScale:9e4,dropped:0}}static probe(t){if(!t)return!1
let e=(q(t,0)||[]).length
for(let s=t.length;e<s;e++)if(Gs(t,e))return v.log("MPEG Audio sync word found !"),!0
return!1}canParse(t,e){return function(t,e){return Bs(t,e)&&4<=t.length-e}(t,e)}appendFrame(t,e,s){if(null!==this.basePTS)return Ns(t,e,s,this.basePTS,this.frameIndex)}},remux:oi}]
class mi{constructor(t,e,s,i,r){this.async=!1,this.observer=void 0,this.typeSupported=void 0,this.config=void 0,this.vendor=void 0,this.id=void 0,this.demuxer=void 0,this.remuxer=void 0,this.decrypter=void 0,this.probe=void 0,this.decryptionPromise=null,this.transmuxConfig=void 0,this.currentTransmuxState=void 0,this.observer=t,this.typeSupported=e,this.config=s,this.vendor=i,this.id=r}configure(t){this.transmuxConfig=t,this.decrypter&&this.decrypter.reset()}push(t,e,s,i){const r=s.transmuxing
r.executeStart=ri()
let n=new Uint8Array(t)
const{currentTransmuxState:a,transmuxConfig:o}=this
i&&(this.currentTransmuxState=i)
const{contiguous:l,discontinuity:h,trackSwitch:d,accurateTimeOffset:c,timeOffset:u,initSegmentChange:f}=i||a,{audioCodec:y,videoCodec:T,defaultInitPts:E,duration:S,initSegmentData:L}=o,A=function(t,e){let s=null
return t.byteLength>0&&null!=e&&null!=e.key&&null!==e.iv&&null!=e.method&&(s=e),s}(n,e)
if(A&&"AES-128"===A.method){const t=this.getDecrypter()
if(!t.isSync())return this.decryptionPromise=t.webCryptoDecrypt(n,A.key.buffer,A.iv.buffer).then((t=>{const e=this.push(t,null,s)
return this.decryptionPromise=null,e})),this.decryptionPromise
{let e=t.softwareDecrypt(n,A.key.buffer,A.iv.buffer)
if(s.part>-1&&(e=t.flush()),!e)return r.executeEnd=ri(),pi(s)
n=new Uint8Array(e)}}const R=this.needsProbing(h,d)
if(R){const t=this.configureTransmuxer(n)
if(t)return v.warn(`[transmuxer] ${t.message}`),this.observer.emit(g.ERROR,g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_PARSING_ERROR,fatal:!1,error:t,reason:t.message}),r.executeEnd=ri(),pi(s)}(h||d||f||R)&&this.resetInitSegment(L,y,T,S,e),(h||f||R)&&this.resetInitialTimestamp(E),l||this.resetContiguity()
const b=this.transmux(n,A,u,c,s),I=this.currentTransmuxState
return I.contiguous=!0,I.discontinuity=!1,I.trackSwitch=!1,r.executeEnd=ri(),b}flush(t){const e=t.transmuxing
e.executeStart=ri()
const{decrypter:s,currentTransmuxState:i,decryptionPromise:r}=this
if(r)return r.then((()=>this.flush(t)))
const n=[],{timeOffset:a}=i
if(s){const e=s.flush()
e&&n.push(this.push(e,null,t))}const{demuxer:o,remuxer:l}=this
if(!o||!l)return e.executeEnd=ri(),[pi(t)]
const h=o.flush(a)
return yi(h)?h.then((e=>(this.flushRemux(n,e,t),n))):(this.flushRemux(n,h,t),n)}flushRemux(t,e,s){const{audioTrack:i,videoTrack:r,id3Track:n,textTrack:a}=e,{accurateTimeOffset:o,timeOffset:l}=this.currentTransmuxState
v.log(`[transmuxer.ts]: Flushed fragment ${s.sn}${s.part>-1?" p: "+s.part:""} of level ${s.level}`)
const h=this.remuxer.remux(i,r,n,a,l,o,!0,this.id)
t.push({remuxResult:h,chunkMeta:s}),s.transmuxing.executeEnd=ri()}resetInitialTimestamp(t){const{demuxer:e,remuxer:s}=this
e&&s&&(e.resetTimeStamp(t),s.resetTimeStamp(t))}resetContiguity(){const{demuxer:t,remuxer:e}=this
t&&e&&(t.resetContiguity(),e.resetNextTimestamp())}resetInitSegment(t,e,s,i,r){const{demuxer:n,remuxer:a}=this
n&&a&&(n.resetInitSegment(t,e,s,i),a.resetInitSegment(t,e,s,r))}destroy(){this.demuxer&&(this.demuxer.destroy(),this.demuxer=void 0),this.remuxer&&(this.remuxer.destroy(),this.remuxer=void 0)}transmux(t,e,s,i,r){let n
return n=e&&"SAMPLE-AES"===e.method?this.transmuxSampleAes(t,e,s,i,r):this.transmuxUnencrypted(t,s,i,r),n}transmuxUnencrypted(t,e,s,i){const{audioTrack:r,videoTrack:n,id3Track:a,textTrack:o}=this.demuxer.demux(t,e,!1,!this.config.progressive)
return{remuxResult:this.remuxer.remux(r,n,a,o,e,s,!1,this.id),chunkMeta:i}}transmuxSampleAes(t,e,s,i,r){return this.demuxer.demuxSampleAes(t,e,s).then((t=>({remuxResult:this.remuxer.remux(t.audioTrack,t.videoTrack,t.id3Track,t.textTrack,s,i,!1,this.id),chunkMeta:r})))}configureTransmuxer(t){const{config:e,observer:s,typeSupported:i,vendor:r}=this
let n
for(let d=0,c=gi.length;d<c;d++)if(gi[d].demux.probe(t)){n=gi[d]
break}if(!n)return new Error("Failed to find demuxer by probing fragment data")
const a=this.demuxer,o=this.remuxer,l=n.remux,h=n.demux
o&&o instanceof l||(this.remuxer=new l(s,e,i,r)),a&&a instanceof h||(this.demuxer=new h(s,e,i),this.probe=h.probe)}needsProbing(t,e){return!this.demuxer||!this.remuxer||t||e}getDecrypter(){let t=this.decrypter
return t||(t=this.decrypter=new rs(this.config)),t}}const pi=t=>({remuxResult:{},chunkMeta:t})
function yi(t){return"then"in t&&t.then instanceof Function}class Ti{constructor(t,e,s,i,r){this.audioCodec=void 0,this.videoCodec=void 0,this.initSegmentData=void 0,this.duration=void 0,this.defaultInitPts=void 0,this.audioCodec=t,this.videoCodec=e,this.initSegmentData=s,this.duration=i,this.defaultInitPts=r||null}}class Ei{constructor(t,e,s,i,r,n){this.discontinuity=void 0,this.contiguous=void 0,this.accurateTimeOffset=void 0,this.trackSwitch=void 0,this.timeOffset=void 0,this.initSegmentChange=void 0,this.discontinuity=t,this.contiguous=e,this.accurateTimeOffset=s,this.trackSwitch=i,this.timeOffset=r,this.initSegmentChange=n}}var vi={}
!function(t){var e=Object.prototype.hasOwnProperty,s="~"
function i(){}function r(t,e,s){this.fn=t,this.context=e,this.once=s||!1}function n(t,e,i,n,a){if("function"!=typeof i)throw new TypeError("The listener must be a function")
var o=new r(i,n||t,a),l=s?s+e:e
return t._events[l]?t._events[l].fn?t._events[l]=[t._events[l],o]:t._events[l].push(o):(t._events[l]=o,t._eventsCount++),t}function a(t,e){0==--t._eventsCount?t._events=new i:delete t._events[e]}function o(){this._events=new i,this._eventsCount=0}Object.create&&(i.prototype=Object.create(null),(new i).__proto__||(s=!1)),o.prototype.eventNames=function(){var t,i,r=[]
if(0===this._eventsCount)return r
for(i in t=this._events)e.call(t,i)&&r.push(s?i.slice(1):i)
return Object.getOwnPropertySymbols?r.concat(Object.getOwnPropertySymbols(t)):r},o.prototype.listeners=function(t){var e=s?s+t:t,i=this._events[e]
if(!i)return[]
if(i.fn)return[i.fn]
for(var r=0,n=i.length,a=new Array(n);r<n;r++)a[r]=i[r].fn
return a},o.prototype.listenerCount=function(t){var e=s?s+t:t,i=this._events[e]
return i?i.fn?1:i.length:0},o.prototype.emit=function(t,e,i,r,n,a){var o=s?s+t:t
if(!this._events[o])return!1
var l,h,d=this._events[o],c=arguments.length
if(d.fn){switch(d.once&&this.removeListener(t,d.fn,void 0,!0),c){case 1:return d.fn.call(d.context),!0
case 2:return d.fn.call(d.context,e),!0
case 3:return d.fn.call(d.context,e,i),!0
case 4:return d.fn.call(d.context,e,i,r),!0
case 5:return d.fn.call(d.context,e,i,r,n),!0
case 6:return d.fn.call(d.context,e,i,r,n,a),!0}for(h=1,l=new Array(c-1);h<c;h++)l[h-1]=arguments[h]
d.fn.apply(d.context,l)}else{var u,f=d.length
for(h=0;h<f;h++)switch(d[h].once&&this.removeListener(t,d[h].fn,void 0,!0),c){case 1:d[h].fn.call(d[h].context)
break
case 2:d[h].fn.call(d[h].context,e)
break
case 3:d[h].fn.call(d[h].context,e,i)
break
case 4:d[h].fn.call(d[h].context,e,i,r)
break
default:if(!l)for(u=1,l=new Array(c-1);u<c;u++)l[u-1]=arguments[u]
d[h].fn.apply(d[h].context,l)}}return!0},o.prototype.on=function(t,e,s){return n(this,t,e,s,!1)},o.prototype.once=function(t,e,s){return n(this,t,e,s,!0)},o.prototype.removeListener=function(t,e,i,r){var n=s?s+t:t
if(!this._events[n])return this
if(!e)return a(this,n),this
var o=this._events[n]
if(o.fn)o.fn!==e||r&&!o.once||i&&o.context!==i||a(this,n)
else{for(var l=0,h=[],d=o.length;l<d;l++)(o[l].fn!==e||r&&!o[l].once||i&&o[l].context!==i)&&h.push(o[l])
h.length?this._events[n]=1===h.length?h[0]:h:a(this,n)}return this},o.prototype.removeAllListeners=function(t){var e
return t?(e=s?s+t:t,this._events[e]&&a(this,e)):(this._events=new i,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=s,o.EventEmitter=o,t.exports=o}({get exports(){return vi},set exports(t){vi=t}})
const Si=Ts()||{isTypeSupported:()=>!1}
class Li{constructor(t,e,s,i){this.error=null,this.hls=void 0,this.id=void 0,this.observer=void 0,this.frag=null,this.part=null,this.useWorker=void 0,this.workerContext=null,this.onwmsg=void 0,this.transmuxer=null,this.onTransmuxComplete=void 0,this.onFlush=void 0
const r=t.config
this.hls=t,this.id=e,this.useWorker=!!r.enableWorker,this.onTransmuxComplete=s,this.onFlush=i
const n=(t,e)=>{(e=e||{}).frag=this.frag,e.id=this.id,t===g.ERROR&&(this.error=e.error),this.hls.trigger(t,e)}
this.observer=new vi,this.observer.on(g.FRAG_DECRYPTED,n),this.observer.on(g.ERROR,n)
const a={mp4:Si.isTypeSupported("video/mp4"),mpeg:Si.isTypeSupported("audio/mpeg"),mp3:Si.isTypeSupported('audio/mp4; codecs="mp3"')},o=navigator.vendor
if(!this.useWorker||"undefined"==typeof Worker||!r.workerPath&&"function"!=typeof __HLS_WORKER_BUNDLE__)this.transmuxer=new mi(this.observer,a,r,o,e)
else try{r.workerPath?(v.log(`loading Web Worker ${r.workerPath} for "${e}"`),this.workerContext=function(t){const e=new self.URL(t,self.location.href).href
return{worker:new self.Worker(e),scriptURL:e}}(r.workerPath)):(v.log(`injecting Web Worker for "${e}"`),this.workerContext=function(){const t=new self.Blob([`var exports={};var module={exports:exports};function define(f){f()};define.amd=true;(${__HLS_WORKER_BUNDLE__.toString()})(true);`],{type:"text/javascript"}),e=self.URL.createObjectURL(t)
return{worker:new self.Worker(e),objectURL:e}}()),this.onwmsg=t=>this.onWorkerMessage(t)
const{worker:t}=this.workerContext
t.addEventListener("message",this.onwmsg),t.onerror=t=>{const s=new Error(`${t.message}  (${t.filename}:${t.lineno})`)
r.enableWorker=!1,v.warn(`Error in "${e}" Web Worker, fallback to inline`),this.hls.trigger(g.ERROR,{type:m.OTHER_ERROR,details:p.INTERNAL_EXCEPTION,fatal:!1,event:"demuxerWorker",error:s})},t.postMessage({cmd:"init",typeSupported:a,vendor:o,id:e,config:JSON.stringify(r)})}catch(t){v.warn(`Error setting up "${e}" Web Worker, fallback to inline`,t),this.resetWorker(),this.error=null,this.transmuxer=new mi(this.observer,a,r,o,e)}}resetWorker(){if(this.workerContext){const{worker:t,objectURL:e}=this.workerContext
e&&self.URL.revokeObjectURL(e),t.removeEventListener("message",this.onwmsg),t.onerror=null,t.terminate(),this.workerContext=null}}destroy(){if(this.workerContext)this.resetWorker(),this.onwmsg=void 0
else{const t=this.transmuxer
t&&(t.destroy(),this.transmuxer=null)}const t=this.observer
t&&t.removeAllListeners(),this.frag=null,this.observer=null,this.hls=null}push(t,e,s,i,r,n,a,o,l,h){var d,c
l.transmuxing.start=self.performance.now()
const{transmuxer:u}=this,f=n?n.start:r.start,g=r.decryptdata,m=this.frag,p=!(m&&r.cc===m.cc),y=!(m&&l.level===m.level),T=m?l.sn-m.sn:-1,E=this.part?l.part-this.part.index:-1,S=0===T&&l.id>1&&l.id===(null==m?void 0:m.stats.chunkCount),L=!y&&(1===T||0===T&&(1===E||S&&E<=0)),A=self.performance.now();(y||T||0===r.stats.parsing.start)&&(r.stats.parsing.start=A),!n||!E&&L||(n.stats.parsing.start=A)
const R=!(m&&(null==(d=r.initSegment)?void 0:d.url)===(null==(c=m.initSegment)?void 0:c.url)),b=new Ei(p,L,o,y,f,R)
if(!L||p||R){v.log(`[transmuxer-interface, ${r.type}]: Starting new transmux session for sn: ${l.sn} p: ${l.part} level: ${l.level} id: ${l.id}\n        discontinuity: ${p}\n        trackSwitch: ${y}\n        contiguous: ${L}\n        accurateTimeOffset: ${o}\n        timeOffset: ${f}\n        initSegmentChange: ${R}`)
const t=new Ti(s,i,e,a,h)
this.configureTransmuxer(t)}if(this.frag=r,this.part=n,this.workerContext)this.workerContext.worker.postMessage({cmd:"demux",data:t,decryptdata:g,chunkMeta:l,state:b},t instanceof ArrayBuffer?[t]:[])
else if(u){const e=u.push(t,g,l,b)
yi(e)?(u.async=!0,e.then((t=>{this.handleTransmuxComplete(t)})).catch((t=>{this.transmuxerError(t,l,"transmuxer-interface push error")}))):(u.async=!1,this.handleTransmuxComplete(e))}}flush(t){t.transmuxing.start=self.performance.now()
const{transmuxer:e}=this
if(this.workerContext)this.workerContext.worker.postMessage({cmd:"flush",chunkMeta:t})
else if(e){let s=e.flush(t)
yi(s)||e.async?(yi(s)||(s=Promise.resolve(s)),s.then((e=>{this.handleFlushResult(e,t)})).catch((e=>{this.transmuxerError(e,t,"transmuxer-interface flush error")}))):this.handleFlushResult(s,t)}}transmuxerError(t,e,s){this.hls&&(this.error=t,this.hls.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_PARSING_ERROR,chunkMeta:e,fatal:!1,error:t,err:t,reason:s}))}handleFlushResult(t,e){t.forEach((t=>{this.handleTransmuxComplete(t)})),this.onFlush(e)}onWorkerMessage(t){const e=t.data,s=this.hls
switch(e.event){case"init":{var i
const t=null==(i=this.workerContext)?void 0:i.objectURL
t&&self.URL.revokeObjectURL(t)
break}case"transmuxComplete":this.handleTransmuxComplete(e.data)
break
case"flush":this.onFlush(e.data)
break
case"workerLog":v[e.data.logType]&&v[e.data.logType](e.data.message)
break
default:e.data=e.data||{},e.data.frag=this.frag,e.data.id=this.id,s.trigger(e.event,e.data)}}configureTransmuxer(t){const{transmuxer:e}=this
this.workerContext?this.workerContext.worker.postMessage({cmd:"configure",config:t}):e&&e.configure(t)}handleTransmuxComplete(t){t.chunkMeta.transmuxing.end=self.performance.now(),this.onTransmuxComplete(t)}}class Ai{constructor(t,e,s,i){this.config=void 0,this.media=null,this.fragmentTracker=void 0,this.hls=void 0,this.nudgeRetry=0,this.stallReported=!1,this.stalled=null,this.moved=!1,this.seeking=!1,this.config=t,this.media=e,this.fragmentTracker=s,this.hls=i}destroy(){this.media=null,this.hls=this.fragmentTracker=null}poll(t,e){const{config:s,media:i,stalled:r}=this
if(null===i)return
const{currentTime:n,seeking:a}=i,o=this.seeking&&!a,l=!this.seeking&&a
if(this.seeking=a,n!==t){if(this.moved=!0,null!==r){if(this.stallReported){const t=self.performance.now()-r
v.warn(`playback not stuck anymore @${n}, after ${Math.round(t)}ms`),this.stallReported=!1}this.stalled=null,this.nudgeRetry=0}return}if(l||o)return void(this.stalled=null)
if(i.paused&&!a||i.ended||0===i.playbackRate||!Xe.getBuffered(i).length)return
const h=Xe.bufferInfo(i,n,0),d=h.len>0,c=h.nextStart||0
if(!d&&!c)return
if(a){const t=h.len>2,s=!c||e&&e.start<=n||c-n>2&&!this.fragmentTracker.getPartialFragment(n)
if(t||s)return
this.moved=!1}if(!this.moved&&null!==this.stalled){var u
const t=Math.max(c,h.start||0)-n,e=this.hls.levels?this.hls.levels[this.hls.currentLevel]:null,s=(null==e||null==(u=e.details)?void 0:u.live)?2*e.details.targetduration:2,i=this.fragmentTracker.getPartialFragment(n)
if(t>0&&(t<=s||i))return void this._trySkipBufferHole(i)}const f=self.performance.now()
if(null===r)return void(this.stalled=f)
const g=f-r
if(!a&&g>=250&&(this._reportStall(h),!this.media))return
const m=Xe.bufferInfo(i,n,s.maxBufferHole)
this._tryFixBufferStall(m,g)}_tryFixBufferStall(t,e){const{config:s,fragmentTracker:i,media:r}=this
if(null===r)return
const n=r.currentTime,a=i.getPartialFragment(n);(!a||!this._trySkipBufferHole(a)&&this.media)&&(t.len>s.maxBufferHole||t.nextStart&&t.nextStart-n<s.maxBufferHole)&&e>1e3*s.highBufferWatchdogPeriod&&(v.warn("Trying to nudge playhead over buffer-hole"),this.stalled=null,this._tryNudgeBuffer())}_reportStall(t){const{hls:e,media:s,stallReported:i}=this
if(!i&&s){this.stallReported=!0
const i=new Error(`Playback stalling at @${s.currentTime} due to low buffer (${JSON.stringify(t)})`)
v.warn(i.message),e.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.BUFFER_STALLED_ERROR,fatal:!1,error:i,buffer:t.len})}}_trySkipBufferHole(t){const{config:e,hls:s,media:i}=this
if(null===i)return 0
const r=i.currentTime,n=Xe.bufferInfo(i,r,0),a=r<n.start?n.start:n.nextStart
if(a){const o=n.len<=e.maxBufferHole,l=n.len>0&&n.len<1&&i.readyState<3,h=a-r
if(h>0&&(o||l)){if(h>e.maxBufferHole){const{fragmentTracker:e}=this
let s=!1
if(0===r){const t=e.getAppendedFrag(0,Xt.MAIN)
t&&a<t.end&&(s=!0)}if(!s){const s=t||e.getAppendedFrag(r,Xt.MAIN)
if(s){let t=!1,i=s.end
for(;i<a;){const s=e.getPartialFragment(i)
if(!s){t=!0
break}i+=s.duration}if(t)return 0}}}const n=Math.max(a+.05,r+.1)
if(v.warn(`skipping hole, adjusting currentTime from ${r} to ${n}`),this.moved=!0,this.stalled=null,i.currentTime=n,t&&!t.gap){const e=new Error(`fragment loaded with buffer holes, seeking from ${r} to ${n}`)
s.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.BUFFER_SEEK_OVER_HOLE,fatal:!1,error:e,reason:e.message,frag:t})}return n}}return 0}_tryNudgeBuffer(){const{config:t,hls:e,media:s,nudgeRetry:i}=this
if(null===s)return
const r=s.currentTime
if(this.nudgeRetry++,i<t.nudgeMaxRetry){const n=r+(i+1)*t.nudgeOffset,a=new Error(`Nudging 'currentTime' from ${r} to ${n}`)
v.warn(a.message),s.currentTime=n,e.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.BUFFER_NUDGE_ON_STALL,error:a,fatal:!1})}else{const s=new Error(`Playhead still not moving while enough data buffered @${r} after ${t.nudgeMaxRetry} nudges`)
v.error(s.message),e.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.BUFFER_STALLED_ERROR,error:s,fatal:!0})}}}class Ri extends ys{constructor(t,e,s){super(t,e,s,"[stream-controller]",Xt.MAIN),this.audioCodecSwap=!1,this.gapController=null,this.level=-1,this._forceStartLoad=!1,this.altAudio=!1,this.audioOnly=!1,this.fragPlaying=null,this.onvplaying=null,this.onvseeked=null,this.fragLastKbps=0,this.couldBacktrack=!1,this.backtrackFragment=null,this.audioCodecSwitch=!1,this.videoBuffer=null,this._registerListeners()}_registerListeners(){const{hls:t}=this
t.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.MANIFEST_PARSED,this.onManifestParsed,this),t.on(g.LEVEL_LOADING,this.onLevelLoading,this),t.on(g.LEVEL_LOADED,this.onLevelLoaded,this),t.on(g.FRAG_LOAD_EMERGENCY_ABORTED,this.onFragLoadEmergencyAborted,this),t.on(g.ERROR,this.onError,this),t.on(g.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.on(g.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),t.on(g.BUFFER_CREATED,this.onBufferCreated,this),t.on(g.BUFFER_FLUSHED,this.onBufferFlushed,this),t.on(g.LEVELS_UPDATED,this.onLevelsUpdated,this),t.on(g.FRAG_BUFFERED,this.onFragBuffered,this)}_unregisterListeners(){const{hls:t}=this
t.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.MANIFEST_PARSED,this.onManifestParsed,this),t.off(g.LEVEL_LOADED,this.onLevelLoaded,this),t.off(g.FRAG_LOAD_EMERGENCY_ABORTED,this.onFragLoadEmergencyAborted,this),t.off(g.ERROR,this.onError,this),t.off(g.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.off(g.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),t.off(g.BUFFER_CREATED,this.onBufferCreated,this),t.off(g.BUFFER_FLUSHED,this.onBufferFlushed,this),t.off(g.LEVELS_UPDATED,this.onLevelsUpdated,this),t.off(g.FRAG_BUFFERED,this.onFragBuffered,this)}onHandlerDestroying(){this._unregisterListeners(),this.onMediaDetaching()}startLoad(t){if(this.levels){const{lastCurrentTime:e,hls:s}=this
if(this.stopLoad(),this.setInterval(100),this.level=-1,!this.startFragRequested){let t=s.startLevel;-1===t&&(s.config.testBandwidth&&this.levels.length>1?(t=0,this.bitrateTest=!0):t=s.nextAutoLevel),this.level=s.nextLoadLevel=t,this.loadedmetadata=!1}e>0&&-1===t&&(this.log(`Override startPosition with lastCurrentTime @${e.toFixed(3)}`),t=e),this.state=as,this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}else this._forceStartLoad=!0,this.state=ns}stopLoad(){this._forceStartLoad=!1,super.stopLoad()}doTick(){switch(this.state){case ps:{var t
const{levels:e,level:s}=this,i=null==e||null==(t=e[s])?void 0:t.details
if(i&&(!i.live||this.levelLastLoaded===this.level)){if(this.waitForCdnTuneIn(i))break
this.state=as
break}break}case hs:{var e
const t=self.performance.now(),s=this.retryDate;(!s||t>=s||null!=(e=this.media)&&e.seeking)&&(this.resetStartWhenNotLoaded(this.level),this.state=as)}}this.state===as&&this.doTickIdle(),this.onTickEnd()}onTickEnd(){super.onTickEnd(),this.checkBuffer(),this.checkFragmentChanged()}doTickIdle(){const{hls:t,levelLastLoaded:e,levels:s,media:i}=this,{config:r,nextLoadLevel:n}=t
if(null===e||!i&&(this.startFragRequested||!r.startFragPrefetch))return
if(this.altAudio&&this.audioOnly)return
if(null==s||!s[n])return
const a=s[n],o=this.getMainFwdBufferInfo()
if(null===o)return
const l=this.getLevelDetails()
if(l&&this._streamEnded(o,l)){const t={}
return this.altAudio&&(t.type="video"),this.hls.trigger(g.BUFFER_EOS,t),void(this.state=fs)}t.loadLevel!==n&&-1===t.manualLevel&&this.log(`Adapting to level ${n} from level ${this.level}`),this.level=t.nextLoadLevel=n
const h=a.details
if(!h||this.state===ps||h.live&&this.levelLastLoaded!==n)return this.level=n,void(this.state=ps)
const d=o.len,c=this.getMaxBufferLength(a.maxBitrate)
if(d>=c)return
this.backtrackFragment&&this.backtrackFragment.start>o.end&&(this.backtrackFragment=null)
const u=this.backtrackFragment?this.backtrackFragment.start:o.end
let f=this.getNextFragment(u,h)
if(this.couldBacktrack&&!this.fragPrevious&&f&&"initSegment"!==f.sn&&this.fragmentTracker.getState(f)!==Ne){var m
const t=(null!=(m=this.backtrackFragment)?m:f).sn-h.startSN,e=h.fragments[t-1]
e&&f.cc===e.cc&&(f=e,this.fragmentTracker.removeFragment(e))}else this.backtrackFragment&&o.len&&(this.backtrackFragment=null)
if(f&&this.isLoopLoading(f,u)){if(!f.gap){const t=this.audioOnly&&!this.altAudio?D.AUDIO:D.VIDEO,e=(t===D.VIDEO?this.videoBuffer:this.mediaBuffer)||this.media
e&&this.afterBufferFlushed(e,t,Xt.MAIN)}f=this.getNextFragmentLoopLoading(f,h,o,Xt.MAIN,c)}f&&(!f.initSegment||f.initSegment.data||this.bitrateTest||(f=f.initSegment),this.loadFragment(f,a,u))}loadFragment(t,e,s){const i=this.fragmentTracker.getState(t)
this.fragCurrent=t,i===Fe?"initSegment"===t.sn?this._loadInitSegment(t,e):this.bitrateTest?(this.log(`Fragment ${t.sn} of level ${t.level} is being downloaded to test bitrate and will not be buffered`),this._loadBitrateTestFrag(t,e)):(this.startFragRequested=!0,super.loadFragment(t,e,s)):this.clearTrackerIfNeeded(t)}getAppendedFrag(t){const e=this.fragmentTracker.getAppendedFrag(t,Xt.MAIN)
return e&&"fragment"in e?e.fragment:e}getBufferedFrag(t){return this.fragmentTracker.getBufferedFrag(t,Xt.MAIN)}followingBufferedFrag(t){return t?this.getBufferedFrag(t.end+.5):null}immediateLevelSwitch(){this.abortCurrentFrag(),this.flushMainBuffer(0,Number.POSITIVE_INFINITY)}nextLevelSwitch(){const{levels:t,media:e}=this
if(null!=e&&e.readyState){let s
const i=this.getAppendedFrag(e.currentTime)
if(i&&i.start>1&&this.flushMainBuffer(0,i.start-1),!e.paused&&t){const e=t[this.hls.nextLoadLevel],i=this.fragLastKbps
s=i&&this.fragCurrent?this.fragCurrent.duration*e.maxBitrate/(1e3*i)+1:0}else s=0
const r=this.getBufferedFrag(e.currentTime+s)
if(r){const t=this.followingBufferedFrag(r)
if(t){this.abortCurrentFrag()
const e=t.maxStartPTS?t.maxStartPTS:t.start,s=t.duration,i=Math.max(r.end,e+Math.min(Math.max(s-this.config.maxFragLookUpTolerance,.5*s),.75*s))
this.flushMainBuffer(i,Number.POSITIVE_INFINITY)}}}}abortCurrentFrag(){const t=this.fragCurrent
switch(this.fragCurrent=null,this.backtrackFragment=null,t&&(t.abortRequests(),this.fragmentTracker.removeFragment(t)),this.state){case os:case ls:case hs:case cs:case us:this.state=as}this.nextLoadPosition=this.getLoadPosition()}flushMainBuffer(t,e){super.flushMainBuffer(t,e,this.altAudio?"video":null)}onMediaAttached(t,e){super.onMediaAttached(t,e)
const s=e.media
this.onvplaying=this.onMediaPlaying.bind(this),this.onvseeked=this.onMediaSeeked.bind(this),s.addEventListener("playing",this.onvplaying),s.addEventListener("seeked",this.onvseeked),this.gapController=new Ai(this.config,s,this.fragmentTracker,this.hls)}onMediaDetaching(){const{media:t}=this
t&&this.onvplaying&&this.onvseeked&&(t.removeEventListener("playing",this.onvplaying),t.removeEventListener("seeked",this.onvseeked),this.onvplaying=this.onvseeked=null,this.videoBuffer=null),this.fragPlaying=null,this.gapController&&(this.gapController.destroy(),this.gapController=null),super.onMediaDetaching()}onMediaPlaying(){this.tick()}onMediaSeeked(){const t=this.media,e=t?t.currentTime:null
f(e)&&this.log(`Media seeked to ${e.toFixed(3)}`)
const s=this.getMainFwdBufferInfo()
null!==s&&0!==s.len?this.tick():this.warn(`Main forward buffer length on "seeked" event ${s?s.len:"empty"})`)}onManifestLoading(){this.log("Trigger BUFFER_RESET"),this.hls.trigger(g.BUFFER_RESET,void 0),this.fragmentTracker.removeAllFragments(),this.couldBacktrack=!1,this.startPosition=this.lastCurrentTime=0,this.fragPlaying=null,this.backtrackFragment=null}onManifestParsed(t,e){let s,i=!1,r=!1
e.levels.forEach((t=>{s=t.audioCodec,s&&(-1!==s.indexOf("mp4a.40.2")&&(i=!0),-1!==s.indexOf("mp4a.40.5")&&(r=!0))})),this.audioCodecSwitch=i&&r&&!function(){var t
const e=Es()
return"function"==typeof(null==e||null==(t=e.prototype)?void 0:t.changeType)}(),this.audioCodecSwitch&&this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),this.levels=e.levels,this.startFragRequested=!1}onLevelLoading(t,e){const{levels:s}=this
if(!s||this.state!==as)return
const i=s[e.level];(!i.details||i.details.live&&this.levelLastLoaded!==e.level||this.waitForCdnTuneIn(i.details))&&(this.state=ps)}onLevelLoaded(t,e){var s
const{levels:i}=this,r=e.level,n=e.details,a=n.totalduration
if(!i)return void this.warn(`Levels were reset while loading level ${r}`)
this.log(`Level ${r} loaded [${n.startSN},${n.endSN}], cc [${n.startCC}, ${n.endCC}] duration:${a}`)
const o=i[r],l=this.fragCurrent
!l||this.state!==ls&&this.state!==hs||l.level===e.level&&l.urlId===o.urlId||!l.loader||this.abortCurrentFrag()
let h=0
if(n.live||null!=(s=o.details)&&s.live){if(n.fragments[0]||(n.deltaUpdateFailed=!0),n.deltaUpdateFailed)return
h=this.alignPlaylists(n,o.details)}if(o.details=n,this.levelLastLoaded=r,this.hls.trigger(g.LEVEL_UPDATED,{details:n,level:r}),this.state===ps){if(this.waitForCdnTuneIn(n))return
this.state=as}this.startFragRequested?n.live&&this.synchronizeToLiveEdge(n):this.setStartPosition(n,h),this.tick()}_handleFragmentLoadProgress(t){var e
const{frag:s,part:i,payload:r}=t,{levels:n}=this
if(!n)return void this.warn(`Levels were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`)
const a=n[s.level],o=a.details
if(!o)return this.warn(`Dropping fragment ${s.sn} of level ${s.level} after level details were reset`),void this.fragmentTracker.removeFragment(s)
const l=a.videoCodec,h=o.PTSKnown||!o.live,d=null==(e=s.initSegment)?void 0:e.data,c=this._getAudioCodec(a),u=this.transmuxer=this.transmuxer||new Li(this.hls,Xt.MAIN,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this)),f=i?i.index:-1,g=-1!==f,m=new ze(s.level,s.sn,s.stats.chunkCount,r.byteLength,f,g),p=this.initPTS[s.cc]
u.push(r,d,c,l,s,i,o.totalduration,h,m,p)}onAudioTrackSwitching(t,e){const s=this.altAudio
if(!e.url){if(this.mediaBuffer!==this.media){this.log("Switching on main audio, use media.buffered to schedule main fragment loading"),this.mediaBuffer=this.media
const t=this.fragCurrent
t&&(this.log("Switching to main audio track, cancel main fragment load"),t.abortRequests(),this.fragmentTracker.removeFragment(t)),this.resetTransmuxer(),this.resetLoadingState()}else this.audioOnly&&this.resetTransmuxer()
const t=this.hls
s&&(t.trigger(g.BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:null}),this.fragmentTracker.removeAllFragments()),t.trigger(g.AUDIO_TRACK_SWITCHED,e)}}onAudioTrackSwitched(t,e){const s=e.id,i=!!this.hls.audioTracks[s].url
if(i){const t=this.videoBuffer
t&&this.mediaBuffer!==t&&(this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"),this.mediaBuffer=t)}this.altAudio=i,this.tick()}onBufferCreated(t,e){const s=e.tracks
let i,r,n=!1
for(const a in s){const t=s[a]
if("main"===t.id){if(r=a,i=t,"video"===a){const t=s[a]
t&&(this.videoBuffer=t.buffer)}}else n=!0}n&&i?(this.log(`Alternate track found, use ${r}.buffered to schedule main fragment loading`),this.mediaBuffer=i.buffer):this.mediaBuffer=this.media}onFragBuffered(t,e){const{frag:s,part:i}=e
if(s&&s.type!==Xt.MAIN)return
if(this.fragContextChanged(s))return this.warn(`Fragment ${s.sn}${i?" p: "+i.index:""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}`),void(this.state===us&&(this.state=as))
const r=i?i.stats:s.stats
this.fragLastKbps=Math.round(8*r.total/(r.buffering.end-r.loading.first)),"initSegment"!==s.sn&&(this.fragPrevious=s),this.fragBufferedComplete(s,i)}onError(t,e){var s
if(e.fatal)this.state=gs
else switch(e.details){case p.FRAG_GAP:case p.FRAG_PARSING_ERROR:case p.FRAG_DECRYPT_ERROR:case p.FRAG_LOAD_ERROR:case p.FRAG_LOAD_TIMEOUT:case p.KEY_LOAD_ERROR:case p.KEY_LOAD_TIMEOUT:this.onFragmentOrKeyLoadError(Xt.MAIN,e)
break
case p.LEVEL_LOAD_ERROR:case p.LEVEL_LOAD_TIMEOUT:case p.LEVEL_PARSING_ERROR:e.levelRetry||this.state!==ps||(null==(s=e.context)?void 0:s.type)!==jt.LEVEL||(this.state=as)
break
case p.BUFFER_FULL_ERROR:if(!e.parent||"main"!==e.parent)return
this.reduceLengthAndFlushBuffer(e)&&this.flushMainBuffer(0,Number.POSITIVE_INFINITY)
break
case p.INTERNAL_EXCEPTION:this.recoverWorkerError(e)}}checkBuffer(){const{media:t,gapController:e}=this
if(t&&e&&t.readyState){if(this.loadedmetadata||!Xe.getBuffered(t).length){const t=this.state!==as?this.fragCurrent:null
e.poll(this.lastCurrentTime,t)}this.lastCurrentTime=t.currentTime}}onFragLoadEmergencyAborted(){this.state=as,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.tickImmediate()}onBufferFlushed(t,{type:e}){if(e!==D.AUDIO||this.audioOnly&&!this.altAudio){const t=(e===D.VIDEO?this.videoBuffer:this.mediaBuffer)||this.media
this.afterBufferFlushed(t,e,Xt.MAIN)}}onLevelsUpdated(t,e){this.levels=e.levels}swapAudioCodec(){this.audioCodecSwap=!this.audioCodecSwap}seekToStartPos(){const{media:t}=this
if(!t)return
const e=t.currentTime
let s=this.startPosition
if(s>=0&&e<s){if(t.seeking)return void this.log(`could not seek to ${s}, already seeking at ${e}`)
const i=Xe.getBuffered(t),r=(i.length?i.start(0):0)-s
r>0&&(r<this.config.maxBufferHole||r<this.config.maxFragLookUpTolerance)&&(this.log(`adjusting start position by ${r} to match buffer start`),s+=r,this.startPosition=s),this.log(`seek to target start position ${s} from current time ${e}`),t.currentTime=s}}_getAudioCodec(t){let e=this.config.defaultAudioCodec||t.audioCodec
return this.audioCodecSwap&&e&&(this.log("Swapping audio codec"),e=-1!==e.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),e}_loadBitrateTestFrag(t,e){t.bitrateTest=!0,this._doFragLoad(t,e).then((s=>{const{hls:i}=this
if(!s||this.fragContextChanged(t))return
e.fragmentError=0,this.state=as,this.startFragRequested=!1,this.bitrateTest=!1
const r=t.stats
r.parsing.start=r.parsing.end=r.buffering.start=r.buffering.end=self.performance.now(),i.trigger(g.FRAG_LOADED,s),t.bitrateTest=!1}))}_handleTransmuxComplete(t){var e
const s="main",{hls:i}=this,{remuxResult:r,chunkMeta:n}=t,a=this.getCurrentContext(n)
if(!a)return void this.resetWhenMissingContext(n)
const{frag:o,part:l,level:h}=a,{video:d,text:c,id3:u,initSegment:m}=r,{details:p}=h,y=this.altAudio?void 0:r.audio
if(this.fragContextChanged(o))this.fragmentTracker.removeFragment(o)
else{if(this.state=cs,m){m.tracks&&(this._bufferInitSegment(h,m.tracks,o,n),i.trigger(g.FRAG_PARSING_INIT_SEGMENT,{frag:o,id:s,tracks:m.tracks}))
const t=m.initPTS,e=m.timescale
f(t)&&(this.initPTS[o.cc]={baseTime:t,timescale:e},i.trigger(g.INIT_PTS_FOUND,{frag:o,id:s,initPTS:t,timescale:e}))}if(d&&!1!==r.independent){if(p){const{startPTS:t,endPTS:e,startDTS:s,endDTS:i}=d
if(l)l.elementaryStreams[d.type]={startPTS:t,endPTS:e,startDTS:s,endDTS:i}
else if(d.firstKeyFrame&&d.independent&&1===n.id&&(this.couldBacktrack=!0),d.dropped&&d.independent){const s=this.getMainFwdBufferInfo()
if((s?s.end:this.getLoadPosition())+this.config.maxBufferHole<(d.firstKeyFramePTS?d.firstKeyFramePTS:t)-this.config.maxBufferHole)return void this.backtrack(o)
o.setElementaryStreamInfo(d.type,o.start,e,o.start,i,!0)}o.setElementaryStreamInfo(d.type,t,e,s,i),this.backtrackFragment&&(this.backtrackFragment=o),this.bufferFragmentData(d,o,l,n)}}else if(!1===r.independent)return void this.backtrack(o)
if(y){const{startPTS:t,endPTS:e,startDTS:s,endDTS:i}=y
l&&(l.elementaryStreams[D.AUDIO]={startPTS:t,endPTS:e,startDTS:s,endDTS:i}),o.setElementaryStreamInfo(D.AUDIO,t,e,s,i),this.bufferFragmentData(y,o,l,n)}if(p&&null!=u&&null!=(e=u.samples)&&e.length){const t={id:s,frag:o,details:p,samples:u.samples}
i.trigger(g.FRAG_PARSING_METADATA,t)}if(p&&c){const t={id:s,frag:o,details:p,samples:c.samples}
i.trigger(g.FRAG_PARSING_USERDATA,t)}}}_bufferInitSegment(t,e,s,i){if(this.state!==cs)return
this.audioOnly=!!e.audio&&!e.video,this.altAudio&&!this.audioOnly&&delete e.audio
const{audio:r,video:n,audiovideo:a}=e
if(r){let e=t.audioCodec
const s=navigator.userAgent.toLowerCase()
this.audioCodecSwitch&&(e&&(e=-1!==e.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),1!==r.metadata.channelCount&&-1===s.indexOf("firefox")&&(e="mp4a.40.5")),-1!==s.indexOf("android")&&"audio/mpeg"!==r.container&&(e="mp4a.40.2",this.log(`Android: force audio codec to ${e}`)),t.audioCodec&&t.audioCodec!==e&&this.log(`Swapping manifest audio codec "${t.audioCodec}" for "${e}"`),r.levelCodec=e,r.id="main",this.log(`Init audio buffer, container:${r.container}, codecs[selected/level/parsed]=[${e||""}/${t.audioCodec||""}/${r.codec}]`)}n&&(n.levelCodec=t.videoCodec,n.id="main",this.log(`Init video buffer, container:${n.container}, codecs[level/parsed]=[${t.videoCodec||""}/${n.codec}]`)),a&&this.log(`Init audiovideo buffer, container:${a.container}, codecs[level/parsed]=[${t.attrs.CODECS||""}/${a.codec}]`),this.hls.trigger(g.BUFFER_CODECS,e),Object.keys(e).forEach((t=>{const r=e[t].initSegment
null!=r&&r.byteLength&&this.hls.trigger(g.BUFFER_APPENDING,{type:t,data:r,frag:s,part:null,chunkMeta:i,parent:s.type})})),this.tick()}getMainFwdBufferInfo(){return this.getFwdBufferInfo(this.mediaBuffer?this.mediaBuffer:this.media,Xt.MAIN)}backtrack(t){this.couldBacktrack=!0,this.backtrackFragment=t,this.resetTransmuxer(),this.flushBufferGap(t),this.fragmentTracker.removeFragment(t),this.fragPrevious=null,this.nextLoadPosition=t.start,this.state=as}checkFragmentChanged(){const t=this.media
let e=null
if(t&&t.readyState>1&&!1===t.seeking){const s=t.currentTime
if(Xe.isBuffered(t,s)?e=this.getAppendedFrag(s):Xe.isBuffered(t,s+.1)&&(e=this.getAppendedFrag(s+.1)),e){this.backtrackFragment=null
const t=this.fragPlaying,s=e.level
t&&e.sn===t.sn&&t.level===s&&e.urlId===t.urlId||(this.fragPlaying=e,this.hls.trigger(g.FRAG_CHANGED,{frag:e}),t&&t.level===s||this.hls.trigger(g.LEVEL_SWITCHED,{level:s}))}}}get nextLevel(){const t=this.nextBufferedFrag
return t?t.level:-1}get currentFrag(){const t=this.media
return t?this.fragPlaying||this.getAppendedFrag(t.currentTime):null}get currentProgramDateTime(){const t=this.media
if(t){const e=t.currentTime,s=this.currentFrag
if(s&&f(e)&&f(s.programDateTime)){const t=s.programDateTime+1e3*(e-s.start)
return new Date(t)}}return null}get currentLevel(){const t=this.currentFrag
return t?t.level:-1}get nextBufferedFrag(){const t=this.currentFrag
return t?this.followingBufferedFrag(t):null}get forceStartLoad(){return this._forceStartLoad}}class bi{constructor(t,e=0,s=0){this.halfLife=void 0,this.alpha_=void 0,this.estimate_=void 0,this.totalWeight_=void 0,this.halfLife=t,this.alpha_=t?Math.exp(Math.log(.5)/t):0,this.estimate_=e,this.totalWeight_=s}sample(t,e){const s=Math.pow(this.alpha_,t)
this.estimate_=e*(1-s)+s*this.estimate_,this.totalWeight_+=t}getTotalWeight(){return this.totalWeight_}getEstimate(){if(this.alpha_){const t=1-Math.pow(this.alpha_,this.totalWeight_)
if(t)return this.estimate_/t}return this.estimate_}}class Ii{constructor(t,e,s,i=100){this.defaultEstimate_=void 0,this.minWeight_=void 0,this.minDelayMs_=void 0,this.slow_=void 0,this.fast_=void 0,this.defaultTTFB_=void 0,this.ttfb_=void 0,this.defaultEstimate_=s,this.minWeight_=.001,this.minDelayMs_=50,this.slow_=new bi(t),this.fast_=new bi(e),this.defaultTTFB_=i,this.ttfb_=new bi(t)}update(t,e){const{slow_:s,fast_:i,ttfb_:r}=this
s.halfLife!==t&&(this.slow_=new bi(t,s.getEstimate(),s.getTotalWeight())),i.halfLife!==e&&(this.fast_=new bi(e,i.getEstimate(),i.getTotalWeight())),r.halfLife!==t&&(this.ttfb_=new bi(t,r.getEstimate(),r.getTotalWeight()))}sample(t,e){const s=(t=Math.max(t,this.minDelayMs_))/1e3,i=8*e/s
this.fast_.sample(s,i),this.slow_.sample(s,i)}sampleTTFB(t){const e=t/1e3,s=Math.sqrt(2)*Math.exp(-Math.pow(e,2)/2)
this.ttfb_.sample(s,Math.max(t,5))}canEstimate(){return this.fast_.getTotalWeight()>=this.minWeight_}getEstimate(){return this.canEstimate()?Math.min(this.fast_.getEstimate(),this.slow_.getEstimate()):this.defaultEstimate_}getEstimateTTFB(){return this.ttfb_.getTotalWeight()>=this.minWeight_?this.ttfb_.getEstimate():this.defaultTTFB_}destroy(){}}class Di{constructor(){this.chunks=[],this.dataLength=0}push(t){this.chunks.push(t),this.dataLength+=t.length}flush(){const{chunks:t,dataLength:e}=this
let s
return t.length?(s=1===t.length?t[0]:function(t,e){const s=new Uint8Array(e)
let i=0
for(let r=0;r<t.length;r++){const e=t[r]
s.set(e,i),i+=e.length}return s}(t,e),this.reset(),s):new Uint8Array(0)}reset(){this.chunks.length=0,this.dataLength=0}}function ki(t,e){if(t.length!==e.length)return!1
for(let s=0;s<t.length;s++)if(!wi(t[s].attrs,e[s].attrs))return!1
return!0}function wi(t,e){const s=t["STABLE-RENDITION-ID"]
return s?s===e["STABLE-RENDITION-ID"]:!["LANGUAGE","NAME","CHARACTERISTICS","AUTOSELECT","DEFAULT","FORCED"].some((s=>t[s]!==e[s]))}class Ci{constructor(t){this.buffered=void 0
const e=(e,s,i)=>{if((s>>>=0)>i-1)throw new DOMException(`Failed to execute '${e}' on 'TimeRanges': The index provided (${s}) is greater than the maximum bound (${i})`)
return t[s][e]}
this.buffered={get length(){return t.length},end:s=>e("end",s,t.length),start:s=>e("start",s,t.length)}}}function _i(t){const e=[]
for(let s=0;s<t.length;s++){const i=t[s]
"subtitles"!==i.kind&&"captions"!==i.kind||!i.label||e.push(t[s])}return e}class Pi{constructor(t){this.buffers=void 0,this.queues={video:[],audio:[],audiovideo:[]},this.buffers=t}append(t,e){const s=this.queues[e]
s.push(t),1===s.length&&this.buffers[e]&&this.executeNext(e)}insertAbort(t,e){this.queues[e].unshift(t),this.executeNext(e)}appendBlocker(t){let e
const s=new Promise((t=>{e=t})),i={execute:e,onStart:()=>{},onComplete:()=>{},onError:()=>{}}
return this.append(i,t),s}executeNext(t){const{buffers:e,queues:s}=this,i=e[t],r=s[t]
if(r.length){const e=r[0]
try{e.execute()}catch(s){v.warn("[buffer-operation-queue]: Unhandled exception executing the current operation"),e.onError(s),null!=i&&i.updating||(r.shift(),this.executeNext(t))}}}shiftAndExecuteNext(t){this.queues[t].shift(),this.executeNext(t)}current(t){return this.queues[t][0]}}const xi=Ts(),Fi=/([ha]vc.)(?:\.[^.,]+)+/,Oi={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,128:174,129:176,130:189,131:191,132:8482,133:162,134:163,135:9834,136:224,137:32,138:232,139:226,140:234,141:238,142:244,143:251,144:193,145:201,146:211,147:218,148:220,149:252,150:8216,151:161,152:42,153:8217,154:9473,155:169,156:8480,157:8226,158:8220,159:8221,160:192,161:194,162:199,163:200,164:202,165:203,166:235,167:206,168:207,169:239,170:212,171:217,172:249,173:219,174:171,175:187,176:195,177:227,178:205,179:204,180:236,181:210,182:242,183:213,184:245,185:123,186:125,187:92,188:94,189:95,190:124,191:8764,192:196,193:228,194:214,195:246,196:223,197:165,198:164,199:9475,200:197,201:229,202:216,203:248,204:9487,205:9491,206:9495,207:9499},Mi=function(t){let e=t
return Oi.hasOwnProperty(t)&&(e=Oi[t]),String.fromCharCode(e)},Ni=15,Ui=100,Bi={17:1,18:3,21:5,22:7,23:9,16:11,19:12,20:14},$i={17:2,18:4,21:6,22:8,23:10,19:13,20:15},Gi={25:1,26:3,29:5,30:7,31:9,24:11,27:12,28:14},Ki={25:2,26:4,29:6,30:8,31:10,27:13,28:15},Hi=["white","green","blue","cyan","red","yellow","magenta","black","transparent"]
class Vi{constructor(){this.time=null,this.verboseLevel=0}log(t,e){if(this.verboseLevel>=t){const s="function"==typeof e?e():e
v.log(`${this.time} [${t}] ${s}`)}}}const Yi=function(t){const e=[]
for(let s=0;s<t.length;s++)e.push(t[s].toString(16))
return e}
class Wi{constructor(t,e,s,i,r){this.foreground=void 0,this.underline=void 0,this.italics=void 0,this.background=void 0,this.flash=void 0,this.foreground=t||"white",this.underline=e||!1,this.italics=s||!1,this.background=i||"black",this.flash=r||!1}reset(){this.foreground="white",this.underline=!1,this.italics=!1,this.background="black",this.flash=!1}setStyles(t){const e=["foreground","underline","italics","background","flash"]
for(let s=0;s<e.length;s++){const i=e[s]
t.hasOwnProperty(i)&&(this[i]=t[i])}}isDefault(){return"white"===this.foreground&&!this.underline&&!this.italics&&"black"===this.background&&!this.flash}equals(t){return this.foreground===t.foreground&&this.underline===t.underline&&this.italics===t.italics&&this.background===t.background&&this.flash===t.flash}copy(t){this.foreground=t.foreground,this.underline=t.underline,this.italics=t.italics,this.background=t.background,this.flash=t.flash}toString(){return"color="+this.foreground+", underline="+this.underline+", italics="+this.italics+", background="+this.background+", flash="+this.flash}}class qi{constructor(t,e,s,i,r,n){this.uchar=void 0,this.penState=void 0,this.uchar=t||" ",this.penState=new Wi(e,s,i,r,n)}reset(){this.uchar=" ",this.penState.reset()}setChar(t,e){this.uchar=t,this.penState.copy(e)}setPenState(t){this.penState.copy(t)}equals(t){return this.uchar===t.uchar&&this.penState.equals(t.penState)}copy(t){this.uchar=t.uchar,this.penState.copy(t.penState)}isEmpty(){return" "===this.uchar&&this.penState.isDefault()}}class ji{constructor(t){this.chars=void 0,this.pos=void 0,this.currPenState=void 0,this.cueStartTime=void 0,this.logger=void 0,this.chars=[]
for(let e=0;e<Ui;e++)this.chars.push(new qi)
this.logger=t,this.pos=0,this.currPenState=new Wi}equals(t){let e=!0
for(let s=0;s<Ui;s++)if(!this.chars[s].equals(t.chars[s])){e=!1
break}return e}copy(t){for(let e=0;e<Ui;e++)this.chars[e].copy(t.chars[e])}isEmpty(){let t=!0
for(let e=0;e<Ui;e++)if(!this.chars[e].isEmpty()){t=!1
break}return t}setCursor(t){this.pos!==t&&(this.pos=t),this.pos<0?(this.logger.log(3,"Negative cursor position "+this.pos),this.pos=0):this.pos>Ui&&(this.logger.log(3,"Too large cursor position "+this.pos),this.pos=Ui)}moveCursor(t){const e=this.pos+t
if(t>1)for(let s=this.pos+1;s<e+1;s++)this.chars[s].setPenState(this.currPenState)
this.setCursor(e)}backSpace(){this.moveCursor(-1),this.chars[this.pos].setChar(" ",this.currPenState)}insertChar(t){t>=144&&this.backSpace()
const e=Mi(t)
this.pos>=Ui?this.logger.log(0,(()=>"Cannot insert "+t.toString(16)+" ("+e+") at position "+this.pos+". Skipping it!")):(this.chars[this.pos].setChar(e,this.currPenState),this.moveCursor(1))}clearFromPos(t){let e
for(e=t;e<Ui;e++)this.chars[e].reset()}clear(){this.clearFromPos(0),this.pos=0,this.currPenState.reset()}clearToEndOfRow(){this.clearFromPos(this.pos)}getTextString(){const t=[]
let e=!0
for(let s=0;s<Ui;s++){const i=this.chars[s].uchar
" "!==i&&(e=!1),t.push(i)}return e?"":t.join("")}setPenStyles(t){this.currPenState.setStyles(t),this.chars[this.pos].setPenState(this.currPenState)}}class Xi{constructor(t){this.rows=void 0,this.currRow=void 0,this.nrRollUpRows=void 0,this.lastOutputScreen=void 0,this.logger=void 0,this.rows=[]
for(let e=0;e<Ni;e++)this.rows.push(new ji(t))
this.logger=t,this.currRow=14,this.nrRollUpRows=null,this.lastOutputScreen=null,this.reset()}reset(){for(let t=0;t<Ni;t++)this.rows[t].clear()
this.currRow=14}equals(t){let e=!0
for(let s=0;s<Ni;s++)if(!this.rows[s].equals(t.rows[s])){e=!1
break}return e}copy(t){for(let e=0;e<Ni;e++)this.rows[e].copy(t.rows[e])}isEmpty(){let t=!0
for(let e=0;e<Ni;e++)if(!this.rows[e].isEmpty()){t=!1
break}return t}backSpace(){this.rows[this.currRow].backSpace()}clearToEndOfRow(){this.rows[this.currRow].clearToEndOfRow()}insertChar(t){this.rows[this.currRow].insertChar(t)}setPen(t){this.rows[this.currRow].setPenStyles(t)}moveCursor(t){this.rows[this.currRow].moveCursor(t)}setCursor(t){this.logger.log(2,"setCursor: "+t),this.rows[this.currRow].setCursor(t)}setPAC(t){this.logger.log(2,(()=>"pacData = "+JSON.stringify(t)))
let e=t.row-1
if(this.nrRollUpRows&&e<this.nrRollUpRows-1&&(e=this.nrRollUpRows-1),this.nrRollUpRows&&this.currRow!==e){for(let e=0;e<Ni;e++)this.rows[e].clear()
const t=this.currRow+1-this.nrRollUpRows,s=this.lastOutputScreen
if(s){const i=s.rows[t].cueStartTime,r=this.logger.time
if(i&&null!==r&&i<r)for(let n=0;n<this.nrRollUpRows;n++)this.rows[e-this.nrRollUpRows+n+1].copy(s.rows[t+n])}}this.currRow=e
const s=this.rows[this.currRow]
if(null!==t.indent){const e=t.indent,i=Math.max(e-1,0)
s.setCursor(t.indent),t.color=s.chars[i].penState.foreground}const i={foreground:t.color,underline:t.underline,italics:t.italics,background:"black",flash:!1}
this.setPen(i)}setBkgData(t){this.logger.log(2,(()=>"bkgData = "+JSON.stringify(t))),this.backSpace(),this.setPen(t),this.insertChar(32)}setRollUpRows(t){this.nrRollUpRows=t}rollUp(){if(null===this.nrRollUpRows)return void this.logger.log(3,"roll_up but nrRollUpRows not set yet")
this.logger.log(1,(()=>this.getDisplayText()))
const t=this.currRow+1-this.nrRollUpRows,e=this.rows.splice(t,1)[0]
e.clear(),this.rows.splice(this.currRow,0,e),this.logger.log(2,"Rolling up")}getDisplayText(t){t=t||!1
const e=[]
let s="",i=-1
for(let r=0;r<Ni;r++){const s=this.rows[r].getTextString()
s&&(i=r+1,t?e.push("Row "+i+": '"+s+"'"):e.push(s.trim()))}return e.length>0&&(s=t?"["+e.join(" | ")+"]":e.join("\n")),s}getTextAndFormat(){return this.rows}}class zi{constructor(t,e,s){this.chNr=void 0,this.outputFilter=void 0,this.mode=void 0,this.verbose=void 0,this.displayedMemory=void 0,this.nonDisplayedMemory=void 0,this.lastOutputScreen=void 0,this.currRollUpRow=void 0,this.writeScreen=void 0,this.cueStartTime=void 0,this.logger=void 0,this.chNr=t,this.outputFilter=e,this.mode=null,this.verbose=0,this.displayedMemory=new Xi(s),this.nonDisplayedMemory=new Xi(s),this.lastOutputScreen=new Xi(s),this.currRollUpRow=this.displayedMemory.rows[14],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null,this.logger=s}reset(){this.mode=null,this.displayedMemory.reset(),this.nonDisplayedMemory.reset(),this.lastOutputScreen.reset(),this.outputFilter.reset(),this.currRollUpRow=this.displayedMemory.rows[14],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null}getHandler(){return this.outputFilter}setHandler(t){this.outputFilter=t}setPAC(t){this.writeScreen.setPAC(t)}setBkgData(t){this.writeScreen.setBkgData(t)}setMode(t){t!==this.mode&&(this.mode=t,this.logger.log(2,(()=>"MODE="+t)),"MODE_POP-ON"===this.mode?this.writeScreen=this.nonDisplayedMemory:(this.writeScreen=this.displayedMemory,this.writeScreen.reset()),"MODE_ROLL-UP"!==this.mode&&(this.displayedMemory.nrRollUpRows=null,this.nonDisplayedMemory.nrRollUpRows=null),this.mode=t)}insertChars(t){for(let s=0;s<t.length;s++)this.writeScreen.insertChar(t[s])
const e=this.writeScreen===this.displayedMemory?"DISP":"NON_DISP"
this.logger.log(2,(()=>e+": "+this.writeScreen.getDisplayText(!0))),"MODE_PAINT-ON"!==this.mode&&"MODE_ROLL-UP"!==this.mode||(this.logger.log(1,(()=>"DISPLAYED: "+this.displayedMemory.getDisplayText(!0))),this.outputDataUpdate())}ccRCL(){this.logger.log(2,"RCL - Resume Caption Loading"),this.setMode("MODE_POP-ON")}ccBS(){this.logger.log(2,"BS - BackSpace"),"MODE_TEXT"!==this.mode&&(this.writeScreen.backSpace(),this.writeScreen===this.displayedMemory&&this.outputDataUpdate())}ccAOF(){}ccAON(){}ccDER(){this.logger.log(2,"DER- Delete to End of Row"),this.writeScreen.clearToEndOfRow(),this.outputDataUpdate()}ccRU(t){this.logger.log(2,"RU("+t+") - Roll Up"),this.writeScreen=this.displayedMemory,this.setMode("MODE_ROLL-UP"),this.writeScreen.setRollUpRows(t)}ccFON(){this.logger.log(2,"FON - Flash On"),this.writeScreen.setPen({flash:!0})}ccRDC(){this.logger.log(2,"RDC - Resume Direct Captioning"),this.setMode("MODE_PAINT-ON")}ccTR(){this.logger.log(2,"TR"),this.setMode("MODE_TEXT")}ccRTD(){this.logger.log(2,"RTD"),this.setMode("MODE_TEXT")}ccEDM(){this.logger.log(2,"EDM - Erase Displayed Memory"),this.displayedMemory.reset(),this.outputDataUpdate(!0)}ccCR(){this.logger.log(2,"CR - Carriage Return"),this.writeScreen.rollUp(),this.outputDataUpdate(!0)}ccENM(){this.logger.log(2,"ENM - Erase Non-displayed Memory"),this.nonDisplayedMemory.reset()}ccEOC(){if(this.logger.log(2,"EOC - End Of Caption"),"MODE_POP-ON"===this.mode){const t=this.displayedMemory
this.displayedMemory=this.nonDisplayedMemory,this.nonDisplayedMemory=t,this.writeScreen=this.nonDisplayedMemory,this.logger.log(1,(()=>"DISP: "+this.displayedMemory.getDisplayText()))}this.outputDataUpdate(!0)}ccTO(t){this.logger.log(2,"TO("+t+") - Tab Offset"),this.writeScreen.moveCursor(t)}ccMIDROW(t){const e={flash:!1}
if(e.underline=t%2==1,e.italics=t>=46,e.italics)e.foreground="white"
else{const s=Math.floor(t/2)-16,i=["white","green","blue","cyan","red","yellow","magenta"]
e.foreground=i[s]}this.logger.log(2,"MIDROW: "+JSON.stringify(e)),this.writeScreen.setPen(e)}outputDataUpdate(t=!1){const e=this.logger.time
null!==e&&this.outputFilter&&(null!==this.cueStartTime||this.displayedMemory.isEmpty()?this.displayedMemory.equals(this.lastOutputScreen)||(this.outputFilter.newCue(this.cueStartTime,e,this.lastOutputScreen),t&&this.outputFilter.dispatchCue&&this.outputFilter.dispatchCue(),this.cueStartTime=this.displayedMemory.isEmpty()?null:e):this.cueStartTime=e,this.lastOutputScreen.copy(this.displayedMemory))}cueSplitAtTime(t){this.outputFilter&&(this.displayedMemory.isEmpty()||(this.outputFilter.newCue&&this.outputFilter.newCue(this.cueStartTime,t,this.displayedMemory),this.cueStartTime=t))}}class Qi{constructor(t,e,s){this.channels=void 0,this.currentChannel=0,this.cmdHistory=void 0,this.logger=void 0
const i=new Vi
this.channels=[null,new zi(t,e,i),new zi(t+1,s,i)],this.cmdHistory={a:null,b:null},this.logger=i}getHandler(t){return this.channels[t].getHandler()}setHandler(t,e){this.channels[t].setHandler(e)}addData(t,e){let s,i,r,n=!1
this.logger.time=t
for(let a=0;a<e.length;a+=2)if(i=127&e[a],r=127&e[a+1],0!==i||0!==r){if(this.logger.log(3,"["+Yi([e[a],e[a+1]])+"] -> ("+Yi([i,r])+")"),s=this.parseCmd(i,r),s||(s=this.parseMidrow(i,r)),s||(s=this.parsePAC(i,r)),s||(s=this.parseBackgroundAttributes(i,r)),!s&&(n=this.parseChars(i,r),n)){const t=this.currentChannel
t&&t>0?this.channels[t].insertChars(n):this.logger.log(2,"No channel found yet. TEXT-MODE?")}s||n||this.logger.log(2,"Couldn't parse cleaned data "+Yi([i,r])+" orig: "+Yi([e[a],e[a+1]]))}}parseCmd(t,e){const{cmdHistory:s}=this
if(!((20===t||28===t||21===t||29===t)&&e>=32&&e<=47||(23===t||31===t)&&e>=33&&e<=35))return!1
if(Zi(t,e,s))return Ji(null,null,s),this.logger.log(3,"Repeated command ("+Yi([t,e])+") is dropped"),!0
const i=20===t||21===t||23===t?1:2,r=this.channels[i]
return 20===t||21===t||28===t||29===t?32===e?r.ccRCL():33===e?r.ccBS():34===e?r.ccAOF():35===e?r.ccAON():36===e?r.ccDER():37===e?r.ccRU(2):38===e?r.ccRU(3):39===e?r.ccRU(4):40===e?r.ccFON():41===e?r.ccRDC():42===e?r.ccTR():43===e?r.ccRTD():44===e?r.ccEDM():45===e?r.ccCR():46===e?r.ccENM():47===e&&r.ccEOC():r.ccTO(e-32),Ji(t,e,s),this.currentChannel=i,!0}parseMidrow(t,e){let s=0
if((17===t||25===t)&&e>=32&&e<=47){if(s=17===t?1:2,s!==this.currentChannel)return this.logger.log(0,"Mismatch channel in midrow parsing"),!1
const i=this.channels[s]
return!!i&&(i.ccMIDROW(e),this.logger.log(3,"MIDROW ("+Yi([t,e])+")"),!0)}return!1}parsePAC(t,e){let s
const i=this.cmdHistory
if(!((t>=17&&t<=23||t>=25&&t<=31)&&e>=64&&e<=127||(16===t||24===t)&&e>=64&&e<=95))return!1
if(Zi(t,e,i))return Ji(null,null,i),!0
const r=t<=23?1:2
s=e>=64&&e<=95?1===r?Bi[t]:Gi[t]:1===r?$i[t]:Ki[t]
const n=this.channels[r]
return!!n&&(n.setPAC(this.interpretPAC(s,e)),Ji(t,e,i),this.currentChannel=r,!0)}interpretPAC(t,e){let s
const i={color:null,italics:!1,indent:null,underline:!1,row:t}
return s=e>95?e-96:e-64,i.underline=1==(1&s),s<=13?i.color=["white","green","blue","cyan","red","yellow","magenta","white"][Math.floor(s/2)]:s<=15?(i.italics=!0,i.color="white"):i.indent=4*Math.floor((s-16)/2),i}parseChars(t,e){let s,i=null,r=null
if(t>=25?(s=2,r=t-8):(s=1,r=t),r>=17&&r<=19){let t
t=17===r?e+80:18===r?e+112:e+144,this.logger.log(2,"Special char '"+Mi(t)+"' in channel "+s),i=[t]}else t>=32&&t<=127&&(i=0===e?[t]:[t,e])
if(i){const s=Yi(i)
this.logger.log(3,"Char codes =  "+s.join(",")),Ji(t,e,this.cmdHistory)}return i}parseBackgroundAttributes(t,e){if(!((16===t||24===t)&&e>=32&&e<=47||(23===t||31===t)&&e>=45&&e<=47))return!1
let s
const i={}
16===t||24===t?(s=Math.floor((e-32)/2),i.background=Hi[s],e%2==1&&(i.background=i.background+"_semi")):45===e?i.background="transparent":(i.foreground="black",47===e&&(i.underline=!0))
const r=t<=23?1:2
return this.channels[r].setBkgData(i),Ji(t,e,this.cmdHistory),!0}reset(){for(let t=0;t<Object.keys(this.channels).length;t++){const e=this.channels[t]
e&&e.reset()}this.cmdHistory={a:null,b:null}}cueSplitAtTime(t){for(let e=0;e<this.channels.length;e++){const s=this.channels[e]
s&&s.cueSplitAtTime(t)}}}function Ji(t,e,s){s.a=t,s.b=e}function Zi(t,e,s){return s.a===t&&s.b===e}class tr{constructor(t,e){this.timelineController=void 0,this.cueRanges=[],this.trackName=void 0,this.startTime=null,this.endTime=null,this.screen=null,this.timelineController=t,this.trackName=e}dispatchCue(){null!==this.startTime&&(this.timelineController.addCues(this.trackName,this.startTime,this.endTime,this.screen,this.cueRanges),this.startTime=null)}newCue(t,e,s){(null===this.startTime||this.startTime>t)&&(this.startTime=t),this.endTime=e,this.screen=s,this.timelineController.createCaptionsTrack(this.trackName)}reset(){this.cueRanges=[],this.startTime=null}}var er=function(){if("undefined"!=typeof self&&self.VTTCue)return self.VTTCue
const t=["","lr","rl"],e=["start","middle","end","left","right"]
function s(t,e){if("string"!=typeof e)return!1
if(!Array.isArray(t))return!1
const s=e.toLowerCase()
return!!~t.indexOf(s)&&s}function i(t){return s(e,t)}function r(t,...e){let s=1
for(;s<arguments.length;s++){const e=arguments[s]
for(const s in e)t[s]=e[s]}return t}function n(e,n,a){const o=this,l={enumerable:!0}
o.hasBeenReset=!1
let h="",d=!1,c=e,u=n,f=a,g=null,m="",p=!0,y="auto",T="start",E=50,v="middle",S=50,L="middle"
Object.defineProperty(o,"id",r({},l,{get:function(){return h},set:function(t){h=""+t}})),Object.defineProperty(o,"pauseOnExit",r({},l,{get:function(){return d},set:function(t){d=!!t}})),Object.defineProperty(o,"startTime",r({},l,{get:function(){return c},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.")
c=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"endTime",r({},l,{get:function(){return u},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.")
u=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"text",r({},l,{get:function(){return f},set:function(t){f=""+t,this.hasBeenReset=!0}})),Object.defineProperty(o,"region",r({},l,{get:function(){return g},set:function(t){g=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"vertical",r({},l,{get:function(){return m},set:function(e){const i=function(e){return s(t,e)}(e)
if(!1===i)throw new SyntaxError("An invalid or illegal string was specified.")
m=i,this.hasBeenReset=!0}})),Object.defineProperty(o,"snapToLines",r({},l,{get:function(){return p},set:function(t){p=!!t,this.hasBeenReset=!0}})),Object.defineProperty(o,"line",r({},l,{get:function(){return y},set:function(t){if("number"!=typeof t&&"auto"!==t)throw new SyntaxError("An invalid number or illegal string was specified.")
y=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"lineAlign",r({},l,{get:function(){return T},set:function(t){const e=i(t)
if(!e)throw new SyntaxError("An invalid or illegal string was specified.")
T=e,this.hasBeenReset=!0}})),Object.defineProperty(o,"position",r({},l,{get:function(){return E},set:function(t){if(t<0||t>100)throw new Error("Position must be between 0 and 100.")
E=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"positionAlign",r({},l,{get:function(){return v},set:function(t){const e=i(t)
if(!e)throw new SyntaxError("An invalid or illegal string was specified.")
v=e,this.hasBeenReset=!0}})),Object.defineProperty(o,"size",r({},l,{get:function(){return S},set:function(t){if(t<0||t>100)throw new Error("Size must be between 0 and 100.")
S=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"align",r({},l,{get:function(){return L},set:function(t){const e=i(t)
if(!e)throw new SyntaxError("An invalid or illegal string was specified.")
L=e,this.hasBeenReset=!0}})),o.displayState=void 0}return n.prototype.getCueAsHTML=function(){return self.WebVTT.convertCueToDOMTree(self,this.text)},n}()
class sr{decode(t,e){if(!t)return""
if("string"!=typeof t)throw new Error("Error - expected string data.")
return decodeURIComponent(encodeURIComponent(t))}}function ir(t){function e(t,e,s,i){return 3600*(0|t)+60*(0|e)+(0|s)+parseFloat(i||0)}const s=t.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/)
return s?parseFloat(s[2])>59?e(s[2],s[3],0,s[4]):e(s[1],s[2],s[3],s[4]):null}class rr{constructor(){this.values=Object.create(null)}set(t,e){this.get(t)||""===e||(this.values[t]=e)}get(t,e,s){return s?this.has(t)?this.values[t]:e[s]:this.has(t)?this.values[t]:e}has(t){return t in this.values}alt(t,e,s){for(let i=0;i<s.length;++i)if(e===s[i]){this.set(t,e)
break}}integer(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))}percent(t,e){if(/^([\d]{1,3})(\.[\d]*)?%$/.test(e)){const s=parseFloat(e)
if(s>=0&&s<=100)return this.set(t,s),!0}return!1}}function nr(t,e,s,i){const r=i?t.split(i):[t]
for(const n in r){if("string"!=typeof r[n])continue
const t=r[n].split(s)
2===t.length&&e(t[0],t[1])}}const ar=new er(0,0,""),or="middle"===ar.align?"middle":"center"
function lr(t,e,s){const i=t
function r(){const e=ir(t)
if(null===e)throw new Error("Malformed timestamp: "+i)
return t=t.replace(/^[^\sa-zA-Z-]+/,""),e}function n(){t=t.replace(/^\s+/,"")}if(n(),e.startTime=r(),n(),"--\x3e"!==t.slice(0,3))throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): "+i)
t=t.slice(3),n(),e.endTime=r(),n(),function(t,e){const i=new rr
nr(t,(function(t,e){let r
switch(t){case"region":for(let r=s.length-1;r>=0;r--)if(s[r].id===e){i.set(t,s[r].region)
break}break
case"vertical":i.alt(t,e,["rl","lr"])
break
case"line":r=e.split(","),i.integer(t,r[0]),i.percent(t,r[0])&&i.set("snapToLines",!1),i.alt(t,r[0],["auto"]),2===r.length&&i.alt("lineAlign",r[1],["start",or,"end"])
break
case"position":r=e.split(","),i.percent(t,r[0]),2===r.length&&i.alt("positionAlign",r[1],["start",or,"end","line-left","line-right","auto"])
break
case"size":i.percent(t,e)
break
case"align":i.alt(t,e,["start",or,"end","left","right"])}}),/:/,/\s/),e.region=i.get("region",null),e.vertical=i.get("vertical","")
let r=i.get("line","auto")
"auto"===r&&-1===ar.line&&(r=-1),e.line=r,e.lineAlign=i.get("lineAlign","start"),e.snapToLines=i.get("snapToLines",!0),e.size=i.get("size",100),e.align=i.get("align",or)
let n=i.get("position","auto")
"auto"===n&&50===ar.position&&(n="start"===e.align||"left"===e.align?0:"end"===e.align||"right"===e.align?100:50),e.position=n}(t,e)}function hr(t){return t.replace(/<br(?: \/)?>/gi,"\n")}class dr{constructor(){this.state="INITIAL",this.buffer="",this.decoder=new sr,this.regionList=[],this.cue=null,this.oncue=void 0,this.onparsingerror=void 0,this.onflush=void 0}parse(t){const e=this
function s(){let t=e.buffer,s=0
for(t=hr(t);s<t.length&&"\r"!==t[s]&&"\n"!==t[s];)++s
const i=t.slice(0,s)
return"\r"===t[s]&&++s,"\n"===t[s]&&++s,e.buffer=t.slice(s),i}t&&(e.buffer+=e.decoder.decode(t,{stream:!0}))
try{let i=""
if("INITIAL"===e.state){if(!/\r\n|\n/.test(e.buffer))return this
i=s()
const t=i.match(/^(ï»¿)?WEBVTT([ \t].*)?$/)
if(null==t||!t[0])throw new Error("Malformed WebVTT signature.")
e.state="HEADER"}let r=!1
for(;e.buffer;){if(!/\r\n|\n/.test(e.buffer))return this
switch(r?r=!1:i=s(),e.state){case"HEADER":/:/.test(i)?nr(i,(function(t,e){}),/:/):i||(e.state="ID")
continue
case"NOTE":i||(e.state="ID")
continue
case"ID":if(/^NOTE($|[ \t])/.test(i)){e.state="NOTE"
break}if(!i)continue
if(e.cue=new er(0,0,""),e.state="CUE",-1===i.indexOf("--\x3e")){e.cue.id=i
continue}case"CUE":if(!e.cue){e.state="BADCUE"
continue}try{lr(i,e.cue,e.regionList)}catch(t){e.cue=null,e.state="BADCUE"
continue}e.state="CUETEXT"
continue
case"CUETEXT":{const t=-1!==i.indexOf("--\x3e")
if(!i||t&&(r=!0)){e.oncue&&e.cue&&e.oncue(e.cue),e.cue=null,e.state="ID"
continue}if(null===e.cue)continue
e.cue.text&&(e.cue.text+="\n"),e.cue.text+=i}continue
case"BADCUE":i||(e.state="ID")}}}catch(t){"CUETEXT"===e.state&&e.cue&&e.oncue&&e.oncue(e.cue),e.cue=null,e.state="INITIAL"===e.state?"BADWEBVTT":"BADCUE"}return this}flush(){const t=this
try{if((t.cue||"HEADER"===t.state)&&(t.buffer+="\n\n",t.parse()),"INITIAL"===t.state||"BADWEBVTT"===t.state)throw new Error("Malformed WebVTT signature.")}catch(e){t.onparsingerror&&t.onparsingerror(e)}return t.onflush&&t.onflush(),this}}const cr=/\r\n|\n\r|\n|\r/g,ur=function(t,e,s=0){return t.slice(s,s+e.length)===e},fr=function(t){let e=5381,s=t.length
for(;s;)e=33*e^t.charCodeAt(--s)
return(e>>>0).toString()}
function gr(t,e,s){return fr(t.toString())+fr(e.toString())+fr(s)}const mr="stpp.ttml.im1t",pr=/^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,yr=/^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/,Tr={left:"start",center:"center",right:"end",start:"start",end:"end"}
function Er(t,e,s,i){const r=mt(new Uint8Array(t),["mdat"])
if(0===r.length)return void i(new Error("Could not parse IMSC1 mdat"))
const n=r.map((t=>rt(t))),a=function(t,e,s=1,i=!1){return si(t,e,1/s,i)}(e.baseTime,1,e.timescale)
try{n.forEach((t=>s(function(t,e){const s=(new DOMParser).parseFromString(t,"text/xml").getElementsByTagName("tt")[0]
if(!s)throw new Error("Invalid ttml")
const i={frameRate:30,subFrameRate:1,frameRateMultiplier:0,tickRate:0},r=Object.keys(i).reduce(((t,e)=>(t[e]=s.getAttribute(`ttp:${e}`)||i[e],t)),{}),n="preserve"!==s.getAttribute("xml:space"),a=Sr(vr(s,"styling","style")),o=Sr(vr(s,"layout","region")),l=vr(s,"body","[begin]")
return[].map.call(l,(t=>{const s=Lr(t,n)
if(!s||!t.hasAttribute("begin"))return null
const i=br(t.getAttribute("begin"),r),l=br(t.getAttribute("dur"),r)
let h=br(t.getAttribute("end"),r)
if(null===i)throw Rr(t)
if(null===h){if(null===l)throw Rr(t)
h=i+l}const d=new er(i-e,h-e,s)
d.id=gr(d.startTime,d.endTime,d.text)
const c=function(t,e,s){const i="http://www.w3.org/ns/ttml#styling"
let r=null
const n=null!=t&&t.hasAttribute("style")?t.getAttribute("style"):null
return n&&s.hasOwnProperty(n)&&(r=s[n]),["displayAlign","textAlign","color","backgroundColor","fontSize","fontFamily"].reduce(((s,n)=>{const a=Ar(e,i,n)||Ar(t,i,n)||Ar(r,i,n)
return a&&(s[n]=a),s}),{})}(o[t.getAttribute("region")],a[t.getAttribute("style")],a),{textAlign:f}=c
if(f){const t=Tr[f]
t&&(d.lineAlign=t),d.align=f}return u(d,c),d})).filter((t=>null!==t))}(t,a))))}catch(t){i(t)}}function vr(t,e,s){const i=t.getElementsByTagName(e)[0]
return i?[].slice.call(i.querySelectorAll(s)):[]}function Sr(t){return t.reduce(((t,e)=>{const s=e.getAttribute("xml:id")
return s&&(t[s]=e),t}),{})}function Lr(t,e){return[].slice.call(t.childNodes).reduce(((t,s,i)=>{var r
return"br"===s.nodeName&&i?t+"\n":null!=(r=s.childNodes)&&r.length?Lr(s,e):e?t+s.textContent.trim().replace(/\s+/g," "):t+s.textContent}),"")}function Ar(t,e,s){return t&&t.hasAttributeNS(e,s)?t.getAttributeNS(e,s):null}function Rr(t){return new Error(`Could not parse ttml timestamp ${t}`)}function br(t,e){if(!t)return null
let s=ir(t)
return null===s&&(pr.test(t)?s=function(t,e){const s=pr.exec(t),i=(0|s[4])+(0|s[5])/e.subFrameRate
return 3600*(0|s[1])+60*(0|s[2])+(0|s[3])+i/e.frameRate}(t,e):yr.test(t)&&(s=function(t,e){const s=yr.exec(t),i=Number(s[1])
switch(s[2]){case"h":return 3600*i
case"m":return 60*i
case"ms":return 1e3*i
case"f":return i/e.frameRate
case"t":return i/e.tickRate}return i}(t,e))),s}function Ir(t,e){return!!t&&t.label===e.name&&!(t.textTrack1||t.textTrack2)}class Dr{constructor(t){this.hls=void 0,this.autoLevelCapping=void 0,this.firstLevel=void 0,this.media=void 0,this.restrictedLevels=void 0,this.timer=void 0,this.clientRect=void 0,this.streamController=void 0,this.hls=t,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.firstLevel=-1,this.media=null,this.restrictedLevels=[],this.timer=void 0,this.clientRect=null,this.registerListeners()}setStreamController(t){this.streamController=t}destroy(){this.unregisterListener(),this.hls.config.capLevelToPlayerSize&&this.stopCapping(),this.media=null,this.clientRect=null,this.hls=this.streamController=null}registerListeners(){const{hls:t}=this
t.on(g.FPS_DROP_LEVEL_CAPPING,this.onFpsDropLevelCapping,this),t.on(g.MEDIA_ATTACHING,this.onMediaAttaching,this),t.on(g.MANIFEST_PARSED,this.onManifestParsed,this),t.on(g.BUFFER_CODECS,this.onBufferCodecs,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this)}unregisterListener(){const{hls:t}=this
t.off(g.FPS_DROP_LEVEL_CAPPING,this.onFpsDropLevelCapping,this),t.off(g.MEDIA_ATTACHING,this.onMediaAttaching,this),t.off(g.MANIFEST_PARSED,this.onManifestParsed,this),t.off(g.BUFFER_CODECS,this.onBufferCodecs,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this)}onFpsDropLevelCapping(t,e){const s=this.hls.levels[e.droppedLevel]
this.isLevelAllowed(s)&&this.restrictedLevels.push({bitrate:s.bitrate,height:s.height,width:s.width})}onMediaAttaching(t,e){this.media=e.media instanceof HTMLVideoElement?e.media:null,this.clientRect=null}onManifestParsed(t,e){const s=this.hls
this.restrictedLevels=[],this.firstLevel=e.firstLevel,s.config.capLevelToPlayerSize&&e.video&&this.startCapping()}onBufferCodecs(t,e){this.hls.config.capLevelToPlayerSize&&e.video&&this.startCapping()}onMediaDetaching(){this.stopCapping()}detectPlayerSize(){if(this.media&&this.mediaHeight>0&&this.mediaWidth>0){const t=this.hls.levels
if(t.length){const e=this.hls
e.autoLevelCapping=this.getMaxLevel(t.length-1),e.autoLevelCapping>this.autoLevelCapping&&this.streamController&&this.streamController.nextLevelSwitch(),this.autoLevelCapping=e.autoLevelCapping}}}getMaxLevel(t){const e=this.hls.levels
if(!e.length)return-1
const s=e.filter(((e,s)=>this.isLevelAllowed(e)&&s<=t))
return this.clientRect=null,Dr.getMaxLevelByMediaSize(s,this.mediaWidth,this.mediaHeight)}startCapping(){this.timer||(this.autoLevelCapping=Number.POSITIVE_INFINITY,this.hls.firstLevel=this.getMaxLevel(this.firstLevel),self.clearInterval(this.timer),this.timer=self.setInterval(this.detectPlayerSize.bind(this),1e3),this.detectPlayerSize())}stopCapping(){this.restrictedLevels=[],this.firstLevel=-1,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.timer&&(self.clearInterval(this.timer),this.timer=void 0)}getDimensions(){if(this.clientRect)return this.clientRect
const t=this.media,e={width:0,height:0}
if(t){const s=t.getBoundingClientRect()
e.width=s.width,e.height=s.height,e.width||e.height||(e.width=s.right-s.left||t.width||0,e.height=s.bottom-s.top||t.height||0)}return this.clientRect=e,e}get mediaWidth(){return this.getDimensions().width*this.contentScaleFactor}get mediaHeight(){return this.getDimensions().height*this.contentScaleFactor}get contentScaleFactor(){let t=1
if(!this.hls.config.ignoreDevicePixelRatio)try{t=self.devicePixelRatio}catch(t){}return t}isLevelAllowed(t){return!this.restrictedLevels.some((e=>t.bitrate===e.bitrate&&t.width===e.width&&t.height===e.height))}static getMaxLevelByMediaSize(t,e,s){if(null==t||!t.length)return-1
let i=t.length-1
for(let a=0;a<t.length;a+=1){const o=t[a]
if((o.width>=e||o.height>=s)&&(r=o,!(n=t[a+1])||r.width!==n.width||r.height!==n.height)){i=a
break}}var r,n
return i}}const kr="[eme]"
class wr{constructor(t){this.hls=void 0,this.config=void 0,this.media=null,this.keyFormatPromise=null,this.keySystemAccessPromises={},this._requestLicenseFailureCount=0,this.mediaKeySessions=[],this.keyIdToKeySessionPromise={},this.setMediaKeysQueue=wr.CDMCleanupPromise?[wr.CDMCleanupPromise]:[],this.onMediaEncrypted=this._onMediaEncrypted.bind(this),this.onWaitingForKey=this._onWaitingForKey.bind(this),this.debug=v.debug.bind(v,kr),this.log=v.log.bind(v,kr),this.warn=v.warn.bind(v,kr),this.error=v.error.bind(v,kr),this.hls=t,this.config=t.config,this.registerListeners()}destroy(){this.unregisterListeners(),this.onMediaDetached()
const t=this.config
t.requestMediaKeySystemAccessFunc=null,t.licenseXhrSetup=t.licenseResponseCallback=void 0,t.drmSystems=t.drmSystemOptions={},this.hls=this.onMediaEncrypted=this.onWaitingForKey=this.keyIdToKeySessionPromise=null,this.config=null}registerListeners(){this.hls.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.on(g.MEDIA_DETACHED,this.onMediaDetached,this),this.hls.on(g.MANIFEST_LOADED,this.onManifestLoaded,this)}unregisterListeners(){this.hls.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.off(g.MEDIA_DETACHED,this.onMediaDetached,this),this.hls.off(g.MANIFEST_LOADED,this.onManifestLoaded,this)}getLicenseServerUrl(t){const{drmSystems:e,widevineLicenseUrl:s}=this.config,i=e[t]
if(i)return i.licenseUrl
if(t===F.WIDEVINE&&s)return s
throw new Error(`no license server URL configured for key-system "${t}"`)}getServerCertificateUrl(t){const{drmSystems:e}=this.config,s=e[t]
if(s)return s.serverCertificateUrl
this.log(`No Server Certificate in config.drmSystems["${t}"]`)}attemptKeySystemAccess(t){const e=this.hls.levels,s=(t,e,s)=>!!t&&s.indexOf(t)===e,i=e.map((t=>t.audioCodec)).filter(s),r=e.map((t=>t.videoCodec)).filter(s)
return i.length+r.length===0&&r.push("avc1.42e01e"),new Promise(((e,s)=>{const n=t=>{const a=t.shift()
this.getMediaKeysPromise(a,i,r).then((t=>e({keySystem:a,mediaKeys:t}))).catch((e=>{t.length?n(t):s(e instanceof Cr?e:new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_NO_ACCESS,error:e,fatal:!0},e.message))}))}
n(t)}))}requestMediaKeySystemAccess(t,e){const{requestMediaKeySystemAccessFunc:s}=this.config
if("function"!=typeof s){let t=`Configured requestMediaKeySystemAccess is not a function ${s}`
return null===H&&"http:"===self.location.protocol&&(t=`navigator.requestMediaKeySystemAccess is not available over insecure protocol ${location.protocol}`),Promise.reject(new Error(t))}return s(t,e)}getMediaKeysPromise(t,e,s){const i=function(t,e,s,i){let r
switch(t){case F.FAIRPLAY:r=["cenc","sinf"]
break
case F.WIDEVINE:case F.PLAYREADY:r=["cenc"]
break
case F.CLEARKEY:r=["cenc","keyids"]
break
default:throw new Error(`Unknown key-system: ${t}`)}return function(t,e,s,i){return[{initDataTypes:t,persistentState:i.persistentState||"not-allowed",distinctiveIdentifier:i.distinctiveIdentifier||"not-allowed",sessionTypes:i.sessionTypes||[i.sessionType||"temporary"],audioCapabilities:e.map((t=>({contentType:`audio/mp4; codecs="${t}"`,robustness:i.audioRobustness||"",encryptionScheme:i.audioEncryptionScheme||null}))),videoCapabilities:s.map((t=>({contentType:`video/mp4; codecs="${t}"`,robustness:i.videoRobustness||"",encryptionScheme:i.videoEncryptionScheme||null})))}]}(r,e,s,i)}(t,e,s,this.config.drmSystemOptions),r=this.keySystemAccessPromises[t]
let n=null==r?void 0:r.keySystemAccess
if(!n){this.log(`Requesting encrypted media "${t}" key-system access with config: ${JSON.stringify(i)}`),n=this.requestMediaKeySystemAccess(t,i)
const e=this.keySystemAccessPromises[t]={keySystemAccess:n}
return n.catch((e=>{this.log(`Failed to obtain access to key-system "${t}": ${e}`)})),n.then((s=>{this.log(`Access for key-system "${s.keySystem}" obtained`)
const i=this.fetchServerCertificate(t)
return this.log(`Create media-keys for "${t}"`),e.mediaKeys=s.createMediaKeys().then((e=>(this.log(`Media-keys created for "${t}"`),i.then((s=>s?this.setMediaKeysServerCertificate(e,t,s):e))))),e.mediaKeys.catch((e=>{this.error(`Failed to create media-keys for "${t}"}: ${e}`)})),e.mediaKeys}))}return n.then((()=>r.mediaKeys))}createMediaKeySessionContext({decryptdata:t,keySystem:e,mediaKeys:s}){this.log(`Creating key-system session "${e}" keyId: ${at(t.keyId||[])}`)
const i=s.createSession(),r={decryptdata:t,keySystem:e,mediaKeys:s,mediaKeysSession:i,keyStatus:"status-pending"}
return this.mediaKeySessions.push(r),r}renewKeySession(t){const e=t.decryptdata
if(e.pssh){const s=this.createMediaKeySessionContext(t),i=this.getKeyIdString(e),r="cenc"
this.keyIdToKeySessionPromise[i]=this.generateRequestWithPreferredKeySession(s,r,e.pssh,"expired")}else this.warn("Could not renew expired session. Missing pssh initData.")
this.removeSession(t)}getKeyIdString(t){if(!t)throw new Error("Could not read keyId of undefined decryptdata")
if(null===t.keyId)throw new Error("keyId is null")
return at(t.keyId)}updateKeySession(t,e){var s
const i=t.mediaKeysSession
return this.log(`Updating key-session "${i.sessionId}" for keyID ${at((null==(s=t.decryptdata)?void 0:s.keyId)||[])}\n      } (data length: ${e?e.byteLength:e})`),i.update(e)}selectKeySystemFormat(t){const e=Object.keys(t.levelkeys||{})
return this.keyFormatPromise||(this.log(`Selecting key-system from fragment (sn: ${t.sn} ${t.type}: ${t.level}) key formats ${e.join(", ")}`),this.keyFormatPromise=this.getKeyFormatPromise(e)),this.keyFormatPromise}getKeyFormatPromise(t){return new Promise(((e,s)=>{const i=K(this.config),r=t.map(B).filter((t=>!!t&&-1!==i.indexOf(t)))
return this.getKeySystemSelectionPromise(r).then((({keySystem:t})=>{const i=G(t)
i?e(i):s(new Error(`Unable to find format for key-system "${t}"`))})).catch(s)}))}loadKey(t){const e=t.keyInfo.decryptdata,s=this.getKeyIdString(e),i=`(keyId: ${s} format: "${e.keyFormat}" method: ${e.method} uri: ${e.uri})`
this.log(`Starting session for key ${i}`)
let r=this.keyIdToKeySessionPromise[s]
return r||(r=this.keyIdToKeySessionPromise[s]=this.getKeySystemForKeyPromise(e).then((({keySystem:s,mediaKeys:r})=>(this.throwIfDestroyed(),this.log(`Handle encrypted media sn: ${t.frag.sn} ${t.frag.type}: ${t.frag.level} using key ${i}`),this.attemptSetMediaKeys(s,r).then((()=>{this.throwIfDestroyed()
const t=this.createMediaKeySessionContext({keySystem:s,mediaKeys:r,decryptdata:e})
return this.generateRequestWithPreferredKeySession(t,"cenc",e.pssh,"playlist-key")}))))),r.catch((t=>this.handleError(t)))),r}throwIfDestroyed(t="Invalid state"){if(!this.hls)throw new Error("invalid state")}handleError(t){this.hls&&(this.error(t.message),t instanceof Cr?this.hls.trigger(g.ERROR,t.data):this.hls.trigger(g.ERROR,{type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_NO_KEYS,error:t,fatal:!0}))}getKeySystemForKeyPromise(t){const e=this.getKeyIdString(t),s=this.keyIdToKeySessionPromise[e]
if(!s){const e=B(t.keyFormat),s=e?[e]:K(this.config)
return this.attemptKeySystemAccess(s)}return s}getKeySystemSelectionPromise(t){if(t.length||(t=K(this.config)),0===t.length)throw new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_NO_CONFIGURED_LICENSE,fatal:!0},`Missing key-system license configuration options ${JSON.stringify({drmSystems:this.config.drmSystems})}`)
return this.attemptKeySystemAccess(t)}_onMediaEncrypted(t){const{initDataType:e,initData:s}=t
if(this.debug(`"${t.type}" event: init data type: "${e}"`),null===s)return
let i,r
if("sinf"===e&&this.config.drmSystems[F.FAIRPLAY]){const e=dt(new Uint8Array(s))
try{const t=P(JSON.parse(e).sinf),s=Tt(new Uint8Array(t))
if(!s)return
i=s.subarray(8,24),r=F.FAIRPLAY}catch(t){return void this.warn('Failed to parse sinf "encrypted" event message initData')}}else{const t=function(t){if(!(t instanceof ArrayBuffer)||t.byteLength<32)return null
const e={version:0,systemId:"",kids:null,data:null},s=new DataView(t),i=s.getUint32(0)
if(t.byteLength!==i&&i>44)return null
if(1886614376!==s.getUint32(4))return null
if(e.version=s.getUint32(8)>>>24,e.version>1)return null
e.systemId=at(new Uint8Array(t,12,16))
const r=s.getUint32(28)
if(0===e.version){if(i-32<r)return null
e.data=new Uint8Array(t,32,r)}else if(1===e.version){e.kids=[]
for(let s=0;s<r;s++)e.kids.push(new Uint8Array(t,32+16*s,16))}return e}(s)
if(null===t)return
0===t.version&&t.systemId===$&&t.data&&(i=t.data.subarray(8,24)),r=function(t){if(t===$)return F.WIDEVINE}(t.systemId)}if(!r||!i)return
const n=at(i),{keyIdToKeySessionPromise:a,mediaKeySessions:o}=this
let l=a[n]
for(let h=0;h<o.length;h++){const t=o[h],r=t.decryptdata
if(r.pssh||!r.keyId)continue
const d=at(r.keyId)
if(n===d||-1!==r.uri.replace(/-/g,"").indexOf(n)){l=a[d],delete a[d],r.pssh=new Uint8Array(s),r.keyId=i,l=a[n]=l.then((()=>this.generateRequestWithPreferredKeySession(t,e,s,"encrypted-event-key-match")))
break}}l||(l=a[n]=this.getKeySystemSelectionPromise([r]).then((({keySystem:t,mediaKeys:r})=>{var a
this.throwIfDestroyed()
const o=new It("ISO-23001-7",n,null!=(a=G(t))?a:"")
return o.pssh=new Uint8Array(s),o.keyId=i,this.attemptSetMediaKeys(t,r).then((()=>{this.throwIfDestroyed()
const i=this.createMediaKeySessionContext({decryptdata:o,keySystem:t,mediaKeys:r})
return this.generateRequestWithPreferredKeySession(i,e,s,"encrypted-event-no-match")}))}))),l.catch((t=>this.handleError(t)))}_onWaitingForKey(t){this.log(`"${t.type}" event`)}attemptSetMediaKeys(t,e){const s=this.setMediaKeysQueue.slice()
this.log(`Setting media-keys for "${t}"`)
const i=Promise.all(s).then((()=>{if(!this.media)throw new Error("Attempted to set mediaKeys without media element attached")
return this.media.setMediaKeys(e)}))
return this.setMediaKeysQueue.push(i),i.then((()=>{this.log(`Media-keys set for "${t}"`),s.push(i),this.setMediaKeysQueue=this.setMediaKeysQueue.filter((t=>-1===s.indexOf(t)))}))}generateRequestWithPreferredKeySession(t,e,s,i){var r,n
const a=null==(r=this.config.drmSystems)||null==(n=r[t.keySystem])?void 0:n.generateRequest
if(a)try{const i=a.call(this.hls,e,s,t)
if(!i)throw new Error("Invalid response from configured generateRequest filter")
e=i.initDataType,s=t.decryptdata.pssh=i.initData?new Uint8Array(i.initData):null}catch(t){var o
if(this.warn(t.message),null!=(o=this.hls)&&o.config.debug)throw t}if(null===s)return this.log(`Skipping key-session request for "${i}" (no initData)`),Promise.resolve(t)
const l=this.getKeyIdString(t.decryptdata)
this.log(`Generating key-session request for "${i}": ${l} (init data type: ${e} length: ${s?s.byteLength:null})`)
const h=new vi
t.mediaKeysSession.onmessage=e=>{const s=t.mediaKeysSession
if(!s)return void h.emit("error",new Error("invalid state"))
const{messageType:i,message:r}=e
this.log(`"${i}" message event for session "${s.sessionId}" message size: ${r.byteLength}`),"license-request"===i||"license-renewal"===i?this.renewLicense(t,r).catch((t=>{this.handleError(t),h.emit("error",t)})):"license-release"===i?t.keySystem===F.FAIRPLAY&&(this.updateKeySession(t,x("acknowledged")),this.removeSession(t)):this.warn(`unhandled media key message type "${i}"`)},t.mediaKeysSession.onkeystatuseschange=e=>{if(!t.mediaKeysSession)return void h.emit("error",new Error("invalid state"))
this.onKeyStatusChange(t)
const s=t.keyStatus
h.emit("keyStatus",s),"expired"===s&&(this.warn(`${t.keySystem} expired for key ${l}`),this.renewKeySession(t))}
const d=new Promise(((t,e)=>{h.on("error",e),h.on("keyStatus",(s=>{s.startsWith("usable")?t():"output-restricted"===s?e(new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED,fatal:!1},"HDCP level output restricted")):"internal-error"===s?e(new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_STATUS_INTERNAL_ERROR,fatal:!0},`key status changed to "${s}"`)):"expired"===s?e(new Error("key expired while generating request")):this.warn(`unhandled key status change "${s}"`)}))}))
return t.mediaKeysSession.generateRequest(e,s).then((()=>{var e
this.log(`Request generated for key-session "${null==(e=t.mediaKeysSession)?void 0:e.sessionId}" keyId: ${l}`)})).catch((t=>{throw new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_NO_SESSION,error:t,fatal:!1},`Error generating key-session request: ${t}`)})).then((()=>d)).catch((e=>{throw h.removeAllListeners(),this.removeSession(t),e})).then((()=>(h.removeAllListeners(),t)))}onKeyStatusChange(t){t.mediaKeysSession.keyStatuses.forEach(((e,s)=>{this.log(`key status change "${e}" for keyStatuses keyId: ${at("buffer"in s?new Uint8Array(s.buffer,s.byteOffset,s.byteLength):new Uint8Array(s))} session keyId: ${at(new Uint8Array(t.decryptdata.keyId||[]))} uri: ${t.decryptdata.uri}`),t.keyStatus=e}))}fetchServerCertificate(t){const e=this.config,s=new(0,e.loader)(e),i=this.getServerCertificateUrl(t)
return i?(this.log(`Fetching serverCertificate for "${t}"`),new Promise(((r,n)=>{const a={responseType:"arraybuffer",url:i},o=e.certLoadPolicy.default,l={loadPolicy:o,timeout:o.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0},h={onSuccess:(t,e,s,i)=>{r(t.data)},onError:(e,s,r,o)=>{n(new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,fatal:!0,networkDetails:r,response:d({url:a.url,data:void 0},e)},`"${t}" certificate request failed (${i}). Status: ${e.code} (${e.text})`))},onTimeout:(e,s,r)=>{n(new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,fatal:!0,networkDetails:r,response:{url:a.url,data:void 0}},`"${t}" certificate request timed out (${i})`))},onAbort:(t,e,s)=>{n(new Error("aborted"))}}
s.load(a,l,h)}))):Promise.resolve()}setMediaKeysServerCertificate(t,e,s){return new Promise(((i,r)=>{t.setServerCertificate(s).then((r=>{this.log(`setServerCertificate ${r?"success":"not supported by CDM"} (${null==s?void 0:s.byteLength}) on "${e}"`),i(t)})).catch((t=>{r(new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED,error:t,fatal:!0},t.message))}))}))}renewLicense(t,e){return this.requestLicense(t,new Uint8Array(e)).then((e=>this.updateKeySession(t,new Uint8Array(e)).catch((t=>{throw new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_SESSION_UPDATE_FAILED,error:t,fatal:!0},t.message)}))))}setupLicenseXHR(t,e,s,i){const r=this.config.licenseXhrSetup
return r?Promise.resolve().then((()=>{if(!s.decryptdata)throw new Error("Key removed")
return r.call(this.hls,t,e,s,i)})).catch((n=>{if(!s.decryptdata)throw n
return t.open("POST",e,!0),r.call(this.hls,t,e,s,i)})).then((s=>(t.readyState||t.open("POST",e,!0),{xhr:t,licenseChallenge:s||i}))):(t.open("POST",e,!0),Promise.resolve({xhr:t,licenseChallenge:i}))}requestLicense(t,e){const s=this.config.keyLoadPolicy.default
return new Promise(((i,r)=>{const n=this.getLicenseServerUrl(t.keySystem)
this.log(`Sending license request to URL: ${n}`)
const a=new XMLHttpRequest
a.responseType="arraybuffer",a.onreadystatechange=()=>{if(!this.hls||!t.mediaKeysSession)return r(new Error("invalid state"))
if(4===a.readyState)if(200===a.status){this._requestLicenseFailureCount=0
let e=a.response
this.log(`License received ${e instanceof ArrayBuffer?e.byteLength:e}`)
const s=this.config.licenseResponseCallback
if(s)try{e=s.call(this.hls,a,n,t)}catch(t){this.error(t)}i(e)}else{const o=s.errorRetry,l=o?o.maxNumRetry:0
if(this._requestLicenseFailureCount++,this._requestLicenseFailureCount>l||a.status>=400&&a.status<500)r(new Cr({type:m.KEY_SYSTEM_ERROR,details:p.KEY_SYSTEM_LICENSE_REQUEST_FAILED,fatal:!0,networkDetails:a,response:{url:n,data:void 0,code:a.status,text:a.statusText}},`License Request XHR failed (${n}). Status: ${a.status} (${a.statusText})`))
else{const s=l-this._requestLicenseFailureCount+1
this.warn(`Retrying license request, ${s} attempts left`),this.requestLicense(t,e).then(i,r)}}},t.licenseXhr&&t.licenseXhr.readyState!==XMLHttpRequest.DONE&&t.licenseXhr.abort(),t.licenseXhr=a,this.setupLicenseXHR(a,n,t,e).then((({xhr:t,licenseChallenge:e})=>{t.send(e)}))}))}onMediaAttached(t,e){if(!this.config.emeEnabled)return
const s=e.media
this.media=s,s.addEventListener("encrypted",this.onMediaEncrypted),s.addEventListener("waitingforkey",this.onWaitingForKey)}onMediaDetached(){const t=this.media,e=this.mediaKeySessions
t&&(t.removeEventListener("encrypted",this.onMediaEncrypted),t.removeEventListener("waitingforkey",this.onWaitingForKey),this.media=null),this._requestLicenseFailureCount=0,this.setMediaKeysQueue=[],this.mediaKeySessions=[],this.keyIdToKeySessionPromise={},It.clearKeyUriToKeyIdMap()
const s=e.length
wr.CDMCleanupPromise=Promise.all(e.map((t=>this.removeSession(t))).concat(null==t?void 0:t.setMediaKeys(null).catch((e=>{this.log(`Could not clear media keys: ${e}. media.src: ${null==t?void 0:t.src}`)})))).then((()=>{s&&(this.log("finished closing key sessions and clearing media keys"),e.length=0)})).catch((e=>{this.log(`Could not close sessions and clear media keys: ${e}. media.src: ${null==t?void 0:t.src}`)}))}onManifestLoaded(t,{sessionKeys:e}){if(e&&this.config.emeEnabled&&!this.keyFormatPromise){const t=e.reduce(((t,e)=>(-1===t.indexOf(e.keyFormat)&&t.push(e.keyFormat),t)),[])
this.log(`Selecting key-system from session-keys ${t.join(", ")}`),this.keyFormatPromise=this.getKeyFormatPromise(t)}}removeSession(t){const{mediaKeysSession:e,licenseXhr:s}=t
if(e){this.log(`Remove licenses and keys and close session ${e.sessionId}`),e.onmessage=null,e.onkeystatuseschange=null,s&&s.readyState!==XMLHttpRequest.DONE&&s.abort(),t.mediaKeysSession=t.decryptdata=t.licenseXhr=void 0
const i=this.mediaKeySessions.indexOf(t)
return i>-1&&this.mediaKeySessions.splice(i,1),e.remove().catch((t=>{this.log(`Could not remove session: ${t}`)})).then((()=>e.close())).catch((t=>{this.log(`Could not close session: ${t}`)}))}}}wr.CDMCleanupPromise=void 0
class Cr extends Error{constructor(t,e){super(e),this.data=void 0,t.error||(t.error=new Error(e)),this.data=t,t.err=t.error}}var _r="a",Pr="av"
class xr{constructor(t){this.hls=void 0,this.config=void 0,this.media=void 0,this.sid=void 0,this.cid=void 0,this.useHeaders=!1,this.initialized=!1,this.starved=!1,this.buffering=!0,this.audioBuffer=void 0,this.videoBuffer=void 0,this.onWaiting=()=>{this.initialized&&(this.starved=!0),this.buffering=!0},this.onPlaying=()=>{this.initialized||(this.initialized=!0),this.buffering=!1},this.applyPlaylistData=t=>{try{this.apply(t,{ot:"m",su:!this.initialized})}catch(t){v.warn("Could not generate manifest CMCD data.",t)}},this.applyFragmentData=t=>{try{const e=t.frag,s=this.hls.levels[e.level],i=this.getObjectType(e),r={d:1e3*e.duration,ot:i}
"v"!==i&&i!==_r&&i!=Pr||(r.br=s.bitrate/1e3,r.tb=this.getTopBandwidth(i)/1e3,r.bl=this.getBufferLength(i)),this.apply(t,r)}catch(t){v.warn("Could not generate segment CMCD data.",t)}},this.hls=t
const e=this.config=t.config,{cmcd:s}=e
null!=s&&(e.pLoader=this.createPlaylistLoader(),e.fLoader=this.createFragmentLoader(),this.sid=s.sessionId||xr.uuid(),this.cid=s.contentId,this.useHeaders=!0===s.useHeaders,this.registerListeners())}registerListeners(){const t=this.hls
t.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(g.MEDIA_DETACHED,this.onMediaDetached,this),t.on(g.BUFFER_CREATED,this.onBufferCreated,this)}unregisterListeners(){const t=this.hls
t.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(g.MEDIA_DETACHED,this.onMediaDetached,this),t.off(g.BUFFER_CREATED,this.onBufferCreated,this)}destroy(){this.unregisterListeners(),this.onMediaDetached(),this.hls=this.config=this.audioBuffer=this.videoBuffer=null}onMediaAttached(t,e){this.media=e.media,this.media.addEventListener("waiting",this.onWaiting),this.media.addEventListener("playing",this.onPlaying)}onMediaDetached(){this.media&&(this.media.removeEventListener("waiting",this.onWaiting),this.media.removeEventListener("playing",this.onPlaying),this.media=null)}onBufferCreated(t,e){var s,i
this.audioBuffer=null==(s=e.tracks.audio)?void 0:s.buffer,this.videoBuffer=null==(i=e.tracks.video)?void 0:i.buffer}createData(){var t
return{v:1,sf:"h",sid:this.sid,cid:this.cid,pr:null==(t=this.media)?void 0:t.playbackRate,mtp:this.hls.bandwidthEstimate/1e3}}apply(t,e={}){u(e,this.createData())
const s="i"===e.ot||"v"===e.ot||e.ot===Pr
if(this.starved&&s&&(e.bs=!0,e.su=!0,this.starved=!1),null==e.su&&(e.su=this.buffering),this.useHeaders){const s=xr.toHeaders(e)
if(!Object.keys(s).length)return
t.headers||(t.headers={}),u(t.headers,s)}else{const s=xr.toQuery(e)
if(!s)return
t.url=xr.appendQueryToUri(t.url,s)}}getObjectType(t){const{type:e}=t
return"subtitle"===e?"tt":"initSegment"===t.sn?"i":"audio"===e?_r:"main"===e?this.hls.audioTracks.length?"v":Pr:void 0}getTopBandwidth(t){let e,s=0
const i=this.hls
if(t===_r)e=i.audioTracks
else{const t=i.maxAutoLevel,s=t>-1?t+1:i.levels.length
e=i.levels.slice(0,s)}for(const r of e)r.bitrate>s&&(s=r.bitrate)
return s>0?s:NaN}getBufferLength(t){const e=this.hls.media,s=t===_r?this.audioBuffer:this.videoBuffer
return s&&e?1e3*Xe.bufferInfo(s,e.currentTime,this.config.maxBufferHole).len:NaN}createPlaylistLoader(){const{pLoader:t}=this.config,e=this.applyPlaylistData,s=t||this.config.loader
return class{constructor(t){this.loader=void 0,this.loader=new s(t)}get stats(){return this.loader.stats}get context(){return this.loader.context}destroy(){this.loader.destroy()}abort(){this.loader.abort()}load(t,s,i){e(t),this.loader.load(t,s,i)}}}createFragmentLoader(){const{fLoader:t}=this.config,e=this.applyFragmentData,s=t||this.config.loader
return class{constructor(t){this.loader=void 0,this.loader=new s(t)}get stats(){return this.loader.stats}get context(){return this.loader.context}destroy(){this.loader.destroy()}abort(){this.loader.abort()}load(t,s,i){e(t),this.loader.load(t,s,i)}}}static uuid(){const t=URL.createObjectURL(new Blob),e=t.toString()
return URL.revokeObjectURL(t),e.slice(e.lastIndexOf("/")+1)}static serialize(t){const e=[],s=t=>!Number.isNaN(t)&&null!=t&&""!==t&&!1!==t,i=t=>Math.round(t),r=t=>100*i(t/100),n={br:i,d:i,bl:r,dl:r,mtp:r,nor:t=>encodeURIComponent(t),rtp:r,tb:i},a=Object.keys(t||{}).sort()
for(const o of a){let i=t[o]
if(!s(i))continue
if("v"===o&&1===i)continue
if("pr"==o&&1===i)continue
const r=n[o]
r&&(i=r(i))
const a=typeof i
let l
l="ot"===o||"sf"===o||"st"===o?`${o}=${i}`:"boolean"===a?o:"number"===a?`${o}=${i}`:`${o}=${JSON.stringify(i)}`,e.push(l)}return e.join(",")}static toHeaders(t){const e=Object.keys(t),s={},i=["Object","Request","Session","Status"],r=[{},{},{},{}],n={br:0,d:0,ot:0,tb:0,bl:1,dl:1,mtp:1,nor:1,nrr:1,su:1,cid:2,pr:2,sf:2,sid:2,st:2,v:2,bs:3,rtp:3}
for(const a of e)r[null!=n[a]?n[a]:1][a]=t[a]
for(let a=0;a<r.length;a++){const t=xr.serialize(r[a])
t&&(s[`CMCD-${i[a]}`]=t)}return s}static toQuery(t){return`CMCD=${encodeURIComponent(xr.serialize(t))}`}static appendQueryToUri(t,e){if(!e)return t
const s=t.includes("?")?"&":"?"
return`${t}${s}${e}`}}function Fr(t,e,s,i){t&&Object.keys(e).forEach((r=>{const n=t.filter((t=>t.groupId===r)).map((t=>{const n=u({},t)
return n.details=void 0,n.attrs=new A(n.attrs),n.url=n.attrs.URI=Or(t.url,t.attrs["STABLE-RENDITION-ID"],"PER-RENDITION-URIS",s),n.groupId=n.attrs["GROUP-ID"]=e[r],n.attrs["PATHWAY-ID"]=i,n}))
t.push(...n)}))}function Or(t,e,s,i){const{HOST:r,PARAMS:n,[s]:a}=i
let o
e&&(o=null==a?void 0:a[e],o&&(t=o))
const l=new self.URL(t)
return r&&!o&&(l.host=r),n&&Object.keys(n).sort().forEach((t=>{t&&l.searchParams.set(t,n[t])})),l.href}const Mr=/^age:\s*[\d.]+\s*$/im
class Nr{constructor(t){this.xhrSetup=void 0,this.requestTimeout=void 0,this.retryTimeout=void 0,this.retryDelay=void 0,this.config=null,this.callbacks=null,this.context=void 0,this.loader=null,this.stats=void 0,this.xhrSetup=t&&t.xhrSetup||null,this.stats=new I,this.retryDelay=0}destroy(){this.callbacks=null,this.abortInternal(),this.loader=null,this.config=null}abortInternal(){const t=this.loader
self.clearTimeout(this.requestTimeout),self.clearTimeout(this.retryTimeout),t&&(t.onreadystatechange=null,t.onprogress=null,4!==t.readyState&&(this.stats.aborted=!0,t.abort()))}abort(){var t
this.abortInternal(),null!=(t=this.callbacks)&&t.onAbort&&this.callbacks.onAbort(this.stats,this.context,this.loader)}load(t,e,s){if(this.stats.loading.start)throw new Error("Loader can only be used once.")
this.stats.loading.start=self.performance.now(),this.context=t,this.config=e,this.callbacks=s,this.loadInternal()}loadInternal(){const{config:t,context:e}=this
if(!t)return
const s=this.loader=new self.XMLHttpRequest,i=this.stats
i.loading.first=0,i.loaded=0
const r=this.xhrSetup
r?Promise.resolve().then((()=>{if(!this.stats.aborted)return r(s,e.url)})).catch((t=>(s.open("GET",e.url,!0),r(s,e.url)))).then((()=>{this.stats.aborted||this.openAndSendXhr(s,e,t)})).catch((t=>{this.callbacks.onError({code:s.status,text:t.message},e,s,i)})):this.openAndSendXhr(s,e,t)}openAndSendXhr(t,e,s){t.readyState||t.open("GET",e.url,!0)
const i=this.context.headers,{maxTimeToFirstByteMs:r,maxLoadTimeMs:n}=s.loadPolicy
if(i)for(const a in i)t.setRequestHeader(a,i[a])
e.rangeEnd&&t.setRequestHeader("Range","bytes="+e.rangeStart+"-"+(e.rangeEnd-1)),t.onreadystatechange=this.readystatechange.bind(this),t.onprogress=this.loadprogress.bind(this),t.responseType=e.responseType,self.clearTimeout(this.requestTimeout),s.timeout=r&&f(r)?r:n,this.requestTimeout=self.setTimeout(this.loadtimeout.bind(this),s.timeout),t.send()}readystatechange(){const{context:t,loader:e,stats:s}=this
if(!t||!e)return
const i=e.readyState,r=this.config
if(!s.aborted&&i>=2&&(0===s.loading.first&&(s.loading.first=Math.max(self.performance.now(),s.loading.start),r.timeout!==r.loadPolicy.maxLoadTimeMs&&(self.clearTimeout(this.requestTimeout),r.timeout=r.loadPolicy.maxLoadTimeMs,this.requestTimeout=self.setTimeout(this.loadtimeout.bind(this),r.loadPolicy.maxLoadTimeMs-(s.loading.first-s.loading.start)))),4===i)){self.clearTimeout(this.requestTimeout),e.onreadystatechange=null,e.onprogress=null
const i=e.status,n="text"!==e.responseType
if(i>=200&&i<300&&(n&&e.response||null!==e.responseText)){s.loading.end=Math.max(self.performance.now(),s.loading.first)
const r=n?e.response:e.responseText,a="arraybuffer"===e.responseType?r.byteLength:r.length
if(s.loaded=s.total=a,s.bwEstimate=8e3*s.total/(s.loading.end-s.loading.first),!this.callbacks)return
const o=this.callbacks.onProgress
if(o&&o(s,t,r,e),!this.callbacks)return
const l={url:e.responseURL,data:r,code:i}
this.callbacks.onSuccess(l,s,t,e)}else{const n=r.loadPolicy.errorRetry
Ae(n,s.retry,!1,i)?this.retry(n):(v.error(`${i} while loading ${t.url}`),this.callbacks.onError({code:i,text:e.statusText},t,e,s))}}}loadtimeout(){var t
const e=null==(t=this.config)?void 0:t.loadPolicy.timeoutRetry
if(Ae(e,this.stats.retry,!0))this.retry(e)
else{v.warn(`timeout while loading ${this.context.url}`)
const t=this.callbacks
t&&(this.abortInternal(),t.onTimeout(this.stats,this.context,this.loader))}}retry(t){const{context:e,stats:s}=this
this.retryDelay=Se(t,s.retry),s.retry++,v.warn(`${status?"HTTP Status "+status:"Timeout"} while loading ${e.url}, retrying ${s.retry}/${t.maxNumRetry} in ${this.retryDelay}ms`),this.abortInternal(),this.loader=null,self.clearTimeout(this.retryTimeout),this.retryTimeout=self.setTimeout(this.loadInternal.bind(this),this.retryDelay)}loadprogress(t){const e=this.stats
e.loaded=t.loaded,t.lengthComputable&&(e.total=t.total)}getCacheAge(){let t=null
if(this.loader&&Mr.test(this.loader.getAllResponseHeaders())){const e=this.loader.getResponseHeader("age")
t=e?parseFloat(e):null}return t}getResponseHeader(t){return this.loader&&new RegExp(`^${t}:\\s*[\\d.]+\\s*$`,"im").test(this.loader.getAllResponseHeaders())?this.loader.getResponseHeader(t):null}}const Ur=/(\d+)-(\d+)\/(\d+)/
class Br{constructor(t){this.fetchSetup=void 0,this.requestTimeout=void 0,this.request=void 0,this.response=void 0,this.controller=void 0,this.context=void 0,this.config=null,this.callbacks=null,this.stats=void 0,this.loader=null,this.fetchSetup=t.fetchSetup||$r,this.controller=new self.AbortController,this.stats=new I}destroy(){this.loader=this.callbacks=null,this.abortInternal()}abortInternal(){const t=this.response
null!=t&&t.ok||(this.stats.aborted=!0,this.controller.abort())}abort(){var t
this.abortInternal(),null!=(t=this.callbacks)&&t.onAbort&&this.callbacks.onAbort(this.stats,this.context,this.response)}load(t,e,s){const i=this.stats
if(i.loading.start)throw new Error("Loader can only be used once.")
i.loading.start=self.performance.now()
const r=function(t,e){const s={method:"GET",mode:"cors",credentials:"same-origin",signal:e,headers:new self.Headers(u({},t.headers))}
return t.rangeEnd&&s.headers.set("Range","bytes="+t.rangeStart+"-"+String(t.rangeEnd-1)),s}(t,this.controller.signal),n=s.onProgress,a="arraybuffer"===t.responseType,o=a?"byteLength":"length",{maxTimeToFirstByteMs:l,maxLoadTimeMs:h}=e.loadPolicy
this.context=t,this.config=e,this.callbacks=s,this.request=this.fetchSetup(t,r),self.clearTimeout(this.requestTimeout),e.timeout=l&&f(l)?l:h,this.requestTimeout=self.setTimeout((()=>{this.abortInternal(),s.onTimeout(i,t,this.response)}),e.timeout),self.fetch(this.request).then((r=>{this.response=this.loader=r
const o=Math.max(self.performance.now(),i.loading.start)
if(self.clearTimeout(this.requestTimeout),e.timeout=h,this.requestTimeout=self.setTimeout((()=>{this.abortInternal(),s.onTimeout(i,t,this.response)}),h-(o-i.loading.start)),!r.ok){const{status:t,statusText:e}=r
throw new Gr(e||"fetch, bad network response",t,r)}return i.loading.first=o,i.total=function(t){const e=t.get("Content-Range")
if(e){const t=function(t){const e=Ur.exec(t)
if(e)return parseInt(e[2])-parseInt(e[1])+1}(e)
if(f(t))return t}const s=t.get("Content-Length")
if(s)return parseInt(s)}(r.headers)||i.total,n&&f(e.highWaterMark)?this.loadProgressively(r,i,t,e.highWaterMark,n):a?r.arrayBuffer():"json"===t.responseType?r.json():r.text()})).then((r=>{const{response:a}=this
self.clearTimeout(this.requestTimeout),i.loading.end=Math.max(self.performance.now(),i.loading.first)
const l=r[o]
l&&(i.loaded=i.total=l)
const h={url:a.url,data:r,code:a.status}
n&&!f(e.highWaterMark)&&n(i,t,r,a),s.onSuccess(h,i,t,a)})).catch((e=>{if(self.clearTimeout(this.requestTimeout),i.aborted)return
const r=e&&e.code||0,n=e?e.message:null
s.onError({code:r,text:n},t,e?e.details:null,i)}))}getCacheAge(){let t=null
if(this.response){const e=this.response.headers.get("age")
t=e?parseFloat(e):null}return t}getResponseHeader(t){return this.response?this.response.headers.get(t):null}loadProgressively(t,e,s,i=0,r){const n=new Di,a=t.body.getReader(),o=()=>a.read().then((a=>{if(a.done)return n.dataLength&&r(e,s,n.flush(),t),Promise.resolve(new ArrayBuffer(0))
const l=a.value,h=l.length
return e.loaded+=h,h<i||n.dataLength?(n.push(l),n.dataLength>=i&&r(e,s,n.flush(),t)):r(e,s,l,t),o()})).catch((()=>Promise.reject()))
return o()}}function $r(t,e){return new self.Request(t.url,e)}class Gr extends Error{constructor(t,e,s){super(t),this.code=void 0,this.details=void 0,this.code=e,this.details=s}}const Kr=/\s/,Hr={newCue(t,e,s,i){const r=[]
let n,a,o,l,h
const d=self.VTTCue||self.TextTrackCue
for(let u=0;u<i.rows.length;u++)if(n=i.rows[u],o=!0,l=0,h="",!n.isEmpty()){var c
for(let t=0;t<n.chars.length;t++)Kr.test(n.chars[t].uchar)&&o?l++:(h+=n.chars[t].uchar,o=!1)
n.cueStartTime=e,e===s&&(s+=1e-4),l>=16?l--:l++
const i=hr(h.trim()),f=gr(e,s,i)
null!=t&&null!=(c=t.cues)&&c.getCueById(f)||(a=new d(e,s,i),a.id=f,a.line=u+1,a.align="left",a.position=10+Math.min(80,10*Math.floor(8*l/32)),r.push(a))}return t&&r.length&&(r.sort(((t,e)=>"auto"===t.line||"auto"===e.line?0:t.line>8&&e.line>8?e.line-t.line:t.line-e.line)),r.forEach((e=>te(t,e)))),r}},Vr=d(d({autoStartLoad:!0,startPosition:-1,defaultAudioCodec:void 0,debug:!1,capLevelOnFPSDrop:!1,capLevelToPlayerSize:!1,ignoreDevicePixelRatio:!1,initialLiveManifestSize:1,maxBufferLength:30,backBufferLength:1/0,maxBufferSize:6e7,maxBufferHole:.1,highBufferWatchdogPeriod:2,nudgeOffset:.1,nudgeMaxRetry:3,maxFragLookUpTolerance:.25,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,liveSyncDuration:void 0,liveMaxLatencyDuration:void 0,maxLiveSyncPlaybackRate:1,liveDurationInfinity:!1,liveBackBufferLength:null,maxMaxBufferLength:600,enableWorker:!0,workerPath:null,enableSoftwareAES:!0,startLevel:void 0,startFragPrefetch:!1,fpsDroppedMonitoringPeriod:5e3,fpsDroppedMonitoringThreshold:.2,appendErrorMaxRetry:3,loader:Nr,fLoader:void 0,pLoader:void 0,xhrSetup:void 0,licenseXhrSetup:void 0,licenseResponseCallback:void 0,abrController:class{constructor(t){this.hls=void 0,this.lastLevelLoadSec=0,this.lastLoadedFragLevel=0,this._nextAutoLevel=-1,this.timer=-1,this.onCheck=this._abandonRulesCheck.bind(this),this.fragCurrent=null,this.partCurrent=null,this.bitrateTestDelay=0,this.bwEstimator=void 0,this.hls=t
const e=t.config
this.bwEstimator=new Ii(e.abrEwmaSlowVoD,e.abrEwmaFastVoD,e.abrEwmaDefaultEstimate),this.registerListeners()}registerListeners(){const{hls:t}=this
t.on(g.FRAG_LOADING,this.onFragLoading,this),t.on(g.FRAG_LOADED,this.onFragLoaded,this),t.on(g.FRAG_BUFFERED,this.onFragBuffered,this),t.on(g.LEVEL_SWITCHING,this.onLevelSwitching,this),t.on(g.LEVEL_LOADED,this.onLevelLoaded,this)}unregisterListeners(){const{hls:t}=this
t.off(g.FRAG_LOADING,this.onFragLoading,this),t.off(g.FRAG_LOADED,this.onFragLoaded,this),t.off(g.FRAG_BUFFERED,this.onFragBuffered,this),t.off(g.LEVEL_SWITCHING,this.onLevelSwitching,this),t.off(g.LEVEL_LOADED,this.onLevelLoaded,this)}destroy(){this.unregisterListeners(),this.clearTimer(),this.hls=this.onCheck=null,this.fragCurrent=this.partCurrent=null}onFragLoading(t,e){var s
const i=e.frag
this.ignoreFragment(i)||(this.fragCurrent=i,this.partCurrent=null!=(s=e.part)?s:null,this.clearTimer(),this.timer=self.setInterval(this.onCheck,100))}onLevelSwitching(t,e){this.clearTimer()}getTimeToLoadFrag(t,e,s,i){return t+s/e+(i?this.lastLevelLoadSec:0)}onLevelLoaded(t,e){const s=this.hls.config,{total:i,bwEstimate:r}=e.stats
f(i)&&f(r)&&(this.lastLevelLoadSec=8*i/r),e.details.live?this.bwEstimator.update(s.abrEwmaSlowLive,s.abrEwmaFastLive):this.bwEstimator.update(s.abrEwmaSlowVoD,s.abrEwmaFastVoD)}_abandonRulesCheck(){const{fragCurrent:t,partCurrent:e,hls:s}=this,{autoLevelEnabled:i,media:r}=s
if(!t||!r)return
const n=performance.now(),a=e?e.stats:t.stats,o=e?e.duration:t.duration,l=n-a.loading.start
if(a.aborted||a.loaded&&a.loaded===a.total||0===t.level)return this.clearTimer(),void(this._nextAutoLevel=-1)
if(!i||r.paused||!r.playbackRate||!r.readyState)return
const h=s.mainForwardBufferInfo
if(null===h)return
const d=this.bwEstimator.getEstimateTTFB(),c=Math.abs(r.playbackRate)
if(l<=Math.max(d,o/(2*c)*1e3))return
const u=h.len/c
if(u>=2*o/c)return
const m=a.loading.first?a.loading.first-a.loading.start:-1,p=a.loaded&&m>-1,y=this.bwEstimator.getEstimate(),{levels:T,minAutoLevel:E}=s,S=T[t.level],L=a.total||Math.max(a.loaded,Math.round(o*S.maxBitrate/8))
let A=l-m
A<1&&p&&(A=Math.min(l,8*a.loaded/y))
const R=p?1e3*a.loaded/A:0,b=R?(L-a.loaded)/R:8*L/y+d/1e3
if(b<=u)return
const I=R?8*R:y
let D,k=Number.POSITIVE_INFINITY
for(D=t.level-1;D>E;D--){const t=T[D].maxBitrate
if(k=this.getTimeToLoadFrag(d/1e3,I,o*t,!T[D].details),k<u)break}k>=b||k>10*o||(s.nextLoadLevel=D,p?this.bwEstimator.sample(l-Math.min(d,m),a.loaded):this.bwEstimator.sampleTTFB(l),this.clearTimer(),v.warn(`[abr] Fragment ${t.sn}${e?" part "+e.index:""} of level ${t.level} is loading too slowly;\n      Time to underbuffer: ${u.toFixed(3)} s\n      Estimated load time for current fragment: ${b.toFixed(3)} s\n      Estimated load time for down switch fragment: ${k.toFixed(3)} s\n      TTFB estimate: ${m}\n      Current BW estimate: ${f(y)?(y/1024).toFixed(3):"Unknown"} Kb/s\n      New BW estimate: ${(this.bwEstimator.getEstimate()/1024).toFixed(3)} Kb/s\n      Aborting and switching to level ${D}`),t.loader&&(this.fragCurrent=this.partCurrent=null,t.abortRequests()),s.trigger(g.FRAG_LOAD_EMERGENCY_ABORTED,{frag:t,part:e,stats:a}))}onFragLoaded(t,{frag:e,part:s}){const i=s?s.stats:e.stats
if(e.type===Xt.MAIN&&this.bwEstimator.sampleTTFB(i.loading.first-i.loading.start),!this.ignoreFragment(e)){if(this.clearTimer(),this.lastLoadedFragLevel=e.level,this._nextAutoLevel=-1,this.hls.config.abrMaxWithRealBitrate){const t=s?s.duration:e.duration,r=this.hls.levels[e.level],n=(r.loaded?r.loaded.bytes:0)+i.loaded,a=(r.loaded?r.loaded.duration:0)+t
r.loaded={bytes:n,duration:a},r.realBitrate=Math.round(8*n/a)}if(e.bitrateTest){const t={stats:i,frag:e,part:s,id:e.type}
this.onFragBuffered(g.FRAG_BUFFERED,t),e.bitrateTest=!1}}}onFragBuffered(t,e){const{frag:s,part:i}=e,r=null!=i&&i.stats.loaded?i.stats:s.stats
if(r.aborted)return
if(this.ignoreFragment(s))return
const n=r.parsing.end-r.loading.start-Math.min(r.loading.first-r.loading.start,this.bwEstimator.getEstimateTTFB())
this.bwEstimator.sample(n,r.loaded),r.bwEstimate=this.bwEstimator.getEstimate(),s.bitrateTest?this.bitrateTestDelay=n/1e3:this.bitrateTestDelay=0}ignoreFragment(t){return t.type!==Xt.MAIN||"initSegment"===t.sn}clearTimer(){self.clearInterval(this.timer)}get nextAutoLevel(){const t=this._nextAutoLevel,e=this.bwEstimator
if(-1!==t&&!e.canEstimate())return t
let s=this.getNextABRAutoLevel()
if(-1!==t){const e=this.hls.levels
if(e.length>Math.max(t,s)&&e[t].loadError<=e[s].loadError)return t}return-1!==t&&(s=Math.min(t,s)),s}getNextABRAutoLevel(){const{fragCurrent:t,partCurrent:e,hls:s}=this,{maxAutoLevel:i,config:r,minAutoLevel:n,media:a}=s,o=e?e.duration:t?t.duration:0,l=a&&0!==a.playbackRate?Math.abs(a.playbackRate):1,h=this.bwEstimator?this.bwEstimator.getEstimate():r.abrEwmaDefaultEstimate,d=s.mainForwardBufferInfo,c=(d?d.len:0)/l
let u=this.findBestLevel(h,n,i,c,r.abrBandWidthFactor,r.abrBandWidthUpFactor)
if(u>=0)return u
v.trace(`[abr] ${c?"rebuffering expected":"buffer is empty"}, finding optimal quality level`)
let f=o?Math.min(o,r.maxStarvationDelay):r.maxStarvationDelay,g=r.abrBandWidthFactor,m=r.abrBandWidthUpFactor
if(!c){const t=this.bitrateTestDelay
t&&(f=(o?Math.min(o,r.maxLoadingDelay):r.maxLoadingDelay)-t,v.trace(`[abr] bitrate test took ${Math.round(1e3*t)}ms, set first fragment max fetchDuration to ${Math.round(1e3*f)} ms`),g=m=1)}return u=this.findBestLevel(h,n,i,c+f,g,m),Math.max(u,0)}findBestLevel(t,e,s,i,r,n){var a
const{fragCurrent:o,partCurrent:l,lastLoadedFragLevel:h}=this,{levels:d}=this.hls,c=d[h],u=!(null==c||null==(a=c.details)||!a.live),g=null==c?void 0:c.codecSet,m=l?l.duration:o?o.duration:0,p=this.bwEstimator.getEstimateTTFB()/1e3
let y=e,T=-1
for(let E=s;E>=e;E--){const e=d[E]
if(!e||g&&e.codecSet!==g){e&&(y=Math.min(E,y),T=Math.max(E,T))
continue}-1!==T&&v.trace(`[abr] Skipped level(s) ${y}-${T} with CODECS:"${d[T].attrs.CODECS}"; not compatible with "${c.attrs.CODECS}"`)
const s=e.details,a=(l?null==s?void 0:s.partTarget:null==s?void 0:s.averagetargetduration)||m
let o
o=E<=h?r*t:n*t
const S=d[E].maxBitrate,L=this.getTimeToLoadFrag(p,o,S*a,void 0===s)
if(v.trace(`[abr] level:${E} adjustedbw-bitrate:${Math.round(o-S)} avgDuration:${a.toFixed(1)} maxFetchDuration:${i.toFixed(1)} fetchDuration:${L.toFixed(1)}`),o>S&&(0===L||!f(L)||u&&!this.bitrateTestDelay||L<i))return E}return-1}set nextAutoLevel(t){this._nextAutoLevel=t}},bufferController:class{constructor(t){this.details=null,this._objectUrl=null,this.operationQueue=void 0,this.listeners=void 0,this.hls=void 0,this.bufferCodecEventsExpected=0,this._bufferCodecEventsTotal=0,this.media=null,this.mediaSource=null,this.lastMpegAudioChunk=null,this.appendError=0,this.tracks={},this.pendingTracks={},this.sourceBuffer=void 0,this._onMediaSourceOpen=()=>{const{media:t,mediaSource:e}=this
v.log("[buffer-controller]: Media source opened"),t&&(t.removeEventListener("emptied",this._onMediaEmptied),this.updateMediaElementDuration(),this.hls.trigger(g.MEDIA_ATTACHED,{media:t})),e&&e.removeEventListener("sourceopen",this._onMediaSourceOpen),this.checkPendingTracks()},this._onMediaSourceClose=()=>{v.log("[buffer-controller]: Media source closed")},this._onMediaSourceEnded=()=>{v.log("[buffer-controller]: Media source ended")},this._onMediaEmptied=()=>{const{media:t,_objectUrl:e}=this
t&&t.src!==e&&v.error(`Media element src was set while attaching MediaSource (${e} > ${t.src})`)},this.hls=t,this._initSourceBuffer(),this.registerListeners()}hasSourceTypes(){return this.getSourceBufferTypes().length>0||Object.keys(this.pendingTracks).length>0}destroy(){this.unregisterListeners(),this.details=null,this.lastMpegAudioChunk=null}registerListeners(){const{hls:t}=this
t.on(g.MEDIA_ATTACHING,this.onMediaAttaching,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(g.MANIFEST_PARSED,this.onManifestParsed,this),t.on(g.BUFFER_RESET,this.onBufferReset,this),t.on(g.BUFFER_APPENDING,this.onBufferAppending,this),t.on(g.BUFFER_CODECS,this.onBufferCodecs,this),t.on(g.BUFFER_EOS,this.onBufferEos,this),t.on(g.BUFFER_FLUSHING,this.onBufferFlushing,this),t.on(g.LEVEL_UPDATED,this.onLevelUpdated,this),t.on(g.FRAG_PARSED,this.onFragParsed,this),t.on(g.FRAG_CHANGED,this.onFragChanged,this)}unregisterListeners(){const{hls:t}=this
t.off(g.MEDIA_ATTACHING,this.onMediaAttaching,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(g.MANIFEST_PARSED,this.onManifestParsed,this),t.off(g.BUFFER_RESET,this.onBufferReset,this),t.off(g.BUFFER_APPENDING,this.onBufferAppending,this),t.off(g.BUFFER_CODECS,this.onBufferCodecs,this),t.off(g.BUFFER_EOS,this.onBufferEos,this),t.off(g.BUFFER_FLUSHING,this.onBufferFlushing,this),t.off(g.LEVEL_UPDATED,this.onLevelUpdated,this),t.off(g.FRAG_PARSED,this.onFragParsed,this),t.off(g.FRAG_CHANGED,this.onFragChanged,this)}_initSourceBuffer(){this.sourceBuffer={},this.operationQueue=new Pi(this.sourceBuffer),this.listeners={audio:[],video:[],audiovideo:[]},this.lastMpegAudioChunk=null}onManifestParsed(t,e){let s=2;(e.audio&&!e.video||!e.altAudio)&&(s=1),this.bufferCodecEventsExpected=this._bufferCodecEventsTotal=s,this.details=null,v.log(`${this.bufferCodecEventsExpected} bufferCodec event(s) expected`)}onMediaAttaching(t,e){const s=this.media=e.media
if(s&&xi){const t=this.mediaSource=new xi
t.addEventListener("sourceopen",this._onMediaSourceOpen),t.addEventListener("sourceended",this._onMediaSourceEnded),t.addEventListener("sourceclose",this._onMediaSourceClose),s.src=self.URL.createObjectURL(t),this._objectUrl=s.src,s.addEventListener("emptied",this._onMediaEmptied)}}onMediaDetaching(){const{media:t,mediaSource:e,_objectUrl:s}=this
if(e){if(v.log("[buffer-controller]: media source detaching"),"open"===e.readyState)try{e.endOfStream()}catch(t){v.warn(`[buffer-controller]: onMediaDetaching: ${t.message} while calling endOfStream`)}this.onBufferReset(),e.removeEventListener("sourceopen",this._onMediaSourceOpen),e.removeEventListener("sourceended",this._onMediaSourceEnded),e.removeEventListener("sourceclose",this._onMediaSourceClose),t&&(t.removeEventListener("emptied",this._onMediaEmptied),s&&self.URL.revokeObjectURL(s),t.src===s?(t.removeAttribute("src"),t.load()):v.warn("[buffer-controller]: media.src was changed by a third party - skip cleanup")),this.mediaSource=null,this.media=null,this._objectUrl=null,this.bufferCodecEventsExpected=this._bufferCodecEventsTotal,this.pendingTracks={},this.tracks={}}this.hls.trigger(g.MEDIA_DETACHED,void 0)}onBufferReset(){this.getSourceBufferTypes().forEach((t=>{const e=this.sourceBuffer[t]
try{e&&(this.removeBufferListeners(t),this.mediaSource&&this.mediaSource.removeSourceBuffer(e),this.sourceBuffer[t]=void 0)}catch(e){v.warn(`[buffer-controller]: Failed to reset the ${t} buffer`,e)}})),this._initSourceBuffer()}onBufferCodecs(t,e){const s=this.getSourceBufferTypes().length
Object.keys(e).forEach((t=>{if(s){const s=this.tracks[t]
if(s&&"function"==typeof s.buffer.changeType){const{id:i,codec:r,levelCodec:n,container:a,metadata:o}=e[t],l=(s.levelCodec||s.codec).replace(Fi,"$1"),h=(n||r).replace(Fi,"$1")
if(l!==h){const e=`${a};codecs=${n||r}`
this.appendChangeType(t,e),v.log(`[buffer-controller]: switching codec ${l} to ${h}`),this.tracks[t]={buffer:s.buffer,codec:r,container:a,levelCodec:n,metadata:o,id:i}}}}else this.pendingTracks[t]=e[t]})),s||(this.bufferCodecEventsExpected=Math.max(this.bufferCodecEventsExpected-1,0),this.mediaSource&&"open"===this.mediaSource.readyState&&this.checkPendingTracks())}appendChangeType(t,e){const{operationQueue:s}=this,i={execute:()=>{const i=this.sourceBuffer[t]
i&&(v.log(`[buffer-controller]: changing ${t} sourceBuffer type to ${e}`),i.changeType(e)),s.shiftAndExecuteNext(t)},onStart:()=>{},onComplete:()=>{},onError:e=>{v.warn(`[buffer-controller]: Failed to change ${t} SourceBuffer type`,e)}}
s.append(i,t)}onBufferAppending(t,e){const{hls:s,operationQueue:i,tracks:r}=this,{data:n,type:a,frag:o,part:l,chunkMeta:h}=e,d=h.buffering[a],c=self.performance.now()
d.start=c
const u=o.stats.buffering,f=l?l.stats.buffering:null
0===u.start&&(u.start=c),f&&0===f.start&&(f.start=c)
const y=r.audio
let T=!1
"audio"===a&&"audio/mpeg"===(null==y?void 0:y.container)&&(T=!this.lastMpegAudioChunk||1===h.id||this.lastMpegAudioChunk.sn!==h.sn,this.lastMpegAudioChunk=h)
const E=o.start,S={execute:()=>{if(d.executeStart=self.performance.now(),T){const t=this.sourceBuffer[a]
if(t){const e=E-t.timestampOffset
Math.abs(e)>=.1&&(v.log(`[buffer-controller]: Updating audio SourceBuffer timestampOffset to ${E} (delta: ${e}) sn: ${o.sn})`),t.timestampOffset=E)}}this.appendExecutor(n,a)},onStart:()=>{},onComplete:()=>{const t=self.performance.now()
d.executeEnd=d.end=t,0===u.first&&(u.first=t),f&&0===f.first&&(f.first=t)
const{sourceBuffer:e}=this,s={}
for(const i in e)s[i]=Xe.getBuffered(e[i])
this.appendError=0,this.hls.trigger(g.BUFFER_APPENDED,{type:a,frag:o,part:l,chunkMeta:h,parent:o.type,timeRanges:s})},onError:t=>{v.error(`[buffer-controller]: Error encountered while trying to append to the ${a} SourceBuffer`,t)
const e={type:m.MEDIA_ERROR,parent:o.type,details:p.BUFFER_APPEND_ERROR,frag:o,part:l,chunkMeta:h,error:t,err:t,fatal:!1}
t.code===DOMException.QUOTA_EXCEEDED_ERR?e.details=p.BUFFER_FULL_ERROR:(this.appendError++,e.details=p.BUFFER_APPEND_ERROR,this.appendError>s.config.appendErrorMaxRetry&&(v.error(`[buffer-controller]: Failed ${s.config.appendErrorMaxRetry} times to append segment in sourceBuffer`),e.fatal=!0)),s.trigger(g.ERROR,e)}}
i.append(S,a)}onBufferFlushing(t,e){const{operationQueue:s}=this,i=t=>({execute:this.removeExecutor.bind(this,t,e.startOffset,e.endOffset),onStart:()=>{},onComplete:()=>{this.hls.trigger(g.BUFFER_FLUSHED,{type:t})},onError:e=>{v.warn(`[buffer-controller]: Failed to remove from ${t} SourceBuffer`,e)}})
e.type?s.append(i(e.type),e.type):this.getSourceBufferTypes().forEach((t=>{s.append(i(t),t)}))}onFragParsed(t,e){const{frag:s,part:i}=e,r=[],n=i?i.elementaryStreams:s.elementaryStreams
n[D.AUDIOVIDEO]?r.push("audiovideo"):(n[D.AUDIO]&&r.push("audio"),n[D.VIDEO]&&r.push("video")),0===r.length&&v.warn(`Fragments must have at least one ElementaryStreamType set. type: ${s.type} level: ${s.level} sn: ${s.sn}`),this.blockBuffers((()=>{const t=self.performance.now()
s.stats.buffering.end=t,i&&(i.stats.buffering.end=t)
const e=i?i.stats:s.stats
this.hls.trigger(g.FRAG_BUFFERED,{frag:s,part:i,stats:e,id:s.type})}),r)}onFragChanged(t,e){this.flushBackBuffer()}onBufferEos(t,e){this.getSourceBufferTypes().reduce(((t,s)=>{const i=this.sourceBuffer[s]
return!i||e.type&&e.type!==s||(i.ending=!0,i.ended||(i.ended=!0,v.log(`[buffer-controller]: ${s} sourceBuffer now EOS`))),t&&!(i&&!i.ended)}),!0)&&(v.log("[buffer-controller]: Queueing mediaSource.endOfStream()"),this.blockBuffers((()=>{this.getSourceBufferTypes().forEach((t=>{const e=this.sourceBuffer[t]
e&&(e.ending=!1)}))
const{mediaSource:t}=this
t&&"open"===t.readyState?(v.log("[buffer-controller]: Calling mediaSource.endOfStream()"),t.endOfStream()):t&&v.info(`[buffer-controller]: Could not call mediaSource.endOfStream(). mediaSource.readyState: ${t.readyState}`)})))}onLevelUpdated(t,{details:e}){e.fragments.length&&(this.details=e,this.getSourceBufferTypes().length?this.blockBuffers(this.updateMediaElementDuration.bind(this)):this.updateMediaElementDuration())}flushBackBuffer(){const{hls:t,details:e,media:s,sourceBuffer:i}=this
if(!s||null===e)return
const r=this.getSourceBufferTypes()
if(!r.length)return
const n=e.live&&null!==t.config.liveBackBufferLength?t.config.liveBackBufferLength:t.config.backBufferLength
if(!f(n)||n<0)return
const a=s.currentTime,o=e.levelTargetDuration,l=Math.max(n,o),h=Math.floor(a/o)*o-l
r.forEach((s=>{const r=i[s]
if(r){const i=Xe.getBuffered(r)
if(i.length>0&&h>i.start(0)){if(t.trigger(g.BACK_BUFFER_REACHED,{bufferEnd:h}),e.live)t.trigger(g.LIVE_BACK_BUFFER_REACHED,{bufferEnd:h})
else if(r.ended&&i.end(i.length-1)-a<2*o)return void v.info(`[buffer-controller]: Cannot flush ${s} back buffer while SourceBuffer is in ended state`)
t.trigger(g.BUFFER_FLUSHING,{startOffset:0,endOffset:h,type:s})}}}))}updateMediaElementDuration(){if(!this.details||!this.media||!this.mediaSource||"open"!==this.mediaSource.readyState)return
const{details:t,hls:e,media:s,mediaSource:i}=this,r=t.fragments[0].start+t.totalduration,n=s.duration,a=f(i.duration)?i.duration:0
t.live&&e.config.liveDurationInfinity?(v.log("[buffer-controller]: Media Source duration is set to Infinity"),i.duration=1/0,this.updateSeekableRange(t)):(r>a&&r>n||!f(n))&&(v.log(`[buffer-controller]: Updating Media Source duration to ${r.toFixed(3)}`),i.duration=r)}updateSeekableRange(t){const e=this.mediaSource,s=t.fragments
if(s.length&&t.live&&null!=e&&e.setLiveSeekableRange){const i=Math.max(0,s[0].start),r=Math.max(i,i+t.totalduration)
e.setLiveSeekableRange(i,r)}}checkPendingTracks(){const{bufferCodecEventsExpected:t,operationQueue:e,pendingTracks:s}=this,i=Object.keys(s).length
if(i&&!t||2===i){this.createSourceBuffers(s),this.pendingTracks={}
const t=this.getSourceBufferTypes()
if(t.length)this.hls.trigger(g.BUFFER_CREATED,{tracks:this.tracks}),t.forEach((t=>{e.executeNext(t)}))
else{const t=new Error("could not create source buffer for media codec(s)")
this.hls.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.BUFFER_INCOMPATIBLE_CODECS_ERROR,fatal:!0,error:t,reason:t.message})}}}createSourceBuffers(t){const{sourceBuffer:e,mediaSource:s}=this
if(!s)throw Error("createSourceBuffers called when mediaSource was null")
for(const i in t)if(!e[i]){const r=t[i]
if(!r)throw Error(`source buffer exists for track ${i}, however track does not`)
const n=r.levelCodec||r.codec,a=`${r.container};codecs=${n}`
v.log(`[buffer-controller]: creating sourceBuffer(${a})`)
try{const t=e[i]=s.addSourceBuffer(a),o=i
this.addBufferListener(o,"updatestart",this._onSBUpdateStart),this.addBufferListener(o,"updateend",this._onSBUpdateEnd),this.addBufferListener(o,"error",this._onSBUpdateError),this.tracks[i]={buffer:t,codec:n,container:r.container,levelCodec:r.levelCodec,metadata:r.metadata,id:r.id}}catch(t){v.error(`[buffer-controller]: error while trying to add sourceBuffer: ${t.message}`),this.hls.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.BUFFER_ADD_CODEC_ERROR,fatal:!1,error:t,mimeType:a})}}}_onSBUpdateStart(t){const{operationQueue:e}=this
e.current(t).onStart()}_onSBUpdateEnd(t){const{operationQueue:e}=this
e.current(t).onComplete(),e.shiftAndExecuteNext(t)}_onSBUpdateError(t,e){const s=new Error(`${t} SourceBuffer error`)
v.error(`[buffer-controller]: ${s}`,e),this.hls.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.BUFFER_APPENDING_ERROR,error:s,fatal:!1})
const i=this.operationQueue.current(t)
i&&i.onError(e)}removeExecutor(t,e,s){const{media:i,mediaSource:r,operationQueue:n,sourceBuffer:a}=this,o=a[t]
if(!i||!r||!o)return v.warn(`[buffer-controller]: Attempting to remove from the ${t} SourceBuffer, but it does not exist`),void n.shiftAndExecuteNext(t)
const l=f(i.duration)?i.duration:1/0,h=f(r.duration)?r.duration:1/0,d=Math.max(0,e),c=Math.min(s,l,h)
c>d&&!o.ending?(o.ended=!1,v.log(`[buffer-controller]: Removing [${d},${c}] from the ${t} SourceBuffer`),o.remove(d,c)):n.shiftAndExecuteNext(t)}appendExecutor(t,e){const{operationQueue:s,sourceBuffer:i}=this,r=i[e]
if(!r)return v.warn(`[buffer-controller]: Attempting to append to the ${e} SourceBuffer, but it does not exist`),void s.shiftAndExecuteNext(e)
r.ended=!1,r.appendBuffer(t)}blockBuffers(t,e=this.getSourceBufferTypes()){if(!e.length)return v.log("[buffer-controller]: Blocking operation requested, but no SourceBuffers exist"),void Promise.resolve().then(t)
const{operationQueue:s}=this,i=e.map((t=>s.appendBlocker(t)))
Promise.all(i).then((()=>{t(),e.forEach((t=>{const e=this.sourceBuffer[t]
null!=e&&e.updating||s.shiftAndExecuteNext(t)}))}))}getSourceBufferTypes(){return Object.keys(this.sourceBuffer)}addBufferListener(t,e,s){const i=this.sourceBuffer[t]
if(!i)return
const r=s.bind(this,t)
this.listeners[t].push({event:e,listener:r}),i.addEventListener(e,r)}removeBufferListeners(t){const e=this.sourceBuffer[t]
e&&this.listeners[t].forEach((t=>{e.removeEventListener(t.event,t.listener)}))}},capLevelController:Dr,errorController:class{constructor(t){this.hls=void 0,this.playlistError=0,this.penalizedRenditions={},this.log=void 0,this.warn=void 0,this.error=void 0,this.hls=t,this.log=v.log.bind(v,"[info]:"),this.warn=v.warn.bind(v,"[warning]:"),this.error=v.error.bind(v,"[error]:"),this.registerListeners()}registerListeners(){const t=this.hls
t.on(g.ERROR,this.onError,this),t.on(g.MANIFEST_LOADING,this.onManifestLoading,this)}unregisterListeners(){const t=this.hls
t&&(t.off(g.ERROR,this.onError,this),t.off(g.ERROR,this.onErrorOut,this),t.off(g.MANIFEST_LOADING,this.onManifestLoading,this))}destroy(){this.unregisterListeners(),this.hls=null,this.penalizedRenditions={}}startLoad(t){this.playlistError=0}stopLoad(){}getVariantLevelIndex(t){return(null==t?void 0:t.type)===Xt.MAIN?t.level:this.hls.loadLevel}onManifestLoading(){this.playlistError=0,this.penalizedRenditions={}}onError(t,e){var s
if(e.fatal)return
const i=this.hls,r=e.context
switch(e.details){case p.FRAG_LOAD_ERROR:case p.FRAG_LOAD_TIMEOUT:case p.KEY_LOAD_ERROR:case p.KEY_LOAD_TIMEOUT:return void(e.errorAction=this.getFragRetryOrSwitchAction(e))
case p.FRAG_GAP:case p.FRAG_PARSING_ERROR:case p.FRAG_DECRYPT_ERROR:return e.errorAction=this.getFragRetryOrSwitchAction(e),void(e.errorAction.action=2)
case p.LEVEL_EMPTY_ERROR:case p.LEVEL_PARSING_ERROR:{var n,a
const t=e.parent===Xt.MAIN?e.level:i.loadLevel
e.details===p.LEVEL_EMPTY_ERROR&&null!=(n=e.context)&&null!=(a=n.levelDetails)&&a.live?e.errorAction=this.getPlaylistRetryOrSwitchAction(e,t):(e.levelRetry=!1,e.errorAction=this.getLevelSwitchAction(e,t))}return
case p.LEVEL_LOAD_ERROR:case p.LEVEL_LOAD_TIMEOUT:return void("number"==typeof(null==r?void 0:r.level)&&(e.errorAction=this.getPlaylistRetryOrSwitchAction(e,r.level)))
case p.AUDIO_TRACK_LOAD_ERROR:case p.AUDIO_TRACK_LOAD_TIMEOUT:case p.SUBTITLE_LOAD_ERROR:case p.SUBTITLE_TRACK_LOAD_TIMEOUT:if(r){const t=i.levels[i.loadLevel]
if(t&&(r.type===jt.AUDIO_TRACK&&r.groupId===t.audioGroupId||r.type===jt.SUBTITLE_TRACK&&r.groupId===t.textGroupId))return e.errorAction=this.getPlaylistRetryOrSwitchAction(e,i.loadLevel),e.errorAction.action=2,void(e.errorAction.flags=1)}return
case p.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:{const t=i.levels[i.loadLevel],s=null==t?void 0:t.attrs["HDCP-LEVEL"]
s&&(e.errorAction={action:2,flags:2,hdcpLevel:s})}return
case p.BUFFER_ADD_CODEC_ERROR:case p.REMUX_ALLOC_ERROR:return void(e.errorAction=this.getLevelSwitchAction(e,null!=(s=e.level)?s:i.loadLevel))
case p.INTERNAL_EXCEPTION:case p.BUFFER_APPENDING_ERROR:case p.BUFFER_APPEND_ERROR:case p.BUFFER_FULL_ERROR:case p.LEVEL_SWITCH_ERROR:case p.BUFFER_STALLED_ERROR:case p.BUFFER_SEEK_OVER_HOLE:case p.BUFFER_NUDGE_ON_STALL:return void(e.errorAction={action:0,flags:0})}if(e.type===m.KEY_SYSTEM_ERROR){const t=this.getVariantLevelIndex(e.frag)
return e.levelRetry=!1,void(e.errorAction=this.getLevelSwitchAction(e,t))}}getPlaylistRetryOrSwitchAction(t,e){var s,i
const r=ve(this.hls.config.playlistLoadPolicy,t),n=this.playlistError++,a=null==(s=t.response)?void 0:s.code
return Ae(r,n,Ee(t),a)?{action:5,flags:0,retryConfig:r,retryCount:n}:null!=(i=t.context)&&i.deliveryDirectives?{action:0,flags:0,retryConfig:r||{maxNumRetry:0,retryDelayMs:0,maxRetryDelayMs:0},retryCount:n}:this.getLevelSwitchAction(t,e)}getFragRetryOrSwitchAction(t){const e=this.hls,s=this.getVariantLevelIndex(t.frag),i=e.levels[s],{fragLoadPolicy:r,keyLoadPolicy:n}=e.config,a=ve(t.details.startsWith("key")?n:r,t),o=e.levels.reduce(((t,e)=>t+e.fragmentError),0)
if(i){var l
t.details!==p.FRAG_GAP&&i.fragmentError++
const e=null==(l=t.response)?void 0:l.code
if(Ae(a,o,Ee(t),e))return{action:5,flags:0,retryConfig:a,retryCount:o}}const h=this.getLevelSwitchAction(t,s)
return a&&(h.retryConfig=a,h.retryCount=o),h}getLevelSwitchAction(t,e){const s=this.hls
null==e&&(e=s.loadLevel)
const i=this.hls.levels[e]
if(i&&(i.loadError++,s.autoLevelEnabled)){var r,n
let e=-1
const a=s.levels,o=null==(r=t.frag)?void 0:r.type,{type:l,groupId:h}=null!=(n=t.context)?n:{}
for(let r=a.length;r--;){const n=(r+s.loadLevel)%a.length
if(n!==s.loadLevel&&0===a[n].loadError){const s=a[n]
if(t.details===p.FRAG_GAP&&t.frag){const e=a[n].details
if(e){const s=be(t.frag,e.fragments,t.frag.start)
if(null!=s&&s.gap)continue}}else{if(l===jt.AUDIO_TRACK&&h===s.audioGroupId||l===jt.SUBTITLE_TRACK&&h===s.textGroupId)continue
if(o===Xt.AUDIO&&i.audioGroupId===s.audioGroupId||o===Xt.SUBTITLE&&i.textGroupId===s.textGroupId)continue}e=n
break}}if(e>-1&&s.loadLevel!==e)return t.levelRetry=!0,{action:2,flags:0,nextAutoLevel:e}}return{action:2,flags:1}}onErrorOut(t,e){var s
switch(null==(s=e.errorAction)?void 0:s.action){case 0:break
case 2:this.sendAlternateToPenaltyBox(e),e.errorAction.resolved||e.details===p.FRAG_GAP||(e.fatal=!0)}e.fatal&&this.hls.stopLoad()}sendAlternateToPenaltyBox(t){const e=this.hls,s=t.errorAction
if(!s)return
const{flags:i,hdcpLevel:r,nextAutoLevel:n}=s
switch(i){case 0:this.switchLevel(t,n)
break
case 1:s.resolved||(s.resolved=this.redundantFailover(t))
break
case 2:r&&(e.maxHdcpLevel=de[de.indexOf(r)-1],s.resolved=!0),this.warn(`Restricting playback to HDCP-LEVEL of "${e.maxHdcpLevel}" or lower`)}s.resolved||this.switchLevel(t,n)}switchLevel(t,e){void 0!==e&&t.errorAction&&(this.warn(`switching to level ${e} after ${t.details}`),this.hls.nextAutoLevel=e,t.errorAction.resolved=!0,this.hls.nextLoadLevel=this.hls.nextAutoLevel)}redundantFailover(t){const{hls:e,penalizedRenditions:s}=this,i=t.parent===Xt.MAIN?t.level:e.loadLevel,r=e.levels[i],n=r.url.length,a=t.frag?t.frag.urlId:r.urlId
r.urlId!==a||t.frag&&!r.details||this.penalizeRendition(r,t)
for(let o=1;o<n;o++){const l=(a+o)%n,h=s[l]
if(!h||ke(h,t,s[a]))return this.warn(`Switching to Redundant Stream ${l+1}/${n}: "${r.url[l]}" after ${t.details}`),this.playlistError=0,e.levels.forEach((t=>{t.urlId=l})),e.nextLoadLevel=i,!0}return!1}penalizeRendition(t,e){const{penalizedRenditions:s}=this,i=s[t.urlId]||{lastErrorPerfMs:0,errors:[],details:void 0}
i.lastErrorPerfMs=performance.now(),i.errors.push(e),i.details=t.details,s[t.urlId]=i}},fpsController:class{constructor(t){this.hls=void 0,this.isVideoPlaybackQualityAvailable=!1,this.timer=void 0,this.media=null,this.lastTime=void 0,this.lastDroppedFrames=0,this.lastDecodedFrames=0,this.streamController=void 0,this.hls=t,this.registerListeners()}setStreamController(t){this.streamController=t}registerListeners(){this.hls.on(g.MEDIA_ATTACHING,this.onMediaAttaching,this)}unregisterListeners(){this.hls.off(g.MEDIA_ATTACHING,this.onMediaAttaching,this)}destroy(){this.timer&&clearInterval(this.timer),this.unregisterListeners(),this.isVideoPlaybackQualityAvailable=!1,this.media=null}onMediaAttaching(t,e){const s=this.hls.config
if(s.capLevelOnFPSDrop){const t=e.media instanceof self.HTMLVideoElement?e.media:null
this.media=t,t&&"function"==typeof t.getVideoPlaybackQuality&&(this.isVideoPlaybackQualityAvailable=!0),self.clearInterval(this.timer),this.timer=self.setInterval(this.checkFPSInterval.bind(this),s.fpsDroppedMonitoringPeriod)}}checkFPS(t,e,s){const i=performance.now()
if(e){if(this.lastTime){const t=i-this.lastTime,r=s-this.lastDroppedFrames,n=e-this.lastDecodedFrames,a=1e3*r/t,o=this.hls
if(o.trigger(g.FPS_DROP,{currentDropped:r,currentDecoded:n,totalDroppedFrames:s}),a>0&&r>o.config.fpsDroppedMonitoringThreshold*n){let t=o.currentLevel
v.warn("drop FPS ratio greater than max allowed value for currentLevel: "+t),t>0&&(-1===o.autoLevelCapping||o.autoLevelCapping>=t)&&(t-=1,o.trigger(g.FPS_DROP_LEVEL_CAPPING,{level:t,droppedLevel:o.currentLevel}),o.autoLevelCapping=t,this.streamController.nextLevelSwitch())}}this.lastTime=i,this.lastDroppedFrames=s,this.lastDecodedFrames=e}}checkFPSInterval(){const t=this.media
if(t)if(this.isVideoPlaybackQualityAvailable){const e=t.getVideoPlaybackQuality()
this.checkFPS(t,e.totalVideoFrames,e.droppedVideoFrames)}else this.checkFPS(t,t.webkitDecodedFrameCount,t.webkitDroppedFrameCount)}},stretchShortVideoTrack:!1,maxAudioFramesDrift:1,forceKeyFrameOnDiscontinuity:!0,abrEwmaFastLive:3,abrEwmaSlowLive:9,abrEwmaFastVoD:3,abrEwmaSlowVoD:9,abrEwmaDefaultEstimate:5e5,abrBandWidthFactor:.95,abrBandWidthUpFactor:.7,abrMaxWithRealBitrate:!1,maxStarvationDelay:4,maxLoadingDelay:4,minAutoBitrate:0,emeEnabled:!1,widevineLicenseUrl:void 0,drmSystems:{},drmSystemOptions:{},requestMediaKeySystemAccessFunc:H,testBandwidth:!0,progressive:!1,lowLatencyMode:!0,cmcd:void 0,enableDateRangeMetadataCues:!0,enableEmsgMetadataCues:!0,enableID3MetadataCues:!0,certLoadPolicy:{default:{maxTimeToFirstByteMs:8e3,maxLoadTimeMs:2e4,timeoutRetry:null,errorRetry:null}},keyLoadPolicy:{default:{maxTimeToFirstByteMs:8e3,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:2e4,backoff:"linear"},errorRetry:{maxNumRetry:8,retryDelayMs:1e3,maxRetryDelayMs:2e4,backoff:"linear"}}},manifestLoadPolicy:{default:{maxTimeToFirstByteMs:1/0,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},playlistLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:2,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},fragLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:12e4,timeoutRetry:{maxNumRetry:4,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:6,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},steeringManifestLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,manifestLoadingMaxRetryTimeout:64e3,levelLoadingTimeOut:1e4,levelLoadingMaxRetry:4,levelLoadingRetryDelay:1e3,levelLoadingMaxRetryTimeout:64e3,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:6,fragLoadingRetryDelay:1e3,fragLoadingMaxRetryTimeout:64e3},{cueHandler:Hr,enableWebVTT:!0,enableIMSC1:!0,enableCEA708Captions:!0,captionsTextTrack1Label:"English",captionsTextTrack1LanguageCode:"en",captionsTextTrack2Label:"Spanish",captionsTextTrack2LanguageCode:"es",captionsTextTrack3Label:"Unknown CC",captionsTextTrack3LanguageCode:"",captionsTextTrack4Label:"Unknown CC",captionsTextTrack4LanguageCode:"",renderTextTracksNatively:!0}),{},{subtitleStreamController:class extends ys{constructor(t,e,s){super(t,e,s,"[subtitle-stream-controller]",Xt.SUBTITLE),this.levels=[],this.currentTrackId=-1,this.tracksBuffered=[],this.mainDetails=null,this._registerListeners()}onHandlerDestroying(){this._unregisterListeners(),this.mainDetails=null}_registerListeners(){const{hls:t}=this
t.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.LEVEL_LOADED,this.onLevelLoaded,this),t.on(g.ERROR,this.onError,this),t.on(g.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.on(g.SUBTITLE_TRACK_SWITCH,this.onSubtitleTrackSwitch,this),t.on(g.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.on(g.SUBTITLE_FRAG_PROCESSED,this.onSubtitleFragProcessed,this),t.on(g.BUFFER_FLUSHING,this.onBufferFlushing,this),t.on(g.FRAG_BUFFERED,this.onFragBuffered,this)}_unregisterListeners(){const{hls:t}=this
t.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.LEVEL_LOADED,this.onLevelLoaded,this),t.off(g.ERROR,this.onError,this),t.off(g.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.off(g.SUBTITLE_TRACK_SWITCH,this.onSubtitleTrackSwitch,this),t.off(g.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.off(g.SUBTITLE_FRAG_PROCESSED,this.onSubtitleFragProcessed,this),t.off(g.BUFFER_FLUSHING,this.onBufferFlushing,this),t.off(g.FRAG_BUFFERED,this.onFragBuffered,this)}startLoad(t){this.stopLoad(),this.state=as,this.setInterval(500),this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}onManifestLoading(){this.mainDetails=null,this.fragmentTracker.removeAllFragments()}onMediaDetaching(){this.tracksBuffered=[],super.onMediaDetaching()}onLevelLoaded(t,e){this.mainDetails=e.details}onSubtitleFragProcessed(t,e){const{frag:s,success:i}=e
if(this.fragPrevious=s,this.state=as,!i)return
const r=this.tracksBuffered[this.currentTrackId]
if(!r)return
let n
const a=s.start
for(let l=0;l<r.length;l++)if(a>=r[l].start&&a<=r[l].end){n=r[l]
break}const o=s.start+s.duration
n?n.end=o:(n={start:a,end:o},r.push(n)),this.fragmentTracker.fragBuffered(s)}onBufferFlushing(t,e){const{startOffset:s,endOffset:i}=e
if(0===s&&i!==Number.POSITIVE_INFINITY){const{currentTrackId:t,levels:r}=this
if(!r.length||!r[t]||!r[t].details)return
const n=i-r[t].details.targetduration
if(n<=0)return
e.endOffsetSubtitles=Math.max(0,n),this.tracksBuffered.forEach((t=>{for(let e=0;e<t.length;)if(t[e].end<=n)t.shift()
else{if(!(t[e].start<n))break
t[e].start=n,e++}})),this.fragmentTracker.removeFragmentsInRange(s,n,Xt.SUBTITLE)}}onFragBuffered(t,e){var s
this.loadedmetadata||e.frag.type!==Xt.MAIN||null!=(s=this.media)&&s.buffered.length&&(this.loadedmetadata=!0)}onError(t,e){const s=e.frag;(null==s?void 0:s.type)===Xt.SUBTITLE&&(this.fragCurrent&&this.fragCurrent.abortRequests(),this.state!==ns&&(this.state=as))}onSubtitleTracksUpdated(t,{subtitleTracks:e}){ki(this.levels,e)?this.levels=e.map((t=>new ue(t))):(this.tracksBuffered=[],this.levels=e.map((t=>{const e=new ue(t)
return this.tracksBuffered[e.id]=[],e})),this.fragmentTracker.removeFragmentsInRange(0,Number.POSITIVE_INFINITY,Xt.SUBTITLE),this.fragPrevious=null,this.mediaBuffer=null)}onSubtitleTrackSwitch(t,e){if(this.currentTrackId=e.id,!this.levels.length||-1===this.currentTrackId)return void this.clearInterval()
const s=this.levels[this.currentTrackId]
null!=s&&s.details?this.mediaBuffer=this.mediaBufferTimeRanges:this.mediaBuffer=null,s&&this.setInterval(500)}onSubtitleTrackLoaded(t,e){var s
const{details:i,id:r}=e,{currentTrackId:n,levels:a}=this
if(!a.length)return
const o=a[n]
if(r>=a.length||r!==n||!o)return
this.mediaBuffer=this.mediaBufferTimeRanges
let l=0
if(i.live||null!=(s=o.details)&&s.live){const t=this.mainDetails
if(i.deltaUpdateFailed||!t)return
const e=t.fragments[0]
o.details?(l=this.alignPlaylists(i,o.details),0===l&&e&&(l=e.start,pe(i,l))):i.hasProgramDateTime&&t.hasProgramDateTime?(ts(i,t),l=i.fragments[0].start):e&&(l=e.start,pe(i,l))}o.details=i,this.levelLastLoaded=r,this.startFragRequested||!this.mainDetails&&i.live||this.setStartPosition(o.details,l),this.tick(),i.live&&!this.fragCurrent&&this.media&&this.state===as&&(be(null,i.fragments,this.media.currentTime,0)||(this.warn("Subtitle playlist not aligned with playback"),o.details=void 0))}_handleFragmentLoadComplete(t){const{frag:e,payload:s}=t,i=e.decryptdata,r=this.hls
if(!this.fragContextChanged(e)&&s&&s.byteLength>0&&i&&i.key&&i.iv&&"AES-128"===i.method){const t=performance.now()
this.decrypter.decrypt(new Uint8Array(s),i.key.buffer,i.iv.buffer).catch((t=>{throw r.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.FRAG_DECRYPT_ERROR,fatal:!1,error:t,reason:t.message,frag:e}),t})).then((s=>{const i=performance.now()
r.trigger(g.FRAG_DECRYPTED,{frag:e,payload:s,stats:{tstart:t,tdecrypt:i}})})).catch((t=>{this.warn(`${t.name}: ${t.message}`),this.state=as}))}}doTick(){if(this.media){if(this.state===as){const{currentTrackId:t,levels:e}=this,s=e[t]
if(!e.length||!s||!s.details)return
const i=s.details,r=i.targetduration,{config:n}=this,a=this.getLoadPosition(),o=Xe.bufferedInfo(this.tracksBuffered[this.currentTrackId]||[],a-r,n.maxBufferHole),{end:l,len:h}=o,d=this.getFwdBufferInfo(this.media,Xt.MAIN)
if(h>this.getMaxBufferLength(null==d?void 0:d.len)+r)return
const c=i.fragments,u=c.length,f=i.edge
let g=null
const m=this.fragPrevious
if(l<f){const{maxFragLookUpTolerance:t}=n
g=be(m,c,Math.max(c[0].start,l),t),!g&&m&&m.start<c[0].start&&(g=c[0])}else g=c[u-1]
if(!g)return
g=this.mapToInitFragWhenRequired(g),this.fragmentTracker.getState(g)===Fe&&this.loadFragment(g,s,l)}}else this.state=as}getMaxBufferLength(t){const e=super.getMaxBufferLength()
return t?Math.max(e,t):e}loadFragment(t,e,s){this.fragCurrent=t,"initSegment"===t.sn?this._loadInitSegment(t,e):(this.startFragRequested=!0,super.loadFragment(t,e,s))}get mediaBufferTimeRanges(){return new Ci(this.tracksBuffered[this.currentTrackId]||[])}},subtitleTrackController:class extends we{constructor(t){super(t,"[subtitle-track-controller]"),this.media=null,this.tracks=[],this.groupId=null,this.tracksInGroup=[],this.trackId=-1,this.selectDefaultTrack=!0,this.queuedDefaultTrack=-1,this.trackChangeListener=()=>this.onTextTracksChanged(),this.asyncPollTrackChange=()=>this.pollTrackChange(0),this.useTextTrackPolling=!1,this.subtitlePollingInterval=-1,this._subtitleDisplay=!0,this.registerListeners()}destroy(){this.unregisterListeners(),this.tracks.length=0,this.tracksInGroup.length=0,this.trackChangeListener=this.asyncPollTrackChange=null,super.destroy()}get subtitleDisplay(){return this._subtitleDisplay}set subtitleDisplay(t){this._subtitleDisplay=t,this.trackId>-1&&this.toggleTrackModes(this.trackId)}registerListeners(){const{hls:t}=this
t.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.MANIFEST_PARSED,this.onManifestParsed,this),t.on(g.LEVEL_LOADING,this.onLevelLoading,this),t.on(g.LEVEL_SWITCHING,this.onLevelSwitching,this),t.on(g.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.on(g.ERROR,this.onError,this)}unregisterListeners(){const{hls:t}=this
t.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.MANIFEST_PARSED,this.onManifestParsed,this),t.off(g.LEVEL_LOADING,this.onLevelLoading,this),t.off(g.LEVEL_SWITCHING,this.onLevelSwitching,this),t.off(g.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.off(g.ERROR,this.onError,this)}onMediaAttached(t,e){this.media=e.media,this.media&&(this.queuedDefaultTrack>-1&&(this.subtitleTrack=this.queuedDefaultTrack,this.queuedDefaultTrack=-1),this.useTextTrackPolling=!(this.media.textTracks&&"onchange"in this.media.textTracks),this.useTextTrackPolling?this.pollTrackChange(500):this.media.textTracks.addEventListener("change",this.asyncPollTrackChange))}pollTrackChange(t){self.clearInterval(this.subtitlePollingInterval),this.subtitlePollingInterval=self.setInterval(this.trackChangeListener,t)}onMediaDetaching(){this.media&&(self.clearInterval(this.subtitlePollingInterval),this.useTextTrackPolling||this.media.textTracks.removeEventListener("change",this.asyncPollTrackChange),this.trackId>-1&&(this.queuedDefaultTrack=this.trackId),_i(this.media.textTracks).forEach((t=>{ee(t)})),this.subtitleTrack=-1,this.media=null)}onManifestLoading(){this.tracks=[],this.groupId=null,this.tracksInGroup=[],this.trackId=-1,this.selectDefaultTrack=!0}onManifestParsed(t,e){this.tracks=e.subtitleTracks}onSubtitleTrackLoaded(t,e){const{id:s,details:i}=e,{trackId:r}=this,n=this.tracksInGroup[r]
if(!n)return void this.warn(`Invalid subtitle track id ${s}`)
const a=n.details
n.details=e.details,this.log(`subtitle track ${s} loaded [${i.startSN}-${i.endSN}]`),s===this.trackId&&this.playlistLoaded(s,e,a)}onLevelLoading(t,e){this.switchLevel(e.level)}onLevelSwitching(t,e){this.switchLevel(e.level)}switchLevel(t){const e=this.hls.levels[t]
if(null==e||!e.textGroupIds)return
const s=e.textGroupIds[e.urlId],i=this.tracksInGroup?this.tracksInGroup[this.trackId]:void 0
if(this.groupId!==s){const t=this.tracks.filter((t=>!s||t.groupId===s))
this.tracksInGroup=t
const e=this.findTrackId(null==i?void 0:i.name)||this.findTrackId()
this.groupId=s||null
const r={subtitleTracks:t}
this.log(`Updating subtitle tracks, ${t.length} track(s) found in "${s}" group-id`),this.hls.trigger(g.SUBTITLE_TRACKS_UPDATED,r),-1!==e&&this.setSubtitleTrack(e,i)}else this.shouldReloadPlaylist(i)&&this.setSubtitleTrack(this.trackId,i)}findTrackId(t){const e=this.tracksInGroup
for(let s=0;s<e.length;s++){const i=e[s]
if((!this.selectDefaultTrack||i.default)&&(!t||t===i.name))return i.id}return-1}onError(t,e){!e.fatal&&e.context&&e.context.type===jt.SUBTITLE_TRACK&&e.context.id===this.trackId&&e.context.groupId===this.groupId&&this.checkRetry(e)}get subtitleTracks(){return this.tracksInGroup}get subtitleTrack(){return this.trackId}set subtitleTrack(t){this.selectDefaultTrack=!1
const e=this.tracksInGroup?this.tracksInGroup[this.trackId]:void 0
this.setSubtitleTrack(t,e)}loadPlaylist(t){super.loadPlaylist()
const e=this.tracksInGroup[this.trackId]
if(this.shouldLoadPlaylist(e)){const s=e.id,i=e.groupId
let r=e.url
if(t)try{r=t.addDirectives(r)}catch(t){this.warn(`Could not construct new URL with HLS Delivery Directives: ${t}`)}this.log(`Loading subtitle playlist for id ${s}`),this.hls.trigger(g.SUBTITLE_TRACK_LOADING,{url:r,id:s,groupId:i,deliveryDirectives:t||null})}}toggleTrackModes(t){const{media:e,trackId:s}=this
if(!e)return
const i=_i(e.textTracks),r=i.filter((t=>t.groupId===this.groupId))
if(-1===t)[].slice.call(i).forEach((t=>{t.mode="disabled"}))
else{const t=r[s]
t&&(t.mode="disabled")}const n=r[t]
n&&(n.mode=this.subtitleDisplay?"showing":"hidden")}setSubtitleTrack(t,e){var s
const i=this.tracksInGroup
if(!this.media)return void(this.queuedDefaultTrack=t)
if(this.trackId!==t&&this.toggleTrackModes(t),this.trackId===t&&(-1===t||null!=(s=i[t])&&s.details)||t<-1||t>=i.length)return
this.clearTimer()
const r=i[t]
if(this.log(`Switching to subtitle-track ${t}`+(r?` "${r.name}" lang:${r.lang} group:${r.groupId}`:"")),this.trackId=t,r){const{id:t,groupId:s="",name:i,type:n,url:a}=r
this.hls.trigger(g.SUBTITLE_TRACK_SWITCH,{id:t,groupId:s,name:i,type:n,url:a})
const o=this.switchParams(r.url,null==e?void 0:e.details)
this.loadPlaylist(o)}else this.hls.trigger(g.SUBTITLE_TRACK_SWITCH,{id:t})}onTextTracksChanged(){if(this.useTextTrackPolling||self.clearInterval(this.subtitlePollingInterval),!this.media||!this.hls.config.renderTextTracksNatively)return
let t=-1
const e=_i(this.media.textTracks)
for(let s=0;s<e.length;s++)if("hidden"===e[s].mode)t=s
else if("showing"===e[s].mode){t=s
break}this.subtitleTrack!==t&&(this.subtitleTrack=t)}},timelineController:class{constructor(t){if(this.hls=void 0,this.media=null,this.config=void 0,this.enabled=!0,this.Cues=void 0,this.textTracks=[],this.tracks=[],this.initPTS=[],this.unparsedVttFrags=[],this.captionsTracks={},this.nonNativeCaptionsTracks={},this.cea608Parser1=void 0,this.cea608Parser2=void 0,this.lastSn=-1,this.lastPartIndex=-1,this.prevCC=-1,this.vttCCs={ccOffset:0,presentationOffset:0,0:{start:0,prevCC:-1,new:!0}},this.captionsProperties=void 0,this.hls=t,this.config=t.config,this.Cues=t.config.cueHandler,this.captionsProperties={textTrack1:{label:this.config.captionsTextTrack1Label,languageCode:this.config.captionsTextTrack1LanguageCode},textTrack2:{label:this.config.captionsTextTrack2Label,languageCode:this.config.captionsTextTrack2LanguageCode},textTrack3:{label:this.config.captionsTextTrack3Label,languageCode:this.config.captionsTextTrack3LanguageCode},textTrack4:{label:this.config.captionsTextTrack4Label,languageCode:this.config.captionsTextTrack4LanguageCode}},this.config.enableCEA708Captions){const t=new tr(this,"textTrack1"),e=new tr(this,"textTrack2"),s=new tr(this,"textTrack3"),i=new tr(this,"textTrack4")
this.cea608Parser1=new Qi(1,t,e),this.cea608Parser2=new Qi(3,s,i)}t.on(g.MEDIA_ATTACHING,this.onMediaAttaching,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.MANIFEST_LOADED,this.onManifestLoaded,this),t.on(g.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.on(g.FRAG_LOADING,this.onFragLoading,this),t.on(g.FRAG_LOADED,this.onFragLoaded,this),t.on(g.FRAG_PARSING_USERDATA,this.onFragParsingUserdata,this),t.on(g.FRAG_DECRYPTED,this.onFragDecrypted,this),t.on(g.INIT_PTS_FOUND,this.onInitPtsFound,this),t.on(g.SUBTITLE_TRACKS_CLEARED,this.onSubtitleTracksCleared,this),t.on(g.BUFFER_FLUSHING,this.onBufferFlushing,this)}destroy(){const{hls:t}=this
t.off(g.MEDIA_ATTACHING,this.onMediaAttaching,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.MANIFEST_LOADED,this.onManifestLoaded,this),t.off(g.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.off(g.FRAG_LOADING,this.onFragLoading,this),t.off(g.FRAG_LOADED,this.onFragLoaded,this),t.off(g.FRAG_PARSING_USERDATA,this.onFragParsingUserdata,this),t.off(g.FRAG_DECRYPTED,this.onFragDecrypted,this),t.off(g.INIT_PTS_FOUND,this.onInitPtsFound,this),t.off(g.SUBTITLE_TRACKS_CLEARED,this.onSubtitleTracksCleared,this),t.off(g.BUFFER_FLUSHING,this.onBufferFlushing,this),this.hls=this.config=this.cea608Parser1=this.cea608Parser2=null}addCues(t,e,s,i,r){let n=!1
for(let d=r.length;d--;){const t=r[d],i=(a=t[0],o=t[1],l=e,h=s,Math.min(o,h)-Math.max(a,l))
if(i>=0&&(t[0]=Math.min(t[0],e),t[1]=Math.max(t[1],s),n=!0,i/(s-e)>.5))return}var a,o,l,h
if(n||r.push([e,s]),this.config.renderTextTracksNatively){const r=this.captionsTracks[t]
this.Cues.newCue(r,e,s,i)}else{const r=this.Cues.newCue(null,e,s,i)
this.hls.trigger(g.CUES_PARSED,{type:"captions",cues:r,track:t})}}onInitPtsFound(t,{frag:e,id:s,initPTS:i,timescale:r}){const{unparsedVttFrags:n}=this
"main"===s&&(this.initPTS[e.cc]={baseTime:i,timescale:r}),n.length&&(this.unparsedVttFrags=[],n.forEach((t=>{this.onFragLoaded(g.FRAG_LOADED,t)})))}getExistingTrack(t){const{media:e}=this
if(e)for(let s=0;s<e.textTracks.length;s++){const i=e.textTracks[s]
if(i[t])return i}return null}createCaptionsTrack(t){this.config.renderTextTracksNatively?this.createNativeTrack(t):this.createNonNativeTrack(t)}createNativeTrack(t){if(this.captionsTracks[t])return
const{captionsProperties:e,captionsTracks:s,media:i}=this,{label:r,languageCode:n}=e[t],a=this.getExistingTrack(t)
if(a)s[t]=a,ee(s[t]),Zt(s[t],i)
else{const e=this.createTextTrack("captions",r,n)
e&&(e[t]=!0,s[t]=e)}}createNonNativeTrack(t){if(this.nonNativeCaptionsTracks[t])return
const e=this.captionsProperties[t]
if(!e)return
const s={_id:t,label:e.label,kind:"captions",default:!!e.media&&!!e.media.default,closedCaptions:e.media}
this.nonNativeCaptionsTracks[t]=s,this.hls.trigger(g.NON_NATIVE_TEXT_TRACKS_FOUND,{tracks:[s]})}createTextTrack(t,e,s){const i=this.media
if(i)return i.addTextTrack(t,e,s)}onMediaAttaching(t,e){this.media=e.media,this._cleanTracks()}onMediaDetaching(){const{captionsTracks:t}=this
Object.keys(t).forEach((e=>{ee(t[e]),delete t[e]})),this.nonNativeCaptionsTracks={}}onManifestLoading(){this.lastSn=-1,this.lastPartIndex=-1,this.prevCC=-1,this.vttCCs={ccOffset:0,presentationOffset:0,0:{start:0,prevCC:-1,new:!0}},this._cleanTracks(),this.tracks=[],this.captionsTracks={},this.nonNativeCaptionsTracks={},this.textTracks=[],this.unparsedVttFrags=this.unparsedVttFrags||[],this.initPTS=[],this.cea608Parser1&&this.cea608Parser2&&(this.cea608Parser1.reset(),this.cea608Parser2.reset())}_cleanTracks(){const{media:t}=this
if(!t)return
const e=t.textTracks
if(e)for(let s=0;s<e.length;s++)ee(e[s])}onSubtitleTracksUpdated(t,e){const s=e.subtitleTracks||[],i=s.some((t=>t.textCodec===mr))
if(this.config.enableWebVTT||i&&this.config.enableIMSC1){if(ki(this.tracks,s))return void(this.tracks=s)
if(this.textTracks=[],this.tracks=s,this.config.renderTextTracksNatively){const t=this.media?this.media.textTracks:null
this.tracks.forEach(((e,s)=>{let i
if(t&&s<t.length){let s=null
for(let i=0;i<t.length;i++)if(Ir(t[i],e)){s=t[i]
break}s&&(i=s)}if(i)ee(i)
else{const t=this._captionsOrSubtitlesFromCharacteristics(e)
i=this.createTextTrack(t,e.name,e.lang),i&&(i.mode="disabled")}i&&(i.groupId=e.groupId,this.textTracks.push(i))}))}else if(this.tracks.length){const t=this.tracks.map((t=>({label:t.name,kind:t.type.toLowerCase(),default:t.default,subtitleTrack:t})))
this.hls.trigger(g.NON_NATIVE_TEXT_TRACKS_FOUND,{tracks:t})}}}_captionsOrSubtitlesFromCharacteristics(t){if(t.attrs.CHARACTERISTICS){const e=/transcribes-spoken-dialog/gi.test(t.attrs.CHARACTERISTICS),s=/describes-music-and-sound/gi.test(t.attrs.CHARACTERISTICS)
if(e&&s)return"captions"}return"subtitles"}onManifestLoaded(t,e){this.config.enableCEA708Captions&&e.captions&&e.captions.forEach((t=>{const e=/(?:CC|SERVICE)([1-4])/.exec(t.instreamId)
if(!e)return
const s=`textTrack${e[1]}`,i=this.captionsProperties[s]
i&&(i.label=t.name,t.lang&&(i.languageCode=t.lang),i.media=t)}))}closedCaptionsForLevel(t){const e=this.hls.levels[t.level]
return null==e?void 0:e.attrs["CLOSED-CAPTIONS"]}onFragLoading(t,e){const{cea608Parser1:s,cea608Parser2:i,lastSn:r,lastPartIndex:n}=this
if(this.enabled&&s&&i&&e.frag.type===Xt.MAIN){var a,o
const t=e.frag.sn,l=null!=(a=null==e||null==(o=e.part)?void 0:o.index)?a:-1
t===r+1||t===r&&l===n+1||(s.reset(),i.reset()),this.lastSn=t,this.lastPartIndex=l}}onFragLoaded(t,e){const{frag:s,payload:i}=e,{initPTS:r,unparsedVttFrags:n}=this
if(s.type===Xt.SUBTITLE)if(i.byteLength){if(!r[s.cc])return n.push(e),void(r.length&&this.hls.trigger(g.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:s,error:new Error("Missing initial subtitle PTS")}))
const t=s.decryptdata,a="stats"in e
if(null==t||!t.encrypted||a){const t=this.tracks[s.level],e=this.vttCCs
e[s.cc]||(e[s.cc]={start:s.start,prevCC:this.prevCC,new:!0},this.prevCC=s.cc),t&&t.textCodec===mr?this._parseIMSC1(s,i):this._parseVTTs(s,i,e)}}else this.hls.trigger(g.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:s,error:new Error("Empty subtitle payload")})}_parseIMSC1(t,e){const s=this.hls
Er(e,this.initPTS[t.cc],(e=>{this._appendCues(e,t.level),s.trigger(g.SUBTITLE_FRAG_PROCESSED,{success:!0,frag:t})}),(e=>{v.log(`Failed to parse IMSC1: ${e}`),s.trigger(g.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:t,error:e})}))}_parseVTTs(t,e,s){var i
const r=this.hls
!function(t,e,s,i,r,n,a){const o=new dr,l=rt(new Uint8Array(t)).trim().replace(cr,"\n").split("\n"),h=[],d=function(t,e=1){return si(t,ei,1/e)}(e.baseTime,e.timescale)
let c,u="00:00.000",g=0,m=0,p=!0
o.oncue=function(t){const e=s[i]
let n=s.ccOffset
const a=(g-d)/9e4
null!=e&&e.new&&(void 0!==m?n=s.ccOffset=e.start:function(t,e,s){let i=t[e],r=t[i.prevCC]
if(!r||!r.new&&i.new)return t.ccOffset=t.presentationOffset=i.start,void(i.new=!1)
for(;null!=(n=r)&&n.new;){var n
t.ccOffset+=i.start-r.start,i.new=!1,i=r,r=t[i.prevCC]}t.presentationOffset=s}(s,i,a)),a&&(n=a-s.presentationOffset)
const o=t.endTime-t.startTime,l=li(9e4*(t.startTime+n-m),9e4*r)/9e4
t.startTime=Math.max(l,0),t.endTime=Math.max(l+o,0)
const c=t.text.trim()
t.text=decodeURIComponent(encodeURIComponent(c)),t.id||(t.id=gr(t.startTime,t.endTime,c)),t.endTime>0&&h.push(t)},o.onparsingerror=function(t){c=t},o.onflush=function(){c?a(c):n(h)},l.forEach((t=>{if(p){if(ur(t,"X-TIMESTAMP-MAP=")){p=!1,t.slice(16).split(",").forEach((t=>{ur(t,"LOCAL:")?u=t.slice(6):ur(t,"MPEGTS:")&&(g=parseInt(t.slice(7)))}))
try{m=function(t){let e=parseInt(t.slice(-3))
const s=parseInt(t.slice(-6,-4)),i=parseInt(t.slice(-9,-7)),r=t.length>9?parseInt(t.substring(0,t.indexOf(":"))):0
if(!(f(e)&&f(s)&&f(i)&&f(r)))throw Error(`Malformed X-TIMESTAMP-MAP: Local:${t}`)
return e+=1e3*s,e+=6e4*i,e+=36e5*r,e}(u)/1e3}catch(t){c=t}return}""===t&&(p=!1)}o.parse(t+"\n")})),o.flush()}(null!=(i=t.initSegment)&&i.data?vt(t.initSegment.data,new Uint8Array(e)):e,this.initPTS[t.cc],s,t.cc,t.start,(e=>{this._appendCues(e,t.level),r.trigger(g.SUBTITLE_FRAG_PROCESSED,{success:!0,frag:t})}),(s=>{this._fallbackToIMSC1(t,e),v.log(`Failed to parse VTT cue: ${s}`),r.trigger(g.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:t,error:s})}))}_fallbackToIMSC1(t,e){const s=this.tracks[t.level]
s.textCodec||Er(e,this.initPTS[t.cc],(()=>{s.textCodec=mr,this._parseIMSC1(t,e)}),(()=>{s.textCodec="wvtt"}))}_appendCues(t,e){const s=this.hls
if(this.config.renderTextTracksNatively){const s=this.textTracks[e]
if(!s||"disabled"===s.mode)return
t.forEach((t=>te(s,t)))}else{const i=this.tracks[e]
if(!i)return
const r=i.default?"default":"subtitles"+e
s.trigger(g.CUES_PARSED,{type:"subtitles",cues:t,track:r})}}onFragDecrypted(t,e){const{frag:s}=e
if(s.type===Xt.SUBTITLE){if(!this.initPTS[s.cc])return void this.unparsedVttFrags.push(e)
this.onFragLoaded(g.FRAG_LOADED,e)}}onSubtitleTracksCleared(){this.tracks=[],this.captionsTracks={}}onFragParsingUserdata(t,e){const{cea608Parser1:s,cea608Parser2:i}=this
if(!this.enabled||!s||!i)return
const{frag:r,samples:n}=e
if(r.type!==Xt.MAIN||"NONE"!==this.closedCaptionsForLevel(r))for(let a=0;a<n.length;a++){const t=n[a].bytes
if(t){const e=this.extractCea608Data(t)
s.addData(n[a].pts,e[0]),i.addData(n[a].pts,e[1])}}}onBufferFlushing(t,{startOffset:e,endOffset:s,endOffsetSubtitles:i,type:r}){const{media:n}=this
if(n&&!(n.currentTime<s)){if(!r||"video"===r){const{captionsTracks:t}=this
Object.keys(t).forEach((i=>se(t[i],e,s)))}if(this.config.renderTextTracksNatively&&0===e&&void 0!==i){const{textTracks:t}=this
Object.keys(t).forEach((s=>se(t[s],e,i)))}}}extractCea608Data(t){const e=[[],[]],s=31&t[0]
let i=2
for(let r=0;r<s;r++){const s=t[i++],r=127&t[i++],n=127&t[i++]
if((0!==r||0!==n)&&0!=(4&s)){const t=3&s
0!==t&&1!==t||(e[t].push(r),e[t].push(n))}}return e}},audioStreamController:class extends ys{constructor(t,e,s){super(t,e,s,"[audio-stream-controller]",Xt.AUDIO),this.videoBuffer=null,this.videoTrackCC=-1,this.waitingVideoCC=-1,this.bufferedTrack=null,this.switchingTrack=null,this.trackId=-1,this.waitingData=null,this.mainDetails=null,this.bufferFlushed=!1,this.cachedTrackLoadedData=null,this._registerListeners()}onHandlerDestroying(){this._unregisterListeners(),this.mainDetails=null,this.bufferedTrack=null,this.switchingTrack=null}_registerListeners(){const{hls:t}=this
t.on(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.LEVEL_LOADED,this.onLevelLoaded,this),t.on(g.AUDIO_TRACKS_UPDATED,this.onAudioTracksUpdated,this),t.on(g.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.on(g.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.on(g.ERROR,this.onError,this),t.on(g.BUFFER_RESET,this.onBufferReset,this),t.on(g.BUFFER_CREATED,this.onBufferCreated,this),t.on(g.BUFFER_FLUSHED,this.onBufferFlushed,this),t.on(g.INIT_PTS_FOUND,this.onInitPtsFound,this),t.on(g.FRAG_BUFFERED,this.onFragBuffered,this)}_unregisterListeners(){const{hls:t}=this
t.off(g.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(g.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.LEVEL_LOADED,this.onLevelLoaded,this),t.off(g.AUDIO_TRACKS_UPDATED,this.onAudioTracksUpdated,this),t.off(g.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.off(g.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.off(g.ERROR,this.onError,this),t.off(g.BUFFER_RESET,this.onBufferReset,this),t.off(g.BUFFER_CREATED,this.onBufferCreated,this),t.off(g.BUFFER_FLUSHED,this.onBufferFlushed,this),t.off(g.INIT_PTS_FOUND,this.onInitPtsFound,this),t.off(g.FRAG_BUFFERED,this.onFragBuffered,this)}onInitPtsFound(t,{frag:e,id:s,initPTS:i,timescale:r}){if("main"===s){const t=e.cc
this.initPTS[e.cc]={baseTime:i,timescale:r},this.log(`InitPTS for cc: ${t} found from main: ${i}`),this.videoTrackCC=t,this.state===ms&&this.tick()}}startLoad(t){if(!this.levels)return this.startPosition=t,void(this.state=ns)
const e=this.lastCurrentTime
this.stopLoad(),this.setInterval(100),e>0&&-1===t?(this.log(`Override startPosition with lastCurrentTime @${e.toFixed(3)}`),t=e,this.state=as):(this.loadedmetadata=!1,this.state=ds),this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}doTick(){switch(this.state){case as:this.doTickIdle()
break
case ds:{var t
const{levels:e,trackId:s}=this,i=null==e||null==(t=e[s])?void 0:t.details
if(i){if(this.waitForCdnTuneIn(i))break
this.state=ms}break}case hs:{var e
const t=performance.now(),s=this.retryDate;(!s||t>=s||null!=(e=this.media)&&e.seeking)&&(this.log("RetryDate reached, switch back to IDLE state"),this.resetStartWhenNotLoaded(this.trackId),this.state=as)
break}case ms:{const t=this.waitingData
if(t){const{frag:e,part:s,cache:i,complete:r}=t
if(void 0!==this.initPTS[e.cc]){this.waitingData=null,this.waitingVideoCC=-1,this.state=ls
const t={frag:e,part:s,payload:i.flush(),networkDetails:null}
this._handleFragmentLoadProgress(t),r&&super._handleFragmentLoadComplete(t)}else if(this.videoTrackCC!==this.waitingVideoCC)this.log(`Waiting fragment cc (${e.cc}) cancelled because video is at cc ${this.videoTrackCC}`),this.clearWaitingFragment()
else{const t=this.getLoadPosition(),s=Xe.bufferInfo(this.mediaBuffer,t,this.config.maxBufferHole)
Ie(s.end,this.config.maxFragLookUpTolerance,e)<0&&(this.log(`Waiting fragment cc (${e.cc}) @ ${e.start} cancelled because another fragment at ${s.end} is needed`),this.clearWaitingFragment())}}else this.state=as}}this.onTickEnd()}clearWaitingFragment(){const t=this.waitingData
t&&(this.fragmentTracker.removeFragment(t.frag),this.waitingData=null,this.waitingVideoCC=-1,this.state=as)}resetLoadingState(){this.clearWaitingFragment(),super.resetLoadingState()}onTickEnd(){const{media:t}=this
null!=t&&t.readyState&&(this.lastCurrentTime=t.currentTime)}doTickIdle(){const{hls:t,levels:e,media:s,trackId:i}=this,r=t.config
if(null==e||!e[i])return
if(!s&&(this.startFragRequested||!r.startFragPrefetch))return
const n=e[i],a=n.details
if(!a||a.live&&this.levelLastLoaded!==i||this.waitForCdnTuneIn(a))return void(this.state=ds)
const o=this.mediaBuffer?this.mediaBuffer:this.media
this.bufferFlushed&&o&&(this.bufferFlushed=!1,this.afterBufferFlushed(o,D.AUDIO,Xt.AUDIO))
const l=this.getFwdBufferInfo(o,Xt.AUDIO)
if(null===l)return
const{bufferedTrack:h,switchingTrack:d}=this
if(!d&&this._streamEnded(l,a))return t.trigger(g.BUFFER_EOS,{type:"audio"}),void(this.state=fs)
const c=this.getFwdBufferInfo(this.videoBuffer?this.videoBuffer:this.media,Xt.MAIN),u=l.len,f=this.getMaxBufferLength(null==c?void 0:c.len)
if(u>=f&&!d)return
const m=a.fragments[0].start
let p=l.end
if(d&&s){const t=this.getLoadPosition()
h&&d.attrs!==h.attrs&&(p=t),a.PTSKnown&&t<m&&(l.end>m||l.nextStart)&&(this.log("Alt audio track ahead of main track, seek to start of alt audio track"),s.currentTime=m+.05)}let y=this.getNextFragment(p,a),T=!1
if(y&&this.isLoopLoading(y,p)&&(T=!!y.gap,y=this.getNextFragmentLoopLoading(y,a,l,Xt.MAIN,f)),!y)return void(this.bufferFlushed=!0)
const E=c&&y.start>c.end+a.targetduration
if(E||(null==c||!c.len)&&l.len){const t=this.fragmentTracker.getBufferedFrag(y.start,Xt.MAIN)
if(null===t)return
if(T||(T=!!t.gap||!!E&&0===c.len),E&&!T||T&&l.nextStart&&l.nextStart<t.end)return}this.loadFragment(y,n,p)}getMaxBufferLength(t){const e=super.getMaxBufferLength()
return t?Math.min(Math.max(e,t),this.config.maxMaxBufferLength):e}onMediaDetaching(){this.videoBuffer=null,super.onMediaDetaching()}onAudioTracksUpdated(t,{audioTracks:e}){this.resetTransmuxer(),this.levels=e.map((t=>new ue(t)))}onAudioTrackSwitching(t,e){const s=!!e.url
this.trackId=e.id
const{fragCurrent:i}=this
i&&(i.abortRequests(),this.removeUnbufferedFrags(i.start)),this.resetLoadingState(),s?this.setInterval(100):this.resetTransmuxer(),s?(this.switchingTrack=e,this.state=as):(this.switchingTrack=null,this.bufferedTrack=e,this.state=ns),this.tick()}onManifestLoading(){this.mainDetails=null,this.fragmentTracker.removeAllFragments(),this.startPosition=this.lastCurrentTime=0,this.bufferFlushed=!1,this.bufferedTrack=null,this.switchingTrack=null}onLevelLoaded(t,e){this.mainDetails=e.details,null!==this.cachedTrackLoadedData&&(this.hls.trigger(g.AUDIO_TRACK_LOADED,this.cachedTrackLoadedData),this.cachedTrackLoadedData=null)}onAudioTrackLoaded(t,e){var s
if(null==this.mainDetails)return void(this.cachedTrackLoadedData=e)
const{levels:i}=this,{details:r,id:n}=e
if(!i)return void this.warn(`Audio tracks were reset while loading level ${n}`)
this.log(`Track ${n} loaded [${r.startSN},${r.endSN}],duration:${r.totalduration}`)
const a=i[n]
let o=0
if(r.live||null!=(s=a.details)&&s.live){const t=this.mainDetails
if(r.fragments[0]||(r.deltaUpdateFailed=!0),r.deltaUpdateFailed||!t)return
!a.details&&r.hasProgramDateTime&&t.hasProgramDateTime?(ts(r,t),o=r.fragments[0].start):o=this.alignPlaylists(r,a.details)}a.details=r,this.levelLastLoaded=n,this.startFragRequested||!this.mainDetails&&r.live||this.setStartPosition(a.details,o),this.state!==ds||this.waitForCdnTuneIn(r)||(this.state=as),this.tick()}_handleFragmentLoadProgress(t){var e
const{frag:s,part:i,payload:r}=t,{config:n,trackId:a,levels:o}=this
if(!o)return void this.warn(`Audio tracks were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`)
const l=o[a]
if(!l)return void this.warn("Audio track is undefined on fragment load progress")
const h=l.details
if(!h)return this.warn("Audio track details undefined on fragment load progress"),void this.removeUnbufferedFrags(s.start)
const d=n.defaultAudioCodec||l.audioCodec||"mp4a.40.2"
let c=this.transmuxer
c||(c=this.transmuxer=new Li(this.hls,Xt.AUDIO,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this)))
const u=this.initPTS[s.cc],f=null==(e=s.initSegment)?void 0:e.data
if(void 0!==u){const t=!1,e=i?i.index:-1,n=-1!==e,a=new ze(s.level,s.sn,s.stats.chunkCount,r.byteLength,e,n)
c.push(r,f,d,"",s,i,h.totalduration,t,a,u)}else{this.log(`Unknown video PTS for cc ${s.cc}, waiting for video PTS before demuxing audio frag ${s.sn} of [${h.startSN} ,${h.endSN}],track ${a}`)
const{cache:t}=this.waitingData=this.waitingData||{frag:s,part:i,cache:new Di,complete:!1}
t.push(new Uint8Array(r)),this.waitingVideoCC=this.videoTrackCC,this.state=ms}}_handleFragmentLoadComplete(t){this.waitingData?this.waitingData.complete=!0:super._handleFragmentLoadComplete(t)}onBufferReset(){this.mediaBuffer=this.videoBuffer=null,this.loadedmetadata=!1}onBufferCreated(t,e){const s=e.tracks.audio
s&&(this.mediaBuffer=s.buffer||null),e.tracks.video&&(this.videoBuffer=e.tracks.video.buffer||null)}onFragBuffered(t,e){const{frag:s,part:i}=e
var r
if(s.type===Xt.AUDIO)if(this.fragContextChanged(s))this.warn(`Fragment ${s.sn}${i?" p: "+i.index:""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}, audioSwitch: ${this.switchingTrack?this.switchingTrack.name:"false"}`)
else{if("initSegment"!==s.sn){this.fragPrevious=s
const t=this.switchingTrack
t&&(this.bufferedTrack=t,this.switchingTrack=null,this.hls.trigger(g.AUDIO_TRACK_SWITCHED,d({},t)))}this.fragBufferedComplete(s,i)}else this.loadedmetadata||s.type!==Xt.MAIN||null!=(r=this.videoBuffer||this.media)&&r.buffered.length&&(this.loadedmetadata=!0)}onError(t,e){var s
if(e.fatal)this.state=gs
else switch(e.details){case p.FRAG_GAP:case p.FRAG_PARSING_ERROR:case p.FRAG_DECRYPT_ERROR:case p.FRAG_LOAD_ERROR:case p.FRAG_LOAD_TIMEOUT:case p.KEY_LOAD_ERROR:case p.KEY_LOAD_TIMEOUT:this.onFragmentOrKeyLoadError(Xt.AUDIO,e)
break
case p.AUDIO_TRACK_LOAD_ERROR:case p.AUDIO_TRACK_LOAD_TIMEOUT:case p.LEVEL_PARSING_ERROR:e.levelRetry||this.state!==ds||(null==(s=e.context)?void 0:s.type)!==jt.AUDIO_TRACK||(this.state=as)
break
case p.BUFFER_FULL_ERROR:if(!e.parent||"audio"!==e.parent)return
this.reduceLengthAndFlushBuffer(e)&&(this.bufferedTrack=null,super.flushMainBuffer(0,Number.POSITIVE_INFINITY,"audio"))
break
case p.INTERNAL_EXCEPTION:this.recoverWorkerError(e)}}onBufferFlushed(t,{type:e}){e===D.AUDIO&&(this.bufferFlushed=!0,this.state===fs&&(this.state=as))}_handleTransmuxComplete(t){var e
const s="audio",{hls:i}=this,{remuxResult:r,chunkMeta:n}=t,a=this.getCurrentContext(n)
if(!a)return void this.resetWhenMissingContext(n)
const{frag:o,part:l,level:h}=a,{details:d}=h,{audio:c,text:f,id3:m,initSegment:p}=r
if(!this.fragContextChanged(o)&&d){if(this.state=cs,this.switchingTrack&&c&&this.completeAudioSwitch(this.switchingTrack),null!=p&&p.tracks&&(this._bufferInitSegment(p.tracks,o,n),i.trigger(g.FRAG_PARSING_INIT_SEGMENT,{frag:o,id:s,tracks:p.tracks})),c){const{startPTS:t,endPTS:e,startDTS:s,endDTS:i}=c
l&&(l.elementaryStreams[D.AUDIO]={startPTS:t,endPTS:e,startDTS:s,endDTS:i}),o.setElementaryStreamInfo(D.AUDIO,t,e,s,i),this.bufferFragmentData(c,o,l,n)}if(null!=m&&null!=(e=m.samples)&&e.length){const t=u({id:s,frag:o,details:d},m)
i.trigger(g.FRAG_PARSING_METADATA,t)}if(f){const t=u({id:s,frag:o,details:d},f)
i.trigger(g.FRAG_PARSING_USERDATA,t)}}else this.fragmentTracker.removeFragment(o)}_bufferInitSegment(t,e,s){if(this.state!==cs)return
t.video&&delete t.video
const i=t.audio
if(!i)return
i.levelCodec=i.codec,i.id="audio",this.log(`Init audio buffer, container:${i.container}, codecs[parsed]=[${i.codec}]`),this.hls.trigger(g.BUFFER_CODECS,t)
const r=i.initSegment
if(null!=r&&r.byteLength){const t={type:"audio",frag:e,part:null,chunkMeta:s,parent:e.type,data:r}
this.hls.trigger(g.BUFFER_APPENDING,t)}this.tick()}loadFragment(t,e,s){const i=this.fragmentTracker.getState(t)
var r
this.fragCurrent=t,this.switchingTrack||i===Fe||i===Me?"initSegment"===t.sn?this._loadInitSegment(t,e):null!=(r=e.details)&&r.live&&!this.initPTS[t.cc]?(this.log(`Waiting for video PTS in continuity counter ${t.cc} of live stream before loading audio fragment ${t.sn} of level ${this.trackId}`),this.state=ms):(this.startFragRequested=!0,super.loadFragment(t,e,s)):this.clearTrackerIfNeeded(t)}completeAudioSwitch(t){const{hls:e,media:s,bufferedTrack:i}=this,r=null==i?void 0:i.attrs,n=t.attrs
s&&r&&(r.CHANNELS!==n.CHANNELS||r.NAME!==n.NAME||r.LANGUAGE!==n.LANGUAGE)&&(this.log("Switching audio track : flushing all audio"),super.flushMainBuffer(0,Number.POSITIVE_INFINITY,"audio")),this.bufferedTrack=t,this.switchingTrack=null,e.trigger(g.AUDIO_TRACK_SWITCHED,d({},t))}},audioTrackController:class extends we{constructor(t){super(t,"[audio-track-controller]"),this.tracks=[],this.groupId=null,this.tracksInGroup=[],this.trackId=-1,this.currentTrack=null,this.selectDefaultTrack=!0,this.registerListeners()}registerListeners(){const{hls:t}=this
t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.MANIFEST_PARSED,this.onManifestParsed,this),t.on(g.LEVEL_LOADING,this.onLevelLoading,this),t.on(g.LEVEL_SWITCHING,this.onLevelSwitching,this),t.on(g.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.on(g.ERROR,this.onError,this)}unregisterListeners(){const{hls:t}=this
t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.MANIFEST_PARSED,this.onManifestParsed,this),t.off(g.LEVEL_LOADING,this.onLevelLoading,this),t.off(g.LEVEL_SWITCHING,this.onLevelSwitching,this),t.off(g.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.off(g.ERROR,this.onError,this)}destroy(){this.unregisterListeners(),this.tracks.length=0,this.tracksInGroup.length=0,this.currentTrack=null,super.destroy()}onManifestLoading(){this.tracks=[],this.groupId=null,this.tracksInGroup=[],this.trackId=-1,this.currentTrack=null,this.selectDefaultTrack=!0}onManifestParsed(t,e){this.tracks=e.audioTracks||[]}onAudioTrackLoaded(t,e){const{id:s,groupId:i,details:r}=e,n=this.tracksInGroup[s]
if(!n||n.groupId!==i)return void this.warn(`Track with id:${s} and group:${i} not found in active group ${n.groupId}`)
const a=n.details
n.details=e.details,this.log(`audio-track ${s} "${n.name}" lang:${n.lang} group:${i} loaded [${r.startSN}-${r.endSN}]`),s===this.trackId&&this.playlistLoaded(s,e,a)}onLevelLoading(t,e){this.switchLevel(e.level)}onLevelSwitching(t,e){this.switchLevel(e.level)}switchLevel(t){const e=this.hls.levels[t]
if(null==e||!e.audioGroupIds)return
const s=e.audioGroupIds[e.urlId]
if(this.groupId!==s){this.groupId=s||null
const t=this.tracks.filter((t=>!s||t.groupId===s))
this.selectDefaultTrack&&!t.some((t=>t.default))&&(this.selectDefaultTrack=!1),this.tracksInGroup=t
const e={audioTracks:t}
this.log(`Updating audio tracks, ${t.length} track(s) found in group:${s}`),this.hls.trigger(g.AUDIO_TRACKS_UPDATED,e),this.selectInitialTrack()}else this.shouldReloadPlaylist(this.currentTrack)&&this.setAudioTrack(this.trackId)}onError(t,e){!e.fatal&&e.context&&e.context.type===jt.AUDIO_TRACK&&e.context.id===this.trackId&&e.context.groupId===this.groupId&&(this.requestScheduled=-1,this.checkRetry(e))}get audioTracks(){return this.tracksInGroup}get audioTrack(){return this.trackId}set audioTrack(t){this.selectDefaultTrack=!1,this.setAudioTrack(t)}setAudioTrack(t){const e=this.tracksInGroup
if(t<0||t>=e.length)return void this.warn("Invalid id passed to audio-track controller")
this.clearTimer()
const s=this.currentTrack
e[this.trackId]
const i=e[t],{groupId:r,name:n}=i
if(this.log(`Switching to audio-track ${t} "${n}" lang:${i.lang} group:${r}`),this.trackId=t,this.currentTrack=i,this.selectDefaultTrack=!1,this.hls.trigger(g.AUDIO_TRACK_SWITCHING,d({},i)),i.details&&!i.details.live)return
const a=this.switchParams(i.url,null==s?void 0:s.details)
this.loadPlaylist(a)}selectInitialTrack(){const t=this.tracksInGroup,e=this.findTrackId(this.currentTrack)|this.findTrackId(null)
if(-1!==e)this.setAudioTrack(e)
else{const e=new Error(`No track found for running audio group-ID: ${this.groupId} track count: ${t.length}`)
this.warn(e.message),this.hls.trigger(g.ERROR,{type:m.MEDIA_ERROR,details:p.AUDIO_TRACK_LOAD_ERROR,fatal:!0,error:e})}}findTrackId(t){const e=this.tracksInGroup
for(let s=0;s<e.length;s++){const i=e[s]
if(!this.selectDefaultTrack||i.default){if(!t||t.attrs["STABLE-RENDITION-ID"]===i.attrs["STABLE-RENDITION-ID"])return i.id
if(t.name===i.name&&t.lang===i.lang)return i.id}}return-1}loadPlaylist(t){super.loadPlaylist()
const e=this.tracksInGroup[this.trackId]
if(this.shouldLoadPlaylist(e)){const s=e.id,i=e.groupId
let r=e.url
if(t)try{r=t.addDirectives(r)}catch(t){this.warn(`Could not construct new URL with HLS Delivery Directives: ${t}`)}this.log(`loading audio-track playlist ${s} "${e.name}" lang:${e.lang} group:${i}`),this.clearTimer(),this.hls.trigger(g.AUDIO_TRACK_LOADING,{url:r,id:s,groupId:i,deliveryDirectives:t||null})}}},emeController:wr,cmcdController:xr,contentSteeringController:class{constructor(t){this.hls=void 0,this.log=void 0,this.loader=null,this.uri=null,this.pathwayId=".",this.pathwayPriority=null,this.timeToLoad=300,this.reloadTimer=-1,this.updated=0,this.started=!1,this.enabled=!0,this.levels=null,this.audioTracks=null,this.subtitleTracks=null,this.penalizedPathways={},this.hls=t,this.log=v.log.bind(v,"[content-steering]:"),this.registerListeners()}registerListeners(){const t=this.hls
t.on(g.MANIFEST_LOADING,this.onManifestLoading,this),t.on(g.MANIFEST_LOADED,this.onManifestLoaded,this),t.on(g.MANIFEST_PARSED,this.onManifestParsed,this),t.on(g.ERROR,this.onError,this)}unregisterListeners(){const t=this.hls
t&&(t.off(g.MANIFEST_LOADING,this.onManifestLoading,this),t.off(g.MANIFEST_LOADED,this.onManifestLoaded,this),t.off(g.MANIFEST_PARSED,this.onManifestParsed,this),t.off(g.ERROR,this.onError,this))}startLoad(){if(this.started=!0,self.clearTimeout(this.reloadTimer),this.enabled&&this.uri)if(this.updated){const t=Math.max(1e3*this.timeToLoad-(performance.now()-this.updated),0)
this.scheduleRefresh(this.uri,t)}else this.loadSteeringManifest(this.uri)}stopLoad(){this.started=!1,this.loader&&(this.loader.destroy(),this.loader=null),self.clearTimeout(this.reloadTimer)}destroy(){this.unregisterListeners(),this.stopLoad(),this.hls=null,this.levels=this.audioTracks=this.subtitleTracks=null}removeLevel(t){const e=this.levels
e&&(this.levels=e.filter((e=>e!==t)))}onManifestLoading(){this.stopLoad(),this.enabled=!0,this.timeToLoad=300,this.updated=0,this.uri=null,this.pathwayId=".",this.levels=this.audioTracks=this.subtitleTracks=null}onManifestLoaded(t,e){const{contentSteering:s}=e
null!==s&&(this.pathwayId=s.pathwayId,this.uri=s.uri,this.started&&this.startLoad())}onManifestParsed(t,e){this.audioTracks=e.audioTracks,this.subtitleTracks=e.subtitleTracks}onError(t,e){const{errorAction:s}=e
if(2===(null==s?void 0:s.action)&&1===s.flags){let t=this.pathwayPriority
const e=this.pathwayId
this.penalizedPathways[e]||(this.penalizedPathways[e]=performance.now()),!t&&this.levels&&(t=this.levels.reduce(((t,e)=>(-1===t.indexOf(e.pathwayId)&&t.push(e.pathwayId),t)),[])),t&&t.length>1&&(this.updatePathwayPriority(t),s.resolved=this.pathwayId!==e)}}filterParsedLevels(t){this.levels=t
let e=this.getLevelsForPathway(this.pathwayId)
if(0===e.length){const s=t[0].pathwayId
this.log(`No levels found in Pathway ${this.pathwayId}. Setting initial Pathway to "${s}"`),e=this.getLevelsForPathway(s),this.pathwayId=s}return e.length!==t.length?(this.log(`Found ${e.length}/${t.length} levels in Pathway "${this.pathwayId}"`),e):t}getLevelsForPathway(t){return null===this.levels?[]:this.levels.filter((e=>t===e.pathwayId))}updatePathwayPriority(t){let e
this.pathwayPriority=t
const s=this.penalizedPathways,i=performance.now()
Object.keys(s).forEach((t=>{i-s[t]>3e5&&delete s[t]}))
for(let r=0;r<t.length;r++){const i=t[r]
if(s[i])continue
if(i===this.pathwayId)return
const n=this.hls.nextLoadLevel,a=this.hls.levels[n]
if(e=this.getLevelsForPathway(i),e.length>0){this.log(`Setting Pathway to "${i}"`),this.pathwayId=i,this.hls.trigger(g.LEVELS_UPDATED,{levels:e})
const t=this.hls.levels[n]
a&&t&&this.levels&&(t.attrs["STABLE-VARIANT-ID"]!==a.attrs["STABLE-VARIANT-ID"]&&t.bitrate!==a.bitrate&&this.log(`Unstable Pathways change from bitrate ${a.bitrate} to ${t.bitrate}`),this.hls.nextLoadLevel=n)
break}}}clonePathways(t){const e=this.levels
if(!e)return
const s={},i={}
t.forEach((t=>{const{ID:r,"BASE-ID":n,"URI-REPLACEMENT":a}=t
if(e.some((t=>t.pathwayId===r)))return
const o=this.getLevelsForPathway(n).map((t=>{const e=u({},t)
e.details=void 0,e.url=Or(t.uri,t.attrs["STABLE-VARIANT-ID"],"PER-VARIANT-URIS",a)
const n=new A(t.attrs)
n["PATHWAY-ID"]=r
const o=n.AUDIO&&`${n.AUDIO}_clone_${r}`,l=n.SUBTITLES&&`${n.SUBTITLES}_clone_${r}`
o&&(s[n.AUDIO]=o,n.AUDIO=o),l&&(i[n.SUBTITLES]=l,n.SUBTITLES=l),e.attrs=n
const h=new ue(e)
return Pe(h,"audio",o),Pe(h,"text",l),h}))
e.push(...o),Fr(this.audioTracks,s,a,r),Fr(this.subtitleTracks,i,a,r)}))}loadSteeringManifest(t){const e=this.hls.config,s=e.loader
let i
this.loader&&this.loader.destroy(),this.loader=new s(e)
try{i=new self.URL(t)}catch(e){return this.enabled=!1,void this.log(`Failed to parse Steering Manifest URI: ${t}`)}if("data:"!==i.protocol){const t=0|(this.hls.bandwidthEstimate||e.abrEwmaDefaultEstimate)
i.searchParams.set("_HLS_pathway",this.pathwayId),i.searchParams.set("_HLS_throughput",""+t)}const r={responseType:"json",url:i.href},n=e.steeringManifestLoadPolicy.default,a=n.errorRetry||n.timeoutRetry||{},o={loadPolicy:n,timeout:n.maxLoadTimeMs,maxRetry:a.maxNumRetry||0,retryDelay:a.retryDelayMs||0,maxRetryDelay:a.maxRetryDelayMs||0},l={onSuccess:(t,e,s,r)=>{this.log(`Loaded steering manifest: "${i}"`)
const n=t.data
if(1!==n.VERSION)return void this.log(`Steering VERSION ${n.VERSION} not supported!`)
this.updated=performance.now(),this.timeToLoad=n.TTL
const{"RELOAD-URI":a,"PATHWAY-CLONES":o,"PATHWAY-PRIORITY":l}=n
if(a)try{this.uri=new self.URL(a,i).href}catch(t){return this.enabled=!1,void this.log(`Failed to parse Steering Manifest RELOAD-URI: ${a}`)}this.scheduleRefresh(this.uri||s.url),o&&this.clonePathways(o),l&&this.updatePathwayPriority(l)},onError:(t,e,s,i)=>{if(this.log(`Error loading steering manifest: ${t.code} ${t.text} (${e.url})`),this.stopLoad(),410===t.code)return this.enabled=!1,void this.log(`Steering manifest ${e.url} no longer available`)
let r=1e3*this.timeToLoad
if(429!==t.code)this.scheduleRefresh(this.uri||e.url,r)
else{const t=this.loader
if("function"==typeof(null==t?void 0:t.getResponseHeader)){const e=t.getResponseHeader("Retry-After")
e&&(r=1e3*parseFloat(e))}this.log(`Steering manifest ${e.url} rate limited`)}},onTimeout:(t,e,s)=>{this.log(`Timeout loading steering manifest (${e.url})`),this.scheduleRefresh(this.uri||e.url)}}
this.log(`Requesting steering manifest: ${i}`),this.loader.load(r,o,l)}scheduleRefresh(t,e=1e3*this.timeToLoad){self.clearTimeout(this.reloadTimer),this.reloadTimer=self.setTimeout((()=>{this.loadSteeringManifest(t)}),e)}}})
function Yr(t){return t&&"object"==typeof t?Array.isArray(t)?t.map(Yr):Object.keys(t).reduce(((e,s)=>(e[s]=Yr(t[s]),e)),{}):t}class Wr{static get version(){return"1.4.0"}static isSupported(){return function(){const t=Ts()
if(!t)return!1
const e=Es(),s=t&&"function"==typeof t.isTypeSupported&&t.isTypeSupported('video/mp4; codecs="avc1.42E01E,mp4a.40.2"'),i=!e||e.prototype&&"function"==typeof e.prototype.appendBuffer&&"function"==typeof e.prototype.remove
return!!s&&!!i}()}static get Events(){return g}static get ErrorTypes(){return m}static get ErrorDetails(){return p}static get DefaultConfig(){return Wr.defaultConfig?Wr.defaultConfig:Vr}static set DefaultConfig(t){Wr.defaultConfig=t}constructor(t={}){this.config=void 0,this.userConfig=void 0,this.coreComponents=void 0,this.networkControllers=void 0,this._emitter=new vi,this._autoLevelCapping=void 0,this._maxHdcpLevel=null,this.abrController=void 0,this.bufferController=void 0,this.capLevelController=void 0,this.latencyController=void 0,this.levelController=void 0,this.streamController=void 0,this.audioTrackController=void 0,this.subtitleTrackController=void 0,this.emeController=void 0,this.cmcdController=void 0,this._media=null,this.url=null,function(t,e){if(self.console&&!0===t||"object"==typeof t){!function(t,...e){["debug","log","info","warn","error"].forEach((function(e){E[e]=t[e]?t[e].bind(t):function(t){const e=self.console[t]
return e?e.bind(self.console,`[${t}] >`):y}(e)}))}(t)
try{E.log('Debug logs enabled for "Hls instance" in hls.js version 1.4.0')}catch(t){E=T}}else E=T}(t.debug||!1)
const e=this.config=function(t,e){if((e.liveSyncDurationCount||e.liveMaxLatencyDurationCount)&&(e.liveSyncDuration||e.liveMaxLatencyDuration))throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration")
if(void 0!==e.liveMaxLatencyDurationCount&&(void 0===e.liveSyncDurationCount||e.liveMaxLatencyDurationCount<=e.liveSyncDurationCount))throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"')
if(void 0!==e.liveMaxLatencyDuration&&(void 0===e.liveSyncDuration||e.liveMaxLatencyDuration<=e.liveSyncDuration))throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"')
const s=Yr(t),i=["TimeOut","MaxRetry","RetryDelay","MaxRetryTimeout"]
return["manifest","level","frag"].forEach((t=>{const r=`${"level"===t?"playlist":t}LoadPolicy`,n=void 0===e[r],a=[]
i.forEach((i=>{const o=`${t}Loading${i}`,l=e[o]
if(void 0!==l&&n){a.push(o)
const t=s[r].default
switch(e[r]={default:t},i){case"TimeOut":t.maxLoadTimeMs=l,t.maxTimeToFirstByteMs=l
break
case"MaxRetry":t.errorRetry.maxNumRetry=l,t.timeoutRetry.maxNumRetry=l
break
case"RetryDelay":t.errorRetry.retryDelayMs=l,t.timeoutRetry.retryDelayMs=l
break
case"MaxRetryTimeout":t.errorRetry.maxRetryDelayMs=l,t.timeoutRetry.maxRetryDelayMs=l}}})),a.length&&v.warn(`hls.js config: "${a.join('", "')}" setting(s) are deprecated, use "${r}": ${JSON.stringify(e[r])}`)})),d(d({},s),e)}(Wr.DefaultConfig,t)
this.userConfig=t,this._autoLevelCapping=-1,e.progressive&&function(t){const e=t.loader
e!==Br&&e!==Nr?(v.log("[config]: Custom loader detected, cannot enable progressive streaming"),t.progressive=!1):function(){if(self.fetch&&self.AbortController&&self.ReadableStream&&self.Request)try{return new self.ReadableStream({}),!0}catch(t){}return!1}()&&(t.loader=Br,t.progressive=!0,t.enableSoftwareAES=!0,v.log("[config]: Progressive streaming enabled, using FetchLoader"))}(e)
const{abrController:s,bufferController:i,capLevelController:r,errorController:n,fpsController:a}=e,o=new n(this),l=this.abrController=new s(this),h=this.bufferController=new i(this),c=this.capLevelController=new r(this),u=new a(this),f=new Jt(this),m=new le(this),p=e.contentSteeringController,S=p?new p(this):null,L=this.levelController=new _e(this,S),A=new Ue(this),R=new We(this.config),b=this.streamController=new Ri(this,A,R)
c.setStreamController(b),u.setStreamController(b)
const I=[f,L,b]
S&&I.splice(1,0,S),this.networkControllers=I
const D=[l,h,c,u,m,A]
this.audioTrackController=this.createController(e.audioTrackController,I)
const k=e.audioStreamController
k&&I.push(new k(this,A,R)),this.subtitleTrackController=this.createController(e.subtitleTrackController,I)
const w=e.subtitleStreamController
w&&I.push(new w(this,A,R)),this.createController(e.timelineController,D),R.emeController=this.emeController=this.createController(e.emeController,D),this.cmcdController=this.createController(e.cmcdController,D),this.latencyController=this.createController(he,D),this.coreComponents=D,I.push(o)
const C=o.onErrorOut
"function"==typeof C&&this.on(g.ERROR,C,o)}createController(t,e){if(t){const s=new t(this)
return e&&e.push(s),s}return null}on(t,e,s=this){this._emitter.on(t,e,s)}once(t,e,s=this){this._emitter.once(t,e,s)}removeAllListeners(t){this._emitter.removeAllListeners(t)}off(t,e,s=this,i){this._emitter.off(t,e,s,i)}listeners(t){return this._emitter.listeners(t)}emit(t,e,s){return this._emitter.emit(t,e,s)}trigger(t,e){if(this.config.debug)return this.emit(t,t,e)
try{return this.emit(t,t,e)}catch(e){v.error("An internal error happened while handling event "+t+'. Error message: "'+e.message+'". Here is a stacktrace:',e),this.trigger(g.ERROR,{type:m.OTHER_ERROR,details:p.INTERNAL_EXCEPTION,fatal:!1,event:t,error:e})}return!1}listenerCount(t){return this._emitter.listenerCount(t)}destroy(){v.log("destroy"),this.trigger(g.DESTROYING,void 0),this.detachMedia(),this.removeAllListeners(),this._autoLevelCapping=-1,this.url=null,this.networkControllers.forEach((t=>t.destroy())),this.networkControllers.length=0,this.coreComponents.forEach((t=>t.destroy())),this.coreComponents.length=0
const t=this.config
t.xhrSetup=t.fetchSetup=void 0,this.userConfig=null}attachMedia(t){v.log("attachMedia"),this._media=t,this.trigger(g.MEDIA_ATTACHING,{media:t})}detachMedia(){v.log("detachMedia"),this.trigger(g.MEDIA_DETACHING,void 0),this._media=null}loadSource(t){this.stopLoad()
const e=this.media,s=this.url,i=this.url=l.buildAbsoluteURL(self.location.href,t,{alwaysNormalize:!0})
v.log(`loadSource:${i}`),e&&s&&s!==i&&this.bufferController.hasSourceTypes()&&(this.detachMedia(),this.attachMedia(e)),this.trigger(g.MANIFEST_LOADING,{url:t})}startLoad(t=-1){v.log(`startLoad(${t})`),this.networkControllers.forEach((e=>{e.startLoad(t)}))}stopLoad(){v.log("stopLoad"),this.networkControllers.forEach((t=>{t.stopLoad()}))}swapAudioCodec(){v.log("swapAudioCodec"),this.streamController.swapAudioCodec()}recoverMediaError(){v.log("recoverMediaError")
const t=this._media
this.detachMedia(),t&&this.attachMedia(t)}removeLevel(t,e=0){this.levelController.removeLevel(t,e)}get levels(){return this.levelController.levels||[]}get currentLevel(){return this.streamController.currentLevel}set currentLevel(t){v.log(`set currentLevel:${t}`),this.loadLevel=t,this.abrController.clearTimer(),this.streamController.immediateLevelSwitch()}get nextLevel(){return this.streamController.nextLevel}set nextLevel(t){v.log(`set nextLevel:${t}`),this.levelController.manualLevel=t,this.streamController.nextLevelSwitch()}get loadLevel(){return this.levelController.level}set loadLevel(t){v.log(`set loadLevel:${t}`),this.levelController.manualLevel=t}get nextLoadLevel(){return this.levelController.nextLoadLevel}set nextLoadLevel(t){this.levelController.nextLoadLevel=t}get firstLevel(){return Math.max(this.levelController.firstLevel,this.minAutoLevel)}set firstLevel(t){v.log(`set firstLevel:${t}`),this.levelController.firstLevel=t}get startLevel(){return this.levelController.startLevel}set startLevel(t){v.log(`set startLevel:${t}`),-1!==t&&(t=Math.max(t,this.minAutoLevel)),this.levelController.startLevel=t}get capLevelToPlayerSize(){return this.config.capLevelToPlayerSize}set capLevelToPlayerSize(t){const e=!!t
e!==this.config.capLevelToPlayerSize&&(e?this.capLevelController.startCapping():(this.capLevelController.stopCapping(),this.autoLevelCapping=-1,this.streamController.nextLevelSwitch()),this.config.capLevelToPlayerSize=e)}get autoLevelCapping(){return this._autoLevelCapping}get bandwidthEstimate(){const{bwEstimator:t}=this.abrController
return t?t.getEstimate():NaN}get ttfbEstimate(){const{bwEstimator:t}=this.abrController
return t?t.getEstimateTTFB():NaN}set autoLevelCapping(t){this._autoLevelCapping!==t&&(v.log(`set autoLevelCapping:${t}`),this._autoLevelCapping=t)}get maxHdcpLevel(){return this._maxHdcpLevel}set maxHdcpLevel(t){de.indexOf(t)>-1&&(this._maxHdcpLevel=t)}get autoLevelEnabled(){return-1===this.levelController.manualLevel}get manualLevel(){return this.levelController.manualLevel}get minAutoLevel(){const{levels:t,config:{minAutoBitrate:e}}=this
if(!t)return 0
const s=t.length
for(let i=0;i<s;i++)if(t[i].maxBitrate>=e)return i
return 0}get maxAutoLevel(){const{levels:t,autoLevelCapping:e,maxHdcpLevel:s}=this
let i
if(i=-1===e&&t&&t.length?t.length-1:e,s)for(let r=i;r--;){const e=t[r].attrs["HDCP-LEVEL"]
if(e&&e<=s)return r}return i}get nextAutoLevel(){return Math.min(Math.max(this.abrController.nextAutoLevel,this.minAutoLevel),this.maxAutoLevel)}set nextAutoLevel(t){this.abrController.nextAutoLevel=Math.max(this.minAutoLevel,t)}get playingDate(){return this.streamController.currentProgramDateTime}get mainForwardBufferInfo(){return this.streamController.getMainFwdBufferInfo()}get audioTracks(){const t=this.audioTrackController
return t?t.audioTracks:[]}get audioTrack(){const t=this.audioTrackController
return t?t.audioTrack:-1}set audioTrack(t){const e=this.audioTrackController
e&&(e.audioTrack=t)}get subtitleTracks(){const t=this.subtitleTrackController
return t?t.subtitleTracks:[]}get subtitleTrack(){const t=this.subtitleTrackController
return t?t.subtitleTrack:-1}get media(){return this._media}set subtitleTrack(t){const e=this.subtitleTrackController
e&&(e.subtitleTrack=t)}get subtitleDisplay(){const t=this.subtitleTrackController
return!!t&&t.subtitleDisplay}set subtitleDisplay(t){const e=this.subtitleTrackController
e&&(e.subtitleDisplay=t)}get lowLatencyMode(){return this.config.lowLatencyMode}set lowLatencyMode(t){this.config.lowLatencyMode=t}get liveSyncPosition(){return this.latencyController.liveSyncPosition}get latency(){return this.latencyController.latency}get maxLatency(){return this.latencyController.maxLatency}get targetLatency(){return this.latencyController.targetLatency}get drift(){return this.latencyController.drift}get forceStartLoad(){return this.streamController.forceStartLoad}}Wr.defaultConfig=void 0}}])

//# sourceMappingURL=chunk.584.94a5845133ba236acc58.map