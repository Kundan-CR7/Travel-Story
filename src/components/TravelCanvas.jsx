import React, { useState, useRef, useEffect, forwardRef, useImperativeHandle } from "react";
import { toast } from "sonner";
import { cn } from "@/lib/utils";
import TextOptionsModal from "./TextOptionsModal";

const A4_RATIO = 210 / 297;
const A4_WIDTH_PX = 900;
const A4_HEIGHT_PX = Math.round(A4_WIDTH_PX / A4_RATIO);

const TravelCanvas = forwardRef(({ onSave }, ref) => {
  const [elements, setElements] = useState([]);
  const [activeElementId, setActiveElementId] = useState(null);
  const [isDragging, setIsDragging] = useState(false);
  const [isRotating, setIsRotating] = useState(false);
  const [isResizing, setIsResizing] = useState(false);
  const [startPoint, setStartPoint] = useState({ x: 0, y: 0 });
  const [editing, setEditing] = useState(null);
  const canvasRef = useRef(null);
  const textareaRef = useRef(null);

  useEffect(() => {
    try {
      const savedCanvas = localStorage.getItem('travelStoryCanvas');
      if (savedCanvas) {
        setElements(JSON.parse(savedCanvas));
      }
    } catch (error) {
      console.error("Error loading saved canvas:", error);
    }
  }, []);

  useEffect(() => {
    if (editing && textareaRef.current) {
      textareaRef.current.focus();
    }
  }, [editing]);

  useImperativeHandle(ref, () => ({
    addImage,
    addText,
    deleteElement,
    handleSave,
    getElements: () => elements,
    setElements
  }));

  const handleMouseDown = (e, elementId) => {
    if (e.target instanceof HTMLElement) {
      if (e.target.classList.contains('handle-rotate')) {
        setIsRotating(true);
      } else if (e.target.classList.contains('handle-resize')) {
        setIsResizing(true);
      } else if (!e.target.classList.contains('text-editor')) {
        setIsDragging(true);
      }
      setActiveElementId(elementId);
      setStartPoint({ x: e.clientX, y: e.clientY });
      e.stopPropagation();
    }
  };

  const handleMouseUp = () => {
    setIsDragging(false);
    setIsRotating(false);
    setIsResizing(false);
  };

  const handleMouseMove = (e) => {
    if (!activeElementId) return;
    const deltaX = e.clientX - startPoint.x;
    const deltaY = e.clientY - startPoint.y;
    setElements(prev =>
      prev.map(el => {
        if (el.id === activeElementId) {
          if (isDragging) {
            return { ...el, x: el.x + deltaX, y: el.y + deltaY };
          }
          if (isRotating) {
            const rect = canvasRef.current?.getBoundingClientRect();
            if (!rect) return el;
            const centerX = el.x + el.width / 2;
            const centerY = el.y + el.height / 2;
            const angle = Math.atan2(
              e.clientY - rect.top - centerY,
              e.clientX - rect.left - centerX
            ) * (180 / Math.PI);
            return { ...el, rotation: angle + 90 };
          }
          if (isResizing) {
            const newWidth = Math.max(50, el.width + deltaX);
            const newHeight = Math.max(50, el.height + deltaY);
            return { ...el, width: newWidth, height: newHeight };
          }
        }
        return el;
      })
    );
    setStartPoint({ x: e.clientX, y: e.clientY });
  };

  const handleCanvasClick = (e) => {
    if (e.currentTarget === e.target) {
      setActiveElementId(null);
      setEditing(null);
    }
  };

  const handleTextDoubleClick = (id) => {
    setEditing(id);
  };

  const handleTextChange = (e) => {
    if (!editing) return;
    setElements(prev =>
      prev.map(el => {
        if (el.id === editing) {
          return { ...el, content: e.target.value };
        }
        return el;
      })
    );
  };

  const handleTextBlur = () => {
    setEditing(null);
  };

  function addImage(imageUrl) {
    const newElement = {
      id: `img-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "image",
      content: imageUrl,
      x: A4_WIDTH_PX / 2 - 150,
      y: A4_HEIGHT_PX / 2 - 150,
      width: 300,
      height: 200,
      rotation: 0,
      zIndex: elements.length + 1
    };
    setElements([...elements, newElement]);
    setActiveElementId(newElement.id);
    toast("Image added to canvas");
  }

  function addText() {
    const newElement = {
      id: `text-${Date.now()}-${Math.random().toString(36).substr(2, 9)}`,
      type: "text",
      content: "Double click to edit text",
      x: A4_WIDTH_PX / 2 - 100,
      y: A4_HEIGHT_PX / 2,
      width: 200,
      height: 100,
      rotation: 0,
      zIndex: elements.length + 1,
      fontFamily: "Caveat",
      fontSize: 24,
      color: "#333333"
    };
    setElements([...elements, newElement]);
    setActiveElementId(newElement.id);
    setEditing(newElement.id);
    toast("Text added to canvas");
  }

  const handleFontSizeChange = (size) => {
    if (!activeElementId) return;
    setElements(prev =>
      prev.map(el => {
        if (el.id === activeElementId && el.type === "text") {
          return { ...el, fontSize: size };
        }
        return el;
      })
    );
  };

  const handleColorChange = (color) => {
    if (!activeElementId) return;
    setElements(prev =>
      prev.map(el => {
        if (el.id === activeElementId && el.type === "text") {
          return { ...el, color };
        }
        return el;
      })
    );
  };

  const handleFontFamilyChange = (fontFamily) => {
    if (!activeElementId) return;
    setElements(prev =>
      prev.map(el => {
        if (el.id === activeElementId && el.type === "text") {
          return { ...el, fontFamily };
        }
        return el;
      })
    );
  };

  function deleteElement() {
    if (!activeElementId) return;
    setElements(elements.filter(el => el.id !== activeElementId));
    setActiveElementId(null);
    toast("Element removed from canvas");
  }

  function handleSave() {
    onSave(elements);
  }

  return (
    <div className="relative w-full h-screen overflow-hidden bg-gradient-to-br from-white to-travel-light-purple">
      <div 
        ref={canvasRef}
        className="relative w-full h-full"
        onClick={handleCanvasClick}
        onMouseMove={handleMouseMove}
        onMouseUp={handleMouseUp}
        onMouseLeave={handleMouseUp}
      >
        {elements.map((element) => (
          <div
            key={element.id}
            className={cn(
              "canvas-element",
              activeElementId === element.id ? "active" : "",
            )}
            style={{
              left: `${element.x}px`,
              top: `${element.y}px`,
              width: `${element.width}px`,
              height: `${element.height}px`,
              transform: `rotate(${element.rotation}deg)`,
              zIndex: element.zIndex,
            }}
            onMouseDown={(e) => handleMouseDown(e, element.id)}
            onDoubleClick={() => element.type === "text" && handleTextDoubleClick(element.id)}
          >
            {element.type === "image" ? (
              <img 
                src={element.content} 
                alt="Travel memory" 
                className="w-full h-full object-cover"
                draggable="false"
              />
            ) : (
              <>
                {editing === element.id ? (
                  <textarea
                    ref={textareaRef}
                    className="text-editor"
                    value={element.content}
                    onChange={handleTextChange}
                    onBlur={handleTextBlur}
                    style={{
                      fontSize: `${element.fontSize}px`,
                      fontFamily: element.fontFamily,
                      color: element.color
                    }}
                  />
                ) : (
                  <div 
                    className="w-full h-full p-2 overflow-hidden break-words"
                    style={{
                      fontSize: `${element.fontSize}px`,
                      fontFamily: element.fontFamily,
                      color: element.color
                    }}
                  >
                    {element.content}
                  </div>
                )}
                {activeElementId === element.id && element.type === "text" && (
                  <TextOptionsModal 
                    fontSize={element.fontSize || 24}
                    color={element.color || "#333333"}
                    fontFamily={element.fontFamily || "Caveat"}
                    onFontSizeChange={handleFontSizeChange}
                    onColorChange={handleColorChange}
                    onFontFamilyChange={handleFontFamilyChange}
                  />
                )}
              </>
            )}
            {activeElementId === element.id && (
              <>
                <div className="handle-rotate"></div>
                <div className="handle-resize"></div>
              </>
            )}
          </div>
        ))}
      </div>
    </div>
  );
});

export default TravelCanvas; 