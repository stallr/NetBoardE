import { platform, arch,cwd} from "node:process";
import { app } from 'electron'
import path from 'path';
/*
 *获取资源真实路径
*/
const getResource = (resourceName)=>{
  let finalPath = "";
  switch(platform){
    case "win32":
      if(app.isPackaged){
        finalPath = path.join(cwd(),"/resources/app.asar.unpacked/resources");
      }else{
        finalPath = path.join(cwd(),"/resources");
      }
    break;
  }
  if(resourceName){
    finalPath = path.join(finalPath,resourceName);
  }
  return finalPath;
}
export{
  getResource
}
