import { useState } from "react";
import { FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import type { FilterProps } from "@/utils/types";

const TeamFilterSelect: React.FC<FilterProps> = ({ teams, onTeamChange }) => {
  const [selectedTeam, setSelectedTeam] = useState("");

  const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const team = event.target.value as string;
    setSelectedTeam(team);
    onTeamChange(team);
  };

  return (
    <FormControl
      fullWidth
      variant="outlined"
      size="small"
      sx={{
        backgroundColor: "#374151",
        borderRadius: 1,
        "& .MuiOutlinedInput-root": {
          color: "#F9FAFB",
          "& fieldset": {
            borderColor: "#6B7280",
          },
          "&:hover fieldset": {
            borderColor: "#9CA3AF",
          },
          "&.Mui-focused fieldset": {
            borderColor: "#60A5FA",
          },
        },
        "& .MuiInputLabel-root": {
          color: "#D1D5DB",
        },
        "& .MuiSelect-icon": {
          color: "#D1D5DB",
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
              backgroundColor: "#1F2937",
              color: "#F9FAFB",
              "& .MuiMenuItem-root:hover": {
                backgroundColor: "#4B5563",
              },
            },
          },
        }}
      >
        <MenuItem value="">All Teams</MenuItem>
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