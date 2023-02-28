import React from "react";
import './articles.css'
import Arrow from './images/arrow.svg'
import Card from 'react-bootstrap/Card';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';
import ArticlesImg from './images/articles.png'
const Articles = () => {

    return (
        <>
            <section className='blog-info'>
                <div className="container">
                    <div className='title-container'>
                        <h1 className="pl-5" >Latest Articles</h1>
                        <a href="">
                            <div className="view-all" data-cy="latestViewAll">View All
                                <img src={Arrow} alt="" className="arrow-icon " />
                            </div>
                        </a>
                    </div>
                    <div className="topic-list-ctn">
                        <Tabs>
                            <TabList className="topic-list">
                                <Tab >All</Tab>
                                <Tab>Spot</Tab>
                                <Tab>Derivatives</Tab>
                                <Tab>Options</Tab>
                                <Tab>Trading Bots</Tab>
                                <Tab>NFTs</Tab>
                                <Tab>DeFi</Tab>
                                <Tab>Web3</Tab>
                                <Tab>L1/L2</Tab>
                                <Tab>Deep Dive</Tab>
                                <Tab>Daily Bits</Tab>

                            </TabList>

                            <TabPanel>
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
    </TabPanel>
    <TabPanel>
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
    </TabPanel>



                        </Tabs>


                    </div>

                    



                </div>
            </section>

        </>
    );
};
export default Articles;
