import CustomerLogin from "../auth/CustomerLogin";
import RetrieveProductById from "../product_componets/RetrieveProduct";
import Header from "../common/Header";
import Footer from "../common/Footer";
import SideBarFilter from "./SideBarFilter";
import CategoryChips from "./CategoryChips";
import { useState } from "react";
import "../../../styles/styles.css"; 

const Home = () => {
  const isLoggedIn = true;

  const [filters, setFilters] = useState({
    genre: new Set(),
    format: new Set(),
    availability: new Set(),
    condition: new Set(["New", "Used"]),
    author: new Set(),
  });

  if (!isLoggedIn) return <CustomerLogin />;

  return (
    <>
      <Header />

      <main className="container">
        <div className="toolbar">
          <div className="badge">Free shipping over $79 • New arrivals weekly</div>
        </div>

        <section className="hero" role="region" aria-label="Featured">
          <h1>Find your next read</h1>
        </section>

        <div className="chips">
          <CategoryChips />
        </div>

        <div className="layout">
         
            
            <SideBarFilter className="sidebar" filters={filters} setFilters={setFilters} />
           
          
            <section>


                <div className="grid">
                
                <RetrieveProductById />
                </div>
          </section>
        </div>

        <Footer />
      </main>
    </>
  );
};

export default Home;
