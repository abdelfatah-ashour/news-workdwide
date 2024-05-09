"use client";

import { Article } from "@/@types/model";
import { getArticles } from "@/app/(articles)/action";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "./ArticleCard";

export default function ArticlesList({
  articles,
}: {
  articles: Article[] | null;
}) {
  const { data, isLoading, isError, error } = useQuery({
    queryKey: ["all-articles"],
    queryFn: getArticles,
    initialData: { articles: articles || [] },
  });

  if (isError) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        Something went wrong.
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex justify-center items-center w-full h-full">
        loading...
      </div>
    );
  }

  if (data?.articles && !isLoading && !isError) {
    return (
      <section>
        <h3 className="capitalize text-xl font-semibold py-10">
          top headlines
        </h3>
        <div className="grid grid-cols-12 gap-6">
          {data?.articles
            .filter(
              (article) =>
                article.author &&
                article.urlToImage &&
                article.url &&
                /[remoaved]/.test(article.title) === true
            )
            .map((article) => {
              return (
                <div
                  key={article.title}
                  className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3"
                >
                  <ArticleCard article={article} />
                </div>
              );
            })}
        </div>
      </section>
    );
  }
}
