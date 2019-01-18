import Types from "../types"
import { _projectModules } from '../ActionsUtil'
import LanguageDao from '../../utils/expand/LanguageDao'
import {doCallback} from '../ActionsUtil'

// 下拉刷新
export  function  onRreshLanguage(flag) {
    const languageDao = new LanguageDao(flag)
    // debugger  
    return async (dispatch) => {
        try {
            let res = await  languageDao.fetch()
            dispatch({
                type: Types.LANGUAGE_FRESH_SUCCESS,
                flag:flag,
                items: res
            })  
        } catch (error) {
            console.log('error:' + error) 
        }

    }

} 

// 添加新的关键字
export  function  onAddNewKey(keyword,callback) {
    const languageDao = new LanguageDao('keys')
    // debugger  
    return async (dispatch) => {
        try {
            let res = await  languageDao.addKey(keyword)
            dispatch({
                type: Types.LANGUAGE_FRESH_SUCCESS,
                flag:'keys',  
                items: res
            })  
            
            doCallback(callback,{})
        } catch (error) {
            console.log('error:' + error) 
        }

    }

} 