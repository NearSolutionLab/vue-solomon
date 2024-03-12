<template>
  <div class="m-4 mr-0 overflow-hidden bg-white">
    <BasicTree
      :title="$t('solomon.title.dataset')"
      toolbar
      search
      treeWrapperClassName="h-[calc(100%-35px)] overflow-auto"
      :clickRowToExpand="true"
      :treeData="treeData"
      :fieldNames="{ key: 'key', title: 'title' }"
      @select="handleSelect"
      :renderIcon="createIcon"
      :beforeRightClick="handleRightClickMenu"
    />
    <DataTreeDrawer @register="registerDrawer" @success="handleSuccess" />
    <ExcelModal
      :modalTitle="$t('solomon.title.excel_file_upload')"
      @success="handleExcelSuccess"
      @register="registerExcelModal"
    />
    <DataMappingModal
      @register="registerDataMappingModal"
      @success="handleMappingModalOk"
      @cancel="handleMappingModalCancel"
      :loading="loading"
    />
  </div>
</template>

<script lang="ts">
  import { defineComponent, onMounted, ref } from 'vue';
  import { BasicTree, TreeItem } from '/@/components/Tree';
  import { BasicColumn } from '/@/components/Table';
  import { getDataSetList, deleteDataSet, updateExcelData } from '/@/api/solomon/data';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { useMessage } from '/@/hooks/web/useMessage';
  import DataTreeDrawer from './DataTreeDrawer.vue';
  import { useDrawer } from '/@/components/Drawer';
  import ExcelModal from '../../data/create/ExcelModal.vue';
  import DataMappingModal from '../../data/create/DataMappingModal.vue';
  import { useModal } from '/@/components/Modal';
  import { FormSchema } from '/@/components/Form/index';
  import { ExcelData } from '/@/components/Excel';
  import {
    inboundColumns,
    outboundColumns,
    inventoryColumns,
    orderColumns,
    inboundForm,
    outboundForm,
    inventoryForm,
    orderForm,
  } from '../../data/meta.data';

  let rawExcelFile: File;
  const loading = ref(false);
  const { createErrorModal } = useMessage();
  export default defineComponent({
    name: 'DataTree',
    components: { BasicTree, DataTreeDrawer, ExcelModal, DataMappingModal },
    emits: ['select'],
    setup(_, { emit }) {
      const { t } = useI18n();
      let data = {
        title: '',
        type: '',
        key: '',
      };
      const treeData = ref<TreeItem[]>([]);
      const { createConfirm } = useMessage();
      const [registerDrawer, { openDrawer }] = useDrawer();
      const [
        registerExcelModal,
        {
          openModal: openExcelModal,
          setModalProps: setExcelModalProps,
          closeModal: closeExcelModal,
        },
      ] = useModal();
      const [
        registerDataMappingModal,
        {
          openModal: openDataMappingModal,
          setModalProps: setMappingModalProps,
          closeModal: closeMappingModal,
        },
      ] = useModal();
      async function fetch() {
        const params = {
          sort: JSON.stringify([{ field: 'created_at', ascending: false }, { field: 'dataType' }]),
          limit: 1000,
        };
        const { items } = await getDataSetList(params);
        const dataTypes = items.reduce((acc, curr) => {
          const exists = acc.find((i) => i.key === curr.dataType);
          if (exists) {
            return acc;
          }
          return [
            ...acc,
            {
              key: curr.dataType,
              title: t(`solomon.data.${curr.dataType}`),
              children: [],
            },
          ];
        }, []);

        const result: any[] = [];
        for (let i = 0; i < dataTypes.length; i++) {
          result.push({
            key: dataTypes[i].key,
            title: dataTypes[i].title,
            children: (() => {
              const children: any[] = [];
              for (let j = 0; j < items.length; j++) {
                if (dataTypes[i].key === items[j].dataType) {
                  children.push({
                    key: items[j].id,
                    title: items[j].name + ` (${items[j].sendType})`,
                    isLeaf: true,
                    dataType: items[j].dataType,
                    name: items[j].name,
                    status: items[j].status,
                  });
                }
              }
              return children;
            })(),
          });
        }

        treeData.value = result as unknown as TreeItem[];
      }

      function handleSelect(keys, { selectedNodes }) {
        emit('select', {
          id: keys[0],
          dataType: selectedNodes[0].dataType,
          isLeaf: selectedNodes[0].isLeaf,
        });
      }

      async function handleRightClickMenu(node) {
        if (!node.isLeaf || !node.key) return;

        const addData = {
          label: '데이터 추가',
          icon: 'ion:md-add',
          handler: () => {
            console.log(node);
            data.key = node.key;
            data.title = node.name;
            data.type = node.dataType;
            if (['WAIT', 'PROCESSING'].includes(node.status)) {
              createErrorModal({
                title: t('sys.api.errorTip'),
                content: t('sys.api.errorDataLock'),
                getContainer: () => document.body,
              });
            } else {
              openExcel();
            }
          },
        };

        const editItem = {
          label: '수정',
          icon: 'ion:settings-outline',
          handler: () => {
            openDrawer(true, {
              id: node.key,
              name: node.name,
            });
          },
        };
        const deleteItem = {
          label: '삭제',
          icon: 'ion:trash-outline',
          handler: () => {
            createConfirm({
              iconType: 'warning',
              title: '삭제',
              content: '삭제하시겠습니까?',
              onOk: async () => {
                const result = await deleteDataSet(node.key, node.dataType);
                if (result) fetch();
              },
            });
          },
        };

        return [addData, editItem, deleteItem];
      }

      onMounted(async () => {
        fetch();
      });

      function createIcon({ isLeaf }: any): any {
        if (isLeaf) {
          return 'ion:document-outline';
        }
        return '';
      }

      function handleSuccess() {
        fetch();
      }
      function openExcel() {
        // 다음 단계 버튼 클릭 시 실행되는 로직, 예: Excel 모달 열기
        setExcelModalProps({ showOkBtn: false, showCancelBtn: false });
        openExcelModal(true);
      }
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

            const result = await updateExcelData(data.key, data.title, data.type, formData);
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
        // const data = await formRef.value.validate();
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
          } else if (data.type === 'ORDER') {
            typeData = {
              columns: orderColumns,
              forms: orderForm,
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
        treeData,
        handleSelect,
        createIcon,
        handleRightClickMenu,
        registerDrawer,
        handleSuccess,
        handleExcelSuccess,
        registerDataMappingModal,
        registerExcelModal,
        handleMappingModalOk,
        handleMappingModalCancel,
        loading,
      };
    },
  });
</script>
