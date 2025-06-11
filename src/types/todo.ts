export interface TodoFilters {
    search: string
    status: "all" | "completed" | "pending"
    priority: "all" | "low" | "medium" | "high"
    sortBy: "title" | "createdAt" | "updatedAt" | "priority"
    sortOrder: "asc" | "desc"
}