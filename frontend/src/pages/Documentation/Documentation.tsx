import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import DocumentationService from "../../services/DocumentationService";
import { ICodeDocumentation } from "../../types/interfaces";

import { mockCodeDocumentation } from "../../fixtures/mockData";

import { EEnvironment } from "../../types/enums";

function Documentation() {
	const { id, language } = useParams();

	const [codeDocumenation, setCodeDocumentation] = useState<
		ICodeDocumentation[]
	>([]);

	const environment: EEnvironment = import.meta.env.VITE_ENVIROMENT;

	useEffect(() => {
		const getDocumentation = async () => {
			if (environment === EEnvironment.DEV && Number(id) === 1) {
				setCodeDocumentation(mockCodeDocumentation);
				return;
			}

			const documentation = await DocumentationService.getRepository(
				id!,
				language!,
			);
			setCodeDocumentation(documentation);
		};

		getDocumentation();
	}, []);

	return (
		<pre className="w-screen">{JSON.stringify(codeDocumenation, null, 2)}</pre>
	);
}

export default Documentation;
