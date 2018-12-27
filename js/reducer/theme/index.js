import Types from '../../actions/types';

const initState ={
    theme: '#0083de'
}

const theme = (state = initState, action) => {
//    console.log(3333,action.type)
    // 判断 action 类型
    switch (action.type) {
        case Types.THEME_CHANGE:
        // console.log('接收到了')
        return {
            ...state, 
            theme:action.theme
        };
 
        default:
            return state
    }
};

export default theme;