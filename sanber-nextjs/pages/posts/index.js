import dynamic from "next/dynamic";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Posts({posts}){
return(
    <div>
        <LayoutComponent
            metaTitle="Posts"
            metaDescription="Ini adalah halaman Posts"
        >
            {
                posts.map((post) => (
                    <div key={post.id}>
                        <h1>Title :{post.title}</h1>
                        <p>Body : {post.body}</p>
                    </div>
                ))
            }
        </LayoutComponent>
    </div>
)
}

export async function getServerSideProps() {
    const res = await fetch("https://jsonplaceholder.typicode.com/posts")
    const posts = await res.json()
    return { props: { posts } }
  }
   