import React from 'react'
import aboutus from '../../Images/Aboutus.jpg'
import mission from '../../Images/Mission.jpg'
import story from '../../Images/ourstory.png'
import whychooseus from '../../Images/whychooseus.png'
import './AboutUs.css'

function AboutUs() {
  return (
    <div>
      <div className='container'>
        <div className='row mt-5'>
          <div className='col-lg-6 col-xs-12'>
            <h1 className='aboutus-main-header d-lg-none d-xs-block'> ABOUT US</h1>
            <img src={aboutus} style={{width:"100%"}}/>
          </div>

          <div className='col-lg-6 col-xs-12'>
            <h1 className='aboutus-main-header d-none d-lg-block'> ABOUT US</h1>

            <p className='aboutus-description'>
              Welcome to Rivv Rivv At Rivv Rivv, we're not just a clothing
              store; we're a community where fashion meets passion.<br></br><br></br>
              Our journey began with a simple idea: to create a space where everyone could find stylish,
              high-quality clothing that speaks to their unique personality.<br></br><br></br> Today,
              we're proud to be a go-to destination for fashion lovers who crave
              innovation, quality, and trend-setting designs.
            </p>
            
          </div>

        </div>


        <div className='row mt-5'>

          <div className=' mt-5 col-lg-6 col-xs-12  d-lg-none d-xs-block'>
            <h1 className='aboutus-main-header d-lg-none d-xs-block'> OUR MISSION</h1>
            <img src={mission} style={{width:"100%"}}/>
          </div>
          

          <div className=' mt-3 col-lg-6 col-xs-12'>

            <h1 className='aboutus-main-header  d-none d-lg-block'> OUR MISSION</h1>

            <p className='aboutus-description'>
              
              <p className='mission-sub-header'>Quality:</p> We never compromise on quality. Our
              products are made from the finest materials, ensuring durability and
              comfort. 
              
              <p className='mission-sub-header'>Innovation:</p> Fashion is constantly evolving, and
              so are we. We stay ahead of the curve by offering the latest trends and
              cutting-edge designs.
              
              <p className='mission-sub-header'>Sustainability:</p>   
              We're committed to reducing our environmental impact. We
              use sustainable practices in our production process
                    </p>
            
          </div>

          <div className=' mt-5 col-lg-6 col-xs-12 d-none d-lg-block'>
            <img src={mission} style={{width:"100%"}}/>
          </div>

        </div>


         <div className='row mt-5'>

           <div className='col-lg-6 col-xs-12 mt-5'>
             <h1 className='aboutus-main-header  d-lg-none d-xs-block'> OUR STORY</h1>
            <img src={story} style={{width:"100%"}}/>
          </div>
          

          <div className='col-lg-6 col-xs-12 mt-3'>

            <h1 className='aboutus-main-header  d-none d-lg-block'> OUR STORY</h1>
            <p className='aboutus-description'>
              
              Rivv Rivv was Founded in 2023, It all started
      as a small boutique with a big dream. <br></br><br></br> Our founder, Rivv , had a
      vision to create a fashion brand that was both accessible and
      aspirational. <br></br><br></br>What began as a single storefront has now grown into a
      thriving online and offline presence, with customers from all over the
      world. 
                    </p>
            
          </div>

         

        </div>



         <div className='row mt-5'>

           <div className='col-lg-6 col-xs-12 mt-5 d-lg-none d-xs-block'>
             <h1 className='aboutus-main-header d-lg-none d-xs-block'> Why Choose Rivv Rivv? </h1>
            <img src={whychooseus} style={{width:"100%"}}/>
          </div>
          

          <div className='col-lg-6 col-xs-12 mt-3'>

            <h1 className='aboutus-main-header d-none d-lg-block'> Why Choose Rivv Rivv? </h1>

           <p className='aboutus-description'>
              
              <p className='mission-sub-header'>Curated Collections: </p> "Rivv Rivv" offers a carefully curated selection of clothing, ensuring you find the latest trends and timeless pieces in one place.
              
              <p className='mission-sub-header'>User-Friendly Experience:</p> With an User Friendly interface, "Rivv Rivv" makes it easy to browse, select, and purchase items with just a few clicks.
              <p className='mission-sub-header'> Personalization:</p>   
             The platform tailors product recommendations to your style preferences, making shopping more personalized and enjoyable.


                    </p>

          </div>

          <div className='col-lg-6 col-xs-12 mt-5 d-none d-lg-block'>
            <img src={whychooseus} style={{width:"100%"}}/>
          </div>

        </div>

        <div className='row mt-5  text-center'>
          <div className='col-12 mb-5'>
            <p className='aboutus-slogan-text'>"Rivv Rivv" is more than just a store - it's where fashion finds you.</p>
            <p className='aboutus-thankyou-text'> Thank you for choosing Rivv Rivv</p>

          </div>

        </div>

      </div>

    
      
    </div>
  );
}

export default AboutUs