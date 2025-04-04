"use client"
import dynamic from "next/dynamic";

const HomeClient = dynamic(() => import("./component/HomeClient"), { ssr: false });


export default function Home() {
  return (
    <div>
        <HomeClient />
      </div>
  );
}

