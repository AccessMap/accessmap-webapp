import React, { useState } from "react";

import Button from "react-md/src/js/Buttons";
import Card from "react-md/src/js/Cards";
import ExpansionPanel, { ExpansionList } from "react-md/src/js/ExpansionPanels";
import List, { ListItem } from "react-md/src/js/Lists";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import SidewalkIcon from "./SidewalkIcon";
import { SIDEWALK_FLAT, SIDEWALK_MID, SIDEWALK_STEEP } from "colors";

import close from "icons/close.svg";
import mapLegend from "icons/map-legend.svg";

import {
  clickMapLegendButton,
  clickMapLegendCloseButton,
} from "features/map/map-slice";

import { useAppDispatch } from "hooks";

interface Props {
  onClick(): void;
  onClose(): void;
}

const MapLegend = ({ onClick, onClose }: Props) => {
  const dispatch = useAppDispatch();

  const [expanded, setExpanded] = useState(false);

  if (expanded) {
    return (
      <Card className="maplegend-card">
        <Toolbar
          title="Map legend"
          actions={[
            <Button
              key="close-map-legend-button"
              icon
              svg
              onClick={() => {
                setExpanded(false);
                dispatch(clickMapLegendCloseButton());
                onClick();
              }}
            >
              <SVGIcon use={close.url} />
            </Button>,
          ]}
        />
        <ExpansionList>
          <ExpansionPanel label="Movement speed due to incline" footer={null}>
            <List>
              <ListItem
                leftAvatar={<SidewalkIcon fill={SIDEWALK_FLAT} size={48} />}
                primaryText="High speed (flat)"
              />
              <ListItem
                leftAvatar={<SidewalkIcon fill={SIDEWALK_MID} size={48} />}
                primaryText="Medium speed (moderate incline)"
              />
              <ListItem
                leftAvatar={<SidewalkIcon fill={SIDEWALK_STEEP} size={48} />}
                primaryText="Low speed (steep)"
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
  }

  return (
    <Button
      className="maplegend-btn"
      aria-label="Map Legend"
      floating
      svg
      mini
      primary
      swapTheming
      tooltipLabel="Map Legend"
      tooltipPosition="left"
      onClick={() => {
        setExpanded(true);
        dispatch(clickMapLegendButton());
        onClose();
      }}
    >
      <SVGIcon use={mapLegend.url} />
    </Button>
  );
};

export default MapLegend;
