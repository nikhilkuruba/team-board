import React, { useState } from 'react';
import { FormControl, InputLabel, Select, MenuItem } from '@mui/material';

interface Props {
  teams: string[]
  onTeamChange: (team: string) => void;
}

const TeamFilterSelect: React.FC<Props> = ({ teams, onTeamChange }) => {
  const [selectedTeam, setSelectedTeam] = useState('');

  const handleTeamChange = (event: React.ChangeEvent<{ value: unknown }>) => {
    const team = event.target.value as string;
    setSelectedTeam(team);
    onTeamChange(team);
  };

  return (
    <FormControl fullWidth variant="outlined" size="small">
      <InputLabel id="team-select-label">Filter by Team</InputLabel>
      <Select
        labelId="team-select-label"
        value={selectedTeam}
        label="Filter by Team"
        onChange={handleTeamChange}
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