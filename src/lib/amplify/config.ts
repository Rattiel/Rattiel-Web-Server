import {Amplify} from "aws-amplify";
import config from "@/amplifyconfiguration.json";

const isLocalhost = process.env.NODE_ENV === "development";
const Domain = process.env.NEXT_PUBLIC_DOMAIN;

// noinspection JSUnresolvedReference
const OauthDomain = config.oauth.domain.match(`auth.${Domain}`)
    ? config.oauth.domain.replace(".auth.ap-northeast-2.amazoncognito.com", "")
    : config.oauth.domain;

// noinspection JSUnresolvedReference
const [
    localRedirectSignIn,
    productionRedirectSignIn
] = config.oauth.redirectSignIn.split(",");

// noinspection JSUnresolvedReference
const [
    localRedirectSignOut,
    productionRedirectSignOut
] = config.oauth.redirectSignOut.split(",");

const amplifyConfig = {
    ...config,
    ssr: true,
    oauth: {
        ...config.oauth,
        domain: OauthDomain,
        redirectSignIn: isLocalhost ? localRedirectSignIn : productionRedirectSignIn,
        redirectSignOut: isLocalhost ? localRedirectSignOut : productionRedirectSignOut,
    }
};

Amplify.configure(amplifyConfig);
