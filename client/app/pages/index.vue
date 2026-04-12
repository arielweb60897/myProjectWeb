<!--

<script setup>

const buttons = [
  {
    link: "/learning",
    text: "Go to Learning",
    icon: "i-lucide-arrow-left",
    iconPosition: "left",
  },
  {
    link: "/coffee",
    text: "Go to Coffee",
    icon: "i-lucide-arrow-right",
    iconPosition: "right",
  },
];
</script>
-->
<script setup lang="ts">
type IconPosition = "left" | "right";

interface ButtonItem {
  link: string;
  text: string;
  icon: string;
  iconPosition: IconPosition;
}

const buttons: ButtonItem[] = [
  {
    link: "/learning",
    text: "Go to Learning",
    icon: "i-lucide-arrow-left",
    iconPosition: "left",
  },
  {
    link: "/coffee",
    text: "Go to Coffee",
    icon: "i-lucide-arrow-right",
    iconPosition: "right",
  },
  {
    link: "/coffee",
    text: "Go to Coffee",
    icon: "i-lucide-arrow-right",
    iconPosition: "left",
  },
];
</script>
<template>
  <div class="min-h-screen flex items-center justify-center">
    <!--
      animate__animated 啟用動畫
      animate__pulse  特效種類
      animate__infinite 無限循環 
      -->
    <div class="grid grid-cols-2 gap-10">
      <UButton
        v-for="btn in buttons"
        :to="btn.link"
        class="text-2xl animate__animated animate__pulse animate__infinite"
        v-bind="
          btn.iconPosition === 'left'
            ? { icon: btn.icon }
            : { 'trailing-icon': btn.icon }
        "
      >
        {{ btn.text }}</UButton
      >
    </div>
  </div>
</template>
