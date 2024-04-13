const ProfileImg = () => {
  const params = window.location.pathname;
  let imgURL = "";
  if (params === "/home") imgURL = "/images/exImg.jpeg";

  return (
    <div className="img_profile">
      <img src={imgURL} alt={imgURL} />
    </div>
  );
};

export default ProfileImg;
