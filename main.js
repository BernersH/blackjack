/**
 * 定义全局变量
 */
var start = document.getElementById("start"),
    hit = document.getElementById("hit"),
    stand = document.getElementById("stand"),
    upArea = document.getElementById("up-area"),
    downArea = document.getElementById("down-area"),
    restart = document.getElementById("restart"),
    upShow = document.getElementById("up-show"),
    downShow = document.getElementById("down-show");

/**
 * 随机数函数
 */
function random(min, max) {
    return Math.floor(min + Math.random() * (max - min + 1));
}
/**
 * 随机取花色
 */
function getSuit() {
    var suitNum = random(1, 4);
    var suit = "";
    switch (suitNum) {
        case 1:
            suit = "flower";
            break;
        case 2:
            suit = "heart";
            break;
        case 3:
            suit = "peach";
            break;
        case 4:
            suit = "rect";
            break;
    }
    return suit;
}
/**
 * 随机取牌的点数
 */
function getNum() {
    return random(1, 13);
}
/**
 * 是否重复
 */
var arr = [];

function ifNoSame(src) {
    return arr.every(function(e) {
        return (e !== src);
    });
}
/**
 * 去重获得imgSrc
 */
function actSrc() {
    var actnum = 0;
    var num = getNum();
    switch (num) {
        case 11:
            actnum = 10;
            break;
        case 12:
            actnum = 10;
            break;
        case 13:
            actnum = 10;
            break;
        default:
            actnum = num;
    }
    var imgSrc = getSuit() + num;
    if (!ifNoSame(imgSrc)) {
        return actSrc();
    } else if (ifNoSame(imgSrc)) {
        arr.push(imgSrc);

        var thisImg = {
            "num": actnum,
            "imgSrc": imgSrc
        };
        return thisImg;
    }
}
/**
 * 添加数字到两个数组中，求和
 */
var upSum = new Number();
var downSum = new Number();

function getSum(num, e) {
    if (e === "up") {
        upSum += num;
        return upSum;
    } else if (e === "down") {
        downSum += num;
        return downSum;
    }
}
/**
 * 生成花色和数字对应的牌
 */
function rendCard(e) {
    var thisImg = actSrc();
    var imgSrc = thisImg.imgSrc;
    var actnum = thisImg.num;
    getSum(actnum, e);
    var imgNode = document.createElement("img");
    imgNode.src = "img/" + imgSrc + ".png";
    imgNode.style.marginLeft = "-168px";
    if (e == "down") {
        downNum.push(actnum);
    }
    return imgNode;
}
/**
 * 生成背部卡牌
 */
function backCard() {
    var backNode = document.createElement("img");
    backNode.id = "back";
    backNode.src = "img/back.png";
    backNode.style.marginLeft = "-168px";
    return backNode;
}
/**
 * 生成第一张牌
 */
var upNum = [];
var downNum = [];

function rendFirst(e) {
    var thisImg = actSrc();
    var imgSrc = thisImg.imgSrc;
    var actnum = thisImg.num;
    getSum(actnum, e);
    var imgNode = document.createElement("img");
    imgNode.src = "img/" + imgSrc + ".png";
    if (e == "up") {
        upNum.push(actnum);
    } else if (e == "down") {
        downNum.push(actnum);
    }
    return imgNode;
}
/**
 * 判断是否是黑杰克
 */
function judge() {
    var downShow = document.getElementById("down-show");
    if (downNum[0] == 10 && downNum[1] == 1) {
        downShow.textContent = "黑杰克，你赢啦！";
        hit.style.display = "none";
        stand.style.display = "none";
    } else if (downNum[0] == 1 && downNum[1] == 10) {
        downShow.textContent = "黑杰克，你赢啦！";
        hit.style.display = "none";
        stand.style.display = "none";
    } else {
        downShow.textContent = downSum;
    }
}
/**
 * 判断是否爆了
 */
function judgeBoom() {
    var downShow = document.getElementById("down-show");
    if (downSum > 21) {
        downShow.textContent = "你爆啦！";
        hit.style.display = "none";
        stand.style.display = "none";
    } else if (upSum > 21) {
        rendCompAdd();
        downShow.textContent = "电脑爆啦，你赢啦！";
        hit.style.display = "none";
        stand.style.display = "none";
    }
}
/**
 * 判断输赢
 */
function judgeWin() {
    var downShow = document.getElementById("down-show");

    if (upSum > downSum) {
        downShow.textContent = "你输啦！";
        hit.style.display = "none";
        stand.style.display = "none";
    } else if (upSum == downSum) {
        downShow.textContent = "平局";
        hit.style.display = "none";
        stand.style.display = "none";
    } else if (upSum < downSum) {
        downShow.textContent = "你赢啦";
        hit.style.display = "none";
        stand.style.display = "none";
    }
}


/**
 * 设置点击开始来一句按钮
 */
start.addEventListener("click", function() {
        var downShow = document.getElementById("down-show")
        downShow.style.visibility = "visible";
        upArea.appendChild(rendFirst("up"));
        upArea.appendChild(backCard());
        downArea.appendChild(rendFirst("down"));
        downArea.appendChild(rendCard("down"));
        compAdd();
        judge();
        start.style.display = "none";
        restart.style.display = "inline-block";
        hit.style.display = "inline-block";
        stand.style.display = "inline-block";
    })
    /**
     * 设置重来按钮
     */
restart.addEventListener("click", function() {
        upArea.innerHTML = "<div id='up-show' > </div>";
        downArea.innerHTML = "<div id='down-show' > </div>";
        upShow.style.visibility = "hidden";
        downShow.style.visibility = "hidden";
        start.style.display = "inline-block";
        restart.style.display = "none";
        hit.style.display = "none";
        stand.style.display = "none";
        aiArr = [];
        arr = [];
        upSum = 0;
        downSum = 0;
        upNum = [];
        downNum = [];
    })
    /**
     * 设置点击叫牌
     */
hit.addEventListener("click", function() {
    downArea.appendChild(rendCard("down"));
    judge();
    judgeBoom();
});
/**
 * 设置点击听牌
 */
stand.addEventListener("click", function() {
    document.getElementById("back").remove();
    rendCompAdd();
    judgeBoom();
    judgeWin();

})


/**
 * 给AI设计
 */
var aiArr = [];

function compAdd() {
    while (upSum < 14) {
        var aiSrc = actSrc();
        upSum += aiSrc.num;
        aiArr.push(aiSrc.imgSrc);
        if ((upNum[0] == 1 && upNum[1] == 10) || (upNum[0] == 10 && upNum[1] == 1)) {
            rendCompAdd();
            upShow.style.visibility = "visible";
            upShow.textContent = "黑杰克";
            downShow.textContent = "电脑黑杰克，你输啦";
            hit.style.display = "none";
            stand.style.display = "none";
        }
    }

}
/**
 * 生成AI的节点
 */
function rendCompAdd() {
    for (var i = 0; i < aiArr.length; i++) {
        var node = document.createElement("img");
        node.src = "img/" + aiArr[i] + ".png";
        node.style.marginLeft = "-168px";
        upArea.appendChild(node);
    }
    return;
}
