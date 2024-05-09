import { Article } from "@/@types/model";
import Image from "next/image";
import Link from "next/link";

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <Link
      href={{
        pathname: `/article`,
        query: {
          q: encodeURIComponent(article.title.slice(0, 20)),
        },
      }}
      prefetch={true}
    >
      <div className="w-full flex flex-col border shadow rounded-md bg-white">
        {article.urlToImage ? (
          <div className="w-full relative h-[250px] md:h-[290px] lg:h-[320px] overflow-hidden">
            <Image
              src={article?.urlToImage}
              alt={article?.title}
              fill
              sizes="100vw"
              className="w-full h-auto object-cover rounded-tl-md rounded-tr-md hover:scale-110 hover:transition-transform hover:duration-200"
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
