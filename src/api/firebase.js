import { initializeApp } from 'firebase/app';
import { v4 as uuid } from 'uuid';
import {
  getAuth,
  GoogleAuthProvider,
  signInWithPopup,
  signOut,
  onAuthStateChanged,
} from 'firebase/auth';
import { getDatabase, ref, get, set } from 'firebase/database';

/* Firebase 초기화 */
const firebaseConfig = {
  apiKey: process.env.REACT_APP_FIREBASE_API_KEY,
  authDomain: process.env.REACT_APP_FIREBASE_AUTH_DOMAIN,
  databaseURL: process.env.REACT_APP_FIREBASE_DATABASE_URL,
  projectId: process.env.REACT_APP_FIREBASE_PROJECT_ID,
};

const app = initializeApp(firebaseConfig);
const auth = getAuth();
const provider = new GoogleAuthProvider();
const database = getDatabase(app);

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
  onAuthStateChanged(auth, async (user) => {
    // 1. 사용자가 있는 경우에 (로그인 한 경우)
    // user && adminUser(user);
    const updatedUser = user ? await adminUser(user) : null;
    // console.log(user);
    callback(updatedUser);
  });
}

/* isAdmin을 넣어서 객체로 리턴 */
async function adminUser(user) {
  // 2. 사용자가 어드민 권한을 가지고 있는지 확인!
  // 3. {...user, isAdmin: true/false}
  return get(ref(database, 'admins')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        const admins = snapshot.val();
        // console.log(admins);
        const isAdmin = admins.includes(user.uid);
        return { ...user, isAdmin };
      }
      return user;
    });
}

/* 파이어베이스에 새로운 제품 등록 */
export async function addNewProduct(product, imageUrl) {
  // 고유한 ID 생성
  const id = uuid();

  // 파이어베이스의 'products' 경로에 새로운 제품 정보를 등록
  return set(ref(database, `products/${uuid()}`), {
    ...product, // 기존의 받아온 product에 있는 모든 key와 value를 복사해옴
    id, // 생성한 고유 ID를 추가
    price: parseInt(product.price), // 제품 가격을 정수형으로 변환하여 등록
    image: imageUrl, // 'image'라는 key에 전달받은 imageUrl을 등록
    options: product.options.split(','), // 콤마(,)로 구분된 문자열을 배열로 변환하여 등록
  });
}

/* 제품 목록 가져오기 */
export async function getProducts() {
  return get(ref(database, 'products')) //
    .then((snapshot) => {
      if (snapshot.exists()) {
        return Object.values(snapshot.val()); // value 들만 가져옴
      }
      return [];
    });
}
