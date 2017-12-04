//导航影藏
(function () {
    var $header = $("#header"),
        $nav = $header.find(".nav"),
        $navLi = $nav.find(".mNav"),
        $haveHide = $nav.find(".mainList .haveHide"),
        $ulHide = $nav.find(".ulHide"),
        $logo = $nav.find(".logo"),
        $logo2 = $header.find(".logo2"),
        $allHide = $ulHide.find(".hide");

    //阴阳师logo显示影藏
    $logo2.delay(1000).queue(function () {
        $(this).css({
            left : 60,
            opacity : 1
        });
    });

    //头部滚动显示效果
    $(window).scroll(navScroll());
    function navScroll() {
       if ($(document).scrollTop()){
           $nav.addClass("scroll");
           $logo.stop().fadeIn();
           $logo2.addClass("scale");
       }else{
           $nav.removeClass("scroll");
           $logo.stop().fadeOut();
           $logo2.removeClass("scale");
       }
       return navScroll;
    }

    //下拉菜单显示
    $navLi.hover(function () {
        $(this).addClass("hover");
    },function () {
        $(this).removeClass("hover");
    });
    $haveHide.hover(function () {
        $ulHide.stop().slideDown();
        $allHide.eq($(this).index(".mainList .haveHide")).stop().fadeIn();
        $nav.addClass("whiteBj");
    },function () {
        $ulHide.stop().slideUp();
        $allHide.eq($(this).index(".mainList .haveHide")).stop().fadeOut();
        $nav.removeClass("whiteBj");
    });

    $allHide.hover(function () {
        $ulHide.stop().slideDown();
        $haveHide.eq($(this).index()).addClass("hover");
        $allHide.eq($(this).index()).stop().fadeIn();
        $nav.addClass("whiteBj");
    },function () {
        $ulHide.stop().slideUp();
        $haveHide.eq($(this).index()).removeClass("hover");
        $allHide.eq($(this).index()).stop().fadeOut();
        $nav.removeClass("whiteBj");
    });

})();

//导航banner人物效果
(function () {
    var $role = $("#role"),
        $rol1 = $role.find(".rol1 .role"),
        $rol2 = $role.find(".rol2 .role"),
        $btn = $role.find(".btn"),
        $server = $role.find(".server"),
        $serverList = $("#serverList"),
        $main = $serverList.find(".main"),
        $serverClose = $serverList.find(".close"),
        whichShow = false;

    $rol1.removeClass("hide");
    $btn.click(function () {
        whichShow?change($rol2 , $rol1):change($rol1 , $rol2);
        whichShow = !whichShow;
    });

    function change($1,$2){
        $1.stop();
        $2.stop();
        $1.addClass("hide").delay(900).queue(function () {
            $2.removeClass("hide");
        });
    }

    // 弹出服务器列表
    $server.click(function () {
        $serverList.fadeIn();
        $main.addClass("show");
        $(document.body).addClass("noScroll");
    });

    $serverClose.click(function () {
        $serverList.fadeOut();
        $main.removeClass("show");
        $(document.body).removeClass("noScroll");
    })

})();

//游戏日历
(function () {
    var $slide = $("#slide"),
        $download = $slide.find(".download"),
        $shrink = $download.find(".shrink"),
        $close = $download.find(".close"),
        $downloadMain = $download.find(".downloadMain"),
        $mainLi = $slide.find(".main .mainLi");

    $shrink.click(function () {
        $download.addClass("stretch");
        $(this).hide();
        $downloadMain.show();
    });
    $close.click(function () {
        $download.removeClass("stretch");
        $(this).stop().delay(200).queue(function () {
            $downloadMain.hide();
            $shrink.show();
        })
    });
    $mainLi.hover(function () {
        $(this).stop().addClass("pos");
    },function () {
        $(this).stop().delay(150).queue(function () {
            $(this).stop().removeClass("pos");
        });
    });

})();

