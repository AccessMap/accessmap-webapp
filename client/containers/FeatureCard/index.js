import React from 'react';
import PropTypes from 'prop-types';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import Button from 'react-md/src/js/Buttons';
import Card, { CardActions } from 'react-md/src/js/Cards';
import DataTable, { TableBody, TableRow, TableColumn } from 'react-md/src/js/DataTables';
import SVGIcon from 'react-md/src/js/SVGIcons';
import Toolbar from 'react-md/src/js/Toolbars';

import OpeningHoursTable from 'components/OpeningHoursTable';

import * as AppActions from 'actions';

import close from 'icons/close.svg';

const SURFACE_MAP = {
  asphalt: 'Asphalt',
  concrete: 'Concrete',
  gravel: 'Gravel',
  paving_stone: 'Paving stones',
};

const ContentRow = props => (
  <TableRow>
    <TableColumn>{props.label}</TableColumn>
    <TableColumn>
      {props.content}
    </TableColumn>
  </TableRow>
);

ContentRow.propTypes = {
  label: PropTypes.string.isRequired,
  content: PropTypes.oneOfType([PropTypes.node, PropTypes.string]).isRequired,
};

const FeatureCard = (props) => {
  const {
    actions,
    selectedFeature,
  } = props;

  if (!selectedFeature) return null;
  if (!selectedFeature.properties) selectedFeature.properties = {};

  const {
    curbramps,
    description,
    indoor,
    incline,
    marked,
    openingHours,
    surface,
    via,
    width,
  } = selectedFeature.properties;

  const title = selectedFeature.layerName
    ?
    selectedFeature.layerName
    :
    [
      selectedFeature.location[1].toFixed(6),
      selectedFeature.location[0].toFixed(6),
    ].join(', ');

  return (
    <Card
      className='feature-card md-cell md-cell--4'
    >
      <Toolbar
        title={title}
        actions={
          <Button
            aria-label='Close point of interest popup'
            icon
            svg
            onClick={actions.clearSelectedFeatures}
          >
            <SVGIcon use={close.url} />
          </Button>
        }
      />
      <DataTable className='feature-card-body' plain>
        <TableBody>
          {
            description !== undefined
            ?
              <ContentRow label='Description' content={description} />
            :
              null
          }
          {
            curbramps !== undefined
            ?
              <ContentRow
                label='Curb ramps'
                content={curbramps ? 'Yes' : 'No'}
              />
            :
              null
          }
          {
            marked !== undefined
            ?
              <ContentRow
                label='Marked crosswalk'
                content={marked ? 'Yes' : 'No'}
              />
            :
              null
          }
          {incline !== undefined
           ?
             <ContentRow
               label='Incline'
               content={`${Math.abs((incline * 100).toFixed(1))}%`}
             />
           :
             null
          }
          {surface !== undefined ? <ContentRow label='Surface' content={SURFACE_MAP[surface]} /> : null}
          {width !== undefined ?
            <ContentRow
              label='Width'
              content={`${width.toFixed(1)} meters`}
            /> :
            null
          }
          {indoor !== undefined ? <ContentRow label='Indoor' content={indoor ? 'Yes' : 'No'} /> : null}
          {via !== undefined ? <ContentRow label='Via' content={via} /> : null}
          {
            openingHours !== undefined
            ?
              <ContentRow
                label='Open Hours'
                content={<OpeningHoursTable openingHours={openingHours} />}
              />
            :
              null
          }
        </TableBody>
      </DataTable>
      <CardActions>
        <Button
          flat
          primary
          onClick={() => {
            actions.setOrigin(
              selectedFeature.location[0],
              selectedFeature.location[1],
              [
                selectedFeature.location[1].toFixed(6),
                selectedFeature.location[0].toFixed(6),
              ].join(', '),
            );
          }}
        >
          Route from here
        </Button>
        <Button
          flat
          primary
          onClick={() => {
            actions.setDestination(
              selectedFeature.location[0],
              selectedFeature.location[1],
              [
                selectedFeature.location[1].toFixed(6),
                selectedFeature.location[0].toFixed(6),
              ].join(', '),
            );
          }}
        >
          Route to here
        </Button>
      </CardActions>
    </Card>
  );
};

FeatureCard.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  selectedFeature: PropTypes.shape({
    layer: PropTypes.string,
    layerName: PropTypes.string,
    location: PropTypes.arrayOf(PropTypes.number),
    properties: PropTypes.object,
  }),
};

FeatureCard.defaultProps = { selectedFeature: null };

const mapStateToProps = state => ({
  selectedFeature: state.map.selectedFeature,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(FeatureCard);
