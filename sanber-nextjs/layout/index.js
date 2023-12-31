import Head from "next/head"
import Header from "@/components/header"
import Footer from "@/components/footer"

export default function Layout({children , metaTitle ,metaDescription}) {
return (
<div>
<Head>
<title>Create Next App - ${metaTitle}</title>
<meta name="viewport" content={metaDescription || "Generated by create Next App"} />
<meta name="description" content="Web site created using create-Next-app" />
<link rel="icon" href="/favicon.ico" />
</Head>
<Header />
{children}
<Footer />
</div>
)
}