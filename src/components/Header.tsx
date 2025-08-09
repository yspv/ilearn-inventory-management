"use client"
import { Button, Flex } from "@radix-ui/themes";
import { signOut } from "next-auth/react";







export default function Header() {
  const handleSignOut = async () => {
    await signOut()
  }
  return (
    <Flex justify={'between'} align={'center'}>
      <Button onClick={handleSignOut}>Logout</Button>
    </Flex>
  )
}
