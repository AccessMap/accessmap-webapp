import React from "react";

import { Layer } from "react-map-gl";

const TasksLayers = () => (
  <>
    <Layer
      id="tasks-sidewalks"
      type="fill"
      source="tasks"
      source-layer="sidewalk_tasks"
      paint={{
        "fill-color": "#FF0000",
        "fill-opacity": [
          "case",
          ["==", ["get", "taskStatus"], "MAPPED"],
          0.1,
          0.6,
        ],
      }}
    />
    <Layer
      id="tasks-crossings"
      type="fill"
      source="tasks"
      source-layer="crossing_tasks"
      paint={{
        "fill-color": "#0000FF",
        "fill-opacity": [
          "case",
          ["==", ["get", "taskStatus"], "MAPPED"],
          0.1,
          0.6,
        ],
      }}
    />
  </>
);

export default TasksLayers;
