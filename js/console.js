document.addEventListener("pjax:complete", tosetting);
document.addEventListener("DOMContentLoaded", tosetting);
function tosetting() {
  //重置设置
  resetSettings = function () {
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
  };
  //设置为默认背景
  setDefaultBackground = function () {
    btf.removeData("blogBackground");
    window.location.reload();
  };
  // 切换背景
  setBackground = function (s, flag) {
    let bg = document.getElementById("web_bg");
    if (s.charAt(0) == "#") {
      bg.style.backgroundColor = s;
      bg.style.background = "none";
    } else bg.style.background = s;
    if (!flag) {
      btf.saveData("blogBackground", s);
    }
  };
  // 切换繁星效果
  toggleStarBackground = function () {
    if (btf.loadData("enableStarBackground") == "true") {
      btf.saveData("enableStarBackground", "false");
      $("#universe").hide();
    } else {
      btf.saveData("enableStarBackground", "true");
      $("#universe").show();
    }
  };
  // 切换歌单
  changeAPlayerList = function (id, server) {
    if (window.aplayers)
      for (let i = 0; i < window.aplayers.length; i++)
        window.aplayers[i].pause();
    btf.saveData("playlist", JSON.stringify({ id: id, server: server }));
    $("#aplayer").attr("data-id", id);
    $("#aplayer").attr("data-server", server);
    $("#aplayer").removeClass("no-reload");
    loadMeting();
  };
  // 切换全屏
  toggleFullScreen = function () {
    if (isFullScreen()) {
      document.exitFullscreen();
      $("#con-fullscreen").removeClass("checked");
    } else {
      document.documentElement.requestFullscreen();
      $("#con-fullscreen").addClass("checked");
    }
  };
  window.onresize = function () {
    if (!isFullScreen()) {
      $("#con-fullscreen").removeClass("checked");
    }
  };
  // 切换单双栏
  toggleAside = function () {
    const $htmlDom = document.documentElement.classList;
    $htmlDom.contains("hide-aside")
      ? saveToLocal.set("enableAside", "show", 2)
      : saveToLocal.set("enableAside", "hide", 2);
    $htmlDom.toggle("hide-aside");
    if (btf.loadData("enableAside") == "hide")
      $("#con-toggleaside").addClass("checked");
    else $("#con-toggleaside").removeClass("checked");
  };
  //控制侧栏位置
  switchAside = function () {
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
  };
  // 切换右侧边栏
  toggleRightSide = function () {
    if (btf.loadData("enableRightSide") == "true") {
      btf.saveData("enableRightSide", "false");
      $("#rightside").hide();
    } else {
      btf.saveData("enableRightSide", "true");
      $("#rightside").show();
    }
  };
  // 设置深浅色跟随系统模式
  toggleAutoTheme = () => {
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
  };
  // 切换固定导航栏
  toggleFixedNav = () => {
    if (btf.loadData("enableFixedNav") == "false") {
      btf.saveData("enableFixedNav", "true");
      $("#page-header").addClass("nav-fixed nav-visible");
      $("#name-container").show();
    } else {
      btf.saveData("enableFixedNav", "false");
      $("#page-header").removeClass("nav-fixed nav-visible");
      $("#name-container").hide();
    }
  };
  // 切换自动主题色
  toggleAutoColor = () => {
    if (btf.loadData("enableAutoColor") == "true")
      btf.saveData("enableAutoColor", "false");
    else btf.saveData("enableAutoColor", "true");
    changeAutoColor(false);
  };
  // 切换右键菜单
  toggleContextMenu = () => {
    if (btf.loadData("enableContextMenu") == "true") {
      btf.saveData("enableContextMenu", "false");
      $("#con-rightmouse").removeClass("checked");
      bindRightMenu(false, true);
    } else {
      btf.saveData("enableContextMenu", "true");
      $("#con-rightmouse").addClass("checked");
      bindRightMenu(true, true);
    }
  };
  // 切换APlayer
  toggleAPlayer = () => {
    if (btf.loadData("enableAPlayer") == "true") {
      btf.saveData("enableAPlayer", "false");
      $(".globalaplayer").hide();
      $(".music-wrapper .aplayer").show();
      if (window.aplayers) {
        for (let i = 0; i < window.aplayers.length; i++)
          window.aplayers[i].pause();
      }
    } else {
      btf.saveData("enableAPlayer", "true");
      $(".globalaplayer").show();
    }
  };
  // 解析歌单链接
  resolveUrl = () => {
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
    (o.onreadystatechange = function () {
      if (
        4 === o.readyState &&
        ((o.status >= 200 && o.status < 300) || 304 === o.status)
      ) {
        if (JSON.parse(o.responseText).length != 0) {
          $("#url-btn").html("解析成功");
          $("#url-btn").addClass("success");
          $("#url-btn").removeClass("fail");
          changeAPlayerList(id, server);
        } else {
          $("#url-btn").html("解析失败");
          $("#url-btn").removeClass("success");
          $("#url-btn").addClass("fail");
        }
      }
    }),
      o.open("get", t, !0),
      o.send(null);
  };
  // 加载设置
  loadSetting = () => {
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
      $("#con-toggleAutoColor").checked = true;
      changeAutoColor(true);
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
    if (btf.loadData("enableAPlayer") == "true") {
      $(".globalaplayer").show();
      $(".music-wrapper .aplayer").show();
      document.getElementById("con-toggleAPlayer").checked = true;
    } else {
      $(".globalaplayer").hide();
      if (window.aplayers)
        for (let i = 0; i < window.aplayers.length; i++)
          window.aplayers[i].pause();
    }
    //加载是否显示右侧边栏
    if (btf.loadData("enableRightSide") == undefined) {
      btf.saveData("enableRightSide", "true");
    }
    // setInterval(function () {
    if (btf.loadData("enableRightSide") == "false") {
      $("#rightside").hide();
    } else {
      $("#rightside").show();
      document.getElementById("con-toggleRightSide").checked = true;
    }
    // }, 500);
    // 加载网页背景
    try {
      let data = btf.loadData("blogBackground", 1440);
      if (data) setBackground(data, 1);
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
        activateDarkMode();
        btf.removeData("theme");
      } else {
        activateLightMode();
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
      changeAPlayerList(json.id, json.server);
    }
  };
  loadSetting();
}
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
        setThemeColor(color[0], color[1], color[2]);
        URL.revokeObjectURL(coverUrl);
      };
      image.src = coverUrl;
    };
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.send();
  } else {
    if (!first) setThemeColor(0, 153, 255);
  }
}

function setThemeColor(r, g, b) {
  document.getElementById(
    "themeColor"
  ).innerText = `:root{--theme-color:rgb(${r}, ${g}, ${b})!important;--scrollbar-color:rgb(${r}, ${g}, ${b});--btn-bg:rgb(${r}, ${g}, ${b})!important;--btn-hover-color:rgba(${r}, ${g}, ${b},0.7)!important;--text-bg-hover:rgba(${r}, ${g}, ${b},0.7)!important;--km-toc-active:rgba(${r}, ${g}, ${b},0.7)!important;--km-toc-hover:rgba(${r}, ${g}, ${b},0.6)!important;}`;
}

function isFullScreen() {
  var isFull = document.fullScreen || document.fullscreenElement !== null;
  if (isFull === undefined) isFull = false;
  return isFull;
}
// 切换显示控制台
toggleWinbox = function () {
  $("#settingWindow").fadeToggle("fast");
  $("#console-mask").fadeToggle("fast");
  if ($("#settingWindow").css("display") != "none")
    $("#settingWindow").css("display", "flex");
};
document.getElementById("console-mask").addEventListener("click", toggleWinbox);
document
  .getElementById("console-button")
  .addEventListener("click", toggleWinbox);
