"use client";

import { useContext, useState, createContext} from "react";

const AppContext = createContext();

export  const AppProvider=({children})=>{
    const [isModalOpen, setIsModalOpen] = useState(false);
const openModal =()=>{
    setIsModalOpen(true)
}

const closeModal =()=>{
    setIsModalOpen(false)
}

return <AppContext.Provider 
value={{
    isModalOpen,
    openModal,
    closeModal,
    
}

}>{children}</AppContext.Provider>;
} ;
 export const modalContext=()=>{
    return  useContext(AppContext)
 }