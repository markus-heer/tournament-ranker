import { Box, CssBaseline, Toolbar } from '@mui/material';
import React, { useState } from 'react';
import { Route, Routes } from 'react-router-dom';

import { Menu } from './Menu';
import { Dashboard } from './pages/Dashboard/Dashboard';
import { Games } from './pages/Games/Games';
import { Players } from './pages/Players/Players';
import { TopBar } from './TopBar';

const menuWidth = 240;

const App: React.VFC = () => {
  const [menuOpen, setMenuOpen] = useState(true);

  const toggleMenu = () => {
    setMenuOpen(!menuOpen);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <CssBaseline />
      <TopBar menuOpen={menuOpen} toggleMenu={toggleMenu} menuWidth={menuWidth} />
      <Menu menuOpen={menuOpen} toggleMenu={toggleMenu} menuWidth={menuWidth} />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          height: '100vh',
          overflow: 'auto',
        }}
      >
        <Toolbar />
        <Routes>
          <Route path="/" element={<Dashboard />}></Route>
          <Route path="/games" element={<Games />}></Route>
          <Route path="/players" element={<Players />}></Route>
        </Routes>
      </Box>
    </Box>
  );
};

export default App;
