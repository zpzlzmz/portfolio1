import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card, CardBody, Table } from "reactstrap";
import Fade from "react-reveal/Fade";
import Navigation from "../components/Navigation";
import SEO from "../components/SEO";

// 통일된 색상 팔레트
const colors = {
  primary: '#58a6ff',
  secondary: '#8b949e',
  accent: '#30363d',
  text: '#e6edf3',
  muted: '#8b949e',
  card: '#161b22',
  border: '#30363d',
};

const projects = [
  {
    id: "kcalculator",
    name: "KCalculator",
    subtitle: "AI 기반 건강 식단 관리 서비스",
    period: "2024.10 ~ 2024.12",
    team: "4인 팀",
    contribution: "40%",
    role: "풀스택 개발 & AI 파이프라인 설계",
    description: "음식 사진 한 장으로 칼로리 분석부터 맞춤 식단 추천까지",
    tech: ["Next.js 15", "TypeScript", "FastAPI", "YOLO11-large", "GPT-4o Vision", "MySQL", "Redis"],
    github: "https://github.com/food-calorie-vision",
    color: "#00d9ff",
    features: [
      { name: "AI 음식 분석", desc: "YOLO11 탐지 → GPT-4o Vision 4개 후보 → 식약처 DB 매칭" },
      { name: "맞춤 식단 추천", desc: "Harris-Benedict 공식 기반 TDEE 계산, 3가지 스타일 옵션" },
      { name: "건강 점수", desc: "NRF9.3 기반 0~100점 영양 균형 수치화" },
      { name: "레시피 추천", desc: "Roboflow API로 냉장고 재료 인식 → 건강 레시피 제안" },
    ],
    troubleshooting: [
      {
        title: "GPT-Vision API 응답 지연 문제",
        issue: "이미지 분석 시 GPT-Vision API 호출로 인해 평균 3~5초 응답 지연 발생",
        solution: "Redis 캐싱 전략 도입 - 동일 이미지 해시값 기준으로 결과 캐싱, TTL 24시간 설정",
        result: "재분석 요청 시 응답 시간 95% 단축 (3초 → 0.15초), API 비용 30% 절감"
      },
      {
        title: "식약처 DB 매칭률 저조",
        issue: "GPT가 추출한 음식명과 DB 음식명 불일치로 매칭률 60% 수준",
        solution: "3단계 폴백 로직 구현 (정확한 음식명 → 주재료명 → 대분류) + 유사도 기반 검색",
        result: "매칭률 60% → 92%로 향상, 사용자 만족도 크게 개선"
      }
    ],
    highlights: [
      {
        title: "YOLO + GPT-Vision + DB 3단계 AI 파이프라인 아키텍처 설계",
        description: "단일 AI 모델의 한계를 극복하기 위해 YOLO11 객체 탐지 → GPT-4o Vision 음식명 추출 → MySQL 식약처 DB 매칭으로 이어지는 3단계 파이프라인 아키텍처를 설계. 각 단계가 독립적으로 동작하면서도 유기적으로 연결되는 구조 구현"
      },
      {
        title: "NRF9.3 기반 영양 균형 점수 알고리즘 설계",
        description: "단순 칼로리 계산을 넘어 영양학적 균형을 평가하는 시스템 구축. 권장 영양소 9개(단백질, 식이섬유, 비타민 등)와 제한 영양소 3개(포화지방, 나트륨, 당류)를 기준으로 0~100점 건강 점수를 산출하는 알고리즘 설계 및 구현"
      }
    ],
  },
  {
    id: "dolpan-eatso",
    name: "Dolpan-Eatso",
    subtitle: "AI 기반 스마트 한우 개체 관리 시스템",
    period: "2025.07 (해커톤)",
    team: "5인 팀",
    contribution: "35%",
    role: "풀스택 개발 & AI 파이프라인 구축",
    description: "스마트폰 카메라로 소의 BCS 분석 및 맞춤 사료 추천",
    tech: ["Next.js 14", "FastAPI", "YOLOv8", "ResNet", "LangChain", "GPT-4o-mini"],
    github: "https://github.com/dolpan-eatso",
    color: "#a855f7",
    features: [
      { name: "AI BCS 분석", desc: "YOLOv8 후구 탐지 → ResNet BCS 5~9점 판정" },
      { name: "맞춤 사료 추천", desc: "BCS 점수 기반 조사료/곡물사료 배합비 자동 계산" },
      { name: "AI 챗봇", desc: "LangChain + Function Calling으로 자연어 명령 처리" },
      { name: "대시보드", desc: "Recharts로 BCS 변화 추이, 사료비 분석 시각화" },
    ],
    troubleshooting: [
      {
        title: "모바일 이미지 업로드 시 CORS 에러",
        issue: "FastAPI 서버에서 Next.js 클라이언트 이미지 업로드 시 CORS 정책 위반",
        solution: "FastAPI CORSMiddleware 설정 + preflight 요청 처리, 허용 origin 명시",
        result: "모바일/데스크톱 모든 환경에서 이미지 업로드 정상 작동"
      },
      {
        title: "LangChain Function Calling 오작동",
        issue: "AI 챗봇이 의도와 다른 함수를 호출하거나 파라미터 누락",
        solution: "함수 스키마 명확화 + few-shot 예시 추가, 프롬프트 엔지니어링 개선",
        result: "함수 호출 정확도 70% → 95%로 향상, 사용자 의도 파악 개선"
      }
    ],
    highlights: [
      {
        title: "YOLOv8 Segmentation + ResNet 2단계 AI 파이프라인 구축",
        description: "소 전체 이미지가 아닌 후구 부위만 정확히 분석하기 위해 YOLOv8 Segmentation으로 후구 영역 탐지 → 크롭 → ResNet 분류 모델로 BCS 점수(5~9점) 판정하는 파이프라인 설계. AI Hub 사전학습 모델을 FastAPI로 서빙"
      },
      {
        title: "LangChain Function Calling 기반 AI Agent 시스템 설계",
        description: "단순 질의응답을 넘어 '대시보드 보여줘', '설정 변경해줘' 등 프로그램 제어가 가능한 AI Agent 구현. GPT-4o-mini + LangChain으로 자연어를 함수 호출로 변환하는 인터페이스 설계"
      }
    ],
  },
  {
    id: "postsmith",
    name: "PostSmith",
    subtitle: "Spring Boot + Next.js 기반 CMS 플랫폼",
    period: "2025.05 ~ 2025.06",
    team: "5인 팀",
    contribution: "30%",
    role: "카테고리·메뉴 관리 백엔드/프론트엔드",
    description: "모두가 쉽게 사용할 수 있는 블로그 생성 및 관리 서비스",
    tech: ["Spring Boot", "Next.js", "TypeScript", "React DnD", "NKS", "Jenkins"],
    github: "https://github.com/ncc-final-group",
    color: "#22c55e",
    features: [
      { name: "블로그 생성", desc: "사용자별 블로그 생성, 테마/플러그인 적용" },
      { name: "카테고리 관리", desc: "React DnD 드래그 앤 드롭 트리, 2단계 계층 구조" },
      { name: "메뉴 자동화", desc: "블로그 유형에 따라 URI 자동 생성" },
      { name: "MSA 배포", desc: "Naver Cloud Kubernetes 기반 마이크로서비스" },
    ],
    troubleshooting: [
      {
        title: "React DnD 드래그 시 상태 동기화 문제",
        issue: "카테고리 드래그 후 순서 변경이 DB에 반영되지 않거나 UI와 불일치",
        solution: "낙관적 업데이트 패턴 적용 - UI 즉시 반영 후 API 호출, 실패 시 롤백",
        result: "사용자 경험 개선, 드래그 후 즉각적인 피드백 제공"
      },
      {
        title: "계층 구조 무한 루프 방지",
        issue: "부모 카테고리를 자식의 하위로 이동 시 순환 참조 발생 가능",
        solution: "프론트엔드에서 드롭 가능 영역 제한 + 백엔드 유효성 검증 이중 체크",
        result: "데이터 무결성 보장, 순환 참조 완전 차단"
      }
    ],
    highlights: [
      {
        title: "React DnD 기반 2단계 계층 카테고리 트리 시스템 설계",
        description: "복잡한 다단계 계층 대신 부모-자식 2단계로 제한하여 DB 설계를 단순화하면서도 직관적인 드래그 앤 드롭 UI 제공. React DnD 라이브러리를 활용하여 드래그 가능 영역, 드롭 가능 영역을 명확히 구분한 UX 설계"
      },
      {
        title: "블로그 유형별 동적 메뉴 생성 시스템 구현",
        description: "개인/팀/기업 블로그 유형에 따라 카테고리 구조를 분석하여 URI를 자동 생성하는 메뉴 시스템 설계. Spring Boot에서 카테고리 계층을 순회하며 SEO 친화적인 URL 패턴을 동적으로 생성하는 로직 구현"
      }
    ],
  },
  {
    id: "ondam",
    name: "Ondam",
    subtitle: "Spring Boot 기반 사내 그룹웨어",
    period: "2025.03 ~ 2025.04",
    team: "6인 팀",
    contribution: "33%",
    role: "쪽지 시스템 & 공유 자료실 전담",
    description: "모든 구성원이 함께 소통하고 협업할 수 있는 공간",
    tech: ["Spring Boot", "Thymeleaf", "JPA", "MySQL", "WebSocket", "SSE", "Jenkins"],
    github: "https://github.com/bitcamp17-semi/ondam",
    color: "#f59e0b",
    features: [
      { name: "쪽지 시스템", desc: "SSE 실시간 알림, 중요 메시지 필터링, 검색 기능" },
      { name: "공유 자료실", desc: "부서별 자료 공유, 4개 이상 파일 zip 일괄 다운로드" },
      { name: "전자 결재", desc: "템플릿 기반 기안문 작성, 결재라인 순서 지정" },
      { name: "메신저", desc: "WebSocket 기반 1:1/그룹 채팅, 파일 전송" },
    ],
    troubleshooting: [
      {
        title: "SSE 연결 끊김 및 메모리 누수",
        issue: "장시간 접속 시 SSE 연결이 끊기거나 서버 메모리 사용량 급증",
        solution: "SseEmitter 타임아웃 설정 + 연결 끊김 시 자동 재연결 로직, 완료된 Emitter 즉시 제거",
        result: "24시간 이상 안정적인 실시간 알림 유지, 메모리 사용량 40% 감소"
      },
      {
        title: "대용량 파일 zip 압축 시 타임아웃",
        issue: "100MB 이상 파일 압축 시 30초 타임아웃으로 다운로드 실패",
        solution: "비동기 압축 처리 + 진행률 표시, 압축 완료 후 다운로드 링크 제공",
        result: "최대 500MB 파일까지 안정적 다운로드, 사용자에게 진행 상황 실시간 피드백"
      }
    ],
    highlights: [
      {
        title: "SSE(Server-Sent Events) 기반 실시간 알림 인프라 설계",
        description: "WebSocket 양방향 통신 대신 서버→클라이언트 단방향 통신이 적합한 알림 기능에 SSE를 선택. Spring Boot SseEmitter를 활용하여 쪽지/결재/일정 등 다양한 이벤트를 하나의 연결로 통합 관리하는 알림 인프라 아키텍처 설계"
      },
      {
        title: "스트리밍 방식 파일 압축 시스템 설계",
        description: "선택된 파일들을 메모리에 모두 로드하지 않고 Java NIO와 ZipOutputStream을 활용한 스트리밍 방식으로 압축. 파일을 청크 단위로 읽어 즉시 압축 스트림에 쓰는 방식으로 대용량 파일도 안정적으로 처리하는 아키텍처 구현"
      }
    ],
  }
];

