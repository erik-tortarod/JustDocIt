import { useState, useEffect } from "react";
import { useTranslation } from "react-i18next";
import { motion } from "framer-motion";
import Sidebar from "../../components/layout/Sidebar/Sidebar";
import { IUser } from "../../types/interfaces";
import { X, Send, Clock, Download } from "lucide-react";
import toast from "react-hot-toast";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Components } from "react-markdown";
import { prompts } from "../../prompts";
import { PromptType } from "../../prompts/types";

function LiveDocumentation() {
   const { t } = useTranslation();
   const [userData, setUserData] = useState<IUser | null>(null);
   const [loading, setLoading] = useState(true);
   const [files, setFiles] = useState<File[]>([]);
   const [isGenerating, setIsGenerating] = useState(false);
   const [documentation, setDocumentation] = useState<string>("");
   const [selectedPrompt, setSelectedPrompt] =
      useState<PromptType>("terraform");
   const [startTime, setStartTime] = useState<number | null>(null);
   const [elapsedTime, setElapsedTime] = useState<string>("");

   useEffect(() => {
      const storedUserData = localStorage.getItem("userData");
      if (storedUserData) {
         setUserData(JSON.parse(storedUserData));
      }
      setLoading(false);
   }, []);

   useEffect(() => {
      let intervalId: NodeJS.Timeout;

      if (isGenerating && startTime) {
         intervalId = setInterval(() => {
            const elapsed = Date.now() - startTime;
            const seconds = Math.floor(elapsed / 1000);
            const minutes = Math.floor(seconds / 60);
            const remainingSeconds = seconds % 60;
            setElapsedTime(
               `${minutes}:${remainingSeconds.toString().padStart(2, "0")}`
            );
         }, 1000);
      }

      return () => {
         if (intervalId) {
            clearInterval(intervalId);
         }
      };
   }, [isGenerating, startTime]);

   const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
      const newFiles = Array.from(event.target.files || []);
      setFiles((prevFiles) => [...prevFiles, ...newFiles]);
   };

   const removeFile = (index: number) => {
      setFiles((prevFiles) => prevFiles.filter((_, i) => i !== index));
   };

   const handleSubmit = async () => {
      if (files.length === 0) {
         toast.error("Please upload at least one file");
         return;
      }

      setIsGenerating(true);
      setStartTime(Date.now());
      setElapsedTime("0:00");

      try {
         // Read all files content
         const fileContents = await Promise.all(
            files.map(async (file) => {
               const content = await file.text();
               return {
                  name: file.name,
                  content: content,
               };
            })
         );

         const selectedPromptGenerator = prompts[selectedPrompt];

         const response = await fetch("https://api.openai.com/v1/responses", {
            method: "POST",
            headers: {
               "Content-Type": "application/json",
               Authorization:
                  "Bearer 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",
            },
            body: JSON.stringify({
               model: "gpt-4.1",
               input: selectedPromptGenerator.generatePrompt(fileContents),
            }),
         });

         if (!response.ok) {
            throw new Error("Failed to generate documentation");
         }

         const data = await response.json();
         // Extract the text from the nested response structure
         const documentationText = data.output[0].content[0].text;
         setDocumentation(documentationText);
         toast.success("Documentation generated successfully!");
      } catch (error) {
         console.error("Error:", error);
         toast.error("Failed to generate documentation");
      } finally {
         setIsGenerating(false);
         setStartTime(null);
      }
   };

   const handleDownload = () => {
      const blob = new Blob([documentation], { type: "text/markdown" });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `documentation-${new Date().toISOString().split("T")[0]}.md`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
   };

   const markdownComponents: Components = {
      pre: ({ node, ...props }) => (
         <div className="overflow-x-auto">
            <pre {...props} />
         </div>
      ),
      code: ({ node, inline, className, children, ...props }: any) => {
         const match = /language-(\w+)/.exec(className || "");
         return !inline && match ? (
            <div className="bg-base-300 rounded-lg p-4">
               <pre className="text-sm">
                  <code className={className} {...props}>
                     {children}
                  </code>
               </pre>
            </div>
         ) : (
            <code className={className} {...props}>
               {children}
            </code>
         );
      },
   };

   if (loading || !userData) {
      return (
         <div className="flex justify-center items-center h-screen">
            <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
         </div>
      );
   }

   return (
      <motion.div
         className="flex w-screen"
         initial={{ opacity: 0 }}
         animate={{ opacity: 1 }}
         transition={{ duration: 0.5 }}
      >
         <Sidebar userData={userData} />
         <motion.div
            className="flex-1 transition-all duration-300 ease-in-out pl-16 md:pl-0"
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
         >
            <div className="px-8 pt-8">
               <motion.h1
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: 0.4 }}
                  className="text-3xl font-bold mb-8"
               >
                  Live Documentation
               </motion.h1>

               {/* File Upload Section */}
               <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.6 }}
                  className="bg-base-200 rounded-lg p-6 shadow-lg mb-8"
               >
                  <div className="mb-6">
                     <div className="flex flex-col gap-4">
                        <div>
                           <label
                              htmlFor="prompt-type"
                              className="block text-lg font-medium mb-2"
                           >
                              Documentation Type
                           </label>
                           <select
                              id="prompt-type"
                              value={selectedPrompt}
                              onChange={(e) =>
                                 setSelectedPrompt(e.target.value as PromptType)
                              }
                              className="select select-bordered w-full max-w-xs"
                           >
                              <option value="terraform">Terraform</option>
                              <option value="code">Code</option>
                              <option value="any">Any</option>
                           </select>
                        </div>
                        <div>
                           <label
                              htmlFor="file-upload"
                              className="block text-lg font-medium mb-2"
                           >
                              Upload Files
                           </label>
                           <div className="flex items-center gap-4">
                              <input
                                 id="file-upload"
                                 type="file"
                                 multiple
                                 onChange={handleFileChange}
                                 className="file:mr-4 file:py-2 file:px-4
                                          file:rounded-full file:border-0
                                          file:text-sm file:font-semibold
                                          file:bg-primary file:text-primary-content
                                          hover:file:bg-primary-focus
                                          cursor-pointer"
                              />
                              <div className="flex items-center gap-4">
                                 {isGenerating && (
                                    <div className="flex items-center gap-2 text-base-content/70">
                                       <Clock size={16} />
                                       <span>{elapsedTime}</span>
                                    </div>
                                 )}
                                 <button
                                    onClick={handleSubmit}
                                    disabled={
                                       files.length === 0 || isGenerating
                                    }
                                    className={`btn btn-primary gap-2 ${
                                       isGenerating ? "loading" : ""
                                    }`}
                                 >
                                    {!isGenerating && <Send size={16} />}
                                    {isGenerating
                                       ? "Generating..."
                                       : "Generate Documentation"}
                                 </button>
                              </div>
                           </div>
                        </div>
                     </div>
                  </div>

                  {/* File List */}
                  {files.length > 0 && (
                     <div className="mt-6">
                        <h3 className="text-lg font-medium mb-4">
                           Uploaded Files
                        </h3>
                        <div className="space-y-2">
                           {files.map((file, index) => (
                              <motion.div
                                 key={index}
                                 initial={{ opacity: 0, x: -20 }}
                                 animate={{ opacity: 1, x: 0 }}
                                 className="flex items-center justify-between bg-base-100 p-2 rounded-lg shadow-sm text-sm"
                              >
                                 <div className="flex items-center gap-2">
                                    <span className="text-base">📄</span>
                                    <div className="flex items-center gap-2">
                                       <p className="font-medium truncate max-w-[200px]">
                                          {file.name}
                                       </p>
                                       <span className="text-xs text-base-content/60">
                                          ({(file.size / 1024).toFixed(2)} KB)
                                       </span>
                                    </div>
                                 </div>
                                 <button
                                    onClick={() => removeFile(index)}
                                    className="btn btn-ghost btn-xs text-error hover:bg-error/10 p-1"
                                 >
                                    <X size={14} />
                                 </button>
                              </motion.div>
                           ))}
                        </div>
                     </div>
                  )}
               </motion.div>

               {/* Documentation Display Section */}
               {documentation && (
                  <motion.div
                     initial={{ opacity: 0, y: 20 }}
                     animate={{ opacity: 1, y: 0 }}
                     transition={{ duration: 0.5, delay: 0.8 }}
                     className="bg-base-200 rounded-lg p-6 shadow-lg relative"
                  >
                     <div className="flex justify-between items-center mb-6">
                        <h2 className="text-2xl font-bold">
                           Generated Documentation
                        </h2>
                        <button
                           onClick={handleDownload}
                           className="btn btn-primary btn-sm gap-2"
                           title="Download as Markdown"
                        >
                           <Download size={16} />
                           Download
                        </button>
                     </div>
                     <div className="prose prose-lg max-w-none dark:prose-invert">
                        <ReactMarkdown
                           remarkPlugins={[remarkGfm]}
                           rehypePlugins={[rehypeRaw]}
                           components={markdownComponents}
                        >
                           {documentation}
                        </ReactMarkdown>
                     </div>
                  </motion.div>
               )}
            </div>
         </motion.div>
      </motion.div>
   );
}

export default LiveDocumentation;
