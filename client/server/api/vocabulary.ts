export default defineEventHandler(async () => {
  const config = useRuntimeConfig() as { apiBase: string };

  const url = `${config.apiBase}/api/vocabulary`; // 先存變數
  console.log("url", url);

  const res = await $fetch(url);
  return res;
});
