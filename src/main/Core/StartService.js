import path from 'path'
import fs from 'fs-extra'
import {shell} from 'electron'
import {spawn} from "child_process"
import process from "process"
import {app} from 'electron'
import {getResource} from "../Utils/RealPath.js"
var serverProcess=null;
var parameters = ["-f","config.yaml","-d","."];
var parameters2 = ["global","127.0.0.1:17890","localhost,127.*,10.*,172.16.*,172.17.*,172.18.*,172.19.*,172.20.*,172.21.*,172.22.*,172.23.*,172.24.*,172.25.*,172.26.*,172.27.*,172.28.*,172.29.*,172.30.*,172.31.*,192.168.*"];
var parameters3 = ["set","1"];
var runlog = "";
function runExec(){
// 在启动后台服务前闲检测关闭一遍后台服务，防止开启多个后台服务
  stopServer();
  spawn(getResource(".\\sysproxy.exe"),parameters2,{cwd:getResource()});
  serverProcess = spawn(getResource("clash-netboard.exe"),parameters,{cwd:getResource()})
  // 启动成功的输出
  serverProcess.stdout.on("data",function(data){
    runlog += "\nsuccess！ stdout:" + data;
    console.log(runlog)
  })
  // 发生错误的输出
  serverProcess.stderr.on("data",function(data){
    runlog +="\nstderr:" +  data;
    console.log(runlog)
  })
  // 退出后的输出
  serverProcess.on("close",function(code){
    runlog +="\nout code:" + code;
    console.log(runlog)
  })
}
function startServer(){
  	runExec();
}
// 关闭后台服务
function stopServer(){
  spawn(getResource(".\\sysproxy.exe"),parameters3,{cwd:getResource()});
  const kill = require("tree-kill")
  if(serverProcess){
   runlog += "\nkill server process , serverProcess.pid-->"+serverProcess.pid;
    kill(serverProcess.pid,"SIGTERM",function(){
      serverProcess = null;
    })
    console.log(runlog)
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
