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
  };

  // 初始化header
  const initAdjust = () => {
    adjustMenu(true);
    $nav.classList.add("show");
  };

  /**
   * 滚动处理
   */
  const scrollFunction = function () {
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
  };

  /**
   * 目录、锚点
   */
  const scrollFunctionOfToc = function () {
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
  };

  /**
   * 侧边目录展开、收缩
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

  const resolveTwikoo = () => {
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
            "<a href='/term/' target='_blank' title='评论条例'></a>";
          if (document.querySelector(".tk-row-actions-start"))
            document
              .querySelector(".tk-row-actions-start")
              .appendChild(element);
        }
      }, 300);
    }
  };

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
      if ($("#page-header:not(.not-top-img)::before") != undefined) {
        $("#page-header:not(.not-top-img)::before").css(
          "background",
          "background-image: url(" + path + ")"
        );
      }
    }
    setInterval(function () {
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
  };

  const percentFunction = () => {
    window.addEventListener("scroll", percent);
    function percent() {
      let a = document.documentElement.scrollTop || window.pageYOffset, // 卷去高度
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
      if (up != null) {
        if (result <= 95) {
          up.childNodes[0].style.display = "none";
          up.childNodes[1].style.display = "block";
          up.childNodes[1].childNodes[0].innerHTML = result;
        } else {
          up.childNodes[1].style.display = "none";
          up.childNodes[0].style.display = "block";
        }
      }
    }
  };
  const unRefreshFunction = function () {
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

  window.refreshFunction = function () {
    initAdjust();
    sweetSnack();
    resolveTwikoo();
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
    scrollFunctionOfToc();
    bindRightMenuClickListener();
    GLOBAL_CONFIG_SITE.isHome && scrollDownInIndex();
    addHighlightFn();
    GLOBAL_CONFIG.isPhotoFigcaption && addPhotoFigcaption();
    scrollFunction();

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
  percentFunction();
});
