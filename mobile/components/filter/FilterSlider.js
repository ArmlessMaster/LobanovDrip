import React, { useState } from 'react'
import styled from 'styled-components/native'
import MultiSlider from '@ptomasroos/react-native-multi-slider'
import CustomMarker from './customMarker';
import {Dimensions} from "react-native";



const SliderWrapper = styled.View`
  justify-content: center;
`

const ViewContainer = styled.View`
  align-self: center;
  justify-content: center;
`
const LabelWrapper = styled.View`
  flex-direction: row;
  justify-content: space-between;
  margin-left: -8px;
  margin-right: -10px;
  top: 18%;
  left: 1%
`

const LabelText = styled.Text`
  font-size: 20px;
`

const Slider = () => {
    let min = 0
    let max = 890

    const [multiSliderValue, setMultiSliderValue] = useState([min, max])

    const multiSliderValuesChange = (values) => setMultiSliderValue(values)

    return (
        <ViewContainer>
            <SliderWrapper>
                <LabelWrapper>
                    <LabelText>{multiSliderValue[0]} </LabelText>
                    <LabelText>{multiSliderValue[1]}</LabelText>
                </LabelWrapper>
                <MultiSlider
                    selectedStyle={{
                        backgroundColor: 'black',
                        height: 3
                    }}
                    trackStyle={{
                        backgroundColor: '#8D8D8D',
                        height: 3
                    }}
                    values={[multiSliderValue[0], multiSliderValue[1]]}
                    sliderLength={Dimensions.get("screen").width/100*85}
                    onValuesChange={multiSliderValuesChange}
                    min={min}
                    max={max}
                    minMarkerOverlapDistance={10}
                    step={1}
                    customMarker={CustomMarker}
                />
            </SliderWrapper>
        </ViewContainer>
    )
}

export default Slider