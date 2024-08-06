<template>
  <button class="button" :class="active && 'active'">
    {{ label }}
  </button>
</template>

<script setup lang="ts">
interface Props {
  label: string;
  active?: boolean;
}

withDefaults(defineProps<Props>(), {
  active: false,
  label: 'Default'
})
</script>

<style lang="scss" scoped>
.button {
  padding: 12px 48px;
  border: 2px solid #A5A29A;
  border-radius: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: transparent;
  font-size: 24px;
  color: #fff;
  cursor: pointer;

  &:hover {
    background-color: #A5A29A;
    color: #000;
  }

  &.active {
    background-color: #A5A29A;
    color: #000;
  }
}
</style>
