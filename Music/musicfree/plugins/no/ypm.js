var $gTFkd$axios = require("axios");
var $gTFkd$cheerio = require("cheerio");

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

$parcel$export(module.exports, "host", () => $08418e9a1c4e3347$export$5e032988b71f6158);
$parcel$export(module.exports, "pageSize", () => $08418e9a1c4e3347$export$3a40bd8b0ff0173c);
$parcel$export(module.exports, "default", () => $08418e9a1c4e3347$export$2e2bcd8739ae039);
/** 搜索方法 */ 
async function $2887e7b8a98e2612$export$c55fd7b1d7fa3710(raw_data, separator) {
    const $ = $gTFkd$cheerio.load(raw_data);
    const rawPlayList = $("div.play_list").find("li");
    var list = [];
    for(let i = 0; i < rawPlayList.length; i++){
        const item = $(rawPlayList[i]).find("a");
        let id = $(item[0]).attr("href").match(/\/song\/(.*?).html/)[1];
        let separatedText = $(item[0]).text().split(separator);
        let title = separatedText[0] // 通过分隔符区分歌手和歌名
        ;
        let artist = separatedText[1] != "" ? separatedText[1] : separatedText[2];
        list.push({
            id: id,
            title: title,
            artist: artist
        });
    }
    return list;
}
async function $2887e7b8a98e2612$export$d88d07b680eb6fd1(html) {}
async function $2887e7b8a98e2612$export$5f54ed25dd7fe25e(html) {
    const $ = $gTFkd$cheerio.load(html);
    const rawPlayList = $("div.ilingku_fl").find("li");
    const pageData = $("div.pagedata").text();
    let topListArr = [];
    topListArr.push({
        id: "new",
        title: "新歌榜",
        description: "每日同步官方数据。" + pageData
    }, {
        id: "top",
        title: "飙升榜",
        description: "每日同步官方数据。" + pageData
    });
    for(let i = 0; i < rawPlayList.length; i++){
        const item = $(rawPlayList[i]).find("a");
        let href = $(item[0]).attr("href").match(/\/list\/(.*?).html/)[1];
        let title = $(item[0]).text();
        topListArr.push({
            id: href,
            title: title,
            description: "每日同步官方数据：" + pageData
        });
    }
    return topListArr;
}
function $2887e7b8a98e2612$export$d7bdacb66077735f(_) {
    return {
        id: _.id,
        artist: _.artists && _.artists.length > 0 ? _.artists[0].name : "",
        title: _.name,
        album: _.album && _.album.name ? _.album.name : "",
        duration: _.duration || Number(_.dt) / 1000
    };
}
function $2887e7b8a98e2612$export$aebc652701268ce5(_) {
    return {
        id: _.id,
        artist: _.ar && _.ar.length > 0 ? _.ar[0].name : "",
        title: _.name,
        album: _.al && _.al.name ? _.al.name : "",
        duration: _.duration || Number(_.dt) / 1000
    };
}
function $2887e7b8a98e2612$export$ed4cedad8375a67(raw) {
    return raw.fee !== 1;
}
function $2887e7b8a98e2612$export$d08aae127141ee12(_) {
    return {
        id: _.id,
        name: _.name,
        avatar: _.img1v1Url,
        worksNum: _.albumSize
    };
}
function $2887e7b8a98e2612$export$4141752cc74ed82e(_) {
    return {
        id: _.id,
        title: _.name,
        artist: _.artist && _.artist.name ? _.artist.name : "",
        artwork: _.blurPicUrl || _.coverImgUrl || _.picUrl || "",
        createAt: _.publishTime,
        description: _.description || ""
    };
}




