import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';
import { isMobileOnly } from 'react-device-detect';

import Directory from '../../components/directory/directory.component';
import JoinMail from '../../components/join-mail/join-mail.component';
import Loader from '../../components/loader/loader.component';

import needle from '../../assets/needle.png'
import scissors from '../../assets/scissors.png'
import './homepage.styles.scss';

class HomePage extends Component {
	constructor() {
		super();
		this.state = { isLoadingVideo: true };
		this.videoRef = React.createRef();
	}

	videoIsPlaying = () => {
		this.setState({ isLoadingVideo: false })
	}
 
	render() {
		const { isLoadingVideo } = this.state;
		return (
			<div className='homepage'>
				<div className='video-container'>
					{
						!isMobileOnly &&
						<video 
							ref={this.videoRef}
							onPlay={this.videoIsPlaying} 
							loop 
							autoPlay
							muted
						>
						    <source 
						    	src='https://firebasestorage.googleapis.com/v0/b/bonv-73e16.appspot.com/o/videos%2Fbon-vivant.mp4?alt=media&token=99992493-40b1-4dde-87e4-b5ee896457ac' 
						    	type='video/mp4' 
						    />
						</video>
					}
				</div>
				<div className='row grey'>
					<div className='col'>
						<Fade bottom>
							<img className='illustration' src={needle} alt='needle' />
							<h2 className='text center'>
								Men's Haberdashery specialising in handmade tailored clothing for those who live well.
							</h2>
						</Fade>
					</div>
				</div>
				<Fade>
					<div className='row'>
						<Directory />
					</div>
				</Fade>	
				<div className='row grey'>
					<div className='col'>
						<Fade bottom>
							<img className='scissors' src={scissors} alt='needle' />
							<p className='text center'>
								Bon Vivant is an idea of appreciation - that there exists an intrinsic value to things that give joy in life. These works consist of ideas and memories that bear a connection to the past. What was before considered dated has been transmuted by the mere passing of years to a status at once modern and prevalent.
							</p>
						</Fade>
					</div>
				</div>
				<Fade>
					<div className='row'>
						<JoinMail />
					</div>
				</Fade>
				{isLoadingVideo &&
		          <Loader />
		        }
			</div>
		)
	}
}

export default HomePage;