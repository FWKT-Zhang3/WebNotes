# JS 错题整理

1. 原型链；

   ```javascript
   var F = function() {}
   Object.prototype.a = function() {}
   Function.prototype.b = function() {}
   var f = new F();
   ```

   f 能取到 a，但取不到 b

   ![image-20210211163402201](JS错题整理.assets\image-20210211163402201.png)

   f 是 F 的实例，它与 Function 的 prototype 实例之间没有联系

2. 节点属性：

   ```HTML
   <html>
   <body>
    <div id="ele" class="div">
    <span id="s1" class="sp" lang="zh-cn">
    </span>
    </div>
   </body>
   <script type="text/javascript">  
    function exct() {
       var oEle = document.getElementById("ele");
       var child = oEle.children;
       console.log("ele.children的执行结果是:");
       for(i = 0; i < child.length; i++){
          console.log(child[i].tagName);
       }  
       child = oEle.childNodes;
       console.log("ele.childNodes的执行结果是:");
       for(i = 0; i < child.length; i++){
          console.log(child[i].tagName);
       }
    }  
    exct (); 
   </script>
   </html>
   ```

   ==其运行结果是：==

   ```html
   ele.children的执行结果是:
   SPAN
   ele.childNodes的执行结果是:
   undefined
   SPAN
   undefined
   ```

   对于DOM元素，children是指DOM Object类型的子对象，不包括tag之间隐形存在的TextNode，而childNodes包括tag之间隐形存在的TextNode对象

   1. childNodes - 元素.childNodes - 获取元素的所有**子节点**（伪数组）
   2. children - 元素.children - 获取元素的所有**子元素节点**（伪数组）

3. `this`指向：

   3.1

   ```javascript
   var obj ={a:1,b:function () {alert(this.a)}}; 
   var fun =obj.b; 
   fun();
   
   // 弹出 undefined
   ```

   this的行为有时候会显得极其诡异，让人感到困惑，但只需要记住 **this的值要等到代码真正执行时才能确定**
   同时this的值具体有以下几种情况：

   1. new 调用时指的是被构造的对象
   2. call、apply调用，指向我们指定的对象
   3. 对象调用，如执行obj.b()，this指向obj
   4. 默认的，指向全局变量window(相当于执行window.fun())

   这样看来，当你执行fun()的时候，以上1,2点均不满足。
   第3点,因为this是运行时确定的，而我们执行fun()，等同于windown.fun()(**与obj没有任何关系**)，自然的this指向window，而window没有定义变量a，结果是undefined。

   3.2 

   ```javascript
   3
   var obj = {};
   obj.log = console.log;
   obj.log.call(console,this);
   ```

   这道题看似在考this的绑定问题，实际上是通过this绑定为幌子，考察非严格模式下JavaScript语句中“this”默认指向全局对象（window）。

   题目的关键点在第3行，我们知道，this绑定的优先级是new>bind>call(apply)>obj.func()>默认绑定。也就是说obj.log.call(console, this)语句中，实际上log函数内的this实际上指代的是console（这也是本题最大的陷阱！）。然而实际上这一语句中obj.log.call(console, this)这一语句中打印的this是在外部传进去的，和函数内的this对象根本没有关系！也就是说此时log函数内的this指代console，但是打印的是从外面传进去的this对象，也就是window！

   为了证明这一点，读者朋友们可以把obj.log.call(console, this)中的console改成任意一个对象，然后在非严格模式下执行，会发现结果都是window

4. 变量的提前声明：

   ```javascript
   if(! "a" in window){
       var a = 1;
   }
   alert(a);
   
   // undefined
   ```

   if(! "a" in window)这句代码的意思是：判断全局对象window中是否有变量a，如果没有变量a，就进入判断将a赋值为1

   但是由于变量的提前声明，以上代码与如下代码等价：

   ```javascript
   var a；
   if（！“a” in window ）{
     a=1;
   }
   alert(a);
   ```

   由于变量的提前声明特性，在执行这段代码之后，全局对象window中就已经存在a这个变量了

   所以不能进入判断，对a进行赋值

   所以a的值为undefined

5. typeof 的结果

   ```javascript
   typeof Symbol()    	//"symbol"
   typeof Number()    	//"number"
   typeof String()    	//"string"
   typeof Function()	//"function"
   typeof Object()		//"object"
   typeof Boolean()	//"boolean"
   typeof null			//"object"
   typeof undefined	//"undefined"
   ```

6. 