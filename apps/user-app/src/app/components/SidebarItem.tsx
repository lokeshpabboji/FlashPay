"use client"
import { usePathname, useRouter } from "next/navigation";
import { ReactNode } from "react";

export default function SidebarItem({href, title, icon} : {href : string, title : string, icon : ReactNode}){
    const router = useRouter();
    const pathname = usePathname();
    const selected = href === pathname
    
    return (
        <div className={`flex ${selected ? "text-indigo-700" : "text-slate-500"} hover:text-indigo-500 cursor-pointer p-2`} onClick={() => {
            router.push(href);
        }}>
            <div className="pr-2">
                {icon}
            </div>
            <div className="font-bold">
                {title}
            </div>
        </div>
    )
}