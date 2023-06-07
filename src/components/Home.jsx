import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import logo from "../assets/logo-project-exam2.png";
import pic1 from "../assets/bilde-til-slider1.jpg";
import dupe from "../assets/bilde-til-slider2.jpg";
import hero from "../assets/bilde-til-slider3.jpg";

function Home() {
  return (
    <>
      <img src={logo} alt="" className='App-logo' />
      <Carousel className='img-slider'>
        <Carousel.Item>
          <img className="d-flex justify-content-center" width={300} height={450}
            src={pic1}
            alt="Ping Pong game cover"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-flex justify-content-center" width={300} height={450}
            src={dupe}
            alt="Super duper game cover"
          />
        </Carousel.Item>
        <Carousel.Item>
          <img className="d-flex justify-content-center" width={300} height={450}
            src={hero}
            alt="Black game cover"
          />
        </Carousel.Item>
      </Carousel>
      <div className='browse-button'>
        <Link to="/login" className='browse-link'>Sign in |</Link>
        <Link to="/register" className='browse-link'>Sign up</Link>
      </div>
    </>
  );
}

export default Home;