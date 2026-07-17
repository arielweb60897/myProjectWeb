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
const vocabulary = ref<Vocabulary[]>([]); // TypeScript 泛型，告訴 ref 裡面裝的是 Vocabulary 的陣列
const isLoading = ref(false);

const VocabularyInput = ref<VocabularyItem[]>([
  { id: "word", item: "單字", value: "" },
  { id: "mean", item: "意思", value: "" },
  { id: "romaji", item: "羅馬拼音", value: "" },
  { id: "example", item: "例句", value: "" },
]);
// const { data, error } = await useFetch<VocabularyResponse>(`/api/vocabulary`);
const fetchData = async () => {
  isLoading.value = true;
  try {
    const res = await $fetch<VocabularyResponse>("/api/words");

    vocabulary.value = res.data;
    console.log("✅", vocabulary.value);
  } catch (error) {
    console.error("API Error:", error);
  } finally {
    isLoading.value = false;
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
  <main class="min-h-screen bg-stone-50 px-4 py-8 sm:px-6 lg:px-8">
    <div class="mx-auto max-w-7xl">
      <UButton
        to="/"
        icon="i-lucide-arrow-left"
        variant="ghost"
        color="neutral"
        class="mb-6 -ml-2"
      >
        返回首頁
      </UButton>

      <header class="mb-8 flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p class="text-sm font-medium tracking-wide text-primary">VOCABULARY</p>
          <h1 class="mt-1 text-3xl font-bold tracking-tight text-stone-900 sm:text-4xl">
            我的單字本
          </h1>
          <p class="mt-2 text-sm text-stone-500">
            點擊卡片翻面，複習單字、意思與例句。
          </p>
        </div>
        <div class="rounded-full bg-white px-4 py-2 text-sm font-medium text-stone-600 shadow-sm ring-1 ring-stone-200">
          {{ vocabulary.length }} 個單字
        </div>
      </header>

      <div class="grid items-start gap-8 lg:grid-cols-[minmax(0,1fr)_22rem]">
        <section aria-labelledby="card-list-title">
          <div class="mb-4 flex items-center justify-between">
            <h2 id="card-list-title" class="text-lg font-semibold text-stone-800">
              單字卡片
            </h2>
            <span class="text-sm text-stone-400">點擊翻面</span>
          </div>

          <div v-if="isLoading" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <div v-for="index in 6" :key="index" class="h-64 animate-pulse rounded-2xl bg-stone-200" />
          </div>

          <div v-else-if="vocabulary.length" class="grid gap-4 sm:grid-cols-2 xl:grid-cols-3">
            <article
              v-for="word in vocabulary"
              :key="word.id"
              class="flip-card"
              role="button"
              tabindex="0"
              :aria-label="`翻閱單字卡：${word.word}`"
              @click="toggle(word.id)"
              @keydown.enter="toggle(word.id)"
              @keydown.space.prevent="toggle(word.id)"
            >
              <div :class="['flip-inner', { flipped: flipped.has(word.id) }]">
                <div class="flip-face flashcard-front">
                  <div class="flex items-start justify-between">
                    <span class="rounded-full bg-primary/10 px-2.5 py-1 text-xs font-semibold text-primary">單字</span>
                    <span class="text-xs text-stone-400">正面</span>
                  </div>
                  <div class="flex flex-1 flex-col items-center justify-center text-center">
                    <h3 class="break-words text-3xl font-bold tracking-tight text-stone-900">
                      {{ word.word }}
                    </h3>
                    <p v-if="word.romaji" class="mt-3 text-sm tracking-wide text-stone-500">
                      {{ word.romaji }}
                    </p>
                  </div>
                  <div class="flex items-center justify-between border-t border-stone-100 pt-4">
                    <span class="text-xs text-stone-400">點擊查看答案</span>
                    <span class="flex items-center gap-1 text-xs font-medium text-primary">
                      翻面 <UIcon name="i-lucide-rotate-3d" class="size-4" />
                    </span>
                  </div>
                </div>

                <div class="flip-face flashcard-back">
                  <div class="flex items-start justify-between">
                    <span class="rounded-full bg-white/15 px-2.5 py-1 text-xs font-semibold text-white">答案</span>
                    <span class="text-xs text-white/60">背面</span>
                  </div>
                  <div class="flex flex-1 flex-col justify-center">
                    <p class="text-xs font-medium tracking-wider text-white/60">意思</p>
                    <h3 class="mt-2 break-words text-2xl font-bold text-white">{{ word.mean }}</h3>
                    <div v-if="word.example" class="mt-5 border-l-2 border-white/40 pl-3">
                      <p class="text-xs font-medium text-white/60">例句</p>
                      <p class="mt-1 text-sm leading-6 text-white/90">{{ word.example }}</p>
                    </div>
                  </div>
                  <div class="flex items-center justify-between border-t border-white/15 pt-3">
                    <UButton
                      size="xs"
                      variant="ghost"
                      color="neutral"
                      icon="i-lucide-trash-2"
                      class="text-white hover:bg-white/15 hover:text-white"
                      @click.stop="handleDelete(word.id)"
                    >
                      刪除
                    </UButton>
                    <span class="text-xs text-white/60">點擊返回單字</span>
                  </div>
                </div>
              </div>
            </article>
          </div>

          <div v-else class="rounded-2xl border border-dashed border-stone-300 bg-white px-6 py-16 text-center">
            <UIcon name="i-lucide-notebook-pen" class="mx-auto size-9 text-stone-300" />
            <h3 class="mt-4 font-semibold text-stone-700">還沒有單字卡</h3>
            <p class="mt-1 text-sm text-stone-500">從右側新增第一個想學習的單字吧。</p>
          </div>
        </section>

        <aside class="lg:sticky lg:top-6">
          <UCard class="overflow-hidden border border-stone-200 shadow-sm">
            <template #header>
              <div>
                <div class="flex items-center gap-2">
                  <div class="rounded-lg bg-primary/10 p-2 text-primary">
                    <UIcon name="i-lucide-plus" class="size-5" />
                  </div>
                  <h2 class="font-semibold text-stone-800">新增單字</h2>
                </div>
                <p class="mt-3 text-sm leading-6 text-stone-500">填寫內容後，立即建立新的複習卡片。</p>
              </div>
            </template>

            <div class="space-y-4">
              <div v-for="word in VocabularyInput" :key="word.id">
                <label :for="word.id" class="mb-1.5 block text-sm font-medium text-stone-700">
                  {{ word.item }}
                </label>
                <UTextarea
                  v-if="word.id === 'example'"
                  :id="word.id"
                  v-model="word.value"
                  placeholder="輸入例句（選填）"
                  :rows="3"
                  autoresize
                />
                <UInput
                  v-else
                  :id="word.id"
                  v-model="word.value"
                  :placeholder="word.id === 'word' ? '例如：apple' : word.id === 'mean' ? '例如：蘋果' : '例如：ringo'"
                />
              </div>
            </div>

            <template #footer>
              <UButton block icon="i-lucide-plus" size="lg" @click="handleSubmit">
                建立單字卡
              </UButton>
            </template>
          </UCard>
        </aside>
      </div>
    </div>
  </main>
</template>
<style scoped>
.flip-card {
  perspective: 1000px;
  cursor: pointer;
  min-height: 16rem;
  outline: none;
}

.flip-card:focus-visible .flip-face {
  box-shadow: 0 0 0 3px var(--ui-primary);
}

.flip-inner {
  position: relative;
  width: 100%;
  min-height: inherit;
  transform-style: preserve-3d;
  transition: transform 0.55s ease;
}

.flip-inner.flipped {
  transform: rotateY(180deg);
}
.flip-face {
  position: absolute;
  inset: 0;
  backface-visibility: hidden;
  border-radius: 1rem;
  display: flex;
  flex-direction: column;
  padding: 1.25rem;
}

.flashcard-front {
  background: white;
  border: 1px solid rgb(231 229 228);
  box-shadow: 0 1px 3px rgb(28 25 23 / 0.08);
}

.flashcard-back {
  background: linear-gradient(135deg, rgb(30 64 175), rgb(79 70 229));
  transform: rotateY(180deg);
  box-shadow: 0 12px 30px rgb(30 64 175 / 0.24);
}
</style>
