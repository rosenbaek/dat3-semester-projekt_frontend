import { Box, Typography, CardMedia } from "@mui/material";

const NewsComponent = ({ news }) => {
	return (
		<Box
			sx={{
				height: "100%",
				borderRadius: 5,
				backgroundColor: "#F7FAFA",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: "lightgrey",
			}}
		>
			<Typography variant="h5" sx={{ alignSelf: "flex-start", mx: 3, my: 1 }}>
				News
			</Typography>
			{news.map((n) => {
				return (
					<Box
						onClick={() => window.open(n.link)}
						sx={{
							backgroundColor: "white",
							flexDirection: "row",
							display: "flex",
							mx: 1,
							marginBottom: 1,
							borderRadius: 3,
							borderWidth: 1,
							borderStyle: "solid",
							borderColor: "lightgrey",
						}}
					>
						<CardMedia
							component="img"
							sx={{ width: 100, height: 100, borderRadius: 3 }}
							image={n.urlImage}
						/>
						<Box sx={{ flex: 1, display: "flex", alignItems: "center", mx: 2 }}>
							<Typography align="left">{n.title}</Typography>
						</Box>
					</Box>
				);
			})}
		</Box>
	);
};

export default NewsComponent;
