'use server'
import 'server-only'
import {cookies} from "next/headers";
import {SignJWT, jwtVerify} from 'jose';
import {redirect} from "next/navigation";
import {connection, NextRequest, NextResponse} from "next/server";

const key = new TextEncoder().encode(process.env.AUTH_SECRET)

export async function validEndurance() {
    return 1000 * 60 * 60
}

export async function encrypt(payload: any) {
    return await new SignJWT(payload)
        .setProtectedHeader({alg: 'HS256'})
        .setIssuedAt()
        .setExpirationTime('1 hour from now')
        .sign(key);
}

export async function decrypt(input: string): Promise<any> {
    const {payload} = await jwtVerify(input, key, {
        algorithms: ['HS256'],
    });
    return payload;
}

export async function logout() {
    cookies().then((cookies)=> cookies.set('session', '', {expires: new Date(0)}))
    redirect('/login');
}

export async function getSession() {
    const session =await  cookies().then(cookies=>cookies.get('session')?.value)
    if (!session) return null
    return await decrypt(session);
}

export async function updateSession(request: NextRequest){
    console.debug('update session');
    const session = request.cookies.get('session')?.value;
    if(!session)return
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + await validEndurance());
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly:true,
        expires: parsed.expires,
    })
    return res;
}
