const SYSTEM_INFO=uni.getSystemInfoSync();
export const getStatusBarHeight=()=>SYSTEM_INFO.statusBarHeight||20;

export const getTileBarHeight=()=>{
	if(uni.getMenuButtonBoundingClientRect){
		let {top,height}=uni.getMenuButtonBoundingClientRect();
		return height+(top-getStatusBarHeight())*2
	}else{
		return 30;
	}
}
export const getNavBarHeight=()=>getStatusBarHeight()+getTileBarHeight()