import CustomerLogin from "../auth/CustomerLogin.js"
import RetrieveProductById from "../productComponets/RetrieveProduct.js";
import AdminDashboard from "../../admin/AdminDashboard.js";


const Home = () => {
    const isLoggedIn = true;
    if (!isLoggedIn) {
        return <CustomerLogin />;
  }
  else{
        return(
            <div>
                <RetrieveProductById />
                <AdminDashboard />
       
            
            </div>
        )
  }
}

export default Home;