function createSeal(config){
  var id = config.id;
  if(id == 'general_42_dang'){
    createSealDang(config);
  }else if(id == 'general_42_gh'){
    createSealGongHui(config);
  }else if(id == 'general_20_faren'){
    createSealFaren(config);
  }else if(id == 'general_40_tuan'){
    createSealTuan(config);
  }else if(id == 'general_fapiao'){
    fapiao(config);
  }else if(id == 'general_baoguan'){
    baoguan(config);
  }else {
    createSealCommon(config);
  }
}

function RandomNumBoth(Min,Max){
    var Range = Max - Min;
    var Rand = Math.random();
    var num = Min + Math.round(Rand * Range); //四舍五入
    return num;
}

/*创建公共印章*/
function createSealCommon(config){

    var canvas = document.getElementById(config.canvasId);
    canvas.style.display='block';
    canvas.style.border='1px solid red';
    canvas.height=canvas.height;//清除画布
    canvas.setAttribute('width',config.width*config.multiple);
    canvas.setAttribute('height',config.height*config.multiple);
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';

    var context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-over';

    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;

    var scale = parseInt(config.multiple*5/3);
    context.scale(scale,scale);

    // 绘制印章边框
    var width = parseInt(canvas.width/(scale*2));
    var height = parseInt(canvas.height/(scale*2));

    context.translate(0.5,0.5);// 平移到此位置,

    //防伪线
    if(config.satetyLine != false){
      for(var i = 0; i < config.lineNum; i++) {
          context.save();
          //设置分刻度的粗细
          context.lineWidth = 0.5;
          //设置分刻度的颜色
          context.strokeStyle = "#FFF";
          //设置或者重置画布的0,0点
          context.translate(width,height);
          var rotate = RandomNumBoth(0,180/config.lineNum);
          //设置旋转的角度
          context.rotate((i*360/config.lineNum+rotate)*Math.PI/180);
          //开始绘制
          context.beginPath();
          var x1 = RandomNumBoth(0,5);
          context.moveTo(0,(-config.lineSize-2)+(Math.random()));
          var x2 = RandomNumBoth(-10,10);
          context.lineTo(x2,(-config.lineSize+1)+(Math.random()*3));
          context.stroke();
          context.closePath();
          context.restore();
      }
    }

    context.lineWidth = config.lineWidth||2.5;
    context.beginPath();
    context.strokeStyle = config.sealColor||'#000';
    context.arc(width,height,config.lineSize||98,0,Math.PI*2);
    context.stroke();
    context.closePath();

    //画五角星
    create5star(context,width,height,config.star5||25,config.sealColor||"#000",0);

    // 绘制印章名称
    context.font = 'bold '+(config.sealnameSize||22)+'px serif';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.fillStyle = config.sealColor||'#000';

    var sealnameAdjust = parseInt(config.sealnameAdjust||40);
    context.fillText(config.name,width,height+sealnameAdjust,config.sealnameFontAdjust||80);
    context.restore();

    // 绘制印章单位
    context.translate(width,height);// 平移到此位置,
    context.font = 'bold '+(config.sealunitSize||22)+'px serif ';
    var count = config.company.length;// 字数
    var angle = config.sealangleSize||4*Math.PI/(3*(count - 1));// 字间角度
    var chars = config.company.split("");
    var c;
    for (var i = 0; i < count; i++){
        c = chars[i];// 需要绘制的字符
        if(i==0)
            context.rotate(config.sealrotateSize||(5*Math.PI/6));
        else
          context.rotate(angle);
        context.save();
        context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
        context.rotate(Math.PI/2);// 旋转90度,让字平行于x轴
        context.fillText(c,0, config.sealunitSpan||27,config.sealunitHeight||15);// 此点为字的中心点
        context.restore();
    }

    // 绘制编号
    context.font = 'normal normal 900 '+(config.sealnoSize||12) +'px Microsoft YaHei';
    context.fillStyle = config.sealColor||'#000';
    var count2 = config.sealNum.length;// 字数
    var angle2 = config.sealnoAngle||Math.PI/(2.2*(count2 - 1));// 字间角度
    var chars2 = config.sealNum.split("");

    var c2;
    for (var i = count2-1; i >= 0; i--){
        c2 = chars2[i];// 需要绘制的字符
        if(i==count2-1)
            context.rotate(config.sealnorotateSize||Math.PI/9);
        else
          context.rotate(angle2);
        context.save();
         context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
        context.rotate(270*Math.PI/180);// 旋转90度,让字平行于x轴
        context.fillText(c2,0, config.sealnoSpan||-22);// 此点为字的中心点
        context.restore();
    }


    //绘制五角星
    /**
     * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上
     * rotate:绕对称轴旋转rotate弧度
     */
    function create5star(context,sx,sy,radius,color,rotato){
        context.save();
        context.translate(0.5,0.5);// 平移到此位置,
        context.fillStyle=color;
        context.translate(sx,sy);//移动坐标原点
        context.rotate(Math.PI+rotato);//旋转

        context.beginPath();//创建路径
        var x = Math.sin(0);
        var y= Math.cos(0);
        var dig = Math.PI/5 *4;
        for(var i = 0;i< 5;i++){//画五角星的五条边
         var x = Math.sin(i*dig);
         var y = Math.cos(i*dig);
         context.lineTo(x*radius,y*radius);
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();
    }
}

/**
  工会委员会
*/
function createSealGongHui(config){

  var canvas = document.getElementById(config.canvasId);
  canvas.style.display='block';
  canvas.style.border='1px solid red';
  canvas.height=canvas.height;//清除画布
  canvas.setAttribute('width',config.width*config.multiple);
  canvas.setAttribute('height',config.height*config.multiple);
  canvas.style.width = config.width + 'px';
  canvas.style.height = config.height + 'px';

  var context = canvas.getContext('2d');
  context.globalCompositeOperation = 'destination-over';

    context.translate(0.5,0.5);// 平移到此位置,

    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;


    var scale = parseInt(config.multiple*5/3);
    context.scale(scale,scale);

    // 绘制印章边框
    var width=canvas.width/(scale*2);
    var height=canvas.height/(scale*2);

    for(var i = 0; i < config.lineNum; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点
        context.translate(width,height);
        var rotate = RandomNumBoth(0,180/config.lineNum);
        //设置旋转的角度
        context.rotate((i*360/config.lineNum+rotate)*Math.PI/180);
        //开始绘制
        context.beginPath();
        var x1 = RandomNumBoth(0,5);
        context.moveTo(0,(-config.lineSize-2)+(Math.random()));
        var x2 = RandomNumBoth(-10,10);
        context.lineTo(x2,(-config.lineSize+1)+(Math.random()*3));
        context.stroke();
        context.closePath();
        context.restore();
    }

    context.lineWidth=config.lineWidth||2.5;
    context.strokeStyle=config.sealColor||'#000';
    context.beginPath();
    context.arc(width,height,config.lineSize||98,0,Math.PI*2);
    context.stroke();

    // 绘制印章内边框
    context.lineWidth=config.lineWidth2||2.5;
    context.strokeStyle=config.sealColor||'#000';
    context.beginPath();
    context.arc(width,height,config.lineSize2||94,0,Math.PI*2);
    context.stroke();

    //画五角星
    create5star(context,width,height,config.star5||20,config.sealColor||'#000',0);

    // 绘制印章名称
    context.font = 'bold '+(config.sealnameSize||22)+'px serif';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.fillStyle = config.sealColor||'#000';
    var sealnameAdjust = parseInt(config.sealnameAdjust||40);
    context.fillText(config.name,width,height+sealnameAdjust,config.sealnameFontAdjust||80);
    context.restore();

    // 绘制印章单位
    context.translate(width,height);// 平移到此位置,
    context.font = 'bold '+(config.sealunitSize||22)+'px serif ';
    var count = config.company.length;// 字数
    var angle = config.sealangleSize||4*Math.PI/(3*(count - 1));// 字间角度
    var chars = config.company.split("");
    var c;
    for (var i = 0; i < count; i++){
        c = chars[i];// 需要绘制的字符
        if(i==0)
            context.rotate(config.sealrotateSize||(5*Math.PI/6));
        else
          context.rotate(angle);
        context.save();
        context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
        context.rotate(Math.PI/2);// 旋转90度,让字平行于x轴
        context.fillText(c,0, config.sealunitSpan||14,config.sealunitHeight||15);// 此点为字的中心点
        context.restore();
    }

    // 绘制编号
    context.font = 'normal normal 900 '+(config.sealnoSize||12) +'px  Microsoft YaHei';
    context.fillStyle = config.sealColor||'#000';
    var count2 = config.sealNum.length;// 字数
    var angle2 = config.sealnoAngle||Math.PI/(2.3*(count2 - 1));// 字间角度
    var chars2 = config.sealNum.split("");

    var c2;
    for (var i = count2-1; i >= 0; i--){
        c2 = chars2[i];// 需要绘制的字符
        if(i==count2-1)
            context.rotate(config.sealnorotateSize||Math.PI/9);
        else
          context.rotate(angle2);
        context.save();
         context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
        context.rotate(270*Math.PI/180);// 旋转90度,让字平行于x轴
        context.fillText(c2,0, config.sealnoSpan||-4);// 此点为字的中心点
        context.restore();
    }


    //绘制五角星
    /**
     * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上
     * rotate:绕对称轴旋转rotate弧度
     */
    function create5star(context,sx,sy,radius,color,rotato){
        context.save();
        context.translate(0.5,0.5);// 平移到此位置,
        context.fillStyle=color;
        context.translate(sx,sy);//移动坐标原点
        context.rotate(Math.PI+rotato);//旋转
        context.beginPath();//创建路径
        var x = Math.sin(0);
        var y= Math.cos(0);
        var dig = Math.PI/5 *4;
        for(var i = 0;i< 5;i++){//画五角星的五条边
         var x = Math.sin(i*dig);
         var y = Math.cos(i*dig);
         context.lineTo(x*radius,y*radius);
        }
        context.closePath();
        context.stroke();
        context.fill();
        context.restore();
    }
}

/**
  支部委员会
*/
function createSealDang(config){
    var canvas = document.getElementById(config.canvasId);
    canvas.style.display='block';
    canvas.style.border='1px solid red';
    canvas.height=canvas.height;//清除画布
    canvas.setAttribute('width',config.width*config.multiple);
    canvas.setAttribute('height',config.height*config.multiple);
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';

    var context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-over';

    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;

    var scale = parseInt(config.multiple*5/3);
    context.scale(scale,scale);

    // 绘制印章边框
    var width=canvas.width/(scale*2);
    var height=canvas.height/(scale*2);
    context.translate(0.5,0.5);// 平移到此位置,

    for(var i = 0; i < config.lineNum; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点
        context.translate(width,height);
        var rotate = RandomNumBoth(0,180/config.lineNum);
        //设置旋转的角度
        context.rotate((i*360/config.lineNum+rotate)*Math.PI/180);
        //开始绘制
        context.beginPath();
        var x1 = RandomNumBoth(0,5);
        context.moveTo(0,(-config.lineSize-2)+(Math.random()));
        var x2 = RandomNumBoth(-10,10);
        context.lineTo(x2,(-config.lineSize+1)+(Math.random()*3));
        context.stroke();
        context.closePath();
        context.restore();
    }


    context.lineWidth = config.lineWidth||2.5;
    context.beginPath();
    context.arc(width,height,config.lineSize||98,0,Math.PI*2);
    context.stroke();
    context.closePath();

    context.save();

    var img = new Image();
    // img.setAttribute("crossOrigin",'*');
    img.src = './images/dang.png';
    img.onload = function () {
        context.rotate(225*Math.PI/180);//旋转
        context.drawImage(img,-(img.width/3),-((img.height/3)+5),50,50);
    };
    context.restore();

    context.translate(0.5,0.5);// 平移到此位置,


    // 绘制印章名称
    context.font = 'bold '+(config.sealnameSize||22)+'px serif';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.lineWidth=1;
    context.fillStyle = config.sealColor||'#000';
    var sealnameAdjust = parseInt(config.sealnameAdjust||40);
    context.fillText(config.name,width,height+sealnameAdjust,config.sealnameFontAdjust||80);
    context.restore();


    // 绘制印章单位
    context.translate(width,height);// 平移到此位置,
    context.font = 'bold '+(config.sealunitSize||22)+'px serif ';
    var count = config.company.length;// 字数
    var angle = config.sealangleSize||4*Math.PI/(3*(count - 1));// 字间角度
    var chars = config.company.split("");
    var c;
    for (var i = 0; i < count; i++){
        c = chars[i];// 需要绘制的字符
        if(i==0)
            context.rotate(config.sealrotateSize||(5*Math.PI/6));
        else
          context.rotate(angle);
        context.save();
        context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
        context.rotate(Math.PI/2);// 旋转90度,让字平行于x轴
        context.fillText(c,0, config.sealunitSpan||0,config.sealunitHeight||15);// 此点为字的中心点
        context.restore();
    }

    // 绘制编号

    context.font = 'normal normal 900 '+(config.sealnoSize||12) +'px  Microsoft YaHei';
    context.fillStyle = config.sealColor||'#000';

    var count2 = config.sealNum.length;// 字数
    var angle2 = config.sealnoAngle||(Math.PI/(2.3*(count2 - 1)));// 字间角度
    var chars2 = config.sealNum.split("");
    var c2;
    for (var i = count2-1; i >= 0; i--){
        c2 = chars2[i];// 需要绘制的字符
        if(i==count2-1)
            context.rotate(config.sealnorotateSize||Math.PI/9);
        else
          context.rotate(angle2);
        context.save();
        context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
        context.rotate(270*Math.PI/180);// 旋转90度,让字平行于x轴
        context.fillText(c2,0, config.sealnoSpan||8);// 此点为字的中心点
        context.restore();
    }

}


  /**
    *法人章
  */
  function createSealFaren(config){
    var canvas = document.getElementById(config.canvasId);
    canvas.style.display='block';
    canvas.style.border='1px solid #FFF';
    canvas.height=canvas.height;//清除画布
    canvas.setAttribute('width',config.width*config.multiple);
    canvas.setAttribute('height',config.height*config.multiple);
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';

    var context = canvas.getContext('2d');
    context.globalCompositeOperation = 'destination-over';

    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;

    var scale = parseInt(config.multiple*5/3);
    context.scale(scale,scale);

    // 绘制印章边框
    var width=canvas.width/(scale*2);
    var height=canvas.height/(scale*2);

    context.translate(0.5,0.5);// 平移到此位置,

    var l = 76;
    var x = width -l/2,y= height -l/2;
    //左
    for(var i = 1; i < 6; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点
        context.translate(x,y);
        //设置旋转的角度
        context.rotate((0)*Math.PI/180);
        //开始绘制
        context.beginPath();
        var rotate = RandomNumBoth(y+i*10,y+i*13);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y+i*10,y+i*13);
        context.lineTo(2,rotate);
        context.stroke();
        context.closePath();
        context.restore();
    }

    //上
    for(var i = 1; i < 6; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点
        context.translate(x,y);
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*15);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*15);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //右
    for(var i = 1; i < 6; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点
        context.translate(x+l,-y);
        //设置旋转的角度
        context.rotate((180)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*13,y-i*15);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*13,y-i*15);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //下
    for(var i = 1; i < 6; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点
        context.translate(x,y+l);
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*14);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*14);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }
context.translate(0.5,0.5);// 平移到此位置,
    //使用strokeRect方法
    context.lineWidth=7;
    context.strokeStyle = config.sealColor||'#000';
    context.strokeRect(x,y,l,l);
    context.closePath();
    context.save();


    var chars = config.company.split("");
    context.font = 'normal normal  34px lishu';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    // context.lineWidth=1;
    context.fillStyle = config.sealColor||'#000';
    var bian = 10;
    height = height - 5;

    context.fillText(chars[0],width+l/3-bian,height-l/3+bian,30);
    context.fillText(chars[1],width+l/3-bian,height+l/3-bian,30);
    if(chars[2] == undefined){
      chars[2] = '之';
      context.fillText(chars[2],width-l/3+bian,height-l/3+bian,30);
    }else{
      context.fillText(chars[2],width-l/3+bian,height-l/3+bian,30,30,30);
    }

    if(chars[3] == undefined){
      chars[3] = '印';
      context.fillText(chars[3],width-l/3+bian,height+l/3-bian,30,30);
    }else{
      context.fillText(chars[3],width-l/3+bian,height+l/3-bian,30);
    }

    context.save();




    context.font = 'normal normal 900 '+(config.sealnoSize||12) +'px Microsoft YaHei';
    context.fillText(config.sealNum,width,height+l/2-4,67);
    context.restore();


  }

  /**
  * 共产主义青年团
  */
  function createSealTuan(config){
    var canvas = document.getElementById(config.canvasId);
    canvas.style.display='block';
    canvas.style.border='1px solid red';
    canvas.height=canvas.height;//清除画布
    canvas.setAttribute('width',config.width*config.multiple);
    canvas.setAttribute('height',config.height*config.multiple);
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';

    var context = canvas.getContext('2d');
    context.translate(0.5,0.5);// 平移到此位置,
    context.globalCompositeOperation = 'destination-over';

    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;


    var scale = parseInt(config.multiple*5/3);
    context.scale(scale,scale);

    // 绘制印章边框
    var width=canvas.width/(scale*2);
    var height=canvas.height/(scale*2);

    for(var i = 0; i < config.lineNum; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点
        context.translate(width,height);
        var rotate = RandomNumBoth(0,180/config.lineNum);
        //设置旋转的角度
        context.rotate((i*360/config.lineNum+rotate)*Math.PI/180);
        //开始绘制
        context.beginPath();
        var x1 = RandomNumBoth(0,5);
        context.moveTo(0,(-config.lineSize-2)+(Math.random()));
        var x2 = RandomNumBoth(-10,10);
        context.lineTo(x2,(-config.lineSize+1)+(Math.random()*3));
        context.stroke();
        context.closePath();
        context.restore();
    }


      context.lineWidth=config.lineWidth;
      context.strokeStyle=config.sealColor||'#000';
      context.beginPath();
      context.arc(width,height,config.lineSize||98,0,Math.PI*2);
      context.stroke();

      // context.translate(width,height);// 平移到此位置,
      context.lineWidth=5;
      context.moveTo(width-30,height);
      context.lineTo(width-98,height);
      context.stroke();

      context.moveTo(width+98,height);
      context.lineTo(width+30,height);
      context.stroke();

      //画五角星
      create5star(context,width,height,config.star5||20,"#000",0);

      // 绘制印章名称
      context.font = 'bold '+(config.sealnameSize||17)+'px serif';
      context.textBaseline = 'middle';//设置文本的垂直对齐方式
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.lineWidth=1;
      context.fillStyle = config.sealColor||'#000';
      var sealnameAdjust = parseInt(config.sealnameAdjust||40);
      context.fillText(config.name,width,height+sealnameAdjust,config.sealnameFontAdjust||80);
      context.restore();


      // 绘制印章名称
      context.font = 'bold 22px serif';
      context.textBaseline = 'middle';//设置文本的垂直对齐方式
      context.textAlign = 'center'; //设置文本的水平对对齐方式
      context.lineWidth=1;
      context.fillStyle = config.sealColor||'#000';
      context.fillText('委员会',width,height+63,56);
      context.restore();

      // 绘制印章单位
      context.translate(width,height);// 平移到此位置,
      context.font = 'bold '+(config.sealunitSize||22)+'px serif ';
      var count = config.company.length;// 字数
      var angle = config.sealangleSize||Math.PI/(1.20*(count - 1));// 字间角度
      var chars = config.company.split("");
      var c;
      for (var i = 0; i < count; i++){
          c = chars[i];// 需要绘制的字符
          if(i==0)
              context.rotate(config.sealrotateSize||195*Math.PI/180);
          else
            context.rotate(angle);
          context.save();
          context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
          context.rotate(Math.PI/2);// 旋转90度,让字平行于x轴
          // context.fillText(c,0, 9,config.sealunitHeight||15);// 此点为字的中心点
          context.fillText(c,0, config.sealunitSpan||9,config.sealunitHeight||15);// 此点为字的中心点
          context.restore();
      }


      context.font = 'normal normal 900 '+(config.sealnoSize||12) +'px Microsoft YaHei';
      context.fillStyle = config.sealColor||'#000';

      var count2 = config.sealNum.length;// 字数
      var angle2 = config.sealnoAngle||Math.PI/(2.2*(count2 - 1));// 字间角度
      var chars2 = config.sealNum.split("");
      var c2;
      for (var i = count2-1; i >= 0; i--){
          c2 = chars2[i];// 需要绘制的字符
          if(i==count2-1)
              context.rotate(config.sealnorotateSize||Math.PI/2.8);
          else
            context.rotate(angle2);
          context.save();
           context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
          context.rotate(270*Math.PI/180);// 旋转90度,让字平行于x轴
          context.fillText(c2,0,  config.sealnoSpan||-3);// 此点为字的中心点

          context.restore();
      }


      //绘制五角星
      /**
       * 创建一个五角星形状. 该五角星的中心坐标为(sx,sy),中心到顶点的距离为radius,rotate=0时一个顶点在对称轴上
       * rotate:绕对称轴旋转rotate弧度
       */
      function create5star(context,sx,sy,radius,color,rotato){
          context.save();
          context.translate(0.5,0.5);// 平移到此位置,
          context.fillStyle=color;
          context.translate(sx,sy);//移动坐标原点
          context.rotate(Math.PI+rotato);//旋转
          context.beginPath();//创建路径
          var x = Math.sin(0);
          var y= Math.cos(0);
          var dig = Math.PI/5 *4;
          for(var i = 0;i< 5;i++){//画五角星的五条边
           var x = Math.sin(i*dig);
           var y = Math.cos(i*dig);
           context.lineTo(x*radius,y*radius);
          }
          context.closePath();
          context.stroke();
          context.fill();
          context.restore();
      }
  }



  function unitConversion() {
      /**
       * 获取DPI
       * @returns {Array}
       */
      this.conversion_getDPI =function () {
          var arrDPI = new Array;
          if (window.screen.deviceXDPI) {
              arrDPI[0] = window.screen.deviceXDPI;
              arrDPI[1] = window.screen.deviceYDPI;
          } else {
              var tmpNode = document.createElement("DIV");
              tmpNode.style.cssText = "width:1in;height:1in;position:absolute;left:0px;top:0px;z-index:99;visibility:hidden";
              document.body.appendChild(tmpNode);
              arrDPI[0] = parseInt(tmpNode.offsetWidth);
              arrDPI[1] = parseInt(tmpNode.offsetHeight);
              tmpNode.parentNode.removeChild(tmpNode);
          }
          return arrDPI;
      };
      /**
       * px转换为mm
       * @param value
       * @returns {number}
       */
      this.pxConversionMm = function (value) {
          var inch = value/this.conversion_getDPI()[0];
          var c_value = inch * 25.4;
          console.log(c_value);
          return c_value;
      };
      /**
       * mm转换为px
       * @param value
       * @returns {number}
       */
      this.mmConversionPx = function (value) {
          var inch = value/25.4;
          var c_value = inch*this.conversion_getDPI()[0];
          console.log(c_value);
          return c_value;
      }
  }

  function drawEllipse(config,ctx,lineWidth, x, y, a, b) {
     var k = 0.5522848,
     ox = a * k, // 水平控制点偏移量
     oy = b * k; // 垂直控制点偏移量
     ctx.lineWidth=lineWidth;
     ctx.beginPath();
     ctx.strokeStyle = config.sealColor||"#000";
     //从椭圆的左端点开始顺时针绘制四条三次贝塞尔曲线
     ctx.moveTo(x - a, y);
     ctx.bezierCurveTo(x - a, y - oy, x - ox, y - b, x, y - b);
     ctx.bezierCurveTo(x + ox, y - b, x + a, y - oy, x + a, y);
     ctx.bezierCurveTo(x + a, y + oy, x + ox, y + b, x, y + b);
     ctx.bezierCurveTo(x - ox, y + b, x - a, y + oy, x - a, y);
     ctx.closePath();
     ctx.stroke();
  }

  function drawLine(context,config,width,height){
    //---------------------------------------------------------
    var l = 190;
    var x = width -l/2,y= height -l/2;
    var count = 3;
    //左
    var tempLeftX = 6;
    var tempLeftY = height-30;
    for(var i = 1; i < count; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        //设置或者重置画布的0,0点

        tempLeftX =RandomNumBoth(tempLeftX,tempLeftX+(Math.random()*2));
        tempLeftY =RandomNumBoth(tempLeftY,tempLeftY+(Math.random()*4));
        context.translate(tempLeftX,tempLeftY);
        tempLeftY = tempLeftY + 15;
        //设置旋转的角度
        context.rotate((0)*Math.PI/180);
        //开始绘制
        context.beginPath();
        var rotate = RandomNumBoth(y+i*10,y+i*13);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y+i*10,y+i*13);
        context.lineTo(2,rotate);
        context.stroke();
        context.closePath();
        context.restore();
    }

    //右
    var tempRightX = width*2-8;
    var tempRightY = height-30;
    for(var i = 1; i < count; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        tempRightX =RandomNumBoth(tempRightX,tempRightX+(Math.random()*2));
        tempRightY =RandomNumBoth(tempRightY,tempRightY+(Math.random()*4));
        //设置或者重置画布的0,0点
        context.translate(tempRightX,tempRightY);
        tempRightY = tempRightY + 23;
        tempRightX = tempRightX + 1;
        //设置旋转的角度
        context.rotate((180)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*13,y-i*15);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*13,y-i*15);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //上
    var tempTopX = width/2+12;
    var tempTopY = height/2-18;
    for(var i = 1; i < count; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        tempTopX =RandomNumBoth(tempTopX,tempTopX+(Math.random()*6));
        tempTopY =RandomNumBoth(tempTopY,tempTopY+(Math.random()*2));
        //设置或者重置画布的0,0点
        context.translate(tempTopX,tempTopY);
        tempTopX = tempTopX + 40;
        tempTopY = tempTopY - 2;
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*15);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*15);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //下
    var tempBottomX = width/2+12;
    var tempBottomY = height/2*3+20;
    for(var i = 1; i < count; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        tempBottomX =RandomNumBoth(tempBottomX,tempBottomX+(Math.random()*6));
        tempBottomY =RandomNumBoth(tempBottomY,tempBottomY+(Math.random()*2));
        //设置或者重置画布的0,0点
        context.translate(tempBottomX,tempBottomY);
        tempBottomX = tempBottomX + 40;
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*14);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*14);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //左上
    var tempLeftUpX = 10;
    var tempLeftUpY = height/2+12;
    for(var i = 1; i < 3; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        tempLeftUpX =RandomNumBoth(tempLeftUpX,tempLeftUpX+(Math.random()*2));
        tempLeftUpY =RandomNumBoth(tempLeftUpY,tempLeftUpY+(Math.random()*2));
        //设置或者重置画布的0,0点
        context.translate(tempLeftUpX,tempLeftUpY);
        tempLeftUpX = tempLeftUpX + 6;
        tempLeftUpY = tempLeftUpY - 16;
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*14);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*14);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //左下
    var tempLeftBottomX = 10;
    var tempLeftBottomY = height*3/2-10;
    for(var i = 1; i < 3; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        tempLeftBottomX =RandomNumBoth(tempLeftBottomX,tempLeftBottomX+(Math.random()*2));
        tempLeftBottomY =RandomNumBoth(tempLeftBottomY,tempLeftBottomY+(Math.random()*2));
        //设置或者重置画布的0,0点
        context.translate(tempLeftBottomX,tempLeftBottomY);
        tempLeftBottomX = tempLeftBottomX + 6;
        tempLeftBottomY = tempLeftBottomY + 16;
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*14);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*14);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //右上
    var tempRightUpX = width*3/2;
    var tempRightUpY = height/2-8;
    for(var i = 1; i < 3; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        tempRightUpX =RandomNumBoth(tempRightUpX,tempRightUpX+(Math.random()*2));
        tempRightUpY =RandomNumBoth(tempRightUpY,tempRightUpY+(Math.random()*2));
        //设置或者重置画布的0,0点
        context.translate(tempRightUpX,tempRightUpY);
        tempRightUpX = tempRightUpX + 6;
        tempRightUpY = tempRightUpY + 18;
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*14);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*14);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }

    //右下
    var tempRightUpX = width*3/2 ;
    var tempRightUpY = height*3/2 + 8;
    for(var i = 1; i < 3; i++) {
        context.save();
        //设置分刻度的粗细
        context.lineWidth = 0.5;
        //设置分刻度的颜色
        context.strokeStyle = "#FFF";
        tempRightUpX =RandomNumBoth(tempRightUpX,tempRightUpX+(Math.random()*2));
        tempRightUpY =RandomNumBoth(tempRightUpY,tempRightUpY+(Math.random()*2));
        //设置或者重置画布的0,0点
        context.translate(tempRightUpX,tempRightUpY);
        tempRightUpX = tempRightUpX + 6;
        tempRightUpY = tempRightUpY - 16;
        //设置旋转的角度
        context.rotate((90)*Math.PI/180);
        //开始绘制
        context.beginPath();

        var rotate = RandomNumBoth(y-i*12,y-i*14);
        context.moveTo(-3,rotate);
        rotate = RandomNumBoth(y-i*12,y-i*14);
        context.lineTo(2,rotate);

        context.stroke();
        context.closePath();
        context.restore();
    }
    //---------------------------------------------------------
  }

