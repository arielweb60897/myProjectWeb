export default defineEventHandler(async (event) => {
  const config = useRuntimeConfig() as { apiBase: string };
  const body = await readBody(event);
  if (!body) {
    throw createError({ statusCode: 400, message: "請填寫所有欄位" });
  }
  const { ids } = await readBody(event);
  console.log("送到後端", ids);

  const res = await $fetch(`${config.apiBase}/api/words`, {
    method: "DELETE",
    body: { ids },
  });
  console.log(res);
  return res;
});
