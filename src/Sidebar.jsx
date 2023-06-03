/*import React from 'react';

// Sidebar
const Sidebar = ({ selectedNode }) => {
    return (
      <div className="sidebar">
        <h2>{selectedNode && selectedNode.name}</h2>
        {selectedNode && selectedNode.children.map((child, index) => (
          <a key={index} href={child} target="_blank" rel="noopener noreferrer">{child}</a>
        ))}
      </div>
    );
  };
  

export default Sidebar;*/

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



