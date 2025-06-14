import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import UploadList from '../components/UploadList';
import DiscussionList from '../components/DiscussionList';
import LabList from '../components/LabList';
import Navbar from '../components/Navbar';

export default function Subject() {
  const { subjectId } = useParams();
  return (
    <div>
      <Navbar/>
      <h1>Subject Detail</h1>
      <div className="grid grid-cols-3 gap-4">
        <div><UploadList subjectId={subjectId}/></div>
        <div><DiscussionList subjectId={subjectId}/></div>
        <div><LabList subjectId={subjectId}/></div>
      </div>
    </div>
  );
}
