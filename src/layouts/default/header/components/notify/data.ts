export interface ListItem {
  id: string;
  avatar: string;
  // 通知的标题内容
  title: string;
  // 是否在标题上显示删除线
  titleDelete?: boolean;
  datetime: string;
  type: string;
  read?: boolean;
  description: string;
  clickClose?: boolean;
  extra?: string;
  color?: string;
}

export interface TabItem {
  key: string;
  name: string;
  list: ListItem[];
  unreadlist?: ListItem[];
}

export const tabListData: TabItem[] = [
  {
    key: '1',
    name: '알림',
    list: [
      {
        id: '000000001',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/ThXAXghbEsBCCSDihZxY.png',
        title: '14개의 소식',
        description: '',
        datetime: '2017-08-09',
        type: '1',
      },
      {
        id: '000000002',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/OKJXDXrmkNshAMvwtvhu.png',
        title: '요청한 주문 패턴 분석이 완료되었습니다',
        description: '',
        datetime: '2017-08-08',
        type: '1',
      },
      {
        id: '000000003',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/kISTdvpyTAhtGxpovNWd.png',
        title: '이러한 형식은 여러 알림 유형을 구별할 수 있습니다',
        description: '',
        datetime: '2017-08-07',
        // read: true,
        type: '1',
      },
      {
        id: '000000004',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '왼쪽 아이콘은 유형을 구분하기 위해 사용합니다',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000005',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title:
          '제목에 자동 표시 줄임을 설정할 수 있습니다. 이 예제에서는 제목 줄 수를 한 줄로 설정했습니다. 내용이 한 줄 이상이면 자동으로 잘리고 툴팁으로 전체 제목을 표시합니다.',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '왼쪽 아이콘은 유형을 구분하기 위해 사용합니다',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '왼쪽 아이콘은 유형을 구분하기 위해 사용합니다',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '왼쪽 아이콘은 유형을 구분하기 위해 사용합니다',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000009',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '왼쪽 아이콘은 유형을 구분하기 위해 사용합니다',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
      {
        id: '000000010',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/GvqBnKhFgObvnSGkDsje.png',
        title: '왼쪽 아이콘은 유형을 구분하기 위해 사용합니다',
        description: '',
        datetime: '2017-08-07',
        type: '1',
      },
    ],
  },
  {
    key: '2',
    name: '소식',
    list: [
      {
        id: '000000006',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '댓글이 달렸습니다',
        description: '설명',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000007',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '답장이 도착했습니다',
        description: 'This template is used to remind who is interacting with you.',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
      {
        id: '000000008',
        avatar: 'https://gw.alipayobjects.com/zos/rmsportal/fcHMVNCjPOsbUGdEduuv.jpeg',
        title: '제목',
        description:
          'Move your mouse here to test how long messages will be handled here. The maximum number of lines set in this example is 2 and more than 2 lines of description will be omitted and the full contents can be viewed through tooltip.',
        datetime: '2017-08-07',
        type: '2',
        clickClose: true,
      },
    ],
  },
  {
    key: '3',
    name: '처리대기',
    list: [
      {
        id: '000000009',
        avatar: '',
        title: '작업명',
        description: '작업필요 2017-01-12 20:00 프론트 시작',
        datetime: '',
        extra: '시작안함',
        color: '',
        type: '3',
      },
      {
        id: '000000010',
        avatar: '',
        title: '서드파티 긴급 코드 변경',
        description: '2017-01-07 까지 코드 변경 작업을 완료해야 합니다.',
        datetime: '',
        extra: '기한임박',
        color: 'red',
        type: '3',
      },
      {
        id: '000000011',
        avatar: '',
        title: '정보보안시험',
        description: '2017-01-09 시작',
        datetime: '',
        extra: '8일 남음',
        color: 'gold',
        type: '3',
      },
      {
        id: '000000012',
        avatar: '',
        title: 'ABCD 버전 발표',
        description: '2017-01-09 시작',
        datetime: '',
        extra: '진행중',
        color: 'blue',
        type: '3',
      },
    ],
  },
];
