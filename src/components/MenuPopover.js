import PropTypes from "prop-types";
// material
import { Popover } from "@mui/material";
import { alpha, styled, useTheme } from "@mui/material/styles";

// ----------------------------------------------------------------------

const ArrowStyle = styled("span")(({ theme }) => ({
	[theme.breakpoints.up("sm")]: {
		top: -7,
		zIndex: 1,
		width: 12,
		right: 20,
		height: 12,
		content: "''",
		position: "absolute",
		borderRadius: "0 0 4px 0",
		transform: "rotate(-135deg)",
		background: theme.palette.background.paper,
		borderRight: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
		borderBottom: `solid 1px ${alpha(theme.palette.grey[500], 0.12)}`,
	},
}));

// ----------------------------------------------------------------------

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
						"0 0 2px 0 rgba(145, 158, 171, 0.24),0 20px 40px -4px rgba(145, 158, 171, 0.24)",
					border: `solid 1px rgba(145, 158, 171, 0.08)`,
					width: 200,
					...sx,
				},
			}}
			{...other}
		>
			<ArrowStyle className="arrow" theme={theme} />

			{children}
		</Popover>
	);
}
