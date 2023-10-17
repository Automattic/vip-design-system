const Color = require('colorjs.io').default;
const fs = require('fs');
const interpolator = require('natural-spline-interpolator');
const createCsvWriter = require('csv-writer').createObjectCsvWriter;
// import { plot, Plot } from 'nodeplotlib';

const colorsData = fs.readFileSync('colors.json');
const allColors = JSON.parse(colorsData).color;

const channels = ['l', 'a', 'b'];
let output = {};

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
            output: getColor(x).to('srgb').toString({ format: 'hex' }),
        };
    }
    for (let x = 0; x <= 100; x++) {
        colorOutputL[x] = {
            // input: colorRange[x] ? colorRange[x].value : null,
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

    const csvWriter = createCsvWriter({
        path: colorKey + '.csv',
        header: [
            // { id: 'x', title: 'X' },
            { id: 'l', title: 'L' },
            { id: 'a', title: 'A' },
            { id: 'b', title: 'B' },
        ],
    });

    // Generate CSV data
    const csvData = [];
    for (let x = 0; x <= 100; x++) {
        const color = new Color(getColor(x));
        csvData.push({
            // x: x,
            l: color.lab[0],
            a: color.lab[1],
            b: color.lab[2],
        });
    }

    // Write to CSV
    csvWriter
        .writeRecords(csvData)
        .then(() => console.log('The CSV file was written successfully'));

}

// Write output object to a JSON file
fs.writeFile('colorOutput.json', JSON.stringify(output, null, 2), (err) => {
    if (err) throw err;
    console.log('Data written to file');
});

module.exports = getColor;

// const Plot = {
//     x: colorOutputL[],
//     y: colorOutputA[],
//     z: colorOutputB[],
//     type: 'scatter3d',
//   };
//   plot([trace]);
