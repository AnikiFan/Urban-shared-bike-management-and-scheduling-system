import {bikeStatusName} from "@/lib/definition";

// TODO: 不知道为什么有些时候彩色的Card和Chip组件无法正常显示，需要依次显式的设置颜色后，才能正常显示
export const palette:{[key in bikeStatusName]:string} = {
    正常:'bg-green',
    违规停放:'bg-amber',
    低电量:'bg-orange',
    闲置:'bg-amber',
    长期未关锁:'bg-orange',
    异常:'bg-red',
    待维修:'bg-orange',
    型号老旧:'bg-amber',
    库存:'bg-slate'
}

export const englishToChinese:{[key:string]:bikeStatusName} = {
    NORMAL:'正常',
    ILLEGAL_PARKING:'违规停放',
    LOW_BATTERY:'低电量',
    IDLE:'闲置',
    LUFLT:'长期未关锁',
    ABNORMAL:'异常',
    TO_MAINTAIN:'待维修',
    OUTDATED:'型号老旧',
    IN_STORAGE:'库存',
}

export const chineseToEnglish:{[key:string]:string}={
    正常:'NORMAL',
    违规停放:'ILLEGAL_PARKING',
    低电量:'LOW_BATTERY',
    闲置:'IDLE',
    长期未关锁:'LUFLT',
    异常:'ABNORMAL',
    待维修:'TO_MAINTAIN',
    型号老旧:'OUTDATED',
    库存:'IN_STORAGE',
}