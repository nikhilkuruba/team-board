import { useSelector } from 'react-redux'
import type { EmployeeData } from '@/utils/types';
import Tree from "react-d3-tree";
import CustomNode from "./CustomNode";
import Draggable from 'react-draggable';

function buildHierarchy(employees: EmployeeData[]): any {
  if (!employees || !employees.length) return null;
  const map: Record<string, any> = {};
  let root = null;

  employees.forEach(emp => {
    map[emp.id] = { ...emp, children: [] };
  });
  
  employees.forEach(emp => {
    if (emp.manager) {
      map[emp.manager]?.children.push(map[emp.id]);
    } else {
      root = map[emp.id];
    }
  });

  return [root]
}

const MainLayout = () => {
  const employeeList = useSelector((store: any) => store.employeeData?.employeeList || [])
    const root = buildHierarchy(employeeList);
  if (!root) return null;

  function makeDraggable(e) {
      var svg = evt.target;
  svg.addEventListener('mousedown', startDrag);
  svg.addEventListener('mousemove', drag);
  svg.addEventListener('mouseup', endDrag);
  svg.addEventListener('mouseleave', endDrag);
  }

    function startDrag(evt) {
      console.log("startDrag", evt);
      
  }
  function drag(evt) {
  }
  function endDrag(evt) {
  }

  return (
    <div id="treeWrapper" style={{ width: "100%", height: "100vh" }}>
        <Tree
          data={root}
          renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
          pathFunc="step"
          separation={{ siblings: 2, nonSiblings: 2 }}
          orientation="vertical"
          translate={{ x: 900, y: 100 }}
          initialDepth={Infinity}
        />
      </div>
  );
}

export default MainLayout