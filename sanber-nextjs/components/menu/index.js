import Link from "next/link";
import {Menu , MenuButton , MenuList , MenuItem , Button} from "@chakra-ui/react"
import {ChevronDownIcon} from "@chakra-ui/icons"
import { useQueries } from "@/hooks/useQueries";
import {Cookies} from "js-cookie"
import { useMutation } from "@/hooks/useMutation";
import { useRouter } from "next/router";

export default function Menu() {
  const router = useRouter();
  const {mutate} = useMutation();
  const {  } = useQueries({
    prefixUrl: "https://paace-f178cafcae7b.nevacloud.io/api/user/me",
    headers:{
      Authorization: `Bearer ${Cookies.get("user_token")}`
    }
  });

  const handleLogOut = async () => {
    const response = await mutate({
      url: "https://paace-f178cafcae7b.nevacloud.io/api/logout",
      method: "GET",
      headers:{
        Authorization: `Bearer ${Cookies.get("user_token")}`
      }
    })
    if(
      response?.success
    ){
      Cookies.remove("user_token")
      router.push("/login")
  }
  return (
    <div>
      <ul>
        <li>
          <Link href="/">Home</Link>
        </li>
        <li>
          <Link href="/profile">Profile</Link>
        </li>
        <li>
          <Link href="/users">User</Link>
        </li>
        <li>
          <Link href="/users/detail">User Detail</Link>
        </li>
        <li>
          <Link href="/notes">Notes</Link>
        </li>
        <li>
          <Menu>
            <MenuButton as={Button} rightIcon={<ChevronDownIcon/>}>
            {data?.data?.name}
            </MenuButton>
            <MenuList>
              <MenuItem onClick={()=>handleLogOut()}>Logout</MenuItem>
            </MenuList>
          </Menu>
        </li>
      </ul>
    </div>
  );
}
}
