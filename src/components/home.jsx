import React from 'react';
import './home.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import Header from '../components/header.jsx';
import Footer from '../components/footer.jsx';
import Search from '../components/search.jsx';

const Home = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.repos.count)

  function onCountClick() {
    dispatch(setCount(6))
  }
  return (
    <div className='app'>
      <Header />
      <Search />
      <Footer />
    </div>
  );
}

export default Home;