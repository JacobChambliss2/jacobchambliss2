const N = 1000;
let R = 200;
let rchange = 0;

function getCenter() {
  return {
    x: window.innerWidth / 2,
    y: window.innerHeight / 2
  };
}

function squarefromtop() {
  for (let i = 0; i < N; i++) {
    const box = document.createElement("div");
    box.className = "pictureBox";
    box.style.top = "0px";
    box.style.left = (getCenter().x - R - 30) + "px";

    const hue = (i * 360 / 500);
    box.style.backgroundColor = `hsl(${hue}, 100%, 50%)`;
    box.style.width = "50px";
    box.style.height = "50px";

    document.body.appendChild(box);
    setTimeout(() => movePicDown(box, i), i * 10);
  }
}

function movePicDown(box, index) {
  let position = 0;
  const maxPosition = window.innerHeight / 2;

  function step() {
    if (position < maxPosition) {
      position += 20;
      box.style.top = position + "px";
      requestAnimationFrame(step);
    } else {
      moveCircle(box, index);
    }
  }
  requestAnimationFrame(step);
}

function moveCircle(box, index) {
  let angle = 180;
  const radius = R + 30;

  function step() {
    const { x: centerX, y: centerY } = getCenter();
    angle -= 20;
    const x = radius * Math.cos(angle * Math.PI / 180);
    const y = radius * Math.sin(angle * Math.PI / 180);
    box.style.left = (centerX + x) + "px";
    box.style.top = (centerY + y) + "px";

    if (angle > 90) {
      requestAnimationFrame(step);
    } else {
      box.classList.replace("pictureBox", "pictureBox3d");
      moveSphere(box, index, angle);
      if (index === (N - 1)) {
        colorchange();
      }
    }
  }

  requestAnimationFrame(step);
}

function moveSphere(box, index, initialTheta) {
  let theta = initialTheta;
  const perspective = 400;

  const phi = Math.acos(1 - 2 * (index + 0.5) / N);
  const thetaOffset = (Math.PI * (3 - Math.sqrt(5)) * 2);
  const baseTheta = index * thetaOffset;

  function step3d() {
    theta += 0.01;
    const { x: centerX, y: centerY } = getCenter();

    const radTheta = baseTheta + theta;
    const radPhi = phi;

    const x3d = R * Math.sin(radPhi) * Math.cos(radTheta);
    const y3d = R * Math.cos(radPhi);
    const z3d = R * Math.sin(radPhi) * Math.sin(radTheta);

    const safeZ = Math.max(z3d, -perspective + 1);
    const scale = Math.max(0.3, perspective / (perspective + safeZ));
    const x2d = centerX + x3d * scale;
    const y2d = centerY + y3d * scale;

    box.style.left = x2d + "px";
    box.style.top = y2d + "px";
    box.style.transform = `scale(${scale})`;
    box.style.opacity = scale.toFixed(2);
    box.style.zIndex = Math.round(scale * 1000);

    requestAnimationFrame(step3d);
  }

  requestAnimationFrame(step3d);
}

function colorchange() {
  const allBoxes = document.querySelectorAll(".pictureBox3d");
  const steps = 20;
  const targetR = R * 0.01;
  const delta = (targetR - R) / steps;

  let count = 0;

  function animateRadius() {
    if (count >= steps) {
      colorchange2();
      return;
    }

    R += delta;
    count++;

    allBoxes.forEach((box) => {
      if (count > 10) {
        box.style.width = "5px";
        box.style.height = "5px";
      }
      box.style.backgroundImage = "none";
      box.style.backgroundColor = "white";
    });

    requestAnimationFrame(animateRadius);
  }

  animateRadius();
}

function colorchange2() {
  const allBoxes = document.querySelectorAll(".pictureBox3d");
  const steps = 20;
  const targetR = 200;
  const delta = (targetR - R) / steps;

  let count = 0;

  function animateRadius() {
    if (count >= steps) {
      colorchange2();
      return;
    }

    R += delta;
    count++;

    allBoxes.forEach((box) => {
      if (count > 10) {
        box.style.width = "50px";
        box.style.height = "50px";
      }
      box.style.backgroundImage = "none";
      box.style.backgroundColor = "blue";
    });

    requestAnimationFrame(animateRadius);
  }

  animateRadius();
}
