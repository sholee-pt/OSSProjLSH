# A4.3 OSS 프로젝트 제품 구성, 배포 및 운영 자료  

- *자료 내용이 길어지는 경우 별도 문서로 작성하고 링크로 연결*

## 1. 프로젝트 제품 구성

-추후 수정
- *프로젝트 제품의 구성과 배치 내역을 그림과 글로 설명*  
  
## 2. 프로젝트 제품 배포 방법  

- 추후 수정
- *프로젝트 제품을 최종 인프라에 배포하는 과정을 단계적으로 설명*
- *도구를 활용하여 배포 자동화를 하는 경우, 관련 절차 설명과 스크립트 등 자료를 제시*

## 3. 프로젝트 제품 운영 방법  

1. Node.js [설치](https://nodejs.org/en/download)  
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

길찾기 페이지에서 사용할 모드를 선택한다.  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/UI1.png">  

출발지와 도착지를 선택한 뒤 '경로찾기' 버튼을 누른다.  
<img width="550" alt="image" src="https://github.com/CSID-DGU/2024-1-OSSProj-SOUP-10/blob/main/Doc/ReferenceImages/UI2.png">

