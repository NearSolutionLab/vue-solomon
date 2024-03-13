<template>
  <BasicModal @register="registerModal" @ok="handleOk">
    <div>
      <BasicForm @register="registerForm" ref="formRef" @field-value-change="handleChange" />
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
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();

  let columns: BasicColumn[];
  let forms: FormSchema[];
  let excelData: ExcelData[];
  let filteredDataResult: ExcelData;
  let filteredColumns;
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
    setup(_, { emit }) {
      const formRef = ref();
      const [registerForm, { setProps, resetFields }] = useForm({
        layout: 'horizontal',
        showActionButtonGroup: false,
        labelWidth: 120,
        baseColProps: { span: 4 },
        showSubmitButton: true,
      });

      const [registerTable, { setProps: setPropsTable, setTableData }] = useTable({
        title: t('solomon.label.input_data_retrieval'),
        rowKey: 'id',
        useSearchForm: false,
        showTableSetting: false,
        bordered: true,
        showIndexColumn: false,
      });

      const [registerModal] = useModalInner((data) => {
        // setModalProps({ confirmLoading: false });
        columns = data.columns;
        forms = data.forms;
        excelData = data.data;
        setProps({ schemas: forms });
        setPropsTable({ columns: columns });
        resetFields();
        setTableData([]);
      });
      // 'vertical' | 'inline' | 'horizontal'

      const handleOk = () => {
        // console.log(e);
        // console.log('filteredColumns', filteredColumns);
        let columnFilter = {};
        filteredColumns.map((column) => {
          columnFilter[column[0]] = filteredDataResult.header.indexOf(column[1]);
        });

        emit('success', { filteredDataResult, columnFilter });
      };

      async function handleChange() {
        const valueData = await formRef.value.validate();
        filteredColumns = Object.entries(valueData).filter(([_, val]) => val != undefined);

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
          // console.log(filteredDataList);
          setTableData(filteredDataList);
          filteredDataResult = {
            results: [...filteredDataList],
            header: excelData[0].header,
            meta: excelData[0].meta,
          };
        }
      }

      return {
        handleChange,
        handleOk,
        registerModal,
        registerTable,
        registerForm,
        formRef,
      };
    },
  };
</script>
