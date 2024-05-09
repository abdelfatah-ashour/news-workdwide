"use server";

import { Article } from "@/@types/model";
import Api from "@/utils/api";

const appKey = process.env.NEXT_APP_API_KEY!;

export async function getArticles() {
  const result = await new Api().get<{ articles: Article[] }>(
    `/everything?q="ALL"&pageSize=32&apiKey=${appKey}`
  );

  return result;
}
