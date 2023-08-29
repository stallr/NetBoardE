<template>
	<el-form>
		 <el-form-item label="规则:">
		        <el-select
				v-model="thisrule"
				placeholder="Select"
         @click="getRule"
				>
		          <el-option
		            v-for="item in groupNames"
		            :label="item"
		            :value="item"
		          />
		        </el-select>
		</el-form-item>
		<el-form-item label="节点:" v-if=" thisrule">
		        <el-select
				v-model="CoreStore.node"
				placeholder="Select"
				@change="choose"
				>
		          <el-option
		            v-for="item in nodes[thisrule]['proxies']"
		            :label="item.name"
		            :value="item.name"
		          />
		        </el-select>
		</el-form-item>
		<el-form-item label="模式:">
		        <el-select
				placeholder="Select"
				v-model="CoreStore.mode"
				@change="choosemode"
				>
		          <el-option
		            v-for="item in mode"
		            :label="item.name"
		            :value="item.value"
		          />
		        </el-select>
		</el-form-item>
	</el-form>
</template>

<script setup>
import { ref } from 'vue';
import implement from "../../clash/implement.js"
import {useCoreStore} from "../../store/CoreStore.cjs"
const CoreStore = new useCoreStore();
const thisrule = ref("");
const nodes = ref("");
const nodes2 = ref("");
const groupNames = ref("");
const mode = [
	{"name":"全局","value":"Global"},
	{"name":"规则","value":"Rule"},
	{"name":"直连","value":"Direct"},
	{"name":"脚本","value":"Script"},
];
const choosemode = async (val)=>{
  if(val == "Global"){
    if(!CoreStore.node){
      return alert("请先选择全局模式节点");
    }else{
      await implement.setProxy(thisrule.value,CoreStore.node)
    }
  }
	await implement.setMode(val)
}
const choose = async (val)=>{
	await implement.setProxy(thisrule.value,val)
}
const getRule = async ()=>{
 await implement.getProviders(nodes);
 await implement.getProxies(nodes2);
 const proxies = { ...nodes.value, ...nodes2.value };
  const retrieve = retrieveGroupNamesFrom(proxies);
  nodes.value["GLOBAL"] = nodes.value["default"]??null;
  groupNames.value = retrieve.groupNames;
}
const NonProxyTypes = [
  'Direct',
  'Fallback',
  'Reject',
  'Pass',
  'Selector',
  'URLTest',
  'LoadBalance',
  'Unknown',
];
function retrieveGroupNamesFrom(proxies) {
  let groupNames = [];
  let globalAll=[];
  const proxyNames = [];
  for (const prop in proxies) {
    const p = proxies[prop];
    if (p.all && Array.isArray(p.all)) {
      groupNames.push(prop);
      if (prop === 'GLOBAL') {
        globalAll = Array.from(p.all);
      }
    } else if (NonProxyTypes.indexOf(p.type) < 0) {
      proxyNames.push(prop);
    }
  }
  if (globalAll) {
    // Put GLOBAL in the end
    globalAll.push('GLOBAL');
    // Sort groups according to its index in GLOBAL group
    groupNames = groupNames
      .map((name) => [globalAll.indexOf(name), name])
      .sort((a, b) => a[0] - b[0])
      .map((group) => group[1]);
  }
  return {groupNames, proxyNames};
}


</script>

<style scoped>
	.el-form{
		justify-content: center;
		align-items: center;
		display: flex;
		width: 100%;
		flex-direction: column;
	}
	.el-form-item{
		justify-content: center;
		align-items: left;
		text-align: left;
		margin-left: 0;
	}
</style>
