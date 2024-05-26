function lerp(a, b, alpha) {
    return a + alpha * (b - a)
}

let backgroundColor = "#11181DFF";
let objectColor = "#1C2229FF";
let messageColor = "#282C31FF";
let objectBorderColor = "#707070FF";
let bubbleOutlineColor = "#B3B3B3FF";

const arcSize = 7;

function drawSVG(patch) {
    console.log(patch)
    const draw = SVG().addTo("#svg").size(patch.rect[2], patch.rect[3])

    draw.rect(patch.rect[2], patch.rect[3]).fill(backgroundColor)

    patch.lines.forEach(Line => {
        const line = Line.patchline;
        const sourceBox = patch.boxes.find(box => box.box.id === line.source[0]).box;
        let sourceX = sourceBox.patching_rect[0] + (arcSize / 2);
        let sourceY = sourceBox.patching_rect[1] + sourceBox.patching_rect[3];
        if (line.source[1] == 0) {
            sourceX += 5;
        } else if (line.source[1] == sourceBox.numoutlets - 1) {
            sourceX += sourceBox.patching_rect[2] - arcSize - 5;
        } else {
            sourceX += lerp(5, sourceBox.patching_rect[2] - arcSize - 5, line.source[1] / (sourceBox.numoutlets - 1));
        }

        const destBox = patch.boxes.find(box => box.box.id === line.destination[0]).box;
        let destX = destBox.patching_rect[0] + (arcSize / 2);
        let destY = destBox.patching_rect[1];
        if (line.destination[1] == 0) {
            destX += 5;
        } else if (line.destination[1] == destBox.numinlets - 1) {
            destX += destBox.patching_rect[2] - arcSize - 5;
        } else {
            destX += lerp(5, destBox.patching_rect[2] - arcSize - 5, line.source[1] / (destBox.numinlets - 1));
        }

        draw.path("M" + sourceX + " " + sourceY + " C" + sourceX + " " + (sourceY + 15) + " " + destX + " " + (destY - 15) + " " + destX + " " + destY).stroke({width: 3, color: objectBorderColor, linecap: "round"}).fill("none");
    });

    patch.boxes.forEach(Box => {
        const box = Box.box;

        let fillColor;
        let textColor = "white";
        let radius = 0;

        if (box.maxclass == "message") {
            radius = 5;
            fillColor = messageColor;
        } else if (box.maxclass == "newobj") {
            fillColor = objectColor;
        } else if (box.maxclass == "number") {
            fillColor = objectColor;
        } else if (box.maxclass == "button" || box.maxclass == "toggle") {
            fillColor = objectColor;
        } else if (box.maxclass == "function") {
            fillColor = messageColor;
        } else if (box.maxclass == "comment") {
            fillColor = "none";
            textColor = "#B3B3B3FF";
        }

        draw.rect(box.patching_rect[2], box.patching_rect[3]).radius(radius).move(box.patching_rect[0], box.patching_rect[1]).fill(fillColor)

        let text = box.text || "";
        let textOffset = 4;

        if (box.maxclass == "number") {
            text = "0";
            textOffset = 12;
        }

        draw.text(text).fill(textColor).font(({family: "Arial Regular", size: 12})).move(box.patching_rect[0] + textOffset, box.patching_rect[1] + (box.patching_rect[3] / 2)).leading(0.7)

        if (box.maxclass == "newobj") {
            let borderSize = 4;

            draw.rect(box.patching_rect[2], borderSize).fill(objectBorderColor).move(box.patching_rect[0], box.patching_rect[1])
            draw.rect(box.patching_rect[2], borderSize).fill(objectBorderColor).move(box.patching_rect[0], (box.patching_rect[1] + box.patching_rect[3]) - borderSize)
        }

        if (box.maxclass == "button") {
            const width = box.patching_rect[2] * 0.08333333333;
            draw.circle(box.patching_rect[2] / 1.5).center(box.patching_rect[0] + (box.patching_rect[2] / 2), box.patching_rect[1] + (box.patching_rect[3] / 2)).fill("none").stroke(({width: width, color: messageColor}));
        }

        if (box.maxclass == "toggle") {
            const border = box.patching_rect[2] * 0.25;
            const width = box.patching_rect[2] * 0.08333333333;

            let ax = box.patching_rect[0] + border;
            let ay = box.patching_rect[1] + border;
            let bx = ax + box.patching_rect[2] - (border * 2);
            let by = ay + box.patching_rect[3] - (border * 2);

            draw.line(ax, ay, bx, by).stroke(({width: width, color: messageColor}));

            ax = (box.patching_rect[0] + box.patching_rect[2]) - border;
            ay = box.patching_rect[1] + border;
            bx = ax - box.patching_rect[2] + (border * 2);
            by = ay + box.patching_rect[3] - (border * 2);

            draw.line(ax, ay, bx, by).stroke(({width: width, color: messageColor}));
        }

        if (box.maxclass == "newobj") {
            let clip = draw.clip();
            for (let i = 0; i < box.numinlets; i++) {
                let x = box.patching_rect[0];
                 y = box.patching_rect[1];

                if (i == 0) {
                    x += 5;
                } else if (i == box.numinlets - 1) {
                    x += box.patching_rect[2] - arcSize - 5;
                } else {
                    x += lerp(5, box.patching_rect[2] - arcSize - 5, i / (box.numinlets - 1));
                }

                clip.add(draw.circle(arcSize).center(x + (arcSize / 2), y));
            }
            for (let i = 0; i < box.numoutlets; i++) {
                let x = box.patching_rect[0];
                let y = box.patching_rect[1] + box.patching_rect[3];

                if (i == 0) {
                    x += 5;
                } else if (i == box.numoutlets - 1) {
                    x += box.patching_rect[2] - arcSize - 5;
                } else {
                    x += lerp(5, box.patching_rect[2] - arcSize - 5, i / (box.numoutlets - 1));
                }
                
                clip.add(draw.circle(arcSize).center(x + (arcSize / 2), y).fill(bubbleOutlineColor));
            }
            let rect = draw.rect(box.patching_rect[2], box.patching_rect[3]).fill(bubbleOutlineColor).move(box.patching_rect[0], box.patching_rect[1]);
            rect.clipWith(clip);
        }

        if (box.maxclass == "number") {
            draw.polygon("0,0 6,6 0,12").center(box.patching_rect[0] + (7), box.patching_rect[1] + (box.patching_rect[3] / 2)).fill(objectBorderColor);
        }
    });
    return draw
}

