
// import React, { useState } from "react";
// import {
//   Popover,
//   PopoverContent,
//   PopoverTrigger,
// } from "@/components/ui/popover";
// import { Button } from "@/components/ui/button";
// import { Input } from "@/components/ui/input";
// import { Slider } from "@/components/ui/slider";
// import { Settings2 } from "lucide-react";

// interface TextOptionsModalProps {
//   fontSize: number;
//   color: string;
//   fontFamily: string;
//   onFontSizeChange: (size: number) => void;
//   onColorChange: (color: string) => void;
//   onFontFamilyChange: (fontFamily: string) => void;
// }

// const TextOptionsModal: React.FC<TextOptionsModalProps> = ({
//   fontSize,
//   color,
//   fontFamily,
//   onFontSizeChange,
//   onColorChange,
//   onFontFamilyChange,
// }) => {
//   const [localFontSize, setLocalFontSize] = useState(fontSize);
  
//   const handleFontSizeChange = (value: number[]) => {
//     setLocalFontSize(value[0]);
//     onFontSizeChange(value[0]);
//   };

//   const fontFamilies = ["Caveat", "Inter", "serif", "monospace", "cursive"];
  
//   return (
//     <Popover>
//       <PopoverTrigger asChild>
//         <Button 
//           variant="outline" 
//           size="icon" 
//           className="absolute top-0 right-0 bg-white bg-opacity-80 z-30 h-8 w-8"
//         >
//           <Settings2 className="h-4 w-4" />
//           <span className="sr-only">Text options</span>
//         </Button>
//       </PopoverTrigger>
//       <PopoverContent className="w-80">
//         <div className="space-y-4">
//           <h4 className="font-medium leading-none">Text Options</h4>
          
//           <div className="space-y-2">
//             <div className="flex items-center justify-between">
//               <span className="text-sm">Font Size: {localFontSize}px</span>
//             </div>
//             <Slider
//               value={[localFontSize]}
//               min={10}
//               max={72}
//               step={1}
//               onValueChange={handleFontSizeChange}
//             />
//           </div>
          
//           <div className="space-y-2">
//             <label className="text-sm">Text Color</label>
//             <div className="flex items-center gap-2">
//               <Input
//                 type="color"
//                 value={color}
//                 onChange={(e) => onColorChange(e.target.value)}
//                 className="w-10 h-10 p-1 cursor-pointer"
//               />
//               <Input
//                 type="text"
//                 value={color}
//                 onChange={(e) => onColorChange(e.target.value)}
//                 className="flex-1"
//                 placeholder="#000000"
//               />
//             </div>
//           </div>
          
//           <div className="space-y-2">
//             <label className="text-sm">Font Family</label>
//             <div className="grid grid-cols-1 gap-2">
//               {fontFamilies.map((font) => (
//                 <Button
//                   key={font}
//                   variant={fontFamily === font ? "default" : "outline"}
//                   className="justify-start"
//                   style={{ fontFamily: font }}
//                   onClick={() => onFontFamilyChange(font)}
//                 >
//                   {font}
//                 </Button>
//               ))}
//             </div>
//           </div>
//         </div>
//       </PopoverContent>
//     </Popover>
//   );
// };

// export default TextOptionsModal;
