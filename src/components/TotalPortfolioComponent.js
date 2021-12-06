import { styled, useTheme } from "@mui/material/styles";
import { Card, Typography, Box, Grid } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";

const RootStyle = styled(Card)(({ theme }) => ({
	boxShadow: "none",
	textAlign: "center",
	borderRadius: 16,
	padding: theme.spacing(3, 0),
	color: "rgb(0, 82, 73)",
	backgroundColor: "#FFFFFF",
	borderWidth: 1,
	borderStyle: "solid",
	borderColor: "#E5E7EA",
}));

export default function TotalPortfolioComponent({ user, currency }) {
	const [dates, setDates] = useState([]);
	const [values, setValues] = useState([]);
	const theme = useTheme();

	const CHART_DATA = [
		{
			name: "Total Portfolio Value",
			type: "area",
			data: values,
		},
	];

	useEffect(() => {
		setValues([]);
		user.historicalPortFolioValue.forEach((value) => {
			setDates((dates) => [...dates, value.date]);
			setValues((values) => [...values, value.value.toFixed(2)]);
		});
	}, [user]);

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

		labels: dates,
		chart: {
			toolbar: { show: true },
			zoom: { enabled: true },
			// animations: { enabled: false },
			foreColor: theme.palette.text.disabled,
			fontFamily: theme.typography.fontFamily,
		},

		colors: ["blue"],
		xaxis: {
			type: "datetime",
			tickPlacement: "on",
		},
		tooltip: {
			shared: true,
			intersect: false,
			y: {
				formatter: (y) => {
					if (typeof y !== "undefined") {
						return `${y.toFixed(2)} ${currency.toUpperCase()}`;
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
						{user.totalPortfolioValue.toFixed(2)} {currency.toUpperCase()}
					</Typography>
				</Grid>
			</Grid>

			<Box sx={{ p: 3, pb: 1 }}>
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
