
import {FLAG_STORE} from '../utils/DataStore'
console.log(FLAG_STORE)
  

export default class FavoriteUtils {

    static onFavorite(favoriteDao, item, isFavorite, flag) {
       
        const key =  flag  === FLAG_STORE.flag_popular ?  item.id.toString():item.fullName ;   
        // debugger 
        if(isFavorite){
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        }else{
            favoriteDao.removeFavoriteItem(key);
        }
    }
}