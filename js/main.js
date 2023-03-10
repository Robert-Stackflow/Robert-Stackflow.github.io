document.addEventListener("DOMContentLoaded", function () {
  let blogNameWidth, menusWidth, searchWidth, $nav;
  let mobileSidebarOpen = false;
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
    document
      .querySelector("#mode-button")
      .addEventListener("click", rmf.switchDarkMode);
    document
      .querySelector("#wander-button")
      .addEventListener("click", toRandomPost);
    if (document.querySelector("#bber-talk")) {
      var swiper = new Swiper(".swiper-container", {
        direction: "vertical", // 垂直切换选项
        loop: true,
        autoplay: {
          delay: 5000,
          pauseOnMouseEnter: true,
        },
      });
    }
    {
      var path = $("#post-cover").attr("data-lazy-src");
      $("#page-header:not(.not-top-img)::before").css(
        "background",
        "background-image: url(" + path + ")"
      );
    }
    setInterval(function () {
      $(".CtxtMenu_MenuArrow").html("");
    }, 200);
    localStorage.setItem(
      "MathJax-Menu-Settings",
      '{"zoom":"Click","renderer":"SVG","scale":"1"}'
    );
  };

  // 初始化header
  const initAdjust = () => {
    adjustMenu(true);
    $nav.classList.add("show");
  };

  function isHome() {
    if (
      window.document.location.href != "http://localhost:4000/" &&
      window.document.location.href != "http://clouchewie.com/" &&
      window.document.location.href != "http://www.cloudchewie.com" &&
      window.document.location.href != "http://github.cloudchewie.com" &&
      window.document.location.href != "https://localhost:4000/" &&
      window.document.location.href != "https://clouchewie.com/" &&
      window.document.location.href != "https://www.cloudchewie.com" &&
      window.document.location.href != "https://github.cloudchewie.com"
    )
      return false;
    return true;
  }

  // sidebar menus
  const sidebarFn = {
    open: () => {
      btf.sidebarPaddingR();
      document.body.style.overflow = "hidden";
      btf.animateIn(document.getElementById("menu-mask"), "to_show 0.5s");
      document.getElementById("sidebar-menus").classList.add("open");
      mobileSidebarOpen = true;
    },
    close: () => {
      const $body = document.body;
      $body.style.overflow = "";
      $body.style.paddingRight = "";
      btf.animateOut(document.getElementById("menu-mask"), "to_hide 0.5s");
      document.getElementById("sidebar-menus").classList.remove("open");
      mobileSidebarOpen = false;
    },
  };

  /**
   * 首頁top_img底下的箭頭
   */
  const scrollDownInIndex = () => {
    const $scrollDownEle = document.getElementById("scroll-down");
    $scrollDownEle &&
      $scrollDownEle.addEventListener("click", function () {
        btf.scrollToDest(
          document.getElementById("content-inner").offsetTop,
          300
        );
      });
  };

  /**
   * 代碼
   * 只適用於Hexo默認的代碼渲染
   */
  const addHighlightTool = function () {
    const highLight = GLOBAL_CONFIG.highlight;
    if (!highLight) return;

    const isHighlightCopy = highLight.highlightCopy;
    const isHighlightLang = highLight.highlightLang;
    const isHighlightShrink = GLOBAL_CONFIG_SITE.isHighlightShrink;
    const highlightHeightLimit = highLight.highlightHeightLimit;
    const isShowTool =
      isHighlightCopy || isHighlightLang || isHighlightShrink !== undefined;
    const $figureHighlight =
      highLight.plugin === "highlighjs"
        ? document.querySelectorAll("figure.highlight")
        : document.querySelectorAll('pre[class*="language-"]');

    if (!((isShowTool || highlightHeightLimit) && $figureHighlight.length))
      return;

    const isPrismjs = highLight.plugin === "prismjs";

    let highlightShrinkEle = "";
    let highlightCopyEle = "";
    const highlightShrinkClass = isHighlightShrink === true ? "closed" : "";

    if (isHighlightShrink !== undefined) {
      highlightShrinkEle = `<i class="fas fa-angle-down expand ${highlightShrinkClass}"></i>`;
    }

    if (isHighlightCopy) {
      highlightCopyEle =
        '<div class="copy-notice"></div><i class="fas fa-paste copy-button"></i>';
    }

    const copy = (text, ctx) => {
      if (
        document.queryCommandSupported &&
        document.queryCommandSupported("copy")
      ) {
        document.execCommand("copy");
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.success);
        } else {
          const prevEle = ctx.previousElementSibling;
          prevEle.innerText = GLOBAL_CONFIG.copy.success;
          prevEle.style.opacity = 1;
          setTimeout(() => {
            prevEle.style.opacity = 0;
          }, 700);
        }
      } else {
        if (GLOBAL_CONFIG.Snackbar !== undefined) {
          btf.snackbarShow(GLOBAL_CONFIG.copy.noSupport);
        } else {
          ctx.previousElementSibling.innerText = GLOBAL_CONFIG.copy.noSupport;
        }
      }
    };

    // click events
    const highlightCopyFn = (ele) => {
      const $buttonParent = ele.parentNode;
      $buttonParent.classList.add("copy-true");
      const selection = window.getSelection();
      const range = document.createRange();
      if (isPrismjs)
        range.selectNodeContents($buttonParent.querySelectorAll("pre code")[0]);
      else
        range.selectNodeContents(
          $buttonParent.querySelectorAll("table .code pre")[0]
        );
      selection.removeAllRanges();
      selection.addRange(range);
      const text = selection.toString();
      copy(text, ele.lastChild);
      selection.removeAllRanges();
      $buttonParent.classList.remove("copy-true");
    };

    const highlightShrinkFn = (ele) => {
      const $nextEle = [...ele.parentNode.children].slice(1);
      ele.firstChild.classList.toggle("closed");
      if (btf.isHidden($nextEle[$nextEle.length - 1])) {
        $nextEle.forEach((e) => {
          e.style.display = "block";
        });
      } else {
        $nextEle.forEach((e) => {
          e.style.display = "none";
        });
      }
    };

    const highlightToolsFn = function (e) {
      const $target = e.target.classList;
      if ($target.contains("expand")) highlightShrinkFn(this);
      else if ($target.contains("copy-button")) highlightCopyFn(this);
    };

    const expandCode = function () {
      this.classList.toggle("expand-done");
    };

    function createEle(lang, item, service) {
      const fragment = document.createDocumentFragment();

      if (isShowTool) {
        const hlTools = document.createElement("div");
        hlTools.className = `highlight-tools ${highlightShrinkClass}`;
        hlTools.innerHTML = highlightShrinkEle + lang + highlightCopyEle;
        hlTools.addEventListener("click", highlightToolsFn);
        fragment.appendChild(hlTools);
      }

      if (
        highlightHeightLimit &&
        item.offsetHeight > highlightHeightLimit + 30
      ) {
        const ele = document.createElement("div");
        ele.className = "code-expand-btn";
        ele.innerHTML = '<i class="fas fa-angle-double-down"></i>';
        ele.addEventListener("click", expandCode);
        fragment.appendChild(ele);
      }

      if (service === "hl") {
        item.insertBefore(fragment, item.firstChild);
      } else {
        item.parentNode.insertBefore(fragment, item);
      }
    }

    if (isHighlightLang) {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          const langName = item.getAttribute("data-language")
            ? item.getAttribute("data-language")
            : "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          btf.wrap(item, "figure", { class: "highlight" });
          createEle(highlightLangEle, item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          let langName = item.getAttribute("class").split(" ")[1];
          if (langName === "plain" || langName === undefined) langName = "Code";
          const highlightLangEle = `<div class="code-lang">${langName}</div>`;
          createEle(highlightLangEle, item, "hl");
        });
      }
    } else {
      if (isPrismjs) {
        $figureHighlight.forEach(function (item) {
          btf.wrap(item, "figure", { class: "highlight" });
          createEle("", item);
        });
      } else {
        $figureHighlight.forEach(function (item) {
          createEle("", item, "hl");
        });
      }
    }
  };

  /**
   * PhotoFigcaption
   */
  function addPhotoFigcaption() {
    document
      .querySelectorAll("#article-container img")
      .forEach(function (item) {
        const parentEle = item.parentNode;
        const altValue = item.title || item.alt;
        if (
          altValue &&
          !parentEle.parentNode.classList.contains("justified-gallery")
        ) {
          const ele = document.createElement("div");
          ele.className = "img-alt is-center";
          ele.textContent = altValue;
          parentEle.insertBefore(ele, item.nextSibling);
        }
      });
  }

  /**
   * Lightbox
   */
  const runLightbox = () => {
    btf.loadLightbox(
      document.querySelectorAll("#article-container img:not(.no-lightbox)")
    );
  };

  /**
   * justified-gallery 圖庫排版
   */
  const runJustifiedGallery = function (ele) {
    ele.forEach((item) => {
      const $imgList = item.querySelectorAll("img");

      $imgList.forEach((i) => {
        const dataLazySrc = i.getAttribute("data-lazy-src");
        if (dataLazySrc) i.src = dataLazySrc;
        btf.wrap(i, "div", { class: "fj-gallery-item" });
      });
    });

    if (window.fjGallery) {
      setTimeout(() => {
        btf.initJustifiedGallery(ele);
      }, 100);
      return;
    }

    const newEle = document.createElement("link");
    newEle.rel = "stylesheet";
    newEle.href = GLOBAL_CONFIG.source.justifiedGallery.css;
    document.body.appendChild(newEle);
    getScript(`${GLOBAL_CONFIG.source.justifiedGallery.js}`).then(() => {
      btf.initJustifiedGallery(ele);
    });
  };

  /**
   * 滾動處理
   */
  const scrollFn = function () {
    const $rightside = document.getElementById("rightside");
    const innerHeight = window.innerHeight + 56;

    // 當滾動條小于 56 的時候
    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = "opacity: 1; transform: translateX(-60px)";
      return;
    }

    // find the scroll direction
    function scrollDirection(currentTop) {
      const result = currentTop > initTop; // true is down & false is up
      initTop = currentTop;
      return result;
    }

    let initTop = 0;
    let isChatShow = true;
    const $header = document.getElementById("page-header");
    const isChatBtnHide = typeof chatBtnHide === "function";
    const isChatBtnShow = typeof chatBtnShow === "function";

    window.scrollCollect = () => {
      return btf.throttle(function (e) {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        const isDown = scrollDirection(currentTop);
        if (currentTop > 56) {
          if (isDown) {
            if ($header.classList.contains("nav-visible"))
              $header.classList.remove("nav-visible");
            if (isChatBtnShow && isChatShow === true) {
              chatBtnHide();
              isChatShow = false;
            }
          } else {
            if (!$header.classList.contains("nav-visible"))
              $header.classList.add("nav-visible");
            if (isChatBtnHide && isChatShow === false) {
              chatBtnShow();
              isChatShow = true;
            }
          }
          $header.classList.add("nav-fixed");
          if (
            window.getComputedStyle($rightside).getPropertyValue("opacity") ===
            "0"
          ) {
            $rightside.style.cssText =
              "opacity: 0.8; transform: translateX(-60px)";
          }
        } else {
          if (currentTop === 0) {
            $header.classList.remove("nav-fixed", "nav-visible");
          }
          $rightside.style.cssText = "opacity: ''; transform: ''";
        }

        if (document.body.scrollHeight <= innerHeight) {
          $rightside.style.cssText =
            "opacity: 0.8; transform: translateX(-60px)";
        }
      }, 200)();
    };

    window.addEventListener("scroll", scrollCollect);
  };

  /**
   * toc,anchor
   */
  const scrollFnToDo = function () {
    const isToc = GLOBAL_CONFIG_SITE.isToc;
    const isAnchor = GLOBAL_CONFIG.isAnchor;
    const $article = document.getElementById("article-container");

    if (!($article && (isToc || isAnchor))) return;

    let $tocLink, $cardToc, scrollPercent, autoScrollToc, isExpand;

    if (isToc) {
      const $cardTocLayout = document.getElementById("card-toc");
      $cardToc = $cardTocLayout.getElementsByClassName("toc-content")[0];
      $tocLink = $cardToc.querySelectorAll(".toc-link");
      const $tocPercentage = $cardTocLayout.querySelector(".toc-percentage");
      isExpand = $cardToc.classList.contains("is-expand");

      scrollPercent = (currentTop) => {
        const docHeight = $article.clientHeight;
        const winHeight = document.documentElement.clientHeight;
        const headerHeight = $article.offsetTop;
        const contentMath =
          docHeight > winHeight
            ? docHeight - winHeight
            : document.documentElement.scrollHeight - winHeight;
        const scrollPercent = (currentTop - headerHeight) / contentMath;
        const scrollPercentRounded = Math.round(scrollPercent * 100);
        const percentage =
          scrollPercentRounded > 100
            ? 100
            : scrollPercentRounded <= 0
            ? 0
            : scrollPercentRounded;
        $tocPercentage.textContent = percentage;
      };

      window.mobileToc = {
        open: () => {
          $cardTocLayout.style.cssText =
            "animation: toc-open .3s; opacity: 1; right: 55px";
        },

        close: () => {
          $cardTocLayout.style.animation = "toc-close .2s";
          setTimeout(() => {
            $cardTocLayout.style.cssText =
              "opacity:''; animation: ''; right: ''";
          }, 100);
        },
      };

      // toc元素點擊
      $cardToc.addEventListener("click", (e) => {
        e.preventDefault();
        const target = e.target.classList;
        if (target.contains("toc-content")) return;
        const $target = target.contains("toc-link")
          ? e.target
          : e.target.parentElement;
        btf.scrollToDest(
          btf.getEleTop(
            document.getElementById(
              decodeURI($target.getAttribute("href")).replace("#", "")
            )
          ),
          300
        );
        if (window.innerWidth < 900) {
          window.mobileToc.close();
        }
      });

      autoScrollToc = (item) => {
        const activePosition = item.getBoundingClientRect().top;
        const sidebarScrollTop = $cardToc.scrollTop;
        if (activePosition > document.documentElement.clientHeight - 100) {
          $cardToc.scrollTop = sidebarScrollTop + 150;
        }
        if (activePosition < 100) {
          $cardToc.scrollTop = sidebarScrollTop - 150;
        }
      };
    }

    // find head position & add active class
    const list = $article.querySelectorAll("h1,h2,h3,h4,h5,h6");
    let detectItem = "";
    const findHeadPosition = function (top) {
      if (top === 0) {
        return false;
      }

      let currentId = "";
      let currentIndex = "";

      list.forEach(function (ele, index) {
        if (top > btf.getEleTop(ele) - 80) {
          const id = ele.id;
          currentId = id ? "#" + encodeURI(id) : "";
          currentIndex = index;
        }
      });

      if (detectItem === currentIndex) return;

      if (isAnchor) btf.updateAnchor(currentId);

      detectItem = currentIndex;

      if (isToc) {
        $cardToc.querySelectorAll(".active").forEach((i) => {
          i.classList.remove("active");
        });

        if (currentId === "") {
          return;
        }

        const currentActive = $tocLink[currentIndex];
        currentActive.classList.add("active");

        setTimeout(() => {
          autoScrollToc(currentActive);
        }, 0);

        if (isExpand) return;
        let parent = currentActive.parentNode;

        for (; !parent.matches(".toc"); parent = parent.parentNode) {
          if (parent.matches("li")) parent.classList.add("active");
        }
      }
    };

    // main of scroll
    window.tocScrollFn = function () {
      return btf.throttle(function () {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        isToc && scrollPercent(currentTop);
        findHeadPosition(currentTop);
      }, 100)();
    };
    window.addEventListener("scroll", tocScrollFn);
  };

  /**
   * Rightside
   */
  const rightSideFn = {
    switchReadMode: () => {
      // read-mode
      const $body = document.body;
      $body.classList.add("read-mode");
      document.getElementById("post").classList.add("read-mode");
      const newEle = document.createElement("button");
      newEle.type = "button";
      newEle.className = "fas fa-sign-out-alt exit-readmode";
      newEle.removeEventListener("click", clickFn);
      $body.appendChild(newEle);
      $(document.getElementById("post-meta")).hide();
      rmf.isReadMode = true;
      let commentBarrage = document.querySelector(".comment-barrage");
      let visible = $(commentBarrage).css("display");
      if (commentBarrage && visible != "none") {
        $(commentBarrage).fadeToggle();
      }
      function clickFn() {
        $body.classList.remove("read-mode");
        document.getElementById("post").classList.remove("read-mode");
        newEle.remove();
        newEle.removeEventListener("click", clickFn);
        rmf.isReadMode = false;
        $(document.getElementById("post-meta")).show();
        if (visible != "none") {
          $(commentBarrage).fadeToggle();
        }
      }
      newEle.addEventListener("click", clickFn);
    },
    switchDarkMode: () => {
      // Switch Between Light And Dark Mode
      const nowMode =
        document.documentElement.getAttribute("data-theme") === "dark"
          ? "dark"
          : "light";
      // handle some cases
      typeof utterancesTheme === "function" && utterancesTheme();
      typeof changeGiscusTheme === "function" && changeGiscusTheme();
      typeof FB === "object" && window.loadFBComment();
      typeof runMermaid === "function" && window.runMermaid();
    },
    showOrHideBtn: (e) => {
      // rightside 點擊設置 按鈕 展開
      const rightsideHideClassList = document.getElementById(
        "rightside-button-list"
      ).classList;
      rightsideHideClassList.toggle("show");
      if (e.classList.contains("show")) {
        rightsideHideClassList.add("status");
        setTimeout(() => {
          rightsideHideClassList.remove("status");
        }, 300);
      }
      e.classList.toggle("show");
    },
    scrollToTop: () => {
      // Back to top
      btf.scrollToDest(0, 500);
    },
    scrollToBottom: () => {
      // Back to Bottom
      window.scrollTo({
        top: document.body.clientHeight,
        behavior: "smooth",
      });
    },
    hideAsideBtn: () => {
      if (!isHome()) {
        // Hide aside
        const $htmlDom = document.documentElement.classList;
        $htmlDom.contains("hide-aside")
          ? saveToLocal.set("aside-status", "show", 2)
          : saveToLocal.set("aside-status", "hide", 2);
        $htmlDom.toggle("hide-aside");
      }
    },

    runMobileToc: () => {
      if (
        window
          .getComputedStyle(document.getElementById("card-toc"))
          .getPropertyValue("opacity") === "0"
      ) {
        window.mobileToc.open();
        $("#mobile-toc-button").addClass("checked");
      } else {
        window.mobileToc.close();
        $("#mobile-toc-button").removeClass("checked");
      }
    },
  };

  document.getElementById("rightside").addEventListener("click", function (e) {
    const $target = e.target.id ? e.target : e.target.parentNode;
    switch ($target.id) {
      case "go-up":
        rightSideFn.scrollToTop();
        break;
      case "rightside_config":
        rightSideFn.showOrHideBtn($target);
        break;
      case "mobile-toc-button":
        rightSideFn.runMobileToc();
        break;
      case "readmode":
        rightSideFn.switchReadMode();
        break;
      case "darkmode":
        rightSideFn.switchDarkMode();
        break;
      case "hide-aside-btn":
        rightSideFn.hideAsideBtn();
        break;
      default:
        break;
    }
  });

  /**
   * menu
   * 側邊欄sub-menu 展開/收縮
   */
  const clickFnOfSubMenu = () => {
    document
      .querySelectorAll("#sidebar-menus .site-page.group")
      .forEach(function (item) {
        item.addEventListener("click", function () {
          this.classList.toggle("hide");
        });
      });
  };

  /**
   * 複製時加上版權信息
   */
  const addCopyright = () => {
    const copyright = GLOBAL_CONFIG.copyright;
    document.body.oncopy = (e) => {
      e.preventDefault();
      let textFont;
      const copyFont = window.getSelection(0).toString();
      if (copyFont.length > copyright.limitCount) {
        textFont =
          copyFont +
          "\n" +
          "\n" +
          "\n" +
          copyright.languages.author +
          "\n" +
          copyright.languages.link +
          window.location.href +
          "\n" +
          copyright.languages.source +
          "\n" +
          copyright.languages.info;
      } else {
        textFont = copyFont;
      }
      if (e.clipboardData) {
        return e.clipboardData.setData("text", textFont);
      } else {
        return window.clipboardData.setData("text", textFont);
      }
    };
  };

  /**
   * 網頁運行時間
   */
  const addRuntime = () => {
    const $runtimeCount = document.getElementById("runtimeshow");
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute("data-publishDate");
      $runtimeCount.innerText =
        btf.diffDate(publishDate) + " " + GLOBAL_CONFIG.runtime;
    }
  };

  /**
   * 最後一次更新時間
   */
  const addLastPushDate = () => {
    const $lastPushDateItem = document.getElementById("last-push-date");
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
      $lastPushDateItem.innerText = btf.diffDate(lastPushDate, true);
    }
  };

  /**
   * table overflow
   */
  const addTableWrap = () => {
    const $table = document.querySelectorAll(
      "#article-container :not(.highlight) > table, #article-container > table"
    );
    if ($table.length) {
      $table.forEach((item) => {
        btf.wrap(item, "div", { class: "table-wrap" });
      });
    }
  };

  /**
   * tag-hide
   */
  const clickFnOfTagHide = function () {
    const $hideInline = document.querySelectorAll(
      "#article-container .hide-button"
    );
    if ($hideInline.length) {
      $hideInline.forEach(function (item) {
        item.addEventListener("click", function (e) {
          const $this = this;
          $this.classList.add("open");
          const $fjGallery =
            $this.nextElementSibling.querySelectorAll(".fj-gallery");
          $fjGallery.length && btf.initJustifiedGallery($fjGallery);
        });
      });
    }
  };

  const tabsFn = {
    clickFnOfTabs: function () {
      document
        .querySelectorAll("#article-container .tab > button")
        .forEach(function (item) {
          item.addEventListener("click", function (e) {
            const $this = this;
            const $tabItem = $this.parentNode;

            if (!$tabItem.classList.contains("active")) {
              const $tabContent = $tabItem.parentNode.nextElementSibling;
              const $siblings = btf.siblings($tabItem, ".active")[0];
              $siblings && $siblings.classList.remove("active");
              $tabItem.classList.add("active");
              const tabId = $this.getAttribute("data-href").replace("#", "");
              const childList = [...$tabContent.children];
              childList.forEach((item) => {
                if (item.id === tabId) item.classList.add("active");
                else item.classList.remove("active");
              });
              const $isTabJustifiedGallery = $tabContent.querySelectorAll(
                `#${tabId} .fj-gallery`
              );
              if ($isTabJustifiedGallery.length > 0) {
                btf.initJustifiedGallery($isTabJustifiedGallery);
              }
            }
          });
        });
    },
    backToTop: () => {
      document
        .querySelectorAll("#article-container .tabs .tab-to-top")
        .forEach(function (item) {
          item.addEventListener("click", function () {
            btf.scrollToDest(btf.getEleTop(btf.getParents(this, ".tabs")), 300);
          });
        });
    },
  };

  const toggleCardCategory = function () {
    const $cardCategory = document.querySelectorAll(
      "#aside-cat-list .card-category-list-item.parent i"
    );
    if ($cardCategory.length) {
      $cardCategory.forEach(function (item) {
        item.addEventListener("click", function (e) {
          e.preventDefault();
          const $this = this;
          $this.classList.toggle("expand");
          const $parentEle = $this.parentNode.nextElementSibling;
          if (btf.isHidden($parentEle)) {
            $parentEle.style.display = "block";
          } else {
            $parentEle.style.display = "none";
          }
        });
      });
    }
  };

  const switchComments = function () {
    let switchDone = false;
    const $switchBtn = document.querySelector("#comment-switch > .switch-btn");
    $switchBtn &&
      $switchBtn.addEventListener("click", function () {
        this.classList.toggle("move");
        document
          .querySelectorAll("#post-comment > .comment-wrap > div")
          .forEach(function (item) {
            if (btf.isHidden(item)) {
              item.style.cssText = "display: block;animation: tabshow .5s";
            } else {
              item.style.cssText = "display: none;animation: ''";
            }
          });

        if (!switchDone && typeof loadOtherComment === "function") {
          switchDone = true;
          loadOtherComment();
        }
      });
  };

  const addPostOutdateNotice = function () {
    const data = GLOBAL_CONFIG.noticeOutdate;
    const diffDay = btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate);
    if (diffDay >= data.limitDay) {
      const ele = document.createElement("div");
      ele.className = "post-outdate-notice";
      ele.textContent =
        data.messagePrev + " " + diffDay + " " + data.messageNext;
      const $targetEle = document.getElementById("article-container");
      if (data.position === "top") {
        $targetEle.insertBefore(ele, $targetEle.firstChild);
      } else {
        $targetEle.appendChild(ele);
      }
    }
  };

  const lazyloadImg = () => {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: "img",
      threshold: 0,
      data_src: "lazy-src",
    });
  };

  const relativeDate = function (selector) {
    selector.forEach((item) => {
      const $this = item;
      const timeVal = $this.getAttribute("datetime");
      $this.innerText = btf.diffDate(timeVal, true);
      $this.style.display = "inline";
    });
  };

  const unRefreshFn = function () {
    window.addEventListener("resize", () => {
      adjustMenu(false);
      btf.isHidden(document.getElementById("toggle-menu")) &&
        mobileSidebarOpen &&
        sidebarFn.close();
    });

    document.getElementById("menu-mask").addEventListener("click", (e) => {
      sidebarFn.close();
    });

    clickFnOfSubMenu();
    GLOBAL_CONFIG.islazyload && lazyloadImg();
    GLOBAL_CONFIG.copyright !== undefined && addCopyright();
  };

  window.refreshFn = function () {
    initAdjust();
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
    const nowMode =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    // let $rightMenu = $('#menus > div.menus_items > div:nth-child(7) > a > span');
    // let $rightMenu_mobile = $('#sidebar-menus > div.menus_items > div:nth-child(7) > a > span');
    // if (nowMode === 'light') {
    //     $rightMenu.html("深色模式")
    //     $rightMenu_mobile.html("深色模式")
    // } else {
    //     $rightMenu.html("浅色模式")
    //     $rightMenu_mobile.html("浅色模式")
    // }
    if (rmf.getCookie("daynight") == "NaN") rmf.day_night_count = 0;
    else rmf.day_night_count = new Number(rmf.getCookie("daynight"));
    setInterval(function () {
      var initDay = -3;
      if (rmf.day_night_count + initDay == 0)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "冬至·伊始:我的心与爱是不是能够这般纯粹，经受住时空的考验"
          ),
          rmf.day_night_count++;
      if (rmf.day_night_count + initDay == 20)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "交替·新生:月徊而霜凝兮，良人伴我侧；月斜而影绰兮，明Cloudchewie照我心"
          ),
          rmf.day_night_count++;
      if (rmf.day_night_count + initDay == 60)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "风起·渴盼:桐絮扰动着尘世，恋人缔造着世界；细腻不语的青苔，是我对你的爱恋"
          ),
          rmf.day_night_count++;
      if (rmf.day_night_count + initDay == 120)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "雾霭·探索:越来越浓的雾霭模糊着彼此的视线，越来越厚的障壁阻隔着彼此的心儿"
          ),
          rmf.day_night_count++;
      if (rmf.day_night_count + initDay == 200)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong("拨云·成长:生活不全都是恋爱，恋爱却全都是生活"),
          rmf.day_night_count++;
      rmf.setCookie("daynight", rmf.day_night_count.toString());
    }, 500);
    const rightsideHideClassList = document.getElementById(
      "rightside-button-list"
    ).classList;
    rightsideHideClassList.toggle("show");
    rightsideHideClassList.add("status");
    if (
      document.getElementById("site-title") &&
      document.getElementById("site-title").innerHTML.trim() ==
        document
          .querySelector(
            "#menus > div.menus_items > div:nth-child(5) > a > span"
          )
          .innerHTML.trim()
    ) {
      document.querySelector(
        "#post-comment > div.comment-head > div > span"
      ).innerHTML = "  留言板  ";
      var commentInterval = setInterval(function () {
        document.querySelectorAll(".el-textarea__inner").forEach((item) => {
          if (item.getAttribute("placeholder") != "请输入您的留言")
            item.setAttribute("placeholder", "请输入您的留言");
        });
        document
          .querySelectorAll(
            "#twikoo > div.tk-comments > div.tk-comments-container > div.tk-comments-no > span"
          )
          .forEach((item) => {
            if (item.innerHTML == "没有评论") item.innerHTML = "没有留言";
          });
        document
          .querySelectorAll(
            "#twikoo > div.tk-comments > div.tk-comments-container > div.tk-comments-title > span.tk-comments-count > span:nth-child(2)"
          )
          .forEach((item) => {
            if (item.innerHTML == " 条评论") item.innerHTML = " 条留言";
          });
      }, 300);
    }
    if (document.getElementById("post-comment")) {
      setInterval(function () {
        if (document.getElementById("CommentaryRegulations")) {
          var element = document.createElement("div");
          element.id = "CommentaryRegulations";
          element.classList.add("tk-submit-action-icon");
          element.innerHTML =
            "<a href='/about/' target='_blank' title='评论条例'></a>";
          if (document.querySelector(".tk-row-actions-start"))
            document
              .querySelector(".tk-row-actions-start")
              .appendChild(element);
        }
      }, 300);
    }
    scrollFnToDo();
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();
    addHighlightTool();
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption();
    scrollFn();

    const $jgEle = document.querySelectorAll("#article-container .fj-gallery");
    $jgEle.length && runJustifiedGallery($jgEle);

    runLightbox();
    addTableWrap();
    clickFnOfTagHide();
    tabsFn.clickFnOfTabs();
    tabsFn.backToTop();
    switchComments();
    document.getElementById("toggle-menu").addEventListener("click", () => {
      sidebarFn.open();
    });
    if (isHome()) {
      $("#hide-aside-btn").hide();
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? saveToLocal.set("aside-status", "show", 2)
        : saveToLocal.set("aside-status", "show", 2);
    }
  };

  refreshFn();
  unRefreshFn();
  if (isHome()) {
    $("#hide-aside-btn").hide();
    const $htmlDom = document.documentElement.classList;
    if ($htmlDom.contains("hide-aside")) {
      saveToLocal.set("aside-status", "show", 2);
      $htmlDom.toggle("hide-aside");
    }
  }
});
