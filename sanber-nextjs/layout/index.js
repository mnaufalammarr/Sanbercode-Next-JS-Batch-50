import Head from "next/head"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Layout({children}) {
return (
<div>
<Head>
<title>{`Create Next App `}</title>
<meta name="viewport" content="initial-scale=1.0, width=device-width" />
<meta name="description" content="Web site created using create-Next-app" />
<link rel="icon" href="/favicon.ico" />
</Head>
<Header />
{children}
<Footer />
</div>
)
}