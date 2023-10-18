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

const LayoutComponent = dynamic(() => import("@/layout"));

export default function AddNotes() {
  const router = useRouter();
  const [Notes, setNotes] = useState({
    title: "",
    description: "",
  });

  const HandleSubmit = async (event) => {
    try {
      const response = await fetch(
        "https://paace-f178cafcae7b.nevacloud.io/api/notes",{
          method: "POST",
          body: JSON.stringify(Notes),
          headers: {
            "Content-Type": "application/json",
          },
        }
      )
      const result = await response.json();
      if(result?.success){
        router.push("/notes")
      }
    } catch (error) {
      
    }
  }
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
                }
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
                }
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
