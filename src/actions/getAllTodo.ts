"use server";
import type { Todo } from '@/page/TodoPage';
import { HttpClient } from '@/utils/HttpClient'
import { revalidatePath } from 'next/cache';
export async function getAllTodos(): Promise<Todo[]> {
    const todos = await HttpClient<Todo[]>({
        path: '/api/todos'
    });

    return todos;
}

export async function getTodoById(id: string): Promise<Todo> {
    const todo = await HttpClient<Todo>({
        path: `/api/todos/${id}`
    });

    return todo;
}

export type CreateTodoType = Omit<Todo, 'id' | 'createdAt' | 'updatedAt' | 'completed'>;
type ResponseApi = {
    message: string;
}

export type FormState =
    | {
        errors?: {
            title?: string[];
            description?: string[];
        };
        message?: string;
    }
    | undefined;
export async function createTodo(data: FormData): Promise<ResponseApi> {
    
    const todoData: CreateTodoType = {
        title: data.get('title') as string,
        description: data.get('description') as string,
        priority: data.get('priority')  as 'low' | 'medium' | 'high',
    }
    const todo = await HttpClient<CreateTodoType>({
        method: 'POST',
        path: '/api/todos/create',
        body: todoData
    });
    if (!todo) {
        throw new Error('Failed to create todo');
    }
    revalidatePath('/');
    return {
        message: 'Todo created successfully'
    };
}

export async function updateStateTodo(id: number): Promise<ResponseApi> {
    const todo = await HttpClient<ResponseApi>({
        method: 'PUT',
        path: `/api/todos/${id}/complete`
    });
    if (!todo) {
        throw new Error('Failed to update todo state');
    }
    revalidatePath('/');
    return {
        message: todo.message || 'Todo state updated successfully'
    };

}
