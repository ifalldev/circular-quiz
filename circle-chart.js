const margin = {
  top: 20,
  right: 20,
  left: 20,
  bottom: 20,
};

const width  = 500 - margin.right - margin.left;
const height = 500 - margin.top - margin.bottom;

const radius = width / 2;

const data = [
  { name: 'Atividade', count: 90 },
  { name: 'Visita', count: 40 },
  { name: 'Arroz', count: 50 },
  { name: 'Esfirra', count: 100 },
  { name: 'Naruto', count: 80 },
  { name: 'KingKingz', count: 30 },
];

const arc = d3.arc()
      .outerRadius(radius - 10)
      .innerRadius(0)
      .startAngle(0)
      .endAngle(Math.PI / 2);

const pie = d3.pie()
      .sort(null)
      .value(d => d.count);

const svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' +  width / 2 + ',' + height / 2 + ')');

console.log('before data', arc);

data.forEach(d => {
  console.log(d);
  console.log(arc);
  const g = svg.selectAll('.arc')
      .data(pie(d))
      .enter().append('g')
      .attr('class', 'arc');

  g.append('path').attr('d', arc).style('fill', 'blue');
});
