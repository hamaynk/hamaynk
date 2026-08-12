import type { Handler } from "@netlify/functions";
import { createClient } from "@supabase/supabase-js";

const handler: Handler = async (event) => {
  if (event.httpMethod !== "POST") {
    return {
      statusCode: 405,
      body: JSON.stringify({ error: "Method Not Allowed" }),
    };
  }

  const SUPABASE_URL = process.env.SUPABASE_URL;
  const SUPABASE_SERVICE_ROLE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!SUPABASE_URL || !SUPABASE_SERVICE_ROLE_KEY) {
    return {
      statusCode: 500,
      body: JSON.stringify({ error: "Server configuration missing" }),
    };
  }

  try {
    const payload = JSON.parse(event.body || "{}");

    // Use service role key for server-side operations
    const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY);

    const { data, error } = await supabase
      .from("events")
      .insert([payload])
      .select();

    if (error) {
      console.error("Supabase error:", error);
      return {
        statusCode: 400,
        body: JSON.stringify({ error: error.message || "Insert failed" }),
      };
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ success: true, data }),
    };
  } catch (err) {
    console.error("Function error:", err);
    return {
      statusCode: 500,
      body: JSON.stringify({
        error: "Failed to submit event",
      }),
    };
  }
};

export { handler };
