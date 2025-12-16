# 김준호 포트폴리오 | Adventure Portfolio

> “Press ⓢ to Start” – 신입 개발자 김준호의 모험을 담은 8-bit 감성 포트폴리오

이 레포지토리는 **웹 프론트엔드 / 백엔드 / AI 연동**을 향해 성장해 온  
김준호의 여정을 담은 **게임 스타일 포트폴리오**입니다.  
전체 페이지에는 **은은하게 색이 변화하는 다크 테마**와  
카드형 섹션, 뱃지, 애니메이션으로 “한 판 더 하고 싶은” 느낌을 목표로 했습니다.

---

## 🎮 컨셉 (Concept)

- **8-bit / Adventure 무드**  
  - 메인 화면은 “게임 스타트 화면”처럼, 이름과 포지션이 가장 먼저 보이도록 구성했습니다.  
  - 스크롤을 내리면 **스테이지처럼** Skills → Experience → Projects 순서로 진행됩니다.
- **부드럽게 움직이는 배경**  
  - 전체를 하나의 거대한 섹션처럼 보이도록,  
  - 파도 치듯 색이 살짝 바뀌는 다크 모드 그라디언트를 적용했습니다.
- **카드 & 뱃지 중심 UI**  
  - 프로젝트, 스킬, 활동 이력은 모두 카드와 뱃지로 정리해  
  - 한눈에 “어떤 플레이 스타일의 개발자인지” 읽을 수 있도록 구성했습니다.

---

## 🧱 기술 스택 (Tech Stack)

- **Framework**: Next.js (React)
- **Language**: TypeScript
- **UI**: Reactstrap, custom CSS
- **Deploy**: Vercel (GitHub 연동, `main` 브랜치 자동 배포)
- **Icons & Animations**
  - Iconify, Font Awesome
  - CSS keyframe 애니메이션 (wave, fade-in, scroll hint 등)

---

## 🗺 주요 스테이지 (Main Sections)

- **Hero / Greetings**
  - 이름, 포지션, 간단한 소개
  - “Backend / AI Integration / DevOps” 등 역할을 나타내는 뱃지
  - 광주 인공지능사관학교 6기, 네이버 클라우드 캠프 등 하이라이트 뱃지
  - 첫 화면에서 스킬 섹션 일부가 보이도록 레이아웃 조정
- **Skills & Proficiency**
  - 스택을 카테고리별로 정리 (Frontend, Backend, AI Integration 등)
  - 숙련도(Progress Bar)로 현재 레벨을 직관적으로 표시
- **Experience & Education**
  - KW International Inc. 인턴 경험:  
    - Windows AD, 사내 IT 지원, 다국적 팀 협업 경험 등 구체적 업무 내용
    - “반복 이슈 문서화 / 신입 교육 자료 제작”을 실제 매뉴얼 작업 관점에서 풀어씀
  - 광주 인공지능사관학교 6기, 네이버 클라우드 캠프 등 교육 과정 정리
- **Projects**
  - Ondam → PostSmith → Dolpan-Eatso → KCalculator 순서로 정렬  
  - 각 프로젝트는 GitHub 버튼만 두고, 불필요한 Demo 버튼은 제거
  - 카드 hover 시 과한 글로우/그림자를 제거해 집중도와 가독성을 올림
- **Contact / About**
  - GitHub, Email 등 연락 수단
  - “편하게 연락 주세요” 톤의 한국어 카피로 자연스럽게 마무리

---

## 🚀 로컬 실행 (Getting Started)

```bash
# 1. 의존성 설치
npm install

# 2. 개발 서버 실행
npm run dev

# 3. 브라우저에서 접속
http://localhost:3000
```

빌드:

```bash
npm run build
npm start
```

---

## 🧩 프로젝트 구조 (Structure)

> 주요 파일/디렉터리만 발췌

```text
.
├─ pages
│  ├─ index.tsx        # 메인 홈 (Hero, Skills, Experience, Projects 등)
│  ├─ portfolio.tsx    # 별도 포트폴리오 페이지
│  └─ resume.tsx       # 이력서 스타일 페이지
├─ containers
│  ├─ Greetings.tsx    # Hero 섹션
│  ├─ Skills.tsx
│  ├─ Proficiency.tsx
│  ├─ Experience.tsx
│  ├─ Projects.tsx
│  └─ Feedbacks.tsx
├─ components
│  ├─ Navigation.tsx
│  ├─ ProjectsCard.tsx
│  ├─ GithubProfileCard.tsx
│  └─ SocialLinks.tsx
├─ styles
│  └─ styles.css       # 전역 스타일 + 배경/애니메이션
└─ portfolio.ts        # 이력/학력/프로젝트 등 데이터 정의
```

---

## 🎯 리팩토링 & 디자인 포인트

- **다크 모드 유지 + 색 포인트 최소화**
  - 전체적으로 GitHub 다크 테마와 비슷한 톤을 유지하면서,  
  - 파랑/보라 계열을 포인트로만 사용해 장시간 봐도 눈이 편하도록 구성.
- **글로우/그림자 최소화**
  - 카드, 버튼 등에서 과한 box-shadow 제거
  - hover 시에도 위치·그림자 변화가 크지 않게 통일감 있게 조정.
- **연속적인 배경**
  - Hero, Skills, Experience, Projects 섹션이  
    서로 다른 배경처럼 끊겨 보이지 않도록 모두 투명 배경 + 공통 wave 배경 사용.
