const live2d_settings = {
    'modelUrl': 'model',
    'tipsMessage': 'waifu-tips.json',
    'modelName': 'MC_Vtuber',
    'modelStorage': true,
    'modelRandMode': false,
    'preLoadMotion': false,
    'tryWebp': true,
    'showToolMenu': true,
    'canCloseLive2d': true,
    'canSwitchModel': false,
    'canSwitchHitokoto': false,
    'canTakeScreenshot': false,
    'canTurnToHomePage': false,
    'canTurnToAboutPage': true,
    'showVolumeBtn': false,
    'showHitokoto': true,
    'hitokotoAPI': '',
    'showWelcomeMessage': true,
    'showCopyMessage': true,
    'showF12OpenMsg': true,
    'live2dHeight': 680,
    'live2dWidth': 500,
    'waifuMinWidth': 'disable',
    'waifuEdgeSide': 'right:0',
    'debug': false,
    // 全局 DEBUG 设置
    'debugMousemove': false,
    'logMessageToConsole': true,
    'l2dVersion': '2.0.0',
    'homePageUrl': 'auto',
    'aboutPageUrl': 'https://emowolf.fun/',
    'screenshotCaptureName': 'bronyaMoe.png',
}

const live2d_models = [{
    name: 'MC_Vtuber',
    message: 'SDK3',
    version: 3,
}, {
    name: 'Rice',
    message: 'SDK4 official sample Rice <a href="https://www.live2d.com/eula/live2d-free-material-license-agreement_en.html">LICENSE</a>',
    version: 3
}, ]

const setSS = (k,v)=>{
    try {
        sessionStorage.setItem(k, v);
    } catch (e) {}
}
const removeSS = (k)=>{
    try {
        sessionStorage.removeItem(k);
    } catch (e) {}
}
const getSS = (k)=>{
    try {
        return sessionStorage.getItem(k);
    } catch (e) {
        return null
    }
}
const setLS = (k,v)=>{
    try {
        localStorage.setItem(k, v);
    } catch (e) {}
}
const removeLS = (k)=>{
    try {
        localStorage.removeItem(k);
    } catch (e) {}
}
const getLS = (k)=>{
    try {
        return localStorage.getItem(k);
    } catch (e) {
        return null
    }
}
String.prototype.render = function(context) {
    const tokenReg = /(\\)?{([^{}\\]+)(\\)?}/g;
    return this.replace(tokenReg, function(word, slash1, token, slash2) {
        if (slash1 || slash2) {
            return word.replace('\\', '');
        }
        const variables = token.replace(/\s/g, '').split('.');
        let currentObject = context;
        let i, length, variable;

        for (i = 0,
        length = variables.length; i < length; ++i) {
            variable = variables[i];
            currentObject = currentObject[variable];
            if (currentObject === undefined || currentObject === null)
                return '';
        }
        return currentObject;
    });
}
;
const $$ = (selector)=>{
    try {
        const e = document.querySelectorAll(selector);
        if (e.length === 1) {
            return e[0];
        } else
            return Array.from(e);
    } catch (e) {
        console.error(e);
        return null;
    }
}
const re = /x/;
console.log("%c Powered by %c Chocolate and Love. ",
            'color:#fff;background-color:#653100;line-height:20px;border-radius: 5px 0 0 5px',
            'color:#fff;background-color:#a76b09;line-height:20px;border-radius: 0 5px 5px 0');
const live2dId2 = 'live2d2';
const live2dId4 = 'live2d4';
const waifuTips = $$('#waifu-message');
const waifu = $$('#waifu');

function getRandText(text) {
    return Array.isArray(text) ? text[Math.floor(Math.random() * text.length + 1) - 1] : text
}

let timeoutID;

function testWebP() {
    return new Promise(res=>{
        const webP = new Image();
        webP.src = 'data:image/webp;base64,UklGRjoAAABXRUJQVlA4IC4AAACyAgCdASoCAAIALmk0mk0iIiIiIgBoSygABc6WWgAA/veff/0PP8bA//LwYAAA';
        webP.onload = webP.onerror = ()=>{
            res(webP.height === 2);
        }
        ;
    }
    )
}

