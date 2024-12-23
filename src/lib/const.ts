import {bikeStatusName} from "@/lib/definition";

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
    STORAGE:'库存'
}