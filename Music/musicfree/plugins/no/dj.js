var $dlrpj$buffer = require("buffer");
var $dlrpj$axios = require("axios");
var $dlrpj$cheerio = require("cheerio");
var $dlrpj$iconvlite = require("iconv-lite");
var $dlrpj$dayjs = require("dayjs");
var $dlrpj$cryptojs = require("crypto-js");

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

$parcel$export(module.exports, "default", () => $7d1b3e96f786a0b6$export$2e2bcd8739ae039);
/** 搜索方法 */ 



var $cfa2b1a02a7219b6$require$Buffer = $dlrpj$buffer.Buffer;
function $cfa2b1a02a7219b6$var$encodeGBK(url) {
    // 将字符串转换为GBK编码的Buffer
    const buffer = (0, ($parcel$interopDefault($dlrpj$iconvlite))).encode(url, "gbk");
    // 对每个字节进行URL编码
    let encodedUrl = "";
    for(let i = 0; i < buffer.length; i++)encodedUrl += "%" + buffer[i].toString(16).toUpperCase().padStart(2, "0");
    return encodedUrl;
}
async function $cfa2b1a02a7219b6$var$searchMusic(query, page) {
    var res = [];
    var wd = $cfa2b1a02a7219b6$var$encodeGBK(query);
    var serchUrl = "http://www.dj.net/search.php?mod=music&formhash=ff41cec6&srchtxt=" + wd + "&searchsubmit=yes";
    let searchRes = (await (0, ($parcel$interopDefault($dlrpj$axios))).get(serchUrl, {
        responseType: "arraybuffer",
        headers: {
            "Accept-Charset": "GBK,utf-8;q=0.7,*;q=0.3"
        },
        maxRedirects: 1,
        timeout: 5000
    })).data;
    // 将二进制数据转换为GBK编码的字符串
    const gbkBuffer = $cfa2b1a02a7219b6$require$Buffer.from(searchRes, "binary");
    searchRes = (0, ($parcel$interopDefault($dlrpj$iconvlite))).decode(gbkBuffer, "gbk");
    const $ = $dlrpj$cheerio.load(searchRes);
    var rowList = $("#Tbs").find("tr").slice(1);
    for(let i = 0; i < rowList.length; i++){
        var id = $(rowList[i]).find("a").attr("href").match(/\/music(\d+).html/)[1];
        var title = $(rowList[i]).find("a").eq(0).text().toString().trim();
        res.push({
            id: id,
            platform: "dj音乐",
            title: title
        });
    }
    return {
        isEnd: true,
        data: res
    };
}
async function $cfa2b1a02a7219b6$export$2e2bcd8739ae039(query, page, type) {
    if (type === "music") return $cfa2b1a02a7219b6$var$searchMusic(query, page);
}






function $25bb9f4f6c02bf42$export$47fac120ab74ef02(word, sing) {
    const key = (0, ($parcel$interopDefault($dlrpj$cryptojs))).enc.Utf8.parse(sing);
    const iv = (0, ($parcel$interopDefault($dlrpj$cryptojs))).enc.Utf8.parse("k1y2a3b4r5t6c7q7");
    var encrypted = (0, ($parcel$interopDefault($dlrpj$cryptojs))).AES.encrypt(word, key, {
        iv: iv,
        mode: (0, ($parcel$interopDefault($dlrpj$cryptojs))).mode.CBC,
        padding: (0, ($parcel$interopDefault($dlrpj$cryptojs))).pad.Pkcs7
    });
    var ciphertext = encrypted.ciphertext.toString((0, ($parcel$interopDefault($dlrpj$cryptojs))).enc.Hex);
    return ciphertext.toUpperCase();
}
async function $25bb9f4f6c02bf42$export$bd6d310eff940ae4(url, params) {
    //请求函数
    var html = (0, ($parcel$interopDefault($dlrpj$axios))).get(url, {
        params: params,
        headers: {
            accept: "*/*",
            "accept-encoding": "gzip, deflate, br",
            "user-agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/109.0.0.0 Safari/537.36 Edg/109.0.1518.61"
        }
    });
    return html;
}
function $25bb9f4f6c02bf42$export$76cd2546cd31fda2(timeStr) {
    try {
        // 分离小时和分钟
        const times = timeStr.split(":");
        if (times.length == 2) {
            const [minutes, second] = timeStr.split(":").map(Number);
            const minutesInSeconds = minutes * 60;
            return minutesInSeconds + second;
        } else if (times.length == 3) {
            const [hours, minutes, second] = timeStr.split(":").map(Number);
            const hoursInSeconds = minutes * 3600;
            const minutesInSeconds = minutes * 60;
            return hoursInSeconds + minutesInSeconds + second;
        }
    } catch (e) {
        return 0;
    }
    return 0;
}


