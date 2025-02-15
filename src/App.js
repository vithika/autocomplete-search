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
       <img src="https://upload.wikimedia.org/wikipedia/commons/thumb/2/2f/Google_2015_logo.svg/2880px-Google_2015_logo.svg.png"  className="google" >
       </img>
     <div className="container">
     <img src="https://cdn4.iconfinder.com/data/icons/ionicons/512/icon-ios7-search-512.png"  className="icon" >
          </img>
      <input
        value={input}
        type="text"
        className="search-input"
        placeholder="Type your text here"
        onFocus={()=>setShowResults(true)}
        onBlur={()=>setShowResults(false)}
        onChange={(e) => setInput(e.target.value)}
      ></input>
        <img src="https://cdn2.iconfinder.com/data/icons/movie-59/60/mike__speaker__voice__recorder__movie-512.png"  className="righticonspeaker
" ></img>
      <img src="https://cdn1.iconfinder.com/data/icons/andriod-app/32/camera-512.png"  className="righticoncamera
" >
      </img>
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
