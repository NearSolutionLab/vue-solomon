<template>
  <div>
    <BasicModal
      v-bind="$attrs"
      @register="registerModal"
      @close="handleClose"
      :title="title"
      :width="870"
      :minHeight="400"
    >
      <BasicForm @register="registerForm" />
      <div>
        <p>서비스 이미지</p>
        <template v-for="(imagesForRow, key) in serviceNameKeyImages" :key="key">
          <div v-if="key === serviceNameKey">
            <Carousel arrows :key="key">
              <template #prevArrow>
                <div class="custom-slick-arrow" style="z-index: 1; left: 10px">
                  <left-circle-outlined />
                </div>
              </template>
              <template #nextArrow>
                <div class="custom-slick-arrow" style="right: 10px">
                  <right-circle-outlined />
                </div>
              </template>
              <template v-for="(image, index) in images" :key="index">
                <div class="imaDiv">
                  <div class="image-container"><img :src="image" alt="Service Image" /></div>
                </div>
              </template>
            </Carousel>
          </div>
        </template>
      </div>
      <template #footer>
        <a-button class="closeBtn" @click="handleClose">{{ t('common.closeText') }}</a-button>
      </template>
    </BasicModal>
  </div>
</template>

<script lang="ts">
  import { defineComponent, ref, onMounted } from 'vue';
  import { Carousel } from 'ant-design-vue';
  import { LeftCircleOutlined, RightCircleOutlined } from '@ant-design/icons-vue';
  import { BasicModal, useModalInner } from '/@/components/Modal';
  import { BasicForm, useForm } from '/@/components/Form/index';
  import { serviceDetailFormSchema } from './subscription.data';
  import { useI18n } from '/@/hooks/web/useI18n';

  export default defineComponent({
    name: 'ServiceDetailModal',
    components: { BasicModal, BasicForm, Carousel, LeftCircleOutlined, RightCircleOutlined },
    emits: ['register'],
    setup(_, { emit }) {
      const title = ref('');
      const serviceNameKey = ref('');
      const dataId = ref('');
      const serviceId = ref('');
      const images = ref<string[]>([]);
      const { t } = useI18n();
      const serviceNameKeyImages: Record<string, string[]> = {
        // 주력상품 기반 보관 방법 추천
        'service.mainProductStorageRecommend': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 보관 Capa.분석
        'service.storageCapaAnalysis': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 출고 물동량 분석
        'service.outbound.out_bound_analysis': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 주문 분할&포장 박스 추천
        'service.orderAllocationBoxRecommend': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 주문 패턴 분석 서비스
        'services.outbound.capa_analysis': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 출고 피킹 전략 추천&피킹 동선 최적화
        'service.unstorePicking': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 재고 물동량 분석
        'service.inventory.inventory_analysis': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 출고 물동량 ABC 분석
        'services.outbound.abc_analysis': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // DAS 출고 배치 생성
        'services.outbound.shipping_batch': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 입고 물동량 분석
        'service.inbound.in_bound_analysis': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 당일 예상 투입 인원 예측
        'service.workerForecast': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 제품 수요 예측
        'service.forecasting': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // 작업 균등배분 추천
        'service.loadBalancing': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
        // ABC분석 서비스
        'service.inventory.ABCOptimize': [
          '/@/assets/images/subscriptionImage/img-smart.png',
          '/@/assets/images/subscriptionImage/board_ready_img.png',
        ],
      };

      // 이미지를 불러오는 함수
      const loadImages = async (serviceNameKey: string) => {
        images.value = serviceNameKeyImages[serviceNameKey] || [];
      };

      onMounted(() => {
        loadImages(serviceNameKey.value);
      });

      const [registerForm, { resetFields, setFieldsValue }] = useForm({
        labelWidth: 100,
        labelAlign: 'left',
        baseColProps: { span: 24 },
        showActionButtonGroup: false,
        actionColOptions: { span: 23 },
        schemas: serviceDetailFormSchema,
      });

      const [registerModal, { setModalProps, closeModal }] = useModalInner((data) => {
        resetFields();
        setModalProps({ confirmLoading: false });
        title.value = data.serviceName || '';
        serviceNameKey.value = data.serviceNameKey || '';
        dataId.value = data.dataListId || '';
        serviceId.value = data.id || '';
        setFieldsValue({
          serviceDescription: t(`solomon.${serviceNameKey.value}.description`),
          serviceEffect: t(`solomon.${serviceNameKey.value}.effect`),
        });
        loadImages(serviceNameKey.value);
      });

      function handleClose() {
        closeModal();
        emit('close');
      }

      return {
        registerModal,
        registerForm,
        handleClose,
        t,
        title,
        images,
        serviceNameKey,
        serviceNameKeyImages,
      };
    },
  });
</script>
<style lang="less" scoped>
  .serviceImg {
    display: flex;
    justify-content: center;
  }

  .imgDiv {
    display: flex;
    align-items: center;
  }

  .image-container {
    display: flex;
    align-items: center;
    justify-content: center;
    max-width: 100%;
    max-height: 100%;
  }

  .imgDiv img {
    max-width: 100%;
    max-height: 100%;
    object-fit: contain;
  }

  .ant-carousel :deep(.slick-slide) {
    display: flex;
    align-items: center;
    justify-content: center;
    height: 260px;
    overflow: hidden;
    line-height: 250px;
  }

  .ant-carousel :deep(.slick-arrow.custom-slick-arrow) {
    z-index: 1;
    width: 25px;
    height: 25px;
    opacity: 0.3;
    background-color: rgb(197 104 17 / 11%);
    color: black;
    font-size: 25px;
  }

  .ant-carousel :deep(.custom-slick-arrow::before) {
    display: none;
  }

  .ant-carousel :deep(.custom-slick-arrow:hover) {
    opacity: 0.5;
  }

  .ant-carousel :deep(.slick-slide h3) {
    color: black;
  }

  .ant-carousel :deep(.slick-dots-bottom) {
    bottom: -10px;
  }

  .ant-carousel :deep(.slick-dots li.slick-active button),
  .ant-carousel :deep(.slick-dots li button) {
    //border: 0.2px solid rgb(71, 69, 69);
    height: 5px;
    border-radius: 5px;
    opacity: 0.7;
    background: rgb(157 153 153);
  }

  .ant-carousel :deep(.slick-dots li.slick-active) {
    width: 30px;
  }

  .closeBtn {
    background-color: @primary-color;
    color: #fff;
  }
</style>
