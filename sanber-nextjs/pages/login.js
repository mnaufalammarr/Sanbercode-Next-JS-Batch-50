import {Flex , Stack , Heading , FormControl , FormLabel , Input, Button , useToast} from "@chakra-ui/react"
import {useState} from "react"
import { useMutation } from "@/hooks/useMutation"
import Cookies from "js-cookie"
import { useRouter } from "next/router"


export default function Login() {
    const router = useRouter()
    const toast = useToast()
    const mutate = useMutation({})
    const {payload , setPayload} = useState({
        email: "",
        password: ""
    })

    const handleSubmmit = async () => {
        const response = await mutate({url:"https://https://paace-f178cafcae7b.nevacloud.io/api/login",payload});
        if(!response?.success){
            toast({
                title: "Login Gagal",
                description: "Email dan Password tidak sesuai",
                status: "error",
                duration: 2000,
                isClosable: true,
                position: "top"
            })
        }else{
            Cookies.set("user_token", response?.data?.token,{
                expires: new Date(response?.data?.expires_at),
                path: "/"
            })
            router.push("/")
        }
    return(
        <Flex alignItems="center" justifyContent="center">
            <Stack direction="column">
                <Heading as="h4">Login</Heading>
                <FormControl>
                    <FormLabel>Email</FormLabel>
                    <Input type="text" placeholder="Email" value={payload.email} onChange={(event) => setPayload({
                        ...payload,
                        email: event.target.value
                    })} />
                </FormControl>
                <FormControl>
                    <FormLabel>Password</FormLabel>
                    <Input type="password" placeholder="Password" value={payload.password} onChange={(event) => setPayload({
                        ...payload,
                        password: event.target.value
                    })}/>
                </FormControl>
                <FormControl>
                    <Button onSubmit={() => handleSubmmit()}>Submit</Button>
                </FormControl>
            </Stack>
        </Flex>
    )
}
}