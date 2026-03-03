import { motion } from "motion/react";
import { User, Briefcase, GraduationCap, ArrowRight, Mic, Play, RefreshCw, CheckCircle2 } from "lucide-react";
import { useAppStore } from "../store";
import { useNavigate } from "react-router-dom";

export const Scene1_Intro = () => {
  const navigate = useNavigate();
  
  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      exit={{ opacity: 0 }}
      className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-6"
    >
      <div className="w-full max-w-md flex flex-col items-center space-y-8">
        <div className="relative w-32 h-32 bg-slate-800 rounded-full flex items-center justify-center border-4 border-slate-700">
          <User className="w-16 h-16 text-slate-500" />
        </div>
        
        <div className="text-center space-y-4">
          <h1 className="text-2xl font-bold">"당신을 가장 잘 설명하는 키워드는 무엇인가요?"</h1>
          <p className="text-slate-400">신분을 선택하여 맞춤형 시험을 시작하세요.</p>
        </div>

        <button 
          onClick={() => navigate('/select')}
          className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all flex items-center gap-2"
        >
          시작하기 <ArrowRight className="w-4 h-4" />
        </button>
      </div>
    </motion.div>
  );
};

export const Scene2_Selection = () => {
  const navigate = useNavigate();
  const setUserType = useAppStore((state) => state.setUserType);

  const handleSelect = (type: 'worker' | 'student') => {
    setUserType(type);
    navigate('/transition');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="flex flex-col items-center justify-center h-screen bg-slate-900 text-white p-6 relative"
    >
      <button 
        onClick={() => navigate('/')}
        className="absolute top-6 left-6 text-slate-400 hover:text-white flex items-center gap-2"
      >
        <ArrowRight className="w-4 h-4 rotate-180" /> 뒤로가기
      </button>

      <h2 className="text-xl mb-8 text-slate-300">신분을 선택하세요</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 w-full max-w-2xl">
        <button 
          onClick={() => handleSelect('worker')}
          className="group flex flex-col items-center justify-center p-8 bg-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-2xl transition-all hover:bg-slate-750"
        >
          <Briefcase className="w-16 h-16 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold">직장인</span>
          <span className="text-sm text-slate-400 mt-2">직장, 업무, 동료 관련 표현</span>
        </button>

        <button 
          onClick={() => handleSelect('student')}
          className="group flex flex-col items-center justify-center p-8 bg-slate-800 border-2 border-slate-700 hover:border-blue-500 rounded-2xl transition-all hover:bg-slate-750"
        >
          <GraduationCap className="w-16 h-16 text-blue-400 mb-4 group-hover:scale-110 transition-transform" />
          <span className="text-xl font-bold">학생</span>
          <span className="text-sm text-slate-400 mt-2">전공, 캠퍼스, 수업 관련 표현</span>
        </button>
      </div>
    </motion.div>
  );
};
