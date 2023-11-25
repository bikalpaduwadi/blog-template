"use client";

import Image from "next/image";
import dynamic from "next/dynamic";
import React, { useEffect, useMemo, useState } from "react";
import {
  getStorage,
  ref,
  uploadBytesResumable,
  getDownloadURL,
} from "firebase/storage";

import styles from "./writePage.module.css";
import "react-quill/dist/quill.bubble.css";
import { useSession } from "next-auth/react";
import { useRouter } from "next/navigation";
import { app } from "../utils/firebase";

const WritePage = () => {
  const ReactQuill = useMemo(
    () => dynamic(() => import("react-quill"), { ssr: false }),
    []
  );

  const [file, setFile] = useState<File | null>(null);
  const [open, setOpen] = useState(false);
  const [value, setValue] = useState("");
  const [media, setMedia] = useState("");
  const [title, setTitle] = useState("");
  const [catSlug, setCatSlug] = useState("");

  const { status } = useSession();
  const router = useRouter();

  useEffect(() => {
    const storage = getStorage(app);

    const upload = () => {
      if (!file) {
        return;
      }

      const name = new Date().getTime() + file.name;
      const storageRef = ref(storage, name);

      const uploadTask = uploadBytesResumable(storageRef, file);
      // Register three observers:
      // 1. 'state_changed' observer, called any time the state changes
      // 2. Error observer, called on failure
      // 3. Completion observer, called on successful completion
      uploadTask.on(
        "state_changed",
        (snapshot) => {
          // Observe state change events such as progress, pause, and resume
          // Get task progress, including the number of bytes uploaded and the total number of bytes to be uploaded
          const progress =
            (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
          console.log("Upload is " + progress + "% done");
          switch (snapshot.state) {
            case "paused":
              console.log("Upload is paused");
              break;
            case "running":
              console.log("Upload is running");
              break;
          }
        },
        (error) => {
          // Handle unsuccessful uploads
        },
        () => {
          // Handle successful uploads on complete
          // For instance, get the download URL: https://firebasestorage.googleapis.com/...
          getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
            setMedia(downloadURL);
          });
        }
      );
    };

    file && upload;
  }, [file]);

  const slugify = (str: string) =>
    str
      .toLowerCase()
      .trim()
      .replace(/[^\w\s-]/g, "")
      .replace(/[\s_-]+/g, "-")
      .replace(/^-+|-+$/g, "");

  const handleSubmit = async () => {
    const res = await fetch("/api/posts", {
      method: "post",
      body: JSON.stringify({
        title,
        description: value,
        imageUrl: media,
        slug: slugify(title),
        categorySlug: catSlug || "style",
      }),
    });
  };

  return (
    <div className={styles.container}>
      <input
        type="text"
        placeholder="Title"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        className={styles.input}
      />
      <select
        className={styles.select}
        onChange={(e) => setCatSlug(e.target.value)}
      >
        <option value="style">style</option>
        <option value="fashion">fashion</option>
        <option value="food">food</option>
        <option value="culture">culture</option>
        <option value="travel">travel</option>
        <option value="coding">coding</option>
      </select>
      <div className={styles.editor}>
        <button className={styles.button} onClick={() => setOpen(!open)}>
          <Image src="/plus.png" alt="" width={16} height={16} />
        </button>
        {open && (
          <div className={styles.add}>
            <input
              type="file"
              id="image"
              style={{ display: "none" }}
              onChange={(e) => setFile(e.target.files?.[0] || null)}
            />
            <button className={styles.addButton}>
              <label htmlFor="image">
                <Image src="/image.png" alt="" width={16} height={16} />
              </label>
            </button>
            <button className={styles.addButton}>
              <Image src="/external.png" alt="" width={16} height={16} />
            </button>
            <button className={styles.addButton}>
              <Image src="/video.png" alt="" width={16} height={16} />
            </button>
          </div>
        )}
        <ReactQuill
          theme="bubble"
          value={value}
          onChange={setValue}
          className={styles.textArea}
          placeholder="Tell your story..."
        />
      </div>
      <button className={styles.publish} onClick={handleSubmit}>
        Publish
      </button>
    </div>
  );
};

export default WritePage;
