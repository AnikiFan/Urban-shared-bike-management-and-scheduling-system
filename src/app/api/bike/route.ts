export async function POST(request: Request) {
    const formData = await request.formData()
    const name = formData.get('name')
    const email = formData.get('email')
    console.log(name,email)
    return Response.json({ name, email })
}