



import React, { useEffect, useState } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import { FaBars, FaTimes } from "react-icons/fa";
import { Pie } from "react-chartjs-2"; // Import Pie from react-chartjs-2
import LeafletMap from "./Leaflet";
import { Chart as ChartJS } from "chart.js/auto";
import MapButton from "./MapButton";
import ExternalWebsite from "./External";

import { Bar } from "react-chartjs-2";
import { Chart, CategoryScale } from "chart.js";
import SimpleMap from "./Map";
const AppContainer = styled.div`
  font-family: "Arial", sans-serif;
  color: #fff;
  background-color: #000000; /* Set background color to black */
  height: 100vh;
  margin: 0;
  overflow: hidden;
  display: flex;
`;

const Sidebar = styled.div`
  position: fixed;
  top: 0;
  left: ${({ isOpen }) => (isOpen ? "0" : "-400px")};
  bottom: 0;
  width: 200px;
  background-color: #004080; /* Updated background color to a darker shade of blue */
  padding: 20px;
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #fff;
  transition: left 0.3s ease;
`;

const SidebarItem = styled(Link)`
  color: #fff;
  text-decoration: none;
  margin-bottom: 10px;
  padding: 8px 16px;
  border-radius: 5px;
  &:hover {
    background-color: #0056b3;
  }
`;

const MenuBarButton = styled.button`
  position: absolute;
  top: 20px;
  left: 20px;
  font-size: 20px;
  color: #fff;
  background-color: #004080; /* Updated background color to match the sidebar */
  padding: 5px 10px;
  border-radius: 5px;
  border: none;
  cursor: pointer;
`;

const ContentContainer = styled.div`
  padding: 20px;
  color: #000;
  margin-bottom: 40px;
  background-color: #002641;; /* Set background color to black */
`;

const DashboardContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  color: #000000;
`;
const FormAndChartContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
`;

const TotalCountsContainer = styled.div`
  display: flex;
  flex-direction: column; /* Change the direction to column */
  align-items: center;
  margin-bottom: 20px;
`;

const TotalCountBox = styled.div`
  border-radius: 8px;
  padding: 20px;
  text-align: center;
  margin-bottom: 10px; /* Add margin bottom for spacing */
  width: 80%; /* Set a width to center the box */
  background-color: #002641;
`;

const TotalCountText = styled.p`
  margin: 5px 0;
  color: #fff;
  font-size: 24px;
  font-weight: bold;
`;
const DashboardTitle = styled.h1`
  font-size: 40px;
  color: #fff; /* White text color */
`;
const FormContainer = styled.form`
  flex: 1 0 48%; /* Adjust the width as needed */
  max-width: 400px;
  background-color: #002641;
  padding: 20px;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  border: 2px solid #ffffff; /* Set border color */
  display: flex; /* Use flexbox to center the form horizontally */
  flex-direction: column;
  align-items: center; /* Center items horizontally */
  margin-bottom: 0px;
`;


const InputField = styled.input`
  padding: 7px;
  margin-bottom: 15px;
  border: 1px solid #ccc;
  border-radius: 5px;
  width: 100%;
  font-size: 16px;
  display: block;
  margin-left: auto;
  margin-right: 20px; /* Adjust the margin-right value as needed */
`;

const SubmitButton = styled.button`
  padding: 10px 20px;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 18px;
  cursor: pointer;
  border-radius: 5px;
  transition: background-color 0.3s ease; /* Add smooth transition effect */

  &:hover {
    background-color: #0056b3; /* Change color on hover */
  }
`;

const FormAndTableContainer = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 20px;
  color: #000000;
`;
const TableContainer = styled.div`
  flex: 1 0 100%;
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;
  overflow-x: auto;
  margin-top: 20px;
  color: #fff; /* Set font color to white */
  background-color: #002641; /* Set background color to #004080 */
`;

const TableHeader = styled.th`
  border: 1px solid #ccc;
  padding: 10px;
  background-color: #f2f2f2;
  font-weight: bold;
  background-color: #002641; /* Set background color to #004080 */
`;

const TableCell = styled.td`
  border: 1px solid #ccc;
  padding: 10px;
  color: #fff; /* Set font color to white */
`;




const ChartWrapper = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-top: 20px;
  height: 400px;
  gap: 20px;
`;
const ChartContainer = styled.div`
  width: 100%;
  height: 600px; /* Adjust the height as needed */
  padding: 20px;
  overflow: auto;
  background-color: transparent;
  border-radius: 8px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #002641;

  @media (max-width: 1440px) {
    height: 400px;
  }
`;


