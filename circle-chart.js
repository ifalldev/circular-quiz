// const margin = {
//   top: 20,
//   right: 20,
//   left: 20,
//   bottom: 20,
// };

const width     = 500;
const height    = 500;
const bandSize  = 100 / 6;
const maxRadius = width / 2;

// const multilevelChart = [];
const color = d3.scaleOrdinal(d3.schemeCategory20);

const bandList  = ['naruto', 'gatos', 'inalador', 'latinha', 'cinzeiro', 'ipad'];
const bandNivel = 5;
 multilevelChart = [];

let svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' +  width / 2 + ',' + height / 2 + ')');

const setMultilevelChart = function(list) {
  for (let i = 0; i < bandNivel; i++) {
    const layer = [];
    let k = 0;
    list.forEach(j => {
      layer.push({id: k, label: j, nivel: i + 1});
      k++;
    }, i);
    // console.log(layer);
    // console.log(i)
    multilevelChart.push(layer);
  }
};

setMultilevelChart(bandList);


  // if(!list) return;

  // let level   = data.length;
  // let counter = 0;
  // // let index   = 0;
  // let currentLevelData = [];
  // let queue = [];

  // for (let i = 0; i < data.length; i++) {
  //   queue.push(data[i]);
  // }

  // while (queue.length > 0) {
  //   let node = queue.shift();
  //   currentLevelData.push(node);
  //   level--;

  //   if(node.subData) {
  //     for(let i = 0; i < node.subData.length; i++) {
  //       queue.push(node.subData[i]);
  //       counter ++;
  //     }
  //   }

  //   if (level < 1) {
  //     level            = counter;
  //     counter          = 0;

  //     multilevelChart.push(currentLevelData);
  //     currentLevelData = [];
  //   }
  // }
// };

const drawChart = function(_data, index) {
  // console.log('chart data', _data);
  let pie = d3.pie()
        .sort(null)
        .value(d => bandSize);

  let arc = d3.arc()
        .outerRadius((index + 1) * pieWidth - 1)
        .innerRadius(index * pieWidth);

  const g = svg.selectAll('.arc' + index)
        .data(pie(_data))
        .enter().append('g')
        .attr('class', 'arc' + index);

  g.append('path').attr('d', arc).style('fill', d => color(d.data.id));

  g.append('text').attr('transform', d => 'translate(' + arc.centroid(d) + ')')
    .attr('dy', '.35em').style('text-anchor', 'middle')
    .text(d => d.data.nivel);
};

// setMultilevelChart(bandList);
const pieWidth  = parseInt(maxRadius / multilevelChart.length) - multilevelChart.length;

MLC = multilevelChart;
for(let i = 0; i < multilevelChart.length; i++) {
  console.log(multilevelChart[i]);
  const _cData = multilevelChart[i];
  drawChart(_cData, i);
}

// data.forEach(d => drawChart([d]));

// drawChart(data);
