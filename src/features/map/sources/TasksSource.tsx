import React from "react";

import { Source } from "react-map-gl";

const TasksSource = () => (
  <Source id="tasks" type="vector" url="/tiles/tilejson/tasks.json" />
);

export default TasksSource;
