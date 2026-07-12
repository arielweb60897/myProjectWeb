<script setup lang="ts">
// interface 是 TypeScript 用來定義物件的形狀（結構）
interface Vocabulary {
  id: number;
  word: string;
  romaji: string;
  example?: string;
  mean: string;
}
interface VocabularyItem {
  id: string;
  item: string;
  value: string;
}

interface VocabularyResponse {
  data: Vocabulary[];
}
const vocabulary = ref<Vocabulary[]>(); // TypeScript 泛型，告訴 ref 裡面裝的是 Vocabulary 的陣列

const VocabularyInput = ref<VocabularyItem[]>([
  { id: "word", item: "單字", value: "" },
  { id: "mean", item: "意思", value: "" },
  { id: "romaji", item: "羅馬拼音", value: "" },
  { id: "example", item: "例句", value: "" },
]);
// const { data, error } = await useFetch<VocabularyResponse>(`/api/vocabulary`);
const fetchData = async () => {
  try {
    const res = await $fetch<VocabularyResponse>("/api/words");

    vocabulary.value = res.data;
    console.log("✅", vocabulary.value);
  } catch (error) {
    console.error("API Error:", error);
  }

  // const { data, error } = await useFetch<VocabularyResponse>(`/api/words`);

  // if (data.value) {
  //   vocabulary.value = data.value.data;
  //   console.log("✅", vocabulary.value);
  // }

  // if (error.value) {
  //   console.error("API Error:", error.value);
  // }
};
const handleSubmit = async () => {
  const payload = VocabularyInput.value.reduce(
    (acc: { [x: string]: any }, word: { id: string | number; value: any }) => {
      acc[word.id] = word.value;
      return acc;
    },
    {} as Record<string, string>
  );
  console.log(payload);

  try {
    const res = await $fetch("/api/words", {
      method: "POST",
      body: payload,
    });
    console.log("成功：", res);
    VocabularyInput.value.forEach((word) => (word.value = ""));
    await fetchData();
  } catch (err) {
    console.error("API Error:", err);
  }
};
const handleDelete = async (id: number) => {
  console.log("cancel", id);

  try {
    const res = await $fetch(`/api/words`, {
      method: "DELETE",
      body: {
        ids: [id],
      },
    });
    console.log("成功：", res);
    await fetchData();
  } catch (err) {
    console.error("API Error:", err);
  }
};
const flipped = ref(new Set<number>());
function toggle(id: number) {
  if (flipped.value.has(id)) {
    flipped.value.delete(id);
  } else {
    flipped.value.add(id);
  }
}
onMounted(() => {
  fetchData();
});
</script>
<template>
  <div class="flex flex-col gap-10">
    <!-- 單字卡 -->
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
            variant="solid"
            class="flip-face relative front flex flex-col justify-center items-center min-h-40"
          >
            <template #header>
              <h3 class="text-2xl">{{ word.word }}</h3>
            </template>

            <template #footer>
              <div class="flex gap-3">
                <UButton type="submit" @click.stop="handleDelete(word.id)"
                  >刪除</UButton
                >
                <UButton type="submit">編輯</UButton>
              </div>

              <UButton
                class="absolute bottom-0 right-2"
                icon="icon-park-outline:back"
                variant="ghost"
                color="primary"
              />
            </template>
          </UCard>
          <!-- 背面 -->
          <UCard variant="solid" class="flip-face back text-center min-h-40">
            <template #header
              ><div class="flex flex-col">
                <p>拼音：{{ word.romaji }}</p>
                <p>意思：{{ word.mean }}</p>
                <p>範例：{{ word.example }}</p>
              </div>
            </template>
          </UCard>
        </div>
      </div>
    </div>

    <div class="flex flex-col gap-4 p-4">
      <div
        class="flex flex-col w-full"
        v-for="word in VocabularyInput"
        :key="word.id"
      >
        <!-- 輸入單字 -->
        <div class="flex gap-2 flex-col">
          <span>{{ word.item }}</span>
          <UInput v-model="word.value" :id="word.id" />
        </div>
      </div>
      <UButton
        type="submit"
        icon=""
        class="self-start mt-4"
        @click="handleSubmit()"
        >送出</UButton
      >
    </div>
    <UButton to="/" icon="i-lucide-arrow-left" class="self-start m-4"
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
/* input {
  border: 1px solid #ccc;
  border-radius: 4px;
  padding: 4px;
} */
.flip-face {
  position: absolute;
  width: 100%;
  backface-visibility: hidden;
}

.back {
  transform: rotateY(180deg);
}
</style>
