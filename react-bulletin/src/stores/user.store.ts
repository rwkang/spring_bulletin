// 2023.07.29 Created. state.상태를 store에 저장하여, 외부에서 state.상태를 활용할 수 있게 한다.
// 좀 어려운 react-redux 대신에 쉬운 zustand(독일어로 상태) 라이브러리를 활용한다.

// 여기서 가장 중요한 것은, 여기 store.스토어를 부르는 곳(/src/views/Authentication/SignIn/index.tsx) 파일 내에,
// [const [token, expiration, userEntity] = response.data.data;] 여기에서 받는 [userEntity] 값이 정상적인지,
// 반드시 먼저 확인하고, "setStore(userEntity)" 이것을 실행하게 해야 한다는 것이다.

import { create } from 'zustand';

interface UserStore {
    user: any;
    setUser: (user: any) => void;
    removeUser: () => void;
}

const useStore = create<UserStore>((set) => ({
    user: null,
    setUser: (user: any) => {
        set((state) => ({ ...state, user }));
    },
    removeUser: () => {
        set((state) => ({ ...state, user: null }));
    }
}));

export default useStore;
