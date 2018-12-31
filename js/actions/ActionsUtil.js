export function handleData(actionType,dispatch, storeName, data, pageSize) {
    let fixItem = [];
    if (data && data.data ) {
        if(Array.isArray(data.data)){
            fixItem = data.data
        }else if(Array.isArray(data.data.items)){
            fixItem = data.data.items  
        }       
    }
    dispatch({
        type: actionType,
        storeName: storeName,
        items: fixItem,
        pageIndex: 1,
        projectModes: pageSize > fixItem.length ? fixItem : fixItem.slice(0, pageSize)
    })
}