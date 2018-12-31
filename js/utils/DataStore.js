import {
    AsyncStorage
} from 'react-native';
import GitHubTrending from 'GitHubTrending'
export const FLAG_STORE = {
    flag_popular: 'popular',
    flag_trending: 'trending'
}


export default class DataStore {
    // 入口方法 优先获取区本地数据
    fetchData(url, flag) {
        // console.log(-1,url)
        return new Promise((resolve, reject) => {
            this.getDataLocation(url).then(wrapData => {

                if (wrapData && this.checkFn(wrapData.timetamp)) {

                    console.log('from cache')
                    resolve(wrapData)
                } else {
                    this.getDataNet(url, flag).then(data => {
                        // console.log(this._wrapData(data)) 
                        resolve(this._wrapData(data))
                    }).catch(err => {
                        reject(err)
                    })
                }
            }).catch(e => {
                // alert(4) 
                this.getDataNet(url, flag).then(data => {
                    console.log('from net')
                    resolve(this._wrapData(data))
                }).catch(err => {
                    reject(err)
                })
            })
        })

    }
    //保存数据
    saveData(url, data, callback) {
        if (!url || !data) return;
        AsyncStorage.setItem(url, JSON.stringify(this._wrapData(data)), () => {
            // alert('save') 
        })
    }
    // 从本地读取数据
    getDataLocation(url) {

        // if(!url )return; 
        // 判断是否过期
        // let promise =  AsyncStorage.getItem(url).then((res)=>{
        //         if(res && res!=null){ 

        //             resolve(JSON.parse(res))    
        //         }else{
        //             reject()
        //         }         
        //      } ).catch(error=>{
        //         //  alert(3.5 )
        //         reject(error) 
        //      }) 
        let promise = new Promise((resolve, reject) => {
            AsyncStorage.getItem(url).then((res) => {
                if (res && res != null) {
                    // res =  res.json();
                    resolve(JSON.parse(res))
                } else {
                    reject()
                }
            }).catch(error => {
                //  alert(3.5 )
                reject(error)
            })
        })
        // AsyncStorage.getItem(url,(error,result)=>{
        //     console.log(111,error)
        //     if(!error){
        //         // console.log('cache')
        //         // console.log(result)
        //         try{
        //             resolve(JSON.parse(result));
        //         }catch(e){
        //             console.error(e)
        //         }
        //     }else{
        //         reject(error);
        //         console.error(error)
        //     }
        // });



        return promise
    }
    // 判断是否过期
    checkFn(time) {
        let now = new Date().getTime();
        if (now - time >= 345600000) { 
            return false
        }
        return true
    }
    // 网络获取数据
    getDataNet(url, flag) {


        if (!url) return;
        return new Promise((resolve, reject) => {

            if (flag !== FLAG_STORE.flag_trending) {
                fetch(url)
                    .then(res => {
                        //   console.log(res)
                        if (res.ok) {
                            return res.json()
                        }
                    })
                    .then(res => {
                        // console.log('net',res)
                        this.saveData(url, res)
                        resolve(res)
                    }).catch(e => {
                        console.log(e.toString())
                    })

            } else {

                new GitHubTrending().fetchTrending(url)
                    .then(items => {
                        if (!items) {
                            throw new Error('responseData is null')
                        }
                        this.saveData(url, items);
                        resolve(items);

                    }).catch((error) => {
                        reject(error) 
                    })
            }
        })




    }

    // 包装添加时间戳
    _wrapData(data) {
        return Object.assign({}, {
            data: data,
            timetamp: new Date().getTime()
        })
    }
}


// import {AsyncStorage} from 'react-native';

// export default class DataStore {
//     // 入口方法 优先获取区本地数据
//     static fetchData(url){
//         // alert(1)
//         return new Promise((resolve,reject)=>{
//             this.getDataLocation(url).then(res=>{
//                 resolve (res)
//                 },res=>{
//                     this.getDataNet(url).then(res=>{
//                         resolve (res)
//                     }).catch(err=>{reject()})
//             }).catch(e=>{
//                 this.getDataNet(url).then(res=>{
//                     resolve (res)
//                 }).catch(err=>{reject()})
//             })
//         })

//     }
//     //保存数据
//     static saveData(url,data,callback){
//         if(!url || !data)return;
//         AsyncStorage.setItem(url,JSON.stringify(this._wrapData(data)),callback)
//     }
//     // 从本地读取数据
//     static  getDataLocation(url,callback){
//         alert(1)
//         if(!url )return;
//         // 判断是否过期

//         let promise =  AsyncStorage.getItem(url).then( (res)=>{
//            if(!res) reject()

//            res =  res.json();
//            let over = this.checkFn(res.timetamp);
//            if(over){
//             //    过期
//              reject()
//            }else{
//             //    有效
//             return res
//            }
//         } ).catch(e=>{
//             // this.getDataNet(url)
//         })

//         return promise
//     }
//     // 判断是否过期
//     static  checkFn(time){
//         let now = new Date().getTime();
//         if(now - time >= 1000000){
//             return true
//         }
//         return false
//     }
//     // 网络获取数据
//     static getDataNet(url,callback){
//         alert(2)
//         if(!url )return;
//        return  fetch(url)
//         .then(res=>{
//           console.log(res)
//             if(res.ok ){
//               return res.json()
//             }
//         })
//         .then(res=>{    
//           this.saveData(url,res,callback)
//         }).catch(e=>{
//           console.log(e.toString())
//         })

//     }

//     // 包装添加时间戳
//     static _wrapData(data){
//         return Object.assign({},{
//             data:data,
//             timetamp:new Date().getTime()
//         })
//     }
// }