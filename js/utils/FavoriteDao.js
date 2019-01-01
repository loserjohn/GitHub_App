const FAVORITE_KEY_PREFIX = 'favorite_' // 存放收藏家的额种类的

import AsyncStorage from "AsyncStorage";
/**
 *收藏功能
 *
 * @export
 * @class FavoriteDao
 */
export default class FavoriteDao {
    constructor(flag) {
        this.favoriteKey = FAVORITE_KEY_PREFIX + flag
    }



    /**
     *  key的集合操作
     *
     * @param {*} key
     * @param {*} isAdd
     * @memberof FavoriteDao
     */
    // 更新收藏的key的集合
    updatedFavoriteKeys(key isAdd, ) {
        AsyncStorage.getItem(this.favoriteKey, (error, result) => {
            if (!error) {
                let favoriteKeys = [];
                if (result) {
                    favoriteKeys = JSON.parse(result);
                }
                let index = favoriteKeys.indexOf(key);
                if (isAdd) {
                    if (index === -1) favoriteKeys.push(key)
                } else {
                    if (index !== -1) favoriteKeys.splice(index, 1);
                }
                AsyncStorage.setItem(this.favoriteKey, JSON.stringify(favoriteKeys), (error, result) => {

                })
            }
        })
    }

    // 获取所有收藏的key的集合
    getFavoriteKeys() {
        return new Promise((resolve, reject) => {
            AsyncStorage.getItem(this.favoriteKey, (error, result) => {
                if (!error) {
                    try {
                        resolve(JSON.parse(result))
                    } catch (e) {
                        reject(error)
                    }

                } else {
                    reject(error)
                }
            })
        })
    }




    /**
     *收藏的额条目的操作
     *
     * @param {*} key
     * @param {*} value
     * @param {*} callback
     * @memberof FavoriteDao
     */
    // 存储收藏条目
    saveFavoriteItem(key, value, callback) {
        AsyncStorage.setItem(key, value, (error, result) => {
            if (!error) {
                this.updatedFavoriteKeys(key, true)
            }
        })
    }

    // 移除收藏项目
    removeFavoriteItem(key, callback) {
        AsyncStorage.removeItem(key, (error, result) => {
            if (!error) {
                this.updatedFavoriteKeys(key, false)
            }
        })
    }

    // 获取素有的收藏条目
    getAllItems() {
        return new Promise((resolve,reject)=>{
            this.getFavoriteKeys().then(keys=>{
                let items = [];
                if(keys){
                    AsyncStorage.multiGet(keys,(err,stores)=>{
                        try{
                            stores.map((result,i,store)=>{
                                let key = store[i][0];
                                let value = store[i][1];
                                if(value) item.push(JSON.parse(value));
                            })
                            resolve(items);
                        }catch(e){
                            reject(e)
                        }
                    })   
                }else{
                    resolve(items);    
                }

            }).catch(e){
                reject(e)
            }

        })

    }


}