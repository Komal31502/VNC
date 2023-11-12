import React from 'react'
import "./AllTabs.css";
import Box from '@mui/material/Box';
import Tab from '@mui/material/Tab';
import { TabContext, TabList, TabPanel } from '@mui/lab';
import BottomBudget from '../BottomBudget/BottomBudget';
import BottomGeneral from '../BottomGeneral/BottomGeneral';
import BottomPerformance from '../BottomPerformance/BottomPerformance';
import BottomProgress from '../BottomProgress/BottomProgress';

const AllTabs = () => {
  const [value, setValue] = React.useState('1');

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <div className='tabs-container'>
      <Box sx={{ width: '100%', typography: 'body1' }}>
        <TabContext value={value}>
          <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
            <TabList onChange={handleChange} aria-label="lab API tabs example">
              <Tab label="General" value="1" />
              <Tab label="Progress" value="2" />
              <Tab label="Performance" value="3" />
              <Tab label="Budget" value="4" />
              <Tab label="Tasks" value="5" disabled/>
            </TabList>
          </Box>
          <TabPanel value="1"><BottomGeneral /></TabPanel>
          <TabPanel value="2"><BottomProgress /></TabPanel>
          <TabPanel value="3"><BottomPerformance/></TabPanel>
          <TabPanel value="4"><BottomBudget/></TabPanel>
        </TabContext>
      </Box>
    </div>
  )
}

export default AllTabs
