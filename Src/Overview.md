블록 다이어그램  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/block_finalreport.jpg">

* 사용모드 설정 및 길찾기 경로 탐색
    * [front](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/front/src/Map/KakaoMap.jsx) 
    * [다익스트라 알고리즘](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/java/com/react/roadmap/function/DijkstraAlgorithm.java)
    * '걷기' 모드와 '휠체어' 중 하나를 선택 한 뒤, 출발지와 도착지를 선택한다. '경로 안내' 버튼을 누르면 다익스트라 알고리즘을 이용하여 최적의 경로를 찾고 지도위에 막대를 그려 길을 표시한다. 
    * 기존 코드의 오류로 인해 네비게이션 기능이 작동하지 않았다. 따라서 이번 프로젝트에서는 코드를 처음부터 다시 작성하여 만들었다. 다익스트라 알고리즘도 오류로 인해 사용이 불가능하여 처음부터 다시 작성하였다.
* 교내시설 정보 열람
    * [front](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/front/src/Buildinginfo/BuildingInfoPage.jsx)
    * 건물을 클릭하면 정보가 나오며 길찾기 버튼을 클릭하면 길찾기 page로 이동할 수 있다. 
    * 기존의 페이지에서 코드는 변경되지 않았으나 기존의 정보에 오류가 많아서 데이터 최신화 과정을 거쳤다.
* 편의시설 검색
    * [front](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Src/roadmap/src/main/front/src/convenient/ConvenientPage.jsx)  
    * 드롭다운 리스트에서 원하는 항목을 선택하면 해당 편의시설이 존재하는 위치가 표시되며 해당 아이콘을 클릭하면 해당 편의시설의 이미지를 보여준다.  
    * 기존의 정보에 오류가 많아서 데이터 최신화 과정을 거쳤다.

## README.md로 돌아가기
[README](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/README.md)