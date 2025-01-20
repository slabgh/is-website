export default async function handler(req, res) {
  // Check if the request method is POST
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed, only POST requests are supported' });
  }

  const { network } = req.query;

  // Define API endpoints for each network
  const apiEndpoints = {
    MTN: "https://gravitas.ismartghana.com/api/mtn",
    Telecel: "https://gravitas.ismartghana.com/api/vodafone",
    AT: "https://gravitas.ismartghana.com/api/airteltigo",
  };

  const apiUrl = apiEndpoints[network];

  // Check if the provided network is valid
  if (!apiUrl) {
    return res.status(400).json({ error: 'Invalid network selected.' });
  }

  try {
    const contentType = req.headers['content-type'];
    
    // Check if the request body is empty or not in the expected format
    if (!req.body || Object.keys(req.body).length === 0) {
      return res.status(400).json({ error: 'Request body cannot be empty.' });
    }

    // Log the request body for debugging
    console.log('Request body:', req.body);

    // Handle XML or JSON request body based on content-type
    let bodyToSend;
    if (contentType === 'application/json') {
      bodyToSend = JSON.stringify(req.body); // Handle JSON
    } else if (contentType === 'application/xml' || contentType === 'text/xml') {
      bodyToSend = req.body; // Pass XML as is
    } else {
      return res.status(400).json({ error: 'Unsupported Content-Type' });
    }

    // Make the request to the external API
    const response = await fetch(apiUrl, {
      method: 'POST',
      headers: {
        'Content-Type': contentType, // Forward the original content-type (either JSON or XML)
        'Accept': contentType,
      },
      body: bodyToSend,
    });

    const responseContentType = response.headers.get('content-type');
    let responseBody;

    // Check if the response content type is JSON and parse accordingly
    if (responseContentType && responseContentType.includes('application/json')) {
      responseBody = await response.json();
    } else if (responseContentType && (responseContentType.includes('text/xml') || responseContentType.includes('application/xml'))) {
      responseBody = await response.text(); // Handle XML or plain text responses
    } else {
      responseBody = await response.text(); // Default to text in case of unknown format
    }

    // Handle non-OK responses from the external API
    if (!response.ok) {
      console.error(`API response error for network ${network}:`, responseBody);
      return res.status(response.status).json({ error: responseBody });
    }

    // If the response is XML, send it with the appropriate content-type
    if (responseContentType && (responseContentType.includes('text/xml') || responseContentType.includes('application/xml'))) {
      res.setHeader('Content-Type', 'text/xml');
      return res.status(200).send(responseBody); // Return XML response
    }

    // Otherwise, return the JSON response
    return res.status(200).json(responseBody);

  } catch (error) {
    console.error(`Error fetching from ${apiUrl} for network ${network}:`, error.message || error);
    return res.status(500).json({ error: 'Failed to fetch from API. Please try again later.' });
  }
}
