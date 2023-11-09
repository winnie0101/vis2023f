function _1(md){return(
md`# HW2 Strong baseline`
)}

function _data(FileAttachment){return(
FileAttachment("../src/data.json").json()
)}

function _yCounts(){return(
[]
)}

function _constellations(data){return(
data.map(item => item.Constellation)
)}

function _5(yCounts,data)
{
  yCounts.length = 0; 
  const constellationOrder = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 11];
  const constellationObj = {
    0: "牡羊座",
    1: "金牛座",
    2: "雙子座",
    3: "巨蟹座",
    4: "獅子座",
    5: "處女座",
    6: "天秤座",
    7: "天蠍座",
    8: "射手座",
    9: "摩羯座",
    10: "水瓶座",
    11: "雙魚座",
  }
  for (var y=0; y<=11; y++) { 
    yCounts.push({Constellation:constellationObj[y], gender:"male", count:0}); 
    yCounts.push({Constellation:constellationObj[y], gender:"female", count:0}); 
  }
  data.forEach (x=> {
    var i = constellationOrder.indexOf(x.Constellation) * 2 + (x.Gender== "男" ? 0 : 1); 
    yCounts[i].count++;
  })
  return yCounts
}


function _6(Plot,yCounts){return(
Plot.plot({
  
  grid: true,
  y: {label: "count"},
  x: {
    domain: ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座"] // setting the order manually by specifying the array
  },

  marks: [
    Plot.ruleY([0]),
    Plot.barY(yCounts, {x: "Constellation", y: "count", tip: true , fill:"gender"}),
  ]
})
)}

function _hostagramData(data){return(
JSON.parse(JSON.stringify(data))
)}

function _constellationMap(){return(
new Map([
  [0, "牡羊座"],
  [1, "金牛座"],
  [2, "雙子座"],
  [3, "巨蟹座"],
  [4, "獅子座"],
  [5, "處女座"],
  [6, "天秤座"],
  [7, "天蠍座"],
  [8, "射手座"],
  [9, "摩羯座"],
  [10,"水瓶座"],
  [11, "雙魚座"],
  [12, ""],
])
)}

function _9(Plot,constellationMap,hostagramData){return(
Plot.plot({
  grid: true, 
  y: {label:"count", grid: true},
  x: {
    transform: (n)=>constellationMap.get(n),
    domain: ["牡羊座", "金牛座", "雙子座", "巨蟹座", "獅子座", "處女座", "天秤座", "天蠍座", "射手座", "摩羯座", "水瓶座", "雙魚座", ""] // setting the order manually by specifying the array
  },
  color: {legend: true},
  marks: [
    Plot.ruleY([0]),
    Plot.rectY(hostagramData, 
               Plot.binX({y: "count"}, 
                        {x: "Constellation", 
                         fill: "Gender", 
                         interval:1,
                         title: bin => {return `Constellation: $(constellationMap.get(bin.Constellation))}\n\nGender: $(bin.Gender)`}
                                       })
               ),
  ]
})
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["data.json", {url: new URL("./files/2259824662fb612853b8873b8814ace51e8cbac39ba881850d66e26df63f1897b01d1bd3459af6529669fd912da9dd607a30666a93278d7fdfa10bbe22b8913d.json", import.meta.url), mimeType: "application/json", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  main.variable(observer("data")).define("data", ["FileAttachment"], _data);
  main.variable(observer("yCounts")).define("yCounts", _yCounts);
  main.variable(observer("constellations")).define("constellations", ["data"], _constellations);
  main.variable(observer()).define(["yCounts","data"], _5);
  main.variable(observer()).define(["Plot","yCounts"], _6);
  main.variable(observer("hostagramData")).define("hostagramData", ["data"], _hostagramData);
  main.variable(observer("constellationMap")).define("constellationMap", _constellationMap);
  main.variable(observer()).define(["Plot","constellationMap","hostagramData"], _9);
  return main;
}
