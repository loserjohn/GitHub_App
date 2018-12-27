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
    // console.log(22222,action )
    // 判断 action 类型
    switch (action.type) {
        case Types.POPULAR_FRESH:
        // console.log('请求中')
        return {
            ...state, 
            [action.dataType]:{
                ...state[action.dataType],
                isloading:true 
            }
            
        };
    
        case Types.POPULAR_SUCCESS:
        // console.log('接收到了',action.data.items )
        return {
            ...state, 
            [action.dataType]:{
                ...state[action.dataType],
                items:action.data.items  ,
                isloading:false
            }
            
        };
    
        case Types.POPULAR_ERROR:
        // console.log('失败')
        return state
 
        default:
            return state
    }
};

export default popular;