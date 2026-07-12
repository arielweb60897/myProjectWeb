// // server/api/vocabulary.post.ts
// export default defineEventHandler(async (event) => {
//   const config = useRuntimeConfig() as { apiBase: string };
//   const { word, mean, romaji } = await readBody(event);
//   if (!word || !mean || !romaji) {
//     throw createError({ statusCode: 400, message: "請填寫所有欄位" });
//   }

//   // 轉發到 Express 後端
//   const res = await $fetch(`${config.apiBase}/api/vocabulary`, {
//     method: "POST",
//     body: { word, mean, romaji },
//   });

//   return res;
// });
