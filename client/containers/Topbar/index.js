import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'react-md/lib/Buttons';
import FontIcon from 'react-md/lib/FontIcons';
import { ListItemControl } from 'react-md/lib/Lists';
import { MenuButton } from 'react-md/lib/Menus';
import { Switch } from 'react-md/lib/SelectionControls';
import Toolbar from 'react-md/lib/Toolbars';

import AccessMapIcon from 'components/Icons/AccessMapIcon';
import AccessMapLogo from 'components/Icons/AccessMapLogo';

import * as AppActions from 'actions';


const Topbar = (props) => {
  const {
    actions,
    mediaType,
    planningTrip,
    settingProfile,
    viewingMapInfo,
  } = props;

  const mobile = mediaType === 'MOBILE';

  // When to hide the topbar
  if ((planningTrip || settingProfile || viewingMapInfo) && mobile) return null;

  return (
    <Toolbar
      className={'topbar md-paper--1'}
      title={
        <div
          className='accessmap-title'
          key='accessmap-brand'
        >
          {mobile ? <AccessMapIcon /> : <AccessMapLogo />}
        </div>
      }
      actions={[
        <Button
          flat
          primary
          onClick={actions.clickAboutLink}
        >
          About
        </Button>,
        <Button
          flat
          primary
          onClick={actions.clickContactLink}
        >
          Contact
        </Button>,
        <MenuButton
          id="extra-settings"
          icon
          anchor={{
            x: 'inner right',
            y: 'bottom',
          }}
          listStyle={{
            // Not sure why, but scrollbars appear in menu without this
            overflowY: 'visible',
            // The 'y: 'bottom'' anchor setting isn't working?
          }}
          menuItems={[
            <ListItemControl
              key='toggle-track'
              leftIcon={<FontIcon key='bug_report'>bug_report</FontIcon>}
              secondaryAction={
                <Switch
                  id='toggle-track'
                  name='track'
                  label='Contribute data to AccessMap'
                  labelBefore
                  defaultChecked
                />
              }
            />,
          ]}
        >
          more_vert
        </MenuButton>
      ]}
      themed
      fixed
      zDepth={0}
    />
  );
}

Topbar.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  planningTrip: PropTypes.bool,
  mediaType: PropTypes.string,
  settingProfile: PropTypes.bool,
  viewingMapInfo: PropTypes.bool,
};

Topbar.defaultProps = {
  mediaType: null,
  planningTrip: false,
  settingProfile: false,
  viewingMapInfo: false,
};

const mapStateToProps = (state) => {
  const {
    activities,
    browser,
  } = state;

  return {
    mediaType: browser.mediaType,
    planningTrip: activities.planningTrip,
    settingProfile: activities.settingProfile,
    viewingMapInfo: activities.viewingMapInfo,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(Topbar);
