import {Metadata} from "next";
import StatisticsCards from "@/ui/components/StatisticsCards";
import DistributionMap from "@/ui/maps/DistributionMap";

export const metadata: Metadata = {
    title: 'Management Dashboard',
}
export default function Dashboard() {
    return (
        <DistributionMap/>
    )
}