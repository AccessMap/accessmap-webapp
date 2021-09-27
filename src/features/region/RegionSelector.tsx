import React from "react";

import { DialogContainer } from "react-md/src/js/Dialogs";
import List, { ListItem } from "react-md/src/js/Lists";

import regions from "constants/regions";

import { useAppSelector, useAppDispatch } from "hooks";

import { endSelecting, set as setRegion } from "features/region/region-slice";

const RegionSelector = () => {
  const dispatch = useAppDispatch();
  const { selecting } = useAppSelector((state) => state.region);

  const sortedRegions = [...regions.features];
  sortedRegions.sort((a, b) => {
    return a.properties.name > b.properties.name ? 1 : -1;
  });

  return (
    <DialogContainer
      id="region-selections-container"
      visible={selecting}
      title="Regions"
      onHide={() => dispatch(endSelecting())}
      actions={[
        {
          secondary: true,
          children: "Cancel",
          onClick: () => dispatch(endSelecting()),
        },
      ]}
    >
      <List>
        {sortedRegions.map((f) => (
          <ListItem
            key={`region-select-button-${f.properties.name}`}
            primaryText={f.properties.name}
            onClick={() => dispatch(setRegion(f.properties.id))}
          />
        ))}
      </List>
    </DialogContainer>
  );
};

export default RegionSelector;
