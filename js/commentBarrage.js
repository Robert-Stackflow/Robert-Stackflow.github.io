const commentBarrageConfig = {
    //浅色模式和深色模式颜色，务必保持一致长度，前面是背景颜色，后面是字体，随机选择，默认这个颜色还好
    lightColors: [
        ['var(--lyx-white-acrylic2)', 'var(--lyx-black)'],
    ],
    darkColors: [
        ['var(--lyx-black-acrylic2)', 'var(--lyx-white)'],
    ],
    //同时最多显示弹幕数
    maxBarrage: 2,
    //弹幕显示间隔时间，单位ms
    barrageTime: 3000,
    //twikoo部署地址（Vercel、私有部署），腾讯云的为环境ID
    twikooUrl: "https://cloudchewie-comments.vercel.app/",
    //token获取见前文
    accessToken: "df242fe099bf81ec336572476fbdc208",
    pageUrl: window.location.pathname,
    barrageTimer: [],
    timerList: [],
    barrageList: [],
    barrageIndex: 0,
    // 没有设置过头像时返回的默认头像，见cravatar文档 https://cravatar.cn/developers/api
    noAvatarType: "retro",
    dom: document.querySelector('.comment-barrage'),
    //是否默认显示留言弹幕
    displayBarrage: true,
    isHiddenAutomatically: false,
    //头像cdn，默认cravatar
    avatarCDN: "cravatar.cn",
}

function isInViewPortOfOne(el) {
    const viewPortHeight = window.innerHeight || document.documentElement.clientHeight || document.body.clientHeight
    var offsetTop
    if (el)
        offsetTop = el.offsetTop
    const scrollTop = document.documentElement.scrollTop
    const top = offsetTop - scrollTop
    return top <= viewPortHeight
}
document.onscroll = function() {
    if (commentBarrageConfig.displayBarrage) {
        if (isInViewPortOfOne(document.getElementById("post-comment"))) {
            if (document.getElementsByClassName("comment-barrage")[0])
                document.getElementsByClassName("comment-barrage")[0].setAttribute("style", `display:none;`)
            commentBarrageConfig.isHiddenAutomatically = true;
            if (document.getElementById("switch_commentBarrage"))
                document.getElementById("switch_commentBarrage").setAttribute("style", `display:none;`)
        } else {
            if (document.getElementsByClassName("comment-barrage")[0])
                document.getElementsByClassName("comment-barrage")[0].setAttribute("style", "")
            commentBarrageConfig.isHiddenAutomatically = false;
            if (document.getElementById("switch_commentBarrage"))
                document.getElementById("switch_commentBarrage").setAttribute("style", "")
        }
    }
}

function initCommentBarrage() {
    var data = JSON.stringify({
        "event": "COMMENT_GET",
        "commentBarrageConfig.accessToken": commentBarrageConfig.accessToken,
        "url": commentBarrageConfig.pageUrl
    });
    var xhr = new XMLHttpRequest();
    xhr.withCredentials = true;
    xhr.addEventListener("readystatechange", function() {
        if (this.readyState === 4) {
            commentBarrageConfig.barrageList = commentLinkFilter(JSON.parse(this.responseText).data);
            if (commentBarrageConfig.dom) {
                commentBarrageConfig.dom.innerHTML = '';
            }
        }
    });
    xhr.open("POST", commentBarrageConfig.twikooUrl);
    xhr.setRequestHeader("Content-Type", "application/json");
    xhr.send(data);
    timer = setInterval(() => {
        if (commentBarrageConfig.barrageList.length) {
            popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
            commentBarrageConfig.barrageIndex += 1;
            commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
        }
        if (commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length)) {
            removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
        }
    }, commentBarrageConfig.barrageTime)
    commentBarrageConfig.timerList.push(timer)

}

function commentLinkFilter(data) {
    data.sort((a, b) => {
        return a.created - b.created;
    })
    let newData = [];
    data.forEach(item => {
        newData.push(...getCommentReplies(item));
    });
    return newData;
}

function getCommentReplies(item) {
    if (item.replies) {
        let replies = [item];
        item.replies.forEach(item => {
            replies.push(...getCommentReplies(item));
        })
        return replies;
    } else {
        return [];
    }
}

function popCommentBarrage(data) {
    let barrage = document.createElement('div');
    let width = commentBarrageConfig.dom.clientWidth;
    let height = commentBarrageConfig.dom.clientHeight;
    barrage.className = 'comment-barrage-item'
    let ran = Math.floor(Math.random() * commentBarrageConfig.lightColors.length)
    document.getElementById("barragesColor").innerHTML = `[data-theme='light'] .comment-barrage-item { background-color:${commentBarrageConfig.lightColors[ran][0]};color:${commentBarrageConfig.lightColors[ran][1]}}[data-theme='dark'] .comment-barrage-item{ background-color:${commentBarrageConfig.darkColors[ran][0]};color:${commentBarrageConfig.darkColors[ran][1]}}`;

    barrage.innerHTML = `
		<div class="barrageHead">
			<img class="barrageAvatar" src="https://${commentBarrageConfig.avatarCDN}/avatar/${data.mailMd5}?d=${commentBarrageConfig.noAvatarType}"/>
			<div class="barrageNick">${data.nick}</div>
			<a href="javascript:switchCommentBarrage()" style="font-size:20px">×</a>
		</div>
		<div class="barrageContent">${data.comment}</div>
	`
    commentBarrageConfig.barrageTimer.push(barrage);
    commentBarrageConfig.dom.append(barrage);
}

function removeCommentBarrage(barrage) {
    barrage.className = 'comment-barrage-item out';

    if (commentBarrageConfig.maxBarrage != 1) {
        setTimeout(() => {
            commentBarrageConfig.dom.removeChild(barrage);
        }, 1000)
    } else {
        commentBarrageConfig.dom.removeChild(barrage);
    }
}
switchCommentBarrage = function() {
    commentBarrageConfig.displayBarrage = !(commentBarrageConfig.displayBarrage);
    if (commentBarrageConfig.displayBarrage)
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.comment_barrage_open)
    else
        GLOBAL_CONFIG.Snackbar !== undefined && btf.snackbarShow(GLOBAL_CONFIG.Snackbar.comment_barrage_close)
    let commentBarrage = document.querySelector('.comment-barrage');
    if (commentBarrage) {
        $(commentBarrage).toggle()
    }

}
$(".comment-barrage").hover(function() {
    for (i = 0; i < commentBarrageConfig.timerList.length; i++) {
        clearInterval(commentBarrageConfig.timerList[i])
    }
}, function() {
    timer = setInterval(() => {
        if (commentBarrageConfig.barrageList.length) {
            popCommentBarrage(commentBarrageConfig.barrageList[commentBarrageConfig.barrageIndex]);
            commentBarrageConfig.barrageIndex += 1;
            commentBarrageConfig.barrageIndex %= commentBarrageConfig.barrageList.length;
        }
        if ((commentBarrageConfig.barrageTimer.length > (commentBarrageConfig.barrageList.length > commentBarrageConfig.maxBarrage ? commentBarrageConfig.maxBarrage : commentBarrageConfig.barrageList.length))) {
            removeCommentBarrage(commentBarrageConfig.barrageTimer.shift())
        }
    }, commentBarrageConfig.barrageTime)
    commentBarrageConfig.timerList.push(timer)
})
initCommentBarrage()