import React, { useEffect, useState } from "react";
import {Button, Container, Row, Col, Card} from "react-bootstrap"
import "../../assets/styles/homepage.css";
import Wallet from '../../assets/images/Wallet-home.png';
import Sale from '../../assets/images/Sale.png';
import NFTs from '../../assets/images/NFTs.png';
import Collection from '../../assets/images/Collection-home.png';
function Home() {
  return(
    <>
      <div className="homepage">
        <div className="banner">
          <div className="inner-width">
            <Container fluid>
              <Row>
                <Col md={6}>
                  <div className="left-text">
                    <h1 className="heading">Buy, Trade and Sell your <br></br>NFTs</h1>
                    <p className="text">One stop solution for all types of NFTs</p>
                    <Button variant="custom">Explore</Button>
                    <Button variant="custom">Create</Button>
                  </div>  
                </Col>
                <Col md={6}>Slider</Col>
              </Row>
            </Container>
          </div>
        </div>
        
        <div className="create-sell-nft">
          <h2 className="heading">Create and sell your NFTs</h2>
          <div className="d-flex justify-content-center flex-wrap">
            <Card>
              <Card.Img variant="top" src={Wallet} />
              <Card.Body>
                <Card.Title>Create Wallet</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src={Sale} />
              <Card.Body>
                <Card.Title>Create Collection</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src={NFTs} />
              <Card.Body>
                <Card.Title>Add NFTs</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                </Card.Text>
              </Card.Body>
            </Card>
            <Card>
              <Card.Img variant="top" src={Collection} />
              <Card.Body>
                <Card.Title>List them for sale</Card.Title>
                <Card.Text>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed
                </Card.Text>
              </Card.Body>
            </Card>
          </div>
        </div>

        <div className="why-marketplace">
          <h2 className="heading">Why this Marketplace</h2>
          
        </div>

      </div>
    </>
  )
}

export default Home;