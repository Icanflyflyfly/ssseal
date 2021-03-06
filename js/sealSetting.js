/*
  2000
*/
var sealSizeParas = {
    line_size:96,//印章边线直径
    sealunit_span:14,//印章单位离边线宽度
    sealno_span:3,//印章编号离边线宽度
    sealunit_size:36,//印章单位大小
    sealno_size:11,//印章编号字体
    sealangle_size:function(companyName_new){//印章单位第一个字角度
      return (4*Math.PI/(3*((companyName_new.length) - 1))).toFixed(3);
    },
    sealname_adjust:47,//印章名称上下调节
    sealname_size:36,//印章名称大小
    line_width:6,//线粗细
    star5:25,//五角星直径
    width:332,//canvas宽
    height:332,//canvas高
    multiple:9,//canvas放大倍数
    line_num:16,//边纹数量
    sealno_angle:0.0834,//编码间距
    sealrotate_size:(5*Math.PI/6).toFixed(2),//单位名称旋转角度
    sealnorotate_size:Math.PI/9,//印章编号旋转角度
    sealname_font_adjust:90,//印章名称高低
    sealColor:'#000000',//印章颜色
    lineSafetySize:0.5,//防伪线粗细
    satefyLineArray:new Array(),
    satefyLineRepaint:true,
    faRenSatefyLine:new Array()
}

