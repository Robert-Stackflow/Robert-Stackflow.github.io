function insertAtCursor(e,t){if(document.selection)e.focus(),sel=document.selection.createRange(),sel.text=t,sel.select();else if(e.selectionStart||"0"==e.selectionStart){var n=e.selectionStart,o=e.selectionEnd,c=e.scrollTop;e.value=e.value.substring(0,n)+t+e.value.substring(o,e.value.length),c>0&&(e.scrollTop=c),e.focus(),e.selectionStart=n+t.length,e.selectionEnd=n+t.length}else e.value+=t,e.focus()}let rmf={};function popupMenu(){window.oncontextmenu=function(e){$(".rightMenu-group.hide").hide(),document.getSelection().toString()&&$("#menu-text").show(),(document.getElementById("post")||document.getElementById("page"))&&$("#menu-post").show();var t=window.document.body;t=e.target;/^(?:http(s)?:\/\/)?[\w.-]+(?:\.[\w\.-]+)+[\w\-\._~:/?#[\]@!\$&'\*\+,;=.]+$/.test(window.getSelection().toString())&&$("#menu-too").show(),"A"==t.tagName&&($("#menu-to").show(),rmf.open=function(){location.href=t.href},rmf.openWithNewTab=function(){window.open(t.href),window.location.reload()},rmf.copyLink=function(){let e=t.href,n=document.createElement("textarea");n.value=e,document.body.appendChild(n),n.select(),document.execCommand("Copy"),document.body.removeChild(n)}),"IMG"==t.tagName?($("#menu-img").show(),rmf.openWithNewTab=function(){window.open(t.src),window.location.reload()},rmf.click=function(){t.click()},rmf.copyLink=function(){let e=t.src,n=document.createElement("textarea");n.value=e,document.body.appendChild(n),n.select(),document.execCommand("Copy"),document.body.removeChild(n)}):"TEXTAREA"!=t.tagName&&"INPUT"!=t.tagName||($("#menu-paste").show(),rmf.paste=function(){navigator.permissions.query({name:"clipboard-read"}).then((e=>{"granted"==e.state||"prompt"==e.state?navigator.clipboard.readText().then((e=>{console.log(e),insertAtCursor(t,e)})):alert("请允许读取剪贴板！")}))});let n=e.clientX+10,o=e.clientY,c=$("#rightMenu").width(),i=$("#rightMenu").height();n+c>window.innerWidth&&(n-=c+10),o+i>window.innerHeight&&(o-=o+i-window.innerHeight);return document.querySelectorAll(".rightMenu-line").forEach((e=>{console.log(e.className),e.className})),$("#menu-general").show(),rmf.showRightMenu(!0,o,n),!1},window.addEventListener("click",(function(){rmf.showRightMenu(!1)}))}rmf.showRightMenu=function(e,t=0,n=0){let o=$("#rightMenu");o.css("top",t+"px").css("left",n+"px"),e?o.show():o.hide()},rmf.switchDarkMode=function(){const e="dark"===document.documentElement.getAttribute("data-theme")?"dark":"light";let t=$("#menus > div.menus_items > div:nth-child(7) > a > span");"light"===e?(t.html("浅色模式"),activateDarkMode(),saveToLocal.set("theme","dark",2),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.day_to_night)):(t.html("深色模式"),activateLightMode(),saveToLocal.set("theme","light",2),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.night_to_day)),"function"==typeof utterancesTheme&&utterancesTheme(),"object"==typeof FB&&window.loadFBComment(),window.DISQUS&&document.getElementById("disqus_thread").children.length&&setTimeout((()=>window.disqusReset()),200)},rmf.copyWordsLink=function(){let e=window.location.href,t=document.createElement("textarea");t.value=e,document.body.appendChild(t),t.select(),document.execCommand("Copy"),document.body.removeChild(t),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success)},rmf.switchReadMode=function(){const e=document.body;e.classList.add("read-mode");const t=document.createElement("button");t.type="button",t.className="fas fa-sign-out-alt exit-readmode",e.appendChild(t),t.addEventListener("click",(function n(){e.classList.remove("read-mode"),t.remove(),t.removeEventListener("click",n)}))},rmf.copySelect=function(){document.execCommand("Copy",!1,null),void 0!==GLOBAL_CONFIG.Snackbar&&btf.snackbarShow(GLOBAL_CONFIG.Snackbar.copy_success)},rmf.scrollToTop=function(){btf.scrollToDest(0,500)},rmf.translate=function(){document.getElementById("translateLink").click()},document.onkeydown=function(e){17!=(e=e||window.event).keyCode||console.log("你知道的太多了")},navigator.userAgent.match(/(phone|pad|pod|iPhone|iPod|ios|iPad|Android|Mobile|BlackBerry|IEMobile|MQQBrowser|JUC|Fennec|wOSBrowser|BrowserNG|WebOS|Symbian|Windows Phone)/i)||popupMenu();const box=document.documentElement;function addLongtabListener(e,t){let n=0;e.ontouchstart=()=>{n=0,n=setTimeout((()=>{t(),n=0}),380)},e.ontouchmove=()=>{clearTimeout(n),n=0},e.ontouchend=()=>{n&&clearTimeout(n)}}addLongtabListener(box,popupMenu);