/**
 * 选项卡
 */
function tabClass() {
    this.opts = {
        tabNav: null,
        tabCon: null,
        handle: 'click',
        curClass: 'on',
        callback: null
    };
    this.opts = $.extend({}, this.opts, arguments[0] || {});
    var me = this;
    var _st;

    var $tabCon = $(me.opts.tabCon).hide();
    var $tabNav = $(me.opts.tabNav).on(me.opts.handle, function (e) {
        e.preventDefault();
        var _this = this;
        if (me.opts.handle == 'mouseenter') {
            clearTimeout(_st);
            _st = setTimeout(function () {
                changeStatus(_this);
            }, 500);
        } else {
            changeStatus(_this)
        }
    });

    if (me.opts.handle == 'mouseenter') {
        $tabNav.on("mouseleave", function () {
            clearTimeout(_st);
        })
    }

    function changeStatus(_this) {
        var _index = $tabNav.index(_this);
        var _nav = $(_this),
            _con = $tabCon.eq(_index);
        $tabNav.removeClass(me.opts.curClass);
        _nav.addClass(me.opts.curClass);
        $tabCon.hide();
        _con.show();
        me.opts.callback && me.opts.callback.call(me, _index, _nav, _con);
    };
    var onIndex = $tabNav.index($tabNav.filter(".on"));
    if (onIndex > 0) {
        $tabNav.eq(onIndex).trigger(me.opts.handle);
    } else {
        $tabNav.eq(0).trigger(me.opts.handle);
    }
}

/**
 * 操作 Cookie
 * @param name
 * @param value
 */
function setCookies(name, value) {
    var Days = 30; //此 cookie 将被保存 30 天
    var expdate = new Date();
    expdate.setTime(expdate.getTime() + Days * 24 * 60 * 60 * 1000);
    document.cookie = name + "=" + escape(value) + ";expires=" + expdate.toGMTString();
}

function getCookies(name) {
    var arr = document.cookie.match(new RegExp("(^| )" + name + "=([^;]*)(;|$)"));
    if (arr != null) return unescape(arr[2]);
    return null;
}

/**
 * 轮播
 */
function getRotation(_name, _list, _pageSize) {
    var _pageSize = _pageSize || 1;
    var _length = _list.length;
    var _rotation = getCookies('Rotation') || '';
    var _obj = {};
    var _arr1 = _rotation.split("|");
    for (var i = 0, l = _arr1.length; i < l; i++) {
        var _arr2 = _arr1[i].split(":");
        _arr2[0] && (_obj[_arr2[0]] = _arr2[1]);
    }
    var page = _obj[_name];
    if (!page) {
        page = Math.floor(Math.random() * _length / _pageSize);
    }
    if (page >= Math.ceil(_length / _pageSize) - 1) {
        page = 0;
    } else {
        page++;
    }
    _obj[_name] = page;
    var _arr3 = [];
    for (var i in _obj) {
        _arr3.push(i + ':' + _obj[i]);
    }
    setCookies('Rotation', _arr3.join('|'));
    return _list.slice(_pageSize * page, _pageSize * (page + 1));
}

/**
 * 
 */
function setTextPos(obj, spos) {
    var tobj = $(obj).get(0);
    if (spos < 0)
        spos = tobj.value.length;
    if (tobj.setSelectionRange) { //兼容火狐,谷歌
        setTimeout(function () {
            tobj.setSelectionRange(spos, spos);
        }, 0);
    } else if (tobj.createTextRange) { //兼容IE
        var rng = tobj.createTextRange();
        rng.move('character', spos);
        rng.select();
    }
}

/**
 * 左上角广告
 */
(function () {
    var render = template.compile('<a href="{{data[0]}}" target="_blank"><img src="{{data[2]}}" /></a>');
    $("#leftgg").html(render({
        data: getRotation('leftAd', leftAds)[0]
    }));
})();

