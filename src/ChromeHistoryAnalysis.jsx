import React, { useEffect, useRef ,useState} from "react";
import * as d3 from "d3";
import Sidebar from "./Sidebar.jsx";
import "bootstrap/dist/css/bootstrap.min.css";

const ChromeHistoryAnalysis = () => {
  let force = useRef(null);
  const [selectedNode, setSelectedNode] = useState(null);

// サイドバーの状態を管理するためのステートを追加
const [isSidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    const graph_get = () => {
      var links = [
        { source: "https://github.com/", target: "https://github.com/t-nakatani/GeekCamp/issues/2" , title:"t-nakatani GeekCamp"},
        { source: "https://github.com/", target: "https://github.com/GeekCamp/issues/2" , title:"GeekCamp issues"},
        { source: "https://github.com/", target: "https://github.com/issues/2" ,title:"github issue2"},
        { source: "https://github.com/", target: "https://github.com/issues" ,title:"github issue"},
        { source: "https://github.com/", target: "https://github.com/" ,title:"github"},
        { source: "https://tanaka.com/", target: "https://tanaka.com/" ,title:"tanaka"},
        { source: "https://tanaka.com/", target: "https://tanaka.com/tanaka" ,title:"tanaka-tanaka"},
        { source: "https://yamada.com/", target: "https://yamada.com/" ,title:"yamada"},
        { source: "https://react.dev/", target: "https://react.dev/" ,title:"react"},
        { source: "https://qiita.com/", target: "https://qiita.com/jimpei/items/eb09f4af122198952ffd" ,title:"chromeの検索履歴を検索して一括削除するchrome拡張を作る"},
        { source: "https://qiita.com/", target: "https://qiita.com/hamachi4708/items/bad21f0c6bf0a548e5bc" ,title:"Chrome拡張開発 Getting Started（React×Webpackのボイラープレートを利用した場合）"},
        // 以下略
      ];
      //const centerNodeURLs = ["https://github.com/", "https://tanaka.com/"];
      var nodes = {};

      links.forEach(function (link) {
        link.source = nodes[link.source] || (nodes[link.source] = { name: link.source, domain: new URL(link.source).hostname });
        link.target = nodes[link.target] || (nodes[link.target] = { name: link.target , title: link.title});
      });
      

      var width = 1400, height = 800;

      var svg = d3.select("#graph").append("svg")
        .attr("width", width)
        .attr("height", height);

      // 以下、元のJavaScriptコードをD3.jsのv6に合わせて変更
      force.current = d3.forceSimulation(Object.values(nodes))
        .force("link", d3.forceLink(links).id(d => d.name).distance(60))
        .force("charge", d3.forceManyBody().strength(-10))
        .force("center", d3.forceCenter(width / 2, height / 2))
        .on("tick", ticked);

      var link = svg.selectAll(".link")
        .data(links)
        .enter().append("line")
        .attr("class", "link")
        .style("stroke", "#999")  // リンクの色を設定
        .style("stroke-opacity", 0.6);  // リンクの透明度を設定

      var node = svg.selectAll(".node")
        .data(force.current.nodes())
        .enter().append("g")
        .attr("class", "node")
        .call(d3.drag()
          .on("start", dragstarted)
          .on("drag", dragged)
          .on("end", dragended));

      node.append("circle")
        .attr("r", function (d) {
          return d.domain ? 10 : 5;
        })
        .style("fill", function(d) {
          return d.domain ? "white" : "blue";
        });
        

      node.append("text")
        .attr("dx", 12)
        .attr("dy", ".35em")
        .text(function (d) {
          //return d.domain || d.name;
          return d.domain ? d.domain || d.name : d.title;
        });

      node.on("click", function (event, d) {
        // ノードがクリックされたときにそのURLを新しいタブで開く
        window.open(d.name, '_blank');
      });


      // ソースノードのファビコンを取得して表示する
      node.filter(function(d) { return d.domain; }).each(function(d) {
        const faviconURL = `https://www.google.com/s2/favicons?domain=${d.name}`;
        d3.select(this).append("image")
          .attr("xlink:href", faviconURL)
          .attr("x", -8)
          .attr("y", -8)
          .attr("width", 16)
          .attr("height", 16);
      });
/*
      function dragstarted(event, d) {
        if (!event.active) force.current.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;

        
        if (d) {
          const children = links
            .filter(link => link.source.name === d.name)
            .map(link => link.target.name)
            .sort();
        
          setSelectedNode({
            name: d.domain || d.name,
            children: children
          });

          setSidebarOpen(true);
        }
        


        
      }

      */

      function dragstarted(event, d) {
        if (!event.active) force.current.alphaTarget(0.3).restart();
        d.fx = d.x;
        d.fy = d.y;
        if (d) {
          const children = links
            .filter(link => link.source.name === d.name)
            .map(link => ({ url: link.target.name, title: link.target.title }))
            .sort((a, b) => a.url.localeCompare(b.url));
      
          setSelectedNode({
            name: d.domain || d.name,
            children: children
          });
      
          setSidebarOpen(true);
        }
      }
      



      function dragged(event, d) {
        d.fx = event.x;
        d.fy = event.y;
        force.current.alphaTarget(0.3).restart();
      }

      function dragended(event, d) {
        if (!event.active) force.current.alphaTarget(0).restart();
        d.fx = null;
        d.fy = null;
      }

      function ticked() {
        link.attr("x1", function (d) { return d.source.x; })
          .attr("y1", function (d) { return d.source.y; })
          .attr("x2", function (d) { return d.target.x; })
          .attr("y2", function (d) { return d.target.y; });

        node.attr("transform", function (d) { return "translate(" + d.x + "," + d.y + ")"; });
      }
    };

    graph_get();
  }, []);

  return (
    <div className="d-flex">
      <div className={`sidebar ${isSidebarOpen ? 'open' : ''}`}>
        <Sidebar selectedNode={selectedNode} />
      </div>
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
    </div>
  );
  
};

export default ChromeHistoryAnalysis;
