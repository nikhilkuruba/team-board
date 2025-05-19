import { render, screen } from "@testing-library/react";
import CustomNode from "@/components/CustomNode";
import { vi } from "vitest";
import { describe, it, expect } from 'vitest'


// Mock d3.drag
vi.mock("d3", async () => {
  const d3 = await vi.importActual<typeof import("d3")>("d3");

  const mockDrag = () => {
    const fn: any = () => {}
    fn.on = vi.fn().mockReturnThis()
    return fn
  };

  return {
    ...d3,
    drag: mockDrag,
  }
})

// Mock useUpdateNodeManager
vi.mock("@/hooks/useUpdateNodeManager", () => ({
  __esModule: true,
  default: () => ({
    updateManager: vi.fn(),
    updateManagerInStore: vi.fn(),
  })
}))

describe("CustomNode", () => {
  const mockNode = {
    id: "5",
    name: "Charlie",
    designation: "Development manager",
    team: "Engineering",
    manager: "2",
    hierarchyLevel: 3,
  };

  it("renders node with name, designation, and employee ID", () => {
    render(<svg><CustomNode nodeDatum={mockNode} /></svg>);

    expect(screen.getByText("Charlie")).toBeInTheDocument();
    expect(screen.getByText("Development manager")).toBeInTheDocument();
    expect(screen.getByText("Emp ID: 5")).toBeInTheDocument();
  });

  it("has correct data attributes", () => {
    render(<svg><CustomNode nodeDatum={mockNode} /></svg>);
    const g = screen.getByTestId("custom-node")

    expect(g).toHaveAttribute("data-node-id", "5");
    expect(g).toHaveAttribute("data-node-hierarchy", "3");
  });

  it("applies fill color based on hierarchyLevel", () => {
    render(<svg><CustomNode nodeDatum={mockNode} /></svg>);
    const text = screen.getByText("Charlie");

    expect(text).toHaveAttribute("fill", "#60A5FA")
  });
  
  it("applies yellow color when hierarchyLevel is 1", () => {
    const yellowNode = { ...mockNode, hierarchyLevel: 1 };
    render(<svg><CustomNode nodeDatum={yellowNode} /></svg>);
    expect(screen.getByText("Charlie")).toHaveAttribute("fill", "#F59E0B");
  })
});
