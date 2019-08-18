import React, { Component } from 'react';
import { connect } from 'react-redux';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart())
})

class Admin extends Component {
	componentDidMount() {
		const { fetchCollectionsStart } = this.props;
		fetchCollectionsStart();
	}

	render() {
		return (
			<div className='admin'>
				
			</div>
		)
	}
} 

export default connect(null, mapDispatchToProps)(Admin);