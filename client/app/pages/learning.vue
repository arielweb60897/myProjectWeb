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
const { data, error } = await useFetch<VocabularyResponse>(`/api/vocabulary`);

if (data.value) {
  vocabulary.value = data.value.data;
  console.log(vocabulary.value);
}

if (error.value) {
  console.error("API Error:", error.value);
}
const flipped = ref(new Set<number>());
function toggle(id: number) {
  if (flipped.value.has(id)) {
    flipped.value.delete(id);
  } else {
    flipped.value.add(id);
  }
}
</script>
<template>
  <div class="flex flex-col gap-10">
    <div class="grid grid-cols-3 gap-y-10 p-4">
      <div
        v-for="word in vocabulary"
        :key="word.id"
        class="flip-card w-2/3 min-h-40"
        @click="toggle(word.id)"
      >
        <div :class="['flip-inner', { flipped: flipped.has(word.id) }]">
          <!-- 正面 -->
          <UCard
            class="flip-face front flex justify-center items-center min-h-40"
          >
            <template #header>
              {{ word.word }}
            </template>
          </UCard>
          <!-- 背面 -->
          <UCard class="flip-face back text-center min-h-40">
            <!-- <template #header> {{ word.romaji }}</template> -->
            {{ word.romaji }}
            <template #footer> {{ word.mean }}</template>
          </UCard>
        </div>
      </div>
    </div>
    <UButton to="/" icon="i-lucide-arrow-left" class="self-start ml-3"
      >返回</UButton
    >
  </div>
</template>
<style scoped>
.flip-card {
  perspective: 1000px;
  cursor: pointer;
}

.flip-inner {
  position: relative;
  width: 100%;
  transform-style: preserve-3d;
  transition: transform 0.6s;
}

.flip-inner.flipped {
  transform: rotateY(180deg);
}

.flip-face {
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
</style>
