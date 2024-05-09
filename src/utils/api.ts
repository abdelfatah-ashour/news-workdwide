const apiUrl = process.env.NEXT_APP_BASE_API_URL!;

export default class Api {
  /**
   * Performs a GET request to the specified URL.
   * @param {string} url - The URL to fetch data from.
   * @returns {Promise<T>} A promise that resolves to the fetched data of type T.
   * @template T - The type of data expected to be fetched.
   */
  async get<T>(url: string) {
    const result = await fetch(`${apiUrl}${url}`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });
    if (result.ok) {
      return result.json() as T;
    } else {
      throw new Error("something went wrong");
    }
  }
}
