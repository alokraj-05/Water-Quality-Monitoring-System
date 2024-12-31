import React, { createContext, useContext, useEffect, useState } from "react";
import { useNavigate, useParams, Link } from "react-router-dom";
import AuthContext from "../../context/AuthContext";
import {
  BiSolidErrorCircle,
  BiSolidLayout,
  BiSolidMeteor,
  BiSolidGroup,
} from "react-icons/bi";
import about from "./about";
import axios from "axios";
import { useSwipeable } from "react-swipeable";
import pfp_1 from "../../assets/pfp1.jpg";
import pfp_2 from "../../assets/pfp2.jpeg";
import pfp_3 from "../../assets/pfp3.jpg";
import pfp_4 from "../../assets/pfp4.jpg";
import pfp_5 from "../../assets/pfp5.jpg";
import pfp_6 from "../../assets/pfp6.jpg";

const profiles = [
  {
    id: 1,
    image: pfp_1,
    name: "Alok Raj",
    rollNo: "20231CSN0004",
    description:
      "Software and programming includes web design, dashbaord and RESTful APIs handling for SMS and Email support.",
  },
  {
    id: 2,
    image: "image_jgpeg",
    name: "Ganavi S K",
    rollNo: "20231CSI0049",
    description:
      "Hardware and connection includes raspberry pi wire connection with other components.",
  },
  {
    id: 3,
    image: pfp_3,
    name: "Anand P K",
    rollNo: "20231CSI0029",
    description:
      "Hardware and connection includes raspberry pi wire connection with other components.",
  },
  {
    id: 4,
    image: pfp_4,
    name: "V Sharan",
    rollNo: "20231CSN0023",
    description:
      "Raspberry python programming for sensors (program to fetch or get the values from sensors with timestamp).",
  },
  {
    id: 5,
    image: pfp_5,
    name: "Sachin Jakanur",
    rollNo: "20231CSN0022",
    description:
      "Raspberry python programming for sensors. (program to fetch or get the values from sensors with timestamp).",
  },
  {
    id: 6,
    image: pfp_6,
    name: "Monsih M K",
    rollNo: "20231ECE0083",
    description: "Hardware and components countribution.",
  },
];

