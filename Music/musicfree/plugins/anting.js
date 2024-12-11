var $3ar59$axios = require("axios");
var $3ar59$cryptojs = require("crypto-js");
var $3ar59$cheerio = require("cheerio");
var $3ar59$dayjs = require("dayjs");

function $parcel$interopDefault(a) {
  return a && a.__esModule ? a.default : a;
}
function $parcel$defineInteropFlag(a) {
  Object.defineProperty(a, '__esModule', {value: true, configurable: true});
}
function $parcel$export(e, n, v, s) {
  Object.defineProperty(e, n, {get: v, set: s, enumerable: true, configurable: true});
}

$parcel$defineInteropFlag(module.exports);

$parcel$export(module.exports, "default", () => $cfe19354befedf79$export$2e2bcd8739ae039);


function $09906a545de6e263$export$d7bdacb66077735f(_) {
    return {
        id: _.id ?? _.songid,
        strmid: _.strmid,
        platform: "岸听",
        type: _.type,
        artist: _.author,
        title: _.title,
        album: _.album,
        duration: _.time,
        artwork: _.pic?.startsWith("//") ? `https:${_.pic}` : _.pic
    };
}
function $09906a545de6e263$export$ed1fb53032701881(_) {
    return {
        id: _.albumId ?? _.id,
        artist: _.nickname,
        title: _.title,
        artwork: _.coverPath?.startsWith("//") ? `https:${_.coverPath}` : _.coverPath,
        description: _.intro ?? _.description,
        date: _.updatedAt ? (0, ($parcel$interopDefault($3ar59$dayjs)))(_.updatedAt).format("YYYY-MM-DD") : null
    };
}
function $09906a545de6e263$export$d08aae127141ee12(_) {
    return {
        name: _.nickname,
        id: _.uid,
        fans: _.followersCount,
        description: _.description,
        avatar: _.logoPic,
        worksNum: _.tracksCount
    };
}
function $09906a545de6e263$export$4141752cc74ed82e(_, type) {
    return {
        id: _.id,
        type: type != "" ? type : _.type,
        platform: "岸听",
        artwork: _.coverImgUrl ?? _.pic,
        title: _.name,
        description: _.description,
        worksNum: _.trackCount
    };
}
function $09906a545de6e263$export$4135fdd7029f141(raw) {
    return !raw.priceTypes?.length;
}
function $09906a545de6e263$export$ed4cedad8375a67(raw) {
    return raw.tag === 0 || raw.isPaid === false || parseFloat(raw.price) === 0;
}


/** 搜索方法 */ 



function $2dcf64ae9e0b8aa2$export$47fac120ab74ef02(word, sing) {
    const key = (0, ($parcel$interopDefault($3ar59$cryptojs))).enc.Utf8.parse(sing);
    const iv = (0, ($parcel$interopDefault($3ar59$cryptojs))).enc.Utf8.parse("k1y2a3b4r5t6c7q7");
    var encrypted = (0, ($parcel$interopDefault($3ar59$cryptojs))).AES.encrypt(word, key, {
        iv: iv,
        mode: (0, ($parcel$interopDefault($3ar59$cryptojs))).mode.CBC,
        padding: (0, ($parcel$interopDefault($3ar59$cryptojs))).pad.Pkcs7
    });
    var ciphertext = encrypted.ciphertext.toString((0, ($parcel$interopDefault($3ar59$cryptojs))).enc.Hex);
    return ciphertext.toUpperCase();
}
async function $2dcf64ae9e0b8aa2$export$bd6d310eff940ae4(url, sing, word) {
    //请求函数
    var data = $2dcf64ae9e0b8aa2$export$47fac120ab74ef02(word, sing); //log(data)
    var data2 = data.length / 2; //log(data2)
    var Authorization = sing.match(/^.{16}/)[0] + data.match(`^.{${data2}}`)[0] + sing.match(/.{16}$/)[0] + data.match(`.{${data2}}$`)[0]; //log(Authorization)
    var Authorization = (0, ($parcel$interopDefault($3ar59$cryptojs))).MD5(Authorization).toString().toUpperCase(); //log(Authorization)
    var body = "data=" + data + "&sing=" + sing; //log(body)
    var headers = {
        "Authorization": Authorization,
        "User-Agent": "Android",
        "Content-Type": "application/x-www-form-urlencoded",
        // 'Content-Length': '171',
        "Host": "t.ijanz.cn",
        "Connection": "Keep-Alive"
    };
    var html = (0, ($parcel$interopDefault($3ar59$axios))).post(url, body, {
        headers: headers,
        timeout: 100000
    }); //log(html)
    return html;
}


