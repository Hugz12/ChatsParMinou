//addEventListener("scroll", scrollFunction);

function scrollFunction() {
    document.getElementById("quiSommesNous").children[0].style.opacity = Math.min(1, Math.max(1 - window.scrollY / 550, 0));
    document.getElementById("quiSommesNous").children[1].style.opacity = Math.min(1, Math.max(1 - (window.scrollY-950) / 550, 0));
}