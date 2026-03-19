import AppBar from '@material-ui/core/AppBar';
import Avatar from '@material-ui/core/Avatar';
import Button from '@material-ui/core/Button';
import Checkbox from '@material-ui/core/Checkbox';
import Chip from '@material-ui/core/Chip';
import Divider from '@material-ui/core/Divider';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormGroup from '@material-ui/core/FormGroup';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import MenuItem from '@material-ui/core/MenuItem';
import Popover from '@material-ui/core/Popover';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import withStyles from '@material-ui/core/styles/withStyles';
import SwipeableDrawer from '@material-ui/core/SwipeableDrawer';
import TextField from '@material-ui/core/TextField';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import AddIcon from '@material-ui/icons/Add';
import MoneyIcon from '@material-ui/icons/AttachMoney';
import Chat from '@material-ui/icons/Chat';
import CloudDownload from '@material-ui/icons/CloudDownload';
import CompareArrowsIcon from '@material-ui/icons/CompareArrows';
// import DonutIcon from '@material-ui/icons/DonutLarge';
import HomeIcon from '@material-ui/icons/Home';
import Menu from '@material-ui/icons/Menu';
import SettingsIcon from '@material-ui/icons/Settings';
import Timeline from '@material-ui/icons/Timeline';
import ViewListIcon from '@material-ui/icons/ViewList';
import * as React from 'react';
import { Link } from 'react-router-dom';
import {
  dayInfoHelper as dih,
  GcClickableItem,
  GcConsumedProductsSummary,
  GcFeedback,
  GcGraph,
  GcLogo,
  GcTimeInputDialog,
  GcTooltip,
  globalClasses,
  logRender,
  Point,
} from '..';
import { avatarPlaceholder } from '../../assets';
import { csn } from '../../shared';
import { dateUtils } from '../../shared';
import { BodyWeightUnit } from '../../shared/types';
import { logEvent } from '../../utils';
import { gtagProxyMethod, usu, windowEventHandler } from '../../utils';
import {
  gcMainBarStylesCallback,
  StyleProps,
} from './gc-main-bar.styles';
import { Props } from './gc-main-bar.types';

const stage: string = process.env.REACT_APP_STAGE || '';

interface State {
  loginAnchor?: HTMLElement;
  settingsAnchor?: HTMLElement;
  toolsAnchor?: HTMLElement;
  consumedProductsSummaryVisible: boolean;
  graphVisible: boolean;
  editingMeal?: number;
  timeInputPoint: Point | null;
  mainMenuVisible: boolean;
  feedbackVisible: boolean;
}

