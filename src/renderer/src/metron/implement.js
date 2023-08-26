import info from "./info.js"
import metron from "../../metron.json";
export default {
	"Login":(form,success)=>{
    form.passwd = form.password;
		return info.post("/api/token",form,(res,status)=>{
      res.auth_data = res.token;
      localStorage.setItem("userid",res.user_id);
			success(res,status);
		})
	},

	"getStatus":(status)=>{
		return info.get("/api/node",{},(res)=>{
			// status.value = res
      // console.log(res);
		})
	},
  "getOrder":(order)=>{
  	order.value = null;
  },
	"getPlan":(plans)=>{
		plans.value = metron.plan;
	},
	"Init":(userInfo)=>{
		return info.get("/api/user/"+localStorage.getItem("userid"),{},(res)=>{
      res.balance = parseFloat(res.money)*100;
      res.commission_balance = 0;
      res.expired_at = res.class_expire;
      userInfo.info = res
      let sub = {
        plan:{
          name:res.plan
        },
        expired_at:res.class_expire,
        transfer_enable:res.transfer_enable,
        d:res.d,
      }
      userInfo.sub = sub;
		})
	},
	"getSub":(userInfo)=>{
		return info.get("/api/sublink",{},(res)=>{
      let newRes = res.replace("sub", "clash");
      userInfo.sub.subscribe_url = newRes;
		})
	},
}
