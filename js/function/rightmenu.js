function insertAtCursor(myField, myValue) {
  //IE 浏览器
  if (document.selection) {
    myField.focus();
    sel = document.selection.createRange();
    sel.text = myValue;
    sel.select();
  }

  //FireFox、Chrome等
  else if (myField.selectionStart || myField.selectionStart == "0") {
    var startPos = myField.selectionStart;
    var endPos = myField.selectionEnd;

    // 保存滚动条
    var restoreTop = myField.scrollTop;
    myField.value =
      myField.value.substring(0, startPos) +
      myValue +
      myField.value.substring(endPos, myField.value.length);

    if (restoreTop > 0) {
      myField.scrollTop = restoreTop;
    }

    myField.focus();
    myField.selectionStart = startPos + myValue.length;
    myField.selectionEnd = startPos + myValue.length;
  } else {
    myField.value += myValue;
    myField.focus();
  }
}
let rmf = {};
rmf.day_night_count = 0;
rmf.isReadMode = false;

rmf.setCookie = function (cname, cvalue, exdays = 365) {
  var d = new Date();
  d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
  var expires = "expires=" + d.toGMTString();
  document.cookie = cname + "=" + cvalue + "; " + expires;
};

//读cookies
rmf.getCookie = function (cname) {
  var name = cname + "=";
  var ca = document.cookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i].trim();
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
};

//删cookies
rmf.delCookie = function (name) {
  var exp = new Date();
  exp.setTime(exp.getTime() - 1);
  var cval = getCookie(name);
  if (cval != null)
    document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
};
rmf.showRightMenu = function (isTrue, x = 0, y = 0) {
  let $rightMenu = $("#rightMenu");
  $rightMenu.css("top", x + "px").css("left", y + "px");

  if (isTrue) {
    $rightMenu.show();
  } else {
    $rightMenu.hide();
  }
};
rmf.switchDarkMode = function () {
  const nowMode =
    document.documentElement.getAttribute("data-theme") === "dark"
      ? "dark"
      : "light";
  let $rightMenu = $("#menus > div.menus_items > div:nth-child(7) > a > span");
  let $rightMenu_mobile = $(
    "#sidebar-menus > div.menus_items > div:nth-child(7) > a > span"
  );
  if (nowMode === "light") {
    // $rightMenu.html("浅色模式")
    // $rightMenu_mobile.html("浅色模式")
    activateDarkMode();
    saveToLocal.set("theme", "dark", 2);
    GLOBAL_CONFIG.Snackbar !== undefined &&
      btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night);
  } else {
    // $rightMenu.html("深色模式")
    // $rightMenu_mobile.html("深色模式")
    activateLightMode();
    saveToLocal.set("theme", "light", 2);
    rmf.day_night_count++;
    GLOBAL_CONFIG.Snackbar !== undefined &&
      btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
  }
  // handle some cases
  typeof utterancesTheme === "function" && utterancesTheme();
  typeof FB === "object" && window.loadFBComment();
  window.DISQUS &&
    document.getElementById("disqus_thread").children.length &&
    setTimeout(() => window.disqusReset(), 200);
};
rmf.copyWordsLink = function () {
  let url = window.location.href;
  let txa = document.createElement("textarea");
  txa.value = url;
  document.body.appendChild(txa);
  txa.select();
  document.execCommand("Copy");
  document.body.removeChild(txa);
  GLOBAL_CONFIG.Snackbar !== undefined &&
    btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success);
};
rmf.switchReadMode = function () {
  const $body = document.body;
  $body.classList.add("read-mode");
  document.getElementById("post").classList.add("read-mode");
  const newEle = document.createElement("button");
  newEle.type = "button";
  newEle.className = "fas fa-sign-out-alt exit-readmode";
  $body.appendChild(newEle);
  $(document.getElementById("post-meta")).hide();
  rmf.isReadMode = true;
  $("#con-readmode").addClass("checked");
  $(".aplayer").hide();
  toggleWinbox();
  let commentBarrage = document.querySelector(".barrageswiper");
  let visible = commentBarrage.getAttribute("display");
  if (commentBarrage && !(visible == null || visible == "none")) {
    $(commentBarrage).fadeToggle();
  }

  function clickFn() {
    $body.classList.remove("read-mode");
    document.getElementById("post").classList.remove("read-mode");
    newEle.remove();
    newEle.removeEventListener("click", clickFn);
    $(".aplayer").show();
    rmf.isReadMode = false;
    $("#con-readmode").removeClass("checked");
    $(document.getElementById("post-meta")).show();
    if (!(visible == null || visible == "none")) {
      $(commentBarrage).fadeToggle();
    }
  }
  newEle.addEventListener("click", clickFn);
};

//复制选中文字
rmf.copySelect = function () {
  document.execCommand("Copy", false, null);
  GLOBAL_CONFIG.Snackbar !== undefined &&
    btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success);
};

//回到顶部
rmf.scrollToTop = function () {
  btf.scrollToDest(0, 500);
};
rmf.translate = function () {
  document.getElementById("con-translate").click();
};
rmf.hideAsideBtn = function () {
  // Hide aside
  const $htmlDom = document.documentElement.classList;
  $htmlDom.contains("hide-aside")
    ? saveToLocal.set("enableAside", "show", 2)
    : saveToLocal.set("enableAside", "hide", 2);
  $htmlDom.toggle("hide-aside");
  if (saveToLocal.get("enableAside") == "hide")
    $("#con-toggleaside").addClass("checked");
  else $("#con-toggleaside").removeClass("checked");
};
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
        rmf.open = function () {
          location.href = el.href;
        };
        rmf.openWithNewTab = function () {
          window.open(el.href);
          // window.location.reload();
        };
        rmf.copyLink = function () {
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
        rmf.openWithNewTab = function () {
          window.open(el.src);
        };
        rmf.downloadImage = function () {
          el.click();
        };
        rmf.click = function () {
          el.click();
        };
        rmf.copyLink = function () {
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
        rmf.paste = function () {
          navigator.permissions
            .query({
              name: "clipboard-read",
            })
            .then((result) => {
              if (result.state == "granted" || result.state == "prompt") {
                //读取剪贴板
                navigator.clipboard.readText().then((text) => {
                  insertAtCursor(el, text);
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
      if (rmf.isReadMode)
        document.querySelectorAll(".rightMenu-line").forEach((item) => {
          $(item).hide();
        });
      rmf.showRightMenu(true, pageY, pageX);
      return false;
    };
    window.addEventListener("click", function () {
      rmf.showRightMenu(false);
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
