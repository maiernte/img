var dictYiXue = {}

var settingYixue = {
  "字体大小": 5, // 字体大小 1~9 数字越大字体越大
  "水土共长生": true, // 是否水土共长生
  "华鹤八字正偏财": true,  // 是否使用华鹤偏财
  "开启短名": false, // 是否使用短名，如“偏财”->“才”
  "Katex": false
}

MathJax.Hub.Register.StartupHook("TeX Jax Ready",function () { 
  MathJax.InputJax.TeX.prefilterHooks.Add(function (data) {  
    var pattern = /^(\\[a-zA-Z0-9]+)\{/
    var macro = data.math.match(pattern)
    var key = macro ? macro[1] : ""
    var func = dictYiXue[key]
    if(func){
      data.math = func(data.math)
    }
  }); 
});