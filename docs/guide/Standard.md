# 开发规范

## 源码管理

- 从main主仓库拉取代码后，自己创建个分支，所有代码提交到自己的分支，不允许直接将代码提交到main分支
- 做完一个大的功能或一组小功能后在本地提交一次代码，一天往GitHub上推送一次代码，代码提交需要写修改内容
- 务必使用`.gitignore`来排序本地文件,不允许将项目无关的文件签入到源码

::: danger 警告

源码签入只允许签入源代码、项目配置文件、静态文件。其余文件不允许签入，尤其是不要将`node_modules`依赖包，发布后的`dist`,本地调试、编辑器配置等无关文件签入

:::

## 源码文件目录管理

- src：所有代码源文件，放在src文件夹中
- src/main：主线程相关的放这里
- src/renderer：渲染进程相关的放这里
- src/renderer/components：所有组件都放这里
- static：静态文件放这里

## 代码规范

### 类型

#### 所有的赋值都使用`const`或`let`，避免使用`var`

> 因为这个确保你不会改变你的初始值，重复引用会导致bug和代码难以理解,如果一定要对参数进行赋值，可以用let声明。let和const都是块级作用域，不会变量提升

### 对象

#### 使用字面变量创建对象

```js {.line-numbers}
// 不推荐的写法
const obj = new Object()
// 推荐的写法
const obj = {}
```

#### 对象中定义方法时，用简写

```js {.line-numbers}
// 不推荐的写法
const obj = {
    name: 'lyr',
    getAge: function(a) {
        return a + 1
    }
}
// 推荐的写法，对象中的方法使用简写
const obj = {
    name: 'lyr',
    getAge(val) {
        return val + 1
    }
}
```

#### 对象中的属性值使用简写

> 当对象中的属性值与变量值同名时，使用简写

```js {.line-numbers}
// 不推荐的写法
const name = 'lyr'
const obj = {
    name: name
}
// 推荐的写法
const obj = {
    name
}
```

#### 对象中有多个属性使用缩写时，将缩写的属性前置

```js {.line-numbers}
const name = 'lyr'
const age = 13

const obj = {
    name,
    age,
    address: '地址'
}
```

#### 对象中只对那些无效的标识使用引号`''`

> 这种方式主观上易读。也优化了代码高亮，并且更容易被许多JS引擎压缩

```js {.line-numbers}
// 不推荐的写法：属性都加上了引号
const obj = {
    'name': 'lyr',
    'age': 12,
    'home-address': 'address'
}
// 推荐的写法：只对那些不符合命名规范的标识添加引号
const obj = {
    name: 'lyr',
    age: 12,
    'home-address': 'address'
}
```

### 数组

#### 使用字面变量声明数组

```js {.line-numbers}
// 不推荐写法
const arr = new Array()
// 推荐的写法
const arr = []
```

#### 往数组中添加一项时，使用`push`,而不是直接添加

```js {.line-numbers}
// 不推荐的写法
const arr = [1,2]
arr[arr.length] = 3
console.log(arr) //=>[1,2,3]

// 推荐的写法
const arr = [1,2]
arr.push(3)
console.log(arr) //=>[1,2,3]
```

::: warning 注意
特別是在 vue 环境中，经常出现数组或对象的值已经发生改变，但视图没有及时更新的情况。这是由于 js 的限制，Vue 不能检测数组的变动，以及对象的添加/删除，导致视图无法及时更新。Vue 可以监听数组原生修改方法：splice()、 push()、pop()、shift()、unshift()、sort()、reverse()
:::

#### 使用`...`运算符进行数组的复制

```js {.line-numbers}
const arr = [1,2]
const arr1 = [...arr]
console.log(arr1) //=>[1,2]
```

#### 使用`...`运算符将可迭代的对象转换为数组

> 这里可以使用`Array.from`也可以用`...`运算符，相比下`...`运算符比较简便

```js {.line-numbers}
const foo = document.querySelectorAll('.foo')
// 可以使用
const nodes = Array.from(foo)
// 更简便
const nodes = [...foo]
```

#### 用`Array.from`去将一个类数组对象转成一个数组

```js {.line-numbers}
const arrLike = { 0: 'foo', 1: 'bar', 2: 'baz', length: 3 };
// 不推荐写法
const arr = Array.prototype.slice.call(arrLike);
// 推荐写法，这里不能使用展开语法，展开语法只支持可迭代对象
const arr = Array.from(arrLike);
```

#### 在数组方法的回调函数中使用 `return` 语句

> 如果函数体由一条返回一个表达式的语句组成， 并且这个表达式没有副作用， 这个时候可以忽略return

