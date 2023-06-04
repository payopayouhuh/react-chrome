import React from 'react';

const Sidebar = ({ selectedNode }) => {
  const sidebarStyle = {
    width: '300px',  /* 適切な値に調整してください */
    whiteSpace: 'nowrap',
    overflow: 'auto',
    /* 他のスタイルプロパティ */
  };

  const titleStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '16px',  /* タイトルのフォントサイズを指定 */
  };

  const urlStyle = {
    overflow: 'hidden',
    textOverflow: 'ellipsis',
    fontSize: '9px',  /* URLのフォントサイズを指定 */
  };

  return (
    <div className="sidebar" style={sidebarStyle}>
      <h2>{selectedNode && selectedNode.name}</h2>
      {selectedNode && selectedNode.children && selectedNode.children.map((child, i) => (
        <div key={i}>
          <h3 style={titleStyle}>{child.title}</h3>
          <p style={urlStyle}>{child.url}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;



/*
import React from 'react';

const Sidebar = ({ selectedNode }) => {




  return (
    <div className="sidebar">
      <h2>{selectedNode && selectedNode.name}</h2>
      {selectedNode && selectedNode.children && selectedNode.children.map((child, i) => (
        <div key={i}>
          <h3>{child.title}</h3>
          <p>{child.url}</p>
        </div>
      ))}
    </div>
  );
};

export default Sidebar;

*/
/*
import React from 'react';

const Sidebar = ({ selectedNode }) => {
  const formattedChildren = selectedNode && selectedNode.children ? selectedNode.children.join('\n') : '';
  return (
    <div className="sidebar">
      <h2>{selectedNode && selectedNode.name}</h2>
      <p>{formattedChildren}</p>
    </div>
  );
};

export default Sidebar;*/



//カテゴリー検索実装
/*

import React from 'react';

const Sidebar = ({ selectedNode }) => {
  const handleClick = (url) => {
    window.open(url, '_blank');
  };

  return (
    <div className="sidebar">
      <h2>{selectedNode && selectedNode.name}</h2>
      {selectedNode &&
        selectedNode.children.map((child, index) => (
          <a
            key={index}
            href={child}
            target="_blank"
            rel="noopener noreferrer"
            onClick={(e) => {
              e.preventDefault();
              handleClick(child);
            }}
          >
            {child}
          </a>
        ))}
    </div>
  );
};

export default Sidebar;


*/


