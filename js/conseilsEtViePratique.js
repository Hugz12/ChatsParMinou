window.addEventListener("load", createBubble);

function createBubble () {
        var container = document.getElementById("container")
        var bubbles = Array.from(container.children)
        bubbles.forEach(bubble => {
            bubble.innerHTML = "<a>Mon lien</a>";
            bubble.style.setProperty("--position", Math.random() * 80 + 10 + "%");
        //    bubble.style.marginLeft = 150 * Math.random() + "px";
        //    bubble.style.marginRight = 150 * Math.random() + "px";

        //    bubble.style.marginTop = 25 * Math.random() + "px";
        //    bubble.style.marginBottom = 25 * Math.random() + "px";
        });
}