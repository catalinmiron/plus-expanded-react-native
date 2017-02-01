import Exponent from 'exponent';
import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  TouchableHighlight,
  Animated,
  Button,
  Alert,
  ScrollView,
  Image,
  Dimensions
} from 'react-native';

import {Ionicons} from '@exponent/vector-icons';
import FadeIn from '@exponent/react-native-fade-in-image';
const {width, height} = Dimensions.get('window')
const COLORS = {
  bg: '#EDEEF0',
  cadet: '#AAB1BE'
}

const IMAGES = [
  'https://s-media-cache-ak0.pinimg.com/736x/13/cf/a1/13cfa122a84b011e0ab7fe5bd700a8e6.jpg',
  'https://sites.google.com/site/rrobinsontuhsarts/_/rsrc/1448305005832/watercolor-explosion-animals/6957920_7006454_lz.jpg',
  'http://www.froot.nl/wp-content/uploads/2016/03/watercolorsplasheanimals2-900x1235.jpg',
  'http://41.media.tumblr.com/e6a6590acc4c457271e0cca27630579f/tumblr_ntyy32zUDX1rv33k2o2_500.jpg',
  'https://251d2191a60056d6ba74-1671eccf3a0275494885881efb0852a4.ssl.cf1.rackcdn.com/7422342_watercolor-has-an-unpredictable-character_t37e06c97.jpg',
  'https://s-media-cache-ak0.pinimg.com/originals/e9/88/a5/e988a57535bb72c5b6c175075fe38fc3.jpg',
  'https://s-media-cache-ak0.pinimg.com/736x/fa/af/f9/faaff9dc0a695bb91e7632c3962c31ea.jpg',
  'https://2.bp.blogspot.com/-dDanzhEazhQ/VrovbNutZQI/AAAAAAAAslU/15T-ezqxowI/s1600/02-Love-Goes-On-Luqman%2BReza%2Bjongkie-Painting-Fantasy-worlds-with-Flowing-Watercolor-Animals-www-designstack-co.jpg'
]

var AnimatedIcon = Animated.createAnimatedComponent(Ionicons)

const NAVIGATION_WIDTH = width - 40
const BUTTON_SIZE = 40
const NAVIGATION_HEIGHT = 60