/**
 * 轮播
 *
 <div class="slide-wrap">
 <ul class="list">
 <li class="li">
 <a href="http://tg.602.com/lycq/71/index.html?uid=52dh&amp;suid=lycq" target="_blank"><img src="//dh.pee.cn/upload/daohang/img/20161205181257_81e46.png"></a>
 </li>
 <li class="li">
 <a href="http://tg.602.com/lycq/71/index.html?uid=52dh&amp;suid=lycq" target="_blank"><img src="//dh.pee.cn/upload/daohang/img/20161205181257_81e46.png"></a>
 </li>
 <li class="li">
 <a href="http://tg.602.com/lycq/71/index.html?uid=52dh&amp;suid=lycq" target="_blank"><img src="//dh.pee.cn/upload/daohang/img/20161205181257_81e46.png"></a>
 </li>
 </ul>
 </div>
 */
// $(function () {
// 	$(".slide-wrap").each(function () {
// 		var _page = 0;
// 		var $this = $(this);
// 		var _width = $this.width();
// 		var $slideUL = $(".list", this);
// 		var $li = $(".li", this);
// 		$slideUL.width(_width * $li.length);
// 		var _timer;
//
// 		function autoSlide() {
// 			$slideUL.animate({
// 				left: -_width * _page
// 			});
// 			if (_page >= $li.length - 1) {
// 				_page = 0;
// 			} else {
// 				_page++
// 			}
// 			_timer = setTimeout(autoSlide, 3000);
// 		};
// 		autoSlide();
//
// 		$this.on("mouseenter", function () {
// 			clearTimeout(_timer);
// 		});
// 		$this.on("mouseleave", autoSlide)
// 	});
// });

/**
 * 获取 URL 参数
 */
function getRequest() {
    var url = window.location.search;
    var theRequest = {};
    if (url.indexOf("?") !== -1) {
        var str = url.substr(1);
        var strs = str.split("&");
        for (var i = 0; i < strs.length; i++) {
            theRequest[strs[i].split("=")[0]] = unescape(strs[i].split("=")[1]);
        }
    }
    return theRequest;
}

/**
 * 获取数据
 */
function getData(_url, _param, _cb) {
    $.ajax({
        type: "get",
        url: _url,
        dataType: "jsonp",
        jsonpCallback: "cb_" + _param.type,
        data: _param,
        cache: true,
        success: _cb
    })
}

/**
 *
 * @param id
 * @param callBack
 */
function lazyLoad(id, callBack) {

    var getClient = function () {
        var t, h;
        t = document.documentElement.scrollTop || document.body.scrollTop;
        h = document.documentElement.clientHeight;
        return {
            top: t,
            height: h
        };
    };
    var getSubClient = function (p) {
        var t = 0,
            h;
        var $p = $(p).parents();
        for (var i = 0, l = $p.length; i < l; i++) {
            if ($p.eq(i).css("position") == 'fixed') {
                t = document.documentElement.scrollTop || document.body.scrollTop;
                break;
            }
        }
        h = p.offsetHeight;
        if (h > 0) {
            while (p.offsetParent) {
                t += p.offsetTop;
                p = p.offsetParent;
            }
        }
        return {
            top: t,
            height: h
        };
    };
    var cross = function (rec1, rec2) {
        var tc1, tc2, h1;
        tc1 = rec1.top + rec1.height / 2;
        tc2 = rec2.top + rec2.height / 2;
        h1 = (rec1.height + rec2.height) / 2;
        return Math.abs(tc1 - tc2) < h1;
    };

    $(id).each(function () {
        var div1 = this;
        var _st = setInterval(scroll, 400);

        function scroll() {
            var prec1 = getClient();
            var prec2 = getSubClient(div1);
            if (cross(prec1, prec2)) {
                // $(window).off('scroll', scroll);
                clearInterval(_st);
                if (callBack) {
                    callBack();
                }
            }
        };
        // $(window).on('scroll', scroll);
        // scroll();
    })
}


/**
 * 统计搜索
 */
function tjSearch(_text) {
    var _params = getRequest();
    var _val = _text || $.trim($("#J_search_input").val());
    if (_val) {
        $.ajax({
            type: "get",
            url: '//dh.pee.cn/data/SearchTotal.html',
            dataType: "jsonp",
            data: {
                word: _val,
                type: _params.type == 'baidu' ? 2 : 1
            }
        })
    }
}

