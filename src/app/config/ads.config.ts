export const AdConfig = {
  clientId: 'ca-pub-YOUR_AD_CLIENT_ID',
  slots: {
    top: 'YOUR_TOP_SLOT_ID',
    middle: 'YOUR_MIDDLE_SLOT_ID',
    bottom: 'YOUR_BOTTOM_SLOT_ID'
  },
  enabled: false
};

export const setAdConfig = (config: { clientId: string; slots: { top: string; middle: string; bottom: string } }) => {
  AdConfig.clientId = config.clientId;
  AdConfig.slots = config.slots;
  AdConfig.enabled = true;
};
