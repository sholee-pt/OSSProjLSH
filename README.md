## 2024-1-OSSProj-SOUP-10  
> 2024년 1학기, 오픈소스소프트웨어 프로젝트, SOUP 10조  

<br />  

## 팀 구성  

구분 | 성명 | 소속학과 | 연계전공 | 이메일
------|-------|-------|-------|-------
팀장 | 권일준 | 통계학과 | 융합SW연계전공 | jonkwon99@dongguk.edu         
팀원 | 김명하 | 산업시스템공학과 | 융합SW연계전공 | kk313s@dongguk.edu        
팀원 | 이승호 | 생명과학과 | 융합SW연계전공 | sholeept@dgu.ac.kr    

## 종합 정보  
### 프로젝트 제목  
휠체어도 사용 가능한 동국대학교 편한 길 찾기  

### 프로젝트 내용
기존의 '동국대학교 편한 길찾기' 프로젝트에서 사용자가 가장 열량을 덜 소비하는 방법으로 학교 내 길찾기를 해 주었다. 기존의 방식에서는 열량 소비량을 최소화하기 위해 학교 곳곳에 있는 계단과 지름길를 사용하였다. 이번 프로젝트에서는 휠체어 사용자들이 이 프로그램을 사용할 수 있도록 계단과 높은 경사도가 있는 경로를 피할 수 있도록 새로운 방법을 추가했고 동국대학교의 전체 구성도를 포함하였다.  
기존 프로젝트: [동국대학교 편한 길 찾기](https://github.com/CSID-DGU/2023-2-OSSP1-Entity-5)  

### Tech Stack
<img src="https://img.shields.io/badge/Intellij-000000?style=flat-square&logo=intellijidea&logoColor=white"/> <img src="https://img.shields.io/badge/Git-F05032?style=flat-square&logo=git&logoColor=white"/> <img src="https://img.shields.io/badge/GitHub-181717?style=flat-square&logo=GitHub&logoColor=white"/>

<img src="https://img.shields.io/badge/React-61DAFB?style=flat-square&logo=React&logoColor=black"/> <img src="https://img.shields.io/badge/HTML5-E34F26?style=flat-square&logo=html5&logoColor=white"/> <img src="https://img.shields.io/badge/CSS3-1572B6?style=flat-square&logo=css3&logoColor=white"/> <img src="https://img.shields.io/badge/JavaScript-F7DF1E?style=flat-square&logo=javascript&logoColor=black"/> <img src="https://img.shields.io/badge/Spring-6DB33F?style=flat-square&logo=Spring&logoColor=white"/>

### 프로젝트 관리문서
1. [범위/일정 및 이슈 관리](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/4_1_OSSProj_10_SOUP_%EB%B2%94%EC%9C%84_%EC%9D%BC%EC%A0%95_%EC%9D%B4%EC%8A%88%EA%B4%80%EB%A6%AC.md)
2. [회의록](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/4_2_OSSProj_10_SOUP_%ED%9A%8C%EC%9D%98%EB%A1%9D.md)
3. [제품의 구성, 배포 및 운영 관련 문서 자료](https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/4_3_OSSProj_10_SOUP_%EC%A0%9C%ED%92%88%EA%B5%AC%EC%84%B1%EB%B0%B0%ED%8F%AC%EC%9A%B4%EC%98%81%EC%9E%90%EB%A3%8C.md)

### 설치 방법  
1. Node.js [설치](https://nodejs.org/en/download/current/)  
2. Command Prompt(CMD)에 다음 명령어를 입력하여 컴퓨터 내에 npx 설치
```
npm install npx -g
```
3. 상기 코드를 clone받은 폴더 내의 /Src/frontend 경로로 이동
```
cd /Src/frontend
```
4. 순차적으로 명령어를 입력하여 React 웹 페이지 실행
```
npm update
```
```
npm start
```

### 사용 방법  
길찾기 페이지에서 사용할 모드를 선택한다.  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/UI1.png">  

출발지와 도착지를 선택한 뒤 '경로찾기' 버튼을 누른다.  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/UI2.png">
