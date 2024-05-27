let draw;
const input = document.querySelector("#fileInput");
let patch;

input.addEventListener("change", event => {
    const file = input.files[0]

    let read = new FileReader()
    read.readAsText(file)
    read.onloadend = function() {
        patch = JSON.parse(read.result).patcher;
        draw = drawSVG(patch);
    }
});

document.querySelector("#export").addEventListener("click", function() {
    const base64doc = btoa(unescape(encodeURIComponent(draw.svg())));
    const a = document.createElement('a');
    const e = new MouseEvent('click');

    a.download = 'download.svg';
    a.href = 'data:text/html;base64,' + base64doc;
    a.dispatchEvent(e);
})

loadTheme()