import React, { Component, lazy } from 'react';
import { connect } from 'react-redux';
import { Route, withRouter } from 'react-router-dom';
import { createStructuredSelector } from 'reselect';

import CollectionList from '../../components/collection-list/collection-list.component';
import CustomButton from '../../components/custom-button/custom-button.component';

import { fetchCollectionsStart } from '../../redux/shop/shop.actions';
import { signOutStart } from '../../redux/user/user.actions';
import { selectCurrentUser } from '../../redux/user/user.selectors';

import './admin.styles.scss';

const UpdateCollectionContainer = lazy(() => import('../../components/update-collection/update-collection.container'))

const mapStateToProps = createStructuredSelector({
	currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
	fetchCollectionsStart: () => dispatch(fetchCollectionsStart()),
	signOutStart: () => dispatch(signOutStart())
})

class Admin extends Component {
	componentDidMount() {
		const { fetchCollectionsStart } = this.props;
		fetchCollectionsStart();
	}

	render() {
		const { currentUser, history, match, signOutStart } = this.props;
		
		return (
			<div className='admin'>
				<Route 
					exact 
					path={match.path} 
					render={()=>(
						<div className='admin-home'>
							<h2>{`Welcome back, ${currentUser.userName}`}</h2>
							<div className='panels'>
								<div className='panel buttons'>
									<CustomButton 
										onClick={()=>history.push(`${match.url}/new`)}
									>
										Add Product 
									</CustomButton>
									<CustomButton 
										onClick={signOutStart}
									>
										Sign Out
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

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(Admin));