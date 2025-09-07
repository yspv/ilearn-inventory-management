import { Card, Heading, Inset } from "@radix-ui/themes";

export function InventoryStatsStringField(props: {
  field: string;
  topValues: string[];
}) {
  const { field, topValues } = props;
  return (
    <Card size="3">
      <Heading size="4">{field}</Heading>
      <Inset mt="4">
        <ul>
          {topValues.map((v, i) => (
            <li key={i}>{v}</li>
          ))}
        </ul>
      </Inset>
    </Card>
  );
}
