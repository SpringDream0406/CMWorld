import { collection, getDocs } from "firebase/firestore";
import { db } from "../utils/firebase";

const GuestbookRight = () => {
  const test = async () => {
    const querySnapshot = await getDocs(collection(db, "users"));
    querySnapshot.forEach((doc) => {
      console.log(`${doc.id} => ${doc.data()}`);
    });
  };
  test();
  return <div>GuestbookRight</div>;
};

export default GuestbookRight;
