import { styled, useTheme } from "@mui/material/styles";
import { Card, Typography, Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";

const RootStyle = styled(Card)(({ theme }) => ({
	boxShadow: "none",
	textAlign: "center",
	borderRadius: 16,
	padding: theme.spacing(5, 0),
	color: "rgb(0, 82, 73)",
	backgroundColor: "#F7FAFA",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: "lightgrey",
}));

const CHART_DATA = [
	{
		name: "Total Portfolio Value",
		type: "area",
		data: [44, 55, 41, 67, 22, 43, 21, 41, 56, 27, 43],
	},
];

export default function TotalPortfolioComponent({ value, currency }) {
	const theme = useTheme();

	const chartOptions = {
		stroke: {
			width: 2,
			curve: "smooth",
			lineCap: "round",
		},

		plotOptions: { bar: { columnWidth: "11%", borderRadius: 4 } },
		fill: {
			type: "gradient",
			gradient: {
				type: "vertical",

				opacityFrom: 0.2,
				opacityTo: 0.0,
				stops: [0, 100],
			},
		},

		labels: [
			"01/01/2003",
			"02/01/2003",
			"03/01/2003",
			"04/01/2003",
			"05/01/2003",
			"06/01/2003",
			"07/01/2003",
			"08/01/2003",
			"09/01/2003",
			"10/01/2003",
			"11/01/2003",
		],
		chart: {
			toolbar: { show: false },
			zoom: { enabled: false },
			// animations: { enabled: false },
			foreColor: theme.palette.text.disabled,
			fontFamily: theme.typography.fontFamily,
		},

		colors: ["blue"],
		xaxis: { type: "datetime" },
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: (y) => {
					if (typeof y !== "undefined") {
						return `${y.toFixed(0)} ${currency.toUpperCase()}`;
					}
					return y;
				},
			},
		},
	};

	return (
		<RootStyle theme={theme}>
			<Grid container spacing={1}>
				{/* on small screens(phones), this item takes up 5 units. On medium-sized screens(tablets), take up 8 units. If an item is too large, it will go to the next line. */}
				<Grid item xs>
					<Typography variant="h5" sx={{ float: "left", marginLeft: 4 }}>
						Total Porfolio value
					</Typography>
				</Grid>
				<Grid item xs>
					<Typography variant="h5" sx={{ float: "right", marginRight: 4 }}>
						{value} {currency.toUpperCase()}
					</Typography>
				</Grid>
			</Grid>

			<Box sx={{ p: 3, pb: 1 }} dir="ltr">
				<ReactApexChart
					type="line"
					series={CHART_DATA}
					options={chartOptions}
					height={364}
				/>
			</Box>
		</RootStyle>
	);
}
