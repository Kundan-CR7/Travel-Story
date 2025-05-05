// import React from 'react';
// import { AbsoluteFill, useCurrentFrame, interpolate } from 'remotion';

// export interface TravelStoryVideoProps {
//   elements: Array<{
//     id: string;
//     type: 'image' | 'text';
//     content: string;
//     x: number;
//     y: number;
//     width: number;
//     height: number;
//     rotation: number;
//     zIndex: number;
//     fontFamily?: string;
//     fontSize?: number;
//     color?: string;
//   }>;
// }

// export const TravelStoryVideo: React.FC<TravelStoryVideoProps> = ({ elements }) => {
//   const frame = useCurrentFrame();
//   const duration = 300; // 10 seconds at 30fps
  
//   return (
//     <AbsoluteFill style={{ backgroundColor: 'white' }}>
//       {elements.map((element, index) => {
//         const startFrame = index * 20; // Stagger the entrance of each element
        
//         // Animation for opacity and scaling
//         const opacity = interpolate(frame, [startFrame, startFrame + 30], [0, 1], {
//           extrapolateLeft: 'clamp',
//           extrapolateRight: 'clamp',
//         });

//         const scale = interpolate(frame, [startFrame, startFrame + 30], [0.8, 1], {
//           extrapolateLeft: 'clamp',
//           extrapolateRight: 'clamp',
//         });

//         // Slide animation from off-screen
//         const slideIn = interpolate(frame, [startFrame, startFrame + 30], [500, 0], {
//           extrapolateLeft: 'clamp',
//           extrapolateRight: 'clamp',
//         });

//         const style: React.CSSProperties = {
//           position: 'absolute',
//           left: `${element.x + slideIn}px`, // Apply slide effect to the element
//           top: `${element.y}px`,
//           width: `${element.width}px`,
//           height: `${element.height}px`,
//           transform: `rotate(${element.rotation}deg) scale(${scale})`,
//           opacity,
//           zIndex: element.zIndex,
//         };

//         if (element.type === 'image') {
//           return (
//             <img
//               key={element.id}
//               src={element.content}
//               style={style}
//               alt="Travel story element"
//             />
//           );
//         } else {
//           return (
//             <div
//               key={element.id}
//               style={{
//                 ...style,
//                 fontFamily: element.fontFamily,
//                 fontSize: `${element.fontSize}px`,
//                 color: element.color,
//                 display: 'flex',
//                 alignItems: 'center',
//                 justifyContent: 'center',
//                 textAlign: 'center',
//               }}
//             >
//               {element.content}
//             </div>
//           );
//         }
//       })}
//     </AbsoluteFill>
//   );
// };

// // Define the composition
// export const TravelStoryComposition = {
//   id: 'TravelStory',
//   component: TravelStoryVideo,
//   durationInFrames: 300,
//   fps: 30,
//   width: 1920,
//   height: 1080,
//   defaultProps: {
//     elements: [],
//   },
//   props: {
//     elements: [],
//   },
//   defaultCodec: 'h264' as const,
//   defaultOutName: 'travel-story.mp4',
// } as const; 
