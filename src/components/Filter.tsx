import { useState, type ChangeEvent, type ReactNode } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { FilterProps } from "@/utils/types";

type FilterchangeEvent = ChangeEvent<Omit<HTMLInputElement, "value"> & { value: string; }> | (Event & { target: { value: string; name: string; }; })

const TeamFilterSelect: React.FC<FilterProps> = ({ teams, onTeamChange }) => {
  const [ selectedTeam, setSelectedTeam ] = useState("");

  const handleTeamChange: (event: FilterchangeEvent, child: ReactNode) => void = (event) => {
    const team = event.target.value;
    setSelectedTeam(team);
    onTeamChange(team);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      sx={{
        backgroundColor: "var(--color-bg-sidebar)",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          color: "var(--color-text-filter)",
          "& fieldset": {
            borderColor: "var(--color-border-filter)",
          },
          "&:hover fieldset": {
            borderColor: "var(--color-emp-text)",
          },
          "&.Mui-focused fieldset": {
            borderColor: "var(--color-input-border)",
          },
        },
        "& .MuiInputLabel-root": {
          color: "var(--color-input-label)",
        },
        "& .MuiSelect-icon": {
          color: "var(--color-input-label)",
        },
      }}
    >
      <InputLabel id="team-select-label">Filter by Team</InputLabel>
      <Select
        labelId="team-select-label"
        value={selectedTeam}
        label="Filter by Team"
        onChange={handleTeamChange}
        MenuProps={{
          PaperProps: {
            sx: {
              backgroundColor: "var(--color-bg-navbar)",
              color: "var(--color-text-filter)",
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "var(--color-input-bg-hover)",
              },
            },
          },
        }}
      >
        {teams.length > 0 && <MenuItem value="" className="italic ">All Teams</MenuItem>}
        {teams.map((team) => (
          <MenuItem key={team} value={team}>
            {team}
          </MenuItem>
        ))}
      </Select>
    </FormControl>
  );
};

export default TeamFilterSelect;