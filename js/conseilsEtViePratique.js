window.addEventListener("load", createBubble);

function createBubble () {
    var maxBubbles = 20
        var container = document.getElementById("container")
        var bubbles = Array.from(container.children)
        bubbles.forEach(bubble => {
           if (maxBubbles > 0) {
            bubble.style.backgroundColor = "red";
            maxBubbles--;
            bubble.innerHTML = "<a>Mon lien</a>"
           }
           bubble.style.marginLeft = 150 * Math.random() + "px";
           bubble.style.marginRight = 150 * Math.random() + "px";

           bubble.style.marginTop = 25 * Math.random() + "px";
           bubble.style.marginBottom = 25 * Math.random() + "px";
        });
}