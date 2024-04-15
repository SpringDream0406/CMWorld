import { DocumentData } from "firebase/firestore";
import { firebaseAction } from "../../redux/firebaseReducer";
import { FirebaseService, ProviderName } from "../service/firebase.service";
import { IWritePostData } from "../../interface/guestbook.interface";
const firebaseService = new FirebaseService();

export class GuestbookController {
  // 필요한 녀석들
  constructor(private dispatch?: any, private setDataUpdated?: any) {}

  // firebase 인증 상태 체크 실행
  firebaseOnAuthStateChanged(): void {
    firebaseService.firebaseOnAuthStateChanged(this.dispatch);
  }

  // 로그인하기(인증하기)
  async logIn(providerName: ProviderName): Promise<void> {
    await firebaseService.firebaseAuth(providerName);
  }

  // 로그아웃하기
  async logOut(): Promise<void> {
    await firebaseService.firebaseLogout();
  }

  // 유저 이름 세팅하기
  async setUserName(uid: string): Promise<DocumentData | null> {
    const path = `users/${uid}`;
    const userData = await firebaseService.readDataFromFirebase(path);
    if (userData && userData.name)
      this.dispatch(firebaseAction.setUserName(userData.name));
    return userData;
  }

  // 유저 데이터 이름과 같이 생성
  async writeUserNameToDB(
    inputRef: React.RefObject<HTMLInputElement>,
    firebaseUID: string
  ): Promise<void> {
    if (!inputRef.current || !inputRef.current.value) return;
    const path = `users/${firebaseUID}`;
    const inputData = {
      name: inputRef.current.value,
    };
    await firebaseService.writeDataToFirebase(path, inputData);
    this.setUserName(firebaseUID);
  }

  // 방명록 글 갯수 읽기
  async countPosts(): Promise<number | string | null> {
    const documentName = "posts";
    const condition = {
      key: "isDeleted",
      operator: "==",
      value: false,
    };
    const querySnapshot = await firebaseService.readDocumentFromFirebase(
      documentName,
      condition
    );
    if (querySnapshot?.message) return "사용량 초과..";
    if (querySnapshot) {
      const numOfPosts = querySnapshot.size;
      return numOfPosts;
    } else {
      return null;
    }
  }

  // 방명록 글 읽기
  async readPosts(): Promise<DocumentData | null> {
    const documentName = "posts";
    const condition = {
      key: "isDeleted",
      operator: "==",
      value: false,
    };
    const querySnapshot = await firebaseService.readDocumentFromFirebase(
      documentName,
      condition
    );
    if (querySnapshot?.message) {
      alert("firebase 일일 사용량을 초과했습니다.. 내일 다시 방문해주세요..");
      return null;
    }
    if (querySnapshot) {
      const documnetDatas = querySnapshot.docs.map((doc: any) => ({
        id: doc.id,
        data: doc.data(),
      }));
      return documnetDatas;
    } else {
      return null;
    }
  }

  // 방명록 글 삭제
  async deletedPosts(postDatas: DocumentData, firebaseUID: string) {
    const path = `posts/${postDatas.id}`;
    const firebaseData = await firebaseService.readDataFromFirebase(path);
    if (firebaseData && firebaseUID !== firebaseData.UID)
      return alert("본인의 글만 삭제 가능합니다.");
    const isConfirmed = window.confirm("정말로 삭제하시겠습니까?");
    if (!isConfirmed) return;
    const collectionName = "posts";
    const documentId = postDatas.id;
    const updateData = {
      isDeleted: true,
      deletedAt: new Date(),
    };
    await firebaseService.updateDataInFirebase(
      collectionName,
      documentId,
      updateData
    );
    this.setDataUpdated((e: number) => e + 1);
    alert("글이 삭제 되었습니다.");
  }

  // 방명록 글 쓰기
  async writePost({
    firebaseUID,
    firebaseUserName,
    selectedImg,
    textAreaRef,
    setSelectedImg,
  }: IWritePostData) {
    // 제한 사항들
    if (!textAreaRef || !textAreaRef.current) return;
    if (!firebaseUID || !firebaseUserName) return alert("로그인이 필요합니다.");
    if (!textAreaRef.current.value) return alert("내용을 입력해주세요.");

    // 들어갈 데이터 가공
    const now = new Date();
    const path = `posts/${firebaseUID}_${now.getTime()}`;
    const inputData = {
      UID: firebaseUID,
      name: firebaseUserName,
      postedAt: now,
      img: selectedImg,
      message: textAreaRef.current.value,
      Re: "",
      isDeleted: false,
    };
    await firebaseService.writeDataToFirebase(path, inputData);
    this.setDataUpdated((e: number) => e + 1); // 데이터 업로드 했어 새로운 데이터 받어와
    textAreaRef.current.value = ""; // 방명록 적어놨던 글 제거
    setSelectedImg("basic.jpeg"); // 이미지 기본으로 변경
    alert("작성 완료");
  }
}
