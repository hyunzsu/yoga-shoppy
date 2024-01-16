import { createContext, useContext, useEffect, useState } from 'react';
import { onUserStateChange, login, logout } from '../api/firebase';

/* AuthContext 생성 */
const AuthContext = createContext();

/* AuthContext의 Provider 역할을 하는 컴포넌트 */
export function AuthContextProvider({ children }) {
  const [user, setUser] = useState(); // 사용자 정보 상태를 관리하는 state

  useEffect(() => {
    // onUserStateChange 함수를 사용해 사용자 상태 변화 감지, 변화가 있을때마다 serUser 호출하여 상태 업데이트
    onUserStateChange((user) => {
      console.log(user);
      setUser(user);
    });
  }, []);

  /* AuthContext.Provider 컴포넌트 반환 */
  return (
    // value prop으로 현재 사용자 정보 및 로그인, 로그아웃 함수를 제공
    <AuthContext.Provider
      value={{ user, uid: user && user.uid, login, logout: logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}

/* 컴포넌트에서 AuthContext의 값을 사용할 수 있게 하는 Hook */
export function useAuthContext() {
  return useContext(AuthContext);
}

// user가 있다면 uid 도 낱개로 펼쳐서 전달해줌
