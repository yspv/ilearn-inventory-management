import { typesense } from "@/lib/search";
import { useQuery } from "@tanstack/react-query";

export function useSearch<T extends Record<string, any>>(props: {
  collection: string;
  search: {
    q: string;
    query_by: string;
    limit_hits: number;
  };
}) {
  const { collection, search } = props;
  return useQuery({
    queryKey: ["search", collection],
    queryFn: async () => {
      const { hits } = await typesense
        .collections<T>(collection)
        .documents()
        .search(search);
      return hits?.map((h) => h.document);
    },
    enabled: !!search.q,
  });
}
