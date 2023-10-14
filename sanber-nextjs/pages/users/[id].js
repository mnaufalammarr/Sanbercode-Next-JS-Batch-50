import Layout from "@/layout";
import { useRouter } from "next/router";

export default function UserByName() {
    const router = useRouter();
    const { id } = router.query; 
    return (
    <div>
      <Layout
        metaTitle="User By Name"
        metaDescription="Semua informasi ini adalah seputar User By Name"
      >
        <h1>User By Name</h1>
        <p>Hi! {id}</p>
      </Layout>
    </div>
  );
}
