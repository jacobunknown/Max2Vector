function loadTheme() {
    fetch("themes/" + document.querySelector("#theme").value).then(r => r.text()).then(text => {
        const theme = JSON.parse(text);
        console.log(theme.colors)
        locked_bgcolor = `rgba(${theme.styledefaults.locked_bgcolor[0] * 255}, ${theme.styledefaults.locked_bgcolor[1] * 255}, ${theme.styledefaults.locked_bgcolor[2] * 255}, ${theme.styledefaults.locked_bgcolor[3] * 255})`;
        bgcolor = `rgba(${theme.styledefaults.bgcolor[0] * 255}, ${theme.styledefaults.bgcolor[1] * 255}, ${theme.styledefaults.bgcolor[2] * 255}, ${theme.styledefaults.bgcolor[3] * 255})`;
        bgfillcolor = [`rgba(${theme.styledefaults.bgfillcolor_color1[0] * 255}, ${theme.styledefaults.bgfillcolor_color1[1] * 255}, ${theme.styledefaults.bgfillcolor_color1[2] * 255}, ${theme.styledefaults.bgfillcolor_color1[3] * 255})`, `rgba(${theme.styledefaults.bgfillcolor_color2[0] * 255}, ${theme.styledefaults.bgfillcolor_color2[1] * 255}, ${theme.styledefaults.bgfillcolor_color2[2] * 255}, ${theme.styledefaults.bgfillcolor_color2[3] * 255})`];
        accentcolor = `rgba(${theme.styledefaults.accentcolor[0] * 255}, ${theme.styledefaults.accentcolor[1] * 255}, ${theme.styledefaults.accentcolor[2] * 255}, ${theme.styledefaults.accentcolor[3] * 255})`;
        let p = theme.colors.find(color => {
            return color.id === "patcher_io_unconnected"
        })
        patcher_io_unconnected = `rgba(${p.oncolor[0] * 255}, ${p.oncolor[1] * 255}, ${p.oncolor[2] * 255}, ${p.oncolor[3] * 255})`;
        textcolor = `rgba(${theme.styledefaults.textcolor_inverse[0] * 255}, ${theme.styledefaults.textcolor_inverse[1] * 255}, ${theme.styledefaults.textcolor_inverse[2] * 255}, ${theme.styledefaults.textcolor_inverse[3] * 255})`;
        draw = drawSVG(patch);
        console.log(textcolor)
    })
}

document.querySelector("#theme").addEventListener("change", loadTheme)