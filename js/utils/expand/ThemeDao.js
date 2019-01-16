

import AsyncStorage from "AsyncStorage";
import Themes from '../../res/data/theme.json'

//popular使用的是keys     trending使用的是language
/**
 *语言选择功能
 *
 * @export
 * @class LanguageDao
 */

 const THEME_KEY = "THEME_KEY"
 const dafault_theme = "#3697ff" 
 export default class ThemeDao {
    constructor() { }

    // 获取语言类型的配置
    fetchTheme() {
        return new Promise((resolve, reject) => {
            // console.log('flag'+this.flag)
            AsyncStorage.getItem(THEME_KEY, (error, result) => {
                // console.log("!!",result)  
                if (!error) {                
                    if (!result) {
                        this.save(dafault_theme)
                        resolve(dafault_theme) 
                    } else {
                        // debugger  
                        try {
                            resolve(result);
                        } catch (error) {
                            console.log(error)  
                        } 
                       
                    }
                } else {
                    reject()
                    throw new Error()
                }
            })
        })
    }

    // 存储本地的数据
    save(theme) {
        AsyncStorage.setItem(THEME_KEY, theme, (error, result) => { })
    }
}