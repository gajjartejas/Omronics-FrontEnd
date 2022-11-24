import * as React from "react";
import { AppBar, Box, Divider, Drawer, IconButton, List, ListItem, ListItemButton, ListItemText, Toolbar, Typography, Button, Stack } from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";
import AppNavbarPopover from "../AppNavbarPopover";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import { usePopupState, bindHover, bindPopover } from "material-ui-popup-state/hooks";
import Image from "mui-image";

interface Props {
	items: string[];
	window?: () => Window;
}
const drawerWidth = 240;

const AppNavbar: React.FC<Props> = (props: Props) => {
	const { window, items } = props;
	const container = window !== undefined ? () => window().document.body : undefined;
	const [mobileOpen, setMobileOpen] = React.useState(false);
	const [anchorEl, setAnchorEl] = React.useState<HTMLElement | null>(null);

	const handleDrawerToggle = () => {
		setMobileOpen(!mobileOpen);
	};
	const handlePopoverOpen = (event: React.MouseEvent<HTMLElement>) => {
		setAnchorEl(event.currentTarget);
	};

	const handlePopoverClose = () => {
		setAnchorEl(null);
	};

	const drawer = (
		<Box onClick={handleDrawerToggle} sx={{ textAlign: "center" }}>
			<Typography variant="h6" sx={{ my: 2 }}>
				{"Omronics Auomation"}
			</Typography>
			<Divider />
			<List>
				{items.map((item) => (
					<ListItem key={item} disablePadding>
						<ListItemButton sx={{ textAlign: "center" }}>
							<ListItemText primary={item} />
						</ListItemButton>
					</ListItem>
				))}
			</List>
		</Box>
	);
	const popupState = usePopupState({
		variant: "popover",
		popupId: "demoPopover",
	});
	return (
		<>
			<AppBar sx={{}} component="nav">
				<Toolbar>
					<IconButton color="inherit" aria-label="open drawer" edge="start" onClick={handleDrawerToggle} sx={{ mr: 2, display: { sm: "none" } }}>
						<MenuIcon />
					</IconButton>
					<Box component="div" sx={{ml:10, color: "#000", flexGrow: 1, display: { xs: "none", sm: "block" } }}>
						<Image src={require("../../assets/svg/navbar-logo.svg").default} width={120} />
					</Box>

					<Stack direction="row" spacing={3} sx={{ mr: 10, display: { xs: "none", sm: "block" } }}>
						{items.map((item) => (
							<Button color="secondary" onMouseEnter={handlePopoverOpen} {...bindHover(popupState)} key={item}>
								{item}
							</Button>
						))}
					</Stack>
					{/* <AppNavbarPopover anchorEl={anchorEl} /> */}
					<HoverPopover
						{...bindPopover(popupState)}
						anchorOrigin={{
							vertical: "bottom",
							horizontal: "center",
						}}
						transformOrigin={{
							vertical: "top",
							horizontal: "center",
						}}
					>
						<Typography style={{ margin: 10 }}>The content of the Popover.</Typography>
					</HoverPopover>
				</Toolbar>
			</AppBar>
			<Box component="nav">
				<Drawer
					container={container}
					variant="temporary"
					open={mobileOpen}
					onClose={handleDrawerToggle}
					ModalProps={{
						keepMounted: true, // Better open performance on mobile.
					}}
					sx={{
						display: { xs: "block", sm: "none" },
						"& .MuiDrawer-paper": { boxSizing: "border-box", width: drawerWidth },
					}}
				>
					{drawer}
				</Drawer>
			</Box>
		</>
	);
};

export default AppNavbar;
