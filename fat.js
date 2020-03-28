/* 获取元素 */
function $(cssSelector,parent){
    parent = parent||document; 
    var els = parent.querySelectorAll(cssSelector);
    return els.length > 1?els:els[0];
};
/* END */

/*******************************
*   随机数
*   min > 最小值 && max > 最大值
*/
function getNum(min,max){
    return Math.round(Math.random() * ( max - min ) + min);
};
/* END */

/* 动画框架 */
var Tween = {
	linear: function (t, b, c, d){  //匀速
		return c*t/d + b;
	},
	easeIn: function(t, b, c, d){  //加速曲线
		return c*(t/=d)*t + b;
	},
	easeOut: function(t, b, c, d){  //减速曲线
		return -c *(t/=d)*(t-2) + b;
	},
	easeBoth: function(t, b, c, d){  //加速减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t + b;
		}
		return -c/2 * ((--t)*(t-2) - 1) + b;
	},
	easeInStrong: function(t, b, c, d){  //加加速曲线
		return c*(t/=d)*t*t*t + b;
	},
	easeOutStrong: function(t, b, c, d){  //减减速曲线
		return -c * ((t=t/d-1)*t*t*t - 1) + b;
	},
	easeBothStrong: function(t, b, c, d){  //加加速减减速曲线
		if ((t/=d/2) < 1) {
			return c/2*t*t*t*t + b;
		}
		return -c/2 * ((t-=2)*t*t*t - 2) + b;
	},
	elasticIn: function(t, b, c, d, a, p){  //正弦衰减曲线（弹动渐入）
		if (t === 0) { 
			return b; 
		}
		if ( (t /= d) == 1 ) {
			return b+c; 
		}
		if (!p) {
			p=d*0.3; 
		}
		if (!a || a < Math.abs(c)) {
			a = c; 
			var s = p/4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return -(a*Math.pow(2,10*(t-=1)) * Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
	},
	elasticOut: function(t, b, c, d, a, p){    //*正弦增强曲线（弹动渐出）
		if (t === 0) {
			return b;
		}
		if ( (t /= d) == 1 ) {
			return b+c;
		}
		if (!p) {
			p=d*0.3;
		}
		if (!a || a < Math.abs(c)) {
			a = c;
			var s = p / 4;
		} else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		return a*Math.pow(2,-10*t) * Math.sin( (t*d-s)*(2*Math.PI)/p ) + c + b;
	},    
	elasticBoth: function(t, b, c, d, a, p){ 
		if (t === 0) {
			return b;
		}
		if ( (t /= d/2) == 2 ) {
			return b+c;
		}
		if (!p) {
			p = d*(0.3*1.5);
		}
		if ( !a || a < Math.abs(c) ) {
			a = c; 
			var s = p/4;
		}
		else {
			var s = p/(2*Math.PI) * Math.asin (c/a);
		}
		if (t < 1) {
			return - 0.5*(a*Math.pow(2,10*(t-=1)) * 
					Math.sin( (t*d-s)*(2*Math.PI)/p )) + b;
		}
		return a*Math.pow(2,-10*(t-=1)) * 
				Math.sin( (t*d-s)*(2*Math.PI)/p )*0.5 + c + b;
	},
	backIn: function(t, b, c, d, s){     //回退加速（回退渐入）
		if (typeof s == 'undefined') {
		   s = 1.70158;
		}
		return c*(t/=d)*t*((s+1)*t - s) + b;
	},
	backOut: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158;  //回缩的距离
		}
		return c*((t=t/d-1)*t*((s+1)*t + s) + 1) + b;
	}, 
	backBoth: function(t, b, c, d, s){
		if (typeof s == 'undefined') {
			s = 1.70158; 
		}
		if ((t /= d/2 ) < 1) {
			return c/2*(t*t*(((s*=(1.525))+1)*t - s)) + b;
		}
		return c/2*((t-=2)*t*(((s*=(1.525))+1)*t + s) + 2) + b;
	},
	bounceIn: function(t, b, c, d){    //弹球减振（弹球渐出）
		return c - Tween['bounceOut'](d-t, 0, c, d) + b;
	},       
	bounceOut: function(t, b, c, d){//*
		if ((t/=d) < (1/2.75)) {
			return c*(7.5625*t*t) + b;
		} else if (t < (2/2.75)) {
			return c*(7.5625*(t-=(1.5/2.75))*t + 0.75) + b;
		} else if (t < (2.5/2.75)) {
			return c*(7.5625*(t-=(2.25/2.75))*t + 0.9375) + b;
		}
		return c*(7.5625*(t-=(2.625/2.75))*t + 0.984375) + b;
	},      
	bounceBoth: function(t, b, c, d){
		if (t < d/2) {
			return Tween['bounceIn'](t*2, 0, c, d) * 0.5 + b;
		}
		return Tween['bounceOut'](t*2-d, 0, c, d) * 0.5 + c*0.5 + b;
	}
};
/* 动画帧兼容 */ 
(function(){
    if(!window.requestAnimationFrame){
        var lastTime = 0;
        window.requestAnimationFrame = function(callback){
            var nowTime = Date.now();
            var dely = Math.max(0,16.7 - (nowTime - lastTime));
            lastTime = nowTime;
            return setTimeout(callback,dely);
        };
        window.cancelAnimationFrame = function(index){
           clearTimeout(index);
        };
    }
})();

