## 概念

### 定义

- `TypeScript`是支持类型的`JavaScript`的超集
- 支持静态类型
- 不能直接在浏览器运行，必须先编译为JS代码



### TS的优势

- 开发过程中的**错误提示**
- 编辑器中友好的**代码提示**
- 代码的**语义更清晰**



### tsconfig.json配置文件

**生成：**

```
tsc --init
```



**使用：**

- 使用`tsc`命令编译所有文件，或使用`ts-node`运行ts文件时，会使用文件中的配置

- 使用`tsc xx.ts`编译单个文件时不会使用配置

## 类型

### 类型注解

人**主动**告诉TS某个变量的类型；



### 类型推断

TS根据已知信息，**自动**推断某个变量的类型。变量只有在**声明时就赋值**，才会进行类型推断



**写代码的原则**：能够进行类型推断的变量， 不需要注解。



### 联合类型

当一个变量的类型，可能需要转变时，可用或将其定义为多种类型的一种。

```typescript
let x: number | string = 12;
x = 'hello';
const arr: (number | string)[] = [];
arr.push(1);
arr.push('1');
```



### 类型保护

当变量取为联合类型时，只能调用多种类型的共有方法

```typescript
interface A{
  isA:boolean;
  same():void;
  a():void;
}
interface B{
  isA:boolean;
  same():void;
  b():void;
}
function func(arg: A|B) {
  arg.same();	//共有方法可以调用
  arg.a();		// TS会报错
}
```



### 类型断言

若果通过某些方式能确定变量类型，则可以通过**类型断言**的方式解决：

```typescript
if(arg.isA) {
    // 两种形式的类型断言
    (arg as A).a();	
    (<A>arg).a();
}
```



#### 能进行断言的条件

A兼容B，或B兼容A：

- `any`与`任何类型`可以相互断言
- `父类`与`子类`可以相互断言
- `联合类型`可被断言为其中一个类型



### 和类型声明的区别

类型声明比类型断言更加严格：

- 断言只需要有一方兼容另一方即可
- 通过类型声明将A转换为B，则必须A是兼容B的

```typescript
interface Animal {
    name: string;
}
interface Cat extends Animal {
    run(): void;
}
const animal: Animal = {
    name: 'tom',
};
const cat = animal as Cat; 	// 不报错
const cat:Cat = animal;		// 类型 "Animal" 中缺少属性 "run"，但类型 "Cat" 中需要该属性。
```



## 基础类型

- number
- string
- boolean
- null
- undefined
- symbol
- void




## 对象

**定义方法：**列出对象每个属性的类型，或是使用一个**interface** / **type**

```typescript
const obj: {name:string, age:number} = {
    name:'xxx',
    age:21
}
```



## 数组

**定义方法：**给出整个数组所有元素的类型

```typescript
const nums:number[] = [1,2,3];
const arr:(number|string)[1,'2']
```

或是：

```typescript
const nums:Array<number> = [1,2];
```



只读数组

- 数组元素不能被改变
- 不能调用push等**会改变数组自身**的方法
- 不能直接赋值给普通数组（可以用断言方式）

```typescript
const arr:ReadonlyArray<number> = [1,2,3];
const nums:number[] = arr as number[];	// 赋值时使用断言
```





## 元组

**定义方法：**数量有限且每一项的类型都固定的数组，分别给出**每一个元素**的类型

```typescript
const tuple:[string, string, number] = ['mike', 'male', 18]
```



## type（类型别名）

可以给一种基础类型或对象起一个别名。

和`interface`的区别：

- `interface`只能定义对象
- `type`可以定义基础类型
- 优先使用`interface`

```typescript
type Person = {
    name:string,
    age:number
}
type name = string;
const a:Person = {
    name:'a',
    age:22,
}
```



## interface（接口）

> 用于在开发过程中提供语法提示和校验，在编译后的代码中不会存在

指明里面每个属性的类型。

```typescript
interface Person{
    name: string;
    age?: number; 			// 可选的属性
    readonly sex:string;  	// 只读属性，不能对该属性进行操作
    say():string;			// 函数属性
}
const stu:Person = {
    name:'stu',
    age:21
}
```



