// import { initializeApp } from "firebase/app";
// import { firebaseConfig } from "../../data/firebaseConfig";
// import {
//   getAuth,
//   signInWithPopup,
//   signOut,
//   GithubAuthProvider,
//   GoogleAuthProvider,
//   onAuthStateChanged,
// } from "firebase/auth";
// import {
//   getFirestore,
//   doc,
//   getDoc,
//   setDoc,
//   collection,
//   getDocs,
//   query,
//   where,
//   DocumentData,
//   updateDoc,
// } from "firebase/firestore";
// import { firebaseAction } from "../../redux/firebaseReducer";

// const app = initializeApp(firebaseConfig);
// export const db = getFirestore(app);

// const auth = getAuth();

// export type ProviderName = "Github" | "Google";

// export const providers = {
//   Github: new GithubAuthProvider(),
//   Google: new GoogleAuthProvider(),
// };

// export class FirebaseService {
//   // firebase 인증 상태 체크 실행
//   firebaseOnAuthStateChanged(dispatch: any): void {
//     onAuthStateChanged(auth, (user) => {
//       // 인증 있으면 redux의 firebaseUID 설정
//       if (user) {
//         const UID = user.uid;
//         dispatch(firebaseAction.setFirebaseUID(UID));
//         return;
//       }
//       // 인증 없으면(=로그아웃) redux의 firebaseUID, firebaseUserName 값 삭제
//       dispatch(firebaseAction.setFirebaseUID(null));
//       dispatch(firebaseAction.setUserName(null));
//     });
//   }

//   // firebase 인증 하기
//   async firebaseAuth(providerName: ProviderName): Promise<void> {
//     try {
//       await signInWithPopup(auth, providers[providerName]);
//     } catch (error: any) {
//       console.error(error);
//       if (error.code === "auth/account-exists-with-different-credential")
//         return alert(
//           `같은 이메일로 다른 인증 수단이 등록되어 있습니다.
// 다른 로그인 방법을 사용해보세요.`
//         );
//     }
//   }

//   // firebase 로그아웃 하기
//   async firebaseLogout(): Promise<void> {
//     try {
//       await signOut(auth);
//       alert("로그아웃 되었습니다.");
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // firebase에서 데이터 읽기
//   async readDataFromFirebase(path: string): Promise<DocumentData | null> {
//     try {
//       const docRef = doc(db, path);
//       const docSnap = await getDoc(docRef);
//       if (docSnap.exists()) {
//         return docSnap.data();
//       } else {
//         return null;
//       }
//     } catch (error) {
//       console.error(error);
//       return null;
//     }
//   }

//   // firebase에 데이터 쓰기
//   async writeDataToFirebase(
//     path: string,
//     inputData: DocumentData
//   ): Promise<void> {
//     try {
//       const userRef = doc(db, path);
//       await setDoc(userRef, inputData);
//     } catch (error) {
//       console.error("writte error", error);
//     }
//   }

//   // firebase에 데이터 업데이트 하기
//   async updateDataInFirebase(
//     collectionName: string,
//     documentId: string,
//     updateData: any
//   ): Promise<void> {
//     try {
//       const docRef = doc(db, collectionName, documentId);
//       await updateDoc(docRef, updateData);
//     } catch (error) {
//       console.error(error);
//     }
//   }

//   // firebase에서 문서 가져오기
//   async readDocumentFromFirebase(
//     documentName: string,
//     condition?: { key: string; operator: any; value: any }
//   ): Promise<DocumentData | null> {
//     try {
//       let postQuery;
//       // 조건이 있는 경우
//       if (condition) {
//         postQuery = query(
//           collection(db, documentName),
//           where(condition.key, condition.operator, condition.value)
//         );
//         // 조건이 없는 경우
//       } else {
//         postQuery = collection(db, documentName);
//       }
//       const querySnapshot = await getDocs(postQuery);
//       return querySnapshot;
//     } catch (error: any) {
//       console.error(error);
//       if (error.code === "resource-exhausted") return { message: "초과" };
//       return null;
//     }
//   }
// }
