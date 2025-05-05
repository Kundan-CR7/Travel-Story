import React, { useState, useRef, useEffect } from "react";
import TravelCanvas from "@/components/TravelCanvas";
import Toolbar from "@/components/Toolbar";
import WelcomeModal from "@/components/WelcomeModal";
import SaveAnimation from "@/components/SaveAnimation";
import { VideoExport } from "@/components/VideoExport";
import { exportToPDF, saveCanvasState, loadCanvasState } from "@/utils/exportUtils";
import { toast } from "sonner";

const Index = () => {
  const [showWelcome, setShowWelcome] = useState(true);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [showExportOptions, setShowExportOptions] = useState(false);
  const [canvasElements, setCanvasElements] = useState<any[]>([]);
  const canvasRef = useRef<HTMLDivElement>(null);
  const canvasComponentRef = useRef<any>(null);

  useEffect(() => {
    // Simulate loading and check for previous session
    const timer = setTimeout(() => {
      setLoading(false);
      const savedCanvas = loadCanvasState();
      if (savedCanvas) {
        setShowWelcome(false);
      }
    }, 1000);
    
    return () => clearTimeout(timer);
  }, []);

  const handleAddImage = (imageUrl: string) => {
    if (canvasComponentRef.current) {
      canvasComponentRef.current.addImage(imageUrl);
    }
  };

  const handleAddText = () => {
    if (canvasComponentRef.current) {
      canvasComponentRef.current.addText();
    }
  };

  const handleDelete = () => {
    if (canvasComponentRef.current) {
      canvasComponentRef.current.deleteElement();
    }
  };

  const handleSave = () => {
    setSaving(true);
  };

  const handleSaveComplete = () => {
    if (canvasComponentRef.current) {
      canvasComponentRef.current.handleSave();
      setCanvasElements(canvasComponentRef.current.getElements());
    }
    setSaving(false);
    setShowExportOptions(true);
  };

  const handleExportPDF = async () => {
    const result = await exportToPDF(canvasRef);
    if (result) {
      toast.success("Your travel story has been exported as a PDF!");
    } else {
      toast.error("Failed to export your travel story. Please try again.");
    }
  };

  const handleGenerateVideo = () => {
    if (canvasComponentRef.current) {
      setCanvasElements(canvasComponentRef.current.getElements());
      setShowExportOptions(true);
    }
  };

  const handleCanvasSave = (elements: any[]) => {
    const success = saveCanvasState(elements);
    if (success) {
      toast.success("Your travel story has been saved!");
    } else {
      toast.error("Failed to save your travel story. Please try again.");
    }
  };

  const handleNewProject = () => {
    // Clear canvas elements
    if (canvasComponentRef.current) {
      canvasComponentRef.current.setElements([]);
    }
    // Remove saved state
    localStorage.removeItem('travelStoryCanvas');
    setCanvasElements([]);
    toast.success('Started a new project!');
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-white to-travel-light-purple">
        <div className="text-4xl font-handwritten text-travel-purple mb-8 animate-float">TravelStory</div>
        <div className="w-16 h-16 border-4 border-travel-purple border-t-transparent rounded-full animate-spin"></div>
      </div>
    );
  }

  return (
    <div className="relative">
      <div ref={canvasRef}>
        <TravelCanvas 
          ref={canvasComponentRef} 
          onSave={handleCanvasSave} 
        />
      </div>
      
      <header className="fixed top-0 left-0 right-0 p-4 flex justify-center z-50">
        <div className="bg-white bg-opacity-80 backdrop-blur-sm px-6 py-2 rounded-full shadow-sm">
          <h1 className="text-2xl font-handwritten text-travel-purple">TravelStory</h1>
        </div>
      </header>
      
      <Toolbar
        onAddImage={handleAddImage}
        onAddText={handleAddText}
        onDelete={handleDelete}
        onSave={handleSave}
        onExportPDF={handleExportPDF}
        onGenerateVideo={handleGenerateVideo}
        onNewProject={handleNewProject}
      />
      
      <SaveAnimation 
        saving={saving} 
        onComplete={handleSaveComplete} 
      />
      
      <WelcomeModal 
        open={showWelcome} 
        onClose={() => setShowWelcome(false)} 
      />

      {showExportOptions && (
        <VideoExport
          elements={canvasElements}
          onClose={() => setShowExportOptions(false)}
        />
      )}
    </div>
  );
};

export default Index;
