<template>
  <template v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <FormItem name="account" class="enter-x">
        <Input
          :class="prefixCls"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.email')"
          :disabled="formData.isCodeChecked"
          autocomplete="off"
        >
          <template #addonAfter>
            <Button
              size="large"
              class="enter-x"
              @click="requestCode"
              :loading="codeRequestLoading"
              :disabled="formData.isCodeChecked"
            >
              {{ getCodeRequestButtonText }}
            </Button>
          </template>
        </Input>
      </FormItem>
      <FormItem name="emailCode" class="enter-x">
        <Input
          :class="prefixCls"
          size="large"
          v-model:value="formData.emailCode"
          :placeholder="t('sys.login.emailCode')"
          :disabled="!isCodeRequested || formData.isCodeChecked"
          autocomplete="off"
        >
          <template #addonAfter>
            <Button
              size="large"
              class="enter-x"
              @click="checkCode"
              :loading="codeCheckLoading"
              :disabled="!isCodeRequested || formData.isCodeChecked"
            >
              {{ getCodeCheckButtonText }}
            </Button>
          </template>
        </Input>
      </FormItem>
      <FormItem v-if="formData.isCodeChecked" name="newPassword" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.newPassword"
          :placeholder="t('sys.login.newPassword')"
        />
      </FormItem>
      <FormItem v-if="formData.isCodeChecked" name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>
      <FormItem class="enter-x">
        <Button type="primary" size="large" block @click="handleChangePassword" :loading="loading">
          {{ t('sys.login.registerButton') }}
        </Button>
        <Button size="large" block class="mt-4" @click="handleBackLogin">
          {{ t('sys.login.backSignIn') }}
        </Button>
      </FormItem>
    </Form>
  </template>
</template>
<script lang="ts" setup>
  import { reactive, ref, computed, unref } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { Form, Input, Button } from 'ant-design-vue';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useUserStore } from '/@/store/modules/user';
  import { useRouter } from 'vue-router';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { handleBackLogin, getLoginState } = useLoginState();

  const { prefixCls } = useDesign('register-input');
  const formRef = ref();
  const loading = ref(false);
  const router = useRouter();
  const { notification, createErrorModal } = useMessage();

  const userStore = useUserStore();

  const formData = reactive({
    account: '',
    emailCode: '',
    newPassword: '',
    confirmPassword: '',
    isCodeChecked: false,
    isPasswordChecked: false,
  });
  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);
  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.RESET_PASSWORD);
  const checkPassword = ref();
  const isCodeRequested = ref(false);
  const codeRequestLoading = ref(false);
  const getCodeRequestButtonText = computed(() => {
    return !isCodeRequested.value ? t('solomon.text.email_verification') : t('solomon.text.resend');
  });
  const requestCode = async () => {
    const data = await formRef.value.validateFields(['account']);

    try {
      codeRequestLoading.value = true;
      const result = await userStore.requestEmailCode(data.account, 'PASSWORD');
      if (result) {
        notification.success({
          message: t('solomon.text.send_verification_code'),
          description: t('solomon.text.verification_code_has_been_sent'),
          duration: 3,
        });
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body,
      });
    } finally {
      isCodeRequested.value = true;
      codeRequestLoading.value = false;
    }
  };

  const codeCheckLoading = ref(false);
  const getCodeCheckButtonText = computed(() => {
    return !formData.isCodeChecked
      ? t('solomon.text.verify')
      : t('solomon.text.verification_completed');
  });

  const checkCode = async () => {
    const data = await formRef.value.validateFields(['emailCode']);

    try {
      codeCheckLoading.value = true;
      const result = await userStore.checkEmailCode(formData.account, data.emailCode);
      if (result) {
        notification.success({
          message: t('solomon.text.verify'),
          description: t('solomon.text.verification_code_has_been_confirmed'),
          duration: 3,
        });
        formData.isCodeChecked = true;
        checkPassword.value = result;
      }
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body,
      });
    } finally {
      codeCheckLoading.value = false;
    }
  };

  async function handleChangePassword() {
    const data = await validForm();
    if (!data) return;
    if (!checkPassword.value) {
      return;
    }
    checkPassword.value.newPass = data.newPassword;
    try {
      loading.value = true;
      const userAuth = await userStore.changePassword(
        checkPassword.value.login,
        checkPassword.value,
      );
      if (userAuth) {
        notification.success({
          message: t('sys.login.changePaswordSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}`,
          duration: 3,
        });
      }
      // todo. 회원가입 성공 시 팝업 3초 표시 이후 새로고침하여 처음 로그인 페이지로 진입할 수 있도록 했으나, 다른 방식 필요해 보임.
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      router.go(0);
    } catch (error) {
      console.log('here');
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-register-input';

  .@{prefix-cls} {
    .ant-input-group-addon {
      padding-right: 0;
      border: none;
      background-color: transparent;

      button {
        font-size: 14px;
      }
    }
  }
</style>
