//����Cell��������һ������:r ,c, src
class Cell{
    constructor(r,c,src){
        this.r=r; this.c=c; this.src=src;
    }
}
//��������ͼ�����͸�����Shape,ֻ��һ��
//����:cells�����ĸ��´�����cell���͸��Ӷ���
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
        //������ǰͼ�ε�cells������ÿ��cell
        for(var cell of this.cells)
        cell.r++;//��ÿ��cell��r+1
    }
    moveLeft(){
        "use strict";
        //����ǰͼ�ε�cells������ÿ��cell��c-1
        for(var cell of this.cells)
        cell.c--;
    }
    moveRight(){
        "use strict";
        //����ǰͼ�ε�cells������ÿ��cell��c+1
        for(var cell of this.cells)
            cell.c++;
    }
    rotateR(){}
    rotaleL(){}
}
//�������ͼ������:T,O,I
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
