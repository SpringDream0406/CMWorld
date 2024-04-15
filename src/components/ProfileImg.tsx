import { guestbookFrofileImages } from "../data/guestbookData";

const ProfileImg = () => {
  const imgURL = `/images/guestbook/${
    guestbookFrofileImages[
      Math.floor(Math.random() * guestbookFrofileImages.length)
    ]
  }`;

  return (
    <div className="img_profile">
      <img src={imgURL} alt={imgURL} />
    </div>
  );
};

export default ProfileImg;
