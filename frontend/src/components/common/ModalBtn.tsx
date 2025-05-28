function ModalBtn({
	btnText = "open modal",
	title,
	content = "Content",
	id,
}: {
	btnText: string;
	title?: string;
	content: string | React.ReactElement;
	id: string;
}) {
	return (
		<div className="ModalBtn">
			<button
				className="ModalBtn__button btn"
				onClick={() => {
					const modal = document.getElementById(id) as HTMLDialogElement | null;
					if (modal) modal.showModal();
				}}
			>
				{btnText}
			</button>
			<dialog id={id} className="ModalBtn__dialog modal">
				<div className="ModalBtn__box modal-box h-120">
					{title && (
						<h3 className="ModalBtn__title font-bold text-lg mb-4">{title}</h3>
					)}
					<div className="ModalBtn__content h-full">{content}</div>
				</div>
				<form method="dialog" className="ModalBtn__backdrop modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
}

export default ModalBtn;
