import React, { useRef, useState, useEffect } from 'react';
import './home.css';
import './search.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import { productdata, filters } from '../assets/data';
import { url, admin } from '../assets/fetchdata';



const Search = () => {
  const [allproducts, setAllProducts] = useState(productdata);
  const [isActive, setActive] = useState(false);
  const [didReach, setReach] = useState(false);
  const [filteredProducts, setProducts] = useState(allproducts);
  const [filterCategories, setCategories] = useState([]);
  const [getFilter, setFilter] = useState([])
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
      case "Телефоны и гаджеты": setFilter(filters["Телефоны и гаджеты"]);
        break;
      case "Компьютеры": setFilter(filters["Компьютеры"]);
        break;
      case "Фото": setFilter(filters["Фото"]);
        break;
      case "Телевизоры": setFilter(filters["Телевизоры"]);
        break;
      case "Аудио": setFilter(filters["Аудио"]);
        break;
      case "Бытовая техника": setFilter(filters["Бытовая техника"]);
        break;
      case "Климат": setFilter(filters["Климат"]);
        break;
      case "Дом": setFilter(filters["Дом"]);
        break;
      case "Детские товары": setFilter(filters["Детские товары"]);
        break;
      case "Авто": setFilter(filters["Авто"]);
        break;
      case "Инструмент": setFilter(filters["Инструмент"]);
        break;
      case "Туризм": setFilter(filters["Туризм"]);
        break;
      case "Спорт": setFilter(filters["Спорт"]);
        break;
      case "Часы и украшения": setFilter(filters["Часы и украшения"]);
        break;
      default: items = items;
    }

    if (items.length < 0) {
      failMessage.current.style.display = "block";
    } else {
      failMessage.current.style.display = "none";
    }

    setProducts(items)
    setCategories(filters[filterType])
  }

  // Function for filtering products according to set filters in the filter form
  const handleSubmit = (e) => {
    e.preventDefault()
    const pricefrom = e.target.children[1].children[2].value;
    const priceto = e.target.children[1].children[4].value;
    console.log(typeof priceto)
    let items = JSON.parse(JSON.stringify(filteredProducts));
    if (priceto == "") {
      items = items.filter((it) => it.price >= pricefrom);
    } else if (pricefrom == "") {
      items = items.filter((it) => it.price <= priceto);
    } else {
      items = items.filter((it) => it.price >= pricefrom && it.price <= priceto);
    }
    setProducts(items)
  }

  const handleRadio = (e)=>{
    // e.preventDefault()
    const filte = e.target.id
    if(!filte==""){
      setFilter([filte])
    }
    
  }

  // Filter toggler handler function
  const toggle = (e) => {
    setActive(!isActive);
  }

  // Get data when filter changed
  useEffect(() => {
    console.log(getFilter)
    async function fetchData(){
      await fetch(`${url}/api/get_items/`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Token ${admin}`
        },
        body: JSON.stringify({
          item: getFilter[0]
        })
      }).then(data=>{
        return data.json();
      }).then(dat=>{
        console.log(dat);
        setProducts(dat)
      }).catch(err=>{
        console.log(err);
      });
    }

    fetchData()
    

  }, [getFilter])

  const pop = () => {
    if (window.scrollY > 90) {
      setReach(true);
    }else{
      setReach(false);
    }

  }

  useEffect(() => {
    window.addEventListener('scroll', pop);
  
    return () => window.removeEventListener('scroll', pop);
  },[]);

  return (
    <div className='filter-section'>
      <div className={`filter-bar ${didReach ? "is-fixed" : ""}`} ref={filterComponent} onScroll={(e) => handleScroll(e)}>
        <div className='filter-button' onClick={(e) => toggle(e)}><img src='filter.png' width="30%" /></div>
        {/* <div className='filter-button' onClick={(e) => toggle(e)}>Filter</div> */}
        <ul className='filter-types'>
          {Object.keys(filters)?.map((item, key) => {
            return (
              <li key={key} onClick={(e) => handleFilter(e)}>{item}</li>
            )
          })}
        </ul>
      </div>
      <div className={`filter ${isActive ? "is-active" : ""} ${didReach ? "is-fixed" : ""}`}>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div className="filter-block">
            <h4>Категорий</h4>
            <div className="filter-content" >
              {filterCategories?.map((item, key) => {
                return (
                  <label className="form-control" id={item} key={key} onClick={(e)=>handleRadio(e)}>
                    <input className="filter-check" type="radio" name="radio"/>
                    {item}
                  </label>
                )
              })}
            </div>
          </div>
          <div className="filter-block">
            <h4>Цена</h4>
            <label className="textbox-label" htmlFor="pricefrom">От</label>
            <input className="filter-textbox" type="number" id="pricefrom" /><br/>
            <label className="textbox-label" htmlFor="priceto">До</label>
            <input className="filter-textbox" type="number" id="priceto" />
          </div>
          <input className='filter-submit' type="submit" value="Подобрать" />
        </form>
      </div>
      <div className={`filter-kanban ${isActive ? "is-shrinked" : ""}`}>
        <ul className='filter-kanban-container'>
          {Array.isArray(filteredProducts) ? filteredProducts?.map((item, key) => {
            return (
              <li className="card" key={key}>
                <img src={item.item_image} alt={item.item_name} />
                <div className='card-title'>{item.item_name}</div>
                {/* Description: {item.item_description}<br /> */}
                {/* Price: {item.price}$ */}
              </li>
            )
          }) : ""}
        </ul>
        <div ref={failMessage} className="kanban-fail-message">Не найдено ни одного товара</div>
      </div>
    </div>
  );
}

export default Search;