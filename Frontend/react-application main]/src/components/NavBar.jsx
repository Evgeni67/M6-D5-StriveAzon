import React, { Component } from "react";
import { Navbar, Row, Col, Container } from "react-bootstrap";
import logo from "./image/AmazonLogoNav.png";
import "../css/Abdul.css";
import { Link } from "react-router-dom";

class navbar extends Component {
  render() {
    return (
      <div className=" my-auto align-items-center">
        <Navbar
          className=" py-auto align-items-center"
          style={{ height: "65px", backgroundColor: "#131921" }}
        >
          <Container fluid className="justify-content-start align-items-center">
            <Navbar.Brand href="/">
              <img src={logo} style={{ height: "45px", width: "145px" }} />
            </Navbar.Brand>
            <Row className="justify-content-start align-items-center">
              <Col>
                <button
                  style={{
                    height: "45px",
                    maxWidth: "130px",
                    background: "#131921",
                    color: "white",
                    fontSize: "13px",
                  }}
                >
                  <div>
                    <p>
                      Deliver to <br />
                      Albania
                    </p>
                  </div>
                </button>
              </Col>
              <Col>
                <input
                  type="text"
                  placeholder="Search.."
                  style={{ height: "45px", maxWidth: "900px" }}
                />
              </Col>
              <Col>
                <Link to="/products">
                  <button
                    style={{
                      height: "45px",
                      width: "140px",
                      background: "#131921",
                      color: "white",
                      fontSize: "14px",
                    }}
                  >
                    <div>
                      <p>
                        Hello sing in
                        <br />
                        Account & list
                      </p>
                    </div>
                  </button>
                </Link>
              </Col>
              <Col>
                <button
                  style={{
                    height: "45px",
                    width: "120px",
                    background: "#131921",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <p>
                      Returns
                      <br />& orders
                    </p>
                  </div>
                </button>
              </Col>
              <Col>
                <button
                  style={{
                    height: "45px",
                    width: "120px",
                    background: "#131921",
                    color: "white",
                    fontSize: "14px",
                  }}
                >
                  <div>
                    <p>Card</p>
                  </div>
                </button>
              </Col>
            </Row>
          </Container>
        </Navbar>
      </div>
    );
  }
}
export default navbar;
