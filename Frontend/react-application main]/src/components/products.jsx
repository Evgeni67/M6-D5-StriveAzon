import React from "react";
import {
  Form,
  Navbar,
  Nav,
  FormControl,
  Image,
  Dropdown,
  Container,
  ListGroup,
  Button,
  Card,
  Modal,
  Row,
  Col,
} from "react-bootstrap";
import "../css/Evgeni.css";
class Products extends React.Component {
  state = {
    currentProducts: [],
    isOpen: false,
    isSecondOpen: false,
    currentId: "",
    comments: [],
    rate: 1,
  };
  openModal = (e) => {
    this.setState({
      isOpen: true,
      currentId: e.currentTarget.parentElement.children[0].innerText,
    });
  };
  closeModal = () => this.setState({ isOpen: false });
  openSecondModal = () => {
    this.setState({
      isSecondOpen: true,
    });
  };
  closeSecondModal = () => this.setState({ isSecondOpen: false });
  addReview = async () => {
    const project = { name:this.state.name,comment:this.state.comments };

    console.log("actually in");
    try {
      let response = await fetch(`http://localhost:3002/reviews`, {
        method: "POST",
        body: JSON.stringify(project),
        headers: new Headers({
          "Content-Type": "application/json",
        }),
      });
      response = await response.json();
      if (response.ok) {
        console.log(response);
      } else {
        alert("wtf");
      }

      console.log("Response: " + response);
      return response;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  deleteProduct = async (e,id) => {
    try {
      let response = await fetch(`http://localhost:3002/products/${id}`, {
        method: "DELETE",
      });
     console.log(response)
      if (response.ok) {
        console.log(response);
      } else {
        alert("The respose is not ok but still removed");
      }

      console.log("Response: " + response);
      this.fetchProducts()
      return response;
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  changeStateComment = async (event) => {
    this.setState({ comment: event.target.value });
    console.log(this.state);
  };
  changeStateRate = async (event) => {
    this.setState({ rate: event.taget.value });
    console.log(this.state);
  };
  getTheReviews = async (e) => {
    this.openSecondModal();
    let id = e.currentTarget.parentElement.children[0].innerText;
    try {
      let response = await fetch(`http://localhost:3002/projects/${id}`, {
        method: "GET",
      });
      response = await response.json();
      this.setState({ comments: response.reviews });
      console.log(response.reviews);
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };

  fetchProducts = async () => {
    try {
      let response = await fetch(`http://localhost:3002/products`, {
        method: "GET",
      });
      response = await response.json();

      console.log(response);
      this.setState({ currentProducts: response });
      return response;

      //console.log("user", response)
    } catch (e) {
      console.log("ERROR fetching HERE " + e);
    }
  };
  componentDidMount = async() =>{ 
   this.fetchProducts()
  }
  render() {
    return (
      <>
        <Modal show={this.state.isSecondOpen}>
          <Modal.Header>
            <Modal.Title>Reviews</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            {this.state.comments.map((comment) => (
              <p>{comment.comment} </p>
            ))}
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={this.closeSecondModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Modal show={this.state.isOpen}>
          <Modal.Header>
            <Modal.Title>Add A Review</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form>
              <Form.Group controlId="exampleForm.ControlSelect1">
                <Form.Label>Rate:</Form.Label>
                <Form.Control as="select">
                  <option>1</option>
                  <option>2</option>
                  <option>3</option>
                  <option>4</option>
                  <option>5</option>
                </Form.Control>
              </Form.Group>

              <Form.Group controlId="exampleForm.ControlInput1">
                <Form.Label>Comment</Form.Label>
                <Form.Control
                  type="text"
                  onChange={(event) => this.changeStateComment(event)}
                  placeholder="Dont be rude pls"
                />
              </Form.Group>
            </Form>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={() => this.addReview()}>
              Sumbit Comment
            </Button>
            <Button variant="secondary" onClick={this.closeModal}>
              Close
            </Button>
          </Modal.Footer>
        </Modal>
        <Row>
          {this.state.currentProducts.length !== 0 &&
            this.state.currentProducts.map((project) => (
              <Col sm={2} className="mt-5">
                <Card style={{ width: "18rem" }} value={project._id}>
                  <Card.Img
                    variant="top"
                    src={project.imgUrl}
                    style={{ height: "300px" }}
                  />
                  <Card.Body>
                    <div className="d-none">{project.id}</div>
                    <Card.Title>{project.name}</Card.Title>
                    <Card.Text>{project.description}</Card.Text>
                    <Card.Text>Brand / {project.brand}</Card.Text>
                    <Button variant="success">Buy Now {project.price}</Button>
                    <Button
                      variant="secondary"
                      onClick={(e) => this.openModal(e)}
                    >
                      Add a review
                    </Button>
                    <Button
                      variant="info"
                      onClick={(e) => this.getTheReviews(e)}
                    >
                      See Reviews
                    </Button>
                    <Button
                      variant="danger"
                      onClick={(e) => this.deleteProduct(e,project._id)}
                    >
                      Delete Product{" "}
                    </Button>
                  </Card.Body>
                </Card>
              </Col>
            ))}
        </Row>
      </>
    );
  }
}
export default Products;
