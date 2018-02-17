/* eslint-disable react/no-array-index-key */
import React, { PureComponent } from 'react';
import {
  Card,
  CardText,
  CardTitle,
} from 'react-md/lib/Cards';
import { Button } from 'react-md/lib/Buttons';
import { Collapse } from 'react-md/lib/Helpers';
import { CircularProgress } from 'react-md/lib/Progress';
import { loadUserProfiles } from '../../utils/api';
import ProfileEntry from './ProfileEntry';
import PropTypes from 'prop-types';

const ACCESSIBILITY_PROPS = {
  'aria-busy': true,
  'aria-describedby': 'fake-feed-loading-progress',
};

export default class ProfileList extends PureComponent {
  static propTypes = {
    refreshProfileHandler: PropTypes.func.isRequired,
    refreshStatusIndicator: PropTypes.bool.isRequired,
    profileArray: PropTypes.array.isRequired,
  };

  constructor (props) {
    super();

    this.state = {
      notRefreshing: true,
      contents: props.profileArray,
      refreshProfileHandler: props.refreshProfileHandler,
      refreshStatusIndicator: props.refreshStatusIndicator,
    };
  }

  componentWillReceiveProps (newProps) {
    if (newProps.profileArray !== this.props.profileArray) {
      this.setState({contents: newProps.profileArray});
    }
  }

  componentWillMount () {
    this.refreshContent();
  }

  refreshContent = () => {
    // this.setState({notRefreshing: false});
    //
    // loadUserProfiles().then(result => {
    //   if (result.error != null) {
    //     this.setState({contents: null, notRefreshing: true});
    //     return;
    //   }
    //   const profiles = result.data;
    //   this.setState({contents: [], notRefreshing: true});
    //   this.setState({contents: profiles, notRefreshing: true});
    // });
    this.state.refreshProfileHandler();
  };

  render () {
    const {notRefreshing, contents} = this.state;

    let accessibilityProps;
    if (!notRefreshing) {
      accessibilityProps = ACCESSIBILITY_PROPS;
    }

    let cards;
    if (contents == null) {
      cards = (
        <Card className="md-cell md-cell--12">
          <CardText>
            Error loading profile.
          </CardText>
        </Card>
      );
    } else if (contents.length < 1) {
      cards = (
        <Card className="md-cell md-cell--12">
          <CardText>
            No Profile Found
          </CardText>
        </Card>
      );
    } else {
      cards = contents.map(({
                              profileID,
                              userID,
                              profileName,
                              inclineMin,
                              inclineMax,
                              inclineIdeal,
                              avoidCurbs,
                              avoidConstruction,
                            }) => (
        <ProfileEntry
          key={String(profileID)}
          profileID={String(profileID)}
          profileName={String(profileName)}
          inclineMin={parseFloat(inclineMin)}
          inclineMax={parseFloat(inclineMax)}
          inclineIdeal={parseFloat(inclineIdeal)}
          avoidCurbs={avoidCurbs}
          avoidConstruction={avoidConstruction}
          refreshList={this.refreshContent}
        />
      ));
    }

    const refresh = <Button flat onClick={this.refreshContent}
                            disabled={this.state.refreshStatusIndicator}>Refresh</Button>;
    return (
      <div>
        {refresh}
        <Collapse collapsed={!this.state.refreshStatusIndicator}>
          <div className="progress__fake-feed__progress">
            <CircularProgress id={ACCESSIBILITY_PROPS['aria-describedby']}/>
          </div>
        </Collapse>
        <section className="md-grid" {...accessibilityProps}>
          {cards}
        </section>
      </div>
    );
  }
}