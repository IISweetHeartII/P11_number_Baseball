# 숫자야구게임

React와 Firebase를 사용한 실시간 멀티플레이어 숫자야구게임입니다.

## 기능

- 1~9 사이의 서로 다른 3자리 숫자 맞추기
- 실시간 멀티플레이어 지원
- 게임 ID 공유 기능
- 반응형 디자인 (모바일, 태블릿, 데스크톱)

## 기술 스택

- React
- TypeScript
- Vite
- Firebase (Firestore)
- CSS

## 로컬 개발 환경 설정

1. 저장소 클론
```bash
git clone https://github.com/yourusername/number-baseball.git
cd number-baseball
```

2. 의존성 설치
```bash
npm install
```

3. Firebase 설정
- Firebase 콘솔에서 새 프로젝트 생성
- Firestore 데이터베이스 생성
- `src/services/firebase.ts` 파일에 Firebase 설정 정보 추가

4. 개발 서버 실행
```bash
npm run dev
```

## 배포 방법

### Vercel 배포

1. Vercel 계정 생성 및 로그인
2. GitHub 저장소 연결
3. 환경 변수 설정 (Firebase 설정)
4. 배포 버튼 클릭

### 수동 배포

```bash
npm run build
```

빌드된 파일은 `dist` 디렉토리에 생성됩니다.

## 게임 플레이 방법

1. 게임 시작
   - 플레이어 이름 입력
   - 게임 시작

2. 게임 플레이
   - 1~9 사이의 서로 다른 3자리 숫자 입력
   - 제출 버튼 클릭
   - 스트라이크와 볼 결과 확인

3. 멀티플레이어 모드
   - 게임 ID 공유 링크 복사
   - 친구에게 링크 공유
   - 친구가 같은 게임에 참여

## 라이센스

MIT
