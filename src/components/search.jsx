import React, { useRef, useState } from 'react';
import './home.css';
import './search.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import { productdata } from '../assets/projects';

const Search = () => {
  const [isActive, setActive] = useState(false);
  const [didReach, setReach] = useState(true);
  const [filteredProducts, setProducts] = useState(productdata);
  const filterComponent = useRef()
  const failMessage = useRef() 
  const dispatch = useDispatch()
  const count = useSelector(state => state.repos.count)



  const handleScroll = (e) => {
    console.log(e.target.clientHeight);
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if (bottom) {
      console.log("did reach")
      setReach(true);
    } else {
      setReach(false);
    }
  }

  // Function for filtering by the types of the product
  // that triggered by clicking types on the filter bar

  const handleFilter = (e) => {
    let items = JSON.parse(JSON.stringify(filteredProducts));
    const filterType = e.target.innerHTML;
    console.log(filterType)
    switch (filterType){
      case "All": items = productdata;
      break;
      case "Phones and Gadgets": items = productdata.filter((it)=>it.categories[0] === "phone");
      break;
      case "Computers": items = productdata.filter((it)=>it.categories[0] === "computer");
      break;
      case "Audio": items = productdata.filter((it)=>it.categories[0] === "audio");
      break;
      case "Television": items = productdata.filter((it)=>it.categories[0] === "television");
      break;
      case "Cameras": items = productdata.filter((it)=>it.categories[0] === "camera");
      break;
      default: items = items;
    }

    if(items.length==0){
      failMessage.current.style.display = "block";
    }else{
      failMessage.current.style.display = "none";
    }

    setProducts(items)
  }

  // Filter toggler handler function
  const toggle = (e) => {
    setActive(!isActive);
  }

  return (
    <div className='filter-section'>
      <div className={`filter-bar ${didReach ? "is-fixed" : ""}`} ref={filterComponent} onScroll={(e) => handleScroll(e)}>
        <div className='filter-burger' onClick={(e) => toggle(e)}></div>
        <div className='filter-button' onClick={(e) => toggle(e)}>Filter</div>
        <ul className='filter-types'>
          <li onClick={(e)=>handleFilter(e)}>All</li>
          <li onClick={(e)=>handleFilter(e)}>Phones and Gadgets</li>
          <li onClick={(e)=>handleFilter(e)}>Computers</li>
          <li onClick={(e)=>handleFilter(e)}>Audio</li>
          <li onClick={(e)=>handleFilter(e)}>Television</li>
          <li onClick={(e)=>handleFilter(e)}>Cameras</li>
        </ul>
      </div>
      <div className={`filter ${isActive ? "is-active" : ""} ${didReach ? "is-fixed" : ""}`}>
        <form>
          <div className="filter-block">
            <h4>Check boxes</h4>
            <ul className="filter-content">
              <li>
                <input className="filter-check" type="checkbox" id="checkbox1" />
                <label className="checkbox-label" htmlFor="checkbox1">Option 1</label>
              </li>
              <li>
                <input className="filter-check" type="checkbox" id="checkbox2" />
                <label className="checkbox-label" htmlFor="checkbox2">Option 2</label>
              </li>
              <li>
                <input className="filter-check" type="checkbox" id="checkbox3" />
                <label className="checkbox-label" htmlFor="checkbox3">Option 3</label>
              </li>
            </ul>
          </div>
        </form>
      </div>
      <div className={`filter-kanban ${isActive ? "is-shrinked" : ""}`}>
        <ul className='filter-kanban-container'>
          {Array.isArray(filteredProducts) ? filteredProducts?.map((item, key) => {
            return (
              <li className="card" key={key}>
                <img src="#" alt={item.name} /><br />
                Name: {item.name}<br />
                Categories: {item.categories}<br />
                Price: {item.price}$
              </li>
            )
          }): ""}
        </ul>
        <div ref={failMessage} className="kanban-fail-message">No results found</div>
      </div>
    </div>
  );
}

export default Search;