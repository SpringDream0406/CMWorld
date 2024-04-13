import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../data/firebaseConfig";
import {
  getAuth,
  signInWithPopup,
  signOut,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import {
  getFirestore,
  doc,
  getDoc,
  setDoc,
  collection,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { firebaseAction } from "../redux/firebaseReducer";
import { Dispatch } from "@reduxjs/toolkit";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth();

export type ProviderName = "Github" | "Google";

export const providers = {
  Github: new GithubAuthProvider(),
  Google: new GoogleAuthProvider(),
};

export class FirebaseUtils {
  constructor(private dispatch: any) {}

  // firebase 인증 상태 체크 실행
  firebaseOnAuthStateChanged(): void {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const UID = user.uid;
        this.dispatch(firebaseAction.setFirebaseUID(UID));
        return;
      }
      this.dispatch(firebaseAction.setFirebaseUID(null));
    });
  }

  // firebase 인증 하기
  async firebaseAuth(name: ProviderName) {
    try {
      await signInWithPopup(auth, providers[name]);
    } catch (error: any) {
      if (error.code === "auth/account-exists-with-different-credential")
        alert(
          `같은 이메일로 다른 인증 수단이 등록되어 있습니다. 
다른 로그인 방법을 사용해보세요.`
        );
      console.error(error);
    }
  }

  // firebase 로그아웃 하기
  async firebaseLogout() {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  }

  async readDataFromDB(path: string) {
    try {
      const docRef = doc(db, path);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  }

  async readUserDataFromDB(uid: string) {
    const path = `users/${uid}`;
    const userData = await this.readDataFromDB(path);
    return userData;
  }

  async writeUserToDB(uid: string, name: string) {
    try {
      const userRef = doc(db, `users/${uid}`);
      await setDoc(userRef, { name });
      return "written";
    } catch (error) {
      console.error("writte error", error);
    }
  }
}

//

export const getPosts = async () => {
  try {
    const postQuery = query(
      collection(db, "posts"),
      where("isDeleted", "==", false)
    );
    const querySnapshot = await getDocs(postQuery);
    const postDats = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      data: doc.data(),
    }));
    return postDats;
  } catch (error) {
    console.error(error);
  }
};

export const writeUserNameToDB = async (
  inputRef: React.RefObject<HTMLInputElement>,
  firebaseUtils: FirebaseUtils,
  firebaseUID: string,
  dispatch: Dispatch<any>,
  setPage: any
) => {
  if (!inputRef.current) return;
  if (!inputRef.current.value) return;
  const inputValue = inputRef.current.value;
  const result = await firebaseUtils.writeUserToDB(firebaseUID, inputValue);
  if (result === "written") dispatch(firebaseAction.setUserName("written"));
  setPage(null);
};

export const guestbookLeftAction = async (
  firebaseUID: string,
  setAuth: any,
  loginBtn: JSX.Element,
  logOutBtn: JSX.Element,
  firebaseUtils: FirebaseUtils,
  addName: JSX.Element,
  dispatch: Dispatch<any>
) => {
  if (!firebaseUID) {
    setAuth(loginBtn);
    return;
  }

  const userData = await firebaseUtils.readUserDataFromDB(firebaseUID);
  if (!userData) {
    setAuth(addName);
    return;
  }

  setAuth(logOutBtn);

  dispatch(firebaseAction.setUserName(userData.name));
};
