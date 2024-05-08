import { getArticleBySlug } from "@/services/ArticleApi";
import {
  dehydrate,
  HydrationBoundary,
  QueryClient,
} from "@tanstack/react-query";
import ArticleDetails from "../_components/ArticleDetails";

type Props = {
  params: {
    slug: string;
  };
  searchParams: Record<string, string>;
};
export default async function Page(Props: Props) {
  const queryClient = new QueryClient();

  await queryClient.prefetchQuery({
    queryKey: ["article"],
    queryFn: () => getArticleBySlug(decodeURIComponent(Props.searchParams.q)),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <main className="container min-h-screen">
        <ArticleDetails slug={decodeURIComponent(Props.searchParams.q)} />
      </main>
    </HydrationBoundary>
  );
}
