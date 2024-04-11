import React, { useState } from 'react';
import { useParams } from 'react-router-dom';
import { apiSubmitAssignment } from '../../apis';
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { Tabs } from "flowbite-react";

const MySubmit = () => {
  const { aid } = useParams();
  const { current } = useSelector(state => state.user);

  const [preview, setPreview] = useState({
    comment: '',
    files: []
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPreview(prevState => ({
      ...prevState,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const newFiles = Array.from(e.target.files);
    setPreview(prevState => ({
      ...prevState,
      files: [...prevState.files, ...newFiles]
    }));
  };

  const handleRemoveFile = (index) => {
    setPreview(prevState => ({
      ...prevState,
      files: prevState.files.filter((_, fileIndex) => fileIndex !== index)
    }));
  };

  const renderFileList = () => {
    return preview.files.map((file, index) => (
      <div key={index} className="mb-2">
        <span>{file.name}</span>
        <button className='pl-[10px]' onClick={() => handleRemoveFile(index)}>Xóa</button>
      </div>
    ));
  };

  const handleSubmitAssignment = async () => {
    const formData = new FormData();
    formData.append('comment', preview.comment);
    formData.append('postedBy', current?._id);

    preview.files.forEach((file, index) => {
      formData.append(`files`, file); // Fixed: Use 'files' as field name
    });

    const response = await apiSubmitAssignment(formData, aid);
    if (response.status) {
      toast.success(response.mes)
    } else {
      toast.error(response.mes)
    }
  };

  // handle quiz
  const [quizQuestions, setQuizQuestions] = useState([]);
  const [quizAnswers, setQuizAnswers] = useState(new Array(quizQuestions.length).fill(null));

  // useEffect(() => {
  //   const fetchQuizQuestions = async () => {
  //     try {
  //       const response = await apiGetQuizQuestions(); // Gọi API để lấy danh sách câu hỏi
  //       setQuizQuestions(response.data); // Cập nhật state với danh sách câu hỏi từ API
  //       setQuizAnswers(new Array(response.data.length).fill(null)); // Khởi tạo một mảng trống để lưu câu trả lời
  //     } catch (error) {
  //       console.error('Error fetching quiz questions:', error);
  //     }
  //   };
  //   fetchQuizQuestions();
  // }, []); // useEffect chỉ chạy một lần khi component được mount

  const handleAnswerSelection = (index, optionIndex) => {
    const newAnswers = [...quizAnswers];
    newAnswers[index] = optionIndex;
    setQuizAnswers(newAnswers);
  };

  const handleSubmitQuiz = async () => {
    // Gửi câu trả lời của người dùng lên server
    try {
      // Code gửi câu trả lời
      toast.success("Quiz submitted successfully!");
    } catch (error) {
      console.error('Error submitting quiz:', error);
      toast.error("Failed to submit quiz. Please try again later.");
    }
  };

  return (
    <>
      <h1 className='h-[75px] flex justify-between items-center text-3xl font-bold px-4 border-b bg-gray-200 text-black'>
        <span>My Assignment</span>
      </h1>

      <Tabs aria-label="Default tabs" style="default" className='w-[1200px] flex justify-around'>
        <Tabs.Item title="Assignments">
          <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Submit Assignment</h1>
            <form>
              <div className="mb-4">
                <label htmlFor="comment" className="block text-sm font-medium text-gray-700">Submission Text:</label>
                <textarea id="comment" name="comment" rows="4" value={preview.comment} onChange={handleInputChange} className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
              </div>
              <div className="mb-4">
                <label htmlFor="files" className="block text-sm font-medium text-gray-700">Attach Files:</label>
                <input id="files" name="files" type="file" onChange={handleFileChange} multiple className="mt-1 p-2 border border-gray-300 rounded-md w-full" />
                {renderFileList()}
              </div>
              <button type="button" onClick={handleSubmitAssignment} className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">Submit</button>
            </form>
          </div>
        </Tabs.Item>
        <Tabs.Item title="Quiz">
          <div className="max-w-lg mx-auto mt-10 p-6 bg-white rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Quiz</h1>
            <div>
              {quizQuestions.map((question, index) => (
                <div key={index}>
                  <p>{`Question ${index + 1}: ${question.question}`}</p>
                  {question.options.map((option, optionIndex) => (
                    <div key={optionIndex}>
                      <label>
                        <input
                          type="radio"
                          name={`option-${index}`}
                          value={option}
                          onChange={() => handleAnswerSelection(index, optionIndex)}
                          checked={quizAnswers[index] === optionIndex}
                        />
                        {option}
                      </label>
                    </div>
                  ))}
                </div>
              ))}
            </div>
            <button onClick={handleSubmitQuiz}>Submit</button>
          </div>
        </Tabs.Item>
      </Tabs>
    </>
  );
};

export default MySubmit;
