import Types from "../types"

export function onThemeChange(theme){
    // console.log(666,theme)
    return {type:Types.THEME_CHANGE, theme:theme}
} 