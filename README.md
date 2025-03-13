# 🛍 Clothes:er (클로저)

![표지](https://github.com/user-attachments/assets/e8b8fe1d-f4e5-4a10-84a0-cbeb611bf18f)

<br/><br/>

## 💜 프로젝트 개요

 **Clothes:er(클로저)는 사용하지 않는 의류를 지역 기반으로 공유할 수 있는 플랫폼입니다.**
사용자는 자신의 옷을 등록하고 대여할 수 있으며, 반대로 필요한 옷을 검색하여 대여 신청을 할 수도 있습니다.
 이 서비스는 패스트패션으로 인한 환경 문제를 줄이고 지속가능한 패션 문화를 만들고자 기획되었습니다.

<br/><br/>

## 💜 기획 배경 및 고민

- **패스트패션 문제 해결**: 유행이 빠르게 바뀌고, 소비자들은 지속적으로 새로운 옷을 구매하며, 기존 옷들은 방치되거나 버려집니다. `Clothes:er`는 이러한 문제를 해결하기 위해 **의류 공유 기반의 지속가능한 소비 문화**를 목표로 합니다.
- **지역 기반 P2P 서비스의 한계**: 대여 및 거래 과정에서의 신뢰도 문제, 사용자 간의 원활한 소통, 거래 방식에 대한 명확한 기준 마련이 필요했습니다.
- **사용자 경험 중심 기획**: UI/UX를 단순화하고, 사용자가 직관적으로 대여 및 검색을 할 수 있도록 설계하는 것이 핵심 과제였습니다.
- **거래의 안전성**: 중고 거래의 특성상 발생할 수 있는 신뢰 문제를 해결하기 위해 `대여 체크리스트`, `신고 기능`, `관리자 검수 시스템`, `옷장 점수` 등을 구현하였습니다.
- **사용자 맞춤형 스타일링 지원**: 사용자의 신체 정보 및 스타일 데이터를 활용하여 **일치도가 높은 옷을 추천**하여 더 나은 스타일링 경험을 제공합니다.

<br/><br/>

## 💜 기술 스택
![7  기술 스택](https://github.com/user-attachments/assets/e7a6f814-72f5-464d-9095-69ef160860c5)


### 📍 프론트엔드

- **프레임워크**: Next14
- **언어**: TypeScript
- **상태 관리**: Redux
- **API 연동**: Axios
- **지도 API**: Kakao 주소 API
- **푸시 알림**: Firebase Cloud Messaging (FCM)
- **배포**: Vercel (PWA 지원)

### 📍 백엔드

- **프레임워크**: Spring Boot
- **언어**: Java
- **데이터베이스**: MySQL
- **ORM**: JPA (Hibernate)
- **보안**: Spring Security, JWT, AES
- **실시간 채팅**: WebSocket (STOMP 기반)
- **푸시 알림**: Firebase Cloud Messaging (FCM)
- **캐싱**: Redis (JWT 관리, 이메일/전화번호 인증 번호 저장)
- **Reverse Proxy**: Caddy (TLS 및 도메인 설정)
- **배포**: AWS
- **API 문서화**: Swagger

<br/><br/>

## 💜 기능별 기술적 구현

### 📍 회원가입 및 로그인
- **유효성 검사**를 진행하여 유저가 바로 수정할 수 있게 함
- 거래 신뢰를 위한 **이메일 인증** 및 **휴대폰 인증**
- **최초 로그인 시** 사용자의 정보를 선택적으로 입력받아 서비스 이용을 위한 기본 설정을 세팅

<img src="https://github.com/user-attachments/assets/72ddbda6-da3b-4212-9826-2da5ed863b72" width="30%" />
<img src="https://github.com/user-attachments/assets/653616c1-9f2e-40dc-933c-2118419aaf8a" width="30%" />

<br/><br/>

### 📍 공유 옷장 (홈 화면)

- **Kakao 주소 API**를 활용하여 사용자의 위치 기반으로 반경 2km 이내 의류 대여글 제공
- **필터링 및 정렬**: **QueryDSL**을 사용해서 성별, 체형, 스타일, 카테고리별 필터 및 정렬 기능 제공
- **대여글 작성 및 채팅 이동**
- **신고 기능 구현**: 부적절한 게시글 작성 유저 신고 가능, 관리자가 검토 후 조치

<img src="https://github.com/user-attachments/assets/b9ce9665-acc8-4a3d-b132-24bb850f2092" width="30%" />
<img src="https://github.com/user-attachments/assets/0331b4d8-4384-488b-9007-da2b9e8352f1" width="29%" />
<img src="https://github.com/user-attachments/assets/8aa25a67-47b6-42f3-9014-d07678af7c44" width="29%" />

<br/><br/>

### 📍 채팅 기능

- **대여글 채팅**: 대여글과 연결된 대여 거래 전용 채팅
- **유저 채팅**: 보유 옷과 관련한 정보 문의를 위한 1:1 채팅
- **STOMP 기반 WebSocket 서버 구현**
- **대여 체크리스트 기능 추가 (대여 전 상태 확인 및 증빙 가능)**
- **거래 상태 변경 가능**: 대여자가 체크리스트를 작성하면 판매자가 거래 상태 변경 가능 (대여중 또는 대여 완료)
- **거래 후기 작성 기능**: 신뢰도 확보를 위한 거래 평가 시스템 구축

<img src="https://github.com/user-attachments/assets/bed58db0-fabb-4baa-941c-f4003bdb1aac" width="60%" />
<img src="https://github.com/user-attachments/assets/a51c42f7-6a0b-4877-9246-679046213595" width="29%" />
<br/><br/>

### 📍 옷장 구경

- **사용자가 입력한 신체, 취향 정보를 기반으로 유사도를 매겨 다른 사람의 보유 옷 노출**
- **팔로우 기능 및 팔로잉하는 유저의 게시글 모아보기 기능 구현**

<img src="https://github.com/user-attachments/assets/44fcd3a7-dbd5-48d3-a5a9-aab943487406" width="30%" />

<br/><br/>

### 📍 나의 옷장

- **사용자 프로필 관리 및 대여 내역 조회 가능**
- **AWS S3를 활용한 이미지 업로드** (옷장 등록 기능 포함)
- **거래 후 받은 후기 확인 가능 (신뢰도 시스템 연계)**
: 신뢰도를 확보하기 위한 리뷰 시스템 연계 및 `옷장 점수` 반영
- **대여글 및 보유 옷 찜 조회**
- 의류 대여 횟수에 따른 서비스 레벨 제공

<img src="https://github.com/user-attachments/assets/30b536e8-dbbd-4ffe-a271-91e77ef306eb" width="30%" />
<img src="https://github.com/user-attachments/assets/73a9a1ff-6bb1-45c0-8c8b-3cddf7461bae" width="30%" />
<img src="https://github.com/user-attachments/assets/f7981f41-2f75-469f-8782-9a94cab492a6" width="30%" />

<br/><br/>

### 📍 푸시 알림

- **FCM 연동**하여 **채팅, 팔로우, 신고 등** 관련 알림 시스템 구축

<img src="https://github.com/user-attachments/assets/310480a3-6700-4817-be8a-25d244923dae" width="30.7%" />
<img src="https://github.com/user-attachments/assets/2dc38bad-1b69-4f98-9e5d-59925fe1cda1" width="31%" />
<img src="https://github.com/user-attachments/assets/cd47ee05-400a-4ef5-9171-58f385760164" width="31%" />

<br/><br/>

### 📍 관리자 페이지

- **대여글, 보유 옷, 채팅에서 들어온 신고 내역 처리** (유예, 이용 제한, 점수 삭감, 무시)
- **전체 회원의 정보를 열람하고, 사용자 검토 후 조치 가능**
- 사용자 거래 내역 및 채팅 확인 가능

<img src="https://github.com/user-attachments/assets/3eeeebe4-fb04-4edc-858e-e582d9b4acc4" width="90%" /><br/>
<img src="https://github.com/user-attachments/assets/e7545cfe-a249-48e6-94ea-ec5e4075a168" width="90%" />

<br/><br/>

## 💜 CI/CD 및 배포

- **GitHub Actions를 이용하여 프론트엔드 자동화 배포**
- **AWS EC2 + RDS + S3를 활용한 클라우드 배포 환경 구축**
- **Caddy를 사용해서 TLS(ex. HTTPS, WSS) 설정**

<br/>

## 💜 팀원 정보

👩‍🎨 **디자인 (Figma 🎨) : 유진주**

👩‍💻 **프론트엔드 (Next.js 🌐) : 유진주**

👨‍💻 **백엔드 (Spring Boot 🌱) : 조세영**

| <img src="https://github.com//yyypearl.png" width=200px alt="유진주"/> | <img src="https://github.com//ilu25.png" width=200px alt="조세영"/> |
|:---:|:---:|
| 유진주(FE) | 조세영(BE) |
