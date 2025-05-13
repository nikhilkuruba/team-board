import { useSelector } from "react-redux";
import type { EmployeeListProps } from "@/utils/types";
import { useEffect, useRef, useState } from "react";
import Tree from "react-d3-tree";
import CustomNode from "./CustomNode";

function buildHierarchy(employees: EmployeeListProps): any {
  if (!employees || !employees.length) return null;

  const employeesData = structuredClone(employees);

  const map: Record<string, any> = {};
  let root = null;
  const employeeIds = new Set(employeesData.map((emp) => emp.id));

  const updatedEmployeeList = employeesData.map((employee) => {
    if (employee.manager && !employeeIds.has(employee.manager)) {
      return { ...employee, manager: null };
    }
    return employee;
  });
  updatedEmployeeList.forEach((emp) => {
    map[emp.id] = { ...emp, children: [] };
  });

  updatedEmployeeList.forEach((emp) => {
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
    assignLevels(root, 1);
  }
  return [root];
}

const MainLayout = () => {
  const employeeList = useSelector(
    (store: any) => store.employeeData?.filteredEmployeeList || []
  );
  const containerRef = useRef(null);
  const [translate, setTranslate] = useState({ x: 0, y: 0 });
  const [zoom, setZoom] = useState(1);

  const root = buildHierarchy(employeeList);
  const key = employeeList?.length + "-" + employeeList?.map((e) => e?.id + "-" + e?.manager)?.join(",");

  useEffect(() => {
    const timeout = setTimeout(() => {
      const container = containerRef.current;
      const svg = container?.querySelector("svg");
      if (container && svg) {
        const containerWidth = container.getBoundingClientRect().width;
        const treeWidth = svg.getBBox().width || svg.getBoundingClientRect().width;
        const calculatedZoom = Math.min(1, containerWidth / (treeWidth + 100))
        setZoom(calculatedZoom);

        setTranslate({
          x: containerWidth / 2,
          y: 100,
        });
      }
    }, 100)

    return () => clearTimeout(timeout);
  }, [employeeList, key]);

  if (!root) return
  return (
    <div
      id="treeWrapper"
      ref={containerRef}
      className="bg-[#111827]"
      style={{ width: "100%", overflow: "hidden" }}
    >
      {root && (
        <Tree
          key={key}
          data={root}
          renderCustomNodeElement={(rd3tProps) => <CustomNode {...rd3tProps} />}
          pathFunc="step"
          separation={{ siblings: 2, nonSiblings: 2 }}
          orientation="vertical"
          zoom={zoom}
          translate={translate}
          initialDepth={Infinity}
        />
      )}
    </div>
  );
};

export default MainLayout;
