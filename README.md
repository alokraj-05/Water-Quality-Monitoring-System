# Water Quality Monitoring System Using raspberry pi zero 2 W

> Measures the water quality ex: pH, turbidity

## Features

- [x] Plot graphs of recent data
- [x] Data analysis eg. (Mean, varience, mode)
- [ ] Email and sms notifcations for user.

## Components used

1. pH sensor
2. Turbidity sensor
3. Raspberry pi
4. ADS1115

## Program

- **Web development**
  - Frontend
    - reactJs
    - chartJs
    - axios library
  - Backend
    - NodeJs
    - expressJs
  - Database
    - MongoDB
- **Raspberry pi**
  - Python

## Working

- The system utilizes Raspberry Pi as the central device to interface with pH and turbidity sensors. Sensor data is captured through a Python-based program running on the Raspberry Pi. This program processes the raw data, organizes it into a structured JSON file format, and posts it to an API for accessibility. The use of Python with Flask facilitates lightweight yet robust data handling and ensures compatibility with the web ecosystem
- A key feature of the system is its integration of automation to send alerts via email and SMS when water quality parameters breach predefined thresholds. For instance, if the pH level or turbidity rises or falls outside the acceptable range, the system immediately notifies users, enabling quick action to mitigate potential risks. This automation is implemented using robust logic in the backend, ensuring reliability and responsiveness.
  (yet to establish)

## Connections

| Component        | pin  | Desination                  |
| ---------------- | ---- | --------------------------- |
| ADS1115          | VDD  | Raspberry Pi 3.3v (pin1)    |
|                  | GND  | Raspberry pi GND(pin 6)     |
|                  | SDA  | Raspberry pi GPIO 2 (pin 3) |
|                  | SCL  | Raspberry pi GPIO 3 (pin 5) |
|                  | ADDR | GND (default 12c address)   |
|                  | A0   | pH sensor (Po)              |
|                  | A1   | Turbidity Sensor(out)       |
| pH sensor        | V+   | Raspberry pi 3.3v (pin 1)   |
|                  | G    | Raspberry pi GND (pin 6)    |
|                  | Po   | ADS1115 A0                  |
| Turbidity Sensor | VCC  | Raspberry pi 3.3v (pin 6)   |
|                  | GND  | Raspberry pi GND (pin 6)    |
|                  | OUT  | ADS1115 A1                  |