/**
 * 发票专用章
*/
function fapiao (config) {

    config['company'] = '公司印诺系统集成有限公司';
    config['name'] = '发票专用章';

    var canvas = document.getElementById(config.canvasId);
    canvas.style.display='block';
    canvas.style.border='1px solid red';
    canvas.height=canvas.height;//清除画布
    canvas.setAttribute('width',config.width*config.multiple);
    canvas.setAttribute('height',config.height*config.multiple);
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';

    var context = canvas.getContext('2d');
    context.translate(0.5,0.5);// 平移到此位置,
    context.globalCompositeOperation = 'destination-over';

    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;


    var scale = parseInt(config.multiple*5/3);
    context.scale(scale,scale);

    // 绘制印章边框
    var width=canvas.width/(scale*2);
    var height=canvas.height/(scale*2);



    drawLine(context,config, width, height);
    context.translate(width/2,height/2);// 平移到此位置,
    drawEllipse(config,context,6, width/2, height/2, width-4, (width-4)/4*3);


    //---------------------------------------------------------
    var RAD_ANG = 57.295779513082320876798154814105;
    var endAngle = 0;
    var startAngle = 180;
    if (endAngle < startAngle)
           endAngle += 360;
//     if (endAngle < startAngle)
//         endAngle += 360;

    var padding = 10;

    var chars = config.company.split("");
    var length = config.company.length;// 字数
    var aAngle = (1.0 * (endAngle - startAngle)) / Math.max(length-1, 1);

    var a = (width) / 1.4;//弧度
    var b = (height) / 2.1;//文字上边距离

    var x0 = width / 2;
    var y0 = height / 2;

    context.translate(0,0);// 平移到此位置,
    context.font = 'bold '+(30)+'px serif ';
    context.fillStyle = config.sealColor||"#000";

    for (var i = 0; i < length; i++){
        var c = chars[i];// 需要绘制的字符

        var r = (startAngle + (i * aAngle)) / RAD_ANG;
        var x = x0 + (a * Math.cos(r));
        var y = y0 + (b * Math.sin(r));
        var k = -(((b * b) * (x - x0)) / ((a * a) * (y - y0)));
        var kAngle = (Math.atan(k) / (Math.PI / 180));

        context.save();

        kAngle += x < x0 ? -180 : 180;
        kAngle += y < y0 ? 180 : 0;

        context.translate(x, y);// 平移到此位置,此时字和x轴垂直
        context.rotate(kAngle*Math.PI/180);// 旋转90度,让字平行于x轴

        context.fillText(c,-7, 4,15);//-7控制初始角度
        context.restore();


    }

  //---------------------------------------------------------
    context.save();
    //横排编号
    context.font = 'bold '+(26)+'px Microsoft YaHei';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.fillStyle = config.sealColor||'#000';

    var sealnameAdjust = parseInt(config.sealnameAdjust||40);
    context.fillText('92130803MA09JAY10H',width/2,height/2,120);
    context.restore();
    context.save();

    //发票专用章
    context.font = 'bold '+(30)+'px serif';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.fillStyle = config.sealColor||'#000';

    var sealnameAdjust = parseInt(config.sealnameAdjust||40);
    context.fillText(config.name,width/2,height/1.2,80);
    context.restore();
    context.save();


    // 绘制编号
    context.translate(width/2,height/5.5);// 平移到此位置,
    config['sealNo'] = 'CDY130801130000001';
    context.font = 'normal normal 900 '+(8) +'px Microsoft YaHei';
    context.fillStyle = config.sealColor||'#000';
    var count2 = config.sealNum.length;// 字数
    var angle2 = Math.PI/(3.5*(count2 - 1));// 字间角度
    var chars2 = config.sealNum.split("");

    var c2;
    for (var i = count2-1; i >= 0; i--){
        c2 = chars2[i];// 需要绘制的字符
        if(i==count2-1)
            context.rotate(Math.PI/2.75);
        else
          context.rotate(angle2);
        context.save();
         context.translate(90, 0);// 平移到此位置,此时字和x轴垂直
        context.rotate(270*Math.PI/180);// 旋转90度,让字平行于x轴
        context.fillText(c2,0, 8,50);// 此点为字的中心点
        context.restore();
    }
    context.save();
    context.closePath();


}


