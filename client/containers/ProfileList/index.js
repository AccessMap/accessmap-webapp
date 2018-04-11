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
      controls={[{
        label: profileName === 'wheelchair' ? <h6>Wheelchair</h6> : '',
        value: 'wheelchair',
        onChange: d => actions.setProfile(d),
        className: profileName === 'wheelchair' ? 'profile-selected' : '',
        checkedRadioIcon: <SVGIcon secondary use={wheelchair.url} />,
        uncheckedRadioIcon: <SVGIcon use={wheelchair.url} />,
        inkDisabled: true,
      }, {
        label: profileName === 'powered' ? <h6>Powered</h6> : '',
        value: 'powered',
        onChange: d => actions.setProfile(d),
        className: profileName === 'powered' ? 'profile-selected' : '',
        checkedRadioIcon: <SVGIcon secondary use={wheelchairPowered.url} />,
        uncheckedRadioIcon: <SVGIcon use={wheelchairPowered.url} />,
        inkDisabled: true,
      }, {
        label: profileName === 'cane' ? <h6>Cane/Walk</h6> : '',
        value: 'cane',
        onChange: d => actions.setProfile(d),
        className: profileName === 'cane' ? 'profile-selected' : '',
        checkedRadioIcon: <SVGIcon secondary use={caneUser.url} />,
        uncheckedRadioIcon: <SVGIcon use={caneUser.url} />,
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
    routingprofile,
  } = state;

  const profile = routingprofile.profiles[routingprofile.selectedProfile];

  return {
    profileName: profile.name,
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(ProfileList);
