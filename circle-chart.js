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

const data = [
  { name: 'Atividade', count: bandSize },
  { name: 'Visita', count: bandSize },
  { name: 'Arroz', count: bandSize },
  { name: 'Esfirra', count: bandSize },
  { name: 'Naruto', count: bandSize },
  { name: 'KingKingz', count: bandSize },
];

let arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
      // .startAngle(0)
      // .endAngle((Math.PI * 2) / 6);

let pie = d3.pie()
      .sort(null)
      .value(d => d.count);

let svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' +  width / 2 + ',' + height / 2 + ')');

const g = svg.selectAll('.arc')
      .data(pie(data))
      .enter().append('g')
      .attr('class', 'arc');

g.append('path').attr('d', arc).style('fill', 'red');
