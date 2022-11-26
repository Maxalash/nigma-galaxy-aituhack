import React, {useEffect} from 'react';
import './home.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Search from '../components/search.jsx';
import Login from './login.jsx';
import { productdata } from '../assets/data';
import { addProduct } from '../reducers/productsReducer';

const Home = () => {
  const dispatch = useDispatch()
  const prodData = useSelector(state => state.products)

  // Load data when component did mount
  useEffect(() => {
    // if(prodData.length== 0){
    //   dispatch(addProduct(productdata));
    // }
  });

  return (
    <div className='app'>
      <Login />
      <Header />
      <Search />
    </div>
  );
}

export default Home;