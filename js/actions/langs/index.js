import Types from "../types"
import { _projectModules } from '../ActionsUtil'
import LanguageDao from '../../utils/expand/LanguageDao'
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
