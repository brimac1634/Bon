import React, { Component } from 'react';
import { connect } from 'react-redux';

import UpdateCollection from '../../components/update-collection/update-collection.component';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';

import './admin.styles.scss';

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
				<UpdateCollection />
			</div>
		)
	}
} 

export default connect(null, mapDispatchToProps)(Admin);