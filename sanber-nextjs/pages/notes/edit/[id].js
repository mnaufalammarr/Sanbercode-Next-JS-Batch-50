import dynamic from "next/dynamic";
import {
  Box,
  Flex,
  Grid,
  GridItem,
  Card,
  CardBody,
  CardHeader,
  CardFooter,
  Text,
  Button,
  Heading,
  Input,
  Textarea,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function EditNotes() {
  const { mutate } = useMutation();
  const router = useRouter();
  const { id } = router.query;
  const [Notes, setNotes] = useState();

  const HandleSubmit = async (event) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,
      method: "PATCH",
      payload: {
        title: Notes?.title,
        description: Notes?.description,
      }
    })
    if(response?.success){
      router.push("/notes")
    }
    // try {
    //   const response = await fetch(
    //     `https://paace-f178cafcae7b.nevacloud.io/api/notes/update/${id}`,{
    //       method: "PATCH",
    //       body: JSON.stringify({
    //         title: Notes?.title,
    //         description: Notes?.description,
    //       }),
    //       headers: {
    //         "Content-Type": "application/json",
    //       },
    //     }
    //   )
    //   const result = await response.json();
    //   if(result?.success){
    //     router.push("/notes")
    //   }
    // } catch (error) {
      
    // }
  }
  useEffect(() => {
    async function fetchingData() {
      const res = await fetch(
        `https://paace-f178cafcae7b.nevacloud.io/api/notes/${id}`
      );
      const listNotes = await res.json();

      setNotes(listNotes?.data);
    }
    fetchingData();
  }, [id]);
  return (
    <div>
      <LayoutComponent
        metaTitle="Notes"
        metaDescription="Ini adalah halaman Notes"
      >
        <Card margin="5" padding="5">
          <Heading>Add Notes</Heading>
          <Grid gap="5">
            <GridItem>
              <Text>Title</Text>
              <Input
                onChange={(event) =>
                  setNotes({
                    ...Notes,
                    title: event.target.value,
                  })
                } value={Notes?.title || ""}
              />
            </GridItem>
            <GridItem>
              <Text>Description</Text>
              <Textarea
                onChange={(event) =>
                  setNotes({
                    ...Notes,
                    description: event.target.value,
                  })
                } value={Notes?.description || ""}
              />
            </GridItem>
            <GridItem>
              <Button colorScheme="blue" onClick={()=> HandleSubmit()}>Save</Button>
            </GridItem>
          </Grid>
        </Card>
      </LayoutComponent>
    </div>
  );
}
