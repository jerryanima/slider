let images = [{
    url: "https://images.wallpaperscraft.ru/image/single/devushka_sumerki_oblaka_156445_1280x720.jpg",
    title : "1 фото jhgjfhkjghfjkhgjkdhkgjhdfkjghdkjfhgjkdhgjkdhfgjkdhjgkdhkjdh"
  }, {
    url: "https://images.wallpaperscraft.ru/image/single/devushka_trava_gorod_213102_1280x720.jpg",
    title : "2 фото"
  }, {
    url: "https://images.wallpaperscraft.ru/image/single/siluet_noch_zvezdnoe_nebo_137292_1280x720.jpg",
    title : "3 фото"
  }, {
    url: "https://images.wallpaperscraft.ru/image/single/devushka_pantsir_zajts_167320_1280x720.jpg",
    title : "4 фото"
  }, {
    url: "https://images.wallpaperscraft.ru/image/single/devushka_kotenok_tsvetok_141058_1280x720.jpg",
    title : "5 фото"
}];


function initSlider(options) {
    if (!images || !images.length) return

    options = options || {
        titles: false,
        dots: true,
        autoplay: false    
    };

    let sliderImaages = document.querySelector(".slider__images")
    let sliderArrows = document.querySelector(".slider__arrows")
    let sliderDots = document.querySelector(".slider__dots")
    
    initImages();
    initArrows();
    
    if (options.dots){
        initDots();
    }

    if (options.titles) {
        initTitles();
    }

    if (options.autoplay) {
        initAutoplay();
    }
    
    function initImages() {
        images.forEach((image,index) => {
            let imageDiv = `<div class="image n${index} ${index === 0? "active" : ""}" style="background-image:url(${images[index].url});" data-index="${index}"></div>`; 
            sliderImaages.innerHTML += imageDiv;
        });
    }

    function initArrows() {
        sliderArrows.querySelectorAll(".slider__arrow").forEach(arrow => {
            arrow.addEventListener("click", function(){
                let curNumber = +sliderImaages.querySelector(".active").dataset.index;
                let nextNumber;
                if (arrow.classList.contains("left")){
                    nextNumber = curNumber === 0? images.length - 1 : curNumber - 1;
                } else {
                    nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
                }
                moveSlider(nextNumber);

            });
        });
    };

    function initDots(){
        images.forEach((image,index) => {
            let dot = `<div class="slider__dots-item n${index} ${index === 0? "active" : ""}" data-index="${index}"></div>`
            sliderDots.innerHTML +=dot;
        });
        sliderDots.querySelectorAll(".slider__dots-item").forEach(dot => {
            dot.addEventListener("click", function(){
                moveSlider(this.dataset.index);
            });
        })
    };

    function initTitles(){
        let titleDiv = `<div class="slider__images-title">${images[0].title}</div>`;
        sliderImaages.innerHTML += cropTitle(titleDiv, 50);
    };

    function moveSlider(num){
        sliderImaages.querySelector(".active").classList.remove("active");
        sliderImaages.querySelector(".n" + num).classList.add("active");
        if (options.dots) {
            sliderDots.querySelector(".active").classList.remove("active");
            sliderDots.querySelector(".n" + num).classList.add("active");
        }
        if (options.titles) changeTitle(num);
    }

    function changeTitle(num){
        if (!images[num].title) return;
        let sliderTitle = sliderImaages.querySelector(".slider__images-title");
        sliderTitle.innerText = images[num].title;
    };

    function cropTitle(title, size){
        if (title.length <= size){
            return title;
        } else  {
            return title.substr(0,size) + "...";   
        }
    };

    function initAutoplay(){
        setInterval(() => {
            let curNumber = +sliderImaages.querySelector(".active").dataset.index;
            let nextNumber = curNumber === images.length - 1? 0 : curNumber + 1;
            moveSlider(nextNumber);
        }, options.autoplayInterval);
    };
    
}

let sliderOptions = {
    dots: true,
    titles: true,
    autoplay: true,
    autoplayInterval: 3000
}

document.addEventListener("DOMContentLoaded", function() {
    initSlider(sliderOptions);
});