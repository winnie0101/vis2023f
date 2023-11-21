import define1 from "./b4b821d169d4ff8e@271.js";

function _1(md){return(
md`# HW4 strong baseline`
)}

function _artist(__query,FileAttachment,invalidation){return(
__query(FileAttachment("artist.csv"),{from:{table:"artist"},sort:[],slice:{to:null,from:null},filter:[],select:{columns:null}},invalidation)
)}

function _4(artist){return(
Object.keys(artist[0])
)}

function _col1Question(artist){return(
Object.keys(artist[0])[2]
)}

function _col2Question(artist){return(
Object.keys(artist[0])[9]
)}

function _7(log){return(
log
)}

function _data(artist,col1Question,col2Question)
{
  // consoleHook;
  var col1 = artist.map(row => row[col1Question]);
  var col2 = artist.map(row => row[col2Question]);

  var combined = {}
  col1.map((col1Ans, idx)=> {
    var col2Ans = col2[idx];
    
    if(col1Ans in combined) {
      if(col2Ans in combined[col1Ans]){
          combined[col1Ans][col2Ans] += 1;
      } else {
        combined[col1Ans][col2Ans] = 1;
      }
      combined[col1Ans]["total"] += 1;
    } else {
      combined[col1Ans] = {};
      combined[col1Ans][col2Ans] = 1;
      combined[col1Ans]["total"] = 1;
    }     
  })

  var datas = []
  for(const key in combined){
    combined[key]["region"] = key;
    datas.push(combined[key])
  }


  console.log(datas)
  return datas;
}


function _chart(consoleHook,data,d3)
{
  consoleHook
  // 轉換資料格式
  const hierarchicalData = {
    name: "total",
    children: data.map(d => ({
      name: d.region,
      children: Object.entries(d)
        .filter(([key, value]) => key !== "region" && key !== "total")
        .map(([key, value]) => ({ name: key, value })),
    })),
  };
  
  // Specify the chart’s dimensions.
  const width = 928;
  const height = 900;
  const format = d3.format(",d");
  
  const color = d3.scaleOrdinal(d3.quantize(d3.interpolateBrBG, hierarchicalData.children.length))
  
  const partition = d3.partition()
      .size([height, width])
      .padding(1);
  
  const root = partition(d3.hierarchy(hierarchicalData)
      .sum(d => d.value)
      .sort((a, b) => b.height - a.height || b.value - a.value));
  
  const svg = d3.create("svg")
      .attr("width", width)
      .attr("height", height)
      .attr("viewBox", [0, 0, width, height])
      .attr("style", "max-width: 100%; height: auto; font: 10px sans-serif");
  
  const cell = svg
    .selectAll()
    .data(root.descendants())
    .join("g")
      .attr("transform", d => `translate(${d.y0},${d.x0})`)
      .on("mouseover", handleMouseOver)
      .on("mouseout", handleMouseOut);;
  
  cell.append("title")
      .text(d => `${d.ancestors().map(d => d.data.name).reverse().join("/")}\n${format(d.value)}`);
  
  cell.append("rect")
      .attr("width", d => d.y1 - d.y0)
      .attr("height", d => d.x1 - d.x0)
      .attr("fill-opacity", 0.6)
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      });
  
  const text = cell.filter(d => (d.x1 - d.x0) > 16).append("text")
      .attr("x", 4)
      .attr("y", 13);
  
  text.append("tspan")
      .text(d => d.data.name)
      .attr("dy", "0.2em")
      .style("font-weight", "bold")
      .style("font-size", "12px");
  
  text.append("tspan")
      .attr("fill-opacity", 0.7)
      .attr("dx", "2.4em")
      // .attr("dy", "1.2em")
      .text(d => `人數: ${format(d.value)}`);

  // Tooltip
  const tooltip = d3.select("body")
    .append("div")
    .attr("class", "tooltip")
    .style("opacity", 0);

  function handleMouseOver(d) {
    // 鼠標懸停時的顏色變化
    d3.select(this).select("rect")
      .attr("fill", "orange");

    // 顯示 Tooltip
    tooltip.transition()
      .duration(200)
      .style("opacity", .9);

    tooltip.html(`${d.ancestors().map(d => d.data.name).reverse().join("/")}<br/>人數: ${format(d.value)}`)
      .style("left", (d3.event.pageX) + "px")
      .style("top", (d3.event.pageY - 28) + "px");
  }

  function handleMouseOut(d) {
    // 恢復原本的顏色
    d3.select(this).select("rect")
      .attr("fill", d => {
        if (!d.depth) return "#ccc";
        while (d.depth > 1) d = d.parent;
        return color(d.data.name);
      });

    // 隱藏 Tooltip
    tooltip.transition()
      .duration(500)
      .style("opacity", 0);
  }

  return svg.node();
}


function _10(htl){return(
htl.html`<h2>結論</h2>
<h3>從上圖中，我們可以看出：
  <ul>
    <li>於北部工作者佔這份問卷的多數</li>
    <li>大多數人對「台灣 2050 淨零排放」政策的瞭解度為中下程度</li>
  </ul>
</h3>`
)}

export default function define(runtime, observer) {
  const main = runtime.module();
  function toString() { return this.url; }
  const fileAttachments = new Map([
    ["artist.csv", {url: new URL("./artist.csv", import.meta.url), mimeType: "text/csv", toString}]
  ]);
  main.builtin("FileAttachment", runtime.fileAttachments(name => fileAttachments.get(name)));
  main.variable(observer()).define(["md"], _1);
  const child1 = runtime.module(define1);
  main.import("log", child1);
  main.import("consoleHook", child1);
  main.variable(observer("artist")).define("artist", ["__query","FileAttachment","invalidation"], _artist);
  main.variable(observer()).define(["artist"], _4);
  main.variable(observer("col1Question")).define("col1Question", ["artist"], _col1Question);
  main.variable(observer("col2Question")).define("col2Question", ["artist"], _col2Question);
  main.variable(observer()).define(["log"], _7);
  main.variable(observer("data")).define("data", ["artist","col1Question","col2Question"], _data);
  main.variable(observer("chart")).define("chart", ["consoleHook","data","d3"], _chart);
  main.variable(observer()).define(["htl"], _10);
  return main;
}
