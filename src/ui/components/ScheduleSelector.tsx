'use client'
import {Autocomplete, AutocompleteItem} from "@nextui-org/react";
const animals = [
    {label: "Cat", key: "cat", description: "The second most popular pet in the world"},
    {label: "Dog", key: "dog", description: "The most popular pet in the world"},
    {label: "Elephant", key: "elephant", description: "The largest land animal"},
    {label: "Lion", key: "lion", description: "The king of the jungle"},
    {label: "Tiger", key: "tiger", description: "The largest cat species"},
    {label: "Giraffe", key: "giraffe", description: "The tallest land animal"},
    {
        label: "Dolphin",
        key: "dolphin",
        description: "A widely distributed and diverse group of aquatic mammals",
    },
    {label: "Penguin", key: "penguin", description: "A group of aquatic flightless birds"},
    {label: "Zebra", key: "zebra", description: "A several species of African equids"},
    {
        label: "Shark",
        key: "shark",
        description: "A group of elasmobranch fish characterized by a cartilaginous skeleton",
    },
    {
        label: "Whale",
        key: "whale",
        description: "Diverse group of fully aquatic placental marine mammals",
    },
    {label: "Otter", key: "otter", description: "A carnivorous mammal in the subfamily Lutrinae"},
    {label: "Crocodile", key: "crocodile", description: "A large semiaquatic reptile"},
];

export default function () {
    return (
        <div className="flex-grow">
            <Autocomplete label="Select an animal" size='lg'>
                {animals.map((animal) => (
                    <AutocompleteItem key={animal.key}>{animal.label}</AutocompleteItem>
                ))}
            </Autocomplete>
        </div>
    );
}