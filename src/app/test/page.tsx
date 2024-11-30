import {db} from "@/db/index"
import {bike} from '@/db/schema'
export default async function Page(){
    const bikes = await db.select().from(bike);
    return(
        <div>
            {bikes.map((bike)=>(<li key={bike.bikeId}>{bike.coordinate}</li>))}
        </div>
    )
}