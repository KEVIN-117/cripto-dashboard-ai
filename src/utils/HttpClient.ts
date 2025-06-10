interface HttpClientOptions {
    path: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATHCH' | 'DELETE'
}


const URI = process.env.API_URL
export async function HttpClient<T>({ method = 'GET', path }: HttpClientOptions): Promise<T> {
    const res = await fetch(`${URI}/${path}`, {
        method
    });
    const data = await res.json() as Promise<T>

    return data
}