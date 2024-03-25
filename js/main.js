var cloudchewie_musicFirst = false;
var cloudchewie_musicPlaying = false;
let cloudGPTIsRunning = false;
var $web_container = document.getElementById("web_container");
var $web_box = document.getElementById("web_box");
const $sidebarMenus = document.getElementById("sidebar-menus");
const $rightside = document.getElementById("rightside");

runOne();
document.addEventListener("pjax:complete", cloudchewieFn.fixNav);
document.addEventListener("DOMContentLoaded", cloudchewieFn.fixNav);
document.addEventListener("pjax:complete", consoleFn.loadSetting);
document.addEventListener("DOMContentLoaded", consoleFn.loadSetting);
document.addEventListener("DOMContentLoaded", function () {
  let blogNameWidth, menusWidth, searchWidth, $nav;

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

  const unRefreshFunction = function () {
    cloudchewieFn.toggleSidebar();
    GLOBAL_CONFIG.islazyload && cloudchewieFn.lazyloadImg();
    GLOBAL_CONFIG.navMusic && cloudchewieFn.listenNavMusicPause();
    GLOBAL_CONFIG.copyright !== undefined && cloudchewieFn.addCopyright();

    cloudchewieFn.isMemos() &&
      waterfall != undefined &&
      (waterfall("#talk"),
      setTimeout(() => {
        cloudchewieFn.isMemos() && waterfall("#talk");
      }, 300));

    window.addEventListener("resize", () => {
      adjustMenu(false);
      cloudchewieFn.isHidden(document.getElementById("toggle-menu")) &&
        mobileSidebarFn.mobileSidebarOpen &&
        mobileSidebarFn.close();
      cloudchewieFn.isMemos() &&
        (waterfall("#talk"),
        setTimeout(() => {
          cloudchewieFn.isMemos() && waterfall("#talk");
        }, 300));
    });
  };

  const messFunction = () => {
    $(
      "#aside-content > div.card-widget.card-info > div.card-info-social-icons.is-center > a:nth-child(1)"
    ).attr("target", "");
    if (cloudchewieFn.isHome()) {
      $("#hide-aside-btn").hide();
      const $htmlDom = document.documentElement.classList;
      if ($htmlDom.contains("hide-aside")) {
        saveToLocal.set("enableAside", "show", 2);
        $htmlDom.toggle("hide-aside");
      }
    }
    setInterval(() => {
      $(".CtxtMenu_MenuArrow").each((index, element) => {
        if ($(element).html() == "►") {
          $(element).html(
            "<i class='cloudchewiefont cloudchewie-icon-angle-right'></i>"
          );
        }
      });
      $(".CtxtMenu_MenuClose").each((index, element) => {
        if ($(element).html() == "<span>×</span>") {
          $(element).html(
            "<i class='cloudchewiefont cloudchewie-icon-xmark'></i>"
          );
        }
      });
    }, 200);
    localStorage.setItem(
      "MathJax-Menu-Settings",
      '{"zoom":"Click","scale":"1"}'
    );
    if (Number(saveToLocal.get("translate-chn-cht")) == 2) {
      $("#con-translate > i").attr(
        "class",
        "cloudchewiefont cloudchewie-icon-fanti"
      );
    } else if (Number(saveToLocal.get("translate-chn-cht")) == 1) {
      $("#con-translate > i").attr(
        "class",
        "cloudchewiefont cloudchewie-icon-jianti"
      );
    }
  };

  window.refreshFunction = function () {
    initAdjust();
    addHighlight();
    messFunction();
    cloudchewieFn.injectAccessKey(document, window);
    cloudchewieFn.waitBlank();
    cloudchewieFn.changeDataType();
    cloudchewieFn.tabToTop();
    cloudchewieFn.goToPage();
    cloudchewieFn.resizeTop();
    cloudchewieFn.runLightbox();
    cloudchewieFn.addTableWrap();
    cloudchewieFn.clickFnOfTabs();
    cloudchewieFn.clickFnOfTagHide();
    cloudchewieFn.scrollFunction();
    cloudchewieFn.scrollFunctionOfToc();
    enableGPT && cloudchewieFn.isPost() && cloudchewieFn.checkURLAndRunGPT();
    cloudchewieFn.checkVersion();
    cloudchewieFn.moveToComments();
    cloudchewieFn.sweetSnack();
    cloudchewieFn.enhanceTwikoo();
    cloudchewieFn.bindRightSideBtn();
    cloudchewieFn.browsingProgress();

    window.scrollCollect && window.scrollCollect();
    window.addEventListener("scroll", window.scrollCollect);

    cloudchewieFn.$search_input = document.getElementById("search-memos-input");
    cloudchewieFn.$search_memos = document.getElementById("search-memos");
    cloudchewieFn.$total_memos = document.getElementById("total-memos");
    cloudchewieFn.$mine_memos = document.getElementById("mine-memos");
    cloudchewieFn.$randomuser_memos = document.getElementById("randomuser-memos");
    cloudchewieFn.$userlist_memos = document.getElementById("userlist-memos");
    cloudchewieFn.$memos_bar_avatar = document.getElementById("memos-bar-avatar");
    cloudchewieFn.$memos_bar_avatar_link = document.getElementById("memos-bar-avatar-link");
    cloudchewieFn.$memos_bar_name = document.getElementById("memos-bar-name");
    cloudchewieFn.$memos_userlist = document.getElementById("memos-userlist");
    cloudchewieFn.$memos_query = document.getElementById("memos-query");
    cloudchewieFn.$memos_button_list = document.getElementById("memos-button-list");
    cloudchewieFn.$total_memos&&cloudchewieFn.$total_memos.addEventListener("click",cloudchewieFn.onTotalMemosClicked);
    cloudchewieFn.$mine_memos&&cloudchewieFn.$mine_memos.addEventListener("click",cloudchewieFn.onMineMemosClicked);
    cloudchewieFn.$randomuser_memos&&cloudchewieFn.$randomuser_memos.addEventListener("click",cloudchewieFn.onRandomUserMemosClicked);
    cloudchewieFn.$userlist_memos&&cloudchewieFn.$userlist_memos.addEventListener("click",cloudchewieFn.onUserListMemosClicked);
    cloudchewieFn.$search_memos&&cloudchewieFn.$search_memos.addEventListener("click",cloudchewieFn.onSearchMemosClicked);
    cloudchewieFn.isMemos() && cloudchewieFn.fetchMemos();

    GLOBAL_CONFIG.isPhotoFigcaption && cloudchewieFn.addPhotoFigcaption();
    document.getElementById("post-comment") && cloudchewieFn.enlargeEmoji();

    const $jgEle = document.querySelectorAll("#article-container .fj-gallery");
    $jgEle.length && cloudchewieFn.runJustifiedGallery($jgEle);

    document.getElementById("rightside-button-list").classList.toggle("show");
    document.getElementById("rightside-button-list").classList.add("status");

    document
      .querySelector("#wander-button")
      .addEventListener("click", cloudchewieFn.randomPost);
    document
      .querySelector("#trailing-button")
      .addEventListener("click", cloudchewieFn.trailingBlog);
    document
      .getElementById("toggle-menu")
      .addEventListener("click", mobileSidebarFn.open);
    document
      .getElementById("menu-mask")
      .addEventListener("click", mobileSidebarFn.close);

    window.onkeydown = (e) => {
      123 === e.keyCode &&
        cloudchewieFn.snackbarShow("开发者模式已打开，请遵循GPL协议");
    };

    if (cloudchewieFn.isHome()) {
      $("#hide-aside-btn").hide();
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? saveToLocal.set("enableAside", "show", 2)
        : saveToLocal.set("enableAside", "show", 2);
    }

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

    window.addEventListener("resize", cloudchewieFn.resizeTop);
    setInterval(cloudchewieFn.resizeTop, 1000);

    cloudchewieFn.isGuestbook() &&
      cloudchewieFn.addScript(
        "Danmaku",
        "https://cdn.cbd.int/hexo-theme-cloudchewie@3.2.4/source/js/third-party/danmaku.min.js",
        cloudchewieFn.loadDamaku
      );

    document.querySelectorAll("a.social-icon").forEach((e) => {
      e.setAttribute("target", "_blank");
    });

    if (!cloudchewie_musicPlaying) {
      document.querySelector("#con-music i").classList = "fas fa-play";
    } else {
      document.querySelector("#con-music i").classList = "fas fa-pause";
    }

    if (enableAside) {
      $("#menuAside").show();
      $("#con-toggleaside").show();
    } else {
      $("#menuAside").hide();
      $("#con-toggleaside").hide();
    }
  };

  refreshFunction();
  unRefreshFunction();
});
