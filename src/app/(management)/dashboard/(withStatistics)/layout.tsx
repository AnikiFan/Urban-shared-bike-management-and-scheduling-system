import React, {Suspense} from 'react'
import StatisticsCards from "@/ui/components/layout/StatisticsCards";
import {fetchBikeStatistics} from "@/lib/dal";
import {cardInfo} from "@/lib/definition";

export default async function withStatisticsLayout({children}: { children: React.ReactNode }) {
    return (
        <>
            <StatisticsCards/>
            <main className='flex-grow h-full'>
                {children}
            </main>
        </>
    )
}