import {Metadata} from "next";
import {sans} from "@/ui/fonts";
import StatisticsCards from "@/ui/(management)/dashboard/Statistics";
import DistributionMap from "@/ui/(management)/dashboard/DistributionMap";

export const metadata: Metadata = {
    title: 'Management Dashboard',
}
export default function Dashboard() {
    return (
        <>
            <StatisticsCards/>
            <div className='relative flex-grow mt-4 rounded-lg bg-gradient-to-b shadow-lg'>
                <DistributionMap/>
            </div>
        </>
    )
}