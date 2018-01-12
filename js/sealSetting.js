/*
  2000
*/
var sealSizeParas = {
    line_size:98,
    sealunit_span:9,
    sealno_span:-1,
    sealunit_size:36,
    sealno_size:16,
    sealangle_size:function(companyName_new){
      return (4*Math.PI/(3*((companyName_new.length) - 1))).toFixed(3);
    },
    sealname_adjust:50,
    sealname_size:38
}

jQuery(function($) {
      var companyName = '承德印诺系统集成有限公司';
      var sealNum = '13080000000';
      var sealName = '';

      $('#line_size').val(sealSizeParas.line_size);
      $('#sealunit_span').val(sealSizeParas.sealunit_span);
      $('#sealno_span').val(sealSizeParas.sealno_span);
      $('#sealunit_size').val(sealSizeParas.sealunit_size);
      $('#sealno_size').val(sealSizeParas.sealno_size);
      $('#sealname_adjust').val(sealSizeParas.sealname_adjust);
      $('#sealname_size').val(sealSizeParas.sealname_size);

      var line_size = 98;
      var seal_38 = 98;
      var seal_42 = 80;

      var id = '';
      $('#general_40').click(function(){
        var companyName_new = $('#companyName').val();
        id = 'general_40';
        sealName = '';
        $('#sealangle_size').val(sealSizeParas.sealangle_size(companyName_new));

        var paras = preHandle();
        createSeal(paras);

      });

      $('#general_38').click(function(){
        var companyName_new = $('#companyName').val();
        id = 'general_38';
        sealName = '账务专用章';

        $('#sealangle_size').val(sealSizeParas.sealangle_size(companyName_new));
        var paras = preHandle();
        createSeal(paras);
      });

      $('#general_42').click(function(){
        var companyName_new = $('#companyName').val();
        id = 'general_42';
        sealName = '合同专用章';

        $('#sealangle_size').val(sealSizeParas.sealangle_size(companyName_new));
        var paras = preHandle();
        createSeal(paras);

      });

      $('#general_42_dang').click(function(){
        var companyName_new = $('#companyName').val();
        id = 'general_42_dang';
        sealName = '支部委员会';

        $('#sealangle_size').val(sealSizeParas.sealangle_size(companyName_new));
        var paras = preHandle();
        createSeal(paras);
      });

      $('#general_42_gh').click(function(){
        var companyName_new = $('#companyName').val();
        id = 'general_42_gh';
        sealName = '工会委员会';

        $('#sealunit_size').val(34);
        $('#sealname_size').val(36);
        $('#sealunit_span').val(14);
        $('#sealno_span').val(-4);
        $('#sealangle_size').val(sealSizeParas.sealangle_size(companyName_new));

        var paras = preHandle();
        paras['lineWidth2'] = 2.5;
        paras['lineSize2'] = 94;
        createSeal(paras);
      });

      $('#general_40_tuan').click(function(){
        id = 'general_40_tuan';
        createSeal8('canvas_1','中国共产主义青年团','承德中滦煤化工有限公司');
      });

      $('#general_40_cai').click(function(){
        id = 'general_40_cai';
        sealName = '账务专用章';
        $('#line_size').val(seal_40);
        $('#sealunit_span').val(27);
        $('#sealno_span').val(22);
        $('#sealname_size').val(22);
        $('#sealno_size').val(12);

        var paras = preHandle();
        createSeal(paras);
      });

      $('#general_20_faren').click(function(){
        id = 'general_20_faren';
        createSeal7('canvas_1','测试用印','1308030013960');
      });


      /*印章基本信息检查*/
      function sealBaseInfoCheck(){
        var companyName_new = $('#companyName').val();
        var sealNum_new = $('#sealNum').val();

        if(companyName_new == ''){
          $('#companyName').focus();
          promot('请输入印章名称');
          return false;
        }

        if(sealNum_new == ''){
          $('#sealNum').focus();
          promot('请输入印章编号');
          return false;
        }

        if(sealNum_new.length != 11){
          promot('请输入11位印章编号');
          return false;
        }

        if(id == ''){
          promot('请选择印章模板');
          return false;
        }

      }

      /*预处理*/
      function preHandle(){
        //参数检查
        if(sealBaseInfoCheck() == false)return;
        //返回参数
        var companyName_new = $('#companyName').val();
        var sealNum_new = $('#sealNum').val();
        var lineWidth = $('#line_width').val();
        var lineSize = $('#line_size').val();
        var star5 = $('#star5').val();
        var sealname_size = $('#sealname_size').val();
        var sealname_adjust = $('#sealname_adjust').val();
        var sealname_font_adjust = $('#sealname_font_adjust').val();
        var sealunit_size = $('#sealunit_size').val();
        var sealangle_size = $('#sealangle_size').val();
        var sealrotate_size = $('#sealrotate_size').val();
        var sealunit_height = $('#sealunit_height').val();
        var sealno_size = $('#sealno_size').val();
        var sealno_angle = $('#sealno_angle').val();
        var sealnorotate_size = $('#sealnorotate_size').val();
        var sealunit_span = $('#sealunit_span').val();
        var sealno_span = $('#sealno_span').val();
        var seal_inborder = $('#seal_inborder').val();
        var seal_inborder_size = $('#seal_inborder_size').val();

        var width = $(window).width();
        var height = $(window).height();

          var paras = {
            id:id,
            canvasId:'canvas_1',
            company:companyName_new,
            name:sealName,
            sealNum:sealNum_new,
            lineWidth:lineWidth,
            lineSize:lineSize,
            star5:star5,
            sealnameSize:sealname_size,
            sealnameAdjust:sealname_adjust,
            sealnameFontAdjust:sealname_font_adjust,
            sealunitSize:sealunit_size,
            sealangleSize:sealangle_size,
            sealrotateSize:sealrotate_size,
            sealunitHeight:sealunit_height,
            sealnoSize:sealno_size,
            sealnoAngle:sealno_angle,
            sealnorotateSize:sealnorotate_size,
            sealunitSpan:sealunit_span,
            sealnoSpan:sealno_span,
            lineWidth2:seal_inborder,
            lineSize2:seal_inborder_size,
            canvasWidth : width,
            canvasHeight : height
          };
          return paras;
      }

      /*印章基本信息设置*/
      $('#base_setting').click(function(){
          if(sealBaseInfoCheck() == false)return;
          var companyName_new = $('#companyName').val();

          if(id == 'general_42_dang'){
            id = 'general_42_dang';
            sealName = '支部委员会';
            $('#line_size').val(seal_42);
            $('#sealunit_span').val(25);
            $('#sealno_span').val(18);
            $('#sealname_size').val(24);
            $('#sealunit_size').val(24);
            $('#sealno_size').val(12);
            $('#sealname_adjust').val(40);
            $('#sealangle_size').val((4*Math.PI/(3*((companyName_new.length) - 1))).toFixed(3));

            var paras = preHandle();
            createSeal(paras);

          }else if(id == 'general_40'){
            $('#line_size').val(seal_40);
            $('#sealname_size').val(22);
            $('#sealunit_span').val(27);
            $('#sealno_span').val(22);
            $('#sealno_size').val(12);
            $('#sealangle_size').val((4*Math.PI/(3*((companyName_new.length) - 1))).toFixed(3));

            var paras = preHandle();
            createSeal(paras);
          }else if(id == 'general_38'){
            $('#line_size').val(seal_38);
            $('#sealname_size').val(20);
            $('#sealunit_span').val(31);
            $('#sealno_span').val(25);
            $('#sealno_size').val(10);
            $('#sealangle_size').val((4*Math.PI/(3*((companyName_new.length) - 1))).toFixed(3));

            var paras = preHandle();
            createSeal(paras);
          }else if(id == 'general_42'){
            id = 'general_42';
            $('#line_size').val(seal_42);
            $('#sealunit_span').val(25);
            $('#sealno_span').val(18);
            $('#sealname_size').val(24);
            $('#sealunit_size').val(24);
            $('#sealno_size').val(12);
            $('#sealname_adjust').val(40);
            $('#sealangle_size').val((4*Math.PI/(3*((companyName_new.length) - 1))).toFixed(3));

            var paras = preHandle();
            createSeal(paras);

          }else if(id == 'general_42_gh'){
            id = 'general_42_gh';
            $('#line_size').val(seal_42);
            $('#sealunit_span').val(25);
            $('#sealno_span').val(18);
            $('#sealname_size').val(24);
            $('#sealunit_size').val(24);
            $('#sealno_size').val(10);
            $('#sealname_adjust').val(40);
            $('#sealangle_size').val((4*Math.PI/(3*((companyName_new.length) - 1))).toFixed(3));

            var paras = preHandle();
            paras['lineWidth2'] = 3;
            paras['lineSize2'] = 74;
            createSeal(paras);
          }

      });

      $('#clear_setting').click(function(){
         $('#companyName').val('');
         $('#sealNum').val('');
      });


      //--------------------------setting start----------------------------------------------
      /*边框粗细设置*/
      $('#border_reduce').click(function(){
          var borderNum = $('#line_width').val();
          var borderNumInt = (parseFloat(borderNum)-0.5).toFixed(1);
          $('#line_width').val(borderNumInt);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#border_add').click(function(){
          var borderNum = $('#line_width').val();
          var borderNumInt = (parseFloat(borderNum)+0.5).toFixed(1);
          $('#line_width').val(borderNumInt);

          var paras = preHandle();
          createSeal(paras);
      });

      /*边框大小设置*/
      $('#border_bigger').click(function(){
          var borderSize = $('#line_size').val();
          var borderSizeInt = parseInt(borderSize);
          $('#line_size').val(borderSizeInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#border_smaller').click(function(){
        var borderSize = $('#line_size').val();
        var borderSizeInt = parseInt(borderSize);
        $('#line_size').val(borderSizeInt-1);

        var paras = preHandle();
        createSeal(paras);
      });

      /*内边框粗细设置*/
      $('#seal_inborder_bigger').click(function(){
          var seal_inborder = $('#seal_inborder').val();
          var seal_inborderInt = parseInt(seal_inborder);
          $('#seal_inborder').val(seal_inborderInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#seal_inborder_smaller').click(function(){
        var seal_inborder = $('#seal_inborder').val();
        var seal_inborderInt = parseInt(seal_inborder);
        $('#seal_inborder').val(seal_inborderInt-1);

          var paras = preHandle();
          createSeal(paras);
      });

      /*内边框大小设置*/
      $('#seal_inborder_size_bigger').click(function(){
          var seal_inborder_size = $('#seal_inborder_size').val();
          var seal_inborder_sizeInt = parseInt(seal_inborder_size);
          $('#seal_inborder_size').val(seal_inborder_sizeInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#seal_inborder_size_smaller').click(function(){
        var seal_inborder_size = $('#seal_inborder_size').val();
        var seal_inborder_sizeInt = parseInt(seal_inborder_size);
        $('#seal_inborder_size').val(seal_inborder_sizeInt-1);

        var paras = preHandle();
        createSeal(paras);
      });

      /*五角星大小设置*/
      $('#star5_bigger').click(function(){
          var star5 = $('#star5').val();
          var star5Int = parseInt(star5);
          $('#star5').val(star5Int+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#star5_smaller').click(function(){
        var star5 = $('#star5').val();
        var star5Int = parseInt(star5);
        $('#star5').val(star5Int-1);

        var paras = preHandle();
        createSeal(paras);
      });

      /*印章名称字体设置*/
      $('#sealname_size_bigger').click(function(){
          var sealname_size = $('#sealname_size').val();
          var sealname_sizeInt = parseInt(sealname_size);
          $('#sealname_size').val(sealname_sizeInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealname_size_smaller').click(function(){
        var sealname_size = $('#sealname_size').val();
        var sealname_sizeInt = parseInt(sealname_size);
        $('#sealname_size').val(sealname_sizeInt-1);

        var paras = preHandle();
        createSeal(paras);
      });

      /*印章名称上下调节设置*/
      $('#sealname_adjust_up').click(function(){
          var sealname_adjust = $('#sealname_adjust').val();
          var sealname_adjustInt = parseInt(sealname_adjust);
          $('#sealname_adjust').val(sealname_adjustInt-1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealname_adjust_down').click(function(){
        var sealname_adjust = $('#sealname_adjust').val();
        var sealname_adjustInt = parseInt(sealname_adjust);
        $('#sealname_adjust').val(sealname_adjustInt+1);

        var paras = preHandle();
        createSeal(paras);
      });

      /*印章名称高度调节*/
      $('#sealname_adjust_font_up').click(function(){
          var sealname_adjust = $('#sealname_font_adjust').val();
          var sealname_adjustInt = parseInt(sealname_adjust);
          $('#sealname_font_adjust').val(sealname_adjustInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealname_adjust_font_down').click(function(){
        var sealname_adjust = $('#sealname_font_adjust').val();
        var sealname_adjustInt = parseInt(sealname_adjust);
        $('#sealname_font_adjust').val(sealname_adjustInt-1);

        var paras = preHandle();
        createSeal(paras);
      });


      /*印章单位字体设置*/
      $('#sealunit_size_bigger').click(function(){
          var switchealunit_size = $('#sealunit_size').val();
          var sealunit_sizeInt = parseInt(switchealunit_size);
          $('#sealunit_size').val(sealunit_sizeInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealunit_size_smaller').click(function(){
        var switchealunit_size = $('#sealunit_size').val();
        var sealunit_sizeInt = parseInt(switchealunit_size);
        $('#sealunit_size').val(sealunit_sizeInt-1);

        var paras = preHandle();
        createSeal(paras);
      });

      /*印章单位字体高度设置*/
      $('#sealunit_height_bigger').click(function(){
          var sealunit_height = $('#sealunit_height').val();
          var sealunit_heightInt = parseInt(sealunit_height);
          $('#sealunit_height').val(sealunit_heightInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealunit_height_smaller').click(function(){
        var sealunit_height = $('#sealunit_height').val();
        var sealunit_heightInt = parseInt(sealunit_height);
        $('#sealunit_height').val(sealunit_heightInt-1);

        var paras = preHandle();
        createSeal(paras);
      });

      /*印章单位角度设置*/
      $('#sealangle_bigger').click(function(){
          var sealangle_size = $('#sealangle_size').val();
          var sealangle_sizeInt = parseFloat(sealangle_size);
          $('#sealangle_size').val((sealangle_sizeInt+0.001).toFixed(3));
          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealangle_smaller').click(function(){
          var sealangle_size = $('#sealangle_size').val();
          var sealangle_sizeInt = parseFloat(sealangle_size);
          $('#sealangle_size').val((sealangle_sizeInt-0.001).toFixed(3));

          var paras = preHandle();
          createSeal(paras);
      });

      /*印章单位旋转设置*/
      $('#sealrotate_bigger').click(function(){
          var sealrotate_size = $('#sealrotate_size').val();
          var sealrotate_sizeFloat = parseFloat(sealrotate_size);
          $('#sealrotate_size').val((sealrotate_sizeFloat+0.01).toFixed(2));
          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealrotate_smaller').click(function(){
          var sealrotate_size = $('#sealrotate_size').val();
          var sealrotate_sizeFloat = parseFloat(sealrotate_size);
          $('#sealrotate_size').val((sealrotate_sizeFloat-0.01).toFixed(2));

          var paras = preHandle();
          createSeal(paras);
      });

      /*单位与边框间距*/
      $('#sealunit_span_bigger').click(function(){
          var sealunit_span = $('#sealunit_span').val();
          var sealunit_spanInt = parseInt(sealunit_span);
          $('#sealunit_span').val(sealunit_spanInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealunit_span_smaller').click(function(){
        var sealunit_span = $('#sealunit_span').val();
        var sealunit_spanInt = parseInt(sealunit_span);
        $('#sealunit_span').val(sealunit_spanInt-1);

          var paras = preHandle();
          createSeal(paras);
      });


      /*编号字体大小*/
      $('#sealno_bigger').click(function(){
          var sealno_size = $('#sealno_size').val();
          var sealno_sizeInt = parseFloat(sealno_size);
          $('#sealno_size').val(sealno_sizeInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealno_smaller').click(function(){
        var sealno_size = $('#sealno_size').val();
        var sealno_sizeInt = parseFloat(sealno_size);
        $('#sealno_size').val(sealno_sizeInt-1);

          var paras = preHandle();
          createSeal(paras);
      });

      /*编号角度大小*/
      $('#sealno_angle_bigger').click(function(){
          var sealno_angle = $('#sealno_angle').val();
          var sealno_angleFloat = parseFloat(sealno_angle);
          $('#sealno_angle').val((sealno_angleFloat+0.001).toFixed(3));

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealno_angle_smaller').click(function(){
        var sealno_angle = $('#sealno_angle').val();
        var sealno_angleFloat = parseFloat(sealno_angle);
        $('#sealno_angle').val((sealno_angleFloat-0.001).toFixed(3));

          var paras = preHandle();
          createSeal(paras);
      });

      /*印章编号旋转设置*/
      $('#sealnorotate_bigger').click(function(){
          var sealnorotate_size = $('#sealnorotate_size').val();
          var sealnorotate_sizeFloat = parseFloat(sealnorotate_size);
          $('#sealnorotate_size').val((sealnorotate_sizeFloat+0.01).toFixed(2));
          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealnorotate_smaller').click(function(){
          var sealnorotate_size = $('#sealnorotate_size').val();
          var sealnorotate_sizeFloat = parseFloat(sealnorotate_size);
          $('#sealnorotate_size').val((sealnorotate_sizeFloat - 0.01).toFixed(2));
          var paras = preHandle();
          createSeal(paras);
      });

      /*编号与边框间距*/
      $('#sealno_span_bigger').click(function(){
          var sealno_span = $('#sealno_span').val();
          var ssealno_spanInt = parseInt(sealno_span);
          $('#sealno_span').val(ssealno_spanInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealno_span_smaller').click(function(){
          var sealno_span = $('#sealno_span').val();
          var ssealno_spanInt = parseInt(sealno_span);
          $('#sealno_span').val(ssealno_spanInt-1);

          var paras = preHandle();
          createSeal(paras);
      });

      //--------------------------setting end----------------------------------------------

      function promot(promotText){
        $('#promotText').text(promotText);
        $('#myModal').modal('show');
      }

      /*下载印章*/
      var saveFile = function(data, filename){
          var save_link = document.createElementNS('http://www.w3.org/1999/xhtml', 'a');
          save_link.href = data;
          save_link.download = filename;

          var event = document.createEvent('MouseEvents');
          event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
          save_link.dispatchEvent(event);
      };

      $('#down_seal').click(function(){
        var myCanvas = document.getElementById("canvas_1");

        var imgURI = myCanvas.toDataURL("image/png");

        // 下载后的问题名
        var filename = 'yinzhang_' + (new Date()).getTime() + '.png' ;
        // download
        saveFile(imgURI,filename);
      });

      $('#get_seal').click(function(){
          var myCanvas = document.getElementById("canvas_1");
          var imgURI = myCanvas.toDataURL("image/png");

          var sealImage = '154px';
          if(id == 'general_40'){
            sealImage = '154px';
          }else if(id == 'general_38'){
            sealImage = '145px';
          }else if(id == 'general_42'){
            sealImage = '162px';
          }else if(id == 'general_42_gh'){
            sealImage = '162px';
          }

          $('#seal_image').attr('src',imgURI);
          $('#seal_image').attr('width',sealImage);
          $('#seal_image').attr('height',sealImage);

      });


      $('#print_seal').click(function(){
          $('#seal_image').jqprint({
             debug: false,
             importCSS: true,
             printContainer: true,
             operaSupport: false
         });
     });

  });


var conv = new unitConversion();
var px1 = conv.mmConversionPx(38);
console.log('px1 = '+px1);
