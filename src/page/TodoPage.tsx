import { CreateTodoForm } from "@/components/TodoCreateForm";
import { TodoTable } from "@/components/TodoTable";
import { ThemeToggle } from "@/components/ToggleTheme";
import { Container, Stack, Typography } from "@mui/material";
import { Box } from "@mui/material";



export interface Todo {
    id: number;
    title: string;
    description: string;
    completed: boolean;
    createdAt: string;
    updatedAt: string;
    priority: "low" | "medium" | "high";
}

export function TodoPage({ todos }: { todos: Todo[] }) {
    

    return (
        <Container maxWidth="lg">
            <Box sx={{ py: 8 }}>
                <Stack direction="row" justifyContent="space-between" alignItems="center" sx={{ mb: 6 }}>
                    <Typography variant="h2" component="h1" sx={{ fontWeight: 700 }}>
                        Todo App Futurista
                    </Typography>
                    <ThemeToggle />
                </Stack>

                <Box sx={{ textAlign: "center" }}>
                    <Typography variant="h6" color="text.secondary" sx={{ mb: 4 }}>
                        Gestiona tus tareas con un diseño moderno y futurista
                    </Typography>
                    <CreateTodoForm />
                </Box>
            </Box>
            <TodoTable todos={todos} loading={false} />
        </Container>
    )
}
