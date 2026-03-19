export const CHANGE_NETWORK_STATUS = 'CHANGE_NETWORK_STATUS';
export interface ChangeNetworkStatus {
  type: typeof CHANGE_NETWORK_STATUS;
  online: boolean;
}

export function changeNetworkStatus(online: boolean): ChangeNetworkStatus {
  return {
    type: CHANGE_NETWORK_STATUS,
    online,
  };
}
