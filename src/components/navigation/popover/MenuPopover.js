import PropTypes from "prop-types";
// material
import { Popover } from "@mui/material";
import { useTheme } from "@mui/material/styles";

MenuPopover.propTypes = {
	children: PropTypes.node.isRequired,
	sx: PropTypes.object,
};

export default function MenuPopover({ children, sx, ...other }) {
	const theme = useTheme();

	theme.shadows = [
		...theme.shadows,
		`0 0 2px 0 rgba(0,0,0,0,1), 0 20px 40px -4px rgba(0,0,0,0,8)`,
	];
	return (
		<Popover
			anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
			transformOrigin={{ vertical: "top", horizontal: "right" }}
			PaperProps={{
				sx: {
					mt: 1.5,
					ml: 0.5,
					overflow: "inherit",
					boxShadow:
						"0 0 40px 0 rgba(145, 158, 171, 0.3),0px 20px 40px -4px rgba(145, 158, 171, 0.3)",
					border: `solid 1px rgba(145, 158, 171, 0.08)`,
					width: 200,
					borderRadius: 4,
					...sx,
				},
			}}
			{...other}
		>
			{children}
		</Popover>
	);
}
