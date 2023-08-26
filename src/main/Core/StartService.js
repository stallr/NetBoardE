import path from 'path'
import fs from 'fs-extra'
import {shell} from 'electron'
import {spawn} from "child_process"
import process from "process"
import {app} from 'electron'
import {getResource} from "../Utils/RealPath.js"
var serverProcess=null;
var parameters = ["-f","config.yaml","-d","."];
var parameters2 = ["on","127.0.0.1","17890"];
var parameters3 = ["off","127.0.0.1","17890"];
var runlog = "";
function runExec(){
// 在启动后台服务前闲检测关闭一遍后台服务，防止开启多个后台服务
  stopServer();
  spawn(getResource("sysproxy.exe"),parameters2,{cwd:cmdPath});
  serverProcess = spawn(getResource("clash-netboard.exe"),parameters,{cwd:cmdPath})
  // 启动成功的输出
  serverProcess.stdout.on("data",function(data){
    runlog += "\nsuccess！ stdout:" + data;
  })
  // 发生错误的输出
  serverProcess.stderr.on("data",function(data){
    runlog +="\nstderr:" +  data;
  })
  // 退出后的输出
  serverProcess.on("close",function(code){
    runlog +="\nout code:" + code;
  })
}
function startServer(){
  	runExec();
}
// 关闭后台服务
function stopServer(){
  spawn(getResource("sysproxy.exe"),parameters3,{cwd:cmdPath});
  const kill = require("tree-kill")
  if(serverProcess){
   runlog += "\nkill server process , serverProcess.pid-->"+serverProcess.pid;
    kill(serverProcess.pid,"SIGTERM",function(){
      serverProcess = null;
    })
  }
}
function clearlog(){
  runlog = "";
}
export {
	startServer,
	stopServer,
  clearlog,
  runlog
}
