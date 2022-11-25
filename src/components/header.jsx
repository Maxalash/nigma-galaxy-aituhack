import React from 'react';
import './header.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
const Header = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.repos.count)

  function onCountClick() {
    dispatch(setCount(6))
  }
  return (
      <div className='header'>
        <p className='logo'>Nigma Galaxy</p>
        <ul className='navbar'>
          <li>
            <a href='#contacts'>Log In</a>
          </li>
          <li>
            <a href='#projects'>Register</a>
          </li>
          <li>
            <a href='#about'>About</a>
          </li>
        </ul>
      </div>
  );
}

export default Header;