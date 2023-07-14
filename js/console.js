const consoleFn = {
  setDefaultThemeColor: (mode) => {
    let lightTheme = `:root {  --global-font-size: 14px;  --theme-color: #3B70FC; --font-color: #4c4948;  --hr-border: #d2ebfd;  --hr-before-color: #bfe4fb;  --search-bg: #f6f8fa;  --search-input-color: #4c4948;  --search-result-title: #4c4948;  --preloader-bg: #37474f;  --preloader-color: #fff;  --tab-border-color: #f0f0f0;  --tab-botton-bg: #f0f0f0;  --tab-botton-color: #1f2d3d;  --tab-button-hover-bg: #dcdcdc;  --tab-button-active-bg: #fff;  --card-bg: #fff;  --sidebar-bg: #f6f8fa;  --btn-hover-color: #24b1ff;  --btn-color: #fff;  --btn-bg: #3B70FC;  --text-bg-hover: rgba(0,153,255,0.7);  --light-grey: #eee;  --dark-grey: #cacaca;  --white: #fff;  --text-highlight-color: #1f2d3d;  --blockquote-color: #6a737d;  --blockquote-bg: rgba(0,153,255,0.1);  --reward-pop: #f5f5f5;  --toc-link-color: #666261;  --card-border: 1px solid var(--tab-botton-bg);  --card-box-shadow: 0 0px 0px 0px rgba(45,45,45,0.05);  --card-box-shadow-olded: 0 8px 12px -3px rgba(45,45,45,0.05);  --card-hover-box-shadow: 0 8px 12px -3px rgba(45,45,45,0.05);  --card-border-dashed: 2px dashed var(--tab-button-hover-bg);  --pseudo-hover: #24b1ff;  --headline-presudo: #a0a0a0;}`;
    let darkTheme = `[data-theme='dark'] {  --global-bg: #0d0d0d;  --font-color: rgba(255,255,255,0.7);  --hr-border: rgba(255,255,255,0.4);  --hr-before-color: rgba(255,255,255,0.7);  --search-bg: #121212;  --search-input-color: rgba(255,255,255,0.7);  --search-result-title: rgba(255,255,255,0.9);  --preloader-bg: #0d0d0d;  --preloader-color: rgba(255,255,255,0.7);  --tab-border-color: #2c2c2c;  --tab-botton-bg: #2c2c2c;  --tab-botton-color: rgba(255,255,255,0.7);  --tab-button-hover-bg: #383838;  --tab-button-active-bg: #121212;  --card-bg: #121212;  --sidebar-bg: #121212;  --btn-hover-color: #787878;  --btn-color: rgba(255,255,255,0.7);  --btn-bg: #1f1f1f;  --text-bg-hover: #383838;  --light-grey: rgba(255,255,255,0.7);  --dark-grey: rgba(255,255,255,0.2);  --white: rgba(255,255,255,0.9);  --text-highlight-color: rgba(255,255,255,0.9);  --blockquote-color: rgba(255,255,255,0.7);  --blockquote-bg: #2c2c2c;  --reward-pop: #2c2c2c;  --toc-link-color: rgba(255,255,255,0.6);  --hl-color: rgba(255,255,255,0.7);  --hl-bg: #171717;  --hltools-bg: #1a1a1a;  --hltools-color: #90a4ae;  --hlnumber-bg: #171717;  --hlnumber-color: rgba(255,255,255,0.4);  --hlscrollbar-bg: #1f1f1f;  --hlexpand-bg: linear-gradient(180deg, rgba(23,23,23,0.6), rgba(23,23,23,0.9)); --timeline-bg: #1f1f1f;}`;
    switch (mode) {
      case 1:
        document.getElementById("themeColor").innerText = lightTheme;
        break;
      case 2:
        document.getElementById("themeColor").innerText = darkTheme;
        break;
      default:
        document.getElementById("themeColor").innerText =
          lightTheme + darkTheme;
    }
  },
  setThemeColor: (r, g, b) => {
    document.getElementById(
      "themeColor"
    ).innerText = `:root{--theme-color:rgb(${r}, ${g}, ${b})!important;--btn-bg:rgb(${r}, ${g}, ${b})!important;--btn-hover-color:rgba(${r}, ${g}, ${b},0.7)!important;--text-bg-hover:rgba(${r}, ${g}, ${b},0.7)!important;--km-toc-active:rgba(${r}, ${g}, ${b},0.7)!important;--km-toc-hover:rgba(${r}, ${g}, ${b},0.6)!important;}`;
  },
  toggleConsole: () => {
    $("#settingWindow").fadeToggle("fast");
    $("#console-mask").fadeToggle("fast");
    if ($("#settingWindow").css("display") != "none")
      $("#settingWindow").css("display", "flex");
  },
  showConsole: () => {
    $("#settingWindow").fadeIn("fast");
    $("#console-mask").fadeIn("fast");
    if ($("#settingWindow").css("display") != "none")
      $("#settingWindow").css("display", "flex");
  },
  closeConsole: () => {
    $("#settingWindow").fadeOut("fast");
    $("#console-mask").fadeOut("fast");
    if ($("#settingWindow").css("display") != "none")
      $("#settingWindow").css("display", "flex");
  },
  //重置设置
  resetSettings: () => {
    btf.removeData("blogBackground");
    btf.removeData("enableStarBackground");
    btf.removeData("isLeftAside");
    btf.removeData("enableRightSide");
    btf.removeData("enableAutoTheme");
    btf.removeData("enableFixedNav");
    btf.removeData("enableAutoColor");
    btf.removeData("enableContextMenu");
    btf.removeData("enableAPlayer");
    window.location.reload();
  },
  //设置为默认背景
  setDefaultBackground: () => {
    btf.removeData("blogBackground");
    window.location.reload();
  },
  // 切换背景
  changeBackground: (s, flag) => {
    let bg = document.getElementById("web_bg");
    if (s.charAt(0) == "#") {
      bg.style.backgroundColor = s;
      bg.style.background = "none";
    } else bg.style.background = s;
    if (!flag) {
      btf.saveData("blogBackground", s);
    }
  },
  // 切换繁星效果
  toggleStarBackground: () => {
    if (btf.loadData("enableStarBackground") == "true") {
      btf.saveData("enableStarBackground", "false");
      $("#universe").hide();
    } else {
      btf.saveData("enableStarBackground", "true");
      $("#universe").show();
    }
  },
  // 切换歌单
  changeAPlayerList: (id, server, reload = true) => {
    if (window.aplayers)
      for (let i = 0; i < window.aplayers.length; i++)
        window.aplayers[i].pause();
    btf.saveData("playlist", JSON.stringify({ id: id, server: server }));
    $("meting-js").attr("id", id);
    $("meting-js").attr("server", server);
    if (reload) cloudchewieFn.changeMusicList(server, id);
  },
  // 切换全屏
  toggleFullScreen: () => {
    if (cloudchewieFn.isFullScreen()) {
      document.exitFullscreen();
      $("#con-fullscreen").removeClass("checked");
    } else {
      document.documentElement.requestFullscreen();
      $("#con-fullscreen").addClass("checked");
    }
  },
  // 切换单双栏
  toggleAside: () => {
    const $htmlDom = document.documentElement.classList;
    $htmlDom.contains("hide-aside")
      ? saveToLocal.set("enableAside", "show", 2)
      : saveToLocal.set("enableAside", "hide", 2);
    $htmlDom.toggle("hide-aside");
    if (btf.loadData("enableAside") == "hide")
      $("#con-toggleaside").addClass("checked");
    else $("#con-toggleaside").removeClass("checked");
  },
  //控制侧栏位置
  switchAside: () => {
    if (left) {
      $("#aside-content").addClass("right");
      $(".layout > div:first-child").addClass("left");
      btf.saveData("isLeftAside", "false");
    } else {
      $("aside-content").className = "aside-content";
      $(".layout > div:first-child").className = "";
      if ($("#recent-posts") != null)
        $("#recent-posts").className = "recent-posts";
      btf.saveData("isLeftAside", "true");
    }
    left = !left;
  },
  // 切换右侧边栏
  toggleRightSide: () => {
    if (btf.loadData("enableRightSide") == "true") {
      btf.saveData("enableRightSide", "false");
      $("#rightside").hide();
    } else {
      btf.saveData("enableRightSide", "true");
      $("#rightside").show();
    }
  },
  // 设置深浅色跟随系统模式
  toggleAutoTheme: () => {
    if (btf.loadData("enableAutoTheme") == "true") {
      btf.saveData("enableAutoTheme", "false");
      $("#con-mode,.rightMenu-item:has(.fa-adjust)").show();
    } else {
      btf.saveData("enableAutoTheme", "true");
      var time = new Date();
      if (time.getHours() <= 7 || time.getHours() >= 19) {
        activateDarkMode();
        localStorage.removeItem("theme");
      } else {
        activateLightMode();
        localStorage.removeItem("theme");
      }
      $("#con-mode,.rightMenu-item:has(.fa-adjust)").hide();
    }
  },
  // 切换固定导航栏
  toggleFixedNav: () => {
    if (btf.loadData("enableFixedNav") == "false") {
      btf.saveData("enableFixedNav", "true");
      $("#page-header").addClass("nav-fixed nav-visible");
      $("#name-container").show();
    } else {
      btf.saveData("enableFixedNav", "false");
      $("#page-header").removeClass("nav-fixed nav-visible");
      $("#name-container").hide();
    }
  },
  // 切换自动主题色
  toggleAutoColor: () => {
    if (btf.loadData("enableAutoColor") == "true")
      btf.saveData("enableAutoColor", "false");
    else btf.saveData("enableAutoColor", "true");
    changeAutoColor(false);
  },
  // 切换右键菜单
  toggleContextMenu: () => {
    if (btf.loadData("enableContextMenu") == "true") {
      btf.saveData("enableContextMenu", "false");
      $("#con-rightmouse").removeClass("checked");
      bindRightMenu(false, true);
    } else {
      btf.saveData("enableContextMenu", "true");
      $("#con-rightmouse").addClass("checked");
      bindRightMenu(true, true);
    }
  },
  // 切换APlayer
  toggleAPlayer: () => {
    const navMusic = $("#nav-music");
    if (navMusic == null || navMusic.find("meting-js") == null) return;
    const navMetingAplayer = navMusic.find("meting-js").aplayer;
    if (btf.loadData("enableAPlayer") == "true") {
      btf.saveData("enableAPlayer", "false");
      navMusic.hide();
      $("#con-music").hide();
      $("#menu-music-toggle").hide();
      $(".music-wrapper .aplayer").show();
      if (navMetingAplayer) {
        navMetingAplayer.pause();
      }
    } else {
      btf.saveData("enableAPlayer", "true");
      $("#con-music").show();
      $("#menu-music-toggle").show();
      if ("/music/" != location.pathname) {
        navMusic.show();
      } else {
        navMusic.hide();
      }
    }
  },
  // 解析歌单链接
  resolveUrl: () => {
    var id;
    var server;
    var url = document.getElementById("url-input").value;
    if (url == "") return;
    if (!isNaN(url)) id = url;
    if (url.indexOf("music.163.com/#/playlist?id=") != -1) {
      id = url.split("id=")[1].replace("/", "");
      server = "netease";
    } else if (url.indexOf("y.qq.com/n/ryqq/playlist/") != -1) {
      id = url.split("playlist/")[1].replace("/", "");
      server = "tencent";
    } else if (url.indexOf("https://www.kugou.com/songlist/") != -1) {
      id = url.split("songlist/")[1].replace("/", "");
      server = "kugou";
    } else if (url.indexOf("https://music.91q.com/songlist/") != -1) {
      id = url.split("songlist/")[1].replace("/", "");
      server = "baidu";
    } else {
      $("#url-btn").html("解析失败");
      $("#url-btn").removeClass("success");
      $("#url-btn").addClass("fail");
      return;
    }
    var t =
      "https://api.i-meto.com/meting/api?server=" +
      server +
      "&type=playlist&id=" +
      id;
    var o = new XMLHttpRequest();
    (o.onreadystatechange = () => {
      if (
        4 === o.readyState &&
        ((o.status >= 200 && o.status < 300) || 304 === o.status)
      ) {
        if (JSON.parse(o.responseText).length != 0) {
          $("#url-btn").html("解析成功");
          $("#url-btn").addClass("success");
          $("#url-btn").removeClass("fail");
          consoleFn.changeAPlayerList(id, server, true);
        } else {
          $("#url-btn").html("解析失败");
          $("#url-btn").removeClass("success");
          $("#url-btn").addClass("fail");
        }
      }
    }),
      o.open("get", t, !0),
      o.send(null);
  },
};
// 加载设置
const loadSetting = () => {
  $("#backer").hide();
  $(".asetting").hide();
  $("#settingWindow").hide();
  //取消模糊效果
  document.getElementById("settingStyle").innerText = `
  *,*:not(.card-info)::before,*::after{
      -webkit-backdrop-filter: none!important;
      backdrop-filter: none!important;
      -webkit-filter: none!important;
      filter: none!important;
  }`;
  //加载是否适应文章封面颜色
  if (btf.loadData("enableAutoColor") == undefined) {
    btf.saveData("enableAutoColor", "false");
  }
  if (btf.loadData("enableAutoColor") == "true") {
    document.getElementById("con-toggleAutoColor").checked = true;
    if (GLOBAL_CONFIG_SITE.isPost) {
      changeAutoColor(true);
    }
  }
  if (!GLOBAL_CONFIG_SITE.isPost) {
    consoleFn.setDefaultThemeColor(3);
  }
  //固定导航栏
  if (btf.loadData("enableFixedNav") == undefined) {
    btf.saveData("enableFixedNav", "false");
  }
  if (btf.loadData("enableFixedNav") == "false") {
    $("#page-header").removeClass("nav-fixed nav-visible");
    $("#name-container").hide();
  } else {
    $("#name-container").show();
    $("#page-header").addClass("nav-fixed nav-visible");
    document.getElementById("con-toggleFixedNav").checked = true;
  }
  //加载是否打开右键菜单功能
  if (btf.loadData("enableContextMenu") == undefined) {
    btf.saveData("enableContextMenu", "true");
  }
  if (btf.loadData("enableContextMenu") == "true") {
    $("#con-rightmouse").addClass("checked");
    bindRightMenu(true, false);
  } else {
    $("#con-rightmouse").removeClass("checked");
    bindRightMenu(false, false);
  }
  //加载是否打开APlayer
  if (btf.loadData("enableAPlayer") == undefined) {
    btf.saveData("enableAPlayer", "false");
  }
  const navMusic = $("#nav-music");
  if (navMusic != null && navMusic.find("meting-js") != null) {
    const navMetingAplayer = navMusic.find("meting-js").aplayer;
    if (btf.loadData("enableAPlayer") == "true") {
      if ("/music/" != location.pathname) {
        navMusic.show();
      } else {
        navMusic.hide();
      }
      $(".music-wrapper .aplayer").show();
      document.getElementById("con-toggleAPlayer").checked = true;
    } else {
      navMusic.hide();
      if (navMetingAplayer) {
        navMetingAplayer.pause();
      }
    }
  }
  //加载是否显示右侧边栏
  if (btf.loadData("enableRightSide") == undefined) {
    btf.saveData("enableRightSide", "true");
  }
  if (btf.loadData("enableRightSide") == "false") {
    $("#rightside").hide();
  } else {
    $("#rightside").show();
    document.getElementById("con-toggleRightSide").checked = true;
  }
  // 加载网页背景
  try {
    let data = btf.loadData("blogBackground", 1440);
    if (data) consoleFn.changeBackground(data, 1);
    else btf.removeData("blogBackground");
  } catch (error) {
    btf.removeData("blogBackground");
  }
  // //设置边栏
  // left = 1;
  // if (btf.loadData("isLeftAside") == "true" || btf.loadData("isLeftAside") == null) {
  // } else {
  //   switchAside();
  // }
  if (btf.loadData("enableAutoTheme") == "true") {
    document.getElementById("con-toggleAutoTheme").checked = true;
    $("#con-mode,.rightMenu-item:has(.fa-adjust)").hide();
    var time = new Date();
    if (time.getHours() <= 7 || time.getHours() >= 19) {
      consoleFn.activateDarkMode();
      btf.removeData("theme");
    } else {
      consoleFn.activateLightMode();
      btf.removeData("theme");
    }
  }
  //加载繁星效果
  if (btf.loadData("enableStarBackground") == undefined) {
    btf.saveData("enableStarBackground", "true");
  }
  if (btf.loadData("enableStarBackground") == "true") {
    $("#universe").show();
    document.getElementById("con-toggleStarBackground").checked = true;
  } else {
    $("#universe").hide();
    document.getElementById("con-toggleStarBackground").checked = false;
  }
  //加载播放列表
  if (btf.loadData("playlist") != undefined) {
    var json = JSON.parse(btf.loadData("playlist"));
    consoleFn.changeAPlayerList(json.id, json.server, false);
  }
  document
    .getElementById("console-mask")
    .addEventListener("click", consoleFn.closeConsole);
  document
    .getElementById("console-button")
    .addEventListener("click", consoleFn.showConsole);
  window.onresize = () => {
    if (!cloudchewieFn.isFullScreen()) {
      $("#con-fullscreen").removeClass("checked");
    }
  };
  $(document).ready(function () {
    var observer = new MutationObserver(function (mutations) {
      mutations.forEach(function (mutation) {
        if (mutation.attributeName === "data-theme") {
          if ($("html").attr("data-theme") == "dark") {
            consoleFn.setDefaultThemeColor(2);
          } else {
            if (GLOBAL_CONFIG_SITE.isPost) {
              changeAutoColor(false);
            }
          }
        }
      });
    });
    observer.observe($("html")[0], { attributes: true });
  });
};
function changeAutoColor(first) {
  if (
    btf.loadData("enableAutoColor") == "true" &&
    document.querySelector("#page-header") != null &&
    document.querySelector("#page-header").style.backgroundImage != null &&
    document
      .querySelector("#page-header")
      .style.backgroundImage.split('url("')[1] != null
  ) {
    const colorThief = new ColorThief();
    const image = new Image();
    const xhr = new XMLHttpRequest();
    var url = document
      .querySelector("#page-header")
      .style.backgroundImage.split('url("')[1]
      .split('")')[0];
    xhr.onload = function () {
      let coverUrl = URL.createObjectURL(this.response);
      image.onload = function () {
        let color = colorThief.getColor(image);
        consoleFn.setThemeColor(color[0], color[1], color[2]);
        if ($("html").attr("data-theme") == "dark") {
          consoleFn.setDefaultThemeColor(2);
        }
        URL.revokeObjectURL(coverUrl);
      };
      image.src = coverUrl;
    };
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.send();
  } else {
    if (!first) consoleFn.setDefaultThemeColor(3);
  }
}

document.addEventListener("pjax:complete", loadSetting);
document.addEventListener("DOMContentLoaded", loadSetting);
