import * as functions from "firebase-functions";
import * as fetch from "node-fetch";
import cors = require("cors");

const corsHandler = cors({origin: true});

// Die bestehende helloWorld-Function belassen
export const helloWorld = functions.https.onRequest((request, response) => {
  functions.logger.info("Hello logs!", {structuredData: true});
  response.send("Hello from Firebase!");
});

// Neue Function für die URL-Auflösung
export const resolveUrl = functions.https.onRequest((request, response) => {
  // CORS-Header aktivieren
  return corsHandler(request, response, async () => {
    try {
      const url = request.query.url as string;
      if (!url) {
        return response.status(400).json({error: "URL parameter is required"});
      }

      functions.logger.info(`Resolving URL: ${url}`, {structuredData: true});
      const fetchResponse = await fetch.default(url, {
        method: "GET",
        redirect: "follow",
        headers: {
          "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64)" +
          " AppleWebKit/537.36"+
          " (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36",
        },
      });
      // Die aufgelöste URL zurückgeben
      const resolvedUrl = fetchResponse.url;
      functions.logger.info(`Resolved to: ${resolvedUrl}`,
        {structuredData: true});
      return response.json({
        originalUrl: url,
        resolvedUrl: resolvedUrl,
      });
    } catch (error) {
      functions.logger.error("Error resolving URL:", error);
      return response.status(500).json({
        error: "Could not resolve URL",
        details: error instanceof Error ? error.message : "Unknown error",
      });
    }
  });
});
