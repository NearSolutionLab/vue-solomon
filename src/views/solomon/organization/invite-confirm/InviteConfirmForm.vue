<template>
  <div>
    <h2 class="mb-3 text-2xl font-bold text-center xl:text-3xl enter-x xl:text-left">{{
      t('solomon.title.sign_up')
    }}</h2>
    <Form class="p-4 enter-x" :model="formData" :rules="getInvitationFormRules" ref="formRef">
      <Divider type="horizontal" orientation="left">{{
        t('solomon.title.login_information')
      }}</Divider>
      <FormItem name="account" class="enter-x">
        <Input
          :class="prefixCls"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.email')"
          :disabled="true"
          autocomplete="off"
        />
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
      <Divider type="horizontal" orientation="left">{{
        t('solomon.title.member_information')
      }}</Divider>
      <FormItem name="companyName" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.companyName"
          :placeholder="t('sys.login.companyName')"
          :disabled="true"
          autocomplete="off"
        />
      </FormItem>
      <FormItem name="businessCode" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.businessCode"
          :placeholder="t('sys.login.businessCode')"
          :disabled="true"
          autocomplete="off"
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
      <Divider type="horizontal" orientation="left">{{
        t('solomon.title.agreement_to_terms_of_service')
      }}</Divider>
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
    </Form>
    <SolomonPolicyModal @register="SolomonPolicyRegister" @ok="okSolomonPolicyModalHandler" />
    <PrivacyPolicyModal @register="PrivacyPolicyRegister" @ok="okPrivacyPolicyModalHandler" />
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, watch } from 'vue';
  import { Form, Input, Button, Checkbox, Divider } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useFormRules, useFormValid } from '/@/views/sys/login/useLogin';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRoute } from 'vue-router';
  import { useModal } from '/@/components/Modal';
  import SolomonPolicyModal from '/@/views/sys/login/SolomonPolicyModal.vue';
  import PrivacyPolicyModal from '/@/views/sys/login/PrivacyPolicyModal.vue';
  import { useGo } from '/@/hooks/web/usePage';
  import { confirmInvitation } from '/@/api/solomon/organization';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { prefixCls } = useDesign('invite-confirm-input');
  const route = useRoute();
  const go = useGo();

  const formRef = ref();
  const loading = ref(false);
  const formData = reactive({
    account: route.query.emailId,
    password: '',
    confirmPassword: '',
    companyName: route.query.companyName,
    businessCode: route.query.businessCode,
    managerName: route.query.name,
    managerPosition: '',
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

  const { getInvitationFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    if (!route.query.authType || !route.query.custDomainId) return;
    try {
      loading.value = true;
      const userInfo = await confirmInvitation({
        userId: data.account,
        password: data.password,
        companyName: data.companyName,
        businessCode: data.businessCode,
        name: data.managerName,
        position: data.managerPosition,
        authType: route.query.authType as string,
        domainId: route.query.custDomainId as string,
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
      go('/login');
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
</script>
<style lang="less">
  @prefix-cls: ~'@{namespace}-invite-confirm-input';

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
