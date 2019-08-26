import React from 'react';
import Fade from 'react-reveal/Fade';

import './in-store.styles.scss';

const InStore = () => (
	<div className='in-store'>
		<div className='row grey'>
			<div className='col'>
				<Fade bottom>
					<h2 className='text center'>
						Men's Haberdashery specialising in handmade tailored clothing for those who live well.
					</h2>
				</Fade>
			</div>
		</div>
		<div className='row grey'>
			<div className='col'>
				<Fade bottom>
					<p className='text center'>
						Bon Vivant is an idea of appreciation - that there exists an intrinsic value to things that give joy in life. These works consist of ideas and memories that bear a connection to the past. What was before considered dated has been transmuted by the mere passing of years to a status at once modern and prevalent.
					</p>
				</Fade>
			</div>
		</div>
	</div>
)

export default InStore;