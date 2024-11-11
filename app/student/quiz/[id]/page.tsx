'use client';

import { useEffect, useState, use } from 'react';
import { useRouter } from 'next/navigation';
import { Quiz } from '@/types';
import Loading from '@/app/components/ui/Loading';
import QuizHeader from '@/app/components/quiz/take/QuizHeader';
import QuizQuestion from '@/app/components/quiz/take/QuizQuestion';
import QuizNavigation from '@/app/components/quiz/take/QuizNavigation';
import QuizResults from '@/app/components/quiz/take/QuizResults';
import QuizError from '@/app/components/quiz/take/QuizError';
import DetailedAnswers from '@/app/components/quiz/DetailedAnswers';

type ViewState = 'quiz' | 'results' | 'detailed-answers';

export default function TakeQuiz({ params }: { params: Promise<{ id: string }> }) {
  const { id } = use(params);
  const router = useRouter();
  const [quiz, setQuiz] = useState<Quiz | null>(null);
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [viewState, setViewState] = useState<ViewState>('quiz');
  const [score, setScore] = useState(0);
  const [timeLeft, setTimeLeft] = useState<number>(300);
  const [isTimeUp, setIsTimeUp] = useState(false);

  const fetchQuiz = async () => {
    try {
      const response = await fetch(`/api/quiz/${id}`);
      if (!response.ok) throw new Error('Failed to fetch quiz');
      const data = await response.json();
      setQuiz(data.data);
      setAnswers(new Array(data.data.questions.length).fill(-1));
      setCurrentQuestion(0);
      setViewState('quiz');
      setScore(0);
    } catch (err) {
      setError('Failed to load quiz');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQuiz();
  }, [id]);

  useEffect(() => {
    if (!quiz || viewState !== 'quiz') return;

    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if (prev <= 1) {
          clearInterval(timer);
          setIsTimeUp(true);
          handleTimeUp();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [quiz, viewState]);

  const handleTimeUp = async () => {
    if (!quiz) return;
    await submitQuiz(true);
  };

  const handleAnswer = (optionIndex: number) => {
    const newAnswers = [...answers];
    newAnswers[currentQuestion] = optionIndex;
    setAnswers(newAnswers);
  };

  const submitQuiz = async (timeUp: boolean = false) => {
    if (!quiz) return;
    try {
      let correctAnswers = 0;
      const results = answers.map((answer, index) => {
        const isCorrect = answer === quiz.questions[index].correctOption;
        if (isCorrect) correctAnswers++;
        return {
          questionId: quiz.questions[index].id,
          selectedOption: answer,
          correct: isCorrect,
        };
      });

      const finalScore = Math.round((correctAnswers / quiz.questions.length) * 100);
      setScore(finalScore);

      const response = await fetch('/api/quiz/submit', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          quizId: quiz._id,
          answers: results,
          score: finalScore,
          timeUp,
        }),
      });

      if (!response.ok) throw new Error('Failed to submit quiz');
      setViewState('results');
    } catch (error) {
      console.error('Error submitting quiz:', error);
      setError('Failed to submit quiz');
    }
  };

  const handleSubmit = () => submitQuiz(false);

  if (loading) return <Loading />;
  if (error) return <QuizError message={error} />;
  if (!quiz) return <QuizError message="Quiz not found" />;

  if (viewState === 'detailed-answers') {
    return (
      <DetailedAnswers
        quiz={quiz}
        answers={answers}
        onBack={() => setViewState('results')}
      />
    );
  }

  if (viewState === 'results') {
    return (
      <QuizResults
        quiz={quiz}
        score={score}
        answers={answers}
        timeLeft={timeLeft}
        isTimeUp={isTimeUp}
        onViewDetailedAnswers={() => setViewState('detailed-answers')}
        onTryAgain={() => {
          setAnswers(new Array(quiz.questions.length).fill(-1));
          setCurrentQuestion(0);
          setViewState('quiz');
          setScore(0);
          setTimeLeft(300);
          setIsTimeUp(false);
        }}
      />
    );
  }

  const question = quiz.questions[currentQuestion];

  return (
    <div className="max-w-xl mx-auto px-4 py-6 animate-fade-in">
      <div className="card p-6">
        <QuizHeader
          title={quiz.title}
          currentQuestion={currentQuestion}
          totalQuestions={quiz.questions.length}
          timeLeft={timeLeft}
        />

        <QuizQuestion
          question={question}
          selectedAnswer={answers[currentQuestion]}
          onAnswerSelect={handleAnswer}
        />

        <QuizNavigation
          currentQuestion={currentQuestion}
          totalQuestions={quiz.questions.length}
          canGoNext={answers[currentQuestion] !== -1}
          canSubmit={!answers.includes(-1)}
          onPrevious={() => setCurrentQuestion(curr => curr - 1)}
          onNext={() => setCurrentQuestion(curr => curr + 1)}
          onSubmit={handleSubmit}
        />
      </div>
    </div>
  );
}