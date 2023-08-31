<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <Divider type="horizontal" orientation="left"> 로그인 정보 </Divider>
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
      <FormItem name="password" class="enter-x">
        <StrengthMeter
          size="large"
          v-model:value="formData.password"
          :placeholder="t('sys.login.password')"
        />
      </FormItem>
      <FormItem name="confirmPassword" class="enter-x">
        <InputPassword
          size="large"
          visibilityToggle
          v-model:value="formData.confirmPassword"
          :placeholder="t('sys.login.confirmPassword')"
        />
      </FormItem>
      <Divider type="horizontal" orientation="left"> 회원 정보 </Divider>
      <FormItem name="companyName" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.companyName"
          :placeholder="t('sys.login.companyName')"
        />
      </FormItem>
      <FormItem name="businessCode" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.businessCode"
          :placeholder="t('sys.login.businessCode')"
        />
      </FormItem>
      <FormItem name="managerName" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.managerName"
          :placeholder="t('sys.login.managerName')"
        />
      </FormItem>
      <FormItem name="managerPosition" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.managerPosition"
          :placeholder="t('sys.login.managerPosition')"
        />
      </FormItem>
      <FormItem name="mobile" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.mobile"
          :placeholder="t('sys.login.mobile')"
        />
      </FormItem>
      <Divider type="horizontal" orientation="left"> 가입 약관 동의 </Divider>
      <FormItem class="enter-x" name="policy">
        <Checkbox v-model:checked="formData.policy" size="small" @change="onCheckAllChange">
          {{ t('sys.login.allPolicy') }}
        </Checkbox>
      </FormItem>
      <FormItem class="enter-x" name="solomonPolicy">
        <Checkbox v-model:checked="formData.solomonPolicy" size="small">
          {{ t('sys.login.solomonPolicy') }}
        </Checkbox>
        <Button type="link" class="enter-x" @click="openSolomonPolicyRegisterModal">
          {{ t('sys.login.details') }}
        </Button>
      </FormItem>
      <FormItem class="enter-x" name="privacyPolicy">
        <Checkbox v-model:checked="formData.privacyPolicy" size="small">
          {{ t('sys.login.privacyPolicy') }}
        </Checkbox>
        <Button type="link" class="enter-x" @click="openPrivacyPolicyRegisterModal">
          {{ t('sys.login.details') }}
        </Button>
      </FormItem>
      <FormItem v-show="false" name="emailCodeCheck" class="enter-x" />

      <Button
        type="primary"
        class="enter-x"
        size="large"
        block
        @click="handleRegister"
        :loading="loading"
      >
        {{ t('sys.login.registerButton') }}
      </Button>
      <Button size="large" block class="mt-4 enter-x" @click="handleBackLogin">
        {{ t('sys.login.backSignIn') }}
      </Button>
    </Form>
    <SolomonPolicyModal @register="SolomonPolicyRegister" @ok="okSolomonPolicyModalHandler" />
    <PrivacyPolicyModal @register="PrivacyPolicyRegister" @ok="okPrivacyPolicyModalHandler" />
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed, watch } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import { Form, Input, Button, Checkbox, Divider } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useUserStore } from '/@/store/modules/user';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRouter } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import SolomonPolicyModal from '/@/views/sys/login/SolomonPolicyModal.vue';
  import PrivacyPolicyModal from '/@/views/sys/login/PrivacyPolicyModal.vue';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { prefixCls } = useDesign('register-input');
  const userStore = useUserStore();
  const router = useRouter();

  const formRef = ref();
  const loading = ref(false);
  const formData = reactive({
    account: '',
    emailCode: '',
    password: '',
    confirmPassword: '',
    companyName: '',
    businessCode: '',
    managerName: '',
    managerPosition: '',
    mobile: '',
    solomonPolicy: false,
    privacyPolicy: false,
    policy: false,
    isCodeChecked: false,
  });

  const onCheckAllChange = (e: any) => {
    if (e.target.checked) {
      formData.solomonPolicy = true;
      formData.privacyPolicy = true;
    } else {
      formData.solomonPolicy = false;
      formData.privacyPolicy = false;
    }
  };
  watch(
    () => [formData.solomonPolicy, formData.privacyPolicy],
    (values) => {
      formData.policy = values.every((val) => val);
    },
  );

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    try {
      loading.value = true;
      const userInfo = await userStore.register({
        userId: data.account,
        password: data.password,
        companyName: data.companyName,
        businessCode: data.businessCode,
        managerName: data.managerName,
        managerPosition: data.managerPosition,
        managerPhoneNo: data.mobile,
        mode: 'none', // 기본 오류 메시지를 표시하지 않음
      });

      if (userInfo) {
        notification.success({
          message: t('sys.login.registerSuccessTitle'),
          description: `${t('sys.login.loginSuccessDesc')}: ${userInfo.name}`,
          duration: 3,
        });
      }
      // todo. 회원가입 성공 시 팝업 3초 표시 이후 새로고침하여 처음 로그인 페이지로 진입할 수 있도록 했으나, 다른 방식 필요해 보임.
      await new Promise((resolve) => {
        setTimeout(resolve, 3000);
      });
      router.go(0);
    } catch (error) {
      createErrorModal({
        title: t('sys.api.errorTip'),
        content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
        getContainer: () => document.body,
      });
    } finally {
      loading.value = false;
    }
  }

  const [
    SolomonPolicyRegister,
    { openModal: openSolomonPolicyRegisterModal, closeModal: closeSolomonPolicyModal },
  ] = useModal();
  const [
    PrivacyPolicyRegister,
    { openModal: openPrivacyPolicyRegisterModal, closeModal: closePrivacyPolicyModal },
  ] = useModal();

  const okSolomonPolicyModalHandler = () => {
    formData.solomonPolicy = true;
    closeSolomonPolicyModal();
  };

  const okPrivacyPolicyModalHandler = () => {
    formData.privacyPolicy = true;
    closePrivacyPolicyModal();
  };

  const isCodeRequested = ref(false);
  const codeRequestLoading = ref(false);
  const getCodeRequestButtonText = computed(() => {
    return !isCodeRequested.value ? '이메일 인증' : '재전송';
  });
  const requestCode = async () => {
    const data = await formRef.value.validateFields(['account']);

    try {
      codeRequestLoading.value = true;
      const result = await userStore.requestEmailCode(data.account);
      if (result) {
        notification.success({
          message: '인증코드 전송',
          description: `인증코드가 전송되었습니다`,
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
    return !formData.isCodeChecked ? '인증하기' : '인증완료';
  });

  const checkCode = async () => {
    const data = await formRef.value.validateFields(['emailCode']);

    try {
      codeCheckLoading.value = true;
      const result = await userStore.checkEmailCode(formData.account, data.emailCode);
      if (result) {
        notification.success({
          message: '인증하기',
          description: `인증코드가 확인되었습니다`,
          duration: 3,
        });
        formData.isCodeChecked = true;
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
