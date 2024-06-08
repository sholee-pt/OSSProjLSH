# A4.3 OSS 프로젝트 제품 구성, 배포 및 운영 자료  

## 1. 프로젝트 제품 구성

[Overview](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/4_4_OSSProj_10_SOUP_Overview.md) 파일 참조
  
## 2. 프로젝트 제품 배포 방법  

build 후 작성 예정

### 직접 설치 방법
1. Node.js [설치](https://nodejs.org/en/download)  
2. Command Prompt(CMD)에 다음 명령어를 입력하여 컴퓨터 내에 npx 설치
```
npm install npx -g
```
3. 상기 코드를 clone받은 폴더 내의 front 폴더로 이동
```
cd ./Src/roadmap/src/main/front
```
4. 명령어를 입력하여 백엔드 서버 실행
```
node src/server.js
```
5. 새로운 CMD 창에서 clone받은 폴더 내의 front 폴더로 이동 후 초기에 노드 모듈이 front 폴더 내에 없다면 다음 명령어를 통해 설치
```
npm update
```
6. React 웹 페이지 실행
```
npm start
```

- *프로젝트 제품을 최종 인프라에 배포하는 과정을 단계적으로 설명*
- *도구를 활용하여 배포 자동화를 하는 경우, 관련 절차 설명과 스크립트 등 자료를 제시*

## 3. 프로젝트 제품 운영 방법  

### 교내시설 정보 열람 페이지
건물의 마커를 클릭하면 건물 정보가 나온다. 경로 안내 버튼을 누르면 길찾기 페이지로 이동한다.  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/building_page.png">  

### 편의시설 검색 페이지
드롭다운 선택창에서 원하는 편의시설을 선택하면 학교 내 편의시설의 위치를 보여준다. 마커를 클릭하면 해당 편의시설 이미지가 나오며 경로 안내 버튼을 누르면 길찾기 페이지로 이동한다.  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/conv_page.png">  

### 길 찾기 페이지
길찾기 페이지에서 사용할 모드를 선택한다. 출발지와 도착지를 선택한 뒤 '경로찾기' 버튼을 누른다. Switch 버튼을 누르면 출발지와 도착지를 바꾸어 볼 수 있다.  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/nav_page.png">  

## README.md로 돌아가기
[README](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/README.md)