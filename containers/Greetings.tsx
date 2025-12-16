import React, { useEffect, useState } from "react";
import { greetings } from "../portfolio";
import { Button, Container, Row, Col } from "reactstrap";
import GreetingLottie from "../components/DisplayLottie";
import SocialLinks from "../components/SocialLinks";

const Greetings = () => {
  const [portfolioHover, setPortfolioHover] = useState(false);
  const [resumeHover, setResumeHover] = useState(false);
  const [showScrollHint, setShowScrollHint] = useState(true);

  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement!.scrollTop = 0;

    const onScroll = () => {
      if (window.scrollY > 40) {
        setShowScrollHint(false);
        window.removeEventListener("scroll", onScroll);
      }
    };

    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <main style={{ paddingTop: "72px" }}>
      <div className="position-relative">
        <section
          className="section hero-wave"
          style={{
            padding: "72px 0 80px",
            backgroundColor: "transparent",
          }}
        >
          <div className="shape shape-style-1" style={{ background: "transparent" }}>
            {/* 배경 도형들 - 살짝만 색감을 주는 입자 느낌 */}
            <span style={{ background: "rgba(0, 217, 255, 0.08)" }} />
            <span style={{ background: "rgba(124, 58, 237, 0.08)" }} />
            <span style={{ background: "rgba(0, 217, 255, 0.04)" }} />
            <span style={{ background: "rgba(124, 58, 237, 0.04)" }} />
            <span style={{ background: "rgba(0, 217, 255, 0.1)" }} />
            <span style={{ background: "rgba(124, 58, 237, 0.1)" }} />
            <span style={{ background: "rgba(0, 217, 255, 0.04)" }} />
            <span style={{ background: "rgba(124, 58, 237, 0.04)" }} />
            <span style={{ background: "rgba(0, 217, 255, 0.08)" }} />
          </div>
          <Container className="py-lg-md d-flex">
            <div className="col px-0">
              <Row>
                <Col lg="6">
                  <p style={{ color: "#58a6ff", fontSize: "0.95rem", marginBottom: "4px" }}>
                    {greetings.name}
                  </p>
                  <h1
                    className="display-4"
                    style={{
                      color: "#e6edf3",
                      fontWeight: 650,
                      marginBottom: "0.5rem",
                    }}
                  >
                    {greetings.title}
                  </h1>

                  {/* 역할/키워드 뱃지 */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "8px",
                      marginBottom: "1rem",
                    }}
                  >
                    {["Backend", "AI Integration", "DevOps"].map((badge) => (
                      <span
                        key={badge}
                        style={{
                          padding: "4px 10px",
                          borderRadius: "999px",
                          background: "rgba(33, 38, 45, 0.9)",
                          color: "#e6edf3",
                          fontSize: "0.75rem",
                          border: "1px solid #30363d",
                        }}
                      >
                        {badge}
                      </span>
                    ))}
                  </div>

                  <p
                    className="lead"
                    style={{
                      color: "#8b949e",
                      fontSize: "1.05rem",
                      lineHeight: "1.7",
                      marginBottom: "1.25rem",
                    }}
                  >
                    {greetings.description}
                  </p>
                  <SocialLinks />
                  <div
                    className="btn-wrapper my-4"
                    style={{ display: "flex", gap: "12px", flexWrap: "wrap" }}
                  >
                    {/* 포트폴리오 보기 버튼 */}
                    <Button
                      className="btn-icon mb-3 mb-sm-0"
                      style={{
                        background: portfolioHover
                          ? "linear-gradient(135deg, #00d9ff 0%, #7c3aed 100%)"
                          : "transparent",
                        border: "2px solid #00d9ff",
                        borderRadius: "50px",
                        padding: "12px 32px",
                        fontWeight: 600,
                        color: portfolioHover ? "#fff" : "#00d9ff",
                        transition: "all 0.3s ease",
                        minWidth: "180px",
                      }}
                      href="/portfolio"
                      onMouseEnter={() => setPortfolioHover(true)}
                      onMouseLeave={() => setPortfolioHover(false)}
                    >
                      <span className="btn-inner--icon mr-1">
                        <i className="fa fa-briefcase" />
                      </span>
                      <span className="btn-inner--text">
                        {portfolioHover ? '포트폴리오 보러가기 →' : '포트폴리오 보기'}
                      </span>
                    </Button>
                    {/* 이력서 보기 버튼 */}
                    {greetings.resumeLink && (
                      <Button
                        className="btn-icon mb-3 mb-sm-0"
                        style={{
                          background: resumeHover
                            ? "linear-gradient(135deg, #7c3aed 0%, #00d9ff 100%)"
                            : "transparent",
                          border: "2px solid #7c3aed",
                          borderRadius: "50px",
                          padding: "12px 32px",
                          fontWeight: 600,
                          color: resumeHover ? "#fff" : "#7c3aed",
                          transition: "all 0.3s ease",
                          minWidth: "180px",
                        }}
                        href={greetings.resumeLink}
                        onMouseEnter={() => setResumeHover(true)}
                        onMouseLeave={() => setResumeHover(false)}
                      >
                        <span className="btn-inner--icon mr-1">
                          <i className="fa fa-file" />
                        </span>
                        <span className="btn-inner--text">
                          {resumeHover ? '이력서 보러가기 →' : '이력서 보기'}
                        </span>
                      </Button>
                    )}
                  </div>

                  {/* 간단 하이라이트 뱃지들 */}
                  <div
                    style={{
                      display: "flex",
                      flexWrap: "wrap",
                      gap: "10px",
                      marginTop: "4px",
                      fontSize: "0.8rem",
                    }}
                  >
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "#111827",
                        color: "#58a6ff",
                        border: "1px solid #1f2937",
                      }}
                    >
                      광주 인공지능사관학교 6기
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "#111827",
                        color: "#a855f7",
                        border: "1px solid #1f2937",
                      }}
                    >
                      네이버 클라우드 캠프 17기
                    </span>
                    <span
                      style={{
                        padding: "4px 10px",
                        borderRadius: "999px",
                        background: "#111827",
                        color: "#22c55e",
                        border: "1px solid #1f2937",
                      }}
                    >
                      YOLO · GPT-4o Vision · LangChain
                    </span>
                  </div>
                </Col>
                <Col lg="6">
                  <GreetingLottie animationPath="/lottie/coding.json" />
                </Col>
              </Row>
            </div>
          </Container>
          {showScrollHint && (
            <div
              className="scroll-down-hint"
              onClick={() => {
                const el = document.getElementById("skills");
                if (el) {
                  el.scrollIntoView({ behavior: "smooth", block: "start" });
                }
              }}
            >
              <span>아래로 내려보세요</span>
              <div className="arrow" />
            </div>
          )}
        </section>
      </div>
    </main>
  );
};

export default Greetings;