var transformAttr = [
    "rotate",
    "rotateX",
    "rotateY",
    "rotateZ",
    "translateX",
    "translateY",
    "translateZ",
    "scale",
    "scaleX",
    "scaleY",
    "skewX",
    "skewY"
]; 
var normalAttr = [
    "width",
    "height",
    "left",
    "top",
    "right",
    "bottom",
    "marginBottom",
    "marginleft",
    "marginRight",
    "marginTop",
    "paddingLeft",
    "paddingRight",
    "paddingTop",
    "paddingBottom"
];
function css(el,attr,val){
    if(typeof attr == "object"){
        for(var s in attr){
            css(el,s,attr[s]);
        }
        return ;
    }
    if(transformAttr.indexOf(attr) >= 0){
        return setTransform(el,attr,val);
    }
    if(val === undefined){
        val = getComputedStyle(el)[attr]; 
        return normalAttr.indexOf(attr)>=0||!isNaN(val)?parseFloat(val):val;
    } else {
        if(attr == "opacity"){
            el.style[attr] = val;
            el.style.filter = "alpha(opacity="+(val*100)+")";
        } else if(normalAttr.indexOf(attr)>=0) {
            el.style[attr] = val + "px";
        } else if(attr == "zIndex") {
            el.style[attr] = Math.round(val);
        } else {
            el.style[attr] = val;
        }
    }
}
function setTransform(el,attr,val){
    el.transform = el.transform||{};
    if(val === undefined){
        return  el.transform[attr];
    }
    el.transform[attr] = val;
    var transformVal = "";
    for(var s in  el.transform){
        switch(s){
            case "rotate":
            case "rotateX":
            case "rotateY":
            case "rotateZ":
            case "skewX":
            case "skewY":
                transformVal += s+'('+ el.transform[s]+'deg) ';
                break;
            case "translateX":
            case "translateY":
            case "translateZ":
                transformVal += s+'('+ el.transform[s]+'px) ';
                break;
            case "scale":
            case "scaleX":
            case "scaleY":
                transformVal += s+'('+ el.transform[s]+') ';
                break;       
        }
    }
    el.style.WebkitTransform = el.style.transform = transformVal.trim();
}
function mTween(op){
    var el = op.el,
    attr = op.attr,
    fx = op.fx||"easeOut",
    duration = op.duration||400,
    maxC = 0;
    if(el.animationTimer){
        return;
    }
    var t = 0;
    var b = {};
    var c = {};
    for(var s in attr){
        b[s] = css(el,s);
        c[s] = attr[s] - b[s];
        maxC = Math.max(maxC,Math.abs(c[s]));
    }
    if(typeof duration === "object"){
        var durationOption = duration;
        durationOption.multiple =  durationOption.multiple||2;
        duration = maxC * duration.multiple;
        duration =  durationOption.max?Math.min(duration,durationOption.max):duration;
        duration =  durationOption.min?Math.max(duration,durationOption.min):duration;
    }
    var d = Math.ceil(duration/(1000/60));
    move();
    function move(){
        el.animationTimer = requestAnimationFrame(function(){
            t++;
            if(t > d){
                el.animationTimer = null;
                op.cb&&op.cb();
            } else {
                for(var s in attr){
                    var val = Tween[fx](t,b[s],c[s],d);
                    css(el,s,val);
                }
                move();
            }
        });
    }
}
mTween.stop = function(el){
    cancelAnimationFrame(el.animationTimer);
    el.animationTimer = null;
};

