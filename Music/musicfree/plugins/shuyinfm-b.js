"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const axios = require("axios");
const cheerio = require("cheerio");

const host = "https://www.shuyinfm.com"
const headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/116.0.0.0 Safari/537.36 Edg/116.0.1938.69",
}

async function getRecommendSheetTags() {
    try {
        var result = {};
        var datas = [];
        var pinned = [] ;
        datas.push({
            data: [{id: "1", title: "言情"}, {id: "2", title: "玄幻"}, {id: "5", title: "恐怖"}, {
                id: "7",
                title: "穿越"
            },
                {id: "8", title: "都市"}, {id: "16", title: "历史"}, {id: "33", title: "悬疑"}, {
                    id: "36",
                    title: "穿越"
                },
                {id: "38", title: "文学"}, {id: "39", title: "推理"}, {id: "40", title: "军事"}, {
                    id: "41",
                    title: "职场言情"
                },
                {id: "56", title: "反腐"}, {id: "58", title: "人物"}, {id: "60", title: "修真"}, {
                    id: "63",
                    title: "网游"
                },
                {id: "92", title: "武侠"},],
            title: "有声小说"
        })
        pinned = [].concat(datas[0].data);
        datas.push({
            data: [{id: "10", title: "耽美剧"}, {id: "12", title: "爱情剧"}, {id: "51", title: "古风剧"}, {
                id: "54",
                title: "现代剧"
            },],
            title: "广播剧"
        })
        datas.push({
            data: [{id: "42", title: "单田芳"}, {id: "43", title: "刘兰芳"}, {id: "44", title: "田连元"}, {
                id: "45",
                title: "袁阔成"
            },
                {id: "46", title: "连丽如"}, {id: "47", title: "张少佐"}, {id: "48", title: "田战义"}, {
                    id: "49",
                    title: "孙一"
                },
                {id: "50", title: "其他"}, {id: "53", title: "袁田"}, {id: "55", title: "王玥波"}, {
                    id: "57",
                    title: "郭德纲"
                },
                {id: "62", title: "关勇超"}, {id: "65", title: "王传林"},],
            title: "评书"
        })
        datas.push({
            data: [{id: "67", title: "资讯"}, {id: "68", title: "短剧"}, {id: "69", title: "娱乐"}, {
                id: "70",
                title: "音乐"
            },
                {id: "71", title: "情感"}, {id: "72", title: "搞笑"}, {id: "73", title: "相声小品"}, {
                    id: "74",
                    title: "汽车"
                },
                {id: "75", title: "公开课"}, {id: "76", title: "生活"}, {id: "77", title: "旅游"},],
            title: "车载"
        })
        datas.push({
            data: [{id: "31", title: "百家讲坛"}, {id: "35", title: "娱乐"}, {id: "59", title: "粤语"}, {
                id: "98",
                title: "音乐"
            },
                {id: "99", title: "古风"},],
            title: "其它"
        })

        /*const html = (await axios.get(host, {headers: headers})).data
        const $ = cheerio.load(html);
        var tagList = $("ul.layui-nav").find("li");
        for (let i = 0; i < tagList.length; i++) {
            const name = $(tagList[i]).find("a").text();
            const href = $(tagList[i]).find("a").attr("href");
            if (href == "/") continue
            var temp = {} as IMusic.IMusicSheetGroupItem;
            temp.title = name;
            temp.data = [];
            if (href.match(/\/\w+\//)) {
                const group = (await axios.get(host + href, {headers: headers})).data
                const group$ = cheerio.load(group);
                var secondTagList = group$("dd.clearfix").find("a")
                for (let j = 0; j < secondTagList.length; i++) {
                    var itemSecond = {
                        id: $(secondTagList[j]).attr("href"),
                        title: $(secondTagList[j]).text(),
                    } as IMusic.IMusicSheetItem
                    temp.data.push(itemSecond)
                    if (name === "有声小说") {
                        pinned.push(itemSecond)
                    }
                }
            } else {
                temp.data = [{
                    id: href,
                    title: name
                } as IMusic.IMusicSheetItem]
            }
            datas.push(temp);
        }*/
        result.data = datas;
        result.pinned = pinned;
        return result;
    } catch (e) {
        console.log(e)
    }
    return {};
}

