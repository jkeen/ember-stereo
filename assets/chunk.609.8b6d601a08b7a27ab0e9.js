"use strict";(globalThis.webpackChunk_ember_auto_import_=globalThis.webpackChunk_ember_auto_import_||[]).push([[609],{4609:(t,e,s)=>{s.r(e),s.d(e,{AbrController:()=>fs,AttrList:()=>b,AudioStreamController:()=>or,AudioTrackController:()=>lr,BasePlaylistController:()=>es,BaseSegment:()=>w,BaseStreamController:()=>zs,BufferController:()=>gr,CMCDController:()=>Yn,CapLevelController:()=>cn,ChunkMetadata:()=>Rs,ContentSteeringController:()=>Wn,DateRange:()=>k,EMEController:()=>gn,ErrorActionFlags:()=>Ze,ErrorController:()=>ts,ErrorDetails:()=>v,ErrorTypes:()=>y,Events:()=>p,FPSController:()=>un,Fragment:()=>_,Hls:()=>fa,HlsSkip:()=>_e,HlsUrlParameters:()=>Pe,KeySystemFormats:()=>U,KeySystems:()=>N,Level:()=>Me,LevelDetails:()=>P,LevelKey:()=>Ft,LoadStats:()=>I,MetadataSchema:()=>Ae,NetworkErrorAction:()=>Je,Part:()=>x,PlaylistLevelType:()=>fe,SubtitleStreamController:()=>hr,SubtitleTrackController:()=>cr,TimelineController:()=>ln,default:()=>fa,getMediaSource:()=>Kt,isMSESupported:()=>ha,isSupported:()=>da})
var i,r,n,a,o,l={exports:{}}
i=/^(?=((?:[a-zA-Z0-9+\-.]+:)?))\1(?=((?:\/\/[^\/?#]*)?))\2(?=((?:(?:[^?#\/]*\/)*[^;?#\/]*)?))\3((?:;[^?#]*)?)(\?[^#]*)?(#[^]*)?$/,r=/^(?=([^\/?#]*))\1([^]*)$/,n=/(?:\/|^)\.(?=\/)/g,a=/(?:\/|^)\.\.\/(?!\.\.\/)[^\/]*(?=\/)/g,l.exports=o={buildAbsoluteURL:function(t,e,s){if(s=s||{},t=t.trim(),!(e=e.trim())){if(!s.alwaysNormalize)return t
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
return e?{scheme:e[1]||"",netLoc:e[2]||"",path:e[3]||"",params:e[4]||"",query:e[5]||"",fragment:e[6]||""}:null},normalizePath:function(t){for(t=t.split("").reverse().join("").replace(n,"");t.length!==(t=t.replace(a,"")).length;);return t.split("").reverse().join("")},buildURLFromParts:function(t){return t.scheme+t.netLoc+t.path+t.params+t.query+t.fragment}}
var h=l.exports
function d(t,e){var s=Object.keys(t)
if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t)
e&&(i=i.filter((function(e){return Object.getOwnPropertyDescriptor(t,e).enumerable}))),s.push.apply(s,i)}return s}function c(t){for(var e=1;e<arguments.length;e++){var s=null!=arguments[e]?arguments[e]:{}
e%2?d(Object(s),!0).forEach((function(e){var i,r,n
i=t,r=e,n=s[e],(r=function(t){var e=function(t,e){if("object"!=typeof t||!t)return t
var s=t[Symbol.toPrimitive]
if(void 0!==s){var i=s.call(t,"string")
if("object"!=typeof i)return i
throw new TypeError("@@toPrimitive must return a primitive value.")}return String(t)}(t)
return"symbol"==typeof e?e:String(e)}(r))in i?Object.defineProperty(i,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):i[r]=n})):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(s)):d(Object(s)).forEach((function(e){Object.defineProperty(t,e,Object.getOwnPropertyDescriptor(s,e))}))}return t}function u(){return u=Object.assign?Object.assign.bind():function(t){for(var e=1;e<arguments.length;e++){var s=arguments[e]
for(var i in s)Object.prototype.hasOwnProperty.call(s,i)&&(t[i]=s[i])}return t},u.apply(this,arguments)}const f=Number.isFinite||function(t){return"number"==typeof t&&isFinite(t)},g=Number.isSafeInteger||function(t){return"number"==typeof t&&Math.abs(t)<=m},m=Number.MAX_SAFE_INTEGER||9007199254740991
let p=function(t){return t.MEDIA_ATTACHING="hlsMediaAttaching",t.MEDIA_ATTACHED="hlsMediaAttached",t.MEDIA_DETACHING="hlsMediaDetaching",t.MEDIA_DETACHED="hlsMediaDetached",t.BUFFER_RESET="hlsBufferReset",t.BUFFER_CODECS="hlsBufferCodecs",t.BUFFER_CREATED="hlsBufferCreated",t.BUFFER_APPENDING="hlsBufferAppending",t.BUFFER_APPENDED="hlsBufferAppended",t.BUFFER_EOS="hlsBufferEos",t.BUFFER_FLUSHING="hlsBufferFlushing",t.BUFFER_FLUSHED="hlsBufferFlushed",t.MANIFEST_LOADING="hlsManifestLoading",t.MANIFEST_LOADED="hlsManifestLoaded",t.MANIFEST_PARSED="hlsManifestParsed",t.LEVEL_SWITCHING="hlsLevelSwitching",t.LEVEL_SWITCHED="hlsLevelSwitched",t.LEVEL_LOADING="hlsLevelLoading",t.LEVEL_LOADED="hlsLevelLoaded",t.LEVEL_UPDATED="hlsLevelUpdated",t.LEVEL_PTS_UPDATED="hlsLevelPtsUpdated",t.LEVELS_UPDATED="hlsLevelsUpdated",t.AUDIO_TRACKS_UPDATED="hlsAudioTracksUpdated",t.AUDIO_TRACK_SWITCHING="hlsAudioTrackSwitching",t.AUDIO_TRACK_SWITCHED="hlsAudioTrackSwitched",t.AUDIO_TRACK_LOADING="hlsAudioTrackLoading",t.AUDIO_TRACK_LOADED="hlsAudioTrackLoaded",t.SUBTITLE_TRACKS_UPDATED="hlsSubtitleTracksUpdated",t.SUBTITLE_TRACKS_CLEARED="hlsSubtitleTracksCleared",t.SUBTITLE_TRACK_SWITCH="hlsSubtitleTrackSwitch",t.SUBTITLE_TRACK_LOADING="hlsSubtitleTrackLoading",t.SUBTITLE_TRACK_LOADED="hlsSubtitleTrackLoaded",t.SUBTITLE_FRAG_PROCESSED="hlsSubtitleFragProcessed",t.CUES_PARSED="hlsCuesParsed",t.NON_NATIVE_TEXT_TRACKS_FOUND="hlsNonNativeTextTracksFound",t.INIT_PTS_FOUND="hlsInitPtsFound",t.FRAG_LOADING="hlsFragLoading",t.FRAG_LOAD_EMERGENCY_ABORTED="hlsFragLoadEmergencyAborted",t.FRAG_LOADED="hlsFragLoaded",t.FRAG_DECRYPTED="hlsFragDecrypted",t.FRAG_PARSING_INIT_SEGMENT="hlsFragParsingInitSegment",t.FRAG_PARSING_USERDATA="hlsFragParsingUserdata",t.FRAG_PARSING_METADATA="hlsFragParsingMetadata",t.FRAG_PARSED="hlsFragParsed",t.FRAG_BUFFERED="hlsFragBuffered",t.FRAG_CHANGED="hlsFragChanged",t.FPS_DROP="hlsFpsDrop",t.FPS_DROP_LEVEL_CAPPING="hlsFpsDropLevelCapping",t.MAX_AUTO_LEVEL_UPDATED="hlsMaxAutoLevelUpdated",t.ERROR="hlsError",t.DESTROYING="hlsDestroying",t.KEY_LOADING="hlsKeyLoading",t.KEY_LOADED="hlsKeyLoaded",t.LIVE_BACK_BUFFER_REACHED="hlsLiveBackBufferReached",t.BACK_BUFFER_REACHED="hlsBackBufferReached",t.STEERING_MANIFEST_LOADED="hlsSteeringManifestLoaded",t}({}),y=function(t){return t.NETWORK_ERROR="networkError",t.MEDIA_ERROR="mediaError",t.KEY_SYSTEM_ERROR="keySystemError",t.MUX_ERROR="muxError",t.OTHER_ERROR="otherError",t}({}),v=function(t){return t.KEY_SYSTEM_NO_KEYS="keySystemNoKeys",t.KEY_SYSTEM_NO_ACCESS="keySystemNoAccess",t.KEY_SYSTEM_NO_SESSION="keySystemNoSession",t.KEY_SYSTEM_NO_CONFIGURED_LICENSE="keySystemNoConfiguredLicense",t.KEY_SYSTEM_LICENSE_REQUEST_FAILED="keySystemLicenseRequestFailed",t.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED="keySystemServerCertificateRequestFailed",t.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED="keySystemServerCertificateUpdateFailed",t.KEY_SYSTEM_SESSION_UPDATE_FAILED="keySystemSessionUpdateFailed",t.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED="keySystemStatusOutputRestricted",t.KEY_SYSTEM_STATUS_INTERNAL_ERROR="keySystemStatusInternalError",t.MANIFEST_LOAD_ERROR="manifestLoadError",t.MANIFEST_LOAD_TIMEOUT="manifestLoadTimeOut",t.MANIFEST_PARSING_ERROR="manifestParsingError",t.MANIFEST_INCOMPATIBLE_CODECS_ERROR="manifestIncompatibleCodecsError",t.LEVEL_EMPTY_ERROR="levelEmptyError",t.LEVEL_LOAD_ERROR="levelLoadError",t.LEVEL_LOAD_TIMEOUT="levelLoadTimeOut",t.LEVEL_PARSING_ERROR="levelParsingError",t.LEVEL_SWITCH_ERROR="levelSwitchError",t.AUDIO_TRACK_LOAD_ERROR="audioTrackLoadError",t.AUDIO_TRACK_LOAD_TIMEOUT="audioTrackLoadTimeOut",t.SUBTITLE_LOAD_ERROR="subtitleTrackLoadError",t.SUBTITLE_TRACK_LOAD_TIMEOUT="subtitleTrackLoadTimeOut",t.FRAG_LOAD_ERROR="fragLoadError",t.FRAG_LOAD_TIMEOUT="fragLoadTimeOut",t.FRAG_DECRYPT_ERROR="fragDecryptError",t.FRAG_PARSING_ERROR="fragParsingError",t.FRAG_GAP="fragGap",t.REMUX_ALLOC_ERROR="remuxAllocError",t.KEY_LOAD_ERROR="keyLoadError",t.KEY_LOAD_TIMEOUT="keyLoadTimeOut",t.BUFFER_ADD_CODEC_ERROR="bufferAddCodecError",t.BUFFER_INCOMPATIBLE_CODECS_ERROR="bufferIncompatibleCodecsError",t.BUFFER_APPEND_ERROR="bufferAppendError",t.BUFFER_APPENDING_ERROR="bufferAppendingError",t.BUFFER_STALLED_ERROR="bufferStalledError",t.BUFFER_FULL_ERROR="bufferFullError",t.BUFFER_SEEK_OVER_HOLE="bufferSeekOverHole",t.BUFFER_NUDGE_ON_STALL="bufferNudgeOnStall",t.INTERNAL_EXCEPTION="internalException",t.INTERNAL_ABORTED="aborted",t.UNKNOWN="unknown",t}({})
const E=function(){},T={trace:E,debug:E,log:E,warn:E,info:E,error:E}
let S=T
const A=S,L=/^(\d+)x(\d+)$/,R=/(.+?)=(".*?"|.*?)(?:,|$)/g
class b{constructor(t){"string"==typeof t&&(t=b.parseAttrList(t)),u(this,t)}get clientAttrs(){return Object.keys(this).filter((t=>"X-"===t.substring(0,2)))}decimalInteger(t){const e=parseInt(this[t],10)
return e>Number.MAX_SAFE_INTEGER?1/0:e}hexadecimalInteger(t){if(this[t]){let e=(this[t]||"0x").slice(2)
e=(1&e.length?"0":"")+e
const s=new Uint8Array(e.length/2)
for(let t=0;t<e.length/2;t++)s[t]=parseInt(e.slice(2*t,2*t+2),16)
return s}return null}hexadecimalIntegerAsNumber(t){const e=parseInt(this[t],16)
return e>Number.MAX_SAFE_INTEGER?1/0:e}decimalFloatingPoint(t){return parseFloat(this[t])}optionalFloat(t,e){const s=this[t]
return s?parseFloat(s):e}enumeratedString(t){return this[t]}bool(t){return"YES"===this[t]}decimalResolution(t){const e=L.exec(this[t])
if(null!==e)return{width:parseInt(e[1],10),height:parseInt(e[2],10)}}static parseAttrList(t){let e
const s={}
for(R.lastIndex=0;null!==(e=R.exec(t));){let t=e[2]
0===t.indexOf('"')&&t.lastIndexOf('"')===t.length-1&&(t=t.slice(1,-1)),s[e[1].trim()]=t}return s}}function D(t){return"SCTE35-OUT"===t||"SCTE35-IN"===t}class k{constructor(t,e){if(this.attr=void 0,this._startDate=void 0,this._endDate=void 0,this._badValueForSameId=void 0,e){const s=e.attr
for(const e in s)if(Object.prototype.hasOwnProperty.call(t,e)&&t[e]!==s[e]){A.warn(`DATERANGE tag attribute: "${e}" does not match for tags with ID: "${t.ID}"`),this._badValueForSameId=e
break}t=u(new b({}),s,t)}if(this.attr=t,this._startDate=new Date(t["START-DATE"]),"END-DATE"in this.attr){const t=new Date(this.attr["END-DATE"])
f(t.getTime())&&(this._endDate=t)}}get id(){return this.attr.ID}get class(){return this.attr.CLASS}get startDate(){return this._startDate}get endDate(){if(this._endDate)return this._endDate
const t=this.duration
return null!==t?new Date(this._startDate.getTime()+1e3*t):null}get duration(){if("DURATION"in this.attr){const t=this.attr.decimalFloatingPoint("DURATION")
if(f(t))return t}else if(this._endDate)return(this._endDate.getTime()-this._startDate.getTime())/1e3
return null}get plannedDuration(){return"PLANNED-DURATION"in this.attr?this.attr.decimalFloatingPoint("PLANNED-DURATION"):null}get endOnNext(){return this.attr.bool("END-ON-NEXT")}get isValid(){return!!this.id&&!this._badValueForSameId&&f(this.startDate.getTime())&&(null===this.duration||this.duration>=0)&&(!this.endOnNext||!!this.class)}}class I{constructor(){this.aborted=!1,this.loaded=0,this.retry=0,this.total=0,this.chunkCount=0,this.bwEstimate=0,this.loading={start:0,first:0,end:0},this.parsing={start:0,end:0},this.buffering={start:0,first:0,end:0}}}var C={AUDIO:"audio",VIDEO:"video",AUDIOVIDEO:"audiovideo"}
class w{constructor(t){this._byteRange=null,this._url=null,this.baseurl=void 0,this.relurl=void 0,this.elementaryStreams={[C.AUDIO]:null,[C.VIDEO]:null,[C.AUDIOVIDEO]:null},this.baseurl=t}setByteRange(t,e){const s=t.split("@",2)
let i
i=1===s.length?(null==e?void 0:e.byteRangeEndOffset)||0:parseInt(s[1]),this._byteRange=[i,parseInt(s[0])+i]}get byteRange(){return this._byteRange?this._byteRange:[]}get byteRangeStartOffset(){return this.byteRange[0]}get byteRangeEndOffset(){return this.byteRange[1]}get url(){return!this._url&&this.baseurl&&this.relurl&&(this._url=h.buildAbsoluteURL(this.baseurl,this.relurl,{alwaysNormalize:!0})),this._url||""}set url(t){this._url=t}}class _ extends w{constructor(t,e){super(e),this._decryptdata=null,this.rawProgramDateTime=null,this.programDateTime=null,this.tagList=[],this.duration=0,this.sn=0,this.levelkeys=void 0,this.type=void 0,this.loader=null,this.keyLoader=null,this.level=-1,this.cc=0,this.startPTS=void 0,this.endPTS=void 0,this.startDTS=void 0,this.endDTS=void 0,this.start=0,this.deltaPTS=void 0,this.maxStartPTS=void 0,this.minEndPTS=void 0,this.stats=new I,this.data=void 0,this.bitrateTest=!1,this.title=null,this.initSegment=null,this.endList=void 0,this.gap=void 0,this.urlId=0,this.type=t}get decryptdata(){const{levelkeys:t}=this
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
t[C.AUDIO]=null,t[C.VIDEO]=null,t[C.AUDIOVIDEO]=null}}class x extends w{constructor(t,e,s,i,r){super(s),this.fragOffset=0,this.duration=0,this.gap=!1,this.independent=!1,this.relurl=void 0,this.fragment=void 0,this.index=void 0,this.stats=new I,this.duration=t.decimalFloatingPoint("DURATION"),this.gap=t.bool("GAP"),this.independent=t.bool("INDEPENDENT"),this.relurl=t.enumeratedString("URI"),this.fragment=e,this.index=i
const n=t.enumeratedString("BYTERANGE")
n&&this.setByteRange(n,r),r&&(this.fragOffset=r.fragOffset+r.duration)}get start(){return this.fragment.start+this.fragOffset}get end(){return this.start+this.duration}get loaded(){const{elementaryStreams:t}=this
return!!(t.audio||t.video||t.audiovideo)}}class P{constructor(t){this.PTSKnown=!1,this.alignedSliding=!1,this.averagetargetduration=void 0,this.endCC=0,this.endSN=0,this.fragments=void 0,this.fragmentHint=void 0,this.partList=null,this.dateRanges=void 0,this.live=!0,this.ageHeader=0,this.advancedDateTime=void 0,this.updated=!0,this.advanced=!0,this.availabilityDelay=void 0,this.misses=0,this.startCC=0,this.startSN=0,this.startTimeOffset=null,this.targetduration=0,this.totalduration=0,this.type=null,this.url=void 0,this.m3u8="",this.version=null,this.canBlockReload=!1,this.canSkipUntil=0,this.canSkipDateRanges=!1,this.skippedSegments=0,this.recentlyRemovedDateranges=void 0,this.partHoldBack=0,this.holdBack=0,this.partTarget=0,this.preloadHint=void 0,this.renditionReports=void 0,this.tuneInGoal=0,this.deltaUpdateFailed=void 0,this.driftStartTime=0,this.driftEndTime=0,this.driftStart=0,this.driftEnd=0,this.encryptedFragments=void 0,this.playlistParsingError=null,this.variableList=null,this.hasVariableRefs=!1,this.fragments=[],this.encryptedFragments=[],this.dateRanges={},this.url=t}reloaded(t){if(!t)return this.advanced=!0,void(this.updated=!0)
const e=this.lastPartSn-t.lastPartSn,s=this.lastPartIndex-t.lastPartIndex
this.updated=this.endSN!==t.endSN||!!s||!!e||!this.live,this.advanced=this.endSN>t.endSN||e>0||0===e&&s>0,this.updated||this.advanced?this.misses=Math.floor(.6*t.misses):this.misses=t.misses+1,this.availabilityDelay=t.availabilityDelay}get hasProgramDateTime(){return!!this.fragments.length&&f(this.fragments[this.fragments.length-1].programDateTime)}get levelTargetDuration(){return this.averagetargetduration||this.targetduration||10}get drift(){const t=this.driftEndTime-this.driftStartTime
return t>0?1e3*(this.driftEnd-this.driftStart)/t:1}get edge(){return this.partEnd||this.fragmentEnd}get partEnd(){var t
return null!=(t=this.partList)&&t.length?this.partList[this.partList.length-1].end:this.fragmentEnd}get fragmentEnd(){var t
return null!=(t=this.fragments)&&t.length?this.fragments[this.fragments.length-1].end:0}get age(){return this.advancedDateTime?Math.max(Date.now()-this.advancedDateTime,0)/1e3:0}get lastPartIndex(){var t
return null!=(t=this.partList)&&t.length?this.partList[this.partList.length-1].index:-1}get lastPartSn(){var t
return null!=(t=this.partList)&&t.length?this.partList[this.partList.length-1].fragment.sn:this.endSN}}function M(t){return Uint8Array.from(atob(t),(t=>t.charCodeAt(0)))}function F(t){return Uint8Array.from(unescape(encodeURIComponent(t)),(t=>t.charCodeAt(0)))}const O="undefined"!=typeof self?self:void 0
var N={CLEARKEY:"org.w3.clearkey",FAIRPLAY:"com.apple.fps",PLAYREADY:"com.microsoft.playready",WIDEVINE:"com.widevine.alpha"},U={CLEARKEY:"org.w3.clearkey",FAIRPLAY:"com.apple.streamingkeydelivery",PLAYREADY:"com.microsoft.playready",WIDEVINE:"urn:uuid:edef8ba9-79d6-4ace-a3c8-27dcd51d21ed"}
function B(t){switch(t){case U.FAIRPLAY:return N.FAIRPLAY
case U.PLAYREADY:return N.PLAYREADY
case U.WIDEVINE:return N.WIDEVINE
case U.CLEARKEY:return N.CLEARKEY}}var $="edef8ba979d64acea3c827dcd51d21ed"
function G(t){return t===$?N.WIDEVINE:"9a04f07998404286ab92e65be0885f95"===t?N.PLAYREADY:"1077efecc0b24d02ace33c1e52e2fb4b"===t||"e2719d58a985b3c9781ab030af78d30e"===t?N.CLEARKEY:void 0}function K(t){switch(t){case N.FAIRPLAY:return U.FAIRPLAY
case N.PLAYREADY:return U.PLAYREADY
case N.WIDEVINE:return U.WIDEVINE
case N.CLEARKEY:return U.CLEARKEY}}function H(t){const{drmSystems:e,widevineLicenseUrl:s}=t,i=e?[N.FAIRPLAY,N.WIDEVINE,N.PLAYREADY,N.CLEARKEY].filter((t=>!!e[t])):[]
return!i[N.WIDEVINE]&&s&&i.push(N.WIDEVINE),i}const V=null!=O&&null!=(Y=O.navigator)&&Y.requestMediaKeySystemAccess?self.navigator.requestMediaKeySystemAccess.bind(self.navigator):null
var Y
function W(t,e,s){return Uint8Array.prototype.slice?t.slice(e,s):new Uint8Array(Array.prototype.slice.call(t,e,s))}const j=(t,e)=>e+10<=t.length&&73===t[e]&&68===t[e+1]&&51===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128,q=(t,e)=>e+10<=t.length&&51===t[e]&&68===t[e+1]&&73===t[e+2]&&t[e+3]<255&&t[e+4]<255&&t[e+6]<128&&t[e+7]<128&&t[e+8]<128&&t[e+9]<128,X=(t,e)=>{const s=e
let i=0
for(;j(t,e);)i+=10,i+=z(t,e+6),q(t,e+10)&&(i+=10),e+=i
if(i>0)return t.subarray(s,s+i)},z=(t,e)=>{let s=0
return s=(127&t[e])<<21,s|=(127&t[e+1])<<14,s|=(127&t[e+2])<<7,s|=127&t[e+3],s},Q=(t,e)=>j(t,e)&&z(t,e+6)+10<=t.length-e,J=t=>{const e=et(t)
for(let s=0;s<e.length;s++){const t=e[s]
if(Z(t))return at(t)}},Z=t=>t&&"PRIV"===t.key&&"com.apple.streaming.transportStreamTimestamp"===t.info,tt=t=>{const e=String.fromCharCode(t[0],t[1],t[2],t[3]),s=z(t,4)
return{type:e,size:s,data:t.subarray(10,10+s)}},et=t=>{let e=0
const s=[]
for(;j(t,e);){const i=z(t,e+6)
e+=10
const r=e+i
for(;e+8<r;){const i=tt(t.subarray(e)),r=st(i)
r&&s.push(r),e+=i.size+10}q(t,e)&&(e+=10)}return s},st=t=>"PRIV"===t.type?it(t):"W"===t.type[0]?nt(t):rt(t),it=t=>{if(t.size<2)return
const e=ot(t.data,!0),s=new Uint8Array(t.data.subarray(e.length+1))
return{key:t.type,info:e,data:s.buffer}},rt=t=>{if(t.size<2)return
if("TXXX"===t.type){let e=1
const s=ot(t.data.subarray(e),!0)
e+=s.length+1
const i=ot(t.data.subarray(e))
return{key:t.type,info:s,data:i}}const e=ot(t.data.subarray(1))
return{key:t.type,data:e}},nt=t=>{if("WXXX"===t.type){if(t.size<2)return
let e=1
const s=ot(t.data.subarray(e),!0)
e+=s.length+1
const i=ot(t.data.subarray(e))
return{key:t.type,info:s,data:i}}const e=ot(t.data)
return{key:t.type,data:e}},at=t=>{if(8===t.data.byteLength){const e=new Uint8Array(t.data),s=1&e[3]
let i=(e[4]<<23)+(e[5]<<15)+(e[6]<<7)+e[7]
return i/=45,s&&(i+=47721858.84),Math.round(i)}},ot=(t,e=!1)=>{const s=function(){if(!navigator.userAgent.includes("PlayStation 4"))return lt||void 0===self.TextDecoder||(lt=new self.TextDecoder("utf-8")),lt}()
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
let lt
const ht={hexDump:function(t){let e=""
for(let s=0;s<t.length;s++){let i=t[s].toString(16)
i.length<2&&(i="0"+i),e+=i}return e}},dt=Math.pow(2,32)-1,ct=[].push,ut={video:1,audio:2,id3:3,text:4}
function ft(t){return String.fromCharCode.apply(null,t)}function gt(t,e){const s=t[e]<<8|t[e+1]
return s<0?65536+s:s}function mt(t,e){const s=yt(t,e)
return s<0?4294967296+s:s}function pt(t,e){let s=mt(t,e)
return s*=Math.pow(2,32),s+=mt(t,e+4),s}function yt(t,e){return t[e]<<24|t[e+1]<<16|t[e+2]<<8|t[e+3]}function vt(t,e,s){t[e]=s>>24,t[e+1]=s>>16&255,t[e+2]=s>>8&255,t[e+3]=255&s}function Et(t,e){const s=[]
if(!e.length)return s
const i=t.byteLength
for(let r=0;r<i;){const n=mt(t,r),a=n>1?r+n:i
if(ft(t.subarray(r+4,r+8))===e[0])if(1===e.length)s.push(t.subarray(r+8,a))
else{const i=Et(t.subarray(r+8,a),e.slice(1))
i.length&&ct.apply(s,i)}r=a}return s}function Tt(t){const e=[],s=t[0]
let i=8
const r=mt(t,i)
i+=4
let n=0,a=0
0===s?(n=mt(t,i),a=mt(t,i+4),i+=8):(n=pt(t,i),a=pt(t,i+8),i+=16),i+=2
let o=t.length+a
const l=gt(t,i)
i+=2
for(let h=0;h<l;h++){let s=i
const n=mt(t,s)
s+=4
const a=2147483647&n
if(1==(2147483648&n)>>>31)return A.warn("SIDX has hierarchical references (not supported)"),null
const l=mt(t,s)
s+=4,e.push({referenceSize:a,subsegmentDuration:l,info:{duration:l/r,start:o,end:o+a-1}}),o+=a,s+=4,i=s}return{earliestPresentationTime:n,timescale:r,version:s,referencesCount:l,references:e}}function St(t){const e=[],s=Et(t,["moov","trak"])
for(let i=0;i<s.length;i++){const t=s[i],r=Et(t,["tkhd"])[0]
if(r){let s=r[0]
const i=mt(r,0===s?12:20),n=Et(t,["mdia","mdhd"])[0]
if(n){s=n[0]
const r=mt(n,0===s?12:20),a=Et(t,["mdia","hdlr"])[0]
if(a){const s=ft(a.subarray(8,12)),n={soun:C.AUDIO,vide:C.VIDEO}[s]
if(n){const s=At(Et(t,["mdia","minf","stbl","stsd"])[0])
e[i]={timescale:r,type:n},e[n]=c({timescale:r,id:i},s)}}}}}return Et(t,["moov","mvex","trex"]).forEach((t=>{const s=mt(t,4),i=e[s]
i&&(i.default={duration:mt(t,12),flags:mt(t,20)})})),e}function At(t){const e=t.subarray(8),s=e.subarray(86),i=ft(e.subarray(4,8))
let r=i
const n="enca"===i||"encv"===i
if(n){const t=Et(e,[i])[0]
Et(t.subarray("enca"===i?28:78),["sinf"]).forEach((t=>{const e=Et(t,["schm"])[0]
if(e){const s=ft(e.subarray(4,8))
if("cbcs"===s||"cenc"===s){const e=Et(t,["frma"])[0]
e&&(r=ft(e))}}}))}switch(r){case"avc1":case"avc2":case"avc3":case"avc4":{const t=Et(s,["avcC"])[0]
r+="."+Rt(t[1])+Rt(t[2])+Rt(t[3])
break}case"mp4a":{const t=Et(e,[i])[0],s=Et(t.subarray(28),["esds"])[0]
if(s&&s.length>12){let t=4
if(3!==s[t++])break
t=Lt(s,t),t+=2
const e=s[t++]
if(128&e&&(t+=2),64&e&&(t+=s[t++]),4!==s[t++])break
t=Lt(s,t)
const i=s[t++]
if(64!==i)break
if(r+="."+Rt(i),t+=12,5!==s[t++])break
t=Lt(s,t)
const n=s[t++]
let a=(248&n)>>3
31===a&&(a+=1+((7&n)<<3)+((224&s[t])>>5)),r+="."+a}break}case"hvc1":case"hev1":{const t=Et(s,["hvcC"])[0],e=t[1],i=["","A","B","C"][e>>6],n=31&e,a=mt(t,2),o=(32&e)>>5?"H":"L",l=t[12],h=t.subarray(6,12)
r+="."+i+n,r+="."+a.toString(16).toUpperCase(),r+="."+o+l
let d=""
for(let s=h.length;s--;){const t=h[s];(t||d)&&(d="."+t.toString(16).toUpperCase()+d)}r+=d
break}case"dvh1":case"dvhe":{const t=Et(s,["dvcC"])[0],e=t[2]>>1&127,i=t[2]<<5&32|t[3]>>3&31
r+="."+bt(e)+"."+bt(i)
break}case"vp09":{const t=Et(s,["vpcC"])[0],e=t[4],i=t[5],n=t[6]>>4&15
r+="."+bt(e)+"."+bt(i)+"."+bt(n)
break}case"av01":{const t=Et(s,["av1C"])[0],e=t[1]>>>5,i=31&t[1],n=t[2]>>>7?"H":"M",a=(64&t[2])>>6,o=(32&t[2])>>5,l=2===e&&a?o?12:10:a?10:8,h=(16&t[2])>>4,d=(8&t[2])>>3,c=(4&t[2])>>2,u=3&t[2],f=1,g=1,m=1,p=0
r+="."+e+"."+bt(i)+n+"."+bt(l)+"."+h+"."+d+c+u+"."+bt(f)+"."+bt(g)+"."+bt(m)+"."+p
break}}return{codec:r,encrypted:n}}function Lt(t,e){const s=e+5
for(;128&t[e++]&&e<s;);return e}function Rt(t){return("0"+t.toString(16).toUpperCase()).slice(-2)}function bt(t){return(t<10?"0":"")+t}function Dt(t){const e=Et(t,["schm"])[0]
if(e){const s=ft(e.subarray(4,8))
if("cbcs"===s||"cenc"===s)return Et(t,["schi","tenc"])[0]}return null}function kt(t){const e=mt(t,0)
let s=8
1&e&&(s+=4),4&e&&(s+=4)
let i=0
const r=mt(t,4)
for(let n=0;n<r;n++)256&e&&(i+=mt(t,s),s+=4),512&e&&(s+=4),1024&e&&(s+=4),2048&e&&(s+=4)
return i}function It(t,e){const s=new Uint8Array(t.length+e.length)
return s.set(t),s.set(e,t.length),s}function Ct(t,e){const s=[],i=e.samples,r=e.timescale,n=e.id
let a=!1
return Et(i,["moof"]).map((o=>{const l=o.byteOffset-8
Et(o,["traf"]).map((o=>{const h=Et(o,["tfdt"]).map((t=>{const e=t[0]
let s=mt(t,4)
return 1===e&&(s*=Math.pow(2,32),s+=mt(t,8)),s/r}))[0]
return void 0!==h&&(t=h),Et(o,["tfhd"]).map((h=>{const d=mt(h,4),c=16777215&mt(h,0)
let u=0
const f=0!=(16&c)
let g=0
const m=0!=(32&c)
let p=8
d===n&&(0!=(1&c)&&(p+=8),0!=(2&c)&&(p+=4),0!=(8&c)&&(u=mt(h,p),p+=4),f&&(g=mt(h,p),p+=4),m&&(p+=4),"video"===e.type&&(a=function(t){if(!t)return!1
const e=t.indexOf("."),s=e<0?t:t.substring(0,e)
return"hvc1"===s||"hev1"===s||"dvh1"===s||"dvhe"===s}(e.codec)),Et(o,["trun"]).map((n=>{const o=n[0],h=16777215&mt(n,0),d=0!=(1&h)
let c=0
const f=0!=(4&h),m=0!=(256&h)
let p=0
const y=0!=(512&h)
let v=0
const E=0!=(1024&h),T=0!=(2048&h)
let S=0
const A=mt(n,4)
let L=8
d&&(c=mt(n,L),L+=4),f&&(L+=4)
let R=c+l
for(let l=0;l<A;l++){if(m?(p=mt(n,L),L+=4):p=u,y?(v=mt(n,L),L+=4):v=g,E&&(L+=4),T&&(S=0===o?mt(n,L):yt(n,L),L+=4),e.type===C.VIDEO){let e=0
for(;e<v;){const n=mt(i,R)
R+=4,wt(a,i[R])&&_t(i.subarray(R,R+n),a?2:1,t+S/r,s),R+=n,e+=n+4}}t+=p/r}})))}))}))})),s}function wt(t,e){if(t){const t=e>>1&63
return 39===t||40===t}return 6==(31&e)}function _t(t,e,s,i){const r=xt(t)
let n=0
n+=e
let a=0,o=0,l=0
for(;n<r.length;){a=0
do{if(n>=r.length)break
l=r[n++],a+=l}while(255===l)
o=0
do{if(n>=r.length)break
l=r[n++],o+=l}while(255===l)
const t=r.length-n
let e=n
if(o<t)n+=o
else if(o>t){A.error(`Malformed SEI payload. ${o} is too small, only ${t} bytes left to parse.`)
break}if(4===a){if(181===r[e++]){const t=gt(r,e)
if(e+=2,49===t){const t=mt(r,e)
if(e+=4,1195456820===t){const t=r[e++]
if(3===t){const n=r[e++],o=64&n,l=o?2+3*(31&n):0,h=new Uint8Array(l)
if(o){h[0]=n
for(let t=1;t<l;t++)h[t]=r[e++]}i.push({type:t,payloadType:a,pts:s,bytes:h})}}}}}else if(5===a&&o>16){const t=[]
for(let s=0;s<16;s++){const i=r[e++].toString(16)
t.push(1==i.length?"0"+i:i),3!==s&&5!==s&&7!==s&&9!==s||t.push("-")}const n=o-16,l=new Uint8Array(n)
for(let s=0;s<n;s++)l[s]=r[e++]
i.push({payloadType:a,pts:s,uuid:t.join(""),userData:ot(l),userDataBytes:l})}}}function xt(t){const e=t.byteLength,s=[]
let i=1
for(;i<e-2;)0===t[i]&&0===t[i+1]&&3===t[i+2]?(s.push(i+2),i+=2):i++
if(0===s.length)return t
const r=e-s.length,n=new Uint8Array(r)
let a=0
for(i=0;i<r;a++,i++)a===s[0]&&(a++,s.shift()),n[i]=t[a]
return n}function Pt(t){const e=t.getUint32(0),s=t.byteOffset,i=t.byteLength
if(i<e)return{offset:s,size:i}
if(1886614376!==t.getUint32(4))return{offset:s,size:e}
const r=t.getUint32(8)>>>24
if(0!==r&&1!==r)return{offset:s,size:e}
const n=t.buffer,a=ht.hexDump(new Uint8Array(n,s+12,16)),o=t.getUint32(28)
let l=null,h=null
if(0===r){if(e-32<o||o<22)return{offset:s,size:e}
h=new Uint8Array(n,s+32,o)}else if(1===r){if(!o||i<s+32+16*o+16)return{offset:s,size:e}
l=[]
for(let t=0;t<o;t++)l.push(new Uint8Array(n,s+32+16*t,16))}return{version:r,systemId:a,kids:l,data:h,offset:s,size:e}}let Mt={}
class Ft{static clearKeyUriToKeyIdMap(){Mt={}}constructor(t,e,s,i=[1],r=null){this.uri=void 0,this.method=void 0,this.keyFormat=void 0,this.keyFormatVersions=void 0,this.encrypted=void 0,this.isCommonEncryption=void 0,this.iv=null,this.key=null,this.keyId=null,this.pssh=null,this.method=t,this.uri=e,this.keyFormat=s,this.keyFormatVersions=i,this.iv=r,this.encrypted=!!t&&"NONE"!==t,this.isCommonEncryption=this.encrypted&&"AES-128"!==t}isSupported(){if(this.method){if("AES-128"===this.method||"NONE"===this.method)return!0
if("identity"===this.keyFormat)return"SAMPLE-AES"===this.method
switch(this.keyFormat){case U.FAIRPLAY:case U.WIDEVINE:case U.PLAYREADY:case U.CLEARKEY:return-1!==["ISO-23001-7","SAMPLE-AES","SAMPLE-AES-CENC","SAMPLE-AES-CTR"].indexOf(this.method)}}return!1}getDecryptData(t){if(!this.encrypted||!this.uri)return null
if("AES-128"===this.method&&this.uri&&!this.iv){"number"!=typeof t&&("AES-128"!==this.method||this.iv||A.warn(`missing IV for initialization segment with method="${this.method}" - compliance issue`),t=0)
const e=function(t){const e=new Uint8Array(16)
for(let s=12;s<16;s++)e[s]=t>>8*(15-s)&255
return e}(t)
return new Ft(this.method,this.uri,"identity",this.keyFormatVersions,e)}const e=function(t){const e=t.split(":")
let s=null
if("data"===e[0]&&2===e.length){const t=e[1].split(";"),i=t[t.length-1].split(",")
if(2===i.length){const e="base64"===i[0],r=i[1]
e?(t.splice(-1,1),s=M(r)):s=function(t){const e=F(t).subarray(0,16),s=new Uint8Array(16)
return s.set(e,16-e.length),s}(r)}}return s}(this.uri)
if(e)switch(this.keyFormat){case U.WIDEVINE:this.pssh=e,e.length>=22&&(this.keyId=e.subarray(e.length-22,e.length-6))
break
case U.PLAYREADY:{const t=new Uint8Array([154,4,240,121,152,64,66,134,171,146,230,91,224,136,95,149])
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
if(t){const e=M(t).subarray(0,16)
!function(t){const e=function(t,e,s){const i=t[e]
t[e]=t[s],t[s]=i}
e(t,0,3),e(t,1,2),e(t,4,5),e(t,6,7)}(e),this.keyId=e}}break}default:{let t=e.subarray(0,16)
if(16!==t.length){const e=new Uint8Array(16)
e.set(t,16-t.length),t=e}this.keyId=t
break}}if(!this.keyId||16!==this.keyId.byteLength){let t=Mt[this.uri]
if(!t){const e=Object.keys(Mt).length%Number.MAX_SAFE_INTEGER
t=new Uint8Array(16),new DataView(t.buffer,12,4).setUint32(0,e),Mt[this.uri]=t}this.keyId=t}return this}}const Ot=/\{\$([a-zA-Z0-9-_]+)\}/g
function Nt(t){return Ot.test(t)}function Ut(t,e,s){if(null!==t.variableList||t.hasVariableRefs)for(let i=s.length;i--;){const r=s[i],n=e[r]
n&&(e[r]=Bt(t,n))}}function Bt(t,e){if(null!==t.variableList||t.hasVariableRefs){const s=t.variableList
return e.replace(Ot,(e=>{const i=e.substring(2,e.length-1),r=null==s?void 0:s[i]
return void 0===r?(t.playlistParsingError||(t.playlistParsingError=new Error(`Missing preceding EXT-X-DEFINE tag for Variable Reference: "${i}"`)),e):r}))}return e}function $t(t,e,s){let i,r,n=t.variableList
if(n||(t.variableList=n={}),"QUERYPARAM"in e){i=e.QUERYPARAM
try{const t=new self.URL(s).searchParams
if(!t.has(i))throw new Error(`"${i}" does not match any query parameter in URI: "${s}"`)
r=t.get(i)}catch(e){t.playlistParsingError||(t.playlistParsingError=new Error(`EXT-X-DEFINE QUERYPARAM: ${e.message}`))}}else i=e.NAME,r=e.VALUE
i in n?t.playlistParsingError||(t.playlistParsingError=new Error(`EXT-X-DEFINE duplicate Variable Name declarations: "${i}"`)):n[i]=r||""}function Gt(t,e,s){const i=e.IMPORT
if(s&&i in s){let e=t.variableList
e||(t.variableList=e={}),e[i]=s[i]}else t.playlistParsingError||(t.playlistParsingError=new Error(`EXT-X-DEFINE IMPORT attribute not found in Multivariant Playlist: "${i}"`))}function Kt(t=!0){if("undefined"!=typeof self)return(t||!self.MediaSource)&&self.ManagedMediaSource||self.MediaSource||self.WebKitMediaSource}const Ht={audio:{a3ds:1,"ac-3":.95,"ac-4":1,alac:.9,alaw:1,dra1:1,"dts+":1,"dts-":1,dtsc:1,dtse:1,dtsh:1,"ec-3":.9,enca:1,fLaC:.9,flac:.9,FLAC:.9,g719:1,g726:1,m4ae:1,mha1:1,mha2:1,mhm1:1,mhm2:1,mlpa:1,mp4a:1,"raw ":1,Opus:1,opus:1,samr:1,sawb:1,sawp:1,sevc:1,sqcp:1,ssmv:1,twos:1,ulaw:1},video:{avc1:1,avc2:1,avc3:1,avc4:1,avcp:1,av01:.8,drac:1,dva1:1,dvav:1,dvh1:.7,dvhe:.7,encv:1,hev1:.75,hvc1:.75,mjp2:1,mp4v:1,mvc1:1,mvc2:1,mvc3:1,mvc4:1,resv:1,rv60:1,s263:1,svc1:1,svc2:1,"vc-1":1,vp08:1,vp09:.9},text:{stpp:1,wvtt:1}}
function Vt(t,e,s=!0){return!t.split(",").some((t=>!Yt(t,e,s)))}function Yt(t,e,s=!0){var i
const r=Kt(s)
return null!=(i=null==r?void 0:r.isTypeSupported(Wt(t,e)))&&i}function Wt(t,e){return`${e}/mp4;codecs="${t}"`}function jt(t){if(t){const e=t.substring(0,4)
return Ht.video[e]}return 2}function qt(t){return t.split(",").reduce(((t,e)=>{const s=Ht.video[e]
return s?(2*s+t)/(t?3:2):(Ht.audio[e]+t)/(t?2:1)}),0)}const Xt={},zt=/flac|opus/i
function Qt(t,e=!0){return t.replace(zt,(t=>function(t,e=!0){if(Xt[t])return Xt[t]
const s={flac:["flac","fLaC","FLAC"],opus:["opus","Opus"]}[t]
for(let i=0;i<s.length;i++)if(Yt(s[i],"audio",e))return Xt[t]=s[i],s[i]
return t}(t.toLowerCase(),e)))}function Jt(t,e){return t&&"mp4a"!==t?t:e?e.split(",")[0]:e}const Zt=/#EXT-X-STREAM-INF:([^\r\n]*)(?:[\r\n](?:#[^\r\n]*)?)*([^\r\n]+)|#EXT-X-(SESSION-DATA|SESSION-KEY|DEFINE|CONTENT-STEERING|START):([^\r\n]*)[\r\n]+/g,te=/#EXT-X-MEDIA:(.*)/g,ee=/^#EXT(?:INF|-X-TARGETDURATION):/m,se=new RegExp([/#EXTINF:\s*(\d*(?:\.\d+)?)(?:,(.*)\s+)?/.source,/(?!#) *(\S[^\r\n]*)/.source,/#EXT-X-BYTERANGE:*(.+)/.source,/#EXT-X-PROGRAM-DATE-TIME:(.+)/.source,/#.*/.source].join("|"),"g"),ie=new RegExp([/#(EXTM3U)/.source,/#EXT-X-(DATERANGE|DEFINE|KEY|MAP|PART|PART-INF|PLAYLIST-TYPE|PRELOAD-HINT|RENDITION-REPORT|SERVER-CONTROL|SKIP|START):(.+)/.source,/#EXT-X-(BITRATE|DISCONTINUITY-SEQUENCE|MEDIA-SEQUENCE|TARGETDURATION|VERSION): *(\d+)/.source,/#EXT-X-(DISCONTINUITY|ENDLIST|GAP|INDEPENDENT-SEGMENTS)/.source,/(#)([^:]*):(.*)/.source,/(#)(.*)(?:.*)\r?\n?/.source].join("|"))
class re{static findGroup(t,e){for(let s=0;s<t.length;s++){const i=t[s]
if(i.id===e)return i}}static resolve(t,e){return h.buildAbsoluteURL(e,t,{alwaysNormalize:!0})}static isMediaPlaylist(t){return ee.test(t)}static parseMasterPlaylist(t,e){const s={contentSteering:null,levels:[],playlistParsingError:null,sessionData:null,sessionKeys:null,startTimeOffset:null,variableList:null,hasVariableRefs:Nt(t)},i=[]
let r
for(Zt.lastIndex=0;null!=(r=Zt.exec(t));)if(r[1]){var n
const t=new b(r[1])
Ut(s,t,["CODECS","SUPPLEMENTAL-CODECS","ALLOWED-CPC","PATHWAY-ID","STABLE-VARIANT-ID","AUDIO","VIDEO","SUBTITLES","CLOSED-CAPTIONS","NAME"])
const a=Bt(s,r[2]),o={attrs:t,bitrate:t.decimalInteger("BANDWIDTH")||t.decimalInteger("AVERAGE-BANDWIDTH"),name:t.NAME,url:re.resolve(a,e)},l=t.decimalResolution("RESOLUTION")
l&&(o.width=l.width,o.height=l.height),oe(t.CODECS,o),null!=(n=o.unknownCodecs)&&n.length||i.push(o),s.levels.push(o)}else if(r[3]){const t=r[3],i=r[4]
switch(t){case"SESSION-DATA":{const t=new b(i)
Ut(s,t,["DATA-ID","LANGUAGE","VALUE","URI"])
const e=t["DATA-ID"]
e&&(null===s.sessionData&&(s.sessionData={}),s.sessionData[e]=t)
break}case"SESSION-KEY":{const t=ne(i,e,s)
t.encrypted&&t.isSupported()?(null===s.sessionKeys&&(s.sessionKeys=[]),s.sessionKeys.push(t)):A.warn(`[Keys] Ignoring invalid EXT-X-SESSION-KEY tag: "${i}"`)
break}case"DEFINE":{const t=new b(i)
Ut(s,t,["NAME","VALUE","QUERYPARAM"]),$t(s,t,e)}break
case"CONTENT-STEERING":{const t=new b(i)
Ut(s,t,["SERVER-URI","PATHWAY-ID"]),s.contentSteering={uri:re.resolve(t["SERVER-URI"],e),pathwayId:t["PATHWAY-ID"]||"."}
break}case"START":s.startTimeOffset=ae(i)}}const a=i.length>0&&i.length<s.levels.length
return s.levels=a?i:s.levels,0===s.levels.length&&(s.playlistParsingError=new Error("no levels found in manifest")),s}static parseMasterPlaylistMedia(t,e,s){let i
const r={},n=s.levels,a={AUDIO:n.map((t=>({id:t.attrs.AUDIO,audioCodec:t.audioCodec}))),SUBTITLES:n.map((t=>({id:t.attrs.SUBTITLES,textCodec:t.textCodec}))),"CLOSED-CAPTIONS":[]}
let o=0
for(te.lastIndex=0;null!==(i=te.exec(t));){const t=new b(i[1]),n=t.TYPE
if(n){const i=a[n],l=r[n]||[]
r[n]=l,Ut(s,t,["URI","GROUP-ID","LANGUAGE","ASSOC-LANGUAGE","STABLE-RENDITION-ID","NAME","INSTREAM-ID","CHARACTERISTICS","CHANNELS"])
const h=t.LANGUAGE,d=t["ASSOC-LANGUAGE"],c=t.CHANNELS,u=t.CHARACTERISTICS,f=t["INSTREAM-ID"],g={attrs:t,bitrate:0,id:o++,groupId:t["GROUP-ID"]||"",name:t.NAME||h||"",type:n,default:t.bool("DEFAULT"),autoselect:t.bool("AUTOSELECT"),forced:t.bool("FORCED"),lang:h,url:t.URI?re.resolve(t.URI,e):""}
if(d&&(g.assocLang=d),c&&(g.channels=c),u&&(g.characteristics=u),f&&(g.instreamId=f),null!=i&&i.length){const t=re.findGroup(i,g.groupId)||i[0]
le(g,t,"audioCodec"),le(g,t,"textCodec")}l.push(g)}}return r}static parseLevelPlaylist(t,e,s,i,r,n){const a=new P(e),o=a.fragments
let l,h,d,c=null,g=0,m=0,p=0,y=0,v=null,E=new _(i,e),T=-1,S=!1,L=null
for(se.lastIndex=0,a.m3u8=t,a.hasVariableRefs=Nt(t);null!==(l=se.exec(t));){S&&(S=!1,E=new _(i,e),E.start=p,E.sn=g,E.cc=y,E.level=s,c&&(E.initSegment=c,E.rawProgramDateTime=c.rawProgramDateTime,c.rawProgramDateTime=null,L&&(E.setByteRange(L),L=null)))
const t=l[1]
if(t){E.duration=parseFloat(t)
const e=(" "+l[2]).slice(1)
E.title=e||null,E.tagList.push(e?["INF",t,e]:["INF",t])}else if(l[3]){if(f(E.duration)){E.start=p,d&&ce(E,d,a),E.sn=g,E.level=s,E.cc=y,o.push(E)
const t=(" "+l[3]).slice(1)
E.relurl=Bt(a,t),he(E,v),v=E,p+=E.duration,g++,m=0,S=!0}}else if(l[4]){const t=(" "+l[4]).slice(1)
v?E.setByteRange(t,v):E.setByteRange(t)}else if(l[5])E.rawProgramDateTime=(" "+l[5]).slice(1),E.tagList.push(["PROGRAM-DATE-TIME",E.rawProgramDateTime]),-1===T&&(T=o.length)
else{if(l=l[0].match(ie),!l){A.warn("No matches on slow regex match for level playlist!")
continue}for(h=1;h<l.length&&void 0===l[h];h++);const t=(" "+l[h]).slice(1),r=(" "+l[h+1]).slice(1),p=l[h+2]?(" "+l[h+2]).slice(1):""
switch(t){case"PLAYLIST-TYPE":a.type=r.toUpperCase()
break
case"MEDIA-SEQUENCE":g=a.startSN=parseInt(r)
break
case"SKIP":{const t=new b(r)
Ut(a,t,["RECENTLY-REMOVED-DATERANGES"])
const e=t.decimalInteger("SKIPPED-SEGMENTS")
if(f(e)){a.skippedSegments=e
for(let t=e;t--;)o.unshift(null)
g+=e}const s=t.enumeratedString("RECENTLY-REMOVED-DATERANGES")
s&&(a.recentlyRemovedDateranges=s.split("\t"))
break}case"TARGETDURATION":a.targetduration=Math.max(parseInt(r),1)
break
case"VERSION":a.version=parseInt(r)
break
case"INDEPENDENT-SEGMENTS":case"EXTM3U":break
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
case"DATERANGE":{const t=new b(r)
Ut(a,t,["ID","CLASS","START-DATE","END-DATE","SCTE35-CMD","SCTE35-OUT","SCTE35-IN"]),Ut(a,t,t.clientAttrs)
const e=new k(t,a.dateRanges[t.ID])
e.isValid||a.skippedSegments?a.dateRanges[e.id]=e:A.warn(`Ignoring invalid DATERANGE tag: "${r}"`),E.tagList.push(["EXT-X-DATERANGE",r])
break}case"DEFINE":{const t=new b(r)
Ut(a,t,["NAME","VALUE","IMPORT","QUERYPARAM"]),"IMPORT"in t?Gt(a,t,n):$t(a,t,e)}break
case"DISCONTINUITY-SEQUENCE":y=parseInt(r)
break
case"KEY":{const t=ne(r,e,a)
if(t.isSupported()){if("NONE"===t.method){d=void 0
break}d||(d={}),d[t.keyFormat]&&(d=u({},d)),d[t.keyFormat]=t}else A.warn(`[Keys] Ignoring invalid EXT-X-KEY tag: "${r}"`)
break}case"START":a.startTimeOffset=ae(r)
break
case"MAP":{const t=new b(r)
if(Ut(a,t,["BYTERANGE","URI"]),E.duration){const r=new _(i,e)
de(r,t,s,d),c=r,E.initSegment=c,c.rawProgramDateTime&&!E.rawProgramDateTime&&(E.rawProgramDateTime=c.rawProgramDateTime)}else{const e=E.byteRangeEndOffset
if(e){const t=E.byteRangeStartOffset
L=`${e-t}@${t}`}else L=null
de(E,t,s,d),c=E,S=!0}break}case"SERVER-CONTROL":{const t=new b(r)
a.canBlockReload=t.bool("CAN-BLOCK-RELOAD"),a.canSkipUntil=t.optionalFloat("CAN-SKIP-UNTIL",0),a.canSkipDateRanges=a.canSkipUntil>0&&t.bool("CAN-SKIP-DATERANGES"),a.partHoldBack=t.optionalFloat("PART-HOLD-BACK",0),a.holdBack=t.optionalFloat("HOLD-BACK",0)
break}case"PART-INF":{const t=new b(r)
a.partTarget=t.decimalFloatingPoint("PART-TARGET")
break}case"PART":{let t=a.partList
t||(t=a.partList=[])
const s=m>0?t[t.length-1]:void 0,i=m++,n=new b(r)
Ut(a,n,["BYTERANGE","URI"])
const o=new x(n,E,e,i,s)
t.push(o),E.duration+=o.duration
break}case"PRELOAD-HINT":{const t=new b(r)
Ut(a,t,["URI"]),a.preloadHint=t
break}case"RENDITION-REPORT":{const t=new b(r)
Ut(a,t,["URI"]),a.renditionReports=a.renditionReports||[],a.renditionReports.push(t)
break}default:A.warn(`line parsed but not handled: ${l}`)}}}v&&!v.relurl?(o.pop(),p-=v.duration,a.partList&&(a.fragmentHint=v)):a.partList&&(he(E,v),E.cc=y,a.fragmentHint=E,d&&ce(E,d,a))
const R=o.length,D=o[0],I=o[R-1]
if(p+=a.skippedSegments*a.targetduration,p>0&&R&&I){a.averagetargetduration=p/R
const t=I.sn
a.endSN="initSegment"!==t?t:0,a.live||(I.endList=!0),D&&(a.startCC=D.cc)}else a.endSN=0,a.startCC=0
return a.fragmentHint&&(p+=a.fragmentHint.duration),a.totalduration=p,a.endCC=y,T>0&&function(t,e){let s=t[e]
for(let i=e;i--;){const e=t[i]
if(!e)return
e.programDateTime=s.programDateTime-1e3*e.duration,s=e}}(o,T),a}}function ne(t,e,s){var i,r
const n=new b(t)
Ut(s,n,["KEYFORMAT","KEYFORMATVERSIONS","URI","IV","URI"])
const a=null!=(i=n.METHOD)?i:"",o=n.URI,l=n.hexadecimalInteger("IV"),h=n.KEYFORMATVERSIONS,d=null!=(r=n.KEYFORMAT)?r:"identity"
o&&n.IV&&!l&&A.error(`Invalid IV: ${n.IV}`)
const c=o?re.resolve(o,e):"",u=(h||"1").split("/").map(Number).filter(Number.isFinite)
return new Ft(a,c,d,u,l)}function ae(t){const e=new b(t).decimalFloatingPoint("TIME-OFFSET")
return f(e)?e:null}function oe(t,e){let s=(t||"").split(/[ ,]+/).filter((t=>t));["video","audio","text"].forEach((t=>{const i=s.filter((e=>function(t,e){const s=Ht[e]
return!!s&&!!s[t.slice(0,4)]}(e,t)))
i.length&&(e[`${t}Codec`]=i.join(","),s=s.filter((t=>-1===i.indexOf(t))))})),e.unknownCodecs=s}function le(t,e,s){const i=e[s]
i&&(t[s]=i)}function he(t,e){t.rawProgramDateTime?t.programDateTime=Date.parse(t.rawProgramDateTime):null!=e&&e.programDateTime&&(t.programDateTime=e.endProgramDateTime),f(t.programDateTime)||(t.programDateTime=null,t.rawProgramDateTime=null)}function de(t,e,s,i){t.relurl=e.URI,e.BYTERANGE&&t.setByteRange(e.BYTERANGE),t.level=s,t.sn="initSegment",i&&(t.levelkeys=i),t.initSegment=null}function ce(t,e,s){t.levelkeys=e
const{encryptedFragments:i}=s
i.length&&i[i.length-1].levelkeys===e||!Object.keys(e).some((t=>e[t].isCommonEncryption))||i.push(t)}var ue={MANIFEST:"manifest",LEVEL:"level",AUDIO_TRACK:"audioTrack",SUBTITLE_TRACK:"subtitleTrack"},fe={MAIN:"main",AUDIO:"audio",SUBTITLE:"subtitle"}
function ge(t){const{type:e}=t
switch(e){case ue.AUDIO_TRACK:return fe.AUDIO
case ue.SUBTITLE_TRACK:return fe.SUBTITLE
default:return fe.MAIN}}function me(t,e){let s=t.url
return void 0!==s&&0!==s.indexOf("data:")||(s=e.url),s}class pe{constructor(t){this.hls=void 0,this.loaders=Object.create(null),this.variableList=null,this.hls=t,this.registerListeners()}startLoad(t){}stopLoad(){this.destroyInternalLoaders()}registerListeners(){const{hls:t}=this
t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.LEVEL_LOADING,this.onLevelLoading,this),t.on(p.AUDIO_TRACK_LOADING,this.onAudioTrackLoading,this),t.on(p.SUBTITLE_TRACK_LOADING,this.onSubtitleTrackLoading,this)}unregisterListeners(){const{hls:t}=this
t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.LEVEL_LOADING,this.onLevelLoading,this),t.off(p.AUDIO_TRACK_LOADING,this.onAudioTrackLoading,this),t.off(p.SUBTITLE_TRACK_LOADING,this.onSubtitleTrackLoading,this)}createInternalLoader(t){const e=this.hls.config,s=e.pLoader,i=e.loader,r=new(s||i)(e)
return this.loaders[t.type]=r,r}getInternalLoader(t){return this.loaders[t.type]}resetInternalLoader(t){this.loaders[t]&&delete this.loaders[t]}destroyInternalLoaders(){for(const t in this.loaders){const e=this.loaders[t]
e&&e.destroy(),this.resetInternalLoader(t)}}destroy(){this.variableList=null,this.unregisterListeners(),this.destroyInternalLoaders()}onManifestLoading(t,e){const{url:s}=e
this.variableList=null,this.load({id:null,level:0,responseType:"text",type:ue.MANIFEST,url:s,deliveryDirectives:null})}onLevelLoading(t,e){const{id:s,level:i,pathwayId:r,url:n,deliveryDirectives:a}=e
this.load({id:s,level:i,pathwayId:r,responseType:"text",type:ue.LEVEL,url:n,deliveryDirectives:a})}onAudioTrackLoading(t,e){const{id:s,groupId:i,url:r,deliveryDirectives:n}=e
this.load({id:s,groupId:i,level:null,responseType:"text",type:ue.AUDIO_TRACK,url:r,deliveryDirectives:n})}onSubtitleTrackLoading(t,e){const{id:s,groupId:i,url:r,deliveryDirectives:n}=e
this.load({id:s,groupId:i,level:null,responseType:"text",type:ue.SUBTITLE_TRACK,url:r,deliveryDirectives:n})}load(t){var e
const s=this.hls.config
let i,r=this.getInternalLoader(t)
if(r){const e=r.context
if(e&&e.url===t.url&&e.level===t.level)return void A.trace("[playlist-loader]: playlist request ongoing")
A.log(`[playlist-loader]: aborting previous loader for type: ${t.type}`),r.abort()}if(i=t.type===ue.MANIFEST?s.manifestLoadPolicy.default:u({},s.playlistLoadPolicy.default,{timeoutRetry:null,errorRetry:null}),r=this.createInternalLoader(t),f(null==(e=t.deliveryDirectives)?void 0:e.part)){let e
if(t.type===ue.LEVEL&&null!==t.level?e=this.hls.levels[t.level].details:t.type===ue.AUDIO_TRACK&&null!==t.id?e=this.hls.audioTracks[t.id].details:t.type===ue.SUBTITLE_TRACK&&null!==t.id&&(e=this.hls.subtitleTracks[t.id].details),e){const t=e.partTarget,s=e.targetduration
if(t&&s){const e=1e3*Math.max(3*t,.8*s)
i=u({},i,{maxTimeToFirstByteMs:Math.min(e,i.maxTimeToFirstByteMs),maxLoadTimeMs:Math.min(e,i.maxTimeToFirstByteMs)})}}}const n=i.errorRetry||i.timeoutRetry||{},a={loadPolicy:i,timeout:i.maxLoadTimeMs,maxRetry:n.maxNumRetry||0,retryDelay:n.retryDelayMs||0,maxRetryDelay:n.maxRetryDelayMs||0},o={onSuccess:(t,e,s,i)=>{const r=this.getInternalLoader(s)
this.resetInternalLoader(s.type)
const n=t.data
0===n.indexOf("#EXTM3U")?(e.parsing.start=performance.now(),re.isMediaPlaylist(n)?this.handleTrackOrLevelPlaylist(t,e,s,i||null,r):this.handleMasterPlaylist(t,e,s,i)):this.handleManifestParsingError(t,s,new Error("no EXTM3U delimiter"),i||null,e)},onError:(t,e,s,i)=>{this.handleNetworkError(e,s,!1,t,i)},onTimeout:(t,e,s)=>{this.handleNetworkError(e,s,!0,void 0,t)}}
r.load(t,a,o)}handleMasterPlaylist(t,e,s,i){const r=this.hls,n=t.data,a=me(t,s),o=re.parseMasterPlaylist(n,a)
if(o.playlistParsingError)return void this.handleManifestParsingError(t,s,o.playlistParsingError,i,e)
const{contentSteering:l,levels:h,sessionData:d,sessionKeys:c,startTimeOffset:u,variableList:f}=o
this.variableList=f
const{AUDIO:g=[],SUBTITLES:m,"CLOSED-CAPTIONS":y}=re.parseMasterPlaylistMedia(n,a,o)
g.length&&(g.some((t=>!t.url))||!h[0].audioCodec||h[0].attrs.AUDIO||(A.log("[playlist-loader]: audio codec signaled in quality level, but no embedded audio track signaled, create one"),g.unshift({type:"main",name:"main",groupId:"main",default:!1,autoselect:!1,forced:!1,id:-1,attrs:new b({}),bitrate:0,url:""}))),r.trigger(p.MANIFEST_LOADED,{levels:h,audioTracks:g,subtitles:m,captions:y,contentSteering:l,url:a,stats:e,networkDetails:i,sessionData:d,sessionKeys:c,startTimeOffset:u,variableList:f})}handleTrackOrLevelPlaylist(t,e,s,i,r){const n=this.hls,{id:a,level:o,type:l}=s,h=me(t,s),d=f(o)?o:f(a)?a:0,c=ge(s),u=re.parseLevelPlaylist(t.data,h,d,c,0,this.variableList)
if(l===ue.MANIFEST){const t={attrs:new b({}),bitrate:0,details:u,name:"",url:h}
n.trigger(p.MANIFEST_LOADED,{levels:[t],audioTracks:[],url:h,stats:e,networkDetails:i,sessionData:null,sessionKeys:null,contentSteering:null,startTimeOffset:null,variableList:null})}e.parsing.end=performance.now(),s.levelDetails=u,this.handlePlaylistLoaded(u,t,e,s,i,r)}handleManifestParsingError(t,e,s,i,r){this.hls.trigger(p.ERROR,{type:y.NETWORK_ERROR,details:v.MANIFEST_PARSING_ERROR,fatal:e.type===ue.MANIFEST,url:t.url,err:s,error:s,reason:s.message,response:t,context:e,networkDetails:i,stats:r})}handleNetworkError(t,e,s=!1,i,r){let n=`A network ${s?"timeout":"error"+(i?" (status "+i.code+")":"")} occurred while loading ${t.type}`
t.type===ue.LEVEL?n+=`: ${t.level} id: ${t.id}`:t.type!==ue.AUDIO_TRACK&&t.type!==ue.SUBTITLE_TRACK||(n+=` id: ${t.id} group-id: "${t.groupId}"`)
const a=new Error(n)
A.warn(`[playlist-loader]: ${n}`)
let o=v.UNKNOWN,l=!1
const h=this.getInternalLoader(t)
switch(t.type){case ue.MANIFEST:o=s?v.MANIFEST_LOAD_TIMEOUT:v.MANIFEST_LOAD_ERROR,l=!0
break
case ue.LEVEL:o=s?v.LEVEL_LOAD_TIMEOUT:v.LEVEL_LOAD_ERROR,l=!1
break
case ue.AUDIO_TRACK:o=s?v.AUDIO_TRACK_LOAD_TIMEOUT:v.AUDIO_TRACK_LOAD_ERROR,l=!1
break
case ue.SUBTITLE_TRACK:o=s?v.SUBTITLE_TRACK_LOAD_TIMEOUT:v.SUBTITLE_LOAD_ERROR,l=!1}h&&this.resetInternalLoader(t.type)
const d={type:y.NETWORK_ERROR,details:o,fatal:l,url:t.url,loader:h,context:t,error:a,networkDetails:e,stats:r}
if(i){const s=(null==e?void 0:e.url)||t.url
d.response=c({url:s,data:void 0},i)}this.hls.trigger(p.ERROR,d)}handlePlaylistLoaded(t,e,s,i,r,n){const a=this.hls,{type:o,level:l,id:h,groupId:d,deliveryDirectives:c}=i,u=me(e,i),f=ge(i),g="number"==typeof i.level&&f===fe.MAIN?l:void 0
if(!t.fragments.length){const t=new Error("No Segments found in Playlist")
return void a.trigger(p.ERROR,{type:y.NETWORK_ERROR,details:v.LEVEL_EMPTY_ERROR,fatal:!1,url:u,error:t,reason:t.message,response:e,context:i,level:g,parent:f,networkDetails:r,stats:s})}t.targetduration||(t.playlistParsingError=new Error("Missing Target Duration"))
const m=t.playlistParsingError
if(m)a.trigger(p.ERROR,{type:y.NETWORK_ERROR,details:v.LEVEL_PARSING_ERROR,fatal:!1,url:u,error:m,reason:m.message,response:e,context:i,level:g,parent:f,networkDetails:r,stats:s})
else switch(t.live&&n&&(n.getCacheAge&&(t.ageHeader=n.getCacheAge()||0),n.getCacheAge&&!isNaN(t.ageHeader)||(t.ageHeader=0)),o){case ue.MANIFEST:case ue.LEVEL:a.trigger(p.LEVEL_LOADED,{details:t,level:g||0,id:h||0,stats:s,networkDetails:r,deliveryDirectives:c})
break
case ue.AUDIO_TRACK:a.trigger(p.AUDIO_TRACK_LOADED,{details:t,id:h||0,groupId:d||"",stats:s,networkDetails:r,deliveryDirectives:c})
break
case ue.SUBTITLE_TRACK:a.trigger(p.SUBTITLE_TRACK_LOADED,{details:t,id:h||0,groupId:d||"",stats:s,networkDetails:r,deliveryDirectives:c})}}}function ye(t,e){let s
try{s=new Event("addtrack")}catch(t){s=document.createEvent("Event"),s.initEvent("addtrack",!1,!1)}s.track=t,e.dispatchEvent(s)}function ve(t,e){const s=t.mode
if("disabled"===s&&(t.mode="hidden"),t.cues&&!t.cues.getCueById(e.id))try{if(t.addCue(e),!t.cues.getCueById(e.id))throw new Error(`addCue is failed for: ${e}`)}catch(s){A.debug(`[texttrack-utils]: ${s}`)
try{const s=new self.TextTrackCue(e.startTime,e.endTime,e.text)
s.id=e.id,t.addCue(s)}catch(t){A.debug(`[texttrack-utils]: Legacy TextTrackCue fallback failed: ${t}`)}}"disabled"===s&&(t.mode=s)}function Ee(t){const e=t.mode
if("disabled"===e&&(t.mode="hidden"),t.cues)for(let s=t.cues.length;s--;)t.removeCue(t.cues[s])
"disabled"===e&&(t.mode=e)}function Te(t,e,s,i){const r=t.mode
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
for(let e=0;e<r.length;e++)i&&!i(r[e])||t.removeCue(r[e])}"disabled"===r&&(t.mode=r)}function Se(t){const e=[]
for(let s=0;s<t.length;s++){const i=t[s]
"subtitles"!==i.kind&&"captions"!==i.kind||!i.label||e.push(t[s])}return e}var Ae={audioId3:"org.id3",dateRange:"com.apple.quicktime.HLS",emsg:"https://aomedia.org/emsg/ID3"}
function Le(){if("undefined"!=typeof self)return self.VTTCue||self.TextTrackCue}function Re(t,e,s,i,r){let a=new t(e,s,"")
try{a.value=i,r&&(a.type=r)}catch(n){a=new t(e,s,JSON.stringify(r?c({type:r},i):i))}return a}const be=(()=>{const t=Le()
try{t&&new t(0,Number.POSITIVE_INFINITY,"")}catch(t){return Number.MAX_VALUE}return Number.POSITIVE_INFINITY})()
function De(t,e){return t.getTime()/1e3-e}class ke{constructor(t){this.hls=void 0,this.id3Track=null,this.media=null,this.dateRangeCuesAppended={},this.hls=t,this._registerListeners()}destroy(){this._unregisterListeners(),this.id3Track=null,this.media=null,this.dateRangeCuesAppended={},this.hls=null}_registerListeners(){const{hls:t}=this
t.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.FRAG_PARSING_METADATA,this.onFragParsingMetadata,this),t.on(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.on(p.LEVEL_UPDATED,this.onLevelUpdated,this)}_unregisterListeners(){const{hls:t}=this
t.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.FRAG_PARSING_METADATA,this.onFragParsingMetadata,this),t.off(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.off(p.LEVEL_UPDATED,this.onLevelUpdated,this)}onMediaAttached(t,e){this.media=e.media}onMediaDetaching(){this.id3Track&&(Ee(this.id3Track),this.id3Track=null,this.media=null,this.dateRangeCuesAppended={})}onManifestLoading(){this.dateRangeCuesAppended={}}createTrack(t){const e=this.getID3Track(t.textTracks)
return e.mode="hidden",e}getID3Track(t){if(this.media){for(let e=0;e<t.length;e++){const s=t[e]
if("metadata"===s.kind&&"id3"===s.label)return ye(s,this.media),s}return this.media.addTextTrack("metadata","id3")}}onFragParsingMetadata(t,e){if(!this.media)return
const{hls:{config:{enableEmsgMetadataCues:s,enableID3MetadataCues:i}}}=this
if(!s&&!i)return
const{samples:r}=e
this.id3Track||(this.id3Track=this.createTrack(this.media))
const n=Le()
if(n)for(let a=0;a<r.length;a++){const t=r[a].type
if(t===Ae.emsg&&!s||!i)continue
const e=et(r[a].data)
if(e){const s=r[a].pts
let i=s+r[a].duration
i>be&&(i=be),i-s<=0&&(i=s+.25)
for(let r=0;r<e.length;r++){const a=e[r]
if(!Z(a)){this.updateId3CueEnds(s,t)
const e=Re(n,s,i,a,t)
e&&this.id3Track.addCue(e)}}}}}updateId3CueEnds(t,e){var s
const i=null==(s=this.id3Track)?void 0:s.cues
if(i)for(let r=i.length;r--;){const s=i[r]
s.type===e&&s.startTime<t&&s.endTime===be&&(s.endTime=t)}}onBufferFlushing(t,{startOffset:e,endOffset:s,type:i}){const{id3Track:r,hls:n}=this
if(!n)return
const{config:{enableEmsgMetadataCues:a,enableID3MetadataCues:o}}=n
if(r&&(a||o)){let t
t="audio"===i?t=>t.type===Ae.audioId3&&o:"video"===i?t=>t.type===Ae.emsg&&a:t=>t.type===Ae.audioId3&&o||t.type===Ae.emsg&&a,Te(r,e,s,t)}}onLevelUpdated(t,{details:e}){if(!this.media||!e.hasProgramDateTime||!this.hls.config.enableDateRangeMetadataCues)return
const{dateRangeCuesAppended:s,id3Track:i}=this,{dateRanges:r}=e,n=Object.keys(r)
if(i){const t=Object.keys(s).filter((t=>!n.includes(t)))
for(let e=t.length;e--;){const r=t[e]
Object.keys(s[r].cues).forEach((t=>{i.removeCue(s[r].cues[t])})),delete s[r]}}const a=e.fragments[e.fragments.length-1]
if(0===n.length||!f(null==a?void 0:a.programDateTime))return
this.id3Track||(this.id3Track=this.createTrack(this.media))
const o=a.programDateTime/1e3-a.start,l=Le()
for(let c=0;c<n.length;c++){const t=n[c],e=r[t],i=De(e.startDate,o),a=s[t],u=(null==a?void 0:a.cues)||{}
let f=(null==a?void 0:a.durationKnown)||!1,g=be
const m=e.endDate
if(m)g=De(m,o),f=!0
else if(e.endOnNext&&!f){const t=n.reduce(((t,s)=>{if(s!==e.id){const i=r[s]
if(i.class===e.class&&i.startDate>e.startDate&&(!t||e.startDate<t.startDate))return i}return t}),null)
t&&(g=De(t.startDate,o),f=!0)}const p=Object.keys(e.attr)
for(let s=0;s<p.length;s++){const r=p[s]
if("ID"===(d=r)||"CLASS"===d||"START-DATE"===d||"DURATION"===d||"END-DATE"===d||"END-ON-NEXT"===d)continue
const n=u[r]
if(n)f&&!a.durationKnown&&(n.endTime=g)
else if(l){let s=e.attr[r]
D(r)&&(h=s,s=Uint8Array.from(h.replace(/^0x/,"").replace(/([\da-fA-F]{2}) ?/g,"0x$1 ").replace(/ +$/,"").split(" ")).buffer)
const n=Re(l,i,g,{key:r,data:s},Ae.dateRange)
n&&(n.id=t,this.id3Track.addCue(n),u[r]=n)}}s[t]={cues:u,dateRange:e,durationKnown:f}}var h,d}}class Ie{constructor(t){this.hls=void 0,this.config=void 0,this.media=null,this.levelDetails=null,this.currentTime=0,this.stallCount=0,this._latency=null,this.timeupdateHandler=()=>this.timeupdate(),this.hls=t,this.config=t.config,this.registerListeners()}get latency(){return this._latency||0}get maxLatency(){const{config:t,levelDetails:e}=this
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
return(s?t.buffered.end(s-1):e.edge)-this.currentTime}destroy(){this.unregisterListeners(),this.onMediaDetaching(),this.levelDetails=null,this.hls=this.timeupdateHandler=null}registerListeners(){this.hls.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),this.hls.on(p.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.on(p.LEVEL_UPDATED,this.onLevelUpdated,this),this.hls.on(p.ERROR,this.onError,this)}unregisterListeners(){this.hls.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),this.hls.off(p.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.off(p.LEVEL_UPDATED,this.onLevelUpdated,this),this.hls.off(p.ERROR,this.onError,this)}onMediaAttached(t,e){this.media=e.media,this.media.addEventListener("timeupdate",this.timeupdateHandler)}onMediaDetaching(){this.media&&(this.media.removeEventListener("timeupdate",this.timeupdateHandler),this.media=null)}onManifestLoading(){this.levelDetails=null,this._latency=null,this.stallCount=0}onLevelUpdated(t,{details:e}){this.levelDetails=e,e.advanced&&this.timeupdate(),!e.live&&this.media&&this.media.removeEventListener("timeupdate",this.timeupdateHandler)}onError(t,e){var s
e.details===v.BUFFER_STALLED_ERROR&&(this.stallCount++,null!=(s=this.levelDetails)&&s.live&&A.warn("[playback-rate-controller]: Stall detected, adjusting target latency"))}timeupdate(){const{media:t,levelDetails:e}=this
if(!t||!e)return
this.currentTime=t.currentTime
const s=this.computeLatency()
if(null===s)return
this._latency=s
const{lowLatencyMode:i,maxLiveSyncPlaybackRate:r}=this.config
if(!i||1===r||!e.live)return
const n=this.targetLatency
if(null===n)return
const a=s-n
if(a<Math.min(this.maxLatency,n+e.targetduration)&&a>.05&&this.forwardBufferLength>1){const e=Math.min(2,Math.max(1,r)),s=Math.round(2/(1+Math.exp(-.75*a-this.edgeStalled))*20)/20
t.playbackRate=Math.min(e,Math.max(1,s))}else 1!==t.playbackRate&&0!==t.playbackRate&&(t.playbackRate=1)}estimateLiveEdge(){const{levelDetails:t}=this
return null===t?null:t.edge+t.age}computeLatency(){const t=this.estimateLiveEdge()
return null===t?null:t-this.currentTime}}const Ce=["NONE","TYPE-0","TYPE-1",null],we=["SDR","PQ","HLG"]
var _e={No:"",Yes:"YES",v2:"v2"}
function xe(t){const{canSkipUntil:e,canSkipDateRanges:s,age:i}=t
return e&&i<e/2?s?_e.v2:_e.Yes:_e.No}class Pe{constructor(t,e,s){this.msn=void 0,this.part=void 0,this.skip=void 0,this.msn=t,this.part=e,this.skip=s}addDirectives(t){const e=new self.URL(t)
return void 0!==this.msn&&e.searchParams.set("_HLS_msn",this.msn.toString()),void 0!==this.part&&e.searchParams.set("_HLS_part",this.part.toString()),this.skip&&e.searchParams.set("_HLS_skip",this.skip),e.href}}class Me{constructor(t){this._attrs=void 0,this.audioCodec=void 0,this.bitrate=void 0,this.codecSet=void 0,this.url=void 0,this.frameRate=void 0,this.height=void 0,this.id=void 0,this.name=void 0,this.videoCodec=void 0,this.width=void 0,this.details=void 0,this.fragmentError=0,this.loadError=0,this.loaded=void 0,this.realBitrate=0,this.supportedPromise=void 0,this.supportedResult=void 0,this._avgBitrate=0,this._audioGroups=void 0,this._subtitleGroups=void 0,this._urlId=0,this.url=[t.url],this._attrs=[t.attrs],this.bitrate=t.bitrate,t.details&&(this.details=t.details),this.id=t.id||0,this.name=t.name,this.width=t.width||0,this.height=t.height||0,this.frameRate=t.attrs.optionalFloat("FRAME-RATE",0),this._avgBitrate=t.attrs.decimalInteger("AVERAGE-BANDWIDTH"),this.audioCodec=t.audioCodec,this.videoCodec=t.videoCodec,this.codecSet=[t.videoCodec,t.audioCodec].filter((t=>!!t)).map((t=>t.substring(0,4))).join(","),this.addGroupId("audio",t.attrs.AUDIO),this.addGroupId("text",t.attrs.SUBTITLES)}get maxBitrate(){return Math.max(this.realBitrate,this.bitrate)}get averageBitrate(){return this._avgBitrate||this.realBitrate||this.bitrate}get attrs(){return this._attrs[0]}get codecs(){return this.attrs.CODECS||""}get pathwayId(){return this.attrs["PATHWAY-ID"]||"."}get videoRange(){return this.attrs["VIDEO-RANGE"]||"SDR"}get score(){return this.attrs.optionalFloat("SCORE",0)}get uri(){return this.url[0]||""}hasAudioGroup(t){return Fe(this._audioGroups,t)}hasSubtitleGroup(t){return Fe(this._subtitleGroups,t)}get audioGroups(){return this._audioGroups}get subtitleGroups(){return this._subtitleGroups}addGroupId(t,e){if(e)if("audio"===t){let t=this._audioGroups
t||(t=this._audioGroups=[]),-1===t.indexOf(e)&&t.push(e)}else if("text"===t){let t=this._subtitleGroups
t||(t=this._subtitleGroups=[]),-1===t.indexOf(e)&&t.push(e)}}get urlId(){return 0}set urlId(t){}get audioGroupIds(){return this.audioGroups?[this.audioGroupId]:void 0}get textGroupIds(){return this.subtitleGroups?[this.textGroupId]:void 0}get audioGroupId(){var t
return null==(t=this.audioGroups)?void 0:t[0]}get textGroupId(){var t
return null==(t=this.subtitleGroups)?void 0:t[0]}addFallback(){}}function Fe(t,e){return!(!e||!t)&&-1!==t.indexOf(e)}function Oe(t,e){const s=e.startPTS
if(f(s)){let i,r=0
e.sn>t.sn?(r=s-t.start,i=t):(r=t.start-s,i=e),i.duration!==r&&(i.duration=r)}else e.sn>t.sn?t.cc===e.cc&&t.minEndPTS?e.start=t.start+(t.minEndPTS-t.start):e.start=t.start+t.duration:e.start=Math.max(t.start-e.duration,0)}function Ne(t,e,s,i,r,n){i-s<=0&&(A.warn("Fragment should have a positive duration",e),i=s+e.duration,n=r+e.duration)
let a=s,o=i
const l=e.startPTS,h=e.endPTS
if(f(l)){const t=Math.abs(l-s)
f(e.deltaPTS)?e.deltaPTS=Math.max(t,e.deltaPTS):e.deltaPTS=t,a=Math.max(s,l),s=Math.min(s,l),r=Math.min(r,e.startDTS),o=Math.min(i,h),i=Math.max(i,h),n=Math.max(n,e.endDTS)}const d=s-e.start
0!==e.start&&(e.start=s),e.duration=i-e.start,e.startPTS=s,e.maxStartPTS=a,e.startDTS=r,e.endPTS=i,e.minEndPTS=o,e.endDTS=n
const c=e.sn
if(!t||c<t.startSN||c>t.endSN)return 0
let u
const g=c-t.startSN,m=t.fragments
for(m[g]=e,u=g;u>0;u--)Oe(m[u],m[u-1])
for(u=g;u<m.length-1;u++)Oe(m[u],m[u+1])
return t.fragmentHint&&Oe(m[m.length-1],t.fragmentHint),t.PTSKnown=t.alignedSliding=!0,d}function Ue(t,e){const s=e.startSN+e.skippedSegments-t.startSN,i=t.fragments
s<0||s>=i.length||Be(e,i[s].start)}function Be(t,e){if(e){const s=t.fragments
for(let i=t.skippedSegments;i<s.length;i++)s[i].start+=e
t.fragmentHint&&(t.fragmentHint.start+=e)}}function $e(t,e,s){var i
return null!=t&&t.details?Ge(null==(i=t.details)?void 0:i.partList,e,s):null}function Ge(t,e,s){if(t)for(let i=t.length;i--;){const r=t[i]
if(r.index===s&&r.fragment.sn===e)return r}return null}function Ke(t){t.forEach(((t,e)=>{const{details:s}=t
null!=s&&s.fragments&&s.fragments.forEach((t=>{t.level=e}))}))}function He(t){switch(t.details){case v.FRAG_LOAD_TIMEOUT:case v.KEY_LOAD_TIMEOUT:case v.LEVEL_LOAD_TIMEOUT:case v.MANIFEST_LOAD_TIMEOUT:return!0}return!1}function Ve(t,e){const s=He(e)
return t.default[(s?"timeout":"error")+"Retry"]}function Ye(t,e){const s="linear"===t.backoff?1:Math.pow(2,e)
return Math.min(s*t.retryDelayMs,t.maxRetryDelayMs)}function We(t){return c(c({},t),{errorRetry:null,timeoutRetry:null})}function je(t,e,s,i){if(!t)return!1
const r=null==i?void 0:i.code,n=e<t.maxNumRetry&&(function(t){return 0===t&&!1===navigator.onLine||!!t&&(t<400||t>499)}(r)||!!s)
return t.shouldRetry?t.shouldRetry(t,e,s,i,n):n}const qe=function(t,e){let s=0,i=t.length-1,r=null,n=null
for(;s<=i;){r=(s+i)/2|0,n=t[r]
const a=e(n)
if(a>0)s=r+1
else{if(!(a<0))return n
i=r-1}}return null}
function Xe(t,e,s=0,i=0,r=.005){let n=null
if(t){n=e[t.sn-e[0].sn+1]||null
const i=t.endDTS-s
i>0&&i<15e-7&&(s+=15e-7)}else 0===s&&0===e[0].start&&(n=e[0])
if(n&&((!t||t.level===n.level)&&0===ze(s,i,n)||function(t,e,s){if(e&&0===e.start&&e.level<t.level&&(e.endPTS||0)>0){const i=e.tagList.reduce(((t,e)=>("INF"===e[0]&&(t+=parseFloat(e[1])),t)),s)
return t.start<=i}return!1}(n,t,Math.min(r,i))))return n
const a=qe(e,ze.bind(null,s,i))
return!a||a===t&&n?n:a}function ze(t=0,e=0,s){if(s.start<=t&&s.start+s.duration>t)return 0
const i=Math.min(e,s.duration+(s.deltaPTS?s.deltaPTS:0))
return s.start+s.duration-i<=t?1:s.start-i>t&&s.start?-1:0}function Qe(t,e,s){const i=1e3*Math.min(e,s.duration+(s.deltaPTS?s.deltaPTS:0))
return(s.endProgramDateTime||0)-i>t}var Je={DoNothing:0,SendEndCallback:1,SendAlternateToPenaltyBox:2,RemoveAlternatePermanently:3,InsertDiscontinuity:4,RetryRequest:5},Ze={None:0,MoveAllAlternatesMatchingHost:1,MoveAllAlternatesMatchingHDCP:2,SwitchToSDR:4}
class ts{constructor(t){this.hls=void 0,this.playlistError=0,this.penalizedRenditions={},this.log=void 0,this.warn=void 0,this.error=void 0,this.hls=t,this.log=A.log.bind(A,"[info]:"),this.warn=A.warn.bind(A,"[warning]:"),this.error=A.error.bind(A,"[error]:"),this.registerListeners()}registerListeners(){const t=this.hls
t.on(p.ERROR,this.onError,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.LEVEL_UPDATED,this.onLevelUpdated,this)}unregisterListeners(){const t=this.hls
t&&(t.off(p.ERROR,this.onError,this),t.off(p.ERROR,this.onErrorOut,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.LEVEL_UPDATED,this.onLevelUpdated,this))}destroy(){this.unregisterListeners(),this.hls=null,this.penalizedRenditions={}}startLoad(t){}stopLoad(){this.playlistError=0}getVariantLevelIndex(t){return(null==t?void 0:t.type)===fe.MAIN?t.level:this.hls.loadLevel}onManifestLoading(){this.playlistError=0,this.penalizedRenditions={}}onLevelUpdated(){this.playlistError=0}onError(t,e){var s,i
if(e.fatal)return
const r=this.hls,n=e.context
switch(e.details){case v.FRAG_LOAD_ERROR:case v.FRAG_LOAD_TIMEOUT:case v.KEY_LOAD_ERROR:case v.KEY_LOAD_TIMEOUT:return void(e.errorAction=this.getFragRetryOrSwitchAction(e))
case v.FRAG_PARSING_ERROR:if(null!=(s=e.frag)&&s.gap)return void(e.errorAction={action:Je.DoNothing,flags:Ze.None})
case v.FRAG_GAP:case v.FRAG_DECRYPT_ERROR:return e.errorAction=this.getFragRetryOrSwitchAction(e),void(e.errorAction.action=Je.SendAlternateToPenaltyBox)
case v.LEVEL_EMPTY_ERROR:case v.LEVEL_PARSING_ERROR:{var a,o
const t=e.parent===fe.MAIN?e.level:r.loadLevel
e.details===v.LEVEL_EMPTY_ERROR&&null!=(a=e.context)&&null!=(o=a.levelDetails)&&o.live?e.errorAction=this.getPlaylistRetryOrSwitchAction(e,t):(e.levelRetry=!1,e.errorAction=this.getLevelSwitchAction(e,t))}return
case v.LEVEL_LOAD_ERROR:case v.LEVEL_LOAD_TIMEOUT:return void("number"==typeof(null==n?void 0:n.level)&&(e.errorAction=this.getPlaylistRetryOrSwitchAction(e,n.level)))
case v.AUDIO_TRACK_LOAD_ERROR:case v.AUDIO_TRACK_LOAD_TIMEOUT:case v.SUBTITLE_LOAD_ERROR:case v.SUBTITLE_TRACK_LOAD_TIMEOUT:if(n){const t=r.levels[r.loadLevel]
if(t&&(n.type===ue.AUDIO_TRACK&&t.hasAudioGroup(n.groupId)||n.type===ue.SUBTITLE_TRACK&&t.hasSubtitleGroup(n.groupId)))return e.errorAction=this.getPlaylistRetryOrSwitchAction(e,r.loadLevel),e.errorAction.action=Je.SendAlternateToPenaltyBox,void(e.errorAction.flags=Ze.MoveAllAlternatesMatchingHost)}return
case v.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED:{const t=r.levels[r.loadLevel],s=null==t?void 0:t.attrs["HDCP-LEVEL"]
s?e.errorAction={action:Je.SendAlternateToPenaltyBox,flags:Ze.MoveAllAlternatesMatchingHDCP,hdcpLevel:s}:this.keySystemError(e)}return
case v.BUFFER_ADD_CODEC_ERROR:case v.REMUX_ALLOC_ERROR:case v.BUFFER_APPEND_ERROR:return void(e.errorAction=this.getLevelSwitchAction(e,null!=(i=e.level)?i:r.loadLevel))
case v.INTERNAL_EXCEPTION:case v.BUFFER_APPENDING_ERROR:case v.BUFFER_FULL_ERROR:case v.LEVEL_SWITCH_ERROR:case v.BUFFER_STALLED_ERROR:case v.BUFFER_SEEK_OVER_HOLE:case v.BUFFER_NUDGE_ON_STALL:return void(e.errorAction={action:Je.DoNothing,flags:Ze.None})}e.type===y.KEY_SYSTEM_ERROR&&this.keySystemError(e)}keySystemError(t){const e=this.getVariantLevelIndex(t.frag)
t.levelRetry=!1,t.errorAction=this.getLevelSwitchAction(t,e)}getPlaylistRetryOrSwitchAction(t,e){const s=Ve(this.hls.config.playlistLoadPolicy,t),i=this.playlistError++
if(je(s,i,He(t),t.response))return{action:Je.RetryRequest,flags:Ze.None,retryConfig:s,retryCount:i}
const r=this.getLevelSwitchAction(t,e)
return s&&(r.retryConfig=s,r.retryCount=i),r}getFragRetryOrSwitchAction(t){const e=this.hls,s=this.getVariantLevelIndex(t.frag),i=e.levels[s],{fragLoadPolicy:r,keyLoadPolicy:n}=e.config,a=Ve(t.details.startsWith("key")?n:r,t),o=e.levels.reduce(((t,e)=>t+e.fragmentError),0)
if(i&&(t.details!==v.FRAG_GAP&&i.fragmentError++,je(a,o,He(t),t.response)))return{action:Je.RetryRequest,flags:Ze.None,retryConfig:a,retryCount:o}
const l=this.getLevelSwitchAction(t,s)
return a&&(l.retryConfig=a,l.retryCount=o),l}getLevelSwitchAction(t,e){const s=this.hls
null==e&&(e=s.loadLevel)
const i=this.hls.levels[e]
if(i){var r,n
const e=t.details
i.loadError++,e===v.BUFFER_APPEND_ERROR&&i.fragmentError++
let l=-1
const{levels:h,loadLevel:d,minAutoLevel:c,maxAutoLevel:u}=s
s.autoLevelEnabled||(s.loadLevel=-1)
const f=null==(r=t.frag)?void 0:r.type,g=(f===fe.AUDIO&&e===v.FRAG_PARSING_ERROR||"audio"===t.sourceBufferName&&(e===v.BUFFER_ADD_CODEC_ERROR||e===v.BUFFER_APPEND_ERROR))&&h.some((({audioCodec:t})=>i.audioCodec!==t)),m="video"===t.sourceBufferName&&(e===v.BUFFER_ADD_CODEC_ERROR||e===v.BUFFER_APPEND_ERROR)&&h.some((({codecSet:t,audioCodec:e})=>i.codecSet!==t&&i.audioCodec===e)),{type:p,groupId:y}=null!=(n=t.context)?n:{}
for(let s=h.length;s--;){const r=(s+d)%h.length
if(r!==d&&r>=c&&r<=u&&0===h[r].loadError){var a,o
const s=h[r]
if(e===v.FRAG_GAP&&f===fe.MAIN&&t.frag){const e=h[r].details
if(e){const s=Xe(t.frag,e.fragments,t.frag.start)
if(null!=s&&s.gap)continue}}else{if(p===ue.AUDIO_TRACK&&s.hasAudioGroup(y)||p===ue.SUBTITLE_TRACK&&s.hasSubtitleGroup(y))continue
if(f===fe.AUDIO&&null!=(a=i.audioGroups)&&a.some((t=>s.hasAudioGroup(t)))||f===fe.SUBTITLE&&null!=(o=i.subtitleGroups)&&o.some((t=>s.hasSubtitleGroup(t)))||g&&i.audioCodec===s.audioCodec||!g&&i.audioCodec!==s.audioCodec||m&&i.codecSet===s.codecSet)continue}l=r
break}}if(l>-1&&s.loadLevel!==l)return t.levelRetry=!0,this.playlistError=0,{action:Je.SendAlternateToPenaltyBox,flags:Ze.None,nextAutoLevel:l}}return{action:Je.SendAlternateToPenaltyBox,flags:Ze.MoveAllAlternatesMatchingHost}}onErrorOut(t,e){var s
switch(null==(s=e.errorAction)?void 0:s.action){case Je.DoNothing:break
case Je.SendAlternateToPenaltyBox:this.sendAlternateToPenaltyBox(e),e.errorAction.resolved||e.details===v.FRAG_GAP?/MediaSource readyState: ended/.test(e.error.message)&&(this.warn(`MediaSource ended after "${e.sourceBufferName}" sourceBuffer append error. Attempting to recover from media error.`),this.hls.recoverMediaError()):e.fatal=!0
case Je.RetryRequest:}e.fatal&&this.hls.stopLoad()}sendAlternateToPenaltyBox(t){const e=this.hls,s=t.errorAction
if(!s)return
const{flags:i,hdcpLevel:r,nextAutoLevel:n}=s
switch(i){case Ze.None:this.switchLevel(t,n)
break
case Ze.MoveAllAlternatesMatchingHDCP:r&&(e.maxHdcpLevel=Ce[Ce.indexOf(r)-1],s.resolved=!0),this.warn(`Restricting playback to HDCP-LEVEL of "${e.maxHdcpLevel}" or lower`)}s.resolved||this.switchLevel(t,n)}switchLevel(t,e){void 0!==e&&t.errorAction&&(this.warn(`switching to level ${e} after ${t.details}`),this.hls.nextAutoLevel=e,t.errorAction.resolved=!0,this.hls.nextLoadLevel=this.hls.nextAutoLevel)}}class es{constructor(t,e){this.hls=void 0,this.timer=-1,this.requestScheduled=-1,this.canLoad=!1,this.log=void 0,this.warn=void 0,this.log=A.log.bind(A,`${e}:`),this.warn=A.warn.bind(A,`${e}:`),this.hls=t}destroy(){this.clearTimer(),this.hls=this.log=this.warn=null}clearTimer(){-1!==this.timer&&(self.clearTimeout(this.timer),this.timer=-1)}startLoad(){this.canLoad=!0,this.requestScheduled=-1,this.loadPlaylist()}stopLoad(){this.canLoad=!1,this.clearTimer()}switchParams(t,e,s){const i=null==e?void 0:e.renditionReports
if(i){let r=-1
for(let s=0;s<i.length;s++){const n=i[s]
let a
try{a=new self.URL(n.URI,e.url).href}catch(t){A.warn(`Could not construct new URL for Rendition Report: ${t}`),a=n.URI||""}if(a===t){r=s
break}a===t.substring(0,a.length)&&(r=s)}if(-1!==r){const t=i[r],n=parseInt(t["LAST-MSN"])||(null==e?void 0:e.lastPartSn)
let a=parseInt(t["LAST-PART"])||(null==e?void 0:e.lastPartIndex)
if(this.hls.config.lowLatencyMode){const t=Math.min(e.age-e.partTarget,e.targetduration)
a>=0&&t>e.partTarget&&(a+=1)}const o=s&&xe(s)
return new Pe(n,a>=0?a:void 0,o)}}}loadPlaylist(t){-1===this.requestScheduled&&(this.requestScheduled=self.performance.now())}shouldLoadPlaylist(t){return this.canLoad&&!!t&&!!t.url&&(!t.details||t.details.live)}shouldReloadPlaylist(t){return-1===this.timer&&-1===this.requestScheduled&&this.shouldLoadPlaylist(t)}playlistLoaded(t,e,s){const{details:i,stats:r}=e,n=self.performance.now(),a=r.loading.first?Math.max(0,n-r.loading.first):0
if(i.advancedDateTime=Date.now()-a,i.live||null!=s&&s.live){if(i.reloaded(s),s&&this.log(`live playlist ${t} ${i.advanced?"REFRESHED "+i.lastPartSn+"-"+i.lastPartIndex:i.updated?"UPDATED":"MISSED"}`),s&&i.fragments.length>0&&function(t,e){let s=null
const i=t.fragments
for(let l=i.length-1;l>=0;l--){const t=i[l].initSegment
if(t){s=t
break}}t.fragmentHint&&delete t.fragmentHint.endPTS
let r,n=0
if(function(t,e,s){const i=e.skippedSegments,r=Math.max(t.startSN,e.startSN)-e.startSN,n=(t.fragmentHint?1:0)+(i?e.endSN:Math.min(t.endSN,e.endSN))-e.startSN,a=e.startSN-t.startSN,o=e.fragmentHint?e.fragments.concat(e.fragmentHint):e.fragments,l=t.fragmentHint?t.fragments.concat(t.fragmentHint):t.fragments
for(let h=r;h<=n;h++){const t=l[a+h]
let r=o[h]
i&&!r&&h<i&&(r=e.fragments[h]=t),t&&r&&s(t,r)}}(t,e,((t,i)=>{t.relurl&&(n=t.cc-i.cc),f(t.startPTS)&&f(t.endPTS)&&(i.start=i.startPTS=t.startPTS,i.startDTS=t.startDTS,i.maxStartPTS=t.maxStartPTS,i.endPTS=t.endPTS,i.endDTS=t.endDTS,i.minEndPTS=t.minEndPTS,i.duration=t.endPTS-t.startPTS,i.duration&&(r=i),e.PTSKnown=e.alignedSliding=!0),i.elementaryStreams=t.elementaryStreams,i.loader=t.loader,i.stats=t.stats,t.initSegment&&(i.initSegment=t.initSegment,s=t.initSegment)})),s&&(e.fragmentHint?e.fragments.concat(e.fragmentHint):e.fragments).forEach((t=>{var e
!t||t.initSegment&&t.initSegment.relurl!==(null==(e=s)?void 0:e.relurl)||(t.initSegment=s)})),e.skippedSegments)if(e.deltaUpdateFailed=e.fragments.some((t=>!t)),e.deltaUpdateFailed){A.warn("[level-helper] Previous playlist missing segments skipped in delta playlist")
for(let t=e.skippedSegments;t--;)e.fragments.shift()
e.startSN=e.fragments[0].sn,e.startCC=e.fragments[0].cc}else e.canSkipDateRanges&&(e.dateRanges=function(t,e,s){const i=u({},t)
return s&&s.forEach((t=>{delete i[t]})),Object.keys(e).forEach((t=>{const s=new k(e[t].attr,i[t])
s.isValid?i[t]=s:A.warn(`Ignoring invalid Playlist Delta Update DATERANGE tag: "${JSON.stringify(e[t].attr)}"`)})),i}(t.dateRanges,e.dateRanges,e.recentlyRemovedDateranges))
const a=e.fragments
if(n){A.warn("discontinuity sliding from playlist, take drift into account")
for(let t=0;t<a.length;t++)a[t].cc+=n}e.skippedSegments&&(e.startCC=e.fragments[0].cc),function(t,e,s){if(t&&e){let i=0
for(let r=0,n=t.length;r<=n;r++){const n=t[r],a=e[r+i]
n&&a&&n.index===a.index&&n.fragment.sn===a.fragment.sn?s(n,a):i--}}}(t.partList,e.partList,((t,e)=>{e.elementaryStreams=t.elementaryStreams,e.stats=t.stats})),r?Ne(e,r,r.startPTS,r.endPTS,r.startDTS,r.endDTS):Ue(t,e),a.length&&(e.totalduration=e.edge-a[0].start),e.driftStartTime=t.driftStartTime,e.driftStart=t.driftStart
const o=e.advancedDateTime
if(e.advanced&&o){const t=e.edge
e.driftStart||(e.driftStartTime=o,e.driftStart=t),e.driftEndTime=o,e.driftEnd=t}else e.driftEndTime=t.driftEndTime,e.driftEnd=t.driftEnd,e.advancedDateTime=t.advancedDateTime}(s,i),!this.canLoad||!i.live)return
let a,o,l
if(i.canBlockReload&&i.endSN&&i.advanced){const t=this.hls.config.lowLatencyMode,r=i.lastPartSn,n=i.endSN,h=i.lastPartIndex,d=r===n;-1!==h?(o=d?n+1:r,l=d?t?0:h:h+1):o=n+1
const c=i.age,u=c+i.ageHeader
let f=Math.min(u-i.partTarget,1.5*i.targetduration)
if(f>0){if(s&&f>s.tuneInGoal)this.warn(`CDN Tune-in goal increased from: ${s.tuneInGoal} to: ${f} with playlist age: ${i.age}`),f=0
else{const t=Math.floor(f/i.targetduration)
o+=t,void 0!==l&&(l+=Math.round(f%i.targetduration/i.partTarget)),this.log(`CDN Tune-in age: ${i.ageHeader}s last advanced ${c.toFixed(2)}s goal: ${f} skip sn ${t} to part ${l}`)}i.tuneInGoal=f}if(a=this.getDeliveryDirectives(i,e.deliveryDirectives,o,l),t||!d)return void this.loadPlaylist(a)}else(i.canBlockReload||i.canSkipUntil)&&(a=this.getDeliveryDirectives(i,e.deliveryDirectives,o,l))
const h=this.hls.mainForwardBufferInfo,d=h?h.end-h.len:0,c=function(t,e=1/0){let s=1e3*t.targetduration
if(t.updated){const i=t.fragments,r=4
if(i.length&&s*r>e){const t=1e3*i[i.length-1].duration
t<s&&(s=t)}}else s/=2
return Math.round(s)}(i,1e3*(i.edge-d))
i.updated&&n>this.requestScheduled+c&&(this.requestScheduled=r.loading.start),void 0!==o&&i.canBlockReload?this.requestScheduled=r.loading.first+c-(1e3*i.partTarget||1e3):-1===this.requestScheduled||this.requestScheduled+c<n?this.requestScheduled=n:this.requestScheduled-n<=0&&(this.requestScheduled+=c)
let g=this.requestScheduled-n
g=Math.max(0,g),this.log(`reload live playlist ${t} in ${Math.round(g)} ms`),this.timer=self.setTimeout((()=>this.loadPlaylist(a)),g)}else this.clearTimer()}getDeliveryDirectives(t,e,s,i){let r=xe(t)
return null!=e&&e.skip&&t.deltaUpdateFailed&&(s=e.msn,i=e.part,r=_e.No),new Pe(s,i,r)}checkRetry(t){const e=t.details,s=He(t),i=t.errorAction,{action:r,retryCount:n=0,retryConfig:a}=i||{},o=!!i&&!!a&&(r===Je.RetryRequest||!i.resolved&&r===Je.SendAlternateToPenaltyBox)
if(o){var l
if(this.requestScheduled=-1,n>=a.maxNumRetry)return!1
if(s&&null!=(l=t.context)&&l.deliveryDirectives)this.warn(`Retrying playlist loading ${n+1}/${a.maxNumRetry} after "${e}" without delivery-directives`),this.loadPlaylist()
else{const t=Ye(a,n)
this.timer=self.setTimeout((()=>this.loadPlaylist()),t),this.warn(`Retrying playlist loading ${n+1}/${a.maxNumRetry} after "${e}" in ${t}ms`)}t.levelRetry=!0,i.resolved=!0}return o}}class ss{constructor(t,e=0,s=0){this.halfLife=void 0,this.alpha_=void 0,this.estimate_=void 0,this.totalWeight_=void 0,this.halfLife=t,this.alpha_=t?Math.exp(Math.log(.5)/t):0,this.estimate_=e,this.totalWeight_=s}sample(t,e){const s=Math.pow(this.alpha_,t)
this.estimate_=e*(1-s)+s*this.estimate_,this.totalWeight_+=t}getTotalWeight(){return this.totalWeight_}getEstimate(){if(this.alpha_){const t=1-Math.pow(this.alpha_,this.totalWeight_)
if(t)return this.estimate_/t}return this.estimate_}}class is{constructor(t,e,s,i=100){this.defaultEstimate_=void 0,this.minWeight_=void 0,this.minDelayMs_=void 0,this.slow_=void 0,this.fast_=void 0,this.defaultTTFB_=void 0,this.ttfb_=void 0,this.defaultEstimate_=s,this.minWeight_=.001,this.minDelayMs_=50,this.slow_=new ss(t),this.fast_=new ss(e),this.defaultTTFB_=i,this.ttfb_=new ss(t)}update(t,e){const{slow_:s,fast_:i,ttfb_:r}=this
s.halfLife!==t&&(this.slow_=new ss(t,s.getEstimate(),s.getTotalWeight())),i.halfLife!==e&&(this.fast_=new ss(e,i.getEstimate(),i.getTotalWeight())),r.halfLife!==t&&(this.ttfb_=new ss(t,r.getEstimate(),r.getTotalWeight()))}sample(t,e){const s=(t=Math.max(t,this.minDelayMs_))/1e3,i=8*e/s
this.fast_.sample(s,i),this.slow_.sample(s,i)}sampleTTFB(t){const e=t/1e3,s=Math.sqrt(2)*Math.exp(-Math.pow(e,2)/2)
this.ttfb_.sample(s,Math.max(t,5))}canEstimate(){return this.fast_.getTotalWeight()>=this.minWeight_}getEstimate(){return this.canEstimate()?Math.min(this.fast_.getEstimate(),this.slow_.getEstimate()):this.defaultEstimate_}getEstimateTTFB(){return this.ttfb_.getTotalWeight()>=this.minWeight_?this.ttfb_.getEstimate():this.defaultTTFB_}destroy(){}}const rs={supported:!0,configurations:[],decodingInfoResults:[{supported:!0,powerEfficient:!0,smooth:!0}]},ns={}
function as(t,e,s,i,r,n){const a=t.audioCodec?t.audioGroups:null,o=null==n?void 0:n.audioCodec,l=null==n?void 0:n.channels,h=l?parseInt(l):o?1/0:2
let d=null
if(null!=a&&a.length)try{d=1===a.length&&a[0]?e.groups[a[0]].channels:a.reduce(((t,s)=>{if(s){const i=e.groups[s]
if(!i)throw new Error(`Audio track group ${s} not found`)
Object.keys(i.channels).forEach((e=>{t[e]=(t[e]||0)+i.channels[e]}))}return t}),{2:0})}catch(t){return!0}return void 0!==t.videoCodec&&(t.width>1920&&t.height>1088||t.height>1920&&t.width>1088||t.frameRate>Math.max(i,30)||"SDR"!==t.videoRange&&t.videoRange!==s||t.bitrate>Math.max(r,8e6))||!!d&&f(h)&&Object.keys(d).some((t=>parseInt(t)>h))}function os(t,e,s){const i=t.videoCodec,r=t.audioCodec
if(!i||!r||!s)return Promise.resolve(rs)
const n={width:t.width,height:t.height,bitrate:Math.ceil(Math.max(.9*t.bitrate,t.averageBitrate)),framerate:t.frameRate||30},a=t.videoRange
"SDR"!==a&&(n.transferFunction=a.toLowerCase())
const o=i.split(",").map((t=>({type:"media-source",video:c(c({},n),{},{contentType:Wt(t,"video")})})))
return r&&t.audioGroups&&t.audioGroups.forEach((t=>{var s
t&&(null==(s=e.groups[t])||s.tracks.forEach((e=>{if(e.groupId===t){const t=e.channels||"",s=parseFloat(t)
f(s)&&s>2&&o.push.apply(o,r.split(",").map((t=>({type:"media-source",audio:{contentType:Wt(t,"audio"),channels:""+s}}))))}})))})),Promise.all(o.map((t=>{const e=function(t){const{audio:e,video:s}=t,i=s||e
if(i){const t=i.contentType.split('"')[1]
if(s)return`r${s.height}x${s.width}f${Math.ceil(s.framerate)}${s.transferFunction||"sd"}_${t}_${Math.ceil(s.bitrate/1e5)}`
if(e)return`c${e.channels}${e.spatialRendering?"s":"n"}_${t}`}return""}(t)
return ns[e]||(ns[e]=s.decodingInfo(t))}))).then((t=>({supported:!t.some((t=>!t.supported)),configurations:o,decodingInfoResults:t}))).catch((t=>({supported:!1,configurations:o,decodingInfoResults:[],error:t})))}function ls(t,e){A.log(`[abr] start candidates with "${t}" ignored because ${e}`)}function hs(t,e,s){if("attrs"in t){const s=e.indexOf(t)
if(-1!==s)return s}for(let i=0;i<e.length;i++)if(ds(t,e[i],s))return i
return-1}function ds(t,e,s){const{groupId:i,name:r,lang:n,assocLang:a,characteristics:o,default:l}=t,h=t.forced
return(void 0===i||e.groupId===i)&&(void 0===r||e.name===r)&&(void 0===n||e.lang===n)&&(void 0===n||e.assocLang===a)&&(void 0===l||e.default===l)&&(void 0===h||e.forced===h)&&(void 0===o||function(t,e=""){const s=t.split(","),i=e.split(",")
return s.length===i.length&&!s.some((t=>-1===i.indexOf(t)))}(o,e.characteristics))&&(void 0===s||s(t,e))}function cs(t,e){const{audioCodec:s,channels:i}=t
return!(void 0!==s&&(e.audioCodec||"").substring(0,4)!==s.substring(0,4)||void 0!==i&&i!==(e.channels||"2"))}function us(t,e,s){for(let i=e;i;i--)if(s(t[i]))return i
for(let i=e+1;i<t.length;i++)if(s(t[i]))return i
return-1}class fs{constructor(t){this.hls=void 0,this.lastLevelLoadSec=0,this.lastLoadedFragLevel=-1,this.firstSelection=-1,this._nextAutoLevel=-1,this.nextAutoLevelKey="",this.audioTracksByGroup=null,this.codecTiers=null,this.timer=-1,this.fragCurrent=null,this.partCurrent=null,this.bitrateTestDelay=0,this.bwEstimator=void 0,this._abandonRulesCheck=()=>{const{fragCurrent:t,partCurrent:e,hls:s}=this,{autoLevelEnabled:i,media:r}=s
if(!t||!r)return
const n=performance.now(),a=e?e.stats:t.stats,o=e?e.duration:t.duration,l=n-a.loading.start,h=s.minAutoLevel
if(a.aborted||a.loaded&&a.loaded===a.total||t.level<=h)return this.clearTimer(),void(this._nextAutoLevel=-1)
if(!i||r.paused||!r.playbackRate||!r.readyState)return
const d=s.mainForwardBufferInfo
if(null===d)return
const c=this.bwEstimator.getEstimateTTFB(),u=Math.abs(r.playbackRate)
if(l<=Math.max(c,o/(2*u)*1e3))return
const g=d.len/u,m=a.loading.first?a.loading.first-a.loading.start:-1,y=a.loaded&&m>-1,v=this.getBwEstimate(),E=s.levels,T=E[t.level],S=a.total||Math.max(a.loaded,Math.round(o*T.averageBitrate/8))
let L=y?l-m:l
L<1&&y&&(L=Math.min(l,8*a.loaded/v))
const R=y?1e3*a.loaded/L:0,b=R?(S-a.loaded)/R:8*S/v+c/1e3
if(b<=g)return
const D=R?8*R:v
let k,I=Number.POSITIVE_INFINITY
for(k=t.level-1;k>h;k--){const t=E[k].maxBitrate
if(I=this.getTimeToLoadFrag(c/1e3,D,o*t,!E[k].details),I<g)break}if(I>=b)return
if(I>10*o)return
s.nextLoadLevel=s.nextAutoLevel=k,y?this.bwEstimator.sample(l-Math.min(c,m),a.loaded):this.bwEstimator.sampleTTFB(l)
const C=E[k].maxBitrate
this.getBwEstimate()*this.hls.config.abrBandWidthUpFactor>C&&this.resetEstimator(C),this.clearTimer(),A.warn(`[abr] Fragment ${t.sn}${e?" part "+e.index:""} of level ${t.level} is loading too slowly;\n      Time to underbuffer: ${g.toFixed(3)} s\n      Estimated load time for current fragment: ${b.toFixed(3)} s\n      Estimated load time for down switch fragment: ${I.toFixed(3)} s\n      TTFB estimate: ${0|m} ms\n      Current BW estimate: ${f(v)?0|v:"Unknown"} bps\n      New BW estimate: ${0|this.getBwEstimate()} bps\n      Switching to level ${k} @ ${0|C} bps`),s.trigger(p.FRAG_LOAD_EMERGENCY_ABORTED,{frag:t,part:e,stats:a})},this.hls=t,this.bwEstimator=this.initEstimator(),this.registerListeners()}resetEstimator(t){t&&(A.log(`setting initial bwe to ${t}`),this.hls.config.abrEwmaDefaultEstimate=t),this.firstSelection=-1,this.bwEstimator=this.initEstimator()}initEstimator(){const t=this.hls.config
return new is(t.abrEwmaSlowVoD,t.abrEwmaFastVoD,t.abrEwmaDefaultEstimate)}registerListeners(){const{hls:t}=this
t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.FRAG_LOADING,this.onFragLoading,this),t.on(p.FRAG_LOADED,this.onFragLoaded,this),t.on(p.FRAG_BUFFERED,this.onFragBuffered,this),t.on(p.LEVEL_SWITCHING,this.onLevelSwitching,this),t.on(p.LEVEL_LOADED,this.onLevelLoaded,this),t.on(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.on(p.MAX_AUTO_LEVEL_UPDATED,this.onMaxAutoLevelUpdated,this),t.on(p.ERROR,this.onError,this)}unregisterListeners(){const{hls:t}=this
t&&(t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.FRAG_LOADING,this.onFragLoading,this),t.off(p.FRAG_LOADED,this.onFragLoaded,this),t.off(p.FRAG_BUFFERED,this.onFragBuffered,this),t.off(p.LEVEL_SWITCHING,this.onLevelSwitching,this),t.off(p.LEVEL_LOADED,this.onLevelLoaded,this),t.off(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.off(p.MAX_AUTO_LEVEL_UPDATED,this.onMaxAutoLevelUpdated,this),t.off(p.ERROR,this.onError,this))}destroy(){this.unregisterListeners(),this.clearTimer(),this.hls=this._abandonRulesCheck=null,this.fragCurrent=this.partCurrent=null}onManifestLoading(t,e){this.lastLoadedFragLevel=-1,this.firstSelection=-1,this.lastLevelLoadSec=0,this.fragCurrent=this.partCurrent=null,this.onLevelsUpdated(),this.clearTimer()}onLevelsUpdated(){this.lastLoadedFragLevel>-1&&this.fragCurrent&&(this.lastLoadedFragLevel=this.fragCurrent.level),this._nextAutoLevel=-1,this.onMaxAutoLevelUpdated(),this.codecTiers=null,this.audioTracksByGroup=null}onMaxAutoLevelUpdated(){this.firstSelection=-1,this.nextAutoLevelKey=""}onFragLoading(t,e){const s=e.frag
var i
this.ignoreFragment(s)||(s.bitrateTest||(this.fragCurrent=s,this.partCurrent=null!=(i=e.part)?i:null),this.clearTimer(),this.timer=self.setInterval(this._abandonRulesCheck,100))}onLevelSwitching(t,e){this.clearTimer()}onError(t,e){if(!e.fatal)switch(e.details){case v.BUFFER_ADD_CODEC_ERROR:case v.BUFFER_APPEND_ERROR:this.lastLoadedFragLevel=-1,this.firstSelection=-1
break
case v.FRAG_LOAD_TIMEOUT:{const t=e.frag,{fragCurrent:s,partCurrent:i}=this
if(t&&s&&t.sn===s.sn&&t.level===s.level){const e=performance.now(),s=i?i.stats:t.stats,r=e-s.loading.start,n=s.loading.first?s.loading.first-s.loading.start:-1
if(s.loaded&&n>-1){const t=this.bwEstimator.getEstimateTTFB()
this.bwEstimator.sample(r-Math.min(t,n),s.loaded)}else this.bwEstimator.sampleTTFB(r)}break}}}getTimeToLoadFrag(t,e,s,i){return t+s/e+(i?this.lastLevelLoadSec:0)}onLevelLoaded(t,e){const s=this.hls.config,{loading:i}=e.stats,r=i.end-i.start
f(r)&&(this.lastLevelLoadSec=r/1e3),e.details.live?this.bwEstimator.update(s.abrEwmaSlowLive,s.abrEwmaFastLive):this.bwEstimator.update(s.abrEwmaSlowVoD,s.abrEwmaFastVoD)}onFragLoaded(t,{frag:e,part:s}){const i=s?s.stats:e.stats
if(e.type===fe.MAIN&&this.bwEstimator.sampleTTFB(i.loading.first-i.loading.start),!this.ignoreFragment(e)){if(this.clearTimer(),e.level===this._nextAutoLevel&&(this._nextAutoLevel=-1),this.firstSelection=-1,this.hls.config.abrMaxWithRealBitrate){const t=s?s.duration:e.duration,r=this.hls.levels[e.level],n=(r.loaded?r.loaded.bytes:0)+i.loaded,a=(r.loaded?r.loaded.duration:0)+t
r.loaded={bytes:n,duration:a},r.realBitrate=Math.round(8*n/a)}if(e.bitrateTest){const t={stats:i,frag:e,part:s,id:e.type}
this.onFragBuffered(p.FRAG_BUFFERED,t),e.bitrateTest=!1}else this.lastLoadedFragLevel=e.level}}onFragBuffered(t,e){const{frag:s,part:i}=e,r=null!=i&&i.stats.loaded?i.stats:s.stats
if(r.aborted)return
if(this.ignoreFragment(s))return
const n=r.parsing.end-r.loading.start-Math.min(r.loading.first-r.loading.start,this.bwEstimator.getEstimateTTFB())
this.bwEstimator.sample(n,r.loaded),r.bwEstimate=this.getBwEstimate(),s.bitrateTest?this.bitrateTestDelay=n/1e3:this.bitrateTestDelay=0}ignoreFragment(t){return t.type!==fe.MAIN||"initSegment"===t.sn}clearTimer(){this.timer>-1&&(self.clearInterval(this.timer),this.timer=-1)}get firstAutoLevel(){const{maxAutoLevel:t,minAutoLevel:e}=this.hls,s=this.getBwEstimate(),i=this.hls.config.maxStarvationDelay,r=this.findBestLevel(s,e,t,0,i,1,1)
if(r>-1)return r
const n=this.hls.firstLevel,a=Math.min(Math.max(n,e),t)
return A.warn(`[abr] Could not find best starting auto level. Defaulting to first in playlist ${n} clamped to ${a}`),a}get forcedAutoLevel(){return this.nextAutoLevelKey?-1:this._nextAutoLevel}get nextAutoLevel(){const t=this.forcedAutoLevel,e=this.bwEstimator.canEstimate(),s=this.lastLoadedFragLevel>-1
if(!(-1===t||e&&s&&this.nextAutoLevelKey!==this.getAutoLevelKey()))return t
const i=e&&s?this.getNextABRAutoLevel():this.firstAutoLevel
if(-1!==t){const e=this.hls.levels
if(e.length>Math.max(t,i)&&e[t].loadError<=e[i].loadError)return t}return this._nextAutoLevel=i,this.nextAutoLevelKey=this.getAutoLevelKey(),i}getAutoLevelKey(){return`${this.getBwEstimate()}_${this.getStarvationDelay().toFixed(2)}`}getNextABRAutoLevel(){const{fragCurrent:t,partCurrent:e,hls:s}=this,{maxAutoLevel:i,config:r,minAutoLevel:n}=s,a=e?e.duration:t?t.duration:0,o=this.getBwEstimate(),l=this.getStarvationDelay()
let h=r.abrBandWidthFactor,d=r.abrBandWidthUpFactor
if(l){const t=this.findBestLevel(o,n,i,l,0,h,d)
if(t>=0)return t}let c=a?Math.min(a,r.maxStarvationDelay):r.maxStarvationDelay
if(!l){const t=this.bitrateTestDelay
t&&(c=(a?Math.min(a,r.maxLoadingDelay):r.maxLoadingDelay)-t,A.info(`[abr] bitrate test took ${Math.round(1e3*t)}ms, set first fragment max fetchDuration to ${Math.round(1e3*c)} ms`),h=d=1)}const u=this.findBestLevel(o,n,i,l,c,h,d)
if(A.info(`[abr] ${l?"rebuffering expected":"buffer is empty"}, optimal quality level ${u}`),u>-1)return u
const f=s.levels[n],g=s.levels[s.loadLevel]
return(null==f?void 0:f.bitrate)<(null==g?void 0:g.bitrate)?n:s.loadLevel}getStarvationDelay(){const t=this.hls,e=t.media
if(!e)return 1/0
const s=e&&0!==e.playbackRate?Math.abs(e.playbackRate):1,i=t.mainForwardBufferInfo
return(i?i.len:0)/s}getBwEstimate(){return this.bwEstimator.canEstimate()?this.bwEstimator.getEstimate():this.hls.config.abrEwmaDefaultEstimate}findBestLevel(t,e,s,i,r,n,a){var o
const l=i+r,h=this.lastLoadedFragLevel,d=-1===h?this.hls.firstLevel:h,{fragCurrent:c,partCurrent:u}=this,{levels:g,allAudioTracks:m,loadLevel:p,config:y}=this.hls
if(1===g.length)return 0
const v=g[d],E=!(null==v||null==(o=v.details)||!o.live),T=-1===p||-1===h
let S,L="SDR",R=(null==v?void 0:v.frameRate)||0
const{audioPreference:b,videoPreference:D}=y,k=this.audioTracksByGroup||(this.audioTracksByGroup=function(t){return t.reduce(((t,e)=>{let s=t.groups[e.groupId]
s||(s=t.groups[e.groupId]={tracks:[],channels:{2:0},hasDefault:!1,hasAutoSelect:!1}),s.tracks.push(e)
const i=e.channels||"2"
return s.channels[i]=(s.channels[i]||0)+1,s.hasDefault=s.hasDefault||e.default,s.hasAutoSelect=s.hasAutoSelect||e.autoselect,s.hasDefault&&(t.hasDefaultAudio=!0),s.hasAutoSelect&&(t.hasAutoSelectAudio=!0),t}),{hasDefaultAudio:!1,hasAutoSelectAudio:!1,groups:{}})}(m))
if(T){if(-1!==this.firstSelection)return this.firstSelection
const i=this.codecTiers||(this.codecTiers=function(t,e,s,i){return t.slice(s,i+1).reduce(((t,s)=>{if(!s.codecSet)return t
const i=s.audioGroups
let r=t[s.codecSet]
r||(t[s.codecSet]=r={minBitrate:1/0,minHeight:1/0,minFramerate:1/0,maxScore:0,videoRanges:{SDR:0},channels:{2:0},hasDefaultAudio:!i,fragmentError:0}),r.minBitrate=Math.min(r.minBitrate,s.bitrate)
const n=Math.min(s.height,s.width)
return r.minHeight=Math.min(r.minHeight,n),r.minFramerate=Math.min(r.minFramerate,s.frameRate),r.maxScore=Math.max(r.maxScore,s.score),r.fragmentError+=s.fragmentError,r.videoRanges[s.videoRange]=(r.videoRanges[s.videoRange]||0)+1,i&&i.forEach((t=>{if(!t)return
const s=e.groups[t]
s&&(r.hasDefaultAudio=r.hasDefaultAudio||e.hasDefaultAudio?s.hasDefault:s.hasAutoSelect||!e.hasDefaultAudio&&!e.hasAutoSelectAudio,Object.keys(s.channels).forEach((t=>{r.channels[t]=(r.channels[t]||0)+s.channels[t]})))})),t}),{})}(g,k,e,s)),r=function(t,e,s,i,r){const n=Object.keys(t),a=null==i?void 0:i.channels,o=null==i?void 0:i.audioCodec,l=a&&2===parseInt(a)
let h=!0,d=!1,c=1/0,u=1/0,g=1/0,m=0,p=[]
const{preferHDR:y,allowedVideoRanges:v}=function(t,e){let s=!1,i=[]
return t&&(s="SDR"!==t,i=[t]),e&&(i=e.allowedVideoRanges||we.slice(0),s=void 0!==e.preferHDR?e.preferHDR:function(){if("function"==typeof matchMedia){const t=matchMedia("(dynamic-range: high)"),e=matchMedia("bad query")
if(t.media!==e.media)return!0===t.matches}return!1}(),i=s?i.filter((t=>"SDR"!==t)):["SDR"]),{preferHDR:s,allowedVideoRanges:i}}(e,r)
for(let f=n.length;f--;){const e=t[n[f]]
h=e.channels[2]>0,c=Math.min(c,e.minHeight),u=Math.min(u,e.minFramerate),g=Math.min(g,e.minBitrate)
const s=v.filter((t=>e.videoRanges[t]>0))
s.length>0&&(d=!0,p=s)}c=f(c)?c:0,u=f(u)?u:0
const E=Math.max(1080,c),T=Math.max(30,u)
return g=f(g)?g:s,s=Math.max(g,s),d||(e=void 0,p=[]),{codecSet:n.reduce(((e,i)=>{const r=t[i]
if(i===e)return e
if(r.minBitrate>s)return ls(i,`min bitrate of ${r.minBitrate} > current estimate of ${s}`),e
if(!r.hasDefaultAudio)return ls(i,"no renditions with default or auto-select sound found"),e
if(o&&i.indexOf(o.substring(0,4))%5!=0)return ls(i,`audio codec preference "${o}" not found`),e
if(a&&!l){if(!r.channels[a])return ls(i,`no renditions with ${a} channel sound found (channels options: ${Object.keys(r.channels)})`),e}else if((!o||l)&&h&&0===r.channels[2])return ls(i,"no renditions with stereo sound found"),e
return r.minHeight>E?(ls(i,`min resolution of ${r.minHeight} > maximum of ${E}`),e):r.minFramerate>T?(ls(i,`min framerate of ${r.minFramerate} > maximum of ${T}`),e):p.some((t=>r.videoRanges[t]>0))?r.maxScore<m?(ls(i,`max score of ${r.maxScore} < selected max of ${m}`),e):e&&(qt(i)>=qt(e)||r.fragmentError>t[e].fragmentError)?e:(m=r.maxScore,i):(ls(i,`no variants with VIDEO-RANGE of ${JSON.stringify(p)} found`),e)}),void 0),videoRanges:p,preferHDR:y,minFramerate:u,minBitrate:g}}(i,L,t,b,D),{codecSet:n,videoRanges:a,minFramerate:o,minBitrate:l,preferHDR:h}=r
S=n,L=h?a[a.length-1]:a[0],R=o,t=Math.max(t,l),A.log(`[abr] picked start tier ${JSON.stringify(r)}`)}else S=null==v?void 0:v.codecSet,L=null==v?void 0:v.videoRange
const I=u?u.duration:c?c.duration:0,C=this.bwEstimator.getEstimateTTFB()/1e3,w=[]
for(let x=s;x>=e;x--){var _
const e=g[x],o=x>d
if(!e)continue
if(y.useMediaCapabilities&&!e.supportedResult&&!e.supportedPromise){const s=navigator.mediaCapabilities
"function"==typeof(null==s?void 0:s.decodingInfo)&&as(e,k,L,R,t,b)?(e.supportedPromise=os(e,k,s),e.supportedPromise.then((t=>{if(!this.hls)return
e.supportedResult=t
const s=this.hls.levels,i=s.indexOf(e)
t.error?A.warn(`[abr] MediaCapabilities decodingInfo error: "${t.error}" for level ${i} ${JSON.stringify(t)}`):t.supported||(A.warn(`[abr] Unsupported MediaCapabilities decodingInfo result for level ${i} ${JSON.stringify(t)}`),i>-1&&s.length>1&&(A.log(`[abr] Removing unsupported level ${i}`),this.hls.removeLevel(i)))}))):e.supportedResult=rs}if(S&&e.codecSet!==S||L&&e.videoRange!==L||o&&R>e.frameRate||!o&&R>0&&R<e.frameRate||e.supportedResult&&(null==(_=e.supportedResult.decodingInfoResults)||!_[0].smooth)){w.push(x)
continue}const c=e.details,m=(u?null==c?void 0:c.partTarget:null==c?void 0:c.averagetargetduration)||I
let D
D=o?a*t:n*t
const P=I&&i>=2*I&&0===r?g[x].averageBitrate:g[x].maxBitrate,M=this.getTimeToLoadFrag(C,D,P*m,void 0===c)
if(D>=P&&(x===h||0===e.loadError&&0===e.fragmentError)&&(M<=C||!f(M)||E&&!this.bitrateTestDelay||M<l)){const t=this.forcedAutoLevel
return x===p||-1!==t&&t===p||(w.length&&A.trace(`[abr] Skipped level(s) ${w.join(",")} of ${s} max with CODECS and VIDEO-RANGE:"${g[w[0]].codecs}" ${g[w[0]].videoRange}; not compatible with "${v.codecs}" ${L}`),A.info(`[abr] switch candidate:${d}->${x} adjustedbw(${Math.round(D)})-bitrate=${Math.round(D-P)} ttfb:${C.toFixed(1)} avgDuration:${m.toFixed(1)} maxFetchDuration:${l.toFixed(1)} fetchDuration:${M.toFixed(1)} firstSelection:${T} codecSet:${S} videoRange:${L} hls.loadLevel:${p}`)),T&&(this.firstSelection=x),x}}return-1}set nextAutoLevel(t){const{maxAutoLevel:e,minAutoLevel:s}=this.hls,i=Math.min(Math.max(t,s),e)
this._nextAutoLevel!==i&&(this.nextAutoLevelKey="",this._nextAutoLevel=i)}}class gs{constructor(){this._boundTick=void 0,this._tickTimer=null,this._tickInterval=null,this._tickCallCount=0,this._boundTick=this.tick.bind(this)}destroy(){this.onHandlerDestroying(),this.onHandlerDestroyed()}onHandlerDestroying(){this.clearNextTick(),this.clearInterval()}onHandlerDestroyed(){}hasInterval(){return!!this._tickInterval}hasNextTick(){return!!this._tickTimer}setInterval(t){return!this._tickInterval&&(this._tickCallCount=0,this._tickInterval=self.setInterval(this._boundTick,t),!0)}clearInterval(){return!!this._tickInterval&&(self.clearInterval(this._tickInterval),this._tickInterval=null,!0)}clearNextTick(){return!!this._tickTimer&&(self.clearTimeout(this._tickTimer),this._tickTimer=null,!0)}tick(){this._tickCallCount++,1===this._tickCallCount&&(this.doTick(),this._tickCallCount>1&&this.tickImmediate(),this._tickCallCount=0)}tickImmediate(){this.clearNextTick(),this._tickTimer=self.setTimeout(this._boundTick,0)}doTick(){}}var ms="NOT_LOADED",ps="APPENDING",ys="PARTIAL",vs="OK"
class Es{constructor(t){this.activePartLists=Object.create(null),this.endListFragments=Object.create(null),this.fragments=Object.create(null),this.timeRanges=Object.create(null),this.bufferPadding=.2,this.hls=void 0,this.hasGaps=!1,this.hls=t,this._registerListeners()}_registerListeners(){const{hls:t}=this
t.on(p.BUFFER_APPENDED,this.onBufferAppended,this),t.on(p.FRAG_BUFFERED,this.onFragBuffered,this),t.on(p.FRAG_LOADED,this.onFragLoaded,this)}_unregisterListeners(){const{hls:t}=this
t.off(p.BUFFER_APPENDED,this.onBufferAppended,this),t.off(p.FRAG_BUFFERED,this.onFragBuffered,this),t.off(p.FRAG_LOADED,this.onFragLoaded,this)}destroy(){this._unregisterListeners(),this.fragments=this.activePartLists=this.endListFragments=this.timeRanges=null}getAppendedFrag(t,e){const s=this.activePartLists[e]
if(s)for(let i=s.length;i--;){const e=s[i]
if(!e)break
const r=e.end
if(e.start<=t&&null!==r&&t<=r)return e}return this.getBufferedFrag(t,e)}getBufferedFrag(t,e){const{fragments:s}=this,i=Object.keys(s)
for(let r=i.length;r--;){const n=s[i[r]]
if((null==n?void 0:n.body.type)===e&&n.buffered){const e=n.body
if(e.start<=t&&t<=e.end)return e}}return null}detectEvictedFragments(t,e,s,i){this.timeRanges&&(this.timeRanges[t]=e)
const r=(null==i?void 0:i.fragment.sn)||-1
Object.keys(this.fragments).forEach((i=>{const n=this.fragments[i]
if(!n)return
if(r>=n.body.sn)return
if(!n.buffered&&!n.loaded)return void(n.body.type===s&&this.removeFragment(n.body))
const a=n.range[t]
a&&a.time.some((t=>{const s=!this.isTimeBuffered(t.startPTS,t.endPTS,e)
return s&&this.removeFragment(n.body),s}))}))}detectPartialFragments(t){const e=this.timeRanges,{frag:s,part:i}=t
if(!e||"initSegment"===s.sn)return
const r=Ss(s),n=this.fragments[r]
if(!n||n.buffered&&s.gap)return
const a=!s.relurl
Object.keys(e).forEach((t=>{const r=s.elementaryStreams[t]
if(!r)return
const o=e[t],l=a||!0===r.partial
n.range[t]=this.getBufferedTimes(s,i,l,o)})),n.loaded=null,Object.keys(n.range).length?(n.buffered=!0,(n.body.endList=s.endList||n.body.endList)&&(this.endListFragments[n.body.type]=n),Ts(n)||this.removeParts(s.sn-1,s.type)):this.removeFragment(n.body)}removeParts(t,e){const s=this.activePartLists[e]
s&&(this.activePartLists[e]=s.filter((e=>e.fragment.sn>=t)))}fragBuffered(t,e){const s=Ss(t)
let i=this.fragments[s]
!i&&e&&(i=this.fragments[s]={body:t,appendedPTS:null,loaded:null,buffered:!1,range:Object.create(null)},t.gap&&(this.hasGaps=!0)),i&&(i.loaded=null,i.buffered=!0)}getBufferedTimes(t,e,s,i){const r={time:[],partial:s},n=t.start,a=t.end,o=t.minEndPTS||a,l=t.maxStartPTS||n
for(let h=0;h<i.length;h++){const t=i.start(h)-this.bufferPadding,e=i.end(h)+this.bufferPadding
if(l>=t&&o<=e){r.time.push({startPTS:Math.max(n,i.start(h)),endPTS:Math.min(a,i.end(h))})
break}if(n<e&&a>t){const t=Math.max(n,i.start(h)),e=Math.min(a,i.end(h))
e>t&&(r.partial=!0,r.time.push({startPTS:t,endPTS:e}))}else if(a<=t)break}return r}getPartialFragment(t){let e,s,i,r=null,n=0
const{bufferPadding:a,fragments:o}=this
return Object.keys(o).forEach((l=>{const h=o[l]
h&&Ts(h)&&(s=h.body.start-a,i=h.body.end+a,t>=s&&t<=i&&(e=Math.min(t-s,i-t),n<=e&&(r=h.body,n=e)))})),r}isEndListAppended(t){const e=this.endListFragments[t]
return void 0!==e&&(e.buffered||Ts(e))}getState(t){const e=Ss(t),s=this.fragments[e]
return s?s.buffered?Ts(s)?ys:vs:ps:ms}isTimeBuffered(t,e,s){let i,r
for(let n=0;n<s.length;n++){if(i=s.start(n)-this.bufferPadding,r=s.end(n)+this.bufferPadding,t>=i&&e<=r)return!0
if(e<=i)return!1}return!1}onFragLoaded(t,e){const{frag:s,part:i}=e
if("initSegment"===s.sn||s.bitrateTest)return
const r=i?null:e,n=Ss(s)
this.fragments[n]={body:s,appendedPTS:null,loaded:r,buffered:!1,range:Object.create(null)}}onBufferAppended(t,e){const{frag:s,part:i,timeRanges:r}=e
if("initSegment"===s.sn)return
const n=s.type
if(i){let t=this.activePartLists[n]
t||(this.activePartLists[n]=t=[]),t.push(i)}this.timeRanges=r,Object.keys(r).forEach((t=>{const e=r[t]
this.detectEvictedFragments(t,e,n,i)}))}onFragBuffered(t,e){this.detectPartialFragments(e)}hasFragment(t){const e=Ss(t)
return!!this.fragments[e]}hasParts(t){var e
return!(null==(e=this.activePartLists[t])||!e.length)}removeFragmentsInRange(t,e,s,i,r){i&&!this.hasGaps||Object.keys(this.fragments).forEach((n=>{const a=this.fragments[n]
if(!a)return
const o=a.body
o.type!==s||i&&!o.gap||o.start<e&&o.end>t&&(a.buffered||r)&&this.removeFragment(o)}))}removeFragment(t){const e=Ss(t)
t.stats.loaded=0,t.clearElementaryStreamInfo()
const s=this.activePartLists[t.type]
if(s){const e=t.sn
this.activePartLists[t.type]=s.filter((t=>t.fragment.sn!==e))}delete this.fragments[e],t.endList&&delete this.endListFragments[t.type]}removeAllFragments(){this.fragments=Object.create(null),this.endListFragments=Object.create(null),this.activePartLists=Object.create(null),this.hasGaps=!1}}function Ts(t){var e,s,i
return t.buffered&&(t.body.gap||(null==(e=t.range.video)?void 0:e.partial)||(null==(s=t.range.audio)?void 0:s.partial)||(null==(i=t.range.audiovideo)?void 0:i.partial))}function Ss(t){return`${t.type}_${t.level}_${t.sn}`}const As={length:0,start:()=>0,end:()=>0}
class Ls{static isBuffered(t,e){try{if(t){const s=Ls.getBuffered(t)
for(let t=0;t<s.length;t++)if(e>=s.start(t)&&e<=s.end(t))return!0}}catch(t){}return!1}static bufferInfo(t,e,s){try{if(t){const i=Ls.getBuffered(t),r=[]
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
break}}return{len:n,start:a||0,end:o||0,nextStart:r}}static getBuffered(t){try{return t.buffered}catch(t){return A.log("failed to get media.buffered",t),As}}}class Rs{constructor(t,e,s,i=0,r=-1,n=!1){this.level=void 0,this.sn=void 0,this.part=void 0,this.id=void 0,this.size=void 0,this.partial=void 0,this.transmuxing={start:0,executeStart:0,executeEnd:0,end:0},this.buffering={audio:{start:0,executeStart:0,executeEnd:0,end:0},video:{start:0,executeStart:0,executeEnd:0,end:0},audiovideo:{start:0,executeStart:0,executeEnd:0,end:0}},this.level=t,this.sn=e,this.id=s,this.size=i,this.part=r,this.partial=n}}function bs(t,e){for(let i=0,r=t.length;i<r;i++){var s
if((null==(s=t[i])?void 0:s.cc)===e)return t[i]}return null}function Ds(t,e){if(t){const s=t.start+e
t.start=t.startPTS=s,t.endPTS=s+t.duration}}function ks(t,e){const s=e.fragments
for(let i=0,r=s.length;i<r;i++)Ds(s[i],t)
e.fragmentHint&&Ds(e.fragmentHint,t),e.alignedSliding=!0}function Is(t,e){if(!t.hasProgramDateTime||!e.hasProgramDateTime)return
const s=t.fragments,i=e.fragments
if(!s.length||!i.length)return
let r,n
const a=Math.min(e.endCC,t.endCC)
e.startCC<a&&t.startCC<a&&(r=bs(i,a),n=bs(s,a)),r&&n||(r=i[Math.floor(i.length/2)],n=bs(s,r.cc)||s[Math.floor(s.length/2)])
const o=r.programDateTime,l=n.programDateTime
o&&l&&ks((l-o)/1e3-(n.start-r.start),t)}const Cs=Math.pow(2,17)
class ws{constructor(t){this.config=void 0,this.loader=null,this.partLoadTimeout=-1,this.config=t}destroy(){this.loader&&(this.loader.destroy(),this.loader=null)}abort(){this.loader&&this.loader.abort()}load(t,e){const s=t.url
if(!s)return Promise.reject(new Ps({type:y.NETWORK_ERROR,details:v.FRAG_LOAD_ERROR,fatal:!1,frag:t,error:new Error("Fragment does not have a "+(s?"part list":"url")),networkDetails:null}))
this.abort()
const i=this.config,r=i.fLoader,n=i.loader
return new Promise(((a,o)=>{if(this.loader&&this.loader.destroy(),t.gap){if(t.tagList.some((t=>"GAP"===t[0])))return void o(xs(t))
t.gap=!1}const l=this.loader=t.loader=r?new r(i):new n(i),h=_s(t),d=We(i.fragLoadPolicy.default),u={loadPolicy:d,timeout:d.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0,highWaterMark:"initSegment"===t.sn?1/0:Cs}
t.stats=l.stats,l.load(h,u,{onSuccess:(e,s,i,r)=>{this.resetLoader(t,l)
let n=e.data
i.resetIV&&t.decryptdata&&(t.decryptdata.iv=new Uint8Array(n.slice(0,16)),n=n.slice(16)),a({frag:t,part:null,payload:n,networkDetails:r})},onError:(e,i,r,n)=>{this.resetLoader(t,l),o(new Ps({type:y.NETWORK_ERROR,details:v.FRAG_LOAD_ERROR,fatal:!1,frag:t,response:c({url:s,data:void 0},e),error:new Error(`HTTP Error ${e.code} ${e.text}`),networkDetails:r,stats:n}))},onAbort:(e,s,i)=>{this.resetLoader(t,l),o(new Ps({type:y.NETWORK_ERROR,details:v.INTERNAL_ABORTED,fatal:!1,frag:t,error:new Error("Aborted"),networkDetails:i,stats:e}))},onTimeout:(e,s,i)=>{this.resetLoader(t,l),o(new Ps({type:y.NETWORK_ERROR,details:v.FRAG_LOAD_TIMEOUT,fatal:!1,frag:t,error:new Error(`Timeout after ${u.timeout}ms`),networkDetails:i,stats:e}))},onProgress:(s,i,r,n)=>{e&&e({frag:t,part:null,payload:r,networkDetails:n})}})}))}loadPart(t,e,s){this.abort()
const i=this.config,r=i.fLoader,n=i.loader
return new Promise(((a,o)=>{if(this.loader&&this.loader.destroy(),t.gap||e.gap)return void o(xs(t,e))
const l=this.loader=t.loader=r?new r(i):new n(i),h=_s(t,e),d=We(i.fragLoadPolicy.default),u={loadPolicy:d,timeout:d.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0,highWaterMark:Cs}
e.stats=l.stats,l.load(h,u,{onSuccess:(i,r,n,o)=>{this.resetLoader(t,l),this.updateStatsFromPart(t,e)
const h={frag:t,part:e,payload:i.data,networkDetails:o}
s(h),a(h)},onError:(s,i,r,n)=>{this.resetLoader(t,l),o(new Ps({type:y.NETWORK_ERROR,details:v.FRAG_LOAD_ERROR,fatal:!1,frag:t,part:e,response:c({url:h.url,data:void 0},s),error:new Error(`HTTP Error ${s.code} ${s.text}`),networkDetails:r,stats:n}))},onAbort:(s,i,r)=>{t.stats.aborted=e.stats.aborted,this.resetLoader(t,l),o(new Ps({type:y.NETWORK_ERROR,details:v.INTERNAL_ABORTED,fatal:!1,frag:t,part:e,error:new Error("Aborted"),networkDetails:r,stats:s}))},onTimeout:(s,i,r)=>{this.resetLoader(t,l),o(new Ps({type:y.NETWORK_ERROR,details:v.FRAG_LOAD_TIMEOUT,fatal:!1,frag:t,part:e,error:new Error(`Timeout after ${u.timeout}ms`),networkDetails:r,stats:s}))}})}))}updateStatsFromPart(t,e){const s=t.stats,i=e.stats,r=i.total
if(s.loaded+=i.loaded,r){const i=Math.round(t.duration/e.duration),n=Math.min(Math.round(s.loaded/r),i),a=(i-n)*Math.round(s.loaded/n)
s.total=s.loaded+a}else s.total=Math.max(s.loaded,s.total)
const n=s.loading,a=i.loading
n.start?n.first+=a.first-a.start:(n.start=a.start,n.first=a.first),n.end=a.end}resetLoader(t,e){t.loader=null,this.loader===e&&(self.clearTimeout(this.partLoadTimeout),this.loader=null),e.destroy()}}function _s(t,e=null){const s=e||t,i={frag:t,part:e,responseType:"arraybuffer",url:s.url,headers:{},rangeStart:0,rangeEnd:0},r=s.byteRangeStartOffset,n=s.byteRangeEndOffset
if(f(r)&&f(n)){var a
let e=r,s=n
if("initSegment"===t.sn&&"AES-128"===(null==(a=t.decryptdata)?void 0:a.method)){const t=n-r
t%16&&(s=n+(16-t%16)),0!==r&&(i.resetIV=!0,e=r-16)}i.rangeStart=e,i.rangeEnd=s}return i}function xs(t,e){const s=new Error(`GAP ${t.gap?"tag":"attribute"} found`),i={type:y.MEDIA_ERROR,details:v.FRAG_GAP,fatal:!1,frag:t,error:s,networkDetails:null}
return e&&(i.part=e),(e||t).stats.aborted=!0,new Ps(i)}class Ps extends Error{constructor(t){super(t.error.message),this.data=void 0,this.data=t}}class Ms{constructor(t,e){this.subtle=void 0,this.aesIV=void 0,this.subtle=t,this.aesIV=e}decrypt(t,e){return this.subtle.decrypt({name:"AES-CBC",iv:this.aesIV},e,t)}}class Fs{constructor(t,e){this.subtle=void 0,this.key=void 0,this.subtle=t,this.key=e}expandKey(){return this.subtle.importKey("raw",this.key,{name:"AES-CBC"},!1,["encrypt","decrypt"])}}class Os{constructor(){this.rcon=[0,1,2,4,8,16,32,64,128,27,54],this.subMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.invSubMix=[new Uint32Array(256),new Uint32Array(256),new Uint32Array(256),new Uint32Array(256)],this.sBox=new Uint32Array(256),this.invSBox=new Uint32Array(256),this.key=new Uint32Array(0),this.ksRows=0,this.keySize=0,this.keySchedule=void 0,this.invKeySchedule=void 0,this.initTable()}uint8ArrayToUint32Array_(t){const e=new DataView(t),s=new Uint32Array(4)
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
let y,v
for(a=0;a<n;a++)a<r?y=l[a]=e[a]:(v=y,a%r==0?(v=v<<8|v>>>24,v=d[v>>>24]<<24|d[v>>>16&255]<<16|d[v>>>8&255]<<8|d[255&v],v^=c[a/r|0]<<24):r>6&&a%r==4&&(v=d[v>>>24]<<24|d[v>>>16&255]<<16|d[v>>>8&255]<<8|d[255&v]),l[a]=y=(l[a-r]^v)>>>0)
for(o=0;o<n;o++)a=n-o,v=3&o?l[a]:l[a-4],h[o]=o<4||a<=4?v:f[d[v>>>24]]^g[d[v>>>16&255]]^m[d[v>>>8&255]]^p[d[255&v]],h[o]=h[o]>>>0}networkToHostOrderSwap(t){return t<<24|(65280&t)<<8|(16711680&t)>>8|t>>>24}decrypt(t,e,s){const i=this.keySize+6,r=this.invKeySchedule,n=this.invSBox,a=this.invSubMix,o=a[0],l=a[1],h=a[2],d=a[3],c=this.uint8ArrayToUint32Array_(s)
let u=c[0],f=c[1],g=c[2],m=c[3]
const p=new Int32Array(t),y=new Int32Array(p.length)
let v,E,T,S,A,L,R,b,D,k,I,C,w,_
const x=this.networkToHostOrderSwap
for(;e<p.length;){for(D=x(p[e]),k=x(p[e+1]),I=x(p[e+2]),C=x(p[e+3]),A=D^r[0],L=C^r[1],R=I^r[2],b=k^r[3],w=4,_=1;_<i;_++)v=o[A>>>24]^l[L>>16&255]^h[R>>8&255]^d[255&b]^r[w],E=o[L>>>24]^l[R>>16&255]^h[b>>8&255]^d[255&A]^r[w+1],T=o[R>>>24]^l[b>>16&255]^h[A>>8&255]^d[255&L]^r[w+2],S=o[b>>>24]^l[A>>16&255]^h[L>>8&255]^d[255&R]^r[w+3],A=v,L=E,R=T,b=S,w+=4
v=n[A>>>24]<<24^n[L>>16&255]<<16^n[R>>8&255]<<8^n[255&b]^r[w],E=n[L>>>24]<<24^n[R>>16&255]<<16^n[b>>8&255]<<8^n[255&A]^r[w+1],T=n[R>>>24]<<24^n[b>>16&255]<<16^n[A>>8&255]<<8^n[255&L]^r[w+2],S=n[b>>>24]<<24^n[A>>16&255]<<16^n[L>>8&255]<<8^n[255&R]^r[w+3],y[e]=x(v^u),y[e+1]=x(S^f),y[e+2]=x(T^g),y[e+3]=x(E^m),u=D,f=k,g=I,m=C,e+=4}return y.buffer}}class Ns{constructor(t,{removePKCS7Padding:e=!0}={}){if(this.logEnabled=!0,this.removePKCS7Padding=void 0,this.subtle=null,this.softwareDecrypter=null,this.key=null,this.fastAesKey=null,this.remainderData=null,this.currentIV=null,this.currentResult=null,this.useSoftware=void 0,this.useSoftware=t.enableSoftwareAES,this.removePKCS7Padding=e,e)try{const t=self.crypto
t&&(this.subtle=t.subtle||t.webkitSubtle)}catch(t){}this.useSoftware=!this.subtle}destroy(){this.subtle=null,this.softwareDecrypter=null,this.key=null,this.fastAesKey=null,this.remainderData=null,this.currentIV=null,this.currentResult=null}isSync(){return this.useSoftware}flush(){const{currentResult:t,remainderData:e}=this
if(!t||e)return this.reset(),null
const s=new Uint8Array(t)
return this.reset(),this.removePKCS7Padding?function(t){const e=t.byteLength,s=e&&new DataView(t.buffer).getUint8(e-1)
return s?W(t,0,e-s):t}(s):s}reset(){this.currentResult=null,this.currentIV=null,this.remainderData=null,this.softwareDecrypter&&(this.softwareDecrypter=null)}decrypt(t,e,s){return this.useSoftware?new Promise(((i,r)=>{this.softwareDecrypt(new Uint8Array(t),e,s)
const n=this.flush()
n?i(n.buffer):r(new Error("[softwareDecrypt] Failed to decrypt data"))})):this.webCryptoDecrypt(new Uint8Array(t),e,s)}softwareDecrypt(t,e,s){const{currentIV:i,currentResult:r,remainderData:n}=this
this.logOnce("JS AES decrypt"),n&&(t=It(n,t),this.remainderData=null)
const a=this.getValidChunk(t)
if(!a.length)return null
i&&(s=i)
let o=this.softwareDecrypter
o||(o=this.softwareDecrypter=new Os),o.expandKey(e)
const l=r
return this.currentResult=o.decrypt(a.buffer,0,s),this.currentIV=W(a,-16).buffer,l||null}webCryptoDecrypt(t,e,s){if(this.key!==e||!this.fastAesKey){if(!this.subtle)return Promise.resolve(this.onWebCryptoError(t,e,s))
this.key=e,this.fastAesKey=new Fs(this.subtle,e)}return this.fastAesKey.expandKey().then((e=>this.subtle?(this.logOnce("WebCrypto AES decrypt"),new Ms(this.subtle,new Uint8Array(s)).decrypt(t.buffer,e)):Promise.reject(new Error("web crypto not initialized")))).catch((i=>(A.warn(`[decrypter]: WebCrypto Error, disable WebCrypto API, ${i.name}: ${i.message}`),this.onWebCryptoError(t,e,s))))}onWebCryptoError(t,e,s){this.useSoftware=!0,this.logEnabled=!0,this.softwareDecrypt(t,e,s)
const i=this.flush()
if(i)return i.buffer
throw new Error("WebCrypto and softwareDecrypt: failed to decrypt data")}getValidChunk(t){let e=t
const s=t.length-t.length%16
return s!==t.length&&(e=W(t,0,s),this.remainderData=W(t,s)),e}logOnce(t){this.logEnabled&&(A.log(`[decrypter]: ${t}`),this.logEnabled=!1)}}const Us="STOPPED",Bs="IDLE",$s="KEY_LOADING",Gs="FRAG_LOADING",Ks="FRAG_LOADING_WAITING_RETRY",Hs="WAITING_TRACK",Vs="PARSING",Ys="PARSED",Ws="ENDED",js="ERROR",qs="WAITING_INIT_PTS",Xs="WAITING_LEVEL"
class zs extends gs{constructor(t,e,s,i,r){super(),this.hls=void 0,this.fragPrevious=null,this.fragCurrent=null,this.fragmentTracker=void 0,this.transmuxer=null,this._state=Us,this.playlistType=void 0,this.media=null,this.mediaBuffer=null,this.config=void 0,this.bitrateTest=!1,this.lastCurrentTime=0,this.nextLoadPosition=0,this.startPosition=0,this.startTimeOffset=null,this.loadedmetadata=!1,this.retryDate=0,this.levels=null,this.fragmentLoader=void 0,this.keyLoader=void 0,this.levelLastLoaded=null,this.startFragRequested=!1,this.decrypter=void 0,this.initPTS=[],this.onvseeking=null,this.onvended=null,this.logPrefix="",this.log=void 0,this.warn=void 0,this.playlistType=r,this.logPrefix=i,this.log=A.log.bind(A,`${i}:`),this.warn=A.warn.bind(A,`${i}:`),this.hls=t,this.fragmentLoader=new ws(t.config),this.keyLoader=s,this.fragmentTracker=e,this.config=t.config,this.decrypter=new Ns(t.config),t.on(p.MANIFEST_LOADED,this.onManifestLoaded,this)}doTick(){this.onTickEnd()}onTickEnd(){}startLoad(t){}stopLoad(){this.fragmentLoader.abort(),this.keyLoader.abort(this.playlistType)
const t=this.fragCurrent
null!=t&&t.loader&&(t.abortRequests(),this.fragmentTracker.removeFragment(t)),this.resetTransmuxer(),this.fragCurrent=null,this.fragPrevious=null,this.clearInterval(),this.clearNextTick(),this.state=Us}_streamEnded(t,e){if(e.live||t.nextStart||!t.end||!this.media)return!1
const s=e.partList
if(null!=s&&s.length){const t=s[s.length-1]
return Ls.isBuffered(this.media,t.start+t.duration/2)}const i=e.fragments[e.fragments.length-1].type
return this.fragmentTracker.isEndListAppended(i)}getLevelDetails(){var t
if(this.levels&&null!==this.levelLastLoaded)return null==(t=this.levelLastLoaded)?void 0:t.details}onMediaAttached(t,e){const s=this.media=this.mediaBuffer=e.media
this.onvseeking=this.onMediaSeeking.bind(this),this.onvended=this.onMediaEnded.bind(this),s.addEventListener("seeking",this.onvseeking),s.addEventListener("ended",this.onvended)
const i=this.config
this.levels&&i.autoStartLoad&&this.state===Us&&this.startLoad(i.startPosition)}onMediaDetaching(){const t=this.media
null!=t&&t.ended&&(this.log("MSE detaching and video ended, reset startPosition"),this.startPosition=this.lastCurrentTime=0),t&&this.onvseeking&&this.onvended&&(t.removeEventListener("seeking",this.onvseeking),t.removeEventListener("ended",this.onvended),this.onvseeking=this.onvended=null),this.keyLoader&&this.keyLoader.detach(),this.media=this.mediaBuffer=null,this.loadedmetadata=!1,this.fragmentTracker.removeAllFragments(),this.stopLoad()}onMediaSeeking(){const{config:t,fragCurrent:e,media:s,mediaBuffer:i,state:r}=this,n=s?s.currentTime:0,a=Ls.bufferInfo(i||s,n,t.maxBufferHole)
if(this.log(`media seeking to ${f(n)?n.toFixed(3):n}, state: ${r}`),this.state===Ws)this.resetLoadingState()
else if(e){const s=t.maxFragLookUpTolerance,i=e.start-s,r=e.start+e.duration+s
if(!a.len||r<a.start||i>a.end){const t=n>r;(n<i||t)&&(t&&e.loader&&(this.log("seeking outside of buffer while fragment load in progress, cancel fragment load"),e.abortRequests(),this.resetLoadingState()),this.fragPrevious=null)}}s&&(this.fragmentTracker.removeFragmentsInRange(n,1/0,this.playlistType,!0),this.lastCurrentTime=n),this.loadedmetadata||a.len||(this.nextLoadPosition=this.startPosition=n),this.tickImmediate()}onMediaEnded(){this.startPosition=this.lastCurrentTime=0}onManifestLoaded(t,e){this.startTimeOffset=e.startTimeOffset,this.initPTS=[]}onHandlerDestroying(){this.hls.off(p.MANIFEST_LOADED,this.onManifestLoaded,this),this.stopLoad(),super.onHandlerDestroying(),this.hls=null}onHandlerDestroyed(){this.state=Us,this.fragmentLoader&&this.fragmentLoader.destroy(),this.keyLoader&&this.keyLoader.destroy(),this.decrypter&&this.decrypter.destroy(),this.hls=this.log=this.warn=this.decrypter=this.keyLoader=this.fragmentLoader=this.fragmentTracker=null,super.onHandlerDestroyed()}loadFragment(t,e,s){this._loadFragForPlayback(t,e,s)}_loadFragForPlayback(t,e,s){this._doFragLoad(t,e,s,(e=>{if(this.fragContextChanged(t))return this.warn(`Fragment ${t.sn}${e.part?" p: "+e.part.index:""} of level ${t.level} was dropped during download.`),void this.fragmentTracker.removeFragment(t)
t.stats.chunkCount++,this._handleFragmentLoadProgress(e)})).then((e=>{if(!e)return
const s=this.state
this.fragContextChanged(t)?(s===Gs||!this.fragCurrent&&s===Vs)&&(this.fragmentTracker.removeFragment(t),this.state=Bs):("payload"in e&&(this.log(`Loaded fragment ${t.sn} of level ${t.level}`),this.hls.trigger(p.FRAG_LOADED,e)),this._handleFragmentLoadComplete(e))})).catch((e=>{this.state!==Us&&this.state!==js&&(this.warn(`Frag error: ${(null==e?void 0:e.message)||e}`),this.resetFragmentLoading(t))}))}clearTrackerIfNeeded(t){var e
const{fragmentTracker:s}=this
if(s.getState(t)===ps){const e=t.type,i=this.getFwdBufferInfo(this.mediaBuffer,e),r=Math.max(t.duration,i?i.len:this.config.maxBufferLength),n=this.backtrackFragment;(1==(n?t.sn-n.sn:0)||this.reduceMaxBufferLength(r,t.duration))&&s.removeFragment(t)}else 0===(null==(e=this.mediaBuffer)?void 0:e.buffered.length)?s.removeAllFragments():s.hasParts(t.type)&&(s.detectPartialFragments({frag:t,part:null,stats:t.stats,id:t.type}),s.getState(t)===ys&&s.removeFragment(t))}checkLiveUpdate(t){if(t.updated&&!t.live){const e=t.fragments[t.fragments.length-1]
this.fragmentTracker.detectPartialFragments({frag:e,part:null,stats:e.stats,id:e.type})}t.fragments[0]||(t.deltaUpdateFailed=!0)}flushMainBuffer(t,e,s=null){if(!(t-e))return
const i={startOffset:t,endOffset:e,type:s}
this.hls.trigger(p.BUFFER_FLUSHING,i)}_loadInitSegment(t,e){this._doFragLoad(t,e).then((e=>{if(!e||this.fragContextChanged(t)||!this.levels)throw new Error("init load aborted")
return e})).then((e=>{const{hls:s}=this,{payload:i}=e,r=t.decryptdata
if(i&&i.byteLength>0&&null!=r&&r.key&&r.iv&&"AES-128"===r.method){const n=self.performance.now()
return this.decrypter.decrypt(new Uint8Array(i),r.key.buffer,r.iv.buffer).catch((e=>{throw s.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.FRAG_DECRYPT_ERROR,fatal:!1,error:e,reason:e.message,frag:t}),e})).then((i=>{const r=self.performance.now()
return s.trigger(p.FRAG_DECRYPTED,{frag:t,payload:i,stats:{tstart:n,tdecrypt:r}}),e.payload=i,this.completeInitSegmentLoad(e)}))}return this.completeInitSegmentLoad(e)})).catch((e=>{this.state!==Us&&this.state!==js&&(this.warn(e),this.resetFragmentLoading(t))}))}completeInitSegmentLoad(t){const{levels:e}=this
if(!e)throw new Error("init load aborted, missing levels")
const s=t.frag.stats
this.state=Bs,t.frag.data=new Uint8Array(t.payload),s.parsing.start=s.buffering.start=self.performance.now(),s.parsing.end=s.buffering.end=self.performance.now(),this.tick()}fragContextChanged(t){const{fragCurrent:e}=this
return!t||!e||t.sn!==e.sn||t.level!==e.level}fragBufferedComplete(t,e){var s,i,r,n
const a=this.mediaBuffer?this.mediaBuffer:this.media
if(this.log(`Buffered ${t.type} sn: ${t.sn}${e?" part: "+e.index:""} of ${this.playlistType===fe.MAIN?"level":"track"} ${t.level} (frag:[${(null!=(s=t.startPTS)?s:NaN).toFixed(3)}-${(null!=(i=t.endPTS)?i:NaN).toFixed(3)}] > buffer:${a?function(t){let e=""
const s=t.length
for(let i=0;i<s;i++)e+=`[${t.start(i).toFixed(3)}-${t.end(i).toFixed(3)}]`
return e}(Ls.getBuffered(a)):"(detached)"})`),"initSegment"!==t.sn){var o
if(t.type!==fe.SUBTITLE){const e=t.elementaryStreams
if(!Object.keys(e).some((t=>!!e[t])))return void(this.state=Bs)}const e=null==(o=this.levels)?void 0:o[t.level]
null!=e&&e.fragmentError&&(this.log(`Resetting level fragment error count of ${e.fragmentError} on frag buffered`),e.fragmentError=0)}this.state=Bs,a&&(!this.loadedmetadata&&t.type==fe.MAIN&&a.buffered.length&&(null==(r=this.fragCurrent)?void 0:r.sn)===(null==(n=this.fragPrevious)?void 0:n.sn)&&(this.loadedmetadata=!0,this.seekToStartPos()),this.tick())}seekToStartPos(){}_handleFragmentLoadComplete(t){const{transmuxer:e}=this
if(!e)return
const{frag:s,part:i,partsLoaded:r}=t,n=!r||0===r.length||r.some((t=>!t)),a=new Rs(s.level,s.sn,s.stats.chunkCount+1,0,i?i.index:-1,!n)
e.flush(a)}_handleFragmentLoadProgress(t){}_doFragLoad(t,e,s=null,i){var r
const n=null==e?void 0:e.details
if(!this.levels||!n)throw new Error(`frag load aborted, missing level${n?"":" detail"}s`)
let a=null
if(!t.encrypted||null!=(r=t.decryptdata)&&r.key?!t.encrypted&&n.encryptedFragments.length&&this.keyLoader.loadClear(t,n.encryptedFragments):(this.log(`Loading key for ${t.sn} of [${n.startSN}-${n.endSN}], ${"[stream-controller]"===this.logPrefix?"level":"track"} ${t.level}`),this.state=$s,this.fragCurrent=t,a=this.keyLoader.load(t).then((t=>{if(!this.fragContextChanged(t.frag))return this.hls.trigger(p.KEY_LOADED,t),this.state===$s&&(this.state=Bs),t})),this.hls.trigger(p.KEY_LOADING,{frag:t}),null===this.fragCurrent&&(a=Promise.reject(new Error("frag load aborted, context changed in KEY_LOADING")))),s=Math.max(t.start,s||0),this.config.lowLatencyMode&&"initSegment"!==t.sn){const r=n.partList
if(r&&i){s>t.end&&n.fragmentHint&&(t=n.fragmentHint)
const o=this.getNextPart(r,t,s)
if(o>-1){const l=r[o]
let h
return this.log(`Loading part sn: ${t.sn} p: ${l.index} cc: ${t.cc} of playlist [${n.startSN}-${n.endSN}] parts [0-${o}-${r.length-1}] ${"[stream-controller]"===this.logPrefix?"level":"track"}: ${t.level}, target: ${parseFloat(s.toFixed(3))}`),this.nextLoadPosition=l.start+l.duration,this.state=Gs,h=a?a.then((s=>!s||this.fragContextChanged(s.frag)?null:this.doFragPartsLoad(t,l,e,i))).catch((t=>this.handleFragLoadError(t))):this.doFragPartsLoad(t,l,e,i).catch((t=>this.handleFragLoadError(t))),this.hls.trigger(p.FRAG_LOADING,{frag:t,part:l,targetBufferTime:s}),null===this.fragCurrent?Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING parts")):h}if(!t.url||this.loadedEndOfParts(r,s))return Promise.resolve(null)}}this.log(`Loading fragment ${t.sn} cc: ${t.cc} ${n?"of ["+n.startSN+"-"+n.endSN+"] ":""}${"[stream-controller]"===this.logPrefix?"level":"track"}: ${t.level}, target: ${parseFloat(s.toFixed(3))}`),f(t.sn)&&!this.bitrateTest&&(this.nextLoadPosition=t.start+t.duration),this.state=Gs
const o=this.config.progressive
let l
return l=o&&a?a.then((e=>!e||this.fragContextChanged(null==e?void 0:e.frag)?null:this.fragmentLoader.load(t,i))).catch((t=>this.handleFragLoadError(t))):Promise.all([this.fragmentLoader.load(t,o?i:void 0),a]).then((([t])=>(!o&&t&&i&&i(t),t))).catch((t=>this.handleFragLoadError(t))),this.hls.trigger(p.FRAG_LOADING,{frag:t,targetBufferTime:s}),null===this.fragCurrent?Promise.reject(new Error("frag load aborted, context changed in FRAG_LOADING")):l}doFragPartsLoad(t,e,s,i){return new Promise(((r,n)=>{var a
const o=[],l=null==(a=s.details)?void 0:a.partList,h=e=>{this.fragmentLoader.loadPart(t,e,i).then((i=>{o[e.index]=i
const n=i.part
this.hls.trigger(p.FRAG_LOADED,i)
const a=$e(s,t.sn,e.index+1)||Ge(l,t.sn,e.index+1)
if(!a)return r({frag:t,part:n,partsLoaded:o})
h(a)})).catch(n)}
h(e)}))}handleFragLoadError(t){if("data"in t){const e=t.data
t.data&&e.details===v.INTERNAL_ABORTED?this.handleFragLoadAborted(e.frag,e.part):this.hls.trigger(p.ERROR,e)}else this.hls.trigger(p.ERROR,{type:y.OTHER_ERROR,details:v.INTERNAL_EXCEPTION,err:t,error:t,fatal:!0})
return null}_handleTransmuxerFlush(t){const e=this.getCurrentContext(t)
if(!e||this.state!==Vs)return void(this.fragCurrent||this.state===Us||this.state===js||(this.state=Bs))
const{frag:s,part:i,level:r}=e,n=self.performance.now()
s.stats.parsing.end=n,i&&(i.stats.parsing.end=n),this.updateLevelTiming(s,i,r,t.partial)}getCurrentContext(t){const{levels:e,fragCurrent:s}=this,{level:i,sn:r,part:n}=t
if(null==e||!e[i])return this.warn(`Levels object was unset while buffering fragment ${r} of level ${i}. The current chunk will not be buffered.`),null
const a=e[i],o=n>-1?$e(a,r,n):null,l=o?o.fragment:function(t,e,s){if(null==t||!t.details)return null
const i=t.details
let r=i.fragments[e-i.startSN]
return r||(r=i.fragmentHint,r&&r.sn===e?r:e<i.startSN&&s&&s.sn===e?s:null)}(a,r,s)
return l?(s&&s!==l&&(l.stats=s.stats),{frag:l,part:o,level:a}):null}bufferFragmentData(t,e,s,i,r){var n
if(!t||this.state!==Vs)return
const{data1:a,data2:o}=t
let l=a
if(a&&o&&(l=It(a,o)),null==(n=l)||!n.length)return
const h={type:t.type,frag:e,part:s,chunkMeta:i,parent:e.type,data:l}
if(this.hls.trigger(p.BUFFER_APPENDING,h),t.dropped&&t.independent&&!s){if(r)return
this.flushBufferGap(e)}}flushBufferGap(t){const e=this.media
if(!e)return
if(!Ls.isBuffered(e,e.currentTime))return void this.flushMainBuffer(0,t.start)
const s=e.currentTime,i=Ls.bufferInfo(e,s,0),r=t.duration,n=Math.min(2*this.config.maxFragLookUpTolerance,.25*r),a=Math.max(Math.min(t.start-n,i.end-n),s+n)
t.start-a>n&&this.flushMainBuffer(a,t.start)}getFwdBufferInfo(t,e){const s=this.getLoadPosition()
return f(s)?this.getFwdBufferInfoAtPos(t,s,e):null}getFwdBufferInfoAtPos(t,e,s){const{config:{maxBufferHole:i}}=this,r=Ls.bufferInfo(t,e,i)
if(0===r.len&&void 0!==r.nextStart){const n=this.fragmentTracker.getBufferedFrag(e,s)
if(n&&r.nextStart<n.end)return Ls.bufferInfo(t,e,Math.max(r.nextStart,i))}return r}getMaxBufferLength(t){const{config:e}=this
let s
return s=t?Math.max(8*e.maxBufferSize/t,e.maxBufferLength):e.maxBufferLength,Math.min(s,e.maxMaxBufferLength)}reduceMaxBufferLength(t,e){const s=this.config,i=Math.max(Math.min(t-e,s.maxBufferLength),e),r=Math.max(t-3*e,s.maxMaxBufferLength/2,i)
return r>=i&&(s.maxMaxBufferLength=r,this.warn(`Reduce max buffer length to ${r}s`),!0)}getAppendedFrag(t,e=fe.MAIN){const s=this.fragmentTracker.getAppendedFrag(t,fe.MAIN)
return s&&"fragment"in s?s.fragment:s}getNextFragment(t,e){const s=e.fragments,i=s.length
if(!i)return null
const{config:r}=this,n=s[0].start
let a
if(e.live){const o=r.initialLiveManifestSize
if(i<o)return this.warn(`Not enough fragments to start playback (have: ${i}, need: ${o})`),null;(!e.PTSKnown&&!this.startFragRequested&&-1===this.startPosition||t<n)&&(a=this.getInitialLiveFragment(e,s),this.startPosition=this.nextLoadPosition=a?this.hls.liveSyncPosition||a.start:t)}else t<=n&&(a=s[0])
if(!a){const s=r.lowLatencyMode?e.partEnd:e.fragmentEnd
a=this.getFragmentAtPosition(t,s,e)}return this.mapToInitFragWhenRequired(a)}isLoopLoading(t,e){const s=this.fragmentTracker.getState(t)
return(s===vs||s===ys&&!!t.gap)&&this.nextLoadPosition>e}getNextFragmentLoopLoading(t,e,s,i,r){const n=t.gap,a=this.getNextFragment(this.nextLoadPosition,e)
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
if(Qe(e,s,r))return r}return null}(e,s.endProgramDateTime,this.config.maxFragLookUpTolerance)),!i){const r=s.sn+1
if(r>=t.startSN&&r<=t.endSN){const n=e[r-t.startSN]
s.cc===n.cc&&(i=n,this.log(`Live playlist, switching playlist, load frag with next SN: ${i.sn}`))}i||(i=function(t,e){return qe(t,(t=>t.cc<e?1:t.cc>e?-1:0))}(e,s.cc),i&&this.log(`Live playlist, switching playlist, load frag with same CC: ${i.sn}`))}}else{const e=this.hls.liveSyncPosition
null!==e&&(i=this.getFragmentAtPosition(e,this.bitrateTest?t.fragmentEnd:t.edge,t))}return i}getFragmentAtPosition(t,e,s){const{config:i}=this
let{fragPrevious:r}=this,{fragments:n,endSN:a}=s
const{fragmentHint:o}=s,{maxFragLookUpTolerance:l}=i,h=s.partList,d=!!(i.lowLatencyMode&&null!=h&&h.length&&o)
let c
if(d&&o&&!this.bitrateTest&&(n=n.concat(o),a=o.sn),c=t<e?Xe(r,n,t,t>e-l?0:l):n[n.length-1],c){const t=c.sn-s.startSN,e=this.fragmentTracker.getState(c)
if((e===vs||e===ys&&c.gap)&&(r=c),r&&c.sn===r.sn&&(!d||h[0].fragment.sn>c.sn)&&r&&c.level===r.level){const e=n[t+1]
c=c.sn<a&&this.fragmentTracker.getState(e)!==vs?e:null}}return c}synchronizeToLiveEdge(t){const{config:e,media:s}=this
if(!s)return
const i=this.hls.liveSyncPosition,r=s.currentTime,n=t.fragments[0].start,a=t.edge,o=r>=n-e.maxFragLookUpTolerance&&r<=a
if(null!==i&&s.duration>i&&(r<i||!o)){const n=void 0!==e.liveMaxLatencyDuration?e.liveMaxLatencyDuration:e.liveMaxLatencyDurationCount*t.targetduration;(!o&&s.readyState<4||r<a-n)&&(this.loadedmetadata||(this.nextLoadPosition=i),s.readyState&&(this.warn(`Playback: ${r.toFixed(3)} is located too far from the end of live sliding playlist: ${a}, reset currentTime to : ${i.toFixed(3)}`),s.currentTime=i))}}alignPlaylists(t,e,s){const i=t.fragments.length
if(!i)return this.warn("No fragments in live playlist"),0
const r=t.fragments[0].start,n=!e,a=t.alignedSliding&&f(r)
if(n||!a&&!r){const{fragPrevious:r}=this
!function(t,e,s){e&&(function(t,e,s){if(function(t,e,s){return!(!e||!(s.endCC>s.startCC||t&&t.cc<s.startCC))}(t,s,e)){const t=function(t,e){const s=t.fragments,i=e.fragments
if(!i.length||!s.length)return void A.log("No fragments to align")
const r=bs(s,i[0].cc)
if(r&&(!r||r.startPTS))return r
A.log("No frag in previous level to align on")}(s,e)
t&&f(t.start)&&(A.log(`Adjusting PTS using last level due to CC increase within current level ${e.url}`),ks(t.start,e))}}(t,s,e),!s.alignedSliding&&e&&Is(s,e),s.alignedSliding||!e||s.skippedSegments||Ue(e,s))}(r,s,t)
const n=t.fragments[0].start
return this.log(`Live playlist sliding: ${n.toFixed(2)} start-sn: ${e?e.startSN:"na"}->${t.startSN} prev-sn: ${r?r.sn:"na"} fragments: ${i}`),n}return r}waitForCdnTuneIn(t){return t.live&&t.canBlockReload&&t.partTarget&&t.tuneInGoal>Math.max(t.partHoldBack,3*t.partTarget)}setStartPosition(t,e){let s=this.startPosition
if(s<e&&(s=-1),-1===s||-1===this.lastCurrentTime){const i=null!==this.startTimeOffset,r=i?this.startTimeOffset:t.startTimeOffset
null!==r&&f(r)?(s=e+r,r<0&&(s+=t.totalduration),s=Math.min(Math.max(e,s),e+t.totalduration),this.log(`Start time offset ${r} found in ${i?"multivariant":"media"} playlist, adjust startPosition to ${s}`),this.startPosition=s):t.live?s=this.hls.liveSyncPosition||e:this.startPosition=s=0,this.lastCurrentTime=s}this.nextLoadPosition=s}getLoadPosition(){const{media:t}=this
let e=0
return this.loadedmetadata&&t?e=t.currentTime:this.nextLoadPosition&&(e=this.nextLoadPosition),e}handleFragLoadAborted(t,e){this.transmuxer&&"initSegment"!==t.sn&&t.stats.aborted&&(this.warn(`Fragment ${t.sn}${e?" part "+e.index:""} of level ${t.level} was aborted`),this.resetFragmentLoading(t))}resetFragmentLoading(t){this.fragCurrent&&(this.fragContextChanged(t)||this.state===Ks)||(this.state=Bs)}onFragmentOrKeyLoadError(t,e){if(e.chunkMeta&&!e.frag){const t=this.getCurrentContext(e.chunkMeta)
t&&(e.frag=t.frag)}const s=e.frag
if(!s||s.type!==t||!this.levels)return
var i
if(this.fragContextChanged(s))return void this.warn(`Frag load error must match current frag to retry ${s.url} > ${null==(i=this.fragCurrent)?void 0:i.url}`)
const r=e.details===v.FRAG_GAP
r&&this.fragmentTracker.fragBuffered(s,!0)
const n=e.errorAction,{action:a,retryCount:o=0,retryConfig:l}=n||{}
if(n&&a===Je.RetryRequest&&l){this.resetStartWhenNotLoaded(this.levelLastLoaded)
const i=Ye(l,o)
this.warn(`Fragment ${s.sn} of ${t} ${s.level} errored with ${e.details}, retrying loading ${o+1}/${l.maxNumRetry} in ${i}ms`),n.resolved=!0,this.retryDate=self.performance.now()+i,this.state=Ks}else if(l&&n){if(this.resetFragmentErrors(t),!(o<l.maxNumRetry))return void A.warn(`${e.details} reached or exceeded max retry (${o})`)
r||a===Je.RemoveAlternatePermanently||(n.resolved=!0)}else(null==n?void 0:n.action)===Je.SendAlternateToPenaltyBox?this.state=Xs:this.state=js
this.tickImmediate()}reduceLengthAndFlushBuffer(t){if(this.state===Vs||this.state===Ys){const e=t.frag,s=t.parent,i=this.getFwdBufferInfo(this.mediaBuffer,s),r=i&&i.len>.5
r&&this.reduceMaxBufferLength(i.len,(null==e?void 0:e.duration)||10)
const n=!r
return n&&this.warn(`Buffer full error while media.currentTime is not buffered, flush ${s} buffer`),e&&(this.fragmentTracker.removeFragment(e),this.nextLoadPosition=e.start),this.resetLoadingState(),n}return!1}resetFragmentErrors(t){t===fe.AUDIO&&(this.fragCurrent=null),this.loadedmetadata||(this.startFragRequested=!1),this.state!==Us&&(this.state=Bs)}afterBufferFlushed(t,e,s){if(!t)return
const i=Ls.getBuffered(t)
this.fragmentTracker.detectEvictedFragments(e,i,s),this.state===Ws&&this.resetLoadingState()}resetLoadingState(){this.log("Reset loading state"),this.fragCurrent=null,this.fragPrevious=null,this.state=Bs}resetStartWhenNotLoaded(t){if(!this.loadedmetadata){this.startFragRequested=!1
const e=t?t.details:null
null!=e&&e.live?(this.startPosition=-1,this.setStartPosition(e,0),this.resetLoadingState()):this.nextLoadPosition=this.startPosition}}resetWhenMissingContext(t){this.warn(`The loading context changed while buffering fragment ${t.sn} of level ${t.level}. This chunk will not be buffered.`),this.removeUnbufferedFrags(),this.resetStartWhenNotLoaded(this.levelLastLoaded),this.resetLoadingState()}removeUnbufferedFrags(t=0){this.fragmentTracker.removeFragmentsInRange(t,1/0,this.playlistType,!1,!0)}updateLevelTiming(t,e,s,i){var r
const n=s.details
if(n){if(!Object.keys(t.elementaryStreams).reduce(((e,r)=>{const a=t.elementaryStreams[r]
if(a){const o=a.endPTS-a.startPTS
if(o<=0)return this.warn(`Could not parse fragment ${t.sn} ${r} duration reliably (${o})`),e||!1
const l=i?0:Ne(n,t,a.startPTS,a.endPTS,a.startDTS,a.endDTS)
return this.hls.trigger(p.LEVEL_PTS_UPDATED,{details:n,level:s,drift:l,type:r,frag:t,start:a.startPTS,end:a.endPTS}),!0}return e}),!1)&&null===(null==(r=this.transmuxer)?void 0:r.error)){const e=new Error(`Found no media in fragment ${t.sn} of level ${t.level} resetting transmuxer to fallback to playlist timing`)
if(0===s.fragmentError&&(s.fragmentError++,t.gap=!0,this.fragmentTracker.removeFragment(t),this.fragmentTracker.fragBuffered(t,!0)),this.warn(e.message),this.hls.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.FRAG_PARSING_ERROR,fatal:!1,error:e,frag:t,reason:`Found no media in msn ${t.sn} of level "${s.url}"`}),!this.hls)return
this.resetTransmuxer()}this.state=Ys,this.hls.trigger(p.FRAG_PARSED,{frag:t,part:e})}else this.warn("level.details undefined")}resetTransmuxer(){this.transmuxer&&(this.transmuxer.destroy(),this.transmuxer=null)}recoverWorkerError(t){"demuxerWorker"===t.event&&(this.fragmentTracker.removeAllFragments(),this.resetTransmuxer(),this.resetStartWhenNotLoaded(this.levelLastLoaded),this.resetLoadingState())}set state(t){const e=this._state
e!==t&&(this._state=t,this.log(`${e}->${t}`))}get state(){return this._state}}class Qs{constructor(){this.chunks=[],this.dataLength=0}push(t){this.chunks.push(t),this.dataLength+=t.length}flush(){const{chunks:t,dataLength:e}=this
let s
return t.length?(s=1===t.length?t[0]:function(t,e){const s=new Uint8Array(e)
let i=0
for(let r=0;r<t.length;r++){const e=t[r]
s.set(e,i),i+=e.length}return s}(t,e),this.reset(),s):new Uint8Array(0)}reset(){this.chunks.length=0,this.dataLength=0}}function Js(t="",e=9e4){return{type:t,id:-1,pid:-1,inputTimeScale:e,sequenceNumber:-1,samples:[],dropped:0}}class Zs{constructor(){this._audioTrack=void 0,this._id3Track=void 0,this.frameIndex=0,this.cachedData=null,this.basePTS=null,this.initPTS=null,this.lastPTS=null}resetInitSegment(t,e,s,i){this._id3Track={type:"id3",id:3,pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],dropped:0}}resetTimeStamp(t){this.initPTS=t,this.resetContiguity()}resetContiguity(){this.basePTS=null,this.lastPTS=null,this.frameIndex=0}canParse(t,e){return!1}appendFrame(t,e,s){}demux(t,e){this.cachedData&&(t=It(this.cachedData,t),this.cachedData=null)
let s,i=X(t,0),r=i?i.length:0
const n=this._audioTrack,a=this._id3Track,o=i?J(i):void 0,l=t.length
for((null===this.basePTS||0===this.frameIndex&&f(o))&&(this.basePTS=ti(o,e,this.initPTS),this.lastPTS=this.basePTS),null===this.lastPTS&&(this.lastPTS=this.basePTS),i&&i.length>0&&a.samples.push({pts:this.lastPTS,dts:this.lastPTS,data:i,type:Ae.audioId3,duration:Number.POSITIVE_INFINITY});r<l;){if(this.canParse(t,r)){const e=this.appendFrame(n,t,r)
e?(this.frameIndex++,this.lastPTS=e.sample.pts,r+=e.length,s=r):r=l}else Q(t,r)?(i=X(t,r),a.samples.push({pts:this.lastPTS,dts:this.lastPTS,data:i,type:Ae.audioId3,duration:Number.POSITIVE_INFINITY}),r+=i.length,s=r):r++
if(r===l&&s!==l){const e=W(t,s)
this.cachedData?this.cachedData=It(this.cachedData,e):this.cachedData=e}}return{audioTrack:n,videoTrack:Js(),id3Track:a,textTrack:Js()}}demuxSampleAes(t,e,s){return Promise.reject(new Error(`[${this}] This demuxer does not support Sample-AES decryption`))}flush(t){const e=this.cachedData
return e&&(this.cachedData=null,this.demux(e,0)),{audioTrack:this._audioTrack,videoTrack:Js(),id3Track:this._id3Track,textTrack:Js()}}destroy(){}}const ti=(t,e,s)=>f(t)?90*t:9e4*e+(s?9e4*s.baseTime/s.timescale:0)
function ei(t,e){return 255===t[e]&&240==(246&t[e+1])}function si(t,e){return 1&t[e+1]?7:9}function ii(t,e){return(3&t[e+3])<<11|t[e+4]<<3|(224&t[e+5])>>>5}function ri(t,e){return e+1<t.length&&ei(t,e)}function ni(t,e){if(ri(t,e)){const s=si(t,e)
if(e+s>=t.length)return!1
const i=ii(t,e)
if(i<=s)return!1
const r=e+i
return r===t.length||ri(t,r)}return!1}function ai(t,e,s,i,r){if(!t.samplerate){const n=function(t,e,s,i){let r,n,a,o
const l=navigator.userAgent.toLowerCase(),h=i,d=[96e3,88200,64e3,48e3,44100,32e3,24e3,22050,16e3,12e3,11025,8e3,7350]
r=1+((192&e[s+2])>>>6)
const c=(60&e[s+2])>>>2
if(!(c>d.length-1))return a=(1&e[s+2])<<2,a|=(192&e[s+3])>>>6,A.log(`manifest codec:${i}, ADTS type:${r}, samplingIndex:${c}`),/firefox/i.test(l)?c>=6?(r=5,o=new Array(4),n=c-3):(r=2,o=new Array(2),n=c):-1!==l.indexOf("android")?(r=2,o=new Array(2),n=c):(r=5,o=new Array(4),i&&(-1!==i.indexOf("mp4a.40.29")||-1!==i.indexOf("mp4a.40.5"))||!i&&c>=6?n=c-3:((i&&-1!==i.indexOf("mp4a.40.2")&&(c>=6&&1===a||/vivaldi/i.test(l))||!i&&1===a)&&(r=2,o=new Array(2)),n=c)),o[0]=r<<3,o[0]|=(14&c)>>1,o[1]|=(1&c)<<7,o[1]|=a<<3,5===r&&(o[1]|=(14&n)>>1,o[2]=(1&n)<<7,o[2]|=8,o[3]=0),{config:o,samplerate:d[c],channelCount:a,codec:"mp4a.40."+r,manifestCodec:h}
{const e=new Error(`invalid ADTS sampling index:${c}`)
t.emit(p.ERROR,p.ERROR,{type:y.MEDIA_ERROR,details:v.FRAG_PARSING_ERROR,fatal:!0,error:e,reason:e.message})}}(e,s,i,r)
if(!n)return
t.config=n.config,t.samplerate=n.samplerate,t.channelCount=n.channelCount,t.codec=n.codec,t.manifestCodec=n.manifestCodec,A.log(`parsed codec:${t.codec}, rate:${n.samplerate}, channels:${n.channelCount}`)}}function oi(t){return 9216e4/t}function li(t,e,s,i,r){const n=i+r*oi(t.samplerate),a=function(t,e){const s=si(t,e)
if(e+s<=t.length){const i=ii(t,e)-s
if(i>0)return{headerLength:s,frameLength:i}}}(e,s)
let o
if(a){const{frameLength:i,headerLength:r}=a,l=r+i,h=Math.max(0,s+l-e.length)
h?(o=new Uint8Array(l-r),o.set(e.subarray(s+r,e.length),0)):o=e.subarray(s+r,s+l)
const d={unit:o,pts:n}
return h||t.samples.push(d),{sample:d,length:l,missing:h}}const l=e.length-s
return o=new Uint8Array(l),o.set(e.subarray(s,e.length),0),{sample:{unit:o,pts:n},length:l,missing:-1}}let hi=null
const di=[32,64,96,128,160,192,224,256,288,320,352,384,416,448,32,48,56,64,80,96,112,128,160,192,224,256,320,384,32,40,48,56,64,80,96,112,128,160,192,224,256,320,32,48,56,64,80,96,112,128,144,160,176,192,224,256,8,16,24,32,40,48,56,64,80,96,112,128,144,160],ci=[44100,48e3,32e3,22050,24e3,16e3,11025,12e3,8e3],ui=[[0,72,144,12],[0,0,0,0],[0,72,144,12],[0,144,144,12]],fi=[0,1,1,4]
function gi(t,e,s,i,r){if(s+24>e.length)return
const n=mi(e,s)
if(n&&s+n.frameLength<=e.length){const a=i+r*(9e4*n.samplesPerFrame/n.sampleRate),o={unit:e.subarray(s,s+n.frameLength),pts:a,dts:a}
return t.config=[],t.channelCount=n.channelCount,t.samplerate=n.sampleRate,t.samples.push(o),{sample:o,length:n.frameLength,missing:0}}}function mi(t,e){const s=t[e+1]>>3&3,i=t[e+1]>>1&3,r=t[e+2]>>4&15,n=t[e+2]>>2&3
if(1!==s&&0!==r&&15!==r&&3!==n){const a=t[e+2]>>1&1,o=t[e+3]>>6,l=1e3*di[14*(3===s?3-i:3===i?3:4)+r-1],h=ci[3*(3===s?0:2===s?1:2)+n],d=3===o?1:2,c=ui[s][i],u=fi[i],f=8*c*u,g=Math.floor(c*l/h+a)*u
if(null===hi){const t=(navigator.userAgent||"").match(/Chrome\/(\d+)/i)
hi=t?parseInt(t[1]):0}return!!hi&&hi<=87&&2===i&&l>=224e3&&0===o&&(t[e+3]=128|t[e+3]),{sampleRate:h,channelCount:d,frameLength:g,samplesPerFrame:f}}}function pi(t,e){return 255===t[e]&&224==(224&t[e+1])&&0!=(6&t[e+1])}function yi(t,e){return e+1<t.length&&pi(t,e)}function vi(t,e){if(e+1<t.length&&pi(t,e)){const s=4,i=mi(t,e)
let r=s
null!=i&&i.frameLength&&(r=i.frameLength)
const n=e+r
return n===t.length||yi(t,n)}return!1}const Ei=/\/emsg[-/]ID3/i,Ti=(t,e)=>{let s=0,i=5
e+=i
const r=new Uint32Array(1),n=new Uint32Array(1),a=new Uint8Array(1)
for(;i>0;){a[0]=t[e]
const o=Math.min(i,8),l=8-o
n[0]=4278190080>>>24+l<<l,r[0]=(a[0]&n[0])>>l,s=s?s<<o|r[0]:r[0],e+=1,i-=o}return s}
function Si(t,e,s,i,r){if(s+8>e.length)return-1
if(11!==e[s]||119!==e[s+1])return-1
const n=e[s+4]>>6
if(n>=3)return-1
const a=[48e3,44100,32e3][n],o=63&e[s+4],l=2*[64,69,96,64,70,96,80,87,120,80,88,120,96,104,144,96,105,144,112,121,168,112,122,168,128,139,192,128,140,192,160,174,240,160,175,240,192,208,288,192,209,288,224,243,336,224,244,336,256,278,384,256,279,384,320,348,480,320,349,480,384,417,576,384,418,576,448,487,672,448,488,672,512,557,768,512,558,768,640,696,960,640,697,960,768,835,1152,768,836,1152,896,975,1344,896,976,1344,1024,1114,1536,1024,1115,1536,1152,1253,1728,1152,1254,1728,1280,1393,1920,1280,1394,1920][3*o+n]
if(s+l>e.length)return-1
const h=e[s+6]>>5
let d=0
2===h?d+=2:(1&h&&1!==h&&(d+=2),4&h&&(d+=2))
const c=(e[s+6]<<8|e[s+7])>>12-d&1,u=[2,1,2,3,3,4,4,5][h]+c,f=e[s+5]>>3,g=7&e[s+5],m=new Uint8Array([n<<6|f<<1|g>>2,(3&g)<<6|h<<3|c<<2|o>>4,o<<4&224]),p=i+r*(1536/a*9e4),y=e.subarray(s,s+l)
return t.config=m,t.channelCount=u,t.samplerate=a,t.samples.push({unit:y,pts:p}),l}class Ai{constructor(){this.VideoSample=null}createVideoSample(t,e,s,i){return{key:t,frame:!1,pts:e,dts:s,units:[],debug:i,length:0}}getLastNalUnit(t){var e
let s,i=this.VideoSample
if(i&&0!==i.units.length||(i=t[t.length-1]),null!=(e=i)&&e.units){const t=i.units
s=t[t.length-1]}return s}pushAccessUnit(t,e){if(t.units.length&&t.frame){if(void 0===t.pts){const s=e.samples,i=s.length
if(!i)return void e.dropped++
{const e=s[i-1]
t.pts=e.pts,t.dts=e.dts}}e.samples.push(t)}t.debug.length&&A.log(t.pts+"/"+t.dts+":"+t.debug)}}class Li{constructor(t){this.data=void 0,this.bytesAvailable=void 0,this.word=void 0,this.bitsAvailable=void 0,this.data=t,this.bytesAvailable=t.byteLength,this.word=0,this.bitsAvailable=0}loadWord(){const t=this.data,e=this.bytesAvailable,s=t.byteLength-e,i=new Uint8Array(4),r=Math.min(4,e)
if(0===r)throw new Error("no bytes available")
i.set(t.subarray(s,s+r)),this.word=new DataView(i.buffer).getUint32(0),this.bitsAvailable=8*r,this.bytesAvailable-=r}skipBits(t){let e
t=Math.min(t,8*this.bytesAvailable+this.bitsAvailable),this.bitsAvailable>t?(this.word<<=t,this.bitsAvailable-=t):(e=(t-=this.bitsAvailable)>>3,t-=e<<3,this.bytesAvailable-=e,this.loadWord(),this.word<<=t,this.bitsAvailable-=t)}readBits(t){let e=Math.min(this.bitsAvailable,t)
const s=this.word>>>32-e
if(t>32&&A.error("Cannot read more than 32 bits at a time"),this.bitsAvailable-=e,this.bitsAvailable>0)this.word<<=e
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
const y=h(),v=h(),E=l(1)
0===E&&c(1),c(1),d()&&(i=h(),r=h(),n=h(),a=h())
let T=[1,1]
if(d()&&d())switch(o()){case 1:T=[1,1]
break
case 2:T=[12,11]
break
case 3:T=[10,11]
break
case 4:T=[16,11]
break
case 5:T=[40,33]
break
case 6:T=[24,11]
break
case 7:T=[20,11]
break
case 8:T=[32,11]
break
case 9:T=[80,33]
break
case 10:T=[18,11]
break
case 11:T=[15,11]
break
case 12:T=[64,33]
break
case 13:T=[160,99]
break
case 14:T=[4,3]
break
case 15:T=[3,2]
break
case 16:T=[2,1]
break
case 255:T=[o()<<8|o(),o()<<8|o()]}return{width:Math.ceil(16*(y+1)-2*i-2*r),height:(2-E)*(v+1)*16-(E?2:4)*(n+a),pixelRatio:T}}readSliceType(){return this.readUByte(),this.readUEG(),this.readUEG()}}class Ri extends Ai{parseAVCPES(t,e,s,i,r){const n=this.parseAVCNALu(t,s.data)
let a,o=this.VideoSample,l=!1
s.data=null,o&&n.length&&!t.audFound&&(this.pushAccessUnit(o,t),o=this.VideoSample=this.createVideoSample(!1,s.pts,s.dts,"")),n.forEach((i=>{var n
switch(i.type){case 1:{let e=!1
a=!0
const r=i.data
if(l&&r.length>4){const t=new Li(r).readSliceType()
2!==t&&4!==t&&7!==t&&9!==t||(e=!0)}var h
e&&null!=(h=o)&&h.frame&&!o.key&&(this.pushAccessUnit(o,t),o=this.VideoSample=null),o||(o=this.VideoSample=this.createVideoSample(!0,s.pts,s.dts,"")),o.frame=!0,o.key=e
break}case 5:a=!0,null!=(n=o)&&n.frame&&!o.key&&(this.pushAccessUnit(o,t),o=this.VideoSample=null),o||(o=this.VideoSample=this.createVideoSample(!0,s.pts,s.dts,"")),o.key=!0,o.frame=!0
break
case 6:a=!0,_t(i.data,1,s.pts,e.samples)
break
case 7:{var d,c
a=!0,l=!0
const e=i.data,s=new Li(e).readSPS()
if(!t.sps||t.width!==s.width||t.height!==s.height||(null==(d=t.pixelRatio)?void 0:d[0])!==s.pixelRatio[0]||(null==(c=t.pixelRatio)?void 0:c[1])!==s.pixelRatio[1]){t.width=s.width,t.height=s.height,t.pixelRatio=s.pixelRatio,t.sps=[e],t.duration=r
const i=e.subarray(1,4)
let n="avc1."
for(let t=0;t<3;t++){let e=i[t].toString(16)
e.length<2&&(e="0"+e),n+=e}t.codec=n}break}case 8:a=!0,t.pps=[i.data]
break
case 9:a=!0,t.audFound=!0,o&&this.pushAccessUnit(o,t),o=this.VideoSample=this.createVideoSample(!1,s.pts,s.dts,"")
break
case 12:a=!0
break
default:a=!1,o&&(o.debug+="unknown NAL "+i.type+" ")}o&&a&&o.units.push(i)})),i&&o&&(this.pushAccessUnit(o,t),this.VideoSample=null)}parseAVCNALu(t,e){const s=e.byteLength
let i=t.naluState||0
const r=i,n=[]
let a,o,l,h=0,d=-1,c=0
for(-1===i&&(d=0,c=31&e[0],i=0,h=1);h<s;)if(a=e[h++],i)if(1!==i)if(a)if(1===a){if(o=h-i-1,d>=0){const t={data:e.subarray(d,o),type:c}
n.push(t)}else{const s=this.getLastNalUnit(t.samples)
s&&(r&&h<=4-r&&s.state&&(s.data=s.data.subarray(0,s.data.byteLength-r)),o>0&&(s.data=It(s.data,e.subarray(0,o)),s.state=0))}h<s?(l=31&e[h],d=h,c=l,i=0):i=-1}else i=0
else i=3
else i=a?0:2
else i=a?0:1
if(d>=0&&i>=0){const t={data:e.subarray(d,s),type:c,state:i}
n.push(t)}if(0===n.length){const s=this.getLastNalUnit(t.samples)
s&&(s.data=It(s.data,e))}return t.naluState=i,n}}class bi{constructor(t,e,s){this.keyData=void 0,this.decrypter=void 0,this.keyData=s,this.decrypter=new Ns(e,{removePKCS7Padding:!1})}decryptBuffer(t){return this.decrypter.decrypt(t,this.keyData.key.buffer,this.keyData.iv.buffer)}decryptAacSample(t,e,s){const i=t[e].unit
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
return t}decryptAvcSample(t,e,s,i,r){const n=xt(r.data),a=this.getAvcEncryptedData(n)
this.decryptBuffer(a.buffer).then((a=>{r.data=this.getAvcDecryptedUnit(n,a),this.decrypter.isSync()||this.decryptAvcSamples(t,e,s+1,i)}))}decryptAvcSamples(t,e,s,i){if(t instanceof Uint8Array)throw new Error("Cannot decrypt samples of type Uint8Array")
for(;;e++,s=0){if(e>=t.length)return void i()
const r=t[e].units
for(;!(s>=r.length);s++){const n=r[s]
if(!(n.data.length<=48||1!==n.type&&5!==n.type||(this.decryptAvcSample(t,e,s,i,n),this.decrypter.isSync())))return}}}}const Di=188
class ki{constructor(t,e,s){this.observer=void 0,this.config=void 0,this.typeSupported=void 0,this.sampleAes=null,this.pmtParsed=!1,this.audioCodec=void 0,this.videoCodec=void 0,this._duration=0,this._pmtId=-1,this._videoTrack=void 0,this._audioTrack=void 0,this._id3Track=void 0,this._txtTrack=void 0,this.aacOverFlow=null,this.remainderData=null,this.videoParser=void 0,this.observer=t,this.config=e,this.typeSupported=s,this.videoParser=new Ri}static probe(t){const e=ki.syncOffset(t)
return e>0&&A.warn(`MPEG2-TS detected but first sync word found @ offset ${e}`),-1!==e}static syncOffset(t){const e=t.length
let s=Math.min(940,e-Di)+1,i=0
for(;i<s;){let r=!1,n=-1,a=0
for(let o=i;o<e;o+=Di){if(71!==t[o]||e-o!==Di&&71!==t[o+Di]){if(a)return-1
break}if(a++,-1===n&&(n=o,0!==n&&(s=Math.min(n+18612,t.length-Di)+1)),r||(r=0===Ii(t,o)),r&&a>1&&(0===n&&a>2||o+Di>s))return n}i++}return-1}static createTrack(t,e){return{container:"video"===t||"audio"===t?"video/mp2t":void 0,type:t,id:ut[t],pid:-1,inputTimeScale:9e4,sequenceNumber:0,samples:[],dropped:0,duration:"audio"===t?e:void 0}}resetInitSegment(t,e,s,i){this.pmtParsed=!1,this._pmtId=-1,this._videoTrack=ki.createTrack("video"),this._audioTrack=ki.createTrack("audio",i),this._id3Track=ki.createTrack("id3"),this._txtTrack=ki.createTrack("text"),this._audioTrack.segmentCodec="aac",this.aacOverFlow=null,this.remainderData=null,this.audioCodec=e,this.videoCodec=s,this._duration=i}resetTimeStamp(){}resetContiguity(){const{_audioTrack:t,_videoTrack:e,_id3Track:s}=this
t&&(t.pesData=null),e&&(e.pesData=null),s&&(s.pesData=null),this.aacOverFlow=null,this.remainderData=null}demux(t,e,s=!1,i=!1){let r
s||(this.sampleAes=null)
const n=this._videoTrack,a=this._audioTrack,o=this._id3Track,l=this._txtTrack
let h=n.pid,d=n.pesData,c=a.pid,u=o.pid,f=a.pesData,g=o.pesData,m=null,p=this.pmtParsed,y=this._pmtId,v=t.length
if(this.remainderData&&(v=(t=It(this.remainderData,t)).length,this.remainderData=null),v<Di&&!i)return this.remainderData=t,{audioTrack:a,videoTrack:n,id3Track:o,textTrack:l}
const E=Math.max(0,ki.syncOffset(t))
v-=(v-E)%Di,v<t.byteLength&&!i&&(this.remainderData=new Uint8Array(t.buffer,v,t.buffer.byteLength-v))
let T=0
for(let L=E;L<v;L+=Di)if(71===t[L]){const e=!!(64&t[L+1]),i=Ii(t,L)
let v
if((48&t[L+3])>>4>1){if(v=L+5+t[L+4],v===L+Di)continue}else v=L+4
switch(i){case h:e&&(d&&(r=Pi(d))&&this.videoParser.parseAVCPES(n,l,r,!1,this._duration),d={data:[],size:0}),d&&(d.data.push(t.subarray(v,L+Di)),d.size+=L+Di-v)
break
case c:if(e){if(f&&(r=Pi(f)))switch(a.segmentCodec){case"aac":this.parseAACPES(a,r)
break
case"mp3":this.parseMPEGPES(a,r)
break
case"ac3":this.parseAC3PES(a,r)}f={data:[],size:0}}f&&(f.data.push(t.subarray(v,L+Di)),f.size+=L+Di-v)
break
case u:e&&(g&&(r=Pi(g))&&this.parseID3PES(o,r),g={data:[],size:0}),g&&(g.data.push(t.subarray(v,L+Di)),g.size+=L+Di-v)
break
case 0:e&&(v+=t[v]+1),y=this._pmtId=Ci(t,v)
break
case y:{e&&(v+=t[v]+1)
const i=wi(t,v,this.typeSupported,s,this.observer)
h=i.videoPid,h>0&&(n.pid=h,n.segmentCodec=i.segmentVideoCodec),c=i.audioPid,c>0&&(a.pid=c,a.segmentCodec=i.segmentAudioCodec),u=i.id3Pid,u>0&&(o.pid=u),null===m||p||(A.warn(`MPEG-TS PMT found at ${L} after unknown PID '${m}'. Backtracking to sync byte @${E} to parse all TS packets.`),m=null,L=E-188),p=this.pmtParsed=!0
break}case 17:case 8191:break
default:m=i}}else T++
T>0&&_i(this.observer,new Error(`Found ${T} TS packet/s that do not start with 0x47`)),n.pesData=d,a.pesData=f,o.pesData=g
const S={audioTrack:a,videoTrack:n,id3Track:o,textTrack:l}
return i&&this.extractRemainingSamples(S),S}flush(){const{remainderData:t}=this
let e
return this.remainderData=null,e=t?this.demux(t,-1,!1,!0):{videoTrack:this._videoTrack,audioTrack:this._audioTrack,id3Track:this._id3Track,textTrack:this._txtTrack},this.extractRemainingSamples(e),this.sampleAes?this.decrypt(e,this.sampleAes):e}extractRemainingSamples(t){const{audioTrack:e,videoTrack:s,id3Track:i,textTrack:r}=t,n=s.pesData,a=e.pesData,o=i.pesData
let l
if(n&&(l=Pi(n))?(this.videoParser.parseAVCPES(s,r,l,!0,this._duration),s.pesData=null):s.pesData=n,a&&(l=Pi(a))){switch(e.segmentCodec){case"aac":this.parseAACPES(e,l)
break
case"mp3":this.parseMPEGPES(e,l)
break
case"ac3":this.parseAC3PES(e,l)}e.pesData=null}else null!=a&&a.size&&A.log("last AAC PES packet truncated,might overlap between fragments"),e.pesData=a
o&&(l=Pi(o))?(this.parseID3PES(i,l),i.pesData=null):i.pesData=o}demuxSampleAes(t,e,s){const i=this.demux(t,s,!0,!this.config.progressive),r=this.sampleAes=new bi(this.observer,this.config,e)
return this.decrypt(i,r)}decrypt(t,e){return new Promise((s=>{const{audioTrack:i,videoTrack:r}=t
i.samples&&"aac"===i.segmentCodec?e.decryptAacSamples(i.samples,0,(()=>{r.samples?e.decryptAvcSamples(r.samples,0,0,(()=>{s(t)})):s(t)})):r.samples&&e.decryptAvcSamples(r.samples,0,0,(()=>{s(t)}))}))}destroy(){this._duration=0}parseAACPES(t,e){let s=0
const i=this.aacOverFlow
let r,n,a,o=e.data
if(i){this.aacOverFlow=null
const e=i.missing,r=i.sample.unit.byteLength
if(-1===e)o=It(i.sample.unit,o)
else{const n=r-e
i.sample.unit.set(o.subarray(0,e),n),t.samples.push(i.sample),s=i.missing}}for(r=s,n=o.length;r<n-1&&!ri(o,r);r++);if(r!==s){let t
const e=r<n-1
if(t=e?`AAC PES did not start with ADTS header,offset:${r}`:"No ADTS header found in AAC PES",_i(this.observer,new Error(t),e),!e)return}if(ai(t,this.observer,o,r,this.audioCodec),void 0!==e.pts)a=e.pts
else{if(!i)return void A.warn("[tsdemuxer]: AAC PES unknown PTS")
{const e=oi(t.samplerate)
a=i.sample.pts+e}}let l,h=0
for(;r<n;){if(l=li(t,o,r,a,h),r+=l.length,l.missing){this.aacOverFlow=l
break}for(h++;r<n-1&&!ri(o,r);r++);}}parseMPEGPES(t,e){const s=e.data,i=s.length
let r=0,n=0
const a=e.pts
if(void 0!==a)for(;n<i;)if(yi(s,n)){const e=gi(t,s,n,a,r)
if(!e)break
n+=e.length,r++}else n++
else A.warn("[tsdemuxer]: MPEG PES unknown PTS")}parseAC3PES(t,e){{const s=e.data,i=e.pts
if(void 0===i)return void A.warn("[tsdemuxer]: AC3 PES unknown PTS")
const r=s.length
let n,a=0,o=0
for(;o<r&&(n=Si(t,s,o,i,a++))>0;)o+=n}}parseID3PES(t,e){if(void 0===e.pts)return void A.warn("[tsdemuxer]: ID3 PES unknown PTS")
const s=u({},e,{type:this._videoTrack?Ae.emsg:Ae.audioId3,duration:Number.POSITIVE_INFINITY})
t.samples.push(s)}}function Ii(t,e){return((31&t[e+1])<<8)+t[e+2]}function Ci(t,e){return(31&t[e+10])<<8|t[e+11]}function wi(t,e,s,i,r){const n={audioPid:-1,videoPid:-1,id3Pid:-1,segmentVideoCodec:"avc",segmentAudioCodec:"aac"},a=e+3+((15&t[e+1])<<8|t[e+2])-4
for(e+=12+((15&t[e+10])<<8|t[e+11]);e<a;){const a=Ii(t,e),o=(15&t[e+3])<<8|t[e+4]
switch(t[e]){case 207:if(!i){xi("ADTS AAC")
break}case 15:-1===n.audioPid&&(n.audioPid=a)
break
case 21:-1===n.id3Pid&&(n.id3Pid=a)
break
case 219:if(!i){xi("H.264")
break}case 27:-1===n.videoPid&&(n.videoPid=a,n.segmentVideoCodec="avc")
break
case 3:case 4:s.mpeg||s.mp3?-1===n.audioPid&&(n.audioPid=a,n.segmentAudioCodec="mp3"):A.log("MPEG audio found, not supported in this browser")
break
case 193:if(!i){xi("AC-3")
break}case 129:s.ac3?-1===n.audioPid&&(n.audioPid=a,n.segmentAudioCodec="ac3"):A.log("AC-3 audio found, not supported in this browser")
break
case 6:if(-1===n.audioPid&&o>0){let i=e+5,r=o
for(;r>2;){106===t[i]&&(!0!==s.ac3?A.log("AC-3 audio found, not supported in this browser for now"):(n.audioPid=a,n.segmentAudioCodec="ac3"))
const e=t[i+1]+2
i+=e,r-=e}}break
case 194:case 135:return _i(r,new Error("Unsupported EC-3 in M2TS found")),n
case 36:return _i(r,new Error("Unsupported HEVC in M2TS found")),n}e+=o+5}return n}function _i(t,e,s){A.warn(`parsing error: ${e.message}`),t.emit(p.ERROR,p.ERROR,{type:y.MEDIA_ERROR,details:v.FRAG_PARSING_ERROR,fatal:!1,levelRetry:s,error:e,reason:e.message})}function xi(t){A.log(`${t} with AES-128-CBC encryption found in unencrypted stream`)}function Pi(t){let e,s,i,r,n,a=0
const o=t.data
if(!t||0===t.size)return null
for(;o[0].length<19&&o.length>1;)o[0]=It(o[0],o[1]),o.splice(1,1)
if(e=o[0],1===(e[0]<<16)+(e[1]<<8)+e[2]){if(s=(e[4]<<8)+e[5],s&&s>t.size-6)return null
const l=e[7]
192&l&&(r=536870912*(14&e[9])+4194304*(255&e[10])+16384*(254&e[11])+128*(255&e[12])+(254&e[13])/2,64&l?(n=536870912*(14&e[14])+4194304*(255&e[15])+16384*(254&e[16])+128*(255&e[17])+(254&e[18])/2,r-n>54e5&&(A.warn(`${Math.round((r-n)/9e4)}s delta between PTS and DTS, align them`),r=n)):n=r),i=e[8]
let h=i+9
if(t.size<=h)return null
t.size-=h
const d=new Uint8Array(t.size)
for(let t=0,s=o.length;t<s;t++){e=o[t]
let s=e.byteLength
if(h){if(h>s){h-=s
continue}e=e.subarray(h),s-=h,h=0}d.set(e,a),a+=s}return s&&(s-=i+3),{data:d,pts:r,dts:n,len:s}}return null}class Mi{static getSilentFrame(t,e){if("mp4a.40.2"===t){if(1===e)return new Uint8Array([0,200,0,128,35,128])
if(2===e)return new Uint8Array([33,0,73,144,2,25,0,35,128])
if(3===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,142])
if(4===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,128,44,128,8,2,56])
if(5===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,56])
if(6===e)return new Uint8Array([0,200,0,128,32,132,1,38,64,8,100,0,130,48,4,153,0,33,144,2,0,178,0,32,8,224])}else{if(1===e)return new Uint8Array([1,64,34,128,163,78,230,128,186,8,0,0,0,28,6,241,193,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])
if(2===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])
if(3===e)return new Uint8Array([1,64,34,128,163,94,230,128,186,8,0,0,0,0,149,0,6,241,161,10,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,90,94])}}}const Fi=Math.pow(2,32)-1
class Oi{static init(){let t
for(t in Oi.types={avc1:[],avcC:[],btrt:[],dinf:[],dref:[],esds:[],ftyp:[],hdlr:[],mdat:[],mdhd:[],mdia:[],mfhd:[],minf:[],moof:[],moov:[],mp4a:[],".mp3":[],dac3:[],"ac-3":[],mvex:[],mvhd:[],pasp:[],sdtp:[],stbl:[],stco:[],stsc:[],stsd:[],stsz:[],stts:[],tfdt:[],tfhd:[],traf:[],trak:[],trun:[],trex:[],tkhd:[],vmhd:[],smhd:[]},Oi.types)Oi.types.hasOwnProperty(t)&&(Oi.types[t]=[t.charCodeAt(0),t.charCodeAt(1),t.charCodeAt(2),t.charCodeAt(3)])
const e=new Uint8Array([0,0,0,0,0,0,0,0,118,105,100,101,0,0,0,0,0,0,0,0,0,0,0,0,86,105,100,101,111,72,97,110,100,108,101,114,0]),s=new Uint8Array([0,0,0,0,0,0,0,0,115,111,117,110,0,0,0,0,0,0,0,0,0,0,0,0,83,111,117,110,100,72,97,110,100,108,101,114,0])
Oi.HDLR_TYPES={video:e,audio:s}
const i=new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,12,117,114,108,32,0,0,0,1]),r=new Uint8Array([0,0,0,0,0,0,0,0])
Oi.STTS=Oi.STSC=Oi.STCO=r,Oi.STSZ=new Uint8Array([0,0,0,0,0,0,0,0,0,0,0,0]),Oi.VMHD=new Uint8Array([0,0,0,1,0,0,0,0,0,0,0,0]),Oi.SMHD=new Uint8Array([0,0,0,0,0,0,0,0]),Oi.STSD=new Uint8Array([0,0,0,0,0,0,0,1])
const n=new Uint8Array([105,115,111,109]),a=new Uint8Array([97,118,99,49]),o=new Uint8Array([0,0,0,1])
Oi.FTYP=Oi.box(Oi.types.ftyp,n,o,n,a),Oi.DINF=Oi.box(Oi.types.dinf,Oi.box(Oi.types.dref,i))}static box(t,...e){let s=8,i=e.length
const r=i
for(;i--;)s+=e[i].byteLength
const n=new Uint8Array(s)
for(n[0]=s>>24&255,n[1]=s>>16&255,n[2]=s>>8&255,n[3]=255&s,n.set(t,4),i=0,s=8;i<r;i++)n.set(e[i],s),s+=e[i].byteLength
return n}static hdlr(t){return Oi.box(Oi.types.hdlr,Oi.HDLR_TYPES[t])}static mdat(t){return Oi.box(Oi.types.mdat,t)}static mdhd(t,e){e*=t
const s=Math.floor(e/(Fi+1)),i=Math.floor(e%(Fi+1))
return Oi.box(Oi.types.mdhd,new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,t>>24&255,t>>16&255,t>>8&255,255&t,s>>24,s>>16&255,s>>8&255,255&s,i>>24,i>>16&255,i>>8&255,255&i,85,196,0,0]))}static mdia(t){return Oi.box(Oi.types.mdia,Oi.mdhd(t.timescale,t.duration),Oi.hdlr(t.type),Oi.minf(t))}static mfhd(t){return Oi.box(Oi.types.mfhd,new Uint8Array([0,0,0,0,t>>24,t>>16&255,t>>8&255,255&t]))}static minf(t){return"audio"===t.type?Oi.box(Oi.types.minf,Oi.box(Oi.types.smhd,Oi.SMHD),Oi.DINF,Oi.stbl(t)):Oi.box(Oi.types.minf,Oi.box(Oi.types.vmhd,Oi.VMHD),Oi.DINF,Oi.stbl(t))}static moof(t,e,s){return Oi.box(Oi.types.moof,Oi.mfhd(t),Oi.traf(s,e))}static moov(t){let e=t.length
const s=[]
for(;e--;)s[e]=Oi.trak(t[e])
return Oi.box.apply(null,[Oi.types.moov,Oi.mvhd(t[0].timescale,t[0].duration)].concat(s).concat(Oi.mvex(t)))}static mvex(t){let e=t.length
const s=[]
for(;e--;)s[e]=Oi.trex(t[e])
return Oi.box.apply(null,[Oi.types.mvex,...s])}static mvhd(t,e){e*=t
const s=Math.floor(e/(Fi+1)),i=Math.floor(e%(Fi+1)),r=new Uint8Array([1,0,0,0,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,t>>24&255,t>>16&255,t>>8&255,255&t,s>>24,s>>16&255,s>>8&255,255&s,i>>24,i>>16&255,i>>8&255,255&i,0,1,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,255,255,255,255])
return Oi.box(Oi.types.mvhd,r)}static sdtp(t){const e=t.samples||[],s=new Uint8Array(4+e.length)
let i,r
for(i=0;i<e.length;i++)r=e[i].flags,s[i+4]=r.dependsOn<<4|r.isDependedOn<<2|r.hasRedundancy
return Oi.box(Oi.types.sdtp,s)}static stbl(t){return Oi.box(Oi.types.stbl,Oi.stsd(t),Oi.box(Oi.types.stts,Oi.STTS),Oi.box(Oi.types.stsc,Oi.STSC),Oi.box(Oi.types.stsz,Oi.STSZ),Oi.box(Oi.types.stco,Oi.STCO))}static avc1(t){let e,s,i,r=[],n=[]
for(e=0;e<t.sps.length;e++)s=t.sps[e],i=s.byteLength,r.push(i>>>8&255),r.push(255&i),r=r.concat(Array.prototype.slice.call(s))
for(e=0;e<t.pps.length;e++)s=t.pps[e],i=s.byteLength,n.push(i>>>8&255),n.push(255&i),n=n.concat(Array.prototype.slice.call(s))
const a=Oi.box(Oi.types.avcC,new Uint8Array([1,r[3],r[4],r[5],255,224|t.sps.length].concat(r).concat([t.pps.length]).concat(n))),o=t.width,l=t.height,h=t.pixelRatio[0],d=t.pixelRatio[1]
return Oi.box(Oi.types.avc1,new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,o>>8&255,255&o,l>>8&255,255&l,0,72,0,0,0,72,0,0,0,0,0,0,0,1,18,100,97,105,108,121,109,111,116,105,111,110,47,104,108,115,46,106,115,0,0,0,0,0,0,0,0,0,0,0,0,0,0,24,17,17]),a,Oi.box(Oi.types.btrt,new Uint8Array([0,28,156,128,0,45,198,192,0,45,198,192])),Oi.box(Oi.types.pasp,new Uint8Array([h>>24,h>>16&255,h>>8&255,255&h,d>>24,d>>16&255,d>>8&255,255&d])))}static esds(t){const e=t.config.length
return new Uint8Array([0,0,0,0,3,23+e,0,1,0,4,15+e,64,21,0,0,0,0,0,0,0,0,0,0,0,5].concat([e]).concat(t.config).concat([6,1,2]))}static audioStsd(t){const e=t.samplerate
return new Uint8Array([0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,t.channelCount,0,16,0,0,0,0,e>>8&255,255&e,0,0])}static mp4a(t){return Oi.box(Oi.types.mp4a,Oi.audioStsd(t),Oi.box(Oi.types.esds,Oi.esds(t)))}static mp3(t){return Oi.box(Oi.types[".mp3"],Oi.audioStsd(t))}static ac3(t){return Oi.box(Oi.types["ac-3"],Oi.audioStsd(t),Oi.box(Oi.types.dac3,t.config))}static stsd(t){return"audio"===t.type?"mp3"===t.segmentCodec&&"mp3"===t.codec?Oi.box(Oi.types.stsd,Oi.STSD,Oi.mp3(t)):"ac3"===t.segmentCodec?Oi.box(Oi.types.stsd,Oi.STSD,Oi.ac3(t)):Oi.box(Oi.types.stsd,Oi.STSD,Oi.mp4a(t)):Oi.box(Oi.types.stsd,Oi.STSD,Oi.avc1(t))}static tkhd(t){const e=t.id,s=t.duration*t.timescale,i=t.width,r=t.height,n=Math.floor(s/(Fi+1)),a=Math.floor(s%(Fi+1))
return Oi.box(Oi.types.tkhd,new Uint8Array([1,0,0,7,0,0,0,0,0,0,0,2,0,0,0,0,0,0,0,3,e>>24&255,e>>16&255,e>>8&255,255&e,0,0,0,0,n>>24,n>>16&255,n>>8&255,255&n,a>>24,a>>16&255,a>>8&255,255&a,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,0,0,0,0,0,0,0,64,0,0,0,i>>8&255,255&i,0,0,r>>8&255,255&r,0,0]))}static traf(t,e){const s=Oi.sdtp(t),i=t.id,r=Math.floor(e/(Fi+1)),n=Math.floor(e%(Fi+1))
return Oi.box(Oi.types.traf,Oi.box(Oi.types.tfhd,new Uint8Array([0,0,0,0,i>>24,i>>16&255,i>>8&255,255&i])),Oi.box(Oi.types.tfdt,new Uint8Array([1,0,0,0,r>>24,r>>16&255,r>>8&255,255&r,n>>24,n>>16&255,n>>8&255,255&n])),Oi.trun(t,s.length+16+20+8+16+8+8),s)}static trak(t){return t.duration=t.duration||4294967295,Oi.box(Oi.types.trak,Oi.tkhd(t),Oi.mdia(t))}static trex(t){const e=t.id
return Oi.box(Oi.types.trex,new Uint8Array([0,0,0,0,e>>24,e>>16&255,e>>8&255,255&e,0,0,0,1,0,0,0,0,0,0,0,0,0,1,0,1]))}static trun(t,e){const s=t.samples||[],i=s.length,r=12+16*i,n=new Uint8Array(r)
let a,o,l,h,d,c
for(e+=8+r,n.set(["video"===t.type?1:0,0,15,1,i>>>24&255,i>>>16&255,i>>>8&255,255&i,e>>>24&255,e>>>16&255,e>>>8&255,255&e],0),a=0;a<i;a++)o=s[a],l=o.duration,h=o.size,d=o.flags,c=o.cts,n.set([l>>>24&255,l>>>16&255,l>>>8&255,255&l,h>>>24&255,h>>>16&255,h>>>8&255,255&h,d.isLeading<<2|d.dependsOn,d.isDependedOn<<6|d.hasRedundancy<<4|d.paddingValue<<1|d.isNonSync,61440&d.degradPrio,15&d.degradPrio,c>>>24&255,c>>>16&255,c>>>8&255,255&c],12+16*a)
return Oi.box(Oi.types.trun,n)}static initSegment(t){Oi.types||Oi.init()
const e=Oi.moov(t)
return It(Oi.FTYP,e)}}Oi.types=void 0,Oi.HDLR_TYPES=void 0,Oi.STTS=void 0,Oi.STSC=void 0,Oi.STCO=void 0,Oi.STSZ=void 0,Oi.VMHD=void 0,Oi.SMHD=void 0,Oi.STSD=void 0,Oi.FTYP=void 0,Oi.DINF=void 0
const Ni=9e4
function Ui(t,e,s=1,i=!1){const r=t*e*s
return i?Math.round(r):r}function Bi(t,e=!1){return Ui(t,1e3,1/Ni,e)}let $i,Gi=null,Ki=null
class Hi{constructor(t,e,s,i=""){if(this.observer=void 0,this.config=void 0,this.typeSupported=void 0,this.ISGenerated=!1,this._initPTS=null,this._initDTS=null,this.nextAvcDts=null,this.nextAudioPts=null,this.videoSampleDuration=null,this.isAudioContiguous=!1,this.isVideoContiguous=!1,this.videoTrackConfig=void 0,this.observer=t,this.config=e,this.typeSupported=s,this.ISGenerated=!1,null===Gi){const t=(navigator.userAgent||"").match(/Chrome\/(\d+)/i)
Gi=t?parseInt(t[1]):0}if(null===Ki){const t=navigator.userAgent.match(/Safari\/(\d+)/i)
Ki=t?parseInt(t[1]):0}}destroy(){this.config=this.videoTrackConfig=this._initPTS=this._initDTS=null}resetTimeStamp(t){A.log("[mp4-remuxer]: initPTS & initDTS reset"),this._initPTS=this._initDTS=t}resetNextTimestamp(){A.log("[mp4-remuxer]: reset next timestamp"),this.isVideoContiguous=!1,this.isAudioContiguous=!1}resetInitSegment(){A.log("[mp4-remuxer]: ISGenerated flag reset"),this.ISGenerated=!1,this.videoTrackConfig=void 0}getVideoStartPts(t){let e=!1
const s=t.reduce(((t,s)=>{const i=s.pts-t
return i<-4294967296?(e=!0,Vi(t,s.pts)):i>0?t:s.pts}),t[0].pts)
return e&&A.debug("PTS rollover detected"),s}remux(t,e,s,i,r,n,a,o){let l,h,d,c,u,f,g=r,m=r
const p=t.pid>-1,y=e.pid>-1,v=e.samples.length,E=t.samples.length>0,T=a&&v>0||v>1
if((!p||E)&&(!y||T)||this.ISGenerated||a){if(this.ISGenerated){var S,L,R,b
const t=this.videoTrackConfig
!t||e.width===t.width&&e.height===t.height&&(null==(S=e.pixelRatio)?void 0:S[0])===(null==(L=t.pixelRatio)?void 0:L[0])&&(null==(R=e.pixelRatio)?void 0:R[1])===(null==(b=t.pixelRatio)?void 0:b[1])||this.resetInitSegment()}else d=this.generateIS(t,e,r,n)
const s=this.isVideoContiguous
let i,a=-1
if(T&&(a=function(t){for(let e=0;e<t.length;e++)if(t[e].key)return e
return-1}(e.samples),!s&&this.config.forceKeyFrameOnDiscontinuity))if(f=!0,a>0){A.warn(`[mp4-remuxer]: Dropped ${a} out of ${v} video samples due to a missing keyframe`)
const t=this.getVideoStartPts(e.samples)
e.samples=e.samples.slice(a),e.dropped+=a,m+=(e.samples[0].pts-t)/e.inputTimeScale,i=m}else-1===a&&(A.warn(`[mp4-remuxer]: No keyframe found out of ${v} video samples`),f=!1)
if(this.ISGenerated){if(E&&T){const s=this.getVideoStartPts(e.samples),i=(Vi(t.samples[0].pts,s)-s)/e.inputTimeScale
g+=Math.max(0,i),m+=Math.max(0,-i)}if(E){if(t.samplerate||(A.warn("[mp4-remuxer]: regenerate InitSegment as audio detected"),d=this.generateIS(t,e,r,n)),h=this.remuxAudio(t,g,this.isAudioContiguous,n,y||T||o===fe.AUDIO?m:void 0),T){const i=h?h.endPTS-h.startPTS:0
e.inputTimeScale||(A.warn("[mp4-remuxer]: regenerate InitSegment as video detected"),d=this.generateIS(t,e,r,n)),l=this.remuxVideo(e,m,s,i)}}else T&&(l=this.remuxVideo(e,m,s,0))
l&&(l.firstKeyFrame=a,l.independent=-1!==a,l.firstKeyFramePTS=i)}}return this.ISGenerated&&this._initPTS&&this._initDTS&&(s.samples.length&&(u=Yi(s,r,this._initPTS,this._initDTS)),i.samples.length&&(c=Wi(i,r,this._initPTS))),{audio:h,video:l,initSegment:d,independent:f,text:c,id3:u}}generateIS(t,e,s,i){const r=t.samples,n=e.samples,a=this.typeSupported,o={},l=this._initPTS
let h,d,c,u=!l||i,f="audio/mp4"
if(u&&(h=d=1/0),t.config&&r.length){switch(t.timescale=t.samplerate,t.segmentCodec){case"mp3":a.mpeg?(f="audio/mpeg",t.codec=""):a.mp3&&(t.codec="mp3")
break
case"ac3":t.codec="ac-3"}o.audio={id:"audio",container:f,codec:t.codec,initSegment:"mp3"===t.segmentCodec&&a.mpeg?new Uint8Array(0):Oi.initSegment([t]),metadata:{channelCount:t.channelCount}},u&&(c=t.inputTimeScale,l&&c===l.timescale?u=!1:h=d=r[0].pts-Math.round(c*s))}if(e.sps&&e.pps&&n.length){if(e.timescale=e.inputTimeScale,o.video={id:"main",container:"video/mp4",codec:e.codec,initSegment:Oi.initSegment([e]),metadata:{width:e.width,height:e.height}},u)if(c=e.inputTimeScale,l&&c===l.timescale)u=!1
else{const t=this.getVideoStartPts(n),e=Math.round(c*s)
d=Math.min(d,Vi(n[0].dts,t)-e),h=Math.min(h,t-e)}this.videoTrackConfig={width:e.width,height:e.height,pixelRatio:e.pixelRatio}}if(Object.keys(o).length)return this.ISGenerated=!0,u?(this._initPTS={baseTime:h,timescale:c},this._initDTS={baseTime:d,timescale:c}):h=c=void 0,{tracks:o,initPTS:h,timescale:c}}remuxVideo(t,e,s,i){const r=t.inputTimeScale,n=t.samples,a=[],o=n.length,l=this._initPTS
let h,d,c=this.nextAvcDts,f=8,g=this.videoSampleDuration,m=Number.POSITIVE_INFINITY,E=Number.NEGATIVE_INFINITY,T=!1
if(!s||null===c){const t=e*r,i=n[0].pts-Vi(n[0].dts,n[0].pts)
Gi&&null!==c&&Math.abs(t-i-c)<15e3?s=!0:c=t-i}const S=l.baseTime*r/l.timescale
for(let u=0;u<o;u++){const t=n[u]
t.pts=Vi(t.pts-S,c),t.dts=Vi(t.dts-S,c),t.dts<n[u>0?u-1:u].dts&&(T=!0)}T&&n.sort((function(t,e){const s=t.dts-e.dts,i=t.pts-e.pts
return s||i})),h=n[0].dts,d=n[n.length-1].dts
const L=d-h,R=L?Math.round(L/(o-1)):g||t.inputTimeScale/30
if(s){const t=h-c,s=t>R,i=t<-1
if((s||i)&&(s?A.warn(`AVC: ${Bi(t,!0)} ms (${t}dts) hole between fragments detected at ${e.toFixed(3)}`):A.warn(`AVC: ${Bi(-t,!0)} ms (${t}dts) overlapping between fragments detected at ${e.toFixed(3)}`),!i||c>=n[0].pts||Gi)){h=c
const e=n[0].pts-t
if(s)n[0].dts=h,n[0].pts=e
else for(let s=0;s<n.length&&!(n[s].dts>e);s++)n[s].dts-=t,n[s].pts-=t
A.log(`Video: Initial PTS/DTS adjusted: ${Bi(e,!0)}/${Bi(h,!0)}, delta: ${Bi(t,!0)} ms`)}}h=Math.max(0,h)
let b=0,D=0,k=h
for(let u=0;u<o;u++){const t=n[u],e=t.units,s=e.length
let i=0
for(let r=0;r<s;r++)i+=e[r].data.length
D+=i,b+=s,t.length=i,t.dts<k?(t.dts=k,k+=R/4|0||1):k=t.dts,m=Math.min(t.pts,m),E=Math.max(t.pts,E)}d=n[o-1].dts
const I=D+4*b+8
let C
try{C=new Uint8Array(I)}catch(t){return void this.observer.emit(p.ERROR,p.ERROR,{type:y.MUX_ERROR,details:v.REMUX_ALLOC_ERROR,fatal:!1,error:t,bytes:I,reason:`fail allocating video mdat ${I}`})}const w=new DataView(C.buffer)
w.setUint32(0,I),C.set(Oi.types.mdat,4)
let _=!1,x=Number.POSITIVE_INFINITY,P=Number.POSITIVE_INFINITY,M=Number.NEGATIVE_INFINITY,F=Number.NEGATIVE_INFINITY
for(let u=0;u<o;u++){const t=n[u],e=t.units
let s,l=0
for(let i=0,r=e.length;i<r;i++){const t=e[i],s=t.data,r=t.data.byteLength
w.setUint32(f,r),f+=4,C.set(s,f),f+=r,l+=4+r}if(u<o-1)g=n[u+1].dts-t.dts,s=n[u+1].pts-t.pts
else{const e=this.config,a=u>0?t.dts-n[u-1].dts:R
if(s=u>0?t.pts-n[u-1].pts:R,e.stretchShortVideoTrack&&null!==this.nextAudioPts){const s=Math.floor(e.maxBufferHole*r),n=(i?m+i*r:this.nextAudioPts)-t.pts
n>s?(g=n-a,g<0?g=a:_=!0,A.log(`[mp4-remuxer]: It is approximately ${n/90} ms to the next segment; using duration ${g/90} ms for the last video frame.`)):g=a}else g=a}const h=Math.round(t.pts-t.dts)
x=Math.min(x,g),M=Math.max(M,g),P=Math.min(P,s),F=Math.max(F,s),a.push(new ji(t.key,g,l,h))}if(a.length)if(Gi){if(Gi<70){const t=a[0].flags
t.dependsOn=2,t.isNonSync=0}}else if(Ki&&F-P<M-x&&R/M<.025&&0===a[0].cts){A.warn("Found irregular gaps in sample duration. Using PTS instead of DTS to determine MP4 sample duration.")
let t=h
for(let e=0,s=a.length;e<s;e++){const i=t+a[e].duration,r=t+a[e].cts
if(e<s-1){const t=i+a[e+1].cts
a[e].duration=t-r}else a[e].duration=e?a[e-1].duration:R
a[e].cts=0,t=i}}g=_||!g?R:g,this.nextAvcDts=c=d+g,this.videoSampleDuration=g,this.isVideoContiguous=!0
const O={data1:Oi.moof(t.sequenceNumber++,h,u({},t,{samples:a})),data2:C,startPTS:m/r,endPTS:(E+g)/r,startDTS:h/r,endDTS:c/r,type:"video",hasAudio:!1,hasVideo:!0,nb:a.length,dropped:t.dropped}
return t.samples=[],t.dropped=0,O}getSamplesPerFrame(t){switch(t.segmentCodec){case"mp3":return 1152
case"ac3":return 1536
default:return 1024}}remuxAudio(t,e,s,i,r){const n=t.inputTimeScale,a=n/(t.samplerate?t.samplerate:n),o=this.getSamplesPerFrame(t),l=o*a,h=this._initPTS,d="mp3"===t.segmentCodec&&this.typeSupported.mpeg,c=[],f=void 0!==r
let g=t.samples,m=d?0:8,E=this.nextAudioPts||-1
const T=e*n,S=h.baseTime*n/h.timescale
if(this.isAudioContiguous=s=s||g.length&&E>0&&(i&&Math.abs(T-E)<9e3||Math.abs(Vi(g[0].pts-S,T)-E)<20*l),g.forEach((function(t){t.pts=Vi(t.pts-S,T)})),!s||E<0){if(g=g.filter((t=>t.pts>=0)),!g.length)return
E=0===r?0:i&&!f?Math.max(0,T):g[0].pts}if("aac"===t.segmentCodec){const e=this.config.maxAudioFramesDrift
for(let s=0,i=E;s<g.length;s++){const r=g[s],a=r.pts,o=a-i,h=Math.abs(1e3*o/n)
if(o<=-e*l&&f)0===s&&(A.warn(`Audio frame @ ${(a/n).toFixed(3)}s overlaps nextAudioPts by ${Math.round(1e3*o/n)} ms.`),this.nextAudioPts=E=i=a)
else if(o>=e*l&&h<1e4&&f){let e=Math.round(o/l)
i=a-e*l,i<0&&(e--,i+=l),0===s&&(this.nextAudioPts=E=i),A.warn(`[mp4-remuxer]: Injecting ${e} audio frame @ ${(i/n).toFixed(3)}s due to ${Math.round(1e3*o/n)} ms gap.`)
for(let n=0;n<e;n++){const e=Math.max(i,0)
let n=Mi.getSilentFrame(t.manifestCodec||t.codec,t.channelCount)
n||(A.log("[mp4-remuxer]: Unable to get silent frame for given audio codec; duplicating last frame instead."),n=r.unit.subarray()),g.splice(s,0,{unit:n,pts:e}),i+=l,s++}}r.pts=i,i+=l}}let L,R=null,b=null,D=0,k=g.length
for(;k--;)D+=g[k].unit.byteLength
for(let u=0,A=g.length;u<A;u++){const e=g[u],i=e.unit
let r=e.pts
if(null!==b)c[u-1].duration=Math.round((r-b)/a)
else{if(s&&"aac"===t.segmentCodec&&(r=E),R=r,!(D>0))return
D+=m
try{L=new Uint8Array(D)}catch(t){return void this.observer.emit(p.ERROR,p.ERROR,{type:y.MUX_ERROR,details:v.REMUX_ALLOC_ERROR,fatal:!1,error:t,bytes:D,reason:`fail allocating audio mdat ${D}`})}d||(new DataView(L.buffer).setUint32(0,D),L.set(Oi.types.mdat,4))}L.set(i,m)
const n=i.byteLength
m+=n,c.push(new ji(!0,o,n,0)),b=r}const I=c.length
if(!I)return
const C=c[c.length-1]
this.nextAudioPts=E=b+a*C.duration
const w=d?new Uint8Array(0):Oi.moof(t.sequenceNumber++,R/a,u({},t,{samples:c}))
t.samples=[]
const _=R/n,x=E/n,P={data1:w,data2:L,startPTS:_,endPTS:x,startDTS:_,endDTS:x,type:"audio",hasAudio:!0,hasVideo:!1,nb:I}
return this.isAudioContiguous=!0,P}remuxEmptyAudio(t,e,s,i){const r=t.inputTimeScale,n=r/(t.samplerate?t.samplerate:r),a=this.nextAudioPts,o=this._initDTS,l=9e4*o.baseTime/o.timescale,h=(null!==a?a:i.startDTS*r)+l,d=i.endDTS*r+l,c=1024*n,u=Math.ceil((d-h)/c),f=Mi.getSilentFrame(t.manifestCodec||t.codec,t.channelCount)
if(A.warn("[mp4-remuxer]: remux empty Audio"),!f)return void A.trace("[mp4-remuxer]: Unable to remuxEmptyAudio since we were unable to get a silent frame for given audio codec")
const g=[]
for(let m=0;m<u;m++){const t=h+m*c
g.push({unit:f,pts:t,dts:t})}return t.samples=g,this.remuxAudio(t,e,s,!1)}}function Vi(t,e){let s
if(null===e)return t
for(s=e<t?-8589934592:8589934592;Math.abs(t-e)>4294967296;)t+=s
return t}function Yi(t,e,s,i){const r=t.samples.length
if(!r)return
const n=t.inputTimeScale
for(let o=0;o<r;o++){const r=t.samples[o]
r.pts=Vi(r.pts-s.baseTime*n/s.timescale,e*n)/n,r.dts=Vi(r.dts-i.baseTime*n/i.timescale,e*n)/n}const a=t.samples
return t.samples=[],{samples:a}}function Wi(t,e,s){const i=t.samples.length
if(!i)return
const r=t.inputTimeScale
for(let a=0;a<i;a++){const i=t.samples[a]
i.pts=Vi(i.pts-s.baseTime*r/s.timescale,e*r)/r}t.samples.sort(((t,e)=>t.pts-e.pts))
const n=t.samples
return t.samples=[],{samples:n}}class ji{constructor(t,e,s,i){this.size=void 0,this.duration=void 0,this.cts=void 0,this.flags=void 0,this.duration=e,this.size=s,this.cts=i,this.flags={isLeading:0,isDependedOn:0,hasRedundancy:0,degradPrio:0,dependsOn:t?2:1,isNonSync:t?0:1}}}function qi(t,e){const s=null==t?void 0:t.codec
if(s&&s.length>4)return s
if(e===C.AUDIO){if("ec-3"===s||"ac-3"===s||"alac"===s)return s
if("fLaC"===s||"Opus"===s)return Qt(s,!1)
const t="mp4a.40.5"
return A.info(`Parsed audio codec "${s}" or audio object type not handled. Using "${t}"`),t}return A.warn(`Unhandled video codec "${s}"`),"hvc1"===s||"hev1"===s?"hvc1.1.6.L120.90":"av01"===s?"av01.0.04M.08":"avc1.42e01e"}try{$i=self.performance.now.bind(self.performance)}catch(t){A.debug("Unable to use Performance API on this environment"),$i=null==O?void 0:O.Date.now}const Xi=[{demux:class{constructor(t,e){this.remainderData=null,this.timeOffset=0,this.config=void 0,this.videoTrack=void 0,this.audioTrack=void 0,this.id3Track=void 0,this.txtTrack=void 0,this.config=e}resetTimeStamp(){}resetInitSegment(t,e,s,i){const r=this.videoTrack=Js("video",1),n=this.audioTrack=Js("audio",1),a=this.txtTrack=Js("text",1)
if(this.id3Track=Js("id3",1),this.timeOffset=0,null==t||!t.byteLength)return
const o=St(t)
if(o.video){const{id:t,timescale:e,codec:s}=o.video
r.id=t,r.timescale=a.timescale=e,r.codec=s}if(o.audio){const{id:t,timescale:e,codec:s}=o.audio
n.id=t,n.timescale=e,n.codec=s}a.id=ut.text,r.sampleDuration=0,r.duration=n.duration=i}resetContiguity(){this.remainderData=null}static probe(t){return function(t){const e=t.byteLength
for(let s=0;s<e;){const i=mt(t,s)
if(i>8&&109===t[s+4]&&111===t[s+5]&&111===t[s+6]&&102===t[s+7])return!0
s=i>1?s+i:e}return!1}(t)}demux(t,e){this.timeOffset=e
let s=t
const i=this.videoTrack,r=this.txtTrack
if(this.config.progressive){this.remainderData&&(s=It(this.remainderData,t))
const e=function(t){const e={valid:null,remainder:null},s=Et(t,["moof"])
if(s.length<2)return e.remainder=t,e
const i=s[s.length-1]
return e.valid=W(t,0,i.byteOffset-8),e.remainder=W(t,i.byteOffset-8),e}(s)
this.remainderData=e.remainder,i.samples=e.valid||new Uint8Array}else i.samples=s
const n=this.extractID3Track(i,e)
return r.samples=Ct(e,i),{videoTrack:i,audioTrack:this.audioTrack,id3Track:n,textTrack:this.txtTrack}}flush(){const t=this.timeOffset,e=this.videoTrack,s=this.txtTrack
e.samples=this.remainderData||new Uint8Array,this.remainderData=null
const i=this.extractID3Track(e,this.timeOffset)
return s.samples=Ct(t,e),{videoTrack:e,audioTrack:Js(),id3Track:i,textTrack:Js()}}extractID3Track(t,e){const s=this.id3Track
if(t.samples.length){const i=Et(t.samples,["emsg"])
i&&i.forEach((t=>{const i=function(t){const e=t[0]
let s="",i="",r=0,n=0,a=0,o=0,l=0,h=0
if(0===e){for(;"\0"!==ft(t.subarray(h,h+1));)s+=ft(t.subarray(h,h+1)),h+=1
for(s+=ft(t.subarray(h,h+1)),h+=1;"\0"!==ft(t.subarray(h,h+1));)i+=ft(t.subarray(h,h+1)),h+=1
i+=ft(t.subarray(h,h+1)),h+=1,r=mt(t,12),n=mt(t,16),o=mt(t,20),l=mt(t,24),h=28}else if(1===e){h+=4,r=mt(t,h),h+=4
const e=mt(t,h)
h+=4
const n=mt(t,h)
for(h+=4,a=2**32*e+n,g(a)||(a=Number.MAX_SAFE_INTEGER,A.warn("Presentation time exceeds safe integer limit and wrapped to max safe integer in parsing emsg box")),o=mt(t,h),h+=4,l=mt(t,h),h+=4;"\0"!==ft(t.subarray(h,h+1));)s+=ft(t.subarray(h,h+1)),h+=1
for(s+=ft(t.subarray(h,h+1)),h+=1;"\0"!==ft(t.subarray(h,h+1));)i+=ft(t.subarray(h,h+1)),h+=1
i+=ft(t.subarray(h,h+1)),h+=1}return{schemeIdUri:s,value:i,timeScale:r,presentationTime:a,presentationTimeDelta:n,eventDuration:o,id:l,payload:t.subarray(h,t.byteLength)}}(t)
if(Ei.test(i.schemeIdUri)){const t=f(i.presentationTime)?i.presentationTime/i.timeScale:e+i.presentationTimeDelta/i.timeScale
let r=4294967295===i.eventDuration?Number.POSITIVE_INFINITY:i.eventDuration/i.timeScale
r<=.001&&(r=Number.POSITIVE_INFINITY)
const n=i.payload
s.samples.push({data:n,len:n.byteLength,dts:t,pts:t,type:Ae.emsg,duration:r})}}))}return s}demuxSampleAes(t,e,s){return Promise.reject(new Error("The MP4 demuxer does not support SAMPLE-AES decryption"))}destroy(){}},remux:class{constructor(){this.emitInitSegment=!1,this.audioCodec=void 0,this.videoCodec=void 0,this.initData=void 0,this.initPTS=null,this.initTracks=void 0,this.lastEndTime=null}destroy(){}resetTimeStamp(t){this.initPTS=t,this.lastEndTime=null}resetNextTimestamp(){this.lastEndTime=null}resetInitSegment(t,e,s,i){this.audioCodec=e,this.videoCodec=s,this.generateInitSegment(function(t,e){if(!t||!e)return t
const s=e.keyId
return s&&e.isCommonEncryption&&Et(t,["moov","trak"]).forEach((t=>{const e=Et(t,["mdia","minf","stbl","stsd"])[0].subarray(8)
let i=Et(e,["enca"])
const r=i.length>0
r||(i=Et(e,["encv"])),i.forEach((t=>{Et(r?t.subarray(28):t.subarray(78),["sinf"]).forEach((t=>{const e=Dt(t)
if(e){const t=e.subarray(8,24)
t.some((t=>0!==t))||(A.log(`[eme] Patching keyId in 'enc${r?"a":"v"}>sinf>>tenc' box: ${ht.hexDump(t)} -> ${ht.hexDump(s)}`),e.set(s,8))}}))}))})),t}(t,i)),this.emitInitSegment=!0}generateInitSegment(t){let{audioCodec:e,videoCodec:s}=this
if(null==t||!t.byteLength)return this.initTracks=void 0,void(this.initData=void 0)
const i=this.initData=St(t)
i.audio&&(e=qi(i.audio,C.AUDIO)),i.video&&(s=qi(i.video,C.VIDEO))
const r={}
i.audio&&i.video?r.audiovideo={container:"video/mp4",codec:e+","+s,initSegment:t,id:"main"}:i.audio?r.audio={container:"audio/mp4",codec:e,initSegment:t,id:"audio"}:i.video?r.video={container:"video/mp4",codec:s,initSegment:t,id:"main"}:A.warn("[passthrough-remuxer.ts]: initSegment does not contain moov or trak boxes."),this.initTracks=r}remux(t,e,s,i,r,n){var a,o
let{initPTS:l,lastEndTime:h}=this
const d={audio:void 0,video:void 0,text:i,id3:s,initSegment:void 0}
f(h)||(h=this.lastEndTime=r||0)
const c=e.samples
if(null==c||!c.length)return d
const u={initPTS:void 0,timescale:1}
let g=this.initData
if(null!=(a=g)&&a.length||(this.generateInitSegment(c),g=this.initData),null==(o=g)||!o.length)return A.warn("[passthrough-remuxer.ts]: Failed to generate initSegment."),d
this.emitInitSegment&&(u.tracks=this.initTracks,this.emitInitSegment=!1)
const m=function(t,e){let s=0,i=0,r=0
const n=Et(t,["moof","traf"])
for(let a=0;a<n.length;a++){const t=n[a],o=Et(t,["tfhd"])[0],l=e[mt(o,4)]
if(!l)continue
const h=l.default,d=mt(o,0)|(null==h?void 0:h.flags)
let c=null==h?void 0:h.duration
8&d&&(c=mt(o,2&d?12:8))
const u=l.timescale||9e4,f=Et(t,["trun"])
for(let e=0;e<f.length;e++)s=kt(f[e]),!s&&c&&(s=c*mt(f[e],4)),l.type===C.VIDEO?i+=s/u:l.type===C.AUDIO&&(r+=s/u)}if(0===i&&0===r){let e=1/0,s=0,i=0
const r=Et(t,["sidx"])
for(let t=0;t<r.length;t++){const n=Tt(r[t])
if(null!=n&&n.references){e=Math.min(e,n.earliestPresentationTime/n.timescale)
const t=n.references.reduce(((t,e)=>t+e.info.duration||0),0)
s=Math.max(s,t+n.earliestPresentationTime/n.timescale),i=s-e}}if(i&&f(i))return i}return i||r}(c,g),p=function(t,e){return Et(e,["moof","traf"]).reduce(((e,s)=>{const i=Et(s,["tfdt"])[0],r=i[0],n=Et(s,["tfhd"]).reduce(((e,s)=>{const n=mt(s,4),a=t[n]
if(a){let t=mt(i,4)
if(1===r){if(t===dt)return A.warn("[mp4-demuxer]: Ignoring assumed invalid signed 64-bit track fragment decode time"),e
t*=dt+1,t+=mt(i,8)}const s=t/(a.timescale||9e4)
if(f(s)&&(null===e||s<e))return s}return e}),null)
return null!==n&&f(n)&&(null===e||n<e)?n:e}),null)}(g,c),y=null===p?r:p;(function(t,e,s,i){if(null===t)return!0
const r=Math.max(i,1),n=e-t.baseTime/t.timescale
return Math.abs(n-s)>r}(l,y,r,m)||u.timescale!==l.timescale&&n)&&(u.initPTS=y-r,l&&1===l.timescale&&A.warn("Adjusting initPTS by "+(u.initPTS-l.baseTime)),this.initPTS=l={baseTime:u.initPTS,timescale:1})
const v=t?y-l.baseTime/l.timescale:h,E=v+m
!function(t,e,s){Et(e,["moof","traf"]).forEach((e=>{Et(e,["tfhd"]).forEach((i=>{const r=mt(i,4),n=t[r]
if(!n)return
const a=n.timescale||9e4
Et(e,["tfdt"]).forEach((t=>{const e=t[0],i=s*a
if(i){let s=mt(t,4)
if(0===e)s-=i,s=Math.max(s,0),vt(t,4,s)
else{s*=Math.pow(2,32),s+=mt(t,8),s-=i,s=Math.max(s,0)
const e=Math.floor(s/(dt+1)),r=Math.floor(s%(dt+1))
vt(t,4,e),vt(t,8,r)}}}))}))}))}(g,c,l.baseTime/l.timescale),m>0?this.lastEndTime=E:(A.warn("Duration parsed from mp4 should be greater than zero"),this.resetNextTimestamp())
const T=!!g.audio,S=!!g.video
let L=""
T&&(L+="audio"),S&&(L+="video")
const R={data1:c,startPTS:v,startDTS:v,endPTS:E,endDTS:E,type:L,hasAudio:T,hasVideo:S,nb:1,dropped:0}
return d.audio="audio"===R.type?R:void 0,d.video="audio"!==R.type?R:void 0,d.initSegment=u,d.id3=Yi(s,r,l,l),i.samples.length&&(d.text=Wi(i,r,l)),d}}},{demux:ki,remux:Hi},{demux:class extends Zs{constructor(t,e){super(),this.observer=void 0,this.config=void 0,this.observer=t,this.config=e}resetInitSegment(t,e,s,i){super.resetInitSegment(t,e,s,i),this._audioTrack={container:"audio/adts",type:"audio",id:2,pid:-1,sequenceNumber:0,segmentCodec:"aac",samples:[],manifestCodec:e,duration:i,inputTimeScale:9e4,dropped:0}}static probe(t){if(!t)return!1
const e=X(t,0)
let s=(null==e?void 0:e.length)||0
if(vi(t,s))return!1
for(let i=t.length;s<i;s++)if(ni(t,s))return A.log("ADTS sync word found !"),!0
return!1}canParse(t,e){return function(t,e){return function(t,e){return e+5<t.length}(t,e)&&ei(t,e)&&ii(t,e)<=t.length-e}(t,e)}appendFrame(t,e,s){ai(t,this.observer,e,s,t.manifestCodec)
const i=li(t,e,s,this.basePTS,this.frameIndex)
if(i&&0===i.missing)return i}},remux:Hi},{demux:class extends Zs{resetInitSegment(t,e,s,i){super.resetInitSegment(t,e,s,i),this._audioTrack={container:"audio/mpeg",type:"audio",id:2,pid:-1,sequenceNumber:0,segmentCodec:"mp3",samples:[],manifestCodec:e,duration:i,inputTimeScale:9e4,dropped:0}}static probe(t){if(!t)return!1
const e=X(t,0)
let s=(null==e?void 0:e.length)||0
if(e&&11===t[s]&&119===t[s+1]&&void 0!==J(e)&&Ti(t,s)<=16)return!1
for(let i=t.length;s<i;s++)if(vi(t,s))return A.log("MPEG Audio sync word found !"),!0
return!1}canParse(t,e){return function(t,e){return pi(t,e)&&4<=t.length-e}(t,e)}appendFrame(t,e,s){if(null!==this.basePTS)return gi(t,e,s,this.basePTS,this.frameIndex)}},remux:Hi}]
Xi.splice(2,0,{demux:class extends Zs{constructor(t){super(),this.observer=void 0,this.observer=t}resetInitSegment(t,e,s,i){super.resetInitSegment(t,e,s,i),this._audioTrack={container:"audio/ac-3",type:"audio",id:2,pid:-1,sequenceNumber:0,segmentCodec:"ac3",samples:[],manifestCodec:e,duration:i,inputTimeScale:9e4,dropped:0}}canParse(t,e){return e+64<t.length}appendFrame(t,e,s){const i=Si(t,e,s,this.basePTS,this.frameIndex)
if(-1!==i)return{sample:t.samples[t.samples.length-1],length:i,missing:0}}static probe(t){if(!t)return!1
const e=X(t,0)
if(!e)return!1
const s=e.length
return 11===t[s]&&119===t[s+1]&&void 0!==J(e)&&Ti(t,s)<16}},remux:Hi})
class zi{constructor(t,e,s,i,r){this.async=!1,this.observer=void 0,this.typeSupported=void 0,this.config=void 0,this.vendor=void 0,this.id=void 0,this.demuxer=void 0,this.remuxer=void 0,this.decrypter=void 0,this.probe=void 0,this.decryptionPromise=null,this.transmuxConfig=void 0,this.currentTransmuxState=void 0,this.observer=t,this.typeSupported=e,this.config=s,this.vendor=i,this.id=r}configure(t){this.transmuxConfig=t,this.decrypter&&this.decrypter.reset()}push(t,e,s,i){const r=s.transmuxing
r.executeStart=$i()
let n=new Uint8Array(t)
const{currentTransmuxState:a,transmuxConfig:o}=this
i&&(this.currentTransmuxState=i)
const{contiguous:l,discontinuity:h,trackSwitch:d,accurateTimeOffset:c,timeOffset:u,initSegmentChange:f}=i||a,{audioCodec:g,videoCodec:m,defaultInitPts:E,duration:T,initSegmentData:S}=o,L=function(t,e){let s=null
return t.byteLength>0&&null!=(null==e?void 0:e.key)&&null!==e.iv&&null!=e.method&&(s=e),s}(n,e)
if(L&&"AES-128"===L.method){const t=this.getDecrypter()
if(!t.isSync())return this.decryptionPromise=t.webCryptoDecrypt(n,L.key.buffer,L.iv.buffer).then((t=>{const e=this.push(t,null,s)
return this.decryptionPromise=null,e})),this.decryptionPromise
{let e=t.softwareDecrypt(n,L.key.buffer,L.iv.buffer)
if(s.part>-1&&(e=t.flush()),!e)return r.executeEnd=$i(),Qi(s)
n=new Uint8Array(e)}}const R=this.needsProbing(h,d)
if(R){const t=this.configureTransmuxer(n)
if(t)return A.warn(`[transmuxer] ${t.message}`),this.observer.emit(p.ERROR,p.ERROR,{type:y.MEDIA_ERROR,details:v.FRAG_PARSING_ERROR,fatal:!1,error:t,reason:t.message}),r.executeEnd=$i(),Qi(s)}(h||d||f||R)&&this.resetInitSegment(S,g,m,T,e),(h||f||R)&&this.resetInitialTimestamp(E),l||this.resetContiguity()
const b=this.transmux(n,L,u,c,s),D=this.currentTransmuxState
return D.contiguous=!0,D.discontinuity=!1,D.trackSwitch=!1,r.executeEnd=$i(),b}flush(t){const e=t.transmuxing
e.executeStart=$i()
const{decrypter:s,currentTransmuxState:i,decryptionPromise:r}=this
if(r)return r.then((()=>this.flush(t)))
const n=[],{timeOffset:a}=i
if(s){const e=s.flush()
e&&n.push(this.push(e,null,t))}const{demuxer:o,remuxer:l}=this
if(!o||!l)return e.executeEnd=$i(),[Qi(t)]
const h=o.flush(a)
return Ji(h)?h.then((e=>(this.flushRemux(n,e,t),n))):(this.flushRemux(n,h,t),n)}flushRemux(t,e,s){const{audioTrack:i,videoTrack:r,id3Track:n,textTrack:a}=e,{accurateTimeOffset:o,timeOffset:l}=this.currentTransmuxState
A.log(`[transmuxer.ts]: Flushed fragment ${s.sn}${s.part>-1?" p: "+s.part:""} of level ${s.level}`)
const h=this.remuxer.remux(i,r,n,a,l,o,!0,this.id)
t.push({remuxResult:h,chunkMeta:s}),s.transmuxing.executeEnd=$i()}resetInitialTimestamp(t){const{demuxer:e,remuxer:s}=this
e&&s&&(e.resetTimeStamp(t),s.resetTimeStamp(t))}resetContiguity(){const{demuxer:t,remuxer:e}=this
t&&e&&(t.resetContiguity(),e.resetNextTimestamp())}resetInitSegment(t,e,s,i,r){const{demuxer:n,remuxer:a}=this
n&&a&&(n.resetInitSegment(t,e,s,i),a.resetInitSegment(t,e,s,r))}destroy(){this.demuxer&&(this.demuxer.destroy(),this.demuxer=void 0),this.remuxer&&(this.remuxer.destroy(),this.remuxer=void 0)}transmux(t,e,s,i,r){let n
return n=e&&"SAMPLE-AES"===e.method?this.transmuxSampleAes(t,e,s,i,r):this.transmuxUnencrypted(t,s,i,r),n}transmuxUnencrypted(t,e,s,i){const{audioTrack:r,videoTrack:n,id3Track:a,textTrack:o}=this.demuxer.demux(t,e,!1,!this.config.progressive)
return{remuxResult:this.remuxer.remux(r,n,a,o,e,s,!1,this.id),chunkMeta:i}}transmuxSampleAes(t,e,s,i,r){return this.demuxer.demuxSampleAes(t,e,s).then((t=>({remuxResult:this.remuxer.remux(t.audioTrack,t.videoTrack,t.id3Track,t.textTrack,s,i,!1,this.id),chunkMeta:r})))}configureTransmuxer(t){const{config:e,observer:s,typeSupported:i,vendor:r}=this
let n
for(let c=0,u=Xi.length;c<u;c++){var a
if(null!=(a=Xi[c].demux)&&a.probe(t)){n=Xi[c]
break}}if(!n)return new Error("Failed to find demuxer by probing fragment data")
const o=this.demuxer,l=this.remuxer,h=n.remux,d=n.demux
l&&l instanceof h||(this.remuxer=new h(s,e,i,r)),o&&o instanceof d||(this.demuxer=new d(s,e,i),this.probe=d.probe)}needsProbing(t,e){return!this.demuxer||!this.remuxer||t||e}getDecrypter(){let t=this.decrypter
return t||(t=this.decrypter=new Ns(this.config)),t}}const Qi=t=>({remuxResult:{},chunkMeta:t})
function Ji(t){return"then"in t&&t.then instanceof Function}class Zi{constructor(t,e,s,i,r){this.audioCodec=void 0,this.videoCodec=void 0,this.initSegmentData=void 0,this.duration=void 0,this.defaultInitPts=void 0,this.audioCodec=t,this.videoCodec=e,this.initSegmentData=s,this.duration=i,this.defaultInitPts=r||null}}class tr{constructor(t,e,s,i,r,n){this.discontinuity=void 0,this.contiguous=void 0,this.accurateTimeOffset=void 0,this.trackSwitch=void 0,this.timeOffset=void 0,this.initSegmentChange=void 0,this.discontinuity=t,this.contiguous=e,this.accurateTimeOffset=s,this.trackSwitch=i,this.timeOffset=r,this.initSegmentChange=n}}var er={exports:{}}
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
return t?(e=s?s+t:t,this._events[e]&&a(this,e)):(this._events=new i,this._eventsCount=0),this},o.prototype.off=o.prototype.removeListener,o.prototype.addListener=o.prototype.on,o.prefixed=s,o.EventEmitter=o,t.exports=o}(er)
var sr=function(t){return t&&t.__esModule&&Object.prototype.hasOwnProperty.call(t,"default")?t.default:t}(er.exports)
class ir{constructor(t,e,s,i){this.error=null,this.hls=void 0,this.id=void 0,this.observer=void 0,this.frag=null,this.part=null,this.useWorker=void 0,this.workerContext=null,this.onwmsg=void 0,this.transmuxer=null,this.onTransmuxComplete=void 0,this.onFlush=void 0
const r=t.config
this.hls=t,this.id=e,this.useWorker=!!r.enableWorker,this.onTransmuxComplete=s,this.onFlush=i
const n=(t,e)=>{(e=e||{}).frag=this.frag,e.id=this.id,t===p.ERROR&&(this.error=e.error),this.hls.trigger(t,e)}
this.observer=new sr,this.observer.on(p.FRAG_DECRYPTED,n),this.observer.on(p.ERROR,n)
const a=Kt(r.preferManagedMediaSource)||{isTypeSupported:()=>!1},o={mpeg:a.isTypeSupported("audio/mpeg"),mp3:a.isTypeSupported('audio/mp4; codecs="mp3"'),ac3:a.isTypeSupported('audio/mp4; codecs="ac-3"')}
if(!this.useWorker||"undefined"==typeof Worker||!r.workerPath&&"function"!=typeof __HLS_WORKER_BUNDLE__)this.transmuxer=new zi(this.observer,o,r,"",e)
else try{r.workerPath?(A.log(`loading Web Worker ${r.workerPath} for "${e}"`),this.workerContext=function(t){const e=new self.URL(t,self.location.href).href
return{worker:new self.Worker(e),scriptURL:e}}(r.workerPath)):(A.log(`injecting Web Worker for "${e}"`),this.workerContext=function(){const t=new self.Blob([`var exports={};var module={exports:exports};function define(f){f()};define.amd=true;(${__HLS_WORKER_BUNDLE__.toString()})(true);`],{type:"text/javascript"}),e=self.URL.createObjectURL(t)
return{worker:new self.Worker(e),objectURL:e}}()),this.onwmsg=t=>this.onWorkerMessage(t)
const{worker:t}=this.workerContext
t.addEventListener("message",this.onwmsg),t.onerror=t=>{const s=new Error(`${t.message}  (${t.filename}:${t.lineno})`)
r.enableWorker=!1,A.warn(`Error in "${e}" Web Worker, fallback to inline`),this.hls.trigger(p.ERROR,{type:y.OTHER_ERROR,details:v.INTERNAL_EXCEPTION,fatal:!1,event:"demuxerWorker",error:s})},t.postMessage({cmd:"init",typeSupported:o,vendor:"",id:e,config:JSON.stringify(r)})}catch(t){A.warn(`Error setting up "${e}" Web Worker, fallback to inline`,t),this.resetWorker(),this.error=null,this.transmuxer=new zi(this.observer,o,r,"",e)}}resetWorker(){if(this.workerContext){const{worker:t,objectURL:e}=this.workerContext
e&&self.URL.revokeObjectURL(e),t.removeEventListener("message",this.onwmsg),t.onerror=null,t.terminate(),this.workerContext=null}}destroy(){if(this.workerContext)this.resetWorker(),this.onwmsg=void 0
else{const t=this.transmuxer
t&&(t.destroy(),this.transmuxer=null)}const t=this.observer
t&&t.removeAllListeners(),this.frag=null,this.observer=null,this.hls=null}push(t,e,s,i,r,n,a,o,l,h){var d,c
l.transmuxing.start=self.performance.now()
const{transmuxer:u}=this,f=n?n.start:r.start,g=r.decryptdata,m=this.frag,p=!(m&&r.cc===m.cc),y=!(m&&l.level===m.level),v=m?l.sn-m.sn:-1,E=this.part?l.part-this.part.index:-1,T=0===v&&l.id>1&&l.id===(null==m?void 0:m.stats.chunkCount),S=!y&&(1===v||0===v&&(1===E||T&&E<=0)),L=self.performance.now();(y||v||0===r.stats.parsing.start)&&(r.stats.parsing.start=L),!n||!E&&S||(n.stats.parsing.start=L)
const R=!(m&&(null==(d=r.initSegment)?void 0:d.url)===(null==(c=m.initSegment)?void 0:c.url)),b=new tr(p,S,o,y,f,R)
if(!S||p||R){A.log(`[transmuxer-interface, ${r.type}]: Starting new transmux session for sn: ${l.sn} p: ${l.part} level: ${l.level} id: ${l.id}\n        discontinuity: ${p}\n        trackSwitch: ${y}\n        contiguous: ${S}\n        accurateTimeOffset: ${o}\n        timeOffset: ${f}\n        initSegmentChange: ${R}`)
const t=new Zi(s,i,e,a,h)
this.configureTransmuxer(t)}if(this.frag=r,this.part=n,this.workerContext)this.workerContext.worker.postMessage({cmd:"demux",data:t,decryptdata:g,chunkMeta:l,state:b},t instanceof ArrayBuffer?[t]:[])
else if(u){const e=u.push(t,g,l,b)
Ji(e)?(u.async=!0,e.then((t=>{this.handleTransmuxComplete(t)})).catch((t=>{this.transmuxerError(t,l,"transmuxer-interface push error")}))):(u.async=!1,this.handleTransmuxComplete(e))}}flush(t){t.transmuxing.start=self.performance.now()
const{transmuxer:e}=this
if(this.workerContext)this.workerContext.worker.postMessage({cmd:"flush",chunkMeta:t})
else if(e){let s=e.flush(t)
Ji(s)||e.async?(Ji(s)||(s=Promise.resolve(s)),s.then((e=>{this.handleFlushResult(e,t)})).catch((e=>{this.transmuxerError(e,t,"transmuxer-interface flush error")}))):this.handleFlushResult(s,t)}}transmuxerError(t,e,s){this.hls&&(this.error=t,this.hls.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.FRAG_PARSING_ERROR,chunkMeta:e,frag:this.frag||void 0,fatal:!1,error:t,err:t,reason:s}))}handleFlushResult(t,e){t.forEach((t=>{this.handleTransmuxComplete(t)})),this.onFlush(e)}onWorkerMessage(t){const e=t.data
if(null==e||!e.event)return void A.warn("worker message received with no "+(e?"event name":"data"))
const s=this.hls
if(this.hls)switch(e.event){case"init":{var i
const t=null==(i=this.workerContext)?void 0:i.objectURL
t&&self.URL.revokeObjectURL(t)
break}case"transmuxComplete":this.handleTransmuxComplete(e.data)
break
case"flush":this.onFlush(e.data)
break
case"workerLog":A[e.data.logType]&&A[e.data.logType](e.data.message)
break
default:e.data=e.data||{},e.data.frag=this.frag,e.data.id=this.id,s.trigger(e.event,e.data)}}configureTransmuxer(t){const{transmuxer:e}=this
this.workerContext?this.workerContext.worker.postMessage({cmd:"configure",config:t}):e&&e.configure(t)}handleTransmuxComplete(t){t.chunkMeta.transmuxing.end=self.performance.now(),this.onTransmuxComplete(t)}}function rr(t,e){if(t.length!==e.length)return!1
for(let s=0;s<t.length;s++)if(!nr(t[s].attrs,e[s].attrs))return!1
return!0}function nr(t,e,s){const i=t["STABLE-RENDITION-ID"]
return i&&!s?i===e["STABLE-RENDITION-ID"]:!(s||["LANGUAGE","NAME","CHARACTERISTICS","AUTOSELECT","DEFAULT","FORCED","ASSOC-LANGUAGE"]).some((s=>t[s]!==e[s]))}function ar(t,e){return e.label.toLowerCase()===t.name.toLowerCase()&&(!e.language||e.language.toLowerCase()===(t.lang||"").toLowerCase())}class or extends zs{constructor(t,e,s){super(t,e,s,"[audio-stream-controller]",fe.AUDIO),this.videoBuffer=null,this.videoTrackCC=-1,this.waitingVideoCC=-1,this.bufferedTrack=null,this.switchingTrack=null,this.trackId=-1,this.waitingData=null,this.mainDetails=null,this.flushing=!1,this.bufferFlushed=!1,this.cachedTrackLoadedData=null,this._registerListeners()}onHandlerDestroying(){this._unregisterListeners(),super.onHandlerDestroying(),this.mainDetails=null,this.bufferedTrack=null,this.switchingTrack=null}_registerListeners(){const{hls:t}=this
t.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.LEVEL_LOADED,this.onLevelLoaded,this),t.on(p.AUDIO_TRACKS_UPDATED,this.onAudioTracksUpdated,this),t.on(p.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.on(p.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.on(p.ERROR,this.onError,this),t.on(p.BUFFER_RESET,this.onBufferReset,this),t.on(p.BUFFER_CREATED,this.onBufferCreated,this),t.on(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.on(p.BUFFER_FLUSHED,this.onBufferFlushed,this),t.on(p.INIT_PTS_FOUND,this.onInitPtsFound,this),t.on(p.FRAG_BUFFERED,this.onFragBuffered,this)}_unregisterListeners(){const{hls:t}=this
t.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.LEVEL_LOADED,this.onLevelLoaded,this),t.off(p.AUDIO_TRACKS_UPDATED,this.onAudioTracksUpdated,this),t.off(p.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.off(p.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.off(p.ERROR,this.onError,this),t.off(p.BUFFER_RESET,this.onBufferReset,this),t.off(p.BUFFER_CREATED,this.onBufferCreated,this),t.off(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.off(p.BUFFER_FLUSHED,this.onBufferFlushed,this),t.off(p.INIT_PTS_FOUND,this.onInitPtsFound,this),t.off(p.FRAG_BUFFERED,this.onFragBuffered,this)}onInitPtsFound(t,{frag:e,id:s,initPTS:i,timescale:r}){if("main"===s){const t=e.cc
this.initPTS[e.cc]={baseTime:i,timescale:r},this.log(`InitPTS for cc: ${t} found from main: ${i}`),this.videoTrackCC=t,this.state===qs&&this.tick()}}startLoad(t){if(!this.levels)return this.startPosition=t,void(this.state=Us)
const e=this.lastCurrentTime
this.stopLoad(),this.setInterval(100),e>0&&-1===t?(this.log(`Override startPosition with lastCurrentTime @${e.toFixed(3)}`),t=e,this.state=Bs):(this.loadedmetadata=!1,this.state=Hs),this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}doTick(){switch(this.state){case Bs:this.doTickIdle()
break
case Hs:{var t
const{levels:e,trackId:s}=this,i=null==e||null==(t=e[s])?void 0:t.details
if(i){if(this.waitForCdnTuneIn(i))break
this.state=qs}break}case Ks:{var e
const t=performance.now(),s=this.retryDate
if(!s||t>=s||null!=(e=this.media)&&e.seeking){const{levels:t,trackId:e}=this
this.log("RetryDate reached, switch back to IDLE state"),this.resetStartWhenNotLoaded((null==t?void 0:t[e])||null),this.state=Bs}break}case qs:{const t=this.waitingData
if(t){const{frag:e,part:s,cache:i,complete:r}=t
if(void 0!==this.initPTS[e.cc]){this.waitingData=null,this.waitingVideoCC=-1,this.state=Gs
const t={frag:e,part:s,payload:i.flush(),networkDetails:null}
this._handleFragmentLoadProgress(t),r&&super._handleFragmentLoadComplete(t)}else if(this.videoTrackCC!==this.waitingVideoCC)this.log(`Waiting fragment cc (${e.cc}) cancelled because video is at cc ${this.videoTrackCC}`),this.clearWaitingFragment()
else{const t=this.getLoadPosition(),s=Ls.bufferInfo(this.mediaBuffer,t,this.config.maxBufferHole)
ze(s.end,this.config.maxFragLookUpTolerance,e)<0&&(this.log(`Waiting fragment cc (${e.cc}) @ ${e.start} cancelled because another fragment at ${s.end} is needed`),this.clearWaitingFragment())}}else this.state=Bs}}this.onTickEnd()}clearWaitingFragment(){const t=this.waitingData
t&&(this.fragmentTracker.removeFragment(t.frag),this.waitingData=null,this.waitingVideoCC=-1,this.state=Bs)}resetLoadingState(){this.clearWaitingFragment(),super.resetLoadingState()}onTickEnd(){const{media:t}=this
null!=t&&t.readyState&&(this.lastCurrentTime=t.currentTime)}doTickIdle(){const{hls:t,levels:e,media:s,trackId:i}=this,r=t.config
if(!s&&(this.startFragRequested||!r.startFragPrefetch)||null==e||!e[i])return
const n=e[i],a=n.details
if(!a||a.live&&this.levelLastLoaded!==n||this.waitForCdnTuneIn(a))return void(this.state=Hs)
const o=this.mediaBuffer?this.mediaBuffer:this.media
this.bufferFlushed&&o&&(this.bufferFlushed=!1,this.afterBufferFlushed(o,C.AUDIO,fe.AUDIO))
const l=this.getFwdBufferInfo(o,fe.AUDIO)
if(null===l)return
const{bufferedTrack:h,switchingTrack:d}=this
if(!d&&this._streamEnded(l,a))return t.trigger(p.BUFFER_EOS,{type:"audio"}),void(this.state=Ws)
const c=this.getFwdBufferInfo(this.videoBuffer?this.videoBuffer:this.media,fe.MAIN),u=l.len,f=this.getMaxBufferLength(null==c?void 0:c.len),g=a.fragments,m=g[0].start
let y=this.flushing?this.getLoadPosition():l.end
if(d&&s){const t=this.getLoadPosition()
h&&!nr(d.attrs,h.attrs)&&(y=t),a.PTSKnown&&t<m&&(l.end>m||l.nextStart)&&(this.log("Alt audio track ahead of main track, seek to start of alt audio track"),s.currentTime=m+.05)}if(u>=f&&!d&&y<g[g.length-1].start)return
let v=this.getNextFragment(y,a),E=!1
if(v&&this.isLoopLoading(v,y)&&(E=!!v.gap,v=this.getNextFragmentLoopLoading(v,a,l,fe.MAIN,f)),!v)return void(this.bufferFlushed=!0)
const T=c&&v.start>c.end+a.targetduration
if(T||(null==c||!c.len)&&l.len){const t=this.getAppendedFrag(v.start,fe.MAIN)
if(null===t)return
if(E||(E=!!t.gap||!!T&&0===c.len),T&&!E||E&&l.nextStart&&l.nextStart<t.end)return}this.loadFragment(v,n,y)}getMaxBufferLength(t){const e=super.getMaxBufferLength()
return t?Math.min(Math.max(e,t),this.config.maxMaxBufferLength):e}onMediaDetaching(){this.videoBuffer=null,this.bufferFlushed=this.flushing=!1,super.onMediaDetaching()}onAudioTracksUpdated(t,{audioTracks:e}){this.resetTransmuxer(),this.levels=e.map((t=>new Me(t)))}onAudioTrackSwitching(t,e){const s=!!e.url
this.trackId=e.id
const{fragCurrent:i}=this
i&&(i.abortRequests(),this.removeUnbufferedFrags(i.start)),this.resetLoadingState(),s?this.setInterval(100):this.resetTransmuxer(),s?(this.switchingTrack=e,this.state=Bs,this.flushAudioIfNeeded(e)):(this.switchingTrack=null,this.bufferedTrack=e,this.state=Us),this.tick()}onManifestLoading(){this.fragmentTracker.removeAllFragments(),this.startPosition=this.lastCurrentTime=0,this.bufferFlushed=this.flushing=!1,this.levels=this.mainDetails=this.waitingData=this.bufferedTrack=this.cachedTrackLoadedData=this.switchingTrack=null,this.startFragRequested=!1,this.trackId=this.videoTrackCC=this.waitingVideoCC=-1}onLevelLoaded(t,e){this.mainDetails=e.details,null!==this.cachedTrackLoadedData&&(this.hls.trigger(p.AUDIO_TRACK_LOADED,this.cachedTrackLoadedData),this.cachedTrackLoadedData=null)}onAudioTrackLoaded(t,e){var s
if(null==this.mainDetails)return void(this.cachedTrackLoadedData=e)
const{levels:i}=this,{details:r,id:n}=e
if(!i)return void this.warn(`Audio tracks were reset while loading level ${n}`)
this.log(`Audio track ${n} loaded [${r.startSN},${r.endSN}]${r.lastPartSn?`[part-${r.lastPartSn}-${r.lastPartIndex}]`:""},duration:${r.totalduration}`)
const a=i[n]
let o=0
if(r.live||null!=(s=a.details)&&s.live){this.checkLiveUpdate(r)
const t=this.mainDetails
if(r.deltaUpdateFailed||!t)return
var l
!a.details&&r.hasProgramDateTime&&t.hasProgramDateTime?(Is(r,t),o=r.fragments[0].start):o=this.alignPlaylists(r,a.details,null==(l=this.levelLastLoaded)?void 0:l.details)}a.details=r,this.levelLastLoaded=a,this.startFragRequested||!this.mainDetails&&r.live||this.setStartPosition(this.mainDetails||r,o),this.state!==Hs||this.waitForCdnTuneIn(r)||(this.state=Bs),this.tick()}_handleFragmentLoadProgress(t){var e
const{frag:s,part:i,payload:r}=t,{config:n,trackId:a,levels:o}=this
if(!o)return void this.warn(`Audio tracks were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`)
const l=o[a]
if(!l)return void this.warn("Audio track is undefined on fragment load progress")
const h=l.details
if(!h)return this.warn("Audio track details undefined on fragment load progress"),void this.removeUnbufferedFrags(s.start)
const d=n.defaultAudioCodec||l.audioCodec||"mp4a.40.2"
let c=this.transmuxer
c||(c=this.transmuxer=new ir(this.hls,fe.AUDIO,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this)))
const u=this.initPTS[s.cc],f=null==(e=s.initSegment)?void 0:e.data
if(void 0!==u){const t=!1,e=i?i.index:-1,n=-1!==e,a=new Rs(s.level,s.sn,s.stats.chunkCount,r.byteLength,e,n)
c.push(r,f,d,"",s,i,h.totalduration,t,a,u)}else{this.log(`Unknown video PTS for cc ${s.cc}, waiting for video PTS before demuxing audio frag ${s.sn} of [${h.startSN} ,${h.endSN}],track ${a}`)
const{cache:t}=this.waitingData=this.waitingData||{frag:s,part:i,cache:new Qs,complete:!1}
t.push(new Uint8Array(r)),this.waitingVideoCC=this.videoTrackCC,this.state=qs}}_handleFragmentLoadComplete(t){this.waitingData?this.waitingData.complete=!0:super._handleFragmentLoadComplete(t)}onBufferReset(){this.mediaBuffer=this.videoBuffer=null,this.loadedmetadata=!1}onBufferCreated(t,e){const s=e.tracks.audio
s&&(this.mediaBuffer=s.buffer||null),e.tracks.video&&(this.videoBuffer=e.tracks.video.buffer||null)}onFragBuffered(t,e){const{frag:s,part:i}=e
if(s.type===fe.AUDIO)if(this.fragContextChanged(s))this.warn(`Fragment ${s.sn}${i?" p: "+i.index:""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}, audioSwitch: ${this.switchingTrack?this.switchingTrack.name:"false"}`)
else{if("initSegment"!==s.sn){this.fragPrevious=s
const t=this.switchingTrack
t&&(this.bufferedTrack=t,this.switchingTrack=null,this.hls.trigger(p.AUDIO_TRACK_SWITCHED,c({},t)))}this.fragBufferedComplete(s,i)}else if(!this.loadedmetadata&&s.type===fe.MAIN){const t=this.videoBuffer||this.media
t&&Ls.getBuffered(t).length&&(this.loadedmetadata=!0)}}onError(t,e){var s
if(e.fatal)this.state=js
else switch(e.details){case v.FRAG_GAP:case v.FRAG_PARSING_ERROR:case v.FRAG_DECRYPT_ERROR:case v.FRAG_LOAD_ERROR:case v.FRAG_LOAD_TIMEOUT:case v.KEY_LOAD_ERROR:case v.KEY_LOAD_TIMEOUT:this.onFragmentOrKeyLoadError(fe.AUDIO,e)
break
case v.AUDIO_TRACK_LOAD_ERROR:case v.AUDIO_TRACK_LOAD_TIMEOUT:case v.LEVEL_PARSING_ERROR:e.levelRetry||this.state!==Hs||(null==(s=e.context)?void 0:s.type)!==ue.AUDIO_TRACK||(this.state=Bs)
break
case v.BUFFER_APPEND_ERROR:case v.BUFFER_FULL_ERROR:if(!e.parent||"audio"!==e.parent)return
if(e.details===v.BUFFER_APPEND_ERROR)return void this.resetLoadingState()
this.reduceLengthAndFlushBuffer(e)&&(this.bufferedTrack=null,super.flushMainBuffer(0,Number.POSITIVE_INFINITY,"audio"))
break
case v.INTERNAL_EXCEPTION:this.recoverWorkerError(e)}}onBufferFlushing(t,{type:e}){e!==C.VIDEO&&(this.flushing=!0)}onBufferFlushed(t,{type:e}){if(e!==C.VIDEO){this.flushing=!1,this.bufferFlushed=!0,this.state===Ws&&(this.state=Bs)
const t=this.mediaBuffer||this.media
t&&(this.afterBufferFlushed(t,e,fe.AUDIO),this.tick())}}_handleTransmuxComplete(t){var e
const s="audio",{hls:i}=this,{remuxResult:r,chunkMeta:n}=t,a=this.getCurrentContext(n)
if(!a)return void this.resetWhenMissingContext(n)
const{frag:o,part:l,level:h}=a,{details:d}=h,{audio:c,text:f,id3:g,initSegment:m}=r
if(!this.fragContextChanged(o)&&d){if(this.state=Vs,this.switchingTrack&&c&&this.completeAudioSwitch(this.switchingTrack),null!=m&&m.tracks){const t=o.initSegment||o
this._bufferInitSegment(h,m.tracks,t,n),i.trigger(p.FRAG_PARSING_INIT_SEGMENT,{frag:t,id:s,tracks:m.tracks})}if(c){const{startPTS:t,endPTS:e,startDTS:s,endDTS:i}=c
l&&(l.elementaryStreams[C.AUDIO]={startPTS:t,endPTS:e,startDTS:s,endDTS:i}),o.setElementaryStreamInfo(C.AUDIO,t,e,s,i),this.bufferFragmentData(c,o,l,n)}if(null!=g&&null!=(e=g.samples)&&e.length){const t=u({id:s,frag:o,details:d},g)
i.trigger(p.FRAG_PARSING_METADATA,t)}if(f){const t=u({id:s,frag:o,details:d},f)
i.trigger(p.FRAG_PARSING_USERDATA,t)}}else this.fragmentTracker.removeFragment(o)}_bufferInitSegment(t,e,s,i){if(this.state!==Vs)return
e.video&&delete e.video
const r=e.audio
if(!r)return
r.id="audio"
const n=t.audioCodec
this.log(`Init audio buffer, container:${r.container}, codecs[level/parsed]=[${n}/${r.codec}]`),n&&1===n.split(",").length&&(r.levelCodec=n),this.hls.trigger(p.BUFFER_CODECS,e)
const a=r.initSegment
if(null!=a&&a.byteLength){const t={type:"audio",frag:s,part:null,chunkMeta:i,parent:s.type,data:a}
this.hls.trigger(p.BUFFER_APPENDING,t)}this.tickImmediate()}loadFragment(t,e,s){const i=this.fragmentTracker.getState(t)
var r
if(this.fragCurrent=t,this.switchingTrack||i===ms||i===ys)if("initSegment"===t.sn)this._loadInitSegment(t,e)
else if(null!=(r=e.details)&&r.live&&!this.initPTS[t.cc]){this.log(`Waiting for video PTS in continuity counter ${t.cc} of live stream before loading audio fragment ${t.sn} of level ${this.trackId}`),this.state=qs
const s=this.mainDetails
s&&s.fragments[0].start!==e.details.fragments[0].start&&Is(e.details,s)}else this.startFragRequested=!0,super.loadFragment(t,e,s)
else this.clearTrackerIfNeeded(t)}flushAudioIfNeeded(t){const{media:e,bufferedTrack:s}=this,i=null==s?void 0:s.attrs,r=t.attrs
e&&i&&(i.CHANNELS!==r.CHANNELS||s.name!==t.name||s.lang!==t.lang)&&(this.log("Switching audio track : flushing all audio"),super.flushMainBuffer(0,Number.POSITIVE_INFINITY,"audio"),this.bufferedTrack=null)}completeAudioSwitch(t){const{hls:e}=this
this.flushAudioIfNeeded(t),this.bufferedTrack=t,this.switchingTrack=null,e.trigger(p.AUDIO_TRACK_SWITCHED,c({},t))}}class lr extends es{constructor(t){super(t,"[audio-track-controller]"),this.tracks=[],this.groupIds=null,this.tracksInGroup=[],this.trackId=-1,this.currentTrack=null,this.selectDefaultTrack=!0,this.registerListeners()}registerListeners(){const{hls:t}=this
t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.MANIFEST_PARSED,this.onManifestParsed,this),t.on(p.LEVEL_LOADING,this.onLevelLoading,this),t.on(p.LEVEL_SWITCHING,this.onLevelSwitching,this),t.on(p.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.on(p.ERROR,this.onError,this)}unregisterListeners(){const{hls:t}=this
t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.MANIFEST_PARSED,this.onManifestParsed,this),t.off(p.LEVEL_LOADING,this.onLevelLoading,this),t.off(p.LEVEL_SWITCHING,this.onLevelSwitching,this),t.off(p.AUDIO_TRACK_LOADED,this.onAudioTrackLoaded,this),t.off(p.ERROR,this.onError,this)}destroy(){this.unregisterListeners(),this.tracks.length=0,this.tracksInGroup.length=0,this.currentTrack=null,super.destroy()}onManifestLoading(){this.tracks=[],this.tracksInGroup=[],this.groupIds=null,this.currentTrack=null,this.trackId=-1,this.selectDefaultTrack=!0}onManifestParsed(t,e){this.tracks=e.audioTracks||[]}onAudioTrackLoaded(t,e){const{id:s,groupId:i,details:r}=e,n=this.tracksInGroup[s]
if(!n||n.groupId!==i)return void this.warn(`Audio track with id:${s} and group:${i} not found in active group ${null==n?void 0:n.groupId}`)
const a=n.details
n.details=e.details,this.log(`Audio track ${s} "${n.name}" lang:${n.lang} group:${i} loaded [${r.startSN}-${r.endSN}]`),s===this.trackId&&this.playlistLoaded(s,e,a)}onLevelLoading(t,e){this.switchLevel(e.level)}onLevelSwitching(t,e){this.switchLevel(e.level)}switchLevel(t){const e=this.hls.levels[t]
if(!e)return
const s=e.audioGroups||null,i=this.groupIds
let r=this.currentTrack
if(!s||(null==i?void 0:i.length)!==(null==s?void 0:s.length)||null!=s&&s.some((t=>-1===(null==i?void 0:i.indexOf(t))))){this.groupIds=s,this.trackId=-1,this.currentTrack=null
const t=this.tracks.filter((t=>!s||-1!==s.indexOf(t.groupId)))
if(t.length)this.selectDefaultTrack&&!t.some((t=>t.default))&&(this.selectDefaultTrack=!1),t.forEach(((t,e)=>{t.id=e}))
else if(!r&&!this.tracksInGroup.length)return
this.tracksInGroup=t
const e=this.hls.config.audioPreference
if(!r&&e){const s=hs(e,t,cs)
if(s>-1)r=t[s]
else{const t=hs(e,this.tracks)
r=this.tracks[t]}}let i=this.findTrackId(r);-1===i&&r&&(i=this.findTrackId(null))
const a={audioTracks:t}
this.log(`Updating audio tracks, ${t.length} track(s) found in group(s): ${null==s?void 0:s.join(",")}`),this.hls.trigger(p.AUDIO_TRACKS_UPDATED,a)
const o=this.trackId
if(-1!==i&&-1===o)this.setAudioTrack(i)
else if(t.length&&-1===o){var n
const e=new Error(`No audio track selected for current audio group-ID(s): ${null==(n=this.groupIds)?void 0:n.join(",")} track count: ${t.length}`)
this.warn(e.message),this.hls.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.AUDIO_TRACK_LOAD_ERROR,fatal:!0,error:e})}}else this.shouldReloadPlaylist(r)&&this.setAudioTrack(this.trackId)}onError(t,e){!e.fatal&&e.context&&(e.context.type!==ue.AUDIO_TRACK||e.context.id!==this.trackId||this.groupIds&&-1===this.groupIds.indexOf(e.context.groupId)||(this.requestScheduled=-1,this.checkRetry(e)))}get allAudioTracks(){return this.tracks}get audioTracks(){return this.tracksInGroup}get audioTrack(){return this.trackId}set audioTrack(t){this.selectDefaultTrack=!1,this.setAudioTrack(t)}setAudioOption(t){const e=this.hls
if(e.config.audioPreference=t,t){const s=this.allAudioTracks
if(this.selectDefaultTrack=!1,s.length){const i=this.currentTrack
if(i&&ds(t,i,cs))return i
const r=hs(t,this.tracksInGroup,cs)
if(r>-1){const t=this.tracksInGroup[r]
return this.setAudioTrack(r),t}if(i){let i=e.loadLevel;-1===i&&(i=e.firstAutoLevel)
const r=function(t,e,s,i,r){const n=e[i],a=e.reduce(((t,e,s)=>{const i=e.uri
return(t[i]||(t[i]=[])).push(s),t}),{})[n.uri]
a.length>1&&(i=Math.max.apply(Math,a))
const o=n.videoRange,l=n.frameRate,h=n.codecSet.substring(0,4),d=us(e,i,(e=>{if(e.videoRange!==o||e.frameRate!==l||e.codecSet.substring(0,4)!==h)return!1
const i=e.audioGroups,n=s.filter((t=>!i||-1!==i.indexOf(t.groupId)))
return hs(t,n,r)>-1}))
return d>-1?d:us(e,i,(e=>{const i=e.audioGroups,n=s.filter((t=>!i||-1!==i.indexOf(t.groupId)))
return hs(t,n,r)>-1}))}(t,e.levels,s,i,cs)
if(-1===r)return null
e.nextLoadLevel=r}if(t.channels||t.audioCodec){const e=hs(t,s)
if(e>-1)return s[e]}}}return null}setAudioTrack(t){const e=this.tracksInGroup
if(t<0||t>=e.length)return void this.warn(`Invalid audio track id: ${t}`)
this.clearTimer(),this.selectDefaultTrack=!1
const s=this.currentTrack,i=e[t],r=i.details&&!i.details.live
if(t===this.trackId&&i===s&&r)return
if(this.log(`Switching to audio-track ${t} "${i.name}" lang:${i.lang} group:${i.groupId} channels:${i.channels}`),this.trackId=t,this.currentTrack=i,this.hls.trigger(p.AUDIO_TRACK_SWITCHING,c({},i)),r)return
const n=this.switchParams(i.url,null==s?void 0:s.details,i.details)
this.loadPlaylist(n)}findTrackId(t){const e=this.tracksInGroup
for(let s=0;s<e.length;s++){const i=e[s]
if((!this.selectDefaultTrack||i.default)&&(!t||ds(t,i,cs)))return s}if(t){const{name:s,lang:i,assocLang:r,characteristics:n,audioCodec:a,channels:o}=t
for(let t=0;t<e.length;t++)if(ds({name:s,lang:i,assocLang:r,characteristics:n,audioCodec:a,channels:o},e[t],cs))return t
for(let l=0;l<e.length;l++){const s=e[l]
if(nr(t.attrs,s.attrs,["LANGUAGE","ASSOC-LANGUAGE","CHARACTERISTICS"]))return l}for(let l=0;l<e.length;l++){const s=e[l]
if(nr(t.attrs,s.attrs,["LANGUAGE"]))return l}}return-1}loadPlaylist(t){const e=this.currentTrack
if(this.shouldLoadPlaylist(e)&&e){super.loadPlaylist()
const s=e.id,i=e.groupId
let r=e.url
if(t)try{r=t.addDirectives(r)}catch(t){this.warn(`Could not construct new URL with HLS Delivery Directives: ${t}`)}this.log(`loading audio-track playlist ${s} "${e.name}" lang:${e.lang} group:${i}`),this.clearTimer(),this.hls.trigger(p.AUDIO_TRACK_LOADING,{url:r,id:s,groupId:i,deliveryDirectives:t||null})}}}class hr extends zs{constructor(t,e,s){super(t,e,s,"[subtitle-stream-controller]",fe.SUBTITLE),this.currentTrackId=-1,this.tracksBuffered=[],this.mainDetails=null,this._registerListeners()}onHandlerDestroying(){this._unregisterListeners(),super.onHandlerDestroying(),this.mainDetails=null}_registerListeners(){const{hls:t}=this
t.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.LEVEL_LOADED,this.onLevelLoaded,this),t.on(p.ERROR,this.onError,this),t.on(p.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.on(p.SUBTITLE_TRACK_SWITCH,this.onSubtitleTrackSwitch,this),t.on(p.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.on(p.SUBTITLE_FRAG_PROCESSED,this.onSubtitleFragProcessed,this),t.on(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.on(p.FRAG_BUFFERED,this.onFragBuffered,this)}_unregisterListeners(){const{hls:t}=this
t.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.LEVEL_LOADED,this.onLevelLoaded,this),t.off(p.ERROR,this.onError,this),t.off(p.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.off(p.SUBTITLE_TRACK_SWITCH,this.onSubtitleTrackSwitch,this),t.off(p.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.off(p.SUBTITLE_FRAG_PROCESSED,this.onSubtitleFragProcessed,this),t.off(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.off(p.FRAG_BUFFERED,this.onFragBuffered,this)}startLoad(t){this.stopLoad(),this.state=Bs,this.setInterval(500),this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}onManifestLoading(){this.mainDetails=null,this.fragmentTracker.removeAllFragments()}onMediaDetaching(){this.tracksBuffered=[],super.onMediaDetaching()}onLevelLoaded(t,e){this.mainDetails=e.details}onSubtitleFragProcessed(t,e){const{frag:s,success:i}=e
if(this.fragPrevious=s,this.state=Bs,!i)return
const r=this.tracksBuffered[this.currentTrackId]
if(!r)return
let n
const a=s.start
for(let l=0;l<r.length;l++)if(a>=r[l].start&&a<=r[l].end){n=r[l]
break}const o=s.start+s.duration
n?n.end=o:(n={start:a,end:o},r.push(n)),this.fragmentTracker.fragBuffered(s),this.fragBufferedComplete(s,null)}onBufferFlushing(t,e){const{startOffset:s,endOffset:i}=e
if(0===s&&i!==Number.POSITIVE_INFINITY){const t=i-1
if(t<=0)return
e.endOffsetSubtitles=Math.max(0,t),this.tracksBuffered.forEach((e=>{for(let s=0;s<e.length;)if(e[s].end<=t)e.shift()
else{if(!(e[s].start<t))break
e[s].start=t,s++}})),this.fragmentTracker.removeFragmentsInRange(s,t,fe.SUBTITLE)}}onFragBuffered(t,e){var s
this.loadedmetadata||e.frag.type!==fe.MAIN||null!=(s=this.media)&&s.buffered.length&&(this.loadedmetadata=!0)}onError(t,e){const s=e.frag;(null==s?void 0:s.type)===fe.SUBTITLE&&(e.details===v.FRAG_GAP&&this.fragmentTracker.fragBuffered(s,!0),this.fragCurrent&&this.fragCurrent.abortRequests(),this.state!==Us&&(this.state=Bs))}onSubtitleTracksUpdated(t,{subtitleTracks:e}){this.levels&&rr(this.levels,e)?this.levels=e.map((t=>new Me(t))):(this.tracksBuffered=[],this.levels=e.map((t=>{const e=new Me(t)
return this.tracksBuffered[e.id]=[],e})),this.fragmentTracker.removeFragmentsInRange(0,Number.POSITIVE_INFINITY,fe.SUBTITLE),this.fragPrevious=null,this.mediaBuffer=null)}onSubtitleTrackSwitch(t,e){var s
if(this.currentTrackId=e.id,null==(s=this.levels)||!s.length||-1===this.currentTrackId)return void this.clearInterval()
const i=this.levels[this.currentTrackId]
null!=i&&i.details?this.mediaBuffer=this.mediaBufferTimeRanges:this.mediaBuffer=null,i&&this.setInterval(500)}onSubtitleTrackLoaded(t,e){var s
const{currentTrackId:i,levels:r}=this,{details:n,id:a}=e
if(!r)return void this.warn(`Subtitle tracks were reset while loading level ${a}`)
const o=r[a]
if(a>=r.length||!o)return
this.log(`Subtitle track ${a} loaded [${n.startSN},${n.endSN}]${n.lastPartSn?`[part-${n.lastPartSn}-${n.lastPartIndex}]`:""},duration:${n.totalduration}`),this.mediaBuffer=this.mediaBufferTimeRanges
let l=0
if(n.live||null!=(s=o.details)&&s.live){const t=this.mainDetails
if(n.deltaUpdateFailed||!t)return
const e=t.fragments[0]
var h
o.details?(l=this.alignPlaylists(n,o.details,null==(h=this.levelLastLoaded)?void 0:h.details),0===l&&e&&(l=e.start,Be(n,l))):n.hasProgramDateTime&&t.hasProgramDateTime?(Is(n,t),l=n.fragments[0].start):e&&(l=e.start,Be(n,l))}o.details=n,this.levelLastLoaded=o,a===i&&(this.startFragRequested||!this.mainDetails&&n.live||this.setStartPosition(this.mainDetails||n,l),this.tick(),n.live&&!this.fragCurrent&&this.media&&this.state===Bs)&&(Xe(null,n.fragments,this.media.currentTime,0)||(this.warn("Subtitle playlist not aligned with playback"),o.details=void 0))}_handleFragmentLoadComplete(t){const{frag:e,payload:s}=t,i=e.decryptdata,r=this.hls
if(!this.fragContextChanged(e)&&s&&s.byteLength>0&&null!=i&&i.key&&i.iv&&"AES-128"===i.method){const t=performance.now()
this.decrypter.decrypt(new Uint8Array(s),i.key.buffer,i.iv.buffer).catch((t=>{throw r.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.FRAG_DECRYPT_ERROR,fatal:!1,error:t,reason:t.message,frag:e}),t})).then((s=>{const i=performance.now()
r.trigger(p.FRAG_DECRYPTED,{frag:e,payload:s,stats:{tstart:t,tdecrypt:i}})})).catch((t=>{this.warn(`${t.name}: ${t.message}`),this.state=Bs}))}}doTick(){if(this.media){if(this.state===Bs){const{currentTrackId:t,levels:e}=this,s=null==e?void 0:e[t]
if(!s||!e.length||!s.details)return
const{config:i}=this,r=this.getLoadPosition(),n=Ls.bufferedInfo(this.tracksBuffered[this.currentTrackId]||[],r,i.maxBufferHole),{end:a,len:o}=n,l=this.getFwdBufferInfo(this.media,fe.MAIN),h=s.details
if(o>this.getMaxBufferLength(null==l?void 0:l.len)+h.levelTargetDuration)return
const d=h.fragments,c=d.length,u=h.edge
let f=null
const g=this.fragPrevious
if(a<u){const t=i.maxFragLookUpTolerance,e=a>u-t?0:t
f=Xe(g,d,Math.max(d[0].start,a),e),!f&&g&&g.start<d[0].start&&(f=d[0])}else f=d[c-1]
if(!f)return
if(f=this.mapToInitFragWhenRequired(f),"initSegment"!==f.sn){const t=d[f.sn-h.startSN-1]
t&&t.cc===f.cc&&this.fragmentTracker.getState(t)===ms&&(f=t)}this.fragmentTracker.getState(f)===ms&&this.loadFragment(f,s,a)}}else this.state=Bs}getMaxBufferLength(t){const e=super.getMaxBufferLength()
return t?Math.max(e,t):e}loadFragment(t,e,s){this.fragCurrent=t,"initSegment"===t.sn?this._loadInitSegment(t,e):(this.startFragRequested=!0,super.loadFragment(t,e,s))}get mediaBufferTimeRanges(){return new dr(this.tracksBuffered[this.currentTrackId]||[])}}class dr{constructor(t){this.buffered=void 0
const e=(e,s,i)=>{if((s>>>=0)>i-1)throw new DOMException(`Failed to execute '${e}' on 'TimeRanges': The index provided (${s}) is greater than the maximum bound (${i})`)
return t[s][e]}
this.buffered={get length(){return t.length},end:s=>e("end",s,t.length),start:s=>e("start",s,t.length)}}}class cr extends es{constructor(t){super(t,"[subtitle-track-controller]"),this.media=null,this.tracks=[],this.groupIds=null,this.tracksInGroup=[],this.trackId=-1,this.currentTrack=null,this.selectDefaultTrack=!0,this.queuedDefaultTrack=-1,this.asyncPollTrackChange=()=>this.pollTrackChange(0),this.useTextTrackPolling=!1,this.subtitlePollingInterval=-1,this._subtitleDisplay=!0,this.onTextTracksChanged=()=>{if(this.useTextTrackPolling||self.clearInterval(this.subtitlePollingInterval),!this.media||!this.hls.config.renderTextTracksNatively)return
let t=null
const e=Se(this.media.textTracks)
for(let i=0;i<e.length;i++)if("hidden"===e[i].mode)t=e[i]
else if("showing"===e[i].mode){t=e[i]
break}const s=this.findTrackForTextTrack(t)
this.subtitleTrack!==s&&this.setSubtitleTrack(s)},this.registerListeners()}destroy(){this.unregisterListeners(),this.tracks.length=0,this.tracksInGroup.length=0,this.currentTrack=null,this.onTextTracksChanged=this.asyncPollTrackChange=null,super.destroy()}get subtitleDisplay(){return this._subtitleDisplay}set subtitleDisplay(t){this._subtitleDisplay=t,this.trackId>-1&&this.toggleTrackModes()}registerListeners(){const{hls:t}=this
t.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.MANIFEST_PARSED,this.onManifestParsed,this),t.on(p.LEVEL_LOADING,this.onLevelLoading,this),t.on(p.LEVEL_SWITCHING,this.onLevelSwitching,this),t.on(p.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.on(p.ERROR,this.onError,this)}unregisterListeners(){const{hls:t}=this
t.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.MANIFEST_PARSED,this.onManifestParsed,this),t.off(p.LEVEL_LOADING,this.onLevelLoading,this),t.off(p.LEVEL_SWITCHING,this.onLevelSwitching,this),t.off(p.SUBTITLE_TRACK_LOADED,this.onSubtitleTrackLoaded,this),t.off(p.ERROR,this.onError,this)}onMediaAttached(t,e){this.media=e.media,this.media&&(this.queuedDefaultTrack>-1&&(this.subtitleTrack=this.queuedDefaultTrack,this.queuedDefaultTrack=-1),this.useTextTrackPolling=!(this.media.textTracks&&"onchange"in this.media.textTracks),this.useTextTrackPolling?this.pollTrackChange(500):this.media.textTracks.addEventListener("change",this.asyncPollTrackChange))}pollTrackChange(t){self.clearInterval(this.subtitlePollingInterval),this.subtitlePollingInterval=self.setInterval(this.onTextTracksChanged,t)}onMediaDetaching(){this.media&&(self.clearInterval(this.subtitlePollingInterval),this.useTextTrackPolling||this.media.textTracks.removeEventListener("change",this.asyncPollTrackChange),this.trackId>-1&&(this.queuedDefaultTrack=this.trackId),Se(this.media.textTracks).forEach((t=>{Ee(t)})),this.subtitleTrack=-1,this.media=null)}onManifestLoading(){this.tracks=[],this.groupIds=null,this.tracksInGroup=[],this.trackId=-1,this.currentTrack=null,this.selectDefaultTrack=!0}onManifestParsed(t,e){this.tracks=e.subtitleTracks}onSubtitleTrackLoaded(t,e){const{id:s,groupId:i,details:r}=e,n=this.tracksInGroup[s]
if(!n||n.groupId!==i)return void this.warn(`Subtitle track with id:${s} and group:${i} not found in active group ${null==n?void 0:n.groupId}`)
const a=n.details
n.details=e.details,this.log(`Subtitle track ${s} "${n.name}" lang:${n.lang} group:${i} loaded [${r.startSN}-${r.endSN}]`),s===this.trackId&&this.playlistLoaded(s,e,a)}onLevelLoading(t,e){this.switchLevel(e.level)}onLevelSwitching(t,e){this.switchLevel(e.level)}switchLevel(t){const e=this.hls.levels[t]
if(!e)return
const s=e.subtitleGroups||null,i=this.groupIds
let r=this.currentTrack
if(!s||(null==i?void 0:i.length)!==(null==s?void 0:s.length)||null!=s&&s.some((t=>-1===(null==i?void 0:i.indexOf(t))))){this.groupIds=s,this.trackId=-1,this.currentTrack=null
const t=this.tracks.filter((t=>!s||-1!==s.indexOf(t.groupId)))
if(t.length)this.selectDefaultTrack&&!t.some((t=>t.default))&&(this.selectDefaultTrack=!1),t.forEach(((t,e)=>{t.id=e}))
else if(!r&&!this.tracksInGroup.length)return
this.tracksInGroup=t
const e=this.hls.config.subtitlePreference
if(!r&&e){this.selectDefaultTrack=!1
const s=hs(e,t)
if(s>-1)r=t[s]
else{const t=hs(e,this.tracks)
r=this.tracks[t]}}let i=this.findTrackId(r);-1===i&&r&&(i=this.findTrackId(null))
const n={subtitleTracks:t}
this.log(`Updating subtitle tracks, ${t.length} track(s) found in "${null==s?void 0:s.join(",")}" group-id`),this.hls.trigger(p.SUBTITLE_TRACKS_UPDATED,n),-1!==i&&-1===this.trackId&&this.setSubtitleTrack(i)}else this.shouldReloadPlaylist(r)&&this.setSubtitleTrack(this.trackId)}findTrackId(t){const e=this.tracksInGroup,s=this.selectDefaultTrack
for(let i=0;i<e.length;i++){const r=e[i]
if((!s||r.default)&&(s||t)&&(!t||ds(r,t)))return i}if(t){for(let s=0;s<e.length;s++){const i=e[s]
if(nr(t.attrs,i.attrs,["LANGUAGE","ASSOC-LANGUAGE","CHARACTERISTICS"]))return s}for(let s=0;s<e.length;s++){const i=e[s]
if(nr(t.attrs,i.attrs,["LANGUAGE"]))return s}}return-1}findTrackForTextTrack(t){if(t){const e=this.tracksInGroup
for(let s=0;s<e.length;s++)if(ar(e[s],t))return s}return-1}onError(t,e){!e.fatal&&e.context&&(e.context.type!==ue.SUBTITLE_TRACK||e.context.id!==this.trackId||this.groupIds&&-1===this.groupIds.indexOf(e.context.groupId)||this.checkRetry(e))}get allSubtitleTracks(){return this.tracks}get subtitleTracks(){return this.tracksInGroup}get subtitleTrack(){return this.trackId}set subtitleTrack(t){this.selectDefaultTrack=!1,this.setSubtitleTrack(t)}setSubtitleOption(t){if(this.hls.config.subtitlePreference=t,t){const e=this.allSubtitleTracks
if(this.selectDefaultTrack=!1,e.length){const s=this.currentTrack
if(s&&ds(t,s))return s
const i=hs(t,this.tracksInGroup)
if(i>-1){const t=this.tracksInGroup[i]
return this.setSubtitleTrack(i),t}if(s)return null
{const s=hs(t,e)
if(s>-1)return e[s]}}}return null}loadPlaylist(t){super.loadPlaylist()
const e=this.currentTrack
if(this.shouldLoadPlaylist(e)&&e){const s=e.id,i=e.groupId
let r=e.url
if(t)try{r=t.addDirectives(r)}catch(t){this.warn(`Could not construct new URL with HLS Delivery Directives: ${t}`)}this.log(`Loading subtitle playlist for id ${s}`),this.hls.trigger(p.SUBTITLE_TRACK_LOADING,{url:r,id:s,groupId:i,deliveryDirectives:t||null})}}toggleTrackModes(){const{media:t}=this
if(!t)return
const e=Se(t.textTracks),s=this.currentTrack
let i
if(s&&(i=e.filter((t=>ar(s,t)))[0],i||this.warn(`Unable to find subtitle TextTrack with name "${s.name}" and language "${s.lang}"`)),[].slice.call(e).forEach((t=>{"disabled"!==t.mode&&t!==i&&(t.mode="disabled")})),i){const t=this.subtitleDisplay?"showing":"hidden"
i.mode!==t&&(i.mode=t)}}setSubtitleTrack(t){const e=this.tracksInGroup
if(!this.media)return void(this.queuedDefaultTrack=t)
if(t<-1||t>=e.length||!f(t))return void this.warn(`Invalid subtitle track id: ${t}`)
this.clearTimer(),this.selectDefaultTrack=!1
const s=this.currentTrack,i=e[t]||null
if(this.trackId=t,this.currentTrack=i,this.toggleTrackModes(),!i)return void this.hls.trigger(p.SUBTITLE_TRACK_SWITCH,{id:t})
const r=!!i.details&&!i.details.live
if(t===this.trackId&&i===s&&r)return
this.log(`Switching to subtitle-track ${t}`+(i?` "${i.name}" lang:${i.lang} group:${i.groupId}`:""))
const{id:n,groupId:a="",name:o,type:l,url:h}=i
this.hls.trigger(p.SUBTITLE_TRACK_SWITCH,{id:n,groupId:a,name:o,type:l,url:h})
const d=this.switchParams(i.url,null==s?void 0:s.details,i.details)
this.loadPlaylist(d)}}class ur{constructor(t){this.buffers=void 0,this.queues={video:[],audio:[],audiovideo:[]},this.buffers=t}append(t,e,s){const i=this.queues[e]
i.push(t),1!==i.length||s||this.executeNext(e)}insertAbort(t,e){this.queues[e].unshift(t),this.executeNext(e)}appendBlocker(t){let e
const s=new Promise((t=>{e=t})),i={execute:e,onStart:()=>{},onComplete:()=>{},onError:()=>{}}
return this.append(i,t),s}executeNext(t){const e=this.queues[t]
if(e.length){const s=e[0]
try{s.execute()}catch(e){A.warn(`[buffer-operation-queue]: Exception executing "${t}" SourceBuffer operation: ${e}`),s.onError(e)
const i=this.buffers[t]
null!=i&&i.updating||this.shiftAndExecuteNext(t)}}}shiftAndExecuteNext(t){this.queues[t].shift(),this.executeNext(t)}current(t){return this.queues[t][0]}}const fr=/(avc[1234]|hvc1|hev1|dvh[1e]|vp09|av01)(?:\.[^.,]+)+/
class gr{constructor(t){this.details=null,this._objectUrl=null,this.operationQueue=void 0,this.listeners=void 0,this.hls=void 0,this.bufferCodecEventsExpected=0,this._bufferCodecEventsTotal=0,this.media=null,this.mediaSource=null,this.lastMpegAudioChunk=null,this.appendSource=void 0,this.appendErrors={audio:0,video:0,audiovideo:0},this.tracks={},this.pendingTracks={},this.sourceBuffer=void 0,this.log=void 0,this.warn=void 0,this.error=void 0,this._onEndStreaming=t=>{this.hls&&this.hls.pauseBuffering()},this._onStartStreaming=t=>{this.hls&&this.hls.resumeBuffering()},this._onMediaSourceOpen=()=>{const{media:t,mediaSource:e}=this
this.log("Media source opened"),t&&(t.removeEventListener("emptied",this._onMediaEmptied),this.updateMediaElementDuration(),this.hls.trigger(p.MEDIA_ATTACHED,{media:t,mediaSource:e})),e&&e.removeEventListener("sourceopen",this._onMediaSourceOpen),this.checkPendingTracks()},this._onMediaSourceClose=()=>{this.log("Media source closed")},this._onMediaSourceEnded=()=>{this.log("Media source ended")},this._onMediaEmptied=()=>{const{mediaSrc:t,_objectUrl:e}=this
t!==e&&A.error(`Media element src was set while attaching MediaSource (${e} > ${t})`)},this.hls=t
const e="[buffer-controller]"
var s
this.appendSource=(s=Kt(t.config.preferManagedMediaSource),"undefined"!=typeof self&&s===self.ManagedMediaSource),this.log=A.log.bind(A,e),this.warn=A.warn.bind(A,e),this.error=A.error.bind(A,e),this._initSourceBuffer(),this.registerListeners()}hasSourceTypes(){return this.getSourceBufferTypes().length>0||Object.keys(this.pendingTracks).length>0}destroy(){this.unregisterListeners(),this.details=null,this.lastMpegAudioChunk=null,this.hls=null}registerListeners(){const{hls:t}=this
t.on(p.MEDIA_ATTACHING,this.onMediaAttaching,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.MANIFEST_PARSED,this.onManifestParsed,this),t.on(p.BUFFER_RESET,this.onBufferReset,this),t.on(p.BUFFER_APPENDING,this.onBufferAppending,this),t.on(p.BUFFER_CODECS,this.onBufferCodecs,this),t.on(p.BUFFER_EOS,this.onBufferEos,this),t.on(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.on(p.LEVEL_UPDATED,this.onLevelUpdated,this),t.on(p.FRAG_PARSED,this.onFragParsed,this),t.on(p.FRAG_CHANGED,this.onFragChanged,this)}unregisterListeners(){const{hls:t}=this
t.off(p.MEDIA_ATTACHING,this.onMediaAttaching,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.MANIFEST_PARSED,this.onManifestParsed,this),t.off(p.BUFFER_RESET,this.onBufferReset,this),t.off(p.BUFFER_APPENDING,this.onBufferAppending,this),t.off(p.BUFFER_CODECS,this.onBufferCodecs,this),t.off(p.BUFFER_EOS,this.onBufferEos,this),t.off(p.BUFFER_FLUSHING,this.onBufferFlushing,this),t.off(p.LEVEL_UPDATED,this.onLevelUpdated,this),t.off(p.FRAG_PARSED,this.onFragParsed,this),t.off(p.FRAG_CHANGED,this.onFragChanged,this)}_initSourceBuffer(){this.sourceBuffer={},this.operationQueue=new ur(this.sourceBuffer),this.listeners={audio:[],video:[],audiovideo:[]},this.appendErrors={audio:0,video:0,audiovideo:0},this.lastMpegAudioChunk=null}onManifestLoading(){this.bufferCodecEventsExpected=this._bufferCodecEventsTotal=0,this.details=null}onManifestParsed(t,e){let s=2;(e.audio&&!e.video||!e.altAudio)&&(s=1),this.bufferCodecEventsExpected=this._bufferCodecEventsTotal=s,this.log(`${this.bufferCodecEventsExpected} bufferCodec event(s) expected`)}onMediaAttaching(t,e){const s=this.media=e.media,i=Kt(this.appendSource)
if(s&&i){var r
const e=this.mediaSource=new i
this.log(`created media source: ${null==(r=e.constructor)?void 0:r.name}`),e.addEventListener("sourceopen",this._onMediaSourceOpen),e.addEventListener("sourceended",this._onMediaSourceEnded),e.addEventListener("sourceclose",this._onMediaSourceClose),this.appendSource&&(e.addEventListener("startstreaming",this._onStartStreaming),e.addEventListener("endstreaming",this._onEndStreaming))
const n=this._objectUrl=self.URL.createObjectURL(e)
if(this.appendSource)try{s.removeAttribute("src")
const t=self.ManagedMediaSource
s.disableRemotePlayback=s.disableRemotePlayback||t&&e instanceof t,mr(s),function(t,e){const s=self.document.createElement("source")
s.type="video/mp4",s.src=e,t.appendChild(s)}(s,n),s.load()}catch(t){s.src=n}else s.src=n
s.addEventListener("emptied",this._onMediaEmptied)}}onMediaDetaching(){const{media:t,mediaSource:e,_objectUrl:s}=this
if(e){if(this.log("media source detaching"),"open"===e.readyState)try{e.endOfStream()}catch(t){this.warn(`onMediaDetaching: ${t.message} while calling endOfStream`)}this.onBufferReset(),e.removeEventListener("sourceopen",this._onMediaSourceOpen),e.removeEventListener("sourceended",this._onMediaSourceEnded),e.removeEventListener("sourceclose",this._onMediaSourceClose),this.appendSource&&(e.removeEventListener("startstreaming",this._onStartStreaming),e.removeEventListener("endstreaming",this._onEndStreaming)),t&&(t.removeEventListener("emptied",this._onMediaEmptied),s&&self.URL.revokeObjectURL(s),this.mediaSrc===s?(t.removeAttribute("src"),this.appendSource&&mr(t),t.load()):this.warn("media|source.src was changed by a third party - skip cleanup")),this.mediaSource=null,this.media=null,this._objectUrl=null,this.bufferCodecEventsExpected=this._bufferCodecEventsTotal,this.pendingTracks={},this.tracks={}}this.hls.trigger(p.MEDIA_DETACHED,void 0)}onBufferReset(){this.getSourceBufferTypes().forEach((t=>{this.resetBuffer(t)})),this._initSourceBuffer()}resetBuffer(t){const e=this.sourceBuffer[t]
try{var s
e&&(this.removeBufferListeners(t),this.sourceBuffer[t]=void 0,null!=(s=this.mediaSource)&&s.sourceBuffers.length&&this.mediaSource.removeSourceBuffer(e))}catch(e){this.warn(`onBufferReset ${t}`,e)}}onBufferCodecs(t,e){const s=this.getSourceBufferTypes().length,i=Object.keys(e)
if(i.forEach((t=>{if(s){const s=this.tracks[t]
if(s&&"function"==typeof s.buffer.changeType){var i
const{id:r,codec:n,levelCodec:a,container:o,metadata:l}=e[t],h=Jt(s.codec,s.levelCodec),d=null==h?void 0:h.replace(fr,"$1")
let c=Jt(n,a)
const u=null==(i=c)?void 0:i.replace(fr,"$1")
if(c&&d!==u){"audio"===t.slice(0,5)&&(c=Qt(c,this.appendSource))
const e=`${o};codecs=${c}`
this.appendChangeType(t,e),this.log(`switching codec ${h} to ${c}`),this.tracks[t]={buffer:s.buffer,codec:n,container:o,levelCodec:a,metadata:l,id:r}}}}else this.pendingTracks[t]=e[t]})),s)return
const r=Math.max(this.bufferCodecEventsExpected-1,0)
this.bufferCodecEventsExpected!==r&&(this.log(`${r} bufferCodec event(s) expected ${i.join(",")}`),this.bufferCodecEventsExpected=r),this.mediaSource&&"open"===this.mediaSource.readyState&&this.checkPendingTracks()}appendChangeType(t,e){const{operationQueue:s}=this,i={execute:()=>{const i=this.sourceBuffer[t]
i&&(this.log(`changing ${t} sourceBuffer type to ${e}`),i.changeType(e)),s.shiftAndExecuteNext(t)},onStart:()=>{},onComplete:()=>{},onError:e=>{this.warn(`Failed to change ${t} SourceBuffer type`,e)}}
s.append(i,t,!!this.pendingTracks[t])}onBufferAppending(t,e){const{hls:s,operationQueue:i,tracks:r}=this,{data:n,type:a,frag:o,part:l,chunkMeta:h}=e,d=h.buffering[a],c=self.performance.now()
d.start=c
const u=o.stats.buffering,f=l?l.stats.buffering:null
0===u.start&&(u.start=c),f&&0===f.start&&(f.start=c)
const g=r.audio
let m=!1
"audio"===a&&"audio/mpeg"===(null==g?void 0:g.container)&&(m=!this.lastMpegAudioChunk||1===h.id||this.lastMpegAudioChunk.sn!==h.sn,this.lastMpegAudioChunk=h)
const E=o.start,T={execute:()=>{if(d.executeStart=self.performance.now(),m){const t=this.sourceBuffer[a]
if(t){const e=E-t.timestampOffset
Math.abs(e)>=.1&&(this.log(`Updating audio SourceBuffer timestampOffset to ${E} (delta: ${e}) sn: ${o.sn})`),t.timestampOffset=E)}}this.appendExecutor(n,a)},onStart:()=>{},onComplete:()=>{const t=self.performance.now()
d.executeEnd=d.end=t,0===u.first&&(u.first=t),f&&0===f.first&&(f.first=t)
const{sourceBuffer:e}=this,s={}
for(const i in e)s[i]=Ls.getBuffered(e[i])
this.appendErrors[a]=0,"audio"===a||"video"===a?this.appendErrors.audiovideo=0:(this.appendErrors.audio=0,this.appendErrors.video=0),this.hls.trigger(p.BUFFER_APPENDED,{type:a,frag:o,part:l,chunkMeta:h,parent:o.type,timeRanges:s})},onError:t=>{const e={type:y.MEDIA_ERROR,parent:o.type,details:v.BUFFER_APPEND_ERROR,sourceBufferName:a,frag:o,part:l,chunkMeta:h,error:t,err:t,fatal:!1}
if(t.code===DOMException.QUOTA_EXCEEDED_ERR)e.details=v.BUFFER_FULL_ERROR
else{const t=++this.appendErrors[a]
e.details=v.BUFFER_APPEND_ERROR,this.warn(`Failed ${t}/${s.config.appendErrorMaxRetry} times to append segment in "${a}" sourceBuffer`),t>=s.config.appendErrorMaxRetry&&(e.fatal=!0)}s.trigger(p.ERROR,e)}}
i.append(T,a,!!this.pendingTracks[a])}onBufferFlushing(t,e){const{operationQueue:s}=this,i=t=>({execute:this.removeExecutor.bind(this,t,e.startOffset,e.endOffset),onStart:()=>{},onComplete:()=>{this.hls.trigger(p.BUFFER_FLUSHED,{type:t})},onError:e=>{this.warn(`Failed to remove from ${t} SourceBuffer`,e)}})
e.type?s.append(i(e.type),e.type):this.getSourceBufferTypes().forEach((t=>{s.append(i(t),t)}))}onFragParsed(t,e){const{frag:s,part:i}=e,r=[],n=i?i.elementaryStreams:s.elementaryStreams
n[C.AUDIOVIDEO]?r.push("audiovideo"):(n[C.AUDIO]&&r.push("audio"),n[C.VIDEO]&&r.push("video")),0===r.length&&this.warn(`Fragments must have at least one ElementaryStreamType set. type: ${s.type} level: ${s.level} sn: ${s.sn}`),this.blockBuffers((()=>{const t=self.performance.now()
s.stats.buffering.end=t,i&&(i.stats.buffering.end=t)
const e=i?i.stats:s.stats
this.hls.trigger(p.FRAG_BUFFERED,{frag:s,part:i,stats:e,id:s.type})}),r)}onFragChanged(t,e){this.trimBuffers()}onBufferEos(t,e){this.getSourceBufferTypes().reduce(((t,s)=>{const i=this.sourceBuffer[s]
return!i||e.type&&e.type!==s||(i.ending=!0,i.ended||(i.ended=!0,this.log(`${s} sourceBuffer now EOS`))),t&&!(i&&!i.ended)}),!0)&&(this.log("Queueing mediaSource.endOfStream()"),this.blockBuffers((()=>{this.getSourceBufferTypes().forEach((t=>{const e=this.sourceBuffer[t]
e&&(e.ending=!1)}))
const{mediaSource:t}=this
t&&"open"===t.readyState?(this.log("Calling mediaSource.endOfStream()"),t.endOfStream()):t&&this.log(`Could not call mediaSource.endOfStream(). mediaSource.readyState: ${t.readyState}`)})))}onLevelUpdated(t,{details:e}){e.fragments.length&&(this.details=e,this.getSourceBufferTypes().length?this.blockBuffers(this.updateMediaElementDuration.bind(this)):this.updateMediaElementDuration())}trimBuffers(){const{hls:t,details:e,media:s}=this
if(!s||null===e)return
if(!this.getSourceBufferTypes().length)return
const i=t.config,r=s.currentTime,n=e.levelTargetDuration,a=e.live&&null!==i.liveBackBufferLength?i.liveBackBufferLength:i.backBufferLength
if(f(a)&&a>0){const t=Math.max(a,n),e=Math.floor(r/n)*n-t
this.flushBackBuffer(r,n,e)}if(f(i.frontBufferFlushThreshold)&&i.frontBufferFlushThreshold>0){const t=Math.max(i.maxBufferLength,i.frontBufferFlushThreshold),e=Math.max(t,n),s=Math.floor(r/n)*n+e
this.flushFrontBuffer(r,n,s)}}flushBackBuffer(t,e,s){const{details:i,sourceBuffer:r}=this
this.getSourceBufferTypes().forEach((n=>{const a=r[n]
if(a){const r=Ls.getBuffered(a)
if(r.length>0&&s>r.start(0)){if(this.hls.trigger(p.BACK_BUFFER_REACHED,{bufferEnd:s}),null!=i&&i.live)this.hls.trigger(p.LIVE_BACK_BUFFER_REACHED,{bufferEnd:s})
else if(a.ended&&r.end(r.length-1)-t<2*e)return void this.log(`Cannot flush ${n} back buffer while SourceBuffer is in ended state`)
this.hls.trigger(p.BUFFER_FLUSHING,{startOffset:0,endOffset:s,type:n})}}}))}flushFrontBuffer(t,e,s){const{sourceBuffer:i}=this
this.getSourceBufferTypes().forEach((r=>{const n=i[r]
if(n){const i=Ls.getBuffered(n),a=i.length
if(a<2)return
const o=i.start(a-1),l=i.end(a-1)
if(s>o||t>=o&&t<=l)return
if(n.ended&&t-l<2*e)return void this.log(`Cannot flush ${r} front buffer while SourceBuffer is in ended state`)
this.hls.trigger(p.BUFFER_FLUSHING,{startOffset:o,endOffset:1/0,type:r})}}))}updateMediaElementDuration(){if(!this.details||!this.media||!this.mediaSource||"open"!==this.mediaSource.readyState)return
const{details:t,hls:e,media:s,mediaSource:i}=this,r=t.fragments[0].start+t.totalduration,n=s.duration,a=f(i.duration)?i.duration:0
t.live&&e.config.liveDurationInfinity?(i.duration=1/0,this.updateSeekableRange(t)):(r>a&&r>n||!f(n))&&(this.log(`Updating Media Source duration to ${r.toFixed(3)}`),i.duration=r)}updateSeekableRange(t){const e=this.mediaSource,s=t.fragments
if(s.length&&t.live&&null!=e&&e.setLiveSeekableRange){const i=Math.max(0,s[0].start),r=Math.max(i,i+t.totalduration)
this.log(`Media Source duration is set to ${e.duration}. Setting seekable range to ${i}-${r}.`),e.setLiveSeekableRange(i,r)}}checkPendingTracks(){const{bufferCodecEventsExpected:t,operationQueue:e,pendingTracks:s}=this,i=Object.keys(s).length
if(i&&(!t||2===i||"audiovideo"in s)){this.createSourceBuffers(s),this.pendingTracks={}
const t=this.getSourceBufferTypes()
if(t.length)this.hls.trigger(p.BUFFER_CREATED,{tracks:this.tracks}),t.forEach((t=>{e.executeNext(t)}))
else{const t=new Error("could not create source buffer for media codec(s)")
this.hls.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.BUFFER_INCOMPATIBLE_CODECS_ERROR,fatal:!0,error:t,reason:t.message})}}}createSourceBuffers(t){const{sourceBuffer:e,mediaSource:s}=this
if(!s)throw Error("createSourceBuffers called when mediaSource was null")
for(const r in t)if(!e[r]){var i
const n=t[r]
if(!n)throw Error(`source buffer exists for track ${r}, however track does not`)
let a=-1===(null==(i=n.levelCodec)?void 0:i.indexOf(","))?n.levelCodec:n.codec
a&&"audio"===r.slice(0,5)&&(a=Qt(a,this.appendSource))
const o=`${n.container};codecs=${a}`
this.log(`creating sourceBuffer(${o})`)
try{const t=e[r]=s.addSourceBuffer(o),i=r
this.addBufferListener(i,"updatestart",this._onSBUpdateStart),this.addBufferListener(i,"updateend",this._onSBUpdateEnd),this.addBufferListener(i,"error",this._onSBUpdateError),this.appendSource&&this.addBufferListener(i,"bufferedchange",((t,e)=>{const s=e.removedRanges
null!=s&&s.length&&this.hls.trigger(p.BUFFER_FLUSHED,{type:r})})),this.tracks[r]={buffer:t,codec:a,container:n.container,levelCodec:n.levelCodec,metadata:n.metadata,id:n.id}}catch(t){this.error(`error while trying to add sourceBuffer: ${t.message}`),this.hls.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.BUFFER_ADD_CODEC_ERROR,fatal:!1,error:t,sourceBufferName:r,mimeType:o})}}}get mediaSrc(){var t,e
const s=(null==(t=this.media)||null==(e=t.querySelector)?void 0:e.call(t,"source"))||this.media
return null==s?void 0:s.src}_onSBUpdateStart(t){const{operationQueue:e}=this
e.current(t).onStart()}_onSBUpdateEnd(t){var e
if("closed"===(null==(e=this.mediaSource)?void 0:e.readyState))return void this.resetBuffer(t)
const{operationQueue:s}=this
s.current(t).onComplete(),s.shiftAndExecuteNext(t)}_onSBUpdateError(t,e){var s
const i=new Error(`${t} SourceBuffer error. MediaSource readyState: ${null==(s=this.mediaSource)?void 0:s.readyState}`)
this.error(`${i}`,e),this.hls.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.BUFFER_APPENDING_ERROR,sourceBufferName:t,error:i,fatal:!1})
const r=this.operationQueue.current(t)
r&&r.onError(i)}removeExecutor(t,e,s){const{media:i,mediaSource:r,operationQueue:n,sourceBuffer:a}=this,o=a[t]
if(!i||!r||!o)return this.warn(`Attempting to remove from the ${t} SourceBuffer, but it does not exist`),void n.shiftAndExecuteNext(t)
const l=f(i.duration)?i.duration:1/0,h=f(r.duration)?r.duration:1/0,d=Math.max(0,e),c=Math.min(s,l,h)
c>d&&(!o.ending||o.ended)?(o.ended=!1,this.log(`Removing [${d},${c}] from the ${t} SourceBuffer`),o.remove(d,c)):n.shiftAndExecuteNext(t)}appendExecutor(t,e){const s=this.sourceBuffer[e]
if(s)s.ended=!1,s.appendBuffer(t)
else if(!this.pendingTracks[e])throw new Error(`Attempting to append to the ${e} SourceBuffer, but it does not exist`)}blockBuffers(t,e=this.getSourceBufferTypes()){if(!e.length)return this.log("Blocking operation requested, but no SourceBuffers exist"),void Promise.resolve().then(t)
const{operationQueue:s}=this,i=e.map((t=>s.appendBlocker(t)))
Promise.all(i).then((()=>{t(),e.forEach((t=>{const e=this.sourceBuffer[t]
null!=e&&e.updating||s.shiftAndExecuteNext(t)}))}))}getSourceBufferTypes(){return Object.keys(this.sourceBuffer)}addBufferListener(t,e,s){const i=this.sourceBuffer[t]
if(!i)return
const r=s.bind(this,t)
this.listeners[t].push({event:e,listener:r}),i.addEventListener(e,r)}removeBufferListeners(t){const e=this.sourceBuffer[t]
e&&this.listeners[t].forEach((t=>{e.removeEventListener(t.event,t.listener)}))}}function mr(t){const e=t.querySelectorAll("source");[].slice.call(e).forEach((e=>{t.removeChild(e)}))}const pr={42:225,92:233,94:237,95:243,96:250,123:231,124:247,125:209,126:241,127:9608,128:174,129:176,130:189,131:191,132:8482,133:162,134:163,135:9834,136:224,137:32,138:232,139:226,140:234,141:238,142:244,143:251,144:193,145:201,146:211,147:218,148:220,149:252,150:8216,151:161,152:42,153:8217,154:9473,155:169,156:8480,157:8226,158:8220,159:8221,160:192,161:194,162:199,163:200,164:202,165:203,166:235,167:206,168:207,169:239,170:212,171:217,172:249,173:219,174:171,175:187,176:195,177:227,178:205,179:204,180:236,181:210,182:242,183:213,184:245,185:123,186:125,187:92,188:94,189:95,190:124,191:8764,192:196,193:228,194:214,195:246,196:223,197:165,198:164,199:9475,200:197,201:229,202:216,203:248,204:9487,205:9491,206:9495,207:9499},yr=t=>String.fromCharCode(pr[t]||t),vr=15,Er=100,Tr={17:1,18:3,21:5,22:7,23:9,16:11,19:12,20:14},Sr={17:2,18:4,21:6,22:8,23:10,19:13,20:15},Ar={25:1,26:3,29:5,30:7,31:9,24:11,27:12,28:14},Lr={25:2,26:4,29:6,30:8,31:10,27:13,28:15},Rr=["white","green","blue","cyan","red","yellow","magenta","black","transparent"]
class br{constructor(){this.time=null,this.verboseLevel=0}log(t,e){if(this.verboseLevel>=t){const s="function"==typeof e?e():e
A.log(`${this.time} [${t}] ${s}`)}}}const Dr=function(t){const e=[]
for(let s=0;s<t.length;s++)e.push(t[s].toString(16))
return e}
class kr{constructor(){this.foreground="white",this.underline=!1,this.italics=!1,this.background="black",this.flash=!1}reset(){this.foreground="white",this.underline=!1,this.italics=!1,this.background="black",this.flash=!1}setStyles(t){const e=["foreground","underline","italics","background","flash"]
for(let s=0;s<e.length;s++){const i=e[s]
t.hasOwnProperty(i)&&(this[i]=t[i])}}isDefault(){return"white"===this.foreground&&!this.underline&&!this.italics&&"black"===this.background&&!this.flash}equals(t){return this.foreground===t.foreground&&this.underline===t.underline&&this.italics===t.italics&&this.background===t.background&&this.flash===t.flash}copy(t){this.foreground=t.foreground,this.underline=t.underline,this.italics=t.italics,this.background=t.background,this.flash=t.flash}toString(){return"color="+this.foreground+", underline="+this.underline+", italics="+this.italics+", background="+this.background+", flash="+this.flash}}class Ir{constructor(){this.uchar=" ",this.penState=new kr}reset(){this.uchar=" ",this.penState.reset()}setChar(t,e){this.uchar=t,this.penState.copy(e)}setPenState(t){this.penState.copy(t)}equals(t){return this.uchar===t.uchar&&this.penState.equals(t.penState)}copy(t){this.uchar=t.uchar,this.penState.copy(t.penState)}isEmpty(){return" "===this.uchar&&this.penState.isDefault()}}class Cr{constructor(t){this.chars=[],this.pos=0,this.currPenState=new kr,this.cueStartTime=null,this.logger=void 0
for(let e=0;e<Er;e++)this.chars.push(new Ir)
this.logger=t}equals(t){for(let e=0;e<Er;e++)if(!this.chars[e].equals(t.chars[e]))return!1
return!0}copy(t){for(let e=0;e<Er;e++)this.chars[e].copy(t.chars[e])}isEmpty(){let t=!0
for(let e=0;e<Er;e++)if(!this.chars[e].isEmpty()){t=!1
break}return t}setCursor(t){this.pos!==t&&(this.pos=t),this.pos<0?(this.logger.log(3,"Negative cursor position "+this.pos),this.pos=0):this.pos>Er&&(this.logger.log(3,"Too large cursor position "+this.pos),this.pos=Er)}moveCursor(t){const e=this.pos+t
if(t>1)for(let s=this.pos+1;s<e+1;s++)this.chars[s].setPenState(this.currPenState)
this.setCursor(e)}backSpace(){this.moveCursor(-1),this.chars[this.pos].setChar(" ",this.currPenState)}insertChar(t){t>=144&&this.backSpace()
const e=yr(t)
this.pos>=Er?this.logger.log(0,(()=>"Cannot insert "+t.toString(16)+" ("+e+") at position "+this.pos+". Skipping it!")):(this.chars[this.pos].setChar(e,this.currPenState),this.moveCursor(1))}clearFromPos(t){let e
for(e=t;e<Er;e++)this.chars[e].reset()}clear(){this.clearFromPos(0),this.pos=0,this.currPenState.reset()}clearToEndOfRow(){this.clearFromPos(this.pos)}getTextString(){const t=[]
let e=!0
for(let s=0;s<Er;s++){const i=this.chars[s].uchar
" "!==i&&(e=!1),t.push(i)}return e?"":t.join("")}setPenStyles(t){this.currPenState.setStyles(t),this.chars[this.pos].setPenState(this.currPenState)}}class wr{constructor(t){this.rows=[],this.currRow=14,this.nrRollUpRows=null,this.lastOutputScreen=null,this.logger=void 0
for(let e=0;e<vr;e++)this.rows.push(new Cr(t))
this.logger=t}reset(){for(let t=0;t<vr;t++)this.rows[t].clear()
this.currRow=14}equals(t){let e=!0
for(let s=0;s<vr;s++)if(!this.rows[s].equals(t.rows[s])){e=!1
break}return e}copy(t){for(let e=0;e<vr;e++)this.rows[e].copy(t.rows[e])}isEmpty(){let t=!0
for(let e=0;e<vr;e++)if(!this.rows[e].isEmpty()){t=!1
break}return t}backSpace(){this.rows[this.currRow].backSpace()}clearToEndOfRow(){this.rows[this.currRow].clearToEndOfRow()}insertChar(t){this.rows[this.currRow].insertChar(t)}setPen(t){this.rows[this.currRow].setPenStyles(t)}moveCursor(t){this.rows[this.currRow].moveCursor(t)}setCursor(t){this.logger.log(2,"setCursor: "+t),this.rows[this.currRow].setCursor(t)}setPAC(t){this.logger.log(2,(()=>"pacData = "+JSON.stringify(t)))
let e=t.row-1
if(this.nrRollUpRows&&e<this.nrRollUpRows-1&&(e=this.nrRollUpRows-1),this.nrRollUpRows&&this.currRow!==e){for(let e=0;e<vr;e++)this.rows[e].clear()
const t=this.currRow+1-this.nrRollUpRows,s=this.lastOutputScreen
if(s){const i=s.rows[t].cueStartTime,r=this.logger.time
if(null!==i&&null!==r&&i<r)for(let n=0;n<this.nrRollUpRows;n++)this.rows[e-this.nrRollUpRows+n+1].copy(s.rows[t+n])}}this.currRow=e
const s=this.rows[this.currRow]
if(null!==t.indent){const e=t.indent,i=Math.max(e-1,0)
s.setCursor(t.indent),t.color=s.chars[i].penState.foreground}const i={foreground:t.color,underline:t.underline,italics:t.italics,background:"black",flash:!1}
this.setPen(i)}setBkgData(t){this.logger.log(2,(()=>"bkgData = "+JSON.stringify(t))),this.backSpace(),this.setPen(t),this.insertChar(32)}setRollUpRows(t){this.nrRollUpRows=t}rollUp(){if(null===this.nrRollUpRows)return void this.logger.log(3,"roll_up but nrRollUpRows not set yet")
this.logger.log(1,(()=>this.getDisplayText()))
const t=this.currRow+1-this.nrRollUpRows,e=this.rows.splice(t,1)[0]
e.clear(),this.rows.splice(this.currRow,0,e),this.logger.log(2,"Rolling up")}getDisplayText(t){t=t||!1
const e=[]
let s="",i=-1
for(let r=0;r<vr;r++){const s=this.rows[r].getTextString()
s&&(i=r+1,t?e.push("Row "+i+": '"+s+"'"):e.push(s.trim()))}return e.length>0&&(s=t?"["+e.join(" | ")+"]":e.join("\n")),s}getTextAndFormat(){return this.rows}}class _r{constructor(t,e,s){this.chNr=void 0,this.outputFilter=void 0,this.mode=void 0,this.verbose=void 0,this.displayedMemory=void 0,this.nonDisplayedMemory=void 0,this.lastOutputScreen=void 0,this.currRollUpRow=void 0,this.writeScreen=void 0,this.cueStartTime=void 0,this.logger=void 0,this.chNr=t,this.outputFilter=e,this.mode=null,this.verbose=0,this.displayedMemory=new wr(s),this.nonDisplayedMemory=new wr(s),this.lastOutputScreen=new wr(s),this.currRollUpRow=this.displayedMemory.rows[14],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null,this.logger=s}reset(){this.mode=null,this.displayedMemory.reset(),this.nonDisplayedMemory.reset(),this.lastOutputScreen.reset(),this.outputFilter.reset(),this.currRollUpRow=this.displayedMemory.rows[14],this.writeScreen=this.displayedMemory,this.mode=null,this.cueStartTime=null}getHandler(){return this.outputFilter}setHandler(t){this.outputFilter=t}setPAC(t){this.writeScreen.setPAC(t)}setBkgData(t){this.writeScreen.setBkgData(t)}setMode(t){t!==this.mode&&(this.mode=t,this.logger.log(2,(()=>"MODE="+t)),"MODE_POP-ON"===this.mode?this.writeScreen=this.nonDisplayedMemory:(this.writeScreen=this.displayedMemory,this.writeScreen.reset()),"MODE_ROLL-UP"!==this.mode&&(this.displayedMemory.nrRollUpRows=null,this.nonDisplayedMemory.nrRollUpRows=null),this.mode=t)}insertChars(t){for(let s=0;s<t.length;s++)this.writeScreen.insertChar(t[s])
const e=this.writeScreen===this.displayedMemory?"DISP":"NON_DISP"
this.logger.log(2,(()=>e+": "+this.writeScreen.getDisplayText(!0))),"MODE_PAINT-ON"!==this.mode&&"MODE_ROLL-UP"!==this.mode||(this.logger.log(1,(()=>"DISPLAYED: "+this.displayedMemory.getDisplayText(!0))),this.outputDataUpdate())}ccRCL(){this.logger.log(2,"RCL - Resume Caption Loading"),this.setMode("MODE_POP-ON")}ccBS(){this.logger.log(2,"BS - BackSpace"),"MODE_TEXT"!==this.mode&&(this.writeScreen.backSpace(),this.writeScreen===this.displayedMemory&&this.outputDataUpdate())}ccAOF(){}ccAON(){}ccDER(){this.logger.log(2,"DER- Delete to End of Row"),this.writeScreen.clearToEndOfRow(),this.outputDataUpdate()}ccRU(t){this.logger.log(2,"RU("+t+") - Roll Up"),this.writeScreen=this.displayedMemory,this.setMode("MODE_ROLL-UP"),this.writeScreen.setRollUpRows(t)}ccFON(){this.logger.log(2,"FON - Flash On"),this.writeScreen.setPen({flash:!0})}ccRDC(){this.logger.log(2,"RDC - Resume Direct Captioning"),this.setMode("MODE_PAINT-ON")}ccTR(){this.logger.log(2,"TR"),this.setMode("MODE_TEXT")}ccRTD(){this.logger.log(2,"RTD"),this.setMode("MODE_TEXT")}ccEDM(){this.logger.log(2,"EDM - Erase Displayed Memory"),this.displayedMemory.reset(),this.outputDataUpdate(!0)}ccCR(){this.logger.log(2,"CR - Carriage Return"),this.writeScreen.rollUp(),this.outputDataUpdate(!0)}ccENM(){this.logger.log(2,"ENM - Erase Non-displayed Memory"),this.nonDisplayedMemory.reset()}ccEOC(){if(this.logger.log(2,"EOC - End Of Caption"),"MODE_POP-ON"===this.mode){const t=this.displayedMemory
this.displayedMemory=this.nonDisplayedMemory,this.nonDisplayedMemory=t,this.writeScreen=this.nonDisplayedMemory,this.logger.log(1,(()=>"DISP: "+this.displayedMemory.getDisplayText()))}this.outputDataUpdate(!0)}ccTO(t){this.logger.log(2,"TO("+t+") - Tab Offset"),this.writeScreen.moveCursor(t)}ccMIDROW(t){const e={flash:!1}
if(e.underline=t%2==1,e.italics=t>=46,e.italics)e.foreground="white"
else{const s=Math.floor(t/2)-16,i=["white","green","blue","cyan","red","yellow","magenta"]
e.foreground=i[s]}this.logger.log(2,"MIDROW: "+JSON.stringify(e)),this.writeScreen.setPen(e)}outputDataUpdate(t=!1){const e=this.logger.time
null!==e&&this.outputFilter&&(null!==this.cueStartTime||this.displayedMemory.isEmpty()?this.displayedMemory.equals(this.lastOutputScreen)||(this.outputFilter.newCue(this.cueStartTime,e,this.lastOutputScreen),t&&this.outputFilter.dispatchCue&&this.outputFilter.dispatchCue(),this.cueStartTime=this.displayedMemory.isEmpty()?null:e):this.cueStartTime=e,this.lastOutputScreen.copy(this.displayedMemory))}cueSplitAtTime(t){this.outputFilter&&(this.displayedMemory.isEmpty()||(this.outputFilter.newCue&&this.outputFilter.newCue(this.cueStartTime,t,this.displayedMemory),this.cueStartTime=t))}}class xr{constructor(t,e,s){this.channels=void 0,this.currentChannel=0,this.cmdHistory={a:null,b:null},this.logger=void 0
const i=this.logger=new br
this.channels=[null,new _r(t,e,i),new _r(t+1,s,i)]}getHandler(t){return this.channels[t].getHandler()}setHandler(t,e){this.channels[t].setHandler(e)}addData(t,e){this.logger.time=t
for(let s=0;s<e.length;s+=2){const t=127&e[s],i=127&e[s+1]
let r=!1,n=null
if(0===t&&0===i)continue
this.logger.log(3,(()=>"["+Dr([e[s],e[s+1]])+"] -> ("+Dr([t,i])+")"))
const a=this.cmdHistory
if(t>=16&&t<=31){if(Mr(t,i,a)){Pr(null,null,a),this.logger.log(3,(()=>"Repeated command ("+Dr([t,i])+") is dropped"))
continue}Pr(t,i,this.cmdHistory),r=this.parseCmd(t,i),r||(r=this.parseMidrow(t,i)),r||(r=this.parsePAC(t,i)),r||(r=this.parseBackgroundAttributes(t,i))}else Pr(null,null,a)
if(!r&&(n=this.parseChars(t,i),n)){const t=this.currentChannel
t&&t>0?this.channels[t].insertChars(n):this.logger.log(2,"No channel found yet. TEXT-MODE?")}r||n||this.logger.log(2,(()=>"Couldn't parse cleaned data "+Dr([t,i])+" orig: "+Dr([e[s],e[s+1]])))}}parseCmd(t,e){if(!((20===t||28===t||21===t||29===t)&&e>=32&&e<=47||(23===t||31===t)&&e>=33&&e<=35))return!1
const s=20===t||21===t||23===t?1:2,i=this.channels[s]
return 20===t||21===t||28===t||29===t?32===e?i.ccRCL():33===e?i.ccBS():34===e?i.ccAOF():35===e?i.ccAON():36===e?i.ccDER():37===e?i.ccRU(2):38===e?i.ccRU(3):39===e?i.ccRU(4):40===e?i.ccFON():41===e?i.ccRDC():42===e?i.ccTR():43===e?i.ccRTD():44===e?i.ccEDM():45===e?i.ccCR():46===e?i.ccENM():47===e&&i.ccEOC():i.ccTO(e-32),this.currentChannel=s,!0}parseMidrow(t,e){let s=0
if((17===t||25===t)&&e>=32&&e<=47){if(s=17===t?1:2,s!==this.currentChannel)return this.logger.log(0,"Mismatch channel in midrow parsing"),!1
const i=this.channels[s]
return!!i&&(i.ccMIDROW(e),this.logger.log(3,(()=>"MIDROW ("+Dr([t,e])+")")),!0)}return!1}parsePAC(t,e){let s
if(!((t>=17&&t<=23||t>=25&&t<=31)&&e>=64&&e<=127||(16===t||24===t)&&e>=64&&e<=95))return!1
const i=t<=23?1:2
s=e>=64&&e<=95?1===i?Tr[t]:Ar[t]:1===i?Sr[t]:Lr[t]
const r=this.channels[i]
return!!r&&(r.setPAC(this.interpretPAC(s,e)),this.currentChannel=i,!0)}interpretPAC(t,e){let s
const i={color:null,italics:!1,indent:null,underline:!1,row:t}
return s=e>95?e-96:e-64,i.underline=1==(1&s),s<=13?i.color=["white","green","blue","cyan","red","yellow","magenta","white"][Math.floor(s/2)]:s<=15?(i.italics=!0,i.color="white"):i.indent=4*Math.floor((s-16)/2),i}parseChars(t,e){let s,i=null,r=null
if(t>=25?(s=2,r=t-8):(s=1,r=t),r>=17&&r<=19){let t
t=17===r?e+80:18===r?e+112:e+144,this.logger.log(2,(()=>"Special char '"+yr(t)+"' in channel "+s)),i=[t]}else t>=32&&t<=127&&(i=0===e?[t]:[t,e])
return i&&this.logger.log(3,(()=>"Char codes =  "+Dr(i).join(","))),i}parseBackgroundAttributes(t,e){if(!((16===t||24===t)&&e>=32&&e<=47||(23===t||31===t)&&e>=45&&e<=47))return!1
let s
const i={}
16===t||24===t?(s=Math.floor((e-32)/2),i.background=Rr[s],e%2==1&&(i.background=i.background+"_semi")):45===e?i.background="transparent":(i.foreground="black",47===e&&(i.underline=!0))
const r=t<=23?1:2
return this.channels[r].setBkgData(i),!0}reset(){for(let t=0;t<Object.keys(this.channels).length;t++){const e=this.channels[t]
e&&e.reset()}Pr(null,null,this.cmdHistory)}cueSplitAtTime(t){for(let e=0;e<this.channels.length;e++){const s=this.channels[e]
s&&s.cueSplitAtTime(t)}}}function Pr(t,e,s){s.a=t,s.b=e}function Mr(t,e,s){return s.a===t&&s.b===e}class Fr{constructor(t,e){this.timelineController=void 0,this.cueRanges=[],this.trackName=void 0,this.startTime=null,this.endTime=null,this.screen=null,this.timelineController=t,this.trackName=e}dispatchCue(){null!==this.startTime&&(this.timelineController.addCues(this.trackName,this.startTime,this.endTime,this.screen,this.cueRanges),this.startTime=null)}newCue(t,e,s){(null===this.startTime||this.startTime>t)&&(this.startTime=t),this.endTime=e,this.screen=s,this.timelineController.createCaptionsTrack(this.trackName)}reset(){this.cueRanges=[],this.startTime=null}}var Or=function(){if(null!=O&&O.VTTCue)return self.VTTCue
const t=["","lr","rl"],e=["start","middle","end","left","right"]
function s(t,e){if("string"!=typeof e)return!1
if(!Array.isArray(t))return!1
const s=e.toLowerCase()
return!!~t.indexOf(s)&&s}function i(t){return s(e,t)}function r(t,...e){let s=1
for(;s<arguments.length;s++){const e=arguments[s]
for(const s in e)t[s]=e[s]}return t}function n(e,n,a){const o=this,l={enumerable:!0}
o.hasBeenReset=!1
let h="",d=!1,c=e,u=n,f=a,g=null,m="",p=!0,y="auto",v="start",E=50,T="middle",S=50,A="middle"
Object.defineProperty(o,"id",r({},l,{get:function(){return h},set:function(t){h=""+t}})),Object.defineProperty(o,"pauseOnExit",r({},l,{get:function(){return d},set:function(t){d=!!t}})),Object.defineProperty(o,"startTime",r({},l,{get:function(){return c},set:function(t){if("number"!=typeof t)throw new TypeError("Start time must be set to a number.")
c=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"endTime",r({},l,{get:function(){return u},set:function(t){if("number"!=typeof t)throw new TypeError("End time must be set to a number.")
u=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"text",r({},l,{get:function(){return f},set:function(t){f=""+t,this.hasBeenReset=!0}})),Object.defineProperty(o,"region",r({},l,{get:function(){return g},set:function(t){g=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"vertical",r({},l,{get:function(){return m},set:function(e){const i=function(e){return s(t,e)}(e)
if(!1===i)throw new SyntaxError("An invalid or illegal string was specified.")
m=i,this.hasBeenReset=!0}})),Object.defineProperty(o,"snapToLines",r({},l,{get:function(){return p},set:function(t){p=!!t,this.hasBeenReset=!0}})),Object.defineProperty(o,"line",r({},l,{get:function(){return y},set:function(t){if("number"!=typeof t&&"auto"!==t)throw new SyntaxError("An invalid number or illegal string was specified.")
y=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"lineAlign",r({},l,{get:function(){return v},set:function(t){const e=i(t)
if(!e)throw new SyntaxError("An invalid or illegal string was specified.")
v=e,this.hasBeenReset=!0}})),Object.defineProperty(o,"position",r({},l,{get:function(){return E},set:function(t){if(t<0||t>100)throw new Error("Position must be between 0 and 100.")
E=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"positionAlign",r({},l,{get:function(){return T},set:function(t){const e=i(t)
if(!e)throw new SyntaxError("An invalid or illegal string was specified.")
T=e,this.hasBeenReset=!0}})),Object.defineProperty(o,"size",r({},l,{get:function(){return S},set:function(t){if(t<0||t>100)throw new Error("Size must be between 0 and 100.")
S=t,this.hasBeenReset=!0}})),Object.defineProperty(o,"align",r({},l,{get:function(){return A},set:function(t){const e=i(t)
if(!e)throw new SyntaxError("An invalid or illegal string was specified.")
A=e,this.hasBeenReset=!0}})),o.displayState=void 0}return n.prototype.getCueAsHTML=function(){return self.WebVTT.convertCueToDOMTree(self,this.text)},n}()
class Nr{decode(t,e){if(!t)return""
if("string"!=typeof t)throw new Error("Error - expected string data.")
return decodeURIComponent(encodeURIComponent(t))}}function Ur(t){function e(t,e,s,i){return 3600*(0|t)+60*(0|e)+(0|s)+parseFloat(i||0)}const s=t.match(/^(?:(\d+):)?(\d{2}):(\d{2})(\.\d+)?/)
return s?parseFloat(s[2])>59?e(s[2],s[3],0,s[4]):e(s[1],s[2],s[3],s[4]):null}class Br{constructor(){this.values=Object.create(null)}set(t,e){this.get(t)||""===e||(this.values[t]=e)}get(t,e,s){return s?this.has(t)?this.values[t]:e[s]:this.has(t)?this.values[t]:e}has(t){return t in this.values}alt(t,e,s){for(let i=0;i<s.length;++i)if(e===s[i]){this.set(t,e)
break}}integer(t,e){/^-?\d+$/.test(e)&&this.set(t,parseInt(e,10))}percent(t,e){if(/^([\d]{1,3})(\.[\d]*)?%$/.test(e)){const s=parseFloat(e)
if(s>=0&&s<=100)return this.set(t,s),!0}return!1}}function $r(t,e,s,i){const r=i?t.split(i):[t]
for(const n in r){if("string"!=typeof r[n])continue
const t=r[n].split(s)
2===t.length&&e(t[0],t[1])}}const Gr=new Or(0,0,""),Kr="middle"===Gr.align?"middle":"center"
function Hr(t,e,s){const i=t
function r(){const e=Ur(t)
if(null===e)throw new Error("Malformed timestamp: "+i)
return t=t.replace(/^[^\sa-zA-Z-]+/,""),e}function n(){t=t.replace(/^\s+/,"")}if(n(),e.startTime=r(),n(),"--\x3e"!==t.slice(0,3))throw new Error("Malformed time stamp (time stamps must be separated by '--\x3e'): "+i)
t=t.slice(3),n(),e.endTime=r(),n(),function(t,e){const i=new Br
$r(t,(function(t,e){let r
switch(t){case"region":for(let r=s.length-1;r>=0;r--)if(s[r].id===e){i.set(t,s[r].region)
break}break
case"vertical":i.alt(t,e,["rl","lr"])
break
case"line":r=e.split(","),i.integer(t,r[0]),i.percent(t,r[0])&&i.set("snapToLines",!1),i.alt(t,r[0],["auto"]),2===r.length&&i.alt("lineAlign",r[1],["start",Kr,"end"])
break
case"position":r=e.split(","),i.percent(t,r[0]),2===r.length&&i.alt("positionAlign",r[1],["start",Kr,"end","line-left","line-right","auto"])
break
case"size":i.percent(t,e)
break
case"align":i.alt(t,e,["start",Kr,"end","left","right"])}}),/:/,/\s/),e.region=i.get("region",null),e.vertical=i.get("vertical","")
let r=i.get("line","auto")
"auto"===r&&-1===Gr.line&&(r=-1),e.line=r,e.lineAlign=i.get("lineAlign","start"),e.snapToLines=i.get("snapToLines",!0),e.size=i.get("size",100),e.align=i.get("align",Kr)
let n=i.get("position","auto")
"auto"===n&&50===Gr.position&&(n="start"===e.align||"left"===e.align?0:"end"===e.align||"right"===e.align?100:50),e.position=n}(t,e)}function Vr(t){return t.replace(/<br(?: \/)?>/gi,"\n")}class Yr{constructor(){this.state="INITIAL",this.buffer="",this.decoder=new Nr,this.regionList=[],this.cue=null,this.oncue=void 0,this.onparsingerror=void 0,this.onflush=void 0}parse(t){const e=this
function s(){let t=e.buffer,s=0
for(t=Vr(t);s<t.length&&"\r"!==t[s]&&"\n"!==t[s];)++s
const i=t.slice(0,s)
return"\r"===t[s]&&++s,"\n"===t[s]&&++s,e.buffer=t.slice(s),i}t&&(e.buffer+=e.decoder.decode(t,{stream:!0}))
try{let i=""
if("INITIAL"===e.state){if(!/\r\n|\n/.test(e.buffer))return this
i=s()
const t=i.match(/^(ï»¿)?WEBVTT([ \t].*)?$/)
if(null==t||!t[0])throw new Error("Malformed WebVTT signature.")
e.state="HEADER"}let r=!1
for(;e.buffer;){if(!/\r\n|\n/.test(e.buffer))return this
switch(r?r=!1:i=s(),e.state){case"HEADER":/:/.test(i)?$r(i,(function(t,e){}),/:/):i||(e.state="ID")
continue
case"NOTE":i||(e.state="ID")
continue
case"ID":if(/^NOTE($|[ \t])/.test(i)){e.state="NOTE"
break}if(!i)continue
if(e.cue=new Or(0,0,""),e.state="CUE",-1===i.indexOf("--\x3e")){e.cue.id=i
continue}case"CUE":if(!e.cue){e.state="BADCUE"
continue}try{Hr(i,e.cue,e.regionList)}catch(t){e.cue=null,e.state="BADCUE"
continue}e.state="CUETEXT"
continue
case"CUETEXT":{const t=-1!==i.indexOf("--\x3e")
if(!i||t&&(r=!0)){e.oncue&&e.cue&&e.oncue(e.cue),e.cue=null,e.state="ID"
continue}if(null===e.cue)continue
e.cue.text&&(e.cue.text+="\n"),e.cue.text+=i}continue
case"BADCUE":i||(e.state="ID")}}}catch(t){"CUETEXT"===e.state&&e.cue&&e.oncue&&e.oncue(e.cue),e.cue=null,e.state="INITIAL"===e.state?"BADWEBVTT":"BADCUE"}return this}flush(){const t=this
try{if((t.cue||"HEADER"===t.state)&&(t.buffer+="\n\n",t.parse()),"INITIAL"===t.state||"BADWEBVTT"===t.state)throw new Error("Malformed WebVTT signature.")}catch(e){t.onparsingerror&&t.onparsingerror(e)}return t.onflush&&t.onflush(),this}}const Wr=/\r\n|\n\r|\n|\r/g,jr=function(t,e,s=0){return t.slice(s,s+e.length)===e},qr=function(t){let e=5381,s=t.length
for(;s;)e=33*e^t.charCodeAt(--s)
return(e>>>0).toString()}
function Xr(t,e,s){return qr(t.toString())+qr(e.toString())+qr(s)}const zr="stpp.ttml.im1t",Qr=/^(\d{2,}):(\d{2}):(\d{2}):(\d{2})\.?(\d+)?$/,Jr=/^(\d*(?:\.\d*)?)(h|m|s|ms|f|t)$/,Zr={left:"start",center:"center",right:"end",start:"start",end:"end"}
function tn(t,e,s,i){const r=Et(new Uint8Array(t),["mdat"])
if(0===r.length)return void i(new Error("Could not parse IMSC1 mdat"))
const n=r.map((t=>ot(t))),a=function(t,e,s=1,i=!1){return Ui(t,e,1/s,i)}(e.baseTime,1,e.timescale)
try{n.forEach((t=>s(function(t,e){const s=(new DOMParser).parseFromString(t,"text/xml").getElementsByTagName("tt")[0]
if(!s)throw new Error("Invalid ttml")
const i={frameRate:30,subFrameRate:1,frameRateMultiplier:0,tickRate:0},r=Object.keys(i).reduce(((t,e)=>(t[e]=s.getAttribute(`ttp:${e}`)||i[e],t)),{}),n="preserve"!==s.getAttribute("xml:space"),a=sn(en(s,"styling","style")),o=sn(en(s,"layout","region")),l=en(s,"body","[begin]")
return[].map.call(l,(t=>{const s=rn(t,n)
if(!s||!t.hasAttribute("begin"))return null
const i=on(t.getAttribute("begin"),r),l=on(t.getAttribute("dur"),r)
let h=on(t.getAttribute("end"),r)
if(null===i)throw an(t)
if(null===h){if(null===l)throw an(t)
h=i+l}const d=new Or(i-e,h-e,s)
d.id=Xr(d.startTime,d.endTime,d.text)
const c=function(t,e,s){const i="http://www.w3.org/ns/ttml#styling"
let r=null
const n=null!=t&&t.hasAttribute("style")?t.getAttribute("style"):null
return n&&s.hasOwnProperty(n)&&(r=s[n]),["displayAlign","textAlign","color","backgroundColor","fontSize","fontFamily"].reduce(((s,n)=>{const a=nn(e,i,n)||nn(t,i,n)||nn(r,i,n)
return a&&(s[n]=a),s}),{})}(o[t.getAttribute("region")],a[t.getAttribute("style")],a),{textAlign:f}=c
if(f){const t=Zr[f]
t&&(d.lineAlign=t),d.align=f}return u(d,c),d})).filter((t=>null!==t))}(t,a))))}catch(t){i(t)}}function en(t,e,s){const i=t.getElementsByTagName(e)[0]
return i?[].slice.call(i.querySelectorAll(s)):[]}function sn(t){return t.reduce(((t,e)=>{const s=e.getAttribute("xml:id")
return s&&(t[s]=e),t}),{})}function rn(t,e){return[].slice.call(t.childNodes).reduce(((t,s,i)=>{var r
return"br"===s.nodeName&&i?t+"\n":null!=(r=s.childNodes)&&r.length?rn(s,e):e?t+s.textContent.trim().replace(/\s+/g," "):t+s.textContent}),"")}function nn(t,e,s){return t&&t.hasAttributeNS(e,s)?t.getAttributeNS(e,s):null}function an(t){return new Error(`Could not parse ttml timestamp ${t}`)}function on(t,e){if(!t)return null
let s=Ur(t)
return null===s&&(Qr.test(t)?s=function(t,e){const s=Qr.exec(t),i=(0|s[4])+(0|s[5])/e.subFrameRate
return 3600*(0|s[1])+60*(0|s[2])+(0|s[3])+i/e.frameRate}(t,e):Jr.test(t)&&(s=function(t,e){const s=Jr.exec(t),i=Number(s[1])
switch(s[2]){case"h":return 3600*i
case"m":return 60*i
case"ms":return 1e3*i
case"f":return i/e.frameRate
case"t":return i/e.tickRate}return i}(t,e))),s}class ln{constructor(t){this.hls=void 0,this.media=null,this.config=void 0,this.enabled=!0,this.Cues=void 0,this.textTracks=[],this.tracks=[],this.initPTS=[],this.unparsedVttFrags=[],this.captionsTracks={},this.nonNativeCaptionsTracks={},this.cea608Parser1=void 0,this.cea608Parser2=void 0,this.lastCc=-1,this.lastSn=-1,this.lastPartIndex=-1,this.prevCC=-1,this.vttCCs={ccOffset:0,presentationOffset:0,0:{start:0,prevCC:-1,new:!0}},this.captionsProperties=void 0,this.hls=t,this.config=t.config,this.Cues=t.config.cueHandler,this.captionsProperties={textTrack1:{label:this.config.captionsTextTrack1Label,languageCode:this.config.captionsTextTrack1LanguageCode},textTrack2:{label:this.config.captionsTextTrack2Label,languageCode:this.config.captionsTextTrack2LanguageCode},textTrack3:{label:this.config.captionsTextTrack3Label,languageCode:this.config.captionsTextTrack3LanguageCode},textTrack4:{label:this.config.captionsTextTrack4Label,languageCode:this.config.captionsTextTrack4LanguageCode}},t.on(p.MEDIA_ATTACHING,this.onMediaAttaching,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.MANIFEST_LOADED,this.onManifestLoaded,this),t.on(p.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.on(p.FRAG_LOADING,this.onFragLoading,this),t.on(p.FRAG_LOADED,this.onFragLoaded,this),t.on(p.FRAG_PARSING_USERDATA,this.onFragParsingUserdata,this),t.on(p.FRAG_DECRYPTED,this.onFragDecrypted,this),t.on(p.INIT_PTS_FOUND,this.onInitPtsFound,this),t.on(p.SUBTITLE_TRACKS_CLEARED,this.onSubtitleTracksCleared,this),t.on(p.BUFFER_FLUSHING,this.onBufferFlushing,this)}destroy(){const{hls:t}=this
t.off(p.MEDIA_ATTACHING,this.onMediaAttaching,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.MANIFEST_LOADED,this.onManifestLoaded,this),t.off(p.SUBTITLE_TRACKS_UPDATED,this.onSubtitleTracksUpdated,this),t.off(p.FRAG_LOADING,this.onFragLoading,this),t.off(p.FRAG_LOADED,this.onFragLoaded,this),t.off(p.FRAG_PARSING_USERDATA,this.onFragParsingUserdata,this),t.off(p.FRAG_DECRYPTED,this.onFragDecrypted,this),t.off(p.INIT_PTS_FOUND,this.onInitPtsFound,this),t.off(p.SUBTITLE_TRACKS_CLEARED,this.onSubtitleTracksCleared,this),t.off(p.BUFFER_FLUSHING,this.onBufferFlushing,this),this.hls=this.config=null,this.cea608Parser1=this.cea608Parser2=void 0}initCea608Parsers(){if(this.config.enableCEA708Captions&&(!this.cea608Parser1||!this.cea608Parser2)){const t=new Fr(this,"textTrack1"),e=new Fr(this,"textTrack2"),s=new Fr(this,"textTrack3"),i=new Fr(this,"textTrack4")
this.cea608Parser1=new xr(1,t,e),this.cea608Parser2=new xr(3,s,i)}}addCues(t,e,s,i,r){let n=!1
for(let d=r.length;d--;){const t=r[d],i=(a=t[0],o=t[1],l=e,h=s,Math.min(o,h)-Math.max(a,l))
if(i>=0&&(t[0]=Math.min(t[0],e),t[1]=Math.max(t[1],s),n=!0,i/(s-e)>.5))return}var a,o,l,h
if(n||r.push([e,s]),this.config.renderTextTracksNatively){const r=this.captionsTracks[t]
this.Cues.newCue(r,e,s,i)}else{const r=this.Cues.newCue(null,e,s,i)
this.hls.trigger(p.CUES_PARSED,{type:"captions",cues:r,track:t})}}onInitPtsFound(t,{frag:e,id:s,initPTS:i,timescale:r}){const{unparsedVttFrags:n}=this
"main"===s&&(this.initPTS[e.cc]={baseTime:i,timescale:r}),n.length&&(this.unparsedVttFrags=[],n.forEach((t=>{this.onFragLoaded(p.FRAG_LOADED,t)})))}getExistingTrack(t,e){const{media:s}=this
if(s)for(let i=0;i<s.textTracks.length;i++){const r=s.textTracks[i]
if(dn(r,{name:t,lang:e,attrs:{}}))return r}return null}createCaptionsTrack(t){this.config.renderTextTracksNatively?this.createNativeTrack(t):this.createNonNativeTrack(t)}createNativeTrack(t){if(this.captionsTracks[t])return
const{captionsProperties:e,captionsTracks:s,media:i}=this,{label:r,languageCode:n}=e[t],a=this.getExistingTrack(r,n)
if(a)s[t]=a,Ee(s[t]),ye(s[t],i)
else{const e=this.createTextTrack("captions",r,n)
e&&(e[t]=!0,s[t]=e)}}createNonNativeTrack(t){if(this.nonNativeCaptionsTracks[t])return
const e=this.captionsProperties[t]
if(!e)return
const s={_id:t,label:e.label,kind:"captions",default:!!e.media&&!!e.media.default,closedCaptions:e.media}
this.nonNativeCaptionsTracks[t]=s,this.hls.trigger(p.NON_NATIVE_TEXT_TRACKS_FOUND,{tracks:[s]})}createTextTrack(t,e,s){const i=this.media
if(i)return i.addTextTrack(t,e,s)}onMediaAttaching(t,e){this.media=e.media,this._cleanTracks()}onMediaDetaching(){const{captionsTracks:t}=this
Object.keys(t).forEach((e=>{Ee(t[e]),delete t[e]})),this.nonNativeCaptionsTracks={}}onManifestLoading(){this.lastCc=-1,this.lastSn=-1,this.lastPartIndex=-1,this.prevCC=-1,this.vttCCs={ccOffset:0,presentationOffset:0,0:{start:0,prevCC:-1,new:!0}},this._cleanTracks(),this.tracks=[],this.captionsTracks={},this.nonNativeCaptionsTracks={},this.textTracks=[],this.unparsedVttFrags=[],this.initPTS=[],this.cea608Parser1&&this.cea608Parser2&&(this.cea608Parser1.reset(),this.cea608Parser2.reset())}_cleanTracks(){const{media:t}=this
if(!t)return
const e=t.textTracks
if(e)for(let s=0;s<e.length;s++)Ee(e[s])}onSubtitleTracksUpdated(t,e){const s=e.subtitleTracks||[],i=s.some((t=>t.textCodec===zr))
if(this.config.enableWebVTT||i&&this.config.enableIMSC1){if(rr(this.tracks,s))return void(this.tracks=s)
if(this.textTracks=[],this.tracks=s,this.config.renderTextTracksNatively){const t=this.media,e=t?Se(t.textTracks):null
if(this.tracks.forEach(((t,s)=>{let i
if(e){let s=null
for(let i=0;i<e.length;i++)if(e[i]&&dn(e[i],t)){s=e[i],e[i]=null
break}s&&(i=s)}if(i)Ee(i)
else{const e=hn(t)
i=this.createTextTrack(e,t.name,t.lang),i&&(i.mode="disabled")}i&&this.textTracks.push(i)})),null!=e&&e.length){const t=e.filter((t=>null!==t)).map((t=>t.label))
t.length&&A.warn(`Media element contains unused subtitle tracks: ${t.join(", ")}. Replace media element for each source to clear TextTracks and captions menu.`)}}else if(this.tracks.length){const t=this.tracks.map((t=>({label:t.name,kind:t.type.toLowerCase(),default:t.default,subtitleTrack:t})))
this.hls.trigger(p.NON_NATIVE_TEXT_TRACKS_FOUND,{tracks:t})}}}onManifestLoaded(t,e){this.config.enableCEA708Captions&&e.captions&&e.captions.forEach((t=>{const e=/(?:CC|SERVICE)([1-4])/.exec(t.instreamId)
if(!e)return
const s=`textTrack${e[1]}`,i=this.captionsProperties[s]
i&&(i.label=t.name,t.lang&&(i.languageCode=t.lang),i.media=t)}))}closedCaptionsForLevel(t){const e=this.hls.levels[t.level]
return null==e?void 0:e.attrs["CLOSED-CAPTIONS"]}onFragLoading(t,e){if(this.enabled&&e.frag.type===fe.MAIN){var s,i
const{cea608Parser1:t,cea608Parser2:r,lastSn:n}=this,{cc:a,sn:o}=e.frag,l=null!=(s=null==(i=e.part)?void 0:i.index)?s:-1
t&&r&&(o!==n+1||o===n&&l!==this.lastPartIndex+1||a!==this.lastCc)&&(t.reset(),r.reset()),this.lastCc=a,this.lastSn=o,this.lastPartIndex=l}}onFragLoaded(t,e){const{frag:s,payload:i}=e
if(s.type===fe.SUBTITLE)if(i.byteLength){const t=s.decryptdata,r="stats"in e
if(null==t||!t.encrypted||r){const t=this.tracks[s.level],r=this.vttCCs
r[s.cc]||(r[s.cc]={start:s.start,prevCC:this.prevCC,new:!0},this.prevCC=s.cc),t&&t.textCodec===zr?this._parseIMSC1(s,i):this._parseVTTs(e)}}else this.hls.trigger(p.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:s,error:new Error("Empty subtitle payload")})}_parseIMSC1(t,e){const s=this.hls
tn(e,this.initPTS[t.cc],(e=>{this._appendCues(e,t.level),s.trigger(p.SUBTITLE_FRAG_PROCESSED,{success:!0,frag:t})}),(e=>{A.log(`Failed to parse IMSC1: ${e}`),s.trigger(p.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:t,error:e})}))}_parseVTTs(t){var e
const{frag:s,payload:i}=t,{initPTS:r,unparsedVttFrags:n}=this,a=r.length-1
if(!r[s.cc]&&-1===a)return void n.push(t)
const o=this.hls
!function(t,e,s,i,r,n,a){const o=new Yr,l=ot(new Uint8Array(t)).trim().replace(Wr,"\n").split("\n"),h=[],d=e?function(t,e=1){return Ui(t,Ni,1/e)}(e.baseTime,e.timescale):0
let c,u="00:00.000",g=0,m=0,p=!0
o.oncue=function(t){const n=s[i]
let a=s.ccOffset
const o=(g-d)/9e4
if(null!=n&&n.new&&(void 0!==m?a=s.ccOffset=n.start:function(t,e,s){let i=t[e],r=t[i.prevCC]
if(!r||!r.new&&i.new)return t.ccOffset=t.presentationOffset=i.start,void(i.new=!1)
for(;null!=(n=r)&&n.new;){var n
t.ccOffset+=i.start-r.start,i.new=!1,i=r,r=t[i.prevCC]}t.presentationOffset=s}(s,i,o)),o){if(!e)return void(c=new Error("Missing initPTS for VTT MPEGTS"))
a=o-s.presentationOffset}const l=t.endTime-t.startTime,u=Vi(9e4*(t.startTime+a-m),9e4*r)/9e4
t.startTime=Math.max(u,0),t.endTime=Math.max(u+l,0)
const f=t.text.trim()
t.text=decodeURIComponent(encodeURIComponent(f)),t.id||(t.id=Xr(t.startTime,t.endTime,f)),t.endTime>0&&h.push(t)},o.onparsingerror=function(t){c=t},o.onflush=function(){c?a(c):n(h)},l.forEach((t=>{if(p){if(jr(t,"X-TIMESTAMP-MAP=")){p=!1,t.slice(16).split(",").forEach((t=>{jr(t,"LOCAL:")?u=t.slice(6):jr(t,"MPEGTS:")&&(g=parseInt(t.slice(7)))}))
try{m=function(t){let e=parseInt(t.slice(-3))
const s=parseInt(t.slice(-6,-4)),i=parseInt(t.slice(-9,-7)),r=t.length>9?parseInt(t.substring(0,t.indexOf(":"))):0
if(!(f(e)&&f(s)&&f(i)&&f(r)))throw Error(`Malformed X-TIMESTAMP-MAP: Local:${t}`)
return e+=1e3*s,e+=6e4*i,e+=36e5*r,e}(u)/1e3}catch(t){c=t}return}""===t&&(p=!1)}o.parse(t+"\n")})),o.flush()}(null!=(e=s.initSegment)&&e.data?It(s.initSegment.data,new Uint8Array(i)):i,this.initPTS[s.cc],this.vttCCs,s.cc,s.start,(t=>{this._appendCues(t,s.level),o.trigger(p.SUBTITLE_FRAG_PROCESSED,{success:!0,frag:s})}),(e=>{const r="Missing initPTS for VTT MPEGTS"===e.message
r?n.push(t):this._fallbackToIMSC1(s,i),A.log(`Failed to parse VTT cue: ${e}`),r&&a>s.cc||o.trigger(p.SUBTITLE_FRAG_PROCESSED,{success:!1,frag:s,error:e})}))}_fallbackToIMSC1(t,e){const s=this.tracks[t.level]
s.textCodec||tn(e,this.initPTS[t.cc],(()=>{s.textCodec=zr,this._parseIMSC1(t,e)}),(()=>{s.textCodec="wvtt"}))}_appendCues(t,e){const s=this.hls
if(this.config.renderTextTracksNatively){const s=this.textTracks[e]
if(!s||"disabled"===s.mode)return
t.forEach((t=>ve(s,t)))}else{const i=this.tracks[e]
if(!i)return
const r=i.default?"default":"subtitles"+e
s.trigger(p.CUES_PARSED,{type:"subtitles",cues:t,track:r})}}onFragDecrypted(t,e){const{frag:s}=e
s.type===fe.SUBTITLE&&this.onFragLoaded(p.FRAG_LOADED,e)}onSubtitleTracksCleared(){this.tracks=[],this.captionsTracks={}}onFragParsingUserdata(t,e){this.initCea608Parsers()
const{cea608Parser1:s,cea608Parser2:i}=this
if(!this.enabled||!s||!i)return
const{frag:r,samples:n}=e
if(r.type!==fe.MAIN||"NONE"!==this.closedCaptionsForLevel(r))for(let a=0;a<n.length;a++){const t=n[a].bytes
if(t){const e=this.extractCea608Data(t)
s.addData(n[a].pts,e[0]),i.addData(n[a].pts,e[1])}}}onBufferFlushing(t,{startOffset:e,endOffset:s,endOffsetSubtitles:i,type:r}){const{media:n}=this
if(n&&!(n.currentTime<s)){if(!r||"video"===r){const{captionsTracks:t}=this
Object.keys(t).forEach((i=>Te(t[i],e,s)))}if(this.config.renderTextTracksNatively&&0===e&&void 0!==i){const{textTracks:t}=this
Object.keys(t).forEach((s=>Te(t[s],e,i)))}}}extractCea608Data(t){const e=[[],[]],s=31&t[0]
let i=2
for(let r=0;r<s;r++){const s=t[i++],r=127&t[i++],n=127&t[i++]
if((0!==r||0!==n)&&0!=(4&s)){const t=3&s
0!==t&&1!==t||(e[t].push(r),e[t].push(n))}}return e}}function hn(t){return t.characteristics&&/transcribes-spoken-dialog/gi.test(t.characteristics)&&/describes-music-and-sound/gi.test(t.characteristics)?"captions":"subtitles"}function dn(t,e){return!!t&&t.kind===hn(e)&&ar(e,t)}class cn{constructor(t){this.hls=void 0,this.autoLevelCapping=void 0,this.firstLevel=void 0,this.media=void 0,this.restrictedLevels=void 0,this.timer=void 0,this.clientRect=void 0,this.streamController=void 0,this.hls=t,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.firstLevel=-1,this.media=null,this.restrictedLevels=[],this.timer=void 0,this.clientRect=null,this.registerListeners()}setStreamController(t){this.streamController=t}destroy(){this.hls&&this.unregisterListener(),this.timer&&this.stopCapping(),this.media=null,this.clientRect=null,this.hls=this.streamController=null}registerListeners(){const{hls:t}=this
t.on(p.FPS_DROP_LEVEL_CAPPING,this.onFpsDropLevelCapping,this),t.on(p.MEDIA_ATTACHING,this.onMediaAttaching,this),t.on(p.MANIFEST_PARSED,this.onManifestParsed,this),t.on(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.on(p.BUFFER_CODECS,this.onBufferCodecs,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this)}unregisterListener(){const{hls:t}=this
t.off(p.FPS_DROP_LEVEL_CAPPING,this.onFpsDropLevelCapping,this),t.off(p.MEDIA_ATTACHING,this.onMediaAttaching,this),t.off(p.MANIFEST_PARSED,this.onManifestParsed,this),t.off(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.off(p.BUFFER_CODECS,this.onBufferCodecs,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this)}onFpsDropLevelCapping(t,e){const s=this.hls.levels[e.droppedLevel]
this.isLevelAllowed(s)&&this.restrictedLevels.push({bitrate:s.bitrate,height:s.height,width:s.width})}onMediaAttaching(t,e){this.media=e.media instanceof HTMLVideoElement?e.media:null,this.clientRect=null,this.timer&&this.hls.levels.length&&this.detectPlayerSize()}onManifestParsed(t,e){const s=this.hls
this.restrictedLevels=[],this.firstLevel=e.firstLevel,s.config.capLevelToPlayerSize&&e.video&&this.startCapping()}onLevelsUpdated(t,e){this.timer&&f(this.autoLevelCapping)&&this.detectPlayerSize()}onBufferCodecs(t,e){this.hls.config.capLevelToPlayerSize&&e.video&&this.startCapping()}onMediaDetaching(){this.stopCapping()}detectPlayerSize(){if(this.media){if(this.mediaHeight<=0||this.mediaWidth<=0)return void(this.clientRect=null)
const t=this.hls.levels
if(t.length){const e=this.hls,s=this.getMaxLevel(t.length-1)
s!==this.autoLevelCapping&&A.log(`Setting autoLevelCapping to ${s}: ${t[s].height}p@${t[s].bitrate} for media ${this.mediaWidth}x${this.mediaHeight}`),e.autoLevelCapping=s,e.autoLevelCapping>this.autoLevelCapping&&this.streamController&&this.streamController.nextLevelSwitch(),this.autoLevelCapping=e.autoLevelCapping}}}getMaxLevel(t){const e=this.hls.levels
if(!e.length)return-1
const s=e.filter(((e,s)=>this.isLevelAllowed(e)&&s<=t))
return this.clientRect=null,cn.getMaxLevelByMediaSize(s,this.mediaWidth,this.mediaHeight)}startCapping(){this.timer||(this.autoLevelCapping=Number.POSITIVE_INFINITY,self.clearInterval(this.timer),this.timer=self.setInterval(this.detectPlayerSize.bind(this),1e3),this.detectPlayerSize())}stopCapping(){this.restrictedLevels=[],this.firstLevel=-1,this.autoLevelCapping=Number.POSITIVE_INFINITY,this.timer&&(self.clearInterval(this.timer),this.timer=void 0)}getDimensions(){if(this.clientRect)return this.clientRect
const t=this.media,e={width:0,height:0}
if(t){const s=t.getBoundingClientRect()
e.width=s.width,e.height=s.height,e.width||e.height||(e.width=s.right-s.left||t.width||0,e.height=s.bottom-s.top||t.height||0)}return this.clientRect=e,e}get mediaWidth(){return this.getDimensions().width*this.contentScaleFactor}get mediaHeight(){return this.getDimensions().height*this.contentScaleFactor}get contentScaleFactor(){let t=1
if(!this.hls.config.ignoreDevicePixelRatio)try{t=self.devicePixelRatio}catch(t){}return t}isLevelAllowed(t){return!this.restrictedLevels.some((e=>t.bitrate===e.bitrate&&t.width===e.width&&t.height===e.height))}static getMaxLevelByMediaSize(t,e,s){if(null==t||!t.length)return-1
let i=t.length-1
const r=Math.max(e,s)
for(let o=0;o<t.length;o+=1){const e=t[o]
if((e.width>=r||e.height>=r)&&(n=e,!(a=t[o+1])||n.width!==a.width||n.height!==a.height)){i=o
break}}var n,a
return i}}class un{constructor(t){this.hls=void 0,this.isVideoPlaybackQualityAvailable=!1,this.timer=void 0,this.media=null,this.lastTime=void 0,this.lastDroppedFrames=0,this.lastDecodedFrames=0,this.streamController=void 0,this.hls=t,this.registerListeners()}setStreamController(t){this.streamController=t}registerListeners(){this.hls.on(p.MEDIA_ATTACHING,this.onMediaAttaching,this)}unregisterListeners(){this.hls.off(p.MEDIA_ATTACHING,this.onMediaAttaching,this)}destroy(){this.timer&&clearInterval(this.timer),this.unregisterListeners(),this.isVideoPlaybackQualityAvailable=!1,this.media=null}onMediaAttaching(t,e){const s=this.hls.config
if(s.capLevelOnFPSDrop){const t=e.media instanceof self.HTMLVideoElement?e.media:null
this.media=t,t&&"function"==typeof t.getVideoPlaybackQuality&&(this.isVideoPlaybackQualityAvailable=!0),self.clearInterval(this.timer),this.timer=self.setInterval(this.checkFPSInterval.bind(this),s.fpsDroppedMonitoringPeriod)}}checkFPS(t,e,s){const i=performance.now()
if(e){if(this.lastTime){const t=i-this.lastTime,r=s-this.lastDroppedFrames,n=e-this.lastDecodedFrames,a=1e3*r/t,o=this.hls
if(o.trigger(p.FPS_DROP,{currentDropped:r,currentDecoded:n,totalDroppedFrames:s}),a>0&&r>o.config.fpsDroppedMonitoringThreshold*n){let t=o.currentLevel
A.warn("drop FPS ratio greater than max allowed value for currentLevel: "+t),t>0&&(-1===o.autoLevelCapping||o.autoLevelCapping>=t)&&(t-=1,o.trigger(p.FPS_DROP_LEVEL_CAPPING,{level:t,droppedLevel:o.currentLevel}),o.autoLevelCapping=t,this.streamController.nextLevelSwitch())}}this.lastTime=i,this.lastDroppedFrames=s,this.lastDecodedFrames=e}}checkFPSInterval(){const t=this.media
if(t)if(this.isVideoPlaybackQualityAvailable){const e=t.getVideoPlaybackQuality()
this.checkFPS(t,e.totalVideoFrames,e.droppedVideoFrames)}else this.checkFPS(t,t.webkitDecodedFrameCount,t.webkitDroppedFrameCount)}}const fn="[eme]"
class gn{constructor(t){this.hls=void 0,this.config=void 0,this.media=null,this.keyFormatPromise=null,this.keySystemAccessPromises={},this._requestLicenseFailureCount=0,this.mediaKeySessions=[],this.keyIdToKeySessionPromise={},this.setMediaKeysQueue=gn.CDMCleanupPromise?[gn.CDMCleanupPromise]:[],this.onMediaEncrypted=this._onMediaEncrypted.bind(this),this.onWaitingForKey=this._onWaitingForKey.bind(this),this.debug=A.debug.bind(A,fn),this.log=A.log.bind(A,fn),this.warn=A.warn.bind(A,fn),this.error=A.error.bind(A,fn),this.hls=t,this.config=t.config,this.registerListeners()}destroy(){this.unregisterListeners(),this.onMediaDetached()
const t=this.config
t.requestMediaKeySystemAccessFunc=null,t.licenseXhrSetup=t.licenseResponseCallback=void 0,t.drmSystems=t.drmSystemOptions={},this.hls=this.onMediaEncrypted=this.onWaitingForKey=this.keyIdToKeySessionPromise=null,this.config=null}registerListeners(){this.hls.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.on(p.MEDIA_DETACHED,this.onMediaDetached,this),this.hls.on(p.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.on(p.MANIFEST_LOADED,this.onManifestLoaded,this)}unregisterListeners(){this.hls.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),this.hls.off(p.MEDIA_DETACHED,this.onMediaDetached,this),this.hls.off(p.MANIFEST_LOADING,this.onManifestLoading,this),this.hls.off(p.MANIFEST_LOADED,this.onManifestLoaded,this)}getLicenseServerUrl(t){const{drmSystems:e,widevineLicenseUrl:s}=this.config,i=e[t]
if(i)return i.licenseUrl
if(t===N.WIDEVINE&&s)return s
throw new Error(`no license server URL configured for key-system "${t}"`)}getServerCertificateUrl(t){const{drmSystems:e}=this.config,s=e[t]
if(s)return s.serverCertificateUrl
this.log(`No Server Certificate in config.drmSystems["${t}"]`)}attemptKeySystemAccess(t){const e=this.hls.levels,s=(t,e,s)=>!!t&&s.indexOf(t)===e,i=e.map((t=>t.audioCodec)).filter(s),r=e.map((t=>t.videoCodec)).filter(s)
return i.length+r.length===0&&r.push("avc1.42e01e"),new Promise(((e,s)=>{const n=t=>{const a=t.shift()
this.getMediaKeysPromise(a,i,r).then((t=>e({keySystem:a,mediaKeys:t}))).catch((e=>{t.length?n(t):s(e instanceof mn?e:new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_NO_ACCESS,error:e,fatal:!0},e.message))}))}
n(t)}))}requestMediaKeySystemAccess(t,e){const{requestMediaKeySystemAccessFunc:s}=this.config
if("function"!=typeof s){let t=`Configured requestMediaKeySystemAccess is not a function ${s}`
return null===V&&"http:"===self.location.protocol&&(t=`navigator.requestMediaKeySystemAccess is not available over insecure protocol ${location.protocol}`),Promise.reject(new Error(t))}return s(t,e)}getMediaKeysPromise(t,e,s){const i=function(t,e,s,i){let r
switch(t){case N.FAIRPLAY:r=["cenc","sinf"]
break
case N.WIDEVINE:case N.PLAYREADY:r=["cenc"]
break
case N.CLEARKEY:r=["cenc","keyids"]
break
default:throw new Error(`Unknown key-system: ${t}`)}return function(t,e,s,i){return[{initDataTypes:t,persistentState:i.persistentState||"optional",distinctiveIdentifier:i.distinctiveIdentifier||"optional",sessionTypes:i.sessionTypes||[i.sessionType||"temporary"],audioCapabilities:e.map((t=>({contentType:`audio/mp4; codecs="${t}"`,robustness:i.audioRobustness||"",encryptionScheme:i.audioEncryptionScheme||null}))),videoCapabilities:s.map((t=>({contentType:`video/mp4; codecs="${t}"`,robustness:i.videoRobustness||"",encryptionScheme:i.videoEncryptionScheme||null})))}]}(r,e,s,i)}(t,e,s,this.config.drmSystemOptions),r=this.keySystemAccessPromises[t]
let n=null==r?void 0:r.keySystemAccess
if(!n){this.log(`Requesting encrypted media "${t}" key-system access with config: ${JSON.stringify(i)}`),n=this.requestMediaKeySystemAccess(t,i)
const e=this.keySystemAccessPromises[t]={keySystemAccess:n}
return n.catch((e=>{this.log(`Failed to obtain access to key-system "${t}": ${e}`)})),n.then((s=>{this.log(`Access for key-system "${s.keySystem}" obtained`)
const i=this.fetchServerCertificate(t)
return this.log(`Create media-keys for "${t}"`),e.mediaKeys=s.createMediaKeys().then((e=>(this.log(`Media-keys created for "${t}"`),i.then((s=>s?this.setMediaKeysServerCertificate(e,t,s):e))))),e.mediaKeys.catch((e=>{this.error(`Failed to create media-keys for "${t}"}: ${e}`)})),e.mediaKeys}))}return n.then((()=>r.mediaKeys))}createMediaKeySessionContext({decryptdata:t,keySystem:e,mediaKeys:s}){this.log(`Creating key-system session "${e}" keyId: ${ht.hexDump(t.keyId||[])}`)
const i=s.createSession(),r={decryptdata:t,keySystem:e,mediaKeys:s,mediaKeysSession:i,keyStatus:"status-pending"}
return this.mediaKeySessions.push(r),r}renewKeySession(t){const e=t.decryptdata
if(e.pssh){const s=this.createMediaKeySessionContext(t),i=this.getKeyIdString(e),r="cenc"
this.keyIdToKeySessionPromise[i]=this.generateRequestWithPreferredKeySession(s,r,e.pssh,"expired")}else this.warn("Could not renew expired session. Missing pssh initData.")
this.removeSession(t)}getKeyIdString(t){if(!t)throw new Error("Could not read keyId of undefined decryptdata")
if(null===t.keyId)throw new Error("keyId is null")
return ht.hexDump(t.keyId)}updateKeySession(t,e){var s
const i=t.mediaKeysSession
return this.log(`Updating key-session "${i.sessionId}" for keyID ${ht.hexDump((null==(s=t.decryptdata)?void 0:s.keyId)||[])}\n      } (data length: ${e?e.byteLength:e})`),i.update(e)}selectKeySystemFormat(t){const e=Object.keys(t.levelkeys||{})
return this.keyFormatPromise||(this.log(`Selecting key-system from fragment (sn: ${t.sn} ${t.type}: ${t.level}) key formats ${e.join(", ")}`),this.keyFormatPromise=this.getKeyFormatPromise(e)),this.keyFormatPromise}getKeyFormatPromise(t){return new Promise(((e,s)=>{const i=H(this.config),r=t.map(B).filter((t=>!!t&&-1!==i.indexOf(t)))
return this.getKeySystemSelectionPromise(r).then((({keySystem:t})=>{const i=K(t)
i?e(i):s(new Error(`Unable to find format for key-system "${t}"`))})).catch(s)}))}loadKey(t){const e=t.keyInfo.decryptdata,s=this.getKeyIdString(e),i=`(keyId: ${s} format: "${e.keyFormat}" method: ${e.method} uri: ${e.uri})`
this.log(`Starting session for key ${i}`)
let r=this.keyIdToKeySessionPromise[s]
return r||(r=this.keyIdToKeySessionPromise[s]=this.getKeySystemForKeyPromise(e).then((({keySystem:s,mediaKeys:r})=>(this.throwIfDestroyed(),this.log(`Handle encrypted media sn: ${t.frag.sn} ${t.frag.type}: ${t.frag.level} using key ${i}`),this.attemptSetMediaKeys(s,r).then((()=>{this.throwIfDestroyed()
const t=this.createMediaKeySessionContext({keySystem:s,mediaKeys:r,decryptdata:e})
return this.generateRequestWithPreferredKeySession(t,"cenc",e.pssh,"playlist-key")}))))),r.catch((t=>this.handleError(t)))),r}throwIfDestroyed(t="Invalid state"){if(!this.hls)throw new Error("invalid state")}handleError(t){this.hls&&(this.error(t.message),t instanceof mn?this.hls.trigger(p.ERROR,t.data):this.hls.trigger(p.ERROR,{type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_NO_KEYS,error:t,fatal:!0}))}getKeySystemForKeyPromise(t){const e=this.getKeyIdString(t),s=this.keyIdToKeySessionPromise[e]
if(!s){const e=B(t.keyFormat),s=e?[e]:H(this.config)
return this.attemptKeySystemAccess(s)}return s}getKeySystemSelectionPromise(t){if(t.length||(t=H(this.config)),0===t.length)throw new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_NO_CONFIGURED_LICENSE,fatal:!0},`Missing key-system license configuration options ${JSON.stringify({drmSystems:this.config.drmSystems})}`)
return this.attemptKeySystemAccess(t)}_onMediaEncrypted(t){const{initDataType:e,initData:s}=t,i=`"${t.type}" event: init data type: "${e}"`
if(this.debug(i),null===s)return
let r,n
if("sinf"===e&&this.config.drmSystems[N.FAIRPLAY]){const e=ft(new Uint8Array(s))
try{const t=M(JSON.parse(e).sinf),s=Dt(new Uint8Array(t))
if(!s)throw new Error("'schm' box missing or not cbcs/cenc with schi > tenc")
r=s.subarray(8,24),n=N.FAIRPLAY}catch(t){return void this.warn(`${i} Failed to parse sinf: ${t}`)}}else{const t=function(t){const e=[]
if(t instanceof ArrayBuffer){const s=t.byteLength
let i=0
for(;i+32<s;){const s=Pt(new DataView(t,i))
e.push(s),i+=s.size}}return e}(s),e=t.filter((t=>t.systemId===$))[0]
if(!e)return void(0===t.length||t.some((t=>!t.systemId))?this.warn(`${i} contains incomplete or invalid pssh data`):this.log(`ignoring ${i} for ${t.map((t=>G(t.systemId))).join(",")} pssh data in favor of playlist keys`))
if(n=G(e.systemId),0===e.version&&e.data){const t=e.data.length-22
r=e.data.subarray(t,t+16)}}if(!n||!r)return
const a=ht.hexDump(r),{keyIdToKeySessionPromise:o,mediaKeySessions:l}=this
let h=o[a]
for(let d=0;d<l.length;d++){const t=l[d],i=t.decryptdata
if(!i.keyId)continue
const n=ht.hexDump(i.keyId)
if(a===n||-1!==i.uri.replace(/-/g,"").indexOf(a)){if(h=o[n],i.pssh)break
delete o[n],i.pssh=new Uint8Array(s),i.keyId=r,h=o[a]=h.then((()=>this.generateRequestWithPreferredKeySession(t,e,s,"encrypted-event-key-match")))
break}}h||(h=o[a]=this.getKeySystemSelectionPromise([n]).then((({keySystem:t,mediaKeys:i})=>{var n
this.throwIfDestroyed()
const o=new Ft("ISO-23001-7",a,null!=(n=K(t))?n:"")
return o.pssh=new Uint8Array(s),o.keyId=r,this.attemptSetMediaKeys(t,i).then((()=>{this.throwIfDestroyed()
const r=this.createMediaKeySessionContext({decryptdata:o,keySystem:t,mediaKeys:i})
return this.generateRequestWithPreferredKeySession(r,e,s,"encrypted-event-no-match")}))}))),h.catch((t=>this.handleError(t)))}_onWaitingForKey(t){this.log(`"${t.type}" event`)}attemptSetMediaKeys(t,e){const s=this.setMediaKeysQueue.slice()
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
const h=new sr,d=t._onmessage=e=>{const s=t.mediaKeysSession
if(!s)return void h.emit("error",new Error("invalid state"))
const{messageType:i,message:r}=e
this.log(`"${i}" message event for session "${s.sessionId}" message size: ${r.byteLength}`),"license-request"===i||"license-renewal"===i?this.renewLicense(t,r).catch((t=>{this.handleError(t),h.emit("error",t)})):"license-release"===i?t.keySystem===N.FAIRPLAY&&(this.updateKeySession(t,F("acknowledged")),this.removeSession(t)):this.warn(`unhandled media key message type "${i}"`)},c=t._onkeystatuseschange=e=>{if(!t.mediaKeysSession)return void h.emit("error",new Error("invalid state"))
this.onKeyStatusChange(t)
const s=t.keyStatus
h.emit("keyStatus",s),"expired"===s&&(this.warn(`${t.keySystem} expired for key ${l}`),this.renewKeySession(t))}
t.mediaKeysSession.addEventListener("message",d),t.mediaKeysSession.addEventListener("keystatuseschange",c)
const u=new Promise(((t,e)=>{h.on("error",e),h.on("keyStatus",(s=>{s.startsWith("usable")?t():"output-restricted"===s?e(new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_STATUS_OUTPUT_RESTRICTED,fatal:!1},"HDCP level output restricted")):"internal-error"===s?e(new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_STATUS_INTERNAL_ERROR,fatal:!0},`key status changed to "${s}"`)):"expired"===s?e(new Error("key expired while generating request")):this.warn(`unhandled key status change "${s}"`)}))}))
return t.mediaKeysSession.generateRequest(e,s).then((()=>{var e
this.log(`Request generated for key-session "${null==(e=t.mediaKeysSession)?void 0:e.sessionId}" keyId: ${l}`)})).catch((t=>{throw new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_NO_SESSION,error:t,fatal:!1},`Error generating key-session request: ${t}`)})).then((()=>u)).catch((e=>{throw h.removeAllListeners(),this.removeSession(t),e})).then((()=>(h.removeAllListeners(),t)))}onKeyStatusChange(t){t.mediaKeysSession.keyStatuses.forEach(((e,s)=>{this.log(`key status change "${e}" for keyStatuses keyId: ${ht.hexDump("buffer"in s?new Uint8Array(s.buffer,s.byteOffset,s.byteLength):new Uint8Array(s))} session keyId: ${ht.hexDump(new Uint8Array(t.decryptdata.keyId||[]))} uri: ${t.decryptdata.uri}`),t.keyStatus=e}))}fetchServerCertificate(t){const e=this.config,s=new(0,e.loader)(e),i=this.getServerCertificateUrl(t)
return i?(this.log(`Fetching server certificate for "${t}"`),new Promise(((r,n)=>{const a={responseType:"arraybuffer",url:i},o=e.certLoadPolicy.default,l={loadPolicy:o,timeout:o.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0},h={onSuccess:(t,e,s,i)=>{r(t.data)},onError:(e,s,r,o)=>{n(new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,fatal:!0,networkDetails:r,response:c({url:a.url,data:void 0},e)},`"${t}" certificate request failed (${i}). Status: ${e.code} (${e.text})`))},onTimeout:(e,s,r)=>{n(new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_SERVER_CERTIFICATE_REQUEST_FAILED,fatal:!0,networkDetails:r,response:{url:a.url,data:void 0}},`"${t}" certificate request timed out (${i})`))},onAbort:(t,e,s)=>{n(new Error("aborted"))}}
s.load(a,l,h)}))):Promise.resolve()}setMediaKeysServerCertificate(t,e,s){return new Promise(((i,r)=>{t.setServerCertificate(s).then((r=>{this.log(`setServerCertificate ${r?"success":"not supported by CDM"} (${null==s?void 0:s.byteLength}) on "${e}"`),i(t)})).catch((t=>{r(new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_SERVER_CERTIFICATE_UPDATE_FAILED,error:t,fatal:!0},t.message))}))}))}renewLicense(t,e){return this.requestLicense(t,new Uint8Array(e)).then((e=>this.updateKeySession(t,new Uint8Array(e)).catch((t=>{throw new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_SESSION_UPDATE_FAILED,error:t,fatal:!0},t.message)}))))}unpackPlayReadyKeyMessage(t,e){const s=String.fromCharCode.apply(null,new Uint16Array(e.buffer))
if(!s.includes("PlayReadyKeyMessage"))return t.setRequestHeader("Content-Type","text/xml; charset=utf-8"),e
const i=(new DOMParser).parseFromString(s,"application/xml"),r=i.querySelectorAll("HttpHeader")
if(r.length>0){let e
for(let s=0,i=r.length;s<i;s++){var n,a
e=r[s]
const i=null==(n=e.querySelector("name"))?void 0:n.textContent,o=null==(a=e.querySelector("value"))?void 0:a.textContent
i&&o&&t.setRequestHeader(i,o)}}const o=i.querySelector("Challenge"),l=null==o?void 0:o.textContent
if(!l)throw new Error("Cannot find <Challenge> in key message")
return F(atob(l))}setupLicenseXHR(t,e,s,i){const r=this.config.licenseXhrSetup
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
if(this._requestLicenseFailureCount++,this._requestLicenseFailureCount>l||a.status>=400&&a.status<500)r(new mn({type:y.KEY_SYSTEM_ERROR,details:v.KEY_SYSTEM_LICENSE_REQUEST_FAILED,fatal:!0,networkDetails:a,response:{url:n,data:void 0,code:a.status,text:a.statusText}},`License Request XHR failed (${n}). Status: ${a.status} (${a.statusText})`))
else{const s=l-this._requestLicenseFailureCount+1
this.warn(`Retrying license request, ${s} attempts left`),this.requestLicense(t,e).then(i,r)}}},t.licenseXhr&&t.licenseXhr.readyState!==XMLHttpRequest.DONE&&t.licenseXhr.abort(),t.licenseXhr=a,this.setupLicenseXHR(a,n,t,e).then((({xhr:e,licenseChallenge:s})=>{t.keySystem==N.PLAYREADY&&(s=this.unpackPlayReadyKeyMessage(e,s)),e.send(s)}))}))}onMediaAttached(t,e){if(!this.config.emeEnabled)return
const s=e.media
this.media=s,s.addEventListener("encrypted",this.onMediaEncrypted),s.addEventListener("waitingforkey",this.onWaitingForKey)}onMediaDetached(){const t=this.media,e=this.mediaKeySessions
t&&(t.removeEventListener("encrypted",this.onMediaEncrypted),t.removeEventListener("waitingforkey",this.onWaitingForKey),this.media=null),this._requestLicenseFailureCount=0,this.setMediaKeysQueue=[],this.mediaKeySessions=[],this.keyIdToKeySessionPromise={},Ft.clearKeyUriToKeyIdMap()
const s=e.length
gn.CDMCleanupPromise=Promise.all(e.map((t=>this.removeSession(t))).concat(null==t?void 0:t.setMediaKeys(null).catch((t=>{this.log(`Could not clear media keys: ${t}`)})))).then((()=>{s&&(this.log("finished closing key sessions and clearing media keys"),e.length=0)})).catch((t=>{this.log(`Could not close sessions and clear media keys: ${t}`)}))}onManifestLoading(){this.keyFormatPromise=null}onManifestLoaded(t,{sessionKeys:e}){if(e&&this.config.emeEnabled&&!this.keyFormatPromise){const t=e.reduce(((t,e)=>(-1===t.indexOf(e.keyFormat)&&t.push(e.keyFormat),t)),[])
this.log(`Selecting key-system from session-keys ${t.join(", ")}`),this.keyFormatPromise=this.getKeyFormatPromise(t)}}removeSession(t){const{mediaKeysSession:e,licenseXhr:s}=t
if(e){this.log(`Remove licenses and keys and close session ${e.sessionId}`),t._onmessage&&(e.removeEventListener("message",t._onmessage),t._onmessage=void 0),t._onkeystatuseschange&&(e.removeEventListener("keystatuseschange",t._onkeystatuseschange),t._onkeystatuseschange=void 0),s&&s.readyState!==XMLHttpRequest.DONE&&s.abort(),t.mediaKeysSession=t.decryptdata=t.licenseXhr=void 0
const i=this.mediaKeySessions.indexOf(t)
return i>-1&&this.mediaKeySessions.splice(i,1),e.remove().catch((t=>{this.log(`Could not remove session: ${t}`)})).then((()=>e.close())).catch((t=>{this.log(`Could not close session: ${t}`)}))}}}gn.CDMCleanupPromise=void 0
class mn extends Error{constructor(t,e){super(e),this.data=void 0,t.error||(t.error=new Error(e)),this.data=t,t.err=t.error}}var pn,yn,vn
!function(t){t.MANIFEST="m",t.AUDIO="a",t.VIDEO="v",t.MUXED="av",t.INIT="i",t.CAPTION="c",t.TIMED_TEXT="tt",t.KEY="k",t.OTHER="o"}(pn||(pn={})),function(t){t.DASH="d",t.HLS="h",t.SMOOTH="s",t.OTHER="o"}(yn||(yn={})),function(t){t.OBJECT="CMCD-Object",t.REQUEST="CMCD-Request",t.SESSION="CMCD-Session",t.STATUS="CMCD-Status"}(vn||(vn={}))
const En={[vn.OBJECT]:["br","d","ot","tb"],[vn.REQUEST]:["bl","dl","mtp","nor","nrr","su"],[vn.SESSION]:["cid","pr","sf","sid","st","v"],[vn.STATUS]:["bs","rtp"]}
class Tn{constructor(t,e){this.value=void 0,this.params=void 0,Array.isArray(t)&&(t=t.map((t=>t instanceof Tn?t:new Tn(t)))),this.value=t,this.params=e}}class Sn{constructor(t){this.description=void 0,this.description=t}}const An="Bare Item",Ln="Boolean",Rn="Byte Sequence",bn="Decimal",Dn="Integer",kn=/[\x00-\x1f\x7f]+/,In="Token",Cn="Key"
function wn(t,e,s){return function(t,e,s,i){return new Error(`failed to serialize "${r=e,Array.isArray(r)?JSON.stringify(r):r instanceof Map?"Map{}":r instanceof Set?"Set{}":"object"==typeof r?JSON.stringify(r):String(r)}" as ${s}`,{cause:i})
var r}(0,t,e,s)}function _n(t){if(function(t){return t<-999999999999999||999999999999999<t}(t))throw wn(t,Dn)
return t.toString()}function xn(t,e){if(t<0)return-xn(-t,e)
const s=Math.pow(10,e)
if(Math.abs(t*s%1-.5)<Number.EPSILON){const e=Math.floor(t*s)
return(e%2==0?e:e+1)/s}return Math.round(t*s)/s}function Pn(t){const e=xn(t,3)
if(Math.floor(Math.abs(e)).toString().length>12)throw wn(t,bn)
const s=e.toString()
return s.includes(".")?s:`${s}.0`}const Mn="String"
function Fn(t){const e=(s=t).description||s.toString().slice(7,-1)
var s
if(!1===/^([a-zA-Z*])([!#$%&'*+\-.^_`|~\w:/]*)$/.test(e))throw wn(e,In)
return e}function On(t){switch(typeof t){case"number":if(!f(t))throw wn(t,An)
return Number.isInteger(t)?_n(t):Pn(t)
case"string":return function(t){if(kn.test(t))throw wn(t,Mn)
return`"${t.replace(/\\/g,"\\\\").replace(/"/g,'\\"')}"`}(t)
case"symbol":return Fn(t)
case"boolean":return function(t){if("boolean"!=typeof t)throw wn(t,Ln)
return t?"?1":"?0"}(t)
case"object":if(t instanceof Date)return function(t){return`@${_n(t.getTime()/1e3)}`}(t)
if(t instanceof Uint8Array)return function(t){if(!1===ArrayBuffer.isView(t))throw wn(t,Rn)
return`:${e=t,btoa(String.fromCharCode(...e))}:`
var e}(t)
if(t instanceof Sn)return Fn(t)
default:throw wn(t,An)}}function Nn(t){if(!1===/^[a-z*][a-z0-9\-_.*]*$/.test(t))throw wn(t,Cn)
return t}function Un(t){return null==t?"":Object.entries(t).map((([t,e])=>!0===e?`;${Nn(t)}`:`;${Nn(t)}=${On(e)}`)).join("")}function Bn(t){return t instanceof Tn?`${On(t.value)}${Un(t.params)}`:On(t)}const $n=t=>Math.round(t),Gn=t=>100*$n(t/100),Kn={br:$n,d:$n,bl:Gn,dl:Gn,mtp:Gn,nor:(t,e)=>(null!=e&&e.baseUrl&&(t=function(t,e){const s=new URL(t),i=new URL(e)
if(s.origin!==i.origin)return t
const r=s.pathname.split("/").slice(1),n=i.pathname.split("/").slice(1,-1)
for(;r[0]===n[0];)r.shift(),n.shift()
for(;n.length;)n.shift(),r.unshift("..")
return r.join("/")}(t,e.baseUrl)),encodeURIComponent(t)),rtp:Gn,tb:$n}
function Hn(t,e={}){return t?function(t,e){return function(t,e={whitespace:!0}){if("object"!=typeof t)throw wn(t,"Dict")
const s=t instanceof Map?t.entries():Object.entries(t),i=null!=e&&e.whitespace?" ":""
return Array.from(s).map((([t,e])=>{e instanceof Tn==0&&(e=new Tn(e))
let s=Nn(t)
var i
return!0===e.value?s+=Un(e.params):(s+="=",Array.isArray(e.value)?s+=`(${(i=e).value.map(Bn).join(" ")})${Un(i.params)}`:s+=Bn(e)),s})).join(`,${i}`)}(t,e)}(function(t,e){const s={}
if(null==t||"object"!=typeof t)return s
const i=Object.keys(t).sort(),r=u({},Kn,null==e?void 0:e.formatters),n=null==e?void 0:e.filter
return i.forEach((i=>{if(null!=n&&n(i))return
let a=t[i]
const o=r[i]
o&&(a=o(a,e)),"v"===i&&1===a||"pr"==i&&1===a||(t=>"number"==typeof t?f(t):null!=t&&""!==t&&!1!==t)(a)&&((t=>"ot"===t||"sf"===t||"st"===t)(i)&&"string"==typeof a&&(a=new Sn(a)),s[i]=a)})),s}(t,e),u({whitespace:!1},e)):""}const Vn=/CMCD=[^&#]+/
class Yn{constructor(t){this.hls=void 0,this.config=void 0,this.media=void 0,this.sid=void 0,this.cid=void 0,this.useHeaders=!1,this.includeKeys=void 0,this.initialized=!1,this.starved=!1,this.buffering=!0,this.audioBuffer=void 0,this.videoBuffer=void 0,this.onWaiting=()=>{this.initialized&&(this.starved=!0),this.buffering=!0},this.onPlaying=()=>{this.initialized||(this.initialized=!0),this.buffering=!1},this.applyPlaylistData=t=>{try{this.apply(t,{ot:pn.MANIFEST,su:!this.initialized})}catch(t){A.warn("Could not generate manifest CMCD data.",t)}},this.applyFragmentData=t=>{try{const e=t.frag,s=this.hls.levels[e.level],i=this.getObjectType(e),r={d:1e3*e.duration,ot:i}
i!==pn.VIDEO&&i!==pn.AUDIO&&i!=pn.MUXED||(r.br=s.bitrate/1e3,r.tb=this.getTopBandwidth(i)/1e3,r.bl=this.getBufferLength(i)),this.apply(t,r)}catch(t){A.warn("Could not generate segment CMCD data.",t)}},this.hls=t
const e=this.config=t.config,{cmcd:s}=e
null!=s&&(e.pLoader=this.createPlaylistLoader(),e.fLoader=this.createFragmentLoader(),this.sid=s.sessionId||function(){try{return crypto.randomUUID()}catch(t){try{const t=URL.createObjectURL(new Blob),e=t.toString()
return URL.revokeObjectURL(t),e.slice(e.lastIndexOf("/")+1)}catch(t){let s=(new Date).getTime()
return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,(t=>{const e=(s+16*Math.random())%16|0
return s=Math.floor(s/16),("x"==t?e:3&e|8).toString(16)}))}}}(),this.cid=s.contentId,this.useHeaders=!0===s.useHeaders,this.includeKeys=s.includeKeys,this.registerListeners())}registerListeners(){const t=this.hls
t.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(p.MEDIA_DETACHED,this.onMediaDetached,this),t.on(p.BUFFER_CREATED,this.onBufferCreated,this)}unregisterListeners(){const t=this.hls
t.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(p.MEDIA_DETACHED,this.onMediaDetached,this),t.off(p.BUFFER_CREATED,this.onBufferCreated,this)}destroy(){this.unregisterListeners(),this.onMediaDetached(),this.hls=this.config=this.audioBuffer=this.videoBuffer=null,this.onWaiting=this.onPlaying=null}onMediaAttached(t,e){this.media=e.media,this.media.addEventListener("waiting",this.onWaiting),this.media.addEventListener("playing",this.onPlaying)}onMediaDetached(){this.media&&(this.media.removeEventListener("waiting",this.onWaiting),this.media.removeEventListener("playing",this.onPlaying),this.media=null)}onBufferCreated(t,e){var s,i
this.audioBuffer=null==(s=e.tracks.audio)?void 0:s.buffer,this.videoBuffer=null==(i=e.tracks.video)?void 0:i.buffer}createData(){var t
return{v:1,sf:yn.HLS,sid:this.sid,cid:this.cid,pr:null==(t=this.media)?void 0:t.playbackRate,mtp:this.hls.bandwidthEstimate/1e3}}apply(t,e={}){u(e,this.createData())
const s=e.ot===pn.INIT||e.ot===pn.VIDEO||e.ot===pn.MUXED
this.starved&&s&&(e.bs=!0,e.su=!0,this.starved=!1),null==e.su&&(e.su=this.buffering)
const{includeKeys:i}=this
i&&(e=Object.keys(e).reduce(((t,s)=>(i.includes(s)&&(t[s]=e[s]),t)),{})),this.useHeaders?(t.headers||(t.headers={}),u(t.headers,function(t,e={}){if(!t)return{}
const s=Object.entries(t),i=Object.entries(En).concat(Object.entries((null==e?void 0:e.customHeaderMap)||{})),r=s.reduce(((t,e)=>{var s
const[r,n]=e,a=(null==(s=i.find((t=>t[1].includes(r))))?void 0:s[0])||vn.REQUEST
return null!=t[a]||(t[a]={}),t[a][r]=n,t}),{})
return Object.entries(r).reduce(((t,[s,i])=>(t[s]=Hn(i,e),t)),{})}(e,undefined))):t.url=function(t,e,s){const i=function(t,e={}){if(!t)return""
const s=Hn(t,e)
return`CMCD=${encodeURIComponent(s)}`}(e,void 0)
if(!i)return t
if(Vn.test(t))return t.replace(Vn,i)
const r=t.includes("?")?"&":"?"
return`${t}${r}${i}`}(t.url,e)}getObjectType(t){const{type:e}=t
return"subtitle"===e?pn.TIMED_TEXT:"initSegment"===t.sn?pn.INIT:"audio"===e?pn.AUDIO:"main"===e?this.hls.audioTracks.length?pn.VIDEO:pn.MUXED:void 0}getTopBandwidth(t){let e,s=0
const i=this.hls
if(t===pn.AUDIO)e=i.audioTracks
else{const t=i.maxAutoLevel,s=t>-1?t+1:i.levels.length
e=i.levels.slice(0,s)}for(const r of e)r.bitrate>s&&(s=r.bitrate)
return s>0?s:NaN}getBufferLength(t){const e=this.hls.media,s=t===pn.AUDIO?this.audioBuffer:this.videoBuffer
return s&&e?1e3*Ls.bufferInfo(s,e.currentTime,this.config.maxBufferHole).len:NaN}createPlaylistLoader(){const{pLoader:t}=this.config,e=this.applyPlaylistData,s=t||this.config.loader
return class{constructor(t){this.loader=void 0,this.loader=new s(t)}get stats(){return this.loader.stats}get context(){return this.loader.context}destroy(){this.loader.destroy()}abort(){this.loader.abort()}load(t,s,i){e(t),this.loader.load(t,s,i)}}}createFragmentLoader(){const{fLoader:t}=this.config,e=this.applyFragmentData,s=t||this.config.loader
return class{constructor(t){this.loader=void 0,this.loader=new s(t)}get stats(){return this.loader.stats}get context(){return this.loader.context}destroy(){this.loader.destroy()}abort(){this.loader.abort()}load(t,s,i){e(t),this.loader.load(t,s,i)}}}}class Wn{constructor(t){this.hls=void 0,this.log=void 0,this.loader=null,this.uri=null,this.pathwayId=".",this.pathwayPriority=null,this.timeToLoad=300,this.reloadTimer=-1,this.updated=0,this.started=!1,this.enabled=!0,this.levels=null,this.audioTracks=null,this.subtitleTracks=null,this.penalizedPathways={},this.hls=t,this.log=A.log.bind(A,"[content-steering]:"),this.registerListeners()}registerListeners(){const t=this.hls
t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.MANIFEST_LOADED,this.onManifestLoaded,this),t.on(p.MANIFEST_PARSED,this.onManifestParsed,this),t.on(p.ERROR,this.onError,this)}unregisterListeners(){const t=this.hls
t&&(t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.MANIFEST_LOADED,this.onManifestLoaded,this),t.off(p.MANIFEST_PARSED,this.onManifestParsed,this),t.off(p.ERROR,this.onError,this))}startLoad(){if(this.started=!0,this.clearTimeout(),this.enabled&&this.uri){if(this.updated){const t=1e3*this.timeToLoad-(performance.now()-this.updated)
if(t>0)return void this.scheduleRefresh(this.uri,t)}this.loadSteeringManifest(this.uri)}}stopLoad(){this.started=!1,this.loader&&(this.loader.destroy(),this.loader=null),this.clearTimeout()}clearTimeout(){-1!==this.reloadTimer&&(self.clearTimeout(this.reloadTimer),this.reloadTimer=-1)}destroy(){this.unregisterListeners(),this.stopLoad(),this.hls=null,this.levels=this.audioTracks=this.subtitleTracks=null}removeLevel(t){const e=this.levels
e&&(this.levels=e.filter((e=>e!==t)))}onManifestLoading(){this.stopLoad(),this.enabled=!0,this.timeToLoad=300,this.updated=0,this.uri=null,this.pathwayId=".",this.levels=this.audioTracks=this.subtitleTracks=null}onManifestLoaded(t,e){const{contentSteering:s}=e
null!==s&&(this.pathwayId=s.pathwayId,this.uri=s.uri,this.started&&this.startLoad())}onManifestParsed(t,e){this.audioTracks=e.audioTracks,this.subtitleTracks=e.subtitleTracks}onError(t,e){const{errorAction:s}=e
if((null==s?void 0:s.action)===Je.SendAlternateToPenaltyBox&&s.flags===Ze.MoveAllAlternatesMatchingHost){const t=this.levels
let i=this.pathwayPriority,r=this.pathwayId
if(e.context){const{groupId:s,pathwayId:i,type:n}=e.context
s&&t?r=this.getPathwayForGroupId(s,n,r):i&&(r=i)}r in this.penalizedPathways||(this.penalizedPathways[r]=performance.now()),!i&&t&&(i=t.reduce(((t,e)=>(-1===t.indexOf(e.pathwayId)&&t.push(e.pathwayId),t)),[])),i&&i.length>1&&(this.updatePathwayPriority(i),s.resolved=this.pathwayId!==r),s.resolved||A.warn(`Could not resolve ${e.details} ("${e.error.message}") with content-steering for Pathway: ${r} levels: ${t?t.length:t} priorities: ${JSON.stringify(i)} penalized: ${JSON.stringify(this.penalizedPathways)}`)}}filterParsedLevels(t){this.levels=t
let e=this.getLevelsForPathway(this.pathwayId)
if(0===e.length){const s=t[0].pathwayId
this.log(`No levels found in Pathway ${this.pathwayId}. Setting initial Pathway to "${s}"`),e=this.getLevelsForPathway(s),this.pathwayId=s}return e.length!==t.length?(this.log(`Found ${e.length}/${t.length} levels in Pathway "${this.pathwayId}"`),e):t}getLevelsForPathway(t){return null===this.levels?[]:this.levels.filter((e=>t===e.pathwayId))}updatePathwayPriority(t){let e
this.pathwayPriority=t
const s=this.penalizedPathways,i=performance.now()
Object.keys(s).forEach((t=>{i-s[t]>3e5&&delete s[t]}))
for(let r=0;r<t.length;r++){const i=t[r]
if(i in s)continue
if(i===this.pathwayId)return
const n=this.hls.nextLoadLevel,a=this.hls.levels[n]
if(e=this.getLevelsForPathway(i),e.length>0){this.log(`Setting Pathway to "${i}"`),this.pathwayId=i,Ke(e),this.hls.trigger(p.LEVELS_UPDATED,{levels:e})
const t=this.hls.levels[n]
a&&t&&this.levels&&(t.attrs["STABLE-VARIANT-ID"]!==a.attrs["STABLE-VARIANT-ID"]&&t.bitrate!==a.bitrate&&this.log(`Unstable Pathways change from bitrate ${a.bitrate} to ${t.bitrate}`),this.hls.nextLoadLevel=n)
break}}}getPathwayForGroupId(t,e,s){const i=this.getLevelsForPathway(s).concat(this.levels||[])
for(let r=0;r<i.length;r++)if(e===ue.AUDIO_TRACK&&i[r].hasAudioGroup(t)||e===ue.SUBTITLE_TRACK&&i[r].hasSubtitleGroup(t))return i[r].pathwayId
return s}clonePathways(t){const e=this.levels
if(!e)return
const s={},i={}
t.forEach((t=>{const{ID:r,"BASE-ID":n,"URI-REPLACEMENT":a}=t
if(e.some((t=>t.pathwayId===r)))return
const o=this.getLevelsForPathway(n).map((t=>{const e=new b(t.attrs)
e["PATHWAY-ID"]=r
const n=e.AUDIO&&`${e.AUDIO}_clone_${r}`,o=e.SUBTITLES&&`${e.SUBTITLES}_clone_${r}`
n&&(s[e.AUDIO]=n,e.AUDIO=n),o&&(i[e.SUBTITLES]=o,e.SUBTITLES=o)
const l=qn(t.uri,e["STABLE-VARIANT-ID"],"PER-VARIANT-URIS",a),h=new Me({attrs:e,audioCodec:t.audioCodec,bitrate:t.bitrate,height:t.height,name:t.name,url:l,videoCodec:t.videoCodec,width:t.width})
if(t.audioGroups)for(let s=1;s<t.audioGroups.length;s++)h.addGroupId("audio",`${t.audioGroups[s]}_clone_${r}`)
if(t.subtitleGroups)for(let s=1;s<t.subtitleGroups.length;s++)h.addGroupId("text",`${t.subtitleGroups[s]}_clone_${r}`)
return h}))
e.push(...o),jn(this.audioTracks,s,a,r),jn(this.subtitleTracks,i,a,r)}))}loadSteeringManifest(t){const e=this.hls.config,s=e.loader
let i
this.loader&&this.loader.destroy(),this.loader=new s(e)
try{i=new self.URL(t)}catch(e){return this.enabled=!1,void this.log(`Failed to parse Steering Manifest URI: ${t}`)}if("data:"!==i.protocol){const t=0|(this.hls.bandwidthEstimate||e.abrEwmaDefaultEstimate)
i.searchParams.set("_HLS_pathway",this.pathwayId),i.searchParams.set("_HLS_throughput",""+t)}const r={responseType:"json",url:i.href},n=e.steeringManifestLoadPolicy.default,a=n.errorRetry||n.timeoutRetry||{},o={loadPolicy:n,timeout:n.maxLoadTimeMs,maxRetry:a.maxNumRetry||0,retryDelay:a.retryDelayMs||0,maxRetryDelay:a.maxRetryDelayMs||0},l={onSuccess:(t,e,s,r)=>{this.log(`Loaded steering manifest: "${i}"`)
const n=t.data
if(1!==n.VERSION)return void this.log(`Steering VERSION ${n.VERSION} not supported!`)
this.updated=performance.now(),this.timeToLoad=n.TTL
const{"RELOAD-URI":a,"PATHWAY-CLONES":o,"PATHWAY-PRIORITY":l}=n
if(a)try{this.uri=new self.URL(a,i).href}catch(t){return this.enabled=!1,void this.log(`Failed to parse Steering Manifest RELOAD-URI: ${a}`)}this.scheduleRefresh(this.uri||s.url),o&&this.clonePathways(o)
const h={steeringManifest:n,url:i.toString()}
this.hls.trigger(p.STEERING_MANIFEST_LOADED,h),l&&this.updatePathwayPriority(l)},onError:(t,e,s,i)=>{if(this.log(`Error loading steering manifest: ${t.code} ${t.text} (${e.url})`),this.stopLoad(),410===t.code)return this.enabled=!1,void this.log(`Steering manifest ${e.url} no longer available`)
let r=1e3*this.timeToLoad
if(429!==t.code)this.scheduleRefresh(this.uri||e.url,r)
else{const t=this.loader
if("function"==typeof(null==t?void 0:t.getResponseHeader)){const e=t.getResponseHeader("Retry-After")
e&&(r=1e3*parseFloat(e))}this.log(`Steering manifest ${e.url} rate limited`)}},onTimeout:(t,e,s)=>{this.log(`Timeout loading steering manifest (${e.url})`),this.scheduleRefresh(this.uri||e.url)}}
this.log(`Requesting steering manifest: ${i}`),this.loader.load(r,o,l)}scheduleRefresh(t,e=1e3*this.timeToLoad){this.clearTimeout(),this.reloadTimer=self.setTimeout((()=>{var e
const s=null==(e=this.hls)?void 0:e.media
!s||s.ended?this.scheduleRefresh(t,1e3*this.timeToLoad):this.loadSteeringManifest(t)}),e)}}function jn(t,e,s,i){t&&Object.keys(e).forEach((r=>{const n=t.filter((t=>t.groupId===r)).map((t=>{const n=u({},t)
return n.details=void 0,n.attrs=new b(n.attrs),n.url=n.attrs.URI=qn(t.url,t.attrs["STABLE-RENDITION-ID"],"PER-RENDITION-URIS",s),n.groupId=n.attrs["GROUP-ID"]=e[r],n.attrs["PATHWAY-ID"]=i,n}))
t.push(...n)}))}function qn(t,e,s,i){const{HOST:r,PARAMS:n,[s]:a}=i
let o
e&&(o=null==a?void 0:a[e],o&&(t=o))
const l=new self.URL(t)
return r&&!o&&(l.host=r),n&&Object.keys(n).sort().forEach((t=>{t&&l.searchParams.set(t,n[t])})),l.href}const Xn=/^age:\s*[\d.]+\s*$/im
class zn{constructor(t){this.xhrSetup=void 0,this.requestTimeout=void 0,this.retryTimeout=void 0,this.retryDelay=void 0,this.config=null,this.callbacks=null,this.context=null,this.loader=null,this.stats=void 0,this.xhrSetup=t&&t.xhrSetup||null,this.stats=new I,this.retryDelay=0}destroy(){this.callbacks=null,this.abortInternal(),this.loader=null,this.config=null,this.context=null,this.xhrSetup=null}abortInternal(){const t=this.loader
self.clearTimeout(this.requestTimeout),self.clearTimeout(this.retryTimeout),t&&(t.onreadystatechange=null,t.onprogress=null,4!==t.readyState&&(this.stats.aborted=!0,t.abort()))}abort(){var t
this.abortInternal(),null!=(t=this.callbacks)&&t.onAbort&&this.callbacks.onAbort(this.stats,this.context,this.loader)}load(t,e,s){if(this.stats.loading.start)throw new Error("Loader can only be used once.")
this.stats.loading.start=self.performance.now(),this.context=t,this.config=e,this.callbacks=s,this.loadInternal()}loadInternal(){const{config:t,context:e}=this
if(!t||!e)return
const s=this.loader=new self.XMLHttpRequest,i=this.stats
i.loading.first=0,i.loaded=0,i.aborted=!1
const r=this.xhrSetup
r?Promise.resolve().then((()=>{if(this.loader===s&&!this.stats.aborted)return r(s,e.url)})).catch((t=>{if(this.loader===s&&!this.stats.aborted)return s.open("GET",e.url,!0),r(s,e.url)})).then((()=>{this.loader!==s||this.stats.aborted||this.openAndSendXhr(s,e,t)})).catch((t=>{this.callbacks.onError({code:s.status,text:t.message},e,s,i)})):this.openAndSendXhr(s,e,t)}openAndSendXhr(t,e,s){t.readyState||t.open("GET",e.url,!0)
const i=e.headers,{maxTimeToFirstByteMs:r,maxLoadTimeMs:n}=s.loadPolicy
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
je(n,s.retry,!1,{url:t.url,data:void 0,code:i})?this.retry(n):(A.error(`${i} while loading ${t.url}`),this.callbacks.onError({code:i,text:e.statusText},t,e,s))}}}loadtimeout(){if(!this.config)return
const t=this.config.loadPolicy.timeoutRetry
if(je(t,this.stats.retry,!0))this.retry(t)
else{var e
A.warn(`timeout while loading ${null==(e=this.context)?void 0:e.url}`)
const t=this.callbacks
t&&(this.abortInternal(),t.onTimeout(this.stats,this.context,this.loader))}}retry(t){const{context:e,stats:s}=this
this.retryDelay=Ye(t,s.retry),s.retry++,A.warn(`${status?"HTTP Status "+status:"Timeout"} while loading ${null==e?void 0:e.url}, retrying ${s.retry}/${t.maxNumRetry} in ${this.retryDelay}ms`),this.abortInternal(),this.loader=null,self.clearTimeout(this.retryTimeout),this.retryTimeout=self.setTimeout(this.loadInternal.bind(this),this.retryDelay)}loadprogress(t){const e=this.stats
e.loaded=t.loaded,t.lengthComputable&&(e.total=t.total)}getCacheAge(){let t=null
if(this.loader&&Xn.test(this.loader.getAllResponseHeaders())){const e=this.loader.getResponseHeader("age")
t=e?parseFloat(e):null}return t}getResponseHeader(t){return this.loader&&new RegExp(`^${t}:\\s*[\\d.]+\\s*$`,"im").test(this.loader.getAllResponseHeaders())?this.loader.getResponseHeader(t):null}}const Qn=/(\d+)-(\d+)\/(\d+)/
class Jn{constructor(t){this.fetchSetup=void 0,this.requestTimeout=void 0,this.request=null,this.response=null,this.controller=void 0,this.context=null,this.config=null,this.callbacks=null,this.stats=void 0,this.loader=null,this.fetchSetup=t.fetchSetup||Zn,this.controller=new self.AbortController,this.stats=new I}destroy(){this.loader=this.callbacks=this.context=this.config=this.request=null,this.abortInternal(),this.response=null,this.fetchSetup=this.controller=this.stats=null}abortInternal(){this.controller&&!this.stats.loading.end&&(this.stats.aborted=!0,this.controller.abort())}abort(){var t
this.abortInternal(),null!=(t=this.callbacks)&&t.onAbort&&this.callbacks.onAbort(this.stats,this.context,this.response)}load(t,e,s){const i=this.stats
if(i.loading.start)throw new Error("Loader can only be used once.")
i.loading.start=self.performance.now()
const r=function(t,e){const s={method:"GET",mode:"cors",credentials:"same-origin",signal:e,headers:new self.Headers(u({},t.headers))}
return t.rangeEnd&&s.headers.set("Range","bytes="+t.rangeStart+"-"+String(t.rangeEnd-1)),s}(t,this.controller.signal),n=s.onProgress,a="arraybuffer"===t.responseType,o=a?"byteLength":"length",{maxTimeToFirstByteMs:l,maxLoadTimeMs:h}=e.loadPolicy
this.context=t,this.config=e,this.callbacks=s,this.request=this.fetchSetup(t,r),self.clearTimeout(this.requestTimeout),e.timeout=l&&f(l)?l:h,this.requestTimeout=self.setTimeout((()=>{this.abortInternal(),s.onTimeout(i,t,this.response)}),e.timeout),self.fetch(this.request).then((r=>{this.response=this.loader=r
const o=Math.max(self.performance.now(),i.loading.start)
if(self.clearTimeout(this.requestTimeout),e.timeout=h,this.requestTimeout=self.setTimeout((()=>{this.abortInternal(),s.onTimeout(i,t,this.response)}),h-(o-i.loading.start)),!r.ok){const{status:t,statusText:e}=r
throw new ta(e||"fetch, bad network response",t,r)}return i.loading.first=o,i.total=function(t){const e=t.get("Content-Range")
if(e){const t=function(t){const e=Qn.exec(t)
if(e)return parseInt(e[2])-parseInt(e[1])+1}(e)
if(f(t))return t}const s=t.get("Content-Length")
if(s)return parseInt(s)}(r.headers)||i.total,n&&f(e.highWaterMark)?this.loadProgressively(r,i,t,e.highWaterMark,n):a?r.arrayBuffer():"json"===t.responseType?r.json():r.text()})).then((r=>{const a=this.response
if(!a)throw new Error("loader destroyed")
self.clearTimeout(this.requestTimeout),i.loading.end=Math.max(self.performance.now(),i.loading.first)
const l=r[o]
l&&(i.loaded=i.total=l)
const h={url:a.url,data:r,code:a.status}
n&&!f(e.highWaterMark)&&n(i,t,r,a),s.onSuccess(h,i,t,a)})).catch((e=>{if(self.clearTimeout(this.requestTimeout),i.aborted)return
const r=e&&e.code||0,n=e?e.message:null
s.onError({code:r,text:n},t,e?e.details:null,i)}))}getCacheAge(){let t=null
if(this.response){const e=this.response.headers.get("age")
t=e?parseFloat(e):null}return t}getResponseHeader(t){return this.response?this.response.headers.get(t):null}loadProgressively(t,e,s,i=0,r){const n=new Qs,a=t.body.getReader(),o=()=>a.read().then((a=>{if(a.done)return n.dataLength&&r(e,s,n.flush(),t),Promise.resolve(new ArrayBuffer(0))
const l=a.value,h=l.length
return e.loaded+=h,h<i||n.dataLength?(n.push(l),n.dataLength>=i&&r(e,s,n.flush(),t)):r(e,s,l,t),o()})).catch((()=>Promise.reject()))
return o()}}function Zn(t,e){return new self.Request(t.url,e)}class ta extends Error{constructor(t,e,s){super(t),this.code=void 0,this.details=void 0,this.code=e,this.details=s}}const ea=/\s/,sa=c(c({autoStartLoad:!0,startPosition:-1,defaultAudioCodec:void 0,debug:!1,capLevelOnFPSDrop:!1,capLevelToPlayerSize:!1,ignoreDevicePixelRatio:!1,preferManagedMediaSource:!0,initialLiveManifestSize:1,maxBufferLength:30,backBufferLength:1/0,frontBufferFlushThreshold:1/0,maxBufferSize:6e7,maxBufferHole:.1,highBufferWatchdogPeriod:2,nudgeOffset:.1,nudgeMaxRetry:3,maxFragLookUpTolerance:.25,liveSyncDurationCount:3,liveMaxLatencyDurationCount:1/0,liveSyncDuration:void 0,liveMaxLatencyDuration:void 0,maxLiveSyncPlaybackRate:1,liveDurationInfinity:!1,liveBackBufferLength:null,maxMaxBufferLength:600,enableWorker:!0,workerPath:null,enableSoftwareAES:!0,startLevel:void 0,startFragPrefetch:!1,fpsDroppedMonitoringPeriod:5e3,fpsDroppedMonitoringThreshold:.2,appendErrorMaxRetry:3,loader:zn,fLoader:void 0,pLoader:void 0,xhrSetup:void 0,licenseXhrSetup:void 0,licenseResponseCallback:void 0,abrController:fs,bufferController:gr,capLevelController:cn,errorController:ts,fpsController:un,stretchShortVideoTrack:!1,maxAudioFramesDrift:1,forceKeyFrameOnDiscontinuity:!0,abrEwmaFastLive:3,abrEwmaSlowLive:9,abrEwmaFastVoD:3,abrEwmaSlowVoD:9,abrEwmaDefaultEstimate:5e5,abrEwmaDefaultEstimateMax:5e6,abrBandWidthFactor:.95,abrBandWidthUpFactor:.7,abrMaxWithRealBitrate:!1,maxStarvationDelay:4,maxLoadingDelay:4,minAutoBitrate:0,emeEnabled:!1,widevineLicenseUrl:void 0,drmSystems:{},drmSystemOptions:{},requestMediaKeySystemAccessFunc:V,testBandwidth:!0,progressive:!1,lowLatencyMode:!0,cmcd:void 0,enableDateRangeMetadataCues:!0,enableEmsgMetadataCues:!0,enableID3MetadataCues:!0,useMediaCapabilities:!0,certLoadPolicy:{default:{maxTimeToFirstByteMs:8e3,maxLoadTimeMs:2e4,timeoutRetry:null,errorRetry:null}},keyLoadPolicy:{default:{maxTimeToFirstByteMs:8e3,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:2e4,backoff:"linear"},errorRetry:{maxNumRetry:8,retryDelayMs:1e3,maxRetryDelayMs:2e4,backoff:"linear"}}},manifestLoadPolicy:{default:{maxTimeToFirstByteMs:1/0,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},playlistLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:2,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},fragLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:12e4,timeoutRetry:{maxNumRetry:4,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:6,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},steeringManifestLoadPolicy:{default:{maxTimeToFirstByteMs:1e4,maxLoadTimeMs:2e4,timeoutRetry:{maxNumRetry:2,retryDelayMs:0,maxRetryDelayMs:0},errorRetry:{maxNumRetry:1,retryDelayMs:1e3,maxRetryDelayMs:8e3}}},manifestLoadingTimeOut:1e4,manifestLoadingMaxRetry:1,manifestLoadingRetryDelay:1e3,manifestLoadingMaxRetryTimeout:64e3,levelLoadingTimeOut:1e4,levelLoadingMaxRetry:4,levelLoadingRetryDelay:1e3,levelLoadingMaxRetryTimeout:64e3,fragLoadingTimeOut:2e4,fragLoadingMaxRetry:6,fragLoadingRetryDelay:1e3,fragLoadingMaxRetryTimeout:64e3},{cueHandler:{newCue(t,e,s,i){const r=[]
let n,a,o,l,h
const d=self.VTTCue||self.TextTrackCue
for(let u=0;u<i.rows.length;u++)if(n=i.rows[u],o=!0,l=0,h="",!n.isEmpty()){var c
for(let t=0;t<n.chars.length;t++)ea.test(n.chars[t].uchar)&&o?l++:(h+=n.chars[t].uchar,o=!1)
n.cueStartTime=e,e===s&&(s+=1e-4),l>=16?l--:l++
const i=Vr(h.trim()),f=Xr(e,s,i)
null!=t&&null!=(c=t.cues)&&c.getCueById(f)||(a=new d(e,s,i),a.id=f,a.line=u+1,a.align="left",a.position=10+Math.min(80,10*Math.floor(8*l/32)),r.push(a))}return t&&r.length&&(r.sort(((t,e)=>"auto"===t.line||"auto"===e.line?0:t.line>8&&e.line>8?e.line-t.line:t.line-e.line)),r.forEach((e=>ve(t,e)))),r}},enableWebVTT:!0,enableIMSC1:!0,enableCEA708Captions:!0,captionsTextTrack1Label:"English",captionsTextTrack1LanguageCode:"en",captionsTextTrack2Label:"Spanish",captionsTextTrack2LanguageCode:"es",captionsTextTrack3Label:"Unknown CC",captionsTextTrack3LanguageCode:"",captionsTextTrack4Label:"Unknown CC",captionsTextTrack4LanguageCode:"",renderTextTracksNatively:!0}),{},{subtitleStreamController:hr,subtitleTrackController:cr,timelineController:ln,audioStreamController:or,audioTrackController:lr,emeController:gn,cmcdController:Yn,contentSteeringController:Wn})
function ia(t){return t&&"object"==typeof t?Array.isArray(t)?t.map(ia):Object.keys(t).reduce(((e,s)=>(e[s]=ia(t[s]),e)),{}):t}let ra
class na extends es{constructor(t,e){super(t,"[level-controller]"),this._levels=[],this._firstLevel=-1,this._maxAutoLevel=-1,this._startLevel=void 0,this.currentLevel=null,this.currentLevelIndex=-1,this.manualLevelIndex=-1,this.steering=void 0,this.onParsedComplete=void 0,this.steering=e,this._registerListeners()}_registerListeners(){const{hls:t}=this
t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.MANIFEST_LOADED,this.onManifestLoaded,this),t.on(p.LEVEL_LOADED,this.onLevelLoaded,this),t.on(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.on(p.FRAG_BUFFERED,this.onFragBuffered,this),t.on(p.ERROR,this.onError,this)}_unregisterListeners(){const{hls:t}=this
t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.MANIFEST_LOADED,this.onManifestLoaded,this),t.off(p.LEVEL_LOADED,this.onLevelLoaded,this),t.off(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.off(p.FRAG_BUFFERED,this.onFragBuffered,this),t.off(p.ERROR,this.onError,this)}destroy(){this._unregisterListeners(),this.steering=null,this.resetLevels(),super.destroy()}stopLoad(){this._levels.forEach((t=>{t.loadError=0,t.fragmentError=0})),super.stopLoad()}resetLevels(){this._startLevel=void 0,this.manualLevelIndex=-1,this.currentLevelIndex=-1,this.currentLevel=null,this._levels=[],this._maxAutoLevel=-1}onManifestLoading(t,e){this.resetLevels()}onManifestLoaded(t,e){const s=this.hls.config.preferManagedMediaSource,i=[],r={},n={}
let a=!1,o=!1,l=!1
e.levels.forEach((t=>{var e,h
const d=t.attrs
let{audioCodec:c,videoCodec:u}=t;-1!==(null==(e=c)?void 0:e.indexOf("mp4a.40.34"))&&(ra||(ra=/chrome|firefox/i.test(navigator.userAgent)),ra&&(t.audioCodec=c=void 0)),c&&(t.audioCodec=c=Qt(c,s)),0===(null==(h=u)?void 0:h.indexOf("avc1"))&&(u=t.videoCodec=function(t){const e=t.split(",")
for(let s=0;s<e.length;s++){const t=e[s].split(".")
if(t.length>2){let i=t.shift()+"."
i+=parseInt(t.shift()).toString(16),i+=("000"+parseInt(t.shift()).toString(16)).slice(-4),e[s]=i}}return e.join(",")}(u))
const{width:f,height:g,unknownCodecs:m}=t
if(a||(a=!(!f||!g)),o||(o=!!u),l||(l=!!c),null!=m&&m.length||c&&!Vt(c,"audio",s)||u&&!Vt(u,"video",s))return
const{CODECS:p,"FRAME-RATE":y,"HDCP-LEVEL":v,"PATHWAY-ID":E,RESOLUTION:T,"VIDEO-RANGE":S}=d,A=`${E||"."}-${t.bitrate}-${T}-${y}-${p}-${S}-${v}`
if(r[A])if(r[A].uri===t.url||t.attrs["PATHWAY-ID"])r[A].addGroupId("audio",d.AUDIO),r[A].addGroupId("text",d.SUBTITLES)
else{const e=n[A]+=1
t.attrs["PATHWAY-ID"]=new Array(e+1).join(".")
const s=new Me(t)
r[A]=s,i.push(s)}else{const e=new Me(t)
r[A]=e,n[A]=1,i.push(e)}})),this.filterAndSortMediaOptions(i,e,a,o,l)}filterAndSortMediaOptions(t,e,s,i,r){let n=[],a=[],o=t
if((s||i)&&r&&(o=o.filter((({videoCodec:t,videoRange:e,width:s,height:i})=>{return(!!t||!(!s||!i))&&!!(r=e)&&we.indexOf(r)>-1
var r}))),0===o.length)return void Promise.resolve().then((()=>{if(this.hls){e.levels.length&&this.warn(`One or more CODECS in variant not supported: ${JSON.stringify(e.levels[0].attrs)}`)
const t=new Error("no level with compatible codecs found in manifest")
this.hls.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.MANIFEST_INCOMPATIBLE_CODECS_ERROR,fatal:!0,url:e.url,error:t,reason:t.message})}}))
if(e.audioTracks){const{preferManagedMediaSource:t}=this.hls.config
n=e.audioTracks.filter((e=>!e.audioCodec||Vt(e.audioCodec,"audio",t))),aa(n)}e.subtitles&&(a=e.subtitles,aa(a))
const l=o.slice(0)
o.sort(((t,e)=>{if(t.attrs["HDCP-LEVEL"]!==e.attrs["HDCP-LEVEL"])return(t.attrs["HDCP-LEVEL"]||"")>(e.attrs["HDCP-LEVEL"]||"")?1:-1
if(s&&t.height!==e.height)return t.height-e.height
if(t.frameRate!==e.frameRate)return t.frameRate-e.frameRate
if(t.videoRange!==e.videoRange)return we.indexOf(t.videoRange)-we.indexOf(e.videoRange)
if(t.videoCodec!==e.videoCodec){const s=jt(t.videoCodec),i=jt(e.videoCodec)
if(s!==i)return i-s}if(t.uri===e.uri&&t.codecSet!==e.codecSet){const s=qt(t.codecSet),i=qt(e.codecSet)
if(s!==i)return i-s}return t.averageBitrate!==e.averageBitrate?t.averageBitrate-e.averageBitrate:0}))
let h=l[0]
if(this.steering&&(o=this.steering.filterParsedLevels(o),o.length!==l.length))for(let f=0;f<l.length;f++)if(l[f].pathwayId===o[0].pathwayId){h=l[f]
break}this._levels=o
for(let f=0;f<o.length;f++)if(o[f]===h){var d
this._firstLevel=f
const t=h.bitrate,e=this.hls.bandwidthEstimate
if(this.log(`manifest loaded, ${o.length} level(s) found, first bitrate: ${t}`),void 0===(null==(d=this.hls.userConfig)?void 0:d.abrEwmaDefaultEstimate)){const s=Math.min(t,this.hls.config.abrEwmaDefaultEstimateMax)
s>e&&e===sa.abrEwmaDefaultEstimate&&(this.hls.bandwidthEstimate=s)}break}const c=r&&!i,u={levels:o,audioTracks:n,subtitleTracks:a,sessionData:e.sessionData,sessionKeys:e.sessionKeys,firstLevel:this._firstLevel,stats:e.stats,audio:r,video:i,altAudio:!c&&n.some((t=>!!t.url))}
this.hls.trigger(p.MANIFEST_PARSED,u),(this.hls.config.autoStartLoad||this.hls.forceStartLoad)&&this.hls.startLoad(this.hls.config.startPosition)}get levels(){return 0===this._levels.length?null:this._levels}get level(){return this.currentLevelIndex}set level(t){const e=this._levels
if(0===e.length)return
if(t<0||t>=e.length){const s=new Error("invalid level idx"),i=t<0
if(this.hls.trigger(p.ERROR,{type:y.OTHER_ERROR,details:v.LEVEL_SWITCH_ERROR,level:t,fatal:i,error:s,reason:s.message}),i)return
t=Math.min(t,e.length-1)}const s=this.currentLevelIndex,i=this.currentLevel,r=i?i.attrs["PATHWAY-ID"]:void 0,n=e[t],a=n.attrs["PATHWAY-ID"]
if(this.currentLevelIndex=t,this.currentLevel=n,s===t&&n.details&&i&&r===a)return
this.log(`Switching to level ${t} (${n.height?n.height+"p ":""}${n.videoRange?n.videoRange+" ":""}${n.codecSet?n.codecSet+" ":""}@${n.bitrate})${a?" with Pathway "+a:""} from level ${s}${r?" with Pathway "+r:""}`)
const o={level:t,attrs:n.attrs,details:n.details,bitrate:n.bitrate,averageBitrate:n.averageBitrate,maxBitrate:n.maxBitrate,realBitrate:n.realBitrate,width:n.width,height:n.height,codecSet:n.codecSet,audioCodec:n.audioCodec,videoCodec:n.videoCodec,audioGroups:n.audioGroups,subtitleGroups:n.subtitleGroups,loaded:n.loaded,loadError:n.loadError,fragmentError:n.fragmentError,name:n.name,id:n.id,uri:n.uri,url:n.url,urlId:0,audioGroupIds:n.audioGroupIds,textGroupIds:n.textGroupIds}
this.hls.trigger(p.LEVEL_SWITCHING,o)
const l=n.details
if(!l||l.live){const t=this.switchParams(n.uri,null==i?void 0:i.details,l)
this.loadPlaylist(t)}}get manualLevel(){return this.manualLevelIndex}set manualLevel(t){this.manualLevelIndex=t,void 0===this._startLevel&&(this._startLevel=t),-1!==t&&(this.level=t)}get firstLevel(){return this._firstLevel}set firstLevel(t){this._firstLevel=t}get startLevel(){if(void 0===this._startLevel){const t=this.hls.config.startLevel
return void 0!==t?t:this.hls.firstAutoLevel}return this._startLevel}set startLevel(t){this._startLevel=t}onError(t,e){!e.fatal&&e.context&&e.context.type===ue.LEVEL&&e.context.level===this.level&&this.checkRetry(e)}onFragBuffered(t,{frag:e}){if(void 0!==e&&e.type===fe.MAIN){const t=e.elementaryStreams
if(!Object.keys(t).some((e=>!!t[e])))return
const s=this._levels[e.level]
null!=s&&s.loadError&&(this.log(`Resetting level error count of ${s.loadError} on frag buffered`),s.loadError=0)}}onLevelLoaded(t,e){var s
const{level:i,details:r}=e,n=this._levels[i]
var a
if(!n)return this.warn(`Invalid level index ${i}`),void(null!=(a=e.deliveryDirectives)&&a.skip&&(r.deltaUpdateFailed=!0))
i===this.currentLevelIndex?(0===n.fragmentError&&(n.loadError=0),this.playlistLoaded(i,e,n.details)):null!=(s=e.deliveryDirectives)&&s.skip&&(r.deltaUpdateFailed=!0)}loadPlaylist(t){super.loadPlaylist()
const e=this.currentLevelIndex,s=this.currentLevel
if(s&&this.shouldLoadPlaylist(s)){let i=s.uri
if(t)try{i=t.addDirectives(i)}catch(t){this.warn(`Could not construct new URL with HLS Delivery Directives: ${t}`)}const r=s.attrs["PATHWAY-ID"]
this.log(`Loading level index ${e}${void 0!==(null==t?void 0:t.msn)?" at sn "+t.msn+" part "+t.part:""} with${r?" Pathway "+r:""} ${i}`),this.clearTimer(),this.hls.trigger(p.LEVEL_LOADING,{url:i,level:e,pathwayId:s.attrs["PATHWAY-ID"],id:0,deliveryDirectives:t||null})}}get nextLoadLevel(){return-1!==this.manualLevelIndex?this.manualLevelIndex:this.hls.nextAutoLevel}set nextLoadLevel(t){this.level=t,-1===this.manualLevelIndex&&(this.hls.nextAutoLevel=t)}removeLevel(t){var e
const s=this._levels.filter(((e,s)=>s!==t||(this.steering&&this.steering.removeLevel(e),e===this.currentLevel&&(this.currentLevel=null,this.currentLevelIndex=-1,e.details&&e.details.fragments.forEach((t=>t.level=-1))),!1)))
Ke(s),this._levels=s,this.currentLevelIndex>-1&&null!=(e=this.currentLevel)&&e.details&&(this.currentLevelIndex=this.currentLevel.details.fragments[0].level),this.hls.trigger(p.LEVELS_UPDATED,{levels:s})}onLevelsUpdated(t,{levels:e}){this._levels=e}checkMaxAutoUpdated(){const{autoLevelCapping:t,maxAutoLevel:e,maxHdcpLevel:s}=this.hls
this._maxAutoLevel!==e&&(this._maxAutoLevel=e,this.hls.trigger(p.MAX_AUTO_LEVEL_UPDATED,{autoLevelCapping:t,levels:this.levels,maxAutoLevel:e,minAutoLevel:this.hls.minAutoLevel,maxHdcpLevel:s}))}}function aa(t){const e={}
t.forEach((t=>{const s=t.groupId||""
t.id=e[s]=e[s]||0,e[s]++}))}class oa{constructor(t){this.config=void 0,this.keyUriToKeyInfo={},this.emeController=null,this.config=t}abort(t){for(const s in this.keyUriToKeyInfo){const i=this.keyUriToKeyInfo[s].loader
if(i){var e
if(t&&t!==(null==(e=i.context)?void 0:e.frag.type))return
i.abort()}}}detach(){for(const t in this.keyUriToKeyInfo){const e=this.keyUriToKeyInfo[t];(e.mediaKeySessionContext||e.decryptdata.isCommonEncryption)&&delete this.keyUriToKeyInfo[t]}}destroy(){this.detach()
for(const t in this.keyUriToKeyInfo){const e=this.keyUriToKeyInfo[t].loader
e&&e.destroy()}this.keyUriToKeyInfo={}}createKeyLoadError(t,e=v.KEY_LOAD_ERROR,s,i,r){return new Ps({type:y.NETWORK_ERROR,details:e,fatal:!1,frag:t,response:r,error:s,networkDetails:i})}loadClear(t,e){if(this.emeController&&this.config.emeEnabled){const{sn:s,cc:i}=t
for(let t=0;t<e.length;t++){const r=e[t]
if(i<=r.cc&&("initSegment"===s||"initSegment"===r.sn||s<r.sn)){this.emeController.selectKeySystemFormat(r).then((t=>{r.setKeyFormat(t)}))
break}}}}load(t){return!t.decryptdata&&t.encrypted&&this.emeController?this.emeController.selectKeySystemFormat(t).then((e=>this.loadInternal(t,e))):this.loadInternal(t)}loadInternal(t,e){var s,i
e&&t.setKeyFormat(e)
const r=t.decryptdata
if(!r){const s=new Error(e?`Expected frag.decryptdata to be defined after setting format ${e}`:"Missing decryption data on fragment in onKeyLoading")
return Promise.reject(this.createKeyLoadError(t,v.KEY_LOAD_ERROR,s))}const n=r.uri
if(!n)return Promise.reject(this.createKeyLoadError(t,v.KEY_LOAD_ERROR,new Error(`Invalid key URI: "${n}"`)))
let a=this.keyUriToKeyInfo[n]
if(null!=(s=a)&&s.decryptdata.key)return r.key=a.decryptdata.key,Promise.resolve({frag:t,keyInfo:a})
var o
if(null!=(i=a)&&i.keyLoadPromise)switch(null==(o=a.mediaKeySessionContext)?void 0:o.keyStatus){case void 0:case"status-pending":case"usable":case"usable-in-future":return a.keyLoadPromise.then((e=>(r.key=e.keyInfo.decryptdata.key,{frag:t,keyInfo:a})))}switch(a=this.keyUriToKeyInfo[n]={decryptdata:r,keyLoadPromise:null,loader:null,mediaKeySessionContext:null},r.method){case"ISO-23001-7":case"SAMPLE-AES":case"SAMPLE-AES-CENC":case"SAMPLE-AES-CTR":return"identity"===r.keyFormat?this.loadKeyHTTP(a,t):this.loadKeyEME(a,t)
case"AES-128":return this.loadKeyHTTP(a,t)
default:return Promise.reject(this.createKeyLoadError(t,v.KEY_LOAD_ERROR,new Error(`Key supplied with unsupported METHOD: "${r.method}"`)))}}loadKeyEME(t,e){const s={frag:e,keyInfo:t}
if(this.emeController&&this.config.emeEnabled){const e=this.emeController.loadKey(s)
if(e)return(t.keyLoadPromise=e.then((e=>(t.mediaKeySessionContext=e,s)))).catch((e=>{throw t.keyLoadPromise=null,e}))}return Promise.resolve(s)}loadKeyHTTP(t,e){const s=this.config,i=new(0,s.loader)(s)
return e.keyLoader=t.loader=i,t.keyLoadPromise=new Promise(((r,n)=>{const a={keyInfo:t,frag:e,responseType:"arraybuffer",url:t.decryptdata.uri},o=s.keyLoadPolicy.default,l={loadPolicy:o,timeout:o.maxLoadTimeMs,maxRetry:0,retryDelay:0,maxRetryDelay:0},h={onSuccess:(t,e,s,i)=>{const{frag:a,keyInfo:o,url:l}=s
if(!a.decryptdata||o!==this.keyUriToKeyInfo[l])return n(this.createKeyLoadError(a,v.KEY_LOAD_ERROR,new Error("after key load, decryptdata unset or changed"),i))
o.decryptdata.key=a.decryptdata.key=new Uint8Array(t.data),a.keyLoader=null,o.loader=null,r({frag:a,keyInfo:o})},onError:(t,s,i,r)=>{this.resetLoader(s),n(this.createKeyLoadError(e,v.KEY_LOAD_ERROR,new Error(`HTTP Error ${t.code} loading key ${t.text}`),i,c({url:a.url,data:void 0},t)))},onTimeout:(t,s,i)=>{this.resetLoader(s),n(this.createKeyLoadError(e,v.KEY_LOAD_TIMEOUT,new Error("key loading timed out"),i))},onAbort:(t,s,i)=>{this.resetLoader(s),n(this.createKeyLoadError(e,v.INTERNAL_ABORTED,new Error("key loading aborted"),i))}}
i.load(a,l,h)}))}resetLoader(t){const{frag:e,keyInfo:s,url:i}=t,r=s.loader
e.keyLoader===r&&(e.keyLoader=null,s.loader=null),delete this.keyUriToKeyInfo[i],r&&r.destroy()}}function la(){return self.SourceBuffer||self.WebKitSourceBuffer}function ha(){if(!Kt())return!1
const t=la()
return!t||t.prototype&&"function"==typeof t.prototype.appendBuffer&&"function"==typeof t.prototype.remove}function da(){if(!ha())return!1
const t=Kt()
return"function"==typeof(null==t?void 0:t.isTypeSupported)&&(["avc1.42E01E,mp4a.40.2","av01.0.01M.08","vp09.00.50.08"].some((e=>t.isTypeSupported(Wt(e,"video"))))||["mp4a.40.2","fLaC"].some((e=>t.isTypeSupported(Wt(e,"audio")))))}class ca{constructor(t,e,s,i){this.config=void 0,this.media=null,this.fragmentTracker=void 0,this.hls=void 0,this.nudgeRetry=0,this.stallReported=!1,this.stalled=null,this.moved=!1,this.seeking=!1,this.config=t,this.media=e,this.fragmentTracker=s,this.hls=i}destroy(){this.media=null,this.hls=this.fragmentTracker=null}poll(t,e){const{config:s,media:i,stalled:r}=this
if(null===i)return
const{currentTime:n,seeking:a}=i,o=this.seeking&&!a,l=!this.seeking&&a
if(this.seeking=a,n!==t){if(this.moved=!0,a||(this.nudgeRetry=0),null!==r){if(this.stallReported){const t=self.performance.now()-r
A.warn(`playback not stuck anymore @${n}, after ${Math.round(t)}ms`),this.stallReported=!1}this.stalled=null}return}if(l||o)return void(this.stalled=null)
if(i.paused&&!a||i.ended||0===i.playbackRate||!Ls.getBuffered(i).length)return void(this.nudgeRetry=0)
const h=Ls.bufferInfo(i,n,0),d=h.nextStart||0
if(a){const t=h.len>2,s=!d||e&&e.start<=n||d-n>2&&!this.fragmentTracker.getPartialFragment(n)
if(t||s)return
this.moved=!1}if(!this.moved&&null!==this.stalled){var c
if(!(h.len>0||d))return
const t=Math.max(d,h.start||0)-n,e=this.hls.levels?this.hls.levels[this.hls.currentLevel]:null,s=(null==e||null==(c=e.details)?void 0:c.live)?2*e.details.targetduration:2,r=this.fragmentTracker.getPartialFragment(n)
if(t>0&&(t<=s||r))return void(i.paused||this._trySkipBufferHole(r))}const u=self.performance.now()
if(null===r)return void(this.stalled=u)
const f=u-r
if(!a&&f>=250&&(this._reportStall(h),!this.media))return
const g=Ls.bufferInfo(i,n,s.maxBufferHole)
this._tryFixBufferStall(g,f)}_tryFixBufferStall(t,e){const{config:s,fragmentTracker:i,media:r}=this
if(null===r)return
const n=r.currentTime,a=i.getPartialFragment(n);(!a||!this._trySkipBufferHole(a)&&this.media)&&(t.len>s.maxBufferHole||t.nextStart&&t.nextStart-n<s.maxBufferHole)&&e>1e3*s.highBufferWatchdogPeriod&&(A.warn("Trying to nudge playhead over buffer-hole"),this.stalled=null,this._tryNudgeBuffer())}_reportStall(t){const{hls:e,media:s,stallReported:i}=this
if(!i&&s){this.stallReported=!0
const i=new Error(`Playback stalling at @${s.currentTime} due to low buffer (${JSON.stringify(t)})`)
A.warn(i.message),e.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.BUFFER_STALLED_ERROR,fatal:!1,error:i,buffer:t.len})}}_trySkipBufferHole(t){const{config:e,hls:s,media:i}=this
if(null===i)return 0
const r=i.currentTime,n=Ls.bufferInfo(i,r,0),a=r<n.start?n.start:n.nextStart
if(a){const o=n.len<=e.maxBufferHole,l=n.len>0&&n.len<1&&i.readyState<3,h=a-r
if(h>0&&(o||l)){if(h>e.maxBufferHole){const{fragmentTracker:e}=this
let s=!1
if(0===r){const t=e.getAppendedFrag(0,fe.MAIN)
t&&a<t.end&&(s=!0)}if(!s){const s=t||e.getAppendedFrag(r,fe.MAIN)
if(s){let t=!1,i=s.end
for(;i<a;){const s=e.getPartialFragment(i)
if(!s){t=!0
break}i+=s.duration}if(t)return 0}}}const n=Math.max(a+.05,r+.1)
if(A.warn(`skipping hole, adjusting currentTime from ${r} to ${n}`),this.moved=!0,this.stalled=null,i.currentTime=n,t&&!t.gap){const e=new Error(`fragment loaded with buffer holes, seeking from ${r} to ${n}`)
s.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.BUFFER_SEEK_OVER_HOLE,fatal:!1,error:e,reason:e.message,frag:t})}return n}}return 0}_tryNudgeBuffer(){const{config:t,hls:e,media:s,nudgeRetry:i}=this
if(null===s)return
const r=s.currentTime
if(this.nudgeRetry++,i<t.nudgeMaxRetry){const n=r+(i+1)*t.nudgeOffset,a=new Error(`Nudging 'currentTime' from ${r} to ${n}`)
A.warn(a.message),s.currentTime=n,e.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.BUFFER_NUDGE_ON_STALL,error:a,fatal:!1})}else{const s=new Error(`Playhead still not moving while enough data buffered @${r} after ${t.nudgeMaxRetry} nudges`)
A.error(s.message),e.trigger(p.ERROR,{type:y.MEDIA_ERROR,details:v.BUFFER_STALLED_ERROR,error:s,fatal:!0})}}}class ua extends zs{constructor(t,e,s){super(t,e,s,"[stream-controller]",fe.MAIN),this.audioCodecSwap=!1,this.gapController=null,this.level=-1,this._forceStartLoad=!1,this.altAudio=!1,this.audioOnly=!1,this.fragPlaying=null,this.onvplaying=null,this.onvseeked=null,this.fragLastKbps=0,this.couldBacktrack=!1,this.backtrackFragment=null,this.audioCodecSwitch=!1,this.videoBuffer=null,this._registerListeners()}_registerListeners(){const{hls:t}=this
t.on(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.on(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.on(p.MANIFEST_LOADING,this.onManifestLoading,this),t.on(p.MANIFEST_PARSED,this.onManifestParsed,this),t.on(p.LEVEL_LOADING,this.onLevelLoading,this),t.on(p.LEVEL_LOADED,this.onLevelLoaded,this),t.on(p.FRAG_LOAD_EMERGENCY_ABORTED,this.onFragLoadEmergencyAborted,this),t.on(p.ERROR,this.onError,this),t.on(p.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.on(p.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),t.on(p.BUFFER_CREATED,this.onBufferCreated,this),t.on(p.BUFFER_FLUSHED,this.onBufferFlushed,this),t.on(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.on(p.FRAG_BUFFERED,this.onFragBuffered,this)}_unregisterListeners(){const{hls:t}=this
t.off(p.MEDIA_ATTACHED,this.onMediaAttached,this),t.off(p.MEDIA_DETACHING,this.onMediaDetaching,this),t.off(p.MANIFEST_LOADING,this.onManifestLoading,this),t.off(p.MANIFEST_PARSED,this.onManifestParsed,this),t.off(p.LEVEL_LOADED,this.onLevelLoaded,this),t.off(p.FRAG_LOAD_EMERGENCY_ABORTED,this.onFragLoadEmergencyAborted,this),t.off(p.ERROR,this.onError,this),t.off(p.AUDIO_TRACK_SWITCHING,this.onAudioTrackSwitching,this),t.off(p.AUDIO_TRACK_SWITCHED,this.onAudioTrackSwitched,this),t.off(p.BUFFER_CREATED,this.onBufferCreated,this),t.off(p.BUFFER_FLUSHED,this.onBufferFlushed,this),t.off(p.LEVELS_UPDATED,this.onLevelsUpdated,this),t.off(p.FRAG_BUFFERED,this.onFragBuffered,this)}onHandlerDestroying(){this._unregisterListeners(),super.onHandlerDestroying()}startLoad(t){if(this.levels){const{lastCurrentTime:e,hls:s}=this
if(this.stopLoad(),this.setInterval(100),this.level=-1,!this.startFragRequested){let t=s.startLevel;-1===t&&(s.config.testBandwidth&&this.levels.length>1?(t=0,this.bitrateTest=!0):t=s.firstAutoLevel),s.nextLoadLevel=t,this.level=s.loadLevel,this.loadedmetadata=!1}e>0&&-1===t&&(this.log(`Override startPosition with lastCurrentTime @${e.toFixed(3)}`),t=e),this.state=Bs,this.nextLoadPosition=this.startPosition=this.lastCurrentTime=t,this.tick()}else this._forceStartLoad=!0,this.state=Us}stopLoad(){this._forceStartLoad=!1,super.stopLoad()}doTick(){switch(this.state){case Xs:{const{levels:t,level:e}=this,s=null==t?void 0:t[e],i=null==s?void 0:s.details
if(i&&(!i.live||this.levelLastLoaded===s)){if(this.waitForCdnTuneIn(i))break
this.state=Bs
break}if(this.hls.nextLoadLevel!==this.level){this.state=Bs
break}break}case Ks:{var t
const e=self.performance.now(),s=this.retryDate
if(!s||e>=s||null!=(t=this.media)&&t.seeking){const{levels:t,level:e}=this,s=null==t?void 0:t[e]
this.resetStartWhenNotLoaded(s||null),this.state=Bs}}}this.state===Bs&&this.doTickIdle(),this.onTickEnd()}onTickEnd(){super.onTickEnd(),this.checkBuffer(),this.checkFragmentChanged()}doTickIdle(){const{hls:t,levelLastLoaded:e,levels:s,media:i}=this
if(null===e||!i&&(this.startFragRequested||!t.config.startFragPrefetch))return
if(this.altAudio&&this.audioOnly)return
const r=t.nextLoadLevel
if(null==s||!s[r])return
const n=s[r],a=this.getMainFwdBufferInfo()
if(null===a)return
const o=this.getLevelDetails()
if(o&&this._streamEnded(a,o)){const t={}
return this.altAudio&&(t.type="video"),this.hls.trigger(p.BUFFER_EOS,t),void(this.state=Ws)}t.loadLevel!==r&&-1===t.manualLevel&&this.log(`Adapting to level ${r} from level ${this.level}`),this.level=t.nextLoadLevel=r
const l=n.details
if(!l||this.state===Xs||l.live&&this.levelLastLoaded!==n)return this.level=r,void(this.state=Xs)
const h=a.len,d=this.getMaxBufferLength(n.maxBitrate)
if(h>=d)return
this.backtrackFragment&&this.backtrackFragment.start>a.end&&(this.backtrackFragment=null)
const c=this.backtrackFragment?this.backtrackFragment.start:a.end
let u=this.getNextFragment(c,l)
if(this.couldBacktrack&&!this.fragPrevious&&u&&"initSegment"!==u.sn&&this.fragmentTracker.getState(u)!==vs){var f
const t=(null!=(f=this.backtrackFragment)?f:u).sn-l.startSN,e=l.fragments[t-1]
e&&u.cc===e.cc&&(u=e,this.fragmentTracker.removeFragment(e))}else this.backtrackFragment&&a.len&&(this.backtrackFragment=null)
if(u&&this.isLoopLoading(u,c)){if(!u.gap){const t=this.audioOnly&&!this.altAudio?C.AUDIO:C.VIDEO,e=(t===C.VIDEO?this.videoBuffer:this.mediaBuffer)||this.media
e&&this.afterBufferFlushed(e,t,fe.MAIN)}u=this.getNextFragmentLoopLoading(u,l,a,fe.MAIN,d)}u&&(!u.initSegment||u.initSegment.data||this.bitrateTest||(u=u.initSegment),this.loadFragment(u,n,c))}loadFragment(t,e,s){const i=this.fragmentTracker.getState(t)
this.fragCurrent=t,i===ms||i===ys?"initSegment"===t.sn?this._loadInitSegment(t,e):this.bitrateTest?(this.log(`Fragment ${t.sn} of level ${t.level} is being downloaded to test bitrate and will not be buffered`),this._loadBitrateTestFrag(t,e)):(this.startFragRequested=!0,super.loadFragment(t,e,s)):this.clearTrackerIfNeeded(t)}getBufferedFrag(t){return this.fragmentTracker.getBufferedFrag(t,fe.MAIN)}followingBufferedFrag(t){return t?this.getBufferedFrag(t.end+.5):null}immediateLevelSwitch(){this.abortCurrentFrag(),this.flushMainBuffer(0,Number.POSITIVE_INFINITY)}nextLevelSwitch(){const{levels:t,media:e}=this
if(null!=e&&e.readyState){let s
const i=this.getAppendedFrag(e.currentTime)
i&&i.start>1&&this.flushMainBuffer(0,i.start-1)
const r=this.getLevelDetails()
if(null!=r&&r.live){const t=this.getMainFwdBufferInfo()
if(!t||t.len<2*r.targetduration)return}if(!e.paused&&t){const e=t[this.hls.nextLoadLevel],i=this.fragLastKbps
s=i&&this.fragCurrent?this.fragCurrent.duration*e.maxBitrate/(1e3*i)+1:0}else s=0
const n=this.getBufferedFrag(e.currentTime+s)
if(n){const t=this.followingBufferedFrag(n)
if(t){this.abortCurrentFrag()
const e=t.maxStartPTS?t.maxStartPTS:t.start,s=t.duration,i=Math.max(n.end,e+Math.min(Math.max(s-this.config.maxFragLookUpTolerance,s*(this.couldBacktrack?.5:.125)),s*(this.couldBacktrack?.75:.25)))
this.flushMainBuffer(i,Number.POSITIVE_INFINITY)}}}}abortCurrentFrag(){const t=this.fragCurrent
switch(this.fragCurrent=null,this.backtrackFragment=null,t&&(t.abortRequests(),this.fragmentTracker.removeFragment(t)),this.state){case $s:case Gs:case Ks:case Vs:case Ys:this.state=Bs}this.nextLoadPosition=this.getLoadPosition()}flushMainBuffer(t,e){super.flushMainBuffer(t,e,this.altAudio?"video":null)}onMediaAttached(t,e){super.onMediaAttached(t,e)
const s=e.media
this.onvplaying=this.onMediaPlaying.bind(this),this.onvseeked=this.onMediaSeeked.bind(this),s.addEventListener("playing",this.onvplaying),s.addEventListener("seeked",this.onvseeked),this.gapController=new ca(this.config,s,this.fragmentTracker,this.hls)}onMediaDetaching(){const{media:t}=this
t&&this.onvplaying&&this.onvseeked&&(t.removeEventListener("playing",this.onvplaying),t.removeEventListener("seeked",this.onvseeked),this.onvplaying=this.onvseeked=null,this.videoBuffer=null),this.fragPlaying=null,this.gapController&&(this.gapController.destroy(),this.gapController=null),super.onMediaDetaching()}onMediaPlaying(){this.tick()}onMediaSeeked(){const t=this.media,e=t?t.currentTime:null
f(e)&&this.log(`Media seeked to ${e.toFixed(3)}`)
const s=this.getMainFwdBufferInfo()
null!==s&&0!==s.len?this.tick():this.warn(`Main forward buffer length on "seeked" event ${s?s.len:"empty"})`)}onManifestLoading(){this.log("Trigger BUFFER_RESET"),this.hls.trigger(p.BUFFER_RESET,void 0),this.fragmentTracker.removeAllFragments(),this.couldBacktrack=!1,this.startPosition=this.lastCurrentTime=this.fragLastKbps=0,this.levels=this.fragPlaying=this.backtrackFragment=this.levelLastLoaded=null,this.altAudio=this.audioOnly=this.startFragRequested=!1}onManifestParsed(t,e){let s=!1,i=!1
e.levels.forEach((t=>{const e=t.audioCodec
e&&(s=s||-1!==e.indexOf("mp4a.40.2"),i=i||-1!==e.indexOf("mp4a.40.5"))})),this.audioCodecSwitch=s&&i&&!function(){var t
const e=la()
return"function"==typeof(null==e||null==(t=e.prototype)?void 0:t.changeType)}(),this.audioCodecSwitch&&this.log("Both AAC/HE-AAC audio found in levels; declaring level codec as HE-AAC"),this.levels=e.levels,this.startFragRequested=!1}onLevelLoading(t,e){const{levels:s}=this
if(!s||this.state!==Bs)return
const i=s[e.level];(!i.details||i.details.live&&this.levelLastLoaded!==i||this.waitForCdnTuneIn(i.details))&&(this.state=Xs)}onLevelLoaded(t,e){var s
const{levels:i}=this,r=e.level,n=e.details,a=n.totalduration
if(!i)return void this.warn(`Levels were reset while loading level ${r}`)
this.log(`Level ${r} loaded [${n.startSN},${n.endSN}]${n.lastPartSn?`[part-${n.lastPartSn}-${n.lastPartIndex}]`:""}, cc [${n.startCC}, ${n.endCC}] duration:${a}`)
const o=i[r],l=this.fragCurrent
!l||this.state!==Gs&&this.state!==Ks||l.level!==e.level&&l.loader&&this.abortCurrentFrag()
let h=0
if(n.live||null!=(s=o.details)&&s.live){var d
if(this.checkLiveUpdate(n),n.deltaUpdateFailed)return
h=this.alignPlaylists(n,o.details,null==(d=this.levelLastLoaded)?void 0:d.details)}if(o.details=n,this.levelLastLoaded=o,this.hls.trigger(p.LEVEL_UPDATED,{details:n,level:r}),this.state===Xs){if(this.waitForCdnTuneIn(n))return
this.state=Bs}this.startFragRequested?n.live&&this.synchronizeToLiveEdge(n):this.setStartPosition(n,h),this.tick()}_handleFragmentLoadProgress(t){var e
const{frag:s,part:i,payload:r}=t,{levels:n}=this
if(!n)return void this.warn(`Levels were reset while fragment load was in progress. Fragment ${s.sn} of level ${s.level} will not be buffered`)
const a=n[s.level],o=a.details
if(!o)return this.warn(`Dropping fragment ${s.sn} of level ${s.level} after level details were reset`),void this.fragmentTracker.removeFragment(s)
const l=a.videoCodec,h=o.PTSKnown||!o.live,d=null==(e=s.initSegment)?void 0:e.data,c=this._getAudioCodec(a),u=this.transmuxer=this.transmuxer||new ir(this.hls,fe.MAIN,this._handleTransmuxComplete.bind(this),this._handleTransmuxerFlush.bind(this)),f=i?i.index:-1,g=-1!==f,m=new Rs(s.level,s.sn,s.stats.chunkCount,r.byteLength,f,g),p=this.initPTS[s.cc]
u.push(r,d,c,l,s,i,o.totalduration,h,m,p)}onAudioTrackSwitching(t,e){const s=this.altAudio
if(!e.url){if(this.mediaBuffer!==this.media){this.log("Switching on main audio, use media.buffered to schedule main fragment loading"),this.mediaBuffer=this.media
const t=this.fragCurrent
t&&(this.log("Switching to main audio track, cancel main fragment load"),t.abortRequests(),this.fragmentTracker.removeFragment(t)),this.resetTransmuxer(),this.resetLoadingState()}else this.audioOnly&&this.resetTransmuxer()
const t=this.hls
s&&(t.trigger(p.BUFFER_FLUSHING,{startOffset:0,endOffset:Number.POSITIVE_INFINITY,type:null}),this.fragmentTracker.removeAllFragments()),t.trigger(p.AUDIO_TRACK_SWITCHED,e)}}onAudioTrackSwitched(t,e){const s=e.id,i=!!this.hls.audioTracks[s].url
if(i){const t=this.videoBuffer
t&&this.mediaBuffer!==t&&(this.log("Switching on alternate audio, use video.buffered to schedule main fragment loading"),this.mediaBuffer=t)}this.altAudio=i,this.tick()}onBufferCreated(t,e){const s=e.tracks
let i,r,n=!1
for(const a in s){const t=s[a]
if("main"===t.id){if(r=a,i=t,"video"===a){const t=s[a]
t&&(this.videoBuffer=t.buffer)}}else n=!0}n&&i?(this.log(`Alternate track found, use ${r}.buffered to schedule main fragment loading`),this.mediaBuffer=i.buffer):this.mediaBuffer=this.media}onFragBuffered(t,e){const{frag:s,part:i}=e
if(s&&s.type!==fe.MAIN)return
if(this.fragContextChanged(s))return this.warn(`Fragment ${s.sn}${i?" p: "+i.index:""} of level ${s.level} finished buffering, but was aborted. state: ${this.state}`),void(this.state===Ys&&(this.state=Bs))
const r=i?i.stats:s.stats
this.fragLastKbps=Math.round(8*r.total/(r.buffering.end-r.loading.first)),"initSegment"!==s.sn&&(this.fragPrevious=s),this.fragBufferedComplete(s,i)}onError(t,e){var s
if(e.fatal)this.state=js
else switch(e.details){case v.FRAG_GAP:case v.FRAG_PARSING_ERROR:case v.FRAG_DECRYPT_ERROR:case v.FRAG_LOAD_ERROR:case v.FRAG_LOAD_TIMEOUT:case v.KEY_LOAD_ERROR:case v.KEY_LOAD_TIMEOUT:this.onFragmentOrKeyLoadError(fe.MAIN,e)
break
case v.LEVEL_LOAD_ERROR:case v.LEVEL_LOAD_TIMEOUT:case v.LEVEL_PARSING_ERROR:e.levelRetry||this.state!==Xs||(null==(s=e.context)?void 0:s.type)!==ue.LEVEL||(this.state=Bs)
break
case v.BUFFER_APPEND_ERROR:case v.BUFFER_FULL_ERROR:if(!e.parent||"main"!==e.parent)return
if(e.details===v.BUFFER_APPEND_ERROR)return void this.resetLoadingState()
this.reduceLengthAndFlushBuffer(e)&&this.flushMainBuffer(0,Number.POSITIVE_INFINITY)
break
case v.INTERNAL_EXCEPTION:this.recoverWorkerError(e)}}checkBuffer(){const{media:t,gapController:e}=this
if(t&&e&&t.readyState){if(this.loadedmetadata||!Ls.getBuffered(t).length){const t=this.state!==Bs?this.fragCurrent:null
e.poll(this.lastCurrentTime,t)}this.lastCurrentTime=t.currentTime}}onFragLoadEmergencyAborted(){this.state=Bs,this.loadedmetadata||(this.startFragRequested=!1,this.nextLoadPosition=this.startPosition),this.tickImmediate()}onBufferFlushed(t,{type:e}){if(e!==C.AUDIO||this.audioOnly&&!this.altAudio){const t=(e===C.VIDEO?this.videoBuffer:this.mediaBuffer)||this.media
this.afterBufferFlushed(t,e,fe.MAIN),this.tick()}}onLevelsUpdated(t,e){this.level>-1&&this.fragCurrent&&(this.level=this.fragCurrent.level),this.levels=e.levels}swapAudioCodec(){this.audioCodecSwap=!this.audioCodecSwap}seekToStartPos(){const{media:t}=this
if(!t)return
const e=t.currentTime
let s=this.startPosition
if(s>=0&&e<s){if(t.seeking)return void this.log(`could not seek to ${s}, already seeking at ${e}`)
const i=Ls.getBuffered(t),r=(i.length?i.start(0):0)-s
r>0&&(r<this.config.maxBufferHole||r<this.config.maxFragLookUpTolerance)&&(this.log(`adjusting start position by ${r} to match buffer start`),s+=r,this.startPosition=s),this.log(`seek to target start position ${s} from current time ${e}`),t.currentTime=s}}_getAudioCodec(t){let e=this.config.defaultAudioCodec||t.audioCodec
return this.audioCodecSwap&&e&&(this.log("Swapping audio codec"),e=-1!==e.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5"),e}_loadBitrateTestFrag(t,e){t.bitrateTest=!0,this._doFragLoad(t,e).then((s=>{const{hls:i}=this
if(!s||this.fragContextChanged(t))return
e.fragmentError=0,this.state=Bs,this.startFragRequested=!1,this.bitrateTest=!1
const r=t.stats
r.parsing.start=r.parsing.end=r.buffering.start=r.buffering.end=self.performance.now(),i.trigger(p.FRAG_LOADED,s),t.bitrateTest=!1}))}_handleTransmuxComplete(t){var e
const s="main",{hls:i}=this,{remuxResult:r,chunkMeta:n}=t,a=this.getCurrentContext(n)
if(!a)return void this.resetWhenMissingContext(n)
const{frag:o,part:l,level:h}=a,{video:d,text:c,id3:u,initSegment:g}=r,{details:m}=h,y=this.altAudio?void 0:r.audio
if(this.fragContextChanged(o))this.fragmentTracker.removeFragment(o)
else{if(this.state=Vs,g){if(null!=g&&g.tracks){const t=o.initSegment||o
this._bufferInitSegment(h,g.tracks,t,n),i.trigger(p.FRAG_PARSING_INIT_SEGMENT,{frag:t,id:s,tracks:g.tracks})}const t=g.initPTS,e=g.timescale
f(t)&&(this.initPTS[o.cc]={baseTime:t,timescale:e},i.trigger(p.INIT_PTS_FOUND,{frag:o,id:s,initPTS:t,timescale:e}))}if(d&&m&&"initSegment"!==o.sn){const t=m.fragments[o.sn-1-m.startSN],e=o.sn===m.startSN,s=!t||o.cc>t.cc
if(!1!==r.independent){const{startPTS:t,endPTS:i,startDTS:r,endDTS:a}=d
if(l)l.elementaryStreams[d.type]={startPTS:t,endPTS:i,startDTS:r,endDTS:a}
else if(d.firstKeyFrame&&d.independent&&1===n.id&&!s&&(this.couldBacktrack=!0),d.dropped&&d.independent){const r=this.getMainFwdBufferInfo(),n=(r?r.end:this.getLoadPosition())+this.config.maxBufferHole,l=d.firstKeyFramePTS?d.firstKeyFramePTS:t
if(!e&&n<l-this.config.maxBufferHole&&!s)return void this.backtrack(o)
s&&(o.gap=!0),o.setElementaryStreamInfo(d.type,o.start,i,o.start,a,!0)}else e&&t>2&&(o.gap=!0)
o.setElementaryStreamInfo(d.type,t,i,r,a),this.backtrackFragment&&(this.backtrackFragment=o),this.bufferFragmentData(d,o,l,n,e||s)}else{if(!e&&!s)return void this.backtrack(o)
o.gap=!0}}if(y){const{startPTS:t,endPTS:e,startDTS:s,endDTS:i}=y
l&&(l.elementaryStreams[C.AUDIO]={startPTS:t,endPTS:e,startDTS:s,endDTS:i}),o.setElementaryStreamInfo(C.AUDIO,t,e,s,i),this.bufferFragmentData(y,o,l,n)}if(m&&null!=u&&null!=(e=u.samples)&&e.length){const t={id:s,frag:o,details:m,samples:u.samples}
i.trigger(p.FRAG_PARSING_METADATA,t)}if(m&&c){const t={id:s,frag:o,details:m,samples:c.samples}
i.trigger(p.FRAG_PARSING_USERDATA,t)}}}_bufferInitSegment(t,e,s,i){if(this.state!==Vs)return
this.audioOnly=!!e.audio&&!e.video,this.altAudio&&!this.audioOnly&&delete e.audio
const{audio:r,video:n,audiovideo:a}=e
if(r){let e=t.audioCodec
const s=navigator.userAgent.toLowerCase()
if(this.audioCodecSwitch){e&&(e=-1!==e.indexOf("mp4a.40.5")?"mp4a.40.2":"mp4a.40.5")
const t=r.metadata
t&&"channelCount"in t&&1!==(t.channelCount||1)&&-1===s.indexOf("firefox")&&(e="mp4a.40.5")}e&&-1!==e.indexOf("mp4a.40.5")&&-1!==s.indexOf("android")&&"audio/mpeg"!==r.container&&(e="mp4a.40.2",this.log(`Android: force audio codec to ${e}`)),t.audioCodec&&t.audioCodec!==e&&this.log(`Swapping manifest audio codec "${t.audioCodec}" for "${e}"`),r.levelCodec=e,r.id="main",this.log(`Init audio buffer, container:${r.container}, codecs[selected/level/parsed]=[${e||""}/${t.audioCodec||""}/${r.codec}]`)}n&&(n.levelCodec=t.videoCodec,n.id="main",this.log(`Init video buffer, container:${n.container}, codecs[level/parsed]=[${t.videoCodec||""}/${n.codec}]`)),a&&this.log(`Init audiovideo buffer, container:${a.container}, codecs[level/parsed]=[${t.codecs}/${a.codec}]`),this.hls.trigger(p.BUFFER_CODECS,e),Object.keys(e).forEach((t=>{const r=e[t].initSegment
null!=r&&r.byteLength&&this.hls.trigger(p.BUFFER_APPENDING,{type:t,data:r,frag:s,part:null,chunkMeta:i,parent:s.type})})),this.tickImmediate()}getMainFwdBufferInfo(){return this.getFwdBufferInfo(this.mediaBuffer?this.mediaBuffer:this.media,fe.MAIN)}backtrack(t){this.couldBacktrack=!0,this.backtrackFragment=t,this.resetTransmuxer(),this.flushBufferGap(t),this.fragmentTracker.removeFragment(t),this.fragPrevious=null,this.nextLoadPosition=t.start,this.state=Bs}checkFragmentChanged(){const t=this.media
let e=null
if(t&&t.readyState>1&&!1===t.seeking){const s=t.currentTime
if(Ls.isBuffered(t,s)?e=this.getAppendedFrag(s):Ls.isBuffered(t,s+.1)&&(e=this.getAppendedFrag(s+.1)),e){this.backtrackFragment=null
const t=this.fragPlaying,s=e.level
t&&e.sn===t.sn&&t.level===s||(this.fragPlaying=e,this.hls.trigger(p.FRAG_CHANGED,{frag:e}),t&&t.level===s||this.hls.trigger(p.LEVEL_SWITCHED,{level:s}))}}}get nextLevel(){const t=this.nextBufferedFrag
return t?t.level:-1}get currentFrag(){const t=this.media
return t?this.fragPlaying||this.getAppendedFrag(t.currentTime):null}get currentProgramDateTime(){const t=this.media
if(t){const e=t.currentTime,s=this.currentFrag
if(s&&f(e)&&f(s.programDateTime)){const t=s.programDateTime+1e3*(e-s.start)
return new Date(t)}}return null}get currentLevel(){const t=this.currentFrag
return t?t.level:-1}get nextBufferedFrag(){const t=this.currentFrag
return t?this.followingBufferedFrag(t):null}get forceStartLoad(){return this._forceStartLoad}}class fa{static get version(){return"1.5.15"}static isMSESupported(){return ha()}static isSupported(){return da()}static getMediaSource(){return Kt()}static get Events(){return p}static get ErrorTypes(){return y}static get ErrorDetails(){return v}static get DefaultConfig(){return fa.defaultConfig?fa.defaultConfig:sa}static set DefaultConfig(t){fa.defaultConfig=t}constructor(t={}){this.config=void 0,this.userConfig=void 0,this.coreComponents=void 0,this.networkControllers=void 0,this.started=!1,this._emitter=new sr,this._autoLevelCapping=-1,this._maxHdcpLevel=null,this.abrController=void 0,this.bufferController=void 0,this.capLevelController=void 0,this.latencyController=void 0,this.levelController=void 0,this.streamController=void 0,this.audioTrackController=void 0,this.subtitleTrackController=void 0,this.emeController=void 0,this.cmcdController=void 0,this._media=null,this.url=null,this.triggeringException=void 0,function(t,e){if("object"==typeof console&&!0===t||"object"==typeof t){!function(t,...e){["debug","log","info","warn","error"].forEach((function(e){S[e]=t[e]?t[e].bind(t):function(t){const e=self.console[t]
return e?e.bind(self.console,`[${t}] >`):E}(e)}))}(t)
try{S.log('Debug logs enabled for "Hls instance" in hls.js version 1.5.15')}catch(t){S=T}}else S=T}(t.debug||!1)
const e=this.config=function(t,e){if((e.liveSyncDurationCount||e.liveMaxLatencyDurationCount)&&(e.liveSyncDuration||e.liveMaxLatencyDuration))throw new Error("Illegal hls.js config: don't mix up liveSyncDurationCount/liveMaxLatencyDurationCount and liveSyncDuration/liveMaxLatencyDuration")
if(void 0!==e.liveMaxLatencyDurationCount&&(void 0===e.liveSyncDurationCount||e.liveMaxLatencyDurationCount<=e.liveSyncDurationCount))throw new Error('Illegal hls.js config: "liveMaxLatencyDurationCount" must be greater than "liveSyncDurationCount"')
if(void 0!==e.liveMaxLatencyDuration&&(void 0===e.liveSyncDuration||e.liveMaxLatencyDuration<=e.liveSyncDuration))throw new Error('Illegal hls.js config: "liveMaxLatencyDuration" must be greater than "liveSyncDuration"')
const s=ia(t),i=["TimeOut","MaxRetry","RetryDelay","MaxRetryTimeout"]
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
case"MaxRetryTimeout":t.errorRetry.maxRetryDelayMs=l,t.timeoutRetry.maxRetryDelayMs=l}}})),a.length&&A.warn(`hls.js config: "${a.join('", "')}" setting(s) are deprecated, use "${r}": ${JSON.stringify(e[r])}`)})),c(c({},s),e)}(fa.DefaultConfig,t)
this.userConfig=t,e.progressive&&function(t){const e=t.loader
e!==Jn&&e!==zn?(A.log("[config]: Custom loader detected, cannot enable progressive streaming"),t.progressive=!1):function(){if(self.fetch&&self.AbortController&&self.ReadableStream&&self.Request)try{return new self.ReadableStream({}),!0}catch(t){}return!1}()&&(t.loader=Jn,t.progressive=!0,t.enableSoftwareAES=!0,A.log("[config]: Progressive streaming enabled, using FetchLoader"))}(e)
const{abrController:s,bufferController:i,capLevelController:r,errorController:n,fpsController:a}=e,o=new n(this),l=this.abrController=new s(this),h=this.bufferController=new i(this),d=this.capLevelController=new r(this),u=new a(this),f=new pe(this),g=new ke(this),m=e.contentSteeringController,y=m?new m(this):null,v=this.levelController=new na(this,y),L=new Es(this),R=new oa(this.config),b=this.streamController=new ua(this,L,R)
d.setStreamController(b),u.setStreamController(b)
const D=[f,v,b]
y&&D.splice(1,0,y),this.networkControllers=D
const k=[l,h,d,u,g,L]
this.audioTrackController=this.createController(e.audioTrackController,D)
const I=e.audioStreamController
I&&D.push(new I(this,L,R)),this.subtitleTrackController=this.createController(e.subtitleTrackController,D)
const C=e.subtitleStreamController
C&&D.push(new C(this,L,R)),this.createController(e.timelineController,k),R.emeController=this.emeController=this.createController(e.emeController,k),this.cmcdController=this.createController(e.cmcdController,k),this.latencyController=this.createController(Ie,k),this.coreComponents=k,D.push(o)
const w=o.onErrorOut
"function"==typeof w&&this.on(p.ERROR,w,o)}createController(t,e){if(t){const s=new t(this)
return e&&e.push(s),s}return null}on(t,e,s=this){this._emitter.on(t,e,s)}once(t,e,s=this){this._emitter.once(t,e,s)}removeAllListeners(t){this._emitter.removeAllListeners(t)}off(t,e,s=this,i){this._emitter.off(t,e,s,i)}listeners(t){return this._emitter.listeners(t)}emit(t,e,s){return this._emitter.emit(t,e,s)}trigger(t,e){if(this.config.debug)return this.emit(t,t,e)
try{return this.emit(t,t,e)}catch(e){if(A.error("An internal error happened while handling event "+t+'. Error message: "'+e.message+'". Here is a stacktrace:',e),!this.triggeringException){this.triggeringException=!0
const s=t===p.ERROR
this.trigger(p.ERROR,{type:y.OTHER_ERROR,details:v.INTERNAL_EXCEPTION,fatal:s,event:t,error:e}),this.triggeringException=!1}}return!1}listenerCount(t){return this._emitter.listenerCount(t)}destroy(){A.log("destroy"),this.trigger(p.DESTROYING,void 0),this.detachMedia(),this.removeAllListeners(),this._autoLevelCapping=-1,this.url=null,this.networkControllers.forEach((t=>t.destroy())),this.networkControllers.length=0,this.coreComponents.forEach((t=>t.destroy())),this.coreComponents.length=0
const t=this.config
t.xhrSetup=t.fetchSetup=void 0,this.userConfig=null}attachMedia(t){A.log("attachMedia"),this._media=t,this.trigger(p.MEDIA_ATTACHING,{media:t})}detachMedia(){A.log("detachMedia"),this.trigger(p.MEDIA_DETACHING,void 0),this._media=null}loadSource(t){this.stopLoad()
const e=this.media,s=this.url,i=this.url=h.buildAbsoluteURL(self.location.href,t,{alwaysNormalize:!0})
this._autoLevelCapping=-1,this._maxHdcpLevel=null,A.log(`loadSource:${i}`),e&&s&&(s!==i||this.bufferController.hasSourceTypes())&&(this.detachMedia(),this.attachMedia(e)),this.trigger(p.MANIFEST_LOADING,{url:t})}startLoad(t=-1){A.log(`startLoad(${t})`),this.started=!0,this.networkControllers.forEach((e=>{e.startLoad(t)}))}stopLoad(){A.log("stopLoad"),this.started=!1,this.networkControllers.forEach((t=>{t.stopLoad()}))}resumeBuffering(){this.started&&this.networkControllers.forEach((t=>{"fragmentLoader"in t&&t.startLoad(-1)}))}pauseBuffering(){this.networkControllers.forEach((t=>{"fragmentLoader"in t&&t.stopLoad()}))}swapAudioCodec(){A.log("swapAudioCodec"),this.streamController.swapAudioCodec()}recoverMediaError(){A.log("recoverMediaError")
const t=this._media
this.detachMedia(),t&&this.attachMedia(t)}removeLevel(t){this.levelController.removeLevel(t)}get levels(){return this.levelController.levels||[]}get currentLevel(){return this.streamController.currentLevel}set currentLevel(t){A.log(`set currentLevel:${t}`),this.levelController.manualLevel=t,this.streamController.immediateLevelSwitch()}get nextLevel(){return this.streamController.nextLevel}set nextLevel(t){A.log(`set nextLevel:${t}`),this.levelController.manualLevel=t,this.streamController.nextLevelSwitch()}get loadLevel(){return this.levelController.level}set loadLevel(t){A.log(`set loadLevel:${t}`),this.levelController.manualLevel=t}get nextLoadLevel(){return this.levelController.nextLoadLevel}set nextLoadLevel(t){this.levelController.nextLoadLevel=t}get firstLevel(){return Math.max(this.levelController.firstLevel,this.minAutoLevel)}set firstLevel(t){A.log(`set firstLevel:${t}`),this.levelController.firstLevel=t}get startLevel(){const t=this.levelController.startLevel
return-1===t&&this.abrController.forcedAutoLevel>-1?this.abrController.forcedAutoLevel:t}set startLevel(t){A.log(`set startLevel:${t}`),-1!==t&&(t=Math.max(t,this.minAutoLevel)),this.levelController.startLevel=t}get capLevelToPlayerSize(){return this.config.capLevelToPlayerSize}set capLevelToPlayerSize(t){const e=!!t
e!==this.config.capLevelToPlayerSize&&(e?this.capLevelController.startCapping():(this.capLevelController.stopCapping(),this.autoLevelCapping=-1,this.streamController.nextLevelSwitch()),this.config.capLevelToPlayerSize=e)}get autoLevelCapping(){return this._autoLevelCapping}get bandwidthEstimate(){const{bwEstimator:t}=this.abrController
return t?t.getEstimate():NaN}set bandwidthEstimate(t){this.abrController.resetEstimator(t)}get ttfbEstimate(){const{bwEstimator:t}=this.abrController
return t?t.getEstimateTTFB():NaN}set autoLevelCapping(t){this._autoLevelCapping!==t&&(A.log(`set autoLevelCapping:${t}`),this._autoLevelCapping=t,this.levelController.checkMaxAutoUpdated())}get maxHdcpLevel(){return this._maxHdcpLevel}set maxHdcpLevel(t){(function(t){return Ce.indexOf(t)>-1})(t)&&this._maxHdcpLevel!==t&&(this._maxHdcpLevel=t,this.levelController.checkMaxAutoUpdated())}get autoLevelEnabled(){return-1===this.levelController.manualLevel}get manualLevel(){return this.levelController.manualLevel}get minAutoLevel(){const{levels:t,config:{minAutoBitrate:e}}=this
if(!t)return 0
const s=t.length
for(let i=0;i<s;i++)if(t[i].maxBitrate>=e)return i
return 0}get maxAutoLevel(){const{levels:t,autoLevelCapping:e,maxHdcpLevel:s}=this
let i
if(i=-1===e&&null!=t&&t.length?t.length-1:e,s)for(let r=i;r--;){const e=t[r].attrs["HDCP-LEVEL"]
if(e&&e<=s)return r}return i}get firstAutoLevel(){return this.abrController.firstAutoLevel}get nextAutoLevel(){return this.abrController.nextAutoLevel}set nextAutoLevel(t){this.abrController.nextAutoLevel=t}get playingDate(){return this.streamController.currentProgramDateTime}get mainForwardBufferInfo(){return this.streamController.getMainFwdBufferInfo()}setAudioOption(t){var e
return null==(e=this.audioTrackController)?void 0:e.setAudioOption(t)}setSubtitleOption(t){var e
return null==(e=this.subtitleTrackController)||e.setSubtitleOption(t),null}get allAudioTracks(){const t=this.audioTrackController
return t?t.allAudioTracks:[]}get audioTracks(){const t=this.audioTrackController
return t?t.audioTracks:[]}get audioTrack(){const t=this.audioTrackController
return t?t.audioTrack:-1}set audioTrack(t){const e=this.audioTrackController
e&&(e.audioTrack=t)}get allSubtitleTracks(){const t=this.subtitleTrackController
return t?t.allSubtitleTracks:[]}get subtitleTracks(){const t=this.subtitleTrackController
return t?t.subtitleTracks:[]}get subtitleTrack(){const t=this.subtitleTrackController
return t?t.subtitleTrack:-1}get media(){return this._media}set subtitleTrack(t){const e=this.subtitleTrackController
e&&(e.subtitleTrack=t)}get subtitleDisplay(){const t=this.subtitleTrackController
return!!t&&t.subtitleDisplay}set subtitleDisplay(t){const e=this.subtitleTrackController
e&&(e.subtitleDisplay=t)}get lowLatencyMode(){return this.config.lowLatencyMode}set lowLatencyMode(t){this.config.lowLatencyMode=t}get liveSyncPosition(){return this.latencyController.liveSyncPosition}get latency(){return this.latencyController.latency}get maxLatency(){return this.latencyController.maxLatency}get targetLatency(){return this.latencyController.targetLatency}get drift(){return this.latencyController.drift}get forceStartLoad(){return this.streamController.forceStartLoad}}fa.defaultConfig=void 0}}])

//# sourceMappingURL=chunk.609.8b6d601a08b7a27ab0e9.map