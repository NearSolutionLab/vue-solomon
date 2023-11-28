<template>
  <BasicModal @ok="handleOk" @cancel="handleCancel" :title="modalTitle">
    <!-- 모달 내용, 예: ImpExcel 컴포넌트를 사용하여 Excel 파일 업로드 -->
    <ImpExcel @success="handleExcelSuccess" dateFormat="YYYY-MM-DD">
      <a-button class="m-3">Excel 파일 선택</a-button>
    </ImpExcel>
  </BasicModal>
</template>

<script lang="ts">
  import { Button } from 'ant-design-vue';
  import { BasicModal } from '/@/components/Modal/index';
  import { ImpExcel, ExcelData } from '/@/components/Excel';

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
      console.log(props);

      const handleOk = () => {
        // OK 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
        emit('ok');
      };

      const handleCancel = () => {
        // 취소 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
        emit('cancel');
      };

      const handleExcelSuccess = (excelDataList: ExcelData[]) => {
        // Excel 파일 업로드 성공 시 실행되는 로직, 예: 부모 컴포넌트에 Excel 데이터 전달
        console.log('success');
        console.log(excelDataList);

        emit('success', excelDataList);
      };

      return {
        handleOk,
        handleCancel,
        handleExcelSuccess,
      };
    },
  };
</script>
