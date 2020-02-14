var dictYiXue = {}
   
var settingYixue = {
  "字体大小": 5, // 字体大小 1~9 数字越大字体越大
  "水土共长生": true, // 是否水土共长生
  "华鹤八字正偏财": true,  // 是否使用华鹤偏财
  "开启短名": false, // 是否使用短名，如“偏财”->“才”
  "Katex": true
}

function yixue(math){
  var pattern = /(?<express>\\[a-zA-Z0-9]+)\{/
  var macro = math.match(pattern)
  var key = macro ? macro.groups["express"] : ""
  var func = dictYiXue[key]
  if(func){
    return func(math)
  }else{
    return math
  }
}

document.addEventListener("DOMContentLoaded", function() {
  renderMathInElement(document.body, {
  preProcess: yixue,
  delimiters: [
    {left: "$$", right: "$$", display: true},
    {left: "\\[", right: "\\]", display: true},
    {left: "$", right: "$", display: false},
    {left: "\\(", right: "\\)", display: false}
  ]
  });
});