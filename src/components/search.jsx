import React, { useRef, useState } from 'react';
import './home.css';
import './search.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import { productdata, filters } from '../assets/data';

const Search = () => {
  const [isActive, setActive] = useState(false);
  const [didReach, setReach] = useState(true);
  const [filteredProducts, setProducts] = useState(productdata);
  const [filterCategories, setCategories] = useState([]);
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
    switch (filterType) {
      case "Все разделы": items = productdata;
        break;
      case "Телефоны и гаджеты": items = productdata.filter((it) => it.categories[0] === "Телефоны и гаджеты");
        break;
      case "Компьютеры": items = productdata.filter((it) => it.categories[0] === "Компьютеры");
        break;
      case "Фото": items = productdata.filter((it) => it.categories[0] === "Фото");
        break;
      case "Телевизоры": items = productdata.filter((it) => it.categories[0] === "Телевизоры");
        break;
      case "Аудио": items = productdata.filter((it) => it.categories[0] === "Аудио");
        break;
      case "Бытовая техника": items = productdata.filter((it) => it.categories[0] === "Бытовая техника");
        break;
      case "Климат": items = productdata.filter((it) => it.categories[0] === "Климат");
        break;
      case "Дом": items = productdata.filter((it) => it.categories[0] === "Дом");
        break;
      case "Детские товары": items = productdata.filter((it) => it.categories[0] === "Детские товары");
        break;
      case "Авто": items = productdata.filter((it) => it.categories[0] === "Авто");
        break;
      case "Инструмент": items = productdata.filter((it) => it.categories[0] === "Инструмент");
        break;
      case "Туризм": items = productdata.filter((it) => it.categories[0] === "Туризм");
        break;
      case "Спорт": items = productdata.filter((it) => it.categories[0] === "Спорт");
        break;
      case "Часы и украшения": items = productdata.filter((it) => it.categories[0] === "Часы и украшения");
        break;
      default: items = items;
    }

    if (items.length == 0) {
      failMessage.current.style.display = "block";
    } else {
      failMessage.current.style.display = "none";
    }

    setProducts(items)
    setCategories(filters[filterType])
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
          {Object.keys(filters)?.map((item, key) => {
            return (
              <li key={key} onClick={(e) => handleFilter(e)}>{item}</li>
            )
          })}
        </ul>
      </div>
      <div className={`filter ${isActive ? "is-active" : ""} ${didReach ? "is-fixed" : ""}`}>
        <form>
          <div className="filter-block">
            <h4>Категорий</h4>
            <ul className="filter-content">
              {filterCategories?.map((item, key) => {
                return (
                  <li key={key}>
                    <input className="filter-check" type="checkbox" id={`checkbox${key}`} />
                    <label className="checkbox-label" htmlFor={`checkbox${key}`}>{item}</label>
                  </li>
                )
              })}
            </ul>
          </div>
          <div className="filter-block">
            <h4>Цена</h4>
            <label className="checkbox-label" htmlFor="pricefrom">От</label>
            <input className="filter-textbox" type="number" id="pricefrom" />
            <br/>
            <label className="checkbox-label" htmlFor="priceto">До</label>
            <input className="filter-textbox" type="number" id="priceto" />
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
          }) : ""}
        </ul>
        <div ref={failMessage} className="kanban-fail-message">No results found</div>
      </div>
    </div>
  );
}

export default Search;