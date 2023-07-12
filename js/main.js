// 第一次播放音乐
var cloudchewie_musicFirst = false;
// 音乐播放状态
var cloudchewie_musicPlaying = false;
document.addEventListener("DOMContentLoaded", function () {
  let blogNameWidth, menusWidth, searchWidth, $nav;
  let mobileSidebarOpen = false;
  const open = () => {
    btf.sidebarPaddingR();
    document.body.style.overflow = "hidden";
    btf.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
    document.getElementById("sidebar-menus").classList.add("open");
    mobileSidebarOpen = true;
  };
  const close = () => {
    const $body = document.body;
    $body.style.overflow = "";
    $body.style.paddingRight = "";
    btf.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
    document.getElementById("sidebar-menus").classList.remove("open");
    mobileSidebarOpen = false;
  };
  const initAdjust = () => {
    adjustMenu(true);
    $nav.classList.add("show");
  };
  const adjustMenu = (init) => {
    if (init) {
      blogNameWidth = document.getElementById("site-name").offsetWidth;
      const $menusEle = document.querySelectorAll("#menus .menus_item");
      menusWidth = 0;
      $menusEle.length &&
        $menusEle.forEach((i) => {
          menusWidth += i.offsetWidth;
        });
      const $searchEle = document.querySelector("#search-button");
      searchWidth = $searchEle ? $searchEle.offsetWidth : 0;
      $nav = document.getElementById("nav");
    }
    let hideMenuIndex = "";
    if (window.innerWidth < 950) hideMenuIndex = true;
    else
      hideMenuIndex =
        blogNameWidth + menusWidth + searchWidth > $nav.offsetWidth - 120;

    if (hideMenuIndex) {
      $nav.classList.add("hide-menu");
    } else {
      $nav.classList.remove("hide-menu");
    }
  };

  const musicDom = document.getElementById("nav-music");
  const listenNavMusicPause = function () {
    const timer = setInterval(() => {
      if (navMusicEl.querySelector("#nav-music meting-js").aplayer) {
        clearInterval(timer);
        let msgPlay = '<i class="fas fa-play"></i><span>播放音乐</span>';
        let msgPause = '<i class="fas fa-pause"></i><span>暂停音乐</span>';
        navMusicEl
          .querySelector("#nav-music meting-js")
          .aplayer.on("pause", function () {
            navMusicEl.classList.remove("playing");
            document.getElementById("menu-music-toggle").innerHTML = msgPlay;
            document.getElementById("nav-music-hoverTips").innerHTML =
              "音乐已暂停";
            document.querySelector("#con-music i").classList = "fas fa-play";
            cloudchewie_musicPlaying = false;
            navMusicEl.classList.remove("stretch");
          });
        navMusicEl
          .querySelector("#nav-music meting-js")
          .aplayer.on("play", function () {
            navMusicEl.classList.add("playing");
            document.getElementById("menu-music-toggle").innerHTML = msgPause;
            document.querySelector("#con-music i").classList = "fas fa-pause";
            cloudchewie_musicPlaying = true;
            // navMusicEl.classList.add("stretch");
          });
      }
    }, 16);
  };

  const unRefreshFunction = function () {
    window.addEventListener("resize", () => {
      adjustMenu(false);
      btf.isHidden(document.getElementById("toggle-menu")) &&
        mobileSidebarOpen &&
        close();
    });
    window.addEventListener("resize", () => {
      "/nowtime/" == location.pathname &&
        (waterfall("#talk"),
        setTimeout(() => {
          "/nowtime/" == location.pathname && waterfall("#talk");
        }, 300));
    });
    document.getElementById("menu-mask").addEventListener("click", (e) => {
      close();
    });
    cloudchewieFn.clickFnOfSubMenu();
    GLOBAL_CONFIG.islazyload && cloudchewieFn.lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && cloudchewieFn.addCopyright();
    "/nowtime/" == location.pathname &&
      (waterfall("#talk"),
      setTimeout(() => {
        "/nowtime/" == location.pathname && waterfall("#talk");
      }, 300));
    GLOBAL_CONFIG.navMusic && listenNavMusicPause();
  };

  window.refreshFunction = function () {
    initAdjust();
    cloudchewieFn.sweetSnack();
    cloudchewieFn.enhanceTwikoo();
    document
      .querySelector("#wander-button")
      .addEventListener("click", cloudchewieFn.randomPost);
    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined &&
        cloudchewieFn.addPostOutdateNotice();
      GLOBAL_CONFIG.relativeDate.post &&
        cloudchewieFn.relativeDate(
          document.querySelectorAll("#post-meta time")
        );
    } else {
      GLOBAL_CONFIG.relativeDate.homepage &&
        cloudchewieFn.relativeDate(
          document.querySelectorAll("#recent-posts time")
        );
      GLOBAL_CONFIG.runtime && cloudchewieFn.addRuntime();
      cloudchewieFn.addLastPushDate();
      cloudchewieFn.toggleCardCategory();
    }
    const rightsideHideClassList = document.getElementById(
      "rightside-button-list"
    ).classList;
    rightsideHideClassList.toggle("show");
    rightsideHideClassList.add("status");
    cloudchewieFn.scrollFunctionOfToc();
    cloudchewieFn.scrollFunction();
    addHighlight();
    bindRightSideButton();
    GLOBAL_CONFIG.isPhotoFigcaption && cloudchewieFn.addPhotoFigcaption();

    const $jgEle = document.querySelectorAll("#article-container .fj-gallery");
    $jgEle.length && cloudchewieFn.runJustifiedGallery($jgEle);

    cloudchewieFn.runLightbox();
    cloudchewieFn.addTableWrap();
    cloudchewieFn.clickFnOfTagHide();
    cloudchewieFn.clickFnOfTabs();
    cloudchewieFn.tabToTop();
    cloudchewieFn.switchComments();
    document.getElementById("toggle-menu").addEventListener("click", () => {
      open();
    });
    btf.goToPage();
    if (btf.isHome()) {
      $("#hide-aside-btn").hide();
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? saveToLocal.set("enableAside", "show", 2)
        : saveToLocal.set("enableAside", "show", 2);
    }
    cloudchewieFn.messFunction();
  };
  $(document).ready(function () {
    checkURLAndRun();
    "/guestbook/" == location.pathname &&
      document.body.clientWidth > 768 &&
      cloudchewieFn.addScript(
        "Danmaku",
        "/js/third-party/danmu.js",
        cloudchewieFn.danmu
      );
    if (!cloudchewie_musicPlaying) {
      document.querySelector("#con-music i").classList = "fas fa-play";
    } else {
      document.querySelector("#con-music i").classList = "fas fa-pause";
    }
  });
  document.addEventListener("pjax:complete", function () {
    checkURLAndRun();
    "/guestbook/" == location.pathname &&
      document.body.clientWidth > 768 &&
      cloudchewieFn.addScript(
        "Danmaku",
        "/js/third-party/danmu.js",
        cloudchewieFn.danmu
      );
    if (!cloudchewie_musicPlaying) {
      document.querySelector("#con-music i").classList = "fas fa-play";
    } else {
      document.querySelector("#con-music i").classList = "fas fa-pause";
    }
  });
  refreshFunction();
  unRefreshFunction();
  cloudchewieFn.browsingProgress();
  if (document.getElementById("post-comment")) cloudchewieFn.enlargeEmoji();
  window.onkeydown = (e) => {
    123 === e.keyCode && btf.snackbarShow("开发者模式已打开，请遵循GPL协议");
  };
});
