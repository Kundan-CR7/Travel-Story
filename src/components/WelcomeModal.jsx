import React from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

const WelcomeModal = ({ open, onClose }) => {
  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-md">
        <DialogHeader>
          <DialogTitle className="text-2xl font-handwritten text-travel-purple">Welcome to TravelStory</DialogTitle>
          <DialogDescription>
            Create beautiful travel memories by adding images and text to your canvas.
          </DialogDescription>
        </DialogHeader>
        <div className="grid gap-4 py-4">
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-travel-light-purple flex items-center justify-center">
              <span className="font-bold text-travel-purple">1</span>
            </div>
            <div>
              <h3 className="font-medium">Add Content</h3>
              <p className="text-sm text-muted-foreground">
                Upload your own images or use our placeholders, and add text to describe your memories.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-travel-light-purple flex items-center justify-center">
              <span className="font-bold text-travel-purple">2</span>
            </div>
            <div>
              <h3 className="font-medium">Arrange Everything</h3>
              <p className="text-sm text-muted-foreground">
                Drag, rotate, and resize elements to create your perfect layout.
              </p>
            </div>
          </div>
          
          <div className="flex items-start space-x-4">
            <div className="h-10 w-10 rounded-full bg-travel-light-purple flex items-center justify-center">
              <span className="font-bold text-travel-purple">3</span>
            </div>
            <div>
              <h3 className="font-medium">Save & Export</h3>
              <p className="text-sm text-muted-foreground">
                Save your creation and export it as a PDF to share with friends and family.
              </p>
            </div>
          </div>
        </div>
        <DialogFooter>
          <Button onClick={onClose} className="bg-travel-purple hover:bg-travel-dark-purple">
            Start Creating
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
};

export default WelcomeModal; 