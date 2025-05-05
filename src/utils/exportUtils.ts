import html2canvas from "html2canvas";
import jsPDF from "jspdf";

interface CanvasElement {
  id: string;
  type: string;
  content: string;
  x: number;
  y: number;
  width: number;
  height: number;
  rotation: number;
  zIndex: number;
  fontFamily?: string;
  fontSize?: number;
  color?: string;
}

// A4 size in px at 96 DPI
const A4_WIDTH = 794;
const A4_HEIGHT = 1123;

export const exportToPDF = async (canvasRef: React.RefObject<HTMLDivElement>, elements?: CanvasElement[]) => {
  // If elements are not provided, fallback to the visible canvas
  if (!canvasRef.current && !elements) return false;

  try {
    // Get the visible canvas size
    const visibleWidth = canvasRef.current?.offsetWidth || A4_WIDTH;
    const visibleHeight = canvasRef.current?.offsetHeight || A4_HEIGHT;
    const scaleX = A4_WIDTH / visibleWidth;
    const scaleY = A4_HEIGHT / visibleHeight;

    // Create a hidden, fixed-size A4 canvas
    const hiddenCanvas = document.createElement('div');
    hiddenCanvas.style.width = `${A4_WIDTH}px`;
    hiddenCanvas.style.height = `${A4_HEIGHT}px`;
    hiddenCanvas.style.position = 'fixed';
    hiddenCanvas.style.left = '-99999px';
    hiddenCanvas.style.top = '0';
    hiddenCanvas.style.background = '#fff';
    hiddenCanvas.style.overflow = 'hidden';
    hiddenCanvas.style.zIndex = '-1';
    hiddenCanvas.id = 'hidden-export-canvas';
    document.body.appendChild(hiddenCanvas);

    // Render all elements onto the hidden canvas, scaling positions and sizes
    if (elements && elements.length > 0) {
      elements.forEach((el) => {
        const elDiv = document.createElement('div');
        elDiv.style.position = 'absolute';
        elDiv.style.left = `${el.x * scaleX}px`;
        elDiv.style.top = `${el.y * scaleY}px`;
        elDiv.style.width = `${el.width * scaleX}px`;
        elDiv.style.height = `${el.height * scaleY}px`;
        elDiv.style.transform = `rotate(${el.rotation}deg)`;
        elDiv.style.zIndex = String(el.zIndex);
        if (el.type === 'image') {
          const img = document.createElement('img');
          img.src = el.content;
          img.style.width = '100%';
          img.style.height = '100%';
          img.style.objectFit = 'cover';
          elDiv.appendChild(img);
        } else if (el.type === 'text') {
          elDiv.innerText = el.content;
          elDiv.style.fontFamily = el.fontFamily || 'Caveat';
          // Scale font size proportionally (average of X and Y scale)
          const fontScale = (scaleX + scaleY) / 2;
          elDiv.style.fontSize = `${(el.fontSize || 24) * fontScale}px`;
          elDiv.style.color = el.color || '#333';
          elDiv.style.display = 'flex';
          elDiv.style.alignItems = 'center';
          elDiv.style.justifyContent = 'center';
          elDiv.style.padding = `${8 * fontScale}px`;
          elDiv.style.overflow = 'hidden';
        }
        hiddenCanvas.appendChild(elDiv);
      });
    } else if (canvasRef.current) {
      // fallback: clone the visible canvas
      hiddenCanvas.appendChild(canvasRef.current.cloneNode(true));
    }

    // Wait for images to load
    await new Promise((resolve) => setTimeout(resolve, 300));

    // Use html2canvas to capture the hidden canvas
    const canvas = await html2canvas(hiddenCanvas, {
      scale: 2,
      useCORS: true,
      logging: false,
      backgroundColor: '#ffffff',
      width: A4_WIDTH,
      height: A4_HEIGHT,
      windowWidth: A4_WIDTH,
      windowHeight: A4_HEIGHT,
    });

    // Create PDF
    const pdf = new jsPDF('p', 'mm', 'a4');
    pdf.addImage(
      canvas.toDataURL('image/jpeg', 1.0),
      'JPEG',
      0,
      0,
      210,
      297
    );
    pdf.save('travel-story.pdf');

    // Clean up
    document.body.removeChild(hiddenCanvas);
    return true;
  } catch (error) {
    console.error('Error exporting to PDF:', error);
    // Clean up if error
    const hidden = document.getElementById('hidden-export-canvas');
    if (hidden) document.body.removeChild(hidden);
    return false;
  }
};

export const saveCanvasState = (elements: any[]) => {
  try {
    localStorage.setItem('travelStoryCanvas', JSON.stringify(elements));
    return true;
  } catch (error) {
    console.error('Error saving canvas state:', error);
    return false;
  }
};

export const loadCanvasState = () => {
  try {
    const savedCanvas = localStorage.getItem('travelStoryCanvas');
    return savedCanvas ? JSON.parse(savedCanvas) : null;
  } catch (error) {
    console.error('Error loading canvas state:', error);
    return null;
  }
};
