function heatmapModule(configObj) {

  var myData = configObj.data;
  var axisMargin = {top: 100, right: 100, bottom: 100, left: 12};
  var dimensions = calculateDimensions(myData, axisMargin);
  var dataScores = calculateValueColors(myData);
  var target = configObj.target;
  var fullDataCnt = 0;
  var fullhHeight = dimensions.fullWidth + axisMargin.top + axisMargin.bottom;

 /* var labels = dimensions.fieldData.data;

  var xScale = d3.scaleOrdinal()
                  .domain(labels.map(function(d){ return d["x"]; }))
                .range(labels.map(function(d,i){ return d["posX"] * dimensions.fieldPos; }));
  var xAxis = d3.axisBottom().scale(xScale); */


  var svg = d3.select(target)
    .append("svg")
    .attr("id","heatmapInstance")
    .attr("width","100%")
    .attr("height","100%")
    .attr("viewBox","0 0 " + dimensions.fullHeight + " " + fullhHeight)
   // .attr("viewBox","0 0 100 " + dimensions.fullHeight)
    .attr("preserveAspectRatio","xMidYMid meet");

  var dataCanvas = svg.append("g")
      .attr("class", "data-fields")
      .attr("width","100%")
      .attr("height","100%")
      .attr("transform", "translate(" + axisMargin.left + ", " + 0 + ")");
      
 /* svg.append("g")
    .attr("class", "x-axis x axxis")
    .attr("transform", "translate(0," + parseInt(fullhHeight - axisMargin.top * 2) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(90)")
    .style("text-anchor","start"); */
  
  update(myData);

  return "heatmap magic";
}

function update(data){
  var myData = data;
  var svgRatio = {};
  var axisMargin = {top: 100, right: 100, bottom: 100, left: 12};

  var dimensions = calculateDimensions(myData, axisMargin);
  var dataScores = calculateValueColors(myData);

  var fullDataCnt = 0;

  // var fullhHeight = dimensions.fullWidth + axisMargin.top + axisMargin.bottom;
  var svg = d3.select('#heatmapInstance');
  var dataCanvas = d3.select('.data-fields');

  var dataScores = calculateValueColors(myData);
  var fullhHeight = dimensions.fullWidth + axisMargin.top + axisMargin.bottom;
  
  svgRatio.width = dimensions.fullHeight;
  svgRatio.height = fullhHeight;

  var labels = dimensions.fieldData.data;
  var colLabels = dimensions.cols;
  var rowLabels = dimensions.rows;
  console.log("colLabels: " + colLabels);

  var xScale = d3.scaleOrdinal()
                .domain(colLabels.map(function(d){ return d; }))
                .range(colLabels.map(function(d,i){ return i * dimensions.fieldPos; })); // TODO: change mapping in range function to the actual unique values and not the whole array -> fixes magically resizing axis on data update
  var xAxis = d3.axisBottom().scale(xScale);

  var yScale = d3.scaleOrdinal()
                .domain(rowLabels.map(function(d){ return d; }))
                .range(rowLabels.map(function(d,i){ return i * dimensions.fieldPos; })); // TODO: change mapping in range function to the actual unique values and not the whole array -> fixes magically resizing axis on data update
  var yAxis = d3.axisLeft().scale(yScale);

  svg.selectAll('.x.axxis')
     .remove();

  svg.selectAll('.y.axxis')
     .remove();

  svg.append("g")
    .attr("class", "x-axis x axxis")
    .attr("transform", "translate(" +  parseInt(axisMargin.left)  + "," + parseInt(fullhHeight - axisMargin.top * 2) + ")")
    .call(xAxis)
    .selectAll("text")
    .attr("transform", "rotate(90) translate(0," + parseInt(-dimensions.fieldPos / 2) + ")")
    .style("text-anchor","start")
    .attr("font-size", function(d){ return parseInt(dimensions.fullHeight / 100) + "px";})
    .attr("y", function(d){ return dimensions.fullHeight / 210});

  svg.append("g")
    .attr("class", "y-axis y axxis")
    .attr("transform", "translate(" +  parseInt(axisMargin.left - 2) +  ", " + parseInt(fullhHeight / 100) + ")")
    .call(yAxis)
    .selectAll("text")
    .attr("transform", "translate(" + 0 + ", " + parseInt(-dimensions.fieldPos / 2) + ")")
    .style("text-anchor","start")
    .attr("font-size", function(d){ return parseInt(dimensions.fullHeight / 100) + "px";})
    .attr("y", function(d){ return dimensions.fullHeight / 210});


  svg.attr("viewBox","0 0 " + dimensions.fullHeight + " " + fullhHeight);
   // svg.attr("viewBox","0 0 100 " + dimensions.fullHeight);



  var rects = dataCanvas.selectAll("rect")
      .data(dimensions.fieldData.data);

  rects.enter()
      .append("rect")
      .attr("x", function(d) { return d["posX"] * dimensions.fieldPos})
      .attr("y", function(d) { return d["posY"] * dimensions.fieldPos})
      .attr("width", dimensions.adaptedfSize)
      .attr("height", dimensions.adaptedfSize)
      .attr("fill", "green")
      .attr("fill-opacity", function(d){ return d["value"] / dataScores.maxValue})
      .append("title")
      .text(function(d){ return "patient: " + d["x"] + ", SNP: " + d["y"]});

  rects.exit().remove();

  return svgRatio;

}