/* 抖动封装 */
function shake(op){
    var el = op.el,
    attr = op.attr,
    shakeLength = op.shakeLength||15,
    shakeArr = [];
    el.shakeStart = {};
    if(el.shake) {
        return ;
    } 
    if(typeof attr === "object" ){
        for(var i = 0; i < attr.length; i++){
            el.shakeStart[attr[i]] = css(el,attr[i]);
        }
    } else {
        el.shakeStart[attr] = css(el,attr);
    }
    for(var i = shakeLength; i >= 0; i--){
        shakeArr.push(i%2?i:-i);
    }
    move();
    function move(){
        el.shake = requestAnimationFrame(function(){
            if(shakeArr.length <= 0){
                el.shake = false;
                op.cb&&op.cb();
            } else {
                var nub = shakeArr.shift();
                for(var s in  el.shakeStart){
                    css(el,s, el.shakeStart[s] + nub);
                }
                move();
            }
        });
    };
};
shake.stop = function(el){
    cancelAnimationFrame(el.shake);
    el.shake = false;
    for(var s in  el.shakeStart){
        css(el,s, el.shakeStart[s]);
    }
};
/* END */

/*************************************
*   获取相对于可视区页面的宽高
*   el > 元素 || {left,top} || el.offsetLeft
**/
function getPageOffset(el){
    var left = el.offsetLeft;
    var top =  el.offsetTop;
    while(el.offsetParent){
        el = el.offsetParent;
        left += el.offsetLeft + el.clientLeft;
        top += el.offsetTop + el.clientTop;
    }
    return {left,top};
};
/* END */

/************************************* 
*   正方形碰撞原理
*   el > 主动碰撞的元素 || el2 > 被碰撞的元素
**/
function SquareCollision(el,el2){
    let rectEl1 = el.getBoundingClientRect();
    let rectEl2 = el2.getBoundingClientRect();
    if (rectEl1.right < rectEl2.left ||
        rectEl2.right < rectEl1.left ||
        rectEl1.bottom < rectEl2.top ||
        rectEl2.bottom < rectEl1.top
    ) {
        return false;
    };
    return true;
};
/* END */

/***************************************
*   鼠标滚轮：兼容 fierfox / Chrome
*   el > 参数 || downFn > 向下滚轮 || upFn > 向上滚轮
**/
function toWheel(el,downFn,upFn){
    el.addEventListener('mousewheel',function(e){
        if(e.wheelDelta>0){
            upFn&&upFn.apply(el);
        }else{
            downFn&&downFn.apply(el);
        }
    });
    el.addEventListener('DOMMouseScroll',function(e){
        if(e.detail>0){
            downFn&&downFn.apply(el);
        }else{
            upFn&&upFn.apply(el);
        };
    });
};
/* END */

/****************************************
*   节流：间隔执行
*   fn > 要节流的函数 || interval 间隔时间
**/
 function throttle(fn,interval=500){
    let timer = 0;
    return function(...arg){
        let _this = this;
        if(timer)return;
        fn.call(_this,...arg);
        clearTimeout(timer);
        timer = setTimeout(function(){
            timer = 0;
        },interval);
    };
};
/* END */

