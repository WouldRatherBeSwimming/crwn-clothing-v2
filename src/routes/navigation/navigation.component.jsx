import { Link, Outlet } from 'react-router-dom'
import { Fragment } from 'react'

const Navigation = () => {
    return (
      <Fragment>
        <div classname='navigation'>
        <Link className='logo-container' to='/'>
        <div>Logo</div>
        </Link>
         
         <div classname='nav-links-container'>
            <Link classname='nav-link' to='/shop'>
                SHOP
            </Link>
         </div>
        </div>
        <Outlet />
      </Fragment>
    )
  }

  export default Navigation