function showMessage(text, timeout, flag) {
    if (flag || getSS('waifu-text') === '' || getSS('waifu-text') === null) {
        if (timeoutID)
            window.clearTimeout(timeoutID);
        if (Array.isArray(text))
            text = text[Math.floor(Math.random() * text.length + 1) - 1];
        if (live2d_settings.logMessageToConsole)
            console.log('%c [Live2d] ','color:#fff;background-color:#653100;line-height:20px;border-radius: 5px 5px 5px 5px', text.replace(/<[^<>]+>/g, ''));
        if (flag)
            setSS('waifu-text', text);
        waifuTips.style.opacity = 1;
        waifuTips.innerHTML = text;
        if (timeout === undefined)
            timeout = 5000;
        hideMessage(timeout);
    }
}

function hideMessage(timeout) {
    if (timeout === undefined)
        timeout = 5000;
    timeoutID = window.setTimeout(function() {
        removeSS('waifu-text');
        waifuTips.style.opacity = 0;
    }, timeout);
}

function changePosition(position) {
    if (position === 'left') {
        $$('.waifu-tool').style.right = 'unset';
        $$('.waifu-tool').style.left = '10px';
        waifu.style.right = 'unset';
        waifu.style.left = live2d_settings.waifuEdgeSide.split(":")[1];
    } else if (position === 'right') {
        $$('.waifu-tool').style.left = 'unset';
        $$('.waifu-tool').style.right = '10px';
        waifu.style.left = 'unset';
        waifu.style.right = live2d_settings.waifuEdgeSide.split(":")[1];
    } else {
        $$('.waifu-tool').style.left = '';
        $$('.waifu-tool').style.right = '';
        waifu.style.left = '';
        waifu.style.right = '';
    }
}

