import { useEffect, useRef } from 'react';
import * as d3 from 'd3';
interface NodeDatum {
  id: string;
  name: string;
  designation: string;
  manager?: string;
  children?: NodeDatum[];
  hierarchyLevel?: number;
  team?: string;
}

function updateNodeManager(employeeId, newManagerId: string) {
  return fetch(`/api/employees/${employeeId}/manager`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ newManagerId }),
  })
    .then((response) => {
      if (!response.ok) {
        throw new Error('Network response was not ok');
      }
      return response.json();
    })
    .catch((error) => {
      console.error('Error updating manager:', error);
    });
}

export default function CustomNode({ nodeDatum }: { nodeDatum: NodeDatum }) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
     const draggedNodeId = nodeDatum.id;
       if (!draggedNodeId || Number(draggedNodeId) <= 2) return;
    const drag = d3.drag<SVGGElement, unknown>()
    .on('start', function (event) {
      d3.select(this).raise()
    })
    .on('drag', function (event) {
      d3.select(this).attr('transform', `translate(${event.x}, ${event.y})`);
    })
    .on('end', function (event) {
      const draggedEl = this as SVGGElement;
      const originalDisplay = draggedEl.style.display;
      draggedEl.style.display = 'none';
      const dropTarget = document.elementFromPoint(event.sourceEvent.clientX, event.sourceEvent.clientY);
      draggedEl.style.display = originalDisplay;
      if (dropTarget) {
        const targetNodeGroup = dropTarget.closest('g[data-node-id]')
        const targetNodeId = targetNodeGroup?.getAttribute('data-node-id');
        const targetNodeHierarchy = targetNodeGroup?.getAttribute('data-node-hierarchy')
        if (targetNodeId && targetNodeId !== draggedNodeId && nodeDatum.manager !== targetNodeId && Number(targetNodeHierarchy) < Number(nodeDatum.hierarchyLevel)) {
          updateNodeManager(draggedNodeId, targetNodeId)
          
        } else {
          d3.select(this).transition()
          .duration(300)
          .attr('transform', `translate(${0}, ${0})`);
        }
      }
    })

    d3.select(ref.current).call(drag);
  }, []);

  return (
<g ref={ref} data-node-id={nodeDatum.id} data-node-hierarchy={nodeDatum.hierarchyLevel} cursor="move">
  <defs>
    <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
      <feDropShadow dx="0" dy="2" stdDeviation="2" floodColor="#000" floodOpacity="0.2" />
    </filter>
  </defs>

  <rect width="140" height="70" x="-70" y="-35" rx="10" ry="10" stroke="#2F80ED" strokeWidth="2" fill="white" filter="url(#shadow)"/>
  <text 
    fontSize="14" 
    x="0" 
    y="-8" 
    textAnchor="middle" 
    fill={ nodeDatum.hierarchyLevel === 1 ? "#FF5733" : nodeDatum.hierarchyLevel === 2 ? "#4CAF50" : "#2196F3" }
    fontWeight="bold"
  >
    {nodeDatum.name}
  </text>

  <text 
    fill="#555" 
    fontSize="12" 
    x="0" 
    y="10" 
    textAnchor="middle"
    fontStyle="italic"
  >
    {nodeDatum.designation}
  </text>

  <text 
    fill="#888" 
    fontSize="11" 
    x="0" 
    y="26" 
    textAnchor="middle"
  >
    ID: {nodeDatum.id}
  </text>
</g>
  );
}
