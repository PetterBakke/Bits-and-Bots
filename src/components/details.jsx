import { BASE_URI } from "../constants/api";
import { BsFillCartFill } from "react-icons/bs";
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import logo from "../assets/logo-project-exam2.png";

function PageDetail() {
  const [cart, setCart] = useState([]);
  const [product, setProduct] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const { id } = useParams();

  const url = BASE_URI + "/" + id;

  useEffect(function () {
    if (JSON.parse(localStorage.getItem("Favourites"))) {
      setCart(JSON.parse(localStorage.getItem("Favourites")));
    }
  }, []);

  useEffect(function () {
    async function fetchData() {
      try {
        const response = await fetch(url);

        if (response.ok) {
          const json = await response.json();
          console.log(json);
          setProduct(json);
        } else {
          setError("An error occurred");
        }
      } catch (error) {
        setError(error.toString());
      } finally {
        setLoading(false);
      }
    }
    fetchData();
  }, [url]);

  const handleBack = () => {
    navigate("/products");
  }

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>ERROR: An error occurred</div>;
  }

  const addToCart = (product) => {
    if (cart.filter((prod) => product.id === prod.id).length === 0) {
      setCart([...cart, product]);
      localStorage.setItem("Favourites", JSON.stringify([...cart, product]));
      console.log("This item is in the cart");
    } else {
      let newCart = cart.filter((prod) => product.id !== prod.id);
      setCart(newCart);
      localStorage.setItem("Favourites", JSON.stringify(newCart));
    }
  };

  return (
    <>
      <div className="logo-container">
        <img src={logo} alt="" className="App-logo" />
      </div>

      <div className="page-detail">
        <div className="flex-child">
          <BsFillCartFill
            className="fav-button-details"
            onClick={() => addToCart(product)}
            style={
              cart.filter((prod) => product.id === prod.id).length === 0
                ? { color: "green" }
                : { color: "red" }
            }
          />
          <h2 key={product.title} className="heading">
            {product.title}
          </h2>
          <img src={product.image} alt={product.title} className="detail-img" />
          <div className="description">
            <p className="heading-description">{product.description}</p>
          </div>
          <button onClick={handleBack} className="back-btn">Go Back</button>
        </div>
      </div>
    </>
  );
}

export default PageDetail;