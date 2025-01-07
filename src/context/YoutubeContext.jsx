import axios from "axios";
import React, { createContext, useState } from "react";

export const YoutubeContextProvider = createContext({
  Data: [],
  isloading: Boolean,
  isError: Boolean,
  onFetch: () => {},
});

const YoutubeContext = ({ children }) => {
  const [Data, setData] = useState("");
  const [isloading, setIsloading] = useState(false);
  const [isError, setIsError] = useState(false);

  //   .......................................................
  const apiUrl = "https://ycdn.savetube.su/info?url=";
  //   .......................................................

  const onFetch = async (url) => {

    try {
      setIsloading(true);
      const res = await axios.get(apiUrl + url);
      setData(res.data.data);
      setIsloading(false);
      setIsError(false);
      console.log(res)

    } catch (error) {
      setIsError(true);
      setIsloading(false);
      setData("");
      console.log("error occured");
    }
  };

  return (
    <YoutubeContextProvider.Provider
      value={{ onFetch, Data, isError, isloading }}
    >
      {children}
    </YoutubeContextProvider.Provider>
  );
};

export default YoutubeContext;
