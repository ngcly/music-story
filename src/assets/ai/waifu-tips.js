function add() {
    var text = document.getElementById("talk").value;

    if(text.length>0){
    $.ajax({
        url: "/chat",//接口地址
        type: "post",
        dataType: "json",
        data: {
            key: "03ad06ed6ea3409088755f3b60740227",//APIKey
            info: text//用户文本
        },
        success: function (data, status) {
            if (data.code == "100000") {//成功
                showMessage(data.text, 6000);
            }

            if (data.code == "40004") {
                showMessage("不好意思，当天聊天次数已用完！！", 6000);
            }
        },
        error:function(){
            showMessage("无法接收请求，网络出现问题", 6000);
        }
    });
    }
    else{showMessage("你貌似、忘记输入了吧", 6000);}
    document.getElementById("talk").value = '';
}

$('#talk').keydown(function(event) {

    if (event.keyCode == 13) {
        add();
    }
});
//************************************************************************

var a_idx = 0;
jQuery(document).ready(function($) {
    $("body").click(function(e) {
        var a = new Array("+1s", "+1s", "+1s", "+1s", "+1s", "+1s", "+1s" ,"+1s", "+1s", "+1s", "+1s", "+1s");
        var $i = $("<span/>").text(a[a_idx]);
        a_idx = (a_idx + 1) % a.length;
        var x = e.pageX,
            y = e.pageY;
        $i.css({
            "z-index": 99999999999999999999,
            "top": y - 20,
            "left": x,
            "position": "absolute",
            "font-weight": "bold",
            "color": "#ff6651"
        });
        $("body").append($i);
        $i.animate({
                "top": y - 180,
                "opacity": 0
            },
            1500,
            function() {
                $i.remove();
            });
    });
});




String.prototype.render = function (context) {
    var tokenReg = /(\\)?\{([^\{\}\\]+)(\\)?\}/g;

    return this.replace(tokenReg, function (word, slash1, token, slash2) {
        if (slash1 || slash2) {  
            return word.replace('\\', '');
        }

        var variables = token.replace(/\s/g, '').split('.');
        var currentObject = context;
        var i, length, variable;

        for (i = 0, length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null) return '';
        }
        return currentObject;
    });
};

var re = /x/;
re.toString = function() {
    showMessage('很好，你打开了控制台，代码被压缩打包过的，没法直接复制拿来用，可以去我github下载,顺便给我star一下是最吼的，给我follow那更是exciting', 5000, true);
    return '';
};

$(document).on('copy', function (){
    showMessage('我看见你复制了,恩恩，熟练使用ctrl+c是程序员必备技能', 5000, true);
});

$('.waifu-tool .fui-home').click(function (){
    //window.location = 'https://www.fghrsh.net/';
    window.location = window.location.protocol+'//'+window.location.hostname+'/'
});

$('.waifu-tool .fui-eye').click(function (){
    loadOtherModel();
});

$('.waifu-tool .fui-chat').click(function (){
    showHitokoto();
});

$('.waifu-tool .fui-user').click(function (){
    loadRandModel();
});

$('.waifu-tool .fui-info-circle').click(function (){
    //window.open('https://imjad.cn/archives/lab/add-dynamic-poster-girl-with-live2d-to-your-blog-02');
    window.open('https://www.fghrsh.net/post/123.html');
});

$('.waifu-tool .fui-cross').click(function (){
    sessionStorage.setItem('waifu-dsiplay', 'none');
    showMessage('再见，死变态！！！', 1300, true);
    window.setTimeout(function() {$('.waifu').hide();}, 1300);
});

$('.waifu-tool .fui-photo').click(function (){
    showMessage('偷偷下载我照片想干嘛？？？', 5000, true);
    window.Live2D.captureName = 'Pio.png';
    window.Live2D.captureFrame = true;
});

