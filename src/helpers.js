//答えの選択の順序の調整
export const shuffleAnswers = (answers) => {
  if (!answers) {
    return [];
  }
  return answers
    .map((a) => ({ sort: Math.random(), value: a }))
    .sort((a, b) => a.sort - b.sort)
    .map((a) => a.value);
};
