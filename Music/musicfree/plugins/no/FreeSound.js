var $8zHUo$axios = require("axios");
var $8zHUo$cheerio = require("cheerio");

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

$parcel$export(module.exports, "default", () => $882b6d93070905b3$export$2e2bcd8739ae039);


// TODO: 你可以在这里写插件的逻辑
// 注意：不要使用async () => {}，hermes不支持异步箭头函数
const $882b6d93070905b3$var$search = async function(query, page, type) {
    if (type === "music") {
        // 我们能搜索的只有音乐，因此判断下类型
        // 获取网站的html
        const rawHtml = (await (0, ($parcel$interopDefault($8zHUo$axios))).get("https://freesound.org/search", {
            params: {
                q: query,
                page: page
            }
        })).data;
        // 接下来解析html
        const $ = (0, ($parcel$interopDefault($8zHUo$cheerio))).load(rawHtml);
        // 存储搜索结果
        const searchResults = [];
        // 获取所有的结果
        const resultElements = $(".bw-search__result");
        // 解析每一个结果
        resultElements.each((index, element)=>{
            const playerElement = $(element).find(".bw-player");
            // id
            const id = playerElement.data("sound-id");
            // 音频名
            const title = playerElement.data("title");
            // 作者
            const artist = $(element).find(".col-12.col-lg-12.middle a").text();
            // 专辑封面
            const artwork = playerElement.data("waveform");
            // 音源
            const url = playerElement.data("mp3");
            // 专辑名，这里就随便写个了，不写也没事
            const album = "来自FreeSound的音频";
            searchResults.push({
                id: // 一定要有一个 id 字段
                id,
                title: title,
                artist: artist,
                artwork: artwork,
                album: album,
                url: url
            });
        });
        return {
            isEnd: true,
            data: searchResults
        };
    }
};
const $882b6d93070905b3$var$pluginInstance = {
    platform: "FreeSound",
    version: "0.0.1",
    cacheControl: "no-store",
    search: // TODO: 在这里把插件剩余的功能补充完整
    $882b6d93070905b3$var$search
};
var $882b6d93070905b3$export$2e2bcd8739ae039 // let se = search("l", 1, "music");
 = $882b6d93070905b3$var$pluginInstance;


//# sourceMappingURL=plugin.js.map
