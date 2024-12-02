import {Metadata} from "next";
import {sans} from "@/ui/fonts";
import {Spacer} from "@nextui-org/react";
import StatisticsCards from "@/ui/(management)/dashboard/Statistics";
import DistributionMap from "@/ui/(management)/dashboard/DistributionMap";

export const metadata: Metadata = {
    title: 'Management Dashboard',
}
export default function Dashboard() {
    return (
        <>
            <StatisticsCards/>
            <Spacer y={4}/>
            <div className='relative flex-grow rounded-lg bg-gradient-to-b shadow-lg'>
                <DistributionMap/>
            </div>
        </>
    )
}