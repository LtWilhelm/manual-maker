export function idb(storeName: string, method: 'put' | 'get' | 'getOne' | 'delete', value?: any & { _id: string, uuid: string }): Promise<any> {
  return new Promise((resolve, reject) => {
    const request = window.indexedDB.open('manuals', 1);

    let db: IDBDatabase, tx: IDBTransaction, store: IDBObjectStore;

    request.onupgradeneeded = e => {
      const db = request.result;

      const stores = [
        ['manuals', 'uuid'],
      ];

      for (const store of stores) {
        if (!db.objectStoreNames.contains(store[0]))
          db.createObjectStore(store[0], { keyPath: store[1] });
      }
    }

    request.onerror = e => {
      console.log("Something broke...");
    }

    request.onsuccess = function () {
      db = request.result;

      tx = db.transaction(storeName, 'readwrite');

      store = tx.objectStore(storeName);

      db.onerror = function (e) {
        console.error('IDB Error', e)
      }

      tx.oncomplete = function () {
        db.close();
      }

      switch (method) {
        case 'put':
          store.put(value);
          resolve(value);
          break;
        case 'get':
          const all = store.getAll();
          all.onsuccess = function () {
            resolve(all.result);
          }
          break;
        case 'getOne':
          const one = store.get(value._id ? value._id : value.uuid);
          one.onsuccess = function () {
            resolve(one.result);
          }
          break;
        case 'delete':
          const del = store.delete(value._id ? value._id : value.uuid);
          del.onsuccess = () => resolve(del.result);
          break;
        default:
          console.log('Invalid method');
          reject('Invalid method');
      }
    }
  })
}