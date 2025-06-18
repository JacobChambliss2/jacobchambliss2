function squarefromtop() {
    for (let i = 0; i < 20; i++) {
        const box = document.createElement("div");
        box.className = "pictureBox";
        box.style.position = "absolute";
        box.style.top = "0px";
        box.style.left = (window.innerWidth / 2 - 200) + "px";

        // Create a canvas and generate a colored square PNG
        const canvas = document.createElement("canvas");
        canvas.width = 50;
        canvas.height = 50;
        const ctx = canvas.getContext("2d");

        // Generate a different color for each square
        const hue = (i * 360 / 20); // spread colors around the color wheel
        ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const img = new Image();
        img.src = canvas.toDataURL(); // Use the canvas as the image source
        img.className = "pictureBox";

        box.appendChild(img);
        document.body.appendChild(box);

        setTimeout(() => {
            movePicDown(box);
        }, i * 300); // shorter delay for more fluid effect
    }
}


function movePicDown(box) {
    let position = 0;
    const maxPosition = window.innerHeight / 2;

    function step() {
        if (position < maxPosition) {
            position += 5;
            box.style.top = position + "px";
            requestAnimationFrame(step); // smooth animation
        } else {
            moveCircle(box);
        }
    }
    requestAnimationFrame(step);
}

function moveCircle(box) {
    let angle = 180; // Start at the bottom
    const radius = 200;
    const centerX = window.innerWidth / 2;
    const centerY = window.innerHeight / 2;

    function step() {
        angle -= 1; // Move counterclockwise
        const x = radius * Math.cos(angle * (Math.PI / 180));
        const y = radius * Math.sin(angle * (Math.PI / 180));
        box.style.left = (centerX + x) + "px";
        box.style.top = (centerY + y) + "px";

        if (angle > -90) { // Continue until reaching the top
            requestAnimationFrame(step);
        }
    }

    requestAnimationFrame(step);
}
