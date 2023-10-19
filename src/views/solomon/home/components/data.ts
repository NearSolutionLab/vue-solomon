export const cardList = (() => {
  const result: any[] = [];
  for (let i = 0; i < 6; i++) {
    result.push({
      id: i,
      optimizeName: 'Vben Admin',
      dataSize: '123',
      dateOfAnalysis: '1',
      status: '1',
      progress: 20 * (i + 1),
    });
  }
  return result;
})();
