import React, { useEffect, useRef, useState } from "react";

import Webcam from "react-webcam";

import * as faceapi from "face-api.js";

import "@tensorflow/tfjs";

export default function FaceAuth({
  onSuccess
}) {

  const webcamRef = useRef(null);

  const [modelsLoaded, setModelsLoaded] =
    useState(false);

  useEffect(() => {

    const loadModels = async () => {

      try {

        const MODEL_URL = "/models";

        /* LOAD FAST MODELS */

        await faceapi.nets.tinyFaceDetector
          .loadFromUri(MODEL_URL);

        await faceapi.nets.faceLandmark68TinyNet
          .loadFromUri(MODEL_URL);

        console.log("✅ Models Loaded");

        setModelsLoaded(true);

      } catch (error) {

        console.log(error);

        alert("❌ Error Loading Models");

      }
    };

    loadModels();

  }, []);

  const verifyFace = async (e) => {

    /* STOP PAGE RELOAD */

    e.preventDefault();

    if (!modelsLoaded) {

      alert("⏳ Models are still loading...");
      return;

    }

    try {

      const video =
        webcamRef.current.video;

      const detection =
        await faceapi
          .detectSingleFace(
            video,
            new faceapi.TinyFaceDetectorOptions()
          )
          .withFaceLandmarks(true);

      if (detection) {

        console.log(detection);

        alert("✅ Face Verified Successfully");

        /* SUCCESS CALLBACK */

        if (onSuccess) {

          onSuccess();

        }

      } else {

        alert("❌ No Face Found");

      }

    } catch (error) {

      console.log(error);

      alert("❌ Face Detection Failed");

    }
  };

  return (

    <div
      style={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        gap: "20px",
        marginTop: "40px",
      }}
    >

      <h2>Face Authentication</h2>

      {
        modelsLoaded
          ? <p>✅ Models Loaded</p>
          : <p>⏳ Loading Models...</p>
      }

      <Webcam
        ref={webcamRef}
        screenshotFormat="image/jpeg"
        width={350}
        videoConstraints={{
          facingMode: "user",
        }}
      />

      <button
        type="button"
        onClick={verifyFace}
        style={{
          padding: "10px 20px",
          cursor: "pointer",
        }}
      >

        Verify Face

      </button>

    </div>
  );
}