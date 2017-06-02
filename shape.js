//定义Cell类型描述一个格子:r ,c, src
class Cell{
    constructor(r,c,src){
        this.r=r; this.c=c; this.src=src;
    }
}
//定义所有图形类型父类型Shape,只有一个
//属性:cells保存四个新创建的cell类型格子对象
class Shape{
    constructor(r0,c0,r1,c1,r2,c2,r3,c3,src){
        "use strict";
        this.cells=[
            new Cell(r0,c0,src),
            new Cell(r1,c1,src),
            new Cell(r2,c2,src),
            new Cell(r3,c3,src)
        ]
    }
    moveDown(){
        "use strict";
        //遍历当前图形的cells数组中每个cell
        for(var cell of this.cells)
        cell.r++;//将每个cell的r+1
    }
    moveLeft(){
        "use strict";
        //将当前图形的cells数组中每个cell的c-1
        for(var cell of this.cells)
        cell.c--;
    }
    moveRight(){
        "use strict";
        //将当前图形的cells数组中每个cell的c+1
        for(var cell of this.cells)
            cell.c++;
    }
    rotateR(){}
    rotaleL(){}
}
//定义具体图形类型:T,O,I
class T extends Shape{
    constructor(){
        "use strict";
        super(
            0,3,0,4,0,5,1,4,
            "img/T.png");
    }
}
class O extends Shape{
    constructor(){
        "use strict";
        super(
            0,4,0,5,1,4,1,5,
            "img/o.png");
    }
}
class I extends Shape{
    constructor(){
        "use strict";
        super(
            0,3,0,4,0,5,0,6,
            "img/I.png");
    }
}
 var t=new T();
console.dir(t);
  var o=new O();
console.dir(o);
