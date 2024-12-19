import { NextRequest, NextResponse } from 'next/server';
import { BirthData } from '@/types/birth-data';
import { calculateAstroData, getColorScheme } from '@/utils/astrology';

export async function POST(request: NextRequest) {
  try {
    const data: BirthData = await request.json();

    // Validate required fields
    if (!data.name || !data.dateOfBirth || !data.timeOfBirth || !data.timezone || !data.location) {
      return NextResponse.json(
        { error: 'Missing required fields' },
        { status: 400 }
      );
    }

    // Calculate UTC timestamp if not provided
    const utcTimestamp = data.utcTimestamp || 
      new Date(`${data.dateOfBirth}T${data.timeOfBirth}`).toISOString();

    // Calculate astrological data
    const astroData = await calculateAstroData(utcTimestamp);

    // Get color scheme based on astrological data
    const colors = getColorScheme(astroData);

    // Generate prompt for the wallpaper
    const prompt = `Create a spiritual and mystical mobile wallpaper with sacred geometry patterns. 
    Use a color palette of ${colors.join(', ')}. 
    The design should incorporate mandala patterns and subtle energy flows. 
    Style: Minimalist and elegant. 
    Make it suitable for a phone wallpaper with dimensions 1080x1920.
    The design should reflect the energy of ${data.name}'s biorhythms.
    Physical energy: ${Math.round(astroData.biorhythm.physical)}%
    Emotional energy: ${Math.round(astroData.biorhythm.emotional)}%
    Intellectual energy: ${Math.round(astroData.biorhythm.intellectual)}%`;

    try {
      // Use Replicate's Flux model instead of EverArt
      const response = await fetch('https://api.replicate.com/v1/predictions', {
        method: 'POST',
        headers: {
          'Authorization': `Token ${process.env.REPLICATE_API_TOKEN}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          version: "6c3455757f9c7c874d2645faa0e9c5c0c5d3d561f235c8d382ee48e0ac75c831", // Flux model version
          input: {
            prompt,
            negative_prompt: "text, watermark, signature, blurry, low quality",
            width: 1080,
            height: 1920,
            num_inference_steps: 50,
            guidance_scale: 7.5
          }
        })
      });

      if (!response.ok) {
        throw new Error('Failed to generate image');
      }

      const result = await response.json();
      const imageUrl = result.output[0]; // Replicate returns array of image URLs

      return NextResponse.json({
        success: true,
        data: {
          birthData: {
            ...data,
            utcTimestamp,
          },
          astroData,
          wallpaper: {
            imageUrl,
            colors,
          },
        },
      });
    } catch (error) {
      console.error('Error generating image:', error);
      // Fallback to placeholder image for development
      return NextResponse.json({
        success: true,
        data: {
          birthData: {
            ...data,
            utcTimestamp,
          },
          astroData,
          wallpaper: {
            imageUrl: 'https://placekitten.com/1080/1920',
            colors,
          },
        },
      });
    }

  } catch (error) {
    console.error('Error processing request:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
}