/**
 * 自定义匹配
 */
function inSearchMatch(_text) {
    var _one = null;
    for (var i = 0, l = searchMatch.length; i < l; i++) {
        if (_text == searchMatch[i].word) {
            _one = searchMatch[i];
        }
    }
    return _one;
}

//初始化
(function () {
    //搜索提交
    $(".search-box .submit").on("click", function () {
        tjSearch();
    });
    //Tab切换
    new tabClass({
        tabNav: '.newsNav a',
        // tabCon: '.newsCon',
        handle: 'mouseenter',
        callback: function (_index, _$nav) {
            var _type = _$nav.data("type");
            $.ajax({
                type: "get",
                url: "//dh.pee.cn/data/eastday.html",
                dataType: "jsonp",
                jsonpCallback: "cb_side_" + _type,
                data: {
                    type: _type,
                    branch: 'side'
                },
                cache: true,
                success: function (_json) {
                    if (_json.error == 0) {
                        $(".newsCon").html(template('newsListTpl', _json));
                    }
                },
                error: function (a) {}
            });
        }
    });
    new tabClass({
        tabNav: '.cateNav a',
        tabCon: '.cateCon',
        handle: 'mouseenter'
    });
    new tabClass({
        tabNav: '.shopNav li',
        tabCon: '.shopCon',
        handle: 'mouseenter',
        callback: function (_index, _$nav) {
            var c_id = _$nav.data("id") || 0;
            $.ajax({
                type: "get",
                url: '//dh.pee.cn/dataoke/loadTaobao.html',
                dataType: "jsonp",
                jsonpCallback: "cb_shop_" + c_id,
                data: {
                    type: 1,
                    c_id: c_id,
                    number: 6,
                    from: 'index'
                },
                cache: true,
                success: function (_json) {
                    if (_json.error == 0) {
                        $("#shopList2").html(template('shopTpl2', _json.data))
                    }
                }
            })
        }
    });

    //看视频 视频切换
    // var $li = $("#videoList li");
    // $li.on("mouseenter", function () {
    // 	$li.removeClass("on");
    // 	$(this).addClass("on");
    // });

    for (var i = 0, l = loadInitList.length; i < l; i++) {
        $.ajax({
            type: "get",
            url: loadInitList[i],
            dataType: "jsonp",
            jsonpCallback: "cb_init_" + i,
            cache: true
        })
    }
})();
//滚动
$(function () {
    var $document = $(document);
    var $headerRelative = $('.header-relative');
    var $searchTxt = $(".search-txt");
    var $searchTxt2 = $(".search-txt2");
    var $scrollRelative = $('.scroll-relative');
    var _scrollTop = $scrollRelative.offset().top;
    var $toTop = $("#toTop");
    var $toBottom = $("#toBottom");
    var $body = (window.opera) ? (document.compatMode == "CSS1Compat" ? $('html') : $('body')) : $('html,body');

    $toTop.on("click", function () {
        $body.stop().animate({
            scrollTop: 0
        }, 500);
    });
    $toBottom.on("click", function () {
        $body.stop().animate({
            scrollTop: $body.height()
        }, 500);
    });

    function scroll() {
        var scrollTop = $document.scrollTop();
        if (scrollTop > 60) {
            $headerRelative.addClass("header-fixed");
            $searchTxt.hide();
            $searchTxt2.show();
            $toTop.show();
            $toBottom.hide();
        } else {
            $headerRelative.removeClass("header-fixed");
            $searchTxt2.hide();
            $searchTxt.show();
            $toTop.hide();
            $toBottom.show();
        }

        if (scrollTop > _scrollTop - 155) {
            $scrollRelative.addClass("scroll-fixed");

        } else {
            $scrollRelative.removeClass("scroll-fixed");
        }
    };
    $(window).on("scroll", scroll);
    scroll();
});
//搜索
(function () {
    //下拉
    var $searchSuggest = $("#search-suggest1");
    $(".search-box .hot-num").on("click", function () {
        $(this).addClass("hot-num-on");
        if ($searchSuggest.hasClass("search-suggest-on")) {
            $searchSuggest.removeClass("search-suggest-on");
        } else {
            $searchSuggest.addClass("search-suggest-on");
        }
        $("#search-suggest2").removeClass("search-suggest-on");
        $("#searchAD").html(template('searchADTpl', searchList[Math.floor(Math.random() * searchList.length)]));
        return false;
    });
    $(document).on("click", function () {
        $searchSuggest.removeClass("search-suggest-on");
    });
    //
    var $li = $(".search-wrap .tab li")
        .on("click", function () {
            // $li.removeClass("on");
            // $(this).addClass("on");
            $li.removeClass("hover");
        })
        .on("mouseenter", function () {
            $(this).addClass("hover");
        })
        .on("mouseleave", function () {
            $li.removeClass("hover");
        })
})();
//加载更多
(function () {
    var _page = 1;
    var _type = "";
    var $loadMore = $(".load-more");
    var $newsList = $(".news-list");
    new tabClass({
        tabNav: '.newsNav2 a',
        tabCon: '.newsCon2',
        callback: function (_index, _$nav) {
            $newsList.html('');
            $loadMore.show();
            _page = 1;
            _type = _$nav.data("type");
            if (_page > 9) {
                loadList();
            }
        }
    });

    function loadList() {
        $.ajax({
            type: "get",
            url: "//dh.pee.cn/data/eastday.html",
            dataType: "jsonp",
            jsonpCallback: "cb_" + _type,
            data: {
                page: _page,
                type: _type
            },
            cache: true,
            success: function (_json) {
                if (_json.error == 0) {
                    $newsList.append(template('listTpl', _json));
                    if (_page < 10) {
                        _page++;
                        lazyLoad($loadMore, loadList);
                    } else {
                        $loadMore.hide();
                    }
                }
            },
            error: function (a) {}
        });
    }

    loadList();
})();
//搜索建议
var Util2 = {
    httpToHttps: function (a) {
        return a.replace(/http:/, "https:")
    },
    getQuery: function (a) {
        var e = new RegExp("(^|&)" + a + "=([^&]*)(&|$)"),
            t = window.location.search.substr(1).match(e);
        return null != t ? unescape(t[2]) : null
    }
};
window.console2 = window.console2 || function () {
    function a(a) {
        return $.ajax({
            type: "get",
            url: "https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd=" + a + "&json=1&cb=?",
            dataType: "jsonp",
            success: function (a) {
                a.s && e(a.s)
            },
            error: function (a) {}
        }), !1
    }

    function e(a) {
        var e = "",
            t = "";
        (['sgdaohang', 'sogou-1', 'sogou'].indexOf(n) > -1) ? t = "https://www.sogou.com/sogou?pid=sogou-netb-06358599b7afb250&ie=utf-8&query=": "baidu" == n && (t = "https://www.baidu.com/s?tn=" + CONFIG.baiduPID + "&ie=utf-8&word="),
            $.each(a, function (a, i) {
                e += '<li>';
                e += '<a data-text="' + i + '" href="' + t + encodeURIComponent(i) + '" target="_blank">' + i + "</a>";
                e += '</li>'
            });
        $("#search-suggest1").removeClass("search-suggest-on");
        $("#search-suggest2").addClass("search-suggest-on").find("ul").html(e);
        if (a.length < 1) {
            $("#search-suggest2").removeClass("search-suggest-on");
        } else {
            //搜索建议广告
            $("#searchSuggestAD").html(template('searchSuggestTpl', searchTxtList[Math.floor(searchTxtList.length * Math.random())]));
        }
    }

    function t() {
        $("#search-suggest1").removeClass("search-suggest-on");
        $("#search-suggest2").removeClass("search-suggest-on");
    }

    var isDefaultKeywords = true;
    var n = Util2.getQuery("type") || "baidu";
    var _searchKeywords = searchKeywords[0];
    $searchInput = $("#J_search_input")
        .on("keydown", function () {
            if (isDefaultKeywords) {
                isDefaultKeywords = false;
                $searchInput.val("");
                $searchInput.removeClass("search-on");
            }
        })
        .on("blur", function () {
            setTimeout(function () {
                $("#search-suggest2").removeClass("search-suggest-on");
            }, 500)
            if ($.trim($searchInput.val()) == '') {
                $searchInput.val(_searchKeywords.keywords);
                isDefaultKeywords = true;
                $searchInput.addClass("search-on");
            }
        })
        .on("click", function () {
            if (isDefaultKeywords) {
                isDefaultKeywords = false;
                $searchInput.val("").removeClass("search-on");
            }
        })
        // .trigger("focus");
    $searchInput.val(_searchKeywords.keywords).addClass("search-on");
    // setTextPos($searchInput, 0);

    setTimeout(function () {
        $searchInput.on("keyup", function () {
            var _val = $(this).val();
            _val ? a(_val) : t()
        })
    }, 200)

    $(".search-box .submit").on("click", function (e) {
        if (isDefaultKeywords) {
            e.preventDefault();
            window.open(getRotation('searchKeywords', _searchKeywords.links)[0]);
        } else {
            var _one = inSearchMatch($searchInput.val());
            if (_one) {
                e.preventDefault();
                window.open(_one.url);
            }
        }
    })

    //统计搜索
    $("#search-suggest2").on("click", 'a', function (e) {
        var $this = $(this);
        var _text = $this.data('text');
        var _one = inSearchMatch(_text);
        if (_one) {
            e.preventDefault();
            window.open(_one.url);
        }
        tjSearch(_text);
    })
}();

