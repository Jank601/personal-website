export default async function handler(req, res) {
    if (req.method !== 'POST') {
      return res.status(405).json({ message: 'Method not allowed' });
    }
  
    const API_KEY = process.env.NEXT_PUBLIC_API_KEY;
  
    try {
      console.log('Making request to API Gateway with headers:', {
        'Content-Type': 'application/json',
        'x-api-key': API_KEY.substring(0, 5) + '...' // Log partial key for security
      });
      console.log('Request body:', req.body);
  
      const response = await fetch('https://pwfaij0zid.execute-api.us-east-1.amazonaws.com/prod/invoke-agent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'x-api-key': API_KEY
        },
        body: JSON.stringify({
          input_text: req.body.input_text,
          sessionId: req.body.sessionId
        })
      });
  
      if (!response.ok) {
        const errorData = await response.text();
        console.error('API Gateway Error Response:', {
          status: response.status,
          statusText: response.statusText,
          headers: Object.fromEntries(response.headers.entries()),
          body: errorData
        });
        return res.status(response.status).json({ 
          message: 'Error from API Gateway',
          details: errorData
        });
      }
  
      const data = await response.json();
      return res.status(200).json(data);
    } catch (error) {
      console.error('Fetch Error:', error);
      return res.status(500).json({ 
        message: 'Internal server error',
        error: error.message
      });
    }
  }