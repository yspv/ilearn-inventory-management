"use client";
import { DataList, Grid } from "@radix-ui/themes";

interface Props {
  total: number;
}

export function InventoryStatsView(props: Props) {
  const { total } = props;
  return (
    <Grid>
      <DataList.Root size="3">
        <DataList.Item>
          <DataList.Label>Total</DataList.Label>
          <DataList.Value>{total}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Grid>
  );
}
