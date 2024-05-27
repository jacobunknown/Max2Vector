function loadTheme() {
    fetch("themes/" + document.querySelector("#theme").value).then(r => r.text()).then(text => {
        const theme = JSON.parse(text);
        console.log(theme.styledefaults)
        locked_bgColor = `rgba(${theme.styledefaults.locked_bgcolor[0] * 255}, ${theme.styledefaults.locked_bgcolor[1] * 255}, ${theme.styledefaults.locked_bgcolor[2] * 255}, ${theme.styledefaults.locked_bgcolor[3] * 255})`;
        bgColor = `rgba(${theme.styledefaults.bgcolor[0] * 255}, ${theme.styledefaults.bgcolor[1] * 255}, ${theme.styledefaults.bgcolor[2] * 255}, ${theme.styledefaults.bgcolor[3] * 255})`;
        bgFillColor = [`rgba(${theme.styledefaults.bgfillcolor_color1[0] * 255}, ${theme.styledefaults.bgfillcolor_color1[1] * 255}, ${theme.styledefaults.bgfillcolor_color1[2] * 255}, ${theme.styledefaults.bgfillcolor_color1[3] * 255})`, `rgba(${theme.styledefaults.bgfillcolor_color2[0] * 255}, ${theme.styledefaults.bgfillcolor_color2[1] * 255}, ${theme.styledefaults.bgfillcolor_color2[2] * 255}, ${theme.styledefaults.bgfillcolor_color2[3] * 255})`];
        accentColor = `rgba(${theme.styledefaults.accentcolor[0] * 255}, ${theme.styledefaults.accentcolor[1] * 255}, ${theme.styledefaults.accentcolor[2] * 255}, ${theme.styledefaults.accentcolor[3] * 255})`;
        bubble_outlineColor = `rgba(${theme.styledefaults.bubble_outlinecolor[0] * 255}, ${theme.styledefaults.bubble_outlinecolor[1] * 255}, ${theme.styledefaults.bubble_outlinecolor[2] * 255}, ${theme.styledefaults.bubble_outlinecolor[3] * 255})`;
        draw = drawSVG(patch);
    })
}

document.querySelector("#theme").addEventListener("change", loadTheme)