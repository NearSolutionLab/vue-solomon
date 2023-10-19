<template>
  <!-- <PageWrapper :class="prefixCls"> -->
  <!-- <Card title="최신 데이터 분석" v-bind="$attrs"> -->
  <div :class="prefixCls">
    <div :class="`${prefixCls}__content`">
      <List item-layout="horizontal" :data-source="list">
        <template #renderItem="{ item }">
          <ListItem>
            <ListItemMeta>
              <template #description>
                <!-- <div class="description">
                  <div><span>Owner</span>{{ item.dataSize }}</div>
                </div> -->
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
                <!-- <div class="info">
                  <div><span>명칭</span>{{ item.name }}</div>
                  <div><span>크기</span>{{ item.dataSize }}</div>
                  <div><span>날짜</span>{{ item.requestDate }}</div>
                  <div><span>상태</span>{{ item.status }}</div>
                </div> -->

                <div class="progress">
                  <Progress :percent="item.progress" status="active" />
                </div>
              </template>
              <!-- eslint-disable-next-line -->
              <!-- <template #title>
                <div class="title">
                  <div>{{ item.serviceName }}</div>
                </div>
              </template> -->
            </ListItemMeta>
          </ListItem>
        </template>
      </List>
    </div>
  </div>
  <!-- </Card> -->
  <!-- </PageWrapper> -->
</template>
<script lang="ts" setup>
  import { ref, onMounted } from 'vue';
  import { List, Progress } from 'ant-design-vue';
  import { useDesign } from '/@/hooks/web/useDesign';
  import { getOptimizeResultByStatus } from '/@/api/solomon/optimizeRequest';
  import { useI18n } from '/@/hooks/web/useI18n';

  const { t } = useI18n();
  const { prefixCls } = useDesign('latest-data-list');

  const ListItem = List.Item;
  const ListItemMeta = List.Item.Meta;

  const list = ref([]);

  onMounted(async () => {
    const response = await getOptimizeResultByStatus();
    const { result } = response;
    list.value = (result.items || []).map((item) => {
      return {
        serviceName: item.service?.serviceName || '',
        name: item.name || '',
        dataSize: item.dataSize || 0,
        requestDate: item.requestDate || '',
        status: item.status ? t(`solomon.optimizeResultStatus.${item.status}`) : '',
        progress: item.progress || 0,
      };
    });
    console.log(response);
  });
</script>
<style lang="less" scoped>
  @prefix-cls: ~'@{namespace}-latest-data-list';

  .@{prefix-cls} {
    &__top {
      padding: 24px;
      background-color: @component-background;
      text-align: center;

      &-col {
        &:not(:last-child) {
          border-right: 1px dashed @border-color-base;
        }

        div {
          margin-bottom: 12px;
          color: @text-color;
          font-size: 14px;
          line-height: 22px;
        }

        p {
          margin: 0;
          color: @text-color;
          font-size: 24px;
          line-height: 32px;
        }
      }
    }

    &__content {
      margin-top: 12px;
      padding: 12px;
      background-color: @component-background;

      .list {
        position: relative;
      }

      .icon {
        font-size: 40px !important;
      }

      .extra {
        position: absolute;
        top: 20px;
        right: 15px;
        color: @primary-color;
        font-weight: normal;
        cursor: pointer;
      }

      // .description {
      //   display: inline-block;
      //   width: 40%;
      // }
      // .title {
      //   div {
      //     display: inline-block;
      //     padding: 0 20px;
      //   }
      // }

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
        vertical-align: top;
      }
    }
  }
</style>
