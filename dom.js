/* 获取样式 */
function $(selector){ 
    var type = selector.substring(0, 1);
    if (type === '#') {
        if (document.querySelecotor) return document.querySelector(selector)
            return document.getElementById(selector.substring(1))

    }else if (type === '.') {
        if (document.querySelecotorAll) return document.querySelectorAll(selector)
            return document.getElementsByClassName(selector.substring(1))
    }else{
        return document['querySelectorAll' ? 'querySelectorAll':'getElementsByTagName'](selector)
    }
} 

/* 检测类名 */
function hasClass (ele, name) {
    return ele.className.match(new RegExp('(\\s|^)' + name + '(\\s|$)'));
}

/* 添加类名 */
function addClass (ele, name) {
    if (!this.hasClass(ele, name)) ele.className += " " + name;
}

/* 删除类名 */
function removeClass (ele, name) {
    if (this.hasClass(ele, name)) {
        var reg = new RegExp('(\\s|^)' + name + '(\\s|$)');
        ele.className = ele.className.replace(reg, '');
    }
}

/* 替换类名 */
function replaceClass (ele, newName, oldName) {
    this.removeClass(ele, oldName);
    this.addClass(ele, newName);
}

/* 获取兄弟节点 */
function siblings (ele) {
    console.log(ele.parentNode)
    var chid = ele.parentNode.children,eleMatch = []; 
    for(var i = 0, len = chid.length; i < len; i ++){ 
        if(chid[i] != ele){ 
            eleMatch.push(chid[i]); 
        } 
    } 
    return eleMatch;
}

/* 获取行间样式属性 */
function getByStyle (obj,name){
    if(obj.currentStyle){
        return  obj.currentStyle[name];
    }else{
        return  getComputedStyle(obj,false)[name];
    }
}

export {
    $, hasClass, removeClass, addClass, replaceClass, siblings, getByStyle
}