<template>
  <div id="app">
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
      <template #headerContent>
        <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
          <h1 class="md:text-lg text-md">{{ t('solomon.category.data.name') }}</h1>
          <span class="text-secondary">{{ t('solomon.category.data.description') }}</span>
        </div>
      </template>
      <CollapseContainer title="입력 양식" class="w-1/4 xl:w-1/5 my-custom-form-position">
        <div>
          <BasicForm @register="formRegister" ref="formRef" />
          <Button @click="openExcel">다음 단계</Button>
          <ExcelModal
            dataType="'123'"
            modalTitle="Excel 파일 업로드"
            @success="handleExcelSuccess"
            @register="registerExcelModal"
          />
        </div>
      </CollapseContainer>
      <BasicTable @register="registerTable" class="w-3/4 p-4 xl:w-4/5">
        <template #bodyCell="{ column, record }">
          <template v-if="column.key === 'action'">
            <TableAction
              :actions="[
                {
                  icon: 'fluent-mdl2:report-document',
                  onClick: showDetail.bind(null, record),
                },
              ]"
            />
          </template>
        </template>
      </BasicTable>
      <DataMappingModal
        @register="registerDataMappingModal"
        @success="handleMappingModalOk"
        @cancel="handleMappingModalCancel"
      />
      <ServiceDetailModal @register="registerServiceDetailModal" @success="handleSuccess" />
    </PageWrapper>
  </div>
