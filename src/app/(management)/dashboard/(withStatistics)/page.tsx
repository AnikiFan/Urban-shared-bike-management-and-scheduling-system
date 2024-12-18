import {Metadata} from "next";
import DistributionMap from "@/ui/maps/DistributionMap";
import {fetchMapData} from "@/lib/dal";

export const metadata: Metadata = {
    title: 'Management Dashboard',
}
export default async function Dashboard() {
    const data = await fetchMapData();
    return (
        <DistributionMap/>
    )
}