function $2e4561a83f406804$export$d7bdacb66077735f(_) {
    return {
        id: _.id,
        platform: "种子",
        artist: _.sname,
        title: _.mname,
        album: _.pic,
        duration: (0, $25bb9f4f6c02bf42$export$76cd2546cd31fda2)(_.play_time),
        artwork: _.pic,
        url: _.mp3
    };
}
function $2e4561a83f406804$export$ed1fb53032701881(_) {
    return {
        id: _.albumId ?? _.id,
        artist: _.nickname,
        title: _.title,
        artwork: _.coverPath?.startsWith("//") ? `https:${_.coverPath}` : _.coverPath,
        description: _.intro ?? _.description,
        date: _.updatedAt ? (0, ($parcel$interopDefault($dlrpj$dayjs)))(_.updatedAt).format("YYYY-MM-DD") : null
    };
}
function $2e4561a83f406804$export$d08aae127141ee12(_) {
    return {
        name: _.nickname,
        id: _.uid,
        fans: _.followersCount,
        description: _.description,
        avatar: _.logoPic,
        worksNum: _.tracksCount
    };
}
function $2e4561a83f406804$export$4141752cc74ed82e(_) {
    return {
        id: _.id,
        platform: "岸听",
        artwork: _.coverImgUrl ?? _.pic,
        title: _.name,
        description: _.description,
        worksNum: _.trackCount
    };
}
function $2e4561a83f406804$export$fa5f2f9db37e5217(page, tag, first, list) {
    return {
        id: tag.id,
        artist: first.sname,
        title: first.mname,
        artwork: first.pic,
        musicList: list.map((_)=>{
            const r = $2e4561a83f406804$export$d7bdacb66077735f(_);
            return r;
        })
    };
}
function $2e4561a83f406804$export$4135fdd7029f141(raw) {
    return !raw.priceTypes?.length;
}
function $2e4561a83f406804$export$ed4cedad8375a67(raw) {
    return raw.tag === 0 || raw.isPaid === false || parseFloat(raw.price) === 0;
}






