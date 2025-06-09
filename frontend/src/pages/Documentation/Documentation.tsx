import { useEffect, useState, useMemo } from "react";
import { Link, useParams, useNavigate } from "react-router-dom";
import DocumentationService from "../../services/DocumentationService";
import { ICodeDocumentation } from "../../types/interfaces";
import RepositoryService from "../../services/RepositoryService";
import { IRepository } from "../../types/interfaces";
import { Toaster } from "react-hot-toast";

import logo from "../../../public/logo.png";

//UTILS
import {
	fileHasDocumentation,
	getFileIcon,
	getFileName,
} from "../../utils/fileUtils";
import { API_ROUTES } from "@/config/api-routes";
import toast from "react-hot-toast";

// Componentes
const NavBadge = ({ type }: { type: string }) => {
	const getTypeClass = () => {
		switch (type) {
			case "C":
				return "bg-primary/20 text-primary";
			case "F":
				return "bg-info/20 text-info";
			case "I":
				return "bg-warning/20 text-warning";
			case "V":
				return "bg-error/20 text-error";
			case "FILE":
				return "bg-secondary/20 text-secondary";
			default:
				return "bg-secondary/20 text-secondary";
		}
	};

	return (
		<span
			className={`inline-flex items-center justify-center w-6 h-6 rounded text-xs font-semibold mr-2 ${getTypeClass()}`}
		>
			{type === "FILE" ? "📄" : type}
		</span>
	);
};