- **반응형 고려**
  - 모바일/태블릿에서도 Hero 텍스트가 잘리지 않도록 상단 패딩/정렬을 조정.

앞으로는 프로젝트 카드에 **더 많은 8-bit 감성(픽셀 아트 아이콘, 작은 이스터에그)** 등을 추가해,  
“코드를 잘 짜는 개발자이면서, 디테일에 진심인 사람”이라는 인상을 주는 방향으로 계속 다듬어 나갈 예정입니다.

---

## 📬 Contact

- GitHub: https://github.com/zpzlzmz  
- Email: 레포지토리 내 `SocialLinks` 설정 참고

> 만약 이 레포지토리를 보고 계신 채용 담당자라면,  
> “이 사람은 자기 포트폴리오를 하나의 작은 제품처럼 다룬다” 정도로 봐주시면 좋겠습니다. 🙂  

<h1 align="center">Welcome to developer-portfolio 👋</h1>
<a href="https://github.com/1hanzla100/developer-portfolio/blob/main/LICENSE"><img alt="GitHub license" src="https://img.shields.io/github/license/1hanzla100/developer-portfolio"></a><a href="https://github.com/1hanzla100/developer-portfolio/issues"><img alt="GitHub issues" src="https://img.shields.io/github/issues/1hanzla100/developer-portfolio"></a><a href="https://github.com/1hanzla100/developer-portfolio/network"><img alt="GitHub forks" src="https://img.shields.io/github/forks/1hanzla100/developer-portfolio"></a> <a href="https://github.com/1hanzla100/developer-portfolio/stargazers"><img alt="GitHub stars" src="https://img.shields.io/github/stars/1hanzla100/developer-portfolio"></a>

## Software Developer Portfolio Template built with Next.js, bootstrap that helps you showcase your work and skills as a software developer.

<p align="center">
  <kbd>
    <img src="https://github.com/1hanzla100/developer-portfolio/blob/master/picture.PNG"></img>
  </kbd>
</p>

## To view a live example, **[click here](https://developer-portfolio-1hanzla100.vercel.app/)**.

Just Edit `portfolio.js` to get your personal portfolio. Feel free to use it as-is or customize it as much as you want.

But if you want to **contribute** and make this much better for other developers have a look at
[Issues](https://github.com/1hanzla100/developer-portfolio/issues).

If you created something awesome and want to contribute then feel free to open an
[pull request](https://github.com/1hanzla100/developer-portfolio/pulls).

## Sections

✔️ Summary and About me\
✔️ Skills\
✔️ Education\
✔️ Work Experience\
✔️ Feedbacks\
✔️ Projects\
✔️ Github Profile

## Getting Started

These instructions will get you a copy of the project up and running on your local machine for development and testing
purposes.

You'll need [Git](https://git-scm.com) and [Node.js](https://nodejs.org/en/download/) (which comes with
[npm](http://npmjs.com)) installed on your computer. <br> **For Windows** Install Visual C++ Build Environment:
[Visual Studio Build Tools](https://visualstudio.microsoft.com/thank-you-downloading-visual-studio/?sku=BuildTools)

```
node@v10.16.0 or higher
npm@6.9.0 or higher
git@2.17.1 or higher
```

## How To Use

1. Fork this repository and clone it to your local machine.

```bash
$ git clone https://github.com/<your-username>/developer-portfolio.git
```

2. Go into the repository

```bash
$ cd developer-portfolio
```

3. Install dependencies

```bash
$ yarn
```

4. Edit `portfolio.js`

5. Start your development server

```bash
$ yarn dev
```

## Linking Portfolio to Github

```javascript
  //  portfolio.js
  githubUserName: 'YOUR GITHUB USERNAME HERE',
```

#### Using Emojis

For adding emoji 😃 into the texts in `Portfolio.js`, use the `emoji()` function and pass the text you need as an
argument. This would help in keeping emojis compatible across different browsers and platforms.

## Technologies Used

- [Next.js](https://nextjs.org/)
- [axios](https://www.npmjs.com/package/axios)
- [reactstrap](https://reactstrap.github.io/)
- [react-reveal](https://www.react-reveal.com/)
- [react-lottie](https://www.npmjs.com/package/react-lottie)
- [react-easy-emoji](https://github.com/appfigures/react-easy-emoji)
- [react-headroom](https://github.com/KyleAMathews/react-headroom)
- [color-thief](https://github.com/lokesh/color-thief)

## Illustrations

- [Lottie File Source](https://lottiefiles.com)

## Icons

Iconify Icons are used in the skill section. You can find all the icons here: [Iconify](https://icon-sets.iconify.design/).

## For the Future

If you can help us with these. Please don't hesitate to open a
[pull request](https://github.com/1hanzla100/developer-portfolio/pulls).

- Enable Dark Mode

- Add More Sections

## Show your support

Give a ⭐️ if this project helped you! You can buy me a coffee if you'd like to support my work further.
<div>
  <a href="https://www.buymeacoffee.com/1hanzla100"><img src="https://img.buymeacoffee.com/button-api/?text=Buy me a coffee&emoji=☕&slug=1hanzla100&button_colour=FFDD00&font_colour=ffffff&font_family=Cookie&outline_colour=000000&coffee_colour=FFDD00" /></a>
 </div>

## Author

👤 **Hanzla Tauqeer**

- Website: https://hanzla.netlify.app
- Github: [@1hanzla100](https://github.com/1hanzla100)
- LinkedIn: [@1hanzla100](https://linkedin.com/in/1hanzla100)
