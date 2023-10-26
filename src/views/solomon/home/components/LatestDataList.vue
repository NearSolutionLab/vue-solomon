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
                <div class="status">
                  <div><span>상태</span>{{ item.status }}</div>
                </div>

                <div class="progress">
                  <Progress :percent="item.progress" status="active" />
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
  import { List, Progress } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getServiceList } from '/@/api/solomon/service';
  import { useI18n } from '/@/hooks/web/useI18n';
  import { formatNumber } from '/@/utils/numberUtil';

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
        serviceName: item.service?.serviceName || '',
        name: item.name || '',
        dataSize: formatNumber({ num: item.dataSize || 0 }),
        requestDate: item.requestDate || '',
        status: item.status ? t(`solomon.optimizeResultStatus.${item.status}`) : '',
        progress: item.progress || 0,
      };
    });
  });
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
        width: 30%;
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
        width: 20%;
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
        vertical-align: 50%;
      }
    }
  }
</style>
