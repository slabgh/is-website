"use client";
import { useEffect, useState } from "react";
import ConfirmationDialog from "@/components/Dialoguebox";
import { hasSubscribers } from "diagnostics_channel";
import { removeListener } from "process";


type Option = {
  value: string; // The value of the option
  label: string; // The label to display for the option
}

const BundlePage = () => {
  const [serviceCode, setServiceCode] = useState("");
  const [msisdn, setMsisdn] = useState("");
  const [selectedNetwork, setSelectedNetwork] = useState("MTN"); // Default to MTN
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [sessionId, setSessionId] = useState(generateSessionId());
  const [studentOrStaffId, setStudentOrStaffId] = useState("");
  const [showIdInput, setShowIdInput] = useState(false);
  const [options, setOptions] = useState<Option[]>([]);
  const [selectedOption, setSelectedOption] = useState("");
  const [showOptionsDialog, setShowOptionsDialog] = useState(false);
  const [showConfirmationDialog, setShowConfirmationDialog] = useState(false);
  const [message, setMessage] = useState("");

  
  // Map of networks to API endpoints
  const apiEndpoints = {
    MTN: "https://gravitas.ismartghana.com/api/mtn",
    Telecel: "https://gravitas.ismartghana.com/api/vodafone",
    AT: "https://gravitas.ismartghana.com/api/airteltigo",
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
  
    const newSessionId = generateSessionId();
    setSessionId(newSessionId);
  
    if (!serviceCode || !msisdn || !selectedNetwork) {
      setMessage("Please fill in all required fields.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const apiEndpoint = apiEndpoints[selectedNetwork];
      let requestBodyFormatted;
      let contentType;
  
      // Generate XML dynamically for AT network
      if (selectedNetwork === "AT") {
        requestBodyFormatted = `<?xml version="1.0" encoding="UTF-8"?>
          <USSDDynMenuRequest>
              <requestId>1</requestId>
              <sessionId>${newSessionId}</sessionId>
              <msisdn>${msisdn}</msisdn>
             <starCode>*${serviceCode}#</starCode> 
               <keyWord>HEALTH</keyWord>
              <featureId>GHS</featureId>
              <dataSet>
                  <param>
                      <id>CCMSISDN</id>
                      <value>*${serviceCode}#</value>
                  </param>
              </dataSet>
              <userData>*${serviceCode}#</userData>
              <timeStamp>${new Date().toISOString()}</timeStamp>
          </USSDDynMenuRequest>`;
        contentType = "application/xml";
  
      // Generate XML dynamically for Telecel network
      } else if (selectedNetwork === "Telecel") {
        requestBodyFormatted = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
          <ussd>
            <msg>*${serviceCode}#</msg>
            <sessionid>${newSessionId}</sessionid>
            <msisdn>${msisdn}</msisdn>
            <type>1</type>
          </ussd>`;
        contentType = "text/xml";
  
      // Handle MTN (JSON) request body
      } else {
        const requestBody = {
          sessionId: newSessionId,
          messageType: "0",
          msisdn,
          serviceCode,
          ussdString: `*${serviceCode}`,
        };
        requestBodyFormatted = JSON.stringify(requestBody);
        contentType = "application/json";
      }

      // console.log("Raw Request Body:", requestBodyFormatted);
      // console.log("Request Headers:", {
      //   "Content-Type": contentType
      // });



      const response = await fetch(`/api/proxy?network=${selectedNetwork}`, {
        method: "POST",
        headers: { "Content-Type": contentType ,
          "Accept": contentType,
        },
        body: requestBodyFormatted,
      });
      // console.log("Response object:", response);
      const responseContentType = response.headers.get("content-type");
      let data;
  
      // Check response type and parse accordingly
      if (responseContentType && responseContentType.includes("application/json")) {
        data = await response.json();
      } else if (responseContentType && (responseContentType.includes("text/xml") || responseContentType.includes("application/xml"))) {
        const responseText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, "text/xml");
  
        // Extract relevant data from the XML response, if needed
        const msgElement = xmlDoc.getElementsByTagName("msg")[0]?.textContent;
  
        data = { data: { inboundResponse: msgElement || "" } };
      } else {
        throw new Error("Unsupported response format");
      }
  
      // console.log("Parsed Data:", data);
      setShowIdInput(true);
  
    } catch (error) {
      // console.error("Error:", error);
      setError("Error processing request.");
    } finally {
      setLoading(false);
    }
  }
  


  const handleIdSubmit = async (e) => {
    e.preventDefault();
  
    if (!studentOrStaffId) {
      setMessage("Please enter your Student/Staff ID.");
      return;
    }
  
    setLoading(true);
    setError("");
  
    try {
      const apiEndpoint = apiEndpoints[selectedNetwork];
      let requestBodyFormatted;
      let contentType;
  
      // Generate XML dynamically for AT network
      if (selectedNetwork === "AT") {
        requestBodyFormatted = `<?xml version="1.0" encoding="UTF-8"?>
          <USSDDynMenuRequest>
            <requestId>1</requestId>
            <sessionId>${sessionId}</sessionId>
            <msisdn>${msisdn}</msisdn>
            <starCode>${msisdn}</starCode>
            <keyWord>HEALTH</keyWord>
            <featureId>GHS</featureId>
            <dataSet>
                <param>
                    <id>CCMSISDN</id>
                    <value>${msisdn}</value>
                </param>
            </dataSet>
            <userData>*746#</userData>
            <timeStamp>${new Date().toISOString()}</timeStamp>
          </USSDDynMenuRequest>`;
        contentType = "application/xml";
  
      } else if (selectedNetwork === "Telecel") {
        requestBodyFormatted = `<?xml version="1.0" encoding="UTF-8" standalone="yes"?>
          <ussd>
            <msg>${studentOrStaffId}</msg>
            <sessionid>${sessionId}</sessionid>
            <msisdn>${msisdn}</msisdn>
            <type>1</type>
          </ussd>`;
        contentType = "text/xml";
  
      } else {
        // Handle other networks (e.g., JSON for MTN)
        const requestBody = {
          sessionId,
          messageType: "0",
          msisdn,
          serviceCode,
          ussdString: studentOrStaffId,
        };
        requestBodyFormatted = JSON.stringify(requestBody);
        contentType = "application/json";
      }
  
      const response = await fetch(`/api/proxy?network=${selectedNetwork}`, {
        method: "POST",
        headers: {
          "Content-Type": contentType,
          "Accept": contentType,
        },
        body: requestBodyFormatted,
      });
  
     
      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(
          errorData.error || "An error occurred while processing your request."
        );
      }

// Determine response content-type and handle it accordingly
const responseContentType = response.headers.get("content-type");
// console.log("Response Content-Type:", responseContentType);

let data;
if (responseContentType && responseContentType.includes("application/json")) {
  // Handle JSON response
  data = await response.json();
} else if (responseContentType && (responseContentType.includes("text/xml") || responseContentType.includes("application/xml"))) {
  // Handle XML response
  const responseText = await response.text();
  // console.log("Raw XML Response:", responseText);

  // Parse XML response
  const parser = new DOMParser();
  const xmlDoc = parser.parseFromString(responseText, "text/xml");

  // Extract relevant data from the XML
  const msgElement = xmlDoc.getElementsByTagName("msg")[0]?.textContent;

  // Clean up the XML content
  const cleanedMsg = msgElement?.replace(/&#13;/g, "").trim() || "";

  data = {
    data: {
      inboundResponse: cleanedMsg, // msg content, cleaned
    },
  };
} else {
  throw new Error("Unsupported response format");
}

// console.log("Parsed Data:", data);

if (data.data && data.data.inboundResponse) {
  const inboundResponse = data.data.inboundResponse;

  // console.log("Raw Inbound Response:", inboundResponse);

  // Clean up the response by replacing carriage returns, newlines, and trimming spaces
  let cleanedInboundResponse = inboundResponse.replace(/&#13;/g, '').replace(/\\n/g, '\n').trim();

  // console.log("Cleaned Inbound Response:", cleanedInboundResponse);

  // Check if the cleaned response contains the valid phrase for both MTN and Telecel
  const validMTNResponse = cleanedInboundResponse.includes("Select your preferred option:");
  const validTelecelResponse = cleanedInboundResponse.includes("Select your preferred option:&#13;");

  if (validMTNResponse || validTelecelResponse) {
    setMessage("Valid ID, processing options...");

    // Now parse the cleaned response text to extract options
    const parsedOptions = parseOptions(cleanedInboundResponse);
    // console.log("Parsed Options:", parsedOptions);

    if (parsedOptions.length > 0) {
      setOptions(parsedOptions);
      setShowOptionsDialog(true);
    } else {
      setMessage("Valid Student ID, but no options available.");
    }
  } else {
    setMessage("Invalid Student/Staff ID. Please try again.");
  }
} else {
  setMessage("Invalid Student/Staff ID. Please try again.");
}
} catch (error) {
// console.error("Error during ID authentication:", error);
setError(error.message);
} finally {
setLoading(false);
}
};

// Function to parse options from the cleaned response text
const parseOptions = (inboundResponse: string): Option[] => {
  let responseText: string = inboundResponse;

  // Log raw response text for debugging
  // console.log("Raw inbound response:", inboundResponse);

  // Check if response starts with XML declaration and parse as XML if true
  if (inboundResponse.startsWith('<?xml')) {
    const parser = new DOMParser();
    const xmlDoc = parser.parseFromString(inboundResponse, "text/xml");

    // console.log("Parsed XML:", xmlDoc);

    const msgElement = xmlDoc.getElementsByTagName("msg")[0];
    // console.log("<msg> element:", msgElement);

    if (msgElement) {
      responseText = msgElement.textContent || "";
      // console.log("Extracted <msg> content:", responseText);
    } else {
      // console.error("No <msg> element found in the XML.");
      return [];
    }
  }

  // Clean up the response text
  responseText = responseText.replace(/&#13;/g, '').replace(/\\n/g, '\n').trim();
  // console.log("Cleaned response text:", responseText);

  // Split lines and parse options
  const lines = responseText
    .split(/[\n\r]+/)
    .map((line) => line.trim())
    .filter((line) => line);

  // console.log("Split lines:", lines);

  const matches: Option[] = [];
  const optionPattern = /^(\d+)\.\s*(.*)/;

  lines.forEach((line) => {
    const match = optionPattern.exec(line);
    // console.log("Matching line:", line, "-> Match:", match);

    if (match) {
      matches.push({ label: match[2].trim(), value: match[1] });
    }
  });

  // console.log("Parsed options:", matches);

  return matches;
};
  

  const handleOptionSubmit = async (e) => {
    e.preventDefault();

    if (!selectedOption) {
      setMessage("Please select an option.");
      return;
    }

    setLoading(true);
    setError("");

    try {
      const apiEndpoint = apiEndpoints[selectedNetwork];
      let requestBodyFormatted;
      let contentType;

      // Generate XML dynamically for AT network
      if (selectedNetwork === "AT") {
        requestBodyFormatted = `<?xml version="1.0" encoding="UTF-8"?>
          <USSDDynMenuRequest>
              <requestId>1</requestId>
              <sessionId>${sessionId}</sessionId>
              <msisdn>${msisdn}</msisdn>
              <starCode>${msisdn}</starCode>
              <keyWord>HEALTH</keyWord>
              <featureId>GHS</featureId>
              <dataSet>
                  <param>
                      <id>CCMSISDN</id>
                      <value>${msisdn}</value>
                  </param>
              </dataSet>
              <userData>${selectedOption}</userData>
              <timeStamp>${new Date().toISOString()}</timeStamp>
          </USSDDynMenuRequest>`;
        contentType = "application/xml";

      } else if (selectedNetwork === "Telecel") {
         requestBodyFormatted = `<?xml version="1.0" encoding="UTF-8"?>
        <ussd>
          <msg>${selectedOption}</msg>
          <sessionid>${sessionId}</sessionid>
          <msisdn>${msisdn}</msisdn>
          <type>1</type>
        </ussd>`;
      contentType = "text/xml";

      } else {
        const requestBody = {
          sessionId,
          messageType: "0",
          msisdn,
          serviceCode,
          ussdString: selectedOption,
        };
        requestBodyFormatted = JSON.stringify(requestBody);
        contentType = "application/json";
      }

      const response = await fetch(`/api/proxy?network=${selectedNetwork}`, {
        method: "POST",
        headers: {
          "Content-Type": contentType,
          "Accept": contentType,
        },
        body: requestBodyFormatted,
      });

    // Check if responseContentType is null
    const responseContentType = response.headers.get("content-type");

    if (!responseContentType) {
      throw new Error("No Content-Type header found in the response.");
    }

    let data;

    // Check if the response is OK
    if (!response.ok) {
      let errorData;
      if (responseContentType.includes("application/json")) {
        errorData = await response.json();
      } else if (responseContentType.includes("text/xml") || responseContentType.includes("application/xml")) {
        const responseText = await response.text();
        const parser = new DOMParser();
        const xmlDoc = parser.parseFromString(responseText, "text/xml");
        const errorMsg = xmlDoc.getElementsByTagName("msg")[0]?.textContent || "An error occurred";
        errorData = { error: errorMsg };
      }
      throw new Error(errorData.error || "An error occurred while processing your request.");
    }

    // Handle successful response based on the content type
    if (responseContentType.includes("application/json")) {
      data = await response.json();
    } else if (responseContentType.includes("text/xml") || responseContentType.includes("application/xml")) {
      const responseText = await response.text();
      const parser = new DOMParser();
      const xmlDoc = parser.parseFromString(responseText, "text/xml");
      const msgElement = xmlDoc.getElementsByTagName("msg")[0]?.textContent;
      data = { data: { inboundResponse: msgElement || "" } };
    } else {
      throw new Error("Unsupported response format");
    }
    
    // console.log("Telecel Response Message:", data.inboundResponse);

    // console.log("Telecel Response Message:", data.data.inboundResponse);

    // Check for "Confirm" in the inbound response message
    if (selectedNetwork === "Telecel" && data.data.inboundResponse.includes("Confirm")) {
      setShowConfirmationDialog(true); // Show confirmation dialog if "Confirm" is in the message
    } else {
      // Handle responses for other networks or no "Confirm" in the response
      if (data.statusCode === "0000") {
        setShowConfirmationDialog(true);
      } else {
        setMessage(data.error || "Failed to process your option. Please try again.");
      }
    }
  } catch (error) {
    // console.error("Error during option submission:", error);
    setError(error.message);
  } finally {
    setLoading(false);
  }
};


  const handleCloseDialog = () => {
    setShowOptionsDialog(false);
    setShowConfirmationDialog(false);
  };

  function generateSessionId() {
    const randomDigits = Math.floor(Math.random() * 100000000).toString().padStart(8, "0");
    return `131${randomDigits}`;
  }


  const ConfirmationDialog = ({ isOpen, onClose, onConfirm, option }) => {
    if (!isOpen) return null;
    
    return (
      <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
        <div className="bg-white p-5 rounded shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-black">Confirm Your Selection</h2>
          <p className="text-black">You have selected: {option}</p>
          <button
            onClick={onConfirm}
            className="mt-4 w-full rounded-sm bg-primary p-2 text-white transition-all duration-300 hover:bg-opacity-90"
          >
            Confirm
          </button>
          <button
            onClick={onClose}
            className="mt-2 w-full rounded-sm border p-2 text-black"
          >
            Cancel
          </button>
        </div>
      </div>
    );
  };
  


  return (
    <>
      <section className="relative z-10 overflow-hidden pb-16 pt-36 md:pb-20 lg:pb-28 lg:pt-[180px]">
        <div className="container">
          <div className="-mx-4 flex flex-wrap">
            <div className="w-full px-4">
              <div className="shadow-three mx-auto max-w-[500px] rounded bg-white px-6 py-10 dark:bg-dark sm:p-[60px]">
                <h3 className="mb-3 text-center text-2xl font-bold text-black dark:text-white sm:text-3xl">
                  Buy your bundle here.
                </h3>
                <p className="mb-11 text-center text-base font-medium text-body-color">
                  It&apos;stotally Affordable
                </p>
                {message && <div className="message-box">{message}</div>}
                {error && <p className="text-center text-red-500 mb-4">{error}</p>}

                <form onSubmit={showIdInput ? handleIdSubmit : handleSubmit}>
  {/* Network Selection */}
  <div className="mb-8">
    <label className="mb-3 block text-sm text-dark dark:text-white">
      Select Network
    </label>
    <div className="flex items-center justify-between">
      <label className="flex items-center text-black dark:text-white">
        <input
          type="radio"
          name="network"
          value="MTN"
          checked={selectedNetwork === "MTN"}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          className="mr-2"
        />
        MTN
      </label>
      <label className="flex items-center text-black dark:text-white">
        <input
          type="radio"
          name="network"
          value="Telecel"
          checked={selectedNetwork === "Telecel"}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          className="mr-2"
        />
        Telecel
      </label>
      <label className="flex items-center text-black dark:text-white">
        <input
          type="radio"
          name="network"
          value="AT"
          checked={selectedNetwork === "AT"}
          onChange={(e) => setSelectedNetwork(e.target.value)}
          className="mr-2"
        />
        AT
      </label>
    </div>
  </div>

  {/* Bundle Code Input */}
  <div className="mb-8">
    <label className="mb-3 block text-sm text-dark dark:text-white">
      Bundle code
    </label>
    <input
      type="text"
      value={serviceCode}
      onChange={(e) => setServiceCode(e.target.value)}
      placeholder="Enter the bundle code eg: 746" 
      className="text-black dark:text-white border-stroke dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] p-3 outline-none focus:border-primary"
      required
    />
  </div>

  {/* Phone Number Input */}
  <div className="mb-8">
    <label className="mb-3 block text-sm text-dark dark:text-white">
      Phone Number
    </label>
    <input
      type="tel"
      value={msisdn}
      onChange={(e) => setMsisdn(e.target.value)}
      placeholder="Enter your phone number eg: 233503344691"
      className="text-black dark:text-white border-stroke dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] p-3 outline-none focus:border-primary"
      required
    />
  </div>

  {/* Student/Staff ID Input */}
  {showIdInput && (
    <div className="mb-8">
      <label className="mb-3 block text-sm text-dark dark:text-white">
        Student/Staff ID
      </label>
      <input
        type="text"
        value={studentOrStaffId}
        onChange={(e) => setStudentOrStaffId(e.target.value)}
        placeholder="Enter your Student/Staff ID"
        className="text-black dark:text-white border-stroke dark:shadow-two w-full rounded-sm border bg-[#f8f8f8] p-3 outline-none focus:border-primary"
        required
      />
    </div>
  )}

  {/* Submit Button */}
  <div className="mb-6">
    <button
      type="submit"
      className="w-full rounded-sm bg-primary p-3 text-white transition-all duration-300 hover:bg-opacity-90"
    >
      {loading ? "Loading..." : showIdInput ? "Submit ID" : "Next"}
    </button>
  </div>
</form>

              
              {/* Options Dialog */}
              {showOptionsDialog && (
  <div className="fixed inset-0 z-50 flex items-center justify-center bg-black bg-opacity-50">
    <div className="bg-white p-5 rounded shadow-lg">
      <h2 className="text-lg font-bold mb-4 text-black">Select an Option</h2>

      <form onSubmit={handleOptionSubmit}>
        {options.length > 0 ? (
          options.map((option) => (
            <div key={option.value} className="mb-2">
              <label className="flex items-center text-black dark:text-white">
                <input
                  type="radio"
                  name="options"
                  value={option.value}
                  checked={selectedOption === option.value}
                  onChange={(e) => setSelectedOption(e.target.value)}
                  className="mr-2"
                />
                {option.label}
              </label>
            </div>
          ))
        ) : (
          <p>No options available.</p> // This should show if options are not populated
        )}

        <button
          type="submit"
          className="mt-4 w-full rounded-sm bg-primary p-2 text-white transition-all duration-300 hover:bg-opacity-90"
        >
          Select
        </button>
        <button
          type="button"
          onClick={() => setShowOptionsDialog(false)}
          className="mt-2 w-full rounded-sm border p-2 text-black"
        >
          Cancel
        </button>
      </form>
    </div>


     {/* Confirmation Dialog */}
     <ConfirmationDialog
              isOpen={showConfirmationDialog}
              onClose={handleCloseDialog}
              onConfirm={handleOptionSubmit}
              option={selectedOption}  // Pass the selected option to the dialog
        />
  </div>
)}


            </div>
          </div>
          </div>
          </div>
      </section>
    </>
  );
};

export default BundlePage;






