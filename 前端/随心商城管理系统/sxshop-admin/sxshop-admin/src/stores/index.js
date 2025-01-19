



import { defineStore } from 'pinia'
import { ref, watch } from 'vue'

function initState() {
  return {
    isCollapse: false,
    name: '',
    id:0,
    account:"",
    token:"",
    tags:[
      {
          path: '/home',
          name: '首页',
          label: '首页',
          iconL: 'home'
      },
  ],
  };
}
export const userAllDataStore = defineStore('allData', () => {

  const state = ref(initState())


    watch(state,(newobj)=>{
      if(!newobj.token) return;
        localStorage.setItem('store',JSON.stringify(newobj));
    } ,{deep:true})
    


  function selectMenu(val){
    if(val.name==="home"){
      state.value.currentMenu =null
    }else{
      let index = state.value.tags.findIndex((item)=>item.name===val.name);
      index===- 1?state.value.tags.push(val):"";
    }
  }

  function updateTags(tag){
    let index = state.value.tags.findIndex(item=>item.name===tag.name);
    state.value.tags.splice(index,1)
  }

  function addMenu(router,type){
    if(type==="refresh"){
      let store = JSON.parse(localStorage.getItem('store'));
      state.value = store;
    }
  }
  function clean(){
    state.value = initState();
    localStorage.removeItem('store');
  }
  return { state ,selectMenu,updateTags,clean,addMenu}
})
