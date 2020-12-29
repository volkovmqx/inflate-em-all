let readyToLaunchBalloon = document.getElementById("launch")
let pos = 10;
let width = 100;
let hue = 0;
let timer = null;
let key = null;
let animationlocked = false

function getRandom(min, max) {
    return min + (Math.random() * (max - min));
}

function getRandomInt(min, max) {
    return Math.floor(getRandom(min, max));
}

function addClouds() {
    for (let i = 0; i < 4; i++) {
        let cloud = document.createElement("img");
        cloud.src = "icons/cloud.svg";
        cloud.classList.add("cloud")
        cloud.style.top = (getRandomInt(0, 50)) + "%";
        cloud.animate({
            right: ["-10%", "110%"],
            transform: ["scale(" + getRandom(0.6, 1.4) + ")", "scale(" + getRandom(0.6, 1.4) + ")"],
            opacity: [0, 1, 1, 0],
            offset: [0, 0.1, 0.9, 1],
        }, {
            duration: getRandomInt(20000, 50000),
            delay: getRandomInt(0, 5000),
            direction: getRandomInt(0, 4) > 2 ? "alternate" : "alternate-reverse",
            iterations: Infinity
        });
        document.getElementById("clouds").appendChild(cloud);
    }
}

function addBalloon(altitude, width, hue) {
    let balloon = document.createElement("img");
    balloon.src = "icons/hot-air-balloon.svg";
    balloon.classList.add("balloon")
    balloon.style.bottom = altitude + "px";
    balloon.style.width = width + "px";
    balloon.style.filter = "hue-rotate(" + hue + "deg)";
    balloon.animate({
        right: ["-10%", "110%"],
        transform: ["scale(" + getRandom(0.6, 1.4) + ")", "scale(" + getRandom(0.6, 1.4) + ")"],
        opacity: [0, 1, 1, 0],
        offset: [0, 0.1, 0.9, 1],
    }, {
        duration: getRandomInt(20000, 50000),
        delay: getRandomInt(0, 5000),
        direction: getRandomInt(0, 4) > 2 ? "alternate" : "alternate-reverse",
        iterations: Infinity
    });
    document.getElementById("balloons").appendChild(balloon);
}



function initializeReadyToLaunchBalloon() {
    pos = 10
    width = 100
    hue = getRandomInt(0, 360)
    readyToLaunchBalloon.style.bottom = pos + "px";
    readyToLaunchBalloon.style.width = width + "px";
    readyToLaunchBalloon.style.filter = "hue-rotate(" + hue + "deg)";

}

function inflateBalloon(k) {
    if (key === null && !animationlocked) {
        clearTimeout(timer)
        timer = setInterval(() => {
            key = k
            pos += 1;
            if (pos % 10 == 0) width += 1; // increase width each 10 increments
            readyToLaunchBalloon.style.bottom = pos + "px";
            readyToLaunchBalloon.style.width = width + "px";
        }, 10);
    }
}


function pressSpace(e) {
    if (e.code === 'Space' && !e.repeat) inflateBalloon("space")
}

function pressMouse(e) {
    if (e.which === 1) inflateBalloon("mouse")

}



function releaseBalloon() {
    if (animationlocked) {
        clearTimeout(timer)
        let animation = readyToLaunchBalloon.animate({
            left: ["50%", "-10%"],
            opacity: [1, 1, 1, 0],
            offset: [0, 0.1, 0.9, 1],
        }, {
            duration: getRandomInt(2000, 5000),
            direction: "normal",
            iterations: 1
        });
        animation.onfinish = () => {
            addBalloon(pos, width, hue)
            initializeReadyToLaunchBalloon()
            animationlocked = false
            key = null
        }
    }

}

function unpressSpace(e) {
    if (e.code === 'Space' && key == "space" && !animationlocked) {
        animationlocked = true
        releaseBalloon()
    }
}

function unpressMouse(e) {
    if (e.which === 1 && key === "mouse" && !animationlocked) {
        animationlocked = true
        releaseBalloon()
    }
}


document.addEventListener("mousedown", pressMouse);
document.addEventListener("mouseup", unpressMouse);

document.addEventListener("keydown", pressSpace);
document.addEventListener("keyup", unpressSpace);


addClouds();