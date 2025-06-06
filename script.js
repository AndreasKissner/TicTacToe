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
    fields[fieldIndex] = currentPlayer; // Speichert aktuellen SPielzug umd zu wissen anch dem render wer und was dran ist
    clickedCell.innerHTML = currentPlayer === 'circle' // Ternary Operator
        ? generateAnimatedCircleSVG() 
        : generateAnimatedXSVG(); 

        // Hier die alte if Form:
/*         if (currentPlayer === 'circle') {
    clickedCell.innerHTML = generateAnimatedCircleSVG();
} else {
    clickedCell.innerHTML = generateAnimatedXSVG();
}
 */
    clickedCell.onclick = null; // Klick deaktivieren
    currentPlayer = currentPlayer === 'circle' ? 'cross' : 'circle'; // Ternary
    //Alte if
/*     if (currentPlayer === 'circle') {
    currentPlayer = 'cross';
} else {
    currentPlayer = 'circle';
} */

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

  
