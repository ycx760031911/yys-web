//滑入动画
(function () {
    var $bgVideo = $("#bg").find(".bg1 object"),
        $wrap = $("#wrap"),
        $swp = $wrap.find(".swp");

    setTimeout(function () {
        $bgVideo[0].onload = function () {
            $(this).css("opacity" , 1);
        };
    },1500);

    $swp.eq(0).animate({
        opacity : 1,
        left : 0
    },1800);

    $swp.eq(1).animate({
        opacity : 1,
        right : 0
    },1800);

    $swp.eq(2).animate({
        opacity : 1,
        top : 75
    },1200);

    $swp.eq(3).animate({
        opacity : 1,
        top : 595
    },1200);

})();

//newinfo
(function () {
    var  $wrap = $("#wrap"),
        $btn = $wrap.find(".video-btn"),
        $video = $wrap.find(".video"),
        $close = $wrap.find(".video-box .close");

    $btn.click(function () {
        $video.show();
        $(document.body).addClass("noScroll");
    })

    $close.click(function () {
        $video.hide();
        $(document.body).removeClass("noScroll");
    })
})();

//newinfo弹窗
(function () {

    var $newinfo = $('#newinfo'),
        $infolistLi = $newinfo.find(".infoList ul li"),
        $text = $newinfo.find('.content .txt'),
        $popwindow = $newinfo.find(".popwindow"),
        $popwindowLi = $popwindow.find(".content ul li"),
        $text_H = $text.height(),//文本的可视高
        $close = $popwindow.find(".content .close"),
        $btn = $popwindow.find(".content .btn"),
        length = $popwindowLi.length,
        index = 0;

    $text.each(function () {
        var $mainTxt = $popwindow.find('.content ul li .mainTxt'),//获取文本盒子
            $scroll = $(this).find('.scroll'),
            $bar = $scroll.find('.bar'),//滑动块
            $mainTxt_H = $mainTxt.height(),//文本的真实高度，
            $bar_H = $text_H*$text_H/$mainTxt_H,//滑动块的动态高度
            topMax = $text_H-$bar_H,
            topMin = 0;
        $bar.height($bar_H);//设置滑动块的高度

        //滑块拖动
        $bar.mousedown(function (e) {//鼠标按下
            var sY = e.clientY,//鼠标当前的位置
                sTop = $(this).position().top,//当前滑块距离顶部的距离
                $This = $(this),//保存当前this
                $mainTxt = $(this).parent().siblings();//找到文本mainTxt
            //鼠标移动
            $(document).mousemove(function (e) {
                var nY = e.clientY,
                    bar_top =  sTop + nY - sY;
                bar_top = Math.min(bar_top , topMax);
                bar_top = Math.max(bar_top , topMin);
                $This.css("top",bar_top);
                $mainTxt.css("top",-bar_top*$mainTxt_H/$text_H);
            }).mouseup(function () {
                $(this).off("mousemove").off("mouseup");
            })
            return false;
        });

        //鼠标滚轮
        $(this).mousewheel(function (e,d) {
            var nTop = $bar.position().top;
            if (d<0){//拉
                nTop += 10;
            }else {//推
                nTop -= 10;
            }
            nTop = Math.min(nTop , topMax);
            nTop = Math.max(nTop , topMin);
            $bar.css("top",nTop);
            $mainTxt.css("top",-nTop*$mainTxt_H/$text_H);
        });

        //鼠标点击滚动条
        $scroll.click(function (e) {
            if (e.target === this){
                var sY = e.clientY - ($(this).offset().top - $(document).scrollTop()),//点击的位置到浏览器可视窗口的距离-当前滚动条到文档顶部的距离-滚动条滚动的距离
                    top = $bar.position().top;
                top = sY<top?top-70:top+70;
                top = Math.min(top , topMax);
                top = Math.max(top , topMin);
                $bar.stop().animate({"top":top},300);
                $mainTxt.stop().animate({"top":-top*$mainTxt_H/$text_H},300);
            };
        });
    });//each结束

    $popwindow.css("opacity",1).hide();
    $popwindowLi.hide();

    //点击弹窗
    $infolistLi.click(function () {
        index = $(this).index();
        $(document.body).addClass("noScroll");
        $popwindow.show();
        $popwindowLi.eq(index).show().siblings().hide();
    })
    // 关闭弹窗
    $close.click(function () {
        $popwindow.hide();
        $popwindowLi.hide();
        $(document.body).removeClass("noScroll");
    })

    //info弹窗按钮切换
    $btn.click(function () {
        if ($(this).index(".content .btn")){
            //true - 1 右
            index++;
            index %= length;
        }else{
            // false - 0  左
            index--;
            index<0?index=length-1:null;
        }
        $popwindowLi.eq(index).show().siblings().hide();
    });

    //游戏特色切换
    (function () {
        var $gameGood = $("#gamegood"),
            $picLi = $gameGood.find(".pic ul li"),
            $picBtn = $gameGood.find(".banner .btn"),
            index = 0,
            length = $picLi.length;

        //每个li点击
        $picLi.click(function () {
            if ($(this).index() !== index){
                index = $(this).index();
                liChange();
            }
        });
        
        //按钮切换
        $picBtn.click(function (e) {
            console.log(e.target);
            if ( $(this).index() ){
                //右
                index++;
                index %= length;
            }else{
                //左
                index--;
                if (index<0)index=length-1;
            }
            liChange();
        });

        //运动效果
        function liChange(){
            var lIndex = index-1,
                rIndex = index+1;
            if ( lIndex < 0 )lIndex = length-1;
            if ( rIndex >= length )rIndex = 0;
            $picLi.removeClass("left mid right");
            $picLi.eq(lIndex).addClass("left");
            $picLi.eq(index).addClass("mid");
            $picLi.eq(rIndex).addClass("right");
        }
    })();

    // 滚轮延迟显示
    (function () {
        var $newinfo = $('#newinfo'),
            $infolistLi = $newinfo.find(".infoList ul li"),
            $infolistTitle = $newinfo.find(".title"),
            objArr = [];
        
        //初始化样式
        init($infolistLi,$infolistTitle);
        
        $(window).scroll(function () {
            var height = $(document).scrollTop() + $(window).height();
            for(var i=objArr.length-1; i>=0; i--){
                var obj = objArr[i];
                if (height >= obj.oddTop){
                    (function () {
                        var $This = $(obj);
                        setTimeout(function () {
                            $This.removeClass("hide");
                        },($This.index()%3)*200);
                        objArr.slice(i,1);
                    })();
                }
            }
        });

        function init() {
            for(var i=0,lenhth=arguments.length; i<lenhth; i++){
                arguments[i].each(function () {
                    this.oddTop = $(this).offset().top;
                    objArr.push(this);
                });
            }
        }
    })();


})();