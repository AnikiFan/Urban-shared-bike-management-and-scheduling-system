'use client'
import React, {createContext, useContext,useState} from 'react'


const SelectedDispatchContext = createContext<{
    setSelected:React.Dispatch<React.SetStateAction<string>>
}>(undefined);

const SelectedContext = createContext<string>('');

export default function ({children}:{children:React.ReactNode}) {
    const [selected, setSelected] = useState<string>('')
    return(
        <SelectedContext.Provider value={selected}>
            <SelectedDispatchContext.Provider value={{setSelected}}>
            {children}
            </SelectedDispatchContext.Provider>
        </SelectedContext.Provider>
    )
}

export function useSelected(){
    return useContext(SelectedContext);
}

export function useSelectedDispatch(){
    return useContext(SelectedDispatchContext);
}