/****************************************
*   防抖：返回最后一次执行的
*   fn > 要防抖的函数 || interval > 间隔时间
**/
function debounce(fn,interval=500){
    let timer = 0;
    return function(...arg){
        let _this = this;
        clearTimeout(timer);
        timer = setTimeout(function(){
            fn.call(_this,...arg);
        },interval);
    };
};
/* END */

/*****************************************
*   Android 多指兼容处理 
*   el > 元素 || ev > 方法调用 start(){},change(){},end(){} && 兼容 e.seale 和 e.rotation
**/
function AndroidGesture(el,ev){
    let isGesture = false;
    let scaleDown = 0;
    let rotateDown = 0;
    el.addEventListener("touchstart",(e)=>{
        let touch = e.touches;
        if(touch.length>=2){
            isGesture = true;
            scaleDown = Math.sqrt(Math.pow(Math.abs(touch[0].pageX) - Math.abs(touch[1].pageX),2) + Math.pow(Math.abs(touch[0].pageY) - Math.abs(touch[1].pageY),2));
            rotateDown = Math.atan2(touch[1].pageY - touch[0].pageY,touch[1].pageX - touch[0].pageX) * 180 / Math.PI;
            ev.start && ev.start.call(el,e);
        };
    });
    el.addEventListener("touchmove",(e)=>{
        let touch = e.touches;
        if(isGesture){
            let scaleMove = Math.sqrt(Math.pow(Math.abs(touch[0].pageX) - Math.abs(touch[1].pageX),2) + Math.pow(Math.abs(touch[0].pageY) - Math.abs(touch[1].pageY),2));
            let rotateMove = Math.atan2(touch[1].pageY - touch[0].pageY,touch[1].pageX - touch[0].pageX) * 180 / Math.PI; // 求坐标
            e.scale = scaleMove / scaleDown;
            e.rotation = rotateMove - rotateDown;
            ev.change && ev.change.call(el,e);
        };
    });
    el.addEventListener("touchend",(e)=>{
        if(isGesture){
            isGesture = false;
            ev.end && ev.end.call(el,e);
        }; 
    });
};
/* END */

/*****************************************
*   深拷贝数据
*   obj > 被拷贝到数据
**/
function deepCopy(obj){
    let newObj = Array.isArray(obj)?[]:{};
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            if(typeof obj[key]==="object"){
                newObj[key] = deepCopy(obj[key]);
            }else{
                newObj[key] = obj[key];
            }
        };
    };
    return newObj;
};
/* END */

/******************************************
*   自定义事件（模板）
*   添加 > addEvent("el",fn)
*   执行 > triggerEvent("el")
*   移除 > removeEvent("el",fn)
*/
class MyCustomEvent{
    constructor(){
        this.handle = {};
    }
    // 创建事件
    addEvent(eventName, fn) {
        if (typeof this.handle[eventName] === "undefined") {
            this.handle[eventName] = [];
        };
        this.handle[eventName].push(fn);
    }
    // 执行事件
    triggerEvent(eventName) {
        this.handle[eventName].forEach(event => {
            event && event();
        });
    };
    // 移除事件
    removeEvent(eventName, fn) {
        for (let i = 0; i < handle[eventName].length; i++) {
            if (this.handle[eventName][i] === fn) {
                this.handle[eventName].splice(i, 1);
                break;
            };
        };
    };
}
/* END */

/* 自定义事件机制（api）接口 */
class CustomEventApi{
    constructor(){
        this.events = {}; 
    }
    on(event,fn){   // 添加事件监听
        if(!this.events[event]){
            this.events[event] = [];
        }
        this.events[event].push(fn);
    }
    off(event,fn){  // 取消事件监听
        if(!this.events[event])return;
        if(fn){
            this.events[event] = this.events[event].filter(item=>item!==fn);
        } else {
            this.events[event].length = 0;
        }
    }
    once(event,fn){  // 事件处理函数只执行一次
        fn.once = true;
        this.on(event,fn);
    }
    dispatch(event){  // 触发事件
        if(!this.events[event])return;
        this.events[event].forEach(item => {
            item.call(this);
            if(item.once){
                this.off(event,item);
            }
        });
    }
}


