import React, { useState } from 'react'
import * as Animatable from 'react-native-animatable'
import { colors } from '../assets/colors/colors'
import { Image } from 'react-native'
const ImageDisplay = ({ source, style, ...restProps }: any) => {
	const [isLoaded, setIsLoaded] = useState(false)
	const [errorLoaded, setErrorLoaded] = useState(false)

	const handleImageLoad = () => {
		setIsLoaded(true)
	}
	const onError = () => {
		setErrorLoaded(true)
	}
	return (
		<>
			{!isLoaded && (
				<Animatable.View
					animation="pulse"
					iterationCount="infinite"
					style={{
						position: 'absolute',
						zIndex: 100,
						width: style.width,
						height: style.height,
						borderRadius: style.borderRadius,
						backgroundColor: colors.grayLightWhite,
					}}
				/>
			)}

			<Image
				resizeMode={'cover'}
				resizeMethod={'resize'}
				onLoad={handleImageLoad}
				onError={onError}
				source={source}
				style={style}
				{...restProps}
			/>
		</>
	)
}

export default ImageDisplay
