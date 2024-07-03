import {Link, NavLink, useLocation} from 'react-router-dom'


import { BiHome, BiTask} from 'react-icons/bi';
import { MdInventory } from "react-icons/md";
import '../styles/components/sidebar.css';

import { useAuth } from '../context/AuthContext';
import { usePage } from '../context/PageContext';



const fristUrl = '/dashboard'
const suma = true


const Sidebar = () => {  
  
  const {isAuthenticated} = useAuth();
  const {isPageDashboard, isPageName, isJustChat,isScoreBoard} = usePage();

  
  

  if (isJustChat || isScoreBoard) return (<></>)
  if (isAuthenticated && isPageDashboard) return (
    
    <div className='menu'>
      <div className="logo">
        <MdInventory className='logo-icon'/>
        <h3>Control Panel</h3>
      </div>

      <div className="menu--list">
        
        <NavLink to="home" end  className={({isActive}) => isActive ? "item selected-icon" : "item"}>
          {/* <BiHome className='icon'/> */}
          Pagina principal
          
        </NavLink>

        <NavLink to='control-panel' className={({isActive}) => isActive ? "item selected-icon" : "item"}>
          {/* <BiTask className='icon'/> */}
          Control Panel
        </NavLink>

        <NavLink to='chat' className={({isActive}) => isActive ? "item selected-icon" : "item"}>
          {/* <BiTask className='icon'/> */}
          Chat
        </NavLink>

        <NavLink to='scoreboard' className={({isActive}) => isActive ? "item selected-icon" : "item"}>
          {/* <BiTask className='icon'/> */}
          Scoreboard
        </NavLink>

        

      </div>
    </div>
  )
}

export default Sidebar