function initModel() {
    /* Load style sheet */
    addStyle(waifuStyle);
    if (getSS('waifuHide') === '1') {
        waifu.classList.add('hide');
        return;
    } else {
        waifu.classList.remove('hide');
    }


    $$(`#${live2dId2}`).setAttribute('height', live2d_settings.live2dHeight);
    $$(`#${live2dId2}`).setAttribute('width', live2d_settings.live2dWidth);
    $$(`#${live2dId4}`).setAttribute('height', live2d_settings.live2dHeight);
    $$(`#${live2dId4}`).setAttribute('width', live2d_settings.live2dWidth);
    if (!live2d_settings.showToolMenu)
        $$('.waifu-tool').classList.add('hide');
    if (!live2d_settings.canCloseLive2d)
        $$('.waifu-tool .icon-cross').classList.add('hide');
    if (!live2d_settings.canSwitchModel)
        $$('.waifu-tool .icon-next').classList.add('hide');
    if (!live2d_settings.canSwitchHitokoto)
        $$('.waifu-tool .icon-message').classList.add('hide');
    if (!live2d_settings.canTakeScreenshot)
        $$('.waifu-tool .icon-camera').classList.add('hide');
    if (!live2d_settings.canTurnToHomePage)
        $$('.waifu-tool .icon-home').classList.add('hide');
    if (!live2d_settings.canTurnToAboutPage)
        $$('.waifu-tool .icon-about').classList.add('hide');
    if (!live2d_settings.showVolumeBtn)
        $$('.waifu-tool .icon-volumeup').classList.add('hide') || $$('.waifu-tool .icon-volumedown').classList.add('hide');
    $$('.waifu-tool .icon-next').addEventListener('click', ()=>loadOtherModel());
    $$('.waifu-tool .icon-home').addEventListener('click', ()=>window.location = live2d_settings.homePageUrl)
    $$('.waifu-tool .icon-about').addEventListener('click', ()=>window.open(live2d_settings.aboutPageUrl))
    $$('.waifu-tool .icon-camera').addEventListener('click', ()=>{
        window.live2dCurrentVersion === 3 ? window.live2dv4.CaptureCanvas() : window.live2dv2.captureFrame = true;
    }
    );
    $$('.waifu-tool .icon-cross').addEventListener('click', ()=>{
        sessionStorage.setItem('waifuHide', '1');
        window.setTimeout(function() {
            waifu.classList.add('hide');
        }, 1000);
    }
    )

    window.waifuResize = ()=>{
        if (getSS('waifuHide') !== '1')
            window.innerWidth <= Number(live2d_settings.waifuMinWidth.replace('px', '')) ? waifu.classList.add('hide') : waifu.classList.remove('hide');
    }
    ;

    if (live2d_settings.waifuMinWidth !== 'disable') {
        waifuResize();
        window.addEventListener('resize', waifuResize)
    }

    live2d_settings.homePageUrl = live2d_settings.homePageUrl === 'auto' ? window.location.protocol + '//' + window.location.hostname + '/' : live2d_settings.homePageUrl;

    if (live2d_settings.tipsMessage)
        window.fetch(live2d_settings.tipsMessage).then(res=>res.json()).then(resjson=>loadTipsMessage(resjson));

    let modelName = getLS('modelName');

    if (!live2d_settings.modelStorage || modelName == null)
        modelName = live2d_settings.modelName;

    window.live2dv4.setPreLoadMotion(live2d_settings.preLoadMotion);
    window.live2dv2.debug = live2d_settings.debug;
    window.live2dv4.debug = live2d_settings.debug;
    window.live2dv2.debugMousemove = live2d_settings.debug && live2d_settings.debugMousemove;
    window.live2dv4.debugMousemove = live2d_settings.debug && live2d_settings.debugMousemove;
    if (live2d_settings.tryWebp) {
        testWebP().then(r=>window.webpReady = r).then(()=>{
            if (window.webpReady === true)
                console.log("%c [Live2d] %c Loaded WebP as texture. ",
                'color:#fff;background-color:#653100;line-height:20px;border-radius: 5px 0 0 5px',
                'color:#fff;background-color:#a76b09;line-height:20px;border-radius: 0 5px 5px 0');
            else
                console.warn("[Live2d] Sorry but WebP is not supported on your browser. ");
            loadModel(modelName);
        }
        );
    } else {
        loadModel(modelName);
    }
}

function loadModel(modelName) {
    if (live2d_settings.modelStorage)
        setLS('modelName', modelName);
    else
        setSS('modelName', modelName);
    let modelVersion = 2;
    for (let model of live2d_models) {
        if (model.name === modelName) {
            modelVersion = model.version;
            changePosition(model.position);
            break;
        }
    }
    if (window.live2dCurrentVersion !== modelVersion) {
        if (window.live2dCurrentVersion === 2) {
            window.live2dv2.release();
            $$(`#${live2dId2}`).style.display = 'none';
        } else {
            window.live2dv4.release();
            $$(`#${live2dId4}`).style.display = 'none';
        }
    }
    if (modelVersion === 2) {
        $$(`#${live2dId2}`).style.display = 'block';
        window.live2dv2.load(live2dId2, `${live2d_settings.modelUrl}/${modelName}/model.json`);
    } else if (window.live2dCurrentVersion === modelVersion) {
        window.live2dv4.change(`${live2d_settings.modelUrl}/${modelName}`, `${modelName}.model3.json`);
    } else {
        $$(`#${live2dId4}`).style.display = 'block';
        window.live2dv4.load(live2dId4, `${live2d_settings.modelUrl}/${modelName}`, `${modelName}.model3.json`);
    }
    window.live2dCurrentVersion = modelVersion;
}

function modelStorageGetItem(key) {
    return live2d_settings.modelStorage ? getLS(key) : getSS(key);
}

