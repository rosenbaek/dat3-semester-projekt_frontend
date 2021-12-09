import { Box, Typography, CardMedia } from "@mui/material";

const NewsComponent = ({ news }) => {
	return (
		<Box
			sx={{
				height: "100%",
				borderRadius: 5,
				paddingBottom: 2,
				backgroundColor: "#FFFFFF",
				display: "flex",
				flexDirection: "column",
				justifyContent: "space-between",
				borderWidth: 1,
				borderStyle: "solid",
				borderColor: "#E5E7EA",
			}}
		>
			<Typography variant="h5" sx={{ alignSelf: "flex-start", mx: 3, my: 3 }}>
				News
			</Typography>
			{news.map((n) => {
				return (
					<Box
						key={n.title}
						onClick={() => window.open(n.link)}
						sx={{
							backgroundColor: "#FAFAFA",
							flexDirection: "row",
							display: "flex",
							mx: 3,
							marginBottom: 1,
							borderRadius: 3,
						}}
					>
						<CardMedia
							component="img"
							sx={{ width: 80, height: 80, borderRadius: 1 }}
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
