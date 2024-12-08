import Logo from '@/ui/logo';
import { ArrowRightIcon } from '@heroicons/react/24/outline';
import Link from 'next/link';
import {sans} from "@/ui/fonts";
import Image from "next/image";
export default function WelcomePage() {
  return (
    <main className="flex min-h-screen flex-col p-6">
      <div className="h-52 rounded-lg bg-blue-500 p-4">
         <Logo />
      </div>
      <div className="mt-4 flex grow gap-4 flex-row">
        <div className="flex flex-col justify-center gap-6 rounded-lg bg-gray-50 py-10 w-2/5 px-20">
          <p className={`text-gray-800 text-4xl leading-normal ${sans.className} antialiased`}>
            <strong >欢迎登录城市共享单车管理与调度平台</strong>
          </p>
          <Link
            href="/login"
            className="flex items-center gap-5 self-start rounded-lg bg-blue-500 px-6 py-3  font-medium text-white transition-colors hover:bg-blue-400 text-xl"
          >
            <span>Log in</span> <ArrowRightIcon className="w-7" />
          </Link>
        </div>
        <div className="flex items-center justify-center p-6 w-3/5 px-28 py-12">
            <Image src="/hero-desktop.png" alt="Screenshots" className="hidden md:block" width={1000} height={760} />
        </div>
      </div>
    </main>
  );
}
