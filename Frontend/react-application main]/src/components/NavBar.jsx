import React, { Component } from "react";
import { Navbar, Row, Col,Dropdown } from "react-bootstrap";
import logo from "./image/Amazon.jpg";
import { Link } from "react-router-dom";
import "../css/navbar.css"
class navbar extends Component {
  render() {
    return (
      <div>
        <Navbar style={{ height: "65px", backgroundColor: "#131921" }}>
          <Navbar.Brand href="/">
            <img src={logo} style={{ height: "58px", width: "145px" }} />
          </Navbar.Brand>
          <Row>
            <Col>
              <button
                style={{
                  height: "45px",
                  width: "130px",
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
                style={{ height: "45px", width: "900px" }}
              />
            </Col>
            <Link to="/products">
              <Col>
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
              </Col>
            </Link>
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
            <Col>
            <Dropdown >
  <Dropdown.Toggle className = "dropdownContainer">
    <img className = "profilePicDrop" src="https://i.stack.imgur.com/l60Hf.png"/> 
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item  onClick = {()=>this.props.changeUsername("Abdul")}>Abdul</Dropdown.Item>
    <Dropdown.Item onClick = {()=>this.props.changeUsername("Evegni")}>Evgeni </Dropdown.Item>
  </Dropdown.Menu>
</Dropdown>
            </Col>
          </Row>
        </Navbar>
      </div>
    );
  }
}
export default navbar;
