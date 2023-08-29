 import { app,Tray, Menu, nativeImage} from 'electron'
 import {getResource} from "./RealPath.js";
 import {createWindow} from './CreateWindow.js'

const createTray = (mainWindow)=>{
  const icon = nativeImage.createFromPath(getResource("netboard.png"))
  const tray = new Tray(icon);
  const contextMenu = Menu.buildFromTemplate([
    { label: '打开控制面板', role: 'hide',click:()=>{
        if(mainWindow){
          mainWindow.show()
        }else{
          createWindow();
        }
      } },
    { label: '退出应用', role: 'quit',click:()=>{stopServer(); app.quit()} },
  ])

  tray.setContextMenu(contextMenu)
  tray.setToolTip('Netboard Controller')
  tray.setTitle('Netboard Controller')
}
export {
  createTray
}
