import React, { Component } from 'react';

import MenuItem from '../menu-item/menu-item.component';

import './directory.styles.scss';
import shorts from '../../assets/shorts.jpg';
import accessories from '../../assets/accessories.jpg';
import jackets from '../../assets/jackets.jpg';
import shirts from '../../assets/shirts.jpg';
import trousers from '../../assets/trousers.jpg';


class Directory extends Component {
	constructor() {
		super();
		this.state = {
			sections: [
			  {
			    title: 'shorts',
			    imageUrl: shorts,
			    id: 1,
			    linkUrl: 'shop/hats'
			  },
			  {
			    title: 'accessories',
			    imageUrl: accessories,
			    id: 2,
			    linkUrl: 'shop/jackets'
			  },
			  {
			    title: 'shirts',
			    imageUrl: shirts,
			    id: 3,
			    linkUrl: 'shop/sneakers'
			  },
			  {
			    title: 'trousers',
			    imageUrl: trousers,
			    size: 'large',
			    id: 4,
			    linkUrl: 'shop/womens'
			  },
			  {
			    title: 'jackets',
			    imageUrl: jackets,
			    size: 'large',
			    id: 5,
			    linkUrl: 'shop/mens'
			  }
			]
		}
	}

	render() {
		return (
			<div className='directory-menu'>
				{this.state.sections.map(({ id, ...otherSectionProps})=>{
					return (
						<MenuItem
							key={id}
							{...otherSectionProps}
						/>
					)
				})}
			</div>
		)
	}
}

export default Directory;