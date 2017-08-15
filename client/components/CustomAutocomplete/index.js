import React from 'react';
import Autocomplete from 'react-md/lib/Autocompletes';


// The only thing customized about this Autocomplete is that it does *not*
// return focus to the TextField after selecting an entry. The changes are:
// 1) The TextField does not have its .focus method called during setState
// 2) manualFocus state is not set to true
// TODO: push upstream?
export default class CustomAutocomplete extends Autocomplete {
  _handleItemClick(index) {
    if (index === -1) { return; }

    const { matches } = this.state;
    const { data, dataLabel, filter, onAutocomplete, clearOnAutocomplete } = this.props;
    let value = matches.filter(m => !React.isValidElement(m))[index];
    if (typeof value === 'object') {
      value = value[dataLabel];
    }

    if (onAutocomplete) {
      onAutocomplete(value, index, matches);
    }

    value = clearOnAutocomplete ? '' : value;
    this.setState({
      isOpen: false,
      manualFocus: false,
      matches: filter ? filter(data, value, dataLabel) : matches,
      value,
    });
  }
}
