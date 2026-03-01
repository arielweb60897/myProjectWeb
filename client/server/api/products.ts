export default defineEventHandler(async () => {
  const config = useRuntimeConfig() as { apiBase: string };

  const url = `${config.apiBase}/api/products`; // 先存變數
  const res = await $fetch(url);
  return res;
});