class App extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
      bt: new Animated.Value(2),
      innerOpacity: new Animated.Value(0),
      navSpacer: new Animated.Value(0),
      buttonHeight: new Animated.Value(BUTTON_SIZE),
      navButtonsOpacity: new Animated.Value(1),
      translation: new Animated.ValueXY(),
      active: false
    }
  }
  makeAnimation() {
    const animations = this.state.active ? [
      Animated.parallel([
        Animated.timing(this.state.translation, {
          toValue: -NAVIGATION_HEIGHT,
          duration: 300,
        }),
        Animated.timing(this.state.buttonHeight, {
          toValue: NAVIGATION_HEIGHT,
          duration: 300,
        }),
        Animated.timing(this.state.navSpacer, {
          toValue: NAVIGATION_HEIGHT,
          duration: 300,
        }),
        Animated.timing(this.state.navButtonsOpacity, {
          toValue: 0,
          duration: 600,
        }),
      ]),
      Animated.stagger(100, [
        Animated.timing(this.state.bt, {
          toValue: NAVIGATION_WIDTH,
          duration: 200
        }),
        Animated.spring(this.state.innerOpacity, {
          toValue: 1,
          duration: 200
        })
      ])
    ] : [
      Animated.stagger(200, [
        Animated.timing(this.state.innerOpacity, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.state.bt, {
          toValue: 2,
          duration: 300,
        }),
      ]),
      Animated.parallel([
        Animated.timing(this.state.translation, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.state.buttonHeight, {
          toValue: BUTTON_SIZE,
          duration: 300
        }),
        Animated.timing(this.state.navSpacer, {
          toValue: 0,
          duration: 300
        }),
        Animated.timing(this.state.navButtonsOpacity, {
          toValue: 1,
          duration: 600,
        }),
      ])
    ]
    Animated.stagger(this.state.active ? 300 : 500, animations).start()
  }

  animateNav() {
    this.setState({active: !this.state.active}, () => this.makeAnimation())
  }

  render() {
    return (
      <View style={[styles.container]}>
        <Animated.View style={{flex: 1, paddingTop: 24, transform: [{
            translateY: this.state.translation.y
          }]}}>
          <ScrollView contentContainerStyle={{paddingHorizontal: 20}}>
            {IMAGES.map((uri, i) => (
              <FadeIn key={i}>
                <Image source={{uri: uri}} style={{height: 400, width: width - 40, marginBottom: i === IMAGES.length - 1 ? 0 : 20}} />
              </FadeIn>
            ))}
          </ScrollView>
        </Animated.View>
        <View style={[styles.navigationContainer]}>
          <AnimatedIcon style={{opacity: this.state.navButtonsOpacity}} name="ios-home-outline" size={28} color={COLORS.cadet} />
          <AnimatedIcon style={{opacity: this.state.navButtonsOpacity}} name="ios-search-outline" size={28} color={COLORS.cadet} />
          {this.renderButton()}
          <AnimatedIcon style={{opacity: this.state.navButtonsOpacity}} name="ios-notifications-outline" size={28} color={COLORS.cadet} />
          <AnimatedIcon style={{opacity: this.state.navButtonsOpacity}} name="ios-person-outline" size={28} color={COLORS.cadet} />
        </View>
      </View>
    );
  }

  renderButton() {
    return <TouchableHighlight hitSlop={{top: 10, right: 10, left: 10, bottom: 10}} onPress={() => this.animateNav()} underlayColor={'transparent'}>
      <Animated.View style={[styles.crossButton]}>
        <Animated.View style={[styles.crossIcon, styles.vertical, {
            transform: [{
              translateY: this.state.translation.y
            }],
            height: this.state.buttonHeight,
            width: this.state.bt
          }]}>
          <Animated.View style={[styles.navigation, {
              opacity: this.state.innerOpacity
            }]}>
            <View style={[styles.innerNavigation]}>
              <TouchableOpacity onPress={() => this.animateNav()} hitSlop={this.state.active ? {top: 10, right: 10, left: 10, bottom: 10} : {}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="ios-game-controller-a-outline" size={40} color={'rgba(255,255,255,0.7)'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.animateNav()} hitSlop={this.state.active ? {top: 10, right: 10, left: 10, bottom: 10} : {}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="ios-heart-outline" size={40} color={'rgba(255,255,255,0.7)'} />
              </TouchableOpacity>
              <TouchableOpacity onPress={() => this.animateNav()} hitSlop={this.state.active ? {top: 10, right: 10, left: 10, bottom: 10} : {}} style={{flex: 1, alignItems: 'center', justifyContent: 'center'}}>
                <Ionicons name="ios-game-controller-b-outline" size={40} color={'rgba(255,255,255,0.7)'} />
              </TouchableOpacity>
            </View>
          </Animated.View>
        </Animated.View>
        <Animated.View style={[styles.crossIcon, styles.horizontal]}></Animated.View>
      </Animated.View>
    </TouchableHighlight>
  }
}

const styles = StyleSheet.create({
  navigationContainer: {
    justifyContent: 'space-around',
    paddingVertical: 20,
    alignItems: 'center',
    width: NAVIGATION_WIDTH,
    flexDirection: 'row'
  },
  container: {
    flex: 1,
    backgroundColor: COLORS.bg,
    alignItems: 'center',
    justifyContent: 'center'
  },
  crossButton: {
    width: BUTTON_SIZE,
    height: BUTTON_SIZE,
    alignItems: 'center',
    justifyContent: 'center',
    position: 'relative',
  },
  crossIcon: {
    height: BUTTON_SIZE,
    width: BUTTON_SIZE,
    // backgroundColor: COLORS.pink,
    backgroundColor: COLORS.cadet,
    // shadowColor: COLORS.purple,
    // shadowOpacity: 1,
    // shadowRadius: 10,
    // shadowOffset: {
    //   width: 0,
    //   height: 0
    // }
  },
  vertical: {
    width: 2,
  },
  horizontal: {
    position: 'absolute',
    height: 2,
    left: 0,
    top: BUTTON_SIZE / 2 - 1,
  },
  navigation: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center'
  },
  innerNavigation: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'space-around',
    flexDirection: 'row',
  }
});

Exponent.registerRootComponent(App);
