'use client'
import {Breadcrumbs, BreadcrumbItem} from "@nextui-org/react";

export default function ManagementBreadCrumb() {
    return (
        <>
            <Breadcrumbs
                separator="/"
                itemClasses={{
                    separator: "px-2"
                }}
                size='lg'
            >
                <BreadcrumbItem>Home</BreadcrumbItem>
                <BreadcrumbItem>Music</BreadcrumbItem>
                <BreadcrumbItem>Artist</BreadcrumbItem>
                <BreadcrumbItem>Album</BreadcrumbItem>
                <BreadcrumbItem>Song</BreadcrumbItem>
            </Breadcrumbs>
        </>
    );
}