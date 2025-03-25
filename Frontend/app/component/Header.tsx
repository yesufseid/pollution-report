'use client'

import Link from "next/link"
import { usePathname } from 'next/navigation'
import Menu from "./menu"

const link=[{'name':'Home','link':'/'},{'name':'Reports','link':'/Reports'},{'name':'About-us','link':'/About'},
    {'name':'Contact-Us','link':'/contact-us'}]
export default function Nav() {
   const pathname=usePathname()
  return (
    <div className="flex  justify-between mx-2 md:mx-20 items-center">
        <div className="w-40 h-24 rounded-b-3xl bg-logo">
             <h1 className="text-2xl font-serif font-semibold mb-0 p-0 text-center mt-4">Pollution</h1>
             <p  className="text-center text-sm p-0 m-0 font-serif font-thin ">Report</p>
        </div>
        <div className="hidden   md:flex gap-10 ">
            {link.map((links)=>{
                return(
                   <Link scroll={false} key={links.name}  className={`link ${pathname === links.link ? 'underline  text-black font-serif font-semibold  ' : 'text-black font-serif font-semibold'}`}
                    href={links.link}   >{links.name}</Link>
                )
            })} 
        </div> 
        <Menu />
  </div>  
  )
}
 