async function $58d4212924536e0d$var$searchMusic(query, page) {
    let keyword = encodeURIComponent(query);
    let offset = (page - 1) * (0, $08418e9a1c4e3347$export$3a40bd8b0ff0173c);
    let serchUrl = (0, $08418e9a1c4e3347$export$5e032988b71f6158) + "/api/search?keywords=" + keyword + "&type=1&offset=" + offset + "&realIP=211.161.244.70";
    let searchRes = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(serchUrl, {
        timeout: 5000
    })).data;
    let songList = searchRes.result.songs;
    const songs = songList.filter((0, $2887e7b8a98e2612$export$ed4cedad8375a67)).map((0, $2887e7b8a98e2612$export$d7bdacb66077735f));
    return {
        isEnd: searchRes.result.hasMore == false,
        data: songs
    };
}
async function $58d4212924536e0d$var$searchAlbum(query, page) {
    let keyword = encodeURIComponent(query);
    let offset = (page - 1) * (0, $08418e9a1c4e3347$export$3a40bd8b0ff0173c);
    let serchUrl = (0, $08418e9a1c4e3347$export$5e032988b71f6158) + "/api/search?keywords=" + keyword + "&type=10&offset=" + offset + "&realIP=211.161.244.70";
    let searchRes = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(serchUrl, {
        timeout: 5000
    })).data;
    let albumList = searchRes.result.albums;
    const albums = albumList.map((0, $2887e7b8a98e2612$export$4141752cc74ed82e));
    return {
        isEnd: searchRes.result.hasMore == false,
        data: albums
    };
}
async function $58d4212924536e0d$var$searchArtist(query, page) {
    let keyword = encodeURIComponent(query);
    let offset = (page - 1) * (0, $08418e9a1c4e3347$export$3a40bd8b0ff0173c);
    let serchUrl = (0, $08418e9a1c4e3347$export$5e032988b71f6158) + "/api/search?keywords=" + keyword + "&type=100&offset=" + offset + "&realIP=211.161.244.70";
    let searchRes = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(serchUrl, {
        timeout: 5000
    })).data;
    let artistList = searchRes.result.artists;
    const artists = artistList.map((0, $2887e7b8a98e2612$export$d08aae127141ee12));
    return {
        isEnd: searchRes.result.hasMore == false,
        data: artists
    };
}
async function $58d4212924536e0d$var$searchSheet(query, page) {
    let keyword = encodeURIComponent(query);
    let offset = (page - 1) * (0, $08418e9a1c4e3347$export$3a40bd8b0ff0173c);
    let serchUrl = (0, $08418e9a1c4e3347$export$5e032988b71f6158) + "/api/search?keywords=" + keyword + "&type=1000&offset=" + offset + "&realIP=211.161.244.70";
    let searchRes = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(serchUrl, {
        timeout: 5000
    })).data;
    let sheetList = searchRes.result.playlists;
    const sheets = sheetList.map((0, $2887e7b8a98e2612$export$4141752cc74ed82e));
    return {
        isEnd: searchRes.result.hasMore == false,
        data: sheets
    };
}
async function $58d4212924536e0d$export$2e2bcd8739ae039(query, page, type) {
    if (type === "music") return $58d4212924536e0d$var$searchMusic(query, page);
    else if (type === "album") return $58d4212924536e0d$var$searchAlbum(query, page);
    else if (type === "artist") return $58d4212924536e0d$var$searchArtist(query, page);
    else if (type === "sheet") return $58d4212924536e0d$var$searchSheet(query, page);
}







async function $ffd716fa25e71f6b$export$2e2bcd8739ae039(artistItem, page, type) {
    if (type === "music") {
        var searchUrl = (0, $08418e9a1c4e3347$export$5e032988b71f6158) + "/api/artists?id=" + artistItem.id + "&realIP=211.161.244.70";
        const res = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
            params: {}
        })).data;
        return {
            isEnd: true,
            data: res.hotSongs.filter((0, $2887e7b8a98e2612$export$ed4cedad8375a67)).map((0, $2887e7b8a98e2612$export$aebc652701268ce5))
        };
    } else {
        var limit = page * 200;
        var searchUrl = (0, $08418e9a1c4e3347$export$5e032988b71f6158) + "/api/artist/album?id=" + artistItem.id + "&limit=" + limit + "&realIP=211.161.244.70";
        const res = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
            params: {}
        })).data;
        return {
            isEnd: res.more == false,
            data: res.hotAlbums.map((0, $2887e7b8a98e2612$export$4141752cc74ed82e))
        };
    }
}



