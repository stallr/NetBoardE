import { app, shell, BrowserWindow} from 'electron'
import { electronApp, optimizer, is } from '@electron-toolkit/utils'
import {getResource} from './RealPath.js';
import path from 'node:path'
import process from 'process'
const createWindow = ()=>{
  const mainWindow = new BrowserWindow({
    width: 1020,
    height: 690,
    frame:true,
    autoHideMenuBar: false,
    icon:getResource("netboard.png"),
    webPreferences: {
      preload: path.join(__dirname, '../preload/index.js'),
      sandbox: false
    },

  })

  mainWindow.on('ready-to-show', () => {
    mainWindow.show()
  })

  mainWindow.webContents.setWindowOpenHandler((details) => {
    shell.openExternal(details.url)
    return { action: 'deny' }
  })


  if (is.dev && process.env['ELECTRON_RENDERER_URL']) {
    mainWindow.loadURL(process.env['ELECTRON_RENDERER_URL'])
  } else {
    mainWindow.loadFile(path.join(__dirname, '../renderer/index.html'))
  }
  return mainWindow;
}
export{
  createWindow
}
