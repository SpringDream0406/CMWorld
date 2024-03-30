const acecssTogeo = (position) => {
  const positionObj = {
    latitude: position.coords.latitude,
    longitude: position.coords.longitude,
  };
  console.log(positionObj);
};

export const geolocation = () => {
  navigator.geolocation.getCurrentPosition(acecssTogeo, (err) => {
    console.log(err);
  });
};
