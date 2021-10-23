import React, { Component} from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import $ from 'jquery';
import Cookies from 'universal-cookie';
const cookies = new Cookies();
export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products:[],
          items:[]
        };
        const { router, params, location, routes } = this.props
        let userId = 1;
        switch(location.state.user){
            case "nikhil": userId = 1;
            break;
            case "kunal": userId = 2;
            break;
            case "amit": userId = 3;
            break;
        }

        cookies.set('userId', userId, { path: '/' });
        console.log(cookies.get('userId'))
      }


      componentDidMount() {
          this.Products().then((res) => {
            const allProducts = JSON.parse(JSON.stringify(res));
            this.setState({products: allProducts.data});
            console.log(this.state.products);
          });
        }

     Products(){
        return $.post('http://localhost:8080/broker/notify',{id_user: cookies.get('userId')})
        .then(function(data) {
          console.log(data)
          return data;
        });
      }

      Subscribe(){
        return $.post('http://localhost:8080/broker/subscribe', {id_user: 2, id_topic: "amazon"})
        .then(function(data) {
          console.log(data)
          return data;
        });
      }
      Unsubscribe(){
        return $.post('http://localhost:8080/broker/unsubscribe', {id_user: 2, id_topic: "amazon"})
        .then(function(data) {
          console.log(data)
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
        /*return (
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
                          <button type="button" class="btn btn-primary">Subscribe</button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
            </div>
        );*/
        return (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(3, 1fr)", gridGap: 50 }}>
      <div class="top">
        AMAZON
                <Row xs={1} md={2} className="g-2">
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
                          <button type="button" class="btn btn-primary" onClick={() => this.Subscribe("amazon")} >Subscribe</button>
                          <button type="button" class="btn btn-primary" onClick={() => this.Unsubscribe("amazon")} >Unsubscribe</button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
            </div>
    <div class="top">
                <Row xs={1} md={2} className="g-2">
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
                          <button type="button" class="btn btn-primary" onClick={() => this.Subscribe("ebay")} >Subscribe</button>
                          <button type="button" class="btn btn-primary" onClick={() => this.Unsubscribe("ebay")} >Unsubscribe</button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
            </div>
    <div class="top">
                <Row xs={1} md={2} className="g-2">
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
                          <button type="button" class="btn btn-primary" onClick={() => this.Subscribe("bestbuy")} >Subscribe</button>
                          <button type="button" class="btn btn-primary" onClick={() => this.Unsubscribe("bestbuy")} >Unsubscribe</button>
                        </Card.Body>
                      </Card>
                    </Col>
                  ))}
                </Row>
            </div>
  </div>
        );
    }
}