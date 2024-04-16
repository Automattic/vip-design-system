const Color = require('colorjs.io').default;
const fs = require('fs');
const interpolator = require('natural-spline-interpolator');
const colorsData = fs.readFileSync('colorInput.json');
const allColors = JSON.parse(colorsData).color;

const channels = ['l', 'a', 'b'];
let output = {};
let outputL = {};
// let colorTokens = {};

for (let colorKey in allColors) {
    const colorRange = allColors[colorKey];
    const inputColors = {};
    const interpolators = {};

    for (let x in colorRange) {
        inputColors[x] = new Color(colorRange[x].value);
    }

    // Create interpolation functions for each channel
    channels.forEach((channel) => {
        const indexedLabColors = [];
        for (let x in colorRange) {
            indexedLabColors.push([
                Number(x),
                inputColors[x].lab[channels.indexOf(channel)],
            ]);
        }

        interpolators[channel] = interpolator(indexedLabColors);
    });

    // Retrieve color based on interpolation values
    function getColor(x) {
        const labValues = channels.map((channel) => interpolators[channel](x));
        const color = new Color({ space: 'lab', coords: labValues });
        return color;
    }

    // Generate output object for this color
    const colorOutput = {};
    const colorOutputL = {};
    const colorOutputA = {};
    const colorOutputB = {};

    for (let x = 0; x <= 100; x++) {
        colorOutput[x] = {
            input: colorRange[x] ? colorRange[x].value : null,
            value: getColor(x).to('srgb').toString({ format: 'hex' }),
            type: 'color',
        };
    }

    // individual lab values

    for (let x = 0; x <= 100; x++) {
        colorOutputL[x] = {
            // input: colorRange[x] ? colorRange[x].value : null,
            diff: Number((getColor(x).lab[0] - (-0.9 * x + 97)).toFixed(1)),
            oldDdiff: Number((getColor(x).lab[0] - (-0.96 * x + 97)).toFixed(1)),
            output: getColor(x).lab[0],
        };
    }
    for (let x = 0; x <= 100; x++) {
        colorOutputA[x] = {
            // input: colorRange[x] ? colorRange[x].value : null,
            output: getColor(x).lab[1],
        };
    }
    for (let x = 0; x <= 100; x++) {
        colorOutputB[x] = {
            // input: colorRange[x] ? colorRange[x].value : null,
            output: getColor(x).lab[2],
        };
    }

    output[colorKey] = colorOutput;
    outputL[colorKey] = colorOutputL;

}

const tokenOutput = { color: output };
const tokenOutputL = { color: outputL };

// Write tokenOutput object to a JSON file
fs.writeFile('colorOutput.json', JSON.stringify(tokenOutput, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

fs.writeFile('colorOutputL.json', JSON.stringify(tokenOutputL, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

// Write svg file for reference in Figma
function writeSVGFile() {
    let svgContent = '<svg xmlns="http://www.w3.org/2000/svg">\n';
    let y = 0;
    let x = 0;

    for (let colorKey in output) {
        const colorRange = output[colorKey];
        const colorDiff = outputL[colorKey];

        for (let i = 0; i <= 100; i++) {
            const colorValue = colorRange[i].value;
            const colorDiffText = colorDiff[i].diff;
            svgContent += `<rect x="${x}" y="${y}" width="80" height="80" fill="${colorValue}"/>\n`;
            // svgContent += `<text x="${x + 40}" y="${y + 40}" width="80" height="80">${colorDiffText}</text>\n`;

            x += 96;
        }

        y += 96; // Increment by 96 for each new colorKey
        x = 0; // reset x to 0
    }

    svgContent += '</svg>';

    fs.writeFile('output.svg', svgContent, (err) => {
        if (err) throw err;
        console.log('SVG file written successfully');
    });
}

writeSVGFile();

module.exports = getColor;
