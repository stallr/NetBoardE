import {defineStore} from "pinia"
export const  useCoreStore = defineStore("coreInfo",{
	state:()=>({
		start:false,
		timespan:"00:00:00",
    timer:null,
    rule:"",
    mode:"",
    node:"",
    nodes:{}
	}),
	getters: {

	},
	actions:{
		coreaction(){
			this.start = ! this.start;
		},
	}
})
