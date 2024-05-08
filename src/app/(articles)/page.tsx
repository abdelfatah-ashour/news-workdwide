import { getArticles } from "@/services/ArticleApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ArticlesList from "./_components/ArticlesList";

export default async function Home() {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-articles"],
    queryFn: getArticles,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container min-h-screen">
        <ArticlesList />
      </main>
    </HydrationBoundary>
  );
}
