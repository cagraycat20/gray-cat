import { TabKey } from '../../../shared/types/admin.types';

export interface OwnProps {
  selectedTab: TabKey;
  expanded: boolean;
  onTabSelected: (tab: TabKey) => void;
  onExpansionClick: () => void;
}
