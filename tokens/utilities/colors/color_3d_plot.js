const plotly = require('plotly.js-dist-min');

function getColor(x) {
    const labValues = channels.map((channel) => interpolators[channel](x));
    return labValues;
  }
  
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
  const trace = {
    x: lValues,
    y: aValues,
    z: bValues,
    mode: 'markers',
    type: 'scatter3d',
    marker: {
      size: 3,
      color: xValues,
      colorscale: 'Viridis',
      opacity: 0.8,
    },
  };
  
  const layout = {
    scene: {
      xaxis: { title: 'L' },
      yaxis: { title: 'a' },
      zaxis: { title: 'b' },
    },
  };
  
  const data = [trace];
  
  plotly.newPlot('plot', data, layout);
  