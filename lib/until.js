// 設置cookie
function setCookie(name, value, time) {
    var strsec = getsec(time);
    var exp = new Date();
    exp.setTime(exp.getTime() + strsec * 1);
    document.cookie = name + "=" + escape(value) + ";expires=" + exp.toGMTString();
}

function getsec(str) {
    var str1 = str.substring(1, str.length) * 1;
    var str2 = str.substring(0, 1);
    if (str2 == "s") {
        return str1 * 1000;
    } else if (str2 == "h") {
        return str1 * 60 * 60 * 1000;
    } else if (str2 == "d") {
        return str1 * 24 * 60 * 60 * 1000;
    }
}

// 刪除cookie
function delCookie(name) {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
        document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
}
// 读取cookie
function getCookie(name) {
    var arr, reg = new RegExp("(^| )" + name + "=([^;]*)(;|$)");
    if (arr = document.cookie.match(reg))
        return unescape(arr[2]);
    else
        return null;
}

// 选择排序
function sort1(arr) {
    var temp, max;
    for (var i = 0; i < arr.length - 1; i++) {
        console.log(i)
        max = i;
        for (var j = i + 1; j < arr.length; j++) {

            if (arr[i] > arr[j]) {
                max = j;
            }
            temp = arr[i];
            arr[i] = arr[max];
            arr[max] = temp;
        }
    }
    return arr;
}

// 冒泡排序
function sort2(arr) {
    var temp;
    for (var i = 0; i < arr.length; i++) {
        for (var j = 0; j < arr.length - 1 - i; j++) {
            if (arr[j] < arr[j + 1]) {
                temp = arr[j];
                arr[j] = arr[j + 1];
                arr[j + 1] = temp
            }
        }
    }
    return arr;
}

// 冒泡排序
var temp;
for (var i = 0; i < arr.length; i++) { // 有多少个数字 取多少轮
    for (var j = 0; j = arr.length - 1 - i; j++) { // 每一轮 从 0 开始 (第一个数字 -1 -i(已经运行了几轮))
        if (arr[j] > arr[j + 1]) {
            temp = arr[j];
            arr[j] = arr[j + 1];
            arr[j + 1] = temp;
        }
    }
}

for (var i = 0; i < arr.length - 1; i++) { // 取第一个需要比较的数字 最后一个数字不用比较
    var max = i;
    for (var j = i + 1; j < arr.length; j++) { // 取第二个需要比较的数字 
        if (arr[i] > arr[j]) {
            max = j;
        }
    }
    temp = arr[j];
    arr[j] = arr[i];
    arr[i] = temp;

}


// 插入排序
var preIndex;
for (var i = 1; i < arr.length; i++) {
    preIndex = i - 1;
    while (perIndex >= 0 && arr[i] < arr[preIndex]) {
        arr[preIndex + 1] = arr[preIndex];
        preIndex--;
    }
    arr[preIndex + 1] = arr[i];
}