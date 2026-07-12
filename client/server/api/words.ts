export default defineEventHandler(async () => {
  const config = useRuntimeConfig() as { apiBase: string };

  const url = `${config.apiBase}/api/words`; // 先存變數
  console.log("url", url);

  // const res = await $fetch(url);
  // return res;
  try {
    const res = await $fetch(url);

    console.log(res);

    return res;
  } catch (err) {
    console.error(err);

    return err;
  }
});