</template>
<script lang="ts">
  import { CollapseContainer } from '/@/components/Container/index';
  import { Button } from 'ant-design-vue';
  import { PageWrapper } from '/@/components/Page';
  import { defineComponent, ref } from 'vue';
  import { BasicTable, useTable, TableAction, BasicColumn } from '/@/components/Table';
  import { columns, searchFormSchema } from '/@/views/solomon/subscription/subscription.data';
  import { BasicForm, FormSchema, useForm } from '/@/components/Form/index';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useModal } from '/@/components/Modal';
  import ServiceDetailModal from '/@/views/solomon/subscription/ServiceDetailModal.vue';
  import { getServiceSelectionList } from '/@/api/solomon/service';
  import ExcelModal from './ExcelModal.vue';
  import { ExcelData } from '/@/components/Excel';
  import DataMappingModal from './DataMappingModal.vue';

  import {
    inboundColumns,
    outboundColumns,
    inventoryColumns,
    inboundForm,
    outboundForm,
    inventoryForm,
  } from '../meta.data';
  // import type { UploadProps } from 'ant-design-vue';
  // import { uploadExcelData } from '/@/api/solomon/data';
  let rawExcelFile: File;
  const { t } = useI18n();
  const schemas: FormSchema[] = [
    {
      field: 'name',
      component: 'Input',
      label: t('solomon.data.name'),
    },
    {
      field: 'type',
      component: 'Select',
      label: t('solomon.data.type'),
      componentProps: {
        options: [
          {
            label: '입고',
            value: 'INBOUND',
          },
          {
            label: '출고',
            value: 'OUTBOUND',
          },
          {
            label: '재고',
            value: 'INVENTORY',
          },
        ],
      },
    },
    {
      field: 'method',
      component: 'Select',
      label: t('solomon.data.method'),
      componentProps: {
        options: [
          {
            label: 'Excel',
            value: 'excel',
          },
          // {
          //   label: 'DB',
          //   value: 'db',
          // },
        ],
      },
    },
  ];

  export default defineComponent({
    name: 'CreatePage',
    components: {
      BasicForm,
      BasicTable,
      TableAction,
      PageWrapper,
      CollapseContainer,
      ServiceDetailModal,
      Button,
      ExcelModal,
      DataMappingModal,
    },
    setup() {
      const formRef = ref();
      // const fileList = ref<UploadProps['fileList']>([]);
      // const uploading = ref<boolean>(false);
      const { prefixCls } = useDesign('header-userInfo-modal');
      const [formRegister] = useForm({
        showActionButtonGroup: false,
        labelWidth: 120,
        schemas: schemas,
        baseColProps: { span: 24 },
        showSubmitButton: true,
      });
      const [
        registerExcelModal,
        {
          openModal: openExcelModal,
          setModalProps: setExcelModalProps,
          closeModal: closeExcelModal,
        },
      ] = useModal();
      const [registerServiceDetailModal, { openModal: openServiceDetailModal }] = useModal();
      const [
        registerDataMappingModal,
        {
          openModal: openDataMappingModal,
          setModalProps: setMappingModalProps,
          closeModal: closeMappingModal,
        },
      ] = useModal();
      const [registerTable] = useTable({
        title: '전체 서비스',
        api: getSubscriptionService,
        rowKey: 'id',
        columns,
        formConfig: {
          labelWidth: 120,
          schemas: searchFormSchema,
          autoSubmitOnEnter: true,
        },
        useSearchForm: false,
        showTableSetting: true,
        bordered: true,
        showIndexColumn: false,
        actionColumn: {
          width: 120,
          title: '상세보기',
          dataIndex: 'action',
          // slots: { customRender: 'action' },
        },
      });
      async function getSubscriptionService() {
        const result = await getServiceSelectionList();
        const items = result.map((item) => ({
          ...item,
          description: t(`solomon.${item.serviceNameKey}.desc`),
        }));
        return items;
      }

      const showDetail = (record) => {
        console.log('record>>>', record);
        openServiceDetailModal(true, record);
      };

      const handleSuccess = () => {};

      const openExcel = () => {
        // 다음 단계 버튼 클릭 시 실행되는 로직, 예: Excel 모달 열기
        setExcelModalProps({ showOkBtn: false, showCancelBtn: false });
        openExcelModal(true);
      };

      async function handleMappingModalOk(rawData: ExcelData) {
        console.log('results', rawData);
        console.log('rawfile', rawExcelFile);
        if (rawData) {
          const formData = new FormData();
          formData.append('fields', JSON.stringify(rawData.header));
          formData.append('count', JSON.stringify(rawData.results.length));
          console.log(formData.getAll('fields'));

          //   file: rawExcelFile,
          //   data: formData,
          // });
          // Excel 모달의 OK 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
          closeMappingModal();
        }
      }

      const handleMappingModalCancel = () => {
        // Excel 모달의 취소 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
        closeExcelModal();
      };
      async function handleExcelSuccess({ excelData, rawFile }) {
        rawExcelFile = rawFile;
        const data = await formRef.value.validate();
        setMappingModalProps({
          defaultFullscreen: true,
        });
        let typeData: {
          columns: BasicColumn[];
          forms: FormSchema[];
          data: ExcelData[];
        };
        closeExcelModal();
        if (data) {
          if (data.type === 'INBOUND') {
            typeData = {
              columns: inboundColumns,
              forms: inboundForm,
              data: excelData,
            };
            typeData['forms'].map((form: FormSchema) => {
              form['componentProps']['options'] = excelData[0].header.map((col) => {
                return { label: col, value: col };
              });
            });

            openDataMappingModal(true, typeData);
          } else if (data.type === 'OUTBOUND') {
            typeData = {
              columns: outboundColumns,
              forms: outboundForm,
              data: excelData,
            };
            typeData['forms'].map((form: FormSchema) => {
              form['componentProps']['options'] = excelData[0].header.map((col) => {
                return { label: col, value: col };
              });
            });
            openDataMappingModal(true, typeData);
          } else if (data.type === 'INVENTORY') {
            typeData = {
              columns: inventoryColumns,
              forms: inventoryForm,
              data: excelData,
            };
            typeData['forms'].map((form: FormSchema) => {
              form['componentProps']['options'] = excelData[0].header.map((col) => {
                return { label: col, value: col };
              });
            });
            openDataMappingModal(true, typeData);
          }
        }
      }
      return {
        formRef,
        formRegister,
        prefixCls,
        registerTable,
        registerServiceDetailModal,
        registerExcelModal,
        getSubscriptionService,
        showDetail,
        handleSuccess,
        openExcel,
        handleExcelSuccess,
        registerDataMappingModal,
        handleMappingModalOk,
        handleMappingModalCancel,
        t,
      };
    },
  });
</script>

<style>
  #app {
    text-align: center;
  }

  .my-custom-form-position {
    /* 원하는 스타일 또는 위치 조정을 여기에 추가하세요 */

    /* 예: margin-top: 20px; 또는 top: 0; */
    margin-top: 20px;
  }

  .my-custom-form-position > div > a-button {
    position: absolute;
  }
</style>
