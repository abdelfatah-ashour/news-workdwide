"use client";

import { getArticles } from "@/services/ArticleApi";
import { useQuery } from "@tanstack/react-query";
import ArticleCard from "./ArticleCard";

export default function ArticlesList() {
  const { data, isLoading, isError } = useQuery({
    queryKey: ["all-articles"],
    queryFn: getArticles,
  });

  if (isError) {
    return <div>error</div>;
  }

  if (isLoading) {
    return <div>loading...</div>;
  }

  if (data) {
    return (
      <section>
        <h3 className="capitalize text-xl font-semibold my-10">
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
