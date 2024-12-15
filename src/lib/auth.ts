'use server'
import {cookies} from "next/headers";
import {SignJWT,jwtVerify} from 'jose';
import {NextRequest,NextResponse} from "next/server";
import {redirect} from "next/navigation";

const key = new TextEncoder().encode(process.env.AUTH_SECRET)
const validEndurance = 1000*60*60

async function encrypt(payload:any){
    return await new SignJWT(payload)
        .setProtectedHeader({alg:'HS256'})
        .setIssuedAt()
        .setExpirationTime('1 hour from now')
        .sign(key);
}

async function decrypt(input:string):Promise<any>{
    const {payload} = await jwtVerify(input,key,{
        algorithms:['HS256'],
    });
    return payload;
}

export async function  login(formData:FormData) {
    const user={email:formData.get("email")};
    const expires = new Date(Date.now() + validEndurance);
    const session = await encrypt({user,expires})
    cookies().set('session',session,{expires,httpOnly:true});
    redirect('/dashboard');
}

export async function logout() {
    cookies().set('session','',{expires:new Date(0)})
    redirect('/login');
}

export async function getSession(){
    const session = cookies().get('session')?.value;
    if(!session)return null
    return await decrypt(session);
}

export async function updateSession(request: NextRequest){
    console.log('update session');
    const session = request.cookies.get('session')?.value;
    if(!session)return
    const parsed = await decrypt(session);
    parsed.expires = new Date(Date.now() + validEndurance);
    const res = NextResponse.next();
    res.cookies.set({
        name: 'session',
        value: await encrypt(parsed),
        httpOnly:true,
        expires: parsed.expires,
    })
    return res;
}