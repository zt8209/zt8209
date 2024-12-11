var $b4gIH$axios = require("axios");
var $b4gIH$cryptojs = require("crypto-js");
var $b4gIH$cheerio = require("cheerio");
var $b4gIH$dayjs = require("dayjs");

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

$parcel$export(module.exports, "default", () => $763969d143e9f3b7$export$2e2bcd8739ae039);


function $58644d094b049802$export$d7bdacb66077735f(_) {
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
function $58644d094b049802$export$ed1fb53032701881(_) {
    return {
        id: _.albumId ?? _.id,
        artist: _.nickname,
        title: _.title,
        artwork: _.coverPath?.startsWith("//") ? `https:${_.coverPath}` : _.coverPath,
        description: _.intro ?? _.description,
        date: _.updatedAt ? (0, ($parcel$interopDefault($b4gIH$dayjs)))(_.updatedAt).format("YYYY-MM-DD") : null
    };
}
function $58644d094b049802$export$d08aae127141ee12(_) {
    return {
        name: _.nickname,
        id: _.uid,
        fans: _.followersCount,
        description: _.description,
        avatar: _.logoPic,
        worksNum: _.tracksCount
    };
}
function $58644d094b049802$export$4141752cc74ed82e(_, type) {
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
function $58644d094b049802$export$4135fdd7029f141(raw) {
    return !raw.priceTypes?.length;
}
function $58644d094b049802$export$ed4cedad8375a67(raw) {
    return raw.tag === 0 || raw.isPaid === false || parseFloat(raw.price) === 0;
}


/** 搜索方法 */ 



function $3b56e5e3e002c7a9$export$47fac120ab74ef02(word, sing) {
    const key = (0, ($parcel$interopDefault($b4gIH$cryptojs))).enc.Utf8.parse(sing);
    const iv = (0, ($parcel$interopDefault($b4gIH$cryptojs))).enc.Utf8.parse("k1y2a3b4r5t6c7q7");
    var encrypted = (0, ($parcel$interopDefault($b4gIH$cryptojs))).AES.encrypt(word, key, {
        iv: iv,
        mode: (0, ($parcel$interopDefault($b4gIH$cryptojs))).mode.CBC,
        padding: (0, ($parcel$interopDefault($b4gIH$cryptojs))).pad.Pkcs7
    });
    var ciphertext = encrypted.ciphertext.toString((0, ($parcel$interopDefault($b4gIH$cryptojs))).enc.Hex);
    return ciphertext.toUpperCase();
}
async function $3b56e5e3e002c7a9$export$bd6d310eff940ae4(url, sing, word) {
    var html = (0, ($parcel$interopDefault($b4gIH$axios))).get(url, {
        params: {},
        headers: {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61"
        }
    });
    return html;
}


async function $4c064be0763766ac$var$searchBase(query, page, type) {
    var sing = (0, ($parcel$interopDefault($b4gIH$cryptojs))).MD5(query + "0" + type + "7c1a11ed25a53751710b51123a4fdc6b").toString().toUpperCase();
    var word = JSON.stringify({
        "act": "search",
        "type": type,
        "keywords": encodeURIComponent(query),
        "keytype": "0"
    }); //log(word)
    var html = await (0, $3b56e5e3e002c7a9$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var data = html.data;
    return data;
}
async function $4c064be0763766ac$var$searchMusic(query, page) {
    var res = (await $4c064be0763766ac$var$searchBase(query, page, "netease")).lists;
    res.concat((await $4c064be0763766ac$var$searchBase(query, page, "qq")).lists);
    return {
        isEnd: true,
        data: res.map((0, $58644d094b049802$export$d7bdacb66077735f))
    };
}
async function $4c064be0763766ac$var$searchAlbum(query, page) {
    /*const res = (await searchBase(query, page, "album")).data.album;
  return {
    isEnd: true,
    data: res.map(formatMusicItem),
  };*/ return {};
}
async function $4c064be0763766ac$var$searchArtist(query, page) {
    /*const res = (await searchBase(query, page, "user")).data.user;
  return {
    isEnd: true,
    data: res.map(formatMusicItem),
  };*/ return {};
}
async function $4c064be0763766ac$export$2e2bcd8739ae039(query, page, type) {
    if (type === "music") return $4c064be0763766ac$var$searchMusic(query, page);
/*  else if (type === "album") {
    return searchAlbum(query, page);
  } else if (type === "artist") {
    return searchArtist(query, page);
  }*/ }




async function $f5e7c9d2c410c047$export$2e2bcd8739ae039(artistItem, page, type) {
    if (type === "music") {
        const res = (await (0, ($parcel$interopDefault($b4gIH$axios))).get("https://www.ximalaya.com/revision/user/track", {
            params: {
                page: page,
                pageSize: 30,
                uid: artistItem.id
            }
        })).data.data;
        return {
            isEnd: res.page * res.pageSize >= res.totalCount,
            data: res.trackList.filter((0, $58644d094b049802$export$ed4cedad8375a67)).map((_)=>({
                    ...(0, $58644d094b049802$export$d7bdacb66077735f)(_),
                    artist: artistItem.name
                }))
        };
    } else {
        const res = (await (0, ($parcel$interopDefault($b4gIH$axios))).get("https://www.ximalaya.com/revision/user/pub", {
            params: {
                page: page,
                pageSize: 30,
                uid: artistItem.id
            }
        })).data.data;
        return {
            isEnd: res.page * res.pageSize >= res.totalCount,
            data: res.albumList.filter((0, $58644d094b049802$export$4135fdd7029f141)).map((_)=>({
                    ...(0, $58644d094b049802$export$ed1fb53032701881)(_),
                    artist: artistItem.name
                }))
        };
    }
}





/** 获取专辑详情 */ async function $763969d143e9f3b7$var$getAlbumInfo(albumItem, page = 1) {
    const res = await (0, ($parcel$interopDefault($b4gIH$axios))).get("https://www.ximalaya.com/revision/album/v1/getTracksList", {
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
        musicList: res.data.data.tracks.filter((0, $58644d094b049802$export$ed4cedad8375a67)).map((_)=>{
            const r = (0, $58644d094b049802$export$d7bdacb66077735f)(_);
            r.artwork = albumItem.artwork;
            r.artist = albumItem.artist;
            return r;
        })
    };
}
/** 获取音乐源 */ async function $763969d143e9f3b7$var$getLyric(musicItem) {
    let res = await $763969d143e9f3b7$var$getMediaSource(musicItem, "standard");
    if (res.lysic) return {
        rawLrc: res.lysic
    };
}
/** 获取音乐源 */ async function $763969d143e9f3b7$var$getMediaSource(musicItem, quality) {
    var yinzhi = "128";
    if (quality == "high") yinzhi = "320";
    else if (quality == "super" && musicItem.type == "netease") yinzhi = "1411";
    else if (quality == "super" && musicItem.type == "qq") yinzhi = "sq";
    var songid = musicItem.id;
    var strmid = musicItem.strmid;
    var type = musicItem.type;
    var sing = (0, ($parcel$interopDefault($b4gIH$cryptojs))).MD5(songid + yinzhi + strmid + type + "7c1a11ed25a53751710b51123a4fdc6bmusic").toString().toUpperCase(); //log(sing)
    var word = JSON.stringify({
        "act": "musicurl",
        "type": type,
        "songid": songid,
        "strmid": strmid,
        "file": yinzhi
    }); //log(word)
    var html = await (0, $3b56e5e3e002c7a9$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var play = html.data.data.url;
    if (play == "false") return {};
    else return {
        url: play,
        lysic: html.data.data.lysic,
        quality: quality
    };
}
async function $763969d143e9f3b7$var$getTopLists() {
    var result = [];
    const dataNetease = await (0, ($parcel$interopDefault($b4gIH$axios))).get("https://api.tyhua.top/toplist/detail", {
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
            const r = (0, $58644d094b049802$export$4141752cc74ed82e)(_, "netease");
            r.act = "toplist";
            return r;
        })
    });
    var html = await (0, ($parcel$interopDefault($b4gIH$axios))).get("https://c.y.qq.com/node/pc/wk_v15/top.html", {
        headers: {
            referer: `https://c.y.qq.com`,
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61"
        }
    });
    const $ = $b4gIH$cheerio.load(html.data);
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
async function $763969d143e9f3b7$var$getTopListDetail(sheetItem, page = 1) {
    var result;
    result = {
        ...sheetItem
    };
    const act = sheetItem.act;
    const id = sheetItem.id;
    const type = sheetItem.type;
    var sing = (0, ($parcel$interopDefault($b4gIH$cryptojs))).MD5(id + type + "7c1a11ed25a53751710b51123a4fdc6b").toString().toUpperCase(); //log(sing)
    var word = JSON.stringify({
        "act": act,
        "type": type,
        "id": id
    });
    const html = await (0, $3b56e5e3e002c7a9$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var list = html.data.songs;
    result.musicList = list.map((_)=>{
        const r = (0, $58644d094b049802$export$d7bdacb66077735f)(_);
        r.type = type;
        return r;
    });
    return result;
}
async function $763969d143e9f3b7$var$getRecommendSheetTags() {
    var result = {};
    return result;
}
async function $763969d143e9f3b7$var$getRecommendSheetsByTag(tag, page) {
    var result = {};
    var html = await (0, ($parcel$interopDefault($b4gIH$axios)))("http://t.ijanz.cn/at.php?act=personalized", {
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
        const r = (0, $58644d094b049802$export$4141752cc74ed82e)(_, "");
        r.act = "playlist";
        return r;
    });
    result.isEnd = true;
    return result;
}
async function $763969d143e9f3b7$var$getMusicSheetInfo(sheetItem, page) {
    var result = {};
    result = {
        ...sheetItem
    };
    const act = sheetItem.act;
    const id = sheetItem.id;
    const type = sheetItem.type;
    var sing = (0, ($parcel$interopDefault($b4gIH$cryptojs))).MD5(id + type + "7c1a11ed25a53751710b51123a4fdc6b").toString().toUpperCase(); //log(sing)
    var word = JSON.stringify({
        "act": act,
        "type": type,
        "id": id
    });
    const html = await (0, $3b56e5e3e002c7a9$export$bd6d310eff940ae4)("http://t.ijanz.cn/mt.php", sing, word);
    var list = html.data.songs;
    result.musicList = list.map((_)=>{
        const r = (0, $58644d094b049802$export$d7bdacb66077735f)(_);
        r.type = type;
        return r;
    });
    result.isEnd = true;
    return result;
}
const $763969d143e9f3b7$var$pluginInstance = {
    platform: "种子",
    version: "0.0.5",
    author: "SoEasy同学",
    srcUrl: "https://gitee.com/kevinr/tvbox/raw/master/musicfree/plugins/zhongzi.js",
    supportedSearchType: [
        "music",
        "album",
        "artist"
    ],
    search: $4c064be0763766ac$export$2e2bcd8739ae039,
    getMediaSource: $763969d143e9f3b7$var$getMediaSource,
    getLyric: $763969d143e9f3b7$var$getLyric,
    getAlbumInfo: $763969d143e9f3b7$var$getAlbumInfo,
    getArtistWorks: $f5e7c9d2c410c047$export$2e2bcd8739ae039,
    getTopLists: $763969d143e9f3b7$var$getTopLists,
    getTopListDetail: $763969d143e9f3b7$var$getTopListDetail,
    getRecommendSheetTags: $763969d143e9f3b7$var$getRecommendSheetTags,
    getRecommendSheetsByTag: $763969d143e9f3b7$var$getRecommendSheetsByTag,
    getMusicSheetInfo: $763969d143e9f3b7$var$getMusicSheetInfo
};
(0, $4c064be0763766ac$export$2e2bcd8739ae039)("童话镇", 1, "music").then((res)=>{
    $763969d143e9f3b7$var$getMediaSource(res.data[0], "standard").then((res)=>{
        console.log(res);
    });
    $763969d143e9f3b7$var$getLyric(res.data[0]).then((res)=>{
        console.log(res);
    });
});
$763969d143e9f3b7$var$getRecommendSheetsByTag({
    id: ""
}, 1).then((res)=>{
    $763969d143e9f3b7$var$getMusicSheetInfo(res.data[0], 0).then((res)=>{
        console.log(res);
        $763969d143e9f3b7$var$getMediaSource(res.musicList[0], "standard").then((res)=>{
            console.log(res);
        });
        $763969d143e9f3b7$var$getLyric(res.musicList[0]).then((res)=>{
            console.log(res);
        });
    });
});
$763969d143e9f3b7$var$getTopLists().then((res)=>{
    console.log(res);
    $763969d143e9f3b7$var$getTopListDetail(res[1].data[0]).then((res)=>{
        console.log(res);
        $763969d143e9f3b7$var$getMediaSource(res.musicList[0], "standard").then((res)=>{
            console.log(res);
        });
        $763969d143e9f3b7$var$getLyric(res.musicList[0]).then((res)=>{
            console.log(res);
        });
    });
});
var $763969d143e9f3b7$export$2e2bcd8739ae039 = $763969d143e9f3b7$var$pluginInstance;


//# sourceMappingURL=zhongzi.js.map
