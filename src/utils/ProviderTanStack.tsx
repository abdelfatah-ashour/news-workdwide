"use client";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { PropsWithChildren, useState } from "react";

export function ProviderTanStack({ children }: PropsWithChildren) {
  const [client] = useState(
    new QueryClient({
      defaultOptions: { queries: { staleTime: 5000 } },
    })
  );

  return <QueryClientProvider client={client}>{children}</QueryClientProvider>;
}
