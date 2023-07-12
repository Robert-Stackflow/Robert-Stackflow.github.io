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
    rightSideFn.clickFnOfSubMenu();
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
  };

  window.refreshFunction = function () {
    initAdjust();
    sweetSnack();
    enhanceTwikoo();
    document
      .querySelector("#wander-button")
      .addEventListener("click", randomPost);
    if (GLOBAL_CONFIG_SITE.isPost) {
      GLOBAL_CONFIG.noticeOutdate !== undefined && addPostOutdateNotice();
      GLOBAL_CONFIG.relativeDate.post &&
        relativeDate(document.querySelectorAll("#post-meta time"));
    } else {
      GLOBAL_CONFIG.relativeDate.homepage &&
        relativeDate(document.querySelectorAll("#recent-posts time"));
      GLOBAL_CONFIG.runtime && addRuntime();
      addLastPushDate();
      toggleCardCategory();
    }
    const rightsideHideClassList = document.getElementById(
      "rightside-button-list"
    ).classList;
    rightsideHideClassList.toggle("show");
    rightsideHideClassList.add("status");
    scrollFn.scrollFunctionOfToc();
    scrollFn.scrollFunction();
    highlightFn.addHighlight();
    bindRightSideButton();
    GLOBAL_CONFIG.isPhotoFigcaption && galleryFn.addPhotoFigcaption();

    const $jgEle = document.querySelectorAll("#article-container .fj-gallery");
    $jgEle.length && galleryFn.runJustifiedGallery($jgEle);

    galleryFn.runLightbox();
    addTableWrap();
    clickFnOfTagHide();
    tabsFn.clickFnOfTabs();
    tabsFn.backToTop();
    switchComments();
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
    messFunction();
  };
  refreshFunction();
  unRefreshFunction();
  browsingProgress();
  "/nowtime/" == location.pathname &&
    (waterfall("#talk"),
    setTimeout(() => {
      "/nowtime/" == location.pathname && waterfall("#talk");
    }, 300));
});
