import {Amplify, I18n} from "aws-amplify";
import awsExports from "@/aws-exports";
import messages from "@/lib/amplify/messages";

const isLocalhost = process.env.NODE_ENV === "development";
const Domain = process.env.NEXT_PUBLIC_DOMAIN;

// noinspection JSUnresolvedReference
const OauthDomain = awsExports.oauth.domain.match(`auth.${Domain}`)
    ? awsExports.oauth.domain.replace(".auth.ap-northeast-2.amazoncognito.com", "")
    : awsExports.oauth.domain;

// noinspection JSUnresolvedReference
const [
    localRedirectSignIn,
    productionRedirectSignIn
] = awsExports.oauth.redirectSignIn.split(",");

// noinspection JSUnresolvedReference
const [
    localRedirectSignOut,
    productionRedirectSignOut
] = awsExports.oauth.redirectSignOut.split(",");

export const amplifyConfig = {
    ...awsExports,
    ssr: true,
    oauth: {
        ...awsExports.oauth,
        domain: OauthDomain,
        redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    }
};

Amplify.configure(amplifyConfig);

I18n.putVocabularies(messages);
I18n.setLanguage("ko");
