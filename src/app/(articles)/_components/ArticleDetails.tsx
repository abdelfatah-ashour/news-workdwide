"use client";
import { getArticleBySlug, getContent } from "@/services/ArticleApi";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useRouter } from "next/navigation";
import { useEffect, useMemo, useState } from "react";

export default function ArticleDetails({ slug }: { slug: string }) {
  const [content, setContent] = useState<string>("");
  const router = useRouter();

  const { data } = useQuery({
    queryKey: ["article"],
    queryFn: () => getArticleBySlug(slug),
  });

  const article = useMemo(() => {
    return data?.articles[0];
  }, [data?.articles]);

  useEffect(() => {
    if (article?.url) {
      getContent(article.url).then((val) => setContent(val || ""));
    }

    return () => {
      setContent("");
    };
  }, [article?.url]);

  return (
    <div className="py-10 md:py-16 lg:py-20">
      <button
        onClick={() => router.back()}
        className="px-2 py-1 shadow bg-white border-white rounded-md my-3"
      >
        Back
      </button>
      {article?.urlToImage ? (
        <div className="w-full relative h-[250px] md:h-[310px] lg:h-[500px]">
          <Image
            src={article?.urlToImage}
            alt={article?.title}
            fill
            sizes="50vw"
            loading="lazy"
            className="w-full h-full object-cover rounded-xl"
          />
        </div>
      ) : null}

      <div>
        <h3 className=" text-lg lg:text-2xl my-6">{article?.title}</h3>

        <div className="flex flex-col gap-1">
          <span className="text-sm font-medium capitalize">
            {article?.author}
          </span>
          {article?.publishedAt ? (
            <span className="text-xs text-gray-400">
              {new Date(article?.publishedAt).toLocaleString()}
            </span>
          ) : null}
        </div>

        {content ? (
          <p className="my-3 text-sm font-normal text-gray-800">{content}</p>
        ) : null}
      </div>
    </div>
  );
}
