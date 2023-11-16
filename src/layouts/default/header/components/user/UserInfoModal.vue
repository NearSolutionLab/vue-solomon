<template v-if="getShow">
  <BasicModal
    :title="`${t('sys.login.myInfo')}`"
    @register="modalRegister"
    @ok="handleChangePassword"
    :rules="getFormRules"
  >
    <div :class="`${prefixCls}__entry`">
      <div :class="`${prefixCls}__header`">
        <img :src="avatar" :class="`${prefixCls}__header-img`" />
        <p :class="`${prefixCls}__header-name`">
          {{ getRealName }}
        </p>
      </div>
      <BasicForm @register="formRegister" ref="formRef" />
    </div>
  </BasicModal>
</template>
<script lang="ts">
  import { defineComponent, ref, computed, unref } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import {
    useLoginState,
    useFormRules,
    useFormValid,
    LoginStateEnum,
  } from '/@/views/sys/login/useLogin';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useUserStore } from '/@/store/modules/user';
  import headerImg from '/@/assets/images/header.jpg';
  import { useMessage } from '/@/hooks/web/useMessage';

  const { getLoginState } = useLoginState();
  const { t } = useI18n();
  const schemas: FormSchema[] = [
    {
      field: 'userInfo',
      component: 'Divider',
      label: t('sys.login.userInfo'),
    },
    {
      field: 'userName',
      component: 'Input',
      label: t('sys.login.userName'),
      dynamicDisabled: true,
    },
    {
      field: 'position',
      component: 'Input',
      label: t('sys.login.managerPosition'),
      dynamicDisabled: true,
    },
    {
      field: 'companyName',
      component: 'Input',
      label: t('sys.login.companyName'),
      dynamicDisabled: true,
    },
    {
      field: 'businessCode',
      component: 'Input',
      label: t('sys.login.businessCode'),
      dynamicDisabled: true,
    },
    {
      field: 'accountInfo',
      component: 'Divider',
      label: t('sys.login.accountInfo'),
    },
    {
      field: 'account',
      component: 'Input',
      label: t('sys.login.account'),
      dynamicDisabled: true,
    },
    {
      field: 'password',
      component: 'InputPassword',
      label: t('sys.login.currentPassword'),
      componentProps: {
        placeholder: t('sys.login.currentPassword'),
      },
    },
    {
      field: 'newPassword',
      component: 'StrengthMeter',
      label: t('sys.login.newPassword'),
      componentProps: {
        placeholder: t('sys.login.newPassword'),
      },
    },
    {
      field: 'confirmPassword',
      component: 'InputPassword',
      label: t('sys.login.confirmPassword'),
      componentProps: {
        placeholder: t('sys.login.confirmPassword'),
      },
    },
    {
      field: 'mobile',
      component: 'Input',
      label: t('sys.login.mobile'),
    },
  ];

  export default defineComponent({
    components: { BasicModal, BasicForm },
    setup() {
      const { prefixCls } = useDesign('header-userInfo-modal');
      const userStore = useUserStore();
      const formRef = ref();
      const { getFormRules } = useFormRules(formRef);
      const { validForm } = useFormValid(formRef);
      const getRealName = computed(() => userStore.getUserInfo?.realName);
      const { notification, createErrorModal } = useMessage();
      const getShow = computed(() => unref(getLoginState) === LoginStateEnum.CHANGE_PASSWORD);
      const [formRegister, { setProps, setFieldsValue }] = useForm({
        showActionButtonGroup: false,
        labelWidth: 120,
        schemas: schemas,
        baseColProps: { span: 24 },
      });
      const checkPassword = ref({
        login: '',
        email: '',
        name: '',
        currentPass: '',
        newPass: '',
      });
      const [modalRegister, { closeModal }] = useModalInner((data) => {
        setFieldsValue({
          userName: data.userName,
          position: data.position,
          companyName: data.companyName,
          businessCode: data.businessCode,
          account: data.userId,
          mobile: data.mobile,
        });
      });

      const avatar = computed(() => {
        const { avatar } = userStore.getUserInfo;

        return avatar || headerImg;
      });

      async function handleChangePassword() {
        const data = await validForm();

        if (!data) return;
        checkPassword.value.login = data.account;
        checkPassword.value.email = data.account;
        checkPassword.value.name = data.userName;
        checkPassword.value.currentPass = data.password;
        checkPassword.value.newPass = data.newPassword;
        try {
          //loading.value = true;
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
          closeModal();
        } catch (error) {
          if (error.response.data.errorCode == 'USER_INVALID_ID_OR_PASS') {
            createErrorModal({
              title: t('sys.api.errorTip'),
              content: t('sys.exception.invalidPassword'),
              getContainer: () => document.body,
            });
          } else {
            createErrorModal({
              title: t('sys.api.errorTip'),
              content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
              getContainer: () => document.body,
            });
          }
        } finally {
          //loading.value = false;
        }
      }

      return {
        t,
        formRef,
        prefixCls,
        getRealName,
        avatar,
        formRegister,
        schemas,
        setProps,
        modalRegister,
        handleChangePassword,
        getFormRules,
        getShow,
      };
    },
  });

  // formData.account = userStore.getUserInfo?.userId;
  //const getUserInfoHandle = await handleUserInfo();
</script>

<style lang="less">
  @prefix-cls: ~'@{namespace}-header-userInfo-modal';

  .@{prefix-cls} {
    &__entry {
      position: relative;
      //height: 240px;
      padding: 130px 30px 30px;
      border-radius: 10px;
    }

    &__header {
      position: absolute;
      top: 0;
      left: calc(50% - 45px);
      width: auto;
      text-align: center;

      &-img {
        width: 70px;
        border-radius: 50%;
      }

      &-name {
        margin-top: 5px;
      }
    }

    &__footer {
      text-align: center;
    }
  }
</style>
