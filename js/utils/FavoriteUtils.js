
import {FLAG_STORE} from '../utils/DataStore'
  

export default class FavoriteUtils {

    static onFavorite(favoriteDao, item, isFavorite, flag) {
        alert(favoriteDao.favoriteKey)  
        const key =  flag  === FLAG_STORE.flag_popular ?  item.id.toString():item.fullName ;   
        // debugger 
        if(isFavorite){
            favoriteDao.saveFavoriteItem(key, JSON.stringify(item));
        }else{
            favoriteDao.removeFavoriteItem(key);
        }
    }
}