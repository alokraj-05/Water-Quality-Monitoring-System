const about = [
  {
    id: 1,
    name: "Overview",
    description:
      "The Water Quality Monitoring System Using Raspberry Pi is an innovative project designed to monitor and analyse key water quality parameters, specifically pH and turbidity, which are critical indicators of water health. This system integrates Internet of Things (IoT) technology, real-time data visualization, and automation to provide an efficient, scalable solution for water quality management. By leveraging a combination of hardware and software, the system ensures a seamless flow of data from collection to analysis, enabling timely alerts and informed decision-making.",
  },
  {
    id: 2,
    name: "Problem Statement",
    description:
      "Monitoring water quality is vital for a public health, agriculture, and environmental protection. Current methods are epxensive, time-consuming,a nd rely on manual sampling and lab analysis, which causes delays in detecting pollution.",
  },
  {
    id: 3,
    name: "Gap in Remote Areas",
    description:
      "Remote or resource-limited regions face challenges in implementing efficient water quality monitoring due to cost and accessibility issues.",
  },
  {
    id: 4,
    name: "Key Feature",
    description:
      "The system utilizes Raspberry Pi as the central device to interface with pH and turbidity sensors. Sensor data is captured through a Python-based program running on the Raspberry Pi. This program processes the raw data, organizes it into a structured JSON file format, and posts it to an API for accessibility. The use of Python with Flask facilitates lightweight yet robust data handling and ensures compatibility with the web ecosystem.",
  },
];

export default about;
