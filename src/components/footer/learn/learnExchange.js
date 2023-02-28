import React from 'react'
import './learn.css'
import LearnImg from './images/learnbanner.webp'
import DiscoverImg from './images/discover.webp'
import BlockChainImg from './images/blockchain.webp'
import DefiImg from './images/defi.webp'
import PostImg from './images/postImg.png'
export default function LearnExchange() {
    return (
        <>
            <section className='learn-exchange'>
                <div className="container py-5">
                    <div className='learn-banner d-flex  justify-content-between '>

                        <div className='learn-banner-content d-flex flex-column gap-3 justify-content-center mt-2 '>
                            <h2 className='content-subtitle fs-5'>Learn everything about</h2>
                            <h1 className='fs-1'>Cryptocurrency & Trading</h1>
                            <div>
                                <p>We give you the power to level up your crypto knowledge & trade like a pro. From beginner to advanced crypto trading guides and courses, we've got you covered daily and when it matters the most.</p>
                            </div>
                            <div className='content-button'>
                                <button type="button" className="btn btn-warning border-radius-sm btn-lg">Get Started</button>
                            </div>
                        </div>
                        <div className='learn-banner-img'>
                            <img src={LearnImg}></img>
                        </div>
                    </div>
                    <div className='categories mt-5'>
                        <h2>Browse popular categories</h2>
                        <div className='row row-cols-1 row-cols-sm-2 row-cols-md-4 p-2'>
                            <div className='categoies-content-box   '>
                                <div className='category-content '>
                                    <img src={DiscoverImg}></img>
                                    <h5 className=''> DISCOVER ALTCOINS</h5>
                                </div>
                            </div>
                            <div className='categoies-content-box '>
                                <div className='category-content'>
                                    <img src={BlockChainImg}></img>
                                    <h5 className=''> UNDERSTAND BLOCKCHAIN </h5>
                                </div>
                            </div>
                            <div className='categoies-content-box '>
                                <div className='category-content'>
                                    <img src={DefiImg}></img>
                                    <h5 className=''> LEARN ABOUT DEFI </h5>
                                </div>
                            </div>
                            <div className='categoies-content-box '>
                                <div className='category-content'>
                                    <img src={DiscoverImg}></img>
                                    <h5 className=''>START TRADING </h5>
                                </div>
                            </div>

                        </div>

                    </div>

                    <div className='highlight-section mt-5'>
                        <h1 className='mb-4'> Highlight & Updates</h1>
                        <h6 className='mb-5'>Latest happenings in the crypto space & updated cryptocurrency trading courses</h6>
                        <div className='highlight-post'>
                            <div className='highlight-post-box  p-2'>
                                <a>
                                    <div className=' pb-3 highlight-content-post'>
                                        <div className="card" >
                                            <img src={PostImg} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h6 className="tag brand ">Crypto</h6>
                                                <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                <div className=" d-flex align-items-center post-card-info">
                                                    <div className="post-card-level beginner">
                                                        Beginner
                                                    </div>
                                                    <div className="dot">•</div>
                                                    <div className="fw-light">6 min read</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a>
                                    <div className=' pb-3 highlight-content-post'>
                                        <div className="card" >
                                            <img src={PostImg} className="card-img-top " alt="..." />
                                            <div className="card-body">
                                                <h6 className="tag brand ">Crypto</h6>
                                                <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                <div className=" d-flex align-items-center post-card-info">
                                                    <div className="post-card-level beginner">
                                                        Beginner
                                                    </div>
                                                    <div className="dot">•</div>
                                                    <div className="fw-light">6 min read</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a>
                                    <div className=' pb-3 highlight-content-post'>
                                        <div className="card" >
                                            <img src={PostImg} className="card-img-top " alt="..." />
                                            <div className="card-body">
                                                <h6 className="tag brand ">Crypto</h6>
                                                <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                <div className=" d-flex align-items-center post-card-info">
                                                    <div className="post-card-level beginner">
                                                        Beginner
                                                    </div>
                                                    <div className="dot">•</div>
                                                    <div className="fw-light">6 min read</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a>
                                    <div className='pb-3 highlight-content-post'>
                                        <div className="card" >
                                            <img src={PostImg} className="card-img-top " alt="..." />
                                            <div className="card-body">
                                                <h6 className="tag brand ">Crypto</h6>
                                                <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                <div className=" d-flex align-items-center post-card-info">
                                                    <div className="post-card-level beginner">
                                                        Beginner
                                                    </div>
                                                    <div className="dot">•</div>
                                                    <div className="fw-light">6 min read</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a>
                                    <div className='pb-3 highlight-content-post'>
                                        <div className="card" >
                                            <img src={PostImg} className="card-img-top " alt="..." />
                                            <div className="card-body">
                                                <h6 className="tag brand ">Crypto</h6>
                                                <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                <div className=" d-flex align-items-center post-card-info">
                                                    <div className="post-card-level beginner">
                                                        Beginner
                                                    </div>
                                                    <div className="dot">•</div>
                                                    <div className="fw-light">6 min read</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                                <a>
                                    <div className='pb-3 highlight-content-post'>
                                        <div className="card" >
                                            <img src={PostImg} className="card-img-top" alt="..." />
                                            <div className="card-body">
                                                <h6 className="tag brand ">Crypto</h6>
                                                <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                <div className=" d-flex align-items-center post-card-info">
                                                    <div className="post-card-level beginner">
                                                        Beginner
                                                    </div>
                                                    <div className="dot">•</div>
                                                    <div className="fw-light">6 min read</div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>
                              
                            </div>
                        </div>
                    </div>

                    <div className='post-section mt-5'>
                        <h1 className='mb-4'> Latest Posts</h1>
                        <div className='latest-post'>
                            <div className='row row-cols-1 row-cols-sm-1 row-cols-md-2 p-2'>
                                <a>
                                    <div className=' pb-3 content-post'>
                                        <div className="card mb-3" >
                                            <div className="post-card-content row g-0 align-items-center">
                                                <div className="col-md-4">
                                                    <img src={PostImg} className="card-img-top" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h6 className="tag brand ">Crypto</h6>
                                                        <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                        <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                        <div className=" d-flex align-items-center post-card-info">
                                                            <div className="post-card-level beginner">
                                                                Beginner
                                                            </div>
                                                            <div className="dot">•</div>
                                                            <div className="fw-light">6 min read</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a>
                                    <div className=' pb-3 content-post'>
                                        <div className="card mb-3" >
                                            <div className="post-card-content row g-0 align-items-center">
                                                <div className="col-md-4">
                                                    <img src={PostImg} className="card-img-top " alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h6 className="tag brand ">Crypto</h6>
                                                        <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                        <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                        <div className=" d-flex align-items-center post-card-info">
                                                            <div className="post-card-level beginner">
                                                                Beginner
                                                            </div>
                                                            <div className="dot">•</div>
                                                            <div className="fw-light">6 min read</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a>
                                    <div className=' pb-3 content-post'>
                                        <div className="card mb-3" >
                                            <div className="post-card-content row g-0 align-items-center">
                                                <div className="col-md-4">
                                                    <img src={PostImg} className="card-img-top " alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h6 className="tag brand ">Crypto</h6>
                                                        <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                        <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                        <div className=" d-flex align-items-center post-card-info">
                                                            <div className="post-card-level beginner">
                                                                Beginner
                                                            </div>
                                                            <div className="dot">•</div>
                                                            <div className="fw-light">6 min read</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a>
                                    <div className='pb-3 content-post'>
                                        <div className="card mb-3" >
                                            <div className="post-card-content row g-0 align-items-center">
                                                <div className="col-md-4">
                                                    <img src={PostImg} className="card-img-top " alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h6 className="tag brand ">Crypto</h6>
                                                        <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                        <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                        <div className=" d-flex align-items-center post-card-info">
                                                            <div className="post-card-level beginner">
                                                                Beginner
                                                            </div>
                                                            <div className="dot">•</div>
                                                            <div className="fw-light">6 min read</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a>
                                    <div className=' pb-3 content-post'>
                                        <div className="card mb-3" >
                                            <div className="post-card-content row g-0 align-items-center">
                                                <div className="col-md-4">
                                                    <img src={PostImg} className="card-img-top " alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h6 className="tag brand ">Crypto</h6>
                                                        <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                        <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                        <div className=" d-flex align-items-center post-card-info">
                                                            <div className="post-card-level beginner">
                                                                Beginner
                                                            </div>
                                                            <div className="dot">•</div>
                                                            <div className="fw-light">6 min read</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                                <a>
                                    <div className='pb-3 content-post'>
                                        <div className="card mb-3" >
                                            <div className="post-card-content row g-0 align-items-center">
                                                <div className="col-md-4">
                                                    <img src={PostImg} className="card-img-top" alt="..." />
                                                </div>
                                                <div className="col-md-8">
                                                    <div className="card-body">
                                                        <h6 className="tag brand ">Crypto</h6>
                                                        <h5 className="card-title">Crypto User Protection Guide: Best Practices to Safeguard Your Assets</h5>
                                                        <p className="card-text">Learn to protect your cryptocurrency by choosing a reliable exchange and the right wallet, plus many more tips to secure your crypto.</p>
                                                        <div className=" d-flex align-items-center post-card-info">
                                                            <div className="post-card-level beginner">
                                                                Beginner
                                                            </div>
                                                            <div className="dot">•</div>
                                                            <div className="fw-light">6 min read</div>
                                                        </div>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </a>

                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}
