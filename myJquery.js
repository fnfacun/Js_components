class Jq {
    constructor(arg, root) {
        if (typeof root === "undefined") {
            this.prevObject = new Jq(document, null);
        };
        if (root) {
            this.prevObject = root;
        };
        if (typeof arg === "string") {
            let res = document.querySelectorAll(arg);
            this.addEle(res);
        } else if (typeof arg === "function") {
            window.addEventListener("DOMContentLoaded", arg);
        } else {
            if (typeof arg.length === "undefined") {
                this[0] = arg;
                this.length = 1;
            } else {
                this.addEle(arg);
            };
        };
    }

    // 获取一组节点
    addEle(el) {
        el.forEach((item, key) => {
            this[key] = item;
        });
        this.length = el.length;
    }

    // 获取节点下标
    eq(index) {
        return new Jq(this[index], this);
    }

    // 单一点击事件
    click(fn) {
        for (let i = 0; i < this.length; i++) {
            this[i].addEventListener("click", fn);
        };
    }

    // 多个点击事件
    on(eventName, fn) {
        let arr = eventName.split(" ");
        for (let i = 0; i < arr.length; i++) {
            for (let j = 0; j < this.length; j++) {
                this[j].addEventListener(arr[i], fn);
            };
        };
    }

    // 回退函数
    end() {
        return this.prevObject;
    }

    // 操作样式
    css(...arg) {
        if (arg.length > 1) {
            // 设置样式
            for (let i = 0; i < this.length; i++) {
                if (arg[0] in $.cssHooks) {
                    $.cssHooks[arg[0]].set(this[i], arg[1]);
                } else {
                    this.setStyle(this[i], arg[0], arg[1]);
                }
            };
        } else {
            // 获取样式
            if (typeof arg[0] === "string") {
                if (arg[0] in $.cssHooks) {
                    $.cssHooks[arg[0]].get(this[0]);
                } else {
                    this.getStyle(this[0], arg[0]);
                }
            } else {
                // 设置多个样式
                for (let key in arg[0]) {
                    for (let i = 0; i < this.length; i++) {
                        this.setStyle(this[i], key, arg[0][key]);
                    };
                };
            }
        }
    }

    // 获取样式
    getStyle(el, attr) {
        return window.getComputedStyle(el, null)[attr];
    }

    // 设置样式
    setStyle(el, attr, val) {
        if (typeof val === "number" && !(attr in $.cssNumber) ) {
            el.style[attr] = val + "px";
        }
        if (attr === "zIndex") {
            el.style[attr] = Math.round(val);
        };
        if (attr = "opacity") {
            el.style.filter = "alpha(opacity=" + (val * 100) + ")";
        };
        el.style[attr] = val;
    }

}

function $(arg) {
    return new Jq(arg);
};

// 扩展
$.cssNumber = {
    columnCount: true,
    fillOpacity: true,
    fontWeight: true,
    lineHeight: true,
    opacity: true,
    orphans: true,
    widows: true,
    zIndex: true,
    zoom: true
};

$.cssHooks = {

}