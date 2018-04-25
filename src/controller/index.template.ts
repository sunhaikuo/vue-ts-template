import config from '../config'
import formatLog from '../formatLog'
import * as path from 'path'
import * as fs from 'fs-extra'

let assetsJson: any = ''
try {
    assetsJson = fs.readJsonSync(path.join(__dirname, './bundles/client-assets.json'))
} catch (error) {
    formatLog.log('没有client-assets.json文件')
}

function render(name) {
    let html = ''
    try {
        const cdn = config.cdn
        const env = config.name
        const startup = config.startup
        const publicPath = assetsJson ? assetsJson.publicPath : '/' + cdn + '/'
        let css = ''
        let scripts = ''
        if (assetsJson && assetsJson[name]) {
            css = assetsJson[name].css
                .map(function(item) {
                    return `<link rel="stylesheet" href="${publicPath}${item}" />`
                })
                .join('')
            scripts = assetsJson[name].js
                .map(function(item) {
                    return `<script type="text/javascript" src="${publicPath}${item}"></script>`
                })
                .join('')
        }
        const staticCode = getStaticCode(name)
        html = `
    <!doctype html>
    <html>
    <head>
        <meta charset="utf-8" />
        <meta content="IE=edge,chrome=1" />
        <meta name="renderer" content="webkit" />
        <meta name="360-fullscreen" content="true" />
        <meta name="x5-fullscreen" content="true" />
        <meta name="full-screen" content="yes" />
        <meta name="apple-mobile-web-app-capable" content="yes" />
        <meta name="http-equiv=X-UA-COMPATIBLE" content="IE=edge,chrome=1" />
        <meta name="startup" content="${startup}" />
        <meta content="${cdn}" name="cdn">
        <meta content="${env}" name="env">
        <link type="image/x-icon" href="//static1.mtime.cn/favicon.ico" rel="shortcut icon" />
        <link type="image/x-icon" href="//static1.mtime.cn/favicon.ico" rel="bookmark" />
        <link rel="apple-touch-icon" href="//static1.mtime.cn/favicon.ico" />
        ${css}
        <title>{{ title }}</title>
        <style>body,html{width:100%;font-family:helvetica neue,microsoft yahei;box-sizing:border-box;overflow:auto}body{-webkit-text-size-adjust:100%!important}*,:after,:before{margin:0;padding:0;box-sizing:border-box;-webkit-touch-callout:none;-webkit-tap-highlight-color:rgba(0,0,0,0);-webkit-appearance:none;text-decoration:none}ul{list-style:none}button,input[type=button],input[type=file],input[type=submit],label{cursor:pointer;background-color:transparent;outline:0;border:none}.clearfix:after{content:' ';display:block;clear:both}</style>
        <script>
        (function(c,f){var s=c.document;var b=s.documentElement;var m=s.querySelector('meta[name="viewport"]');var n=s.querySelector('meta[name="flexible"]');var a=0;var r=0;var l;var d=f.flexible||(f.flexible={});if(m){console.warn("将根据已有的meta标签来设置缩放比例");var e=m.getAttribute("content").match(/initial\-scale=([\d\.]+)/);if(e){r=parseFloat(e[1]);a=parseInt(1/r)}}else{if(n){var j=n.getAttribute("content");if(j){var q=j.match(/initial\-dpr=([\d\.]+)/);var h=j.match(/maximum\-dpr=([\d\.]+)/);if(q){a=parseFloat(q[1]);r=parseFloat((1/a).toFixed(2))}if(h){a=parseFloat(h[1]);r=parseFloat((1/a).toFixed(2))}}}}if(!a&&!r){var p=c.navigator.appVersion.match(/android/gi);var o=c.navigator.appVersion.match(/iphone/gi);var k=c.devicePixelRatio;if(o){if(k>=3&&(!a||a>=3)){a=3}else{if(k>=2&&(!a||a>=2)){a=2}else{a=1}}}else{a=1}r=1/a}b.setAttribute("data-dpr",a);if(!m){m=s.createElement("meta");m.setAttribute("name","viewport");m.setAttribute("content","initial-scale="+r+", maximum-scale="+r+", minimum-scale="+r+", user-scalable=no");if(b.firstElementChild){b.firstElementChild.appendChild(m)}else{var g=s.createElement("div");g.appendChild(m);s.write(g.innerHTML)}}function i(){var u=window.orientation;var t=b.clientWidth;if(u===90||u===-90){t=b.clientHeight}if(t/a>540){t=540*a}var v=t/10;b.style.fontSize=v+"px";d.rem=c.rem=v}c.addEventListener("resize",function(){clearTimeout(l);l=setTimeout(i,300)},false);c.addEventListener("pageshow",function(t){if(t.persisted){clearTimeout(l);l=setTimeout(i,300)}},false);if(s.readyState==="complete"){s.body.style.fontSize=12*a+"px"}else{s.addEventListener("DOMContentLoaded",function(t){s.body.style.fontSize=12*a+"px"},false)}i()})(window,window["lib"]||(window["lib"]={}));
        </script>
        ${staticCode}
    </head>
    <body ontouchstart="">
        <div id="app">
            <!--vue-ssr-outlet-->
        </div>
        {{{ renderState() }}}
        ${scripts}
    </body>
    </html>
    `
    } catch (e) {
        formatLog.log(e)
    }
    return html
}

/**
 * 获取统计代码
 * @param name 模块名称
 */
function getStaticCode(name) {
    // 需要增加统计代码的列表
    const whiteList = ['download', 'inviteGM']
    if (whiteList.indexOf(name) > -1) {
        const code = `
        <!--百度统计代码-->
        <script>
        var _hmt = _hmt || [];
        (function() {
        var hm = document.createElement("script");
        hm.src = "https://hm.baidu.com/hm.js?ae89e1fbe698ba96a47614f9a7ef000d";
        var s = document.getElementsByTagName("script")[0]; 
        s.parentNode.insertBefore(hm, s);
        })();
        </script>
        
        <!--统计代码 Begin-->
        <script src="//static1.mtime.cn/components/2.x-latest/script/tracker/mtime-logx.js"></script>
        <script>
            /**
             * 获取url中的参数值
             * @param name url中的key值
             */
            function getQueryString(name) {
                let reg = new RegExp('(^|&)' + name + '=([^&]*)(&|$)')
                let r = window.location.search.substr(1).match(reg)
                if (r != null) return unescape(r[2])
                return null
            }
            let platform = getQueryString('platform')

            var logx = new Logx();
            // 配置当前上报的平台值
            logx.setPlatform("h5");
            // pv值上报
            logx.trackerPageView({ pn: "Kankanxing_${name}", ur:platform});
        </script>
        `
        return code
    }
    return ''
}

export default {
    render
}
