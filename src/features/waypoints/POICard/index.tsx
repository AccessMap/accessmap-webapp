import React from "react";

import Button from "react-md/src/js/Buttons";
import Card, { CardActions } from "react-md/src/js/Cards";
import DataTable, {
  TableBody,
  TableRow,
  TableColumn,
} from "react-md/src/js/DataTables";
import SVGIcon from "react-md/src/js/SVGIcons";
import Toolbar from "react-md/src/js/Toolbars";

import OpeningHoursTable from "./OpeningHoursTable";

import close from "icons/close.svg";

import { useAppSelector, useAppDispatch } from "hooks";
import {
  closePOICard,
  routeFromPOI,
  routeToPOI,
} from "features/waypoints/waypoints-slice";
import { requestDirections } from "features/directions/directions-slice";

import {
  OMNICARD_DESKTOP_WIDTH,
  OMNICARD_MOBILE_LANDSCAPE_WIDTH,
} from "constants/omnicard";

const SURFACE_MAP = {
  asphalt: "Asphalt",
  concrete: "Concrete",
  gravel: "Gravel",
  paving_stone: "Paving stones",
};

interface ContentRowProps {
  label: string;
  content: JSX.Element | string;
}

const ContentRow = ({ label, content }: ContentRowProps) => (
  <TableRow>
    <TableColumn>{label}</TableColumn>
    <TableColumn>{content}</TableColumn>
  </TableRow>
);

export const getFeatureType = (properties) => {
  // Check if it's a footway
  if (properties.hasOwnProperty("footway")) {
    switch (properties.footway) {
      case "sidewalk":
        return "Sidewalk";
      case "crossing":
        return "Crossing";
      default:
        return "Footway";
    }
  }
  return null;
};

const POICard = () => {
  const dispatch = useAppDispatch();

  const { mediaType, orientation } = useAppSelector((state) => state.browser);

  const { poi } = useAppSelector((state) => state.waypoints);

  if (!poi) return null;

  const { lon, lat } = poi;

  const {
    curbramps,
    crossing,
    description,
    incline,
    indoor,
    opening_hours,
    surface,
  } = poi.properties;

  // What kind of feature is it?
  const featureType = getFeatureType(poi.properties);

  const title =
    featureType || [lat.toPrecision(6), lon.toPrecision(6)].join(", ");

  let markedCrossing;
  if (featureType === "Crossing") {
    switch (crossing) {
      case "marked":
        markedCrossing = "Yes";
        break;
      case "unmarked":
        markedCrossing = "No";
        break;
      default:
        markedCrossing = "Unknown";
        break;
    }
  }

  let style;
  if (mediaType === "mobile") {
    if (orientation === "portrait") {
      style = {
        left: 0,
      };
    } else {
      style = {
        left: 0,
        width: `${OMNICARD_MOBILE_LANDSCAPE_WIDTH + 8}px`,
      };
    }
  } else {
    style = {
      left: `${OMNICARD_DESKTOP_WIDTH + 8}px`,
    };
  }

  return (
    <Card className="poi-card md-cell md-cell--4" style={style}>
      <Toolbar
        title={title}
        actions={
          <Button
            aria-label="Close point of interest popup"
            icon
            svg
            onClick={() => dispatch(closePOICard())}
          >
            <SVGIcon use={close.url} />
          </Button>
        }
      />
      <DataTable className="poi-card-body" plain>
        <TableBody>
          {description !== undefined ? (
            <ContentRow label="Description" content={description} />
          ) : null}
          {opening_hours !== undefined ? (
            <ContentRow
              label="Open Hours"
              content={<OpeningHoursTable openingHours={opening_hours} />}
            />
          ) : null}
          {curbramps !== undefined ? (
            <ContentRow label="Curbramps" content={curbramps ? "Yes" : "No"} />
          ) : null}
          {markedCrossing ? (
            <ContentRow label="Marked crosswalk" content={markedCrossing} />
          ) : null}
          {incline !== undefined ? (
            <ContentRow
              label="Incline"
              content={`${Math.abs(incline * 100).toPrecision(1)}%`}
            />
          ) : null}
          {surface !== undefined ? (
            <ContentRow label="Surface" content={SURFACE_MAP[surface]} />
          ) : null}
          {indoor !== undefined ? (
            <ContentRow label="Indoor" content={indoor ? "Yes" : "No"} />
          ) : null}
        </TableBody>
      </DataTable>
      <CardActions>
        <Button
          flat
          primary
          onClick={() => {
            dispatch(routeFromPOI());
            dispatch(requestDirections());
          }}
        >
          Route from here
        </Button>
        <Button
          flat
          primary
          onClick={() => {
            dispatch(routeToPOI());
            dispatch(requestDirections());
          }}
        >
          Route to here
        </Button>
      </CardActions>
    </Card>
  );
};

export default POICard;
