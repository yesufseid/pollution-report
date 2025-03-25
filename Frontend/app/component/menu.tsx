"use client"
import MenuIcon from '@mui/icons-material/Menu';
import MenuOpenIcon from '@mui/icons-material/MenuOpen';
import { useState } from "react"
import Link from "next/link"
import styled from "styled-components";


const Section=styled.div`

  @media only screen and (min-width: 600px) {
 height:100vh;
}

`
const link=[{name:'Home',link:'/'},{name:'Facilties',link:'/facilities'},{name:'Rooms',link:'/rooms'},
    {'name':'Contact-Us','link':'/contact-us'}]
export default function Menu() {
    const [open,setOpen]=useState(false)
  return (
    <Section className="w-fit flex md:hidden  overflow-scroll   " >
        {open?<MenuOpenIcon className="w-14 h-14 text-black z-50" onClick={()=>setOpen(false)} /> :<MenuIcon className="w-14 h-14 text-black" onClick={()=>setOpen(true)}  />}     
    
     <div  onClick={()=>setOpen(false)} className={` top-0 left-0 w-full absolute z-50 h-full overflow-y-auto bg-transparent  ${open?'translate-x-0 transition-all duration-300':'-translate-x-[320px] transition-all duration-300'}`}>
        <div className="bg-white flex flex-col justify-center gap-10  w-[320px] h-screen">
     {link.map((links)=>{
                return(
                   <Link key={links.name} scroll={false}  onClick={()=>setOpen(false)} className="border-2 w-32 mx-auto rounded-lg text-center  font-semibold border-logo hover:bg-logo px-2 py-2" 
                    href={links.link}   >{links.name}</Link>
                )
            })}
            </div> 
     </div>
    </Section>
  )
}
