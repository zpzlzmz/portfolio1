import React from "react";
import EducationCard from "../components/EducationCard";
import { educationInfo } from "../portfolio";
import { Container, Row, Col } from "reactstrap";
import Fade from "react-reveal/Fade";

const Education = () => {
  return (
    educationInfo && (
      <Fade bottom duration={2000}>
        <section className="section pb-0 my-5">
          <Container>
            <div className="d-flex px-3">
              <div>
                <div className="icon icon-lg icon-shape shadow rounded-circle" style={{
                  background: 'linear-gradient(135deg, #00d9ff 0%, #7c3aed 100%)'
                }}>
                  <i className="ni ni-books" style={{ color: '#0d1117' }} />
                </div>
              </div>
              <div className="pl-4">
                <h4 className="display-3" style={{ color: '#e6edf3' }}>학력</h4>
              </div>
            </div>
            <Row className="row-grid align-items-center">
              {educationInfo.map(info => {
                return (
                  <Col className="order-lg-1" lg="6" key={info.schoolName}>
                    <EducationCard {...info} />
                  </Col>
                );
              })}
            </Row>
          </Container>
          
        </section>
      </Fade>
    )
  );
};

export default Education;
