export function dealQuery(query){
  let params = '';
  for (const key in query) {
    if (Object.prototype.hasOwnProperty.call(query, key)) {
      params = `${params}&${key}=${query[key]}`;
    }
  }
  return params ? `?${params}` : '';
}
