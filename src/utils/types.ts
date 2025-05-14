export interface EmployeeData {
  id: string;
  name: string;
  designation: string;
  team: string;
  manager: string | null;
}

export type EmployeeListProps = EmployeeData[];
export interface NodeDatum {
  id?: string;
  name?: string;
  designation?: string;
  team?: string;
  manager?: string | null;
  children?: NodeDatum[];
  hierarchyLevel?: number;
  __r3d3?: {
    collapsed: boolean;
    depth: number;
    id: string;
  };
}

export interface FilterProps {
  teams: string[];
  onTeamChange: (team: string) => void;
}
