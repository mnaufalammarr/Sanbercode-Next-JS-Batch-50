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
  Spinner,
} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes() {
  const { mutate } = useMutation();
  const { data, isLoading } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/notes",
  });
  const router = useRouter();
  // const [Notes, setNotes] = useState([]);
  const HandleDelete = async (id) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
      method: "DELETE",
    });
    if (response?.success) {
      router.reload();
    }
    // try {
    //   const response = await fetch(
    //     `https://paace-f178cafcae7b.nevacloud.io/api/notes/delete/${id}`,
    //     {
    //       method: "DELETE",
    //     }
    //   );
    //   const result = await response.json();
    //   if (result?.success) {
    //     router.reload();
    //   }
    // } catch (error) {}

  };
  // useEffect(() => {
  //   async function fetchingData() {
  //     const res = await fetch(
  //       "https://paace-f178cafcae7b.nevacloud.io/api/notes"
  //     );
  //     const listNotes = await res.json();

  //     setNotes(listNotes.data);
  //   }
  //   fetchingData();
  // }, []);
  // console.log(data);
  // if (isLoading) {
  //   return (
  //     <>
  //       <Flex justifyContent="center" alignItems="center" height="100vh">
  //         <Spinner
  //           thickness="4px"
  //           speed="0.65s"
  //           emptyColor="gray.200"
  //           color="blue.500"
  //           size="xl"
  //         />
  //       </Flex>
  //     </>
  //   );
  // }
  return (
    <div>
      <LayoutComponent
        metaTitle="Notes"
        metaDescription="Ini adalah halaman Notes"
      >
        <Box padding="5">
          <Flex justifyContent="end">
            <Button
              colorScheme="blue"
              onClick={() => router.push("/notes/add")}
            >
              Add Note
            </Button>
          </Flex>
          {isLoading ? (  
                  <Flex justifyContent="center" alignItems="center">
          <Spinner
            thickness="4px"
            speed="0.65s"
            emptyColor="gray.200"
            color="blue.500"
            size="xl"
          />
        </Flex>) 
  : (
          <Flex>
            <Grid
              templateColumns="repeat(3, 1fr)"
              gap={6}
              w="100%"
              p={5}
              m="auto"
            >
              {data?.map((note) => (
                <GridItem key={note.id}>
                  <Card>
                    <CardHeader>
                      <Text fontSize="xl" fontWeight="bold">
                        {note.title}
                      </Text>
                    </CardHeader>
                    <CardBody>
                      <Text>{note.description}</Text>
                    </CardBody>
                    <CardFooter>
                      <Button
                        onClick={() => router.push(`/notes/edit/${note.id}`)}
                        flex="1"
                        variant="ghost"
                      >
                        Edit
                      </Button>
                      <Button
                        onClick={() => HandleDelete(note?.id)}
                        flex="1"
                        colorScheme="red"
                      >
                        Delete
                      </Button>
                    </CardFooter>
                  </Card>
                </GridItem>
              ))}
            </Grid>
          </Flex>
  )}
        </Box>
      </LayoutComponent>
    </div>
  );
}

// export async function getStaticProps() {
//   const res = await fetch("https://paace-f178cafcae7b.nevacloud.io/api/notes");
//   const notes = await res.json();
//   return {
//     props: { notes },
//     revalidate : 10,
//   };
// }
