(function () {
  function install(hook) {
    hook.init(function() {
      // 初始化完成后调用，只调用一次，没有参数。
      /* if(window.screen.width < 400) {
        settingYixue.set.shortname = true;
      } */
      console.log('initall.....')
   });

    hook.doneEach(function() {
      console.log('doneEach.....')
      // 每次路由切换时数据全部加载完成后调用，没有参数。
      // ...
      renderMathInElement(document.body, {
        preProcess: window.yixueRender,
        delimiters: [
          {left: "$$", right: "$$", display: true},
          {left: "\\[", right: "\\]", display: true},
          {left: "$", right: "$", display: false},
          {left: "\\(", right: "\\)", display: false},
          {left: "¥¥", right: "¥¥", display: true},
          {left: "¥", right: "¥", display: false},
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


/* $(document)
    .ready(function() {
      $('.ui.form')
        .form({
          fields: {
            email: {
              identifier  : 'email',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your e-mail'
                },
                {
                  type   : 'email',
                  prompt : 'Please enter a valid e-mail'
                }
              ]
            },
            password: {
              identifier  : 'password',
              rules: [
                {
                  type   : 'empty',
                  prompt : 'Please enter your password'
                },
                {
                  type   : 'length[6]',
                  prompt : 'Your password must be at least 6 characters'
                }
              ]
            }
          }
        })
      ;
    })
  ;

  function myFunction() {
    console.log('login.......')
    var element = document.getElementById("loginForm");
    element.parentNode.removeChild(element);
    window.$docsify.loadSidebar = "_sidebar.md"
    window.$docsify.loadNavbar = "_navbar.md"
    console.log(window.$docsify)
} */


/* <div class="ui middle aligned center aligned grid" id="loginForm" 
    style="background-color: #DADADA;height: 100%;">
    <div class="column" style="max-width: 450px;">
      <h2 class="ui teal image header">
        <img src="./Login Example - Semantic_files/logo.png" class="image">
        <div class="content">
          Log-in to your account
        </div>
      </h2>
      <form class="ui large form">
        <div class="ui stacked segment">
          <div class="field">
            <div class="ui left icon input">
              <i class="user icon"></i>
              <input type="text" name="email" placeholder="E-mail address">
            </div>
          </div>
          <div class="field">
            <div class="ui left icon input">
              <i class="lock icon"></i>
              <input type="password" name="password" placeholder="Password">
            </div>
          </div>
          <div class="ui fluid large teal submit button" onclick="myFunction()">Login</div>
        </div>
  
        <div class="ui error message"></div>
  
      </form>
  
      <div class="ui message">
        New to us? <a href="https://semantic-ui.com/examples/login.html#">Sign Up</a>
      </div>
    </div>
  </div>  */