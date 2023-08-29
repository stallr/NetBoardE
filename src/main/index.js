import { app, shell, BrowserWindow ,ipcMain,Tray, Menu, nativeImage} from 'electron'
import { join } from 'path'
import path from 'node:path'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import icon from '../../resources/netboard.png'
import {getResource} from "./Utils/RealPath.js";
import {createWindow} from './Utils/CreateWindow.js';
import {createTray} from './Utils/Tray.js'
import {startServer,stopServer} from "./Core/StartService.js";
import {getConfig,writeSub} from "./Core/getConfig.js";
import axios from 'axios';

app.whenReady().then(() => {
  // Set app user model id for windows
  electronApp.setAppUserModelId('top.eriver.netboard');
  app.on('browser-window-created', (_, window) => {
    optimizer.watchWindowShortcuts(window)
  })
  stopServer();
  const mainWindow = createWindow();
  app.on('activate', () =>{
    if (BrowserWindow.getAllWindows().length === 0){
      mainWindow = createWindow();
    }
  })
  createTray(mainWindow);
})


app.on('window-all-closed', () => {

})

ipcMain.on("startcore",()=>{
	startServer();
})
ipcMain.on("stopcore",()=>{
	stopServer();
})
ipcMain.handle("getconfig",()=>{
  return getConfig();
});
ipcMain.on("writesub",(event,sub)=>{
  writeSub(sub);
});
ipcMain.on('minimize', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.minimize();
});
ipcMain.on('hide', (event) => {
  const win = BrowserWindow.fromWebContents(event.sender)
  win.hide();
});
ipcMain.handle("axios", async (event, config) => {
  let req = Object.create(config)
  console.log(config);
  try {
    const response = await axios.request({ url: req.url, method: req.method,data:req.data })
    return response.data
  } catch (error) {
    throw new Error(error.message)
  }
})
ipcMain.handle('drag',(event,opt)=>{

  const win = BrowserWindow.fromWebContents(event.sender);

  const {height,width} = win.getBounds();
  win.setBounds(opt);
})