// Componente principal
function Documentation() {
	const { id, language } = useParams();
	const navigate = useNavigate();
	const [loading, setLoading] = useState(true);
	const [codeDocumentation, setCodeDocumentation] = useState<
		ICodeDocumentation[]
	>([]);
	const [currentClass, setCurrentClass] = useState<any>(null);
	const [activeTab, setActiveTab] = useState("documentation");
	const [searchTerm, setSearchTerm] = useState("");
	const [filteredClasses, setFilteredClasses] = useState<any[]>([]);
	const [filteredFiles, setFilteredFiles] = useState<ICodeDocumentation[]>([]);
	const [currentIndex, setCurrentIndex] = useState(0);
	const [currentFile, setCurrentFile] = useState<ICodeDocumentation | null>(
		null,
	);
	const [activeSection, setActiveSection] = useState("classes"); // 'classes', 'files', 'interfaces', 'functions'
	const [repositoryInfo, setRepositoryInfo] = useState<IRepository | null>(
		null,
	);
	const [noDocumentation, setNoDocumentation] = useState(false);

	useEffect(() => {
		const fetchData = async () => {
			try {
				if (!id || !language) return;

				const data = await DocumentationService.getRepository(id, language);

				if (!data || data.length === 0) {
					setCodeDocumentation([]);
					setFilteredFiles([]);
					setCurrentFile(null);
					setNoDocumentation(true);
					return;
				}

				setCodeDocumentation(data);
				setFilteredFiles(data);
				setCurrentFile(data[0] || null);
				setNoDocumentation(false);
			} catch (error) {
				console.error("Error fetching documentation:", error);
				setNoDocumentation(true);
			} finally {
				setLoading(false);
			}
		};
		const addVisit = async () => {
			if (id) {
				const url = API_ROUTES.DOCS.ADD_VISIT.replace("**repository_id**", id);

				await fetch(url, {
					method: "POST",
				});
			}
		};

		fetchData();
		addVisit();
	}, [id, language]);

	// Extraer todas las clases, funciones, interfaces y variables
	const allClasses = useMemo(
		() =>
			codeDocumentation.flatMap((doc) => {
				const classes = doc.content?.classes || [];
				// Para Python, también incluimos funciones globales como "clases"
				if (language?.toLowerCase() === "python") {
					const functions = doc.content?.functions || [];
					return [
						...classes,
						...functions.map((func) => ({
							name: func.name,
							description: func.description,
							methods: [func],
							type: "function",
						})),
					];
				}
				return classes;
			}),
		[codeDocumentation, language],
	);

	const copyUrlToClipboard = () => {
		navigator.clipboard.writeText(window.location.href);
		toast.success("URL copiada al portapapeles");
	};

	const allFunctions = useMemo(
		() => codeDocumentation.flatMap((doc) => doc.content?.functions || []),
		[codeDocumentation],
	);

	const allInterfaces = useMemo(
		() => codeDocumentation.flatMap((doc) => doc.content?.interfaces || []),
		[codeDocumentation],
	);

	// Efecto para filtrar según el término de búsqueda
	useEffect(() => {
		if (searchTerm.trim() === "") {
			setFilteredClasses(allClasses);
			setFilteredFiles(codeDocumentation);
		} else {
			const term = searchTerm.toLowerCase();

			// Filtrar clases y funciones
			const filtered = allClasses.filter(
				(cls) =>
					cls.name.toLowerCase().includes(term) ||
					(cls.description && cls.description.toLowerCase().includes(term)) ||
					cls.methods?.some(
						(method: any) =>
							method.name.toLowerCase().includes(term) ||
							(method.description &&
								method.description.toLowerCase().includes(term)),
					),
			);
			setFilteredClasses(filtered);

			// Filtrar archivos
			const filteredDocs = codeDocumentation.filter(
				(doc) =>
					doc.filePath.toLowerCase().includes(term) ||
					doc.content?.classes?.some(
						(cls) =>
							cls.name.toLowerCase().includes(term) ||
							(cls.description && cls.description.toLowerCase().includes(term)),
					) ||
					doc.content?.functions?.some(
						(func: any) =>
							func.name.toLowerCase().includes(term) ||
							(func.description &&
								func.description.toLowerCase().includes(term)),
					) ||
					doc.content?.interfaces?.some(
						(intf: any) =>
							intf.name.toLowerCase().includes(term) ||
							(intf.description &&
								intf.description.toLowerCase().includes(term)),
					),
			);
			setFilteredFiles(filteredDocs);
		}
	}, [searchTerm, codeDocumentation, allClasses]);

	const selectClass = (className: string) => {
		const selectedClass = allClasses.find((cls) => cls.name === className);
		if (selectedClass) {
			setCurrentClass(selectedClass);

			// Actualizar el archivo actual basado en la clase o función
			for (let i = 0; i < codeDocumentation.length; i++) {
				const doc = codeDocumentation[i];
				if (
					doc.content?.classes?.some((c) => c.name === className) ||
					doc.content?.functions?.some((f) => f.name === className)
				) {
					setCurrentFile(doc);
					setCurrentIndex(i);
					break;
				}
			}
		}
	};

	const selectFile = (index: number) => {
		if (index >= 0 && index < codeDocumentation.length) {
			const file = codeDocumentation[index];
			setCurrentFile(file);
			setCurrentIndex(index);

			// Si el archivo tiene clases, seleccionar la primera
			if (file.content?.classes?.length > 0) {
				setCurrentClass(file.content.classes[0]);
			} else {
				// Si no tiene clases, simplemente limpiar la clase actual
				setCurrentClass(null);
			}
		}
	};

	// Función para navegar al archivo anterior
	const goToPrevious = () => {
		if (currentIndex > 0) {
			selectFile(currentIndex - 1);
		}
	};

	// Función para navegar al archivo siguiente
	const goToNext = () => {
		if (currentIndex < codeDocumentation.length - 1) {
			selectFile(currentIndex + 1);
		}
	};

	// Obtener nombres de archivos para navegación
	const getPreviousFileName = () => {
		if (currentIndex > 0) {
			return (
				codeDocumentation[currentIndex - 1].filePath.split("/").pop() ||
				"Archivo anterior"
			);
		}
		return "";
	};

	const getNextFileName = () => {
		if (currentIndex < codeDocumentation.length - 1) {
			return (
				codeDocumentation[currentIndex + 1].filePath.split("/").pop() ||
				"Archivo siguiente"
			);
		}
		return "";
	};

	const handleLanguageChange = (newLanguage: string) => {
		if (id) {
			navigate(`/documentation/${id}/${newLanguage.toLowerCase()}`);
			window.location.reload();
		}
	};

	// Renderizar el componente de carga
	if (loading) {
		return (
			<div className="flex justify-center items-center h-screen">
				<div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-primary"></div>
			</div>
		);
	}

	return (
		<div className="flex min-h-screen bg-base-100 text-base-content w-screen">
			<Toaster
				position="top-center"
				toastOptions={{
					duration: 3000,
					style: {
						background: "#333",
						color: "#fff",
					},
				}}
			/>
			{/* Sidebar */}
			<aside className="w-72 bg-base-200 border-r border-base-300 h-screen sticky top-0 overflow-y-auto">
				<div className="p-4 border-b border-base-300">
					<div className="flex items-center gap-3 mb-[-0.5rem] mt-[-1.5rem]">
						<Link
							to="/dashboard"
							className="flex items-center gap-3 decoration-0 decoration-transparent"
						>
							<img src={logo} alt="" className="w-8" />
							<div className="font-bold text-lg">
								JustDocIt
								<span className="inline-flex items-center ml-2 bg-gradient-to-r from-primary to-secondary text-white text-xs px-2 py-1 rounded-full">
									<span className="w-2 h-2 bg-success rounded-full mr-1 animate-pulse"></span>
									Online
								</span>
							</div>
						</Link>
					</div>

					<div className="mb-4">
						<div className="font-semibold">Repositorio</div>
						<div className="flex items-center text-sm text-base-content/70">
							<span className="mr-2">📦</span>
							<span>
								{codeDocumentation[0]?.repositoryName || "Repositorio"}
							</span>
						</div>
					</div>

					<div className="relative mb-4">
						<input
							type="text"
							placeholder="Buscar en la documentación..."
							className="input input-sm input-bordered w-full pl-8"
							value={searchTerm}
							onChange={(e) => setSearchTerm(e.target.value)}
						/>
						<span className="absolute left-3 top-1/2 -translate-y-1/2 text-base-content/50">
							🔍
						</span>
					</div>
				</div>

				<nav className="p-4">
					{/* Tabs de navegación para la sidebar */}
					<div className="flex border-b border-base-300 mb-4">
						<button
							className={`flex-1 py-2 text-sm font-medium ${
								activeSection === "classes"
									? "border-b-2 border-primary text-primary"
									: "text-base-content/70"
							}`}
							onClick={() => setActiveSection("classes")}
						>
							Clases
						</button>
						<button
							className={`flex-1 py-2 text-sm font-medium ${
								activeSection === "files"
									? "border-b-2 border-primary text-primary"
									: "text-base-content/70"
							}`}
							onClick={() => setActiveSection("files")}
						>
							Archivos
						</button>
					</div>

					{/* Sección de Clases */}
					{activeSection === "classes" && (
						<div>
							{filteredClasses.length > 0 ? (
								<ul className="space-y-1">
									{filteredClasses.map((cls, index) => (
										<li key={index}>
											<a
												href="#"
												onClick={() => selectClass(cls.name)}
												className={`flex items-center py-1 px-3 hover:bg-base-300 rounded-md text-sm ${
													currentClass?.name === cls.name
														? "bg-primary/10 border-l-4 border-primary"
														: ""
												}`}
											>
												<NavBadge type="C" />
												<span>{cls.name}</span>
											</a>
											{/* Si esta clase está seleccionada, mostrar sus métodos */}
											{currentClass?.name === cls.name &&
												cls.methods &&
												cls.methods.length > 0 && (
													<ul className="pl-6 mt-1 space-y-1">
														{cls.methods.map((method: any, mIndex: number) => (
															<li key={mIndex}>
																<a
																	href={`#method-${method.name}`}
																	className="flex items-center py-1 px-3 hover:bg-base-300 rounded-md text-sm"
																>
																	<NavBadge type="F" />
																	<span>{method.name}()</span>
																</a>
															</li>
														))}
													</ul>
												)}
										</li>
									))}
								</ul>
							) : (
								<div className="text-center py-4 text-base-content/50">
									No se encontraron clases con documentación
								</div>
							)}

							{/* Interfaces */}
							{allInterfaces.length > 0 ? (
								<div className="mt-8">
									<div className="uppercase text-xs font-semibold text-base-content/70 mb-2">
										Tipos & Interfaces
									</div>
									<ul className="space-y-1">
										{allInterfaces
											.filter((intf) =>
												searchTerm.trim() === ""
													? true
													: intf.name
															.toLowerCase()
															.includes(searchTerm.toLowerCase()) ||
														(intf.description &&
															intf.description
																.toLowerCase()
																.includes(searchTerm.toLowerCase())),
											)
											.map((intf, index) => (
												<li key={index}>
													<a
														href="#"
														className="flex items-center py-1 px-3 hover:bg-base-300 rounded-md text-sm"
													>
														<NavBadge type="I" />
														<span>{intf.name}</span>
													</a>
												</li>
											))}
									</ul>
								</div>
							) : (
								<div className="mt-8 text-center py-4 text-base-content/50">
									No hay interfaces documentadas
								</div>
							)}

							{/* Funciones */}
							{allFunctions.length > 0 ? (
								<div className="mt-8">
									<div className="uppercase text-xs font-semibold text-base-content/70 mb-2">
										Funciones
									</div>
									<ul className="space-y-1">
										{allFunctions
											.filter((func) =>
												searchTerm.trim() === ""
													? true
													: func.name
															.toLowerCase()
															.includes(searchTerm.toLowerCase()) ||
														(func.description &&
															func.description
																.toLowerCase()
																.includes(searchTerm.toLowerCase())),
											)
											.map((func, index) => (
												<li key={index}>
													<a
														href="#"
														className="flex items-center py-1 px-3 hover:bg-base-300 rounded-md text-sm"
													>
														<NavBadge type="F" />
														<span>{func.name}</span>
													</a>
												</li>
											))}
									</ul>
								</div>
							) : (
								<div className="mt-8 text-center py-4 text-base-content/50">
									No hay funciones documentadas
								</div>
							)}
						</div>
					)}

					{/* Sección de Archivos */}
					{activeSection === "files" && (
						<div>
							<div className="flex justify-between items-center mb-2">
								<div className="uppercase text-xs font-semibold text-base-content/70">
									Archivos ({filteredFiles.length})
								</div>
								<div className="flex gap-2">
									<button
										className={`px-2 py-1 text-xs rounded ${
											filteredFiles.filter((f) => fileHasDocumentation(f))
												.length === filteredFiles.length
												? "bg-primary/20 text-primary"
												: "bg-base-300"
										}`}
										onClick={() =>
											setFilteredFiles(
												codeDocumentation.filter((f) =>
													fileHasDocumentation(f),
												),
											)
										}
									>
										Documentados
									</button>
									<button
										className={`px-2 py-1 text-xs rounded ${
											filteredFiles.length === codeDocumentation.length
												? "bg-primary/20 text-primary"
												: "bg-base-300"
										}`}
										onClick={() => setFilteredFiles(codeDocumentation)}
									>
										Todos
									</button>
								</div>
							</div>

							{filteredFiles.length > 0 ? (
								<ul className="space-y-1 mt-2">
									{filteredFiles.map((file) => {
										const hasDoc = fileHasDocumentation(file);
										const fileIndex = codeDocumentation.findIndex(
											(doc) => doc.id === file.id,
										);
										return (
											<li key={file.id}>
												<a
													href="#"
													onClick={() => selectFile(fileIndex)}
													className={`flex items-center py-1 px-3 hover:bg-base-300 rounded-md text-sm ${
														currentFile?.id === file.id
															? "bg-primary/10 border-l-4 border-primary"
															: ""
													}`}
												>
													<span className="mr-2">
														{getFileIcon(file.filePath)}
													</span>
													<span className="truncate">
														{getFileName(file.filePath)}
													</span>
													{hasDoc && (
														<span className="ml-auto text-xs bg-success/20 text-success px-1 rounded">
															Doc
														</span>
													)}
												</a>
											</li>
										);
									})}
								</ul>
							) : (
								<div className="text-center py-4 text-base-content/50">
									No se encontraron archivos que coincidan con la búsqueda
								</div>
							)}
						</div>
					)}
				</nav>
			</aside>

			{/* Main content */}
			<div className="flex-1 flex flex-col">
				{/* Header */}
				<header className="bg-base-200 border-b border-base-300 p-4 sticky top-0 z-10">
					<div className="flex justify-between items-center">
						<div className="flex items-center gap-2 text-sm">
							<a
								href="#"
								className="text-base-content/70 hover:text-base-content"
							>
								Home
							</a>
							<span className="text-base-content/50">/</span>
							<a
								href="#"
								className="text-base-content/70 hover:text-base-content"
							>
								{currentFile?.filePath.split("/").slice(0, -1).join("/") || ""}
							</a>
							<span className="text-base-content/50">/</span>
							<span className="font-medium">
								{currentFile?.filePath.split("/").pop() || "Documentación"}
							</span>
						</div>

						<div className="flex items-center gap-3">
							<div className="dropdown dropdown-end">
								<label
									tabIndex={0}
									className="btn btn-sm btn-outline flex items-center gap-2"
								>
									<span>{language || "JavaScript"}</span>
									<span>▼</span>
								</label>
								<ul
									tabIndex={0}
									className="dropdown-content z-10 menu p-2 shadow bg-base-200 rounded-box w-52"
								>
									<li>
										<a onClick={() => handleLanguageChange("javascript")}>
											JavaScript
										</a>
									</li>
									<li>
										<a onClick={() => handleLanguageChange("typescript")}>
											TypeScript
										</a>
									</li>
									<li>
										<a onClick={() => handleLanguageChange("python")}>Python</a>
									</li>
									<li>
										<a onClick={() => handleLanguageChange("php")}>PHP</a>
									</li>
								</ul>
							</div>
							<button
								className="btn btn-sm btn-outline btn-square"
								onClick={copyUrlToClipboard}
							>
								🔗
							</button>
						</div>
					</div>
				</header>

				{/* Main container */}
				<main className="flex-1 p-8 max-w-4xl mx-auto w-full">
					{noDocumentation ? (
						<div className="text-center py-8">
							<div className="card bg-base-200 p-6 mb-8 max-w-2xl mx-auto">
								<div className="alert alert-warning">
									<div>
										<svg
											xmlns="http://www.w3.org/2000/svg"
											className="stroke-current flex-shrink-0 h-6 w-6"
											fill="none"
											viewBox="0 0 24 24"
										>
											<path
												strokeLinecap="round"
												strokeLinejoin="round"
												strokeWidth="2"
												d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
											/>
										</svg>
										<span>
											No hay documentación disponible para {language} en este
											repositorio
										</span>
									</div>
								</div>
							</div>
						</div>
					) : currentClass ? (
						<>
							<h1 className="text-4xl font-bold mb-2">{currentClass.name}</h1>
							<h2 className="text-xl text-base-content/70 mb-6">
								{currentClass.description}
							</h2>

							<div className="flex items-center flex-wrap gap-6 mb-8 pb-6 border-b border-base-300">
								<div className="flex items-center gap-2 text-sm text-base-content/70">
									<span>📦</span>
									<span>
										Archivo:{" "}
										<code>
											{currentFile?.filePath
												? `typescript/examples/${currentFile.filePath
														.split("/")
														.pop()}`
												: `typescript/examples/${currentClass.name}.ts`}
										</code>
									</span>
								</div>
								<div className="flex items-center gap-2 text-sm text-base-content/70">
									<span>📄</span>
									<span>
										Tipo:{" "}
										<span className="inline-block px-2 py-1 bg-primary/20 text-primary text-xs rounded">
											{currentClass.type === "function" ? "Función" : "Clase"}
										</span>
									</span>
								</div>
							</div>

							{/* Índice rápido */}
							<div className="card bg-base-200 p-5 mb-8">
								<h3 className="font-semibold mb-4">Contenido</h3>
								<ul className="space-y-2">
									<li>
										<a
											href="#descripcion"
											className="flex items-center hover:text-primary"
										>
											<span>Descripción</span>
										</a>
									</li>
									<li>
										<a
											href="#constructor"
											className="flex items-center hover:text-primary"
										>
											<span className="inline-flex items-center justify-center w-5 h-5 rounded bg-secondary/20 text-xs mr-2">
												C
											</span>
											<span>Constructor</span>
										</a>
									</li>
									<li>
										<a
											href="#metodos"
											className="flex items-center hover:text-primary"
										>
											<span>Métodos</span>
										</a>
										<ul className="ml-6 mt-2 space-y-2">
											{currentClass.methods?.map(
												(method: any, index: number) => (
													<li key={index}>
														<a
															href={`#method-${method.name}`}
															className="flex items-center hover:text-primary"
														>
															<span className="inline-flex items-center justify-center w-5 h-5 rounded bg-info/20 text-xs mr-2">
																F
															</span>
															<span>{method.name}()</span>
														</a>
													</li>
												),
											)}
										</ul>
									</li>
									<li>
										<a
											href="#ejemplos"
											className="flex items-center hover:text-primary"
										>
											<span>Ejemplos</span>
										</a>
									</li>
								</ul>
							</div>

							{/* Descripción */}
							<section id="descripcion" className="mb-8">
								<p className="text-base-content/80 mb-4 leading-relaxed">
									<code className="px-1 py-0.5 bg-base-300 rounded">
										{currentClass.name}
									</code>{" "}
									{currentClass.description}
								</p>
							</section>

							{/* Métodos */}
							<section id="metodos" className="mb-8">
								<h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-base-300">
									{currentClass.type === "function" ? "Función" : "Métodos"}
								</h2>

								{currentClass.methods?.map((method: any, index: number) => (
									<div
										key={index}
										id={`method-${method.name}`}
										className="mb-10"
									>
										<h3 className="text-xl font-semibold mb-4 flex items-center">
											{method.name}()
											{method.signature && (
												<span className="ml-2 text-xs bg-base-300 px-2 py-1 rounded">
													{method.signature}
												</span>
											)}
										</h3>
										<p className="text-base-content/80 mb-4">
											{method.description}
										</p>

										{method.parameters && method.parameters.length > 0 && (
											<>
												<h4 className="font-semibold mb-2">Parámetros</h4>
												<div className="overflow-x-auto mb-4">
													<table className="table w-full table-compact">
														<thead>
															<tr>
																<th>Nombre</th>
																<th>Tipo</th>
																<th>Descripción</th>
															</tr>
														</thead>
														<tbody>
															{method.parameters.map(
																(param: any, pIndex: number) => (
																	<tr key={pIndex}>
																		<td className="font-mono text-error">
																			{param.name}
																		</td>
																		<td>
																			<span className="px-2 py-0.5 bg-info/10 text-info text-xs rounded font-mono">
																				{param.type}
																			</span>
																		</td>
																		<td className="text-base-content/80">
																			{param.description}
																		</td>
																	</tr>
																),
															)}
														</tbody>
													</table>
												</div>
											</>
										)}

										{method.returnDescription && (
											<>
												<h4 className="font-semibold mb-2">Retorna</h4>
												<p className="text-base-content/80 mb-4">
													<span className="px-2 py-0.5 bg-info/10 text-info text-xs rounded font-mono mr-2">
														{method.returnType || "any"}
													</span>
													{method.returnDescription}
												</p>
											</>
										)}

										<h4 className="font-semibold mb-2">Ejemplo</h4>
										<pre className="bg-base-300 p-4 rounded-lg mb-4 overflow-x-auto">
											<code className="text-sm font-mono">
												{language?.toLowerCase() === "python"
													? `# Ejemplo de uso para ${method.name}\n` +
														`${method.name}(${
															method.parameters
																?.map((p: any) => p.name)
																.join(", ") || ""
														})\n`
													: `// Ejemplo de uso para ${method.name}\n` +
														`const result = await service.${method.name}(${
															method.parameters
																?.map((p: any) => p.name)
																.join(", ") || ""
														});\n` +
														`console.log(result);`}
											</code>
										</pre>
									</div>
								))}
							</section>

							{/* Ejemplos generales */}
							<section id="ejemplos" className="mb-8">
								<h2 className="text-2xl font-semibold mb-6 pb-2 border-b border-base-300">
									Ejemplos de Uso
								</h2>
								<div className="mb-6">
									<h3 className="text-xl font-semibold mb-4">Uso básico</h3>
									<pre className="bg-base-300 p-4 rounded-lg mb-4 overflow-x-auto">
										<code className="text-sm font-mono">
											{`import { ${currentClass.name} } from '@api/client';\n\n`}
											{`// Crear una instancia\n`}
											{`const instance = new ${currentClass.name}();\n\n`}
											{`// Usar los métodos\n`}
											{currentClass.methods && currentClass.methods.length > 0
												? `const result = await instance.${
														currentClass.methods[0].name
													}(${
														currentClass.methods[0].parameters
															?.map((p: any) => p.name)
															.join(", ") || ""
													});\n`
												: `// Este servicio no tiene métodos documentados\n`}
											{`console.log(result);`}
										</code>
									</pre>
								</div>
							</section>
						</>
					) : (
						<div className="text-center py-8">
							<h2 className="text-2xl font-semibold mb-4">
								{currentFile?.filePath || "Archivo seleccionado"}
							</h2>

							{currentFile && (
								<div className="card bg-base-200 p-6 mb-8 max-w-2xl mx-auto">
									<h3 className="font-bold text-lg mb-4">
										Información del Archivo
									</h3>

									<div className="mb-4">
										<p className="text-sm text-base-content/80 mb-2">
											<span className="font-semibold">Ruta:</span>{" "}
											{currentFile.filePath}
										</p>
										<p className="text-sm text-base-content/80 mb-2">
											<span className="font-semibold">Lenguaje:</span>{" "}
											{currentFile.language}
										</p>
										<p className="text-sm text-base-content/80 mb-2">
											<span className="font-semibold">Contenido:</span>
											<span className="ml-2">
												{fileHasDocumentation(currentFile) ? (
													<span className="text-success">Documentado</span>
												) : (
													<span className="text-warning">
														Sin documentación
													</span>
												)}
											</span>
										</p>
									</div>

									<div className="stats shadow">
										<div className="stat">
											<div className="stat-title">Clases</div>
											<div className="stat-value">
												{currentFile.content?.classes?.length || 0}
											</div>
										</div>

										<div className="stat">
											<div className="stat-title">Funciones</div>
											<div className="stat-value">
												{currentFile.content?.functions?.length || 0}
											</div>
										</div>

										<div className="stat">
											<div className="stat-title">Interfaces</div>
											<div className="stat-value">
												{currentFile.content?.interfaces?.length || 0}
											</div>
										</div>
									</div>

									{!fileHasDocumentation(currentFile) && (
										<div className="alert alert-warning mt-6">
											<div>
												<svg
													xmlns="http://www.w3.org/2000/svg"
													className="stroke-current flex-shrink-0 h-6 w-6"
													fill="none"
													viewBox="0 0 24 24"
												>
													<path
														strokeLinecap="round"
														strokeLinejoin="round"
														strokeWidth="2"
														d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
													/>
												</svg>
												<span>
													Este archivo no tiene documentación generada o
													procesada.
												</span>
											</div>
										</div>
									)}

									<div className="card-actions justify-center mt-6">
										<button
											className="btn btn-primary btn-sm"
											onClick={() => {
												// Buscar un archivo con documentación
												for (let i = 0; i < codeDocumentation.length; i++) {
													if (fileHasDocumentation(codeDocumentation[i])) {
														selectFile(i);
														break;
													}
												}
											}}
										>
											Buscar archivo con documentación
										</button>
									</div>
								</div>
							)}
						</div>
					)}
				</main>

				{/* Footer */}
				<footer className="p-6 border-t border-base-300 mt-auto">
					<div className="flex justify-between max-w-4xl mx-auto w-full">
						{/* Botón de anterior - solo visible si hay un archivo anterior */}
						{currentIndex > 0 && (
							<button
								onClick={goToPrevious}
								className="flex items-center gap-2 text-base-content/70 hover:text-base-content border border-base-300 px-4 py-2 rounded"
							>
								<span>←</span>
								<div>
									<div className="text-xs">Anterior</div>
									<div className="font-medium">{getPreviousFileName()}</div>
								</div>
							</button>
						)}
						{/* Espacio vacío si no hay archivo anterior */}
						{currentIndex === 0 && <div></div>}

						{/* Botón de siguiente - solo visible si hay un archivo siguiente */}
						{currentIndex < codeDocumentation.length - 1 && (
							<button
								onClick={goToNext}
								className="flex items-center gap-2 text-base-content/70 hover:text-base-content border border-base-300 px-4 py-2 rounded ml-auto"
							>
								<div className="text-right">
									<div className="text-xs">Siguiente</div>
									<div className="font-medium">{getNextFileName()}</div>
								</div>
								<span>→</span>
							</button>
						)}
					</div>
				</footer>
			</div>
		</div>
	);
}

export default Documentation;
