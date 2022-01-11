# 概念

## 定义

- `TypeScript`是支持类型的`JavaScript`的超集
- 支持静态类型
- 不能直接在浏览器运行，必须先编译为JS代码



## TS的优势

- 开发过程中的**错误提示**
- 编辑器中友好的**代码提示**
- 代码的**语义更清晰**



## tsconfig.json配置文件

**生成：**

```
tsc --init
```



**使用：**

- 使用`tsc`命令编译所有文件，或使用`ts-node`运行ts文件时，会使用文件中的配置

- 使用`tsc xx.ts`编译单个文件时不会使用配置

# 类型

## 类型注解

人**主动**告诉TS某个变量的类型；



## 类型推断

TS根据已知信息，**自动**推断某个变量的类型。变量只有在**声明时就赋值**，才会进行类型推断



**写代码的原则**：能够进行类型推断的变量， 不需要注解。



## 联合类型

当一个变量的类型，可能需要转变时，可用或将其定义为多种类型的一种。

```typescript
let x: number | string = 12;
x = 'hello';
const arr: (number | string)[] = [];
arr.push(1);
arr.push('1');
```



## 类型保护

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



### 断言方式

若果通过某些方式能确定变量类型，则可以通过**类型断言**的方式解决：

```typescript
if(arg.isA) {
    (arg as A).a();	// 类型断言
}
```



### 类型检测方式

对需要使用的属性进行检测，也可以解决类型保护的问题。可以使用的检测方式包括：

- in
- typeof
- instanceof

```typescript
if('a' in arg){
    arg.a();
}
```

```typescript
function add(arg1: string | number, arg2: string | number) {
    if(typeof arg1 == 'string' || typeof arg2 == 'string'){
        return `${arg1}${arg2}`;
    }
    return arg1 + arg2;
}
```

```typescript
class NumObj{
    count:number;
}
function add(arg1: object|NumObj | arg2 : object|NumObj) {
    if(arg1 instanceof NumbObj || arg2 instanceof NumbObj) {
        return arg1.count + arg2.count;
    }
    return 0;
}
```





# 基础类型

- number
- string
- boolean
- null
- undefined
- symbol
- void




# 对象

**定义方法：**列出对象每个属性的类型

```typescript
const obj: {name:string, age:number} = {
    name:'xxx',
    age:21
}
```



# 数组

**定义方法：**给出整个数组所有元素的类型

```typescript
const nums:number[] = [1,2,3];
const arr:(number|string)[1,'2']
```

或是：

```typescript
const nums:Array<number> = [1,2];
```



# 元组

**定义方法：**数量有限且每一项的类型都固定的数组，分别给出**每一个元素**的类型

```typescript
const tuple:[string, string, number] = ['mike', 'male', 18]
```



# 函数

## 在函数体中定义类型

```typescript
function add(a:number, b:number):number {
    return a + b;
}
const add = (a:number, b:number):number => {
    return a + b;
}
```



## 先确定类型再给函数赋值

```typescript
const add:(a:number, b:number) => number = (a, b) => {
    return a + b;
}
```



## 解构赋值的语法

```typescript
function fun(
  {name, age} : {name:string, age:number}
):boolean{
  return age > 18;
}
```



## 标记返回值的特殊类型

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



# type（类型别名）

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



# interface（接口）

> 用于在开发过程中提供语法提示和校验，在编译后的代码中不会存在

类似于C++中的结构体，自定义一个**对象**，指明里面每个属性的类型。

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



## 预留属性

允许以后向对象添加更多的属性，可以预留其他属性的定义：

- 定义键和值的类型
- 命名（下例中的key）是自己决定的

```typescript
interface Person1 {
    [key:string]: any;	// 键要是string类型，值是任意类型
}
```



## 校验特性

- 直接传入字面量的对象时，会进行强校验（**不能多不能少**）
- 传入已定义的对象时，会进行弱校验（**可以多不能少**）



## 接口继承

在已有接口的基础上进行扩展：

```typescript
interface Person {
  name:string;
  age:number;
}
interface Student extends Person {
  school:string;
}
const jim:Student = {
  name:'jim',
  age: 22,
  school: 'wut',
}
```



## 用于定义函数

```typescript
interface fn{
  (arg1:string, arg2:number):boolean;
}
const isAdult:fn = (name,age) => {
  return age >= 18;
}
```



## 用于定义类

在`class`中可以应用`interface`来约束类中必须有相应的属性：

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



# 类

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



## 访问控制权限

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



## getter

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





## setter

> 修改私有属性

```typescript
set name(newName:string) {
  this._name = newName;
}
p.name = 'new name'
console.log(p.name);// name is: new name
```



## readonly

> 修饰只读属性

```typescript
class Person{
  public readonly name:string;
  constructor(name:string){
    this.name = name;
  }
}
const p = new Person('p');
console.log(p.name); // 可以获取
p.name = 'new name'; // 报错，不能修改
```



## 抽象类

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



# 枚举类型

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



