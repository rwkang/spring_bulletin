import axios from "axios";

// 2023.08.01 Conclusion. 여기 "signInApi"는 시작을 [소문자]로 시작했음에 주의.
// export default function SignIn(props: Props) {} 이와 같은 형태의 펑셩명은 [대문자]로 시작함에 주의.

export const signInApi = async (data: any) => {

    // 1 방식
    // const response = await axios.post("localhost:8000/api/auth/signIn", data).catch((error) => null);
    // 2 방식
    // const API_URL = "http://localhost:8000/api";
    // const response = await axios.post(`${API_URL}`+"/auth/signIn", data).catch((error) => null);
    const API_URL = "http://localhost:8000/api/auth/signIn";

    const response =
        await axios
            .post(`${API_URL}`, data)
            .catch((error) => null);

    if (!response) return null;

    const result = response.data;
    // console.log("/src/apis/index.ts.JSON.stringify(result): " + JSON.stringify(result));
    return result;

    // await axios
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
}

export const signUpApi = async (data: any) => {

    // const API_URL = process.env.REACT_APP_API_URL;
    // const API_URL = "http://localhost:8000/api";
    // const response = await axios.post(`${API_URL}/auth/signUp`, data).catch((error) => null);
    const API_URL = "http://localhost:8000/api/auth/signUp";
    // const response = await axios.post("http://localhost:8000/api/auth/signUp", data).catch((error) => null);

    const response =
        await axios
            .post(`${API_URL}`, data)
            .catch((error) => null);

    if (!response) return null;

    const result = response.data;
    console.log("/src/apis/index.ts.JSON.stringify(result): " + JSON.stringify(result));
    return result;

}