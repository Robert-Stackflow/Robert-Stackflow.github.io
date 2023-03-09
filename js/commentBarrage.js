//CommentBarrage 2.0 By Ariasaka
//因为C++的原因码风越来越奇怪了
const commentBarrageConfig = {
  //浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
  lightColors: [["var(--lyx-white-acrylic2)", "var(--lyx-black)"]],
  darkColors: [["var(--lyx-black-acrylic2)", "var(--lyx-white)"]],
  //同时最多显示弹幕数
  maxBarrage: 1,
  //弹幕显示间隔时间，单位ms
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
  //是否默认显示留言弹幕
  displayBarrage: true,
  //头像cdn，默认cravatar
  avatarCDN: "cravatar.cn",
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
} //判断url合法性
function isInViewPortOfOne(el) {
  const viewPortHeight =
    window.innerHeight ||
    document.documentElement.clientHeight ||
    document.body.clientHeight;
  const offsetTop = el.offsetTop;
  const scrollTop = document.documentElement.scrollTop;
  const top = offsetTop - scrollTop;
  return top <= viewPortHeight;
}
if (location.href.indexOf("posts") != -1)
  //节流，优化非文章页面的弹幕显隐
  document.onscroll = function () {
    if (commentBarrageConfig.displayBarrage) {
      if (isInViewPortOfOne(document.getElementById("post-comment"))) {
        document
          .getElementsByClassName("comment-barrage")[0]
          .setAttribute("style", `display:none;`);
      } else {
        document
          .getElementsByClassName("comment-barrage")[0]
          .setAttribute("style", "");
      }
    }
  };
function initCommentBarrage() {
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
      if (commentBarrageConfig.dom != null)
        commentBarrageConfig.dom.innerHTML = "";
    }
  });
  xhr.open("POST", commentBarrageConfig.twikooUrl);
  xhr.setRequestHeader("Content-Type", "application/json");
  xhr.send(data);
  timer = setInterval(() => {
    if (commentBarrageConfig.barrageList.length) {
      popCommentBarrage(
        commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]
      );
      commentBarrageConfig.barrageIndex += 1;
      commentBarrageConfig.barrageIndex %=
        commentBarrageConfig.barrageList.length;
    }
    if (
      commentBarrageConfig.barrageTimer.length >
      (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage
        ? commentBarrageConfig.maxBarrage
        : commentBarrageConfig.barrageList.length)
    ) {
      removeCommentBarrage(commentBarrageConfig.barrageTimer.shift());
    }
  }, commentBarrageConfig.barrageTime);
  document.addEventListener("DOMContentLoaded", function () {
    if (document.querySelector("#switch_commentBarrage") != null)
      document
        .querySelector("#switch_commentBarrage")
        .addEventListener("click", switchCommentBarrage);
  });
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
  let ran = Math.floor(Math.random() * commentBarrageConfig.lightColors.length);
  document.getElementById(
    "barragesColor"
  ).innerHTML = `[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;
  if (data.avatar != undefined) {
    if (data.link != undefined) {
      if (!checkURL(data.link)) {
        data.link = "http://" + data.link;
      } //网址加协议头
      //增加评论和网址跳转
      barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="${data.avatar}"/>
                <a href="${data.link}" class="barrageNick" target="_blank">${data.nick}</a>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            <a class="barrageContent" href="#${data.id}">${data.comment}</a>
            `;
    } else {
      barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="${data.avatar}"/>
                <div class="barrageNick">${data.nick}</div>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            <a class="barrageContent" href="#${data.id}">${data.comment}</a>
            `;
    }
  } else {
    if (data.link != undefined) {
      //QQ头像
      if (!checkURL(data.link)) {
        data.link = "http://" + data.link;
      }
      barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
                <a href="${data.link}" class="barrageNick" target="_blank">${data.nick}</a>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            <a class="barrageContent" href="#${data.id}">${data.comment}</a>
            `;
    } else {
      barrage.innerHTML = `
            <div class="barrageHead">
                <img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
                <div class="barrageNick">${data.nick}</div>
                <a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
            </div>
            <a class="barrageContent" href="#${data.id}">${data.comment}</a>
            `;
    }
  }
  commentBarrageConfig.barrageTimer.push(barrage);
  commentBarrageConfig.dom.append(barrage);
}
function removeCommentBarrage(barrage) {
  barrage.className = "comment-barrage-item out";

  if (commentBarrageConfig.maxBarrage != 1) {
    setTimeout(() => {
      commentBarrageConfig.dom.removeChild(barrage);
    }, 1000);
  } else {
    commentBarrageConfig.dom.removeChild(barrage);
  }
}
switchCommentBarrage = function () {
  localStorage.setItem(
    "isBarrageToggle",
    Number(!Number(localStorage.getItem("isBarrageToggle")))
  );
  if (!isInViewPortOfOne(document.getElementById("post-comment"))) {
    commentBarrageConfig.displayBarrage = !commentBarrageConfig.displayBarrage;
    let commentBarrage = document.querySelector(".comment-barrage");
    if (commentBarrage) {
      $(commentBarrage).fadeToggle();
    }
  }
};
$(".comment-barrage").hover(
  function () {
    clearInterval(timer);
  },
  function () {
    timer = setInterval(() => {
      if (commentBarrageConfig.barrageList.length) {
        popCommentBarrage(
          commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]
        );
        commentBarrageConfig.barrageIndex += 1;
        commentBarrageConfig.barrageIndex %=
          commentBarrageConfig.barrageList.length;
      }
      if (
        commentBarrageConfig.barrageTimer.length >
        (commentBarrageConfig.barrageList.length >
        commentBarrageConfig.maxBarrage
          ? commentBarrageConfig.maxBarrage
          : commentBarrageConfig.barrageList.length)
      ) {
        removeCommentBarrage(commentBarrageConfig.barrageTimer.shift());
      }
    }, commentBarrageConfig.barrageTime);
  }
);
if (localStorage.getItem("isBarrageToggle") == undefined) {
  localStorage.setItem("isBarrageToggle", "0");
} else if (localStorage.getItem("isBarrageToggle") == "1") {
  localStorage.setItem("isBarrageToggle", "0");
  switchCommentBarrage();
}
initCommentBarrage();
