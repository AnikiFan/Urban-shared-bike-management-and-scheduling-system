/** @type {import('next').NextConfig} */

const nextConfig = {
    experimental:{
        ppr:'incremental',
        authInterrupts:true
    },
};

export default nextConfig;
