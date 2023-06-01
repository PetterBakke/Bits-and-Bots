import React, { useState, useEffect } from "react";
import { BASE_URI } from "../constants/api";
import { Container } from "react-bootstrap";
import logo from "../assets/logo-project-exam2.png";
// import { Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { BsFillCartFill } from "react-icons/bs";

function Products() {
  const [cart, setCart] = useState([]);
  const [checked, setChecked] = useState({ action: false, sports: false, sim: false });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(function () {
    async function fetchProducts() {
      try {
        const response = await fetch(BASE_URI);

        if (response.ok) {
          setLoading(true);
          const json = await response.json();
          console.log(json);
          setTimeout(() => { setProducts(json); setLoading(false) }, 500);
        } else {
          setError("an error occured");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        //
      }
    }
    fetchProducts();
  }, []);

  useEffect(filterProductsOnGenre, [checked, products]);
  function filterProductsOnGenre() {
    let filteredProds = products.filter((prod) => (
      (checked.action && prod.genre === "Action") ||
      (checked.sports && prod.genre === "Sports") ||
      (checked.sim && prod.genre === "Simulation")
    ));

    if (!checked.action && !checked.sports && !checked.sim) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(filteredProds);
    }
  }

  if (error) {
    return <div>Error: An error occured</div>;
  }

  const addToCart = (event, product) => {

    if (cart.filter(prod => product.id === prod.id).length === 0) {
      setCart([...cart, product]);
      localStorage.setItem("Favourites", JSON.stringify([...cart, product]));
      console.log("This item is in the cart");
    }
    else {
      let newCart = cart.filter(prod => product.id !== prod.id);
      setCart(newCart);
      localStorage.setItem("Favourites", JSON.stringify(newCart));

    }
  };

  const handleActionChange = () => {
    setChecked({ ...checked, action: !checked.action });
  };

  const handleSportChange = () => {
    setChecked({ ...checked, sports: !checked.sports });
  };

  const handleSimulationChange = () => {
    setChecked({ ...checked, sim: !checked.sim });
  };

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="" className="App-logo" />
        {/* <Link to={`/cart`} className="cart-link">
					Cart({cart.length})
				</Link> */}
      </div>
      {loading &&
        <div style={{ width: "100%", textAlign: "center" }}>
          <Spinner animation="border" className="spinner" />
        </div>
      }

      <div className="search">
        <label className="search-label">
          <input type="checkbox" checked={checked.action} onChange={handleActionChange} className="genre-search" />
          Action
        </label>

        <label className="search-label">
          <input type="checkbox" checked={checked.sports} onChange={handleSportChange} className="genre-search" />
          Sports
        </label>

        <label className="search-label">
          <input type="checkbox" checked={checked.sim} onChange={handleSimulationChange} className="genre-search" />
          Simulation
        </label>
      </div>
      <Container className="container">
        {filteredProducts.map(function (product) {

          
          return (
            <div className="products-container" key={product.id}>
              <BsFillCartFill className="fav-button" onClick={(event) => addToCart(event, product)}
                style={cart.filter(prod => product.id === prod.id).length === 0 ? { color: "green" } : { color: "red" }}
              />
              <div>
                <img src={product.image} alt={product.title} className="product-img" />
              </div>
              <div className="title-tag">
                <h5 key={product.title}>{product.title}</h5>
              </div>
            </div>
          )
        })}
      </Container>
    </>
  )
}
export default Products;