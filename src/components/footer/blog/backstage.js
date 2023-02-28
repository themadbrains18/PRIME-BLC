import React from "react";
import './articles.css'
import Arrow from './images/arrow.svg'
import Card from 'react-bootstrap/Card';
import ArticlesImg from './images/articles.png'
const Backstage = () => {

    return (
        <>
            <section className='blog-info'>
                <div className="container py-5">
                    <div className='title-container'>
                        <h1 >BLC Exchange BackStage</h1>  
                        <a href="">
                            <div className="view-all" data-cy="latestViewAll">View All
                                <img src={Arrow} alt="" className="arrow-icon " />
                            </div>
                        </a>  
                    </div>
                
                    <div>
                        <div className='topic-list-cards'>
                            <Card >
                                <Card.Img variant="top" src={ArticlesImg} />
                                <Card.Body>
                                    <Card.Title className="post-card-title">2023 CEX Report Highlights BLC Exchange's Resilience in Winter</Card.Title>
                                    <Card.Text className="post-card-description">
                                    BLC Exchange emerged stronger in product innovation, platform security, and trading liquidity despite the calamitous crypto events. Wonder how BLC Exchange does it? Read on to find out. 
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            <Card >
                            <Card.Img variant="top" src={ArticlesImg} />
                                <Card.Body>
                                    <Card.Title className="post-card-title">2023 CEX Report Highlights BLC Exchange's Resilience in Winter</Card.Title>
                                    <Card.Text className="post-card-description">
                                    BLC Exchange emerged stronger in product innovation, platform security, and trading liquidity despite the calamitous crypto events. Wonder how BLC Exchange does it? Read on to find out. 
                                    </Card.Text>
                                    
                                </Card.Body>
                            </Card>
                            <Card >
                            <Card.Img variant="top" src={ArticlesImg} />
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
export default Backstage;