jQuery(function($) {

      var companyName = '承德印诺系统集成有限公司';
      var sealNum = '13080000000';
      var sealName = '';
      $('#preview_id').height($('#edit_id').height());
      /*
      * 公共参数设定
      */
      function commonSetting(){
          $('#line_size').val(sealSizeParas.line_size);
          $('#line_num').val(sealSizeParas.line_num);
          $('#line_safety_size').val(sealSizeParas.lineSafetySize);
          $('#seal_color').val(sealSizeParas.sealColor);
          $('#sealunit_span').val(sealSizeParas.sealunit_span);
          $('#sealunit_size').val(sealSizeParas.sealunit_size);
          $('#sealno_span').val(sealSizeParas.sealno_span);
          $('#sealnorotate_size').val((sealSizeParas.sealnorotate_size).toFixed(2));
          $('#sealno_size').val(sealSizeParas.sealno_size);
          $('#sealname_adjust').val(sealSizeParas.sealname_adjust);
          $('#sealname_size').val(sealSizeParas.sealname_size);
          $('#line_width').val(sealSizeParas.line_width);
          $('#sealno_angle').val((sealSizeParas.sealno_angle).toFixed(3));
          $('#sealrotate_size').val(sealSizeParas.sealrotate_size);
          $('#sealname_font_adjust').val(sealSizeParas.sealname_font_adjust);

          var companyName_new = $('#companyName').val();
          $('#sealangle_size').val(sealSizeParas.sealangle_size(companyName_new));
          $('#star5').val(sealSizeParas.star5);
      }

      /*预处理*/
      function preHandle(){
        //参数检查
        if(sealBaseInfoCheck() == false)return false;
        //返回参数
        var companyName_new = $('#companyName').val();
        var sealNum_new = $('#sealNum').val();
        var line_num = $('#line_num').val();
        var lineWidth = $('#line_width').val();
        var lineSize = $('#line_size').val();
        var sealColor = $('#seal_color').val();
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
        var lineSafetySize = $('#line_safety_size').val();
        var satetyLine = sealSizeParas.satetyLine;
        var sealangleSizeFapiao = $('#sealangle_size_fapiao').val();
        var sealrotateSizeFapiao = $('#sealrotate_size_fapiao').val();
        var sealNumFapiao = $('#sealNum_fapiao').val();
        var sealFapiaoFont = $('#seal_fapiao_font').val();
        var sealFapiaoAdjust = $('#seal_fapiao_adjust').val();
        var sealBaoguanEnglish = $('#seal_baoguan_english').val();

        var width = $(window).width();
        var height = $(window).height();

          var paras = {
            id:id,
            canvasId:'canvas_1',
            company:companyName_new,
            name:sealName,
            sealNum:sealNum_new,
            lineNum:line_num,
            lineWidth:lineWidth,
            lineSize:lineSize,
            sealColor:sealColor,
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
            sealnoSpan:-sealno_span,
            lineWidth2:seal_inborder,
            lineSize2:seal_inborder_size,
            width : sealSizeParas.width,
            height : sealSizeParas.height,
            multiple : sealSizeParas.multiple,
            lineSafetySize:lineSafetySize,
            satefyLineRepaint:sealSizeParas.satefyLineRepaint,
            sealangleSizeFapiao:sealangleSizeFapiao,
            sealrotateSizeFapiao:sealrotateSizeFapiao,
            sealNumFapiao:sealNumFapiao,
            sealFapiaoFont:sealFapiaoFont,
            sealFapiaoAdjust:sealFapiaoAdjust,
            sealBaoguanEnglish:sealBaoguanEnglish
          };
          return paras;
      }

      /**
      *  横排文字
      */
      function settingRowText(bol){
          if(bol == false){
            $('#row_font_size_id').hide();
            $('#row_adjust_id').hide();
            $('#row_font_adjust_id').hide();
          }else{
            $('#row_font_size_id').show();
            $('#row_adjust_id').show();
            $('#row_font_adjust_id').show();
          }
      }

      /**
      *  横排文字 设置
      */
      function specialSetting(id){
          $('#star5_id').show();
          $('#line_num_id').show();
          $('#sealunit_height_id').show();
          $('#sealangle_size_id').show();
          $('#sealrotate_size_id').show();
          $('#sealunit_span_id').show();

          $('#sealno_angle_id').show();
          $('#sealnorotate_size_id').show();
          $('#sealno_span_id').show();
          $('#special_setting_no_id').show();

          $('#special_setting_id').hide();
          $('#sealrotate_size_fapiao_id').hide();
          $('#special_setting_fapiao_id').hide();
          $('#special_setting_paoguan_id').hide();

          if(id == 'general_42_gh'){
            $('#special_setting_id').show();
          }

          if(id == 'general_20_faren'){
            $('#star5_id').hide();
            $('#line_num_id').hide();
            $('#sealunit_height_id').hide();
            $('#sealangle_size_id').hide();
            $('#sealrotate_size_id').hide();
            $('#sealunit_span_id').hide();

            $('#sealno_angle_id').hide();
            $('#sealnorotate_size_id').hide();
            $('#sealno_span_id').hide();
          }

          if(id == 'general_42_dang' || id == 'general_fapiao' || id == 'general_baoguan'){
            $('#star5_id').hide();
          }

          if(id == 'general_fapiao'){
            $('#sealangle_size_id').hide();
            $('#sealangle_size_fapiao_id').show();

            $('#sealrotate_size_id').hide();
            $('#sealrotate_size_fapiao_id').show();

            $('#special_setting_fapiao_id').show();
          }

          if(id == 'general_baoguan'){
            $('#sealangle_size_id').hide();
            $('#sealangle_size_fapiao_id').show();

            $('#sealrotate_size_id').hide();
            $('#sealrotate_size_fapiao_id').show();

            $('#special_setting_paoguan_id').show();
            $('#special_setting_no_id').hide();
          }
      }

      var id = '';
      $('#general_40').click(function(event,sealColor,satetyLine){
        id = 'general_40';
        $('#curr_seal_name').text($('#general_40 .sealText').text());
        sealName = '';
        settingRowText(false);
        specialSetting();
        commonSetting();

        createSeal(preHandle());
      });

      $('#general_38').click(function(event,sealColor){
        id = 'general_38';
        $('#curr_seal_name').text($('#general_38 .sealText').text());
        sealName = '账务专用章';
        settingRowText(true);
        specialSetting();
        commonSetting();

        createSeal(preHandle());
      });

      $('#general_30_cai').click(function(event,sealColor){
        id = 'general_30_cai';
        $('#curr_seal_name').text($('#general_30_cai .sealText').text());
        sealName = '账务专用章';
        settingRowText(true);
        specialSetting(id);
        commonSetting();

        createSeal(preHandle());
      });

      $('#general_20_faren').click(function(){
        id = 'general_20_faren';
        $('#curr_seal_name').text($('#general_20_faren .sealText').text());
        commonSetting();
        settingRowText(false);
        specialSetting(id);
        $('#sealno_size').val(7);
        $('#line_size').val(76);
        $('#sealunit_size').val(34);

        createSeal(preHandle());
      });


      $('#general_42').click(function(event,sealColor){
        id = 'general_42';
        $('#curr_seal_name').text($('#general_42 .sealText').text());
        sealName = '合同专用章';
        settingRowText(true);
        specialSetting();
        commonSetting();

        var paras = preHandle();
        createSeal(paras);

      });

      $('#general_42_gh').click(function(event,sealColor){
        id = 'general_42_gh';
        $('#curr_seal_name').text($('#general_42_gh .sealText').text());
        sealName = '工会委员会';
        settingRowText(true);
        specialSetting(id);
        commonSetting();

        $('#sealunit_size').val(34);
        $('#sealname_size').val(36);
        $('#sealunit_span').val(14);
        $('#sealno_span').val(7);
        $('#sealunit_span').val(17);
        $('#seal_inborder').val(3);
        $('#seal_inborder_size').val(90);
        $('#sealname_font_adjust').val(82);

        createSeal(preHandle());
      });

      $('#general_40_tuan').click(function(event,sealColor){
        id = 'general_40_tuan';
        $('#curr_seal_name').text($('#general_40_tuan .sealText').text());
        sealName = '中国共产主义青年团';
        commonSetting();
        settingRowText(true);
        specialSetting(id);

        $('#sealno_span').val(3);
        $('#sealunit_height').val(18);
        $('#star5').val(20);
        $('#sealname_size').val(20);
        $('#sealname_adjust').val(38);
        $('#sealname_font_adjust').val(145);
        $('#sealunit_size').val(24);
        $('#sealrotate_size').val((195*Math.PI/180).toFixed(3));
        $('#sealunit_span').val(9);
        $('#sealunit_height').val(15);

        var companyName_new = $('#companyName').val();
        $('#sealangle_size').val((Math.PI/(1.20*(companyName_new.length - 1))).toFixed(3));

        $('#sealnorotate_size').val((Math.PI/2.8).toFixed(3));

        createSeal(preHandle());

      });

      $('#general_42_dang').click(function(event,sealColor){
        var companyName_new = $('#companyName').val();
        id = 'general_42_dang';
        sealName = '支部委员会';
        settingRowText(true);
        specialSetting(id);
        commonSetting();
        $('#sealangle_size').val(sealSizeParas.sealangle_size(companyName_new));

        createSeal(preHandle());
      });

      $('#general_fapiao').click(function(event,sealColor){
        id = 'general_fapiao';
        sealName = '发票专用章';
        $('#curr_seal_name').text($('#general_fapiao .sealText').text());
        commonSetting();
        settingRowText(true);
        specialSetting(id);

        $('#sealunit_size').val(30);
        $('#line_size').val(96);
        $('#sealunit_height').val(15);
        $('#sealangle_size_fapiao').val(180);
        $('#sealrotate_size_fapiao').val(0);
        $('#sealunit_span').val(4);
        $('#sealname_size').val(30);
        $('#sealname_font_adjust').val(80);
        $('#sealname_adjust').val(83);
        $('#sealno_size').val(8);
        $('#sealno_span').val(-8);
        $('#sealnorotate_size').val((Math.PI/2.9).toFixed(3));

        var sealNum = $('#sealNum').val();
        $('#sealno_angle').val((Math.PI/(3*(sealNum.length - 1))).toFixed(3));

        createSeal(preHandle());
      });

      $('#general_baoguan').click(function(event,sealColor){
        id = 'general_baoguan';
        sealName = '报关专用章';
        $('#curr_seal_name').text($('#general_fapiao .sealText').text());
        commonSetting();
        settingRowText(true);
        specialSetting(id);

        $('#sealunit_size').val(26);
        $('#line_size').val(96);
        $('#sealunit_height').val(12);
        $('#sealangle_size_fapiao').val(-160);
        $('#sealrotate_size_fapiao').val(-20);
        $('#sealunit_span').val(3);
        $('#sealname_size').val(32);
        $('#sealname_font_adjust').val(100);
        $('#sealname_adjust').val(50);

        createSeal(preHandle());
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

        if(sealNum_new.length != 18){
          promot('请输入18位印章编号');
          return false;
        }

        if(id == ''){
          promot('请选择印章模板');
          return false;
        }

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
            id = 'general_40';
            sealName = '';
            commonSetting();

            var paras = preHandle();
            createSeal(paras);

            $('#general_40').trigger();
          }else if(id == 'general_40_tuan'){
            id = 'general_40_tuan';
            $('#curr_seal_name').text($('#general_40_tuan .sealText').text());
            sealName = '中国共产主义青年团';
            commonSetting();
            settingRowText(true);
            specialSetting(id);

            $('#sealno_span').val(3);
            $('#sealunit_height').val(18);
            $('#star5').val(20);
            $('#sealname_size').val(20);
            $('#sealname_adjust').val(38);
            $('#sealname_font_adjust').val(145);
            $('#sealunit_size').val(24);
            $('#sealrotate_size').val((195*Math.PI/180).toFixed(3));
            $('#sealunit_span').val(9);
            $('#sealunit_height').val(15);

            var companyName_new = $('#companyName').val();
            $('#sealangle_size').val((Math.PI/(1.20*(companyName_new.length - 1))).toFixed(3));

            $('#sealnorotate_size').val((Math.PI/2.8).toFixed(3));

            var paras = preHandle();
            createSeal(paras);
          }else if(id == 'general_38'){
            id = 'general_38';
            sealName = '账务专用章';
            commonSetting();
            var paras = preHandle();
            createSeal(paras);
          }else if(id == 'general_42'){
            id = 'general_42';
            sealName = '合同专用章';

            commonSetting();
            var paras = preHandle();
            createSeal(paras);

          }else if(id == 'general_42_gh'){
            id = 'general_42_gh';
            sealName = '工会委员会';
            commonSetting();

            $('#sealunit_size').val(34);
            $('#sealname_size').val(36);
            $('#sealunit_span').val(14);
            $('#sealno_span').val(7);
            $('#sealunit_span').val(17);
            $('#seal_inborder').val(3);
            $('#seal_inborder_size').val(90);
            $('#sealname_font_adjust').val(82);

            var paras = preHandle();
            createSeal(paras);
          }else if(id == 'general_30_cai'){
            id = 'general_30_cai';
            sealName = '账务专用章';
            commonSetting();
            var paras = preHandle();
            createSeal(paras);
          }else if(id == 'general_20_faren'){
            id = 'general_20_faren';
            commonSetting();

            $('#sealno_size').val(10);
            var paras = preHandle();
            paras['width'] = 138;
            paras['height'] = 138;
            createSeal(paras);
          }

      });

      $('#clear_setting').click(function(){
         $('#companyName').val('');
         $('#sealNum').val('');
      });


      //--------------------------setting start----------------------------------------------
      /*防伪纹线多少设置*/
      $('#line_num_add').click(function(){
        var line_num = $('#line_num').val();
        var line_num = parseInt(line_num) + 2;
        $('#line_num').val(line_num);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#line_num_reduce').click(function(){
          var line_num = $('#line_num').val();
          var line_num = parseInt(line_num) - 2;
          $('#line_num').val(line_num);

          var paras = preHandle();
          createSeal(paras);
      });
      /*防伪纹线粗细设置*/
      $('#line_safety_size_add').click(function(){
        var line_safety_size = $('#line_safety_size').val();
        var line_safety_size = (parseFloat(line_safety_size)+0.5).toFixed(1);
        $('#line_safety_size').val(line_safety_size);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#line_safety_size_reduce').click(function(){
        var line_safety_size = $('#line_safety_size').val();
        var line_safety_size = (parseFloat(line_safety_size)-0.5).toFixed(1);
        $('#line_safety_size').val(line_safety_size);

          var paras = preHandle();
          createSeal(paras);
      });

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

      /*颜色设置*/
      $("#seal_color_img").colorpicker({
          event:'click',
          fillcolor:true,
          target:$("#seal_color"),
          success:function(o,color){
            sealSizeParas['sealColor'] = color;
            var paras = preHandle();
            createSeal(paras);
          }
      });

      $("#seal_color").keydown(function(event){

        if (event.keyCode == 13 || event.keyCode == 108) {
            var color = $("#seal_color").val();
            if(color.length != 7 || color.indexOf('#') < 0){
              promot('请输入正确的颜色值');
              return false;
            }
            event.preventDefault();
            var paras = preHandle();
            createSeal(paras);
        }
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

      /*发票印章单位角度设置*/
      $('#sealangle_bigger_fapiao').click(function(){
          var sealangle_size_fapiao = $('#sealangle_size_fapiao').val();
          var sealangle_size_fapiaoInt = parseFloat(sealangle_size_fapiao);
          $('#sealangle_size_fapiao').val((sealangle_size_fapiaoInt+1));
          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealangle_smaller_fapiao').click(function(){
        var sealangle_size_fapiao = $('#sealangle_size_fapiao').val();
        var sealangle_size_fapiaoInt = parseFloat(sealangle_size_fapiao);
        $('#sealangle_size_fapiao').val((sealangle_size_fapiaoInt-1));

          var paras = preHandle();
          createSeal(paras);
      });

      /*发票印章单位旋转设置*/
      $('#sealrotate_bigger_fapiao').click(function(){
          var sealrotate_size_fapiao = $('#sealrotate_size_fapiao').val();
          var ssealrotate_size_fapiaoFloat = parseInt(sealrotate_size_fapiao);
          $('#sealrotate_size_fapiao').val((ssealrotate_size_fapiaoFloat+1));
          var paras = preHandle();
          createSeal(paras);
      });
      $('#sealrotate_smaller_fapiao').click(function(){
        var sealrotate_size_fapiao = $('#sealrotate_size_fapiao').val();
        var ssealrotate_size_fapiaoFloat = parseInt(sealrotate_size_fapiao);
        $('#sealrotate_size_fapiao').val((ssealrotate_size_fapiaoFloat-1));

          var paras = preHandle();
          createSeal(paras);
      });

      /*发票横排编号大小*/
      $('#seal_fapiao_font_bigger').click(function(){
          var seal_fapiao_font = $('#seal_fapiao_font').val();
          var seal_fapiao_fontInt = parseInt(seal_fapiao_font);
          $('#seal_fapiao_font').val(seal_fapiao_fontInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#seal_fapiao_font_smaller').click(function(){
        var seal_fapiao_font = $('#seal_fapiao_font').val();
        var seal_fapiao_fontInt = parseInt(seal_fapiao_font);
        $('#seal_fapiao_font').val(seal_fapiao_fontInt-1);

          var paras = preHandle();
          createSeal(paras);
      });

      /*发票横排编号上下*/
      $('#seal_fapiao_adjust_up').click(function(){
          var seal_fapiao_adjust = $('#seal_fapiao_adjust').val();
          var seal_fapiao_adjustInt = parseInt(seal_fapiao_adjust);
          $('#seal_fapiao_adjust').val(seal_fapiao_adjustInt+1);

          var paras = preHandle();
          createSeal(paras);
      });
      $('#seal_fapiao_adjust_down').click(function(){
          var seal_fapiao_adjust = $('#seal_fapiao_adjust').val();
          var seal_fapiao_adjustInt = parseInt(seal_fapiao_adjust);
          $('#seal_fapiao_adjust').val(seal_fapiao_adjustInt-1);

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
        // var myCanvas = document.getElementById("canvas_1");
        // var imgURI = myCanvas.toDataURL("image/png");

        var imgURI = $('#seal_image_down').attr('src');
        // 下载后的问题名
        var filename = 'yinzhang_' + (new Date()).getTime() + '.png' ;
        // download
        saveFile(imgURI,filename);
      });

      /*生成印章*/
      $('#get_seal').click(function(){
          var seallColor = sealSizeParas['sealColor'];
          $('#seal_color').val('#FF0000');
          sealSizeParas['satefyLineRepaint'] = false;
          if(createSeal(preHandle()) == false)return;

          var sealImage = '154px';
          if(id == 'general_40'){
            sealImage = '154px';
          }else if(id == 'general_38'){
            sealImage = '145px';
          }else if(id == 'general_42'){
            sealImage = '162px';
          }else if(id == 'general_42_gh'){
            sealImage = '162px';
          }else if(id == 'general_30_cai'){
            sealImage = '114px'
          }else if(id == 'general_20_faren'){
            sealImage = '76px';
          }else if(id == 'general_baoguan'){
            sealImage = '190px';
          }

          var myCanvas = document.getElementById("canvas_1");
          var imgURI = myCanvas.toDataURL("image/png");
          $('#seal_image_down').attr('src',imgURI);
          $('#seal_image_down').attr('width',sealImage);
          $('#seal_image_down').attr('height',sealImage);


          $('#seal_color').val(seallColor);

          createSeal(preHandle());

          var myCanvas2 = document.getElementById("canvas_1");
          var imgURI2 = myCanvas2.toDataURL("image/png");
          $('#seal_image').attr('src',imgURI2);
          $('#seal_image').attr('width',sealImage);
          $('#seal_image').attr('height',sealImage);

          sealSizeParas['satefyLineRepaint'] = true;

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
var px1 = conv.mmConversionPx(50);
console.log('px1 = '+px1);
