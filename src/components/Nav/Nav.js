import React, { useEffect, useState } from 'react';
import "./Nav.css";
import logo from '../../img/logo.png';
import avatar from '../../img/icon48.png';


function Nav() {
const [show, handleShow] = useState(false);
const transitionNavBar = () => {
  if (window.scrollY > 100) {
    handleShow(true)
  }else {
    handleShow(false)
  }
}

useEffect(()=>{
window.addEventListener("scroll", transitionNavBar);
return()=> window.removeEventListener("scroll", transitionNavBar)
},[])

  return (
    <div className={`nav ${show && 'nav-black'}`}>
      <div className='nav-contents'>
        <img className='nav-logo' src={logo} alt="website's logo" />
        <img className='nav-avatar' src={avatar} alt="avatar's icon"/>
      </div>
    </div>
  )
}

export default Nav;