/* 观察者模式-发布订阅模式 */
class Dep{
    constructor(){
        this.subs = [];
    }
    addSub(sub){
        this.subs.push(sub);
    }
    notify(newValue){
        this.subs.forEach(sub=>{
            sub.update(newValue);
        })
    }
}
class Watcher{
    constructor(data,key,cb){
        Dep.target = this;
        this.cb = cb;
        //人为触发get添加 watcher;
        data[key];
        Dep.target = null;
    }
    update(newValue){
        this.cb(newValue);
    }
}
/* END */

/* Ajax is jsonp */
function ajax(options) {
    let opts = Object.assign({
        method: 'get',
        url: '',
        headers: {
            'content-type': 'application/x-www-form-urlencoded'
        },
        jsonp:"cb",
        data: '',
        async: true,
        success: function () { }
    }, options)

    // 处理jsonp请求；
    if(opts.dataType==="jsonp"){
        jsonpFn(opts.url,opts.data,opts.jsonp,opts.success);
        return false;
    }

    // jsonp 封装
    function jsonpFn(url, data, cbName, cbFn) {
        let fnName = "KKB_" + Math.random().toString().substr(2);
        window[fnName] = cbFn;
        let path = url + "?" + links(data) + "&" + cbName + "=" + fnName;
        let o = document.createElement("script");
        o.src = path;
        document.querySelector("head").appendChild(o);
    }

    // 实例化 AJAX
    let xhr = new XMLHttpRequest();

    // get 请求处理
    if (options.method == "get") {
        let data = links(opts.data)
        options.url = options.url + "?" + data;
    }

    xhr.open(options.method, options.url, options.async);

    for (let key in opts.headers) {
        xhr.setRequestHeader(key, opts.headers[key]);
    }

    // 处理数据头
    let sendData;
    switch (opts.headers['content-type']) {
        case 'application/x-www-form-urlencoded':
            sendData = links(opts.data);
            break;
        case 'application/json':
            sendData = JSON.stringify(opts.data);
            break;
    }

    // 后端返还数据 XML 和 Text 处理
    xhr.onload = function () {
        let resData = null;
        if (xhr.getResponseHeader("content-type").includes("xml")) {
            resData = xhr.responseXML;
        } else {
            resData = JSON.parse(xhr.responseText);
        }
        options.success(resData);
    };

    // 发送数据 get、post 处理
    if (options.method == "get") {
        xhr.send();
    } else {
        xhr.send(sendData);
    }

    // 处理链接 name=fred&age=20 形式
    function links(obj) {
        let keys = Object.keys(obj);
        let values = Object.values(obj);
        return keys.map((v, k) => {
            return `${v}=${values[k]}`;
        }).join("&");
    };
};
/* END */

/* 设置cookie方法 */
function setCookie(name,value,options={}){
    let cookieData = `${name}=${value};`;
    for(let key in options){
        let str = `${key}=${options[key]};`;
        cookieData += str;
    };
    document.cookie = cookieData;
};
/* END */

/* 获取cookie方法 */
function getCookie(name){
    let arr = document.cookie.split("; ");
    for(let i =0;i<arr.length;i++){
        let arr2 = arr[i].split("=");
        if(arr2[0]==name){
            return arr2[1];
        };
    };
    return "";
};
/* END */

export {
    getNum,
    css,
    mTween,
    shake,
    getPageOffset,
    SquareCollision,
    toWheel,
    throttle,
    debounce,
    AndroidGesture,
    deepCopy,
    MyCustomEvent,
    CustomEventApi,
    ajax,
    getCookie,
    setCookie
}