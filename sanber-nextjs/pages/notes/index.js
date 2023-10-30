import dynamic from "next/dynamic";
import createNotesModal from "@/components/buttons/create";
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
  AlertDialog,
  AlertDialogBody,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogContent,
  AlertDialogOverlay,
  AlertDialogCloseButton,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  FormControl,
  FormLabel,
  Input,
  Textarea,

} from "@chakra-ui/react";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import { useQueries } from "@/hooks/useQueries";
import { useMutation } from "@/hooks/useMutation";
import { useDisclosure } from "@chakra-ui/react";
import useSWR from "swr";
import fetcher from "@/utils/fetcher";

const LayoutComponent = dynamic(() => import("@/layout"));

export default function Notes({ notes }) {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { mutate } = useMutation();
  // const { data, isLoading } = useQueries({
  //   prefixUrl: "",
  // });
  // const { data, error, isLoading } = useSWR("https://paace-f178cafcae7b.nevacloud.io/api/notes", fetcher , {revalidateOnFocus: true})
  const router = useRouter();
  // const [Notes, setNotes] = useState([]);
  const [Notes, setNotes] = useState({
    title: "",
    description: "",
  });
  const HandleUpdate = async (event) => {
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
    }}
  const HandleSubmit = async (event) => {
    const response = await mutate({
      url: `https://paace-f178cafcae7b.nevacloud.io/api/notes`,
      method: "POST",
      payload: Notes
    })
    if(response?.success){
      router.push("/notes")
    }
  }
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
          <Button onClick={onOpen}>Add Notes</Button>
          <Modal

        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                onChange={(event) =>
                  setNotes({
                    ...Notes,
                    title: event.target.value,
                  })
                }
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                onChange={(event) =>
                  setNotes({
                    ...Notes,
                    description: event.target.value,
                  })
                }
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme="blue" onClick={()=> HandleSubmit()}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
          </Flex>
          {!notes ? (
            <Flex justifyContent="center" alignItems="center">
              <Text fontSize="xl" fontWeight="bold">
                Data Not Found
              </Text>
            </Flex>
          ) : (
            <Flex>
              <Grid
                templateColumns="repeat(3, 1fr)"
                gap={6}
                w="100%"
                p={5}
                m="auto"
              >
                {notes?.data?.map((note) => (
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
                      <Button onClick={onOpen}>Add Notes</Button>
          <Modal

        isOpen={isOpen}
        onClose={onClose}
      >
        <ModalOverlay />
        <ModalContent>
          <ModalHeader>Create your account</ModalHeader>
          <ModalCloseButton />
          <ModalBody pb={6}>
            <FormControl>
              <FormLabel>Title</FormLabel>
              <Input
                onChange={(event) =>
                  setNotes({
                    ...Notes,
                    title: event.target.value,
                  })
                } value={note?.title || ""}
              />
            </FormControl>

            <FormControl mt={4}>
              <FormLabel>Description</FormLabel>
              <Textarea
                onChange={(event) =>
                  setNotes({
                    ...Notes,
                    description: event.target.value,
                  } )
                } value={note?.description || ""}
              />
            </FormControl>
          </ModalBody>

          <ModalFooter>
          <Button colorScheme="blue" onClick={()=> HandleUpdate()}>Save</Button>
            <Button onClick={onClose}>Cancel</Button>
          </ModalFooter>
        </ModalContent>
      </Modal>
                        {/* <Button
                        onClick={() => HandleDelete(note?.id)}
                        flex="1"
                        colorScheme="red"
                      >
                        Delete
                      </Button> */}
                        <Button colorScheme="red" onClick={onOpen}>
                          Delete
                        </Button>
                        <AlertDialog isOpen={isOpen} onClose={onClose}>
                          <AlertDialogOverlay>
                            <AlertDialogContent>
                              <AlertDialogHeader
                                fontSize="lg"
                                fontWeight="bold"
                              >
                                Delete Customer
                              </AlertDialogHeader>

                              <AlertDialogBody>
                                Are you sure? You can't undo this action
                                afterwards.
                              </AlertDialogBody>

                              <AlertDialogFooter>
                                <Button onClick={onClose}>Cancel</Button>
                                <Button
                                  colorScheme="red"
                                  onClick={() => HandleDelete(note.id)}
                                  ml={3}
                                >
                                  Delete
                                </Button>
                              </AlertDialogFooter>
                            </AlertDialogContent>
                          </AlertDialogOverlay>
                        </AlertDialog>
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

export async function getStaticProps() {
  const res = await fetch("http://localhost:3000/api/notes");
  const notes = await res.json();


  return {
    props: { notes, notFound: false },
    revalidate: 10,
  };
}
