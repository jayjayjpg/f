export default function heatmapModule(configObj) {
  /*
   * configObj = {
        jsonData: data,
        user_defined_config: {
          colorLow: '#555',
          colorMed: 'white',
          colorHigh: '#f72222',
          scoreLow: 0,
          scoreMid: 0.5,
          scoreHigh: 1,
          offset: 5
        },
        target: 'heatWrapper'
      }
      
      data = [{
 *                  "col": 0,
 *                  "row": 0,
 *                  "label": "M",
 *                  "score": 27,
 *                  "row_label": "A"
 *              }, {
 *                  "col": 0,
 *                  "row": 1,
 *                  "label": "M",
 *                  "score": 5,
 *                  "row_label": "C"
 *              }, {
 *                  "col": 1,
 *                  "row": 0,
 *                  "label": "M",
 *                  "score": 43,
 *                  "row_label": "D"
 *              }, {
 *                  "col": 1,
 *                  "row": 1,
 *                  "label": "M",
 *                  "score": 58,
 *                  "row_label": "E"
 *              }];
   * 
   * 
   * 
   */
   var myData = [{x: "1", y:"A", value: 32},
               {x: "1", y:"B", value: 16},
               {x: "1", y:"C", value: 2},
               {x: "2", y:"A", value: 32},
               {x: "2", y:"B", value: 32},
               {x: "2", y:"C", value: 19}];
  var dimensions = calculateDimensions(myData);
  var target = configObj.target;
  var fullDataCnt = 0;
  /* var fullWidth = 100;
  var colsNum = 4;
  var rowsNum = 2;
  var fieldSize;
  var fieldMargin; */
  var svg = d3.select(target)
    .append("svg")
    .attr("width","100%")
    .attr("height","100%")
    .attr("viewBox","0 0 " + dimensions.fullWidth + " " + dimensions.fullHeight);

  for (var rowCnt = 0; rowCnt < dimensions.rowsNum; rowCnt += 1){
    for (var colCnt = 0; colCnt < dimensions.colsNum; colCnt +=1){
      svg
      .append("rect")
      .attr("x", colCnt * dimensions.fieldPos)
      .attr("y", rowCnt * dimensions.fieldPos)
      .attr("width", dimensions.adaptedfSize)
      .attr("height", dimensions.adaptedfSize)
      .attr("fill", "green")
      .attr("fill-opacity", myData[fullDataCnt].value / 100);
      fullDataCnt += 1;
    }
  }

  function calculateDimensions(dataObj){
    var dimensionObj = {};
    var fullWidth = 100;

    var rows = getUniqueValues(dataObj, "y");
    var cols = getUniqueValues(dataObj, "x");
    var rowsNum = rows.length;
    var colsNum = cols.length;
    
    dimensionObj.colsNum = colsNum;
    dimensionObj.rowsNum = rowsNum;
    dimensionObj.fieldSize = fullWidth / colsNum;
    dimensionObj.fieldMargin = dimensionObj.fieldSize / 25;
    dimensionObj.fullWidth = fullWidth;
    dimensionObj.fullHeight = rowsNum * dimensionObj.fieldSize;
    dimensionObj.fieldPos = dimensionObj.fieldSize + dimensionObj.fieldMargin / 2;
    dimensionObj.adaptedfSize = dimensionObj.fieldSize - dimensionObj.fieldMargin;
    //  dimensionObj.fieldPosY = dimensionObj.fieldSize + dimensionObj.fieldMargin;

    
    console.log("rows " + cols + " number: " + colsNum);

    
    
  
    function getUniqueValues(arr, key){
        var valList = [];
        arr.forEach(function(el){
          if (valList.indexOf(el[key]) === -1){
            valList.push(el[key]);
          }
        });
        console.log("dataRowsList: " + valList);
        return valList;
    }

  return dimensionObj;
  };
    
  return "heatmap magic";
}
