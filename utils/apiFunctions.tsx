import { SupabaseClient } from "@supabase/auth-helpers-react";
import router, { NextRouter } from "next/router";
import axios from "axios";
import { Dispatch } from "redux";
import { addOptions } from "../redux/optionsSlice";


const API = axios.create({ baseURL: `/api` });

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

      const res2 = await API.post("/user/signup", {
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

export const suggestedQuestionsAPI = async (
  dispatch: Dispatch,
  values: any
) => {
  try {
    const res: any = await API.post("/questions/options", values);
    const response = res.data.map((v: any) => ({
      ...v,
      hidden: false,
    }));
    console.log(response);
    // save res in redux
    dispatch(addOptions(response));
  } catch (error) {}
};

export const getAllTests = async () => {
  try {
    const res = await API.get("/tests");
    return res.data.tests;
  } catch (e) {
    console.log(e);
  }
};

export const createNewTest = async (values: any) => {
  try {
    const res = await API.post("/tests/newTest", values);
    return res.data.tests;
  } catch (e) {
    console.log(e);
  }
};

export const editTest = async (values: any) => {
  try {
    const res = await API.post("/tests/editTest", values);
    return res.data.tests;
  } catch (e) {
    console.log(e);
  }
};
