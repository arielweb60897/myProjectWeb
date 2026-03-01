<!-- --------- JS ------------
<script setup>
const products = ref();
const config = useRuntimeConfig();
// try {
//   const res = await $fetch(`${config.public.apiBase}/api/products`);
//   console.log("API Response:", res); // 🔹 這裡可以看到後端回傳資料
//   products.value = res.data;
// } catch (err) {
//   console.error("API Error:", err);
// }
  const { data, pending, error } = await useFetch(
  `${config.public.apiBase}/api/products`
)if(data.vale){
products.value = res.data;
}if(error.value){
console.error("API Error:", err);
}
 </script>-->
<!-- ------------ typescript ------------------>
<script setup lang="ts">
interface Product {
  id: number;
  name: string;
  price: number;
}

interface ApiResponse<T> {
  data: T;
}

// const products: Ref<Product[] | null> = ref(null);

const { data, error } = await useFetch<ApiResponse<Product[]>>(`/api/products`);

const products = computed(() => data.value?.data ?? []);
</script>
<template>
  <div class="flex flex-col gap-4 p-4">
    <div
      v-for="item in products"
      :key="item.id"
      class="flex justify-around w-sm items-center"
    >
      <div class="text-brown-100">{{ item.name }}</div>
      <div class="flex gap-2">
        <UKbd
          class="font-bold rounded-full text-sm w-6 h-6"
          variant="subtle"
          color="error"
          >H</UKbd
        >
        <UKbd
          class="font-bold rounded-full text-sm w-6 h-6"
          variant="subtle"
          color="info"
          >I</UKbd
        >
      </div>
      <div
        class="text-brown-100 border-brown-100 border rounded-full py-2 px-4"
      >
        NT${{ item.price }}
      </div>
      <UButton class="text-white">選擇</UButton>
    </div>
    <UButton to="/" icon="i-lucide-arrow-left" class="self-start ml-3"
      >返回</UButton
    >
  </div>
</template>
