export default {
  button: {
    download_result: '결과 다운로드',
    invite_team_member: '팀원 초대',
    next_step: '다음 단계',
    select_excel_file: '엑셀 파일 선택',
  },
  category: {
    data: {
      name: '데이터',
      description: '분석 가능한 서비스를 확인하여 데이터의 세부 항목을 설정하고 업로드합니다.',
    },
    service: {
      name: '서비스',
      description:
        '구독한 서비스와 업로드한 데이터를 활용하여 데이터 분석 요청하여 그 결과를 확인합니다.',
    },
    organization: {
      name: '조직관리',
      description: '사용자의 팀원을 초대하고 관리하는 기능을 제공합니다.',
    },
    subscription: {
      name: '구독',
      description:
        '제공하는 서비스를 확인하고 구독/철회하며 또한 서비스에 대한 사용량을 확인합니다.',
    },
  },
  data: {
    inbound: '입고',
    INBOUND: '입고',
    inventory: '재고',
    INVENTORY: '재고',
    method: '업로드 방법',
    name: '데이터셋 이름',
    outbound: '출고',
    OUTBOUND: '출고',
    type: '데이터 유형',
  },
  label: {
    created_at: '생성일시',
    date: '날짜',
    email: '이메일',
    extraction_frequency: '추출 횟수',
    inbound: '입고',
    input_data_retrieval: '입력 데이터 조회',
    inventory: '재고',
    items: '개 품목',
    name: '이름',
    outbound: '출고',
    overall: '총',
    phone_number: '연락처',
    position: '직급',
    service_description: '서비스 설명',
    service_effect: '서비스 주요 효과',
    service_image: '서비스 이미지',
    service_name_description_date: '명칭/서비스명/날짜',
    service_name_description: '서비스명/설명',
    standard_order_quantity: '기준 주문 수',
    storage_method: '저장방식',
    title: '제목',
    total: '전체',
    type: '데이터 유형',
  },
  optimizeResultStatus: {
    ANALYSING: '처리중',
    END: '완료',
    ERROR: '에러',
    SOLVING: '처리중',
    START: '시작',
    VALIDATING: '처리중',
  },
  service: {
    forecasting: {
      desc: '제품별 출고(물동량)데이터를 이용하여 제품의 일별 수요를 예측 합니다.',
      description:
        '물류 데이터 분석을 통해 상품별/기간별 수요를 예측하고, 적정 재고량을 산정하여 미래 주문시점, 주문량에 대한 의사결정을 지원합니다.',
      effect:
        '판매량이 높아질 시점과 주요 사건을 조기에 예상하여 물류 센터의 상품 재고나 오프라인 매장 재고를 미리 보충하고, 주력 상품의 판매량에 대응함으로써 악성 재고의 부담을 덜 수 있습니다.',
    },
    inbound: {
      in_bound_analysis: {
        desc: '입고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
        description: '입고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
        effect: '입고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
      },
    },
    inventory: {
      ABCOptimize: {
        desc: '재고 현황, 출고 빈도 등을 고려하여 주력 상품을 구분하고 상품의 적치 장소와 피킹 순서를 추천합니다.',
        description:
          '재고 현황, 출고 빈도 등을 고려하여 주력 상품을 구분하고 상품의 적치 장소와 피킹 순서를 추천합니다',
        effect:
          '주력상품 선정을통하여 효율적인 공간활용을 토대로, 작업자의 동선을 30~40% 감소시킵니다.',
      },
      inventory_analysis: {
        desc: '재고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
        description: '재고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
        effect: '재고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
      },
    },
    loadBalancing: {
      desc: '작업 물량을 균등하게 배분합니다.',
      description:
        '작업 장치별 작업량이 균형을 이룰 수 있도록 설비에 맞는 주문을 효율적으로 할당합니다.',
      effect: '효율적인 작업 물량 배분으로 작업 병목현상을 방지하고 작업 생산성을 향상합니다.',
    },
    mainProductStorageRecommend: {
      desc: '주력/유사 상품간의 연관분석을 통하여, 보관 장소를 추천합니다.',
      description:
        '출고 데이터를 기반으로 상품에 등급을 부여하여 주력 상품을 구분하며, 상품간/카테고리간 유사성을 분석합니다.',
      effect:
        '분석 데이터를 통해 상품 간 최적 보관 방법을 수립하여 출고 작업 시, 작업자의 이동 동선을 최적화 합니다.',
    },
    orderAllocationBoxRecommend: {
      desc: '출고 주문 별 적합한 포장 박스를 추천합니다.',
      description: '작업자의 포장 주문을 자동 분할하고, 출고 주문별 포장 박스를 추천합니다.',
      effect:
        '작업자의 고민 시간과 작업 난이도를 줄이고, 포장 분류 작업과 실 포장 작업의 생산성을 향상할 수 있습니다.',
    },
    outbound: {
      out_bound_analysis: {
        desc: '출고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
        description: '출고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
        effect: '출고(물동량)데이터를 이용하여 물류센터 운영을 위한 각종 리포트를 제공합니다.',
      },
    },
    storageCapaAnalysis: {
      desc: '상품의 보관량을 분석하여, 물류과정의 효율을 극대화 합니다.',
      description: '상품의 보관량을 분석하여, 물류과정의 효율을 극대화 합니다.',
      effect: '상품의 보관량을 분석하여, 물류과정의 효율을 극대화 합니다.',
    },
    unstorePicking: {
      desc: '주력상품을 분석하여 피킹작업을 효율화 합니다.',
      description:
        '효율적인 주문 처리를 위해 출고 데이터를 분석하여 주력 상품을 구분하고, 상품의 적치 장소와 피킹 순서를 추천합니다.',
      effect: '주문 처리 동선을 최적화하여, 작업자의 작업 동선을 30%~40%이상 감소 시킵니다.',
    },
    workerForecast: {
      desc: '작업 생산성을 분석하여, 당일 투입 인원을 예상합니다.',
      description:
        '프로세스 별 자동화된 생산성 분석으로 물량 별 적정 인력을 산정-배치 하여 당일 물류 작업도 적절하게 대응할 수 있습니다.',
      effect: '작업 생산성을 분석하여, 당일 투입 인원을 예상합니다.',
    },
  },
  services: {
    outbound: {
      // 해당하는 내용이 없어서 임의로 적어놓음. 해당하는 내용에 맞게 변경할 것.
      abc_analysis: {
        desc: '출고(물동량)데이터를 이용하여 고려하여 주력 상품을 구분하고 상품의 적치 장소와 피킹 순서를 추천합니다.',
        description:
          '출고(물동량)데이터를 이용하여 고려하여 주력 상품을 구분하고 상품의 적치 장소와 피킹 순서를 추천합니다.',
        effect:
          '출고(물동량)데이터를 이용하여 고려하여 주력 상품을 구분하고 상품의 적치 장소와 피킹 순서를 추천합니다.',
      },
      capa_analysis: {
        desc: 'DAS 도입을 위하여 물동량을 고려한 CAPA를 산정하고, 적절한 솔루션을 제공합니다.',
        description:
          '제품의 출고량을 분석하여 DAS 출고작업의 효율성을 극대화하는 솔루션을 제공합니다.',
        effect:
          '분석 데이터를 기반으로 예상되는 출고 CAPA를 산정하여 가장 효율적인 DAS설비의 세팅을 추천합니다.',
      },
      shipping_batch: {
        desc: 'DAS를 최적화 하기위한 출고 배치 주문을 생성합니다.',
        description:
          '주문 처리 순서, SKU 투입 순서 등을 최적화하여, 최소한의 SKU로 주문을 처리하게끔 DAS 각 호기 별 작업 배치를 지시합니다.',
        effect:
          '상품 분류 빈도와 피킹 빈도를 50% 이상 감소시켜, 주문 처리 능력을 최대화하고 생산성을 향상시킬 수 있습니다.',
      },
    },
  },
  text: {
    a_class_items_pcs_count: 'A급 상품 PCS 수',
    a_class_items_ratio: 'A급 상품 비율',
    a_class_items_sku_count: 'A급 상품 SKU 수',
    active: '활성',
    annual_inbound_trend: '연간 입고량 추이',
    annual_inventory_trend: '연간 재고량 추이',
    annual_outbound_order_count_trend: '연간 출고 주문 건수 추이',
    average_daily_inbound_by_day_of_the_week: '요일 별 평균 입고량',
    average_daily_outbound_order_quantity_by_day_of_the_week: '요일 별 평균 출고 주문 건수',
    average_inbound_quantity_pcs: '평균 입고량(PCS)',
    average_inbound_quantity: '평균 입고량',
    average_inventory_quantity: '평균 재고량',
    average_outbound_quantity: '평균 출고량(PCS)',
    average: '평균',
    avg_outbound_order_count: '평균 출고 주문 건수',
    avg_outbound_quantity: '평균 출고량',
    batch_no: '배치 번호',
    batch_result_statistics: '배치결과 통계',
    batch_wise_combination_statistics: '배치별 조합 통계',
    bc_class_items_pcs_count: 'BC급 상품 PCS 수',
    bc_class_items_ratio: 'BC급 상품 비율',
    bc_class_items_sku_count: 'BC급 상품 SKU 수',
    category: '종류',
    date: '날짜',
    day_of_the_week: '요일',
    defective_inventory_status_by_product_brand: '제품 브랜드 별 불량 재고 현황',
    document_name: '문서명: ',
    efficiency: '효율',
    email_verification: '이메일 인증',
    end_date: '종료날짜',
    error: '에러',
    highest_inbound_quantity: '최고 입고량',
    highest_inventory_quantity: '최고 재고량',
    improvement_in_efficiency_compared_to_the_baseline: '기준 대비 효율 향상',
    inactive: '비활성',
    inbound_quantity_pcs: '입고량(PCS)',
    inbound_quantity: '입고량',
    inbound_status: '입고현황',
    inventory_quantity_pcs: '재고량(PCS)',
    inventory_share_status_by_product_brand: '제품 브랜드 별 재고 점유율 현황',
    inventory_status_by_product_category: '제품군 별 재고 현황',
    lowest_inbound_quantity: '최저 입고량',
    lowest_inventory_quantity: '최저 재고량',
    max_outbound_order_count: '최고 출고 주문 건수',
    max_outbound_quantity: '최고 출고량',
    min_outbound_order_count: '최저 출고 주문 건수',
    min_outbound_quantity: '최저 출고량',
    month: '월',
    monthly: '월간',
    order_combination: '주문 조합',
    order_count_per_sku: 'SKU당 처리 가능 주문 수량',
    order_count: '주문 건수',
    order_no: '주문 번호',
    outbound_date: '출고일',
    outbound_quantity_pcs: '출고량(PCS)',
    outbound_status: '출고현황',
    pay_per_use: '종량제',
    please_input_the_title: '제목을 입력하세요.',
    quantity: '수량',
    quarter: '분기',
    quarterly_inbound_quantity: '분기 별 입고량',
    quarterly_outbound_order_count: '분기 별 출고주문 건수',
    rate_plan: '요금제',
    recommended_batch_order_count: '추천 배치 주문수',
    resend: '재전송',
    retrieval: '조회',
    send_verification_code: '인증코드 전송',
    service_execution_completed: '서비스 실행 완료',
    service_has_been_executed: '서비스가 실행되었습니다.',
    size: '크기',
    sku_count: '상품 수',
    sku_name: '상품 이름',
    sku_no: '상품 번호',
    specific_details: '세부내역',
    start_date: '시작날짜',
    success: '성공',
    this_is_a_required_field: '필수항목 입니다.',
    total_data_storage_count: '총 데이터 저장 건수',
    total_data_usage_count: '총 데이터 사용 건수',
    total: '계',
    verification_code_has_been_confirmed: '인증코드가 확인되었습니다.',
    verification_code_has_been_sent: '인증코드가 전송되었습니다.',
    verification_completed: '인증완료',
    verify: '인증하기',
  },
  title: {
    abc_analysis_report: 'ABC 분석 리포트',
    abc_analysis: 'ABC 분석',
    abc: 'ABC',
    action: '실행',
    agreement_to_terms_of_service: '가입 약관 동의',
    amount: '단가(원)',
    annual_inbound_quantity_trend: '연간 입고량 추이',
    annual_inventory_trend: '연간 재고량 추이',
    average_daily_outbound_quantity: '일평균 출고수량',
    average_inbound_quantity_by_day_of_the_week: '요일별 평균 입고량',
    brand: '브랜드',
    cancel: '취소',
    category: '카테고리',
    category1: '카테고리1',
    category2: '카테고리2',
    category3: '카테고리3',
    category4: '카테고리4',
    charge_price: '과금액(원)',
    client_name: '고객사 명',
    combination_count: '조합 수',
    complete: '진행완료',
    created_at: '생성일시',
    cumulative_ratio: '누적 비율',
    customer: '고객',
    daily_average_outbound: '요일별 평균 출고량',
    daily_order_analysis_results: '일자 별 주문 분석 결과',
    data_size: '데이터 크기',
    dataset: '데이터셋',
    date: '날짜',
    day: '일자',
    defective_inventory_status: '불량 재고 현황',
    description: '설명',
    details: '상세보기',
    ea: 'EA',
    efficiency_based_on_order_count_per_batch: '배치당 주문 수에 따른 주문처리 효율',
    efficiency_increase: '효율 증가율(%)',
    email: '이메일',
    excel_file_upload: 'Excel 파일 업로드',
    expire_date: '유통기한',
    group_batch_count: '그룹 배치 수',
    inbound_flow_analysis_report: '입고 물동량 분석 리포트',
    input_form: '입력 양식',
    inventory_ownership_status_by_product_brand: '제품 브랜드 별 재고 점유율 현황',
    inventory_quantity_analysis_report: '재고 물동량 분석 리포트',
    inventory_type: '재고타입',
    invitation_expiration_date_time: '초대 만료 일시',
    invite_status: '초대 현황',
    invite_team_member: '팀원 초대',
    latest_data_analysis_status: '최신 데이터 분석 현황',
    location_code: '로케이션 코드',
    location_count: '로케이션 수',
    location_type: '로케이션 타입',
    login_information: '로그인 정보',
    lot_no: '로트번호',
    major_item_inbound_status: '주요 품목 입고 현황',
    major_item_inbound_trend: '주요 품목 입고 추이',
    major_item_outbound_status: '주요 품목 출고 현황',
    major_item_outbound_trend: '주요 품목 출고 추이',
    member_information: '회원 정보',
    member_list: '팀원 목록',
    modify_user_information: '사용자 정보 변경',
    month_based_inbound_quantity_statistics: '월별 입고량 통계',
    month: '월',
    monthly_billing_amount: '월 과금액',
    monthly_billing_status: '월별 과금 현황',
    monthly_inventory_statistics: '월별 재고 통계',
    monthly_outbound_statistics: '월별 출고량 통계',
    name: '이름',
    number_of_data_storage: '데이터 저장 건수',
    number_of_data_usage: '데이터 사용 건수',
    order_count: '주문 건수',
    order_no: '주문번호',
    order_pattern_analysis_report: '주문 패턴 분석 리포트',
    orders_per_batch: '주문 수(배치당)',
    orders_per_one_sku: '1 SKU당 처리 주문 수',
    outbound_days: '출고일수',
    outbound_quantity_analysis_report: '출고 물동량 분석 리포트',
    outbound_quantity: '출고수량',
    pcs: '수량(PCS)',
    phone_number: '연락처',
    position: '직급',
    progress: '진행률',
    progressing_service: '진행중 서비스',
    quantity: '수량',
    random_sku_count_per_batch_total: '배치당 random SKU 수 합',
    ratio: '비율',
    real_time_fee_status: '실시간 요금 현황',
    retrieved_data: '데이터 조회',
    select_service: '서비스 선택',
    service_count: '분석 횟수',
    service_name: '서비스명',
    settlement_criteria: '정산기준',
    sign_up: '회원가입',
    sku_efficiency_increase: 'SKU 효율 증가',
    sku_name: 'SKU이름',
    sku_no: 'SKU번호',
    sku_per_batch_total: '배치당 SKU 수 합',
    standard_order_count: '기준 주문 수',
    status: '상태',
    storage_code: '창고코드',
    storage_loading_ratio: '보관 적재 비율',
    storage_method: '저장방식',
    storage_quantity_ratio: '보관 수량 비율',
    subscribed: '구독',
    title: '명칭',
    total_order_count_order: '총 주문 수(주문)',
    total_order_count: '총 주문 수',
    total_service: '전체 서비스',
    total_sku_count: '총 SKU 수(종류)',
    unit_pcs: '단위: PCS',
    unit_percent: '단위: %',
    unit_sku_category: '단위: SKU종류',
  },
};
