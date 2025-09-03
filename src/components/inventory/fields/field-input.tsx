"use client"
import { Flex, TextField } from '@radix-ui/themes'



export function InventoryFieldInput() {
  return (
    <Flex direction="column" style={{ width: '100%' }}>
      <TextField.Root size="3">
      </TextField.Root>
    </Flex>
  )
}
