import React, { Component }   from 'react';

class About extends Component {
  constructor(props){
    super(props);
    this.state = {
      portfolioData: {},
      profile: {}
    }
  }
  render() {
    return (
      <section>

			<section className="home-about-area section-gap">
				<div className="container">
					<div className="row align-items-center justify-content-between">
						<div className="col-lg-6 col-md-6 home-about-left">
							<img className="img-fluid" src="img/about-img.png" alt="placeholder" />
						</div>
						<div className="col-lg-5 col-md-6 home-about-right">
							<h6>About Us</h6>
							<h1 className="text-uppercase">Personal Details</h1>
							<p>
								Here, I focus on a range of items and features that we use in life without giving them a second thought. such as Coca Cola. Dolor sit amet, consectetur adipisicing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco.
							</p>
						</div>
						<div className="col-lg-12 pt-60">
							<p>
								It won’t be a bigger problem to find one video game lover in your neighbor. Since the introduction of Virtual Game, it has been achieving great heights so far as its popularity and technological advancement are concerned. The history of video game is as interesting as a fairy tale. 
							</p>
							<p>
								The quality of today’s video game was not at all there when video game first conceptualized and played ever. During the formulative years, video games were created by using various interactive electronic devices with various display formats. The first ever video game was designed in 1947 by Thomas T. Goldsmith Jr. 								
							</p>
							<h4 className="pt-30">Tools Expertness</h4>	
						</div>
					</div>
					<div className="row skillbar-wraps">					
						<div className="col-lg-6 skill-left">
							<div className="single-skill">
								<p>
									After Effects 85%
								</p>
								<div className="skill" data-width="85"></div>
							</div>
							<div className="single-skill">
								<p>
									Photoshop 90%
								</p>
								<div className="skill" data-width="90"></div>
							</div>
							<div className="single-skill">
								<p>
									Illustrator 70%
								</p>
								<div className="skill" data-width="70"></div>
							</div>																				
						</div>
						<div className="col-lg-6 skill-right">
							<div className="single-skill">
								<p>
									Sublime 95%
								</p>
								<div className="skill" data-width="95"></div>
							</div>								
							<div className="single-skill">
								<p>
									Sketch 85%
								</p>
								<div className="skill" data-width="85"></div>
							</div>
							
						</div>
					</div>
				</div>
   </section>
  </section>
    );
  }
}

export default About;
