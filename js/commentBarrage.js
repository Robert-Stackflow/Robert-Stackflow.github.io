document.addEventListener("pjax:complete", startbarrage); //不用pjax请注释掉这一行;
document.addEventListener("DOMContentLoaded", startbarrage);
function startbarrage() {
  try {
    clearInterval(timer);
    document.querySelector(".comment-barrage").innerHTML = "";
    delete sw;
  } catch (err) {}
  const commentBarrageConfig = {
    //浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
    darkColors: [["#000a", "black"]],
    lightColors: [["#fff", "white"]],
    //v3仅支持一个弹幕
    //弹幕show间隔时间，单位ms
    barrageTime: 3000,
    //twikoo部署地址（Vercel、私有部署），腾讯云的为环境ID
    twikooUrl: "https://comment.cloudchewie.com/",
    //token获取见前文
    accessToken: "df242fe099bf81ec336572476fbdc208",
    pageUrl: window.location.pathname,
    barrageTimer: [],
    barrageList: [],
    barrageIndex: 0,
    // 没有设置过头像时返回的默认头像，见cravatar文档 https://cravatar.cn/developers/api，可以不改以免出错
    noAvatarType: "retro",
    dom: document.querySelector(".comment-barrage"),
    //是否默认show留言弹幕
    displayBarrage: false,
    //头像cdn，默认cravatar
    avatarCDN: "cravatar.cn",
  };
  function initCommentBarrage() {
    //加载设置
    if (btf.loadData("enableCommentBarrage") == undefined) {
      btf.saveData("enableCommentBarrage", "false");
    }
    if (btf.loadData("enableCommentBarrage") == "true") {
      commentBarrageConfig.displayBarrage = true;
      let commentBarrage = document.querySelector(".barrageswiper");
      if (commentBarrage) {
        $("#con-barrage").addClass("checked");
        $(commentBarrage).show();
      }
    } else {
      commentBarrageConfig.displayBarrage = false;
      let commentBarrage = document.querySelector(".barrageswiper");
      if (commentBarrage) {
        $("#con-barrage").removeClass("checked");
        $(commentBarrage).hide();
      }
    }
    //获取数据
    var data = JSON.stringify({
      event: "COMMENT_GET",
      "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
      url: commentBarrageConfig.pageUrl,
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === 4) {
        commentBarrageConfig.barrageList = commentLinkFilter(
          JSON.parse(this.responseText).data
        );
        commentBarrageConfig.dom.innerHTML = "";
        for (
          commentBarrageConfig.barrageIndex = 0;
          commentBarrageConfig.barrageIndex <
          commentBarrageConfig.barrageList.length;
          commentBarrageConfig.barrageIndex++
        ) {
          popCommentBarrage(
            commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]
          );
        }
        var kkksc03 = new Swiper(".barrageswiper", {
          direction: "vertical",
          loop: true,
          mousewheel: true,
          autoplay: {
            delay: commentBarrageConfig.barrageTime,
            stopOnLastSlide: false,
            disableOnInteraction: false,
          },
        });
        kkksc03.el.onmouseover = function () {
          kkksc03.autoplay.stop();
        };
        kkksc03.el.onmouseout = function () {
          kkksc03.autoplay.start();
        };
      }
    });
    xhr.open("POST", commentBarrageConfig.twikooUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    //绑定点击事件
    if (document.querySelector("#con-barrage") != null) {
      document
        .querySelector("#con-barrage")
        .removeEventListener("click", switchCommentBarrage);
      document
        .querySelector("#con-barrage")
        .addEventListener("click", switchCommentBarrage);
    }
    //绑定滑动事件
    document.addEventListener("scroll", function () {
      if (cloudchewieFn.isInViewPortOfOne(document.getElementById("post-comment"))) {
        commentBarrageConfig.displayBarrage = false;
        let commentBarrage = document.querySelector(".barrageswiper");
        if (commentBarrage) {
          $(commentBarrage).hide();
        }
        $("#con-barrage").hide();
      } else {
        if (btf.loadData("enableCommentBarrage") == "true") {
          commentBarrageConfig.displayBarrage = true;
          let commentBarrage = document.querySelector(".barrageswiper");
          if (commentBarrage) {
            $(commentBarrage).show();
          }
        }
        $("#con-barrage").show();
      }
    });
    //定时删除pangu
    setInterval(function () {
      $(".comment-barrage pangu").remove();
    }, 10);
  }
  function commentLinkFilter(data) {
    data.sort((a, b) => {
      return a.created - b.created;
    });
    let newData = [];
    data.forEach((item) => {
      newData.push(...getCommentReplies(item));
    });
    return newData;
  }
  function getCommentReplies(item) {
    if (item.replies) {
      let replies = [item];
      item.replies.forEach((item) => {
        replies.push(...getCommentReplies(item));
      });
      return replies;
    } else {
      return [];
    }
  }
  function popCommentBarrage(data) {
    let barrage = document.createElement("div");
    let width = commentBarrageConfig.dom.clientWidth;
    let height = commentBarrageConfig.dom.clientHeight;
    barrage.className = "comment-barrage-item";
    let ran = Math.floor(
      Math.random() * commentBarrageConfig.lightColors.length
    );
    document.getElementById(
      "barragesColor"
    ).innerHTML = `[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;
    if (data.avatar != undefined) {
      if (data.link != undefined) {
        if (!checkURL(data.link)) {
          data.link = "http://" + data.link;
        }
        barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="${data.avatar}"/>
                <a href="${data.link}" class="barrageNick" target="_blank">${data.nick}</a>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            `;
      } else {
        barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="${data.avatar}"/>
                <div class="barrageNick">${data.nick}</div>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            `;
      }
    } else {
      if (data.link != undefined) {
        if (!checkURL(data.link)) {
          data.link = "http://" + data.link;
        }
        barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
                <a href="${data.link}" class="barrageNick" target="_blank">${data.nick}</a>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            `;
      } else {
        barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
                <div class="barrageNick">${data.nick}</div>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            `;
      }
    }
    barrageContent = document.createElement("a");
    barrageContent.className = "barrageContent";
    barrageContent.href = "#" + data.id;
    barrageContent.innerHTML = data.comment;
    barrage.appendChild(barrageContent);
    aswiper = document.createElement("div");
    aswiper.className = "swiper-slide";
    aswiper.setAttribute("style", "height: 150px;");
    aswiper.append(barrage);
    commentBarrageConfig.dom.append(aswiper);
  }
  switchCommentBarrage = function () {
    if (btf.loadData("enableCommentBarrage") == "true")
      btf.saveData("enableCommentBarrage", "false");
    else btf.saveData("enableCommentBarrage", "true");
    // if (!isInViewPortOfOne(document.getElementById("post-comment"))) {
    commentBarrageConfig.displayBarrage = !commentBarrageConfig.displayBarrage;
    let commentBarrage = document.querySelector(".barrageswiper");
    if (commentBarrage) {
      if (commentBarrageConfig.displayBarrage) {
        $("#con-barrage").addClass("checked");
        $(commentBarrage).show();
      } else {
        $("#con-barrage").removeClass("checked");
        $(commentBarrage).hide();
      }
    }
    // }
  };
  function checkURL(URL) {
    var str = URL;
    //判断URL地址的正则表达式为:http(s)?://([\w-]+\.)+[\w-]+(/[\w- ./?%&=]*)?
    //下面的代码中应用了转义字符"\"输出一个字符"/"
    var Expression = /http(s)?:\/\/([\w-]+\.)+[\w-]+(\/[\w- .\/?%&=]*)?/;
    var objExp = new RegExp(Expression);
    if (objExp.test(str) == true) {
      return true;
    } else {
      return false;
    }
  }
  initCommentBarrage();
}
