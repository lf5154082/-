var game={
    //��Ϸ������DIV
    pg:document.querySelector(
        ".playground"
    ),
    //ÿ�����Ӵ�С����Ϸ�������ڱ߾�
   CSIZE:26,OFFSET:15,
    shape:null,//��������ͼ��
    interval:100,//�����ٶ�
     timer:null,//���涨ʱ�����
    RN:20,CN:10,//����������,����
    wall:null,//��������ֹͣ����ķ����ǽ
    //������Ϸ
start(){//ES6:����ֱ�����еķ�����ʡ��":function"
        "use strict";
        //���������鱣����wall��
        this.wall=[];
        //r��0~<RN
    for(var r=0;r<this.RN;r++)
      //��wall��ѹ��һ��CN����Ԫ�ص�����
     this.wall.push(
         new Array(this.CN));

        this.shape=new T();//new O()/I()
        this.paint();//�ػ�һ��
        //���������Զ�ʱ����ÿ��interval���Զ�����һ��moveDown������ű�����timer
        this.timer=setInterval(
            this.moveDown.bind(this),
            this.interval
        );
      //Ϊ��ҳ�󶨼��̰����¼�
    document.onkeydown=function(e){
        //this->document->game
        //�жϰ�����
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
    //Ӳ����
    hardDrop(){
        "use strict";
        //ֻҪ����������,�ͷ�������moveDown
        while(this.canDown())
        this.moveDown();
    },
    //�ж��ܷ�����
    canLeft(){
        "use strict";
        //����shape��cells��ÿ����
        for(
            var cell of this.shape.cells){
            //�����ǰ���c����0
            if(cell.c==0)
             return false;//�ͷ���false
            else if(this.wall[cell.r][cell.c-1])  //�������wall�е�ǰ����಻��undefined
            return false; //�ͷ���false
        }
        return true;
        //����true
    },
    //����һ��
    moveLeft(){
        "use strict";
        if(this.canLeft()){
        this.shape.moveLeft();
        this.paint();
        }
    },
    //�ܹ�����
    canRight(){
        "use strict";
        //����shape��cells��ÿ����
     for(
          var cell of this.shape.cells){
         //�����ǰ���c����CN-1
         if(cell.c==this.CN-1)
         return false; //�ͷ���false
         else if(
         this.wall[cell.r][cell.c+1]) //�������wall�е�ǰ���Ҳ಻��undefined
         return false; //�ͷ���false
     }

       return true; //����true
    },
    //����һ��
    moveRight(){
        "use strict";
        if(this.canRight()){
        this.shape.moveRight();
        this.paint();
        }
    },
    //��������ͼ��
 paintShape(){
        "use strict";
        //�����ĵ�Ƭ��frag
        var frag=document
            .createDocumentFragment();
        //����shapeͼ����cells�����ÿ������
        for(
        var cell of this.shape.cells){
            //����һ��cell
            this.paintCell(cell,frag);
        }
        //��frag׷�ӵ�pg��
        this.pg.appendChild(frag);
    },
    //����һ����
 paintCell(cell,frag){
        "use strict";
        //����һ��imgԪ��
        var img=new Image();
        //����img��widthΪCSIZE
        //����img��topΪCSIZE*cell��r+OFFSET
        //����img��leftΪCSIZE*cell��c+OFFSET
        img.style.cssText=`width:${this.CSIZE}px;top:${this.CSIZE*cell.r+this.OFFSET}px;left:${this.CSIZE*cell.c+this.OFFSET}px`;
        //����img��srcΪcell��src
        img.src=cell.src;
        //��img��ӵ�frag��
        frag.appendChild(img);
    },
    //�ػ�һ��
 paint(){
    "use strict";
  //���pg������imgԪ��
    this.pg.innerHTML=
        this.pg.innerHTML
            .replace(/<img .*>/g,"");
    this.paintShape();//�ػ�����
    this.paintWall();//�ػ�ǽ
},
    //����һ��
 moveDown(){//��shape����һ��//�����������
     if(this.canDown()){
        //��shape����һ��
        this.shape.moveDown();
    }else{//����
        //��shape�еĸ�����ǽ��
        this.landIntoWall();
        //�������µ�Shape
        this.shape=new T();
    }
     this.paint();//�ػ�һ��
    },
    //�ж��ܷ��������
 canDown(){
        "use strict";
        //����shape��cells�����е�ÿ��cell
     for(var cell of this.shape.cells){
         //���cell��r����RN-1
         if(cell.r==this.RN-1)
           return false;//����false
     //����,���wall��cellλ���·�������undefind
   else if(
       this.wall[cell.r+1][cell.c])
     return false;//����false
     }
     return true;//����ture
 },
    //��shape��ÿ�����ӱ��浽wall����ͬλ��
 landIntoWall(){
     "use strict";
     //����shape��cells��ÿ������
     for(
        var cell of this.shape.cells){
         //����ǰcell���浽wall����ͬλ��
         this.wall[cell.r][cell.c]=cell;
     }
 },
    //����ǽ
 paintWall(){
     "use strict";
     //����frag
     var frag=
         document.createDocumentFragment();
     //����wall��ÿ����
     for(var r=this.RN-1;r>=0;r--){
         //�����ǰ���ǿ��У����˳�ѭ��
         if(this.wall[r].join("")=="")
         break;
         else{//����
         for(
             var cell of this.wall[r]){
             //�����ǰ����undefined
             if(cell)
             //����һ��cell
             this.paintCell(cell,frag);
         }
       }
     }
     //��frag׷�ӵ�pg ��
     this.pg.appendChild(frag);
 }

};
game.start();