 import "./Hero.css"
 import { useNavigate} from "react-router-dom";
 function Hero() {
   const navigate = useNavigate();
  return (
    <>
    <section className="hero">
      <h1>Custom Infinity Tables</h1>
      <p>Premium handcrafted tables</p>
    </section>
    
    </>
  );
}

export default Hero;