import { useState,useEffect } from "react";
import "./App.css";

function App() {

  const [product, setProduct] = useState([]);
  const [input, setInput] = useState("");
  const[showResults,setShowResults]= useState(false);
  const[cache,setCache]= useState({})
  useEffect(() => {
    const timer = setTimeout(fetchData,300);
    return ()=>
    {
      clearTimeout(timer);
    }
  }, [input]);


  const fetchData = async () => {
    if(cache[input])
    {
      setProduct(cache[input]);
      return
    }
    const data = await fetch("https://dummyjson.com/recipes/search?q="+input);
    console.log("data",data)
    const json = await data.json();
    setProduct(json?.recipes);
 setCache(prev=>({...prev,[input]:json?.recipes}));
  };

  return (
    <div className="App">
      <h1> AutoComplete Search </h1>
     <div>
      <input
        value={input}
        type="text"
        className="search-input"
        placeholder="Type your text here"
        onFocus={()=>setShowResults(true)}
        onBlur={()=>setShowResults(false)}
        onChange={(e) => setInput(e.target.value)}
      ></input>
      {showResults && (
 <div className="products-container">
      {product.map((p) => 
        <span  className="product" key={p.id}>{p.name}</span>
      )}
      </div>
       )}
    </div>
    </div>
  );
}

export default App;
