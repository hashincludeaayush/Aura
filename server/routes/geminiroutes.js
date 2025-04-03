import express from 'express';
import * as dotenv from 'dotenv';
import { GoogleGenAI } from '@google/genai';

// import fs from 'fs';

dotenv.config();

const router = express.Router();

const ai = new GoogleGenAI({ apiKey: process.env.GEMINI_API_KEY });

router.route('/').get((req, res) => {
  res.status(200).json({ message: 'Hello Aayush, Cloud Backend Server is running successfully' });
});

router.route('/').post(async (req, res) => {
  try {
    const { prompt } = req.body;

    // Set responseModalities to include "Image" so the model can generate  an image
    const response = await ai.models.generateContent({
      model: 'gemini-2.0-flash-exp-image-generation',
      contents: prompt,
      config: {
        responseModalities: ['Text', 'Image'],
      },
    });
    response.candidates[0].content.parts.forEach((part) => {
      // Based on the part type, either show the text or save the image
      if (part.text) {
        console.log(part.text);
      } else if (part.inlineData) {
        const imageData = part.inlineData.data;
        // const buffer = Buffer.from(imageData, 'base64');
        // fs.writeFileSync('gemini-native-image.png', buffer);
        console.log('Image saved as gemini-native-image.png');
        res.set('Content-Type', part.inlineData.mimeType || 'image/png');
        res.status(200).json({
          success: true,
          // Embed image data within an 'image' object
          photo: {
            mimeType: part.inlineData.mimeType,
            image: imageData, // Use the key 'b64_json' as requested
          },
        });
      }
    });
  } catch (error) {
    res.send('Error generating content:', error);
  }
});

export default router;
