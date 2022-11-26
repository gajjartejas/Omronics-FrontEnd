import React from "react";

//Third Party
import { Box, Divider, Stack, Typography } from "@mui/material";
import { bindPopover, PopupState } from "material-ui-popup-state/hooks";
import HoverPopover from "material-ui-popup-state/HoverPopover";
import AppLinkButton from "../AppLinkButton";

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
			sx={{ maxHeight: "95%" }}
		>
			<Stack sx={{}} spacing={0}>
				<Stack sx={{ mx: 8, my: 4 }} direction="row" spacing={6}>
					<Stack sx={{}} spacing={4}>
						<Typography sx={{ marginY: 2 }} variant="h6">
							{"Featured Brands"}
						</Typography>
						<AppLinkButton title={"Automation"} />
						<AppLinkButton title={"Bearing"} />
						<AppLinkButton title={"Motion"} />
						<AppLinkButton title={"Electrical"} />
						<AppLinkButton title={"Motion"} />
						<AppLinkButton title={"Automation"} />
						<AppLinkButton title={"Bearing"} />
						<AppLinkButton title={"Motion"} />
						<AppLinkButton title={"Motion"} />
						<AppLinkButton sx={{ color: "#DC004E", fontWeight: "bold" }} title={"View All"} />
					</Stack>
					<Stack sx={{}} spacing={4}>
						<Typography sx={{ marginY: 2 }} variant="h6">
							{"Features Products"}
						</Typography>
						<AppLinkButton title={"Siemens"} />
						<AppLinkButton title={"Delta"} />
						<AppLinkButton title={"GIC"} />
						<AppLinkButton title={"Schneider Electric"} />
						<AppLinkButton title={"Euro Controls"} />
						<AppLinkButton title={"L&T (Larsen & Toubro)"} />
						<AppLinkButton title={"Selec"} />
						<AppLinkButton title={"Robotbanao"} />
						<AppLinkButton sx={{ color: "#DC004E", fontWeight: "bold" }} title={"View All"} />
					</Stack>
					<Stack sx={{}} spacing={4}>
						<Typography sx={{ marginY: 2 }} variant="h6">
							{"Resources"}
						</Typography>
						<AppLinkButton title={"Catalog"} />
						<AppLinkButton title={"Manual"} />
						<AppLinkButton title={"Software"} />
						<AppLinkButton title={"Drawing"} />
						<AppLinkButton sx={{ color: "#DC004E", fontWeight: "bold" }} title={"View All"} />
					</Stack>
				</Stack>
				<Divider />
				<Stack justifyContent={"center"} sx={{}}>
					<Typography sx={{ my: 4, mx: 6 }} component="div">
						Not sure were to start?{" "}
						<Box fontWeight="fontWeightMedium" display="inline">
							Search Here
						</Box>{" "}
					</Typography>
				</Stack>
			</Stack>
		</HoverPopover>
	);
};

export default AppNavbarPopover;