function baoguanBottomText (config,context,width,height) {
    //---------------------------------------------------------
    var RAD_ANG = 57.295779513082320876798154814105;

    var startAngle = 180;
    var endAngle =0;

    config['company'] = 'CHENG DE CAST MINING LNVESTMENT CO., LTD';
    var charsTemp = config.company.split("");
    var temp = '';
    for (var i = 0; i < config.company.length; i++){
      var c = charsTemp[i];// 需要绘制的字符
      if(i < 7 && c !=' '){
        temp += c + ' ';
      }else if(i > config.company.length-5 && c !=' '){
        temp += c + ' ';
      }else{
        temp += c;
      }
    }
    config['company'] = temp.replace('CO','C O');

    var chars = config.company.split("");
    var length = config.company.length;// 字数

    var aAngle = (1 * (endAngle - startAngle)) / Math.max(length-1, 1);

    var a = (width) / 1.3;//弧度
    var b = (height) / 2;//文字上边距离

    var x0 = width / 2;
    var y0 = height / 2;

    context.translate(0,0);// 平移到此位置,
    context.font = ' '+(24)+'px  黑体';
    context.fillStyle = config.sealColor||"#000";

    for (var i = 0; i < length; i++){
         var c = chars[i];// 需要绘制的字符

          var r = (startAngle + (i * aAngle)) / RAD_ANG;
          var x = x0 + (a * Math.cos(r));
          var y = y0 + (b * Math.sin(r));
          var k = -(((b * b) * (x - x0)) / ((a * a) * (y - y0)));
          var kAngle = (Math.atan(k) / (Math.PI / 180));

          context.save();

          kAngle += x < x0 ? -180 : 180;
          kAngle += y < y0 ? 180 : 0;
          context.translate(x, y);// 平移到此位置,此时字和x轴垂直

          context.rotate(kAngle*Math.PI/180);// 旋转90度,让字平行于x轴

          context.rotate(180*Math.PI/180);// 旋转90度,让字平行于x轴
          context.fillText(c,-3, 10,5);//-7控制初始角度
          context.restore();
      }

  //---------------------------------------------------------
}
/**
 * 报关专用章
*/
function baoguan (config) {

    config['company'] = '承德铸成矿业投资有限公司';
    config['name'] = '报关专用章';

    var canvas = document.getElementById(config.canvasId);
    canvas.style.display='block';
    canvas.style.border='1px solid red';
    canvas.height=canvas.height;//清除画布
    canvas.setAttribute('width',config.width*config.multiple);
    canvas.setAttribute('height',config.height*config.multiple);
    canvas.style.width = config.width + 'px';
    canvas.style.height = config.height + 'px';

    var context = canvas.getContext('2d');
    context.translate(0.5,0.5);// 平移到此位置,
    context.globalCompositeOperation = 'destination-over';

    context.mozImageSmoothingEnabled = true;
    context.webkitImageSmoothingEnabled = true;
    context.msImageSmoothingEnabled = true;
    context.imageSmoothingEnabled = true;


    var scale = parseInt(config.multiple*5/3);
    context.scale(scale,scale);

    // 绘制印章边框
    var width=canvas.width/(scale*2);
    var height=canvas.height/(scale*2);



    drawLine(context,config, width, height);
    context.translate(width/2,height/2);// 平移到此位置,
    drawEllipse(config,context,6, width/2, height/2, width-4, (width-4)/25*18);

    drawEllipse(config,context,3, width/2, height/2, width/3*2-5, (width/3*2)/25*18-12);

    //---------------------------------------------------------
    var RAD_ANG = 57.295779513082320876798154814105;
    var endAngle = -20;
    var startAngle = -160;
    if (endAngle < startAngle)
           endAngle += 360;
//     if (endAngle < startAngle)
//         endAngle += 360;

    var padding = 10;

    var chars = config.company.split("");
    var length = config.company.length;// 字数
    var aAngle = (1.0 * (endAngle - startAngle)) / Math.max(length-1, 1);

    var a = (width) / 1.4;//弧度
    var b = (height) / 2.1;//文字上边距离

    var x0 = width / 2;
    var y0 = height / 2;

    context.translate(0,0);// 平移到此位置,
    context.font = 'bold '+(26)+'px serif ';
    context.fillStyle = config.sealColor||"#000";

    for (var i = 0; i < length; i++){
        var c = chars[i];// 需要绘制的字符

        var r = (startAngle + (i * aAngle)) / RAD_ANG;
        var x = x0 + (a * Math.cos(r));
        var y = y0 + (b * Math.sin(r));
        var k = -(((b * b) * (x - x0)) / ((a * a) * (y - y0)));
        var kAngle = (Math.atan(k) / (Math.PI / 180));

        context.save();

        kAngle += x < x0 ? -180 : 180;
        kAngle += y < y0 ? 180 : 0;

        context.translate(x, y);// 平移到此位置,此时字和x轴垂直
        context.rotate(kAngle*Math.PI/180);// 旋转90度,让字平行于x轴

        context.fillText(c,-7, 3,12);//-7控制初始角度
        context.restore();


    }

  //---------------------------------------------------------
    context.save();
    //横排编号
    context.font = 'bold '+(32)+'px serif';
    context.textBaseline = 'middle';//设置文本的垂直对齐方式
    context.textAlign = 'center'; //设置文本的水平对对齐方式
    context.fillStyle = config.sealColor||'#000';

    var sealnameAdjust = parseInt(config.sealnameAdjust||40);
    context.fillText(config.name,width/2,height/2,100);
    context.restore();
    context.save();


    baoguanBottomText(config,context,width,height);

}
