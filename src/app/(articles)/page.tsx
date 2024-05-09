import { getArticles } from "@/app/(articles)/action";
import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import ArticlesList from "./_components/ArticlesList";

export const metadata: Metadata = {
  title: "Top headlines",
  description: "Top headlines",
};

export default async function Home() {
  const articles = await getArticles();
  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["all-articles"],
    queryFn: getArticles,
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container min-h-screen">
        <ArticlesList articles={articles?.articles || null} />
      </main>
    </HydrationBoundary>
  );
}
