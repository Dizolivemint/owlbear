import React from 'react'
import styled, { keyframes } from 'styled-components'

const Breathe: React.FC = () => <Circle />

const breatheAnimation = keyframes`
 0% { height: 10px; width: 10px; }
 30% { height: 100px; width: 100px; opacity: 1 }
 40% { height: 105px; width: 105px; opacity: 0.3; }
 100% { height: 10px; width: 10px; opacity: 0.6; }
`
const Circle = styled.div`
 height: 100px;
 width: 100px;
 border-style: solid;
 border-width: 5px;
 border-radius: 50%;
 border-color: black;
 animation-name: ${breatheAnimation};
 animation-duration: 8s;
 animation-iteration-count: infinite;
`

export default Breathe