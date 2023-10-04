import Head from "next/head";
import Header from "@/components/header";
import Footer from "@/components/footer";

export default function Home() {
 return (
  <div>
   <Head>
    <title>{`Create Next App `}</title>
  
    <link rel="icon" href="/favicon.ico" />
   </Head>
   <Header />
   <p >Content</p>
   <Footer />
  </div>
 );
}