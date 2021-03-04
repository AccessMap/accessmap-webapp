import React from "react";
import PropTypes from "prop-types";

import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import * as AppActions from "actions";

import Button from "react-md/src/js/Buttons";
import Card from "react-md/src/js/Cards";
import ExpansionPanel, { ExpansionList } from "react-md/src/js/ExpansionPanels";
import List, { ListItem } from "react-md/src/js/Lists";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import SidewalkIcon from "components/Icons/SidewalkIcon";
import { SIDEWALK_FLAT, SIDEWALK_MID, SIDEWALK_STEEP } from "colors";

import close from "icons/close.svg";
import mapLegend from "icons/map-legend.svg";

const MapLegend = props => {
  const {
    actions,
    mediaType,
    planningTrip,
    settingProfile,
    viewingMapInfo
  } = props;

  if (mediaType === "mobile" && (planningTrip || settingProfile)) return null;

  const button = (
    <Button
      className="mapinfo-btn"
      aria-label="Map Legend"
      floating
      svg
      mini
      primary
      swapTheming
      tooltipLabel="Map Legend"
      tooltipPosition="left"
      onClick={actions.viewMapInfo}
    >
      <SVGIcon use={mapLegend.url} />
    </Button>
  );

  const card = (
    <Card className="mapinfo-card">
      <Toolbar
        title="Map legend"
        actions={[
          <Button
            key="close-map-legend-button"
            icon
            svg
            onClick={actions.closeMapInfo}
          >
            <SVGIcon use={close.url} />
          </Button>
        ]}
      />
      <ExpansionList>
        <ExpansionPanel label="Footways" footer={null}>
          <List>
            <ListItem
              leftAvatar={<SidewalkIcon fill={"#E7F0FF"} size={48} />}
              primaryText="No landmarks"
            />
            <ListItem
              leftAvatar={<SidewalkIcon fill={"#275DAD"} size={48} />}
              primaryText="Many landmarks"
            />
            <ListItem
              leftAvatar={
                <SVGIcon className="stair-icon" viewBox={"0 0 48 12"} size={48}>
                  <path
                    d="m2,6 46,0"
                    stroke="#FFCB47"
                    strokeWidth="3"
                    strokeDasharray="4,1"
                  />
                </SVGIcon>
              }
              primaryText="Stairs"
            />
            <ListItem
              leftAvatar={
                <SVGIcon
                  className="inaccessible-icon"
                  viewBox={"0 0 48 12"}
                  size={48}
                >
                  <path
                    d="m2,6 46,0"
                    stroke="#f00"
                    strokeWidth="1"
                    strokeDasharray="2,1"
                  />
                </SVGIcon>
              }
              primaryText="Inaccessible"
            />
          </List>
        </ExpansionPanel>
        <ExpansionPanel label="Crossings" footer={null}>
          <List>
            <ListItem
              leftAvatar={<SidewalkIcon fill="none" size={48} />}
              primaryText="Unmarked crossing"
            />
            <ListItem
              leftAvatar={
                <SVGIcon
                  className="sidewalk-icon"
                  viewBox={"0 0 48 12"}
                  size={48}
                >
                  <rect
                    x="2"
                    y="2"
                    width="44"
                    height="8"
                    ry="3.44"
                    opacity="0.97"
                    stroke="#000"
                    strokeWidth=".5"
                    fill="#555"
                  />
                  <rect
                    x="3"
                    y="4"
                    width="42"
                    height="4"
                    ry="3.44"
                    opacity="0.97"
                    stroke="#fff"
                    strokeWidth="1.5"
                    fill="none"
                  />
                </SVGIcon>
              }
              primaryText="Marked crossing"
            />
            <ListItem
              leftAvatar={<SidewalkIcon fill={"#8CB369"} size={48} />}
              primaryText="Traffic Light"
            />
            <ListItem
              leftAvatar={<SidewalkIcon fill={"#F4E285"} size={48} />}
              primaryText="Stop Sign"
            />
            <ListItem
              leftAvatar={<SidewalkIcon fill={"#F4A259"} size={48} />}
              primaryText="Yield Sign"
            />
            <ListItem
              leftAvatar={<SidewalkIcon fill={"#BC4B51"} size={48} />}
              primaryText="No traffic control"
            />
            <ListItem
              leftAvatar={<SidewalkIcon fill={"#555"} size={48} />}
              primaryText="Unknown traffic control"
            />
            <ListItem
              leftAvatar={
                <SVGIcon
                  className="inaccessible-icon"
                  viewBox={"0 0 48 12"}
                  size={48}
                >
                  <path
                    d="m2,6 46,0"
                    stroke="#f00"
                    strokeWidth="1"
                    strokeDasharray="2,1"
                  />
                </SVGIcon>
              }
              primaryText="Inaccessible"
            />
          </List>
        </ExpansionPanel>
      </ExpansionList>
    </Card>
  );

  if (viewingMapInfo) {
    return card;
  }

  return button;
};

MapLegend.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  mediaType: PropTypes.string,
  planningTrip: PropTypes.bool,
  settingProfile: PropTypes.bool,
  viewingMapInfo: PropTypes.bool
};

MapLegend.defaultProps = {
  mediaType: "desktop",
  planningTrip: false,
  settingProfile: false,
  viewingMapInfo: false
};

const mapStateToProps = state => ({
  mediaType: state.browser.mediaType,
  planningTrip: state.router.route && state.router.route.name === "directions",
  settingProfile: state.activities.settingProfile,
  viewingMapInfo: state.activities.viewingMapInfo
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(mapStateToProps, mapDispatchToProps)(MapLegend);
