MultiLevelCircleChart = function(chartParentNode, bandList, bandNivel) {
  const width      = 800;
  const height     = 800;
  const bandLength = bandList.length;
  const bandSize   = 100 / bandLength;
  const maxRadius  = 250;
  const color      = d3.scaleOrdinal(d3.schemeCategory20);
  const score      = [];
  const rtn        = {};
  const svg        = d3.select(chartParentNode).append('svg')
      .attr('id', 'multipleCircleChart')
      .attr('width', width)
      .attr('height', height)
      .append('g')
      .attr('transform', 'translate(' +  380 + ',' + 350 + ')');
  const multilevelChart = [];

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
  const pieWidth  = parseInt(maxRadius / multilevelChart.length) - multilevelChart.length;

  const scorePush = newScore => {
    let foundScoredItem = -1;

    score.filter((x, i) => {
      if(x.id === newScore.id) foundScoredItem = i;
    });

    if(foundScoredItem > -1) {
      score.splice(foundScoredItem, 1);
    }

    score.push(newScore);

    this.enablePrint();
  };
  // CONSTROI UM NIVEL(ARCO/DONUT CHART) DO GRAFICO
  this.drawChart = function(_data, index) {
    const that = this;
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
            const bandItems = d3.selectAll('#' + idObject)._groups[0];
            bandItems.forEach((item, i) => {
              if(i <= index) {
                d3.select(item)
                    .select('path')
                    .transition().duration(500)
                    .style('fill', j => d3.rgb(color(j.data.id)).brighter(0.5));
              }else{
                d3.select(item)
                    .select('path')
                    .transition().duration(500)
                    .style('fill', j => d3.rgb(color(j.data.id)).darker(1.5));
              }
            });
            setTimeout(function() {
              scorePush({id: d.data.id, value: index + 1});
            }, 550);
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

  const chartToURI = () => {
    const svgChart = document.getElementById('multipleCircleChart');

    // SERIALIZA O GRAFICO
    const serializer = new XMLSerializer();
    let source = serializer.serializeToString(svgChart);

    // ADICIONA NAMESPACE
    if(!source.match(/^<svg[^>]+xmlns="http\:\/\/www\.w3\.org\/2000\/svg"/)){
      source = source.replace(/^<svg/, '<svg xmlns="http://www.w3.org/2000/svg"');
    }
    if(!source.match(/^<svg[^>]+"http\:\/\/www\.w3\.org\/1999\/xlink"/)){
      source = source.replace(/^<svg/, '<svg xmlns:xlink="http://www.w3.org/1999/xlink"');
    }

    // DECLARACAO XML
    source = '<?xml version="1.0" standalone="no"?>\r\n' + source;

    // CONVERTE SVG EM URI
    return 'data:image/svg+xml;charset=utf-8,' + encodeURIComponent(source);
  };

  this.enablePrint = function() {
    if(rtn.isDone()) {
      rtn.svgUri = chartToURI();
      if(this.whenDoneDo) {
        this.whenDoneDo();
      }
    }
  };

  rtn.create = () => {
    for(let i = 0; i < multilevelChart.length; i++) {
      const _cData = multilevelChart[i];
      this.drawChart(_cData, i);
    }

    this.addTextLabel();

    return rtn;
  };

  rtn.remove = () => {
    $('g').remove();

    multilevelChart.splice(0, multilevelChart.length);

    return rtn;
  };

  rtn.buildSvgImage = function() {
    const image = new Image();
    image.src = rtn.svgUri;
    document.body.appendChild(image);
    return rtn;
  };

  rtn.isDone = () => {
    return score.length === bandLength;
  };

  rtn.promiseWhenDone = action => {
    this.whenDoneDo = action;
    return rtn;
  };

  rtn.bandList = bandList;
  rtn.bandLength = bandLength;
  rtn.score = score;

  return rtn;
};
