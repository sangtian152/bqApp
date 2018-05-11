import React from 'react';
import Swiper from 'react-native-swiper';
import {Image,TouchableHighlight} from 'react-native';
import Loading from './../loading';
import Web from './../web';
import Styles from './style';

class Slider extends React.Component{
	constructor(props){
		super(props);
		this.state = {

		}
	}
	render(){
		var thiz = this;
		const {navigate} = this.props.navigation
		return (
			<Swiper style={Styles.wrapper} showsButtons={false} autoplay={true} height={150} showsPaginnation={false}>
				{this.props.banners.map(function(banner,index){
					return (
						<TouchableHighlight key={index} onPress={()=>navigate('Details',{url:banner.link_url,title:banner.ad_name})}>
                            <Image style={[Styles.slide,]} source={{uri: banner.ad_img}}></Image>
                        </TouchableHighlight>
						)
				})}
			</Swiper>
			)
	}
}
module.exports = Slider;