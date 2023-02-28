import React from "react";
import './articles.css'
import Card from 'react-bootstrap/Card';
import ArticlesImg from './images/articles.png'
const Product = () => {

    return (
        <>
            <section className='blog-info'>
                <div className="container py-5">
                    <div className='title-container'>
                        <h1 >Product 101</h1>
                        
                    </div>
                   
                    <div>
                        <div className='topic-list-cards'>
                            <Card className="main_card" >
                                <Card.Img variant="top" src={ArticlesImg} />
                                <Card.Body>
                                    <Card.Title className="post-card-title">2023 CEX Report Highlights BLC Exchange's Resilience in Winter</Card.Title>
                                    <Card.Text className="post-card-description">
                                    BLC Exchange emerged stronger in product innovation, platform security, and trading liquidity despite the calamitous crypto events. Wonder how BLC Exchange does it? Read on to find out. 
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            <Card >
                             
                                <Card.Body>
                                    <Card.Title className="post-card-title">2023 CEX Report Highlights BLC Exchange's Resilience in Winter</Card.Title>
                                    <Card.Text className="post-card-description">
                                    BLC Exchange emerged stronger in product innovation, platform security, and trading liquidity despite the calamitous crypto events. Wonder how BLC Exchange does it? Read on to find out. 
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            <Card >
                          
                                <Card.Body>
                                    <Card.Title className="post-card-title">2023 CEX Report Highlights BLC Exchange's Resilience in Winter</Card.Title>
                                    <Card.Text className="post-card-description">
                                    BLC Exchange emerged stronger in product innovation, platform security, and trading liquidity despite the calamitous crypto events. Wonder how BLC Exchange does it? Read on to find out. 
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            <Card >
                                
                                <Card.Body>
                                    <Card.Title className="post-card-title">2023 CEX Report Highlights BLC Exchange's Resilience in Winter</Card.Title>
                                    <Card.Text className="post-card-description">
                                    BLC Exchange emerged stronger in product innovation, platform security, and trading liquidity despite the calamitous crypto events. Wonder how BLC Exchange does it? Read on to find out. 
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                           
                        </div>
                    </div>



                </div>
            </section>

        </>
    );
};
export default Product;
