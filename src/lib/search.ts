import Typesense from "typesense";

export const typesense = new Typesense.Client({
  apiKey: process.env.NEXT_PUBLIC_TYPESENSE_KEY!,
  nodes: [
    {
      host: process.env.NEXT_PUBLIC_TYPESENSE_URL!,
      port: 443,
      protocol: "https",
    },
  ],
});
