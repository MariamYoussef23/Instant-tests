import { SupabaseClient } from "@supabase/auth-helpers-react";
import router, { NextRouter } from "next/router";

export const loginApi = async (
  values: any,
  router: NextRouter,
  supabaseClient: SupabaseClient<any, "public", any>
) => {
  try {
    const res = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (res.data.user === null) {
      alert("incorrect username or password");
    } else {
      router.push("/");
    }
  } catch (error) {
    alert(error);
  }
};
