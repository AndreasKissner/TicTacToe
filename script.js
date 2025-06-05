let fields = [
    "cross",
   "cross",
    "cross",
    null,
    null,
    null,
    null,
    null,
    "circle"
]

function init(){
    render();
}

function render() {
    let html = '<table>';

    for (let i = 0; i < 3; i++) {
        html += '<tr>';
        for (let j = 0; j < 3; j++) {
            let index = i * 3 + j;
            let symbol = fields[index] === 'circle' ?  generateAnimatedCircleSVG():
                         fields[index] === 'cross' ? generateAnimatedXSVG() : '';
            html += `<td>${symbol}</td>`;
        }
        html += '</tr>';
    }

    html += '</table>';
    document.getElementById('content').innerHTML = html;
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

  
