import React from "react";
import AppBar from "@material-ui/core/AppBar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Divider from "@material-ui/core/Divider";
import Drawer from "@material-ui/core/Drawer";
import Hidden from "@material-ui/core/Hidden";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import MenuIcon from "@material-ui/icons/Menu";
import Toolbar from "@material-ui/core/Toolbar";
import Box from "@material-ui/core/Box";
import { fade, makeStyles, useTheme } from "@material-ui/core/styles";
import { navigate } from "@reach/router";
import ExpandMore from "@material-ui/icons/ExpandMore";
import Collapse from "@material-ui/core/Collapse";
import Avatar from "@material-ui/core/Avatar";
import { deepOrange, deepPurple } from "@material-ui/core/colors";
import NotificationsNoneIcon from "@material-ui/icons/NotificationsNone";
import PowerSettingsNewIcon from "@material-ui/icons/PowerSettingsNew";
import SearchIcon from "@material-ui/icons/Search";
import InputBase from "@material-ui/core/InputBase";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import darkLogo from "./../logoblack.png";

const drawerWidth = 240;
const LINKS = [
  { title: "Dashboard", slug: "dashboard" },
  { title: "Profiles", slug: "profiles" },
  {
    title: "Feedback System",
    slug: "feedback-system",
    children: [
      { title: "Feedback Questions", slug: "feedback-questions" },
      { title: "Feedback Settings", slug: "feedback-settings" },
    ],
  },
  {
    title: "Skill Management",
    slug: "skill-management",
    children: [
      { title: "Skill Input", slug: "skills" },
      { title: "Skill Group", slug: "skill-groups" },
      { title: "Skill Profiles", slug: "skill-profiles" },
    ],
  },
  {
    title: "Settings",
    slug: "settings",
    children: [{ title: "System", slug: "settings/system" }],
  },
];
const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    backgroundColor: "#f7f9fc !important",
  },
  drawer: {
    [theme.breakpoints.up("sm")]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    backgroundColor: "#FFF",
    [theme.breakpoints.up("sm")]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up("sm")]: {
      display: "none",
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,
  drawerPaper: {
    width: drawerWidth,
    color: "#eeeeee",
    backgroundColor: "#233044",
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  orange: {
    color: theme.palette.getContrastText(deepOrange[500]),
    backgroundColor: deepOrange[500],
  },
  search: {
    position: "relative",
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 1),
    "&:hover": {
      backgroundColor: fade(theme.palette.common.white, 1),
    },
    marginRight: theme.spacing(2),
    marginLeft: 0,
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "auto",
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: "100%",
    position: "absolute",
    pointerEvents: "none",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    color: "#0000008a",
  },

  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("md")]: {
      width: "20ch",
    },
  },
}));

export default function Navigation(props) {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [listItemState, setListItemState] = React.useState({
    "feedback-system": false,
    "skill-management": false,
  });

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const handleListItemClick = (item) => {
    setListItemState((c) => ({ ...c, [item]: !c[item] }));
  };

  const drawer = (
    <div>
      <div className={classes.toolbar}>
        <Box
          display="flex"
          alignItems="center"
          justifyContent="center"
          css={{ height: 100, fontSize: "1.2rem" }}
        >
          <img src={darkLogo} style={{ width: "100%" }} />
        </Box>
      </div>
      <Divider />
      <List>
        {LINKS.map((item) => (
          <React.Fragment key={item.slug}>
            <ListItem
              button
              onClick={() =>
                item.children
                  ? handleListItemClick(item.slug)
                  : navigate(`/${item.slug}`)
              }
            >
              <ListItemText primary={item.title} />
              {item.children &&
                (listItemState[item.slug] ? (
                  <ExpandMore />
                ) : (
                  <ChevronRightIcon />
                ))}
            </ListItem>
            {item.children && (
              <>
                <Divider />
                <Collapse
                  in={listItemState[item.slug]}
                  timeout="auto"
                  unmountOnExit
                >
                  <List component="div" disablePadding>
                    {item.children.map((sItem) => (
                      <ListItem
                        button
                        className={classes.nested}
                        key={sItem.slug}
                        onClick={() => navigate(`/${sItem.slug}`)}
                      >
                        <ListItemText primary={sItem.title} />
                      </ListItem>
                    ))}
                  </List>
                </Collapse>
              </>
            )}
          </React.Fragment>
        ))}
      </List>
      <Divider />
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      <CssBaseline />
      <AppBar position="fixed" className={classes.appBar}>
        <Toolbar>
          <Box display="flex" css={{ width: "100%" }}>
            <Box width="100%" display="flex" alignItems="center">
              <IconButton
                color="inherit"
                aria-label="open drawer"
                edge="start"
                onClick={handleDrawerToggle}
                className={classes.menuButton}
              >
                <MenuIcon />
              </IconButton>
              <div className={classes.search}>
                <div className={classes.searchIcon}>
                  <SearchIcon />
                </div>
                <InputBase
                  placeholder="Search Profiles"
                  classes={{
                    root: classes.inputRoot,
                    input: classes.inputInput,
                  }}
                  inputProps={{ "aria-label": "search" }}
                />
              </div>
              <div className={classes.grow} />
            </Box>
            <Box display="flex" flexShrink={1}>
              <IconButton aria-label="delete">
                <NotificationsNoneIcon />
              </IconButton>
              <Avatar className={classes.orange} size="small">
                N
              </Avatar>
              <IconButton aria-label="delete">
                <PowerSettingsNewIcon />
              </IconButton>
            </Box>
          </Box>
        </Toolbar>
      </AppBar>
      <nav className={classes.drawer} aria-label="mailbox folders">
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
        <Hidden smUp implementation="css">
          <Drawer
            container={container}
            variant="temporary"
            anchor={theme.direction === "rtl" ? "right" : "left"}
            open={mobileOpen}
            onClose={handleDrawerToggle}
            classes={{
              paper: classes.drawerPaper,
            }}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
          >
            {drawer}
          </Drawer>
        </Hidden>
        <Hidden xsDown implementation="css">
          <Drawer
            classes={{
              paper: classes.drawerPaper,
            }}
            variant="permanent"
            open
          >
            {drawer}
          </Drawer>
        </Hidden>
      </nav>
    </>
  );
}
