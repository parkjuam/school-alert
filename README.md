# 특수학교 등교 알림 시스템 — 설정 가이드

## 파일 구성
```
index.html      ← 입구 태블릿 화면 (보호인력 사용)
classroom.html  ← 교실 태블릿 화면 (교사 사용)
README.md       ← 이 문서
```

---

## 1단계 — Firebase 프로젝트 만들기 (무료)

1. https://console.firebase.google.com 접속 후 Google 계정 로그인
2. **"프로젝트 추가"** 클릭 → 프로젝트 이름 입력 (예: `school-alert`)
3. Google 애널리틱스는 사용 안 함 선택 → **"프로젝트 만들기"**

---

## 2단계 — Realtime Database 활성화

1. 왼쪽 메뉴 → **"빌드" → "Realtime Database"**
2. **"데이터베이스 만들기"** 클릭
3. 위치: `asia-southeast1` (싱가포르, 한국에서 가장 가까움) 선택
4. 보안 규칙: **"테스트 모드"** 선택 후 완료
   - ⚠️ 테스트 모드는 30일 후 만료됩니다. 이후 아래 규칙으로 교체하세요:
   ```json
   {
     "rules": {
       "alerts": {
         ".read": true,
         ".write": true
       }
     }
   }
   ```

---

## 3단계 — Firebase 설정 값 복사하기

1. Firebase 콘솔 → 왼쪽 상단 ⚙️ → **"프로젝트 설정"**
2. 아래로 스크롤 → **"내 앱"** 섹션 → **"웹"** (`</>`) 아이콘 클릭
3. 앱 닉네임 입력 (예: `school-alert-web`) → **"앱 등록"**
4. 아래처럼 생긴 코드 블록이 나타납니다:

```js
const firebaseConfig = {
  apiKey: "AIzaSy...",
  authDomain: "school-alert-xxxxx.firebaseapp.com",
  databaseURL: "https://school-alert-xxxxx-default-rtdb.asia-southeast1.firebasedatabase.app",
  projectId: "school-alert-xxxxx",
  storageBucket: "school-alert-xxxxx.appspot.com",
  messagingSenderId: "123456789",
  appId: "1:123456789:web:abcdef"
};
```

5. **`index.html`과 `classroom.html` 두 파일 모두**에서 `YOUR_API_KEY` 등을 위 값으로 교체합니다.

---

## 4단계 — 웹에 배포하기 (무료, Vercel 이용)

1. https://vercel.com 접속 → GitHub 계정으로 가입
2. GitHub에 새 저장소 만들고 `index.html`, `classroom.html` 업로드
3. Vercel에서 해당 저장소 연결 → **"Deploy"** 클릭
4. 배포 완료 후 주소 예시:
   - 입구 태블릿: `https://school-alert.vercel.app/index.html`
   - 교실 태블릿: `https://school-alert.vercel.app/classroom.html`

> 💡 Vercel 대신 **Firebase Hosting**을 써도 됩니다 (Firebase CLI 설치 필요).

---

## 5단계 — 태블릿에서 사용하기

### 입구 태블릿 (보호인력)
1. 크롬/사파리 브라우저에서 `입구 URL` 접속
2. 주소창 오른쪽 메뉴 → **"홈 화면에 추가"** → 아이콘처럼 실행 가능

### 교실 태블릿 (교사)
1. 크롬/사파리 브라우저에서 `교실 URL` 접속
2. 마찬가지로 홈 화면에 추가

---

## 사용 방법

### 입구에서 (보호인력)
1. **과정 선택** (유치원/초등/중등/고등/전공과)
2. **학년 / 반** 선택
3. **상황** 선택 (학생 도착 / 학생 마중)
4. **학생 이름** 입력
5. **"교실로 알림 전송"** 버튼 클릭

### 교실에서 (교사)
- 알림이 오면 카드가 **깜빡이며** 표시됩니다
- 카드를 **탭**하면 깜빡임이 멈추고 확인 처리됩니다
- **"확인됨 지우기"** 버튼으로 확인된 알림을 정리할 수 있습니다

---

## 자주 묻는 질문

**Q. 학교 와이파이가 필요한가요?**
A. 네, 두 태블릿 모두 인터넷 연결이 필요합니다. 학교 와이파이 또는 LTE 가능합니다.

**Q. 동시에 여러 교실에서 볼 수 있나요?**
A. 네, classroom.html을 여러 태블릿에서 열면 모두 동시에 알림을 받습니다.

**Q. 비용이 드나요?**
A. Firebase 무료 플랜(Spark)으로 충분합니다. 하루 수백 건의 알림은 무료 범위 내입니다.

**Q. 반 개수를 바꾸고 싶어요.**
A. `index.html` 안에서 `class` select의 option을 수정하면 됩니다.

---

## 문의 / 추가 기능

- 반별 알림 필터링
- 알림음 추가
- 학생 목록 사전 등록
- 지각 통계 기록

등 추가 기능이 필요하면 개발자에게 문의하세요.
