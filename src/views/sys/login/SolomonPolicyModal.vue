<template>
  <BasicModal v-bind="$attrs" title="솔로몬 이용 약관" width="700px">
    <p class="text-xl font-semibold">[제 1장 총칙]</p>
    <p class="text-lg font-semibold">제 1조 목적</p>
    <p class="text-sm font-normal">
      1. 본 약관은 솔로몬 사이트가 제공하는 모든 서비스 (이하 “서비스”) 의 이용 조건 및 절차,
      이용자와 솔로몬 사이트의 권리와 의무, 책임사항과 기타 필요한 사항을 규정함을 목적으로
      합니다.</p
    >
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent } from 'vue';
  import { BasicModal } from '/@/components/Modal';

  export default defineComponent({
    components: { BasicModal },
    setup() {
      return {};
    },
  });
</script>
