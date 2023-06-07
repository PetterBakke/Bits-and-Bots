import React from 'react';
import Carousel from 'react-bootstrap/Carousel';
import { Link } from "react-router-dom";
import logo from "../assets/logo-project-exam2.png";

function Home() {
  return (
    <>
    <img src={logo} alt="" className='App-logo'/>
        <Carousel className='img-slider'>
          <Carousel.Item>
            <img className="d-flex justify-content-center" width={300} height={450}
              src={logo}
              alt="Neon city game cover"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-flex justify-content-center" width={300} height={450}
              src={logo}
              alt="The golf game cover"
            />
          </Carousel.Item>
          <Carousel.Item>
            <img className="d-flex justify-content-center" width={300} height={450}
              src={logo}
              alt="Space adventure game cover"
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