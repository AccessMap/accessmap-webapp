import React from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';
import { DialogContainer } from 'react-md/lib/Dialogs';
import FontIcon from 'react-md/lib/FontIcons';
import List from 'react-md/lib/Lists';
import DataTable, { TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables';

import GithubIcon from 'components/Icons/GithubIcon';
import TwitterIcon from 'components/Icons/TwitterIcon';

import uwesciencelogo from '../../images/uwescience.jpg';
import wsdotlogo from '../../images/wsdot.png';


const ContentRow = props => (
  <TableRow className='content-entry' selectable={false}>
    <TableColumn numeric adjusted={false}>
      {props.buttons}
    </TableColumn>
    <TableColumn>
      {props.label}
    </TableColumn>
  </TableRow>
);

ContentRow.propTypes = {
  buttons: PropTypes.oneOfType([
    PropTypes.element,
    PropTypes.arrayOf(PropTypes.element),
  ]).isRequired,
  label: PropTypes.string,
};

ContentRow.defaultProps = {
  label: '',
};


const LinkOverlay = (props) => {
  const {
    actions,
    linkoverlay,
  } = props;

  let title;
  let content;

  switch (linkoverlay) {
    case 'about':
      title = 'About';
      content = (
        <DataTable
          plain
          responsive
        >
          <TableBody>
            <ContentRow
              buttons={(
                <Button
                  icon
                  href='https://github.com/accessmap'
                  target='_blank'
                >
                  <GithubIcon />
                </Button>
              )}
              label={'AccessMap is an open source project.'}
            />
            <ContentRow
              buttons={(
                <Button
                  icon
                  href='https://tcat.cs.washington.edu/'
                  target='_blank'
                >
                  school
                </Button>
              )}
              label='AccessMap is developed via the Taskar Center at the University of Washington.'
            />
            <ContentRow
              buttons={[
                <a
                  className='md-inline-block'
                  key='uwescience'
                  href='http://escience.washington.edu/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    alt='UW eScience'
                    src={uwesciencelogo}
                    height={32}
                  />
                </a>,
                <a
                  className='md-inline-block'
                  key='wsdot'
                  href='http://www.wsdot.wa.gov/'
                  target='_blank'
                  rel='noopener noreferrer'
                >
                  <img
                    alt='Washington DOT'
                    src={wsdotlogo}
                    height={16}
                  />
                </a>,
              ]}
              label='AccessMap has received support from many organizations.'
            />
            <ContentRow
              buttons={(
                <Button
                  icon
                  href='https://www.washington.edu/giving/make-a-gift/?page=funds&source_typ=3&source=TASKAR'
                  target='_blank'
                >
                  <FontIcon
                    error
                  >
                    favorite
                  </FontIcon>
                </Button>
              )}
              label='Contribute to AccessMap development by donating to the Taskar Center. Mention AccessMap in the comment.'
            />
          </TableBody>
        </DataTable>
      );
      break;
    case 'contact':
      title = 'Contact';
      content = (
        <DataTable
          plain
          responsive
        >
          <TableBody>
            <ContentRow
              buttons={
                <Button
                  icon
                  href='https://twitter.com/accessmapsea'
                  target='_blank'
                >
                  <TwitterIcon />
                </Button>
              }
              label={'Follow us on social media.'}
            />
            <ContentRow
              buttons={
                <Button
                  icon
                  href='mailto:developers@accessmapseattle.com'
                >
                  mail
                </Button>
              }
              label='Email us if you encounter issues or want to help out'
            />
          </TableBody>
        </DataTable>
      );
      break;
    case null:
    default:
      return null;
  }

  return (
    <DialogContainer
      className='link-overlay'
      id={`${title}-dialog`}
      aria-label={`${title} page dialog.`}
      title={title}
      visible
      contentComponent={List}
      actions={[{
        label: 'Close',
        secondary: true,
        onClick: actions.closeLinkOverlay,
      }]}
      onHide={actions.closeLinkOverlay}
    >
      {content}
    </DialogContainer>
  );
};

LinkOverlay.propTypes = {
  actions: PropTypes.objectOf(PropTypes.func).isRequired,
  linkoverlay: PropTypes.oneOf(['about', 'contact']),
};

LinkOverlay.defaultProps = {
  linkoverlay: null,
};

const mapStateToProps = state => ({
  linkoverlay: state.linkoverlay,
});

const mapDispatchToProps = dispatch => ({
  actions: bindActionCreators(AppActions, dispatch),
});

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(LinkOverlay);
