import { Article } from "@/@types/model";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={{
        pathname: `/article`,
        query: {
          q: encodeURIComponent(article.title),
        },
      }}
      prefetch={true}
    >
      <div className="w-full flex flex-col border shadow rounded-md">
        {article.urlToImage ? (
          <div className="w-full relative pt-[100%]">
            <Image
              src={article.urlToImage}
              alt={article.title}
              // objectFit="cover"
              fill
              sizes="25vw"
              style={{
                objectFit: "cover",
              }}
              loading="lazy"
              className="w-full h-60 md:h-52 lg:h-full top-0 left-0 object-cover rounded-tl-md rounded-tr-md"
            />
          </div>
        ) : null}
        <div className="flex gap-3 flex-col p-2">
          <h2 className="line-clamp-2">{article.title}</h2>
          <p className="text-gray-400 font-normal text-sm line-clamp-2">
            {article.description}
          </p>

          <div className="flex flex-col gap-1">
            <span className="text-xs">{article.author}</span>
            <span className="text-xs text-gray-400">
              {new Date(article.publishedAt).toLocaleString()}
            </span>
          </div>
        </div>
      </div>
    </Link>
  );
}
