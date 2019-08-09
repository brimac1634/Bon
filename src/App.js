import React, { Component } from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import { connect } from 'react-redux'; 
import { createStructuredSelector } from 'reselect';

import Header from './components/header/header.component';
import Footer from './components/footer/footer.component';
import Loader from './components/loader/loader.component';
import HomePage from './pages/homepage/homepage.component';
import Gallery from './pages/gallery/gallery.component';
import Philosphy from './pages/philosophy/philosophy.component';
import ShopPage from './pages/shop/shop.component';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/sign-in-and-sign-up.component';
import Checkout from './pages/checkout/checkout.component';

import { selectCurrentUser, selectIsUserFetching } from './redux/user/user.selectors';
import { checkUserSession } from './redux/user/user.actions';

import './App.css';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  isFetchingUser: selectIsUserFetching
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
    const { isFetchingUser } = this.props;
    return (
      <div>
        {!isFetchingUser &&
          <div>
            <Header />
            <div className='main'>
              <Switch>
                <Route exact path='/' component={HomePage}/> 
                <Route path='/shop' component={ShopPage}/>
                <Route path='/gallery' component={Gallery}/>
                <Route path='/philosophy' component={Philosphy}/>
                <Route exact path='/checkout' component={Checkout}/>
                <Route 
                  exact 
                  path='/signin' 
                  render={() =>
                    this.props.currentUser ? (
                      <Redirect to={'/'} />
                    ) : (
                      <SignInAndSignUpPage />
                    )
                  }
                />
              </Switch>
            </div>
            <Footer />
          </div>
        }
        {isFetchingUser &&
          <Loader />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
