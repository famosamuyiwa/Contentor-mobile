import { RPP } from "../../utils";
import { View, useThemeColorDefault } from "../Themed";
import Svg, { Rect } from 'react-native-svg'

function ProgressBar({progress}: any){
    
    const {tintColor} = useThemeColorDefault()
    const barWidth = RPP(230)
    const progressWidth = (progress / 100) * barWidth

    return (
        <View style={{backgroundColor:"none"}}>
            <Svg width={barWidth} height="7">
                <Rect width={barWidth} height={"100%"} fill={"#eee"} rx={RPP(3.5)} ry={RPP(3.5)}/>
                <Rect width={progressWidth} height={"100%"} fill={tintColor} rx={RPP(3.5)} ry={RPP(3.5)}/>
            </Svg>
        </View>
    )
}

export default ProgressBar