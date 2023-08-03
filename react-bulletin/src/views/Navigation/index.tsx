// import {Navigation} from "@mui/icons-material";

import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import PersonIcon from '@mui/icons-material/Person'; // 일반 사람
import Person2TwoToneIcon from '@mui/icons-material/Person2TwoTone';
import {useUserStore} from "../../stores";
import {useCookies} from "react-cookie"; // Two tone 사람

export default function Navigation() {

    // 2023.08.01 Added.
    const {user, removeUser} = useUserStore();

    const [cookies, setCookies] = useCookies();

    const logOutHandler = () => {
        // token.토큰을 [빈 값]으로 하고, 만료 시간을 [현재 시간]으로 세팅하고,
        // removeUser()를 호출해 주면, 현재 로그인 사용자와 그에 해당하는 cookie.쿠키도 모두 날려 버린다.
        setCookies('token', '', {expires: new Date()});
        removeUser();
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static">
                <Toolbar>
                    <IconButton
                        size="large"
                        edge="start"
                        color="inherit"
                        aria-label="menu"
                        sx={{ mr: 2 }}
                    >
                        <MenuIcon />
                    </IconButton>
                    <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
                        News
                    </Typography>

                    {/*// 2023.08.01 Added.*/}
                    {user ?
                        (<IconButton color="inherit" onClick={()=>logOutHandler()}><PersonIcon /></IconButton>)
                        :
                        (<Button color="inherit">Login</Button>)
                    }

                    {/*<Button color="inherit">Login</Button>*/}
                    {/*<IconButton color="inherit"><PersonIcon /></IconButton>*/}
                    {/*<IconButton color="inherit"><Person2TwoToneIcon /></IconButton>*/}

                </Toolbar>
            </AppBar>
        </Box>
    );
}