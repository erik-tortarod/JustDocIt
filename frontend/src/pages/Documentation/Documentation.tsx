import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentationService from "../../services/DocumentationService";
import { ICodeDocumentation } from "../../types/interfaces";

function Documentation() {
   const { id } = useParams();

   const [codeDocumenation, setCodeDocumentation] = useState<
      ICodeDocumentation[]
   >([]);

   useEffect(() => {
      const getDocumentation = async () => {
         const documentation = await DocumentationService.getRepository(id!);
         setCodeDocumentation(documentation);
      };

      getDocumentation();
   }, []);

   return (
      <pre className="w-screen">
         {JSON.stringify(codeDocumenation, null, 2)}
      </pre>
   );
}

export default Documentation;
