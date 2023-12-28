<template>
  <div id="app">
    <PageWrapper dense contentFullHeight fixedHeight contentClass="flex">
      <template #headerContent>
        <div class="md:ml-6 flex flex-col md:mt-0 mt-2 text-left">
          <h1 class="md:text-lg text-md">{{ t('solomon.category.data.name') }}</h1>
          <span class="text-secondary">{{ t('solomon.category.data.description') }}</span>
        </div>
      </template>
      <CollapseContainer
        :title="$t('solomon.title.input_form')"
        class="w-1/4 xl:w-1/5 my-custom-form-position"
      >
        <div>
          <BasicForm @register="formRegister" ref="formRef" />
          <Button @click="openExcel">{{ t('solomon.button.next_step') }}</Button>
          <ExcelModal
            dataType="'123'"
            :modalTitle="$t('solomon.title.excel_file_upload')"
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
        :loading="loading"
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
  import { useMessage } from '/@/hooks/web/useMessage';
  import {
    inboundColumns,
    outboundColumns,
    inventoryColumns,
    inboundForm,
    outboundForm,
    inventoryForm,
  } from '../meta.data';
  // import type { UploadProps } from 'ant-design-vue';
  import { uploadExcelData } from '/@/api/solomon/data';
  //import { useRouter } from 'vue-router';

  let rawExcelFile: File;
  let title: string;
  let type: string;
  const { t } = useI18n();
  //const { notification, createErrorModal } = useMessage();
  const { createErrorModal } = useMessage();
  //const router = useRouter();
  const loading = ref(false);
  const schemas: FormSchema[] = [
    {
      field: 'title',
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
            label: t('solomon.label.inbound'),
            value: 'INBOUND',
          },
          {
            label: t('solomon.label.outbound'),
            value: 'OUTBOUND',
          },
          {
            label: t('solomon.label.inventory'),
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
        title: t('solomon.title.total_service'),
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
          title: t('solomon.title.details'),
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
        // console.log('record>>>', record);
        openServiceDetailModal(true, record);
      };

      const handleSuccess = () => {};

      const openExcel = () => {
        // 다음 단계 버튼 클릭 시 실행되는 로직, 예: Excel 모달 열기
        setExcelModalProps({ showOkBtn: false, showCancelBtn: false });
        openExcelModal(true);
      };

      async function handleMappingModalOk(rawData) {
        // console.log('results', rawData);
        // console.log('rawfile', rawExcelFile);
        try {
          if (rawData) {
            loading.value = true;
            const formData = new window.FormData();
            formData.append('file', rawExcelFile);
            formData.append('count', JSON.stringify(rawExcelFile.size));
            formData.append('fields', JSON.stringify(rawData.columnFilter));
            // formData.append('fields', JSON.stringify(rawData.header));

            const result = await uploadExcelData(title, type, formData);
            closeMappingModal();
            // if (result) {
            //   notification.success({
            //     message: t('sys.login.registerSuccessTitle'),
            //     description: `${t('sys.login.loginSuccessDesc')}: `,
            //     duration: 3,
            //   });
            // }
            // // todo. 회원가입 성공 시 팝업 3초 표시 이후 새로고침하여 처음 로그인 페이지로 진입할 수 있도록 했으나, 다른 방식 필요해 보임.
            // await new Promise((resolve) => {
            //   setTimeout(resolve, 3000);
            // });
            return result;
          }
        } catch (error) {
          createErrorModal({
            title: t('sys.api.errorTip'),
            content: (error as unknown as Error).message || t('sys.api.networkExceptionMsg'),
            getContainer: () => document.body,
          });
        } finally {
          loading.value = false;
        }

        //   file: rawExcelFile,
        //   data: formData,
        // });
        // Excel 모달의 OK 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
      }

      const handleMappingModalCancel = () => {
        // Excel 모달의 취소 버튼 클릭 시 실행되는 로직, 예: 모달 닫기
        closeExcelModal();
      };
      async function handleExcelSuccess({ excelData, rawFile }) {
        rawExcelFile = rawFile;
        const data = await formRef.value.validate();
        title = data.title;
        type = data.type;
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
        loading,
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
