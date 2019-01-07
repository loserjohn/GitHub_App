

import AsyncStorage from "AsyncStorage";
import langs from '../../res/data/langs.json';
import keys from '../../res/data/keys.json';

export const LANGUAGE_FLAG = { flag_popular_language: 'flag_popular_language', flag_trending_language: 'flag_trending_language' }
/**
 *语言选择功能
 *
 * @export
 * @class LanguageDao
 */
export default class LanguageDao {
    constructor(flag) {

        this.flag = flag
    }

    // 获取语言类型的配置
    fetch() {
        return new Promise((resolve, reject) => {
            console.log('flag'+this.flag)
            AsyncStorage.getItem(this.flag, (error, result) => {
                console.log("!!",result)  
                if (!error) {
                   
                    if (!result) {
                        // debugger 
                        if (this.flag == LANGUAGE_FLAG.flag_popular_language) {
                            this.save(keys)
                            resolve(keys) 
                        } else {  
                           
                            this.save(langs) 
                            resolve(langs)
                        }
                    } else {
                        // debugger  
                        try {
                            resolve(JSON.parse(result))
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
    save(data) {
        AsyncStorage.setItem(this.flag, JSON.stringify(data), (error, result) => { })
    }
}