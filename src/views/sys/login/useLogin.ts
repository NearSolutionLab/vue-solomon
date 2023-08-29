import type { ValidationRule, FormInstance } from 'ant-design-vue/lib/form/Form';
import type { RuleObject, NamePath } from 'ant-design-vue/lib/form/interface';
import { ref, computed, unref, Ref } from 'vue';
import { useI18n } from '/@/hooks/web/useI18n';

export enum LoginStateEnum {
  LOGIN,
  REGISTER,
  RESET_PASSWORD,
  MOBILE,
  QR_CODE,
}

const currentState = ref(LoginStateEnum.LOGIN);

// 这里也可以优化
// import { createGlobalState } from '@vueuse/core'

export function useLoginState() {
  function setLoginState(state: LoginStateEnum) {
    currentState.value = state;
  }

  const getLoginState = computed(() => currentState.value);

  function handleBackLogin() {
    setLoginState(LoginStateEnum.LOGIN);
  }

  return { setLoginState, getLoginState, handleBackLogin };
}

export function useFormValid<T extends Object = any>(formRef: Ref<FormInstance>) {
  const validate = computed(() => {
    const form = unref(formRef);
    return form?.validate ?? ((_nameList?: NamePath) => Promise.resolve());
  });

  async function validForm() {
    const form = unref(formRef);
    if (!form) return;
    const data = await form.validate();
    return data as T;
  }

  return { validate, validForm };
}

export function useFormRules(formData?: Recordable) {
  const { t } = useI18n();

  const getPasswordFormRule = computed(() => createRule(t('sys.login.passwordPlaceholder')));
  const getMobileFormRule = computed(() => createRule(t('sys.login.mobilePlaceholder')));
  const getCompanyNameFormRule = computed(() => createRule(t('sys.login.companyNamePlaceholder')));
  const getBusinessCodeFormRule = computed(() =>
    createRule(t('sys.login.businessCodePlaceholder')),
  );
  const getManagerNameFormRule = computed(() => createRule(t('sys.login.managerNamePlaceholder')));
  const getManagerPositionFormRule = computed(() =>
    createRule(t('sys.login.managerPositionPlaceholder')),
  );

  const validatePolicy = async (_: RuleObject, value: boolean) => {
    return !value ? Promise.reject(t('sys.login.policyPlaceholder')) : Promise.resolve();
  };

  const validateConfirmPassword = (password: string) => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.passwordPlaceholder'));
      }
      if (value !== password) {
        return Promise.reject(t('sys.login.diffPwd'));
      }
      return Promise.resolve();
    };
  };

  const validateEmail = () => {
    return async (_: RuleObject, value: string) => {
      const regex = new RegExp('[a-z0-9]+@[a-z]+.[a-z]{2,3}');
      if (!regex.test(value)) {
        return Promise.reject(t('sys.login.notVaildEmail'));
      }
      return Promise.resolve();
    };
  };

  const validateEmailCode = () => {
    return async (_: RuleObject, value: string) => {
      if (!value) {
        return Promise.reject(t('sys.login.emailCodePlaceholder'));
      }
      const regex = new RegExp('[0-9]{6}');
      if (!regex.test(value)) {
        return Promise.reject(t('sys.login.notValidEmailCode'));
      }
      return Promise.resolve();
    };
  };

  const getFormRules = computed((): { [k: string]: ValidationRule | ValidationRule[] } => {
    const passwordFormRule = unref(getPasswordFormRule);
    const mobileFormRule = unref(getMobileFormRule);
    const companyNameFormRule = unref(getCompanyNameFormRule);
    const businessCodeFormRule = unref(getBusinessCodeFormRule);
    const managerNameFormRule = unref(getManagerNameFormRule);
    const managerPositionFormRule = unref(getManagerPositionFormRule);

    const accountRule = {
      account: [{ validator: validateEmail(), trigger: 'blur' }],
      emailCode: [{ validator: validateEmailCode(), trigger: 'blur' }],
    };

    switch (unref(currentState)) {
      // register form rules
      case LoginStateEnum.REGISTER:
        return {
          password: passwordFormRule,
          confirmPassword: [
            { validator: validateConfirmPassword(formData?.password), trigger: 'change' },
          ],
          companyName: companyNameFormRule,
          businessCode: businessCodeFormRule,
          managerName: managerNameFormRule,
          managerPosition: managerPositionFormRule,
          policy: [{ validator: validatePolicy, trigger: 'change' }],
          mobile: mobileFormRule,
          ...accountRule,
        };

      // reset password form rules
      case LoginStateEnum.RESET_PASSWORD:
        return {
          ...accountRule,
        };

      // mobile form rules
      case LoginStateEnum.MOBILE:
        return accountRule;

      // login form rules
      default:
        return {
          account: [{ validator: validateEmail(), trigger: 'blur' }],
          password: passwordFormRule,
        };
    }
  });
  return { getFormRules };
}

function createRule(message: string) {
  return [
    {
      required: true,
      message,
      trigger: 'change',
    },
  ];
}
