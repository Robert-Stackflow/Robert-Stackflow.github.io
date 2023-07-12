const cloudchewieFn = {
  setCookie: (cname, cvalue, exdays = 365) => {
    var d = new Date();
    d.setTime(d.getTime() + exdays * 24 * 60 * 60 * 1000);
    var expires = "expires=" + d.toGMTString();
    document.cookie = cname + "=" + cvalue + "; " + expires;
  },
  getCookie: (cname) => {
    var name = cname + "=";
    var ca = document.cookie.split(";");
    for (var i = 0; i < ca.length; i++) {
      var c = ca[i].trim();
      if (c.indexOf(name) == 0) {
        return c.substring(name.length, c.length);
      }
    }
    return "";
  },
  delCookie: (name) => {
    var exp = new Date();
    exp.setTime(exp.getTime() - 1);
    var cval = getCookie(name);
    if (cval != null)
      document.cookie = name + "=" + cval + ";expires=" + exp.toGMTString();
  },
  showRightMenu: (isTrue, x = 0, y = 0) => {
    let $rightMenu = $("#rightMenu");
    $rightMenu.css("top", x + "px").css("left", y + "px");
    if (isTrue) {
      $rightMenu.show();
    } else {
      $rightMenu.hide();
    }
  },
  /**
   * 图库
   */
  addPhotoFigcaption: () => {
    document.querySelectorAll("#article-container img").forEach((item) => {
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
  runJustifiedGallery: (ele) => {
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
  switchReadMode: () => {
    const clickFn = () => {
      $body.classList.remove("read-mode");
      document.getElementById("post").classList.remove("read-mode");
      newEle.remove();
      newEle.removeEventListener("click", clickFn);
      cloudchewieFn.isReadMode = false;
      $(".aplayer").show();
      $("#con-readmode").removeClass("checked");
      $(document.getElementById("post-meta")).show();
      if (visible != "none") {
        $(commentBarrage).fadeToggle();
      }
    };

    const $body = document.body;
    $body.classList.add("read-mode");
    document.getElementById("post").classList.add("read-mode");
    const newEle = document.createElement("button");
    newEle.type = "button";
    newEle.className = "fas fa-sign-out-alt exit-readmode";
    newEle.removeEventListener("click", clickFn);
    $body.appendChild(newEle);
    consoleFn.closeConsole();
    $(document.getElementById("post-meta")).hide();
    cloudchewieFn.isReadMode = true;
    $("#con-readmode").addClass("checked");
    $(".aplayer").hide();

    let commentBarrage = document.querySelector(".barrageswiper");
    let visible = $(commentBarrage).css("display");
    if (commentBarrage && !(visible == null || visible == "none")) {
      $(commentBarrage).fadeToggle();
    }
    newEle.addEventListener("click", clickFn);
  },
  isFullScreen: () => {
    var isFull = document.fullScreen || document.fullscreenElement !== null;
    if (isFull === undefined) isFull = false;
    return isFull;
  },
  switchDarkMode: () => {
    // typeof utterancesTheme === "function" && utterancesTheme();
    // typeof changeGiscusTheme === "function" && changeGiscusTheme();
    // typeof FB === "object" && window.loadFBComment();
    // typeof runMermaid === "function" && window.runMermaid();
    const nowMode =
      document.documentElement.getAttribute("data-theme") === "dark"
        ? "dark"
        : "light";
    let $rightMenu = $(
      "#menus > div.menus_items > div:nth-child(7) > a > span"
    );
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
      cloudchewieFn.day_night_count++;
      GLOBAL_CONFIG.Snackbar !== undefined &&
        btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day);
    }
    // handle some cases
    typeof utterancesTheme === "function" && utterancesTheme();
    typeof FB === "object" && window.loadFBComment();
    window.DISQUS &&
      document.getElementById("disqus_thread").children.length &&
      setTimeout(() => window.disqusReset(), 200);
  },
  copySelect: () => {
    document.execCommand("Copy", false, null);
    GLOBAL_CONFIG.Snackbar !== undefined &&
      btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success);
  },
  insertAtCursor: (myField, myValue) => {
    if (document.selection) {
      myField.focus();
      sel = document.selection.createRange();
      sel.text = myValue;
      sel.select();
    } else if (myField.selectionStart || myField.selectionStart == "0") {
      var startPos = myField.selectionStart;
      var endPos = myField.selectionEnd;
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
  },
  copyWordsLink: function () {
    let url = window.location.href;
    let txa = document.createElement("textarea");
    txa.value = url;
    document.body.appendChild(txa);
    txa.select();
    document.execCommand("Copy");
    document.body.removeChild(txa);
    GLOBAL_CONFIG.Snackbar !== undefined &&
      btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success);
  },
  translate: () => {
    document.getElementById("con-translate").click();
  },
  hideAsideBtn: () => {
    // Hide aside
    const $htmlDom = document.documentElement.classList;
    $htmlDom.contains("hide-aside")
      ? saveToLocal.set("enableAside", "show", 2)
      : saveToLocal.set("enableAside", "hide", 2);
    $htmlDom.toggle("hide-aside");
    if (saveToLocal.get("enableAside") == "hide")
      $("#con-toggleaside").addClass("checked");
    else $("#con-toggleaside").removeClass("checked");
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
    btf.scrollToDest(document.body.scrollHeight, 500);
  },
  hideAsideBtn: () => {
    //隐藏右侧栏
    if (!btf.isHome()) {
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
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          e.target.classList.toggle("hide");
        });
      });
  },
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
      return btf.throttle((e) => {
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
    const findHeadPosition = (top) => {
      if (top === 0) {
        return false;
      }

      let currentId = "";
      let currentIndex = "";

      list.forEach((ele, index) => {
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

    window.resolveTocScrollFunction = () => {
      return btf.throttle(() => {
        const currentTop = window.scrollY || document.documentElement.scrollTop;
        isToc && scrollPercent(currentTop);
        findHeadPosition(currentTop);
      }, 100)();
    };
    window.addEventListener("scroll", resolveTocScrollFunction);
  },
  enlargeEmoji: () => {
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
        if (dom.length == 2 && dom[1].className == "OwO-body")
          owo_body = dom[1];
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
  },
  /**
   * 复制加上版权信息
   */
  addCopyright: () => {
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
  },
  /**
   * 网页运行时间
   */
  addRuntime: () => {
    const $runtimeCount = document.getElementById("runtimeshow");
    if ($runtimeCount) {
      const publishDate = $runtimeCount.getAttribute("data-publishDate");
      $runtimeCount.innerText =
        btf.diffDate(publishDate) + " " + GLOBAL_CONFIG.runtime;
    }
  },
  /**
   * 最后更新时间
   */
  addLastPushDate: () => {
    const $lastPushDateItem = document.getElementById("last-push-date");
    if ($lastPushDateItem) {
      const lastPushDate = $lastPushDateItem.getAttribute("data-lastPushDate");
      $lastPushDateItem.innerText = btf.diffDate(lastPushDate, true);
    }
  },
  /**
   * 表格Overflow
   */
  addTableWrap: () => {
    const $table = document.querySelectorAll(
      "#article-container :not(.highlight) > table, #article-container > table"
    );
    if ($table.length) {
      $table.forEach((item) => {
        btf.wrap(item, "div", { class: "table-wrap" });
      });
    }
  },
  /**
   * tag-hide
   */
  clickFnOfTagHide: () => {
    const $hideInline = document.querySelectorAll(
      "#article-container .hide-button"
    );
    if ($hideInline.length) {
      $hideInline.forEach((item) => {
        item.addEventListener("click", (e) => {
          const $this = e.target;
          $this.classList.add("open");
          const $fjGallery =
            $this.nextElementSibling.querySelectorAll(".fj-gallery");
          $fjGallery.length && btf.initJustifiedGallery($fjGallery);
        });
      });
    }
  },
  clickFnOfTabs: () => {
    document
      .querySelectorAll("#article-container .tab > button")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          const $this = e.target;
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
  tabToTop: () => {
    document
      .querySelectorAll("#article-container .tabs .tab-to-top")
      .forEach((item) => {
        item.addEventListener("click", (e) => {
          btf.scrollToDest(
            btf.getEleTop(btf.getParents(e.target, ".tabs")),
            300
          );
        });
      });
  },
  //点击专栏卡片
  toggleCardCategory: () => {
    const $cardCategory = document.querySelectorAll(
      "#aside-cat-list .card-category-list-item.parent i"
    );
    if ($cardCategory.length) {
      $cardCategory.forEach((item) => {
        item.addEventListener("click", (e) => {
          e.preventDefault();
          const $this = e.target;
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
  },
  //跳转到评论
  switchComments: () => {
    let switchDone = false;
    const $switchBtn = document.querySelector("#comment-switch > .switch-btn");
    $switchBtn &&
      $switchBtn.addEventListener("click", () => {
        this.classList.toggle("move");
        document
          .querySelectorAll("#post-comment > .comment-wrap > div")
          .forEach((item) => {
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
  },
  //文章过期提醒
  addPostOutdateNotice: () => {
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
  },
  //懒加载图片
  lazyloadImg: () => {
    window.lazyLoadInstance = new LazyLoad({
      elements_selector: "img",
      threshold: 0,
      data_src: "lazy-src",
    });
  },
  //相对日期
  relativeDate: (selector) => {
    selector.forEach((item) => {
      const $this = item;
      const timeVal = $this.getAttribute("datetime");
      $this.innerText = btf.diffDate(timeVal, true);
      $this.style.display = "inline";
    });
  },
  sweetSnack: () => {
    if (cloudchewieFn.getCookie("daynight") == "NaN")
      cloudchewieFn.day_night_count = 0;
    else
      cloudchewieFn.day_night_count = new Number(
        cloudchewieFn.getCookie("daynight")
      );
    setInterval(() => {
      var initDay = -3;
      if (cloudchewieFn.day_night_count + initDay == 0)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "冬至·伊始:我的心与爱是不是能够这般纯粹，经受住时空的考验"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 20)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "交替·新生:月徊而霜凝兮，良人伴我侧；月斜而影绰兮，明镜照我心"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 60)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "风起·渴盼:桐絮扰动着尘世，恋人缔造着世界；细腻不语的青苔，是我对你的爱恋"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 120)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong(
            "雾霭·探索:越来越浓的雾霭模糊着彼此的视线，越来越厚的障壁阻隔着彼此的心儿"
          ),
          cloudchewieFn.day_night_count++;
      if (cloudchewieFn.day_night_count + initDay == 200)
        GLOBAL_CONFIG.Snackbar !== undefined &&
          btf.snackbarShowLong("拨云·成长:生活不全都是恋爱，恋爱却全都是生活"),
          cloudchewieFn.day_night_count++;
      cloudchewieFn.setCookie(
        "daynight",
        cloudchewieFn.day_night_count.toString()
      );
    }, 500);
  },
  enhanceTwikoo: () => {
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
      var commentInterval = setInterval(() => {
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
      setInterval(() => {
        if (document.getElementById("CommentaryRegulations")) {
          var element = document.createElement("div");
          element.id = "CommentaryRegulations";
          element.classList.add("tk-submit-action-icon");
          element.innerHTML =
            "<a href='/term/' target='_blank' title='评论条例'></a>";
          if (document.querySelector(".tk-row-actions-start"))
            document
              .querySelector(".tk-row-actions-start")
              .appendChild(element);
        }
      }, 300);
    }
  },
  /**
   * 杂乱功能
   */
  messFunction: () => {
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
    $("a.social-icon").each(() => {
      $(this).attr("target", "_blank");
    });
    setInterval(() => {
      $(".CtxtMenu_MenuArrow").html("");
    }, 200);
    localStorage.setItem(
      "MathJax-Menu-Settings",
      '{"zoom":"Click","scale":"1"}'
    );
    if (Number(saveToLocal.get("translate-chn-cht")) == 2) {
      $("#con-translate > i").attr("class", "iconfont icon-fanti");
    } else if (Number(saveToLocal.get("translate-chn-cht")) == 1) {
      $("#con-translate > i").attr("class", "iconfont icon-jianti");
    }
    if (saveToLocal.get("enableAside") == "hide")
      $("#con-toggleaside").addClass("checked");
    else $("#con-toggleaside").removeClass("checked");
  },
  /**
     浏览进度百分比
    **/
  browsingProgress: () => {
    window.addEventListener("scroll", () => {
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
    });
  },
  randomPost: () => {
    let e = saveToLocal.get("postLinks");
    if (e)
      for (;;) {
        let t = e[Math.floor(Math.random() * e.length)];
        console.log(t);
        if (t != "/" && t != "/404.html") return void pjax.loadUrl(t);
      }
    fetch("/sitemap.xml")
      .then((e) => e.text())
      .then((e) => new window.DOMParser().parseFromString(e, "text/xml"))
      .then((e) => {
        let t = e.querySelectorAll("url loc"),
          n = [];
        t.forEach((e) => {
          let t = e.innerHTML.split("/");
          let url = "/";
          for (var i = 3; i < t.length; i++) {
            if (i == t.length - 1) url += t[i];
            else url += t[i] + "/";
          }
          n.push(url);
        }),
          saveToLocal.set("postLinks", n, 0.02),
          cloudchewieFn.randomPost();
      });
  },
  danmu: () => {
    const e = new EasyDanmaku({
      el: "#danmu",
      line: 10,
      speed: 20,
      hover: !0,
      loop: !0,
    });
    let t = saveToLocal.get("danmu");
    if (t) e.batchSend(t, !0);
    else {
      let n = [];
      function a(e) {
        return (e = (e = (e = (e = (e = e.replace(
          /<\/*br>|[\s\uFEFF\xA0]+/g,
          ""
        )).replace(/<img.*?>/g, "[图片]")).replace(
          /<a.*?>.*?<\/a>/g,
          "[链接]"
        )).replace(/<pre.*?>.*?<\/pre>/g, "[代码块]")).replace(/<.*?>/g, ""));
      }
      fetch("https://comment.cloudchewie.com/", {
        method: "POST",
        body: JSON.stringify({
          event: "GET_RECENT_COMMENTS",
          accessToken: "df242fe099bf81ec336572476fbdc208",
          includeReply: !1,
          pageSize: 100,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      })
        .then((e) => e.json())
        .then(({ data: t }) => {
          t.forEach((e) => {
            null == e.avatar &&
              (e.avatar =
                "https://cravatar.cn/avatar/d615d5793929e8c7d70eab5f00f7f5f1?d=mp"),
              n.push({
                avatar: e.avatar,
                content: e.nick + "：" + a(e.comment),
              });
          }),
            e.batchSend(n, !0),
            saveToLocal.set("danmu", n, 0.02);
        });
    }
    document.getElementById("danmuBtn").innerHTML =
      "<button class=\"hideBtn\" onclick=\"document.getElementById('danmu').classList.remove('hidedanmu')\">显示弹幕</button> <button class=\"hideBtn\" onclick=\"document.getElementById('danmu').classList.add('hidedanmu')\">隐藏弹幕</button>";
  },
  addScript: (e, t, n) => {
    if (document.getElementById(e)) return n ? n() : void 0;
    let a = document.createElement("script");
    (a.src = t), (a.id = e), n && (a.onload = n), document.head.appendChild(a);
  }, //切换音乐播放状态
  musicToggle: function (changePaly = true) {
    if (!cloudchewie_musicFirst) {
      cloudchewieFn.musicBindEvent();
      cloudchewie_musicFirst = true;
    }
    let msgPlay = '<i class="fas fa-play"></i><span>播放音乐</span>';
    let msgPause = '<i class="fas fa-pause"></i><span>暂停音乐</span>';
    if (cloudchewie_musicPlaying) {
      navMusicEl.classList.remove("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPlay;
      document.getElementById("nav-music-hoverTips").innerHTML = "音乐已暂停";
      document.querySelector("#con-music i").classList = "fas fa-play";
      cloudchewie_musicPlaying = false;
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("playing");
      document.getElementById("menu-music-toggle").innerHTML = msgPause;
      document.querySelector("#con-music").classList.add("on");
      document.querySelector("#con-music i").classList = "fas fa-pause";
      cloudchewie_musicPlaying = true;
      navMusicEl.classList.add("stretch");
    }
    if (changePaly)
      document.querySelector("#nav-music meting-js").aplayer.toggle();
  },
  // 音乐伸缩
  musicTelescopic: function () {
    if (navMusicEl.classList.contains("stretch")) {
      navMusicEl.classList.remove("stretch");
    } else {
      navMusicEl.classList.add("stretch");
    }
  },

  //音乐上一曲
  musicSkipBack: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipBack();
    rm.hideRightMenu();
  },

  //音乐下一曲
  musicSkipForward: function () {
    navMusicEl.querySelector("meting-js").aplayer.skipForward();
    rm.hideRightMenu();
  },

  //获取音乐中的名称
  musicGetName: function () {
    var x = document.querySelector(".aplayer-title");
    var arr = [];
    for (var i = x.length - 1; i >= 0; i--) {
      arr[i] = x[i].innerText;
    }
    return arr[0];
  },
  musicBindEvent: function () {
    document
      .querySelector("#nav-music .aplayer-music")
      .addEventListener("click", function () {
        cloudchewieFn.musicTelescopic();
      });
    document
      .querySelector("#nav-music .aplayer-button")
      .addEventListener("click", function () {
        cloudchewieFn.musicToggle(false);
      });
  },
};
/**
 * 绑定右键菜单事件
 */
bindRightSideButton = () => {
  document.getElementById("rightside").addEventListener("click", (e) => {
    const $target = e.target.id ? e.target : e.target.parentNode;
    switch ($target.id) {
      case "go-up":
        cloudchewieFn.scrollToTop();
        break;
      case "go-down":
        cloudchewieFn.scrollToBottom();
        break;
      case "rightside_config":
        cloudchewieFn.showOrHideBtn($target);
        break;
      case "mobile-toc-button":
        cloudchewieFn.runMobileToc();
        break;
      case "readmode":
        cloudchewieFn.switchReadMode();
        break;
      case "darkmode":
        cloudchewieFn.switchDarkMode();
        break;
      case "hide-aside-btn":
        cloudchewieFn.hideAsideBtn();
        break;
      default:
        break;
    }
  });
};
const addHighlight = function () {
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

    if (highlightHeightLimit && item.offsetHeight > highlightHeightLimit + 30) {
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
