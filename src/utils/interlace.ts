export const interlace = <T1, T2>(arr1: T1[], arr2: T2[]): (T1 | T2)[] => {
  const result: (T1 | T2)[] = [];

  for (let i = 0; i < Math.max(arr1.length, arr2.length); i++) {
    if (arr1[i]) result.push(arr1[i]);
    if (arr2[i]) result.push(arr2[i]);
  }

  return result;
}