```js {.line-numbers}
const arr = [1, 2, 3]
const arr1 = arr.map(x => x + 1) //=>省略 return
console.log(arr1) //=>[2,3,4]

// 不推荐写法
const arr = [1, 2, 3]
const arr1 = arr.map(x => {
    const y = 1
    x = x + y
})
console.log(arr1) //=>[ undefined, undefined, undefined ]

// 推荐的写法
const arr = [1, 2, 3]
const arr1 = arr.map(x => {
    const y = 1
    return x + y
})
console.log(arr1) //=>[2,3,4]
```

### 解构

#### 对象赋值或获取值时，使用解构

```js {.line-numbers}
const obj = {
    name: 'lyr',
    age: 12,
    address: 'address'
}
const { name, age } = obj
console.log(name, age) //=>lyr 12
```

#### 获取数组中的值，使用解构

```js {.line-numbers}
const arr = [1, 2, 3]
const [first, second] = arr
console.log(first, second) //=>1,2
```

### 字符串

#### 字符串使用单引号`''`,超过100个字符的字符串不应该用string串联成多行

> 被折断的字符串工作起来是糟糕的而且使得代码更不易被搜索,对于长字符串也写成一行即可，不要拆分

#### 用字符串模板而不是字符串拼接来组织可编程字符串

> 模板字符串更具可读性、语法简洁、字符串插入参数

```js {.line-numbers}
// 不推荐的写法
const name = 'lyr'
const str = 'hello ' + name

// 推荐的写法
const str1 = `hello ${name}`
```

#### 不要在字符串中使用`eval()`，否则将得到意想不到的后果

### 函数

#### 用命名函数表达式而不是函数声明

- 函数表达式： const func = function () {}
- 函数声明：function func() {}

> 函数声明时作用域被提前了，这意味着在一个文件里函数很容易在其定义之前被引用。这样破坏了代码可读性和可维护性

```js {.line-numbers}
function fn(){
    // 普通写法
}

const fn1 = function(){
    // 好一点的写法
}

// 函数表达式名和声明的函数名是不一样的
const fn2= function test(){
    // 推荐的写法
}
// 只能通过fn2()调用函数，不能通过test()调用
```

#### 把立即执行函数包裹在圆括号里

> 一个立即调用的函数表达式是一个单元 - 把它和他的调用者（圆括号）包裹起来，在括号中可以清晰的地表达这些

```js {.line-numbers}
(function(a) {
    console.log(a);
}(2))
```

#### 不要在非函数块中定义函数(如if,while等)，而是把这个函数分配给一个变量

> 不要把函数的定义放在循环里面

```js {.line-numbers}
// 不推荐写法
if (true) {
    function fn() {
        console.log('233')
    }
    fn()
}
// 推荐的写法
if (true) {
    const fn = function() {
        console.log('233');
    }
    fn()
}
```

#### 用默认参数语法而不是在函数里对参数重新赋值

> 当参数需要给定默认值时，在函数参数中写默认值，而不是在函数中重新赋值

```js {.line-numbers}
// 不推荐写法
function fn(opts) {
    opts = opts || {}
}

// 推荐的写法
function fn(opts = {}) {

}
```

#### 不要使用函数构造器创建函数

> 以这种方式创建函数将类似于字符串 eval()，这会打开漏洞

```js {.line-numbers}
// 不推荐的写法
const fn = new Function('a', 'b', 'return a+b')
fn(2, 3) //=>5
```

### 类和构造函数

#### 常用class，避免直接操作prototype

```js {.line-numbers}
// 不推荐写法
function Queue(contents = []) {
  this.queue = [...contents];
}
Queue.prototype.pop = function () {
  const value = this.queue[0];
  this.queue.splice(0, 1);
  return value;
};

// 推荐的写法
class Queue {
  constructor(contents = []) {
    this.queue = [...contents];
  }
  pop() {
    const value = this.queue[0];
    this.queue.splice(0, 1);
    return value;
  }
}
```

### 组件、模块 Modules

#### 用(import/export) 模块而不是无标准的模块系统

#### 导入模块时，不要用import通配符`*`，要按需引入

#### 不要直接从import中直接export

> 虽然直接在import中export使代码更简洁，但是有一个明确的入口和一个明确的出口，可以保证代码的规范性和一致性

```js {.line-numbers}
// 不推荐的写法
// filename es6.js
export { es6 as default } from './AirbnbStyleGuide'

// 推荐的写法
// filename es6.js
import { es6 } from './AirbnbStyleGuide'
export default es6
```

#### 一个路径只 import 一次

> 虽然多次import不会报错，但是不易维护

```js {.line-numbers}
// 不推荐的写法
import foo from 'foo'
import { named1, named2 } from 'foo'

// 推荐的写法
import foo, { named1, named2 } from 'foo';
```

