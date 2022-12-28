import React from "react";
import { QueryClient, QueryClientProvider } from "react-query";
import { MyTable } from "./MyTable.js";

const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false
    }
  }
});

export default function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <MyTable />
    </QueryClientProvider>
  );
}
