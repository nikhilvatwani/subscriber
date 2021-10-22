import React, { Component} from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import $ from 'jquery';
export default class Products extends Component {
    constructor(props) {
        super(props);
        this.state = {
          products:[]
        };
      }

      componentDidMount() {
          this.Products().then((res) => {
            const allProducts = JSON.parse(JSON.stringify(res));
            this.setState({products: allProducts.data});
            console.log(this.state.products);
          });
        }

     Products(){
        return $.getJSON('http://localhost:8080/notify')
        .then(function(data) {
          return data;
        });
      }
     addToWishlist = (product_id) => {
        $.post("http://localhost:8080/wishlist/add/",
               {productId: product_id}
               //this.getTodos
        );
     }
    render(){
        return (
            <div class="top">
                <Row xs={1} md={4} className="g-4">
                  {Array.from({ length: this.state.products.length }).map((_, idx) => (
                    <Col>
                      <Card>
                        <Card.Img className="card11" variant="top" src={this.state.products[idx].image} />
                        <Card.Body>
                          <Card.Title>{this.state.products[idx].name}</Card.Title>
                          <Card.Text>
                            {this.state.products[idx].description}
                          </Card.Text>
                          <button type="button" class="btn btn-primary" onClick={() => this.addToWishlist(this.state.products[idx].id)}>Add to wishlist</button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
            </div>

        );
    }
}