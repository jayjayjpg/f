function heatmapModule(configObj) {
  /* globals d3 */
  var myData = configObj.data;
  var clickHandlerCallback = configObj.clickHandler;
  var counterClickHandlerCallback = configObj.counterClickHandler;
  var axisMargin = {top: 100, right: 0, bottom: 100, left: 0};
  var dimensions = calculateDimensions(myData, axisMargin);
  var dataScores = calculateValueColors(myData);
  var target = configObj.target;
  var fullDataCnt = 0;
  var fullhHeight = dimensions.fullWidth + axisMargin.top + axisMargin.bottom;

  var fillBaseColor = configObj.fillBaseColor || "#666666";


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

  
  update(myData, clickHandlerCallback, counterClickHandlerCallback, fillBaseColor);

  return "heatmap magic";
}

function update(data, clickHandlerCallback, counterClickHandlerCallback, fillBaseColor){
  var myData = data;
  var svgRatio = {};
  var axisMargin = {top: 100, right: 0, bottom: 100, left: 0};

  var dimensions = calculateDimensions(myData, axisMargin); // TODO: Check which value will be saved to dimensions.fullHeight on update
  var dataScores = calculateValueColors(myData);

  var fullDataCnt = 0;
  var svg = d3.select('#heatmapInstance');
  var dataCanvas = d3.select('.data-fields');
  var fullhHeight = dimensions.fullWidth + axisMargin.top + axisMargin.bottom;
  
  svgRatio.width = dimensions.fullHeight;
  svgRatio.height = fullhHeight;

  var labels = dimensions.fieldData.data;
  var colLabels = dimensions.cols;
  var rowLabels = dimensions.rows;

  var xScale = d3.scaleOrdinal()
                .domain(colLabels.map(function(d){ return d; }))
                .range(colLabels.map(function(d,i){ return i * dimensions.fieldPos; })); // TODO: change mapping in range function to the actual unique values and not the whole array -> fixes magically resizing axis on data update
  var xAxis = d3.axisBottom().scale(xScale);

  var yScale = d3.scaleOrdinal()
                .domain(rowLabels.map(function(d){ return d; }))
                .range(rowLabels.map(function(d,i){ return i * dimensions.fieldPos; })); // TODO: change mapping in range function to the actual unique values and not the whole array -> fixes magically resizing axis on data update
  var yAxis = d3.axisLeft().scale(yScale);


  svg.attr("viewBox","0 0 " + dimensions.fullHeight + " " + fullhHeight);

  var rects = dataCanvas.selectAll("rect")
      .data(dimensions.fieldData.data);

  rects.enter()
      .append("rect")
      .attr("x", function(d) { return d["posX"] * dimensions.fieldPos;})
      .attr("y", function(d) { return d["posY"] * dimensions.fieldPos;})
      .attr("width", dimensions.adaptedfSize)
      .attr("height", dimensions.adaptedfSize)
      .attr("fill", fillBaseColor)
      .attr("fill-opacity", function(d){ return Math.max(d["value"] / dataScores.maxValue, 0.1); })
      .on("click", function(d,i) { 
        let self = d3.select(this); 
        console.log("counterClickHandler defined? " + counterClickHandlerCallback);
        handleDataElClick(d, i, self, clickHandlerCallback, counterClickHandlerCallback, fillBaseColor); 
        return d;
      })
      .append("title")
      .text(function(d){ return "patient: " + d["x"] + ", SNP: " + d["y"]; });

  
  rects.exit().remove();

  return svgRatio;

}

function handleDataElClick(data, index, self, callback, counterCallback, fillBaseColor){

  if (self.attr("selected")){
    self.attr("selected",null);
    self.attr("fill", fillBaseColor);
    counterCallback(data, index, self);
    return;
  }
  self.attr("fill","#eaaaea");
  self.attr("selected",true);
  callback(data, index, self);
  return data;
}


function calculateValueColors(dataObj){
  var len = dataObj.length;
  var valueObj = {};
  var values = dataObj.map(function(obj){
    return obj.value;
  });
  var maxVal = Math.floor(Math.max(...values));
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
      if (valList.indexOf(currentVal) === -1){ // what the cabbage why is this such a mind flummery
        valList.push(currentVal);
      }
    });

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
      return secondList;
  }

  return dimensionObj;
}

export default { heatmapModule, update };