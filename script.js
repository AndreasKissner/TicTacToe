let fields = [
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
    null,
]

const winCombos = [
  [0,1,2], [3,4,5], [6,7,8], // Reihen
  [0,3,6], [1,4,7], [2,5,8], // Spalten
  [0,4,8], [2,4,6]           // Diagonalen
];


let currentPlayer = 'circle';  // Aktueller Spieler

function render() {
    let html = '<table>';//Varibale mit dem ANfang des HTML Codes also table

    for (let i = 0; i < 3; i++) {  // àussere Schleife geht 3 mal durch . Es sind 3 Zeilen tr als 3 mal
        html += '<tr>';  // Neue Tabellen zeile tr

        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;// Berechnet den Index im Field Array
            let cellContent = '';  // VAriable für späeteren cellContnent ob x oder o

            if (fields[index] === 'circle') {
                cellContent = generateAnimatedCircleSVG(); // Wenn man Kreis SPeiler drückt kommt Krei
            } else if (fields[index] === 'cross') {  // Wenn Kreuz Spieler drückt dann Kreuz
                cellContent = generateAnimatedXSVG();
            }
            if (fields[index] === null) {
                html += `<td onclick="handleClick(${index}, this)"></td>`;// Fügt eine neues feld hinzu mit kreis oder Kreuz

            } else {
                html += `<td>${cellContent}</td>`; // hier Wird dann Cell content rein gemacht
            }
        }
        html += '</tr>'; //3 Spalte is tvoll wird mit einem tr geschlossen
    }

    html += '</table>';  //Tabelle wird gesxchlossen
    document.getElementById('content').innerHTML = html; // Hier wird der ganze HTML(table) Inhalt auf die Webseite gemacht
}

function handleClick(fieldIndex, clickedCell) {
  fields[fieldIndex] = currentPlayer;
  clickedCell.innerHTML = currentPlayer === 'circle' 
      ? generateAnimatedCircleSVG() 
      : generateAnimatedXSVG();
  clickedCell.onclick = null;

  if (checkWinner()) return;

  currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle';
}


function checkWinner() {
  for (let i = 0; i < winCombos.length; i++) {
    const [a, b, c] = winCombos[i];

    if (
      fields[a] &&
      fields[a] === fields[b] &&
      fields[a] === fields[c]
    ) {
      drawWinLine([a, b, c]);
      return true;
    }
  }
  return false;
}

function drawWinLine(combo) {
  const table = document.querySelector("table");
  const cells = table.querySelectorAll("td");
  const cellA = cells[combo[0]];
  const cellC = cells[combo[2]];

  const tableRect = table.getBoundingClientRect();
  const rectA = cellA.getBoundingClientRect();
  const rectC = cellC.getBoundingClientRect();

  // NEU: Positionen relativ zur Tabelle berechnen
  const x1 = rectA.left - tableRect.left + rectA.width / 2;
  const y1 = rectA.top - tableRect.top + rectA.height / 2;
  const x2 = rectC.left - tableRect.left + rectC.width / 2;
  const y2 = rectC.top - tableRect.top + rectC.height / 2;

  const length = Math.hypot(x2 - x1, y2 - y1);
  const angle = Math.atan2(y2 - y1, x2 - x1) * 180 / Math.PI;

  const line = document.createElement("div");
  line.style.position = "absolute";
  line.style.background = "white";
  line.style.height = "5px";
  line.style.width = `${length + 10}px`;
  line.style.left = `${x1}px`;
  line.style.top = `${y1}px`;
  line.style.transform = `rotate(${angle}deg) translateY(-50%)`;
  line.style.transformOrigin = "left";

  // Linie wird NICHT mehr im Body platziert, sondern in der Tabelle:
  table.style.position = "relative"; // wichtig!
  table.appendChild(line);
}


function generateAnimatedCircleSVG() {
    return `
<svg width="70px" height="70px" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
  <circle
    cx="35"
    cy="35"
    r="30"
    stroke="#00B0EF"
    stroke-width="6"
    fill="none"
    stroke-dasharray="188.4"
    stroke-dashoffset="188.4">
    <animate
      attributeName="stroke-dashoffset"
      from="188.4"
      to="0"
      dur="500ms"
      fill="freeze" />
  </circle>
</svg>`;
}

function generateAnimatedXSVG() {
    return `
<svg width="70px" height="70px" viewBox="0 0 70 70" xmlns="http://www.w3.org/2000/svg">
  <line x1="15" y1="15" x2="55" y2="55"
        stroke="#FF0066" stroke-width="6"
        stroke-linecap="round"
        stroke-dasharray="56.57"
        stroke-dashoffset="56.57">
    <animate attributeName="stroke-dashoffset" from="56.57" to="0" dur="0.6s" fill="freeze" />
  </line>
  <line x1="55" y1="15" x2="15" y2="55"
        stroke="#FF0066" stroke-width="6"
        stroke-linecap="round"
        stroke-dasharray="56.57"
        stroke-dashoffset="56.57">
    <animate attributeName="stroke-dashoffset" from="56.57" to="0" begin="500ms" dur="0.6s" fill="freeze" />
  </line>
</svg>`;
}



window.addEventListener("load", () => {
  render();
});

  
function resetGame() {
    fields = [null, null, null, null, null, null, null, null, null];
    currentPlayer = 'circle';

    // Entferne ggf. die Gewinnlinie:
    const table = document.querySelector("table");
    const lines = table.querySelectorAll("div");
    lines.forEach(line => line.remove());

    render();
}
