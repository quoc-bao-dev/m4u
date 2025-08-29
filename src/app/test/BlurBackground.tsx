import { motion } from 'framer-motion';

const BlurBackground = () => {
  return (
    <div className="fixed inset-0 overflow-hidden pointer-events-none">
      {/* Hình tròn blur đầu tiên - #97E6FF - Góc trên phải */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: '#97E6FF',
          filter: 'blur(100px)',
          width: '100px',
          height: '300px',
          top: '5%',
          right: '10%',
        }}
        animate={{
          x: [-8, 8, -8],
          y: [-6, 6, -6],
          scale: [0.95, 1.05, 0.95],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: 'easeInOut',
        }}
      />

      {/* Hình tròn blur thứ hai - #A690FC - Giữa bên phải */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: '#A690FC',
          filter: 'blur(120px)',
          width: '50px',
          height: '250px',
          top: '40%',
          right: '5%',
        }}
        animate={{
          x: [-10, 10, -10],
          y: [-8, 8, -8],
          scale: [0.9, 1.1, 0.9],
        }}
        transition={{
          duration: 15,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 1,
        }}
      />

      {/* Hình oval blur thứ ba - #FC96BB75 - Dưới bên trái (hồng) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: '#A690FC',
          filter: 'blur(80px)',
          width: '1400px',
          height: '700px',
          bottom: '10%',
          left: '5%',
          opacity: 0.3,
        }}
        animate={{
          x: [-220, -200, -220],
          y: [400, 350, 400],
          scale: [0.98, 1.02, 0.98],
          rotate: [20, 25, 20],
        }}
        transition={{
          duration: 18,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 2,
        }}
      />

      {/* Hình tròn blur thứ tư - #FFC39747 - Dưới giữa (vàng) */}
      <motion.div
        className="absolute rounded-full"
        style={{
          background: '#FFC39747',
          filter: 'blur(90px)',
          width: '350px',
          height: '350px',
          bottom: '15%',
          right: '25%',
        }}
        animate={{
          x: [-7, 7, -7],
          y: [-5, 5, -5],
          scale: [0.96, 1.04, 0.96],
        }}
        transition={{
          duration: 14,
          repeat: Infinity,
          ease: 'easeInOut',
          delay: 0.5,
        }}
      />
    </div>
  );
};
export default BlurBackground;
