import React, { useState } from 'react';
import './AllCases.css';
import Table from './Table'

const AllCases = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [filter, setFilter] = useState('');
  const [selectedTab, setSelectedTab] = useState ("All Cases");
  const [allCasesData, setAllCasesData] = useState([]);
  const [patientQuestionsData, setPatientQuestionsData] = useState([]);
  const [researchQuestionData, setResearchQuestionData] = useState([]);
  const [enchancedData, setEnchancedData] = useState([]);
  const [articlesData, setArticlesData] = useState([]);
  const [patientsData, setPatientsData] = useState([]);
  const [diseaseData, setDiseaseData] = useState([]);
  const [questionsData, setQuestionsData] = useState([]);
  const [treatmentsData, setTreatmentsData] = useState([]);


  const tabNames = [
    "All cases",
    "Patient Questions",
    "Questions Processed",
    "Enchanced",
    "Articles",
    "Patients",
    "Disease",
    "Questions",
    "Treatments",
  ];

 //FETCH DATA
  // Patient Questions table
  const fetchPatientQuestionsData = () => {
    fetch('http://localhost:5000/api/Case_patient_questions')
      .then(response => response.json())
      .then(data => {
        const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
        setPatientQuestionsData(dataWithEditState);
      })
      .catch(error => console.error('Error:', error));
  };

  // All cases table
  const fetchAllCasesData = () => {
    fetch('http://localhost:5000/api/All_Cases') // replace with your "All cases" endpoint
      .then(response => response.json())
      .then(data => {
        const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
        setAllCasesData(dataWithEditState);
      })
      .catch(error => console.error('Error:', error));
  };


  // Questions Processed table
  const fetchResearchQuestionData = () => {
    fetch('http://localhost:5000/api/Research_Question_Processed')
      .then(response => response.json())
      .then(data => {
        const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
        setResearchQuestionData(dataWithEditState);
      })
      .catch(error => console.error('Error:', error));
  };

  // Enchanced table
  const fetchEnchancedData = () => {
    fetch('http://localhost:5000/api/enchanced')
      .then(response => response.json())
      .then(data => {
        const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
        setEnchancedData(dataWithEditState);
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
    fetch('http://localhost:5000/api/patients')
      .then(response => response.json())
      .then(data => {
        const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
        setPatientsData(dataWithEditState);
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

        
  // Questions table
  const fetchQuestionsData = () => {
    fetch('http://localhost:5000/api/questions')
      .then(response => response.json())
      .then(data => {
        const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
        setQuestionsData(dataWithEditState);
      })
      .catch(error => console.error('Error:', error));
  };

          
  // Treatments table
  const fetchTreatmentsData = () => {
    fetch('http://localhost:5000/api/treatments')
      .then(response => response.json())
      .then(data => {
        const dataWithEditState = data.map(item => ({ ...item, isEditing: false }));
        setTreatmentsData(dataWithEditState);
      })
      .catch(error => console.error('Error:', error));
  };



  const handleTabClick = (tab) => {
    setSelectedTab(tab);
  
    switch (tab) {

      case "All cases":
        fetchAllCasesData();
        break;

      case "Patient Questions":
        fetchPatientQuestionsData();
        break;

      case "Questions Processed":
        fetchResearchQuestionData();
        break;

      case "Enchanced":
        fetchEnchancedData();
        break;

      case "Articles":
        fetchArticlesData();
        break;
        
      case "Patients":
        fetchPatientsData();
        break;
        
      case "Disease":
        fetchDiseaseData();
        break;
        
      case "Questions":
        fetchQuestionsData();
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
      currentData = patientQuestionsData;
      break;

    case "Questions Processed":
      currentData = researchQuestionData;
      break;
      
    case "Enchanced":
      currentData = enchancedData;
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
      currentData = questionsData;
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
        updatedData = patientQuestionsData.map((item) => {
          if (item.ID === id) { 
            return {...item, isEditing: !item.isEditing };
          }
          return item;
        });
        setPatientQuestionsData(updatedData);
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


        {selectedTab === "Enchanced" && (
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
