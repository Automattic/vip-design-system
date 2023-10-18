const plot = require('nodeplotlib');
const getColor = require('./index');

const channels = ['l', 'a', 'b'];
const interpolators = {};

const xValues = Array.from({ length: 100 }, (_, i) => i);
const lValues = [];
const aValues = [];
const bValues = [];

for (let x of xValues) {
	const labColor = getColor(x);
	lValues.push(labColor[0]);
	aValues.push(labColor[1]);
	bValues.push(labColor[2]);
}

const data = [
	{ x: xValues, y: lValues, name: 'L' },
	{ x: xValues, y: aValues, name: 'a' },
	{ x: xValues, y: bValues, name: 'b' },
];

const layout = {
	title: 'Lab Color Space',
	xaxis: { title: 'x' },
	yaxis: { title: 'Lab Value' },
};

plot.plot(data, layout);