(function (){
    var text;
    //var SiteIndexUrl = 'https://www.fghrsh.net/';  // 手动指定主页
    var SiteIndexUrl = window.location.protocol+'//'+window.location.hostname+'/';  // 自动获取主页
    
    if (window.location.href == SiteIndexUrl) {      // 如果是主页
        var now = (new Date()).getHours();
        if (now > 23 || now <= 5) {
            text = '凌晨熬夜容易猝死';
        } else if (now > 5 && now <= 8) {
            text = '早上好，小心，起这么早容易猝死';
        } else if (now > 8 && now <= 12) {
            text = '现在应该是上午上班时间，你这是在上班摸鱼吗';
        } else if (now > 12 && now <= 14) {
            text = '中午了，不睡午觉来看我的么，小心猝死';
        } else if (now > 14 && now <= 17) {
            text = '下午上班居然摸鱼';
        } else if (now > 17 && now <= 19) {
            text = '傍晚了，我猜你没那么早下班';
        } else if (now > 19 && now <= 21) {
            text = '晚上好，让我猜，你在加班是不是？？';
        } else if (now > 21 && now <= 23) {
            text = '如果这个时候你还在加班，你离猝死不远了';
        } else {
            text = '嗨~ 快来逗我玩吧！';
        }
    } else {
        if(document.referrer !== ''){
            var referrer = document.createElement('a');
            referrer.href = document.referrer;
            var domain = referrer.hostname.split('.')[1];
            if (window.location.hostname == referrer.hostname) {
                text = '欢迎来到<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
            } else if (domain == 'baidu') {
                text = 'Hello! 来自 百度搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&wd=')[1].split('&')[0] + '</span> 找到的我吗？';
            } else if (domain == 'so') {
                text = 'Hello! 来自 360搜索 的朋友<br>你是搜索 <span style="color:#0099cc;">' + referrer.search.split('&q=')[1].split('&')[0] + '</span> 找到的我吗？';
            } else if (domain == 'google') {
                text = 'Hello! 来自 谷歌搜索 的朋友<br>欢迎来到<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
            } else {
                text = 'Hello! 来自 <span style="color:#0099cc;">' + referrer.hostname + '</span> 的朋友';
            }
        } else {
            text = '欢迎来到<span style="color:#0099cc;">『' + document.title.split(' - ')[0] + '』</span>';
        }
    }
    function p(s) {
        return s < 10 ? '0' + s: s;
    }

    var myDate = new Date();
//获取当前年
    var year=myDate.getFullYear();
//获取当前月
    var month=myDate.getMonth()+1;
//获取当前日
    var date=myDate.getDate();
    var h=myDate.getHours();       //获取当前小时数(0-23)
    var m=myDate.getMinutes();     //获取当前分钟数(0-59)
    var s=myDate.getSeconds();

    var now='现在是'+year+'年'+p(month)+"月"+p(date)+"日"+" "+p(h)+'点'+p(m)+'分';
    var msgg=now+','+text;
    showMessage(msgg, 6000);
})();

//window.hitokotoTimer = window.setInterval(showHitokoto,30000);
/* 检测用户活动状态，并在空闲时 定时显示一言 */
var getActed = false;
window.hitokotoTimer = 0;
var hitokotoInterval = false;

$(document).mousemove(function(e){getActed = true;}).keydown(function(){getActed = true;});
setInterval(function() { if (!getActed) ifActed(); else elseActed(); }, 1000);

function ifActed() {
    if (!hitokotoInterval) {
        hitokotoInterval = true;
        hitokotoTimer = window.setInterval(showHitokoto, 30000);
    }
}

function elseActed() {
    getActed = hitokotoInterval = false;
    window.clearInterval(hitokotoTimer);
}

function showHitokoto(){
	/* 增加 hitokoto.cn API */
    $.getJSON('https://v1.hitokoto.cn',function(result){
        var text = '苟利国家生死以，岂因祸福避趋之';
        //text = text.render({source: result.from, creator: result.creator});
        showMessage(result.hitokoto, 5000);
        window.setTimeout(function() {showMessage(text, 3000);}, 5000);
   });
	$.getJSON('https://api.fghrsh.net/hitokoto/rand/?encode=jsc&uid=3335',function(result){
        var text = '这句一言出处是 <span style="color:#0099cc;">『{source}』</span>，是 <span style="color:#0099cc;">FGHRSH</span> 在 {date} 收藏的！';
        text = text.render({source: result.source, date: result.date});
        showMessage(result.hitokoto, 5000);
        window.setTimeout(function() {showMessage(text, 3000);}, 5000);
    });
}

