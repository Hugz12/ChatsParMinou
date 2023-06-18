var width = window.innerWidth;
        
function resize() {
    width = window.innerWidth;

    svg.attr("width", width).attr("height", height);
    simulation.force("center", d3.forceCenter(width / 2, height / 2));
    simulation.restart();
}

window.addEventListener("resize", resize);

const height = 700;
const numNodes = 15;
const radius = 60; // Taille initiale des boules
const maxScale = 1.7; // Échelle maximale lorsqu'une boule est proche de la souris
const strength = 1; // Force de répulsion entre les boules
const collisionRadius = radius * 1.30; // Rayon de collision pour les boules

// Ajoutez vos textes et liens personnalisés ici
const data = [
    { text: "OpenAI", link: "https://openai.com" },
    { text: "Google", link: "https://www.google.com" },
    { text: "GitHub", link: "https://github.com" },
    { text: "Wikipedia", link: "https://www.wikipedia.org" },
    { text: "Facebook", link: "https://www.facebook.com" },
    { text: "OpenAI", link: "https://openai.com" },
    { text: "Google", link: "https://www.google.com" },
    { text: "GitHub", link: "https://github.com" },
    { text: "Wikipedia", link: "https://www.wikipedia.org" },
    { text: "Facebook", link: "https://www.facebook.com" },
    { text: "OpenAI", link: "https://openai.com" },
    { text: "Google", link: "https://www.google.com" },
    { text: "GitHub", link: "https://github.com" },
    { text: "Wikipedia", link: "https://www.wikipedia.org" },
    { text: "Facebook", link: "https://www.facebook.com" },
    { text: "OpenAI", link: "https://openai.com" },
    { text: "Google", link: "https://www.google.com" },
    { text: "GitHub", link: "https://github.com" },
    { text: "Wikipedia", link: "https://www.wikipedia.org" },
];

const nodes = d3.range(numNodes).map((d, i) => {
    return { radius: radius, scale: 1, x: width / 2, y: height / 2, text: data[i].text, data: data[i] };
});

const simulation = d3.forceSimulation(nodes)
    .force("charge", d3.forceManyBody().strength(strength))
    .force("collision", d3.forceCollide().radius(collisionRadius).strength(0.1));

const svg = d3.select("#svg-container")
    .attr("width", width)
    .attr("height", height);

let g = svg.append("g"); 
// fait en sorte que g soient plus large

const circles = g.selectAll("circle")
    .data(nodes)
    .enter()
    .append("a") // Ajout de l'élément <a>
    .attr("xlink:href", d => d.data.link) // Définition du lien
    .append("circle")
    .attr("r", d => d.radius)
    .attr("fill", "#FFC107")

const textLabels = g.selectAll("text")
    .data(nodes)
    .enter()
    .append("a") // Ajout de l'élément <a>
    .attr("xlink:href", d => d.data.link) // Définition du lien
    .append("text")
    .attr("x", d => d.x)
    .attr("y", d => d.y)
    .attr("text-anchor", "middle")
    .attr("dy", "0.3em")
    .style("font-size", d => d.radius * 0.2)
    .style("font-family", "Arial")
    .text(d => d.text);

simulation.on("tick", () => {
    circles
        .attr("cx", d => d.x)
        .attr("cy", d => d.y)
        .attr("r", d => d.radius * d.scale);

    textLabels
        .attr("x", d => d.x)
        .attr("y", d => d.y + (d.radius * d.scale * 0.1))
        .style("font-size", d => (d.radius * d.scale * 0.4) + "px");
});

svg.on("mousemove", (event) => {
    const mouseX = event.clientX;
    const mouseY = event.clientY;

    nodes.forEach(node => {
        const dx = node.x - mouseX;
        const dy = node.y - mouseY;
        const distance = Math.sqrt(dx * dx + dy * dy);
        const maxDistance = radius * 3;

        if (distance < maxDistance) {
            const scale = 1 + (maxDistance - distance) / maxDistance;
            node.scale = Math.min(scale, maxScale);
        } else {
            node.scale = 1;
        }
    });

    simulation.alpha(1).restart();
});

svg.on("mouseleave", () => {
    nodes.forEach(node => {
        node.scale = 1;
    });

    simulation.alpha(1).restart();
});
resize();
simulation.restart();