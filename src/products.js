import React, { Component} from 'react';
import Card from 'react-bootstrap/Card'
import Row from 'react-bootstrap/Row'
import Col from 'react-bootstrap/Col'
import Button from 'react-bootstrap/Button'
import $ from 'jquery';
import Cookies from 'universal-cookie';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBBtn, MDBCardFooter, MDBCardHeader } from 'mdb-react-ui-kit';

const cookies = new Cookies();
export default class Products extends Component {

    constructor(props) {
        super(props);
        this.state = {
          products:[],
          items:[],
          topics:[]
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

        this.Advertise()
      }

       fetchApi() {
             this.Products().then((res) => {
                         const allProducts = JSON.parse(JSON.stringify(res));
                         //console.log(allProducts)
                         for(let i=0; i<allProducts.data.length;i++){
                             var jsonString = JSON.parse(allProducts.data[i].message)
                             jsonString = JSON.stringify(jsonString)
                             jsonString = JSON.parse(JSON.parse(jsonString))
                             allProducts.data[i].message = jsonString
                         }
                         var map1 = new Map();
                         var temp = this.state.products;
                         allProducts.data.map((curr)=>{
                             if(map1.get(curr.id_topic)==null)
                                 map1.set(curr.id_topic, []);
                             map1.set(curr.id_top, map1.get(curr.id_topic).push(curr.message))
                         })
                         map1.delete(undefined)
                         console.log("-----------MAP1---------------")
                         console.log(map1)

                         for(var ele of temp.keys()){
                            if(ele!=undefined && map1.get(ele)==undefined) map1.set(ele, temp.get(ele))
                         }
                         map1.delete(undefined)
                         console.log("-----------TEMP---------------")
                         console.log(map1)
                         this.setState({products: map1});
                       });
       }

      componentDidMount() {
        this.fetchApi()
        var timer = setInterval(()=>{this.fetchApi()}, 8000, (err) => {
            console.log(err)
        });
         var timerAdvertise = setInterval(()=>{this.Advertise()}, 15000, (err) => {
            console.log(err)
        });
       }

     Products(){
        return $.post('http://localhost:8080/broker/notify',{id_user: cookies.get('userId')})
        .then(function(data) {
          console.log(data)
          return data;
        });
      }

      Subscribe(subTopic){
        return $.post('http://localhost:8080/broker/subscribe', {id_user: cookies.get('userId'), id_topic: subTopic})
        .then(function(data) {
          console.log(data)
          return data;
        });
      }
      Unsubscribe(unSubTopic){
        return $.post('http://localhost:8080/broker/unsubscribe', {id_user: cookies.get('userId'), id_topic: unSubTopic})
        .then(function(data) {
          console.log(data)
          return data;
        });
      }

      Advertise(){
          return $.getJSON('http://localhost:8080/broker/advertise')
          .then((res) => {
            const allTopics = JSON.parse(JSON.stringify(res));
            var finalTopics = [];
            allTopics.data.map((curr) => {
                finalTopics.push(curr.topic_name)
            })
            console.log(finalTopics);
            this.setState({topics: finalTopics});
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
                <h3>Topics</h3>
                <Row xs={1} md={4} className="g-4">
                    {Array.from(this.state.topics).map((currTopic,idex) => (
                        <Col>
                            <h4>{currTopic.toUpperCase()}</h4>
                            <button type="button" class="btn btn-primary" onClick={() => this.Subscribe(currTopic)} >Subscribe</button>
                            <button type="button" class="btn btn-primary" style={{ marginLeft: '5%'}}onClick={() => this.Unsubscribe(currTopic)} >Unsubscribe</button>
                        </Col>
                     ))}
                </Row>
                <hr />
                <h3>Results</h3>
                <Row xs={1} md={3} className="g-3">
                 {Array.from(this.state.products.keys()).map((key,idex) => (
                    <Col>
                    <h4>{key}</h4>
                    <Row xs={1} md={1} className="g-1">
                      {Array.from(this.state.products.get(key)).map((_, idx) => (
                        <Col>
                            <MDBCard style={{ maxWidth: '22rem' }} className='h-100'>
                                   <MDBCardHeader className='text-dark'>{_.name}</MDBCardHeader>
                                  <MDBCardBody>
                                    <MDBCardText>
                                        <small className='text-muted'> {_.description}</small>
                                    </MDBCardText>
                                  </MDBCardBody>
                                  <MDBCardFooter>
                                    <MDBBtn>${_.price}</MDBBtn>
                                </MDBCardFooter>
                                </MDBCard>
                        </Col>
                      ))}
                    </Row>
                    </Col>
               ))}
               </Row>
            </div>

        );
    }
}