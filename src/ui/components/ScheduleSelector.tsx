'use client'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
import {getBikeList} from "@/lib/actions";
import React, {useEffect,useState} from "react";
import {useSelectedDispatch} from "@/ui/components/SelectContext";

export default function () {
    const [bikes,setBikes] = useState<{label:string,key:string}[]>([]);
    useEffect(() => {
        getBikeList().then((value)=>setBikes(value));
    },[]);
    const {setSelected} = useSelectedDispatch();


    return (
        <div className="flex-grow">
            <Autocomplete label="Select an bike using ID" size='lg' onSelectionChange={(key)=>setSelected(key as string)}>
                {bikes.map((bike) => (
                    <AutocompleteItem key={bike.key}>{bike.label}</AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
}