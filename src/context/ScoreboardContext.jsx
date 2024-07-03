import { createContext, useState, useContext, useEffect } from "react";
import {getInformationSB,updateInformationSB} from '../api/scoreboard.js'

const ScoreBoardContext = createContext()

export const useSB = () => {
    const context = useContext(ScoreBoardContext)
    if (!context) {
        throw new Error("useSB mus be used with in an ScoreBoardProvider")
    }
    return context
}

export const ScoreBoardProvider = ({children}) => {
    //const [informationSB, setInformationSB] = useState([])

    const getInfoSB = async () => {
        try {
            const res = await getInformationSB()
            
            return res
          } catch (error) {
            return error.response.data
          }
    }

    const updateInfoSB = async (information) => {
        try {
            const res = await updateInformationSB(information)

            console.log(information)
            console.log(res)
            
          } catch (error) {
            return error.response.data
          }
    }

    

    return (
        <ScoreBoardContext.Provider value={{
            getInfoSB,
            updateInfoSB
        }}>
            {children}
        </ScoreBoardContext.Provider>
    )
}