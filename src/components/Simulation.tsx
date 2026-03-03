import { motion } from "motion/react";
import { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import { User, Volume2, Mic, Square, Play, SkipForward } from "lucide-react";
import { generateQuestions } from "../services/gemini";
import { speak } from "../lib/utils";

export const Simulation_Exam = () => {
  const navigate = useNavigate();
  const { userType, setExamQuestions, examQuestions } = useAppStore();
  const [currentQIndex, setCurrentQIndex] = useState(0);
  const [isRecording, setIsRecording] = useState(false);
  const [timer, setTimer] = useState(0);
  const [loading, setLoading] = useState(true);

  // Mock audio visualization
  const [audioLevel, setAudioLevel] = useState(0);

  useEffect(() => {
    const loadQuestions = async () => {
      if (!userType) {
        navigate('/'); // Redirect if no user type
        return;
      }
      if (examQuestions.length === 0) {
        const questions = await generateQuestions(userType);
        setExamQuestions(questions);
      }
      setLoading(false);
    };
    loadQuestions();
  }, [userType, navigate, setExamQuestions, examQuestions.length]);

  // Auto-play question audio when question changes
  useEffect(() => {
    if (!loading && examQuestions.length > 0) {
      const timer = setTimeout(() => {
        speak(examQuestions[currentQIndex]);
      }, 500); // Slight delay for better UX
      return () => clearTimeout(timer);
    }
  }, [currentQIndex, loading, examQuestions]);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isRecording) {
      interval = setInterval(() => {
        setTimer(t => t + 1);
        setAudioLevel(Math.random() * 100);
      }, 1000);
    } else {
      setTimer(0);
      setAudioLevel(0);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleNext = () => {
    window.speechSynthesis.cancel(); // Stop audio if playing
    if (currentQIndex < (examQuestions.length - 1)) {
      setCurrentQIndex(prev => prev + 1);
      setIsRecording(false);
    } else {
      navigate('/feedback');
    }
  };

  const toggleRecording = () => {
    setIsRecording(!isRecording);
  };

  const handleReplay = () => {
    speak(examQuestions[currentQIndex]);
  };

  if (loading) {
    return (
      <div className="h-screen flex items-center justify-center bg-slate-100">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <div className="h-screen flex flex-col md:flex-row bg-slate-100 overflow-hidden">
      {/* Left: Exam Interface */}
      <div className="flex-1 flex flex-col p-4 md:p-6 relative">
        {/* Header */}
        <div className="bg-slate-900 text-white p-4 rounded-t-2xl flex justify-between items-center">
          <div className="flex items-center gap-2 font-bold">
            <span className="bg-yellow-500 text-black px-1 rounded text-xs">AZ</span>
            <span>ACTFL OPIc</span>
          </div>
          <div className="text-sm text-slate-400">문제 {currentQIndex + 1} / {examQuestions.length}</div>
        </div>

        {/* Main Content */}
        <div className="bg-white flex-1 rounded-b-2xl shadow-sm p-8 flex flex-col items-center justify-center relative">
          {/* Avatar */}
          <div className="w-32 h-32 bg-slate-200 rounded-full flex items-center justify-center mb-8 border-4 border-white shadow-lg">
            <User className="w-16 h-16 text-slate-400" />
          </div>

          {/* Question Card */}
          <div className="w-full max-w-2xl bg-white border border-blue-100 rounded-xl p-6 shadow-sm mb-4">
            <div className="flex justify-between items-start mb-2">
              <h3 className="text-blue-600 font-bold text-lg">메인 질문</h3>
              <Volume2 
                onClick={handleReplay}
                className="w-5 h-5 text-slate-400 cursor-pointer hover:text-blue-500 transition-colors" 
              />
            </div>
            <p className="text-slate-800 font-medium text-lg leading-relaxed">
              "{examQuestions[currentQIndex]}"
            </p>
          </div>

          {/* Recording Bar */}
          <div className={`w-full max-w-2xl mt-8 p-4 rounded-full flex items-center justify-between transition-colors ${isRecording ? 'bg-red-100' : 'bg-slate-100'}`}>
            <div className="flex items-center gap-4">
              <div className={`w-3 h-3 rounded-full ${isRecording ? 'bg-red-500 animate-pulse' : 'bg-slate-400'}`} />
              <span className={`font-mono font-bold ${isRecording ? 'text-red-600' : 'text-slate-500'}`}>
                {isRecording ? '녹음 중...' : '준비'}
              </span>
              <span className="font-mono text-slate-600">
                {Math.floor(timer / 60).toString().padStart(2, '0')}:{(timer % 60).toString().padStart(2, '0')}
              </span>
            </div>
            
            <button 
              onClick={toggleRecording}
              className={`p-3 rounded-full transition-all ${isRecording ? 'bg-red-500 text-white hover:bg-red-600' : 'bg-blue-500 text-white hover:bg-blue-600'}`}
            >
              {isRecording ? <Square className="w-5 h-5 fill-current" /> : <Mic className="w-5 h-5" />}
            </button>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-8 right-8 flex gap-4">
            <button 
              onClick={handleReplay}
              className="px-6 py-2 bg-slate-100 hover:bg-slate-200 rounded-full font-medium text-slate-600 transition-colors"
            >
              다시 듣기
            </button>
            <button 
              onClick={handleNext}
              className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-full font-bold shadow-lg shadow-blue-200 transition-all flex items-center gap-2"
            >
              다음 <SkipForward className="w-4 h-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Right: Timeline (Hidden on mobile) */}
      <div className="hidden md:flex w-80 bg-white border-l border-slate-200 flex-col p-6 overflow-y-auto">
        <h3 className="font-bold text-slate-800 mb-6">진행 순서</h3>
        
        <div className="relative pl-8 border-l-2 border-slate-100 space-y-8">
          {/* Step 1 */}
          <div className="relative">
            <div className="absolute -left-[41px] w-10 h-10 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center text-xs font-bold text-blue-600">
              0:00
            </div>
            <h4 className="font-bold text-slate-800">질문 청취 & 준비</h4>
            <p className="text-sm text-slate-500 mt-1">메인 질문을 주의 깊게 들으세요.</p>
          </div>

          {/* Step 2 */}
          <div className="relative">
            <div className="absolute -left-[41px] w-10 h-10 rounded-full border-2 border-blue-500 bg-white flex items-center justify-center text-xs font-bold text-blue-600">
              0:10
            </div>
            <h4 className="font-bold text-slate-800">1차 답변</h4>
            <p className="text-sm text-slate-500 mt-1">회사 소개, 위치, 규모 등 묘사 (60~90초)</p>
          </div>

          {/* Step 3 */}
          <div className="relative">
            <div className="absolute -left-[41px] w-10 h-10 rounded-full border-2 border-yellow-500 bg-white flex items-center justify-center text-xs font-bold text-yellow-600">
              1:40
            </div>
            <h4 className="font-bold text-slate-800">꼬리 질문</h4>
            <p className="text-sm text-slate-500 mt-1">구체적인 업무는 무엇인가요?</p>
          </div>

           {/* Step 4 */}
           <div className="relative">
            <div className="absolute -left-[41px] w-10 h-10 rounded-full border-2 border-green-500 bg-white flex items-center justify-center text-xs font-bold text-green-600">
              End
            </div>
            <h4 className="font-bold text-slate-800">피드백</h4>
            <p className="text-sm text-slate-500 mt-1">강사 피드백 & 다음 단계</p>
          </div>
        </div>
      </div>
    </div>
  );
};
