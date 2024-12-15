import {Metadata} from "next";
import DistributionMap from "@/ui/maps/DistributionMap";

export const metadata: Metadata = {
    title: 'Management Dashboard',
}
export default function Dashboard() {
    return (
        <DistributionMap/>
    )
}