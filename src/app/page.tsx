import { Container } from "@mui/material"
import { TodoPage } from '@/page/TodoPage';
import { getAllTodos } from '@/actions/getAllTodo';

export default async function HomePage() {
  const todos = await getAllTodos();

  return (
    <Container maxWidth="lg">
      <TodoPage todos={todos} />
    </Container>
  )
}
