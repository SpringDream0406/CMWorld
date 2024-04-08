const Introduce = ({ introduceData }: { introduceData: JSX.Element }) => {
  return (
    <div className="introduce">
      <div className="welcomeMessage">{introduceData}</div>
      <span className="emailAddress">springdream0406@gamil.com</span>
    </div>
  );
};

export default Introduce;
