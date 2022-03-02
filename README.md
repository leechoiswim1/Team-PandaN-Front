# 🐼 판단 (PandaN) ✨

> 가장 쉽고 편하게 시작할 수 있는 협업 툴, [__PandaN__](https://pandan.link)

안그래도 복잡한데, 일까지 복잡할 필요는 없잖아요.  
머리 아플 땐 PandaN.

__Team PandaN__ 의 프론트엔드 저장소입니다.

![image](https://user-images.githubusercontent.com/85476908/131855009-5b76dbb8-e8b3-45f1-9140-afd7f40752ed.png)

🔗  [사이트](https://pandan.link)  
🔗  [시연 영상(Youtube)](https://youtu.be/kXbPpu10uTA)  

## 🐼 프로젝트 소개

### 🌱 기획 의도
지난 1~2년을 표현할 수 있는 키워드는 '언택트'입니다.  
코로나로 인해 늘어나는 비대면 협업 공간의 수요는 점점 늘어나나, 그에 상응하는 공급은 부족합니다.  
이미 기존에 협업툴들이 존재하고 있지만 난해하고, 배우기 어렵다는 공통점들을 발견할 수 있었습니다.  
이에 저희 팀 판단은 가장 쉽고 편하게 시작할 수 있는 협업툴, PandaN을 기획하게 되었습니다.

### 👨‍👧‍👧 팀원 소개
- Front-end : 곽신영, 진효빈, 최수임 🔗 [Front-end github repository](https://github.com/Team-PandaN/Team-PandaN-Front)
- Back-end : 이태강, 강승연, 김성경, 최민서 🔗 [Back-end github repository](https://github.com/Team-PandaN/Team-PandaN-Back)
- Designer : 강민정, 전소정

### 👨‍👧‍👧 개발 기간
- 2021년 07월 23일 ~ 09월 01일 (총 6주)

### 👨‍👧‍👧 사용 기술 스택
- Javascript ES6
- React
- HTML5, CSS/SCSS 

### 👨‍👧‍👧 사용 패키지
- SCSS
  - variable / mixin / extend 등의 장점 활용 위해 전역 스타일 구축에 이용, css와의 코드 통합 용이함 고려
- Styled-Component
  - scss로 구축한 스타일을 바탕으로 하여, 컴포넌트 별 상태 변화에 따른 커스텀 스타일링을 위해 사용
- Redux, redux-actions, immer, redux-thunk / redux-logger
  - 중첩된 컴포넌트 구조 안에서, 데이터 참조와 상태 관리를 효율적으로 하기 위한 목적
  - 미들웨어로 서버와의 비동기 액션 보다 편하게 다루기 위해 redux-thunk, 개발환경에서 state / action 등 쉽게 추적하고 관리하기 위해 redux-logger 사용
- Axios
  - 서버와의 HTTP 통신을 위해 사용
- React-beautiful-dnd
  - 칸반 보드의 드래그앤드랍 이벤트 제어 목적

#### 👨‍👧‍👧 그 외, 팀 협업을 위해 사용하였습니다.
- 소스 형상 관리 : Git
- 협업툴 : Notion, __PandaN__
- 커뮤니케이션 : Discord, Discord github webhook

### 👨‍👧‍👧 아키텍쳐 설계
- 클라이언트 배포
  - AWS S3 + Cloudfront
- 클라이언트와 서버 SSL 인증서 적용하여 HTTPS로 통신

![image](https://user-images.githubusercontent.com/85476908/131854106-9fe30ecc-92dc-4595-ba6d-9b549a0badf8.png)

### 👨‍👧‍👧 개발 목표
- 사용자 경험 향상
  - 반응형웹 적용: 모바일에서도 사용자가 서비스를 이용할 수 있도록 사용자 편의성 향상
    ![image](https://github.com/Team-PandaN/Team-PandaN-Front/blob/master/img_readme/responsive_project.gif)
    ![image](https://github.com/Team-PandaN/Team-PandaN-Front/blob/master/img_readme/responsive_kanban.gif)  
  - 페이지 이동 시 깜빡거림과 끊김 없는 자연스러운 사용자 경험 제공, 필요한 데이터만 갱신하여 로딩 성능 개선
    - react-router Link / NavLink 사용
    - 페이지네이션 useCallback 사용
    - 댓글 등 리렌더링 필요 없는 컴포넌트 React.memo 사용
- 개발 생산성 향상
  - 유지 보수 고려한, 확장 가능한 개발 환경 구축

### 👨‍👧‍👧 개발 일지
- 칸반의 일정 노트 drag and drop

  ![image](https://github.com/Team-PandaN/Team-PandaN-Front/blob/master/img_readme/kanban.gif)
- 칸반 일정 노트의 순서 저장 : linked list 사용

  ![image](https://github.com/Team-PandaN/Team-PandaN-Front/blob/master/img_readme/linkedlist.gif)
- 글 수정 동시에 하지 못하도록 잠금

  ![image](https://github.com/Team-PandaN/Team-PandaN-Front/blob/master/img_readme/editmodal.gif)

