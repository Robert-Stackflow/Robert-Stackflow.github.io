const galleryFn = {
  /**
   * 图库
   */
  addPhotoFigcaption: () => {
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
  },
  /**
   * justified-gallery 图库排版
   */
  runJustifiedGallery: function (ele) {
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
  },
  runLightbox: () => {
    btf.loadLightbox(
      document.querySelectorAll("#article-container img:not(.no-lightbox)")
    );
  },
};
/**
 * Lightbox
 */

/**
 * 代码高亮
 */
const highlightFn = {
  addHighlight: function () {
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

    //定义函数
    copy: (text, ctx) => {
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
    },
      (highlightCopyFn = (ele) => {
        const $buttonParent = ele.parentNode;
        $buttonParent.classList.add("copy-true");
        const selection = window.getSelection();
        const range = document.createRange();
        if (isPrismjs)
          range.selectNodeContents(
            $buttonParent.querySelectorAll("pre code")[0]
          );
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
      });
    highlightShrinkFn = (ele) => {
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
    highlightToolsFn = function (e) {
      const $target = e.target.classList;
      if ($target.contains("expand")) highlightShrinkFn(this);
      else if ($target.contains("copy-button")) highlightCopyFn(this);
    };
    expandCode = function () {
      this.classList.toggle("expand-done");
    };
    createEle = function (lang, item, service) {
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
    };

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
  },
};

/**
 * 边栏按钮功能
 */
const rightSideFn = {
  switchReadMode: () => {
    function clickFn() {
      $body.classList.remove("read-mode");
      document.getElementById("post").classList.remove("read-mode");
      newEle.remove();
      newEle.removeEventListener("click", clickFn);
      rmf.isReadMode = false;
      $(".aplayer").show();
      $("#con-readmode").removeClass("checked");
      $(document.getElementById("post-meta")).show();
      if (visible != "none") {
        $(commentBarrage).fadeToggle();
      }
    }

    const $body = document.body;
    $body.classList.add("read-mode");
    document.getElementById("post").classList.add("read-mode");
    const newEle = document.createElement("button");
    newEle.type = "button";
    newEle.className = "fas fa-sign-out-alt exit-readmode";
    newEle.removeEventListener("click", clickFn);
    $body.appendChild(newEle);
    toggleWinbox();
    $(document.getElementById("post-meta")).hide();
    rmf.isReadMode = true;
    $("#con-readmode").addClass("checked");
    $(".aplayer").hide();

    let commentBarrage = document.querySelector(".barrageswiper");
    let visible = $(commentBarrage).css("display");
    if (commentBarrage && !(visible == null || visible == "none")) {
      $(commentBarrage).fadeToggle();
    }
    newEle.addEventListener("click", clickFn);
  },
  switchDarkMode: () => {
    const nowMode =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    typeof utterancesTheme === "function" && utterancesTheme();
    typeof changeGiscusTheme === "function" && changeGiscusTheme();
    typeof FB === "object" && window.loadFBComment();
    typeof runMermaid === "function" && window.runMermaid();
  },
  showOrHideBtn: (e) => {
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
    btf.scrollToDest(0, 500);
  },
  scrollToBottom: () => {
    // window.scrollTo({
    //   top: document.body.clientHeight,
    //   behavior: "smooth",
    // });
    btf.scrollToDest(document.body.scrollHeight, 500);
  },
  hideAsideBtn: () => {
    //隐藏右侧栏
    if (!isHome()) {
      const $htmlDom = document.documentElement.classList;
      $htmlDom.contains("hide-aside")
        ? saveToLocal.set("enableAside", "show", 2)
        : saveToLocal.set("enableAside", "hide", 2);
      $htmlDom.toggle("hide-aside");
      if (saveToLocal.get("enableAside") == "hide")
        $("#con-toggleaside").addClass("checked");
      else $("#con-toggleaside").removeClass("checked");
    }
  },
  runMobileToc: () => {
    //手机目录
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
  /**
   * 侧边目录展开、收缩
   */
  clickFnOfSubMenu: () => {
    document
      .querySelectorAll("#sidebar-menus .site-page.group")
      .forEach(function (item) {
        item.addEventListener("click", function () {
          this.classList.toggle("hide");
        });
      });
  },
};
/**
 * 绑定右键菜单事件
 */
bindRightSideButton = () => {
  document.getElementById("rightside").addEventListener("click", function (e) {
    const $target = e.target.id ? e.target : e.target.parentNode;
    switch ($target.id) {
      case "go-up":
        rightSideFn.scrollToTop();
        break;
      case "go-down":
        rightSideFn.scrollToBottom();
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
};
/**
 * 滚动处理
 */
const scrollFn = {
  scrollFunction: () => {
    const $rightside = document.getElementById("rightside");
    const innerHeight = window.innerHeight + 56;
    // 当滚动条小于56时
    if (document.body.scrollHeight <= innerHeight) {
      $rightside.style.cssText = "opacity: 1; transform: translateX(-60px)";
      return;
    }
    //返回滑动方向
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
        if (currentTop < 10) {
          $header.classList.add("nav-top");
        } else {
          $header.classList.remove("nav-top");
        }
        if (currentTop > 56) {
          if (btf.loadData("enableFixedNav") == "false") {
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
          }
          if (
            window.getComputedStyle($rightside).getPropertyValue("opacity") ===
              "0" &&
            btf.loadData("enableRightSide") == "true"
          ) {
            $rightside.style.cssText =
              "opacity: 0.8; transform: translateX(-60px)";
          }
        } else {
          if (currentTop === 0) {
            if (btf.loadData("enableFixedNav") == "false") {
              $header.classList.remove("nav-fixed", "nav-visible");
            }
          }
          if (btf.loadData("enableRightSide") == "true") {
            $rightside.style.cssText = "opacity: ''; transform: ''";
          }
        }

        if (
          document.body.scrollHeight <= innerHeight &&
          btf.loadData("enableRightSide") == "true"
        ) {
          $rightside.style.cssText =
            "opacity: 0.8; transform: translateX(-60px)";
        }
      }, 200)();
    };

    window.addEventListener("scroll", scrollCollect);
  },
  scrollFunctionOfToc: () => {
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

      // toc元素点击
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
          $("#mobile-toc-button").removeClass("checked");
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

    window.resolveTocScrollFunction = function () {
      return btf.throttle(function () {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        isToc && scrollPercent(currentTop);
        findHeadPosition(currentTop);
      }, 100)();
    };
    window.addEventListener("scroll", resolveTocScrollFunction);
  },
};
/* 表情放大 */
function enlargeEmoji() {
  let flag = 1,
    owo_time = "",
    m = 3;
  let div = document.createElement("div"),
    body = document.querySelector("body");
  div.id = "owo-big";
  body.appendChild(div);
  let observer = new MutationObserver((mutations) => {
    for (let i = 0; i < mutations.length; i++) {
      let dom = mutations[i].addedNodes,
        owo_body = "";
      if (dom.length == 2 && dom[1].className == "OwO-body") owo_body = dom[1];
      // 如果需要在评论内容中启用此功能请解除下面的注释
      // else if (dom.length == 1 && dom[0].className == 'tk-comment') owo_body = dom[0];
      else continue;
      // 禁用右键（手机端长按会出现右键菜单，为了体验给禁用掉）
      if (document.body.clientWidth <= 768)
        owo_body.addEventListener("contextmenu", (e) => e.preventDefault());
      // 鼠标移入
      owo_body.onmouseover = (e) => {
        if (flag && e.target.tagName == "IMG") {
          flag = 0;
          // 移入300毫秒后显示盒子
          owo_time = setTimeout(() => {
            let height = e.target.clientHeight * m,
              width = e.target.clientWidth * m,
              left = e.x - e.offsetX - (width - e.target.clientWidth) / 2,
              top = e.y - e.offsetY;
            if (left + width > body.clientWidth)
              left -= left + width - body.clientWidth + 10;
            if (left < 0) left = 10;
            div.style.cssText = `display:flex; height:${height}px; width:${width}px; left:${left}px; top:${top}px;`;
            div.innerHTML = `<img src="${e.target.src}">`;
          }, 300);
        }
      };
      // 鼠标移出
      owo_body.onmouseout = () => {
        (div.style.display = "none"), (flag = 1), clearTimeout(owo_time);
      };
    }
  });
  observer.observe(document.getElementById("post-comment"), {
    subtree: true,
    childList: true,
  });
}
/**
 * 复制加上版权信息
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
 * 网页运行时间
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
 * 最后更新时间
 */
const addLastPushDate = () => {
  const $lastPushDateItem = document.getElementById("last-push-date");
  if ($lastPushDateItem) {
    const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
    $lastPushDateItem.innerText = btf.diffDate(lastPushDate, true);
  }
};

/**
 * 表格Overflow
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

//标签页控件
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

//点击专栏卡片
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
//跳转到评论
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

//文章过期提醒
const addPostOutdateNotice = function () {
  const data = GLOBAL_CONFIG.noticeOutdate;
  const diffDay = btf.diffDate(GLOBAL_CONFIG_SITE.postUpdate);
  if (diffDay >= data.limitDay) {
    const ele = document.createElement("div");
    ele.className = "post-outdate-notice";
    ele.textContent = data.messagePrev + " " + diffDay + " " + data.messageNext;
    const $targetEle = document.getElementById("article-container");
    if (data.position === "top") {
      $targetEle.insertBefore(ele, $targetEle.firstChild);
    } else {
      $targetEle.appendChild(ele);
    }
  }
};
//懒加载图片
const lazyloadImg = () => {
  window.lazyLoadInstance = new LazyLoad({
    elements_selector: "img",
    threshold: 0,
    data_src: "lazy-src",
  });
};

//相对日期
const relativeDate = function (selector) {
  selector.forEach((item) => {
    const $this = item;
    const timeVal = $this.getAttribute("datetime");
    $this.innerText = btf.diffDate(timeVal, true);
    $this.style.display = "inline";
  });
};

const sweetSnack = () => {
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
          "交替·新生:月徊而霜凝兮，良人伴我侧；月斜而影绰兮，明镜照我心"
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
};

const enhanceTwikoo = () => {
  if (
    document.getElementById("site-title") &&
    document.getElementById("site-title").innerHTML.trim() ==
      document
        .querySelector("#menus > div.menus_items > div:nth-child(5) > a > span")
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
          "<a href='/term/' target='_blank' title='评论条例'></a>";
        if (document.querySelector(".tk-row-actions-start"))
          document.querySelector(".tk-row-actions-start").appendChild(element);
      }
    }, 300);
  }
};
/**
 * 杂乱功能
 */
const messFunction = () => {
  $(
    "#aside-content > div.card-widget.card-info > div.card-info-social-icons.is-center > a:nth-child(1)"
  ).attr("target", "");
  if (btf.isHome()) {
    $("#hide-aside-btn").hide();
    const $htmlDom = document.documentElement.classList;
    if ($htmlDom.contains("hide-aside")) {
      saveToLocal.set("enableAside", "show", 2);
      $htmlDom.toggle("hide-aside");
    }
  }
  $("a.social-icon").each(function () {
    $(this).attr("target", "_blank");
  });
  // document
  //   .querySelector("#wander-button")
  //   .addEventListener("click", toRandomPost);
  setInterval(function () {
    $(".CtxtMenu_MenuArrow").html("");
  }, 200);
  localStorage.setItem("MathJax-Menu-Settings", '{"zoom":"Click","scale":"1"}');
  if (Number(saveToLocal.get("translate-chn-cht")) == 2) {
    $("#con-translate > i").attr("class", "iconfont icon-fanti");
  } else if (Number(saveToLocal.get("translate-chn-cht")) == 1) {
    $("#con-translate > i").attr("class", "iconfont icon-jianti");
  }
  if (saveToLocal.get("enableAside") == "hide")
    $("#con-toggleaside").addClass("checked");
  else $("#con-toggleaside").removeClass("checked");
};
/**
   浏览进度百分比
  **/
const browsingProgress = () => {
  window.addEventListener("scroll", percent);
  function percent() {
    let a = document.documentElement.scrollTop || window.scrollY, // 卷去高度
      b =
        Math.max(
          document.body.scrollHeight,
          document.documentElement.scrollHeight,
          document.body.offsetHeight,
          document.documentElement.offsetHeight,
          document.body.clientHeight,
          document.documentElement.clientHeight
        ) - document.documentElement.clientHeight, // 整个网页高度
      result = Math.round((a / b) * 100), // 计算百分比
      up = document.querySelector("#go-up"); // 获取按钮
    down = document.querySelector("#go-down"); // 获取按钮
    if (up != null) {
      if (result <= 95) {
        up.childNodes[0].style.display = "none";
        up.childNodes[1].style.display = "block";
        down.style.display = "block";
        up.childNodes[1].childNodes[0].innerHTML = result;
      } else {
        down.style.display = "none";
        up.childNodes[1].style.display = "none";
        up.childNodes[0].style.display = "block";
      }
    }
  }
};
const randomPost = () => {
  let e = saveToLocal.get("postLinks");
  if (e)
    for (;;) {
      let t = e[Math.floor(Math.random() * e.length)];
      if (t != location.pathname) return void pjax.loadUrl(t);
    }
  fetch("/sitemap.xml")
    .then((e) => e.text())
    .then((e) => new window.DOMParser().parseFromString(e, "text/xml"))
    .then((e) => {
      let t = e.querySelectorAll("url loc"),
        n = [];
      t.forEach((e) => {
        let t = e.innerHTML.split("/");
        n.push("/" + t[3] + "/" + t[4]);
      }),
        saveToLocal.set("postLinks", n, 0.02),
        randomPost();
    });
};
