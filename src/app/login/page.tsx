import {CardBody,Card,CardHeader,Divider} from "@nextui-org/react";
import LoginForm from "@/ui/components/login/LoginForm";
import {sans} from "@/ui/fonts";


export default async function () {
    return (
        <div className={`flex flex-col place-items-center place-content-center shadow-lg rounded-lg h-screen ${sans.className} antialiased`}>
            <Card>
                <CardHeader>
                    请登录
                </CardHeader>
                <Divider/>
                <CardBody>
                    <LoginForm/>
                </CardBody>
            </Card>
        </div>
    )
}