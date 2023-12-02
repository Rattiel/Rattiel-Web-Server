import {Auth} from "aws-amplify";
import {CognitoUserSession} from "amazon-cognito-identity-js";

const Debug = process.env.NEXT_PUBLIC_DEBUG;
const ApiServer = process.env.NEXT_PUBLIC_API_SERVER_ENDPOINT;

export interface AuthorizedFetchProps {
    url: string;
    body?: any;
    headers?: Record<string, string> | undefined
    method?: "GET" | "POST" | "PUT" | "DELETE";
}

export default async function ApiRequest({url, body, headers, method}: AuthorizedFetchProps): Promise<Response> {
    let session: CognitoUserSession;
    try {
        session = await Auth.currentSession();
    } catch (error) {
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
                "Authorization": `Bearer ${session.getIdToken().getJwtToken()}`,
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
