import {fetchAuthSession} from "aws-amplify/auth";

const Debug = process.env.NEXT_PUBLIC_DEBUG;
const ApiServer = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT;

export interface AuthorizedFetchProps {
    url: string;
    body?: any;
    headers?: Record<string, string> | undefined
    method?: "GET" | "POST" | "PUT" | "DELETE";
}


export default async function ApiRequest({url, body, headers, method}: AuthorizedFetchProps): Promise<Response> {
    const session = await fetchAuthSession();
    if (session.tokens == undefined || session.tokens.idToken == undefined) {
        if (Debug) {
            console.debug("AuthorizedFetch failed - Not Authorized");
        }
        throw new NotAuthorizedError("Not Authorized");
    }
    return await fetch(
        `${ApiServer}${url}`,
        {
            method: method ?? "POST",
            headers: {
                "Authorization": `Bearer ${session.tokens.idToken.toString()}`,
                ...headers,
                ...(headers == undefined && {
                    "Content-Type": "application/json"
                })
            },
            body: body
        }
    )
}

const DataFetcher = (url: string) => ApiRequest({
    method: "GET",
    url: url
}).then((res) => res.json());

class NotAuthorizedError extends Error {
    constructor(message?: string | undefined) {
        super(message);
    }
}

export {
    NotAuthorizedError,
    DataFetcher
}
