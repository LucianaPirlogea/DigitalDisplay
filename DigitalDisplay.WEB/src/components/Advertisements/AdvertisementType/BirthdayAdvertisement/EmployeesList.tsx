import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  Checkbox,
  ListItemText,
  InputAdornment,
  TextField,
  Box,
  Typography,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import SearchIcon from '@mui/icons-material/Search';
import { FC, useState } from 'react';
import { Employee } from '../../../../models/employee';
import DatePicker from 'react-datepicker';

interface Props {
  employees: Employee[];
  setEmployees: Function;
  checkedEmployees: Employee[];
  setCheckedEmployees: Function;
  hasSearch?: boolean;
  hasDatePicker?: boolean;
}

export const EmployeesList: FC<Props> = ({
  employees,
  setEmployees,
  checkedEmployees,
  setCheckedEmployees,
  hasSearch = false,
  hasDatePicker = false,
}) => {
  const tomorrow = new Date();
  tomorrow.setDate(tomorrow.getDate() + 1);

  const [searchValue, setSearchValue] = useState<string>('');
  const [valueDate, setValueDate] = useState(tomorrow);

  const findEmployeeIndex = (employee: Employee): number => {
    return checkedEmployees.findIndex(
      (emp) =>
        emp.lastName === employee.lastName &&
        emp.firstName === employee.firstName
    );
  };

  const handleToggle = (employee: Employee) => () => {
    const currentIndex = findEmployeeIndex(employee);
    const newCheckedEmployees = [...checkedEmployees];

    if (currentIndex === -1) {
      newCheckedEmployees.push(employee);
    }

    setCheckedEmployees(newCheckedEmployees);
  };

  const nameFilteredEmployees = () => {
    const filteredEmployees: any[] = employees.filter((employee) => {
      if (searchValue.length === 0) {
        return employee;
      } else {
        return employee.firstName
          .toLowerCase()
          .includes(searchValue.toLowerCase());
      }
    });

    return filteredEmployees;
  };

  const dateFilteredEmployees = () => {
    const filteredEmployees: any = [];
    employees.forEach((employee) => {
      const employeeDate = new Date(employee.birthDate);
      employeeDate.setUTCFullYear(valueDate.getUTCFullYear());

      const afterTomorrowDate = new Date();
      afterTomorrowDate.setDate(valueDate.getDate() + 2);

      if (employeeDate >= valueDate && employeeDate <= afterTomorrowDate) {
        filteredEmployees.push(employee);
      }
    });

    return filteredEmployees;
  };

  const defaultOrFilteredEmployees = (): Employee[] => {
    if (hasSearch) {
      return nameFilteredEmployees();
    } else if (hasDatePicker) {
      return dateFilteredEmployees();
    } else {
      return employees;
    }
  };

  const getYearMonthDayDateString = (unformattedDate: string) => {
    const split = unformattedDate.split('T');
    return split[0];
  };

  return (
    <Box sx={{ display: 'block' }}>
      {hasDatePicker && (
        <Box sx={{}}>
          <DatePicker
            selected={valueDate}
            onChange={(date: Date) => setValueDate(date)}
          />
          <Typography
            variant="caption"
            display="block"
            color={grey[500]}
            marginTop={1}
          >
            birthdays in the next 3 days
          </Typography>
        </Box>
      )}
      {hasSearch && (
        <TextField
          id="outlined-basic"
          value={searchValue}
          placeholder="Search advertisement"
          InputProps={{
            startAdornment: (
              <InputAdornment position="start">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
          onChange={(e) => setSearchValue(e.target.value)}
          variant="standard"
          fullWidth
        />
      )}
      <List
        sx={{
          width: '100%',
          maxWidth: 360,
          bgcolor: 'background.paper',
          position: 'relative',
          overflow: 'auto',
          maxHeight: 300,
          '& ul': { padding: 0 },
        }}
      >
        {defaultOrFilteredEmployees().map((employee) => {
          const labelId = `checkbox-list-label-${employee}`;

          return (
            <ListItem
              key={`${employee.lastName} ${employee.firstName}`}
              disablePadding
            >
              <ListItemButton onClick={handleToggle(employee)} dense>
                <ListItemIcon>
                  <Checkbox
                    edge="start"
                    checked={findEmployeeIndex(employee) !== -1}
                    tabIndex={-1}
                    disableRipple
                    inputProps={{ 'aria-labelledby': labelId }}
                  />
                </ListItemIcon>
                <ListItemText
                  id={labelId}
                  primary={`${employee.lastName} ${employee.firstName}`}
                  secondary={getYearMonthDayDateString(employee.birthDate)}
                />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </Box>
  );
};
