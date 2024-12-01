import { sans } from '@/ui/fonts';
export const ChineseTitle = "城市共享单车管理与调度平台"
export const EnglishTitle = "Urban Shared Bike Management and Scheduling System"
export function BikeLogo(props:{size:number}){
    const {size=100} = props;
    return (
        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width={size} height={size} color={"#ffffff"}
             fill={"none"}>
            <path
                d="M6 20.0026C8.20914 20.0026 10 18.2118 10 16.0026C10 13.7935 8.20914 12.0026 6 12.0026C3.79086 12.0026 2 13.7935 2 16.0026C2 18.2118 3.79086 20.0026 6 20.0026Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M18 20.0026C20.2091 20.0026 22 18.2118 22 16.0026C22 13.7935 20.2091 12.0026 18 12.0026C15.7909 12.0026 14 13.7935 14 16.0026C14 18.2118 15.7909 20.0026 18 20.0026Z"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M6 16.0026H10.3706C10.7302 16.0026 11.0622 15.8095 11.2399 15.4968L15.5 8.00262"
                  stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            <path d="M12 13.0026L7 7.00262M7 7.00262H5M7 7.00262H9" stroke="currentColor" strokeWidth="1.5"
                  strokeLinecap="round" strokeLinejoin="round"/>
            <path
                d="M20.0039 6.21868C19.7999 5.64268 19.4399 4.74268 18.2399 4.32268C17.4599 4.02268 15.5399 3.90268 15.2999 4.08268C14.9527 4.16949 14.9399 4.56268 15.1079 5.10268C15.2444 5.68163 15.4559 6.42824 15.6479 7.14268C16.1399 8.97348 17.2199 12.9387 18.0239 15.9987"
                stroke="currentColor" strokeWidth="1.5" strokeLinecap="round"/>
        </svg>
    )
}
export default function Logo() {
    return (
        <div
            className={`${sans.className} flex flex-row items-center leading-none text-white`}
        >
            <BikeLogo size={100}/>
          <div
              className={`${sans.className} flex flex-col items-start leading-none text-white`}
          >
              <p className="text-[44px]">{ChineseTitle}</p>
              <p className="text-[44px]">{EnglishTitle}</p>
          </div>
      </div>
  );
}