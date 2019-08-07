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
import { auth, createUserProfileDocument } from './firebase/firebase.utils';
import { setCurrentUser } from './redux/user/user.actions';
import { selectCurrentUser } from './redux/user/user.selectors';


import './App.css';

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser
})

const mapDispatchToProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
})

class App extends Component {
  constructor() {
    super();
    this.state = { loading: true }
  }
  unsubscribeFromAuth = null

  componentDidMount() {
    const { setCurrentUser } = this.props;
    this.unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      if (userAuth) {
        const userRef = await createUserProfileDocument(userAuth);
        userRef.onSnapshot(snapshot => {
          setCurrentUser({
            id: snapshot.id,
            ...snapshot.data()
          })
          this.setState({ loading: false })
        })
      } else {
        setCurrentUser(userAuth);
        this.setState({ loading: false })
      }
    })
  }

  componentWillUnmount() {
    this.unsubscribeFromAuth();
  }

  render() {
    const { loading } = this.state;
    return (
      <div>
        {!loading &&
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
        {loading &&
          <Loader />
        }
      </div>
    );
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(App);
