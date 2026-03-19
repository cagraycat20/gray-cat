import { Tab, TabKey } from '../../../../shared/types/admin.types';

export interface OwnProps {
  tab: Tab;
  expanded: boolean;
  selected: boolean;
  onTabSelected: (tab: TabKey) => void;
}
