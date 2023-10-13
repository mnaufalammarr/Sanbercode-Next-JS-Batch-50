import Layout from "@/layout";
import { useEffect } from "react";

export default function Home() {
  useEffect(() => {
    fetch("/api/hello")
      .then((res) => res.json())
      .then((res) => console.log("Response => ", res))
      .catch((err) => console.log("Error => ", err));
  }, []);
  return (
    <div>
      <Layout metaTitle="Home" metaDescription="Ini adalah halaman Home">
        <h1>Home</h1>
        <p>Ini adalah halaman Home</p>
      </Layout>
    </div>
  );
}
