// /polular/
import Types from '../../actions/types';

const initState ={
   
}
// mock数据结构
// {
//     popular:{
//         isloading:false,
//         items:[]
//     },
//      trending:{
    //         isloading:false,
    //         items:[]
    //     }
// }

const collect = (state = initState, action) => {
    // console.log(22222,action )
    // 判断 action 类型

 
    switch (action.type) {
        case Types.COLLECT_FRESH:
           // 下拉刷新中
        return {
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                isloading:true
            }
            
        };
    
        case Types.COLLECT_FRESH_SUCCESS:
        //    下拉刷新成功
        // debugger
        console.log(2,action)
        return {
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                projectModels:action.projectModels  , 
                isloading:false
            } 
            
        };
    
        case Types.COLLECT_FRESH_ERROR:
        //    下拉刷新失败
        return {
            ...state, 
            [action.storeName]:{
                ...state[action.storeName],
                isloading:false
            }
        };
        

        default:
            return state
    }
};

export default collect;