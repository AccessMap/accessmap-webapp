import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import CSSTransition from 'react-transition-group/CSSTransition';
import TransitionGroup from 'react-transition-group/TransitionGroup';

import TICK from 'react-md/lib/constants/CSSTransitionGroupTick';

import FeatureCard from './FeatureCard';

const TRANSITION_TIME = 150;


const SlideUp = ({ children, ...props }) => (
  <CSSTransition
    {...props}
    appear
    mountOnEnter
    timeout={TRANSITION_TIME}
    classNames='slideup'
  >
    {children}
  </CSSTransition>
);

class SlidingFeatureCard extends PureComponent {
  constructor(props) {
    super(props);

    this.state = { show: false };

    setTimeout(() => {
      this.setState({ show: true });
    }, TICK);
  }

  render() {
    const _hide = () => {
      this.setState({ show: false });
    };

    return (
      <SlideUp in={this.state.show}>
        <div className='feature-card-container'>
          <FeatureCard
            title={this.props.title}
            featureProperties={this.props.featureProperties}
            onClickClose={() => {
              _hide();
              setTimeout(this.props.onClickClose, TRANSITION_TIME);
            }}
          />
        </div>
      </SlideUp>
    );
  }
}

SlidingFeatureCard.propTypes = {
  title: PropTypes.string.isRequired,
  featureProperties: PropTypes.arrayOf(
    PropTypes.shape({
      name: PropTypes.string,
      value: PropTypes.string
    })
  ),
  onClick: PropTypes.func,
};

SlidingFeatureCard.defaultProps = {
  featureProperties: [],
  onClick: null
};

export default SlidingFeatureCard;
