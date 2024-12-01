import localfont from "next/font/local"
export const sans = localfont({
    src:[{
        path:"../../public/fonts/SourceHanSansSC-VF.otf.woff2",
    }],
    variable: "--font-sans"
})
export const serif = localfont({
    src:[{
        path:"../../public/fonts/SourceHanSerifSC-VF.otf.woff2",
    }],
    variable: "--font-serif"
})

