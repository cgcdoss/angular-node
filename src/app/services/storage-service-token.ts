import { InjectionToken } from "@angular/core";

export const LOCALSTORAGE = new InjectionToken<Storage>('LocalStorage', {
  factory: () => localStorage,
  providedIn: 'root',
});

export const SESSIONSTORAGE = new InjectionToken<Storage>('SessionStorage', {
  factory: () => sessionStorage,
  providedIn: 'root',
});

export const MYCUSTOMLOCALSTORAGE = new InjectionToken<MyStorage>('CustomLocalStorage', {
  factory: () => {
    return {
      clear: () => localStorage.clear(),
      getItem: (key) => localStorage.getItem(key),
      key: (index) => localStorage.key(index),
      length: localStorage.length,
      removeItem: (key) => localStorage.removeItem(key),
      setItem: (key, value) => localStorage.setItem('Custom: ' + key, value)
    }
  },
  providedIn: 'root'
});

export interface MyStorage {
  readonly length: number;
  clear(): void;
  getItem(key: string): string | null;
  key(index: number): string | null;
  removeItem(key: string): void;
  setItem(key: string, value: string): void;
  [name: string]: any;
}
