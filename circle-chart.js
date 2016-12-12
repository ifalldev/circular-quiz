multiLevelCircleChart = function(bandList, bandNivel) {
  const width      = 500;
  const height     = 500;
  const bandLength = bandList.length;
  const bandSize   = 100 / bandLength;
  const maxRadius  = width / 2;
  const color      = d3.scaleOrdinal(d3.schemeCategory20);
  const rtn        = {};
  let pieWidth;
  let svg = d3.select('body').append('svg')
      .attr('width', 800)
      .attr('height', 800)
      .append('g')
      .attr('transform', 'translate(' +  380 + ',' + 350 + ')');
  let multilevelChart = [];

  // PRODUZ O ARRAY QUE CONTEM TODOS OS NIVEIS DO GRAFICO
  // (cada item do array eh um arco completo)
  this.setMultilevelChart = function(list) {
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
  this.setMultilevelChart(bandList);
  pieWidth  = parseInt(maxRadius / multilevelChart.length) - multilevelChart.length;
  // CONSTROI UM NIVEL(ARCO/DONUT CHART) DO GRAFICO
  this.drawChart = function(_data, index) {
    this.pie = d3.pie()
          .sort(null)
          .value(() => bandSize);

    let arc = d3.arc()
          .outerRadius((index + 1) * pieWidth - 1)
          .innerRadius(index * pieWidth);

    this.g = svg.selectAll('.arc' + index)
          .data(this.pie(_data))
          .enter().append('g')
          .attr('class', 'arc' + index)
          .attr('id', d => 'band' + d.data.id)
          .on('click', function(d) {
            const idObject = $(this).attr('id');
            const currentLevel = d.data.id;
            bandItems = d3.selectAll('#' + idObject)._groups[0];

            bandItems.forEach((item, i) => {
              if(i <= index) {
                d3.select(item)
                    .select('path')
                    .style('fill', j => d3.rgb(color(j.data.id)).brighter(1));
              }else{
                d3.select(item)
                    .select('path')
                    .style('fill', j => d3.rgb(color(j.data.id)).darker(1));
              }
            });
          });

    this.g.append('path').attr('d', arc).style('fill', d => color(d.data.id));

    this.g.append('text').attr('transform', d => 'translate(' + arc.centroid(d) + ')')
      .attr('dy', '.35em').style('text-anchor', 'middle')
      .text(() => index + 1);
  };

  this.drawTextChart = function(posY, posX, titles, index) {
    let labelArc = d3.arc()
              .outerRadius(maxRadius + 100)
              .innerRadius(maxRadius);

    const g = svg.selectAll('.arcLabel' + index)
          .data(this.pie(titles))
          .enter().append('g')
          .attr('class', 'arcLabel' + index);

    g.append('text')
        .attr('transform', d => 'translate(' + labelArc.centroid(d) + ')')
        .attr('dy', posY + 'em')
        .attr('dx', '-3em')
        .text(d => d.data);
  };


  this.addTextLabel = function() {
    const arBandList    = [];
    const arMultiLineTexts = [];
    const multiLineTexts = function(item, index) {
      if(!arMultiLineTexts[index]) arMultiLineTexts[index] = [];

      arMultiLineTexts[index].push(item);
    };
    let paddingLine;
    // PROCURA POR QUEBRA DE LINHA
    bandList.map(x => arBandList.push(x.split('\n')));
    // AGRUPA AS LINHAS POR SUA ORDEM, EX:
    // array[0] = TODAS AS PRIMEIRAS LINHAS
    arBandList.map(x => x.map((i, j) => multiLineTexts(i, j)));

    rtn.arBandList = arBandList;
    rtn.arMultiLineTexts = arMultiLineTexts;

    arMultiLineTexts.forEach((i, j, k) => {
      if(k.length < 2) {
        paddingLine = 0;
      } else if (k.length < 3) {
        paddingLine = j;
      } else {
        paddingLine = j - 1;
      }
      // console.log(j,k);
      this.drawTextChart(paddingLine, maxRadius, i, j);
    });
  };

  rtn.create = () => {
    for(let i = 0; i < multilevelChart.length; i++) {
      const _cData = multilevelChart[i];
      this.drawChart(_cData, i);
    }

    this.addTextLabel();

    // for(let i = 0; i < bandLength; i++) {

    // }
  };

  rtn.remove = () => {
    $('g').remove();

    multilevelChart = [];
  };
  rtn.bandList = bandList;

  return rtn;
};
