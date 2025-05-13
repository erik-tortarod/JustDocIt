import { useState } from "react";
import { IRepository } from "../../types/interfaces";
import { CloseIcon } from "../../assets/images/svg/CloseIcon";
import { RepositoryIcon } from "../../assets/images/svg/RepositoryIcon";
import { StarIcon } from "../../assets/images/svg/StarIcon";
import { ForkIcon } from "../../assets/images/svg/ForkIcon";
import { LanguageIcon2 } from "../../assets/images/svg/LanguageIcon2";
import { SyncIcon } from "../../assets/images/svg/SyncIcon";
import { ExternalLinkIcon } from "../../assets/images/svg/ExternalLinkIcon";
import { ChevronRightIcon } from "../../assets/images/svg/ChevronRightIcon";
import { TrashIcon } from "../../assets/images/svg/TrashIcon";

interface Props {
	isOpen: boolean;
	onClose: () => void;
	repository: IRepository;
}

function RepositorySettingsModal({ isOpen, onClose, repository }: Props) {
	const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);

	if (!isOpen) return null;

	return (
		<div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md ">
			<div className="bg-base-100 rounded-xl shadow-xl border border-base-200 p-6 w-full max-w-md mx-4 relative">
				{/* Botón cerrar */}
				<button
					onClick={onClose}
					className="absolute right-4 top-4 w-8 h-8 rounded-full bg-base-200 hover:bg-base-300 flex items-center justify-center text-content-400 hover:text-content-100 transition-colors"
					aria-label="Cerrar modal"
				>
					<CloseIcon />
				</button>

				{/* Header */}
				<div className="mb-6">
					<h2 className="text-xl font-semibold text-content-100 mb-2">
						Configuración del Repositorio
					</h2>

					{/* Info del repositorio */}
					<div className="bg-base-200 rounded-lg p-4 border border-base-300">
						<div className="flex items-center gap-3">
							<div className="w-8 h-8 bg-accent-900 rounded-lg flex items-center justify-center">
								<RepositoryIcon className="text-accent-400" />
							</div>
							<div className="flex-1">
								<h3 className="font-medium text-content-100">
									{repository.name}
								</h3>
								<p className="text-sm text-content-400 truncate">
									{repository.description || "Sin descripción"}
								</p>
							</div>
						</div>

						<div className="flex gap-4 mt-3 text-xs text-content-400">
							<span className="flex items-center gap-1">
								<StarIcon />
								{repository.stargazersCount || 0}
							</span>
							<span className="flex items-center gap-1">
								<ForkIcon />
								{repository.forksCount || 0}
							</span>
							<span className="flex items-center gap-1">
								<LanguageIcon2 />
								{repository.documentedLanguages?.length || 0} lenguajes
							</span>
						</div>
					</div>
				</div>

				{/* Acciones */}
				<div className="space-y-2">
					{/* Sincronizar */}
					<button className="w-full flex items-center gap-3 p-3 rounded-lg border border-base-300 bg-base-200 hover:bg-base-300 transition-all group">
						<div className="w-8 h-8 bg-base-300 group-hover:bg-accent rounded-lg flex items-center justify-center">
							<SyncIcon className="text-content-300 group-hover:text-accent-300" />
						</div>
						<div className="text-left flex-1">
							<div className="font-medium text-content-100">
								Sincronizar con GitHub
							</div>
							<div className="text-sm text-content-400">
								Actualiza la información del repositorio
							</div>
						</div>
						<ChevronRightIcon className="text-content-400" />
					</button>

					{/* Abrir en GitHub */}
					<button className="w-full flex items-center gap-3 p-3 rounded-lg border border-base-300 bg-base-200 hover:bg-base-300 transition-all group">
						<div className="w-8 h-8 bg-base-300 group-hover:bg-accent rounded-lg flex items-center justify-center">
							<ExternalLinkIcon className="text-content-300 group-hover:text-accent-300" />
						</div>
						<div className="text-left flex-1">
							<div className="font-medium text-content-100">
								Abrir en GitHub
							</div>
							<div className="text-sm text-content-400">
								Ver el repositorio en GitHub
							</div>
						</div>
						<ExternalLinkIcon
							width="12"
							height="12"
							className="text-content-400"
						/>
					</button>

					{/* Separador */}
					<div className="my-4 border-t border-base-300"></div>

					{/* Eliminar */}
					{!showDeleteConfirm ? (
						<button
							onClick={() => setShowDeleteConfirm(true)}
							className="w-full flex items-center gap-3 p-3 rounded-lg border border-error bg-error hover:bg-error-focus transition-all group"
						>
							<div className="w-8 h-8 bg-error-focus rounded-lg flex items-center justify-center">
								<TrashIcon className="text-red-300" />
							</div>
							<div className="text-left flex-1">
								<div className="font-medium text-error-content">
									Eliminar Repositorio
								</div>
								<div className="text-sm text-error-content">
									Remover de la plataforma (no afecta GitHub)
								</div>
							</div>
						</button>
					) : (
						<div className="bg-error border border-error-focus rounded-lg p-4">
							<div className="mb-3">
								<div className="font-medium text-error-content">
									¿Estás seguro de que quieres eliminar?
								</div>
								<div className="text-sm text-error-content mt-1">
									Esta acción no se puede deshacer
								</div>
							</div>
							<div className="flex gap-3">
								<button className="flex-1 bg-error-focus hover:bg-error text-white px-4 py-2 rounded-lg font-medium transition-colors">
									Confirmar eliminación
								</button>
								<button
									onClick={() => setShowDeleteConfirm(false)}
									className="flex-1 bg-base-200 border border-base-300 text-content-100 px-4 py-2 rounded-lg font-medium hover:bg-base-300 transition-colors"
								>
									Cancelar
								</button>
							</div>
						</div>
					)}
				</div>
			</div>
		</div>
	);
}

export default RepositorySettingsModal;
