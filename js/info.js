let indexPlanet = 0;
let stepState2 = 0;
let finishedBoxes = [];
let planetR = 200;



function ZoomP1() {
  const R = 20;
  const targetR = 25;
  const steps = 100;
  const delta = (targetR - R) / steps;
  const perspective = 400;

  const allBoxes = [
    ...document.querySelectorAll(".pictureBox3dSun"),
    ...document.querySelectorAll(".pictureBox3dMercury"),
    ...document.querySelectorAll(".pictureBox3dVenus"),
    ...document.querySelectorAll(".pictureBox3dEarth"),
    ...document.querySelectorAll(".pictureBox3dMars"),
    ...document.querySelectorAll(".pictureBox3dJupiter"),
    ...document.querySelectorAll(".pictureBox3dSaturn"),
    ...document.querySelectorAll(".pictureBox3dUranus"),
    ...document.querySelectorAll(".pictureBox3dNeptune"),
    ...document.querySelectorAll(".pictureBox3dPluto")
  ];

  const N = allBoxes.length;
  const centerX = window.innerWidth / 2;
  const centerY = window.innerHeight / 2;

  allBoxes.forEach((box, index) => {
    // Ensure position is absolute for movement
    box.style.position = "absolute";

    if (!box.style.left || !box.style.top) {
      const rect = box.getBoundingClientRect();
      box.style.left = `${rect.left}px`;
      box.style.top = `${rect.top}px`;
    }

    // Set consistent size before animating
    box.style.width = `${R}px`;
    box.style.height = `${R}px`;

    animateToCenter(box, index);
  });

  function animateToCenter(box, index) {
    const startX = parseFloat(box.style.left);
    const startY = parseFloat(box.style.top);
    const dx = (centerX - startX) / steps;
    const dy = (centerY - startY) / steps;

    let count = 0;
    let currentR = R;

    function step() {
      if (count < steps) {
        const left = parseFloat(box.style.left);
        const top = parseFloat(box.style.top);

        box.style.left = (left + dx) + "px";
        box.style.top = (top + dy) + "px";

        currentR += delta;
        box.style.width = `${currentR}px`;
        box.style.height = `${currentR}px`;

        count++;
        requestAnimationFrame(step);
      } else {
        changeColor3(box, index)
        moveSphere3(box, index, N);
        finishedBoxes.push({ box, index });

        if (index===(N-1)){
            console.log(index)
            window.addEventListener("keydown", handleKeyPress2);
        }

      }
    }

    step();
  }

  function changeColor3(box,i){
    console.log(indexPlanet);
switch (indexPlanet) {
  case 0:{

    box.style.backgroundColor = "rgb(255, 255, 0)";
      if ((i % 10) === 0) {
         box.style.boxShadow = "0 0 40px 20px rgba(255, 255, 100, 0.9)";
      } else {
        box.style.boxShadow = "none";
      }
    break;
  }
  // Mercury: cratered rocky surface with bigger crater patches
  case 1: {
    box.style.boxShadow = "none";

    if ((i % 185) < 30) box.style.backgroundColor = "rgb(90, 90, 90)";        // crater clusters (scaled up)
    else if ((i % 78) === 0) box.style.backgroundColor = "rgb(169, 169, 169)"; // lighter plains
    else if ((i % 42) < 18) box.style.backgroundColor = "rgb(120, 110, 100)";  // rocky patches
    else box.style.backgroundColor = "rgb(140, 140, 140)";                    // base gray
    break;
  }

  // Venus: thick yellowish clouds with swirling bright and dark patches
  case 2: {
    let modVal = i % 160;
    if (modVal < 24) box.style.backgroundColor = "rgb(210, 190, 110)";        // bright sulfuric clusters
    else if (modVal >= 40 && modVal < 68) box.style.backgroundColor = "rgb(170, 140, 80)"; // darker swirls
    else if ((i + 5) % 44 === 0) box.style.backgroundColor = "rgb(220, 210, 140)";         // light clouds
    else box.style.backgroundColor = "rgb(200, 180, 100)";                    // base yellowish
    break;
  }

  // Earth: blue oceans, green landmasses, white clouds — clumped for continents & clouds
  case 3: {
    let rowLength = 40; // scaled row length for pattern rows (was 15)
    let row = Math.floor(i / rowLength);
    let col = i % rowLength;

    // Create landmass clusters (like continents)
    // Adjusted row/col ranges for bigger grid
    let isLand = (row >= 10 && row <= 25 && col >= 15 && col <= 28);

    // Add some land outliers near edges (islands)
    if ((row === 8 && col === 12) || (row === 27 && col === 30)) isLand = true;

    // Clouds — semi-random clumps using mod
    let isCloud = ((i + 7) % 95 < 12) || ((i + 11) % 75 < 9);

    if (isCloud) {
      box.style.backgroundColor = "rgba(255, 255, 255, 0.85)";  // white clouds with some transparency
    } else if (isLand) {
      if ((i % 18) < 13) box.style.backgroundColor = "rgb(34, 139, 34)"; // dark green forests
      else box.style.backgroundColor = "rgb(144, 238, 144)";           // lighter green grasslands
    } else {
      box.style.backgroundColor = "rgb(30, 144, 255)";                 // deep ocean blue
    }
    break;
  }

  // Mars: red dusty surface with volcanic and canyon clusters
  case 4: {

    let cluster = i % 125;
    if (cluster < 30) box.style.backgroundColor = "rgb(130, 50, 40)";       // volcanic dark clusters
    else if (cluster >= 75 && cluster < 100) box.style.backgroundColor = "rgb(180, 60, 50)"; // dusty patches
    else box.style.backgroundColor = "rgb(200, 80, 60)";                   // red plains
    break;
  }

  // Jupiter: horizontal banded pattern with Great Red Spot clump
  case 5: {

    let rowLength = 50;  // scaled row length 
    let row = Math.floor(i / rowLength);
    let col = i % rowLength;

    // Great Red Spot: cluster around row 25, cols 20-30 (scaled)
    if (row === 25 && col >= 20 && col <= 30) {
      box.style.backgroundColor = "rgb(165, 42, 42)"; // Great Red Spot (reddish)
    } else if (row % 10 < 3) {
      box.style.backgroundColor = "rgb(255, 248, 220)"; // cream light bands
    } else if (row % 10 < 5) {
      box.style.backgroundColor = "rgb(205, 133, 63)";  // brown bands
    } else if (row % 10 < 8) {
      box.style.backgroundColor = "rgb(244, 164, 96)";  // orange bands
    } else {
      box.style.backgroundColor = "rgb(222, 184, 135)"; // base sandy color
    }
    break;
  }

  // Saturn: pale gold bands with subtle variation
  case 6: {

    let rowLength = 50;  // scaled (was 20)
    let row = Math.floor(i / rowLength);
    let col = i % rowLength;

    // Bands with gradual gradients
    if (row % 15 < 5) {
      box.style.backgroundColor = `rgb(${218 + col % 10}, ${165 + col % 10}, ${32 + col % 10})`; // gold band
    } else if (row % 15 < 10) {
      box.style.backgroundColor = `rgb(${255 - col % 15}, ${239 - col % 15}, ${148 - col % 15})`; // pale yellow
    } else {
      box.style.backgroundColor = `rgb(${184 + col % 5}, ${134 + col % 5}, ${11 + col % 5})`;     // darker bands
    }
    break;
  }

  // Uranus: pale blue-green fairly uniform with light patches
  case 7: {

    let cluster = i % 150;
    if (cluster < 30) box.style.backgroundColor = "rgb(176, 224, 230)";    // light cyan patches
    else if (cluster >= 85 && cluster < 110) box.style.backgroundColor = "rgb(143, 188, 143)"; // pale greenish areas
    else box.style.backgroundColor = "rgb(175, 238, 238)";               // base pale turquoise
    break;
  }

  // Neptune: deep blue with lighter patches
  case 8: {

    let cluster = i % 140;
    if (cluster < 25) box.style.backgroundColor = "rgb(25, 25, 112)";     // deep blue spots
    else if (cluster >= 85 && cluster < 110) box.style.backgroundColor = "rgb(72, 61, 139)";  // darker blue
    else box.style.backgroundColor = "rgb(0, 0, 139)";                   // base dark blue
    break;
  }

  // Pluto: icy with brownish rocky patches and some lighter ice
  case 9: {

    let cluster = i % 120;
    if (cluster < 30) box.style.backgroundColor = "rgb(205, 192, 176)";   // icy plains
    else if (cluster >= 54 && cluster < 80) box.style.backgroundColor = "rgb(139, 115, 85)";  // rocky patches
    else if (cluster >= 88) box.style.backgroundColor = "rgb(222, 184, 135)";                 // lighter brownish
    else box.style.backgroundColor = "rgb(188, 143, 143)";                   // muted pinkish base
    break;
  }

  default:
    box.style.backgroundColor = "rgb(128, 128, 128)"; // fallback gray
}

    window.addEventListener("keydown", handleKeyPress2);
    console.log("failed")
    
}

function moveSphere3(box, index, total) {
    box.style.boxShadow = "none";
    const thetaOffset = (Math.PI * (3 - Math.sqrt(5))) * 2;
    const baseTheta = index * thetaOffset;
    const phi = Math.acos(1 - 2 * (index + 0.5) / total);
    let theta = 90;

    function getCenter() {
      return { x: window.innerWidth / 2, y: window.innerHeight / 2 };
    }

function step3d() {
  theta += 0.015;
  const { x: cx, y: cy } = getCenter();

  const radTheta = baseTheta + theta;
  const x3d = planetR * Math.sin(phi) * Math.cos(radTheta);
  const y3d = planetR * Math.cos(phi);
  const z3d = planetR * Math.sin(phi) * Math.sin(radTheta);

  const scaleFactor = perspective + z3d;

  if (scaleFactor <= 1) {
    box.style.display = "none";
  } else {
    box.style.display = "block";

    const scale = perspective / scaleFactor;
    box.style.left = `${cx + x3d * scale}px`;
    box.style.top = `${cy + y3d * scale}px`;
    box.style.transform = `scale(${scale})`;
    box.style.opacity = scale.toFixed(2);
    box.style.zIndex = Math.round(scale * 1000);
  }

  requestAnimationFrame(step3d);
}

    requestAnimationFrame(step3d);
  }

let entercount = 0;

function handleKeyPress2(event) {
  if (event.key === "Enter") {
    indexPlanet = (indexPlanet + 1) % 10;
    if((entercount%2)===1){
        finishedBoxes.forEach(({ box, index }) => {
            changeColor3(box, index);
        });
    }
    finishedBoxes.forEach(({ box, index }) => {
            if(box.style.width != "60px"){
                box.style.width = "60px";
                box.style.height = "60px";
            }
            else{
                box.style.width = "25px";
                box.style.height = "25px";
            }
        });
    showtext(entercount)
    entercount+=1;
  }
}

}

function showtext(entercount){
    if((entercount%2)=== 0){
        planetR = 500;
    }
    else{
        planetR = 200;
    }
    switch (entercount) {
        case 0:
            showtext(entercount)
            const paragraph = document.createElement('p');
            paragraph.textContent = "This is a paragraph added with JavaScript.";

        case 1: 
            showtext(entercount)
        case 2: 
            showtext(entercount)
        case 3: 
            showtext(entercount)
        case 4: 
            showtext(entercount)
        case 5: 
            showtext(entercount)
        case 6: 
            showtext(entercount)   
        case 7: 
            showtext(entercount)  
        case 8: 
            showtext(entercount)    
        break;
    }
}