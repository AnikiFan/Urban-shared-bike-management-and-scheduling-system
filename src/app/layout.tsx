import '@/ui/global.css'
import {Metadata} from 'next';
import {serif} from '@/ui/fonts'
import {Providers} from './providers'
import React from "react";
export const metadata: Metadata = {
    title: {
        template: '%s | Urban Shared Bike Management and Scheduling System',
        default: 'Urban Shared Bike Management and Scheduling System Dashboard',
    },
    description: 'Urban Shared Bike Management and Scheduling System Dashboard built by Fx 2254298',
};
export default function RootLayout({children}: { children: React.ReactNode; })
{
    return (
        <html lang="zh-cn">
        <body className={`light ${serif.className} antialiased`}>
        <Providers>
            {children}
        </Providers>
        </body>
        </html>
    );
}
