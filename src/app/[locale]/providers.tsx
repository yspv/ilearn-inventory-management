"use client";
import { trpc } from "@/lib/trpc";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { httpBatchLink } from "@trpc/client";
import superjson from "superjson";
import React from "react";
import { SessionProvider } from "next-auth/react";
import { ThemeProvider } from "next-themes";
import { Theme } from "@radix-ui/themes";

export default function Providers(props: React.PropsWithChildren) {
  const { children } = props;
  const [queryClient] = React.useState(() => new QueryClient());
  const [trpcClient] = React.useState(() =>
    trpc.createClient({
      links: [
        httpBatchLink({
          url: "/api/trpc",
          transformer: superjson,
          fetch(url, options) {
            return fetch(url, { ...options });
          },
        }),
      ],
    }),
  );
  return (
    <ThemeProvider attribute="class">
      <Theme>
        <trpc.Provider client={trpcClient} queryClient={queryClient}>
          <QueryClientProvider client={queryClient}>
            <SessionProvider>{children}</SessionProvider>
          </QueryClientProvider>
        </trpc.Provider>
      </Theme>
    </ThemeProvider>
  );
}