function calculateValueColors(dataObj){
  var len = dataObj.length;
  var valueObj = {};
  var values = dataObj.map(function(obj){
    return obj.value;
  });
  var maxVal = Math.floor(Math.max(...values));
  // console.log("max value: " + maxVal);
  valueObj.maxValue = maxVal;
  valueObj.values = values;
  return valueObj;
}

function calculateDimensions(dataObj, margins){
    var dimensionObj = {};
    var allDataKeys = [];
    var fullWidth = 100;

    var rows = getUniqueValues(dataObj, "y");
    var cols = getUniqueValues(dataObj, "x");
    allDataKeys[0] = rows;
    allDataKeys[1] = cols;

    var fieldData = createFieldObjects(dataObj, allDataKeys);
    var rowsNum = fieldData.rowsNum;
    var colsNum = fieldData.colsNum;
    
    dimensionObj.colsNum = colsNum;
    dimensionObj.rowsNum = rowsNum;
    dimensionObj.fieldSize = (fullWidth - margins.left - 4) /  colsNum;
    dimensionObj.fieldMargin = dimensionObj.fieldSize / 25;
    dimensionObj.fullWidth = fullWidth - margins.left;
    dimensionObj.fullHeight = rowsNum * dimensionObj.fieldSize + dimensionObj.fieldSize;
    dimensionObj.fieldPos = dimensionObj.fieldSize;
    dimensionObj.adaptedfSize = dimensionObj.fieldSize - dimensionObj.fieldMargin;
    dimensionObj.rows = rows;
    dimensionObj.cols = cols;
    dimensionObj.fieldData = fieldData;
    
    
  
  function getUniqueValues(arr, key){
    var valList = [];
    var currentVal; 
    arr.forEach(function(el, index){
      currentVal = el[key]; // rs23123
      if (valList.indexOf(currentVal) === -1){ // wtf why is this such a mindfuck
        valList.push(currentVal);
      }
    });
    //  console.log("dataRowsList: " +key+ " key - " + JSON.stringify(valList));

    return valList;
  }

  function createFieldObjects(arr, keyLists){
    var secondList = {};
    secondList.data = [];

    secondList.data = arr.map(function(el, index){
      el["posX"] = keyLists[1].indexOf(el["x"]);
      el["posY"] = keyLists[0].indexOf(el["y"]);
      return el;
    });
      // final data attributes
      secondList.rowsNum = keyLists[1].length;
      secondList.colsNum = keyLists[0].length;
      //console.log("dataRowsList: key - " + JSON.stringify(secondList)); 
      return secondList;
  }

  return dimensionObj;
}

export default { heatmapModule, update };