//banner轮播+new新闻
//面向对象
(function(){
    function Banr($ul , $pic , $tab) {
        this.$ul = $ul;
        this.$tab = $tab;
        this.index = 0;
        this.length = $pic.length;
        this.width = $pic.width();
        this.timeOut = null;
    }

    Banr.prototype = {
        exe : function () {
            this.addEvent();
        },
        addEvent : function () {
            var This = this;
            this.$tab.mouseenter(function () {
                clearTimeout(This.timeOut);
               var $this = $(this);
               This.timeOut = setTimeout(function () {
                   This.index = This.$tab.index($this);
                   $this.addClass("on").siblings().removeClass("on");
                   This.$ul.stop().animate({
                       left : -This.width*This.index
                   },300);
               },200);
            });
        }
    };

    // 继承
    function Banr2($ul , $pic , $tab , $wrap) {
        Banr.call(this , $ul , $pic , $tab);
        this.$wrap = $wrap;
        this.timer = null;
    }

    function Fn(){};
    Fn.prototype = Banr.prototype;
    Banr2.prototype = new Fn();
    Banr2.prototype.temp = Banr2.prototype.exe;
    Banr2.prototype.exe = function () {
        this.temp();
        this.auto();
        this.clearTime();
    };

    Banr2.prototype.clearTime = function () {
        var This = this;
        this.$wrap.hover(function () {
            clearInterval(This.timer);
        },function () {
            This.auto();
        });
    };

    Banr2.prototype.auto = function () {
        var This = this;
        this.timer = setInterval(function () {
            This.index ++;
            This.index %= This.length;
            This.$tab.eq(This.index).addClass("on").siblings().removeClass("on");
            This.$ul.stop().animate({
                left : -This.width*This.index
            },300)
        },3000);
    };
    window.Banr = Banr;
    window.Banr2 = Banr2;
})();

// 面向对象-banner
(function(){
    var $banner = $(".news").find(".banner"),
        $picUl = $banner.find(".pic ul"),
        $picLi = $picUl.children(),
        $tabLi = $banner.find(".tab ul li"),
        banner = new Banr2($picUl , $picLi , $tabLi , $banner);
    banner.exe();
})();

//面向对象-inform
(function(){
    var $news = $("#content .news"),
        $tabLi = $news.find(".inform .tab ul li"),
        $wrapUl = $news.find(".inform .show .wrapUl"),
        $wrapLi = $wrapUl.find(".wrapLi");

    $tabLi.mouseenter(function () {
        $(this).addClass("on").siblings().removeClass("on");
    });

    $wrapLi.each(function (i) {
        var $ul = $("<ul class='list'></ul>"),
            num = 0;
        for(var j=0,length = data.length; j<length; j++){
            if(!i || data[j].typeX === (i-1)){
                $ul.append("<li><p><a href='javascript:;'>"+data[j].title+"</a></p><span>"+data[j].time+"</span></li>");
                num++;
                if(num === 5)break;
            }
        }
        $(this).append($ul);
    });

    var banner = new Banr($wrapUl,$wrapLi,$tabLi);
    banner.exe();

})();

//式神列表生成
(function(){
    var $shishenList = $("#character").find(".shishenList"),
        $mainListUl = $shishenList.find(".mainList .mUl ul");

    // 生成所有式神图标
    var count = [
        [0,null],
        [0,null],
        [0,null],
        [0,null],
        [0,null]
    ];

    for(var i=0,length=shishenData.length; i<length; i++){
        var index = 0;
        switch (shishenData[i].level){
            case "SSR":
                index = 1;
                break;
            case "SR":
                index = 2;
                break;
            case "R":
                index = 3;
                break;
            case "N":
                index = 4;
                break;
        }
        count[0][0]++;
        count[index][0]++;
        if(count[0][0]%2){
            count[0][1] = $("<li class='ssList'></li>");
            $mainListUl.eq(0).append(count[0][1]);
        }

        if(count[index][0]%2){
            count[index][1] = $("<li class='ssList'></li>");
            $mainListUl.eq(index).append(count[index][1]);
        }

        var  str = shishenData[i].isNew?"<i class='new'></i>":"";

        var $div = $("<div class='shishen'>"+"<img src='images/index/content/shishen/"+shishenData[i].id+".png'>"+"<p class='cover'><span>"+shishenData[i].name+"</span></p>"+str+"</div>");

        var $clone = $div.clone();
        count[0][1].append($div);
        count[index][1].append($clone);
    }

})();

