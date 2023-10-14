// import Layout from "@/layout";
// import Image from "next/image";
import { useEffect } from "react";
import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("Response => ", res))
      .catch((err) => console.log("Error => ", err));
  }, []);
  return (
    <div>
      <LayoutComponent metaTitle="Home" metaDescription="Ini adalah halaman Home">
        <h1>Home</h1>
        <p>Ini adalah halaman Home</p>
        {/* <Image src="/next.png" width={400} height={400} alt="NextJS" />
        <img
          src="/next.png"
          style={{ width: 400, height: 400 }}
          alt="next img"
        /> */}
      </LayoutComponent>
    </div>
  );
}