const calculateStats = (values) => {
  const mean = values.reduce((sum, val) => sum + val, 0) / values.length;
  const sorted = [...values].sort((a, b) => a - b);
  const median =
    sorted.length % 2 === 0
      ? (sorted[sorted.length / 2 - 1] + sorted[sorted.length / 2]) / 2
      : sorted[Math.floor(sorted.length / 2)];
  const variance =
    values.reduce((sum, val) => sum + Math.pow(val - mean, 2), 0) /
    values.length;
  return { mean, median, variance };
};
const Hero = () => {
  // const [graphSrc, setGraphSrc] = useState(null);
  // const navigate = useNavigate();
  // const { type = "plot", param = "ph" } = useParams();
  // const graphType = type || "plot";
  // const graphParam = param || "ph";

  // useEffect(() => {
  //   const fetchGrpah = async () => {
  //     try {
  //       const response = await axios.post(
  //         `/generate-graph/${graphType}`,
  //         {
  //           timestamp: ["2024-11-23", "2024-11-22", "2024-11-22"],
  //           ph: [7.2, 6.9, 7.0],
  //           turbidity: [3.4, 3.8, 3.5],
  //         },
  //         { responseType: "blob" }
  //       );
  //       const url = URL.createObjectURL(new Blob([(await response).data]));
  //       setGraphSrc(url);
  //     } catch (error) {
  //       console.error("Error fetching the grpah", error);
  //     }
  //   };
  //   fetchGrpah();
  // }, [graphType, graphParam]);
  // const handleNavigation = (newType, newParam) => {
  //   navigate(`/${newType}/${newParam}`);
  // };
  const [currentIndex, setCurrentIndex] = useState(0);
  const { user } = useContext(AuthContext);
  // Handlers for swipe actions
  const handlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length),
    onSwipedRight: () =>
      setCurrentIndex((prevIndex) =>
        prevIndex === 0 ? profiles.length - 1 : prevIndex - 1
      ),
  });

  // Automatic sliding
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % profiles.length);
    }, 10000); // 10 seconds

    return () => clearInterval(interval);
  }, []);
  return (
    <div className="w-full text-white pt-28 px-80 bg-gradient-to-bl from-gray-950 via-60% via-gray-900 to-gray-950">
      {/* NAV BAR */}
      <div className="w-full h-32 flex justify-between items-start pt-3  fixed top-0 left-0 bg-gradient-to-b from-20% from-gray-900 to-transparent px-20">
        <div className="text-white font-syne font-bold text-lg">IPR-64</div>
        <nav className="h-12 rounded-full px-4 flex gap-6 bg-gradient-to-tr from-gray-950 via-10% via-sky-900/65 to-gray-950 items-center text-cyan-50 font-poppins border-t border-l-2 border-sky-900 border-r text-xl">
          <a
            href="#"
            className="flex items-center gap-1 transition duration-100 hover:text-sky-300"
          >
            <BiSolidErrorCircle />
          </a>
          <a href="#group" className="flex items-center gap-1">
            <BiSolidGroup />
          </a>
          <Link
            to={"/dashboard"}
            className="flex items-center gap-1 bg-gray-200/10 p-1 rounded-md"
          >
            <BiSolidLayout />{" "}
            <span className="text-sm text-gray-300">Dashboard</span>
          </Link>
        </nav>
        {user ? (
          <div className="">Welcome, {user}</div>
        ) : (
          <div className="text-white bg-gray-300/10 rounded-xl flex text-xs font-poppins">
            <Link to={"/login"} className="px-3 py-2">
              login
            </Link>{" "}
            <hr />{" "}
            <Link to={"/signup"} className="bg-black/20 px-3 py-2 rounded-xl">
              signup
            </Link>
          </div>
        )}
      </div>

      {/* NAV BAR END */}

      {/* About */}
      <div className=" w-full bg-gradient-to-br from-gray-800/50 via-30% via-sky-800/20 to-90% to-gray-900 rounded-xl border-t border-white/30 mb-10">
        <div id="about" className="w-full p-5">
          <div className="flex justify-between items-center mb-10">
            <h3 className="font-syne text-2xl font-bold flex items-center">
              ABOUT{" "}
              <p className="text-sm text-sky-100/55 ml-2 font-poppins font-normal">
                - About the project
              </p>
            </h3>
            <p className="text-2xl text-white/55">
              <BiSolidErrorCircle />
            </p>
          </div>
          <div id="about-description">
            {about.map((msg) => (
              <div className="" key={msg.id}>
                <a href="#" className="text-xl font-bold font-syne">
                  {msg.name}{" "}
                  <span className="text-xs font-poppins font-normal py-1 px-2 bg-sky-400/15 rounded-full text-sky-300">
                    know more
                  </span>
                </a>
                <p className="pt-1 pb-8 font-poppins text-white/70">
                  {msg.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* About End */}

      {/* Group */}
      <div
        className="flex flex-col items-center justify-center space-y-4 mt-20 w-full"
        id="group"
      >
        <div className="w-full flex flex-col bg-gradient-to-br from-gray-800/50 via-30% via-sky-800/20 to-90% to-gray-900 rounded-xl border-t border-white/30 p-5">
          <div id="group" className="pb-5">
            <div className="flex items-center gap-2">
              <h3 className="font-syne text-3xl font-bold text-white">Group</h3>
              <span className="text-gray-300 font-bold text-lg font-syne">
                - IPR 64
              </span>
            </div>
          </div>
          <section className="w-full flex items-center justify-center flex-col gap-2 mt-2">
            <div
              {...handlers}
              className="w-2/3 h-56 bg-white/25 shadow-md rounded-lg overflow-hidden"
            >
              <div className="flex items-center h-full">
                <img
                  src={profiles[currentIndex].image}
                  alt={profiles[currentIndex].name}
                  className="w-1/3 h-full object-cover"
                />
                <div className="p-4 w-2/3">
                  <h2 className="text-lg font-semibold text-white">
                    {profiles[currentIndex].name}
                  </h2>
                  <p className="text-gray-200 text-xs">
                    {profiles[currentIndex].rollNo}
                  </p>
                  <p className="text-gray-200">
                    {profiles[currentIndex].description}
                  </p>
                </div>
              </div>
            </div>

            {/* Dot Indicators */}
            <div className="flex space-x-2">
              {profiles.map((_, index) => (
                <button
                  key={index}
                  onClick={() => setCurrentIndex(index)}
                  className={`w-3 h-3 rounded-full ${
                    index === currentIndex
                      ? "bg-sky-500/50"
                      : "bg-gray-300 hover:bg-gray-500"
                  }`}
                ></button>
              ))}
            </div>
            <div className="">
              <p>
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Nulla
                autem mollitia dolorum recusandae, consectetur quia animi esse!
                Incidunt reprehenderit eum quidem ad expedita earum, iure nihil
                consequuntur, labore explicabo consectetur.
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Hero;
