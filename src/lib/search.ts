import Typesense from "typesense";

export const typesense = new Typesense.Client({
  apiKey: process.env.TYPESENSE_KEY!,
  nodes: [
    {
      host: process.env.TYPESENSE_URL!,
      port: 443,
      protocol: "https",
    },
  ],
});