async function getRecommendSheetsByTag(tag, page) {
    try {
        var result = {}
        var sheets = []
        var id = tag.id;
        if (id == "") {
            id = "1"
        }
        var searchUrl = host + "/listinfo-" + id + "-" + (page - 1) + ".html";
        const html = (await axios.get(searchUrl, {headers: headers, timeout: 5000})).data
        sheets = formatAlbumFromHtml(html);
        result.data = sheets;
        result.isEnd = sheets.length > 0 && sheets.length < 24;
        console.log(result)
        return result;
    } catch (e) {
        console.log(e)
    }
    return {};
}

async function getMusicSheetInfo(albumItem, page) {
    var result = {sheetItem: {}, musicList: []};
    try {
        console.log("in",albumItem)
        let ret = await getAlbumInfo(albumItem, page)
        console.log("ret", ret)
        result.sheetItem = ret.albumItem;
        result.musicList = ret.musicList
        console.log(result)
    }catch (e) {
        console.log(e)
    }
    return result;
}

async function getAlbumInfo(albumItem, page) {
    var result = {albumItem: {...albumItem}, musicList: []};
    try {
        var searchUrl = host + albumItem.id
        let searchRes = (await axios.get(searchUrl, {headers: headers})).data
        const $ = cheerio.load(searchRes);
        result.albumItem.description = $("#book_intro").find("dd").text();
        const artist = $("p.sub-tags").find("a").text()
        const fansList = $("#fansinfo").find("li");
        for (let i = 0; i < fansList.length; i++) {
            const title = $(fansList[i]).find("a").text();
            const href = $(fansList[i]).find("a").attr("href");
            result.musicList.push({id: href, title: title, artist: artist})
        }
    }catch (e) {
        console.log(e)
    }
    return result;
}

async function getMediaSource(musicItem, quality) {
    const searchUrl = host + musicItem.id;
    const html = (await axios.get(searchUrl, {headers: headers})).data
    const $ = cheerio.load(html);
    const code = $("#jp-lines").find("li").eq(0).attr("data-code");
    const path = html.match(/url : '(.*?)'/)[1];
    const tempUrl = host + path + code;
    const res = (await axios.get( tempUrl,{ headers: headers})).data
    try {
        let url = "";
        const f = axios.get(res.url,{headers: headers}).then(res2 => {
            url = res2.request.res.responseUrl
        })
        await f;
        return {
            url: url
        };
    } catch (e) {
        console.log("aaa",e.message, e.request.responseURL)
        try {
            const res3 = (await (axios.get(e.request._currentUrl,{maxRedirects: 1,headers: headers}))).request.res
            return {
                url: res3.responseUrl
            };
        } catch (e) {
            console.log("bbb",e.message)
        }
    } finally {

    }
    return {
        url: ""
    };
}

async function search (query, page, type) {
    if (type === "album") {
        return searchAlbum(query, page);
    } else if (type === "sheet") {
        return searchAlbum(query, page);
    }
}

async function searchAlbum(query, page) {
    try {
        let keyword = encodeURIComponent(query)
        var searchUrl = host + "/e/search/index.php"
        const html = (await axios.request({
            method: "POST",
            url: searchUrl,
            data: "keyboard=" + keyword + "&show=" + encodeURIComponent("title,newstext,player,playadmin,movietime,filetype"),
            maxRedirects: 1,
        }))
        const url = html.request.res.responseUrl;
        const res = (await axios.get(url, {headers: headers})).data
        const sheets = formatAlbumFromHtml(res);
        console.log(url, sheets)
        return {
            isEnd: true,
            data: sheets,
        };
    } catch (e) {
        console.log(e)
    }
    return {
        isEnd: true,
        data: [],
    };
}

function formatAlbumFromHtml(html) {
    var sheets = []
    const $ = cheerio.load(html);
    const albumList = $("ul.qm-pic-txt").find("li");
    for (let i = 0; i < albumList.length; i++) {
        const id = $(albumList[i]).find(".txt a").attr("href");
        const title = $(albumList[i]).find(".txt a").text();
        const artwork = $(albumList[i]).find(".pic a img").attr("src");
        sheets.push({id, title, artwork})
    }
    return sheets;
}

module.exports = {
    platform: "书音FM",
    version: "0.2.8",
    srcUrl: "https://gitee.com/kevinr/tvbox/raw/master/musicfree/plugins/shuyinfm-b.js",
    cacheControl: "no-cache",
    search,
    getAlbumInfo,
    getMusicSheetInfo,
    getMediaSource,
    getRecommendSheetTags,
    getRecommendSheetsByTag
};