const ChartColumn = styled.div`
  width: 100%;
  height: 600px; /* Adjust the height as needed */
  overflow: auto;
  background-color: transparent;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #002641;

  @media (max-width: 1440px) {
    height: 400px;
  }
`;

const MapColumn = styled.div`
  width: 70%;
  height: 400px; /* Adjust the height as needed */
  overflow: auto;
  background-color: transparent;
  padding: 10px;
  border-radius: 16px;
  box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
  background-color: #002641;

  @media (max-width: 1440px) {
    width: 60%;
  }
`;
const TablePagination = styled.div`
  display: flex;
  justify-content: center;
  margin-top: 20px;
  padding-bottom: 20px;
`;

const PaginationButton = styled.button`
  padding: 5px 10px;
  background-color: #007bff;
  color: #fff;
  border: none;
  font-size: 14px;
  cursor: pointer;
  border-radius: 5px;
  margin: 0 5px;
`;

const ViewButtonsContainer = styled.div`
  display: flex;
  justify-content: space-around;
  margin-top: 20px;
`;

const ViewButton = styled.button`
  padding: 10px 20px;
  border: none;
  background-color: #007bff;
  color: #fff;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #0056b3;
  }

  &.active {
    background-color: #0056b3;
  }
`;

const ITEMS_PER_PAGE = 5;
const Dashboard = () => {
  const [ownerName, setOwnerName] = useState("");
  const [address, setAddress] = useState("");
  const [phoneNo, setPhoneNo] = useState(""); // Changed from houseNo to phoneNo
  const [numberOfPersons, setNumberOfPersons] = useState("");
  const [lastDesludging, setLastDesludging] = useState("");
  const [tableData, setTableData] = useState([]);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [activeView, setActiveView] = useState("table"); // Default to showing the table
 const [lat, setLat] = useState("");
 const [long, setLong] = useState("");
const [markersList, setMarkersList] = useState([]);

  const [currentPage, setCurrentPage] = useState(1);

  const [searchQuery, setSearchQuery] = useState("");
  const [filteredData, setFilteredData] = useState([]);

  // ... (other calculations and functions)

  // Calculate the total number of pages

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;
  const endIndex = startIndex + ITEMS_PER_PAGE;
  const visibleTableData = tableData.slice(startIndex, endIndex);
  const totalPages = Math.ceil(tableData.length / ITEMS_PER_PAGE);

  const totalUsers = tableData.length; // Total number of users
  const totalHighPriority = tableData.filter(
    (row) => row.Status === "High Priority"
  ).length;
  const totalSlightPriority = tableData.filter(
    (row) => row.Status === "Slight Priority"
  ).length;
  const totalLeastPriority = tableData.filter(
    (row) => row.Status === "Least Priority"
  ).length;

  // Calculate the starting and ending indices for the current page

  const highPriorityCount = tableData.filter(
    (row) => row.Status === "High Priority"
  ).length;
  const slightPriorityCount = tableData.filter(
    (row) => row.Status === "Slight Priority"
  ).length;
  const leastPriorityCount = tableData.filter(
    (row) => row.Status === "Least Priority"
  ).length;

  // Prepare data for the pie chart
  const pieChartData = {
    labels: ["High Priority", "Slight Priority", "Least Priority"],
    datasets: [
      {
        data: [highPriorityCount, slightPriorityCount, leastPriorityCount],
        backgroundColor: ["#ff0000", "#ff9900", "#00cc00"], // You can change colors as desired
        hoverBackgroundColor: ["#cc0000", "#cc6600", "#008000"],
      },
    ],
  };

  const [chartData, setChartData] = useState({
    labels: [],
    datasets: [
      {
        label: "Accumulated Sludge Volume",
        backgroundColor: "#007bff",
        borderColor: "#007bff",
        borderWidth: 1,
        hoverBackgroundColor: "#0056b3",
        hoverBorderColor: "#0056b3",
        data: [], // Update this data array to hold accumulated sludge volume values
      },
      {
        label: "Upcoming Sludge Date",
        backgroundColor: "#00cc00", // Choose a different color
        borderColor: "#00cc00",
        borderWidth: 1,
        hoverBackgroundColor: "#008000", // Choose a different hover color
        hoverBorderColor: "#008000",
        data: [], // Update this data array to hold upcoming sludge date values
      },
    ],
  });

  const handleDownloadCSV = () => {
    // Prepare the CSV content
    let csvContent =
      "Owner Name,Address,Phone No.,Number of Persons,Last Desludging,Wastewater Flow,Accumulated Sludge Volume,Upcoming Sludging Date\n";
    tableData.forEach((row) => {
      csvContent += `"${row.OwnerName}","${row.Address}","${row.PhoneNo}","${
        row.Persons
      }","${row.LastDesludging}","${row.WasteWaterFlow}","${
        row.AccumulatedSludgeVolume
      }","${
        row.UpcomingSludgingDate ? row.UpcomingSludgingDate.toString() : "N/A"
      }"\n`;
    });

    // Create a Blob object for the CSV data
    const blob = new Blob([csvContent], { type: "text/csv;charset=utf-8;" });

    // Create a temporary URL for the Blob
    const url = URL.createObjectURL(blob);

    // Create a hidden anchor element to trigger the download
    const downloadLink = document.createElement("a");
    downloadLink.href = url;
    downloadLink.setAttribute("download", "dashboard_data.csv");
    document.body.appendChild(downloadLink);

    // Programmatically click the link to trigger the download
    downloadLink.click();

    // Clean up by removing the temporary URL and anchor element
    URL.revokeObjectURL(url);
    document.body.removeChild(downloadLink);
  };

  const handleLogout = () => {
    // Add any logout logic here if needed
    // Redirect to the login page after logout
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    setChartData((prevChartData) => {
      const newLabels = prevChartData.labels.concat(ownerName);
      const newAccumulatedSludgeVolumeData =
        prevChartData.datasets[0].data.concat(accumulatedSludgeVolume);
      const newUpcomingSludgeDateData =
        prevChartData.datasets[1].data.concat(upcomingSludgingDate);

      return {
        ...prevChartData,
        labels: newLabels,
        datasets: [
          {
            ...prevChartData.datasets[0],
            data: newAccumulatedSludgeVolumeData,
          },
          {
            ...prevChartData.datasets[1],
            data: newUpcomingSludgeDateData,
          },
        ],
      };
    });

    // Validate phone number format: XXXX-XXXXXXX
    const phoneNoRegex = /^\d{4}-\d{7}$/;
    if (!phoneNo.match(phoneNoRegex)) {
      alert("Please enter a valid phone number in the format XXXX-XXXXXXX");
      return;
    }

    // Calculate the Wastewaterflow value using the formula (80 liters * number of persons)
    const wastewaterFlow = 80 * parseInt(numberOfPersons, 10);

    // Calculate the Accumulated Sludge Volume using the formula (30 liters * number of persons * 2)
    const accumulatedSludgeVolume = 30 * parseInt(numberOfPersons, 10) * 2;

    // Calculate the Upcoming Sludging Date as the current lastDesludging date + 2 years
    const today = new Date();
    const lastDesludgingDate = new Date(lastDesludging);
    const upcomingSludgingDate = new Date(
      lastDesludgingDate.getFullYear() + 2,
      lastDesludgingDate.getMonth(),
      lastDesludgingDate.getDate()
    );

    let status = "";
    const sixMonthsFromNow = new Date(
      today.getFullYear(),
      today.getMonth() + 6,
      today.getDate()
    );
    const oneYearFromNow = new Date(
      today.getFullYear() + 1,
      today.getMonth(),
      today.getDate()
    );

    if (upcomingSludgingDate <= sixMonthsFromNow) {
      status = "High Priority";
    } else if (upcomingSludgingDate <= oneYearFromNow) {
      status = "Slight Priority";
    } else {
      status = "Least Priority";
    }

    const newRow = {
      OwnerName: ownerName,
      Address: address,
      Contact: phoneNo,
      Persons: numberOfPersons,
      LastDesludging: lastDesludging,
      WasteWaterFlow: wastewaterFlow,
      AccumulatedSludgeVolume: accumulatedSludgeVolume,
      UpcomingSludgingDate: upcomingSludgingDate,
      Status: status,
  lat: lat,
      long: long,

    };
setMarkersList((prevDetails) => {
      const newDetails = [...prevDetails];
      newDetails.push({
        position: [parseFloat(lat), parseFloat(long)],
        text: `${ownerName}'s Upcoming Sludging Date: ${upcomingSludgingDate}`,
      });
      return newDetails
    });
    const res = await fetch("http://localhost:5000/post-data", {
      method: "POST",
      headers: {
        "Content-type": "application/json",
      },
      body: JSON.stringify(newRow),
    });
    const response = await res.json();
    console.log(response);
    // setTableData((prevData) => [...prevData, newRow]);

    // Clear form fields after submission
    setOwnerName("");
    setAddress("");
    setPhoneNo("");
    setNumberOfPersons("");
    setLastDesludging("");
    fetchData();
  };

  function showDate(upcomingSludgingDate) {
    const date = new Date(upcomingSludgingDate);
    const options = {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
      timeZoneName: "short",
    };
    return date.toLocaleString("en-US", options);
  }

 const fetchData = async () => {
    const res = await fetch("http://localhost:5000/get-data");
    const response = await res.json();
    setTableData(response.data);
    const coordinates = [];
    response.data.map((item) => {
      coordinates.push({
        position: [parseFloat(item.lat), parseFloat(item.long)],
        text: `${item.OwnerName}'s Upcoming Sludging Date: ${item.UpcomingSludgingDate}`,
      });
    });

    setMarkersList(coordinates);
    console.log("response: ", response);
  };
  useEffect(() => {
    fetchData();
  }, []);


  const handleMenuButtonClick = () => {
    setIsSidebarOpen((prevIsSidebarOpen) => !prevIsSidebarOpen);
  }; // Define the handleMenuButtonClick function here

  const barChartData = {
    labels: tableData.map((row) => row.OwnerName),
    datasets: [
      {
        label: "Accumulated Sludge Volume",
        backgroundColor: "#007bff",
        borderColor: "#007bff",
        borderWidth: 1,
        hoverBackgroundColor: "#0056b3",
        hoverBorderColor: "#0056b3",
        data: tableData.map((row) => row.AccumulatedSludgeVolume),
      },
    ],
  };

  // Options for the chart
  const chartOptions = {
    maintainAspectRatio: false,
    responsive: true,
    scales: {
      x: {
        beginAtZero: true,
        title: {
          display: true,

          color: "#fff", // Label color
          font: {
            size: 16, // Label font size
            weight: "bold", // Label font weight
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Set the gridline color
        },
        ticks: {
          color: "#fff", // Set the tick color
        },
      },
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: "Value", // Y-axis label
          color: "#fff", // Label color
          font: {
            size: 16, // Label font size
            weight: "bold", // Label font weight
          },
        },
        grid: {
          color: "rgba(0, 0, 0, 0.1)", // Set the gridline color
        },
        ticks: {
          color: "#fff", // Set the tick color
        },
      },
    },
    plugins: {
      legend: {
        display: false,
        color: "#fff",
        // If you don't want to display legend
      },
    },
    elements: {
      point: {
        radius: 0, // If you don't want to display data points
      },
    },
    backgroundColor: "white", // Set the background color of the chart
  };

  return (
    <>
      <Sidebar isOpen={isSidebarOpen}>
        {/* Add your sidebar menu items here */}
        <SidebarItem to="/dashboard">Dashboard</SidebarItem>


        <MapButton />
        
        <SidebarItem to="/">Logout</SidebarItem>

        {/* Add more menu items as needed */}
      </Sidebar>
      <MenuBarButton onClick={handleMenuButtonClick}>
        {isSidebarOpen ? <FaTimes /> : <FaBars />}
      </MenuBarButton>

      <ContentContainer>
        <DashboardContainer>
          <DashboardTitle>
            Optimizing Faecal Sludge Collection and Resource Recovery through
            RDF
          </DashboardTitle>

      



          <FormAndTableContainer>
            <FormContainer>
              <InputField
                type="text"
                placeholder="Owner Name"
                value={ownerName}
                onChange={(e) => setOwnerName(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Address"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Phone No. (Format: XXXX-XXXXXXX)"
                value={phoneNo}
                onChange={(e) => setPhoneNo(e.target.value)}
              />
              <InputField
                type="number"
                placeholder="Number of Persons"
                value={numberOfPersons}
                onChange={(e) => setNumberOfPersons(e.target.value)}
              />
              <InputField
                type="date"
                placeholder="Last Desludging"
                value={lastDesludging}
                onChange={(e) => setLastDesludging(e.target.value)}
              />
 <InputField
                type="text"
                placeholder="Latitude"
                value={lat}
                onChange={(e) => setLat(e.target.value)}
              />
              <InputField
                type="text"
                placeholder="Longitude"
                value={long}
                onChange={(e) => setLong(e.target.value)}
              />
              {/* ... (other form input fields) */}
              <SubmitButton onClick={handleSubmit}>Submit</SubmitButton>
            </FormContainer>
            <TotalCountsContainer>
  <TotalCountBox isFirst>
    <TotalCountText >Total Users: {totalUsers}</TotalCountText>
  </TotalCountBox>
  <TotalCountBox>
    <TotalCountText>Total High Priority: {totalHighPriority}</TotalCountText>
  </TotalCountBox>
  <TotalCountBox>
    <TotalCountText>Total Slight Priority: {totalSlightPriority}</TotalCountText>
  </TotalCountBox>
  <TotalCountBox>
    <TotalCountText>Total Least Priority: {totalLeastPriority}</TotalCountText>
  </TotalCountBox>
</TotalCountsContainer>
            <MapColumn>
                            <SimpleMap markers={markersList}></SimpleMap>

            </MapColumn>
            <ViewButtonsContainer>
              <ViewButton
                onClick={() => setActiveView("table")}
                className={activeView === "table" ? "active" : ""}
              >
                View Table
              </ViewButton>
              <ViewButton
                onClick={() => setActiveView("barChart")}
                className={activeView === "barChart" ? "active" : ""}
              >
                View Bar Chart
              </ViewButton>
              <ViewButton
                onClick={() => setActiveView("pieChart")}
                className={activeView === "pieChart" ? "active" : ""}
              >
                View Pie Chart
              </ViewButton>
            </ViewButtonsContainer>
            {activeView === "table" && (
              <TableContainer>
                <Table>
                  <thead>
                    <tr>
                      <TableHeader>Owner Name</TableHeader>
                      <TableHeader>Address</TableHeader>
                      <TableHeader>Phone No.</TableHeader>
                      <TableHeader>Number of Persons</TableHeader>
                      <TableHeader>Last Desludging</TableHeader>
                      <TableHeader>Wastewater Flow</TableHeader>
                      <TableHeader>Accumulated Sludge Volume</TableHeader>
                      <TableHeader>Upcoming Sludging Date</TableHeader>
                      <TableHeader>Status</TableHeader>
                    </tr>
                  </thead>
                  <tbody>
                    {visibleTableData.map((row, index) => (
                      <tr key={index}>
                        <TableCell>{row.OwnerName}</TableCell>
                        <TableCell>{row.Address}</TableCell>
                        <TableCell>{row.Contact}</TableCell>
                        <TableCell>{row.Persons}</TableCell>
                        <TableCell>{row.LastDesludging}</TableCell>
                        <TableCell>{row.WasteWaterFlow} liters</TableCell>
                        <TableCell>
                          {row.AccumulatedSludgeVolume} liters
                        </TableCell>
                        <TableCell>
                          {row.UpcomingSludgingDate
                            ? showDate(row.UpcomingSludgingDate)
                            : "N/A"}
                        </TableCell>
                        <TableCell>{row.Status}</TableCell>
                      </tr>
                    ))}
                  </tbody>
                </Table>
                {/* Pagination here */}
                <TablePagination>
          {currentPage > 1 && (
            <PaginationButton onClick={() => setCurrentPage(currentPage - 1)}>
              Previous
            </PaginationButton>
          )}
          {Array.from({ length: totalPages }).map((_, index) => (
            <PaginationButton
              key={index}
              onClick={() => setCurrentPage(index + 1)}
              style={{
                backgroundColor:
                  currentPage === index + 1 ? "#0056b3" : "#007bff",
              }}
            >
              {index + 1}
            </PaginationButton>
          ))}
          {currentPage < totalPages && (
            <PaginationButton onClick={() => setCurrentPage(currentPage + 1)}>
              Next
            </PaginationButton>
          )}
        </TablePagination>
                
              </TableContainer>
            )}

            {activeView === "barChart" && (
              <ChartContainer>
                <h2 style={{ color: "#fff" }}>
                  Accumulated Sludge Volume Chart
                </h2>
                <Bar height={600} data={barChartData} options={chartOptions} />
              </ChartContainer>
            )}

            {activeView === "pieChart" && (
            <ChartColumn style={{ color: 'white' }}>
            <h2 style={{ color: 'white' }}>Priority Status Distribution</h2>
            <Pie height={650} data={pieChartData} options={chartOptions} />
          </ChartColumn>
          
            )}
            
          </FormAndTableContainer>
        </DashboardContainer>
      </ContentContainer>
    </>
  );
};

export default Dashboard;






