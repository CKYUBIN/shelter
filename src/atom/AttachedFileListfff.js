import axios from 'api/axios';
import { useState } from 'react';
import { Button, Form } from 'react-bootstrap';
import AttachFile from './AttachFile';

export default function AttachFileList({ writer, listAttach, setListAttach }) {
  const thumbnailRequestTarget = ["video", "image"];
  //검사 장치
  const [contentFilter, setContentFilter] = useState([]);
  //지금까지 선택한 파일 기억장치. 업로드 용도
  const [attachedFiles, setAttachedFile] = useState([]);
  const [imgSrc, setImgSrc] = useState([]);

  const [attachedFileUrls, setAttachedFileUrls] = useState([]);
  const justUrl = [];

  function onFileSelect(finedAndHeaders) {
    let files = [], headers = [];
    finedAndHeaders.forEach(({ file, header }) => {
      if (!contentFilter.includes(header) && !headers.includes(header)) {
        files.push(file);
        headers.push(header);
      }
    });
    setContentFilter([...contentFilter, ...headers]);
    setAttachedFile([...attachedFiles, ...files]);
  }

  //지정된 파일들을 axios로 Server로 올리기하면 썸네일로 첨부파일들을 목록으로 보여준다.
  const handleAttach = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    // 동일 key에 여러개 할당 가능?
    Array.from(attachedFiles).forEach((file) => {
      console.log(file);
      formData.append("attachFiles", file);
    });

    try {
      const response = await axios.post(`/upload_multi`, formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
            "x-auth-token": `Bearer ${writer.accessToken}`
          }
        });
      alert("성공");
      console.log(response.data);
      response.data.forEach(afdto => {
        if (thumbnailRequestTarget.includes(afdto.contentType))
          loadThumbnail(afdto);
      });
      setAttachedFileUrls([...attachedFileUrls, ...justUrl]);
      setListAttach([...listAttach, ...response.data]);
    } catch (error) {
      alert("돌아가");
      console.log(error);
    }

  }

  const loadThumbnail = async (afdto) => {
    try {
      const blob = await axios.post(`/anonymous/displayThumbnail`, afdto,
      {   headers: { "Content-Type": "application/json" },
          responseType: "blob"
        }).then(res => res.data);
      console.log(blob);
      const thumbFile = new File([blob], "image", { type: blob.type });
      const imgUrl = URL.createObjectURL(thumbFile);
      setImgSrc(imgUrl);
    } catch (error) {
      console.log(error)
    }
  }

  console.log("그림그리는 중");

  return <Form.Group className="mb-3" >
    <Form.Label htmlFor="username">첨부파일</Form.Label>
    <img src={imgSrc} />
    <AttachFile onFileSelect={onFileSelect} />
    <Button variant="primary" onClick={handleAttach}>
      첨부
    </Button>
  </Form.Group>

}