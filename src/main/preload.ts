import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('electronAPI', {
  send: (channel: string, payload: any) => ipcRenderer.send(channel, payload),
  invoke: (channel: string, payload?: any) => ipcRenderer.invoke(channel, payload),
  on: (channel: string, listener: (...args: any[]) => void) => ipcRenderer.on(channel, (_e, ...args) => listener(...args))
});