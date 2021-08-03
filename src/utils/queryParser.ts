export const queryParser = (queryString: string) => {
  const query = new Map<string, string>();

  queryString.split('&').forEach(i => {
    const pair = i.split('=');
    query.set(pair[0], pair[1]);
  });

  return query;
}