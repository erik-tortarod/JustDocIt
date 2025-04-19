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
		<div>
			<button
				className="btn"
				onClick={() => {
					const modal = document.getElementById(id) as HTMLDialogElement | null;
					if (modal) modal.showModal();
				}}
			>
				{btnText}
			</button>
			<dialog id={id} className="modal">
				<div className="modal-box h-120">
					{title && <h3 className="font-bold text-lg mb-4">{title}</h3>}
					<div className="h-full">{content}</div>
				</div>
				<form method="dialog" className="modal-backdrop">
					<button>close</button>
				</form>
			</dialog>
		</div>
	);
}

export default ModalBtn;
