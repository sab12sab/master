import { GalleryVerticalEnd,User2 } from "lucide-react"
import { Activity } from 'lucide-react';

import { Loginfom2 } from "@/components/Login_form2";

export default function Login() {
  return (
    <div className="grid min-h-svh lg:grid-cols-2">
      <div className="flex flex-col gap-4 p-6 md:p-10">
       
        <div className="flex flex-1 items-center justify-center">
          <div className="w-full max-w-xs">
            <Loginfom2></Loginfom2>
          </div>
        </div>
      </div>
      <div className="relative hidden bg-muted lg:block">
        <img
          src="golden_spark/chunky_bracelet/1.jpg"
          alt="Image"
          className="absolute inset-0 h-full w-full object-cover dark:brightness-[0.2] dark:grayscale"
        />
      </div>
    </div>
  )
}
