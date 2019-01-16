import Types from "../types"
import ThemeDao from '../../utils/expand/ThemeDao'

export function onThemeChange(themeColor) {
    // console.log(666,theme)
    return { type: Types.THEME_CHANGE, theme: themeColor }
}
export function onSelectTheme(themeColor) {
    return({ type: Types.THEME_CHANGE, theme: themeColor })
    
}
export function onInitTheme() {
    // alert(1) 
    const themeDao = new ThemeDao()
    return (dispatch) => {
        themeDao.fetchTheme().then(res => {
            dispatch({ type: Types.THEME_CHANGE, theme: res })
        }).catch(error => {
            console.log(error)
        }) 
    }   
}


export function onThemeShowView(bool) {
    // console.log(666,theme)
    return { type: Types.THEME_SHOW_VIEW, show: bool }
} 