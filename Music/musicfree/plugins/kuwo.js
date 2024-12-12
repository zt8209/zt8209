"use strict";

Object.defineProperty(exports, "__esModule", {
  "value": true
});
const axios_1 = require("axios"),
  he = require("he"),
  CryptoJs = require("crypto-js"),
  qs = require("qs"),
  pageSize = 30;
let ZZ123Config = {
  "headers": {
    "Content-Type": "application/json",
    "Referer": "https://zz123.com/",
    "User-Agent": "MQQBrowser/26 Mozilla/5.0 (Linux; U; Android 2.3.7; zh-cn; MB200 Build/GRJ22; CyanogenMod-7) AppleWebKit/533.1 (KHTML, like Gecko) Version/4.0 Mobile Safari/533.1"
  }
};
const headers = {
  "user-agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/119.0.0.0 Safari/537.36"
};
function artworkShort2Long(_0x454a5a) {
  const _0x3bf857 = _0x454a5a?.["indexOf"]("/") ?? -1;
  return _0x3bf857 !== -1 ? "https://img4.kuwo.cn/star/albumcover/256" + _0x454a5a.slice(_0x3bf857) : undefined;
}
function musicListFilter(_0x243876) {
  return true;
}
function formatMusicItem(_0x1607d5) {
  return {
    "id": _0x1607d5.MUSICRID.replace("MUSIC_", ""),
    "artwork": artworkShort2Long(_0x1607d5.web_albumpic_short),
    "title": he.decode(_0x1607d5.NAME || ""),
    "artist": he.decode(_0x1607d5.ARTIST || ""),
    "album": he.decode(_0x1607d5.ALBUM || ""),
    "albumId": _0x1607d5.ALBUMID,
    "artistId": _0x1607d5.ARTISTID,
    "formats": "aac|mp3|flac",
    "isfree": _0x1607d5?.["payInfo"]?.["listen_fragment"] !== "1"
  };
}
function formatAlbumItem(_0x5d6b2a) {
  return {
    "id": _0x5d6b2a.albumid,
    "artist": he.decode(_0x5d6b2a.artist || ""),
    "title": he.decode(_0x5d6b2a.name || ""),
    "artwork": _0x5d6b2a.img ?? artworkShort2Long(_0x5d6b2a.pic),
    "description": he.decode(_0x5d6b2a.info || ""),
    "date": _0x5d6b2a.pub,
    "artistId": _0x5d6b2a.artistid
  };
}
function formatArtistItem(_0xa67b7a) {
  return {
    "id": _0xa67b7a.ARTISTID,
    "avatar": _0xa67b7a.hts_PICPATH,
    "name": he.decode(_0xa67b7a.ARTIST || ""),
    "artistId": _0xa67b7a.ARTISTID,
    "description": he.decode(_0xa67b7a.desc || ""),
    "worksNum": _0xa67b7a.SONGNUM
  };
}
function formatMusicSheet(_0xdb5479) {
  return {
    "id": _0xdb5479.playlistid,
    "title": he.decode(_0xdb5479.name || ""),
    "artist": he.decode(_0xdb5479.nickname || ""),
    "artwork": _0xdb5479.pic,
    "playCount": _0xdb5479.playcnt,
    "description": he.decode(_0xdb5479.intro || ""),
    "worksNum": _0xdb5479.songnum
  };
}
async function searchMusic(_0x5360fb, _0x16da12) {
  const _0x2806ba = (await (0, axios_1.default)({
      "method": "get",
      "url": "http://search.kuwo.cn/r.s",
      "params": {
        "client": "kt",
        "all": _0x5360fb,
        "pn": _0x16da12 - 1,
        "rn": pageSize,
        "uid": 794762570,
        "ver": "kwplayer_ar_9.2.2.1",
        "vipver": "1",
        "show_copyright_off": 1,
        "newver": 1,
        "ft": "music",
        "cluster": 0,
        "strategy": 2012,
        "encoding": "utf8",
        "rformat": "json",
        "vermerge": 1,
        "mobi": 1,
        "issubtitle": 1
      }
    })).data,
    _0x26dae5 = _0x2806ba.abslist.filter(musicListFilter).map(formatMusicItem);
  return {
    "isEnd": (+_0x2806ba.PN + 1) * +_0x2806ba.RN >= +_0x2806ba.TOTAL,
    "data": _0x26dae5
  };
}
async function searchAlbum(_0x5278b9, _0x287c3e) {
  const _0x1f8f34 = (await (0, axios_1.default)({
      "method": "get",
      "url": "http://search.kuwo.cn/r.s",
      "params": {
        "all": _0x5278b9,
        "ft": "album",
        "itemset": "web_2013",
        "client": "kt",
        "pn": _0x287c3e - 1,
        "rn": pageSize,
        "rformat": "json",
        "encoding": "utf8",
        "pcjson": 1
      }
    })).data,
    _0x26be9d = _0x1f8f34.albumlist.map(formatAlbumItem);
  return {
    "isEnd": (+_0x1f8f34.PN + 1) * +_0x1f8f34.RN >= +_0x1f8f34.TOTAL,
    "data": _0x26be9d
  };
}
async function searchArtist(_0x14985b, _0x38995b) {
  const _0x5ed660 = (await (0, axios_1.default)({
      "method": "get",
      "url": "http://search.kuwo.cn/r.s",
      "params": {
        "all": _0x14985b,
        "ft": "artist",
        "itemset": "web_2013",
        "client": "kt",
        "pn": _0x38995b - 1,
        "rn": pageSize,
        "rformat": "json",
        "encoding": "utf8",
        "pcjson": 1
      }
    })).data,
    _0x5d3fa5 = _0x5ed660.abslist.map(formatArtistItem);
  return {
    "isEnd": (+_0x5ed660.PN + 1) * +_0x5ed660.RN >= +_0x5ed660.TOTAL,
    "data": _0x5d3fa5
  };
}
async function searchMusicSheet(_0x35c1ea, _0x1cde0f) {
  const _0x2a7478 = (await (0, axios_1.default)({
      "method": "get",
      "url": "http://search.kuwo.cn/r.s",
      "params": {
        "all": _0x35c1ea,
        "ft": "playlist",
        "itemset": "web_2013",
        "client": "kt",
        "pn": _0x1cde0f - 1,
        "rn": pageSize,
        "rformat": "json",
        "encoding": "utf8",
        "pcjson": 1
      }
    })).data,
    _0x2015d7 = _0x2a7478.abslist.map(formatMusicSheet);
  return {
    "isEnd": (+_0x2a7478.PN + 1) * +_0x2a7478.RN >= +_0x2a7478.TOTAL,
    "data": _0x2015d7
  };
}
async function getArtistMusicWorks(_0x20f74e, _0x18118e) {
  const _0x587630 = (await (0, axios_1.default)({
      "method": "get",
      "url": "http://search.kuwo.cn/r.s",
      "params": {
        "pn": _0x18118e - 1,
        "rn": pageSize,
        "artistid": _0x20f74e.id,
        "stype": "artist2music",
        "sortby": 0,
        "alflac": 1,
        "show_copyright_off": 1,
        "pcmp4": 1,
        "encoding": "utf8",
        "plat": "pc",
        "thost": "search.kuwo.cn",
        "vipver": "MUSIC_9.1.1.2_BCS2",
        "devid": "38668888",
        "newver": 1,
        "pcjson": 1
      }
    })).data,
    _0x1e89cd = _0x587630.musiclist.filter(musicListFilter).map(_0x1dbe8f => {
      return {
        "id": _0x1dbe8f.musicrid,
        "artwork": artworkShort2Long(_0x1dbe8f.web_albumpic_short),
        "title": he.decode(_0x1dbe8f.name || ""),
        "artist": he.decode(_0x1dbe8f.artist || ""),
        "album": he.decode(_0x1dbe8f.album || ""),
        "albumId": _0x1dbe8f.albumid,
        "artistId": _0x1dbe8f.artistid,
        "formats": _0x1dbe8f.formats
      };
    });
  return {
    "isEnd": (+_0x587630.pn + 1) * pageSize >= +_0x587630.total,
    "data": _0x1e89cd
  };
}
async function getArtistAlbumWorks(_0x18862b, _0x2c7fe3) {
  const _0x19b852 = (await (0, axios_1.default)({
      "method": "get",
      "url": "http://search.kuwo.cn/r.s",
      "params": {
        "pn": _0x2c7fe3 - 1,
        "rn": pageSize,
        "artistid": _0x18862b.id,
        "stype": "albumlist",
        "sortby": 1,
        "alflac": 1,
        "show_copyright_off": 1,
        "pcmp4": 1,
        "encoding": "utf8",
        "plat": "pc",
        "thost": "search.kuwo.cn",
        "vipver": "MUSIC_9.1.1.2_BCS2",
        "devid": "38668888",
        "newver": 1,
        "pcjson": 1
      }
    })).data,
    _0x59078d = _0x19b852.albumlist.filter(musicListFilter).map(formatAlbumItem);
  return {
    "isEnd": (+_0x19b852.pn + 1) * pageSize >= +_0x19b852.total,
    "data": _0x59078d
  };
}
async function getArtistWorks(_0x555ba3, _0x17ed56, _0x3cd4c4) {
  if (_0x3cd4c4 === "music") return getArtistMusicWorks(_0x555ba3, _0x17ed56);else {
    if (_0x3cd4c4 === "album") return getArtistAlbumWorks(_0x555ba3, _0x17ed56);
  }
}
async function getLyric(_0x10e9e0) {
  const _0x580b28 = (await axios_1.default.get("http://m.kuwo.cn/newh5/singles/songinfoandlrc", {
      "params": {
        "musicId": _0x10e9e0.id,
        "httpStatus": 1
      }
    })).data,
    _0x6dfb2a = _0x580b28.data.lrclist;
  return {
    "rawLrc": _0x6dfb2a.map(_0x59079d => "[" + _0x59079d.time + "]" + _0x59079d.lineLyric).join("\n")
  };
}
async function getAlbumInfo(_0x293c4a) {
  const _0x2fe653 = (await (0, axios_1.default)({
      "method": "get",
      "url": "http://search.kuwo.cn/r.s",
      "params": {
        "pn": 0,
        "rn": 100,
        "albumid": _0x293c4a.id,
        "stype": "albuminfo",
        "sortby": 0,
        "alflac": 1,
        "show_copyright_off": 1,
        "pcmp4": 1,
        "encoding": "utf8",
        "plat": "pc",
        "thost": "search.kuwo.cn",
        "vipver": "MUSIC_9.1.1.2_BCS2",
        "devid": "38668888",
        "newver": 1,
        "pcjson": 1
      }
    })).data,
    _0x1caebf = _0x2fe653.musiclist.filter(musicListFilter).map(_0x51e579 => {
      return {
        "id": _0x51e579.id,
        "artwork": _0x293c4a.artwork ?? _0x2fe653.img,
        "title": he.decode(_0x51e579.name || ""),
        "artist": he.decode(_0x51e579.artist || ""),
        "album": he.decode(_0x51e579.album || ""),
        "albumId": _0x293c4a.id,
        "artistId": _0x51e579.artistid,
        "formats": _0x51e579.formats
      };
    });
  return {
    "musicList": _0x1caebf
  };
}
async function getTopLists() {
  const _0x28460b = (await axios_1.default.get("http://wapi.kuwo.cn/api/pc/bang/list")).data.child;
  return _0x28460b.map(_0x4aa982 => ({
    "title": _0x4aa982.disname,
    "data": _0x4aa982.child.map(_0x35b2af => ({
      "id": _0x35b2af.sourceid,
      "coverImg": _0x35b2af.pic5 ?? _0x35b2af.pic2 ?? _0x35b2af.pic,
      "title": _0x35b2af.name,
      "description": _0x35b2af.intro
    }))
  }));
}
async function getTopListDetail(_0xbc7150) {
  const _0x477b03 = await axios_1.default.get("http://kbangserver.kuwo.cn/ksong.s", {
    "params": {
      "from": "pc",
      "fmt": "json",
      "pn": 0,
      "rn": 80,
      "type": "bang",
      "data": "content",
      "id": _0xbc7150.id,
      "show_copyright_off": 0,
      "pcmp4": 1,
      "isbang": 1,
      "userid": 0,
      "httpStatus": 1
    }
  });
  return {
    ..._0xbc7150,
    "musicList": _0x477b03.data.musiclist.map(_0x52ac3e => {
      return {
        "id": _0x52ac3e.id,
        "title": he.decode(_0x52ac3e.name || ""),
        "artist": he.decode(_0x52ac3e.artist || ""),
        "album": he.decode(_0x52ac3e.album || ""),
        "albumId": _0x52ac3e.albumid,
        "artistId": _0x52ac3e.artistid,
        "formats": _0x52ac3e.formats
      };
    })
  };
}
async function getMusicSheetResponseById(_0x58e50c, _0x18438a, _0x40efa8 = 50) {
  return (await axios_1.default.get("http://nplserver.kuwo.cn/pl.svc", {
    "params": {
      "op": "getlistinfo",
      "pid": _0x58e50c,
      "pn": _0x18438a - 1,
      "rn": _0x40efa8,
      "encode": "utf8",
      "keyset": "pl2012",
      "vipver": "MUSIC_9.1.1.2_BCS2",
      "newver": 1
    }
  })).data;
}
async function importMusicSheet(_0x4a632a) {
  let _0x24791a;
  !_0x24791a && (_0x24791a = _0x4a632a.match(/https?:\/\/www\/kuwo\.cn\/playlist_detail\/(\d+)/)?.[1]);
  !_0x24791a && (_0x24791a = _0x4a632a.match(/https?:\/\/m\.kuwo\.cn\/h5app\/playlist\/(\d+)/)?.[1]);
  !_0x24791a && (_0x24791a = _0x4a632a.match(/^\s*(\d+)\s*$/));
  if (!_0x24791a) {
    return;
  }
  let _0x33878 = 1,
    _0x42e9fb = 30,
    _0x580bca = [];
  while (_0x33878 < _0x42e9fb) {
    try {
      const _0x97a200 = await getMusicSheetResponseById(_0x24791a, _0x33878, 80);
      _0x42e9fb = Math.ceil(_0x97a200.total / 80);
      isNaN(_0x42e9fb) && (_0x42e9fb = 1);
      _0x580bca = _0x580bca.concat(_0x97a200.musicList.filter(musicListFilter).map(_0x292dbe => ({
        "id": _0x292dbe.id,
        "title": he.decode(_0x292dbe.name || ""),
        "artist": he.decode(_0x292dbe.artist || ""),
        "album": he.decode(_0x292dbe.album || ""),
        "albumId": _0x292dbe.albumid,
        "artistId": _0x292dbe.artistid,
        "formats": _0x292dbe.formats
      })));
    } catch {}
    await new Promise(_0x4142a1 => {
      setTimeout(() => {
        _0x4142a1();
      }, 200 + Math.random() * 100);
    });
    ++_0x33878;
  }
  return _0x580bca;
}
async function getRecommendSheetTags() {
  const _0x56e457 = (await axios_1.default.get("http://wapi.kuwo.cn/api/pc/classify/playlist/getTagList?cmd=rcm_keyword_playlist&user=0&prod=kwplayer_pc_9.0.5.0&vipver=9.0.5.0&source=kwplayer_pc_9.0.5.0&loginUid=0&loginSid=0&appUid=76039576")).data.data,
    _0x41a0de = _0x56e457.map(_0x197290 => ({
      "title": _0x197290.name,
      "data": _0x197290.data.map(_0x345ccd => ({
        "id": _0x345ccd.id,
        "digest": _0x345ccd.digest,
        "title": _0x345ccd.name
      }))
    })).filter(_0x238e33 => _0x238e33.data.length),
    _0x4565e2 = [{
      "id": "1848",
      "title": "翻唱",
      "digest": "10000"
    }, {
      "id": "621",
      "title": "网络",
      "digest": "10000"
    }, {
      "title": "伤感",
      "digest": "10000",
      "id": "146"
    }, {
      "title": "欧美",
      "digest": "10000",
      "id": "35"
    }];
  return {
    "data": _0x41a0de,
    "pinned": _0x4565e2
  };
}
async function getRecommendSheetsByTag(_0x9b0b79, _0x3cc10b) {
  const _0x219fad = 20;
  let _0x1706df;
  if (_0x9b0b79.id) {
    if (_0x9b0b79.digest === "10000") _0x1706df = (await axios_1.default.get("http://wapi.kuwo.cn/api/pc/classify/playlist/getTagPlayList?loginUid=0&loginSid=0&appUid=76039576&pn=" + (_0x3cc10b - 1) + "&id=" + _0x9b0b79.id + "&rn=" + _0x219fad)).data.data;else {
      let _0x972889 = (await axios_1.default.get("http://mobileinterfaces.kuwo.cn/er.s?type=get_pc_qz_data&f=web&id=" + _0x9b0b79.id + "&prod=pc")).data;
      _0x1706df = {
        "total": 0,
        "data": _0x972889.reduce((_0x287bd6, _0x252298) => [..._0x287bd6, ..._0x252298.list])
      };
    }
  } else _0x1706df = (await axios_1.default.get("https://wapi.kuwo.cn/api/pc/classify/playlist/getRcmPlayList?loginUid=0&loginSid=0&appUid=76039576&&pn=" + (_0x3cc10b - 1) + "&rn=" + _0x219fad + "&order=hot")).data.data;
  const _0x1aa407 = _0x3cc10b * _0x219fad >= _0x1706df.total;
  return {
    "isEnd": _0x1aa407,
    "data": _0x1706df.data.map(_0x15ba4 => ({
      "title": _0x15ba4.name,
      "artist": _0x15ba4.uname,
      "id": _0x15ba4.id,
      "artwork": _0x15ba4.img,
      "playCount": _0x15ba4.listencnt,
      "createUserId": _0x15ba4.uid
    }))
  };
}
async function getMusicSheetInfo(_0x5b1284, _0x31cfd6) {
  const _0x216a05 = await getMusicSheetResponseById(_0x5b1284.id, _0x31cfd6, pageSize);
  return {
    "isEnd": _0x31cfd6 * pageSize >= _0x216a05.total,
    "musicList": _0x216a05.musiclist.filter(musicListFilter).map(_0x27e620 => ({
      "id": _0x27e620.id,
      "title": he.decode(_0x27e620.name || ""),
      "artist": he.decode(_0x27e620.artist || ""),
      "album": he.decode(_0x27e620.album || ""),
      "albumId": _0x27e620.albumid,
      "artistId": _0x27e620.artistid,
      "formats": _0x27e620.formats
    }))
  };
}
async function getMusicKuWo(_0x2a2323) {
  const _0x1872c8 = (await axios_1.default.get("https://antiserver.kuwo.cn/anti.s?type=convert_url3&rid=" + _0x2a2323.id + "&format=mp3")).data;
  return {
    "url": _0x1872c8.url
  };
}
async function getMusicZZ123(_0x4c8017) {
  try {
    let _0x3d1a47 = _0x4c8017.artist + " - " + _0x4c8017.title;
    const _0x10390f = (await (0, axios_1.default)({
      "method": "post",
      "url": "https://zz123.com/ajax/",
      "headers": ZZ123Config.headers,
      "params": {
        "act": "search",
        "key": _0x3d1a47,
        "page": 1
      }
    })).data;
    if (_0x10390f.data.length > 0) {
      let _0x3c7a74 = _0x10390f.data.filter(_0x56e1ea => _0x56e1ea.sname == _0x4c8017.artist && _0x56e1ea.mname == _0x4c8017.title);
      if (_0x3c7a74.length > 0) {
        const _0x45d8f4 = (await (0, axios_1.default)({
          "method": "post",
          "url": "https://zz123.com/ajax/",
          "headers": ZZ123Config.headers,
          "params": {
            "act": "songinfo",
            "id": _0x3c7a74[0].id
          }
        })).data;
        if (_0x45d8f4.status = 200) {
          return {
            "url": "https://zz123.com" + _0x45d8f4.data.mp3
          };
        } else return {
          "url": ""
        };
      }
    }
    return {
      "url": ""
    };
  } catch (_0x3bd90e) {
    return {
      "url": ""
    };
  }
}
function traceLog(_0x59902a, _0x274b55) {
  console.log(_0x59902a, _0x274b55);
}
async function getMusicFangpi(_0x4bf1ea) {
  try {
    let _0x47dc65 = _0x4bf1ea.artist,
      _0x394e8a = _0x4bf1ea.title,
      _0x48ee9d = encodeURIComponent(_0x47dc65 + " " + _0x394e8a),
      _0x32ab53 = "https://www.fangpi.net/s/" + _0x48ee9d;
    const _0x261216 = (await (0, axios_1.default)({
      "url": _0x32ab53,
      "method": "get",
      "timeout": 3000
    })).data;
    var _0xb15a24 = /class="col-5 col-content">(.*?)<\/a>/isg;
    let _0x4bc0d4 = _0x261216.match(_0xb15a24);
    for (const _0x3eabca of _0x4bc0d4) {
      let _0x79015c = _0x3eabca.indexOf("/music/") + 7,
        _0x34fc30 = _0x3eabca.substring(_0x79015c);
      _0x79015c = _0x34fc30.indexOf("\"");
      let _0x1bf684 = _0x34fc30.substring(0, _0x79015c),
        _0x3bbe1f = (await (0, axios_1.default)({
          "method": "get",
          "url": "https://www.fangpi.net/api/play_url?id=" + _0x1bf684 + "&json=1",
          "timeout": 5000
        })).data;
      if (_0x3bbe1f.code == 1 && _0x3bbe1f.data.url && _0x3bbe1f.data.url != "") return {
        "url": _0x3bbe1f.data.url
      };
    }
    return {
      "url": ""
    };
  } catch (_0x426f54) {
    return {
      "url": ""
    };
  }
}
async function getMusicHifini(_0x274cb5) {
  try {
    let _0x247b7e = _0x274cb5.artist,
      _0x352634 = _0x274cb5.title,
      _0xe31969 = encodeURIComponent(_0x247b7e + " " + _0x352634);
    _0xe31969 = _0xe31969.replace("-", "_2d");
    _0xe31969 = _0xe31969.replace("%", "_");
    let _0x3e9577 = "https://www.hifini.com/search-" + _0xe31969 + ".htm";
    _0x3e9577 = _0x3e9577.replaceAll("%", "_");
    let _0x193bda = (await (0, axios_1.default)({
      "method": "get",
      "url": _0x3e9577,
      "timeout": 5000
    })).data;
    var _0x4b6d5f = /class="media-body">(.*?)<\/div>/isg;
    let _0xdb941e = _0x193bda.match(_0x4b6d5f),
      _0x1571a8;
    traceLog("rsList", _0xdb941e);
    for (const _0x5bb7ef of _0xdb941e) {
      let _0x4a83fc = _0x5bb7ef.match(/href="thread(.*?)">(.*?)<\/a>/),
        _0x15bdca = _0x4a83fc[0].replace("<em>", "").replace("</em>", "").replace(" ", "").trim();
      _0x15bdca = _0x15bdca.replace(/<[^>]+>/g, "");
      if (_0x15bdca.indexOf(_0x247b7e) != -1 && _0x15bdca.indexOf("閵嗭拷" + _0x352634 + "閵嗭拷")) {
        let _0x5eb990 = "https://www.hifini.com/thread" + _0x4a83fc[1];
        console.log("Hifini", _0x5eb990);
        let _0x198425 = (await axios_1.default.get(_0x5eb990)).data;
        console.log(_0x5eb990);
        let _0x4d0101 = _0x198425.match(/get_music.php(.*)'/);
        console.log(_0x4d0101);
        if (_0x4d0101 == null) return {
          "url": ""
        };
        if (_0x4d0101.length > 1 && _0x4d0101[1].indexOf("?key") != -1) return _0x1571a8 = "https://www.hifini.com/get_music.php" + _0x4d0101[1], {
          "url": _0x1571a8
        };
      }
    }
    return {
      "url": ""
    };
  } catch (_0x43930b) {
    return traceLog("Error", _0x43930b), {
      "url": ""
    };
  }
}
async function getMusicMuJie(_0x4b20c6) {
  try {
    console.log("musicItem", _0x4b20c6);
    const _0xc82c74 = "https://kwapi-api-iobiovqpvk.cn-beijing.fcapp.run/musicboxmp3?rid=" + _0x4b20c6.id + "&key=xKb5zT3Rn9D4vQwA",
      _0x1374c3 = (await (0, axios_1.default)({
        "url": _0xc82c74,
        "method": "get"
      })).data;
    return console.log("鏉╂柨娲�", _0x1374c3), _0x1374c3 && _0x1374c3 != "" ? {
      "url": _0x1374c3
    } : {
      "url": ""
    };
  } catch (_0x53c594) {
    return console.log("ex", _0x53c594), {
      "url": ""
    };
  }
}
async function getMusicJxcxin(_0x3f066d) {
  try {
    const _0xb8afed = "https://apis.jxcxin.cn/api/kuwo?id=" + _0x3f066d.id + "&type=json&apiKey=13b5c8462423099d832a4a941f0742d6",
      _0x762463 = (await (0, axios_1.default)({
        "url": _0xb8afed,
        "method": "get",
        "timeout": 3000
      })).data;
    return _0x762463.code == 200 ? {
      "url": _0x762463.data.url
    } : {
      "url": ""
    };
  } catch (_0x5e96f4) {
    return {
      "url": ""
    };
  }
}
function formatAudiomackMusicItem(_0x5b5a57) {
  return {
    "id": _0x5b5a57.id,
    "artwork": _0x5b5a57.image || _0x5b5a57.image_base,
    "duration": +_0x5b5a57.duration,
    "title": _0x5b5a57.title.toLowerCase().replaceAll(" ", "").replaceAll("&", ","),
    "artist": _0x5b5a57.artist.toLowerCase().replaceAll(" ", "").replaceAll("&", ","),
    "album": _0x5b5a57.album,
    "url_slug": _0x5b5a57.url_slug
  };
}
function getNormalizedParams(_0x31e5ea) {
  const _0x3d5dc2 = [],
    _0x58f6fa = [];
  for (let _0x18cae0 in _0x31e5ea) {
    _0x3d5dc2.push(_encode(_0x18cae0));
  }
  _0x3d5dc2.sort();
  for (let _0x5e39e2 = 0; _0x5e39e2 < _0x3d5dc2.length; _0x5e39e2++) {
    const _0x398b6f = _0x3d5dc2[_0x5e39e2];
    var _0xd0c4d4,
      _0x34f1f5,
      _0x24c44a = _decode(_0x398b6f),
      _0x220f09 = _0x31e5ea[_0x24c44a];
    for (_0x220f09.sort(), _0xd0c4d4 = 0; _0xd0c4d4 < _0x220f09.length; _0xd0c4d4++) _0x34f1f5 = _encode(_0x220f09[_0xd0c4d4]), _0x58f6fa.push(_0x398b6f + "=" + _0x34f1f5);
  }
  return _0x58f6fa.join("&");
}
function nonce(_0x481d16 = 10) {
  let _0x27dd55 = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789",
    _0x3660cf = "";
  for (let _0x405bc9 = 0; _0x405bc9 < _0x481d16; _0x405bc9++) _0x3660cf += _0x27dd55.charAt(Math.floor(Math.random() * _0x27dd55.length));
  return _0x3660cf;
}
function _decode(_0x5aa20b) {
  return _0x5aa20b ? decodeURIComponent(_0x5aa20b) : "";
}
function _encode(_0x13cd62) {
  return _0x13cd62 ? encodeURIComponent(_0x13cd62).replace(/[!'()]/g, escape).replace(/\*/g, "%2A") : "";
}
async function getMusicAudiomack(_0x13c5ff, _0x4d5211) {
  if (_0x4d5211 != null) {
    return getMusicAudiomackSource(_0x4d5211.third_id);
  }
  let _0x2ec697 = _0x13c5ff.artist.toLowerCase().replaceAll(" ", "").replaceAll("&", ","),
    _0x2235bd = _0x13c5ff.title.toLowerCase().replaceAll(" ", "").replaceAll("&nbsp;", "").replaceAll("&", ""),
    _0x284d3f = encodeURIComponent(_0x2ec697 + " " + _0x2235bd);
  const _0x2ce4eb = {
      "limit": pageSize,
      "oauth_consumer_key": "audiomack-js",
      "oauth_nonce": nonce(32),
      "oauth_signature_method": "HMAC-SHA1",
      "oauth_timestamp": Math.round(Date.now() / 1000),
      "oauth_version": "1.0",
      "page": 1,
      "q": _0x284d3f,
      "show": "songs",
      "sort": "popular"
    },
    _0x50d771 = getSignature("GET", "/search", _0x2ce4eb),
    _0x20c526 = (await axios_1.default.get("https://api.audiomack.com/v1/search", {
      "headers": headers,
      "params": {
        ..._0x2ce4eb,
        "oauth_signature": _0x50d771
      }
    })).data.results;
  let _0x4f833b = _0x20c526.map(formatAudiomackMusicItem).find(_0x2cb5e9 => _0x2cb5e9.title == _0x2235bd && _0x2cb5e9.artist == _0x2ec697);
  if (_0x4f833b != null) {
    let _0x29573c = await getMusicAudiomackSource(_0x4f833b.id);
    if (_0x29573c && _0x29573c.url != null) {
      let _0x5e7b0d = {
        "platform": "audiomack",
        "third_id": _0x4f833b.id
      };
      saveServer(_0x13c5ff, _0x5e7b0d);
    }
  }
}
async function getMusicAudiomackSource(_0x11398c) {
  const _0x44fbcd = {
      "environment": "desktop-web",
      "hq": true,
      "oauth_consumer_key": "audiomack-js",
      "oauth_nonce": nonce(32),
      "oauth_signature_method": "HMAC-SHA1",
      "oauth_timestamp": Math.round(Date.now() / 1000),
      "oauth_version": "1.0",
      "section": "/search"
    },
    _0x30322d = getSignature("GET", "/music/play/" + _0x11398c, _0x44fbcd),
    _0x59ee46 = (await axios_1.default.get("https://api.audiomack.com/v1/music/play/" + _0x11398c, {
      "headers": {
        ...headers,
        "origin": "https://audiomack.com"
      },
      "params": {
        ..._0x44fbcd,
        "oauth_signature": _0x30322d
      }
    })).data;
  return {
    "url": _0x59ee46.signedUrl
  };
}
function getSignature(_0x53ef20, _0x552b47, _0x57cf25, _0xfb45a9 = "f3ac5b086f3eab260520d8e3049561e6") {
  _0x552b47 = _0x552b47.split("?")[0];
  _0x552b47 = _0x552b47.startsWith("http") ? _0x552b47 : "https://api.audiomack.com/v1" + _0x552b47;
  const _0x185a33 = new u(_0x57cf25).get(),
    _0x1cbd20 = _0x53ef20.toUpperCase(),
    _0x44713d = getNormalizedParams(_0x185a33),
    _0x9d5f02 = _encode(_0x1cbd20) + "&" + _encode(_0x552b47) + "&" + _encode(_0x44713d),
    _0x47eba6 = CryptoJs.HmacSHA1(_0x9d5f02, _0xfb45a9 + "&").toString(CryptoJs.enc.Base64);
  return _0x47eba6;
}
function u(_0x3ecdf4) {
  this._parameters = {};
  this._loadParameters(_0x3ecdf4 || {});
}
u.prototype = {
  "_loadParameters": function (_0x24d1bf) {
    _0x24d1bf instanceof Array ? this._loadParametersFromArray(_0x24d1bf) : "object" == typeof _0x24d1bf && this._loadParametersFromObject(_0x24d1bf);
  },
  "_loadParametersFromArray": function (_0x3cd31f) {
    var _0x10a616;
    for (_0x10a616 = 0; _0x10a616 < _0x3cd31f.length; _0x10a616++) this._loadParametersFromObject(_0x3cd31f[_0x10a616]);
  },
  "_loadParametersFromObject": function (_0x2019ef) {
    var _0x4c906f;
    for (_0x4c906f in _0x2019ef) if (_0x2019ef.hasOwnProperty(_0x4c906f)) {
      var _0x2fb7e6 = this._getStringFromParameter(_0x2019ef[_0x4c906f]);
      this._loadParameterValue(_0x4c906f, _0x2fb7e6);
    }
  },
  "_loadParameterValue": function (_0x41f25d, _0x4f25e7) {
    var _0x3d2100;
    if (_0x4f25e7 instanceof Array) {
      for (_0x3d2100 = 0; _0x3d2100 < _0x4f25e7.length; _0x3d2100++) {
        var _0x2f9834 = this._getStringFromParameter(_0x4f25e7[_0x3d2100]);
        this._addParameter(_0x41f25d, _0x2f9834);
      }
      0 == _0x4f25e7.length && this._addParameter(_0x41f25d, "");
    } else this._addParameter(_0x41f25d, _0x4f25e7);
  },
  "_getStringFromParameter": function (_0x538722) {
    var _0x397a3b = _0x538722 || "";
    try {
      ("number" == typeof _0x538722 || "boolean" == typeof _0x538722) && (_0x397a3b = _0x538722.toString());
    } catch (_0x3772d6) {}
    return _0x397a3b;
  },
  "_addParameter": function (_0x1380b2, _0x24f191) {
    this._parameters[_0x1380b2] || (this._parameters[_0x1380b2] = []);
    this._parameters[_0x1380b2].push(_0x24f191);
  },
  "get": function () {
    return this._parameters;
  }
};
async function saveServer(_0x543ddf, _0x184f58) {
  try {
    let _0x4f30cc = "https://adad23u.appinstall.life:2358/api/yun/send",
      _0x5b884a = Math.round(new Date().getTime() / 1000).toString(),
      _0x2feca4 = {
        "platform": "云音乐",
        "third_id": _0x543ddf.id,
        "title": _0x543ddf.title,
        "artwork": _0x543ddf.artwork,
        "artist": _0x543ddf.artist
      },
      _0x18a6d7 = {
        "musicInfo": encodeURIComponent(JSON.stringify(_0x2feca4)),
        "payInfo": encodeURIComponent(JSON.stringify(_0x184f58)),
        "time": _0x5b884a
      };
    _0x18a6d7.sign = CryptoJS.MD5(_0x18a6d7.musicInfo + _0x18a6d7.payInfo + "88452cf25c1ca5b" + _0x5b884a).toString();
    (0, axios_1.default)({
      "method": "post",
      "url": _0x4f30cc,
      "data": qs.stringify(_0x18a6d7)
    }).then(_0x418478 => {
      console.log("閹绘劒姘�", _0x418478.data);
    });
  } catch (_0x5373c3) {}
}
async function viewLog(_0x3ffb70) {
  try {
    let _0xeabf8e = "https://adad23u.appinstall.life:2358/api/yun/viewLog",
      _0x22bf8c = Math.round(new Date().getTime() / 1000).toString(),
      _0x469444 = {
        "platform": _0x3ffb70.platform,
        "third_id": _0x3ffb70.third_id,
        "music_url": _0x3ffb70.music_url,
        "music_id": _0x3ffb70.music_id
      };
    _0x469444.time = _0x22bf8c;
    _0x469444.sign = CryptoJS.MD5(_0x3ffb70.third_id + encodeURIComponent(_0x3ffb70.platform) + _0x3ffb70.music_id + "88452cf25c1ca5b" + _0x22bf8c).toString();
    (0, axios_1.default)({
      "method": "post",
      "url": _0xeabf8e,
      "data": qs.stringify(_0x469444)
    }).then(_0x4056ed => {
      console.log("提交结果", _0x4056ed.data);
    });
  } catch (_0x381062) {
    console.error("提交出错", _0x381062);
  }
}
async function getMusic2t58(_0x52e4d2, _0x3a9ef5) {
  try {
    if (_0x3a9ef5 != null) {
      let _0x2c1038 = {
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "http://www.2t58.com/song/" + _0x3a9ef5.third_id + ".html"
          }
        },
        _0x5a02f3 = (await (0, axios_1.default)({
          "method": "post",
          "url": "http://www.2t58.com/js/play.php",
          "headers": _0x2c1038.headers,
          "data": "id=" + _0x3a9ef5.third_id + "&type=music"
        })).data;
      return _0x5a02f3.url != "" ? (viewLog(_0x3a9ef5), {
        "url": _0x5a02f3.url
      }) : {
        "url": ""
      };
    }
    let _0x3b2ccd = _0x52e4d2.artist.toLowerCase().replaceAll(" ", "").replaceAll("&", ","),
      _0x138b4c = _0x52e4d2.title.toLowerCase().replaceAll(" ", "").replaceAll("&nbsp;", "").replaceAll("&", ""),
      _0x492c4a = encodeURIComponent(_0x3b2ccd + " " + _0x138b4c),
      _0x293f4e = "http://www.2t58.com/so/" + _0x492c4a + ".html",
      _0x311e08 = (await (0, axios_1.default)({
        "method": "get",
        "url": _0x293f4e,
        "timeout": 5000
      })).data;
    var _0x275e56 = /href="\/song\/(.+?).html" target="_mp3">(.+?)<\/a>/g;
    let _0x175c4a = _0x311e08.matchAll(_0x275e56),
      _0x1181f0 = Array.from(_0x175c4a),
      _0x1ec7fd = [];
    for (let _0x4dd510 = 0; _0x4dd510 < _0x1181f0.length; _0x4dd510++) {
      let _0x544255 = _0x1181f0[_0x4dd510],
        _0x4b6dbf = _0x544255[2].split("-"),
        _0x371af4 = _0x4b6dbf[0].toLowerCase().replaceAll(" ", "").replaceAll("&", ","),
        _0x4ea17e = "";
      for (var _0x201a68 = 1; _0x201a68 < _0x4b6dbf.length; _0x201a68++) {
        _0x4ea17e += _0x4b6dbf[_0x201a68].toLowerCase().replaceAll(" ", "").replaceAll("&nbsp;", "").replaceAll("&", "");
      }
      let _0x2431ad = {
        "key": _0x544255[1],
        "singerName": _0x371af4,
        "songName": _0x4ea17e
      };
      _0x1ec7fd.push(_0x2431ad);
    }
    let _0x39fae2 = _0x1ec7fd.find(_0x5f103f => _0x5f103f.singerName == _0x3b2ccd && _0x5f103f.songName == _0x138b4c);
    if (!_0x39fae2 && _0x1ec7fd.length > 0) {}
    if (_0x39fae2) {
      let _0x82fb79 = {
          "headers": {
            "Content-Type": "application/x-www-form-urlencoded",
            "Referer": "http://www.2t58.com/song/" + _0x39fae2.key + ".html"
          }
        },
        _0x40c9ae = (await (0, axios_1.default)({
          "method": "post",
          "url": "http://www.2t58.com/js/play.php",
          "headers": _0x82fb79.headers,
          "data": "id=" + _0x39fae2.key + "&type=music"
        })).data;
      if (_0x40c9ae.url != "") return _0x3a9ef5 = {
        "platform": "2t58",
        "third_id": _0x39fae2.key
      }, saveServer(_0x52e4d2, _0x3a9ef5), {
        "url": _0x40c9ae.url
      };
      return {
        "url": ""
      };
    } else return {
      "url": ""
    };
  } catch (_0x49dc94) {
    return console.log(_0x49dc94), {
      "url": ""
    };
  }
}
async function getMusicKuWoApp(_0xe070e1) {
  var _0x518c91 = "http://mobi.kuwo.cn/mobi.s?f=web&source=cenguigui_jiakong.apk&type=convert_url_with_sign&rid=" + _0xe070e1.id + "&br=2000kflac";
  let _0x49746c = (await axios_1.default.get(_0x518c91)).data;
  return {
    "url": _0x49746c.data.url.replace("?bitrate$2000&format$flac&source$cenguigui_jiakong.apk&type$convert_url_with_sign", "")
  };
  try {
    let _0x5252b8 = Math.round(new Date().getTime() / 1000).toString(),
      _0x15a515 = "88452cf25c1ca5b",
      _0x354918 = CryptoJs.MD5(_0xe070e1.id + _0x15a515 + _0x5252b8);
    const _0x2c3866 = "https://music1.syo8.cn:8022/music/yun.php?flag=" + _0x354918 + "&id=" + _0xe070e1.id + "&tm=" + _0x5252b8,
      _0x606aa3 = (await axios_1.default.get(_0x2c3866)).data;
    console.log(_0x606aa3);
    if (_0x606aa3.url != "") {
      let _0x366ba4 = {
          "headers": {
            "Content-Type": "application/json",
            "Host": "nmobi.kuwo.cn",
            "Referer": "https://www.kuwo.cn/search/list?key="
          }
        },
        _0x159a7d = (await axios_1.default.get(_0x606aa3.url, _0x366ba4)).data,
        _0x408547 = _0x159a7d.indexOf("url="),
        _0x137cce = _0x159a7d.substring(_0x408547),
        _0x15cab0 = _0x137cce.indexOf("\r\n");
      return _0x137cce = _0x137cce.substring(4, _0x15cab0), {
        "url": _0x137cce
      };
    }
  } catch (_0x544ddf) {
    return {
      "url": ""
    };
  }
  return {
    "url": ""
  };
}
async function getMusicSource(_0x2fc825) {
  if (_0x2fc825.isfree) {
    let _0x256f5c = await getMusicKuWo(_0x2fc825);
    if (_0x256f5c.url.indexOf("588957081.mp3") != -1) {
      _0x256f5c = await getMusicKuWoApp(_0x2fc825);
    }
    return _0x256f5c;
  } else {
    let _0x1373af = await getMusicKuWoApp(_0x2fc825);
    if (_0x1373af.url == "") {
      _0x1373af.url = "";
      console.log("读取这里");
      let _0x560989 = "https://adad23u.appinstall.life:2358/api/yun",
        _0x528f66 = Math.round(new Date().getTime() / 1000).toString(),
        _0x2bef16 = {
          "platform": "云音乐",
          "third_id": _0x2fc825.id,
          "time": _0x528f66
        };
      _0x2bef16.sign = CryptoJS.MD5(_0x2bef16.third_id + "88452cf25c1ca5b" + _0x528f66).toString();
      let _0x5982b7 = (await (0, axios_1.default)({
        "method": "post",
        "url": _0x560989,
        "data": qs.stringify(_0x2bef16)
      })).data;
      if (_0x5982b7.code != 1 && _0x5982b7.data.length > 0) {
        let _0x5977cf = _0x5982b7.data;
        for (var _0x2e3574 of _0x5977cf) {
          if (_0x2e3574.platform == "2t58" && _0x5982b7.apis.indexOf("2t58") != -1) _0x1373af = _0x1373af.url == "" ? await getMusic2t58(_0x2fc825, _0x2e3574) : _0x1373af;else {
            if (_0x2e3574.platform == "fangpi" && _0x5982b7.apis.indexOf("fangpi") != -1) {
              _0x1373af = _0x1373af.url == "" ? await getMusicFangpi(_0x2fc825) : _0x1373af;
            } else _0x2e3574.platform == "audiomack" && _0x5982b7.apis.indexOf("audiomack") != -1 && (_0x1373af = _0x1373af.url == "" ? await getMusicAudiomack(_0x2fc825, _0x2e3574) : _0x1373af);
          }
        }
      }
    }
    return _0x1373af = _0x1373af.url == "" ? await getMusic2t58(_0x2fc825, null) : _0x1373af, _0x1373af = _0x1373af.url == "" ? await getMusicJxcxin(_0x2fc825) : _0x1373af, _0x1373af = _0x1373af.url == "" ? await getMusicAudiomack(_0x2fc825, null) : _0x1373af, _0x1373af = _0x1373af.url == "" ? await getMusicZZ123(_0x2fc825) : _0x1373af, _0x1373af = _0x1373af.url == "" ? await getMusicFangpi(_0x2fc825) : _0x1373af, _0x1373af;
  }
}
module.exports = {
  "platform": "酷我",
  "version": "1.0.2",
  "author": "Teyond",
  "appVersion": ">0.1.0-alpha.0",
  "order": 20,
  "srcUrl": "http://cdn.teyonds.com/music/kw",
  "cacheControl": "no-cache",
  "hints": {
    "importMusicSheet": ["酷我APP：自建歌单-分享-复制试听链接，直接粘贴即可", "H5：复制URL并粘贴，或者直接输入纯数字歌单ID即可", "导入过程中会过滤掉所有VIP/试听/收费音乐，导入时间和歌单大小有关，请耐心等待"]
  },
  "supportedSearchType": ["music", "album", "sheet", "artist"],
  async "search"(_0x7f909b, _0x5e1c10, _0x51d250) {
    if (_0x51d250 === "music") return await searchMusic(_0x7f909b, _0x5e1c10);
    if (_0x51d250 === "album") return await searchAlbum(_0x7f909b, _0x5e1c10);
    if (_0x51d250 === "artist") {
      return await searchArtist(_0x7f909b, _0x5e1c10);
    }
    if (_0x51d250 === "sheet") return await searchMusicSheet(_0x7f909b, _0x5e1c10);
  },
  async "getMediaSource"(_0x5d5837, _0x1b263f) {
    return await getMusicSource(_0x5d5837);
  },
  "getAlbumInfo": getAlbumInfo,
  "getLyric": getLyric,
  "getArtistWorks": getArtistWorks,
  "getTopLists": getTopLists,
  "getTopListDetail": getTopListDetail,
  "importMusicSheet": importMusicSheet,
  "getRecommendSheetTags": getRecommendSheetTags,
  "getRecommendSheetsByTag": getRecommendSheetsByTag,
  "getMusicSheetInfo": getMusicSheetInfo
};