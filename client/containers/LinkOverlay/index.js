import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';

import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';

import cn from 'classnames';

import * as AppActions from 'actions';

import Button from 'react-md/lib/Buttons';
import { DialogContainer } from 'react-md/lib/Dialogs';
import FontIcon from 'react-md/lib/FontIcons';
import IconSeparator from 'react-md/lib/Helpers/IconSeparator';
import List, { ListItem } from 'react-md/lib/Lists';
import DataTable, { TableBody, TableRow, TableColumn } from 'react-md/lib/DataTables';
import Toolbar from 'react-md/lib/Toolbars';

import GithubIcon from 'components/Icons/GithubIcon';
import TwitterIcon from 'components/Icons/TwitterIcon';

import uwesciencelogo from '../../images/uwescience.jpg';
import wsdotlogo from '../../images/wsdot.png';


const ContentRow = (props) => {
  return (
    <TableRow className='content-entry' selectable={false}>
      <TableColumn numeric adjusted={false}>
        {props.buttons}
      </TableColumn>
      <TableColumn>
        {props.label}
      </TableColumn>
    </TableRow>
  );
};


const LinkOverlay = (props) => {
  const {
    actions,
    linkoverlay,
    mediaType,
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
                >
                  <img
                    src={uwesciencelogo}
                    height={32}
                  />
                </a>,
                <a
                  className='md-inline-block'
                  key='wsdot'
                  href='http://www.wsdot.wa.gov/'
                  target='_blank'
                >
                  <img
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
              buttons={(
                <Button
                  icon
                  href='https://twitter.com/accessmapsea'
                  target='_blank'
                >
                  <TwitterIcon />
                </Button>
              )}
              label={'Follow us on social media.'}
            />
            <ContentRow
              buttons={(
                <Button
                  icon
                  href='mailto:developers@accessmapseattle.com'
                >
                  mail
                </Button>
              )}
              label='Email us if you encounter issues or want to help out'
            />
          </TableBody>
        </DataTable>
      );
      break;
    case null:
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
        onClick: actions.closeLinkOverlay
      }]}
      onHide={actions.closeLinkOverlay}
    >
      {content}
    </DialogContainer>
  );
}

function mapStateToProps(state) {
  const {
    browser,
    linkoverlay,
  } = state;

  return {
    linkoverlay: linkoverlay,
    mediaType: browser.mediaType,
  };
}

function mapDispatchToProps(dispatch) {
  return {
    actions: bindActionCreators(AppActions, dispatch)
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(LinkOverlay);
