import { motion } from "motion/react";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppStore } from "../store";
import { CheckCircle2, RefreshCw, Home, Star } from "lucide-react";
import { generateFeedback } from "../services/gemini";

export const Feedback_Result = () => {
  const navigate = useNavigate();
  const { examQuestions, reset } = useAppStore();
  const [feedback, setFeedback] = useState<string | null>(null);

  useEffect(() => {
    const fetchFeedback = async () => {
      if (examQuestions.length === 0) {
        navigate('/');
        return;
      }
      // Mock transcript for demo purposes since we didn't implement full STT
      const mockTranscript = "I work at a tech company. My company is very big and has many people. I am a software engineer.";
      const result = await generateFeedback(examQuestions[0] || "Tell me about your company", mockTranscript);
      setFeedback(result);
    };
    fetchFeedback();
  }, [examQuestions]);

  const handleHome = () => {
    reset();
    navigate('/');
  };

  return (
    <motion.div 
      initial={{ opacity: 0 }} 
      animate={{ opacity: 1 }} 
      className="min-h-screen bg-slate-50 p-6 flex flex-col items-center"
    >
      <div className="max-w-3xl w-full space-y-6">
        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100 text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4 text-green-600">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h1 className="text-2xl font-bold text-slate-900 mb-2">학습 완료!</h1>
          <p className="text-slate-500">Ava 선생님의 맞춤형 피드백입니다.</p>
        </div>

        <div className="bg-white p-8 rounded-3xl shadow-sm border border-slate-100">
          <h2 className="text-lg font-bold text-slate-900 mb-6 flex items-center gap-2">
            <Star className="w-5 h-5 text-yellow-500 fill-current" />
            AI 피드백
          </h2>
          
          {feedback ? (
            <div className="prose prose-slate max-w-none">
              <div className="whitespace-pre-wrap text-slate-700 leading-relaxed">
                {feedback}
              </div>
            </div>
          ) : (
            <div className="flex items-center justify-center py-12">
              <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
            </div>
          )}
        </div>

        <div className="flex gap-4 justify-center">
          <button 
            onClick={handleHome}
            className="px-6 py-3 bg-white border border-slate-200 hover:bg-slate-50 rounded-xl font-medium text-slate-600 flex items-center gap-2 transition-colors"
          >
            <Home className="w-4 h-4" /> 홈으로
          </button>
          <button 
            onClick={() => navigate('/learning')}
            className="px-6 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-xl font-medium flex items-center gap-2 transition-colors"
          >
            <RefreshCw className="w-4 h-4" /> 다시 연습하기
          </button>
        </div>
      </div>
    </motion.div>
  );
};