function loadOtherModel() {
    const modelName = modelStorageGetItem('modelName');
    let modelIndex = 0;
    if (live2d_settings.modelRandMode) {
        modelIndex = Math.floor(Math.random() * live2d_models.length + 1) - 1;
    } else {
        modelIndex = live2d_models.findIndex(modelObj=>modelObj.name === modelName)
        if (modelIndex < live2d_models.length - 1)
            modelIndex++;
        else
            modelIndex = 0;
    }
    if (live2d_models[modelIndex].message)
        showMessage(live2d_models[modelIndex].message, 3000, true);
    loadModel(live2d_models[modelIndex].name);
}

function loadTipsMessage(result) {
    window.waifu_tips = result;

    const mouseenterListener = (e,tips)=>{
        e.addEventListener('mouseenter', ()=>{
            let text = getRandText(tips.text);
            if (text.indexOf("{text}") > 0)
                text = text.replace(/{text}/, e.innerText);
            showMessage(text, 3000);
        }
        );
    }
    const addMouseoverListener = ()=>{
        for (let tips of result.mouseover) {
            const select = $$(tips.selector);
            if (Array.isArray(select))
                select.forEach(e=>mouseenterListener(e, tips));
            else if (select)
                mouseenterListener(select, tips);
            else
                live2d_settings.debug && console.warn(`[ERROR] Can not found element: ${tips.selector}`)
        }
    }
    const addClickListener = ()=>{
        for (let tips of result.click) {
            const select = $$(tips.selector);
            if (Array.isArray(select))
                select.forEach(e=>e.addEventListener('click', ()=>{
                    let text = getRandText(tips.text);
                    showMessage(text, 3000, true);
                }
                ))
            else if (select)
                select.addEventListener('click', ()=>{
                    let text = getRandText(tips.text);
                    showMessage(text, 3000, true);
                }
                )
            else
                live2d_settings.debug && console.warn(`[ERROR] Can not found element: ${tips.selector}`)
        }
    }
    for (let tips of result.seasons) {
        const now = new Date();
        const after = tips.date.split('-')[0];
        const before = tips.date.split('-')[1] || after;
        if ((after.split('/')[0] <= now.getMonth() + 1 && now.getMonth() + 1 <= before.split('/')[0]) && (after.split('/')[1] <= now.getDate() && now.getDate() <= before.split('/')[1])) {
            let text = getRandText(tips.text);
            if (text.indexOf("{year}") > 0)
                text = text.replace(/{year}/, now.getFullYear());
            showMessage(text, 6000, true);
        }
    }
    if (live2d_settings.showF12OpenMsg) {
        re.toString = function() {
            showMessage(getRandText(result.waifu.console_open_msg), 5000, true);
            return '';
        }
        ;
    }
    const addCopyListener = ()=>{
        if ($$('#articleContent').length !== 0)
            $$('#articleContent').addEventListener('copy', ()=>(showMessage(getRandText(result.waifu.copy_message), 5000, true)));
    }
    window.showWelcomeMessage = function(result) {
        let text;
        if (window.location.href === live2d_settings.homePageUrl) {
            const now = (new Date()).getHours();
            if (now > 23 || now <= 5)
                text = getRandText(result.waifu.hour_tips['t23-5']);
            else if (now > 5 && now <= 7)
                text = getRandText(result.waifu.hour_tips['t5-7']);
            else if (now > 7 && now <= 11)
                text = getRandText(result.waifu.hour_tips['t7-11']);
            else if (now > 11 && now <= 14)
                text = getRandText(result.waifu.hour_tips['t11-14']);
            else if (now > 14 && now <= 17)
                text = getRandText(result.waifu.hour_tips['t14-17']);
            else if (now > 17 && now <= 19)
                text = getRandText(result.waifu.hour_tips['t17-19']);
            else if (now > 19 && now <= 21)
                text = getRandText(result.waifu.hour_tips['t19-21']);
            else if (now > 21 && now <= 23)
                text = getRandText(result.waifu.hour_tips['t21-23']);
            else
                text = getRandText(result.waifu.hour_tips.default);
        } else {
            const referrer_message = result.waifu.referrer_message;
            if (document.referrer !== '') {
                const referrer = document.createElement('a');
                referrer.href = document.referrer;
                const domain = referrer.hostname.split('.')[1];
                if (window.location.hostname === referrer.hostname)
                    text = referrer_message.localhost[0] + document.title.split(referrer_message.localhost[2])[0] + referrer_message.localhost[1];
                else if (domain === 'baidu')
                    text = referrer_message.baidu[0] + referrer.search.split('&wd=')[1].split('&')[0] + referrer_message.baidu[1];
                else if (domain === 'so')
                    text = referrer_message.so[0] + referrer.search.split('&q=')[1].split('&')[0] + referrer_message.so[1];
                else if (domain === 'google')
                    text = referrer_message.google[0] + document.title.split(referrer_message.google[2])[0] + referrer_message.google[1];
                else {
                    text = referrer_message.default[0] + referrer.hostname + referrer_message.default[1];
                    for (let host in result.waifu.referrer_hostname)
                        if (host === referrer.hostname) {
                            text = getRandText(result.waifu.referrer_hostname[host]);
                            break;
                        }
                }
            } else
                text = referrer_message.none[0] + document.title.split(referrer_message.none[2])[0] + referrer_message.none[1];
        }
        showMessage(text, 6000);
    }
    ;
    if (live2d_settings.showWelcomeMessage)
        showWelcomeMessage(result);

    const waifu_tips = result.waifu;

    if (live2d_settings.showHitokoto) {
        window.getActed = false;
        window.hitokotoTimer = 0;
        window.hitokotoInterval = false;
        setInterval(function() {
            if (!getActed)
                ifActed();
            else
                elseActed();
        }, 1000);
    }
    const addHitokotoListener = ()=>{
        document.addEventListener('mousemove', ()=>(getActed = true))
        document.addEventListener('keydown', ()=>(getActed = true))
    }

    if (document.readyState === "interactive" || document.readyState === "complete") {
        addMouseoverListener();
        addClickListener();
        if (live2d_settings.showCopyMessage)
            addCopyListener();
        if (live2d_settings.showHitokoto)
            addHitokotoListener();
    } else {
        window.addEventListener("DOMContentLoaded", addMouseoverListener);
        window.addEventListener("DOMContentLoaded", addClickListener);
        if (live2d_settings.showCopyMessage)
            window.addEventListener("DOMContentLoaded", addCopyListener);
        if (live2d_settings.showHitokoto)
            window.addEventListener("DOMContentLoaded", addHitokotoListener);
    }

    function ifActed() {
        if (!hitokotoInterval) {
            hitokotoInterval = true;
            hitokotoTimer = window.setInterval(showHitokotoActed, 30000);
        }
    }

    function elseActed() {
        getActed = hitokotoInterval = false;
        window.clearInterval(hitokotoTimer);
    }

    function showHitokotoActed() {
        if (document.visibilityState === 'visible')
            showHitokoto();
    }

    function showHitokoto() {
        switch (live2d_settings.hitokotoAPI) {
        case 'jinrishici.com':
            window.fetch('https://v2.jinrishici.com/one.json').then(res=>res.json()).then(resJson=>{
                if (!resJson.data.origin.title) {
                    let text = waifu_tips.hitokoto_api_message['jinrishici.com'][0];
                    text = text.render({
                        title: resJson.data.origin.title,
                        dynasty: resJson.data.origin.dynasty,
                        author: resJson.data.origin.author
                    });
                    window.setTimeout(function() {
                        showMessage(text, 3000, true);
                    }, 5000);
                }
                showMessage(resJson.data.content, 5000, true);
            }
            )
            break;
        default:
            window.fetch('https://v1.hitokoto.cn').then(res=>res.json()).then(resJson=>{
                if (!resJson.from) {
                    let text = waifu_tips.hitokoto_api_message['hitokoto.cn'][0];
                    text = text.render({
                        source: resJson.from,
                        creator: resJson.creator
                    });
                    window.setTimeout(function() {
                        showMessage(text, 3000, true);
                    }, 5000);
                }
                showMessage(resJson.hitokoto, 5000, true);
            }
            )
        }
    }

    $$('.waifu-tool .icon-message').addEventListener('click', ()=>showHitokoto());
}

