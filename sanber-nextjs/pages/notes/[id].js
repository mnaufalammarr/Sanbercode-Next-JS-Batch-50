import dynamic from "next/dynamic"

const LayoutComponent = dynamic(() => import("@/layout"))

export default function DetailNotes({notes}){
    return (
        <div>
            <LayoutComponent
                metaTitle="Detail Notes"
                metaDescription="Ini adalah halaman Detail Notes"
            >
                
                <h1>Title : {notes.data.title}</h1>
                <h1>Desc : {notes.data.description}</h1>
            </LayoutComponent>
        </div>
    )
};

export async function getStaticPaths() {
    const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
    const notes = await res.json();

    const paths = notes.data.map((note) => ({
        params: { id: note.id },
    }))
    return {
      paths,
      fallback: false, // false or "blocking"
    }
  }
   
  export async function getStaticProps(context) {
    const { id } = context.params;
    const res = await fetch(`https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`);
    const notes = await res.json();
    return {
      props: { notes },
      revalidate : 10,
    };
  }
  
