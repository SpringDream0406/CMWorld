const Introduce = ({ introduceData }: { introduceData: JSX.Element }) => {
  return (
    <div className="introduce">
      <div className="welcomeMessage">{introduceData}</div>
    </div>
  );
};

export default Introduce;
