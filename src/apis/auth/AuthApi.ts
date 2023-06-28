import { gql } from "@apollo/client";
import API from "../API";
import { F_LOGIN, F_LOGIN_SOCIAL } from "./AuthFragment";

const AuthApi = {
    login: (input: any) =>
        API.instance.mutate({
            mutation: gql`
                ${F_LOGIN}
                mutation login($input: LoginInput!) {
                    data: login(input: $input) {
                        ...F_LOGIN
                    }
                }
            `,
            variables: { input },
            fetchPolicy: "no-cache",
        }),

    loginSocial: (provider: string, token: string) =>
        API.instance.mutate({
            mutation: gql`
                ${F_LOGIN_SOCIAL}
                mutation loginSocial($provider: String!, $token: String!) {
                    data: loginSocial(provider: $provider, token: $token) {
                        ...F_LOGIN_SOCIAL
                    }
                }
            `,
            variables: { provider, token },
            fetchPolicy: "no-cache",
        }),

    // detail: (id: string) =>
    //     API.withConverter(detailConvertor).query({
    //         query: gql`
    //             ${F_BANNER}
    //             query banner($id: ID!) {
    //                 banner(id: $id) {
    //                     ...F_BANNER
    //                 }
    //             }
    //         `,
    //         variables: { id },
    //     }),

    register: (input: any) =>
        API.instance.mutate({
            mutation: gql`
                ${F_LOGIN}
                mutation register($input: CustomerRegisterInput!) {
                    data: register(input: $input) {
                        ...F_LOGIN
                    }
                }
            `,
            variables: { input },
        }),

    // update: (id: string, input: any) =>
    //     API.withConverter(detailConvertor).mutate({
    //         mutation: gql`
    //             ${F_BANNER}
    //             mutation updateBanner($id: ID!, $input: BannerInput) {
    //                 banner: updateBanner(id: $id, input: $input) {
    //                     ...F_BANNER
    //                 }
    //             }
    //         `,
    //         variables: { input, id },
    //     }),
};

export default AuthApi;
