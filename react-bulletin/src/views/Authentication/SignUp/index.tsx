import React, {useState} from 'react';
import axios from "axios";
import {
    Box,
    Button,
    Card,
    CardActions,
    CardContent, CardHeader,
    FormControl,
    FormControlLabel,
    FormGroup,
    TextField
} from "@mui/material";
import FormControlContext from "@mui/material/FormControl/FormControlContext";
import {useUserStore} from "../../../stores";
import Typography from "@mui/material/Typography";
import {signUpApi} from "../../../apis";

// 2023.07.31 Added.
interface Props {
    setAuthView: (authView: boolean) => void,
}

export default function SignUp(props: Props){
    const [email, setEmail] = useState<string>('');
    const [password, setPassword] = useState<string>('');
    const [passwordConfirmation, setPasswordConfirmation] = useState<string>('');
    const [nickname, setNickname] = useState<string>('');
    const [phoneNo, setPhoneNo] = useState<string>('');
    const [address, setAddress] = useState<string>('');
    const [addressDetail, setAddressDetail] = useState<string>('');

    // npm install zustand 후
    // /stores/user.store.js and /stores/index.ts 작성 후
    // store는 중괄호{}를 사용함에 주의
    // 여기 store에 저장하게 되면, state를 [외부]에서 관리하게 된는 것이다. 위의 state 들은 [내부]에서만 관리하는 것임.
    const {user, setUser} = useUserStore();

    // 2023.07.30 Added. [SignUp.회원 가입 화면]에서 [SignIn.로그인 화면]으로 왔다 갔다 처리.
    const {setAuthView} = props;

    // 2023.07.30 Added. Enter.엔터키로 "signInHandle()" 클릭 이벤트 발생 시키기.
    // https://velog.io/@yena1025/React-Typescript-%EC%9D%B8%ED%92%8B%EC%B0%BD-%EC%97%94%ED%84%B0%EC%9D%B4%EB%B2%A4%ED%8A%B8-%EA%B5%AC%ED%98%84-%EC%A2%85%EA%B2%B0
    const [keyword, setKeyword] = useState<string>("");

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            signUpHandler();
        }
    }

    const signUpHandler = async () => {
        const data = {
            email: email,
            password: password,
            passwordConfirmation: passwordConfirmation,
            nickname: nickname,
            phoneNo: phoneNo,
            address: address,
            addressDetail: addressDetail
        }

        // 2023.07.31 Conclusion. 아래 axios 구문을 /src/apis/index.ts로 옵티마이징하고, signInResponse로 처리한다.
        const signUpResponse = await signUpApi(data);

        if (!signUpResponse) {
            alert("회원 가입 실패!!!")
            return;
        }
        if (!signUpResponse.result) {
            alert("회원 가입 실패!!!")
            return;
        }

        // 2023.07.31 Conclusion. 아래 axios 구문을 /src/apis/index.ts로 옵티마이징하고, signInResponse로 처리한다.
        // axios. 원래 여기부터 "axios" 구문이다.

        alert("회원 가입 성공!!!")
        setAuthView(false);


        // 2023.07.31 Conclusion. 아래 axios 구문을 /src/apis/index.ts로 옵티마이징하고, 위와 같이 처리한다.
        // axios
        //     .post('http://localhost:8000/api/auth/signUp', data)
        //     .then((response) => {
        //         // setRequestResult(JSON.stringify(response.data));
        //         // setRequestResult("Success!!!");
        //         console.log(response.data);
        //         setEmail('');
        //         setPassword('');
        //     })
        //     .catch((error) => {
        //         // setRequestResult(JSON.stringify(error.response.data));
        //         // setRequestResult("Failed!!!");
        //     })

    };

    return (
        <Card id={"main"} onKeyDown={handleKeyDown}>
            {/*<Card sx={{minWidth: 275, maxWidth: "99vw"}}>*/}

            <CardHeader title={<h2>Sign Up</h2>}></CardHeader>

            {/*<Typography>회원 가입</Typography>*/}
            {/*<Typography variant="body2" color="text.secondary">회원 가입</Typography>*/}
            {/*<Typography variant="h5" color="text.secondary">회원 가입</Typography>*/}

            <CardContent>
                <Box id={"items"}>
                    <TextField fullWidth label="이메일" variant="standard" type="email" onChange={(e)=> setEmail(e.target.value)}/>
                    <TextField fullWidth label="비밀 번호" variant="standard" type="password" onChange={(e)=>setPassword(e.target.value)}/>
                    <TextField fullWidth label="비밀 번호 확인" variant="standard" type="password" onChange={(e)=>setPasswordConfirmation(e.target.value)}/>
                    <TextField fullWidth label="닉네임" variant="standard" onChange={(e)=>setNickname(e.target.value)}/>
                    <TextField fullWidth label="전화 번호" variant="standard" onChange={(e)=> setPhoneNo(e.target.value)}/>
                    <TextField fullWidth label="주소" variant="standard" onChange={(e)=>setAddress(e.target.value)}/>
                    <TextField fullWidth label="상세 주소" variant="standard" onChange={(e)=>setAddressDetail(e.target.value)}/>
                    {/*<h3>{requestResult}</h3>*/}
                </Box>
            </CardContent>
            <CardActions sx={{
                display: "flex",
                flexDirection: "column",
                //alignItems: "center",
            }}>
                <Button onClick={signUpHandler} variant="contained" color="success"> 회원 가입(Sign Up)</Button>
            </CardActions>
            <Box id={"grid"}>
                <Typography>이미 계정이 있습니까?</Typography>
                <Typography fontWeight={800} onClick={()=>setAuthView(false) }>로그인</Typography>
            </Box>
        </Card>
    );

}