//加载lately.js
if (typeof Lately === "undefined") {
  const script = document.createElement("script");
  script.src =
    "https://cdn.jsdelivr.net/gh/Robert-Stackflow/robert-stackflow.github.io@latest/js/third-party/lately.min.js";
  script.onload = () => {
    Lately.init({ target: ".talk_date" });
  };
  document.head.appendChild(script);
} else {
  Lately.init({ target: ".talk_date" });
}
function fetchMemos() {
  fetch("https://memos.cloudchewie.com/api/memo?creatorId=1&limit=30")
    .then((res) => res.json())
    .then((data) => {
      let items = [],
        html = "";
      data.data.forEach((item) => {
        items.push(formatMemo(item));
      });
      items.forEach((item) => {
        html += `
              <div class="talk_item">
                <div class="talk_content">${item.content}</div>
                <div class="talk_spacer"></div>
                <div class="talk_meta">
                  <img class="no-lightbox no-lazyload avatar" src="https://cdn.jsdelivr.net/gh/Robert-Stackflow/robert-stackflow.github.io@latest/img/index_img/avatar.jpg">
                  <div class="info">
                    <span class="talk_nick">${item.name}</span>
                    <span class="talk_dot">·</span>
                    <span class="talk_date">${item.date}</span>
                  </div>
                </div>
              </div>
              `;
      });
      document.getElementById("talk").innerHTML = html;
      window.Lately && Lately.init({ target: ".talk_date" });
      var times = 0;
      var relayout = setInterval(function () {
        "/nowtime/" == location.pathname &&
          (waterfall("#talk"),
          setTimeout(() => {
            waterfall("#talk");
          }, 300));
        times++;
        if (times > 5) clearInterval(relayout);
      }, 300);
    });
}

function formatMemo(item) {
  //正则式
  const TAG_REG = /#([^\s#]+)/;
  const IMG_REG = /\!\[(.*?)\]\((.*?)\)/g;
  BILIBILI_REG =
    /<a.*?href="https:\/\/www\.bilibili\.com\/video\/((av[\d]{1,10})|(BV([\w]{10})))\/?".*?>.*<\/a>/g;
  NETEASE_MUSIC_REG =
    /<a.*?href="https:\/\/music\.163\.com\/.*id=([0-9]+)".*?>.*<\/a>/g;
  // QQMUSIC_REG = /<a.*?href="https\:\/\/y\.qq\.com\/.*(\/[0-9a-zA-Z]+)(\.html)?".*?>.*?<\/a>/g;
  QQMUSIC_REG =
    /<a.*?href="https\:\/\/y\.qq\.com\/n\/ryqq\/songDetail.*\/([0-9a-zA-Z]+)?".*?>.*?<\/a>/g;
  QQVIDEO_REG =
    /<a.*?href="https:\/\/v\.qq\.com\/.*\/([a-z|A-Z|0-9]+)\.html".*?>.*<\/a>/g;
  YOUKU_REG =
    /<a.*?href="https:\/\/v\.youku\.com\/.*\/id_([a-z|A-Z|0-9|==]+)\.html".*?>.*<\/a>/g;
  YOUTUBE_REG =
    /<a.*?href="https:\/\/www\.youtube\.com\/watch\?v\=([a-z|A-Z|0-9]{11})\".*?>.*<\/a>/g;
  //marked设置
  marked.setOptions({
    breaks: true,
    smartypants: false,
    langPrefix: "language-",
    mangle: false,
    headerIds: false,
  });
  const renderer = new marked.Renderer();
  const linkRenderer = renderer.link;
  renderer.link = (href, title, text) => {
    const localLink = href.startsWith(
      `${location.protocol}//${location.hostname}`
    );
    const html = linkRenderer.call(renderer, href, title, text);
    return localLink
      ? html
      : html.replace(
          /^<a /,
          `<a target="_blank" rel="noreferrer noopener nofollow" `
        );
  };
  marked.use({ renderer });
  //处理内容
  let content = item.content,
    imgls = [],
    text = "";
  content = content
    .replace(TAG_REG, "<span class='tag-span'>#$1</span> ")
    .replace(
      IMG_REG,
      `<a href="$2" data-fancybox="gallery" class="fancybox" data-thumb="$2"><img class="no-lazyload" src="$2"></a>`
    );
  content = marked
    .parse(content)
    .replace(
      BILIBILI_REG,
      "<div class='video-wrapper'><iframe src='//www.bilibili.com/blackboard/html5mobileplayer.html?bvid=$1&as_wide=1&high_quality=1&danmaku=1' scrolling='no' border='0' frameborder='no' framespacing='0' allowfullscreen='true'></iframe></div>"
    )
    .replace(
      NETEASE_MUSIC_REG,
      "<meting-js class='music-wrapper' auto='https://music.163.com/#/song?id=$1'></meting-js>"
    )
    .replace(
      QQMUSIC_REG,
      "<meting-js class='music-wrapper' auto='https://y.qq.com/n/yqq/song/$1.html'></meting-js>"
    )
    .replace(
      QQVIDEO_REG,
      "<div class='video-wrapper'><iframe src='//v.qq.com/iframe/player.html?vid=$1' allowFullScreen='true' frameborder='no'></iframe></div>"
    )
    .replace(
      YOUKU_REG,
      "<div class='video-wrapper'><iframe src='https://player.youku.com/embed/$1' frameborder=0 'allowfullscreen'></iframe></div>"
    )
    .replace(
      YOUTUBE_REG,
      "<div class='video-wrapper'><iframe src='https://www.youtube.com/embed/$1' title='YouTube video player' frameborder='0' allow='accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture' allowfullscreen title='YouTube Video'></iframe></div>"
    );
  //处理资源文件
  if (item.resourceList != undefined) {
    item.resourceList.forEach((e) => {
      if (
        e.externalLink != undefined &&
        e.externalLink != null &&
        e.externalLink != ""
      ) {
        imgls.push(e.externalLink);
      } else {
        imgls.push(
          `https://memos.cloudchewie.com/o/r/${e.id}/${e.publicId}/${e.filename}`
        );
      }
    });
  }
  if (imgls.length > 0) {
    content += `<div class="zone_imgbox">`;
    imgls
      .map((item) => {
        return item.replace(/!\[.*\]\((.*?)\)/, "$1");
      })
      .forEach(
        (e) =>
          (content += `<a href="${e}" data-fancybox="gallery" class="fancybox" data-thumb="${e}"><img class="no-lazyload" src="${e}"></a>`)
      );
    content += "</div>";
  }
  return {
    content: content,
    date: new Date(item.updatedTs * 1000).toLocaleString(),
    text: text.replace(
      /\[(.*?)\]\((.*?)\)/g,
      "[链接]" + `${imgls ? "[图片]" : ""}`
    ),
    name: item.creatorName,
  };
}

fetchMemos();

function parseImage(e) {
  return `<a href="${e}" data-fancybox="gallery" class="fancybox" data-thumb="${e}"><img class="no-lazyload" src="${e}"></a>`;
}
function jumpToComment(e) {
  var n = document.querySelector(".el-textarea__inner");
  n.value = `> ${e}\n\n`;
  n.focus();
  btf.snackbarShow("无需删除空行，直接输入评论即可", !1, 2e3);
}
