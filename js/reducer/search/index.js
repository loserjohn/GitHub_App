// /polular/
import Types from '../../actions/types';

const initState = {
    items: [],
    storeName: '',
    pageIndex: 1,
    isloading: false,
    canCancel: false,
    hideLoadingMore: false, 
    showButton:false
}
// mock数据结构
// {
//     items:dataArray ,  //返回的数据
//     storeName:storeName,
//     pageIndex:pageIndex,   
//     isLoading:false,
// }

const search = (state = initState, action) => {
    // 判断 action 类型
    switch (action.type) {
        case Types.SEARCH_FRESH:
            // 下拉刷新中
            return {
                ...state,

                isloading: true,
                canCancel: true,
                showButton:false    

            };

        case Types.SEARCH_FRESH_SUCCESS:
            //    下拉刷新成功
            // console.log(2, action)
            return {
                ...state,

                items: action.items, 
                isloading: false,
                pageIndex: 1,
                canCancel: false,
                projectModels:action.projectModels , 
                showButton:true    
            };

        case Types.SEARCH_FRESH_ERROR:
            //    下拉刷新失败
            return {
                ...state,

                isloading: false,
                canCancel: false,
                showButton:false
            };
        case Types.SEARCH_CANCEL:
            //    取消请求
            return {
                canCancel: true,
                isloading: false,
                showButton:false
            };


        case Types.SEARCH_LOADMORE_SUCCESS:
            // 上拉加载更多成功
            debugger
            return {
                ...state,
                items: action.items,
                hideLoadingMore: false,
                pageIndex: action.pageIndex,
                projectModels:action.projectModels

            };

        case Types.SEARCH_LOADMORE_ERROR:
            // 上拉加载失败
            return {
                ...state,

                hideLoadingMore: true,
                pageIndex: action.pageIndex


            };
        
        case Types.SEARCH_LOADMORE_INIT:
            // 上拉加载失败
            return initState;
        default:
            return state
    }
};

export default search;