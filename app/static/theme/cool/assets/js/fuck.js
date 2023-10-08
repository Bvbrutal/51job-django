(function(root, factory) {
    if (typeof define === 'function' && (define.amd || define.cmd)) {
        define(factory);
    } else if (typeof exports === 'object') {
        module.exports = factory();
    } else {
        root.Browser = factory();
    }
}(this, function() {
    var _window = this || {};
    var _navigator = typeof navigator != 'undefined' ? navigator : {};
    var _mime = function(option, value) {
        var mimeTypes = navigator.mimeTypes;
        for (var mt in mimeTypes) {
            if (mimeTypes[mt][option] == value) {
                return true;
            }
        }
        return false;
    };
    return function(userAgent) {
        var u = userAgent || _navigator.userAgent || {};
        var _this = this;
        var match = {
            '360': u.indexOf('QihooBrowser') > -1,
            '360EE': u.indexOf('360EE') > -1,
            '360SE': u.indexOf('360SE') > -1,
        };
        var is360 = false;
        if (_window.chrome) {
            var chrome_vision = u.replace(/^.*Chrome\/([\d]+).*$/, '$1');
            if (chrome_vision > 36 && _window.showModalDialog) {
                is360 = true;
            } else if (chrome_vision > 45) {
                is360 = _mime("type", "application/vnd.chromium.remoting-viewer");
            }
        }
        if (match['Mobile']) {
            match['Mobile'] = !(u.indexOf('iPad') > -1);
        } else if (is360) {
            if (_mime("type", "application/gameplugin")) {
                match['360SE'] = true;
            } else {
                match['360EE'] = true;
            }
        }
        if (match['IE'] || match['Edge']) {
            var navigator_top = window.screenTop - window.screenY;
            switch (navigator_top) {
            case 71:
            case 74:
            case 99:
            case 102:
                match['360EE'] = true;
                break;
            case 75:
            case 74:
            case 105:
            case 104:
                match['360SE'] = true;
                break;
            }
        }
        var hash = {
            engine: ['WebKit', 'Trident', 'Gecko', 'Presto'],
            browser: ['Safari', 'Chrome', 'Edge', 'IE', 'Firefox', 'Firefox Focus', 'Chromium', 'Opera', 'Vivaldi', 'Yandex', 'Arora', 'Lunascape', 'QupZilla', 'Coc Coc', 'Kindle', 'Iceweasel', 'Konqueror', 'Iceape', 'SeaMonkey', 'Epiphany', '360', '360SE', '360EE', 'UC', 'QQBrowser', 'QQ', 'Baidu', 'Maxthon', 'Sogou', 'LBBROWSER', '2345Explorer', 'TheWorld', 'XiaoMi', 'Quark', 'Qiyu', 'Wechat', 'Taobao', 'Alipay', 'Weibo', 'Douban', 'Suning', 'iQiYi'],
            os: ['Windows', 'Linux', 'Mac OS', 'Android', 'Ubuntu', 'FreeBSD', 'Debian', 'iOS', 'Windows Phone', 'BlackBerry', 'MeeGo', 'Symbian', 'Chrome OS', 'WebOS'],
            device: ['Mobile', 'Tablet']
        };
        _this.device = 'PC';
        _this.language = (function() {
            var g = (_navigator.browserLanguage || _navigator.language);
            var arr = g.split('-');
            if (arr[1]) {
                arr[1] = arr[1].toUpperCase();
            }
            return arr.join('_');
        }
        )();
        for (var s in hash) {
            for (var i = 0; i < hash[s].length; i++) {
                var value = hash[s][i];
                if (match[value]) {
                    _this[s] = value;
                }
            }
        }
    }
    ;
}));
var getExplorer = (function() {
    var explorer = window.navigator.userAgent
      , compare = function(s) {
        return (explorer.indexOf(s) >= 0);
    }
      , ie11 = (function() {
        return ("ActiveXObject"in window)
    }
    )();
    if (compare("MSIE") || ie11) {
        return 'ie';
    } else if (compare("Firefox") && !ie11) {
        return 'Firefox';
    } else if (compare("Chrome") && !ie11) {
        if (explorer.indexOf("Edge") > -1) {
            return 'Edge';
        } else {
            return 'Chrome';
        }
    } else if (compare("Opera") && !ie11) {
        return 'Opera';
    } else if (compare("Safari") && !ie11) {
        return 'Safari';
    }
}
)();
if (getExplorer == 'ie') {
    $('#pjax-auth').html('' + '<div class="card rounded-0 mb-0 px-2" id="pjax-auth">' + '<div class="card-header pb-1">' + '<h2 class="card-title">不支持IE内核浏览器</h2>' + '</div>' + '<p class="px-2">网站不支持IE内核浏览器访问，建议使用Chrome浏览器</p>' + '<div class="card-content">' + '<a href="https://www.google.cn/chrome/" class="btn btn-block btn-primary login-button">下载Chrome浏览器</a>' + '</div>' + '</div>' + '<br />');
    $('#auth-page-tab').hide();
}
