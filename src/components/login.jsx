import React from 'react';
import './login.css';
import { useDispatch, useSelector } from "react-redux";
import { setCount } from '../reducers/reposReducer';
import { url, admin } from '../assets/fetchdata';
const Login = () => {

  function loginSubmit(e) {
    e.preventDefault();
    const requestOptions = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify({
        username: this.state.username,
        password: this.state.password
      })
    };
    fetch(url + '/api/login/', requestOptions)
      .then(res => {
        if (res.status >= 400) {
          console.log("Error bad request")
          document.querySelector('.invalid-feedback').style.display = 'block';
          return null
        }
        return res.json();
      })
      .then(data => {
        if (data === null) return null
        var tooken = data
        createCookies(data)
        this.setState({ loggedIN: cookieGet() })
      }).catch(function (error) {
        console.log('There has been a problem with your fetch operation: ',
          error.message);
      });
  };
  return (
    <div className='login'>
      <form id="loginform" onSubmit={(e)=>loginSubmit(e)}>
        <div className="form-group">
          <label>Username</label>
          <input
            type="text"
            className="form-control"
            //   id="EmailInput"
            //   name="EmailInput"
            //   aria-describedby="emailHelp"
            placeholder="Enter username"
            onChange={(event) => {
              this.setState({ username: event.target.value })
            }}
          />
          <small id="emailHelp" className="text-danger form-text">
            { }
          </small>
        </div>
        <div className="form-group">
          <label>Password</label>
          <input
            type="password"
            className="form-control"
            //   id="exampleInputPassword1"
            placeholder="Password"
            onChange={(event) => {
              this.setState({ password: event.target.value })
            }}
          />
          <small id="passworderror" className="text-danger form-text">
            { }
          </small>
        </div>
        <div className="form-group form-check">
          {/* <input
          type="checkbox"
          className="form-check-input"
          id="exampleCheck1"
        /> */}
          {/* <label className="form-check-label">Check me out</label> */}
        </div>
        <button type="submit" className="btn" style={{ background: '#350f4f', color: 'white' }}>
          Submit
        </button>
        <div className="invalid-feedback">
          Username or password is invalid
        </div>
      </form>
    </div>
  );
}

export default Login;