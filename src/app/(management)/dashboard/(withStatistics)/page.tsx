import {Metadata} from "next";
import DistributionMap from "@/ui/maps/DistributionMap";
import {fetchMapData,fetchParkingAreaInfo} from "@/lib/dal";

export const metadata: Metadata = {
    title: 'Management Dashboard',
}
export default async function Dashboard() {
    const mapData = await fetchMapData();
    const parkingAreaInfo = await fetchParkingAreaInfo()
    return (
        <DistributionMap mapData={mapData} parkingAreaInfo={parkingAreaInfo}/>
    )
}