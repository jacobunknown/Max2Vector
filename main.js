let draw;
const input = document.querySelector("#fileInput");

input.addEventListener("change", event => {
    const file = input.files[0]

    let read = new FileReader()
    read.readAsText(file)
    read.onloadend = function() {
        draw = drawSVG(JSON.parse(read.result).patcher);
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