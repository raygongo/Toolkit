/**
 * 
 * @param {*} name 
 */
// Person 基类 
function Person(name){
    this.name = name;
    this.sayName = function(){
        console.log(this.name)
    }
}
// 原型上的方法，共享方法 和内存 
Person.prototype.sayHi = function(){
    console.log(this.name)
}

let ray = new Person('巩磊');
ray.__prop__ === Person.prototype  // true 


// __prop__ 隐式原型指向创建这个对象的函数的 显式原型
// 构成原型链,同样用于实现基于原型的继承。举个例子,当我们访问obj这个对象中的x属

// 方法除了有属性__proto__,还有属性prototype，prototype指向该方法的原型对象
// 函数有一个prototype 是一个对象 里面 有 构造器指向 自己,
// 因为 prototype是一个对象 所以 这个对象会有一个__prop__指向创建这个对象的函数的原型.这里指向object
// 作用: 显式原型的作用：用来实现基于原型的继承与属性的共享。

// 构造继承  只继承了目标的 自定义属性或者方法 原型上的方法并没有继承上
function Worker(name){
    Person.apply(this,arguments);
}
// 
Worker.prototype = new Person()
Worker.prototype.constructor = Worker

let xiaoming = new Worker("小明")

var book = {
    say:function(){
        console.log(this.name)
    },
    name:"book"
}
name = "window"


// var temp = {};
// temp.__prop__ = Person.prototype
// Person.call(temp)

// Worker.prototype = temp;
// 原型继承
// Worker.prototype = new Person();


// new 做了哪些事情 
// 1. 创建一个空对象 var temp ={}
// 2. 修改对象的隐式原型指向 构造函数的原型对象 temp.__prop__ = Base.prototype
// 3. 执行构造函数 修改this指向为空创建的空对象.