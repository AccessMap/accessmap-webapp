import React, { PureComponent } from 'react';
import SelectionControl from 'react-md/lib/SelectionControls';
import InclineSlider from 'components/InclineSlider';
import PropTypes from 'prop-types';
import {
  Card,
  CardText,
  CardTitle,
  CardActions,
} from 'react-md/lib/Cards';
import TextField from 'react-md/lib/TextFields';
import Button from 'react-md/lib/Buttons';
import { deleteUserProfile, updateUserProfile } from '../../utils/api';

export default class ProfileEntry extends PureComponent {
  static propTypes = {
    profileID: PropTypes.string.isRequired,
    profileName: PropTypes.string.isRequired,
    inclineMin: PropTypes.number.isRequired,
    inclineMax: PropTypes.number.isRequired,
    inclineIdeal: PropTypes.number.isRequired,
    avoidCurbs: PropTypes.bool.isRequired,
    avoidConstruction: PropTypes.bool.isRequired,
    refreshList: PropTypes.func.isRequired,
  };

  constructor (props) {
    super();

    this.state = {
      profileID: props.profileID,
      profileName: props.profileName,
      tempProfileName: props.profileName,
      inclineMin: props.inclineMin,
      tempInclineMin: props.inclineMin,
      inclineMax: props.inclineMax,
      tempInclineMax: props.inclineMax,
      inclineIdeal: props.inclineIdeal,
      avoidCurbs: props.avoidCurbs,
      tempAvoidCurbs: props.avoidCurbs,
      avoidConstruction: props.avoidConstruction,
      refreshList: props.refreshList,
      expanded: false,
    };
  }

  render () {
    const onSave = () => {
      this.setState({expanded: false});
      updateUserProfile(this.state.profileID, {
        profileName: this.state.tempProfileName.length > 0
          ? this.state.tempProfileName
          : this.state.profileName,
        inclineMin: this.state.tempInclineMin,
        inclineMax: this.state.tempInclineMax,
        inclineIdeal: this.state.inclineIdeal,
        avoidCurbs: this.state.tempAvoidCurbs,
        avoidConstruction: this.state.avoidConstruction,
      }).then((result) => {
        if (result.error != null) {
          return;
        }
        this.state.refreshList();
      });
    };
    const onCancel = () => {
      this.setState({
        tempProfileName: this.state.profileName,
        tempInclineMax: this.state.inclineMax,
        tempInclineMin: this.state.inclineMin,
        tempAvoidCurbs: this.state.avoidCurbs,
        expanded: false,
      });
    };
    const onDelete = () => {
      this.setState({expanded: false});
      deleteUserProfile(this.state.profileID).then((result) => {
        if (result.error != null) {
          return;
        }
        this.state.refreshList();
      });
    };

    const uphillSlider = (
      <InclineSlider
        id='profile_uphill_discrete'
        controlled
        label='Maximum uphill incline'
        incline={this.state.tempInclineMax}
        max={12}
        step={0.5}
        valuePrecision={1}
        onChange={d => this.setState({tempInclineMax: d / 100})}
      />
    );

    const downhillSlider = (
      <InclineSlider
        id='profile_downhill_discrete'
        controlled
        label='Maximum downhill incline'
        incline={-this.state.tempInclineMin}
        max={12}
        step={0.5}
        valuePrecision={1}
        onChange={d => this.setState({tempInclineMin: -d / 100})}
      />
    );

    const curbrampToggle = (
      <SelectionControl
        type='switch'
        checked={!this.state.tempAvoidCurbs}
        id='profile_require_curbramps'
        label='Require curbramps'
        name='profile_require_curbramps_toggle'
        onChange={d => this.setState({tempAvoidCurbs: !d})}
      />
    );
    return (
      <Card
        className="md-cell md-cell--12"
        expanded={this.state.expanded}
        onExpanderClick={() => this.setState({expanded: !this.state.expanded})}
      >
        <CardTitle title={this.state.profileName}
                   subtitle={'Profile ID: ' + this.state.profileID}
                   expander/>
        <CardText expandable>
          <TextField
            id="new-profile-name"
            label="New Profile Name"
            lineDirection="center"
            placeholder="Leave empty for unchanged"
            className="md-cell md-cell--bottom"
            value={this.state.tempProfileName}
            onChange={(newName, event) => {
              this.setState({tempProfileName: newName});
            }}
          />
          {uphillSlider}
          {downhillSlider}
          {curbrampToggle}
        </CardText>
        <CardActions expandable="true" centered={true}>
          <Button raised secondary onClick={onDelete}>Delete</Button>
          <Button raised onClick={onCancel}>Cancel</Button>
          <Button raised primary onClick={onSave}>Save</Button>
        </CardActions>
      </Card>
    );
  }
};