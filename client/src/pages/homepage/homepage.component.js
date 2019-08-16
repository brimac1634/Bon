import React, { Component } from 'react';
import Fade from 'react-reveal/Fade';

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
					<video 
						ref={this.videoRef} 
						onCanPlay={this.playVideo}
						onPlay={this.videoIsPlaying} 
						loop 
						autoPlay
						muted
					>
					    <source 
					    	src='https://firebasestorage.googleapis.com/v0/b/bonv-73e16.appspot.com/o/bon-vivant.mp4?alt=media&token=1288a8d4-f8bc-40fd-8f7c-8ad62eaa941a' 
					    	type='video/mp4' 
					    />
					</video>
				</div>
				<div className='row grey'>
					<div className='col'>
						<Fade bottom>
							<img className='illustration' src={needle} alt='needle' />
							<h1 className='center with-border'>
								Men's Haberdashery specialising in handmade tailored clothing for those who live well.
							</h1>
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
							<p className='text center with-border'>
								Bon Vivant is an idea of appreciation - that there exists an intrinsic value to things that give joy in life. These works consist of ideas and memories that bear a connection to the past. What was before considered dated has been transmuted by the mere passing of years to a status at once modern and prevalent.
							</p>
						</Fade>
					</div>
				</div>
				<div className='row'>
					<JoinMail />
				</div>
				{isLoadingVideo &&
		          <Loader />
		        }
			</div>
		)
	}
}

export default HomePage;