// /polular/
import Types from '../../actions/types';

const initState ={
   
}
// mock数据结构
// {
//     java:{
//         isloading:false,
//         items:[]
//     }
// }

const popular = (state = initState, action) => {
    // 判断 action 类型

 
    switch (action.type) {
        case Types.POPULAR_FRESH:
           // 下拉刷新中
        return {
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                isloading:true
            }
            
        };
    
        case Types.POPULAR_FRESH_SUCCESS:
        //    下拉刷新成功
        // console.log(action.projectModels) 
        return {
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                items:action.items ,
                projectModels:action.projectModels  , 
                isloading:false,
                pageIndex:1,
                hideLoadingMore:false,
            } 
            
        };
    
        case Types.POPULAR_FRESH_ERROR:
        //    下拉刷新失败
        return {
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                isloading:false
            }
        };
        
    

        case Types.POPULAR_LOADMORE_SUCCESS:
        // 上拉加载更多成功
        return { 
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                projectModels:action.projectModels,
                hideLoadingMore:false,
                pageIndex:action.pageIndex
            } 
            
        };
    
        case Types.POPULAR_LOADMORE_ERROR:
        // 上拉加载失败
        return {
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                hideLoadingMore:true,
                pageIndex:action.pageIndex
            }
            
        };
        default:
            return state
    }
};

export default popular;