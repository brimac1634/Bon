import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';
import MediaQuery from 'react-responsive';

import FrameTop from './components/frame/frame-top.component';
import FrameLeft from './components/frame/frame-left.component';
import FrameRight from './components/frame/frame-right.component';
import FrameBottom from './components/frame/frame-bottom.component';
import Alert from './components/alert/alert.component';
import SlideMenu from './components/slide-menu/slide-menu.component';
import Loader from './components/loader/loader.component';
import HomePage from './pages/homepage/homepage.component';
import Gallery from './pages/gallery/gallery.component';
import Philosphy from './pages/philosophy/philosophy.component';
import ShopPage from './pages/shop/shop.component';
import Contact from './pages/contact/contact.component';
import PrivacyPolicy from './pages/privacy-policy/privacy-policy.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Admin from './pages/admin/admin.component';
import Checkout from './pages/checkout/checkout.component';

import { selectCurrentUser, selectIsUserFetching } from './redux/user/user.selectors';
import { selectIsLoading, selectLoadingMessage } from './redux/loading/loading.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.css';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isFetchingUser: selectIsUserFetching,
  isLoading: selectIsLoading,
  loadingMessage: selectLoadingMessage
})

const mapDispatchToProps = dispatch => ({
  checkUserSession: () => dispatch(checkUserSession())
})

class App extends Component {
  componentDidMount() {
    const { checkUserSession } = this.props;
    checkUserSession();
  }

  render() {
    const { isFetchingUser, isLoading, loadingMessage } = this.props;
    
    return (
      <div>
        {!isFetchingUser &&
          <div>
            <div className='content'>
              <Switch>
                <Route exact path='/' component={HomePage}/> 
                <Route path='/shop' component={ShopPage}/>
                <Route path='/gallery' component={Gallery}/>
                <Route path='/philosophy' component={Philosphy}/>
                <Route path='/contact' component={Contact}/>
                <Route path='/privacy-policy' component={PrivacyPolicy}/>
                <Route exact path='/checkout' component={Checkout}/>
                <Route 
                  path='/admin'
                  render={()=>(
                    this.props.currentUser ? (
                      <Admin />
                    ) : (
                      <Redirect to={'/'}/>
                    )
                  )}
                />
                <Route 
                  exact 
                  path='/signin' 
                  render={() =>
                    this.props.currentUser ? (
                      <Redirect to={'/'}/>
                    ) : (
                      <SignInAndSignUpPage />
                    )
                  }
                />
                <Redirect to='/'/>
              </Switch>
              {isLoading &&
                <Loader message={loadingMessage} />
              }
            </div>
            <FrameTop />
            <MediaQuery minWidth={1000}>
              <FrameLeft />
              <FrameRight />
              <FrameBottom />
            </MediaQuery>
            <MediaQuery maxWidth={729}>
              <SlideMenu />
            </MediaQuery>
          </div>
        }
        {isFetchingUser &&
          <Loader />
        }
        <Alert />
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
