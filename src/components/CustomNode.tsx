import { useEffect, useRef } from 'react';
import * as d3 from 'd3';

interface NodeDatum {
  id: string;
  name: string;
  designation: string;
  x?: number;
  y?: number;
  __rd3t: { x: number; y: number };
}

export default function CustomNode({ nodeDatum }: { nodeDatum: NodeDatum }) {
  const ref = useRef<SVGGElement>(null);

  useEffect(() => {
    if (!ref.current) return;
     const draggedNodeId = nodeDatum.id;
    const drag = d3.drag<SVGGElement, unknown>()
      .on('drag', function (event) {
        d3.select(this).attr(
          'transform',
          `translate(${event.x}, ${event.y})`
        );
      })
      .on('end', function (event) {
        const dropTarget = document.elementFromPoint(event.sourceEvent.clientX, event.sourceEvent.clientY);

        if (dropTarget) {
          const targetNodeGroup = dropTarget.closest('g[data-node-id]')
          const targetNodeId = targetNodeGroup?.getAttribute('data-node-id');
          console.log(targetNodeId)
          
          if (targetNodeId && targetNodeId !== draggedNodeId) {
            console.log(`Dropped on node with ID: ${targetNodeId}`);
          }
        }
      });

    d3.select(ref.current).call(drag);
  }, []);

  return (
    <g ref={ref} data-node-id={nodeDatum.id} transform={`translate(${nodeDatum.__rd3t?.x ?? 0}, ${nodeDatum.__rd3t?.y ?? 0})`} cursor="move">
      <rect width="120" height="60" x="-60" y="-30" stroke="#2F80ED" fill="white" />
      <text fill="black" x="0" y="-10" textAnchor="middle">{nodeDatum.name}</text>
      <text fill="gray" x="0" y="10" textAnchor="middle">{nodeDatum.designation}</text>
      <text fill="gray" x="0" y="25" textAnchor="middle">ID: {nodeDatum.id}</text>
    </g>
  );
}
