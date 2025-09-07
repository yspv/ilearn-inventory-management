import { Card, DataList, Heading } from "@radix-ui/themes";

export function InventoryStatsNumericField(props: {
  field: string;
  max: number;
  min: number;
  avg: number;
}) {
  const { field, max, min, avg } = props;
  return (
    <Card size="3">
      <Heading size="4">{field}</Heading>
      <DataList.Root mt="4" size="3">
        <DataList.Item>
          <DataList.Label>Max</DataList.Label>
          <DataList.Value>{max}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Min</DataList.Label>
          <DataList.Value>{min}</DataList.Value>
        </DataList.Item>
        <DataList.Item>
          <DataList.Label>Avg</DataList.Label>
          <DataList.Value>{Math.floor(avg)}</DataList.Value>
        </DataList.Item>
      </DataList.Root>
    </Card>
  );
}
