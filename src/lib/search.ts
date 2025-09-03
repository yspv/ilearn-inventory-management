import TypesenseInstantSearchAdapter from "typesense-instantsearch-adapter";
import Typesense from "typesense";

export const typesense = new Typesense.Client({
  apiKey: "bx7D48M8rNYNez0OdyAaLpHE62c2jhGR",
  nodes: [
    {
      host: "4r9awqhjftzn5c6yp-1.a1.typesense.net",
      port: 443,
      protocol: "https",
    },
  ],
});

const adapter = new TypesenseInstantSearchAdapter({
  server: {
    apiKey: "bx7D48M8rNYNez0OdyAaLpHE62c2jhGR",
    nodes: [
      {
        host: "4r9awqhjftzn5c6yp-1.a1.typesense.net",
        port: 443,
        protocol: "https",
      },
    ],
  },
  additionalSearchParameters: {
    query_by: "name",
  },
});

export const searchClient = adapter.searchClient;
