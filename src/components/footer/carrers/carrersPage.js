import React from "react";
import './carrers.css'
import ListenImage from './images/mission-listen.webp'
import CareImage from './images/mission-care.webp'
import ImproveImage from './images/mission-improve.webp'
import AwardsImage from './images/awards.webp'
import HrImg from './images/hr.webp'
import MarketImg from './images/marketing.webp'
import LegealImg from './images/legal.webp'
import FinanceImg from './images/finance.webp'
import EnggImg from './images/engineering.webp'
import DesignImg from './images/design.webp'
import BdeImg from './images/bde.webp'
import OperationsImg from './images/operations.webp'
import ServicesImg from './images/services.webp'
import ArrowImg from './images/arrow.svg'

const CarrersPage = () => {
  return (
    <>
      <section className='carrers'>

        <div className="hero_wrapper">
          <div className="hero_contaner">
            <div className='carrers-image d-flex  flex-column'>
              <div className="carrers-header">
                <h1 className="carrers-header-title">Make History With BLC Exchange</h1>


                <h2 className="carrers-header-sub-title" >Are you passionate and enthusiastic about all things crypto? <br />
                  If the answer is yes, we'd love to meet you!</h2>
              </div>
              <div className="cta_wrapper">
                <div className="carrers-header-button">
                  <a className="button">View Job Openings
                  </a>
                </div>
              </div>
            </div>
            <div className="hero_img">
              <img src={require('../../../assets/banner/image.png')} alt="error" />
            </div>
          </div>
        </div>

        <div className="our-mission">
          <div className="our-mission-content">
            <div className="mission-content-title "> Our Mission</div>
            <div className="our-mission-cards">
              <div className="listen-card">
                <div className='listen-card-img'>
                  <img src={ListenImage} alt=""></img>
                </div>
                <div className="listen-card-content">
                  <div className="listen-card-content-title">
                    We <span style={{ color: '#d8ad63' }}>Listen</span>

                  </div>
                  <div className="listen-card-content-decription">
                    We value all feedback and engage in active listening.
                  </div>

                </div>

              </div>
              <div className="listen-card">
                <div className='listen-card-img'>
                  <img src={CareImage} alt=""></img>
                </div>
                <div className="listen-card-content">
                  <div className="listen-card-content-title">
                    We <span style={{ color: '#d8ad63' }}>Care</span>

                  </div>
                  <div className="listen-card-content-decription">
                    We are committed to our customers, our team and the organization. No matter the task, we always aim to value-add.
                  </div>

                </div>

              </div>
              <div className="listen-card">
                <div className='listen-card-img'>
                  <img src={ImproveImage} alt=""></img>
                </div>
                <div className="listen-card-content">
                  <div className="listen-card-content-title">
                    We <span style={{ color: '#d8ad63' }}>Improve</span>

                  </div>
                  <div className="listen-card-content-decription">
                    We are always in the pursuit of excellence, dreaming big and constantly innovating.
                  </div>

                </div>

              </div>

            </div>
          </div>
        </div>

        <div className="our-benefits">
          <div className="benefits-content-title">
            Our Benefits
          </div>
          <div className="benefit-card">
            
            <div className="benefit-card-content">
              <div className="benefit-card-content-title">
                Personal and Professional Development
              </div>
              <div className="benefit-card-content-description">
                Level up with development courses
              </div>
            </div>
         
            <div className="benefit-card-content">
              <div className="benefit-card-content-title">
                Flexibility
              </div>
              <div className="benefit-card-content-description">
                Flexible work schedules with work from home options
              </div>
            </div>
           
            <div className="benefit-card-content">
              <div className="benefit-card-content-title">
                Global Opportunities
              </div>
              <div className="benefit-card-content-description">
                Opportunities for international transfers
              </div>
            </div>
            
            <div className="benefit-card-content">
              <div className="benefit-card-content-title">
                Engagement and Diversity
              </div>
              <div className="benefit-card-content-description">
                Collaborate and engage with international colleagues from diverse backgrounds
              </div>
            </div>
            
            <div className="benefit-card-content">
              <div className="benefit-card-content-title">
                Dynamic Workplace Environment
              </div>
              <div className="benefit-card-content-description">
                Open-concept offices with ample space for work and play
              </div>
            </div>
            
            <div className="benefit-card-content">
              <div className="benefit-card-content-title">
                Recognition
              </div>
              <div className="benefit-card-content-description">
                Awards that recognize the contributions of outstanding individuals
              </div>
            </div>


          </div>
        </div>

        <div className="our-rewards">
          <div className="our-rewards-content">
            <div className="rewards-content-title "> Our Awards <img src={AwardsImage}></img></div>
            <div className="our-rewards-cards">
              <div className="rewards-card-content">
                <div className="rewards-card-content-title">
                  Real-Time Award
                </div>
                <div className="rewards-card-content-description">
                  Recognizing employees who actively promote our corporate culture and values, making extraordinary contributions to their internal or external teams.
                </div>
              </div>

              <div className="rewards-card-content">
                <div className="rewards-card-content-title">
                  Long Service Award

                </div>
                <div className="rewards-card-content-description">
                  Recognizing employees for their many years of dedication, commitment and service.
                </div>
              </div>

              <div className="rewards-card-content">
                <div className="rewards-card-content-title">
                  Monthly Gratitude Fund
                </div>
                <div className="rewards-card-content-description">
                  A token of appreciation for individuals and teams on their exceptional effort to go above and beyond.
                </div>
              </div>
            </div>
          </div>
        </div>


        <div className="our-department">
          <div className=" container our-department-content">
            <div className="department-content-title "> Our Department</div>
            <div className="our-department-cards">
              <div className="department-card">
                <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={HrImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  HR and Admin

                  </div>
                  <div className="department-card-content-decription">
                  We put in the hard work and heart work to advocate the well-being of every single employee, ensuring the harmony and smooth functioning of our entire organization.
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={MarketImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Marketing

                  </div>
                  <div className="department-card-content-decription">
                  We are ambassadors and storytellers who amplify the BLC Exchange brand. With creative and innovative strategies, we engage our audiences with meaningful initiatives. 
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={LegealImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Legal and Compliance 

                  </div>
                  <div className="department-card-content-decription">
                  We are the legal guardians of the organization with a keen understanding of industry regulations. By developing preventive measures, policies and compliance controls, we mitigate and prevent future risks.
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={ServicesImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Client Services 
                  </div>
                  <div className="department-card-content-decription">
                  We are the frontliners who connect with our valued customers. With our in-depth knowledge and dedication, we provide best-in-class service to traders all over the world.
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={BdeImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Business Development 

                  </div>
                  <div className="department-card-content-decription">
                  We are the drivers of business expansion with an eye for opportunity. We identify and grow new markets while fostering strong relationships with Key Opinion Leaders to expand our client base.
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={DesignImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Product and Design

                  </div>
                  <div className="department-card-content-decription">
                  We are the creative brains who design and build innovative products to deliver a next level trading experience.
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={FinanceImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Finance 

                  </div>
                  <div className="department-card-content-decription">
                  We are the financial gatekeepers who ensure timely and adequate flows of funds for a smoothly-running organization.
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={OperationsImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Strategy and Operations

                  </div>
                  <div className="department-card-content-decription">
                  We are the strategists that optimize organization-wide success. With an integrated approach, we foster cross-team collaboration to maximize efficiency and ensure successful end-to-end activations.
                  </div>

                </div>

              </div>
              <div className="department-card">
              <div className='department-card-img'>
                  <div className="dep-image">
                  <img src={EnggImg} alt=''></img>
                  </div>
                 <div className="department_arrow-img d-flex" >
                  <span className="department_arrow_title">View Jobs</span>
                 <img src={ArrowImg} alt=''></img>
                 </div>
                 
                </div>
                <div className="department-card-content">
                  <div className="department-card-content-title">
                  Engineering

                  </div>
                  <div className="department-card-content-decription">
                  We are the catalysts of innovation, using advanced technology to develop solutions and create a better tomorrow for all crypto users.
                  </div>

                </div>

              </div>


            </div>
          </div>
        </div>

        <div className="joinus">
          <div className="joinus-content">
            <div className="joinus-content-title">
            Join Us Today for a Fulfilling and Exciting Career!
            </div>
            <div className="joinus-content-button">
            <a className="button">View Job Openings
            </a>
          </div>

          </div>
        </div>
      </section>


    </>

  )
}
export default CarrersPage;
