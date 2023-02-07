import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Button from '@mui/material/Button';
import MenuItem from '@mui/material/MenuItem';
import AdbIcon from '@mui/icons-material/Adb';
import { FC } from 'react';
import { Link } from 'react-router-dom';
import './header.css';
import TvIcon from '@mui/icons-material/Tv';

const adsObj = { route: 'AdvertisementList', name: 'Advertisements' };
const devObj = { route: 'Devices', name: 'Devices' };
const panObj = { route: 'Panel', name: 'Panel' };
const panLayObj = { route: 'PanelLayoutOverview', name: 'Panel Layout' };

const routes = [adsObj, devObj, panObj, panLayObj];

export const Header: FC = () => {
  const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(
    null
  );

  const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorElNav(event.currentTarget);
  };

  const handleCloseNavMenu = () => {
    setAnchorElNav(null);
  };

  const styleToolBarImg = {
    width: '80px',
    height: '80px',
    marginRight: '20px',
  };

  const styleBox = {
    flexGrow: 1,
    display: { xs: 'flex', md: 'none' },
    fontSize: '50px',
  };

  const styleTypo = {
    mr: 2,
    display: { xs: 'flex', md: 'none' },
    flexGrow: 1,
    fontFamily: 'monospace',
    fontWeight: 700,
    letterSpacing: '.3rem',
    color: 'inherit',
    textDecoration: 'none',
  };

  const styleButton = {
    my: 2,
    color: 'black',
    display: 'block',
    fontSize: '16px',
    fontWeight: 'bold',
  };
  return (
    <AppBar className="navSettings" position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>
          <TvIcon sx={styleToolBarImg} />

          <Box sx={styleBox}>
            <IconButton
              size="large"
              aria-label="account of current user"
              aria-controls="menu-appbar"
              aria-haspopup="true"
              onClick={handleOpenNavMenu}
              color="inherit"
            >
              <MenuIcon />
            </IconButton>
            <Menu
              id="menu-appbar"
              anchorEl={anchorElNav}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              keepMounted
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(anchorElNav)}
              onClose={handleCloseNavMenu}
              sx={{
                display: { xs: 'block', md: 'none' },
              }}
            >
              {routes.map((obj) => (
                <MenuItem key={obj.route} onClick={handleCloseNavMenu}>
                  <Link style={{ textDecoration: 'none' }} to={`/${obj.route}`}>
                    <Typography textAlign="center">

                      {obj.name}
                    </Typography>
                  </Link>
                </MenuItem>
              ))}
            </Menu>
          </Box>
          <AdbIcon sx={{ display: { xs: 'flex', md: 'none' }, mr: 1 }} />
          <Typography variant="h5" noWrap component="a" href="" sx={styleTypo}>
            LOGO
          </Typography>
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>
            {routes.map((obj) => (
              <Link
                key={obj.route}
                style={{ textDecoration: 'none', color: 'white' }}
                to={`/${obj.route}`}
              >
                <Button onClick={handleCloseNavMenu} sx={styleButton}>
                  {obj.name}
                </Button>
              </Link>
            ))}
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
