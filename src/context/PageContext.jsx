import { createContext, useState, useContext, useEffect } from "react";
import { useLocation } from 'react-router-dom'

const PageContext = createContext()

export const usePage = () => {
    const context = useContext(PageContext)
    if (!context) {
        throw new Error("usePage mus be used with in an PageProvider")
    }
    return context
}

export const PageProvider = ({ children }) => {

    const [isPageDashboard, setIsPageDashboard] = useState(null)
    const [isPageName, setPageName] = useState(null)
    const [isJustChat, setChatDis] = useState(null)
    const [isScoreBoard, setScoreBoard] = useState(null)
    const locationPage = useLocation();

    //const routesex = ['/login', '/'];
    //const parsed_route = []


    useEffect(() => {
        const isDb = locationPage.pathname.includes("dashboard")
        const isJC = locationPage.pathname.includes("justchat")
        const isSB = locationPage.pathname.includes("scoreboard")
        
        setIsPageDashboard(isDb)
        setPageName(locationPage.pathname)
        
        setChatDis(isJC)        

        setScoreBoard(isSB)        
    }, [locationPage])



    return (
        <PageContext.Provider value={{
            isPageDashboard,
            isPageName,
            isJustChat,
            isScoreBoard
        }}>
            {children}
        </PageContext.Provider>
    )
}