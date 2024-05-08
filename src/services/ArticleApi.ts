"use server";
import { Article } from "@/@types/model";
import Api from "@/utils/api";
import { Readability } from "@mozilla/readability";
import { JSDOM } from "jsdom";
const appKey = process.env.NEXT_APP_API_KEY!;

export async function getArticles() {
  const result = await new Api().get<{ articles: Article[] }>(
    `/top-headlines?category=sports&sortBy=publishedAt&pageSize=20&apiKey=${appKey}`
  );

  return result;
}

export async function getArticleBySlug(slug: string) {
  const result = await new Api().get<{ articles: Article[] }>(
    `/top-headlines?q=${slug}&category=sports&sortBy=publishedAt&pageSize=20&apiKey=${appKey}`
  );

  return result;
}

export async function getContent(url: string) {
  if (url) {
    return await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.text())
      .then((html) => {
        const dom = new JSDOM(html);
        const readability = new Readability(dom.window.document as any);
        return readability.parse()?.textContent;
      })
      .catch((error) => {
        console.log("error", error);
        return;
      });
  } else {
    return;
  }
}
