import { motion, AnimatePresence } from "motion/react";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import { ArrowRight, Mic, Play, RefreshCw, CheckCircle2, Box, Users, ShieldCheck, User, Briefcase, X, Volume2 } from "lucide-react";
import { speak } from "../lib/utils";

export const Learning_Keywords = () => {
  const navigate = useNavigate();
  const userType = useAppStore((state) => state.userType);
  const [showDetailModal, setShowDetailModal] = useState(false);
  const [isAutoRecommending, setIsAutoRecommending] = useState(false);

  const keywords = userType === 'worker' ? [
    { id: 1, word: "Deadline", desc: "마감 기한 맞추기", icon: Box },
    { id: 2, word: "Collaboration", desc: "타 부서와 협업", icon: Users },
    { id: 3, word: "Responsibility", desc: "내 업무의 책임", icon: ShieldCheck },
  ] : [
    { id: 1, word: "Assignment", desc: "과제 및 프로젝트", icon: Box },
    { id: 2, word: "Professor", desc: "교수님 및 학업 지도", icon: Users },
    { id: 3, word: "Major", desc: "전공 분야", icon: ShieldCheck },
  ];

  const handleAutoRecommend = () => {
    setIsAutoRecommending(true);
    setTimeout(() => {
      setIsAutoRecommending(false);
      navigate('/exam');
    }, 1500);
  };

  const handlePlayShadowing = () => {
    speak("Deadline. I have to meet the deadline.");
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-slate-50 p-6 flex flex-col md:flex-row gap-6 relative"
    >
      {/* Detail Modal */}
      <AnimatePresence>
        {showDetailModal && (
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setShowDetailModal(false)}
          >
            <motion.div 
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-xl font-bold text-slate-900">
                  {userType === 'worker' ? '직장인 과정 상세' : '학생 과정 상세'}
                </h3>
                <button onClick={() => setShowDetailModal(false)} className="p-2 hover:bg-slate-100 rounded-full">
                  <X className="w-5 h-5 text-slate-500" />
                </button>
              </div>
              
              <div className="space-y-4 text-slate-600 mb-8">
                <p>이 과정은 <strong>{userType === 'worker' ? '실무 비즈니스 영어' : '캠퍼스 라이프 영어'}</strong>에 초점을 맞춥니다.</p>
                <ul className="list-disc pl-5 space-y-2">
                  <li>빈출 키워드 30개 마스터</li>
                  <li>원어민 쉐도잉 훈련 10회</li>
                  <li>실전 모의고사 3회 제공</li>
                </ul>
              </div>

              <button 
                onClick={() => { setShowDetailModal(false); navigate('/exam'); }}
                className="w-full py-3 bg-blue-600 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors"
              >
                바로 시작하기
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Left: Keywords */}
      <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">핵심 키워드</h2>
        
        <div className="flex flex-col items-center mb-8">
          <div className="w-16 h-16 bg-blue-100 rounded-2xl flex items-center justify-center mb-4 text-blue-600">
            <Box className="w-8 h-8" />
          </div>
          <h3 className="text-xl font-bold text-slate-900">
            {userType === 'worker' ? '직장인 필수 3단어' : '학생 필수 3단어'}
          </h3>
        </div>

        <div className="space-y-4">
          {keywords.map((k, i) => (
            <motion.div 
              key={k.id}
              initial={{ x: -20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: i * 0.1 }}
              onClick={() => speak(k.word)}
              className="flex items-center p-4 bg-slate-50 rounded-2xl hover:bg-blue-50 transition-colors cursor-pointer group"
            >
              <span className="text-2xl font-bold text-blue-600 w-12 text-center">{k.id}</span>
              <div>
                <div className="font-bold text-slate-900 group-hover:text-blue-700 flex items-center gap-2">
                  {k.word} <Volume2 className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                </div>
                <div className="text-sm text-slate-500">{k.desc}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Middle: Shadowing */}
      <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col items-center justify-center text-center relative overflow-hidden">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-auto w-full text-left">쉐도잉 훈련</h2>
        
        <div className="w-24 h-24 border-4 border-blue-500 rounded-lg flex items-center justify-center mb-6 relative group cursor-pointer" onClick={handlePlayShadowing}>
          <span className="text-4xl font-bold text-blue-600">3</span>
          <div className="absolute inset-0 bg-black/5 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center">
            <Volume2 className="w-8 h-8 text-blue-600" />
          </div>
        </div>
        
        <h3 className="text-blue-600 font-bold text-lg mb-8">Speak Out Loud!</h3>
        
        <div className="flex items-center justify-between w-full max-w-xs mb-8 text-sm font-medium text-slate-600">
            <div className="flex items-center gap-2"><User className="w-4 h-4" /> 강사</div>
            <div className="flex items-center gap-2 text-blue-600"><Mic className="w-4 h-4" /> 나</div>
        </div>

        <div className="w-full h-16 bg-blue-50 rounded-full flex items-center justify-center mb-8 cursor-pointer hover:bg-blue-100 transition-colors" onClick={handlePlayShadowing}>
            <div className="flex gap-1 items-end h-8">
                {[...Array(5)].map((_, i) => (
                    <motion.div 
                        key={i}
                        animate={{ height: [10, 24, 10] }}
                        transition={{ duration: 1, repeat: Infinity, delay: i * 0.1 }}
                        className="w-1.5 bg-blue-500 rounded-full"
                    />
                ))}
            </div>
        </div>

        <p className="text-yellow-500 font-bold text-lg mt-auto cursor-pointer hover:underline" onClick={handlePlayShadowing}>deadline</p>
      </div>

      {/* Right: Next Step */}
      <div className="flex-1 bg-white rounded-3xl p-8 shadow-sm border border-slate-100 flex flex-col">
        <h2 className="text-sm font-bold text-slate-400 uppercase tracking-wider mb-8">다음 학습 선택</h2>
        
        <div className="flex flex-col items-center justify-center flex-1 space-y-6">
            <RefreshCw className={`w-12 h-12 text-green-500 mb-2 ${isAutoRecommending ? 'animate-spin' : ''}`} />
            <h3 className="font-bold text-slate-900">
              {isAutoRecommending ? 'AI가 추천 중입니다...' : '다음 학습 선택'}
            </h3>
            
            <button 
                onClick={() => navigate('/exam')}
                className="w-full p-4 bg-blue-50 hover:bg-blue-100 text-blue-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
                <Briefcase className="w-5 h-5" />
                {userType === 'worker' ? '[직장] 관련 표현 더보기' : '[학생] 관련 표현 더보기'}
            </button>
            
            <div className="text-xs font-bold text-slate-400">OR</div>
            
            <button 
                onClick={() => setShowDetailModal(true)}
                className="w-full p-4 bg-green-50 hover:bg-green-100 text-green-700 rounded-2xl font-bold flex items-center justify-center gap-2 transition-colors"
            >
                <CheckCircle2 className="w-5 h-5" />
                {userType === 'worker' ? '[업무] 세부 묘사하기' : '[전공] 세부 묘사하기'}
            </button>
            
            <button 
                onClick={handleAutoRecommend}
                disabled={isAutoRecommending}
                className="w-full p-4 border border-slate-200 rounded-2xl text-slate-500 text-sm flex items-center justify-center gap-2 hover:bg-slate-50 disabled:opacity-50"
            >
                <RefreshCw className={`w-4 h-4 ${isAutoRecommending ? 'animate-spin' : ''}`} />
                하나를 마치면 다른 하나 자동 추천
            </button>
        </div>
      </div>
    </motion.div>
  );
};
