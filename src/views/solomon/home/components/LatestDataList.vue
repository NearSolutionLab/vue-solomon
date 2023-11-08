<template>
  <div :class="prefixCls">
    <div :class="`${prefixCls}__top`">
      <div>최신 데이터 분석 현황</div>
    </div>
    <div :class="`${prefixCls}__content`">
      <List item-layout="horizontal" :data-source="list">
        <template #renderItem="{ item }">
          <ListItem class="list">
            <ListItemMeta>
              <template #description>
                <div class="name">
                  <div
                    ><span>{{ item.serviceName }}</span
                    >{{ item.name }}
                  </div>
                </div>
                <div class="size">
                  <div><span>크기</span>{{ item.dataSize }}</div>
                </div>
                <div class="date">
                  <div><span>날짜</span>{{ item.requestDate }}</div>
                </div>

                <div class="progress">
                  <Progress
                    v-if="item.progressStatus !== 'success'"
                    :percent="item.progress"
                    :status="item.progressStatus"
                  />
                  <Tag class="tag" v-else :color="item.color" @click="() => onClick(item)">{{
                    item.status
                  }}</Tag>
                </div>
              </template>
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </div>
  </div>
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { List, Progress, Tag } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getServiceList } from '/@/api/solomon/service';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { formatNumber } from '/@/utils/numberUtil';
  import { SERVICE_REPORT_MAP } from '/@/views/solomon/serviceMapping';
  import { useRouter } from 'vue-router';

  const router = useRouter();
  const { t } = useI18n();
  const { prefixCls } = useDesign('latest-data-list');

  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const list = ref([]);

  onMounted(async () => {
    const params = {
      statuses: 'START,VALIDATING,ANALYSING,SOLVING,REPORTING,END',
      periodFilter: 'month',
      limit: 6,
      page: 1,
    };
    const { items } = await getServiceList(params);
    list.value = (items || []).map((item) => {
      return {
        id: item.id,
        serviceNameKey: item.service?.serviceNameKey || '',
        serviceName: item.service?.serviceName || '',
        name: item.name || '',
        dataSize: formatNumber({ num: item.dataSize || 0 }),
        requestDate: item.requestDate || '',
        status: item.status ? t(`solomon.optimizeResultStatus.${item.status}`) : '',
        progress: item.progress || 0,
        progressStatus:
          item.status === 'END' ? 'success' : item.status === 'ERROR' ? 'exception' : 'active',
        color: item.status === 'END' ? 'green' : item.status === 'ERROR' ? 'red' : 'blue',
      };
    });
  });

  const onClick = (record) => {
    if (SERVICE_REPORT_MAP[record.serviceNameKey]) {
      router.push({
        name: SERVICE_REPORT_MAP[record.serviceNameKey],
        params: {
          id: record.id,
        },
      });
    }
  };
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-latest-data-list';

  .@{prefix-cls} {
    padding: 12px;
    background-color: @component-background;

    &__top {
      div {
        margin-bottom: 12px;
        color: @text-color;
        font-size: 16px;
        font-weight: bold;
        line-height: 22px;
        text-align: left;
      }
    }

    &__content {
      .list {
        position: relative;
      }

      .name {
        display: inline-block;
        width: 35%;
        text-align: center;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
            color: black;
          }
        }
      }

      .size {
        display: inline-block;
        width: 15%;
        text-align: center;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
            color: black;
          }
        }
      }

      .date {
        display: inline-block;
        width: 25%;
        text-align: center;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
            color: black;
          }
        }
      }

      .status {
        display: inline-block;
        width: 10%;
        text-align: left;

        div {
          display: inline-block;
          padding: 0 20px;

          span {
            display: block;
            color: black;
          }
        }
      }

      .progress {
        display: inline-block;
        width: 20%;
        text-align: center;
        vertical-align: 50%;

        .tag:hover {
          cursor: pointer;
        }
      }
    }
  }
</style>
