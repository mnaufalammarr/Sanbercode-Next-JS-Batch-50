import dynamic from "next/dynamic";
import Link from "next/link";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ notes }) {
  console.log(notes);
  return (
    <div>
      <LayoutComponent
        metaTitle="Notes"
        metaDescription="Ini adalah halaman Notes"
      >
        {
            notes.data.map((note) => (
                <Link href={`/notes/${note.id}`} key={note.id}>
                   
                        <h1>{note.title}</h1>
                   
                </Link>
            
            ))
        }
      </LayoutComponent>
    </div>
  );
}

export async function getStaticProps() {
  const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
  const notes = await res.json();
  return {
    props: { notes },
    revalidate : 10,
  };
}
