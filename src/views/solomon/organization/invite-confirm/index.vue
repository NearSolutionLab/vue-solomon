<template>
  <div :class="prefixCls" class="relative w-full h-full px-4">
    <div class="flex items-center absolute right-4 top-4">
      <AppDarkModeToggle class="enter-x mr-2" v-if="!sessionTimeout" />
      <AppLocalePicker
        class="text-black enter-x"
        :show-text="false"
        v-if="!sessionTimeout && showLocale"
      />
    </div>

    <span class="-enter-x">
      <AppLogo :alwaysShowTitle="true" />
    </span>

    <div class="container relative h-full py-2 mx-auto sm:px-10">
      <div class="flex w-full h-full py-5 overflow-auto">
        <div
          :class="`${prefixCls}-form`"
          class="relative w-full px-5 py-8 mx-auto my-auto rounded-md shadow-md sm:px-8 sm:w-3/4 lg:w-2/4 enter-x"
        >
          <InviteConfirmForm />
        </div>
      </div>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { AppLogo, AppLocalePicker, AppDarkModeToggle } from '/@/components/Application';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useLocaleStore } from '/@/store/modules/locale';
  import InviteConfirmForm from './InviteConfirmForm.vue';

  defineProps({
    sessionTimeout: {
      type: Boolean,
    },
  });

  const { prefixCls } = useDesign('invite-confirm');
  const localeStore = useLocaleStore();
  const showLocale = localeStore.getShowPicker;
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-invite-confirm';
  @logo-prefix-cls: ~'@{namespace}-app-logo';
  @countdown-prefix-cls: ~'@{namespace}-countdown-input';
  @register-prefix-cls: ~'@{namespace}-register-input';
  @dark-bg: #293146;

  html[data-theme='dark'] {
    .@{prefix-cls} {
      background-color: @dark-bg;

      &::before {
        background-image: url('/@/assets/svg/login-bg-dark.svg');
      }

      .ant-input,
      .ant-input-password {
        background-color: #232a3b;
      }

      .ant-btn:not(.ant-btn-link, .ant-btn-primary) {
        border: 1px solid #4a5569;
      }

      &-form {
        background: transparent !important;
      }

      .app-iconify {
        color: #fff;
      }
    }

    input.fix-auto-fill,
    .fix-auto-fill input {
      -webkit-text-fill-color: #c9d1d9 !important;
      box-shadow: inherit !important;
    }
  }

  .@{prefix-cls} {
    min-height: 100%;
    overflow: hidden;
    // background-color: #0095d0;
    background-color: rgb(144 147 153 / 30%);

    .@{prefix-cls}-form {
      background-color: #fff;
    }

    .@{logo-prefix-cls} {
      position: absolute;
      top: 12px;
      height: 30px;

      &__title {
        color: #0095d0;
        font-size: 16px;
      }

      img {
        width: 32px;
      }
    }

    .container {
      .@{logo-prefix-cls} {
        display: flex;
        width: 60%;
        height: 80px;

        &__title {
          color: #fff;
          font-size: 24px;
        }

        img {
          width: 48px;
        }
      }
    }

    &-sign-in-way {
      .anticon {
        color: #888;
        font-size: 22px;
        cursor: pointer;

        &:hover {
          color: @primary-color;
        }
      }
    }

    input:not([type='checkbox']) {
      min-width: 360px;

      @media (max-width: @screen-xl) {
        min-width: 320px;
      }

      @media (max-width: @screen-lg) {
        min-width: 260px;
      }

      @media (max-width: @screen-md) {
        min-width: 240px;
      }

      @media (max-width: @screen-sm) {
        min-width: 160px;
      }
    }

    .@{countdown-prefix-cls} input {
      min-width: unset;
    }

    .@{register-prefix-cls} input {
      min-width: unset;
    }

    .ant-divider-inner-text {
      color: @text-color-secondary;
      font-size: 12px;
    }
  }
</style>
