import React, { useRef, useState } from 'react';
import './home.css';
import './search.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import { productdata } from '../assets/projects';

const Search = () => {
  const [isActive, setActive] = useState(false);
  const [didReach, setReach] = useState(true);
  const filterComponent = useRef()
  const dispatch = useDispatch()
  const count = useSelector(state => state.repos.count)

 

  const handleScroll = (e) => {
    console.log(e.target.clientHeight);
    const bottom = e.target.scrollHeight - e.target.scrollTop <= e.target.clientHeight;
    if(bottom){
      console.log("did reach")
      setReach(true);
    }else{
      setReach(false);
    }
  }

  // Filter toggler handler function
  const toggle = (e) => {
    setActive(!isActive);
  }

  return (
    <div className='filter-section'>
      <div className={`filter-bar ${didReach ? "is-fixed":""}`} ref={filterComponent} onScroll={(e)=>handleScroll(e)}>
        <div className='filter-burger'  onClick={(e) => toggle(e)}></div>
        <div className='filter-button'  onClick={(e) => toggle(e)}>Filter</div>
        <ul className='filter-types'>
          <li>All</li>
          <li>Phones and Gadgets</li>
          <li>Computers</li>
          <li>Audio</li>
          <li>Television</li>
          <li>Cameras</li>
        </ul>
      </div>
      <div className={`filter ${isActive ? "is-active" : ""} ${didReach ? "is-fixed":""}`}>
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
      <div className={`filter-kanban ${isActive ?  "is-shrinked": ""}`}>
        <ul className='filter-kanban-container'>
          {productdata?.map((item, key)=>{
            return (
            <li className="card" key={key}>
              <img src="#" alt={item.name} /><br/>
              {item.name}<br/>
              {item.categories}<br />
              {item.price}
            </li>
          )})}
        </ul>
        <div className="kanban-fail-message">No results found</div>
      </div>
    </div>
  );
}

export default Search;