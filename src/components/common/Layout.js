import React, { Fragment } from 'react';
import NavBar from './NavBar';


const Layout = (props) => {

  return (
    <Fragment>
      <NavBar></NavBar>
      <div
        className={'layout-content'}>
        {props.children}
      </div>
    </Fragment>
  )

}

export default Layout;