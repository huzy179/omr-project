// 'use client' bắt buộc ở đầu file
"use client";

import { useState, type ChangeEvent } from 'react';
import styles from './page.module.css';

export default function HomePage() {
  // State
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [imageUrl, setImageUrl] = useState<string>('');
  const [noteText, setNoteText] = useState<string>('');
  const [audioUrl, setAudioUrl] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(false);

  // Handlers
  const handleImageChange = (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      setImageFile(file);
      setImageUrl(URL.createObjectURL(file));
      setNoteText('');
      setAudioUrl('');
    }
  };

  const handleGenerateNotes = async () => {
    if (!imageFile) return;

    setIsLoading(true);
    setNoteText('');

    // Giả lập backend (thay bằng API thực tế)
    console.log("Đang giả lập việc gửi ảnh đến BE...");
    await new Promise(resolve => setTimeout(resolve, 2000));
    const dummyNotes = `
Staff 1:
  C4 (đen) | có đuôi | không móc
  E4 (đen) | có đuôi | không móc
  G4 (trắng) | có đuôi | không móc
    `.trim();

    setNoteText(dummyNotes);
    setIsLoading(false);
  };

  const handleCreateMusic = async () => {
    if (!noteText) return;

    setIsLoading(true);
    setAudioUrl('');

    // Giả lập backend (thay bằng API thực tế)
    console.log("Đang giả lập việc gửi text nốt nhạc đến BE...");
    await new Promise(resolve => setTimeout(resolve, 3000));
    // Đảm bảo có /public/dummy-music.mp3 nếu dùng file này
    const dummyAudioPath = '/dummy-music.mp3';

    setAudioUrl(dummyAudioPath);
    setIsLoading(false);
  };

  // UI
  return (
    <main className={styles.mainWrapper}>
      <div className={styles.container}>
        <div className={styles.header}>Trình Nhận diện Nốt nhạc</div>

        <input
          type="file"
          accept="image/*"
          onChange={handleImageChange}
          className={styles.fileInput}
        />

        {imageUrl && (
          /* eslint-disable-next-line @next/next/no-img-element */
          <img
            src={imageUrl}
            alt="Bản nhạc đã tải lên"
            className={styles.imagePreview}
          />
        )}

        <button
          onClick={handleGenerateNotes}
          disabled={!imageFile || isLoading}
          className={styles.button}
        >
          {isLoading ? 'Đang phân tích...' : 'Sinh nốt nhạc'}
        </button>

        {noteText && (
          <pre className={styles.noteArea}>{noteText}</pre>
        )}

        <button
          onClick={handleCreateMusic}
          disabled={!noteText || isLoading}
          className={styles.button}
        >
          {isLoading ? 'Đang tạo nhạc...' : 'Tạo file nhạc'}
        </button>

        {audioUrl && (
          <audio
            controls
            src={audioUrl}
            className={styles.audioPlayer}
          >
            Trình duyệt của bạn không hỗ trợ thẻ audio.
          </audio>
        )}

        {isLoading && <div className={styles.loading}>Đang xử lý, vui lòng chờ...</div>}
      </div>
    </main>
  );
}