import React, { useState, useEffect } from 'react';
import Select from 'react-select';
import makeAnimated from 'react-select/animated';
import './AddCase.css';

function AddCase() {


  /* TagsCloud */
  useEffect(() => {
    fetch('/api/get-patients') 
      .then(response => response.json())
      .then(data => setPatientOptions(data.map(item => ({ value: item.id, label: item.name }))))
      .catch(error => console.error(error));
  
    fetch('/api/get-diseases') 
      .then(response => response.json())
      .then(data => setDiseaseOptions(data.map(item => ({ value: item.id, label: item.name }))))
      .catch(error => console.error(error));
  
    fetch('/api/get-treatments') 
      .then(response => response.json())
      .then(data => setTreatmentOptions(data.map(item => ({ value: item.id, label: item.name }))))
      .catch(error => console.error(error));
  
    fetch('/api/get-questions') 
      .then(response => response.json())
      .then(data => setQuestionOptions(data.map(item => ({ value: item.id, label: item.question }))))
      .catch(error => console.error(error));
  }, []);

  const [patientOptions, setPatientOptions] = useState([]);
  const [diseaseOptions, setDiseaseOptions] = useState([]);
  const [treatmentOptions, setTreatmentOptions] = useState([]);
  const [questionOptions, setQuestionOptions] = useState([]);




  // Step 1 related to Case/PatientQ table 
  const [patientSummary, setPatientSummary] = useState('');
  const [objectsIncluded, setObjectsIncluded] = useState('');
  const [patientQuestion, setPatientQuestion] = useState([{ value: '' }]);
  const [questionObjects, setQuestionObjects] = useState([{ value: '' }]);
  const [step1Fields, setStep1Fields] = useState([{ patientQuestion: '', questionObjects: ''}]);

  // Step 2 related to ResearchQ table 
  const [question,setQuestion] = useState([{ value: '' }]);
  const [questionNote,setQuestionNote] = useState([{ value: '' }]);
  const [objectsIncludedRQ,setObjectsIncludedRQ] = useState([{ value: '' }]);
  const [step2Fields, setStep2Fields] = useState([{ question: '', questionNote: '', objectsIncludedRQ: '' }]);

  // Step 3 related to Enhanced table 
  const [patientEnh,setPatientEnh] = useState([{ value: '' }]);
  const [diseaseEnh,setDiseaseEnh] = useState([{ value: '' }]);
  const [treatmentEnh,setTreatmentEnh] = useState([{ value: '' }]);
  const [questionType,setQuestionType] = useState([{ value: '' }]);
  const [step3Fields, setStep3Fields] = useState([{ patientEnh: '', diseaseEnh: '', treatmentEnh: '', questionType:'' }]);

  // Step 4 related to Articles
  const [reference, setReference] = useState([{ value: '' }]);
  const [highlitedText, setHighlitedText] = useState([{ value: '' }]);
  const [objectsIncludedA, setObjectsIncludedA] = useState([{ value: '' }]);
  const [step4Fields, setStep4Fields] = useState([{ reference: '', highlitedText: '', objectsIncludedA: '' }]);

  const [currentStep, setCurrentStep] = useState(1);


  
  const [objectTags, setObjectTags] = useState([]);

 /*ANIMATIONS UUUHUUU */
  const animatedComponents = makeAnimated();

  
  const fetchObjectTags = () => {
    fetch('http://localhost:3001/get-object-tags', {
      method: 'GET',
      headers: {'Content-Type': 'application/json'},
    })
    .then(response => response.json())
    .then(data => {
      setObjectTags(data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });
  };




  // Implement the handleSubmit function to process the form data
  const handleSubmit = (e) => {
    e.preventDefault();
    const data = {
      patientSummary,
      objectsIncluded,
      step1Fields,
      step2Fields,
      step3Fields,
      step4Fields
    };
    fetch('http://localhost:3001/add-case', {
      method: 'POST',
      headers: {'Content-Type': 'application/json'},
      body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(data => {
      console.log('Success:', data);
    })
    .catch((error) => {
      console.error('Error:', error);
    });

  };

  // For Dynamic fields
  const handleAddField = (fields, setFields) => {
    setFields([...fields, { value: '' }]);
  };

  const handleAddFieldsStep1 = () => {
    handleAddField(patientQuestion, setPatientQuestion);
    handleAddField(questionObjects, setQuestionObjects);
    setStep1Fields([...step1Fields,{patientQuestion: '', questionObjects:'' }])
  };
  
  const handleAddFieldsStep2 = () => {
    handleAddField(question, setQuestion);
    handleAddField(questionNote, setQuestionNote);
    handleAddField(objectsIncludedRQ, setObjectsIncludedRQ);
    setStep2Fields([...step2Fields, {question: '', questionNote:'', objectsIncluded: ''}])
  };
  
  const handleAddFieldsStep3 = () => {
    handleAddField(patientEnh, setPatientEnh);
    handleAddField(diseaseEnh, setDiseaseEnh);
    handleAddField(treatmentEnh, setTreatmentEnh);
    handleAddField(questionType, setQuestionType);
    setStep3Fields([...step3Fields, { patientEnh: '', diseaseEnh: '', treatmentEnh: '', questionType: '' }]);
  };

  const handleAddFieldsStep4 = () => {
    handleAddField(reference, setReference);
    handleAddField(highlitedText, setHighlitedText);
    handleAddField(objectsIncludedA, setObjectsIncludedA);
    setStep4Fields([...step4Fields, { reference: '', highlitedText: '', objectsIncludedA: '' }]);
  };

  // Keep fields value
  const handleFieldChange = (fields, setFields, index, fieldName, e) => {
    const newFields = [...fields];
    newFields[index][fieldName] = e.target.value;
    setFields(newFields);
  };

  // STEPS
  const handleNext = () => {
    setCurrentStep(currentStep + 1);
  };

  const handlePrevious = () => {
    setCurrentStep(currentStep - 1);
  };

  return (
      <div className="add-case-container">    
        <form onSubmit={handleSubmit}>
          {currentStep === 1 && (
            <>
              <div className="input-section">
                <h2>New case</h2>
                <label htmlFor="patient-summary-input">Patient Summary</label>
                <textarea
                  id="patient-summary-input"
                  className="patient-summary-input"
                  value={patientSummary}
                  onChange={(e) => setPatientSummary(e.target.value)}
                />
                <label htmlFor="objects-included-input">Objects Included</label>
                <Select
                 closeMenuOnSelect={false}
                 components={animatedComponents}
                 isMulti
                 options={patientOptions}
                 onChange={selectedOptions => setObjectsIncluded(selectedOptions)}
                />
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={diseaseOptions}
                  // set the selected options in state
                  onChange={selectedOptions => setObjectsIncluded(selectedOptions)}
                />
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={treatmentOptions}
                  // set the selected options in state
                  onChange={selectedOptions => setObjectsIncluded(selectedOptions)}
                />
                <Select
                  closeMenuOnSelect={false}
                  components={animatedComponents}
                  isMulti
                  options={questionOptions}
                  // set the selected options in state
                  onChange={selectedOptions => setObjectsIncluded(selectedOptions)}
                />


              </div>

              {step1Fields.map((fieldGroup, index) => (
                <div className="field-container" key={index}>
                  <div className="input-section">
                    <label htmlFor={`patient-question-input-${index}`}>Patient question {index + 1}</label>
                    <textarea
                      id={`patient-question-input-${index}`}
                      className="patient-question-input"
                      value={fieldGroup.patientQuestion}
                      onChange={(e) => handleFieldChange(step1Fields, setStep1Fields, index, 'patientQuestion', e)}
                    />
                  </div>

                  <div className="input-section">
                    <label htmlFor={`question-objects-input-${index}`}>Patient question objects {index + 1}</label>
                    <textarea
                      id={`question-objects-input-${index}`}
                      className="question-objects-input"
                      value={fieldGroup.questionObjects}
                      onChange={(e) => handleFieldChange(step1Fields, setStep1Fields, index, 'questionObjects', e)}
                    />
                  </div>
                </div>
              ))}
              <div>
                <button type="button" onClick={handleAddFieldsStep1}>Add Fields</button>
              </div>
            </>
          )}

        {currentStep === 2 && (
          <>
          <h2>Research question</h2>
          {step2Fields.map((fieldGroup, index) => (
            <div className="field-container" key={index}>
              <div className="input-section">
  
                  <div key={index}>
                    <div>
                      <label htmlFor={`question-input-${index}`}>Question {index + 1}</label>
                    </div>

                    <textarea
                      id={`question-input-${index}`}
                      className="question-input"
                      value={fieldGroup.question}
                      onChange={(e) => handleFieldChange(step2Fields, setStep2Fields, index, 'question', e)}
                    />
                  </div>


                  <div key={index}>
                    <div>
                      <label htmlFor={`question-note-input-${index}`}>Question note {index + 1}</label>
                    </div>

                    <textarea
                      id={`question-note-input-${index}`}
                      className="question-note-input"
                      value={fieldGroup.questionNote}
                      onChange={(e) => handleFieldChange(step2Fields, setStep2Fields, index, 'questionNote', e)}
                    />
                  </div>

                  <div key={index}>
                    <div>
                      <label htmlFor={`objects-included-RQ-input-${index}`}>Objects {index + 1}</label>
                    </div>
                    <textarea
                      id={`objects-included-RQ-input-${index}`}
                      className="objects-included-RQ-input"
                      value={fieldGroup.objectsIncludedRQ}
                      onChange={(e) => handleFieldChange(step2Fields, setStep2Fields, index, 'objectsIncludedRQ', e)}
                    />
                  </div>

                <div>
                <button type="button" onClick={handleAddFieldsStep2}>Add Fields</button>
                </div>
              </div>
            </div>
          ))}          
          </>
        )}


        {currentStep === 3 && (
          <>
          {step3Fields.map((fieldGroup, index) => (
            <div className="field-container" key={index}>
              <div className="input-section">
                  <div key={index}>
                    <div>
                    <label htmlFor={`patient-enh-input-${index}`}>Patient Enh {index + 1}</label>
                    </div>
                    
                    <textarea
                      id={`patient-enh-input-${index}`}
                      className="objects-included-input"
                      value={fieldGroup.patientEnh}
                      onChange={(e) => handleFieldChange(step3Fields, setStep3Fields, index, 'patientEnh', e)}
                    />
                  </div>

                  <div key={index}>
                    <div>
                    <label htmlFor={`disease-enh-input-${index}`}>Disease Enh {index + 1}</label>
                    </div>
                    <textarea
                      id={`disease-enh-input-${index}`}
                      className="disease-input"
                      value={fieldGroup.diseaseEnh}
                      onChange={(e) => handleFieldChange(step3Fields, setStep3Fields, index, 'diseaseEnh', e)}
                    />
                  </div>

                  <div key={index}>
                    <div>
                    <label htmlFor={`treatment-enh-input-${index}`}>Treatment Enh {index + 1}</label>
                    </div>

                    <textarea
                      id={`treatment-enh-input-${index}`}
                      className="treatment-input"
                      value={fieldGroup.treatmentEnh}
                      onChange={(e) => handleFieldChange(step3Fields, setStep3Fields, index, 'treatmentEnh', e)}
                    />
                  </div>

                  <div key={index}>
                    <div>
                    <label htmlFor={`question-type-input-${index}`}>Question Enh {index + 1}</label>
                    </div>

                    <textarea
                      id={`question-type-input-${index}`}
                      className="question-type-input"
                      value={fieldGroup.questionType}
                      onChange={(e) => handleFieldChange(step3Fields, setStep3Fields, index, 'questionType', e)}
                    />
                  </div>
              </div>
            </div>  
          ))}
            <div>
              <button type="button" onClick={handleAddFieldsStep3}>Add Fields</button>
            </div>
          </>
        )}

        {currentStep === 4 && (
          <>
            {step4Fields.map((fieldGroup, index) => (
              <div className="field-container" key={index}>
                <div className="input-section">
                  <label htmlFor={`reference-input-${index}`}>Reference (link) {index + 1}</label>
                  <textarea
                    id={`reference-input-${index}`}
                    className="reference-input"
                    value={fieldGroup.reference}
                    onChange={(e) => handleFieldChange(step4Fields, setStep4Fields, index, 'reference', e)}
                  />
                </div>

                <div className="input-section">
                  <label htmlFor={`highlite-included-input-${index}`}>Highlited text {index + 1}</label>
                  <textarea
                    id={`highlite-included-input-${index}`}
                    className="highlite-included-input"
                    value={fieldGroup.highlitedText}
                    onChange={(e) => handleFieldChange(step4Fields, setStep4Fields, index, 'highlitedText', e)}
                  />
                </div>

                <div className="input-section">
                  <label htmlFor={`objects-included-A-input-${index}`}>Objects Included {index + 1}</label>
                  <textarea
                    id={`objects-included-A-input-${index}`}
                    className="objects-included-A-input"
                    value={fieldGroup.objectsIncludedA}
                    onChange={(e) => handleFieldChange(step4Fields, setStep4Fields, index, 'objectsIncludedA', e)}
                  />
                </div>
              </div>
            ))}
            <div>
              <button type="button" onClick={handleAddFieldsStep4}>Add Fields</button>
            </div>
          </>
        )}

          {currentStep > 1 && (
            <button type="button" onClick={handlePrevious}>
              Previous
            </button>
          )}

          {currentStep < 4 && (
            <button type="button" onClick={handleNext}>
              Next
            </button>
          )}

          {currentStep === 4 && (
            <button type="submit">Submit Case</button>
          )}
        </form>
      </div>
  );
}

export default AddCase;