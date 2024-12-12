import React from 'react'
import StatisticsCards from "@/ui/components/StatisticsCards";
export default function withStatisticsLayout({children}: {children: React.ReactNode}) {
    return(
        <>
            <StatisticsCards />
            <main className='flex-grow'>
                {children}
            </main>
        </>
    )
}