//式神列表点击切换
(function(){
    var $character = $("#character"),
        $mUl = $character.find(".shishenList .mainList .mUl"),
        $shishenListTab = $character.find(".shishenTab .clickBtn"),
        width = $mUl.width();

    $shishenListTab.click(function () {
        var i = $(this).index();
        $(this).addClass("on").siblings(".clickBtn").removeClass("on");
        $mUl.eq(i).show().siblings().hide().each(function () {
            var $btn = $(this).children(".btn");
            this.index = 0;
            this.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
            this.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();
            $(this).children("ul").css("marginLeft",0);
        });
    });

    $mUl.each(function () {
        var $ul = $(this).children("ul"),
            $li = $ul.children("li"),
            $btn = $(this).children(".btn"),
            length = Math.ceil($li.length/6);

        this.index = 0;

        this.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
        this.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();
        $btn.click(function () {
            var i = $(this).index(),
                parent = this.parentNode;
            if(i === 2){
                parent.index++;
                parent.index %= length;
            }else {
                parent.index--;
                if(parent.index<0)parent.index = 0;
            }
            parent.index !== length-1?$btn.eq(1).show():$btn.eq(1).hide();
            parent.index !== 0?$btn.eq(0).show():$btn.eq(0).hide();

            $ul.stop().animate({
                marginLeft : -width*parent.index
            },300);
        })
    });

})();

//式神和主角切换
(function () {
    var $character = $("#character"),
        $zhujueList = $character.find(".zhujueList"),
        $tabLi = $zhujueList.find(".tab>ul>li"),
        $picLi = $zhujueList.find(".pic>ul>li"),
        $titleTab = $character.find(".sMain .title .tab"),
        $titlePic = $character.find(".sMain .showMain>.mList>.mLi"),
        index = 0;

    $titleTab.click(function () {
        var i = $(this).index("#character .sMain .title .tab");
        $(this).addClass("active").siblings(".tab").removeClass("active");
        $titlePic.eq(i).stop().fadeIn().siblings().stop().fadeOut();
    });

    $tabLi.click(function () {
        index = $(this).index();
        $(this).addClass("active").siblings().removeClass("active");
        $picLi.eq(index).stop().fadeIn().siblings().stop().fadeOut();
    });
})();

//startegy
(function () {

    var $strategy = $("#strategy"),
        $banner = $strategy.find(".leftPart .banner"),
        $picUl = $banner.find(".pic ul"),
        $picLi = $banner.find(".pic ul li"),
        $tabLi = $banner.find(".tab ul li"),
        $right = $strategy.find(".rightPart"),
        $titleTab = $right.find(".title .tab"),
        $ul = $right.find(".mContent ul");
    //左侧banner
    var b1 = new Banr2($picUl , $picLi , $tabLi , $banner);
    b1.exe();

    //右侧选项卡内容生产
    var typeArr = ["新手" , "式神" , "斗技" , "玩法" , "高阶" , "御魂"];
    $ul.each(function (i) {
        var num = 0;
        for (var j = 0,length = strateData.length; j < length; j++) {
            var data = strateData[j],
                reg = new RegExp(i-1);
            if ( !i || reg.test(data.type) ){
                var index = !i?data.type.charAt(data.type.length-1):i-1;
                $(this).append('<li>' +
                    '<a href="">' +
                    '<i></i> ' +
                    '<p class="mTitle">【<span class="type">'+typeArr[index]+'</span>】&nbsp;'+data.title+'</p> ' +
                    '<p class="author">作者：<span>'+data.author+'</span></p>' +
                    '</a>' +
                    '</li>');
            }
        }
    });

    //右侧选项卡切换
    var b2 = new Banr($right.find('.mContent .show'), $ul , $titleTab);
    b2.exe();

})();

//fan
(function(){
    var $fan = $("#fan"),
        $show = $fan.find(".mFan .show"),
        $tab = $fan.find(".tab .tabNav ul li"),
        length = 6;

    for(var i = 0; i < length; i++){
        var  $ul = $("<ul></ul>");
        for(var j = i*8; j < (i+1)*8; j++){
            $ul.append('<li>\
                <div class="pic">\
                <img src="'+fanData[j].url+'" alt="">\
                <span><b></b></span>\
                </div>\
                <p class="sTitle">'+fanData[j].title+'</p>\
            </li>');
        }
        $show.append($ul);
    }

    var b1 = new Banr($show , $show.children("ul") , $tab);
    b1.exe();

})();

//返回顶部
(function(){
    var goTop = $("#contact").find(".goTop");

    goTop.click(function () {
        $("html,body").animate({
            scrollTop :　0
        },500);
    });
})();



























