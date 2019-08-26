import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';

import UpdateCollectionContainer from '../../components/update-collection/update-collection.container';
import CollectionList from '../../components/collection-list/collection-list.component';
import CustomButton from '../../components/custom-button/custom-button.component';

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
		const { history, match } = this.props;

		return (
			<div className='admin'>
				<Route 
					exact 
					path={match.path} 
					render={()=>(
						<div className='admin-home'>
							<h2>Welcome back, Andrew</h2>
							<div className='panels'>
								<div className='panel'>
									<CustomButton 
										onClick={()=>history.push(`${match.url}/new`)}
									>
										New Product 
									</CustomButton>
								</div>
								<div className='panel'>
									<CollectionList />
								</div>
							</div>
						</div>
					)}
				/>
				<Route 
					path={`${match.path}/:productID`} 
					component={UpdateCollectionContainer}
				/>
			</div>
		)
	}
} 

export default withRouter(connect(null, mapDispatchToProps)(Admin));