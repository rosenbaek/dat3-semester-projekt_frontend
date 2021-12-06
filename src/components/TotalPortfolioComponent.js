import { styled, useTheme } from "@mui/material/styles";
import { Card, Typography, Box, useMediaQuery } from "@mui/material";
import ReactApexChart from "react-apexcharts";
import { useEffect, useState } from "react";

const RootStyle = styled(Card)(({ theme }) => ({
	boxShadow: "none",
	textAlign: "center",
	borderRadius: 16,
	padding: theme.spacing(2, 0),
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
	const hiddenDown = useMediaQuery(theme.breakpoints.down("sm"));

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
			setValues((values) => [...values, value.value.toFixed(0)]);
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

	const calcPercent = () => {
		const totalBoughtPrice = user.totalPortfolioValue - user.profLoss;
		if (totalBoughtPrice === 0.0) {
			return 0.0;
		}
		return (user.profLoss / totalBoughtPrice) * 100;
	};

	return (
		<RootStyle theme={theme}>
			<Box sx={{ display: "flex", alignItems: "center" }}>
				{/* on small screens(phones), this item takes up 5 units. On medium-sized screens(tablets), take up 8 units. If an item is too large, it will go to the next line. */}
				<Box sx={{ flex: 7 }}>
					<Box
						sx={{
							display: "flex",
							alignItems: hiddenDown ? "flex-start" : "center",
							flexDirection: hiddenDown ? "column" : "row",
						}}
					>
						<Box>
							<Typography
								variant={hiddenDown ? "h6" : "h5"}
								sx={{ marginLeft: 2, color: "#282357" }}
							>
								Total Porfolio value
							</Typography>
						</Box>

						<Box
							sx={{
								padding: 1.2,
								borderRadius: 3.5,
								marginLeft: 2,
								backgroundColor: calcPercent() < 0 ? "#F74769" : "#0EC477",
								fontSize: 14,
								color: "white",
								fontWeight: 600,
							}}
						>
							{calcPercent().toFixed(2)} %
						</Box>
					</Box>
				</Box>
				<Box
					sx={{
						flex: 4,
						display: "flex",
						flexDirection: "column",
						alignItems: "flex-end",
					}}
				>
					<Typography
						variant={hiddenDown ? null : "h6"}
						sx={{ float: "right", marginRight: 3 }}
					>
						{user.totalPortfolioValue.toFixed(2)} {currency.toUpperCase()}
					</Typography>
				</Box>
			</Box>

			<Box sx={{ paddingLeft: 0, paddingRight: 2, paddingTop: 1 }}>
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
