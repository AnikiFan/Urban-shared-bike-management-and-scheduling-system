import React from 'react'
import ColorBar from "@/ui/components/layout/ColorBar";

export default async function ({children}: { children: React.ReactNode }) {
    return (
        <>
            <div className='flex flex-col space-y-4 size-full'>
                {children}
                <ColorBar/>
            </div>
        </>
    )
}