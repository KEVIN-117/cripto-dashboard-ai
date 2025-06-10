import { HttpClient } from '@/utils/HttpClient'
interface BookType {
  id: number;
  title: string
  author: AuthorType
}

interface AuthorType {
  id: number;
  name: string
}

export default async function HomePage() {
  
  const books = await HttpClient<BookType[]>({
    path: 'books'
  })
  const authors = await HttpClient<AuthorType[]>({
    path: 'authors'
  })
  return (
    <div>
      esto es el home, componente page de /app/page.
      <h1 className="text-2xl font-extrabold">
        Books List
      </h1>
      <hr />
      <div className="grid grid-cols-3 gap-2">
        {
          books.map((book: BookType) => (<BookUi key={book.id} book={book} />))
        }
      </div>

      <h1 className="text-2xl font-extrabold">
        Authors List
      </h1>

      <div className="grid grid-cols-3 gap-2">
        {
          authors.map((author: AuthorType) => (<AuthorUi key={author.id} author={author} />))
        }
      </div>
    </div>
  )
}

function BookUi({ book }: { book: BookType }) {
  const { author, id, title } = book;
  return (
    <div className="p-4 border rounded shadow shadow-indigo-500">
      <h2 className="text-2xl font-extrabold">{title}</h2>
      <p className="text-gray-300">ID: {id}</p>
      <hr />
      <AuthorUi author={author} />
    </div>
  )
}

function AuthorUi({ author }: { author: AuthorType }) {
  const { id, name } = author

  return (
    <div>
      <p className="text-gray-300">Author: {name}</p>
      <p className="text-gray-300">Author ID: {id}</p>
    </div>
  )
}