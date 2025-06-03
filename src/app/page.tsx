interface BookType {
  id: number;
  title: string;
  author: AuthorType
}

interface AuthorType {
  id: number;
  name: string;
}

async function fetchHelper<T>(url: string): Promise<T[]> {
  const res = await fetch(url);
  const data = await res.json() as T[];

  return data;
}
export default async function HomePage() {
  const books = await fetchHelper<BookType>(`${process.env.API_URL}books`);
  const authors = await fetchHelper<AuthorType>(`${process.env.API_URL}authors`);

  return (
    <div>
      esto es el home, componente page de /app/page.
      <h1 className="text-2xl uppercase font-extrabold">libros</h1>
      <div className="grid gap-2 container mx-auto grid-cols-3">
        {books.map((book: BookType) => (
          <div key={book.id} className="p-4 border border-gray-300 rounded-lg shadow-xl shadow-indigo-600">
            <h2 className="text-xl font-bold">{book.title}</h2>
            <p className="text-gray-300">Author: {book.author.name}</p>
          </div>
        ))}
      </div>
      <h1 className="text-2xl uppercase font-extrabold">authors</h1>
      <div className="grid gap-2 container mx-auto grid-cols-3">
        {authors.map(({id, name}: AuthorType) => (
          <div key={id} className="p-4 border border-gray-300 rounded-lg shadow-xl shadow-indigo-600">
            <h2 className="text-xl font-bold">{name}</h2>
          </div>
        ))}
      </div>
    </div>
  )
}