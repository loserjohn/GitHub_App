import Types from '../../actions/types';


// 数据结构
//  {
//      flag_popular_language:[],
//      flag_trending_language:[{
//                 "path":"",
//                 "name":"ALL Language",
//                 "short_name":"ALL",
//                 "checked":true
//             }   
//           ...
//         ]
//  }
const initState ={
    
}

const langs = (state = initState, action) => {
    // 判断 action 类型
    switch (action.type) {
        
        case Types.LANGUAGE_FRESH_SUCCESS:
        // debugger 
        // console.log('接收到了')
        // console.log({
        //     ...state, 
        //     [action.flag]:action.keys 
        // })
        return {
            ...state, 
            [action.flag]:action.items 
        };
 
        default:
            return state
    }
};

export default langs;