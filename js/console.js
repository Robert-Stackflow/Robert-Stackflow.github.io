document.addEventListener("pjax:complete", tosetting);
document.addEventListener("DOMContentLoaded", tosetting);
function tosetting() {
  // 存数据——name：命名 data：数据
  saveData = function (name, data) {
    localStorage.setItem(
      name,
      JSON.stringify({ time: Date.now(), data: data })
    );
  };
  // 取数据——name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
  loadData = function (name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
      let t = Date.now() - d.time;
      if (t < time * 60 * 1000 && t > -1) return d.data;
    }
    return 0;
  };
  //重置设置
  resetSettings = function () {
    localStorage.clear();
    window.location.reload();
  };
  //设置为默认背景
  setDefaultBg = function () {
    localStorage.removeItem("blogbg");
    window.location.reload();
  };
  // 切换背景函数
  // 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
  // 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景
  changeBg = function (s, flag) {
    let bg = document.getElementById("web_bg");
    if (s.charAt(0) == "#") {
      bg.style.backgroundColor = s;
      bg.style.background = "none";
    } else bg.style.background = s;
    if (!flag) {
      saveData("blogbg", s);
    }
  };
  changeAPlayerList = function (s) {
    $("#aplayer").attr("data-id", s);
    $("#aplayer").removeClass("no-reload");
    loadMeting();
  };
  toggleStarBg = function () {
    if (localStorage.getItem("starBg") == "1") {
      localStorage.setItem("starBg", "0");
      $("#universe").hide();
    } else {
      localStorage.setItem("starBg", "1");
      $("#universe").show();
    }
  };
  //显隐控制台
  toggleWinbox = function () {
    document
      .getElementById("console-mask")
      .addEventListener("click", toggleWinbox);
    $("#settingWindow").fadeToggle("fast");
    $("#console-mask").fadeToggle("fast");
    if (document.getElementById("settingWindow").style.display != "none") {
      document.getElementById("settingWindow").style.display = "flex";
    }
  };
  //全屏
  toggleFullScreen = function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      $("#con-fullscreen").removeClass("checked");
    } else {
      document.documentElement.requestFullscreen();
      $("#con-fullscreen").addClass("checked");
    }
  };
  //控制单双栏
  toggleAside = function () {
    const $htmlDom = document.documentElement.classList;
    $htmlDom.contains("hide-aside")
      ? saveToLocal.set("aside-status", "show", 2)
      : saveToLocal.set("aside-status", "hide", 2);
    $htmlDom.toggle("hide-aside");
    if (saveToLocal.get("aside-status") == "hide")
      $("#con-toggleaside").addClass("checked");
    else $("#con-toggleaside").removeClass("checked");
  };
  //显隐右侧边栏
  hideAside = function () {
    localStorage.setItem(
      "hideAside",
      Math.abs(Number(localStorage.getItem("hideAside")) - 1)
    );
    if (localStorage.getItem("hideAside") == "1") {
      $("#rightside").hide();
    } else {
      $("#rightside").show();
    }
  };
  //控制侧栏位置
  switchAside = function () {
    if (left) {
      $("#aside-content").addClass("right");
      $(".layout > div:first-child").addClass("left");
      localStorage.setItem("leftAside", "false");
    } else {
      document.getElementById("aside-content").className = "aside-content";
      document.querySelector(".layout > div:first-child").className = "";
      try {
        document.querySelector("#recent-posts").className = "recent-posts";
      } catch (err) {}
      localStorage.setItem("leftAside", "true");
    }
    left = !left;
  };
  //设置深浅色跟随系统模式
  toggleAutoTheme = () => {
    if (localStorage.getItem("autoTheme") == "true") {
      localStorage.setItem("autoTheme", "false");
      $("#con-mode,.rightMenu-item:has(.fa-adjust)").show();
    } else {
      localStorage.setItem("autoTheme", "true");
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
  toggleNav = () => {
    if (localStorage.getItem("fixedNav") == "0") {
      localStorage.setItem("fixedNav", "1");
      $("#page-header").addClass("nav-fixed nav-visible");
      $("#name-container").show();
    } else {
      localStorage.setItem("fixedNav", "0");
      $("#page-header").removeClass("nav-fixed nav-visible");
      $("#name-container").hide();
    }
  };
  autoColor = () => {
    if (localStorage.getItem("autoColor") == "1")
      localStorage.setItem("autoColor", "0");
    else {
      localStorage.setItem("autoColor", "1");
    }
    changeAutoColor(false);
  };
  window.onresize = function () {
    if (!checkFull()) {
      $("#con-fullscreen").removeClass("checked");
    }
  };
  toggleRightMouse = () => {
    if (localStorage.getItem("rightmouse") == "1") {
      localStorage.setItem("rightmouse", "0");
      $("#con-rightmouse").removeClass("checked");
      bindRightMenu(false);
    } else {
      localStorage.setItem("rightmouse", "1");
      $("#con-rightmouse").addClass("checked");
      bindRightMenu(true);
    }
  };
  toggleAPlayer = () => {
    if (localStorage.getItem("aplayer") == "1") {
      localStorage.setItem("aplayer", "0");
      $(".aplayer").hide();
      if (window.aplayers) {
        for (let i = 0; i < window.aplayers.length; i++)
          window.aplayers[i].pause();
      }
      // $("div.aplayer.no-destroy.no-reload.aplayer-withlist").remove();
    } else {
      localStorage.setItem("aplayer", "1");
      $(".aplayer").show();
    }
  };
  loadSetting = () => {
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
    if (localStorage.getItem("autoColor") == undefined) {
      localStorage.setItem("autoColor", "1");
    }
    if (localStorage.getItem("autoColor") == "1") {
      document.getElementById("autoColor").checked = true;
      changeAutoColor(true);
    }
    //固定导航栏
    if (localStorage.getItem("fixedNav") == "0") {
      $("#page-header").removeClass("nav-fixed nav-visible");
      $("#name-container").hide();
    } else {
      $("#name-container").show();
      document.getElementById("fixedNav").checked = true;
      $("#page-header").addClass("nav-fixed nav-visible");
    }
    //加载是否打开右键菜单功能
    if (localStorage.getItem("rightmouse") == undefined) {
      localStorage.setItem("rightmouse", "1");
    }
    if (localStorage.getItem("rightmouse") == "1") {
      $("#con-rightmouse").addClass("checked");
      bindRightMenu(true);
    } else {
      $("#con-rightmouse").removeClass("checked");
      bindRightMenu(false);
    }
    //加载是否打开APlayer
    if (localStorage.getItem("aplayer") == undefined) {
      localStorage.setItem("aplayer", "1");
    }
    if (localStorage.getItem("aplayer") == "1") {
      $(".aplayer").show();
      document.getElementById("toggleAPlayer").checked = true;
    } else {
      document.getElementById("toggleAPlayer").checked = false;
      $(".aplayer").hide();
      if (window.aplayers) {
        for (let i = 0; i < window.aplayers.length; i++)
          window.aplayers[i].pause();
      }
    }
    //加载是否显示右侧边栏
    if (localStorage.getItem("hideAside") == undefined) {
      localStorage.setItem("hideAside", "0");
    }
    setInterval(function () {
      if (localStorage.getItem("hideAside") == "1") {
        $("#rightside").hide();
        document.getElementById("hideAside").checked = true;
      } else {
        $("#rightside").show();
      }
    }, 500);
    // 加载网页背景
    try {
      let data = loadData("blogbg", 1440);
      if (data) changeBg(data, 1);
      else localStorage.removeItem("blogbg");
    } catch (error) {
      localStorage.removeItem("blogbg");
    }
    //基本设置
    $(".asetting").hide();
    $("#backer").hide();
    document
      .querySelector("#console-button")
      .addEventListener("click", toggleWinbox);
    //设置边栏
    left = 1;
    if (
      localStorage.getItem("leftAside") == "true" ||
      localStorage.getItem("leftAside") == null
    ) {
    } else {
      switchAside();
    }
    if (localStorage.getItem("autoTheme") == "true") {
      document.getElementById("autoTheme").checked = true;
      $("#con-mode,.rightMenu-item:has(.fa-adjust)").hide();
      var time = new Date();
      if (time.getHours() <= 7 || time.getHours() >= 19) {
        activateDarkMode();
        localStorage.removeItem("theme");
      } else {
        activateLightMode();
        localStorage.removeItem("theme");
      }
    }
    if (localStorage.getItem("starBg") == undefined) {
      localStorage.setItem("starBg", "1");
    }
    if (localStorage.getItem("starBg") == "1") {
      $("#universe").show();
      document.getElementById("starBg").checked = true;
    } else {
      $("#universe").hide();
      document.getElementById("starBg").checked = false;
    }
  };
  loadSetting();
}
function changeAutoColor(first) {
  if (
    localStorage.getItem("autoColor") == "1" &&
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
        setColor(color[0], color[1], color[2]);
        URL.revokeObjectURL(coverUrl);
      };
      image.src = coverUrl;
    };
    xhr.open("GET", url, true);
    xhr.responseType = "blob";
    xhr.send();
  } else {
    if (!first) setColor(0, 153, 255);
  }
}

function setColor(r, g, b) {
  document.getElementById(
    "themeColor"
  ).innerText = `:root{--theme-color:rgb(${r}, ${g}, ${b})!important;--scrollbar-color:rgb(${r}, ${g}, ${b});--btn-bg:rgb(${r}, ${g}, ${b})!important;--btn-hover-color:rgba(${r}, ${g}, ${b},0.7)!important;--text-bg-hover:rgba(${r}, ${g}, ${b},0.7)!important;--km-toc-active:rgba(${r}, ${g}, ${b},0.7)!important;--km-toc-hover:rgba(${r}, ${g}, ${b},0.6)!important;}`;
}

function checkFull() {
  var isFull = document.fullScreen || document.fullscreenElement !== null;
  if (isFull === undefined) {
    isFull = false;
  }
  return isFull;
}
