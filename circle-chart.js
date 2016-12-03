const margin = {
  top: 20,
  right: 20,
  left: 20,
  bottom: 20,
};

const point = function(x, y) {
  this.x = x;
  this.y = y;
};

const band = function(center, minRadius, maxRadius, bandNo) {
  this.center    = center;
  this.minRadius = minRadius;
  this.maxRadius = maxRadius;
  this.bandNo    = bandNo;
};

const width  = 500 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;
const bandSize = 100 / 6;
const radius = width / 2;

const multilevelChart = [];
const color = d3.scaleOrdinal(d3.schemeCategory20);

const data = [
  { id: 0, name: 'Atividade', count: bandSize },
  { id: 1, name: 'Visita', count: bandSize },
  { id: 2, name: 'Arroz', count: bandSize },
  { id: 3, name: 'Esfirra', count: bandSize },
  { id: 4, name: 'Naruto', count: bandSize },
  { id: 5, name: 'KingKingz', count: bandSize },
];

let svg = d3.select('body').append('svg')
        .attr('width', width)
        .attr('height', height)
        .append('g')
        .attr('transform', 'translate(' +  width / 2 + ',' + height / 2 + ')');

const setMultilevelChart = function(data) {
  if(!data) return false;

  let level   = data.length;
  let counter = 0;
  let index   = 0;
  let currentLevelData = [];
  let queue = [];

  for (let i = 0; i < data.length; i++) {
    queue.push(data[i]);
  }

  while (queue.length > 0) {
    let node = queue.shift();
    currentLevelData.push(node);
    level--;
  }
};

const drawChart = function(_data) {
  let arc = d3.arc()
        .outerRadius(radius - 10)
        .innerRadius(120);

  let pie = d3.pie()
        .sort(null)
        .value(d => d.count);

  const g = svg.selectAll('.arc')
        .data(pie(_data))
        .enter().append('g')
        .attr('class', 'arc');

  g.append('path').attr('d', arc).style('fill', d => color(d.data.id));
};

drawChart(data);
