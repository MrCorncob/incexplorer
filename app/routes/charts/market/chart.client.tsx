import { Button, Divider } from '@mantine/core';
import React, { useEffect, useRef } from "react";


import { priceData } from "~/routes/charts/liquiditytvl/priceData.js";
// import { areaData } from './areaData';
import { volumeData } from "~/routes/charts/liquiditytvl/volumeData.js";

import { createChart, CrosshairMode } from "lightweight-charts";

function Chart() {

    const chartContainerRef = useRef<any>();
    const chart = useRef<any>();
    const resizeObserver = useRef<any>();

    useEffect(() => {
        chart.current = createChart(chartContainerRef.current, {
            width: chartContainerRef.current.clientWidth,
            height: 500, //"300px", //chartContainerRef.current.clientHeight,
            layout: {
                backgroundColor: "#253248",
                textColor: "rgba(255, 255, 255, 0.9)"
            },
            grid: {
                vertLines: {
                    color: "#334158"
                },
                horzLines: {
                    color: "#334158"
                }
            },
            crosshair: {
                mode: CrosshairMode.Normal
            },
            // priceScale: {
            //     borderColor: "#485c7b"
            // },
            timeScale: {
                borderColor: "#485c7b"
            }
        });

        console.log(chart.current);

        const candleSeries = chart.current.addCandlestickSeries({
            upColor: "#4bffb5",
            downColor: "#ff4976",
            borderDownColor: "#ff4976",
            borderUpColor: "#4bffb5",
            wickDownColor: "#838ca1",
            wickUpColor: "#838ca1"
        });

        candleSeries.setData(priceData);

        // const areaSeries = chart.current.addAreaSeries({
        //   topColor: 'rgba(38,198,218, 0.56)',
        //   bottomColor: 'rgba(38,198,218, 0.04)',
        //   lineColor: 'rgba(38,198,218, 1)',
        //   lineWidth: 2
        // });

        // areaSeries.setData(areaData);

        const volumeSeries = chart.current.addHistogramSeries({
            color: "#182233",
            lineWidth: 2,
            priceFormat: {
                type: "volume"
            },
            overlay: true,
            scaleMargins: {
                top: 0.8,
                bottom: 0
            }
        });

        volumeSeries.setData(volumeData);
    }, []);

    // Resize chart on container resizes.
    useEffect(() => {
        resizeObserver.current = new ResizeObserver(entries => {
            const { width, height } = entries[0].contentRect;
            chart.current.applyOptions({ width, height });
            setTimeout(() => {
                chart.current.timeScale().fitContent();
            }, 0);
        });

        resizeObserver.current.observe(chartContainerRef.current);

        return () => resizeObserver.current.disconnect();
    }, []);

    return (
        <>
            <div
                ref={chartContainerRef}
                className="chart-container"
            // style={{ height: "100%" }}
            />
        </>

    );
}

export default Chart;