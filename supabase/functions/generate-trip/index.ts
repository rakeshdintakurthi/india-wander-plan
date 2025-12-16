import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
};

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders });
  }

  try {
    const { city, days, type } = await req.json();
    const LOVABLE_API_KEY = Deno.env.get('LOVABLE_API_KEY');
    
    if (!LOVABLE_API_KEY) {
      throw new Error('LOVABLE_API_KEY is not configured');
    }

    let systemPrompt = '';
    let userPrompt = '';

    if (type === 'schedule') {
      systemPrompt = `You are a helpful travel guide specializing in Indian tourism. Create concise, practical day-wise trip itineraries. Keep responses clear and easy to understand for tourists. Use simple language and be specific about timings and places.`;
      userPrompt = `Create a ${days}-day trip itinerary for ${city}, India. Include:
- Morning, afternoon, and evening activities for each day
- Specific places to visit with estimated time at each location
- Local food recommendations
- Best times to visit each place
- Practical tips for tourists

Format it clearly with day headers and bullet points. Keep it practical and beginner-friendly.`;
    } else if (type === 'history') {
      systemPrompt = `You are a knowledgeable historian specializing in Indian cities. Provide engaging, easy-to-understand historical summaries. Keep it concise but informative.`;
      userPrompt = `Write a brief but engaging history of ${city}, India (about 150-200 words). Include:
- When and how the city was founded
- Important historical events
- Famous rulers or historical figures
- How the city evolved over time

Keep it interesting and easy to understand for tourists.`;
    } else if (type === 'traditions') {
      systemPrompt = `You are a cultural expert on Indian traditions and customs. Explain local traditions in an engaging way that helps tourists understand and respect local culture.`;
      userPrompt = `Describe the local traditions and culture of ${city}, India (about 150-200 words). Include:
- Major festivals celebrated
- Traditional clothing and attire
- Local cuisine specialties
- Cultural practices and customs
- Art forms or crafts the city is known for

Make it interesting and help tourists connect with local culture.`;
    } else {
      throw new Error('Invalid type specified');
    }

    console.log(`Generating ${type} content for ${city}`);

    const response = await fetch('https://ai.gateway.lovable.dev/v1/chat/completions', {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${LOVABLE_API_KEY}`,
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({
        model: 'google/gemini-2.5-flash',
        messages: [
          { role: 'system', content: systemPrompt },
          { role: 'user', content: userPrompt }
        ],
      }),
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('AI Gateway error:', response.status, errorText);
      
      if (response.status === 429) {
        return new Response(
          JSON.stringify({ error: 'Rate limit exceeded. Please try again in a moment.' }),
          { status: 429, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      if (response.status === 402) {
        return new Response(
          JSON.stringify({ error: 'Service temporarily unavailable. Please try again later.' }),
          { status: 402, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
        );
      }
      
      throw new Error(`AI Gateway error: ${response.status}`);
    }

    const data = await response.json();
    const content = data.choices?.[0]?.message?.content;

    if (!content) {
      throw new Error('No content generated');
    }

    console.log(`Successfully generated ${type} content`);

    return new Response(
      JSON.stringify({ content }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );

  } catch (error: unknown) {
    console.error('Error in generate-trip function:', error);
    const errorMessage = error instanceof Error ? error.message : 'An error occurred';
    return new Response(
      JSON.stringify({ error: errorMessage }),
      { status: 500, headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    );
  }
});
