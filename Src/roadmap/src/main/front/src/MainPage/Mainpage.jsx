import React from "react";
import NavBar from "../components/Navbar.jsx";

const linkStyle = {
  color: 'black',
  textDecoration: 'none'
};

function Main() {
  return (
    <div>
      <NavBar />
      <div className="content-wrapper">
        <div className="content centered-content">
          <t1>동국대학교 편한 길 찾기</t1>
          <t2>Modified by: 2024-1-OSSProj-10-SOUP</t2>
          <p>본 웹사이트는 동국대학교의 교내 편의시설 검색 및 길찾기 서비스를 지원합니다.</p>
          <p>기타 문의사항 및 건의사항이 있다면 아래 이메일로 연락주세요!</p>
          <p></p>
        </div>
      </div>
    </div>
  );
}

export default Main;
