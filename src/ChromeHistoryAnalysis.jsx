import React, { useEffect,useRef } from "react";
import * as d3 from "d3";
import "bootstrap/dist/css/bootstrap.min.css";

const ChromeHistoryAnalysis = () => {
  let force = useRef(null);

  useEffect(() => {


  const graph_get = () => {
    var links = [
      {source: "https://github.com/", target: "https://github.com/t-nakatani/GeekCamp/issues/2"},
      {source: "https://github.com/", target: "https://github.com/GeekCamp/issues/2"},
      {source: "https://github.com/", target: "https://github.com/issues/2"},
      {source: "https://github.com/", target: "https://github.com/issues"},
      {source: "https://github.com/", target: "https://github.com/"},
      {source: "https://tanaka.com/", target: "https://tanaka.com/"},
      {source: "https://tanaka.com/", target: "https://tanaka.com/tanaka"},
      {source: "https://yamada.com/", target: "https://yamada.com/"},
      {source: "https://react.dev/", target: "https://react.dev/"},
      {source: "https://qiita.com/", target: "https://qiita.com/jimpei/items/eb09f4af122198952ffd"},
      {source: "https://qiita.com/", target: "https://qiita.com/hamachi4708/items/bad21f0c6bf0a548e5bc"},
      // 以下略
    ];
    const centerNodeURLs = ["https://github.com/", "https://tanaka.com/"];
    var nodes = {};

    links.forEach(function(link) {
      link.source = nodes[link.source] || (nodes[link.source] = {name: link.source, domain: centerNodeURLs.includes(link.source) ? new URL(link.source).hostname : null});
      link.target = nodes[link.target] || (nodes[link.target] = {name: link.target});
    });

    var width = 1400, height = 800;

    var svg = d3.select("#graph").append("svg")
      .attr("width", width)
      .attr("height", height);

    // 以下、元のJavaScriptコードをD3.jsのv6に合わせて変更
    force = d3.forceSimulation(Object.values(nodes))
      .force("link", d3.forceLink(links).id(d => d.name).distance(60))
      .force("charge", d3.forceManyBody().strength(-10))
      .force("center", d3.forceCenter(width / 2, height / 2));

    var link = svg.selectAll(".link")
      .data(links)
      .enter().append("line")
      .attr("class", "link")
      .style("stroke", "#999")  // リンクの色を設定
      .style("stroke-opacity", 0.6);  // リンクの透明度を設定

    var node = svg.selectAll(".node")
      .data(force.nodes())
      .enter().append("g")
      .attr("class", "node")
      .call(d3.drag()
        .on("start", dragstarted)
        .on("drag", dragged)
        .on("end", dragended));

    node.append("circle")
        .attr("r", function(d) {
          // もしノードがドメイン名のノードであれば半径を大きくする
          if (d.name === d.domain) {
            return 10;
          } else {
            return 5;
          }
        })

    node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function(d) {
          // もしノードがドメイン名のノードであればドメイン名を表示する
          if (d.name === d.domain) {
            return d.domain;
          } else {
            return d.name;
          }
        });

    node.on("click", function(event, d) {
          // ノードがクリックされたときにそのURLを新しいタブで開く
          window.open(d.name, '_blank');
        });

    force.on("tick", function() {
      link.attr("x1", function(d) { return d.source.x; })
          .attr("y1", function(d) { return d.source.y; })
          .attr("x2", function(d) { return d.target.x; })
          .attr("y2", function(d) { return d.target.y; });

      node.attr("transform", function(d) { return "translate(" + d.x + "," + d.y + ")"; });
    });

    force.current = d3.forceSimulation(Object.values(nodes))
    .force("link", d3.forceLink(links).id(d => d.name).distance(60))
    .force("charge", d3.forceManyBody().strength(-10))
    .force("center", d3.forceCenter(width / 2, height / 2));

    function dragstarted(event, d) {
      if (!event.active) force.alpha(1).restart();
      d.fx = d.x;
      d.fy = d.y;
    }

    function dragged(event, d) {
      d.fx = event.x;
      d.fy = event.y;
    }

    function dragended(event, d) {
      if (!event.active) force.alpha(1).restart();
      d.fx = null;
      d.fy = null;
    }



  };

  graph_get();
}, []);




  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-12 text-center">
          <h1>Chrome History Analysis</h1>
        </div>
      </div>
      <div className="row justify-content-center">
        <div className="col-12">
          {/*<Button id="centerButton" className="btn btn-primary" onClick={centerNodes}>Center Nodes</Button> */}
        </div>
      </div>
      <div id="graph"></div>
    </div>
  );
};

export default ChromeHistoryAnalysis;