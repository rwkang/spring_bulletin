import React, { useState } from 'react';
import '../style.css';
import {Box, Button, Card, CardActions, CardContent, CardHeader, TextField} from "@mui/material";
import axios from "axios";
import {useCookies} from "react-cookie";
import {useUserStore} from "../../../stores";
import Typography from "@mui/material/Typography";
import {signInApi} from "../../../apis";

// 2023.07.31 Added.
interface Props {
    setAuthView: (authView: boolean) => void,
}

export default function SignIn(props: Props) {
    const [email, setEmail] = useState<string>();
    const [password, setPassword] = useState<string>();

    // npm install cookie 후
    const [cookies, setCookies] = useCookies();

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
            signInHandler();
        }
    }

    const signInHandler = async () => {
        // console.log("email: " + email + " password: " + password);
        if (email === undefined || password === undefined) {
            // if (email === "" || password === "") {
            // if (email?.length === 0 || password?.length === 0) {
            alert("이메일과 비밀 번호를 확인하시오!");
            return;
        }
        const data = {
            // email: email,
            // password: password
            email,
            password
        }
        console.log("data.email: ", data.email);
        console.log("data.password: ", data.password);

        // 2023.07.31 Conclusion. 아래 axios 구문을 /src/apis/index.ts로 옵티마이징하고, signInResponse로 처리한다.
        // axios. 원래 여기부터 "axios" 구문이다.

        const signInResponse = await signInApi(data);
        // console.log("/src/views/Authentication/SignIn/index.tsx.JSON.stringify(signInResponse): " + JSON.stringify(signInResponse));
        // console.log("/src/views/Authentication/SignIn/index.tsx.JSON.stringify(signInResponse.data): " + JSON.stringify(signInResponse.data));
        if (!signInResponse) {
            alert("로그인 실패!");
            return;
        }
        if (!signInResponse.result) {
            alert("로그인 실패!!!");
            return;
        }

        // 2023.08.01 Conclusion. ***** 특별히 주의: 아래 단계별 데이터를 정확히 알고 있어야 한다. *****

        /* 1. signInResponse
        =>
        signInResponse = {
            "result":true,
            "message":"Sign In Success!!!",
            "data": {
                "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyd2thbmdAZ21haWwuY29tIiwiaWF0IjoxNjkwODQ3MTcxLCJleHAiOjE2OTA4NTA3NzF9.M6FbnAc8loFbLj_TjLyAptEQI62YqDmuEzwevm6cMuMMt4oBub-ox2dDs1j3si32MQ2FFlUKz8ROuqvvAt1-qQ",
                "expiration":3600000,
                "userEntity":{
                    "email":"rwkang@gmail.com",
                    "password":"",
                    "nickname":"clarus",
                    "phoneNo":"010-1111-2222",
                    "address":"대한 민국 서울시 강서구 null",
                    "profile":null,
                    "updated":"2023-07-31T22:09:50.000+00:00"
                }
            }
        }
        */

        /* 2. signInResponse.result
        =>
        boolean = true or false
        */

        /* 3. signInResponse.data
        =>
        signInResponse.data = {
            "token":"eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyd2thbmdAZ21haWwuY29tIiwiaWF0IjoxNjkwODQ3MTcxLCJleHAiOjE2OTA4NTA3NzF9.M6FbnAc8loFbLj_TjLyAptEQI62YqDmuEzwevm6cMuMMt4oBub-ox2dDs1j3si32MQ2FFlUKz8ROuqvvAt1-qQ",
            "expiration":3600000,
            "userEntity":{
                "email":"rwkang@gmail.com",
                "password":"",
                "nickname":"clarus",
                "phoneNo":"010-1111-2222",
                "address":"대한 민국 서울시 강서구 null",
                "profile":null,
                "updated":"2023-07-31T22:09:50.000+00:00"
            }
        }
        */

        /* 4. signInResponse.data.userEntity
        =>
        signInResponse.data.useEntity = {
            "email":"rwkang@gmail.com",
            "password":"",
            "nickname":"clarus",
            "phoneNo":"010-1111-2222",
            "address":"대한 민국 서울시 강서구 null",
            "profile":null,
            "updated":"2023-07-31T22:09:50.000+00:00"
        }
        */

        // const { token, expiration, userEntity } = signInResponse;
        // const { token, expiration, userEntity } = signInResponse.result;
        const { token, expiration, userEntity } = signInResponse.data;

        // 2023.07.31 Conclusion. 각각의 항목(token, userEntity)에, expires.만료 시간 옵션을 설정한다.
        setCookies('token', token, { expires: new Date(Date.now() + expiration) }); // 탭나인
        setCookies('userEntity', userEntity, { expires: new Date(Date.now() + expiration ) });

        // console.log("/react-board/src/views/Authentication/SignIn/index.tsx.JSON.stringify(signInResponse.data): ", JSON.stringify(signInResponse.data));
        // console.log("/react-board/src/views/Authentication/SignIn/index.tsx.token: ", token);
        // console.log("/react-board/src/views/Authentication/SignIn/index.tsx.expiration: ", expiration);
        // console.log("/react-board/src/views/Authentication/SignIn/index.tsx.JSON.stringify(userEntity): ", JSON.stringify(userEntity));
        // console.log("signInResponse.data.nickname: ", signInResponse.data.nickname);

        setUser(userEntity);

        // 2023.07.31 Conclusion. 아래 axios 구문을 /src/apis/index.ts로 옵티마이징하고, 위와 같이 처리한다.
        // axios
        //     .post("http://localhost:8000/api/auth/signIn", data)
        //     .then((response)=> {
        //
        //         const responseData = response.data;
        //         if (!responseData.result) {
        //             alert("로그인에 실패했습니다!!!");
        //             return;
        //         }
        //
        //         // 2023.07.28 Conclusion. Response.응답 자료를 정확히 이해해야 한다.
        //         // 1. response.data는 리턴 값, 즉 result 전체 값이다.
        //         /*
        //             {
        //                 "result": true,
        //                 "message": "Sign In Success!!!",
        //                 "data": {
        //                     "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyd2thbmdAZ21haWwuY29tIiwiaWF0IjoxNjkwNTcyMzQzLCJleHAiOjE2OTA1NzU5NDN9.T2O-P47rzqQ-0qUrQmghWjy9B8mrvYIhelM_agnIKu4EiHd0u8FZExASK1yRV32qD7PDFbRQ2rUeO5G-s-2Xog",
        //                     "expiration": 2592000,
        //                     "userEntity": {
        //                         "email": "rwkang@gmail.com",
        //                         "password": "",
        //                         "nickname": "clarus",
        //                         "phoneNo": "01035524183",
        //                         "address": "100 101",
        //                         "profile": null,
        //                         "updated": "2023-07-28T19:09:06.000+00:00"
        //                     }
        //                 }
        //             }
        //          */
        //         // 2. response.data.data는 리턴 값, 즉 result 중에서 [data]만을 가리키는 값이다.
        //         /*
        //             "data": {
        //                 "token": "eyJhbGciOiJIUzUxMiJ9.eyJzdWIiOiJyd2thbmdAZ21haWwuY29tIiwiaWF0IjoxNjkwNTcyNTE4LCJleHAiOjE2OTA1NzYxMTh9.kbhkcjbV8-fVpd995ONe9eEmVGZaJ0ikxiPNs7Ch9slwJKcc4AzaZtRu77RxpxnAZYT35-XUTjquhHr6vrwF3A",
        //                 "expiration": 2592000,
        //                 "userEntity": {
        //                     "email": "rwkang@gmail.com",
        //                     "password": "",
        //                     "nickname": "clarus",
        //                     "phoneNo": "01035524183",
        //                     "address": "100 101",
        //                     "profile": null,
        //                     "updated": "2023-07-28T19:09:06.000+00:00"
        //                 }
        //          */
        //
        //         console.log("response.data: ", response.data);
        //         console.log("response.data.data: ", response.data.data);
        //
        //         const { token, expiration, userEntity } = response.data.data;
        //
        //         console.log("token: ", token);
        //         console.log("expiration: ", expiration);
        //         console.log("userEntity: ", userEntity);
        //
        //
        //         // 2023.07.28 Conclusion. token.토큰은 cookie.쿠키에 저장하고, userEntity는 store에 저장한다.
        //         // F12/Application/Cookies/http://localhost:8000 화면에서 확인 가능. token/Expires 등
        //
        //         // npm install react-cookie --force
        //         // npm install react-redux --force 이거 대신에 npm install zustand --force 사용 가능.
        //
        //         // 1. cookie.쿠키에 토큰 저장: 상단에 const [cookie, setCookie] = useCookies();
        //
        //         // 1.1 강의에서는 이렇게 처리하네.
        //         // const expires = new Date();
        //         // expires.setMilliseconds(expires.getMilliseconds() + expiration);
        //         // Sat Jul 29 2023 06:49:08 GMT+0900 (한국 표준시) <= 현재 시각: 05:49:08 // 1시간
        //
        //         // 1.2 tabnine.탭나인에서는 이렇게 처리하네...
        //         // const expires = new Date(Date.now() + expiration * 1000);
        //         // Mon Sep 08 2023 21:49:08 GMT+0900 (한국 표준시) <= 현재 시각: 05:49:08 // 약 40일
        //         // const expires = new Date(Date.now() + expiration);
        //         // Sat Jul 29 2023 06:49:08 GMT+0900 (한국 표준시) <= 현재 시각: 05:49:08 // 1시간
        //
        //         // console.log("expires: ", expires);  // rwkang@gmail.com
        //         console.log("expiration: ", expiration);  // 3,600,000 // 1시간
        //
        //         // 1.3 아래와 같이 1줄로 처리한다.
        //         // setCookie('token', token, { expires }); // 강의에서...
        //         setCookies('token', token, { expires: new Date(Date.now() + expiration) }); // 탭나인
        //
        //         // F12/Application/Cookies/http://localhost:8000 화면에서 확인 가능. token/Expires 등
        //         // alert("cookies.token: " + cookies.token);
        //
        //         // 2. store에 userEntity 저장: const [token, setToken] = useState(response.data.data.token);
        //         // 여기서 가장 중요한 것은, 여기 store.스토어를 부르는 곳(/src/views/Authentication/SignIn/index.tsx) 파일 내에,
        //         // [const [token, expiration, userEntity] = response.data.data;] 여기에서 받는 [userEntity] 값이 정상적인지,
        //         // 반드시 먼저 확인하고, "setStore(userEntity)" 이것을 실행하게 해야 한다는 것이다.
        //
        //         // const [userEntity, setUserEntity] = useState(response.data.data.userEntity);
        //         // setUserEntity(response.data.data.userEntity);
        //         setCookies('userEntity', response.data.data.userEntity, { expires: new Date(Date.now() + expiration ) });
        //
        //         console.log("response.data.data.toString: ", response.data.data.userEntity.toString());
        //         console.log("response.data.data.nickname: ", response.data.data.userEntity.nickname);
        //
        //         console.log("======================================= ");
        //         console.log("======================================= userEntity: ", userEntity);
        //         setUser(userEntity);
        //
        //     })
        //     .catch((error)=> {
        //         alert("로그인 실패!!!!!!");
        //     })

    }

    return (

        <Card id={"main"} onKeyDown={handleKeyDown}>
            {/*<Card sx={{minWidth: 275, maxWidth: "99vw"}}>*/}

            <CardHeader title={<h2>Sign In</h2>}></CardHeader>

            {/*<Typography>로그인</Typography>*/}
            {/*<Typography variant="body2" color="text.secondary">로그인</Typography>*/}
            {/*<Typography variant="h5" color="text.secondary">로그인</Typography>*/}

            <CardContent>
                <Box id={"items"}>
                    {/*<h1>Sign In</h1>*/}

                    {/*위에서, store 처리한 후 [외부]에서도 아래와 같이 state.상태를 불러 사용할 수 있다*/}
                    { user != null && (<h2>{user.nickname}</h2>)}

                    <TextField fullWidth label="이메일" variant="standard" type="email" onChange={(e)=>setEmail(e.target.value)}></TextField>
                    <TextField fullWidth label={"비밀 번호"} variant={"standard"} type={"password"} onChange={(e)=>setPassword(e.target.value)}></TextField>
                </Box>
            </CardContent>
            <CardActions sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center"
            }}>
                <Box>
                    <Button onClick={()=>signInHandler() } variant="contained" color="success">로그인</Button>
                </Box>
                {/*<Box>*/}
                {/*    <Typography sx={{*/}
                {/*      display: "flex",*/}
                {/*      flexDirection: "column",*/}
                {/*      alignItems: "center"*/}
                {/*    }} component={"div"} display={"flex"}>신규 사용자인가요?</Typography>*/}
                {/*    <Typography onClick={()=>{} } color="success">로그인</Typography>*/}
                {/*    /!*<Button onClick={()=>{} } variant="contained" color="success">로그인</Button>*!/*/}
                {/*</Box>*/}
            </CardActions>
            <Box id={"grid"}>
                <Typography>신규 사용자인가요?</Typography>
                <Typography fontWeight={800} onClick={()=>setAuthView(true) }>회원 가입</Typography>
            </Box>
        </Card>

    );

}



