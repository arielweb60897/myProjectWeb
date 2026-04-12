<script setup>
const vocabulary = ref();
const config = useRuntimeConfig();
const { data, error } = await useFetch(
  `${config.public.apiBase}/api/vocabulary`
);
if (data.value) {
  console.log(data.value);

  // vocabulary.value = data.value;
}
if (error.value) {
  console.error("API Error:", err);
}
</script>
<template>
  <div class="flex flex-col gap-4 p-4">
    <UButton to="/" icon="i-lucide-arrow-left" class="self-start ml-3"
      >返回</UButton
    >
  </div>
</template>