async function $5c0b0bb30a123866$var$searchBase(query, page, type) {
    var sing = (0, ($parcel$interopDefault($3ar59$cryptojs))).MD5(query + "0" + type + "B3uz2bToFYDS6E39nTn4hBNojrM2OyL9").toString().toUpperCase();
    var word = JSON.stringify({
        "act": "search",
        "type": type,
        "keywords": encodeURIComponent(query),
        "keytype": "0"
    }); //log(word)
    var html = await (0, $2dcf64ae9e0b8aa2$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var data = html.data;
    return data;
}
async function $5c0b0bb30a123866$var$searchMusic(query, page) {
    var res = (await $5c0b0bb30a123866$var$searchBase(query, page, "netease")).lists;
    res.concat((await $5c0b0bb30a123866$var$searchBase(query, page, "qq")).lists);
    return {
        isEnd: true,
        data: res.map((0, $09906a545de6e263$export$d7bdacb66077735f))
    };
}
async function $5c0b0bb30a123866$var$searchAlbum(query, page) {
    /*const res = (await searchBase(query, page, "album")).data.album;
  return {
    isEnd: true,
    data: res.map(formatMusicItem),
  };*/ return {};
}
async function $5c0b0bb30a123866$var$searchArtist(query, page) {
    /*const res = (await searchBase(query, page, "user")).data.user;
  return {
    isEnd: true,
    data: res.map(formatMusicItem),
  };*/ return {};
}
async function $5c0b0bb30a123866$export$2e2bcd8739ae039(query, page, type) {
    if (type === "music") return $5c0b0bb30a123866$var$searchMusic(query, page);
/*  else if (type === "album") {
    return searchAlbum(query, page);
  } else if (type === "artist") {
    return searchArtist(query, page);
  }*/ }




async function $199e50aab484ac9d$export$2e2bcd8739ae039(artistItem, page, type) {
    if (type === "music") {
        const res = (await (0, ($parcel$interopDefault($3ar59$axios))).get("https://www.ximalaya.com/revision/user/track", {
            params: {
                page: page,
                pageSize: 30,
                uid: artistItem.id
            }
        })).data.data;
        return {
            isEnd: res.page * res.pageSize >= res.totalCount,
            data: res.trackList.filter((0, $09906a545de6e263$export$ed4cedad8375a67)).map((_)=>({
                    ...(0, $09906a545de6e263$export$d7bdacb66077735f)(_),
                    artist: artistItem.name
                }))
        };
    } else {
        const res = (await (0, ($parcel$interopDefault($3ar59$axios))).get("https://www.ximalaya.com/revision/user/pub", {
            params: {
                page: page,
                pageSize: 30,
                uid: artistItem.id
            }
        })).data.data;
        return {
            isEnd: res.page * res.pageSize >= res.totalCount,
            data: res.albumList.filter((0, $09906a545de6e263$export$4135fdd7029f141)).map((_)=>({
                    ...(0, $09906a545de6e263$export$ed1fb53032701881)(_),
                    artist: artistItem.name
                }))
        };
    }
}





/** 获取专辑详情 */ async function $cfe19354befedf79$var$getAlbumInfo(albumItem, page = 1) {
    const res = await (0, ($parcel$interopDefault($3ar59$axios))).get("https://www.ximalaya.com/revision/album/v1/getTracksList", {
        params: {
            albumId: albumItem.id,
            pageNum: page,
            pageSize: 50
        }
    });
    return {
        isEnd: page * 50 >= res.data.data.trackTotalCount,
        albumItem: {
            worksNum: res.data.data.trackTotalCount
        },
        musicList: res.data.data.tracks.filter((0, $09906a545de6e263$export$ed4cedad8375a67)).map((_)=>{
            const r = (0, $09906a545de6e263$export$d7bdacb66077735f)(_);
            r.artwork = albumItem.artwork;
            r.artist = albumItem.artist;
            return r;
        })
    };
}
/** 获取音乐源 */ async function $cfe19354befedf79$var$getLyric(musicItem) {
    let res = await $cfe19354befedf79$var$getMediaSource(musicItem, "standard");
    if (res.lysic) return {
        rawLrc: res.lysic
    };
}
/** 获取音乐源 */ async function $cfe19354befedf79$var$getMediaSource(musicItem, quality) {
    var yinzhi = "128";
    if (quality == "high") yinzhi = "320";
    else if (quality == "super" && musicItem.type == "netease") yinzhi = "1411";
    else if (quality == "super" && musicItem.type == "qq") yinzhi = "sq";
    var songid = musicItem.id;
    var strmid = musicItem.strmid;
    var type = musicItem.type;
    var sing = (0, ($parcel$interopDefault($3ar59$cryptojs))).MD5(songid + yinzhi + strmid + type + "B3uz2bToFYDS6E39nTn4hBNojrM2OyL9music").toString().toUpperCase(); //log(sing)
    var word = JSON.stringify({
        "act": "musicurl",
        "type": type,
        "songid": songid,
        "strmid": strmid,
        "file": yinzhi
    }); //log(word)
    var html = await (0, $2dcf64ae9e0b8aa2$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var play = html.data.data.url;
    if (play == "false") return {};
    else return {
        url: play,
        lysic: html.data.data.lysic,
        quality: quality
    };
}
async function $cfe19354befedf79$var$getTopLists() {
    var result = [];
    const dataNetease = await (0, ($parcel$interopDefault($3ar59$axios))).get("https://api.tyhua.top/toplist/detail", {
        params: {
            realIP: "116.25.146.177"
        },
        headers: {
            referer: `https://api.tyhua.top`,
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61"
        }
    });
    const listNetease = dataNetease.data.list;
    result.push({
        title: "网易云",
        data: listNetease.map((_)=>{
            const r = (0, $09906a545de6e263$export$4141752cc74ed82e)(_, "netease");
            r.act = "toplist";
            return r;
        })
    });
    var html = await (0, ($parcel$interopDefault($3ar59$axios))).get("https://c.y.qq.com/node/pc/wk_v15/top.html", {
        headers: {
            referer: `https://c.y.qq.com`,
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61"
        }
    });
    const $ = $3ar59$cheerio.load(html.data);
    const conts = $("body .layout_page__cont").get();
    var lists = [];
    for(var i in conts)lists.push($(conts[i]).find(".layout_page__cont .toplist__item").get());
    var list = lists[0];
    const listQQ = [];
    for(var j in list)listQQ.push({
        id: $(list[j]).find("a").attr("data-tid").split("/")[1],
        type: "qq",
        act: "toplist",
        description: "累计播放量：" + $(list[j]).find("span.mod_btn_icon").text(),
        artwork: "https:" + $(list[j]).find("img").attr("src"),
        title: $(list[j]).find("img").attr("alt")
    });
    result.push({
        title: "QQ音乐",
        data: listQQ
    });
    // return
    return result;
}
async function $cfe19354befedf79$var$getTopListDetail(sheetItem, page = 1) {
    var result;
    result = {
        ...sheetItem
    };
    const act = sheetItem.act;
    const id = sheetItem.id;
    const type = sheetItem.type;
    var sing = (0, ($parcel$interopDefault($3ar59$cryptojs))).MD5(id + type + "B3uz2bToFYDS6E39nTn4hBNojrM2OyL9").toString().toUpperCase(); //log(sing)
    var word = JSON.stringify({
        "act": act,
        "type": type,
        "id": id
    });
    const html = await (0, $2dcf64ae9e0b8aa2$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var list = html.data.songs;
    result.musicList = list.map((_)=>{
        const r = (0, $09906a545de6e263$export$d7bdacb66077735f)(_);
        r.type = type;
        return r;
    });
    return result;
}
async function $cfe19354befedf79$var$getRecommendSheetTags() {
    var result = {};
    return result;
}
async function $cfe19354befedf79$var$getRecommendSheetsByTag(tag, page) {
    var result = {};
    var html = await (0, ($parcel$interopDefault($3ar59$axios)))("http://t.ijanz.cn/at.php?act=personalized", {
        headers: {
            "Authorization": "",
            "User-Agent": "Android",
            "Host": "t.ijanz.cn",
            "Connection": "Keep-Alive"
        },
        method: "GET"
    });
    var list = html.data;
    result.data = list.map((_)=>{
        const r = (0, $09906a545de6e263$export$4141752cc74ed82e)(_, "");
        r.act = "playlist";
        return r;
    });
    result.isEnd = true;
    return result;
}
async function $cfe19354befedf79$var$getMusicSheetInfo(sheetItem, page) {
    var result = {};
    result = {
        ...sheetItem
    };
    const act = sheetItem.act;
    const id = sheetItem.id;
    const type = sheetItem.type;
    var sing = (0, ($parcel$interopDefault($3ar59$cryptojs))).MD5(id + type + "B3uz2bToFYDS6E39nTn4hBNojrM2OyL9").toString().toUpperCase(); //log(sing)
    var word = JSON.stringify({
        "act": act,
        "type": type,
        "id": id
    });
    const html = await (0, $2dcf64ae9e0b8aa2$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var list = html.data.songs;
    result.musicList = list.map((_)=>{
        const r = (0, $09906a545de6e263$export$d7bdacb66077735f)(_);
        r.type = type;
        return r;
    });
    result.isEnd = true;
    return result;
}
const $cfe19354befedf79$var$pluginInstance = {
    platform: "岸听",
    version: "0.0.6",
    author: "SoEasy同学",
    srcUrl: "https://gitee.com/kevinr/tvbox/raw/master/musicfree/plugins/anting.js",
    supportedSearchType: [
        "music",
        "album",
        "artist"
    ],
    search: $5c0b0bb30a123866$export$2e2bcd8739ae039,
    getMediaSource: $cfe19354befedf79$var$getMediaSource,
    getLyric: $cfe19354befedf79$var$getLyric,
    getAlbumInfo: $cfe19354befedf79$var$getAlbumInfo,
    getArtistWorks: $199e50aab484ac9d$export$2e2bcd8739ae039,
    getTopLists: $cfe19354befedf79$var$getTopLists,
    getTopListDetail: $cfe19354befedf79$var$getTopListDetail,
    getRecommendSheetTags: $cfe19354befedf79$var$getRecommendSheetTags,
    getRecommendSheetsByTag: $cfe19354befedf79$var$getRecommendSheetsByTag,
    getMusicSheetInfo: $cfe19354befedf79$var$getMusicSheetInfo
};
(0, $5c0b0bb30a123866$export$2e2bcd8739ae039)("童话镇", 1, "music").then((res)=>{
    $cfe19354befedf79$var$getMediaSource(res.data[0], "standard").then((res)=>{
        console.log(res);
    });
    $cfe19354befedf79$var$getLyric(res.data[0]).then((res)=>{
        console.log(res);
    });
});
$cfe19354befedf79$var$getRecommendSheetsByTag({
    id: ""
}, 1).then((res)=>{
    $cfe19354befedf79$var$getMusicSheetInfo(res.data[0], 0).then((res)=>{
        console.log(res);
        $cfe19354befedf79$var$getMediaSource(res.musicList[0], "standard").then((res)=>{
            console.log(res);
        });
        $cfe19354befedf79$var$getLyric(res.musicList[0]).then((res)=>{
            console.log(res);
        });
    });
});
$cfe19354befedf79$var$getTopLists().then((res)=>{
    console.log(res);
    $cfe19354befedf79$var$getTopListDetail(res[1].data[0]).then((res)=>{
        console.log(res);
        $cfe19354befedf79$var$getMediaSource(res.musicList[0], "standard").then((res)=>{
            console.log(res);
        });
        $cfe19354befedf79$var$getLyric(res.musicList[0]).then((res)=>{
            console.log(res);
        });
    });
});
var $cfe19354befedf79$export$2e2bcd8739ae039 = $cfe19354befedf79$var$pluginInstance;


//# sourceMappingURL=anting.js.map
