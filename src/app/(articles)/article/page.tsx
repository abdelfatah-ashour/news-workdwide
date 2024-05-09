import getQueryClient from "@/utils/getQueryClient";
import { dehydrate, HydrationBoundary } from "@tanstack/react-query";
import { Metadata } from "next";
import ArticleDetails from "../_components/ArticleDetails";
import { getArticleBySlug } from "./action";

type Props = {
  searchParams: Record<string, string>;
};

export async function generateMetadata({
  searchParams,
}: Props): Promise<Metadata> {
  const articles = await getArticleBySlug(decodeURIComponent(searchParams.q));

  return {
    title: articles?.articles[0]?.title || "Article",
    description: articles?.articles[0]?.description || "Article",
    keywords:
      articles?.articles[0]?.title.split(" ").join(", ").toString() ||
      "Article",
    openGraph: {
      images: [articles?.articles[0]?.urlToImage || ""],
    },
  };
}

export default async function Page(Props: Props) {
  const articles = await getArticleBySlug(
    decodeURIComponent(Props.searchParams.q)
  );

  const queryClient = getQueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["article"],
    queryFn: () => getArticleBySlug(decodeURIComponent(Props.searchParams.q)),
    initialData: articles.articles[0] || [],
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container min-h-screen">
        <ArticleDetails
          slug={decodeURIComponent(Props.searchParams.q)}
          articles={articles.articles || null}
        />
      </main>
    </HydrationBoundary>
  );
}
