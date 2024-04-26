import React from "react";
import "../styles/Main.css";
import { Link, useLocation } from "react-router-dom";

const Geolocation = () => {
  const location = useLocation();
  const codeNum = location.state.code;
  let message1 = "";
  let message2 = "";

  switch (codeNum) {
    case 1:
      message1 = "'사용자의 위치정보 접근 거부'";
      message2 = "위치정보 접근을 허용해 주시고 다시 시도해 주시기 바랍니다.";
      break;
    case 2:
      message1 = "'사용자의 위치정보를 확인할 수 없음'";
      message2 =
        "위치 정보를 확인할 수 있는 상태로 다시 시도해 주시기 바랍니다.";
      break;
    case 3:
      message1 = "'사용자의 위치정보 확인 시간 초과'";
      message2 = "네트워크 상태 등을 확인 후 다시 시도해 주시기 바랍니다.";
      break;
    case 10:
      message1 = "'한국이 아님'";
      message2 =
        "현재 사용자분의 접근 위치를 확인 하시고 다시 시도해 주시기 바랍니다.";
      break;
    default:
      message1 = "'알수 없는 이유'";
      message2 = "관리자에게 문의해 주시기 바랍니다. springdream0406@gmail.com";
  }
  return (
    <div className="geolocation">
      <h1>안녕하세요. 춘몽월드의 관리자 춘몽 입니다.</h1>
      <h2>
        현재 춘몽월드는 사용자의 위치정보를 이용하여 날씨정보를 가져와 배경으로
        사용하며, <br />
        한국이 아닌지역의 접근을 제한하는 보안적인 목적으로 사용하고 있습니다.
      </h2>
      <span> 현재 사용자 분께서는 </span>
      <span style={{ color: "green" }}>{message1}</span>
      <span>의 이유로 접근이 제한 되셨습니다.</span>
      <br />
      <br />
      <span>{message2}</span>
      <br />
      <br />
      <Link className="linkto" to="/">
        재시도 하기
      </Link>
    </div>
  );
};

export default Geolocation;
