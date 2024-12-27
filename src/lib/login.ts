'use server'
import 'server-only'
import {db} from "@/src/db";
import {eq, sql} from 'drizzle-orm'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {encrypt, validEndurance} from "@/lib/auth";
import {users} from "@/db/schema";

export async function login(prevState:{message:string;}, formData: FormData) {
    const expires = new Date(Date.now() + await validEndurance());
    const result = await db.execute(sql`SELECT "check_password"(${formData.get('email')},${formData.get('password')})`)
    const valid = result.rows[0].check_password;
    if(!valid)return {"message":"Invalid email or password!"};
    const role = await db.select({role:users.role}).from(users).where(eq(users.email,formData.get('email') as string))
    const user = {email: formData.get("email"),role:role[0].role};
    const session = await encrypt({user,expires})
    cookies().then((value)=>{
        value.set('session', session, {expires, httpOnly: true});
    })
    redirect('/dashboard');
}
