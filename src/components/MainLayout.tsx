import { useSelector } from 'react-redux'
import type { EmployeeData } from '@/utils/types';
import Tree from "react-d3-tree";
import CustomNode from "./CustomNode";

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
  function assignLevels(node: any, level: number) {
    node.hierarchyLevel = level;
    node.children.forEach((child: any) => assignLevels(child, level + 1));
  }

  if (root) {
    assignLevels(root, 1)
  }
  console.log(root)
  
  return [root]
}

const MainLayout = () => {
  const employeeList = useSelector((store: any) => store.employeeData?.employeeList || [])
    const root = buildHierarchy(employeeList);
  if (!root) return null;

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