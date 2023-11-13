import { initializeApp } from 'firebase/app';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';

/* Firebase 초기화 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const firebaseApp = initializeApp(firebaseConfig);
const auth = getAuth(firebaseApp);
const provider = new GoogleAuthProvider();

/* 로그인 */
export function login() {
  signInWithPopup(auth, provider).catch(console.error);
}

/* 로그아웃 */
export function logout() {
  signOut(auth).catch(console.error);
}

/* 로그인 세션 정보 유지 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}

// 로그인, 로그아웃 결과를 굳이 외부로 리턴하지 않아도 됨
// 결과에 관심있는 컴포넌트가 있다면 onUserStateChange을 이용해서 결과값을 들음
