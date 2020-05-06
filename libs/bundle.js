(function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ganzhi_1 = require("./ganzhi");
var tylunar_1 = require("./tylunar");
var shensha_1 = require("./shensha");
var YunType;
(function (YunType) {
    YunType[YunType["DaYun"] = 0] = "DaYun";
    YunType[YunType["LiuNian"] = 1] = "LiuNian";
    YunType[YunType["XiaoYun"] = 2] = "XiaoYun";
})(YunType || (YunType = {}));
var BaziYun = /** @class */function () {
    function BaziYun(Start, GZ, birthYear, type) {
        this.Start = Start;
        this.GZ = GZ;
        this.birthYear = birthYear;
        this.type = type;
    }
    Object.defineProperty(BaziYun.prototype, "Old", {
        get: function get() {
            return this.Start.getFullYear() - this.birthYear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaziYun.prototype, "End", {
        get: function get() {
            if (this.type == YunType.DaYun) {
                return new Date(this.Start.getTime() + BaziYun.tenyear);
            } else if (this.type == YunType.LiuNian) {
                return null;
            } else {
                return null;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(BaziYun.prototype, "Year", {
        get: function get() {
            return this.Start.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    BaziYun.oneday = 1000 * 60 * 60 * 24;
    BaziYun.oneyear = BaziYun.oneday * 365.25;
    BaziYun.tenyear = 10 * BaziYun.oneyear;
    return BaziYun;
}();
exports.BaziYun = BaziYun;
var Bazi = /** @class */function () {
    function Bazi(Birthday, Gender) {
        this.Birthday = Birthday;
        this.Gender = Gender;
        this.bazi = tylunar_1.TYLunar.calcBazi(this.Birthday.getFullYear(), this.Birthday.getMonth() + 1, this.Birthday.getDate(), this.Birthday.getHours(), this.Birthday.getMinutes());
        this.bazi['Y'].Base = this.bazi['D'];
        this.bazi['M'].Base = this.bazi['D'];
        this.bazi['D'].Base = this.bazi['D'];
        this.bazi['T'].Base = this.bazi['D'];
        this.initShenSha();
        this.initDaYun();
    }
    Object.defineProperty(Bazi.prototype, "Y", {
        get: function get() {
            return this.bazi['Y'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "M", {
        get: function get() {
            return this.bazi['M'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "D", {
        get: function get() {
            return this.bazi['D'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "T", {
        get: function get() {
            return this.bazi['T'];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "All", {
        get: function get() {
            return [this.bazi['Y'], this.bazi['M'], this.bazi['D'], this.bazi['T']];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "Direction", {
        get: function get() {
            return (this.Gender == 'm' ? 1 : -1) * (this.Y.Zhi.Index % 2 == 0 ? 1 : -1);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "MingGong", {
        get: function get() {
            if (this.minggong) return this.minggong;
            var sum = this.M.Zhi.Index + 1 + this.T.Zhi.Index + 1;
            var zhi = sum < 14 ? 14 - sum : 26 - sum;
            zhi = zhi - 1;
            var startGan = this.Y.Gan.QiYueGan;
            var diff = (zhi - 2 + 12) % 12;
            var gan = (startGan + diff) % 10;
            var ganzhi = new ganzhi_1.GanZhi([gan, zhi]);
            return ganzhi;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "TaiYuan", {
        get: function get() {
            var gan = (this.M.Gan.Index + 1) % 10;
            var zhi = (this.M.Zhi.Index + 3) % 12;
            var gz = new ganzhi_1.GanZhi([gan, zhi]);
            return gz;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "WuXings", {
        get: function get() {
            if (this.wuxings) return this.wuxings;
            var res = [0, 0, 0, 0, 0];
            res[this.Y.Gan.WuXing.Index] += 1;
            res[this.M.Gan.WuXing.Index] += 1;
            res[this.D.Gan.WuXing.Index] += 1;
            res[this.T.Gan.WuXing.Index] += 1;
            res[this.Y.Zhi.WuXing.Index] += 1;
            res[this.M.Zhi.WuXing.Index] += 1;
            res[this.D.Zhi.WuXing.Index] += 1;
            res[this.T.Zhi.WuXing.Index] += 1;
            this.wuxings = [{ Name: '金', Num: res[0] }, { Name: '水', Num: res[1] }, { Name: '木', Num: res[2] }, { Name: '火', Num: res[3] }, { Name: '土', Num: res[4] }];
            return this.wuxings;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "ShenSha", {
        get: function get() {
            return this.shenshas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Bazi.prototype, "DaYun", {
        get: function get() {
            return this.dayun;
        },
        enumerable: true,
        configurable: true
    });
    Bazi.prototype.CalcShenSha = function (gz) {
        var res = new Array();
        for (var _i = 0, _a = this.ShenSha; _i < _a.length; _i++) {
            var ss = _a[_i];
            if (ss.Is(gz) == true) {
                res.push(ss.Name);
            }
        }
        return res.join('、');
    };
    Bazi.prototype.CalcLiuNian = function (start, end) {
        var res = new Array();
        var gzIndex = start - 1984;
        while (gzIndex < 0) {
            gzIndex += 60;
        }
        gzIndex = gzIndex % 60;
        var xiaoyun = this.T.Index + (start - this.Birthday.getFullYear() + 1) * this.Direction;
        xiaoyun = (xiaoyun + 600) % 60;
        for (var idx = start; idx <= end; idx++) {
            var gz = new ganzhi_1.GanZhi(gzIndex);
            gz.Base = this.D;
            gz.ShenSha = this.CalcShenSha(gz);
            var gz2 = new ganzhi_1.GanZhi(xiaoyun);
            gz2.Base = this.D;
            gz2.ShenSha = this.CalcShenSha(gz2);
            var lichun = tylunar_1.TYLunar.getSolarTerms(idx, 2)[0];
            var obj = new BaziYun(lichun, gz, this.Birthday.getFullYear(), YunType.LiuNian);
            obj.GZ2 = gz2;
            res.push(obj);
            gzIndex += 1;
            gzIndex = gzIndex % 60;
            xiaoyun += 1 * this.Direction;
            xiaoyun = (xiaoyun + 60) % 60;
        }
        return res;
    };
    Bazi.prototype.equal = function (bz) {
        return this.Gender == bz.Gender && this.Birthday.toString() == bz.Birthday.toString();
    };
    // 初始化神煞
    Bazi.prototype.initShenSha = function () {
        this.shenshas = new Array();
        var y = this.Y.Index;
        var m = this.M.Index;
        var d = this.D.Index;
        var t = this.T.Index;
        this.shenshas.push(new shensha_1.ShenSha('将星', [d]));
        this.shenshas.push(new shensha_1.ShenSha('羊刃', [d]));
        this.shenshas.push(new shensha_1.ShenSha('禄神', [d]));
        this.shenshas.push(new shensha_1.ShenSha('华盖', [d]));
        this.shenshas.push(new shensha_1.ShenSha('文昌', [d]));
        this.shenshas.push(new shensha_1.ShenSha('学堂', [d]));
        this.shenshas.push(new shensha_1.ShenSha('天喜', [m]));
        this.shenshas.push(new shensha_1.ShenSha('天医', [m]));
        this.shenshas.push(new shensha_1.ShenSha('贵人', [d]));
        this.shenshas.push(new shensha_1.ShenSha('驿马', [y, d]));
        this.shenshas.push(new shensha_1.ShenSha('桃花', [y, d]));
        this.shenshas.push(new shensha_1.ShenSha('灾煞', [y, d]));
        this.shenshas.push(new shensha_1.ShenSha('劫煞', [y, d]));
        this.shenshas.push(new shensha_1.ShenSha('旬空', [d]));
        this.shenshas.push(new shensha_1.ShenSha('魁罡', [y, m, d, t]));
        this.shenshas.push(new shensha_1.ShenSha('四废', [y, m, d, t]));
        this.shenshas.push(new shensha_1.ShenSha('孤辰寡宿', [y, m, d, t]));
        this.shenshas.push(new shensha_1.ShenSha('阴差阳错', [d]));
        var tianluodiwang = new shensha_1.ShenSha('天罗地网', [y, m, d, t]);
        tianluodiwang.Gender = this.Gender;
        this.shenshas.push(tianluodiwang);
    };
    // 初始化大运
    Bazi.prototype.initDaYun = function () {
        this.dayun = new Array();
        var dayunTime = this.qiDaYun();
        var direction = this.Direction;
        var old = dayunTime.getFullYear() - this.Birthday.getFullYear();
        var oneday = 1000 * 60 * 60 * 24;
        var oneyear = oneday * 365.25;
        var tenyear = 10 * oneyear;
        for (var idx = 0; idx < 10; idx++) {
            var gzIndex = this.M.Index + (idx + 1) * direction;
            var gz = new ganzhi_1.GanZhi((gzIndex + 60) % 60);
            gz.Base = this.bazi['D'];
            var date = new Date(dayunTime.getTime() + tenyear * idx);
            var dayun = new BaziYun(date, gz, this.Birthday.getFullYear(), YunType.DaYun);
            this.dayun.push(dayun);
        }
    };
    // 起大运
    Bazi.prototype.qiDaYun = function () {
        var direction = (this.Gender == 'm' ? 1 : -1) * (this.Y.Zhi.Index % 2 == 0 ? 1 : -1);
        var jieqi = tylunar_1.TYLunar.findNextJieQi(this.Birthday, direction);
        var timespan = Math.abs(jieqi.getTime() - this.Birthday.getTime());
        var hoursOff = timespan / (1000 * 60) * 2;
        var dayunTime = new Date(this.Birthday.getTime() + hoursOff * (1000 * 60 * 60));
        return dayunTime;
    };
    return Bazi;
}();
exports.Bazi = Bazi;

},{"./ganzhi":3,"./shensha":5,"./tylunar":6}],2:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
String.prototype.int2str = function (length, base) {
    var radix = base == null || base == undefined ? 2 : base;
    var res = this.toString(radix);
    if (res.length >= length) {
        return res;
    } else {
        while (res.length < length) {
            res = "0" + res;
        }return res;
    }
};
String.prototype.parseDate = function () {
    var norm = this.replace(/[年月日时分秒:：,，\ \/-]/g, "|");
    var items = norm.split("|").removeEmpty();
    var nums = items.select(function (i) {
        return parseInt(i);
    });
    return new Date(nums[0], nums[1] - 1, nums[2], nums[3] || 0, nums[4] || 0, nums[5] || 0);
};
String.prototype.Latex = function (color) {
    var pattern = /^(?<content>[^|]+)+(\|(?<color>[a-z]+))?$/;
    var match = this.match(pattern);
    var cl = color || match.groups["color"];
    var content = match.groups["content"];
    if (!!cl) {
        return "\\" + LatexHelp.COLOR + "{" + cl + "}{\\text{" + content + "}}";
    } else {
        return "\\text{" + content + "}";
    }
};
String.prototype.IsNullOrEmpty = function () {
    return this == undefined || this == null || this == "";
};
Array.prototype.select = function (closure) {
    var res = [];
    this.forEach(function (e) {
        res.push(closure(e));
    });
    return res;
};
Array.prototype.where = function (closure) {
    var res = [];
    this.forEach(function (e) {
        if (closure(e)) {
            res.push(e);
        }
    });
    return res;
};
Array.prototype.distinct = function () {
    var u = {},
        a = [];
    for (var i = 0, l = this.length; i < l; ++i) {
        if (u.hasOwnProperty(this[i])) {
            continue;
        }
        a.push(this[i]);
        u[this[i]] = 1;
    }
    return a;
};
Array.prototype.insert = function (index, item) {
    this.splice(index, 0, item);
};
Array.prototype.removeEmpty = function () {
    return this.filter(function (e) {
        return !!e && (e || "").toString() != "";
    });
};
Date.prototype.toChinaStr = function (time) {
    if (time === void 0) {
        time = false;
    }
    var res = this.getFullYear() + '年' + (this.getMonth() + 1) + '月' + this.getDate() + '日';
    if (time == true) {
        res += ' ' + this.getHours().toString().int2str(2, 10) + '时';
        res += this.getMinutes().toString().int2str(2, 10) + '分';
        res += this.getSeconds().toString().int2str(2, 10) + '秒';
    }
    return res;
};
Date.prototype.toDatabaseStr = function () {
    var res = this.getFullYear() + '-' + (this.getMonth() + 1).toString().int2str(2, 10) + '-' + this.getDate().toString().int2str(2, 10);
    res += ' ' + this.getHours().toString().int2str(2, 10) + ':';
    res += this.getMinutes().toString().int2str(2, 10) + ':';
    res += this.getSeconds().toString().int2str(2, 10);
    return res;
};
function onlyUnique(value, index, self) {
    return self.indexOf(value) === index;
}
exports.onlyUnique = onlyUnique;
var LatexHelp = /** @class */function () {
    function LatexHelp() {}
    LatexHelp.range = function (txt) {
        var res = [];
        var pattern = /^([0-9]{1,2})[ ]*-[ ]*([0-9]{1,2})$/;
        var match = txt.trim().match(pattern);
        if (match) {
            for (var i = parseInt(match[1]); i <= parseInt(match[2]); i++) {
                res.push(i);
            }
        } else {
            res = txt.replace("-", "").split("").filter(function (e) {
                return !!e && e != "" && e != " ";
            }).map(function (e) {
                return parseInt(e);
            });
        }
        return res;
    };
    LatexHelp.parseGuaTime = function (txt) {
        try {
            var pattern = /[甲乙丙丁戊己庚辛壬癸]?[子丑寅卯辰巳午未申酉戌亥]{1}月[甲乙丙丁戊己庚辛壬癸]{1}[子丑寅卯辰巳午未申酉戌亥]{1}日/i;
            var txtNoSpace = txt.replace(" ", "");
            var match = txtNoSpace.match(pattern);
            if (match) {
                var res = match.toString().replace(/[月日]/g, " ");
                return res.split(" ").filter(function (e) {
                    return !!e && e != "";
                });
            } else {
                var dateText = txt.toString();
                return dateText.parseDate().toDatabaseStr();
            }
        } catch (err) {
            console.log("Err:", err);
            throw err;
        }
    };
    LatexHelp.parseBaziTime = function (txt) {
        return txt.parseDate();
    };
    LatexHelp.parseGuaText = function (txt) {
        var dictYao = {
            "laoyin": 2,
            "laoyang": 3,
            "shaoyin": 0,
            "shaoyang": 1,
            "x": 2,
            "o": 3,
            "=": 0,
            "-": 1,
            "交": 2,
            "重": 3,
            "阴": 0,
            "阳": 1,
            "2": 2,
            "3": 3,
            "0": 0,
            "1": 1,
            "X": 2,
            "O": 3
        };
        var tmp = txt.replace(" ", "");
        var items = tmp.split("");
        var num = items.map(function (i) {
            return dictYao[i] || "";
        }).reverse();
        if (num.join("") != "") {
            var ben = num.map(function (n) {
                return n % 2;
            }).join("");
            var bian = num.map(function (n) {
                return (n % 2 + Math.floor(n / 2)) % 2;
            }).join("");
            return [parseInt(ben, 2), parseInt(bian, 2)];
        } else {
            return [txt, ""];
        }
    };
    LatexHelp.parseID = function (arg, defaultID) {
        var res = {
            "id": defaultID,
            "short": undefined,
            "size": undefined
        };
        if (!arg) return res;
        var items = arg.split("\/").filter(function (e) {
            return !!e && e != "";
        });
        items.forEach(function (e) {
            if (!isNaN(e)) {
                res["size"] = parseInt(e);
            } else if (e.toLowerCase() == "s" || e.toLowerCase() == "l") {
                res["short"] = e.toLowerCase() == 's';
            } else {
                res["id"] = e;
            }
        });
        return res;
    };
    LatexHelp.getYaoSymbol = function (arg) {
        var dictYao = {
            "laoyin": "laoyin",
            "laoyang": "laoyang",
            "shaoyin": "shaoyin",
            "shaoyang": "shaoyang",
            "x": "laoyin",
            "o": "laoyang",
            "=": "shaoyin",
            "-": "shaoyang",
            "交": "laoyin",
            "重": "laoyang",
            "阴": "shaoyin",
            "阳": "shaoyang",
            "2": "laoyin",
            "3": "laoyang",
            "0": "shaoyin",
            "1": "shaoyang"
        };
        var dictSymbol = {
            "shaoyin": "\\blacksquare \\square \\blacksquare",
            "shaoyang": "\\blacksquare \\blacksquare \\blacksquare",
            "laoyin": "\\blacksquare \\;\\;\\; \\blacksquare \\;\\times",
            //"laoyin": "\\blacksquare \\square \\blacksquare \\;\\times",
            "laoyang": "\\blacksquare \\blacksquare \\blacksquare \\;\\odot"
        };
        var pattern = /\\yao\{([\S]+)\}/;
        var match = arg.match(pattern);
        if (match) {
            var found = dictYao[match[1].toString()];
            if (found) {
                return dictSymbol[found];
            } else {
                return "\\text{语法错误，无法解释爻符。}";
            }
        }
    };
    LatexHelp.gualineToTex = function (line) {
        var res = [];
        var num = 0;
        for (var i = 0; i < line.length; i++) {
            var yaopattern = /[0123]{1}/;
            var match = line[i].toString().match(yaopattern);
            if (match) {
                num = line[i];
                var yaosym = LatexHelp.getYaoSymbol("\\yao{" + num % 2 + "}");
                res.push(yaosym + "\\text{" + line[i + 1] + "}");
                i++;
            } else if (line[i] == ">") {
                var jiaozhong = num == 2 ? "\\times" : "\\odot";
                res.push(jiaozhong + "\\to");
            } else {
                res.push("\\text{" + line[i] + "}");
            }
        }
        return res;
    };
    // font: "bold|color"
    LatexHelp.buildTexLine = function (content, font) {
        var output = [];
        var args = (font || "").trim().split("|").removeEmpty();
        var bold = args.includes("bold");
        var color = args.where(function (i) {
            return i != "bold";
        })[0];
        content.forEach(function (e) {
            if (bold) {
                output.push("\\textbf{" + e + "}");
            } else {
                output.push(e == "" || e.startsWith("\\") ? e : e.Latex(color));
            }
        });
        return output.join(" & ") + "\\\\";
    };
    LatexHelp.GUA_ID = "gua1";
    LatexHelp.BAZI_ID = "bz1";
    LatexHelp.Version = "1.1.0(2020-05-06) \n版权所有者：鎏金天涯";
    LatexHelp.COLOR = "color";
    LatexHelp.ShowDebug = false;
    return LatexHelp;
}();
exports.LatexHelp = LatexHelp;

},{}],3:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var wuxing_1 = require("./wuxing");
var tyGan = /** @class */function () {
    function tyGan(index, name) {
        this.index = index;
        this.name = name;
    }
    Object.defineProperty(tyGan.prototype, "Name", {
        get: function get() {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGan.prototype, "Index", {
        get: function get() {
            return this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGan.prototype, "WuXing", {
        get: function get() {
            var idx = Math.floor(this.Index / 2);
            idx = (idx + 2) % 5;
            return wuxing_1.FetchWuXing(idx);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGan.prototype, "ChangSheng", {
        get: function get() {
            return this.GetChangSheng(null);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGan.prototype, "QiYueGan", {
        get: function get() {
            var start = this.Index % 5 * 2;
            start = (start + 2) % 10;
            return start;
        },
        enumerable: true,
        configurable: true
    });
    ;
    Object.defineProperty(tyGan.prototype, "QiShiGan", {
        get: function get() {
            var start = this.Index % 5 * 2;
            return start;
        },
        enumerable: true,
        configurable: true
    });
    ;
    tyGan.prototype.Ref = function (gan, huahe) {
        if (huahe === void 0) {
            huahe = false;
        }
        var notuse_huahe = !tyGan.HuahePianCai;
        if (huahe) {
            notuse_huahe = !huahe;
        }
        var real = this.Index % 2 == gan.Index % 2;
        var wx = this.WuXing;
        var base = gan.WuXing;
        if (wx.Ke == base.Index) {
            return real ? ['七杀', '杀'] : ['正官', '官'];
        } else if (wx.Sheng == base.Index) {
            return real ? ['枭神', '枭'] : ['正印', '印'];
        } else if (base.Ke == wx.Index) {
            return real !== notuse_huahe ? ['正财', '财'] : ['偏财', '才'];
        } else if (base.Sheng == wx.Index) {
            return real ? ['食神', '食'] : ['伤官', '伤'];
        } else {
            return real ? ['比肩', '比'] : ['劫财', '劫'];
        }
    };
    tyGan.prototype.GetChangSheng = function (shuitu) {
        var use_shuitugongchangsheng = tyGan.Shuitugongchangsheng;
        if (shuitu) {
            use_shuitugongchangsheng = shuitu;
        }
        var table = use_shuitugongchangsheng ? tyGan.changshengIndexes_shuitu : tyGan.changshengIndexes;
        if (this.Index % 2 === 0) {
            var idx = Math.floor(this.Index / 2);
            return table[idx];
        } else {
            var idx = Math.floor((this.Index - 1) / 2);
            return (table[idx] + 7) % 12;
        }
    };
    // 通用：火土共长生。木 火 土 金 水 
    tyGan.changshengIndexes = [11, 2, 2, 5, 8];
    // 华鹤：水土共长生。
    tyGan.changshengIndexes_shuitu = [11, 2, 8, 5, 8];
    tyGan.Shuitugongchangsheng = false;
    tyGan.HuahePianCai = false;
    return tyGan;
}();
var gans = new Array();
function initGans() {
    if (gans.length === 10) {
        return;
    }
    gans.push(new tyGan(0, '甲'));
    gans.push(new tyGan(1, '乙'));
    gans.push(new tyGan(2, '丙'));
    gans.push(new tyGan(3, '丁'));
    gans.push(new tyGan(4, '戊'));
    gans.push(new tyGan(5, '己'));
    gans.push(new tyGan(6, '庚'));
    gans.push(new tyGan(7, '辛'));
    gans.push(new tyGan(8, '壬'));
    gans.push(new tyGan(9, '癸'));
}
var tyZhi = /** @class */function () {
    function tyZhi(index, name, gans) {
        this.index = index;
        this.name = name;
        this.gans = gans;
    }
    Object.defineProperty(tyZhi.prototype, "Name", {
        get: function get() {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyZhi.prototype, "Index", {
        get: function get() {
            return this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyZhi.prototype, "WuXing", {
        get: function get() {
            switch (this.Index) {
                case 2:
                case 3:
                    return wuxing_1.FetchWuXing('木');
                case 5:
                case 6:
                    return wuxing_1.FetchWuXing('火');
                case 8:
                case 9:
                    return wuxing_1.FetchWuXing('金');
                case 0:
                case 11:
                    return wuxing_1.FetchWuXing('水');
                default:
                    return wuxing_1.FetchWuXing('土');
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyZhi.prototype, "CGan", {
        get: function get() {
            var res = new Array();
            for (var _i = 0, _a = this.gans; _i < _a.length; _i++) {
                var i = _a[_i];
                res.push(Gan(i));
            }
            return res;
        },
        enumerable: true,
        configurable: true
    });
    tyZhi.prototype.ChangSheng = function (gan) {
        return this.GetChangSheng(gan, undefined);
    };
    tyZhi.prototype.Ref = function (gan) {
        var real = this.Index % 2 == gan.Index % 2;
        var wx = this.WuXing;
        var base = gan.WuXing;
        if (wx.Ke == base.Index) {
            return real ? ['七杀', '杀'] : ['正官', '官'];
        } else if (wx.Sheng == base.Index) {
            return real ? ['正印', '印'] : ['枭神', '枭'];
        } else if (base.Ke == wx.Index) {
            return real ? ['正财', '财'] : ['偏财', '才'];
        } else if (base.Sheng == wx.Index) {
            return real ? ['伤官', '伤'] : ['食神', '食'];
        } else {
            return real ? ['比肩', '比'] : ['劫财', '劫'];
        }
    };
    tyZhi.prototype.GetChangSheng = function (gan, shuitu) {
        var index = gan.GetChangSheng(shuitu);
        var direction = gan.Index % 2 === 0 ? 1 : -1;
        for (var i = 0; i < 12; i++) {
            var izhi = (index + i * direction + 12) % 12;
            if (izhi === this.Index) {
                return tyZhi.changShengDefs[i];
            }
        }
        return 'Error';
    };
    tyZhi.changShengDefs = ["长生", "沐浴", "冠带", "临官", "帝旺", "衰", "病", "死", "墓", "绝", "胎", "养"];
    return tyZhi;
}();
var zhis = new Array();
function initZhis() {
    if (zhis.length === 12) {
        return;
    }
    zhis.push(new tyZhi(0, '子', [9]));
    zhis.push(new tyZhi(1, '丑', [9, 7, 5]));
    zhis.push(new tyZhi(2, '寅', [0, 2, 5]));
    zhis.push(new tyZhi(3, '卯', [1]));
    zhis.push(new tyZhi(4, '辰', [1, 4, 9]));
    zhis.push(new tyZhi(5, '巳', [2, 4, 6]));
    zhis.push(new tyZhi(6, '午', [3]));
    zhis.push(new tyZhi(7, '未', [1, 3, 5]));
    zhis.push(new tyZhi(8, '申', [5, 6, 8]));
    zhis.push(new tyZhi(9, '酉', [7]));
    zhis.push(new tyZhi(10, '戌', [3, 4, 7]));
    zhis.push(new tyZhi(11, '亥', [0, 4, 8]));
}
var ConfigGanZhi = /** @class */function () {
    function ConfigGanZhi() {}
    Object.defineProperty(ConfigGanZhi, "ChangSheng", {
        get: function get() {
            return tyGan.Shuitugongchangsheng;
        },
        set: function set(shuitu) {
            // shuitu==true ：使用「水土共长生」， 否则「火土共长生」
            tyGan.Shuitugongchangsheng = shuitu || false;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ConfigGanZhi, "Huahe", {
        get: function get() {
            return tyGan.HuahePianCai;
        },
        set: function set(huahe) {
            tyGan.HuahePianCai = huahe || false;
        },
        enumerable: true,
        configurable: true
    });
    return ConfigGanZhi;
}();
exports.ConfigGanZhi = ConfigGanZhi;
function Gan(para) {
    initGans();
    if (typeof para == 'string') {
        var res = gans.filter(function (g) {
            return g.Name == para;
        });
        if (res.length === 1) {
            return res[0];
        }
    } else if (typeof para == 'number') {
        if (para >= 0 && para <= 9) {
            return gans[para];
        }
    }
    throw new Error('Parameter Error of Gan: ' + para + ' is not valiad');
}
exports.Gan = Gan;
function GanNames() {
    initGans();
    return gans.map(function (g) {
        return g.Name;
    });
}
exports.GanNames = GanNames;
function Zhi(para) {
    initZhis();
    if (typeof para == 'string') {
        if (para == '戍') para = '戌';
        var res = zhis.filter(function (z) {
            return z.Name == para;
        });
        if (res.length === 1) {
            return res[0];
        }
    } else if (typeof para == 'number') {
        if (para >= 0 && para <= 11) {
            return zhis[para];
        }
    }
    throw new Error('Parameter Error of Gan: ' + para + ' is not valiad');
}
exports.Zhi = Zhi;
function ZhiNames() {
    initZhis();
    return zhis.map(function (z) {
        return z.Name;
    });
}
exports.ZhiNames = ZhiNames;
var GanZhi = /** @class */function () {
    function GanZhi(input) {
        if (Array.isArray(input) && input.length == 2) {
            this.Gan = Gan(input[0]);
            this.Zhi = Zhi(input[1]);
        } else if (typeof input == 'string') {
            this.Gan = input.length == 2 ? Gan(input.substring(0, 1)) : null;
            this.Zhi = input.length == 2 ? Zhi(input.substring(1, 2)) : Zhi(input.substring(0, 1));
        } else if (typeof input == 'number' && input >= 0 && input <= 59) {
            var gan = input % 10;
            var zhi = input % 12;
            this.Gan = Gan(gan);
            this.Zhi = Zhi(zhi);
        }
        this.Config(tyGan.Shuitugongchangsheng, tyGan.HuahePianCai);
        if (this.Zhi == null || this.Zhi === undefined) {
            throw new Error('GanZhi Error: parameter ' + input + ' is not valid.');
        }
    }
    Object.defineProperty(GanZhi, "GanZhiNames", {
        get: function get() {
            var gans = GanNames();
            var zhis = ZhiNames();
            var res = new Array();
            for (var g = 0; g < gans.length; g++) {
                for (var z = 0; z < zhis.length; z++) {
                    if (g % 2 == z % 2) {
                        res.push(gans[g] + zhis[z]);
                    }
                }
            }
            return res;
        },
        enumerable: true,
        configurable: true
    });
    GanZhi.prototype.Config = function (shuitu, huahe) {
        this.shuitu = shuitu || false;
        this.huahe = huahe || false;
    };
    Object.defineProperty(GanZhi.prototype, "Name", {
        get: function get() {
            return this.Gan ? this.Gan.Name + this.Zhi.Name : this.Zhi.Name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanZhi.prototype, "Index", {
        get: function get() {
            return this.Gan ? this.calcIndex(this.Gan.Index, this.Zhi.Index) : this.Zhi.Index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanZhi.prototype, "NaYin", {
        get: function get() {
            if (this.Gan == null) return '';
            return GanZhi.NaYins[Math.floor(this.Index / 2)];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanZhi.prototype, "Shen10Gan", {
        get: function get() {
            if (!this.Base) throw new Error('BaseGan is not defined.');
            if (this === this.Base) {
                return ['日主', '日'];
            }
            return this.Gan.Ref(this.Base.Gan, this.huahe);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanZhi.prototype, "Shen10Zhi", {
        get: function get() {
            if (!this.Base) throw new Error('BaseGan is not defined.');
            return this.Zhi.Ref(this.Base.Gan);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(GanZhi.prototype, "ChangSheng", {
        get: function get() {
            if (this.Base) {
                return this.Zhi.GetChangSheng(this.Base.Gan, this.shuitu);
            } else {
                return '';
            }
        },
        enumerable: true,
        configurable: true
    });
    GanZhi.prototype.calcIndex = function (gan, zhi) {
        var iTemp = (zhi - gan + 12) % 12 / 2;
        iTemp = (6 - iTemp) % 6 * 10;
        return iTemp + gan;
    };
    GanZhi.NaYins = ["海中金", "炉中火", "大林木", "路旁土", "剑峰金", "山头火", "涧下水", "城墙土", "白蜡金", "杨柳木", "泉中水", "屋上土", "霹雳火", "松柏木", "长流水", "沙中金", "山下火", "平地木", "壁上土", "金箔金", "佛灯火", "天河水", "大驿土", "钗钏金", "桑松木", "大溪水", "沙中土", "天上火", "石榴木", "大海水"];
    return GanZhi;
}();
exports.GanZhi = GanZhi;

},{"./wuxing":7}],4:[function(require,module,exports){
"use strict";

var _typeof = typeof Symbol === "function" && typeof Symbol.iterator === "symbol" ? function (obj) { return typeof obj; } : function (obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; };

Object.defineProperty(exports, "__esModule", { value: true });
var tylunar_1 = require("./tylunar");
var ganzhi_1 = require("./ganzhi");
var shensha_1 = require("./shensha");
var wuxing_1 = require("./wuxing");
function int2str(num, length, base) {
    var radix = base == null || base == undefined ? 2 : base;
    var res = num.toString(radix);
    if (res.length >= length) {
        return res;
    } else {
        while (res.length < length) {
            res = "0" + res;
        }return res;
    }
}
;
var tyGua8 = /** @class */function () {
    function tyGua8(index, name, namev, wuxing, zhis, nagan) {
        this.index = index;
        this.name = name;
        this.namev = namev;
        this.wuxing = wuxing;
        this.zhis = zhis;
        this.nagan = nagan;
        this.value = int2str(index, 3, 2);
    }
    Object.defineProperty(tyGua8.prototype, "Index", {
        get: function get() {
            return this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua8.prototype, "Name", {
        get: function get() {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua8.prototype, "NameV", {
        get: function get() {
            return this.namev;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua8.prototype, "Value", {
        get: function get() {
            return this.value;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua8.prototype, "WuXing", {
        get: function get() {
            return this.wuxing;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua8.prototype, "Zhis", {
        get: function get() {
            return this.zhis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua8.prototype, "NaGan", {
        get: function get() {
            return this.nagan;
        },
        enumerable: true,
        configurable: true
    });
    tyGua8.prototype.GanZhi = function (idx) {
        idx = (idx + 6) % 6;
        if (idx < 3) {
            return new ganzhi_1.GanZhi([this.NaGan[0], this.Zhis[idx]]);
        } else {
            return new ganzhi_1.GanZhi([this.NaGan[1], this.Zhis[idx]]);
        }
    };
    return tyGua8;
}();
var gua8Collection = new Array();
function initGua8Collection() {
    if (gua8Collection.length === 8) return;
    gua8Collection.push(new tyGua8(0, "坤", "地", 4, [7, 5, 3, 1, 11, 9], [1, 9]));
    gua8Collection.push(new tyGua8(1, "震", "雷", 2, [0, 2, 4, 6, 8, 10], [6, 6]));
    gua8Collection.push(new tyGua8(2, "坎", "水", 1, [2, 4, 6, 8, 10, 0], [4, 4]));
    gua8Collection.push(new tyGua8(3, "兑", "泽", 0, [5, 3, 1, 11, 9, 7], [3, 3]));
    gua8Collection.push(new tyGua8(4, "艮", "山", 4, [4, 6, 8, 10, 0, 2], [2, 2]));
    gua8Collection.push(new tyGua8(5, "离", "火", 3, [3, 1, 11, 9, 7, 5], [5, 5]));
    gua8Collection.push(new tyGua8(6, "巽", "风", 2, [1, 11, 9, 7, 5, 3], [7, 7]));
    gua8Collection.push(new tyGua8(7, "乾", "天", 0, [0, 2, 4, 6, 8, 10], [0, 8]));
}
var tyGua64 = /** @class */function () {
    function tyGua64(shang, xia) {
        this.shang = gua8Collection[shang];
        this.xia = gua8Collection[xia];
    }
    tyGua64.CalcGuaGong = function (shang, xia) {
        var iShiWei = -1;
        var iGuaGong = -1;
        //var tmp = parseInt(shang.toString(), 2) ^ parseInt(xia.toString(), 2);
        var tmp = shang ^ xia;
        switch (tmp) {
            case 7:
                iShiWei = 2;
                iGuaGong = shang;
                break;
            case 6:
                iShiWei = 3;
                iGuaGong = xia ^ 7;
                break;
            case 5:
                iShiWei = 3;
                iGuaGong = xia ^ 7;
                break;
            case 4:
                iShiWei = 4;
                iGuaGong = xia ^ 7;
                break;
            case 3:
                iShiWei = 1;
                iGuaGong = shang;
                break;
            case 2:
                iShiWei = 2;
                iGuaGong = xia;
                break;
            case 1:
                iShiWei = 0;
                iGuaGong = shang;
                break;
            case 0:
                iShiWei = 5;
                iGuaGong = shang;
                break;
        }
        ;
        iGuaGong = iGuaGong % 8;
        return { GuaGong: iGuaGong, ShiWei: iShiWei };
    };
    Object.defineProperty(tyGua64.prototype, "Shang", {
        get: function get() {
            return this.shang;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "Xia", {
        get: function get() {
            return this.xia;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "Index", {
        get: function get() {
            return this.Shang.Index * 8 + this.Xia.Index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "NameS", {
        get: function get() {
            return tyGua64.GuaNames[this.Index];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "Name", {
        get: function get() {
            if (this.Shang === this.Xia) {
                return this.Shang.Name + '为' + this.Shang.NameV;
            } else {
                return this.Shang.NameV + this.Xia.NameV + this.NameS;
            }
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "Mean", {
        get: function get() {
            var _this = this;
            var res = tyGua64.GuaChiJie.filter(function (jie) {
                return jie.indexOf(_this.Name) >= 0;
            });
            return res[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "GuaGong", {
        get: function get() {
            return gua8Collection[this.GuaGongI].Name + '宫';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "GuaGongI", {
        // 卦宫的标号
        get: function get() {
            var res = tyGua64.CalcGuaGong(this.Shang.Index, this.Xia.Index);
            return res.GuaGong;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "Shiyao", {
        get: function get() {
            var res = tyGua64.CalcGuaGong(this.Shang.Index, this.Xia.Index);
            return res.ShiWei;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "Property", {
        get: function get() {
            // 下卦的起支
            var xiaQi = this.Xia.Zhis[0];
            // 上卦的起支
            var shangQi = this.Shang.Zhis[3];
            var baseInfo = '';
            if (xiaQi + shangQi == 13 || xiaQi + shangQi == 1) {
                baseInfo += "六合";
            } else if (Math.abs(xiaQi - shangQi) == 6) {
                baseInfo += "六冲";
            }
            var tmp = parseInt(this.Shang.Value, 2) ^ parseInt(this.Xia.Value, 2);
            if (tmp == 5) {
                baseInfo += "游魂";
            } else if (tmp == 2) {
                baseInfo += "归魂";
            }
            return baseInfo;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "GanZhis", {
        get: function get() {
            if (!this.ganzhis) {
                this.ganzhis = new Array();
                var gan = this.Xia.NaGan[0];
                for (var _i = 0, _a = this.Xia.Zhis.slice(0, 3); _i < _a.length; _i++) {
                    var zhi = _a[_i];
                    var gz = new ganzhi_1.GanZhi([gan, zhi]);
                    this.ganzhis.push(gz);
                }
                gan = this.Shang.NaGan[1];
                for (var _b = 0, _c = this.Shang.Zhis.slice(3, 6); _b < _c.length; _b++) {
                    var zhi = _c[_b];
                    var gz = new ganzhi_1.GanZhi([gan, zhi]);
                    this.ganzhis.push(gz);
                }
            }
            return this.ganzhis;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(tyGua64.prototype, "WuXing", {
        get: function get() {
            var gua8 = gua8Collection[this.GuaGongI];
            return wuxing_1.FetchWuXing(gua8.wuxing);
        },
        enumerable: true,
        configurable: true
    });
    tyGua64.prototype.ZhiIndex = function (idx) {
        return this.GanZhis[(idx + 6) % 6].Index;
    };
    tyGua64.GuaChiJie = ["乾为天：强健、启始", "天风姤：疏漏、相遇", "天山遁：逃遁、隐退", "山地剥：剥落、显露", "火地晋：晋升、前进", "火天大有：收获、丰富", "风地观：考察、观望", "坎为水：坎凹、陷入", "巽为风：跟风、上行下效", "水泽节：节度、制约", "水雷屯：屯积、初始", "水火既济：顺其自然、顺畅", "泽火革：改变、革新", "雷火丰：丰富、张扬", "地水师：单一、率众", "艮为山：堆积、受阻", "山火贲：粉饰、礼仪", "地火明夷：前有险、动则伤", "山泽损：损失、受损", "火泽睽：反目、背驰", "雷山小过：过火，可补救过失", "天泽履：履行、持礼", "风山渐：渐近、缓近", "风泽中孚：坚持、诚信", "震为雷：突发、走动", "雷水解：解决、释放", "火风鼎：独当一面、极致", "地风升：进展、提升", "水风井：规划、局束", "雷泽归妹：如愿、回报", "泽雷随：跟随、归顺", "天地否：受阻、闭塞", "泽风大过：太过分、已遭损失", "风雷益：有益、受益", "山雷颐：颐表、培养", "风天小畜：浅积累，欠充分", "山风蛊：发动、谋事", "离为火：外露、绚丽", "山水蒙：启蒙、不清晰", "火山旅：旅行、客居", "风水涣：涣散、发散", "风火家人：亲人、归家、回收", "天水讼：谈判、诉讼", "坤为地：包含、承载", "天雷无妄：无妄为、无过失", "地雷复：反复、重复", "雷风恒：恒久、不变", "火雷噬嗑：沟通，有目的交流", "地泽临：临近、降临", "地天泰：通泰、通畅", "泽天夬：缺陷、不完整", "水天需：等待、筹备", "水地比：亲密、平等", "火水未济：阻碍、未达目的", "兑为泽：谈话、愉悦", "泽水困：受困、被围", "天火同人：随大流、与众同等", "泽地萃：突出、聚集 ", "泽山咸：参与、遍布", "雷天大壮：众所周知、正当其用", "水山蹇：行险、难关", "雷地豫：欢愉、犹豫", "地山谦：谦逊、深藏不露", "山天大畜：积畜已久、准备充分"];
    tyGua64.GuaNames = ["地", "复", "师", "临", "谦", "明夷", "升", "泰", "豫", "雷", "解", "归妹", "小过", "丰", "恒", "大壮", "比", "屯", "水", "节", "蹇", "既济", "井", "需", "萃", "随", "困", "泽", "咸", "革", "大过", "夬", "剥", "颐", "蒙", "损", "山", "贲", "蛊", "大畜", "晋", "噬嗑", "未济", "睽", "旅", "火", "鼎", "大有", "观", "益", "涣", "中孚", "渐", "家人", "风", "小畜", "否", "无妄", "讼", "履", "遁", "同人", "姤", "天"];
    return tyGua64;
}();
var gua64Collection = new Array();
function initGua64Collection() {
    if (gua64Collection.length === 64) return;
    initGua8Collection();
    for (var shang = 0; shang < 8; shang++) {
        for (var xia = 0; xia < 8; xia++) {
            gua64Collection.push(new tyGua64(shang, xia));
        }
        ;
    }
    ;
}
var tyShen6 = ['青龙', '朱雀', '勾陈', '螣蛇', '白虎', '玄武'];
function Gua64(arg) {
    initGua64Collection();
    var index = isNaN(arg.toString()) ? -1 : parseInt(arg.toString());
    var name = typeof arg == 'string' ? arg : undefined;
    if (typeof index == 'number' && index >= 0 && index < 64) {
        return gua64Collection[index];
    } else if (name) {
        name = name.length >= 3 ? name.substr(2) : name;
        var idx = tyGua64.GuaNames.indexOf(name);
        if (idx >= 0) {
            return gua64Collection[idx];
        }
    }
    var pattern = /[地雷水泽山火风天]{2}/;
    name = arg.toString();
    if (name.match(pattern)) {
        var tmp = "地雷水泽山火风天";
        var idx1 = tmp.indexOf(name.substr(0, 1));
        var idx2 = tmp.indexOf(name.substr(1, 1));
        return gua64Collection[idx1 * 8 + idx2];
    }
    throw new Error("\u516D\u5341\u56DB\u5366\u7684\u5366\u540D\u6216\u8005\u5E8F\u5217\u53F7\u51FA\u9519: " + arg.toString() + ", " + (typeof arg === "undefined" ? "undefined" : _typeof(arg)));
}
exports.Gua64 = Gua64;
var Gua = /** @class */function () {
    //time: Date, yue: string, ri: string,
    function Gua(shiling, ben, bian) {
        initGua64Collection();
        var time = typeof shiling == "string" ? shiling.parseDate() : undefined;
        var yueri = Array.isArray(shiling) ? shiling : undefined;
        if (time) {
            var correctTime = new Date(time.getTime() + 60 * 60 * 1000);
            var date = new tylunar_1.TYDate(correctTime);
            this.guatime = [new ganzhi_1.GanZhi(date.GZmonth), new ganzhi_1.GanZhi(date.GZdate)];
        } else {
            var gzYue = new ganzhi_1.GanZhi(yueri[0]);
            var gzRi = new ganzhi_1.GanZhi(yueri[1]);
            this.guatime = [gzYue, gzRi];
        }
        if (!bian) {
            bian = ben;
        }
        ben = ben.replace(" ", "");
        bian = bian.replace(" ", "");
        var guatextes = ben.split("之");
        if (guatextes.length == 2) {
            ben = guatextes[0];
            bian = guatextes[1];
        }
        this.bengua = Gua64(ben);
        this.biangua = Gua64(bian);
        var tmp = this.bengua.GuaGongI;
        this.fugua = Gua64(tmp * 8 + tmp);
        this.initShenSha();
        this.initShen6();
    }
    Object.defineProperty(Gua.prototype, "Yue", {
        get: function get() {
            return this.guatime[0];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "Ri", {
        get: function get() {
            return this.guatime[1];
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "ShenShas", {
        get: function get() {
            return this.shenshas;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "Ben", {
        get: function get() {
            return this.bengua;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "Bian", {
        get: function get() {
            return this.biangua;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "FuGua", {
        get: function get() {
            return this.fugua;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "Shen6", {
        get: function get() {
            return this.shen6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "Benyaos", {
        get: function get() {
            var v = this.Ben.Shang.Value + this.Ben.Xia.Value;
            var temp = v.split('');
            var benyaos = [];
            for (var i = 5; i >= 0; i--) {
                benyaos.push(parseInt(temp[i]));
            }
            var bianyaos = this.Bianyaos;
            for (var i = 5; i >= 0; i--) {
                if (benyaos[i] != bianyaos[i]) {
                    benyaos[i] += 2;
                }
            }
            return benyaos;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(Gua.prototype, "Bianyaos", {
        get: function get() {
            var v = this.Bian.Shang.Value + this.Bian.Xia.Value;
            var items = v.split('');
            var res = [];
            for (var i = 5; i >= 0; i--) {
                res.push(parseInt(items[i]));
            }
            return res;
        },
        enumerable: true,
        configurable: true
    });
    // 返回每一行的地支下标。
    Gua.prototype.GetLineZhi = function (idx) {
        var hasFugua = this.FuGua.GanZhis.map(function (g) {
            return g.Index;
        }).join() != this.Ben.GanZhis.map(function (g) {
            return g.Index;
        }).join();
        var hasBianGua = this.Ben.Index != this.Bian.Index;
        var line = new Array();
        if (hasFugua) {
            var same = this.FuGua.GanZhis[idx - 1].Zhi.Index == this.Ben.GanZhis[idx - 1].Zhi.Index;
            line.push(same ? "" : this.FuGua.GanZhis[idx - 1].Zhi.Index.toString());
        }
        line.push(this.Ben.GanZhis[idx - 1].Zhi.Index.toString());
        if (hasBianGua) {
            line.push(this.Bian.GanZhis[idx - 1].Zhi.Index.toString());
        }
        return line;
    };
    // 返回每一行的地支或者文本
    Gua.prototype.GetLine = function (idx, short) {
        if (short === void 0) {
            short = false;
        }
        var hasFugua = this.FuGua.GanZhis.map(function (g) {
            return g.Index;
        }).join() != this.Ben.GanZhis.map(function (g) {
            return g.Index;
        }).join();
        var hasBianGua = this.Ben.Index != this.Bian.Index;
        var wuxing = this.Ben.WuXing;
        var line = new Array();
        line.push(short ? this.shen6[idx - 1].substring(1) : this.shen6[idx - 1]);
        if (hasFugua) {
            var same = this.FuGua.GanZhis[idx - 1].Zhi.Index == this.Ben.GanZhis[idx - 1].Zhi.Index;
            if (!same) {
                var gz = this.FuGua.GanZhis[idx - 1].Zhi;
                var txt = short ? gz.WuXing.Ref(wuxing)[1] + gz.Name : gz.WuXing.Ref(wuxing)[0] + gz.Name + gz.WuXing.Name;
                line.push(txt);
            } else {
                line.push("");
            }
        }
        line.push(this.Benyaos[idx - 1]);
        var gzBen = this.Ben.GanZhis[idx - 1].Zhi;
        var txtBen = short ? gzBen.WuXing.Ref(wuxing)[1] + gzBen.Name : gzBen.WuXing.Ref(wuxing)[0] + gzBen.Name + gzBen.WuXing.Name;
        line.push(txtBen);
        if (this.Ben.Shiyao == idx - 1) {
            line.push("世");
        } else if ((this.Ben.Shiyao + 3) % 6 == idx - 1) {
            line.push("应");
        } else {
            line.push("");
        }
        if (hasBianGua) {
            line.push(this.Benyaos[idx - 1] > 1 ? ">" : "");
            var gzBian = this.Bian.GanZhis[idx - 1].Zhi;
            line.push(this.Bianyaos[idx - 1]);
            var txtBian = short ? gzBian.WuXing.Ref(wuxing)[1] + gzBian.Name : gzBian.WuXing.Ref(wuxing)[0] + gzBian.Name + gzBian.WuXing.Name;
            line.push(txtBian);
        }
        return line;
    };
    Gua.prototype.equal = function (gua) {
        return this.Yue.Index == gua.Yue.Index && this.Ri.Index == gua.Ri.Index && this.Ben.Index == gua.Ben.Index && this.Bian.Index == gua.Bian.Index;
    };
    Gua.prototype.initShenSha = function () {
        this.shenshas = [];
        this.shenshas.push(new shensha_1.ShenSha('将星', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('华盖', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('驿马', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('谋星', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('桃花', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('灾煞', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('劫煞', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('禄神', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('羊刃', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('文昌', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('天喜', [this.guatime[0].Index]));
        this.shenshas.push(new shensha_1.ShenSha('天医', [this.guatime[0].Index]));
        this.shenshas.push(new shensha_1.ShenSha('贵人', [this.guatime[1].Index]));
        this.shenshas.push(new shensha_1.ShenSha('旬空', [this.guatime[1].Index]));
    };
    Gua.prototype.initShen6 = function () {
        this.shen6 = [];
        var start = this.guatime[1].Gan.Index;
        start = start >= 5 ? Math.floor((start + 2) / 2) : Math.floor(start / 2);
        for (var idx = 0; idx < 6; idx++) {
            var index = (start + idx) % 6;
            this.shen6.push(tyShen6[index].substring(0, 2));
        }
    };
    return Gua;
}();
exports.Gua = Gua;

},{"./ganzhi":3,"./shensha":5,"./tylunar":6,"./wuxing":7}],5:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ganzhi_1 = require("./ganzhi");
var common_1 = require("./common");
// 申子辰804 寅午戌2610 巳酉丑591 亥卯未1137
// Fetch: 取干支方式 -> 地支三合
function fetchSanhe(gz) {
    return gz % 12 % 4;
}
// 直接取干
function fetchGan(gz) {
    return gz % 10;
}
// 三会 亥子丑0 寅卯辰1....
function fetchSanhui(gz) {
    return Math.floor((gz + 1) % 12 / 3);
}
// 天医 取上个月地支
function fetchTianyi(gz) {
    var zhi = gz % 12;
    return (zhi - 1 + 12) % 12;
}
// 旬空
function fetchXunkong(gz) {
    // gz 按甲子 乙卯 的原始干支
    var index = 10 - Math.floor(gz / 10) * 2;
    return [index, index + 1];
}
var baseShenShas = new Array();
function initBaseShenShas() {
    if (baseShenShas.length > 0) {
        return;
    }
    baseShenShas.push({ Name: '将星', Pattern: [0, 9, 6, 3], Fetch: '三合' });
    baseShenShas.push({ Name: '华盖', Pattern: [4, 1, 10, 7], Fetch: '三合' });
    baseShenShas.push({ Name: '驿马', Pattern: [2, 11, 8, 5], Fetch: '三合' });
    baseShenShas.push({ Name: '谋星', Pattern: [10, 7, 4, 1], Fetch: '三合' });
    baseShenShas.push({ Name: '桃花', Pattern: [9, 6, 3, 0], Fetch: '三合' });
    baseShenShas.push({ Name: '灾煞', Pattern: [6, 3, 0, 9], Fetch: '三合' });
    baseShenShas.push({ Name: '劫煞', Pattern: [5, 2, 11, 8], Fetch: '三合' });
    baseShenShas.push({ Name: '禄神', Pattern: [2, 3, 5, 6, 5, 6, 8, 9, 11, 0], Fetch: '干' });
    baseShenShas.push({ Name: '羊刃', Pattern: [3, 2, 6, 5, 6, 5, 9, 8, 0, 11], Fetch: '干' });
    baseShenShas.push({ Name: '文昌', Pattern: [5, 6, 8, 9, 8, 9, 11, 0, 2, 3], Fetch: '干' });
    baseShenShas.push({ Name: '学堂', Pattern: [11, 11, 2, 2, 8, 8, 5, 5, 8, 8], Fetch: '干' });
    baseShenShas.push({ Name: '贵人', Pattern: [[1, 7], [8, 0], [11, 9], [11, 9], [1, 7], [8, 0], [2, 6], [2, 6], [3, 5], [3, 5]], Fetch: '贵人' });
    baseShenShas.push({ Name: '天喜', Pattern: [7, 10, 1, 4], Fetch: '三会' });
    baseShenShas.push({ Name: '天医', Pattern: null, Fetch: '天医' });
    baseShenShas.push({ Name: '旬空', Pattern: null, Fetch: '旬空' });
    baseShenShas.push({ Name: '魁罡', Pattern: null, Fetch: null });
    baseShenShas.push({ Name: '四废', Pattern: null, Fetch: null });
    baseShenShas.push({ Name: '孤辰寡宿', Pattern: null, Fetch: null });
    baseShenShas.push({ Name: '天罗地网', Pattern: null, Fetch: null });
    baseShenShas.push({ Name: '阴差阳错', Pattern: null, Fetch: null });
}
var ShenSha = /** @class */function () {
    // ganzhi: 干支的下标。根据给定的干支，计算所有的神煞地支。
    //         神煞是根据年，或者月，或者日取用的。所以必须给定要计算的干支。
    function ShenSha(name, ganzhi) {
        this.name = name;
        this.ganzhi = ganzhi;
        initBaseShenShas();
        var shenshas = baseShenShas.filter(function (ss) {
            return ss['Name'] == name;
        });
        this.pattern = shenshas[0]['Pattern'];
        this.fetchName = shenshas[0]['Fetch'];
    }
    Object.defineProperty(ShenSha.prototype, "Name", {
        get: function get() {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(ShenSha.prototype, "Result", {
        get: function get() {
            if (this.result) return this.result;
            if (this.Name == '魁罡') {
                this.result = this.getKuiGang();
            } else if (this.Name == '四废') {
                var yue = this.ganzhi[1];
                this.result = this.getSiFei(yue);
            } else if (this.Name == '孤辰寡宿') {
                this.result = this.getGuChengGuaShu(this.ganzhi[0]);
            } else if (this.Name == '阴差阳错') {
                this.result = this.getYinChaYangCuo();
            } else if (this.Name == '天罗地网') {
                this.result = this.getTianLuoDiWang(this.Gender == 'm');
            } else {
                this.result = this.getNormalResult();
            }
            return this.result.filter(common_1.onlyUnique);
        },
        enumerable: true,
        configurable: true
    });
    ShenSha.prototype.Is = function (gz) {
        if (this.Result.length > 0) {
            for (var _i = 0, _a = this.result; _i < _a.length; _i++) {
                var item = _a[_i];
                if (item == gz.Zhi.Name) {
                    return true;
                }
            }
        } else {
            if (this.Name == '天罗地网') {
                return this.IsTianLuoDiWang(gz.Index);
            } else {
                var index = this.Name == '孤辰寡宿' ? gz.Index % 12 : gz.Index;
                for (var _b = 0, _c = this.pattern; _b < _c.length; _b++) {
                    var p = _c[_b];
                    if (p == index) {
                        return true;
                    }
                }
            }
        }
        return false;
    };
    ShenSha.prototype.normalFetch = function (gz) {
        if (this.fetchName == '三合') {
            return [this.pattern[fetchSanhe(gz)]];
        } else if (this.fetchName == '干') {
            return [this.pattern[fetchGan(gz)]];
        } else if (this.fetchName == '三会') {
            return [this.pattern[fetchSanhui(gz)]];
        } else if (this.fetchName == '天医') {
            return [fetchTianyi(gz)];
        } else if (this.fetchName == '旬空') {
            return fetchXunkong(gz);
        } else if (this.fetchName == '贵人') {
            var res = this.pattern[fetchGan(gz)];
            return [res[0], res[1]];
        }
    };
    ShenSha.prototype.getNormalResult = function () {
        // 求算支下标
        var numbers = new Array();
        for (var _i = 0, _a = this.ganzhi; _i < _a.length; _i++) {
            var gz = _a[_i];
            if (this.fetchName) {
                numbers = numbers.concat(this.normalFetch(gz));
            }
        }
        // 将支下标换算成支文字
        var result = new Array();
        for (var _b = 0, numbers_1 = numbers; _b < numbers_1.length; _b++) {
            var num = numbers_1[_b];
            var zhi = ganzhi_1.Zhi(num);
            result.push(zhi.Name);
        }
        if (result.length == 2 && result[0] == result[1]) {
            return [result[0]];
        }
        return result;
    };
    // 计算魁罡
    ShenSha.prototype.getKuiGang = function () {
        var tmp = [new ganzhi_1.GanZhi('庚戌'), new ganzhi_1.GanZhi('庚辰'), new ganzhi_1.GanZhi('戊戌'), new ganzhi_1.GanZhi('壬辰')];
        this.pattern = tmp.map(function (gz) {
            return gz.Index;
        });
        for (var _i = 0, _a = this.ganzhi; _i < _a.length; _i++) {
            var gz = _a[_i];
            for (var _b = 0, _c = this.pattern; _b < _c.length; _b++) {
                var p = _c[_b];
                if (gz == p) {
                    return ['√'];
                }
            }
        }
        return [];
    };
    //  计算四废
    ShenSha.prototype.getSiFei = function (yue) {
        var tmp = [];
        switch (yue % 12) {
            case 2:
            case 3:
                tmp = [new ganzhi_1.GanZhi('庚申'), new ganzhi_1.GanZhi('辛酉')];
                break;
            case 5:
            case 6:
                tmp = [new ganzhi_1.GanZhi('壬子'), new ganzhi_1.GanZhi('癸亥')];
                break;
            case 8:
            case 9:
                tmp = [new ganzhi_1.GanZhi('甲寅'), new ganzhi_1.GanZhi('乙卯')];
                break;
            case 0:
            case 11:
                tmp = [new ganzhi_1.GanZhi('丙午'), new ganzhi_1.GanZhi('丁巳')];
                break;
        }
        this.pattern = tmp.map(function (p) {
            return p.Index;
        });
        // 寅卯月见庚申、辛酉
        // 春庚申，辛酉，夏壬子，癸亥，秋甲寅，乙卯，冬丙午，丁巳
        for (var _i = 0, _a = this.ganzhi; _i < _a.length; _i++) {
            var gz = _a[_i];
            for (var _b = 0, _c = this.pattern; _b < _c.length; _b++) {
                var p = _c[_b];
                if (gz == p) {
                    return ['√'];
                }
            }
        }
        return [];
    };
    // 计算孤辰寡宿
    ShenSha.prototype.getGuChengGuaShu = function (year) {
        // 亥子丑年生人，柱中见寅为孤见戌为寡
        // 寅卯辰年生人，柱中见巳为孤见丑为寡
        // 巳午未年生人，柱中见申为孤见辰为寡
        // 申酉戌年生人，柱中见亥为孤见未为寡
        var flag = Math.floor((year + 1) % 12 / 3);
        switch (flag) {
            case 0:
                this.pattern = [2, 10];
                break;
            case 1:
                this.pattern = [5, 1];
                break;
            case 2:
                this.pattern = [8, 4];
                break;
            case 3:
                this.pattern = [11, 7];
                break;
        }
        for (var _i = 0, _a = this.ganzhi; _i < _a.length; _i++) {
            var gz = _a[_i];
            for (var _b = 0, _c = this.pattern; _b < _c.length; _b++) {
                var p = _c[_b];
                if (gz % 12 == p) {
                    return ['√'];
                }
            }
        }
        return [];
    };
    // 计算阴差阳错
    ShenSha.prototype.getYinChaYangCuo = function () {
        var tmp = ["丙子", "丙午", "丁丑", "丁未", "辛卯", "辛酉", "壬辰", "壬戌", "癸巳", "癸亥", "戊寅", "戊申"];
        this.pattern = tmp.map(function (n) {
            var gz = new ganzhi_1.GanZhi(n);
            return gz.Index;
        });
        for (var _i = 0, _a = this.ganzhi; _i < _a.length; _i++) {
            var gz = _a[_i];
            for (var _b = 0, _c = this.pattern; _b < _c.length; _b++) {
                var p = _c[_b];
                if (gz == p) {
                    return ['√'];
                }
            }
        }
        return [];
    };
    //  计算天罗地网
    ShenSha.prototype.getTianLuoDiWang = function (male) {
        // 男命柱中辰、巳并见，谓之天罗；女命柱中戌、亥并见，谓之地网
        var res = 0;
        this.pattern = male ? [4, 5] : [10, 11];
        for (var _i = 0, _a = this.ganzhi; _i < _a.length; _i++) {
            var gz = _a[_i];
            var z = gz % 12;
            for (var idx = 0; idx < 2; idx++) {
                if (this.pattern[idx] == z) {
                    res = res | 1 << idx;
                }
            }
        }
        return res === 3 ? ['√'] : [];
    };
    ShenSha.prototype.IsTianLuoDiWang = function (para) {
        para = para % 12;
        var res = 0;
        for (var _i = 0, _a = this.ganzhi; _i < _a.length; _i++) {
            var gz = _a[_i];
            var z = gz % 12;
            for (var idx = 0; idx < 2; idx++) {
                if (this.pattern[idx] == z) {
                    res = res | 1 << idx;
                }
                if (this.pattern[idx] == para) {
                    res = res | 1 << idx;
                }
            }
        }
        return res === 3;
    };
    return ShenSha;
}();
exports.ShenSha = ShenSha;

},{"./common":2,"./ganzhi":3}],6:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ln = require("../libs/lunar");
var ganzhi_1 = require("./ganzhi");
Lunar = ln.Lunar;
var TYJianChu = [];
TYJianChu[0] = {
    Titel: "建日",
    Mean: "健旺之气。",
    Good: "宜祭祀、参官、行军、外出、求财、谒贵、交友、上书。",
    Bad: "忌动土、开仓祀灶、新船下水、兢渡。"
};
TYJianChu[1] = {
    Titel: "除日",
    Mean: "除旧布新之象。",
    Good: "宜除服、疗病、避邪、拆卸、出行、嫁娶。",
    Bad: "忌求官、上任、开张、搬家、探病。"
};
TYJianChu[2] = {
    Titel: "满日",
    Mean: "丰收圆满之意。",
    Good: "宜祈福、祭祀、结亲、开市、交易。扫舍、修置产室、裁衣、出行、入仓、开库、店市、求财、出行、修饰舍宇。",
    Bad: "忌服药、栽种、下葬、移徙、求医疗病、上官赴任。寅申巳亥四个月不宜经商。"
};
TYJianChu[3] = {
    Titel: "平日",
    Mean: "平常无吉凶之日。",
    Good: "一般修屋、求福、外出、求财、嫁娶可用。",
    Bad: "忌开渠、经络。"
};
TYJianChu[4] = {
    Titel: "定日",
    Mean: "定为不动，不动则为死气。",
    Good: "只宜计划、谋定。入学、祈福、裁衣、祭祀、结婚姻、纳采问名、求嗣、纳畜、交易亦可",
    Bad: "诸事不宜，尤忌官司、出行。"
};
TYJianChu[5] = {
    Titel: "执日",
    Mean: "固执之意，执持操守也。",
    Good: "一般宜祈福、祭祀、求子、结婚、立约。司法警察执拿案犯。",
    Bad: "忌搬家、远行、入宅、移居、出行、远回、开库、入仓、出纳货财、新船下水。"
};
TYJianChu[6] = {
    Titel: "破日",
    Mean: "刚旺破败之日。",
    Good: "宜求医、治病、破屋坏垣、服药、破贼。",
    Bad: "万事皆忘，婚姻不谐。不宜多管闲事。忌起工、动土、出行、远回、移徙、新船下水、嫁娶、进人口、祀灶、立契约、纳畜、修作。"
};
TYJianChu[7] = {
    Titel: "危日",
    Mean: "危险之意。",
    Good: "宜祭祀、祈福、纳表进章、结婚、纳采问名、捕捉、安床、交易、立契。",
    Bad: "忌登高、冒险、赌博。"
};
TYJianChu[8] = {
    Titel: "成日",
    Mean: "成功、成就、结果之意。",
    Good: "凡事皆有成。宜祭祀、祈福、入学、裁衣、结婚、纳采、嫁娶、纳表章、交易、立契、求医、修产室、出行、远回、移徙、纳畜。",
    Bad: "忌官司。"
};
TYJianChu[9] = {
    Titel: "收日",
    Mean: "收成之意。",
    Good: "经商开市、外出求财，买屋签约、嫁娶订盟诸事吉利。",
    Bad: "忌开市、安床、安葬、入宅、破土。"
};
TYJianChu[10] = {
    Titel: "开日",
    Mean: "开放、开心之意。",
    Good: "凡事求财、求子、求缘、求职、求名。",
    Bad: "埋葬主大凶。辰戌丑未四个月不宜经商。"
};
TYJianChu[11] = {
    Titel: "毕日",
    Mean: "坚固之意。",
    Good: "最宜埋葬，代表能富贵大吉大利。宜祈福、祭祀、求嗣、交易、立契、修合、补牆塞穴、作厕、安床设帐。",
    Bad: "忌看眼病、求医、问学、外出经商，上任就职。辰戌丑未四个月不宜远回、移徙、动土。"
};
var TYLunar = /** @class */function () {
    function TYLunar() {}
    TYLunar.getLunarObject = function (date) {
        var y = date.getFullYear();
        var m = date.getMonth() + 1;
        var d = date.getDate();
        if (Lunar.lun.length == 0 || Lunar.lun.y != y || Lunar.lun.m != m) {
            Lunar.calc2(date.getFullYear(), date.getMonth() + 1, true);
        }
        var lastjq = [];
        for (var i = 0; i < Lunar.lun.length; i++) {
            if (Lunar.lun[i].d == d) {
                Lunar.lun[i].lastjq = lastjq;
                return Lunar.lun[i];
            }
            if (Lunar.lun[i].jqmc != "" && Lunar.lun[i].jqsj.startsWith('23')) {
                lastjq = [Lunar.lun[i].jqmc, Lunar.lun[i].jqsj];
            }
        }
        return null;
    };
    TYLunar.addDays = function (daysOffset, baseDate) {
        var base = baseDate ? baseDate : TYLunar.BaseDay;
        return new Date(base.getTime() + daysOffset * TYLunar.OneDay);
    };
    ;
    TYLunar.calcDayDiff = function (first, second) {
        var d1 = new Date(first.getFullYear(), first.getMonth(), first.getDate());
        var d2 = new Date(second.getFullYear(), second.getMonth(), second.getDate());
        return Math.round((d2.getTime() - d1.getTime()) / TYLunar.OneDay);
    };
    ;
    // month 下标从1开始
    TYLunar.getSolarTerms = function (year, month) {
        // [0,'小寒'],[1,'大寒'],[2,'立春'],[3,'雨水'],[4,'惊蛰'],[5,'春分'],[6,'清明'],[7,'谷雨'],[8,'立夏']
        // [9,'小满'],[10,'芒种'],[11,'夏至'],[12,'小暑'],[13,'大暑'],[14,'立秋'],[15,'处暑'],[16,'白露'],
        // [17,'秋分'],[18,'寒露'],[19,'霜降'],[20,'立冬'],[21,'小雪'],[22,'大雪'],[23,'冬至'] 
        // solarTermsIndex == 0 为小寒
        var res = [];
        if (Lunar.lun.length == 0 || Lunar.lun.y != year || Lunar.lun.m != month) {
            Lunar.calc2(year, month, true);
        }
        for (var i = 0; i < Lunar.lun.length; i++) {
            if (Lunar.lun[i].jqsj != null && Lunar.lun[i].jqsj != "") {
                var o = Lunar.lun[i];
                var items = o.jqsj.split(':');
                res.push(new Date(year, month - 1, o.d, parseInt(items[0]), parseInt(items[1]), parseInt(items[2])));
            }
        }
        return res;
    };
    ;
    TYLunar.getJianChu = function (yueZhi, riZhi) {
        // 寅月以寅日为建日，卯月以卯日为建日，
        // 當推算出「建日」後，以後跟隨的日支，便繼續配上 除、滿、平、定、執、破、危、成、收、開、閉等十二神
        var yue = new ganzhi_1.GanZhi(yueZhi);
        var ri = new ganzhi_1.GanZhi(riZhi);
        var index = (ri.Zhi.Index - yue.Zhi.Index + 12) % 12;
        return TYJianChu[index];
    };
    // m, d分别是月日的下标，从1开始。
    TYLunar.SearchNongli = function (y, m, d) {
        var dateName = Lunar.rmc[d - 1];
        var yueName = Lunar.ymc[(Math.abs(m) + 1) % 12];
        var leap = m < 0 ? "闰" : "";
        // 如果三个月内都找不到的话就是没有。
        for (var i = 0; i < 3; i++) {
            var month = Math.abs(m) + i;
            var year = month >= 13 ? y + 1 : y;
            month = month >= 13 ? month % 12 : month;
            // 函数 Lunar.calc2() 月份的下标从1开始。
            Lunar.calc2(year, month, true);
            for (var d = 0; d < Lunar.lun.length; d++) {
                var dateObj = Lunar.lun[d];
                if (dateObj.Ldc == dateName && dateObj.Lmc == yueName && dateObj.Lleap == leap) {
                    return new Date(dateObj.y, dateObj.m - 1, dateObj.d);
                }
            }
        }
        return null;
    };
    // month 的下标从1开始
    TYLunar.calcBazi = function (year, month, day, hour, minute) {
        if (minute == undefined || minute == null) minute = 0;
        if (hour == undefined || hour == null) hour = 0;
        var bazi = {
            Y: null,
            M: null,
            D: null,
            T: null,
            Jieqi: null
        };
        // 23 点以后算明天
        var today = new Date(year, month - 1, day);
        var tydate = hour < 23 ? new TYDate(today) : new TYDate(TYLunar.addDays(1, today));
        bazi.Y = new ganzhi_1.GanZhi(tydate.GZyear);
        bazi.M = new ganzhi_1.GanZhi(tydate.GZmonth);
        bazi.D = new ganzhi_1.GanZhi(tydate.GZdate);
        //=========时干支=================================
        var zhi = Math.ceil(hour % 23 / 2.0);
        var gan = (bazi.D.Gan.QiShiGan + zhi) % 10;
        bazi.T = new ganzhi_1.GanZhi([gan, zhi]);
        return bazi;
    };
    TYLunar.findNextJieQi = function (date, direction) {
        var year = date.getFullYear();
        var month = date.getMonth();
        var jieqi = TYLunar.getSolarTerms(year, month + 1)[0];
        if (date <= jieqi && direction > 0) {
            return jieqi;
        } else if (date >= jieqi && direction < 0) {
            return jieqi;
        } else {
            var daysOff = direction == 1 ? 40 : -10;
            var nextdate = TYLunar.addDays(daysOff, jieqi);
            year = nextdate.getFullYear();
            month = nextdate.getMonth();
            return TYLunar.getSolarTerms(year, month + 1)[0];
        }
    };
    TYLunar.OneDay = 1000 * 60 * 60 * 24;
    TYLunar.BaseDay = new Date(1900, 0, 0);
    TYLunar.M_DayNames = ["初一", "初二", "初三", "初四", "初五", "初六", "初七", "初八", "初九", "初十", "十一", "十二", "十三", "十四", "十五", "十六", "十七", "十八", "十九", "二十", "廿一", "廿二", "廿三", "廿四", "廿五", "廿六", "廿七", "廿八", "廿九", "三十"];
    TYLunar.M_MonthNames = ["一", "二", "三", "四", "五", "六", "七", "八", "九", "十", "十一", "十二"];
    TYLunar.M_ChineseMonthNames = ["正", "二", "三", "四", "五", "六", "七", "八", "九", "十", "冬", "腊"];
    return TYLunar;
}();
exports.TYLunar = TYLunar;
;
var TYDate = /** @class */function () {
    function TYDate(date) {
        this.date = date;
        var lunarObj = TYLunar.getLunarObject(this.date);
        this.gzyear = lunarObj.Lyear2;
        this.gzmonth = lunarObj.Lmonth2;
        this.gzdate = lunarObj.Lday2;
        this.nlmonth = lunarObj.Lmc;
        this.nldate = lunarObj.Ldc;
        this.nlleap = lunarObj.Lleap;
        this.nldatei = lunarObj.Ldi;
        // tydate.Lmi = lunarObj;
        // tydate.jqmc = lunarObj.jqmc;
        this.adjustJieqi(lunarObj);
    }
    ;
    //  调整节气和换月、换年
    TYDate.prototype.adjustJieqi = function (lunarObj) {
        // 小于11点，才算当天的节气
        if (lunarObj.jqmc != "" && !lunarObj.jqsj.startsWith("23")) {
            this.jqtime = lunarObj.jqsj;
            this.jqname = lunarObj.jqmc;
        } else {
            this.jqtime = "";
            this.jqname = "";
        }
        // 23点以后换节气，当天的月令与年令适当调整
        // 第二个节气不换月的
        if (lunarObj.d < 15 && lunarObj.jqmc != "" && lunarObj.jqsj.startsWith("23")) {
            var gz = new ganzhi_1.GanZhi(this.gzmonth);
            var idx = (gz.Index - 1 + 60) % 60;
            this.gzmonth = new ganzhi_1.GanZhi(idx).Name;
            if (this.Month == 2) {
                gz = new ganzhi_1.GanZhi(this.gzyear);
                idx = (gz.Index - 1 + 60) % 60;
                this.gzyear = new ganzhi_1.GanZhi(idx).Name;
            }
        }
        if (lunarObj.lastjq.length == 2) {
            this.jqtime = lunarObj.lastjq[1];
            this.jqname = lunarObj.lastjq[0];
        }
    };
    TYDate.prototype.printLunar = function () {
        var lunarObj = TYLunar.getLunarObject(this.date);
        console.log("print Lunar: " + this.date);
        console.log(lunarObj);
    };
    Object.defineProperty(TYDate.prototype, "NLmonthFullName", {
        get: function get() {
            return this.NLleap + this.NLmonth + '月';
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "Display", {
        get: function get() {
            //return tydate.Date.getDate();
            return this.JQname != "" ? this.JQname : this.date.getDate().toString();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "DisplayChi", {
        get: function get() {
            return this.NLdate == "初一" ? this.NLmonthFullName : this.NLdate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "Month", {
        get: function get() {
            return this.date.getMonth() + 1;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "Date", {
        get: function get() {
            return this.date.getDate();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "Year", {
        get: function get() {
            return this.date.getFullYear();
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "GZyear", {
        get: function get() {
            return this.gzyear;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "GZmonth", {
        get: function get() {
            return this.gzmonth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "GZdate", {
        get: function get() {
            return this.gzdate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "NLmonth", {
        get: function get() {
            return this.nlmonth;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "NLdate", {
        get: function get() {
            return this.nldate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "NLleap", {
        get: function get() {
            return this.nlleap;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "NLdateIndex", {
        get: function get() {
            return this.nldatei;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "JQname", {
        get: function get() {
            return this.jqname;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "JQtime", {
        get: function get() {
            return this.jqtime;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "JianChu", {
        get: function get() {
            return TYLunar.getJianChu(this.GZmonth, this.GZdate);
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "IsSuiPo", {
        get: function get() {
            var year = new ganzhi_1.GanZhi(this.GZyear);
            var date = new ganzhi_1.GanZhi(this.GZdate);
            return Math.abs(year.Zhi.Index - date.Zhi.Index) === 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "IsYuePo", {
        get: function get() {
            var month = new ganzhi_1.GanZhi(this.GZmonth);
            var date = new ganzhi_1.GanZhi(this.GZdate);
            return Math.abs(month.Zhi.Index - date.Zhi.Index) === 6;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "IsShangSuo", {
        get: function get() {
            // 甲年癸亥日，乙年己巳日。。。。。。
            // var arr = ["癸亥", "己巳", "乙亥", "辛巳", "丁亥", "癸巳", "己亥", "乙巳", "辛亥", "丁巳"];
            var year = new ganzhi_1.GanZhi(this.GZyear);
            return TYDate.shangshuoDef[year.Gan.Index] == this.GZdate;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(TYDate.prototype, "IsYangGong13", {
        get: function get() {
            // var arr = ["正月十三", "二月十一", "三月初九", "四月初七", "五月初五", "六月初三", "七月初一", "七月廿九", "八月廿七", "九月廿五", "十月廿三", "十一月廿一", "十二月十九"];
            var text = this.NLmonthFullName + this.NLdate;
            for (var _i = 0, _a = TYDate.yanggong13Def; _i < _a.length; _i++) {
                var yang = _a[_i];
                if (yang == text) {
                    return true;
                }
            }
            return false;
        },
        enumerable: true,
        configurable: true
    });
    TYDate.shangshuoDef = ["癸亥", "己巳", "乙亥", "辛巳", "丁亥", "癸巳", "己亥", "乙巳", "辛亥", "丁巳"];
    TYDate.yanggong13Def = ["正月十三", "二月十一", "三月初九", "四月初七", "五月初五", "六月初三", "七月初一", "七月廿九", "八月廿七", "九月廿五", "十月廿三", "十一月廿一", "十二月十九"];
    return TYDate;
}();
exports.TYDate = TYDate;

},{"../libs/lunar":9,"./ganzhi":3}],7:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var WuXing = /** @class */function () {
    function WuXing(name, index) {
        this.name = name;
        this.index = index;
    }
    Object.defineProperty(WuXing.prototype, "Name", {
        get: function get() {
            return this.name;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WuXing.prototype, "Index", {
        get: function get() {
            return this.index;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WuXing.prototype, "Ke", {
        get: function get() {
            return (this.index + 2) % 5;
        },
        enumerable: true,
        configurable: true
    });
    Object.defineProperty(WuXing.prototype, "Sheng", {
        get: function get() {
            return (this.index + 1) % 5;
        },
        enumerable: true,
        configurable: true
    });
    WuXing.prototype.Ref = function (wx) {
        if (this.Ke == wx.Index) {
            return ['官鬼', '官'];
        } else if (this.Sheng == wx.Index) {
            return ['父母', '父'];
        } else if (wx.Ke == this.index) {
            return ['妻财', '财'];
        } else if (wx.Sheng == this.index) {
            return ['子孙', '孙'];
        } else {
            return ['兄弟', '兄'];
        }
    };
    return WuXing;
}();
exports.WuXing = WuXing;
var wuxings = [];
wuxings.push(new WuXing('金', 0));
wuxings.push(new WuXing('水', 1));
wuxings.push(new WuXing('木', 2));
wuxings.push(new WuXing('火', 3));
wuxings.push(new WuXing('土', 4));
function FetchWuXing(para) {
    if (typeof para === 'number') {
        if (para >= 0 && para <= 4) {
            return wuxings[para];
        } else {
            throw new RangeError('WuXing index out of range: ' + para);
        }
    } else {
        var res = wuxings.filter(function (w) {
            return w.Name == para;
        });
        if (res && res.length == 1) {
            return res[0];
        } else {
            throw new RangeError('WuXing name out of range: ' + para);
        }
    }
}
exports.FetchWuXing = FetchWuXing;

},{}],8:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var tylunar_1 = require("./base/tylunar");
var ganzhi_1 = require("./base/ganzhi");
var gua_1 = require("./base/gua");
var bazi_1 = require("./base/bazi");
var common_1 = require("./base/common");
var dictGuas = {};
var dictBaZhis = {};
function getNaYin(arg) {
    var pattern = /\\nayin\{([\S]+)\}/;
    var match = arg.match(pattern);
    if (match) {
        var gz = new ganzhi_1.GanZhi(match[1]);
        return "\\text{" + gz.NaYin + "}";
    } else {
        return arg;
    }
}
function gua64(arg) {
    var pattern = /\\gua64\{(?<name>[\S]+)\}(\{(?<arg>[^\{^\}]*)\})?/;
    var match = arg.match(pattern);
    if (!match) return arg;
    var name = match.groups["name"];
    var otherarg = common_1.LatexHelp.parseID(match.groups["arg"], common_1.LatexHelp.GUA_ID);
    var shortname = otherarg["short"] || exports.globalSetting["shortname"];
    var size = otherarg["size"] || exports.globalSetting["size"];
    size = isNaN(size) ? size : exports.globalSetting["sizeDict"][size.toString()];
    var gua64 = gua_1.Gua64(name);
    if (!gua64) return "\\text{not founded " + name + "}";
    var v = gua64.Shang.Value + gua64.Xia.Value;
    var temp = v.split('');
    var wuxing = gua64.WuXing;
    var txt = [];
    for (var i = 5; i >= 0; i--) {
        var gzBen = gua64.GanZhis[i].Zhi;
        var txtBen = shortname ? gzBen.WuXing.Ref(wuxing)[1] + gzBen.Name : gzBen.WuXing.Ref(wuxing)[0] + gzBen.Name + gzBen.WuXing.Name;
        txt.push(txtBen);
    }
    var alignCenter = "c";
    var alignLeft = "l";
    var output = [];
    output.push("\\" + size + " \\begin{array}{" + alignCenter.repeat(3) + "}");
    output.push(common_1.LatexHelp.buildTexLine([" ", "" + gua64.Name, ' ']));
    for (var i = 5; i >= 0; i--) {
        var shiyin = gua64.Shiyao == i ? '世' : '';
        shiyin = (gua64.Shiyao + 3) % 6 == i ? '应' : shiyin;
        var num = parseInt(temp[5 - i], 10);
        var yao = common_1.LatexHelp.getYaoSymbol("\\yao{" + num % 2 + "}");
        output.push(common_1.LatexHelp.buildTexLine(["" + txt[5 - i], "" + yao, shiyin]));
    }
    output.push("\\end\{array\} \\\\");
    return output.join(" ");
}
function paiGua(arg) {
    var pattern = /\\paigua\{(?<time>[^\{^\}]*)\}\{(?<chi>[^\{^\}]*)\}(\{(?<arg>[^\{^\}]*)\})?/;
    var match = arg.match(pattern);
    if (!match) return arg;
    var guatime = common_1.LatexHelp.parseGuaTime(match.groups["time"]);
    var guachi = common_1.LatexHelp.parseGuaText(match.groups["chi"]);
    var otherarg = common_1.LatexHelp.parseID(match.groups["arg"], common_1.LatexHelp.GUA_ID);
    var guaID = otherarg["id"];
    var shortname = otherarg["short"] || exports.globalSetting["shortname"];
    var size = otherarg["size"] || exports.globalSetting["size"];
    size = isNaN(size) ? size : exports.globalSetting["sizeDict"][size.toString()];
    //console.log(`paigua: id=${guaID}, short=${shortname.toString()}, size=${size}`)
    var gua = null;
    if ((match.groups["time"] || "") == "" && (match.groups["chi"] || "") == "" && match[4]) {
        gua = dictGuas[match[4]];
        guatime = "\u53C2\u8003";
        if (!gua) {
            return "\\text{\u9519\u8BEF\uFF1A\u627E\u4E0D\u5230\u6807\u53F7(" + match[4] + ")}";
        }
    } else {
        gua = new gua_1.Gua(guatime, guachi[0].toString(), guachi[1].toString());
    }
    var alignCenter = "c";
    var alignLeft = "l";
    var output = [];
    if (typeof guatime == 'string') {
        output.push("\\" + size + " \\text{\u8D77\u5366\u65F6\u95F4\uFF1A" + guatime.replace("00:00:00", "") + " (" + guaID + ")}  \\\\");
    } else {
        output.push("\\" + size + " \\text{\u5E72\u652F\u65F6\u4EE4\uFF1A" + guatime[0] + "\u6708 " + guatime[1] + "\u65E5 (" + guaID + ")}  \\\\");
    }
    var shensha = [];
    for (var i = 0; i < 13; i++) {
        //shensha.push(`\\text\{[${gua.ShenShas[i].Name} - ${gua.ShenShas[i].Result.join("")}]\}`)
        shensha.push("[" + gua.ShenShas[i].Name + " - " + gua.ShenShas[i].Result.join("") + "]");
    }
    var shenColumns = shortname ? 4 : 5;
    output.push("\\" + size + " \\begin{array}{" + alignCenter.repeat(shenColumns) + "}");
    for (var idx = 0; idx < shensha.length; idx += shenColumns) {
        output.push(common_1.LatexHelp.buildTexLine(shensha.slice(idx, idx + shenColumns)));
    }
    output.push("\\end\{array\} \\\\");
    output.push("\\" + size + " \\begin{array}{" + alignCenter.repeat(3) + "}");
    output.push('\\\\');
    output.push(common_1.LatexHelp.buildTexLine([gua.Yue.Name + "\u6708", gua.Ri.Name + "\u65E5", "(\u65EC\u7A7A\uFF1A" + gua.ShenShas[13].Result.join("") + ")|gray"]));
    output.push('\\\\');
    output.push("\\end\{array\} \\\\");
    //console.log(line)
    var gualine = [];
    var hasFugua = true;
    for (var idx = 6; idx > 0; idx--) {
        var data = gua.GetLine(idx, shortname);
        var line = common_1.LatexHelp.gualineToTex(data);
        gualine.push(line);
        hasFugua = typeof data[1] == 'string';
    }
    var guachi = [];
    guachi.push(gua.Ben.GuaGong);
    if (hasFugua) guachi.push("");
    guachi.push(gua.Ben.Name + (gua.Ben.Property == "" ? "" : "(" + gua.Ben.Property + ")"));
    if (gua.Ben.Index != gua.Bian.Index) {
        guachi.push("");
        guachi.push("");
        guachi.push(gua.Bian.Name + (gua.Bian.Property == "" ? "" : "(" + gua.Bian.Property + ")"));
    }
    output.push("\\" + size + " \\begin{array}{" + alignLeft.repeat(gualine[0].length) + "}");
    //output.push(guachi.join("&")+ "\\\\")
    output.push(common_1.LatexHelp.buildTexLine(guachi));
    for (var idx = 0; idx < 6; idx++) {
        output.push(gualine[idx].join("&") + "\\\\ \\hdashline");
    }
    output.push("\\end\{array\} \\\\ ");
    if (!dictGuas[guaID] || dictGuas[guaID].equal(gua) == false) {
        dictGuas[guaID] = gua;
    }
    return output.join(" ");
}
function getGuayao(arg) {
    var pattern = /\\guayao\{(?<id>[^\{^\}]*)\}\{(?<pos>[^\{^\}]*)\}/;
    var match = arg.match(pattern);
    if (!match) return arg;
    var position = match.groups["pos"];
    var otherarg = common_1.LatexHelp.parseID(match.groups["id"], common_1.LatexHelp.GUA_ID);
    var guaID = otherarg["id"];
    var shortname = otherarg["short"] || exports.globalSetting["shortname"];
    var size = otherarg["size"] || exports.globalSetting["size"];
    size = isNaN(size) ? size : exports.globalSetting["sizeDict"][size.toString()];
    var gua = dictGuas[guaID];
    if (!gua) {
        return "\\text{\u9519\u8BEF\uFF1A\u627E\u4E0D\u5230\u6307\u5B9A\u7684\u5366\u672C\u6807\u53F7(" + guaID + ")\u3002}";
    }
    var patternYao = /^(?<col>[benbianfu]{2,4})(?<row>[123456]{1})/;
    match = position.match(patternYao);
    var col = match.groups["col"];
    var row = match.groups["row"];
    var gua64;
    var yaovalue = null;
    if (col == "ben" || col == "Ben") {
        gua64 = gua.Ben;
        yaovalue = common_1.LatexHelp.getYaoSymbol("\\yao{" + gua.Benyaos[row - 1] + "}");
    } else if (col == "bian" || col == "Bian") {
        gua64 = gua.Bian;
        yaovalue = common_1.LatexHelp.getYaoSymbol("\\yao{" + gua.Bianyaos[row - 1] + "}");
    } else if (col == "fu" || col == "Fu") {
        gua64 = gua.FuGua;
    }
    var info = ["\\" + size];
    if (yaovalue) {
        info.push(yaovalue);
    }
    var wuxing = gua.Ben.WuXing;
    var gz = gua64.GanZhis[row - 1];
    info.push(gz.Name.Latex());
    //info.push(`(\\color\{gray\}\{\\text\{${gz.NaYin}\}\})`)
    info.push("(" + gz.NaYin.Latex("gray") + ")");
    info.push("\\text{ - " + gz.Zhi.WuXing.Ref(wuxing)[0] + "}");
    return info.join(" ");
}
function timeGZ(arg) {
    var pattern = /\\timegz\{(?<time>[^\{^\}]*)\}(\{(?<item>[01]*)\})?/;
    var match = arg.match(pattern);
    var bazitime = common_1.LatexHelp.parseBaziTime(match.groups["time"]);
    var item = match.groups["item"] || "111";
    var nian = parseInt(item.substring(0, 1));
    var yue = parseInt(item.substring(1, 2));
    var ri = parseInt(item.substring(2));
    var tydate = new tylunar_1.TYDate(bazitime);
    var n = nian === 1 ? tydate.GZyear + "\u5E74" : '';
    var y = yue === 1 ? tydate.GZmonth + "\u6708" : '';
    var r = ri === 1 ? tydate.GZdate + "\u65E5" : '';
    return "\\text{" + n + y + r + "(" + match.groups["time"] + ")}";
}
function paiBazi(arg) {
    var dictGender = {
        "m": "m",
        "f": "f",
        "男": "m",
        "女": "f",
        "乾": "m",
        "坤": "f"
    };
    var pattern = /\\paibazi\{(?<time>[^\{^\}]*)\}\{(?<gender>[男女乾坤mf}]*)\}(\{(?<arg>[^\{^\}]*)\})?(\[(?<more>[^\{^\}^\[^\]]+)\])?/;
    var match = arg.match(pattern);
    var bazitime = common_1.LatexHelp.parseBaziTime(match.groups["time"]);
    var gender = dictGender[match.groups["gender"]];
    var more = match.groups["more"] || "";
    var otherarg = common_1.LatexHelp.parseID(match.groups["arg"], common_1.LatexHelp.BAZI_ID);
    var bzID = otherarg["id"];
    var shortname = otherarg["short"] || exports.globalSetting["shortname"];
    var size = otherarg["size"] || exports.globalSetting["size"];
    size = isNaN(size) ? size : exports.globalSetting["sizeDict"][size.toString()];
    var bz = null;
    if (dictBaZhis[bzID] && (match.groups["time"] || "") == "" && (match.groups["gender"] || "") == "") {
        bz = dictBaZhis[bzID];
        gender = bz.Gender;
        if (!bz) {
            return "\\text{\u9519\u8BEF\uFF1A\u627E\u4E0D\u5230\u516B\u5B57\u6807\u53F7(" + bzID + ")}";
        }
    } else {
        bz = new bazi_1.Bazi(bazitime, gender);
    }
    var alignCenter = "c";
    var alignLeft = "l";
    var output = [];
    var shenIdx = shortname ? 1 : 0;
    output.push("\\" + size + " \\text{" + (gender == 'm' ? "乾造" : "坤造") + "\uFF1A " + bzID + "}  \\\\");
    output.push("\\" + size + " \\begin{array}{" + alignCenter.repeat(4) + "}");
    //output.push(`&${bz.Y.Shen10Gan[shenIdx]} & ${bz.M.Shen10Gan[shenIdx]} & ${bz.D.Shen10Gan[shenIdx]} & ${bz.T.Shen10Gan[shenIdx]} \\\\ \\hdashline`)
    output.push(common_1.LatexHelp.buildTexLine([" "].concat(bz.All.select(function (gz) {
        return gz.Shen10Gan[shenIdx];
    })), "gray") + "\\hdashline");
    output.push("&\\textbf{" + bz.Y.Gan.Name + "} & \\textbf{" + bz.M.Gan.Name + "} & \\textbf{" + bz.D.Gan.Name + "} & \\textbf{" + bz.T.Gan.Name + "} \\\\");
    output.push("&\\textbf{" + bz.Y.Zhi.Name + "} & \\textbf{" + bz.M.Zhi.Name + "} & \\textbf{" + bz.D.Zhi.Name + "} & \\textbf{" + bz.T.Zhi.Name + "} \\\\ \\hdashline");
    //output.push(`&${bz.Y.Shen10Zhi[shenIdx]} & ${bz.M.Shen10Zhi[shenIdx]} & ${bz.D.Shen10Zhi[shenIdx]} & ${bz.T.Shen10Zhi[shenIdx]} \\\\`)
    output.push(common_1.LatexHelp.buildTexLine([" "].concat(bz.All.select(function (gz) {
        return gz.Shen10Zhi[shenIdx];
    })), "gray"));
    var moreInfo = more.split("\/").filter(function (e) {
        return !!e && e != "";
    });
    if (moreInfo.includes("藏干")) {
        //output.push(`\\color\{gray\}\{藏干\} & ${bz.Y.Zhi.CGan.map(g=>g.Name).join("")} & ${bz.M.Zhi.CGan.map(g=>g.Name).join("")} & ${bz.D.Zhi.CGan.map(g=>g.Name).join("")} & ${bz.T.Zhi.CGan.map(g=>g.Name).join("")} \\\\`)
        output.push(common_1.LatexHelp.buildTexLine(["藏干|gray"].concat(bz.All.select(function (z) {
            return z.Zhi.CGan.map(function (g) {
                return g.Name;
            }).join("");
        }))));
    }
    if (moreInfo.includes("长生")) {
        //output.push(`\\color\{gray\}\{长生\} & ${bz.Y.ChangSheng} & ${bz.M.ChangSheng} & ${bz.D.ChangSheng} & ${bz.T.ChangSheng} \\\\`)
        output.push(common_1.LatexHelp.buildTexLine(["长生|gray"].concat(bz.All.select(function (z) {
            return z.ChangSheng;
        }))));
    }
    if (moreInfo.includes("纳音")) {
        //output.push(`\\color\{gray\}\{纳音\} & ${bz.Y.NaYin} & ${bz.M.NaYin} & ${bz.D.NaYin} & ${bz.T.NaYin} \\\\`)
        output.push(common_1.LatexHelp.buildTexLine(["纳音|gray"].concat(bz.All.select(function (z) {
            return z.NaYin;
        }))));
    }
    output.push("\\end\{array\} \\\\");
    if (!dictBaZhis[bzID] || dictBaZhis[bzID].equal(bz) == false) {
        dictBaZhis[bzID] = bz;
    }
    return output.join(" ");
}
function infoBazi(arg) {
    var pattern = /\\bazi\{(?<id>[^\{^\}]*)\}\{(?<arg>[^\{^\}]*)\}(\[(?<more>[^\{^\}^\[^\]]+)\])?/;
    var match = arg.match(pattern);
    var arg = match.groups["arg"];
    var more = match.groups["more"];
    var otherarg = common_1.LatexHelp.parseID(match.groups["id"], common_1.LatexHelp.BAZI_ID);
    var baziID = otherarg["id"];
    var shortname = otherarg["short"] || exports.globalSetting["shortname"];
    var size = otherarg["size"] || exports.globalSetting["size"];
    size = isNaN(size) ? size : exports.globalSetting["sizeDict"][size.toString()];
    var bz = dictBaZhis[baziID];
    if (!bz) {
        return "\\text{\u9519\u8BEF\uFF1A\u627E\u4E0D\u5230\u516B\u5B57\u6807\u53F7(" + baziID + ")}";
    }
    if (arg == "神煞") {
        return mathBaziShenSha(bz, size, parseInt(more));
    } else if (arg == "大运") {
        return mathBaziDayun(bz, size, more);
    } else if (arg == "流年" || arg == "小运") {
        return mathBaziLiunian(bz, arg, size, more);
    }
}
function mathBaziShenSha(bz, size, col) {
    var alignCenter = "c";
    var alignLeft = "l";
    var output = [];
    var ss = [];
    for (var i = 0; i <= 18; i++) {
        //if(bz.ShenSha[i].Name == "旬空") continue
        ss.push("[" + bz.ShenSha[i].Name + " - " + bz.ShenSha[i].Result.join("") + "]");
    }
    output.push("\\" + size + " \\text{\u547D\u5BAB\u3010" + bz.MingGong.Name + "} \\quad \\text{\u80CE\u5143\u3010" + bz.TaiYuan.Name + "\u3011} \\\\");
    output.push("\\" + size + " \\begin{array}{" + alignLeft.repeat(col) + "}");
    for (var i = 0; i <= 18; i += col) {
        //output.push(ss.slice(i, i + col).join(" & ") + " \\\\");
        output.push(common_1.LatexHelp.buildTexLine(ss.slice(i, i + col)));
    }
    output.push("\\end\{array\} ");
    return output.join(" ");
}
function mathBaziDayun(bz, size, cols) {
    var tmp = cols.split("");
    var infos = tmp.where(function (t) {
        return isNaN(t) && t != "-";
    }).join("");
    var nums = cols.replace(infos, "");
    var range = common_1.LatexHelp.range(nums);
    var output = [];
    var yuns = new Array();
    //expect(bz.DaYun[0].GZ.Name).to.equal("己未");
    range.forEach(function (i) {
        yuns.push(bz.DaYun[i - 1]);
    });
    var moreInfo = infos.split("\/").removeEmpty();
    return latexBaziyun(yuns, "大运", bz, size, moreInfo);
}
function mathBaziLiunian(bz, name, size, cols) {
    var tmp = cols.split("");
    var infos = tmp.where(function (t) {
        return isNaN(t) && t != "-";
    }).join("");
    var nums = cols.replace(infos, "");
    var range = nums.split("-").removeEmpty();
    var output = [];
    var yuns = bz.CalcLiuNian(parseInt(range[0]), parseInt(range[range.length - 1]));
    var moreInfo = infos.split("\/").removeEmpty();
    return latexBaziyun(yuns, name, bz, size, moreInfo);
}
function latexBaziyun(yuns, name, bz, size, cols) {
    var header = ["始于", name].concat(cols);
    var output = [];
    var alignLeft = "c";
    var birthday = bz.Birthday.toChinaStr();
    birthday = birthday.replace(bz.Birthday.getFullYear().toString(), "##");
    output.push("\\" + size + " \\begin{array}{" + alignLeft.repeat(header.length) + "}");
    //output.push(header.join(" & ")+ "\\\\")
    output.push(common_1.LatexHelp.buildTexLine(header));
    yuns.forEach(function (y) {
        var gz = name == "小运" ? y.GZ2 : y.GZ;
        var line = [];
        line.push(name == "小运" ? birthday.replace("##", y.Start.getFullYear().toString()) : y.Start.toChinaStr());
        line.push("\\" + common_1.LatexHelp.COLOR + "{gray}{" + gz.Shen10Gan[0].Latex() + "}/" + gz.Name.Latex() + "/\\" + common_1.LatexHelp.COLOR + "{gray}{" + gz.Shen10Zhi[0].Latex() + "}");
        for (var i = 2; i < header.length; i++) {
            if (header[i] == "藏干") {
                line.push(gz.Zhi.CGan.map(function (g) {
                    return g.Name;
                }).join(""));
            }
            if (header[i] == "长生") {
                line.push(gz.ChangSheng);
            }
            if (header[i] == "纳音") {
                line.push(gz.NaYin);
            }
            if (header[i] == "神煞") {
                line.push(bz.CalcShenSha(gz));
            }
        }
        //output.push(line.join(" & ") + "\\\\")
        output.push(common_1.LatexHelp.buildTexLine(line));
    });
    output.push("\\end\{array\} ");
    return output.join(" ");
}
exports.globalSetting = {
    "size": "normalsize",
    "shuitu": true,
    "huahe": true,
    "shortname": false,
    "sizeDef": ["tiny", "tiny", "scriptsize", "footnotesize", "small", "normalsize", "large", "LARGE", "huge", "Huge"],
    "sizeDict": {
        "1": "tiny",
        "2": "scriptsize",
        "3": "footnotesize",
        "4": "small",
        "5": "normalsize",
        "6": "large",
        "7": "LARGE",
        "8": "huge",
        "9": "Huge"
    }
};
exports.DictYiXue = {
    "\\nayin": getNaYin,
    '\\yao': common_1.LatexHelp.getYaoSymbol,
    '\\paigua': paiGua,
    '\\guayao': getGuayao,
    '\\gua64': gua64,
    '\\paibazi': paiBazi,
    '\\bazi': infoBazi,
    '\\timegz': timeGZ
};

},{"./base/bazi":1,"./base/common":2,"./base/ganzhi":3,"./base/gua":4,"./base/tylunar":6}],9:[function(require,module,exports){
//纪年数据结构：数据用逗号分开，每7个描述一个年号，格式为:起始公元,使用年数,已用年数,朝代,朝号,皇帝,年号   
var JNs ='';   
JNs+='420,3,0,南朝/宋,武帝,刘裕,永初,423,2,0,南朝/宋,少帝,刘义符,景平,424,30,0,南朝/宋,文帝,刘義隆,元嘉,454,3,0,南朝/宋,孝武,帝刘骏,孝建,457,8,0,南朝/宋,孝武,帝刘骏,大明,465,1,0,南朝/宋,废帝,刘子业,永光,465,1,0,南朝/宋,废帝,刘子业,景和,465,7,0,南朝/宋,明帝,刘彧,泰始,472,1,0,南朝/宋,明帝,刘彧,泰豫,473,5,0,南朝/宋,废帝,刘昱,元徽,477,3,0,南朝/宋,顺帝,刘准,升明,479,4,0,南朝/齐,高帝,萧道成,建元,483,11,0,南朝/齐,武帝,萧赜,永明,494,1,0,南朝/齐,欎林王,萧昭业,隆昌,494,1,0,南朝/齐,海陵王,萧昭文,延兴,';   
JNs+='494,5,0,南朝/齐,明帝,萧鸾,建武,498,1,0,南朝/齐,明帝,萧鸾,永泰,499,3,0,南朝/齐,东昏侯,萧宝,中兴,501,2,0,南朝/齐,和帝,萧宝融,中兴,502,18,0,南朝/梁,武帝,萧衍,天监,520,8,0,南朝/梁,武帝,萧衍,普通,527,3,0,南朝/梁,武帝,萧衍,大通,529,6,0,南朝/梁,武帝,萧衍,中大通,535,12,0,南朝/梁,武帝,萧衍,大同,546,2,0,南朝/梁,武帝,萧衍,中大同,547,3,0,南朝/梁,武帝,萧衍,太清,550,2,0,南朝/梁,简文帝,萧纲,大宝,551,2,0,南朝/梁,豫章王,萧栋,天正,552,4,0,南朝/梁,元帝,萧绎,承圣,555,1,0,南朝/梁,贞阳侯,萧渊明,天成,';   
JNs+='555,2,0,南朝/梁,敬帝,萧方智,绍泰,556,2,0,南朝/梁,敬帝,萧方智,太平,557,3,0,南朝/陈,武帝,陈霸先,太平,560,7,0,南朝/陈,文帝,陈蒨,天嘉,566,1,0,南朝/陈,文帝,陈蒨,天康,567,2,0,南朝/陈,废帝,陈伯宗,光大,569,14,0,南朝/陈,宣帝,陈顼,太建,583,4,0,南朝/陈,后主,陈叔宝,至德,587,3,0,南朝/陈,后主,陈叔宝,祯明,555,8,0,南朝/后梁,宣帝,萧詧,大定,562,24,0,南朝/后梁,明帝,萧岿,天保,586,2,0,南朝/后梁,莒公,萧琮,广运,386,11,0,北朝/北魏,道武帝,拓跋圭,登国,396,3,0,北朝/北魏,道武帝,拓跋圭,皇始,398,7,0,北朝/北魏,道武帝,拓跋圭,天兴,';   
JNs+='404,6,0,北朝/北魏,道武帝,拓跋圭,天赐,409,5,0,北朝/北魏,明元帝,拓跋嗣,永兴,414,3,0,北朝/北魏,明元帝,拓跋嗣,神瑞,416,8,0,北朝/北魏,明元帝,拓跋嗣,泰常,424,5,0,北朝/北魏,太武帝,拓跋焘,始光,428,4,0,北朝/北魏,太武帝,拓跋焘,神麚,432,3,0,北朝/北魏,太武帝,拓跋焘,延和,435,6,0,北朝/北魏,太武帝,拓跋焘,太延,440,12,0,北朝/北魏,太武帝,拓跋焘,太平真君,451,2,0,北朝/北魏,太武帝,拓跋焘,正平,452,1,0,北朝/北魏,南安王,拓跋余,承平,452,3,0,北朝/北魏,文成帝,拓跋浚,兴安,454,2,0,北朝/北魏,文成帝,拓跋浚,兴光,455,5,0,北朝/北魏,文成帝,拓跋浚,太安,460,6,0,北朝/北魏,文成帝,拓跋浚,和平,';   
JNs+='466,2,0,北朝/北魏,献文帝,拓跋弘,天安,467,5,0,北朝/北魏,献文帝,拓跋弘,皇兴,471,6,0,北朝/北魏,教文帝,拓跋宏,延兴,476,1,0,北朝/北魏,孝文帝,拓跋宏,承明,477,23,0,北朝/北魏,孝文帝,拓跋宏,太和,500,4,0,北朝/北魏,宣武帝,元恪,景明,504,5,0,北朝/北魏,宣武帝,元恪,正始,508,5,0,北朝/北魏,宣武帝,元恪,永平,512,4,0,北朝/北魏,宣武帝,元恪,延昌,516,3,0,北朝/北魏,孝明帝,元诩,熙平,518,3,0,北朝/北魏,孝明帝,元诩,神龟,520,6,0,北朝/北魏,孝明帝,元诩,正光,525,3,0,北朝/北魏,孝明帝,元诩,孝昌,528,1,0,北朝/北魏,孝明帝,元诩,武泰,528,1,0,北朝/北魏,孝庄帝,元子攸,建义,';   
JNs+='528,3,0,北朝/北魏,孝庄帝,元子攸,永安,530,2,0,北朝/北魏,东海王,元晔,建明,531,2,0,北朝/北魏,节闵帝,元恭,普泰,531,2,0,北朝/北魏,安定王,元朗,中兴,532,1,0,北朝/北魏,孝武帝,元修,太昌,532,1,0,北朝/北魏,孝武帝,元修,永兴,532,3,0,北朝/北魏,孝武帝,元修,永熙,534,4,0,北朝/东魏,孝静帝,元善见,天平,538,2,0,北朝/东魏,孝静帝,元善见,元象,539,4,0,北朝/东魏,孝静帝,元善见,兴和,543,8,0,北朝/东魏,孝静帝,元善见,武定,535,17,0,北朝/西魏,文帝,元宝炬,大统,552,3,0,北朝/西魏,废帝,元钦,大统,554,3,0,北朝/西魏,恭帝,元廓,大统,550,10,0,北朝/北齐,文宣帝,高洋,天保,';   
JNs+='560,1,0,北朝/北齐,废帝,高殷,乾明,560,2,0,北朝/北齐,孝昭帝,高演,皇建,561,2,0,北朝/北齐,武成帝,高湛,太宁,562,4,0,北朝/北齐,武成帝,高湛,河清,565,5,0,北朝/北齐,温公,高纬,天统,570,7,0,北朝/北齐,温公,高纬,武平,576,2,0,北朝/北齐,温公,高纬,隆化,576,1,0,北朝/北齐,安德王,高延宗,德昌,577,1,0,北朝/北齐,幼主,高恒,承光,557,1,0,北朝/北周,闵帝,宇文觉,空,557,2,0,北朝/北周,明帝,宇文毓,空,559,2,0,北朝/北周,明帝,宇文毓,武成,561,5,0,北朝/北周,武帝,宇文邕,保定,566,7,0,北朝/北周,武帝,宇文邕,天和,572,7,0,北朝/北周,武帝,宇文邕,建德,';   
JNs+='578,1,0,北朝/北周,武帝,宇文邕,宣政,579,1,0,北朝/北周,宣帝,宇文贇,大成,579,2,0,北朝/北周,静帝,宇文衍,大象,581,1,0,北朝/北周,静帝,宇文衍,大定,581,20,0,隋,文帝,杨坚,开皇,601,4,0,隋,文帝,杨坚,仁寿,605,13,0,隋,炀帝,杨广,大业,617,2,0,隋,恭帝,杨侑,义宁,618,9,0,唐,高祖,李渊,武德,627,23,0,唐,太宗,李世民,贞观,650,6,0,唐,高宗,李治,永徽,656,6,0,唐,高宗,李治,显庆,661,3,0,唐,高宗,李治,龙朔,664,2,0,唐,高宗,李治,麟德,666,3,0,唐,高宗,李治,乾封,';   
JNs+='668,3,0,唐,高宗,李治,总章,670,5,0,唐,高宗,李治,咸亨,674,3,0,唐,高宗,李治,上元,676,4,0,唐,高宗,李治,仪凤,679,2,0,唐,高宗,李治,调露,680,2,0,唐,高宗,李治,永隆,681,2,0,唐,高宗,李治,开耀,682,2,0,唐,高宗,李治,永淳,683,1,0,唐,高宗,李治,弘道,684,1,0,唐,中宗,李显,嗣圣,684,1,0,唐,睿宗,李旦,文明,684,1,0,武周,则天后,武曌,光宅,685,4,0,武周,则天后,武曌,垂拱,689,1,0,武周,则天后,武曌,永昌,689,2,0,武周,则天后,武曌,载初,';   
JNs+='690,3,0,武周,则天后,武曌,天授,692,1,0,武周,则天后,武曌,如意,692,3,0,武周,则天后,武曌,长寿,694,1,0,武周,则天后,武曌,延载,695,1,0,武周,则天后,武曌,证圣,695,2,0,武周,则天后,武曌,天册万岁,696,1,0,武周,则天后,武曌,万岁登封,696,2,0,武周,则天后,武曌,万岁通天,697,1,0,武周,则天后,武曌,神功,698,3,0,武周,则天后,武曌,圣历,700,1,0,武周,则天后,武曌,久视,701,1,0,武周,则天后,武曌,大足,701,4,0,武周,则天后,武曌,长安,705,1,0,武周,则天后,李显,神龙,705,2,0,唐,中宗,李显,神龙,';   
JNs+='707,4,0,唐,中宗,李显,景龙,710,1,0,唐,温王,李重茂,唐隆,710,2,0,唐,睿宗,李旦,景云,712,1,0,唐,睿宗,李旦,太极,712,1,0,唐,睿宗,李旦,延和,712,2,0,唐,玄宗,李隆基,先天,713,29,0,唐,玄宗,李隆基,开元,742,15,0,唐,玄宗,李隆基,天宝,756,3,0,唐,肃宗,李亨,至德,758,3,0,唐,肃宗,李亨,乾元,760,3,0,唐,肃宗,李亨,上元,762,2,0,唐,肃宗,李亨,宝应,763,2,0,唐,代宗,李豫,广德,765,2,0,唐,肃宗,李亨,永泰,766,14,0,唐,肃宗,李亨,大历,';   
JNs+='780,4,0,唐,德宗,李适,建中,784,1,0,唐,德宗,李适,兴元,785,21,0,唐,德宗,李适,贞元,805,1,0,唐,顺宗,李诵,永贞,806,15,0,唐,宪宗,李纯,元和,821,4,0,唐,穆宗,李恒,长庆,825,3,0,唐,敬宗,李湛,宝历,827,9,0,唐,文宗,李昂,大和,836,5,0,唐,文宗,李昂,开成,841,6,0,唐,武宗,李炎,会昌,847,14,0,唐,宣宗,李忱,大中,860,15,0,唐,宣宗,李忱,咸通,874,6,0,唐,僖宗,李儇,乾符,880,2,0,唐,僖宗,李儇,广明,881,5,0,唐,僖宗,李儇,中和,';   
JNs+='885,4,0,唐,僖宗,李儇,光启,888,1,0,唐,僖宗,李儇,文德,889,1,0,唐,昭宗,李晔,龙纪,890,2,0,唐,昭宗,李晔,大顺,892,2,0,唐,昭宗,李晔,景福,894,5,0,唐,昭宗,李晔,乾宁,898,4,0,唐,昭宗,李晔,光化,901,4,0,唐,昭宗,李晔,天复,904,1,0,唐,昭宗,李晔,天佑,905,3,1,唐,昭宣帝,李祝,天佑,907,5,0,五代/梁,太祖,朱温,开平,911,2,0,五代/梁,太祖,朱温,乾化,913,1,0,五代/梁,庶人,朱友圭,凤历,913,3,2,五代/梁,末帝,朱友贞,乾化,915,7,0,五代/梁,末帝,朱友贞,贞明,';   
JNs+='921,3,0,五代/梁,末帝,朱友贞,龙德,923,4,0,五代/唐,庄宗,李存勗,同光,926,5,0,五代/唐,明宗,李嗣源,天成,930,4,0,五代/唐,明宗,李嗣源,长兴,934,1,0,五代/唐,闵帝,李从厚,应顺,934,3,0,五代/唐,潞王,李从珂,清泰,936,6,0,五代/晋,高祖,石敬瑭,天福,942,2,6,五代/晋,出帝,石重贵,天福,944,3,0,五代/晋,出帝,石重贵,开运,947,12,0,五代/汉,高祖,刘知远,天福,948,1,0,五代/汉,隐帝,刘承祐,乾祐,948,3,0,五代/汉,隐帝,刘承祐,乾祐,951,3,0,五代/周,太祖,郭威,广顺,954,1,0,五代/周,太祖,郭威,显德,954,6,0,五代/周,世宗,柴荣,显德,';   
JNs+='959,2,5,五代/周,恭帝,郭宗训,显德,960,4,0,北宋,太祖,赵匡胤,建隆,963,6,0,北宋,太祖,赵匡胤,乾德,968,9,0,北宋,太祖,赵匡胤,开宝,976,9,0,北宋,太宗,赵炅,太平兴国,984,4,0,北宋,太宗,赵炅,雍熙,988,2,0,北宋,太宗,赵炅,端拱,990,5,0,北宋,太宗,赵炅,淳化,995,3,0,北宋,太宗,赵炅,至道,998,6,0,北宋,真宗,赵恒,咸平,1004,4,0,北宋,真宗,赵恒,景德,1008,9,0,北宋,真宗,赵恒,大中祥符,1017,5,0,北宋,真宗,赵恒,天禧,1022,1,0,北宋,真宗,赵恒,乾兴,1023,10,0,北宋,仁宗,赵祯,天圣,';   
JNs+='1032,2,0,北宋,仁宗,赵祯,明道,1034,5,0,北宋,仁宗,赵祯,景祐,1038,3,0,北宋,仁宗,赵祯,宝元,1040,2,0,北宋,仁宗,赵祯,康定,1041,8,0,北宋,仁宗,赵祯,庆历,1049,6,0,北宋,仁宗,赵祯,皇祐,1054,3,0,北宋,仁宗,赵祯,至和,1056,8,0,北宋,仁宗,赵祯,嘉祐,1064,4,0,北宋,英宗,赵曙,治平,1068,10,0,北宋,神宗,赵顼,熙宁,1078,8,0,北宋,神宗,赵顼,元丰,1086,9,0,北宋,哲宗,赵煦,元祐,1094,5,0,北宋,哲宗,赵煦,绍圣,1098,3,0,北宋,哲宗,赵煦,元符,1101,1,0,北宋,徽宗,赵佶,建中靖国,';   
JNs+='1102,5,0,北宋,徽宗,赵佶,崇宁,1107,4,0,北宋,徽宗,赵佶,大观,1111,8,0,北宋,徽宗,赵佶,政和,1118,2,0,北宋,徽宗,赵佶,重和,1119,7,0,北宋,徽宗,赵佶,宣和,1126,2,0,北宋,钦宗,赵桓,靖康,1127,4,0,南宋,高宗,赵构,建炎,1131,32,0,南宋,高宗,赵构,绍兴,1163,2,0,南宋,孝宗,赵慎,隆兴,1165,9,0,南宋,孝宗,赵慎,乾道,1174,16,0,南宋,孝宗,赵慎,淳熙,1190,5,0,南宋,光宗,赵暴,绍熙,1195,6,0,南宋,宁宗,赵扩,庆元,1201,4,0,南宋,宁宗,赵扩,嘉泰,1205,3,0,南宋,宁宗,赵扩,开禧,';   
JNs+='1208,17,0,南宋,宁宗,赵扩,嘉定,1225,3,0,南宋,理宗,赵昀,宝庆,1228,6,0,南宋,理宗,赵昀,绍定,1234,3,0,南宋,理宗,赵昀,端平,1237,4,0,南宋,理宗,赵昀,嘉熙,1241,12,0,南宋,理宗,赵昀,淳祐,1253,6,0,南宋,理宗,赵昀,寶祐,1259,1,0,南宋,理宗,赵昀,开庆,1260,5,0,南宋,理宗,赵昀,景定,1265,10,0,南宋,度宗,赵禥,咸淳,1275,2,0,南宋,恭宗,赵(上“日”下“丝”),德祐 ,1276,3,0,南宋,端宗,赵(上“日”下“正”),景炎,1278,2,0,南宋,帝昺,赵昺,祥兴,1271,24,7,元,世祖,孛儿只斤·忽必烈,至元,1295,3,0,元,成宗,孛儿只斤·铁穆耳,元贞,';   
JNs+='1297,11,0,元,成宗,孛儿只斤·铁穆耳,大德,1308,4,0,元,武宗,孛儿只斤·海山,至大,1312,2,0,元,仁宗,孛儿只斤·爱育黎拔力八达,皇庆,1314,7,0,元,仁宗,孛儿只斤·愛育黎拔力八達,延祐,1321,3,0,元,英宗,孛儿只斤·宗硕德八剌,至治,1324,5,0,元,泰定帝,孛儿只斤·也孙铁木耳,泰定,1328,1,0,元,泰定帝,孛儿只斤·也孙铁木耳,至和,1328,1,0,元,幼主,孛儿只斤·阿速吉八,天顺,1328,3,0,元,文宗,孛儿只斤·图贴睦尔,天历,1330,3,0,元,文宗,孛儿只斤·图贴睦尔,至顺,1333,3,0,元,惠宗,孛儿只斤·妥镤贴睦尔,元统,1335,6,0,元,惠宗,孛儿只斤·妥镤贴睦尔,至元,1341,28,0,元,惠宗,孛儿只斤·妥镤贴睦尔,至正,1368,31,0,明,太祖,朱元璋,洪武,1399,4,0,明,惠帝,朱允溫,建文,';   
JNs+='1403,22,0,明,成祖,朱棣,永乐,1425,1,0,明,仁宗,朱高炽,洪熙,1426,10,0,明,宣宗,朱瞻基,宣德,1436,14,0,明,英宗,朱祁镇,正统,1450,7,0,明,代宗,朱祁钰,景泰,1457,8,0,明,英宗,朱祁镇,天顺,1465,23,0,明,宪宗,朱见深,成化,1488,18,0,明,孝宗,朱祐樘,弘治,1506,16,0,明,武宗,朱厚照,正德,1522,45,0,明,世宗,朱厚熜,嘉靖,1567,6,0,明,穆宗,朱载贺,隆庆,1573,48,0,明,神宗,朱翊钧,万历,1620,1,0,明,光宗,朱常洛,泰昌,1621,7,0,明,熹宗,朱同校,天启,1628,17,0,明,毅宗,朱由检,崇祯,';   
JNs+='1644,18,0,清,世祖,爱新觉罗福临,顺治,1662,61,0,清,圣祖,爱新觉罗玄烨,康熙,1723,13,0,清,世宗,爱新觉罗胤禛,雍正,1736,60,0,清,高宗,爱新觉罗弘历,乾隆,1796,25,0,清,仁宗,爱新觉罗颙琰,嘉庆,1821,30,0,清,宣宗,爱新觉罗旻宁,道光,1851,11,0,清,文宗,爱新觉罗奕詝,咸丰,1862,13,0,清,穆宗,爱新觉罗载淳,同治,1875,34,0,清,德宗,爱新觉罗载湉,光绪,1909,3,0,清,无朝,爱新觉罗溥仪,宣统,1912,37,0,现代,中国,国民党,民国,1949,9999,0,现代,中国,共产党,共和国';   
JNs = JNs.split(',');   
for(i=0;i<JNs.length;i+=7) { JNs[i]-=0; JNs[i+1]-=0; JNs[i+2]-=0; }   
function getNH(y){ //取年号   
    var i,j,k,c;   
    this.nh = this.nh2 = '';   
    for(i=0;i<JNs.length;i+=7){   
        j = JNs[i];   
        if(y<j||y>=j+JNs[i+1]) continue;   
        c = '['+JNs[i+3]+']';//朝代   
        k = JNs[i+6]+(y-j+1+JNs[i+2])+'年'; //年号及年次   
        this.nh = c+k;   
        this.nh2 += c+JNs[i+4]+' '+JNs[i+5]+' '+k + '; '; //i为年号元年,i+3朝代,i+4朝号,i+5皇帝,i+6年号   
    }   
}

var KWB1 = { //朔月堪误表,1500-1940   
    c76852:-1,c76933: 1,c77005:-1,c77042: 1,c77103:-1,   
    c77162:-1,c77174:-1,c77260:-1,c77275:-1,c77277: 1,   
    c77383:-1,c77403: 1,c77410:-1,c77720:-1,c77732:-1,   
    c77846: 1,c77855:-1,c77926:-1,c77935: 1,c77968:-1,   
    c78059: 1,c78072:-1,c78221: 1,c78273:-1,c78349:-1,   
    c78413:-1,c78417: 1,c78445: 1,c78499:-1,c78604: 1,   
    c78681:-1,c78700: 1,c78715: 1,c78735:-1,c78739: 1,   
    c78839:-1,c78984: 1,c79123:-1,c79149:-1,c79239:-1,   
    c79367: 1,c79408:-1,c79561:-1,c80040:-1,c80095:-1,   
    c80275:-1,c80291:-1,c80395:-1,c80415:-1,c80500:-1,   
    c80601:-1,c80810: 1,c80931:-1,c81064:-1,c81324:-1,   
    c81544: 1,c81733:-1,c81965:-1,c81980:-1,c82039:-1   
};   
var KWB2 = new Array( //闰堪误表,1500-1940   
  76854,76922,76955,77057,77090,77156,77191,77224,77257,77292,77324,77392,77425,77459,77493,77526,77559,77628,77661, //1500-1600年   
  77727,77762,77795,77828,77863,77895,77929,77963,77996,78030, //1500-1600年   
  78098,78130,78198,78231,78265,78333,78366,78399,78466,78500,78533,78567,78634,78668,78701,78802,78833, //1600-1700年   
  79645 //1700-1800年   
);   
   
function getLunOrd(jd){ return int2((jd+J2000+34)/29.5306); }; //传入J2000起算的jd,返回积月   
function kanwuHS(jd){   
    //return jd; //如果无须朔日勘误，直接返回jd   
    var h='c'+getLunOrd(jd);   
    if(KWB1[h]) return jd+KWB1[h];   
    return jd;   
};   
function kanwuNU(HS,n){ //查找堪误合朔表中是否含有闰月,合朔表应是史历订正过的表   
    //return -1; //如果无须闰月勘误，直接返回-1   
    var i,c;   
    var k1 = getLunOrd(HS[0]);   
    var k2 = getLunOrd(HS[n-1]);   
    for(i=0;i<KWB2.length;i++) { c=KWB2[i]; if(c>=k1 && c<=k2) break; }   
    if(KWB2.length==i) return -1;   
    for(i=0;i<n;i++) if(getLunOrd(HS[i]) == c) break;   
    if(i==n) return -1;   
    return i;   
};  

/****************************************  
以下是天文计算部分,包含有：  
常数 rad   : 每弧度的角秒数  
常数 J2000 : 2000年1月1日 12:00:00 的儒略日数  
常数 pi2   : 圆周率的2倍,即2*3.14159...  
trim()     : 去除字串首尾的空格  
rad2str()  : 弧度转为"度分秒"或"时分秒"  
rad2str2() : 弧度转为"度分"  
rad2mrad() : 将超出0到360度的角度转为0到360度的解度  
mod2(a,b)  : 临界余数(a与最近的整倍数b相差的距离)  
int2(a)    : 取小等于a的最大整数  
物件 JD    : 公历——儒略日——时间物件  
物件 ZB    : 坐标变换物件，包含坐标旋转、章动、日月光行差(时)、视差、大气折射、恒星时的计算  
物件 XL    : 日月黄道平分点坐标、视坐标、速度、已知经度反求时间等方面的计算  
物件 SZJ   : 用来计算日月的升起、中天、降落  
注意，上述函数或物件是纯天文学的，根据实际需要组合使用可以得到所需要的各种日月坐标，计算精度及计算速度也是可以根据需要有效控制的。  
*****************************************/   
   
rad  = 180*3600/Math.PI,   
J2000= 2451545;   
pi2  = Math.PI*2;   
function trim(s){ return s.replace(/(^\s*)|(\s*$)/g, "");  }   
function rad2str(d,tim){ //将弧度转为字串   
    //tim=0输出格式示例: -23°59' 48.23"   
    //tim=1输出格式示例:  18h 29m 44.52s   
    var s=" ";   
    var w1="°",w2="'",w3='"';   
    if(d<0)  d=-d,s='-';   
    if(tim){ d*=12/Math.PI; w1="h ",w2="m ",w3="s"; }   
    else     d*=180/Math.PI;   
    var a=Math.floor(d); d=(d-a)*60;   
    var b=Math.floor(d); d=(d-b)*60;   
    var c=Math.floor(d); d=(d-c)*100;   
    d=Math.floor(d+0.5);   
    if(d>=100) d-=100, c++;   
    if(c>=60)  c-=60,  b++;   
    if(b>=60)  b-=60,  a++;   
    a="   "+a, b="0"+b, c="0"+c, d="0"+d;   
    s+=a.substr(a.length-3,3)+w1;   
    s+=b.substr(b.length-2,2)+w2;   
    s+=c.substr(c.length-2,2)+".";   
    s+=d.substr(d.length-2,2)+w3;   
    return s;   
}   
function rad2str2(d){ //将弧度转为字串,精确到分   
    //输出格式示例: -23°59'   
    var s="+";   
    var w1="°",w2="'",w3='"';   
    if(d<0)  d=-d,s='-';   
    d*=180/Math.PI;   
    var a=Math.floor(d);   
    var b=Math.floor((d-a)*60+0.5);   
    if(b>=60)  b-=60,  a++;   
    a="   "+a, b="0"+b;   
    s+=a.substr(a.length-3,3)+w1;   
    s+=b.substr(b.length-2,2)+w2;   
    return s;   
}   
   
function rad2mrad(v){   //对超过0-2PI的角度转为0-2PI   
    v=v % (2*Math.PI);   
    if(v<0) return v+2*Math.PI;   
    return v;   
}   
function mod2(a,b){ //临界余数(a与最近的整倍数b相差的距离)   
    var c=a/b;   
    c -= Math.floor(c);   
    if(c>0.5) c-=1;   
    return c*b;   
}   
function int2(v){ return Math.floor(v); }  //取整数部分   
   
var JD={ //日期元件   
    Y:2000, M:1, D:1, h:12, m:0, s:0,   
    dts:new Array( // TD - UT1 计算表   
     -4000,108371.7,-13036.80,392.000, 0.0000, -500, 17201.0,  -627.82, 16.170,-0.3413,   
      -150, 12200.6,  -346.41,  5.403,-0.1593,  150,  9113.8,  -328.13, -1.647, 0.0377,   
       500,  5707.5,  -391.41,  0.915, 0.3145,  900,  2203.4,  -283.45, 13.034,-0.1778,   
      1300,   490.1,   -57.35,  2.085,-0.0072, 1600,   120.0,    -9.81, -1.532, 0.1403,   
      1700,    10.2,    -0.91,  0.510,-0.0370, 1800,    13.4,    -0.72,  0.202,-0.0193,   
      1830,     7.8,    -1.81,  0.416,-0.0247, 1860,     8.3,    -0.13, -0.406, 0.0292,   
      1880,    -5.4,     0.32, -0.183, 0.0173, 1900,    -2.3,     2.06,  0.169,-0.0135,   
      1920,    21.2,     1.69, -0.304, 0.0167, 1940,    24.2,     1.22, -0.064, 0.0031,   
      1960,    33.2,     0.51,  0.231,-0.0109, 1980,    51.0,     1.29, -0.026, 0.0032,   
      2000,    63.87,    0.1,   0,     0,      2005),   
    deltatExt:function(y,jsd){ var dy=(y-1820)/100; return -20+jsd*dy*dy; }, //二次曲线外推   
    deltatT:function(y){ //计算世界时与原子时之差,传入年   
        if(y>=2005){   
            //sd是2005年之后几年（一值到y1年）的速度估计。   
            //sjd是y1年之后的加速度估计。瑞士星历表jsd=31,NASA网站jsd=32,skmap的jsd=29   
            var y1=2014, sd=0.4, jsd=31;   
            if(y<=y1) return 64.7 + (y-2005) *sd; //直线外推   
            var v = this.deltatExt(y,jsd);        //二次曲线外推   
            var dv= this.deltatExt(y1,jsd) - ( 64.7+(y1-2005)*sd ); //y1年的二次外推与直线外推的差   
            if(y<y1+100  ) v -= dv*(y1+100-y)/100;   
            return v;    
        }   
        var i,d=this.dts;   
        for(i=0;i<d.length;i+=5) if(y<d[i+5]) break;   
        var t1=(y-d[i])/(d[i+5]-d[i])*10, t2=t1*t1, t3=t2*t1;   
        return d[i+1] +d[i+2]*t1 +d[i+3]*t2 +d[i+4]*t3;   
    },   
    deltatT2:function(t){ //传入儒略日(J2000起算),计算TD-UT(单位:日)   
        return this.deltatT(t/365.2425+2000)/86400.0;   
    },   
    toJD:function(){ //公历转儒略日   
        var y=this.Y, m=this.M, n=0; //取出年月   
        if(m<=2) m+=12,y--;   
        if(this.Y*372+this.M*31+this.D>=588829)//判断是否为格里高利历日1582*372+10*31+15   
            n =int2(y/100), n =2-n+int2(n/4);//加百年闰   
        n +=int2(365.25*(y+4716)+0.01);    //加上年引起的偏移日数   
        n +=int2(30.6*(m+1))+this.D;       //加上月引起的偏移日数及日偏移数   
        n +=((this.s/60+this.m)/60+this.h)/24 - 1524.5;   
        return n;   
    },   
    setFromJD:function(jd){ //儒略日数转公历   
        jd+=0.5;   
        var A=int2(jd), F=jd-A, D;  //取得日数的整数部份A及小数部分F   
        if(A>=2299161) D=int2((A-1867216.25)/36524.25),A+=1+D-int2(D/4);   
        A     +=1524; //向前移4年零2个月   
        this.Y =int2((A-122.1)/365.25);//年   
        D      =A-int2(365.25*this.Y); //去除整年日数后余下日数   
        this.M =int2(D/30.6001);       //月数   
        this.D =D-int2(this.M*30.6001);//去除整月日数后余下日数   
        this.Y-=4716; this.M--;   
        if(this.M>12) this.M-=12;   
        if(this.M<=2) this.Y++;   
        //日的小数转为时分秒   
        F*=24; this.h=int2(F); F-=this.h;   
        F*=60; this.m=int2(F); F-=this.m;   
        F*=60; this.s=F;   
    },   
    toStr:function(){ //日期转为串   
        var Y="     "+this.Y,M="0"+this.M, D="0"+this.D;   
        var h=this.h,m=this.m,s=int2(this.s+.5);   
        if(s>=60) s-=60,m++;   
        if(m>=60) m-=60,h++;   
        h="0"+h; m="0"+m; s="0"+s;   
        Y=Y.substr(Y.length-5,5); M=M.substr(M.length-2,2); D=D.substr(D.length-2,2);   
        h=h.substr(h.length-2,2); m=m.substr(m.length-2,2); s=s.substr(s.length-2,2);   
        return Y+"-"+M+"-"+D+" "+h+":"+m+":"+s;   
    },   
    timeStr:function(jd){ //提取jd中的时间(去除日期)   
        var h,m,s;   
        jd+=0.5; jd = (jd - int2(jd));   
        jd*=24; h = int2(jd); jd-=h;   
        jd*=60; m = int2(jd); jd-=m;   
        jd*=60; s = int2(jd+0.5);   
        if(s>=60) s-=60,m++;   
        if(m>=60) m-=60,h++;   
        h="0"+h; m="0"+m; s="0"+s;   
        return h.substr(h.length-2,2)+':'+m.substr(m.length-2,2)+':'+s.substr(s.length-2,2);   
    }   
};   
   
var ZB={ //坐标类   
    llrConv:function(JW,E){ //球面坐标旋转   
        //黄道赤道坐标变换,赤到黄E取负   
        var sinE =Math.sin(E),    cosE =Math.cos(E);   
        var sinJ =Math.sin(JW[0]),cosJ =Math.cos(JW[0]);   
        var sinW =Math.sin(JW[1]),cosW =Math.cos(JW[1]), tanW=Math.tan(JW[1]);   
        JW[0]=Math.atan2( sinJ*cosE - tanW*sinE, cosJ );   
        JW[1]=Math.asin ( cosE*sinW + sinE*cosW*sinJ  );   
        JW[0]=rad2mrad(JW[0]);   
    },   
    nutB:new Array(   
      2.1824,  -33.75705, 36e-6,-1720,920,  3.5069, 1256.66393, 11e-6,-132, 57,   
      1.3375,16799.4182, -51e-6, -23, 10,   4.3649,  -67.5141,  72e-6,  21, -9,   
      0.04,   -628.302,   0,     -14,  0,   2.36,   8328.691,   0,       7,  0,   
      3.46,   1884.966,   0,      -5,  2,   5.44,  16833.175,   0,      -4,  2,   
      3.69,  25128.110,   0,      -3,  0,   3.55,    628.362,   0,       2,  0),   
    nutation:function(t){ //章动计算,t是世纪数   
        var i,c,a, t2=t*t, B=this.nutB, dL=0,dE=0;   
        for(i=0;i<B.length;i+=5){   
            c = B[i]+B[i+1]*t+B[i+2]*t2;   
            if(i==0) a=-1.742*t; else a=0;   
            dL+=(B[i+3]+a)*Math.sin(c);   
            dE+= B[i+4]   *Math.cos(c);   
        }   
        this.dL=dL/100/rad;  //黄经章动   
        this.dE=dE/100/rad;  //交角章动   
    },   
    nutationLon:function(t){ //只计算黄经章动   
        var i,a, t2=t*t, dL=0, B=this.nutB;   
        for(i=0;i<B.length;i+=5){   
            if(i==0) a=-1.742*t; else a=0;   
            dL += (B[i+3]+a) * Math.sin( B[i]+B[i+1]*t+B[i+2]*t2 );   
        }   
        return dL/100/rad;   
    },   
    hcjj:function(t){ //返回黄赤交角,t是世纪数   
        var t2=t*t, t3=t2*t,t4=t3*t;   
        return (84381.4088 -46.836051*t -0.0001667*t2 -0.00199911*t3-0.000000523*t4)/rad;   
    },   
    gst:function(T,dt){ //传入T是2000年首起算的日数(UT),dt是deltatT(日),精度要求不高时dt可取值为0   
        //返回格林尼治恒星时(不含赤经章动及非多项式部分),即格林尼治子午圈的平春风点起算的赤经   
        var t=(T+dt)/36525,t2=t*t, t3=t2*t, t4=t3*t;   
        return pi2*(0.7790572732640 + 1.00273781191135448*T) //严格说这里的T是UT,下一行的t是力学时(世纪数)   
            + (0.014506 + 4612.15739966*t + 1.39667721*t2 - 0.00009344*t3 + 0.00001882*t4)/rad;   
    },   
    gxc_sunLon:function(t){ //太阳光行差,t是世纪数   
        var v =-0.043126+ 628.301955*t -0.000002732*t*t; //平近点角   
        var e = 0.016708634-0.000042037*t-0.0000001267*t*t;   
        return  ( -20.49552 * (1+e*Math.cos(v)) )/rad; //黄经光行差   
    },   
    gxc_sunLat:function(t) { return 0;       }, //黄纬光行差   
    gxc_moonLon:function(t){ return -3.4E-6; }, //月球经度光行差,误差0.07"   
    gxc_moonLat:function(t){ //月球纬度光行差,误差0.006"   
        return 0.063*Math.sin(0.057+8433.4662*t+0.000064*t*t)/rad;   
    },   
    AR:function(ho){ return -0.0002909/Math.tan( ho+0.002227/(ho+0.07679) ); }, //大气折射,ho是视高度   
    AR2:function(h){ return  0.0002967/Math.tan( h +0.003138/( h+0.08919) ); }, //大气折射,h是真高度   
    parallax:function(z,H,fa,high){ //视差修正   
        //z赤道坐标,fa地理纬度,H时角,high海拔(千米)   
        var sinP = 8.794/rad/z[2]; //赤道地平视差,z[2]应以AU为单位   
        var ba   = 0.99664719;   
        var u    = Math.atan(ba*Math.tan(fa));   
        var sinD = -sinP*(Math.sin(u)*ba+ high*Math.sin(fa)/6378.14);   
        var cosD = -sinP*(Math.cos(u)   + high*Math.cos(fa)/6378.14);   
   
        var sinH = Math.sin(H),    cosH = Math.cos(H);   
        var sinW = Math.sin(z[1]), cosW = Math.cos(z[1]);   
        var a = Math.atan( cosD*sinH / (cosW+cosD*cosH) );   
        z[1]  = Math.atan( (sinW+sinD) / (cosW+cosD*cosH) * Math.cos(a) );   
        z[0]  = rad2mrad( z[0]+a );   
    }   
};   
   
var XL={ //星历类   
    //==========================   
   
    EL:new Array(//以下是地球黄经数据,最大误差0.25"   
    new Array(//EL0   
    33416565,4.6692568,6283.07584999,   
    348943,4.626102,12566.1517,34971,2.74412,5753.38488,34176,2.82887,3.52312,31359,3.62767,77713.77147,   
    26762,4.41808,7860.41939,23427,6.13516,3930.2097,13243,0.74246,11506.76977,12732,2.0371,529.69097,   
    11992,1.10963,1577.34354,9903,5.2327,5884.9268,9019,2.0451,26.2983,8572,3.5085,398.149,   
    7798,1.1788,5223.6939,7531,2.5334,5507.5532,5053,4.5829,18849.2275,4924,4.2051,775.5226,   
    3567,2.9195,0.0673,3171,5.849,11790.6291,2841,1.8987,796.298,2710,0.3149,10977.0788,   
    2428,0.3448,5486.7778,2062,4.8065,2544.3144,2054,1.8695,5573.1428,2023,2.4577,6069.7768,   
    1555,0.8331,213.2991,1322,3.4112,2942.4634,1262,1.083,20.7754,1151,0.6454,0.9803,   
    1029,0.636,4694.003,1019,0.9757,15720.8388,1017,4.2668,7.1135,992,6.21,2146.165,   
    976,0.681,155.42,858,5.983,161000.686,851,1.299,6275.962,847,3.671,71430.696,   
    796,1.808,17260.155,788,3.037,12036.461,747,1.755,5088.629,739,3.503,3154.687,   
    735,4.679,801.821,696,0.833,9437.763,624,3.978,8827.39,611,1.818,7084.897,   
    570,2.784,6286.599,561,4.387,14143.495,556,3.47,6279.553,520,0.189,12139.554,   
    516,1.333,1748.016,511,0.283,5856.478,490,0.487,1194.447,410,5.368,8429.241,   
    409,2.399,19651.048,392,6.168,10447.388,368,6.041,10213.286,366,2.57,1059.382,   
    360,1.709,2352.866,356,1.776,6812.767,333,0.593,17789.846,304,0.443,83996.847,   
    300,2.74,1349.867,254,3.165,4690.48,247,0.215,3.59,237,0.485,8031.092,   
    236,2.065,3340.612,228,5.222,4705.732,219,5.556,553.569,214,1.426,16730.464,   
    211,4.148,951.718,203,0.371,283.859,199,5.222,12168.003,199,5.775,6309.374,   
    191,3.822,23581.258,189,5.386,149854.4,179,2.215,13367.973,175,4.561,135.065,   
    162,5.988,11769.854,151,4.196,6256.778,144,4.193,242.729,143,3.724,38.028,   
    140,4.401,6681.225,136,1.889,7632.943,125,1.131,5.523,121,2.622,955.6,   
    120,1.004,632.784,113,0.177,4164.312,108,0.327,103.093,105,0.939,11926.254,   
    105,5.359,1592.596,103,6.2,6438.496,100,6.029,5746.271,98,1,11371.7,   
    98,5.24,27511.47,94,2.62,5760.5,92,0.48,522.58,92,4.57,4292.33,   
    90,5.34,6386.17,86,4.17,7058.6,84,3.3,7234.79,84,4.54,25132.3,   
    81,6.11,4732.03,81,6.27,426.6,80,5.82,28.45,79,1,5643.18,   
    78,2.96,23013.54,77,3.12,7238.68,76,3.97,11499.66,73,4.39,316.39,   
    73,0.61,11513.88,72,4,74.78,71,0.32,263.08,68,5.91,90955.55,   
    66,3.66,17298.18,65,5.79,18073.7,63,4.72,6836.65,62,1.46,233141.31,   
    61,1.07,19804.83,60,3.32,6283.01,60,2.88,6283.14,55,2.45,12352.85),   
    new Array(//EL1   
    2060589,2.6782346,6283.07585,43034,2.63513,12566.1517,4253,1.5905,3.5231,1193,5.7956,26.2983,   
    1090,2.9662,1577.3435,935,2.592,18849.228,721,1.138,529.691,678,1.875,398.149,   
    673,4.409,5507.553,590,2.888,5223.694,560,2.175,155.42,454,0.398,796.298,   
    364,0.466,775.523,290,2.647,7.114,208,5.341,0.98,191,1.846,5486.778,   
    185,4.969,213.299,173,2.991,6275.962,162,0.032,2544.314,158,1.43,2146.165,   
    146,1.205,10977.079,125,2.834,1748.016,119,3.258,5088.629,118,5.274,1194.447,   
    115,2.075,4694.003,106,0.766,553.569,100,1.303,6286.599,97,4.24,1349.87,   
    95,2.7,242.73,86,5.64,951.72,76,5.3,2352.87,64,2.65,9437.76,   
    61,4.67,4690.48,58,1.77,1059.38,53,0.91,3154.69,52,5.66,71430.7,   
    52,1.85,801.82,50,1.42,6438.5,43,0.24,6812.77,43,0.77,10447.39,   
    41,5.24,7084.9,37,2,8031.09,36,2.43,14143.5,35,4.8,6279.55,   
    34,0.89,12036.46,34,3.86,1592.6,33,3.4,7632.94,32,0.62,8429.24,   
    32,3.19,4705.73,30,6.07,4292.33,30,1.43,5746.27,29,2.32,20.36,   
    27,0.93,5760.5,27,4.8,7234.79,25,6.22,6836.65,23,5,17789.85,   
    23,5.67,11499.66,21,5.2,11513.88,21,3.96,10213.29,21,2.27,522.58,   
    21,2.22,5856.48,21,2.55,25132.3,20,0.91,6256.78,19,0.53,3340.61,   
    19,4.74,83996.85,18,1.47,4164.31,18,3.02,5.52,18,3.03,5753.38,   
    16,4.64,3.29,16,6.12,5216.58,16,3.08,6681.22,15,4.2,13367.97,   
    14,1.19,3894.18,14,3.09,135.07,14,4.25,426.6,13,5.77,6040.35,   
    13,3.09,5643.18,13,2.09,6290.19,13,3.08,11926.25,12,3.45,536.8),   
    new Array(//EL2   
    87198,1.0721,6283.07585,3091,0.8673,12566.1517,273,0.053,3.523,163,5.188,26.298,   
    158,3.685,155.42,95,0.76,18849.23,89,2.06,77713.77,70,0.83,775.52,   
    51,4.66,1577.34,41,1.03,7.11,38,3.44,5573.14,35,5.14,796.3,   
    32,6.05,5507.55,30,1.19,242.73,29,6.12,529.69,27,0.31,398.15,   
    25,2.28,553.57,24,4.38,5223.69,21,3.75,0.98,17,0.9,951.72,   
    15,5.76,1349.87,14,4.36,1748.02,13,3.72,1194.45,13,2.95,6438.5,   
    12,2.97,2146.17,11,1.27,161000.69,10,0.6,3154.69,10,5.99,6286.6,   
    9,4.8,5088.63,9,5.23,7084.9,8,3.31,213.3,8,3.42,5486.78,   
    7,6.19,4690.48,7,3.43,4694,6,1.6,2544.31,6,1.98,801.82,   
    6,2.48,10977.08,5,1.44,6836.65,5,2.34,1592.6,5,1.31,4292.33,   
    5,3.81,149854.4,4,0.04,7234.79,4,4.94,7632.94,4,1.57,71430.7,   
    4,3.17,6309.37,3,0.99,6040.35,3,0.67,1059.38,3,3.18,2352.87,   
    3,3.55,8031.09,3,1.92,10447.39,3,2.52,6127.66,3,4.42,9437.76,   
    3,2.71,3894.18,3,0.67,25132.3,3,5.27,6812.77,3,0.55,6279.55),   
    new Array(2892,5.8438,6283.0758,168,5.488,12566.152,30,5.2,155.42,13,4.72,3.52,7,5.3,18849.23,6,5.97,242.73,4,3.79,553.57,1,4.3,6286.6,1,0.91,6127.66),//EL3   
    new Array(77,4.13,6283.08,8,3.84,12566.15,4,0.42,155.42),//EL4   
    new Array(2,2.77,6283.08,1,2.01,155.42)//EL5   
    ),   
   
    EB:new Array(//地球黄纬数据,误差0.2"   
    new Array(2796,3.1987,84334.6616,1016,5.4225,5507.5532,804,3.88,5223.694,438,3.704,2352.866,319,4,1577.344,227,3.985,1047.747),//EB0   
    new Array(90,3.9,5507.55,62,1.73,5223.69),//EB1   
    new Array(17,1.63,84334.66)//EB2   
    ),   
   
    ER:new Array(//地球向径数据,误差0.00001AU   
    new Array(//ER0   
    1000139888,0,0,16706996,3.09846351,6283.07584999,   
    139560,3.055246,12566.1517,30837,5.19847,77713.77147,   
    16285,1.17388,5753.38488,15756,2.84685,7860.41939,   
    9248,5.4529,11506.7698,5424,4.5641,3930.2097,   
    4721,3.661,5884.9268,3460,0.9637,5507.5532,   
    3288,5.8998,5223.6939,3068,0.2987,5573.1428,   
    2432,4.2735,11790.6291,2118,5.8471,1577.3435,   
    1858,5.0219,10977.0788,1748,3.0119,18849.2275),   
    new Array(1030186,1.1074897,6283.07585,17212,1.06442,12566.1517,7022,3.1416,0),//ER1   
    new Array(43594,5.78455,6283.07585,1236,5.5793,12566.1517,123,3.142,0,88,3.63,77713.77),//ER2   
    new Array(1446,4.2732,6283.0758,67,3.92,12566.15),//ER3   
    new Array(39,2.56,6283.08,3,2.27,12566.15),//ER4   
    new Array(1,1.22,6283.08)//ER5   
    ),   
   
    //以下是月球黄经周期项及泊松项,精度3角秒,平均误差0.5角秒   
    //各坐标均是余弦项,各列单位:角秒,1,1,1e-4,1e-8,1e-8   
    ML:new Array(   
    new Array(//ML0   
    22639.59,0.784758,8328.6914246,1.52292,25.07,-0.1236,4586.44,0.18740,7214.0628654,-2.1848,-18.86,0.083,   
    2369.91,2.54295,15542.754290,-0.6618,6.2,-0.041,769.03,3.1403,16657.382849,3.046,50.1,-0.25,   
    666.42,1.5277,628.301955,-0.027,0.1,-0.01,411.60,4.8266,16866.932315,-1.280,-1.1,-0.01,   
    211.66,4.1150,-1114.62856,-3.708,-44,0.21,205.44,0.2305,6585.76091,-2.158,-19,0.09,   
    191.96,4.8985,23871.44571,0.861,31,-0.16,164.73,2.5861,14914.45233,-0.635,6,-0.04,   
    147.32,5.4553,-7700.38947,-1.550,-25,0.12,124.99,0.4861,7771.37714,-0.331,3,-0.02,   
    109.38,3.8832,8956.99338,1.496,25,-0.1,55.18,5.570,-1324.17803,0.62,7,0,   
    45.10,0.899,25195.62374,0.24,24,-0.1,39.53,3.812,-8538.24089,2.80,26,-0.1,   
    38.43,4.301,22756.81716,-2.85,-13,0,36.12,5.496,24986.07427,4.57,75,-0.4,   
    30.77,1.946,14428.1257,-4.37,-38,0.2,28.40,3.286,7842.3648,-2.21,-19,0.1,   
    24.36,5.641,16171.0562,-0.69,6,0,18.58,4.414,-557.3143,-1.85,-22,0.1,   
    17.95,3.585,8399.6791,-0.36,3,0,14.53,4.942,23243.1438,0.89,31,-0.2,   
    14.38,0.971,32200.1371,2.38,56,-0.3,14.25,5.764,-2.3012,1.52,25,-0.1,   
    13.90,0.374,31085.5086,-1.32,12,-0.1,13.19,1.759,-9443.3200,-5.23,-69,0.3,   
    9.68,3.100,-16029.0809,-3.1,-50,0,9.37,0.30,24080.9952,-3.5,-20,0,   
    8.61,4.16,-1742.9305,-3.7,-44,0,8.45,2.84,16100.0686,1.2,28,0,   
    8.05,2.63,14286.1504,-0.6,6,0,7.63,6.24,17285.6848,3.0,50,0,   
    7.45,1.48,1256.6039,-0.1,0,0,7.37,0.27,5957.4590,-2.1,-19,0,   
    7.06,5.67,33.7570,-0.3,-4,0,6.38,4.78,7004.5134,2.1,32,0,   
    5.74,2.66,32409.6866,-1.9,5,0,4.37,4.34,22128.5152,-2.8,-13,0,   
    4.00,3.25,33524.3152,1.8,49,0,3.21,2.24,14985.4400,-2.5,-16,0,   
    2.91,1.71,24499.748,0.8,31,0,2.73,1.99,13799.824,-4.3,-38,0,   
    2.57,5.41,-7072.088,-1.6,-25,0,2.52,3.24,8470.667,-2.2,-19,0,   
    2.49,4.07,-486.327,-3.7,-44,0,2.15,5.61,-1952.480,0.6,7,0,   
    1.98,2.73,39414.200,0.2,37,0,1.93,1.57,33314.766,6.1,100,0,   
    1.87,0.42,30457.207,-1.3,12,0,1.75,2.06,-8886.006,-3.4,-47,0,   
    1.44,2.39,-695.876,0.6,7,0,1.37,3.03,-209.549,4.3,51,0,   
    1.26,5.94,16728.371,1.2,28,0,1.22,6.17,6656.749,-4.0,-41,0,   
    1.19,5.87,6099.434,-5.9,-63,0,1.18,1.01,31571.835,2.4,56,0,   
    1.16,3.84,9585.295,1.5,25,0,1.14,5.64,8364.740,-2.2,-19,0,   
    1.08,1.23,70.988,-1.9,-22,0,1.06,3.33,40528.829,3.9,81,0,   
    0.99,5.01,40738.378,0,30,0,0.95,5.7,-17772.011,-7,-94,0,   
    0.88,0.3,-0.352,0,0,0,0.82,3.0,393.021,0,0,0,   
    0.79,1.8,8326.390,3,50,0,0.75,5.0,22614.842,1,31,0,   
    0.74,2.9,8330.993,0,0,0,0.67,0.7,-24357.772,-5,-75,0,   
    0.64,1.3,8393.126,-2,-19,0,0.64,5.9,575.338,0,0,0,   
    0.64,1.1,23385.119,-3,-13,0,0.58,5.2,24428.760,3,53,0,   
    0.58,3.5,-9095.555,1,0,0,0.57,6.1,29970.880,-5,-32,0,   
    0.56,3.0,0.329,2,25,0,0.56,4.0,-17981.561,-2,-43,0,   
    0.56,0.5,7143.075,0,0,0,0.55,2.3,25614.376,5,75,0,   
    0.54,4.2,15752.304,-5,-45,0,0.49,3.3,-8294.934,-2,-29,0,   
    0.49,1.7,8362.448,1,21,0,0.48,1.8,-10071.622,-5,-69,0,   
    0.45,0.9,15333.205,4,57,0,0.45,2.1,8311.771,-2,-19,0,   
    0.43,0.3,23452.693,-3,-20,0,0.42,4.9,33733.865,-3,0,0,   
    0.41,1.6,17495.234,-1,0,0,0.40,1.5,23314.131,-1,9,0,   
    0.39,2.1,38299.571,-4,-6,0,0.38,2.7,31781.385,-2,5,0,   
    0.37,4.8,6376.211,2,32,0,0.36,3.9,16833.175,-1,0,0,   
    0.36,5.0,15056.428,-4,-38,0,0.35,5.2,-8257.704,-3,0,0,   
    0.34,4.2,157.734,0,0,0,0.34,2.7,13657.848,-1,0,0,   
    0.33,5.6,41853.007,3,74,0,0.32,5.9,-39.815,0,0,0,   
    0.31,4.4,21500.21,-3,0,0,0.30,1.3,786.04,0,0,0,   
    0.30,5.3,-24567.32,0,0,0,0.30,1.0,5889.88,-2,0,0,   
    0.29,4.2,-2371.23,-4,0,0,0.29,3.7,21642.19,-7,-57,0,   
    0.29,4.1,32828.44,2,56,0,0.29,3.5,31713.81,-1,0,0,   
    0.29,5.4,-33.78,0,0,0,0.28,6.0,-16.92,-4,0,0,   
    0.28,2.8,38785.90,0,0,0,0.27,5.3,15613.74,-3,0,0,   
    0.26,4.0,25823.93,0,0,0,0.25,0.6,24638.31,-2,0,0,   
    0.25,1.3,6447.20,0,0,0,0.25,0.9,141.98,-4,0,0,   
    0.25,0.3,5329.16,-2,0,0,0.25,0.1,36.05,-4,0,0,   
    0.23,2.3,14357.14,-2,0,0,0.23,5.2,2.63,0,0,0,   
    0.22,5.1,47742.89,2,63,0,0.21,2.1,6638.72,-2,0,0,   
    0.20,4.4,39623.75,-4,0,0,0.19,2.1,588.49,0,0,0,   
    0.19,3.1,-15400.78,-3,-50,0,0.19,5.6,16799.36,-1,0,0,   
    0.18,3.9,1150.68,0,0,0,0.18,1.6,7178.01,2,0,0,   
    0.18,2.6,8328.34,2,0,0,0.18,2.1,8329.04,2,0,0,   
    0.18,3.2,-9652.87,-1,0,0,0.18,1.7,-8815.02,-5,-69,0,   
    0.18,5.7,550.76,0,0,0,0.17,2.1,31295.06,-6,0,0,   
    0.17,1.2,7211.76,-1,0,0,0.16,4.5,14967.42,-1,0,0,   
    0.16,3.6,15540.45,1,0,0,0.16,4.2,522.37,0,0,0,   
    0.16,4.6,15545.06,-2,0,0,0.16,0.5,6428.02,-2,0,0,   
    0.16,2.0,13171.52,-4,0,0,0.16,2.3,7216.36,-4,0,0,   
    0.15,5.6,7935.67,2,0,0,0.15,0.5,29828.90,-1,0,0,   
    0.15,1.2,-0.71,0,0,0,0.15,1.4,23942.43,-1,0,0,   
    0.14,2.8,7753.35,2,0,0,0.14,2.1,7213.71,-2,0,0,   
    0.14,1.4,7214.42,-2,0,0,0.14,4.5,-1185.62,-2,0,0,   
    0.14,3.0,8000.10,-2,0,0,0.13,2.8,14756.71,-1,0,0,   
    0.13,5.0,6821.04,-2,0,0,0.13,6.0,-17214.70,-5,-72,0,   
    0.13,5.3,8721.71,2,0,0,0.13,4.5,46628.26,-2,0,0,   
    0.13,5.9,7149.63,2,0,0,0.12,1.1,49067.07,1,55,0,   
    0.12,2.9,15471.77,1,0,0),   
    new Array(//ML1   
    1.677,4.669,628.30196,-0.03,0,0,0.516,3.372,6585.7609,-2.16,-19,0.1,   
    0.414,5.728,14914.4523,-0.64,6,0,0.371,3.969,7700.3895,1.55,25,0,   
    0.276,0.74,8956.9934,1.5,25,0,0.246,4.23,-2.3012,1.5,25,0,   
    0.071,0.14,7842.365,-2.2,-19,0,0.061,2.50,16171.056,-0.7,6,0,   
    0.045,0.44,8399.679,-0.4,0,0,0.040,5.77,14286.150,-0.6,6,0,   
    0.037,4.63,1256.604,-0.1,0,0,0.037,3.42,5957.459,-2.1,-19,0,   
    0.036,1.80,23243.144,0.9,31,0,0.024,0,16029.081,3,50,0,   
    0.022,1.0,-1742.931,-4,-44,0,0.019,3.1,17285.685,3,50,0,   
    0.017,1.3,0.329,2,25,0,0.014,0.3,8326.390,3,50,0,   
    0.013,4.0,7072.088,2,25,0,0.013,4.4,8330.993,0,0,0,   
    0.013,0.1,8470.667,-2,-19,0,0.011,1.2,22128.515,-3,0,0,   
    0.011,2.5,15542.754,-1,0,0,0.008,0.2,7214.06,-2,0,0,   
    0.007,4.9,24499.75,1,0,0,0.007,5.1,13799.82,-4,0,0,   
    0.006,0.9,-486.33,-4,0,0,0.006,0.7,9585.30,1,0,0,   
    0.006,4.1,8328.34,2,0,0,0.006,0.6,8329.04,2,0,0,   
    0.005,2.5,-1952.48,1,0,0,0.005,2.9,-0.71,0,0,0,   
    0.005,3.6,30457.21,-1,0,0),   
    new Array(//ML2   
    0.0049,4.67,628.3020,0,0,0,0.0023,2.67,-2.301,1.5,25,0,   
    0.0015,3.37,6585.761,-2.2,-19,0,0.0012,5.73,14914.452,-0.6,6,0,   
    0.0011,3.97,7700.389,2,25,0,0.0008,0.7,8956.993,1,25,0)   
    ),   
   
    MB:new Array( //精度3角秒   
    new Array(//MB0   
    18461.24,0.057109,8433.4661575,-0.64006,-0.53,-0.0029,1010.17,2.41266,16762.157582,0.883,24.5,-0.13,   
    999.69,5.44004,-104.774733,2.163,25.6,-0.12,623.65,0.9150,7109.288132,-0.022,6.7,-0.04,   
    199.48,1.8153,15647.52902,-2.825,-19,0.08,166.57,4.8427,-1219.40329,-1.545,-18,0.09,   
    117.26,4.1709,23976.22045,-1.302,6,-0.04,61.91,4.768,25090.84901,2.41,50,-0.3,   
    33.36,3.271,15437.97956,1.50,32,-0.2,31.76,1.512,8223.91669,3.69,51,-0.2,   
    29.58,0.958,6480.9862,0,7,0,15.57,2.487,-9548.0947,-3.07,-43,0.2,   
    15.12,0.243,32304.9119,0.22,31,-0.2,12.09,4.014,7737.5901,-0.05,7,0,   
    8.87,1.86,15019.2271,-2.8,-19,0,8.05,5.38,8399.7091,-0.3,3,0,   
    7.96,4.21,23347.9185,-1.3,6,0,7.43,4.89,-1847.7052,-1.5,-18,0,   
    6.73,3.83,-16133.8556,-0.9,-24,0,6.58,2.67,14323.3510,-2.2,-12,0,   
    6.46,3.16,9061.7681,-0.7,0,0,6.30,0.17,25300.3985,-1.9,-2,0,   
    5.63,0.80,733.0767,-2.2,-26,0,5.37,2.11,16204.8433,-1.0,3,0,   
    5.31,5.51,17390.4595,0.9,25,0,5.08,2.26,523.5272,2.1,26,0,   
    4.84,6.18,-7805.1642,0.6,1,0,4.81,5.14,-662.0890,0.3,4,0,   
    3.98,0.84,33419.5404,3.9,75,0,3.67,5.03,22652.0424,-0.7,13,0,   
    3.00,5.93,31190.283,-3.5,-13,0,2.80,2.18,-16971.707,3.4,27,0,   
    2.41,3.57,22861.592,-5.0,-38,0,2.19,3.94,-9757.644,1.3,8,0,   
    2.15,5.63,23766.671,3.0,57,0,1.77,3.31,14809.678,1.5,32,0,   
    1.62,2.60,7318.838,-4.3,-44,0,1.58,3.87,16552.608,5.2,76,0,   
    1.52,2.60,40633.603,1.7,56,0,1.52,0.13,-17876.786,-4.6,-68,0,   
    1.51,3.93,8399.685,-0.3,0,0,1.32,4.91,16275.831,-2.9,-19,0,   
    1.26,0.99,24604.522,-1.3,6,0,1.19,2.00,39518.975,-2.0,12,0,   
    1.13,0.29,31676.610,0.2,31,0,1.09,1.00,5852.684,0,7,0,   
    1.02,2.53,33629.090,0,23,0,0.82,0.1,16066.282,1,32,0,   
    0.80,2.0,-33.787,0,0,0,0.80,5.2,16833.145,-1,0,0,   
    0.79,1.5,-24462.547,-2,-50,0,0.79,1.7,-591.101,-2,-18,0,   
    0.67,4.5,24533.535,1,28,0,0.65,2.5,-10176.397,-3,-43,0,   
    0.64,1.6,25719.151,2,50,0,0.63,0.3,5994.660,-4,-37,0,   
    0.63,2.1,8435.767,-2,-26,0,0.63,1.1,8431.165,1,25,0,   
    0.60,2.7,13695.049,-2,-12,0,0.59,1.2,7666.602,2,29,0,   
    0.47,1.1,30980.734,1,38,0,0.46,0.1,-71.018,2,22,0,   
    0.43,2.8,-8990.780,-1,-21,0,0.42,1.5,16728.401,1,28,0,   
    0.41,5.1,22023.740,-1,13,0,0.38,4.3,22719.617,-1,6,0,   
    0.35,3.0,14880.665,0,10,0,0.34,6.0,30561.981,-3,0,0,   
    0.33,1.6,-18086.336,0,0,0,0.33,1.0,8467.223,-1,0,0,   
    0.31,1.9,14390.93,-3,0,0,0.31,4.6,8852.22,4,51,0,   
    0.31,0.6,6551.97,-2,0,0,0.30,4.7,-7595.61,-4,-51,0,   
    0.30,1.9,7143.05,0,0,0,0.29,3.2,-1428.95,3,0,0,   
    0.27,4.9,-2476.01,-1,0,0,0.26,3.2,41748.23,5,100,0,   
    0.25,3.4,-1009.85,-6,-70,0,0.24,1.9,32514.46,-4,0,0,   
    0.24,3.3,32933.21,0,0,0,0.21,3.6,22233.29,-5,0,0,   
    0.21,4.4,47847.67,0,0,0,0.21,3.9,23418.91,-3,0,0,   
    0.17,5.8,14951.65,-2,0,0,0.16,2.0,38890.67,-2,0,0),   
    new Array(//MB1   
    0.074,4.10,6480.986,0,7,0,0.030,0.9,7737.590,0,7,0,   
    0.022,5.0,15019.227,-3,-19,0,0.020,1.1,23347.918,-1,6,0,   
    0.019,1.7,-1847.705,-2,-18,0,0.017,5.6,16133.856,1,24,0,   
    0.016,0,9061.768,-1,0,0,0.014,3.9,733.077,-2,-26,0,   
    0.013,2.4,17390.460,1,25,0,0.013,5.6,8399.685,0,0,0,   
    0.013,0.9,-523.527,-2,-26,0,0.012,3.2,7805.164,-1,0,0,   
    0.011,3.7,8435.767,-2,0,0,0.011,5.9,8431.165,1,0,0)   
    ),   
   
    MR:new Array( //精度3千米   
    new Array(//MR0   
    385000.5,0,0,0,0,0,   
    20905.4,5.497147,8328.6914246,1.52292,25.07,-0.1236,3699.1,4.89979,7214.062865,-2.1848,-18.9,0.083,   
    2956.0,0.97216,15542.754290,-0.6618,6.2,-0.041,569.9,1.5695,16657.382849,3.046,50,-0.25,   
    246.2,5.6858,-1114.62856,-3.708,-44,0.21,204.6,1.0153,14914.45233,-0.635,6,-0.04,   
    170.7,3.3277,23871.44571,0.86,31,-0.2,152.1,4.943,6585.76091,-2.16,-19,0.1,   
    129.6,0.743,-7700.38947,-1.55,-25,0.1,108.7,5.198,7771.37714,-0.33,3,0,   
    104.8,2.312,8956.99338,1.50,25,-0.1,79.7,5.383,-8538.24089,2.80,26,-0.1,   
    48.9,6.240,628.3020,-0.03,0,0,34.8,2.730,22756.8172,-2.85,-13,0,   
    30.8,4.071,16171.0562,-0.69,6,0,24.2,1.715,7842.3648,-2.21,-19,0.1,   
    23.2,3.925,24986.0743,4.57,75,-0.4,21.6,0.375,14428.1257,-4.37,-38,0.2,   
    16.7,2.014,8399.6791,-0.4,3,0,14.4,3.33,-9443.3200,-5.2,-69,0,   
    12.8,3.37,23243.1438,0.9,31,0,11.6,5.09,31085.5086,-1.3,12,0,   
    10.4,5.68,32200.1371,2.4,56,0,10.3,0.86,-1324.1780,0.6,7,0,   
    10.1,5.73,-1742.9305,-3.7,-44,0,9.9,1.06,14286.1504,-0.6,6,0,   
    8.8,4.79,-9652.8694,-0.9,-18,0,8.4,5.98,-557.3143,-1.9,-22,0,   
    7.0,4.67,-16029.0809,-3.1,-50,0,6.3,1.27,16100.0686,1.2,28,0,   
    5.8,4.67,17285.6848,3.0,50,0,5.0,4.99,5957.459,-2.1,-19,0,   
    4.4,4.60,-209.549,4.3,51,0,4.1,3.21,7004.513,2.1,32,0,   
    4.0,2.77,22128.515,-2.8,-13,0,3.3,0.67,14985.440,-2.5,-16,0,   
    3.1,0.11,16866.932,-1.3,0,0,2.6,0.14,24499.748,0.8,31,0,   
    2.4,1.67,8470.667,-2.2,-19,0,2.1,0.70,-7072.088,-1.6,-25,0,   
    1.9,0.42,13799.824,-4.3,-38,0,1.7,3.63,-8886.006,-3,-47,0,   
    1.6,5.1,30457.207,-1,12,0,1.4,1.2,39414.200,0,37,0,   
    1.4,6.2,23314.131,-1,9,0,1.2,2.3,9585.295,1,25,0,   
    1.1,6.3,33314.766,6,100,0,1.1,6.2,1256.604,0,0,0,   
    1.1,4.1,8364.740,-2,-19,0,0.9,4.4,16728.371,1,28,0,   
    0.9,4.6,6656.749,-4,-41,0,0.9,2.8,70.988,-2,-22,0,   
    0.8,5.7,31571.835,2,56,0,0.8,5.1,-9095.555,1,0,0,   
    0.8,1.0,-17772.011,-7,-94,0,0.8,2.7,15752.304,-5,-45,0,   
    0.7,0.3,8326.390,3,50,0,0.7,1.3,8330.993,0,0,0,   
    0.7,1.8,40528.829,4,81,0,0.7,3.4,22614.842,1,31,0,   
    0.7,0.9,-1952.480,1,7,0,0.6,6.0,8393.126,-2,-19,0,   
    0.6,5.0,24080.995,-3,-20,0,0.6,5.8,23385.119,-3,0,0,   
    0.5,4.3,6099.43,-6,-63,0,0.5,1.8,14218.58,0,0,0,   
    0.5,5.2,7143.08,0,0,0,0.5,3.4,-10071.62,-5,-69,0,   
    0.5,2.4,-17981.56,-2,0,0,0.5,4.9,-8294.93,-2,0,0,   
    0.5,0.2,8362.45,1,0,0,0.4,4.5,29970.88,-5,0,0,   
    0.4,2.3,-24357.77,-5,-75,0,0.4,1.1,13657.85,-1,0,0,   
    0.4,0.5,8311.77,-2,0,0,0.4,3.6,24428.76,3,53,0,   
    0.4,0.7,25614.38,5,75,0,0.3,5.8,-2371.23,-4,0,0,   
    0.3,0.9,9166.54,-3,0,0,0.3,0.4,-8257.70,-3,0,0,   
    0.3,4.8,-10281.17,-1,0,0,0.3,5.8,5889.88,-2,0,0,   
    0.3,0.6,38299.57,-4,0,0,0.3,5.6,15333.20,4,57,0,   
    0.3,2.8,21500.21,-3,0,0,0.3,0.7,14357.14,-2,0,0),   
    new Array(//MR1   
    0.514,4.16,14914.4523,-0.6,6,0,0.382,1.80,6585.7609,-2.2,-19,0,   
    0.327,2.40,7700.3895,1.5,25,0,0.264,5.45,8956.9934,1.5,25,0,   
    0.123,3.10,628.302,0,0,0,0.078,0.93,16171.056,-0.7,6,0,   
    0.061,4.86,7842.365,-2.2,-19,0,0.050,4.2,14286.150,-1,6,0,   
    0.042,5.2,8399.679,0,0,0,0.032,0.2,23243.144,1,31,0,   
    0.025,2.6,-1742.931,-4,-44,0,0.025,1.8,5957.459,-2,-19,0,   
    0.018,4.8,16029.081,3,50,0,0.014,1.5,17285.68,3,50,0,   
    0.014,1.0,15542.75,-1,0,0,0.013,5.0,8326.39,3,50,0,   
    0.012,4.8,8470.67,-2,0,0,0.012,2.8,8330.99,0,0,0,   
    0.011,2.4,7072.09,2,0,0,0.010,5.9,22128.52,-3,0,0),   
    new Array(//MR2   
    0.0015,4.2,14914.452,-1,6,0,0.0011,1.8,6585.761,-2,-19,0,   
    0.0009,2.4,7700.389,2,25,0,0.0008,5.5,8956.993,1,25,0)   
    ),   
   
    //=====================   
   
    //星历函数(日月球面坐标计算)   
    Enn:function(ob,t,n){ //计算E_L0或E_L1或E_L2等   
        var i,j,F,N,v=0,tn=1,c;   
        if(ob==this.EL){   
            var t2=t*t, t3=t2*t, t4=t3*t, t5=t4*t; //千年数的各次方   
            v += 1753469512 + 6283319653318*t + 529674*t2 + 432*t3 - 1124*t4 - 9*t5 + 630 * Math.cos(6+3*t); //地球平黄经(已拟合DE406)   
        }   
        n*=3; if(n<0) n = ob[0].length;   
        for(i=0;i<ob.length;i++,tn*=t){   
            F = ob[i];   
            N = int2( n*F.length/ob[0].length+0.5 );  if(i) N+=3;  if(N >= F.length) N=F.length;   
            for(j=0,c=0;j<N;j+=3) c+=F[j]*Math.cos(F[j+1] +t*F[j+2]);   
            v += c*tn;   
        }   
        return v/1000000000;   
    },   
    E_coord:function(t,re,n){ //返回地球坐标,t为世纪数   
        t/=10;   
        re[0]= this.Enn( this.EL, t, n);   
        re[1]= this.Enn( this.EB, t,-1);   
        re[2]= this.Enn( this.ER, t,-1);   
    },   
   
    E_Lon:function(t,n){ return this.Enn(this.EL,t/10,n); }, //地球经度计算,返回Date分点黄经,传入世纪数、取项数   
   
    Mnn:function(ob,t,n){ //计算ML0或ML1或ML2   
        var i,j,F,N,v=0,tn=1,c;   
        var t2=t*t,t3=t2*t,t4=t3*t,t5=t4*t,tx=t-10;   
        if(ob==this.ML){   
            v += (3.81034409 + 8399.684730072*t -3.319e-05*t2 + 3.11e-08*t3 - 2.033e-10*t4)*rad; //月球平黄经(弧度)   
            v += 5028.792262*t + 1.1124406*t2 + 0.00007699*t3 - 0.000023479*t4 -0.0000000178*t5;  //岁差(角秒)   
            if(tx>0) v += -0.866 +1.43*tx +0.054*tx*tx; //对公元3000年至公元5000年的拟合,最大误差小于10角秒   
        }   
        t2/=1e4,t3/=1e8,t4/=1e8;   
        n*=6; if(n<0) n = ob[0].length;   
        for(i=0;i<ob.length;i++,tn*=t){   
            F=ob[i];   
            N = int2( n*F.length/ob[0].length+0.5 );  if(i) N+=6;  if(N >= F.length) N=F.length;   
            for(j=0,c=0;j<N;j+=6) c+=F[j]*Math.cos(F[j+1] +t*F[j+2] +t2*F[j+3] +t3*F[j+4] +t4*F[j+5]);   
            v += c*tn;   
        }   
        if(ob!=this.MR) v/=rad;   
        return v;   
    },   
    M_coord:function(t,re,n1,n2,n3){ //返回月球坐标,n1,n2,n3为各坐标所取的项数   
        re[0] = this.Mnn( this.ML, t, n1 );   
        re[1] = this.Mnn( this.MB, t, n2 );   
        re[2] = this.Mnn( this.MR, t, n3 );   
    },   
    M_Lon:function(t,n){ return this.Mnn(this.ML,t,n); }, //月球经度计算,返回Date分点黄经,传入世纪数,n是项数比例   
   
    //=========================   
    E_v:function(t){ //地球速度,t是世纪数,误差小于万分3   
        var f=628.307585*t;   
        return 628.332 +21 *Math.sin(1.527+f) +0.44 *Math.sin(1.48+f*2)    
                +0.129*Math.sin(5.82+f)*t +0.00055*Math.sin(4.21+f)*t*t;   
    },   
    M_v:function(t){ //月球速度计算,传入世经数   
        var v = 8399.71 - 914*Math.sin( 0.7848 + 8328.691425*t + 0.0001523*t*t ); //误差小于5%   
        v-=179*Math.sin( 2.543  +15542.7543*t )  //误差小于0.3%   
          +160*Math.sin( 0.1874 + 7214.0629*t )   
          +62 *Math.sin( 3.14   +16657.3828*t )   
          +34 *Math.sin( 4.827  +16866.9323*t )   
          +22 *Math.sin( 4.9    +23871.4457*t )   
          +12 *Math.sin( 2.59   +14914.4523*t )   
          +7  *Math.sin( 0.23   + 6585.7609*t )   
          +5  *Math.sin( 0.9    +25195.624 *t )   
          +5  *Math.sin( 2.32   - 7700.3895*t )   
          +5  *Math.sin( 3.88   + 8956.9934*t )   
          +5  *Math.sin( 0.49   + 7771.3771*t );   
        return v;   
    },   
   
    //=========================   
    MS_aLon:function(t,Mn,Sn){ //月日视黄经的差值   
        return this.M_Lon(t,Mn) + ZB.gxc_moonLon(t) - ( this.E_Lon(t,Sn) + ZB.gxc_sunLon(t) + Math.PI );   
    },   
    S_aLon:function(t,n){  //太阳视黄经   
        return this.E_Lon(t,n) + ZB.nutationLon(t) + ZB.gxc_sunLon(t) + Math.PI; //注意，这里的章动计算很耗时   
    },   
   
    //=========================   
   
    E_Lon_t:function(W){ //已知地球真黄经求时间   
        var t,v= 628.3319653318;   
        t  = ( W - 1.75347          )/v; v=this.E_v(t);   //v的精度0.03%，详见原文   
        t += ( W - this.E_Lon(t,10) )/v; v=this.E_v(t);   //再算一次v有助于提高精度,不算也可以   
        t += ( W - this.E_Lon(t,-1) )/v;   
        return t;   
    },   
    M_Lon_t:function(W){ //已知真月球黄经求时间   
        var t,v= 8399.70911033384;   
        t  = ( W - 3.81034          )/v;   
        t += ( W - this.M_Lon(t,3 ) )/v; v=this.M_v(t);  //v的精度0.5%，详见原文   
        t += ( W - this.M_Lon(t,20) )/v;   
        t += ( W - this.M_Lon(t,-1) )/v;   
        return t;   
    },   
    MS_aLon_t:function(W){ //已知月日视黄经差求时间   
        var t,v= 7771.37714500204;   
        t  = ( W + 1.08472               )/v;   
        t += ( W - this.MS_aLon(t, 3, 3) )/v; v=this.M_v(t)-this.E_v(t);  //v的精度0.5%，详见原文   
        t += ( W - this.MS_aLon(t,20,10) )/v;   
        t += ( W - this.MS_aLon(t,-1,60) )/v;   
        return t;   
    },   
    S_aLon_t:function(W){ //已知太阳视黄经反求时间   
        var t,v= 628.3319653318;   
        t  = ( W - 1.75347-Math.PI   )/v; v=this.E_v(t); //v的精度0.03%，详见原文   
        t += ( W - this.S_aLon(t,10) )/v; v=this.E_v(t); //再算一次v有助于提高精度,不算也可以   
        t += ( W - this.S_aLon(t,-1) )/v;   
        return t;   
    },   
    /****  
    MS_aLon_t1:function(W){ //已知月日视黄经差求时间,高速低精度,误差不超过40秒  
      var t,v = 7771.37714500204;  
      t  = ( W + 1.08472               )/v;  
      t += ( W - this.MS_aLon(t, 3, 3) )/v;  v=this.M_v(t)-this.E_v(t);  //v的精度0.5%，详见原文  
      t += ( W - this.MS_aLon(t,50,20) )/v;  
      return t;  
    },  
    S_aLon_t1:function(W){ //已知太阳视黄经反求时间,高速低精度,最大误差不超过50秒,平均误差15秒  
      var t,v= 628.3319653318;  
      t  = ( W - 1.75347-Math.PI   )/v; v = 628.332 + 21*Math.sin( 1.527+628.307585*t );  
      t += ( W - this.S_aLon(t,3) )/v;  
      t += ( W - this.S_aLon(t,40))/v;  
      return t;  
    },  
    ****/   
    MS_aLon_t2:function(W){ //已知月日视黄经差求时间,高速低精度,误差不超过600秒   
        var t,v = 7771.37714500204;   
        t  = ( W + 1.08472 )/v;   
        var L,t2 = t*t;   
        t -= ( -0.00003309*t2 + 0.10976*Math.cos( 0.784758 + 8328.6914246*t + 0.000152292*t2 ) + 0.02224 *Math.cos( 0.18740  + 7214.0628654*t - 0.00021848 *t2 ) - 0.03342 *Math.cos( 4.669257 + 628.307585*t ) )/v;   
        L = this.M_Lon(t,20) - (4.8950632+ 628.3319653318*t + 0.000005297*t*t + 0.0334166*Math.cos(4.669257+628.307585*t) + 0.0002061*Math.cos(2.67823+628.307585*t)*t + 0.000349*Math.cos(4.6261+1256.61517*t) - 20.5/rad);   
        v = 7771.38 - 914*Math.sin( 0.7848 + 8328.691425*t + 0.0001523*t*t ) - 179*Math.sin( 2.543 + 15542.7543*t ) - 160*Math.sin( 0.1874 + 7214.0629*t );   
        t += ( W - L )/v;   
        return t;   
    },   
    S_aLon_t2:function(W){ //已知太阳视黄经反求时间,高速低精度,最大误差不超过600秒   
        var t,L,v= 628.3319653318;   
        t =  ( W - 1.75347-Math.PI )/v;   
        t -= ( 0.000005297*t*t + 0.0334166 * Math.cos( 4.669257 + 628.307585*t) + 0.0002061 * Math.cos( 2.67823  + 628.307585*t)*t )/v;   
        t += ( W - this.E_Lon(t,8) - Math.PI + (20.5+17.2*Math.sin(2.1824-33.75705*t))/rad )/v;   
        return t;   
    },   
    moonIll:function(t){ //月亮被照亮部分的比例   
        var t2 = t*t, t3 =t2*t, t4 = t3*t;   
        var D,M,m,a, dm=Math.PI/180;   
        D = 297.8502042 + 445267.1115168*t - 0.0016300*t2 + t3/545868 - t4/113065000; //日月距角   
        M = 357.5291092 +  35999.0502909*t - 0.0001536*t2 + t3/24490000;              //太阳平近点   
        m = 134.9634114 + 477198.8676313*t + 0.0089970*t2 + t3/69699 - t4/14712000;   //月亮平近点   
        D*=dm, M*=dm, m*=dm;   
        a = Math.PI - D + (-6.289*Math.sin(m) +2.100*Math.sin(M) -1.274*Math.sin(D*2-m) -0.658*Math.sin(D*2) -0.214*Math.sin(m*2) -0.110*Math.sin(D))*dm;   
        return (1+Math.cos(a))/2;   
    },   
    moonRad:function(r,h){ //转入地平纬度及地月质心距离,返回站心视半径(角秒)   
        return 358473400/r*(1+Math.sin(h)*6378.14/r);   
    }   
};   
   
var SZJ={//日月的升中天降,不考虑气温和气压的影响   
    L  : 0,  //站点地理经度,向东测量为负   
    fa : 0,  //站点地理纬度   
    dt : 0,  //TD-UT   
    E  : 0.409092614, //黄赤交角   
    getH:function(h,w){ //h地平纬度,w赤纬,把回时角   
        var c = ( Math.sin(h) - Math.sin(this.fa)*Math.sin(w) ) / Math.cos(this.fa)/Math.cos(w);   
        if(Math.abs(c)>1) return Math.PI;   
        return Math.acos(c);   
    },   
   
    Mcoord:function(jd,H0,z){ //章动同时影响恒星时和天体坐标,所以不计算章动。返回时角及赤经纬   
        XL.M_coord( (jd+this.dt)/36525, z, 30,20,8 ); //低精度月亮赤经纬   
        ZB.llrConv( z, this.E ); //转为赤道坐标   
        z.H = rad2mrad(ZB.gst(jd,this.dt) - this.L - z[0]);   if( z.H>Math.PI ) z.H -= pi2; //得到此刻天体时角   
        if(H0) z.H0 = this.getH( 0.7275*6378.14/z[2]-34*60/rad, z[1] ); //升起对应的时角   
    },   
    Mt : function(jd){ //月亮到中升降时刻计算,传入jd含义与St()函数相同   
        this.dt = JD.deltatT2(jd);   
        this.E  = ZB.hcjj(jd/36525);   
        jd -= mod2(0.1726222 + 0.966136808032357*jd - 0.0366*this.dt - this.L/pi2, 1); //查找最靠近当日中午的月上中天,mod2的第1参数为本地时角近似值   
   
        var r = new Array(), sv = pi2*0.966;   
        r.z = r.s = r.j = r.c = r.h = jd;   
        this.Mcoord(jd,1,r); //月亮坐标   
        r.s += (-r.H0 - r.H )/sv;   
        r.j += ( r.H0 - r.H )/sv;   
        r.z += (    0 - r.H )/sv;   
        this.Mcoord(r.s,1,r);  r.s += ( -r.H0 - r.H )/sv;   
        this.Mcoord(r.j,1,r);  r.j += ( +r.H0 - r.H )/sv;   
        this.Mcoord(r.z,0,r);  r.z += (     0 - r.H )/sv;   
        return r;   
    },   
   
    Scoord:function(jd,H0,H1,z){ //章动同时影响恒星时和天体坐标,所以不计算章动。返回时角及赤经纬   
        z[0] = XL.E_Lon( (jd+this.dt)/36525, 5 ) + Math.PI - 20.5/rad;  //太阳坐标(修正了光行差)   
        z[1] = 0; z[2]=1;   
        ZB.llrConv( z, this.E ); //转为赤道坐标   
        z.H = rad2mrad(ZB.gst(jd,this.dt) - this.L - z[0]);   if( z.H>Math.PI ) z.H -= pi2; //得到此刻天体时角   
        if(H0) z.H0 = this.getH(-50*60/rad,z[1]);  //地平以下50分   
        if(H1) z.H1 = this.getH(-Math.PI/30,z[1]); //地平以下6度   
    },   
    St : function(jd){ //太阳到中升降时刻计算,传入jd是当地中午12点时间对应的2000年首起算的格林尼治时间UT   
        this.dt = JD.deltatT2(jd);   
        this.E  = ZB.hcjj(jd/36525);   
        jd -= mod2(jd - this.L/pi2, 1); //查找最靠近当日中午的日上中天,mod2的第1参数为本地时角近似值   
   
        var r = new Array(), sv = pi2;   
        r.z = r.s = r.j = r.c = r.h = jd;   
        this.Scoord(jd,1,1,r); //太阳坐标   
        r.s += (-r.H0 - r.H )/sv; //升起   
        r.j += ( r.H0 - r.H )/sv; //降落   
        r.c += (-r.H1 - r.H )/sv; //民用晨   
        r.h += ( r.H1 - r.H )/sv; //民用昏   
        r.z += (    0 - r.H )/sv; //中天   
        this.Scoord(r.s,1,0,r);  r.s += ( -r.H0 - r.H )/sv;   
        this.Scoord(r.j,1,0,r);  r.j += ( +r.H0 - r.H )/sv;   
        this.Scoord(r.c,0,1,r);  r.c += ( -r.H1 - r.H )/sv;   
        this.Scoord(r.h,0,1,r);  r.h += ( +r.H1 - r.H )/sv;   
        this.Scoord(r.z,0,0,r);  r.z += (     0 - r.H )/sv;   
        return r;   
    },   
   
    rts:new Array(),//多天的升中降   
    calcRTS:function(jd,n,Jdl,Wdl,sq){ //多天升中降计算,jd是当地起始略日(中午时刻),sq是时区   
        var i,c,r;   
        if(!this.rts.length) { for(var i=0;i<31;i++) this.rts[i] = new Array(); }   
        this.L = Jdl, this.fa = Wdl, sq/=24; //设置站点参数   
        for(i=0;i<n;i++){ r=this.rts[i];  r.Ms=r.Mz=r.Mj=""; }   
        for(i=-1;i<=n;i++){   
            if(i>=0&&i<n){ //太阳   
                r = SZJ.St(jd+i+sq);   
                this.rts[i].s = JD.timeStr(r.s-sq); //升   
                this.rts[i].z = JD.timeStr(r.z-sq); //中   
                this.rts[i].j = JD.timeStr(r.j-sq); //降   
                this.rts[i].c = JD.timeStr(r.c-sq); //晨   
                this.rts[i].h = JD.timeStr(r.h-sq); //昏   
                this.rts[i].ch = JD.timeStr(r.h-r.c-0.5); //光照时间,timeStr()内部+0.5,所以这里补上-0.5   
                this.rts[i].sj = JD.timeStr(r.j-r.s-0.5); //昼长   
            }   
            r = SZJ.Mt(jd+i+sq); //月亮   
            c=int2(r.s-sq+0.5)-jd;  if(c>=0&&c<n) this.rts[c].Ms = JD.timeStr(r.s-sq);   
            c=int2(r.z-sq+0.5)-jd;  if(c>=0&&c<n) this.rts[c].Mz = JD.timeStr(r.z-sq);   
            c=int2(r.j-sq+0.5)-jd;  if(c>=0&&c<n) this.rts[c].Mj = JD.timeStr(r.j-sq);   
        }   
        this.rts.dn = n;   
    }   
}  
   
/*********************************  
=====以下是公历、农历、回历综合日历计算=====  
  
  Lunar：日历计算物件  
  
  使用条件：事先引用eph.js、JN.js、kwb.js三个文件  
  
一、 calc:function(jd,jing)方法  
·功能：  
  农历排月序计算,可定出农历基本信息(如大小月、闰月、合朔等)  
·入口参数：  
  jd是J2000.0起算的儒略日数TD，使用UT也可以  
  jing=1表示精算合朔及节气时刻  
  jing=0则是精算，但在日期临界时精算  
·返回：  
  leap  闰月位置(即置闰的月序号),0表示不置闰  
  leap2 闰月位置(即置闰的月序号),0表示不置闰(第二年的)  
  ym    数组，各月名称，共15个有效月分  
  zq    数组，中气时刻表(儒略日)，14个有效  
  hs    数组，合朔时刻表(儒略日)，15个有效  
  ZQ:   数组，中气表(整数儒略日)，14个有效，整数儒略日对应该日的12:00:00  
  HS    数组，合朔表(整数儒略日)，15个有效，整数儒略日对应该日的12:00:00  
  dx    数组，14个有效  
  nu    数组，闰月情况，14个有效  
  ZQ.mangzhong 芒种儒略日，计算入梅用到  
  ZQ.xiaoshu   小暑儒略日，计算出梅用到  
  ZQ.liqiu     立秋儒略日，计算三伏用到  
  ZQ.lichun    立春儒略日，计算纪年用到  
  
二、Lunar.calc2(By,Bm,sw)方法  
·功能：  
  计算某一个月的“公历、农历、回历”三合历  
·入口参数：  
  By是年(公历)  
  Bm是月(公历)  
  sw表示是否计算月相及节气时刻。  
·返回：  
  结果返回在Lunar.lun中，它是一个数组，以下说明简写为lun，它包含完整的公历一个月的信息。  
  lun[0]是本月第一天信息，lun[2]为第二天，其余类推。  
  lun中的各元数下文记作ob。  
·注意：  
  此函数被调用时,Lunar.calc()被执行  
·公历月信息  
  lun.w0  本月第一天的星期  
  lun.y   公历年份  
  lun.m   公历月分  
  lun.d0  月首的J2000.0起算的儒略日数  
  lun.dn  本月的天数  
  lun.Ly  该年的干支纪年  
  lun.ShX 该年的生肖  
  lun.nianhao.nh 年号  
  lun.nianhao.nh2 年号详细  
·各日公历信息  
  ob.d0   2000.0儒略日,北京时12:00  
  ob.di   所在公历月内日序数  
  ob.y    所在公历年,同lun.y  
  ob.m    所在公历月,同lun.m  
  ob.d    日名称(公历)  
  ob.dn   所在公历月的总天数,同lun.d0  
  ob.week0所在月的月首的星期,同lun.w0  
  ob.week 星期  
  ob.weeki在本月中的周序号  
  ob.weekN本月的总周数  
·各日农历信息  
  ob.Ldi  距农历月首的编移量,0对应初一  
  ob.Ldc  日名称(农历)  
  ob.cur_dz 距冬至的天数  
  ob.cur_xz 距夏至的天数  
  ob.cur_lq 距立秋的天数  
  ob.cur_mz 距芒种的天数  
  ob.cur_xs 距小暑的天数  
  ob.Lmc  月名称  
  ob.Ldn  月大小  
  ob.Lleap闰状况(值为'闰'或空串)  
  ob.Lmc2 下个月名称,判断除夕时要用到  
·各日的农历纪年、月、日、时及星座  
  ob.Lyear  农历纪年(10进制,1984年起算,分界点可以是立春也可以是春节,在程序中选择一个)  
  ob.Lyear2 干支纪年  
  ob.Lmonth  纪月处理,1998年12月7日(大雪)开始连续进行节气计数,0为甲子  
  ob.Lmonth2 干支纪月  
  ob.Lday2  纪日  
  ob.Ltime2 纪时  
  ob.XiZ 星座  
·各日节日信息  
  ob.A 重要喜庆日子名称(可将日子名称置红)  
  ob.B 重要日子名称  
  ob.C 各种日子名称(连成一大串)  
  ob.Fjia 放假日子(可用于日期数字置红)  
·各日回历信息  
  ob.Hyear  年(回历)  
  ob.Hmonth 月(回历)  
  ob.Hday   日(回历)  
·其它信息,sw=1时有效  
  ob.yxmc 月相名称  
  ob.yxjd 月相时刻(儒略日)  
  ob.yxsj 月相时间串  
  ob.jqmc 节气名称  
  ob.jqjd 节气时刻(儒略日)  
  ob.jqsj 节气时间串  
**********************************/  
//import {JD} from './helper/eph'

Lunar={   
    Gan:new Array("甲","乙","丙","丁","戊","己","庚","辛","壬","癸"),   
    Zhi:new Array("子","丑","寅","卯","辰","巳","午","未","申","酉","戌","亥"),   
    ShX:new Array("鼠","牛","虎","兔","龙","蛇","马","羊","猴","鸡","狗","猪"),   
    XiZ:new Array('摩羯','水瓶','双鱼','白羊','金牛','双子','巨蟹','狮子','处女','天秤','天蝎','射手'),   
    yxmc:new Array("朔","上弦","望","下弦"), //月相名称表   
    jqmc:new Array('冬至','小寒','大寒','立春','雨水','惊蛰','春分','清明','谷雨','立夏','小满','芒种','夏至','小暑','大暑','立秋','处暑','白露','秋分','寒露','霜降','立冬','小雪','大雪'),   
    ymc:new Array('十一','十二','正','二','三','四','五','六','七','八','九','十'), //月名称,建寅   
    rmc:new Array('初一','初二','初三','初四','初五','初六','初七','初八','初九','初十','十一','十二','十三','十四','十五','十六','十七','十八','十九','二十','廿一','廿二','廿三','廿四','廿五','廿六','廿七','廿八','廿九','三十'),   
    Weeks:new Array('日','一','二','三','四','五','六','七','八','九','十'),   
   
    //在调用calc()或calc2()后得到以下数据   
    leap:0,        //闰月位置   
    leap2:0,   
    ym:new Array(), //各月名称   
    zq:new Array(), //中气表   
    hs:new Array(), //合朔表   
    ZQ:new Array(), //中气表,其中.liqiu是节气立秋的儒略日,计算三伏时用到   
    HS:new Array(), //合朔表   
    dx:new Array(), //各月大小   
    nu:new Array(), //闰月情况   
   
    lun:new Array(),//月历数组,在调用calc2()之后得到   
    
    sayHallo:function(){
        return 'i am Lunar';
    },
   
    t2BJ:function(t){ t*=36525; return t-JD.deltatT2(t)+8/24; }, //力学时转为北京时   
   
    calcSun_t:function(w,k,jing){ //节气时刻计算(视位置反推时间),jing=0时高速低精度(处在日期临界时自动采用高精度)   
        var t;   
        if(jing) t = XL.S_aLon_t(w);   
        else     t = XL.S_aLon_t2(w);   
        t = this.t2BJ(t);   
        if(!jing && Math.abs( mod2( t+0.5,1 )*86400) < 600 ) { t = XL.S_aLon_t(w); t = this.t2BJ(t); }   
        this.zq[k] = t;   
        this.ZQ[k] = int2(t+0.5);   
    },   
    calcMoon_t:function(w,k,jing){ //日月距角时刻计算(视位置反推时间),jing=0时高速低精度(处在日期临界时自动采用高精度)   
        var t;   
        if(jing) t = XL.MS_aLon_t(w);   
        else     t = XL.MS_aLon_t2(w);   
        t = this.t2BJ(t);   
        if(!jing && Math.abs( mod2( t+0.5,1 )*86400) < 600 ) { t = XL.MS_aLon_t(w); t = this.t2BJ(t); }   
        this.hs[k] = t;   
        this.HS[k] = kanwuHS( int2(t+0.5) );   
    },   
   
    calc:function(jd,jing){ //农历排月序计算,可定出农历   
        var A=this.ZQ, B=this.HS;  //中气表,日月合朔表(整日)   
        var i, k, W, w;   
   
        //该年的中气   
        W = (int2((jd+10)/365.2422) + 3/4)*pi2; //冬至黄经,jd=-10到-10+365.24时,取1999年12的冬至,也就时说,如果jd取12月底的几日时会计算下一年的农历   
        for(i=0;i<14;i++) this.calcSun_t( W+i*pi2/12, i, jing ); //14个中气时刻(北京时间),从冬至开始到下一个冬至以后   
   
        //今年"首朔"的日月黄经差w   
        w = XL.MS_aLon( (A[0]-8/24)/36525,16,8 ); //冬至当天的日月距角估算,可以考虑加上deltatT   
        w -= mod2(w,pi2); //计算距离冬至最近日月合朔的黄经,它可能比首朔多一圈   
   
        this.calcMoon_t( w, 0, jing ); k=0;   
        if( B[0]>A[0] ) this.hs[1]=this.hs[0], B[1] = B[0], w-=pi2, k=1; //判断是否多一圈   
   
        //该年所有朔,包含14个月的始末   
        for(i=0;i<15;i++) { if(i!=k) this.calcMoon_t( w+i*pi2, i, jing ); }   
   
        //确定闰月   
        for(i=0;i<14;i++) this.ym[i]=i; //月序初始化   
        this.leap = this.leap2 = 0;   
        if( B[13] <= A[12] ){ //第13月的月末没有超过冬至(不含冬至),说明今年含有13个月   
            for(i=1; B[i+1]>A[i] && i<13; i++); //在13个月中找第1个没有中气的月份   
            this.leap = i;   
            for(;i<14;i++) this.ym[i]--;   
        }else{   
            if( B[14]<=A[13] ){ //第14月不含中气,该月可能是要置闰。这部分不是农历计算所必需的,只是为了在公历一年中显示全部农历   
                this.calcSun_t (W+pi2*2, 'next', jing);   
                this.calcMoon_t(w+pi2*25,'next', jing);   
                if( B.next<A.next ) this.ym[13]--,this.leap2=13; //第14月置闰   
            }   
        }   
        //闰月勘误   
        k=kanwuNU(B,14);   
        if(k!=-1){   
            for(i=0;i<14;i++) this.ym[i]=i; //月序初始化   
            this.leap = this.leap2 = 0;   
            if( B[13] <= A[12] ) this.leap = k;   
            else this.leap2 = k;   
            for(i=k;i<14;i++) this.ym[i]--;   
        }   
   
        for(i=0;i<14;i++){ //月大小及名称转换   
            this.dx[i]=this.HS[i+1]-this.HS[i];   
            this.ym[i]=this.ymc[this.ym[i]%12];   
            if((i==this.leap||i==this.leap2) && i) this.nu[i]='闰'; else this.nu[i]='';   
        }   
        this.calcSun_t( W+11*pi2/24, 'mangzhong', 0 ); //保存芒种   
        this.calcSun_t( W+13*pi2/24, 'xiaoshu',   0 ); //保存小暑   
        this.calcSun_t( W+15*pi2/24, 'liqiu',     0 ); //保存立秋   
        this.calcSun_t( W+ 3*pi2/24, 'lichun',    0 ); //保存立春   
    },   
    calc2:function(By,Bm,sw){ //返回公历某一个月的'公农回'三合历   
        var i,j,k,c,Bd0,Bdn,lun=this.lun;   
        if(!this.lun.length) { for(var i=0;i<31;i++) this.lun[i] = new Array(); }   
   
        //日历物件初始化   
        JD.h=12, JD.m=0, JD.s=0.1;   
        JD.Y=By; JD.M=Bm; JD.D=1;          Bd0 = int2(JD.toJD()) - J2000;  //公历月首,中午   
        JD.M++; if(JD.M>12) JD.Y++,JD.M=1; Bdn = int2(JD.toJD()) - J2000 - Bd0; //本月天数(公历)   
   
        lun.w0= (Bd0 + J2000 +1)%7; //本月第一天的星期   
        lun.y = By; //公历年份   
        lun.m = Bm; //公历月分   
        lun.d0 =Bd0;   
        lun.dn= Bdn;   
   
        //所属公历年对应的农历干支纪年   
        c = int2((Bd0-Bm*30+150)/365.2422) + 16 + 9000;   
        lun.Ly  = Lunar.Gan[c%10]+Lunar.Zhi[c%12];  //干支纪年   
        lun.ShX = Lunar.ShX[c%12]; //该年对应的生肖   
   
        //年号纪年处理   
        lun.nianhao = new getNH(lun.y);   
   
        var D,w,ob,ob2;   
   
        //纪月计算所需的节气(提取本月所含有的节气及下一个)   
        var Djq1,Djq2,jqFirst;   
        w = XL.S_aLon( (Bd0+JD.deltatT2(Bd0)-8/24)/36525, 3 ); //估算当日太阳黄经,如果年代不很遥远(如J2000+-2000年),deltatT2可以不算   
        w = w - mod2( w-pi2/24, pi2/12 ); //得到最近的节气经度   
        Djq1 = Math.floor( this.t2BJ( XL.S_aLon_t(w) ) + 0.5 ); //得到最近的节气发生日期   
        if(Djq1<Bd0){   
            w += pi2/12;   
            Djq1 = Math.floor( this.t2BJ( XL.S_aLon_t(w) ) + 0.5 );   
        }   
        Djq2 = Math.floor( this.t2BJ( XL.S_aLon_t(w+pi2/12) ) + 0.5 );   
        jqFirst = int2((w%pi2)/pi2*12+15.501)%12; //取得本月首个节气序号,从大雪起算(所以加12+3.5=15.5,其中加12是为了防止出现负数)   
   
        //提取各日信息   
   
        for(i=0,j=0;i<Bdn;i++){   
            ob = lun[i];   
            ob.d0 = Bd0+i; //儒略日,北京时12:00   
            ob.di = i;     //公历月内日序数   
            ob.y  = By;    //公历年   
            ob.m  = Bm;    //公历月   
            ob.dn = Bdn;   //公历月天数   
            ob.week0 = lun.w0; //月首的星期   
            ob.week  = (lun.w0+i)%7; //当前日的星期   
            ob.weeki = int2((lun.w0+i)/7); //本日所在的周序号   
            ob.weekN = int2((lun.w0+Bdn-1)/7) + 1;  //本月的总周数   
            JD.setFromJD(ob.d0+J2000); ob.d = JD.D; //公历日名称   
   
            if(!this.HS.length || ob.d0<this.HS[0] || ob.d0>=this.HS[13]+this.dx[13]) //如果d0在已计算农历范围内则不再计算   
                this.calc(ob.d0,0);   
            j = Math.floor( (ob.d0-this.HS[0])/30 );  if(j<13 && this.HS[j+1]<=ob.d0) j++; //农历所在月的序数   
            ob.Ldi = ob.d0 - this.HS[j];    //距农历月首的编移量,0对应初一   
            ob.Ldc = this.rmc[ob.Ldi];      //农历日名称   
            ob.cur_dz = ob.d0-this.ZQ[0];   //距冬至的天数   
            ob.cur_xz = ob.d0-this.ZQ[6];   //距夏至的天数   
            ob.cur_lq = ob.d0-this.ZQ.liqiu;//距立秋的天数   
            ob.cur_mz = ob.d0-this.ZQ.mangzhong;//距芒种的天数   
            ob.cur_xs = ob.d0-this.ZQ.xiaoshu;  //距小暑的天数   
            if(ob.cur_dz>180) ob.cur_dz = ob.d0-this.ZQ[12];   
            if(i||ob.d0==Bd0){ //月的信息   
                ob.Lmc  = this.ym[j]; //月名称   
                ob.Ldn  = this.dx[j]; //月大小   
                ob.Lleap= this.nu[j]; //闰状况   
                ob.Lmc2 = j<13?this.ym[j+1]:"未知"; //下个月名称,判断除夕时要用到   
            }else{   
                ob2=this.lun[i-1];   
                ob.Lmc  = ob2.Lmc,   ob.Ldn  = ob2.Ldn;   
                ob.Lleap= ob2.Lleap, ob.Lmc2 = ob2.Lmc2;   
            }   
            ob.yxmc = ob.yxjd = ob.yxsj ='';//月相名称,月相时刻(儒略日),月相时间串   
            ob.jqmc = ob.jqjd = ob.jqsj ='';//节气名称,节气时刻(儒略日),节气时间串   
   
            //干去纪年处理   
            //以下被注释的两行以正正月初一定年首   
            //D = (j+10)%12; //月顺序号,正月为0   
            //D = (ob.d0 - D*29.5) + 365.25*16-35; //该年春节与1984年平均春节(立春附近)相差天数估计   
            D = this.ZQ.lichun + (ob.d0<this.ZQ.lichun?-365:0) + 365.25*16-35; //以立春为界定纪年   
            ob.Lyear =  Math.floor(D/365.2422+0.5); //农历纪年(10进制,1984年起算)   
            D = ob.Lyear +9000;   
            ob.Lyear2 = this.Gan[D%10]+this.Zhi[D%12]; //干支纪年   
   
   
            //纪月处理,1998年12月7(大雪)开始连续进行节气计数,0为甲子   
            if(ob.d0<Djq1)      ob.Lmonth = jqFirst-1; //ob.Lmonth是该日到大雪(往前算)的准确节气月数   
            else if(ob.d0<Djq2) ob.Lmonth = jqFirst;   
            else                ob.Lmonth = jqFirst+1;   
   
            D = (ob.d0 - ob.Lmonth*15.2)+24+365; //今年子月相对1998年12月7(大雪)天数估计   
            D = Math.floor(D/365.2422+0.4)*12 + ob.Lmonth +90000;   
            ob.Lmonth2 = this.Gan[D%10]+this.Zhi[D%12];   
   
            //纪日,2000年1月7日起算   
            D = (ob.d0 - 6 + 9000000)%60;   
            ob.Lday2 = this.Gan[D%10]+this.Zhi[D%12];   
   
            //纪时,2000年1月2日起算   
            D = (ob.d0 - 1)*12 + 90000000;   
            for(k=0,c='';k<12;k++){   
                w = (k*2+23)%24; if(w<10) w='0'+w; c+=w+'-';   
                w =  k*2+1;      if(w<10) w='0'+w; c+=w;   
                c += this.Gan[(D+k)%10]+this.Zhi[(D+k)%12]+'时 ';   
                if(k%3==2) c+='<br>';   
            }   
            ob.Ltime2=c;   
   
            //节日   
            this.getDayName(ob);   
   
            //星座   
            j = Math.floor( (ob.d0-this.ZQ[0])/31 );  if( j<13 && ob.d0>=this.ZQ[j+1] ) j++; //星座所在月的序数,(如果j=13,ob.d0不会超过第14号中气)   
            ob.XiZ = this.XiZ[(j+12)%12]+'座';   
            //回历   
            this.getHuiLi(ob);   
        }   
   
        //以下是月相与节气的处理   
        if(!sw) return;   
        var d,xn, jd2= Bd0+JD.deltatT2(Bd0)-8/24;   
        //月相查找   
        w = XL.MS_aLon( (jd2+3)/36525,10,3 );   
        w -= mod2(w,Math.PI/2);   
        do {   
            d = this.t2BJ( XL.MS_aLon_t(w) );   
            D = int2(d+0.5);   
            xn= int2((w%pi2)/pi2*4+4.01)%4; //取得月相序号   
            w += pi2/4;   
            if(D>=Bd0+Bdn) break;   
            if(D<Bd0) continue;   
            ob = this.lun[D-Bd0];   
            ob.yxmc = this.yxmc[xn]; //取得月相名称   
            ob.yxjd = d;   
            ob.yxsj = JD.timeStr(d);   
        } while(D+5<Bd0+Bdn);   
   
        //节气查找   
        w = XL.S_aLon( (jd2+6)/36525, 3 );   
        w -= mod2(w,pi2/24);   
        do {   
            d = this.t2BJ( XL.S_aLon_t(w) );   
            D = int2(d+0.5);   
            xn= int2((w%pi2)/pi2*24+24.01+6)%24; //取得节气序号   
            w += pi2/24;   
            if(D>=Bd0+Bdn) break;   
            if(D<Bd0) continue;   
            ob = this.lun[D-Bd0];   
            ob.jqmc = this.jqmc[xn]; //取得节气名称   
            ob.jqjd = d;   
            ob.jqsj = JD.timeStr(d);   
        } while(D+12<Bd0+Bdn);   
    },   
   
    getHuiLi:function(ob){ //回历计算   
        //以下算法使用Excel测试得到,测试时主要关心年临界与月临界   
        var z,y,m,d;   
        d = ob.d0 + 503105;       z = int2((d+0.1)/10631);   //10631为一周期(30年)   
        d -= z*10631;             y = int2((d+0.5)/354.366); //加0.5的作用是保证闰年正确(一周中的闰年是第2,5,7,10,13,16,18,21,24,26,29年)   
        d -= int2(y*354.366+0.5); m = int2((d+0.11)/29.51);  //分子加0.11,分每加0.01的作用是第354或355天的的月分保持为12月(m=11)   
        d -= int2(m*29.51+0.5);   
        ob.Hyear = z*30+y+1;   
        ob.Hmonth= m+1;   
        ob.Hday  = d+1;   
    },   
    sFtv:new Array( //国历节日 #表示放假日,I表示重要节日或纪念日   
     new Array('01#元旦'),//1月   
     new Array('02I世界湿地日','10 国际气象节','14I情人节'),//2月   
     new Array('01 国际海豹日','03 全国爱耳日','05 1963-9999学雷锋纪念日','08I妇女节','12I植树节/ 1925-9999孙中山逝世纪念日','14 国际警察日', //3月   
      '15I1983-9999消费者权益日','17 中国国医节/ 国际航海日','21 世界森林日/ 消除种族歧视国际日/ 世界儿歌日','22I世界水日',   
      '23I世界气象日','24 1982-9999世界防治结核病日','25 全国中小学生安全教育日','30 巴勒斯坦国土日'),   
   
     new Array('01I1564-9999愚人节/ 全国爱国卫生运动月(四月)/ 税收宣传月(四月)','07I世界卫生日','22I世界地球日','23 世界图书和版权日','24 亚非新闻工作者日'),//4月   
     new Array('01#1889-9999劳动节','04I青年节','05 碘缺乏病防治日','08 世界红十字日','12I国际护士节','15I国际家庭日','17 国际电信日','18 国际博物馆日','20 全国学生营养日','23 国际牛奶日','31I世界无烟日'),  //5月   
     new Array('01I1925-9999国际儿童节','05 世界环境保护日','06 全国爱眼日','17 防治荒漠化和干旱日','23 国际奥林匹克日','25 全国土地日','26I国际禁毒日'),//6月   
     new Array('01I1997-9999香港回归纪念日/I1921-9999中共诞辰 世界建筑日','02 国际体育记者日','07I1937-9999抗日战争纪念日','11I世界人口日','30 非洲妇女日'),//7月   
     new Array('01I1927-9999建军节','08 中国男子节(爸爸节)','15I1945-9999抗日战争胜利纪念'),//8月   
     new Array('08 1966-9999国际扫盲日 国际新闻工作者日','09 毛泽东逝世纪念','10I中国教师节', '14 世界清洁地球日','16 国际臭氧层保护日','18I九·一八事变纪念日','20 国际爱牙日','27 世界旅游日','28I孔子诞辰'),//9月   
     new Array('01#1949-9999国庆节/ 世界音乐日/ 国际老人节','02#1949-9999国庆节假日/ 国际和平与民主自由斗争日','03#1949-9999国庆节假日','04 世界动物日','06 老人节', //10月   
      '08 全国高血压日/ 世界视觉日','09 世界邮政日/ 万国邮联日','10I辛亥革命纪念日/ 世界精神卫生日','13 世界保健日/ 国际教师节',   
      '14 世界标准日','15 国际盲人节(白手杖节)','16 世界粮食日','17 世界消除贫困日','22 世界传统医药日','24 联合国日','31 世界勤俭日'),   
   
     new Array('07 1917-9999十月社会主义革命纪念日','08 中国记者日','09 全国消防安全宣传教育日','10 世界青年节','11 国际科学与和平周(本日所属的一周)','12 孙中山诞辰纪念日','14 世界糖尿病日','17 国际大学生节/ 世界学生节','20 彝族年','21 彝族年/ 世界问候日/ 世界电视日','22 彝族年','29 国际声援巴勒斯坦人民国际日'), //11月   
     new Array('01I1988-9999世界艾滋病日','03 世界残疾人日','05 国际经济和社会发展志愿人员日','08 国际儿童电视日','09 世界足球日','10 世界人权日','12I西安事变纪念日','13I南京大屠杀(1937年)纪念日','20 澳门回归纪念','21 国际篮球日','24I平安夜','25I圣诞节','26 毛泽东诞辰纪念')//12月   
    ),   
   
    wFtv:new Array( //某月的第几个星期几   
     '0150I世界麻风日', //一月的最后一个星期日（月倒数第一个星期日）   
     '0520 国际母亲节',   
     '0530I全国助残日',   
     '0630 父亲节',   
     '0730 被奴役国家周',   
     '0932I国际和平日',   
     '0940 国际聋人节 世界儿童日',   
     '0950I世界海事日',   
     '1011 国际住房日',   
     '1013I国际减轻自然灾害日(减灾日)',   
     '1144I感恩节'   
    ),   
   
    getDayName:function(r){ //取某日节日   
        var m0=(r.m<10?'0':'')+r.m;   
        var d0=(r.d<10?'0':'')+r.d;   
        var i,j,s,s2,type;   
   
        r.A = r.B = r.C = ''; r.Fjia = 0;   
        if(r.week==0||r.week==6) r.Fjia = 1; //星期日或星期六放假   
        //按农历日期查找重量点节假日   
        if(r.Lmc=='正' && r.Lleap!='闰'){ //取农历节日名称(放假)   
            if(r.Ldc=='初一') r.A += '春节 ',     r.Fjia = 1;   
            if(r.Ldc=='初二') r.B += '大年初二 ', r.Fjia = 1;   
            if(r.Ldc=='初三') r.B += '大年初三 ', r.Fjia = 1;   
        }   
        if(r.Lmc=='五' && r.Ldc=='初五' && r.Lleap!='闰') r.A += '端午节 ', r.Fjia = 1;   
        if(r.Lmc=='八' && r.Ldc=='十五' && r.Lleap!='闰') r.A += '中秋节 ', r.Fjia = 1;   
   
        //按农历日期查找主要节假日   
        if(r.Lmc=='正'  && r.Ldc=='十五' && r.Lleap!='闰') r.A += '元宵节 ';   
        if(r.Lmc=='七'  && r.Ldc=='初七' && r.Lleap!='闰') r.B += '七夕情人节 ';   
        if(r.Lmc=='七'  && r.Ldc=='十五' && r.Lleap!='闰') r.B += '七月半(鬼节) ';   
        if(r.Lmc=='九'  && r.Ldc=='初九' && r.Lleap!='闰') r.B += '重阳节 ';   
        if(r.Lmc=='十二'&& r.Ldc=='初八' && r.Lleap!='闰') r.B += '腊八节 ';   
        if(r.Lmc=='十二'&& r.Lmc2=="正"){   
            if(r.Ldc=="三十" && r.Ldn==30) r.B += '除夕 ';   
            if(r.Ldc=="廿九" && r.Ldn==29) r.B += '除夕 ';   
            if(r.Ldc=="廿三") r.B += '小年';   
        }   
   
        //按公历日期查找   
        for(i=0;i<this.sFtv[r.m-1].length;i++){ //公历节日或纪念日   
            s=this.sFtv[r.m-1][i];   
            if(s.substr(0,2)!=d0) continue;   
            s = s.substr(2,s.length-2);   
            s = s.split('/');   
            for(j=0;j<s.length;j++){ //遍历该日的节日名称   
                s2 = s[j];   
                type=s2.substr(0,1);   
                if(s2.substr(5,1)=='-'){ //有年限的   
                    if( r.y<(s2.substr(1,4)-0) || r.y>(s2.substr(6,4)-0) ) continue;   
                    s2 = s2.substr(10,s2.length-10);   
                } else {   
                    if(r.y<1850) continue;   
                    s2 = s2.substr(1,s2.length-1);   
                }   
                if(type=='#') r.A += s2 + ' ', r.Fjia = 1; //放假的节日   
                if(type=='I') r.B += s2 + ' '; //主要   
                if(type==' ') r.C += s2 + ' '; //其它   
            }   
            break;   
        }   
   
        //按周查找   
        var w = m0 + (r.weeki+1) + r.week; //d日在本月的周数及星期   
   
        for(i=0;i<this.wFtv.length;i++){   
            s=this.wFtv[i];   
            s2=s.substr(0,4); if(s2.substr(2,1)=='5') s2 = s2.substr(0,2)+r.weekN+s2.substr(3,1); //如果是5,则转为本月最后一周   
            if(s2!=w) continue;   
            type=s.substr(4,1);   
            s = s.substr(5,s.length-5);   
            if(type=='#') r.A += s + ' ', r.Fjia = 1;   
            if(type=='I') r.B += s + ' ';   
            if(type==' ') r.C += s + ' ';   
        }   
   
        //农历特殊日子   
        if(r.cur_dz==0)  r.B += '冬至';   
        if(r.cur_dz>=0&&r.cur_dz<81){ //数九   
            w = this.Weeks[Math.floor(r.cur_dz/9)+1];   
            if(r.cur_dz%9==0) r.B += '『'+ w +'九』 '   
            else r.C += w + '九第'+(r.cur_dz%9+1)+'天 ';   
        }   
   
        w = r.Lday2.substr(0,1);   
        w2= r.Lday2.substr(1,1);   
        if(r.cur_xz>20 && r.cur_xz<=30 && w=='庚') r.B='初伏 ';   
        if(r.cur_xz>30 && r.cur_xz<=40 && w=='庚') r.B='中伏 ';   
        if(r.cur_lq>0  && r.cur_lq<=10 && w=='庚') r.B='末伏 ';   
        if(r.cur_mz>0  && r.cur_mz<=10 && w=='丙') r.B='入梅 ';   
        if(r.cur_xs>0  && r.cur_xs<=12 &&w2=='未') r.B='出梅 ';   
    }   
};  

exports.Lunar = Lunar;


},{}],10:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", { value: true });
var ganzhi_1 = require("./base/ganzhi");
var common_1 = require("./base/common");
var index_1 = require("./index");
function init(dict, conf) {
    if (!!dict['\\nayin']) return;
    dict['\\nayin'] = index_1.DictYiXue['\\nayin'];
    dict['\\yao'] = index_1.DictYiXue['\\yao'];
    dict['\\paigua'] = index_1.DictYiXue['\\paigua'];
    dict['\\guayao'] = index_1.DictYiXue['\\guayao'];
    dict['\\gua64'] = index_1.DictYiXue['\\gua64'];
    dict['\\paibazi'] = index_1.DictYiXue['\\paibazi'];
    dict['\\bazi'] = index_1.DictYiXue['\\bazi'];
    dict['\\timegz'] = index_1.DictYiXue['\\timegz'];
    var fontsizeNumber = conf["字体大小"] || 5;
    index_1.globalSetting["size"] = index_1.globalSetting["sizeDict"][fontsizeNumber.toString()];
    index_1.globalSetting["shuitu"] = conf["水土共长生"] || index_1.globalSetting["shuitu"];
    index_1.globalSetting["huahe"] = conf["华鹤八字正偏财"] || index_1.globalSetting["huahe"];
    index_1.globalSetting["shortname"] = conf["开启短名"] || index_1.globalSetting["shortname"];
    ganzhi_1.ConfigGanZhi.ChangSheng = index_1.globalSetting["shuitu"];
    ganzhi_1.ConfigGanZhi.Huahe = index_1.globalSetting["huahe"];
    common_1.LatexHelp.COLOR = conf["Katex"] == true ? "textcolor" : common_1.LatexHelp.COLOR;
    console.log("\u6613\u5B66\u51FD\u6570\u5E93 \nVersion: " + common_1.LatexHelp.Version);
}
//init(dictYiXue, settingYixue)
document.onreadystatechange = function () {
    /* if(document.readyState == "interactive"){
        init(dictYiXue, settingYixue)
    } */
    console.log('onreadystatechange');
    init(dictYiXue, settingYixue);
};

},{"./base/common":2,"./base/ganzhi":3,"./index":8}]},{},[10]);
