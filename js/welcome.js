//首次访问弹窗
if (localStorage.getItem("popWelcomeWindow") != "0") {
    if(document.referrer==undefined||document.referrer.indexOf("yisous.xyz")!=-1||document.referrer.indexOf("ariasaka.top")!=-1){ //改成自己域名，注意是referrer!!! qwq
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.browser_version_low)
    }
}
if (sessionStorage.getItem("popCookieWindow") != "0") {
    setTimeout(function () {
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.cookie_notice)
    }, 3000)
}
sessionStorage.setItem("popCookieWindow", "0");