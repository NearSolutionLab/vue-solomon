export default {
  optimizeResultStatus: {
    START: '시작',
    VALIDATING: '처리중',
    ANALYSING: '처리중',
    SOLVING: '처리중',
    ERROR: '에러',
    END: '완료',
  },
  data: {
    outbound: '출고',
    OUTBOUND: '출고',
    inbound: '입고',
    INBOUND: '입고',
    inventory: '재고',
    INVENTORY: '재고',
  },
  services: {
    outbound: {
      capa_analysis: {
        desc: 'DAS 도입을 위하여 물동량을 고려한 CAPA를 산정하고, 적절한 솔루션을 제공합니다.',
      },
      shipping_batch: {
        desc: 'DAS를 최적화 하기위한 출고 배치 주문을 생성합니다.',
      },
    },
  },
  service: {
    inventory: {
      ABCOptimize: {
        desc: '재고 현황, 출고 빈도 등을 고려하여 주력 상품을 구분하고 상품의 적치 장소와 피킹 순서를 추천합니다.',
      },
    },
  },
};
