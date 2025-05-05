// simport React, { useEffect, useState } from "react";
// import { Progress } from "@/components/ui/progress";
// import { SaveIcon, LoaderCircle } from "lucide-react";
// import { cn } from "@/lib/utils";

// interface SaveAnimationProps {
//   saving: boolean;
//   onComplete: () => void;
// }

// const SaveAnimation: React.FC<SaveAnimationProps> = ({ saving, onComplete }) => {
//   const [progress, setProgress] = useState(0);
//   const [message, setMessage] = useState("Preparing to save...");

//   useEffect(() => {
//     let interval: NodeJS.Timeout;

//     if (saving) {
//       setProgress(0);
//       setMessage("Preparing to save...");

//       interval = setInterval(() => {
//         setProgress((prev) => {
//           const next = prev + 5;

//           if (next < 30) setMessage("Preparing your story...");
//           else if (next < 60) setMessage("Saving your memories...");
//           else if (next < 90) setMessage("Finalizing your travel journal...");
//           else if (next >= 100) setMessage("Journal saved successfully!");
          
//           if (next >= 100) {
//             clearInterval(interval);
//             setTimeout(() => {
//               onComplete?.();
//             }, 1000);
//           }

//           return next >= 100 ? 100 : next;
//         });
//       }, 100);
//     } else {
//       setProgress(0);
//     }

//     return () => clearInterval(interval);
//   }, [saving, onComplete]);

//   if (!saving) return null;

//   return (
//     <div className="fixed inset-0 flex items-center justify-center z-50 bg-black/40 backdrop-blur-sm">
//       <div className="bg-white rounded-lg p-6 shadow-xl w-full max-w-md flex flex-col items-center">
//         <div className="mb-6 text-travel-purple">
//           {progress < 100 ? (
//             <div className="animate-spin">
//               <LoaderCircle className="h-12 w-12" />
//             </div>
//           ) : (
//             <div className="animate-bounce">
//               <SaveIcon className="h-12 w-12" />
//             </div>
//           )}
//         </div>

//         <h2 className="text-xl font-semibold text-center mb-4 text-travel-purple">
//           {message}
//         </h2>

//         <div className="w-full mb-4">
//           <Progress value={progress} className="h-2" />
//         </div>

//         <p className="text-sm text-gray-500">
//           {progress < 100 ? `${progress}% complete` : "Complete"}
//         </p>
//       </div>
//     </div>
//   );
// };

// export default SaveAnimation;
