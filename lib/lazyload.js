// 懒加载图片
// 1 获取滚动的元素 获取设备高度
var scrollElement = document.querySelector('.home-content'),
    viewH = document.documentElement.clientHeight;

/**
 * .懒加载方法
 * 
 */
function lazyload() {
    // 获取所有需要进行操作的domo元素
    var nodes = document.querySelectorAll('img[data-src]');

    // 遍历所有dom元素
    Array.prototype.forEach.call(nodes, function (item, index) {
        // 初始化 rect属性
        var rect;
        // 当dom的data-src === 空的时候 返回
        if (item.dataset.src === '') return;

        // 获取元素的react 属性 (能拿到元素相对于屏幕的坐标)
        rect = item.getBoundingClientRect();

        // 当元素 底部与视口底部的距离 大于等于0 且 元素顶部与视口顶部的距离 小于设备高度的时候执行
        if (rect.bottom >= 0 && rect.top < viewH) {
            (function (item) {
                // 创建新图片
                var img = new Image();
                img.onload = function () {
                    item.src = img.src;
                }
                // 把原domimg中的 data-src属性取出来赋值给 新创建的图片 激活了新图片的onload方法
                img.src = item.dataset.src
                item.dataset.src = ''
            })(item)
        }
    })
}

lazyload();


function throttle(fun, delay, time) {
    var timeout,
        startTime = new Date();
    return function () {
        var context = this,
            args = arguments,
            curTime = new Date();
        clearTimeout(timeout);
        if (curTime - startTime >= time) {
            fun.apply(context, args);
            startTime = curTime;
        } else {
            timeout = setTimeout(fun, delay);
        }
    };
};
window.addEventListener('scroll', throttle(lazyload, 500, 1000));