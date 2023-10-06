;window.CloudflareApps=window.CloudflareApps||{};CloudflareApps.siteId="a8b710d280adcd7e10541d69ecb73498";CloudflareApps.installs=CloudflareApps.installs||{};;(function(){'use strict'
CloudflareApps.internal=CloudflareApps.internal||{}
var errors=[]
CloudflareApps.internal.placementErrors=errors
var errorHashes={}
function noteError(options){var hash=options.selector+'::'+options.type+'::'+(options.installId||'')
if(errorHashes[hash]){return}
errorHashes[hash]=true
errors.push(options)}
var initializedSelectors={}
var currentInit=false
CloudflareApps.internal.markSelectors=function markSelectors(){if(!currentInit){check()
currentInit=true
setTimeout(function(){currentInit=false})}}
function check(){var installs=window.CloudflareApps.installs
for(var installId in installs){if(!installs.hasOwnProperty(installId)){continue}
var selectors=installs[installId].selectors
if(!selectors){continue}
for(var key in selectors){if(!selectors.hasOwnProperty(key)){continue}
var hash=installId+'::'+key
if(initializedSelectors[hash]){continue}
var els=document.querySelectorAll(selectors[key])
if(els&&els.length>1){noteError({type:'init:too-many',option:key,selector:selectors[key],installId:installId})
initializedSelectors[hash]=true
continue}else if(!els||!els.length){continue}
initializedSelectors[hash]=true
els[0].setAttribute('cfapps-selector',selectors[key])}}}
CloudflareApps.querySelector=function querySelector(selector){if(selector==='body'||selector==='head'){return document[selector]}
CloudflareApps.internal.markSelectors()
var els=document.querySelectorAll('[cfapps-selector="'+selector+'"]')
if(!els||!els.length){noteError({type:'select:not-found:by-attribute',selector:selector})
els=document.querySelectorAll(selector)
if(!els||!els.length){noteError({type:'select:not-found:by-query',selector:selector})
return null}else if(els.length>1){noteError({type:'select:too-many:by-query',selector:selector})}
return els[0]}
if(els.length>1){noteError({type:'select:too-many:by-attribute',selector:selector})}
return els[0]}}());(function(){'use strict'
var prevEls={}
CloudflareApps.createElement=function createElement(options,prevEl){options=options||{}
CloudflareApps.internal.markSelectors()
try{if(prevEl&&prevEl.parentNode){var replacedEl
if(prevEl.cfAppsElementId){replacedEl=prevEls[prevEl.cfAppsElementId]}
if(replacedEl){prevEl.parentNode.replaceChild(replacedEl,prevEl)
delete prevEls[prevEl.cfAppsElementId]}else{prevEl.parentNode.removeChild(prevEl)}}
var element=document.createElement('cloudflare-app')
var container
if(options.pages&&options.pages.URLPatterns&&!CloudflareApps.matchPage(options.pages.URLPatterns)){return element}
try{container=CloudflareApps.querySelector(options.selector)}catch(e){}
if(!container){return element}
if(!container.parentNode&&(options.method==='after'||options.method==='before'||options.method==='replace')){return element}
if(container===document.body){if(options.method==='after'){options.method='append'}else if(options.method==='before'){options.method='prepend'}}
switch(options.method){case'prepend':if(container.firstChild){container.insertBefore(element,container.firstChild)
break}
case'append':container.appendChild(element)
break
case'after':if(container.nextSibling){container.parentNode.insertBefore(element,container.nextSibling)}else{container.parentNode.appendChild(element)}
break
case'before':container.parentNode.insertBefore(element,container)
break
case'replace':try{var id=element.cfAppsElementId=Math.random().toString(36)
prevEls[id]=container}catch(e){}
container.parentNode.replaceChild(element,container)}
return element}catch(e){if(typeof console!=='undefined'&&typeof console.error!=='undefined'){console.error('Error creating Cloudflare Apps element',e)}}}}());(function(){'use strict'
CloudflareApps.matchPage=function matchPage(patterns){if(!patterns||!patterns.length){return true}
var loc=document.location.host+document.location.pathname
if(window.CloudflareApps&&CloudflareApps.proxy&&CloudflareApps.proxy.originalURL){var url=CloudflareApps.proxy.originalURL.parsed
loc=url.host+url.path}
for(var i=0;i<patterns.length;i++){var re=new RegExp(patterns[i],'i')
if(re.test(loc)){return true}}
return false}}());CloudflareApps.installs["nW2jca1QK0Gz"]={appId:"xsF3FQjLUN4y",scope:{}};;CloudflareApps.installs["nW2jca1QK0Gz"].options={"numSparkles":8};;CloudflareApps.installs["nW2jca1QK0Gz"].URLPatterns=["^v2.suda.moe/auth/login/?.*$","^v2.suda.moe/auth/register/?.*$","^v2.suda.moe/user/?$"];;if(CloudflareApps.matchPage(CloudflareApps.installs['nW2jca1QK0Gz'].URLPatterns)){(function(){'use strict'
var requestAnimationFrame=window.requestAnimationFrame||window.mozRequestAnimationFrame||window.ieRequestAnimationFrame||window.webkitRequestAnimationFrame
function normalize(x,MIN,MAX){return(x-MIN)/(MAX-MIN)}
function denormalize(x,MIN,MAX){return x*(MAX-MIN)+MIN}
function getRandomFloat(min,max){return Math.random()*(max-min)+min}
function getRandomInt(min,max){return Math.floor(Math.random()*(max-min+1)+min)}
function CursorSparkler(options){options=options||{}
options.mode=options.mode||CursorSparkler.modes.trail
options.numSparkles=options.numSparkles||20
options.sparkleFactor=1
options.sparkleDurationRange=[50,500]
options.sparkleDistanceRange=[40,100]
options.sparkleSizeRange=[1,5]
this.options=options
this.el=document.createElement('div')
this.el.style.position='absolute'
this.el.style.top=-this.options.sparkleSizeRange[1]+'px'
this.el.style.left=-this.options.sparkleSizeRange[1]+'px'
this.el.style.zIndex=10000
this.el.style.pointerEvents='none'
this.el.style.width='1px'
this.el.style.height='1px'
this.x=0
this.y=0
this.shouldAnimate=true
this.sparkles=[]
this.onMouseMove=this.onMouseMove.bind(this)
this.onMouseDown=this.onMouseDown.bind(this)
this.onMouseUp=this.onMouseUp.bind(this)
this.onAnimationFrame=this.onAnimationFrame.bind(this)}
CursorSparkler.modes={follow:'follow',trail:'trail'}
CursorSparkler.TranslateZero='translate3d(0, 0, 0)'
CursorSparkler.prototype.listen=function(){window.addEventListener('mousemove',this.onMouseMove)
window.addEventListener('mousedown',this.onMouseDown)
window.addEventListener('mouseup',this.onMouseUp)
document.body.appendChild(this.el)
requestAnimationFrame(this.onAnimationFrame)}
CursorSparkler.prototype.destroy=function(){this.el.parentElement.removeChild(this.el)
window.removeEventListener('mousemove',this.onMouseMove)
this.shouldAnimate=false}
CursorSparkler.prototype.render=function(time){if(this.options.disabled){if(this.el.style.display!=='none')this.el.style.display='none'
return}else{if(this.el.style.display!=='block')this.el.style.display='block'}
if(this.options.mode===CursorSparkler.modes.follow){this.el.style.transform='translate3d('+this.x+'px, '+this.y+'px, 0)'}else{if(this.el.style.transform!==CursorSparkler.TranslateZero){this.el.style.transform=CursorSparkler.TranslateZero}}
var numSparkles=this.options.numSparkles
if(this.sparkles.length>numSparkles){this.sparkles.slice(numSparkles).forEach(function(sparkle){sparkle.destroy()})
this.sparkles.length=numSparkles}
for(var i=0,sparkle;i<numSparkles;i++){sparkle=this.sparkles[i]
if(!sparkle){this.sparkles[i]=this.sparkle(time+getRandomInt(0,(800/this.options.sparkleFactor)))
this.el.appendChild(this.sparkles[i].el)
continue}
sparkle.render(time)
if(time>=sparkle.options.startTime+sparkle.options.duration){sparkle.destroy()
this.sparkles[i]=this.sparkle(time+100)
this.el.appendChild(this.sparkles[i].el)}}}
CursorSparkler.prototype.sparkle=function(startTime){var options=this.options
var sf=options.sparkleFactor
var sDuration=options.sparkleDurationRange
var sDistance=options.sparkleDistanceRange
var sSize=options.sparkleSizeRange
var startX=options.mode===CursorSparkler.modes.trail?this.x:0
var startY=options.mode===CursorSparkler.modes.trail?this.y:0
startX+=options.sparkleSizeRange[1]
startY+=options.sparkleSizeRange[1]
return new Sparkle({window:this.window,startTime:startTime,startX:startX,startY:startY,duration:getRandomInt(sDuration[0],sDuration[1]/sf),distance:getRandomInt(sDistance[0],sDistance[1]*(sf===1?1:sf/4)),size:getRandomInt(sSize[0],sSize[1]*(sf===1?1:sf/3))})}
CursorSparkler.prototype.onMouseMove=function(e){this.x=e.pageX
this.y=e.pageY}
CursorSparkler.prototype.onMouseDown=function(e){if(!this.originalSparkleFactor){this.originalSparkleFactor=this.options.sparkleFactor}else{this.options.sparkleFactor=this.originalSparkleFactor}
this.options.sparkleFactor*=4}
CursorSparkler.prototype.onMouseUp=function(e){this.options.sparkleFactor=this.originalSparkleFactor||1
delete this.originalSparkleFactor}
CursorSparkler.prototype.onAnimationFrame=function(time){if(!this.shouldAnimate)return
if(!this.start)this.start=time
this.render(time)
requestAnimationFrame(this.onAnimationFrame)}
function Sparkle(options){options=options||{}
options.duration=options.duration||getRandomInt(50,500)
options.direction=options.direction||getRandomFloat(0,Math.PI*2)
options.distance=options.distance||getRandomInt(40,100)
options.size=options.size||getRandomInt(1,5)
options.color=options.color||Sparkle.getFantasticColor()
options.startTime=options.startTime||0
this.options=options
this.el=document.createElement('div')
this.el.style.position='absolute'
this.el.style.background=this.options.color
this.el.style.width=this.options.size+'px'
this.el.style.height=this.options.size+'px'
this.el.style.borderRadius=this.options.size+'px'
this.el.style.transform='translate3d(0,0,0)'}
Sparkle.fantasticColors=['yellow','pink','red','orange','purple','cyan']
Sparkle.getFantasticColor=function(){return Sparkle.fantasticColors[~~(Sparkle.fantasticColors.length*Math.random())]}
Sparkle.prototype.destroy=function(){this.el.parentElement.removeChild(this.el)}
Sparkle.prototype.render=function(time){var step=normalize(time,this.options.startTime,this.options.startTime+this.options.duration)
var x=this.options.startX+Math.sin(this.options.direction)*this.options.distance*step
var y=this.options.startY+Math.cos(this.options.direction)*this.options.distance*step
this.el.style.opacity=1-step
this.el.style.transform='translate3d('+x+'px, '+y+'px, 0)'}
var options=CloudflareApps.installs['nW2jca1QK0Gz'].options
var sparkler=new CursorSparkler(options)
function bootstrap(){sparkler.listen()}
if(document.readyState==='loading'){document.addEventListener('DOMContentLoaded',bootstrap)}else{bootstrap()}
CloudflareApps.installs['nW2jca1QK0Gz'].scope={setOptions:function setOptions(nextOptions){for(var key in nextOptions){sparkler.options[key]=nextOptions[key]}}}}())}