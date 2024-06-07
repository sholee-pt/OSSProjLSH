import React from "react";
import NavBar from "../components/Navbar.jsx";
import bannerImage from "../components/dgu-banner.png";

function Main() {
  const handleGithubClick = () => {
    window.location.href = "https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10";
  };

  return (
    <div>
      <NavBar />
      <div className="content-wrapper">
        <div className="content centered-content">
          <h1>[ 동국대학교 편한 길 찾기 ]</h1>
          <p>본 웹사이트는 동국대학교의 교내 편의시설 검색 및 길찾기 서비스를 지원합니다.</p>
          <p>기타 문의사항 및 건의사항이 있다면 아래 Github repository에 있는 이메일로 연락주세요!</p>
        </div>
      </div>
      <footer className="banner" style={{ background: `url(${bannerImage}) no-repeat center center`, backgroundSize: 'cover' }}>
        Contact: 
        <div className="github-link" onClick={handleGithubClick}>
          2024-1-OSSProj-10-SOUP
        </div>
      </footer>
    </div>
  );
}

export default Main;

