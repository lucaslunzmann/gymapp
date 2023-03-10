'use client'

import { useState } from  "react";
import  ReactQuill  from  "react-quill";
import  "react-quill/dist/quill.snow.css";

const  modules  = {
    toolbar: [
        [{ font: [] }],
        [{ header: [1, 2, 3, 4, 5, 6, false] }],
        ["bold", "italic", "underline", "strike"],
        [{ color: [] }, { background: [] }],
        ["blockquote"],
        [{ list:  "ordered" }, { list:  "bullet" }],
        [{ indent:  "-1" }, { indent:  "+1" }, { align: [] }],
        ["link", "image", "video"],
        ["clean"],
    ],
};

const  App  = () => {
    const [value, setValue] =  useState("");
    console.log(value);

    return  <ReactQuill  modules={modules} theme="snow" onChange={setValue} placeholder="Start building a workout..." />;
};



export  default  App;