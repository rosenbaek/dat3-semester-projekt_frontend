import { styled, useTheme } from "@mui/material/styles";
import { Card, Typography } from "@mui/material";

const RootStyle = styled(Card)(({ theme }) => ({
	boxShadow: "none",
	textAlign: "center",
	borderRadius: 16,
	padding: theme.spacing(5, 0),
	color: "rgb(0, 82, 73)",
	backgroundColor: "#C8FACD",
}));

export default function GroupView({ group, currency }) {
	const theme = useTheme();
	return (
		<RootStyle theme={theme}>
			<Typography variant="h5">{group.name}</Typography>
			<Typography variant="h3">{group.value}</Typography>
			<Typography variant="subtitle2" sx={{ opacity: 0.72 }}>
				{currency}
			</Typography>
		</RootStyle>
	);
}
