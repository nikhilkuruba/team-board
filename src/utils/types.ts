export interface EmployeeData {
  id: string;
  name: string;
  designation: string;
  team: string;
  manager: string | null;
}

export type EmployeeListProps = EmployeeData[];
export interface NodeDatum extends EmployeeData {
  children?: NodeDatum[];
  hierarchyLevel?: number;
}

export interface FilterProps {
  teams: string[];
  onTeamChange: (team: string) => void;
}
