

import AsyncStorage from "AsyncStorage";
import langs from '../../res/data/langs.json';
import keys from '../../res/data/keys.json';

export const LANGUAGE_FLAG = { languages: 'language', keys: 'keys' }
//popular使用的是keys     trending使用的是language
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
            // console.log('flag'+this.flag)
            AsyncStorage.getItem(this.flag, (error, result) => {
                // console.log("!!",result)  
                if (!error) {
                    if (!result) {
                        // debugger 
                        if (this.flag == LANGUAGE_FLAG.keys) {
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
    // 添加新的关键词
    addKey(keyword) {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.flag, (error, result) => {
                if (!error) {
                    let res = JSON.parse(result);

                    let hasin =  this.HasIn(res,keyword)   
                    if(!hasin ){
                        res.push({
                            "path": keyword,
                            "name": keyword,
                            "checked": true
                        })
                        this.save(res); 
                        resolve(res)
                    }else{
                        reject('已经保存过了') 
                    }              
                   
                } else {
                    reject()
                    throw new Error()
                }
            })
        })
    }
    HasIn(arr,value){

        // keys.map((item,index)=>{
        for(var i =0;i<arr.length;i++){
          let item = arr[i];
          if(item.name.toLowerCase() == value.toLowerCase()  ){ 
            // 已经有过收入
            return true  
          }
        }        
        // })
        return false
      }
}