import QuoteCard from "./components/QuoteCard";
import { useEffect, useState } from "react";
import axios from "axios";
import "./App.css";

const App = () => {

  const [Quote, setQuote] = useState("");
  const [Author, setAuthor] = useState("");
  const [Search, setSearch] = useState("");
  const [Key, setKey] = useState("");
  const [authorlist, setauthorlist] = useState([]);
  const [buttonClicked, setButtonClicked] = useState(false);

  useEffect(() => {
    const fetchData = async () => {

      const res = await axios.get(
        "https://api.quotable.io/authors/"
      );
      const data = await res.data;
      setauthorlist(data.results.map((data) => data.name));


      try {
        if (buttonClicked) {
          const response = await axios.get(
            `https://api.quotable.io/quotes?author=${Search}`
          );
          const data = await response.data;
          setQuote(data.results.map((data) => data.content));
          setKey(data.results.map((data)=>data._id));
          setAuthor(data.results.map((data) => data.author));
        } else {
          const response = await axios.get(
            "https://api.quotable.io/quotes/random/"
          );
          const data = response.data;
          setQuote(data.map((data) => data.content));
          setAuthor(data.map((data) => data.author));
        }
      } catch (error) {
        console.log(error);
      }
    };

    fetchData();
  }, [Search,buttonClicked]);
  
  


  return (
    <div className="main">

      <h1 id = "title">QUOTE OF THE DAY</h1>
        
       <div className="search">
       <input type="text" placeholder="Enter Author's Name .." onChange= {(e) => {setSearch(e.target.value)}} />
       <button onClick={() => { if (Search) {
      setButtonClicked(true);
    } else {
      setButtonClicked(false); // Set to false if the search box is empty
    }
  }}>Search</button>
       </div>
       {/* (prevState) => !prevState */}
       {buttonClicked ? (
  <div>
    {Quote.map((quote,index) => (
      <div className="quote" key = {index}>
      <QuoteCard key={index} quote={quote} author={Author[0]} />
      </div>
    ))}
  </div>
) : (
  <div className="quote">
  <QuoteCard quote={Quote} author={Author}  />
  </div>
)}    
   
   <div className="author-list">

   </div>
     <ul>
        <h3>List Of Authors</h3>
     {authorlist.map((author,index) => (
        <li key = {index}>{author}</li>
     ))}
     <p>...and many more.</p>
     </ul>
    </div>
  )
}

export default App