### 预留属性

允许以后向对象添加更多的属性，可以预留其他属性的定义：

- 定义键和值的类型
- 命名（下例中的key）是自己决定的

```typescript
interface Person1 {
    [key:string]: any;	// 键要是string类型，值是任意类型
}
```



### 宽松/严格 校验

- 直接传入字面量的对象时，会进行强校验（**不能多不能少**）
- 传入已定义的对象时，会进行弱校验（**可以多不能少**）



### 接口继承

在已有接口的基础上进行扩展，可以继承多个接口

```typescript
interface Person {
  name:string;
  age:number;
}
interface People {
  sex: string;
}
interface Student extends Person {
  school:string;
}
const jim:Student = {
  name:'jim',
  age: 22,
  sex: 'male',
  school: 'wut',
}
```



### 用于定义函数

```typescript
interface fn{
  <T>(arg1:string, arg2:number):T;	// 参数名不必和具体函数一致
}
const isAdult:fn = (name,age) => {
  return name;
}
```

​	



### 用于定义索引类型

```typescript
interface Arr {
  [index:number]: string;
}
const arr:Arr = ['1', '2', '3'];
```





### 用于定义类

在`class`中可以用`interface`来约束类中必须有相应的属性：

```typescript
interface Person {
  name:string;
  age:number;
}
class Stu implements Person {
  name = 'youky';
  age = 22;
  job = 'student'
}
```





## 函数

### 在函数体中定义类型

```typescript
function add(a:number, b:number):number {
    return a + b;
}
const add = (a:number, b:number):number => {
    return a + b;
}
```



### 先确定类型再给函数赋值

```typescript
const add:(a:number, b:number) => number = (a, b) => {
    return a + b;
}
```



### 解构赋值的语法

```typescript
function fun(
  {name, age} : {name:string, age:number}
):boolean{
  return age > 18;
}
```



### 特殊的返回值类型

- `void`：不会有返回值

```typescript
function func():void{
    console.log('nothing return')
}
```

- `never`：函数的代码永远不会执行完

```typescript
function func():never{
    throw new Error('error');
    console.log('不会执行完')
}
```



### 重载

**函数重载的定义：**

- 接收不同类型、数量的参数
- 返回不同类型的值



**实现方法：**先定义重载列表，再进行函数实现

```typescript
function move(step:number): boolean;
function move(direction:string): number;
function move(x:any) {
  if(typeof x == 'number') {
    return x > 10;
  } else {
    return Math.random();
  }
}
```





## 类

**定义方法：**规定变量必须是

- 类的实例对象
- 拥有类所有属性的对象

**注意：**从TS2.7版本开始，类中的所有属性，必须给出初始值或是在构造函数中进行初始化

```typescript
class Person{
  name:string;
  age:number;
  constructor(name:string, age:number){
    this.name = name;
    this.age = age;
  }
}
const jim:Person = new Person('jim', 20);
const john:Person = {
  name:'john',
  age:20
}
```



### 访问控制权限

权限分为三种，和java等类似：

- `public`（默认）：不做限制
- `private`：只能在类内部使用。`constructor`也可以设为私有
- `protected`：只能在类和继承它的子类中使用



对于静态属性，权限控制符放在`static`之前



在构造函数的参数处可以对属性进行约束。因此下面两种写法等价：

```typescript
class Person{
  constructor(private name:string){
    this.name = name;
  }
}
```

```typescript
class Person{
  private name: string;
  constructor(name:string){
    this.name = name;
  }
}
```



### readonly

> 修饰只读属性

```typescript
class Person{
  public readonly name:string;	// 必须在构造函数中或定义时赋值
  constructor(name:string){
    this.name = name;
  }
}
const p = new Person('p');
console.log(p.name); // 可以获取
p.name = 'new name'; // 报错，不能修改
```



### getter

> 获取私有属性

使用getter的意义：

- 保护私有属性
- 在返回属性时做一些修饰

```typescript
class Person{
  private _name:string;
  constructor(name:string){
    this._name = name;
  }
  get name(){
    return 'name is: ' + this._name;
  }
}
const p = new Person('p');
console.log(p.name); //name is: p
```





