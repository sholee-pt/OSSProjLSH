import React from "react";
import NavBar from "../components/Navbar.jsx";

function Main() {
  const handleEmailClick = () => {
    window.location.href = "mailto:roadmap@dongguk.edu";
  };

  return (
    <div>
      <NavBar />
      <div className="content-wrapper">
        <div className="content centered-content">
          <h1>[ 동국대학교 편한 길 찾기 ]</h1>
          <h2>by 2024-1-OSSProj-10-SOUP</h2>
          <p>본 웹사이트는 동국대학교의 교내 편의시설 검색 및 길찾기 서비스를 지원합니다.</p>
          <p>기타 문의사항 및 건의사항이 있다면 아래 이메일로 연락주세요!</p>
          <p></p>
        </div>
      </div>
      <footer className="footer">
        Contact:<div className="email-link" onClick={handleEmailClick}>
          roadmap@dongguk.edu
        </div>
      </footer>
    </div>
  );
}

export default Main;
