import React from 'react';
import { AppBar, Toolbar, Typography, Button } from '@mui/material';
import { useMsal } from '@azure/msal-react';
import { InteractionStatus } from "@azure/msal-browser";
import { loginRequest } from '../utils/msalConfig';

interface HeaderProps {
  userName: string | null;
}

const Header: React.FC<HeaderProps> = ({ userName }) => {
  const { instance, inProgress } = useMsal();

  const handleLogin = async () => {
    if (inProgress === InteractionStatus.None) {
      try {
        await instance.loginRedirect(loginRequest);
      } catch (error) {
        console.error("Login failed:", error);
      }
    }
  };

  const handleLogout = () => {
    if (inProgress === InteractionStatus.None) {
      instance.logoutRedirect();
    } else {
      console.warn("Interaction is currently in progress.");
    }
  };

  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6">
          ToDo アプリ
        </Typography>
        <Button color="inherit" onClick={handleLogin} disabled={inProgress !== InteractionStatus.None}>サインイン</Button>
        <Button color="inherit" onClick={handleLogout} disabled={!userName}>サインアウト</Button>
        {userName && (
          <Typography variant="body1" sx={{ marginRight: 2 }}>
            {userName}
          </Typography>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Header;