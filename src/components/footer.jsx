import React from 'react';
import './footer.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';

const Footer = () => {
  const dispatch = useDispatch()
  const count = useSelector(state => state.repos.count)

  function onCountClick() {
    dispatch(setCount(6))
  }
  return (
      <div className='footer' id='contacts'>
        <hr/>
        
      </div>
  );
}

export default Footer;