function showMessage(text, timeout, flag){
    if(flag || sessionStorage.getItem('waifu-text') === '' || sessionStorage.getItem('waifu-text') === null){
        if(Array.isArray(text)) text = text[Math.floor(Math.random() * text.length + 1)-1];
        //console.log(text);
        
        if(flag) sessionStorage.setItem('waifu-text', text);
        
        $('.waifu-tips').stop();
        $('.waifu-tips').html(text).fadeTo(200, 1);
        if (timeout === undefined) timeout = 5000;
        hideMessage(timeout);
    }
}

function hideMessage(timeout){
    $('.waifu-tips').stop().css('opacity',1);
    if (timeout === undefined) timeout = 5000;
    window.setTimeout(function() {sessionStorage.removeItem('waifu-text')}, timeout);
    $('.waifu-tips').delay(timeout).fadeTo(200, 0);
}

function initModel(waifuPath){
    
    if (waifuPath === undefined) waifuPath = '';
    var modelId = localStorage.getItem('modelId');
    var modelTexturesId = localStorage.getItem('modelTexturesId');
    
    if (modelId == null) {
        
        /* 首次访问加载 指定模型 的 指定材质 */
        
        var modelId = 5;            // 模型 ID
        var modelTexturesId = 2    // 材质 ID
        
    } loadModel(modelId, modelTexturesId);
	
	$.ajax({
        cache: true,
        url: waifuPath+'waifu-tips.json',
        dataType: "json",
        success: function (result){
            $.each(result.mouseover, function (index, tips){
                $(document).on("mouseover", tips.selector, function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.render({text: $(this).text()});
                    showMessage(text, 3000);
                });
            });
            $.each(result.click, function (index, tips){
                $(document).on("click", tips.selector, function (){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.render({text: $(this).text()});
                    showMessage(text, 3000, true);
                });
            });
            $.each(result.seasons, function (index, tips){
                var now = new Date();
                var after = tips.date.split('-')[0];
                var before = tips.date.split('-')[1] || after;
                
                if((after.split('/')[0] <= now.getMonth()+1 && now.getMonth()+1 <= before.split('/')[0]) && 
                   (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])){
                    var text = tips.text;
                    if(Array.isArray(tips.text)) text = tips.text[Math.floor(Math.random() * tips.text.length + 1)-1];
                    text = text.render({year: now.getFullYear()});
                    showMessage(text, 6000, true);
                }
            });
        }
    });
}

function loadModel(modelId, modelTexturesId){
    localStorage.setItem('modelId', modelId);
    if (modelTexturesId === undefined) modelTexturesId = 0;
    localStorage.setItem('modelTexturesId', modelTexturesId);
    loadlive2d('live2d', 'http://api.biguokang.cn/get/index.php?id='+modelId+'-'+modelTexturesId, console.log('live2d','模型 '+modelId+'-'+modelTexturesId+' 加载完成'));
}

function loadRandModel(){
    var modelId = localStorage.getItem('modelId');
    var modelTexturesId = localStorage.getItem('modelTexturesId');
    
    var modelTexturesRandMode = 'switch';     // 可选 'rand'(随机), 'switch'(顺序)
    
    $.ajax({
        cache: false,
        url: 'http://api.biguokang.cn/'+modelTexturesRandMode+'_textures/index.php?id='+modelId+'-'+modelTexturesId,
        dataType: "json",
        success: function (result){
            if (result.textures['id'] == 1 && (modelTexturesId == 1 || modelTexturesId == 0)) {
                showMessage('没衣服穿了', 3000, true);
            } else {
                showMessage('别换了，没有比基尼，滚！！', 3000, true);
            }
            loadModel(modelId, result.textures['id']);
        }
    });
}

function loadOtherModel(){
    var modelId = localStorage.getItem('modelId');
    
    var modelTexturesRandMode = 'switch';     // 可选 'rand'(随机), 'switch'(顺序)
    
    $.ajax({
        cache: false,
        url: 'http://api.biguokang.cn/'+modelTexturesRandMode+'/index.php?id='+modelId,
        dataType: "json",
        success: function (result){
            loadModel(result.model['id']);
            showMessage(result.model['message'], 3000, true);
        }
    });
}