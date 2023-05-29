import React, { useState } from 'react';
import './AllCases.css';
import Table from './Table'

const AllCases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedTab, setSelectedTab] = useState ("All Cases");
  const [patientQuestionData, setPatientQuestionData] = useState([]);
  const [processedQuestionData, setProcessedQuestionData] = useState([]);
  const [enhancedData, setEnhancedData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [questionTypeData, setQuestionTypeData] = useState([]);
  const [treatmentsData, setTreatmentsData] = useState([]);
  const [diseaseData, setDiseaseData] = useState([]);
  const [allCasesData, setAllCasesData] = useState([]);
  const [caseData, setCaseData] = useState(null);



  const tabNames = [
    "All cases",
    "Patient Questions",
    "Questions Processed",
    "Enhanced",
    "Articles",
    "Patients",
    "Diseases",
    "Questions",
    "Treatments",
  ];

  //FETCH DATA
// Patient Question table

  const fetchPatientQuestionData = () => {
    fetch('http://localhost:5000/api/patient_question')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setPatientQuestionData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };


  // All cases table
  const fetchCaseData = (caseId) => {
    fetch(`http://localhost:5000/api/cases/${caseId}`)
        .then(response => {
          if (!response.ok) {
            throw new Error('Network response was not ok');
          }
          return response.json();
        })
        .then(data => {
          setCaseData(data);
        })
        .catch(error => {
          console.error('Error:', error);
        });
  };
// Processed Question table
  const fetchProcessedQuestionData = () => {
    fetch('http://localhost:5000/api/processed_question')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setProcessedQuestionData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };

// Enhanced table
  const fetchEnhancedData = () => {
    fetch('http://localhost:5000/api/enhanced')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setEnhancedData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };

// Articles table
  const fetchArticlesData = () => {
    fetch('http://localhost:5000/api/articles')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setArticlesData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };

// Patients table
  const fetchPatientsData = () => {
    fetch('http://localhost:5000/api/patient')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setPatientsData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };

// Question Type table
  const fetchQuestionTypeData = () => {
    fetch('http://localhost:5000/api/question_type')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setQuestionTypeData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };

// Treatments table
  const fetchTreatmentsData = () => {
    fetch('http://localhost:5000/api/treatment')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setTreatmentsData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };

// Disease table
  const fetchDiseaseData = () => {
    fetch('http://localhost:5000/api/disease')
        .then(response => response.json())
        .then(data => {
          const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
          setDiseaseData(dataWithEditState);
        })
        .catch(error => console.error('Error:', error));
  };




  const handleTabClick = (tab) => {
    setSelectedTab(tab);

    switch (tab) {
      case "All cases":
        fetchCaseData();
        break;

      case "Patient Questions":
        fetchPatientQuestionData();
        break;

      case "Questions Processed":
        fetchProcessedQuestionData();
        break;

      case "Enhanced":
        fetchEnhancedData();
        break;

      case "Articles":
        fetchArticlesData();
        break;

      case "Patients":
        fetchPatientsData();
        break;

      case "Diseases":
        fetchDiseaseData();
        break;

      case "Question Types":
        fetchQuestionTypeData();
        break;

      case "Treatments":
        fetchTreatmentsData();
        break;

      default:
        break;
    }
  };

  // Render the table for the selected tab
  let currentData;
  switch (selectedTab) {
    case "All cases":
      currentData = allCasesData;
      break;

    case "Patient Questions":
      currentData = patientQuestionData;
      break;

    case "Questions Processed":
      currentData = processedQuestionData;
      break;
      
    case "Enhanced":
      currentData = enhancedData;
      break;

      
    case "Articles":
      currentData = articlesData;
      break;

      
    case "Patients":
      currentData = patientsData;
      break;

      
    case "Disease":
      currentData = diseaseData;
      break;

      
    case "Questions":
      currentData = questionTypeData;
      break;

            
    case "Treatments":
      currentData = treatmentsData;
      break;

    default:
      currentData = [];
      break;
  }


  const toggleEdit = (id) => {
    let updatedData;
    switch (selectedTab) {
      case "All cases":
        updatedData = allCasesData.map((item) => {
          if (item.ID === id) { 
            return {...item, isEditing: !item.isEditing };
          }
          return item;
        });
        setAllCasesData(updatedData);
        break;
      case "Patient Questions":
        updatedData = patientQuestionData.map((item) => {
          if (item.ID === id) { 
            return {...item, isEditing: !item.isEditing };
          }
          return item;
        });
        setPatientQuestionData(updatedData);
        break;
      // more tables here in future
      default:
        break;
    }
  };

  const filteredData = currentData.filter((item) => {
    // Get all the keys
    const keys = Object.keys(item);
  
    // Filter the item based on the searchTerm and filterTerm
    return keys.some((key) => {
      // Check if the item's key includes the searchTerm or filterTerm
      return (
        (searchTerm === '' || item[key].toString().toLowerCase().includes(searchTerm.toLowerCase())) &&
        (filter === '' || item[key].toString().toLowerCase().includes(filter.toLowerCase()))
      );
    });
  });

  

  return (
    <div className="tabs-container">
      <div className="tabs">
        {tabNames.map((tab, index) => (
          <div
            key={index}
            className={`tab ${selectedTab === tab ? "tab-selected" : ""}`}
            onClick={() => handleTabClick(tab)}
          >
            {tab}
          </div>
        ))}
      </div>

      <div className="tab-content-container">
        {selectedTab === "All cases" && (
            <div className="all-cases tab-content">
              <div className="search-container">
                <input
                    type="text"
                    placeholder="Search cases..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                />
                <button onClick={() => fetchCaseData(searchTerm)}>
                  Show me case
                </button>
              </div>
              <div className="filter-container">
                <label htmlFor="filter">Filter by status:</label>
                <select
                    id="filter"
                    value={filter}
                    onChange={(e) => setFilter(e.target.value)}
                >
                  <option value="">All</option>
                  <option value="Open">Open</option>
                  <option value="Closed">Closed</option>
                </select>
              </div>

              {caseData && (
                  <div className="case-data">
                    <table>
                      <thead>
                      <tr>
                        <th>Key</th>
                        <th>Value</th>
                      </tr>
                      </thead>
                      <tbody>
                      {Object.entries(caseData).map(([key, value], index) => (
                          <tr key={index}>
                            <td>{key}</td>
                            <td>{value.toString()}</td>
                          </tr>
                      ))}
                      </tbody>
                    </table>
                  </div>
              )}

              <div className="table-container">
                <Table filteredData={filteredData} toggleEdit={toggleEdit} />
              </div>
            </div>
        )}

        {selectedTab === "Patient Questions" && (
          <div className="patient-questions tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}


        {selectedTab === "Questions Processed" && (
          <div className="question-processed tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}


        {selectedTab === "Enhanced" && (
          <div className="enchanced tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}


        {selectedTab === "Articles" && (
          <div className="articles tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}


        {selectedTab === "Patients" && (
          <div className="patients tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}


        {selectedTab === "Disease" && (
          <div className="disease tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}


        {selectedTab === "Questions" && (
          <div className="question tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}


        {selectedTab === "Treatments" && (
          <div className="treatments tab-content">
            <div className="search-container">
              <input
                type="text"
                placeholder="Search....."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
              />
            </div>
            <div className="filter-container">
              <label htmlFor="filter">Filter by question:</label>
              <select
                id="filter"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="">All</option>
                {/* Add more filter options here if necessary */}
              </select>
            </div>
            <div className="table-container">
              <Table filteredData={filteredData} toggleEdit={toggleEdit} />
            </div>
          </div>
        )}
    </div>
  </div>
 );
        };

 export default AllCases;
