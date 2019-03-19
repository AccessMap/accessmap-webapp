import React from "react";
import PropTypes from "prop-types";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";

import { DialogContainer } from "react-md/src/js/Dialogs";
import List, { ListItem } from "react-md/src/js/Lists";

import * as AppActions from "actions";

import regions from "constants/regions";

const RegionSelector = props => {
  const { actions, visible } = props;

  const sortedRegions = [...regions.features];
  sortedRegions.sort((a, b) => {
    return a.properties.name > b.properties.name ? 1 : -1;
  });

  return (
    <DialogContainer
      id="region-selections-container"
      visible={visible}
      title="Regions"
      onHide={actions.closeRegionSelections}
      actions={[
        {
          secondary: true,
          children: "Cancel",
          onClick: actions.closeRegionSelections
        }
      ]}
    >
      <List>
        {sortedRegions.map(f => (
          <ListItem
            key={`region-select-button-${f.properties.name}`}
            primaryText={f.properties.name}
            onClick={() => actions.selectRegion(f.properties.key)}
          />
        ))}
      </List>
    </DialogContainer>
  );
};

RegionSelector.propTypes = {
  visible: PropTypes.bool.isRequired
};

const mapStateToProps = state => {
  return {
    visible: state.activities.selectingRegion
  };
};

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch)
});

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(RegionSelector);
