import { motion } from "motion/react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import { Briefcase, GraduationCap } from "lucide-react";

export const Scene3_Transition = () => {
  const navigate = useNavigate();
  const userType = useAppStore((state) => state.userType);

  useEffect(() => {
    const timer = setTimeout(() => {
      navigate('/learning');
    }, 2500);
    return () => clearTimeout(timer);
  }, [navigate]);

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white"
    >
      <div className="flex flex-col items-center space-y-6">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 2, repeat: Infinity, ease: "linear" }}
          className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full"
        />
        <h2 className="text-2xl font-bold">
          {userType === 'worker' ? '직장인' : '학생'} 모드로 전환 중...
        </h2>
        <div className="flex items-center gap-4 text-slate-400">
            {userType === 'worker' ? <Briefcase /> : <GraduationCap />}
            <span>맞춤형 커리큘럼 로딩 중</span>
        </div>
      </div>
    </motion.div>
  );
};
