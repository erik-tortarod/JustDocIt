import RepositoryService from "../../services/RepositoryService";
import { IRepository } from "../../types/interfaces";

function RepositorieList({
	userRepositories,
}: {
	userRepositories: IRepository[];
}) {
	const handleAddRepository = async ({ id }: { id: number }) => {
		try {
			await RepositoryService.addRepository(id);
			alert("Repositorio agregado correctamente.");
		} catch (error) {
			alert("Error al agregar el repositorio.");
		}
	};

	return (
		<ul>
			{userRepositories?.map((repo: IRepository) => (
				<li key={repo.id}>
					<p>
						<strong>{repo.name}</strong> -{" "}
						{repo.description || "Sin descripción"}
						{repo.private && "🔒"}
					</p>
					<button
						className="btn btn-success"
						onClick={() => handleAddRepository({ id: repo.id })}
					>
						Add repository
					</button>
				</li>
			))}
		</ul>
	);
}

export default RepositorieList;
