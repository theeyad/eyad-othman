"use server";

import { createClient } from "@/lib/supabase/server";
import { LoginFormValues } from "@/lib/validators/login";

export async function loginAction(values: LoginFormValues) {
  try {
    const supabase = await createClient();
    const { data, error } = await supabase.auth.signInWithPassword({
      email: values.email.trim(),
      password: values.password,
    });

    if (error) {
      console.error("Supabase Auth Error:", error.message, error.status);
      return { success: false, error: error.message };
    }

    if (!data.user) {
      return { success: false, error: "No user found" };
    }

    return { success: true };
  } catch (err: unknown) {
    const message =
      err instanceof Error ? err.message : "Unexpected error occurred";
    console.error("Server Action Auth Error:", message);
    return { success: false, error: message };
  }
}
