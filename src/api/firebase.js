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
export async function login() {
  return signInWithPopup(auth, provider)
    .then((result) => {
      const user = result.user;
      console.log(user);
      return user;
    })
    .catch(console.error);
}

/* 로그아웃 */
export async function logout() {
  return signOut(auth).then(() => null);
}

/* 로그인 세션 정보 유지 */
export function onUserStateChange(callback) {
  onAuthStateChanged(auth, (user) => {
    callback(user);
  });
}
