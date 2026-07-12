interface WordResponse {
  success: boolean;
  data: {
    id: number;
    word: string;
    mean: string;
    romaji: string;
  };
}
export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig() as { apiBase: string };
  const body = await readBody(event);
  if (!body) {
    throw createError({ statusCode: 400, message: "請填寫所有欄位" });
  }
  console.log("‘後端收到’", body);
  const res = await $fetch<WordResponse>(`${config.apiBase}/api/words`, {
    method: "POST",
    body: body,
  });
  console.log(res);
  return res;
});
