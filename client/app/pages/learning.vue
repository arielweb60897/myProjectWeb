<script setup lang="ts">
// interface 是 TypeScript 用來定義物件的形狀（結構）
interface Vocabulary {
  id: number;
  word: string;
  romaji: string;
  mean: string;
}

interface VocabularyResponse {
  data: Vocabulary[];
}
const vocabulary = ref<Vocabulary[]>(); // TypeScript 泛型，告訴 ref 裡面裝的是 Vocabulary 的陣列
const { data, error } = await useFetch<VocabularyResponse[]>(`/api/vocabulary`);

if (data.value) {
  vocabulary.value = data.value.data;
  console.log(vocabulary.value);
}

if (error.value) {
  console.error("API Error:", error.value);
}
</script>
<template>
  <div class="flex flex-col gap-4 p-4">
    <UCard
      class="text-center w-2xs"
      v-for="word in vocabulary"
      variant="subtle"
      :key="word.id"
    >
      <template #header> {{ word.word }}</template>

      {{ word.romaji }}

      <template #footer> {{ word.mean }} </template>
    </UCard>
    <UButton to="/" icon="i-lucide-arrow-left" class="self-start ml-3"
      >返回</UButton
    >
  </div>
</template>
<style scoped>
.flip-card {
  perspective: 1000px;
}
.flip-inner {
  position: relative;
  width: 100%;
  height: 100%;
  transition: transform 0.6s;
  transform-style: preserve-3d;
}
.flip-inner.is-flipped {
  transform: rotateY(180deg);
}
.flip-front,
.flip-back {
  position: absolute;
  width: 100%;
  height: 100%;
  backface-visibility: hidden;
}
.flip-back {
  transform: rotateY(180deg);
}
</style>
