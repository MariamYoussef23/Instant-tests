import { SupabaseClient } from "@supabase/auth-helpers-react";
import router, { NextRouter } from "next/router";
import axios from "axios";

const API = axios.create({ baseURL: "http://localhost:3000/api" });

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
    if (data.user === null) {
      alert("email already in use, please enter another email address");
    } else {
      const res = await supabaseClient.auth.signInWithPassword({
        email: values.email,
        password: values.password,
      });

      const res2 = await API.post("/api/user/signup", {
        ...values,
        id: data.user?.id,
      });

      router.push("/");
    }
  } catch (error) {
    console.log(error);
  }
};

export const getAllQuestions = async () => {
  try {
    const res = await API.get("/questions");
    return res.data.testBank;
  } catch (e) {
    console.log(e);
  }
};
export const getAllQuestionsByCategory = async () => {
  try {
    const res = await API.get("/categories/questions");
    return res.data.testBank;
  } catch (e) {
    console.log(e);
  }
};

export const getCategories = async () => {
  try {
    const res = await API.get("/categories");
    return res.data.categories;
  } catch (e) {
    console.log(e);
  }
};

export const getDifficulty = async () => {
  try {
    const res = await API.get("/difficulty");
    return res.data.difficulty;
  } catch (e) {
    console.log(e);
  }
};

export const suggestedQuestions = async (values: any) => {
  try {
    const res = await API.post("/questions/options", values)
    console.log(res)
    
  } catch (error) {

  }
};
