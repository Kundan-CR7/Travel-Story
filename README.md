# TravelStory - Interactive Travel Journal Creator

## Overview

TravelStory is an interactive web application that allows users to create beautiful travel journals by combining images and text on a digital canvas. Users can arrange, resize, and rotate elements to create personalized travel memories that can be saved and exported as PDF documents.

## Features

- **Interactive Canvas**: Drag, rotate, and resize elements freely on a digital canvas
- **Image Upload**: Add your own travel photos to your journal
- **Text Editing**: Add and customize text with different fonts, sizes, and colors
- **Placeholder Images**: Quickly add travel-themed placeholder images when testing or designing
- **Saving Progress**: Save your work-in-progress journals to continue editing later
- **PDF Export**: Export your completed travel journals as PDF files to share or print
- **Responsive Design**: Works across different devices and screen sizes
- **Smooth Animations**: Engaging animations when saving and interacting with elements
- **Intuitive Interface**: User-friendly toolbar for easy access to all functions

## Technical Approach

TravelStory is built using modern web technologies:

- **React**: Component-based architecture with strong typing for maintainability
- **Tailwind CSS**: Utility-first CSS framework for responsive and consistent styling
- **Shadcn/UI**: High-quality UI components for a polished interface
- **html2canvas & jsPDF**: Libraries for converting canvas content into downloadable PDFs
- **Local Storage**: Browser storage for saving user progress between sessions

## Getting Started

To run this project locally:

```sh
# Install dependencies
npm install

# Start the development server
npm run dev
```

## Usage

1. **First Launch**: You'll be greeted with a welcome screen introducing the application.
2. **Adding Content**: Use the toolbar at the bottom to add images or text to your canvas.
3. **Manipulating Elements**:
   - Drag elements to position them
   - Use the corner handles to resize or rotate
   - Double-click text to edit its content
4. **Customizing Text**: When a text element is selected, use the options panel to change font, size, and color.
5. **Saving Progress**: Click the save button to store your work locally.
6. **Exporting**: When your journal is ready, export it as a PDF using the export button.

## Project Structure

- `src/components/TravelCanvas.jsx`: Core canvas component for handling interactions
- `src/components/Toolbar.jsx`: Interface for adding elements and performing actions
- `src/components/SaveAnimation.jsx`: Animated feedback when saving progress
- `src/utils/exportUtils.ts`: Functions for exporting and saving canvas state

## Future Enhancements

- Cloud storage integration for backing up journals
- More text customization options (shadows, styles, etc.)
- Collaboration features for shared travel journals
- Templates for quick journal creation
- Additional export formats (image, social media sharing)

## License

[Your license information here]