export default function Home() {
  const [activeSection, setActiveSection] = useState("profile");

  useEffect(() => {
    const handleScroll = () => {
      const sections = ["profile", "experience", "education", "skills", ...projects.map(p => p.id)];
      for (const section of sections) {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          if (rect.top <= 150 && rect.bottom >= 150) {
            setActiveSection(section);
            break;
          }
        }
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <>
      <SEO />
      <Navigation />
      <main style={{ background: "#0d1117", minHeight: "100vh", paddingTop: "80px" }}>
        {/* 사이드 네비게이션 */}
        <div
          style={{
            position: "fixed",
            right: "30px",
            top: "50%",
            transform: "translateY(-50%)",
            zIndex: 100,
            display: "none",
          }}
          className="d-lg-block"
        >
          <div
            style={{
              background: colors.card,
              border: `1px solid ${colors.border}`,
              borderRadius: "12px",
              padding: "15px 10px",
            }}
          >
            {[
              { id: "profile", label: "프로필" },
              { id: "experience", label: "경력" },
              { id: "education", label: "학력" },
              { id: "skills", label: "스킬" },
              ...projects.map((p) => ({ id: p.id, label: p.name })),
            ].map((item) => (
              <div
                key={item.id}
                onClick={() => scrollToSection(item.id)}
                style={{
                  padding: "8px 15px",
                  margin: "3px 0",
                  borderRadius: "6px",
                  cursor: "pointer",
                  background:
                    activeSection === item.id
                      ? "rgba(88, 166, 255, 0.1)"
                      : "transparent",
                  borderLeft:
                    activeSection === item.id
                      ? `2px solid ${colors.primary}`
                      : "2px solid transparent",
                  color: activeSection === item.id ? colors.primary : colors.muted,
                  fontSize: "0.85rem",
                  transition: "all 0.2s ease",
                  whiteSpace: "nowrap",
                }}
              >
                {item.label}
              </div>
            ))}
          </div>
        </div>

        <Container>
          {/* 프로필 섹션 */}
          <section id="profile" style={{ paddingTop: "40px", paddingBottom: "40px" }}>
            <Fade bottom duration={800}>
              <div className="text-center py-5">
                <img
                  src="/profile.png"
                  alt="김준호"
                  style={{
                    width: "160px",
                    height: "160px",
                    borderRadius: "12px",
                    objectFit: "cover",
                    marginBottom: "1.5rem",
                    transition: "all 0.3s ease",
                    cursor: "pointer",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.transform = "scale(1.05) rotate(2deg)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(88, 166, 255, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.transform = "scale(1) rotate(0deg)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                />
                <h1
                  style={{
                    color: "#e6edf3",
                    fontSize: "2.5rem",
                    fontWeight: 600,
                    marginBottom: "0.5rem",
                  }}
                >
                  김준호
                </h1>
                <p
                  style={{
                    color: "#58a6ff",
                    fontSize: "1.1rem",
                    marginBottom: "1.5rem",
                  }}
                >
                  Backend Developer
                </p>
                <div style={{ color: "#8b949e", fontSize: "0.95rem" }}>
                  <span style={{ marginRight: "24px" }}>zpzlzmz@gmail.com</span>
                  <span style={{ marginRight: "24px" }}>010-2687-7488</span>
                  <span>서울</span>
                </div>
              </div>
            </Fade>

            <Fade bottom duration={800} delay={100}>
              <Card
                style={{
                  background: "#161b22",
                  border: "1px solid #30363d",
                  borderRadius: "12px",
                  marginBottom: "24px",
                  boxShadow: "none",
                }}
              >
                <CardBody className="p-4">
                  <p style={{ color: "#c9d1d9", lineHeight: "1.8", margin: 0 }}>
                    Spring Boot 기반 백엔드 개발자입니다. 그룹웨어, CMS 등 실무형 프로젝트를 진행하며
                    API 설계부터 배포까지 전 과정을 경험했습니다. Next.js 프론트엔드 개발과
                    YOLO, GPT-Vision 등 AI 모델 연동 경험도 있습니다. 미국에서 1년간 근무하며 영어
                    커뮤니케이션 역량을 쌓았습니다.
                  </p>
                </CardBody>
              </Card>
            </Fade>
          </section>

          <Row>
            <Col lg="6">
              {/* 경력 */}
              <section id="experience">
                <Fade bottom duration={800} delay={150}>
                  <Card
                    style={{
                      background: "#161b22",
                      border: "1px solid #30363d",
                      borderRadius: "12px",
                      marginBottom: "24px",
                      boxShadow: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#58a6ff";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#30363d";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <CardBody className="p-4">
                      <h4
                        style={{
                          color: "#e6edf3",
                          marginBottom: "1.2rem",
                          fontWeight: 500,
                        }}
                      >
                        경력
                      </h4>
                      <div
                        style={{
                          borderLeft: "2px solid #30363d",
                          paddingLeft: "16px",
                        }}
                      >
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.85rem",
                          }}
                        >
                          2022.03 - 2023.03
                        </div>
                        <h5
                          style={{
                            color: "#e6edf3",
                            margin: "4px 0",
                            fontSize: "1rem",
                            fontWeight: 500,
                          }}
                        >
                          KW International Inc.
                        </h5>
                        <div
                          style={{
                            color: "#58a6ff",
                            fontSize: "0.9rem",
                            marginBottom: "8px",
                          }}
                        >
                          Tech Support Intern, 미국 CA
                        </div>
                        <ul
                          style={{
                            color: "#8b949e",
                            paddingLeft: "18px",
                            margin: 0,
                            fontSize: "0.9rem",
                            lineHeight: "1.7",
                          }}
                        >
                          <li>Windows AD 환경에서 사용자 계정 및 권한 관리</li>
                          <li>Outlook, 프린터, 네트워크 장애 대응</li>
                          <li>자주 발생하는 이슈를 정리하고 해결 절차를 내부 매뉴얼로 정리</li>
                          <li>신입 직원들이 참고할 수 있는 IT 지원 매뉴얼 및 교육 자료 제작</li>
                          <li>영어/한국어 이중 언어로 다국적 팀 협업</li>
                        </ul>
                      </div>
                    </CardBody>
                  </Card>
                </Fade>
              </section>

              {/* 학력 */}
              <section id="education">
                <Fade bottom duration={800} delay={200}>
                  <Card
                    style={{
                      background: "#161b22",
                      border: "1px solid #30363d",
                      borderRadius: "12px",
                      marginBottom: "24px",
                      boxShadow: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#58a6ff";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#30363d";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <CardBody className="p-4">
                      <h4
                        style={{
                          color: "#e6edf3",
                          marginBottom: "1.2rem",
                          fontWeight: 500,
                        }}
                      >
                        학력
                      </h4>

                      <div
                        style={{
                          borderLeft: "2px solid #30363d",
                          paddingLeft: "16px",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.85rem",
                          }}
                        >
                          2025.06 - 2025.12
                        </div>
                        <h5
                          style={{
                            color: "#e6edf3",
                            margin: "4px 0",
                            fontSize: "1rem",
                            fontWeight: 500,
                          }}
                        >
                          인공지능 사관학교
                        </h5>
                        <div
                          style={{
                            color: "#58a6ff",
                            fontSize: "0.9rem",
                          }}
                        >
                          광주 인공지능사관학교 6기
                        </div>
                      </div>

                      <div
                        style={{
                          borderLeft: "2px solid #30363d",
                          paddingLeft: "16px",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.85rem",
                          }}
                        >
                          2024.12 - 2025.06
                        </div>
                        <h5
                          style={{
                            color: "#e6edf3",
                            margin: "4px 0",
                            fontSize: "1rem",
                            fontWeight: 500,
                          }}
                        >
                          네이버 풀스택 클라우드 캠프
                        </h5>
                        <div
                          style={{
                            color: "#58a6ff",
                            fontSize: "0.9rem",
                          }}
                        >
                          웹 풀스택 개발자 과정 17기
                        </div>
                      </div>

                      <div
                        style={{
                          borderLeft: "2px solid #30363d",
                          paddingLeft: "16px",
                          marginBottom: "20px",
                        }}
                      >
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.85rem",
                          }}
                        >
                          2023.03 - 2024.03
                        </div>
                        <h5
                          style={{
                            color: "#e6edf3",
                            margin: "4px 0",
                            fontSize: "1rem",
                            fontWeight: 500,
                          }}
                        >
                          Columbia West College
                        </h5>
                        <div
                          style={{
                            color: "#58a6ff",
                            fontSize: "0.9rem",
                          }}
                        >
                          미국 LA, 영어 과정 수료
                        </div>
                      </div>

                      <div
                        style={{
                          borderLeft: "2px solid #30363d",
                          paddingLeft: "16px",
                        }}
                      >
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.85rem",
                          }}
                        >
                          2016.03 - 2022.03
                        </div>
                        <h5
                          style={{
                            color: "#e6edf3",
                            margin: "4px 0",
                            fontSize: "1rem",
                            fontWeight: 500,
                          }}
                        >
                          동서대학교
                        </h5>
                        <div
                          style={{
                            color: "#58a6ff",
                            fontSize: "0.9rem",
                          }}
                        >
                          컴퓨터공학부 학사, GPA 3.7/4.5
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Fade>
              </section>

            </Col>

            <Col lg="6">
              {/* 기술 스택 */}
              <section id="skills">
                <Fade bottom duration={800} delay={150}>
                  <Card
                    style={{
                      background: "#161b22",
                      border: "1px solid #30363d",
                      borderRadius: "12px",
                      marginBottom: "24px",
                      boxShadow: "none",
                      transition: "all 0.3s ease",
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.borderColor = "#58a6ff";
                      e.currentTarget.style.transform = "translateY(-4px)";
                      e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.borderColor = "#30363d";
                      e.currentTarget.style.transform = "translateY(0)";
                      e.currentTarget.style.boxShadow = "none";
                    }}
                  >
                    <CardBody className="p-4">
                      <h4
                        style={{
                          color: "#e6edf3",
                          marginBottom: "1.2rem",
                          fontWeight: 500,
                        }}
                      >
                        기술 스택
                      </h4>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.75rem",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                          }}
                        >
                          Backend
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                          }}
                        >
                          {["Java", "Spring Boot", "JPA", "FastAPI", "Python"].map(
                            (s) => (
                              <span
                                key={s}
                                style={{
                                  background: "#21262d",
                                  color: "#ffffff",
                                  padding: "4px 10px",
                                  fontSize: "0.8rem",
                                  borderRadius: "4px",
                                  transition: "all 0.2s ease",
                                  cursor: "default",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#58a6ff";
                                  e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "#21262d";
                                  e.currentTarget.style.transform = "translateY(0)";
                                }}
                              >
                                {s}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.75rem",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                          }}
                        >
                          Frontend
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                          }}
                        >
                          {["Next.js", "React", "JavaScript", "TypeScript", "Tailwind"].map(
                            (s) => (
                              <span
                                key={s}
                                style={{
                                  background: "#21262d",
                                  color: "#ffffff",
                                  padding: "4px 10px",
                                  fontSize: "0.8rem",
                                  borderRadius: "4px",
                                  transition: "all 0.2s ease",
                                  cursor: "default",
                                }}
                                onMouseEnter={(e) => {
                                  e.currentTarget.style.background = "#58a6ff";
                                  e.currentTarget.style.transform = "translateY(-2px)";
                                }}
                                onMouseLeave={(e) => {
                                  e.currentTarget.style.background = "#21262d";
                                  e.currentTarget.style.transform = "translateY(0)";
                                }}
                              >
                                {s}
                              </span>
                            )
                          )}
                        </div>
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.75rem",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                          }}
                        >
                          Database
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                          }}
                        >
                          {["MySQL", "Redis"].map((s) => (
                            <span
                              key={s}
                              style={{
                                background: "#21262d",
                                color: "#ffffff",
                                padding: "4px 10px",
                                fontSize: "0.8rem",
                                borderRadius: "4px",
                                transition: "all 0.2s ease",
                                cursor: "default",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#58a6ff";
                                e.currentTarget.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#21262d";
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div style={{ marginBottom: "16px" }}>
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.75rem",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                          }}
                        >
                          AI/ML
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                          }}
                        >
                          {["YOLO", "GPT-4o Vision", "LangChain"].map((s) => (
                            <span
                              key={s}
                              style={{
                                background: "#21262d",
                                color: "#ffffff",
                                padding: "4px 10px",
                                fontSize: "0.8rem",
                                borderRadius: "4px",
                                transition: "all 0.2s ease",
                                cursor: "default",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#58a6ff";
                                e.currentTarget.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#21262d";
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>

                      <div>
                        <div
                          style={{
                            color: "#8b949e",
                            fontSize: "0.75rem",
                            marginBottom: "6px",
                            textTransform: "uppercase",
                          }}
                        >
                          DevOps
                        </div>
                        <div
                          style={{
                            display: "flex",
                            flexWrap: "wrap",
                            gap: "6px",
                          }}
                        >
                          {["Docker", "Jenkins", "Kubernetes", "Git"].map((s) => (
                            <span
                              key={s}
                              style={{
                                background: "#21262d",
                                color: "#ffffff",
                                padding: "4px 10px",
                                fontSize: "0.8rem",
                                borderRadius: "4px",
                                transition: "all 0.2s ease",
                                cursor: "default",
                              }}
                              onMouseEnter={(e) => {
                                e.currentTarget.style.background = "#58a6ff";
                                e.currentTarget.style.transform = "translateY(-2px)";
                              }}
                              onMouseLeave={(e) => {
                                e.currentTarget.style.background = "#21262d";
                                e.currentTarget.style.transform = "translateY(0)";
                              }}
                            >
                              {s}
                            </span>
                          ))}
                        </div>
                      </div>
                    </CardBody>
                  </Card>
                </Fade>
              </section>

              <Fade bottom duration={800} delay={200}>
                <Card
                  style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#58a6ff";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#30363d";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <CardBody className="p-4">
                    <h4
                      style={{
                        color: "#e6edf3",
                        marginBottom: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      언어
                    </h4>
                    <div style={{ display: "flex", gap: "40px" }}>
                      <div>
                        <span style={{ color: "#c9d1d9" }}>한국어</span>
                        <span style={{ color: "#8b949e", marginLeft: "8px" }}>
                          Native
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "#c9d1d9" }}>영어</span>
                        <span style={{ color: "#8b949e", marginLeft: "8px" }}>
                          Business
                        </span>
                      </div>
                      <div>
                        <span style={{ color: "#c9d1d9" }}>일본어</span>
                        <span style={{ color: "#8b949e", marginLeft: "8px" }}>
                          Conversational
                        </span>
                      </div>
                    </div>
                  </CardBody>
                </Card>
              </Fade>

              <Fade bottom duration={800} delay={250}>
                <Card
                  style={{
                    background: "#161b22",
                    border: "1px solid #30363d",
                    borderRadius: "12px",
                    marginBottom: "24px",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = "#58a6ff";
                    e.currentTarget.style.transform = "translateY(-4px)";
                    e.currentTarget.style.boxShadow = "0 8px 24px rgba(0, 0, 0, 0.3)";
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = "#30363d";
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  <CardBody className="p-4">
                    <h4
                      style={{
                        color: "#e6edf3",
                        marginBottom: "1rem",
                        fontWeight: 500,
                      }}
                    >
                      링크
                    </h4>
                    <div
                      style={{
                        display: "flex",
                        flexDirection: "column",
                        gap: "8px",
                      }}
                    >
                      <a
                        href="https://github.com/zpzlzmz"
                        target="_blank"
                        rel="noopener noreferrer"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#c9d1d9",
                          textDecoration: "none",
                          padding: "10px 14px",
                          background: "#21262d",
                          borderRadius: "6px",
                          fontSize: "0.9rem",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#30363d";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#21262d";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <i
                          className="fa fa-github"
                          style={{ marginRight: "10px" }}
                        />
                        github.com/zpzlzmz
                      </a>
                      <a
                        href="mailto:zpzlzmz@gmail.com"
                        style={{
                          display: "flex",
                          alignItems: "center",
                          color: "#c9d1d9",
                          textDecoration: "none",
                          padding: "10px 14px",
                          background: "#21262d",
                          borderRadius: "6px",
                          fontSize: "0.9rem",
                          transition: "all 0.2s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = "#30363d";
                          e.currentTarget.style.transform = "translateX(4px)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "#21262d";
                          e.currentTarget.style.transform = "translateX(0)";
                        }}
                      >
                        <i
                          className="fa fa-envelope"
                          style={{ marginRight: "10px" }}
                        />
                        zpzlzmz@gmail.com
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Fade>
            </Col>
          </Row>

          {/* 프로젝트 섹션 */}
          <h2
            style={{
              color: colors.text,
              marginTop: "40px",
              marginBottom: "24px",
              paddingLeft: "10px",
              fontSize: "1.8rem",
            }}
          >
            Projects
          </h2>

          {projects.map((project, idx) => (
            <section
              key={project.id}
              id={project.id}
              style={{ paddingBottom: "30px" }}
            >
              <Fade bottom duration={800} delay={idx * 50}>
                <Card
                  style={{
                    background: colors.card,
                    border: `1px solid ${colors.border}`,
                    borderRadius: "16px",
                    overflow: "hidden",
                    borderLeft: `4px solid ${project.color}`,
                    boxShadow: "none",
                    transition: "all 0.3s ease",
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.borderColor = project.color;
                    e.currentTarget.style.transform = "translateY(-6px)";
                    e.currentTarget.style.boxShadow = `0 12px 32px rgba(0, 0, 0, 0.4)`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.borderColor = colors.border;
                    e.currentTarget.style.transform = "translateY(0)";
                    e.currentTarget.style.boxShadow = "none";
                  }}
                >
                  {/* 프로젝트 헤더 */}
                  <div
                    style={{
                      borderBottom: `1px solid ${colors.border}`,
                      padding: "20px 24px",
                      background: `linear-gradient(135deg, ${project.color}10 0%, transparent 100%)`,
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        flexWrap: "wrap",
                      }}
                    >
                      <div>
                        <h3
                          style={{
                            color: project.color,
                            margin: 0,
                            fontSize: "1.25rem",
                            fontWeight: 600,
                          }}
                        >
                          {project.name}
                        </h3>
                        <p
                          style={{
                            color: colors.muted,
                            margin: "4px 0 0",
                            fontSize: "0.9rem",
                          }}
                        >
                          {project.subtitle}
                        </p>
                      </div>
                      <div style={{ textAlign: "right" }}>
                        <div style={{ color: colors.muted, fontSize: "0.85rem", marginBottom: "4px" }}>
                          {project.period}
                        </div>
                        <div style={{ color: colors.muted, fontSize: "0.8rem", marginBottom: "2px" }}>
                          {project.team} • 기여도 <span style={{ color: project.color, fontWeight: 600 }}>{project.contribution}</span>
                        </div>
                        <div style={{ color: colors.primary, fontSize: "0.8rem" }}>
                          {project.role}
                        </div>
                      </div>
                    </div>
                  </div>

                  <CardBody className="p-4">
                    {/* 설명 */}
                    <p
                      style={{
                        color: colors.muted,
                        marginBottom: "16px",
                        fontSize: "0.95rem",
                      }}
                    >
                      {project.description}
                    </p>

                    {/* 기술 스택 */}
                    <div
                      style={{
                        marginBottom: "20px",
                        display: "flex",
                        flexWrap: "wrap",
                        gap: "6px",
                      }}
                    >
                      {project.tech.map((t) => (
                        <span
                          key={t}
                          style={{
                            background: colors.accent,
                            border: `1px solid ${colors.border}`,
                            color: colors.secondary,
                            padding: "4px 10px",
                            fontSize: "0.75rem",
                            fontWeight: 400,
                            borderRadius: "4px",
                          }}
                        >
                          {t}
                        </span>
                      ))}
                    </div>

                    {/* 주요 기능 테이블 */}
                    <div style={{ marginBottom: "20px" }}>
                      <h5
                        style={{
                          color: colors.text,
                          marginBottom: "12px",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                        }}
                      >
                        주요 기능
                      </h5>
                      <Table style={{ marginBottom: 0 }} borderless size="sm">
                        <tbody>
                          {project.features.map((f, i) => (
                            <tr
                              key={i}
                              style={{
                                borderBottom:
                                  i < project.features.length - 1
                                    ? `1px solid ${colors.accent}`
                                    : "none",
                              }}
                            >
                              <td
                                style={{
                                  color: colors.text,
                                  fontWeight: 500,
                                  width: "120px",
                                  padding: "10px 0",
                                  fontSize: "0.9rem",
                                  verticalAlign: "top",
                                }}
                              >
                                {f.name}
                              </td>
                              <td
                                style={{
                                  color: colors.muted,
                                  padding: "10px 0",
                                  fontSize: "0.9rem",
                                }}
                              >
                                {f.desc}
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </Table>
                    </div>

                    {/* 핵심 경험 */}
                    <div style={{ marginBottom: "16px" }}>
                      <h5
                        style={{
                          color: colors.text,
                          marginBottom: "12px",
                          fontSize: "0.95rem",
                          fontWeight: 500,
                        }}
                      >
                        핵심 경험
                      </h5>
                      {project.highlights.map((h, i) => (
                        <div
                          key={i}
                          style={{
                            background: colors.accent,
                            borderRadius: "10px",
                            padding: "14px 16px",
                            marginBottom: "10px",
                            borderLeft: `2px solid ${project.color}`,
                          }}
                        >
                          <div
                            style={{
                              color: colors.text,
                              marginBottom: "8px",
                              fontSize: "0.9rem",
                              fontWeight: 500,
                            }}
                          >
                            {h.title}
                          </div>
                          <div style={{ fontSize: "0.85rem", lineHeight: "1.7", color: colors.muted }}>
                            {h.description}
                          </div>
                        </div>
                      ))}
                    </div>

                    {/* 트러블슈팅 */}
                    {project.troubleshooting && (
                      <div style={{ marginBottom: "20px" }}>
                        <h5
                          style={{
                            color: colors.text,
                            marginBottom: "12px",
                            fontSize: "0.95rem",
                            fontWeight: 500,
                          }}
                        >
                          트러블슈팅
                        </h5>
                        {project.troubleshooting.map((ts, i) => (
                          <div
                            key={i}
                            style={{
                              background: colors.accent,
                              borderRadius: "10px",
                              padding: "14px 16px",
                              marginBottom: "10px",
                              borderLeft: `2px solid #f59e0b`,
                            }}
                          >
                            <div
                              style={{
                                color: colors.text,
                                marginBottom: "8px",
                                fontSize: "0.9rem",
                                fontWeight: 500,
                              }}
                            >
                              {ts.title}
                            </div>
                            <div style={{ fontSize: "0.85rem", lineHeight: "1.6" }}>
                              <div
                                style={{ color: colors.muted, marginBottom: "4px" }}
                              >
                                <span style={{ color: "#f47067" }}>문제</span>{" "}
                                {ts.issue}
                              </div>
                              <div
                                style={{ color: colors.muted, marginBottom: "4px" }}
                              >
                                <span style={{ color: colors.primary }}>해결</span>{" "}
                                {ts.solution}
                              </div>
                              <div style={{ color: colors.muted }}>
                                <span style={{ color: "#57ab5a" }}>결과</span>{" "}
                                {ts.result}
                              </div>
                            </div>
                          </div>
                        ))}
                      </div>
                    )}

                    {/* 링크 */}
                    <div style={{ display: "flex", gap: "8px", flexWrap: "wrap" }}>
                      <a
                        href={project.github}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="project-link"
                        style={{
                          display: "inline-flex",
                          alignItems: "center",
                          padding: "8px 16px",
                          background: "rgba(88, 166, 255, 0.1)",
                          border: `1px solid ${colors.primary}`,
                          borderRadius: "8px",
                          color: colors.primary,
                          textDecoration: "none",
                          fontSize: "0.85rem",
                          fontWeight: 500,
                          transition: "all 0.3s ease",
                        }}
                        onMouseEnter={(e) => {
                          e.currentTarget.style.background = colors.primary;
                          e.currentTarget.style.color = "#0d1117";
                          e.currentTarget.style.transform = "translateY(-2px)";
                          e.currentTarget.style.boxShadow = "0 4px 12px rgba(88, 166, 255, 0.3)";
                        }}
                        onMouseLeave={(e) => {
                          e.currentTarget.style.background = "rgba(88, 166, 255, 0.1)";
                          e.currentTarget.style.color = colors.primary;
                          e.currentTarget.style.transform = "translateY(0)";
                          e.currentTarget.style.boxShadow = "none";
                        }}
                      >
                        <i
                          className="fa fa-github"
                          style={{ marginRight: "6px" }}
                        />
                        GitHub
                      </a>
                    </div>
                  </CardBody>
                </Card>
              </Fade>
            </section>
          ))}

          <div className="text-center py-4">
            <p
              style={{
                color: "#484f58",
                fontSize: "0.85rem",
                margin: 0,
              }}
            >
              2025 김준호
            </p>
    </div>
        </Container>
      </main>
    </>
  );
}