//回到顶部
(function () {
    var $floatList = $("#floatPanel").find(".float-list"),
        $floatLi = $floatList.find(".float-li");
    $floatLi.on("mouseenter", function (e) {
        if ($(this).find(".more-info .info-img").find("img").length) {
            $(this).addClass("on").siblings(".float-li").removeClass("on");
        }
    });
})();
//数据加载
(function () {
    //内涵图
    // getData('//dh.pee.cn/data/eastday.html', {type: 'celanbagua', number: 6}, function (_json) {
    // 	var _list = {};
    // 	_list.data1 = _json.data;
    // 	$("#nhtWrap").append(template('nhtTpl', _list));
    // 	// getData('//dh.pee.cn/data/eastday.html', {type: 'celandafawuliao', number: 8}, function (_json2) {
    // 	// 	_list.data2 = _json2.data;
    // 	// 	$("#nhtWrap").append(template('nhtTpl', _list));
    // 	// })
    // });
    //游戏直播
    getData('//dh.pee.cn/data/LiveGame.html', {
        type: 'livegame',
        number: 3
    }, function (_json) {
        _json.data.lol1.length = 3;
        _json.data.lol2.length = 6;
        $("#lolList1").html(template('lolTpl1', {
            data: _json.data.lol1
        }));
        $("#lolList2").html(template('lolTpl2', {
            data: _json.data.lol2
        }))
    });
    //美女直播
    getData('//dh.pee.cn/data/LiveGirlSide.html', {
        type: 'livegirl'
    }, function (_json) {
        //美女秀场
        $("#girlList1").html(template('girlTpl1', {
            data: getRotation('liveGirl2', _json.data.main, 10)
        }));
        //美女直播
        var $refreshBtn = $("#refreshBtn");
        $refreshBtn.on("click", function (e) {
            e.preventDefault();
            $("#girlList2").html(template('girlTpl2', {
                data: getRotation('liveGirl', _json.data.side, 6)
            }));
        }).trigger("click")
    });
    //商品数据
    var shopPage = 1;

    function getShopData() {
        getData('//dh.pee.cn/dataoke/loadTaobao.html', {
            type: 0,
            number: 4,
            from: 'index',
            page: shopPage
        }, function (_json) {
            $("#shopList1").html(template('shopTpl1', {
                data: _json.data.list
            }))
        })
    };
    $("#shopRefreshBtn").on("click", function () {
        shopPage++;
        getShopData();
    });
})();