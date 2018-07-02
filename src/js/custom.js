$(document).ready(function () {
    $("#fullpage").fullpage({
        //Навигация
        menu: "#menu",
        anchors: ["page", "slide1", "slide2", "slide3"],
        //sectionsColor: ["#c63d0f", "#1bbc9b", "#7e8f7c"],
        navigationTooltips: ["Секция один", "Секция два", "Секция три", "Секция четыре"],
        slidesNavigation: true,
        loopHorizontal: true,
        scrollOverflow: true,
        afterSlideLoad: function (anchorLink, index, slideAnchor, slideIndex) {

            /* подсвечиваю пункты меню в зависимости от локации */
            let li = document.querySelectorAll("#menu li");
            let str = document.location.href;
            let arr = str.split("/");
            let slide = arr[arr.length - 1];
            let bg = "rgba(255,255,255,.2)";

            for (let i = 0; i < li.length; i++) {
                li[i].style.background = "";
            }

            switch (slide) {
                case "#page":
                    li[0].style.background = bg;
                    break;
                case "slide2":
                    li[1].style.background = bg;
                    break;
                case "slide3":
                    li[2].style.background = bg;
                    break;
                case "slide4":
                    li[3].style.background = bg;
                    break;
                default:
                    li[0].style.background = bg;
            }
            /* Анимация для первого экрана */
            //alert(slideAnchor + " | " + slideIndex); // slide1 | 0
            if (slideAnchor === "slide1") {
                animateOneScreen();
            }
        },
        afterLoad: function (anchorLink, index) {
            if (anchorLink === "page") {
                document.querySelectorAll("#menu li")[0].style.background = "rgba(255,255,255,.2)";
                animateOneScreen();
            }
        },
        onSlideLeave: function (anchorLink, index, slideIndex, direction, nextSlideIndex) {
            if (slideIndex === 0) {
                $("h1").animate({"left": "-130%"});
                $(".i").fadeOut(100, () => {
                    $(".i").css({"display": ""});
                });
            }
        },
        afterRender: function(){
            /******************************************************************/
            /* Анимация SVG кругов */

            startAnimate();

            function startAnimate() {
                let circles = document.querySelectorAll('.circles');
                let item = document.querySelectorAll('.item');
                let numArr = [];

                function takePercentage(str) {
                    // Либо так:
                    //console.log(str.slice(-2));
                    //return str.slice(-2);
                    //Либо так:
                    let s = str.split("circle-");
                    //console.log(s[1]);
                    return s[1];
                }

                function runNum(el, stopNum, speed) {
                    let timerId = setInterval(function () {

                        let s = el.lastElementChild.textContent;
                        s = s.substring(0, s.length - 1);
                        s++;
                        el.lastElementChild.innerHTML = s + "%";
                        if (el.lastElementChild.textContent == stopNum + "%") {
                            clearInterval(timerId);
                        }

                    }, speed);
                }

                for (let i = 0; i < circles.length; i++) {
                    numArr.push(takePercentage(circles[i].lastElementChild.getAttribute('class')));
                }

                runNum(item[0], numArr[0], 50);
                runNum(item[1], numArr[1], 100);
                runNum(item[2], numArr[2], 170);

                /*Анимация кругов*/
                let oneCircle = document.querySelector(".circles .circle-73");
                let twoCircle = document.querySelector(".circles .circle-44");
                let threeCircle = document.querySelector(".circles .circle-47");

                aggregate(oneCircle, 217, 18);
                aggregate(twoCircle, 132, 30);
                aggregate(threeCircle, 157, 50);

                function aggregate(el, stopNum, speed) {
                    let timerId = setInterval(function () {

                        let styleArr = getComputedStyle(el);
                        let firstVal = styleArr.strokeDasharray.split(" ");
                        firstVal[0] = firstVal[0].substring(0, firstVal[0].length - 3);
                        el.style.strokeDasharray = Math.floor(firstVal[0]) + 1 + ", 282.6";

                        if (el.style.strokeDasharray == stopNum + ", 282.6") {
                            clearInterval(timerId);
                        }

                    }, speed);
                }

            }

            /******************************************************************/
        },
    });
});

/* функция анимации первого экрана */
function animateOneScreen() {
    $("h1").delay(100).animate({"left": "0%"}, 1000);
    $(".i").delay(100).fadeIn(1500, () => {
        $(".i").css({"display": "block"});
    });
}

