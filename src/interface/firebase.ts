import { DocumentData } from "firebase/firestore";

export interface IPostDatasFromFirebase {
  id: string;
  data: DocumentData;
}
