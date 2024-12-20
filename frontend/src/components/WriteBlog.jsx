// import React, { useState } from 'react';
import "./WriteBlog.scss"
// import { IKContext, IKUpload } from 'imagekitio-react';


// const WriteBlog = () => {
//     const [imageSrc, setImageSrc] = useState('');

//     const authenticator = async () => {
//         try {
//             const response = await fetch(`${import.meta.env.VITE_SERVER_URL}/user/upload`);

//             if (!response.ok) {
//                 const errorText = await response.text();
//                 throw new Error(`Request failed with status ${response.status}: ${errorText}`);
//             }

//             const data = await response.json();
//             const { signature, expire, token } = data;
//             return { signature, expire, token };
//         } catch (error) {
//             throw new Error(`Authentication request failed: ${error.message}`);
//         }
//     };

//     const onError = err => {
//         console.log("Error", err);
//     };

//     const onSuccess = res => {
//         console.log("Success", res);
//         setImageSrc(res.url);
//     };

//     return (
//         <div className='write-blog-container'>
//             <IKContext
//                 publicKey={import.meta.env.VITE_IK_PUBLIC_KEY}
//                 urlEndpoint={import.meta.env.VITE_IK_END_POINT}
//                 authenticator={authenticator}
//             >
//                 <p>Upload an image</p>
//                 <IKUpload
//                     useUniqueFileName
//                     onError={onError}
//                     onSuccess={onSuccess}
//                 />
//             </IKContext>
//             <div>
//                 <img src={imageSrc} />
//             </div>
//         </div>
//     )
// }

// export default WriteBlog

/// Second option
import React from "react";
import { EditorContent, useEditor } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Image from "@tiptap/extension-image";

import { RiBold, RiItalic,RiH1,RiH2,RiH3,RiH4,RiH5,RiH6,RiListOrdered,RiListUnordered,RiLink } from 'react-icons/ri'

const TiptapEditor = () => {
    const editor = useEditor({
        extensions: [
            StarterKit,
            Image
        ],
        content: "<p>Write blog...</p>",
    });

    const addImageFromFile = async (event) => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.onload = () => {
                editor.chain().focus().setImage({ src: reader.result }).run();
            };
            reader.readAsDataURL(file); // Convert file to base64 string
        }
    };

    const handelBlogSave = () => {
        console.log(editor);
    }

    return (
        <div className="text-editor-container">
            <div className="text-editor">
                {/* Toolbar */}
                <div className="tool-bar">
                    <button onClick={() => editor.chain().focus().toggleBold().run()}>
                        <RiBold />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleItalic().run()}>
                        <RiItalic />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}>
                        <RiH1 />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}>
                        <RiH2 />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 3 }).run()}>
                        <RiH3 />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 4 }).run()}>
                        <RiH4 />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 5 }).run()}>
                        <RiH5 />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleHeading({ level: 6 }).run()}>
                        <RiH6 />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleBulletList().run()}>
                        <RiListOrdered />
                    </button>
                    <button onClick={() => editor.chain().focus().toggleOrderedList().run()}>
                        <RiListUnordered />
                    </button>

                    <label style={{ marginRight: "10px", cursor: "pointer" }}>
                        <RiLink />
                        <input
                            type="file"
                            accept="image/*"
                            style={{ display: "none" }}
                            onChange={addImageFromFile}
                        />
                    </label>
                    <div className="divider"></div>
                    <button onClick={handelBlogSave}> Save </button>
                </div>

                {/* Editor Content */}
                <EditorContent editor={editor} />
            </div>
        </div>
    );
};

export default TiptapEditor;

