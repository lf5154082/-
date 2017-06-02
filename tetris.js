var game={
    //游戏主界面DIV
    pg:document.querySelector(
        ".playground"
    ),
    //每个格子大小和游戏容器的内边距
   CSIZE:26,OFFSET:15,
    shape:null,//保存主角图形
    interval:100,//下落速度
     timer:null,//保存定时器序号
    RN:20,CN:10,//保存总行数,列数
    wall:null,//保存所有停止下落的方块的墙
    //启动游戏
start(){//ES6:对象直接量中的方法可省略":function"
        "use strict";
        //创建空数组保存在wall中
        this.wall=[];
        //r从0~<RN
    for(var r=0;r<this.RN;r++)
      //向wall中压入一个CN个空元素的数组
     this.wall.push(
         new Array(this.CN));

        this.shape=new T();//new O()/I()
        this.paint();//重绘一切
        //启动周期性定时器，每隔interval，自动调用一次moveDown，将序号保存在timer
        this.timer=setInterval(
            this.moveDown.bind(this),
            this.interval
        );
      //为网页绑定键盘按下事件
    document.onkeydown=function(e){
        //this->document->game
        //判断按键号
        switch(e.keyCode){
            case 37:
             this.moveLeft();
            break;
            case 39:
                this.moveRight();
                break;
            case 40:
                this.moveDown();
                break;
            case 32:
                this.hardDrop();
                break;
        }
    }.bind(this);
    },
    //硬着落
    hardDrop(){
        "use strict";
        //只要还可以下落,就反复调用moveDown
        while(this.canDown())
        this.moveDown();
    },
    //判断能否左移
    canLeft(){
        "use strict";
        //遍历shape中cells中每个格
        for(
            var cell of this.shape.cells){
            //如果当前格的c等于0
            if(cell.c==0)
             return false;//就返回false
            else if(this.wall[cell.r][cell.c-1])  //否则，如果wall中当前格左侧不是undefined
            return false; //就返回false
        }
        return true;
        //返回true
    },
    //左移一格
    moveLeft(){
        "use strict";
        if(this.canLeft()){
        this.shape.moveLeft();
        this.paint();
        }
    },
    //能够右移
    canRight(){
        "use strict";
        //遍历shape中cells中每个格
     for(
          var cell of this.shape.cells){
         //如果当前格的c等于CN-1
         if(cell.c==this.CN-1)
         return false; //就返回false
         else if(
         this.wall[cell.r][cell.c+1]) //否则，如果wall中当前格右侧不是undefined
         return false; //就返回false
     }

       return true; //返回true
    },
    //右移一格
    moveRight(){
        "use strict";
        if(this.canRight()){
        this.shape.moveRight();
        this.paint();
        }
    },
    //绘制主角图形
 paintShape(){
        "use strict";
        //创建文档片段frag
        var frag=document
            .createDocumentFragment();
        //遍历shape图形中cells数组的每个格子
        for(
        var cell of this.shape.cells){
            //绘制一个cell
            this.paintCell(cell,frag);
        }
        //将frag追加到pg中
        this.pg.appendChild(frag);
    },
    //绘制一个格
 paintCell(cell,frag){
        "use strict";
        //创建一个img元素
        var img=new Image();
        //设置img的width为CSIZE
        //设置img的top为CSIZE*cell的r+OFFSET
        //设置img的left为CSIZE*cell的c+OFFSET
        img.style.cssText=`width:${this.CSIZE}px;top:${this.CSIZE*cell.r+this.OFFSET}px;left:${this.CSIZE*cell.c+this.OFFSET}px`;
        //设置img的src为cell的src
        img.src=cell.src;
        //将img添加到frag中
        frag.appendChild(img);
    },
    //重绘一切
 paint(){
    "use strict";
  //清除pg下所有img元素
    this.pg.innerHTML=
        this.pg.innerHTML
            .replace(/<img .*>/g,"");
    this.paintShape();//重绘主角
    this.paintWall();//重绘墙
},
    //下落一格
 moveDown(){//让shape下落一步//如果可以下落
     if(this.canDown()){
        //让shape下落一步
        this.shape.moveDown();
    }else{//否则
        //将shape中的格落入墙中
        this.landIntoWall();
        //在生成新的Shape
        this.shape=new T();
    }
     this.paint();//重绘一切
    },
    //判断能否继续下落
 canDown(){
        "use strict";
        //遍历shape中cells数组中的每个cell
     for(var cell of this.shape.cells){
         //如果cell的r等于RN-1
         if(cell.r==this.RN-1)
           return false;//返回false
     //否则,如果wall中cell位置下方不等于undefind
   else if(
       this.wall[cell.r+1][cell.c])
     return false;//返回false
     }
     return true;//返回ture
 },
    //将shape中每个格子保存到wall中相同位置
 landIntoWall(){
     "use strict";
     //遍历shape的cells中每个格子
     for(
        var cell of this.shape.cells){
         //将当前cell保存到wall中相同位置
         this.wall[cell.r][cell.c]=cell;
     }
 },
    //绘制墙
 paintWall(){
     "use strict";
     //创建frag
     var frag=
         document.createDocumentFragment();
     //遍历wall中每个格
     for(var r=this.RN-1;r>=0;r--){
         //如果当前行是空行，就退出循环
         if(this.wall[r].join("")=="")
         break;
         else{//否则
         for(
             var cell of this.wall[r]){
             //如果当前格不是undefined
             if(cell)
             //绘制一个cell
             this.paintCell(cell,frag);
         }
       }
     }
     //将frag追加到pg 中
     this.pg.appendChild(frag);
 }

};
game.start();