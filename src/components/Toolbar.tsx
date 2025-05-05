// import React, { useRef } from "react";
// import { Button } from "@/components/ui/button";
// import { 
//   ImageIcon, 
//   TextIcon, 
//   TrashIcon, 
//   SaveIcon, 
//   DownloadIcon, 
//   PlusIcon,
//   FileTextIcon,
//   VideoIcon,
//   FolderPlusIcon
// } from "lucide-react";
// import { toast } from "sonner";

// interface ToolbarProps {
//   onAddImage: (imageUrl: string) => void;
//   onAddText: () => void;
//   onDelete: () => void;
//   onSave: () => void;
//   onExportPDF: () => void;
//   onGenerateVideo: () => void;
//   onNewProject: () => void;
// }

// const Toolbar: React.FC<ToolbarProps> = ({
//   onAddImage,
//   onAddText,
//   onDelete,
//   onSave,
//   onExportPDF,
//   onGenerateVideo,
//   onNewProject
// }) => {
//   const fileInputRef = useRef<HTMLInputElement>(null);
  
//   const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const files = e.target.files;
//     if (!files || files.length === 0) return;

//     const file = files[0];
    
//     if (!file.type.startsWith("image/")) {
//       toast.error("Please upload an image file");
//       return;
//     }
    
//     const reader = new FileReader();
//     reader.onload = (event) => {
//       if (event.target?.result) {
//         onAddImage(event.target.result.toString());
//       }
//     };
//     reader.readAsDataURL(file);
    
//     // Reset input so the same file can be uploaded again
//     e.target.value = "";
//   };
  
//   const addPlaceholderImage = () => {
//     // Random placeholder image for demo purposes
//     const placeholders = [
//       "https://source.unsplash.com/photo-1469474968028-56623f02e42e",
//       "https://source.unsplash.com/photo-1482938289607-e9573fc25ebb",
//       "https://source.unsplash.com/photo-1500375592092-40eb2168fd21",
//       "https://source.unsplash.com/photo-1426604966848-d7adac402bff",
//       "https://source.unsplash.com/photo-1466721591366-2d5fba72006d"
//     ];
//     const randomPlaceholder = placeholders[Math.floor(Math.random() * placeholders.length)];
//     onAddImage(randomPlaceholder);
//   };

//   return (
//     <div className="fixed bottom-6 left-1/2 transform -translate-x-1/2 px-6 py-3 bg-white bg-opacity-90 backdrop-blur-sm rounded-full shadow-lg animate-slide-up flex items-center space-x-4 z-50">
//       <div className="flex items-center space-x-2">
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="rounded-full bg-travel-soft-green hover:bg-travel-soft-green/80"
//           onClick={onNewProject}
//         >
//           <FolderPlusIcon className="h-5 w-5" />
//           <span className="sr-only">New Project</span>
//         </Button>
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="rounded-full bg-travel-soft-blue hover:bg-travel-soft-blue/80"
//           onClick={() => fileInputRef.current?.click()}
//         >
//           <ImageIcon className="h-5 w-5" />
//           <span className="sr-only">Upload Image</span>
//         </Button>
//         <input 
//           type="file" 
//           ref={fileInputRef} 
//           className="hidden" 
//           accept="image/*" 
//           onChange={handleImageUpload} 
//         />
        
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="rounded-full bg-travel-soft-peach hover:bg-travel-soft-peach/80"
//           onClick={onAddText}
//         >
//           <TextIcon className="h-5 w-5" />
//           <span className="sr-only">Add Text</span>
//         </Button>
        
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="rounded-full bg-destructive/10 hover:bg-destructive/20"
//           onClick={onDelete}
//         >
//           <TrashIcon className="h-5 w-5" />
//           <span className="sr-only">Delete Element</span>
//         </Button>
//       </div>
      
//       <div className="h-6 w-px bg-gray-200"></div>
      
//       <div className="flex items-center space-x-2">
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="rounded-full bg-travel-soft-yellow hover:bg-travel-soft-yellow/80"
//           onClick={onSave}
//         >
//           <SaveIcon className="h-5 w-5" />
//           <span className="sr-only">Save</span>
//         </Button>
        
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="rounded-full bg-travel-purple text-white hover:bg-travel-dark-purple"
//           onClick={onExportPDF}
//         >
//           <FileTextIcon className="h-5 w-5" />
//           <span className="sr-only">Export PDF</span>
//         </Button>

//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="rounded-full bg-travel-purple text-white hover:bg-travel-dark-purple"
//           onClick={onGenerateVideo}
//         >
//           <VideoIcon className="h-5 w-5" />
//           <span className="sr-only">Generate Video</span>
//         </Button>
//       </div>
//     </div>
//   );
// };

// export default Toolbar;
