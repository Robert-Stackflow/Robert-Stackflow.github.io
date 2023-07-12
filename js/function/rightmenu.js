cloudchewieFn.day_night_count = 0;
cloudchewieFn.isReadMode = false;
// 右键菜单事件
document.onkeydown = function (event) {
  event = event || window.event;
  if (event.keyCode == 17) {
    return;
  }
};

function popupMenu() {
  bindRightMenu(true);
}
if (
  !navigator.userAgent.match(
    /(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i
  )
) {
  popupMenu();
}
function bindRightMenu(enable, tip) {
  if (enable && document.body.clientWidth > 900) {
    if (tip)
      btf.snackbarShow(
        "已启用自定义右键菜单,可使用Ctrl+右键单击呼出默认右键菜单"
      );
    window.oncontextmenu = function (event) {
      if (event.ctrlKey || document.body.clientWidth < 900) return true;
      //隐藏所有菜单项
      document.querySelectorAll(".rightMenu-line").forEach((item) => {
        $(item).hide();
      });
      //如果有文字选中，则显示文字选中相关的菜单项
      if (document.getSelection().toString()) {
        $("#menu-text").show();
      }
      //如果是文章，则显示文章相关的菜单项
      if (document.getElementById("post")) {
        $("#menu-post").show();
        $("#menu-other").show();
      }
      $("#menu-global").show();
      var el = window.document.body;
      el = event.target;
      var a =
        /^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/;
      //如果是链接，则显示链接相关的菜单项
      if (el.tagName == "A") {
        $("#menu-to").show();
        cloudchewieFn.open = function () {
          location.href = el.href;
        };
        cloudchewieFn.openWithNewTab = function () {
          window.open(el.href);
          // window.location.reload();
        };
        cloudchewieFn.copyLink = function () {
          let url = el.href;
          let txa = document.createElement("textarea");
          txa.value = url;
          document.body.appendChild(txa);
          txa.select();
          document.execCommand("Copy");
          document.body.removeChild(txa);
          GLOBAL_CONFIG.Snackbar !== undefined &&
            btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success);
        };
      }
      //如果是图片
      if (el.tagName == "IMG") {
        $("#menu-img").show();
        cloudchewieFn.openWithNewTab = function () {
          window.open(el.src);
        };
        cloudchewieFn.downloadImage = function () {
          el.click();
        };
        cloudchewieFn.click = function () {
          el.click();
        };
        cloudchewieFn.copyLink = function () {
          let url = el.src;
          let txa = document.createElement("textarea");
          txa.value = url;
          document.body.appendChild(txa);
          txa.select();
          document.execCommand("Copy");
          document.body.removeChild(txa);
          GLOBAL_CONFIG.Snackbar !== undefined &&
            btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success);
        };
      } else if (el.tagName == "TEXTAREA" || el.tagName == "INPUT") {
        //如果是输入框/文本框
        $("#menu-paste").show();
        cloudchewieFn.paste = function () {
          navigator.permissions
            .query({
              name: "clipboard-read",
            })
            .then((result) => {
              if (result.state == "granted" || result.state == "prompt") {
                navigator.clipboard.readText().then((text) => {
                  cloudchewieFn.insertAtCursor(el, text);
                });
              } else {
                alert("请允许读取剪贴板！");
              }
            });
        };
      }
      let pageX = event.clientX + 10;
      let pageY = event.clientY;
      let rmWidth = $("#rightMenu").width();
      let rmHeight = $("#rightMenu").height();
      if (pageX + rmWidth > window.innerWidth) {
        pageX -= rmWidth + 10;
      }
      if (pageY + rmHeight > window.innerHeight) {
        pageY -= pageY + rmHeight - window.innerHeight;
      }
      //判断是否只有小菜单，如果是则显示通用菜单项
      var isOnlySmall = true;
      document.querySelectorAll(".rightMenu-line").forEach((item) => {
        if ($(item).css("display") != "none") isOnlySmall = false;
      });
      if (isOnlySmall) $("#menu-general").show();
      //如果是阅读模式，则隐藏所有菜单项
      if (cloudchewieFn.isReadMode)
        document.querySelectorAll(".rightMenu-line").forEach((item) => {
          $(item).hide();
        });
      cloudchewieFn.showRightMenu(true, pageY, pageX);
      return false;
    };
    window.addEventListener("click", function () {
      cloudchewieFn.showRightMenu(false);
    });
  } else {
    window.oncontextmenu = function () {
      return true;
    };
  }
}
const box = document.documentElement;

function addLongtabListener(target, callback) {
  let timer = 0; // 初始化timer

  target.ontouchstart = () => {
    timer = 0; // 重置timer
    timer = setTimeout(() => {
      callback();
      timer = 0;
    }, 380); // 超时器能成功执行，说明是长按
  };

  target.ontouchmove = () => {
    clearTimeout(timer); // 如果来到这里，说明是滑动
    timer = 0;
  };

  target.ontouchend = () => {
    // 到这里如果timer有值，说明此触摸时间不足380ms，是点击
    if (timer) {
      clearTimeout(timer);
    }
  };
}

addLongtabListener(box, popupMenu);
