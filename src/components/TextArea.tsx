"use client";
import React, { useState, useEffect, MutableRefObject, useRef } from "react";
import LoadSpinner from "./LoadSpinner";
import { Editor as TinyMCEEditor } from "@tinymce/tinymce-react";
import { Editor } from "tinymce";
type Props = {
  post?: string;
  updateForm: (value: string) => void;
};

const TextArea = ({ post, updateForm }: Props) => {
  const editorRef = useRef<Editor | null>(null);
  const [showSpinner, setShowSpinner] = useState(true);
  const [editorValue, setEditorValue] = useState<string>("");
  const [isClient, setIsClient] = useState(false);

  useEffect(() => {
    setIsClient(true);
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowSpinner(false);
    }, 2500);

    return () => {
      clearTimeout(timer);
    };
  }, []);

  useEffect(() => {
    post && setEditorValue(post);
  }, [post]);

  return (
    <>
      {showSpinner ? (
        <LoadSpinner />
      ) : (
        <div className="w-[80dvw] h-[80dvh]">
          {isClient && (
            <TinyMCEEditor
              apiKey={process.env.NEXT_PUBLIC_TINYMCE_API}
              onInit={(evt, editor: Editor) => {
                editorRef.current = editor;
                setShowSpinner(false);
              }}
              onEditorChange={(newValue, editor) => {
                editorRef.current && setEditorValue(editor.getContent());
                updateForm(editor.getContent());
              }}
              value={editorValue}
              init={{
                width: "80dvw",
                height: "80dvh",
                plugins:
                  "anchor autolink charmap codesample emoticons image link lists media searchreplace table visualblocks wordcount",
                toolbar:
                  "undo redo | blocks fontfamily fontsize | bold italic underline strikethrough | link image media table | align lineheight | numlist bullist indent outdent | emoticons charmap | removeformat",
                toolbar_mode: "sliding",
                content_style: `
                img { 
                  max-width: 100%; 
                  height: auto; 
                }
              `,
                setup: function (editor) {
                  editor.on("ExecCommand", function (e) {
                    if (e.command === "mceInsertContent") {
                      const handleElementAlignment = (element: HTMLElement) => {
                        const parentElement = element.parentElement;
                        if (
                          parentElement &&
                          parentElement.style.textAlign === "center"
                        ) {
                          element.style.display = "block";
                          element.style.margin = "0 auto";
                        } else if (
                          parentElement &&
                          parentElement.style.textAlign === "right"
                        ) {
                          element.style.display = "block";
                          element.style.margin = "0 0 0 auto";
                        }
                      };

                      const imgElements =
                        editor.contentDocument.querySelectorAll("img");
                      imgElements.forEach(handleElementAlignment);

                      const iframeElements =
                        editor.contentDocument.querySelectorAll("iframe");
                      iframeElements.forEach(handleElementAlignment);
                    }
                  });
                },
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default TextArea;
