const Color = require('colorjs.io').default;
const fs = require('fs');
const interpolator = require('natural-spline-interpolator');

const colorsData = fs.readFileSync('colors.json');
const allColors = JSON.parse(colorsData).color;

const channels = ['l', 'a', 'b'];
let output = {};

for (let colorKey in allColors) {
    const colorArray = allColors[colorKey];
    const inputColors = {};
    const interpolators = {};

    // Process the color array to handle null values and generate the inputColors object
    colorArray.forEach((colorValue, index) => {
        if (colorValue !== null) {
            const x = index * 10; // Convert index to the range 0-100
            inputColors[x] = new Color(colorValue);
        }
    });

    // Create interpolation functions for each channel
    channels.forEach((channel) => {
        const indexedLabColors = [];
        for (let x in inputColors) {
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
        return color.to('srgb').toString({ format: 'hex' });
    }

    // Generate output object for this color
    const colorOutput = {};
    for (let x = 0; x <= 100; x++) {
        colorOutput[x] = {
            input: (typeof colorArray[Math.floor(x / 10)] !== "undefined") ? colorArray[Math.floor(x / 10)] : null,
            output: getColor(x),
        };
    }

    output[colorKey] = colorOutput;


}

fs.writeFileSync('colorOutput.json', JSON.stringify(output, null, 2));

// Generate SVG string based on the output
function generateSVG(output) {
    const svgWidth = 2400;
    const rectWidth = 200;
    const rectHeight = 50;

    let svgContent = `<svg viewBox="0 0 ${svgWidth} 550">`;

    let offsetX = 0;
    for (let colorKey in output) {
        svgContent += `<g id="${colorKey}">`;

        let offsetY = 0;
        for (let x = 0; x <= 100; x++) {
            const color = output[colorKey][x].output;
            svgContent += `<rect x="${offsetX}" y="${offsetY}" width="${rectWidth}" height="${rectHeight}" fill="${color}"/>`;
            offsetY += rectHeight;
        }

        svgContent += `</g>`;
        offsetX += rectWidth;
    }

    svgContent += `</svg>`;
    return svgContent;
}

const svgData = generateSVG(output);

// Write SVG string to SVG file
fs.writeFileSync('colors.svg', svgData);
console.log('Data and SVG written to file');

// Step 1: Read the colorTokens.json into an object.
const tokenData = fs.readFileSync('colorTokens.json');
const colorTokens = JSON.parse(tokenData);

// Step 2: Iterate through the output object and update the corresponding values in the colorTokens object.
for (let colorKey in output) {
    if (colorTokens.color[colorKey]) { // Check if the colorKey exists in colorTokens
        for (let x in output[colorKey]) {
            if (colorTokens.color[colorKey][x]) { // Check if the specific shade exists in colorTokens
                colorTokens.color[colorKey][x].value = output[colorKey][x].output;
            }
        }
    }
}

// Step 3: Save the modified colorTokens object back to colorTokens.json.
fs.writeFileSync('colorTokens.json', JSON.stringify(colorTokens, null, 2));

console.log('colorTokens.json updated with new color values.');


module.exports = getColor;
