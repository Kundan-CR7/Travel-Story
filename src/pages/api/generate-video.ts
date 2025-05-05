import { NextApiRequest, NextApiResponse } from 'next';
import { renderMedia } from '@remotion/renderer';
import { TravelStoryComposition } from '@/components/TravelStoryVideo';

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  try {
    const { elements } = req.body;

    // Generate a unique filename
    const outputPath = `/tmp/travel-story-${Date.now()}.mp4`;

    // Render the video
    await renderMedia({
      composition: TravelStoryComposition,
      serveUrl: process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000',
      codec: 'h264',
      outputLocation: outputPath,
      inputProps: { elements },
    });

    // Set response headers for video download
    res.setHeader('Content-Type', 'video/mp4');
    res.setHeader('Content-Disposition', `attachment; filename=travel-story-${Date.now()}.mp4`);

    // Stream the video file
    const videoStream = require('fs').createReadStream(outputPath);
    videoStream.pipe(res);

    // Clean up the temporary file after streaming
    videoStream.on('end', () => {
      require('fs').unlinkSync(outputPath);
    });

  } catch (error) {
    console.error('Error generating video:', error);
    res.status(500).json({ error: 'Failed to generate video' });
  }
} 