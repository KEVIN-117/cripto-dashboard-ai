interface HttpClientOptions<T> {
    path: string;
    method?: 'GET' | 'POST' | 'PUT' | 'PATHCH' | 'DELETE'
    body?: T;
}


const URI = process.env.API_URL
export async function HttpClient<T>({ method = 'GET', path, body }: HttpClientOptions<T>): Promise<T> {
    try {
        let data: | Promise<T>;
        let res: Response;
        switch (method) {
            case 'GET':
                console.log(`Fetching data from ${URI}${path} with method ${method}`);

                res = await fetch(`${URI}${path}`, {
                    method
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                data = await res.json() as Promise<T>;
                break;
            case 'POST':
                res = await fetch(`${URI}${path}`, {
                    method,
                    headers: {
                        'Content-Type': 'application/json',
                        'Accept': 'application/json'
                    },
                    body: JSON.stringify(body)
                });
                console.log(`Sending data to ${URI}${path} with method ${method}`, body);
                console.log(res);


                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                data = await res.json() as Promise<T>;
                break;
            case 'PUT':
                res = await fetch(`${URI}${path}`, {
                    method,
                    // body: JSON.stringify(body)
                });
                if (!res.ok) {
                    throw new Error(`HTTP error! status: ${res.status}`);
                }
                data = await res.json() as Promise<T>;
                break;
            default:
                throw new Error(`Unsupported method: ${method}`);
        }

        return data
    } catch (error) {
        console.error('Error in HttpClient:', error);
        throw error;
    }
}