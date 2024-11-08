import React, { useContext, useState } from "react";
import axios from "axios";
import { ReactMediaRecorder } from "react-media-recorder";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';
import { PlayerContext } from "../context/PlayerContext";

function IdentitySong() {
  const [songInfo, setSongInfo] = useState(null);
  const {isLoading, setLoading} = useContext(PlayerContext);
  const [audioFile, setAudioFile] = useState(null);
  const [isRecording, setIsRecording] = useState(false); // Trạng thái ghi âm

  const identifySong = async () => {
    if (!audioFile) {
      alert("Vui lòng chọn hoặc ghi âm file âm thanh trước khi nhận diện.");
      return;
    }

    setIsLoading(true);
    try {
      const formData = new FormData();
      formData.append("upload_file", audioFile, "recording.mp3");

      const response = await axios.post("https://shazam-api6.p.rapidapi.com/shazam/recognize/", formData, {
        headers: {
          'x-rapidapi-key': 'ddd7020a35msh473fc0bb6c8b56ap1dd086jsncad0aed932b6',
          'x-rapidapi-host': 'shazam-api6.p.rapidapi.com',
        }
      });
      setSongInfo(response.data);
    } catch (error) {
      if (error.response) {
        console.error("Lỗi từ API:", error.response.status);
        console.error("Chi tiết lỗi:", error.response.data);
      } else {
        console.error("Lỗi khác:", error.message);
      }
    } finally {
      setIsLoading(false);
    }
  };


  const handleRecordingComplete = async (mediaBlobUrl) => {
    const audioBlob = await fetch(mediaBlobUrl).then((res) => res.blob());
    const audioFile = new File([audioBlob], "recording.mp3", { type: "audio/mp3" });
    setAudioFile(audioFile);
  };

  const toggleRecording = (startRecording, stopRecording, mediaBlobUrl) => {
    if (isRecording) {
      alert("Dừng ghi âm");
      stopRecording();
      handleRecordingComplete(mediaBlobUrl);
    } else {
      alert("Bắt đầu ghi âm");
      startRecording();
    }
    setIsRecording(!isRecording); // Đảo ngược trạng thái ghi âm
  };

  return (
    <div className="App">
      <ReactMediaRecorder
        audio
        render={({ status, startRecording, stopRecording, mediaBlobUrl }) => (
          <div>
            <div
              className="bg-[#333333] w-10 h-10 rounded-full flex justify-center items-center cursor-pointer hover:bg-[#999999]"
              onClick={() => toggleRecording(startRecording, stopRecording, mediaBlobUrl)}
            >
              <FontAwesomeIcon className="text-white" icon={faMicrophone} />
            </div>
          </div>
        )}
      />

      {songInfo && (
        <div>
          <h2>Bài hát được nhận diện:</h2>
          <p>Tên: {songInfo.title}</p>
          <p>Nghệ sĩ: {songInfo.subtitle}</p>
        </div>
      )}
    </div>
  );
}

export default IdentitySong;
