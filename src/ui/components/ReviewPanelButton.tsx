'use client'
import {Button} from "@nextui-org/react";
import React from "react";
import {acceptChangeForm, rejectChangeForm} from "@/lib/actions";

export default function({changeForm}:{changeForm:{bikeId:string,time:string,status:string[]}}){
   return (
       <div className='basis-1/12 flex flex-col w-full items-center justify-start'>
           <div className="flex flex-row space-x-8 w-full place-content-center place-items-center">
               <Button size='lg' className="basis-1/3" color='success' onClick={()=> acceptChangeForm(changeForm)}>
                   通过
               </Button>
               <Button size='lg' className="basis-1/3" color='warning' onClick={()=> rejectChangeForm(changeForm)}>
                   驳回
               </Button>
           </div>
       </div>
   )
}