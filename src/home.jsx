import React from 'react';
import { MDBCarousel, MDBCarouselCaption, MDBCarouselInner, MDBCarouselItem, MDBView, MDBMask, MDBContainer } from
"mdbreact";
import {Button} from 'react-bootstrap';
import Login from './login';
import { NavLink, HashRouter, Route } from 'react-router-dom';

const Home = () => {
        return (
          <div>
            <MDBContainer>
              <MDBCarousel
              activeItem={1}
              length={3}
              showControls={true}
              showIndicators={true}
              className="z-depth-1"
            >
              <MDBCarouselInner>
                <HashRouter>
                <MDBCarouselItem itemId="1">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(68).jpg"
                      alt="First slide"
                    />
                  <MDBMask overlay="black-light" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive"><NavLink to='/login'><Button>로그인 하러가기</Button></NavLink></h3>
                    <p>First text</p>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="2">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(6).jpg"
                      alt="Second slide"
                    />
                  <MDBMask overlay="black-strong" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">Strong mask</h3>
                    <p>Second text</p>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
                <MDBCarouselItem itemId="3">
                  <MDBView>
                    <img
                      className="d-block w-100"
                      src="https://mdbootstrap.com/img/Photos/Slides/img%20(9).jpg"
                      alt="Third slide"
                    />
                  <MDBMask overlay="black-slight" />
                  </MDBView>
                  <MDBCarouselCaption>
                    <h3 className="h3-responsive">Slight Mast</h3>
                    <p>Third text</p>
                  </MDBCarouselCaption>
                </MDBCarouselItem>
                    <div className="content">
                      <Route path='/login' component={Login} />
                    </div>
                </HashRouter>
              </MDBCarouselInner>
            </MDBCarousel>
            </MDBContainer>
          </div>
        );
      }

export default Home;