let exampleVue = new Vue({
    el: "#app",
    data: {},
    methods: {
        oneStep(e) {

            let sizeClient = '';

            if (e.target.nodeName === "DIV" || e.target.nodeName === "H2" || e.target.nodeName === "SPAN") {
                let name_project = e.target.parentElement.dataset.nameProject;
                sizeClient = addEl(name_project, e.target.parentElement);
            } else if (e.target.nodeName === "IMG") {
                let name_project = e.target.parentElement.parentElement.dataset.nameProject;
                sizeClient = addEl(name_project, e.target.parentElement.parentElement);
            } else if (e.target.nodeName === "A") {
                let name_project = e.target.dataset.nameProject;
                sizeClient = addEl(name_project, e.target);
            }

            if (sizeClient) {
                e.currentTarget.parentElement.classList.add("worksView");
                let work = document.querySelectorAll(".work");
                for (let i = 0; i < work.length; i++) {
                    work[i].classList.add("workView");
                }
            }
        },
    }
});

const description = {
    lash: " Делал для подруги друга, - идея, дизайн, верстка( первый опыт с Bootstrap ), немного JavaScript, и все это приправленно PHP -ой формой отзывов. ( 3 дня )",
    erp: " Делал в течении курса по верстке, в школе 'Артёма Исламова'. Здесь только верстка немного JavaScript + адаптив ( 14 дней ), так же в этой школе работал на платформе, - админом и контент менеджером.",
    secret: " Делал для заказчика который пожелал быть инкогнито. Дизайн, вёрстка + перенос на CMS WordPress. ( 2 дня ).",
    portf: " Однажды с ребятами с курса по PHP решили выйти поработать на фриланс биржи, я делал для команды визитку,- дизайн + верстка( адаптив ). ( 2 дня )",
    stas: " Поехал в город Краснодар, на своё первое собеседование, меня не взяли, но приютил старый друг, и я ему за это сделал сайт визитку: " +
    "дизайн логотипа + дизайн сайта + вёрстка + перенос сайта на CMS WordPress + написал плагин который обрабатывает форму заказа, обратного звонка и отправляет письмо хозяину сайта. " +
    "Плагин написал на PHP для WP.",
    shop: " Побывав в городе Краснодар очень понравился магазин игрушек, в основном там продавали героев Marvel и DC. " +
    "Решил написать оналайн магазин под него. Магазин пока не готов, в свободное время пишу." +
    "Дизайн + верстка + можно сказать своя CMS: PHP + OOP + MVC + MySQL."
};

function addEl(name_project, target) {

    if (document.documentElement.clientWidth <= 1019) {
        window.open(target.href);
        return false;
    }

    let app = document.querySelector("#app");
    let delDescription = document.querySelector(".description");
    let div = document.createElement("div");
    let p = document.createElement("p");
    let h2 = document.createElement("h2");
    let img = document.createElement("img");
    let btn = document.createElement("a");
    let wrapView = document.createElement("div");
    let spanDel = document.createElement("span");

    spanDel.innerHTML = "&times;";

    wrapView.classList.add("description");
    p.innerText = description[name_project];
    h2.innerText = target.firstElementChild.textContent;

    btn.href = target.href;
    btn.target = "_blank";
    btn.textContent = "На сайт";
    img.src = target.firstElementChild.nextElementSibling.firstElementChild.src
    if (delDescription) { // удаляю описание для добавление нового описания
        delDescription.remove();
    }
    app.appendChild(wrapView);
    div.appendChild(h2);
    div.appendChild(img);
    div.appendChild(p);
    div.appendChild(btn);
    div.appendChild(spanDel);

    wrapView.innerHTML = div.innerHTML; // добавляю на страницу

    /* удаляю добавленный description */
    let crisDel = document.querySelector(".description span");
    crisDel.addEventListener("click", () => {
        crisDel.parentElement.remove();
        backBlock();
    });

    emulateEvent(window);
    return true;
}

function emulateEvent(target) {
    let ev = new CustomEvent("resize");
    target.dispatchEvent(ev);
}

function backBlock() {
    let works = document.querySelector('.works');
    works.classList.remove("worksView");
    let work = document.querySelectorAll(".work");
    for (let i = 0; i < work.length; i++) {
        work[i].classList.remove("workView");
    }
}


