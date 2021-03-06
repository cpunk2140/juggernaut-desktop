import React from 'react';
import { useDispatch } from 'react-redux';
import PropTypes from 'prop-types';
import {
  ListItem,
  ListItemGraphic,
  ListItemText,
  ListItemPrimaryText,
  ListItemSecondaryText,
  ListItemMeta,
  CircularProgress
} from 'rmwc';
import { Button } from '../../../utils/forms';
import { connectWallet } from '../wallet/walletSlice';

const WalletListItem = props => {
  const { name, host, id, removeWallet, connecting, activeWallet } = props;
  const dispatch = useDispatch();

  const showLaunching = connecting && activeWallet;
  const showDisabled = connecting;

  return (
    <ListItem>
      <ListItemGraphic icon="offline_bolt" />
      <ListItemText>
        <ListItemPrimaryText>{name}</ListItemPrimaryText>
        <ListItemSecondaryText>{`${host}`}</ListItemSecondaryText>
      </ListItemText>
      <ListItemMeta>
        {showLaunching && (
          <Button label="Launching" icon={<CircularProgress />} />
        )}
        {!showLaunching && (
          <Button
            onClick={() => dispatch(connectWallet(id))}
            label="Launch"
            raised
            disabled={showDisabled}
          />
        )}
        <Button
          onClick={() => removeWallet(id)}
          disabled={showDisabled}
          label="Remove"
        />
      </ListItemMeta>
    </ListItem>
  );
};

WalletListItem.propTypes = {
  name: PropTypes.string.isRequired,
  host: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  removeWallet: PropTypes.func.isRequired,
  connecting: PropTypes.bool.isRequired,
  activeWallet: PropTypes.bool.isRequired
};

export default WalletListItem;
