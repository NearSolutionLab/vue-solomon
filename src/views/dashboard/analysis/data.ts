export interface GrowCardItem {
  icon: string;
  title: string;
  value: number;
  total: number;
  color: string;
  action: string;
}

export const growCardList: GrowCardItem[] = [
  {
    title: '방문자 수',
    icon: 'visit-count|svg',
    value: 2000,
    total: 120000,
    color: 'green',
    action: '월',
  },
  {
    title: '거래금액',
    icon: 'total-sales|svg',
    value: 20000,
    total: 500000,
    color: 'blue',
    action: '월',
  },
  {
    title: '다운로드 수',
    icon: 'download-count|svg',
    value: 8000,
    total: 120000,
    color: 'orange',
    action: '주',
  },
  {
    title: '거래량',
    icon: 'transaction|svg',
    value: 5000,
    total: 50000,
    color: 'purple',
    action: '연간',
  },
];
