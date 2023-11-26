<template>
  <BasicModal @register="registerModal">
    <div>
      <BasicForm
        @register="registerForm"
        ref="formRef"
        @field-value-change="handleChange"
        @ok="handleOk"
      />
    </div>
    <BasicTable @register="registerTable" />
  </BasicModal>
</template>

<script lang="ts">
  import { ref } from 'vue';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';

  import { BasicTable, useTable, BasicColumn } from '/@/components/Table';
  import { BasicModal, useModalInner } from '/@/components/Modal/index';
  import { ExcelData } from '/@/components/Excel';

  let columns: BasicColumn[];
  let forms: FormSchema[];
  let excelData: ExcelData[];
  export default {
    components: {
      BasicModal,
      BasicTable,
      BasicForm,
    },
    props: {
      columns: Array,
      modalTitle: String,
      dataType: String,
    },
    setup(props, { emit }) {
      const formRef = ref();
      const [registerModal, {}] = useModalInner((data) => {
        // setModalProps({ confirmLoading: false });
        columns = data.columns;
        forms = data.forms;
        excelData = data.data;
        setProps({ schemas: forms });
        setPropsTable({ columns: columns });
      });
      // 'vertical' | 'inline' | 'horizontal'
      const [registerForm, { setProps }] = useForm({
        layout: 'horizontal',
        showActionButtonGroup: false,
        labelWidth: 120,
        baseColProps: { span: 4 },
        showSubmitButton: true,
      });
      const [registerTable, { setProps: setPropsTable, setTableData }] = useTable({
        title: '입력 데이터 조회',
        rowKey: 'id',
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
      });

      console.log('mapping props', props);
      const handleOk = () => {
        // OK 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
        emit('ok');
      };

      const handleCancel = () => {
        // 취소 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
        emit('cancel');
      };

      async function handleChange(key, value) {
        const valueData = await formRef.value.validate();
        console.log('change', key);
        console.log('change value', value);
        console.log('formRef', valueData);
        console.log('excelData', excelData);
        const filteredColumns = Object.entries(valueData).filter(([_, val]) => val != undefined);
        if (filteredColumns.length == 0) {
          setTableData([]);
        } else {
          const filteredDataList = [];
          for (const raw of excelData[0].results) {
            const filteredData = {};
            for (const columns of filteredColumns) {
              filteredData[columns[0]] = raw[columns[1]];
            }
            filteredDataList.push(filteredData);
          }

          setTableData(filteredDataList);
        }
      }

      return {
        handleOk,
        handleCancel,
        handleChange,
        registerModal,
        registerTable,
        registerForm,
        formRef,
      };
    },
  };
</script>
