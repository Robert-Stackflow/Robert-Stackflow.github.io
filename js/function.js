//右侧边栏菜单
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
      btf.scrollToDest(document.getElementById("content-inner").offsetTop, 300);
    });
};

/**
 * PhotoFigcaption
 */
const addPhotoFigcaption = () => {
  document.querySelectorAll("#article-container img").forEach(function (item) {
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
};

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
 * 代碼
 * 只適用於Hexo默認的代碼渲染
 */
const addHighlightFn = function () {
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