const addStyle = (()=>{
    const style = document.createElement('style');
    document.head.append(style);
    return (styleString)=>style.textContent = styleString;
}
)();

const blobDownload = (blob)=>{
    if (typeof blob == 'object' && blob instanceof Blob) {
        blob = URL.createObjectURL(blob);
    }
    const aLink = document.createElement('a');
    aLink.href = blob;
    aLink.download = live2d_settings.screenshotCaptureName || 'live2d.png';
    let event;
    if (window.MouseEvent)
        event = new MouseEvent('click');
    else {
        event = document.createEvent('MouseEvents');
        event.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null);
    }
    aLink.dispatchEvent(event);
}

const waifuStyle = `
#waifu {
${live2d_settings.waifuEdgeSide}px;
position:fixed;
bottom:0;
z-index:998;
font-size:0
}

#waifu-message {
font-size:1rem;
width:-moz-fit-content;
width:fit-content;
height:auto;
left:2rem;
top:20px;
opacity:0;
z-index:998;
margin:auto;
padding:5px 10px;
border:1px solid rgba(104,216,255,0.62);
border-radius:12px;
background-color:rgba(244,255,244,0.8);
box-shadow:0 3px 15px 2px rgba(16,51,49,0.2);
text-overflow:ellipsis;
overflow:hidden;
position:relative;
animation-delay:5s;
animation-duration:50s;
animation-iteration-count:infinite;
animation-name:shake;
animation-timing-function:ease-in-out;
transition:opacity .3s ease
}

#waifu-message>a {
color:#7500b7;
}

#live2d2,#live2d4 {
position:relative;
display:none;
z-index:997
}

.waifu-tool {
display:none;
color:#d73b66;
top:130px;
${live2d_settings.waifuEdgeSide.split(":")[0]}:10px;
position:absolute;
z-index:998
}

#waifu:hover > .waifu-tool {
display:block
}

.waifu-tool > span {
font-family:"waifuico"!important;
display:block;
cursor:pointer;
color:#00993d;
transition:.5s;
font-size:18px;
font-style:normal;
-webkit-font-smoothing:antialiased;
-moz-osx-font-smoothing:grayscale
}

.waifu-tool > span:hover {
color:#27c500
}

.waifu-tool > .icon-next:before{padding-left:1px;content:"\\e6ba"}.waifu-tool > .icon-message:before{content:"\\e632"}.waifu-tool > .icon-cross:before{content:"\\e606"}.waifu-tool > .icon-about:before{content:"\\e60c"}.waifu-tool > .icon-home:before{content:"\\e604"}.waifu-tool > .icon-camera:before{content:"\\e635"}.waifu-tool > .icon-volumedown:before{content:"\\e6c2"}.waifu-tool > .icon-volumeup:before{content:"\\e6c3"}#waifu.hide,.waifu-tool > span.hide{display:none}@font-face{font-family:"waifuico";src:url(data:application/x-font-woff2;charset=utf-8;base64,d09GMgABAAAAAAWcAAsAAAAAC0gAAAVNAAEAAAAAAAAAAAAAAAAAAAAAAAAAAAAAHEIGVgCEAgqIVIcCATYCJAMkCxQABCAFhG0HchuYCVGUT06K7OeB7R6lCBOgbWnZzIYDWz+EMHANCwis4uG/tdf7dmbx/wC6VAGqgCuhAwBFIEwVsNJVwEb21LKO3q1lyz+tCZvx3+UrWlPV795l73pusllKVXgcRqIMCNk9wkGaA/IP1K2mWg6WmlnR1Qqa7lwLoaYD/FpfOAE/f7i06QU2n2W5rPV/cy2K44ACGrcnLqDD0wI/YTkL68xspUBnvQo9T6CzQkdr1/bhCczKuDJQdj1LDMwmDHIFPTTqquDavDGelJricfGKl+7w8d98zFIoE/6iA9e2Ylj9lX1P9TmTXns0nA3bm0jYCGTiTaHjmRQkNprQnXOzC8C4sE0w1P4qQ/OWvPO97zOkb72kik5d+CcPlJKsUAm1hqhw1ZCot5MNv7LiUvKr4pL4NVSqQvPQKYCWoNQMvYNOAH2DTg30HQ0a0JprJoEpEPsB4i2ON7lEyOJpoGWF9Uoz6iBtQmEZSR0YgyVVYPFeOIPN3GSY5uUOTjKmlLks4xwO30ihSfCIyrtB4/PlZurwHsUBoelpYahQGMsORi9mnmOcZ53Fz4BQ8IuaCKZRdi7BW+cZ52Szpw+ehI6b5uVwWNcZJrl5XEaG4Bld+DyO/5TGe5LbP7LAWhojkRiji8z5YcW4eTbOYXEZBO3YphYFXCQmlfO4fOOcAZytB5LH1+1A0uQ5B/DIGQ0gj8ejLuvzhMI4gSALZBJK9MFFEGbOK1D72SB4ZF2DPLFhL3v8OkqZ3MwXCOi1BHU/icfLYxIMLouDs5sWjxhRQR6VjJ+FINpJiKW8dBgVnzyUAzNnYNNHlnYjV2upFMVP6IFi1tXVmW8ihqPPJMWLn3H3seGju3ci3kxPEJTA0jrAQ0fD8Bh6dl1hXf0jKHdKaRsxTzcO0JWMCoNpvbEutxBvrD4E64xscguymJWl87Zjuz13sbN3o1/REc9hj2HPEfRfUA14VOUN+7FLSlHD9gF0AN/dJbxQrsdqTB3bWeDw0/XbbtrtD/xvuymCYSI3VzoM07Joq6QFcq1EreSY1AupY67wGmL52IowWn008LOtnCa+PdJrVOzu58O13kDd54MrhoRV1HZxf/zUr1jBGrG7pF/6h14kOo20kntvDF6kSO5t+TgvfqwJSQ/VSg0rQ5KRsjB/bGg60jQ9Ai1DI9N26w1XrItJXd3kYnKRURRvBJG8CHy8T2KLtC/qq2WL2gJ6vtlO77JfPuylAcBR1HTZpJf91SwxeD4oigJToj4caJer06uTaZep061vZt/78dVJJWe2AnU4gB5PDpTgyF6yu7ScXvf3eIak4yE/dIofEGczzzlM3ABqvZvHHD39P3t+ZdNyM/gthH9c/L6TBMMoWrqXvkajeBuRb7kuP60g/JddpNzY5pNEGfo/hx8k0VMSdQi2thsxVqATC3y7PZM+hsUzjVX+THgmgkJtDpLGSmKmboTSwCJUGluhs8HOzQNTxITILdZ7ZBDGvUBh1GdIxr0RM/UdSrN+oTIeE9A5FlP3HFgd2fxOIaMUo73CLOLaSbPO+/IjSkJpJC51jDMSn4Vx2Buk0ztUkwxxgT9PRqoOnXCF2+xlVJaMjXBOkfZS1Wbc77uib+pFXMG8nQQxFIkh6wrKRFjNmeVqPrP/IyQRlAyp6HvmPUOEl62PhnoGDYg7qrpR36XUeucSI0oxB7ltKaugbbKRUiQYaoqPypGI6kk7xBpjfZrnmqp60+PqsV6BDv+YNopIkaOMKupooo1OvkmXOnODvDcJTV0W9tVTFy0Hnb6Xmpwrmr5sqjtz7PwxLkNFMV/Us6E/NAAAAAA=) format("woff2"),url(waifuico.woff?t=1597741284606) format("woff")}@keyframes shake{2%{transform:translate(0.5px,-1.5px) rotate(-0.5deg)}4%{transform:translate(0.5px,1.5px) rotate(1.5deg)}6%{transform:translate(1.5px,1.5px) rotate(1.5deg)}8%{transform:translate(2.5px,1.5px) rotate(0.5deg)}10%{transform:translate(0.5px,2.5px) rotate(0.5deg)}12%{transform:translate(1.5px,1.5px) rotate(0.5deg)}14%{transform:translate(0.5px,0.5px) rotate(0.5deg)}16%{transform:translate(-1.5px,-0.5px) rotate(1.5deg)}18%{transform:translate(0.5px,0.5px) rotate(1.5deg)}20%{transform:translate(2.5px,2.5px) rotate(1.5deg)}22%{transform:translate(0.5px,-1.5px) rotate(1.5deg)}24%{transform:translate(-1.5px,1.5px) rotate(-0.5deg)}26%{transform:translate(1.5px,0.5px) rotate(1.5deg)}28%{transform:translate(-0.5px,-0.5px) rotate(-0.5deg)}30%{transform:translate(1.5px,-0.5px) rotate(-0.5deg)}32%{transform:translate(2.5px,-1.5px) rotate(1.5deg)}34%{transform:translate(2.5px,2.5px) rotate(-0.5deg)}36%{transform:translate(0.5px,-1.5px) rotate(0.5deg)}38%{transform:translate(2.5px,-0.5px) rotate(-0.5deg)}40%{transform:translate(-0.5px,2.5px) rotate(0.5deg)}42%{transform:translate(-1.5px,2.5px) rotate(0.5deg)}44%{transform:translate(-1.5px,1.5px) rotate(0.5deg)}46%{transform:translate(1.5px,-0.5px) rotate(-0.5deg)}48%{transform:translate(2.5px,-0.5px) rotate(0.5deg)}50%{transform:translate(-1.5px,1.5px) rotate(0.5deg)}52%{transform:translate(-0.5px,1.5px) rotate(0.5deg)}54%{transform:translate(-1.5px,1.5px) rotate(0.5deg)}56%{transform:translate(0.5px,2.5px) rotate(1.5deg)}58%{transform:translate(2.5px,2.5px) rotate(0.5deg)}60%{transform:translate(2.5px,-1.5px) rotate(1.5deg)}62%{transform:translate(-1.5px,0.5px) rotate(1.5deg)}64%{transform:translate(-1.5px,1.5px) rotate(1.5deg)}66%{transform:translate(0.5px,2.5px) rotate(1.5deg)}68%{transform:translate(2.5px,-1.5px) rotate(1.5deg)}70%{transform:translate(2.5px,2.5px) rotate(0.5deg)}72%{transform:translate(-0.5px,-1.5px) rotate(1.5deg)}74%{transform:translate(-1.5px,2.5px) rotate(1.5deg)}76%{transform:translate(-1.5px,2.5px) rotate(1.5deg)}78%{transform:translate(-1.5px,2.5px) rotate(0.5deg)}80%{transform:translate(-1.5px,0.5px) rotate(-0.5deg)}82%{transform:translate(-1.5px,0.5px) rotate(-0.5deg)}84%{transform:translate(-0.5px,0.5px) rotate(1.5deg)}86%{transform:translate(2.5px,1.5px) rotate(0.5deg)}88%{transform:translate(-1.5px,0.5px) rotate(1.5deg)}90%{transform:translate(-1.5px,-0.5px) rotate(-0.5deg)}92%{transform:translate(-1.5px,-1.5px) rotate(1.5deg)}94%{transform:translate(0.5px,0.5px) rotate(-0.5deg)}96%{transform:translate(2.5px,-0.5px) rotate(-0.5deg)}98%{transform:translate(-1.5px,-1.5px) rotate(-0.5deg)}0%,100%{transform:translate(0,0) rotate(0)}}
`;
initModel();
window.downloadCap = blobDownload;
window.initModel = initModel;
export {showMessage, initModel}