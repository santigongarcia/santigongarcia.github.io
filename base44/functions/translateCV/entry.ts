import { createClientFromRequest } from 'npm:@base44/sdk@0.8.44';

// Traduce el contenido dinámico del CV al inglés usando InvokeLLM.
// Recibe el objeto de datos del CV y devuelve la misma estructura traducida.
export default async function(req) {
  try {
    const base44 = createClientFromRequest(req);
    const body = await req.json();
    const { data } = body;

    if (!data) return Response.json({ error: 'Missing data' }, { status: 400 });

    const prompt = `You are a professional CV/resume translator. Translate the following CV data from Spanish to English. Translate ALL text fields naturally and professionally (job titles, summaries, achievements, skill names, education titles, language levels). Keep brand names, company names, certification tags, vendor names, and technical product names as-is. Preserve the EXACT JSON structure, keys, and array order. Return only the translated JSON object.\n\nCV data to translate:\n${JSON.stringify(data)}`;

    const result = await base44.asServiceRole.integrations.Core.InvokeLLM({
      prompt,
      response_json_schema: {
        type: "object",
        properties: {
          profile: {
            type: "object",
            properties: {
              name: { type: "string" },
              role: { type: "string" },
              currentRole: { type: "string" },
              location: { type: "string" },
              summary: { type: "string" }
            }
          },
          experience: {
            type: "array",
            items: {
              type: "object",
              properties: {
                company: { type: "string" },
                role: { type: "string" },
                period: { type: "string" },
                duration: { type: "string" },
                location: { type: "string" },
                points: { type: "array", items: { type: "string" } }
              }
            }
          },
          certifications: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                issuer: { type: "string" },
                tag: { type: "string" }
              }
            }
          },
          education: {
            type: "array",
            items: {
              type: "object",
              properties: {
                center: { type: "string" },
                title: { type: "string" },
                period: { type: "string" }
              }
            }
          },
          skills: {
            type: "object",
            additionalProperties: { type: "array", items: { type: "string" } }
          },
          languages: {
            type: "array",
            items: {
              type: "object",
              properties: {
                name: { type: "string" },
                level: { type: "string" }
              }
            }
          }
        }
      }
    });

    return Response.json({ translated: result });
  } catch (error) {
    return Response.json({ error: error.message }, { status: 500 });
  }
}