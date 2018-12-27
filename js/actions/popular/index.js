import Types from "../types"
import DataStore from '../../utils/DataStore'


export function onFetchData(dataType ){
    console.log('on',dataType) 
    const dataStore = new  DataStore()
    return (dispatch)=>{
        dispatch({type:Types.POPULAR_FRESH,dataType:dataType})  
        let url = `https://api.github.com/search/repositories?q=${dataType}`
        dataStore.fetchData(url).then(res=>{
        //    console.log(fetchData(res,dataType))
           dispatch(fetchData(res,dataType))
        }).catch(error=>{
            dispatch({
                type:Types.POPULAR_ERROR,
                dataType:dataType
            }) 
        })
       
    } 

    //  return {
    //         type:Types.POPULAR_SUCCESS,
    //         data:{
    //             items:[1,2,3,4,5,5,]
    //         },
    //         dataType:1
    //     }
} 
function fetchData(data,dataType){
    // console.log(data.data)
    return {
        type:Types.POPULAR_SUCCESS,
        data:data.data,
        dataType:dataType
    }
} 