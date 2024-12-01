import {Metadata} from "next";
import {sans} from "@/ui/fonts";
import MyCard from "@/ui/(management)/dashboard/Statistics";
export const metadata:Metadata={
    title:'Management Dashboard',
}
export default function Dashboard(){
    return (
        <>
            <main>
                <h1 className={`${sans.className} mb-4 text-xl md:text-2xl`}>
                    Dashboard
                </h1>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                    <MyCard/>
               </div>
                <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
                    lower right
                </div>
            </main>
        </>
    )
}