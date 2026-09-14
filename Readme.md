# 🌤️ Weather Dashboard

A responsive weather dashboard built using **HTML, CSS, and Vanilla JavaScript**. The application uses the **Fetch API** to retrieve real-time weather information and dynamically displays the results on the webpage.

This project was developed as part of **Codveda – Level 1, Task 3: Frontend with HTML, CSS, and JavaScript**.

---

## 📌 Project Overview

The Weather Dashboard allows users to search for a city and view its current weather information.

The application:

* Accepts a city name from the user
* Finds the geographical coordinates of the city
* Fetches current weather information
* Dynamically updates the webpage
* Handles invalid city names and API errors
* Provides a responsive interface for different screen sizes

---

## 🎯 Objectives

This project fulfills the following requirements:

* Build a static website layout using HTML
* Style the website using CSS
* Use JavaScript for application functionality
* Fetch external API data using the Fetch API
* Display API data dynamically
* Implement basic error handling
* Create a responsive webpage

---

## 🛠️ Technologies Used

| Technology     | Purpose                       |
| -------------- | ----------------------------- |
| HTML5          | Webpage structure             |
| CSS3           | Styling and responsive design |
| JavaScript     | Application logic             |
| Fetch API      | HTTP requests                 |
| Open-Meteo API | Weather data                  |
| VS Code        | Development environment       |
| Live Server    | Local development server      |
| Git/GitHub     | Version control               |

---

## 📂 Project Structure

```text
weather-dashboard/
│
├── index.html       # Main webpage structure
├── style.css        # Styling and responsive design
├── script.js        # API integration and application logic
└── README.md        # Project documentation
```

---

## 🏗️ Application Architecture

```text
                    USER
                     │
                     ▼
              ┌─────────────┐
              │  index.html │
              │  User Input │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │  script.js  │
              │ Application  │
              │    Logic     │
              └──────┬──────┘
                     │
                     ▼
             ┌────────────────┐
             │ Fetch API      │
             └───────┬────────┘
                     │
             ┌───────▼────────┐
             │ Open-Meteo API │
             └───────┬────────┘
                     │
                     ▼
              Weather JSON Data
                     │
                     ▼
              ┌─────────────┐
              │  script.js  │
              │ DOM Update  │
              └──────┬──────┘
                     │
                     ▼
              ┌─────────────┐
              │ Weather UI  │
              └─────────────┘
```

---

# ⚙️ How the Application Works

## 1. User enters a city

The user enters a city name into the search field.

Example:

```text
Chennai
```

---

## 2. JavaScript receives the input

The JavaScript code retrieves the value from the input field.

```javascript
const city = cityInput.value.trim();
```

The application also checks whether the input is empty.

---

## 3. Geocoding API Request

The application first sends the city name to the Open-Meteo Geocoding API.

The API returns geographical information such as:

```text
City
Country
Latitude
Longitude
```

---

## 4. Weather API Request

The latitude and longitude are then used to request current weather information.

The application retrieves:

* Temperature
* Humidity
* Wind speed
* Weather condition

---

## 5. Dynamic DOM Update

JavaScript takes the API response and updates the HTML elements dynamically.

For example:

```text
City: Chennai, India
Temperature: 30 °C
Condition: Clear Sky
Humidity: 70 %
Wind Speed: 12 km/h
```

The page does not need to be manually refreshed.

---

# 🔄 Data Flow

```text
City Name
    │
    ▼
Geocoding API
    │
    ▼
Latitude + Longitude
    │
    ▼
Weather API
    │
    ▼
JSON Response
    │
    ▼
JavaScript
    │
    ▼
DOM Manipulation
    │
    ▼
Weather Information
```

---

# 🚀 How to Run the Project

## Prerequisites

You need:

* A web browser such as Chrome or Edge
* Visual Studio Code
* Live Server extension

No backend server or Node.js installation is required for this version.

---

## Step 1: Clone the Repository

If the project is stored on GitHub:

```bash
git clone <YOUR-GITHUB-REPOSITORY-URL>
```

Then enter the project directory:

```bash
cd weather-dashboard
```

---

## Step 2: Open the Project in VS Code

```bash
code .
```

---

## Step 3: Run with Live Server

Open:

```text
index.html
```

Right-click inside the file and select:

```text
Open with Live Server
```

The application will open in your browser.

---

# 🧪 Testing the Application

Try searching for different cities:

```text
Chennai
Bengaluru
Mumbai
Delhi
Hyderabad
London
New York
```

Also test invalid input.

### Empty Input

Expected result:

```text
Please enter a city name.
```

### Invalid City

Expected result:

```text
City not found. Please enter a valid city.
```

---

# ❌ Error Handling

The application handles several possible errors.

### Empty city

```javascript
if (city === "") {
    errorMessage.textContent = "Please enter a city name.";
    return;
}
```

### City not found

The application checks whether the geocoding API returned a valid result.

### API failure

The application uses `try...catch` to handle API or network errors.

```javascript
try {
    // API request
} catch (error) {
    // Error handling
}
```

---

# 📱 Responsive Design

The application uses CSS media queries to provide a better experience on smaller screens.

```css
@media (max-width: 500px) {
    .search-box {
        flex-direction: column;
    }

    button {
        width: 100%;
    }
}
```

The layout adapts to:

* Desktop
* Laptop
* Tablet
* Mobile devices

---

# 🔌 API Used

This project uses **Open-Meteo** for weather and geocoding data.

No API key is required for this implementation.

The application uses two API services:

### Geocoding

Converts:

```text
City Name
```

into:

```text
Latitude + Longitude
```

### Weather Forecast

Uses the coordinates to retrieve current weather information.

---

# 🔐 Security

This frontend project does not require API credentials because the selected weather service does not require an API key for this implementation.

No passwords, authentication tokens, or sensitive user information are stored.

---

# 📈 Future Improvements

Possible future enhancements include:

* 🌡️ 5-day weather forecast
* 🌙 Dark mode
* 📍 Current location detection
* 🌧️ Weather icons
* 📊 Temperature charts
* 🌅 Sunrise and sunset information
* 🔍 Search suggestions
* 🌎 Recent searches
* 📱 Improved mobile UI
* ⚡ Loading animation

---

# 🎓 Learning Outcomes

After completing this project, the following concepts were practiced:

* HTML document structure
* CSS styling
* CSS responsive design
* JavaScript DOM manipulation
* JavaScript event handling
* Async/Await
* Fetch API
* REST API consumption
* JSON data processing
* Error handling
* Dynamic webpage updates
* Basic Git/GitHub workflow

---

# 📄 License

This project was created for educational and internship-task purposes.

---

## 👩‍💻 Author

**Poornima**

Information Science and Engineering Student

**Project:** Weather Dashboard\
