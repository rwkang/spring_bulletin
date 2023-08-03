// import React, {Component} from 'react';
import React from 'react';
import SignUp from "./SignUp";
import SignIn from "./SignIn";
import Box from "@mui/material/Box";

// class Authentication { // 여기와 맨 아래, export default Authentication; 이 조합은 안 된다. 반드시 Compnent를 상속받아야 한다.
// class Authentication extends Component {
export default function Authentication() { // 이런 한 줄 형식으로 처리하게 한다. 위+맨 아래 2줄 형식과 동일한 진행이다.
    // render() { // 위+맨 아래 2줄 형식일때만 필요.

    // 2023.07.31 Added. authView===true: SingUp(회원 가입 화면으로), authView===false: SignIn(로그인 화면으로)
    const [authView, setAuthView] = React.useState<boolean>(false);

    return (
        <>
            <Box display={"flex"}>
                <Box flex={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                </Box>
                <Box flex={1} display={"flex"} justifyContent={"center"} alignItems={"center"}>
                    {authView? <SignUp setAuthView={setAuthView}/> : <SignIn setAuthView={setAuthView}/>}
                    {/*<SignUp /> <SignIn />*/}
                </Box>
            </Box>
        </>
    );
}

// export default Authentication;