#### 不要导出可变的东西

> 变化通常都是需要避免，特别是当你要输出可变的绑定。虽然在某些场景下可能需要这种技术，但总的来说应该导出常量

```js {.line-numbers}
// 不推荐写法
let foo = 3
export { foo }

// 推荐的写法
const foo = 3
export { foo }
```

#### 在一个单一导出模块里，用 export default 更好

> 鼓励使用更多文件，每个文件只做一件事情并导出，这样可读性和可维护性更好

```js {.line-numbers}
// 不推荐写法
export function foo() {}

// 推荐的写法
export default function foo() {}
```

#### import 必须放在其他所有语句之前

### Properties属性

#### 用`.`去访问属性，而不是使用`['属性名']`，除非用变量去获取属性

```js {.line-numbers}
const luke = {
    jedi: true,
    age: 28,
};
// 不推荐的写法
console.log(luke['age'])
    // 推荐的写法
console.log(luke.age)

// 用变量获取属性
let pro = 'jedi'
console.log(luke[pro]);
```

### Variables变量

#### 声明变量时const放一起，let放一起

#### 不要使用链接变量分配

> 链接变量分配创建隐式全局变量

```js {.line-numbers}
// 不推荐的写法
(function(){
    // 这里相当于 let a=(b=(c=1)),b和c都是全局变量
    let a = b = c = 1
})()
console.log(a) //=> a is not defined
console.log(b) // b=1
console.log(c) // c=1

// 推荐的写法
(function(){
    // 这里相当于 let a=(b=(c=1)),b和c都是全局变量
    let a = 1
    let b = a
    let c = b
})()
```

#### 不要使用一元自增自减运算符`（++， --）`

> 一元增量和减量语句受到自动分号插入的影响，并且可能会导致应用程序中的值递增或递减的无声错误。 使用num + = 1而不是num ++或num ++语句来表达你的值也是更有表现力的。 禁止一元增量和减量语句还会阻止您无意地预增/预减值，这也会导致程序出现意外行为

```js {.line-numbers}
// 不推荐的写法
const array = [1, 2, 3]
let num = 1
num++
--num

// 推荐的写法
const array = [1, 2, 3]
let num = 1
num += 1
num -= 1
```

#### 在赋值的时候避免在 = 前/后换行

> 如果赋值语句超出 max-len， 那就用小括号把这个值包起来再换行

```js {.line-numbers}
// 不推荐的写法
const foo =
  superLongLongLongLongLongLongLongLongFunctionName()
// 推荐的写法
const foo = (
  superLongLongLongLongLongLongLongLongFunctionName()
)
```

#### 不允许有未使用的变量

> 一个声明了但未使用的变量更像是由于重构未完成产生的错误。这种在代码中出现的变量会使阅读者迷惑

### Comparison Operators & Equality比较运算符和相等

#### 用`===`和`!==`而不是`==`和`!=`

#### 布尔值用缩写，而字符串和数字要明确比较对象

```js {.line-numbers}
// 不推荐的写法
if (isValid === true) {
}
// 推荐的写法
if (isValid) {
}

// 对于对象
// 不推荐的写法
if (name) {
}

// 推荐的写法
if (name !== '') {
}
```

#### 在case和default分句里用大括号创建一块包含语法声明的区域

> ==语法声明在整个switch的代码块里都可见==，但是只有当其被分配后才会初始化，他的初始化时当这个case被执行时才产生。 当多个case分句试图定义同一个事情时就出问题了

```js {.line-numbers}
switch (key) {
    case 1:
        let x=1
        break;
    case 2:
        let x=2 //=>报错：Identifier 'x' has already been declared
        break;
    default:
        break;
}
// 推荐的写法
switch (key) {
    case 1:{
        let x=1
        break;
    }
    case 2:{
        let x=2
        break;
    }
    default:
        break;
}
```

#### 三元表达式不应该嵌套，通常是单行表达式

```js {.line-numbers}
// 不推荐写法
const foo = maybe1 > maybe2
  ? "bar"
  : value1 > value2 ? "baz" : null

// 推荐的写法
const maybeNull = value1 > value2 ? 'baz' : null
const foo = maybe1 > maybe2 ? 'bar' : maybeNull
```

#### 用圆括号来混合操作符

> 提高了可读性，并且明确了开发者的意图。只有当标准的算术运算符(+, -, *, & /)， 并且它们的优先级显而易见时，可以不用圆括号括起来

```js {.line-numbers}
// 不推荐的写法
const foo = a && b < 0 || c > 0 || d + 1 === 0

// 推荐的写法
const foo = (a && b < 0) || c > 0 || (d + 1 === 0)
```
