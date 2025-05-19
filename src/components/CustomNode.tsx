import { useEffect, useRef } from "react";
import useUpdateNodeManager from "@/hooks/useUpdateNodeManager";
import * as d3 from "d3";
import type { NodeDatum } from "@/utils/types";

export default function CustomNode({ nodeDatum }: { nodeDatum: NodeDatum }) {
  const ref = useRef<SVGGElement>(null);
  const { updateManager, updateManagerInStore } = useUpdateNodeManager();
  useEffect(() => {
    if (!ref.current) return;
    const draggedNodeId = nodeDatum.id;
    if (!draggedNodeId || Number(draggedNodeId) <= 2) return;
    const drag = d3.drag<SVGGElement, unknown>()
      .on("start", function () {
        d3.select(this).raise();
      })
      .on("drag", function (event) {
        d3.select(this).attr("transform", `translate(${event.x}, ${event.y})`);
      })
      .on("end", function (event) {
        const draggedEl = this as SVGGElement;
        const originalDisplay = draggedEl.style.display;
        draggedEl.style.display = "none";
        const dropTarget = document.elementFromPoint(
          event.sourceEvent.clientX,
          event.sourceEvent.clientY
        );
        draggedEl.style.display = originalDisplay;
        
        if (!dropTarget) return

        const targetNodeGroup = dropTarget.closest("g[data-node-id]")
        const targetNodeId = targetNodeGroup?.getAttribute("data-node-id")
        const targetNodeHierarchy = targetNodeGroup?.getAttribute("data-node-hierarchy")

        if (targetNodeId && targetNodeId !== draggedNodeId && nodeDatum.manager !== targetNodeId && Number(targetNodeHierarchy) < Number(nodeDatum.hierarchyLevel)) {
          updateManager(draggedNodeId, targetNodeId);
          updateManagerInStore(draggedNodeId, targetNodeId);
        } else {
          d3.select(this).transition().duration(300).attr("transform", `translate(${0}, ${0})`);
        }
      });

    d3.select(ref.current).call(drag);
  }, [nodeDatum.id]);

  return (
    <g ref={ref} data-testid="custom-node" data-node-id={nodeDatum.id} data-node-hierarchy={nodeDatum.hierarchyLevel} cursor="move">
      <defs>
        <filter id="shadow" x="-20%" y="-20%" width="140%" height="140%">
          <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#000" floodOpacity="0.4" />
        </filter>
      </defs>

      <rect width="210" height="90" x="-85" y="-35" rx="0" ry="0" stroke="#3B82F6" strokeWidth="2" fill="#1F2937" filter="url(#shadow)" />

      <text
        fontSize="20" x="0" y="-8" textAnchor="middle" 
        fill={ nodeDatum.hierarchyLevel === 1 ? "#F59E0B" : nodeDatum.hierarchyLevel === 2 ? "#10B981" : "#60A5FA" }
        fontWeight="bold"
      >
        {nodeDatum.name}
      </text>

      <text fill="#D1D5DB" fontSize="12" x="5" y="20" textAnchor="middle" fontStyle="italic">
        {nodeDatum.designation}
      </text>

      <text fill="#9CA3AF" fontSize="11" x="0" y="40" textAnchor="middle">
        Emp ID: {nodeDatum.id}
      </text>
    </g>
  );
}
