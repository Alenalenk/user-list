// Define the base URL for the API endpoints.
const BASE_URL =
  'https://jsonplaceholder.typicode.com';

// A generic function to fetch data from the given endpoint URL.
export function getData<T>(url: string): Promise<T> {
  return fetch(BASE_URL + url).then(response => {
    if (!response.ok) {
      throw new Error(`${response.status} ${response.statusText}`);
    }

    return response.json();
  });
}