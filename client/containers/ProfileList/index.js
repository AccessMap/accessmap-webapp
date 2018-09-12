import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import { SelectionControlGroup } from 'react-md/src/js/SelectionControls';
import SVGIcon from 'react-md/src/js/SVGIcons';

import caneUser from 'icons/cane-user.svg';
import wheelchair from 'icons/wheelchair.svg';
import wheelchairPowered from 'icons/wheelchair-powered.svg';


const ProfileList = (props) => {
  const {
    actions,
    profileName,
  } = props;

  return (
    <SelectionControlGroup
      className='profiles-container'
      id='profile-radio-selector'
      name='routing-profile-selector'
      type='radio'
      controlClassName='md-inline-block'
      defaultValue={profileName}
      onChange={(d, e) => {
        if (e.type === 'change') {
          actions.setProfile(d);
        } else if (e.type === 'keydown') {
          // This is improper navigation - arrow keys + space is better. But
          // either this never worked for react-md or it broke at some point...
          actions.setProfile(d);
        }
      }}
      controls={[{
        label: profileName === 'wheelchair' ? <h6 aria-hidden>Wheelchair</h6> : '',
        value: 'wheelchair',
        className: profileName === 'wheelchair' ? 'profile-selected' : '',
        checkedRadioIcon: <SVGIcon aria-label='manual wheelchair' secondary use={wheelchair.url} />,
        uncheckedRadioIcon: <SVGIcon aria-label='manual wheelchair' use={wheelchair.url} />,
        inkDisabled: true,
      }, {
        label: profileName === 'powered' ? <h6 aria-hidden>Powered</h6> : '',
        value: 'powered',
        className: profileName === 'powered' ? 'profile-selected' : '',
        checkedRadioIcon: <SVGIcon aria-label='powered wheelchair' secondary use={wheelchairPowered.url} />,
        uncheckedRadioIcon: <SVGIcon aria-label='powered wheelchair' use={wheelchairPowered.url} />,
        inkDisabled: true,
      }, {
        label: profileName === 'cane' ? <h6 aria-hidden>Cane/Walk</h6> : '',
        value: 'cane',
        className: profileName === 'cane' ? 'profile-selected' : '',
        checkedRadioIcon: <SVGIcon aria-label='walk or cane' secondary use={caneUser.url} />,
        uncheckedRadioIcon: <SVGIcon aria-label='walk or cane' use={caneUser.url} />,
        inkDisabled: true,
      }]}
    />
  );
};

ProfileList.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  profileName: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const {
    profile,
  } = state;

  const currentProfile = profile.profiles[profile.selectedProfile];

  return {
    profileName: currentProfile.name,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileList);
