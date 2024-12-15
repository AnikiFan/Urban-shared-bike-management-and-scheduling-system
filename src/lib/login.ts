'use server'
import 'server-only'
import {db} from "@/src/db";
import {sql} from 'drizzle-orm'
import {cookies} from "next/headers";
import {redirect} from "next/navigation";
import {encrypt, validEndurance} from "@/lib/auth";

export async function login(prevState:{message:string;}, formData: FormData) {
    const user = {email: formData.get("email")};
    const expires = new Date(Date.now() + await validEndurance());
    const session = await encrypt({user, expires})
    const result = await db.execute(sql`SELECT "check_password"(${formData.get('email')},${formData.get('password')})`)
    const valid = result.rows[0].check_password;
    if(!valid)return {"message":"Invalid email or password!"};
    cookies().set('session', session, {expires, httpOnly: true});
    redirect('/dashboard');
}