class GcMainBarView extends
  React.PureComponent<Props & StyleProps, State> {
  public state: State = {
    timeInputPoint: null,
    consumedProductsSummaryVisible: false,
    graphVisible: false,
    mainMenuVisible: false,
    feedbackVisible: false,
  };

  constructor(props: Props & StyleProps) {
    super(props);
    gtagProxyMethod(
      this,
      'showPricesDialog',
      'showConsumedProductsSummary',
      'showGraph',
      'showIntakeSugarDialog',
      'showFeedback',
      'installButtonClick',
      'showFoodComparisonDialog',
      'login',
      'logout',
    );
  }

  public showPricesDialog = () => {
    this.props.onShowPricesDialog();
    this.setState({
      mainMenuVisible: false,
      toolsAnchor: undefined,
    });
  }

  public showGraph = () => this.setState({
    graphVisible: true,
    mainMenuVisible: false,
    toolsAnchor: undefined,
  })

  public showFoodComparisonDialog = () => {
    this.props.onShowFoodComparisonDialog();
    this.setState({
      mainMenuVisible: false,
      toolsAnchor: undefined,
    });
  }

  public showIntakeSugarDialog = () => {
    this.props.onShowIntakeSugarDialog();
    this.setState({
      mainMenuVisible: false,
      toolsAnchor: undefined,
    });
  }

  public showFeedback = () => this.setState({
    feedbackVisible: true,
    mainMenuVisible: false,
  })

  public installButtonClick = () => {
    windowEventHandler.showInstallPrompt();
  }

  public goToHome = () => {
    window.location.href = '/';
  }

  public settingsMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ settingsAnchor: event.currentTarget });
  }

  public closeSettingsLoginMenu = () => {
    this.setState({ settingsAnchor: undefined });
  }

  public loginMenuClick = (event: React.MouseEvent<HTMLDivElement>) => {
    this.setState({ loginAnchor: event.currentTarget });
  }

  public closeLoginMenu = () => {
    this.setState({ loginAnchor: undefined });
  }

  public login = () => {
    this.props.onLogIn();
    this.setState({ loginAnchor: undefined });
  }

  public logout = () => {
    this.props.onLogOut();
  }

  public render(): JSX.Element {
    logRender(this);
    const { classes, menuMode } = this.props;
    const { timeInputPoint } = this.state;

    return (
      <AppBar
        position="static"
        classes={{
          colorPrimary: csn({
            [classes.uatEnv]: stage === 'uat',
            [classes.devEnv]: stage === 'dev',
            [classes.rcEnv]: stage === 'rc',
          }),
        }}
      >
        <Toolbar className={classes.toolBar}>

          {menuMode && this.renderMenu()}

          <Link className={classes.titleContainer} to="/">
            <GcLogo className={classes.titleLogo} dishIndex="auto" />
          </Link>

          {this.renderActions()}

        </Toolbar>
        <GcTimeInputDialog
          point={timeInputPoint}
          onSubmit={this.submitTimeInput}
          onClose={this.timeInputClose}
        />
        <GcConsumedProductsSummary
          open={this.state.consumedProductsSummaryVisible}
          onClose={this.closeConsumedProductsSummaryDialog}
        />
        <GcGraph
          open={this.state.graphVisible}
          onClose={this.closeGraphDialog}
        />
        <GcFeedback
          open={this.state.feedbackVisible}
          onClose={this.closeFeedbackDialog}
        />
        {!menuMode &&
          <Button
            className={classes.feedbackButton}
            color="primary"
            variant="contained"
            onClick={this.showFeedback}
          >
            Feedback
          </Button>
        }
      </AppBar>
    );
  }

  public showConsumedProductsSummary = () => this.setState({
    consumedProductsSummaryVisible: true,
    mainMenuVisible: false,
    toolsAnchor: undefined,
  })

  private renderActions = () => {
    const { classes, menuMode, canInstallApp } = this.props;
    const { toolsAnchor } = this.state;
    return (
      <div className={classes.settingsContainer}>
        {[
          !menuMode && [
            <Button
              key="tools-button"
              className={globalClasses.gcWhiteText}
              onClick={(event) => this.setState({ toolsAnchor: event.currentTarget })}
            >
              Tools
            </Button>,

            <Popover
              key={'tools-menu'}
              anchorEl={toolsAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'left',
              }}
              open={Boolean(toolsAnchor)}
              onClose={() => this.setState({ toolsAnchor: undefined })}
            >
              {this.renderToolItems()}
            </Popover>,

            canInstallApp &&
            <GcTooltip
              key={'install-icon'}
              title="Install application to your device"
            >
              <GcClickableItem
                className={classes.button}
                aria-haspopup="true"
                onClick={this.installButtonClick}
                color="inherit"
              >
                <CloudDownload />
              </GcClickableItem>
            </GcTooltip>,

            <GcTooltip
              key={'goto-welcome-icon'}
              title="Go to Home Page"
            >
              <GcClickableItem
                className={classes.button}
                color="inherit"
                onClick={this.goToHome}
              >
                <HomeIcon />
              </GcClickableItem>
            </GcTooltip>,

            <GcTooltip
              key={'settings-icon'}
              title="Settings"
            >
              <GcClickableItem
                className={classes.button}
                aria-haspopup="true"
                onClick={this.settingsMenuClick}
                color="inherit"
              >
                <SettingsIcon />
              </GcClickableItem>
            </GcTooltip>,
            this.renderSettingsPopup(),
          ],
          this.renderLoginSection(),
        ]}
      </div>
    );
  }

  private renderLoginSection = () => {
    const { classes, loggedIn,
      avatarUrl, isAdmin, userEmail, userName } = this.props;
    const { loginAnchor } = this.state;

    if (loggedIn) {
      return (
        [
          (
            <GcClickableItem
              key={'login-icon'}
              aria-haspopup="true"
              onClick={this.loginMenuClick}
              color="inherit"
            >
              <Avatar
                className={classes.avatar}
                src={avatarUrl ? avatarUrl : undefined}
              >
                {
                  !avatarUrl
                    ? (userName || userEmail)
                      .charAt(0).toUpperCase()
                    : undefined
                }
              </Avatar>
            </GcClickableItem>
          ),
          (
            <Popover
              key={'login-menu'}
              anchorEl={loginAnchor}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'right',
              }}
              transformOrigin={{
                vertical: 'top',
                horizontal: 'right',
              }}
              open={Boolean(loginAnchor)}
              onClose={this.closeLoginMenu}
            >
              <div className={classes.userInfoInMenu}>
                <Avatar
                  className={classes.avatarInMenu}
                  src={avatarUrl ? avatarUrl : undefined}
                >
                  {
                    !avatarUrl
                      ? (userName || userEmail)
                        .charAt(0).toUpperCase()
                      : undefined
                  }
                </Avatar>
                <div>
                  <Typography variant="subtitle1">
                    {userName}
                  </Typography>
                  <Typography variant="caption">
                    {userEmail}
                  </Typography>
                </div>
              </div>
              {
                isAdmin &&
                <Link to="/admin" style={{ textDecoration: 'none' }}>
                  <MenuItem onClick={this.closeLoginMenu}>Admin</MenuItem>
                </Link>
              }
              <MenuItem onClick={this.logout}>Logout</MenuItem>
              <Divider />
              <div className={classes.userMenuBottomGroup}>
                <Button
                  className={classes.userMenuBottomLink}
                  href="/cookies"
                  onClick={this.closeLoginMenu}
                >
                  COOKIE&nbsp;POLICY
                </Button>
                <Button
                  className={classes.userMenuBottomLink}
                  href="/privacy"
                  onClick={this.closeLoginMenu}
                >
                  PRIVACY&nbsp;POLICY
                </Button>
                <Button
                  className={classes.userMenuBottomLink}
                  href="/terms"
                  onClick={this.closeLoginMenu}
                >
                  TERMS&nbsp;OF&nbsp;USE
                </Button>
              </div>
            </Popover>
          ),
        ]
      );
    }

    return (
      <Button
        key={'login-button'}
        className={classes.loginButton}
        color="inherit"
        onClick={this.login}
      >
        Login
      </Button>
    );
  }

  private renderMenu = () => {
    const { classes, canInstallApp, loggedIn,
      avatarUrl, userEmail, userName } = this.props;

    const { mainMenuVisible } = this.state;

    return [
      (
        <GcTooltip
          key="menu-button"
          title="Open Menu"
        >
          <GcClickableItem
            className={classes.button}
            onClick={this.openMainMenu}
            color="inherit"
          >
            <Menu />
          </GcClickableItem>
        </GcTooltip>
      ),
      (
        <SwipeableDrawer
          key="main-menu-drawer"
          open={mainMenuVisible}
          onOpen={this.openMainMenu}
          onClose={this.closeMainMenu}
          swipeAreaWidth={20}
        >
          <div>
            <div className={csn(classes.userInfoInMenu, classes.userInfoInMainMenu)}>
              {
                <>
                  <Avatar
                    key="avatar"
                    className={classes.avatarInMenu}
                    src={avatarUrl ? avatarUrl : avatarPlaceholder}
                  >
                    {
                      !avatarUrl
                        ? (userName || userEmail)
                          .charAt(0).toUpperCase()
                        : undefined
                    }
                  </Avatar>
                  <div key="user-name">
                    <Typography
                      variant="subtitle1"
                      className={globalClasses.gcWhiteText}
                    >
                      {loggedIn ? userName : 'Consider logging in'}
                    </Typography>
                  </div>
                </>
              }
            </div>
            <MenuItem onClick={this.goToHome}>
              <ListItemIcon className={classes.mainMenuButtonIcon}>
                <HomeIcon />
              </ListItemIcon>
              <Typography>Home Page</Typography>
            </MenuItem>
            <Divider />
            {
              loggedIn && canInstallApp &&
              <>
                <MenuItem key="install-button" onClick={this.installButtonClick}>
                  <ListItemIcon className={classes.mainMenuButtonIcon}>
                    <CloudDownload />
                  </ListItemIcon>
                  <Typography>Install application</Typography>
                </MenuItem>
                <Divider key="install-button-divider" />
              </>
            }

            {this.renderToolItems()}

            <MenuItem
              onClick={this.showFeedback}
            >
              <ListItemIcon className={classes.mainMenuButtonIcon}>
                <Chat />
              </ListItemIcon>
              <Typography>Leave feedback</Typography>
            </MenuItem>
            <Divider />
            {this.renderSettings()}
          </div>
        </SwipeableDrawer>
      ),
    ];
  }

  private renderToolItems = () => {
    const { classes, loggedIn, onShowLoginOfferDialog } = this.props;
    return (
      <>
        <MenuItem onClick={loggedIn ? this.showConsumedProductsSummary : onShowLoginOfferDialog}>
          <ListItemIcon className={classes.mainMenuButtonIcon}>
            <ViewListIcon />
          </ListItemIcon>
          <Typography>Consumed food summary</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.showGraph}>
          <ListItemIcon className={classes.mainMenuButtonIcon}>
            <Timeline />
          </ListItemIcon>
          <Typography>Graph summary</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.showPricesDialog}>
          <ListItemIcon className={classes.mainMenuButtonIcon}>
            <MoneyIcon />
          </ListItemIcon>
          <Typography>Food prices management</Typography>
        </MenuItem>
        <Divider />
        <MenuItem onClick={this.showFoodComparisonDialog}>
          <ListItemIcon className={classes.mainMenuButtonIcon}>
            <CompareArrowsIcon />
          </ListItemIcon>
          <Typography>Food comparison</Typography>
        </MenuItem>
        <Divider />
        {/* <MenuItem onClick={this.showIntakeSugarDialog}>
          <ListItemIcon className={classes.mainMenuButtonIcon}>
            <DonutIcon />
          </ListItemIcon>
          <Typography>Intake of sugar</Typography>
        </MenuItem> */}
        <Divider />
      </>
    );
  }

  private timeInputClose = () => this.setState({ timeInputPoint: null });

  private submitTimeInput = (time: Date) => {
    const newTime = dateUtils.getMealTime(time);
    this.props.onChangeRemoteSettings(usu.addMeal(newTime));
    this.timeInputClose();
  }

  private closeConsumedProductsSummaryDialog = () => this.setState({ consumedProductsSummaryVisible: false });

  private closeGraphDialog = () => this.setState({ graphVisible: false });

  private closeFeedbackDialog = () => this.setState({ feedbackVisible: false });

  private renderSettings = () => {
    const { classes, showNutrients,
      bodyWeightUnit, pricesSuffix, meals, menuMode } = this.props;
    return (
      <div>
        <FormGroup
          className={classes.checkboxFormGroup}
          row={true}
        >
          <FormControlLabel
            control={
              <Checkbox
                checked={showNutrients}
                color="primary"
                onChange={this.nutrientsCheckboxChange}
              />
            }
            label={'Nutrients' + (menuMode ? '' : ' [N]')}
          />
        </FormGroup>
        <Divider />
        <div className={classes.bodyWeightUnitContainer}>
          <Typography
            className={classes.bodyWeightUnitCaption}
          >
            Body weight unit
          </Typography>
          <RadioGroup
            className={classes.bodyWeightUnitRadioGroup}
            name="bodyWeightUnit"
            row={true}
            value={bodyWeightUnit}
            onChange={this.bodyWeightUnitChange}
          >
            <FormControlLabel
              value="kg"
              control={
                <Radio classes={{ root: classes.radio, checked: classes.radioChecked }} />}
              label="kg"
            />
            <FormControlLabel
              value="lb"
              control={
                <Radio classes={{ root: classes.radio, checked: classes.radioChecked }} />}
              label="lb"
            />
          </RadioGroup>
        </div>
        <Divider />

        <FormGroup
          className={classes.checkboxFormGroup}
          row={true}
        >
          <TextField
            className={classes.priceSuffixInput}
            label="Prices currency"
            value={pricesSuffix}
            onChange={this.currencyChange}
          />
        </FormGroup>
        <Divider />

        <div className={classes.mealsContainer}>
          <Typography className={classes.mealsCaption}>
            Default meals
          </Typography>
          {
            meals.map((iter) => (
              <Chip
                key={iter}
                className={classes.meal}
                color="primary"
                label={dih.formatMealTime(iter)}
                onDelete={() => this.deleteMeal(iter)}
                onClick={(event) =>
                  this.setState({
                    editingMeal: iter,
                    timeInputPoint: {
                      x: event.pageX,
                      y: event.pageY,
                    },
                  })
                }
              />
            ))
          }
          <Chip
            avatar={
              <Avatar>
                <AddIcon />
              </Avatar>
            }
            className={classes.meal}
            color="primary"
            label="Add"
            onClick={this.addNewMeal}
          />
        </div>
      </div>
    );
  }

  private renderSettingsPopup = () => {
    const { settingsAnchor } = this.state;
    return (
      <Popover
        key={'settings-popup'}
        anchorEl={settingsAnchor}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        open={Boolean(settingsAnchor)}
        onClose={this.closeSettingsLoginMenu}
      >
        {this.renderSettings()}
      </Popover>
    );
  }

  private addNewMeal = (event: React.MouseEvent<Element>) => {
    this.setState({
      editingMeal: undefined,
      timeInputPoint: {
        x: event.pageX,
        y: event.pageY,
      },
    });
  }

  private deleteMeal = (meal: number) =>
    this.props.onChangeRemoteSettings(usu.deleteMeal(meal))

  private nutrientsCheckboxChange = () =>
    this.props.onChangeRemoteSettings(usu.setShowNutrients(!this.props.showNutrients))

  private bodyWeightUnitChange = (event: React.ChangeEvent<HTMLInputElement>) =>
    this.props.onChangeRemoteSettings(usu.setBodyWeightUnit(event.target.value as BodyWeightUnit))

  private currencyChange = (event: React.ChangeEvent<HTMLTextAreaElement>) =>
    this.props.onChangeRemoteSettings(usu.setPriceSuffix(event.target.value))

  private openMainMenu = () => {
    logEvent('OpenMainMenu');
    this.setState({ mainMenuVisible: true });
  }

  private closeMainMenu = () => this.setState({ mainMenuVisible: false });

}

export const GcMainBarViewStyled =
  withStyles(gcMainBarStylesCallback)(GcMainBarView);
