import React, { useState, useEffect } from "react";
import { BASE_URI } from "../constants/api";
import { Container } from "react-bootstrap";
import logOut from "./LogOut";
import logo from "../assets/logo-project-exam2.png";
import { useNavigate, Link } from "react-router-dom";
import Spinner from 'react-bootstrap/Spinner';
import { BsFillCartFill } from "react-icons/bs";

function Products() {
  const [cart, setCart] = useState([]);
  const [checked, setChecked] = useState({ action: false, sports: false, adv: false, horror: false });
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  let navigate = useNavigate();

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
      (checked.adv && prod.genre === "Adventure") ||
      (checked.horror && prod.genre === "Horror")
    ));

    if (!checked.action && !checked.sports && !checked.adv && !checked.horror) {
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

  const handleAdventureChange = () => {
    setChecked({ ...checked, adv: !checked.adv });
  };

  const handleHorrorChange = () => {
    setChecked({ ...checked, horror: !checked.horror });
  };

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="" className="App-logo" />
        <button onClick={() => logOut(navigate)} className="logout-btn">
          Log Out
        </button>
        <Link to={`/cart`} className="cart-link">
          Cart({cart.length})
        </Link>
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
          <input type="checkbox" checked={checked.adv} onChange={handleAdventureChange} className="genre-search" />
          Adventure
        </label>

        <label className="search-label">
          <input type="checkbox" checked={checked.horror} onChange={handleHorrorChange} className="genre-search" />
          Horror
        </label>
      </div>
      <Container className="container">
        
          {filteredProducts.map(function (product) {

            return (
              <div className="products-container" key={product.id}>
                <BsFillCartFill className="fav-button" onClick={(event) => addToCart(event, product)}
                  style={cart.filter(prod => product.id === prod.id).length === 0 ? { color: "green" } : { color: "red" }}
                />
                <Link to={`product/${product.id}`} className="link-page">
                  <div>
                    <img src={product.image} alt={product.title} className="product-img" />
                  </div>
                  <div className="title-tag">
                    <h5 key={product.title}>{product.title}</h5>
                  </div>
                  <div className="link-tag">
                    View more
                  </div>
                </Link>
              </div>
            )
          })}
        
      </Container>
    </>
  )
}
export default Products;