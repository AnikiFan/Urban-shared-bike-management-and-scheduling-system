import React from 'react';

export default function MapWrapper({children}: { children: React.ReactNode }) {
    return (
            <div className='relative flex-grow h-full rounded-lg bg-gradient-to-b shadow-lg'>
                {children}
            </div>
    )
}