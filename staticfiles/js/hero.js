// Hero Slider
const slider = document.getElementById("hero-slider");
const slides = slider.children;
const totalSlides = slides.length;
let index = 0;
let isAnimating = false;

function slideNext() {
  if (isAnimating) return;
  isAnimating = true;

  index++;
  slider.style.transition = "transform 1.2s ease-in-out";
  slider.style.transform = `translateX(-${index * 100}%)`;
}

slider.addEventListener("transitionend", () => {
  // When reaching the cloned slide
  if (index === totalSlides - 1) {
    slider.style.transition = "none";
    index = 0;
    slider.style.transform = "translateX(0)";
  }
  isAnimating = false;
});

setInterval(slideNext, 6500);

(function () {
  function c() {
    var b = a.contentDocument || a.contentWindow.document;
    if (b) {
      var d = b.createElement("script");
      d.innerHTML =
        "window.__CF$cv$params={r:'9c20f3c772ea33e5',t:'MTc2OTEwNDg0MS4wMDAwMDA='};var a=document.createElement('script');a.nonce='';a.src='/cdn-cgi/challenge-platform/scripts/jsd/main.js';document.getElementsByTagName('head')[0].appendChild(a);";
      b.getElementsByTagName("head")[0].appendChild(d);
    }
  }
  if (document.body) {
    var a = document.createElement("iframe");
    a.height = 1;
    a.width = 1;
    a.style.position = "absolute";
    a.style.top = 0;
    a.style.left = 0;
    a.style.border = "none";
    a.style.visibility = "hidden";
    document.body.appendChild(a);
    if ("loading" !== document.readyState) c();
    else if (window.addEventListener)
      document.addEventListener("DOMContentLoaded", c);
    else {
      var e = document.onreadystatechange || function () {};
      document.onreadystatechange = function (b) {
        e(b);
        "loading" !== document.readyState &&
          ((document.onreadystatechange = e), c());
      };
    }
  }
})();

