multiLevelCircleChart = function(bandList, bandNivel) {
  const width     = 500;
  const height    = 500;
  const bandSize  = 100 / 6;
  const maxRadius = width / 2;
  const rtn = {};
  let pieWidth;
  let svg;

  const color = d3.scaleOrdinal(d3.schemeCategory20);

  // const bandList  = ['naruto', 'gatos', 'inalador', 'latinha', 'cinzeiro', 'ipad'];
  // const bandNivel = 5;
  let multilevelChart = [];

  // let svg = d3.select('body').append('svg')
  //         .attr('width', width)
  //         .attr('height', height)
  //         .append('g')
  //         .attr('transform', 'translate(' +  width / 2 + ',' + height / 2 + ')');

  const setMultilevelChart = function(list) {
    for (let i = 0; i < bandNivel; i++) {
      const layer = [];
      let id = 0;
      list.forEach(label => {
        layer.push({id, label});
        id++;
      });
      multilevelChart.push(layer);
    }
  };

  const drawChart = function(_data, index) {
    let pie = d3.pie()
          .sort(null)
          .value(() => bandSize);

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
      .text(() => index + 1);
  };

  rtn.create = function() {
     svg = d3.select('body').append('svg')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' +  width / 2 + ',' + height / 2 + ')');

    setMultilevelChart(bandList);
    pieWidth  = parseInt(maxRadius / multilevelChart.length) - multilevelChart.length;

    for(let i = 0; i < multilevelChart.length; i++) {
      console.log(multilevelChart[i]);
      const _cData = multilevelChart[i];
      drawChart(_cData, i);
    }
  };

  rtn.remove = function() {
    $('svg').remove();

    multilevelChart = [];
  };

  return rtn;
};
