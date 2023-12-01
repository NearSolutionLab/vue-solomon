<template>
  <BasicModal :title="modalTitle">
    <!-- 모달 내용, 예: ImpExcel 컴포넌트를 사용하여 Excel 파일 업로드 -->
    <ImpExcel @success="handleExcelSuccess" dateFormat="YYYY-MM-DD">
      <a-button class="m-3">Excel 파일 선택</a-button>
    </ImpExcel>
  </BasicModal>
</template>

<script lang="ts">
  import { Button } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal/index';
  import { ImpExcel } from '/@/components/Excel';

  export default {
    components: {
      BasicModal,
      'a-button': Button,
      ImpExcel,
    },
    props: {
      modalTitle: String,
      dataType: String,
    },
    setup(props, { emit }) {
      const handleExcelSuccess = ({ excelData, rawFile }) => {
        // Excel 파일 업로드 성공 시 실행되는 로직, 예: 부모 컴포넌트에 Excel 데이터 전달

        emit('success', { excelData, rawFile });
      };

      return {
        handleExcelSuccess,
      };
    },
  };
</script>
