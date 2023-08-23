<template>
  <div v-if="getShow">
    <LoginFormTitle class="enter-x" />
    <Form class="p-4 enter-x" :model="formData" :rules="getFormRules" ref="formRef">
      <!-- <Divider type="horizontal" orientation="left"> 로그인 정보 </Divider> -->
      <FormItem name="account" class="enter-x">
        <Input
          class="fix-auto-fill"
          size="large"
          v-model:value="formData.account"
          :placeholder="t('sys.login.email')"
        />
      </FormItem>
      <FormItem name="emailCode" class="enter-x">
        <CountdownInput
          size="large"
          class="fix-auto-fill"
          v-model:value="formData.emailCode"
          :placeholder="t('sys.login.emailCode')"
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
      <!-- <Divider type="horizontal" orientation="left"> 회원 정보 </Divider> -->
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
      <!-- <Divider type="horizontal" orientation="left"> 가입 약관 동의 </Divider> -->
      <FormItem class="enter-x" name="policy">
        <!-- No logic, you need to deal with it yourself -->
        <Checkbox v-model:checked="formData.policy" size="small">
          {{ t('sys.login.policy') }}
        </Checkbox>
      </FormItem>

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
  </div>
</template>
<script lang="ts" setup>
  import { reactive, ref, unref, computed } from 'vue';
  import LoginFormTitle from './LoginFormTitle.vue';
  import {
    Form,
    Input,
    Button,
    Checkbox,
    // , Divider
  } from 'ant-design-vue';
  import { StrengthMeter } from '/@/components/StrengthMeter';
  import { CountdownInput } from '/@/components/CountDown';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import { useLoginState, useFormRules, useFormValid, LoginStateEnum } from './useLogin';
  import { useUserStore } from '/@/store/modules/user';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useRouter } from 'vue-router';

  const FormItem = Form.Item;
  const InputPassword = Input.Password;
  const { t } = useI18n();
  const { notification, createErrorModal } = useMessage();
  const { handleBackLogin, getLoginState } = useLoginState();
  const { prefixCls } = useDesign('login');
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
    policy: false,
  });

  // const formData = reactive({
  //   account: 'test@nearsolution.co.kr',
  //   password: 'abcd1234!',
  //   confirmPassword: 'abcd1234!',
  //   mobile: '01028283728',
  //   policy: true,
  //   emailCode: '123456',
  //   companyName: '니어솔루션',
  //   businessCode: '119273777238123',
  //   managerName: '매니저',
  //   managerPosition: '매니저',
  // });

  const { getFormRules } = useFormRules(formData);
  const { validForm } = useFormValid(formRef);

  const getShow = computed(() => unref(getLoginState) === LoginStateEnum.REGISTER);

  async function handleRegister() {
    const data = await validForm();
    if (!data) return;
    console.log(data);
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

      // const userInfo = await new Promise((resolve) => {
      //   setTimeout(() => {
      //     resolve({
      //       domainId: 1039,
      //       creatorId: 'khw@nearsolution.co.kr',
      //       updaterId: 'khw@nearsolution.co.kr',
      //       createdAt: '2023-08-23 16:14:13',
      //       updatedAt: '2023-08-23 16:14:13',
      //       id: 'khw1@nearsolution.co.kr',
      //       login: 'khw1@nearsolution.co.kr',
      //       email: 'khw1@nearsolution.co.kr',
      //       encryptedPassword: 'f47c4b720cd560809b27592e4933f897170e7cfe999a3f80d04c7b2887aa8843',
      //       name: '테스트유저',
      //       phoneNo: '01028283728',
      //       position: '매니저',
      //       locale: 'ko',
      //       timezone: 'Asia/Seoul',
      //       activeFlag: true,
      //       accountType: 'user',
      //     });
      //   });
      // });

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
        getContainer: () => document.body.querySelector(`.${prefixCls}`) || document.body,
      });
    } finally {
      loading.value = false;
    }
  }
</script>
