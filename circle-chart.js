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
  { id: 0, name: 'Atividade', count: bandSize },
  { id: 1, name: 'Visita', count: bandSize },
  { id: 2, name: 'Arroz', count: bandSize },
  { id: 3, name: 'Esfirra', count: bandSize },
  { id: 4, name: 'Naruto', count: bandSize },
  { id: 5, name: 'KingKingz', count: bandSize },
];

const color = d3.scaleOrdinal()
      .range(['blue', 'yellow', 'red', 'green', 'indigo', 'violet']);

let arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0);
      // .startAngle(180)
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

g.append('path').attr('d', arc).style('fill', d => color(d.data.id));
