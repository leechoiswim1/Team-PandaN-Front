![image](https://user-images.githubusercontent.com/85476908/131855009-5b76dbb8-e8b3-45f1-9140-afd7f40752ed.png)
# 🐼 판단 (PandaN) ✨

안그래도 복잡한데,
일까지 복잡할 필요는 없잖아요.

머리 아플땐 PandaN.

가장 쉽고 편하게 시작할 수 있는 협업툴


## 👨‍👧‍👧 프로젝트 기간 및 팀원 소개

- 기간: 2021년 07월 23일 ~

- Team Members :
  - Back 이태강, 강승연, 김성경, 최민서,
  - Front 곽신영, 진효빈, 최수임
  - Designer 강민정, 전소정

## 🌱 기획 의도

##### 지난 1~2년을 표현할 수 있는 키워드는 '언택트'입니다.
##### 코로나로 인해 늘어나는 비대면 협업 공간의 수요는 점점 늘어나나, 그에 상응하는 공급은 부족합니다.
##### 이미 기존에 협업툴들이 존재하고 있지만 난해하고, 배우기 어렵다는 공통점들을 발견할 수 있었습니다.
##### 이에 저희 팀 판단은 가장 쉽고 편하게 시작할 수 있는 협업툴, PandaN을 기획하게 되었습니다.
![image](https://user-images.githubusercontent.com/85476908/131854106-9fe30ecc-92dc-4595-ba6d-9b549a0badf8.png)

1. PandaN Front-end 개발 목표

   - 사용자 경험 향상
     - 반응형웹 적용: 모바일에서도 사용자가 서비스를 이용할 수 있도록 사용자 편의성 향상
     - Single Page Application : 페이지 이동 시 깜빡거림과 끊김 없는 자연스러운 사용자 경험 제공, 필요한 데이터만 갱신하여 로딩 성능 개선
   - 개발 생산성 향상
     - 유지 보수 고려한, 확장 가능한 개발 환경 구축

2. 사용 기술 스택

   - HTML
   - CSS
     - SCSS : variable / mixin / extend 등의 장점 활용 위해 전역 스타일 구축에 이용, css와의 코드 통합 용이함 고려
     - Styled-Component : scss로 구축한 스타일을 바탕으로 하여, 컴포넌트 별 상태 변화에 따른 커스텀 스타일링을 위해 사용
   - Javascript ES6
   - React / React hooks
     - 컴포넌트 활용 : 확장성 / 유지보수 편의성 고려, 메인 템플릿부터 주요 기능
     - 단방향 바인딩 : 데이터 흐름 제어 및 추적 용이, DOM 갱신 시 성능 저하 최소화 가능
     - useMemo, useCallback 활용하여 성능 최적화
   - Redux, redux-thunk / redux-logger
     - 중첩된 컴포넌트 구조 안에서, 데이터 참조와 상태 관리를 효율적으로 하기 위한 목적
     - 미들웨어로 서버와의 비동기 액션 보다 편하게 다루기 위해 redux-thunk, 개발환경에서 state / action 등 쉽게 추적하고 관리하기 위해 redux-logger 사용
   - Axios
