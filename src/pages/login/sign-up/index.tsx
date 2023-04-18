// application
import AuthSignUpPage from "@/container/auth/AuthSignUpPage";
import { LayoutClean } from "@/container/shared/layout/Layout";

function AuthSignUp() {
    // const accountInfo = useAccountInfo();
    // const router = useRouter();
    // if (accountInfo.isLogin) {
    //     router.replace(url.home().href);
    //     return <div />;
    // }
    return <AuthSignUpPage />;
}

export default AuthSignUp;

AuthSignUp.Layout = LayoutClean;
