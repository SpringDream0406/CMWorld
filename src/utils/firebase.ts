import { initializeApp } from "firebase/app";
import { firebaseConfig } from "../data/firebaseConfig";
import {
  signInWithPopup,
  getAuth,
  GithubAuthProvider,
  GoogleAuthProvider,
  onAuthStateChanged,
} from "firebase/auth";
import { getFirestore, doc, getDoc, setDoc } from "firebase/firestore";
import { firebaseAction } from "../redux/firebaseReducer";

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);

const auth = getAuth();

type ProviderName = "Github" | "Google";

const providers = {
  Github: new GithubAuthProvider(),
  Google: new GoogleAuthProvider(),
};

export class FirebaseUtils {
  constructor(private dispatch: any) {}

  getUID = (): Promise<string | null> => {
    return new Promise((resolve, reject) => {
      onAuthStateChanged(auth, (user) => {
        if (user) {
          const uid = user.uid;
          resolve(uid);
        } else {
          resolve(null);
        }
      });
    });
  };

  firebaseAuth = async (name: ProviderName) => {
    try {
      await signInWithPopup(auth, providers[name]);
      const UID = await this.getUID();
      this.dispatch(firebaseAction.setFirebaseUID(UID));
    } catch (error) {
      console.error(error);
    }
  };

  readDataFromDB = async (path: string) => {
    try {
      const docRef = doc(db, path);
      const docSnap = await getDoc(docRef);
      if (docSnap.exists()) {
        return docSnap.data();
      } else {
        console.log("No such document!");
        return null;
      }
    } catch (error) {
      console.error("Error getting document:", error);
      return null;
    }
  };

  readUserDataFromDB = async (uid: string) => {
    const path = `users/${uid}`;
    const userData = await this.readDataFromDB(path);
    return userData;
  };

  writeUserToDB = async (uid: string, name: string) => {
    try {
      const userRef = doc(db, `users/${uid}`);
      await setDoc(userRef, { name });
      console.log("written");
    } catch (error) {
      console.error("writte error", error);
    }
  };
}
