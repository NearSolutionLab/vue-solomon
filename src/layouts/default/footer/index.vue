<template>
  <Footer :class="prefixCls" v-if="getShowLayoutFooter" ref="footerRef">
    <div
      ><span class="mr-6 font-bold">Near solution</span>Copyright &copy; Near solution Inc. All
      Right Reserved.
    </div>
    <div :class="`${prefixCls}__links`">
      <a-button size="small" type="link" @click="openSolomonPolicyRegisterModal">이용약관</a-button>
      <a-button size="small" type="link" @click="openPrivacyPolicyRegisterModal"
        >개인정보처리방침</a-button
      >
    </div>
    <SolomonPolicyModal
      :showCancelBtn="false"
      @register="SolomonPolicyRegister"
      @ok="okSolomonPolicyModalHandler"
    />
    <PrivacyPolicyModal
      :showCancelBtn="false"
      @register="PrivacyPolicyRegister"
      @ok="okPrivacyPolicyModalHandler"
    />
  </Footer>
</template>

<script lang="ts">
  import { computed, defineComponent, unref, ref } from 'vue';
  import { Layout } from 'ant-design-vue';

  import { openWindow } from '/@/utils';

  import { useI18n } from '/@/hooks/web/useI18n';
  import { useRootSetting } from '/@/hooks/setting/useRootSetting';
  import { useRouter } from 'vue-router';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLayoutHeight } from '../content/useContentViewHeight';
  import SolomonPolicyModal from '/@/views/sys/login/SolomonPolicyModal.vue';
  import PrivacyPolicyModal from '/@/views/sys/login/PrivacyPolicyModal.vue';
  import { useModal } from '/@/components/Modal';

  export default defineComponent({
    name: 'LayoutFooter',
    components: { Footer: Layout.Footer, SolomonPolicyModal, PrivacyPolicyModal },
    setup() {
      const { t } = useI18n();
      const { getShowFooter } = useRootSetting();
      const { currentRoute } = useRouter();
      const { prefixCls } = useDesign('layout-footer');

      const footerRef = ref<ComponentRef>(null);
      const { setFooterHeight } = useLayoutHeight();

      const getShowLayoutFooter = computed(() => {
        if (unref(getShowFooter)) {
          const footerEl = unref(footerRef)?.$el;
          setFooterHeight(footerEl?.offsetHeight || 0);
        } else {
          setFooterHeight(0);
        }
        return unref(getShowFooter) && !unref(currentRoute).meta?.hiddenFooter;
      });

      const [
        SolomonPolicyRegister,
        { openModal: openSolomonPolicyRegisterModal, closeModal: closeSolomonPolicyModal },
      ] = useModal();

      const [
        PrivacyPolicyRegister,
        { openModal: openPrivacyPolicyRegisterModal, closeModal: closePrivacyPolicyModal },
      ] = useModal();

      const okSolomonPolicyModalHandler = () => {
        closeSolomonPolicyModal();
      };

      const okPrivacyPolicyModalHandler = () => {
        closePrivacyPolicyModal();
      };

      return {
        getShowLayoutFooter,
        prefixCls,
        t,
        openWindow,
        footerRef,
        SolomonPolicyRegister,
        openSolomonPolicyRegisterModal,
        PrivacyPolicyRegister,
        openPrivacyPolicyRegisterModal,
        okSolomonPolicyModalHandler,
        okPrivacyPolicyModalHandler,
      };
    },
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-layout-footer';

  @normal-color: rgba(0, 0, 0, 0.45);

  @hover-color: rgba(255, 255, 255, 0.45);

  .@{prefix-cls} {
    background-color: black;
    color: @normal-color;
    text-align: center;
  }
</style>
