const headers = new Headers();

headers.append('Access-Control-Allow-Origin', '*')

export const slimGet = async (url: string) => await (await fetch(url, {
  headers
})).json();
export const slimDelete = async (url: string) => await (await fetch(url, {
  method: 'DELETE',
  headers
})).json();

export const slimPut = async <T>(url: string, data?: T) => await (await fetch(url, {
  body: JSON.stringify(data),
  method: 'PUT',
  headers
}))

export const slimPost =async <T>(url:string, data?: T) => await (await fetch(url, {
  body: JSON.stringify(data),
  method: 'POST',
  headers
}))