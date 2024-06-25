import { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom'

import { useAuth } from '../context/AuthContext.jsx'
import { usePage } from '../context/PageContext';
import { getTittlePage } from '../utils/tittlePage';

import { MdInventory } from "react-icons/md";
import '../styles/components/topbar.css'

const Topbar = () => {
    const {isAuthenticated, logout} = useAuth()
    const {isPageDashboard, isPageName, isJustChat, isScoreBoard} = usePage();
    const [isTittlePage, setTittlePage] = useState('')
    const location = useLocation();


    useEffect(() => {
        const tittle = getTittlePage()
        setTittlePage(tittle)
    },[location.pathname])

    const handleclick = async () => {
        const res = await logout()
    }
    
    return (
        <div>
            

            {(isJustChat || isScoreBoard) ? (<></>) : (
                <div className="menu--topbar">
                <div className="menu--content">
                    <div className="box--left box--topbar">
                        {(isPageDashboard) ? (
                            <>
                            <Link className='tittle--website ancla--topbar'>{isTittlePage}</Link>
                            </>
                        ): (<>
                            <Link to='/' className='tittle--website ancla--topbar'>Pentagon</Link>
                        </>)}
                            
                            
                        
                    </div>
                    <div className="box--right box--topbar">
                            <Link className='ancla--topbar'><h5>Perfil</h5></Link>

                            {(isAuthenticated) ? (<>
                                <Link to='/dashboard/home' className='ancla--topbar'><h5>Dashboard</h5></Link>                                
                                <Link onClick={handleclick} className='ancla--topbar'><h5>Cerrar Sesion</h5></Link>
                            </>): (
                                <>
                                    <Link className='ancla--topbar'><h5>Sobre nosotros</h5></Link>
                                    <Link to='/login' className='ancla--topbar'><h5>Iniciar Sesion</h5></Link>
                                </>
                            )}
                            
                            
                    </div>
                </div>
            </div>
            )}
        </div>
    )
}

export default Topbar