var $7d1b3e96f786a0b6$require$Buffer = $dlrpj$buffer.Buffer;
/** 获取专辑详情 */ async function $7d1b3e96f786a0b6$var$getAlbumInfo(albumItem, page = 1) {
    const res = await (0, ($parcel$interopDefault($dlrpj$axios))).get("https://www.ximalaya.com/revision/album/v1/getTracksList", {
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
        musicList: res.data.data.tracks.filter((0, $2e4561a83f406804$export$ed4cedad8375a67)).map((_)=>{
            const r = (0, $2e4561a83f406804$export$d7bdacb66077735f)(_);
            r.artwork = albumItem.artwork;
            r.artist = albumItem.artist;
            return r;
        })
    };
}
/** 获取专辑详情 */ async function $7d1b3e96f786a0b6$var$getLyric(musicItem) {
    return {
        rawLrc: "DJ音乐没有歌词，你想要什么歌词嘛！"
    };
}
/** 获取专辑详情 */ async function $7d1b3e96f786a0b6$var$getMediaSource(musicItem, quality) {
    //     input = input.replace(/.*?(\d+)\.html/, 'https://www.dj.net/template/zhzh_dzmusic/ajax/?action=geturl&id=$1')
    //     var json = JSON.parse(request(input)).data
    //     //log(json);
    //     url = request(input).match(/"u":"(.*?)"/)[1]
    //     urll = request(input).match(/src":"(.*?)"/)[1]
    //     return url + urll
    var getUrl = "http://www.dj.net/template/zhzh_dzmusic/ajax/?action=geturl&id=" + musicItem.id;
    let html = (await (0, ($parcel$interopDefault($dlrpj$axios))).get(getUrl, {
        responseType: "arraybuffer",
        headers: {
            "Accept-Charset": "GBK,utf-8;q=0.7,*;q=0.3"
        },
        timeout: 5000
    })).data;
    // 将二进制数据转换为GBK编码的字符串
    const gbkBuffer = $7d1b3e96f786a0b6$require$Buffer.from(html, "binary");
    html = (0, ($parcel$interopDefault($dlrpj$iconvlite))).decode(gbkBuffer, "gbk");
    const data = JSON.parse(html).data[0];
    return {
        url: data.ser[0].u + data.src,
        quality: quality
    };
}
async function $7d1b3e96f786a0b6$var$getTopLists() {
    var result = [];
    const html = await (0, $25bb9f4f6c02bf42$export$bd6d310eff940ae4)("https://zz123.com", {});
    const $ = $dlrpj$cheerio.load(html.data);
    const tops = $(".d-none .cate-list a").get();
    var lists = [];
    for(var i in tops)lists.push({
        id: $(tops[i]).attr("href").match(/\/list\/(\w+)\.htm/)[1],
        title: $(tops[i]).text()
    });
    result.push({
        title: "种子音乐",
        data: lists
    });
    // return
    return result;
}
async function $7d1b3e96f786a0b6$var$getTopListDetail(sheetItem, page = 1) {
    var result;
    result = {
        ...sheetItem
    };
    const id = sheetItem.id;
    const html = await (0, $25bb9f4f6c02bf42$export$bd6d310eff940ae4)("https://zz123.com/ajax/", {
        act: "tag_music",
        tid: id,
        lang: "",
        page: 1
    });
    var list = html.data.data;
    result.musicList = list.map((_)=>{
        const r = (0, $2e4561a83f406804$export$d7bdacb66077735f)(_);
        return r;
    });
    const html2 = await (0, $25bb9f4f6c02bf42$export$bd6d310eff940ae4)("https://zz123.com/ajax/", {
        act: "tag_music",
        tid: id,
        lang: "",
        page: 2
    });
    var list2 = html2.data.data;
    result.musicList = result.musicList.concat(list2.map((_)=>{
        const r = (0, $2e4561a83f406804$export$d7bdacb66077735f)(_);
        return r;
    }));
    return result;
}
async function $7d1b3e96f786a0b6$var$getRecommendSheetTags() {
    var result = {};
    const html = await (0, $25bb9f4f6c02bf42$export$bd6d310eff940ae4)("https://www.dj.net/album-all-1.html", {});
    const $ = $dlrpj$cheerio.load(html.data);
    const menus = $("#slide dl").get();
    var lists = [];
    for(var i in menus)lists.push({
        id: $(menus[i]).find("a").attr("href").match(/\/list\/(\w+)\.htm/)[1],
        title: $(menus[i]).find("a span").text()
    });
    result.pinned = lists;
    var datas = [];
    datas.push({
        title: "",
        data: lists
    });
    result.data = datas;
    return result;
}
async function $7d1b3e96f786a0b6$var$getRecommendSheetsByTag(tag, page) {
    var result = {};
    let size = 50;
    var datas = [];
    var num = 1;
    while(size == 50 && num <= 10){
        const html = await (0, $25bb9f4f6c02bf42$export$bd6d310eff940ae4)("https://zz123.com/ajax/", {
            act: "tag_music",
            tid: tag.id || "azz",
            lang: "",
            page: (page - 1) * 10 + num
        });
        const list = html.data.data;
        if (list.length > 0) {
            const first = list[0];
            datas.push((0, $2e4561a83f406804$export$fa5f2f9db37e5217)(page, tag, first, list));
        }
        size = list.length;
        num++;
        if (num == 10 && size == 50) result.isEnd = false;
    }
    result.data = datas;
    return result;
}
async function $7d1b3e96f786a0b6$var$getMusicSheetInfo(sheetItem, page) {
    var result = {};
    result.sheetItem = sheetItem;
    /*    const html = await getHtml("https://zz123.com/ajax/", {
            act: "tag_music",
            tid: sheetItem.id,
            lang: "",
            page: sheetItem.page
        });
        const list = html.data.data;*/ result.musicList = sheetItem.musicList;
    result.isEnd = true;
    return result;
}
const $7d1b3e96f786a0b6$var$pluginInstance = {
    platform: "dj音乐",
    version: "0.0.1",
    author: "SoEasy同学",
    srcUrl: "https://gitee.com/kevinr/tvbox/raw/master/musicfree/plugins/dj.js",
    supportedSearchType: [
        "music"
    ],
    search: $cfa2b1a02a7219b6$export$2e2bcd8739ae039,
    getMediaSource: $7d1b3e96f786a0b6$var$getMediaSource,
    getLyric: $7d1b3e96f786a0b6$var$getLyric
};
var /*search("张碧晨", 1, "music").then((res) => {
    console.log(res)
    getMediaSource(res.data[0], "standard").then((res) => {
        console.log(res)
    })
    getLyric(res.data[0]).then((res) => {
        console.log(res)
    })
})*/ /*getRecommendSheetTags().then((res) => {
    console.log(res)
    getRecommendSheetsByTag(res.pinned[0], 1).then((res) => {
        console.log(res)
        getMusicSheetInfo(res.data[0], 1).then((res) => {
            console.log(res);
            getMediaSource(res.musicList[0], "standard").then((res) => {
                console.log(res)
            })
            getLyric(res.musicList[0]).then((res) => {
                console.log(res)
            })
        })
    })
})*/ /*getTopLists().then((res) => {
    console.log(res)
    getTopListDetail(res[0].data[0]).then((res) => {
        console.log(res)
        getMediaSource(res.musicList[0], "standard").then((res) => {
            console.log(res)
        })
        getLyric(res.musicList[0]).then((res) => {
            console.log(res)
        })
    })
})*/ $7d1b3e96f786a0b6$export$2e2bcd8739ae039 = $7d1b3e96f786a0b6$var$pluginInstance;


//# sourceMappingURL=dj.js.map
