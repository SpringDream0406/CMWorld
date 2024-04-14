import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../../data/firebaseConfig";
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
  DocumentData,
  updateDoc,
} from "firebase/firestore";
import { firebaseAction } from "../../redux/firebaseReducer";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth();

export type ProviderName = "Github" | "Google";

export const providers = {
  Github: new GithubAuthProvider(),
  Google: new GoogleAuthProvider(),
};

export class FirebaseService {
  // firebase 인증 상태 체크 실행
  firebaseOnAuthStateChanged(dispatch: any): void {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const UID = user.uid;
        dispatch(firebaseAction.setFirebaseUID(UID));
        return;
      }
      dispatch(firebaseAction.setFirebaseUID(null));
    });
  }

  // firebase 인증 하기
  async firebaseAuth(providerName: ProviderName): Promise<void> {
    try {
      await signInWithPopup(auth, providers[providerName]);
    } catch (error: any) {
      console.error(error);
      if (error.code === "auth/account-exists-with-different-credential")
        return alert(
          `같은 이메일로 다른 인증 수단이 등록되어 있습니다. 
다른 로그인 방법을 사용해보세요.`
        );
    }
  }

  // firebase 로그아웃 하기
  async firebaseLogout(): Promise<void> {
    try {
      await signOut(auth);
      alert("로그아웃 되었습니다.");
    } catch (error) {
      console.error(error);
    }
  }

  // firebase에서 데이터 읽기
  async readDataFromFirebase(path: string): Promise<DocumentData | null> {
    try {
      const docRef = doc(db, path);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        return null;
      }
    } catch (error) {
      console.error(error);
      return null;
    }
  }

  // firebase에 데이터 쓰기
  async writeDataToFirebase(
    path: string,
    inputData: DocumentData
  ): Promise<void> {
    try {
      const userRef = doc(db, path);
      await setDoc(userRef, inputData);
    } catch (error) {
      console.error("writte error", error);
    }
  }

  // firebase에 데이터 업데이트 하기
  async updateDataInFirebase(
    collectionName: string,
    documentId: string,
    updateData: any
  ): Promise<void> {
    try {
      const docRef = doc(db, collectionName, documentId);
      await updateDoc(docRef, updateData);
    } catch (error) {
      console.error(error);
    }
  }

  // firebase에서 문서 읽기
  async readDocumentFromFirebase(
    documentName: string,
    condition: { key: string; operator: any; value: any }
  ): Promise<DocumentData | null> {
    try {
      const postQuery = query(
        collection(db, documentName),
        where(condition.key, condition.operator, condition.value)
      );
      const querySnapshot = await getDocs(postQuery);
      const documnetDatas = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return documnetDatas;
    } catch (error: any) {
      console.error(error);
      if (error.code === "resource-exhausted")
        alert("firebase 일일 사용량을 초과했습니다.. 내일 다시 방문해주세요..");
      console.error(error.code);

      return null;
    }
  }
}
