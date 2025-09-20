import Header from "../../common/Header.js"
import Footer from "../../common/Footer.js"
import CustomerLogin from "../CustomerLogin.js"
import Product from "./Product"
import ItemCard from "./ProductComponets/ProductCard.js";
import RetrieveProductById from "../../database/axios";


const Home = () => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return <CustomerLogin />;
  }
  else{
        return(
            <div>
            <RetrieveProductById />
            <ItemCard />
            </div>
        )
  }
}

export default Home;