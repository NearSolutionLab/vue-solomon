import { isNumber } from '/@/utils/is';

export function formatNumber({
  num,
  decimals = 0,
  decimal = '.',
  separator = ',',
  suffix = '',
  prefix = '',
}: {
  num: number | string;
  decimals?: number;
  decimal?: string;
  separator?: string;
  suffix?: string;
  prefix?: string;
}) {
  if (decimals < 0) {
    return num;
  }
  if (!num && num !== 0) {
    return '';
  }
  num = Number(num).toFixed(decimals);
  num += '';

  const x = num.split('.');
  let x1 = x[0];
  const x2 = x.length > 1 ? decimal + x[1] : '';

  const rgx = /(\d+)(\d{3})/;
  if (separator && !isNumber(separator)) {
    while (rgx.test(x1)) {
      x1 = x1.replace(rgx, '$1' + separator + '$2');
    }
  }
  return prefix + x1 + x2 + suffix;
}

export function stringToNumber(num: string | number) {
  if (typeof num === 'number') return num;
  return parseFloat(num.replace(/[^\d.-]+/g, ''));
}
