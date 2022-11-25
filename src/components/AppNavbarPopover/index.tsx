import React from "react";

//Third Party
import { Divider, List, ListItem, ListItemText } from "@mui/material";
import { bindPopover, PopupState } from "material-ui-popup-state/hooks";
import HoverPopover from "material-ui-popup-state/HoverPopover";

interface Props {
	popupState: PopupState;
}

const AppNavbarPopover: React.FC<Props> = (props: Props) => {
	const { popupState } = props;

	return (
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
			</List>{" "}
		</HoverPopover>
	);
};

export default AppNavbarPopover;
