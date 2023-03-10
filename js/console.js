document.addEventListener("pjax:complete", tosetting);
document.addEventListener("DOMContentLoaded", tosetting);
function tosetting() {
  $("#settingWindow").hide();
  document.getElementById("settingStyle").innerText = `
  *,*:not(.card-info)::before,*::after{
      -webkit-backdrop-filter: none!important;
      backdrop-filter: none!important;
      -webkit-filter: none!important;
      filter: none!important;
  }`;
  if (localStorage.getItem("autoColor") == undefined) {
    localStorage.setItem("autoColor", "1");
  }
  if (localStorage.getItem("autoColor") == "1") {
    document.getElementById("autoColor").checked = true;
  }
  if (localStorage.getItem("hideRightside") == undefined) {
    localStorage.setItem("hideRightside", "0");
  }
  if (localStorage.getItem("hideRightside") == "1") {
    $("#rightside").toggle();
  }
  toggleRightside = function () {
    $("#rightside").toggle();
    localStorage.setItem(
      "hideRightside",
      Math.abs(Number(localStorage.getItem("hideRightside")) - 1)
    );
  };
  setDefaultBg = function () {
    localStorage.removeItem("blogbg");
    window.location.reload();
  };
  // 存数据
  // name：命名 data：数据
  saveData = function (name, data) {
    localStorage.setItem(
      name,
      JSON.stringify({ time: Date.now(), data: data })
    );
  };
  // 取数据
  // name：命名 time：过期时长,单位分钟,如传入30,即加载数据时如果超出30分钟返回0,否则返回数据
  loadData = function (name, time) {
    let d = JSON.parse(localStorage.getItem(name));
    // 过期或有错误返回 0 否则返回数据
    if (d) {
      let t = Date.now() - d.time;
      if (t < time * 60 * 1000 && t > -1) return d.data;
    }
    return 0;
  };
  // 切换背景函数
  // 此处的flag是为了每次读取时都重新存储一次,导致过期时间不稳定
  // 如果flag为0则存储,即设置背景. 为1则不存储,即每次加载自动读取背景.
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
  // 读取背景
  try {
    let data = loadData("blogbg", 1440);
    if (data) changeBg(data, 1);
    else localStorage.removeItem("blogbg");
  } catch (error) {
    localStorage.removeItem("blogbg");
  }
  $(".asetting").hide();
  $("#backer").hide();
  $("#" + localStorage.getItem("themeColor")).attr("checked", true);
  document.getElementsByClassName("reSettings")[0].onclick = function () {
    localStorage.clear();
    window.location.reload();
  };
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
  fullScreen = function () {
    if (document.fullscreenElement) {
      document.exitFullscreen();
      $("#con-fullscreen").removeClass("checked");
    } else {
      document.documentElement.requestFullscreen();
      $("#con-fullscreen").addClass("checked");
    }
  };
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
    $("#con-mode,.rightMenu-item:has(.fa-moon)").hide();
    var time = new Date();
    if (time.getHours() <= 7 || time.getHours() >= 19) {
      activateDarkMode();
      localStorage.removeItem("theme");
    } else {
      activateLightMode();
      localStorage.removeItem("theme");
    }
  }
  if (location.href.indexOf("posts") != -1) {
    var xhr = new XMLHttpRequest();
    var url = document
      .querySelector("#page-header")
      .style.backgroundImage.split('url("')[1]
      .split('")')[0];
    xhr.open(
      "GET",
      "https://apis.yisous.xyz/api/imageColor?imgurl=" + url,
      true
    );
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          document.getElementById(
            "themeColor"
          ).innerText = `:root{--theme-color:${xhr.responseText}!important}`;
        }
      }
    };
  }
  toggleAutoTheme = () => {
    if (localStorage.getItem("autoTheme") == "true") {
      localStorage.setItem("autoTheme", "false");
      $("#con-mode,.rightMenu-item:has(.fa-moon)").show();
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
      $("#con-mode,.rightMenu-item:has(.fa-moon)").hide();
    }
  };
  toggleNav = () => {};
  autoColor = () => {
    if (localStorage.getItem("autoColor") == "1")
      localStorage.setItem("autoColor", "0");
    else {
      localStorage.setItem("autoColor", "1");
    }
  };
  if (
    Number(localStorage.getItem("autoColor")) == 1 &&
    document.querySelector("#page-header") != null &&
    document.querySelector("#page-header").style.backgroundImage != null &&
    document
      .querySelector("#page-header")
      .style.backgroundImage.split('url("')[1] != null
  ) {
    var xhr = new XMLHttpRequest();
    var url = document
      .querySelector("#page-header")
      .style.backgroundImage.split('url("')[1]
      .split('")')[0];
    xhr.open(
      "GET",
      "https://apis.yisous.xyz/api/imageColor?imgurl=https://" +
        window.location.host +
        url,
      true
    );
    xhr.send();
    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if (xhr.status === 200) {
          document.getElementById(
            "themeColor"
          ).innerText = `:root{--lyx-theme:${xhr.responseText}!important}`;
        }
      }
    };
  }
  document
    .querySelector("#console-button")
    .addEventListener("click", toggleWinbox);
  window.onresize = function () {
    if (!checkFull()) {
      $("#con-fullscreen").removeClass("checked");
    }
  };
}

function checkFull() {
  var isFull = document.fullScreen || document.fullscreenElement !== null;
  if (isFull === undefined) {
    isFull = false;
  }
  return isFull;
}
