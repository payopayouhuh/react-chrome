
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

export default Sidebar;
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


