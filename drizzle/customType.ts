import {customType} from 'drizzle-orm/pg-core'
export const customBytea =  customType<{
    data: Buffer
    default: false
  }>({
    dataType() {
      return 'bytea'
    },
  })