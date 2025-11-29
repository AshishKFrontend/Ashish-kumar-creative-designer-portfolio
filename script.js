function valueSetters() {
    gsap.set("#nav a", { y: "-100%", opacity: 0 });
    gsap.set("#home span .child", { y: "100%" })
    gsap.set("#home .row i", { opacity: 0 })
    gsap.set("#visual-iframe", { opacity: 0, scale: 0.8 });
    gsap.set("#footer .reveal", { y: "100%", opacity: 0 });
}

function revealTospan() {
    document.querySelectorAll(".reveal")
        .forEach(function (elem) {
            var Parent = document.createElement("span");
            var Child = document.createElement("span");

            Parent.classList.add("parent");
            Child.classList.add("child");

            Child.innerHTML = elem.innerHTML;

            Parent.appendChild(Child);

            elem.innerHTML = "";
            elem.appendChild(Parent);
        })
}

function loaderAnimation() {
    var tl = gsap.timeline();
    tl
        .from("#loader .child span", {
            x: "100",
            stagger: .2,
            duration: 1,
            delay: 0.4,
            ease: Power3.easeInOut
        })
        .to("#loader .parent .child", {
            y: "-100%",
            duration: 1,
            delay: 0.3,
            ease: Circ.easeInOut
        })
        .to("#loader", {
            height: 0,
            duration: 1,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: "100%",
            top: 0,
            duration: 1,
            delay: -.9,
            ease: Circ.easeInOut
        })
        .to("#green", {
            height: "0%",
            top: 0,
            duration: 1,
            delay: -.5,
            ease: Circ.easeInOut,
            onComplete: function () {
                animationHomepage();
            }
        })
}

function animationHomepage() {

    var tl = gsap.timeline();

    tl
        .to("#nav a", {
            y: 0,
            opacity: 1,
            stagger: 0.2,
            ease: Expo.easeInOut
        })
        .to("#home .parent .child", {
            y: 0,
            duration: 2,
            stagger: .1,
            ease: Expo.easeInOut
        })
        .to("#home .row i ", {
            opacity: 1,
            ease: Expo.easeInOut,
        }, "-=1.5")
        .to("#visual-iframe", {
            opacity: 1,
            scale: 1,
            duration: 1.5,
            ease: Expo.easeInOut,
        }, "-=1.5")
        .to("#footer .reveal", {
            y: 0,
            opacity: 1,
            stagger: 0.05,
            ease: Expo.easeInOut,
            duration: 1
        }, "-=1");
}

function locoInitialize() {
    const scroll = new LocomotiveScroll({
        el: document.querySelector('#main'),
        smooth: true
    });

    document.querySelector("#imgrig").addEventListener("click", () => {
        scroll.update();
    });

    setTimeout(() => {
        scroll.update();
    }, 2000);
    
    scroll.on("scroll", (instance) => {
        document.querySelectorAll("#imgrig .imgcntnr").forEach((cntnr, index) => {
            
            const scrollData = cntnr.getBoundingClientRect();
            
            const progress = (scrollData.top / window.innerHeight) * 2; 

            let initialRotations = [-20, -15, -5];
            let startRotation = initialRotations[index];
            let endRotation = 0; 

            let currentRotation = gsap.utils.interpolate(endRotation, startRotation, Math.abs(progress));
            
            gsap.set(cntnr, { rotation: currentRotation });
        });
    });
}
function initializeGallery(){
  var gallery = document.querySelector('#gallery');
var getVal = function (elem, style) { return parseInt(window.getComputedStyle(elem).getPropertyValue(style)); };
var getHeight = function (item) { return item.querySelector('.content').getBoundingClientRect().height; };
var resizeAll = function () {
    var altura = getVal(gallery, 'grid-auto-rows');
    var gap = getVal(gallery, 'grid-row-gap');
    gallery.querySelectorAll('.gallery-item').forEach(function (item) {
        var el = item;
        el.style.gridRowEnd = "span " + Math.ceil((getHeight(item) + gap) / (altura + gap));
    });
};
gallery.querySelectorAll('img').forEach(function (item) {
    item.classList.add('byebye');
    if (item.complete) {
        console.log(item.src);
    }
    else {
        item.addEventListener('load', function () {
            var altura = getVal(gallery, 'grid-auto-rows');
            var gap = getVal(gallery, 'grid-row-gap');
            var gitem = item.parentElement.parentElement;
            gitem.style.gridRowEnd = "span " + Math.ceil((getHeight(gitem) + gap) / (altura + gap));
            item.classList.remove('byebye');
        });
    }
});
window.addEventListener('resize', resizeAll);
gallery.querySelectorAll('.gallery-item').forEach(function (item) {
    item.addEventListener('click', function () {        
        item.classList.toggle('full');        
    });
});

}
initializeGallery();
revealTospan();
valueSetters();
loaderAnimation();
locoInitialize();
