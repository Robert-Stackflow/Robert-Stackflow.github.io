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
        ? saveToLocal.set("enableAside", "show", 2)
        : saveToLocal.set("enableAside", "hide", 2);
      $htmlDom.toggle("hide-aside");
      if (saveToLocal.get("enableAside") == "hide")
        $("#con-toggleaside").addClass("checked");
      else $("#con-toggleaside").removeClass("checked");
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
bindRightMenuClickListener = () => {
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
};
