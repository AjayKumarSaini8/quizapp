import React, { useState, useEffect } from "react";
import { resultInitableState } from "../constants";
import trophyImage from "../assets/trophy.png";

const Quiz = ({ questions }) => {
    const [currentQuestion, setCurrentQuestion] = useState(0);
    const [answerIdx, setAnswerIdx] = useState(null);
    const [answer, setAnswer] = useState(null);
    const [result, setResult] = useState(resultInitableState);
    const [showResult, setShowResult] = useState(false);
    const [showAnswers, setShowAnswers] = useState(false);

    const { question, choices, correctAnswer } = questions[currentQuestion];

    useEffect(() => {
        const savedState = JSON.parse(window.localStorage.getItem("quizState")) || {};
        setCurrentQuestion(savedState.currentQuestion || 0);
        setAnswerIdx(savedState.answerIdx || null);
        setAnswer(savedState.answer || null);
        setResult(savedState.result || resultInitableState);
        setShowResult(savedState.showResult || false);
        setShowAnswers(savedState.showAnswers || false);
    }, []);

    useEffect(() => {
        const stateToSave = {
            currentQuestion,
            answerIdx,
            answer,
            result,
            showResult,
            showAnswers,
        };
        window.localStorage.setItem("quizState", JSON.stringify(stateToSave));
    }, [currentQuestion, answerIdx, answer, result, showResult, showAnswers]);

    const onAnswerClick = (answer, index) => {
        setAnswerIdx(index);
        setAnswer(answer === correctAnswer);
    };

    const onClickNext = () => {
        setAnswerIdx(null);
        setResult((prev) => ({
            ...prev,
            correctAnswer: answer ? prev.correctAnswer + 1 : prev.correctAnswer,
        }));
        if (currentQuestion !== questions.length - 1) {
            setCurrentQuestion((prev) => prev + 1);
        } else {
            setShowResult(true);
            setShowAnswers(result.correctAnswer === questions.length);
        }
    };

    const onTryAgain = () => {
        setCurrentQuestion(0);
        setAnswerIdx(null);
        setAnswer(null);
        setResult(resultInitableState);
        setShowResult(false);
        setShowAnswers(false);
    };

    const showAnswer = () => {
        setShowAnswers(true);
    };

    return (
        <div className="quiz-container bg-gray-300 p-8 rounded-lg">
            {!showResult ? (
                <>
                    <span className="block text-lg font-semibold text-gray-700">
                        Question {currentQuestion + 1}/{questions.length}
                    </span>
                    <h2 className="text-2xl font-bold text-gray-800 my-4">{question}</h2>
                    <ul className="space-y-2">
                        {choices.map((choice, index) => (
                            <li
                                key={choice}
                                onClick={() => onAnswerClick(choice, index)}
                                className={`cursor-pointer p-4 lg:size-1/2 rounded-md ${answerIdx === index ? "bg-blue-500 text-white" : "bg-white text-gray-800 hover:bg-gray-200"
                                    }`}
                            >
                                {choice}
                            </li>
                        ))}
                    </ul>
                    <div className="mt-6">
                        <button
                            onClick={onClickNext}
                            disabled={answerIdx === null}
                            className={`py-2 px-4 lg:p rounded-md ${answerIdx === null ? "bg-gray-300 cursor-not-allowed" : "bg-blue-500 hover:bg-blue-600 text-white"
                                }`}
                        >
                            {currentQuestion === questions.length - 1 ? "Finish" : "Next"}
                        </button>
                    </div>
                </>
            ) : (
                <div className="result text-center">
                    {result.correctAnswer === questions.length ? (
                        <>
                            <img src={trophyImage} alt="Trophy" className="mx-auto w-24 h-24" />
                            <h3 className="text-3xl font-bold text-yellow-500">Congratulations!</h3>

                            <>
                                <h3 className="text-3xl font-bold text-gray-800">Result</h3>
                                <p className="text-lg text-gray-700">
                                    Total Questions: <span className="font-bold">{questions.length}</span>
                                </p>
                                <p className="text-lg text-gray-700">
                                    Correct Answers: <span className="font-bold text-green-900">{result.correctAnswer}</span>
                                </p>
                                <div className="mt-6 space-x-4">
                                    <button
                                        onClick={onTryAgain}
                                        className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        Try again
                                    </button>
                                    <button
                                        onClick={showAnswer}
                                        className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                                    >
                                        Show Answer
                                    </button>
                                </div>

                                {showAnswers && (
                                    <div className="answers mt-6">
                                        <h3 className="text-2xl font-bold text-gray-800">Correct Answers</h3>
                                        <ul className="flex flex-col items-start list-disc text-gray-700">
                                            {questions.map((q, index) => (
                                                <li key={index}>
                                                    {q.question}:{" "}
                                                    {q.correctAnswer === answer ? (
                                                        <span className="font-bold text-green-500">{q.correctAnswer}</span>
                                                    ) : (
                                                        <>
                                                            <span className="font-bold text-green-500">{q.correctAnswer}</span>
                                                        </>
                                                    )}
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}
                            </>
                        </>
                    ) : (
                        <>
                            <h3 className="text-3xl font-bold text-gray-800">Result</h3>
                            <p className="text-lg text-gray-700">
                                Total Questions: <span className="font-bold">{questions.length}</span>
                            </p>
                            <p className="text-lg text-gray-700">
                                Correct Answers: <span className="font-bold text-green-500">{result.correctAnswer}</span>
                            </p>
                            <div className="mt-6 space-x-4">
                                <button
                                    onClick={onTryAgain}
                                    className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Try again
                                </button>
                                <button
                                    onClick={showAnswer}
                                    className="py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                                >
                                    Show Answer
                                </button>
                            </div>

                            {showAnswers && (
                                <div className="answers mt-6">
                                    <h3 className="text-2xl font-bold text-gray-800">Correct Answers</h3>
                                    <ul className="flex flex-col items-start list-disc text-gray-700">
                                        {questions.map((q, index) => (
                                            <li key={index}>
                                                {q.question}:{" "}
                                                {q.correctAnswer === answer ? (
                                                    <span className="font-bold text-green-500">{q.correctAnswer}</span>
                                                ) : (
                                                    <>
                                                        <span className="font-bold text-green-500">{q.correctAnswer}</span>
                                                    </>
                                                )}
                                            </li>
                                        ))}
                                    </ul>
                                </div>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Quiz;
