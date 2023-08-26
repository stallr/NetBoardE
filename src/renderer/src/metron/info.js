import config from "../../config.json";
class info{
	static send(method,path,params,handler){
		return window.api.axios({
		  method: method,
		  url: config.panelUrl+path,
		  data: params
		})
		.then((result)=>{
      console.log(result);
			handler(result.data,result.ret == 1?true:false);
      if(result.ret != 1){
        throw new Error(result.msg);
      }
		})
		.catch((error)=>{
			handler(error.response,false);
			let serrorEvent = new Event('apiCommunicateError');
			serrorEvent.e = {};
      serrorEvent.e.response = {};
      serrorEvent.e.response.data = {};
      serrorEvent.e.response.data.message = error;
			window.dispatchEvent(serrorEvent);
		});
	}
	static post(path,params,handler){
		return this.send("post",path,params,handler);
	}
	static get(path,params,handler){
    const token = localStorage.getItem("Authorization") || null;
		return this.send("get",path+"?access_token="+token,params,handler);
	}
}
export default info