const $08418e9a1c4e3347$export$5e032988b71f6158 = "http://t4.540734621.xyz:8082";
const $08418e9a1c4e3347$export$3a40bd8b0ff0173c = 30;
async function $08418e9a1c4e3347$var$getAlbumInfo(albumItem, page) {
    var result = {
        albumItem: albumItem
    };
    var searchUrl = $08418e9a1c4e3347$export$5e032988b71f6158 + "/api/album?id=" + albumItem.id + "&realIP=211.161.244.70";
    let searchRes = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
        timeout: 5000
    })).data;
    result.musicList = searchRes.songs.filter((raw)=>{
        return !(raw.fee == 1 || raw.fee == 0 && raw.noCopyrightRcmd !== null);
    }).map((0, $2887e7b8a98e2612$export$aebc652701268ce5));
    return result;
}
async function $08418e9a1c4e3347$var$getMusicSheetInfo(sheetItem, page) {
    try {
        var result = {
            sheetItem: sheetItem
        };
        var searchUrl = $08418e9a1c4e3347$export$5e032988b71f6158 + "/api/playlist/detail?id=" + sheetItem.id + "&realIP=211.161.244.70";
        let searchRes = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
            timeout: 5000
        })).data;
        result.musicList = searchRes.playlist.tracks.filter((0, $2887e7b8a98e2612$export$ed4cedad8375a67)).map((0, $2887e7b8a98e2612$export$aebc652701268ce5));
    } catch (e) {}
    return result;
}
async function $08418e9a1c4e3347$var$getMediaSource(musicItem, quality) {
    return {
        url: "https://music.163.com/song/media/outer/url?id=" + musicItem.id
    };
}
async function $08418e9a1c4e3347$var$getLyric(musicItem) {
    let searchUrl = $08418e9a1c4e3347$export$5e032988b71f6158 + "/api/lyric?id=" + musicItem.id + "&realIP=211.161.244.70";
    let searchRes = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
        timeout: 5000
    })).data;
    let lrc = searchRes.lrc.lyric;
    return {
        rawLrc: lrc
    };
}
async function $08418e9a1c4e3347$var$getTopLists() {
    const toplist = (await (0, ($parcel$interopDefault($gTFkd$axios))).get($08418e9a1c4e3347$export$5e032988b71f6158 + "/api/toplist?realIP=211.161.244.70", {
        timeout: 5000
    })).data;
    return [
        {
            title: "排行榜",
            data: toplist.list.map((_)=>{
                return {
                    id: _.id,
                    title: _.name,
                    artwork: _.coverImgUrl,
                    description: _.description
                };
            })
        }
    ];
}
async function $08418e9a1c4e3347$var$getTopListDetail(topListItem) {
    var res = {
        ...topListItem
    };
    var page = 1;
    var musicList = [];
    let urlSerch = $08418e9a1c4e3347$export$5e032988b71f6158 + "/api/playlist/detail?id=" + topListItem.id + "&realIP=211.161.244.70";
    let songList = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(urlSerch, {
        timeout: 5000
    })).data;
    musicList = songList.playlist.tracks.filter((0, $2887e7b8a98e2612$export$ed4cedad8375a67)).map((0, $2887e7b8a98e2612$export$aebc652701268ce5));
    res.musicList = musicList;
    // 翻页，最多翻3页，约200条数据
    return res;
}
async function $08418e9a1c4e3347$var$getRecommendSheetTags() {
    try {
        var result = {};
        var datas = [];
        var pinned = [];
        pinned = [
            {
                id: "全部",
                title: "全部"
            },
            {
                id: "personalized",
                title: "推荐歌单"
            },
            {
                id: "highquality",
                title: "精品歌单"
            },
            {
                id: "官方",
                title: "官方"
            }
        ];
        const html = (await (0, ($parcel$interopDefault($gTFkd$axios))).get($08418e9a1c4e3347$export$5e032988b71f6158 + "/explore", {
            timeout: 5000
        })).data;
        const $ = $gTFkd$cheerio.load(html);
        var index = $("link").filter((index, item)=>{
            return $(item).attr("href").toString().startsWith("/js/index.");
        }).attr("href");
        const indexHtml = (await (0, ($parcel$interopDefault($gTFkd$axios))).get($08418e9a1c4e3347$export$5e032988b71f6158 + index, {
            timeout: 5000
        })).data;
        const $indexHtml = $gTFkd$cheerio.load(indexHtml);
        // bigCat: "static"
        //         }, XXX]
        const regex = /"排行榜",enable:!0,bigCat:"static"},(.*?)\]/s;
        var match = indexHtml.match(regex) ? indexHtml.match(regex)[1] : "";
        match = match.replaceAll("name", '"name"').replaceAll("enable:!1,", "").replaceAll("enable:!0,", "").replaceAll("bigCat", '"bigCat"');
        var tagList = JSON.parse("[" + match + "]");
        for(let i = 0; i < tagList.length; i++){
            const name = tagList[i].name;
            const bigCat = tagList[i].bigCat;
            var temp = {};
            temp.title = bigCat;
            if (datas.some((item)=>item.title === bigCat)) datas.filter((item)=>item.title === bigCat)[0].data.push({
                id: name,
                title: name
            });
            else {
                temp.data = [
                    {
                        id: name,
                        title: name
                    }
                ];
                datas.push(temp);
            }
        }
        result.data = datas;
        result.pinned = pinned;
        return result;
    } catch (e) {
        console.log(e);
    }
    return {};
}
async function $08418e9a1c4e3347$var$getRecommendSheetsByTag(tag, page) {
    try {
        var result = {};
        var sheets = [];
        var id = tag.id;
        var searchUrl = "";
        var limit = page * 50;
        var offset = (page - 1) * 50;
        if (id == "personalized") {
            searchUrl = $08418e9a1c4e3347$export$5e032988b71f6158 + "/api/personalized?limit=100&realIP=211.161.244.70";
            const json = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
                timeout: 5000
            })).data;
            sheets = json.result.map((0, $2887e7b8a98e2612$export$4141752cc74ed82e));
            result.data = sheets;
            result.isEnd = true;
        } else if (id == "highquality") {
            searchUrl = $08418e9a1c4e3347$export$5e032988b71f6158 + "/api/top/playlist/highquality?limit=" + limit + "&before=0&realIP=211.161.244.70";
            const json = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
                timeout: 5000
            })).data;
            sheets = json.playlists.map((0, $2887e7b8a98e2612$export$4141752cc74ed82e));
            result.data = sheets;
            result.isEnd = json.more == false;
        } else {
            if (id == "") id = "全部";
            searchUrl = $08418e9a1c4e3347$export$5e032988b71f6158 + "/api/top/playlist?cat=" + encodeURIComponent(id) + "&offset=" + offset + "&realIP=211.161.244.70";
            const json = (await (0, ($parcel$interopDefault($gTFkd$axios))).get(searchUrl, {
                timeout: 5000
            })).data;
            sheets = json.playlists.map((0, $2887e7b8a98e2612$export$4141752cc74ed82e));
            result.data = sheets;
            result.isEnd = json.more == false;
        }
        return result;
    } catch (e) {
        console.log(e);
    }
    return {};
}
const $08418e9a1c4e3347$var$pluginInstance = {
    platform: "YesPlayMusic",
    version: "0.1.4",
    author: "SoEasy同学",
    srcUrl: "https://gitee.com/kevinr/tvbox/raw/master/musicfree/plugins/ypm.js",
    cacheControl: "no-cache",
    supportedSearchType: [
        "music",
        "album",
        "artist",
        "sheet"
    ],
    search: $58d4212924536e0d$export$2e2bcd8739ae039,
    getAlbumInfo: $08418e9a1c4e3347$var$getAlbumInfo,
    getMusicSheetInfo: $08418e9a1c4e3347$var$getMusicSheetInfo,
    getArtistWorks: $ffd716fa25e71f6b$export$2e2bcd8739ae039,
    getMediaSource: $08418e9a1c4e3347$var$getMediaSource,
    getLyric: $08418e9a1c4e3347$var$getLyric,
    getTopLists: $08418e9a1c4e3347$var$getTopLists,
    getTopListDetail: $08418e9a1c4e3347$var$getTopListDetail,
    getRecommendSheetTags: $08418e9a1c4e3347$var$getRecommendSheetTags,
    getRecommendSheetsByTag: $08418e9a1c4e3347$var$getRecommendSheetsByTag
};
var /*search("童话镇", 1, "music").then((res) => {
    console.log(res)
    getMediaSource(res.data[0], "standard").then((res) => {
        console.log(res)
    })
    getLyric(res.data[0]).then((res) => {
        console.log(res)
    })
})*/ /*search("童话镇", 1, "album").then((res) => {
    console.log(res)
    getAlbumInfo(res.data[0], 1).then((res) => {
        console.log(res)
        getMediaSource(res.musicList[0], "standard").then((res) => {
            console.log(res)
        })
        getLyric(res.musicList[0]).then((res) => {
            console.log(res)
        })
    })
})*/ /*search("周杰伦", 1, "artist").then((res) => {
    console.log(res)
    getArtistWorks(res.data[0], 1, "music").then((res) => {
        console.log(res)
        getMediaSource(res.data[0], "standard").then((res) => {
            console.log(res)
        })
        getLyric(res.data[0]).then((res) => {
            console.log(res)
        })
    })
    getArtistWorks(res.data[0], 1, "album").then((res) => {
        console.log(res)
        getAlbumInfo(res.data[0], 1).then((res) => {
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
})*/ /*getRecommendSheetTags().then((res) => {
    console.log(res)
    getRecommendSheetsByTag(res.data[0].data[0], 1).then((res) => {
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
})*/ $08418e9a1c4e3347$export$2e2bcd8739ae039 = $08418e9a1c4e3347$var$pluginInstance;


//# sourceMappingURL=ypm.js.map
