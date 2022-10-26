import { SupabaseClient } from "@supabase/auth-helpers-react";
import router, { NextRouter } from "next/router";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000" });

export const loginApi = async (
  values: any,
  router: NextRouter,
  supabaseClient: SupabaseClient<any, "public", any>
) => {
  try {
    const { data } = await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    if (data.user === null) {
      alert("incorrect username or password");
    } else {
      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const signupApi = async (
  values: any,
  router: NextRouter,
  supabaseClient: SupabaseClient<any, "public", any>
) => {
  try {
    const { data } = await supabaseClient.auth.signUp({
      email: values.email,
      password: values.password,
      options: {
        data: {
          firstName: values.firstName,
          lastName: values.lastName,
        },
      },
    });

    console.log(data);

   const res =  await supabaseClient.auth.signInWithPassword({
      email: values.email,
      password: values.password,
    });
    console.log(res)
    const res2 = await API.post("/api/user/signup", {
      ...values,
      id: data.user?.id,
    });
    console.log(res2)
    // router.push("/");
    console.log("success");
  } catch (error) {
    console.log(error);
  }
};
