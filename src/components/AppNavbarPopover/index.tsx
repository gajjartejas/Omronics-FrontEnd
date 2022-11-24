import { Divider, List, ListItem, ListItemText, Popover, Typography } from "@mui/material";
import * as React from "react";
import { useEffect } from "react";

interface Props {
	anchorEl: HTMLElement | null;
}

const AppNavbarPopover: React.FC<Props> = (props: Props) => {
	const { anchorEl } = props;

	const [open, setOpen] = React.useState(Boolean(anchorEl));

	const handlePopoverClose = () => {
		setOpen(false);
		alert("teat");
	};

	useEffect(() => {
		setOpen(Boolean(anchorEl));
	}, [anchorEl]);

	return (
		<Popover
			style={{ pointerEvents: "none" }}
			onMouseLeave={handlePopoverClose}
			id="mouse-over-popover"
			sx={{
				pointerEvents: "none",
				boxShadow: 1,
			}}
			open={open}
			anchorEl={anchorEl}
			anchorOrigin={{
				vertical: "bottom",
				horizontal: "center",
			}}
			transformOrigin={{
				vertical: "top",
				horizontal: "center",
			}}
			// onClose={handlePopoverClose}
			disableRestoreFocus
		>
			<List component="nav">
				<ListItem button>
					<ListItemText primary="Inbox" />
				</ListItem>
				<Divider />
				<ListItem button divider>
					<ListItemText primary="Drafts" />
				</ListItem>
				<ListItem button>
					<ListItemText primary="Trash" />
				</ListItem>
				<Divider light />
				<ListItem button>
					<ListItemText primary="Spam" />
				</ListItem>
			</List>
		</Popover>
	);
};

export default AppNavbarPopover;
