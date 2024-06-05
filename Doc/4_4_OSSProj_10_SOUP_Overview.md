블록 다이어그램  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/block_finalreport.jpg">

시퀀스 다이어그램  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/sequence.jpg">

이 프로그램에서는 크게 4가지 페이지가 존재한다.
 * 메인 페이지
 * 건물 정보 열람 페이지 
 * 학교 내 편의시설 위치 확인 페이지 
 * 학교 내 길찾기 페이지

## 메인페이지
[front](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/front/src/MainPage/Mainpage.jsx)  
 메인 페이지에는 페이지 기본 설명이 담겨 있다.  
 
 기존의 페이지는 아무것도 없이 배경화면만 존재하는 상태였고 이번 프로젝트를 통해 메인페이지에 페이지에 대한 기본 설명 및 연락처를 추가하였다. 

## 건물 정보 열람 페이지 
[front](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/front/src/Buildinginfo/BuildingInfoPage.jsx)  
동국대학교에 있는 건물들에 대한 정보가 담겨 있다. 건물을 클릭하면 정보가 나오며 길찾기 버튼을 클릭하면 길찾기 패이지로 이동할 수 있다.  

기존의 페이지에서 코드는 변경되지 않았으나 기존의 정보에 오류가 많아서 데이터 최신화 과정을 거쳤다.

## 학교 내 편의시설 위치 확인 페이지 
[front](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/front/src/convenient/ConvenientPage.jsx)  
동국대학교에 있는 각종 편의시설들을 검색할 수 있는 페이지이다.  드롭다운 리스트에서 원하는 항목을 선택하면 해당 편의시설이 존재하는 위치가 표시되며 해당 아이콘을 클릭하면 해당 편의시설의 이미지를 보여준다.  

기존의 페이지에서 해당 건물로 이동할 수 있는 버튼을 추가하여 길찾기 페이지로 이동하는 기능을 추가하였다. 기존의 정보에 오류가 많아서 데이터 최신화 과정을 거쳤다.

## 학교 내 길찾기 페이지 
[front](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/front/src/Map/KakaoMap.jsx) 

[다익스트라 알고리즘](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/java/com/react/roadmap/function/DijkstraAlgorithm.java)

동국대학교 내 건물간 이동을 할 때 길안내를 해 주는 페이지이다.  
먼저 '걷기' 모드와 '휠체어' 중 하나를 선택 한 뒤, 출발지와 도착지를 선택한다. '경로 안내' 버튼을 누르면 다익스트라 알고리즘을 이용하여 최적의 경로를 찾고 지도위에 막대를 그려 길을 표시한다.  

기존의 프로젝트에서는 이 코드가 있었으나 오류로 인해 네비게이션 기능이 작동하지 않아았다. 따라서 이번 프로젝트에서는 코드를 처음부터 다시 작성하여 만들었다. 다익스트라 알고리즘도 오류로 인해 사용이 불가능하여 처음부터 다시 작성하였다.

## README.md로 돌아가기
[README](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/README.md)