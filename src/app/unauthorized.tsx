import Link from "next/link";
import {Button, Card, CardBody, CardFooter, CardHeader, Divider} from "@nextui-org/react";

export default function Unauthorized() {
    return (
        <main className="h-screen flex justify-center items-center">
            <Card>
                <CardHeader>401 - Unauthorized</CardHeader>
                <Divider />
                <CardBody>
                    <p>
                        Please log in to access this page.
                    </p>
                </CardBody>
                <Divider />
                <CardFooter>
                    <Link href="/dashboard">
                        返回主页
                    </Link>
                </CardFooter>
            </Card>
        </main>
    )
}