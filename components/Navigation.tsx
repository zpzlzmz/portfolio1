import React, { useState, useEffect } from "react";
import { useRouter } from "next/router";
import Link from "next/link";
import { greetings, socialLinks } from "../portfolio";
import { UncontrolledCollapse, NavbarBrand, Navbar, NavItem, NavLink, Nav, Container, Row, Col } from "reactstrap";

const Navigation = () => {
  const [collapseClasses, setCollapseClasses] = useState("");
  const router = useRouter();
  
  const onExiting = () => setCollapseClasses("collapsing-out");
  const onExited = () => setCollapseClasses("");

  const isActive = (path: string) => router.pathname === path;

  // 기본 헤더 스타일 (다크 테마)
  const fullStyle = {
    position: 'fixed' as const,
    top: 0,
    left: 0,
    right: 0,
    width: '100%',
    backgroundColor: '#161b22',
    borderBottom: '1px solid #30363d',
    borderRadius: 0,
    boxShadow: 'none',
    padding: undefined,
    zIndex: 1000,
    transition: 'all 0.3s ease',
  };

  return (
    <>
      <header className="header-global">
        <Navbar 
          className="navbar-main" 
          expand="lg" 
          id="navbar-main"
          style={fullStyle}
        >
          <Container>
            <NavbarBrand href="/" className="mr-lg-5">
              <h2 style={{ color: '#00d9ff', margin: 0 }} id="nav-title">
                {greetings.name}
              </h2>
            </NavbarBrand>
            <button className="navbar-toggler" aria-label="navbar_toggle" id="navbar_global">
              <span className="navbar-toggler-icon" />
            </button>
            <UncontrolledCollapse
              toggler="#navbar_global"
              navbar
              className={collapseClasses}
              onExiting={onExiting}
              onExited={onExited}
            >
              <div className="navbar-collapse-header">
                <Row>
                  <Col className="collapse-brand" xs="6">
                    <h3 style={{ color: '#0d1117' }} id="nav-title">
                      {greetings.name}
                    </h3>
                  </Col>
                  <Col className="collapse-close" xs="6">
                    <button className="navbar-toggler" id="navbar_global">
                      <span />
                      <span />
                    </button>
                  </Col>
                </Row>
              </div>
              <Nav className="align-items-lg-center ml-lg-auto" navbar>
                {socialLinks.github && (
                  <NavItem>
                    <NavLink
                      rel="noopener"
                      aria-label="Github"
                      className="nav-link-icon"
                      href={socialLinks.github}
                      target="_blank"
                      style={{ 
                        color: '#e6edf3',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#58a6ff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#e6edf3'}
                    >
                      <i className="fa fa-github" style={{ fontSize: '1.3rem' }} />
                      <span className="nav-link-inner--text d-lg-none ml-2">Github</span>
                    </NavLink>
                  </NavItem>
                )}
                {socialLinks.email && (
                  <NavItem>
                    <NavLink
                      rel="noopener"
                      aria-label="Email"
                      className="nav-link-icon"
                      href={socialLinks.email}
                      style={{ 
                        color: '#e6edf3',
                        transition: 'color 0.2s ease'
                      }}
                      onMouseEnter={(e) => e.currentTarget.style.color = '#58a6ff'}
                      onMouseLeave={(e) => e.currentTarget.style.color = '#e6edf3'}
                    >
                      <i className="fa fa-envelope" style={{ fontSize: '1.2rem' }} />
                      <span className="nav-link-inner--text d-lg-none ml-2">Email</span>
                    </NavLink>
                  </NavItem>
                )}
              </Nav>
            </UncontrolledCollapse>
          </Container>
        </Navbar>
      </header>
    </>
  );
};

export default Navigation;
