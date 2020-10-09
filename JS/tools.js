// 创建一个可以简单执行动画的函数
// 执行动画的对象 动画的样式 动画的目标位置 移动的速度 回调函数
function move(obj,attr,target,speed,callback){
    // 关闭上一个定时器
    clearInterval(obj.timer);

    //获取元素目前的位置
    var current=parseInt(getStyle(obj,attr));

    // 判断速度的正负值
    if(current > target){
        speed=-speed;
    }

    // 开启一个定时器，用来执行动画效果
    obj.timer=setInterval(function(){

        // 获取box1原来的left值
        var oldvalue=parseInt(getStyle(obj,attr));

        // 计算新值
        var newvalue=oldvalue+speed;

        // 判断向左或者向右移动 新值是否超界
        if((speed < 0 && newvalue < target) || (speed > 0 && newvalue > target)){
            newvalue=target;
        }

        // 设置新值给box1   
        obj.style[attr]=newvalue+"px";


        // 设置停止执行动画
        if(newvalue==target){
            // 关闭定时器
            clearInterval(obj.timer);
            // 动画执行完毕，调用回调函数
            callback && callback();
        }

    },30)

}

// 获取指定元素的当前样式
function getStyle(obj,name){
    if(window.getComputedStyle){
        // 正常浏览器的方式
        return getComputedStyle(obj,null)[name];
    }else{
        // IE8的方式
        return obj.getComputedStyle[name];
    }
} 

// 定义一个函数,用来向一个元素中添加指定的class属性值
function addClass(obj,cn){

    // 判断obj中是否含有cn
    if(!hasClass(obj,cn)){
        obj.className += " " + cn;
    }
}

// 判断一个元素中是否含有指定的class属性值
function hasClass(obj,cn){

    // 创建一个正则表达式
    // var reg=/\bb2\b/;
    var reg = new RegExp("\\b"+cn+"\\b");

    // 判断obj中有没有cn class
    return reg.test(obj.className);
}

// 删除一个元素中的指定的class属性
function removeClass(obj,cn){

     // 创建一个正则表达式
     var reg = new RegExp("\\b"+cn+"\\b");

    //  删除class
    obj.className=obj.className.replace(reg,"");
    
}

// 用来切换一个类
function toggleClass(obj,cn){

    // 判断obj中是否含有cn
    if(hasClass(obj,cn)){
        // 有则删除class
        removeClass(obj,cn);
    }else{
        // 没有则添加
        addClass(obj,cn);
    }
}