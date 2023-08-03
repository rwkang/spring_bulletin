import React, {useEffect, useState} from "react";
// import {Navigation} from "@mui/icons-material"; 여기 내용을 복사해서, 아래 "../../views/Navigation/Navigation.tsx" 파일에 그대로 붙여넣기 하고, 이름만 Navigation으로 변경했다.
import {Abc} from "@mui/icons-material";
import {useCookies} from "react-cookie";
import {useUserStore} from "../../../../stores";
import axios from "axios";
import Navigation from "../../../Navigation";
import Authentication from "../../index";
import BulletinMain from "../../BulletinMain";


export default function MainLayout() {

    const [bulletinResponse, setBulletinResponse] = useState<string>('');
    const [cookies] = useCookies();
    const {user} = useUserStore();

    // 2023.08.01 Conclustion. ***** 상당 중요 개념 *****
    // SignIn.로그인 창에서, [email, password]를 넣고, SignIN.로그인 버튼을 클릭했을 때,
    // /SignIn/index.jsx에서, [token.토큰]을 사용하여, ~~~

    // const getBoard = async () => { // 1방식
    // const getBoard = async (token: string) => { // 2방식
    //     await axios
    //         // .get("http://localhost:8000/api/board") // 1방식
    //         .get("http://localhost:8000/api/board", { // 2방식
    //             headers: {
    //                 Authorization: `Bearer ${token}`
    //             }
    //         })
    //         .then((response) => {
    //             setBoardResponse(response.data);
    //         })
    //         .catch((error)=>'');
    // }

    // => 상기 getBoard()를 아래와 같이 재정리 하였다.
    const getBulletin = async (token: string) => {
        const requestOptions = {
            headers: {
                Authorization: `Bearer ${token}`
            }
        }
        await axios
            .get('http://localhost:8000/api/bulletin', requestOptions)
            .then((response) => {
                setBulletinResponse(response.data);
            }).catch((error) => '')
    }

    useEffect(()=>{
        const token = cookies.token;
        // console.log("===================================>/react-board/src/views/BoardMain/index.tsx/useEffect.token: ", token);
        // if (token) getBoard(); // 1방식
        if (token) getBulletin(token); // 2방식
        else setBulletinResponse("");
        // }, []); // [user]가 변경될 때 마다 실행되게 한다.
    }, [cookies.token]); // [user]가 변경될 때 마다 실행되게 한다.
    // }, [user]); // [user]가 변경될 때 마다 실행되게 한다.

    console.log("===================================>/react-board/src/views/BoardMain/index.tsx");

    return (
        <>
            <Navigation />
            {/*token.토큰 값이 있으면 BoardMain, 없으면 Authentication */}
            {user ? (<BulletinMain />) : (<Authentication/>)}
            {/*{boardResponse ? (<BoardMain />) : (<Authentication/>)}*/}
            {/*<Authentication />*/}
            {/*<BoardMain />*/}

        </>
    )
}