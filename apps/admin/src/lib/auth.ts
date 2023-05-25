import { SignInFormData } from "@/types/types";
import { useSignIn } from "@clerk/nextjs";
import useSWRMutation from "swr/mutation";

export const useSignInClerk = () => {
  const { signIn, setActive } = useSignIn();
  const mutate = async (url: string, { arg }: { arg: SignInFormData }) => {
    return await signIn!
      .create({
        identifier: arg.identifier,
        password: arg.password,
        redirectUrl: "/",
      })
      .then((response) => {
        if (response.status === "complete") {
          setActive?.({ session: response.createdSessionId });
        }
      })
      .catch((error) => {
        throw new Error(error.errors[0].message);
      });
  };
  return useSWRMutation("signin", mutate);
};
