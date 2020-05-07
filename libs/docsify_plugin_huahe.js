var dictYiXue = {}
var settingYixue = {
    "字体大小": 3, // 字体大小 1~9 数字越大字体越大
    "水土共长生": true, // 是否水土共长生
    "华鹤八字正偏财": true,  // 是否使用华鹤偏财
    "开启短名": false, // 是否使用短名，如“偏财”->“才”
    "Katex": true
};

(function () {
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

  function install(hook) {
    hook.init(function() {
      // 初始化完成后调用，只调用一次，没有参数。
   });

    hook.doneEach(function() {
      // 每次路由切换时数据全部加载完成后调用，没有参数。
      // ...
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
  }

  $docsify.plugins = [].concat(install, $docsify.plugins);
}());

/* 参考代码 Katex https://github.com/upupming/docsify-katex/blob/master/src/index.js */

/* window.$docsify = {
  plugins: [
    function(hook, vm) {
      hook.init(function() {
         // 初始化完成后调用，只调用一次，没有参数。
         console.log('init')
      });

      hook.beforeEach(function(content) {
        // 每次开始解析 Markdown 内容时调用
        // ...
        return content;
      });

      hook.afterEach(function(html, next) {
        // 解析成 html 后调用。
        // beforeEach 和 afterEach 支持处理异步逻辑
        // ...
        // 异步处理完成后调用 next(html) 返回结果
        console.log('after html')
        next(html);
      });

      hook.doneEach(function() {
        // 每次路由切换时数据全部加载完成后调用，没有参数。
        // ...
        console.log('doneEach')
      });

      hook.mounted(function() {
        // 初始化并第一次加载完成数据后调用，只触发一次，没有参数。
      });

      hook.ready(function() {
        // 初始化并第一次加载完成数据后调用，没有参数。
      });
    }
  ]
}; */