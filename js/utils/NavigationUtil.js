class NavigationUtil {
    // 跳转某个页面
    static navigateTo(params,page){
       
        
        if(!params.navigation)return;
        // console.log(global.Navigator,page);
        global.Navigator.navigation.navigate(page,{...params})
    }

    // 返回首页
    static resetToHome(navigation){
        navigation.navigate('Main')
    }
    // 返回上一页
    static backTo(navigation){
        navigation.goBack()
    }

}
export default NavigationUtil