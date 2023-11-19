import { createContext, useState } from "react";
export const GenerateContext = createContext();
const GenerateProvider = ({ children }) => {
  const [error, setError] = useState(false);
  const [audioUrl, setAudioUrl] = useState(null);

  const [loading, setLoading] = useState(false);
  const [imgs, setImgs] = useState([]);

  async function generateImgs(img) {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/generateImgs", {
        method: "POST",
        body: JSON.stringify({
          prompt: img,
          n: 3,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const imageData = await response.json();
        console.log(imageData);
        setImgs(imageData.data);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  async function generateText(text) {
    setError(false);
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3000/generateText", {
        method: "POST",
        body: JSON.stringify({
          text: text,
        }),
        headers: {
          "Content-Type": "application/json",
        },
      });
      if (response.ok) {
        const audioBlob = await response.blob();
        const url = URL.createObjectURL(audioBlob);
        setAudioUrl(url);
      } else {
        setError(true);
      }
    } catch (error) {
      console.error("Error occurred:", error);
      setError(true);
    } finally {
      setLoading(false);
    }
  }

  console.log(error);
  return (
    <GenerateContext.Provider
      value={{
        generateImgs,
        setImgs,
        imgs,
        loading,
        error,
        generateText,
        audioUrl,
        setAudioUrl,
      }}
    >
      {children}
    </GenerateContext.Provider>
  );
};

export default GenerateProvider;
