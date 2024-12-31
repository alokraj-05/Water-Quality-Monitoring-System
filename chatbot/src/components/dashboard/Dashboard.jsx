import React, { useEffect, useState } from "react";
import { Bar, Scatter } from "react-chartjs-2";
// import values from "./values.json";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  BarElement,
  Tooltip,
} from "chart.js";
import axios from "axios";
import { Link } from "react-router-dom";
ChartJS.register(CategoryScale, LinearScale, PointElement, BarElement, Tooltip);

const calculateMean = (values) => {
  if (!values.length) return 0;
  const sum = values.reduce((a, b) => a + b, 0);
  return (sum / values.length).toFixed(2);
};

const calculateMedian = (values) => {
  if (!values.length) return 0;
  const sorted = [...values].sort((a, b) => a - b);
  const mid = Math.floor(sorted.length / 2);
  return sorted.length % 2 !== 0
    ? sorted[mid]
    : ((sorted[mid - 1] + sorted[mid]) / 2).toFixed(2);
};

const calculateVariance = (values) => {
  if (!values.length) return 0;
  const mean = calculateMean(values);
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;
  return variance.toFixed(2);
};
const DashBoard = () => {
  const [selectedGraph, setSelectedGraph] = useState("ph");
  const [graphData, setGraphData] = useState({
    ph: { labels: [], data: [] },
    turbidity: { labels: [], data: [] },
  });
  const [scatterData, setScatterData] = useState({ datasets: [] });
  const [stats, setStats] = useState({ mean: 0, median: 0, variance: 0 });
  async function fetchData() {
    try {
      const res = await axios.get("http://192.168.51.24:5000/data/sensor_data");
      const { pH_value, turbidity_value, timestamp } = res.data;
      await axios.post("http://localhost:5000/update-values", {
        pH_value,
        turbidity_value,
        timestamp,
      });
      console.log("Data successfully sent to backend");
    } catch (error) {
      console.log(error);
    }
  }
  useEffect(() => {
    fetchData();
    const interval = setInterval(fetchData, 30000);
    return () => clearInterval(interval);
  }, []);
  async function fetchSensorData() {
    try {
      const response = await axios.post(`http://localhost:5000/sens-data`);
      const res = response.data[0];
      console.log(res.turbidity);
      setGraphData((prevState) => ({
        ...prevState,
        ph: {
          labels: res.timestamp,
          data: res.pH,
        },
        turbidity: {
          labels: res.timestamp,
          data: res.turbidity,
        },
      }));

      const scatterPoints = res.pH.map((pHValue, index) => ({
        x: pHValue,
        y: res.turbidity[index],
      }));

      setScatterData({
        datasets: [
          {
            label: "pH vs Turbidity",
            data: scatterPoints,
            backgroundColor: "#4ade80",
          },
        ],
      });
      const selectedData = res[selectedGraph === "ph" ? "pH" : "turbidity"];
      setStats({
        mean: calculateMean(selectedData),
        median: calculateMedian(selectedData),
        variance: calculateVariance(selectedData),
      });
    } catch (error) {
      console.error("Error fetching sensor data:", error);
    }
  }

  useEffect(() => {
    fetchSensorData();
    const interval = setInterval(fetchSensorData, 30000);
    return () => clearInterval(interval);
  }, [selectedGraph]);

  const handleGraphChange = (event) => {
    setSelectedGraph(event.target.value);
  };
  const renderGraph = () => {
    switch (selectedGraph) {
      case "ph":
        return (
          <Bar
            data={{
              labels: graphData.ph.labels,
              datasets: [
                {
                  label: "pH Levels",
                  data: graphData.ph.data,
                  backgroundColor: "#107877",
                },
              ],
            }}
          />
        );
      case "turbidity":
        return (
          <Bar
            data={{
              labels: graphData.turbidity.labels,
              datasets: [
                {
                  label: "Turbidity Levels",
                  data: graphData.turbidity.data,
                  backgroundColor: "#107877",
                },
              ],
            }}
          />
        );
      case "ph-vs-turbidity":
        return <Scatter data={scatterData} />;
      default:
        return <p>No graph selected</p>;
    }
  };
  return (
    <div className="min-h-screen bg-gray-900 text-gray-100">
      <header className="py-6 px-10 bg-gray-800 flex justify-between">
        <h1 className="text-2xl font-bold font-syne">
          Dashboard-{" "}
          <span className="text-gray-500 text-lg">
            Water Quality Monitoring System
          </span>
        </h1>
        <Link
          to={"/"}
          className="bg-gray-500/20 p-2 rounded-full font-poppins text-sm"
        >
          HOME
        </Link>
      </header>

      <div className="w-1/4 px-10">
        <label
          htmlFor="graph"
          className="block text-sm font-medium text-gray-400 mb-2"
        ></label>
        <select
          id="graph"
          className="w-full bg-gray-800"
          value={selectedGraph}
          onChange={handleGraphChange}
        >
          <option value="ph">ph</option>
          <option value="turbidity">Turbidity</option>
          <option value="ph-vs-turbidity">ph vs Turbidity</option>
        </select>
      </div>
      <main className="p-6 grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Bar Graph Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">
            Graph: {selectedGraph.replace("_", " ").toUpperCase()}
          </h2>
          {renderGraph()}
        </div>

        {/* Scatter Plot Section */}
        <div className="bg-gray-800 p-4 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Graph: pH vs Turbidity</h2>
          <Scatter data={scatterData} />
        </div>

        {/* Statistics Section */}
        <div className="bg-gray-800 p-4 grid rounded-lg shadow-md md:col-span-2 col-span-3">
          <h2 className="text-xl font-semibold mb-4">Statistics</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            <div className="text-center">
              <p className="text-lg font-bold"> {stats.mean}</p>
              <p className="text-sm text-gray-400">Mean</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{stats.median}</p>
              <p className="text-sm text-gray-400">Median</p>
            </div>
            <div className="text-center">
              <p className="text-lg font-bold">{stats.variance}</p>
              <p className="text-sm text-gray-400">Variance</p>
            </div>
          </div>
        </div>
        {selectedGraph === "ph" && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Water Quality Insights
            </h3>
            {stats.mean < 7 ? (
              <>
                <p>
                  pH levels below 7 indicate that the water is acidic in nature.
                </p>
                <p>
                  Possible Causes: Industrial discharge, acid rain, or organic
                  decay.
                </p>
              </>
            ) : (
              <p>
                pH levels are neutral or alkaline, indicating balanced water
                quality.
              </p>
            )}
          </div>
        )}
        {selectedGraph === "turbidity" && (
          <div className="mt-4 p-4 bg-gray-700 rounded-lg">
            <h3 className="text-lg font-semibold mb-2">
              Water Quality Insights
            </h3>
            {stats.mean > 5 ? (
              <>
                <p>
                  High turbidity levels indicate cloudy water, which may suggest
                  contamination.
                </p>
                <p>
                  Possible Causes: Sediment runoff, wastewater discharge, or
                  algae growth.
                </p>
              </>
            ) : (
              <p>
                Turbidity levels are within safe limits, indicating clear water.
              </p>
            )}
          </div>
        )}
        <div className="w-full flex-initial flex-col mt-4 "></div>
      </main>
    </div>
  );
};

export default DashBoard;
