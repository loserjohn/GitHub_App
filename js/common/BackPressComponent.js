
import { BackHandler} from 'react-native';
export default class BackPressComponent {
    constructor(props){
        // this._hardwareBackpress = this.onHardwareBackPress.bind(this);
        this.props = props
    }
    componentDidMount() {
        if(this.props.backPress) BackHandler.addEventListener("hardwareBackPress", this.onHardwareBackPress);
      }
    
      componentWillUnmount() {
        if(this.props.backPress)  BackHandler.removeEventListener("hardwareBackPress", this.onHardwareBackPress); 
      }
      onHardwareBackPress= (e)=> {
   
        return this.props.backPress(e)    
        // return true  
      }; 
} 