### setter

> 修改私有属性

```typescript
set name(newName:string) {
  this._name = newName;
}
p.name = 'new name'
console.log(p.name);// name is: new name
```





### 抽象类

- 只能被继承，不能被实例化
- 抽象类的方法**可以是**抽象方法
- 继承抽象类的子类，必须实现抽象类中的所有抽象方法

```typescript
abstract class Person {
  name:string;
  constructor(arg1:string) {
    this.name = arg1;
  }
  abstract say():void;
  getName() {
    return this.name;
  }
}
class Stu extends Person {
  say(): void {
    console.log('student');
  }
}
const x = new Stu('x');
x.say(); // student
console.log(x.getName()); // x
```



## 枚举类型

```typescript
enum Sta{
  offline,		// 0
  online,		// 1
  deleted = 4, 	// 显式赋值为4
  ban,			// 5
}
console.log(Sta[0]) // offline
console.log(Sta.deleted) // deleted
```

- 枚举的值默认从0开始，也可以显式赋值
- 可以通过枚举值反向映射出键



## 泛型

### 含义

- 使用泛型规定某一个类型，参数和返回值可以使用该类型作为已知类型



### 使用

#### 函数中使用

- 在调用函数时，用尖括号传入泛型对应的类型。
- 可以传入多个泛型

```typescript
const fn = <T,P>(arg1:T, arg2:P):T => {
  return arg1;
}
fn<Number,String>(1, '2');
```



#### 类中使用

```typescript
class Data<T> {
  func(arg:T) {
    return arg;
  }
}
```



#### 接口中使用

```typescript
interface Foo<T> {
  value: T;
}
const obj:Foo<string> = {value: 'abc'};
```



### 默认值

定义泛型时可以赋一个默认值，当使用泛型时**没有指定类型**，且**无法根据类型推断确定类型**时，使用该默认值

```typescript
function foo<T=string>(arg:T) {
    // ...
}
```



### 泛型的继承

#### 继承type/interface

**含义：**T对应的具体类型，至少需要拥有所继承的类型中的所有属性

```typescript
type Item  = {
  name: string;
}

function func<T extends Item>(arg: T) {
  return arg.name;
}
```



#### 继承基本类型

**含义：**T对应的具体类型只能是继承的基本类型（或其中的一种）

```typescript
function func<T extends number | string>(arg: T) {
  return arg;
}
```



### 使用类型参数

 声明一个类型参数，且它被另一个类型参数所约束：

```typescript
function fn<T, K extends keyof T>(obj:T, key:K) {
  return obj[key];
}
fn({age:21}, 'age');
```





## 命名空间

意义：避免全局污染，实现模块化。

> 使用ES6的模块化后，不必再使用namespace了

### 定义命名空间

- 命名空间内的方法不能被外部访问
- 使用了export导出的方法可以通过`Home.main`访问
- 命名空间可以嵌套

```typescript
namespace Home {
  function util() {
    console.log('util');
  }
  export function main() {
    console.log('main');
  }
    export namespace Sub{}
}
```



## 声明文件

> xx.d.ts

**意义：**为JS写的库补充类型定义。

如ts中直接引入jQuery，使用时会报错，因为编辑器不知道 `$` 或 `jQuery` 是什么东西，则可以自己定义一个声明文件（并没有真的定义变量，而是定义了变量的类型）



### 定义变量

可以使用`var` / `let` / `const`。声明时只定义类型，不能进行赋值。如果使用const则说明全局变量是常量，不能对其修改

```typescript
declare var foo: string;
```



### 定义函数

可以用定义变量的方法或是function。函数允许重载。

```typescript
declare var foo:(arg:string)=>boolean;
declare function bar(arg:number):void;
declare function bar(arg:string):any;
```



### 定义类

```typescript
declare class Animal {
    name: string;
    constructor(name: string);
    sayHi(): string;
}
```



### 定义命名空间

来声明变量是一个对象，内部有很多属性。内部的声明不需要 `declare` 关键字

```typescript
declare namespace jQuery {
    function ajax(url: string, settings?: any): void;
}
```



